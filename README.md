# GovCon Inc. Static Site (Red / White / Blue)

This is a static HTML/CSS/JS site you can host anywhere (GitHub Pages, Cloudflare Pages, Netlify, S3, etc.).

## 1) Set your Google “Readiness Call” booking link

1. Create a Google Calendar **Appointment schedule** (or use an existing one).
2. Copy the public booking URL.
3. Open `assets/main.js` and replace:

```js
const BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/REPLACE_ME";
```

…with your real booking URL.

The site automatically wires all **Book Readiness Call** buttons via the `data-booking` attribute.

## 2) Update contact info (optional)

In `assets/main.js`, update:

```js
const CONTACT_EMAIL = "info@govcon.info";
const CONTACT_PHONE_TEL = "+18136650308";
```

## 3) Interactive Gantt roadmaps (services timelines)

Roadmaps live in `assets/roadmaps.js` (generated from your roadmap spreadsheet).  
Gantt rendering is in `assets/gantt.js`.

Pages that include interactive timelines:
- `services.html`
- `gsa-mas.html`
- `contract-management.html`
- `consulting.html`

## 4) SEO basics included

- Canonical URLs set to `https://govcon.info/`
- Open Graph + Twitter card tags
- JSON-LD schema for Organization/WebPage (+ Service on service pages)
- `sitemap.xml` + `robots.txt`

If you deploy under a different domain, update `govcon.info` across:
- `sitemap.xml`
- `robots.txt`
- canonical URLs (all pages)

## 5) Deploy

Upload the folder contents as-is to your host.
