/**
 * CENTRAL PROJECT DATA — single source of truth for every project, phase,
 * approval number, price card and location fact shown on the site.
 *
 * Accuracy rules (real-estate content):
 *  - Only publish approval numbers that appear on a supplied source document.
 *  - Every price block carries its source + date. Set `published: false` to hide
 *    a price everywhere without deleting it.
 *  - Never copy one phase's approvals to another phase.
 */

export type ApprovalStatus = "approved" | "pending" | "not-disclosed";

export type Approval = {
  authority: "TG RERA" | "HMDA";
  label: string;
  status: ApprovalStatus;
  /** Registration / permit number exactly as printed on the source document. */
  number?: string;
  detail?: string;
  source: string;
  document?: { label: string; href: string };
};

export type PriceLine = { label: string; value: string };

export type PriceCard = {
  published: boolean;
  source: string;
  date: string;
  base: { label: string; value: number; note?: string }[];
  addOns: PriceLine[];
  schedule: PriceLine[];
  notes: string[];
  image?: string;
};

export type Media = {
  src: string;
  alt: string;
  caption?: string;
  kind?: "render" | "plan" | "creative" | "photo" | "map";
};

export const CONTACT = {
  company: "Antera Realty",
  phoneDisplay: "+91 99853 58899",
  phoneRaw: "+919985358899",
  whatsapp: "919985358899",
  email: "hello@anterarealty.com",
  office: "Opp. Mangalya Shopping Mall, Vanasthalipuram, Hyderabad, Telangana",
  site: "https://anterarealty.com",
  reraPortal: "https://rera.telangana.gov.in",
} as const;

export const LOGOS = {
  antera: "/assets/antera-logo.png",
  magnus: "/projects/magnus/magnus-logo.png",
  mirai: "/projects/mirai/mirai-logo.png",
} as const;

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ------------------------------------------------------------------ */
/* MAGNUS SMART CITY                                                   */
/* ------------------------------------------------------------------ */

const MAGNUS_ADD_ONS: PriceLine[] = [
  { label: "East Facing", value: "₹300 / sq. yd." },
  { label: "North East Facing", value: "₹600 / sq. yd." },
  { label: "North West Facing", value: "₹500 / sq. yd." },
  { label: "South East / West", value: "₹400 / sq. yd." },
  { label: "40 ft Road Frontage", value: "₹100 / sq. yd." },
  { label: "60 ft Road Frontage", value: "₹300 / sq. yd." },
];

const MAGNUS_SCHEDULE: PriceLine[] = [
  { label: "Booking Amount", value: "₹1,00,000" },
  { label: "Within 30 Days", value: "100% of total amount, less booking amount" },
  { label: "SRO (Registration) Value", value: "₹4,200 / sq. yd." },
];

const MAGNUS_PRICE_SOURCE = "Magnus Smart City Phase-1 & 2 price card";
const MAGNUS_PRICE_DATE = "14 Sep 2026";
const MAGNUS_PRICE_IMAGE = "/projects/magnus/price-card-2026-09-14.webp";

