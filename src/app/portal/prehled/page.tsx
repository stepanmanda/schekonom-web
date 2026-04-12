"use client";

import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";
import ClientCard from "@/components/portal/ClientCard";
import { severityTone } from "@/lib/utils";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

export default function PrehledPage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;
  const topClients = workspace.clients.slice(0, 5);
  const recentFeed = workspace.feed.slice(0, 6);

  return (
    <>
      <SectionCard
        label="Priority client matrix"
        title="Kdo je důležitý právě teď"
        description="Tady majitel okamžitě uvidí, že systém řadí klienty podle rizika, termínů a blokací."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {topClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              href={`/portal/klienti/${client.id}`}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        label="Agent feed"
        title="Firma běží sama, lidé řídí výjimky"
        description="Feed není chat. Je to časová osa automatických akcí, rozhodnutí a eskalací."
      >
        <div className="space-y-3">
          {recentFeed.map((item) => (
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
