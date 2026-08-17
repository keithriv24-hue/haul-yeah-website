import React from "react";

/**
 * SMS/TCPA-style consent microcopy shown wherever the Tally quote form
 * appears (inline embed + prominent popup triggers). Muted, small.
 * The exact wording is fixed by owner instruction — do not paraphrase.
 */
export default function QuoteConsent({ className = "" }) {
  return (
    <p
      className={
        // currentColor at 65% so the consent line stays legible on cream AND on
        // the black final-CTA band, where slate-500 was nearly invisible.
        "text-[11px] leading-relaxed opacity-65 " + className
      }
      data-testid="quote-consent"
    >
      By submitting, you agree to receive a call or text from Haul Yeah Moving
      about your quote. Msg &amp; data rates may apply. Reply STOP to opt out.
    </p>
  );
}
