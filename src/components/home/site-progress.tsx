"use client";

import { Camera } from "lucide-react";
import { useState } from "react";

import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { Lightbox } from "@/components/site/project-blocks";
import { VelocityMarquee } from "@/components/site/scroll-effects";
import { SITE_PHOTOS, type Media } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Real photographs from the Magnus site in two endless rows that speed up,
 * skew and change direction with scroll. Click any photo to open it.
 */
/** Pixel ratios of the site photos (width / height), keyed by file number. */
const RATIO: Record<string, number> = {
  "01": 4 / 3,
  "02": 4 / 3,
  "03": 4 / 3,
  "04": 1600 / 721,
  "05": 721 / 1600,
  "06": 721 / 1600,
  "07": 721 / 1600,
  "08": 1600 / 720,
  "09": 1600 / 721,
  "10": 720 / 1600,
  "11": 1600 / 720,
};
const ratioOf = (src: string) => RATIO[src.match(/site-(\d+)/)?.[1] ?? ""] ?? 4 / 3;

export function SiteProgress({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [index, setIndex] = useState<number | null>(null);
  const rowA = SITE_PHOTOS.slice(0, 6);
  const rowB = SITE_PHOTOS.slice(6);
  const dark = tone === "dark";

  const tile = (m: Media, i: number, offset: number) => (
    <button
      key={`${m.src}-${i}`}
      type="button"
      data-cursor="View"
      onClick={() => setIndex(offset + (i % (offset ? rowB.length : rowA.length)))}
      className="group relative h-56 shrink-0 overflow-hidden rounded-[1.5rem] sm:h-72 lg:h-80"
      style={{ aspectRatio: ratioOf(m.src) }}
      aria-label={`Open photo: ${m.caption}`}
    >
      <img
        src={m.src}
        alt={m.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-medium text-primary-foreground">
        {m.caption}
      </span>
    </button>
  );

  return (
    <section
      id="site-progress"
      className={cn(
        "relative scroll-mt-20 overflow-hidden py-24 sm:py-32",
        dark ? "bg-ink text-primary-foreground" : "bg-surface text-foreground",
      )}
    >
      <div className="container-x">
        <SectionHeading
          tone={dark ? "dark" : "light"}
          eyebrow="On site now"
          title="Real progress at Magnus Smart City."
          copy="Unedited photographs from the site — the entrance arch going up, CC roads, avenue plantation and corten-steel pergolas taking shape."
          action={
            <Reveal>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.16em]",
                  dark
                    ? "border-primary-foreground/20 text-primary-foreground/80"
                    : "border-foreground/15 text-foreground/70",
                )}
              >
                <Camera className="h-4 w-4 text-champagne" /> Site photos · 28 Oct 2026
              </span>
            </Reveal>
          }
        />
      </div>
      <div className="mt-14 flex flex-col gap-5">
        <VelocityMarquee>{rowA.map((m, i) => tile(m, i, 0))}</VelocityMarquee>
        <VelocityMarquee reverse baseSpeed={0.9}>
          {rowB.map((m, i) => tile(m, i, rowA.length))}
        </VelocityMarquee>
      </div>
      <Lightbox items={SITE_PHOTOS} index={index} onChange={setIndex} />
    </section>
  );
}
