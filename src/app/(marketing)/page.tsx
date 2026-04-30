import HeroSection from "@/components/marketing/HeroSection";
import StoriesSection from "@/components/marketing/StoriesSection";
import HiddenSignalsDemo from "@/components/marketing/HiddenSignalsDemo";
import ServicesSection from "@/components/marketing/ServicesSection";
import ICPSection from "@/components/marketing/ICPSection";
import AboutSection from "@/components/marketing/AboutSection";
import WhyNowSection from "@/components/marketing/WhyNowSection";
import StatsSection from "@/components/marketing/StatsSection";
import TestimonialsSection from "@/components/marketing/TestimonialsSection";
import ContactSection from "@/components/marketing/ContactSection";
import DataTicker from "@/components/marketing/DataTicker";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StoriesSection />
      <HiddenSignalsDemo />
      <ServicesSection />
      <ICPSection />
      <AboutSection />
      <WhyNowSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <DataTicker />
    </>
  );
}
