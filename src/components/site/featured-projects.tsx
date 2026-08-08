"use client";

import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";

import { PROJECTS } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

export function FeaturedProjects() {
  return (
    <Section id="projects" tone="cream">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>The Antera Portfolio</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="big-title max-w-3xl">
            Three Opportunities.
            <span className="block text-royal">One Vision for Tomorrow.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Explore strategically located plotted developments selected for connectivity,
            infrastructure, lifestyle and future potential.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col gap-6">
        {PROJECTS.map((project, i) => (
          <ScaleReveal key={project.slug} delay={i * 0.06}>
            <article className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-[1.05fr_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                <img
                  src={project.image}
                  alt={`${project.name} visualisation`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-primary/85 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-primary-foreground backdrop-blur">
                  Project {project.card}
                </span>
              </div>

              <div className="flex flex-col gap-5 p-7 sm:p-10">
                <Eyebrow>{project.eyebrow}</Eyebrow>
                <h3 className="display-title text-3xl sm:text-4xl">{project.name}</h3>
                <p className="text-sm text-foreground/75">{project.tagline}</p>

                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-accent/40 bg-accent/8 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-foreground/80"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{project.overview}</p>

                <div className="grid grid-cols-2 gap-3">
                  {project.facts.map((fact) => (
                    <div key={fact.label} className="rounded-2xl bg-secondary px-4 py-3">
                      <p className="display-title text-base">{fact.value}</p>
                      <p className="mt-1 text-[0.7rem] leading-snug text-muted-foreground">
                        {fact.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {project.cta} &rarr;
                  </Link>
                  <a
                    href={project.brochure}
                    download=""
                    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent"
                  >
                    <Download className="h-3.5 w-3.5" /> Brochure
                  </a>
                </div>
              </div>
            </article>
          </ScaleReveal>
        ))}
      </div>
    </Section>
  );
}