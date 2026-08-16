import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, Truck, MapPin, Clock } from "lucide-react";
import siteConfig from "../data/siteConfig";
import { buildMovingCompanyJsonLd } from "../lib/seo";
import TallyPopupButton from "../components/site/TallyPopupButton";

/**
 * /about — the E-E-A-T page.
 * ─────────────────────────────────────────────────────────────
 * WHY THIS PAGE EXISTS
 * The site had no About page at all. For local home services, Google leans on
 * a real, named, accountable operator as a quality signal, and so do customers
 * choosing between a company with 200 reviews and one with none. This page is
 * the single best place to answer "who actually shows up at my door".
 *
 * COPY RULES — DO NOT BREAK THESE:
 *   • Every claim here must be verifiable. No invented years in business, no
 *     "trusted by 500 families", no awards, no fake credentials.
 *   • Do NOT add the words "licensed and insured" anywhere until the NJ
 *     Division of Consumer Affairs Public Mover licence is issued AND its
 *     number is populated in siteConfig.compliance. The number renders
 *     automatically in the block below and in the footer once it exists.
 *   • The street address is intentionally omitted — this is a
 *     service-area business and the operating address is not published.
 */

const values = [
  {
    icon: Clock,
    title: "We call back",
    body: "The single most common complaint about movers in this market is that nobody picks up. Our whole model is built around answering fast and giving you a real number on the first call — not a callback in three days.",
  },
  {
    icon: Truck,
    title: "Our own trucks and our own crew",
    body: "We are not a broker. We do not sell your job to whoever is cheapest that weekend. The trucks in the photos on this site are our trucks, and the movers are our movers.",
  },
  {
    icon: MapPin,
    title: "We stay close to home",
    body: "We work Essex County and the towns around it. Staying tight to our own backyard is why we know which Newark buildings need move-in paperwork and where the truck can actually park.",
  },
];

export default function About() {
  const { njMoverLicense, usDot, mcNumber, prefixLabel } =
    siteConfig.compliance;
  const hasCredentials = Boolean(njMoverLicense || usDot || mcNumber);

  return (
    <>
      <title>About Haul Yeah Moving | Essex County, NJ Movers</title>
      <meta
        name="description"
        content="Who we are: a weekend-first moving company based in Essex County, NJ. Our own trucks, our own crew, and a real number on the first call."
      />
      <link rel="canonical" href={`${siteConfig.business.baseUrl}/about/`} />
      {/* Same MovingCompany entity as the homepage, same @id, so Google reads
          every page as one business rather than several. This was the only
          page in sitemap.xml with no structured data at all. */}
      <script type="application/ld+json">
        {JSON.stringify(buildMovingCompanyJsonLd())}
      </script>
      <meta
        property="og:title"
        content="About Haul Yeah Moving | Essex County, NJ Movers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteConfig.business.baseUrl}/about/`} />
      <meta
        property="og:image"
        content={`${siteConfig.business.baseUrl}${siteConfig.branding.ogImagePath}`}
      />
      <meta
        property="og:image:width"
        content={siteConfig.branding.ogImageWidth}
      />
      <meta
        property="og:image:height"
        content={siteConfig.branding.ogImageHeight}
      />
      <meta property="og:image:alt" content={siteConfig.branding.ogImageAlt} />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              About us
            </p>
            <h1
              className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-6xl"
              data-testid="about-h1"
            >
              The movers who actually work weekends.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
              Haul Yeah Moving is a weekend-first moving company based in Essex
              County, New Jersey.
            </p>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600">
              <p data-testid="about-para-0">
                Most people in New Jersey move on a Saturday, because most
                people work Monday to Friday. Most moving companies treat
                Saturday as the shift nobody wants. That gap is the entire
                reason this company exists — we built the schedule, the crew and
                the fleet around the weekend instead of squeezing it in around
                the weekday work.
              </p>
              <p data-testid="about-para-1">
                We are a small operation and we are new. We would rather tell
                you that than pad this page with stock photos and invented
                credentials. What we can tell you is what we control: you get a
                written all-in number before you pay anything, a refundable
                deposit that holds your date, and a crew that turns up when we
                said we would.
              </p>
              <p data-testid="about-para-2">
                We run a fleet of trucks from 16 ft to 26 ft, we work seven days
                a week, and we serve Essex County and the towns around it —
                Newark, East Orange, Montclair, Bloomfield, Irvington, Nutley,
                Belleville, the Oranges, and across the line into Jersey City.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TallyPopupButton
                testId="about-hero-quote-btn"
                size="lg"
                showConsent
              >
                Get My Free Quote
              </TallyPopupButton>
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                data-testid="about-hero-phone-link"
                className="inline-flex items-center gap-2 px-2 py-3 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:text-orange"
              >
                <Phone className="h-4 w-4" strokeWidth={2.4} />
                Or call {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="absolute -bottom-3 -right-3 hidden h-32 w-32 rounded-sm bg-orange lg:block"
                aria-hidden="true"
              />
              <img
                src="/images/crew-open-truck-box.webp"
                alt="The Haul Yeah Moving crew at the open box of a 26-ft moving truck in Essex County, NJ"
                width="1280"
                height="940"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative aspect-[4/3] w-full rounded-md border border-slate-200 object-cover shadow-lg"
                data-testid="about-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              How we work
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl">
              Three things we refuse to get wrong.
            </h2>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <li
                  key={v.title}
                  className="rounded-md border border-slate-200 bg-white p-6"
                  data-testid={`about-value-${i}`}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-orange text-white">
                    <Icon className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {v.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Credentials — renders ONLY when real numbers exist. */}
      {hasCredentials && (
        <section
          className="border-b border-slate-200 bg-white py-16 sm:py-20"
          data-testid="about-credentials"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              Credentials
            </p>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Our numbers, so you can check them yourself.
            </h2>
            <dl className="mt-8 space-y-4 text-sm">
              {njMoverLicense && (
                <div className="flex flex-wrap gap-x-3 border-b border-slate-200 pb-4">
                  <dt className="font-semibold text-navy">{prefixLabel}</dt>
                  <dd className="text-slate-600">{njMoverLicense}</dd>
                </div>
              )}
              {usDot && (
                <div className="flex flex-wrap gap-x-3 border-b border-slate-200 pb-4">
                  <dt className="font-semibold text-navy">USDOT</dt>
                  <dd className="text-slate-600">{usDot}</dd>
                </div>
              )}
              {mcNumber && (
                <div className="flex flex-wrap gap-x-3 border-b border-slate-200 pb-4">
                  <dt className="font-semibold text-navy">MC</dt>
                  <dd className="text-slate-600">{mcNumber}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      {/* Contact / CTA */}
      <section
        className="grain-overlay bg-navy py-16 text-white sm:py-20"
        data-testid="about-final-cta"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Talk to us directly.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">
              Call, text, or send the details. You&apos;ll get a real number in{" "}
              {siteConfig.contact.responseTime} — 7 days a week.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <TallyPopupButton testId="about-final-cta-quote-btn" size="lg">
              Get My Free Quote
            </TallyPopupButton>
            <a
              href={`sms:${siteConfig.contact.phoneTel}`}
              data-testid="about-final-cta-sms-link"
              className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/20 px-5 py-4 font-display text-sm font-bold uppercase tracking-wide text-slate-200 transition-colors hover:border-white"
            >
              <MessageSquare className="h-4 w-4" strokeWidth={2.4} />
              Text us
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-400">
            Prefer to browse first?{" "}
            <Link to="/" className="font-semibold text-white hover:text-orange">
              See what we move
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
