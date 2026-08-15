/*
 * locations.js
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for every /movers/[slug] page and for
 * the homepage locations grid, footer location list, and cross-links.
 *
 * To add a new town:
 *   1. Add a new object to the `locations` array below.
 *   2. Add one <url> line in /app/frontend/public/sitemap.xml.
 * That's it — page, homepage grid card, and cross-links appear.
 * ─────────────────────────────────────────────────────────────
 */

export const locations = [
  {
    slug: "east-orange-nj",
    name: "East Orange",
    h1: "Local Movers in East Orange, NJ",
    seo: {
      title: "Movers in East Orange, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Local movers in East Orange, NJ — two-family walk-ups, apartments, small houses. Weekend and same-day availability. All-in pricing. Free quote in 5 minutes.",
    },
    kicker: "Home base.",
    intro: [
      "East Orange is home base for us. We dispatch out of Essex County every day, and East Orange is one of the first stops on more Saturday runs than we can count.",
      "The moving mix here leans two-family homes and older walk-up apartment buildings — meaning stairs, tight hallways, and the kind of turns that require you to know exactly how a couch pivots. We know the buildings, we know the parking situation on Central Ave, and we know how to time an East Orange to Newark run so you're not stuck behind school-hour traffic.",
      "Weekend, same-day, small moves, and full residential — all standard in East Orange for us. If you're moving in, out, or across town, text us the two addresses and we'll come back with a real number.",
    ],
    localTouch:
      "Two-family walk-ups and older apartment stock — narrow staircases and street parking are the norm. We plan truck placement before we show up.",
    faqs: [
      {
        q: "How much do movers cost in East Orange, NJ?",
        a: "Most local moves in East Orange run $500–$1,400 depending on load size and stairs. A one-bedroom apartment typically lands around $600–$900 with a two-mover crew; a full two-family second-floor apartment lands closer to $1,000–$1,400 with three movers. Ask for an all-in quote before you commit.",
      },
      {
        q: "Do you serve all of East Orange or just certain neighborhoods?",
        a: "All of East Orange — from Ampere and Elmwood to Presidential Estates and everything along Central Ave. We're in East Orange multiple times a week.",
      },
      {
        q: "Can you handle a same-day move in East Orange?",
        a: "Yes — East Orange is our home turf, so same-day is more doable here than almost anywhere. Text us as early as you can so we can slot you in.",
      },
    ],
    nearbyTowns: ["orange-nj", "newark-nj", "irvington-nj", "west-orange-nj"],
    serviceHighlights: ["weekend-movers", "apartment-movers", "small-moves"],
  },

  {
    slug: "newark-nj",
    name: "Newark",
    h1: "Local Movers in Newark, NJ",
    seo: {
      title: "Movers in Newark, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Movers in Newark, NJ — Ironbound, downtown, high-rises, walk-ups. Building move-in paperwork coordinated. Same-day and weekend availability. Free quote in 5 minutes.",
    },
    kicker: "Downtown, Ironbound, and everything in between.",
    intro: [
      "Newark is New Jersey's biggest city, and moving here is a completely different job depending on where in the city you are. Downtown high-rises want move-in paperwork a week before move day. The Ironbound wants a truck squeezed onto a narrow one-way. North Newark rowhouses want a crew that isn't scared of stairs.",
      "Haul Yeah moves Newark residents every weekend. We know which downtown buildings require move-in paperwork 48 hours in advance, which streets in the Ironbound only unload during business hours, and which Weequahic blocks have parking restrictions worth planning around.",
      "Whether you're moving into a downtown condo, out of a Bergen Street walk-up, or across the river from a friend's place in Jersey City, we'll give you a straight all-in number and show up on time.",
    ],
    localTouch:
      "Downtown high-rises with paperwork requirements, narrow Ironbound one-ways, and walk-up rowhouses in the North and Central Ward. We plan the parking and the paperwork before the crew rolls.",
    faqs: [
      {
        q: "How do you handle Newark high-rise move-in requirements?",
        a: "Most downtown Newark high-rises (near Military Park, Prudential Center, and Mulberry Street) require move-in paperwork and an elevator reservation 24–48 hours before move day. Send us your building's requirements as soon as you book and we'll walk through what applies.",
      },
      {
        q: "How much do movers cost in Newark?",
        a: "Local Newark moves run about $500–$1,600 depending on load size, stairs, and building paperwork turnaround. A studio downtown is usually $600–$900; a 2BR walk-up in the North Ward lands around $1,000–$1,400.",
      },
      {
        q: "Can you move me on a weekend in Newark?",
        a: "Yes — weekend Newark moves are one of our specialties. Weekends fill first, so try to lock a slot 2–3 weeks out for a Saturday. Sundays are usually easier to book last-minute.",
      },
    ],
    nearbyTowns: ["east-orange-nj", "jersey-city-nj", "irvington-nj", "belleville-nj"],
    serviceHighlights: ["apartment-movers", "weekend-movers", "commercial-movers"],
  },

  {
    slug: "montclair-nj",
    name: "Montclair",
    h1: "Local Movers in Montclair, NJ",
    seo: {
      title: "Movers in Montclair, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Montclair, NJ movers — Victorian walk-ups, brownstones, Watchung Plaza. Weekend and same-day availability. Free quote in 5 minutes.",
    },
    kicker: "Victorian walk-ups. Brownstones. Tree-lined streets.",
    intro: [
      "Montclair moves are their own thing. Victorian homes with narrow servant staircases. Historic brownstones on Church Street where you can't triple-park the truck for long. Upper Montclair colonials with wraparound porches. Bloomfield Ave apartments over storefronts.",
      "We move a lot of arts-district and Watchung Plaza residents. Our crews know the streets around Bloomfield Ave, know which downtown alleys work as loading zones, and don't get flustered by 100-year-old staircases with landings mid-flight.",
      "Between the historic housing stock, the family homes north of Watchung, and the newer apartment buildings near the train station, Montclair keeps us busy — weekend and weekday, one couch to full 4-bedroom.",
    ],
    localTouch:
      "Victorian and brownstone staircases, Bloomfield Ave loading zones, and Watchung Plaza parking — we plan around all three.",
    faqs: [
      {
        q: "How much do movers cost in Montclair, NJ?",
        a: "Local Montclair moves usually land between $700 and $2,200 depending on the home. A 1BR near Bloomfield Ave is about $700–$1,000; a 3–4BR family home in Upper Montclair with stairs runs $1,600–$2,200. All-in pricing so nothing shifts on move day.",
      },
      {
        q: "Can you move a piano out of a Montclair Victorian?",
        a: "Yes — Victorian staircases with mid-flight landings are a common piano move for us in Montclair. We bring skid boards and a three- or four-mover crew depending on the piano type and stair situation.",
      },
      {
        q: "Do you work weekends in Montclair?",
        a: "Yes, every weekend. Montclair is one of the busiest towns on our Saturday calendar. Lock a slot 2–3 weeks ahead for end-of-month Saturdays; mid-month is more flexible.",
      },
    ],
    nearbyTowns: ["bloomfield-nj", "west-orange-nj", "nutley-nj", "belleville-nj"],
    serviceHighlights: ["weekend-movers", "piano-movers", "packing-services"],
  },

  {
    slug: "bloomfield-nj",
    name: "Bloomfield",
    h1: "Local Movers in Bloomfield, NJ",
    seo: {
      title: "Movers in Bloomfield, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Movers in Bloomfield, NJ — commuter town homes, apartment complexes, small-load moves. Weekend and same-day. Free quote in 5 minutes.",
    },
    kicker: "Watchung Plaza. Broughton Ave. Brookdale Park.",
    intro: [
      "Bloomfield is a commuter town at its core — a lot of people who live here work in NYC and Newark, which means most Bloomfield moves happen on weekends and evenings. We're built for that.",
      "The housing mix leans colonials, split-levels, and mid-size apartment complexes near Bloomfield Center. Watchung Plaza and the streets around Brookdale Park are usually straightforward move logistics — solid parking, clear staircases, driveways that comfortably fit even our biggest 26 ft trucks when that's the right call.",
      "We do a lot of small moves in Bloomfield too — one-bedroom apartments, storage-unit runs, and adult kids moving out of parents' basements. Whichever end of the size range you're on, ask for a real number.",
    ],
    localTouch:
      "Colonials near Brookdale Park, apartment complexes near Bloomfield Center, and driveways that fit anything from a 16 ft van to a full 26 ft truck — logistics-friendly compared to denser neighboring towns.",
    faqs: [
      {
        q: "How much do movers cost in Bloomfield, NJ?",
        a: "Local Bloomfield moves usually run $500–$1,800. A 1BR apartment is about $600–$900; a 3BR house with a driveway is $1,200–$1,800. Because Bloomfield has good street parking and driveways, moves here tend to run faster than in denser neighboring towns.",
      },
      {
        q: "Do you do small moves in Bloomfield?",
        a: "Yes — small moves and single-item runs are common for us in Bloomfield. No four-hour minimum. Text us the item, addresses, and floors and we'll come back with a real number.",
      },
      {
        q: "Can you do a weekend move in Bloomfield?",
        a: "Yes, every Saturday and Sunday. Weekend Bloomfield moves are one of our regulars — book 1–3 weeks ahead for a Saturday to lock a good time slot.",
      },
    ],
    nearbyTowns: ["montclair-nj", "nutley-nj", "belleville-nj", "east-orange-nj"],
    serviceHighlights: ["small-moves", "weekend-movers", "local-movers"],
  },

  {
    slug: "west-orange-nj",
    name: "West Orange",
    h1: "Local Movers in West Orange, NJ",
    seo: {
      title: "Movers in West Orange, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Local movers in West Orange, NJ — hillside homes, Eagle Rock, Pleasantdale. Weekend availability. Free quote in under 5 minutes.",
    },
    kicker: "Hillside homes and hardwood floors.",
    intro: [
      "West Orange is one of the more spread-out towns we serve. Bigger single-family homes than East Orange or Newark, more square footage, more staircases, and hillside driveways that put your truck at a 10-degree angle before the ramp even drops.",
      "Neighborhoods like Pleasantdale, Redwood Estates, Gregory, and the streets around Eagle Rock Reservation all have their quirks — long driveways, tight garage angles, and the kind of hardwood floors that need runners the second we step inside.",
      "We do full-house moves, piano moves, and packing services in West Orange every week. Our trucks — a fleet from 16 ft up to 26 ft — handle the driveways; our crews handle the hardwood.",
    ],
    localTouch:
      "Big single-family homes, hillside driveways, hardwood floors that need protection from the front door in. We bring the runners.",
    faqs: [
      {
        q: "How much do movers cost in West Orange, NJ?",
        a: "Local West Orange moves usually run $900–$2,500 because home sizes trend larger. A 2BR ranch is about $900–$1,300; a 4BR colonial with a piano is $2,000–$2,500. Ask for all-in pricing so nothing shifts on move day.",
      },
      {
        q: "Can you handle hillside driveways?",
        a: "Yes — West Orange driveways are steep in a lot of neighborhoods, and we match the truck to the driveway from a fleet that ranges 16 ft to 26 ft. If your driveway is unusually tight, we'll bring a smaller truck and shuttle from a bigger one on the street.",
      },
      {
        q: "Do you move pianos out of West Orange homes?",
        a: "Yes — piano moves in West Orange are common for us because the housing stock trends larger. Uprights, spinets, and baby grands all in scope. Tell us the piano type and the number of stairs when you ask for a quote.",
      },
    ],
    nearbyTowns: ["montclair-nj", "orange-nj", "east-orange-nj", "bloomfield-nj"],
    serviceHighlights: ["local-movers", "piano-movers", "packing-services"],
  },

  {
    slug: "orange-nj",
    name: "Orange",
    h1: "Local Movers in Orange, NJ",
    seo: {
      title: "Movers in Orange, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Movers in Orange, NJ — two-family homes, apartment buildings, Main Street walk-ups. Weekend and same-day availability.",
    },
    kicker: "Two-family homes and Main Street walk-ups.",
    intro: [
      "Orange sits right between East Orange and West Orange, and the housing stock reflects it — denser than West Orange, a little less dense than East Orange, mostly two-family homes and Main Street apartment buildings.",
      "Our crews are in Orange every week — a lot of same-day and small-move requests come out of the Main Street corridor and the streets around Central Ave. Parking is usually workable but tight, so we plan the truck placement before we roll.",
      "Whether you're moving between two-families down the block or heading to Newark for a new job, ask for an all-in quote and we'll come back in minutes.",
    ],
    localTouch:
      "Dense two-family stock and Main Street walk-ups. Parking is usually workable, but always planned in advance.",
    faqs: [
      {
        q: "How much do movers cost in Orange, NJ?",
        a: "Local Orange moves usually run $500–$1,300 depending on load and stairs. A 1BR walk-up is about $600–$850; a two-family second-floor is $900–$1,300 with a three-mover crew.",
      },
      {
        q: "Can you do same-day moves in Orange?",
        a: "Yes — Orange is close enough to home base that we can usually turn same-day moves around here. Text as early as you can and we'll tell you what's open.",
      },
      {
        q: "Do you serve all of Orange?",
        a: "Yes — from Main Street and Central Ave through the residential blocks off Highland Ave and Freeway Drive. All of Orange is on the same weekly dispatch board.",
      },
    ],
    nearbyTowns: ["east-orange-nj", "west-orange-nj", "irvington-nj", "newark-nj"],
    serviceHighlights: ["small-moves", "same-day-movers", "apartment-movers"],
  },

  {
    slug: "irvington-nj",
    name: "Irvington",
    h1: "Local Movers in Irvington, NJ",
    seo: {
      title: "Movers in Irvington, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Movers in Irvington, NJ — apartment buildings, multi-family homes, dense residential. Weekend and same-day. Free quote in 5 minutes.",
    },
    kicker: "Multi-family homes, dense blocks, tight moves.",
    intro: [
      "Irvington is one of the densest towns we serve. Multi-family homes, mid-size apartment buildings, and blocks where finding legal parking for a full-size 26 ft truck sometimes takes a phone call to the building first — we'll size down to a 16 or 20 ft truck when the block calls for it.",
      "We handle small, same-day, and weekend moves in Irvington every week. The neighborhoods around Springfield Ave, Chancellor Ave, and Ellis Ave are all on our regular dispatch board.",
      "Because parking and stairs are the two variables that most affect an Irvington move, we bake both into the quote upfront — you get a real all-in number, not a 'we'll see on move day.'",
    ],
    localTouch:
      "Multi-family stairs and street-parking-heavy blocks — we plan truck placement and crew size upfront so nothing surprises us on move day.",
    faqs: [
      {
        q: "How much do movers cost in Irvington, NJ?",
        a: "Local Irvington moves usually run $500–$1,400 depending on load and stairs. Because most Irvington moves involve 2–3 flights of stairs, we usually recommend a three-mover crew, which puts a 1BR walk-up around $750–$950 and a 2BR walk-up around $1,000–$1,400.",
      },
      {
        q: "Can you handle multi-family walk-ups in Irvington?",
        a: "Yes — multi-family walk-ups are our daily work here. Extra mover added by default for 3+ flights so the load doesn't slow to one person on a landing.",
      },
      {
        q: "Do you do weekend moves in Irvington?",
        a: "Yes — every Saturday and Sunday. Weekend slots in Irvington go about 1–3 weeks in advance for end-of-month; mid-month is more flexible.",
      },
    ],
    nearbyTowns: ["east-orange-nj", "newark-nj", "orange-nj", "belleville-nj"],
    serviceHighlights: ["apartment-movers", "weekend-movers", "small-moves"],
  },

  {
    slug: "nutley-nj",
    name: "Nutley",
    h1: "Local Movers in Nutley, NJ",
    seo: {
      title: "Movers in Nutley, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Local movers in Nutley, NJ — Franklin Ave homes, family-friendly neighborhoods, easy driveways. Free quote in 5 minutes.",
    },
    kicker: "Franklin Ave. Yantacaw Park. Family blocks.",
    intro: [
      "Nutley is a quieter town on our dispatch board — mostly single-family homes on residential blocks, a few small apartment buildings near Franklin Ave, and a housing stock that trends slightly larger and family-owned.",
      "Move logistics in Nutley are usually the easy end of the range: driveways that fit any truck in our 16–26 ft fleet, staircases that aren't 100 years old, and blocks where street parking isn't a fight.",
      "We do a lot of 'growing family' moves in Nutley — 1BR apartments into 3BR houses, or across town from one starter home to a bigger one. Ask for an all-in quote.",
    ],
    localTouch:
      "Single-family homes with real driveways, mostly straightforward staircases, and streets that accommodate anything from a 16 ft to a full 26 ft truck without a fight.",
    faqs: [
      {
        q: "How much do movers cost in Nutley, NJ?",
        a: "Local Nutley moves usually run $700–$2,000 depending on home size. A 2BR house is about $900–$1,400; a full 3–4BR family home lands $1,600–$2,000. Nutley moves usually run faster than dense-town moves because of parking and driveways.",
      },
      {
        q: "Can you handle a growing-family move in Nutley?",
        a: "Yes — 1BR-to-house upgrades are common Nutley jobs for us. If you need packing help for the kitchen and closets to save time, we can bundle a partial pack into the same day-of quote.",
      },
      {
        q: "Do you do small moves in Nutley?",
        a: "Yes — single-item and studio-size runs are on the same dispatch board as full-house moves. No 4-hour minimum forced on small jobs.",
      },
    ],
    nearbyTowns: ["bloomfield-nj", "belleville-nj", "montclair-nj", "east-orange-nj"],
    serviceHighlights: ["local-movers", "packing-services", "small-moves"],
  },

  {
    slug: "belleville-nj",
    name: "Belleville",
    h1: "Local Movers in Belleville, NJ",
    seo: {
      title: "Movers in Belleville, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Movers in Belleville, NJ — Cape Cods, two-family homes, Silver Lake, along the Passaic River. Weekend and same-day. Free quote in 5 minutes.",
    },
    kicker: "Cape Cods, two-families, quiet river-side blocks.",
    intro: [
      "Belleville sits along the Passaic River, and our Belleville jobs run the range — small Cape Cods on quiet residential blocks, two-family homes near Silver Lake, and apartment buildings near the Newark border.",
      "Move logistics in Belleville are usually mid-difficulty. Driveways exist for most single-family jobs, but two-family second-floor apartments are still walk-ups that need a three-mover crew.",
      "We're in Belleville every week and know the Franklin Ave, Washington Ave, and Silver Lake corridors well. Whether you're moving in, out, or across town, ask for a real all-in number.",
    ],
    localTouch:
      "Passaic River-side neighborhoods, Cape Cod driveways, and two-family walk-ups near the Newark border — a real range depending on the block.",
    faqs: [
      {
        q: "How much do movers cost in Belleville, NJ?",
        a: "Local Belleville moves usually run $500–$1,700. A 1BR apartment is $600–$900; a two-family second-floor is $1,000–$1,400; a 3BR Cape Cod with a driveway is $1,300–$1,700.",
      },
      {
        q: "Can you move me into a Belleville two-family?",
        a: "Yes — two-family walk-ups are one of the housing types we handle every weekend in Belleville. Extra mover added by default for stairs so nothing gets slow-loaded on a landing.",
      },
      {
        q: "Do you do same-day moves in Belleville?",
        a: "Yes — Belleville is inside our home dispatch radius, so same-day is usually feasible. Text as early as you can.",
      },
    ],
    nearbyTowns: ["nutley-nj", "bloomfield-nj", "newark-nj", "irvington-nj"],
    serviceHighlights: ["local-movers", "apartment-movers", "same-day-movers"],
  },

  {
    slug: "jersey-city-nj",
    name: "Jersey City",
    h1: "Local Movers in Jersey City, NJ",
    seo: {
      title: "Movers in Jersey City, NJ | Same-Day & Weekend | Haul Yeah",
      description:
        "Movers in Jersey City, NJ — high-rises, downtown, Journal Square, Grove Street. Building move-in paperwork coordinated. Weekend availability. Free quote in 5 minutes.",
    },
    kicker: "High-rise moves. Move-in paperwork. Freight elevator windows.",
    intro: [
      "Jersey City moves are a different sport than most Essex County jobs — the vast majority of them are high-rise buildings with move-in paperwork requirements, freight elevator reservations, and 60-minute loading windows before the next crew is up.",
      "We move Jersey City residents every week. Downtown, Journal Square, Grove Street, Newport, and Exchange Place — different buildings, different management companies, mostly the same paperwork drill: documentation 48 hours before, elevator reservation with the front desk, protection pads on the freight lift walls.",
      "Our crews come dressed for the front desk, on time for the elevator window, and with the tools that make high-rise moves fast (wardrobe boxes, hand trucks, straps for a full-height elevator load).",
    ],
    localTouch:
      "High-rise buildings with move-in paperwork, freight elevator reservations, and strict loading windows. We route the paperwork and time the crew to the elevator.",
    faqs: [
      {
        q: "How do you handle Jersey City high-rise move-in paperwork?",
        a: "Most high-rise buildings in Jersey City (especially downtown and Newport) require documentation and an elevator reservation 24–72 hours before move day. Send us your building's requirements when you book and we'll walk through what applies at no cost.",
      },
      {
        q: "How much do movers cost in Jersey City?",
        a: "Local Jersey City moves usually run $700–$1,800. A studio or 1BR high-rise is $700–$1,000; a 2BR high-rise is $1,100–$1,800. Weekend and end-of-month slots trend higher.",
      },
      {
        q: "Can you reserve the freight elevator?",
        a: "The tenant reserves the freight elevator with the building manager. We plan our arrival time and load pace around your elevator window so no minutes get wasted.",
      },
    ],
    nearbyTowns: ["newark-nj", "east-orange-nj", "belleville-nj", "irvington-nj"],
    serviceHighlights: ["apartment-movers", "weekend-movers", "commercial-movers"],
  },
];

export function getLocationBySlug(slug) {
  return locations.find((l) => l.slug === slug) || null;
}
