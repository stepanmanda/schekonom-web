"use client";

import type { DemoKpi } from "@/lib/demo/types";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "color-mix(in srgb, var(--accent-strong) 72%, transparent)",
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
          color: "var(--ink)",
          marginBottom: 8,
        }}
      >
        {kpi.value}
      </div>
      <div style={{ color: "var(--muted)", lineHeight: 1.6 }}>{kpi.sub}</div>
    </div>
  );
}
