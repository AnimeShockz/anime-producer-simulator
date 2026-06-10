export type Studio = {
  id: string;
  name: string;
  minBudget: BudgetLevel;
  size: "small" | "medium" | "large";
  genres: string[];
  themes: string[];
  ageGroups: string[];
  lengthPreference: StudioLengthPreference;
  complexity: StudioComplexity;
  pacing: StudioPacing;
  styleDescription: string;
};

export type BudgetLevel =
  | "shoestring"
  | "low"
  | "average"
  | "medium"
  | "high"
  | "prestige";

export type StudioLengthPreference = "short" | "medium" | "long" | "any";

export type StudioComplexity = "low" | "medium" | "high" | "any";

export type StudioPacing = "slow" | "medium" | "fast" | "any";

export const budgetOrder: BudgetLevel[] = [
  "shoestring",
  "low",
  "average",
  "medium",
  "high",
  "prestige",
];

export const budgetValue: Record<BudgetLevel, number> = {
  shoestring: 1,
  low: 2,
  average: 3,
  medium: 4,
  high: 5,
  prestige: 6,
};

export const studios: Studio[] = [
  {
    id: "studio-1",
    name: "Ufotable",
    minBudget: "high",
    size: "large",
    genres: ["action", "fantasy", "supernatural"],
    themes: ["fate", "redemption", "blade"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "medium",
    complexity: "high",
    pacing: "fast",
    styleDescription:
      "Known for stunning visual effects and fluid action sequences, with a focus on detailed battle choreography.",
  },
  {
    id: "studio-2",
    name: "MAPPA",
    minBudget: "medium",
    size: "large",
    genres: ["action", "drama", "sci-fi", "horror"],
    themes: ["survival", "war", "psychological"],
    ageGroups: ["shonen", "seinen", "adult"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Versatile studio with strong storytelling and experimental animation techniques.",
  },
  {
    id: "studio-3",
    name: "A-1 Pictures",
    minBudget: "average",
    size: "large",
    genres: ["romance", "comedy", "fantasy", "slice of life"],
    themes: ["love", "friendship", "music"],
    ageGroups: ["shonen", "shojo"],
    lengthPreference: "medium",
    complexity: "low",
    pacing: "slow",
    styleDescription:
      "Reliable production with consistent quality, strong in character-driven stories.",
  },
  {
    id: "studio-4",
    name: "Kyoto Animation",
    minBudget: "average",
    size: "medium",
    genres: ["slice of life", "drama", "romance"],
    themes: ["youth", "healing", "art"],
    ageGroups: ["shojo", "seinen"],
    lengthPreference: "short",
    complexity: "medium",
    pacing: "slow",
    styleDescription:
      "Renowned for exquisite character animation and heartfelt, delicate storytelling.",
  },
  {
    id: "studio-5",
    name: "Studio Trigger",
    minBudget: "low",
    size: "small",
    genres: ["action", "comedy", "mecha"],
    themes: ["rebellion", "friendship", "over-the-top"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription:
      "Energetic and stylized animation with bold colors and dynamic motion.",
  },
  {
    id: "studio-6",
    name: "Madhouse",
    minBudget: "low",
    size: "large",
    genres: ["any"],
    themes: ["any"],
    ageGroups: ["any"],
    lengthPreference: "any",
    complexity: "any",
    pacing: "any",
    styleDescription:
      "Veteran studio with a wide range of works, known for adapting diverse genres with solid craftsmanship.",
  },
  {
    id: "studio-7",
    name: "Pierrot",
    minBudget: "low",
    size: "large",
    genres: ["action", "fantasy", "shonen"],
    themes: ["adventure", "supernatural", "comedy"],
    ageGroups: ["shonen"],
    lengthPreference: "long",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Long-running shonen specialist, reliable for long series with consistent output.",
  },
];