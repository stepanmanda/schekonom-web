"use client";

import {
  FileText,
  Calculator,
  TrendingUp,
  Users,
  Globe,
  Archive,
  Cpu,
  BarChart3,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const services = [
  {
    icon: FileText,
    code: "SVC-001",
    title: "Daňové poradenství",
    desc: "Komplexní daňové poradenství pro právnické i fyzické osoby. Daňová přiznání (DPPO, DPFO), DPH, optimalizace daňové zátěže, zastupování před FÚ.",
    tags: ["DPH", "DPPO", "DPFO", "Optimalizace"],
    ai: false,
  },
  {
    icon: Calculator,
    code: "SVC-002",
    title: "Účetnictví",
    desc: "Vedení podvojného účetnictví, daňová evidence, účetní závěrky. Rekonstrukce účetnictví, konzultace.",
    tags: ["Podvojné", "Daňová evidence", "Závěrky"],
    ai: false,
  },
  {
    icon: TrendingUp,
    code: "SVC-003",
    title: "Mzdová agenda",
    desc: "Kompletní zpracování mezd, personální administrativa, hlášení na pojišťovny a FÚ.",
    tags: ["Mzdy", "Personalistika", "Pojišťovny"],
    ai: false,
  },
  {
    icon: Users,
    code: "SVC-004",
    title: "Přeshraniční CZ/DE",
    desc: "Specializované služby pro české a německé subjekty v příhraničním regionu Cheb-Bavorsko.",
    tags: ["Pendleři", "A1", "Bavorsko"],
    ai: false,
  },
  {
    icon: Globe,
    code: "SVC-005",
    title: "Německé daně",
    desc: "Kompletní správa německých daňových povinností — Steuererklärung, Freistellung, Kindergeld, ELSTER.",
    tags: ["Freistellung", "Kindergeld", "ELSTER"],
    ai: false,
  },
  {
    icon: Archive,
    code: "SVC-006",
    title: "Certifikační autorita",
    desc: "Vydávání a správa kvalifikovaných certifikátů pro elektronické podpisy (eIDAS).",
    tags: ["eIDAS", "Kvalifikovaný podpis"],
    ai: false,
  },
  {
    icon: Cpu,
    code: "SVC-AI1",
    title: "AI Finanční analýza",
    desc: "Prediktivní analýza cash-flow, automatická detekce daňových rizik, benchmarking.",
    tags: ["Predikce", "Risk Detection", "Benchmarking"],
    ai: true,
  },
  {
    icon: BarChart3,
    code: "SVC-AI2",
    title: "AI Reporting",
    desc: "Automatizované generování reportů a dashboardů v reálném čase.",
    tags: ["Real-time", "Dashboards", "Auto-report"],
    ai: true,
  },
];

export default function ServicesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="sluzby"
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-16 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            SLUŽBY // PORTFOLIO
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            S čím vším vám
            <br />
            <span className="text-cyan">pomůžeme?</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl">
            Od daňového poradenství přes vedení účetnictví až po zpracování mezd
            a přeshraniční služby pro region Cheb-Bavorsko.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <div
              key={service.code}
              className={`service-card ${service.ai ? "service-card-ai" : ""} p-6 flex flex-col group ${
                inView ? `animate-float-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              {/* Shine sweep effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(0,229,255,0.06) 45%, rgba(0,229,255,0.12) 50%, rgba(0,229,255,0.06) 55%, transparent 60%)",
                  transform: "translateX(-100%)",
                  animation: "none",
                }}
              />

              {/* Icon + Code */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-2.5 border ${service.ai ? "border-cyan/30 bg-cyan/10" : "border-cyan/15 bg-cyan/5"} group-hover:bg-cyan/15 transition-colors duration-300`}
                >
                  <service.icon
                    size={20}
                    className={`${service.ai ? "text-cyan" : "text-cyan/70"} group-hover:text-cyan transition-colors duration-300`}
                  />
                </div>
                <span
                  className="text-text-muted"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  {service.code}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-white text-base font-semibold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                {service.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="hud-chip"
                    data-tone={service.ai ? "cyan" : "slate"}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* AI badge */}
              {service.ai && (
                <div className="mt-3 flex items-center gap-1.5">
                  <Cpu size={10} className="text-cyan" />
                  <span
                    className="text-cyan"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    AI-Powered
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
