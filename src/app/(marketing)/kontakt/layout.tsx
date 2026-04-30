import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Domluvit demo, vyžádat cenovou nabídku nebo se zeptat na pilot. Odpovídáme do 24 hodin v pracovních dnech.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
