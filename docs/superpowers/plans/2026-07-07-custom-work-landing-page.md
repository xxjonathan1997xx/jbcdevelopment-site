# Custom Work Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/custom-work.html`, a cold-traffic landing page pitching JBC's custom software/AI/automation service line, separate from the app-portfolio homepage, and update the homepage to link to it instead of duplicating the pitch inline.

**Architecture:** Static HTML page reusing `styles.css` and `script.js` unmodified except for two additive changes: new page-scoped CSS rules appended to `styles.css` under a `body.custom-work-page` class, and new EN/ES translation entries appended to the `translations.es` object in `script.js`. No build step, no new dependencies, no backend.

**Tech Stack:** Static HTML/CSS/JS (existing site stack). No frameworks, no build tools.

## Global Constraints

- No build step, no backend, no framework — static HTML/CSS/JS only (per `CLAUDE.md` and `jbc-site-standard` skill)
- Voice: trustworthy-and-blunt, no hype words, no unverifiable claims (per `jbc-site-standard` skill)
- No client case studies in this version — proof comes from process pitch + reused shipping-rigor trust badges (signed/notarized builds, SHA-256 checksums, live App Store app)
- Reuse existing design tokens/components (`--accent: #0b5fff`, DM Sans, `proof-badge`, `ship-step`, `custom-work-list`, `.button.primary`/`.button.secondary`) — no new tokens or components without explicit justification
- One eyebrow label maximum on the new page (per eyebrow-sprawl fix already applied site-wide)
- `text-wrap: balance` (headings) / `text-wrap: pretty` (paragraphs) already global in `styles.css` — inherited automatically, no action needed
- Book-a-call CTA ships as a stub: `href="#"` with `data-cta="book-call"` attribute — no real booking link yet
- Mailto CTA reuses the exact existing pattern: `mailto:support@jbcdevelopment.dev?subject=Custom%20project%20inquiry&body=Project%20summary%3A%0APlatform%3A%0ATimeline%3A%0ABudget%20range%3A`
- Contact email is always `support@jbcdevelopment.dev`

---

### Task 1: Scaffold `custom-work.html` with header, footer, and meta tags

**Files:**
- Create: `custom-work.html`
- Reference: `index.html:1-105` (head + header structure), `index.html:377-392` (footer structure)

**Interfaces:**
- Consumes: `/styles.css`, `/script.js`, `/assets/jbc-brand-mark.svg`, `/assets/favicon.svg`, `/assets/og-share.jpg` (all existing, unmodified)
- Produces: page shell other tasks fill in — a `<main id="main">` empty container between header and footer

