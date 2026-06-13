let works = [];
let events = [];
let currentLanguage = localStorage.getItem("cjy-language") === "en" ? "en" : "zh";
let activeFilter = "all";
let activePreviewWork = null;

const workGrid = document.querySelector("#work-grid");
const timelineList = document.querySelector("#timeline-list");
const ascentLadder = document.querySelector("#ascent-ladder");
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
    pageTitle: "陈俊烨 | AI 时代作品集",
    pageDescription: "陈俊烨的 AI 时代作品集：Vibe Coder、AI 教育系统数字化、未来课堂探索与多模态实践。",
    brand: {
      mark: "烨",
      name: "陈俊烨"
    },
    nav: {
      works: "作品",
      timeline: "行动轨迹",
      classroom: "未来课堂",
      contact: "连接"
    },
    hero: {
      name: "陈俊烨",
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
    vectors: {
      eyebrow: "The Loop",
      title: "三条线不是三份简历，是同一个闭环。",
      useLabel: "用 AI",
      useText: "从参赛者起步，用生成式 AI 与智能体把想法在黑客松里快速跑成原型。",
      buildLabel: "造系统",
      buildText: "把临场能力沉淀成校园系统、课程智能体与多模态应用，能真正交付。",
      teachLabel: "教别人",
      teachText: "把方法带给研究生、企业 HR 与校园群体，再回到更大的场子去组织。",
      converge: "全链路"
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
    ascent: {
      eyebrow: "Full-Chain Ascent",
      title: "一条线，触达全部 5 个层级。",
      reached: "已触达",
      tierUnit: "场",
      coverage: "层级覆盖"
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
      dataErrorRole: "请检查 /data/portfolio.json 是否存在且 JSON 格式正确。",
      tierNames: ["参赛者", "志愿者", "工作人员", "协办方", "主办方"]
    }
  },
  en: {
    pageTitle: "Chen Junye | AI-era Portfolio",
    pageDescription: "Chen Junye's AI-era portfolio: Vibe Coding, AI education digital systems, future classroom exploration, and multimodal AI practice.",
    brand: {
      mark: "烨",
      name: "Chen Junye"
    },
    nav: {
      works: "Works",
      timeline: "Field Notes",
      classroom: "Classroom",
      contact: "Connect"
    },
    hero: {
      name: "Chen Junye",
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
    vectors: {
      eyebrow: "The Loop",
      title: "Three lines, not three resumes — one closed loop.",
      useLabel: "Use AI",
      useText: "Starting as a participant, turning ideas into working prototypes at hackathons with generative AI and agents.",
      buildLabel: "Build Systems",
      buildText: "Turning on-the-spot skill into campus systems, course agents, and multimodal apps that actually ship.",
      teachLabel: "Teach Others",
      teachText: "Bringing the method to graduate students, corporate HR, and campus groups — then organizing at a larger scale.",
      converge: "Full Chain"
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
    ascent: {
      eyebrow: "Full-Chain Ascent",
      title: "One trajectory reaching all 5 tiers.",
      reached: "Reached",
      tierUnit: "events",
      coverage: "Tier coverage"
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
      dataErrorRole: "Please check that /data/portfolio.json exists and contains valid JSON.",
      tierNames: ["Participant", "Volunteer", "Staff", "Co-organizer", "Organizer"]
    }
  }
};

const prefersReducedMotion =
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver =
  !prefersReducedMotion && typeof IntersectionObserver === "function"
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      )
    : null;

function observeReveals(nodes) {
  const items = [...nodes];
  items.forEach((node, index) => {
    node.classList.add("reveal");
    if (!revealObserver) {
      node.classList.add("is-visible");
      return;
    }
    node.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 55}ms`);
    revealObserver.observe(node);
  });
}

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

// Organizational tier inferred from the event role (1 = participant … 5 = organizer).
// Derived from the Chinese role string so the timeline stays the single source of truth.
const TIER_COUNT = 5;

function rankOf(event) {
  const role = event?.type?.zh || "";
  if (/主办|负责/.test(role)) return 5;
  if (/协办/.test(role)) return 4;
  if (/工作人员/.test(role)) return 3;
  if (/志愿/.test(role)) return 2;
  return 1;
}

function tierName(rank) {
  return t("system.tierNames")[rank - 1] ?? "";
}

function rankMeterMarkup(rank) {
  return Array.from({ length: TIER_COUNT }, (_, i) =>
    `<span class="meter-seg${i < rank ? " on" : ""}"></span>`
  ).join("");
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

  document.querySelector("#hero-title")?.setAttribute("aria-label", t("hero.name"));
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

  observeReveals(workGrid.querySelectorAll(".work-card"));
}

function renderLadder() {
  if (!ascentLadder) {
    return;
  }

  const counts = Array.from({ length: TIER_COUNT }, () => 0);
  events.forEach((event) => {
    counts[rankOf(event) - 1] += 1;
  });
  const peak = counts.reduce((max, count, i) => (count > 0 ? i + 1 : max), 0);
  const reachedTiers = counts.filter((count) => count > 0).length;
  const maxCount = Math.max(1, ...counts);

  const tiers = Array.from({ length: TIER_COUNT }, (_, i) => TIER_COUNT - i)
    .map((rank) => {
      const count = counts[rank - 1];
      const fill = count ? Math.max(0.18, count / maxCount) : 0;
      const isPeak = rank === peak;
      const isReached = count > 0;
      return `
        <div class="ascent-tier${isReached ? " reached" : ""}${isPeak ? " peak" : ""}" data-rank="${rank}">
          <span class="tier-rank">L${rank}</span>
          <span class="tier-name">${escapeHtml(tierName(rank))}</span>
          <span class="tier-track"><span class="tier-fill" style="--fill: ${fill}"></span></span>
          <span class="tier-count">${count ? `${count} ${escapeHtml(t("ascent.tierUnit"))}` : "—"}</span>
          ${isPeak ? `<span class="tier-flag">${escapeHtml(t("ascent.reached"))}</span>` : ""}
        </div>
      `;
    })
    .join("");

  ascentLadder.innerHTML = `
    <div class="ascent-head">
      <div>
        <p class="eyebrow">${escapeHtml(t("ascent.eyebrow"))}</p>
        <h3>${escapeHtml(t("ascent.title"))}</h3>
      </div>
      <div class="ascent-coverage">
        <strong>${reachedTiers}/${TIER_COUNT}</strong>
        <span>${escapeHtml(t("ascent.coverage"))}</span>
      </div>
    </div>
    <div class="ascent-tiers">${tiers}</div>
  `;

  observeReveals(ascentLadder.querySelectorAll(".ascent-tier"));
}

function renderTimeline() {
  renderLadder();

  timelineList.innerHTML = events
    .map((event) => {
      const rank = rankOf(event);
      return `
        <article class="timeline-item ${event.award ? "award" : ""}" data-rank="${rank}">
          <div class="timeline-topline">
            <span class="timeline-date">${escapeHtml(localized(event.date))}</span>
            <span class="timeline-type">${escapeHtml(localized(event.type))}</span>
          </div>
          <h3>${escapeHtml(localized(event.title))}</h3>
          <p>${escapeHtml(localized(event.note))}</p>
          <div class="timeline-rank" aria-label="${escapeHtml(tierName(rank))}">
            <span class="rank-meter">${rankMeterMarkup(rank)}</span>
            <span class="rank-label">${escapeHtml(tierName(rank))}</span>
          </div>
        </article>
      `;
    })
    .join("");

  observeReveals(timelineList.querySelectorAll(".timeline-item"));
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
  observeReveals(document.querySelectorAll("[data-reveal]"));

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
