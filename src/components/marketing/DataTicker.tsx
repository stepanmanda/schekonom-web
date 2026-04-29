"use client";

const tickerItems = [
  "SYS:OK",
  "OCR PŘÍJEM FAKTUR — 234×",
  "PÁROVÁNÍ PLATEB — AKTIVNÍ",
  "DPH KH — PŘIPRAVENO",
  "RIZIKOVÁ DETEKCE — 1205×",
  "AI CHURN ANALYZER — RUNNING",
  "UPOMÍNKY 3-STAGE — 47×",
  "ELSTER PODÁNÍ — POZASTAVENO",
  "FRAUD WATCH — IBAN OK",
  "DOCUMENT INGEST — 8/8 OK",
  "TERMÍNY HLÍDÁNY — 22 ITEMS",
  "DATA CORRELATIONS — 184 SOURCES",
  "ANALÝZ RUNNING — 205",
  "WORKFLOWS — 6/8 ACTIVE",
  "VOICE ANALYSIS — STANDBY",
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
