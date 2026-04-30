"use client";

import { useInView } from "@/hooks/useInView";
import { useEffect, useState } from "react";

const stats = [
  { target: 200, suffix: "+", label: "Analýz připravených v aplikaci" },
  { target: 20, suffix: "+", label: "Datových zdrojů k napojení" },
  { target: 23, suffix: "", label: "Kategorií analytiky" },
  { target: 8, suffix: "", label: "Automatizovaných workflow" },
  { target: 3, suffix: "", label: "Vrstvy: web · portál · admin" },
  { target: 24, suffix: "/7", label: "Online provoz" },
];

function AnimatedCounter({
  target,
  suffix,
  decimals = 0,
  active,
}: {
  target: number;
  suffix: string;
  decimals?: number;
  active: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 2200;
    const steps = 70;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out cubic for smooth deceleration
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setValue(target * progress);

      if (step >= steps) {
        setValue(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [active, target]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString("cs-CZ");

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(0,229,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`mb-16 text-center ${inView ? "animate-float-up" : "opacity-0"}`}
        >
          <div className="section-tag justify-center mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            ROZSAH PRODUKTU
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co <span className="text-cyan">vidíte uvnitř</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
            Co je v aplikaci připravené ke spuštění. Konkrétní využití u vás záleží
            na rozsahu nasazení — probereme na konzultaci.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-cyan/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-void py-10 px-6 text-center group hover:bg-cyan/[0.03] transition-colors duration-500 ${
                inView ? `animate-float-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              <div
                className="text-cyan text-3xl sm:text-4xl lg:text-5xl font-bold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  active={inView}
                />
              </div>
              <div
                className="text-text-muted group-hover:text-text-secondary transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
