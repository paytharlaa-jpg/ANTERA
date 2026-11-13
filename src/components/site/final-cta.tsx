"use client";

import { ContourBackground } from "@/components/site/contour-background";
import { Phone } from "lucide-react";
import { useState } from "react";

import { ENQUIRY_PROJECTS, CONTACT } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { EnquiryForm } from "./enquiry-form";
import { ParallaxImage, Reveal, WordReveal } from "./motion-primitives";
import { buttonClass } from "./ui";

export function FinalCta({
  title = "Your next opportunity starts here.",
  defaultProject,
  image = "/projects/magnus/clubhouse/front-night.webp",
}: {
  title?: string;
  defaultProject?: (typeof ENQUIRY_PROJECTS)[number] | undefined;
  image?: string;
}) {
  const [mode, setMode] = useState<"contact" | "site-visit">("site-visit");
  return (
    <section
      id="enquire"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-24 text-primary-foreground sm:py-32"
    >
      <span id="contact" className="absolute top-0" aria-hidden />
      <ParallaxImage
        src={image}
        alt=""
        className="absolute inset-0 -z-10 opacity-30"
        strength={12}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      <ContourBackground className="-z-10" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-champagne">
              <span aria-hidden className="h-px w-8 bg-current opacity-70" /> Enquire
            </span>
          </Reveal>
          <WordReveal text={title} className="big-title text-balance" />
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-primary-foreground/70">
              Tell us what you’re looking for — a plot to build your home on, or land to hold for
              the long term — and a property consultant will help you shortlist, visit and decide.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/#projects" className={buttonClass("ghost-dark")}>
              Explore Projects
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} className={buttonClass("ghost-dark")}>
              <Phone className="h-4 w-4" /> Talk to Our Team
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-[2rem] border border-primary-foreground/12 bg-ink/60 p-6 backdrop-blur-xl sm:p-9">
            <div
              role="tablist"
              aria-label="Enquiry type"
              className="mb-7 inline-flex rounded-full border border-primary-foreground/15 p-1"
            >
              {(
                [
                  ["site-visit", "Book a Site Visit"],
                  ["contact", "Request Price Details"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  role="tab"
                  type="button"
                  aria-selected={mode === k}
                  onClick={() => setMode(k)}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-5",
                    mode === k
                      ? "bg-champagne text-ink"
                      : "text-primary-foreground/70 hover:text-primary-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <EnquiryForm key={mode} variant={mode} tone="dark" defaultProject={defaultProject} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