- [ ] **Step 1: Create the file with head, header, empty main, and footer**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Custom Software, Mac Tools & AI Workflows | JBC Development</title>
    <meta
      name="description"
      content="JBC Development builds scoped custom software: iOS apps, Mac tools, automation, and AI workflows for small businesses — built and shipped by one person."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://jbcdevelopment.dev/custom-work.html" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://jbcdevelopment.dev/custom-work.html" />
    <meta property="og:title" content="Custom Software, Mac Tools & AI Workflows | JBC Development" />
    <meta
      property="og:description"
      content="JBC Development builds scoped custom software: iOS apps, Mac tools, automation, and AI workflows for small businesses — built and shipped by one person."
    />
    <meta property="og:image" content="https://jbcdevelopment.dev/assets/og-share.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://jbcdevelopment.dev/assets/og-share.jpg" />
    <meta name="theme-color" content="#0b5fff" />
    <link rel="alternate" hreflang="en" href="https://jbcdevelopment.dev/custom-work.html" />
    <link rel="alternate" hreflang="es" href="https://jbcdevelopment.dev/custom-work.html" />
    <link rel="alternate" hreflang="x-default" href="https://jbcdevelopment.dev/custom-work.html" />

    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,500&display=swap"
      rel="stylesheet"
    />
    <link rel="preload" href="/styles.css" as="style" />
    <link rel="stylesheet" href="/styles.css" />
    <script src="/script.js" defer></script>
  </head>
  <body class="custom-work-page">
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="site-header" data-site-header>
      <nav class="nav shell" aria-label="Primary navigation">
        <a class="brand" href="/" aria-label="JBC Software Development LLC home">
          <span class="brand-mark" aria-hidden="true">
            <img src="/assets/jbc-brand-mark.svg" alt="" width="44" height="44" />
          </span>
          <span class="brand-name">
            <strong>JBC Development</strong>
            <small>Software Development LLC</small>
          </span>
        </a>

        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links">
          <span class="nav-toggle-line"></span>
          <span class="nav-toggle-line"></span>
          <span class="nav-toggle-line"></span>
          <span class="sr-only">Toggle navigation</span>
        </button>

        <div class="nav-links" id="nav-links">
          <a href="/#ship">How we ship</a>
          <a href="/#apps">Apps</a>
          <a href="/custom-work.html">Custom work</a>
          <a href="/store.html">Store</a>
          <a href="/downloads.html">Downloads</a>
          <a href="/support.html">Support</a>
          <a href="/privacy.html">Privacy</a>
          <a href="/#contact">Contact</a>
          <div class="language-switcher" aria-label="Language selector">
            <button type="button" class="language-option" data-language-option="en" aria-pressed="true">EN</button>
            <button type="button" class="language-option" data-language-option="es" aria-pressed="false">ES</button>
          </div>
        </div>
      </nav>
    </header>

    <main id="main">
    </main>

    <footer class="site-footer">
      <div class="shell footer-inner">
        <p>&copy; 2026 JBC Software Development LLC. All rights reserved.</p>
        <div class="footer-links">
          <a href="/#apps">Apps</a>
          <a href="/custom-work.html">Custom work</a>
          <a href="/store.html">Store</a>
          <a href="/downloads.html">Downloads</a>
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/support.html">Support</a>
          <a href="/#contact">Contact</a>
          <a href="https://www.instagram.com/dadbuildrepeat/" target="_blank" rel="noopener noreferrer">DadBuildRepeat</a>
        </div>
      </div>
    </footer>
  </body>
</html>
```

Note: nav links that were same-page anchors on `index.html` (`#ship`, `#apps`, `#contact`) become `/#ship`, `/#apps`, `/#contact` here since this is a different page. The `Custom work` link points to this page itself (`/custom-work.html`) rather than an anchor.

- [ ] **Step 2: Serve locally and verify the shell loads**

```bash
cd /Users/jonathanbrito/Documents/jbcdevelopment-site
python3 -m http.server 8788
```

Open `http://127.0.0.1:8788/custom-work.html`. Expected: header renders with nav (matching homepage), empty white/light body where main content will go, footer renders with links. No console errors.

- [ ] **Step 3: Commit**

```bash
git add custom-work.html
git commit -m "feat: scaffold custom-work landing page shell"
```

---

### Task 2: Add page-scoped background CSS for `body.custom-work-page`

**Files:**
- Modify: `styles.css` (append near `body.home-page` rule, `styles.css:37-40`)

**Interfaces:**
- Consumes: existing `--bg` token, existing `body.home-page` pattern as reference
- Produces: `body.custom-work-page` background rule that later tasks' hero section relies on for its dark backdrop

- [ ] **Step 1: Add the rule**

Find this existing block in `styles.css`:

```css
body.home-page {
  background:
    radial-gradient(circle at 78% 8%, rgba(56, 189, 248, 0.3), transparent 27rem),
    radial-gradient(circle at 18% 18%, rgba(11, 95, 255, 0.28), transparent 30rem),
    linear-gradient(180deg, #05101d 0, #071a33 760px, #f7fbff 761px, #ffffff 100%);
}
```

Add immediately after it:

```css
body.custom-work-page {
  background:
    radial-gradient(circle at 78% 8%, rgba(56, 189, 248, 0.3), transparent 27rem),
    radial-gradient(circle at 18% 18%, rgba(11, 95, 255, 0.28), transparent 30rem),
    linear-gradient(180deg, #05101d 0, #071a33 520px, #f7fbff 521px, #ffffff 100%);
}
```

This mirrors `body.home-page`'s dark-to-light transition but at 520px instead of 760px, since this page's hero is shorter (no product-stack sidebar).

- [ ] **Step 2: Verify no visual regression on homepage**

