"use client";

import Link from "next/link";
import { Globe, ArrowRight, CheckCircle2, Database } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const analyses = [
  { code: "DE-01", title: "Steuererklärung", desc: "Příprava a podání německého daňového přiznání pro pendlery i osoby s příjmy v DE.", impact: "Kritický", autom: "65 %" },
  { code: "DE-02", title: "Freistellung", desc: "Žádosti o osvobození od srážkové daně. Příprava podkladů pro Finanzamt.", impact: "Vysoký", autom: "70 %" },
  { code: "DE-03", title: "Kindergeld", desc: "Vyřízení nároku na přídavky na děti pro pendlery a české rezidenty pracující v Německu.", impact: "Střední", autom: "60 %" },
  { code: "DE-04", title: "ELSTER připojení", desc: "Elektronická registrace a podání přes ELSTER. Bez papírování, bez chození na Finanzamt.", impact: "Vysoký", autom: "85 %" },
  { code: "DE-05", title: "Pendleři A1", desc: "Formuláře A1 pro přeshraniční zaměstnance. Koordinace sociálního pojištění CZ/DE.", impact: "Vysoký", autom: "75 %" },
  { code: "DE-06", title: "DBA CZ/DE", desc: "Aplikace smlouvy o zamezení dvojího zdanění. Optimalizace zdanění příjmů v obou zemích.", impact: "Vysoký", autom: "55 %" },
  { code: "DE-07", title: "Transferové ceny", desc: "Nastavení a dokumentace transferových cen mezi spojenými osobami CZ/DE.", impact: "Kritický", autom: "40 %" },
  { code: "DE-08", title: "Vyslání pracovníků", desc: "Koordinace pracovních povolení, daní a sociálního pojištění při vyslání zaměstnance do DE.", impact: "Vysoký", autom: "50 %" },
  { code: "DE-09", title: "SOKA-BAU", desc: "Hlášení do SOKA-BAU (sociální fond stavebnictví) pro zaměstnance ve stavebnictví v DE.", impact: "Střední", autom: "70 %" },
  { code: "DE-10", title: "Komunikace s Finanzamt", desc: "Zastoupení při komunikaci s německými finančními úřady. V němčině.", impact: "Vysoký", autom: "30 %" },
  { code: "DE-11", title: "Daňové ID v DE", desc: "Vyřízení daňového ID, registrace pro DPH, založení DE daňové identity.", impact: "Vysoký", autom: "60 %" },
];

const dataSources = [
  "Pracovní smlouvy (CZ + DE)",
  "Mzdové výpisy z DE zaměstnavatele",
  "Doklady o trvalém pobytu",
  "Rodné listy dětí (Kindergeld)",
  "Bankovní výpisy DE",
  "Dříve podaná Steuererklärung",
];

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

export default function ModulCzDePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 animate-float-up">
          <Link href="/funkce" className="inline-flex items-center gap-2 text-text-muted hover:text-cyan transition-colors mb-6" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            <ArrowRight size={14} className="rotate-180" />
            Zpět na všechny funkce
          </Link>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            MOD-04 // CZ/DE + ELSTER
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Modul: <span className="text-cyan">Německé daně a pendleři</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Jedenáct analýz pro klienty s vazbou na Německo — pendleři, vyslaní pracovníci, firmy s přeshraničními operacemi, investoři. Steuererklärung, Freistellung, Kindergeld, ELSTER, A1, transferové ceny.
          </p>
        </div>

        <FadeInSection className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan/10">
            {[
              { v: "11", l: "Analýz" },
              { v: "Roční", l: "Frekvence" },
              { v: "60 %", l: "Automatizace" },
              { v: "Vysoký", l: "Business dopad" },
            ].map((s) => (
              <div key={s.l} className="bg-void px-5 py-5 text-center">
                <div className="text-cyan text-2xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>{s.v}</div>
                <div className="text-text-muted mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection className="mb-8">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            ANALÝZY // 11 POHLEDŮ
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Co tento modul <span className="text-gold">dělá</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {analyses.map((a) => (
            <div key={a.code} className="hud-panel p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-cyan" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.14em" }}>{a.code}</span>
                <span className="hud-chip" data-tone="slate">{a.autom}</span>
              </div>
              <h3 className="text-white text-base font-semibold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>{a.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-3">{a.desc}</p>
              <span className="hud-chip" data-tone={a.impact === "Kritický" ? "red" : a.impact === "Vysoký" ? "gold" : "cyan"}>Dopad: {a.impact}</span>
            </div>
          ))}
        </div>

        <FadeInSection className="mb-24">
          <div className="hud-panel p-8">
            <div className="flex items-center gap-3 mb-5">
              <Database size={20} className="text-cyan" />
              <span className="text-cyan" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>Vstupní data</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dataSources.map((src) => (
                <div key={src} className="flex items-start gap-2 text-text-secondary text-sm">
                  <CheckCircle2 size={14} className="text-cyan mt-0.5 flex-shrink-0" />
                  {src}
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Globe size={32} className="text-cyan mx-auto mb-5" />
              <h3 className="text-white text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>CZ/DE bez papírování</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Demo profily zahrnují roli „german-tax". Vyzkoušejte si workflow Steuererklärung, ELSTER podání, Freistellung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/prihlaseni" className="btn-primary">
                  Otevřít demo
                  <ArrowRight size={16} />
                </Link>
                <Link href="/kontakt" className="btn-ghost">Domluvit konzultaci</Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
