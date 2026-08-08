"use client";

import { INFRASTRUCTURE } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function InfrastructureSection() {
  return (
    <Section id="infrastructure" tone="light">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>The Details That Build Value</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-2xl">Planned From the Ground Up.</h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {INFRASTRUCTURE.map((item, i) => (
          <Reveal key={item.title} delay={(i % 5) * 0.04} y={18}>
            <div className="h-full bg-card p-6">
              <span className="font-mono text-[0.62rem] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-title mt-4 text-base leading-snug">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}