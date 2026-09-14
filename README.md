# Weathers Air Conditioning — Website

Marketing site for **Weathers Air Conditioning**, Columbus, MS. HVAC, plumbing and electrical service for the Golden Triangle.

Live: https://weathers.aurexagency.com

## Stack

- [Vite](https://vitejs.dev) + [React 18](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) with brand tokens in `src/index.css`
- [React Router](https://reactrouter.com) (client-side routing, lazy-loaded pages)
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals (respects `prefers-reduced-motion`)
- [Radix UI](https://www.radix-ui.com) primitives for the mobile drawer (shadcn-style components in `src/components/ui`)
- [Vitest](https://vitest.dev) + Testing Library

## Getting started

```sh
npm install
cp .env.example .env   # optional, see Configuration
npm run dev            # http://localhost:8080
```

Other scripts:

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run build`     | Production build to `dist/`                   |
| `npm run preview`   | Serve the production build locally            |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | TypeScript, no emit                           |
| `npm test`          | Vitest (unit + component tests)               |
| `npm run check`     | Lint, typecheck, test and build in one go     |

CI runs `npm run check` on every pull request (`.github/workflows/ci.yml`).

## Configuration

Environment variables are read at build time (Vite `VITE_*` prefix). Set them in `.env` locally or in your host's project settings.

| Variable             | Purpose                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_FORM_ENDPOINT` | Where the contact form and footer newsletter POST their JSON. Works with [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com), Basin, or your own function. **If unset, the form falls back to opening a pre-filled email** to the business address, so nothing is silently lost. |
| `VITE_SITE_URL`      | Canonical origin (no trailing slash). Used for canonical tags, Open Graph URLs and schema.org markup. Defaults to `https://weathers.aurexagency.com`.                       |

### Form payload

Both forms send `application/json`:

```json
{
  "form": "contact",            // or "newsletter"
  "subject": "Service request from Jane Doe (Plumbing)",
  "name": "Jane Doe",
  "phone": "6625551234",
  "email": "jane@example.com",
  "serviceType": "Plumbing",
  "contactMethod": "phone",
  "message": "…",
  "page": "https://…/contact",
  "submittedAt": "2026-09-14T15:04:05.000Z"
}
```

A hidden honeypot field (`company`) is dropped client-side; bots that fill it are ignored.

## Editing content

- **Business details** (phone, address, hours, licences, social profiles, review counts): `src/lib/business.ts`. Every page, the footer, the schema markup and the sitemap read from here.
- **FAQ** (also emitted as `FAQPage` structured data): `src/data/faqs.ts`
- **Reviews**: `src/pages/Reviews.tsx` and the three featured on `src/pages/Index.tsx`
- **Service copy**: `src/pages/Services.tsx`
- **Images**: `src/assets/*.webp` (imported, hashed by Vite). `public/` holds the favicon, `logo.png`, `og-image.jpg`, `robots.txt` and `sitemap.xml`.

If you add a page, register it in `src/App.tsx` and add it to `public/sitemap.xml`.

## SEO

- Per-route `<title>`, description, canonical and Open Graph tags via `src/components/Seo.tsx`
- `HVACBusiness` / `Plumber` / `Electrician` local business schema, `FAQPage` and `BreadcrumbList` JSON-LD (`src/lib/schema.ts`)
- `public/sitemap.xml`, `public/robots.txt`, `public/site.webmanifest`

## Shop

`/shop` embeds the Contractor Commerce storefront. The plugin script is loaded in `index.html` and re-run when the shop route mounts (`src/pages/Shop.tsx`). Navigation links to `/shop` deliberately do a full page load so the third-party script always initialises cleanly.

## Deploying

This is a static single-page app: build with `npm run build` and serve `dist/`. All routes must fall back to `index.html`:

- **Vercel**: `vercel.json` already contains the rewrite and long-lived cache headers for hashed assets.
- **Netlify**: `public/_redirects` is included.
- **Other hosts**: add an equivalent "serve `index.html` for unknown paths" rule.

Set `VITE_FORM_ENDPOINT` in the host's environment before building so the contact form submits somewhere real.
