import React from "react";
import { Link } from "react-router-dom";
import TallyPopupButton from "../components/site/TallyPopupButton";
import siteConfig from "../data/siteConfig";

export default function NotFound() {
  return (
    <>
      <title>Page not found | {siteConfig.business.name}</title>
      <meta name="robots" content="noindex" />
      <section className="mx-auto max-w-3xl px-4 py-24 text-left sm:px-6 lg:px-8">
        <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
          404
        </p>
        <h1
          className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl"
          data-testid="notfound-h1"
        >
          That truck isn&apos;t at this address.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
          We couldn&apos;t find that page. Head back home or grab a free quote —
          we&apos;re 7 days a week.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/"
            data-testid="notfound-home-link"
            className="inline-flex items-center justify-center rounded-sm border-2 border-navy px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Back to homepage
          </Link>
          <TallyPopupButton testId="notfound-quote-btn" size="lg">
            Free Quote
          </TallyPopupButton>
        </div>
      </section>
    </>
  );
}
