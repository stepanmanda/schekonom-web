"use client";

const tickerItems = [
  "SYS:OK",
  "FRAUD WATCH — AKTIVNÍ",
  "OCR FAKTURY — RUNNING",
  "PÁROVÁNÍ PLATEB — AKTIVNÍ",
  "RIZIKOVÁ DETEKCE — 1.2k×",
  "TERMÍNY HLÍDÁNY",
  "UPOMÍNKY — AUTO",
  "DPH KH — PŘIPRAVENO",
  "ELSTER ENDPOINT — STANDBY",
  "DOCUMENT INGEST — OK",
  "AI VRSTVA — ONLINE",
  "PREDIKCE ODCHODU — RUNNING",
  "200+ ANALÝZ — ACTIVE",
  "WORKFLOWS — ALL GREEN",
  "DATA CORRELATION — LIVE",
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
