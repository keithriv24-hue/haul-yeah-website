import React from "react";
import { ShieldCheck, Truck, CalendarDays, Zap } from "lucide-react";
import siteConfig from "../../data/siteConfig";

/**
 * Trust bar — 4 factual badges. NO star ratings. NO review scores.
 * Navy background with subtle grain overlay for tactile depth.
 */
const ICONS = [ShieldCheck, Truck, CalendarDays, Zap];

export default function TrustBar() {
  return (
    <section
      className="relative border-y border-navy/10 bg-navy text-white grain-overlay"
      aria-label="Trust and credibility"
      data-testid="trust-bar"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 sm:grid-cols-4 sm:px-6 sm:py-10 lg:px-8">
        {siteConfig.trustBadges.map((label, i) => {
          const Icon = ICONS[i] || ShieldCheck;
          return (
            <div
              key={label}
              className="flex items-center gap-3"
              data-testid={`trust-badge-${i}`}
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-orange/15 text-orange">
                <Icon className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <span className="font-display text-xs font-bold uppercase tracking-wider text-white sm:text-sm">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