Reload `http://127.0.0.1:8788/` (homepage). Expected: unchanged — this is a new, additive rule scoped to `.custom-work-page`, doesn't touch `.home-page`.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add background rule for custom-work page"
```

---

### Task 3: Build the hero section with dual CTA

**Files:**
- Modify: `custom-work.html` (fill `<main id="main">`)
- Reference: `index.html:107-134` (hero-copy structure), `styles.css:271-373` (`.hero`, `.hero-copy`, `.hero-eyebrow`, `.hero-actions`, `.hero-trust`), `styles.css:1949-1970` (`.button.primary`/`.button.secondary`)

**Interfaces:**
- Consumes: `.hero`, `.hero-copy`, `.hero-eyebrow`, `.hero-actions`, `.button.primary`, `.button.secondary` (existing classes, unmodified)
- Produces: hero section other tasks visually follow; establishes the `data-cta="book-call"` stub pattern reused in Task 7

- [ ] **Step 1: Add the hero section inside `<main>`**

```html
      <section class="hero shell">
        <div class="hero-copy">
          <p class="hero-eyebrow">Custom software, built and shipped</p>
          <h1>iOS, Mac, and AI tooling — <span>built by one person.</span></h1>
          <p>
            JBC Development takes on scoped custom work: iOS apps, signed Mac utilities,
            automation, and AI-assisted workflows. One person handling the full stack,
            from scope to shipped build.
          </p>
          <div class="hero-actions">
            <a
              class="button primary"
              href="mailto:support@jbcdevelopment.dev?subject=Custom%20project%20inquiry&body=Project%20summary%3A%0APlatform%3A%0ATimeline%3A%0ABudget%20range%3A"
            >
              Request a custom quote
            </a>
            <a class="button secondary" href="#" data-cta="book-call">Book a call</a>
          </div>
          <p class="hero-trust">
            Every Mac build is signed, notarized, and checksum-verified.
            <a href="https://github.com/xxjonathan1997xx/jbcdevelopment-site/releases/download/jbc-mac-gold-2026-06-14/CHECKSUMS.sha256" target="_blank" rel="noopener noreferrer">Verify downloads</a>
          </p>
        </div>
      </section>
```

Note: this hero omits the `hero-media-products` figure (no product-icon sidebar) since this page isn't selling apps — the `.hero` container's flex/grid layout in `styles.css` already handles a single-child `.hero-copy` gracefully (verify in Step 2).

- [ ] **Step 2: Reload and verify the hero renders correctly with one column**

Reload `http://127.0.0.1:8788/custom-work.html`. Expected: dark hero section with eyebrow, headline (balanced wrap, no overflow), sub-copy, two buttons side by side, trust line below. No layout gap where the product-stack sidebar would have been (if there's a visible awkward empty column, note it — see Step 3).

- [ ] **Step 3: If a layout gap exists, add a scoping rule**

Check `styles.css:271-280` for the `.hero` display rule (likely `display: grid` with two columns for `body.home-page`). If `.hero` uses a grid that assumes two children and leaves an empty gap with only one child, add this scoped fix after the `body.custom-work-page` rule from Task 2:

```css
body.custom-work-page .hero {
  grid-template-columns: 1fr;
  max-width: 760px;
}
```

Skip this step entirely if Step 2 showed no gap — don't add unnecessary CSS.

- [ ] **Step 4: Commit**

```bash
git add custom-work.html styles.css
git commit -m "feat: add custom-work hero section with dual CTA"
```

---

### Task 4: Build the capability strip

**Files:**
- Modify: `custom-work.html` (append after hero section)
- Reference: `index.html:177-184` (`.proof-strip` structure), `styles.css:994-1093` (`.proof-strip`, `.proof-track`, `.proof-badge`)

**Interfaces:**
- Consumes: `.proof-strip`, `.proof-track`, `.proof-track-links`, `.proof-badge`, `.proof-badge-static` (existing classes)
- Produces: capability strip section, visually establishes the four-part range claim referenced later in Task 5's process copy

- [ ] **Step 1: Add the section**

```html
      <section class="proof-strip shell" aria-label="What JBC builds">
        <div class="proof-track proof-track-links">
          <span class="proof-badge proof-badge-static">iOS Apps</span>
          <span class="proof-badge proof-badge-static">Mac Tools</span>
          <span class="proof-badge proof-badge-static">Automation</span>
          <span class="proof-badge proof-badge-static">AI Workflows</span>
        </div>
      </section>
```

