"use client";

import { AMENITIES } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function AmenitiesSection() {
  return (
    <Section id="amenities" tone="light">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>Everyday Living, Elevated</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-2xl">
            More Than a Plot.
            <span className="block text-royal">A Complete Lifestyle.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AMENITIES.map((item, i) => (
          <ScaleReveal key={item.title} delay={(i % 4) * 0.05}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">
                {item.kind}
              </span>
              <p className="display-title mt-4 text-lg leading-snug">{item.title}</p>
            </div>
          </ScaleReveal>
        ))}
      </div>
    </Section>
  );
}