import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, Clock } from "lucide-react";
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

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
          Request received
        </p>
        <h1
          className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl"
          data-testid="thankyou-h1"
        >
          Got it. We&apos;re on it.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Your quote request is in. Someone from Haul Yeah will text or call you
          back in {siteConfig.contact.responseTime} with an all-in number — not
          a range, not a &quot;we&apos;ll get back to you.&quot;
        </p>

        <div className="mt-10 rounded-md border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-2 text-navy">
            <Clock className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            <span className="font-display text-xs font-bold uppercase tracking-widest">
              What happens next
            </span>
          </div>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            <li>
              <strong className="text-navy">1.</strong> We read your details and
              check truck availability for your date.
            </li>
            <li>
              <strong className="text-navy">2.</strong> We text or call you with
              the all-in price and confirm stairs, access and parking.
            </li>
            <li>
              <strong className="text-navy">3.</strong> A small refundable
              deposit locks your slot. Weekends fill first.
            </li>
          </ol>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            data-testid="thankyou-phone-link"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-orange px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-hover"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            Call {siteConfig.contact.phoneDisplay}
          </a>
          <a
            href={`sms:${siteConfig.contact.phoneTel}`}
            data-testid="thankyou-sms-link"
            className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-navy px-5 py-4 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:border-orange hover:text-orange"
          >
            <MessageSquare
              className="h-4 w-4"
              strokeWidth={2.4}
              aria-hidden="true"
            />
            Text us instead
          </a>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Need something sooner?{" "}
          <Link to="/" className="font-semibold text-navy hover:text-orange">
            Back to the homepage
          </Link>
        </p>
      </section>
    </>
  );
}
