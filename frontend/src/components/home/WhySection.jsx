import React from "react";
import siteConfig from "../../data/siteConfig";

/**
 * "Four promises" — black band, numbered, plus a full-bleed crew photo
 * underneath with an overlay statement.
 *
 * Every line here is deliberately a claim a customer can hold us to on move
 * day. The fourth promise used to read "Damage-Free Guarantee", which we do
 * not underwrite — see the `terms` block in siteConfig.js for why it now says
 * what it says, and do not put the word "guarantee" back without cargo
 * coverage to stand behind it.
 */
export default function WhySection() {
  const { whyUs, whyImage, terms } = siteConfig;

  return (
    <>
      <section id="why" className="band band--black" data-testid="why-section">
        <div className="wrap">
          <div className="bh rv">
            <h2 data-testid="why-heading">Four promises</h2>
            <p>Everything here is something you can hold us to on move day.</p>
          </div>

          <div className="grid3 rv">
            {whyUs.map((item, i) => (
              <div key={item.title} data-testid={`why-card-${i}`}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed opacity-80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Valuation coverage, stated plainly rather than buried. */}
          <p className="mt-10 max-w-[68ch] border-t-2 border-cream/25 pt-5 text-sm opacity-70">
            {terms.valuationLine}
          </p>
        </div>
      </section>

      <div className="relative">
        <img
          src={whyImage.url}
          alt={whyImage.alt}
          width="1600"
          height="900"
          loading="lazy"
          decoding="async"
          className="h-[clamp(280px,42vw,520px)] w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/35 to-transparent p-[var(--gut)] text-cream">
          <h2 className="max-w-[16ch]">Our trucks. Our crew.</h2>
          <p className="mt-3 max-w-[46ch] text-[15px] opacity-85">
            Every photo on this site is a real Haul Yeah job in Essex County —
            no stock images, no borrowed fleet.
          </p>
        </div>
      </div>
    </>
  );
}
