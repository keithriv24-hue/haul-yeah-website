import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import siteConfig from "../../data/siteConfig";

/**
 * FAQ — 6 questions, all Q&A text rendered in the DOM (SEO).
 * Accordion is expand/collapse — but content is present regardless of state.
 * We render <details>/<summary> so:
 *   1. Content is always in DOM (SEO)
 *   2. No JS needed for expand/collapse
 *   3. Fully accessible
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
            <FaqItem
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

function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div data-testid={`faq-item-${index}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-testid={`faq-toggle-${index}`}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-orange"
      >
        <span className="font-display text-lg font-bold leading-tight tracking-tight text-navy sm:text-xl">
          {question}
        </span>
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-slate-300 text-navy transition-colors group-hover:border-orange group-hover:text-orange">
          {open ? (
            <Minus className="h-4 w-4" strokeWidth={2.6} />
          ) : (
            <Plus className="h-4 w-4" strokeWidth={2.6} />
          )}
        </span>
      </button>

      {/*
        SEO note: we always render the answer text in the DOM.
        We only hide it visually via CSS when collapsed, so crawlers still index it.
      */}
      <div
        id={`faq-answer-${index}`}
        className={open ? "pb-6" : "pb-6 sr-only"}
        data-testid={`faq-answer-${index}`}
      >
        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
          {answer}
        </p>
      </div>
    </div>
  );
}
