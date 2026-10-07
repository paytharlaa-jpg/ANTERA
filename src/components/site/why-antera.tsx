"use client";

import { MapPin, ShieldCheck, TrendingUp, Handshake } from "lucide-react";
import { WHY_ANTERA } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { Section } from "./ui";

const BENTO_ICONS = [MapPin, ShieldCheck, TrendingUp, Handshake];

export function WhyAntera() {
  return (
    <Section id="why-antera" className="bg-[#EFECE6] py-24">
      <div className="flex w-full max-w-7xl mx-auto flex-col gap-6 px-4 md:px-8">
        <Reveal>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/50">
            <span className="h-2 w-2 rounded-full bg-orange-500"></span>
            <span>Why Antera Realty</span>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter text-black max-w-3xl">
            Real Estate Decisions <br className="hidden md:block" />
            <span className="text-black/40 italic">Built Around What Matters.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 w-full max-w-7xl mx-auto px-4 md:px-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {WHY_ANTERA.map((item, i) => {
          const Icon = BENTO_ICONS[i];
          // Bento layout logic: 1st and 4th items span 2 columns on desktop
          const isLarge = i === 0 || i === 3;
          
          return (
            <ScaleReveal 
              key={item.index} 
              delay={i * 0.1}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-8 sm:p-10 shadow-xl shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border border-black/5 ${
                isLarge ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
              
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFECE6] text-orange-500 transition-transform duration-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-4xl font-light text-black/10 transition-colors duration-500 group-hover:text-orange-500/20">
                  {item.index}
                </span>
              </div>
              
              <div className="relative z-10 flex flex-col gap-4 mt-auto">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-black group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-black/60 max-w-md">
                  {item.copy}
                </p>
              </div>
            </ScaleReveal>
          );
        })}
      </div>
    </Section>
  );
}