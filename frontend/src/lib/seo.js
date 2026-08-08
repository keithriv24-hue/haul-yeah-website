/*
 * JSON-LD builders for MovingCompany (LocalBusiness subtype) and FAQPage.
 * These are rendered inside <script type="application/ld+json"> tags on the homepage.
 */

import siteConfig from "../data/siteConfig";

export function buildMovingCompanyJsonLd() {
  const areaServed = [
    ...siteConfig.locations.map((l) => `${l.name}, NJ`),
    siteConfig.business.serviceArea,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: siteConfig.business.name,
    description:
      "Licensed and insured local moving company specializing in weekend, same-day, and small moves in Essex County, New Jersey.",
    url: siteConfig.business.baseUrl,
    telephone: siteConfig.contact.phoneTel,
    email: siteConfig.contact.email,
    areaServed,
    address: {
      "@type": "PostalAddress",
      addressRegion: "NJ",
      addressCountry: "US",
      addressLocality: "Essex County",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "21:00",
      },
    ],
    priceRange: "$$",
    slogan: siteConfig.business.tagline,
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
