# JBC Development Website Release Checklist

Use this checklist before deploying updates to `jbcdevelopment.dev`.

This file is for readiness review only. It does not deploy, publish, change DNS, send email, or contact anyone.

## Release Details

- Release label:
- Commit:
- Target host:
- Domain: `jbcdevelopment.dev`
- Reviewer:
- Date:
- Final decision: Hold until approved

## Checklist

| Check Area | Status | Evidence | Blocker | Next Action |
|---|---|---|---|---|
| Mobile QA | Pending | Test responsive layout at mobile width | Mobile QA not recorded | Test before deploy |
| Desktop QA | Pending | Test layout at desktop width | Desktop QA not recorded | Test before deploy |
| Navigation links | Pending | Services, How We Work, Projects, Small Business, AI & Automation, Intake, Contact | Link review not recorded | Verify every header and footer link |
| Contact email | Pending | `jonathan@jbcdevelopment.dev` | Contact email review not recorded | Search for outdated email or placeholders |
| Intake form behavior | Pending | Required fields, short pain-point validation, success message, email draft link | Static form does not store submissions | Verify staged form behavior before deploy |
| SEO title/description | Pending | `index.html` metadata | Metadata review not recorded | Confirm title and description |
| Sitemap/robots | Pending | `sitemap.xml` and `robots.txt` | Sitemap/robots review not recorded | Review static files |
| Performance basics | Pending | Static assets, no heavy runtime, no console errors | Performance review not recorded | Run local browser check |
| Privacy/safety notes | Pending | Form warns against passwords, payment details, and sensitive records | Safety wording review not recorded | Confirm copy before deploy |
| No secrets committed | Pending | No `.env`, `.env.local`, tokens, credentials, keys, or private data | Secret review not recorded | Run git status and targeted scan |

## Contact Form Limitation

The current intake form is static. It validates locally, prepares a copyable inquiry summary, and creates a user-reviewed email draft. It does not store submissions, send automatic email, or create leads automatically.

Website inquiries should be manually reviewed in `business-growth-agent-system/leads/WEBSITE_INQUIRIES.md` before becoming lead tracker rows.

## Approval Gate

Deployment requires explicit approval before:

- Deploying or updating the live website.
- Changing DNS, hosting, redirects, HTTPS, or domain settings.
- Adding backend form capture, CRM syncing, external storage, or automatic replies.
- Publishing external marketing about the update.

## Rollback Notes

- Record the previous known-good commit before deployment.
- If the deployed site breaks layout, contact links, navigation, or intake behavior, roll back through the hosting provider to the previous deploy.
- Do not delete files or rewrite git history to roll back.
