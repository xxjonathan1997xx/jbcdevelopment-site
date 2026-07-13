# JBC Development Website Release Checklist

Use this checklist before deploying updates to `jbcdevelopment.dev`.

This file is for readiness review only. It does not deploy, publish, change DNS, send email, or contact anyone.

## Release Details

- Release label: ClearWaive landing page (`clearwaive.html`) + homepage nav/apps card + sitemap
- Commit: pending (not committed yet); rollback to last known-good `dced5dc` on `main`
- Target host:
- Domain: `jbcdevelopment.dev`
- Reviewer:
- Date: 2026-07-13
- Final decision: Pending approval — not committed or deployed

## Checklist

| Check Area | Status | Evidence | Blocker | Next Action |
|---|---|---|---|---|
| Mobile QA | Verified | `store.html` at 390px: hamburger nav, single-column cards (screenshot `jbc-store-mobile-en.png`) | None for store page | Re-check after real product links added |
| Desktop QA | Verified | `store.html` full layout EN + ES toggle verified via local preview (`jbc-store-desktop-en.png`) | None for store page | Re-check after real product links added |
| Navigation links | Updated | Store added to header + footer on index, store, downloads, support, privacy | Index uses "How we ship"/`#ship`; subpages use "Work"/`/#process` (pre-existing) | Verify every header and footer link before deploy |
| Store / digital products | Verified | `store.html`: 8 live Payhip products across 4 categories; runtime check confirms `window.Payhip` loaded, 8 buy buttons, all hrefs real (no `REPLACE-`), EN/ES translations | None - placeholders replaced with live links (2Ddxz, aTA1v, JfW6G, qFs4B, lsonC, RXgS4, Q0ox1, 0lgG7) | Deploy after approval |
| Contact email | Pending | `jbcsdevs@gmail.com` | Contact email review not recorded | Search for outdated email or placeholders |
| Privacy/support pages | Updated | Added Highway Fury support; homepage app parity for iOS games | Public page review not recorded | Verify page copy, links, and mobile layout |
| Email DNS records | Pending | Current contact link uses direct Gmail; domain email DNS only needs review before reintroducing `jbcdevelopment.dev` email | DNS email record review not recorded | Review DNS outside this workflow before provider or domain-email changes |
| Contact link behavior | Pending | Direct `mailto:` links open a user-reviewed email draft to `jbcsdevs@gmail.com` | Static site does not store submissions | Verify contact links before deploy |
| SEO title/description | Updated | `index.html` metadata, JSON-LD, raster `og-share.jpg`, hreflang | Metadata refreshed 2026-06-30 |
| Sitemap/robots | Updated | `sitemap.xml` adds `store.html` (lastmod 2026-06-30) | Review static files |
| Performance basics | Improved | `_headers` cache for CSS/JS/HTML, hero `fetchpriority`, lazy images | Run local browser check |
| Privacy/safety notes | Pending | Support and privacy copy warns against passwords, payment details, and sensitive records | Safety wording review not recorded | Confirm copy before deploy |
| No secrets committed | Pending | No `.env`, `.env.local`, tokens, credentials, keys, or private data | Secret review not recorded | Run git status and targeted scan |

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
