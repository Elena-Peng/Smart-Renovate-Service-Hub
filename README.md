# 筑见装修咨询服务智能平台

基于 Spring Boot 3、MySQL 8 和原生 Web 前端实现的本地全栈项目，包含业主端、服务商端和平台管理端。

## 本地环境

- JDK 17
- MySQL 8
- IntelliJ IDEA（建议通过 Maven 导入 `pom.xml`）
- MySQL 本地端口 `3306`
- 数据库账号 `root`，密码 `123456`

数据库 `zhujian` 会在首次启动时自动创建，Flyway 会自动创建项目所需的数据表。

## 在 IntelliJ IDEA 中启动

1. 使用 IDEA 打开项目根目录。
2. 等待 Maven 下载并加载依赖。
3. 确认本地 MySQL 服务已经启动。
4. 运行 `src/main/java/com/zhujian/platform/ZhujianApplication.java`。
5. 浏览器访问 `http://localhost:8080`。

项目已经包含名为 `ZhujianApplication` 的 IDEA Spring Boot 运行配置。旧的重复静态服务器入口已经删除。

## 命令行启动

```powershell
mvn spring-boot:run
```

也可以先打包再运行：

```powershell
mvn clean package
java -jar target/smart-renovate-service-hub-1.0.0.jar
```

## 演示账号

| 角色 | 账号 | 密码 |
| --- | --- | --- |
| 业主 | `owner_demo` | `123456` |
| 服务商 | `provider_demo` | `123456` |
| 平台管理员 | `admin_demo` | `123456` |

## 项目结构

```text
src/main/java/com/zhujian/platform
├─ config        本地配置与初始化数据
├─ controller    登录、业主、服务商和管理员接口
├─ entity        MySQL 实体
├─ repository    数据访问层
└─ service       当前用户与公共服务

src/main/resources
├─ application.yml
└─ db/migration  Flyway 数据库脚本

web
├─ index.html
├─ app.js
├─ styles.css
└─ assets        案例图片
```

## 本地访问范围

应用固定监听 `127.0.0.1:8080`，只用于当前电脑本地运行。Spring Boot 同时提供 Web 页面、登录会话、业务接口和 MySQL 数据访问，不需要启动第二个静态文件服务器。

健康检查地址：`http://localhost:8080/api/health`

## 部署上线

腾讯云轻量应用服务器（Ubuntu 22.04）完整部署步骤见 [docs/部署手册.md](docs/部署手册.md)，配套一键环境初始化脚本为 `deploy/install-server.sh`。

要点：前端静态页由本服务通过 `StaticWebConfig` 从 `./web/` 目录托管，部署时需把 `web/` 与 jar 一并上传；数据库与 API Key 通过环境变量注入（`SERVER_ADDRESS`、`DB_*`、`ARK_API_KEY`），不写入版本库。
