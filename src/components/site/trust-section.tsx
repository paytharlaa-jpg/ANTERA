"use client";

import { FileCheck2 } from "lucide-react";

import { ASSETS } from "@/lib/assets";
import { Reveal } from "./motion-primitives";
import { CtaLink, Eyebrow, Section } from "./ui";

export function TrustSection() {
  return (
    <Section id="approvals" tone="dark">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow tone="dark">Trust &amp; Documentation</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-2xl">
            Confidence Starts
            <span className="block text-accent">With Documentation.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-primary-foreground/12 bg-primary-foreground/5 p-8">
            <FileCheck2 className="h-6 w-6 text-accent" />
            <h3 className="display-title mt-5 text-2xl">Aspirealty Avatar 2</h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/75">
              <li>DTCP Layout / Approval Information</li>
              <li>Approved Extent: 8 Acres</li>
              <li>Proposed Total Extent: 17 Acres</li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaLink href={ASSETS.docs.avatar2Deck} variant="ghost-dark" download>
                View Project Documents
              </CtaLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-3xl border border-primary-foreground/12 bg-primary-foreground/5 p-8">
            <FileCheck2 className="h-6 w-6 text-accent" />
            <h3 className="display-title mt-5 text-2xl">Magnus Smart City</h3>
            <p className="mt-5 text-sm leading-relaxed text-primary-foreground/75">
              A Telangana RERA registration certificate has been supplied for this project and is
              shown on the Magnus Smart City project page only.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaLink href="/projects/magnus-smart-city" variant="ghost-dark" arrow>
                Magnus Project Page
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>

      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-primary-foreground/50">
        Buyers should independently verify applicable approvals, title documents, registration
        details and legal documentation before purchase.
      </p>
    </Section>
  );
}