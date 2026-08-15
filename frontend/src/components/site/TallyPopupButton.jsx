import React from "react";
import siteConfig from "../../data/siteConfig";
import { openTallyPopup } from "../../lib/tally";
import { trackQuoteStart } from "../../lib/analytics";
import QuoteConsent from "./QuoteConsent";

/**
 * Universal "Free Quote" button.
 * ─────────────────────────────────────────────────────────────
 * Renders as an <a> so if JS is off, clicking still opens the plain form.
 * On click we call openTallyPopup(), which:
 *   1. Waits for Meta identifiers (fbclid / _fbp / _fbc / event_source_url)
 *   2. Opens Tally.openPopup with those as hiddenFields
 *   3. Falls back to opening the plain form URL with the identifiers as
 *      query params in a new tab if the Tally script is blocked.
 *
 * Set showConsent={true} on prominent page-level CTAs to render the SMS/TCPA
 * consent microcopy directly under the button. Compact CTAs (header, mobile
 * bar) omit it to avoid clutter — the consent is still visible in the inline
 * embed on the homepage and next to every primary quote CTA on inner pages.
 */
export default function TallyPopupButton({
  children = "Free Quote",
  variant = "primary",
  size = "md",
  className = "",
  testId = "tally-popup-button",
  fullWidth = false,
  showConsent = false,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wide rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const variants = {
    primary: "bg-orange text-white hover:bg-orange-hover",
    onNavy: "bg-orange text-white hover:bg-orange-hover",
    outline:
      "border-2 border-navy text-navy hover:bg-navy hover:text-white bg-white",
    ghost: "text-orange hover:text-orange-hover underline underline-offset-4",
  };

  const sizes = {
    sm: "text-xs px-3 py-2",
    md: "text-sm px-5 py-3",
    lg: "text-sm sm:text-base px-6 py-4",
  };

  const handleClick = (e) => {
    e.preventDefault();
    trackQuoteStart(testId);
    openTallyPopup();
  };

  const anchor = (
    <a
      href={siteConfig.tally.fallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      onClick={handleClick}
      className={`${base} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );

  if (!showConsent) return anchor;

  // Wrap so button + consent stack vertically even inside flex-row parents.
  return (
    <div
      className={"flex flex-col items-start gap-2 " + (fullWidth ? "w-full" : "")}
      data-testid={`${testId}-group`}
    >
      {anchor}
      <QuoteConsent className="max-w-sm" />
    </div>
  );
}
