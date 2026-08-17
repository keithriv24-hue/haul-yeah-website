import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import siteConfig from "../data/siteConfig";
import { trackLead } from "../lib/analytics";

/**
 * /thank-you — THE conversion page.
 * ─────────────────────────────────────────────────────────────
 * WHY THIS PAGE EXISTS
 * The quote form is hosted on tally.so, a domain our Meta Pixel does not and
 * cannot cover. Without a redirect back onto our own domain there is no
 * moment at which the pixel can observe a completed form, which is why the
 * account had zero Lead events despite running a pixel.
 *
 * REQUIRED TALLY SETTING — the page does nothing until this is done:
 *   Tally form → Settings → After submission → Redirect to page
 *   URL: https://www.haulyeahmoves.com/thank-you
 * (Leave "Redirect immediately" on. Do NOT use Tally's own thank-you screen.)
 *
 * The page is noindex — it must never appear in search results, and it is
 * deliberately absent from sitemap.xml. It IS prerendered, via
 * EXTRA_ROUTES in scripts/prerender.js, so a direct hit serves a real file.
 *
 * The Lead event fires exactly once per mount (React 18/19 StrictMode double-
 * invokes effects in development — the ref guard prevents a double count).
 */
export default function ThankYou() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackLead();
  }, []);

  return (
    <>
      {/* Single text child ONLY. React 19 head hoisting silently renders an
          EMPTY <title> when the element has more than one child, which is
          what shipped here: /thank-you served <title></title>. */}
      <title>{`Thanks — we’re on it | ${siteConfig.business.name}`}</title>
      <meta name="robots" content="noindex, nofollow" />

      <section className="band band--cream">
        <div className="wrap max-w-[880px]">
          <span className="kick text-orange">Request received</span>
          <h1 className="mt-4" data-testid="thankyou-h1">
            Got it. We&apos;re on it.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed opacity-85">
            Your quote request is in. Someone from Haul Yeah will text or call
            you back in {siteConfig.contact.responseTime} with an all-in number
            — not a range, not a &quot;we&apos;ll get back to you.&quot;
          </p>

          <div className="mt-10 border-2 border-ink bg-cream-deep p-7">
            <h4 className="text-orange">What happens next</h4>
            <ol className="mt-4">
              <li className="border-t-2 border-ink py-3.5 last:border-b-2">
                <b className="font-display uppercase tracking-[-0.02em]">1.</b>{" "}
                We read your details and check truck availability for your date.
              </li>
              <li className="border-t-2 border-ink py-3.5 last:border-b-2">
                <b className="font-display uppercase tracking-[-0.02em]">2.</b>{" "}
                We text or call you with the all-in price and confirm stairs,
                access and parking.
              </li>
              <li className="border-t-2 border-ink py-3.5 last:border-b-2">
                <b className="font-display uppercase tracking-[-0.02em]">3.</b>{" "}
                {siteConfig.terms.depositLine} Weekends fill first.
              </li>
            </ol>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <a
              href={`tel:${siteConfig.contact.phoneTel}`}
              data-testid="thankyou-phone-link"
              className="sbtn sbtn--orange"
            >
              Call {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={`sms:${siteConfig.contact.phoneTel}`}
              data-testid="thankyou-sms-link"
              className="sbtn sbtn--ghost border-ink text-ink"
            >
              Text us instead
            </a>
          </div>

          <p className="mt-10 text-sm opacity-70">
            Need something sooner?{" "}
            <Link to="/" className="font-bold text-orange underline underline-offset-4">
              Back to the homepage
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
