/*
 * services.js
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for every /services/[slug] page and for
 * the homepage services grid, footer service list, and cross-links.
 *
 * To add a new service:
 *   1. Add a new object to the `services` array below.
 *   2. Add one <url> line in /app/frontend/public/sitemap.xml.
 * That's it — the page, homepage grid card, and internal links appear.
 * ─────────────────────────────────────────────────────────────
 */

import siteConfig from "./siteConfig";

// Image references — map to real crew photos where possible.
// `siteConfig.teamImage` is the three-man liftgate crew, reused across
// several service pages as a trust visual.
const IMG = {
  team: siteConfig.teamImage,        // three-man crew on liftgate
  why: siteConfig.whyImage,          // solo mover, NJ-plated truck
  hero: {                             // hero: mover in truck cab
    url: siteConfig.hero.imageUrl,
    alt: siteConfig.hero.imageAlt,
  },
  packing: siteConfig.aiImages.packing,
  apartment: siteConfig.aiImages.apartment,
  final: siteConfig.finalCtaImage,   // two-mover wave shot
  how: siteConfig.howItWorksImage,   // truck cab planning shot
};

export const services = [
  {
    slug: "local-movers",
    name: "Local Residential Movers",
    iconName: "Home",
    tagline: "Full-service home moves across NJ.",
    h1: "Local Residential Movers in NJ",
    seo: {
      title: "Local Residential Movers in NJ | Haul Yeah Moving",
      description:
        "Local residential movers in Essex County and North NJ. Licensed and insured, transparent all-in pricing, 7 days a week. Free quote in under 5 minutes.",
    },
    kicker: "Full-service local moving",
    lede: "Family-size home moves across Essex County and North Jersey.",
    intro: [
      "Local moves shouldn't be a stressful, day-long ordeal. Haul Yeah handles full-service residential moves across Essex, Bergen, Passaic, Hudson, and Union County — starting with a real quote in your inbox and ending with your bed made in the new place if you want it that way.",
      "Two-family in East Orange? Single-family colonial in West Orange? Studio in Newark? Same crew, same all-in price you were quoted, same weekends-are-normal-hours attitude. Our 26-ft trucks handle most 1–3 bedroom homes in one trip. Bigger place? Two trucks, same day.",
      "We're a licensed and insured NJ mover — not a booking site that hands your job off to whoever picked up the phone. The person you texted for a quote is the same crew size that shows up on move day. Local movers near me shouldn't be a mystery box.",
    ],
    included: {
      heading: "What a local residential move includes",
      items: [
        {
          title: "Wrapped and padded furniture",
          description:
            "Every dresser, sofa, and mattress goes into moving blankets. No exposed corners on your staircase.",
        },
        {
          title: "Disassembly and reassembly",
          description:
            "Beds, tables, IKEA MALM and KALLAX — we take them apart and put them back together at the drop.",
        },
        {
          title: "Floor and doorway protection",
          description:
            "Runners on hardwood, corner guards on trim. Your security deposit thanks us.",
        },
        {
          title: "Pro loading and unloading",
          description:
            "Uniformed movers, dollies, straps, shrink wrap. Nothing gets carried by its handles.",
        },
        {
          title: "Fuel, tolls, and truck included",
          description:
            "The number in your quote already includes fuel, tolls, and the truck itself. No surprise line items.",
        },
        {
          title: "Optional packing add-on",
          description:
            "Add on the day-before pack or a supervised same-day unpack. Bundle-priced with the move.",
        },
      ],
    },
    midCTA: {
      heading: "Book your date",
      body: "Weekend slots fill first. Text or call for a same-day price.",
    },
    faqs: [
      {
        q: "How long does a local move in NJ usually take?",
        a: "For a 1-bedroom apartment in NJ, 3–5 hours is typical with a two-mover crew. A 2-bedroom lands around 5–7 hours. A 3-bedroom house usually runs 7–10 hours with a three-mover crew. Weekend traffic, stairs, and packing prep are the big variables — we bake all of that into the all-in number so nothing shifts on move day.",
      },
      {
        q: "Do you provide boxes and packing materials?",
        a: "Yes. We can drop off boxes ahead of your move (small, medium, large, dish packs, and wardrobe boxes) or bring a full packing crew to do it for you. If you already bought supplies, no problem — we work with what you've got.",
      },
      {
        q: "Do you charge extra for stairs?",
        a: "For most local moves in Essex County, one flight or a standard front-stoop is included. Long-carry stairs (4+ flights, or a long walk from the truck) may add a small fee — we tell you upfront on the quote, never on move day.",
      },
      {
        q: "Are Haul Yeah movers actually licensed and insured?",
        a: "Yes — Haul Yeah is a licensed and insured moving company in New Jersey. We carry cargo insurance, workers' comp for our crews, and general liability. If your building asks for a Certificate of Insurance, we send it over before move day at no charge.",
      },
    ],
    relatedServices: ["apartment-movers", "small-moves", "weekend-movers"],
    relatedTowns: ["newark-nj", "east-orange-nj", "montclair-nj", "west-orange-nj"],
    image: IMG.team,
  },

  {
    slug: "apartment-movers",
    name: "Apartment Movers",
    iconName: "Building2",
    tagline: "Walk-ups, elevators, tight staircases — handled.",
    h1: "Apartment Movers in NJ",
    seo: {
      title: "Apartment Movers in NJ | Haul Yeah Moving",
      description:
        "Apartment movers NJ — walk-ups, elevators, high-rises. Certificate of Insurance included. Licensed and insured, 7 days a week. Free quote in 5 minutes.",
    },
    kicker: "Studios, 1BR, 2BR — you name it",
    lede: "Walk-ups, elevators, tight staircases — we've done this building.",
    intro: [
      "Apartment moves are their own sport. Different rules than a house move: elevator reservations, COI paperwork, front-desk sign-ins, a 45-minute freight-lift window before someone else has it booked.",
      "Haul Yeah does apartment movers NJ jobs across Newark, Jersey City, Montclair, East Orange, Irvington, Bloomfield, and the rest of North Jersey every week. Studios in downtown Newark. Walk-up 2-bedrooms in Montclair. High-rise 1-bedrooms in Jersey City with a strict COI checklist. We know the drill.",
      "Our crews come dressed, on time, and with the pieces buildings actually check for: a Certificate of Insurance emailed the day before, floor runners for the lobby, wardrobe boxes so your closets travel in one shot.",
    ],
    included: {
      heading: "What an apartment move includes",
      items: [
        {
          title: "Certificate of Insurance (COI)",
          description:
            "Sent to your building manager the day before, formatted the way high-rises want it. No extra charge.",
        },
        {
          title: "Elevator and freight-lift protection",
          description:
            "Corner pads and floor runners so the building doesn't ding your deposit.",
        },
        {
          title: "Walk-up-friendly crews",
          description:
            "Extra mover added by default for 4+ floor walk-ups. No surprise 'stair fee' on move day.",
        },
        {
          title: "Wardrobe boxes on move day",
          description:
            "Closets straight from rod to box to rod. Rehang in 60 seconds at the drop.",
        },
        {
          title: "Platform-bed disassembly",
          description:
            "Standard on IKEA/West Elm builds. Reassembly at the new place is part of the job.",
        },
        {
          title: "Parking scout",
          description:
            "For streets with no dedicated dock, we work out where the truck lives during load.",
        },
      ],
    },
    midCTA: {
      heading: "COI needed? We'll send it.",
      body: "Give us your building name and requirements — we route the paperwork.",
    },
    faqs: [
      {
        q: "Do you provide a Certificate of Insurance (COI)?",
        a: "Yes — free of charge. Send us your building's COI requirements (usually a PDF template listing the building owner, management company, and coverage minimums) and we'll route it to our insurance carrier. Most buildings get it back within one business day; some management companies need 2 days, so send it as soon as you book.",
      },
      {
        q: "What if my building requires a freight elevator reservation?",
        a: "Reserve the freight lift with your building manager for the window you want, then tell us. We plan the truck's loading pace around the elevator slot so the crew isn't burning hours in the hallway.",
      },
      {
        q: "How do you handle walk-ups?",
        a: "We bring an extra mover for walk-ups of 4 floors or more, so the load isn't slowed down by one person on a landing. It's built into the quote — no separate stair fee on move day.",
      },
      {
        q: "Can you move me in and out on the same day?",
        a: "Yes — same-day move-outs and move-ins are our default for apartment jobs. If the two buildings have back-to-back timing, we plan the route and the elevator windows so nothing slips.",
      },
    ],
    relatedServices: ["small-moves", "same-day-movers", "packing-services"],
    relatedTowns: ["jersey-city-nj", "newark-nj", "montclair-nj", "east-orange-nj"],
    image: IMG.apartment,
  },

  {
    slug: "small-moves",
    name: "Small Moves & Small Load Movers",
    iconName: "PackageOpen",
    tagline: "A single sofa or a studio — no minimums.",
    h1: "Small Move & Small Load Movers in NJ",
    seo: {
      title: "Small Move Movers in NJ | Haul Yeah Moving",
      description:
        "Small load movers NJ — single sofa, studio, or one room. No four-hour minimum. Same-day and weekend availability. Free quote in under 5 minutes.",
    },
    kicker: "One sofa. One studio. No minimums.",
    lede: "The small-move mover Essex County calls when a full van company is overkill.",
    intro: [
      "Most moving companies price you for a truck whether you fill it or not. That math doesn't work for a studio, a single couch, or the last 12 boxes from mom's basement.",
      "Haul Yeah is built for small loads. We keep smaller trucks in rotation, we price by what actually moves (not by an artificial four-hour minimum), and we can pair your job with another small run in the same corridor to keep the number honest.",
      "Studios in Newark, one-bedrooms in Bloomfield, a Peloton and a bookshelf out of a Nutley basement — small isn't small to us, it's most of what we do.",
    ],
    included: {
      heading: "What a small move includes",
      items: [
        {
          title: "No minimum-hour trap",
          description:
            "Pay for the actual work, not a 4-hour minimum you didn't need.",
        },
        {
          title: "Right-sized truck",
          description:
            "Cargo van, 16-ft, or 26-ft — matched to your load, not oversold.",
        },
        {
          title: "Blanket wrap on every piece",
          description:
            "Even a single-couch job gets the full pad + shrink-wrap treatment.",
        },
        {
          title: "Same-day availability",
          description:
            "Weekends and weekdays. Text us in the morning, move in the afternoon.",
        },
        {
          title: "Building COI included",
          description:
            "For apartment buildings that require it, we send the paperwork at no charge.",
        },
        {
          title: "Two-mover default",
          description:
            "One driver plus one carrier means faster loads and no scratches on doorframes.",
        },
      ],
    },
    midCTA: {
      heading: "Just one couch?",
      body: "Text us the item, the two addresses, and the floor. Real quote in minutes.",
    },
    faqs: [
      {
        q: "Is there a minimum charge for a small move?",
        a: "We don't require the 3–4 hour minimum some movers do. If your job is one item across town, that's what you'll get quoted — a flat, all-in number, not a padded hourly.",
      },
      {
        q: "How small is 'small'?",
        a: "Anything from a single item (couch, dresser, mattress, treadmill) up through a studio or one-bedroom apartment fits our small-move service. Once you're at a full 2-bedroom, ask about our local residential service instead.",
      },
      {
        q: "Can you do a small same-day move?",
        a: "Yes — small same-day moves are one of our specialties. Weekend or weekday. Text (862) 250-3216 with the item, two addresses, and floors and we'll come back with a live quote.",
      },
      {
        q: "Do you provide the truck, or do I need one?",
        a: "We bring the truck, blankets, dollies, straps, and shrink wrap. If you only need muscle because you already rented a truck, ask about our labor-only service instead.",
      },
    ],
    relatedServices: ["labor-only-movers", "same-day-movers", "apartment-movers"],
    relatedTowns: ["bloomfield-nj", "nutley-nj", "belleville-nj", "east-orange-nj"],
    image: IMG.packing,
  },

  {
    slug: "same-day-movers",
    name: "Last Minute & Same-Day Movers",
    iconName: "Zap",
    tagline: "Booked and moving today.",
    h1: "Same-Day & Last Minute Movers in NJ",
    seo: {
      title: "Same-Day & Last Minute Movers in NJ | Haul Yeah Moving",
      description:
        "Same day movers NJ. Text now, move today. Weekends included. Licensed, insured, transparent pricing. Real quote in under 5 minutes.",
    },
    kicker: "Book this morning, move this afternoon.",
    lede: "Real availability for same-day and next-day moves in Essex County.",
    intro: [
      "'Same-day mover' usually means 'we'll try to fit you in in 3 weeks.' Haul Yeah is actually built for it: dispatchers on-shift 7 days a week, trucks that aren't 100% pre-booked, and crews who can pick up an afternoon job with two hours' notice.",
      "Last-minute moves happen for real reasons — a lease flipped a week early, a closing pushed up, a roommate bailed. We don't punish you for it with an emergency surcharge. Same all-in pricing, just compressed timeline.",
      "Weekend same-day is where we shine. Saturday morning text, Saturday afternoon load, Saturday evening you're eating pizza in the new kitchen.",
    ],
    included: {
      heading: "What a same-day move includes",
      items: [
        {
          title: "Live dispatch",
          description:
            "A human answers, checks the board, and gives a real yes/no in minutes.",
        },
        {
          title: "No emergency surcharge",
          description:
            "Same all-in pricing as a job booked two weeks out.",
        },
        {
          title: "Small to medium loads",
          description:
            "Studios, 1BRs, and small 2BRs are ideal same-day candidates.",
        },
        {
          title: "Weekend availability",
          description:
            "Saturdays and Sundays included. Not a 'next business day' answer.",
        },
        {
          title: "Full-service crew",
          description:
            "Uniformed movers, wrapped furniture, floor protection — nothing skipped because it's last-minute.",
        },
        {
          title: "Digital paperwork",
          description:
            "E-sign the estimate on your phone. No fax-machine energy.",
        },
      ],
    },
    midCTA: {
      heading: "Need to move today?",
      body: "Text (862) 250-3216 with pickup, drop, and floor. Response in under 5 minutes.",
    },
    faqs: [
      {
        q: "Can I really book a mover for today?",
        a: "Yes — if we have a truck available, we can load same-day. Same-day yes-or-no depends on time of day and how booked the calendar is. Text us as early as you can; the earlier we hear, the higher the odds.",
      },
      {
        q: "Do you charge more for last-minute moves?",
        a: "No emergency surcharge. Our same-day pricing is the same transparent all-in pricing as a job booked two weeks out. Weekends are priced slightly higher than weekdays because of demand, not because it's last-minute.",
      },
      {
        q: "What can't be moved same-day?",
        a: "Very large full-house moves (4+ bedrooms), moves requiring a building COI from a management company that takes 2+ business days, and long-distance moves usually can't happen same-day. Everything else is usually on the table.",
      },
      {
        q: "Is same-day only for small moves?",
        a: "No — we regularly do same-day 1BR and 2BR apartment moves. If the load fits in one truck and neither building requires multi-day COI paperwork, we can usually make it happen.",
      },
    ],
    relatedServices: ["weekend-movers", "small-moves", "apartment-movers"],
    relatedTowns: ["newark-nj", "jersey-city-nj", "east-orange-nj", "irvington-nj"],
    image: IMG.hero,
  },

  {
    slug: "weekend-movers",
    name: "Weekend Movers",
    iconName: "CalendarDays",
    tagline: "Our specialty. Saturday & Sunday moves.",
    h1: "Weekend Movers in NJ",
    seo: {
      title: "Weekend Movers in NJ | Haul Yeah Moving",
      description:
        "Weekend movers NJ — Saturday and Sunday specialists in Essex County. Licensed, insured, and actually staffed for the weekend rush. Free quote in 5 minutes.",
    },
    kicker: "The Saturday-Sunday specialists.",
    lede: "Weekends aren't our exception. They're the whole reason we exist.",
    intro: [
      "Most people move on weekends because they work weekdays. Most moving companies charge extra for weekends because their crews would rather be off. That mismatch is why Haul Yeah exists.",
      "We staff for Saturday and Sunday like Monday is the exception. Full crews, full fleet, live dispatch. If you text us on Wednesday for a Saturday move, we'll answer honestly about availability and give you a real all-in number — not a 'let me get back to you' runaround.",
      "Weekend movers NJ is our bread and butter across Essex County — Newark, Jersey City, Montclair, Bloomfield, Nutley, and beyond. Book far enough out and you get first pick of the day. Wait too long and Saturday afternoons go first.",
    ],
    included: {
      heading: "What weekend movers should get you",
      items: [
        {
          title: "Actually staffed",
          description:
            "Full crews on the calendar every Saturday and Sunday, not a skeleton weekend crew.",
        },
        {
          title: "Priority booking",
          description:
            "Weekend slots open first for repeat customers and multi-service jobs.",
        },
        {
          title: "All-in weekend pricing",
          description:
            "Fuel, blankets, dollies, tolls — the weekend number is the final number.",
        },
        {
          title: "Early morning slots",
          description:
            "7 AM–9 AM loads available for buildings with strict elevator windows.",
        },
        {
          title: "Weekend COI turnaround",
          description:
            "Buildings that only accept COIs during business hours: we route ahead.",
        },
        {
          title: "No 'weekend hourly' games",
          description:
            "You're not on a fake meter that speeds up because it's Saturday.",
        },
      ],
    },
    midCTA: {
      heading: "Lock a weekend slot",
      body: "Small refundable deposit holds the date. Saturdays fill first.",
    },
    faqs: [
      {
        q: "Do you cost more on weekends?",
        a: "Weekend moves are priced slightly higher than weekday moves because demand is higher — that's true across the NJ moving industry. What you won't see from us is a 'weekend surcharge' or hourly bumps that appear on move day. The all-in weekend number is the final number.",
      },
      {
        q: "Do you take Sunday jobs?",
        a: "Yes, every Sunday. Sundays actually book slightly less than Saturdays, so if your dates are flexible, you'll often get a better slot and a slightly better rate.",
      },
      {
        q: "How early can a weekend move start?",
        a: "First slots start around 7:00 AM on weekends. That's usually the best pick if your new building requires an early elevator window or you want to beat weekend Turnpike traffic.",
      },
      {
        q: "How far out should I book a weekend move?",
        a: "2–4 weeks out is ideal for a Saturday. End-of-month Saturdays go first, then mid-month. Sundays and mid-week are more forgiving. If you're inside a week, text us anyway — cancellations happen.",
      },
    ],
    relatedServices: ["same-day-movers", "apartment-movers", "local-movers"],
    relatedTowns: ["newark-nj", "montclair-nj", "jersey-city-nj", "bloomfield-nj"],
    image: IMG.final,
  },

  {
    slug: "long-distance-movers",
    name: "Long Distance Movers",
    iconName: "Truck",
    tagline: "NJ up and down the East Coast.",
    h1: "Long Distance Movers from NJ",
    seo: {
      title: "Long Distance Movers in NJ | Haul Yeah Moving",
      description:
        "Long distance movers from NJ up and down the East Coast. Direct-drive routes, no warehouse handoffs, all-in pricing. Free quote in 5 minutes.",
    },
    kicker: "NJ, up and down the East Coast.",
    lede: "Direct-drive long-distance moves — no warehouse handoffs, no mystery arrival window.",
    intro: [
      "Long-distance movers usually consolidate your stuff with three other people's on a big rig, then hand it off between drivers. That's why arrival windows come as '3–14 business days.'",
      "Haul Yeah's long-distance service is different — we drive your job direct with one of our own 26-ft trucks and our own crew. Loads Saturday in Essex County, arrives Monday morning in North Carolina. One driver, one truck, one crew you already met.",
      "We handle direct-drive moves from NJ down the East Coast (MD, DC, VA, NC) and up through NY, CT, and MA. If your route is inside about 600 miles from Newark, we're a fit. Beyond that, we'll be honest and point you toward a bigger van line.",
    ],
    included: {
      heading: "What a long-distance move includes",
      items: [
        {
          title: "Direct-drive route",
          description:
            "Your stuff never gets warehoused or transferred to a second truck.",
        },
        {
          title: "Same crew, load and unload",
          description:
            "The movers you met at pickup are the same crew at the drop.",
        },
        {
          title: "Flat all-in mileage",
          description:
            "Fuel, tolls, per-diem — quoted once, not renegotiated on the road.",
        },
        {
          title: "Overnight-hold available",
          description:
            "If your new place isn't ready, we can stage the truck for one night.",
        },
        {
          title: "COI at both ends",
          description:
            "Origin and destination buildings both get insurance paperwork.",
        },
        {
          title: "Real arrival window",
          description:
            "A 24–48 hour delivery window, not 'sometime next week.'",
        },
      ],
    },
    midCTA: {
      heading: "Direct-drive quote in minutes",
      body: "Tell us your two zip codes. We'll price the route honestly.",
    },
    faqs: [
      {
        q: "How far is 'long-distance' for you?",
        a: "We handle direct-drive long-distance moves inside roughly 600 miles from our NJ base — the East Coast corridor from Boston down to Raleigh, and inland to Pittsburgh and DC. Beyond that we'll refer you honestly to a full van-line partner instead of stretching.",
      },
      {
        q: "Will my stuff be transferred to another truck?",
        a: "No. Every long-distance job we book is direct-drive on one of our own 26-ft trucks with our own crew. Your load doesn't sit in a warehouse, doesn't get consolidated with strangers' furniture, and doesn't switch drivers.",
      },
      {
        q: "When will my stuff arrive?",
        a: "Because we drive direct, your arrival window is a real 24–48 hours, not a 3–14 day range. Most East Coast corridors (NJ→DC, NJ→Boston, NJ→NC) unload within 24 hours of pickup.",
      },
      {
        q: "Do I need a Certificate of Insurance at both ends?",
        a: "Yes if either origin or destination building requires it. We handle both COIs from our carrier at no extra charge — send us both buildings' requirements when you book.",
      },
    ],
    relatedServices: ["packing-services", "commercial-movers", "local-movers"],
    relatedTowns: ["newark-nj", "jersey-city-nj", "montclair-nj", "west-orange-nj"],
    image: IMG.why,
  },

  {
    slug: "commercial-movers",
    name: "Office & Commercial Movers",
    iconName: "Briefcase",
    tagline: "Nights & weekends so you don't lose a day.",
    h1: "Office & Commercial Movers in NJ",
    seo: {
      title: "Office & Commercial Movers in NJ | Haul Yeah Moving",
      description:
        "Office and commercial movers NJ — night and weekend moves so your team doesn't lose a workday. Licensed, insured, COI-ready. Free quote in 5 minutes.",
    },
    kicker: "Move the office. Don't lose the workweek.",
    lede: "Night, weekend, and after-hours office moves across Essex County and North Jersey.",
    intro: [
      "The best time to move an office is when the office is closed. That's why our commercial jobs mostly run Friday nights, Saturdays, or Sundays — so Monday morning your team walks into a working space, not a stack of taped boxes.",
      "Haul Yeah handles small and mid-size office moves in Essex, Hudson, Union, Bergen, and Passaic Counties — law offices, medical clinics, marketing agencies, coworking pods, and small retail. We do inventory before pickup, label by desk, and reassemble monitors and IT setups at the drop.",
      "Every commercial job gets a dedicated project lead, a written moving plan (with a floor map if the new suite has one), and full COIs for both buildings. No handoff between crews. No 'the driver isn't allowed in this building' surprises.",
    ],
    included: {
      heading: "What a commercial move includes",
      items: [
        {
          title: "Night and weekend windows",
          description:
            "Load Friday PM, unload Saturday. Or a single Sunday run.",
        },
        {
          title: "Written moving plan",
          description:
            "Which desks go where, which monitors get labeled, which server rack moves last.",
        },
        {
          title: "IT and monitor reassembly",
          description:
            "Chairs, desks, arms, monitors — put back the way they came apart.",
        },
        {
          title: "COI at both buildings",
          description:
            "Landlord-ready, sent 24–48 hours before move.",
        },
        {
          title: "Freight elevator coordination",
          description:
            "Reservation, protection, timing — planned upfront.",
        },
        {
          title: "Furniture disposal option",
          description:
            "We can haul away or donate chairs and desks the new office isn't taking.",
        },
        {
          title: "Post-move box pickup",
          description:
            "Boxes get emptied Monday, we pick them up Tuesday.",
        },
      ],
    },
    midCTA: {
      heading: "Weekend office move?",
      body: "Send us the square footage and both addresses. Real quote same day.",
    },
    faqs: [
      {
        q: "Can you move our office over a weekend?",
        a: "Yes — this is our default for offices under about 5,000 square feet. Load Friday night or Saturday morning; unload Sunday. Monday morning your team's back at work, not sitting on boxes.",
      },
      {
        q: "Do you handle IT equipment and monitors?",
        a: "Yes. Monitors and IT peripherals get wrapped and labeled at your desk, moved as their own load, and reassembled at the new desks. Server racks are handled separately and always last-in / first-out on the truck.",
      },
      {
        q: "Do you provide a moving plan and inventory?",
        a: "Every commercial move over about 10 workstations gets a written moving plan and a labeled inventory — desks, monitors, chairs, filing cabinets, printers. Smaller offices get a lighter version, but nothing goes on the truck unlabeled.",
      },
      {
        q: "Can you haul away old office furniture?",
        a: "Yes — furniture disposal is an add-on. We can also route it to a donation partner if the desks and chairs are still in reusable shape. Tell us during the quote so we can plan the truck space.",
      },
    ],
    relatedServices: ["long-distance-movers", "packing-services", "labor-only-movers"],
    relatedTowns: ["newark-nj", "jersey-city-nj", "montclair-nj", "west-orange-nj"],
    image: IMG.hero,
  },

  {
    slug: "packing-services",
    name: "Packing & Unpacking Services",
    iconName: "Box",
    tagline: "Materials, boxes, and pro-grade packing.",
    h1: "Packing & Unpacking Services in NJ",
    seo: {
      title: "Packing & Unpacking Services in NJ | Haul Yeah Moving",
      description:
        "Professional packing and unpacking services in NJ — full or partial pack, pro-grade materials, dish packs, wardrobe boxes. Free quote in 5 minutes.",
    },
    kicker: "Full pack, partial pack, or just the fragile stuff.",
    lede: "The part of moving you don't want to think about — we pack, we tape, we label.",
    intro: [
      "Packing is the part of moving nobody plans for correctly. You mean to start early. Then you start the night before. Then you're wrapping plates in T-shirts at midnight.",
      "Haul Yeah offers full packing (we pack the entire home the day before your move), partial packing (kitchen, china cabinet, and closets only — you handle the easy stuff), and specialty packing (art, glass, mirrors, TVs, lamps).",
      "We bring pro-grade materials: double-walled dish packs, wardrobe boxes, glassine paper, packing peanuts, custom-cut foam for anything valuable enough to need it. Everything gets labeled by room so unpack day isn't a scavenger hunt.",
    ],
    included: {
      heading: "What professional packing includes",
      items: [
        {
          title: "Pro-grade boxes and materials",
          description:
            "Double-walled dish packs, wardrobe boxes, glassine paper, foam.",
        },
        {
          title: "Labeled by room",
          description:
            "Every box labeled with the room and a contents summary in permanent marker.",
        },
        {
          title: "Kitchen and china pack",
          description:
            "Plates, glassware, and stemware get individual paper wrapping.",
        },
        {
          title: "Wardrobe boxes",
          description:
            "Closets go from rod to box to rod. No wrinkling, no folding.",
        },
        {
          title: "TV and electronics",
          description:
            "Original boxes if you have them; custom foam if you don't.",
        },
        {
          title: "Art and mirrors",
          description:
            "Corner protectors, glassine, and mirror boxes for anything framed.",
        },
        {
          title: "Unpack option",
          description:
            "We come back the day after and unpack you into cabinets and drawers.",
        },
      ],
    },
    midCTA: {
      heading: "Add packing to your move",
      body: "Get a bundled packing + moving quote in one text.",
    },
    faqs: [
      {
        q: "What's the difference between full pack and partial pack?",
        a: "Full pack means we pack the entire home the day before your move — kitchen, closets, bathrooms, garage, everything. Partial pack means we do only the tricky stuff (kitchen, china cabinet, artwork, closets) and you handle the easier rooms yourself, which saves money.",
      },
      {
        q: "How long before my move should packing start?",
        a: "For a 1BR, full pack usually takes 3–5 hours the day before. For a 2BR, plan a full day the day before. For a 3BR house, full pack typically starts 1–2 days before move day. We schedule it as part of the job so nothing's rushed.",
      },
      {
        q: "Do you unpack too?",
        a: "Yes — unpacking is a separate add-on. We come back the day after your move (or same-day if the load unloads by early afternoon) and unpack you into cabinets, drawers, and closets, then haul all the empty boxes and paper away.",
      },
      {
        q: "What if I already bought boxes?",
        a: "No problem — we work with what you've got. We'll bring any extras we need and only charge for what we actually use. If you overbought, we can take unused boxes off your hands at the end.",
      },
    ],
    relatedServices: ["local-movers", "long-distance-movers", "apartment-movers"],
    relatedTowns: ["montclair-nj", "west-orange-nj", "nutley-nj", "bloomfield-nj"],
    image: IMG.packing,
  },

  {
    slug: "piano-movers",
    name: "Piano & Heavy Item Movers",
    iconName: "Music",
    tagline: "Pianos, safes, treadmills — we're built for it.",
    h1: "Piano & Heavy Item Movers in NJ",
    seo: {
      title: "Piano & Heavy Item Movers in NJ | Haul Yeah Moving",
      description:
        "Piano movers NJ — uprights, baby grands, safes, treadmills, gun safes. Skid boards, straps, and 3–4 mover crews. Licensed and insured. Free quote in minutes.",
    },
    kicker: "Pianos. Safes. Treadmills. Yes, we do those.",
    lede: "Heavy, awkward, and expensive-to-replace — that's our lane.",
    intro: [
      "Upright pianos, baby grands, gun safes, treadmills, Peloton bikes on second floors, sleeper sofas with iron frames — some things need more than two guys and a dolly.",
      "Haul Yeah has the gear (piano skid boards, heavy-duty ratchet straps, four-wheel piano dollies, stair-climbing appliance dollies) and the crew (three or four movers depending on the item) to handle heavy items in NJ homes and apartments without cracking a doorframe or dropping a leg through your floor.",
      "We do standalone heavy-item jobs (just the piano, nothing else) and add-ons to a full move. Uprights, spinets, consoles, baby grands, and full grands are all in scope. Tell us the make and model when you ask for a quote so we bring the right rig.",
    ],
    included: {
      heading: "What heavy-item movers should bring",
      items: [
        {
          title: "Piano skid board and straps",
          description:
            "Uprights go on the skid, straps do the lifting, not somebody's back.",
        },
        {
          title: "Four-wheel piano dolly",
          description:
            "For horizontal moves through hallways and driveways.",
        },
        {
          title: "Stair-climbing appliance dolly",
          description:
            "For safes, refrigerators, and washer/dryers on stairs.",
        },
        {
          title: "3–4 mover crews",
          description:
            "Never a two-mover job. Enough hands to keep everyone safe.",
        },
        {
          title: "Full disassembly on grands",
          description:
            "Legs and pedal lyre come off; instrument goes on its side on a padded board.",
        },
        {
          title: "Blanket + shrink wrap",
          description:
            "Nothing rides bare in the truck. Ever.",
        },
        {
          title: "Insurance to match",
          description:
            "Our cargo insurance covers heavy items at declared value.",
        },
      ],
    },
    midCTA: {
      heading: "Piano quote in minutes",
      body: "Tell us the type (upright / baby grand / grand), floors, and stairs.",
    },
    faqs: [
      {
        q: "How do you move an upright piano vs. a baby grand?",
        a: "Uprights ride upright on a heavy-duty skid board, secured with straps, moved on a four-wheel dolly. Baby grands are tipped onto their side onto a padded board (called being 'boarded up'), legs and pedal lyre removed, then wrapped in blankets. Both take a three-mover crew minimum.",
      },
      {
        q: "Can you move a piano to a second floor?",
        a: "Yes, with a stair-climbing dolly and a four-mover crew for uprights, more for grands. Long staircases and narrow turns take longer; we'll ask about the specifics on the quote so we bring the right size skid board.",
      },
      {
        q: "Do you move safes and gun safes?",
        a: "Yes — up to about 1,000 lbs on a standard job. Anything heavier, we'll ask a few questions to confirm we can crew it safely. Tell us the weight and floor when you ask for a quote.",
      },
      {
        q: "What about treadmills and Peloton bikes?",
        a: "Yes — those are common heavy items for us. Treadmills usually fold or partially disassemble; Pelotons we disassemble the touchscreen arm and pedals for tight staircases. Both are common add-ons to a full move.",
      },
    ],
    relatedServices: ["local-movers", "labor-only-movers", "long-distance-movers"],
    relatedTowns: ["west-orange-nj", "montclair-nj", "nutley-nj", "bloomfield-nj"],
    image: IMG.team,
  },

  {
    slug: "labor-only-movers",
    name: "Labor-Only Loading & Unloading Help",
    iconName: "HardHat",
    tagline: "Got a truck? We'll bring the muscle.",
    h1: "Labor-Only Loading & Unloading Help in NJ",
    seo: {
      title: "Labor-Only Movers in NJ | Haul Yeah Moving",
      description:
        "Labor only movers NJ — you rent the truck, we bring the crew. Loading, unloading, or both. Licensed and insured. Free quote in under 5 minutes.",
    },
    kicker: "Got a truck? We'll bring the muscle.",
    lede: "You rent the truck, we bring the crew — loading, unloading, or both.",
    intro: [
      "Sometimes you don't need a truck. Maybe you already booked a U-Haul, PODS, or Penske. Maybe your dad is driving up with his F-150. Maybe you just need help getting a house's worth of stuff onto a truck without pulling your back out.",
      "Labor-only means we bring the crew — two, three, or four movers depending on the load — and the tools (dollies, straps, blankets, shrink wrap). You bring the truck.",
      "We do labor-only jobs across NJ every week: U-Haul loads out of Bloomfield storage units, PODS unloads into new Nutley homes, dad-with-a-truck runs from an Irvington basement to an Airbnb in Jersey City. Hourly, transparent, no minimums beyond a two-hour floor.",
    ],
    included: {
      heading: "What labor-only includes",
      items: [
        {
          title: "Trained mover crew",
          description:
            "2, 3, or 4 movers depending on your load size.",
        },
        {
          title: "Blankets, straps, and dollies",
          description:
            "We bring the pro gear even when we don't bring the truck.",
        },
        {
          title: "Loading, unloading, or both",
          description:
            "Pick which end. Or both, same day.",
        },
        {
          title: "Truck-tetris pros",
          description:
            "We pack the truck tight so nothing shifts and nothing gets left behind.",
        },
        {
          title: "Furniture disassembly",
          description:
            "Beds and tables come apart before they go on the truck.",
        },
        {
          title: "Two-hour minimum",
          description:
            "Real hourly billing after that, not the 3–4 hour minimums other movers push.",
        },
      ],
    },
    midCTA: {
      heading: "Bring the crew, not the truck",
      body: "Text us the truck size and load list. Live hourly quote in minutes.",
    },
    faqs: [
      {
        q: "What's the two-hour minimum?",
        a: "For labor-only jobs we bill a two-hour minimum, then real hourly billing after that. So a 90-minute unload gets billed at 2 hours; a 3-hour load gets billed at 3 hours. More honest than the 4-hour minimums the big-name mover-labor apps push.",
      },
      {
        q: "Do you supply blankets, straps, and dollies?",
        a: "Yes — we bring the pro-mover gear (four-wheel dollies, appliance dollies, moving blankets, ratchet straps, shrink wrap) even for labor-only jobs. Rental trucks usually only come with a couple thin pads, which isn't enough.",
      },
      {
        q: "Can you load a PODS or ReloCube?",
        a: "Yes — PODS, ReloCubes, and U-Box units are common labor-only jobs for us. We tetris the container tight so nothing shifts in transit and you get the full cubic footage you paid for.",
      },
      {
        q: "Do you provide insurance on labor-only jobs?",
        a: "Yes — our workers' comp and general liability apply on labor-only jobs. Cargo insurance on the load itself depends on the truck rental company's terms (U-Haul, Penske, PODS each have their own). We'll walk you through it before the crew shows up.",
      },
    ],
    relatedServices: ["small-moves", "local-movers", "piano-movers"],
    relatedTowns: ["bloomfield-nj", "nutley-nj", "irvington-nj", "belleville-nj"],
    image: IMG.team,
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}
