import React from "react";
import { Link } from "react-router-dom";

/**
 * Haul Yeah wordmark.
 *
 * The redesign drops the 40x40 image mark from the header entirely — at
 * signage scale the Archivo Black wordmark IS the logo, and removing the
 * <img> takes one render-blocking request off every page. The image file is
 * still used for favicons and schema.org (siteConfig.branding.logoSchemaPath).
 *
 * `tone` controls which colour it reads on: "cream" for dark headers/footers,
 * "ink" for cream backgrounds.
 */
export default function Logo({ className = "", onClick, tone = "cream" }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      data-testid="site-logo"
      aria-label="Haul Yeah Moving — Home"
      className={
        "font-display text-[21px] uppercase leading-none tracking-[-0.03em] no-underline sm:text-2xl " +
        (tone === "ink" ? "text-ink " : "text-cream ") +
        className
      }
    >
      Haul <span className="not-italic text-orange-bright">Yeah</span>
    </Link>
  );
}
