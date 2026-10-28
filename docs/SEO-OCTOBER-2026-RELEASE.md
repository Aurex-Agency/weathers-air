# October 2026 SEO release

Based on production main 99fba54141576a6df5e316b5537df5e76d416a28. Adds four full guides and three focused service pages for AC repair, heating and maintenance, with homepage/hub discovery and service-selected inquiries. Existing service anchors and location pages remain.

Four guides: heat-pump-cool-air-heating-mode, furnace-not-starting-service-call, compare-heat-pump-replacement-estimates, commercial-rooftop-hvac-maintenance-planning. Safety guidance prioritizes observation, professional diagnosis and emergency escalation. Sources are linked in each article; no invented prices, incentives, response guarantees or rooftop DIY instructions.

Accepted contact delivery emits generate_lead once with form_name only. Phone clicks emit click_to_call as intent, not a confirmed lead. Failed delivery emits neither lead nor success. Concurrent submissions are blocked and failures remain retryable. GA4 loads only on Vercel production builds, preventing preview/local traffic contamination. Keep enhanced measurement and key-event configuration under review to avoid counting generic form_submit or page views as accepted leads.

Security: patched React Router 7.18.5, Vite 7.3.7, Vitest 4.1.12 and compatible transitive dependencies. Typography uses patched selector parser 6.x. Node >=22.12 required. No vulnerability bypass or force downgrade. npm audit reports zero vulnerabilities at release verification.

Validation: lint, TypeScript, form/API and content regression suite, production client/SSR build, 35-page static verification including unique metadata, H1s, canonicals, JSON-LD, internal routes, 10 total articles, 12 existing location pages and noindex 404. Local browser review checks desktop/mobile and inquiry selection without sending real leads.

## Account and operations follow-up

- Old domain weathersairconditioning.com migration is NOT implemented. Confirm domain/hosting control, map legacy URLs to relevant destinations, preserve email/MX records, and review redirect handling before changing DNS or old-site hosting. The current business email uses that domain.
- In GA4, validate generate_lead in production with an authorized real inquiry, then use it as the accepted-lead key event. Call intent is not proof of a connected call or booked job. Do not claim bookings from these events alone.
- Submit the updated sitemap in Google Search Console and Bing Webmaster Tools after merge/deployment; inspect representative new pages. Do not request indexing before production serves them.
- Use 28-day and 90-day landing-page/query reports after sufficient exposure. The small baseline cannot support guaranteed growth or ranking claims. Existing excluded URLs require URL-level inspection, not blanket indexing requests.
- Confirm Google Business Profile services, appointment link and business details with the office. These account edits are not part of the code PR.
