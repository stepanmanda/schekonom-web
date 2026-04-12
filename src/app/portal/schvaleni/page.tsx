"use client";

import { Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";
import { severityTone, formatDueDate } from "@/lib/utils";

export default function SchvaleniPage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;

  return (
    <>
      <SectionCard
        label="Security"
        title="Schvalovací a bezpečnostní vrstva"
        description="Klient musí vidět jen to, co má schválit nebo dodat. Všechno ostatní zůstává v interní orchestrace."
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

      <SectionCard
        label="Deadlines"
        title="Co je potřeba stihnout"
        description="Termíny a bezpečné nahrání dokumentu v jednom místě."
      >
        <div className="space-y-3">
          {workspace.deadlines.map((deadline) => (
            <div key={deadline.id} className="hud-list-row">
              <div className="flex items-start gap-3">
                <Calendar size={16} color="rgba(0,229,255,0.75)" />
                <div>
                  <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                    {deadline.title}
                  </div>
                  <div
                    style={{
                      color: "#7A8A9E",
                      fontSize: "0.84rem",
                      marginTop: 4,
                    }}
                  >
                    {deadline.area} // {deadline.ownerLabel}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="hud-chip" data-tone="slate">
                  {formatDueDate(deadline.due)}
                </span>
                <span className="hud-chip" data-tone="gold">
                  {deadline.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
