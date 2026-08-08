"use client";

import { EnquiryForm } from "./enquiry-form";
import { Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function SiteVisitSection() {
  return (
    <Section id="site-visit" tone="dark">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow tone="dark">See It Before You Decide</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="big-title">
              A Website Can Show You the Project.
              <span className="block text-accent">A Site Visit Lets You Experience It.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-lg text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
              Walk through the development, understand the approach roads, explore available plots and
              discuss your requirements directly with our property team.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <EnquiryForm variant="site-visit" tone="dark" />
        </Reveal>
      </div>
    </Section>
  );
}