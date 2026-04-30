import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O EkonomOS",
  description:
    "EkonomOS staví studio VELYOS — tým specializovaný na B2B AI agenty pro profesionální služby. Účetnictví, daně, advokacie, poradenství.",
  alternates: { canonical: "/o-nas" },
};

export default function ONasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
