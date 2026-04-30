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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ekonomos.velyos.cz/#organization",
      name: "EkonomOS",
      url: "https://ekonomos.velyos.cz",
      description:
        "Komplet pro účetní firmy: web, klientský portál a admin aplikace s AI hlídáním rizik.",
      parentOrganization: {
        "@type": "Organization",
        name: "Studio VELYOS",
        url: "https://velyos.cz",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://ekonomos.velyos.cz/#software",
      name: "EkonomOS",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Accounting Software",
      operatingSystem: "Web (browser)",
      description:
        "Klientský portál nové generace pro účetní firmy. AI hlídá rizika, predikuje churn, automatizuje rutinu.",
      offers: {
        "@type": "Offer",
        priceCurrency: "CZK",
        priceSpecification: {
          "@type": "PriceSpecification",
          description:
            "Setup fee + měsíční platforma + per-klient. Konkrétní cena podle rozsahu.",
        },
      },
      featureList: [
        "Klientský portál na vlastní doméně",
        "AI predikce odchodu klienta",
        "Fraud detection (IBAN, duplicitní faktury)",
        "Automatizace OCR faktur, párování plateb, upomínek",
        "Hlídání termínů (DPH, ELSTER, ČSSZ, ZP)",
        "200+ analýz napříč 23 kategoriemi",
        "Napojení na účetní software, banky, státní portály",
      ],
      provider: {
        "@id": "https://ekonomos.velyos.cz/#organization",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://ekonomos.velyos.cz/#website",
      url: "https://ekonomos.velyos.cz",
      name: "EkonomOS",
      inLanguage: "cs-CZ",
      publisher: {
        "@id": "https://ekonomos.velyos.cz/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
