import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import TallyPopupButton from "./TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Fixed bottom bar visible only on mobile. Always shows two persistent
 * high-conversion CTAs: Call and Free Quote.
 */
export default function MobileCTABar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 shadow-[0_-6px_18px_-8px_rgba(14,31,61,0.15)] backdrop-blur md:hidden"
      data-testid="mobile-cta-bar"
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${siteConfig.contact.phoneTel}`}
          data-testid="mobile-bar-call-btn"
          aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
          className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-navy px-3 py-3 font-display text-xs font-bold uppercase tracking-wide text-navy transition-colors active:bg-navy active:text-white"
        >
          <Phone className="h-4 w-4" strokeWidth={2.4} />
          Call
        </a>
        <TallyPopupButton
          testId="mobile-bar-quote-btn"
          size="sm"
          fullWidth
        >
          <MessageSquare className="h-4 w-4" strokeWidth={2.4} />
          Free Quote
        </TallyPopupButton>
      </div>
    </div>
  );
}
