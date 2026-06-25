const SITE = {
  name: "LearnDS",
  fullName: "Learn Disability Studies",
  repoUrl: "https://github.com/learn-ds/learnds",
  contact: "hangzhi.bao@icloud.com"
};

const entries = [
  {
    slug: "social-model-of-disability",
    title: "Social Model of Disability",
    category: "Core",
    order: 1,
    summary:
      "The social model understands disability as a form of exclusion produced by social barriers, institutional design, and cultural attitudes, rather than as a problem located only in an individual body or mind.",
    goodToKnow:
      "Start with the distinction between impairment and disability: impairment refers to bodily or mental difference; disability refers to the restrictions created when society fails to account for those differences.",
    explanation:
      "The model does not deny pain, illness, or personal experience. It shifts the political question: instead of asking how disabled people can fit into existing systems, it asks how buildings, policies, media, work, education, and everyday assumptions disable people.",
    clarification:
      "The social model is often contrasted with the medical or individual model. Medical care can be valuable, but medical logic becomes harmful when it treats social exclusion as a private defect.",
    application:
      "When designing a class, event, website, or service, ask what barriers the system creates and how those barriers can be removed before participation depends on individual negotiation.",
    livedExperience:
      "A wheelchair user being unable to enter a classroom is not only about mobility. It is also about stairs, broken lifts, inaccessible scheduling, and a system that treated access as optional.",
    next: ["medical-model", "barriers", "accessibility"],
    resources: [
      ["Foundational text", "UPIAS: Fundamental Principles of Disability", "https://disability-studies.leeds.ac.uk/wp-content/uploads/sites/40/library/UPIAS-fundamental-principles.pdf", "A key source for the early political framing of the social model."],
      ["Classic lecture", "Mike Oliver: The Individual and Social Models of Disability", "https://disability-studies.leeds.ac.uk/wp-content/uploads/sites/40/library/Oliver-in-soc-dis.pdf", "A concise explanation of the contrast between individual and social models."],
      ["Introductory reading", "Inclusion London: The Social Model of Disability", "https://www.inclusionlondon.org.uk/about-us/disability-in-london/social-model/the-social-model-of-disability-and-the-cultural-model-of-deafness/", "A practical introduction for new readers."]
    ]
  },
  {
    slug: "medical-model",
    title: "Medical / Individual Model",
    category: "Core",
    order: 2,
    summary:
      "The medical or individual model frames disability primarily as a defect, illness, or limitation within the person, with solutions focused on treatment, rehabilitation, correction, or individual adaptation.",
    goodToKnow:
      "The issue is not the existence of medicine. The issue is what happens when medical authority becomes the only lens for understanding disabled lives.",
    explanation:
      "Medical systems can provide pain management, assistive technology, surgery, therapy, and support. But when the medical model dominates public thinking, disabled people are often treated as problems to be fixed rather than citizens whose environments must change.",
    clarification:
      "The social model critiques the political use of medicalization. It does not require people to reject treatment, diagnosis, or personal accounts of pain and fatigue.",
    application:
      "Instead of asking only for proof of diagnosis before offering support, institutions can review whether their spaces, deadlines, platforms, and communication norms are exclusionary.",
    livedExperience:
      "A student who needs captions may be asked to prove hearing loss. A social model response also asks why recorded lectures were not captioned by default.",
    next: ["social-model-of-disability", "reasonable-accommodation", "ableism"],
    resources: [
      ["Chapter", "Implementing the Social Model of Disability", "https://disability-studies.leeds.ac.uk/wp-content/uploads/sites/40/library/Barnes-implementing-the-social-model-chapter-2.pdf", "Discusses how medicalized approaches shape policy and services."],
      ["Recent discussion", "Who needs the social model of disability?", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10733514/", "A contemporary discussion of the social model's uses and limits."]
    ]
  },
  {
    slug: "barriers",
    title: "Barriers",
    category: "Core",
    order: 3,
    summary:
      "Barriers are the physical, informational, institutional, economic, and attitudinal conditions that prevent disabled people from participating on equal terms.",
    goodToKnow:
      "Barriers are not only stairs. Missing captions, phone-only booking systems, complex documentation requirements, hostile attitudes, and inaccessible websites are all barriers.",
    explanation:
      "The barrier concept moves analysis away from what a person supposedly lacks and toward what the environment withholds.",
    clarification:
      "Barriers can be visible or invisible, intentional or accidental. A system can exclude people even when no individual actor intends discrimination.",
    application:
      "Audit a service through five actions: enter, understand, participate, respond, and leave. At each step, identify who is blocked and why.",
    livedExperience:
      "If a form button has no accessible label, a screen reader user may be unable to submit an application even though the page appears complete visually.",
    next: ["accessibility", "universal-design", "reasonable-accommodation"],
    resources: [
      ["Human rights", "UN CRPD Article 9: Accessibility", "https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-persons-disabilities", "Frames accessibility as a condition of equal participation."],
      ["Education", "Disability Equality Education: Social Model", "https://www.disabilityequalityeducation.org/social-model", "Explains barriers through accessible examples."]
    ]
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    category: "Core",
    order: 4,
    summary:
      "Accessibility means that environments, services, information, technologies, and events can be entered, understood, and used by people with diverse bodies, senses, cognition, and communication styles.",
    goodToKnow:
      "Accessibility is not a bonus feature. It is a precondition for equal participation and should be planned, budgeted, and tested from the beginning.",
    explanation:
      "Accessibility turns abstract rights into concrete conditions: captions, alt text, ramps, clear language, keyboard navigation, quiet spaces, flexible timing, and compatibility with assistive technologies.",
    clarification:
      "A page being technically open does not mean it is accessible. People must be able to understand it, operate it, complete tasks, and report problems.",
    application:
      "For educational content, provide structured headings, transcripts, image descriptions, keyboard access, readable contrast, and flexible formats.",
    livedExperience:
      "A person with chronic fatigue may need asynchronous participation. A blind reader may need meaningful headings and links rather than visual layout alone.",
    next: ["universal-design", "reasonable-accommodation", "collective-access"],
    resources: [
      ["Standard", "W3C Web Accessibility Initiative", "https://www.w3.org/WAI/", "Guidance and standards for accessible web practice."],
      ["Human rights", "UN Convention on the Rights of Persons with Disabilities", "https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-persons-disabilities", "A rights-based framework for accessibility."]
    ]
  },
  {
    slug: "reasonable-accommodation",
    title: "Reasonable Accommodation",
    category: "Core",
    order: 5,
    summary:
      "Reasonable accommodation means necessary and appropriate modifications in a specific situation so a disabled person can enjoy rights and opportunities on an equal basis with others.",
    goodToKnow:
      "Reasonable accommodation is individualized. It complements universal design; it does not replace it.",
    explanation:
      "Examples include extra exam time, remote attendance, adjusted workstations, sign language interpretation, flexible scheduling, or alternative formats.",
    clarification:
      "Reasonableness should not be defined by institutional convenience alone. It requires a good-faith assessment of burden, resources, alternatives, and the impact of denial.",
    application:
      "A good process asks what is needed, discusses options, records decisions, and allows review without demanding unnecessary private medical detail.",
    livedExperience:
      "A worker with a psychosocial disability may need flexible start times. This is not special treatment; it may be the condition that makes equal work possible.",
    next: ["universal-design", "accessibility", "crpd"],
    resources: [
      ["Definition", "UN CRPD Article 2: Definitions", "https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities/article-2-definitions.html", "The formal CRPD definition."],
      ["Guidance", "UN Reasonable Accommodation Guidelines", "https://policy.un.org/sites/default/files/2023-12/reasonable_accommodations_guidelines_english.pdf", "Operational guidance for accommodation processes."]
    ]
  },
  {
    slug: "universal-design",
    title: "Universal Design",
    category: "Extended",
    order: 6,
    summary:
      "Universal design aims to make products, environments, programs, and services usable by as many people as possible without requiring later adaptation or separate routes.",
    goodToKnow:
      "Universal design does not mean one solution fits everyone. It means designing with human variation as a starting condition.",
    explanation:
      "Ramps, captions, clear navigation, adjustable text, pause controls, and flexible workflows often benefit many people, not only those who identify as disabled.",
    clarification:
      "Universal design cannot anticipate every need. Individual accommodation and ongoing feedback remain necessary.",
    application:
      "A course website can support keyboard access, captions, downloadable transcripts, mobile reading, and clear navigation from the first version.",
    livedExperience:
      "People with temporary injuries, parents with strollers, and non-native speakers may all benefit from design choices first demanded by disabled users.",
    next: ["reasonable-accommodation", "collective-access", "accessibility"],
    resources: [
      ["Definition", "UN CRPD Article 2: Universal Design", "https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities/article-2-definitions.html", "The CRPD definition of universal design."],
      ["Practice", "Universal Design Ireland", "https://universaldesign.ie/", "Resources for applying universal design."]
    ]
  },
  {
    slug: "ableism",
    title: "Ableism",
    category: "Extended",
    order: 7,
    summary:
      "Ableism is a system of values and practices that treats certain bodies, minds, senses, speeds, and forms of productivity as normal, superior, or more worthy.",
    goodToKnow:
      "Ableism appears in insults and direct discrimination, but also in ordinary phrases like 'you do not look disabled' or 'just try harder.'",
    explanation:
      "Ableism makes independence, speed, constant availability, stable output, and self-management appear natural rather than culturally and economically produced.",
    clarification:
      "Critiquing ableism is not a rejection of health. It is a rejection of measuring human value by narrow standards of ability and productivity.",
    application:
      "Job descriptions can avoid unnecessary requirements such as constant high-pressure availability or physical tasks that are not actually essential.",
    livedExperience:
      "A chronically ill person may be treated as unreliable. A person with a psychosocial disability may be expected to hide symptoms to appear professional.",
    next: ["disability-justice", "access-intimacy", "social-model-of-disability"],
    resources: [
      ["Explanation", "APA: Understanding ableism", "https://www.apa.org/ed/precollege/psychology-teacher-network/introductory-psychology/ableism-negative-reactions-disability", "An educational explanation of ableist assumptions."],
      ["Intro", "Center for Disability Rights: Ableism", "https://cdrnys.org/blog/uncategorized/ableism/", "A short discussion of ableism in culture and institutions."]
    ]
  },
  {
    slug: "disability-justice",
    title: "Disability Justice",
    category: "Extended",
    order: 8,
    summary:
      "Disability justice is a framework developed from the experiences of disabled people of color, queer and trans disabled people, poor disabled people, immigrants, and others living at multiple margins.",
    goodToKnow:
      "Disability justice does not simply replace disability rights. It asks whose access, leadership, safety, and survival are left out by rights-only frameworks.",
    explanation:
      "Sins Invalid identifies principles including intersectionality, leadership of the most impacted, cross-movement organizing, wholeness, sustainability, and collective access.",
    clarification:
      "The framework focuses on who is heard inside movements, who performs access labor, and which disabled people are considered acceptable or visible.",
    application:
      "Budgets for interpretation, rest, care, transport, remote participation, and compensation are political commitments, not administrative extras.",
    livedExperience:
      "A poor queer disabled person may face barriers involving healthcare discrimination, housing insecurity, policing, family rejection, and inaccessible public systems at once.",
    next: ["collective-access", "access-intimacy", "ableism"],
    resources: [
      ["Principles", "Sins Invalid: 10 Principles of Disability Justice", "https://sinsinvalid.org/10-principles-of-disability-justice/", "A core source for disability justice principles."],
      ["Article", "WID: Moving From Disability Rights to Disability Justice", "https://wid.org/moving-from-disability-rights-to-disability-justice/", "Explains the relationship between rights and justice frameworks."]
    ]
  },
  {
    slug: "collective-access",
    title: "Collective Access",
    category: "Extended",
    order: 9,
    summary:
      "Collective access treats accessibility as a shared relationship and responsibility rather than only a compliance checklist or individual request.",
    goodToKnow:
      "It asks participants to share needs, respect boundaries, adjust pace, and distribute access labor across a group.",
    explanation:
      "Meeting time, language, breaks, online participation, food, scent, sound, emotional load, and documentation can all become access questions.",
    clarification:
      "Collective access is not a demand that everyone satisfy every need perfectly. It is a practice of negotiation, transparency, and shared problem-solving.",
    application:
      "Registration forms can ask about access needs, organizers can publish venue information in advance, and budgets can include interpretation, captioning, transport, and care support.",
    livedExperience:
      "Some people need cameras off, some need breaks, some need live notes. Collective access makes these needs part of ordinary collaboration.",
    next: ["disability-justice", "access-intimacy", "accessibility"],
    resources: [
      ["Principle", "Sins Invalid: Collective Access", "https://sinsinvalid.org/10-principles-of-disability-justice/", "Collective access as a disability justice principle."],
      ["Plain language", "Plain Language Disability Justice Principles", "https://arcminnesota.org/wp-content/uploads/2021/09/Plain-Language-Disability-Justice-Principles.pdf", "A more accessible version for study groups."]
    ]
  },
  {
    slug: "access-intimacy",
    title: "Access Intimacy",
    category: "Extended",
    order: 10,
    summary:
      "Access intimacy describes the ease, trust, and recognition that can emerge when someone understands and respects your access needs without making them a burden.",
    goodToKnow:
      "The concept comes from Mia Mingus and emphasizes that access is not only a checklist. It is also a quality of relationship.",
    explanation:
      "Access intimacy can happen in friendship, organizing, work, or brief encounters when people respond to access needs with respect rather than pity, control, or resentment.",
    clarification:
      "Access intimacy is not forced intimacy. It respects agency and boundaries instead of requiring disabled people to over-explain, disclose, or accept unwanted help.",
    application:
      "Saying 'I checked the entrance, lift, and quiet area; what else would help?' can be more respectful than asking for private medical details at the last minute.",
    livedExperience:
      "When a team routinely provides written notes, flexible pacing, and no-pressure participation, a disabled person may spend less energy defending basic access needs.",
    next: ["collective-access", "disability-justice", "ableism"],
    resources: [
      ["Essay", "Mia Mingus: Access Intimacy, Interdependence and Disability Justice", "https://leavingevidence.wordpress.com/2017/04/12/access-intimacy-interdependence-and-disability-justice/", "Mingus on access intimacy and interdependence."],
      ["Essay", "Access Intimacy: The Missing Link", "https://leavingevidence.wordpress.com/2011/05/05/access-intimacy-the-missing-link/", "An important early articulation of the concept."]
    ]
  },
  {
    slug: "crpd",
    title: "Convention on the Rights of Persons with Disabilities",
    category: "Extended",
    order: 11,
    summary:
      "The CRPD is a United Nations human rights treaty that positions disabled people as rights-bearing subjects rather than objects of charity, medicine, or protection.",
    goodToKnow:
      "The treaty reflects a shift from charity and medical approaches toward dignity, autonomy, accessibility, non-discrimination, and participation.",
    explanation:
      "It covers equality, accessibility, independent living, education, work, political participation, cultural life, legal capacity, and freedom from discrimination.",
    clarification:
      "The CRPD is not identical to the social model, but it shares a focus on social barriers and state responsibility.",
    application:
      "A disability studies project can use the CRPD to connect topics such as education, work, independent living, accessibility, and discrimination to human rights obligations.",
    livedExperience:
      "When someone asks for sign language interpretation, accessible transport, or information in an accessible format, they are asserting conditions for equal participation.",
    next: ["reasonable-accommodation", "accessibility", "social-model-of-disability"],
    resources: [
      ["Treaty", "OHCHR: Convention on the Rights of Persons with Disabilities", "https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-persons-disabilities", "Full treaty text and official materials."],
      ["Overview", "UN DESA: CRPD", "https://social.desa.un.org/issues/disability/crpd/convention-on-the-rights-of-persons-with-disabilities-crpd", "Explains the treaty's shift in approach."]
    ]
  }
];

let state = {
  sort: "learning",
  query: "",
  route: parseRoute()
};

window.addEventListener("hashchange", () => {
  state.route = parseRoute();
  render();
});

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash) return { page: "home" };
  const [page, slug] = hash.split("/");
  if (page === "entry" && slug) return { page: "entry", slug };
  return { page: "home" };
}

