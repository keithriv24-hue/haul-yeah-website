import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import siteConfig from "../../data/siteConfig";
import { locations } from "../../data/locations";

/**
 * Locations grid — 10 NJ town cards linking to /movers/[slug] placeholders.
 * Dense, text-focused. Hover flips border to orange.
 */
export default function LocationsSection() {
  return (
    <section
      id="locations"
      className="border-b border-slate-200 bg-white py-20 sm:py-28"
      aria-labelledby="locations-heading"
      data-testid="locations-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              Where we move
            </p>
            <h2
              id="locations-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              Moving companies near you — {siteConfig.business.serviceArea}.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Based in Essex County and dispatching across North & Central New
              Jersey. If your town isn&apos;t listed, we probably still service
              it — just ask.
            </p>
          </div>

          <p className="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-navy">
            <MapPin className="h-4 w-4 text-orange" strokeWidth={2.4} />
            10 core towns · full NJ coverage
          </p>
        </div>

        <ul
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          data-testid="locations-grid"
        >
          {locations.map((loc) => (
            <li key={loc.slug}>
              <Link
                to={`/movers/${loc.slug}/`}
                data-testid={`location-card-${loc.slug}`}
                className="group flex h-full flex-col justify-between rounded-md border border-slate-200 bg-white p-5 transition-colors hover:border-orange"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 group-hover:text-orange">
                    Movers in
                  </p>
                  <p className="mt-1 font-display text-base font-bold tracking-tight text-navy sm:text-lg">
                    {loc.name}, NJ
                  </p>
                </div>
                <ArrowRight
                  className="mt-6 h-4 w-4 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-orange"
                  strokeWidth={2.4}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
