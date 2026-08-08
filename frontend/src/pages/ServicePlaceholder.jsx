import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import TallyPopupButton from "../components/site/TallyPopupButton";
import siteConfig from "../data/siteConfig";

/**
 * Placeholder for /services/:slug — Phase 2 will fill in real content.
 * Prevents 404s from any homepage service card link.
 */
export default function ServicePlaceholder() {
  const { slug } = useParams();
  const service = siteConfig.services.find((s) => s.slug === slug);
  const title = service ? service.name : "Moving Service";

  return (
    <>
      <title>{`${title} in ${siteConfig.business.serviceArea} | ${siteConfig.business.name}`}</title>
      <meta
        name="description"
        content={`${title} in ${siteConfig.business.serviceArea}. Licensed and insured. Response in ${siteConfig.contact.responseTime}. Call ${siteConfig.contact.phoneDisplay}.`}
      />
      <link
        rel="canonical"
        href={`${siteConfig.business.baseUrl}/services/${slug}`}
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Link
          to="/#services"
          data-testid="service-placeholder-back"
          className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-orange transition-colors hover:text-orange-hover"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
          Back to services
        </Link>

        <h1
          className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl"
          data-testid="service-placeholder-h1"
        >
          {title}{" "}
          <span className="text-orange">in {siteConfig.business.serviceArea}.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {service?.tagline ||
            "Licensed and insured local movers, 7 days a week."}{" "}
          A full page for this service is coming soon — but the trucks and
          crew are already rolling. Get an all-in quote in{" "}
          {siteConfig.contact.responseTime}.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <TallyPopupButton
            testId="service-placeholder-quote-btn"
            size="lg"
          >
            Get My Free Quote
          </TallyPopupButton>
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            data-testid="service-placeholder-phone-link"
            className="inline-flex items-center gap-2 px-2 py-3 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:text-orange"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            Call {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
