/*
 * JSON-LD builders.
 * ─────────────────────────────────────────────────────────────
 * - buildMovingCompanyJsonLd()          → homepage (LocalBusiness / MovingCompany)
 * - buildLocationJsonLd(location)       → per-town page (MovingCompany with narrower areaServed)
 * - buildServiceJsonLd(service)         → per-service page (@type Service, provider=MovingCompany)
 * - buildFaqJsonLd(faqs)                → any page with FAQs (defaults to homepage faqs)
 */

import siteConfig from "../data/siteConfig";
import { locations } from "../data/locations";

const MOVING_COMPANY_ID = `${siteConfig.business.baseUrl}#business`;

function movingCompanyEntity(areaServed) {
  return {
    "@type": "MovingCompany",
    "@id": MOVING_COMPANY_ID,
    name: siteConfig.business.name,
    description:
      "Local moving company specializing in weekend, same-day, and small moves in Essex County, New Jersey.",
    url: siteConfig.business.baseUrl,
    telephone: siteConfig.contact.phoneTel,
    email: siteConfig.contact.email,
    image: `${siteConfig.business.baseUrl}${siteConfig.branding.ogImagePath}`,
    logo: `${siteConfig.business.baseUrl}${siteConfig.branding.logoPath}`,
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

export function buildMovingCompanyJsonLd() {
  const areaServed = [
    ...locations.map((l) => `${l.name}, NJ`),
    siteConfig.business.serviceArea,
  ];
  return { "@context": "https://schema.org", ...movingCompanyEntity(areaServed) };
}

export function buildLocationJsonLd(location) {
  const areaServed = [`${location.name}, NJ`, siteConfig.business.serviceArea];
  return {
    "@context": "https://schema.org",
    ...movingCompanyEntity(areaServed),
    // Narrow the entity to the town's page URL
    "@id": `${siteConfig.business.baseUrl}/movers/${location.slug}/#business`,
    url: `${siteConfig.business.baseUrl}/movers/${location.slug}/`,
  };
}

export function buildServiceJsonLd(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.h1,
    description: service.seo.description,
    url: `${siteConfig.business.baseUrl}/services/${service.slug}/`,
    areaServed: [
      ...locations.map((l) => `${l.name}, NJ`),
      siteConfig.business.serviceArea,
    ],
    provider: {
      "@type": "MovingCompany",
      "@id": MOVING_COMPANY_ID,
      name: siteConfig.business.name,
      telephone: siteConfig.contact.phoneTel,
      url: siteConfig.business.baseUrl,
    },
  };
}

export function buildFaqJsonLd(faqs = siteConfig.faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
