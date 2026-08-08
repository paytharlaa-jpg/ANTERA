"use client";

import { LetterReveal, Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function BrandIntro() {
  return (
    <Section id="about-intro" tone="light">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1fr]">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow>Welcome to Antera</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="big-title">
              We Don't Just Sell Plots.
              <span className="mt-2 block text-royal">We Identify Tomorrow's Addresses.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="accent-rule" />
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <LetterReveal text="At Antera Realty, we believe land is more than an asset - it is the foundation for your future." />
          <Reveal delay={0.08}>
            <p>
              We bring together carefully selected plotted developments across Hyderabad's emerging
              growth corridors, focusing on strategic connectivity, planned infrastructure,
              lifestyle amenities and investment potential.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p>
              Whether you're looking to build your future home or secure land for tomorrow, our goal
              is simple:
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="display-title text-lg text-foreground sm:text-2xl">
              Help you make a more informed real-estate decision.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}