import React from "react";
import { Link } from "react-router-dom";

/**
 * Haul Yeah logo — renders the company logo mark.
 *
 * ASSET: /public/logo-mark.png
 * This is the owner's logo with the orange background field removed and the
 * transparent artwork trimmed to its bounding box. The artwork itself is
 * UNCHANGED — it measured pure white in the source file (mean RGB
 * 254.7/254.2/253.1), so it is stored as white pixels plus an alpha channel.
 * Nothing was redrawn, recoloured or cropped out of the mark.
 *
 * WHY THE BACKGROUND CAME OFF:
 * The original /logo.jpg is a square badge with the wordmark inside it. At the
 * 40px height a site header allows, the "HAUL YEAH MOVING" text inside that
 * square renders about 5px tall — unreadable — and the orange tile sat a few
 * hundred pixels from the orange "Free quote" button, putting two different
 * oranges side by side. Lifting the artwork out solves both.
 *
 * The asset is white-on-transparent, so it must only be placed on DARK
 * surfaces. Both current placements (the ink header and the ink footer) are
 * dark. If you ever need it on the cream band, generate an ink-coloured
 * variant rather than filtering this one.
 *
 * `tone` is retained for API compatibility — Header and Footer both pass it —
 * but has no effect on an image mark. It stays so those files did not need to
 * change for a logo swap.
 */
export default function Logo({ className = "", onClick, tone = "cream" }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      data-testid="site-logo"
      aria-label="Haul Yeah Moving — Home"
      className={"inline-flex shrink-0 items-center no-underline " + className}
    >
      <img
        src="/logo-mark.png"
        alt="Haul Yeah Moving"
        // Intrinsic size of the asset (281x180). Declaring both reserves the
        // box before the image decodes, so the header does not shift — this
        // renders on all 21 pages and CLS is currently 0.
        width="281"
        height="180"
        decoding="async"
        // 40px on phones (62px header), 48px from sm up (70px header). The
        // first pass at 36/40px read undersized next to the nav and the CTA
        // plate — the mark is a two-line lockup, so it needs more height than
        // a single-line wordmark to carry the same weight.
        className="h-10 w-auto sm:h-12"
        data-testid="site-logo-mark"
      />
    </Link>
  );
}
