"use client";

import { ScrollFillText } from "@/components/site/scroll-effects";
import {
  CountUp,
  MaskReveal,
  ParallaxImage,
  Reveal,
  WordReveal,
} from "@/components/site/motion-primitives";

const PILLARS = [
  {
    n: "01",
    title: "Transparency first",
    copy: "Approval numbers, price cards and documents are shared up front — phase by phase, never blurred together.",
  },
  {
    n: "02",
    title: "Locations chosen with care",
    copy: "We focus on corridors with real infrastructure momentum — NH-44 at Shadnagar and the Srisailam Highway.",
  },
  {
    n: "03",
    title: "Thoughtful developments",
    copy: "Vastu-aligned layouts, wide internal roads and community spaces planned before the first plot is sold.",
  },
  {
    n: "04",
    title: "Relationships that last",
    copy: "From the first site visit to registration, one team stays with you through every step of the purchase.",
  },
];

export function BrandIntro() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-3 text-champagne-deep">
                <span aria-hidden className="h-px w-8 bg-current opacity-70" />
                About Antera Realty
              </span>
            </Reveal>
            <WordReveal
              text="Building more than properties. Creating lasting value."
              className="big-title max-w-[16ch] text-balance"
            />
          </div>
          <Reveal delay={0.15} className="flex flex-col justify-end gap-6 lg:col-span-5">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              Every project we represent is backed by documentation you can verify yourself. We help
              you understand the location, the layout and the paperwork — so your decision rests on
              facts, not just a brochure.
            </p>
          </Reveal>
        </div>

        <ScrollFillText
          className="mt-16 max-w-5xl font-display text-[1.6rem] leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:mt-24 lg:text-[3.1rem]"
          text="Antera Realty brings together carefully selected plotted developments across Hyderabad’s fastest-moving growth corridors — and presents them the way buyers deserve: clearly, honestly and completely."
        />

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12">
          <MaskReveal className="relative aspect-[4/3] rounded-[2rem] lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
            <ParallaxImage
              src="/projects/magnus/clubhouse/corner-day.webp"
              alt="Magnus Clubhouse, Magnus Smart City — proposed design render"
              className="absolute inset-0"
              strength={8}
            />
            <span className="absolute bottom-5 left-5 rounded-full bg-ink/55 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.16em] text-primary-foreground backdrop-blur">
              Magnus Clubhouse — proposed design
            </span>
          </MaskReveal>

          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:col-span-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06} className="flex flex-col gap-4 bg-background p-7">
                <span className="font-mono text-xs text-champagne-deep">{p.n}</span>
                <h3 className="font-display text-2xl font-normal leading-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-foreground/10 pt-10 lg:grid-cols-4">
          {[
            { v: 5, d: 0, s: "", label: "Developments represented" },
            { v: 74.59, d: 2, s: "", label: "Acres HMDA-approved at Magnus (Phase 1 + 2)" },
            { v: 2, d: 0, s: "", label: "Magnus phases with TG RERA registration" },
            { v: 2, d: 0, s: "", label: "Growth corridors — NH-44 & Srisailam Hwy" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="flex flex-col gap-2">
              <span className="font-display text-5xl font-light tracking-tight sm:text-6xl">
                <CountUp value={s.v} decimals={s.d} suffix={s.s} />
              </span>
              <span className="max-w-[16rem] text-xs uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
