package com.zhujian.platform.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.zhujian.platform.service.ArkAiService;
import com.zhujian.platform.service.CurrentUser;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

/**
 * AI 顾问与智能辅助接口。
 * 将业主需求、预算、服务商匹配交由真实大模型（火山方舟 / 豆包）处理。
 */
@RestController
@RequestMapping("/api/ai")
public class AiController {

    private static final String SYSTEM_CHAT = """
            你是“筑见”装修咨询服务智能平台的 AI 装修顾问。
            请用中文、专业且亲切的方式解答业主关于装修的咨询，覆盖施工流程、材料鉴别、
            预算分配、风格搭配、验收标准、合同避坑等。
            回答要结构化、简洁、可操作；涉及具体报价、方案或法律时，明确说明仅为参考建议，
            不构成正式造价或法律意见。单次回答尽量控制在 300 字以内，可用要点列出。
            """;

    private static final String SYSTEM_BUDGET = """
            你是资深装修预算顾问。根据业主提供的房屋信息（城市、面积、装修类型、户型、
            风格、预算区间、入住时间、核心诉求），输出一份中文预算分析。
            必须只返回 JSON，不要输出任何额外文字或代码围栏，结构如下：
            {
              "budgetRange": "合理预算范围，如 20-28 万",
              "breakdown": [{"item":"基础施工","percent":31,"amount":"6.2-8.7万"},
                            {"item":"主材设备","percent":37,"amount":"7.4-10.4万"},
                            {"item":"定制软装","percent":24,"amount":"4.8-6.7万"},
                            {"item":"设计服务","percent":8,"amount":"1.6-2.2万"}],
              "suggestions": ["建议1", "建议2", "建议3"],
              "riskTips": ["风险提示1", "风险提示2"],
              "cycle": "参考施工周期 75-90 天"
            }
            金额与面积、档次、城市指导价相匹配，构成比例合理。
            """;

    private static final String SYSTEM_RECOMMEND = """
            你是装修服务匹配专家。根据业主的装修需求，从给定的候选服务商中挑选最合适的
            3-5 位，按匹配度从高到低排序。
            必须只返回 JSON 数组，不要输出任何额外文字或代码围栏，每项格式：
            {"name":"服务商名称","score":90,"reason":"一句话匹配理由"}
            候选为空时返回 []。
            """;

    private final ArkAiService ai;
    private final CurrentUser currentUser;

    public AiController(ArkAiService ai, CurrentUser currentUser) {
        this.ai = ai;
        this.currentUser = currentUser;
    }

    @PostMapping("/chat")
    public Map<String, Object> chat(@Valid @RequestBody ChatRequest request) {
        currentUser.requireLogin();
        String reply = ai.chat(SYSTEM_CHAT, request.message());
        return Map.of("reply", reply);
    }

    @PostMapping("/budget")
    public Map<String, Object> budget(@Valid @RequestBody BudgetRequest request) {
        currentUser.requireLogin();
        String context = buildBudgetContext(request);
        JsonNode analysis = ai.budget(SYSTEM_BUDGET, context);
        if (analysis == null) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "AI 预算分析失败，请稍后重试");
        }
        return Map.of("analysis", analysis);
    }

    @PostMapping("/recommend")
    public Map<String, Object> recommend(@Valid @RequestBody RecommendRequest request) {
        currentUser.requireLogin();
        String context = buildRecommendContext(request);
        List<JsonNode> result = ai.recommend(SYSTEM_RECOMMEND, context);
        return Map.of("recommendations", result);
    }

    private String buildBudgetContext(BudgetRequest r) {
        StringBuilder sb = new StringBuilder("房屋信息：");
        sb.append("城市=").append(blank(r.city))
          .append("；面积=").append(r.area).append("㎡");
        appendField(sb, "装修类型", r.decorationType);
        appendField(sb, "户型", r.houseType);
        appendField(sb, "风格", r.style);
        appendField(sb, "期望预算", r.budgetRange);
        appendField(sb, "计划入住", r.moveInTime);
        appendField(sb, "核心诉求", r.needs);
        sb.append("。请给出专业、合理的预算分析。");
        return sb.toString();
    }

    private String buildRecommendContext(RecommendRequest r) {
        StringBuilder sb = new StringBuilder("业主装修需求：");
        sb.append(blank(r.need));
        sb.append("。候选服务商：");
        if (r.providers == null || r.providers.isEmpty()) {
            sb.append("无");
        } else {
            for (CandidateProvider p : r.providers) {
                sb.append('[').append(p.name)
                  .append("，角色=").append(blank(p.role))
                  .append("，擅长=").append(blank(p.tag))
                  .append("，评分=").append(p.score == null ? "未知" : p.score)
                  .append("，经验=").append(p.years == null ? "未知" : p.years + "年")
                  .append("，空间=").append(listText(p.spaces))
                  .append("，风格=").append(listText(p.styles)).append(']');
            }
        }
        sb.append("。请挑选最合适的服务商并给出匹配理由。");
        return sb.toString();
    }

    private void appendField(StringBuilder sb, String label, String value) {
        if (value != null && !value.isBlank()) sb.append("；").append(label).append("=").append(value.trim());
    }

    private String blank(String s) {
        return s == null ? "" : s.trim();
    }

    private String listText(List<String> list) {
        return list == null || list.isEmpty() ? "未知" : String.join("、", list);
    }

    public record ChatRequest(@NotBlank String message) {}

    public record BudgetRequest(
            @NotBlank String city,
            @NotNull Double area,
            String houseType,
            String decorationType,
            String style,
            String budgetRange,
            String moveInTime,
            String needs
    ) {}

    public record CandidateProvider(
            String name,
            String role,
            String tag,
            Double score,
            Integer years,
            List<String> spaces,
            List<String> styles
    ) {}

    public record RecommendRequest(
            @NotBlank String need,
            List<CandidateProvider> providers
    ) {}
}
