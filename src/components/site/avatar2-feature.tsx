"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { ASSETS } from "@/lib/assets";
import { Reveal } from "./motion-primitives";
import { CtaLink, Eyebrow, Section } from "./ui";

export function Avatar2Feature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <Section id="avatar-2" tone="light">
      <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <motion.img
            src={ASSETS.houses.water}
            alt="Aspirealty Avatar 2 community visualisation"
            loading="lazy"
            style={{ y: imageY, scale: imageScale }}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent p-7">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">
              Karkalpahad &middot; Srisailam Highway
            </p>
            <p className="display-title mt-2 text-2xl text-primary-foreground">
              Aspirealty Avatar 2
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow>Featured Development</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="big-title">
              Where Connectivity
              <span className="block text-royal">Meets Community Living.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Located close to the Srisailam Highway corridor, Avatar 2 brings together plotted
              development, lifestyle amenities, sports infrastructure and landscaped community
              spaces.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Its project material places it approximately 550 metres / 1 minute from Srisailam
              Highway, 3.6 km from the 330-ft Ratan Tata Greenfield Road, 11.9 km from the Regional
              Ring Road and 11.7 km from Bharath Future City.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-wrap gap-3">
              <CtaLink href="/projects/avatar-2" variant="navy" arrow>
                View Project
              </CtaLink>
              <CtaLink href="#pricing" variant="outline">
                Get Price Details
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}