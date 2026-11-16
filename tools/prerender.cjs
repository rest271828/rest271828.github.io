// 预渲染：用 site-data.js + script.js 在 Node 中生成完整的英文静态 index.html。
// 访客浏览器仍会运行 script.js（中英切换、主题、动画），但不跑 JavaScript 的搜索引擎、
// 链接预览和 AI 工具也能直接读到全部内容。不联网、无第三方依赖。
// 用法：node tools/prerender.cjs          生成 index.html
//       node tools/prerender.cjs --check  只检查 index.html 是否为最新（供 check-site 使用）
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const SITE = "https://rest271828.github.io/";

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function render() {
  const template = read("tools/index.template.html");
  const dataContext = { window: {} };
  vm.runInNewContext(read("site-data.js"), dataContext);
  const data = dataContext.window.SITE_DATA;

  // 轻量 DOM 替身：只记录 script.js 写入的文本、HTML、属性和 hidden 状态。
  const makeNode = () => ({
    textContent: undefined, innerHTML: undefined, hidden: undefined, lang: undefined,
    attributes: {}, dataset: {}, content: "",
    classList: { add() {}, toggle() {} },
    setAttribute(key, value) { this.attributes[key] = String(value); },
    addEventListener() {}
  });
  const nodes = new Map();
  for (const match of template.matchAll(/\bid="([^"]+)"/g)) nodes.set(match[1], makeNode());
  const headings = [...template.matchAll(/data-section-title="([^"]+)"/g)]
    .map((match) => Object.assign(makeNode(), { dataset: { sectionTitle: match[1] } }));
  const portrait = makeNode();
  const meta = makeNode();
  const document = {
    title: "",
    documentElement: { lang: "en", dataset: {} },
    getElementById: (id) => nodes.get(id) || null,
    querySelector: (selector) => selector === ".portrait" ? portrait : meta,
    querySelectorAll: (selector) => selector === "[data-section-title]" ? headings : []
  };
  const context = {
    document, URL,
    window: { SITE_DATA: data, location: new URL(SITE), matchMedia: () => ({ matches: true }) },
    localStorage: { getItem: () => null, setItem() {} }
  };
  vm.runInNewContext(read("script.js"), context);

  let html = template;
  const fillOpenTag = (tag, node) => {
    let out = tag;
    for (const [key, value] of Object.entries(node.attributes)) {
      const attr = `${key}="${escapeHtml(value)}"`;
      out = new RegExp(`\\s${key}="[^"]*"`).test(out)
        ? out.replace(new RegExp(`${key}="[^"]*"`), attr)
        : out.replace(/\s*\/?>$/, (end) => ` ${attr}${end}`);
    }
    if (node.lang) out = /\slang="/.test(out) ? out.replace(/lang="[^"]*"/, `lang="${node.lang}"`) : out.replace(/>$/, ` lang="${node.lang}">`);
    if (node.hidden === true && !/\shidden\b/.test(out)) out = out.replace(/>$/, " hidden>");
    if (node.hidden === false) out = out.replace(/\shidden\b/, "");
    return out;
  };
  for (const [id, node] of nodes) {
    const pattern = new RegExp(`(<(\\w+)\\b[^>]*\\bid="${id}"[^>]*>)([\\s\\S]*?)(</\\2>)`);
    html = html.replace(pattern, (_, open, _tag, inner, close) => {
      const body = node.innerHTML !== undefined ? node.innerHTML
        : node.textContent !== undefined ? escapeHtml(node.textContent) : inner;
      return fillOpenTag(open, node) + body + close;
    });
  }
  for (const heading of headings) {
    const key = heading.dataset.sectionTitle;
    html = html.replace(new RegExp(`(<(h\\d)\\b[^>]*data-section-title="${key}"[^>]*>)[\\s\\S]*?(</\\2>)`),
      (_, open, _tag, close) => open + escapeHtml(heading.textContent) + close);
  }
  html = html.replace(/<div class="portrait" hidden><\/div>/, portrait.hidden
    ? '<div class="portrait" hidden></div>'
    : `<div class="portrait">${portrait.innerHTML}</div>`);

  const en = data.en;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(document.title)}</title>`);
  html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeHtml(en.summary)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeHtml(en.summary)}$2`);

  // 结构化数据（schema.org Person），帮助搜索引擎识别姓名、学校与研究方向。
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: en.name,
    alternateName: data.zh.name,
    url: SITE,
    image: data.avatar ? SITE + data.avatar : undefined,
    jobTitle: en.profile.role,
    affiliation: en.education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.school })),
    knowsAbout: en.interests,
    sameAs: [data.github, data.linkedin].filter(Boolean)
  };
  const jsonLd = JSON.stringify(person, null, 2).replace(/</g, "\\u003c").replace(/\n/g, "\n    ");
  html = html.replace("<!--JSON-LD-->", `<script type="application/ld+json">\n    ${jsonLd}\n    </script>`);
  return html;
}

if (require.main === module) {
  const html = render();
  if (process.argv.includes("--check")) {
    if (read("index.html") !== html) {
      console.error("index.html 不是最新的：请运行 node tools/prerender.cjs");
      process.exit(1);
    }
    console.log("index.html is up to date.");
  } else {
    fs.writeFileSync(path.join(root, "index.html"), html);
    console.log("Wrote index.html (" + html.length + " bytes).");
  }
}
module.exports = { render };
