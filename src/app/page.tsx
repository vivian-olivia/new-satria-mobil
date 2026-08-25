import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CTASection } from "@/components/home/CTASection";
import { getFeaturedVehicles } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Beranda",
};

export default async function HomePage() {
  const featured = await getFeaturedVehicles();

  return (
    <>
      <Hero />
      <CategoryGrid />
      <WhyUsSection />
      <FeaturedVehicles vehicles={featured} />
      <ServicesSection />
      <CTASection />
    </>
  );
}
