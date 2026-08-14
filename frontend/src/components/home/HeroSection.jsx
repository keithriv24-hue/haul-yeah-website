import React from "react";
import { MessageSquare, Truck, Zap } from "lucide-react";
import TallyInlineEmbed from "../site/TallyInlineEmbed";
import siteConfig from "../../data/siteConfig";

/**
 * Hero — asymmetric split.
 * Left: kicker, H1, subhead, secondary sms CTA, trust chips.
 * Right: white Tally card layered slightly forward, with the hero image
 *        as a background element that fades left-to-right into white.
 */
export default function HeroSection() {
  const { hero, contact } = siteConfig;

  return (
    <section
      className="relative overflow-hidden bg-white"
      data-testid="hero-section"
      aria-labelledby="hero-h1"
    >
      {/* Desktop-only background image (right 3/5 of the section) with white gradient */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        <img
          src={hero.imageUrl}
          alt=""
          width="1600"
          height="1000"
          fetchPriority="high"
          decoding="async"
          className="absolute right-0 top-0 h-full w-[62%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[62%] bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      {/* Mobile hero image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden lg:hidden">
        <img
          src={hero.imageUrl}
          alt={hero.imageAlt}
          width="1200"
          height="750"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid lg:min-h-[640px] lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
        {/* Left column — copy */}
        <div className="lg:col-span-7 lg:pt-4">
          <p
            className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange"
            data-testid="hero-kicker"
          >
            <span className="mr-2 inline-block h-1 w-6 translate-y-[-3px] bg-orange align-middle" />
            {hero.kicker}
          </p>

          <h1
            id="hero-h1"
            data-testid="hero-h1"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-6xl"
          >
            New Jersey&apos;s Weekend Movers{" "}
            <span className="text-orange">— Booked in Minutes.</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            data-testid="hero-subhead"
          >
            {hero.subhead}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`sms:${contact.phoneTel}`}
              data-testid="hero-sms-cta"
              className="group inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:text-orange"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border-2 border-navy transition-colors group-hover:border-orange group-hover:text-orange">
                <MessageSquare className="h-4 w-4" strokeWidth={2.4} />
              </span>
              {hero.secondaryCta}
            </a>
          </div>

          {/* Inline trust chips */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            <li className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
              <Truck className="h-4 w-4 text-orange" strokeWidth={2.4} />
              Trucks 16–26 ft
            </li>
            <li className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
              <Zap className="h-4 w-4 text-orange" strokeWidth={2.4} />
              Reply in under 5 min
            </li>
            <li className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
              <span
                className="inline-block h-2 w-2 rounded-full bg-orange"
                aria-hidden="true"
              />
              7 days a week
            </li>
          </ul>
        </div>

        {/* Right column — Tally form card */}
        <div className="mt-12 lg:col-span-5 lg:mt-0" id="quote">
          <div
            className="relative overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(14,31,61,0.35)]"
            data-testid="hero-tally-card"
          >
            <div className="border-b border-slate-100 bg-navy px-6 py-5 text-white grain-overlay">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-orange">
                Free Quote
              </p>
              <h2 className="mt-1 font-display text-xl font-extrabold leading-tight tracking-tight">
                {siteConfig.hero.formCardTitle}
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                {siteConfig.hero.formCardSubtitle}
              </p>
            </div>

            <div className="px-2 pb-3 pt-2 sm:px-4">
              <TallyInlineEmbed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
