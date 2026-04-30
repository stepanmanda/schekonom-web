"use client";

import { Calendar, ScrollText, Cpu, Receipt } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const regulations = [
  {
    icon: Receipt,
    label: "ViDA — VAT in the Digital Age",
    deadline: "2027–2030",
    desc: "EU postupně zavádí povinnou e-fakturaci a real-time DPH reporting. Účetní firmy bez digitalizovaného workflow se neudrží.",
  },
  {
    icon: Cpu,
    label: "AI Act — evropská regulace AI",
    deadline: "Účinnost 2026",
    desc: "Pokud AI rozhoduje o klientech, musí to být transparentní, auditovatelné a s lidskou kontrolou. EkonomOS je tak postavený od začátku.",
  },
  {
    icon: ScrollText,
    label: "Povinná e-fakturace v ČR",
    deadline: "Postupně 2026–2028",
    desc: "ISDOC, EU normy, kontrolní hlášení v reálném čase. Klienti, kteří dnes posílají PDF fakturu mailem, budou potřebovat jiný workflow.",
  },
];

export default function WhyNowSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="proc-ted"
      className="py-24 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`mb-12 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-dot" />
            PROČ ZROVNA TEĎ
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Tři regulační vlny, které <span className="text-cyan">přijdou tak jako tak.</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Účetní firmy v ČR mají v příštích 2–4 letech tři velké změny.
            Buď je doženete s předstihem, nebo budete dohánět ostatní. EkonomOS
            staví aplikaci tak, aby každá z nich byla pro vás <strong className="text-white">přechod, ne krize</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {regulations.map((r, i) => (
            <div
              key={r.label}
              className={`hud-panel p-7 ${inView ? `animate-float-up delay-${(i + 1) * 200}` : "opacity-0"}`}
            >
              <div className="inline-flex p-3 border border-cyan/20 bg-cyan/5 mb-5">
                <r.icon size={22} className="text-cyan" />
              </div>
              <div
                className="text-cyan mb-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                <Calendar size={12} className="inline mr-1.5" />
                {r.deadline}
              </div>
              <h3
                className="text-white text-lg font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {r.label}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`mt-10 text-center text-text-muted text-sm max-w-2xl mx-auto ${inView ? "animate-float-up delay-800" : "opacity-0"}`}
          style={{ fontStyle: "italic" }}
        >
          Pilot teď znamená, že jste připravení dřív, než vám regulátor vnutí změnu pod tlakem.
        </p>
      </div>
    </section>
  );
}
