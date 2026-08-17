import React from "react";
import TallyPopupButton from "../site/TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Final CTA — black band with the crew photo bleeding in from the right on
 * desktop. Three channels, in the order they actually convert for a weekend
 * mover: form (captures the details), phone (fastest close), text (lowest
 * friction on a phone at 9pm).
 */
export default function FinalCTA() {
  const { finalCta, contact, finalCtaImage } = siteConfig;

  return (
    <section
      className="relative overflow-hidden bg-ink text-cream"
      aria-labelledby="final-cta-heading"
      data-testid="final-cta-section"
    >
      {/* Desktop-only crew photo, masked into the band. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        aria-hidden="true"
      >
        <img
          src={finalCtaImage.url}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      </div>

      <div className="wrap relative py-[clamp(56px,8vw,120px)]">
        <span className="kick text-orange-bright">
          Free quote · under 5 minutes
        </span>

        <h2 id="final-cta-heading" data-testid="final-cta-heading" className="mt-5">
          {finalCta.heading}
          <br />
          <span className="underline decoration-orange-bright decoration-[0.09em] underline-offset-[0.12em]">
            {finalCta.headingAccent}
          </span>
        </h2>

        <p className="mt-6 max-w-[46ch] text-[clamp(16px,1.6vw,19px)] text-cream/80">
          {finalCta.subhead}
        </p>

        {/* items-start, not items-center: the quote button carries TCPA
            consent text beneath it, so centring would push the phone button
            out of line with it. */}
        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-start">
          <TallyPopupButton testId="final-cta-quote-btn" showConsent>
            Get my free quote
          </TallyPopupButton>
          <a
            href={`tel:${contact.phoneTel}`}
            data-testid="final-cta-phone-link"
            className="sbtn sbtn--ghost"
          >
            {contact.phoneDisplay}
          </a>
        </div>

        <a
          href={`sms:${contact.phoneTel}`}
          data-testid="final-cta-sms-link"
          className="mt-6 inline-block text-sm font-bold uppercase tracking-[0.12em] text-orange-bright underline underline-offset-4"
        >
          Or text us for a same-day quote →
        </a>

        {/* Mobile: the photo as a bordered block rather than a background. */}
        <div className="mt-10 border-2 border-cream/25 lg:hidden">
          <img
            src={finalCtaImage.url}
            alt={finalCtaImage.alt}
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
            data-testid="final-cta-image-mobile"
          />
        </div>
      </div>
    </section>
  );
}
