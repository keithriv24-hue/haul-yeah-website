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
    const fbp = await waitForFbpCookie();
    let fbc = getCookie("_fbc");
    if (!fbc && fbclid) {
      // Synthesize per Meta CAPI guidance: fb.<subdomainIndex>.<timestampMs>.<fbclid>
      fbc = `fb.1.${Date.now()}.${fbclid}`;
    }
    const event_source_url =
      typeof window !== "undefined" ? window.location.href : "";
    const ids = { fbclid, fbp, fbc, event_source_url };
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
