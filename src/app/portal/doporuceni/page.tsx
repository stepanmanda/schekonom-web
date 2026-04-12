"use client";

import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";
import { severityTone, formatDueDate } from "@/lib/utils";

export default function DoporuceniPage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;

  return (
    <>
      <SectionCard
        label="Client next steps"
        title="Co od vás systém potřebuje"
        description="Klientský pohled musí být maximálně jednoduchý. Žádný interní šum, jen akce a stav."
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
        label="AI recommendations"
        title="Virtuální CFO doporučení"
        description="Účetnictví už není jen evidence minulosti. Systém navrhuje další krok dřív, než problém nastane."
      >
        <div className="space-y-3">
          {workspace.feed.slice(0, 4).map((item) => (
            <div key={item.id} className="hud-list-row hud-list-row-stacked">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="hud-time-stamp">{item.timestamp}</span>
                  <div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ color: "#7A8A9E", lineHeight: 1.6 }}>
                      {item.summary}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className="hud-chip"
                    data-tone={severityTone(item.severity)}
                  >
                    {item.severity}
                  </span>
                  {item.needsApproval ? (
                    <span className="hud-chip" data-tone="gold">
                      approval gate
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
