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
 * VARIANTS map onto the signage button classes in index.css:
 *   primary → orange plate, BLACK text (never white — #FF6B2C is 2.84:1)
 *   ink     → black plate, cream text
 *   cream   → cream plate, black text (use on black/orange bands)
 *   ghost   → outlined, inherits currentColor
 *   plate   → compact bordered plate for the header
 *
 * Set showConsent on prominent page-level CTAs to render the SMS/TCPA
 * consent microcopy under the button. Compact CTAs (header, mobile bar)
 * omit it — consent is still visible in the inline embed and beside every
 * primary quote CTA on inner pages.
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
  const variants = {
    primary: "sbtn sbtn--orange",
    onNavy: "sbtn sbtn--orange",
    ink: "sbtn",
    cream: "sbtn sbtn--cream",
    outline: "sbtn sbtn--ghost",
    ghost: "sbtn sbtn--ghost",
    plate: "plate",
  };

  const isPlate = variant === "plate";
  const sizeClass = !isPlate && size === "sm" ? " sbtn--sm" : "";
  const widthClass = fullWidth ? (isPlate ? " w-full justify-center" : " sbtn--full") : "";

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
      className={`${variants[variant] || variants.primary}${sizeClass}${widthClass} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );

  if (!showConsent) return anchor;

  // Wrap so button + consent stack vertically even inside flex-row parents.
  return (
    <div
      className={"flex flex-col items-start gap-3 " + (fullWidth ? "w-full" : "")}
      data-testid={`${testId}-group`}
    >
      {anchor}
      <QuoteConsent className="max-w-sm" />
    </div>
  );
}
