# 筑见装修咨询服务智能平台

这是根据《装修咨询服务职能平台网站建设需求文档》实现的可运行产品原型，覆盖业主端、服务商端与平台管理端的主要业务流程。

## 运行方式

### IntelliJ IDEA

打开项目后运行 `src/Main.java`，浏览器会自动打开 `http://localhost:8080`。

### 命令行

```powershell
javac -encoding UTF-8 -d out src/Main.java
java -cp out Main
```

然后访问 `http://localhost:8080`。

网站没有第三方运行依赖。咨询方案、预约、收藏等交互数据保存在浏览器 `localStorage` 中，适合演示与后续接入真实后端 API。

## 已实现模块

- 业主端：首页、智能需求咨询、预算测算与报价对比、案例库、顾问预约、知识工具、个人中心
- 服务商端：业务概览、智能匹配线索、标准化报价、项目跟进、案例管理
- 管理端：运营看板、订单管理、资质审核、风险预警、内容运营
- 全局：三端角色切换、响应式布局、AI 咨询浮层、本地数据持久化、移动端导航

## 图片来源

本项目示例空间图片来自 Unsplash：

- https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- https://images.unsplash.com/photo-1616486338812-3dadae4b4ace
- https://images.unsplash.com/photo-1600607687939-ce8a6c25118c

图片已下载为本地演示素材，正式商用前请根据最终品牌与授权要求替换。
