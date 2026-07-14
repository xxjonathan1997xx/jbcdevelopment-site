# JBC Development Website Release Checklist

Use this checklist before deploying updates to `jbcdevelopment.dev`.

This file is for readiness review only. It does not deploy, publish, change DNS, send email, or contact anyone.

## Pending Review: M5SteamBridge Open-Source Landing Page

- Branch: `codex/m5steambridge-open-source-launch`
- Proposed path: `/m5steambridge/`
- Status: approved for deployment on 2026-07-11
- Desktop QA: verified at 1440×1000 with no horizontal overflow
- Mobile QA: verified at 390×844 with no horizontal overflow; mobile navigation opens
- Language QA: EN/ES switch verified
- Media QA: 209 KB poster and 361 KB privacy-reviewed, window-only MP4; video duration 40.08 seconds
- Static QA: `script.js` syntax passes; landing page, poster, video, downloads, and support return HTTP 200 locally
- External links: public GitHub source, issue forms, signed DMG, and setup-help targets rechecked successfully
- Deployment approval: Jonathan approved deployment on 2026-07-11

## Release Details

- Release label: ClearWaive landing page (`clearwaive.html`) + homepage links for ClearWaive & M5SteamBridge + sitemap
- Commit: `d54da11` on `main` (rollback to last known-good `dced5dc`)
- Target host: GitHub Pages (legacy build, source `main` branch, root path)
- Domain: `jbcdevelopment.dev`
- Reviewer: Jonathan
- Date: 2026-07-13
- Final decision: Approved and deployed 2026-07-13 — live, Pages build succeeded, live URLs verified 200

## Checklist

| Check Area | Status | Evidence | Blocker | Next Action |
|---|---|---|---|---|
| Desktop QA | Verified | `clearwaive.html` + homepage `#apps` at 1280px via Chrome DevTools: 3-card apps row, nav shows ClearWaive + M5SteamBridge, no h1 overflow, no horizontal scroll | None | — |
| Mobile QA | Verified | `clearwaive.html` at 375/500px: hamburger nav, full-width buttons, badges reflow, no overflow | None | — |
| Navigation links | Verified | ClearWaive + M5SteamBridge added to header + footer on `index.html`; M5 apps card repointed to `/m5steambridge/`; all internal hrefs resolve (200) | None | — |
| New page: ClearWaive | Verified | `clearwaive.html` live 200, h1 present; copy sourced from ClearWaive MVP (no fabricated claims); "View live demo" → `clearwaive-mvp.vercel.app` confirmed 200; reuses existing components/tokens | Demo video is a marked placeholder (no YouTube upload yet) | Swap `VIDEO_ID` when uploaded |
| Contact link behavior | Verified | ClearWaive uses `mailto:jbcsdevs@gmail.com` intake pattern; no backend, no submission storage | None | — |
| SEO title/description | Verified | `clearwaive.html` full title/description/canonical/og/hreflang matching `index.html` pattern | None | — |
| Sitemap/robots | Verified | `sitemap.xml` adds `clearwaive.html` + `custom-work.html` (lastmod 2026-07-13); live sitemap serves both; valid XML | None | — |
| No secrets committed | Verified | Only `clearwaive.html`, `index.html`, `sitemap.xml`, `WEBSITE_RELEASE_CHECKLIST.md` changed; no `.env`/tokens/keys; `CLAUDE.md` pre-existing local edit left untouched | None | — |
| Deploy + live verify | Verified | Pushed to `main`; GitHub Pages build `built`; live URLs 200 (`/clearwaive.html`, `/m5steambridge/`, sitemap) | None | — |
| Merge integrity | Verified | Two rounds of remote divergence (teammate M5 page, then NextRole support/privacy) merged cleanly — no conflicts, no work lost | None | — |

## Contact Link Limitation

The current contact path is static. It uses direct email links that create a user-reviewed email draft. It does not store submissions, send automatic email, or create leads automatically.

Website inquiries should be manually reviewed before becoming lead tracker rows. Do not add backend capture, CRM syncing, or automatic lead creation without approval.

The current public contact email is `jbcsdevs@gmail.com`. Review email DNS only before reintroducing `jbcdevelopment.dev` domain email or changing providers. Do not use this checklist to change other projects, email providers, quote intake systems, or automation settings.

## Approval Gate

Deployment requires explicit approval before:

- Deploying or updating the live website.
- Changing DNS, hosting, redirects, HTTPS, or domain settings.
- Changing Gmail, Google Workspace, MX, SPF, DKIM, DMARC, or email-routing settings.
- Adding backend form capture, CRM syncing, external storage, or automatic replies.
- Publishing external marketing about the update.

## Rollback Notes

- Record the previous known-good commit before deployment.
- If the deployed site breaks layout, contact links, navigation, or intake behavior, roll back through the hosting provider to the previous deploy.
- Do not delete files or rewrite git history to roll back.