Note: uses `proof-badge-static` (not the linked `proof-badge` variant) for all four since these are capability labels, not links to external proof — matches the existing static badge pattern already used for "Built in Florida" on the homepage.

- [ ] **Step 2: Reload and verify**

Reload `http://127.0.0.1:8788/custom-work.html`. Expected: four pill badges in a row below the hero, matching the visual style of the homepage's proof strip (dark pills, light text).

- [ ] **Step 3: Commit**

```bash
git add custom-work.html
git commit -m "feat: add capability strip to custom-work page"
```

---

### Task 5: Build the bold "How I work" section

**Files:**
- Modify: `custom-work.html` (append after capability strip), `styles.css` (append new scoped rule)
- Reference: `index.html:186-216` (`.ship-section`/`.ship-grid`/`.ship-step` structure), `styles.css:1095-1113` (`.ship-section`, `.ship-grid`), `styles.css:2054-2090` (`.ship-step`)

**Interfaces:**
- Consumes: `.ship-section`, `.ship-grid`, `.ship-step`, `.section-heading` (existing classes)
- Produces: `.how-work-section` CSS class (new, page-scoped) providing the bold dark treatment; no other task depends on this class name

- [ ] **Step 1: Add the section markup**

```html
      <section class="ship-section how-work-section" id="how-i-work" aria-labelledby="how-work-title">
        <div class="shell">
          <div class="section-heading">
            <h2 id="how-work-title">How custom work gets scoped and shipped.</h2>
            <p>Same release discipline as every JBC product — applied to your project.</p>
          </div>

          <div class="ship-grid">
            <article class="ship-step">
              <span>01</span>
              <h3>Scope the job</h3>
              <p>Clarify the goal, platform, timeline, and budget before anything gets built.</p>
            </article>
            <article class="ship-step">
              <span>02</span>
              <h3>Build the smallest useful version</h3>
              <p>No scope creep. Ship what solves the stated problem first.</p>
            </article>
            <article class="ship-step">
              <span>03</span>
              <h3>Ship it signed</h3>
              <p>Mac builds ship signed, notarized, with published checksums — same as every JBC release.</p>
            </article>
            <article class="ship-step">
              <span>04</span>
              <h3>Support it after</h3>
              <p>Direct email support and documented limits, not a handoff into silence.</p>
            </article>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Add the bold-treatment CSS**

Append to `styles.css`, after the `body.custom-work-page .hero` rule added in Task 3 (or after the `body.custom-work-page` background rule from Task 2 if Task 3's Step 3 was skipped):

```css
.how-work-section {
  background:
    radial-gradient(circle at 82% 15%, rgba(56, 189, 248, 0.22), transparent 30rem),
    linear-gradient(180deg, #05101d 0, #0b2038 100%);
}

.how-work-section .section-heading h2,
.how-work-section .section-heading p {
  color: #ffffff;
}

.how-work-section .ship-step {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.14);
}

.how-work-section .ship-step h3 {
  color: #ffffff;
}

.how-work-section .ship-step p,
.how-work-section .ship-step span {
  color: rgba(255, 255, 255, 0.72);
}
```

Note: check `.ship-step`'s existing background/border/text colors at `styles.css:2054-2090` before writing this — if the base `.ship-step` already uses `var(--surface)`/`var(--border)`/`var(--muted)`, this override replaces them with light-on-dark equivalents for this section only. Adjust the exact rgba values if the base styles differ from what's assumed here, keeping the same intent: white heading, semi-transparent white body text, subtle white-bordered card on dark background.

- [ ] **Step 3: Reload and verify**

Reload `http://127.0.0.1:8788/custom-work.html`. Expected: this section has a dark navy background distinct from the surrounding light sections, four numbered steps readable in white/light text, matches the "elevated visual weight" design intent. Check contrast: white heading on dark bg should be well above 4.5:1 (verify with browser devtools or a contrast checker if uncertain).

- [ ] **Step 4: Commit**

```bash
git add custom-work.html styles.css
git commit -m "feat: add bold how-i-work section to custom-work page"
```

---

### Task 6: Build the shipping rigor and engagement shape sections

**Files:**
- Modify: `custom-work.html` (append after how-work section)
- Reference: `index.html:177-184` (proof-strip pattern reused), `index.html:314-341` (`.custom-work-list` structure), `styles.css:2145-2220` (`.custom-work-section`, `.custom-work-list`)

