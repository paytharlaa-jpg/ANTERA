import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/about/about-page";
import { CONTACT, FOUNDERS } from "@/lib/projects";

const TITLE = "About Antera Realty | Founders, Values & Projects in Hyderabad";
const DESCRIPTION =
  "Antera Realty helps families and investors buy verified plots across Hyderabad’s growth corridors — Magnus Smart City, Mirai and more. Meet founders Nagunuri Raju and Vamshi Krishna.";
const URL = "https://anterarealty.com/about";

export const Route = createFileRoute("/about")({
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
        content: "https://anterarealty.com/projects/magnus/site/site-04.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: URL,
          name: TITLE,
          mainEntity: {
            "@type": "RealEstateAgent",
            name: "Antera Realty",
            url: "https://anterarealty.com",
            telephone: CONTACT.phoneRaw,
            email: CONTACT.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Opp. Mangalya Shopping Mall, Vanasthalipuram",
              addressLocality: "Hyderabad",
              addressRegion: "Telangana",
              addressCountry: "IN",
            },
            founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});
