import React from "react";
import { Check } from "lucide-react";
import TallyPopupButton from "../site/TallyPopupButton";
import siteConfig from "../../data/siteConfig";

/**
 * Why Haul Yeah — 4 value props on the left, fleet image on the right.
 * Off-white background to break rhythm from the white services section.
 */
export default function WhySection() {
  return (
    <section
      className="border-b border-slate-200 bg-slate-50 py-20 sm:py-28"
      aria-labelledby="why-heading"
      data-testid="why-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              Why Haul Yeah
            </p>
            <h2
              id="why-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              Four reasons NJ picks us for the weekend rush.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              We&apos;re not the biggest name in New Jersey — we&apos;re the one
              that actually shows up on Saturday. Here&apos;s the short version.
            </p>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {siteConfig.whyUs.map((item, i) => (
                <li
                  key={item.title}
                  className="relative flex gap-4 rounded-md border border-slate-200 bg-white p-6"
                  data-testid={`why-item-${i}`}
                >
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-orange text-white">
                    <Check className="h-4 w-4" strokeWidth={2.6} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TallyPopupButton
                testId="why-section-quote-btn"
                size="lg"
                showConsent
              >
                Get My Free Quote
              </TallyPopupButton>
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                data-testid="why-section-phone-link"
                className="inline-flex items-center gap-2 px-2 py-3 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:text-orange"
              >
                Or call {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right — fleet image with sharp orange accent block */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="absolute -bottom-3 -right-3 hidden h-40 w-40 rounded-sm bg-orange lg:block"
                aria-hidden="true"
              />
              <img
                src={siteConfig.whyImage.url}
                alt={siteConfig.whyImage.alt}
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/3] w-full rounded-md border border-slate-200 object-cover shadow-lg"
                data-testid="why-fleet-image"
              />
            </div>

            <div className="mt-8 rounded-md border border-slate-200 bg-white p-6">
              <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
                By the numbers
              </p>
              <dl className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Trucks
                  </dt>
                  <dd className="mt-1 font-display text-3xl font-extrabold tracking-tight text-navy">
                    5
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Truck size
                  </dt>
                  <dd className="mt-1 font-display text-3xl font-extrabold tracking-tight text-navy">
                    26<span className="text-orange">ft</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Days open
                  </dt>
                  <dd className="mt-1 font-display text-3xl font-extrabold tracking-tight text-navy">
                    7
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
