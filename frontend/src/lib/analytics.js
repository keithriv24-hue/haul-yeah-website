/*
 * Lightweight analytics stub.
 * ─────────────────────────────────────────────────────────────
 * trackEvent(name, params) is a NO-OP until siteConfig.analytics.measurementId
 * is set (owner will supply a GA4 Measurement ID later).
 *
 * When a real ID is set, this helper forwards events to window.gtag if it's
 * available (the owner would typically add the GA4 loader tag to index.html).
 * It never throws; failures are swallowed on purpose.
 *
 * Currently wired up in two places:
 *   1. TallyPopupButton onClick  → trackEvent("tally_open", { source })
 *   2. Global tel/sms click listener in Layout → trackEvent("phone_click" | "sms_click", { href })
 */

import siteConfig from "../data/siteConfig";

export function trackEvent(name, params = {}) {
  const id = siteConfig?.analytics?.measurementId;
  if (!id) return; // no-op — owner hasn't provided a GA4 ID yet

  try {
    if (
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", name, params);
    }
  } catch {
    /* swallow */
  }
}
