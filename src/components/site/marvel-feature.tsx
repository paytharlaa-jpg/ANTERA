"use client";

import { ASSETS } from "@/lib/assets";
import { MARVEL_LIFESTYLE, MARVEL_SMART } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { CtaLink, Eyebrow, Section } from "./ui";

export function MarvelFeature() {
  return (
    <Section id="marvel" tone="cream">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow>Pre-Launch Opportunity</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="big-title">Marvel Smart City</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
              Ultra-Luxury Villa Plots &middot; Srisailam Highway
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex items-end gap-3">
              <span className="display-title text-6xl">&#8377;16,000</span>
              <span className="pb-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                Per Sq. Yard
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A future-focused plotted community designed around smart infrastructure, premium
              amenities, landscaped surroundings and strategic connectivity. Marvel Smart City is
              planned as a 100+ acre ultra-luxury villa plot project.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3">
              <CtaLink href="/projects/marvel-smart-city" variant="accent" arrow>
                Get Pre-Launch Details
              </CtaLink>
              <CtaLink href={ASSETS.docs.marvelBrochure} variant="outline" download>
                Download Brochure
              </CtaLink>
            </div>
          </Reveal>
        </div>

        <ScaleReveal>
          <img
            src="/project images/Marvel Smart City.png"
            alt="Marvel Smart City villa plot visualisation"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl border border-border object-cover"
          />
        </ScaleReveal>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MARVEL_SMART.map((item, i) => (
          <ScaleReveal key={item.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-border bg-card p-6">
              <span className="accent-rule" />
              <h3 className="display-title mt-5 text-lg">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
            </div>
          </ScaleReveal>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-card p-8 sm:p-10">
        <Reveal>
          <h3 className="section-title">Designed Beyond the Plot.</h3>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {MARVEL_LIFESTYLE.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}