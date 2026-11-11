"use client";

import { motion } from "motion/react";
import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

import { EASE, Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { MAGNUS } from "@/lib/projects";
import { cn } from "@/lib/utils";

const DRIVE = [
  { place: "Rameshwaram Temple", min: 2 },
  { place: "NRSC & ISRO facilities", min: 2 },
  { place: "Hyderabad–Bangalore Hwy (NH-44)", min: 3 },
  { place: "Shadnagar Town", min: 5 },
  { place: "Shadnagar MMTS Station", min: 10 },
  { place: "ORR Junction, Exit 16", min: 30 },
  { place: "RGI Airport", min: 35 },
];
const MAX = 35;

export function LocationSection() {
  const [tab, setTab] = useState(0);
  const groups = MAGNUS.connectivity;

  return (
    <section
      id="location"
      className="relative scroll-mt-32 overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Location & connectivity"
          title="Rameshwaram, Shadnagar — where the corridor is heading."
          copy="Magnus Smart City and Mirai sit on the Hyderabad–Bangalore NH-44 growth corridor, beside the proposed Regional Ring Road and minutes from Shadnagar’s industrial and education hubs."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Drive-time chart */}
          <Reveal className="flex flex-col gap-6 rounded-[2rem] border border-foreground/10 bg-card p-7 sm:p-9 lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl">Drive times from Magnus</h3>
              <span className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                minutes
              </span>
            </div>
            <ul className="flex flex-col gap-4">
              {DRIVE.map((d, i) => (
                <li key={d.place} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-foreground/80">{d.place}</span>
                    <span className="tabular font-semibold">{d.min} min</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-magnus to-champagne"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(6, (d.min / MAX) * 100)}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.2, delay: i * 0.07, ease: EASE }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-auto text-[0.7rem] leading-relaxed text-muted-foreground">
              Approximate drive times from the Magnus Smart City e-brochure; actual times vary with
              traffic.
            </p>
          </Reveal>

          {/* Map */}
          <Reveal
            delay={0.08}
            className="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-surface lg:col-span-7"
          >
            <iframe
              title="Map — Rameshwaram, Shadnagar"
              src={MAGNUS.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full grayscale-[35%] sm:h-full sm:min-h-[30rem]"
            />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-between gap-3 sm:inset-x-6 sm:bottom-6">
              <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2.5 text-xs text-primary-foreground backdrop-blur">
                <MapPin className="h-4 w-4 text-champagne" /> Rameshwaram · Shadnagar, Telangana
              </span>
              <a
                href={MAGNUS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-background px-4 py-2.5 text-xs font-semibold shadow-lg"
              >
                Open in Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Nearby by category */}
        <Reveal className="mt-6 rounded-[2rem] border border-foreground/10 bg-surface p-3 sm:p-4">
          <div
            role="tablist"
            aria-label="Nearby landmarks"
            className="flex gap-1 overflow-x-auto p-1 [scrollbar-width:none]"
          >
            {groups.map((g, i) => (
              <button
                key={g.group}
                role="tab"
                aria-selected={tab === i}
                type="button"
                onClick={() => setTab(i)}
                className={cn(
                  "relative shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
                  tab === i
                    ? "text-primary-foreground"
                    : "text-foreground/60 hover:text-foreground",
                )}
              >
                {tab === i ? (
                  <motion.span
                    layoutId="loc-tab"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                ) : null}
                <span className="relative">{g.group}</span>
              </button>
            ))}
          </div>
          <motion.ul
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid gap-x-8 gap-y-1 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3"
          >
            {(groups[tab] ?? groups[0]!).items.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-foreground/8 py-3 text-sm text-foreground/80"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne-deep"
                />
                {item}
              </li>
            ))}
          </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}
