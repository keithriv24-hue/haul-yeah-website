import React, { useEffect, useRef } from "react";
import siteConfig from "../../data/siteConfig";
import { loadTallyScript } from "../../lib/tally";

/**
 * Inline Tally iframe embed with dynamicHeight support.
 * The Tally embed.js script listens for postMessage from the iframe
 * and resizes it. If the script is blocked, we still render a usable
 * iframe with a sane default min-height plus a plain-link fallback.
 */
export default function TallyInlineEmbed() {
  const iframeRef = useRef(null);

  useEffect(() => {
    loadTallyScript();
  }, []);

  return (
    <div
      className="relative w-full"
      data-testid="tally-inline-embed"
    >
      <iframe
        ref={iframeRef}
        data-tally-src={siteConfig.tally.embedUrl}
        src={siteConfig.tally.embedUrl}
        loading="lazy"
        width="100%"
        height="520"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Get My Free Moving Quote — Haul Yeah Moving"
        className="block w-full min-h-[520px]"
      />
      <noscript>
        <p className="mt-3 text-sm text-slate-600">
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