export const MAGNUS = {
  slug: "magnus-smart-city",
  name: "Magnus Smart City",
  developer: "Antera Realty",
  tagline: "The Blueprint for a Beautiful Life.",
  location: "Rameshwaram – Shadnagar, Telangana",
  shortLocation: "Rameshwaram · Shadnagar",
  overallExtent: "100+ acres proposed",
  type: "Premium villa plots",
  logo: LOGOS.magnus,
  hero: {
    src: "/projects/magnus/gate-render.webp",
    alt: "Magnus Smart City entrance arch — architectural render",
  },
  brochure: "/assets/Magnus_SmartCity_E-Brochure.pdf",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rameshwaram+Temple+Shadnagar+Telangana",
  mapsEmbed:
    "https://www.google.com/maps?q=Rameshwaram+Temple,+Shadnagar,+Telangana&z=12&output=embed",
  overview:
    "Magnus Smart City is a premium plotted community by Antera Realty at Rameshwaram, near Shadnagar on the Hyderabad–Bangalore NH-44 corridor. Planned around Vastu-compliant plots, wide CC roads and a signature clubhouse, it is being delivered in phases — each with its own HMDA layout permission and TG RERA registration.",
  phases: [
    {
      id: "phase-1",
      label: "Phase 1",
      status: "Open for booking",
      extent: "16.31 acres",
      plots: "215 plots",
      plotSizes: "177.77 – 527.45 sq. yds.",
      summary:
        "The first HMDA-approved phase of Magnus Smart City — 16.31 acres with 215 Vastu-compliant villa plots and a dedicated commercial block.",
      approvals: [
        {
          authority: "TG RERA",
          label: "TG RERA Registration",
          status: "approved",
          number: "P02400010251",
          detail: "Valid 10 Sep 2025 – 10 Sep 2030",
          source: "TG RERA Form ‘C’ registration certificate dated 18 Nov 2025",
          document: {
            label: "View RERA certificate (PDF)",
            href: "/assets/TG_RERA_APPROVED_CERTIFICATE-8.pdf",
          },
        },
        {
          authority: "HMDA",
          label: "HMDA Layout Permission",
          status: "approved",
          number: "0546/HMDA/SWDL/2025",
          detail: "16.31 acres — Phase 1",
          source: "Magnus Smart City project brochure",
        },
      ] satisfies Approval[],
      pricing: {
        published: true,
        source: MAGNUS_PRICE_SOURCE,
        date: MAGNUS_PRICE_DATE,
        base: [
          { label: "Residential Block", value: 16999, note: "per sq. yd." },
          { label: "Commercial Block", value: 18499, note: "per sq. yd. · Phase 1 only" },
        ],
        addOns: MAGNUS_ADD_ONS,
        schedule: MAGNUS_SCHEDULE,
        notes: [
          "An extra Corpus Fund of ₹200 per sq. yd. is applicable (not included in the plot cost).",
          "Delay beyond 40 days will attract additional charges.",
        ],
        image: MAGNUS_PRICE_IMAGE,
      } satisfies PriceCard,
      layout: {
        src: "/projects/magnus/phase-1-layout.webp",
        alt: "Magnus Smart City Phase 1 layout plan",
      },
    },
    {
      id: "phase-2",
      label: "Phase 2",
      status: "Newly launched · RERA & LP received",
      extent: "58.28 acres",
      plots: undefined,
      plotSizes: undefined,
      summary:
        "The next chapter of Magnus — 58.28 acres alongside Phase 1 at Rameshwaram, now with its own HMDA layout permission and TG RERA registration.",
      approvals: [
        {
          authority: "TG RERA",
          label: "TG RERA Registration",
          status: "approved",
          number: "P02400011410",
          detail: "Magnus Smart City — Phase 2",
          source: "Official Phase 2 RERA announcement",
        },
        {
          authority: "HMDA",
          label: "HMDA Layout Permission (LP)",
          status: "approved",
          number: "2522/HMDA/SWDL/2026",
          detail: "58.28 acres — Phase 2",
          source: "Official Phase 2 LP approval announcement",
        },
      ] satisfies Approval[],
      pricing: {
        published: true,
        source: MAGNUS_PRICE_SOURCE,
        date: MAGNUS_PRICE_DATE,
        base: [{ label: "Residential Block", value: 16999, note: "per sq. yd." }],
        addOns: MAGNUS_ADD_ONS,
        schedule: MAGNUS_SCHEDULE,
        notes: [
          "An extra Corpus Fund of ₹200 per sq. yd. is applicable (not included in the plot cost).",
          "Delay beyond 40 days will attract additional charges.",
        ],
        image: MAGNUS_PRICE_IMAGE,
      } satisfies PriceCard,
      layout: undefined as Media | undefined,
    },
  ],
  highlights: [
    "Gated community development",
    "100% Vastu compliant",
    "Underground electricity",
    "Underground drainage",
    "Storm water drains",
    "60, 33 & 30 ft CC roads with kerb stones",
    "Avenue plantation",
    "Children’s park arena",
    "Overhead tank bund",
    "Lush green compound",
    "Modern street lights",
  ],
  clubhouse: [
    "Spa",
    "Mini Theater",
    "Guest Rooms",
    "Swimming Pool",
    "Clinic & Pharmacy",
    "Indoor Sports Zone",
    "Gymnasium",
    "Multipurpose Hall for Events",
    "Wellness & Meditation Center",
    "Sky Lounge & Rooftop Restaurant",
    "Business Center & Co-working Spaces",
    "Commercial Space (Shops / Convenience Stores)",
  ],
  connectivity: [
    {
      group: "Connectivity",
      items: [
        "Strategic location on the proposed Regional Ring Road (RRR)",
        "3 min to Hyderabad–Bangalore Highway (NH-44)",
        "5 min to Parigi Highway (NH-163)",
        "5 min to Shadnagar Town",
        "10 min to Shadnagar MMTS Railway Station",
        "30 min to ORR Junction Exit 16",
        "35 min to Rajiv Gandhi International Airport",
      ],
    },
    {
      group: "Industrial & Commercial",
      items: [
        "2 min to NRSC and ISRO facilities",
        "5 min to NATCO and MSN Labs",
        "7 min to Microsoft Data Centre",
        "7 min to AdaniConneX Datacenter",
        "7 min to Elikatta SEZ",
        "8 min to P&G and Amazon Warehouse",
      ],
    },
    {
      group: "Education",
      items: [
        "4 min to Indian Heights School",
        "6 min to The Master Minds International School",
        "6 min to Delhi Public School",
        "10 min to Symbiosis University",
        "10 min to TATA Institute of Social Sciences",
      ],
    },
    {
      group: "Healthcare & Spiritual",
      items: [
        "2 min to Rameshwaram Temple",
        "5 min to ABV Multispeciality Hospital",
        "7 min to Sri Varada Neuro Multispecialty Hospital",
        "15 min to Kanha Shanti Vanam",
        "20 min to 216 ft Statue of Ramanujacharya",
      ],
    },
  ],
  gallery: [
    {
      src: "/projects/magnus/gate-render.webp",
      alt: "Magnus Smart City entrance arch",
      caption: "Entrance arch — render",
      kind: "render",
    },
    {
      src: "/projects/magnus/clubhouse-render.webp",
      alt: "Magnus Clubhouse at Magnus Smart City",
      caption: "Magnus Clubhouse — render",
      kind: "render",
    },
    {
      src: "/projects/magnus/amenities-collage.webp",
      alt: "Magnus Smart City amenities collage",
      caption: "Inner World amenities — brochure",
      kind: "render",
    },
    {
      src: "/projects/magnus/phase-1-layout.webp",
      alt: "Magnus Smart City Phase 1 layout plan",
      caption: "Phase 1 layout plan",
      kind: "plan",
    },
    {
      src: "/projects/magnus/location-map.webp",
      alt: "Magnus Smart City location map",
      caption: "Location map — brochure",
      kind: "map",
    },
    {
      src: "/projects/magnus/phase-2-rera-announcement.webp",
      alt: "Magnus Phase 2 TG RERA registration announcement",
      caption: "Phase 2 — RERA received",
      kind: "creative",
    },
    {
      src: "/projects/magnus/phase-2-lp-approval.webp",
      alt: "Magnus Phase 2 HMDA LP approval announcement",
      caption: "Phase 2 — LP approved",
      kind: "creative",
    },
    {
      src: "/projects/magnus/price-card-2026-09-14.webp",
      alt: "Magnus Smart City Phase 1 & 2 price card, 14 Sep 2026",
      caption: "Price card — 14 Sep 2026",
      kind: "creative",
    },
  ] satisfies Media[],
} as const;

