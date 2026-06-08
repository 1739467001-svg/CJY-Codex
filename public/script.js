let works = [];
let events = [];
let currentLanguage = localStorage.getItem("cjy-language") === "en" ? "en" : "zh";
let activeFilter = "all";
let activePreviewWork = null;

const workGrid = document.querySelector("#work-grid");
const timelineList = document.querySelector("#timeline-list");
const previewDock = document.querySelector("#preview-dock");
const previewTitle = document.querySelector("#preview-title");
const previewKicker = document.querySelector("#preview-kicker");
const previewMeta = document.querySelector("#preview-meta");
const previewFrame = document.querySelector("#preview-frame");
const previewFrameWrap = document.querySelector("#preview-frame-wrap");
const previewOpenLink = document.querySelector("#preview-open-link");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const languageToggle = document.querySelector("#language-toggle");

const translations = {
  zh: {
    pageTitle: "CJY 陈俊烨 | AI 时代作品集",
    pageDescription: "CJY 陈俊烨的 AI 时代作品集：Vibe Coder、AI 教育系统数字化、未来课堂探索与多模态实践。",
    brand: {
      name: "陈俊烨"
    },
    nav: {
      works: "作品",
      timeline: "行动轨迹",
      classroom: "未来课堂",
      contact: "连接"
    },
    hero: {
      namePrimary: "CJY",
      nameSecondary: "陈俊烨",
      eyebrow: "AI 时代个人作品集",
      subtitle: "Vibe Coder + AI 教育系统数字化实践者 + 未来课堂探索者 + AI 多模态行动者。",
      primaryAction: "进入作品舱",
      referenceAction: "参考个人站"
    },
    profile: {
      undergraduateLabel: "本科",
      undergraduateValue: "软件工程：基础编程、大数据、Web 前后端、Java",
      graduateLabel: "研究生",
      graduateValue: "浙江工商大学 信电人工智能学院",
      identityLabel: "核心身份",
      identityValue: "系统开发贡献者、AI 助教、黑客松组织者与参赛者"
    },
    metrics: {
      activities: "AI 活动与黑客松参与",
      scenes: "校园智能体与系统场景",
      training: "培训、助教、课程探索节点",
      fullChainTitle: "全链路",
      fullChainText: "参赛者 / 志愿者 / 工作人员 / 负责人"
    },
    intro: {
      title: "把 AI 从“工具演示”推进到真实教育与校园系统。",
      body1: "我关注的是 AI 应用在真实组织中的落地：课程、会议室、就业、图书馆、督导管理、AI 助教，以及一场场黑客松带来的快速原型能力。",
      body2: "这份作品集会像一座可进入的展厅：每个作品是一块独立模块，点击后在当前页面打开内置窗口，查看网页、Demo、文档或原型，不把访客带走。"
    },
    works: {
      title: "作品舱",
      description: "先放入你的代表性场景，等你发送链接后，我会把每块作品接成内置预览。"
    },
    filters: {
      all: "全部",
      campus: "校园系统",
      education: "AI 教育",
      agent: "智能体",
      hackathon: "黑客松"
    },
    classroom: {
      title: "未来课堂不是一个概念，是一组正在被接线的系统。",
      item1Title: "课程智能体",
      item1Text: "探索“小龙虾课程”，让会议室预约、智慧就业、图书馆管理、象棋指导等场景进入课程实验。",
      item2Title: "AI 助教",
      item2Text: "2026.5.15-6.12 浙江工商大学双通班研究生 AI 助教，把生成式 AI 引入学习支持链路。",
      item3Title: "组织培训",
      item3Text: "面向青年创业协会、企业 HR 与校园群体，进行 AI Agent 与智能体搭建培训。"
    },
    timeline: {
      title: "从参赛者到组织者的行动轨迹"
    },
    service: {
      title: "志愿服务是一条很长的底层能力线。",
      text: "初中图书馆志愿者，高中博物馆志愿者，本科雷锋队队长，考研阶段古建筑博物馆实习，研究生阶段全链路参与 AI 活动与 AI 黑客松。"
    },
    contact: {
      title: "把你的作品链接发给我。",
      text: "每个链接我会整理成作品块：标题、简介、标签、角色、成果、内置预览窗口。若某些网站禁止 iframe 嵌入，我会给它做一个漂亮的封面状态和备用打开方式。"
    },
    preview: {
      title: "作品预览",
      placeholderTitle: "等待作品链接接入",
      placeholderText: "你发送链接后，这里会以内置窗口展示你的网页或 Demo。"
    },
    aria: {
      mainNav: "主导航",
      backTop: "回到顶部",
      profileSummary: "个人档案摘要",
      metrics: "关键数字",
      positioning: "定位",
      workFilter: "作品筛选",
      openNewWindow: "在新窗口打开",
      closePreview: "关闭预览",
      switchToEnglish: "切换到英文",
      switchToChinese: "Switch to Chinese"
    },
    system: {
      open: "OPEN",
      dataErrorTitle: "作品数据加载失败",
      dataErrorRole: "请检查 /data/portfolio.json 是否存在且 JSON 格式正确。"
    }
  },
  en: {
    pageTitle: "CJY Chen Junye | AI-era Portfolio",
    pageDescription: "CJY Chen Junye's AI-era portfolio: Vibe Coding, AI education digital systems, future classroom exploration, and multimodal AI practice.",
    brand: {
      name: "Chen Junye"
    },
    nav: {
      works: "Works",
      timeline: "Field Notes",
      classroom: "Classroom",
      contact: "Connect"
    },
    hero: {
      namePrimary: "CJY",
      nameSecondary: "Chen Junye",
      eyebrow: "AI-era Personal Portfolio",
      subtitle: "Vibe Coder + AI education systems builder + future classroom explorer + multimodal AI practitioner.",
      primaryAction: "Enter Works",
      referenceAction: "Reference Site"
    },
    profile: {
      undergraduateLabel: "Undergraduate",
      undergraduateValue: "Software Engineering: programming fundamentals, big data, web frontend/backend, Java",
      graduateLabel: "Graduate",
      graduateValue: "School of Information Engineering and AI, Zhejiang Gongshang University",
      identityLabel: "Core Identity",
      identityValue: "System contributor, AI teaching assistant, hackathon organizer and participant"
    },
    metrics: {
      activities: "AI events and hackathons",
      scenes: "Campus agent and system scenarios",
      training: "Training, TA, and course exploration nodes",
      fullChainTitle: "Full Chain",
      fullChainText: "Participant / Volunteer / Staff / Organizer"
    },
    intro: {
      title: "Moving AI from tool demos into real education and campus systems.",
      body1: "My focus is AI implementation inside real organizations: courses, meeting rooms, employment, libraries, supervision management, AI teaching support, and rapid prototyping through hackathons.",
      body2: "This portfolio works like an explorable exhibition. Each work is an independent block; clicking opens an embedded preview window on the same page for websites, demos, documents, or prototypes."
    },
    works: {
      title: "Work Bay",
      description: "Representative scenarios are placed here first. When links are added, each block becomes an embedded preview."
    },
    filters: {
      all: "All",
      campus: "Campus",
      education: "AI Education",
      agent: "Agents",
      hackathon: "Hackathons"
    },
    classroom: {
      title: "The future classroom is not a slogan; it is a set of systems being wired together.",
      item1Title: "Course Agents",
      item1Text: "Exploring OpenClaw course scenarios where meeting-room booking, smart employment, library management, and chess coaching enter course experiments.",
      item2Title: "AI Teaching Assistant",
      item2Text: "From May 15 to June 12, 2026, served as an AI teaching assistant for ZJGSU graduate students, bringing generative AI into learning support.",
      item3Title: "Training Programs",
      item3Text: "Delivered AI Agent and agent-building training for youth entrepreneurship groups, corporate HR teams, and campus communities."
    },
    timeline: {
      title: "From participant to organizer: a field trajectory"
    },
    service: {
      title: "Volunteer service has been a long-running foundation.",
      text: "Library volunteer in middle school, museum volunteer in high school, Lei Feng Team captain as an undergraduate, ancient architecture museum intern during exam preparation, and full-chain AI event involvement as a graduate student."
    },
    contact: {
      title: "Send me your work links.",
      text: "Each link can become a work block with title, summary, tags, role, result, and an embedded preview. If a site blocks iframe embedding, the block can use a polished cover state with a backup open action."
    },
    preview: {
      title: "Work Preview",
      placeholderTitle: "Waiting for work links",
      placeholderText: "After links are added, your website or demo will appear here inside the embedded preview window."
    },
    aria: {
      mainNav: "Main navigation",
      backTop: "Back to top",
      profileSummary: "Profile summary",
      metrics: "Key metrics",
      positioning: "Positioning",
      workFilter: "Work filter",
      openNewWindow: "Open in new window",
      closePreview: "Close preview",
      switchToEnglish: "切换到英文",
      switchToChinese: "Switch to Chinese"
    },
    system: {
      open: "OPEN",
      dataErrorTitle: "Failed to load portfolio data",
      dataErrorRole: "Please check that /data/portfolio.json exists and contains valid JSON."
    }
  }
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function t(path) {
  return path.split(".").reduce((value, key) => value?.[key], translations[currentLanguage]) ?? path;
}

function localized(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return value[currentLanguage] ?? value.zh ?? value.en ?? "";
  }

  return value ?? "";
}

