# Design System

<!-- impeccable:design-schema 1 -->

## Visual Identity

Modern indie tech studio aesthetic. Deep dark navy hero transitioning into clean, breathable light or cohesive dark surfaces with vibrant cobalt blue accents, precise typography, and refined micro-interactions.

## Color Palette

| Role | Value | Usage |
|---|---|---|
| Deep Dark Base | `#05101d` | Hero header background |
| Navy Surface | `#071a33` | Sub-hero elevation |
| Light Base | `#f7fbff` | Main section background |
| Surface White | `#ffffff` | Card surfaces |
| Text Primary | `#071422` | Headings, high contrast text |
| Text Muted | `#5c6f89` | Subtitles, captions |
| Primary Accent | `#0b5fff` | Buttons, links, primary highlights |
| Sky Accent | `#38bdf8` | Secondary badges, warm gradient touches |
| Border | `#d6e5f7` | Subtle card borders |

## Typography

- Font family: `DM Sans`, Inter, system-ui, sans-serif
- Headings: 700 / 800 weight, -0.02em to -0.03em tracking
- Body: 500 weight, 1.6 line-height

## Spacing & Rhythm

- Container width: `min(1200px, calc(100vw - 40px))`
- Section padding: 4rem to 6rem vertical spacing to let content breathe
- Card border radius: 12px to 16px

## Principles

1. **Clear visual hierarchy**: One hero focus, primary app showcases, secondary utilities.
2. **Decluttered cards**: Unified card language across apps, tools, and services without competing badges.
3. **Smooth motion**: Purposeful reveal transitions and subtle hover lifts.

## Homepage system (November 2026)

The homepage (`index.html`) uses its own stylesheet, `home.css`, instead of `styles.css`, which carries older, conflicting page rules.

- Type: DM Sans for text, DM Mono for data (versions, dates, status, list headers). Display letter-spacing no tighter than -0.03em.
- Color: light page (`oklch(0.985 0.004 262)`), ink `oklch(0.21 0.035 262)`, accent #0b5fff used for actions only, brand navy #05101d for the one dark section ("How releases work").
- **What's live ledger**: the hero's product list, newest first, with the month it went on the site and a status (shipped green, pilot amber, beta blue). Update it when a product ships or retires.
- **Does / doesn't lists**: every product section states what it does and what it doesn't (or not yet), taken from that product's own page. Never list a claim the product page doesn't support.
- Motion: ledger rows slide in on load using transform only, never opacity, so content is visible even if animations are paused. Everything is disabled under `prefers-reduced-motion`.
- Phones: menu links sit on their own row under the logo; the header email button is hidden (the hero CTA and `#contact` cover it).
- EN/ES: text is translated by `script.js` from its `translations.es` dictionary; add a Spanish entry for every new homepage string.
