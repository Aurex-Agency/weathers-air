# SEO and schema review, 2026-10-16

Location and federal Service schemas now reuse the complete shared HVACBusiness provider, including its existing address. Removed undocumented $$ priceRange.

Based on the verified Vercel production source `main` at `0aa2969e7002`. Reviewed existing SEO work before making this focused follow-up.

Validation: full npm run check: lint, typecheck, tests, build, prerender and static checks. The built-page validator parsed 46 JSON-LD blocks across 29 HTML files using the official Schema.org vocabulary and found no issues in the implemented checks. Representative homepage checks at desktop and mobile widths found no horizontal overflow, with primary conversion paths present. No production lead was submitted.

Remaining dependencies: Confirm federal qualification claims and current service area before expanding copy. Investigate zero users in the GA4 last-7-days overview against actual recent activity.

This PR is independently reviewable. After release, recrawl production and recheck Search Console; local validation does not guarantee Google indexing or rich-result display.