function entryBySlug(slug) {
  return entries.find((entry) => entry.slug === slug) || entries[0];
}

function visibleEntries() {
  const q = state.query.trim().toLowerCase();
  const sorted = [...entries].sort((a, b) =>
    state.sort === "az" ? a.title.localeCompare(b.title) : a.order - b.order
  );
  if (!q) return sorted;
  return sorted.filter((entry) =>
    [entry.title, entry.category, entry.summary, entry.goodToKnow].join(" ").toLowerCase().includes(q)
  );
}

function icon(name, size = 18) {
  return `<i data-lucide="${name}" width="${size}" height="${size}" aria-hidden="true"></i>`;
}

function render() {
  const root = document.getElementById("root");
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
    ${state.route.page === "entry" ? renderEntry(entryBySlug(state.route.slug)) : renderHome()}
  `;
  bindEvents();
  if (window.lucide) window.lucide.createIcons();
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
        <figure class="hero-media">
          <img src="./assets/learnds-reference.png" alt="Reference layout showing Learn Disability Studies text beside disability studies book covers." />
        </figure>
      </section>

      <section class="catalogue-page" aria-labelledby="catalogue-title">
        <div class="section-bar">
          <div>
            <p class="eyebrow">Catalogue</p>
            <h2 id="catalogue-title">Start with a concept</h2>
          </div>
          <div class="controls">
            <label class="search">${icon("search")}<input id="search" value="${escapeHtml(state.query)}" placeholder="Search entries" /></label>
            <div class="segmented" aria-label="Sort entries">
              <button data-sort="learning" class="${state.sort === "learning" ? "active" : ""}">${icon("list-ordered", 16)}Learning order</button>
              <button data-sort="az" class="${state.sort === "az" ? "active" : ""}">${icon("arrow-down-a-z", 16)}A-Z</button>
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
      <span class="row-title">${entry.title}</span>
      <span class="row-category">${entry.category}</span>
      <span class="row-summary">${entry.summary}</span>
      <span class="row-arrow">${icon("arrow-right", 17)}</span>
    </a>
  `;
}

