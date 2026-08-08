/*
 * Tally helpers — popup + inline embed script loading + Meta identifiers.
 * ─────────────────────────────────────────────────────────────
 * The Tally script (embed.js) is loaded once. Buttons with
 * data-tally-open="kdpE5d" would normally be auto-wired by that script,
 * but because we want to pass Meta attribution identifiers
 * (fbclid / _fbp / _fbc / event_source_url) as hidden-field prefill,
 * we open the popup imperatively via Tally.openPopup with hiddenFields.
 *
 * Inline embeds use buildInlineEmbedUrl to append the same identifiers
 * as query params before Tally initializes the iframe.
 *
 * If the Tally script is blocked (ad blockers), buttons fall back to
 * opening the plain form URL with identifiers appended as query params
 * in a new tab.
 * ─────────────────────────────────────────────────────────────
 */

import siteConfig from "../data/siteConfig";
import { getMetaIdentifiers, nonEmpty } from "./tracking";

let scriptPromise = null;

export function loadTallyScript() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Tally) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const existing = document.querySelector(
      `script[src="${siteConfig.tally.scriptUrl}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      if (window.Tally) resolve(true);
      return;
    }
    const s = document.createElement("script");
    s.src = siteConfig.tally.scriptUrl;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  return scriptPromise;
}

function appendParams(url, params) {
  const search = new URLSearchParams(params).toString();
  if (!search) return url;
  return url + (url.includes("?") ? "&" : "?") + search;
}

/**
 * Build the inline iframe embed URL with Meta identifiers appended as
 * query params. Tally reads matching-named query params into hidden fields.
 */
export async function buildInlineEmbedUrl() {
  const ids = nonEmpty(await getMetaIdentifiers());
  return appendParams(siteConfig.tally.embedUrl, ids);
}

/**
 * Imperatively open the Tally popup with Meta identifiers as hidden-field
 * prefill. Falls back to opening the plain form URL (with identifiers as
 * query params) in a new tab if the Tally script is blocked.
 */
export async function openTallyPopup() {
  const ids = nonEmpty(await getMetaIdentifiers());
  await loadTallyScript();

  if (
    typeof window !== "undefined" &&
    window.Tally &&
    typeof window.Tally.openPopup === "function"
  ) {
    window.Tally.openPopup(siteConfig.tally.formId, {
      layout: "modal",
      width: 700,
      hideTitle: true,
      hiddenFields: ids,
    });
    return;
  }

  // Script blocked — open the plain form URL in a new tab with identifiers appended
  if (typeof window !== "undefined") {
    window.open(
      appendParams(siteConfig.tally.fallbackUrl, ids),
      "_blank",
      "noopener,noreferrer",
    );
  }
}
