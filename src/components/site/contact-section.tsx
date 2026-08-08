"use client";

import { CalendarCheck, FileDown, MapPin, MessageCircle, Phone } from "lucide-react";

import { ASSETS } from "@/lib/assets";
import { BRAND, MAPS_URL } from "@/lib/antera-data";
import { EnquiryForm } from "./enquiry-form";
import { Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

const OPTIONS = [
  { icon: Phone, label: "Call Our Team", value: BRAND.phone, href: `tel:${BRAND.phoneRaw}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with an advisor",
    href: `https://wa.me/${BRAND.whatsapp}`,
  },
  { icon: CalendarCheck, label: "Schedule Site Visit", value: "Pick a date", href: "#site-visit" },
  {
    icon: FileDown,
    label: "Request Project Brochure",
    value: "Avatar 2 presentation",
    href: ASSETS.docs.avatar2Deck,
  },
  { icon: MapPin, label: "Get Location", value: "Karkalpahad, Hyderabad", href: MAPS_URL },
] as const;

export function ContactSection() {
  return (
    <Section id="contact" tone="cream">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="big-title">Start Your Property Journey.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3">
                <img src={ASSETS.anteraLogo} alt="" className="h-12 w-12 object-contain" />
                <span className="flex flex-col">
                  <span className="display-title text-base tracking-[0.12em]">ANTERA REALTY</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {BRAND.tagline}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col divide-y divide-border border-y border-border">
            {OPTIONS.map((option) => (
              <a
                key={option.label}
                href={option.href}
                {...(option.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center gap-4 py-4 transition-colors hover:text-accent"
              >
                <option.icon className="h-5 w-5 text-accent" />
                <span className="flex flex-col">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {option.label}
                  </span>
                  <span className="text-sm font-medium">{option.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Reveal>
            <h3 className="section-title">Tell Us What You're Looking For</h3>
          </Reveal>
          <Reveal delay={0.08}>
            <EnquiryForm variant="contact" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}