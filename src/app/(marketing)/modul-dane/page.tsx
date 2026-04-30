"use client";

import Link from "next/link";
import {
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const highlights = [
  {
    title: "DPH, KH a SH bez excelu",
    desc: "Měsíční přiznání DPH, kontrolní a souhrnné hlášení se připraví z účetních dat. Vy zkontrolujete a podepíšete.",
  },
  {
    title: "Daňová optimalizace v reálném čase",
    desc: "Aplikace navrhuje, kde lze daňovou zátěž snížit — odpisy, časování investic, slevy. Konkrétní akce, ne obecné rady.",
  },
  {
    title: "Připraveno na ViDA a e-fakturaci",
    desc: "Audit připravenosti na evropské novely. Když přijde povinnost, jste hotoví, ostatní teprve začnou.",
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

export default function ModulDanePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
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
            MODUL // DANĚ A DPH
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Daně, které <span className="text-cyan">se hlídají samy</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Česká daňová agenda v jednom toku — DPPO, DPFO, DPH, kontrolní a
            souhrnné hlášení, monitoring legislativy a podpora při daňových
            kontrolách. Plus simulátor „co kdyby" pro daňovou optimalizaci.
          </p>
        </div>

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

        {/* Storytelling: Scénáře co kdyby */}
        <FadeInSection className="mb-20">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            UKÁZKA Z PRAXE // SCÉNÁŘE „CO KDYBY"
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Daňovou strategii vyzkoušíte <span className="text-cyan">bez reálného dopadu</span>
          </h2>
          <p className="text-text-secondary text-sm mb-8 max-w-3xl leading-relaxed">
            Aplikace umí simulovat alternativní daňové strategie a ukázat, kolik by klient ušetřil. Jeden ze scénářů: úprava odpisové politiky a načasování fakturace.
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
                  Optimální struktura
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                Simulace identifikovala kombinaci odpisů a načasování výdajů, která sníží efektivní daňovou sazbu.
              </p>
              <p className="text-white text-base font-semibold mb-1">
                Úspora ~280 000 Kč/rok
              </p>
              <p className="text-text-muted text-xs" style={{ fontStyle: "italic" }}>
                Plně v souladu s legislativou. Implementace 2 týdny.
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
                  Zmeškaná optimalizace
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                Bez optimalizace klient zaplatí o 5 % vyšší efektivní sazbu, než bylo nutné.
              </p>
              <p className="text-white text-base font-semibold mb-1">
                Přeplatek ~340 000 Kč
              </p>
              <p className="text-text-muted text-xs" style={{ fontStyle: "italic" }}>
                Lze řešit dodatečným přiznáním do 3 let.
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
                Plný katalog daňových analýz
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Konkrétní simulační modely a metodologii ukazujeme až klientům.
              </p>
            </div>
            <Link href="/kontakt" className="btn-primary whitespace-nowrap">
              Domluvit demo
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <FileText size={32} className="text-cyan mx-auto mb-5" />
              <h3 className="text-white text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Daně bez stresu
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Měsíční rutinu zvládá robot. Vy se rozhodujete o optimalizaci a strategii.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Domluvit konzultaci
                  <ArrowRight size={16} />
                </Link>
                <Link href="/funkce" className="btn-ghost">Zpět na funkce</Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