function renderEntry(entry) {
  return `
    <main class="entry-page">
      <aside class="entry-sidebar">
        <a class="back-link" href="#/">${icon("arrow-left", 17)}Catalogue</a>
        <h2>Contents</h2>
        <a href="#good-to-know">Good to Know</a>
        <a href="#explanation">Explanation</a>
        <a href="#clarification">Clarification</a>
        <a href="#application">Application</a>
        <a href="#lived-experience">Lived Experience</a>
        <a href="#resources">Resources</a>
      </aside>
      <article class="entry-article">
        <div class="entry-kicker">${entry.category} concept</div>
        <h1>${entry.title}</h1>
        <p class="lead">${entry.summary}</p>
        <div class="entry-actions">
          <a class="button primary" href="${editUrl(entry.slug)}" target="_blank" rel="noreferrer">${icon("github", 17)}Edit this page on GitHub</a>
          <a class="button" href="#/">${icon("book-open", 17)}Back to catalogue</a>
        </div>

        ${section("good-to-know", "Good to Know", entry.goodToKnow)}
        <section id="check-next" class="content-section next-section">
          <h2>Check out next</h2>
          <div class="next-grid">
            ${entry.next.map((slug) => {
              const item = entryBySlug(slug);
              return `<a href="#/entry/${item.slug}"><strong>${item.title}</strong><span>${item.summary}</span></a>`;
            }).join("")}
          </div>
        </section>
        ${section("explanation", "Explanation", entry.explanation)}
        ${section("clarification", "Clarification", entry.clarification)}
        ${section("application", "Application", entry.application)}
        ${section("lived-experience", "Lived Experience", entry.livedExperience)}

        <section id="resources" class="content-section">
          <h2>Resources</h2>
          <div class="resource-list">
            ${entry.resources.map(([kind, title, url, brief]) => `
              <a class="resource-card" href="${url}" target="_blank" rel="noreferrer">
                <span>${kind}</span>
                <strong>${title}</strong>
                <p>${brief}</p>
              </a>
            `).join("")}
          </div>
        </section>
      </article>
    </main>
  `;
}

function section(id, title, text) {
  return `<section id="${id}" class="content-section"><h2>${title}</h2><p>${text}</p></section>`;
}

function editUrl(slug) {
  return `${SITE.repoUrl}/edit/main/content/${slug}.md`;
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

render();
