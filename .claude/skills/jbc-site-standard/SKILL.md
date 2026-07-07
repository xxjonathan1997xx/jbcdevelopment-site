---
name: jbc-site-standard
description: Use when building, editing, or reviewing any page on jbcdevelopment.dev — landing pages, service pitches, copy, design changes, or new sections. Covers voice, positioning, proof strategy, design system rules, technical constraints, and the ship-readiness bar for this site.
---

# JBC Site Standard

## Overview

Standing rules for anything built on `jbcdevelopment.dev`. Written from decisions made building the first cold-traffic landing page (custom-work service pitch). Applies to every future page, not just that one.

## Voice

**Trustworthy-and-blunt. Deliberate, not accidental.**

- No hype words ("solutions", "leverage", "seamless", "cutting-edge")
- State limitations explicitly even when it costs a sale (see the M5SteamBridge DRM/anti-cheat disclaimer on the homepage — that's the reference example)
- Plain declarative sentences over persuasive framing
- If a claim can't be verified, don't make it — see Proof Strategy below

## Positioning

**Brand-level: full-stack generalist** (iOS + Mac + AI/automation + small business support). This is the permanent umbrella positioning — don't narrow it at the brand level.

**Page-level: niching is allowed.** An individual landing page can pitch a specific niche or audience if it converts better (e.g., "AI automation for local businesses"), as long as the brand/homepage stays broad. Decide niche-vs-broad per page based on that page's traffic source and intent — cold ads to a specific audience justify a niche page; general brand presence does not.

## Proof Strategy

**Prefer real proof. Fall back to process only when no real proof exists.**

Priority order for any claim of capability:
1. Real client work / case studies, if they exist and can be shown (get explicit confirmation before publishing client details — anonymize if requested)
2. Real trust signals already established (signed/notarized Mac builds, SHA-256 checksums, live App Store apps) — usable as proof-by-association for adjacent claims
3. Process/methodology pitch ("how I work") — only when neither of the above exists for the claim being made

**Never fabricate case studies or claim work that can't be shown.** This is not a "delete it as soon as real proof exists" scaffold — it's the standing rule. When a page currently uses tier 3 (process-only) because tier 1 doesn't exist yet, swap in tier 1 the moment it does. Don't leave stale process-only pitches once real stories are available.

## Design System

Tokens: `styles.css` — `--accent: #0b5fff`, DM Sans, existing spacing/radius scale. Components: `proof-badge`, `ship-step` (numbered sequence pattern), `custom-work-list`, button primary/secondary.

**Reuse first.** Every new page starts by reusing existing tokens and components.

**The system can grow — deliberately, not casually.** Adding a new token or component is allowed when a real need arises, but it must be a conscious, flagged decision (state why the existing system doesn't cover the need), not invented ad hoc mid-build because it looked nice.

**Banned patterns** (carried over from general design review, apply site-wide):
- Eyebrow label on every section (small-caps tracked kicker) — one per page max, as a deliberate brand device, not scaffolding. This site had 8 instances removed in July 2026; don't reintroduce the pattern.
- Gradient text, glassmorphism-as-default, side-stripe borders, identical card grids, numbered section markers used decoratively (numbers are fine only for a real sequence, like `ship-step`)
- Missing `text-wrap: balance`/`pretty` on new headings/paragraphs — this is now the baseline in `styles.css`, don't regress it on new pages

**One section can carry more visual weight than the rest** when it's the section carrying the core pitch (e.g., a full-bleed dark section with the accent color driving more of the surface). This is a deliberate exception, not the default — most sections stay in the site's normal light/dark rhythm.

## Technical Constraints

**Static-first by default: no build step, no backend, no framework.** This is not an aesthetic preference — it's the standing default because it keeps the site simple to own and deploy (see `CLAUDE.md` in repo root: GitHub Pages / any static host, publish directory = project root).

**Exceptions are allowed, but the bar is high.** A framework, backend, or real form-handler is justified only when a specific page genuinely can't work without it (e.g., a real contact form replacing mailto, a CMS for high-volume content). This must be a deliberate, stated decision — not a default reach because it's more familiar.

**Contact pattern:** reuse the existing mailto intake pattern (`mailto:jbcsdevs@gmail.com?subject=...&body=...` with structured fields: goal, platform, timeline, budget) unless a page has an explicit, justified reason for something else.

## Ship-Readiness Bar

Before any page is considered done:

1. **Contrast/accessibility** — body text ≥4.5:1, large text ≥3:1 against its background. Check placeholder text too, not just body copy.
2. **Mobile responsive** — verify at mobile/tablet/desktop widths, not just desktop. Check heading text doesn't overflow at narrow widths (long words + large clamp + narrow grid is a known failure mode).
3. **Live browser verification** — actually load the page and look at it (or screenshot it). Code review and passing type-checks are not verification of what a user sees.
4. **No banned design patterns** — check against the list above.
5. **Voice match** — copy reads trustworthy-and-blunt, no unverifiable claims, no hype words.
6. **SEO/meta tags complete** — title, meta description, canonical, og:tags, and (if applicable) hreflang, matching the pattern already established on `index.html`. A new page missing these is a regression, not a gap to fill "later."
7. **Asset weight** — no unoptimized images, no added bloat. This site's only heavy assets are app icons/screenshots; a new page introducing stock photos or oversized images is the first thing that would bloat it. Check actual file sizes before shipping.

## Known Mistakes — Don't Repeat

- **Eyebrow-label sprawl.** Small-caps tracked kicker text (`FLORIDA INDIE APP STUDIO`, `HOW WE SHIP`, `APPS`, etc.) got added to every section by default. It's an AI-generation reflex, not a deliberate brand choice — removed from 5 of 6 sections in July 2026, keeping only the hero instance. Don't default to adding one per section.
- **Full-page automated screenshots and scroll-reveal animations don't mix.** This site uses `.reveal` + `IntersectionObserver` (in `script.js`) to fade content in on scroll, correctly gated behind `prefers-reduced-motion`. An automated `fullPage: true` screenshot tool can jump straight to full-page capture without triggering the scroll-based observer, producing large blank gaps in the screenshot that look like a rendering bug but aren't. Before flagging "missing content" from a screenshot, check whether the section uses `.reveal` and verify by scrolling manually (or checking the DOM/HTML directly) before treating it as a real bug.

## Quick Reference

| Decision | Rule |
|---|---|
| Voice | Trustworthy-and-blunt, always |
| Brand positioning | Full-stack generalist (fixed) |
| Page positioning | Can niche down if it serves that page's traffic |
| Proof | Real proof > proof-by-association > process-only. Never fabricate. |
| Design tokens | Reuse first. New tokens = deliberate, flagged decision. |
| Tech stack | Static/no-build by default. Exceptions need real justification. |
| Eyebrows | One per page max |
| Before shipping | Contrast, responsive, live-verify, no banned patterns, voice check, SEO meta, asset weight |
