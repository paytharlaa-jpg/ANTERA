"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

import { ASSETS } from "@/lib/assets";
import openPlotImg from "@/assets/open-plot.jpg";

const GALLERY = [
  { 
    id: 1, 
    title: "Premium Plots", 
    subtitle: "Blank canvases for visionaries.",
    img: openPlotImg 
  },
  { 
    id: 2, 
    title: "Magnus Estates", 
    subtitle: "Modern luxury defined.",
    img: ASSETS.houses.modern 
  },
  { 
    id: 3, 
    title: "Glass Collection", 
    subtitle: "Seamless indoor-outdoor living.",
    img: ASSETS.houses.glass 
  },
  { 
    id: 4, 
    title: "Waterfront City", 
    subtitle: "Serenity by the water.",
    img: ASSETS.houses.water 
  },
];

export function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    // Initial check with a slight delay to ensure client-side hydration match
    setTimeout(checkMobile, 10);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between bg-[#EFECE6] pb-8 pt-24 sm:px-8 md:pt-32"
    >
      {/* 1. Top Header Area */}
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:items-end md:gap-8 md:px-0">
        <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/50 md:text-sm"
          >
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span>The Antera Standard</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-[1.1] tracking-tighter text-black sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Curated <br className="hidden md:block" />
            <span className="italic text-black/40">Excellence.</span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex w-full flex-col items-center gap-6 md:w-auto md:items-end"
        >
          <p className="max-w-[280px] text-center text-sm leading-relaxed text-black/60 md:max-w-xs md:text-right">
            Discover a curated collection of premium open plots and architectural marvels designed for those who command the best.
          </p>
          <a
            href="#properties"
            className="group flex h-14 items-center gap-3 rounded-full bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-orange-500 shadow-lg"
          >
            Explore Portfolio
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </motion.div>
      </div>

      {/* 2. Interactive Arch Accordion Gallery (Desktop) / Swipeable Carousel (Mobile) */}
      <div className="mt-8 flex h-[50vh] min-h-[350px] w-full max-w-7xl gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-4 md:mt-16 md:h-[60vh] md:min-h-0 md:gap-4 md:overflow-visible md:snap-none md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {GALLERY.map((item, index) => {
          const isHovered = hoveredIndex === index;
          // Force active state on mobile to show full text overlay always
          const showContent = isMobile || isHovered;
          
          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              animate={{ 
                flex: isMobile ? "0 0 auto" : (isHovered ? 3.5 : 1),
                opacity: !isMobile && hoveredIndex !== null && !isHovered ? 0.6 : 1
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex h-full w-[85vw] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[2rem] sm:rounded-[4rem] md:w-auto md:shrink"
            >
              <motion.img
                src={item.img}
                alt={item.title}
                animate={{ scale: showContent ? 1.05 : 1.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover transition-all"
              />
              
              <div 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  showContent ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent' : 'bg-black/20'
                }`}
              />

              <motion.div 
                className="absolute bottom-0 left-0 flex w-full flex-col p-6 sm:p-8"
                animate={{ 
                  y: showContent ? 0 : 20,
                  opacity: showContent ? 1 : 0
                }}
                transition={{ duration: 0.5, delay: showContent ? 0.1 : 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm font-medium text-white/70 whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.subtitle}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Bottom Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-6 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-black/10 bg-white/40 px-6 py-4 backdrop-blur-md md:mt-8 md:flex-nowrap md:rounded-full md:px-8"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/70 sm:text-xs">Available Properties</span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-black sm:text-sm">150+</span>
            <span className="text-[8px] uppercase tracking-widest text-black/50 sm:text-[10px]">Acres Developed</span>
          </div>
          <div className="h-8 w-px bg-black/10"></div>
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-black sm:text-sm">Award Winning</span>
            <span className="text-[8px] uppercase tracking-widest text-black/50 sm:text-[10px]">Architecture</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}