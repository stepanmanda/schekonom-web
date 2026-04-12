export function formatDueDate(value: string) {
  if (!value.includes("-")) return value;
  return new Intl.DateTimeFormat("cs-CZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function severityTone(s: string) {
  if (s === "high") return "red";
  if (s === "medium") return "gold";
  return "green";
}

export function toneLabel(t: string) {
  if (t === "red") return "kritické";
  if (t === "gold") return "sledovat";
  if (t === "green") return "stabilní";
  if (t === "slate") return "neutrální";
  return "aktivní";
}

export function workflowTone(state: string) {
  if (state === "done") return "green";
  if (state === "active") return "cyan";
  if (state === "blocked") return "red";
  return "gold";
}
