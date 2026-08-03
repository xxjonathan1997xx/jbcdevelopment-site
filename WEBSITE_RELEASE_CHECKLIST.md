# JBC Development Website Release Checklist

Use this checklist before deploying updates to `jbcdevelopment.dev`.

## Northstar ERP Engineering Case Study — August 3, 2026

- Scope: publish `/northstar-erp-case-study.html`, add it to a separate
  Engineering case studies section on `/projects.html`, and add it to the
  sitemap.
- Approval: Jonathan explicitly approved publication on August 3, 2026.
- Positioning: synthetic ERPNext/Frappe engineering pilot; never a customer
  deployment, production ERP product, manufacturing module, or IFS integration.
- Data boundary: fabricated data only; no employer or customer data.
- Product inventory: the seven released/public product cards remain unchanged and
  separate from the case study.
- Rollback point: `d24856c` on `main`.
- Validation: JavaScript syntax, XML, whitespace, local HTTP, internal links,
  EN/ES content, mobile navigation, console errors, and horizontal overflow
  passed before publication.

## PainTrail First 100 Feedback Campaign — July 31, 2026

- Scope: replace the referral offer with an honest product-feedback offer on
  `paintrail-referral.html`, update the matching PainTrail disclosure in
  `privacy.html`, and replace the social preview artwork.
- Approval: Jonathan explicitly approved publishing the campaign on July 31,
  2026.
- Privacy: participants are told not to submit health information; no App Store
  rating or review is required or rewarded.
- Intake: existing user-reviewed `mailto:` flow only; no backend, analytics,
  tracking, or automatic response was added.
- Rollback point: record the pre-deploy `main` commit immediately before push.
- Validation: local HTTP, copy-length, mailto template, 100-slot ledger, HTML
  structure, internal links, and whitespace checks must pass before push.

This file is for readiness review only. It does not deploy, publish, change DNS, send email, or contact anyone.

## SocialBar Landing Page — August 2, 2026

- Scope: new `/socialbar/` landing page plus `/socialbar/selectors.json` (the app's
  remote badge-selector feed). No changes to existing pages.
- Approval: Jonathan approved on 2026-08-02 — link-to-Gumroad (no DMG hosted on the
  site) and host the selector feed.
- Distribution: purchase happens on Gumroad (`devsoul64.gumroad.com/l/socialbar`,
  $4.99). The site hosts **no** installer, so the paid listing stays the only source.
- Privacy: no analytics, tracking, forms, or backend added. The page states plainly
  that the app contacts only Gumroad (license) and this domain (selector feed).
- Rollback point: `d24856c` on `main`.
- Validation: local HTTP served from repo root — `/socialbar/` 200,
  `/socialbar/selectors.json` 200 and valid JSON (v4, 6 platforms), `/styles.css`,
  `/script.js`, brand mark and every internal link referenced by the page all 200.
- Known gap: no screenshots yet. The page ships without a gallery rather than with
  placeholder art; add `/socialbar/screenshots/` when captures exist.
- Claim accuracy: badge-count coverage varies by platform today (LinkedIn verified;
  others fall back to "unavailable" rather than showing a wrong number). Page copy
  reflects this instead of promising universal counts.

### Follow-up — SocialBar navigation, August 2, 2026

- Scope: added `SocialBar` to the primary nav on all 12 pages carrying it, and a
  SocialBar card to `projects.html`.
- Approval: Jonathan approved on 2026-08-02.
- Rollback point: `b9bb4ab` on `main`.
- Validation: all 12 pages return 200 locally; exactly one SocialBar nav link per
  page; card renders on `projects.html`.
- Note: SocialBar is the only product with a top-level nav entry — ThreadVigil,
  M5SteamBridge, NextRole and ClearWaive are reachable via Projects/Store only.
  Placed as requested; easy to drop back to Projects-only if the nav feels crowded.

### Follow-up — SocialBar screenshot, August 2, 2026

