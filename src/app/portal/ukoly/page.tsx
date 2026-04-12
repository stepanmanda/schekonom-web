"use client";

import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";
import { severityTone, formatDueDate } from "@/lib/utils";

export default function UkolyPage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;

  return (
    <>
      <SectionCard
        label="Task queue"
        title="Fronta úkolů a missing docs radar"
        description="Největší třecí plocha účetních firem je nedodaný podklad. Tady je vidět, kdo co blokuje."
      >
        <div className="space-y-3">
          {workspace.tasks.map((task) => (
            <div key={task.id} className="hud-list-row hud-list-row-stacked">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    {task.title}
                  </div>
                  <div style={{ color: "#7A8A9E", lineHeight: 1.6 }}>
                    {task.summary}
                  </div>
                </div>
                <span
                  className="hud-chip"
                  data-tone={severityTone(task.priority)}
                >
                  {task.stage}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="hud-chip" data-tone="slate">
                  {task.type}
                </span>
                <span
                  className="hud-chip"
                  data-tone={severityTone(task.priority)}
                >
                  due {formatDueDate(task.due)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        label="Escalations"
        title="Aktivní výjimky"
        description="Systém automatizuje rutinu, ale výjimku dává přesně tomu, kdo za ni zodpovídá."
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
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