function tagMarkup(tags = []) {
  return localized(tags)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("pageDescription"));
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", t("pageTitle"));
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", t("pageDescription"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  document.querySelector("#hero-title")?.setAttribute("aria-label", `${t("hero.namePrimary")} ${t("hero.nameSecondary")}`);
  document.body.dataset.lang = currentLanguage;

  if (languageToggle) {
    const current = languageToggle.querySelector(".language-current");
    const next = languageToggle.querySelector(".language-next");
    if (current && next) {
      current.textContent = currentLanguage === "zh" ? "中文" : "EN";
      next.textContent = currentLanguage === "zh" ? "EN" : "中文";
    }
    languageToggle.setAttribute(
      "aria-label",
      currentLanguage === "zh" ? t("aria.switchToEnglish") : t("aria.switchToChinese")
    );
  }
}

function renderWorks(filter = activeFilter) {
  activeFilter = filter;
  const visibleWorks = works.filter((work) => filter === "all" || work.category.includes(filter));

  workGrid.innerHTML = visibleWorks
    .map(
      (work, index) => `
        <button class="work-card" type="button" style="--accent: ${escapeHtml(work.accent)}" data-index="${index}" data-open-label="${escapeHtml(t("system.open"))}">
          <div class="work-topline">
            <span class="work-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="work-date">${escapeHtml(localized(work.date))}</span>
          </div>
          <div class="work-tags">${tagMarkup(work.tags)}</div>
          <h3>${escapeHtml(localized(work.title))}</h3>
          <p>${escapeHtml(localized(work.description))}</p>
          <div class="work-role">${escapeHtml(localized(work.role))}</div>
        </button>
      `
    )
    .join("");

  [...workGrid.querySelectorAll(".work-card")].forEach((card) => {
    const work = visibleWorks[Number(card.dataset.index)];
    card.addEventListener("click", () => openPreview(work));
  });
}

