import React from "react";
import { Link, useParams, useLocation as useRouterLocation } from "react-router-dom";
import TallyPopupButton from "../components/site/TallyPopupButton";
import FAQAccordion from "../components/site/FAQAccordion";
import GoogleReviews from "../components/site/GoogleReviews";
import MidCTA from "../components/site/MidCTA";
import PriceStrip from "../components/site/PriceStrip";
import siteConfig from "../data/siteConfig";
import { getServiceBySlug, services } from "../data/services";
import { getLocationBySlug, locations } from "../data/locations";
import { buildServiceJsonLd, buildFaqJsonLd } from "../lib/seo";
import useReveal from "../lib/useReveal";
import NotFound from "./NotFound";

/**
 * Service page template — drives all nine /services/* pages.
 *
 * Band order is deliberate and matches the homepage so a visitor who lands
 * here from an ad sees the same company: hero → what's included → PRICE →
 * mid CTA → FAQ → related links → reviews → final CTA.
 *
 * The price strip is new. Every service page previously talked about value
 * and "all-in pricing" without ever showing a number, which pushed the entire
 * price conversation onto the phone call. Showing the band here means the
 * call starts at "which package" instead of "what does it cost".
 */
export default function ServicePage() {
  const { slug } = useParams();
  useRouterLocation(); // ensure re-render on nav
  const service = getServiceBySlug(slug);
  useReveal([slug]);

  if (!service) return <NotFound />;

  const canonical = `${siteConfig.business.baseUrl}/services/${service.slug}/`;
  const ogImage = `${siteConfig.business.baseUrl}${siteConfig.branding.ogImagePath}`;

  const serviceLd = buildServiceJsonLd(service);
  const faqLd = buildFaqJsonLd(service.faqs);

  const relatedServices = service.relatedServices
    .map((s) => services.find((x) => x.slug === s))
    .filter(Boolean);
  const relatedTowns = service.relatedTowns
    .map((t) => locations.find((x) => x.slug === t))
    .filter(Boolean);

  return (
    <>
      <title>{service.seo.title}</title>
      <meta name="description" content={service.seo.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={service.seo.title} />
      <meta property="og:description" content={service.seo.description} />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-cream pb-[clamp(30px,4vw,56px)] pt-[clamp(26px,3.4vw,48px)]">
        <div className="wrap">
          <Link
            to="/#services"
            data-testid="service-back-link"
            className="kick text-orange no-underline"
          >
            ← All services
          </Link>

          <div className="mt-6 grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="kick block opacity-60">{service.kicker}</span>
              <h1 className="mt-3" data-testid="service-h1">
                {service.h1}
              </h1>
              <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed opacity-85">
                {service.lede}
              </p>

              <div className="prose-hy mt-7 max-w-[62ch]">
                {service.intro.map((para, i) => (
                  <p key={i} data-testid={`service-intro-para-${i}`}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
                <TallyPopupButton testId="service-hero-quote-btn" showConsent>
                  Get my free quote
                </TallyPopupButton>
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  data-testid="service-hero-phone-link"
                  className="sbtn sbtn--ghost border-ink text-ink"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="self-start border-2 border-ink shadow-sign-ink">
              <img
                src={service.image.url}
                alt={service.image.alt}
                width="1200"
                height="900"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
                data-testid="service-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── What's included ───────────────────────────────────── */}
      <section className="band band--black" data-testid="service-included-section">
        <div className="wrap">
          <div className="bh rv">
            <h2 data-testid="service-included-heading">
              {service.included.heading}
            </h2>
            <p>Everything below is in the price we quote you — not an upsell.</p>
          </div>

          <div className="grid3 rv" data-testid="service-included-list">
            {service.included.items.map((item, i) => (
              <div key={item.title} data-testid={`service-included-${i}`}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed opacity-80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price band ────────────────────────────────────────── */}
      <PriceStrip
        note={service.priceNote}
        testId={`service-price-${service.slug}`}
      />

      <MidCTA
        heading={service.midCTA.heading}
        body={service.midCTA.body}
        testId="service-mid-cta"
      />

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section
        className="band band--cream2"
        aria-labelledby="service-faq-heading"
        data-testid="service-faq-section"
      >
        <div className="wrap">
          <div className="bh rv">
            <h2 id="service-faq-heading">{service.name}, answered honestly</h2>
            <p>The questions we get on the phone, with the numbers attached.</p>
          </div>
          <div className="faq rv max-w-[900px]">
            {service.faqs.map((item, i) => (
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

      {/* ── Related services + towns ─────────────────────────── */}
      <section className="band band--cream" data-testid="service-related-section">
        <div className="wrap grid gap-[clamp(34px,4vw,64px)] lg:grid-cols-2">
          <div className="rv">
            <span className="kick text-orange">Related services</span>
            <h2 className="mt-3 text-[clamp(26px,3vw,42px)]">
              Bundle it with
            </h2>
            <ul className="mt-6" data-testid="related-services-list">
              {relatedServices.map((rs) => (
                <li key={rs.slug} className="border-t-2 border-ink last:border-b-2">
                  <Link
                    to={`/services/${rs.slug}/`}
                    data-testid={`related-service-${rs.slug}`}
                    className="flex items-center justify-between gap-4 py-4 no-underline transition-colors hover:text-orange"
                  >
                    <span>
                      <b className="block font-display text-[17px] uppercase tracking-[-0.02em]">
                        {rs.name}
                      </b>
                      <span className="text-sm opacity-65">{rs.tagline}</span>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rv">
            <span className="kick text-orange">Towns we service</span>
            <h2 className="mt-3 text-[clamp(26px,3vw,42px)]">
              Doing this in {relatedTowns[0]?.name || "Essex County"}?
            </h2>
            <ul className="mt-6" data-testid="related-towns-list">
              {relatedTowns.map((rt) => (
                <li key={rt.slug} className="border-t-2 border-ink last:border-b-2">
                  <Link
                    to={`/movers/${rt.slug}/`}
                    data-testid={`related-town-${rt.slug}`}
                    className="flex items-center justify-between gap-4 py-4 no-underline transition-colors hover:text-orange"
                  >
                    <b className="font-display text-[17px] uppercase tracking-[-0.02em]">
                      Movers in {rt.name}, NJ
                    </b>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <GoogleReviews sectionId={`reviews-service-${service.slug}`} />

      <MidCTA
        heading={`Ready for ${service.name.toLowerCase()}?`}
        body="Free quote in under 5 minutes. Call, text, or hit the form."
        variant="ink"
        testId="service-final-cta"
      />
    </>
  );
}
