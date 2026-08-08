import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "../../data/siteConfig";

/**
 * Haul Yeah logo — small owner-approved logo mark (orange) next to the wordmark.
 * The image file lives at /app/frontend/public/logo.jpg. Swap that file to update
 * everywhere (header, favicon, og:image).
 */
export default function Logo({ className = "", onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={
        "group inline-flex items-center gap-3 no-underline " + className
      }
      data-testid="site-logo"
      aria-label="Haul Yeah Moving — Home"
    >
      <img
        src={siteConfig.branding.logoPath}
        alt={siteConfig.branding.logoAlt}
        width="40"
        height="40"
        className="h-10 w-10 shrink-0 rounded-sm object-cover shadow-sm ring-1 ring-slate-200"
        data-testid="site-logo-mark"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-navy sm:text-xl">
          HAUL YEAH
        </span>
        <span className="font-display text-[10px] font-bold tracking-[0.24em] text-orange">
          MOVING
        </span>
      </span>
    </Link>
  );
}
