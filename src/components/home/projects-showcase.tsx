"use client";

import { StackCards, TiltCard } from "@/components/site/scroll-effects";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { PORTFOLIO, type PortfolioItem } from "@/lib/projects";
import { cn } from "@/lib/utils";

const ACCENT: Record<PortfolioItem["accent"], string> = {
  magnus: "text-magnus",
  mirai: "text-mirai",
  ink: "text-accent",
};

export function ProjectsShowcase() {
  const featured = PORTFOLIO.filter((p) => p.featured);
  const more = PORTFOLIO.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative scroll-mt-20 bg-background py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured developments"
          title="Three addresses. One standard of clarity."
          copy="Magnus Smart City Phase 1 and Phase 2 share one location near Shadnagar but hold separate approvals. Mirai is an independent, smaller community a short walk from the Rameshwaram temple."
        />

        <div className="mt-16 lg:mt-20">
          <StackCards>
            {featured.map((p, i) => (
              <FeatureRow key={p.id} p={p} index={i} />
            ))}
          </StackCards>
        </div>

        <div className="mt-24 flex flex-col gap-8">
          <Reveal className="flex items-end justify-between gap-6 border-b border-foreground/10 pb-6">
            <h3 className="font-display text-3xl font-light sm:text-4xl">More from Antera</h3>
            <span className="hidden text-xs uppercase tracking-[0.16em] text-muted-foreground sm:block">
              Srisailam Highway corridor
            </span>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {more.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <TiltCard className="rounded-[1.75rem]">
                  <a href={p.href} data-cursor="Explore" className="group flex flex-col gap-5">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-surface">
                      <img
                        src={p.image}
                        alt={p.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                        {p.status}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-display text-2xl">{p.name}</span>
                        <span className="text-sm text-muted-foreground">{p.blurb}</span>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ p, index }: { p: PortfolioItem; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <a
        href={p.href}
        data-cursor="Explore"
        className="group grid overflow-hidden rounded-[2rem] border border-foreground/10 bg-card transition-[border-color,box-shadow] duration-500 hover:border-foreground/20 hover:shadow-[0_40px_90px_-50px_rgb(17_26_46/0.5)] lg:grid-cols-12"
      >
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-surface lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]",
            flip && "lg:order-2",
          )}
        >
          <img
            src={p.image}
            alt={p.imageAlt}
            loading="lazy"
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]",
              p.id === "mirai" ? "object-cover object-[60%_40%]" : "object-cover",
            )}
          />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                p.id === "magnus-phase-2"
                  ? "bg-accent"
                  : p.id === "mirai"
                    ? "bg-amber-500"
                    : "bg-emerald-500",
              )}
            />
            {p.status}
          </span>
        </div>
        <div
          className={cn(
            "flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5",
            flip && "lg:order-1",
          )}
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4">
              <span className={cn("font-mono text-xs", ACCENT[p.accent])}>0{index + 1}</span>
              {p.developer ? (
                <span className="text-[0.64rem] uppercase tracking-[0.18em] text-muted-foreground">
                  by {p.developer}
                </span>
              ) : null}
            </div>
            <h3 className="font-display text-[2.1rem] font-light leading-[1.05] tracking-tight sm:text-5xl">
              {p.name}
            </h3>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {p.location}
            </p>
            <p className="text-pretty text-base leading-relaxed text-foreground/75">{p.blurb}</p>
            <div className="flex flex-wrap gap-2">
              {p.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-foreground/10 bg-surface px-3 py-1.5 font-mono text-[0.68rem] text-foreground/75"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-foreground/10 pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Residential from
              </span>
              <span className="whitespace-nowrap font-display text-xl sm:text-2xl">
                {p.priceFrom}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
              Explore
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}
