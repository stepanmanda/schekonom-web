"use client";

const tickerItems = [
  "SYS:OK",
  "DPPO 2025 — ZPRACOVÁNO",
  "KLIENTI: 340+",
  "COMPLIANCE CZ: 100%",
  "COMPLIANCE DE: 100%",
  "FREISTELLUNG — AKTIVNÍ",
  "MZDY 03/2026 — ODESLÁNO",
  "CERTIFIKÁT eIDAS — PLATNÝ",
  "CHEB HQ — OPERAČNÍ",
  "PLZEŇ — OPERAČNÍ",
  "TÝM: 40+ SPECIALISTŮ",
  "PRAXE: 30+ LET",
  "KINDERGELD — ZPRACOVÁNO",
  "STEUERERKLÄRUNG — ODESLÁNO",
  "DPH Q1/2026 — PODÁNO",
];

export default function DataTicker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="border-t border-b border-cyan/8 bg-void-deep/80 overflow-hidden py-3">
      <div className="animate-data-ticker flex items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-cyan/40" />
            <span
              className="text-text-muted"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