**Interfaces:**
- Consumes: `.proof-strip`, `.proof-badge`, `.custom-work-section`, `.custom-work-panel`, `.custom-work-copy`, `.custom-work-list` (existing classes)
- Produces: two content sections; no new CSS

- [ ] **Step 1: Add the shipping rigor section**

```html
      <section class="proof-strip shell" aria-label="Shipping rigor">
        <div class="proof-track proof-track-links">
          <a class="proof-badge" href="https://apps.apple.com/us/app/paw-care-academy/id6768147697" target="_blank" rel="noopener noreferrer">Live App Store app</a>
          <a class="proof-badge" href="/downloads.html#m5steambridge">Signed macOS download</a>
          <a class="proof-badge" href="https://github.com/xxjonathan1997xx/jbcdevelopment-site/releases/download/jbc-mac-gold-2026-06-14/CHECKSUMS.sha256" target="_blank" rel="noopener noreferrer">SHA-256 checksums</a>
        </div>
        <p class="app-showcase-note">Same discipline applies to custom work — not just the apps on this site.</p>
      </section>
```

Note: `app-showcase-note` class is reused here purely for its existing muted-text styling (`styles.css`, check near `.app-showcase-note` definition) to keep the connecting sentence visually consistent with how the homepage annotates its proof badges. If this class has layout assumptions tied to `.app-showcase-section` that look wrong when reused standalone, drop the class and use a plain `<p>` with inline style `color: var(--muted); text-align: center; margin-top: 16px;` instead — verify visually in Step 3 before deciding.

- [ ] **Step 2: Add the engagement shape section**

```html
      <section class="custom-work-section shell" id="engagement" aria-labelledby="engagement-title">
        <div class="custom-work-panel">
          <div class="custom-work-copy">
            <h2 id="engagement-title">What "custom work" means here.</h2>
            <p>
              JBC takes on small custom jobs when the scope is clear: iOS apps, signed Mac
              utilities, automation, and AI-assisted internal tools.
            </p>
            <ul class="custom-work-list">
              <li>iOS or Mac app builds and prototypes</li>
              <li>Local Mac utilities and launchers</li>
              <li>Automation, AI workflows, and support tooling</li>
            </ul>
          </div>
          <div class="custom-work-actions">
            <a
              class="button primary"
              href="mailto:support@jbcdevelopment.dev?subject=Custom%20project%20inquiry&body=Project%20summary%3A%0APlatform%3A%0ATimeline%3A%0ABudget%20range%3A"
            >
              Request a custom quote
            </a>
            <p class="custom-work-note">
              Include your goal, platform, timeline, and budget range for the fastest reply.
            </p>
            <a class="button secondary" href="#" data-cta="book-call">Book a call</a>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Reload and verify both sections**

Reload `http://127.0.0.1:8788/custom-work.html`. Expected: shipping-rigor badges render as a centered row with a connecting sentence beneath (check the sentence isn't oddly positioned — if `app-showcase-note` looks broken standalone, swap to the plain-`<p>` fallback described in Step 1 and reload again). Engagement section renders two-column (copy + list on left, CTA buttons on right) matching the homepage's existing custom-work section layout.

- [ ] **Step 4: Commit**

```bash
git add custom-work.html
git commit -m "feat: add shipping-rigor and engagement-shape sections"
```

---

### Task 7: Build the closing CTA section and wire up the call-CTA stub marker

**Files:**
- Modify: `custom-work.html` (append after engagement section, closing `</main>`)

**Interfaces:**
- Consumes: `.contact-section`, `.contact-panel`, `.button.primary`/`.button.secondary` (existing classes)
- Produces: final section before `</main>`; confirms both `data-cta="book-call"` instances (Task 3 and Task 6) are consistent

- [ ] **Step 1: Add the closing section**

