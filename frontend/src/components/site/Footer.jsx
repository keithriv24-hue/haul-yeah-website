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

  const sp = siteConfig.socialProfiles || {};
  const socialLinks = [
    { key: "facebook", url: sp.facebook, label: "Haul Yeah Moving on Facebook",
      path: "M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.56-1.5H17V4.6c-.29-.04-1.27-.12-2.4-.12-2.38 0-4.01 1.45-4.01 4.12v2.3H7.9V14h2.7v8h2.9z" },
    { key: "instagram", url: sp.instagram, label: "Haul Yeah Moving on Instagram",
      path: "M12 8.1a3.9 3.9 0 100 7.8 3.9 3.9 0 000-7.8zm0 6.43a2.53 2.53 0 110-5.06 2.53 2.53 0 010 5.06zm4.97-6.6a.91.91 0 11-1.82 0 .91.91 0 011.82 0zM12 4.55c-2.03 0-2.29.01-3.09.05-.8.03-1.34.16-1.82.34-.5.19-.92.45-1.34.87-.42.42-.68.84-.87 1.34-.18.48-.31 1.02-.34 1.82C4.5 9.71 4.5 9.97 4.5 12s.01 2.29.05 3.09c.03.8.16 1.34.34 1.82.19.5.45.92.87 1.34.42.42.84.68 1.34.87.48.18 1.02.31 1.82.34.8.04 1.06.05 3.09.05s2.29-.01 3.09-.05c.8-.03 1.34-.16 1.82-.34.5-.19.92-.45 1.34-.87.42-.42.68-.84.87-1.34.18-.48.31-1.02.34-1.82.04-.8.05-1.06.05-3.09s-.01-2.29-.05-3.09c-.03-.8-.16-1.34-.34-1.82a3.6 3.6 0 00-.87-1.34 3.6 3.6 0 00-1.34-.87c-.48-.18-1.02-.31-1.82-.34-.8-.04-1.06-.05-3.09-.05zm0 1.35c2 0 2.24.01 3.03.04.73.04 1.13.16 1.39.26.35.14.6.3.86.56.26.26.42.51.56.86.1.26.22.66.26 1.39.03.79.04 1.03.04 3.03s-.01 2.24-.04 3.03c-.04.73-.16 1.13-.26 1.39-.14.35-.3.6-.56.86-.26.26-.51.42-.86.56-.26.1-.66.22-1.39.26-.79.03-1.03.04-3.03.04s-2.24-.01-3.03-.04c-.73-.04-1.13-.16-1.39-.26a2.3 2.3 0 01-.86-.56 2.3 2.3 0 01-.56-.86c-.1-.26-.22-.66-.26-1.39-.03-.79-.04-1.03-.04-3.03s.01-2.24.04-3.03c.04-.73.16-1.13.26-1.39.14-.35.3-.6.56-.86.26-.26.51-.42.86-.56.26-.1.66-.22 1.39-.26.79-.03 1.03-.04 3.03-.04z" },
    { key: "tiktok", url: sp.tiktok, label: "Haul Yeah Moving on TikTok",
      path: "M16.6 5.82A4.28 4.28 0 0115.4 3h-2.98v11.43a2.2 2.2 0 11-2.2-2.2c.2 0 .4.03.6.08V9.3a5.06 5.06 0 00-.6-.04A5.15 5.15 0 1015.4 14.4V8.9a6.94 6.94 0 004.05 1.3V7.22a4.28 4.28 0 01-2.85-1.4z" },
    { key: "x", url: sp.x, label: "Haul Yeah Moving on X",
      path: "M17.53 4.5h2.4l-5.24 6 6.17 8.16h-4.83l-3.78-4.95-4.33 4.95H5.5l5.6-6.4L5.2 4.5h4.95l3.42 4.52L17.53 4.5zm-.84 12.7h1.33L8.4 5.86H6.97l9.72 11.34z" },
    { key: "google", url: sp.googleBusiness, label: "Haul Yeah Moving on Google",
      path: "M12 2C8.14 2 5 5.14 5 9c0 5.05 6.3 12.44 6.57 12.75a.57.57 0 00.86 0C12.7 21.44 19 14.05 19 9c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" },
  ].filter((l) => Boolean(l.url));

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
            {socialLinks.length > 0 && (
              <div
                className="mt-5 flex items-center gap-3"
                data-testid="footer-social-links"
              >
                {socialLinks.map((l) => (
                  <a
                    key={l.key}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l.label}
                    data-testid={`footer-social-${l.key}`}
                    className="text-cream/70 outline-none transition-colors hover:text-orange-bright focus-visible:text-orange-bright focus-visible:ring-2 focus-visible:ring-orange-bright"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={l.path} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
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
