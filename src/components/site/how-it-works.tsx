"use client";

import { HOW_IT_WORKS } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="cream">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>How It Works</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-2xl">From Enquiry to Ownership.</h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HOW_IT_WORKS.map((step, i) => (
          <Reveal key={step.index} delay={(i % 3) * 0.05}>
            <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-7">
              <span className="font-mono text-2xl text-accent">{step.index}</span>
              <h3 className="display-title text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}