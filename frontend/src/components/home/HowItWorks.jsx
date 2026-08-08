import React from "react";
import siteConfig from "../../data/siteConfig";

/**
 * 3-step "How it works" — big Archivo step numbers behind the copy for depth.
 */
export default function HowItWorks() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-20 sm:py-28"
      aria-labelledby="how-heading"
      data-testid="how-it-works-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
            How it works
          </p>
          <h2
            id="how-heading"
            className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            Three steps, one honest number, done.
          </h2>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
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
    </section>
  );
}
