"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion-pref";

/**
 * Premium cursor for mouse users: a dot that tracks exactly plus a trailing
 * ring that grows over interactive elements and shows a label for elements
 * marked `data-cursor="View"`. Buttons with `.btn-magnetic` (or
 * `data-magnetic`) lean gently toward the pointer.
 * Off for touch, coarse pointers and reduced motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    if (!fine || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset["cursor"] ?? null);
      setHover(!!t?.closest("a, button, [role=tab], input, select, textarea, label"));

      const m = t?.closest<HTMLElement>(".btn-magnetic, [data-magnetic]") ?? null;
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        m.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };
    const onLeave = () => {
      setHidden(true);
      release();
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
      release();
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hover ? 54 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute left-0 top-0"
        animate={{ opacity: hidden ? 0 : 1 }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/80"
          animate={{
            width: size,
            height: size,
            backgroundColor: label ? "rgba(201,164,99,0.95)" : "rgba(201,164,99,0)",
            scale: down ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <AnimatePresence>
            {label ? (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink"
              >
                {label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0"
        animate={{ opacity: hidden || label ? 0 : 1 }}
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne" />
      </motion.div>
    </div>
  );
}
