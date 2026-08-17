import React from "react";
import siteConfig from "../../data/siteConfig";

/**
 * Scrolling marquee strip. Replaces the old three-badge trust bar.
 *
 * Factual claims only — NO star ratings, NO review scores, no "voted best".
 * The strings come from siteConfig.marquee so the claims stay in one place
 * and can't drift from the rest of the site.
 *
 * The list is rendered twice so the -50% keyframe loops seamlessly. The
 * duplicate is aria-hidden so a screen reader hears the claims once, and the
 * animation is disabled entirely under prefers-reduced-motion (index.css).
 */
export default function TrustBar() {
  const line = siteConfig.marquee;

  const Run = ({ hidden }) => (
    <span aria-hidden={hidden || undefined}>
      {line.map((item) => (
        <React.Fragment key={item}>
          {item}
          <i>·</i>
        </React.Fragment>
      ))}
    </span>
  );

  return (
    <section className="mq" aria-label="What we do" data-testid="trust-bar">
      <div className="mq-t">
        <Run />
        <Run hidden />
      </div>
    </section>
  );
}
