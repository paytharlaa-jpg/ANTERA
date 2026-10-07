"use client";

import { Link } from "@tanstack/react-router";
import { Download, CheckCircle2, AlertCircle } from "lucide-react";

import { PROJECTS } from "@/lib/antera-data";
import { Reveal, ScaleReveal } from "./motion-primitives";
import { Eyebrow, Section } from "./ui";

function getApprovalBadge(slug: string) {
  switch (slug) {
    case "magnus-smart-city":
      return { text: "TG RERA Approved (Certificate Available)", approved: true };
    case "marvel-smart-city":
      return { text: "Pre-Launch (Approvals Pending)", approved: false };
    case "avatar-2":
      return { text: "Phase 1 & 2 Approved (Number pending)", approved: true };
    default:
      return null;
  }
}

export function FeaturedProjects() {
  return (
    <Section id="projects" className="bg-[#EFECE6] py-24">
      <div className="flex w-full max-w-7xl mx-auto flex-col gap-6 px-4 md:px-8">
        <Reveal>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/50">
            <span className="h-2 w-2 rounded-full bg-orange-500"></span>
            <span>The Antera Portfolio</span>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          {/* SEO Playbook: Changed tagline H2 to descriptive keyword-rich H2 */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter text-black max-w-3xl">
            Three Premium Plot Projects Near Future City
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            Explore strategically located plotted developments selected for connectivity,
            infrastructure, lifestyle and future potential on the Srisailam Highway.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 flex w-full max-w-7xl mx-auto flex-col gap-12 px-4 md:px-8">
        {PROJECTS.map((project, i) => {
          const approval = getApprovalBadge(project.slug);
          return (
            <ScaleReveal key={project.slug} delay={i * 0.06}>
              <article className="group grid overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-white shadow-xl shadow-black/5 md:grid-cols-[1.2fr_1fr] transition-transform hover:-translate-y-1 duration-500 border border-black/5">
                {/* Image Section */}
                <div className="relative h-[300px] w-full overflow-hidden md:h-full">
                  <img
                    src={project.image}
                    alt={`${project.name} premium open plot layout in Hyderabad`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  {/* Elegant floating badge */}
                  <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-4 py-2 border border-white/20 text-white shadow-lg">
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Project {project.card}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-8 sm:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                      {project.eyebrow}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-black mb-2">
                    {project.name}
                  </h3>
                  
                  {/* SEO Playbook: Show approvals clearly */}
                  {approval && (
                    <div className={`mb-6 flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${approval.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {approval.approved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                      {approval.text}
                    </div>
                  )}

                  <p className="mb-6 text-sm sm:text-base leading-relaxed text-black/60">
                    {project.overview}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {project.facts.map((fact) => (
                      <div key={fact.label} className="rounded-2xl border border-black/5 bg-gray-50 p-4 transition-colors group-hover:bg-gray-100">
                        <p className="font-display text-lg font-bold text-black">{fact.value}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-black/50">
                          {fact.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-4">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-orange-500 shadow-md"
                    >
                      {project.cta}
                    </Link>
                    <a
                      href={project.brochure}
                      download=""
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-transparent px-6 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-black/5"
                    >
                      <Download className="h-4 w-4" /> Brochure
                    </a>
                  </div>
                </div>
              </article>
            </ScaleReveal>
          );
        })}
      </div>
    </Section>
  );
}