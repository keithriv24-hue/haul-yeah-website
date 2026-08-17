import React from "react";

/**
 * Reusable FAQ disclosure.
 *
 * Uses native <details>/<summary> rather than a JS accordion:
 *   • The answer text is always in the DOM, so crawlers index it and the
 *     FAQPage JSON-LD on the page has matching visible content (Google
 *     requires the marked-up answer to be present on the page).
 *   • Keyboard and screen-reader behaviour is the browser's, not ours.
 *   • It works before hydration — which matters because every page here is
 *     prerendered and a visitor can tap an FAQ before React has booted.
 *
 * Styling lives in the `.faq` block in index.css, including the +/– marker.
 * Pass defaultOpen on the first item so the section doesn't read as an
 * unlabelled list of headings.
 */
export default function FAQAccordion({ question, answer, index, defaultOpen = false }) {
  return (
    <details data-testid={`faq-item-${index}`} open={defaultOpen}>
      <summary data-testid={`faq-toggle-${index}`}>{question}</summary>
      <p data-testid={`faq-answer-${index}`}>{answer}</p>
    </details>
  );
}
