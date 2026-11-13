"use client";

import { motion } from "motion/react";
import { Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";

import { EASE, SectionHeading } from "@/components/site/motion-primitives";
import { Lightbox } from "@/components/site/project-blocks";
import { HorizontalScroll } from "@/components/site/scroll-effects";
import { MAGNUS, MIRAI, type Media } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Item = Media & { project: "Magnus" | "Mirai" | "Marvel" };

const ALL: Item[] = [
  ...MAGNUS.gallery.map((m) => ({ ...m, project: "Magnus" as const })),
  ...MIRAI.gallery.map((m) => ({ ...m, project: "Mirai" as const })),
  {
    src: "/projects/legacy/marvel-smart-city.webp",
    alt: "Marvel Smart City aerial visual",
    caption: "Marvel Smart City — visual",
    kind: "render",
    project: "Marvel",
  },
];

const FILTERS = [
  "All",
  "Site photos",
  "Clubhouse",
  "Magnus",
  "Mirai",
  "Layouts & maps",
  "Official creatives",
] as const;

const KIND: Record<NonNullable<Media["kind"]>, string> = {
  render: "Architectural render",
  plan: "Layout plan",
  creative: "Official creative",
  photo: "Photograph",
  map: "Location map",
};

export function GallerySection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    switch (filter) {
      case "Magnus":
      case "Mirai":
        return ALL.filter((m) => m.project === filter);
      case "Site photos":
        return ALL.filter((m) => m.kind === "photo");
      case "Clubhouse":
        return ALL.filter((m) => m.src.includes("/clubhouse/"));
      case "Layouts & maps":
        return ALL.filter((m) => m.kind === "plan" || m.kind === "map");
      case "Official creatives":
        return ALL.filter((m) => m.kind === "creative");
      default:
        return ALL;
    }
  }, [filter]);

  const header = (
    <div className="container-x flex flex-col gap-8">
      <SectionHeading
        eyebrow="Gallery"
        title="Plans, renders and the official word."
        copy="Renders are representational. Layout plans, price cards and approval announcements are reproduced from official project material. Site photos are unedited."
      />
      <div
        role="tablist"
        aria-label="Filter gallery"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "relative shrink-0 rounded-full border px-5 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-colors",
              filter === f
                ? "border-ink bg-ink text-primary-foreground"
                : "border-foreground/12 text-foreground/65 hover:text-foreground",
            )}
          >
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="gallery" className="relative scroll-mt-20 bg-surface py-24 lg:py-0">
      <HorizontalScroll header={header}>
        {items.map((m, i) => (
          <motion.button
            key={`${filter}-${m.src}`}
            type="button"
            onClick={() => setIndex(i)}
            data-cursor="View"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05, ease: EASE }}
            className="group relative h-[52vh] max-h-[34rem] min-w-[16rem] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-card text-left lg:h-[46vh] lg:max-h-[30rem]"
            aria-label={`Open ${m.alt}`}
          >
            <img
              src={m.src}
              alt={m.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-auto max-w-[85vw] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] lg:max-w-none"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-primary-foreground">
              <span className="flex flex-col gap-1">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-champagne">
                  {m.project} · {m.kind ? KIND[m.kind] : ""}
                </span>
                <span className="text-sm font-medium">{m.caption ?? m.alt}</span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur">
                <Maximize2 className="h-4 w-4" />
              </span>
            </span>
          </motion.button>
        ))}
      </HorizontalScroll>
      <Lightbox items={items} index={index} onChange={setIndex} />
    </section>
  );
}
