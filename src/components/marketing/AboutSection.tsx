"use client";

import { useInView } from "@/hooks/useInView";

export default function AboutSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="o-nas"
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Subtle top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`mb-16 text-center ${inView ? "animate-float-up" : "opacity-0"}`}
        >
          <div className="section-tag justify-center mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            O PRODUKTU // CO JE EKONOMOS
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co děláme <span className="text-gold">jinak</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            EkonomOS není jen aplikace. Je to autonomní finanční centrum, které
            propojuje vaše data, hlídá rizika a navrhuje akce — místo toho, aby
            vás zaplavovalo Excelem.
          </p>
        </div>

        {/* Visualization + story row */}
        <div
          className={`mb-20 grid lg:grid-cols-2 gap-10 items-center ${inView ? "animate-float-up delay-100" : "opacity-0"}`}
        >
          {/* Abstract HUD visualization — žádné fotky */}
          <div className="relative group">
            <div
              className="absolute -inset-3 opacity-25 blur-2xl group-hover:opacity-40 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,229,255,0.3), transparent 70%)",
              }}
            />
            <div
              className="relative glass-panel overflow-hidden"
              style={{ aspectRatio: "3/2" }}
            >
              {/* Animated mesh background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 30% 30%, rgba(0,229,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 75% 70%, rgba(212,175,55,0.12) 0%, transparent 60%)",
                }}
              />

              {/* Grid pattern */}
              <div className="absolute inset-0 grid-bg opacity-40" />

              {/* SVG data viz — concentric rings + nodes */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 600 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,229,255,0.15)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                {/* Center glow */}
                <circle cx="300" cy="200" r="150" fill="url(#ringGlow)" />
                {/* Concentric rings */}
                {[80, 110, 140, 170, 200].map((r, i) => (
                  <circle
                    key={r}
                    cx="300"
                    cy="200"
                    r={r}
                    fill="none"
                    stroke="rgba(0,229,255,0.15)"
                    strokeWidth="0.5"
                    strokeDasharray={i % 2 === 0 ? "2 4" : "none"}
                  />
                ))}
                {/* Data nodes */}
                {[
                  { x: 300, y: 80, color: "#00E5FF", label: "ÚČETNICTVÍ" },
                  { x: 480, y: 130, color: "#00E5FF", label: "DOKUMENTY" },
                  { x: 510, y: 250, color: "#D4AF37", label: "BANKY" },
                  { x: 380, y: 340, color: "#00E5FF", label: "REJSTŘÍKY" },
                  { x: 220, y: 340, color: "#D4AF37", label: "MZDY" },
                  { x: 90, y: 250, color: "#00E5FF", label: "DAŇOVÉ" },
                  { x: 120, y: 130, color: "#00E5FF", label: "KOMUNIKACE" },
                ].map((node) => (
                  <g key={node.label}>
                    <line
                      x1="300"
                      y1="200"
                      x2={node.x}
                      y2={node.y}
                      stroke={node.color}
                      strokeWidth="0.4"
                      strokeOpacity="0.4"
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="4"
                      fill={node.color}
                      fillOpacity="0.85"
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="10"
                      fill={node.color}
                      fillOpacity="0.15"
                    />
                    <text
                      x={node.x}
                      y={node.y + 22}
                      fill="rgba(184,193,200,0.7)"
                      fontSize="9"
                      fontFamily="SF Mono, monospace"
                      letterSpacing="1"
                      textAnchor="middle"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
                {/* Center hub */}
                <circle
                  cx="300"
                  cy="200"
                  r="14"
                  fill="rgba(0,229,255,0.2)"
                  stroke="#00E5FF"
                  strokeWidth="1.5"
                />
                <text
                  x="300"
                  y="204"
                  fill="#00E5FF"
                  fontSize="9"
                  fontFamily="Space Grotesk, sans-serif"
                  fontWeight="700"
                  textAnchor="middle"
                  letterSpacing="0.5"
                >
                  OS
                </text>
              </svg>

              {/* Bottom HUD bar */}
              <div className="absolute bottom-2 left-2 right-2 glass-panel-dark px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse-dot" />
                  <span
                    className="text-text-secondary"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    EKONOMOS // CONTROL CENTER
                  </span>
                </div>
                <span
                  className="text-text-muted"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  PILOT FÁZE · HLEDÁME PARTNERY
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3
              className="text-white text-2xl sm:text-3xl font-bold mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Jedno místo pro všechno,
              <br />
              co účetní firma <span className="text-gold">potřebuje</span>
            </h3>
            <div className="space-y-4 text-text-secondary text-base leading-relaxed">
              <p>
                Hodnota není v množství dat. Hodnota je v <strong className="text-white">korelacích</strong>,
                které vznikají teprve propojením účetnictví, komunikace, mezd,
                rejstříků a behaviorálních stop. Rozdíl mezi účetní firmou
                s počítači a <strong className="text-white">autonomním finančním centrem</strong>.
              </p>
              <p>
                Stavíme to ve studiu{" "}
                <a
                  href="https://velyos.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline"
                >
                  VELYOS
                </a>{" "}
                — specializujeme se na B2B AI agenty a autonomní workflow pro profesionální služby.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
