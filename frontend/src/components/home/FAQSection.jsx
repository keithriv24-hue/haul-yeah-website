import React from "react";
import FAQAccordion from "../site/FAQAccordion";
import siteConfig from "../../data/siteConfig";

/**
 * Homepage FAQ — 6 verbatim questions. All Q&A rendered in DOM (sr-only when
 * collapsed) so search engines can index the full answer text.
 */
export default function FAQSection() {
  return (
    <section
      id="reviews"
      className="border-b border-slate-200 bg-white py-20 sm:py-28"
      aria-labelledby="faq-heading"
      data-testid="faq-section"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            What movers in New Jersey get asked most.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Short, honest answers. No sales talk.
          </p>
        </div>

        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {siteConfig.faqs.map((item, i) => (
            <FAQAccordion
              key={item.q}
              question={item.q}
              answer={item.a}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
