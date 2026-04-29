"use client";

import {
  LayoutDashboard,
  Building2,
  ListChecks,
  FolderOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Cpu,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const services = [
  {
    icon: LayoutDashboard,
    code: "MOD-001",
    title: "Přehled na úvod",
    desc: "Klient se přihlásí a vidí všechno najednou — kolik úkolů má, jaké termíny ho čekají, co je nového. Žádné hledání.",
    tags: ["Najednou", "Stav", "Úkoly"],
    ai: false,
  },
  {
    icon: Building2,
    code: "MOD-002",
    title: "Klienti a jejich firmy",
    desc: "Pro účetní firmu — seznam všech klientů s rychlým náhledem na obrat, počet zaměstnanců a stav. Klikněte a vidíte detail.",
    tags: ["Firmy", "Obrat", "Lidé"],
    ai: false,
  },
  {
    icon: ListChecks,
    code: "MOD-003",
    title: "Úkoly a termíny",
    desc: "Aplikace hlídá, kdo má co udělat a do kdy. Připomene den předem. Konec lepicích lístků a Excel tabulek.",
    tags: ["Lhůty", "DPH", "Daně"],
    ai: false,
  },
  {
    icon: FolderOpen,
    code: "MOD-004",
    title: "Dokumenty na jednom místě",
    desc: "Faktury, smlouvy, výpisy z banky. Klient nahraje, vy stáhnete. Žádné e-maily s přílohami a žádné USB flashky.",
    tags: ["Faktury", "Smlouvy", "Výpisy"],
    ai: false,
  },
  {
    icon: CheckCircle2,
    code: "MOD-005",
    title: "Schválení kliknutím",
    desc: "Klient potvrdí faktury, mzdy nebo přiznání jedním kliknutím. Bez tištění, bez podpisu, bez telefonování.",
    tags: ["Potvrzení", "Souhlas", "Klient"],
    ai: false,
  },
  {
    icon: AlertTriangle,
    code: "MOD-006",
    title: "Rizika a upozornění",
    desc: "Klient zapomněl poslat výpis. Blíží se termín, ale chybí podklady. Aplikace vás upozorní dřív, než to udělá finanční úřad.",
    tags: ["Pokuty", "Chyby", "Lhůty"],
    ai: false,
  },
  {
    icon: Lightbulb,
    code: "MOD-AI1",
    title: "Návrhy, kde ušetřit",
    desc: "Aplikace sleduje data klienta a sama navrhne, kde lze platit méně daní nebo snížit náklady. Vy se rozhodnete, jestli to udělat.",
    tags: ["Úspory", "Návrhy"],
    ai: true,
  },
  {
    icon: Zap,
    code: "MOD-AI2",
    title: "Automatické úkoly",
    desc: "Klient nahraje fakturu — aplikace sama vytvoří úkol. Přišel termín DPH — aplikace sama připraví, co je potřeba. Méně psaní pro vás.",
    tags: ["Workflow", "Méně psaní"],
    ai: true,
  },
];

export default function ServicesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="funkce"
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-16 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            FUNKCE // CO APLIKACE UMÍ
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co tam <span className="text-cyan">klient uvidí</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl">
            Osm hlavních funkcí. Žádné instalování, žádné návody. Klient se
            přihlásí přes prohlížeč a všechno má před sebou.
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
                    AI uvnitř
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
