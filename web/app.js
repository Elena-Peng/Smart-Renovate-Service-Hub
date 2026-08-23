const app = document.getElementById("app");
const toast = document.getElementById("toast");
const modalRoot = document.getElementById("modal-root");

const navByRole = {
  auth: [["login", "登录"], ["register", "注册"]],
  owner: [
    ["home", "首页"], ["consult", "智能咨询"], ["budget", "透明报价"],
    ["cases", "真实案例"], ["advisors", "咨询预约"], ["tools", "知识工具"], ["profile", "个人中心"]
  ],
  provider: [
    ["overview", "业务概览"], ["leads", "匹配线索"], ["quotes", "报价管理"],
    ["projects", "订单跟进"], ["portfolio", "案例管理"]
  ],
  admin: [
    ["dashboard", "运营看板"], ["orders", "订单管理"], ["providers", "资质审核"],
    ["risk", "风险预警"], ["content", "内容运营"]
  ]
};

const cases = [
  { id: 1, title: "湖畔花园 · 现代原木", image: "assets/hero-living-room.jpg", style: "现代原木", layout: "三室两厅", spaces: ["客厅", "餐厅", "主卧"], type: "旧房翻新", area: 112, budget: 28.6, days: 96, city: "杭州", liked: 126 },
  { id: 2, title: "云栖名邸 · 奶油侘寂", image: "assets/case-minimal.jpg", style: "奶油风", layout: "两室一厅", spaces: ["客厅", "主卧", "儿童房"], type: "毛坯整装", area: 89, budget: 21.8, days: 82, city: "杭州", liked: 98 },
  { id: 3, title: "钱江府 · 轻奢留白", image: "assets/case-light-luxury.jpg", style: "现代轻奢", layout: "四室两厅", spaces: ["客厅", "餐厅", "主卧", "书房"], type: "毛坯整装", area: 136, budget: 39.2, days: 118, city: "杭州", liked: 175 },
  { id: 4, title: "青芝坞 · 小户型焕新", image: "assets/case-minimal.jpg", style: "现代简约", layout: "两室一厅", spaces: ["厨房", "卫生间", "玄关"], type: "局部改造", area: 63, budget: 12.4, days: 51, city: "杭州", liked: 81 },
  { id: 5, title: "滨江映月 · 收纳之家", image: "assets/hero-living-room.jpg", style: "现代原木", layout: "三室两厅", spaces: ["客厅", "餐厅", "厨房", "主卧"], type: "毛坯整装", area: 104, budget: 25.1, days: 91, city: "杭州", liked: 113 },
  { id: 6, title: "西溪公馆 · 通透大宅", image: "assets/case-light-luxury.jpg", style: "现代轻奢", layout: "复式/别墅", spaces: ["客厅", "餐厅", "主卧", "书房"], type: "旧房翻新", area: 158, budget: 46.5, days: 126, city: "杭州", liked: 202 },
  { id: 7, title: "江南里 · 新中式雅居", image: "assets/case-warm-modern.jpg", style: "新中式", layout: "四室两厅", spaces: ["客厅", "餐厅", "书房", "主卧"], type: "毛坯整装", area: 142, budget: 42.8, days: 121, city: "杭州", liked: 154 },
  { id: 8, title: "春江明月 · 法式主卧", image: "assets/case-light-luxury.jpg", style: "法式", layout: "三室两厅", spaces: ["主卧", "次卧", "卫生间"], type: "旧房翻新", area: 118, budget: 31.6, days: 103, city: "杭州", liked: 137 },
  { id: 9, title: "星光公寓 · 厨餐焕新", image: "assets/case-minimal.jpg", style: "现代简约", layout: "两室两厅", spaces: ["厨房", "餐厅", "阳台"], type: "局部改造", area: 72, budget: 14.8, days: 56, city: "杭州", liked: 92 },
  { id: 10, title: "潮鸣苑 · 奶油亲子宅", image: "assets/case-warm-modern.jpg", style: "奶油风", layout: "三室一厅", spaces: ["客厅", "儿童房", "主卧", "阳台"], type: "旧房翻新", area: 96, budget: 23.9, days: 88, city: "杭州", liked: 145 },
  { id: 11, title: "运河宸园 · 原木书香家", image: "assets/hero-living-room.jpg", style: "现代原木", layout: "四室两厅", spaces: ["客厅", "书房", "餐厅", "主卧"], type: "毛坯整装", area: 138, budget: 38.5, days: 116, city: "杭州", liked: 189 },
  { id: 12, title: "武林壹号 · 法式会客厅", image: "assets/case-light-luxury.jpg", style: "法式", layout: "复式/别墅", spaces: ["客厅", "餐厅", "玄关", "主卧"], type: "旧房翻新", area: 186, budget: 63.8, days: 148, city: "杭州", liked: 238 },
  { id: 13, title: "未来科技城 · 极简独居", image: "assets/case-minimal.jpg", style: "现代简约", layout: "一室一厅", spaces: ["客厅", "厨房", "玄关", "阳台"], type: "毛坯整装", area: 48, budget: 10.9, days: 46, city: "杭州", liked: 76 },
  { id: 14, title: "申花郡 · 轻奢套房", image: "assets/case-light-luxury.jpg", style: "现代轻奢", layout: "三室一厅", spaces: ["客厅", "主卧", "次卧", "卫生间"], type: "旧房翻新", area: 105, budget: 29.7, days: 94, city: "杭州", liked: 132 },
  { id: 15, title: "良渚文化村 · 新中式院居", image: "assets/case-warm-modern.jpg", style: "新中式", layout: "复式/别墅", spaces: ["客厅", "餐厅", "书房", "玄关"], type: "毛坯整装", area: 172, budget: 58.2, days: 142, city: "杭州", liked: 221 },
  { id: 16, title: "钱塘云湾 · 奶油厨餐厅", image: "assets/case-minimal.jpg", style: "奶油风", layout: "两室两厅", spaces: ["厨房", "餐厅", "客厅"], type: "局部改造", area: 78, budget: 16.6, days: 62, city: "杭州", liked: 108 },
  { id: 17, title: "城西银泰 · 原木成长房", image: "assets/hero-living-room.jpg", style: "现代原木", layout: "三室两厅", spaces: ["儿童房", "书房", "主卧", "阳台"], type: "旧房翻新", area: 110, budget: 27.4, days: 92, city: "杭州", liked: 158 },
  { id: 18, title: "滨江奥体 · 轻奢卫浴套间", image: "assets/case-light-luxury.jpg", style: "现代轻奢", layout: "四室两厅", spaces: ["主卧", "卫生间", "次卧"], type: "局部改造", area: 151, budget: 24.8, days: 70, city: "杭州", liked: 119 },
  { id: 19, title: "九堡家园 · 简约阳台书房", image: "assets/case-minimal.jpg", style: "现代简约", layout: "两室一厅", spaces: ["阳台", "书房", "客厅"], type: "局部改造", area: 67, budget: 11.8, days: 49, city: "杭州", liked: 88 },
  { id: 20, title: "湘湖壹号 · 法式餐厨空间", image: "assets/case-light-luxury.jpg", style: "法式", layout: "四室两厅", spaces: ["餐厅", "厨房", "客厅", "玄关"], type: "毛坯整装", area: 145, budget: 44.6, days: 124, city: "杭州", liked: 176 },
  { id: 21, title: "西湖里 · 新中式书房", image: "assets/case-warm-modern.jpg", style: "新中式", layout: "三室一厅", spaces: ["书房", "客厅", "主卧"], type: "旧房翻新", area: 101, budget: 26.3, days: 89, city: "杭州", liked: 151 },
  { id: 22, title: "和家园 · 奶油主卧套间", image: "assets/case-warm-modern.jpg", style: "奶油风", layout: "两室一厅", spaces: ["主卧", "卫生间", "玄关"], type: "旧房翻新", area: 82, budget: 19.5, days: 73, city: "杭州", liked: 123 },
  { id: 23, title: "之江壹品 · 原木复式之家", image: "assets/hero-living-room.jpg", style: "现代原木", layout: "复式/别墅", spaces: ["客厅", "餐厅", "书房", "儿童房"], type: "毛坯整装", area: 168, budget: 52.7, days: 137, city: "杭州", liked: 217 },
  { id: 24, title: "丁桥景园 · 简约厨卫更新", image: "assets/case-minimal.jpg", style: "现代简约", layout: "三室一厅", spaces: ["厨房", "卫生间", "阳台"], type: "局部改造", area: 88, budget: 15.9, days: 59, city: "杭州", liked: 103 }
];

const providers = [
  { name: "林予安", role: "资深空间设计师", tag: "旧房翻新", signature: "让旧房保留记忆，也重新适合当下的生活。", spaces: ["客厅", "餐厅", "主卧", "书房"], layouts: ["三室两厅", "四室两厅", "复式/别墅"], styles: ["现代原木", "现代简约", "新中式"], caseIds: [1, 11, 15, 23], score: 4.9, years: 12, projects: 186, response: "3分钟", color: "#dff3e9" },
  { name: "周启明", role: "国家注册室内设计师", tag: "现代原木", signature: "先梳理动线与收纳，再谈空间的表情。", spaces: ["客厅", "餐厅", "厨房", "主卧"], layouts: ["两室一厅", "两室两厅", "三室两厅"], styles: ["现代原木", "奶油风", "现代简约"], caseIds: [2, 5, 10, 16], score: 4.8, years: 9, projects: 142, response: "5分钟", color: "#e8f1f7" },
  { name: "观筑设计", role: "平台金牌装修公司", tag: "全屋整装", signature: "从设计、报价到落地，用同一套标准交付。", spaces: ["客厅", "餐厅", "厨房", "主卧", "次卧", "儿童房", "卫生间"], layouts: ["两室两厅", "三室两厅", "四室两厅", "复式/别墅"], styles: ["现代原木", "现代轻奢", "新中式", "法式"], caseIds: [3, 7, 12, 20, 23], score: 4.9, years: 15, projects: 326, response: "2分钟", color: "#fff0df" },
  { name: "合度空间", role: "本地认证施工团队", tag: "施工工艺", signature: "好设计必须落到尺寸、材料和施工节点上。", spaces: ["厨房", "卫生间", "阳台", "玄关"], layouts: ["一室一厅", "两室一厅", "两室两厅", "三室一厅"], styles: ["现代简约", "奶油风"], caseIds: [4, 9, 13, 24], score: 4.7, years: 8, projects: 119, response: "8分钟", color: "#f2e9f4" },
  { name: "许清和", role: "环保材料顾问", tag: "环保选材", signature: "环保不是单一等级，而是一套空间用量与工艺控制。", spaces: ["厨房", "主卧", "儿童房", "书房"], layouts: ["两室一厅", "两室两厅", "三室两厅", "四室两厅"], styles: ["现代原木", "奶油风", "新中式"], caseIds: [11, 17, 21, 22], score: 4.9, years: 11, projects: 208, response: "4分钟", color: "#e9f3e0" },
  { name: "方寸法务", role: "装修合同咨询团队", tag: "合同避坑", signature: "把材料型号、增项边界与延期责任写进合同。", spaces: ["客厅", "厨房", "卫生间"], layouts: ["一室一厅", "两室一厅", "三室两厅", "复式/别墅"], styles: ["现代简约", "现代轻奢", "法式"], caseIds: [8, 14, 18, 20], score: 4.8, years: 7, projects: 154, response: "6分钟", color: "#f7e9e5" },
  { name: "苏棠", role: "色彩与软装设计师", tag: "奶油法式", signature: "用克制的色彩层次，让家柔和但不单调。", spaces: ["客厅", "餐厅", "主卧", "儿童房"], layouts: ["两室一厅", "两室两厅", "三室一厅", "三室两厅"], styles: ["奶油风", "法式", "现代原木"], caseIds: [2, 8, 10, 16, 22], score: 4.9, years: 8, projects: 128, response: "4分钟", color: "#f9e7df" },
  { name: "沈砚", role: "新中式空间设计师", tag: "东方美学", signature: "以现代生活为尺度，重写东方空间秩序。", spaces: ["客厅", "餐厅", "书房", "玄关", "主卧"], layouts: ["三室一厅", "四室两厅", "复式/别墅"], styles: ["新中式", "现代原木", "现代简约"], caseIds: [7, 15, 21, 23], score: 4.9, years: 13, projects: 167, response: "5分钟", color: "#e8eadf" },
  { name: "贺川", role: "小户型改造设计师", tag: "空间扩容", signature: "每一平方米，都应该承担清晰而灵活的功能。", spaces: ["客厅", "厨房", "阳台", "玄关", "卫生间"], layouts: ["一室一厅", "两室一厅", "两室两厅", "三室一厅"], styles: ["现代简约", "现代原木", "奶油风"], caseIds: [4, 9, 13, 19, 24], score: 4.8, years: 10, projects: 214, response: "3分钟", color: "#e4edf2" },
  { name: "顾南乔", role: "大宅全案设计师", tag: "轻奢法式", signature: "用比例和材质建立高级感，而不是堆砌装饰。", spaces: ["客厅", "餐厅", "主卧", "次卧", "玄关"], layouts: ["三室两厅", "四室两厅", "复式/别墅"], styles: ["现代轻奢", "法式", "新中式"], caseIds: [3, 6, 12, 14, 18, 20], score: 4.9, years: 14, projects: 193, response: "6分钟", color: "#f1e7e4" },
  { name: "叶知夏", role: "亲子成长空间设计师", tag: "儿童友好", signature: "为孩子保留成长弹性，也照顾全家人的秩序。", spaces: ["儿童房", "书房", "客厅", "主卧", "阳台"], layouts: ["两室一厅", "三室一厅", "三室两厅", "四室两厅"], styles: ["奶油风", "现代原木", "现代简约"], caseIds: [2, 5, 10, 17, 23], score: 4.9, years: 9, projects: 156, response: "3分钟", color: "#fff0cf" },
  { name: "陈屿", role: "厨卫专项设计师", tag: "厨卫改造", signature: "从使用频率出发，解决动线、收纳和清洁难题。", spaces: ["厨房", "卫生间", "餐厅", "阳台"], layouts: ["一室一厅", "两室一厅", "两室两厅", "三室一厅", "四室两厅"], styles: ["现代简约", "奶油风", "现代轻奢"], caseIds: [4, 9, 16, 18, 20, 24], score: 4.8, years: 11, projects: 239, response: "4分钟", color: "#dfeeed" },
  { name: "孟知微", role: "软装陈设设计师", tag: "氛围营造", signature: "从光线、织物和家具关系中建立家的情绪。", spaces: ["客厅", "餐厅", "主卧", "次卧"], layouts: ["两室一厅", "两室两厅", "三室一厅", "三室两厅"], styles: ["奶油风", "法式", "现代原木", "现代轻奢"], caseIds: [1, 2, 8, 10, 22], score: 4.8, years: 7, projects: 121, response: "5分钟", color: "#f4e4ee" },
  { name: "陆远", role: "别墅与复式设计师", tag: "结构动线", signature: "先解决楼层关系，再让每个空间自然连接。", spaces: ["客厅", "餐厅", "书房", "主卧", "玄关"], layouts: ["四室两厅", "复式/别墅"], styles: ["现代原木", "现代轻奢", "新中式", "法式"], caseIds: [6, 12, 15, 20, 23], score: 4.9, years: 16, projects: 178, response: "7分钟", color: "#e6e8f2" }
];

