import React from "react";
import TallyPopupButton from "./TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Fixed bottom bar, phones and small tablets only (<= 820px, see .mbar in
 * index.css). Two persistent high-conversion CTAs: Call and Free Quote.
 *
 * Speed-to-lead is the whole business model, so this bar never scrolls away.
 * The footer reserves 92px of bottom padding at the same breakpoint so the
 * bar never covers footer content.
 */
export default function MobileCTABar() {
  return (
    <div className="mbar" data-testid="mobile-cta-bar">
      <a
        href={`tel:${siteConfig.contact.phoneTel}`}
        data-testid="mobile-bar-call-btn"
        aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
      >
        Call
      </a>
      <TallyPopupButton
        testId="mobile-bar-quote-btn"
        variant="plate"
        className="mbar-q border-0"
      >
        Free quote
      </TallyPopupButton>
    </div>
  );
}
