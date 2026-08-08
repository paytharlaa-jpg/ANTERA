"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { ASSETS } from "@/lib/assets";
import { Reveal } from "./motion-primitives";
import { CtaLink, Eyebrow } from "./ui";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary px-6 py-32 text-primary-foreground">
      <motion.img
        src={ASSETS.map}
        alt=""
        style={{ y: bgY }}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-[116%] w-full object-cover opacity-15"
      />
      <motion.div
        style={{ x: lineX }}
        className="pointer-events-none absolute inset-y-0 -left-1/4 w-[150%] opacity-40"
      >
        <div className="absolute top-1/3 h-px w-full bg-accent/50" />
        <div className="absolute top-1/2 h-px w-full bg-primary-foreground/20" />
        <div className="absolute top-2/3 h-px w-full bg-accent/30" />
      </motion.div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <Reveal>
          <Eyebrow tone="dark">Your next address may start here.</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title">
            Don't Just Watch
            <span className="block">Hyderabad Grow.</span>
            <span className="block text-accent">Own a Part of Where It's Going.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="flex flex-wrap justify-center gap-3">
            <CtaLink href="#projects" variant="accent">
              Explore Projects
            </CtaLink>
            <CtaLink href="#site-visit" variant="ghost-dark" arrow>
              Book a Site Visit
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}