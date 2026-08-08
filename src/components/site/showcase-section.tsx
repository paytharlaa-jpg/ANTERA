"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { ASSETS } from "@/lib/assets";
import { Reveal } from "./motion-primitives";

const MARQUEE_WORDS = [
  "Luxury Living",
  "Timeless Architecture",
  "Premium Villas",
  "Crafted for Generations",
];

export function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  // Viewport-aware sizing: a small square card that scales up to cover the screen
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const read = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const base = Math.max(200, Math.min(vp.w * 0.28, 380));
  const coverScale = Math.max(vp.w / base, vp.h / base);

  // Small centred card -> edge-to-edge cinematic frame, then held pinned
  const mediaScale = useTransform(p, [0, 0.68, 1], [1, coverScale, coverScale]);
  const radius = useTransform(mediaScale, (s) => `${28 / s}px`);
  const overlayOpacity = useTransform(p, [0, 0.7], [0.15, 0.4]);
  const captionOpacity = useTransform(p, [0.6, 0.82], [0, 1]);
  const captionScale = useTransform(mediaScale, (s) => 1 / s);
  const marqueeOpacity = useTransform(p, [0, 0.45], [1, 0]);
  const marqueeScale = useTransform(p, [0, 0.45], [1, 1.08]);
  const textOpacity = useTransform(p, [0, 0.35], [1, 0]);

  return (
    <section ref={ref} className="relative bg-background" style={{ height: "340vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Oversized background typography */}
        <motion.div
          style={{ opacity: marqueeOpacity, scale: marqueeScale }}
          className="pointer-events-none absolute inset-x-0 top-[18%] z-0 flex overflow-hidden"
        >
          <div
            className="animate-marquee-x flex shrink-0 items-center gap-10"
            style={{ ["--marquee-duration" as string]: "34s" }}
          >
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map(
              (word, i) => (
                <span
                  key={`bg-${word}-${i}`}
                  className="display-title whitespace-nowrap text-5xl text-foreground/10 sm:text-7xl lg:text-8xl"
                >
                  {word}
                  <span className="ml-10 text-accent/40">&bull;</span>
                </span>
              ),
            )}
          </div>
        </motion.div>

        {/* Headline sits behind the video */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <Reveal>
            <span className="eyebrow">Highlighted Home</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="section-title max-w-3xl">Modern homes, designed to live better</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore how modern homes are designed to feel clean, open, and functional.
            </p>
          </Reveal>
        </motion.div>

        <motion.div
          style={{ width: base, height: base, borderRadius: radius, scale: mediaScale }}
          className="soft-shadow relative z-10 origin-center overflow-hidden bg-primary will-change-transform"
        >
          <video
            src={ASSETS.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
          />
          <motion.div
            style={{
              opacity: captionOpacity,
              scale: captionScale,
              x: "-50%",
              y: "-50%",
              width: vp.w,
              height: vp.h,
            }}
            className="absolute left-1/2 top-1/2 flex origin-center flex-col justify-end gap-6 p-6 sm:p-10"
          >
            <div className="flex w-full overflow-hidden">
              <div
                className="animate-marquee-x flex shrink-0 items-center gap-8"
                style={{ ["--marquee-duration" as string]: "26s" }}
              >
                {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map(
                  (word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className="display-title whitespace-nowrap text-2xl text-primary-foreground/85 sm:text-4xl"
                    >
                      {word}
                      <span className="ml-8 text-accent">&bull;</span>
                    </span>
                  ),
                )}
              </div>
            </div>
            <a
              href="#properties"
              className="glass-panel inline-flex w-fit rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground transition-transform duration-300 hover:scale-105"
            >
              Explore Homes
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}