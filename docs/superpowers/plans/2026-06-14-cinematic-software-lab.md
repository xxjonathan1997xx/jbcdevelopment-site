# Cinematic Software Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the JBC Development homepage more intriguing with a darker cinematic software lab design while preserving the software-first message and static-site constraints.

**Architecture:** This is a static frontend refresh using the existing `index.html`, `styles.css`, and `script.js` structure. HTML owns semantic content and lab UI elements, CSS owns the cinematic visual system and responsive layout, and JavaScript owns nonessential motion/translation behavior.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, GitHub Pages.

---

### Task 1: Cinematic Hero Copy And Lab Markup

**Files:**
- Modify: `index.html`
- Modify: `script.js`

- [ ] **Step 1: Update hero copy and workbench markup**

Replace the hero headline with a stronger software-lab headline, add concise lab status rows inside the hero media, and keep existing CTAs and product chips.

Expected visible copy:
- `Practical software, built in the lab.`
- `JBC Development designs apps, local Mac tools, AI workflow systems, and automation with visible release discipline.`
- `release.pipeline`
- `signed, checked, supported`
- `active.tools`
- `Paw, PhotoMesh, M5SteamBridge`

- [ ] **Step 2: Add Spanish translation keys**

Add translations for the new visible strings in `script.js` so EN/ES switching remains complete.

- [ ] **Step 3: Verify static parsing**

Run: `node --check script.js`

Expected: command exits with status `0`.

### Task 2: Cinematic Visual System

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Shift above-the-fold palette**

Update body, header, hero, and hero media styles so the first viewport uses deep navy, blue/cyan glow, and crisp white text while preserving readability.

- [ ] **Step 2: Upgrade lab workbench styling**

Style the lab overlay, code stream, lab app tiles, release status rows, and build rail so the hero feels dimensional and active without layout shift.

- [ ] **Step 3: Keep mobile readable**

Add responsive rules so the hero stacks cleanly, text fits, CTAs wrap, and the workbench remains visible without horizontal overflow.

### Task 3: Product And Pipeline Polish

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Darken and sharpen pipeline section**

Make the build pipeline feel connected to the hero lab with darker accents, release-line styling, and strong contrast.

- [ ] **Step 2: Make app cards feel product-like**

Improve the app cards with stronger lab-themed visual frames, status chips, hover states, and stable dimensions.

- [ ] **Step 3: Keep DadBuildRepeat secondary**

Ensure the personal-channel section remains lighter and visually secondary to JBC software content.

### Task 4: Motion And Accessibility

**Files:**
- Modify: `styles.css`
- Modify: `script.js` only if necessary

- [ ] **Step 1: Refine motion**

Use existing motion hooks for code scan, app tile float, build rail activity, and reveal motion. Avoid adding motion that changes layout.

- [ ] **Step 2: Verify reduced motion support**

Confirm the existing `@media (prefers-reduced-motion: reduce)` rule still disables or neutralizes animation and transition effects.

### Task 5: Local QA

**Files:**
- Test only

- [ ] **Step 1: Run static checks**

Run:

```bash
node --check script.js
git diff --check
```

Expected: both commands exit with status `0`.

- [ ] **Step 2: Run local browser QA**

Use the local preview server and browser checks to confirm:
- no horizontal overflow on desktop or mobile
- no console warnings/errors
- nav and mobile menu still work
- EN/ES switching works
- app, download, support, privacy, and personal social links remain intact
- JBC software remains the main message above the fold

- [ ] **Step 3: Keep deployment separate**

Do not deploy. Report the local result and ask for live deployment confirmation separately.
