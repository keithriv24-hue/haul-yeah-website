import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import TallyPopupButton from "./TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Sticky top header for every page.
 * - Desktop: logo, nav links, hours pill, phone CTA, orange Free Quote button.
 * - Mobile: logo, hamburger menu (full-screen sheet), phone icon.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Close mobile menu on route/hash change
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  // Prevent body scroll while mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      data-testid="site-header"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
          data-testid="desktop-nav"
        >
          {siteConfig.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className="font-display text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-orange"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-4 lg:flex">
          <div
            className="hidden items-center gap-2 border-l border-slate-200 pl-4 xl:flex"
            data-testid="header-hours"
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-orange"
              aria-hidden="true"
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-navy">
              {siteConfig.business.hoursShort}
            </span>
          </div>
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            data-testid="header-phone-link"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            <span className="font-display">{siteConfig.contact.phoneDisplay}</span>
          </a>
          <TallyPopupButton
            size="md"
            testId="header-free-quote-btn"
          >
            Free Quote
          </TallyPopupButton>
        </div>

        {/* Mobile right cluster */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            data-testid="mobile-header-phone"
            aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 text-navy transition-colors hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 text-navy transition-colors hover:bg-slate-50"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={2.4} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.4} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="lg:hidden"
          data-testid="mobile-menu"
        >
          <nav
            className="border-t border-slate-200 bg-white px-4 pb-8 pt-4 sm:px-6"
            aria-label="Mobile primary"
          >
            <ul className="flex flex-col divide-y divide-slate-100">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                    className="block py-4 font-display text-lg font-bold uppercase tracking-wide text-navy transition-colors hover:text-orange"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                data-testid="mobile-menu-call-btn"
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-navy px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
              >
                <Phone className="h-4 w-4" strokeWidth={2.4} />
                Call {siteConfig.contact.phoneDisplay}
              </a>
              <TallyPopupButton
                testId="mobile-menu-quote-btn"
                fullWidth
                size="lg"
              >
                Free Quote
              </TallyPopupButton>
              <p className="text-center text-xs uppercase tracking-widest text-slate-500">
                {siteConfig.business.hoursShort} · Response in{" "}
                {siteConfig.contact.responseTime}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
