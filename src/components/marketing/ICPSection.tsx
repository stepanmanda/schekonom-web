"use client";

import { Check, X } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const fitFor = [
  "Účetní firma s 15–50 zaměstnanci a 50–200 klienty",
  "Mix klientů včetně CZ–DE pohraničí (pendleři, výroba, stavba)",
  "Růst se zastavil — chcete víc klientů, ale nejde najímat",
  "Klienti se ptají na portál, online přehled, méně mailů",
  "Otevřenost technologii, ale ne tech-first majitel",
];

const notFor = [
  "OSVČ účetní s 5–10 klienty (CAC převýší přínos)",
  "Big4 nebo síťové kanceláře s vlastním IT",
  "Firmy, kde majitel chce ručně schvalovat každý krok",
  "Klienti, kteří odmítají digitální nahrávání dokumentů",
];

export default function ICPSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="pro-koho"
      className="py-24 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-12 ${inView ? "animate-float-up" : "opacity-0"}`}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            PRO KOHO TO JE
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            EkonomOS sedne, když…
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Fits */}
          <div
            className={`hud-panel p-7 ${inView ? "animate-float-up delay-200" : "opacity-0"}`}
            style={{ borderTop: "2px solid rgba(0,229,160,0.4)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Check size={18} className="text-status-green" />
              <span
                className="text-status-green"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Sedneme si
              </span>
            </div>
            <ul className="space-y-3">
              {fitFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                >
                  <Check
                    size={16}
                    className="text-status-green mt-0.5 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Doesn't fit */}
          <div
            className={`hud-panel p-7 ${inView ? "animate-float-up delay-400" : "opacity-0"}`}
            style={{ borderTop: "2px solid rgba(255,123,123,0.4)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <X size={18} className="text-status-red" />
              <span
                className="text-status-red"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Nesedneme si
              </span>
            </div>
            <ul className="space-y-3">
              {notFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                >
                  <X
                    size={16}
                    className="text-status-red mt-0.5 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className={`mt-10 text-center text-text-muted text-sm max-w-2xl mx-auto ${inView ? "animate-float-up delay-600" : "opacity-0"}`}
          style={{ fontStyle: "italic" }}
        >
          Pokud vám to nesedí jednoznačně, ozvěte se — rádi vám upřímně řekneme, jestli máme co nabídnout, nebo vás nasměrujeme jinam.
        </p>
      </div>
    </section>
  );
}
