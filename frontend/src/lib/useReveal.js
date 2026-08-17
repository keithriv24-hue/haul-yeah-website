import { useEffect } from "react";

/**
 * Activates the `.rv` reveal-on-scroll animation defined in index.css.
 *
 * Any element with className="rv" fades/rises in once when it first scrolls
 * into view. This hook runs a single document-level IntersectionObserver per
 * mount and re-scans on every route change, so page templates only have to
 * add the class — no per-component observer wiring.
 *
 * Degrades safely:
 *   • No IntersectionObserver (very old browsers) → everything is shown
 *     immediately rather than staying invisible.
 *   • prefers-reduced-motion → index.css already neutralises the transition,
 *     but we still add `.in` so state is consistent.
 *
 * IMPORTANT for prerendering: scripts/prerender.js snapshots the DOM after
 * effects run, so elements above the fold are captured with `.in` already
 * applied and are visible even before hydration. Elements below the fold are
 * captured without it — which is why `.rv` must never be the only thing
 * making content readable (it only animates opacity/transform).
 */
export default function useReveal(deps = []) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".rv:not(.in)"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
