"use client";

import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import StickyCTA from "@/components/marketing/StickyCTA";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-void flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
