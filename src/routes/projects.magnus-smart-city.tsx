import { createFileRoute } from "@tanstack/react-router";

import { MagnusPage } from "@/components/projects/magnus-page";

const TITLE =
  "Magnus Smart City Phase 1 & Phase 2, Shadnagar | TG RERA P02400011410 | Antera Realty";
const DESCRIPTION =
  "Magnus Smart City by Antera Realty at Rameshwaram, Shadnagar. Phase 2: 58.28 acres, TG RERA P02400011410, HMDA LP 2522/HMDA/SWDL/2026. Phase 1: 16.31 acres, TG RERA P02400010251. Villa plots from ₹16,999/sq. yd.";
const URL = "https://anterarealty.com/projects/magnus-smart-city";

export const Route = createFileRoute("/projects/magnus-smart-city")({
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
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Place",
          name: "Magnus Smart City",
          description: DESCRIPTION,
          url: URL,
          image: "https://anterarealty.com/projects/magnus/gate-render.webp",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rameshwaram, Shadnagar",
            addressRegion: "Telangana",
            addressCountry: "IN",
          },
          containsPlace: [
            {
              "@type": "Place",
              name: "Magnus Smart City Phase 1",
              description: "16.31 acres · TG RERA P02400010251 · HMDA LP 0546/HMDA/SWDL/2025",
            },
            {
              "@type": "Place",
              name: "Magnus Smart City Phase 2",
              description: "58.28 acres · TG RERA P02400011410 · HMDA LP 2522/HMDA/SWDL/2026",
            },
          ],
        }),
      },
    ],
  }),
  component: MagnusPage,
});
