"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { EASE, WordReveal } from "@/components/site/motion-primitives";
import { buttonClass } from "@/components/site/ui";
import { useLoaderDone } from "@/lib/loader";

const SLIDES = [
  {
    src: "/projects/magnus/gate-render.webp",
    project: "Magnus Smart City",
    place: "Rameshwaram · Shadnagar",
    pos: "50% 60%",
  },
  {
    src: "/projects/magnus/clubhouse-render.webp",
    project: "Mugdha Clubhouse, Magnus",
    place: "Rameshwaram · Shadnagar",
    pos: "50% 55%",
  },
  {
    src: "/projects/legacy/marvel-smart-city.webp",
    project: "Marvel Smart City",
    place: "Srisailam Highway",
    pos: "50% 50%",
  },
  {
    src: "/projects/legacy/avatar-2.webp",
    project: "Aspirealty Avatar 2",
    place: "Karkalpahad",
    pos: "50% 50%",
  },
];

const DURATION = 6500;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useLoaderDone();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % SLIDES.length), DURATION);
    return () => window.clearTimeout(t);
  }, [i, paused]);

  const slide = SLIDES[i] ?? SLIDES[0]!;

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-primary-foreground"
      aria-label="Antera Realty — introduction"
    >
      {/* Cinematic imagery */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <img
              src={slide.src}
              alt=""
              fetchPriority={i === 0 ? "high" : "auto"}
              className="animate-kenburns h-full w-full object-cover"
              style={{ objectPosition: slide.pos }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_15_28/0.55)_0%,rgb(10_15_28/0.15)_35%,rgb(10_15_28/0.55)_70%,rgb(10_15_28/0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_70%,rgb(10_15_28/0.65),transparent_60%)]" />
        <div aria-hidden className="grain absolute inset-0" />
      </motion.div>

      {/* Copy */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-x relative flex flex-1 flex-col justify-end pb-36 pt-32 sm:pb-40 lg:pb-44"
      >
        <motion.a
          href="/projects/magnus-smart-city#phase-2"
          initial={{ opacity: 0, y: 16 }}
          {...(ready ? { animate: { opacity: 1, y: 0 } } : {})}
          transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
          className="group mb-8 inline-flex max-w-full items-center gap-3 self-start rounded-full border border-primary-foreground/20 bg-ink/40 py-1.5 pl-1.5 pr-4 text-xs backdrop-blur-md transition-colors hover:border-champagne/60 sm:text-[0.8rem]"
        >
          <span className="rounded-full bg-champagne px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink">
            New
          </span>
          <span className="truncate">
            Magnus Smart City <strong className="font-semibold">Phase 2</strong> — TG RERA &amp;
            HMDA LP received
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-champagne transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.a>

        <WordReveal
          as="h1"
          animateOnMount
          delay={0.35}
          stagger={0.07}
          text="Where Vision Meets the Art of Living."
          className="hero-title max-w-[13ch] text-balance"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          {...(ready ? { animate: { opacity: 1, y: 0 } } : {})}
          transition={{ delay: 1.1, duration: 1, ease: EASE }}
          className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Discover thoughtfully planned developments, exceptional locations, and opportunities
            designed for a better tomorrow.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className={buttonClass("accent")}>
              Explore Our Projects
            </a>
            <a href="#enquire" className={buttonClass("ghost-dark")}>
              Schedule a Site Visit
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Slide index + scroll cue */}
      <div className="container-x absolute inset-x-0 bottom-0 z-10 pb-6 sm:pb-8">
        <div className="flex items-end justify-between gap-6 border-t border-primary-foreground/15 pt-5">
          <div
            className="flex min-w-0 flex-1 flex-col gap-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={slide.project}
                initial={{ opacity: 0, y: 8 }}
                {...(ready ? { animate: { opacity: 1, y: 0 } } : {})}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="truncate text-xs text-primary-foreground/70"
              >
                <span className="font-semibold text-primary-foreground">{slide.project}</span>
                <span className="mx-2 text-primary-foreground/30">/</span>
                {slide.place}
                <span className="mx-2 text-primary-foreground/30">/</span>
                <span className="italic">Architectural render</span>
              </motion.p>
            </AnimatePresence>
            <div className="flex max-w-md gap-2">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Show ${s.project}`}
                  className="relative h-6 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-primary-foreground/20">
                    {idx === i ? (
                      <motion.span
                        key={`${i}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-champagne"
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "100%" : "100%" }}
                        transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                      />
                    ) : idx < i ? (
                      <span className="absolute inset-0 bg-primary-foreground/60" />
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <a
            href="#launch"
            className="hidden shrink-0 items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70 hover:text-primary-foreground sm:flex"
          >
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-primary-foreground/20">
              <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-champagne" />
            </span>
            <ArrowDown className="sr-only" />
          </a>
        </div>
      </div>
    </section>
  );
}
