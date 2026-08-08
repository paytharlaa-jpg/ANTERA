"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { ASSETS } from "@/lib/assets";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Smoothed progress -> cinematic, never twitchy
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  // Sky / atmosphere parallax (slowest layer)
  const skyY = useTransform(p, [0, 1], ["0%", "10%"]);
  const skyScale = useTransform(p, [0, 1], [1.06, 1.18]);

  // Villa: distant at the bottom 25-30%, then dollies in toward the viewer
  const villaY = useTransform(p, [0, 0.55, 1], ["30%", "2%", "-12%"]);
  const villaScale = useTransform(p, [0, 0.55, 1], [0.58, 1.05, 1.5]);
  const villaBlur = useTransform(p, [0.75, 1], ["blur(0px)", "blur(6px)"]);
  const villaOpacity = useTransform(p, [0, 0.85, 1], [1, 1, 0.55]);

  // Headline stays readable through the early scroll, then lifts away
  const copyY = useTransform(p, [0, 0.6], ["0%", "-46%"]);
  const copyOpacity = useTransform(p, [0, 0.28, 0.55], [1, 1, 0]);

  // Mid cloud bands (medium parallax, kept subtle)
  const midCloudY = useTransform(p, [0, 1], ["0%", "-14%"]);

  // Bottom cloud bank: stays below the fold, only rises for the final hand-off
  const frontCloudY = useTransform(
    p,
    [0, 0.4, 0.7, 0.88, 1],
    ["115%", "105%", "78%", "48%", "-6%"],
  );
  const frontCloudScale = useTransform(p, [0, 0.88, 1], [1.05, 1.15, 1.5]);
  const frontCloudOpacity = useTransform(p, [0, 0.4, 0.7, 0.88, 1], [0.15, 0.2, 0.3, 0.35, 1]);
  const backCloudY = useTransform(p, [0, 0.7, 1], ["120%", "92%", "40%"]);
  const backCloudOpacity = useTransform(p, [0, 0.7, 1], [0.12, 0.2, 0.45]);
  const veilOpacity = useTransform(p, [0.9, 1], [0, 1]);

  return (
    <section
      id="top"
      ref={ref}
      className="hero-shell relative w-full bg-sky-soft"
      aria-label="Antera Realty introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
      {/* Sky layer */}
      <motion.div style={{ y: skyY, scale: skyScale }} className="absolute inset-0">
        <img src={ASSETS.sky} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-background" />
      </motion.div>

      {/* Drifting cloud bands */}
      <motion.div style={{ y: midCloudY }} className="pointer-events-none absolute inset-0 z-[5] opacity-60">
      <div className="absolute inset-x-0" style={{ top: "10vh" }}>
        <img
          src={ASSETS.cloudStrip}
          alt=""
          loading="lazy"
          className="animate-cloud-drift max-w-none"
          style={{ ["--drift-duration" as string]: "38s", width: "150%", marginLeft: "-25%" }}
        />
      </div>
      <div className="absolute inset-x-0 opacity-45" style={{ top: "58vh" }}>
        <img
          src={ASSETS.cloudStrip}
          alt=""
          loading="lazy"
          className="animate-cloud-drift max-w-none -scale-x-100"
          style={{ ["--drift-duration" as string]: "52s", width: "180%", marginLeft: "-40%" }}
        />
      </div>
      </motion.div>

      {/* Copy */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 text-center sm:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="glass-panel flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4"
        >
          <div className="flex -space-x-2">
            {ASSETS.people.slice(0, 3).map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="h-7 w-7 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-xs font-semibold tracking-wide text-foreground/80">
            3,500+ happy families
          </span>
        </motion.div>

        <h1 className="hero-title mt-7 text-foreground">
          {["Find", "Your", "Dream", "Home"].map((word, i) => (
            <span key={word} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="word-gap inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base"
        >
          Explore thoughtfully designed homes in premium locations, crafted to match modern
          lifestyles with comfort, elegance, and long-term value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#properties"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform duration-300 hover:scale-105"
          >
            Explore Homes
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground transition-transform duration-300 hover:scale-105"
          >
            Book a Visit
          </a>
        </motion.div>
      </motion.div>

      {/* Villa dollying in out of the clouds */}
      <motion.div
        style={{ y: villaY, scale: villaScale, filter: villaBlur, opacity: villaOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 origin-bottom flex justify-center"
      >
        <motion.img
          src={ASSETS.heroHouse}
          alt="Modern Antera Realty residence emerging above the clouds"
          initial={{ opacity: 0, y: 120, scale: 1.04 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-none"
          style={{ width: "min(1500px, 128%)" }}
        />
      </motion.div>

      {/* Subtle back cloud haze, mostly below the fold */}
      <motion.div
        style={{ y: backCloudY, opacity: backCloudOpacity, bottom: "-18vh" }}
        className="pointer-events-none absolute inset-x-0 z-[25] origin-bottom"
      >
        <img
          src={ASSETS.cloudStrip}
          alt=""
          loading="lazy"
          className="animate-cloud-drift w-full max-w-none object-bottom"
          style={{
            ["--drift-duration" as string]: "30s",
            objectPosition: "center bottom",
            transform: "scaleX(-1)",
          }}
        />
      </motion.div>

      {/* Foreground cloud bank: only rises for the final transition */}
      <motion.div
        style={{
          y: frontCloudY,
          scale: frontCloudScale,
          opacity: frontCloudOpacity,
          bottom: "-18vh",
        }}
        className="pointer-events-none absolute inset-x-0 z-30 origin-bottom"
      >
        <img
          src={ASSETS.cloudStrip}
          alt=""
          className="w-full max-w-none"
          style={{ objectPosition: "center bottom" }}
        />
        <div className="h-24 w-full bg-white sm:h-28" />
      </motion.div>

      {/* Seamless hand-off veil into the next section */}
      <motion.div
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-40 bg-background"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
    </section>
  );
}