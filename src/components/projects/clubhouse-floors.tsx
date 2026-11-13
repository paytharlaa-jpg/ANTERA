"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { Maximize2 } from "lucide-react";
import { useRef, useState } from "react";

import { ContourBackground } from "@/components/site/contour-background";
import { CountUp, EASE, Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { GalleryGrid, useLightbox } from "@/components/site/project-blocks";
import { CLUBHOUSE, type Media } from "@/lib/projects";
import { cn } from "@/lib/utils";

const LEVELS = CLUBHOUSE.levels;
const MARK = ["G", "01", "02", "T"];
const SPACES = LEVELS.reduce((n, l) => n + l.items.length + l.outdoor.length, 0);

/**
 * Pinned "floor by floor" clubhouse story. On desktop the section pins while
 * scrolling steps through Ground → First → Second → Terrace: renders crossfade
 * with a slow push-in, facilities stagger in, and the matching floor plan sits
 * in the corner. On mobile each floor is a simple stacked card.
 */
export function ClubhouseFloors() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.min(LEVELS.length - 1, Math.floor(v * LEVELS.length))),
  );
  const rail = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const plans = useLightbox(CLUBHOUSE.plans as unknown as Media[]);
  const views = useLightbox(CLUBHOUSE.views as unknown as Media[]);
  const alts = useLightbox(CLUBHOUSE.alternates as unknown as Media[]);
  const level = LEVELS[active] ?? LEVELS[0];

  return (
    <section id="clubhouse" className="relative scroll-mt-36 bg-ink text-primary-foreground">
      <div className="relative overflow-hidden pb-10 pt-24 sm:pt-32">
        <ContourBackground />
        <div className="container-x relative">
          <SectionHeading
            tone="dark"
            eyebrow={`${CLUBHOUSE.title} · ${CLUBHOUSE.phase}`}
            title="33,625 sq. ft of life, floor by floor."
            copy="The final clubhouse drawings for Magnus Smart City Phase 2 — four levels of leisure, wellness, work and hospitality, set around a pool deck and party lawn. Proposed conceptual design; renders are representational."
          />
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-primary-foreground/10 pt-10 lg:grid-cols-4">
            {[
              { v: CLUBHOUSE.totalArea, s: "", l: "Sq. ft built-up area" },
              { v: LEVELS.length, s: "", l: "Levels incl. terrace" },
              { v: SPACES, s: "", l: "Spaces & amenities" },
              { v: 19104, s: "", l: "Sq. ft landscape & outdoor" },
            ].map((st, i) => (
              <Reveal key={st.l} delay={i * 0.06} className="flex flex-col gap-2">
                <span className="font-display text-4xl sm:text-5xl">
                  <CountUp value={st.v} suffix={st.s} />
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary-foreground/55">
                  {st.l}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: pinned floor story */}
      <div
        ref={pinRef}
        className="relative hidden lg:block"
        style={{ height: `${LEVELS.length * 90 + 40}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-20">
          <div className="container-x grid w-full grid-cols-12 items-center gap-10">
            <div className="col-span-5 flex flex-col gap-8">
              <nav aria-label="Clubhouse floors" className="flex flex-col">
                {LEVELS.map((l, i) => (
                  <div
                    key={l.id}
                    className={cn(
                      "flex items-baseline justify-between gap-4 border-b border-primary-foreground/10 py-3 transition-colors duration-500",
                      i === active ? "text-primary-foreground" : "text-primary-foreground/35",
                    )}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="w-8 font-mono text-xs text-champagne">{MARK[i]}</span>
                      <span className="font-display text-2xl">{l.name}</span>
                    </span>
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em]">
                      {l.area}
                    </span>
                  </div>
                ))}
              </nav>
              <div className="relative min-h-[15rem]">
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={level.id}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={{
                      show: { transition: { staggerChildren: 0.05 } },
                      exit: { transition: { staggerChildren: 0.02 } },
                    }}
                    className="grid grid-cols-2 gap-x-6 gap-y-3"
                  >
                    {[...level.items, ...level.outdoor].map((it) => (
                      <motion.li
                        key={it}
                        variants={{
                          hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                          show: {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: { duration: 0.5, ease: EASE },
                          },
                          exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
                        }}
                        className="flex items-baseline gap-3 text-[0.95rem] text-primary-foreground/85"
                      >
                        <span className="text-champagne">✦</span> {it}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative col-span-7 aspect-[16/10] overflow-hidden rounded-[2rem]">
              {LEVELS.map((l, i) => (
                <motion.img
                  key={l.id}
                  src={l.image}
                  alt={`${CLUBHOUSE.title} — ${l.name} (render)`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1.06 : 1.14 }}
                  transition={{
                    opacity: { duration: 0.9 },
                    scale: { duration: 6, ease: "linear" },
                  }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={MARK[active]}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="pointer-events-none absolute bottom-3 left-6 font-display text-[9rem] leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(246_241_231/0.8)]"
                >
                  {MARK[active]}
                </motion.span>
              </AnimatePresence>
              <button
                type="button"
                data-cursor="Plan"
                onClick={() => plans.open(active)}
                className="group absolute bottom-5 right-5 w-48 overflow-hidden rounded-xl border border-primary-foreground/20 bg-white text-left shadow-2xl"
                aria-label={`Open ${level.name} plan`}
              >
                <img
                  src={level.plan}
                  alt=""
                  className="h-28 w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-110"
                />
                <span className="flex items-center justify-between bg-ink px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em]">
                  {level.name} plan <Maximize2 className="h-3 w-3 text-champagne" />
                </span>
              </button>
              <div className="absolute right-5 top-5 h-28 w-px bg-primary-foreground/20">
                <motion.div style={{ height: rail }} className="w-px bg-champagne" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked floors */}
      <div className="container-x flex flex-col gap-6 pb-10 lg:hidden">
        {LEVELS.map((l, i) => (
          <Reveal
            key={l.id}
            className="overflow-hidden rounded-[1.75rem] border border-primary-foreground/12 bg-primary-foreground/[0.03]"
          >
            <div className="relative aspect-[16/10]">
              <img
                src={l.image}
                alt={`${CLUBHOUSE.title} — ${l.name} (render)`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-2 left-4 font-display text-6xl text-transparent [-webkit-text-stroke:1px_rgb(246_241_231/0.85)]">
                {MARK[i]}
              </span>
            </div>
            <div className="flex flex-col gap-4 p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl">{l.name}</span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary-foreground/55">
                  {l.area}
                </span>
              </div>
              <ul className="grid gap-2 text-sm text-primary-foreground/80 sm:grid-cols-2">
                {[...l.items, ...l.outdoor].map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-champagne">✦</span> {it}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => plans.open(i)}
                className="self-start font-mono text-[0.66rem] uppercase tracking-[0.14em] text-champagne"
              >
                View floor plan →
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Design views + alternate options */}
      <div className="container-x flex flex-col gap-12 pb-24 pt-10 sm:pb-32">
        <div className="flex flex-col gap-6">
          <Reveal>
            <h3 className="font-display text-2xl sm:text-3xl">Design views</h3>
          </Reveal>
          <GalleryGrid items={CLUBHOUSE.views as unknown as Media[]} onOpen={views.open} />
        </div>
        <Reveal className="flex flex-col gap-5 rounded-[1.75rem] border border-primary-foreground/12 p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-xl sm:text-2xl">Other concept options</h3>
              <p className="mt-2 max-w-xl text-sm text-primary-foreground/60">
                The same drawing set includes two alternative façade studies, shown here for
                reference.
              </p>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
            {CLUBHOUSE.alternates.map((m, i) => (
              <button
                key={m.src}
                type="button"
                data-cursor="View"
                onClick={() => alts.open(i)}
                className="group relative h-32 shrink-0 overflow-hidden rounded-xl sm:h-40"
                aria-label={`Open ${m.caption}`}
              >
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  className="h-full w-auto max-w-none transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-2 text-left text-[0.68rem]">
                  {m.caption}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      {plans.node}
      {views.node}
      {alts.node}
    </section>
  );
}
