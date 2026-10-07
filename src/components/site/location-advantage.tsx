"use client";

import { MapPin, Navigation } from "lucide-react";
import { LOCATION_POINTS, MAPS_URL } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { Section } from "./ui";

export function LocationAdvantage() {
  return (
    <Section id="location" className="bg-[#050505] py-24 text-white relative overflow-hidden">
      {/* Background ambient glow to give it a cinematic feel */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="flex w-full max-w-7xl mx-auto flex-col gap-6 px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
                <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                <span>Location Advantage</span>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              {/* SEO optimized heading */}
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter text-white max-w-3xl">
                The Core of <br className="hidden md:block" />
                <span className="text-orange-500 italic">Bharat Future City.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                Positioned strategically on the Srisailam Highway corridor. 
                Everything from major IT clusters and the proposed Amazon Data Center to the Airport is just a short, congestion-free drive away.
              </p>
            </Reveal>
          </div>
          
          <Reveal delay={0.18}>
            <a 
              href={MAPS_URL} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-xs font-bold uppercase tracking-widest text-black transition-all hover:scale-105 hover:bg-orange-500 hover:text-white shadow-lg shrink-0"
            >
              <MapPin className="h-4 w-4" /> Open in Google Maps
            </a>
          </Reveal>
        </div>

        {/* Dashboard Grid for Distances */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {LOCATION_POINTS.map((point, i) => (
            <ScaleReveal key={point.index} delay={i * 0.05}>
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/5 p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-white/10">
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Navigation className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-orange-500/50 transition-colors">
                    {point.distance}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="font-display text-3xl font-bold text-orange-500 drop-shadow-md">
                    {point.time}
                  </span>
                  <h3 className="text-sm font-bold text-white/90 leading-snug">
                    {point.place}
                  </h3>
                </div>
                
              </div>
            </ScaleReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}