"use client";

import { COMPARISON } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { CtaLink, Eyebrow, Section } from "./ui";

export function ComparisonSection() {
  return (
    <Section id="compare" tone="cream">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>Compare the Portfolio</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-2xl">
            Find the Project
            <span className="block text-royal">That Fits Your Goal.</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-5 font-mono text-[0.62rem] uppercase tracking-[0.18em]">Detail</th>
                {COMPARISON.columns.map((col) => (
                  <th key={col} className="display-title p-5 text-base">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <th className="p-5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td key={`${row.label}-${i}`} className="p-5 text-sm text-foreground/85">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <p className="mt-5 text-xs text-muted-foreground">
        *Current pricing provided by the sales team; subject to availability/change.
      </p>

      <div className="mt-12 flex flex-col items-start gap-5 rounded-3xl bg-primary p-8 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <h3 className="display-title text-2xl">Not Sure Which Project Fits You?</h3>
        <CtaLink href="#contact" variant="accent" arrow>
          Talk to Our Property Advisor
        </CtaLink>
      </div>
    </Section>
  );
}