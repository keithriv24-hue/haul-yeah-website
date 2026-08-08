import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MapPin } from "lucide-react";
import TallyPopupButton from "../components/site/TallyPopupButton";
import siteConfig from "../data/siteConfig";

/**
 * Placeholder for /movers/:slug — Phase 2 will fill in per-town content.
 * Prevents 404s from any homepage location card link.
 */
export default function LocationPlaceholder() {
  const { slug } = useParams();
  const location = siteConfig.locations.find((l) => l.slug === slug);
  const name = location ? location.name : "New Jersey";

  return (
    <>
      <title>{`Movers in ${name}, NJ | ${siteConfig.business.name}`}</title>
      <meta
        name="description"
        content={`Movers in ${name}, NJ. Licensed and insured local moving, weekend movers NJ, same day movers NJ. Response in ${siteConfig.contact.responseTime}.`}
      />
      <link
        rel="canonical"
        href={`${siteConfig.business.baseUrl}/movers/${slug}`}
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Link
          to="/#locations"
          data-testid="location-placeholder-back"
          className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-orange transition-colors hover:text-orange-hover"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
          Back to locations
        </Link>

        <p className="mt-6 inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy">
          <MapPin className="h-4 w-4 text-orange" strokeWidth={2.4} />
          {name}, NJ · {siteConfig.business.serviceArea}
        </p>

        <h1
          className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl"
          data-testid="location-placeholder-h1"
        >
          Movers in {name},{" "}
          <span className="text-orange">New Jersey.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Weekend, same-day, small-move, and full-service local moving in{" "}
          {name}. Licensed and insured. A full page for this town is coming
          soon — but our crews already dispatch here 7 days a week.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <TallyPopupButton
            testId="location-placeholder-quote-btn"
            size="lg"
          >
            Get My Free Quote
          </TallyPopupButton>
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            data-testid="location-placeholder-phone-link"
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
