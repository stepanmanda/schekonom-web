"use client";

import Link from "next/link";
import { FileText, ArrowRight, CheckCircle2, Database, AlertTriangle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const analyses = [
  { code: "TAX-01", title: "DPPO — daň z příjmů PO", desc: "Příprava a podání DPPO. Optimalizace základu daně, odpočty, slevy, odložená daň.", impact: "Kritický", autom: "70 %" },
  { code: "TAX-02", title: "DPFO — daň z příjmů FO", desc: "DPFO pro OSVČ a fyzické osoby. Zohlednění slev, odpočtů, příjmů ze zahraničí.", impact: "Vysoký", autom: "75 %" },
  { code: "TAX-03", title: "DPH měsíční / čtvrtletní", desc: "Příprava přiznání DPH, kontrolní hlášení, souhrnné hlášení. Termíny a podání včas.", impact: "Kritický", autom: "85 %" },
  { code: "TAX-04", title: "Kontrolní a souhrnná hlášení", desc: "Automatická příprava KH a SH z DPH dat. Kontrola párování s protistranou.", impact: "Vysoký", autom: "90 %" },
  { code: "TAX-05", title: "ViDA / e-fakturace připravenost", desc: "Audit připravenosti firmy na ViDA (VAT in the Digital Age). Mapping faktur, e-faktura validace.", impact: "Vysoký", autom: "60 %" },
  { code: "TAX-06", title: "Daňová optimalizace", desc: "Návrhy daňové úspory: změna režimu DPH, využití slev, časování investic, tvorba rezerv.", impact: "Vysoký", autom: "50 %" },
  { code: "TAX-07", title: "Silniční daň", desc: "Evidence vozidel, výpočet a podání silniční daně. Kontrola změn legislativy.", impact: "Nízký", autom: "100 %" },
  { code: "TAX-08", title: "Daň z nemovitostí", desc: "Roční přiznání k dani z nemovitostí, evidence změn, podání včas.", impact: "Nízký", autom: "100 %" },
  { code: "TAX-09", title: "Monitoring legislativy", desc: "Sledování legislativních změn, dopadů na klienty, proaktivní notifikace.", impact: "Střední", autom: "90 %" },
  { code: "TAX-10", title: "Daňové kontroly — podpora", desc: "Příprava podkladů pro daňové kontroly, archiv komunikace, evidence rozhodnutí.", impact: "Vysoký", autom: "40 %" },
];

const dataSources = [
  "Účetní deník (transakce)",
  "Faktury vydané (DPH OUT)",
  "Faktury přijaté (DPH IN)",
  "Bankovní výpisy",
  "Evidence majetku a vozidel",
  "Smlouvy a dohody",
];

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

export default function ModulDanePage() {
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
            MOD-03 // DANĚ + DPH + VIDA
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Modul: <span className="text-cyan">Daňová agenda</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Deset analýz pokrývajících kompletní českou daňovou agendu — DPPO, DPFO, DPH, kontrolní a souhrnná hlášení, monitoring legislativy a podporu při daňových kontrolách. Plus připravenost na ViDA a e-fakturaci.
          </p>
        </div>

        <FadeInSection className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan/10">
            {[
              { v: "10", l: "Analýz" },
              { v: "Měsíčně", l: "Frekvence" },
              { v: "75 %", l: "Automatizace" },
              { v: "Kritický", l: "Business dopad" },
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
            ANALÝZY // 10 POHLEDŮ
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
              <FileText size={32} className="text-cyan mx-auto mb-5" />
              <h3 className="text-white text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>Daně bez stresu</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Demo profily zahrnují roli daňové poradkyně. Vyzkoušejte si přípravu DPH, kontrolního hlášení a daňové optimalizace.
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
