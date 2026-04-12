"use client";

import type { DemoKpi } from "@/lib/demo/types";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

export default function KpiCard({ kpi }: { kpi: DemoKpi }) {
  return (
    <div className="hud-metric-card" data-tone={kpi.tone}>
      <div className="mb-3" style={labelStyle}>
        {kpi.label}
      </div>
      <div
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: 8,
        }}
      >
        {kpi.value}
      </div>
      <div style={{ color: "#7A8A9E", lineHeight: 1.6 }}>{kpi.sub}</div>
    </div>
  );
}
