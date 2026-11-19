/*
 * tracking.js — Meta (Facebook) attribution identifiers.
 * ─────────────────────────────────────────────────────────────
 * Handles fbclid / _fbp / _fbc capture and passthrough into Tally
 * (both inline embed and popup) so leads submitted through the form
 * can be matched back to the Meta Pixel client-side event.
 *
 * The heavy lifting:
 *   1. On first URL with ?fbclid=..., persist to localStorage so
 *      subsequent nav still has the click ID.
 *   2. Poll for _fbp cookie (Meta Pixel writes it asynchronously)
 *      up to a 2s cap so we don't ship an empty fbp.
 *   3. Synthesize _fbc from fbclid if the pixel didn't write one.
 *   4. Cache the resolved identifiers module-level so button clicks
 *      don't re-poll (primeMetaIdentifiers runs once on app mount).
 * ─────────────────────────────────────────────────────────────
 */

const FBCLID_STORAGE_KEY = "hy_fbclid";
const FBP_POLL_INTERVAL_MS = 100;
const FBP_POLL_TIMEOUT_MS = 2000;

function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : "";
}

function getQueryParam(name) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) || "";
}

/**
 * Read fbclid from URL if present (and persist), otherwise read from localStorage.
 */
export function readFbclid() {
  if (typeof window === "undefined") return "";
  const fromUrl = getQueryParam("fbclid");
  if (fromUrl) {
    try {
      window.localStorage.setItem(FBCLID_STORAGE_KEY, fromUrl);
    } catch {
      /* localStorage unavailable */
    }
    return fromUrl;
  }
  try {
    return window.localStorage.getItem(FBCLID_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function waitForFbpCookie() {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      const fbp = getCookie("_fbp");
      if (fbp) return resolve(fbp);
      if (Date.now() - start >= FBP_POLL_TIMEOUT_MS) return resolve("");
      setTimeout(tick, FBP_POLL_INTERVAL_MS);
    };
    tick();
  });
}

/*
 * Campaign codes: utm_source / utm_medium / utm_campaign / utm_content and gclid (Google Ads).
 * Read from the landing URL and kept on the device for 30 days, so a visitor who lands on one
 * page and fills the form on another (or on the form built into the page, which Tally does not
 * pass the page's query string to) still carries them. A new landing with any of these codes
 * replaces the whole set: the latest click is the one that gets the credit.
 */
const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid"];
const CAMPAIGN_STORAGE_KEY = "hy_campaign";
const CAMPAIGN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export function readCampaignParams(now = Date.now()) {
  if (typeof window === "undefined") return {};
  const fromUrl = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = getQueryParam(key);
    if (value) fromUrl[key] = value.slice(0, 200);
  }
  if (Object.keys(fromUrl).length) {
    try {
      window.localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify({ at: now, values: fromUrl }));
    } catch {
      /* localStorage unavailable */
    }
    return fromUrl;
  }
  try {
    const saved = JSON.parse(window.localStorage.getItem(CAMPAIGN_STORAGE_KEY) || "null");
    if (!saved || typeof saved.at !== "number" || now - saved.at > CAMPAIGN_MAX_AGE_MS) return {};
    const out = {};
    for (const key of CAMPAIGN_KEYS) {
      if (typeof saved.values?.[key] === "string" && saved.values[key]) out[key] = saved.values[key];
    }
    return out;
  } catch {
    return {};
  }
}

let identifiersPromise = null;
let cachedIdentifiers = null;

/**
 * Kick off identifier gathering. Safe to call multiple times — first call
 * starts the polling, subsequent calls return the same promise.
 * The promise resolves within up to FBP_POLL_TIMEOUT_MS (2s).
 */
export function primeMetaIdentifiers() {
  if (identifiersPromise) return identifiersPromise;
  identifiersPromise = (async () => {
    const fbclid = readFbclid();
    readCampaignParams(); // save the landing codes right away, before the 2s wait for the pixel
    const fbp = await waitForFbpCookie();
    let fbc = getCookie("_fbc");
    if (!fbc && fbclid) {
      // Synthesize per Meta CAPI guidance: fb.<subdomainIndex>.<timestampMs>.<fbclid>
      fbc = `fb.1.${Date.now()}.${fbclid}`;
    }
    const event_source_url =
      typeof window !== "undefined" ? window.location.href : "";
    // Campaign codes ride along with the Meta identifiers into both the inline form and the popup.
    const ids = { fbclid, fbp, fbc, event_source_url, ...readCampaignParams() };
    cachedIdentifiers = ids;
    return ids;
  })();
  return identifiersPromise;
}

/**
 * Async getter — returns cached identifiers, waiting for the initial priming
 * if it hasn't finished yet. Never throws.
 */
export async function getMetaIdentifiers() {
  if (cachedIdentifiers) return cachedIdentifiers;
  return primeMetaIdentifiers();
}

/** Filter out empty-string identifiers before serializing. */
export function nonEmpty(ids) {
  const out = {};
  for (const [k, v] of Object.entries(ids || {})) {
    if (v) out[k] = v;
  }
  return out;
}
