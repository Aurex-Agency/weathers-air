# Weathers Air Conditioning

Production domain: https://weathersair.com. React + Vite + TypeScript, hosted on Vercel.

## Local development and validation

```sh
npm ci
npm run dev
npm run check
npm run preview
```

`npm run check` runs lint, TypeScript, unit/component/API tests, and the production build. Tests mock Resend; they do not send email.

## Crawlable output

`npm run build` builds the client, renders each route through `src/entry-server.tsx`, and generates page-specific HTML, metadata, JSON-LD, `sitemap.xml`, `robots.txt` and `404.html`. `scripts/check-static.mjs` validates titles, canonicals, H1s, schema, internal links, all six article routes and 12 town routes.

Add new routes to both `src/App.tsx` and the route inventory in `src/entry-server.tsx`. Blog routes are generated from `src/data/posts.ts`; location routes from `src/data/locations.ts`. Do not restore the catch-all SPA rewrite: Vercel serves the generated clean URLs and returns 404 for unknown paths. On non-Vercel hosts, configure clean URL resolution and preserve real 404 responses.

The sitemap and robots file are generated from the build origin; do not edit them by hand. Static social metadata is generated for every page. Default origin is `https://weathersair.com`.

## Local service pages

The `/service-areas` hub links to 12 researched pages: Columbus, Starkville, West Point, Aberdeen, Amory, Caledonia, Macon and Louisville in Mississippi; Aliceville, Reform, Vernon and Fayette in Alabama. This first set follows the owner’s roughly 60-mile-radius scope from Columbus (geographic radius, not a driving-time or dispatch guarantee). Tennessee remains in the owner-confirmed three-state coverage copy; no Tennessee town pages are included in this radius.

Each record includes a distinct property/service angle, source URL, preparation checklist, FAQ and related towns. Local facts are drawn from municipal, state and regional sources; conditional HVAC advice is editorial guidance, not evidence of completed projects or affiliation with local institutions. Add owner-supplied job photographs, verified case studies and technician observations when available. Keep the one real Columbus business address; do not fabricate branches. Town CTAs and the mobile call bar preserve location in an editable contact message.

## Resend service requests

`api/contact.ts` is a Vercel Node.js function using the Web Standard fetch handler. Both contact and newsletter-request forms POST to `/api/contact`.

- Sender: `Weathers Air Conditioning <support@team.weathersair.com>`
- Recipient: `mary@weathersairconditioning.com` (fixed server-side)
- Reply-To: the visitor's validated email, if supplied
- Secret: `RESEND_API_KEY`, server only, configured in Vercel
- Public build origin: `VITE_SITE_URL=https://weathersair.com`
- Form path: `VITE_FORM_ENDPOINT=/api/contact`
- Optional preview allowlist: `FORM_ALLOWED_ORIGINS`, comma-separated exact origins

Never put the Resend key in a VITE variable, client code, Git or a report. Verify `team.weathersair.com` in Resend with its required DNS records. A sending domain does not automatically create an inbound support mailbox.

The endpoint validates body size, email, name and phone; rejects other origins and honeypots; uses fixed destinations and an idempotency key; and times out provider requests. Origin checking is not bot authentication. Before production activation, apply a Vercel firewall rate limit to POST `/api/contact` (initial recommendation: 5 requests per IP per minute; tune for legitimate shared networks). Do not rely on per-instance memory counters in serverless functions.

A successful API response means Resend accepted the notification, not that mailbox delivery is proven. Verify one authorized request end to end and check the Resend delivery event and Mary's inbox. Error states must preserve entered information. Newsletter submissions notify the office; they do not silently enroll someone in a marketing list.

`vite dev`/`vite preview` serve the frontend, not Vercel functions. Use `vercel dev` or a deployment with an explicitly allowed preview origin to test the HTTP endpoint; automated endpoint tests run locally without credentials.

## Content

