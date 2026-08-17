import React from "react";
import siteConfig from "../../data/siteConfig";

/**
 * Compact price band for inner pages (service + town).
 *
 * Renders the same four package bands as the homepage board, reading from
 * siteConfig.pricing — so a customer who lands on /services/small-moves/ from
 * an ad sees the same numbers as one who lands on the homepage, and neither
 * hears a different number on the phone.
 *
 * `note` is an optional page-specific line (e.g. the labor-only page adds its
 * two-hour minimum). Keep page-specific pricing text in the service/location
 * data files, never hard-coded in a component.
 */
export default function PriceStrip({ note, testId = "price-strip" }) {
  const { pricing, terms } = siteConfig;

  return (
    <section className="band band--cream2" data-testid={testId}>
      <div className="wrap">
        <div className="bh rv">
          <h2>What it costs</h2>
          <p>
            Our real price bands — truck, fuel, blankets, equipment and the
            first 20 miles are already inside every one of them.
          </p>
        </div>

        <div className="grid gap-[clamp(24px,3.4vw,48px)] rv lg:grid-cols-[1.1fr_1fr]">
          <div className="brd">
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

          <div>
            {note ? (
              <p className="mb-5 border-l-4 border-orange pl-4 text-[16px] leading-relaxed">
                {note}
              </p>
            ) : null}

            <div className="border-2 border-ink bg-cream p-6">
              <h4>Minimums &amp; deposit</h4>
              <p className="mt-2 text-[15px] leading-relaxed">
                {terms.minimumLine}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                {terms.depositLine}
              </p>
            </div>

            <p className="fine">{pricing.peakNote}</p>

            <a
              href="/#cost"
              className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.12em] text-orange underline underline-offset-4"
            >
              Full price breakdown →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
