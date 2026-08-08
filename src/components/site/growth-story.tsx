"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { GROWTH_WORDS } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { Eyebrow } from "./ui";

export function GrowthStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.15, 1], ["12%", "-58%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.12, 0.3], [1, 1, 0]);

  return (
    <section
      ref={ref}
      id="growth"
      className="relative bg-primary text-primary-foreground"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="hairline-grid pointer-events-none absolute inset-0 opacity-30" />

        <motion.div
          style={{ opacity: copyOpacity }}
          className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-6"
        >
          <Reveal>
            <Eyebrow tone="dark">The Growth Story</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="big-title">
              Invest Where Hyderabad
              <span className="block text-accent">Is Moving Next.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
              The Srisailam Highway&ndash;Future City corridor is becoming an important area to watch
              as major road connectivity, employment destinations, institutional development and
              urban expansion continue toward southern Hyderabad. For buyers, the opportunity isn't
              simply about purchasing a plot. It's about choosing where the next chapter of the city
              may unfold.
            </p>
          </Reveal>
        </motion.div>

        <motion.div style={{ x }} className="relative mt-10 flex w-max items-center gap-10 px-6">
          {GROWTH_WORDS.map((word, i) => (
            <span key={word} className="flex items-center gap-10">
              <span className="display-title whitespace-nowrap text-[14vw] leading-none text-primary-foreground/90">
                {word}
              </span>
              {i < GROWTH_WORDS.length - 1 ? (
                <span className="display-title text-[8vw] leading-none text-accent">&darr;</span>
              ) : null}
            </span>
          ))}
        </motion.div>

        <p className="relative mx-auto mt-8 w-full max-w-5xl px-6 text-xs text-primary-foreground/50">
          Future growth is presented as potential, not certainty. No appreciation or returns are
          guaranteed.
        </p>
      </div>
    </section>
  );
}