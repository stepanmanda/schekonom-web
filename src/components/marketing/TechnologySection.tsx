"use client";

import {
  Binary,
  UserCheck,
  Zap,
  ShieldCheck,
  Lock,
  LineChart,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const modules = [
  {
    icon: Binary,
    code: "MOD-01",
    title: "Deterministická analýza",
    desc: "Algoritmicky přesné výpočty daňových povinností s nulovou tolerancí odchylky.",
  },
  {
    icon: UserCheck,
    code: "MOD-02",
    title: "Lidská verifikace",
    desc: "Každý AI výstup prochází kontrolou certifikovaného daňového poradce.",
  },
  {
    icon: Zap,
    code: "MOD-03",
    title: "Zero-latency zpracování",
    desc: "Real-time zpracování finančních dat s průměrnou odezvou pod 12 ms.",
  },
  {
    icon: ShieldCheck,
    code: "MOD-04",
    title: "Compliance monitoring",
    desc: "Nepřetržité sledování legislativních změn CZ/DE s automatickým alertingem.",
  },
  {
    icon: Lock,
    code: "MOD-05",
    title: "Šifrovaná komunikace",
    desc: "End-to-end šifrování veškeré klientské komunikace a dokumentů.",
  },
  {
    icon: LineChart,
    code: "MOD-06",
    title: "Prediktivní modelování",
    desc: "ML modely pro predikci cash-flow, daňové optimalizace a rizikových scénářů.",
  },
];

export default function TechnologySection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="technologie"
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 70% 40%, rgba(0,85,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-16 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            TECHNOLOGIE // AI MODULY
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Architektura naší
            <br />
            <span className="text-cyan">AI platformy</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl">
            Šest integrovaných modulů, které spolupracují na maximální přesnosti
            a bezpečnosti vašich finančních dat.
          </p>
        </div>

        {/* Module grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <div
              key={mod.code}
              className={`hud-panel p-6 rounded-sm transition-all duration-300 hover:border-cyan/30 group ${
                inView ? `animate-float-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 border border-cyan/20 bg-cyan/8 group-hover:bg-cyan/12 transition-colors">
                  <mod.icon size={20} className="text-cyan" />
                </div>
                <span
                  className="text-text-muted"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                  }}
                >
                  {mod.code}
                </span>
              </div>

              <h3
                className="text-white text-base font-semibold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {mod.title}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed">
                {mod.desc}
              </p>

              {/* Bottom accent line on hover */}
              <div className="mt-4 h-px bg-gradient-to-r from-cyan/0 via-cyan/20 to-cyan/0 group-hover:via-cyan/40 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
