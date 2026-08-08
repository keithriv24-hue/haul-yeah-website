import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import TallyPopupButton from "../site/TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Final call-to-action band — navy background, real crew photo peeking in from
 * the right on desktop, orange primary CTA, phone + text as secondary channels.
 */
export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden bg-navy text-white grain-overlay"
      aria-labelledby="final-cta-heading"
      data-testid="final-cta-section"
    >
      {/* Desktop-only: real crew photo layered on the right, softly masked. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        aria-hidden="true"
      >
        <img
          src={siteConfig.finalCtaImage.url}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      </div>

      {/* Decorative slabs */}
      <div
        className="pointer-events-none absolute -left-24 -bottom-24 hidden h-64 w-64 -rotate-6 bg-orange/10 sm:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
        <div className="lg:col-span-7">
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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {siteConfig.finalCta.subhead}
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <TallyPopupButton
              testId="final-cta-quote-btn"
              size="lg"
              className="w-full sm:w-auto"
              showConsent
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

        {/* Mobile-only image thumbnail (below CTA) */}
        <div className="lg:hidden">
          <img
            src={siteConfig.finalCtaImage.url}
            alt={siteConfig.finalCtaImage.alt}
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-md border border-white/10 object-cover"
            data-testid="final-cta-image-mobile"
          />
        </div>
      </div>
    </section>
  );
}
