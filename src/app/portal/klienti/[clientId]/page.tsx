"use client";

import { useEffect, useState, use } from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  FileText,
  Shield,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getClientMissionControl } from "@/lib/demo/api";
import { severityTone, toneLabel, workflowTone } from "@/lib/utils";
import type {
  ClientDetail,
  DemoAlert,
  DemoDocument,
  DemoTask,
  WorkflowStep,
} from "@/lib/demo/types";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

function WorkflowRow({ step }: { step: WorkflowStep }) {
  return (
    <div className="hud-workflow-step" data-state={step.state}>
      <div className="hud-workflow-marker" />
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
            {step.label}
          </span>
          <span className="hud-chip" data-tone={workflowTone(step.state)}>
            {step.timestamp}
          </span>
        </div>
        <div style={{ color: "#7A8A9E", lineHeight: 1.6 }}>{step.detail}</div>
      </div>
    </div>
  );
}

function AlertList({
  alerts,
  compact,
}: {
  alerts: DemoAlert[];
  compact: boolean;
}) {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="hud-alert-card"
          data-tone={severityTone(alert.severity)}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <div
                style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: 6 }}
              >
                {alert.title}
              </div>
              <div style={{ color: "#B8C1C8", lineHeight: 1.62 }}>
                {alert.summary}
              </div>
            </div>
            <span className="hud-chip" data-tone={severityTone(alert.severity)}>
              {alert.severity}
            </span>
          </div>
          {!compact ? (
            <div style={{ color: "#7A8A9E", lineHeight: 1.6 }}>
              {alert.action}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { session } = useAuth();
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const workspace = session?.workspace;
  const client = workspace?.clients.find((c) => c.id === clientId);
  const clientAlerts =
    workspace?.alerts.filter((a) => a.clientId === clientId) ?? [];
  const clientDocuments =
    workspace?.documents.filter((d) => d.clientId === clientId) ?? [];
  const clientTasks =
    workspace?.tasks.filter((t) => t.clientId === clientId) ?? [];

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    setLoading(true);
    setError("");

    getClientMissionControl(session.user.id, clientId)
      .then((d) => {
        if (!cancelled) setDetail(d);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err instanceof Error
              ? err.message
              : "Nepodařilo se načíst detail klienta.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [clientId, session]);

  if (!session || !workspace) return null;

  return (
    <section className="hud-panel p-6 mission-control-panel">
      {/* Client header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2" style={labelStyle}>
            Mission control
          </div>
          <div
            style={{ color: "#FFFFFF", fontSize: "1.35rem", fontWeight: 700 }}
          >
            {client?.name ?? "Klient"}
          </div>
          <div style={{ color: "#7A8A9E", lineHeight: 1.65, marginTop: 8 }}>
            {detail?.description ?? client?.status ?? "Načítám detail klienta."}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="hud-chip" data-tone={client?.statusTone ?? "slate"}>
            {client?.status ?? "Loading"}
          </span>
          <span className="hud-chip" data-tone="slate">
            {client?.region ?? "Role-based data"}
          </span>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="hud-loading-box">
          <Activity size={16} color="#00E5FF" />
          <span>Načítám detail klienta a workflow vrstvy...</span>
        </div>
      ) : null}

      {/* Error state */}
      {error ? (
        <div className="hud-inline-alert">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      ) : null}

      {/* Detail content */}
      {detail ? (
        <>
          {/* Metrics grid */}
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            {detail.metrics.map((metric) => (
              <div
                key={metric.label}
                className="hud-mini-metric"
                data-tone={metric.tone}
              >
                <div style={labelStyle}>{metric.label}</div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    margin: "6px 0",
                  }}
                >
                  {metric.value}
                </div>
                <div style={{ color: "#7A8A9E", lineHeight: 1.55 }}>
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Workflow timeline */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2" style={labelStyle}>
              <BadgeCheck size={13} color="#00E5FF" />
              Workflow timeline
            </div>
            <div className="space-y-3">
              {detail.workflow.map((step) => (
                <WorkflowRow key={`${detail.id}-${step.label}`} step={step} />
              ))}
            </div>
          </div>

          {/* Risk shield */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2" style={labelStyle}>
              <AlertTriangle size={13} color="#00E5FF" />
              Risk shield
            </div>
            <AlertList alerts={clientAlerts} compact={false} />
          </div>

          {/* Missing docs radar */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2" style={labelStyle}>
              <Upload size={13} color="#00E5FF" />
              Missing docs radar
            </div>
            <div className="space-y-3">
              {detail.missingDocs.length ? (
                detail.missingDocs.map((item) => (
                  <div
                    key={`${detail.id}-${item.title}`}
                    className="hud-list-row hud-list-row-stacked"
                  >
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ color: "#7A8A9E", lineHeight: 1.62 }}>
                      {item.blocking}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="hud-chip" data-tone="slate">
                        {item.requester}
                      </span>
                      <span className="hud-chip" data-tone="cyan">
                        {item.channel}
                      </span>
                      <span className="hud-chip" data-tone="gold">
                        {item.requestedAt}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="hud-loading-box">
                  <CheckCircle2 size={16} color="#00E5A0" />
                  <span>Žádný chybějící podklad v aktivní frontě.</span>
                </div>
              )}
            </div>
          </div>

          {/* Virtual CFO */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2" style={labelStyle}>
              <TrendingUp size={13} color="#00E5FF" />
              Virtual CFO
            </div>
            <div className="space-y-3">
              {detail.cfo.map((item) => (
                <div
                  key={`${detail.id}-${item.title}`}
                  className="hud-cfo-card"
                  data-tone={item.tone}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {item.title}
                    </div>
                    <span className="hud-chip" data-tone={item.tone}>
                      {toneLabel(item.tone)}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#B8C1C8",
                      lineHeight: 1.62,
                      marginBottom: 10,
                    }}
                  >
                    {item.summary}
                  </div>
                  <div
                    style={{
                      color: "#7A8A9E",
                      lineHeight: 1.62,
                      marginBottom: 8,
                    }}
                  >
                    Dopad: {item.impact}
                  </div>
                  <div style={{ color: "#FFFFFF", lineHeight: 1.62 }}>
                    Doporučený krok: {item.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approvals + Documents grid */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-2" style={labelStyle}>
                <Shield size={13} color="#00E5FF" />
                Schvalovací centrum
              </div>
              <div className="space-y-3">
                {detail.approvals.map((item) => (
                  <div
                    key={`${detail.id}-${item.title}`}
                    className="hud-list-row hud-list-row-stacked"
                  >
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ color: "#7A8A9E", lineHeight: 1.62 }}>
                      {item.owner} // {item.status}
                    </div>
                    <div className="mt-3">
                      <span className="hud-chip" data-tone="gold">
                        {item.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2" style={labelStyle}>
                <FileText size={13} color="#00E5FF" />
                Aktivní dokumenty
              </div>
              <div className="space-y-3">
                {clientDocuments.slice(0, 4).map((doc) => (
                  <div key={doc.id} className="hud-list-row">
                    <div>
                      <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                        {doc.title}
                      </div>
                      <div
                        style={{
                          color: "#7A8A9E",
                          fontSize: "0.82rem",
                          marginTop: 4,
                        }}
                      >
                        {doc.kind}
                      </div>
                    </div>
                    <span
                      className="hud-chip"
                      data-tone={doc.status === "Chybí" ? "red" : "cyan"}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
                <div className="hud-list-row">
                  <div>
                    <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      Otevřené úkoly
                    </div>
                    <div
                      style={{
                        color: "#7A8A9E",
                        fontSize: "0.82rem",
                        marginTop: 4,
                      }}
                    >
                      Workflow akce spojené s tímto klientem
                    </div>
                  </div>
                  <span className="hud-chip" data-tone="cyan">
                    {clientTasks.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
