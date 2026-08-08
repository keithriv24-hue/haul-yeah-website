import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Building2,
  PackageOpen,
  Zap,
  CalendarDays,
  Truck,
  Briefcase,
  Box,
  Music,
  HardHat,
  ArrowUpRight,
} from "lucide-react";
import siteConfig from "../../data/siteConfig";
import { services } from "../../data/services";

const ICON_MAP = {
  Home,
  Building2,
  PackageOpen,
  Zap,
  CalendarDays,
  Truck,
  Briefcase,
  Box,
  Music,
  HardHat,
};

/**
 * 10-card services grid. Bento-style: first card ("Local Residential Movers")
 * spans 2 columns on lg to break the grid rhythm. All cards link to
 * their /services/[slug] placeholder page (Phase 2 fills content).
 */
export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="border-b border-slate-200 bg-white py-20 sm:py-28"
      data-testid="services-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
            What we move
          </p>
          <h2
            className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl lg:text-5xl"
            data-testid="services-heading"
          >
            Ten ways we get your stuff from A to B — the right way.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Every move is different. Studios, weekend rushes, cross-town office
            hops, and everything in between. Pick the closest fit or just{" "}
            <a
              href={`sms:${siteConfig.contact.phoneTel}`}
              className="font-semibold text-orange underline underline-offset-4 hover:text-orange-hover"
              data-testid="services-sms-inline"
            >
              text us the details
            </a>
            .
          </p>
        </div>

        <ul
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-testid="services-grid"
        >
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.iconName] || Truck;
            const featured = index === 0;
            return (
              <li
                key={service.slug}
                className={
                  featured
                    ? "lg:col-span-2"
                    : ""
                }
              >
                <Link
                  to={`/services/${service.slug}`}
                  data-testid={`service-card-${service.slug}`}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-slate-200 bg-white p-6 transition-colors hover:border-navy sm:p-8 ${
                    featured
                      ? "lg:bg-navy lg:text-white lg:hover:border-orange"
                      : ""
                  }`}
                >
                  <div>
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-sm ${
                        featured
                          ? "bg-orange text-white lg:bg-orange"
                          : "bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white"
                      } transition-colors`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <h3
                      className={`mt-6 font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl ${
                        featured ? "lg:text-white text-navy" : "text-navy"
                      }`}
                    >
                      {service.name}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        featured ? "lg:text-slate-300 text-slate-600" : "text-slate-600"
                      }`}
                    >
                      {service.tagline}
                    </p>
                  </div>

                  <div
                    className={`mt-8 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest ${
                      featured ? "lg:text-orange text-orange" : "text-orange"
                    }`}
                  >
                    Learn more
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.4}
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
