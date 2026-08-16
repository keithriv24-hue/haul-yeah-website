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
 * ─────────────────────────────────────────────────────────────
 */

const siteConfig = {
  business: {
    name: "Haul Yeah Moving",
    shortName: "Haul Yeah",
    tagline: "Weekend moves made easy",
    secondaryTagline: "NJ's weekend movers",
    fleet: "trucks from 16 ft to 26 ft — the right size for every move",
    hoursShort: "7 days a week",
    hoursLong: "Open 7 days a week",
    serviceArea: "Essex County, NJ",
    napLine: "Haul Yeah Moving · Essex County, NJ · (862) 250-3216",
    // Production domain. Change here + regenerate /public/sitemap.xml
    // if the domain ever changes. This value is the ONE source used
    // for canonical URLs, JSON-LD `url` fields, and og:url meta tags.
    baseUrl: "https://www.haulyeahmoves.com",
  },

  branding: {
    // Owner-approved logo mark. The header renders it at 40x40, so it is
    // served as a 192px webp (~8KB). The full-resolution 1024px logo.jpg
    // (~534KB) used to be the header image on EVERY page — 31% of total page
    // weight for a 40px icon. Keep logo.jpg for structured data only.
    logoPath: "/logo.webp",
    // Full-resolution mark for schema.org / rich results. Not loaded by
    // visitors — crawlers only.
    logoSchemaPath: "/logo.jpg",
    logoAlt: "Haul Yeah Moving logo",
    faviconPath: "/logo.webp",
    // Social share card. MUST be 1200x630 — this was /logo.jpg (a square
    // logo) which rendered as a broken-looking crop in every Facebook,
    // iMessage and WhatsApp preview and in Meta ad link previews.
    // Regenerate from a real crew photo if the branding changes.
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

  tally: {
    formId: "kdpE5d",
    embedUrl:
      "https://tally.so/embed/kdpE5d?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    fallbackUrl: "https://tally.so/r/kdpE5d",
    scriptUrl: "https://tally.so/widgets/embed.js",
  },

  analytics: {
    // Owner will supply a GA4 Measurement ID later. While this is an
    // empty string, /app/frontend/src/lib/analytics.js trackEvent()
    // is a total no-op — no requests fire, no console noise.
    // Example future value: "G-XXXXXXXXXX"
    measurementId: "G-E5STH1G8FF",
    // Meta (Facebook) Pixel — the base pixel snippet lives in
    // /app/frontend/public/index.html <head>. This ID is stored here
    // for one-place editing / reference. Client-side navigation
    // PageView events fire from Layout.jsx via useLocation.
    metaPixelId: "1913145279380964",
  },

  reviews: {
    // ── MASTER SWITCH ────────────────────────────────────────────────
    // false = the Reviews section renders the "new business, here's how to
    //         vet us" trust block instead of an empty widget.
    // true  = the Trustindex Google widget renders.
    //
    // FLIP THIS TO true ONLY WHEN YOU HAVE 3+ LIVE GOOGLE REVIEWS.
    // With 0 reviews the widget paints an empty box under a heading that
    // promises "Real reviews from real Essex County moves" — which reads
    // worse to a customer than having no reviews section at all.
    enabled: true,
    // Paste the Trustindex widget ID from the embed code they give you
    // (looks like "abc123def456"). While this is an empty string, the
    // section renders a graceful placeholder instead of the widget.
    trustindexWidgetId: "bcaf63578df98153d6860e9d810",
    // NOTE: The Trustindex loader script is loaded ONCE globally via
    // /app/frontend/public/index.html so SPA route changes never have to
    // re-load it. The component (GoogleReviews.jsx) fetches the widget's
    // content.html from the Trustindex CDN and hands it to the loader's
    // TrustindexWidget class to activate — this avoids a race where the
    // widget failed to paint after two consecutive client-side navigations.
    // Your Google "leave a review" short link (g.page/r/...), used by the
    // "Leave us a review" button. Paste it when you have it.
    googleReviewLink: "https://g.page/r/CVhCBro8FWmNEBM/review",
    heading: "What our customers say",
    subheading: "Real reviews from real Essex County moves.",

    // Shown when `enabled: false`. Deliberately says "we're new" out loud —
    // owning it converts better than an empty five-star widget, and we do
    // not fabricate reviews or credentials at any stage.
    preLaunch: {
      kicker: "Straight talk",
      heading: "We're new. Here's how to check us out anyway.",
      body:
        "We're building our Google reviews one move at a time, and we'd rather say that than show you testimonials we made up. Until they stack up, judge us on the things you can verify before you pay anything.",
      points: [
        {
          title: "A written number before you book",
          description:
            "You get the all-in price in writing — line by line — before any deposit changes hands.",
        },
        {
          title: "Refundable deposit",
            description:
            "The deposit holds your date. Cancel outside our stated window and it comes back to you.",
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
   *   is advertising.
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
    // Rendered in the footer above the copyright when any number is present.
    prefixLabel: "NJ Public Mover Lic.",
  },

  nav: [
    { label: "Moving", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Locations", href: "/#locations" },
    { label: "About", href: "/about/" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
  ],

  hero: {
    kicker: "NJ's Weekend Movers",
    h1: "New Jersey's Weekend Movers — Booked in Minutes.",
    subhead:
      "Affordable local moving in Essex County. Get an all-in quote fast.",
    formCardTitle: "Get My Free Quote",
    formCardSubtitle: "Response in under 5 minutes.",
    secondaryCta: "Or text us for a same-day quote",
    // Real Haul Yeah crew photo (swap the file at /app/frontend/public/images/ to update).
    imageUrl: "/images/crew-open-truck-box.webp",
    imageAlt:
      "Haul Yeah Moving three-man crew at the open box of a 26-ft moving truck in Essex County NJ",
  },

  trustBadges: [
    "Trucks From 16–26 ft",
    "7 Days a Week",
    "Response in Under 5 Minutes",
  ],

  whyUs: [
    {
      title: "Response in Under 5 Minutes",
      description:
        "Text or call and you'll hear back before your coffee's cold. No waiting three days for a callback.",
    },
    {
      title: "Transparent All-In Pricing",
      description:
        "The number you get is the number you pay. No mystery fuel fees, no truck-fee surprise on move day.",
    },
    {
      title: "True Weekend Availability",
      description:
        "Saturday and Sunday moves are our specialty — not our exception. 7 days a week, actually staffed.",
    },
    {
      title: "Damage-Free Guarantee",
      description:
        "Blankets, straps, floor runners, and a fleet of 16–26 ft trucks driven by pros. If we break it, we make it right.",
    },
  ],

  whyImage: {
    // Real Haul Yeah crew photo — mover with crossed arms in front of NJ-plated 26-ft truck.
    url: "/images/mover-crossed-arms-nj-truck.webp",
    alt: "Haul Yeah mover standing arms-crossed in front of a New Jersey-plated 26-ft moving truck in Essex County",
  },

  howItWorksImage: {
    // Real crew photo — Haul Yeah crew working inside the truck with a wooden pallet and hand truck.
    url: "/images/crew-inside-truck-pallet.webp",
    alt: "Haul Yeah Moving crew loading a wooden pallet with a pallet jack inside a 26-ft moving truck",
  },

  finalCtaImage: {
    // Real crew photo — two movers high-fiving next to the white 26-ft truck.
    url: "/images/movers-high-five.webp",
    alt: "Two Haul Yeah movers high-fiving after a successful New Jersey move",
  },

  teamImage: {
    // Real crew photo — three-man Haul Yeah crew on the liftgate, middle mover in a safety vest.
    // Used on service pages (labor-only, local-movers) as a trust visual.
    url: "/images/crew-liftgate-safety-vest.webp",
    alt: "Haul Yeah Moving three-man crew posed on the liftgate of a 26-ft moving truck, with the middle crew member in a safety vest",
  },

  // Backup / secondary images. AI-generated stock — used only where no real
  // company photo fits yet (e.g., a packing scene page). Owner will replace over time.
  aiImages: {
    packing: {
      url: "https://static.prod-images.emergentagent.com/jobs/16ab488a-3b3e-470f-9641-dde89e5faaad/images/cf0573943788ee38273716f042ac7415e715fae846b22bd0ae581161b9445eb5.jpeg",
      alt: "Haul Yeah professional packing service wrapping items in a New Jersey home",
    },
    apartment: {
      url: "https://static.prod-images.emergentagent.com/jobs/16ab488a-3b3e-470f-9641-dde89e5faaad/images/8414f310fd394bec1a5bc97262879c476aa9ad26838d29185c9016df1054f1f1.jpeg",
      alt: "Haul Yeah apartment movers carrying boxes into a New Jersey building",
    },
  },

  howItWorks: [
    {
      step: "01",
      title: "Get a quote",
      description:
        "Send us a few details. We'll text back an all-in price in under 5 minutes.",
    },
    {
      step: "02",
      title: "Lock your date with a deposit",
      description:
        "A small refundable deposit holds your slot. Weekends fill fast.",
    },
    {
      step: "03",
      title: "We show up on time",
      description:
        "Uniformed movers, blankets, dollies, straps. We wrap, load, drive, unload — done.",
    },
  ],

  faqs: [
    {
      q: "What is the cheapest day to hire movers?",
      a: "Mid-week (Tuesday through Thursday) is usually the cheapest time to hire movers because demand is lower. Weekends and the first or last days of a month are the most expensive because everyone wants those slots. If you're comparing all-in quotes, a fair weekend mover can still beat a 'discount' weekday crew that pads the bill with hourly extras.",
    },
    {
      q: "What are red flags when hiring movers?",
      a: "No written estimate, cash-only demands, a huge upfront deposit, no USDOT or MC number for interstate jobs, no real business presence, and reviews that all sound identical. If a quote seems dramatically lower than everyone else, they're usually planning to make up the difference with hourly extras and 'truck fees' on move day.",
    },
    {
      q: "What's the most affordable moving company in NJ?",
      a: "'Most affordable' depends on your move — apartment, house, small load, weekend, or same-day all price differently. Haul Yeah Moving is built to be affordable for small, weekend, and last-minute moves in Essex County: transparent all-in pricing, no hidden truck or fuel fees. Text us the details and we'll send a real number in under 5 minutes.",
    },
    {
      q: "How much do movers cost in New Jersey?",
      a: "For most local moves in NJ, expect roughly $120–$200 per hour for a two-mover crew and a truck, with three-mover crews running higher. Full apartment moves typically land around $500–$1,200, and full-house moves higher depending on size, stairs, and distance. Weekend, last-minute, and heavy-item jobs cost more — ask for an all-in quote so you know your final number before move day.",
    },
    {
      q: "Do Haul Yeah movers work on weekends?",
      a: "Yes — emphatically. Weekend moves are our specialty. We move Saturdays and Sundays every weekend, and we staff for it, so you get real availability instead of a 'we'll try to fit you in' answer. Same-day and last-minute weekend bookings are absolutely doable — call or text (862) 250-3216.",
    },
    {
      q: "How far in advance should I book a mover?",
      a: "For weekday moves in NJ, 1–2 weeks of lead time is usually plenty. For weekend and end-of-month moves, aim for 2–4 weeks because those slots go first. That said, Haul Yeah handles last-minute and same-day moves too — if you need to move this weekend, text us and we'll tell you what's still open.",
    },
  ],

  finalCta: {
    heading: "Ready to move? Haul Yeah you are.",
    subhead:
      "Free quote in under 5 minutes. Call, text, or fill the form — we're on it.",
  },

  seo: {
    homepage: {
      title:
        "Movers in Essex County, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Affordable movers NJ. Weekend movers NJ, same day movers NJ, and small-move specialists in Essex County. Free quote in under 5 minutes.",
    },
  },

  /* ─────────────────────────────────────────────────────────────
   * FUTURE — Review platform badges (Google, Yelp, Thumbtack).
   * We intentionally do NOT display any star ratings or review
   * scores. Uncomment and populate the block below when the owner
   * is ready to link out to review profiles (link-only, no scores).
   * ─────────────────────────────────────────────────────────────
   *
   * reviewBadges: [
   *   { platform: "Google Business Profile", url: "" },
   *   { platform: "Yelp",                    url: "" },
   *   { platform: "Thumbtack",               url: "" },
   * ],
   */
};

export default siteConfig;
