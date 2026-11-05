"use client";

import { Flame, Sparkles } from "lucide-react";
import { LetterReveal, Reveal } from "./motion-primitives";

export function BrandIntro() {
  return (
    <section
      id="about-intro"
      aria-label="Welcome to Antera Realty"
      className="relative overflow-hidden bg-gradient-to-b from-[#120B1C] via-[#160E24] to-[#0E0818] py-24 text-white sm:py-32"
    >
      {/* 1. Festive Rangoli Watermark Accent in the background */}
      <div className="pointer-events-none absolute right-[-80px] top-1/2 -translate-y-1/2 h-[450px] w-[450px] opacity-[0.06] select-none">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full text-[#D4AF37] animate-[spin_120s_linear_infinite]"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </svg>
      </div>

      {/* Ambient Diwali warmth */}
      <div className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-10 right-1/4 h-80 w-80 rounded-full bg-[#4A1428]/20 blur-[120px]" />

      {/* Decorative top transition divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          {/* Left Column: Heading & Golden Divider */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#1A112C]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F6D88B] backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 text-[#FFB547] animate-pulse" />
                <span>Welcome to Antera</span>
                <span className="mx-1 h-1 w-1 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] text-[#FFF5E6]/70">Diwali Vision</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight text-white">
                We Don't Just Sell Plots.
                <span className="mt-2 block bg-gradient-to-r from-[#FFF5E6] via-[#FFD700] to-[#FF9E2C] bg-clip-text text-transparent filter drop-shadow-[0_2px_12px_rgba(255,181,71,0.3)]">
                  We Identify Tomorrow's Addresses.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-0.5 w-24 bg-gradient-to-r from-[#D4AF37] to-[#FFB547]" />
                <Sparkles className="h-4 w-4 text-[#FFD700]" />
                <div className="h-0.5 w-12 bg-gradient-to-r from-[#FFB547] to-transparent" />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Preserved Narrative with Festive Typography */}
          <div className="flex flex-col gap-6 text-sm leading-relaxed text-[#FFF5E6]/85 sm:text-base font-light">
            <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#181028]/60 p-6 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <LetterReveal text="At Antera Realty, we believe land is more than an asset - it is the foundation for your future." />
            </div>

            <Reveal delay={0.08}>
              <p>
                We bring together carefully selected plotted developments across Hyderabad's
                emerging growth corridors, focusing on strategic connectivity, planned
                infrastructure, lifestyle amenities and investment potential.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p>
                Whether you're looking to build your future home or secure land for tomorrow, our
                goal is simple:
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#1E1332] via-[#2A163B] to-[#1E1332] p-6 shadow-[0_0_35px_rgba(212,175,55,0.18)]">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-4 w-4 text-[#FFB547]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F6D88B]">
                    Our Promise
                  </span>
                </div>
                <p className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                  Help you make a more informed real-estate decision.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Decorative bottom transition divider smoothly merging into remaining sections */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </section>
  );
}
