"use client";

import { Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";
import { formatDueDate } from "@/lib/utils";

export default function TerminyPage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;

  return (
    <SectionCard
      label="Calendar"
      title="Termíny a odpovědnosti"
      description="Daňové, mzdové a přeshraniční deadline v jednom pohledu, ne v několika kalendářích a emailech."
    >
      <div className="space-y-3">
        {workspace.deadlines.map((deadline) => (
          <div key={deadline.id} className="hud-list-row">
            <div className="flex items-start gap-3">
              <Calendar size={16} color="color-mix(in srgb, var(--accent-strong) 75%, transparent)" />
              <div>
                <div style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {deadline.title}
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.84rem",
                    marginTop: 4,
                  }}
                >
                  {deadline.area}{" // "}{deadline.ownerLabel}
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
  );
}
