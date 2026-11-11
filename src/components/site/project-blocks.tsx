"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock3,
  ExternalLink,
  FileText,
  Maximize2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import { CONTACT, formatINR, type Approval, type Media, type PriceCard } from "@/lib/projects";
import { lockScroll } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { EASE, Reveal } from "./motion-primitives";

/* ------------------------------------------------------------------ */
/* Approval card                                                       */
/* ------------------------------------------------------------------ */

export function ApprovalCard({
  approval,
  scope,
  tone = "light",
  onViewCreative,
}: {
  approval: Approval;
  scope?: string | undefined;
  tone?: "light" | "dark";
  onViewCreative?: (() => void) | undefined;
}) {
  const dark = tone === "dark";
  const approved = approval.status === "approved";
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col gap-6 overflow-hidden rounded-[1.75rem] border p-6 transition-[transform,border-color] duration-500 hover:-translate-y-1 sm:p-7",
        dark
          ? "border-primary-foreground/12 bg-primary-foreground/[0.04] hover:border-champagne/40"
          : "border-foreground/10 bg-card hover:border-foreground/25",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700",
          approved ? "bg-emerald-400/20" : "bg-amber-400/20",
          "opacity-0 group-hover:opacity-100",
        )}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          {scope ? (
            <span
              className={cn(
                "text-[0.66rem] font-semibold uppercase tracking-[0.18em]",
                dark ? "text-champagne" : "text-champagne-deep",
              )}
            >
              {scope}
            </span>
          ) : null}
          <span
            className={cn(
              "text-sm font-semibold",
              dark ? "text-primary-foreground" : "text-foreground",
            )}
          >
            {approval.label}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]",
            approved ? "bg-emerald-500/12 text-emerald-600" : "bg-amber-500/15 text-amber-600",
            dark && (approved ? "text-emerald-300" : "text-amber-300"),
          )}
        >
          {approved ? <BadgeCheck className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
          {approved ? "Approved" : "Awaited"}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span
          className={cn(
            "text-[0.62rem] font-semibold uppercase tracking-[0.2em]",
            dark ? "text-primary-foreground/45" : "text-muted-foreground",
          )}
        >
          {approval.authority === "TG RERA" ? "Registration No." : "Permit No."}
        </span>
        {approval.number ? (
          <span className="break-all font-mono text-[1.35rem] leading-tight tracking-tight sm:text-2xl">
            {approval.number}
          </span>
        ) : (
          <span
            className={cn(
              "font-display text-xl font-light italic",
              dark ? "text-primary-foreground/70" : "text-foreground/70",
            )}
          >
            {approval.status === "pending" ? "Awaiting registration" : "To be published"}
          </span>
        )}
        {approval.detail ? (
          <span
            className={cn("text-sm", dark ? "text-primary-foreground/65" : "text-muted-foreground")}
          >
            {approval.detail}
          </span>
        ) : null}
      </div>

      <div
        className={cn(
          "mt-auto flex flex-col gap-3 border-t pt-5",
          dark ? "border-primary-foreground/10" : "border-foreground/8",
        )}
      >
        <span
          className={cn(
            "text-[0.7rem] leading-relaxed",
            dark ? "text-primary-foreground/45" : "text-muted-foreground",
          )}
        >
          Source: {approval.source}
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {approval.document ? (
            <a
              href={approval.document.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-semibold",
                dark
                  ? "text-champagne hover:text-primary-foreground"
                  : "text-accent hover:text-foreground",
              )}
            >
              <FileText className="h-3.5 w-3.5" /> {approval.document.label}
            </a>
          ) : null}
          {onViewCreative ? (
            <button
              type="button"
              onClick={onViewCreative}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-semibold",
                dark
                  ? "text-champagne hover:text-primary-foreground"
                  : "text-accent hover:text-foreground",
              )}
            >
              <Maximize2 className="h-3.5 w-3.5" /> View announcement
            </button>
          ) : null}
          {approval.authority === "TG RERA" && approval.number ? (
            <a
              href={CONTACT.reraPortal}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-semibold",
                dark
                  ? "text-primary-foreground/60 hover:text-champagne"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <ExternalLink className="h-3.5 w-3.5" /> Verify on TG RERA
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Price card                                                          */
/* ------------------------------------------------------------------ */

export function PriceCardView({
  card,
  tone = "light",
  accent = "var(--accent)",
  onViewOriginal,
  footer,
}: {
  card: PriceCard;
  tone?: "light" | "dark";
  accent?: string;
  onViewOriginal?: (() => void) | undefined;
  footer?: ReactNode;
}) {
  const dark = tone === "dark";
  const muted = dark ? "text-primary-foreground/60" : "text-muted-foreground";
  const line = dark ? "border-primary-foreground/10" : "border-foreground/8";

  if (!card.published) {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 rounded-[2rem] border p-8",
          dark ? "border-primary-foreground/12" : "border-foreground/10 bg-card",
        )}
      >
        <span className="eyebrow" style={{ color: accent }}>
          Pricing
        </span>
        <p className="display-title text-3xl">Pricing on request</p>
        <p className={cn("text-sm", muted)}>
          The latest price card for this phase will be published once confirmed.
        </p>
        {footer}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border",
        dark
          ? "border-primary-foreground/12 bg-primary-foreground/[0.03]"
          : "border-foreground/10 bg-card",
      )}
    >
      <div
        className={cn(
          "grid gap-px",
          card.base.length > 1 ? "sm:grid-cols-2" : "",
          dark ? "bg-primary-foreground/10" : "bg-foreground/8",
        )}
      >
        {card.base.map((b) => (
          <div
            key={b.label}
            className={cn("flex flex-col gap-3 p-7 sm:p-9", dark ? "bg-ink" : "bg-card")}
          >
            <span
              className="text-[0.66rem] font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {b.label}
            </span>
            <span className="flex items-baseline gap-1 font-display text-5xl font-light tracking-tight sm:text-6xl">
              <span className="text-[0.55em] opacity-70">₹</span>
              <span className="tabular">{b.value.toLocaleString("en-IN")}</span>
            </span>
            <span className={cn("text-sm", muted)}>{b.note}</span>
          </div>
        ))}
      </div>

      <div className={cn("grid gap-0 lg:grid-cols-2", dark ? "" : "")}>
        <div className={cn("p-7 sm:p-9 lg:border-r", line)}>
          <h4 className="mb-4 text-[0.66rem] font-semibold uppercase tracking-[0.2em]">
            Premium add-ons
          </h4>
          <dl className="flex flex-col">
            {card.addOns.map((a) => (
              <div
                key={a.label}
                className={cn(
                  "flex items-center justify-between gap-4 border-b py-3 text-sm last:border-0",
                  line,
                )}
              >
                <dt className={muted}>{a.label}</dt>
                <dd className="tabular font-semibold">+ {a.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={cn("flex flex-col gap-6 border-t p-7 sm:p-9 lg:border-t-0", line)}>
          <div>
            <h4 className="mb-4 text-[0.66rem] font-semibold uppercase tracking-[0.2em]">
              Payment schedule
            </h4>
            <dl className="flex flex-col">
              {card.schedule.map((s) => (
                <div
                  key={s.label}
                  className={cn(
                    "flex flex-col gap-1 border-b py-3 text-sm last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
                    line,
                  )}
                >
                  <dt className={muted}>{s.label}</dt>
                  <dd className="font-semibold sm:text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className={cn("flex flex-col gap-2 text-xs leading-relaxed", muted)}>
            {card.notes.map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden style={{ color: accent }}>
                  ✦
                </span>{" "}
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-4 border-t px-7 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9",
          line,
        )}
      >
        <span className={cn("text-xs", muted)}>
          Source: {card.source} · dated {card.date}. Prices subject to change and availability.
        </span>
        {onViewOriginal ? (
          <button
            type="button"
            onClick={onViewOriginal}
            className="inline-flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: accent }}
          >
            <Maximize2 className="h-3.5 w-3.5" /> View original price card
          </button>
        ) : null}
      </div>
      {footer ? <div className={cn("border-t px-7 py-6 sm:px-9", line)}>{footer}</div> : null}
    </div>
  );
}

export const priceFrom = (card: PriceCard) =>
  card.published
    ? `${formatINR(Math.min(...card.base.map((b) => b.value)))} / sq. yd.`
    : "On request";

/* ------------------------------------------------------------------ */
/* Lightbox + gallery                                                  */
/* ------------------------------------------------------------------ */

export function useLightbox(items: Media[]) {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback(
    (srcOrIndex: string | number) => {
      const i =
        typeof srcOrIndex === "number" ? srcOrIndex : items.findIndex((m) => m.src === srcOrIndex);
      setIndex(i >= 0 ? i : 0);
    },
    [items],
  );
  const node = <Lightbox items={items} index={index} onChange={setIndex} />;
  return { open, node };
}

export function Lightbox({
  items,
  index,
  onChange,
}: {
  items: Media[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [index, close, step]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          onClick={close}
        >
          <div
            className="flex items-center justify-between px-4 py-4 text-primary-foreground sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
              {(index ?? 0) + 1} / {items.length}
              {item.caption ? (
                <span className="ml-4 normal-case tracking-normal text-primary-foreground/85">
                  {item.caption}
                </span>
              ) : null}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
            <AnimatePresence mode="wait">
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
                drag={items.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1);
                  if (info.offset.x > 60) step(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full cursor-grab rounded-lg object-contain shadow-2xl active:cursor-grabbing"
              />
            </AnimatePresence>
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/20 bg-ink/60 text-primary-foreground sm:left-6 sm:flex"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/20 bg-ink/60 text-primary-foreground sm:right-6 sm:flex"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function GalleryGrid({ items, onOpen }: { items: Media[]; onOpen: (i: number) => void }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {items.map((m, i) => (
        <Reveal key={m.src + i} delay={(i % 3) * 0.06} className="break-inside-avoid">
          <button
            type="button"
            onClick={() => onOpen(i)}
            className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-surface text-left"
            aria-label={`Open ${m.alt}`}
          >
            <img
              src={m.src}
              alt={m.alt}
              loading="lazy"
              decoding="async"
              className="w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-primary-foreground">
              <span className="flex flex-col gap-1">
                {m.kind ? (
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-champagne">
                    {KIND_LABEL[m.kind]}
                  </span>
                ) : null}
                <span className="text-sm font-medium">{m.caption ?? m.alt}</span>
              </span>
              <span className="flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-primary-foreground/15 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </span>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

const KIND_LABEL: Record<NonNullable<Media["kind"]>, string> = {
  render: "Architectural render",
  plan: "Layout plan",
  creative: "Official creative",
  photo: "Photograph",
  map: "Location map",
};
