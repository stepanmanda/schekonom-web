"use client";

import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";
import { severityTone } from "@/lib/utils";

export default function RizikaPage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;

  return (
    <SectionCard
      label="Risk shield"
      title="Rizika, která systém zachytí dřív než člověk"
      description="IBAN fraud, chybějící podklady, exekuce, termíny a nesoulady jsou samostatná vrstva řízení rizik."
    >
      <div className="space-y-3">
        {workspace.alerts.map((alert) => (
          <div
            key={alert.id}
            className="hud-alert-card"
            data-tone={severityTone(alert.severity)}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  {alert.title}
                </div>
                <div style={{ color: "#B8C1C8", lineHeight: 1.62 }}>
                  {alert.summary}
                </div>
              </div>
              <span
                className="hud-chip"
                data-tone={severityTone(alert.severity)}
              >
                {alert.severity}
              </span>
            </div>
            <div style={{ color: "#7A8A9E", lineHeight: 1.6 }}>
              {alert.action}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
