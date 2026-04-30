import HeroSection from "@/components/marketing/HeroSection";
import WhatIsItSection from "@/components/marketing/WhatIsItSection";
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
      <WhatIsItSection />
      <StoriesSection />
      <HiddenSignalsDemo />
      <ICPSection />
      <AboutSection />
      <ContactSection />
      <DataTicker />
    </>
  );
}
