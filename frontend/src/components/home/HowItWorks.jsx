import React from "react";
import siteConfig from "../../data/siteConfig";

/**
 * 3-step "How it works" — real crew photo on the left, steps on the right.
 * Big Archivo step numbers sit behind the copy for visual depth.
 */
export default function HowItWorks() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-20 sm:py-28"
      aria-labelledby="how-heading"
      data-testid="how-it-works-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — real crew photo */}
          <div className="lg:col-span-5">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              How it works
            </p>
            <h2
              id="how-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              Three steps, one honest number, done.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
              Weekend or weekday, small load or full house — the process is the
              same. No mystery fuel fees, no hourly runup on move day.
            </p>

            <div className="relative mt-10">
              <div
                className="absolute -bottom-3 -right-3 hidden h-32 w-32 rounded-sm bg-orange lg:block"
                aria-hidden="true"
              />
              <img
                src={siteConfig.howItWorksImage.url}
                alt={siteConfig.howItWorksImage.alt}
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/3] w-full rounded-md border border-slate-200 object-cover shadow-lg"
                data-testid="how-it-works-image"
              />
            </div>
          </div>

          {/* Right — 3 steps */}
          <ol className="grid gap-4 lg:col-span-7" data-testid="how-it-works-steps">
            {siteConfig.howItWorks.map((step, i) => (
              <li
                key={step.step}
                className="relative overflow-hidden rounded-md border border-slate-200 bg-white p-8"
                data-testid={`how-step-${i}`}
              >
                <span
                  className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[8rem] font-black leading-none tracking-tighter text-slate-100 sm:text-[10rem]"
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <div className="relative">
                  <p className="font-display text-xs font-bold uppercase tracking-widest text-orange">
                    Step {step.step}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
