"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { LOCATION_POINTS, MAPS_URL } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { CtaLink, Eyebrow, Section } from "./ui";

export function LocationAdvantage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 80,
    damping: 24,
  });

  return (
    <Section id="location" tone="light">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>Location Advantage</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-3xl">
            Connected to Today.
            <span className="block text-royal">Positioned for Tomorrow.</span>
          </h2>
        </Reveal>
      </div>

      <div ref={ref} className="relative mt-14 pl-8 sm:pl-12">
        <div className="absolute bottom-0 left-2 top-0 w-px bg-border sm:left-4">
          <motion.div style={{ height }} className="w-px bg-accent" />
        </div>

        {LOCATION_POINTS.map((point, i) => (
          <Reveal key={point.index} delay={(i % 4) * 0.04} y={20}>
            <div className="relative flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-border py-6">
              <span className="absolute -left-8 top-8 h-2 w-2 rounded-full bg-accent sm:-left-[2.6rem]" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">
                {point.index}
              </span>
              <span className="display-title min-w-24 text-xl text-accent">{point.time}</span>
              <span className="display-title flex-1 text-xl sm:text-2xl">{point.place}</span>
              <span className="font-mono text-xs text-muted-foreground">{point.distance}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <CtaLink href={MAPS_URL} target="_blank" variant="navy" arrow>
          Open in Google Maps
        </CtaLink>
      </div>
    </Section>
  );
}