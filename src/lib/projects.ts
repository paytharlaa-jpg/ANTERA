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
/* MAGNUS — real site photographs & final clubhouse design            */
/* ------------------------------------------------------------------ */

const SITE = (n: number, caption: string, alt: string): Media => ({
  src: `/projects/magnus/site/site-${String(n).padStart(2, "0")}.webp`,
  alt: `Magnus Smart City site, October 2026 — ${alt}`,
  caption,
  kind: "photo",
});

/** Real photographs from the Magnus Smart City site, taken 28 Oct 2026. */
export const SITE_PHOTOS: Media[] = [
  SITE(11, "Entrance arch at dusk", "entrance arch at dusk"),
  SITE(1, "Landscaped avenue & CC roads", "landscaped median and internal roads"),
  SITE(4, "Main road with corten pergola", "main road with corten-steel pergola"),
  SITE(9, "Entrance arch — wide view", "entrance arch, wide view"),
  SITE(2, "Corten-steel pergola", "corten-steel pergola beside the road"),
  SITE(10, "Paver walkway along CC road", "paver-block walkway along the road"),
  SITE(3, "Avenue plantation & power infrastructure", "avenue plantation and electrical panels"),
  SITE(8, "Entrance arch installation", "entrance arch being installed"),
  SITE(7, "Corten pergola — side view", "corten pergola side view"),
  SITE(5, "Entrance arch — under construction", "entrance arch under construction"),
  SITE(6, "Arch frame being erected", "arch frame being erected"),
];

const CH = "/projects/magnus/clubhouse";

