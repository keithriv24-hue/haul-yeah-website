import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileCTABar from "./MobileCTABar";
import { loadTallyScript } from "../../lib/tally";
import { trackEvent } from "../../lib/analytics";

/**
 * Shared page shell: sticky header + main content + footer + persistent mobile CTA.
 * Also:
 *   - Loads the Tally embed script once, globally.
 *   - Attaches a document-level click listener that fires analytics events
 *     for every tel: and sms: link click, site-wide. trackEvent is a no-op
 *     until siteConfig.analytics.measurementId is set.
 */
export default function Layout({ children }) {
  useEffect(() => {
    loadTallyScript();

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
