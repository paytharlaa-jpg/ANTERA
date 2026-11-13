"use client";

import { ContourBackground } from "@/components/site/contour-background";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { DISCLAIMER } from "@/lib/antera-data";
import { ASSETS } from "@/lib/assets";
import { CONTACT, MAGNUS, PORTFOLIO, WA_MESSAGES, whatsappLink } from "@/lib/projects";
import { Reveal } from "./motion-primitives";
import { WhatsAppIcon } from "./floating-whatsapp";

const COMPANY = [
  { label: "About Antera", href: "/about" },
  { label: "Approvals", href: "/#approvals" },
  { label: "Location", href: "/#location" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Insights & Blog", href: "/blog" },
  { label: "Book a Site Visit", href: "/#enquire" },
];

const DOCUMENTS = [
  {
    label: "Magnus Phase 1 — TG RERA certificate",
    href: "/assets/TG_RERA_APPROVED_CERTIFICATE-8.pdf",
  },
  { label: "Avatar 2 presentation", href: ASSETS.docs.avatar2Deck },
  { label: "Avatar 2 price structure", href: ASSETS.docs.avatar2Price },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/legal#privacy" },
  { label: "Terms of Use", href: "/legal#terms" },
  { label: "Disclaimer", href: "/legal#disclaimer" },
];

const LEADERS = [
  {
    name: "Nagunuri Raju",
    role: "Founder",
    phone: "+91 95607 76917",
    raw: "+919560776917",
    img: "/team/founder.png",
  },
  {
    name: "Vamshi Krishna",
    role: "Co-founder",
    phone: "+91 96187 82108",
    raw: "+919618782108",
    img: "/team/cofounder.jpg",
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-primary-foreground">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <ContourBackground color="rgba(201,164,99,0.12)" accent="rgba(201,164,99,0.28)" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-champagne/10 blur-3xl"
      />

      <div className="container-x relative pt-20 sm:pt-28">
        <Reveal className="flex flex-col justify-between gap-10 border-b border-primary-foreground/10 pb-16 lg:flex-row lg:items-end">
          <div className="flex max-w-2xl flex-col gap-6">
            <span className="flex items-center gap-4">
              <img src="/projects/brand/antera-mark-light.png" alt="" className="h-14 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-semibold tracking-[0.34em]">ANTERA</span>
                <span className="mt-1.5 text-[0.62rem] font-semibold tracking-[0.55em] text-champagne">
                  REALTY
                </span>
              </span>
            </span>
            <p className="font-display text-3xl font-light leading-tight text-primary-foreground/90 sm:text-4xl">
              Shaping spaces, building futures — with clarity at every step.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#25D366] px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-primary-foreground/25 px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] hover:border-champagne"
            >
              <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <FooterHeading>Visit our office</FooterHeading>
            <p className="flex gap-3 text-sm leading-relaxed text-primary-foreground/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" /> {CONTACT.office}
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-champagne"
            >
              <Mail className="h-4 w-4 text-champagne" /> {CONTACT.email}
            </a>
            <div className="mt-2 flex flex-col gap-4">
              <FooterHeading>Leadership</FooterHeading>
              {LEADERS.map((l) => (
                <div key={l.name} className="flex items-center gap-4">
                  <img
                    src={l.img}
                    alt={l.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full border border-primary-foreground/15 object-cover"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{l.name}</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] text-primary-foreground/50">
                      {l.role}
                    </span>
                    <a
                      href={`tel:${l.raw}`}
                      className="text-xs text-champagne hover:text-primary-foreground"
                    >
                      {l.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FooterList
            title="Projects"
            className="lg:col-span-3"
            links={PORTFOLIO.map((p) => ({ label: p.name, href: p.href }))}
          />
          <FooterList title="Company" className="lg:col-span-2" links={COMPANY} />
          <div className="flex flex-col gap-10 lg:col-span-3">
            <FooterList title="Documents" links={DOCUMENTS} download />
            <FooterList title="Legal" links={LEGAL} />
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-primary-foreground/10 py-10">
          <p className="max-w-5xl text-[0.72rem] leading-relaxed text-primary-foreground/45">
            {DISCLAIMER} RERA registration details can be verified at{" "}
            <a
              href={CONTACT.reraPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-champagne"
            >
              rera.telangana.gov.in
            </a>
            .
          </p>
          <div className="flex flex-col justify-between gap-3 text-[0.72rem] text-primary-foreground/45 sm:flex-row">
            <span>© {new Date().getFullYear()} Antera Realty. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: string }) {
  return <span className="eyebrow text-champagne">{children}</span>;
}

function FooterList({
  title,
  links,
  className,
  download,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
  download?: boolean;
}) {
  return (
    <nav className={`flex flex-col gap-4 ${className ?? ""}`} aria-label={title}>
      <FooterHeading>{title}</FooterHeading>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(download ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {l.label}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
