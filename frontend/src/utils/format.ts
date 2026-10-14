export function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export function initials(name?: string) {
  return (name ?? "User").split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}
