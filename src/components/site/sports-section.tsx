"use client";

import { SPORTS } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow tone="dark">{title}</Eyebrow>
      <ul className="flex flex-col divide-y divide-primary-foreground/12">
        {items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-4 py-4">
            <span className="font-mono text-[0.66rem] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="display-title text-xl sm:text-2xl">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SportsSection() {
  return (
    <Section id="sports" tone="dark">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow tone="dark">Sports Zone</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title">
            Play More.
            <span className="block text-accent">Live More.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <Reveal>
          <List title="Indoor Sports" items={SPORTS.indoor} />
        </Reveal>
        <Reveal delay={0.08}>
          <List title="Outdoor Sports" items={SPORTS.outdoor} />
        </Reveal>
      </div>
    </Section>
  );
}