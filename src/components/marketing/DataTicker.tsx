"use client";

const tickerItems = [
  "Doklady a termíny",
  "Přehledné pracovní toky",
  "Lidské schválení",
  "Bezpečný provoz",
  "Více času na klienty",
  "Vše důležité na jednom místě",
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
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                letterSpacing: "0.02em",
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
