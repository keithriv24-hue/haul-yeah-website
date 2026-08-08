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
        "text-[11px] leading-relaxed text-slate-500 " + className
      }
      data-testid="quote-consent"
    >
      By submitting, you agree to receive a call or text from Haul Yeah Moving
      about your quote. Msg &amp; data rates may apply. Reply STOP to opt out.
    </p>
  );
}
