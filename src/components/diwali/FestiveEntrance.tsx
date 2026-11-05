"use client";

import { motion } from "motion/react";

export function FestiveEntrance() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none">
      {/* 1. Subtle Golden Jali Architectural Arch in top corners */}
      <div className="absolute top-0 left-0 h-44 w-44 md:h-64 md:w-64 opacity-25">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full text-[#D4AF37]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M0 0 Q 100 0 200 100 Q 100 200 0 200 Z" />
          <path d="M0 0 Q 70 0 140 70 Q 70 140 0 140 Z" />
          <path d="M0 0 Q 40 0 80 40 Q 40 80 0 80 Z" />
          <circle cx="100" cy="100" r="18" fill="rgba(212,175,55,0.15)" />
          <circle cx="50" cy="50" r="10" fill="rgba(255,181,71,0.2)" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 h-44 w-44 md:h-64 md:w-64 -scale-x-100 opacity-25">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full text-[#D4AF37]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M0 0 Q 100 0 200 100 Q 100 200 0 200 Z" />
          <path d="M0 0 Q 70 0 140 70 Q 70 140 0 140 Z" />
          <path d="M0 0 Q 40 0 80 40 Q 40 80 0 80 Z" />
          <circle cx="100" cy="100" r="18" fill="rgba(212,175,55,0.15)" />
          <circle cx="50" cy="50" r="10" fill="rgba(255,181,71,0.2)" />
        </svg>
      </div>

      {/* 2. Traditional Marigold Toran Garland Swags along the top */}
      <div className="absolute top-0 inset-x-0 flex justify-center opacity-70">
        <svg
          viewBox="0 0 1200 70"
          className="w-full max-w-7xl h-12 md:h-16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Swag 1 */}
          <path d="M50 0 Q 250 55 450 0" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 6" />
          {/* Swag 2 */}
          <path
            d="M400 0 Q 600 65 800 0"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeDasharray="4 6"
          />
          {/* Swag 3 */}
          <path d="M750 0 Q 950 55 1150 0" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 6" />

          {/* Marigold flower clusters */}
          {[100, 180, 250, 320, 400, 500, 600, 700, 800, 880, 950, 1020, 1100].map((cx, idx) => {
            const cy =
              idx < 4
                ? Math.sin(((cx - 50) / 400) * Math.PI) * 45 + 5
                : idx < 9
                  ? Math.sin(((cx - 400) / 400) * Math.PI) * 55 + 5
                  : Math.sin(((cx - 750) / 400) * Math.PI) * 45 + 5;

            const isYellow = idx % 2 === 0;
            return (
              <g key={idx} className="transition-transform duration-500 hover:scale-125">
                {/* Outer petals */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={idx === 6 ? 12 : 9}
                  fill={isYellow ? "#FFAE19" : "#E85D04"}
                  opacity="0.9"
                />
                {/* Inner petal highlights */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={idx === 6 ? 6 : 4.5}
                  fill={isYellow ? "#FFDD00" : "#FF9E00"}
                />
                {/* Golden drop bead */}
                <line x1={cx} y1={cy + 8} x2={cx} y2={cy + 18} stroke="#D4AF37" strokeWidth="1.2" />
                <circle cx={cx} cy={cy + 19} r="2.5" fill="#FFD700" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* 3. Subtle Ambient Golden Ray from the sky */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-b from-[#D4AF37]/15 via-[#FFB547]/5 to-transparent blur-3xl pointer-events-none" />

      {/* 4. Left and Right Diya Lantern accents */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-6 hidden md:flex flex-col items-center opacity-85"
      >
        <div className="h-14 w-px bg-gradient-to-b from-[#D4AF37] to-[#FFB547]" />
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37] bg-[#100C18]/90 shadow-[0_0_15px_rgba(255,181,71,0.6)]">
          <div className="h-3 w-3 rounded-full bg-[#FFA028] animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-[#FFD700]/20 animate-ping" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-28 right-6 hidden md:flex flex-col items-center opacity-85"
      >
        <div className="h-16 w-px bg-gradient-to-b from-[#D4AF37] to-[#FFB547]" />
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37] bg-[#100C18]/90 shadow-[0_0_15px_rgba(255,181,71,0.6)]">
          <div className="h-3 w-3 rounded-full bg-[#FFA028] animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-[#FFD700]/20 animate-ping" />
        </div>
      </motion.div>
    </div>
  );
}
