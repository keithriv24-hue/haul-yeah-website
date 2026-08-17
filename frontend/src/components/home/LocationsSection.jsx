import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "../../data/siteConfig";
import { locations } from "../../data/locations";

/**
 * Towns band — orange, with the town names set as a single run of large
 * display links separated by dots. Dense on purpose: this is the homepage's
 * main internal-linking surface into the ten town pages, and reading as one
 * continuous line makes ten links feel like one statement instead of a
 * directory listing.
 */
export default function LocationsSection() {
  return (
    <section
      id="locations"
      className="band band--orange"
      aria-labelledby="locations-heading"
      data-testid="locations-section"
    >
      <div className="wrap">
        <div className="bh rv">
          <h2 id="locations-heading">Towns we run</h2>
          <p>
            {siteConfig.business.serviceArea} and the towns around it. Just
            outside the list? Ask anyway — we usually still come.
          </p>
        </div>

        <div
          className="rv flex flex-wrap items-baseline gap-x-4 gap-y-2 font-display text-[clamp(22px,3.4vw,44px)] uppercase leading-[1.15] tracking-[-0.03em]"
          data-testid="locations-grid"
        >
          {locations.map((loc, i) => (
            <React.Fragment key={loc.slug}>
              {i > 0 && (
                <span className="text-cream/45" aria-hidden="true">
                  ·
                </span>
              )}
              <Link
                to={`/movers/${loc.slug}/`}
                data-testid={`location-card-${loc.slug}`}
                className="no-underline transition-colors hover:text-ink"
              >
                {loc.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
