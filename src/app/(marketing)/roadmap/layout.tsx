import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Co je hotové, co se chystá, co plánujeme. Upřímný přehled, kde EkonomOS je dnes a kam směřujeme.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
