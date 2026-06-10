export const studios: Studio[] = [
  // … all previous studios …

  // Defunct studio – Easter egg (now high popularity)
  {
    id: "triangle-staff",
    name: "Triangle Staff (defunct)",
    minBudget: "shoestring", // only works with the lowest budget
    size: "small",
    genres: ["action", "fantasy", "adventure"],
    themes: ["heroism", "friendship", "quest"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription:
      "A short‑lived studio known for classic 90s action‑adventure titles. No longer active, but appears as a nostalgic easter‑egg.",
    popularity: 120, // high so it shows up in searches/sorts
  },
];