const discoveryFilters = {
  spaces: ["全部", "客厅", "餐厅", "厨房", "主卧", "次卧", "儿童房", "书房", "卫生间", "阳台", "玄关"],
  layouts: ["全部", "一室一厅", "两室一厅", "两室两厅", "三室一厅", "三室两厅", "四室两厅", "复式/别墅"],
  styles: ["全部", "现代原木", "奶油风", "现代简约", "现代轻奢", "新中式", "法式"]
};

const defaultProviderLeads = [
  { id: "ZJ-0825", need: "旧房翻新 · 现代原木", scope: "98㎡ / 25-35万", match: "96%", remaining: "18分钟", status: "待响应" },
  { id: "ZJ-0821", need: "毛坯整装 · 奶油风", scope: "126㎡ / 35-50万", match: "92%", remaining: "46分钟", status: "待响应" },
  { id: "ZJ-0816", need: "局部改造 · 厨卫", scope: "72㎡ / 15万内", match: "87%", remaining: "1小时", status: "待响应" }
];
const defaultQuotes = [
  { id: "BJ-260805", project: "滨江映月", amount: "25.8", check: "合理", updated: "今天 14:20", status: "草稿" },
  { id: "BJ-260801", project: "湖畔花园", amount: "28.6", check: "已锁定", updated: "8月1日", status: "已提交" }
];
const defaultProjects = [
  { id: "P-001", name: "湖畔花园 12-1-602", stage: "泥木施工", progress: 62, owner: "陈先生", next: "8月9日验收", status: "正常" },
  { id: "P-002", name: "滨江映月 3-2-1801", stage: "方案确认", progress: 28, owner: "李女士", next: "8月7日签约", status: "待跟进" },
  { id: "P-003", name: "云栖名邸 8-1-902", stage: "竣工验收", progress: 94, owner: "周先生", next: "8月6日归档", status: "正常" }
];
const defaultAdminOrders = [
  { id: "OD-26080531", user: "陈先生", need: "旧房翻新 · 98㎡", provider: "观筑设计", status: "咨询中", risk: "正常" },
  { id: "OD-26080527", user: "李女士", need: "毛坯整装 · 126㎡", provider: "待派单", status: "待咨询", risk: "响应超时" },
  { id: "OD-26080518", user: "周先生", need: "局部改造 · 72㎡", provider: "合度空间", status: "待售后", risk: "投诉关联" }
];
const defaultProviderAudits = [
  { id: "A-01", name: "致境空间设计", type: "装修公司", completeness: "100%", cases: "3/3 已核验", time: "今天 09:34", status: "待审核" },
  { id: "A-02", name: "唐宁设计工作室", type: "独立设计师", completeness: "92%", cases: "待补充", time: "昨天 16:20", status: "待补充" },
  { id: "A-03", name: "匠作施工队", type: "施工团队", completeness: "100%", cases: "2/2 已核验", time: "8月3日", status: "待审核" }
];
const defaultRisks = [
  { id: "R-01", level: "高风险", event: "报价显著低于指导价", subject: "良序空间", rule: "低于区间 31%", time: "10分钟前", status: "待核查" },
  { id: "R-02", level: "中风险", event: "聊天中疑似引导线下交易", subject: "合度空间", rule: "敏感词命中", time: "36分钟前", status: "待核查" },
  { id: "R-03", level: "中风险", event: "短时集中异常评价", subject: "木石营造", rule: "评价频率异常", time: "2小时前", status: "待核查" }
];
const defaultContents = [
  { id: "C-01", title: "89㎡奶油风完工实景", type: "装修案例", author: "观筑设计", quality: "图片已核验", time: "今天 11:26", status: "待审核" },
  { id: "C-02", title: "梅雨季墙面施工注意事项", type: "知识文章", author: "平台编辑", quality: "检测通过", time: "今天 09:12", status: "待审核" },
  { id: "C-03", title: "旧房拆改全过程", type: "短视频", author: "良序空间", quality: "需复核", time: "昨天 18:04", status: "待审核" }
];

const validRoutes = Object.fromEntries(
  Object.entries(navByRole).map(([role, items]) => [role, items.map(([route]) => route)])
);

function loadSession() {
  try { return JSON.parse(localStorage.getItem("zhujian-session") || "null"); }
  catch { return null; }
}

function loadData(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") || structuredClone(fallback); }
  catch { return structuredClone(fallback); }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function syncConsultRequest() {
  if (!state.session || state.session.role !== "owner") return;
  const c = state.consult;
  try {
    await api("/api/owner/consult-requests", {
      method: "POST",
      body: JSON.stringify({
        city: c.city || "杭州",
        area: Number(c.area || 96),
        houseType: c.layout || "两室一厅",
        decorationType: c.type || "毛坯整装",
        style: c.style || "现代原木",
        budgetRange: c.budget || "25-35 万",
        moveInTime: c.moveIn || "6 个月内",
        needs: [
          c.spaces?.length ? `重点空间：${c.spaces.join("、")}` : "",
          Array.isArray(c.needs) && c.needs.length ? `核心诉求：${c.needs.join("、")}` : (c.needs ? `核心诉求：${c.needs}` : "")
        ].filter(Boolean).join("；")
      })
    });
    showToast("需求已保存到平台数据库");
  } catch (error) {
    showToast(error.message || "需求暂时未同步，已保存在本地");
  }
}

async function acceptBackendLead(id) {
  const lead = state.providerLeads.find(item => item.id === id);
  if (!lead?.backendId) return false;
  try {
    const result = await api(`/api/provider/leads/${lead.backendId}/accept`, { method: "POST" });
    lead.status = result.status === "ACCEPTED" ? "已接单" : lead.status;
    return true;
  } catch (error) {
    showToast(error.message || "接单失败");
    return false;
  }
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    let message = `请求失败（${response.status}）`;
    try { message = (await response.json()).message || message; } catch { /* response may not be JSON */ }
    throw new Error(message);
  }
  return response.status === 204 ? null : response.json();
}

const storedSession = loadSession();

function routeHash(role, route) {
  return `#/${role}/${route}`;
}

function readRoute() {
  const activeSession = loadSession();
  const [role, route] = location.hash.replace(/^#\/?/, "").split("/");
  if (validRoutes[role]?.includes(route)) {
    if (role === "auth") return { role, route };
    if (activeSession && activeSession.role !== role) return { role: activeSession.role, route: roleHome(activeSession.role) };
    if (!activeSession && ["provider", "admin"].includes(role)) return { role: "auth", route: "login" };
    return { role, route };
  }
  if (activeSession) return { role: activeSession.role, route: roleHome(activeSession.role) };
  return { role: "owner", route: "home" };
}

const initialRoute = readRoute();

const state = {
  role: initialRoute.role,
  route: initialRoute.route,
  mobileOpen: false,
  consultStep: 0,
  consultComplete: false,
  consult: JSON.parse(localStorage.getItem("zhujian-consult") || "{}"),
  area: 96,
  grade: "quality",
  caseFilters: { space: "全部", layout: "全部", style: "全部" },
  advisorFilter: "综合推荐",
  advisorFilters: { space: "全部", layout: "全部", style: "全部" },
  aiOpen: false,
  aiPosition: loadAiPosition(),
  aiMessages: ["您好，我是筑见 AI 顾问。可以直接问我施工流程、材料鉴别、预算分配或验收标准。"],
  favorites: JSON.parse(localStorage.getItem("zhujian-favorites") || "[]"),
  appointments: JSON.parse(localStorage.getItem("zhujian-appointments") || "[]"),
  session: storedSession,
  providerLeads: loadData("zhujian-provider-leads", defaultProviderLeads),
  quotes: loadData("zhujian-provider-quotes", defaultQuotes),
  projects: loadData("zhujian-provider-projects", defaultProjects),
  portfolio: loadData("zhujian-provider-portfolio", []),
  adminOrders: loadData("zhujian-admin-orders", defaultAdminOrders),
  providerAudits: loadData("zhujian-provider-audits", defaultProviderAudits),
  risks: loadData("zhujian-admin-risks", defaultRisks),
  contents: loadData("zhujian-admin-contents", defaultContents),
  backendLoaded: false,
  dashboard: null
};

function loadAiPosition() {
  try {
    const position = JSON.parse(localStorage.getItem("zhujian-ai-position") || "null");
    if (position && Number.isFinite(position.x) && Number.isFinite(position.y)) {
      return { x: Number(position.x), y: Number(position.y) };
    }
  } catch { /* ignore malformed local UI preferences */ }
  return null;
}

function clampAiPosition(position, width = 72, height = 72) {
  const maxX = Math.max(8, window.innerWidth - width - 8);
  const maxY = Math.max(8, window.innerHeight - height - 8);
  return {
    x: Math.min(Math.max(8, position.x), maxX),
    y: Math.min(Math.max(8, position.y), maxY)
  };
}

function aiButtonPosition() {
  if (!state.aiPosition) return null;
  return clampAiPosition(state.aiPosition);
}

function aiButtonStyle() {
  const position = aiButtonPosition();
  return position ? `style="left:${Math.round(position.x)}px;top:${Math.round(position.y)}px;right:auto;bottom:auto"` : "";
}

function aiPanelCoordinates() {
  const position = aiButtonPosition();
  if (!position) return null;
  const panelWidth = Math.min(360, Math.max(240, window.innerWidth - 32));
  const panelHeight = Math.min(430, Math.max(260, window.innerHeight - 32));
  const maxLeft = Math.max(16, window.innerWidth - panelWidth - 16);
  const maxTop = Math.max(16, window.innerHeight - panelHeight - 16);
  const left = Math.min(Math.max(16, position.x + 78 - panelWidth), maxLeft);
  let top = position.y - panelHeight - 14;
  if (top < 16) top = Math.min(position.y + 82, maxTop);
  return { left, top: Math.max(16, top) };
}

function aiPanelStyle() {
  const position = aiPanelCoordinates();
  return position ? `style="left:${Math.round(position.left)}px;top:${Math.round(position.top)}px;right:auto;bottom:auto"` : "";
}

function money(value) {
  return new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 }).format(value);
}

function initials(name) {
  return name.length > 3 ? name.slice(0, 2) : name.slice(-2);
}

function roleHome(role) {
  return role === "auth" ? "login" : role === "owner" ? "home" : role === "provider" ? "overview" : "dashboard";
}

