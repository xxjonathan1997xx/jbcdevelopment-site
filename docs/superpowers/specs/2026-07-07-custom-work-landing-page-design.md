# Custom Work Landing Page — Design Spec

Date: 2026-07-07

## Problem

`jbcdevelopment.dev` homepage sells two consumer apps (Paw Care Academy, M5SteamBridge). Its README states the actual business focus is broader: custom software, mobile app development, AI tools/automation, small business support. None of that is proven or pitched anywhere on the live site — the homepage's "custom work" section is a single buried CTA block with no process, no positioning, no proof.

Cold traffic (ads, outreach) landing on the homepage reads "app portfolio," not "hire this person for custom software/AI/automation work." There is no page built to convert that audience.

## Goal

Add a dedicated landing page, `/custom-work.html`, that pitches the custom-dev/AI/automation service line to cold traffic, using a full-stack-generalist positioning and a process-led pitch (no client case studies — none are being used for this launch).

## Audience

Cold traffic: ads, outreach, LinkedIn, referral links with no prior context. Page must build trust from zero — can't assume the visitor knows who JBC Development is.

## Positioning

Full-stack generalist: one person covering iOS, Mac, AI workflows, and automation. Credibility comes from range + shipping discipline, not narrow specialization and not client testimonials.

## Proof strategy

No client case studies for this version. Credibility instead comes from:
- Process ("how I work" — scope-first, ship discipline)
- Existing real trust signals already on the homepage: signed/notarized Mac builds, SHA-256 checksums, a live App Store app. These get reused here as proof-by-association ("same discipline applies to custom work").

## Visual direction

Same design system as the homepage — same `styles.css` tokens, DM Sans, `--accent: #0b5fff`, same component patterns (proof badges, numbered steps, pill CTAs). No new type pairing, no new palette, no separate sub-brand.

One section gets elevated visual weight: **How I work**. It becomes a full-bleed dark section (reusing the hero's dark navy treatment) with the accent blue driving a larger share of that section's surface than the rest of the page — signaling this section carries the core pitch. Every other section stays in the homepage's existing light/dark rhythm.

New page gets `body.custom-work-page` class (parallel to existing `body.home-page`) for any page-scoped CSS overrides, added to the same `styles.css` file — no new stylesheet, no build step.

## Page structure

### 1. Hero (dark, full-bleed — matches homepage hero styling)
- One eyebrow max (matches the site's recent eyebrow-reduction — don't reintroduce sprawl)
- Headline leads with capability, not apps: positions iOS + Mac + AI + automation range
- One sentence sub-copy reinforcing the range positioning
- Dual CTA inline:
  - Primary: mailto intake, reusing the exact existing pattern/subject/body fields from the homepage's `custom-work-section` (`mailto:support@jbcdevelopment.dev?subject=Custom%20project%20inquiry&body=...`)
  - Secondary: "Book a call" — `href="#"` stub, marked `data-cta="book-call"` for easy find-and-wire-up once a booking link (Calendly/Cal.com) exists

### 2. Capability strip (light, badge row)
Reuses the `proof-strip`/`proof-badge` pill pattern from the homepage. Four blocks, scannable, no paragraph copy: iOS Apps / Mac Tools / Automation / AI Workflows.

### 3. How I work (dark, bold — elevated section)
Full-bleed dark section, accent-driven surface treatment per Visual direction above. Four-step process reusing the homepage's `ship-step` numbered-list pattern (`01`–`04`, real sequence, already proven copy pattern on homepage): scope → build → ship (signed/notarized where applicable) → support.

### 4. Shipping rigor (light)
Reuses the homepage's real trust badges (signed/notarized builds, SHA-256 checksums link, live App Store app link) via the existing `proof-badge` component. One connecting line: this same discipline applies to custom work, not just the shipped apps.

### 5. Engagement shape (light, two-column)
- Left: what "custom work" means — scope-first, small/clear jobs. Reuses the homepage's `custom-work-list` bullet style.
- Right: what to include when reaching out — goal / platform / timeline / budget. Matches the existing mailto body fields exactly; no new intake mechanism, no form, no backend.

### 6. Closing CTA
Repeats the dual CTA (mailto + call stub) from the hero. Short closing line. No new content introduced.

## Homepage integration

Homepage's existing inline `#custom-work` section gets shortened to a one-line teaser plus a "See how I work" link pointing to `/custom-work.html`, replacing the current full block. Avoids duplicate content between the two pages and keeps the homepage focused on the app portfolio.

Nav: add a link to the new page (exact label and placement TBD at implementation time, likely reusing the "Custom work" nav slot that currently anchors to `#custom-work` on the homepage — point it to `/custom-work.html` instead).

## Non-goals

- No client case studies / testimonials (explicitly deferred — no material exists yet)
- No new visual identity, no new type pairing, no new color palette
- No build step, no JS framework, no backend form — static HTML/CSS, same as rest of site
- No real booking link yet — call CTA ships as a stub for the user to wire up later
- No changes to `downloads.html`, `privacy.html`, `store.html`, `support.html`

## Open items (explicit stub, not blocking)

- Book-a-call CTA href is a placeholder (`#`) until a real booking link is available
- Exact nav label/placement for the new page decided at implementation time, following existing nav conventions
