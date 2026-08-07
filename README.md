# JBC Software Development LLC Site

Static company website for `jbcdevelopment.dev`.

The site presents JBC Software Development LLC as a practical software/app
development business focused on:

- Affordable software solutions
- Mobile app development
- AI tools and agents
- Small business support
- Automation and workflow systems
- Practical technology for local business growth

## Contact Links

The website uses direct email contact links for support, privacy, app, download,
setup, and software questions.

Current behavior:

- Opens a user-reviewed email draft to `support@jbcdevelopment.dev`
- Does not store submissions, send automatic emails, create proposals, or make commitments
- Keeps support and privacy pages available as static pages

The public contact email is `support@jbcdevelopment.dev`.

Because this is a static site, there is no server-side submission storage. To
activate direct form capture later, add an approved backend/form handler such as
Netlify Forms, a Vercel/Cloudflare Function, or another reviewed intake
endpoint. Do not add automated replies, external sending, or CRM syncing without
approval.

## Language Support

The public pages include lightweight English/Spanish support in `script.js`.

- Spanish is selected automatically when the visitor's browser language starts
  with `es`.
- Visitors can switch manually with the `EN` / `ES` toggle in the header.
- The preference is stored in local browser storage only.
- No external translation widget, API, tracking script, or visitor data transfer
  is used.

## Local Preview

Run a simple static server from this folder:

```bash
python3 -m http.server 8788
```

Then open:

```text
http://127.0.0.1:8788
```

## Visual Assets

- `assets/jbc-brand-mark.svg` is the local logo-style mark used in the header.
- `assets/brand-workbench.svg` is a custom local SVG created for this site.
- These assets are not hotlinked, do not use third-party stock imagery, and are
  intended to match the JBC green/white brand style while showing practical
  website, dashboard, app, and automation work.

## Deploy

This site is deploy-ready for Vercel, Netlify, Cloudflare Pages, or any static host.

- Publish directory: project root
- Build command: none
- Output directory: project root

Before any live deployment or public update, review:

- `WEBSITE_RELEASE_CHECKLIST.md` in this repo
- `WEBSITE_DEPLOYMENT_READINESS.md` in `business-growth-agent-system`
- `scripts/run-website-deployment-readiness` from `business-growth-agent-system`

Deployment, DNS changes, hosting changes, and public update announcements require approval first.

## Files

- `index.html`: company site content and metadata
- `downloads.html`: Mac app download page for M5SteamBridge
- `privacy.html`: public privacy policy for website inquiries and app support
- `support.html`: public support page for apps, projects, and business inquiries
- `styles.css`: responsive styling
- `script.js`: mobile navigation, language switching, and lab console rotation
- `WEBSITE_RELEASE_CHECKLIST.md`: pre-deploy QA, contact link behavior, approval, and rollback checklist
- `marketing/`: reusable launch and demo copy for Mac tools and apps
- `assets/`: favicon and site visual asset

## Public Action Rule

This repository contains the website files only. Publishing, DNS changes,
external outreach, email campaigns, App Store/TestFlight claims, or public
release announcements should be reviewed before action.
