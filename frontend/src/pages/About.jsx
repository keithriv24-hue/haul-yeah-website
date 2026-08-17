import React from "react";
import siteConfig from "../data/siteConfig";
import { buildMovingCompanyJsonLd } from "../lib/seo";
import TallyPopupButton from "../components/site/TallyPopupButton";
import MidCTA from "../components/site/MidCTA";
import useReveal from "../lib/useReveal";

/**
 * /about — the E-E-A-T page.
 * ─────────────────────────────────────────────────────────────
 * WHY THIS PAGE EXISTS
 * For local home services, Google leans on a real, named, accountable
 * operator as a quality signal, and so do customers choosing between a
 * company with 200 reviews and one with none. This page is the single best
 * place to answer "who actually shows up at my door".
 *
 * COPY RULES — DO NOT BREAK THESE:
 *   • Every claim here must be verifiable. No invented years in business, no
 *     "trusted by 500 families", no awards, no fake credentials.
 *   • Do NOT add the words "licensed and insured" anywhere until the NJ
 *     Division of Consumer Affairs Public Mover licence is issued AND its
 *     number is populated in siteConfig.compliance. The credentials block
 *     below renders automatically once it exists, and stays hidden until then.
 *   • The street address is intentionally omitted — this is a service-area
 *     business and the operating address is not published.
 *   • Deposit and availability wording must match siteConfig.terms and
 *     siteConfig.business.hoursShort. This page previously said "refundable
 *     deposit" with no terms and "seven days a week" for moving; both are now
 *     stated exactly.
 */

const values = [
  {
    title: "We call back",
    body: "The most common complaint about movers in this market is that nobody picks up. Our whole model is built around answering fast and giving you a real number on the first call — not a callback in three days.",
  },
  {
    title: "Our own trucks and our own crew",
    body: "We are not a broker. We do not sell your job to whoever is cheapest that weekend. The trucks in the photos on this site are our trucks, and the movers are our movers.",
  },
  {
    title: "We stay close to home",
    body: "We work Essex County and the towns around it. Staying tight to our own backyard is why we know which Newark buildings need move-in paperwork and where the truck can actually park.",
  },
];

