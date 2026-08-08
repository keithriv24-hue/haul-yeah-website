import React from "react";
import { Link } from "react-router-dom";

/**
 * Haul Yeah wordmark + inline truck SVG.
 * Solid, bold, no gradient. Orange truck icon sits before the wordmark.
 */
export default function Logo({ className = "", onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={
        "group inline-flex items-center gap-2 no-underline " + className
      }
      data-testid="site-logo"
      aria-label="Haul Yeah Moving — Home"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-orange text-white transition-colors group-hover:bg-orange-hover">
        {/* Simple box-truck icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
          aria-hidden="true"
        >
          <path d="M2 7h11v10H2z" />
          <path d="M13 10h5l3 3v4h-8z" />
          <circle cx="6.5" cy="18.5" r="1.6" />
          <circle cx="17.5" cy="18.5" r="1.6" />
        </svg>
      </span>
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
