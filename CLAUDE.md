# JBC Software Development LLC Site

Static company website for `jbcdevelopment.dev`.

## Stack

- Static HTML/CSS/JS — no build step
- GitHub Pages or any static host (Vercel, Netlify, Cloudflare Pages)
- Publish directory: project root

## Local preview

```bash
python3 -m http.server 8788
```

Open `http://127.0.0.1:8788`

## Key files

- `index.html` — company site content and metadata
- `downloads.html` — Mac app download page for M5SteamBridge
- `privacy.html` — public privacy policy
- `support.html` — public support page
- `styles.css` — responsive styling
- `script.js` — mobile nav, EN/ES language switching, lab console rotation
- `WEBSITE_RELEASE_CHECKLIST.md` — pre-deploy QA and rollback checklist
- `assets/` — favicon and brand visuals

## Contact behavior

- Direct email links to `jbcsdevs@gmail.com` (no server-side form storage)
- EN/ES toggle stored in local browser storage only

## Before deploy

Review `WEBSITE_RELEASE_CHECKLIST.md` before any live deployment.

Deployment, DNS changes, hosting changes, and public announcements require approval first.

## Action Buckets

**Always do:** local edits to HTML/CSS/JS, local preview server, running the release checklist.

**Ask first:** deployment, DNS changes, hosting changes, public announcements.

**Never do:** none defined yet — add hook-enforced paths here if a folder needs it.

## Agent hub

For routing across local agents, skills, and workflows, read:
`/Users/jonathanbrito/.cursor/agent-hub/index.json`