function pageTitle() {
  const found = navByRole[state.role].find(item => item[0] === state.route);
  return found ? found[1] : "首页";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function headerTemplate() {
  if (state.role === "auth") {
    return `<header class="topbar auth-topbar"><button class="brand" data-action="brand" aria-label="返回首页"><span class="brand-mark" aria-hidden="true"></span><span><span class="brand-name">筑见</span><span class="brand-sub">装修咨询服务智能平台</span></span></button><span></span><div class="auth-nav"><button class="text-link ${state.route === "login" ? "active" : ""}" data-action="navigate" data-route="login">登录</button><button class="btn btn-primary btn-small" data-action="navigate" data-route="register">注册</button></div></header>`;
  }
  const ownerNav = state.role === "owner" ? navByRole.owner.map(([route, label]) =>
    `<button class="nav-link ${state.route === route ? "active" : ""}" data-action="navigate" data-route="${route}" ${state.route === route ? 'aria-current="page"' : ""}>${label}</button>`
  ).join("") : "";
  const roleLabels = { owner: "业主端", provider: "服务商端", admin: "管理端" };
  return `
    <header class="topbar">
      <button class="brand" data-action="brand" aria-label="返回首页">
        <span class="brand-mark" aria-hidden="true"></span>
        <span><span class="brand-name">筑见</span><span class="brand-sub">装修咨询服务智能平台</span></span>
      </button>
      <nav class="main-nav ${state.mobileOpen ? "open" : ""}" aria-label="主导航">${ownerNav}</nav>
      <div class="top-actions">
        ${state.session ? `<span class="role-badge">${roleLabels[state.session.role]}</span>` : ""}
        ${state.session ? `<button class="account-chip" data-action="account" title="${state.session.name}"><span class="avatar">${state.session.name.slice(0, 1)}</span></button>` : `<button class="btn btn-secondary btn-small login-entry" data-action="login">登录 / 注册</button>`}
        ${state.role === "owner" ? `<button class="mobile-menu" data-action="toggle-menu" aria-label="展开导航">${state.mobileOpen ? "×" : "≡"}</button>` : ""}
      </div>
    </header>`;
}

function legacyAiTemplate() {
  return `
    ${state.aiOpen ? `<section class="ai-panel" aria-label="AI智能顾问">
      <div class="ai-head"><strong>AI 装修顾问 · 在线</strong><button data-action="toggle-ai" aria-label="关闭">×</button></div>
      <div class="ai-messages">${state.aiMessages.map((msg, index) => `<div class="message ${index % 2 ? "user" : ""}">${msg}</div>`).join("")}</div>
      <form class="ai-input" data-form="ai"><input name="message" placeholder="输入装修问题…" autocomplete="off"><button class="btn btn-primary btn-small">发送</button></form>
    </section>` : ""}
    <button class="ai-button" data-action="toggle-ai" aria-label="打开AI智能顾问">AI</button>`;
}

function positionedAiTemplate() {
  const open = state.aiOpen;
  return `
    ${open ? `<section class="ai-panel" aria-label="AI智能顾问" ${aiPanelStyle()}>
      <div class="ai-head"><strong>AI 装修顾问 · 在线</strong><button data-action="toggle-ai" aria-label="关闭 AI 智能顾问">×</button></div>
      <div class="ai-messages">${state.aiMessages.map((msg, index) => `<div class="message ${index % 2 ? "user" : ""}">${msg}</div>`).join("")}</div>
      <form class="ai-input" data-form="ai"><input name="message" placeholder="输入装修问题" autocomplete="off"><button class="btn btn-primary btn-small">发送</button></form>
    </section>` : ""}
    <button class="ai-button ${open ? "is-open" : ""}" data-action="toggle-ai" aria-label="${open ? "关闭" : "打开"} AI 智能顾问" aria-pressed="${open}" title="拖动 AI 顾问，点击打开对话" ${aiButtonStyle()}>
      <span class="ai-button-shell" aria-hidden="true"><span class="ai-spark ai-spark-large"></span><span class="ai-spark ai-spark-small"></span><span class="ai-monogram">AI</span><span class="ai-status-dot"></span></span>
      <span class="ai-button-label"><strong>AI 顾问</strong><small>7×24 在线</small></span>
    </button>`;
}

function aiTemplate() {
  const open = state.aiOpen;
  return `
    ${open ? `<section class="ai-panel" aria-label="AI智能顾问">
      <div class="ai-head"><strong>AI 装修顾问 · 在线</strong><button data-action="toggle-ai" aria-label="关闭 AI 智能顾问">×</button></div>
      <div class="ai-messages">${state.aiMessages.map((msg, index) => `<div class="message ${index % 2 ? "user" : ""}">${msg}</div>`).join("")}</div>
      <form class="ai-input" data-form="ai"><input name="message" placeholder="输入装修问题" autocomplete="off"><button class="btn btn-primary btn-small">发送</button></form>
    </section>` : ""}
    <button class="ai-button ${open ? "is-open" : ""}" data-action="toggle-ai" aria-label="${open ? "关闭" : "打开"} AI 智能顾问" aria-pressed="${open}" title="拖动 AI 顾问，点击打开对话" ${aiButtonStyle()}>
      <span class="ai-button-shell" aria-hidden="true"><span class="ai-spark ai-spark-large"></span><span class="ai-spark ai-spark-small"></span><span class="ai-monogram">AI</span><span class="ai-status-dot"></span></span>
    </button>`;
}

function authTemplate() {
  const isRegister = state.route === "register";
  const roles = isRegister ? [
    ["owner", "业", "业主用户", "咨询、预算、案例与售后"],
    ["provider", "服", "设计师 / 服务商", "线索、报价、项目与案例"]
  ] : [
    ["owner", "业", "业主用户", "进入个人装修服务中心"],
    ["provider", "服", "设计师 / 服务商", "进入服务商业务工作台"],
    ["admin", "管", "平台管理员", "进入平台运营管理中心"]
  ];
  return `<main class="auth-page">
    <section class="auth-visual" aria-label="筑见真实装修案例">
      <div class="auth-visual-content"><span class="eyebrow">专业 · 透明 · 可追溯</span><h1>${isRegister ? "建立你的装修服务档案" : "欢迎回到筑见"}</h1><p>需求、报价、方案、订单与售后记录统一保存，在对应工作台继续处理。</p><div class="auth-proof"><div><strong>2,860+</strong><span>真实完工案例</span></div><div><strong>327</strong><span>认证服务商</span></div><div><strong>98.6%</strong><span>报价完整率</span></div></div><div class="auth-trust"><span>✓ 资质公开核验</span><span>✓ 报价全程留存</span><span>✓ 售后工单保障</span></div></div>
    </section>
    <section class="auth-form-wrap"><form class="auth-form" data-form="${isRegister ? "register" : "login"}">
      <div class="auth-heading"><span class="eyebrow">${isRegister ? "创建账号" : "账号登录"}</span><h2>${isRegister ? "注册筑见账号" : "登录装修服务平台"}</h2><p>${isRegister ? "业主与服务商可在线注册；管理员账号由平台内部开通。" : "选择账号身份，系统将进入对应且唯一的业务工作台。"}</p></div>
      ${isRegister ? `<div class="field"><label>姓名 / 企业名称</label><input name="name" autocomplete="name" required placeholder="请输入名称"></div><div class="field"><label>手机号</label><input name="phone" type="tel" autocomplete="tel" required placeholder="请输入手机号"></div>` : `<div class="field"><label>账号</label><input name="account" autocomplete="username" required placeholder="手机号 / 企业账号"></div>`}
      <fieldset class="auth-role-field"><legend>${isRegister ? "注册身份" : "登录身份"}</legend><div class="auth-role-grid">${roles.map(([value, mark, label, detail], index) => `<label class="auth-role-option"><input type="radio" name="role" value="${value}" ${index === 0 ? "checked" : ""}><span class="auth-role-mark">${mark}</span><span><strong>${label}</strong><small>${detail}</small></span></label>`).join("")}</div></fieldset>
      <div class="field"><label>密码</label><input name="password" type="password" autocomplete="${isRegister ? "new-password" : "current-password"}" minlength="6" required placeholder="请输入至少 6 位密码"></div>
      ${isRegister ? `<div class="field"><label>确认密码</label><input name="confirm" type="password" autocomplete="new-password" minlength="6" required placeholder="请再次输入密码"></div>` : `<div class="auth-assist"><label><input type="checkbox" name="remember" checked> 记住登录状态</label><button type="button" class="text-link" data-action="forgot-password">忘记密码</button></div>`}
      <button class="btn btn-primary auth-submit">${isRegister ? "注册并进入平台" : "登录"}</button>
      <p class="auth-switch">${isRegister ? "已有账号？" : "还没有账号？"}<button type="button" class="text-link" data-action="navigate" data-route="${isRegister ? "login" : "register"}">${isRegister ? "立即登录" : "免费注册"}</button></p>
    </form></section>
  </main>`;
}

function homeTemplate() {
  return `<main class="page">
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow" style="color:#bce1cf">从需求到交付 · 全程透明可追溯</span>
        <h1>装修这件事，先把每一步看清楚</h1>
        <p>用一份清晰的需求、一套公开的报价和一组真实的本地案例，帮你找到真正适合的方案与服务团队。</p>
        <div class="hero-actions">
          <button class="btn btn-coral" data-action="navigate" data-route="consult">生成我的装修方案</button>
          <button class="btn btn-secondary" data-action="navigate" data-route="budget">先测一测预算</button>
        </div>
      </div>
      <div class="hero-trust"><div class="trust-inner">
        <div class="trust-item"><strong>2,860+</strong><span>本地真实完工案例</span></div>
        <div class="trust-item"><strong>98.6%</strong><span>报价明细完整率</span></div>
        <div class="trust-item"><strong>327 位</strong><span>已核验服务商</span></div>
        <div class="trust-item"><strong>7×24h</strong><span>AI 装修咨询在线</span></div>
      </div></div>
    </section>

    <section class="quick-start"><form class="container quick-grid" data-form="quick-plan">
      <div class="quick-intro"><h2>30 秒获取参考方案</h2><p>先填写基础信息，预算与匹配建议会立即生成</p></div>
      <div class="field"><label>所在城市</label><select name="city"><option>杭州</option><option>上海</option><option>苏州</option><option>宁波</option></select></div>
      <div class="field"><label>建筑面积</label><input name="area" type="number" min="20" max="500" value="96" required></div>
      <div class="field"><label>装修类型</label><select name="type"><option>毛坯整装</option><option>旧房翻新</option><option>局部改造</option><option>工装装修</option></select></div>
      <button class="btn btn-primary">立即测算</button>
    </form></section>

    <section class="section"><div class="container">
      <div class="section-head"><div><span class="eyebrow">核心服务</span><h2>把复杂装修，变成清晰的四步</h2><p>决策有依据、过程有记录、售后有保障。</p></div></div>
      <div class="feature-strip">
        ${[
          ["01", "需求智能梳理", "模块化选择户型、风格、预算和核心诉求，自动形成标准需求档案。"],
          ["02", "预算透明测算", "按本地指导价拆分硬装、主材、软装和服务费，提前发现超支风险。"],
          ["03", "服务精准匹配", "结合擅长领域、真实口碑和响应效率，推荐适配设计师与施工团队。"],
          ["04", "过程全程留痕", "咨询、报价、方案、订单与售后工单统一归档，随时查阅下载。"]
        ].map(item => `<div class="feature-item"><span class="feature-number">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></div>`).join("")}
      </div>
    </div></section>

    <section class="section soft"><div class="container">
      <div class="section-head"><div><span class="eyebrow">本地实景</span><h2>看得到预算的真实案例</h2><p>完工、验收、报价与业主评价均可追溯。</p></div><button class="text-link" data-action="navigate" data-route="cases">查看全部案例 →</button></div>
      <div class="case-grid">${cases.slice(0, 3).map(caseCard).join("")}</div>
    </div></section>

    <section class="section"><div class="container home-split">
      <div>
        <div class="section-head compact"><div><span class="eyebrow">专业咨询</span><h2>有具体问题，直接找对人</h2><p>设计、施工、合同与环保顾问的资质和评价公开可查。</p></div></div>
        <div class="home-advisor-list">${providers.slice(0, 3).map(provider => `<div class="home-advisor"><div class="avatar-square" style="background:${provider.color}">${initials(provider.name)}</div><div><strong>${provider.name}</strong><span>${provider.role} · ${provider.score} 分</span></div><button class="btn btn-secondary btn-small" data-action="appointment" data-provider="${provider.name}">预约</button></div>`).join("")}</div>
        <button class="text-link section-link" data-action="navigate" data-route="advisors">查看全部认证顾问 →</button>
      </div>
      <div>
        <div class="section-head compact"><div><span class="eyebrow">避坑知识</span><h2>装修前，先把关键规则弄懂</h2><p>围绕报价、材料和验收持续更新的本地实用内容。</p></div></div>
        <div class="article-list">
          <button data-action="article" data-title="水电验收的 12 个关键点"><span>施工验收</span><strong>水电验收的 12 个关键点</strong><small>6 分钟阅读 · 今天更新</small></button>
          <button data-action="article" data-title="装修报价单最容易漏掉的 8 项"><span>合同避坑</span><strong>装修报价单最容易漏掉的 8 项</strong><small>8 分钟阅读 · 昨天更新</small></button>
          <button data-action="article" data-title="环保板材等级怎么选"><span>材料鉴别</span><strong>环保板材等级怎么选</strong><small>5 分钟阅读 · 3 天前更新</small></button>
        </div>
        <button class="text-link section-link" data-action="navigate" data-route="tools">进入知识与工具库 →</button>
      </div>
    </div></section>

    <section class="section dark"><div class="container">
      <div class="section-head"><div><span class="eyebrow" style="color:#86c5a5">服务闭环</span><h2>每个节点，都有清楚的下一步</h2><p>从第一次需求提交到售后归档，平台持续记录并提醒。</p></div></div>
      <div class="flow">${[
        ["1", "提交需求", "形成结构化标签，生成初步预算范围。"],
        ["2", "方案匹配", "推荐同类案例、设计师与材料方向。"],
        ["3", "比价履约", "多家标准报价对比，过程节点实时跟进。"],
        ["4", "验收售后", "验收清单、凭证归档与争议工单处理。"]
      ].map(item => `<div class="flow-step"><span class="flow-dot">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></div>`).join("")}</div>
    </div></section>
  </main>`;
}

function caseCard(item) {
  const favorite = state.favorites.includes(item.id);
  const itemSpaces = item.spaces || ["全屋"];
  return `<article class="case-card" data-style="${item.style}">
    <img src="${item.image}" alt="${item.title}室内实景" loading="lazy">
    <div class="case-body">
      <div class="case-meta"><span class="tag">${item.style}</span><span class="tag">${item.layout || "全屋户型"}</span><span class="tag">${itemSpaces.slice(0, 2).join(" · ")}</span></div>
      <h3>${item.title}</h3><p>${item.area}㎡ · ${item.days} 天完工 · 已核验业主评价</p>
      <div class="case-footer"><span>实际总造价 <strong>${item.budget} 万</strong></span><button class="text-link" data-action="favorite" data-id="${item.id}">${favorite ? "已收藏" : "收藏"}</button></div>
    </div>
  </article>`;
}

function pageHead(title, description) {
  return `<section class="page-head"><div class="container"><div class="breadcrumb">筑见 / ${title}</div><h1>${title}</h1><p>${description}</p></div></section>`;
}

const consultSteps = [
  { key: "type", title: "这次准备怎么装？", options: [["毛坯整装", "新房从零开始"], ["旧房翻新", "整体拆改与升级"], ["局部改造", "厨房、卫生间等"], ["工装装修", "办公或商业空间"]] },
  { key: "home", title: "告诉我们房屋情况", fields: true },
  { key: "spaces", title: "这次重点设计哪些空间？", options: [["客厅", "会客、收纳与家庭活动"], ["餐厅", "就餐动线与餐边收纳"], ["厨房", "操作动线与橱柜布局"], ["主卧", "睡眠、衣柜与私密体验"], ["次卧", "客房或灵活居住空间"], ["儿童房", "成长、安全与学习收纳"], ["书房", "办公、阅读与安静氛围"], ["卫生间", "干湿分离与防水收纳"], ["阳台", "洗晒、休闲或家政空间"], ["玄关", "入户收纳与归家动线"]], multi: true },
  { key: "style", title: "偏好的空间风格", options: [["现代原木", "温暖自然、耐看"], ["奶油风", "柔和明亮、松弛"], ["现代简约", "利落实用、克制"], ["现代轻奢", "材质精致、有层次"], ["新中式", "东方气韵、留白"], ["还不确定", "让顾问结合户型推荐"]] },
  { key: "needs", title: "最在意什么？", options: [["环保", "低醛材料与通风"], ["收纳", "提升有效储物空间"], ["性价比", "把钱用在关键位置"], ["智能家装", "全屋设备联动"], ["适老", "安全与无障碍"], ["亲子", "成长型空间规划"]], multi: true }
];

function consultTemplate() {
  if (state.consultComplete) return consultResultTemplate();
  const step = consultSteps[state.consultStep];
  const content = step.fields ? `<div class="form-grid">
    <div class="field"><label>所在城市</label><select data-consult="city"><option>杭州</option><option>上海</option><option>苏州</option><option>宁波</option></select></div>
    <div class="field"><label>建筑面积（㎡）</label><input data-consult="area" type="number" min="20" max="500" value="${state.consult.area || 96}"></div>
    <div class="field"><label>户型</label><select data-consult="layout">${["一室一厅", "两室一厅", "两室两厅", "三室一厅", "三室两厅", "四室两厅", "复式/别墅"].map(layout => `<option ${(state.consult.layout || "两室一厅") === layout ? "selected" : ""}>${layout}</option>`).join("")}</select></div>
    <div class="field"><label>预算区间</label><select data-consult="budget"><option>15-25 万</option><option>25-35 万</option><option>35-50 万</option><option>50 万以上</option></select></div>
    <div class="field"><label>计划入住</label><select data-consult="moveIn"><option>6 个月内</option><option>6-12 个月</option><option>1 年以后</option><option>暂未确定</option></select></div>
    <div class="field"><label>常住人口</label><select data-consult="family"><option>1-2 人</option><option>3 人</option><option>4 人及以上</option><option>含老人/儿童</option></select></div>
  </div>` : `<div class="option-group">${step.options.map(([value, note]) => {
    const current = step.multi ? (state.consult[step.key] || []) : state.consult[step.key];
    const selected = step.multi ? current.includes(value) : current === value;
    return `<button class="option ${selected ? "selected" : ""}" data-action="select-consult" data-key="${step.key}" data-value="${value}" data-multi="${step.multi ? "1" : "0"}"><strong>${value}</strong><small>${note}</small></button>`;
  }).join("")}</div>`;
  return `<main class="page">${pageHead("智能需求咨询", "勾选你的真实情况，约 2 分钟生成专属装修建议与匹配结果。")}
    <div class="container content-grid"><section class="panel">
      <div class="panel-body">
        <div class="stepper five-steps">${consultSteps.map((item, index) => `<div class="step ${index === state.consultStep ? "active" : index < state.consultStep ? "done" : ""}"><span class="step-index">${index + 1}</span><span>${["装修类型", "户型情况", "空间选择", "风格偏好", "核心诉求"][index]}</span></div>`).join("")}</div>
        <div class="form-section"><h3>${step.title}</h3>${content}</div>
        <div class="form-actions"><button class="btn btn-secondary" data-action="consult-prev" ${state.consultStep === 0 ? "disabled" : ""}>上一步</button><button class="btn btn-primary" data-action="consult-next">${state.consultStep === consultSteps.length - 1 ? "生成专属方案" : "下一步"}</button></div>
      </div>
    </section><aside class="aside-stack">
      <div class="aside-note"><h3>你的信息只用于方案匹配</h3><p>需求标签会保存到个人中心，用于预算测算、案例推荐和服务商匹配，不会公开展示联系方式。</p></div>
      <div class="panel"><div class="panel-header"><h3>已完成信息</h3></div><div class="panel-body"><div class="tags">${Object.values(state.consult).flat().filter(Boolean).map(value => `<span class="tag">${value}</span>`).join("") || "<span style='color:var(--muted);font-size:12px'>尚未选择</span>"}</div></div></div>
    </aside></div>
  </main>`;
}

function consultResultTemplate() {
  const area = Number(state.consult.area || 96);
  const low = (area * 0.19).toFixed(1);
  const high = (area * 0.27).toFixed(1);
  return `<main class="page">${pageHead("你的专属装修建议", "已根据房屋信息、风格与核心诉求完成初步分析。")}
    <div class="container content-grid"><section>
      <div class="result-hero"><span class="label">方案编号 ZJ-${new Date().getFullYear()}-0805</span><h2>${area}㎡ ${state.consult.style || "现代原木"}焕新方案</h2><p>建议采用“功能优先、重点投入”的预算策略，预留 8% 机动金控制增项。</p></div>
      <div class="metric-row"><div class="metric"><span>合理预算范围</span><strong>${low}-${high} 万</strong></div><div class="metric"><span>参考施工周期</span><strong>${Math.round(area * .82)}-${Math.round(area * .96)} 天</strong></div><div class="metric"><span>匹配服务商</span><strong>12 家</strong></div></div>
      <div class="panel" style="margin-top:18px"><div class="panel-header"><h3>高匹配顾问</h3><button class="text-link" data-action="navigate" data-route="advisors">查看全部</button></div><div class="panel-body recommend-list">${providers.slice(0,3).map(provider => `<div class="recommend"><div class="avatar-square" style="background:${provider.color}">${initials(provider.name)}</div><div><h4>${provider.name} · ${provider.role}</h4><p>擅长 ${provider.tag} · ${provider.years} 年经验 · 评分 ${provider.score}</p></div><button class="btn btn-secondary btn-small" data-action="appointment" data-provider="${provider.name}">预约</button></div>`).join("")}</div></div>
    </section><aside class="aside-stack"><div class="aside-note"><h3>预算风险提示</h3><p>当前面积建议重点关注定制柜体、水电点位与墙体拆改。正式报价时平台会自动校验单价异常与漏项。</p></div><button class="btn btn-primary" data-action="navigate" data-route="budget">查看完整预算拆分</button><button class="btn btn-secondary" data-action="restart-consult">重新填写需求</button></aside></div>
  </main>`;
}

function budgetTemplate() {
  const rates = { economy: 1600, quality: 2400, premium: 3600 };
  const labels = { economy: "实用型", quality: "品质型", premium: "改善型" };
  const total = state.area * rates[state.grade] / 10000;
  const parts = [["基础施工", .31], ["主材设备", .37], ["定制软装", .24], ["设计服务", .08]];
  return `<main class="page">${pageHead("透明报价与预算", "基于本地指导价测算，所有费用按项目拆分，帮你提前识别高成本项。")}
    <section class="section"><div class="container">
      <div class="budget-layout"><div>
        <div class="budget-total"><span>参考总预算 · ${labels[state.grade]}</span><div class="number">¥ ${money(total)} 万</div><p>报价更新于 2026-08-05 · 杭州地区参考</p></div>
        <div class="panel" style="margin-top:14px"><div class="panel-body">
          <div class="field"><label>建筑面积：<strong>${state.area}㎡</strong></label><input type="range" min="40" max="260" value="${state.area}" data-action="budget-area"></div>
          <div class="field" style="margin-top:18px"><label>装修档次</label><select data-action="budget-grade"><option value="economy" ${state.grade === "economy" ? "selected" : ""}>实用型 · 约 1600 元/㎡</option><option value="quality" ${state.grade === "quality" ? "selected" : ""}>品质型 · 约 2400 元/㎡</option><option value="premium" ${state.grade === "premium" ? "selected" : ""}>改善型 · 约 3600 元/㎡</option></select></div>
        </div></div>
      </div><div class="panel"><div class="panel-header"><h2>费用构成</h2><span class="status">预算健康</span></div><div class="panel-body breakdown">
        ${parts.map(([label, percent]) => `<div class="bar-row"><span>${label}</span><div class="bar"><span style="width:${percent * 100}%"></span></div><strong>${money(total * percent)} 万</strong></div>`).join("")}
        <div class="aside-note" style="margin-top:10px"><h3>智能建议</h3><p>建议另预留 ${money(total * .08)} 万机动金。定制柜体占比略高时，可先锁定板材环保等级与五金型号再询价。</p></div>
      </div></div></div>

      <div class="section-head" style="margin-top:46px"><div><span class="eyebrow">三方比价</span><h2>同一模板，逐项对比</h2><p>异常单价、缺失项目和潜在增项由系统自动标记。</p></div><button class="btn btn-secondary" data-action="download">导出预算表</button></div>
      <div class="panel table-wrap"><table><thead><tr><th>服务商</th><th>总报价</th><th>完整度</th><th>风险检测</th><th>响应时间</th><th>操作</th></tr></thead><tbody>
        <tr><td><strong>观筑设计</strong></td><td>${money(total * .98)} 万</td><td>100%</td><td><span class="status">合理</span></td><td>2 分钟</td><td><button class="text-link" data-action="quote-detail">查看明细</button></td></tr>
        <tr><td><strong>良序空间</strong></td><td>${money(total * .91)} 万</td><td>96%</td><td><span class="status warn">2 项待确认</span></td><td>8 分钟</td><td><button class="text-link" data-action="quote-detail">查看明细</button></td></tr>
        <tr><td><strong>木石营造</strong></td><td>${money(total * 1.08)} 万</td><td>100%</td><td><span class="status info">主材偏高</span></td><td>5 分钟</td><td><button class="text-link" data-action="quote-detail">查看明细</button></td></tr>
      </tbody></table></div>
    </div></section>
  </main>`;
}

function discoveryValue(item, key) {
  if (key === "space") return item.spaces || [];
  if (key === "layout") return item.layouts || item.layout || [];
  if (key === "style") return item.styles || item.style || [];
  return [];
}

function discoveryMatches(item, filters) {
  return Object.entries(filters).every(([key, selected]) => {
    if (selected === "全部") return true;
    const value = discoveryValue(item, key);
    return Array.isArray(value) ? value.includes(selected) : value === selected;
  });
}

function hasDiscoveryFilter(filters) {
  return Object.values(filters).some(value => value !== "全部");
}

function discoverySummary(filters) {
  const selected = Object.values(filters).filter(value => value !== "全部");
  return selected.length ? selected.join(" · ") : "当前展示全部空间、户型与风格";
}

function discoveryFilterRow(scope, key, label, options, selected) {
  return `<div class="discovery-filter-row"><div class="discovery-filter-label">${label}</div><div class="discovery-filter-options">${options.map(option => `<button class="discovery-filter-option ${selected === option ? "active" : ""}" data-action="filter-discovery" data-scope="${scope}" data-key="${key}" data-value="${option}" aria-pressed="${selected === option}">${option}</button>`).join("")}</div></div>`;
}

function discoveryFilterPanel(scope, filters) {
  const hasConsultPreference = Boolean(state.consult.layout || state.consult.style || state.consult.spaces?.length);
  return `<section class="discovery-filter-panel" aria-label="空间户型风格筛选">
    <div class="discovery-filter-head"><div><span class="eyebrow">精准筛选</span><h2>先选空间，再匹配户型与风格</h2></div>${hasConsultPreference ? `<button class="btn btn-secondary btn-small" data-action="apply-consult-filters" data-scope="${scope}">使用我的需求</button>` : ""}</div>
    ${discoveryFilterRow(scope, "space", "空间", discoveryFilters.spaces, filters.space)}
    ${discoveryFilterRow(scope, "layout", "户型", discoveryFilters.layouts, filters.layout)}
    ${discoveryFilterRow(scope, "style", "风格", discoveryFilters.styles, filters.style)}
  </section>`;
}

function providerCases(provider) {
  return (provider.caseIds || []).map(id => cases.find(item => item.id === id)).filter(Boolean);
}

function providerWorkPreview(provider) {
  const works = providerCases(provider).slice(0, 3);
  return `<div class="provider-work-preview">${works.map(work => `<button data-action="view-portfolio" data-provider="${provider.name}" aria-label="查看 ${provider.name} 的作品：${work.title}"><img src="${work.image}" alt="${work.title}" loading="lazy"><span><strong>${work.title.split(" · ").pop()}</strong><small>${work.style} · ${work.area}㎡</small></span></button>`).join("")}</div>`;
}

function providerCard(provider) {
  const works = providerCases(provider);
  return `<article class="provider-card provider-row">
    <div class="provider-profile">
      <div class="provider-top"><div class="avatar-square" style="background:${provider.color}">${initials(provider.name)}</div><div><h3>${provider.name}</h3><p>${provider.role}</p><small>${provider.years} 年从业经验 · 杭州本地服务</small></div></div>
      <div class="tags"><span class="tag">资质已核验</span><span class="tag">${provider.tag}</span><span class="tag">${works.length} 套精选作品</span></div>
      <p class="provider-signature">“${provider.signature}”</p>
      <div class="provider-expertise"><span>擅长空间</span><strong>${provider.spaces.slice(0, 4).join("、")}</strong><span>适配户型</span><strong>${provider.layouts.slice(0, 3).join("、")}</strong><span>设计风格</span><strong>${provider.styles.join("、")}</strong></div>
      <div class="provider-stats"><div class="provider-stat"><strong class="rating">${provider.score}</strong><span>服务评分</span></div><div class="provider-stat"><strong>${provider.projects}</strong><span>服务案例</span></div><div class="provider-stat"><strong>${provider.response}</strong><span>平均响应</span></div></div>
      <div class="provider-actions"><button class="btn btn-secondary" data-action="view-portfolio" data-provider="${provider.name}">查看作品</button><button class="btn btn-primary" data-action="appointment" data-provider="${provider.name}">预约咨询</button></div>
    </div>
    <div class="provider-showcase"><div class="provider-showcase-head"><div><span class="eyebrow">SELECTED WORKS</span><h4>${provider.name}的代表作品</h4></div><button class="text-link" data-action="view-portfolio" data-provider="${provider.name}">查看全部 ${works.length} 套 →</button></div>${providerWorkPreview(provider)}</div>
  </article>`;
}

function casesTemplate() {
  const shown = cases.filter(item => discoveryMatches(item, state.caseFilters));
  return `<main class="page">${pageHead("本地真实案例库", "按重点空间、房屋户型和喜欢的风格筛选真实完工案例，快速找到更接近你家的参考方案。")}
    <section class="section"><div class="container">
      ${discoveryFilterPanel("case", state.caseFilters)}
      <div class="result-toolbar"><div><strong>为你找到 ${shown.length} 套案例</strong><span>${discoverySummary(state.caseFilters)}</span></div>${hasDiscoveryFilter(state.caseFilters) ? `<button class="text-link" data-action="clear-discovery-filters" data-scope="case">清空筛选</button>` : ""}</div>
      ${shown.length ? `<div class="case-grid">${shown.map(caseCard).join("")}</div>` : emptyTemplate("暂无完全匹配的案例", "可以减少一个筛选条件，或清空筛选后查看全部案例")}
    </div></section>
  </main>`;
}

function advisorsTemplate() {
  const filters = ["综合推荐", "空间设计", "施工工艺", "合同避坑", "环保材料"];
  const categoryProviders = state.advisorFilter === "综合推荐" ? providers : providers.filter(provider => {
    if (state.advisorFilter === "空间设计") return provider.role.includes("设计") || provider.tag.includes("整装");
    if (state.advisorFilter === "环保材料") return provider.tag.includes("环保");
    return provider.tag.includes(state.advisorFilter) || provider.role.includes(state.advisorFilter);
  });
  const shown = categoryProviders.filter(provider => discoveryMatches(provider, state.advisorFilters));
  return `<main class="page">${pageHead("专业咨询与预约", "先选择要改造的空间、房屋户型和偏好风格，再匹配经验更合适的设计师与服务商。")}
    <section class="section"><div class="container">
      <div class="advisor-tabs">${filters.map(filter => `<button class="filter-chip ${state.advisorFilter === filter ? "active" : ""}" data-action="filter-advisor" data-filter="${filter}">${filter}</button>`).join("")}</div>
      ${discoveryFilterPanel("advisor", state.advisorFilters)}
      <div class="result-toolbar"><div><strong>已匹配 ${shown.length} 位服务顾问</strong><span>${discoverySummary(state.advisorFilters)}</span></div>${hasDiscoveryFilter(state.advisorFilters) ? `<button class="text-link" data-action="clear-discovery-filters" data-scope="advisor">清空筛选</button>` : ""}</div>
      ${shown.length ? `<div class="provider-grid">${shown.map(providerCard).join("")}</div>` : emptyTemplate("暂无完全匹配的服务商", "可以减少一个筛选条件，系统会为你展示更多候选服务商")}
    </div></section></main>`;
}

function toolsTemplate() {
  const tools = [
    ["面积", "装修面积测算", "按户型与套内数据估算墙地面施工面积。"], ["工期", "装修工期倒计时", "生成节点计划并提醒材料进场与验收。"], ["验收", "家装验收清单", "水电、泥木、油漆和竣工逐项自查。"],
    ["材料", "材料真伪查询", "录入品牌与防伪码，保存核验结果。"], ["合同", "合同风险自查", "快速排查付款比例、增项和延期条款。"], ["知识", "装修知识库", "施工流程、选材和本地指导价持续更新。"]
  ];
  return `<main class="page">${pageHead("装修知识与便民工具", "不用跳转第三方平台，从前期测算到完工验收都能一站完成。")}
    <section class="section"><div class="container"><div class="tool-grid">${tools.map(item => `<button class="tool-item" data-action="open-tool" data-tool="${item[1]}" style="text-align:left"><span class="tool-mark">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></button>`).join("")}</div>
      <div class="section-head" style="margin-top:52px"><div><span class="eyebrow">精选知识</span><h2>这周值得先看</h2></div></div>
      <div class="panel table-wrap"><table><thead><tr><th>主题</th><th>分类</th><th>阅读时长</th><th>更新时间</th><th></th></tr></thead><tbody><tr><td><strong>水电验收的 12 个关键点</strong></td><td>施工验收</td><td>6 分钟</td><td>今天</td><td><button class="text-link" data-action="article" data-title="水电验收的 12 个关键点">阅读</button></td></tr><tr><td><strong>装修报价单最容易漏掉的 8 项</strong></td><td>合同避坑</td><td>8 分钟</td><td>昨天</td><td><button class="text-link" data-action="article" data-title="装修报价单最容易漏掉的 8 项">阅读</button></td></tr><tr><td><strong>环保板材等级怎么选</strong></td><td>材料鉴别</td><td>5 分钟</td><td>3 天前</td><td><button class="text-link" data-action="article" data-title="环保板材等级怎么选">阅读</button></td></tr></tbody></table></div>
    </div></section></main>`;
}

function profileTemplate() {
  const favoriteCases = cases.filter(item => state.favorites.includes(item.id));
  return `<main class="page">${pageHead("个人中心", "咨询、报价、预约、收藏与售后记录统一归档。")}
    <section class="section"><div class="container content-grid"><section class="aside-stack">
      <div class="panel"><div class="panel-header"><h2>我的预约</h2><span class="status">${state.appointments.length} 条</span></div><div class="panel-body">${state.appointments.length ? `<div class="saved-list">${state.appointments.map(item => `<div class="saved-item"><div><h4>${item.provider} · ${item.service}</h4><p>${item.space ? `${item.space} · ${item.layout} · ${item.style}<br>` : ""}${item.date} ${item.time} · ${item.contact}</p></div><span class="status warn">待确认</span></div>`).join("")}</div>` : emptyTemplate("暂无预约", "去顾问列表预约一次免费咨询")}</div></div>
      <div class="panel"><div class="panel-header"><h2>收藏案例</h2><span class="status info">${favoriteCases.length} 个</span></div><div class="panel-body">${favoriteCases.length ? `<div class="saved-list">${favoriteCases.map(item => `<div class="saved-item"><div><h4>${item.title}</h4><p>${item.area}㎡ · ${item.budget} 万 · ${item.style}</p></div><button class="text-link" data-action="favorite" data-id="${item.id}">移除</button></div>`).join("")}</div>` : emptyTemplate("还没有收藏", "案例库中的真实造价可以作为预算参考")}</div></div>
      <div class="panel"><div class="panel-header"><h2>服务档案</h2><span class="status info">永久留存</span></div><div class="panel-body saved-list">
        <div class="saved-item"><div><h4>装修需求方案</h4><p>${state.consult.type || "旧房翻新"} · ${state.consult.area || 96}㎡ · ${state.consult.style || "现代原木"}</p></div><button class="text-link" data-action="navigate" data-route="consult">查看</button></div>
        <div class="saved-item"><div><h4>预算测算记录</h4><p>杭州指导价 · 品质型 · 更新于今天</p></div><button class="text-link" data-action="navigate" data-route="budget">查看</button></div>
        <div class="saved-item"><div><h4>售后保障工单</h4><p>投诉凭证、处理进度与仲裁记录统一归档</p></div><button class="text-link" data-action="support-ticket">新建工单</button></div>
      </div></div>
    </section><aside class="aside-stack"><div class="panel"><div class="panel-body"><div class="provider-top"><div class="avatar-square">${state.session?.name?.slice(0, 1) || "陈"}</div><div><h3>${state.session?.name || "陈先生"}</h3><p>杭州 · 业主用户</p></div></div><div class="profile-actions"><button class="btn btn-secondary" data-action="profile-edit">编辑资料</button><button class="btn btn-ghost" data-action="logout">退出登录</button></div></div></div><div class="aside-note"><h3>数据存档</h3><p>需求方案、预约与报价操作已自动保存在当前浏览器。接入账号系统后可同步至云端。</p></div></aside></div></section>
  </main>`;
}

function emptyTemplate(title, detail) {
  return `<div class="empty"><div class="empty-mark">+</div><strong>${title}</strong><p>${detail}</p></div>`;
}

const workspaceData = {
  provider: {
    overview: ["业务概览", "聚焦新线索、待报价和履约节点。"], leads: ["智能匹配线索", "系统按擅长领域、响应率与服务半径推荐。"], quotes: ["标准化报价", "统一模板提交，自动检测价格偏差与缺项。"], projects: ["订单与项目", "跟进咨询、量房、设计、施工和售后节点。"], portfolio: ["案例管理", "维护真实完工案例与店铺展示内容。"]
  },
  admin: {
    dashboard: ["平台运营看板", "全站数据实时汇总，快速定位增长与风险。"], orders: ["用户与订单管理", "筛选异常订单，支持智能派单与人工调度。"], providers: ["服务商资质审核", "核验主体资质、真实案例与平台分级。"], risk: ["智能风控预警", "监测异常报价、私下接单与服务违规。"], content: ["内容资源管理", "管理案例、文章、视频和报价标准。"]
  }
};

function workspaceTemplate() {
  const roleName = state.role === "provider" ? "服务商工作台" : "平台管理中心";
  const meta = workspaceData[state.role][state.route] || workspaceData[state.role][roleHome(state.role)];
  return `<main class="workspace"><aside class="sidebar"><div class="sidebar-title">${roleName}</div><nav class="side-nav">${navByRole[state.role].map(([route, label]) => `<button class="${state.route === route ? "active" : ""}" data-action="navigate" data-route="${route}" ${state.route === route ? 'aria-current="page"' : ""}>${label}</button>`).join("")}</nav></aside>
    <section class="workspace-main"><div class="workspace-head"><div><h1>${meta[0]}</h1><p>${meta[1]}</p></div><button class="btn btn-primary" data-action="workspace-primary">${state.role === "provider" ? "新建报价" : "导出数据"}</button></div><div class="workspace-body">${workspaceContent()}</div></section>
  </main>`;
}

function workspaceContent() {
  if (state.role === "provider") {
    if (state.route === "overview") return providerOverview();
    if (state.route === "leads") return leadTable();
    if (state.route === "quotes") return quoteTable();
    if (state.route === "projects") return projectTable();
    return portfolioManager();
  }
  if (state.route === "dashboard") return adminDashboard();
  if (state.route === "orders") return adminOrderTable();
  if (state.route === "providers") return adminProviderTable();
  if (state.route === "risk") return riskTable();
  return contentManager();
}

function kpis(items) {
  return `<div class="kpi-grid">${items.map(item => `<div class="kpi"><span class="kpi-label">${item[0]}</span><strong>${item[1]}</strong><span class="trend ${item[3] === "down" ? "down" : ""}">${item[2]}</span></div>`).join("")}</div>`;
}

function providerOverview() {
  return `${kpis([["待响应线索", state.providerLeads.filter(item => item.status === "待响应").length, "按匹配度优先处理"], ["待提交报价", state.quotes.filter(item => item.status === "草稿").length, "提交前完成平台校验", "down"], ["进行中项目", state.projects.filter(item => item.progress < 100).length, "节点持续跟进"], ["综合服务分", "4.88", "同城前 8%"]])}
  <div class="dash-grid"><section class="panel"><div class="panel-header"><h3>近 7 日线索与成交</h3><span class="status">实时</span></div>${chartTemplate([42,56,48,72,66,84,76], ["四","五","六","日","一","二","三"])}</section><section class="panel"><div class="panel-header"><h3>待办提醒</h3></div><div class="panel-body activity">${activityTemplate([["滨江映月项目等待水电报价", "12 分钟前"], ["新线索 ZJ-0825 即将超时", "38 分钟前"], ["湖畔花园项目明日量房", "2 小时前"], ["7 月服务报告已生成", "昨天"]])}</div></section></div>
  <section class="panel workflow-panel"><div class="panel-header"><h3>业务闭环</h3><span>从获客到口碑沉淀</span></div><div class="workflow-lane">${[["01", "接收线索", "leads", `${state.providerLeads.filter(item => item.status === "待响应").length} 条待响应`], ["02", "标准报价", "quotes", `${state.quotes.length} 份报价`], ["03", "项目履约", "projects", `${state.projects.length} 个项目`], ["04", "发布案例", "portfolio", `${state.portfolio.length} 个新案例`]].map(item => `<button data-action="navigate" data-route="${item[2]}"><span>${item[0]}</span><strong>${item[1]}</strong><small>${item[3]}</small></button>`).join("")}</div></section>`;
}

function chartTemplate(values, labels) {
  return `<div class="chart">${values.map((value, i) => `<div class="chart-group"><div class="chart-bar" style="height:${value}%"></div><span>${labels[i]}</span></div>`).join("")}</div>`;
}

function activityTemplate(items) {
  return items.map(item => `<div class="activity-item"><span class="activity-dot"></span><p>${item[0]}</p><time>${item[1]}</time></div>`).join("");
}

function leadTable() {
  return `${kpis([["待响应线索", state.providerLeads.filter(item => item.status === "待响应").length, "按匹配度优先处理"], ["已接单", state.providerLeads.filter(item => item.status === "已接单").length, "可创建标准报价"], ["平均匹配度", "92%", "同城优质线索"], ["响应达标率", "98.4%", "高于平台均值"]])}${tablePanel("匹配线索", ["线索编号","用户需求","面积/预算","匹配度","当前状态","操作"], state.providerLeads.map(item => [item.id, item.need, item.scope, item.match, badge(item.status, item.status === "待响应" ? "warn" : "info"), actionButton(item.status === "待响应" ? "查看并接单" : item.status === "已接单" ? "创建报价" : "查看记录", item.status !== "待响应", item.status === "已接单" ? "quote-from-lead" : "view-lead", item.id)]))}`;
}

function quoteTable() {
  return `${kpis([["报价总数", state.quotes.length, "全部线上留存"], ["待提交", state.quotes.filter(item => item.status === "草稿").length, "完成明细后提交"], ["校验通过", state.quotes.filter(item => item.check === "合理").length, "本地指导价比对"], ["本月转项目", state.projects.length, "持续跟进履约"]])}${tablePanel("报价记录", ["报价单","关联项目","报价金额","平台校验","状态","操作"], state.quotes.map(item => [item.id, item.project, `¥ ${item.amount}万`, badge(item.check, item.check === "合理" ? "" : "warn"), badge(item.status, item.status === "已提交" ? "info" : "warn"), actionButton(item.status === "草稿" ? "编辑并提交" : "查看明细", true, item.status === "草稿" ? "edit-quote" : "quote-detail", item.id)]))}`;
}

function projectTable() {
  return tablePanel("进行中项目", ["项目","当前节点","进度","业主","下个节点","状态","操作"], state.projects.map(item => [item.name, item.stage, progress(item.progress), item.owner, item.next, badge(item.status, item.status === "待跟进" ? "warn" : ""), actionButton("更新节点", true, "update-project", item.id)]));
}

function portfolioManager() {
  const published = [...state.portfolio.map((item, index) => ({ id: 100 + index, image: "assets/case-warm-modern.jpg", style: item.style, type: "服务商发布", city: "杭州", title: item.title, area: item.area, days: item.days, budget: item.budget })), ...cases.slice(0,3)];
  return `<div class="section-head"><div><h2 style="font-size:20px">已发布案例</h2><p>所有案例需绑定项目订单与验收记录。</p></div><button class="btn btn-secondary" data-action="upload-case">上传新案例</button></div><div class="case-grid">${published.map(caseCard).join("")}</div>`;
}

function adminDashboard() {
  return `${kpis([["今日访客", "8,426", "较昨日 +12.4%"], ["咨询订单", "286", "转化率 18.7%"], ["成交转化", "53", "较昨日 +8.1%"], ["投诉工单", "7", "2 条待响应", "down"]])}
  <div class="dash-grid"><section class="panel"><div class="panel-header"><h3>近 7 日访问与咨询趋势</h3><select style="border:1px solid var(--line);padding:6px;border-radius:5px"><option>最近 7 天</option><option>最近 30 天</option></select></div>${chartTemplate([48,62,54,74,69,88,80], ["四","五","六","日","一","二","三"])}</section><section class="panel"><div class="panel-header"><h3>需求偏好</h3></div><div class="panel-body breakdown"><div class="bar-row"><span>现代原木</span><div class="bar"><span style="width:72%"></span></div><strong>32%</strong></div><div class="bar-row"><span>奶油风</span><div class="bar"><span style="width:54%"></span></div><strong>24%</strong></div><div class="bar-row"><span>现代简约</span><div class="bar"><span style="width:41%"></span></div><strong>18%</strong></div><div class="bar-row"><span>新中式</span><div class="bar"><span style="width:27%"></span></div><strong>12%</strong></div></div></section></div>
  <section class="panel" style="margin-top:16px"><div class="panel-header"><h3>全链路转化</h3><span class="status info">本月</span></div><div class="panel-body"><div class="feature-strip"><div class="feature-item"><strong style="font-size:22px">12,460</strong><p>需求提交 · 100%</p></div><div class="feature-item"><strong style="font-size:22px">8,921</strong><p>咨询对接 · 71.6%</p></div><div class="feature-item"><strong style="font-size:22px">4,286</strong><p>报价生成 · 34.4%</p></div><div class="feature-item"><strong style="font-size:22px">1,876</strong><p>预约量房 · 15.1%</p></div></div></div></section>
  <section class="panel workflow-panel"><div class="panel-header"><h3>运营处置闭环</h3><span>所有操作记录可追溯</span></div><div class="workflow-lane">${[["01", "订单派发", "orders", `${state.adminOrders.filter(item => item.provider === "待派单").length} 条待派`], ["02", "资质审核", "providers", `${state.providerAudits.filter(item => item.status === "待审核").length} 条待审`], ["03", "风险处置", "risk", `${state.risks.filter(item => item.status === "待核查").length} 条待核查`], ["04", "内容发布", "content", `${state.contents.filter(item => item.status === "待审核").length} 条待审`]].map(item => `<button data-action="navigate" data-route="${item[2]}"><span>${item[0]}</span><strong>${item[1]}</strong><small>${item[3]}</small></button>`).join("")}</div></section>`;
}

function adminOrderTable() {
  return `${kpis([["全部订单", state.adminOrders.length, "实时同步"], ["待派单", state.adminOrders.filter(item => item.provider === "待派单").length, "需优先响应", "down"], ["服务中", state.adminOrders.filter(item => item.status === "咨询中").length, "全程留痕"], ["风险订单", state.adminOrders.filter(item => item.risk !== "正常").length, "需人工跟进", "down"]])}${tablePanel("实时订单", ["订单号","用户","装修需求","服务商","订单状态","风险","操作"], state.adminOrders.map(item => [item.id, item.user, item.need, item.provider, badge(item.status, item.status === "咨询中" ? "info" : "warn"), badge(item.risk, item.risk === "正常" ? "" : "danger"), actionButton(item.provider === "待派单" ? "立即派单" : item.risk === "正常" ? "查看" : "介入处理", item.provider !== "待派单", "manage-order", item.id)]))}`;
}

function adminProviderTable() {
  return `${kpis([["待审核", state.providerAudits.filter(item => item.status === "待审核").length, "资质与案例双核验"], ["待补充", state.providerAudits.filter(item => item.status === "待补充").length, "材料不完整"], ["本月通过", state.providerAudits.filter(item => item.status === "已通过").length, "自动进入分级体系"], ["平台服务商", "327", "分级动态管理"]])}${tablePanel("服务商审核", ["主体","申请类型","资质完整度","案例核验","状态","操作"], state.providerAudits.map(item => [item.name, item.type, item.completeness, badge(item.cases, item.cases === "待补充" ? "warn" : ""), badge(item.status, item.status === "已通过" ? "info" : item.status === "已拒绝" ? "danger" : "warn"), actionButton(item.status === "已通过" ? "查看档案" : "审核", item.status === "已通过", "review-provider", item.id)]))}`;
}

function riskTable() {
  return `${kpis([["今日预警", state.risks.length, "高风险优先处置", "down"], ["待核查", state.risks.filter(item => item.status === "待核查").length, "需人工复核", "down"], ["已处置", state.risks.filter(item => item.status === "已处置").length, "结果全程留痕"], ["处理率", `${Math.round(state.risks.filter(item => item.status === "已处置").length / state.risks.length * 100)}%`, "实时更新"]])}${tablePanel("风险事件", ["等级","事件","关联主体","触发规则","状态","操作"], state.risks.map(item => [badge(item.level, item.level === "高风险" ? "danger" : "warn"), item.event, item.subject, item.rule, badge(item.status, item.status === "已处置" ? "info" : "warn"), actionButton(item.status === "已处置" ? "查看结论" : "核查处置", item.status === "已处置", "review-risk", item.id)]))}`;
}

function contentManager() {
  return `${kpis([["待审核", state.contents.filter(item => item.status === "待审核").length, "案例、文章与视频"], ["已发布", state.contents.filter(item => item.status === "已发布").length, "同步前台内容库"], ["已驳回", state.contents.filter(item => item.status === "已驳回").length, "保留审核原因"], ["本周阅读", "24.8k", "热门内容持续更新"]])}${tablePanel("内容审核与发布", ["内容标题","类型","提交方","质量检测","状态","操作"], state.contents.map(item => [item.title, item.type, item.author, badge(item.quality, item.quality === "需复核" ? "warn" : ""), badge(item.status, item.status === "已发布" ? "info" : item.status === "已驳回" ? "danger" : "warn"), actionButton(item.status === "待审核" ? "审核" : "查看", item.status !== "待审核", "review-content", item.id)]))}`;
}

function badge(text, type = "") { return `<span class="status ${type}">${text}</span>`; }
function actionButton(text, secondary = false, action = "generic", id = "") { return `<button class="btn ${secondary ? "btn-secondary" : "btn-primary"} btn-small" data-action="${action}" ${id ? `data-id="${id}"` : ""}>${text}</button>`; }
function progress(value) { return `<div class="progress-line"><div class="bar"><span style="width:${value}%"></span></div><strong>${value}%</strong></div>`; }
function tablePanel(title, headers, rows) { return `<section class="panel table-wrap"><div class="panel-header"><h3>${title}</h3><span style="color:var(--muted);font-size:12px">数据刚刚更新</span></div><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></section>`; }

async function hydrateBackend() {
  if (state.backendLoaded || state.role === "auth" || !state.session) return;
  state.backendLoaded = true;
  try {
    if (state.role === "provider") {
      const [leads, quotes] = await Promise.all([api("/api/provider/leads"), api("/api/provider/quotes")]);
      state.providerLeads = leads.map(item => ({ id: item.leadCode, need: `数据库线索 #${item.consultId}`, scope: "待查看需求", match: `${item.matchScore}%`, remaining: "在线", status: item.status === "PENDING" ? "待响应" : item.status === "ACCEPTED" ? "已接单" : "已报价", backendId: item.id }));
      state.quotes = quotes.map(item => ({ id: item.quoteCode, project: "数据库项目", amount: item.totalAmount, check: item.validationStatus === "PASS" ? "合理" : "待复核", updated: "数据库", status: item.status === "SUBMITTED" ? "已提交" : "草稿", backendId: item.id }));
    }
    if (state.role === "admin") state.dashboard = await api("/api/admin/dashboard/overview");
  } catch (error) {
    showToast("数据库暂时不可用，当前显示演示数据");
    return;
  }
  render();
}

function render({ transition = false, scroll = false } = {}) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const useNativeTransition = transition && !reduceMotion && Boolean(document.startViewTransition);
  const commit = () => {
    let content;
    if (state.role === "auth") {
      content = authTemplate();
    } else if (state.role === "owner") {
      const pages = { home: homeTemplate, consult: consultTemplate, budget: budgetTemplate, cases: casesTemplate, advisors: advisorsTemplate, tools: toolsTemplate, profile: profileTemplate };
      content = (pages[state.route] || homeTemplate)();
    } else {
      content = workspaceTemplate();
    }
    app.innerHTML = `<div class="app-shell ${transition && !useNativeTransition ? "route-enter" : ""}">${headerTemplate()}${content}${state.role === "auth" ? "" : aiTemplate()}</div>`;
    document.title = `${pageTitle()} - 筑见`;
    if (scroll) window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (useNativeTransition) {
    document.startViewTransition(commit);
  } else {
    commit();
  }
  hydrateBackend();
}

function navigate(route, role = state.role) {
  if (role !== "auth" && state.session && role !== state.session.role) {
    role = state.session.role;
    route = roleHome(role);
    showToast("当前账号无权访问其他身份工作台");
  }
  if (!state.session && ["provider", "admin"].includes(role)) {
    role = "auth";
    route = "login";
    showToast("请先登录对应身份账号");
  }
  const safeRoute = validRoutes[role]?.includes(route) ? route : roleHome(role);
  const hash = routeHash(role, safeRoute);
  state.mobileOpen = false;
  if (location.hash === hash) {
    state.role = role;
    state.route = safeRoute;
    render({ transition: true, scroll: true });
    return;
  }
  location.hash = hash;
}

function appointmentPreference(key) {
  const selected = state.advisorFilters?.[key];
  if (selected && selected !== "全部") return selected;
  if (key === "space") return state.consult.spaces?.[0] || "客厅";
  if (key === "layout") return state.consult.layout || "两室一厅";
  if (key === "style") return state.consult.style && state.consult.style !== "还不确定" ? state.consult.style : "现代原木";
  return "";
}

function appointmentOptions(options, selected) {
  return options.filter(option => option !== "全部").map(option => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("");
}

function dateInputValue(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function openProviderPortfolio(providerName) {
  const provider = providers.find(item => item.name === providerName);
  if (!provider) return;
  const works = providerCases(provider);
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal portfolio-modal" role="dialog" aria-modal="true" aria-label="${provider.name}的设计作品">
    <div class="modal-head"><div><h2>${provider.name} · 设计作品</h2><p>${provider.role} · ${provider.years} 年经验 · ${provider.score} 分</p></div><button data-action="close-modal" aria-label="关闭">×</button></div>
    <div class="modal-body">
      <div class="portfolio-designer"><div class="avatar-square" style="background:${provider.color}">${initials(provider.name)}</div><div><strong>${provider.signature}</strong><p>擅长 ${provider.spaces.slice(0, 4).join("、")} · ${provider.styles.join("、")}</p></div></div>
      <div class="portfolio-grid">${works.map(work => `<article class="portfolio-work"><img src="${work.image}" alt="${work.title}实景作品"><div><div class="case-meta"><span class="tag">${work.style}</span><span class="tag">${work.layout}</span><span class="tag">${work.spaces.slice(0, 2).join(" · ")}</span></div><h3>${work.title}</h3><p>${work.area}㎡ · ${work.budget} 万 · ${work.days} 天完工</p><button class="text-link" data-action="view-case-from-portfolio" data-id="${work.id}">查看案例信息 →</button></div></article>`).join("")}</div>
    </div>
    <div class="modal-actions"><button class="btn btn-secondary" data-action="close-modal">关闭作品集</button><button class="btn btn-primary" data-action="appointment" data-provider="${provider.name}">预约这位设计师</button></div>
  </section></div>`;
}

function openAppointment(provider) {
  const preferredSpace = appointmentPreference("space");
  const preferredLayout = appointmentPreference("layout");
  const preferredStyle = appointmentPreference("style");
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="预约咨询">
    <div class="modal-head"><h2>预约 ${provider}</h2><button data-action="close-modal" aria-label="关闭">×</button></div>
    <form data-form="appointment"><div class="modal-body form-grid">
      <input type="hidden" name="provider" value="${provider}">
      <div class="field"><label>咨询服务</label><select name="service"><option>免费装修科普咨询</option><option>设计方案咨询</option><option>施工工艺咨询</option><option>合同避坑咨询</option><option>上门量房</option></select></div>
      <div class="field"><label>预约日期</label><input name="date" type="date" value="${dateInputValue(1)}" min="${dateInputValue()}" required></div>
      <div class="field"><label>重点空间</label><select name="space">${appointmentOptions(discoveryFilters.spaces, preferredSpace)}</select></div>
      <div class="field"><label>房屋户型</label><select name="layout">${appointmentOptions(discoveryFilters.layouts, preferredLayout)}</select></div>
      <div class="field"><label>偏好风格</label><select name="style">${appointmentOptions(discoveryFilters.styles, preferredStyle)}</select></div>
      <div class="field"><label>时间段</label><select name="time"><option>09:00-11:00</option><option>14:00-16:00</option><option>19:00-21:00</option></select></div>
      <div class="field"><label>联系方式</label><input name="contact" type="tel" value="138****6021" required></div>
      <div class="field" style="grid-column:1/-1"><label>补充说明</label><textarea name="note" placeholder="可以简单描述房屋现状或希望解决的问题"></textarea></div>
    </div><div class="modal-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">取消</button><button class="btn btn-primary">确认预约</button></div></form>
  </section></div>`;
}

function openInfoModal(title, body) {
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="${title}"><div class="modal-head"><h2>${title}</h2><button data-action="close-modal" aria-label="关闭">×</button></div><div class="modal-body">${body}</div><div class="modal-actions"><button class="btn btn-primary" data-action="close-modal">完成</button></div></section></div>`;
}

function openTool(tool) {
  const content = {
    "装修面积测算": `<form data-form="area-tool" class="form-grid"><div class="field"><label>套内面积（㎡）</label><input name="area" type="number" min="20" max="500" value="96" required></div><div class="field"><label>层高（m）</label><input name="height" type="number" min="2" max="6" step="0.1" value="2.8" required></div><div class="aside-note" style="grid-column:1/-1"><h3>测算范围</h3><p>提交后将估算地面、墙面与顶面施工面积，结果可作为询价前的工程量参考。</p></div><button class="btn btn-primary" style="grid-column:1/-1">开始测算</button></form>`,
    "装修工期倒计时": `<form data-form="schedule-tool" class="form-grid"><div class="field"><label>计划开工日期</label><input name="start" type="date" value="2026-08-15" required></div><div class="field"><label>建筑面积（㎡）</label><input name="area" type="number" min="20" max="500" value="96" required></div><div class="aside-note" style="grid-column:1/-1"><h3>节点计划</h3><p>系统会生成拆改、水电、泥木、油漆、安装和竣工验收的建议时间。</p></div><button class="btn btn-primary" style="grid-column:1/-1">生成节点计划</button></form>`,
    "家装验收清单": `<div class="checklist">${["水电点位与回路标识完整", "墙地砖空鼓率符合约定", "柜体五金与材料型号一致", "墙面平整且无开裂污染", "竣工资料与质保凭证归档"].map(item => `<label><input type="checkbox"> ${item}</label>`).join("")}</div>`,
    "材料真伪查询": `<div class="form-grid"><div class="field"><label>材料品牌</label><input placeholder="输入品牌名称"></div><div class="field"><label>防伪码/批次号</label><input placeholder="输入包装上的编号"></div><div class="aside-note" style="grid-column:1/-1"><h3>核验提示</h3><p>演示版会保存查询入口；接入品牌数据库后可返回生产批次、授权渠道和核验结果。</p></div></div>`,
    "合同风险自查": `<div class="checklist">${["付款节点与实际工程进度一致", "增项必须书面确认后施工", "材料品牌、型号、等级写入附件", "延期责任与赔付标准明确", "验收和质保期限完整"].map(item => `<label><input type="checkbox"> ${item}</label>`).join("")}</div>`,
    "装修知识库": `<div class="article-copy"><p>知识库按施工流程、材料鉴别、验收标准、合同避坑和环保装修分类维护。</p><button class="btn btn-secondary" data-action="article" data-title="水电验收的 12 个关键点">阅读本周热门文章</button></div>`
  };
  openInfoModal(tool, content[tool] || `<div class="aside-note"><h3>功能入口</h3><p>该工具页面已可访问，并可继续接入业务数据接口。</p></div>`);
}

function openArticle(title) {
  const paragraphs = {
    "水电验收的 12 个关键点": ["核对强弱电回路和点位是否与图纸一致，线管转弯应顺畅，管内导线不得有接头。", "给水管完成打压测试后再封槽，并保留压力值、测试时长和现场照片。", "插座通电、漏电保护、排水坡度和地漏回水应逐项记录。"],
    "装修报价单最容易漏掉的 8 项": ["重点核对拆除清运、墙面基层、门窗收口、成品保护、打孔开槽、材料上楼、保洁和税费。", "所有暂估项应写明数量、单价、结算方式和确认流程，避免施工中临时加价。"],
    "环保板材等级怎么选": ["环保等级只是基础门槛，还要核对执行标准、检测报告、封边工艺和单位空间的板材使用量。", "定制下单前固定品牌、系列、厚度、饰面和五金型号，进场时按清单逐项核验。"]
  };
  openInfoModal(title, `<article class="article-copy"><span class="status">平台编辑已核验</span>${(paragraphs[title] || paragraphs["水电验收的 12 个关键点"]).map(text => `<p>${text}</p>`).join("")}<div class="aside-note"><h3>建议留存</h3><p>将对应检查项、现场照片和双方确认记录保存到个人中心，便于后续追溯。</p></div></article>`);
}

function openQuoteDetail(provider = "观筑设计") {
  openInfoModal(`${provider} · 报价明细`, `<div class="table-wrap"><table><thead><tr><th>项目</th><th>金额</th><th>平台校验</th></tr></thead><tbody><tr><td>基础施工</td><td>¥ 7.1 万</td><td><span class="status">合理</span></td></tr><tr><td>主材设备</td><td>¥ 8.6 万</td><td><span class="status">合理</span></td></tr><tr><td>定制软装</td><td>¥ 5.8 万</td><td><span class="status warn">五金待确认</span></td></tr><tr><td>设计服务</td><td>¥ 1.9 万</td><td><span class="status">合理</span></td></tr></tbody></table></div><div class="aside-note" style="margin-top:16px"><h3>风险结论</h3><p>报价完整度 98%，未发现异常低价；建议在签约前确认定制五金品牌与增项上限。</p></div>`);
}

function openLead(id) {
  const lead = state.providerLeads.find(item => item.id === id);
  if (!lead) return;
  openInfoModal(`线索 ${lead.id}`, `<div class="detail-grid"><div><span>用户需求</span><strong>${lead.need}</strong></div><div><span>面积 / 预算</span><strong>${lead.scope}</strong></div><div><span>智能匹配度</span><strong>${lead.match}</strong></div><div><span>剩余响应时间</span><strong>${lead.remaining}</strong></div></div><div class="aside-note" style="margin-top:16px"><h3>需求摘要</h3><p>关注环保、收纳与预算控制，计划 6 个月内入住；户型资料已由用户授权在接单后查看。</p></div>${lead.status === "待响应" ? `<button class="btn btn-primary modal-primary-action" data-action="confirm-lead" data-id="${lead.id}">确认接单</button>` : `<button class="btn btn-primary modal-primary-action" data-action="quote-from-lead" data-id="${lead.id}">创建标准报价</button>`}`);
}

function openQuoteEditor({ leadId = "", quoteId = "" } = {}) {
  const quote = state.quotes.find(item => item.id === quoteId);
  const accepted = state.providerLeads.filter(item => item.status === "已接单");
  const options = accepted.length ? accepted : state.providerLeads;
  openInfoModal(quote ? `编辑报价 ${quote.id}` : "新建标准化报价", `<form data-form="new-quote" class="form-grid"><input type="hidden" name="quoteId" value="${quote?.id || ""}"><div class="field"><label>关联线索</label><select name="lead" required>${options.map(item => `<option value="${item.id}" ${(leadId === item.id || quote?.project.includes(item.id)) ? "selected" : ""}>${item.id} · ${item.need}</option>`).join("")}</select></div><div class="field"><label>报价总额（万元）</label><input name="amount" type="number" min="1" step="0.1" value="${quote?.amount || ""}" required></div><div class="field"><label>基础施工（万元）</label><input name="base" type="number" min="0" step="0.1" required></div><div class="field"><label>主材设备（万元）</label><input name="material" type="number" min="0" step="0.1" required></div><div class="field" style="grid-column:1/-1"><label>报价说明</label><textarea name="note" placeholder="填写材料型号、施工工艺与不含项目"></textarea></div><button class="btn btn-primary" style="grid-column:1/-1">保存并提交平台校验</button></form>`);
}

function openProjectUpdate(id) {
  const project = state.projects.find(item => item.id === id);
  if (!project) return;
  openInfoModal(`更新项目节点 · ${project.name}`, `<form data-form="project-update" class="form-grid"><input type="hidden" name="id" value="${project.id}"><div class="field"><label>当前节点</label><select name="stage"><option>方案确认</option><option>合同签约</option><option>水电施工</option><option>泥木施工</option><option>油漆施工</option><option>安装收尾</option><option>竣工验收</option><option>售后归档</option></select></div><div class="field"><label>下个节点日期</label><input name="next" type="date" value="2026-08-12" required></div><div class="field" style="grid-column:1/-1"><label>节点说明</label><textarea name="note" required placeholder="填写完成情况、待确认事项与验收资料"></textarea></div><button class="btn btn-primary" style="grid-column:1/-1">保存节点并通知业主</button></form>`);
}

function openOrderManager(id) {
  const order = state.adminOrders.find(item => item.id === id);
  if (!order) return;
  openInfoModal(`订单处理 · ${order.id}`, `<form data-form="manage-order" class="form-grid"><input type="hidden" name="id" value="${order.id}"><div class="field"><label>服务商</label><select name="provider"><option>观筑设计</option><option>合度空间</option><option>良序空间</option><option>木石营造</option></select></div><div class="field"><label>订单状态</label><select name="status"><option>待咨询</option><option>咨询中</option><option>已完成</option><option>待售后</option><option>已关闭</option></select></div><div class="field" style="grid-column:1/-1"><label>处理说明</label><textarea name="note" required placeholder="记录派单依据、沟通结论或售后处理要求"></textarea></div><button class="btn btn-primary" style="grid-column:1/-1">确认处理并留痕</button></form>`);
}

function openProviderReview(id) {
  const item = state.providerAudits.find(record => record.id === id);
  if (!item) return;
  openInfoModal(`资质审核 · ${item.name}`, `<div class="detail-grid"><div><span>主体类型</span><strong>${item.type}</strong></div><div><span>资料完整度</span><strong>${item.completeness}</strong></div><div><span>案例核验</span><strong>${item.cases}</strong></div><div><span>当前状态</span><strong>${item.status}</strong></div></div><form data-form="provider-review" class="form-grid" style="margin-top:18px"><input type="hidden" name="id" value="${item.id}"><div class="field"><label>审核结论</label><select name="decision"><option value="已通过">审核通过</option><option value="待补充">要求补充材料</option><option value="已拒绝">拒绝入驻</option></select></div><div class="field"><label>服务等级</label><select name="level"><option>普通</option><option>银牌</option><option>金牌</option></select></div><div class="field" style="grid-column:1/-1"><label>审核意见</label><textarea name="note" required placeholder="填写核验依据和后续要求"></textarea></div><button class="btn btn-primary" style="grid-column:1/-1">提交审核结论</button></form>`);
}

function openRiskReview(id) {
  const item = state.risks.find(record => record.id === id);
  if (!item) return;
  openInfoModal(`风险核查 · ${item.id}`, `<div class="aside-note"><h3>${item.event}</h3><p>${item.subject} 触发规则“${item.rule}”，相关报价与沟通记录已完成证据固化。</p></div><form data-form="risk-review" class="form-grid" style="margin-top:18px"><input type="hidden" name="id" value="${item.id}"><div class="field"><label>处置措施</label><select name="decision"><option>警告并限期整改</option><option>暂停接单</option><option>账号封禁</option><option>核查无异常</option></select></div><div class="field"><label>复核期限</label><input name="date" type="date" value="2026-08-08"></div><div class="field" style="grid-column:1/-1"><label>处置依据</label><textarea name="note" required placeholder="填写证据、规则与处置结论"></textarea></div><button class="btn btn-primary" style="grid-column:1/-1">确认处置并归档</button></form>`);
}

function openContentReview(id) {
  const item = state.contents.find(record => record.id === id);
  if (!item) return;
  openInfoModal(`内容审核 · ${item.title}`, `<div class="detail-grid"><div><span>内容类型</span><strong>${item.type}</strong></div><div><span>提交方</span><strong>${item.author}</strong></div><div><span>质量检测</span><strong>${item.quality}</strong></div><div><span>当前状态</span><strong>${item.status}</strong></div></div><form data-form="content-review" class="form-grid" style="margin-top:18px"><input type="hidden" name="id" value="${item.id}"><div class="field"><label>审核结论</label><select name="decision"><option value="已发布">通过并发布</option><option value="已驳回">驳回修改</option></select></div><div class="field"><label>推荐位置</label><select name="position"><option>普通发布</option><option>首页推荐</option><option>热门内容</option></select></div><div class="field" style="grid-column:1/-1"><label>审核意见</label><textarea name="note" required placeholder="填写真实性、版权与质量审核结论"></textarea></div><button class="btn btn-primary" style="grid-column:1/-1">提交并同步前台</button></form>`);
}

function exportCsv(filename, rows) {
  const csv = "\ufeff" + rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  showToast("数据已导出");
}

let aiDrag = null;
let suppressAiClick = false;

function applyAiButtonPosition(button) {
  const position = aiButtonPosition();
  if (!position || !button) return;
  button.style.left = `${Math.round(position.x)}px`;
  button.style.top = `${Math.round(position.y)}px`;
  button.style.right = "auto";
  button.style.bottom = "auto";
}

function applyAiPanelPosition(panel) {
  const position = aiPanelCoordinates();
  if (!position || !panel) return;
  panel.style.left = `${Math.round(position.left)}px`;
  panel.style.top = `${Math.round(position.top)}px`;
  panel.style.right = "auto";
  panel.style.bottom = "auto";
}

document.addEventListener("pointerdown", event => {
  const button = event.target.closest(".ai-button");
  if (!button || event.button !== 0) return;
  const rect = button.getBoundingClientRect();
  aiDrag = {
    button,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    originX: rect.left,
    originY: rect.top,
    moved: false
  };
  button.classList.add("dragging");
  button.setPointerCapture?.(event.pointerId);
  event.preventDefault();
});

document.addEventListener("pointermove", event => {
  if (!aiDrag || event.pointerId !== aiDrag.pointerId) return;
  const deltaX = event.clientX - aiDrag.startX;
  const deltaY = event.clientY - aiDrag.startY;
  if (!aiDrag.moved && Math.hypot(deltaX, deltaY) < 5) return;
  aiDrag.moved = true;
  state.aiPosition = clampAiPosition({ x: aiDrag.originX + deltaX, y: aiDrag.originY + deltaY });
  applyAiButtonPosition(aiDrag.button);
  event.preventDefault();
});

function finishAiDrag(event) {
  if (!aiDrag || (event && event.pointerId !== aiDrag.pointerId)) return;
  const drag = aiDrag;
  aiDrag = null;
  drag.button.classList.remove("dragging");
  if (!drag.moved) return;
  state.aiPosition = clampAiPosition(state.aiPosition);
  localStorage.setItem("zhujian-ai-position", JSON.stringify(state.aiPosition));
  suppressAiClick = true;
  window.setTimeout(() => { suppressAiClick = false; }, 0);
}

document.addEventListener("pointerup", finishAiDrag);
document.addEventListener("pointercancel", finishAiDrag);
window.addEventListener("resize", () => {
  const button = document.querySelector(".ai-button");
  if (!button || !state.aiPosition) return;
  state.aiPosition = clampAiPosition(state.aiPosition);
  applyAiButtonPosition(button);
});

document.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "navigate") navigate(target.dataset.route);
  if (action === "brand") navigate("home", "owner");
  if (action === "login") navigate("login", "auth");
  if (action === "account") {
    if (state.role === "owner") navigate("profile");
    else openInfoModal("账号信息", `<div class="provider-top"><div class="avatar-square">${state.session?.name?.slice(0, 1) || "用"}</div><div><h3>${state.session?.name || "当前用户"}</h3><p>${state.role === "provider" ? "服务商账号" : "平台管理员账号"}</p></div></div><button class="btn btn-secondary" style="width:100%" data-action="logout">退出登录</button>`);
  }
  if (action === "logout") { localStorage.removeItem("zhujian-session"); state.session = null; modalRoot.innerHTML = ""; navigate("login", "auth"); }
  if (action === "forgot-password") openInfoModal("找回密码", `<form data-form="forgot" class="form-grid"><div class="field" style="grid-column:1/-1"><label>注册手机号</label><input name="phone" type="tel" required placeholder="请输入手机号"></div><button class="btn btn-primary" style="grid-column:1/-1">发送重置指引</button></form>`);
  if (action === "switch-role") navigate(roleHome(target.dataset.role), target.dataset.role);
  if (action === "toggle-menu") { state.mobileOpen = !state.mobileOpen; render(); }
  if (action === "toggle-ai") {
    if (suppressAiClick) { suppressAiClick = false; return; }
    state.aiOpen = !state.aiOpen;
    render();
  }
  if (action === "select-consult") {
    const key = target.dataset.key, value = target.dataset.value;
    if (target.dataset.multi === "1") {
      const selected = state.consult[key] || [];
      state.consult[key] = selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value];
    } else state.consult[key] = value;
    render();
  }
  if (action === "consult-prev" && state.consultStep > 0) { state.consultStep--; render(); }
  if (action === "consult-next") {
    const step = consultSteps[state.consultStep];
    if (!step.fields && (!state.consult[step.key] || state.consult[step.key].length === 0)) { showToast("请先完成本步选择"); return; }
    if (state.consultStep < consultSteps.length - 1) { state.consultStep++; render(); } else {
      localStorage.setItem("zhujian-consult", JSON.stringify(state.consult)); state.consultComplete = true; render(); showToast("专属方案已生成并保存"); syncConsultRequest();
    }
  }
  if (action === "restart-consult") { state.consultStep = 0; state.consultComplete = false; render(); }
  if (action === "filter-advisor") { state.advisorFilter = target.dataset.filter; render(); }
  if (action === "filter-discovery") {
    const filters = target.dataset.scope === "advisor" ? state.advisorFilters : state.caseFilters;
    filters[target.dataset.key] = target.dataset.value;
    render();
  }
  if (action === "clear-discovery-filters") {
    const filters = target.dataset.scope === "advisor" ? state.advisorFilters : state.caseFilters;
    Object.keys(filters).forEach(key => { filters[key] = "全部"; });
    render();
  }
  if (action === "apply-consult-filters") {
    const filters = target.dataset.scope === "advisor" ? state.advisorFilters : state.caseFilters;
    filters.space = state.consult.spaces?.[0] || "全部";
    filters.layout = discoveryFilters.layouts.includes(state.consult.layout) ? state.consult.layout : "全部";
    filters.style = discoveryFilters.styles.includes(state.consult.style) ? state.consult.style : "全部";
    render();
    showToast("已应用智能咨询中的空间、户型和风格偏好");
  }
  if (action === "favorite") {
    const id = Number(target.dataset.id);
    state.favorites = state.favorites.includes(id) ? state.favorites.filter(item => item !== id) : [...state.favorites, id];
    localStorage.setItem("zhujian-favorites", JSON.stringify(state.favorites)); render(); showToast(state.favorites.includes(id) ? "案例已收藏" : "已移出收藏");
  }
  if (action === "view-portfolio") openProviderPortfolio(target.dataset.provider);
  if (action === "view-case-from-portfolio") {
    const selectedCase = cases.find(item => item.id === Number(target.dataset.id));
    if (selectedCase) openInfoModal(selectedCase.title, `<div class="portfolio-case-detail"><img src="${selectedCase.image}" alt="${selectedCase.title}实景"><div class="detail-grid"><div><span>设计风格</span><strong>${selectedCase.style}</strong></div><div><span>房屋户型</span><strong>${selectedCase.layout}</strong></div><div><span>建筑面积</span><strong>${selectedCase.area}㎡</strong></div><div><span>实际造价</span><strong>${selectedCase.budget} 万</strong></div><div><span>完工周期</span><strong>${selectedCase.days} 天</strong></div><div><span>重点空间</span><strong>${selectedCase.spaces.join("、")}</strong></div></div></div>`);
  }
  if (action === "appointment") openAppointment(target.dataset.provider);
  if (action === "close-modal") {
    if (target.classList.contains("modal-backdrop") && event.target !== target) return;
    modalRoot.innerHTML = "";
  }
  if (action === "open-tool") openTool(target.dataset.tool);
  if (action === "article") openArticle(target.dataset.title || "装修知识");
  if (action === "quote-detail") openQuoteDetail(target.dataset.provider);
  if (action === "view-lead") openLead(target.dataset.id);
  if (action === "confirm-lead") {
    const lead = state.providerLeads.find(item => item.id === target.dataset.id);
    if (lead) { lead.status = "已接单"; saveData("zhujian-provider-leads", state.providerLeads); modalRoot.innerHTML = ""; render(); showToast("接单成功，可继续创建标准报价"); }
  }
  if (action === "quote-from-lead") openQuoteEditor({ leadId: target.dataset.id });
  if (action === "edit-quote") openQuoteEditor({ quoteId: target.dataset.id });
  if (action === "update-project") openProjectUpdate(target.dataset.id);
  if (action === "upload-case") openInfoModal("发布完工案例", `<form data-form="upload-case" class="form-grid"><div class="field"><label>关联项目</label><select name="project">${state.projects.map(item => `<option>${item.name}</option>`).join("")}</select></div><div class="field"><label>案例标题</label><input name="title" required placeholder="小区 · 空间风格"></div><div class="field"><label>建筑面积（㎡）</label><input name="area" type="number" min="20" required></div><div class="field"><label>实际造价（万元）</label><input name="budget" type="number" min="1" step="0.1" required></div><div class="field"><label>施工周期（天）</label><input name="days" type="number" min="1" required></div><div class="field"><label>空间风格</label><select name="style"><option>现代原木</option><option>奶油风</option><option>现代简约</option><option>现代轻奢</option></select></div><div class="aside-note" style="grid-column:1/-1"><h3>发布校验</h3><p>案例将绑定项目订单、报价与竣工验收记录，提交后进入管理端内容审核。</p></div><button class="btn btn-primary" style="grid-column:1/-1">提交案例审核</button></form>`);
  if (action === "manage-order") openOrderManager(target.dataset.id);
  if (action === "review-provider") openProviderReview(target.dataset.id);
  if (action === "review-risk") openRiskReview(target.dataset.id);
  if (action === "review-content") openContentReview(target.dataset.id);
  if (action === "profile-edit") openInfoModal("编辑个人资料", `<form data-form="profile" class="form-grid"><div class="field"><label>称呼</label><input name="name" value="陈先生"></div><div class="field"><label>所在城市</label><select name="city"><option>杭州</option><option>上海</option><option>苏州</option></select></div><div class="field" style="grid-column:1/-1"><label>手机号</label><input name="phone" value="138****6021"></div><button class="btn btn-primary" style="grid-column:1/-1">保存资料</button></form>`);
  if (action === "support-ticket") openInfoModal("新建售后工单", `<form data-form="ticket" class="form-grid"><div class="field"><label>问题类型</label><select name="type"><option>报价争议</option><option>服务响应</option><option>施工质量</option><option>售后失联</option></select></div><div class="field"><label>关联订单</label><select name="order"><option>OD-26080531</option><option>暂无关联订单</option></select></div><div class="field" style="grid-column:1/-1"><label>问题说明</label><textarea name="detail" required placeholder="请描述问题经过和期望处理方式"></textarea></div><button class="btn btn-primary" style="grid-column:1/-1">提交工单</button></form>`);
  if (action === "download") exportCsv("筑见装修预算.csv", [["项目", "预算金额", "占比"], ["基础施工", "7.1万", "31%"], ["主材设备", "8.6万", "37%"], ["定制软装", "5.8万", "24%"], ["设计服务", "1.9万", "8%"]]);
  if (action === "workspace-primary" && state.role === "admin") exportCsv("筑见平台运营数据.csv", [["指标", "当前值", "环比"], ["今日访客", "8426", "+12.4%"], ["咨询订单", "286", "+8.1%"], ["成交转化", "53", "+6.2%"], ["投诉工单", "7", "-2"]]);
  if (action === "workspace-primary" && state.role === "provider") openQuoteEditor();
  if (action === "generic") openInfoModal("业务操作", `<div class="aside-note"><h3>操作已进入处理队列</h3><p>此页面交互已打通，可继续在后续版本中接入真实审批、派单或内容发布接口。</p></div>`);
});

document.addEventListener("input", event => {
  if (event.target.matches("[data-consult]")) state.consult[event.target.dataset.consult] = event.target.value;
  if (event.target.dataset.action === "budget-area") { state.area = Number(event.target.value); render(); }
});

document.addEventListener("change", event => {
  if (event.target.matches("[data-consult]")) state.consult[event.target.dataset.consult] = event.target.value;
  if (event.target.dataset.action === "budget-grade") { state.grade = event.target.value; render(); }
});

document.addEventListener("submit", async event => {
  const form = event.target;
  event.preventDefault();
  if (form.dataset.form === "login") {
    const data = Object.fromEntries(new FormData(form));
    try {
      const result = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username: data.account, password: data.password })
      });
      state.session = { name: result.displayName, role: result.role.toLowerCase() };
      localStorage.setItem("zhujian-session", JSON.stringify(state.session));
      localStorage.setItem("zhujian-role", state.session.role);
      navigate(roleHome(state.session.role), state.session.role);
      showToast("登录成功");
    } catch (error) {
      showToast(error.message || "登录失败，请检查账号和密码");
    }
  }
  if (form.dataset.form === "register") {
    const data = Object.fromEntries(new FormData(form));
    if (data.password !== data.confirm) { showToast("两次输入的密码不一致"); return; }
    try {
      const result = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username: data.phone, displayName: data.name, password: data.password, role: data.role.toUpperCase() })
      });
      state.session = { name: result.displayName, role: result.role.toLowerCase() };
      localStorage.setItem("zhujian-session", JSON.stringify(state.session));
      localStorage.setItem("zhujian-role", state.session.role);
      navigate(roleHome(state.session.role), state.session.role);
      showToast("注册成功，已进入工作台");
    } catch (error) {
      showToast(error.message || "注册失败，请稍后重试");
    }
  }
  if (form.dataset.form === "quick-plan") {
    const data = new FormData(form);
    state.consult.city = data.get("city"); state.consult.area = data.get("area"); state.consult.type = data.get("type"); state.consultStep = 2; navigate("consult");
  }
  if (form.dataset.form === "appointment") {
    const data = Object.fromEntries(new FormData(form));
    state.appointments.unshift(data); localStorage.setItem("zhujian-appointments", JSON.stringify(state.appointments)); modalRoot.innerHTML = ""; showToast("预约已提交，顾问将在 10 分钟内确认");
  }
  if (form.dataset.form === "area-tool") {
    const data = new FormData(form); const area = Number(data.get("area")); const height = Number(data.get("height"));
    openInfoModal("面积测算结果", `<div class="metric-row"><div class="metric"><span>地面施工</span><strong>${Math.round(area)}㎡</strong></div><div class="metric"><span>墙面施工</span><strong>${Math.round(area * height * 1.18)}㎡</strong></div><div class="metric"><span>顶面施工</span><strong>${Math.round(area * .92)}㎡</strong></div></div><div class="aside-note" style="margin-top:16px"><h3>使用说明</h3><p>结果按常见户型系数估算，正式报价前应以现场量房数据为准。</p></div>`);
  }
  if (form.dataset.form === "schedule-tool") {
    const data = new FormData(form); const days = Math.max(50, Math.round(Number(data.get("area")) * .86));
    openInfoModal("装修节点计划", `<div class="saved-list"><div class="saved-item"><strong>开工交底</strong><span>${data.get("start")}</span></div><div class="saved-item"><strong>水电验收</strong><span>约第 ${Math.round(days * .22)} 天</span></div><div class="saved-item"><strong>泥木验收</strong><span>约第 ${Math.round(days * .55)} 天</span></div><div class="saved-item"><strong>竣工验收</strong><span>约第 ${days} 天</span></div></div>`);
  }
  if (form.dataset.form === "new-quote") {
    const data = Object.fromEntries(new FormData(form));
    let quote = state.quotes.find(item => item.id === data.quoteId);
    if (quote) { quote.amount = data.amount; quote.check = "合理"; quote.status = "已提交"; quote.updated = "刚刚"; }
    else { quote = { id: `BJ-${String(Date.now()).slice(-6)}`, project: `${data.lead} 需求`, amount: data.amount, check: "合理", updated: "刚刚", status: "已提交" }; state.quotes.unshift(quote); }
    const lead = state.providerLeads.find(item => item.id === data.lead);
    if (lead) lead.status = "已报价";
    saveData("zhujian-provider-quotes", state.quotes); saveData("zhujian-provider-leads", state.providerLeads);
    modalRoot.innerHTML = ""; navigate("quotes", "provider"); showToast("报价已提交并通过平台校验");
  }
  if (form.dataset.form === "project-update") {
    const data = Object.fromEntries(new FormData(form)); const project = state.projects.find(item => item.id === data.id);
    const stageProgress = { "方案确认": 28, "合同签约": 36, "水电施工": 48, "泥木施工": 62, "油漆施工": 74, "安装收尾": 86, "竣工验收": 96, "售后归档": 100 };
    if (project) { project.stage = data.stage; project.progress = stageProgress[data.stage]; project.next = data.next; project.status = data.stage === "售后归档" ? "已完成" : "正常"; saveData("zhujian-provider-projects", state.projects); }
    modalRoot.innerHTML = ""; render(); showToast("项目节点已更新并通知业主");
  }
  if (form.dataset.form === "upload-case") {
    const data = Object.fromEntries(new FormData(form));
    state.portfolio.unshift({ title: data.title, area: Number(data.area), budget: Number(data.budget), days: Number(data.days), style: data.style });
    state.contents.unshift({ id: `C-${String(Date.now()).slice(-5)}`, title: data.title, type: "装修案例", author: state.session?.name || "服务商", quality: "订单已绑定", time: "刚刚", status: "待审核" });
    saveData("zhujian-provider-portfolio", state.portfolio); saveData("zhujian-admin-contents", state.contents);
    modalRoot.innerHTML = ""; render(); showToast("案例已提交，等待平台内容审核");
  }
  if (form.dataset.form === "manage-order") {
    const data = Object.fromEntries(new FormData(form)); const order = state.adminOrders.find(item => item.id === data.id);
    if (order) { order.provider = data.provider; order.status = data.status; order.risk = data.status === "已关闭" ? "已归档" : "正常"; saveData("zhujian-admin-orders", state.adminOrders); }
    modalRoot.innerHTML = ""; render(); showToast("订单已派发并记录处理意见");
  }
  if (form.dataset.form === "provider-review") {
    const data = Object.fromEntries(new FormData(form)); const item = state.providerAudits.find(record => record.id === data.id);
    if (item) { item.status = data.decision; item.level = data.level; saveData("zhujian-provider-audits", state.providerAudits); }
    modalRoot.innerHTML = ""; render(); showToast("资质审核结论已保存");
  }
  if (form.dataset.form === "risk-review") {
    const data = Object.fromEntries(new FormData(form)); const item = state.risks.find(record => record.id === data.id);
    if (item) { item.status = "已处置"; item.decision = data.decision; saveData("zhujian-admin-risks", state.risks); }
    modalRoot.innerHTML = ""; render(); showToast("风险事件已处置并归档");
  }
  if (form.dataset.form === "content-review") {
    const data = Object.fromEntries(new FormData(form)); const item = state.contents.find(record => record.id === data.id);
    if (item) { item.status = data.decision; item.position = data.position; saveData("zhujian-admin-contents", state.contents); }
    modalRoot.innerHTML = ""; render(); showToast(data.decision === "已发布" ? "内容已发布并同步前台" : "内容已驳回修改");
  }
  if (["profile", "ticket", "forgot"].includes(form.dataset.form)) {
    modalRoot.innerHTML = "";
    showToast(form.dataset.form === "ticket" ? "售后工单已提交" : form.dataset.form === "new-quote" ? "报价已保存并通过格式校验" : form.dataset.form === "forgot" ? "重置指引已发送" : "个人资料已保存");
  }
  if (form.dataset.form === "ai") {
    const input = form.elements.message; const question = input.value.trim(); if (!question) return;
    state.aiMessages.push(question);
    const answer = question.includes("预算") ? "建议先按面积与装修档次得到基准预算，再单列定制、设备和 8% 机动金。你可以到“透明报价”页面动态测算。" : question.includes("验收") ? "验收应按水电、泥木、油漆、安装和竣工五个节点留存照片与签字记录，知识工具页有对应清单。" : "我已记录这个问题。通常应先确认现场条件、合同约定和材料型号，再给出结论；你也可以预约对应领域的专业顾问进一步核实。";
    state.aiMessages.push(answer); render();
  }
});

window.addEventListener("hashchange", () => {
  const next = readRoute();
  const canonicalHash = routeHash(next.role, next.route);
  if (location.hash !== canonicalHash) history.replaceState(null, "", canonicalHash);
  state.role = next.role;
  state.route = next.route;
  state.session = loadSession();
  state.mobileOpen = false;
  if (state.role !== "auth") localStorage.setItem("zhujian-role", state.role);
  modalRoot.innerHTML = "";
  render({ transition: true, scroll: true });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modalRoot.innerHTML) modalRoot.innerHTML = "";
});

if (!location.hash || location.hash !== routeHash(initialRoute.role, initialRoute.route)) {
  history.replaceState(null, "", routeHash(initialRoute.role, initialRoute.route));
}
render();
