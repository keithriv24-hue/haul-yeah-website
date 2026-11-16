import React, { useState } from "react";
import { ArrowRight, Clock3, MapPin, ShieldCheck } from "lucide-react";
import siteConfig from "../data/siteConfig";
import careersConfig from "../data/careersConfig";

/**
 * /careers — weekend crew hiring.
 *
 * Important: The customer quote form is NOT an employment application.
 * Only a separate published form ID in careersConfig.tallyFormId can enable
 * submissions here. The iframe mounts only on applicant action, so the site's
 * static prerender script cannot accidentally bake in Tally runtime markup.
 */
export default function Careers() {
  const [showForm, setShowForm] = useState(false);
  const formId = careersConfig.tallyFormId.trim();
  const formReady = /^[a-zA-Z0-9]+$/.test(formId) && formId !== siteConfig.tally.formId;
  const publishedFormUrl = formReady ? "https://tally.so/r/" + formId : "";
  const embedFormUrl = formReady
    ? "https://tally.so/embed/" + formId + "?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
    : "";

  return (
    <>
      <title>Weekend Moving Jobs | Careers at Haul Yeah Moving</title>
      <meta name="description" content="Join Haul Yeah Moving in New Jersey. Weekend moving helper roles pay $25/hr, drivers $28/hr, and qualified team leads earn $3/hr extra. Learn about the crew and apply." />
      <link rel="canonical" href={siteConfig.business.baseUrl + "/careers/"} />
      <meta property="og:title" content="Join the Haul Yeah Crew | Weekend Moving Jobs" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteConfig.business.baseUrl + "/careers/"} />
      <meta property="og:image" content={siteConfig.business.baseUrl + siteConfig.branding.ogImagePath} />

      <section className="bg-cream pb-[clamp(60px,7vw,100px)] pt-[clamp(38px,5vw,70px)]" data-testid="careers-hero">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <span className="kick text-orange">Now recruiting · Saturday & Sunday</span>
            <h1 className="mt-5">Good crew.<br /><span className="text-orange">Good work.</span></h1>
            <p className="mt-6 max-w-[55ch] text-[clamp(17px,1.8vw,21px)] leading-relaxed">
              We are building a dependable weekend moving crew in New Jersey. If you know how to work hard, move carefully, and look out for your team, we'd like to hear from you.
            </p>
            <p className="mt-4 max-w-[55ch] text-base opacity-80">Open roles: moving helpers, experienced non-CDL box-truck drivers, and team leads.</p>
            <a className="sbtn sbtn--orange mt-8" href="#positions">View open roles <ArrowRight size={20} aria-hidden="true" /></a>
          </div>
          <div className="border-2 border-ink bg-ink shadow-sign-ink">
            <img src="/images/crew-group-trucks.webp" width="1280" height="940" alt="Haul Yeah Moving crew with their box trucks in New Jersey" className="aspect-[5/4] w-full object-cover" loading="eager" />
            <div className="flex flex-wrap justify-between gap-2 border-t-4 border-orange-bright px-5 py-4 text-cream">
              <span className="kick">Haul Yeah Moving</span>
              <span className="kick text-orange-bright">Weekend crew</span>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--black band--tight" aria-label="Job highlights">
        <div className="wrap grid gap-7 sm:grid-cols-3">
          <div className="flex items-start gap-3"><Clock3 className="mt-1 shrink-0 text-orange-bright" aria-hidden="true" /><div><h3>Weekends only</h3><p className="mt-2 text-sm opacity-80">Saturday and Sunday shifts currently.</p></div></div>
          <div className="flex items-start gap-3"><MapPin className="mt-1 shrink-0 text-orange-bright" aria-hidden="true" /><div><h3>Elizabeth, NJ</h3><p className="mt-2 text-sm opacity-80">Truck jobs start at our Elizabeth lot. Labor-only jobs start on site.</p></div></div>
          <div className="flex items-start gap-3"><ShieldCheck className="mt-1 shrink-0 text-orange-bright" aria-hidden="true" /><div><h3>Clear hourly pay</h3><p className="mt-2 text-sm opacity-80">Fixed rates displayed below, with a qualification-based lead premium.</p></div></div>
        </div>
      </section>

      <section className="band band--cream2" id="positions" data-testid="careers-positions">
        <div className="wrap">
          <div className="bh"><h2>Find your spot.</h2><p>Three ways to join. One standard: show up, work safely, and take care of the customer's belongings.</p></div>
          <div className="grid gap-5 lg:grid-cols-3">
            {careersConfig.roles.map((role, index) => (
              <article key={role.shortTitle} className="flex flex-col border-2 border-ink bg-cream p-6 shadow-sign-ink sm:p-8">
                <span className="kick text-orange">Position 0{index + 1}</span>
                <h3 className="mt-4 text-[clamp(24px,2.3vw,32px)]">{role.title}</h3>
                <div className="mt-6 flex items-end gap-2 border-b-2 border-ink pb-5"><strong className="font-display text-[clamp(45px,4vw,66px)] leading-none tracking-[-0.05em]">{role.pay}</strong><span className="pb-2 text-sm font-bold uppercase tracking-[0.12em]">/ hour</span></div>
                <p className="mt-5 min-h-[3.6em] text-base">{role.description}</p>
                <h4 className="mt-6">What you'll do / need</h4>
                <ul className="mt-3 flex-1 space-y-3 text-[15px] leading-relaxed">
                  {role.expectations.map((item) => <li key={item} className="flex gap-2"><span className="mt-1 text-orange" aria-hidden="true">✓</span><span>{item}</span></li>)}
                </ul>
                <a href="#apply" className="sbtn sbtn--orange sbtn--sm mt-8">Apply for this role <ArrowRight size={17} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm opacity-75">Team lead pay is the qualified base hourly rate plus $3/hr: $25 + $3 as a helper lead or $28 + $3 as a driver lead. Driver-qualified team leads must meet our driver requirements.</p>
        </div>
      </section>

      <section className="band band--cream" data-testid="careers-reporting">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div><span className="kick text-orange">Before your first shift</span><h2 className="mt-4">Know where to show up.</h2><p className="mt-5 max-w-[55ch] text-base leading-relaxed">Right now, our moving shifts run on Saturdays and Sundays. We may expand the schedule as the business grows, but we are recruiting for weekend work only at this time.</p></div>
          <div className="space-y-4">
            <div className="border-l-[6px] border-orange bg-cream-deep p-6"><h3>Moves using a truck</h3><p className="mt-3 text-base">Report to our truck parking lot in Elizabeth, New Jersey, before each assigned job. The exact address and instructions are shared privately when you're selected for a shift.</p></div>
            <div className="border-l-[6px] border-ink bg-cream-deep p-6"><h3>Labor-only moves</h3><p className="mt-3 text-base">When the customer supplies the truck or only needs labor, report directly to the move location provided for that shift.</p></div>
          </div>
        </div>
      </section>

      <section className="band band--black" id="apply" data-testid="careers-apply">
        <div className="wrap max-w-[1050px]">
          <span className="kick text-orange-bright">Become part of the crew</span>
          <h2 className="mt-4">Your next move starts here.</h2>
          <p className="mt-5 max-w-[67ch] text-lg opacity-85">Tell us how to contact you, the position you want, and when you're available on weekends. A résumé, references, and details about past experience are welcome but optional.</p>
          <div className="mt-8 border-2 border-cream/30 bg-ink-soft p-5 sm:p-8">
            {formReady ? (
              <>
                {!showForm ? (
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div><h3>Weekend crew application</h3><p className="mt-2 max-w-[51ch] text-base opacity-80">A short application for helpers, drivers, and team leads. Choose your preferred position inside the form.</p></div>
                    <div className="flex flex-wrap items-center gap-4">
                      <button type="button" className="sbtn sbtn--orange" onClick={() => setShowForm(true)}>Start application <ArrowRight size={20} aria-hidden="true" /></button>
                      <a href={publishedFormUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold underline underline-offset-4">Or open in a new tab</a>
                    </div>
                  </div>
                ) : (
                  <div><h3>Weekend crew application</h3><iframe title="Haul Yeah Moving weekend crew job application" src={embedFormUrl} className="mt-6 w-full border-0 bg-cream" style={{ minHeight: 900 }} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
                    <p className="mt-5 text-sm opacity-80">Form not showing? <a href={publishedFormUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Open the application in a new tab.</a></p>
                  </div>
                )}
              </>
            ) : (
              <div role="status"><h3>Applications opening here soon</h3><p className="mt-3 max-w-[70ch] text-base opacity-85">We're finishing our secure application form. Please check back for the online application. This page will show the application once it's ready.</p></div>
            )}
          </div>
        </div>
      </section>

      <section className="band band--cream2" data-testid="careers-faq">
        <div className="wrap max-w-[1000px]">
          <div className="bh"><h2>Quick answers.</h2><p>The basics before you apply.</p></div>
          <div className="faq">
            <details><summary>Is this a weekday job?</summary><p>No. We are recruiting for Saturday and Sunday shifts at this time. That may change as the company grows.</p></details>
            <details><summary>Where do I meet the crew?</summary><p>For truck moves, you meet at our parking lot in Elizabeth, NJ. We'll share the exact address if you're selected for a shift. For labor-only moves, you meet at the job site.</p></details>
            <details><summary>Do I need a CDL to drive?</summary><p>These are non-CDL box-truck positions. Previous box-truck driving experience, a valid driver's license, and a clean driving record are required.</p></details>
            <details><summary>How does team lead pay work?</summary><p>Team leads earn an additional $3/hour on top of the base role they're qualified to perform: $28/hour as a helper lead or $31/hour as a driver lead.</p></details>
            <details><summary>Is a résumé required?</summary><p>No. You may attach a résumé, provide references, or describe previous experience if you'd like, but those materials are optional.</p></details>
          </div>
        </div>
      </section>
    </>
  );
}
