import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import TallyPopupButton from "./TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Sticky black signage header.
 * - Desktop: wordmark, nav with orange underline on hover, phone plate,
 *   orange Free Quote plate.
 * - Mobile: wordmark + hamburger. The phone/quote pair lives in the fixed
 *   bottom MobileCTABar instead, so it is always reachable with a thumb.
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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-[60] bg-ink text-cream"
      data-testid="site-header"
    >
      <div className="wrap flex h-[62px] items-center justify-between sm:h-[70px]">
        <Logo tone="cream" />

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
          data-testid="desktop-nav"
        >
          {siteConfig.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className="border-b-[3px] border-transparent py-1.5 text-[13px] font-semibold uppercase tracking-[0.1em] no-underline transition-colors hover:border-orange-bright"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            data-testid="header-phone-link"
            className="plate hover:bg-cream hover:text-ink"
          >
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] opacity-70">
              Call
            </span>
            {siteConfig.contact.phoneDisplay}
          </a>
          <TallyPopupButton
            variant="plate"
            testId="header-free-quote-btn"
            className="border-orange-bright bg-orange-bright text-ink"
          >
            Free quote
          </TallyPopupButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-testid="mobile-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center border-2 border-cream text-cream lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={2.6} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2.6} />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="lg:hidden" data-testid="mobile-menu">
          <nav
            className="wrap border-t-4 border-orange-bright bg-ink pb-8 pt-2"
            aria-label="Mobile primary"
          >
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => (
                <li key={item.label} className="border-b border-cream/15">
                  <a
                    href={item.href}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                    className="block py-4 font-display text-2xl uppercase tracking-[-0.02em] no-underline"
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
                className="sbtn sbtn--ghost sbtn--full"
              >
                Call {siteConfig.contact.phoneDisplay}
              </a>
              <TallyPopupButton testId="mobile-menu-quote-btn" fullWidth>
                Free quote
              </TallyPopupButton>
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/60">
                {siteConfig.business.hoursShort} · Reply in{" "}
                {siteConfig.contact.responseTime}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
