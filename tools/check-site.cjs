// 本地检查：不联网、不读取申请资料，不把检测到的隐私值打印到日志。
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const files = JSON.parse(fs.readFileSync(path.join(__dirname, "public-files.json"), "utf8"));
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
let passed = 0;
function check(condition, message) { assert.ok(condition, message); passed++; }

for (const name of files) {
  check(!path.isAbsolute(name) && !name.split("/").includes(".."), "非法发布路径");
  check(fs.existsSync(path.join(root, name)), "缺少公开文件：" + name);
  check(!/\.(pdf|docx?|zip|env)$/i.test(name), "不应发布申请原件：" + name);
  if (!/\.(html|js|css)$/.test(name)) continue;
  const source = read(name);
  check(!/[\uFFFD\uE000-\uF8FF]/u.test(source), "发现编码异常：" + name);
  check(!/\b(?:\d{17}[\dXx]|[A-Z]{1,2}\d{7,9})\b/.test(source), "发现疑似证件号码：" + name);
  check(!/(?:\+86[\s-]*1[3-9][\d\s-]{9,}|\+65[\s-]*[689]\d{3}[\s-]*\d{4})/.test(source), "发现手机号：" + name);
  check(!/(?:github_pat_|ghp_)[A-Za-z0-9_]{20,}|-----BEGIN .*PRIVATE KEY-----/.test(source), "发现疑似凭证：" + name);
  check(!/[A-Z]:[\\/](?:Users|university|BaiduNetdiskDownload)/i.test(source), "发现本机资料路径：" + name);
}

const dataContext = { window: {} };
vm.runInNewContext(read("site-data.js"), dataContext);
const data = dataContext.window.SITE_DATA;
for (const lang of ["en", "zh"]) {
  const content = data[lang];
  check(content.education.length === 2, "教育条目缺失");
  for (const section of ["education", "research", "projects", "patents", "awards"]) {
    check(content[section].every((item) => typeof item.time === "string"), "日期字段缺失：" + section);
  }
  for (const item of content.education) {
    check(files.includes(item.logo), "学校标志未列入发布清单");
    check(!item.secondaryLogo, "不应显示学院附加标志");
  }
  for (const item of content.projects) {
    if (item.image) check(files.includes(item.image), "项目图未列入发布清单");
    check(item.links.every((link) => link.url !== "#"), "仍有占位链接");
  }
  check(content.education[1].note.includes("3.51"), "成绩未更新");
}
check(data.cv === "cv.html", "简历不应指向申请 PDF");
check(!files.includes("files/cv.pdf"), "旧 CV 仍在发布清单");
check(!files.includes("assets/logos/eie.png"), "院徽仍在发布清单");

// 使用轻量 DOM 替身检查渲染逻辑，不宣称它能替代真实浏览器布局检查。
function runView(page, stored = "en", blocked = false, reduced = false, savedTheme = null) {
  const html = read(page);
  const nodes = new Map();
  const node = () => ({
    textContent: "", innerHTML: "", attributes: {}, events: {}, dataset: {},
    classList: { add() {}, toggle() {} },
    setAttribute(key, value) { this.attributes[key] = value; },
    addEventListener(key, callback) { this.events[key] = callback; }
  });
  for (const match of html.matchAll(/\bid="([^"]+)"/g)) {
    check(!nodes.has(match[1]), "重复 HTML id：" + match[1]);
    nodes.set(match[1], node());
  }
  const headings = [...html.matchAll(/data-section-title="([^"]+)"/g)].map((match) =>
    ({ ...node(), dataset: { sectionTitle: match[1] } }));
  const portrait = page === "index.html" ? node() : null;
  const sections = Array.from({ length: 10 }, node);
  let observed = 0;
  const document = {
    body: { dataset: { view: page === "cv.html" ? "cv" : "" } },
    documentElement: { lang: "", dataset: {} }, title: "",
    getElementById: (id) => nodes.get(id) || null,
    querySelector: (selector) => selector === ".portrait" ? portrait : node(),
    querySelectorAll: (selector) => selector === "[data-section-title]" ? headings : sections
  };
  const context = {
    document, URL,
    window: { SITE_DATA: data, location: new URL("https://rest271828.github.io/" + page), matchMedia: () => ({ matches: reduced }), print() {} },
    localStorage: { getItem(key) { if (blocked) throw Error("blocked"); return key === "siteTheme" ? savedTheme : stored; }, setItem() { if (blocked) throw Error("blocked"); } },
    IntersectionObserver: class { constructor(callback) { this.callback = callback; } observe(target) { observed++; this.callback([{ target, isIntersecting: true }]); } unobserve() {} }
  };
  context.window.IntersectionObserver = context.IntersectionObserver;
  vm.runInNewContext(read("script.js"), context);
  return { nodes, document, observed };
}
for (const page of ["index.html", "cv.html"]) {
  for (const settings of [["en", false], ["zh", false], ["corrupt", false], ["en", true]]) {
    const view = runView(page, ...settings);
    const initialChinese = settings[0] === "zh";
    check(view.document.documentElement.lang === (initialChinese ? "zh-CN" : "en"), "初始语言错误");
    if (!initialChinese) check(view.nodes.get(page === "index.html" ? "profile-name" : "hero-name").textContent === "Qidong Sun", "英文姓名重复");
    view.nodes.get("lang-toggle").events.click();
    check(view.document.documentElement.lang === (initialChinese ? "en" : "zh-CN"), "切换语言失败");
    check(!view.nodes.get("hero-links").innerHTML.includes("files/cv.pdf"), "出现原始 CV 下载");
    check(!view.nodes.get("contact-links").innerHTML.includes("LinkedIn"), "出现空 LinkedIn 按钮");
    check(view.nodes.get("research-list").innerHTML.includes("0.143"), "研究条目未渲染");
    const education = view.nodes.get("education-list").innerHTML;
    check((education.match(/<img\b/g) || []).length === (page === "index.html" ? 2 : 0), "校标数量错误");
    check(!education.includes("eie.png"), "院徽仍出现在页面上");
  }
  check(runView(page, "en", false, true).observed === 0, "减少动态设置未生效");
}

const themed = runView("index.html", "en", false, false, "dark");
check(themed.document.documentElement.dataset.theme === "dark", "未恢复深色主题");
themed.nodes.get("theme-toggle").events.click();
check(themed.document.documentElement.dataset.theme === "light", "主题切换失败");
check(themed.nodes.get("theme-toggle").attributes["aria-pressed"] === "false", "主题按钮状态错误");
const privateView = runView("index.html", "en", true);
privateView.nodes.get("theme-toggle").events.click();
check(privateView.document.documentElement.dataset.theme === "dark", "禁用存储时无法切换主题");

// 防止后续编辑内容时意外注入 HTML 或脚本链接。
const title = data.en.projects[0].title;
data.en.projects[0].title = "<img onerror=alert(1)>";
data.en.projects[0].links = [{ label: "bad", url: "javascript:alert(1)" }];
const escaped = runView("index.html").nodes.get("project-list").innerHTML;
check(escaped.includes("&lt;img"), "标题未进行 HTML 转义");
check(!escaped.includes("javascript:"), "危险链接未过滤");
data.en.projects[0].title = title;
console.log("PASS: " + passed + " static, rendering, language, privacy and safety checks.");
