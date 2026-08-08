import React from "react";
import { Link, useParams, useLocation as useRouterLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Phone,
  MessageSquare,
  MapPin,
  Home,
  Building2,
  PackageOpen,
  Zap,
  CalendarDays,
  Truck,
  Briefcase,
  Box,
  Music,
  HardHat,
} from "lucide-react";
import TallyPopupButton from "../components/site/TallyPopupButton";
import FAQAccordion from "../components/site/FAQAccordion";
import GoogleReviews from "../components/site/GoogleReviews";
import siteConfig from "../data/siteConfig";
import { getServiceBySlug, services } from "../data/services";
import { getLocationBySlug, locations } from "../data/locations";
import { buildServiceJsonLd, buildFaqJsonLd } from "../lib/seo";
import NotFound from "./NotFound";

const ICON_MAP = {
  Home,
  Building2,
  PackageOpen,
  Zap,
  CalendarDays,
  Truck,
  Briefcase,
  Box,
  Music,
  HardHat,
};

export default function ServicePage() {
  const { slug } = useParams();
  useRouterLocation(); // ensure re-render on nav
  const service = getServiceBySlug(slug);

  if (!service) return <NotFound />;

  const Icon = ICON_MAP[service.iconName] || Truck;
  const canonical = `${siteConfig.business.baseUrl}/services/${service.slug}`;
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

      {/* ── Page hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <Link
              to="/#services"
              data-testid="service-back-link"
              className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-orange transition-colors hover:text-orange-hover"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
              All services
            </Link>

            <div className="mt-6 inline-flex items-center gap-3 rounded-sm border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-orange text-white">
                <Icon className="h-3.5 w-3.5" strokeWidth={2.6} />
              </span>
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-navy">
                {service.kicker}
              </span>
            </div>

            <h1
              className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-6xl"
              data-testid="service-h1"
            >
              {service.h1}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
              {service.lede}
            </p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600">
              {service.intro.map((para, i) => (
                <p key={i} data-testid={`service-intro-para-${i}`}>
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TallyPopupButton testId="service-hero-quote-btn" size="lg" showConsent>
                Get My Free Quote
              </TallyPopupButton>
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                data-testid="service-hero-phone-link"
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
                src={service.image.url}
                alt={service.image.alt}
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/3] w-full rounded-md border border-slate-200 object-cover shadow-lg"
                data-testid="service-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Included / benefits ──────────────────────────────── */}
      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              What's included
            </p>
            <h2
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl"
              data-testid="service-included-heading"
            >
              {service.included.heading}
            </h2>
          </div>

          <ul
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="service-included-list"
          >
            {service.included.items.map((item, i) => (
              <li
                key={item.title}
                className="rounded-md border border-slate-200 bg-white p-6"
                data-testid={`service-included-${i}`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-orange text-white">
                  <Check className="h-4 w-4" strokeWidth={2.6} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Mid-page CTA ─────────────────────────────────────── */}
      <MidCTA
        heading={service.midCTA.heading}
        body={service.midCTA.body}
        testId="service-mid-cta"
      />

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section
        className="border-b border-slate-200 bg-white py-20 sm:py-24"
        aria-labelledby="service-faq-heading"
        data-testid="service-faq-section"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
            FAQ
          </p>
          <h2
            id="service-faq-heading"
            className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl"
          >
            {service.name}, answered honestly.
          </h2>
          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {service.faqs.map((item, i) => (
              <FAQAccordion
                key={item.q}
                question={item.q}
                answer={item.a}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Related services + towns ─────────────────────────── */}
      <section
        className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24"
        data-testid="service-related-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
                Related services
              </p>
              <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-navy sm:text-3xl">
                Bundle with other Haul Yeah services.
              </h2>
              <ul className="mt-8 space-y-3" data-testid="related-services-list">
                {relatedServices.map((rs) => {
                  const RIcon = ICON_MAP[rs.iconName] || Truck;
                  return (
                    <li key={rs.slug}>
                      <Link
                        to={`/services/${rs.slug}`}
                        data-testid={`related-service-${rs.slug}`}
                        className="group flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-white px-5 py-4 transition-colors hover:border-orange"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white">
                            <RIcon className="h-4 w-4" strokeWidth={2.4} />
                          </span>
                          <div>
                            <p className="font-display text-base font-bold tracking-tight text-navy">
                              {rs.name}
                            </p>
                            <p className="text-xs text-slate-500">{rs.tagline}</p>
                          </div>
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange"
                          strokeWidth={2.4}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
                Towns we service
              </p>
              <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-navy sm:text-3xl">
                Doing this in {relatedTowns[0]?.name || "Essex County"}?
              </h2>
              <ul
                className="mt-8 grid grid-cols-2 gap-3"
                data-testid="related-towns-list"
              >
                {relatedTowns.map((rt) => (
                  <li key={rt.slug}>
                    <Link
                      to={`/movers/${rt.slug}`}
                      data-testid={`related-town-${rt.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-orange"
                    >
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 group-hover:text-orange">
                          Movers in
                        </p>
                        <p className="mt-1 font-display text-sm font-bold tracking-tight text-navy">
                          {rt.name}, NJ
                        </p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-orange"
                        strokeWidth={2.4}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Reviews ───────────────────────────────────── */}
      <GoogleReviews sectionId={`reviews-service-${service.slug}`} />

      {/* ── Final CTA ────────────────────────────────────────── */}
      <MidCTA
        heading={`Ready for ${service.name.toLowerCase()}?`}
        body="Free quote in under 5 minutes. Call, text, or hit the form."
        variant="navy"
        testId="service-final-cta"
      />
    </>
  );
}

/** Reusable CTA block. */
function MidCTA({ heading, body, variant = "light", testId }) {
  const isNavy = variant === "navy";
  return (
    <section
      className={
        (isNavy
          ? "grain-overlay bg-navy text-white "
          : "border-b border-slate-200 bg-white ") +
        "py-16 sm:py-20"
      }
      data-testid={testId}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8">
        <div className="max-w-2xl">
          <h2
            className={
              (isNavy ? "text-white " : "text-navy ") +
              "font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
            }
          >
            {heading}
          </h2>
          <p
            className={
              (isNavy ? "text-slate-300 " : "text-slate-600 ") +
              "mt-3 max-w-xl text-base leading-relaxed"
            }
          >
            {body}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <TallyPopupButton
            testId={`${testId}-quote-btn`}
            size="lg"
          >
            Get My Free Quote
          </TallyPopupButton>
          <a
            href={`sms:${siteConfig.contact.phoneTel}`}
            data-testid={`${testId}-sms-link`}
            className={
              (isNavy
                ? "text-slate-200 border-white/20 hover:border-white "
                : "text-navy border-navy/20 hover:border-orange hover:text-orange ") +
              "inline-flex items-center justify-center gap-2 rounded-sm border-2 px-5 py-4 font-display text-sm font-bold uppercase tracking-wide transition-colors"
            }
          >
            <MessageSquare className="h-4 w-4" strokeWidth={2.4} />
            Text us
          </a>
        </div>
      </div>
    </section>
  );
}
