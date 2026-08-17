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

/**
 * Pre-launch trust block. Rendered instead of the widget while
 * siteConfig.reviews.enabled is false, so a visitor never sees a heading
 * that promises reviews sitting above an empty box.
 */
function PreReviewTrustBlock({ sectionId }) {
  const { kicker, heading, body, points } = siteConfig.reviews.preLaunch;
  return (
    <section
      id={sectionId}
      className="band band--cream2"
      aria-labelledby="pre-review-heading"
      data-testid="pre-review-trust-section"
    >
      <div className="wrap">
        <div className="bh rv">
          <h2 id="pre-review-heading" data-testid="pre-review-heading">
            {heading}
          </h2>
          <p>
            <span className="kick mb-2 block text-orange">{kicker}</span>
            {body}
          </p>
        </div>

        <ul className="grid3 rv" data-testid="pre-review-points">
          {points.map((point, i) => (
            <li
              key={point.title}
              className="border-2 border-ink bg-cream p-6"
              data-testid={`pre-review-point-${i}`}
            >
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{point.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed opacity-80">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
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

    // cache: "no-cache" forces a revalidation on every mount.
    //
    // WHY: Trustindex serves content.html with
    //   Cache-Control: public, max-age=43200, immutable
    // — 12 hours with NO revalidation. If the CDN returns an error body
    // (lapsed subscription, failed card, outage) it gets pinned in the
    // visitor's cache for half a day and nothing we deploy can correct it.
    // This happened on 2026-08-15: a short billing gap served a
    // "trial period has expired" notice that kept rendering long after the
    // subscription was live. Revalidating costs a 304 with no body.
    fetch(contentUrlFor(trustindexWidgetId), {
      credentials: "omit",
      cache: "no-cache",
    })
      .then((r) => (r.ok ? r.text() : ""))
      .then((html) => {
        if (cancelled) return;
        if (!html) return;
        // A 443-byte error notice and a real widget both arrive as HTTP 200.
        // Only inject something that actually is a widget — otherwise fall
        // through to the empty mount, never Trustindex's own marketing.
        if (!html.includes("ti-widget")) return;
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
      className="band band--cream2"
      aria-labelledby="google-reviews-heading"
      data-testid="google-reviews-section"
    >
      <div className="wrap">
        <div className="bh rv">
          <h2 id="google-reviews-heading" data-testid="google-reviews-heading">
            {heading}
          </h2>
          {subheading ? <p>{subheading}</p> : null}
        </div>

        {/* Widget on the left, the four things a customer can verify BEFORE
            paying on the right. We're a young business with a handful of
            reviews — pairing the two is stronger than either alone, and it
            stops the section reading as a thin five-star box. */}
        <div className="grid gap-[clamp(28px,4vw,52px)] rv lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div ref={mountRef} data-testid="google-reviews-slot">
              {trustindexWidgetId ? null : (
                <div
                  className="border-2 border-dashed border-ink/40 p-8"
                  data-testid="reviews-placeholder"
                >
                  <h3>Google reviews load here once connected.</h3>
                  <p className="mt-2 text-[15px] opacity-75">
                    Real customer feedback from our Essex County moves shows up
                    here as soon as the review widget goes live.
                  </p>
                </div>
              )}
            </div>

            {googleReviewLink ? (
              <div
                className="mt-7 flex flex-wrap items-center gap-4"
                data-testid="leave-review-cta"
              >
                <a
                  href={googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="leave-review-btn"
                  className="sbtn sbtn--ghost sbtn--sm border-ink text-ink"
                >
                  Leave us a review ↗
                </a>
                <span className="text-sm opacity-65">
                  Google · takes 60 seconds
                </span>
              </div>
            ) : null}
          </div>

          <ul data-testid="reviews-verify-points">
            {siteConfig.reviews.preLaunch.points.map((point) => (
              <li
                key={point.title}
                className="border-t-2 border-ink py-4 last:border-b-2"
              >
                <b className="font-display text-[17px] uppercase tracking-[-0.02em]">
                  {point.title}
                </b>
                <p className="mt-1.5 text-[15px] leading-relaxed opacity-80">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
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
  if (!siteConfig.reviews.enabled) {
    return <PreReviewTrustBlock sectionId={sectionId} />;
  }
  return <GoogleReviewsInner key={pathname} sectionId={sectionId} />;
}
