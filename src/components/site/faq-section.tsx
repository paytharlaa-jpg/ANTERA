"use client";

import { Plus } from "lucide-react";
import { FAQS } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { Section } from "./ui";

export function FaqSection() {
  // Generate exact FAQ schema matching the visible text
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <Section id="faqs" className="bg-[#0a0a0c] text-white py-24">
      {/* SEO Playbook: Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="grid w-full max-w-7xl mx-auto gap-12 lg:grid-cols-[0.8fr_1.2fr] px-4 md:px-8">
        <div className="flex flex-col gap-6">
          <Reveal>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span>Common Questions</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
              Clarity & <br className="hidden md:block" /> Transparency.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-base leading-relaxed text-white/60">
              Buying a plot is a major decision. We believe in providing clear, accurate, and direct answers to help you make an informed choice.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {/* SEO Playbook: Print all 7 answers in the HTML using <details> */}
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.05}>
              <details className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-6 py-6 text-left outline-none transition-colors hover:text-orange-500">
                  <span className="font-display text-lg sm:text-xl font-bold">{faq.q}</span>
                  <span className="shrink-0 rounded-full border border-white/20 p-2 text-white transition-transform duration-300 group-open:rotate-45 group-hover:border-orange-500 group-hover:text-orange-500">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <div className="overflow-hidden pb-6 pr-10 text-sm leading-relaxed text-white/60">
                  <p>{faq.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}