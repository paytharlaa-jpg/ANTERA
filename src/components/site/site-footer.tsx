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
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-5">
        
        {/* Company & Leadership Column */}
        <div className="flex flex-col gap-10 md:col-span-2 lg:col-span-2">
          {/* Logo & Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={ASSETS.anteraLogo} alt="" className="h-12 w-12 rounded-lg bg-primary-foreground p-1" />
              <span className="flex flex-col">
                <span className="display-title text-base tracking-[0.12em]">ANTERA REALTY</span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-primary-foreground/55">
                  {BRAND.tagline}
                </span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60 max-w-sm">{BRAND.location}</p>
          </div>

          {/* Leadership Team */}
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">Leadership Team</span>
            
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Founder */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-primary-foreground/10 bg-black/20 shrink-0">
                  <img 
                    src="/team/founder.png" 
                    alt="Nagunuri Raju" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary-foreground">Nagunuri Raju</span>
                  <span className="text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Founder</span>
                  <a href="tel:+919560776917" className="text-xs font-semibold text-accent hover:text-white transition-colors">
                    +91 9560776917
                  </a>
                </div>
              </div>

              {/* Co-Founder */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-primary-foreground/10 bg-black/20 shrink-0">
                  <img 
                    src="/team/cofounder.jpg" 
                    alt="Vamshi Krishna" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary-foreground">Vamshi Krishna</span>
                  <span className="text-[10px] uppercase tracking-widest text-primary-foreground/50 mb-1">Co-founder</span>
                  <a href="tel:+919618782108" className="text-xs font-semibold text-accent hover:text-white transition-colors">
                    +91 9618782108
                  </a>
                </div>
              </div>
            </div>
          </div>
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
          <span className="text-sm text-primary-foreground/70 cursor-pointer hover:text-accent transition-colors">Privacy Policy</span>
          <span className="text-sm text-primary-foreground/70 cursor-pointer hover:text-accent transition-colors">Terms &amp; Conditions</span>
          <span className="text-sm text-primary-foreground/70 cursor-pointer hover:text-accent transition-colors">Disclaimer</span>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
        <p className="max-w-4xl text-[0.7rem] leading-relaxed text-primary-foreground/45">{DISCLAIMER}</p>
        <p className="text-[0.7rem] text-primary-foreground/45 shrink-0">
          Copyright &copy; 2026 {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}