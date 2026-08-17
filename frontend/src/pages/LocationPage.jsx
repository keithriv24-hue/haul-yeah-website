import React from "react";
import { Link, useParams } from "react-router-dom";
import TallyPopupButton from "../components/site/TallyPopupButton";
import FAQAccordion from "../components/site/FAQAccordion";
import GoogleReviews from "../components/site/GoogleReviews";
import PriceStrip from "../components/site/PriceStrip";
import siteConfig from "../data/siteConfig";
import { getLocationBySlug, locations } from "../data/locations";
import { services } from "../data/services";
import { buildLocationJsonLd, buildFaqJsonLd } from "../lib/seo";
import useReveal from "../lib/useReveal";
import NotFound from "./NotFound";

/**
 * Town page template — drives all ten /movers/* pages.
 *
 * These pages carry the local SEO load, so the town name has to appear in the
 * H1, the intro prose, the service card titles and the FAQ answers — that is
 * why so much copy is interpolated rather than generic. The band rhythm is
 * identical to the service template so the two page types feel like one site.
 */
export default function LocationPage() {
  const { slug } = useParams();
  const location = getLocationBySlug(slug);
  useReveal([slug]);

  if (!location) return <NotFound />;

  const canonical = `${siteConfig.business.baseUrl}/movers/${location.slug}/`;
  const ogImage = `${siteConfig.business.baseUrl}${siteConfig.branding.ogImagePath}`;

  const locationLd = buildLocationJsonLd(location);
  const faqLd = buildFaqJsonLd(location.faqs);

  const nearby = location.nearbyTowns
    .map((t) => locations.find((x) => x.slug === t))
    .filter(Boolean);
  const highlighted = location.serviceHighlights
    .map((s) => services.find((x) => x.slug === s))
    .filter(Boolean);

  return (
    <>
      <title>{location.seo.title}</title>
      <meta name="description" content={location.seo.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={location.seo.title} />
      <meta property="og:description" content={location.seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={siteConfig.branding.ogImageWidth} />
      <meta property="og:image:height" content={siteConfig.branding.ogImageHeight} />
      <meta property="og:image:alt" content={siteConfig.branding.ogImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="bg-cream pb-[clamp(30px,4vw,56px)] pt-[clamp(26px,3.4vw,48px)]">
        <div className="wrap">
          <Link
            to="/#locations"
            data-testid="location-back-link"
            className="kick text-orange no-underline"
          >
            ← All towns
          </Link>

          <div className="mt-6 grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="kick block opacity-60">
                {location.name}, NJ · {siteConfig.business.serviceArea}
              </span>
              <h1 className="mt-3" data-testid="location-h1">
                {location.h1}
              </h1>
              <p className="mt-5 font-display text-[clamp(18px,2vw,24px)] uppercase tracking-[-0.02em] text-orange">
                {location.kicker}
              </p>

              <div className="prose-hy mt-6 max-w-[62ch]">
                {location.intro.map((para, i) => (
                  <p key={i} data-testid={`location-intro-para-${i}`}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
                <TallyPopupButton testId="location-hero-quote-btn" showConsent>
                  Get my free quote
                </TallyPopupButton>
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  data-testid="location-hero-phone-link"
                  className="sbtn sbtn--ghost border-ink text-ink"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Local knowledge panel */}
            <aside className="self-start border-2 border-ink bg-cream-deep p-7 shadow-sign-ink">
              <h4 className="text-orange">
                What we know about moving in {location.name}
              </h4>
              <p className="mt-3 text-[16px] leading-relaxed">
                {location.localTouch}
              </p>
              <ul className="mt-6 border-t-2 border-ink pt-4">
                {siteConfig.trustBadges.map((label) => (
                  <li
                    key={label}
                    className="py-1.5 font-display text-[15px] uppercase tracking-[-0.02em] before:mr-3 before:inline-block before:h-2 before:w-2 before:bg-orange before:align-middle before:content-['']"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Services in this town ──────────────────────────── */}
      <section className="band band--black" data-testid="location-services-section">
        <div className="wrap">
          <div className="bh rv">
            <h2 data-testid="location-services-heading">
              Moving services in {location.name}
            </h2>
            <p>
              Every service on our menu is available for jobs in {location.name}.
              These are the ones we run here most often.
            </p>
          </div>

          <div className="grid3 rv" data-testid="location-highlighted-services">
            {highlighted.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}/`}
                data-testid={`location-service-${s.slug}`}
                className="border-2 border-cream/30 p-6 no-underline transition-colors hover:border-orange-bright"
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3>
                  {s.name} in {location.name}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed opacity-80">
                  {s.tagline}
                </p>
                <span className="mt-4 block text-[13px] font-bold uppercase tracking-[0.12em] text-orange-bright">
                  See more →
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-12 kick opacity-55">
            All services we offer in {location.name}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" data-testid="location-all-services">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}/`}
                  data-testid={`location-service-chip-${s.slug}`}
                  className="inline-block border border-cream/35 px-3 py-2 text-xs font-semibold no-underline transition-colors hover:border-orange-bright hover:text-orange-bright"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Price band ─────────────────────────────────────── */}
      <PriceStrip
        note={`These are the same bands we quote in ${location.name} — the town doesn't change the price, the load, the stairs and the date do.`}
        testId={`location-price-${location.slug}`}
      />

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section
        className="band band--cream"
        aria-labelledby="location-faq-heading"
        data-testid="location-faq-section"
      >
        <div className="wrap">
          <div className="bh rv">
            <h2 id="location-faq-heading">
              {location.name} movers, answered honestly
            </h2>
            <p>Local specifics — parking, stairs, buildings and what it costs.</p>
          </div>
          <div className="faq rv max-w-[900px]">
            {location.faqs.map((item, i) => (
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

      {/* ── Nearby towns ───────────────────────────────────── */}
      <section
        className="band band--orange band--tight"
        data-testid="location-nearby-section"
      >
        <div className="wrap">
          <div className="bh rv">
            <h2 className="text-[clamp(26px,3.2vw,44px)]">
              Also moving near {location.name}?
            </h2>
            <p>These are the towns we run alongside it most weekends.</p>
          </div>
          <div
            className="rv flex flex-wrap items-baseline gap-x-4 gap-y-2 font-display text-[clamp(20px,2.8vw,36px)] uppercase leading-[1.15] tracking-[-0.03em]"
            data-testid="location-nearby-list"
          >
            {nearby.map((t, i) => (
              <React.Fragment key={t.slug}>
                {i > 0 && (
                  <span className="text-cream/45" aria-hidden="true">
                    ·
                  </span>
                )}
                <Link
                  to={`/movers/${t.slug}/`}
                  data-testid={`nearby-town-${t.slug}`}
                  className="no-underline transition-colors hover:text-ink"
                >
                  {t.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews sectionId={`reviews-${location.slug}`} />

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section
        className="band band--black"
        data-testid="location-final-cta"
      >
        <div className="wrap">
          <span className="kick text-orange-bright">
            Ready in {location.name}?
          </span>
          <h2 className="mt-4">Get your {location.name} moving quote.</h2>
          <p className="mt-5 max-w-[46ch] text-[clamp(16px,1.6vw,19px)] text-cream/80">
            Free, all-in, no BS. Response in {siteConfig.contact.responseTime}.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
            <TallyPopupButton testId="location-final-quote-btn" showConsent>
              Get my free quote
            </TallyPopupButton>
            <a
              href={`tel:${siteConfig.contact.phoneTel}`}
              data-testid="location-final-phone-link"
              className="sbtn sbtn--ghost"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
          <a
            href={`sms:${siteConfig.contact.phoneTel}`}
            data-testid="location-final-sms-link"
            className="mt-6 inline-block text-sm font-bold uppercase tracking-[0.12em] text-orange-bright underline underline-offset-4"
          >
            Or text us — same-day OK →
          </a>
        </div>
      </section>
    </>
  );
}
