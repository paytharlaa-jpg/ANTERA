"use client";

import { SPORTS } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";
import { motion } from "motion/react";

const INDOOR_IMAGES = [
  "/Sports Zone/Indoor Sports/Table Tennis.jpg",
  "/Sports Zone/Indoor Sports/snooker.webp",
  "/Sports Zone/Indoor Sports/carroms.jpg",
  "/Sports Zone/Indoor Sports/Chess.jpeg"
];

const OUTDOOR_IMAGES = [
  "/Sports Zone/Outdoor Sports/Basketball Court.jpg",
  "/Sports Zone/Outdoor Sports/Tennis Court.jpg",
  "/Sports Zone/Outdoor Sports/Box Cricket.jpg",
  "/Sports Zone/Outdoor Sports/Beach Volleyball.jpg",
  "/Sports Zone/Outdoor Sports/Children's Play Area.jpg",
  "/Sports Zone/Outdoor Sports/Bonfire Area.jpg"
];

function ImageMarquee({ images, direction = "left", duration = "40s" }: { images: string[], direction?: "left" | "right", duration?: string }) {
  const marqueeClass = direction === "left" ? "animate-marquee-x" : "animate-marquee-x-reverse";
  return (
    <div className="relative mt-8 flex w-full overflow-hidden rounded-2xl">
      <div 
        className={`${marqueeClass} flex shrink-0 items-center gap-4`} 
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-48 w-72 shrink-0 overflow-hidden rounded-xl bg-muted/20 sm:h-64 sm:w-96">
            <img src={src} alt="Sports" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
        ))}
      </div>
    </div>
  );
}

function List({ title, items, images, direction = "left" }: { title: string; items: readonly string[]; images: string[]; direction?: "left" | "right" }) {
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <Eyebrow tone="dark">{title}</Eyebrow>
      <ul className="flex flex-col divide-y divide-primary-foreground/12">
        {items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-4 py-4">
            <span className="font-mono text-[0.66rem] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="display-title text-xl sm:text-2xl">{item}</span>
          </li>
        ))}
      </ul>
      <ImageMarquee images={images} direction={direction} />
    </div>
  );
}

export function SportsSection() {
  return (
    <Section id="sports" tone="dark" className="overflow-hidden">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow tone="dark">Sports Zone</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title">
            Play More.
            <span className="block text-accent">Live More.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <List title="Indoor Sports" items={SPORTS.indoor} images={INDOOR_IMAGES} direction="left" />
        </Reveal>
        <Reveal delay={0.08}>
          <List title="Outdoor Sports" items={SPORTS.outdoor} images={OUTDOOR_IMAGES} direction="right" />
        </Reveal>
      </div>
    </Section>
  );
}