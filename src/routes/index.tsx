import { createFileRoute } from "@tanstack/react-router";

import { ApprovalsSection } from "@/components/home/approvals";
import { BrandIntro } from "@/components/home/brand-intro";
import { GallerySection } from "@/components/home/gallery";
import { HomeHero } from "@/components/home/hero";
import { LaunchSpotlight } from "@/components/home/launch-spotlight";
import { LocationSection } from "@/components/home/location";
import { PlotStory } from "@/components/home/plot-story";
import { ProjectsShowcase } from "@/components/home/projects-showcase";
import { FaqSection } from "@/components/site/faq";
import { ZoomWindow } from "@/components/site/scroll-effects";
import { FinalCta } from "@/components/site/final-cta";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";

const TITLE = "Antera Realty | Magnus Smart City Phase 2, Mirai & Premium Plots near Shadnagar";
const DESCRIPTION =
  "Magnus Smart City Phase 2 is now TG RERA registered (P02400011410) with HMDA LP 2522/HMDA/SWDL/2026. Explore Magnus Phase 1 & 2 and Mirai at Rameshwaram, Shadnagar — villa plots from ₹16,999/sq. yd.";
const URL = "https://anterarealty.com/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      {
        property: "og:image",
        content: "https://anterarealty.com/projects/magnus/gate-render.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: URL },
      {
        rel: "preload",
        as: "image",
        href: "/projects/magnus/gate-render.webp",
        fetchPriority: "high",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <HomeHero />
        <LaunchSpotlight />
        <BrandIntro />
        <PlotStory />
        <ProjectsShowcase />
        <ZoomWindow
          src="/projects/magnus/clubhouse-render.webp"
          alt="Mugdha Clubhouse at Magnus Smart City — architectural render"
          caption="Mugdha Clubhouse, Magnus Smart City — architectural render, representational"
        >
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-champagne">
            Magnus Smart City · Lifestyle
          </span>
          <h2 className="big-title mt-4 max-w-3xl">
            A signature clubhouse at the heart of it all.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            Spa, swimming pool, gymnasium, mini theatre, sky lounge, co-working and more — planned
            for the proposed 75+ acre Magnus community.
          </p>
          <a
            href="/projects/magnus-smart-city#clubhouse"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-champagne px-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink"
          >
            Explore the clubhouse
          </a>
        </ZoomWindow>
        <ApprovalsSection />
        <LocationSection />
        <GallerySection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