/* ------------------------------------------------------------------ */
/* MIRAI                                                               */
/* ------------------------------------------------------------------ */

export const MIRAI = {
  slug: "mirai",
  name: "Mirai",
  developer: "Antera Realty",
  tagline: "Rooted in Faith. Built for Life.",
  location: "Near Rameshwaram, Shadnagar, Telangana",
  shortLocation: "Rameshwaram · Shadnagar",
  extent: "7 acres (proposed)",
  type: "Premium residential plots",
  logo: LOGOS.mirai,
  digitalLayoutUrl: "https://magnus2-dl.fly.dev/mirai-dl",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rameshwaram+Temple+Shadnagar+Telangana",
  overview:
    "Mirai is an intimate plotted community by Antera Realty, a short walk from the Rameshwaram temple near Shadnagar. A Vastu-based layout of 30 ft and 40 ft roads, a landscaped open area and social infrastructure — planned for families who want calm, connected everyday living.",
  approvals: [
    {
      authority: "HMDA",
      label: "HMDA Layout",
      status: "approved",
      detail: "HMDA approved — LP number to be published",
      source: "Client confirmation (Nov 2026)",
    },
    {
      authority: "TG RERA",
      label: "TG RERA Registration",
      status: "pending",
      detail: "Application awaiting approval",
      source: "Client confirmation (Nov 2026)",
    },
  ] satisfies Approval[],
  pricing: {
    published: true,
    source: "Mirai price card",
    date: "21 Mar 2026",
    base: [
      { label: "Residential Block", value: 14999, note: "per sq. yd." },
      { label: "Commercial Block", value: 16999, note: "per sq. yd." },
    ],
    addOns: [
      { label: "East Facing", value: "₹300 / sq. yd." },
      { label: "North East Facing", value: "₹600 / sq. yd." },
      { label: "North West Facing", value: "₹500 / sq. yd." },
      { label: "South East / West", value: "₹400 / sq. yd." },
      { label: "40 ft Road Frontage", value: "₹100 / sq. yd." },
    ],
    schedule: [
      { label: "Booking Amount", value: "₹1,00,000" },
      { label: "Within 30 Days", value: "100% of total amount, less booking amount" },
    ],
    notes: [
      "Delay beyond 40 days will attract additional charges.",
      "Prices are subject to change without prior notice.",
    ],
  } satisfies PriceCard,
  locationHighlights: [
    "60 ft government road facing (100 ft proposed — HMDA)",
    "Inside the proposed RRR zone",
    "Rameshwaram Temple about 400 m away",
    "About 5 min drive from Bangalore Highway (NH-44)",
    "Near ISRO NRSC Centre",
    "Close to MSN Labs Unit V",
    "Surrounded by residential & commercial developments",
    "Access to international schools, colleges, malls & multispecialty hospitals",
  ],
  layoutFeatures: [
    { title: "Vastu-Based Layout", copy: "Plots oriented to Vastu principles." },
    { title: "30 & 40 ft Roads", copy: "A 40 ft spine road with 30 ft internal roads." },
    { title: "Children’s Park Area", copy: "A landscaped open area of about 2,561 sq. yds." },
    { title: "Drainage System", copy: "Planned drainage across the layout." },
    { title: "Walking & Cycle Track", copy: "Space for everyday movement." },
    { title: "Social Space", copy: "Social infrastructure of about 773 sq. yds." },
    { title: "Compound Wall & Arch", copy: "A defined boundary and entrance arch." },
  ],
  layout: {
    src: "/projects/mirai/layout-plan.webp",
    alt: "Mirai project layout plan — premium residential layout",
  },
  gallery: [
    {
      src: "/projects/mirai/layout-plan.webp",
      alt: "Mirai project layout plan",
      caption: "Layout plan",
      kind: "plan",
    },
    {
      src: "/projects/mirai/location-map.webp",
      alt: "Mirai location map",
      caption: "Location map — brochure",
      kind: "map",
    },
  ] satisfies Media[],
} as const;

