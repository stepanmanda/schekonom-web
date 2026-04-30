"use client";

import Link from "next/link";
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const highlights = [
  {
    title: "Pendleři bez chaosu",
    desc: "Steuererklärung, Freistellung, Kindergeld, A1 — všechna přeshraniční agenda v jednom toku. V němčině i češtině.",
  },
  {
    title: "ELSTER napojení napřímo",
    desc: "Elektronická podání německému Finanzamtu bez papírování a chození na úřad. Aplikace zná oba systémy.",
  },
  {
    title: "Transferové ceny a vyslání",
    desc: "Pro firmy, které mají oba břehy hranice. Dokumentace, A1, koordinace sociálního pojištění mezi CZ a DE.",
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

export default function ModulCzDePage() {
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
            MODUL // CZ / DE
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Hranice, které <span className="text-cyan">vás nebrzdí</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Modul pro klienty s vazbou na Německo — pendleři, vyslaní pracovníci,
            firmy s přeshraničními operacemi, investoři. Steuererklärung,
            Freistellung, Kindergeld, ELSTER, A1, transferové ceny — v jednom rozhraní.
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

        {/* Gated teaser */}
        <FadeInSection className="mb-20">
          <div className="hud-panel p-8 grid md:grid-cols-[auto_1fr_auto] gap-5 items-center">
            <Eye size={28} className="text-gold flex-shrink-0" />
            <div>
              <h3 className="text-white text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Plný katalog CZ/DE agendy
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                SOKA-BAU, DBA, Kindergeld extras a další specifika ukazujeme na osobní konzultaci.
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
              <Globe size={32} className="text-cyan mx-auto mb-5" />
              <h3 className="text-white text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                CZ/DE bez papírování
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Pendlery, vyslání i přeshraniční operace zvládneme — v češtině i v němčině.
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
