"use client";

import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Activity,
  TrendingUp,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const analyses = [
  {
    code: "ACC-01",
    title: "Skutečnost vs. plán",
    desc: "Variance analýza nákladových středisek a účtových skupin. Trend, sezónnost, forecast do konce období.",
    impact: "Vysoký",
    autom: "80 %",
  },
  {
    code: "ACC-02",
    title: "Cash flow forecast (12 měsíců)",
    desc: "Predikce hotovostních toků z účetních pohybů, splatnosti faktur, sezónních vzorců a plánovaných investic.",
    impact: "Kritický",
    autom: "75 %",
  },
  {
    code: "ACC-03",
    title: "Top 5 odchýlených položek",
    desc: "Automatický výběr nákladových položek, kde rozdíl skutečnost/plán překročil toleranci. Drill-down do dokladů.",
    impact: "Střední",
    autom: "100 %",
  },
  {
    code: "ACC-04",
    title: "ROI per projekt / středisko",
    desc: "Návratnost investic na úrovni nákladových středisek a projektů. Porovnání investice vs. generovaný cash flow.",
    impact: "Vysoký",
    autom: "60 %",
  },
  {
    code: "ACC-05",
    title: "Trend nákladů 12 měsíců",
    desc: "Klouzavé průměry, meziroční srovnání, identifikace zlomů v trendu. Sezónní adjustace pro fair srovnání.",
    impact: "Střední",
    autom: "100 %",
  },
  {
    code: "ACC-06",
    title: "Sezónní adjustace",
    desc: "Korekce sezónních vlivů (Q4 vs. Q1, prázdniny, svátky). Odhalí trendy schované za sezónními výkyvy.",
    impact: "Střední",
    autom: "100 %",
  },
  {
    code: "ACC-07",
    title: "Drill-down do účtových skupin",
    desc: "Od souhrnných čísel přes účtové skupiny až po konkrétní doklady. Klik za klikem až k zdroji odchylky.",
    impact: "Vysoký",
    autom: "100 %",
  },
  {
    code: "ACC-08",
    title: "Odchylka per středisko",
    desc: "Která střediska překročila rozpočet a o kolik. Včetně varování při překročení 10/20/30 % tolerance.",
    impact: "Vysoký",
    autom: "100 %",
  },
  {
    code: "ACC-09",
    title: "Audit-ready výkazy",
    desc: "Rozvaha, výkaz zisku a ztráty, příloha. Kompletní podklady pro audit nebo finanční kontrolu.",
    impact: "Střední",
    autom: "85 %",
  },
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

export default function ModulUcetnictviPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-16 animate-float-up">
          <Link
            href="/funkce"
            className="inline-flex items-center gap-2 text-text-muted hover:text-cyan transition-colors mb-6"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <ArrowRight size={14} className="rotate-180" />
            Zpět na všechny funkce
          </Link>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            MOD-01 // ÚČETNÍ REPORTING
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Modul: <span className="text-cyan">Účetní reporting</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Devět analýz, které propojují účetnictví, rozpočet a prognózu. Vidíte
            nejen co se stalo, ale i kam to směřuje a co s tím dělat. Variance
            analýzy, cash flow forecast, sezónní adjustace.
          </p>
        </div>

        {/* Quick metrics */}
        <FadeInSection className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan/10">
            <div className="bg-void px-5 py-5 text-center">
              <div
                className="text-cyan text-2xl font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                9
              </div>
              <div
                className="text-text-muted mt-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Analýz
              </div>
            </div>
            <div className="bg-void px-5 py-5 text-center">
              <div
                className="text-cyan text-2xl font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Měsíčně
              </div>
              <div
                className="text-text-muted mt-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Frekvence
              </div>
            </div>
            <div className="bg-void px-5 py-5 text-center">
              <div
                className="text-cyan text-2xl font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                85 %
              </div>
              <div
                className="text-text-muted mt-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Automatizace
              </div>
            </div>
            <div className="bg-void px-5 py-5 text-center">
              <div
                className="text-cyan text-2xl font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Vysoký
              </div>
              <div
                className="text-text-muted mt-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Business dopad
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Analyses grid */}
        <FadeInSection className="mb-8">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            ANALÝZY // 9 POHLEDŮ
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-10"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co tento modul <span className="text-gold">dělá</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {analyses.map((a) => (
            <div key={a.code} className="hud-panel p-5">
              <div className="flex items-start justify-between mb-3">
                <span
                  className="text-cyan"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                  }}
                >
                  {a.code}
                </span>
                <span className="hud-chip" data-tone="slate">
                  {a.autom}
                </span>
              </div>
              <h3
                className="text-white text-base font-semibold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {a.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-3">
                {a.desc}
              </p>
              <span
                className="hud-chip"
                data-tone={a.impact === "Kritický" ? "red" : a.impact === "Vysoký" ? "gold" : "cyan"}
              >
                Dopad: {a.impact}
              </span>
            </div>
          ))}
        </div>

        {/* Example deep dive — Skutečnost vs. plán */}
        <FadeInSection className="mb-24">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            UKÁZKA // ANALÝZA „SKUTEČNOST VS. PLÁN"
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Jak to vypadá <span className="text-cyan">v praxi</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="hud-panel p-6 border-l-2 border-l-status-green">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} className="text-status-green" />
                <span
                  className="text-status-green"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Rozpočet pod kontrolou
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Skutečné náklady se liší od plánu o pouhá 3 %, což je v rámci
                přijatelné tolerance. Aplikace automaticky generuje měsíční
                report a navrhne pokračovat v monitoringu.
              </p>
              <ul className="space-y-2 text-text-muted text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 size={14} className="text-status-green mt-0.5 flex-shrink-0" />
                  Celková odchylka +3 % (tolerance 10 %)
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={14} className="text-status-green mt-0.5 flex-shrink-0" />
                  Žádné středisko nepřekročilo 15 %
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={14} className="text-status-green mt-0.5 flex-shrink-0" />
                  Pozitivní trend — odchylka klesá
                </li>
              </ul>
            </div>

            <div className="hud-panel p-6 border-l-2 border-l-status-red">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={16} className="text-status-red" />
                <span
                  className="text-status-red"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Rozpočet výrazně překročen
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Skutečné náklady převyšují plán o 28 % (3× nad tolerancí). Trend
                se zhoršuje třetí měsíc v řadě. Aplikace navrhne okamžitou
                schůzku s managementem a zmrazení neurgentních výdajů.
              </p>
              <ul className="space-y-2 text-text-muted text-sm">
                <li className="flex gap-2">
                  <AlertTriangle size={14} className="text-status-red mt-0.5 flex-shrink-0" />
                  Celková odchylka −28 %
                </li>
                <li className="flex gap-2">
                  <AlertTriangle size={14} className="text-status-red mt-0.5 flex-shrink-0" />
                  3 střediska překročila rozpočet o 30 %+
                </li>
                <li className="flex gap-2">
                  <AlertTriangle size={14} className="text-status-red mt-0.5 flex-shrink-0" />
                  Forecast: −34 % do konce roku
                </li>
              </ul>
            </div>
          </div>
        </FadeInSection>

        {/* Data sources */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-8">
            <div className="flex items-center gap-3 mb-5">
              <Database size={20} className="text-cyan" />
              <span
                className="text-cyan"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Vstupní data
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Účetní deník (skutečné náklady a výnosy)",
                "Rozpočet pro aktuální období (Excel / ERP)",
                "Historická data pro sezónní korekci",
                "Faktury vydané a přijaté",
                "Bankovní výpisy",
                "Plánované investice",
              ].map((src) => (
                <div
                  key={src}
                  className="flex items-start gap-2 text-text-secondary text-sm"
                >
                  <CheckCircle2
                    size={14}
                    className="text-cyan mt-0.5 flex-shrink-0"
                  />
                  {src}
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <BookOpen size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Chcete to vidět naživo?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Otevřete demo a prohlédněte si skutečné dashboardy, drill-down a
                příklad analýzy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/prihlaseni" className="btn-primary">
                  Otevřít demo
                  <ArrowRight size={16} />
                </Link>
                <Link href="/kontakt" className="btn-ghost">
                  Domluvit konzultaci
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
