import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import siteConfig from "../../data/siteConfig";
import { services } from "../../data/services";
import { locations } from "../../data/locations";

const currentYear = new Date().getFullYear();

/**
 * Black signage footer with the oversized HAUL YEAH watermark.
 *
 * Carries the full NAP line, the regulator numbers (when issued), and the
 * complete service + town link grid — this is the site's densest internal
 * linking surface and it renders on all 21 pages, so town and service pages
 * all link to each other through here.
 */
export default function Footer() {
  const compliance = [
    siteConfig.compliance.njMoverLicense &&
      `${siteConfig.compliance.prefixLabel} ${siteConfig.compliance.njMoverLicense}`,
    siteConfig.compliance.usDot && `USDOT ${siteConfig.compliance.usDot}`,
    siteConfig.compliance.mcNumber && `MC ${siteConfig.compliance.mcNumber}`,
  ].filter(Boolean);

  return (
    <footer
      className="overflow-hidden bg-ink-soft pt-14 text-[15px] text-cream/70"
      id="contact"
      data-testid="site-footer"
    >
      <div className="wrap">
        <div className="grid gap-9 border-b border-cream/20 pb-9 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Column 1 — brand + NAP */}
          <div>
            <Logo tone="cream" />
            <p className="mt-3 max-w-[30ch]" data-testid="footer-nap-line">
              {siteConfig.business.napLine}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              data-testid="footer-email-link"
              className="mt-2 inline-block no-underline hover:text-orange-bright"
            >
              {siteConfig.contact.email}
            </a>
            <div className="mt-4 flex flex-col gap-1">
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                data-testid="footer-phone-link"
                className="font-display text-xl tracking-[-0.02em] text-cream no-underline hover:text-orange-bright"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`sms:${siteConfig.contact.phoneTel}`}
                data-testid="footer-sms-link"
                className="text-sm no-underline hover:text-orange-bright"
              >
                Text us — fastest way to a number
              </a>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-cream/50">
              {siteConfig.business.hoursShort}
            </p>
          </div>

          {/* Column 2 — services */}
          <div>
            <h4 className="mb-3 text-cream">Services</h4>
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}/`}
                data-testid={`footer-service-${s.slug}`}
                className="block py-1 no-underline hover:text-orange-bright"
              >
                {s.name}
              </Link>
            ))}
          </div>

          {/* Column 3 — towns */}
          <div>
            <h4 className="mb-3 text-cream">Service area</h4>
            {locations.map((l) => (
              <Link
                key={l.slug}
                to={`/movers/${l.slug}/`}
                data-testid={`footer-location-${l.slug}`}
                className="block py-1 no-underline hover:text-orange-bright"
              >
                Movers in {l.name}, NJ
              </Link>
            ))}
          </div>

          {/* Column 4 — company */}
          <div>
            <h4 className="mb-3 text-cream">Company</h4>
            {siteConfig.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-testid={`footer-nav-${item.label.toLowerCase()}`}
                className="block py-1 no-underline hover:text-orange-bright"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-6 border-2 border-cream/25 p-4">
              <h4 className="text-cream">Fleet</h4>
              <p className="mt-2 text-sm leading-relaxed">
                {siteConfig.business.fleet}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar — regulator numbers render only once issued.
            NJ requires the Public Mover licence number to appear in
            advertising, and this website is advertising. See the compliance
            block in siteConfig.js before touching this. */}
        <div className="flex flex-wrap justify-between gap-4 pt-5 text-[13px]">
          <span>
            © {currentYear} {siteConfig.business.name} · {siteConfig.business.serviceArea}
          </span>
          {compliance.length > 0 && (
            <span data-testid="footer-compliance-line">
              {compliance.join("  ·  ")}
            </span>
          )}
        </div>

        <div className="f-mark" aria-hidden="true">
          HAUL YEAH
        </div>
      </div>
    </footer>
  );
}
