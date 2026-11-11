"use client";

import { Download, FileText, MapPin, Maximize2 } from "lucide-react";

import { FinalCta } from "@/components/site/final-cta";
import { FloatingWhatsApp, WhatsAppIcon } from "@/components/site/floating-whatsapp";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { useLightbox } from "@/components/site/project-blocks";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { buttonClass } from "@/components/site/ui";
import {
  AMENITIES,
  INFRASTRUCTURE,
  LOCATION_POINTS,
  MARVEL_LIFESTYLE,
  MARVEL_SMART,
  PRICING,
  PROJECTS,
  SPORTS,
  type ProjectSlug,
} from "@/lib/antera-data";
import { ASSETS } from "@/lib/assets";
import { whatsappLink } from "@/lib/projects";
import { FactStrip, ProjectHero, SectionNav } from "./shared";

const IMAGES: Partial<Record<ProjectSlug, string>> = {
  "avatar-2": "/projects/legacy/avatar-2.webp",
  "marvel-smart-city": "/projects/legacy/marvel-smart-city.webp",
};

const DOCS: Partial<Record<ProjectSlug, { label: string; href: string }[]>> = {
  "avatar-2": [
    { label: "Avatar 2 presentation", href: ASSETS.docs.avatar2Deck },
    { label: "Avatar 2 price structure", href: ASSETS.docs.avatar2Price },
  ],
  "marvel-smart-city": [{ label: "Marvel Smart City brochure", href: ASSETS.docs.marvelBrochure }],
};

const ENQUIRY: Partial<Record<ProjectSlug, "Aspirealty Avatar 2" | "Marvel Smart City">> = {
  "avatar-2": "Aspirealty Avatar 2",
  "marvel-smart-city": "Marvel Smart City",
};

