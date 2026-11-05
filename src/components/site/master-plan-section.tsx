"use client";

import { AnimatePresence, motion } from "motion/react";
import { X, Sparkles, ZoomIn, Download, Phone, Flame } from "lucide-react";
import { useState } from "react";

import { ASSETS } from "@/lib/assets";
import { Reveal } from "./motion-primitives";

export function MasterPlanSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="master-plan"
      aria-label="Avatar 2 Master Plan"
      className="relative overflow-hidden bg-gradient-to-b from-[#0A0714] via-[#140D22] to-[#120B1C] py-24 text-white sm:py-32"
    >
      {/* 1. Festive Ambient Glows & Background Golden Accents */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[#4A1428]/25 blur-[140px]" />

      {/* Decorative top transition divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left Column: Details & Festive CTAs */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#1B122C]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F6D88B] backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 text-[#FFB547] animate-pulse" />
                <span>Diwali Festive Showcase • Master Plan</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white">
                Designed Around
                <span className="mt-2 block bg-gradient-to-r from-[#FFF5E6] via-[#FFD700] to-[#FF9E2C] bg-clip-text text-transparent filter drop-shadow-[0_2px_12px_rgba(255,181,71,0.3)]">
                  Space, Access &amp; Community.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-[#FFF5E6]/80 sm:text-base font-light">
                Explore the Avatar 2 master plan and discover the project's plotted zones, internal
                road network, clubhouse area, landscaped spaces, entrance and future development
                areas. The plan identifies regular, mortgage and booked plots while showing the
                clubhouse, entrance arch, Phase 2 areas and surrounding road connectivity.
              </p>
            </Reveal>

            {/* Festive Highlights Badges */}
            <Reveal delay={0.12}>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <span className="rounded-full border border-[#D4AF37]/30 bg-[#160E24]/70 px-3 py-1 text-[11px] font-semibold text-[#F6D88B]">
                  ✦ 17 Acres Proposed Extent
                </span>
                <span className="rounded-full border border-[#D4AF37]/30 bg-[#160E24]/70 px-3 py-1 text-[11px] font-semibold text-[#F6D88B]">
                  ✦ 550M from Srisailam Hwy
                </span>
                <span className="rounded-full border border-[#D4AF37]/30 bg-[#160E24]/70 px-3 py-1 text-[11px] font-semibold text-[#F6D88B]">
                  ✦ Clubhouse &amp; Sports Zone
                </span>
              </div>
            </Reveal>

            {/* Preserved CTAs with Festive Gold Styling */}
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#FF9E2C] px-6 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#100C18] shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,181,71,0.6)] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                >
                  <ZoomIn className="h-4 w-4 text-[#100C18]" />
                  <span>View Master Plan</span>
                </button>

                <a
                  href="tel:+919985358899"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#1E1432]/90 px-6 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#F6D88B] backdrop-blur-md transition-all hover:bg-[#2A1B45] hover:text-white hover:border-[#D4AF37]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#FFB547]" />
                  <span>Check Available Plots</span>
                </a>

                <a
                  href={ASSETS.masterPlan}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md transition-all hover:border-[#D4AF37]/60 hover:bg-white/10 hover:text-[#FFD700]"
                >
                  <Download className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Download Layout</span>
                </a>

                <a
                  href="tel:+919985358899"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md transition-all hover:border-[#D4AF37]/60 hover:bg-white/10 hover:text-[#FFD700]"
                >
                  <span>Talk to an Advisor</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Master Plan Visual with Golden Frame & Diya Accents */}
          <Reveal delay={0.08}>
            <div className="relative group">
              {/* Golden Ambient Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#D4AF37]/40 via-[#FFB547]/30 to-[#4A1428]/40 blur-xl opacity-75 transition-opacity duration-700 group-hover:opacity-100" />

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open the Avatar 2 master plan full screen"
                className="relative block w-full overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-[#120C1C] p-2 transition-all duration-500 hover:border-[#FFD700] hover:shadow-[0_0_35px_rgba(212,175,55,0.3)] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={ASSETS.masterPlan}
                    alt="Aspirealty Avatar 2 master plan layout"
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />

                  {/* Corner Diya/Sparkle Accents */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-[#100C18]/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F6D88B] backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-[#FFB547]" />
                    <span>Click to Zoom</span>
                  </div>

                  {/* Bottom Golden Ribbon */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0714] via-[#0A0714]/80 to-transparent p-4 text-left">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFB547]">
                      Avatar 2 Plotted Layout • Phase 1 &amp; Phase 2
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      Approved RERA Master Plan Blueprint
                    </h3>
                  </div>
                </div>
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full-Screen Master Plan Modal */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0714]/95 p-4 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close master plan"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#1A122A] text-[#F6D88B] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:bg-[#D4AF37] hover:text-[#100C18] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[88vh] max-w-5xl overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#120C1C] p-2 shadow-2xl"
            >
              <img
                src={ASSETS.masterPlan}
                alt="Aspirealty Avatar 2 master plan layout, full screen"
                className="max-h-[84vh] w-auto max-w-full cursor-zoom-out rounded-xl object-contain"
                onClick={() => setOpen(false)}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
