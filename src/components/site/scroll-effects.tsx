"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Children, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* 1. Text that lights up word by word as it scrolls through view      */
/* ------------------------------------------------------------------ */
export function ScrollFillText({
  text,
  className,
  dim = 0.16,
}: {
  text: string;
  className?: string;
  dim?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          dim={dim}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span aria-hidden className="relative mr-[0.28em] mt-[0.1em]">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Stacking cards — each card pins and the earlier ones recede       */
/* ------------------------------------------------------------------ */
export function StackCards({
  children,
  top = 104,
  gap = 28,
}: {
  children: ReactNode;
  top?: number;
  gap?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = Children.toArray(children);
  return (
    <div ref={ref} className="relative flex flex-col gap-6 lg:gap-[12vh]">
      {items.map((child, i) => (
        <StackItem key={i} i={i} n={items.length} progress={scrollYProgress} top={top + i * gap}>
          {child}
        </StackItem>
      ))}
    </div>
  );
}

function StackItem({
  children,
  i,
  n,
  progress,
  top,
}: {
  children: ReactNode;
  i: number;
  n: number;
  progress: MotionValue<number>;
  top: number;
}) {
  const start = i / n;
  const scale = useTransform(progress, [start, 1], [1, 1 - (n - 1 - i) * 0.05]);
  const filter = useTransform(
    progress,
    [start, 1],
    ["brightness(1)", `brightness(${1 - (n - 1 - i) * 0.12})`],
  );
  return (
    <div className="lg:sticky" style={{ top }}>
      <motion.div style={{ scale, filter }} className="origin-top will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Horizontal scroll — vertical scrolling moves a track sideways     */
/* ------------------------------------------------------------------ */
export function HorizontalScroll({
  children,
  header,
  className,
}: {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  return (
    <>
      {/* Desktop: pinned horizontal track */}
      <div
        ref={sectionRef}
        className={cn("relative hidden lg:block", className)}
        style={{ height: `calc(100vh + ${distance}px)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden pt-16">
          {header}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-6 pl-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))] pr-[10vw]"
          >
            {children}
          </motion.div>
        </div>
      </div>
      {/* Mobile / tablet: native swipe */}
      <div className="lg:hidden">
        {header}
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none]">
          {children}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Expanding window — an image grows from a small frame to full bleed */
/* ------------------------------------------------------------------ */
export function ZoomWindow({
  src,
  alt,
  children,
  caption,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
  caption?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const inset = useTransform(scrollYProgress, [0, 0.6], [28, 0]);
  const insetX = useTransform(scrollYProgress, [0, 0.6], [34, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [32, 0]);
  const clipPath = useTransform(
    [inset, insetX, radius] as MotionValue<number>[],
    ([a, b, r]) => `inset(${a}% ${b}% ${a}% ${b}% round ${r}px)`,
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.75], [40, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute inset-x-0 top-[12%] z-10 text-center font-mono text-[0.68rem] uppercase tracking-[0.24em] text-champagne"
        >
          Keep scrolling
        </motion.div>
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.img
            src={src}
            alt={alt}
            style={{ scale }}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        </motion.div>
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="container-x absolute inset-x-0 bottom-0 pb-16 text-primary-foreground sm:pb-20"
        >
          {children}
          {caption ? (
            <p className="mt-6 text-[0.66rem] uppercase tracking-[0.18em] text-primary-foreground/50">
              {caption}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