```html
      <section class="contact-section shell" id="start" aria-labelledby="start-title">
        <div class="contact-panel">
          <div>
            <h2 id="start-title">Ready to scope your project?</h2>
            <p>
              Send the details or book a call — either way, expect a direct reply, not a form queue.
            </p>
          </div>
          <div class="contact-actions">
            <a
              class="contact-link"
              href="mailto:support@jbcdevelopment.dev?subject=Custom%20project%20inquiry&body=Project%20summary%3A%0APlatform%3A%0ATimeline%3A%0ABudget%20range%3A"
            >
              Request a custom quote
            </a>
            <a class="contact-link secondary-contact" href="#" data-cta="book-call">
              Book a call
            </a>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify all three `data-cta="book-call"` stubs are present**

```bash
grep -c 'data-cta="book-call"' /Users/jonathanbrito/Documents/jbcdevelopment-site/custom-work.html
```

Expected: `3` (hero, engagement section, closing section).

- [ ] **Step 3: Reload and verify the full page top to bottom**

Reload `http://127.0.0.1:8788/custom-work.html`. Scroll through the entire page. Expected: hero → capability strip → how-I-work (dark) → shipping rigor → engagement shape → closing CTA, in that order, no broken layout, no missing content.

- [ ] **Step 4: Commit**

```bash
git add custom-work.html
git commit -m "feat: add closing CTA section to custom-work page"
```

---

### Task 8: Shorten homepage's inline custom-work section to a teaser linking to the new page

**Files:**
- Modify: `index.html:314-341` (existing `.custom-work-section`)

**Interfaces:**
- Consumes: `.custom-work-section`, `.custom-work-panel`, `.custom-work-copy`, `.button.primary` (existing classes)
- Produces: none — this is the last content change

- [ ] **Step 1: Replace the existing section**

Find this block in `index.html`:

```html
      <section class="custom-work-section shell" id="custom-work" aria-labelledby="custom-work-title">
        <div class="custom-work-panel">
          <div class="custom-work-copy">
            <h2 id="custom-work-title">Need a scoped app, Mac tool, or workflow?</h2>
            <p>
              JBC takes on small custom jobs when the scope is clear: iOS apps, signed Mac
              utilities, automation, and AI-assisted internal tools.
            </p>
            <ul class="custom-work-list">
              <li>iOS or Mac app builds and prototypes</li>
              <li>Local Mac utilities and launchers</li>
              <li>Automation, AI workflows, and support tooling</li>
            </ul>
          </div>
          <div class="custom-work-actions">
            <a
              class="button primary"
              href="mailto:support@jbcdevelopment.dev?subject=Custom%20project%20inquiry&amp;body=Project%20summary%3A%0APlatform%3A%0ATimeline%3A%0ABudget%20range%3A"
            >
              Request a custom quote
            </a>
            <p class="custom-work-note">
              Include your goal, platform, timeline, and budget range for the fastest reply.
            </p>
            <a class="button secondary" href="mailto:support@jbcdevelopment.dev">Email JBC Development</a>
          </div>
        </div>
      </section>
```

Replace with:

```html
      <section class="custom-work-section shell" id="custom-work" aria-labelledby="custom-work-title">
        <div class="custom-work-panel">
          <div class="custom-work-copy">
            <h2 id="custom-work-title">Need a scoped app, Mac tool, or workflow?</h2>
            <p>
              JBC takes on small custom jobs when the scope is clear: iOS apps, signed Mac
              utilities, automation, and AI-assisted internal tools.
            </p>
          </div>
          <div class="custom-work-actions">
            <a class="button primary" href="/custom-work.html">
              See how custom work gets scoped and shipped
            </a>
          </div>
        </div>
      </section>
```

Note: this drops the `custom-work-list` bullets and the dual mailto CTAs from the homepage version, since that detail now lives on the dedicated page. The homepage section becomes a one-line teaser with a single link out, per the spec's "shorten to teaser" decision.

- [ ] **Step 2: Reload homepage and verify**

