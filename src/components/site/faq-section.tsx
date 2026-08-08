"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { FAQS } from "@/lib/antera-data";
import { Reveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id="faqs" tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow>FAQs</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="big-title">Questions, Answered.</h2>
          </Reveal>
        </div>

        <div className="flex flex-col border-t border-border">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="display-title text-lg sm:text-xl">{faq.q}</span>
                  <span className="shrink-0 text-accent">
                    {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}