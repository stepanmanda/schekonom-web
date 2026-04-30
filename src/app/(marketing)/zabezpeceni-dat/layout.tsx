import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zabezpečení dat",
  description:
    "GDPR-by-design, AI Act ready, EU hosting, šifrování, opt-in citlivé funkce. Compliance pro účetní data v EkonomOS.",
  alternates: { canonical: "/zabezpeceni-dat" },
};

export default function ZabezpeceniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
