# JBC Store Setup Guide

How to take the new `/store.html` page live and sell digital products
(e-books, templates, digital art/assets, software) with **no upfront cost**.
Per-sale fees are fine; nothing here charges a monthly subscription on its free tier.

This guide does not deploy anything or change DNS. Deployment stays gated by
`WEBSITE_RELEASE_CHECKLIST.md` and requires your explicit approval.

---

## 1. Primary checkout: Payhip (recommended default)

Payhip hosts the files, runs secure checkout, delivers downloads/license keys
instantly, and handles EU/UK VAT. Free plan: **5% per sale**, $0 upfront.

### Create products
1. Sign up at https://payhip.com (use `jbcsdevs@gmail.com`).
2. Add a payout method (Stripe and/or PayPal) in **Account > Payments**.
3. For each product: **Add new product > Digital product**.
   - Upload the file(s) (PDF, ZIP, etc.).
   - Set the title, description, and price.
   - For software, enable **License keys** if you want per-purchase keys.
4. Open the product and copy its **Buy button link**, e.g. `https://payhip.com/b/AbCdE`.

### Connect each product to the site
On `store.html`, every product button looks like this:

```html
<a class="button primary payhip-buy-button" data-theme="green"
   href="https://payhip.com/b/REPLACE-PLAYBOOK" rel="noopener noreferrer">Buy now</a>
```

Replace only the `href` value with your real Payhip link. Keep the
`payhip-buy-button` class and `data-theme` attribute so the overlay checkout works.
The Payhip script is already loaded at the bottom of `store.html`:

```html
<script type="text/javascript" src="https://payhip.com/payhip.js"></script>
```

Placeholder links to replace (search for `REPLACE-` in `store.html`):

| Card | Placeholder href |
|---|---|
| Indie App Release Playbook | `payhip.com/b/REPLACE-PLAYBOOK` |
| AI Workflow Starter Guide | `payhip.com/b/REPLACE-AIGUIDE` |
| Release Checklist Template Pack | `payhip.com/b/REPLACE-CHECKLIST` |
| Project Workflow Board | `payhip.com/b/REPLACE-WORKFLOW` |
| Game Icon Asset Pack | `payhip.com/b/REPLACE-ICONS` |
| UI Sound and Texture Kit | `payhip.com/b/REPLACE-UIKIT` |
| Mac Automation Script Bundle | `payhip.com/b/REPLACE-SCRIPTS` |
| Developer Utility License | `payhip.com/b/REPLACE-UTILITY` |

Add, remove, or rename cards freely. Each card is a `<article class="store-card">`
block; titles/descriptions already have EN/ES translations in `script.js`. If you
add brand-new product text, add a matching Spanish key in the `translations.es`
object so the language toggle keeps working.

### Alternatives (pick one if you prefer)
- **Gumroad** (`gumroad.com`) - simplest, ~10% flat fee, similar embed buttons.
- **Lemon Squeezy** (`lemonsqueezy.com`) - Merchant of Record (handles all global
  tax), best for software licensing, ~5% + 50c.
- **Ko-fi** (`ko-fi.com`) - 0% platform fee (only payment processor fees), cheapest.

All four use a similar "buy button link" you paste into the same `href` slots.

---

## 2. Free additional channels (beyond Fiverr)

These reach buyers who browse marketplaces directly. List the same files there.

### itch.io (best for software, game assets, digital art)
1. Sign up at https://itch.io and create a creator profile.
2. **Dashboard > Create new project** for each product.
3. Set pricing to **Paid** or **Pay what you want**, upload the file, publish.
4. Copy your store/profile URL (e.g. `https://YOURNAME.itch.io`).
5. In `store.html`, replace the side-panel link:
   `<a class="button secondary" href="https://itch.io/" ...>itch.io store</a>`
   with your real itch.io URL.

### Ko-fi (good for e-books, templates, audience building)
1. Sign up at https://ko-fi.com and open **Shop**.
2. Add each digital product (upload file, set price), publish.
3. Copy your Ko-fi URL (e.g. `https://ko-fi.com/YOURNAME`).
4. In `store.html`, replace the side-panel link:
   `<a class="button secondary" href="https://ko-fi.com/" ...>Ko-fi shop</a>`
   with your real Ko-fi URL.

> Optional later (not "free"): Etsy and Creative Market reach large audiences but
> charge listing or transaction fees, so they are intentionally left out of the
> zero-upfront-cost core.

---

## 3. Go-live checklist
1. Replace all `REPLACE-` Payhip links in `store.html`.
2. Replace the itch.io and Ko-fi side-panel URLs (or remove if unused).
3. Confirm prices and product descriptions are correct (and Spanish keys exist
   for any new copy).
4. Preview locally: `python3 -m http.server 8788` then open
   `http://localhost:8788/store.html`.
5. Test the EN/ES toggle and a sample checkout in Payhip test/live mode.
6. Complete `WEBSITE_RELEASE_CHECKLIST.md` with mobile + desktop screenshots.
7. Get explicit approval, then deploy (push to the GitHub Pages repo).

## Privacy / safety notes
- Checkout and card data are handled entirely by the payment platform; the static
  site never sees or stores card details.
- Do not commit Payhip/Stripe/PayPal API keys or secrets to this repo. The store
  needs only public buy-button URLs, which are safe to commit.
