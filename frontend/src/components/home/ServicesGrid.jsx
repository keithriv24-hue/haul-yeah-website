import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "../../data/siteConfig";
import { services } from "../../data/services";

/**
 * Services rail — numbered cards, horizontally scrollable on phone/tablet
 * and a 3-up grid from 1100px (see `.rail` in index.css).
 *
 * Icons were removed in the redesign: at this type scale the number plate and
 * the Archivo Black title carry the hierarchy, and dropping lucide icons here
 * takes a chunk of JS off the homepage's critical path for no loss of
 * comprehension.
 */
export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="band band--cream"
      data-testid="services-section"
    >
      <div className="wrap">
        <div className="bh rv">
          <h2 data-testid="services-heading">What we move</h2>
          <p>
            Nine services, one price format — all-in, in writing, before you
            book. Not sure which fits?{" "}
            <a
              href={`sms:${siteConfig.contact.phoneTel}`}
              className="font-bold text-orange underline underline-offset-4"
              data-testid="services-sms-inline"
            >
              Text us the details
            </a>{" "}
            and we'll tell you.
          </p>
        </div>

        <div className="rail rv" data-testid="services-grid">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}/`}
              data-testid={`service-card-${service.slug}`}
            >
              <span className="n">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{service.name}</h3>
              <p>{service.tagline}</p>
              <span className="go">See more →</span>
            </Link>
          ))}
        </div>
        <p className="rail-hint">Scroll →</p>
      </div>
    </section>
  );
}
