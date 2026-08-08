import React from "react";
import siteConfig from "../../data/siteConfig";
import { openTallyPopup } from "../../lib/tally";
import { trackEvent } from "../../lib/analytics";

/**
 * Universal "Free Quote" button.
 * Uses data-tally-open (script auto-wires it) AND an onClick fallback
 * (which either calls Tally.openPopup or opens the plain form URL).
 * Renders as an <a> so if JS is off, clicking still opens the form.
 */
export default function TallyPopupButton({
  children = "Free Quote",
  variant = "primary",
  size = "md",
  className = "",
  testId = "tally-popup-button",
  fullWidth = false,
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
    // Prevent the anchor from navigating; the Tally script (or fallback) handles it.
    e.preventDefault();
    trackEvent("tally_open", { source: testId });
    openTallyPopup();
  };

  return (
    <a
      href={siteConfig.tally.fallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-tally-open={siteConfig.tally.formId}
      data-tally-layout="modal"
      data-tally-width="700"
      data-tally-hide-title="1"
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
}
