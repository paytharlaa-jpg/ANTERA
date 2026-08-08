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

const TITLE = "Antera Realty - Premium Villa Plots in Hyderabad";
const DESCRIPTION =
  "Antera Realty showcases strategically located plotted developments on the Srisailam Highway and Future City corridor - Avatar 2, Marvel Smart City and Magnus Smart City.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
    </main>
  );
}
