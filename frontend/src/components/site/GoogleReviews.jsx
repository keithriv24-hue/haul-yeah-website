import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquareQuote, ArrowUpRight } from "lucide-react";
import siteConfig from "../../data/siteConfig";

/**
 * GoogleReviews — Trustindex widget mount.
 *
 * WHY THIS INTEGRATION IS SUBTLE
 * ──────────────────────────────
 * Trustindex ships a "just drop this <script>" loader (loader.js?WIDGET_ID)
 * that self-replaces with a widget div and fetches content.html. That works
 * fine on the *first* mount in a page's lifetime, but it is stateful and
 * race-prone across SPA navigations: repeated dynamic <script> injections
 * of the same URL don't reliably fire the widget-content fetch on the
 * *third* consecutive mount (Home → Newark → Weekend Movers).
 *
 * The reliable approach is to drive the two pieces separately:
 *
 * 1. Load loader.js ONCE, globally, at the app's <head>. That sets up:
 *      • the Trustindex class on window
 *      • a MutationObserver on document.body that auto-processes any new
 *        `.ti-widget` element (fetches CSS, wires up layout / slider etc)
 *    (See public/index.html.)
 *
 * 2. On each GoogleReviews mount, fetch content.html for our widget ID
 *    directly from the CDN and inject the returned `<div class="ti-widget">`
 *    HTML into our mount container. The MutationObserver notices the new
 *    node and Trustindex activates the widget (styles it, sets sizes, etc).
 *
 * That approach:
 *   - works identically on hard-load and any SPA navigation chain,
 *   - lets us key the section by pathname for a guaranteed clean remount,
 *   - avoids the flaky repeated-<script>-injection dance entirely,
 *   - is lazy: we only fetch when the section approaches the viewport.
 */

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

// Compute the widget's content URL from a widget ID.
// Trustindex hosts widgets at cdn.trustindex.io/widgets/<first 2 chars>/<id>/content.html
function contentUrlFor(widgetId) {
  const prefix = widgetId.substring(0, 2);
  return `https://cdn.trustindex.io/widgets/${prefix}/${widgetId}/content.html`;
}

function GoogleReviewsInner({ sectionId }) {
  const {
    trustindexWidgetId,
    googleReviewLink,
    heading,
    subheading,
  } = siteConfig.reviews;

  const sectionRef = useRef(null);
  const mountRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);

  // Lazy-load: mark near-viewport when the section approaches the fold.
  useEffect(() => {
    if (!isBrowser()) return;
    if (!trustindexWidgetId) return;
    if (!sectionRef.current) return;
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
      { rootMargin: "400px 0px" },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [trustindexWidgetId]);

  // Fetch widget HTML and inject; Trustindex's MutationObserver handles the
  // rest (CSS load, layout activation).
  useEffect(() => {
    if (!isBrowser()) return;
    if (!nearViewport) return;
    if (!trustindexWidgetId) return;
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;

    fetch(contentUrlFor(trustindexWidgetId), { credentials: "omit" })
      .then((r) => (r.ok ? r.text() : ""))
      .then((html) => {
        if (cancelled) return;
        if (!html) return;
        if (!mount.isConnected) return;

        // Feed the content into Trustindex's own load pipeline. Its load()
        // method parses the HTML, replaces the placeholder with the widget
        // div, loads the correct preset CSS (e.g. layout 14 · light-background),
        // and calls format/resize/registerEvents. Fall back to a plain
        // innerHTML injection if Trustindex globals aren't ready yet — the
        // MutationObserver set up by loader.js in index.html will still
        // activate the widget (styles may lag by one microtask).
        const TW = window.TrustindexWidget;
        if (typeof TW === "function") {
          const placeholder = document.createElement("div");
          placeholder.contentHtml = html;
          placeholder.key = trustindexWidgetId;
          mount.appendChild(placeholder);
          try {
            new TW(null, placeholder);
          } catch {
            mount.innerHTML = html;
            if (typeof window.renderTrustindexWidgets === "function") {
              try {
                window.renderTrustindexWidgets();
              } catch {
                /* swallow */
              }
            }
          }
        } else {
          mount.innerHTML = html;
          if (typeof window.renderTrustindexWidgets === "function") {
            try {
              window.renderTrustindexWidgets();
            } catch {
              /* swallow */
            }
          }
        }
      })
      .catch(() => {
        /* Network error — leave the placeholder visible. */
      });

    return () => {
      cancelled = true;
    };
  }, [nearViewport, trustindexWidgetId]);

  return (
    <section
      id={sectionId}
      ref={sectionRef}
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

        <div className="mt-12" ref={mountRef} data-testid="google-reviews-slot">
          {trustindexWidgetId ? null : (
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

/**
 * Outer wrapper: rekey by pathname so React fully remounts the inner
 * component on every SPA navigation. This guarantees a clean fetch +
 * effect lifecycle for the widget on every route change.
 */
export default function GoogleReviews({ sectionId = "reviews" }) {
  const { pathname } = useLocation();
  return <GoogleReviewsInner key={pathname} sectionId={sectionId} />;
}
