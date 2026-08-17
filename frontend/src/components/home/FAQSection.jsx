import React from "react";
import FAQAccordion from "../site/FAQAccordion";
import siteConfig from "../../data/siteConfig";

/**
 * Homepage FAQ — cream-2 band. Every answer is in the DOM at all times so it
 * matches the FAQPage JSON-LD emitted by Home.jsx.
 *
 * These answers carry real numbers (minimums, deposit, price bands). They are
 * written to be the same answers the phone script gives, so a customer who
 * read the site and a customer who called hear one company.
 */
export default function FAQSection() {
  return (
    <section
      className="band band--cream2"
      aria-labelledby="faq-heading"
      data-testid="faq-section"
    >
      <div className="wrap">
        <div className="bh rv">
          <h2 id="faq-heading">Straight answers</h2>
          <p>
            The questions people actually ask before they book a mover — priced,
            not hedged.
          </p>
        </div>

        <div className="faq rv max-w-[900px]">
          {siteConfig.faqs.map((item, i) => (
            <FAQAccordion
              key={item.q}
              question={item.q}
              answer={item.a}
              index={i}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