Reload `http://127.0.0.1:8788/`. Scroll to the "Need a scoped app..." section. Expected: shorter section than before, one button linking to `/custom-work.html`. Click the button, confirm it navigates to the new page correctly.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "refactor: shorten homepage custom-work section to teaser linking to new page"
```

---

### Task 9: Add EN/ES translation entries for the new page's copy

**Files:**
- Modify: `script.js` (append to `translations.es` object, `script.js:20` onward)

**Interfaces:**
- Consumes: existing `translations.es` object structure (flat string-key dictionary)
- Produces: nothing consumed by later tasks — this is the last task

- [ ] **Step 1: Read the full existing `translations.es` object to find the right insertion point and avoid duplicate keys**

```bash
grep -n '^const translations' -A 3 /Users/jonathanbrito/Documents/jbcdevelopment-site/script.js
grep -n '^};' /Users/jonathanbrito/Documents/jbcdevelopment-site/script.js | head -3
```

Find the closing `},` of the `es:` object (before the outer `translations` object's closing `};`) to know where to insert new entries.

- [ ] **Step 2: Add new key-value pairs for every new English string introduced in `custom-work.html`**

Insert before the closing `},` of the `es:` block:

```js
    "Custom software, built and shipped": "Software personalizado, construido y publicado",
    "iOS, Mac, and AI tooling —": "Herramientas iOS, Mac y IA —",
    "built by one person.": "construidas por una sola persona.",
    "JBC Development takes on scoped custom work: iOS apps, signed Mac utilities, automation, and AI-assisted workflows. One person handling the full stack, from scope to shipped build.": "JBC Development toma trabajo personalizado acotado: apps iOS, utilidades Mac firmadas, automatizacion y flujos asistidos por IA. Una sola persona a cargo de todo, desde el alcance hasta la publicacion.",
    "Request a custom quote": "Solicitar una cotizacion personalizada",
    "Book a call": "Reservar una llamada",
    "iOS Apps": "Apps iOS",
    "Mac Tools": "Herramientas Mac",
    "Automation": "Automatizacion",
    "AI Workflows": "Flujos de IA",
    "How custom work gets scoped and shipped.": "Como se acota y publica el trabajo personalizado.",
    "Same release discipline as every JBC product — applied to your project.": "La misma disciplina de publicacion de cada producto JBC, aplicada a tu proyecto.",
    "Scope the job": "Definir el alcance",
    "Clarify the goal, platform, timeline, and budget before anything gets built.": "Aclarar el objetivo, la plataforma, el cronograma y el presupuesto antes de construir nada.",
    "Build the smallest useful version": "Construir la version util mas pequena",
    "No scope creep. Ship what solves the stated problem first.": "Sin expansion de alcance. Publicar primero lo que resuelve el problema planteado.",
    "Ship it signed": "Publicarlo firmado",
    "Mac builds ship signed, notarized, with published checksums — same as every JBC release.": "Las compilaciones Mac se publican firmadas, notarizadas y con checksums publicados, igual que cada version de JBC.",
    "Support it after": "Darle soporte despues",
    "Direct email support and documented limits, not a handoff into silence.": "Soporte directo por correo y limites documentados, no una entrega al silencio.",
    "Live App Store app": "App activa en App Store",
    "Same discipline applies to custom work — not just the apps on this site.": "La misma disciplina aplica al trabajo personalizado, no solo a las apps de este sitio.",
    "What \"custom work\" means here.": "Que significa \"trabajo personalizado\" aqui.",
    "Ready to scope your project?": "Listo para definir el alcance de tu proyecto?",
    "Send the details or book a call — either way, expect a direct reply, not a form queue.": "Envia los detalles o reserva una llamada: en ambos casos, espera una respuesta directa, no una fila de formularios."
```

Note: `"iOS or Mac app builds and prototypes"`, `"Local Mac utilities and launchers"`, `"Automation, AI workflows, and support tooling"`, and `"Include your goal, platform, timeline, and budget range for the fastest reply."` are already in the existing `translations.es` object (reused verbatim from the homepage's original custom-work section) — do not duplicate these keys.

- [ ] **Step 3: Verify no duplicate keys were introduced**

```bash
cd /Users/jonathanbrito/Documents/jbcdevelopment-site
node -e "
const fs = require('fs');
const content = fs.readFileSync('script.js', 'utf8');
const match = content.match(/const translations = \{[\s\S]*?\n\};/);
eval(match[0].replace('const translations', 'var translations'));
console.log('es keys:', Object.keys(translations.es).length);
"
```

Expected: no error (a `SyntaxError` here means a duplicate key or malformed object — fix before proceeding). Note the printed key count for reference.

- [ ] **Step 4: Reload the new page, toggle to ES, and verify translated text appears**

Reload `http://127.0.0.1:8788/custom-work.html`. Click the "ES" language button. Expected: hero headline, capability strip, how-I-work section, and closing CTA all switch to Spanish text. No English strings left visible except ones intentionally not translated (proper nouns like "JBC Development", "M5SteamBridge").

- [ ] **Step 5: Commit**

