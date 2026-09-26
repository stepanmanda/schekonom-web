import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zabezpečení dat",
  description:
    "Ochrana dat v návrhu, připravenost na AI Act, hosting v EU, šifrování a citlivé funkce se souhlasem. Soulad pro účetní data v EkonomOS.",
  alternates: { canonical: "/zabezpeceni-dat" },
};

export default function ZabezpeceniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
