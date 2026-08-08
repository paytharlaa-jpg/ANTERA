"use client";

import { GALLERY } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function GallerySection() {
  return (
    <Section id="gallery" tone="cream">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>Gallery</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-2xl">A Closer Look at Our Developments.</h2>
        </Reveal>
      </div>

      <div className="mt-12 grid auto-rows-[13rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] lg:grid-cols-4">
        {GALLERY.map((src, i) => (
          <ScaleReveal
            key={src}
            delay={(i % 4) * 0.05}
            className={i % 5 === 0 ? "row-span-2" : ""}
          >
            <div className="h-full overflow-hidden rounded-2xl border border-border">
              <img
                src={src}
                alt="Antera Realty project visualisation"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-110"
              />
            </div>
          </ScaleReveal>
        ))}
      </div>
    </Section>
  );
}