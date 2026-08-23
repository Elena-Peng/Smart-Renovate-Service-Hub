import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.awt.Desktop;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

public class Main {
    private static final int PORT = 8080;
    private static final Map<String, String> CONTENT_TYPES = Map.of(
            ".html", "text/html; charset=UTF-8",
            ".css", "text/css; charset=UTF-8",
            ".js", "application/javascript; charset=UTF-8",
            ".jpg", "image/jpeg",
            ".png", "image/png"
    );

    public static void main(String[] args) throws IOException {
        Path webRoot = locateWebRoot();
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.createContext("/", exchange -> serve(exchange, webRoot));
        server.setExecutor(null);
        server.start();

        String address = "http://localhost:" + PORT;
        System.out.println("Smart Renovate Service Hub is running at " + address);
        if (Desktop.isDesktopSupported()) {
            try {
                Desktop.getDesktop().browse(URI.create(address));
            } catch (Exception ignored) {
                // The URL is printed above for headless environments.
            }
        }
    }

    private static Path locateWebRoot() {
        Path current = Paths.get("").toAbsolutePath();
        Path candidate = current.resolve("web");
        if (Files.isDirectory(candidate)) {
            return candidate.normalize();
        }
        candidate = current.getParent() == null ? candidate : current.getParent().resolve("web");
        if (Files.isDirectory(candidate)) {
            return candidate.normalize();
        }
        throw new IllegalStateException("Cannot find the web directory. Run Main from the project root or src directory.");
    }

    private static void serve(HttpExchange exchange, Path webRoot) throws IOException {
        String requestPath = exchange.getRequestURI().getPath();
        if (requestPath.equals("/")) {
            requestPath = "/index.html";
        }

        Path target = webRoot.resolve(requestPath.substring(1)).normalize();
        if (!target.startsWith(webRoot) || !Files.exists(target) || Files.isDirectory(target)) {
            send(exchange, 404, "text/plain; charset=UTF-8", "404 - Page not found".getBytes());
            return;
        }

        byte[] body = Files.readAllBytes(target);
        String fileName = target.getFileName().toString().toLowerCase();
        String contentType = CONTENT_TYPES.entrySet().stream()
                .filter(entry -> fileName.endsWith(entry.getKey()))
                .map(Map.Entry::getValue)
                .findFirst()
                .orElse("application/octet-stream");
        exchange.getResponseHeaders().set("Cache-Control", "no-cache");
        send(exchange, 200, contentType, body);
    }

    private static void send(HttpExchange exchange, int status, String type, byte[] body) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", type);
        exchange.sendResponseHeaders(status, body.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(body);
        }
    }
}
