"use client";

import { ContourBackground } from "@/components/site/contour-background";
import {
  ArrowUpRight,
  Building2,
  Cable,
  CloudRain,
  Compass,
  Droplets,
  Lamp,
  Route as RouteIcon,
  ShieldCheck,
  Sprout,
  Trees,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { LocationSection } from "@/components/home/location";
import { WhatsAppIcon, FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { FaqSection, type Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";
import {
  MaskReveal,
  ParallaxImage,
  Reveal,
  SectionHeading,
  WordReveal,
} from "@/components/site/motion-primitives";
import {
  ApprovalCard,
  GalleryGrid,
  PriceCardView,
  useLightbox,
} from "@/components/site/project-blocks";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { buttonClass } from "@/components/site/ui";
import { MAGNUS, WA_MESSAGES, formatINR, whatsappLink, type Media } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { FactStrip, ProjectHero, SectionNav } from "./shared";

const HIGHLIGHT_ICONS: LucideIcon[] = [
  ShieldCheck,
  Compass,
  Cable,
  Droplets,
  CloudRain,
  RouteIcon,
  Trees,
  Sprout,
  Waves,
  Building2,
  Lamp,
];

const FAQS: Faq[] = [
  {
    q: "What is the difference between Magnus Phase 1 and Phase 2?",
    a: "Both phases are at Rameshwaram, near Shadnagar. Phase 1 covers 16.31 acres (215 plots) with TG RERA P02400010251 and HMDA LP 0546/HMDA/SWDL/2025. Phase 2 covers 58.28 acres with its own TG RERA P02400011410 and HMDA LP 2522/HMDA/SWDL/2026.",
  },
  {
    q: "What is the current Magnus Smart City price?",
    a: "Per the price card dated 14 Sep 2026: residential ₹16,999 per sq. yd. for Phase 1 and Phase 2; Phase 1 commercial block ₹18,499 per sq. yd. Facing and road-frontage premiums apply. A corpus fund of ₹200 per sq. yd. is extra.",
  },
  {
    q: "What is the payment schedule?",
    a: "Booking amount ₹1,00,000; 100% of the total amount (less booking) within 30 days. The SRO (registration) value is ₹4,200 per sq. yd. Delays beyond 40 days attract additional charges.",
  },
  {
    q: "Who can help me buy at Magnus Smart City?",
    a: "Magnus Smart City is presented by Antera Realty. Our team assists buyers with project information, site visits and the booking process.",
  },
];

export function MagnusPage() {
  const [p1, p2] = MAGNUS.phases;
  const gallery = useLightbox(MAGNUS.gallery as unknown as Media[]);
  const priceCard = useLightbox([
    {
      src: p1.pricing.image!,
      alt: "Magnus Smart City price card, 14 Sep 2026",
      caption: "Price card — Phase 1 & 2, 14 Sep 2026",
    },
  ]);

  return (
    <>
      <SiteNav />
      <main id="main">
        <ProjectHero
          image={MAGNUS.hero.src}
          imageAlt={MAGNUS.hero.alt}
          imagePosition="50% 65%"
          logo="/projects/magnus/magnus-logo-light.png"
          logoAlt="Magnus Smart City"
          eyebrow={
            <span className="flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-champagne">
              By Antera Realty <span className="h-px w-6 bg-current opacity-60" /> {MAGNUS.location}
            </span>
          }
          title="The blueprint for a beautiful life."
          lede="A premium villa-plot community on the NH-44 corridor near Shadnagar — now in two approved phases, each with its own HMDA layout permission and TG RERA registration."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/#projects" },
            { label: "Magnus Smart City" },
          ]}
          aside={
            <FactStrip
              facts={[
                {
                  value: MAGNUS.overallExtent.replace(" proposed", ""),
                  label: "Overall (proposed)",
                },
                { value: `${formatINR(16999)}`, label: "Residential / sq. yd." },
                { value: p1.extent, label: "Phase 1 — approved" },
                { value: p2.extent, label: "Phase 2 — approved" },
              ]}
            />
          }
        >
          <a href="#phases" className={buttonClass("accent")}>
            View Phase 1 &amp; Phase 2
          </a>
        </ProjectHero>

        <SectionNav
          items={[
            { id: "overview", label: "Overview" },
            { id: "phase-1", label: "Phase 1" },
            { id: "phase-2", label: "Phase 2" },
            { id: "clubhouse", label: "Clubhouse" },
            { id: "location", label: "Location" },
            { id: "gallery", label: "Gallery" },
            { id: "enquire", label: "Enquire" },
          ]}
          cta={
            <a
              href="#enquire"
              className="inline-flex min-h-10 items-center rounded-full bg-accent px-5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-accent-foreground"
            >
              Book a Site Visit
            </a>
          }
        />

        {/* Overview */}
        <section id="overview" className="scroll-mt-36 bg-background py-24 sm:py-32">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="flex flex-col gap-8 lg:col-span-6">
              <SectionHeading
                eyebrow="Project overview"
                title="One address. Two approved phases."
              />
              <Reveal delay={0.1}>
                <p className="text-pretty text-lg leading-relaxed text-foreground/80">
                  {MAGNUS.overview}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div id="phases" className="grid scroll-mt-40 gap-3 sm:grid-cols-2">
                  {[p1, p2].map((p) => (
                    <a
                      key={p.id}
                      href={`#${p.id}`}
                      className="group flex flex-col gap-3 rounded-[1.5rem] border border-foreground/10 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-magnus/50"
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-display text-3xl">{p.label}</span>
                        <ArrowUpRight className="h-5 w-5 text-magnus transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {p.extent}
                        {p.plots ? ` · ${p.plots}` : ""}
                      </span>
                      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-magnus">
                        {p.status}
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/10 sm:grid-cols-3">
                {MAGNUS.highlights.map((h, i) => {
                  const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length] ?? ShieldCheck;
                  return (
                    <div
                      key={h}
                      className="flex flex-col gap-4 bg-background p-5 transition-colors duration-500 hover:bg-card sm:p-6"
                    >
                      <Icon className="h-6 w-6 text-magnus" strokeWidth={1.4} />
                      <span className="text-sm leading-snug text-foreground/80">{h}</span>
                    </div>
                  );
                })}
                <div className="flex items-end bg-magnus p-5 text-primary-foreground sm:p-6">
                  <span className="text-xs leading-relaxed text-primary-foreground/85">
                    Project highlights as listed in the Magnus e-brochure.
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Phases */}
        <PhaseBlock phase={p1} index={1} onViewPriceCard={() => priceCard.open(0)} />
        <PhaseBlock phase={p2} index={2} onViewPriceCard={() => priceCard.open(0)} />

        {/* Clubhouse */}
        <section
          id="clubhouse"
          className="relative scroll-mt-36 overflow-hidden bg-ink py-24 text-primary-foreground sm:py-32"
        >
          <div aria-hidden className="grain pointer-events-none absolute inset-0" />
          <ContourBackground />
          <div className="container-x relative grid gap-14 lg:grid-cols-12">
            <div className="flex flex-col gap-8 lg:col-span-5">
              <SectionHeading
                tone="dark"
                eyebrow="Magnus Clubhouse"
                title="The heartbeat of your home."
                copy="A signature clubhouse planned for the proposed 75+ acre Magnus community. Facilities as listed in the project e-brochure."
              />
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {MAGNUS.clubhouse.map((c, i) => (
                  <Reveal key={c} delay={i * 0.03}>
                    <li className="flex items-baseline gap-4 border-b border-primary-foreground/10 py-3.5 text-sm text-primary-foreground/85">
                      <span className="font-mono text-[0.66rem] text-champagne">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {c}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-7">
              <MaskReveal className="relative aspect-[16/10] rounded-[2rem]">
                <ParallaxImage
                  src="/projects/magnus/clubhouse-render.webp"
                  alt="Magnus Clubhouse, Magnus Smart City — architectural render"
                  className="absolute inset-0"
                  strength={8}
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-ink/60 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] backdrop-blur">
                  Render — representational
                </span>
              </MaskReveal>
              <Reveal>
                <button
                  type="button"
                  onClick={() => gallery.open("/projects/magnus/amenities-collage.webp")}
                  className="group relative block w-full overflow-hidden rounded-[2rem]"
                >
                  <img
                    src="/projects/magnus/amenities-collage.webp"
                    alt="Magnus Smart City Inner World amenities"
                    loading="lazy"
                    className="w-full transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-ink/60 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] backdrop-blur">
                    “Inner World” amenities — from the e-brochure · tap to enlarge
                  </span>
                </button>
              </Reveal>
            </div>
          </div>
        </section>

        <LocationSection />

        <section id="gallery" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <div className="container-x">
            <SectionHeading
              eyebrow="Gallery"
              title="Magnus, in pictures and plans."
              copy="Renders are representational. Layout plans, price cards and approval creatives are reproduced from the official project material."
            />
            <div className="mt-12">
              <GalleryGrid items={MAGNUS.gallery as unknown as Media[]} onOpen={gallery.open} />
            </div>
          </div>
        </section>

        <FaqSection faqs={FAQS} title="Magnus, answered." />
        <FinalCta title="Find your plot at Magnus." defaultProject="Magnus Smart City — Phase 2" />
      </main>
      <SiteFooter />
      <FloatingWhatsApp message={WA_MESSAGES.magnus2} />
      {gallery.node}
      {priceCard.node}
    </>
  );
}

type Phase = (typeof MAGNUS.phases)[number];

function PhaseBlock({
  phase,
  index,
  onViewPriceCard,
}: {
  phase: Phase;
  index: 1 | 2;
  onViewPriceCard: () => void;
}) {
  const second = index === 2;
  const creatives: Media[] = second
    ? [
        {
          src: "/projects/magnus/phase-2-rera-announcement.webp",
          alt: "Magnus Phase 2 TG RERA announcement",
          caption: "Phase 2 — TG RERA received",
        },
        {
          src: "/projects/magnus/phase-2-lp-approval.webp",
          alt: "Magnus Phase 2 HMDA LP approval",
          caption: "Phase 2 — LP approved",
        },
      ]
    : phase.layout
      ? [{ src: phase.layout.src, alt: phase.layout.alt, caption: "Phase 1 layout plan" }]
      : [];
  const lb = useLightbox(creatives);
  const wa = second ? WA_MESSAGES.magnus2 : WA_MESSAGES.magnus1;

  return (
    <section
      id={phase.id}
      className={cn(
        "relative scroll-mt-36 overflow-hidden py-24 sm:py-32",
        second ? "bg-surface" : "bg-background",
      )}
    >
      <div className="container-x">
        <div className="flex flex-col gap-10 border-t border-foreground/10 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-magnus">
                <span className="font-mono">0{index}</span> <span className="h-px w-8 bg-current" />{" "}
                {phase.status}
              </span>
            </Reveal>
            <WordReveal
              text={`Magnus Smart City — ${phase.label}`}
              className="big-title text-balance"
            />
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {phase.summary}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(wa)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("navy")}
            >
              <WhatsAppIcon className="h-4 w-4" /> Enquire About {phase.label}
            </a>
            <a href="#enquire" className={buttonClass("outline")}>
              Book a Site Visit
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { v: phase.extent, l: "Land area" },
            { v: phase.plots ?? "To be announced", l: "Plots" },
            { v: phase.plotSizes ?? "On enquiry", l: "Plot sizes" },
            { v: `${formatINR(phase.pricing.base[0]!.value)}`, l: "Residential / sq. yd." },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-2 border-t border-foreground/12 pt-5">
              <span className="font-display text-3xl font-light sm:text-4xl">{s.v}</span>
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {s.l}
              </span>
            </div>
          ))}
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Reveal>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground/70">
                {phase.label} approvals
              </h3>
            </Reveal>
            {phase.approvals.map((a, i) => (
              <Reveal key={a.label} delay={i * 0.08}>
                <ApprovalCard
                  approval={a}
                  scope={`Magnus ${phase.label}`}
                  onViewCreative={second ? () => lb.open(i) : undefined}
                />
              </Reveal>
            ))}
            {!second && phase.layout ? (
              <Reveal>
                <button
                  type="button"
                  onClick={() => lb.open(0)}
                  className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-card"
                >
                  <img
                    src={phase.layout.src}
                    alt={phase.layout.alt}
                    loading="lazy"
                    className="w-full transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                    Phase 1 layout plan · tap to enlarge
                  </span>
                </button>
              </Reveal>
            ) : null}
            {second ? (
              <Reveal>
                <div className="rounded-[1.75rem] border border-dashed border-foreground/20 p-6 text-sm text-muted-foreground">
                  The detailed Phase 2 layout plan and plot inventory will be published here once
                  released by the promoter. Ask our team for the latest availability.
                </div>
              </Reveal>
            ) : null}
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground/70">
                {phase.label} price card
              </h3>
              <PriceCardView
                card={phase.pricing}
                accent="var(--magnus)"
                onViewOriginal={onViewPriceCard}
              />
            </Reveal>
          </div>
        </div>
      </div>
      {lb.node}
    </section>
  );
}
