import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Truck,
  Zap,
  CalendarDays,
  Home,
  Building2,
  PackageOpen,
  Briefcase,
  Box,
  Music,
  HardHat,
} from "lucide-react";
import TallyPopupButton from "../components/site/TallyPopupButton";
import FAQAccordion from "../components/site/FAQAccordion";
import GoogleReviews from "../components/site/GoogleReviews";
import siteConfig from "../data/siteConfig";
import { getLocationBySlug, locations } from "../data/locations";
import { services } from "../data/services";
import { buildLocationJsonLd, buildFaqJsonLd } from "../lib/seo";
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

export default function LocationPage() {
  const { slug } = useParams();
  const location = getLocationBySlug(slug);

  if (!location) return <NotFound />;

  const canonical = `${siteConfig.business.baseUrl}/movers/${location.slug}`;
  const ogImage = `${siteConfig.business.baseUrl}${siteConfig.branding.ogImagePath}`;

  const locationLd = buildLocationJsonLd(location);
  const faqLd = buildFaqJsonLd(location.faqs);

  const nearby = location.nearbyTowns
    .map((t) => locations.find((x) => x.slug === t))
    .filter(Boolean);
  const highlighted = location.serviceHighlights
    .map((s) => services.find((x) => x.slug === s))
    .filter(Boolean);
  const allServices = services;

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
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <Link
              to="/#locations"
              data-testid="location-back-link"
              className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-orange transition-colors hover:text-orange-hover"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
              All locations
            </Link>

            <p className="mt-6 inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy">
              <MapPin className="h-4 w-4 text-orange" strokeWidth={2.4} />
              {location.name}, NJ · {siteConfig.business.serviceArea}
            </p>

            <h1
              className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-5xl lg:text-6xl"
              data-testid="location-h1"
            >
              {location.h1}
            </h1>

            <p className="mt-5 max-w-2xl font-display text-lg font-semibold text-orange">
              {location.kicker}
            </p>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
              {location.intro.map((para, i) => (
                <p key={i} data-testid={`location-intro-para-${i}`}>
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TallyPopupButton testId="location-hero-quote-btn" size="lg" showConsent>
                Get My Free Quote
              </TallyPopupButton>
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                data-testid="location-hero-phone-link"
                className="inline-flex items-center gap-2 px-2 py-3 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:text-orange"
              >
                <Phone className="h-4 w-4" strokeWidth={2.4} />
                Or call {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Local touch panel + trust signals */}
          <div className="lg:col-span-5">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
                What we know about moving in {location.name}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {location.localTouch}
              </p>
              <ul className="mt-6 space-y-3">
                <TrustPill icon={ShieldCheck} label="Licensed & insured in NJ" />
                <TrustPill icon={Truck} label="5 insured 26-ft trucks" />
                <TrustPill icon={CalendarDays} label="7 days a week" />
                <TrustPill icon={Zap} label="Response in under 5 minutes" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services offered in this town ───────────────────── */}
      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              In {location.name}, we offer
            </p>
            <h2
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl"
              data-testid="location-services-heading"
            >
              Moving services in {location.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Every service on our menu is available for jobs in {location.name}.
              Start with the ones we handle most often here:
            </p>
          </div>

          {/* Highlighted services (bigger cards) */}
          <ul
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="location-highlighted-services"
          >
            {highlighted.map((s) => {
              const Icon = ICON_MAP[s.iconName] || Truck;
              return (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    data-testid={`location-service-${s.slug}`}
                    className="group flex h-full flex-col justify-between rounded-md border border-slate-200 bg-white p-6 transition-colors hover:border-orange"
                  >
                    <div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white">
                        <Icon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-navy">
                        {s.name} in {location.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {s.tagline}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-widest text-orange">
                      Learn more
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={2.4}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Full service list (dense) */}
          <p className="mt-14 font-display text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
            All services we offer in {location.name}
          </p>
          <ul
            className="mt-4 flex flex-wrap gap-2"
            data-testid="location-all-services"
          >
            {allServices.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  data-testid={`location-service-chip-${s.slug}`}
                  className="inline-flex items-center gap-1 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-orange hover:text-orange"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section
        className="border-b border-slate-200 bg-white py-20 sm:py-24"
        aria-labelledby="location-faq-heading"
        data-testid="location-faq-section"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
            FAQ
          </p>
          <h2
            id="location-faq-heading"
            className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-4xl"
          >
            {location.name} movers, answered honestly.
          </h2>
          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {location.faqs.map((item, i) => (
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

      {/* ── Nearby towns ────────────────────────────────────── */}
      <section
        className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
        data-testid="location-nearby-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
              Nearby towns we serve
            </p>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Also moving near {location.name}?
            </h2>
          </div>
          <ul
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            data-testid="location-nearby-list"
          >
            {nearby.map((t) => (
              <li key={t.slug}>
                <Link
                  to={`/movers/${t.slug}`}
                  data-testid={`nearby-town-${t.slug}`}
                  className="group flex h-full items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-4 transition-colors hover:border-orange"
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 group-hover:text-orange">
                      Movers in
                    </p>
                    <p className="mt-1 font-display text-sm font-bold tracking-tight text-navy">
                      {t.name}, NJ
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
      </section>

      {/* ── Google Reviews ─────────────────────────────────── */}
      <GoogleReviews sectionId={`reviews-${location.slug}`} />

      {/* ── Final CTA band ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-navy py-20 text-white grain-overlay sm:py-24"
        data-testid="location-final-cta"
      >
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-orange">
            Ready in {location.name}?
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl">
            Get your {location.name} moving quote.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Free, all-in, no BS. Response in under 5 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TallyPopupButton
              testId="location-final-quote-btn"
              size="lg"
              className="w-full sm:w-auto"
              showConsent
            >
              Get My Free Quote
            </TallyPopupButton>
            <a
              href={`tel:${siteConfig.contact.phoneTel}`}
              data-testid="location-final-phone-link"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-white/20 bg-white/5 px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-4 w-4" strokeWidth={2.4} />
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
          <a
            href={`sms:${siteConfig.contact.phoneTel}`}
            data-testid="location-final-sms-link"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-orange"
          >
            <MessageSquare className="h-4 w-4" strokeWidth={2.4} />
            Or text us — same-day OK
          </a>
        </div>
      </section>
    </>
  );
}

function TrustPill({ icon: Icon, label }) {
  return (
    <li className="flex items-center gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-orange text-white">
        <Icon className="h-4 w-4" strokeWidth={2.4} />
      </span>
      <span className="font-display text-sm font-bold text-navy">{label}</span>
    </li>
  );
}
