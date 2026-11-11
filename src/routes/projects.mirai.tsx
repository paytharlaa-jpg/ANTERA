import { createFileRoute } from "@tanstack/react-router";

import { MiraiPage } from "@/components/projects/mirai-page";

const TITLE = "Mirai — Plots near Rameshwaram, Shadnagar | Antera Realty";
const DESCRIPTION =
  "Mirai by Antera Realty: a 7-acre (proposed) HMDA-approved plotted community about 400 m from Rameshwaram Temple, Shadnagar. TG RERA awaited. Residential plots from ₹14,999/sq. yd. Explore the interactive digital layout.";
const URL = "https://anterarealty.com/projects/mirai";

export const Route = createFileRoute("/projects/mirai")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://anterarealty.com/projects/mirai/layout-plan.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Place",
          name: "Mirai by Antera Realty",
          description: DESCRIPTION,
          url: URL,
          image: "https://anterarealty.com/projects/mirai/layout-plan.webp",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rameshwaram, Shadnagar",
            addressRegion: "Telangana",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: MiraiPage,
});
