"use client";

import { ASSETS } from "@/lib/assets";
import { BRAND, DISCLAIMER } from "@/lib/antera-data";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Avatar 2", href: "/projects/avatar-2" },
  { label: "Marvel Smart City", href: "/projects/marvel-smart-city" },
  { label: "Magnus Smart City", href: "/projects/magnus-smart-city" },
  { label: "Locations", href: "/#location" },
  { label: "Site Visit", href: "tel:+919985358899" },
  { label: "Contact", href: "tel:+919985358899" },
];

const BROCHURES = [
  { label: "Avatar 2 Presentation", href: ASSETS.docs.avatar2Deck },
  { label: "Avatar 2 Price Structure", href: ASSETS.docs.avatar2Price },
  { label: "Marvel Smart City Brochure", href: ASSETS.docs.marvelBrochure },
  { label: "Magnus Smart City E-Brochure", href: ASSETS.docs.magnusBrochure },
  { label: "Magnus TG RERA Certificate", href: ASSETS.docs.magnusRera },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-charcoal px-6 pb-10 pt-20 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4">
        <div className="flex flex-col gap-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={ASSETS.anteraLogo} alt="" className="h-12 w-12 rounded-lg bg-primary-foreground p-1" />
            <span className="flex flex-col">
              <span className="display-title text-base tracking-[0.12em]">ANTERA REALTY</span>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-primary-foreground/55">
                {BRAND.tagline}
              </span>
            </span>
          </div>
          <p className="text-sm font-semibold text-primary-foreground/90">{BRAND.contactName}</p>
          <p className="text-sm text-primary-foreground/60">{BRAND.location}</p>
          <a href={`tel:${BRAND.phoneRaw}`} className="text-sm font-bold text-accent hover:text-white">
            Call Now
          </a>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Footer navigation">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">Explore</span>
          {EXPLORE.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">Brochures</span>
          {BROCHURES.map((doc) => (
            <a
              key={doc.label}
              href={doc.href}
              download=""
              className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
            >
              {doc.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">Legal</span>
          <span className="text-sm text-primary-foreground/70">Privacy Policy</span>
          <span className="text-sm text-primary-foreground/70">Terms &amp; Conditions</span>
          <span className="text-sm text-primary-foreground/70">Disclaimer</span>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-primary-foreground/12 pt-8">
        <p className="max-w-4xl text-[0.7rem] leading-relaxed text-primary-foreground/45">{DISCLAIMER}</p>
        <p className="mt-6 text-[0.7rem] text-primary-foreground/45">
          Copyright &copy; 2026 {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}