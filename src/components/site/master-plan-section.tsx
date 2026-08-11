"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";

import { ASSETS } from "@/lib/assets";
import { Reveal } from "./motion-primitives";
import { CtaLink, Eyebrow, Section } from "./ui";

export function MasterPlanSection() {
  const [open, setOpen] = useState(false);

  return (
    <Section id="master-plan" tone="cream">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow>Master Plan</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="big-title">
              Designed Around
              <span className="block text-royal">Space, Access &amp; Community.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore the Avatar 2 master plan and discover the project's plotted zones, internal
              road network, clubhouse area, landscaped spaces, entrance and future development
              areas. The plan identifies regular, mortgage and booked plots while showing the
              clubhouse, entrance arch, Phase 2 areas and surrounding road connectivity.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                View Master Plan
              </button>
              <CtaLink href="tel:+919985358899" variant="navy">
                Check Available Plots
              </CtaLink>
              <CtaLink href={ASSETS.masterPlan} variant="outline" download>
                Download Layout
              </CtaLink>
              <CtaLink href="tel:+919985358899" variant="outline">
                Talk to an Advisor
              </CtaLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the Avatar 2 master plan full screen"
            className="group block w-full overflow-hidden rounded-3xl border border-border bg-card"
          >
            <img
              src={ASSETS.masterPlan}
              alt="Aspirealty Avatar 2 master plan layout"
              loading="lazy"
              className="w-full transition-transform duration-[1200ms] group-hover:scale-[1.04]"
            />
          </button>
        </Reveal>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-primary/95 p-4"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close master plan"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={ASSETS.masterPlan}
              alt="Aspirealty Avatar 2 master plan layout, full screen"
              className="max-h-[88vh] w-auto max-w-full cursor-zoom-out overflow-auto rounded-xl"
              onClick={() => setOpen(false)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}