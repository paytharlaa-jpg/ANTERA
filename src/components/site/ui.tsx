"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "accent" | "navy" | "outline" | "ghost-dark";

const VARIANTS: Record<Variant, string> = {
  accent: "bg-accent text-accent-foreground hover:brightness-105",
  navy: "bg-primary text-primary-foreground hover:brightness-125",
  outline: "border border-border bg-card text-foreground hover:border-accent",
  "ghost-dark": "border border-primary-foreground/25 text-primary-foreground hover:border-accent",
};

export function CtaLink({
  href,
  children,
  variant = "accent",
  arrow = false,
  className,
  download,
  target,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  download?: boolean;
  target?: string;
}) {
  return (
    <a
      href={href}
      {...(download ? { download: "" } : {})}
      {...(target ? { target, rel: "noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
      {arrow ? (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : null}
    </a>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "light",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "cream" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden px-6 py-24 sm:py-28",
        tone === "light" && "bg-background text-foreground",
        tone === "cream" && "bg-surface text-foreground",
        tone === "dark" && "bg-primary text-primary-foreground",
        className,
      )}
    >
      {tone === "dark" ? (
        <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40" />
      ) : null}
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "font-mono text-[0.68rem] uppercase tracking-[0.2em]",
        tone === "dark" ? "text-accent" : "text-accent",
      )}
    >
      {children}
    </span>
  );
}

export function StatBlock({ value, label, tone = "light" }: { value: string; label: string; tone?: "light" | "dark" }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        tone === "dark" ? "border-primary-foreground/15 bg-primary-foreground/5" : "border-border bg-card",
      )}
    >
      <p className="display-title text-xl sm:text-2xl">{value}</p>
      <p
        className={cn(
          "mt-2 text-xs leading-relaxed",
          tone === "dark" ? "text-primary-foreground/65" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
    </div>
  );
}