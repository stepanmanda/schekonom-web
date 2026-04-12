"use client";

import { useAuth } from "@/lib/auth/context";
import SectionCard from "@/components/portal/SectionCard";
import ClientCard from "@/components/portal/ClientCard";

export default function KlientiPage() {
  const { session } = useAuth();
  if (!session) return null;

  const workspace = session.workspace;

  return (
    <SectionCard
      label="My clients"
      title="Role-based portfolio klientů"
      description="Každý zaměstnanec vidí jen svou část firmy. Stejný klient ale žije ve sdílené operační vrstvě."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {workspace.clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            href={`/portal/klienti/${client.id}`}
          />
        ))}
      </div>
    </SectionCard>
  );
}
