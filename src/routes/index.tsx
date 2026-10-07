import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/site/about-section";
import { AmenitiesSection } from "@/components/site/amenities-section";
import { Avatar2Feature } from "@/components/site/avatar2-feature";
import { BrandIntro } from "@/components/site/brand-intro";
import { ComparisonSection } from "@/components/site/comparison-section";
import { ContactSection } from "@/components/site/contact-section";
import { FaqSection } from "@/components/site/faq-section";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { FinalCta } from "@/components/site/final-cta";
import { GallerySection } from "@/components/site/gallery-section";
import { GrowthStory } from "@/components/site/growth-story";
import { HeroSection } from "@/components/site/hero-section";
import { HowItWorks } from "@/components/site/how-it-works";
import { InfrastructureSection } from "@/components/site/infrastructure-section";
import { LocationAdvantage } from "@/components/site/location-advantage";
import { MarvelFeature } from "@/components/site/marvel-feature";
import { MasterPlanSection } from "@/components/site/master-plan-section";
import { PricingSection } from "@/components/site/pricing-section";
import { ShowcaseSection } from "@/components/site/showcase-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SiteVisitSection } from "@/components/site/site-visit-section";
import { SportsSection } from "@/components/site/sports-section";
import { TrustSection } from "@/components/site/trust-section";
import { WhyAntera } from "@/components/site/why-antera";
import { WhyPlots } from "@/components/site/why-plots";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";

const TITLE = "Open Plots on Srisailam Highway, Hyderabad | Antera Realty";
const DESCRIPTION =
  "Discover premium open plots and luxury villa communities on Srisailam Highway, Hyderabad. Explore approved projects like Avatar 2 starting at ₹15,500/sq.yd.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://anterarealty.com/" }, // Missing OG URL as requested in playbook
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://anterarealty.com/" } // Added canonical tag as requested
    ]
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <HeroSection />
      <MasterPlanSection />
      <BrandIntro />
      <WhyAntera />
      <FeaturedProjects />
      <Avatar2Feature />
      <ShowcaseSection />
      <PricingSection />
      <AmenitiesSection />
      <SportsSection />
      <LocationAdvantage />
      <GrowthStory />
      <MarvelFeature />
      <InfrastructureSection />
      <ComparisonSection />
      <WhyPlots />
      <TrustSection />
      <SiteVisitSection />
      <HowItWorks />
      <AboutSection />
      <GallerySection />
      <FaqSection />
      <FinalCta />
      <ContactSection />
      <SiteFooter />
      <FloatingWhatsApp />
    </main>
  );
}
