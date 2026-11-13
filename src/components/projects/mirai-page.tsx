"use client";

import { ContourBackground } from "@/components/site/contour-background";
import {
  ArrowUpRight,
  Baby,
  Bike,
  Compass,
  Droplets,
  ExternalLink,
  Landmark,
  MapPin,
  Maximize2,
  Route as RouteIcon,
  Users,
  type LucideIcon,
} from "lucide-react";

import { FaqSection, type Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";
import { FloatingWhatsApp, WhatsAppIcon } from "@/components/site/floating-whatsapp";
import { MaskReveal, Reveal, SectionHeading } from "@/components/site/motion-primitives";
import {
  ApprovalCard,
  GalleryGrid,
  PriceCardView,
  useLightbox,
} from "@/components/site/project-blocks";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { buttonClass } from "@/components/site/ui";
import { MIRAI, WA_MESSAGES, formatINR, whatsappLink, type Media } from "@/lib/projects";
import { FactStrip, ProjectHero, SectionNav } from "./shared";

const FEATURE_ICONS: LucideIcon[] = [Compass, RouteIcon, Baby, Droplets, Bike, Users, Landmark];

const FAQS: Faq[] = [
  {
    q: "Is Mirai RERA approved?",
    a: "Not yet. Mirai has received its HMDA layout permission (LP No. 2470/HMDA/SWDL/2026); its TG RERA registration is awaited. We will publish the registration number here once issued.",
  },
  {
    q: "What is the price of plots at Mirai?",
    a: "Per the Mirai price card dated 21 Mar 2026: residential block ₹14,999 per sq. yd. and commercial block ₹16,999 per sq. yd., plus facing and road-frontage premiums. Please confirm current pricing with our team.",
  },
  {
    q: "Is Mirai part of Magnus Smart City?",
    a: "No. Mirai is a separate, smaller plotted development by Antera Realty near Rameshwaram, Shadnagar, with its own approvals and pricing.",
  },
  {
    q: "How can I see available plots?",
    a: "Open the interactive digital layout to explore the plan plot by plot, then WhatsApp or call us to confirm availability and book a site visit.",
  },
];

export function MiraiPage() {
  const gallery = useLightbox(MIRAI.gallery as unknown as Media[]);
  const [hmda, rera] = MIRAI.approvals;

  return (
    <>
      <SiteNav />
      <main id="main" className="[--accent-mirai:var(--mirai)]">
        <ProjectHero
          image="/projects/mirai/hero-plan.webp"
          imageAlt="Mirai layout plan rendered as a blueprint"
          imagePosition="75% 45%"
          overlay="from-[oklch(0.17_0.03_210)] via-[oklch(0.17_0.03_210/0.7)] to-[oklch(0.17_0.03_210/0.35)]"
          logo="/projects/mirai/mirai-logo-light.png"
          logoAlt="Mirai by Antera Realty"
          eyebrow={
            <span className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> HMDA LP received
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> TG RERA awaited
              </span>
            </span>
          }
          title="Rooted in faith. Built for life."
          lede="An intimate 6.3-acre HMDA-approved plotted community by Antera Realty, about 400 m from the Rameshwaram temple near Shadnagar — on a 60 ft government road, inside the proposed RRR zone."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/#projects" },
            { label: "Mirai" },
          ]}
          aside={
            <FactStrip
              facts={[
                { value: "6.3 acres", label: "HMDA-approved extent" },
                { value: formatINR(14999), label: "Residential / sq. yd." },
                { value: "~400 m", label: "To Rameshwaram Temple" },
                { value: "60 ft", label: "Govt road frontage" },
              ]}
            />
          }
        >
          <a
            href={MIRAI.digitalLayoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("gold")}
          >
            Explore Interactive Digital Layout <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={whatsappLink(WA_MESSAGES.mirai)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("ghost-dark")}
          >
            <WhatsAppIcon className="h-4 w-4" /> Enquire About Mirai
          </a>
        </ProjectHero>

        <SectionNav
          items={[
            { id: "intro", label: "Introduction" },
            { id: "location", label: "Location" },
            { id: "approvals", label: "Approvals" },
            { id: "layout", label: "Layout" },
            { id: "pricing", label: "Pricing" },
            { id: "features", label: "Features" },
            { id: "gallery", label: "Gallery" },
            { id: "enquire", label: "Enquire" },
          ]}
          cta={
            <a
              href={MIRAI.digitalLayoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-mirai px-5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground"
            >
              Digital Layout <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          }
        />

        {/* Introduction */}
        <section id="intro" className="scroll-mt-36 bg-background py-24 sm:py-32">
          <div className="container-x grid items-center gap-14 lg:grid-cols-12">
            <div className="flex flex-col gap-8 lg:col-span-7">
              <SectionHeading
                eyebrow="Mirai by Antera Realty"
                title="A quieter address, close to the sacred."
              />
              <Reveal delay={0.1}>
                <p className="text-pretty text-lg leading-relaxed text-foreground/80">
                  {MIRAI.overview}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                  Mirai is an independent project — separate from Magnus Smart City — with its own
                  approvals, layout and price card.
                </p>
              </Reveal>
            </div>
            <MaskReveal className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] lg:col-span-5">
              <img
                src="/projects/mirai/lifestyle.webp"
                alt="Family walking along a tree-lined avenue — Mirai brochure lifestyle image"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/55 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.16em] text-primary-foreground backdrop-blur">
                Lifestyle image — representational
              </span>
            </MaskReveal>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="flex flex-col gap-8 lg:col-span-5">
              <SectionHeading
                eyebrow="Location & connectivity"
                title="Rameshwaram, Shadnagar."
                copy="Location highlights as stated in the Mirai project brochure. Distances are approximate."
              />
              <ul className="flex flex-col">
                {MIRAI.locationHighlights.map((h, i) => (
                  <Reveal key={h} delay={i * 0.04}>
                    <li className="flex gap-4 border-b border-foreground/10 py-4 text-[0.95rem] text-foreground/85">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mirai" /> {h}
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Reveal>
                <a
                  href={MIRAI.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("outline", "self-start")}
                >
                  Open in Google Maps <ExternalLink className="h-4 w-4" />
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-7">
              <button
                type="button"
                onClick={() => gallery.open("/projects/mirai/location-map.webp")}
                className="group relative block w-full overflow-hidden rounded-[2rem] border border-foreground/10 bg-card"
              >
                <img
                  src="/projects/mirai/location-map.webp"
                  alt="Mirai location map showing NH-44, RRR and nearby landmarks"
                  loading="lazy"
                  className="w-full transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 text-xs text-primary-foreground backdrop-blur">
                  <Maximize2 className="h-3.5 w-3.5" /> Brochure location map — not to scale
                </span>
              </button>
            </Reveal>
          </div>
        </section>

        {/* Approvals */}
        <section id="approvals" className="scroll-mt-36 bg-background py-24 sm:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Approval status"
                title="Clear about where things stand."
                copy="Mirai has received HMDA layout permission LP No. 2470/HMDA/SWDL/2026 for 6.3 acres. Its TG RERA registration has not yet been issued — we will publish the number here as soon as it is."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {[hmda, rera].map((a, i) =>
                a ? (
                  <Reveal key={a.label} delay={i * 0.08} className="h-full">
                    <ApprovalCard approval={a} scope="Mirai" />
                  </Reveal>
                ) : null,
              )}
            </div>
          </div>
        </section>

        {/* Layout */}
        <section
          id="layout"
          className="relative scroll-mt-36 overflow-hidden bg-[oklch(0.2_0.04_210)] py-24 text-primary-foreground sm:py-32"
        >
          <div aria-hidden className="grain pointer-events-none absolute inset-0" />
          <ContourBackground color="rgba(170,210,205,0.14)" accent="rgba(214,196,150,0.35)" />
          <div className="container-x relative flex flex-col gap-12">
            <SectionHeading
              tone="dark"
              eyebrow="Project layout"
              title="A Vastu-based plan, plot by plot."
              copy="A 40 ft spine road with 30 ft internal roads, a landscaped open area and dedicated social infrastructure — taken from the official Mirai layout plan."
              action={
                <a
                  href={MIRAI.digitalLayoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("gold")}
                >
                  Explore Interactive Digital Layout <ExternalLink className="h-4 w-4" />
                </a>
              }
            />
            <Reveal>
              <button
                type="button"
                onClick={() => gallery.open(MIRAI.layout.src)}
                className="group relative block w-full overflow-hidden rounded-[2rem] bg-white"
                aria-label="Enlarge Mirai layout plan"
              >
                <img
                  src={MIRAI.layout.src}
                  alt={MIRAI.layout.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-[1.4s] group-hover:scale-[1.02]"
                />
                <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 text-xs backdrop-blur">
                  <Maximize2 className="h-3.5 w-3.5" /> Tap to enlarge
                </span>
              </button>
            </Reveal>
            <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-primary-foreground/12 bg-primary-foreground/10 md:grid-cols-4">
              {[
                { v: "40 ft", l: "Main spine road" },
                { v: "30 ft", l: "Internal roads" },
                { v: "≈2,561 sq. yd.", l: "Open area / park" },
                { v: "≈773 sq. yd.", l: "Social infrastructure" },
              ].map((f) => (
                <div key={f.l} className="flex flex-col gap-1 bg-[oklch(0.2_0.04_210)] p-6">
                  <span className="font-display text-3xl font-light">{f.v}</span>
                  <span className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground/55">
                    {f.l}
                  </span>
                </div>
              ))}
            </Reveal>

            {/* Digital layout CTA */}
            <Reveal>
              <a
                href={MIRAI.digitalLayoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-champagne/30 bg-gradient-to-br from-champagne/15 via-transparent to-transparent p-8 transition-colors hover:border-champagne/70 sm:flex-row sm:items-center sm:justify-between sm:p-10"
              >
                <div className="flex flex-col gap-3">
                  <span className="eyebrow text-champagne">Interactive</span>
                  <span className="font-display text-3xl font-light sm:text-4xl">
                    Explore the digital layout
                  </span>
                  <span className="max-w-xl text-sm text-primary-foreground/70">
                    Zoom into every plot, road and open space on the interactive Mirai layout. Opens
                    in a new tab — works on mobile too.
                  </span>
                </div>
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-champagne text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-6 w-6" />
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-36 bg-background py-24 sm:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <SectionHeading
                eyebrow="Plot pricing"
                title="Transparent pricing."
                copy={`From the Mirai price card dated ${MIRAI.pricing.date}. Prices are subject to change without prior notice — please confirm the current rate with our team before booking.`}
              />
              <Reveal>
                <a
                  href={whatsappLink(
                    "Hi Antera Realty, please share the latest Mirai price card and plot availability.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("navy", "self-start")}
                >
                  Request Latest Price Details
                </a>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-8">
              <PriceCardView card={MIRAI.pricing} accent="var(--mirai)" />
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <div className="container-x">
            <SectionHeading
              eyebrow="Layout features & infrastructure"
              title="Planned for everyday living."
              copy="Features as shown on the official Mirai layout plan."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MIRAI.layoutFeatures.map((f, i) => {
                const Icon = FEATURE_ICONS[i] ?? Compass;
                return (
                  <Reveal key={f.title} delay={(i % 4) * 0.06} className="h-full">
                    <div className="group flex h-full flex-col gap-6 rounded-[1.75rem] border border-foreground/10 bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-mirai/40">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mirai/10 text-mirai transition-colors duration-500 group-hover:bg-mirai group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-display text-2xl leading-tight">{f.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
              <Reveal delay={0.2} className="h-full">
                <a
                  href={MIRAI.digitalLayoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col justify-between gap-6 rounded-[1.75rem] bg-mirai p-7 text-primary-foreground"
                >
                  <span className="text-sm text-primary-foreground/80">
                    See every feature in context on the interactive plan.
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                    Digital layout <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="gallery" className="scroll-mt-36 bg-background py-24 sm:py-32">
          <div className="container-x">
            <SectionHeading eyebrow="Gallery" title="Mirai, on paper and on plan." />
            <div className="mt-12">
              <GalleryGrid items={MIRAI.gallery as unknown as Media[]} onOpen={gallery.open} />
            </div>
          </div>
        </section>

        <FaqSection faqs={FAQS} title="Mirai, answered." />
        <FinalCta
          title="Begin your story at Mirai."
          defaultProject="Mirai"
          image="/projects/mirai/hero-plan.webp"
        />
      </main>
      <SiteFooter />
      <FloatingWhatsApp message={WA_MESSAGES.mirai} />
      {gallery.node}
    </>
  );
}
