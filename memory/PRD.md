# PRD — Haul Yeah Moving Marketing Website

## Original problem statement
Build a fast, SEO-optimized, mobile-first marketing website for **Haul Yeah Moving** — a real licensed & insured local moving company based in Essex County, New Jersey. Web-first (React frontend + minimal FastAPI backend). No auth, no custom lead backend, no DB CRUD. All lead capture goes through an embedded third-party Tally form (formId `kdpE5d`). Brand: navy #0E1F3D + orange #FF6B2C, Archivo + Inter fonts, no pink, no review scores anywhere.

## Business facts (locked)
- **Name**: Haul Yeah Moving · **Tagline**: "Weekend moves made easy" / "NJ's weekend movers"
- **Phone**: (862) 250-3216 → `tel:+18622503216` / `sms:+18622503216`
- **Email**: contact@haulyeahmoves.com
- **Hours**: 7 days a week
- **Fleet**: 5 insured 26-ft trucks
- **Service area**: Essex County, NJ (no street address — service-area business)

## User personas
1. **Weekend mover** — needs a Saturday/Sunday slot, wants a fast quote.
2. **Last-minute / same-day mover** — texts a request, needs a reply in minutes.
3. **Small-move customer** — one sofa, a studio apartment.
4. **Homeowner / long-distance mover** — planning a bigger move 2–4 weeks out.
5. **Local searcher** — Googles "movers in Newark NJ" / "weekend movers NJ" / "affordable movers NJ".

## Core requirements (static, locked)
- 100% content via `siteConfig.js` (non-devs can edit)
- Tally: inline iframe embed in hero + popup on all other Free Quote buttons + plain-link fallback
- No review scores / no star ratings anywhere in DOM
- Exactly one `<h1>` per page, unique title + meta description
- JSON-LD: `MovingCompany` + `FAQPage`
- `/robots.txt` and `/sitemap.xml` with all 21 URLs
- Every page must be reachable (no 404s from homepage links)
- `data-testid` on every interactive element
- Mobile-first responsive, excellent CWV (lazy images, minimal JS, no heavy anim libs)

## Architecture (Phase 1)
- **Frontend**: React 19 + React Router v7 + Tailwind + shadcn primitives (only Accordion pattern used; built with `<details>`-style disclosure buttons). Metadata via React 19's built-in `<title>`/`<meta>` hoisting.
- **Backend**: FastAPI (untouched from starter template beyond the default `/api/` health route)
- **Data**: `/app/frontend/src/data/siteConfig.js` — single source of truth
- **Lead capture**: 3rd-party Tally form `kdpE5d` — iframe embed (`https://tally.so/embed/kdpE5d?…`) + popup script (`https://tally.so/widgets/embed.js`) with plain-link fallback to `https://tally.so/r/kdpE5d`

## Site structure
- `/` — Homepage (10 sections)
- `/services/:slug` — 10 placeholder pages (weekend-movers, same-day-movers, small-moves, apartment-movers, local-movers, long-distance-movers, commercial-movers, packing-services, piano-movers, labor-only-movers)
- `/movers/:slug` — 10 placeholder pages (east-orange-nj, newark-nj, montclair-nj, bloomfield-nj, west-orange-nj, orange-nj, irvington-nj, nutley-nj, belleville-nj, jersey-city-nj)
- `*` — 404 page

## What's been implemented — Phase 1 (Feb 2026)
- Full brand system (tokens in `tailwind.config.js` + Archivo/Inter loaded with `font-display: swap`)
- Sticky global header with logo, desktop nav, hours indicator, phone CTA, orange Free Quote popup button; mobile hamburger + persistent mobile bottom bar (Call + Free Quote)
- Homepage — all 10 required sections rendered:
  1. Hero (asymmetric split, inline Tally embed card, sms secondary CTA, hero image with white-fade gradient)
  2. Navy trust bar (4 factual badges, no stars)
  3. Services grid (10 cards, bento layout with featured navy card)
  4. Why Haul Yeah (4 value props + fleet image + numeric stats)
  5. Locations (10 town cards linking to placeholders)
  6. How It Works (3 steps with big Archivo step numbers)
  7. FAQ (6 verbatim Q&As — answers always rendered in DOM for SEO, sr-only when collapsed)
  8. Final CTA band (navy background, orange button, phone + sms fallback)
  9. Full footer (brand + NAP, all 10 services, all 10 locations, nav)
  10. Fixed mobile CTA bar
- 20 inner routes as placeholder pages (no 404s), each with correct `<title>`/`<meta>`/canonical
- JSON-LD: `MovingCompany` + `FAQPage` rendered on homepage
- `public/robots.txt` + `public/sitemap.xml` with all 21 URLs
- `/app/memory/test_credentials.md` (no-auth notice)

## Verification
- Testing subagent: 100% pass rate (iteration_1.json). Confirmed: Tally inline iframe loads, Tally popup opens on click, FAQ accordion toggles (all Q&A always in DOM), all 20 placeholder routes render, no console errors, no "stars"/"rated" text, mobile menu open/close, mobile CTA bar with call + quote, robots.txt + sitemap.xml serve 200 with correct content.

## Prioritized backlog

### P0 — Phase 2 (must-have next)
- Fill in 10 service pages with real long-form content (H1 per page, service-specific FAQs, JSON-LD `Service` schema, image, per-page Tally CTA blocks)
- Fill in 10 location pages with real neighborhood copy (H1 per town, town-specific FAQs, embedded Google map, JSON-LD `LocalBusiness` schema with `areaServed=<Town>`, driving-time from HQ, per-town Tally CTA)

### P1 — near-term
- Real production `baseUrl` in `siteConfig.js` + regenerate `sitemap.xml` when domain flips
- Fonts: self-host Archivo/Inter or preload critical subsets for even better LCP
- OpenGraph image (`og:image`) with brand logo + tagline (currently reuses hero photo)
- Reviews page (`/reviews`) that links out to Google Business Profile / Yelp / Thumbtack **without** rendering star scores (owner rule)
- Optional: Google Tag Manager + GA4 event on Tally popup open + phone click

### P2 — future
- Blog / SEO articles (moving tips, cost breakdowns, weekend playbook)
- Referral flow (share code, dollar-off next move)
- Instant estimator widget (rooms → all-in range) as a lead magnet

## Design system reference
See `/app/design_guidelines.json` and `/app/frontend/tailwind.config.js`.

## Notes
- No auth. No lead DB. All submissions go directly to Tally.
- All editable copy lives in `/app/frontend/src/data/siteConfig.js` — a non-developer can safely edit it.
- The `MOCKED` list is empty. There are no mocked APIs.
