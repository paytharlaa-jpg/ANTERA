"use client";

import { PLOT_REASONS } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function WhyPlots() {
  return (
    <Section id="why-plots" tone="light">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>Why Plotted Development</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-2xl">
            Own the Land.
            <span className="block text-royal">Build When You're Ready.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PLOT_REASONS.map((item, i) => (
          <ScaleReveal key={item.title} delay={i * 0.05}>
            <div className="h-full rounded-3xl border border-border bg-card p-7">
              <h3 className="display-title text-lg">{item.title}</h3>
              <span className="accent-rule mt-4" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
            </div>
          </ScaleReveal>
        ))}
      </div>
    </Section>
  );
}