/** Final clubhouse drawings — "Proposed conceptual views of clubhouse", Magnus Smart City Phase II. */
export const CLUBHOUSE = {
  title: "Magnus Clubhouse",
  phase: "Phase 2",
  status: "Proposed conceptual design",
  totalArea: 33625,
  levels: [
    {
      id: "ground",
      name: "Ground floor",
      area: "5,422.5 sq. ft",
      items: ["Lounge", "Gym", "Clinic", "Pharmacy", "4 convenience shops"],
      outdoor: [
        "Swimming pool with wooden deck",
        "Party lawn & walkway",
        "Entrance plaza",
        "Landscaped gardens",
        "Car parking",
      ],
      image: `${CH}/aerial-day.webp`,
      plan: `${CH}/plan-ground.webp`,
    },
    {
      id: "first",
      name: "First floor",
      area: "9,400.89 sq. ft",
      items: [
        "Mini theatre",
        "Multi-purpose hall",
        "Yoga hall",
        "Table tennis",
        "Chess & carroms",
        "Billiards / air hockey",
      ],
      outdoor: [],
      image: `${CH}/front-day.webp`,
      plan: `${CH}/plan-first.webp`,
    },
    {
      id: "second",
      name: "Second floor",
      area: "9,400.89 sq. ft",
      items: ["Massage & spa", "VIP lounge", "7 guest rooms", "Suite room"],
      outdoor: [],
      image: `${CH}/corner-day.webp`,
      plan: `${CH}/plan-second.webp`,
    },
    {
      id: "terrace",
      name: "Terrace",
      area: "9,400.89 sq. ft",
      items: ["Bar & restaurant", "VIP lounge", "Co-working space", "Kitchen"],
      outdoor: [],
      image: `${CH}/aerial-night.webp`,
      plan: `${CH}/plan-terrace.webp`,
    },
  ],
  views: [
    {
      src: `${CH}/front-sunset.webp`,
      alt: "Magnus Clubhouse front elevation at sunset",
      caption: "Front elevation — sunset",
      kind: "render",
    },
    {
      src: `${CH}/front-night.webp`,
      alt: "Magnus Clubhouse front elevation at night",
      caption: "Front elevation — night",
      kind: "render",
    },
    {
      src: `${CH}/front-day.webp`,
      alt: "Magnus Clubhouse front elevation",
      caption: "Front elevation — day",
      kind: "render",
    },
    {
      src: `${CH}/aerial-day.webp`,
      alt: "Magnus Clubhouse aerial view",
      caption: "Aerial view — day",
      kind: "render",
    },
    {
      src: `${CH}/aerial-night.webp`,
      alt: "Magnus Clubhouse aerial view at night",
      caption: "Aerial view — night",
      kind: "render",
    },
    {
      src: `${CH}/corner-day.webp`,
      alt: "Magnus Clubhouse isometric view",
      caption: "Isometric view",
      kind: "render",
    },
    {
      src: `${CH}/corner-night.webp`,
      alt: "Magnus Clubhouse isometric view at night",
      caption: "Isometric view — night",
      kind: "render",
    },
  ] satisfies Media[],
  alternates: [
    {
      src: `${CH}/option2-front-day.webp`,
      alt: "Magnus Clubhouse design option 2, front elevation",
      caption: "Design option 2 — elevation",
      kind: "render",
    },
    {
      src: `${CH}/option2-front-night.webp`,
      alt: "Magnus Clubhouse design option 2 at night",
      caption: "Design option 2 — night",
      kind: "render",
    },
    {
      src: `${CH}/option2-aerial.webp`,
      alt: "Magnus Clubhouse design option 2, aerial view",
      caption: "Design option 2 — aerial",
      kind: "render",
    },
    {
      src: `${CH}/option2-north-night.webp`,
      alt: "Magnus Clubhouse design option 2, north elevation at night",
      caption: "Design option 2 — north elevation",
      kind: "render",
    },
    {
      src: `${CH}/option3-front-day.webp`,
      alt: "Magnus Clubhouse design option 3, front elevation",
      caption: "Design option 3 — elevation",
      kind: "render",
    },
    {
      src: `${CH}/option3-front-night.webp`,
      alt: "Magnus Clubhouse design option 3 at night",
      caption: "Design option 3 — night",
      kind: "render",
    },
  ] satisfies Media[],
  plans: [
    {
      src: `${CH}/plan-ground.webp`,
      alt: "Magnus Clubhouse ground floor plan",
      caption: "Ground floor plan",
      kind: "plan",
    },
    {
      src: `${CH}/plan-first.webp`,
      alt: "Magnus Clubhouse first floor plan",
      caption: "First floor plan",
      kind: "plan",
    },
    {
      src: `${CH}/plan-second.webp`,
      alt: "Magnus Clubhouse second floor plan",
      caption: "Second floor plan",
      kind: "plan",
    },
    {
      src: `${CH}/plan-terrace.webp`,
      alt: "Magnus Clubhouse terrace floor plan",
      caption: "Terrace floor plan",
      kind: "plan",
    },
  ] satisfies Media[],
} as const;

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
    src: "/projects/magnus/clubhouse/front-sunset.webp",
    alt: "Magnus Clubhouse at sunset — proposed conceptual design",
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
    "Swimming pool with wooden deck",
    "Gym",
    "Spa & massage",
    "Mini theatre",
    "Multi-purpose hall",
    "Yoga hall",
    "Indoor games — table tennis, billiards, chess & carroms",
    "Guest rooms & suite",
    "VIP lounges",
    "Co-working space",
    "Terrace bar & restaurant",
    "Clinic, pharmacy & convenience shops",
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
    ...SITE_PHOTOS.slice(0, 6),
    {
      src: "/projects/magnus/clubhouse/front-sunset.webp",
      alt: "Magnus Clubhouse front elevation at sunset",
      caption: "Clubhouse — front elevation, sunset",
      kind: "render",
    },
    {
      src: "/projects/magnus/clubhouse/aerial-day.webp",
      alt: "Magnus Clubhouse aerial view",
      caption: "Clubhouse — aerial view",
      kind: "render",
    },
    {
      src: "/projects/magnus/clubhouse/corner-night.webp",
      alt: "Magnus Clubhouse isometric night view",
      caption: "Clubhouse — night view",
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
  extent: "6.3 acres",
  type: "Premium residential plots",
  logo: LOGOS.mirai,
  digitalLayoutUrl: "https://magnus2-dl.fly.dev/mirai-dl",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rameshwaram+Temple+Shadnagar+Telangana",
  overview:
    "Mirai is an intimate plotted community by Antera Realty, a short walk from the Rameshwaram temple near Shadnagar. A Vastu-based layout of 30 ft and 40 ft roads, a landscaped open area and social infrastructure — planned for families who want calm, connected everyday living.",
  approvals: [
    {
      authority: "HMDA",
      label: "HMDA Layout Permission (LP)",
      status: "approved",
      number: "2470/HMDA/SWDL/2026",
      detail: "6.3 acres — HMDA LP received",
      source: "Official Mirai HMDA LP announcement (Nov 2026)",
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
    image: "/projects/magnus/site/site-01.webp",
    imageAlt: "Magnus Smart City site — landscaped avenue and CC roads",
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
    image: "/projects/magnus/clubhouse/front-sunset.webp",
    imageAlt: "Magnus Clubhouse at sunset — proposed design",
    blurb: "58.28 acres beside Phase 1 · RERA & HMDA LP received · new 33,625 sq. ft clubhouse.",
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
    status: "HMDA LP received · RERA awaited",
    priceFrom: `${formatINR(14999)} / sq. yd.`,
    image: "/projects/mirai/layout-plan.webp",
    imageAlt: "Mirai layout plan",
    blurb: "6.3 acres · 400 m from Rameshwaram Temple · Vastu-based layout.",
    badges: ["HMDA LP 2470/HMDA/SWDL/2026", "TG RERA awaited"],
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
