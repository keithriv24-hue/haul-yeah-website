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
    licensedInsured: true,
    fleet: "5 insured 26-ft trucks",
    hoursShort: "7 days a week",
    hoursLong: "Open 7 days a week",
    serviceArea: "Essex County, NJ",
    napLine: "Haul Yeah Moving · Essex County, NJ · (862) 250-3216",
    // Production domain. Change here + regenerate /public/sitemap.xml
    // if the domain ever changes. This value is the ONE source used
    // for canonical URLs, JSON-LD `url` fields, and og:url meta tags.
    baseUrl: "https://haulyeahmoves.com",
  },

  branding: {
    // Owner-approved logo mark (JPEG). Swap the file at /app/frontend/public/logo.jpg
    // to update the header, favicon, and og:image everywhere.
    logoPath: "/logo.jpg",
    logoAlt: "Haul Yeah Moving logo",
    // Used for favicon <link> and og:image meta.
    faviconPath: "/logo.jpg",
    ogImagePath: "/logo.jpg",
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
    measurementId: "",
    // Meta (Facebook) Pixel — the base pixel snippet lives in
    // /app/frontend/public/index.html <head>. This ID is stored here
    // for one-place editing / reference. Client-side navigation
    // PageView events fire from Layout.jsx via useLocation.
    metaPixelId: "1913145279380964",
  },

  reviews: {
    // Paste the Trustindex widget ID from the embed code they give you
    // (looks like "abc123def456"). While this is an empty string, the
    // section renders a graceful placeholder instead of the widget.
    trustindexWidgetId: "",
    // The Trustindex loader script URL from your embed snippet
    // (usually https://cdn.trustindex.io/loader.js).
    trustindexScriptUrl: "https://cdn.trustindex.io/loader.js",
    // Your Google "leave a review" short link (g.page/r/...), used by the
    // "Leave us a review" button. Paste it when you have it.
    googleReviewLink: "",
    heading: "What our customers say",
    subheading: "Real reviews from real Essex County moves.",
  },

  nav: [
    { label: "Moving", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Locations", href: "/#locations" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
  ],

  hero: {
    kicker: "NJ's Weekend Movers",
    h1: "New Jersey's Weekend Movers — Booked in Minutes.",
    subhead:
      "Affordable, licensed & insured local moving. Get an all-in quote fast.",
    formCardTitle: "Get My Free Quote",
    formCardSubtitle: "Response in under 5 minutes.",
    secondaryCta: "Or text us for a same-day quote",
    // Real Haul Yeah crew photo (swap the file at /app/frontend/public/images/ to update).
    imageUrl: "/images/crew-open-truck-box.webp",
    imageAlt:
      "Haul Yeah Moving three-man crew at the open box of a 26-ft moving truck in Essex County NJ",
  },

  trustBadges: [
    "Licensed & Insured in NJ",
    "5 Insured 26-ft Trucks",
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
        "Blankets, straps, floor runners, and 26-ft trucks driven by pros. If we break it, we make it right.",
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
      a: "No written estimate, cash-only demands, a huge upfront deposit, no USDOT or MC number for interstate jobs, no proof of NJ licensing and insurance, no real business presence, and reviews that all sound identical. If a quote seems dramatically lower than everyone else, they're usually planning to make up the difference with hourly extras and 'truck fees' on move day.",
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
        "Haul Yeah Moving | Weekend & Same-Day Movers in Essex County, NJ",
      description:
        "Affordable, licensed and insured movers NJ. Weekend movers NJ, same day movers NJ, and small-move specialists in Essex County. Free quote in under 5 minutes.",
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
