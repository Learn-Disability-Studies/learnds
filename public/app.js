const SITE = {
  name: "LearnDS",
  fullName: "Learn Disability Studies",
  repoUrl: "https://github.com/cqw-acq/learnds",
  contact: "hangzhi.bao@icloud.com"
};

const state = {
  entries: [],
  sort: "learning",
  query: "",
  route: parseRoute(),
  loaded: false,
  error: ""
};

window.addEventListener("hashchange", () => {
  state.route = parseRoute();
  render();
});

loadContent();
render();

async function loadContent() {
  try {
    const manifest = await fetchJson("./content/manifest.json");
    const entries = await Promise.all(
      manifest.map(async (item) => {
        const markdown = await fetchText(`./content/${item.slug}.md`);
        return { ...item, ...parseMarkdown(markdown) };
      })
    );
    state.entries = entries;
    state.loaded = true;
  } catch (error) {
    state.error = error instanceof Error ? error.message : String(error);
  }
  render();
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Failed to load ${url}`);
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Failed to load ${url}`);
  return response.text();
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash) return { page: "home" };
  const [page, slug] = hash.split("/");
  if (page === "entry" && slug) return { page: "entry", slug };
  return { page: "home" };
}

function parseMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const title = (lines.find((line) => line.startsWith("# ")) || "# Untitled").replace(/^# /, "").trim();
  const sections = {};
  let current = "summary";
  let buffer = [];

  for (const line of lines.slice(1)) {
    if (line.startsWith("## ")) {
      sections[current] = cleanParagraph(buffer);
      current = sectionKey(line.replace(/^## /, "").trim());
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  sections[current] = cleanParagraph(buffer);

  return {
    title,
    summary: sections.summary || "",
    goodToKnow: sections.goodToKnow || "",
    explanation: sections.explanation || "",
    clarification: sections.clarification || "",
    application: sections.application || "",
    livedExperience: sections.livedExperience || ""
  };
}

function cleanParagraph(lines) {
  return lines.join("\n").trim().replace(/\n{2,}/g, "\n\n");
}

function sectionKey(title) {
  return {
    "Good to Know": "goodToKnow",
    Explanation: "explanation",
    Clarification: "clarification",
    Application: "application",
    "Lived Experience": "livedExperience"
  }[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function entryBySlug(slug) {
  return state.entries.find((entry) => entry.slug === slug) || state.entries[0];
}

function visibleEntries() {
  const q = state.query.trim().toLowerCase();
  const sorted = [...state.entries].sort((a, b) => {
    if (state.sort === "az") return a.title.localeCompare(b.title);
    return a.order - b.order;
  });
  if (!q) return sorted;
  return sorted.filter((entry) =>
    [entry.title, entry.category, entry.summary, entry.goodToKnow].join(" ").toLowerCase().includes(q)
  );
}

function render() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#/">
        <span class="brand-mark">LDS</span>
        <span><strong>${SITE.name}</strong><small>${SITE.fullName}</small></span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#/" class="${state.route.page === "home" ? "active" : ""}">Catalogue</a>
        <a href="${SITE.repoUrl}" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </header>
    ${renderBody()}
  `;

  bindEvents();
}

function renderBody() {
  if (state.error) {
    return `<main class="catalogue-page"><h1>LearnDS</h1><p class="lead">Content failed to load: ${escapeHtml(state.error)}</p></main>`;
  }
  if (!state.loaded) {
    return `<main class="catalogue-page"><h1>LearnDS</h1><p class="lead">Loading content...</p></main>`;
  }
  if (state.route.page === "entry") {
    return renderEntry(entryBySlug(state.route.slug));
  }
  return renderHome();
}

function renderHome() {
  return `
    <main>
      <section class="hero">
        <div class="hero-copy">
          <h1>Learn Disability Studies</h1>
          <p><strong>Our Website:</strong> LearnDS contains a collection of accessible introductions to the social model and disability studies. No jargon, no complex logic, no difficult navigation. Zero prior experience required.</p>
          <p><strong>Our mission:</strong> LearnDS aims to promote the social model by removing the academic barrier to disability studies. We believe that knowledge shapes attitudes, and attitudes shape environments.</p>
          <p><strong>Our team:</strong> LearnDS is currently maintained by Jerry and Hank. As non-disabled allies, we strive to prioritize lived experiences in our work.</p>
          <p><a href="mailto:${SITE.contact}">If you are interested in contributing, please contact ${SITE.contact}.</a></p>
        </div>
        <div class="hero-media" aria-label="Selected disability studies readings">
          <div class="book-cover black">The Politics of Disablement<span>Michael Oliver</span></div>
          <div class="book-cover yellow">Understanding Disability<span>From Theory to Practice</span></div>
          <div class="book-cover dark">The Disability Studies Reader<span>Critical essays</span></div>
          <div class="book-cover red">Nothing About Us Without Us<span>James I. Charlton</span></div>
        </div>
      </section>

      <section class="catalogue-page" aria-labelledby="catalogue-title">
        <div class="section-bar">
          <div>
            <p class="eyebrow">Catalogue</p>
            <h2 id="catalogue-title">Start with a concept</h2>
          </div>
          <div class="controls">
            <label class="search">Search <input id="search" value="${escapeHtml(state.query)}" placeholder="Search entries" /></label>
            <div class="segmented" aria-label="Sort entries">
              <button data-sort="learning" class="${state.sort === "learning" ? "active" : ""}">Learning order</button>
              <button data-sort="az" class="${state.sort === "az" ? "active" : ""}">A-Z</button>
            </div>
          </div>
        </div>
        <div class="notion-list">
          ${visibleEntries().map(renderEntryRow).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderEntryRow(entry) {
  return `
    <a class="entry-row" href="#/entry/${entry.slug}">
      <span class="row-title">${escapeHtml(entry.title)}</span>
      <span class="row-category">${escapeHtml(entry.category)}</span>
      <span class="row-summary">${escapeHtml(entry.summary)}</span>
      <span class="row-arrow">→</span>
    </a>
  `;
}

function renderEntry(entry) {
  return `
    <main class="entry-page">
      <aside class="entry-sidebar">
        <a class="back-link" href="#/">← Catalogue</a>
        <h2>Contents</h2>
        <a href="#good-to-know">Good to Know</a>
        <a href="#explanation">Explanation</a>
        <a href="#clarification">Clarification</a>
        <a href="#application">Application</a>
        <a href="#lived-experience">Lived Experience</a>
      </aside>
      <article class="entry-article">
        <div class="entry-kicker">${escapeHtml(entry.category)} concept</div>
        <h1>${escapeHtml(entry.title)}</h1>
        <p class="lead">${escapeHtml(entry.summary)}</p>
        <div class="entry-actions">
          <a class="button primary" href="${editUrl(entry.slug)}" target="_blank" rel="noreferrer">Edit this page on GitHub</a>
          <a class="button" href="#/">Back to catalogue</a>
        </div>

        ${section("good-to-know", "Good to Know", entry.goodToKnow)}
        <section id="check-next" class="content-section next-section">
          <h2>Check out next</h2>
          <div class="next-grid">
            ${entry.next.map((slug) => {
              const item = entryBySlug(slug);
              return `<a href="#/entry/${item.slug}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.summary)}</span></a>`;
            }).join("")}
          </div>
        </section>
        ${section("explanation", "Explanation", entry.explanation)}
        ${section("clarification", "Clarification", entry.clarification)}
        ${section("application", "Application", entry.application)}
        ${section("lived-experience", "Lived Experience", entry.livedExperience)}
      </article>
    </main>
  `;
}

function section(id, title, text) {
  return `<section id="${id}" class="content-section"><h2>${title}</h2><p>${escapeHtml(text)}</p></section>`;
}

function editUrl(slug) {
  return `${SITE.repoUrl}/edit/main/public/content/${slug}.md`;
}

function bindEvents() {
  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sort = button.dataset.sort;
      render();
    });
  });

  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", (event) => {
      state.query = event.target.value;
      render();
      const nextSearch = document.getElementById("search");
      if (nextSearch) {
        nextSearch.focus();
        nextSearch.setSelectionRange(nextSearch.value.length, nextSearch.value.length);
      }
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
