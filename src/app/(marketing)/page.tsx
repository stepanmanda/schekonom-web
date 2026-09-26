import HeroSection from "@/components/marketing/HeroSection";
import PracticalValueSection from "@/components/marketing/PracticalValueSection";
import StoriesSection from "@/components/marketing/StoriesSection";
import HiddenSignalsDemo from "@/components/marketing/HiddenSignalsDemo";
import ICPSection from "@/components/marketing/ICPSection";
import AboutSection from "@/components/marketing/AboutSection";
import ContactSection from "@/components/marketing/ContactSection";
import DataTicker from "@/components/marketing/DataTicker";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PracticalValueSection />
      <StoriesSection />
      <HiddenSignalsDemo />
      <ICPSection />
      <AboutSection />
      <ContactSection />
      <DataTicker />
    </>
  );
}
