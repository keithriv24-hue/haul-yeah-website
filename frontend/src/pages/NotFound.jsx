import React from "react";
import { Link } from "react-router-dom";
import TallyPopupButton from "../components/site/TallyPopupButton";
import siteConfig from "../data/siteConfig";

export default function NotFound() {
  return (
    <>
      {/* Single text child ONLY — see the note in ThankYou.jsx. */}
      <title>{`Page not found | ${siteConfig.business.name}`}</title>
      <meta name="robots" content="noindex" />

      <section className="band band--cream">
        <div className="wrap max-w-[880px]">
          <span className="kick text-orange">404</span>
          <h1 className="mt-4" data-testid="notfound-h1">
            That truck isn&apos;t at this address.
          </h1>
          <p className="mt-6 max-w-[48ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed opacity-85">
            We couldn&apos;t find that page. Head back home or grab a free quote
            — we answer seven days a week and we move Saturdays and Sundays.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <TallyPopupButton testId="notfound-quote-btn">
              Free quote
            </TallyPopupButton>
            <Link
              to="/"
              data-testid="notfound-home-link"
              className="sbtn sbtn--ghost border-ink text-ink"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
