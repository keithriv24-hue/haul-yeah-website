import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, Mail, Truck } from "lucide-react";
import Logo from "./Logo";
import siteConfig from "../../data/siteConfig";
import { services } from "../../data/services";
import { locations } from "../../data/locations";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="border-t border-slate-200 bg-white pt-16 pb-10"
      id="contact"
      data-testid="site-footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — brand + NAP */}
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-600">
              {siteConfig.business.tagline}. Licensed & insured local movers
              serving {siteConfig.business.serviceArea}, 7 days a week.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                data-testid="footer-phone-link"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange"
              >
                <Phone className="h-4 w-4" strokeWidth={2.4} />
                <span className="font-display">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </a>
              <br />
              <a
                href={`sms:${siteConfig.contact.phoneTel}`}
                data-testid="footer-sms-link"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange"
              >
                <MessageSquare className="h-4 w-4" strokeWidth={2.4} />
                Text us — same-day OK
              </a>
              <br />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                data-testid="footer-email-link"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange"
              >
                <Mail className="h-4 w-4" strokeWidth={2.4} />
                {siteConfig.contact.email}
              </a>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-slate-500">
              {siteConfig.business.hoursShort}
            </p>
          </div>

          {/* Column 2 — services */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-navy">
              Services
            </h3>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    data-testid={`footer-service-${s.slug}`}
                    className="text-sm text-slate-600 transition-colors hover:text-orange"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — locations */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-navy">
              Service Area
            </h3>
            <ul className="mt-6 space-y-3">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link
                    to={`/movers/${l.slug}`}
                    data-testid={`footer-location-${l.slug}`}
                    className="text-sm text-slate-600 transition-colors hover:text-orange"
                  >
                    Movers in {l.name}, NJ
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — trust + nav */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-navy">
              Company
            </h3>
            <ul className="mt-6 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    data-testid={`footer-nav-${item.label.toLowerCase()}`}
                    className="text-sm text-slate-600 transition-colors hover:text-orange"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-sm border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-navy">
                <Truck className="h-4 w-4" strokeWidth={2.4} />
                <span className="font-display text-xs font-bold uppercase tracking-widest">
                  Licensed & Insured
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                NJ-licensed and insured mover. {siteConfig.business.fleet}.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom NAP bar */}
        <div className="mt-16 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-navy"
              data-testid="footer-nap-line"
            >
              {siteConfig.business.napLine}
            </p>
            <p className="text-xs text-slate-500">
              © {currentYear} {siteConfig.business.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
