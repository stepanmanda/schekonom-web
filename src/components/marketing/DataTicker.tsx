"use client";

const tickerItems = [
  "SYS:OK",
  "OCR FAKTURY — 234× ZA MĚSÍC",
  "PÁROVÁNÍ PLATEB — 189× AKTIVNÍ",
  "RIZIKOVÁ DETEKCE — 1 205×",
  "FRAUD ALERT ⟶ KRANBAU IBAN",
  "FAKTURY PO SPLATNOSTI — 9",
  "11 RIZIK · 1 KRITICKÉ · 4 VYSOKÁ",
  "DPH 03/2026 — 8 PŘIZNÁNÍ",
  "ELSTER QUARTILE — Q1/2026",
  "TERMÍNY DUBEN — 13 ITEMS",
  "UPOMÍNKY 3-STAGE — 47× SENT",
  "MZDOVÁ UZÁVĚRKA — 25 ZAMĚSTNANCŮ",
  "DOCUMENT INGEST — 45/45 OK",
  "DATA SOURCES — 14 PŘIPOJENO",
  "ANALÝZ RUNNING — 205",
  "WORKFLOWS — 6/8 ACTIVE",
  "OBRAT KLIENTŮ — 7,7M Kč/M",
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
