/*
 * siteConfig.js
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for Haul Yeah Moving marketing site.
 *
 * A non-developer can edit any value below to change site copy.
 * Do NOT rename keys — components read from these exact names.
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
    // Change this before launch to your production domain.
    baseUrl: "https://weekend-movers-nj.preview.emergentagent.com",
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
    imageUrl:
      "https://static.prod-images.emergentagent.com/jobs/16ab488a-3b3e-470f-9641-dde89e5faaad/images/43217f156accfc67f6cf98d02182da55c389b010e91c182da1d7964878bc0aed.jpeg",
    imageAlt:
      "Haul Yeah movers loading a 26-foot truck in Essex County NJ",
  },

  trustBadges: [
    "Licensed & Insured in NJ",
    "5 Insured 26-ft Trucks",
    "7 Days a Week",
    "Response in Under 5 Minutes",
  ],

  services: [
    {
      name: "Local Residential Movers",
      slug: "local-movers",
      tagline: "Full-service home moves across NJ.",
      icon: "Home",
    },
    {
      name: "Apartment Movers",
      slug: "apartment-movers",
      tagline: "Walk-ups, elevators, tight staircases — handled.",
      icon: "Building2",
    },
    {
      name: "Small Moves & Small Load Movers",
      slug: "small-moves",
      tagline: "A single sofa or a studio — no minimums.",
      icon: "PackageOpen",
    },
    {
      name: "Last Minute & Same-Day Movers",
      slug: "same-day-movers",
      tagline: "Booked and moving today.",
      icon: "Zap",
    },
    {
      name: "Weekend Movers",
      slug: "weekend-movers",
      tagline: "Our specialty. Saturday & Sunday moves.",
      icon: "CalendarDays",
    },
    {
      name: "Long Distance Movers",
      slug: "long-distance-movers",
      tagline: "NJ up and down the East Coast.",
      icon: "Truck",
    },
    {
      name: "Office & Commercial Movers",
      slug: "commercial-movers",
      tagline: "Nights & weekends so you don't lose a day.",
      icon: "Briefcase",
    },
    {
      name: "Packing & Unpacking Services",
      slug: "packing-services",
      tagline: "Materials, boxes, and pro-grade packing.",
      icon: "Box",
    },
    {
      name: "Piano & Heavy Item Movers",
      slug: "piano-movers",
      tagline: "Pianos, safes, treadmills — we're built for it.",
      icon: "Music",
    },
    {
      name: "Labor-Only Loading & Unloading Help",
      slug: "labor-only-movers",
      tagline: "Got a truck? We'll bring the muscle.",
      icon: "HardHat",
    },
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
    url: "https://static.prod-images.emergentagent.com/jobs/16ab488a-3b3e-470f-9641-dde89e5faaad/images/1f4fdf2b047942b4e5d727d8c83d9e5c6693b45cff5784e2aa5c74a219d34e7b.jpeg",
    alt: "Haul Yeah Moving fleet of insured 26-foot moving trucks in Essex County NJ",
  },

  serviceStripImages: [
    {
      url: "https://static.prod-images.emergentagent.com/jobs/16ab488a-3b3e-470f-9641-dde89e5faaad/images/cf0573943788ee38273716f042ac7415e715fae846b22bd0ae581161b9445eb5.jpeg",
      alt: "Haul Yeah professional packing service in a New Jersey home",
    },
    {
      url: "https://static.prod-images.emergentagent.com/jobs/16ab488a-3b3e-470f-9641-dde89e5faaad/images/8414f310fd394bec1a5bc97262879c476aa9ad26838d29185c9016df1054f1f1.jpeg",
      alt: "Haul Yeah apartment movers carrying boxes into a New Jersey building",
    },
  ],

  locations: [
    { name: "East Orange", slug: "east-orange-nj" },
    { name: "Newark", slug: "newark-nj" },
    { name: "Montclair", slug: "montclair-nj" },
    { name: "Bloomfield", slug: "bloomfield-nj" },
    { name: "West Orange", slug: "west-orange-nj" },
    { name: "Orange", slug: "orange-nj" },
    { name: "Irvington", slug: "irvington-nj" },
    { name: "Nutley", slug: "nutley-nj" },
    { name: "Belleville", slug: "belleville-nj" },
    { name: "Jersey City", slug: "jersey-city-nj" },
  ],

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
