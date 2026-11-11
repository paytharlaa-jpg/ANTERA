"use client";

import { prefersReducedMotion } from "@/lib/motion-pref";
import { useEffect } from "react";

import { setLenis } from "@/lib/smooth-scroll";

/**
 * Lenis smooth scrolling. It drives native window scroll, so `motion`'s
 * useScroll, sticky positioning and anchor links keep working. Disabled for
 * reduced-motion users and on touch devices (native momentum is better there).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let raf = 0;
    let destroyed = false;
    let cleanup = () => {};

    void import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: { offset: -88 },
        prevent: (node: HTMLElement) => node.closest("[data-lenis-prevent]") !== null,
      });
      setLenis(lenis);
      document.documentElement.classList.add("lenis");
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
        setLenis(null);
        document.documentElement.classList.remove("lenis");
      };
    });

    return () => {
      destroyed = true;
      cleanup();
    };
  }, []);

  return null;
}