```bash
git add script.js
git commit -m "feat: add ES translations for custom-work page copy"
```

---

### Task 10: Full ship-readiness verification pass

**Files:** None modified — verification only, per the `jbc-site-standard` skill's ship-readiness bar.

**Interfaces:**
- Consumes: the completed `custom-work.html`, updated `styles.css`, updated `script.js`, updated `index.html`
- Produces: nothing — final gate before this feature is done

- [ ] **Step 1: Contrast check on the dark "how I work" section**

```bash
python3 -c "
def lum(hex):
    hex=hex.lstrip('#')
    r,g,b=[int(hex[i:i+2],16)/255 for i in (0,2,4)]
    def f(c): return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    r,g,b=f(r),f(g),f(b)
    return 0.2126*r+0.7152*g+0.0722*b
def contrast(a,b):
    la,lb=lum(a),lum(b)
    l1,l2=max(la,lb),min(la,lb)
    return (l1+0.05)/(l2+0.05)
print('white on dark navy (#0b2038):', contrast('#ffffff','#0b2038'))
"
```

Expected: ratio well above 4.5:1 (white on `#0b2038` should be around 14-15:1). If any custom color was substituted in Task 5 Step 2, re-run this check with the actual hex values used.

- [ ] **Step 2: Mobile/tablet/desktop responsive check**

With the local server still running, open `http://127.0.0.1:8788/custom-work.html` in a browser and resize to 375px, 768px, and 1280px widths (or use browser devtools device emulation). Expected at each width: no horizontal scroll, no text overflow on the hero headline or section headings, hero buttons stack vertically on narrow widths if the existing `.hero-actions` responsive rule does that (check `styles.css` media queries at `styles.css:2605`, `2693`, `2758` for existing breakpoint behavior — this page should inherit it automatically since it reuses the same classes).

- [ ] **Step 3: Live browser screenshot verification**

Take a full-page screenshot of `http://127.0.0.1:8788/custom-work.html` at 1440x900. Manually scroll-trigger any `.reveal` animated sections before capturing (per the known `jbc-site-standard` gotcha: automated full-page screenshots can skip the scroll-based `IntersectionObserver` trigger and show false blank gaps — scroll through the page first, then screenshot, or check the DOM directly if gaps appear).

- [ ] **Step 4: No banned design patterns check**

```bash
grep -c 'class="[^"]*eyebrow' /Users/jonathanbrito/Documents/jbcdevelopment-site/custom-work.html
grep -c 'section-label' /Users/jonathanbrito/Documents/jbcdevelopment-site/custom-work.html
```

Expected: eyebrow count is `1` (hero only). `section-label` count is `0` (not used on this page — capability strip and other sections use different heading patterns per the spec).

- [ ] **Step 5: SEO/meta tags completeness check**

```bash
grep -E '<title>|meta name="description"|link rel="canonical"|og:title|og:description|og:image|twitter:card|hreflang' /Users/jonathanbrito/Documents/jbcdevelopment-site/custom-work.html | wc -l
```

Expected: `13` or more (matches the count of meta/link tags added in Task 1 Step 1). Manually confirm the canonical URL and og:url both read `https://jbcdevelopment.dev/custom-work.html` (not the homepage URL — this was a common copy-paste mistake to check for).

- [ ] **Step 6: Asset weight check**

```bash
grep -oE 'src="[^"]+\.(jpg|jpeg|png|svg|webp)"' /Users/jonathanbrito/Documents/jbcdevelopment-site/custom-work.html
```

Expected: no output, or only references to already-existing site assets (this page's design per the spec introduces zero new images — verify none were added). If any new image was introduced, check its file size is reasonable (under 200KB) before shipping.

- [ ] **Step 7: Verify all internal links resolve**

With the local server running:

```bash
for path in "/" "/custom-work.html" "/store.html" "/downloads.html" "/support.html" "/privacy.html"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:8788$path")
  echo "$path -> $code"
done
```

Expected: `200` for every path.

- [ ] **Step 8: Stop the local server**

```bash
pkill -f "http.server 8788"
```

- [ ] **Step 9: Final commit if any fixes were made during verification**

If Steps 1-7 required any fixes, commit them now with a message describing what verification caught. If no fixes were needed, this task requires no commit — the feature is complete as of Task 9's commit.
