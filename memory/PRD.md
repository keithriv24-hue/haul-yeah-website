# PRD — Haul Yeah Moving Marketing Website

## Original problem statement
Fast, SEO-optimized, mobile-first marketing website for **Haul Yeah Moving** — a real licensed & insured local moving company based in Essex County, NJ. Web-first (React frontend + minimal FastAPI backend). No auth, no lead backend. All lead capture via embedded third-party Tally form (formId `kdpE5d`). Brand: navy #0E1F3D + orange #FF6B2C, Archivo + Inter fonts, no pink, no review scores anywhere.

## Business facts
- **Name**: Haul Yeah Moving · **Tagline**: "Weekend moves made easy" / "NJ's weekend movers"
- **Phone**: (862) 250-3216 · tel:+18622503216 · sms:+18622503216
- **Email**: contact@haulyeahmoves.com
- **Hours**: 7 days a week · **Fleet**: 5 insured 26-ft trucks
- **Service area**: Essex County, NJ (no street address — service-area business)
- **Production domain**: https://haulyeahmoves.com (locked constant in `siteConfig.business.baseUrl`)

## Architecture
- **Frontend**: React 19 + React Router v7 + Tailwind + shadcn primitives.
- **Backend**: FastAPI (untouched from starter template beyond the default `/api/` health route).
- **Metadata**: Native React 19 hoisting of `<title>` / `<meta>` / `<link>` / `<script[type=ld+json]>`. Static `<meta name=description>` intentionally NOT included in `public/index.html` (React 19 doesn't dedupe meta[name=description], so a static default would double up on subpages).
- **Data (single source of truth)**:
  - `/app/frontend/src/data/siteConfig.js` — business facts, contact, Tally, branding, images, homepage copy, analytics stub config.
  - `/app/frontend/src/data/services.js` — 10 full service objects (add one → new /services/[slug] page + homepage grid card + footer link).
  - `/app/frontend/src/data/locations.js` — 10 full location objects (add one → new /movers/[slug] page + homepage grid card + footer link).
- **Lead capture**: 3rd-party Tally form `kdpE5d` — iframe embed on homepage + popup via embed.js on every Free Quote button + plain-link fallback to `https://tally.so/r/kdpE5d`.
- **Analytics**: `/app/frontend/src/lib/analytics.js` `trackEvent()` — total no-op until `siteConfig.analytics.measurementId` is set. Wired to Tally popup opens + tel/sms click listener in `Layout.jsx`.

## Site structure
- `/` — Homepage
- `/services/:slug` — 10 full content pages (weekend-movers, same-day-movers, small-moves, apartment-movers, local-movers, long-distance-movers, commercial-movers, packing-services, piano-movers, labor-only-movers)
- `/movers/:slug` — 10 full content town pages (east-orange-nj, newark-nj, montclair-nj, bloomfield-nj, west-orange-nj, orange-nj, irvington-nj, nutley-nj, belleville-nj, jersey-city-nj)
- `*` — 404 page

## What's been implemented

### Phase 1 (Feb 2026)
- Full brand system (navy/orange), Archivo + Inter fonts with `font-display: swap`
- Sticky global header + mobile hamburger + persistent mobile CTA bar
- Homepage with all 10 required sections: hero (asymmetric split w/ inline Tally embed), navy trust bar, 10-card bento services grid, Why Haul Yeah, 10-town locations grid, How It Works, FAQ (6 Qs, always in DOM), navy final CTA band, 4-column footer with NAP
- 20 placeholder inner pages, robots.txt, sitemap.xml, MovingCompany + FAQPage JSON-LD
- 100% pass on testing_agent iteration_1

### Phase 2 (Feb 2026)
- Production domain locked: `siteConfig.business.baseUrl = "https://haulyeahmoves.com"` (canonical, JSON-LD `url`, sitemap all reference this single constant)
- Owner-approved logo mark: `/app/frontend/public/logo.jpg` (534KB) used in header, favicon (`<link rel=icon>` + apple-touch-icon), og:image, twitter:image on every page
- 5 real Haul Yeah crew photos downloaded to `/app/frontend/public/images/photo-1..5.webp`:
  - photo-1 → HERO (smiling mover in truck cab)
  - photo-2 → Final CTA (two movers waving by truck)
  - photo-3 → team image, used on service pages (three-man liftgate crew)
  - photo-4 → Why Haul Yeah (solo mover in front of NJ-plated 26-ft truck)
  - photo-5 → How It Works (two movers with clipboard in truck cab)
- **10 full service pages**: unique title/meta/canonical, single H1, 3 intro paragraphs, "What's included" H2 with 6–7 bulleted benefits, mid-page + final CTA blocks, 3–4 unique FAQs, Service + FAQPage JSON-LD, cross-links to 3 related services + 4 related towns
- **10 full location pages**: unique title/meta/canonical, single H1, unique per-town intro (each mentions genuine local details — brownstones for Montclair, COIs for JC/Newark, hillside driveways for West Orange, etc.), local-touch sidebar with trust pills, highlighted services grid + full services chip list, 2–3 town-specific FAQs, MovingCompany (with narrowed areaServed) + FAQPage JSON-LD, nearby-towns section with 3–4 cross-links, navy final CTA band
- Reusable `FAQAccordion` component (answer always in DOM for SEO)
- Analytics stub wired to Tally popup opens + global tel:/sms: click listener
- SEO fix: removed static `<meta name=description>` from `public/index.html` so React 19's per-page hoisted description is the ONLY description tag on every route
- 97% → 100% pass on testing_agent iteration_2 after the meta-description fix

## Verification
- **Iteration 1** (Phase 1): 100% pass across Tally, FAQ, routing, SEO, mobile.
- **Iteration 2** (Phase 2): 20/20 subpages verified — unique title, single H1, correct canonical to haulyeahmoves.com, Service+FAQPage or MovingCompany+FAQPage JSON-LD, unique intro copy (10/10 services + 10/10 locations), Tally popup opens on click, cross-links resolve, real crew photos load, footer with 10+10 links, robots.txt + sitemap.xml correct, no "stars"/"rated" text anywhere. After fix: exactly 1 `<meta name=description>` per page and it's the correct per-page one.

## Prioritized backlog

### P1 — near-term
- Wire GA4/GTM once the owner supplies a Measurement ID (drop the ID into `siteConfig.analytics.measurementId` and add the loader tag in `public/index.html`)
- Real reviews page (`/reviews` route → link out to Google Business Profile / Yelp / Thumbtack without star scores)
- Replace remaining AI-generated fallback images (packing/apartment scenes on service pages) as owner supplies more real crew photos
- Optimize the logo file (534KB JPEG → resize to 128×128 PNG for favicon + a separate 1200×630 PNG for og:image if owner wants a proper social card preview)

### P2 — future
- Blog / SEO articles (moving tips, cost breakdowns, weekend playbook)
- Instant-estimator widget (rooms → all-in price range → Tally prefill) — deferred by owner
- Multi-language (Spanish) for Newark/Irvington audience

## Files map
- Data files (edit these to change site content):
  - `/app/frontend/src/data/siteConfig.js`
  - `/app/frontend/src/data/services.js`
  - `/app/frontend/src/data/locations.js`
- Owner-supplied assets:
  - `/app/frontend/public/logo.jpg`
  - `/app/frontend/public/images/photo-1..5.webp`
- Public files:
  - `/app/frontend/public/robots.txt`
  - `/app/frontend/public/sitemap.xml`

## Notes
- No auth, no user data, no lead DB — all leads flow to Tally.
- Base URL constant lives in one place; changing it requires updating `siteConfig.business.baseUrl` **and** the `<loc>` entries in the static `sitemap.xml` (leaving as static XML because dev-tooling constraints; a comment in the file points this out).
- Analytics is a stub — nothing fires until the measurement ID is set.
