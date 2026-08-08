import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

/**
 * Reusable FAQ accordion item. Content is ALWAYS in the DOM (sr-only
 * when collapsed) so crawlers can index the answer text for SEO.
 */
export default function FAQAccordion({ question, answer, index }) {
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
