import React, { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import TrustBar from "../components/home/TrustBar";
import ServicesGrid from "../components/home/ServicesGrid";
import WhySection from "../components/home/WhySection";
import LocationsSection from "../components/home/LocationsSection";
import HowItWorks from "../components/home/HowItWorks";
import PricingBoard from "../components/home/PricingBoard";
import FAQSection from "../components/home/FAQSection";
import FinalCTA from "../components/home/FinalCTA";
import GoogleReviews from "../components/site/GoogleReviews";
import siteConfig from "../data/siteConfig";
import useReveal from "../lib/useReveal";
import { buildFaqJsonLd, buildMovingCompanyJsonLd } from "../lib/seo";

/**
 * Homepage — route "/".
 * Renders per-page <title>, <meta>, and two JSON-LD blocks (MovingCompany + FAQPage).
 * React 19 hoists <title>/<meta> into <head> automatically.
 */
export default function Home() {
  useReveal();

  useEffect(() => {
    // If user landed with a hash, respect it after initial layout.
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const movingCompanyLd = buildMovingCompanyJsonLd();
  const faqLd = buildFaqJsonLd();

  return (
    <>
      <title>{siteConfig.seo.homepage.title}</title>
      <meta name="description" content={siteConfig.seo.homepage.description} />
      <meta property="og:title" content={siteConfig.seo.homepage.title} />
      <meta
        property="og:description"
        content={siteConfig.seo.homepage.description}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteConfig.business.baseUrl + "/"} />
      <meta property="og:image" content={`${siteConfig.business.baseUrl}${siteConfig.branding.ogImagePath}`} />
      <meta property="og:image:width" content={siteConfig.branding.ogImageWidth} />
      <meta property="og:image:height" content={siteConfig.branding.ogImageHeight} />
      <meta property="og:image:alt" content={siteConfig.branding.ogImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${siteConfig.business.baseUrl}${siteConfig.branding.ogImagePath}`} />
      <link rel="canonical" href={siteConfig.business.baseUrl + "/"} />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movingCompanyLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <WhySection />
      <PricingBoard />
      <GoogleReviews />
      <LocationsSection />
      <HowItWorks />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
