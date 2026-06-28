const SITE = {
  name: "LearnDS",
  fullName: "Learn Disability Studies",
  repoUrl: "https://github.com/Learn-Disability-Studies/learnds",
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

window.addEventListener("resize", () => {
  syncHeroMediaHeight();
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
  const title = normalizeTitle(
    (lines.find((line) => line.startsWith("# ")) || "# Untitled").replace(/^# /, "").trim()
  );
  const sections = {};
  let current = "summary";
  let buffer = [];
  let goodToKnow = "";
  let checkOutNext = "";

  for (const line of lines.slice(1)) {
    if (line.startsWith("## ")) {
      sections[current] = cleanParagraph(buffer);
      current = sectionKey(line.replace(/^## /, "").trim());
      buffer = [];
    } else if (current === "summary" && /^Good to know:/i.test(line)) {
      goodToKnow = line.replace(/^Good to know:\s*/i, "").trim();
    } else if (current === "summary" && /^Check out next:/i.test(line)) {
      checkOutNext = line.replace(/^Check out next:\s*/i, "").trim();
    } else {
      buffer.push(line);
    }
  }
  sections[current] = cleanParagraph(buffer);

  return {
    title,
    goodToKnow,
    checkOutNext,
    explanation: sections.explanation || "",
    clarification: sections.clarification || "",
    application: sections.application || "",
    livedExperience: sections.livedExperience || "",
    extension: sections.extension || ""
  };
}

function normalizeTitle(title) {
  return title.replace(/\s+/g, " ").trim();
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
    "Lived Experience": "livedExperience",
    Extension: "extension"
  }[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function entryBySlug(slug) {
  return state.entries.find((entry) => entry.slug === slug) || state.entries[0];
}

function slugByTitle(title) {
  const normalized = normalizeConceptName(title);
  const aliases = {
    "temporarily able bodied tab": "temporary-able-bodied-tab",
    "temporary able bodied tab": "temporary-able-bodied-tab"
  };
  if (aliases[normalized]) return aliases[normalized];
  const match = state.entries.find((entry) => normalizeConceptName(entry.title) === normalized);
  return match ? match.slug : "";
}

function normalizeConceptName(value) {
  return String(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

function visibleEntries() {
  const q = state.query.trim().toLowerCase();
  const sorted = [...state.entries].sort((a, b) => {
    if (state.sort === "az") return a.title.localeCompare(b.title);
    return a.order - b.order;
  });
  if (!q) return sorted;
  return sorted.filter((entry) =>
    [entry.title, entry.category, entry.goodToKnow].join(" ").toLowerCase().includes(q)
  );
}

function render() {
  const root = document.getElementById("root");
  if (!root) return;
  const isHome = state.route.page === "home";

  root.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#/">
        <span class="brand-mark">LDS</span>
        <span><strong>${SITE.name}</strong><small>${SITE.fullName}</small></span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#/" ${isHome ? 'data-home-index="true"' : ""}>Index</a>
        <a href="${SITE.repoUrl}" target="_blank" rel="noreferrer">${isHome ? "Contribute on GitHub" : "Edit on GitHub"}</a>
      </nav>
    </header>
    ${renderBody()}
  `;

  if (window.lucide) window.lucide.createIcons();
  bindEvents();
  syncHeroMediaHeight();
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
          <p class="contact-line">If you are interested in contributing, please contact <a href="mailto:${SITE.contact}">${SITE.contact}</a>.</p>
        </div>
        <div class="hero-media hero-media-composite" aria-label="Selected disability studies readings">
          <img src="./assets/homepage-books-composite.jpg" alt="A collage of four disability studies books: The Politics of Disablement, Understanding Disability, The Disability Studies Reader, and Nothing About Us Without Us" />
        </div>
      </section>

      <section id="site-index" class="catalogue-page" aria-labelledby="catalogue-title">
        <div class="section-bar">
          <div>
            <p class="eyebrow">Index</p>
            <h2 id="catalogue-title">Start with a concept</h2>
          </div>
          <div class="controls">
            <label class="search" aria-label="Search entries"><i data-lucide="search" aria-hidden="true"></i><input id="search" value="${escapeHtml(state.query)}" placeholder="Search Entries" /></label>
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
      <span class="row-category ${categoryClass(entry.category)}">${escapeHtml(entry.category)}</span>
      <span class="row-arrow">→</span>
    </a>
  `;
}

function renderEntry(entry) {
  return `
    <main class="entry-page">
      <aside class="entry-sidebar">
        <a class="back-link" href="#/">← Index</a>
        <h2>Contents</h2>
        <a href="#/entry/${entry.slug}" data-scroll-target="good-to-know">Good to Know</a>
        <a href="#/entry/${entry.slug}" data-scroll-target="check-next">Check out next</a>
        <a href="#/entry/${entry.slug}" data-scroll-target="explanation">Explanation</a>
        <a href="#/entry/${entry.slug}" data-scroll-target="clarification">Clarification</a>
        <a href="#/entry/${entry.slug}" data-scroll-target="application">Application</a>
        <a href="#/entry/${entry.slug}" data-scroll-target="lived-experience">Lived Experience</a>
        <a href="#/entry/${entry.slug}" data-scroll-target="extension">Extension</a>
      </aside>
      <article class="entry-article">
        <div class="entry-kicker ${categoryClass(entry.category)}">${escapeHtml(entry.category)} concept</div>
        <h1>${escapeHtml(entry.title)}</h1>
        <div class="entry-actions">
          <a class="button primary" href="${editUrl(entry.slug)}" target="_blank" rel="noreferrer">Edit on GitHub</a>
          <a class="button" href="#/">Back to Index</a>
        </div>

        <section id="good-to-know" class="content-section">
          <h2>Good to Know</h2>
          ${renderConceptLinks(entry.goodToKnow)}
        </section>
        <section id="check-next" class="content-section next-section">
          <h2>Check out next</h2>
          ${renderNextLinks(entry)}
        </section>
        ${section("explanation", "Explanation", entry.explanation)}
        ${section("clarification", "Clarification", entry.clarification)}
        ${section("application", "Application", entry.application)}
        ${section("lived-experience", "Lived Experience", entry.livedExperience)}
        ${section("extension", "Extension", entry.extension)}
      </article>
    </main>
  `;
}

function categoryClass(category) {
  return `category-${String(category).toLowerCase()}`;
}

function section(id, title, text) {
  const body = text.trim() ? `<div class="markdown">${renderMarkdown(text)}</div>` : `<p class="muted">To be added.</p>`;
  return `<section id="${id}" class="content-section"><h2>${title}</h2>${body}</section>`;
}

function renderConceptLinks(text) {
  if (!text || /^none$/i.test(text.trim())) return `<p class="muted">None</p>`;
  const concepts = text.split(/[\/;,]+/).map((item) => item.trim()).filter(Boolean);
  return `
    <div class="concept-links">
      ${concepts.map((concept) => {
        const slug = slugByTitle(concept);
        if (!slug) return `<span>${escapeHtml(concept)}</span>`;
        return `<a href="#/entry/${slug}">${escapeHtml(normalizeTitle(concept))}</a>`;
      }).join("")}
    </div>
  `;
}

function renderNextLinks(entry) {
  return `
    <div class="concept-links">
      ${entry.next.map((slug) => {
        const item = entryBySlug(slug);
        return `<a href="#/entry/${item.slug}">${escapeHtml(item.title)}</a>`;
      }).join("")}
    </div>
  `;
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (line === "<aside>") {
      const calloutLines = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== "</aside>") {
        calloutLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length && lines[i].trim() === "</aside>") i += 1;
      html += renderCallout(calloutLines);
      continue;
    }

    if (/^---+$/.test(line)) {
      html += `<hr />`;
      i += 1;
      continue;
    }

    if (/^#{3,4}\s+/.test(line)) {
      const level = line.startsWith("#### ") ? 4 : 3;
      html += `<h${level}>${inlineMarkdown(line.replace(/^#{3,4}\s+/, ""))}</h${level}>`;
      i += 1;
      continue;
    }

    if (isTableLine(line)) {
      const tableLines = [];
      while (i < lines.length && isTableLine(lines[i].trim())) {
        tableLines.push(lines[i].trim());
        i += 1;
      }
      html += renderTable(tableLines);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      html += `<blockquote>${quote.map(inlineMarkdown).join("<br />")}</blockquote>`;
      continue;
    }

    if (isListLine(raw)) {
      const listLines = [];
      while (i < lines.length && isListLine(lines[i])) {
        listLines.push(lines[i]);
        i += 1;
      }
      html += renderStructuredList(listLines);
      continue;
    }

    const comparison = readComparison(lines, i);
    if (comparison) {
      html += renderComparison(comparison.cards);
      i = comparison.nextIndex;
      continue;
    }

    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !startsMarkdownBlock(lines[i])) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    html += `<p>${inlineMarkdown(paragraph.join(" "))}</p>`;
  }

  return html;
}

function startsMarkdownBlock(value) {
  const line = value.trim();
  return line === "<aside>" ||
    line === "</aside>" ||
    /^---+$/.test(line) ||
    /^#{3,4}\s+/.test(line) ||
    /^>\s?/.test(line) ||
    isTableLine(line) ||
    isListLine(value) ||
    isComparisonHeading(line);
}

function isTableLine(line) {
  return line.startsWith("|") && line.endsWith("|");
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  if (!rows.length) return "";
  const [head, ...body] = rows;
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function isListLine(value) {
  return /^\s*(?:[-*]|\d+\.)\s+/.test(value);
}

function renderStructuredList(lines) {
  return `
    <div class="structured-list">
      ${lines.map((line) => {
        const match = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (!match) return "";
        const level = Math.min(Math.floor(match[1].length / 4), 4);
        const marker = /^\d+\./.test(match[2]) ? match[2] : "•";
        return `<div class="structured-list-item" style="--level: ${level}"><span class="list-marker">${marker}</span><span>${inlineMarkdown(match[3])}</span></div>`;
      }).join("")}
    </div>
  `;
}

function renderCallout(lines) {
  const trimmed = [...lines];
  while (trimmed.length && !trimmed[0].trim()) trimmed.shift();
  while (trimmed.length && !trimmed[trimmed.length - 1].trim()) trimmed.pop();

  const icon = trimmed.length && isCalloutIcon(trimmed[0]) ? trimmed.shift().trim() : "";
  while (trimmed.length && !trimmed[0].trim()) trimmed.shift();

  return `
    <div class="callout${icon ? "" : " callout-no-icon"}">
      ${icon ? `<span class="callout-icon" aria-hidden="true">${escapeHtml(icon)}</span>` : ""}
      <div class="callout-body">${trimmed.length ? renderMarkdown(trimmed.join("\n")) : ""}</div>
    </div>
  `;
}

function isCalloutIcon(line) {
  const value = line.trim();
  return value.length > 0 && value.length <= 6 && !/[A-Za-z]{2,}/.test(value) && !/\s/.test(value);
}

function isComparisonHeading(line) {
  return /^\*\*[^*]+\*\*$/.test(line.trim());
}

function readComparison(lines, startIndex) {
  let index = startIndex;
  const cards = [];

  while (index < lines.length) {
    while (index < lines.length && !lines[index].trim()) index += 1;

    const headingMatch = lines[index]?.trim().match(/^\*\*([^*]+)\*\*$/);
    if (!headingMatch) break;

    index += 1;
    while (index < lines.length && !lines[index].trim()) index += 1;

    const items = [];
    while (index < lines.length && isListLine(lines[index])) {
      items.push(lines[index].replace(/^\s*(?:[-*]|\d+\.)\s+/, "").trim());
      index += 1;
    }

    if (!items.length) return null;
    cards.push({ title: headingMatch[1], items });

    while (index < lines.length && !lines[index].trim()) index += 1;
  }

  return cards.length >= 2 ? { cards, nextIndex: index } : null;
}

function renderComparison(cards) {
  return `
    <div class="comparison-grid">
      ${cards.map((card, index) => `
        <section class="comparison-card comparison-card-${index + 1}">
          <h3>${inlineMarkdown(card.title)}</h3>
          <ul>
            ${card.items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}
          </ul>
        </section>
      `).join("")}
    </div>
  `;
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/&lt;br\s*\/?&gt;/gi, "<br />")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
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

  const homeIndex = document.querySelector("[data-home-index]");
  if (homeIndex) {
    homeIndex.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.getElementById("site-index");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#/");
    });
  }

  document.querySelectorAll("[data-scroll-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.getElementById(link.dataset.scrollTarget);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#/entry/${state.route.slug}`);
    });
  });
}

function syncHeroMediaHeight() {
  const schedule = window.requestAnimationFrame || ((callback) => setTimeout(callback, 0));
  schedule(() => {
    const copy = document.querySelector(".hero-copy");
    const media = document.querySelector(".hero-media-composite");
    if (!copy || !media) return;
    if (window.matchMedia && window.matchMedia("(max-width: 1000px)").matches) {
      media.style.removeProperty("--hero-copy-height");
      return;
    }
    media.style.setProperty("--hero-copy-height", `${Math.round(copy.getBoundingClientRect().height)}px`);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

