const data = window.SITE_DATA;
const isCv = document.body.dataset.view === "cv";

// 本地语言设置只保存 en 或 zh；浏览器禁用存储时仍能正常使用。
let currentLang = "en";
try {
  const saved = localStorage.getItem("siteLanguage");
  if (saved === "en" || saved === "zh") currentLang = saved;
} catch { /* 隐私模式下无需持久化设置。 */ }

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

// 编辑数据时不能把脚本协议或空占位链接带入页面。
function validUrl(value) {
  if (typeof value !== "string" || !value.trim() || value === "#") return false;
  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "https:" || url.protocol === "mailto:" ||
      (url.origin === window.location.origin && ["http:", "file:"].includes(url.protocol));
  } catch { return false; }
}

const writeText = (id, value) => {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
};

function linksMarkup(links) {
  return links.filter((link) => link && validUrl(link.url))
    .map((link) => `<a href="${escapeHtml(link.url)}" rel="noreferrer noopener">${escapeHtml(link.label)}</a>`).join("");
}

function techMarkup(items = []) {
  return `<p class="tech-list">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</p>`;
}

function renderEntries(id, entries) {
  document.getElementById(id).innerHTML = entries.map((item) => `
    <article class="text-item">
      <p class="item-time">${escapeHtml(item.time)}</p>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        ${item.affiliation ? `<p class="affiliation">${escapeHtml(item.affiliation)}</p>` : ""}
        <p>${escapeHtml(item.description)}</p>
        ${item.highlights ? `<ul class="highlights">${item.highlights.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>` : ""}
        ${item.tech ? techMarkup(item.tech) : ""}
      </div>
    </article>`).join("");
}

function renderPage() {
  const content = data[currentLang];
  const isChinese = currentLang === "zh";
  document.documentElement.lang = isChinese ? "zh-CN" : "en";
  document.title = `${content.name} | ${isCv ? content.cvTitle : "Robotics & Robot Learning"}`;
  document.querySelector('meta[name="description"]').content = content.summary;
  writeText("site-title", content.name);
  writeText("hero-label", isCv ? content.cvTitle : content.siteLabel);
  writeText("hero-name", isChinese ? `${content.name} / ${content.chineseName}` : content.name);
  writeText("hero-subtitle", content.subtitle);
  writeText("hero-summary", content.summary);
  writeText("about-text", content.about);
  writeText("footer-updated", content.updated);

  const toggle = document.getElementById("lang-toggle");
  toggle.textContent = isChinese ? "EN" : "中文";
  toggle.lang = isChinese ? "en" : "zh-CN";
  toggle.setAttribute("aria-label", isChinese ? "Switch to English" : "切换为中文");
  document.getElementById("main-nav").innerHTML = isCv
    ? `<a href="index.html">${escapeHtml(content.back)}</a>`
    : Object.entries(content.nav).map(([id, label]) => `<a href="#${escapeHtml(id)}">${escapeHtml(label)}</a>`).join("");
  writeText("print-cv", content.print);

  document.querySelectorAll("[data-section-title]").forEach((heading) => {
    heading.textContent = content.sections[heading.dataset.sectionTitle];
  });

  const portrait = document.querySelector(".portrait");
  if (portrait) {
    portrait.hidden = !data.avatar;
    document.querySelector(".hero").classList.toggle("has-portrait", Boolean(data.avatar));
    portrait.innerHTML = data.avatar && validUrl(data.avatar)
      ? `<img src="${escapeHtml(data.avatar)}" alt="${escapeHtml(content.name)}" width="170" height="205" />` : "";
  }

  document.getElementById("hero-links").innerHTML = linksMarkup([
    { label: content.buttons.github, url: data.github },
    { label: isCv ? data.email : content.buttons.email, url: `mailto:${data.email}` },
    !isCv && { label: content.buttons.cv, url: data.cv },
    !isCv && { label: content.buttons.projects, url: "#projects" }
  ]);

  document.getElementById("education-list").innerHTML = content.education.map((item) => `
    <article class="education-item">
      <div class="education-logo-set">${[item.logo, item.secondaryLogo].filter(validUrl).map((logo, index) =>
        `<img class="education-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(index ? "ELITE INSTITUTE OF ENGINEERING" : item.school)}" loading="lazy" />`).join("")}</div>
      <div class="education-main">
        <div class="entry-heading"><h3>${escapeHtml(item.school)}</h3><p class="education-time">${escapeHtml(item.time)}</p></div>
        <p class="location">${escapeHtml(item.location)}</p>
        <p class="education-degree">${escapeHtml(item.degree)}</p>
        <p>${escapeHtml(item.detail)}</p>
        <p class="education-note">${escapeHtml(item.note)}</p>
      </div>
    </article>`).join("");

  document.getElementById("interest-list").innerHTML = content.interests.map((item) =>
    `<span>${escapeHtml(item)}</span>`).join("");
  renderEntries("research-list", content.research);
  renderEntries("patent-list", content.patents);

  document.getElementById("project-list").innerHTML = content.projects.map((project) => {
    const links = linksMarkup(project.links);
    return `<article class="project-item ${project.image ? "has-media" : ""}">
      ${project.image && validUrl(project.image) ? `<div class="project-media"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt || project.title)}" loading="lazy" /></div>` : ""}
      <div class="project-copy">
        <div class="entry-heading"><h3>${escapeHtml(project.title)}</h3><p class="item-time">${escapeHtml(project.time)}</p></div>
        <p>${escapeHtml(project.description)}</p>
        ${techMarkup(project.tech)}
        ${links ? `<p class="links">${links}</p>` : ""}
      </div>
    </article>`;
  }).join("");

  document.getElementById("skill-list").innerHTML = content.skills.map((group) => `
    <div class="skill-row"><h3>${escapeHtml(group.title)}</h3><p>${group.items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</p></div>`).join("");
  document.getElementById("certificate-list").innerHTML = content.certificates.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  document.getElementById("award-list").innerHTML = content.awards.map((item) =>
    `<li><span class="list-time">${escapeHtml(item.time)}</span><span>${escapeHtml(item.title)}</span></li>`).join("");
  writeText("contact-text", content.contact);
  document.getElementById("contact-links").innerHTML = linksMarkup([
    { label: data.email, url: `mailto:${data.email}` },
    { label: "GitHub", url: data.github },
    { label: "LinkedIn", url: data.linkedin }
  ]);
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "zh" : "en";
  try { localStorage.setItem("siteLanguage", currentLang); } catch { /* 不影响切换。 */ }
  renderPage();
});
document.getElementById("print-cv")?.addEventListener("click", () => window.print());
renderPage();

// 仅在支持观察器且未开启减少动态效果时启用滚动渐入；失败不会隐藏内容。
if (!isCv && "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll("main > section:not(.hero)").forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
}
