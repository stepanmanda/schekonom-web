"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Eye,
  Server,
  Key,
  FileCheck,
  AlertOctagon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const principles = [
  {
    icon: Lock,
    title: "Privacy by design",
    desc: "Aplikace shromažďuje jen to, co je potřeba k provozu vaší účetní firmy. Citlivé funkce (lingvistická a behaviorální analýza) jsou volitelné — zapínají se až po výslovném souhlasu klienta i jeho zaměstnanců.",
  },
  {
    icon: FileCheck,
    title: "GDPR-compliant",
    desc: "Dokumentace zpracování, právní základy, retention period, právo na výmaz a přenositelnost. DPA s každým klientem standardně. Pověřence pro ochranu osobních údajů zajistíme nebo s vaším spolupracujeme.",
  },
  {
    icon: AlertOctagon,
    title: "AI Act ready",
    desc: "Splňujeme požadavky evropského AI Act účinného od 2026 — transparentnost AI rozhodování, lidská kontrola, dokumentace modelů, opt-in pro vysokorizikové funkce.",
  },
  {
    icon: Server,
    title: "Data v EU",
    desc: "Veškerá produkční data hostujeme v EU. Žádné mezinárodní transfery do USA nebo Asie. Šifrování v klidu i při přenosu (TLS 1.3, AES-256).",
  },
  {
    icon: Key,
    title: "Role-based access",
    desc: "Každý uživatel vidí jen to, co potřebuje. Audit log každé akce. Multi-faktorová autentizace standardně, single sign-on volitelně.",
  },
  {
    icon: Eye,
    title: "Transparentní AI",
    desc: "U každého AI rozhodnutí (predikce, alert, doporučení) ukážeme, na čem je založené. Žádné 'blackbox' modely. Klient může model kdykoliv napadnout.",
  },
];

const certifications = [
  { label: "GDPR", status: "Compliant" },
  { label: "AI Act 2026", status: "Ready" },
  { label: "ISO 27001", status: "V přípravě" },
  { label: "SOC 2 Type II", status: "Plánováno 2027" },
  { label: "DPA template", status: "Hotová" },
  { label: "Pen-test", status: "Roční" },
];

function FadeInSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function ZabezpeceniDatPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            ZABEZPEČENÍ // COMPLIANCE
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Účetní data jsou citlivá.
            <br />
            <span className="text-cyan">Bereme to vážně.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            EkonomOS pracuje s daty, která žádná firma nechce dát z ruky —
            faktury, mzdy, smlouvy, komunikace. Postavili jsme aplikaci s
            GDPR-by-design, EU hostingem a opt-in přístupem k citlivým funkcím.
            Tady je, co konkrétně to znamená.
          </p>
        </div>

        {/* Principles grid */}
        <FadeInSection className="mb-8">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            ŠEST PRINCIPŮ
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {principles.map((p) => (
            <div
              key={p.title}
              className="glass-panel p-7 hover:border-cyan/25 transition-all"
            >
              <div className="inline-flex p-3 border border-cyan/20 bg-cyan/5 mb-5">
                <p.icon size={22} className="text-cyan" />
              </div>
              <h3
                className="text-white text-lg font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {p.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications panel */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={22} className="text-gold" />
              <span
                className="text-gold"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Stav certifikací
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center justify-between border border-cyan/10 bg-cyan/[0.03] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-cyan" />
                    <span className="text-white text-sm font-medium">
                      {c.label}
                    </span>
                  </div>
                  <span
                    className="hud-chip"
                    data-tone={
                      c.status === "Compliant" || c.status === "Ready" || c.status === "Hotová" || c.status === "Roční"
                        ? "green"
                        : "gold"
                    }
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Opt-in highlight */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-10 border-l-2 border-l-gold/60">
            <div
              className="text-gold mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              ◉ Klíčový princip
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Citlivé funkce jsou <span className="text-gold">opt-in</span>, ne defaultně zapnuté
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-3xl mb-4">
              Behaviorální analýza, hlasová a textová analýza, monitoring chování zaměstnanců
              — to jsou funkce, které **mohou** přinést hodnotu, ale taky musí být **etické a legální**.
              Standardně jsou vypnuté. Zapínáme je až po:
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="text-status-green mt-0.5 flex-shrink-0" />
                Výslovném souhlasu majitele účetní firmy
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="text-status-green mt-0.5 flex-shrink-0" />
                Informování dotčených zaměstnanců (transparentnost dle ZP)
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="text-status-green mt-0.5 flex-shrink-0" />
                Souhlasu klientů, jejichž data se analyzují (GDPR čl. 6 odst. 1 písm. a)
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={16} className="text-status-green mt-0.5 flex-shrink-0" />
                DPIA (posouzení dopadu na ochranu osobních údajů) pro rizikové scénáře
              </li>
            </ul>
            <p className="text-text-muted text-xs mt-5 leading-relaxed">
              Detail postupu nastavení a vzorové formuláře předáváme s implementační dokumentací.
            </p>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <ShieldCheck size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Dotaz pro vašeho compliance officera?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Detailní technickou architekturu, DPA template, pen-test reporty a security whitepaper sdílíme po podpisu NDA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Vyžádat security pack
                  <ArrowRight size={16} />
                </Link>
                <Link href="/funkce" className="btn-ghost">
                  Co aplikace umí
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
