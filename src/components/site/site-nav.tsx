"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

import { ASSETS } from "@/lib/assets";
import { BRAND, NAV_LINKS } from "@/lib/antera-data";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setSolid(latest > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5",
          solid ? "glass-panel nav-shadow" : "bg-transparent",
        )}
      >
        <a href="/" className="flex items-center gap-2.5">
          <img src={ASSETS.anteraLogo} alt="Antera Realty" className="h-10 w-10 object-contain" />
          <span className="flex flex-col leading-none">
            <span className="display-title text-sm tracking-[0.14em]">{BRAND.wordmark} REALTY</span>
            <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted-foreground">
              {BRAND.tagline}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#site-visit"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-transform duration-300 hover:scale-105 md:inline-flex"
          >
            Book a Site Visit &rarr;
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#site-visit"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-accent px-3 py-3 text-center text-sm font-semibold text-accent-foreground"
          >
            Book a Site Visit
          </a>
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-center text-sm font-semibold text-foreground"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </motion.div>
      ) : null}
    </motion.header>
  );
}