"use client";

import { Download } from "lucide-react";

import { ASSETS } from "@/lib/assets";
import { PRICING, PROJECTS, type ProjectSlug } from "@/lib/antera-data";
import { AmenitiesSection } from "./amenities-section";
import { FaqSection } from "./faq-section";
import { GallerySection } from "./gallery-section";
import { InfrastructureSection } from "./infrastructure-section";
import { LocationAdvantage } from "./location-advantage";
import { MasterPlanSection } from "./master-plan-section";
import { Reveal } from "./motion-primitives";
import { PricingSection } from "./pricing-section";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { SiteVisitSection } from "./site-visit-section";
import { CtaLink, Eyebrow, Section, StatBlock } from "./ui";

const DOCS: Record<ProjectSlug, { label: string; href: string }[]> = {
  "avatar-2": [
    { label: "Avatar 2 Presentation", href: ASSETS.docs.avatar2Deck },
    { label: "Avatar 2 Price Structure", href: ASSETS.docs.avatar2Price },
  ],
  "marvel-smart-city": [{ label: "Marvel Smart City Brochure", href: ASSETS.docs.marvelBrochure }],
  "magnus-smart-city": [
    { label: "Magnus Smart City E-Brochure", href: ASSETS.docs.magnusBrochure },
    { label: "Telangana RERA Certificate", href: ASSETS.docs.magnusRera },
  ],
};

export function ProjectPage({ slug }: { slug: ProjectSlug }) {
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return null;
  const docs = DOCS[slug];
  const isAvatar = slug === "avatar-2";

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative overflow-hidden bg-primary px-6 pb-24 pt-36 text-primary-foreground">
        <img
          src={project.image}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="hairline-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
          <Eyebrow tone="dark">{project.eyebrow}</Eyebrow>
          <h1 className="big-title max-w-3xl">{project.name}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
            {project.tagline}
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-x-8 gap-y-4">
            <span className="display-title text-4xl sm:text-5xl">{project.price}</span>
            <span className="rounded-full border border-accent px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">
              {project.stage}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <CtaLink href="#site-visit" variant="accent" arrow>
              Book a Site Visit
            </CtaLink>
            <CtaLink href={project.brochure} variant="ghost-dark" download>
              Download Brochure
            </CtaLink>
          </div>
        </div>
      </section>

      <Section tone="light">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.facts.map((fact) => (
            <StatBlock key={fact.label} value={fact.value} label={fact.label} />
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Eyebrow>About the project</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title max-w-xl">{project.type} designed around tomorrow.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.overview}
              </p>
            </Reveal>
          </div>

          <div className="flex h-fit flex-col gap-3 rounded-3xl border border-border bg-card p-7">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
              Highlights
            </span>
            {project.highlights.map((item, i) => (
              <p
                key={item}
                className={
                  i === project.highlights.length - 1
                    ? "text-sm text-foreground/80"
                    : "border-b border-border pb-3 text-sm text-foreground/80"
                }
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {isAvatar ? <MasterPlanSection /> : null}
      <AmenitiesSection />
      <InfrastructureSection />
      <LocationAdvantage />
      <GallerySection />

      <Section id="documents" tone="dark">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow tone="dark">Approvals &amp; Documents</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="big-title max-w-2xl">
              Confidence Starts
              <span className="block text-accent">With Documentation.</span>
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {docs.map((doc) => (
            <a
              key={doc.label}
              href={doc.href}
              download=""
              className="flex items-center justify-between gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 transition-colors hover:border-accent"
            >
              <span className="display-title text-lg">{doc.label}</span>
              <Download className="h-5 w-5 shrink-0 text-accent" />
            </a>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-primary-foreground/50">
          Buyers should independently verify applicable approvals, title documents, registration
          details and legal documentation before purchase.
        </p>
      </Section>

      {isAvatar ? (
        <PricingSection />
      ) : (
        <Section id="pricing" tone="cream">
          <div className="flex flex-col gap-5">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="big-title max-w-2xl">{project.price}</h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Current pricing is provided by the sales team and is subject to availability and
              change. Reference pricing for Avatar 2 phases is {PRICING[0].price} and{" "}
              {PRICING[1].price} per sq. yard.
            </p>
            <CtaLink href="#site-visit" variant="accent" className="w-fit">
              Check Availability
            </CtaLink>
          </div>
        </Section>
      )}

      <FaqSection />
      <SiteVisitSection />
      <SiteFooter />
    </main>
  );
}