"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "accent" | "navy" | "outline" | "ghost-dark" | "light" | "gold";

const VARIANTS: Record<Variant, string> = {
  accent:
    "bg-accent text-accent-foreground shadow-[0_14px_30px_-16px_color-mix(in_oklab,var(--accent)_80%,transparent)] hover:brightness-[1.06]",
  navy: "bg-primary text-primary-foreground hover:bg-ink",
  outline:
    "border border-foreground/15 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/[0.03]",
  "ghost-dark":
    "border border-primary-foreground/25 bg-primary-foreground/[0.04] text-primary-foreground backdrop-blur-sm hover:border-champagne/70 hover:bg-primary-foreground/[0.08]",
  light: "bg-primary-foreground text-primary hover:bg-white",
  gold: "bg-champagne text-ink hover:brightness-105",
};

export const BUTTON_BASE =
  "group relative inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-out active:scale-[0.98] hover:-translate-y-px";

export function buttonClass(variant: Variant = "accent", className?: string) {
  return cn(BUTTON_BASE, VARIANTS[variant], className);
}

export function CtaLink({
  href,
  children,
  variant = "accent",
  arrow = false,
  className,
  download,
  target,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  download?: boolean;
  target?: string;
  onClick?: () => void;
}) {
  const external = target === "_blank" || /^https?:/.test(href);
  return (
    <a
      href={href}
      onClick={onClick}
      {...(download ? { download: "" } : {})}
      {...(external ? { target: target ?? "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClass(variant, className)}
    >
      {children}
      {arrow ? (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "light",
  inner,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "cream" | "dark" | "ink";
  inner?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full scroll-mt-20 overflow-hidden py-20 sm:py-28 lg:py-32",
        tone === "light" && "bg-background text-foreground",
        tone === "cream" && "bg-surface text-foreground",
        tone === "dark" && "bg-primary text-primary-foreground",
        tone === "ink" && "bg-ink text-primary-foreground",
        className,
      )}
    >
      <div className={cn("container-x relative", inner)}>{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        tone === "dark" ? "text-champagne" : "text-champagne-deep",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      {children}
    </span>
  );
}

export function StatBlock({
  value,
  label,
  tone = "light",
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-t pt-5",
        tone === "dark" ? "border-primary-foreground/15" : "border-foreground/12",
      )}
    >
      <p className="display-title text-3xl sm:text-4xl">{value}</p>
      <p
        className={cn(
          "text-xs uppercase tracking-[0.14em]",
          tone === "dark" ? "text-primary-foreground/60" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
    </div>
  );
}

export function StatusPill({
  status,
  children,
  tone = "light",
}: {
  status: "approved" | "pending" | "info" | "new";
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const dot = {
    approved: "bg-emerald-500",
    pending: "bg-amber-500",
    info: "bg-sky-500",
    new: "bg-accent",
  }[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em]",
        tone === "dark"
          ? "border-primary-foreground/20 bg-primary-foreground/[0.06] text-primary-foreground/90"
          : "border-foreground/12 bg-card text-foreground/80",
      )}
    >
      <span className={cn("relative h-1.5 w-1.5 rounded-full", dot)}>
        {status === "new" ? (
          <span className={cn("absolute inset-0 animate-ping rounded-full", dot)} />
        ) : null}
      </span>
      {children}
    </span>
  );
}
