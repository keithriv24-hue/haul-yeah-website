/*
 * Tally helpers — popup + inline embed script loading.
 * -----------------------------------------------------
 * The Tally script (embed.js) is loaded once. Buttons with
 * data-tally-open="kdpE5d" are auto-wired by that script.
 * We also expose openTallyPopup() as an imperative fallback.
 * If the script fails to load (blocked), buttons/handlers open
 * the plain form URL in a new tab.
 */

import siteConfig from "../data/siteConfig";

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
      // Already loaded?
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

export function openTallyPopup() {
  if (typeof window !== "undefined" && window.Tally) {
    window.Tally.openPopup(siteConfig.tally.formId, {
      layout: "modal",
      width: 700,
      hideTitle: true,
      autoClose: 2000,
    });
    return;
  }
  // Fallback: open plain form URL in a new tab.
  if (typeof window !== "undefined") {
    window.open(siteConfig.tally.fallbackUrl, "_blank", "noopener,noreferrer");
  }
}
