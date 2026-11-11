"use client";

import { ContourBackground } from "@/components/site/contour-background";
import { motion, useScroll, useTransform } from "motion/react";
import { BadgeCheck, MapPin } from "lucide-react";
import { useRef } from "react";

import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { useLightbox } from "@/components/site/project-blocks";
import { buttonClass } from "@/components/site/ui";
import { WhatsAppIcon } from "@/components/site/floating-whatsapp";
import { MAGNUS, WA_MESSAGES, formatINR, whatsappLink, type Media } from "@/lib/projects";

const phase2 = MAGNUS.phases[1];

const CREATIVES: Media[] = [
  {
    src: "/projects/magnus/phase-2-lp-approval.webp",
    alt: "Magnus Smart City Phase 2 LP approved — LP No. 2522/HMDA/SWDL/2026, 58.28 acres",
    caption: "Phase 2 — HMDA LP approved",
  },
  {
    src: "/projects/magnus/phase-2-rera-announcement.webp",
    alt: "Mugdha Magnus Smart City Phase 2 RERA received — P02400011410",
    caption: "Phase 2 — TG RERA received",
  },
];

export function LaunchSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yFront = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const rotBack = useTransform(scrollYProgress, [0, 1], [-9, -4]);
  const rotFront = useTransform(scrollYProgress, [0, 1], [7, 3]);
  const { open, node } = useLightbox(CREATIVES);

  const rera = phase2.approvals[0]!;
  const lp = phase2.approvals[1]!;
  const base = phase2.pricing.base[0]!;

  return (
    <section
      ref={ref}
      id="launch"
      className="relative scroll-mt-20 overflow-hidden bg-background py-24 sm:py-32"
    >
      <ContourBackground color="rgba(17,26,46,0.07)" accent="rgba(15,107,112,0.2)" levels={9} />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-magnus/10 blur-3xl"
      />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-magnus">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-magnus opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-magnus" />
              </span>
              Now launching · Magnus Smart City
            </span>
          </Reveal>
          <WordReveal
            text="Phase 2 is here — approved and ready."
            className="section-title max-w-[16ch] text-balance"
          />
          <Reveal delay={0.1}>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {phase2.summary} Same address as Phase 1 at Rameshwaram, near Shadnagar — with its own
              approvals, so you can book with complete clarity.
            </p>
          </Reveal>

          <Reveal
            delay={0.15}
            className="grid gap-px overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-foreground/10 sm:grid-cols-2"
          >
            {[rera, lp].map((a) => (
              <div key={a.label} className="flex flex-col gap-2 bg-card p-6">
                <span className="flex items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <BadgeCheck className="h-4 w-4 text-emerald-600" /> {a.label}
                </span>
                <span className="break-all font-mono text-xl tracking-tight text-foreground">
                  {a.number}
                </span>
              </div>
            ))}
            <div className="flex flex-col gap-1 bg-card p-6">
              <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Phase 2 land area
              </span>
              <span className="font-display text-3xl font-light">{phase2.extent}</span>
            </div>
            <div className="flex flex-col gap-1 bg-card p-6">
              <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Residential base rate
              </span>
              <span className="font-display text-3xl font-light">
                {formatINR(base.value)}
                <span className="ml-1 font-sans text-sm text-muted-foreground">/ sq. yd.</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/projects/magnus-smart-city#phase-2" className={buttonClass("navy")}>
              Explore Phase 2
            </a>
            <a
              href={whatsappLink(WA_MESSAGES.magnus2)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("outline")}
            >
              <WhatsAppIcon className="h-4 w-4 text-[#1f9d55]" /> Enquire About Phase 2
            </a>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {MAGNUS.location} · Price per card dated{" "}
              {phase2.pricing.date}; corpus fund extra.
            </p>
          </Reveal>
        </div>

        {/* Official creatives, fanned */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem]">
          <motion.button
            type="button"
            onClick={() => open(1)}
            style={{ y: yBack, rotate: rotBack }}
            className="absolute left-0 top-0 w-[72%] overflow-hidden rounded-[1.25rem] shadow-[0_40px_80px_-40px_rgb(17_26_46/0.6)] ring-1 ring-foreground/10"
            aria-label="View Phase 2 TG RERA announcement"
          >
            <img
              src={CREATIVES[1]!.src}
              alt={CREATIVES[1]!.alt}
              loading="lazy"
              className="w-full"
            />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => open(0)}
            style={{ y: yFront, rotate: rotFront }}
            className="absolute bottom-0 right-0 w-[72%] overflow-hidden rounded-[1.25rem] shadow-[0_50px_90px_-40px_rgb(17_26_46/0.7)] ring-1 ring-foreground/10"
            aria-label="View Phase 2 HMDA LP approval announcement"
          >
            <img
              src={CREATIVES[0]!.src}
              alt={CREATIVES[0]!.alt}
              loading="lazy"
              className="w-full"
            />
          </motion.button>
          <span className="absolute -bottom-10 left-0 text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground">
            Official announcements · tap to view
          </span>
        </div>
      </div>
      {node}
    </section>
  );
}
