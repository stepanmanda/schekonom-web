import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ekonomos.velyos.cz"),
  title: {
    default: "EkonomOS — Klientský portál nové generace",
    template: "%s · EkonomOS",
  },
  description:
    "Komplet pro účetní firmy: web, klientský portál a admin aplikace s AI hlídáním rizik. Pilot fáze, hledáme prvních 5 partnerů.",
  keywords: [
    "EkonomOS",
    "klientský portál",
    "účetní firma",
    "AI účetnictví",
    "fraud detection",
    "churn predikce",
    "DPH",
    "ELSTER",
    "VELYOS",
  ],
  authors: [{ name: "Studio VELYOS" }],
  creator: "Studio VELYOS",
  openGraph: {
    title: "EkonomOS — Klientský portál nové generace",
    description:
      "Komplet pro účetní firmy: web, klientský portál a admin aplikace s AI hlídáním rizik. Pilot fáze, hledáme prvních 5 partnerů.",
    url: "https://ekonomos.velyos.cz",
    siteName: "EkonomOS",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EkonomOS — Klientský portál nové generace",
    description:
      "Komplet pro účetní firmy: web, klientský portál a admin aplikace s AI hlídáním rizik.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
