"use client";

import { ContourBackground } from "@/components/site/contour-background";
import { ShieldCheck } from "lucide-react";

import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { ApprovalCard, useLightbox } from "@/components/site/project-blocks";
import { TiltCard } from "@/components/site/scroll-effects";
import { CONTACT, MAGNUS, MIRAI, type Approval, type Media } from "@/lib/projects";

const CREATIVES: Media[] = [
  {
    src: "/projects/magnus/phase-2-rera-announcement.webp",
    alt: "Magnus Phase 2 TG RERA announcement",
    caption: "Magnus Phase 2 — TG RERA received",
  },
  {
    src: "/projects/magnus/phase-2-lp-approval.webp",
    alt: "Magnus Phase 2 HMDA LP approval announcement",
    caption: "Magnus Phase 2 — LP approved",
  },
];

export function ApprovalsSection() {
  const { open, node } = useLightbox(CREATIVES);
  const [p1, p2] = MAGNUS.phases;

  const groups: {
    title: string;
    meta: string;
    items: { a: Approval; creative?: number | undefined }[];
  }[] = [
    {
      title: "Magnus Smart City — Phase 1",
      meta: `${p1.extent} · ${p1.plots}`,
      items: p1.approvals.map((a) => ({ a })),
    },
    {
      title: "Magnus Smart City — Phase 2",
      meta: `${p2.extent} · newly approved`,
      items: p2.approvals.map((a, i) => ({ a, creative: i })),
    },
    {
      title: "Mirai by Antera Realty",
      meta: MIRAI.extent,
      items: MIRAI.approvals.map((a) => ({ a })),
    },
  ];

  return (
    <section
      id="approvals"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-primary-foreground sm:py-32"
    >
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <ContourBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[40rem] w-[40rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-magnus/25 blur-[120px]"
      />
      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Trust & approvals"
          title="Verified, phase by phase."
          copy="Every registration number below is taken directly from the promoter’s certificate or official announcement. Approvals belong to the specific phase they were issued for — one phase’s approval never covers another."
          action={
            <a
              href={CONTACT.reraPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-champagne"
            >
              <ShieldCheck className="h-4 w-4 text-champagne" /> Verify at rera.telangana.gov.in
            </a>
          }
        />

        <div className="mt-16 flex flex-col gap-14">
          {groups.map((g) => (
            <div key={g.title} className="grid gap-6 lg:grid-cols-12">
              <Reveal className="flex flex-col gap-2 lg:col-span-4">
                <h3 className="font-display text-3xl font-light leading-tight">{g.title}</h3>
                <span className="text-sm text-primary-foreground/55">{g.meta}</span>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {g.items.map(({ a, creative }, i) => (
                  <Reveal key={a.label} delay={i * 0.08} className="h-full">
                    <TiltCard className="rounded-[1.75rem]">
                      <ApprovalCard
                        approval={a}
                        tone="dark"
                        onViewCreative={creative !== undefined ? () => open(creative) : undefined}
                      />
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Reveal>
          <p className="mt-14 max-w-3xl text-xs leading-relaxed text-primary-foreground/45">
            Mirai’s TG RERA registration is awaited. Buyers should independently verify all
            approvals, title documents and statutory information before purchase.
          </p>
        </Reveal>
      </div>
      {node}
    </section>
  );
}
