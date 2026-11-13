"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";

import { ProjectHero } from "@/components/projects/shared";
import { ContourBackground } from "@/components/site/contour-background";
import { FinalCta } from "@/components/site/final-cta";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { FounderCards } from "@/components/site/founder-cards";
import { CountUp, EASE, Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { ScrollFillText, TiltCard } from "@/components/site/scroll-effects";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { buttonClass } from "@/components/site/ui";
import { HOW_IT_WORKS, WHY_ANTERA } from "@/lib/antera-data";
import { CONTACT, PORTFOLIO } from "@/lib/projects";

const OFFICE_MAP =
  "https://www.google.com/maps?q=Mangalya+Shopping+Mall,+Vanasthalipuram,+Hyderabad&z=15&output=embed";
const OFFICE_LINK =
  "https://www.google.com/maps/search/?api=1&query=Mangalya+Shopping+Mall+Vanasthalipuram+Hyderabad";

export function AboutPage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <ProjectHero
          image="/projects/magnus/site/site-04.webp"
          imageAlt="Magnus Smart City main road with corten-steel pergola — site photo"
          imagePosition="50% 60%"
          eyebrow={
            <span className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-champagne">
              <span className="h-px w-8 bg-current" /> About Antera Realty
            </span>
          }
          title="Shaping spaces, building futures."
          lede="We help families and investors find the right plot in Hyderabad’s fastest-growing corridors — with verified approvals, honest pricing and a team that stays with you from first visit to registration."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        >
          <a href="#founders" className={buttonClass("accent")}>
            Meet the founders
          </a>
          <a href="/#projects" className={buttonClass("ghost-dark")}>
            Our projects
          </a>
        </ProjectHero>

        {/* Story */}
        <section className="relative overflow-hidden bg-background py-24 sm:py-32">
          <div className="container-x flex flex-col gap-16">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-3 text-champagne-deep">
                <span aria-hidden className="h-px w-8 bg-current opacity-70" /> Our story
              </span>
            </Reveal>
            <ScrollFillText
              className="max-w-5xl font-display text-[1.6rem] leading-[1.2] tracking-tight sm:text-4xl lg:text-[3.1rem]"
              text="Antera Realty brings together carefully selected plotted developments across Hyderabad’s growth corridors — and presents them the way buyers deserve: clearly, honestly and completely."
            />
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5 lg:col-start-2">
                <p className="text-lg leading-relaxed text-foreground/80">
                  Buying land is one of the biggest decisions a family makes. We believe it should
                  feel clear, not confusing — so every project we represent comes with approval
                  numbers you can verify, a dated price card and a layout you can study before you
                  visit.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-5">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  From Magnus Smart City and Mirai near Shadnagar to our Srisailam Highway projects,
                  our team helps you understand the location, the paperwork and the long-term
                  picture — and then walks the site with you.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-8 border-t border-foreground/10 pt-10 lg:grid-cols-4">
              {[
                { v: PORTFOLIO.length, d: 0, l: "Developments represented" },
                { v: 74.59, d: 2, l: "Acres HMDA-approved at Magnus" },
                { v: 33625, d: 0, l: "Sq. ft Phase 2 clubhouse" },
                { v: 2, d: 0, l: "Growth corridors" },
              ].map((s, i) => (
                <Reveal key={s.l} delay={i * 0.06} className="flex flex-col gap-2">
                  <span className="font-display text-4xl sm:text-5xl">
                    <CountUp value={s.v} decimals={s.d} />
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {s.l}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Antera */}
        <section className="relative overflow-hidden bg-ink py-24 text-primary-foreground sm:py-32">
          <ContourBackground />
          <div className="container-x relative">
            <SectionHeading
              tone="dark"
              eyebrow="What we stand for"
              title="Why buyers choose Antera."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_ANTERA.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.08} className="h-full">
                  <TiltCard className="rounded-[1.75rem]">
                    <div className="flex h-full flex-col gap-6 rounded-[1.75rem] border border-primary-foreground/12 bg-primary-foreground/[0.04] p-7">
                      <span className="font-display text-5xl text-transparent [-webkit-text-stroke:1px_var(--champagne)]">
                        {w.index}
                      </span>
                      <h3 className="font-display text-2xl">{w.title}</h3>
                      <p className="text-sm leading-relaxed text-primary-foreground/70">{w.copy}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Founders */}
        <section id="founders" className="scroll-mt-20 bg-surface py-24 sm:py-32">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Leadership"
                  title="Meet the founders."
                  copy="Antera Realty is led by its founders, who personally guide buyers through projects, site visits and documentation. Call or WhatsApp them directly."
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <FounderCards size="lg" />
            </div>
          </div>
        </section>

        <HowWeWork />

        {/* Portfolio */}
        <section className="bg-background py-24 sm:py-32">
          <div className="container-x">
            <SectionHeading eyebrow="Our portfolio" title="Developments we represent." />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PORTFOLIO.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.06} className="h-full">
                  <TiltCard className="rounded-[1.5rem]">
                    <a
                      href={p.href}
                      data-cursor="Explore"
                      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] backdrop-blur">
                          {p.status}
                        </span>
                      </div>
                      <div className="flex flex-1 items-start justify-between gap-4 p-5">
                        <div className="flex flex-col gap-1">
                          <span className="font-display text-lg leading-tight">{p.name}</span>
                          <span className="text-xs text-muted-foreground">{p.location}</span>
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </a>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Office */}
        <section className="bg-surface py-24 sm:py-32">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-8 lg:col-span-5">
              <SectionHeading eyebrow="Visit us" title="Our office." />
              <Reveal className="flex flex-col gap-4 text-base">
                <p className="flex gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-champagne-deep" /> {CONTACT.office}
                </p>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center gap-3 hover:text-accent"
                >
                  <Phone className="h-5 w-5 text-champagne-deep" /> {CONTACT.phoneDisplay}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 hover:text-accent"
                >
                  <Mail className="h-5 w-5 text-champagne-deep" /> {CONTACT.email}
                </a>
              </Reveal>
              <Reveal>
                <a
                  href={OFFICE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("navy", "self-start")}
                >
                  Get directions <ExternalLink className="h-4 w-4" />
                </a>
              </Reveal>
            </div>
            <Reveal
              delay={0.1}
              className="overflow-hidden rounded-[2rem] border border-foreground/10 lg:col-span-7"
            >
              <iframe
                title="Antera Realty office — Vanasthalipuram, Hyderabad"
                src={OFFICE_MAP}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full grayscale-[30%] lg:h-full lg:min-h-[26rem]"
              />
            </Reveal>
          </div>
        </section>

        <FinalCta title="Let’s find your plot together." />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}

/** Six-step buying journey — the connecting line draws itself as you scroll. */
function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-primary-foreground sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              tone="dark"
              eyebrow="How we work"
              title="From first call to your plot."
              copy="A simple, guided journey — no pressure, and every document on the table."
            />
          </div>
        </div>
        <div ref={ref} className="relative lg:col-span-7 lg:col-start-6">
          <div className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-primary-foreground/12" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-6 left-[1.6rem] top-6 w-px origin-top bg-gradient-to-b from-champagne to-accent"
          />
          <ol className="flex flex-col gap-10">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.li
                key={step.index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE }}
                className="relative flex gap-6"
              >
                <span className="relative z-10 flex h-[3.2rem] w-[3.2rem] shrink-0 items-center justify-center rounded-full border border-champagne/50 bg-ink font-mono text-sm text-champagne">
                  {step.index}
                </span>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="font-display text-2xl">{step.title}</h3>
                  <p className="max-w-md text-base leading-relaxed text-primary-foreground/70">
                    {step.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