- Scope: added `/socialbar/screenshots/badge-proof.png` (36 KB) and a figure under the
  hero on `/socialbar/`, plus the `og:image` tag that page was missing.
- Approval: Jonathan approved on 2026-08-02.
- Privacy: the capture is cropped so no profile block, name, employer, location, or
  analytics are visible. No third-party accounts or content appear. A small avatar
  remains in LinkedIn's own nav bar — Jonathan's own, reviewed and accepted.
- Rollback point: `01888e5` on `main`.
- Validation: `/socialbar/` and the image both 200 locally; image referenced twice
  (og:image + figure); explicit width/height set to avoid layout shift; alt text
  describes the claim being made.

### Follow-up — SocialBar 0.1.0 binary + Sparkle feed, August 2, 2026

- Scope: host `SocialBar-0.1.0.dmg` (1.5 MB), `appcast.xml`, and `SHA256SUMS` under
  `/socialbar/`. No page copy changed — the landing page still sends buyers to Gumroad.
- Approval: Jonathan approved on 2026-08-02.
- Why the binary is hosted: Sparkle enclosure URLs must be stable and public. Gumroad
  download links are per-buyer and cannot serve as an enclosure, so auto-update requires
  the DMG at a fixed URL. Purchase still happens on Gumroad; the Pro licence gates
  features, not the download.
- Integrity: DMG is the notarized artefact — `stapler validate` passes and Gatekeeper
  reports `accepted / source=Notarized Developer ID` from this copy. SHA256
  `bbb0d931076556b510f4da5f65e1b96402371d0e2e507bad8ece0cb59c98c446`.
- Appcast: enclosure URL matches the hosted path; signature and length generated by
  `build-dmg.sh` from the artefact itself.
- Rollback point: `14952da` on `main`.

### Follow-up — SocialBar menu bar detail, August 2, 2026

- Scope: added `/socialbar/screenshots/menubar-badge.png` (12 KB) inline inside the
  badge-counts feature card on `/socialbar/`.
- Approval: Jonathan approved on 2026-08-02.
- Shown at native size (120x64 capture rendered at 60 CSS px). Deliberately not
  enlarged — magnifying a menu bar icon only exposes pixels.
- Privacy: region capture of the menu bar's right end only; cropped to SocialBar's
  own icon, so no other apps, windows or desktop content appear.
- Rollback point: `70000a4` on `main`.
- Validation: page and both screenshots 200 locally; explicit width/height set.

### Follow-up — SocialBar switcher demo GIF, August 2, 2026

- Scope: added `/socialbar/screenshots/demo-switcher.gif` (43 KB, 972x165, 6 frames)
  above the "What it doesn't do" section on `/socialbar/`.
- Approval: Jonathan approved on 2026-08-02.
- Content: cropped to SocialBar's own chrome only — the platform switcher and account
  row. No platform page content, no third-party posts, no personal data.
- Rollback point: `98fe54f` on `main`.
- Validation: page and GIF 200 locally; explicit width/height set; 6 distinct frames
  verified by hash (a first attempt produced 24 frames of which only 6 differed).
- Known limitation: this demonstrates platform switching, not compose staging. The
  compose demo is still outstanding and needs a clean/test account, since the real
  compose view shows third-party feeds.

### Follow-up — SocialBar settings screenshot, August 2, 2026

- Scope: added `/socialbar/screenshots/settings.png` (137 KB, 920x1304) above the
  Pricing section on `/socialbar/`, illustrating platform toggles, account naming,
  polling interval and licence state.
- Approval: Jonathan approved on 2026-08-02.
- Portrait shot constrained to 460px max-width so it does not dominate the page.
- Privacy: window-only capture of SocialBar's own settings UI. No third-party content;
  account labels are all "Default".
- Rollback point: `96bc0c5` on `main`.
- Validation: page plus all four screenshots return 200 locally; five image references
  on the page; explicit width/height on every img.

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
