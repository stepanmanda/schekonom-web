"use client";

import type { ReactNode } from "react";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

export default function SectionCard({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="hud-panel p-6">
      <div className="mb-5">
        <div className="mb-2" style={labelStyle}>
          {label}
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: "1.15rem",
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div style={{ color: "#7A8A9E", lineHeight: 1.68 }}>{description}</div>
      </div>
      {children}
    </section>
  );
}
