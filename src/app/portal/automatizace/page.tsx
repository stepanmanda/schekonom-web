"use client";

import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";
import { severityTone } from "@/lib/utils";

export default function AutomatizacePage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;

  return (
    <>
      <SectionCard
        label="Agent orchestration"
        title="Agentní vrstva nad účetnictvím, mzdami a DE agendou"
        description="Jedna aplikace spojuje dokumenty, workflow, upozornění a lidské schvalování."
      >
        <div className="space-y-3">
          {workspace.feed.map((item) => (
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

      <SectionCard
        label="API surface"
        title="API připravené na reálné integrace"
        description="Front-end už stojí nad jasně popsanou API vrstvou. Tohle lze napojit na SMS, DMS i účetní software."
      >
        <div className="space-y-3">
          {workspace.apiSurface.map((endpoint) => (
            <div
              key={`${endpoint.method}-${endpoint.path}`}
              className="hud-list-row hud-list-row-stacked"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="hud-chip" data-tone="cyan">
                  {endpoint.method}
                </span>
                <span
                  style={{
                    fontFamily: "SF Mono, Monaco, Consolas, monospace",
                    color: "#FFFFFF",
                    fontSize: "0.8rem",
                  }}
                >
                  {endpoint.path}
                </span>
                <span className="hud-chip" data-tone="slate">
                  {endpoint.status}
                </span>
              </div>
              <div style={{ color: "#7A8A9E", lineHeight: 1.62 }}>
                {endpoint.purpose}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
