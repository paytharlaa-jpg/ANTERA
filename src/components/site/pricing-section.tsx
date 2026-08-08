"use client";

import { PRICING } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { CtaLink, Eyebrow, Section } from "./ui";

export function PricingSection() {
  return (
    <Section id="pricing" tone="cream">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>Avatar 2 Pricing</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title">Choose Your Opportunity.</h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {PRICING.map((tier, i) => (
          <ScaleReveal key={tier.phase} delay={i * 0.06}>
            <div className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card p-8 sm:p-10">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent">
                {tier.phase}
              </span>
              <div>
                <p className="display-title text-5xl sm:text-6xl">{tier.price}</p>
                <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {tier.unit}
                </p>
              </div>
              <span className="accent-rule" />
              <div>
                <h3 className="display-title text-xl">{tier.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tier.copy}</p>
              </div>
              <CtaLink
                href="#site-visit"
                variant={i === 0 ? "accent" : "navy"}
                className="mt-auto w-fit"
              >
                {tier.cta}
              </CtaLink>
            </div>
          </ScaleReveal>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        *Current pricing provided by the sales team; subject to availability and change.
      </p>
    </Section>
  );
}