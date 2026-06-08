let works = [];
let events = [];

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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function tagMarkup(tags = []) {
  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderWorks(filter = "all") {
  const visibleWorks = works.filter((work) => filter === "all" || work.category.includes(filter));

  workGrid.innerHTML = visibleWorks
    .map(
      (work, index) => `
        <button class="work-card" type="button" style="--accent: ${escapeHtml(work.accent)}" data-index="${index}">
          <div class="work-topline">
            <span class="work-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="work-date">${escapeHtml(work.date)}</span>
          </div>
          <div class="work-tags">${tagMarkup(work.tags)}</div>
          <h3>${escapeHtml(work.title)}</h3>
          <p>${escapeHtml(work.description)}</p>
          <div class="work-role">${escapeHtml(work.role)}</div>
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
            <span class="timeline-date">${escapeHtml(event.date)}</span>
            <span class="timeline-type">${escapeHtml(event.type)}</span>
          </div>
          <h3>${escapeHtml(event.title)}</h3>
          <p>${escapeHtml(event.note)}</p>
        </article>
      `
    )
    .join("");
}

function openPreview(work) {
  previewTitle.textContent = work.title;
  previewKicker.textContent = work.date;
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
  previewDock.classList.remove("open");
  previewDock.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  previewFrame.removeAttribute("src");
}

function bindInteractions() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderWorks(button.dataset.filter);
    });
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
      <h3>作品数据加载失败</h3>
      <p>${escapeHtml(error.message)}</p>
      <div class="work-role">请检查 /data/portfolio.json 是否存在且 JSON 格式正确。</div>
    </article>
  `;
}

async function init() {
  bindInteractions();

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
