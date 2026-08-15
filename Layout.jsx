import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileCTABar from "./MobileCTABar";
import { loadTallyScript } from "../../lib/tally";
import { primeMetaIdentifiers } from "../../lib/tracking";
import siteConfig from "../../data/siteConfig";
import { trackContact, trackEvent } from "../../lib/analytics";

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

  // GA4: inject gtag.js once, and only if an ID is configured. While
  // siteConfig.analytics.measurementId is "", nothing loads and no requests
  // fire — so this is safe to ship before the property exists.
  useEffect(() => {
    const id = siteConfig?.analytics?.measurementId;
    if (!id) return;
    if (document.getElementById("ga4-loader")) return;

    const s = document.createElement("script");
    s.id = "ga4-loader";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    // send_page_view false — Layout fires page_view per route below instead,
    // otherwise SPA navigations are never counted.
    window.gtag("config", id, { send_page_view: false });
  }, []);

  useEffect(() => {
    loadTallyScript();
    primeMetaIdentifiers();

    const handler = (e) => {
      const a = e.target.closest && e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      // A call IS a lead for a moving company — fire Meta 'Contact' so the
      // pixel can see it and so click-to-call shows up in your CPL maths.
      if (href.startsWith("tel:")) {
        trackContact("phone", href);
      } else if (href.startsWith("sms:")) {
        trackContact("sms", href);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Page views. Meta's base snippet in index.html covers the initial load, so
  // we skip the first nav for fbq. GA4 has send_page_view disabled, so it
  // needs every view including the first.
  useEffect(() => {
    const firstNav = isFirstNav.current;
    isFirstNav.current = false;

    trackEvent("page_view", {
      page_path: location.pathname,
      page_location:
        typeof window !== "undefined" ? window.location.href : undefined,
    });

    if (firstNav) return;
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
