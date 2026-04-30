import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funkce — co EkonomOS umí",
  description:
    "Čtyři moduly (Účetní reporting, Mzdy, Daně, CZ/DE) a AI vrstva — predikce, detekce fraud, automatizace. 200+ analýz připravených v aplikaci.",
  alternates: { canonical: "/funkce" },
};

export default function FunkceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
