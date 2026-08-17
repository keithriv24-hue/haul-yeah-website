import React from "react";
import siteConfig from "../../data/siteConfig";

/**
 * Three steps — cream-2 band. Step two now states the real deposit terms
 * (25%, refundable 72+ hours out) instead of "a small refundable deposit",
 * which promised something the business does not do. See siteConfig.terms.
 */
export default function HowItWorks() {
  return (
    <section
      id="how"
      className="band band--cream2"
      aria-labelledby="how-heading"
      data-testid="how-it-works-section"
    >
      <div className="wrap">
        <div className="bh rv">
          <h2 id="how-heading">Three steps</h2>
          <p>No surveyor visit, no three-day wait, no sales call.</p>
        </div>

        <div className="grid gap-[clamp(28px,4vw,52px)] rv lg:grid-cols-[1fr_1.1fr]">
          {/* self-start so the frame hugs the photo instead of being
              stretched to the height of the three step cards beside it. */}
          <div className="self-start border-2 border-ink shadow-sign-ink">
            <img
              src={siteConfig.howItWorksImage.url}
              alt={siteConfig.howItWorksImage.alt}
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
              data-testid="how-it-works-image"
            />
          </div>

          <ol className="grid gap-4" data-testid="how-it-works-steps">
            {siteConfig.howItWorks.map((step, i) => (
              <li
                key={step.step}
                className="border-2 border-ink bg-cream p-6 sm:p-7"
                data-testid={`how-step-${i}`}
              >
                <span className="n">Step {step.step}</span>
                <h3>{step.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed opacity-80">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
