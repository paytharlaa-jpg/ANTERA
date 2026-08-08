"use client";

import { LetterReveal, Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function AboutSection() {
  return (
    <Section id="about" tone="light">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1fr]">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow>About Antera Realty</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="big-title">
              Shaping Spaces.
              <span className="block text-royal">Building Futures.</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <LetterReveal
            text="Antera Realty connects buyers and investors with carefully selected plotted developments across Hyderabad's emerging real-estate corridors."
            className="text-sm leading-relaxed text-muted-foreground sm:text-base"
          />
          <Reveal delay={0.08}>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Our approach goes beyond simply presenting available plots. We focus on understanding
              location, connectivity, development, infrastructure and buyer objectives so our clients
              can evaluate opportunities with greater clarity.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="display-title text-xl leading-snug sm:text-2xl">
                We believe the right property isn't simply where you invest today. It's where your
                future begins.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}