"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CONTACT, PORTFOLIO } from "@/lib/projects";
import { lockScroll } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { EASE } from "./motion-primitives";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects", menu: true },
  { label: "Location", href: "/#location" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;

/**
 * `overlay` — the nav starts transparent over a dark hero and turns solid on scroll.
 * Pages without a dark hero pass `overlay={false}` to start solid.
 */
export function SiteNav({ overlay = true }: { overlay?: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuTimer = useRef<number | undefined>(undefined);

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  const solid = scrolled || !overlay;
  const light = !solid; // light text over hero

  const openMenu = () => {
    window.clearTimeout(menuTimer.current);
    setMenu(true);
  };
  const closeMenu = () => {
    menuTimer.current = window.setTimeout(() => setMenu(false), 140);
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500",
          solid
            ? "border-b border-foreground/[0.06] bg-background/85 shadow-[0_10px_40px_-30px_rgb(17_26_46/0.6)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-black/35 to-transparent",
        )}
      >
        <nav
          className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20"
          aria-label="Main"
        >
          <a href="/" className="flex shrink-0 items-center gap-3" aria-label="Antera Realty home">
            <img
              src={
                light ? "/projects/brand/antera-mark-light.png" : "/projects/brand/antera-mark.png"
              }
              alt=""
              width={44}
              height={40}
              className="h-9 w-auto lg:h-10"
            />
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "text-[0.95rem] font-semibold tracking-[0.32em] transition-colors",
                  light ? "text-primary-foreground" : "text-foreground",
                )}
              >
                ANTERA
              </span>
              <span
                className={cn(
                  "mt-1 text-[0.56rem] font-semibold tracking-[0.5em] transition-colors",
                  light ? "text-champagne" : "text-accent",
                )}
              >
                REALTY
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) =>
              "menu" in link ? (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                  <button
                    type="button"
                    aria-expanded={menu}
                    aria-haspopup="true"
                    onClick={() => setMenu((v) => !v)}
                    onFocus={openMenu}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.8rem] font-medium transition-colors",
                      light
                        ? "text-primary-foreground/85 hover:text-primary-foreground"
                        : "text-foreground/75 hover:text-foreground",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        menu && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {menu ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="absolute left-1/2 top-full w-[40rem] -translate-x-1/2 pt-3"
                      >
                        <div className="grid grid-cols-[1.25fr_1fr] gap-2 overflow-hidden rounded-3xl border border-foreground/[0.07] bg-card p-2 shadow-[0_30px_80px_-30px_rgb(17_26_46/0.45)]">
                          <div className="flex flex-col gap-1 p-2">
                            <span className="eyebrow px-3 pb-2 pt-1 text-champagne-deep">
                              Featured developments
                            </span>
                            {PORTFOLIO.filter((p) => p.featured).map((p) => (
                              <a
                                key={p.id}
                                href={p.href}
                                onClick={() => setMenu(false)}
                                className="group flex items-center gap-4 rounded-2xl p-2.5 transition-colors hover:bg-surface"
                              >
                                <span className="h-14 w-16 shrink-0 overflow-hidden rounded-xl bg-surface">
                                  <img
                                    src={p.image}
                                    alt=""
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                  />
                                </span>
                                <span className="flex min-w-0 flex-col gap-0.5">
                                  <span className="truncate text-sm font-semibold text-foreground">
                                    {p.name}
                                  </span>
                                  <span className="truncate text-xs text-muted-foreground">
                                    {p.status}
                                  </span>
                                </span>
                              </a>
                            ))}
                          </div>
                          <div className="flex flex-col justify-between gap-4 rounded-[1.25rem] bg-ink p-5 text-primary-foreground">
                            <div className="flex flex-col gap-1">
                              <span className="eyebrow pb-2 text-champagne">More from Antera</span>
                              {PORTFOLIO.filter((p) => !p.featured).map((p) => (
                                <a
                                  key={p.id}
                                  href={p.href}
                                  onClick={() => setMenu(false)}
                                  className="flex items-center justify-between rounded-lg py-2 text-sm text-primary-foreground/80 transition-colors hover:text-champagne"
                                >
                                  {p.name}
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                              ))}
                            </div>
                            <a
                              href="/#projects"
                              onClick={() => setMenu(false)}
                              className="text-xs font-semibold uppercase tracking-[0.16em] text-champagne hover:text-primary-foreground"
                            >
                              View all projects →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.8rem] font-medium transition-colors after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100",
                      light
                        ? "text-primary-foreground/85 hover:text-primary-foreground"
                        : "text-foreground/75 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              aria-label={`Call ${CONTACT.phoneDisplay}`}
              className={cn(
                "hidden h-11 w-11 items-center justify-center rounded-full border transition-colors sm:flex",
                light
                  ? "border-primary-foreground/25 text-primary-foreground hover:border-champagne"
                  : "border-foreground/15 text-foreground hover:border-foreground/40",
              )}
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="/#enquire"
              className="hidden min-h-11 items-center rounded-full bg-accent px-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-all hover:brightness-110 sm:inline-flex"
            >
              Enquire Now
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
                light
                  ? "border-primary-foreground/25 text-primary-foreground"
                  : "border-foreground/15 text-foreground",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-primary-foreground lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex h-[4.5rem] items-center justify-between">
              <span className="flex items-center gap-3">
                <img src="/projects/brand/antera-mark-light.png" alt="" className="h-9 w-auto" />
                <span className="text-sm font-semibold tracking-[0.32em]">ANTERA</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="container-x flex flex-1 flex-col justify-between gap-8 overflow-y-auto pb-8 pt-4">
              <ul className="flex flex-col">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
                    className="border-b border-primary-foreground/10"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-3xl font-light"
                    >
                      {link.label}
                      <ArrowUpRight className="h-5 w-5 text-champagne" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-champagne">Developments</span>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO.map((p) => (
                    <a
                      key={p.id}
                      href={p.href}
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-primary-foreground/15 px-4 py-2.5 text-xs text-primary-foreground/80"
                    >
                      {p.name}
                    </a>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${CONTACT.phoneRaw}`}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary-foreground/25 text-xs font-semibold uppercase tracking-[0.14em]"
                  >
                    <Phone className="h-4 w-4" /> Call
                  </a>
                  <a
                    href="/#enquire"
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center justify-center rounded-full bg-accent text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
