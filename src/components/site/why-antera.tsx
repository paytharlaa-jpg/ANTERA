"use client";

import { WHY_ANTERA } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function WhyAntera() {
  return (
    <Section id="why-antera" tone="dark">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow tone="dark">Why Antera Realty</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-3xl">
            Real Estate Decisions
            <span className="block text-accent">Built Around What Matters.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {WHY_ANTERA.map((item, i) => (
          <ScaleReveal key={item.index} delay={i * 0.05}>
            <div className="group h-full rounded-3xl border border-primary-foreground/12 bg-primary-foreground/5 p-8 transition-colors duration-500 hover:border-accent/60">
              <span className="font-mono text-3xl text-accent">{item.index}</span>
              <h3 className="display-title mt-6 text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{item.copy}</p>
            </div>
          </ScaleReveal>
        ))}
      </div>
    </Section>
  );
}