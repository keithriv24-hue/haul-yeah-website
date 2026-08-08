import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileCTABar from "./MobileCTABar";
import { loadTallyScript } from "../../lib/tally";
import { primeMetaIdentifiers } from "../../lib/tracking";
import { trackEvent } from "../../lib/analytics";

/**
 * Shared page shell: sticky header + main content + footer + persistent mobile CTA.
 * Also:
 *   - Loads the Tally embed script once, globally.
 *   - Kicks off Meta identifier gathering (fbclid / _fbp / _fbc) on mount so
 *     button clicks don't have to wait for the polling window.
 *   - Fires an extra fbq('track','PageView') on every client-side navigation
 *     (the base pixel snippet in index.html handles the initial load).
 *   - Attaches a document-level click listener that fires analytics events
 *     for every tel: and sms: link click, site-wide. trackEvent is a no-op
 *     until siteConfig.analytics.measurementId is set.
 */
export default function Layout({ children }) {
  const location = useLocation();
  const isFirstNav = useRef(true);

  useEffect(() => {
    loadTallyScript();
    primeMetaIdentifiers();

    const handler = (e) => {
      const a = e.target.closest && e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { href });
      } else if (href.startsWith("sms:")) {
        trackEvent("sms_click", { href });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Meta Pixel: fire PageView on client-side route changes (initial load is
  // handled by the base pixel snippet in public/index.html).
  useEffect(() => {
    if (isFirstNav.current) {
      isFirstNav.current = false;
      return;
    }
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      <Header />
      <main className="flex-1" data-testid="page-main">
        {children}
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}
