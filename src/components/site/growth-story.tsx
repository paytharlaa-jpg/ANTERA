"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { GROWTH_WORDS } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";

export function GrowthStory() {
  const ref = useRef<HTMLDivElement>(null);
  // Increased total scroll height to 600vh to give enough time to scroll all massive words
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  // Spring physics for smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 1 });
  
  // Transform scroll progress to vertical text movement (increased negative value to pull it all the way up)
  const y = useTransform(smoothProgress, [0, 1], ["60vh", "-380vh"]);
  
  // Fade out the title at the very end
  const fadeOut = useTransform(smoothProgress, [0.85, 1], [1, 0]);

  return (
    <section ref={ref} id="growth" className="relative bg-[#050505] h-[600vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Deep background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
        
        {/* Fixed Title */}
        <motion.div 
          style={{ opacity: fadeOut }}
          className="absolute top-20 md:top-32 left-1/2 -translate-x-1/2 text-center z-20 flex flex-col items-center gap-4 w-full px-4"
        >
           <Reveal>
             <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
               <span className="h-2 w-2 rounded-full bg-orange-500"></span>
               <span>The Growth Story</span>
               <span className="h-2 w-2 rounded-full bg-orange-500"></span>
             </div>
           </Reveal>
        </motion.div>

        {/* Scrolling Massive Typography */}
        <div className="absolute inset-0 z-10 w-full flex flex-col items-center justify-start pointer-events-none pt-[50vh]">
          <motion.div style={{ y }} className="flex flex-col items-center justify-start gap-20 sm:gap-32 w-full">
            {GROWTH_WORDS.map((word, i) => (
              <div key={word} className="flex flex-col items-center gap-20 sm:gap-32 shrink-0">
                <span className="font-display text-6xl sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-white drop-shadow-[0_0_40px_rgba(249,115,22,0.4)] text-center">
                  {word}
                </span>
                
                {/* Connecting glowing line */}
                {i < GROWTH_WORDS.length - 1 && (
                  <div className="h-24 sm:h-32 w-px bg-gradient-to-b from-orange-500 to-transparent" />
                )}
              </div>
            ))}
            
            {/* Disclaimer at the end of the scroll */}
            <div className="mt-32 max-w-md text-center shrink-0">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-8">
                Future growth is presented as potential, not certainty. No appreciation or returns are guaranteed.
              </p>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}