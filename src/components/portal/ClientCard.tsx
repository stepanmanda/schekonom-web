"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Calendar,
  Cpu,
  Files,
  type LucideIcon,
} from "lucide-react";
import type { ClientSummary } from "@/lib/demo/types";
import { toneLabel } from "@/lib/utils";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

function MiniMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="hud-mini-metric" data-tone="slate">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={14} color="rgba(0,229,255,0.72)" />
        <span style={labelStyle}>{label}</span>
      </div>
      <div style={{ color: "#FFFFFF", fontWeight: 600 }}>{value}</div>
    </div>
  );
}

export default function ClientCard({
  client,
  isSelected,
  href,
  onClick,
}: {
  client: ClientSummary;
  isSelected?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            {client.name}
          </div>
          <div style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
            {client.sector} // {client.region}
          </div>
        </div>
        <span className="hud-chip" data-tone={client.statusTone}>
          {toneLabel(client.statusTone)}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {client.tags.map((tag) => (
          <span key={tag} className="hud-chip" data-tone="slate">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <MiniMetric
          label="Otevřené úkoly"
          value={String(client.openTasks)}
          icon={Files}
        />
        <MiniMetric
          label="Přes termín"
          value={String(client.overdueItems)}
          icon={AlertTriangle}
        />
        <MiniMetric
          label="Další deadline"
          value={client.nextDeadline}
          icon={Calendar}
        />
        <MiniMetric label="Auto score" value={client.score} icon={Cpu} />
      </div>

      <div className="mt-4 border-t border-cyan-500/10 pt-4">
        <div style={labelStyle}>odpovědnost</div>
        <div style={{ color: "#B8C1C8", lineHeight: 1.6 }}>
          {client.ownerLabels.join(" / ")}
        </div>
        <div
          className="mt-2"
          style={{ color: "#FFFFFF", lineHeight: 1.6, fontSize: "0.88rem" }}
        >
          {client.status}
        </div>
      </div>
    </>
  );

  const className = `hud-client-card ${isSelected ? "hud-client-card-active" : ""}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {inner}
    </button>
  );
}
