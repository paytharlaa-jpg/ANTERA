"use client";

import { prefersReducedMotion } from "@/lib/motion-pref";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

import { LOADER_KEY, markLoaderDone } from "@/lib/loader";
import { lockScroll } from "@/lib/smooth-scroll";
import { EASE } from "./motion-primitives";

/**
 * Intro loader — the Antera "A" draws itself, a counter runs to 100, then a
 * curtain lifts. Rendered in the server HTML so there is no flash of content;
 * an inline head script hides it immediately on repeat visits in the session,
 * and a CSS failsafe hides it if JavaScript never runs.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const bar = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(LOADER_KEY) === "1";
    } catch {
      /* storage blocked */
    }
    const reduce = prefersReducedMotion();
    if (seen || reduce) {
      setVisible(false);
      markLoaderDone();
      return;
    }
    lockScroll(true);
    const controls = animate(progress, 100, { duration: 2, ease: [0.65, 0, 0.35, 1] });
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(LOADER_KEY, "1");
      } catch {
        /* ignore */
      }
      setVisible(false);
    }, 2350);
    return () => {
      controls.stop();
      window.clearTimeout(t);
    };
  }, [progress]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        lockScroll(false);
        markLoaderDone();
      }}
    >
      {visible ? (
        <motion.div
          key="loader"
          className="antera-loader fixed inset-0 z-[100] flex flex-col overflow-hidden bg-ink text-primary-foreground"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="relative flex flex-1 flex-col items-center justify-center gap-8">
            <svg viewBox="0 0 120 110" className="h-28 w-auto sm:h-36" fill="none">
              {/* A legs */}
              <motion.path
                d="M8 104 L60 6 L112 104"
                stroke="var(--primary-foreground)"
                strokeWidth="7"
                strokeLinejoin="miter"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              {/* buildings */}
              {[
                { x: 40, h: 16, c: "var(--primary-foreground)" },
                { x: 52, h: 26, c: "var(--accent)" },
                { x: 64, h: 38, c: "var(--primary-foreground)" },
              ].map((b, i) => (
                <motion.rect
                  key={b.x}
                  x={b.x}
                  width="9"
                  fill={b.c}
                  initial={{ y: 78, height: 0 }}
                  animate={{ y: 78 - b.h, height: b.h }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.12, ease: EASE }}
                />
              ))}
              {/* swoosh */}
              <motion.path
                d="M18 96 C 45 74, 85 70, 116 80"
                stroke="var(--accent)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-lg font-semibold tracking-[0.5em]">ANTERA</span>
              <span className="font-mono text-[0.6rem] tracking-[0.6em] text-champagne">
                REALTY
              </span>
            </motion.div>
          </div>
          <div className="container-x relative flex items-end justify-between pb-8">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary-foreground/50">
              Shaping spaces, building futures
            </span>
            <motion.span className="font-display text-5xl tabular-nums text-primary-foreground/90 sm:text-7xl">
              {rounded}
            </motion.span>
          </div>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-champagne"
            style={{ scaleX: bar }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