- Business details: `src/lib/business.ts`
- Guides: `src/data/posts.ts` (six articles, sources and related service links)
- FAQ: `src/data/faqs.ts`
- SEO: `src/components/Seo.tsx` and build-time collector `src/lib/seo-context.ts`
- Privacy notice: `src/pages/Privacy.tsx`; review against actual business practices and future analytics changes

Confirm founding year, availability, credentials, service geography, review counts and profile URLs with the owner. Do not invent job examples, price promises or technical reviewer credentials. Update article dates when published or substantively revised, not simply on every build.

## Commerce

The Contractor Commerce plugin loads only on `/shop`, removing the global floating shop widget from landing pages. Confirm the vendor's destination domain and product/cart flows on `weathersair.com`. The shop provides a phone fallback while its catalog loads. Do not test with real purchases without authorization.

## Migration

`vercel.json` redirects legacy `/about-us` and `/contact-us` paths on this project. These rules do not configure the old domain's hosting. The old `weathersairconditioning.com` host still needs page-to-page permanent redirects, including privacy and shop routes; preserve shop fragments and old email DNS. See `audit/website-fix-plan.html` for the full implementation sequence and remaining account tasks.

## Transactional email design

`api/_lib/emails.ts` builds matching HTML and plain-text office notifications and customer confirmations. The HTML uses inline styles and presentation tables, with a navy/blue/amber brand palette and no external-image dependency. Submitted fields are HTML-escaped. Customer confirmations use fixed text and do not forward untrusted names, messages or links to the submitted address.

The office send must be accepted first. A separate receipt then goes to the validated email, with Reply-To set to Mary. Phone-only service requests remain supported. Newsletter receipts acknowledge the request without claiming mailing-list enrollment. Office requests retain the customer Reply-To.

The endpoint returns `confirmation: sent | unavailable | not_requested`; sent means accepted by Resend, not verified inbox delivery. If the customer send fails, the accepted office request remains successful and a `website_confirmation_failed` log records only a hashed request reference. Each send has its own idempotency key for retries in the existing ten-minute window. There is no durable retry queue; monitor Resend and Vercel logs for failed confirmations. The two provider timeouts total 12 seconds, inside the client's 15-second request timeout under normal overhead. Keep the endpoint firewall rate limit in place because user-supplied email addresses are not ownership-verified.

Before release, verify the sending domain and test both messages in real Gmail/Outlook/mobile clients. Local browser previews validate layout, not mailbox delivery or every email client's rendering.

## Google Analytics 4

The Google tag for `G-SPW5VJH2GF` is installed once in `index.html`; prerendering retains it in all page documents. It is not reinjected on React navigation. GA4 owns page views; do not add a second manual route-based page-view sender.

In the GA4 web data stream, confirm **Enhanced measurement → Page views → Advanced settings → Page changes based on browser history events** is enabled so React Router navigation is measured, as described in [Google’s SPA guide](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications). This account setting and receipt in Realtime/DebugView cannot be verified from the build alone. After deployment, check a direct page load and an internal navigation in Tag Assistant/DebugView for one page view each.

No custom conversion events or form values are sent by this change. Do not treat automatically measured form interactions as confirmed leads. The supplied tag runs wherever this build is hosted, including previews; use GA4 data filters or a separate measurement setup when testing to keep production reporting clean.

## Federal contracting content

`/federal-hvac-contracting` provides a dedicated capabilities page and links to the federal HVAC project-scoping guide. The client confirmed federal contractor status and completion of CMMC Level 1 self-assessment and affirmation on October 2, 2026. Wording uses “CMMC Level 1 (Self)”, does not imply third-party certification or Level 2 status, and does not invent assessment dates or system scope. Confirm current status before material future revisions.

Federal inquiries use `/contact?service=federal`, preselect the service category and display a public-information-only notice. Do not collect FCI, CUI or nonpublic project documents through this marketing form or automated email replies.

See `audit/federal-content-review.html` for Google's current guidance, sources, claim boundaries and a plan to add genuine owner/technician evidence. The new guide is planning guidance with an explicitly illustrative inquiry, not a completed-project case study. No approved federal project examples were supplied.
