/*
 * analytics.js — the single conversion-event layer for the site.
 * ─────────────────────────────────────────────────────────────
 * WHAT CHANGED AND WHY (read this before editing):
 *
 * This file used to be a pure no-op stub that forwarded to window.gtag only
 * if a GA4 ID was set — which it never was. The result: the Meta Pixel fired
 * PageView and NOTHING else. No Lead. No Contact. That meant
 *   • cost-per-lead was unmeasurable (only cost-per-click),
 *   • Meta campaigns could not optimise for conversions, and
 *   • click-to-call — typically 40-60% of a mover's inbound — was invisible.
 *
 * Now every conversion action routes through here and fans out to BOTH
 * destinations. Meta events fire whenever the pixel is present (it always is,
 * hard-coded in index.html). GA4 events fire only once a Measurement ID is set
 * in siteConfig.analytics.measurementId.
 *
 * EVENT MAP
 * ─────────
 *   trackQuoteStart()   → Meta 'InitiateCheckout'  | GA4 'quote_start'
 *       Fired when the quote form is opened (popup click / inline embed seen).
 *       This is a MICRO-conversion. Do NOT optimise ad campaigns against it.
 *
 *   trackLead()         → Meta 'Lead'              | GA4 'generate_lead'
 *       Fired ONCE on /thank-you, after Tally redirects a completed form.
 *       THIS is the event Meta campaigns should optimise for.
 *
 *   trackContact(kind)  → Meta 'Contact'           | GA4 'phone_click'/'sms_click'
 *       Fired on any tel:/sms: click. Treat as a lead-equivalent when you
 *       compute cost-per-lead — a call is a lead.
 *
 * NOTE ON DEDUPLICATION: every Meta event is sent with an eventID so that if
 * you later add the Conversions API server-side, Meta can dedupe the browser
 * and server copies of the same conversion instead of double-counting.
 */

import siteConfig from "../data/siteConfig";

function hasFbq() {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

function hasGtag() {
  return (
    typeof window !== "undefined" &&
    typeof window.gtag === "function" &&
    Boolean(siteConfig?.analytics?.measurementId)
  );
}

/** Stable-ish unique ID for Meta browser/server event deduplication. */
function newEventId(prefix) {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}.${Date.now()}.${rand}`;
}

/**
 * Low-level GA4 forwarder. Never throws.
 */
export function trackEvent(name, params = {}) {
  if (!hasGtag()) return;
  try {
    window.gtag("event", name, params);
  } catch {
    /* swallow */
  }
}

/**
 * Low-level Meta forwarder. Never throws.
 * @param {"track"|"trackCustom"} method
 */
function metaTrack(method, name, params = {}, eventId) {
  if (!hasFbq()) return;
  try {
    window.fbq(method, name, params, eventId ? { eventID: eventId } : undefined);
  } catch {
    /* swallow */
  }
}

/* ── Conversion events ─────────────────────────────────────────── */

/** Quote form opened. Micro-conversion — do not optimise campaigns on this. */
export function trackQuoteStart(source = "unknown") {
  metaTrack(
    "track",
    "InitiateCheckout",
    { content_name: "quote_form", content_category: source },
    newEventId("quotestart"),
  );
  trackEvent("quote_start", { source });
}

/**
 * PRIMARY CONVERSION. Fired once on /thank-you after a completed Tally form.
 * Returns the eventID used, so a future Conversions API call can dedupe.
 */
export function trackLead(params = {}) {
  const eventId = newEventId("lead");
  metaTrack(
    "track",
    "Lead",
    { content_name: "quote_request", ...params },
    eventId,
  );
  trackEvent("generate_lead", { ...params });
  return eventId;
}

/**
 * Click-to-call / click-to-text. Count these as leads in your CPL maths.
 * @param {"phone"|"sms"} kind
 */
export function trackContact(kind, href = "") {
  metaTrack(
    "track",
    "Contact",
    { content_name: kind === "sms" ? "sms_click" : "phone_click" },
    newEventId(`contact.${kind}`),
  );
  trackEvent(kind === "sms" ? "sms_click" : "phone_click", { href });
}
