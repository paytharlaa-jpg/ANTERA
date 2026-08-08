import { ASSETS } from "./assets";

export const BRAND = {
  name: "Antera Realty",
  wordmark: "ANTERA",
  tagline: "Shaping Spaces, Building Futures",
  phone: "+91 99597 51331",
  phoneRaw: "+919959751331",
  whatsapp: "919959751331",
  email: "hello@anterarealty.com",
  location: "Hyderabad, Telangana",
  heroStrip:
    "Srisailam Highway \u00b7 Future City Corridor \u00b7 Karkalpahad \u00b7 Strategic Land Investments \u00b7 Premium Villa Plots",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Why Antera", href: "/#why-antera" },
  { label: "Locations", href: "/#location" },
  { label: "Gallery", href: "/#gallery" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Contact", href: "/#contact" },
] as const;

export const WHY_ANTERA = [
  {
    index: "01",
    title: "Strategic Locations",
    copy: "Projects positioned around important highways, infrastructure corridors and emerging development zones.",
  },
  {
    index: "02",
    title: "Verified Project Information",
    copy: "Clear communication around project approvals, layouts, pricing and development features.",
  },
  {
    index: "03",
    title: "Investment Perspective",
    copy: "We help buyers understand the location, surrounding development and long-term potential instead of focusing only on today's price.",
  },
  {
    index: "04",
    title: "End-to-End Assistance",
    copy: "From project discovery and site visits to plot selection and documentation support, Antera stays with you throughout the buying journey.",
  },
] as const;

export type ProjectSlug = "avatar-2" | "marvel-smart-city" | "magnus-smart-city";

export const PROJECTS = [
  {
    slug: "avatar-2" as ProjectSlug,
    card: "01",
    eyebrow: "Karkalpahad \u00b7 Srisailam Highway",
    name: "Aspirealty Avatar 2",
    tagline: "Premium plotted living near Hyderabad's emerging Future City corridor.",
    price: "\u20b915,500 \u2013 \u20b916,500 / Sq. Yard",
    stage: "Phase 1 + Phase 2",
    type: "Residential Plots",
    overview:
      "Avatar 2 is a plotted development located at Karkalpahad, with an 8-acre approved extent and a proposed overall extent of 17 acres. The project combines residential plots with clubhouse facilities, sports zones, landscaped areas and planned infrastructure.",
    facts: [
      { value: "8 Acres", label: "Approved Phase" },
      { value: "17 Acres", label: "Proposed Total Extent" },
      { value: "550 M", label: "From Srisailam Highway" },
      { value: "Premium", label: "Clubhouse & Sports Amenities" },
    ],
    highlights: ["Phase 1 \u2014 \u20b916,500 / Sq. Yard", "Phase 2 \u2014 \u20b915,500 / Sq. Yard"],
    image: ASSETS.houses.hillside,
    cta: "Explore Avatar 2",
    brochure: ASSETS.docs.avatar2Deck,
  },
  {
    slug: "marvel-smart-city" as ProjectSlug,
    card: "02",
    eyebrow: "Srisailam Highway",
    name: "Marvel Smart City",
    tagline: "Ultra-Luxury Villa Plots for a Future-Ready Hyderabad.",
    price: "\u20b916,000 / Sq. Yard",
    stage: "Pre-Launch",
    type: "Ultra-Luxury Villa Plots",
    overview:
      "Marvel Smart City is positioned as a 100+ acre ultra-luxury villa plot development designed around premium amenities, connectivity, smart infrastructure and future-focused community living.",
    facts: [
      { value: "100+ Acres", label: "Planned Extent" },
      { value: "Villa Plots", label: "Ultra-Luxury Format" },
      { value: "Srisailam", label: "Highway Corridor" },
      { value: "Pre-Launch", label: "Current Stage" },
    ],
    highlights: [
      "100+ Acres",
      "Ultra-Luxury Villa Plots",
      "Srisailam Highway Corridor",
      "Pre-Launch Opportunity",
      "Smart Infrastructure",
    ],
    image: ASSETS.houses.glass,
    cta: "Discover Marvel",
    brochure: ASSETS.docs.marvelBrochure,
  },
  {
    slug: "magnus-smart-city" as ProjectSlug,
    card: "03",
    eyebrow: "Shadnagar Corridor",
    name: "Magnus Smart City",
    tagline: "The Blueprint for a Beautiful Life.",
    price: "On Enquiry",
    stage: "Enquire",
    type: "Premium Villa Plots",
    overview:
      "A premium plotted community designed around lifestyle infrastructure, connectivity, green spaces, clubhouse facilities and community-focused amenities.",
    facts: [
      { value: "Premium", label: "Villa Plots" },
      { value: "Clubhouse", label: "Lifestyle Infrastructure" },
      { value: "TG RERA", label: "Registration Certificate" },
      { value: "Enquire", label: "Current Pricing" },
    ],
    highlights: [
      "Lifestyle infrastructure",
      "Green community spaces",
      "Clubhouse facilities",
      "Community-focused amenities",
    ],
    image: ASSETS.houses.terrace,
    cta: "Explore Magnus",
    brochure: ASSETS.docs.magnusBrochure,
  },
] as const;

export const PRICING = [
  {
    phase: "Phase 01",
    price: "\u20b916,500",
    unit: "Per Sq. Yard",
    title: "Phase 1",
    copy: "Approved plotted development with access to the project's planned infrastructure and lifestyle ecosystem.",
    cta: "Check Availability",
  },
  {
    phase: "Phase 02",
    price: "\u20b915,500",
    unit: "Per Sq. Yard",
    title: "Phase 2",
    copy: "An opportunity to enter the next phase of the development at an attractive current price.",
    cta: "Enquire for Phase 2",
  },
] as const;

export const AMENITIES = [
  { kind: "Clubhouse", title: "A social heart for the community." },
  { kind: "Swimming Pool", title: "Relax. Recharge. Refresh." },
  { kind: "Fitness", title: "Modern Gym" },
  { kind: "Wellness", title: "Yoga Hall" },
  { kind: "Hospitality", title: "Guest Rooms" },
  { kind: "Celebrations", title: "Multipurpose / Banquet Hall" },
  { kind: "Entertainment", title: "Music & Dance Zone" },
  { kind: "Leisure", title: "Sky Party Zone" },
] as const;

export const SPORTS = {
  indoor: ["Table Tennis", "Snooker", "Carroms", "Chess"],
  outdoor: [
    "Basketball Court",
    "Tennis Court",
    "Box Cricket",
    "Beach Volleyball",
    "Children's Play Area",
    "Bonfire Area",
  ],
} as const;

export const LOCATION_POINTS = [
  { index: "01", time: "1 min", place: "Srisailam Highway", distance: "550 metres" },
  { index: "02", time: "6 min", place: "330 Ft. Ratan Tata Greenfield Road", distance: "3.6 km" },
  { index: "03", time: "13 min", place: "Regional Ring Road", distance: "11.9 km" },
  { index: "04", time: "17 min", place: "Bharath Future City", distance: "11.7 km" },
  { index: "05", time: "7 min", place: "Maisigandi Temple", distance: "4.5 km" },
  { index: "06", time: "25 min", place: "Maheshwara Maha Pyramid", distance: "11 km" },
  { index: "07", time: "29 min", place: "Manchester Global School", distance: "26.2 km" },
  { index: "08", time: "32 min", place: "Amazon Data Center", distance: "21.3 km" },
  { index: "09", time: "38 min", place: "ORR Exit No. 14", distance: "33.6 km" },
  { index: "10", time: "47 min", place: "Rajiv Gandhi International Airport", distance: "39.8 km" },
] as const;

export const GROWTH_WORDS = [
  "Highway",
  "Infrastructure",
  "Development",
  "Connectivity",
  "Opportunity",
] as const;

export const MARVEL_SMART = [
  { title: "Smart Street Lighting", copy: "Sensor-based lighting for community areas." },
  { title: "Enhanced Security", copy: "Motion-detection alerts and surveillance." },
  { title: "EV Charging", copy: "EV charging infrastructure within the community." },
  { title: "Smart Access", copy: "Smart entry and controlled-access systems." },
] as const;

export const MARVEL_LIFESTYLE = [
  "Swimming Pool & Gym",
  "Amphitheatre",
  "Mini Theatre",
  "Dedicated Workspaces",
  "Sky Party Zone",
  "Multi-Use Hall",
  "Jogging & Cycling Tracks",
  "Spa / Wellness / Meditation",
] as const;

export const INFRASTRUCTURE = [
  { title: "Vastu-Oriented Layout", copy: "Thoughtfully planned plot orientation." },
  { title: "CC Internal Roads", copy: "Designed for comfortable internal movement." },
  { title: "Electricity Infrastructure", copy: "Transformer and street-lighting provisions." },
  { title: "Drainage", copy: "Planned drainage infrastructure." },
  { title: "Avenue Plantation", copy: "Green landscaped internal streets." },
  { title: "Community Park", copy: "Dedicated landscaped recreational spaces." },
  { title: "Compound Wall", copy: "Defined gated community boundary." },
  { title: "Entrance Arch", copy: "A distinctive project entrance." },
  { title: "Rainwater Harvesting", copy: "Water-management provisions." },
  { title: "Walking / Jogging Areas", copy: "Spaces designed for active everyday living." },
] as const;

export const COMPARISON = {
  columns: ["Avatar 2", "Marvel Smart City", "Magnus Smart City"],
  rows: [
    { label: "Location", values: ["Karkalpahad", "Srisailam Highway Corridor", "Shadnagar Corridor"] },
    { label: "Type", values: ["Residential Plots", "Ultra-Luxury Villa Plots", "Premium Villa Plots"] },
    { label: "Stage", values: ["Phase 1 + Phase 2", "Pre-Launch", "Project-specific"] },
    { label: "Price", values: ["\u20b915,500\u2013\u20b916,500*", "\u20b916,000*", "Enquire"] },
    { label: "Lifestyle Amenities", values: ["\u2713", "\u2713", "\u2713"] },
    { label: "Site Visit", values: ["Available", "Available", "Enquire"] },
  ],
} as const;

export const PLOT_REASONS = [
  {
    title: "Tangible Asset",
    copy: "Own a clearly defined piece of land rather than an abstract investment.",
  },
  {
    title: "Flexibility",
    copy: "Choose when and how you want to build, subject to applicable project and regulatory conditions.",
  },
  {
    title: "Long-Term Perspective",
    copy: "Strategically located land can participate in the growth of surrounding infrastructure and development.",
  },
  {
    title: "Legacy Value",
    copy: "Land can become both a future home and an intergenerational asset.",
  },
] as const;

export const HOW_IT_WORKS = [
  { index: "01", title: "Discover", copy: "Explore Antera's featured projects." },
  { index: "02", title: "Consult", copy: "Discuss your requirements, budget and investment objectives." },
  { index: "03", title: "Visit", copy: "Experience the project and surrounding location firsthand." },
  { index: "04", title: "Select", copy: "Choose your preferred available plot." },
  { index: "05", title: "Verify", copy: "Review relevant project and property documentation." },
  { index: "06", title: "Proceed", copy: "Move forward with booking and applicable documentation." },
] as const;

export const FAQS = [
  {
    q: "What types of properties does Antera Realty offer?",
    a: "Antera Realty currently showcases plotted developments and villa plot opportunities across strategic Hyderabad growth corridors.",
  },
  {
    q: "Where is Avatar 2 located?",
    a: "Avatar 2 is located at Karkalpahad, approximately 550 metres from Srisailam Highway according to the supplied project presentation.",
  },
  {
    q: "What is the current Avatar 2 price?",
    a: "Phase 1 \u2014 \u20b916,500 per sq. yard and Phase 2 \u2014 \u20b915,500 per sq. yard. Pricing is subject to availability and change.",
  },
  {
    q: "What is the Marvel Smart City price?",
    a: "The current pre-launch price is \u20b916,000 per sq. yard, subject to availability and change.",
  },
  {
    q: "Can I schedule a site visit?",
    a: "Yes. Buyers can request a site visit directly through the website or contact the Antera Realty team.",
  },
  {
    q: "Are project documents available?",
    a: "Relevant project documentation can be shared with prospective buyers for review. Buyers should independently verify applicable approvals, title documents, registration details and legal documentation before purchase.",
  },
  {
    q: "Can Antera help me select a plot?",
    a: "Yes. The team can assist with understanding available inventory, plot location, facing, project features and current pricing.",
  },
] as const;

export const PROJECT_OPTIONS = [
  "Avatar 2",
  "Marvel Smart City",
  "Magnus Smart City",
  "Not Sure Yet",
] as const;

export const BUDGET_OPTIONS = [
  "\u20b910\u201320 Lakhs",
  "\u20b920\u201330 Lakhs",
  "\u20b930\u201350 Lakhs",
  "\u20b950 Lakhs+",
  "Need Guidance",
] as const;

export const GALLERY = [
  ASSETS.houses.hillside,
  ASSETS.houses.glass,
  ASSETS.houses.terrace,
  ASSETS.props[0],
  ASSETS.props[3],
  ASSETS.houses.modern,
  ASSETS.props[4],
  ASSETS.houses.white,
] as const;

export const DISCLAIMER =
  "Project information, pricing, availability, distances, development plans and specifications displayed on this website are based on information provided by the respective project/promoter/sales materials and may be subject to change. Buyers are advised to independently verify all approvals, title documents, specifications, pricing and statutory information before making a purchase decision. Images and visualisations may be representational.";

export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Karkalpahad+Srisailam+Highway+Hyderabad";
