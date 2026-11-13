package com.zhujian.platform.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 火山方舟（豆包大模型）接入服务。
 * 通过 OpenAI 兼容接口 {@code /chat/completions} 调用真实大模型。
 * 配置项来自 application.yml / 环境变量，见 ai.ark.*。
 */
@Service
public class ArkAiService {

    private final String apiKey;
    private final String modelId;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public ArkAiService(
            @Value("${ai.ark.base-url}") String baseUrl,
            @Value("${ai.ark.api-key}") String apiKey,
            @Value("${ai.ark.model-id}") String modelId,
            @Value("${ai.ark.timeout-seconds:30}") int timeoutSeconds) {
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        this.modelId = modelId;
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(Math.max(timeoutSeconds, 5)));
        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .requestFactory(factory)
                .build();
        this.objectMapper = new ObjectMapper();
    }

    /** 判断是否已配置 API Key，供前端提前提示。 */
    public boolean isConfigured() {
        return !apiKey.isBlank();
    }

    /**
     * 单次对话：返回模型回复文本。未配置 Key 或调用失败时抛出可读异常。
     */
    public String chat(String systemPrompt, String userMessage) {
        return complete(systemPrompt, userMessage, 900, 0.7);
    }

    /** 预算分析：要求模型返回结构化 JSON，解析为节点后返回。 */
    public JsonNode budget(String systemPrompt, String userMessage) {
        JsonNode root = completeJson(systemPrompt, userMessage, 2000, 0.5);
        return root != null ? root : null;
    }

    /** 服务商推荐：要求模型返回 JSON 数组，解析为数组节点列表。 */
    public List<JsonNode> recommend(String systemPrompt, String userMessage) {
        JsonNode root = completeJson(systemPrompt, userMessage, 2000, 0.4);
        if (root != null && root.isArray()) {
            List<JsonNode> list = new ArrayList<>();
            root.forEach(list::add);
            return list;
        }
        return List.of();
    }

    private String complete(String system, String user, int maxTokens, double temperature) {
        ensureConfigured();
        String requestJson = buildRequestJson(system, user, maxTokens, temperature, false);
        String response = execute(requestJson);
        return extractContent(response);
    }

    private JsonNode completeJson(String system, String user, int maxTokens, double temperature) {
        ensureConfigured();
        String requestJson = buildRequestJson(system, user, maxTokens, temperature, true);
        String response = execute(requestJson);
        String content = extractContent(response);
        if (content.isBlank()) return null;
        JsonNode node = extractJsonFragment(content);
        if (node == null) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "AI 返回内容无法解析，请重试");
        }
        return node;
    }

    /** 从模型回复中鲁棒地提取第一个 JSON 对象或数组，兼容代码围栏与前后额外文字。 */
    private JsonNode extractJsonFragment(String text) {
        if (text == null) return null;
        String s = text.trim();
        // 去掉 ```json / ``` 代码围栏
        if (s.startsWith("```")) {
            int firstNewline = s.indexOf('\n');
            int lastBacktick = s.lastIndexOf("```");
            if (firstNewline > 0 && lastBacktick > firstNewline) {
                s = s.substring(firstNewline + 1, lastBacktick).trim();
            }
        }
        int objStart = s.indexOf('{');
        int arrStart = s.indexOf('[');
        if (objStart == -1 && arrStart == -1) return null;
        int start;
        char open, close;
        if (arrStart == -1 || (objStart != -1 && objStart < arrStart)) {
            start = objStart; open = '{'; close = '}';
        } else {
            start = arrStart; open = '['; close = ']';
        }
        int end = s.lastIndexOf(close);
        if (end <= start) return null;
        String fragment = s.substring(start, end + 1);
        try {
            return objectMapper.readTree(fragment);
        } catch (Exception e) {
            return null;
        }
    }

    private String buildRequestJson(String system, String user, int maxTokens, double temperature, boolean jsonMode) {
        try {
            Map<String, Object> body = Map.of(
                    "model", modelId,
                    "messages", List.of(
                            Map.of("role", "system", "content", system),
                            Map.of("role", "user", "content", user)
                    ),
                    "max_tokens", maxTokens,
                    "temperature", temperature
            );
            return objectMapper.writeValueAsString(body);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "AI 请求构造失败");
        }
    }

    private String execute(String requestJson) {
        try {
            String response = restClient.post()
                    .uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestJson)
                    .retrieve()
                    .body(String.class);
            if (response == null) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "AI 服务返回空响应");
            }
            return response;
        } catch (RestClientResponseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "AI 服务调用失败：" + e.getStatusCode());
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "AI 服务连接失败，请稍后重试");
        }
    }

    private String extractContent(String responseJson) {
        try {
            JsonNode root = objectMapper.readTree(responseJson);
            JsonNode content = root.path("choices").path(0).path("message").path("content");
            if (content.isMissingNode() || content.isNull()) {
                // 兼容 responses API 或错误字段
                JsonNode err = root.path("error");
                if (!err.isMissingNode()) {
                    throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,
                            "AI 服务错误：" + err.path("message").asText("未知错误"));
                }
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "AI 服务未返回可用内容");
            }
            return content.asText();
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "AI 服务响应解析失败");
        }
    }

    private void ensureConfigured() {
        if (apiKey.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "AI 服务尚未配置 API Key，请在 application.yml 的 ai.ark.api-key 或环境变量 ARK_API_KEY 中配置");
        }
    }
}
