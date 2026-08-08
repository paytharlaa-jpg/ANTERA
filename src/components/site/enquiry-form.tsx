"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { BUDGET_OPTIONS, PROJECT_OPTIONS } from "@/lib/antera-data";
import { cn } from "@/lib/utils";

const FIELD =
  "w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";
const LABEL = "font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground";

type Variant = "site-visit" | "contact";

export function EnquiryForm({ variant, tone = "light" }: { variant: Variant; tone?: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (name.length < 2) return setError("Please enter your full name.");
    if (!/^[+\d][\d\s-]{8,}$/.test(phone)) return setError("Please enter a valid phone number.");

    setError(null);
    setStatus("saving");
    window.setTimeout(() => setStatus("done"), 700);
  };

  if (status === "done") {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-4 rounded-3xl border p-8",
          tone === "dark" ? "border-primary-foreground/15 bg-primary-foreground/5" : "border-border bg-card",
        )}
      >
        <CheckCircle2 className="h-7 w-7 text-accent" />
        <h3 className="display-title text-xl">Thank you. We have your details.</h3>
        <p className={cn("text-sm", tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground")}>
          Our team will contact you to confirm availability and timing.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col gap-5 rounded-3xl border p-7 sm:p-9",
        tone === "dark" ? "border-primary-foreground/15 bg-primary-foreground/5" : "border-border bg-card",
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={LABEL}>Full Name</span>
          <input name="name" className={FIELD} placeholder="Your name" autoComplete="name" />
        </label>
        <label className="flex flex-col gap-2">
          <span className={LABEL}>Phone Number</span>
          <input name="phone" className={FIELD} placeholder="+91 00000 00000" autoComplete="tel" />
        </label>

        {variant === "contact" ? (
          <label className="flex flex-col gap-2">
            <span className={LABEL}>Email</span>
            <input name="email" type="email" className={FIELD} placeholder="you@email.com" />
          </label>
        ) : null}

        <label className="flex flex-col gap-2">
          <span className={LABEL}>Project Interested In</span>
          <select name="project" className={FIELD} defaultValue={PROJECT_OPTIONS[0]}>
            {PROJECT_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        {variant === "site-visit" ? (
          <label className="flex flex-col gap-2">
            <span className={LABEL}>Preferred Site Visit Date</span>
            <input name="date" type="date" className={FIELD} />
          </label>
        ) : null}

        <label className="flex flex-col gap-2">
          <span className={LABEL}>{variant === "site-visit" ? "Investment Range" : "Budget"}</span>
          <select name="budget" className={FIELD} defaultValue={BUDGET_OPTIONS[0]}>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      {variant === "contact" ? (
        <label className="flex flex-col gap-2">
          <span className={LABEL}>Message</span>
          <textarea name="message" rows={4} className={FIELD} placeholder="Tell us what you're looking for" />
        </label>
      ) : null}

      {error ? <p className="text-xs text-destructive">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "saving"}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {variant === "site-visit" ? "Schedule My Site Visit" : "Talk to an Advisor"}
      </button>

      <p className={cn("text-xs", tone === "dark" ? "text-primary-foreground/55" : "text-muted-foreground")}>
        Our team will contact you to confirm availability and timing.
      </p>
    </form>
  );
}