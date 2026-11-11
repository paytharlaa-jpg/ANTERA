"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { CONTACT, ENQUIRY_PROJECTS, whatsappLink } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Variant = "site-visit" | "contact";
type Project = (typeof ENQUIRY_PROJECTS)[number];

/**
 * Lead capture. There is no form backend on this site, so a submission opens
 * WhatsApp (to the verified Antera number) with the enquiry pre-filled. The
 * success state says exactly that — it never claims the lead was received.
 */
export function EnquiryForm({
  variant = "contact",
  tone = "light",
  defaultProject,
  lockProject = false,
  className,
}: {
  variant?: Variant;
  tone?: "light" | "dark";
  defaultProject?: Project | undefined;
  lockProject?: boolean;
  className?: string | undefined;
}) {
  const [status, setStatus] = useState<"idle" | "opening" | "done">("idle");
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "email", string>>>({});
  const [link, setLink] = useState<string>("");

  const dark = tone === "dark";
  const field = cn(
    "peer w-full rounded-2xl border px-4 pb-3 pt-6 text-[0.95rem] outline-none transition-[border-color,background-color] duration-300 placeholder:text-transparent",
    dark
      ? "border-primary-foreground/15 bg-primary-foreground/[0.04] text-primary-foreground focus:border-champagne focus:bg-primary-foreground/[0.07]"
      : "border-foreground/12 bg-card text-foreground focus:border-foreground/40",
  );
  const labelCls = cn(
    "pointer-events-none absolute left-4 top-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
    dark ? "text-primary-foreground/55" : "text-muted-foreground",
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    const phone = get("phone").replace(/[\s-]/g, "");
    const email = get("email");
    const project = get("project");
    const date = get("date");
    const message = get("message");

    const next: Partial<Record<"name" | "phone" | "email", string>> = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^(\+?91)?[6-9]\d{9}$/.test(phone) && !/^\+\d{10,14}$/.test(phone))
      next.phone = "Enter a valid mobile number (10 digits).";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Check the email address.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const lines = [
      variant === "site-visit"
        ? "Site visit request — Antera Realty website"
        : "Enquiry — Antera Realty website",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email && `Email: ${email}`,
      `Project: ${project}`,
      date && `Preferred visit date: ${date}`,
      message && `Message: ${message}`,
    ].filter(Boolean);
    const url = whatsappLink(lines.join("\n"));
    setLink(url);
    setStatus("opening");
    const win = window.open(url, "_blank", "noopener,noreferrer");
    // window.open returns null with noopener in most browsers; either way show the fallback link.
    window.setTimeout(() => setStatus("done"), win === undefined ? 0 : 400);
  };

  if (status === "done") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-start gap-4 rounded-3xl border p-7 sm:p-9",
          dark
            ? "border-primary-foreground/15 bg-primary-foreground/[0.05]"
            : "border-foreground/10 bg-card",
          className,
        )}
      >
        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        <h3 className="display-title text-2xl">Almost done — send it on WhatsApp.</h3>
        <p
          className={cn(
            "text-sm leading-relaxed",
            dark ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          We’ve opened WhatsApp with your details filled in. Tap <strong>Send</strong> there so our
          team receives your enquiry. If WhatsApp didn’t open, use the button below or call{" "}
          {CONTACT.phoneDisplay}.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1f9d55] px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white"
          >
            Open WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className={cn(
              "min-h-12 rounded-full border px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em]",
              dark ? "border-primary-foreground/20" : "border-foreground/15",
            )}
          >
            Edit details
          </button>
        </div>
      </div>
    );
  }

  const Err = ({ k }: { k: "name" | "phone" | "email" }) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
        <AlertCircle className="h-3.5 w-3.5" /> {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex flex-col gap-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="relative block">
            <input
              name="name"
              autoComplete="name"
              placeholder="Full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-err" : undefined}
              className={field}
            />
            <span className={labelCls}>Full name *</span>
          </label>
          <Err k="name" />
        </div>
        <div>
          <label className="relative block">
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Mobile number"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-err" : undefined}
              className={field}
            />
            <span className={labelCls}>Mobile number *</span>
          </label>
          <Err k="phone" />
        </div>
        <div>
          <label className="relative block">
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              aria-invalid={!!errors.email}
              className={field}
            />
            <span className={labelCls}>Email (optional)</span>
          </label>
          <Err k="email" />
        </div>
        <label className="relative block">
          <select
            name="project"
            defaultValue={defaultProject ?? ENQUIRY_PROJECTS[1]}
            disabled={lockProject}
            className={cn(field, "appearance-none pr-10", dark && "[&>option]:text-foreground")}
          >
            {ENQUIRY_PROJECTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {lockProject ? <input type="hidden" name="project" value={defaultProject} /> : null}
          <span className={labelCls}>Interested in</span>
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs opacity-60"
          >
            ▾
          </span>
        </label>
        {variant === "site-visit" ? (
          <label className="relative block sm:col-span-2">
            <input
              name="date"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              className={cn(field, dark && "[color-scheme:dark]")}
            />
            <span className={labelCls}>Preferred visit date (optional)</span>
          </label>
        ) : null}
      </div>
      <label className="relative block">
        <textarea
          name="message"
          rows={3}
          placeholder="Message"
          className={cn(field, "resize-none")}
        />
        <span className={labelCls}>Message (optional)</span>
      </label>

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={cn(
            "max-w-sm text-xs leading-relaxed",
            dark ? "text-primary-foreground/50" : "text-muted-foreground",
          )}
        >
          Submitting opens WhatsApp with your details pre-filled, addressed to Antera Realty (
          {CONTACT.phoneDisplay}).
        </p>
        <button
          type="submit"
          disabled={status === "opening"}
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-accent px-7 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-all duration-300 hover:-translate-y-px hover:brightness-110 disabled:opacity-60"
        >
          {status === "opening" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {variant === "site-visit" ? "Request Site Visit" : "Send Enquiry"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
