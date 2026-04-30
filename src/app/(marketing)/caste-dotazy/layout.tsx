import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Časté dotazy",
  description:
    "18 nejčastějších otázek o EkonomOS — nasazení, cena, bezpečnost, GDPR, AI Act, pilot fáze. Odpovědi upřímné, i když zní 'ještě nevíme'.",
  alternates: { canonical: "/caste-dotazy" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
