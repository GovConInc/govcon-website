# GovCon Inc. — Cloudflare Pages Master (Free)

This repo is a **ready-to-deploy Cloudflare Pages** website:
- **White background**, minimalist + modern UI (navy + crimson accents)
- Interactive hover states
- Interactive charts + drilldowns
- **Cloudflare Pages Functions** powering a BigQuery-backed dashboard

## What works out of the box

- If BigQuery credentials are **NOT** configured, `/api/contracts` returns **mock/demo** data so the UI still loads.
- When credentials are configured, `/api/contracts` queries **BigQuery** and returns:
  - Total Government spending
  - Total Small Business spending
  - Unique Small Business vendors
  - Small business type **pie chart** (8(a), HUBZone, SDB, VOSB, WOSB, Small-Other)
  - Quarterly **timeline** (Total vs Small)

## BigQuery target

Defaults are already set in the function code to your table:

- `BQ_PROJECT_ID` default: `govspend1`
- `BQ_TABLE_FQN` default: `govspend1.cc.cc3`
- `BQ_LOCATION` default: `US`

You can still override them as env vars if needed.

## Deploy to Cloudflare Pages (free)

1. Push this repo to GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → Pages → **Import an existing Git repository**
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variables (below).
5. Deploy.

SPA routing is handled via `public/_redirects`.

## BigQuery authentication (keep it private)

You need a **Google Service Account key JSON** (this is the “authorization JSON” you remembered).

Create/download it in GCP:
- IAM & Admin → Service Accounts → (create/select) → Keys → Add key → Create new key → JSON

### Permissions the service account needs
- **BigQuery Job User** (project level)
- **BigQuery Data Viewer** (dataset `cc` or project level)

### Recommended: store the whole JSON as a secret

Cloudflare Pages → Settings → Environment variables → Add a **secret**:

- `GOOGLE_SERVICE_ACCOUNT_JSON` = paste the entire JSON contents

That’s it (table defaults are already set).

### Alternative: split fields

If you prefer split secrets:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `client_email` from the JSON
- `GOOGLE_PRIVATE_KEY` = `private_key` from the JSON

> Private key can be pasted with `\n` line breaks; the function normalizes it.

## Local dev

```bash
npm install
npm run dev
```

If you want local Pages Functions behavior, copy `.dev.vars.example` to `.dev.vars` and fill in secrets (it is gitignored).

## Files you care about

- UI route: `src/routes/Home.tsx`
- Charts: `src/components/SpendingCharts.tsx`
- BigQuery function: `functions/api/contracts.ts`
- RSS: `functions/api/rss.ts`
- Contact capture (KV): `functions/api/contact.ts`

## Notes

- BigQuery can cost money depending on query volume. The API response is cached for 60 seconds to reduce repeated queries.
- The sample schema + demo rows are in `/data/` (for reference only).
