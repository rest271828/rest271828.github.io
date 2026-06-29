const data = window.SITE_DATA;

let currentLang = localStorage.getItem("siteLanguage") || "en";

const validUrl = (url) => url && url.trim() !== "";
const language = () => data[currentLang];
const displayName = (content) => (content.chineseName ? `${content.name} / ${content.chineseName}` : content.name);

function renderLinks(targetId, links, asButtons = false) {
  const className = asButtons ? ' class="button"' : "";
  document.getElementById(targetId).innerHTML = links
    .filter(Boolean)
    .map((link) => `<a${className} href="${link.url}" rel="noreferrer">${link.label}</a>`)
    .join("");
}

function renderListWithTime(targetId, items) {
  document.getElementById(targetId).innerHTML = items
    .map(
      (item) => `
        <li>
          <span class="list-time">${item.time}</span>
          <span>${item.title}</span>
        </li>
      `
    )
    .join("");
}

function renderPage() {
  const content = language();
  const isChinese = currentLang === "zh";

  document.documentElement.lang = isChinese ? "zh-CN" : "en";
  document.title = `${content.name} - Homepage`;
  document.getElementById("site-title").textContent = content.name;
  document.getElementById("hero-label").textContent = content.siteLabel;
  document.getElementById("hero-name").textContent = displayName(content);
  document.getElementById("hero-subtitle").textContent = content.subtitle;
  document.getElementById("hero-summary").textContent = content.summary;
  document.getElementById("about-text").textContent = content.about;
  document.getElementById("footer-updated").textContent = content.updated;
  document.getElementById("lang-toggle").textContent = isChinese ? "EN" : "涓枃";

  document.getElementById("main-nav").innerHTML = Object.entries(content.nav)
    .map(([id, label]) => `<a href="#${id}">${label}</a>`)
    .join("");

  document.querySelectorAll("[data-section-title]").forEach((heading) => {
    heading.textContent = content.sections[heading.dataset.sectionTitle];
  });

  const portrait = document.querySelector(".portrait");
  if (data.avatar) {
    portrait.innerHTML = `<img src="${data.avatar}" alt="${displayName(content)} profile photo" />`;
  } else {
    portrait.innerHTML = `<span id="portrait-initial">${content.name.trim().charAt(0).toUpperCase() || "Q"}</span>`;
  }

  renderLinks(
    "hero-links",
    [
      validUrl(data.github) && { label: content.buttons.github, url: data.github },
      validUrl(data.email) && { label: content.buttons.email, url: `mailto:${data.email}` },
      validUrl(data.cv) && { label: content.buttons.cv, url: data.cv },
      { label: content.buttons.projects, url: "#projects" }
    ],
    true
  );

  document.getElementById("education-list").innerHTML = content.education
    .map((item) => {
      const logos = [item.logo, item.secondaryLogo].filter(validUrl);
      return `
        <article class="education-item">
          <div class="education-logo-set">
            ${logos.map((logo) => `<img class="education-logo" src="${logo}" alt="${item.school} logo" loading="lazy" />`).join("")}
          </div>
          <div class="education-main">
            <h3>${item.school}</h3>
            <p class="education-degree">${item.degree}</p>
            <p>${item.detail}</p>
            ${item.note ? `<p class="education-note">${item.note}</p>` : ""}
          </div>
          <div class="education-time">${item.time}</div>
        </article>
      `;
    })
    .join("");

  document.getElementById("interest-list").innerHTML = content.interests
    .map((interest) => `<span class="tag">${interest}</span>`)
    .join("");

  document.getElementById("project-list").innerHTML = content.projects
    .map(
      (project) => `
        <article class="project-item">
          <div class="project-media">
            <img src="${project.image}" alt="${project.title}" loading="lazy" />
          </div>
          <div>
            <p class="item-time">${project.time}</p>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="tech-list">${project.tech.map((item) => `<span>${item}</span>`).join("")}</p>
            <p class="links">
              ${project.links
                .filter((link) => validUrl(link.url))
                .map((link) => `<a href="${link.url}" rel="noreferrer">${link.label}</a>`)
                .join("")}
            </p>
          </div>
        </article>
      `
    )
    .join("");

  document.getElementById("experience-list").innerHTML = content.experience
    .map(
      (item) => `
        <article class="text-item">
          <div class="item-time">${item.time}</div>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `
    )
    .join("");

  document.getElementById("skill-list").innerHTML = content.skills
    .map(
      (group) => `
        <article class="skill-row">
          <h3>${group.title}</h3>
          <p>${group.items.map((item) => `<span>${item}</span>`).join("")}</p>
        </article>
      `
    )
    .join("");

  document.getElementById("certificate-list").innerHTML = content.certificates
    .map((item) => `<li>${item}</li>`)
    .join("");

  renderListWithTime("award-list", content.awards);

  document.getElementById("contact-text").textContent = content.contact;
  renderLinks("contact-links", [
    validUrl(data.email) && { label: data.email, url: `mailto:${data.email}` },
    validUrl(data.github) && { label: "GitHub: rest271828", url: data.github },
    validUrl(data.linkedin) && { label: "LinkedIn", url: data.linkedin },
    validUrl(data.cv) && { label: "CV", url: data.cv }
  ]);
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("siteLanguage", currentLang);
  renderPage();
});

renderPage();

