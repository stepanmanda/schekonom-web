import ClientDetailPage from "./client-detail";

export function generateStaticParams() {
  return [
    { clientId: "client_montservis" },
    { clientId: "client_bauteam" },
    { clientId: "client_pendler" },
    { clientId: "client_elektro" },
    { clientId: "client_restaurace" },
    { clientId: "client_kovo" },
    { clientId: "client_logitrans" },
  ];
}

export default function Page({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  return <ClientDetailPage params={params} />;
}
