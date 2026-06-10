export const formatBudget = (budget: string) => {
  // Simple human‑readable mapping
  const map: Record<string, string> = {
    shoestring: "Shoestring",
    low: "Low",
    average: "Average",
    medium: "Medium",
    high: "High",
    prestige: "Prestige",
  };
  return map[budget] ?? budget;
};

export const formatStatus = (manga: { status: string; releaseFrequency?: string }) => {
  if (manga.status === "finished") return "Finished";
  return `Running (${manga.releaseFrequency ?? "ongoing"})`;
};

export const formatNumber = (num: number) => num.toLocaleString();

export const formatArray = (arr: string[]) => (arr.length ? arr.join(", ") : "None");