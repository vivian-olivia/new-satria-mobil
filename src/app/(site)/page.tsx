import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BrandStripSection } from "@/components/home/BrandStripSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ModelPopulerSection } from "@/components/home/ModelPopulerSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CTASection } from "@/components/home/CTASection";
import { getAllVehicles, getFeaturedTestimonials } from "@/lib/supabase/queries";

export default async function HomePage() {
  const [allVehicles, testimonials] = await Promise.all([
    getAllVehicles(),
    getFeaturedTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <BrandStripSection vehicles={allVehicles} />
      <WhyUsSection />
      <ModelPopulerSection vehicles={allVehicles} />
      <ServicesSection />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <CTASection />
    </>
  );
}