function renderTimeline() {
  timelineList.innerHTML = events
    .map(
      (event) => `
        <article class="timeline-item ${event.award ? "award" : ""}">
          <div class="timeline-topline">
            <span class="timeline-date">${escapeHtml(localized(event.date))}</span>
            <span class="timeline-type">${escapeHtml(localized(event.type))}</span>
          </div>
          <h3>${escapeHtml(localized(event.title))}</h3>
          <p>${escapeHtml(localized(event.note))}</p>
        </article>
      `
    )
    .join("");
}

function openPreview(work) {
  activePreviewWork = work;
  previewTitle.textContent = localized(work.title);
  previewKicker.textContent = localized(work.date);
  previewMeta.innerHTML = tagMarkup(work.tags);

  if (work.url) {
    previewFrame.src = work.url;
    previewOpenLink.href = work.url;
    previewOpenLink.removeAttribute("aria-disabled");
    previewFrameWrap.classList.add("has-url");
  } else {
    previewFrame.removeAttribute("src");
    previewOpenLink.href = "#";
    previewOpenLink.setAttribute("aria-disabled", "true");
    previewFrameWrap.classList.remove("has-url");
  }

  previewDock.classList.add("open");
  previewDock.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePreview() {
  activePreviewWork = null;
  previewDock.classList.remove("open");
  previewDock.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  previewFrame.removeAttribute("src");
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("cjy-language", currentLanguage);
  applyStaticTranslations();
  renderWorks(activeFilter);
  renderTimeline();

  if (activePreviewWork) {
    openPreview(activePreviewWork);
  }
}

function bindInteractions() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderWorks(button.dataset.filter);
    });
  });

  languageToggle?.addEventListener("click", () => {
    setLanguage(currentLanguage === "zh" ? "en" : "zh");
  });

  document.querySelectorAll("[data-close-preview]").forEach((button) => {
    button.addEventListener("click", closePreview);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && previewDock.classList.contains("open")) {
      closePreview();
    }
  });

  previewOpenLink.addEventListener("click", (event) => {
    if (previewOpenLink.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });
}

function renderError(error) {
  workGrid.innerHTML = `
    <article class="work-card" style="--accent: rgba(255, 96, 71, 0.24)">
      <div class="work-topline">
        <span class="work-index">!</span>
        <span class="work-date">DATA ERROR</span>
      </div>
      <h3>${escapeHtml(t("system.dataErrorTitle"))}</h3>
      <p>${escapeHtml(error.message)}</p>
      <div class="work-role">${escapeHtml(t("system.dataErrorRole"))}</div>
    </article>
  `;
}

async function init() {
  bindInteractions();
  applyStaticTranslations();

  try {
    const response = await fetch("/data/portfolio.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    works = data.works || [];
    events = data.events || [];
    renderWorks();
    renderTimeline();
  } catch (error) {
    renderError(error);
  }
}

init();
