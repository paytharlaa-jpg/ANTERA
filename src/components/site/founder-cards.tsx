"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";

import { FOUNDERS, whatsappLink } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./floating-whatsapp";
import { EASE } from "./motion-primitives";
import { TiltCard } from "./scroll-effects";

/** Leadership cards — photo, name, role and direct contact. */
export function FounderCards({
  tone = "light",
  size = "md",
}: {
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {FOUNDERS.map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
        >
          <TiltCard className="rounded-[2rem]">
            <article
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border",
                dark
                  ? "border-primary-foreground/12 bg-primary-foreground/[0.04]"
                  : "border-foreground/10 bg-card",
              )}
            >
              <div
                className={cn(
                  "relative flex items-end justify-center overflow-hidden",
                  size === "lg" ? "h-80 sm:h-96" : "h-64",
                  dark
                    ? "bg-gradient-to-b from-primary-foreground/[0.06] to-transparent"
                    : "bg-gradient-to-b from-surface to-card",
                )}
              >
                <span
                  aria-hidden
                  className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-champagne/20 blur-3xl transition-transform duration-700 group-hover:scale-125"
                />
                <motion.img
                  src={f.photo}
                  alt={`${f.name}, ${f.role}, Antera Realty`}
                  loading="lazy"
                  className={cn(
                    "relative mb-6 rounded-full object-cover shadow-[0_30px_60px_-30px_rgb(17_26_46/0.6)] ring-4 transition-transform duration-700 group-hover:scale-[1.04]",
                    size === "lg" ? "h-60 w-60 sm:h-72 sm:w-72" : "h-44 w-44",
                    dark ? "ring-primary-foreground/10" : "ring-background",
                  )}
                />
              </div>
              <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-champagne-deep">
                    {f.role}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl">{f.name}</h3>
                  <span
                    className={cn(
                      "text-sm",
                      dark ? "text-primary-foreground/60" : "text-muted-foreground",
                    )}
                  >
                    Antera Realty
                  </span>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <a
                    href={`tel:${f.phoneRaw}`}
                    className={cn(
                      "btn-magnetic inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors",
                      dark
                        ? "border-primary-foreground/20 hover:border-champagne"
                        : "border-foreground/15 hover:border-foreground/40",
                    )}
                    aria-label={`Call ${f.name}`}
                  >
                    <Phone className="h-3.5 w-3.5" /> {f.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink(
                      `Hi ${f.name.split(" ")[0]}, I found Antera Realty online and would like to know more about your projects.`,
                    ).replace(/wa\.me\/\d+/, `wa.me/${f.whatsapp}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic inline-flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-4 text-xs font-semibold text-white"
                    aria-label={`WhatsApp ${f.name}`}
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </article>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
