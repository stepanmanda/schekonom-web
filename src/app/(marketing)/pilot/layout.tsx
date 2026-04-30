import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilot fáze — hledáme prvních 5 partnerů",
  description:
    "Místo abychom slibovali čísla bez podkladu, hledáme 3–5 partnerských kanceláří. Zvýhodněné podmínky, společný měřící framework, přímý přístup k vývojovému týmu.",
  alternates: { canonical: "/pilot" },
};

export default function PilotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