export function LegacyProjectPage({ slug }: { slug: ProjectSlug }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  const isAvatar = slug === "avatar-2";
  const plan = useLightbox([
    { src: ASSETS.masterPlan, alt: "Avatar 2 master plan", caption: "Avatar 2 — master plan" },
  ]);
  if (!project) return null;
  const image = IMAGES[slug] ?? project.image;
  const docs = DOCS[slug] ?? [];
  const wa = `Hi Antera Realty, I'm interested in ${project.name}. Please share availability, pricing and site visit details.`;

  return (
    <>
      <SiteNav />
      <main id="main">
        <ProjectHero
          image={image}
          imageAlt={`${project.name} — project visual`}
          eyebrow={
            <span className="flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-champagne">
              {project.eyebrow} <span className="h-px w-6 bg-current opacity-60" /> {project.stage}
            </span>
          }
          title={project.name}
          lede={project.tagline}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/#projects" },
            { label: project.name },
          ]}
          aside={
            <FactStrip facts={project.facts.map((f) => ({ value: f.value, label: f.label }))} />
          }
        >
          <a href="#enquire" className={buttonClass("accent")}>
            Book a Site Visit
          </a>
          <a
            href={whatsappLink(wa)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("ghost-dark")}
          >
            <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
          </a>
        </ProjectHero>

        <SectionNav
          items={[
            { id: "overview", label: "Overview" },
            ...(isAvatar ? [{ id: "master-plan", label: "Master plan" }] : []),
            { id: "amenities", label: "Amenities" },
            ...(isAvatar ? [{ id: "location", label: "Location" }] : []),
            { id: "pricing", label: "Pricing" },
            { id: "documents", label: "Documents" },
            { id: "enquire", label: "Enquire" },
          ]}
        />

        <section id="overview" className="scroll-mt-36 bg-background py-24 sm:py-32">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="flex flex-col gap-8 lg:col-span-7">
              <SectionHeading
                eyebrow="About the project"
                title={`${project.type}, designed around tomorrow.`}
              />
              <Reveal delay={0.1}>
                <p className="text-pretty text-lg leading-relaxed text-foreground/80">
                  {project.overview}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <ul className="flex flex-col rounded-[2rem] border border-foreground/10 bg-card p-7">
                <li className="eyebrow pb-3 text-champagne-deep">Highlights</li>
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="border-b border-foreground/8 py-3.5 text-sm text-foreground/80 last:border-0"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {isAvatar ? (
          <section
            id="master-plan"
            className="scroll-mt-36 bg-ink py-24 text-primary-foreground sm:py-32"
          >
            <div className="container-x grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionHeading
                  tone="dark"
                  eyebrow="Master plan"
                  title="Designed around space, access & community."
                  copy="The Avatar 2 master plan shows plotted zones, the internal road network, clubhouse area, landscaped spaces, the entrance and Phase 2 areas."
                />
              </div>
              <Reveal className="lg:col-span-7">
                <button
                  type="button"
                  onClick={() => plan.open(0)}
                  className="group relative block w-full overflow-hidden rounded-[2rem] bg-white"
                >
                  <img
                    src={ASSETS.masterPlan}
                    alt="Avatar 2 master plan"
                    loading="lazy"
                    className="w-full transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 text-xs backdrop-blur">
                    <Maximize2 className="h-3.5 w-3.5" /> Tap to enlarge
                  </span>
                </button>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section id="amenities" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <div className="container-x flex flex-col gap-14">
            <SectionHeading
              eyebrow={isAvatar ? "Lifestyle & infrastructure" : "Smart living"}
              title={isAvatar ? "Everyday comforts, planned in." : "Ultra-luxury, future-ready."}
              copy="As described in the project’s sales material."
            />
            {isAvatar ? (
              <div className="grid gap-10 lg:grid-cols-3">
                <AmenityList
                  title="Clubhouse"
                  items={AMENITIES.map((a) => `${a.kind} — ${a.title}`)}
                />
                <AmenityList title="Sports" items={[...SPORTS.indoor, ...SPORTS.outdoor]} />
                <AmenityList title="Infrastructure" items={INFRASTRUCTURE.map((i) => i.title)} />
              </div>
            ) : (
              <div className="grid gap-10 lg:grid-cols-2">
                <AmenityList
                  title="Smart infrastructure"
                  items={MARVEL_SMART.map((m) => `${m.title} — ${m.copy}`)}
                />
                <AmenityList title="Lifestyle" items={[...MARVEL_LIFESTYLE]} />
              </div>
            )}
          </div>
        </section>

        {isAvatar ? (
          <section id="location" className="scroll-mt-36 bg-background py-24 sm:py-32">
            <div className="container-x flex flex-col gap-12">
              <SectionHeading
                eyebrow="Location"
                title="On the Srisailam Highway corridor."
                copy="Approximate distances from the Avatar 2 project presentation."
              />
              <div className="grid gap-x-10 sm:grid-cols-2">
                {LOCATION_POINTS.map((l, i) => (
                  <Reveal key={l.place} delay={(i % 2) * 0.05}>
                    <div className="flex items-center justify-between gap-4 border-b border-foreground/10 py-4">
                      <span className="flex items-center gap-3 text-sm text-foreground/85">
                        <MapPin className="h-4 w-4 text-champagne-deep" /> {l.place}
                      </span>
                      <span className="tabular shrink-0 text-sm text-muted-foreground">
                        {l.time} · {l.distance}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="pricing" className="scroll-mt-36 bg-surface py-24 sm:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Pricing"
                title={project.price}
                copy="Pricing is subject to availability and change. Please confirm with our team."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {isAvatar ? (
                PRICING.map((p) => (
                  <Reveal
                    key={p.phase}
                    className="flex flex-col gap-3 rounded-[1.75rem] border border-foreground/10 bg-card p-7"
                  >
                    <span className="eyebrow text-champagne-deep">{p.title}</span>
                    <span className="font-display text-5xl font-light">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.unit}</span>
                    <p className="text-sm leading-relaxed text-foreground/75">{p.copy}</p>
                  </Reveal>
                ))
              ) : (
                <Reveal className="flex flex-col gap-3 rounded-[1.75rem] border border-foreground/10 bg-card p-7 sm:col-span-2">
                  <span className="eyebrow text-champagne-deep">{project.stage}</span>
                  <span className="font-display text-5xl font-light">{project.price}</span>
                  <span className="text-sm text-muted-foreground">
                    Pre-launch pricing, subject to availability.
                  </span>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        <section id="documents" className="scroll-mt-36 bg-background py-24 sm:py-32">
          <div className="container-x flex flex-col gap-10">
            <SectionHeading
              eyebrow="Documents"
              title="Read the details."
              copy="Buyers should independently verify approvals, title documents and statutory information before purchase."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {docs.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-foreground/10 bg-card p-6 transition-colors hover:border-foreground/30"
                >
                  <span className="flex items-center gap-3 font-display text-xl">
                    <FileText className="h-5 w-5 text-champagne-deep" /> {d.label}
                  </span>
                  <Download className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <FinalCta title={`Visit ${project.name}.`} defaultProject={ENQUIRY[slug]} image={image} />
      </main>
      <SiteFooter />
      <FloatingWhatsApp message={wa} />
      {plan.node}
    </>
  );
}

function AmenityList({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal className="flex flex-col">
      <h3 className="mb-2 font-display text-2xl">{title}</h3>
      <ul>
        {items.map((it, i) => (
          <li
            key={it}
            className="flex gap-4 border-b border-foreground/10 py-3 text-sm text-foreground/80"
          >
            <span className="font-mono text-[0.66rem] text-champagne-deep">
              {String(i + 1).padStart(2, "0")}
            </span>
            {it}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
