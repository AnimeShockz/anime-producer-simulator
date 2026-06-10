// ... existing imports and types remain unchanged ...

export const studios: Studio[] = [
  // ... all previous studio entries ...

  // Defunct studio – Easter egg
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
    popularity: 5, // very low to keep it hidden unless specifically searched
  },
];