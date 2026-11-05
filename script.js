const data = window.SITE_DATA;

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

// 内联图标不依赖外部字体或脚本。
const iconPaths = {
  github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.2 4c.2-.4.7-1.9-.2-4 0 0-1.3-.4-4.2 1.6a14.4 14.4 0 0 0-7.6 0C4.3-.4 3 0 3 0c-.9 2.1-.4 3.6-.2 4A5.8 5.8 0 0 0 1.2 8.1c0 5.8 3.5 7 6.8 7.4a3.4 3.4 0 0 0-1 2.6V22" transform="translate(1 1) scale(.92)"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-9 5.7a2 2 0 0 1-2 0L2 6"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/>',
  moon: '<path d="M20.9 13.4A9 9 0 0 1 10.6 3.1 9 9 0 1 0 20.9 13.4Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>'
};
const icon = (name) => iconPaths[name]
  ? `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`
  : "";

let theme = "light";
try {
  if (localStorage.getItem("siteTheme") === "dark") theme = "dark";
} catch { /* 隐私模式下使用默认浅色。 */ }

function renderTheme() {
  const button = document.getElementById("theme-toggle");
  if (!button) return;
  const dark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  button.innerHTML = icon(dark ? "sun" : "moon");
  button.setAttribute("aria-pressed", String(dark));
  const label = currentLang === "zh" ? (dark ? "切换为浅色" : "切换为深色") : (dark ? "Switch to light theme" : "Switch to dark theme");
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
}

function linksMarkup(links) {
  return links.filter((link) => link && validUrl(link.url))
    .map((link) => `<a href="${escapeHtml(link.url)}"${link.download ? " download" : ""} rel="noreferrer noopener">${icon(link.icon)}${escapeHtml(link.label)}</a>`).join("");
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
  document.title = `${content.name} | Robotics & Robot Learning`;
  document.querySelector('meta[name="description"]').content = content.summary;
  writeText("site-title", content.name);
  writeText("hero-subtitle", content.subtitle);
  writeText("hero-summary", content.summary);
  writeText("profile-name", content.name);
  writeText("profile-alternate", content.chineseName);
  writeText("profile-role", content.profile.role);
  writeText("profile-school", content.profile.school);
  writeText("profile-visit", content.profile.visit);
  const alternate = document.getElementById("profile-alternate");
  if (alternate) alternate.hidden = !content.chineseName;
  writeText("about-text", content.about);
  writeText("footer-updated", content.updated);

  const toggle = document.getElementById("lang-toggle");
  toggle.textContent = isChinese ? "EN" : "中文";
  toggle.lang = isChinese ? "en" : "zh-CN";
  toggle.setAttribute("aria-label", isChinese ? "Switch to English" : "切换为中文");
  document.getElementById("main-nav").innerHTML = linksMarkup([
      ...Object.entries(content.nav).map(([id, label]) => ({ label, url: `#${id}` })),
      { label: content.buttons.cv, url: data.cv, download: true }
    ]);
  renderTheme();

  document.querySelectorAll("[data-section-title]").forEach((heading) => {
    heading.textContent = content.sections[heading.dataset.sectionTitle];
  });

  const portrait = document.querySelector(".portrait");
  if (portrait) {
    portrait.hidden = !validUrl(data.avatar);
    portrait.innerHTML = portrait.hidden ? "" :
      `<img src="${escapeHtml(data.avatar)}" alt="${escapeHtml(content.name)}" width="128" height="128" />`;
  }

  document.getElementById("hero-links").innerHTML = linksMarkup([
    { label: content.buttons.email, url: `mailto:${data.email}`, icon: "mail" },
    { label: content.buttons.github, url: data.github, icon: "github" },
    { label: content.buttons.cv, url: data.cv, icon: "file", download: true }
  ]);

  document.getElementById("education-list").innerHTML = content.education.map((item) => `
    <article class="education-item">
      <div class="education-logo-set">${validUrl(item.logo)
        ? `<img class="education-logo" src="${escapeHtml(item.logo)}" alt="" width="92" height="48" />` : ""}</div>
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
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("siteTheme", theme); } catch { /* 不影响切换。 */ }
  renderTheme();
});
renderPage();

// 仅在支持观察器且未开启减少动态效果时启用滚动渐入；失败不会隐藏内容。
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll("main > section:not(.intro)").forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
}
