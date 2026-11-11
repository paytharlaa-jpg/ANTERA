"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";

import { EASE, Reveal, SectionHeading } from "./motion-primitives";
import { cn } from "@/lib/utils";

export type Faq = { q: string; a: string };

export const HOME_FAQS: Faq[] = [
  {
    q: "What is new at Magnus Smart City?",
    a: "Magnus Smart City Phase 2 has received its TG RERA registration (P02400011410) and HMDA layout permission (LP No. 2522/HMDA/SWDL/2026) for 58.28 acres. It sits beside Phase 1 at Rameshwaram, near Shadnagar.",
  },
  {
    q: "What is the price of Magnus Smart City plots?",
    a: "As per the price card dated 14 Sep 2026, the residential base rate for Phase 1 and Phase 2 is ₹16,999 per sq. yd. The Phase 1 commercial block is ₹18,499 per sq. yd. Facing and road-frontage premiums apply, and a corpus fund of ₹200 per sq. yd. is extra. Prices are subject to change and availability.",
  },
  {
    q: "Are Magnus Phase 1 and Phase 2 approvals the same?",
    a: "No. Each phase has its own approvals. Phase 1: TG RERA P02400010251 and HMDA LP 0546/HMDA/SWDL/2025 (16.31 acres). Phase 2: TG RERA P02400011410 and HMDA LP 2522/HMDA/SWDL/2026 (58.28 acres).",
  },
  {
    q: "Is Mirai RERA approved?",
    a: "Not yet. Mirai by Antera Realty is HMDA approved as confirmed by the promoter; its TG RERA registration is awaited. We will update this page as soon as the registration number is issued.",
  },
  {
    q: "What is the booking amount and payment schedule?",
    a: "For Magnus and Mirai, the booking amount is ₹1,00,000, with 100% of the total amount (less booking) payable within 30 days. Delays beyond 40 days attract additional charges.",
  },
  {
    q: "Can I schedule a site visit?",
    a: "Yes. Use the enquiry form or WhatsApp us on +91 99853 58899 and our team will arrange a visit at a convenient time.",
  },
  {
    q: "Where can I verify RERA registrations?",
    a: "All TG RERA registrations can be verified on the Telangana RERA portal at rera.telangana.gov.in using the registration number.",
  },
];

export function FaqSection({
  faqs = HOME_FAQS,
  title = "Questions, answered plainly.",
}: {
  faqs?: Faq[];
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="relative scroll-mt-20 bg-background py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="FAQs" title={title} />
          </div>
        </div>
        <div className="flex flex-col lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.03} className="border-b border-foreground/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl font-normal leading-snug sm:text-2xl">
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500",
                        isOpen && "rotate-45 border-ink bg-ink text-primary-foreground",
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-12 text-base leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