/* ------------------------------------------------------------------ */
/* Portfolio summary used by the homepage, nav, footer, forms          */
/* ------------------------------------------------------------------ */

export type PortfolioItem = {
  id: string;
  name: string;
  developer?: string;
  href: string;
  location: string;
  status: string;
  priceFrom?: string;
  image: string;
  imageAlt: string;
  blurb: string;
  badges: string[];
  featured: boolean;
  accent: "magnus" | "mirai" | "ink";
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "magnus-phase-1",
    name: "Magnus Smart City — Phase 1",
    developer: "Antera Realty",
    href: "/projects/magnus-smart-city#phase-1",
    location: MAGNUS.shortLocation,
    status: "Open for booking",
    priceFrom: `${formatINR(16999)} / sq. yd.`,
    image: "/projects/magnus/clubhouse-render.webp",
    imageAlt: "Magnus Clubhouse render, Magnus Smart City",
    blurb: "16.31 acres · 215 Vastu-compliant villa plots · residential & commercial blocks.",
    badges: ["TG RERA P02400010251", "HMDA LP 0546/HMDA/SWDL/2025"],
    featured: true,
    accent: "magnus",
  },
  {
    id: "magnus-phase-2",
    name: "Magnus Smart City — Phase 2",
    developer: "Antera Realty",
    href: "/projects/magnus-smart-city#phase-2",
    location: MAGNUS.shortLocation,
    status: "Newly launched",
    priceFrom: `${formatINR(16999)} / sq. yd.`,
    image: "/projects/magnus/gate-render.webp",
    imageAlt: "Magnus Smart City entrance arch render",
    blurb: "58.28 acres beside Phase 1 · RERA registration and HMDA LP received.",
    badges: ["TG RERA P02400011410", "HMDA LP 2522/HMDA/SWDL/2026"],
    featured: true,
    accent: "magnus",
  },
  {
    id: "mirai",
    name: "Mirai",
    developer: "Antera Realty",
    href: "/projects/mirai",
    location: MIRAI.shortLocation,
    status: "HMDA approved · RERA awaited",
    priceFrom: `${formatINR(14999)} / sq. yd.`,
    image: "/projects/mirai/layout-plan.webp",
    imageAlt: "Mirai layout plan",
    blurb: "7 acres (proposed) · 400 m from Rameshwaram Temple · Vastu-based layout.",
    badges: ["HMDA approved", "TG RERA awaited"],
    featured: true,
    accent: "mirai",
  },
  {
    id: "avatar-2",
    name: "Aspirealty Avatar 2",
    href: "/projects/avatar-2",
    location: "Karkalpahad · Srisailam Highway",
    status: "Phase 1 + Phase 2",
    priceFrom: "₹15,500 / sq. yd.",
    image: "/projects/legacy/avatar-2.webp",
    imageAlt: "Aspirealty Avatar 2 project visual",
    blurb: "8 acres approved, 17 acres proposed · clubhouse and sports amenities.",
    badges: ["550 m from Srisailam Highway"],
    featured: false,
    accent: "ink",
  },
  {
    id: "marvel-smart-city",
    name: "Marvel Smart City",
    href: "/projects/marvel-smart-city",
    location: "Srisailam Highway corridor",
    status: "Pre-launch",
    priceFrom: "₹16,000 / sq. yd.",
    image: "/projects/legacy/marvel-smart-city.webp",
    imageAlt: "Marvel Smart City project visual",
    blurb: "100+ acre ultra-luxury villa plot community · pre-launch opportunity.",
    badges: ["Pre-launch"],
    featured: false,
    accent: "ink",
  },
];

export const ENQUIRY_PROJECTS = [
  "Magnus Smart City — Phase 1",
  "Magnus Smart City — Phase 2",
  "Mirai",
  "Aspirealty Avatar 2",
  "Marvel Smart City",
  "Not sure yet",
] as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

export const WA_MESSAGES = {
  general: "Hi Antera Realty, I'd like to know more about your projects, pricing and site visits.",
  magnus1:
    "Hi Antera Realty, I'm interested in Magnus Smart City Phase 1. Please share plot availability and pricing.",
  magnus2:
    "Hi Antera Realty, I'm interested in Magnus Smart City Phase 2 (RERA P02400011410). Please share plot availability and pricing.",
  mirai: "Hi Antera Realty, I'm interested in Mirai. Please share plot availability and pricing.",
  siteVisit: "Hi Antera Realty, I'd like to book a site visit. Please share available slots.",
} as const;
