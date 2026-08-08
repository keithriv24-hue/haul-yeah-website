import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import TallyPopupButton from "../site/TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Final call-to-action band — navy background, orange primary button,
 * phone + text as secondary channels.
 */
export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden bg-navy py-20 text-white grain-overlay sm:py-28"
      aria-labelledby="final-cta-heading"
      data-testid="final-cta-section"
    >
      {/* Decorative orange corner slab */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 hidden h-56 w-56 rotate-12 bg-orange/15 sm:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 -bottom-24 hidden h-64 w-64 -rotate-6 bg-orange/10 sm:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
          Move Day
        </p>
        <h2
          id="final-cta-heading"
          data-testid="final-cta-heading"
          className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {siteConfig.finalCta.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {siteConfig.finalCta.subhead}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TallyPopupButton
            testId="final-cta-quote-btn"
            size="lg"
            className="w-full sm:w-auto"
          >
            Get My Free Quote
          </TallyPopupButton>
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            data-testid="final-cta-phone-link"
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-white/20 bg-white/5 px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>

        <a
          href={`sms:${siteConfig.contact.phoneTel}`}
          data-testid="final-cta-sms-link"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-orange"
        >
          <MessageSquare className="h-4 w-4" strokeWidth={2.4} />
          Or text {siteConfig.contact.phoneDisplay} for a same-day quote
        </a>
      </div>
    </section>
  );
}
