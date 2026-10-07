"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { ASSETS } from "@/lib/assets";
import { Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "./motion-primitives";

export function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  // Total scroll height is 300vh to give enough time to scroll horizontally
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  // Use a spring for buttery smooth horizontal scrolling
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 1 });
  
  // Transform the vertical scroll progress into horizontal translation
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-65%"]);
  const textOpacity = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  const images = [
    ASSETS.houses.modern,
    ASSETS.houses.hillside,
    ASSETS.houses.glass,
    ASSETS.houses.modern, // Duplicating for extra track length
  ];

  return (
    <section ref={ref} id="showcase" className="relative bg-[#EFECE6] h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Fixed Text Section */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute top-0 left-0 w-full pt-32 lg:pt-40 px-4 md:px-8 z-20 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <Reveal>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/50">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span>Highlighted Lifestyle</span>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-tight tracking-tighter text-black max-w-4xl drop-shadow-sm">
                Modern homes, <br />
                <span className="text-black/40 italic">designed to live better.</span>
              </h2>
            </Reveal>
          </div>
        </motion.div>

        {/* Horizontally Scrolling Track */}
        <div className="relative mt-20 lg:mt-40 flex items-center z-10 pl-4 md:pl-8">
          <motion.div style={{ x }} className="flex gap-8 md:gap-16 items-center w-max">
            {images.map((src, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-[2rem] sm:rounded-[3xl] shadow-2xl shrink-0 border border-black/5"
                style={{ width: "80vw", maxWidth: "600px", height: "60vh", maxHeight: "500px" }}
              >
                <img
                  src={src}
                  alt={`Modern home design ${idx + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
            ))}
            
            {/* Final CTA Card at the end of the track */}
            <div className="relative flex flex-col items-center justify-center shrink-0 w-[40vw] max-w-[300px] h-[60vh] max-h-[500px] px-8 text-center gap-6">
              <h3 className="font-display text-3xl font-bold">Ready to <br/>explore?</h3>
              <a
                href="#properties"
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-110 hover:bg-orange-500 shadow-xl"
              >
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}