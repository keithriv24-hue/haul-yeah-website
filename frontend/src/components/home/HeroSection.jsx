import React from "react";
import TallyInlineEmbed from "../site/TallyInlineEmbed";
import siteConfig from "../../data/siteConfig";

/**
 * Hero — cream band, oversized Archivo Black headline on the left, real crew
 * photo in a hard-bordered frame on the right, then a full-width quote bar
 * directly underneath.
 *
 * The inline Tally embed sits in its own band below the headline rather than
 * inside a floating card. Speed-to-lead is the business model, so the form is
 * the first thing under the fold on every screen size instead of being pushed
 * off-screen by the photo on mobile.
 */
export default function HeroSection() {
  const { hero, contact } = siteConfig;

  return (
    <>
      <section
        className="bg-cream pb-[clamp(28px,4vw,54px)] pt-[clamp(30px,4.4vw,64px)]"
        data-testid="hero-section"
        aria-labelledby="hero-h1"
      >
        <div className="wrap grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1.15fr_1fr]">
          <div>
            <span className="kick text-orange" data-testid="hero-kicker">
              {hero.kicker}
            </span>

            <h1 id="hero-h1" data-testid="hero-h1" className="mt-4">
              {hero.h1Lead}
              <br />
              {hero.h1Mid}{" "}
              <span className="text-orange underline decoration-orange-bright decoration-[0.09em] underline-offset-[0.12em]">
                {hero.h1Accent}
              </span>
            </h1>

            <p
              className="mt-6 max-w-[52ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed opacity-85"
              data-testid="hero-subhead"
            >
              {hero.subhead}
            </p>

            {/* Stat strip — three verifiable facts, no star ratings. */}
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t-2 border-ink pt-5">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">
                    {s.label}
                  </span>
                  <b className="font-display text-[clamp(20px,2.2vw,28px)] tracking-[-0.02em]">
                    {s.value}
                  </b>
                </div>
              ))}
            </div>

            <a
              href={`sms:${contact.phoneTel}`}
              data-testid="hero-sms-cta"
              className="mt-7 inline-block text-sm font-bold uppercase tracking-[0.12em] text-orange underline underline-offset-4"
            >
              {hero.secondaryCta} →
            </a>
          </div>

          {/* Real crew photo — hard border + offset shadow, no rounded corners. */}
          <div className="relative border-2 border-ink shadow-sign-ink">
            <img
              src={hero.imageUrl}
              alt={hero.imageAlt}
              width="1200"
              height="900"
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <span className="absolute bottom-0 left-0 bg-ink px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.16em] text-cream">
              Our crew · our trucks
            </span>
          </div>
        </div>
      </section>

      {/* Quote bar */}
      <section className="border-y-4 border-ink bg-cream-deep py-[clamp(28px,4vw,44px)]" id="quote">
        <div className="wrap">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[clamp(26px,3.4vw,44px)]">
              {hero.formCardTitle}
            </h2>
            <span className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-70">
              {hero.formCardSubtitle}
            </span>
          </div>

          <div
            className="border-2 border-ink bg-cream p-2 sm:p-3"
            data-testid="hero-tally-card"
          >
            <TallyInlineEmbed />
          </div>

          <p className="mt-4 text-sm opacity-75">
            No card, no site visit, no obligation. Prefer to talk? Text or call{" "}
            <a
              href={`tel:${contact.phoneTel}`}
              className="font-bold text-orange underline underline-offset-4"
            >
              {contact.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
