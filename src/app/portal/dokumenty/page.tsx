"use client";

import { Clock3 } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";

export default function DokumentyPage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;

  return (
    <SectionCard
      label="Documents"
      title="Dokumenty a vstupní kanály"
      description="Doklad nepřijde člověku. Přijde systému, ten ho vytěží, zvaliduje a zařadí do workflow."
    >
      <div className="space-y-3">
        {workspace.documents.map((doc) => (
          <div key={doc.id} className="hud-list-row hud-list-row-stacked">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  {doc.title}
                </div>
                <div style={{ color: "#7A8A9E", lineHeight: 1.6 }}>
                  {doc.kind} // {doc.source}
                </div>
              </div>
              <span
                className="hud-chip"
                data-tone={doc.status === "Chybí" ? "red" : "cyan"}
              >
                {doc.status}
              </span>
            </div>
            <div
              className="mt-4 flex items-center gap-2"
              style={{ color: "#7A8A9E" }}
            >
              <Clock3 size={14} />
              <span style={{ fontSize: "0.82rem" }}>{doc.receivedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
