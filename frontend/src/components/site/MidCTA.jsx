import React from "react";
import TallyPopupButton from "./TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Reusable mid-page / end-of-page CTA band. Used by ServicePage, LocationPage
 * and About so every inner page ends on the same two actions.
 *
 * variant "cream" → cream-2 band with an ink button (mid-page)
 * variant "ink"   → black band with the orange button (end of page)
 */
export default function MidCTA({ heading, body, variant = "cream", testId }) {
  const isInk = variant === "ink";

  return (
    <section
      className={
        "band band--tight " + (isInk ? "band--black" : "band--cream2")
      }
      data-testid={testId}
    >
      <div className="wrap flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[46ch]">
          <h2 className="text-[clamp(26px,3.2vw,44px)]">{heading}</h2>
          <p className="mt-3 text-[16px] leading-relaxed opacity-80">{body}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-4 sm:flex-row">
          <TallyPopupButton
            testId={`${testId}-quote-btn`}
            variant={isInk ? "primary" : "ink"}
          >
            Get my free quote
          </TallyPopupButton>
          <a
            href={`sms:${siteConfig.contact.phoneTel}`}
            data-testid={`${testId}-sms-link`}
            className={
              "sbtn sbtn--ghost " + (isInk ? "" : "border-ink text-ink")
            }
          >
            Text us
          </a>
        </div>
      </div>
    </section>
  );
}
