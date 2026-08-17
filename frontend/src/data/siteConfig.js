/*
 * siteConfig.js
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for site-wide business data & branding.
 *
 * • Service and location page content lives in their OWN data files:
 *     /app/frontend/src/data/services.js
 *     /app/frontend/src/data/locations.js
 *   Add a service or a town by adding one object in that file — this
 *   creates the page and the internal links automatically. Then add
 *   one line in /app/frontend/public/sitemap.xml so crawlers see it.
 *
 * • A non-developer can safely edit any value below to change copy.
 *   Do NOT rename keys — components read from these exact names.
 *
 * ⚠ PRICING: every number a customer can see comes from the `pricing`
 *   and `terms` blocks below. They are derived from the owner's quote
 *   formula and package sheet. If the formula changes, change it HERE —
 *   do not hand-edit prices into page copy, or the site and the phone
 *   script will drift apart and customers will argue the difference on
 *   move day.
 * ─────────────────────────────────────────────────────────────
 */

const siteConfig = {
  business: {
    name: "Haul Yeah Moving",
    shortName: "Haul Yeah",
    tagline: "Weekend moves made easy",
    secondaryTagline: "NJ's weekend movers",
    fleet: "Box trucks from 16 ft to 26 ft — the right size for every move.",
    // ⚠ HOURS — READ BEFORE EDITING.
    // We ANSWER seven days a week. We MOVE Saturdays and Sundays.
    // The trucks run other work Monday–Friday, so weekday moving capacity is
    // not something we can promise on a website. The old copy said "Open 7
    // days a week", which reads as "you can book me for a Tuesday" and turns
    // into a cancelled job and a one-star review. Keep these two ideas
    // separate in every string below.
    hoursShort: "We answer 7 days · we move weekends",
    hoursLong:
      "Phones answered seven days a week. Moves run Saturdays and Sundays.",
    movingDays: "Saturdays & Sundays",
    weekdayNote:
      "Need a weekday? Ask — we take them when a truck is free, but weekends are what we staff for.",
    serviceArea: "Essex County, NJ",
    napLine: "Haul Yeah Moving · Essex County, NJ · (862) 250-3216",
    // Production domain. Change here + regenerate /public/sitemap.xml
    // if the domain ever changes. This value is the ONE source used
    // for canonical URLs, JSON-LD `url` fields, and og:url meta tags.
    baseUrl: "https://www.haulyeahmoves.com",
  },

  branding: {
    // The header no longer renders a logo image — the Archivo Black wordmark
    // is the mark. logo.webp is kept for favicons; logo.jpg for schema.org.
    logoPath: "/logo.webp",
    logoSchemaPath: "/logo.jpg",
    logoAlt: "Haul Yeah Moving logo",
    faviconPath: "/logo.webp",
    // Social share card. MUST be 1200x630.
    ogImagePath: "/images/og-cover.jpg",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    ogImageAlt:
      "Haul Yeah Moving crew at the open box of a 26-ft moving truck in Essex County, NJ",
  },

  contact: {
    phoneDisplay: "(862) 250-3216",
    phoneTel: "+18622503216", // used for tel: and sms: links
    email: "contact@haulyeahmoves.com",
    responseTime: "under 5 minutes",
  },

  /* ─────────────────────────────────────────────────────────────
   * PRICING — what the customer sees.
   *
   * These are HAUL YEAH's own package prices, not generic NJ market
   * ranges. They come straight off the owner's package sheet and quote
   * formula so the website, the phone script and the Square invoice all
   * say the same number.
   *
   * Publishing real prices is deliberate: it filters out the shoppers
   * looking for a $300 move before they ever occupy a phone slot, and it
   * removes the "that's more than I expected" moment from the close.
   *
   * Every package price ALREADY INCLUDES truck, fuel, blankets, dollies,
   * straps, and the first 20 miles round trip — that is what makes the
   * "all-in" promise true. Only the `addOns` below can move the number,
   * and they are all quoted up front, before the deposit.
   * ───────────────────────────────────────────────────────────── */
  pricing: {
    heading: "What it costs",
    subheading:
      "Our actual price bands — published, not hidden behind a form. Your exact number is quoted per job, in writing, before you pay a deposit.",

    packages: [
      {
        label: "Small move — studio or 1BR",
        detail: "2 movers + truck",
        price: "From $650",
      },
      {
        label: "Standard move — 2–3BR",
        detail: "3 movers + truck",
        price: "$1,100–$1,400",
      },
      {
        label: "Large or specialty — 3–4BR, piano, office",
        detail: "4 movers + truck",
        price: "$2,200–$3,000+",
      },
      {
        label: "Labor only — you supply the truck",
        detail: "2-hour minimum",
        price: "$130–$180/hr",
      },
    ],

    // Rendered as the "included" list — this is the all-in promise, itemised.
    included: [
      "The truck, the fuel and the tolls",
      "Blankets, shrink wrap, dollies and straps",
      "First 20 miles round trip",
      "Disassembly and reassembly of standard furniture",
    ],

    // The ONLY things that can change your number, all quoted up front.
    addOns: [
      { label: "Stairs, per flight", price: "$75–$100" },
      { label: "Mileage over the first 20 mi", price: "$0.85/mi" },
      { label: "Upright piano", price: "$400–$600" },
      { label: "Grand piano", price: "$600–$1,200" },
      { label: "Safe, gym equipment, oversized items", price: "$400–$600" },
      { label: "Packing service and materials", price: "Quoted per job" },
    ],

    // Peak pricing, stated plainly. We DO charge more for the dates everyone
    // wants — pretending otherwise would break the "no surprises" promise the
    // moment a customer compared a Saturday quote to a Wednesday one.
    peakNote:
      "Saturdays, Sundays and the last few days of the month are peak — those slots are priced higher than a mid-week job, and the weekend rate is already inside the number we quote you. Nothing gets added on move day.",

    fineprint:
      "These are our real price bands, not a teaser. A quote that comes in dramatically below them is usually planning to make the difference back with hourly extras and a \"truck fee\" once your furniture is already on the truck.",
  },

  /* ─────────────────────────────────────────────────────────────
   * TERMS — minimums, deposit, cancellation, damage.
   *
   * ⚠ These are contractual claims. Every one of them is something a
   * customer can hold us to, and two of them used to be wrong:
   *
   *   • The site advertised "no minimum-hour trap" on small moves while
   *     the business actually runs a 3-hour minimum on any job with a
   *     truck. That is a dispute waiting to happen on the doorstep.
   *   • The site advertised a "Damage-Free Guarantee". NJ movers default
   *     to released-value coverage (about $0.60/lb per article) unless
   *     the customer buys full-value protection. Advertising a guarantee
   *     we do not underwrite is the kind of sentence that gets read back
   *     to us in small-claims court.
   *
   * Fix the business first, then the copy — never the other way round.
   * ───────────────────────────────────────────────────────────── */
  terms: {
    minimumTruck: "3 hours",
    minimumLabor: "2 hours",
    minimumLine:
      "3-hour minimum on any job with a truck, 2-hour minimum on labor-only.",
    depositPercent: "25%",
    cancellationWindow: "72 hours",
    depositLine:
      "A 25% deposit locks your date; the balance is due when the job is done. Cancel 72 or more hours before your slot and the deposit is refunded in full.",
    // Careful-handling promise. NOT the word "guarantee".
    damageLine:
      "Blankets, straps and floor runners on every job. If we damage something, we make it right.",
    valuationLine:
      "Basic coverage is included at the standard NJ released-value rate. Ask us about full-value protection if you're moving something you couldn't replace.",
  },

  tally: {
    formId: "kdpE5d",
    embedUrl:
      "https://tally.so/embed/kdpE5d?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    fallbackUrl: "https://tally.so/r/kdpE5d",
    scriptUrl: "https://tally.so/widgets/embed.js",
  },

  analytics: {
    measurementId: "G-E5STH1G8FF",
    // Meta (Facebook) Pixel — base snippet lives in public/index.html <head>.
    // Client-side navigation PageView events fire from Layout.jsx.
    metaPixelId: "1913145279380964",
  },

  reviews: {
    // ── MASTER SWITCH ────────────────────────────────────────────────
    // false = render the "new business, here's how to vet us" trust block.
    // true  = render the Trustindex Google widget.
    enabled: true,
    trustindexWidgetId: "bcaf63578df98153d6860e9d810",
    googleReviewLink: "https://g.page/r/CVhCBro8FWmNEBM/review",
    heading: "What our customers say",
    subheading: "Real reviews from real Essex County moves.",

    // Shown when `enabled: false`. Deliberately says "we're new" out loud —
    // owning it converts better than an empty five-star widget, and we do
    // not fabricate reviews or credentials at any stage.
    preLaunch: {
      kicker: "Straight talk",
      heading: "We're new. Check us out anyway.",
      body:
        "We're building our Google reviews one move at a time, and we'd rather say that than show you testimonials we made up. Until they stack up, judge us on the things you can verify before you pay anything.",
      points: [
        {
          title: "A written number before you book",
          description:
            "You get the all-in price in writing — line by line — before any deposit changes hands.",
        },
        {
          title: "25% deposit, refundable 72 hours out",
          description:
            "The deposit locks your date and the balance is due on completion. Cancel 72 or more hours ahead and it comes back in full.",
        },
        {
          title: "You talk to the owner",
          description:
            "Not a call center. The person quoting your move is the person answering for it on move day.",
        },
        {
          title: "Real trucks, real crew",
          description:
            "The photos on this site are our own fleet and our own movers — not stock images.",
        },
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────────
   * COMPLIANCE — regulator-issued numbers.
   *
   * READ THIS BEFORE EDITING:
   * Every field below renders ONLY when it is a non-empty string. Leave a
   * value as "" until the number is actually issued. Do not put a
   * placeholder, an "applied for" note, or a partner's number here.
   *
   * njMoverLicense — NJ Division of Consumer Affairs Public Mover licence.
   *   Required to operate as an intrastate household-goods mover in NJ, and
   *   NJ requires the licence number to appear in advertising. This website
   *   is advertising. STATUS: applied for, not yet issued (16 Aug 2026).
   *   The moment the PM number arrives, paste it here — it renders in the
   *   footer and on /about/ automatically, everywhere it needs to.
   *
   * usDot / mcNumber — FMCSA interstate operating authority. Required before
   *   any interstate (state-to-state) household-goods move is advertised or
   *   performed. /services/long-distance-movers is 301'd in public/_redirects
   *   until BOTH of these exist and render here.
   * ───────────────────────────────────────────────────────────── */
  compliance: {
    njMoverLicense: "",
    usDot: "",
    mcNumber: "",
    prefixLabel: "NJ Public Mover Lic.",
  },

  nav: [
    { label: "Services", href: "/#services" },
    { label: "Why us", href: "/#why" },
    { label: "Cost", href: "/#cost" },
    { label: "Towns", href: "/#locations" },
    { label: "About", href: "/about/" },
  ],

  hero: {
    kicker: "Essex County, NJ · Weekend movers",
    h1Lead: "New Jersey's",
    h1Mid: "weekend movers",
    h1Accent: "booked in minutes",
    subhead:
      "Apartments, small loads, same-day jobs and the Saturday move nobody else would take. An all-in price in writing before you put a deposit down.",
    formCardTitle: "Get an all-in price",
    formCardSubtitle: "Takes 30 seconds · answered in under 5 minutes",
    secondaryCta: "Or text us for a same-day quote",
    imageUrl: "/images/crew-open-truck-box.webp",
    imageAlt:
      "Haul Yeah Moving three-man crew at the open box of a 26-ft moving truck in Essex County NJ",
    // Small stat strip under the H1.
    stats: [
      { label: "Fleet", value: "16–26 ft" },
      { label: "We move", value: "Sat & Sun" },
      { label: "Quote back", value: "< 5 min" },
    ],
  },

  // Marquee strip under the hero.
  marquee: [
    "Weekend movers",
    "Essex County NJ",
    "All-in pricing",
    "Same day",
    "Small moves from $650",
    "(862) 250-3216",
  ],

  trustBadges: [
    "Trucks from 16–26 ft",
    "Saturdays & Sundays",
    "Reply in under 5 minutes",
  ],

  whyUs: [
    {
      title: "Response in under 5 minutes",
      description:
        "Text or call and you'll hear back before your coffee's cold. No waiting three days for a callback.",
    },
    {
      title: "Transparent all-in pricing",
      description:
        "The number you get is the number you pay. Truck, fuel, blankets and the first 20 miles are already in it — no fuel fee, no truck fee invented on move day.",
    },
    {
      title: "True weekend availability",
      description:
        "Saturday and Sunday are what we staff for, not what we squeeze you into. Weekend slots are the whole point of this company.",
    },
    {
      title: "We handle it, and we own it",
      description:
        "Blankets, straps, floor runners and a fleet of 16–26 ft trucks driven by pros. If we damage something, we make it right.",
    },
  ],

  whyImage: {
    url: "/images/mover-crossed-arms-nj-truck.webp",
    alt: "Haul Yeah mover standing arms-crossed in front of a New Jersey-plated 26-ft moving truck in Essex County",
  },

  howItWorksImage: {
    url: "/images/crew-inside-truck-pallet.webp",
    alt: "Haul Yeah Moving crew loading a wooden pallet with a pallet jack inside a 26-ft moving truck",
  },

  finalCtaImage: {
    url: "/images/movers-high-five.webp",
    alt: "Two Haul Yeah movers high-fiving after a successful New Jersey move",
  },

  teamImage: {
    url: "/images/crew-liftgate-safety-vest.webp",
    alt: "Haul Yeah Moving three-man crew posed on the liftgate of a 26-ft moving truck, with the middle crew member in a safety vest",
  },

  howItWorks: [
    {
      step: "01",
      title: "Get a quote",
      description:
        "Send us a few details. We'll text back an all-in price in under 5 minutes — no site visit, no sales call.",
    },
    {
      step: "02",
      title: "Lock your date",
      description:
        "A 25% deposit holds your slot; the balance is due when the job is done. Cancel 72+ hours out and the deposit is refunded in full. Weekends fill fast.",
    },
    {
      step: "03",
      title: "We show up on time",
      description:
        "Blankets, dollies, straps and floor runners. We wrap, load, drive, unload — done.",
    },
  ],

  faqs: [
    {
      q: "How much do movers cost in New Jersey?",
      a: "Across NJ, most local moves are billed at roughly $60–$65 per mover per hour with a truck, which puts a two-mover crew around $125–$130 an hour and a three-mover crew around $180–$190. Haul Yeah quotes a flat all-in number instead: small moves (studio or 1BR) start at $650, a 2–3BR runs $1,100–$1,400, and a 3–4BR or specialty job runs $2,200–$3,000+. Those prices already include the truck, fuel, blankets, equipment and the first 20 miles round trip. Stairs ($75–$100 a flight), pianos ($400–$1,200) and mileage past 20 miles are the only things that move the number, and we quote them before you pay a deposit.",
    },
    {
      q: "Is there a minimum charge?",
      a: "Yes, and we'd rather tell you now than on the doorstep. Any job with a truck has a 3-hour minimum, and labor-only jobs have a 2-hour minimum. That's why a small move starts at $650 rather than an hourly rate that looks cheap and then runs. What we don't do is put you on a 4-hour clock and pad it — you get a flat number up front and that's the number you pay.",
    },
    {
      q: "How much is the deposit, and can I get it back?",
      a: "A 25% deposit locks your date and the balance is due when the job is finished. If you cancel 72 or more hours before your slot, the deposit is refunded in full. We ask for a deposit because a weekend slot we hold for you is a slot we turned someone else away from — but a deposit should never be a hostage, which is why the refund window is stated here in writing rather than buried.",
    },
    {
      q: "Do Haul Yeah movers work on weekends?",
      a: "Weekends are the whole business. We move Saturdays and Sundays and we staff crews for it, so you get real availability instead of a 'we'll try to fit you in' answer. Same-day and last-minute weekend bookings are genuinely doable — call or text (862) 250-3216 and we'll tell you what's open. If you need a weekday, ask: we take those when a truck is free, but weekends are what we plan around.",
    },
    {
      q: "What is the cheapest day to hire movers?",
      a: "Mid-week is the cheapest across the NJ market, because demand is lower — weekends and the first and last days of a month are the most expensive everywhere, including here. We won't pretend otherwise: our Saturday and Sunday slots are priced higher than a mid-week job would be, and that weekend rate is already inside the number we quote you rather than added on move day. If your dates are flexible and price is the deciding factor, tell us — we'll be straight with you about what a mid-week slot would save.",
    },
    {
      q: "What are red flags when hiring movers?",
      a: "No written estimate, cash-only demands, a deposit that isn't refundable under any circumstances, no NJ Public Mover licence number for an intrastate move, no USDOT or MC number for an interstate one, no real business presence, and reviews that all sound identical. If a quote comes in dramatically below everyone else's, they're usually planning to make the difference back with hourly extras and a 'truck fee' once your furniture is already loaded.",
    },
    {
      q: "How far in advance should I book a mover?",
      a: "For a weekend or end-of-month move in NJ, aim for 2–4 weeks — those are the slots that go first, and they're the ones we sell out of. Last-minute and same-day still work more often than people expect, so it's always worth texting us to see what's open before you assume it's gone.",
    },
    {
      q: "What's the most affordable moving company in NJ?",
      a: "'Most affordable' depends on the move — a studio, a 3BR house, a labor-only load and a weekend job all price differently, so a single 'cheapest mover' answer is usually marketing. What we can tell you is exactly what we charge: from $650 for a small move, $1,100–$1,400 for a 2–3BR, all-in, with no fuel or truck fee bolted on afterwards. Text us the details and we'll send a real number in under 5 minutes so you can compare like for like.",
    },
  ],

  finalCta: {
    heading: "Ready to move?",
    headingAccent: "Haul Yeah you are.",
    subhead:
      "Call, text, or send the details — we're on it. Weekend slots go first.",
  },

  seo: {
    homepage: {
      title: "Movers in Essex County, NJ | Weekend & Same-Day | Haul Yeah",
      description:
        "Weekend movers in Essex County NJ. Small moves from $650, 2–3BR $1,100–$1,400, all-in pricing with no hidden truck or fuel fees. Free quote in under 5 minutes.",
    },
  },
};

export default siteConfig;
