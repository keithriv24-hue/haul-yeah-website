import React, { useEffect, useState } from "react";
import siteConfig from "../../data/siteConfig";
import { buildInlineEmbedUrl, loadTallyScript } from "../../lib/tally";
import QuoteConsent from "./QuoteConsent";

/**
 * Inline Tally iframe embed with:
 *   - dynamicHeight support (via the Tally embed script)
 *   - Meta identifier passthrough (fbclid / _fbp / _fbc / event_source_url)
 *     appended to the embed URL as query params.
 *
 * We wait for the identifier priming to settle (up to 2s) before rendering the
 * iframe so we never ship an empty fbp to Tally. A small placeholder holds the
 * layout during that window.
 *
 * If the Tally script is blocked, the iframe still renders on its own and the
 * <noscript> block links to the plain form URL.
 */
export default function TallyInlineEmbed() {
  const [embedUrl, setEmbedUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Start loading the Tally script in parallel with identifier polling
      const scriptReady = loadTallyScript();
      const url = await buildInlineEmbedUrl();
      if (cancelled) return;
      setEmbedUrl(url);
      // After the iframe is mounted with the identifier-bearing data-tally-src,
      // ask Tally to re-scan and initialize embeds (safe to call multiple times).
      scriptReady.then(() => {
        if (
          !cancelled &&
          typeof window !== "undefined" &&
          window.Tally &&
          typeof window.Tally.loadEmbeds === "function"
        ) {
          // Defer until after this render so the new iframe is in the DOM.
          setTimeout(() => {
            if (!cancelled && window.Tally && window.Tally.loadEmbeds) {
              window.Tally.loadEmbeds();
            }
          }, 0);
        }
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full" data-testid="tally-inline-embed">
      {embedUrl ? (
        <iframe
          key={embedUrl}
          data-tally-src={embedUrl}
          src={embedUrl}
          loading="lazy"
          width="100%"
          height="520"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Get My Free Moving Quote — Haul Yeah Moving"
          className="block w-full min-h-[520px]"
        />
      ) : (
        <div
          className="flex min-h-[520px] w-full items-center justify-center border-2 border-dashed border-ink/25 bg-cream-deep"
          aria-hidden="true"
          data-testid="tally-embed-loading"
        >
          <p className="text-sm uppercase tracking-[0.16em] opacity-50">Loading quote form…</p>
        </div>
      )}

      <div className="px-2 pt-3">
        <QuoteConsent />
      </div>

      <noscript>
        <p className="mt-3 text-sm">
          Please{" "}
          <a
            href={siteConfig.tally.fallbackUrl}
            className="font-semibold text-orange underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            open the quote form
          </a>{" "}
          to submit your details.
        </p>
      </noscript>
    </div>
  );
}
