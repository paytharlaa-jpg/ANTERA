"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { EASE, WordReveal } from "@/components/site/motion-primitives";
import { useLoaderDone } from "@/lib/loader";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-primary-foreground/60">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {it.href ? (
              <a href={it.href} className="hover:text-primary-foreground">
                {it.label}
              </a>
            ) : (
              <span aria-current="page" className="text-primary-foreground/85">
                {it.label}
              </span>
            )}
            {i < items.length - 1 ? <ChevronRight className="h-3 w-3 opacity-50" /> : null}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: it.label,
              ...(it.href ? { item: `https://anterarealty.com${it.href}` } : {}),
            })),
          }),
        }}
      />
    </nav>
  );
}

/** Full-bleed cinematic hero for project pages. */
export function ProjectHero({
  image,
  imageAlt,
  imagePosition = "50% 50%",
  overlay = "from-ink/95 via-ink/35 to-ink/10",
  logo,
  logoAlt,
  eyebrow,
  title,
  lede,
  breadcrumb,
  children,
  aside,
}: {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  overlay?: string;
  logo?: string;
  logoAlt?: string;
  eyebrow: ReactNode;
  title: string;
  lede: string;
  breadcrumb: { label: string; href?: string }[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const ready = useLoaderDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-ink text-primary-foreground"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <motion.img
          src={image}
          alt={imageAlt}
          style={{ scale, objectPosition: imagePosition }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className={cn("absolute inset-0 -z-10 bg-gradient-to-t", overlay)} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent" />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <div className="container-x flex flex-1 flex-col justify-end gap-10 pb-16 pt-32 sm:pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Breadcrumbs items={breadcrumb} />
        </motion.div>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            {logo ? (
              <motion.img
                src={logo}
                alt={logoAlt ?? ""}
                initial={{ opacity: 0, y: 14 }}
                {...(ready ? { animate: { opacity: 1, y: 0 } } : {})}
                transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
                className="h-12 w-auto self-start sm:h-16"
              />
            ) : null}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              {...(ready ? { animate: { opacity: 1, y: 0 } } : {})}
              transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
            >
              {eyebrow}
            </motion.div>
            <WordReveal
              as="h1"
              animateOnMount
              delay={0.4}
              text={title}
              className="big-title max-w-[15ch] text-balance"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              {...(ready ? { animate: { opacity: 1, y: 0 } } : {})}
              transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
              className="max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg"
            >
              {lede}
            </motion.p>
            {children ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                {...(ready ? { animate: { opacity: 1, y: 0 } } : {})}
                transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
                className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                {children}
              </motion.div>
            ) : null}
          </div>
          {aside ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              {...(ready ? { animate: { opacity: 1, y: 0 } } : {})}
              transition={{ delay: 1.1, duration: 1, ease: EASE }}
              className="lg:col-span-4"
            >
              {aside}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Sticky in-page navigation that highlights the section in view. */
export function SectionNav({
  items,
  cta,
}: {
  items: { id: string; label: string }[];
  cta?: ReactNode;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="sticky top-[4.5rem] z-30 border-b border-foreground/[0.07] bg-background/85 backdrop-blur-xl lg:top-20">
      <div className="container-x flex items-center justify-between gap-4">
        <nav
          aria-label="On this page"
          className="-mx-1 flex min-w-0 gap-1 overflow-x-auto py-2.5 [scrollbar-width:none]"
        >
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                active === it.id
                  ? "text-primary-foreground"
                  : "text-foreground/60 hover:text-foreground",
              )}
            >
              {active === it.id ? (
                <motion.span
                  layoutId="section-nav-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              ) : null}
              <span className="relative">{it.label}</span>
            </a>
          ))}
        </nav>
        {cta ? <div className="hidden shrink-0 md:block">{cta}</div> : null}
      </div>
    </div>
  );
}

export function FactStrip({
  facts,
  tone = "dark",
}: {
  facts: { value: string; label: string }[];
  tone?: "dark" | "light";
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border backdrop-blur-xl",
        tone === "dark"
          ? "border-primary-foreground/15 bg-primary-foreground/10"
          : "border-foreground/10 bg-foreground/10",
      )}
    >
      {facts.map((f) => (
        <div
          key={f.label}
          className={cn("flex flex-col gap-1 p-5", tone === "dark" ? "bg-ink/55" : "bg-card")}
        >
          <dt
            className={cn(
              "order-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
              tone === "dark" ? "text-primary-foreground/55" : "text-muted-foreground",
            )}
          >
            {f.label}
          </dt>
          <dd className="order-1 font-display text-2xl font-light leading-tight">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
