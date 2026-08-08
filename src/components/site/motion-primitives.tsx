"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 28, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleReveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Letter-by-letter reveal, matching the reference site's staggered copy. */
export function LetterReveal({
  text,
  className,
  delay = 0,
  stagger = 0.012,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.p
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {text.split(" ").map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={`${char}-${ci}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.4em" },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </motion.p>
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
  const spring = useSpring(raw, { stiffness: 60, damping: 18, mass: 1 });

  useEffect(() => {
    if (inView) raw.set(value);
  }, [inView, raw, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      const node = ref.current;
      if (node) node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
    });
  }, [spring, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  action,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  align?: "center" | "left";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        action && "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div
        className={cn(
          "flex max-w-2xl flex-col gap-4",
          align === "center" ? "items-center text-center" : "items-start text-left",
        )}
      >
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="section-title text-foreground">
            {title}
          </h2>
        </Reveal>
        <LetterReveal
          text={copy}
          className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        />
      </div>
      {action ? <Reveal delay={0.1}>{action}</Reveal> : null}
    </div>
  );
}