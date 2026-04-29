"use client";

import Link from "next/link";
import { Wallet, ArrowRight, CheckCircle2, Database } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const analyses = [
  { code: "PAY-01", title: "Měsíční mzdové uzávěrky", desc: "Automatický výpočet hrubé/čisté mzdy, odvodů, srážek. Generování výplatních pásek.", impact: "Kritický", autom: "95 %" },
  { code: "PAY-02", title: "Trend mzdových nákladů", desc: "Vývoj mzdových nákladů per oddělení a per role. Meziroční srovnání, sezónní vzorce.", impact: "Vysoký", autom: "100 %" },
  { code: "PAY-03", title: "Personální fluktuace", desc: "Kdo přišel, kdo odešel, jak dlouho zůstávají. Identifikace rizikových oddělení s vysokou fluktuací.", impact: "Vysoký", autom: "100 %" },
  { code: "PAY-04", title: "Přesčasy a nadhodiny", desc: "Kdo dělá nejvíc přesčasů, kde to znamená burnout risk, kolik to stojí firmu nad standard.", impact: "Střední", autom: "100 %" },
  { code: "PAY-05", title: "Nemocnost", desc: "Vývoj nemocnosti per oddělení, sezónnost, identifikace anomálií. Pomoc HR při intervenci.", impact: "Střední", autom: "100 %" },
  { code: "PAY-06", title: "Hlášení ČSSZ", desc: "Měsíční hlášení o sociálním pojištění, příprava podání, kontrola nesouladů.", impact: "Kritický", autom: "90 %" },
  { code: "PAY-07", title: "Hlášení zdravotních pojišťoven", desc: "Měsíční hlášení do všech zdravotních pojišťoven, kontrola, podání, evidence potvrzení.", impact: "Kritický", autom: "90 %" },
  { code: "PAY-08", title: "ELDP — evidenční listy", desc: "Roční evidenční listy důchodového pojištění. Kontrola, příprava, elektronické podání.", impact: "Vysoký", autom: "85 %" },
  { code: "PAY-09", title: "Roční zúčtování daně", desc: "Roční zúčtování DZČ pro zaměstnance. Optimalizace odpočtů, slev a daňových výhod.", impact: "Vysoký", autom: "70 %" },
  { code: "PAY-10", title: "Srážky ze mzdy (exekuce)", desc: "Správa exekučních srážek, insolvencí, splátkových kalendářů. Reporty pro exekutory a soudy.", impact: "Střední", autom: "80 %" },
];

const dataSources = [
  "Docházkový systém / píchačky",
  "Pracovní smlouvy a dodatky",
  "Osobní spisy zaměstnanců",
  "Dohody DPP a DPČ",
  "Exekuční rozhodnutí",
  "Daňové formuláře (Prohlášení k dani)",
];

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

export default function ModulMzdyPage() {
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
            MOD-02 // MZDY + ČSSZ + ZP
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Modul: <span className="text-cyan">Mzdy a personální data</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Deset analýz pokrývajících mzdovou agendu od měsíční uzávěrky přes hlášení ČSSZ a ZP až po roční zúčtování. Plus pohledy na fluktuaci, nemocnost a přesčasy — abyste věděli, co se děje s lidmi, ne jen s čísly.
          </p>
        </div>

        <FadeInSection className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan/10">
            {[
              { v: "10", l: "Analýz" },
              { v: "Měsíčně", l: "Frekvence" },
              { v: "90 %", l: "Automatizace" },
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
              <Wallet size={32} className="text-cyan mx-auto mb-5" />
              <h3 className="text-white text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>Mzdy bez papírování</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Demo profily zahrnují roli mzdové specialistky. Vyzkoušejte si workflow ELSTER podání a měsíční uzávěrky.
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
