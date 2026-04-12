import HeroSection from "@/components/marketing/HeroSection";
import ServicesSection from "@/components/marketing/ServicesSection";
import AboutSection from "@/components/marketing/AboutSection";
import StatsSection from "@/components/marketing/StatsSection";
import TestimonialsSection from "@/components/marketing/TestimonialsSection";
import ContactSection from "@/components/marketing/ContactSection";
import DataTicker from "@/components/marketing/DataTicker";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <DataTicker />
    </>
  );
}