export default function About() {
  const { njMoverLicense, usDot, mcNumber, prefixLabel } = siteConfig.compliance;
  const hasCredentials = Boolean(njMoverLicense || usDot || mcNumber);
  useReveal();

  return (
    <>
      <title>About Haul Yeah Moving | Essex County, NJ Movers</title>
      <meta
        name="description"
        content="Who we are: a weekend-first moving company based in Essex County, NJ. Our own trucks, our own crew, and a real number on the first call."
      />
      <link rel="canonical" href={`${siteConfig.business.baseUrl}/about/`} />
      {/* Same MovingCompany entity as the homepage, same @id, so Google reads
          every page as one business rather than several. */}
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
      <meta property="og:image:width" content={siteConfig.branding.ogImageWidth} />
      <meta property="og:image:height" content={siteConfig.branding.ogImageHeight} />
      <meta property="og:image:alt" content={siteConfig.branding.ogImageAlt} />

      {/* Hero */}
      <section className="bg-cream pb-[clamp(30px,4vw,56px)] pt-[clamp(26px,3.4vw,48px)]">
        <div className="wrap grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1.15fr_1fr]">
          <div>
            <span className="kick text-orange">About us</span>
            <h1 className="mt-4" data-testid="about-h1">
              The movers who actually work weekends.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed opacity-85">
              Haul Yeah Moving is a weekend-first moving company based in Essex
              County, New Jersey.
            </p>

            <div className="prose-hy mt-7 max-w-[62ch]">
              <p data-testid="about-para-0">
                Most people in New Jersey move on a Saturday, because most people
                work Monday to Friday. Most moving companies treat Saturday as
                the shift nobody wants. That gap is the entire reason this
                company exists — we built the schedule, the crew and the fleet
                around the weekend instead of squeezing it in around weekday
                work.
              </p>
              <p data-testid="about-para-1">
                We are a small operation and we are new. We would rather tell you
                that than pad this page with stock photos and invented
                credentials. What we can tell you is what we control: a written
                all-in number before you pay anything, a 25% deposit that holds
                your date and comes back in full if you cancel 72 or more hours
                out, and a crew that turns up when we said we would.
              </p>
              <p data-testid="about-para-2">
                We run box trucks from 16 ft to 26 ft. We answer the phone seven
                days a week and we move Saturdays and Sundays — that's what we
                staff for, and we would rather be honest about it than book you a
                Tuesday we can't cover. We serve Essex County and the towns
                around it: Newark, East Orange, Montclair, Bloomfield, Irvington,
                Nutley, Belleville, the Oranges, and across the line into Jersey
                City.
              </p>
            </div>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
              <TallyPopupButton testId="about-hero-quote-btn" showConsent>
                Get my free quote
              </TallyPopupButton>
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                data-testid="about-hero-phone-link"
                className="sbtn sbtn--ghost border-ink text-ink"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="self-start border-2 border-ink shadow-sign-ink">
            <img
              src="/images/crew-open-truck-box.webp"
              alt="The Haul Yeah Moving crew at the open box of a 26-ft moving truck in Essex County, NJ"
              width="1280"
              height="940"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
              data-testid="about-hero-image"
            />
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="band band--black">
        <div className="wrap">
          <div className="bh rv">
            <h2>Three things we refuse to get wrong</h2>
            <p>
              Small company, short list. These are the ones we'd want a customer
              to hold us to.
            </p>
          </div>
          <div className="grid3 rv">
            {values.map((v, i) => (
              <div key={v.title} data-testid={`about-value-${i}`}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed opacity-80">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you're agreeing to — terms in plain language. */}
      <section className="band band--cream2" data-testid="about-terms">
        <div className="wrap">
          <div className="bh rv">
            <h2>What you're agreeing to</h2>
            <p>
              The terms that matter, in the same words we use on the phone. No
              small print you find out about on move day.
            </p>
          </div>
          <div className="grid3 rv">
            <div className="border-2 border-ink bg-cream p-6">
              <h3>Minimums</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed">
                {siteConfig.terms.minimumLine}
              </p>
            </div>
            <div className="border-2 border-ink bg-cream p-6">
              <h3>Deposit</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed">
                {siteConfig.terms.depositLine}
              </p>
            </div>
            <div className="border-2 border-ink bg-cream p-6">
              <h3>If something breaks</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed">
                {siteConfig.terms.damageLine} {siteConfig.terms.valuationLine}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials — renders ONLY when real numbers exist. */}
      {hasCredentials && (
        <section className="band band--cream band--tight" data-testid="about-credentials">
          <div className="wrap">
            <span className="kick text-orange">Credentials</span>
            <h2 className="mt-3 text-[clamp(26px,3vw,42px)]">
              Our numbers, so you can check them yourself.
            </h2>
            <dl className="mt-7 max-w-[560px]">
              {njMoverLicense && (
                <div className="flex flex-wrap justify-between gap-3 border-b-2 border-ink py-3">
                  <dt className="font-bold">{prefixLabel}</dt>
                  <dd className="font-display tracking-[-0.02em]">{njMoverLicense}</dd>
                </div>
              )}
              {usDot && (
                <div className="flex flex-wrap justify-between gap-3 border-b-2 border-ink py-3">
                  <dt className="font-bold">USDOT</dt>
                  <dd className="font-display tracking-[-0.02em]">{usDot}</dd>
                </div>
              )}
              {mcNumber && (
                <div className="flex flex-wrap justify-between gap-3 border-b-2 border-ink py-3">
                  <dt className="font-bold">MC</dt>
                  <dd className="font-display tracking-[-0.02em]">{mcNumber}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      <MidCTA
        heading="Talk to us directly."
        body={`Call, text, or send the details. You'll get a real number in ${siteConfig.contact.responseTime} — we answer seven days a week.`}
        variant="ink"
        testId="about-final-cta"
      />
    </>
  );
}
