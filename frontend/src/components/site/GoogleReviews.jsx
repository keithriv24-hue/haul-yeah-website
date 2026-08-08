import React, { useEffect, useRef, useState } from "react";
import { MessageSquareQuote, ArrowUpRight } from "lucide-react";
import siteConfig from "../../data/siteConfig";

/**
 * GoogleReviews — Trustindex widget mount, with a branded placeholder
 * for pre-launch (empty widget id).
 *
 * Behavior:
 *   - Reads siteConfig.reviews (trustindexWidgetId, trustindexScriptUrl,
 *     googleReviewLink, heading, subheading).
 *   - If trustindexWidgetId is set: renders a <div class="ti-widget"
 *     data-widget-id={id}> and lazily injects Trustindex's loader script
 *     (src = `${scriptUrl}?${id}`) exactly ONCE per page load — safe when
 *     the component appears on multiple pages. Uses IntersectionObserver
 *     to defer the script until the section approaches the viewport.
 *     Also re-calls window.Trustindex.init() on subsequent SPA mounts if
 *     it exists so client-side route changes still initialize the widget.
 *   - If trustindexWidgetId is empty: renders a branded placeholder card
 *     so pre-launch layouts never look broken.
 *   - "Leave us a review" orange button links to siteConfig.reviews.googleReviewLink
 *     when set (target=_blank, rel=noopener). Hidden entirely otherwise.
 *
 * No custom review JSON-LD is emitted — Trustindex injects its own.
 */

// Module-level guard so we inject the loader script exactly once across
// mounts (homepage + location page + service page can all render this).
let scriptInjected = false;

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function injectTrustindexLoader(scriptUrl, widgetId) {
  if (!isBrowser() || !widgetId) return;

  const src = `${scriptUrl}?${widgetId}`;

  if (scriptInjected) {
    // Already injected once — best-effort re-init on subsequent mounts.
    if (window.Trustindex && typeof window.Trustindex.init === "function") {
      try {
        window.Trustindex.init();
      } catch {
        /* swallow */
      }
    }
    return;
  }

  // Belt-and-suspenders: skip if some other code already added this exact src.
  if (document.querySelector(`script[src="${src}"]`)) {
    scriptInjected = true;
    return;
  }

  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  s.defer = true;
  document.body.appendChild(s);
  scriptInjected = true;
}

export default function GoogleReviews({ sectionId = "reviews" }) {
  const {
    trustindexWidgetId,
    trustindexScriptUrl,
    googleReviewLink,
    heading,
    subheading,
  } = siteConfig.reviews;

  const rootRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);

  // Lazy-load: mark the section "near viewport" when it comes within 300 px.
  useEffect(() => {
    if (!isBrowser()) return;
    if (!trustindexWidgetId) return;
    if (!rootRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNearViewport(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px" },
    );
    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, [trustindexWidgetId]);

  // Inject / re-init the Trustindex loader once the section approaches view.
  useEffect(() => {
    if (nearViewport && trustindexWidgetId) {
      injectTrustindexLoader(trustindexScriptUrl, trustindexWidgetId);
    }
  }, [nearViewport, trustindexWidgetId, trustindexScriptUrl]);

  return (
    <section
      id={sectionId}
      ref={rootRef}
      className="border-b border-slate-200 bg-white py-20 sm:py-28"
      aria-labelledby="google-reviews-heading"
      data-testid="google-reviews-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
            Reviews
          </p>
          <h2
            id="google-reviews-heading"
            className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl lg:text-5xl"
            data-testid="google-reviews-heading"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              {subheading}
            </p>
          ) : null}
        </div>

        <div className="mt-12" data-testid="google-reviews-slot">
          {trustindexWidgetId ? (
            <div
              className="ti-widget"
              data-widget-id={trustindexWidgetId}
              data-testid="trustindex-widget"
            />
          ) : (
            <div
              className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-md border border-dashed border-slate-300 bg-slate-50 p-10 text-center"
              data-testid="reviews-placeholder"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-orange text-white">
                <MessageSquareQuote className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <p className="font-display text-lg font-bold tracking-tight text-navy">
                Google reviews load here once connected.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                Real customer feedback from our Essex County moves will show up
                here as soon as our review widget goes live.
              </p>
            </div>
          )}
        </div>

        {googleReviewLink ? (
          <div
            className="mt-10 flex flex-wrap items-center gap-4"
            data-testid="leave-review-cta"
          >
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="leave-review-btn"
              className="inline-flex items-center gap-2 rounded-sm bg-orange px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
            >
              Leave us a review
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
            </a>
            <span className="text-sm text-slate-500">
              Google · takes 60 seconds
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
