"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Sparkles, Flame, ShieldCheck, MapPin } from "lucide-react";
import { useRef, useState } from "react";

import { ASSETS } from "@/lib/assets";
import { HeroCanvas } from "./HeroCanvas";

export function DiwaliHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [diyaSparks, setDiyaSparks] = useState<number | null>(null);

  // 1. Scroll-driven progress across the pinned container duration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Line-by-line scroll-driven upward transforms (from bottom to top)
  // Eyebrow pill
  const pillY = useTransform(scrollYProgress, [0, 0.14], [25, 0]);
  const pillOpacity = useTransform(scrollYProgress, [0, 0.14], [0.35, 1]);

  // Headline Line 1: "This Diwali,"
  const line1Y = useTransform(scrollYProgress, [0.08, 0.26], [45, 0]);
  const line1Opacity = useTransform(scrollYProgress, [0.08, 0.24], [0.2, 1]);

  // Headline Line 2: "Let Your Dreams"
  const line2Y = useTransform(scrollYProgress, [0.22, 0.44], [50, 0]);
  const line2Opacity = useTransform(scrollYProgress, [0.22, 0.4], [0, 1]);

  // Headline Line 3: "Find Their Light."
  const line3Y = useTransform(scrollYProgress, [0.38, 0.58], [55, 0]);
  const line3Opacity = useTransform(scrollYProgress, [0.38, 0.54], [0, 1]);

  // Supporting copy paragraph
  const copyY = useTransform(scrollYProgress, [0.52, 0.72], [45, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 1]);

  // CTA buttons
  const ctaY = useTransform(scrollYProgress, [0.66, 0.86], [40, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.66, 0.82], [0, 1]);

  // Interactive hint & bottom stats bar
  const hintOpacity = useTransform(scrollYProgress, [0.74, 0.9], [0.4, 1]);

  // Right-side villa image subtle scroll elevation and parallax
  const villaY = useTransform(scrollYProgress, [0, 0.85], [10, -22]);
  const villaScale = useTransform(scrollYProgress, [0, 0.85], [0.98, 1.02]);

  // Scroll indicator pulse (fades out as user scrolls)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const handleDiyaClick = (id: number) => {
    setDiyaSparks(id);
    setTimeout(() => setDiyaSparks(null), 2000);
  };

  return (
    // Outer scroll container controlling pinned scroll timeline (180vh on mobile, 240vh on desktop)
    <div
      ref={containerRef}
      id="top"
      className="relative h-[190vh] sm:h-[220vh] lg:h-[240vh] w-full"
      aria-label="Antera Realty Grand Diwali Experience"
    >
      {/* Sticky/Pinned Viewport that remains locked until scroll animation completes */}
      <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-[#07040C] via-[#11071B] to-[#1A0B26] pb-3 pt-16 sm:pb-6 sm:pt-22 lg:pt-28 text-white px-3 sm:px-6 lg:px-8">
        {/* Interactive Fireworks & Golden Particle Canvas */}
        <HeroCanvas />

        {/* Golden Mandala Halo Watermark (Slow Ambient Rotation) */}
        <div className="pointer-events-none absolute right-[-15%] sm:right-[-10%] top-[8%] sm:top-[10%] h-[450px] sm:h-[650px] w-[450px] sm:w-[650px] -translate-y-1/4 opacity-[0.08] select-none lg:right-[4%]">
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full text-[#D4AF37] animate-[spin_160s_linear_infinite]"
          >
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle
              cx="100"
              cy="100"
              r="82"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
            <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="32" fill="none" stroke="currentColor" strokeWidth="1" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="100"
                y1="100"
                x2={100 + 90 * Math.cos((deg * Math.PI) / 180)}
                y2={100 + 90 * Math.sin((deg * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="0.6"
              />
            ))}
          </svg>
        </div>

        {/* Ambient Sky Glows */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[350px] sm:h-[500px] w-[500px] sm:w-[800px] rounded-full bg-gradient-to-b from-[#D4AF37]/10 via-[#FFB547]/5 to-transparent blur-[100px] sm:blur-[120px]" />
        <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-[250px] sm:h-[400px] w-[250px] sm:w-[400px] rounded-full bg-[#4A1428]/25 blur-[100px] sm:blur-[130px]" />

        {/* Main Hero Layout (Flex on mobile, 12-col grid on desktop) */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-7xl">
          <div className="flex flex-col items-center lg:grid lg:grid-cols-12 lg:items-center gap-2 sm:gap-4 lg:gap-8">
            {/* Left Column: Scroll-Driven Line-by-Line Animated Text */}
            <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left w-full">
              {/* Line 0: Festive Eyebrow Pill */}
              <motion.div
                style={{ y: pillY, opacity: pillOpacity }}
                className="mb-1.5 sm:mb-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#D4AF37]/45 bg-[#170C24]/85 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#F6D88B] shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-md"
              >
                <Flame className="h-3 sm:h-4 w-3 sm:w-4 text-[#FFB547] animate-pulse" />
                <span>Shubh Deepavali 2026</span>
                <span className="mx-0.5 h-1 w-1 rounded-full bg-[#D4AF37]" />
                <span className="text-[9px] sm:text-[10px] text-[#FFF5E6]/75">
                  The Antera Standard
                </span>
              </motion.div>

              {/* Headline: Animated Upward Line by Line */}
              <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight text-white">
                {/* Line 1 */}
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    style={{ y: line1Y, opacity: line1Opacity }}
                    className="block text-white"
                  >
                    This Diwali,
                  </motion.span>
                </span>

                {/* Line 2 */}
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    style={{ y: line2Y, opacity: line2Opacity }}
                    className="block bg-gradient-to-r from-[#FFF8DC] via-[#FFD700] to-[#FF9E2C] bg-clip-text text-transparent filter drop-shadow-[0_4px_25px_rgba(255,181,71,0.45)]"
                  >
                    Let Your Dreams
                  </motion.span>
                </span>

                {/* Line 3 */}
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    style={{ y: line3Y, opacity: line3Opacity }}
                    className="block font-serif font-normal italic text-[#F6D88B]"
                  >
                    Find Their Light.
                  </motion.span>
                </span>
              </h1>

              {/* Line 4: Supporting Copy */}
              <div className="overflow-hidden">
                <motion.p
                  style={{ y: copyY, opacity: copyOpacity }}
                  className="mt-2 sm:mt-4 max-w-sm sm:max-w-lg text-xs leading-relaxed text-[#FFF5E6]/85 sm:text-base font-light line-clamp-2 sm:line-clamp-none"
                >
                  Celebrate new beginnings, brighter possibilities, and the joy of discovering a
                  place to call home with{" "}
                  <span className="font-semibold text-[#FFD700]">Antera Realty</span>.
                </motion.p>
              </div>

              {/* Line 5: CTA Buttons */}
              <motion.div
                style={{ y: ctaY, opacity: ctaOpacity }}
                className="mt-3.5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 sm:justify-start"
              >
                {/* Primary CTA (Exact text: Discover Your Dream Home) */}
                <a
                  href="#properties"
                  className="group relative inline-flex h-11 sm:h-13 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#FF9E2C] px-5 sm:px-7 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#100C18] shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,181,71,0.7)] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  <span className="relative z-10">Discover Your Dream Home</span>
                  <ArrowUpRight className="relative z-10 h-3.5 sm:h-4 w-3.5 sm:w-4 transition-transform group-hover:rotate-45" />
                </a>

                {/* Secondary CTA */}
                <a
                  href="tel:+919985358899"
                  className="inline-flex h-11 sm:h-13 items-center gap-1.5 sm:gap-2 rounded-full border border-[#D4AF37]/50 bg-[#170E24]/80 px-4 sm:px-5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#F6D88B] backdrop-blur-md transition-all hover:border-[#D4AF37] hover:bg-[#25153A] hover:text-white"
                >
                  <span>Talk to an Advisor</span>
                </a>
              </motion.div>

              {/* Interactive hint & Scroll prompt */}
              <div className="flex flex-col items-center sm:items-start gap-1 mt-2 sm:mt-4">
                <motion.div
                  style={{ opacity: hintOpacity }}
                  className="hidden sm:flex items-center gap-1.5 text-xs text-[#F6D88B]/70"
                >
                  <Sparkles className="h-3 w-3 text-[#FFB547]" />
                  <span>Tap anywhere in the night sky to launch celebratory fireworks</span>
                </motion.div>

                <motion.div
                  style={{ opacity: scrollIndicatorOpacity }}
                  className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#FFD700]/75 animate-pulse"
                >
                  <span>↓ Scroll down to reveal</span>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Architectural Centerpiece shifted "little upside" with subtle parallax */}
            <div className="relative flex justify-center lg:col-span-6 w-full my-1 sm:my-2 lg:my-0 -translate-y-1 sm:-translate-y-4 lg:-translate-y-12">
              {/* Golden Ambient Halo */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-t from-[#D4AF37]/25 via-[#FF9E2C]/10 to-transparent blur-xl sm:blur-2xl" />

              {/* Villa Showcase Stage */}
              <motion.div
                style={{ y: villaY, scale: villaScale }}
                className="relative w-full max-w-[260px] xs:max-w-[290px] sm:max-w-md lg:max-w-xl"
              >
                {/* Architecture Render Frame */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#180E28]/85 to-[#0F071A]/95 p-1.5 sm:p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#0B0514]">
                    <img
                      src={ASSETS.heroHouse}
                      alt="Antera Realty Luxury Estate"
                      className="w-full object-contain filter drop-shadow-[0_10px_30px_rgba(255,181,71,0.35)] transition-transform duration-700 hover:scale-[1.02]"
                    />

                    {/* Warm festive lighting overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#150A22] via-transparent to-transparent opacity-80" />

                    {/* Floating Highlight 1: Avatar 2 */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 rounded-xl sm:rounded-2xl border border-[#D4AF37]/50 bg-[#12081E]/90 px-2 py-1 sm:px-3 sm:py-1.5 shadow-xl backdrop-blur-md">
                      <MapPin className="h-2.5 sm:h-3.5 w-2.5 sm:w-3.5 text-[#FFB547]" />
                      <div className="flex flex-col text-left">
                        <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#F6D88B]">
                          Avatar 2
                        </span>
                        <span className="text-[7px] sm:text-[9px] text-[#FFF5E6]/75">
                          Srisailam Hwy • From ₹15,500/yd
                        </span>
                      </div>
                    </div>

                    {/* Floating Highlight 2: TG RERA Approved */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1.5 rounded-xl sm:rounded-2xl border border-[#D4AF37]/50 bg-[#12081E]/90 px-2 py-1 sm:px-3 sm:py-1.5 shadow-xl backdrop-blur-md">
                      <ShieldCheck className="h-2.5 sm:h-3.5 w-2.5 sm:w-3.5 text-[#FFD700]" />
                      <div className="flex flex-col text-left">
                        <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#F6D88B]">
                          TG RERA Approved
                        </span>
                        <span className="text-[7px] sm:text-[9px] text-[#FFF5E6]/75">
                          Clear Title Land
                        </span>
                      </div>
                    </div>

                    {/* Bottom Terrace Decorative Row of Interactive Diyas */}
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-[#D4AF37]/30 bg-gradient-to-t from-[#0A0512] to-[#140822]/90 px-2 py-1.5 sm:px-3 sm:py-2.5">
                      {[1, 2, 3, 4, 5].map((diyaId) => (
                        <button
                          key={diyaId}
                          type="button"
                          onClick={() => handleDiyaClick(diyaId)}
                          className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-125 focus:outline-none"
                          aria-label={`Light Diya ${diyaId}`}
                        >
                          {/* Diya Flame */}
                          <div className="relative flex items-center justify-center">
                            <span className="absolute -top-2.5 h-4 w-4 rounded-full bg-[#FFA028]/30 blur-sm group-hover:bg-[#FFD700]/50" />
                            <Flame className="h-3.5 sm:h-4.5 w-3.5 sm:w-4.5 text-[#FFB547] group-hover:text-[#FFD700] transition-colors filter drop-shadow-[0_0_8px_rgba(255,181,71,0.9)] animate-pulse" />
                          </div>
                          {/* Traditional Brass Diya Base */}
                          <div className="h-1.5 sm:h-2 w-4 sm:w-5.5 rounded-b-full bg-gradient-to-r from-[#9E5828] via-[#D4AF37] to-[#9E5828] shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />

                          {/* Celebratory Sparkler burst on click */}
                          {diyaSparks === diyaId && (
                            <div className="pointer-events-none absolute -top-7 text-[10px] font-bold text-[#FFD700] animate-bounce whitespace-nowrap">
                              ✨ Shubh Deepavali!
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar (Preserving All Antera Metrics with Luxury Gold Glassmorphism) */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 rounded-xl sm:rounded-full border border-[#D4AF37]/35 bg-[#140922]/85 px-3 py-1.5 sm:px-6 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl md:flex-nowrap">
            {/* Status Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFB547] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]" />
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-[#F6D88B]">
                Diwali Festive Offerings Active
              </span>
            </div>

            {/* Antera Project Metrics */}
            <div className="flex items-center gap-2.5 sm:gap-6">
              <div className="flex flex-col text-right">
                <span className="text-[11px] sm:text-sm font-bold text-white">150+</span>
                <span className="text-[7px] sm:text-[9px] uppercase tracking-widest text-[#FFF5E6]/60">
                  Acres Developed
                </span>
              </div>

              <div className="h-5 sm:h-6 w-px bg-[#D4AF37]/30" />

              <div className="flex flex-col text-right">
                <span className="text-[11px] sm:text-sm font-bold text-[#FFD700]">TG RERA</span>
                <span className="text-[7px] sm:text-[9px] uppercase tracking-widest text-[#FFF5E6]/60">
                  Approved Layouts
                </span>
              </div>

              <div className="h-5 sm:h-6 w-px bg-[#D4AF37]/30" />

              <div className="flex flex-col text-right">
                <span className="text-[11px] sm:text-sm font-bold text-white">Award Winning</span>
                <span className="text-[7px] sm:text-[9px] uppercase tracking-widest text-[#FFF5E6]/60">
                  Architecture
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
