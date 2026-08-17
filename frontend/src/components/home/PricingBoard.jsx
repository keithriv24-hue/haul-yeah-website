import React from "react";
import siteConfig from "../../data/siteConfig";
import TallyPopupButton from "../site/TallyPopupButton";

/**
 * "What it costs" — the price board.
 *
 * This section publishes Haul Yeah's ACTUAL package bands, not generic NJ
 * market ranges. Two reasons that matters commercially:
 *
 *  1. It pre-qualifies. Someone who wants a $300 move self-selects out
 *     before they occupy a phone slot on a Saturday morning, which is when
 *     the owner's time is worth the most.
 *  2. It removes the "that's more than I expected" beat from the close. The
 *     phone script's job becomes confirming a number the customer already
 *     saw, not defending one they're hearing for the first time.
 *
 * The old version of this block published "$500–$1,200" for a full apartment
 * move — below the company's own $650 floor. Publishing a number you will not
 * honour is worse than publishing nothing: it wins the click and loses the
 * booking at the exact moment trust matters. Everything here reads from
 * siteConfig.pricing / siteConfig.terms so it can never drift again.
 */
export default function PricingBoard() {
  const { pricing, terms, contact } = siteConfig;

  return (
    <section id="cost" className="band band--cream" data-testid="pricing-section">
      <div className="wrap">
        <div className="bh rv">
          <h2 data-testid="pricing-heading">{pricing.heading}</h2>
          <p>{pricing.subheading}</p>
        </div>

        <div className="grid gap-[clamp(28px,4vw,56px)] rv lg:grid-cols-[1.15fr_1fr]">
          {/* Left — the packages board */}
          <div>
            <div className="brd" data-testid="pricing-packages">
              {pricing.packages.map((p) => (
                <div key={p.label}>
                  <span>
                    {p.label}
                    <span className="mt-0.5 block text-[13px] font-normal uppercase tracking-[0.12em] opacity-55">
                      {p.detail}
                    </span>
                  </span>
                  <span>{p.price}</span>
                </div>
              ))}
            </div>

            <p className="fine">{pricing.fineprint}</p>

            <div className="mt-8 border-2 border-ink bg-cream-deep p-6">
              <h4 className="text-orange">Peak dates</h4>
              <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed">
                {pricing.peakNote}
              </p>
            </div>
          </div>

          {/* Right — what's included, what adds, and the terms */}
          <div>
            <h4 className="text-orange">Included in every truck quote</h4>
            <ul className="mt-3" data-testid="pricing-included">
              {pricing.included.map((item) => (
                <li
                  key={item}
                  className="border-b border-ink/20 py-2.5 text-[15px] before:mr-3 before:inline-block before:h-2 before:w-2 before:bg-orange-bright before:align-middle before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="mt-9 text-orange">Only these change your number</h4>
            <div className="brd mt-3" data-testid="pricing-addons">
              {pricing.addOns.map((a) => (
                <div key={a.label}>
                  <span>{a.label}</span>
                  <span>{a.price}</span>
                </div>
              ))}
            </div>

            {/* Minimums and deposit, stated up front. These were previously
                contradicted on the site ("no minimum-hour trap") — see terms
                in siteConfig.js. */}
            <div className="mt-9 border-2 border-ink p-6">
              <h4>Minimums &amp; deposit</h4>
              <p className="mt-2 text-[15px] leading-relaxed">
                {terms.minimumLine}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                {terms.depositLine}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <TallyPopupButton size="sm" testId="pricing-quote-btn">
                Get my number
              </TallyPopupButton>
              <a
                href={`tel:${contact.phoneTel}`}
                className="text-sm font-bold uppercase tracking-[0.12em] text-orange underline underline-offset-4"
              >
                or call {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
