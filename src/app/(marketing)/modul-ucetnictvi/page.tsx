"use client";

import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Eye,
  Lock,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const highlights = [
  {
    title: "Co se s rozpočtem opravdu děje",
    desc: "Aplikace porovnává plán a skutečnost na úrovni středisek a projektů. Když odchylka roste, dáme vědět dřív, než se z ní stane krize.",
  },
  {
    title: "Cash flow na 12 měsíců dopředu",
    desc: "Z reálných pohybů v účetnictví, splatností faktur a sezónních vzorců aplikace předpoví, kdy bude napjato a kdy prostor pro investici.",
  },
  {
    title: "Drill-down k jednotlivému dokladu",
    desc: "Z čísla v reportu se klikem dostanete k zdrojovému dokladu. Bez excelu, bez hledání ve sdílené složce.",
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
      <div className="max-w-5xl mx-auto px-6">
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
            MODUL // ÚČETNÍ REPORTING
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Účetnictví, které <span className="text-cyan">vidí dopředu</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Skutečnost vs. plán, cash flow, variance analýza, prognóza do konce
            období. Modul propojuje účetní data s rozpočtem, sezónností a
            historickým trendem — abyste viděli nejen co se stalo, ale i kam to
            směřuje.
          </p>
        </div>

        {/* Highlights */}
        <FadeInSection className="mb-8">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            CO MODUL UMÍ // PŘEHLED
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {highlights.map((h) => (
            <div key={h.title} className="hud-panel p-6">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle2 size={18} className="text-cyan mt-0.5 flex-shrink-0" />
                <h3
                  className="text-white text-base font-semibold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {h.title}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Storytelling: Skutečnost vs. plán */}
        <FadeInSection className="mb-20">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            UKÁZKA Z PRAXE // ROZPOČET POD KONTROLOU
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co aplikace vidí <span className="text-cyan">dřív než vy</span>
          </h2>
          <p className="text-text-secondary text-sm mb-8 max-w-3xl leading-relaxed">
            Dva scénáře, jak může vypadat měsíční report. Aplikace generuje obě verze automaticky a navrhne další kroky.
          </p>

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
                Skutečné náklady se liší od plánu o 3 %. Žádné středisko nepřekročilo toleranci. Trend klesá. Aplikace navrhne pokračovat v měsíčním monitoringu.
              </p>
              <p className="text-status-green text-xs" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                ✓ Žádná akce nepotřeba
              </p>
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
                  Rozpočet překročen
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Náklady převyšují plán o 28 %. Trend se zhoršuje třetí měsíc v řadě. Aplikace navrhne okamžitou schůzku s managementem a zmrazení neurgentních výdajů.
              </p>
              <p className="text-status-red text-xs" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                ⟶ Eskalace doporučena
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Gated teaser */}
        <FadeInSection className="mb-20">
          <div className="hud-panel p-8 grid md:grid-cols-[auto_1fr_auto] gap-5 items-center">
            <Eye size={28} className="text-gold flex-shrink-0" />
            <div>
              <h3 className="text-white text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Plný katalog analýz tohoto modulu
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Konkrétní názvy analýz, vstupní data, metodologii a frekvenci aktualizace ukazujeme až po nezávazné konzultaci.
              </p>
            </div>
            <Link href="/kontakt" className="btn-primary whitespace-nowrap">
              Domluvit demo
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInSection>

        {/* Final CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <BookOpen size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Účetnictví bez slepých míst
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Modul se dodává jako součást EkonomOS — na konzultaci probereme, jak ho propojit s vašimi účetními a rozpočtovými daty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Domluvit konzultaci
                  <ArrowRight size={16} />
                </Link>
                <Link href="/funkce" className="btn-ghost">
                  Zpět na funkce
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
