"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { useLoaderDone } from "@/lib/loader";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 24, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleReveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Image that wipes in from a clipped mask — used for editorial imagery. */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(12% 8% 12% 8% round 24px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.3, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered word-by-word headline reveal (masks each line). */
export function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  stagger = 0.06,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const MotionTag = motion[Tag];
  const ready = useLoaderDone();
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: ready ? ("visible" as const) : ("hidden" as const) }
    : { whileInView: "visible" as const, viewport: { once: true, amount: 0.5 } };
  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, visible: { y: 0 } }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Kept for legacy sections. */
export function LetterReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <Reveal>
      <p className={className}>{text}</p>
    </Reveal>
  );
}

/** Vertical parallax for an image inside an overflow-hidden frame. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 10,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1 + strength / 50 }}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 50, damping: 20, mass: 1 });

  useEffect(() => {
    if (inView) raw.set(value);
  }, [inView, raw, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      const node = ref.current;
      if (node) {
        const n = Number(latest.toFixed(decimals));
        node.textContent = `${prefix}${n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
      }
    });
  }, [spring, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={cn("tabular", className)} aria-label={`${prefix}${value}${suffix}`}>
      {`${prefix}${value.toLocaleString("en-IN", { minimumFractionDigits: decimals })}${suffix}`}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "light",
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-8",
        align === "center" ? "items-center text-center" : "items-start text-left",
        action && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("flex max-w-3xl flex-col gap-5", align === "center" && "items-center")}>
        <Reveal>
          <span
            className={cn(
              "eyebrow inline-flex items-center gap-3",
              tone === "dark" ? "text-champagne" : "text-champagne-deep",
            )}
          >
            <span aria-hidden className="h-px w-8 bg-current opacity-70" />
            {eyebrow}
          </span>
        </Reveal>
        <WordReveal text={title} className="section-title text-balance" />
        {copy ? (
          <Reveal delay={0.15}>
            <p
              className={cn(
                "max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
                tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              {copy}
            </p>
          </Reveal>
        ) : null}
      </div>
      {action ? <Reveal delay={0.2}>{action}</Reveal> : null}
    </div>
  );
}
