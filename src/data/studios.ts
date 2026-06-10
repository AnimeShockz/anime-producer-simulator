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
  // New popularity score for sorting (higher = more popular)
  popularity: number;
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
  // 1️⃣ Large, high‑budget, globally recognised
  {
    id: "ufotable",
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
    popularity: 120,
  },
  {
    id: "mappa",
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
    popularity: 110,
  },
  {
    id: "a1-pictures",
    name: "A‑1 Pictures",
    minBudget: "average",
    size: "large",
    genres: ["romance", "comedy", "fantasy", "slice of life"],
    themes: ["love", "friendship", "music"],
    ageGroups: ["shonen", "shojo", "seinen", "josei"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Reliable production with consistent quality, strong in character‑driven stories.",
    popularity: 105,
  },
  {
    id: "kyoto-animation",
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
    popularity: 100,
  },
  {
    id: "bones",
    name: "Bones",
    minBudget: "low",
    size: "large",
    genres: ["action", "adventure", "fantasy"],
    themes: ["heroism", "teamwork", "redemption"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "long",
    complexity: "high",
    pacing: "fast",
    styleDescription:
      "Long‑running shonen specialist, reliable for long series with consistent output.",
    popularity: 95,
  },

  // 2️⃣ Mid‑size, solid reputation
  {
    id: "studio-trigger",
    name: "Studio Trigger",
    minBudget: "low",
    size: "small",
    genres: ["action", "comedy", "mecha"],
    themes: ["rebellion", "friendship", "over‑the‑top"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription:
      "Energetic and stylized animation with bold colors and dynamic motion.",
    popularity: 85,
  },
  {
    id: "wit-studio",
    name: "WIT Studio",
    minBudget: "medium",
    size: "medium",
    genres: ["action", "fantasy", "drama"],
    themes: ["war", "survival", "humanity"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "medium",
    complexity: "high",
    pacing: "fast",
    styleDescription:
      "High‑quality production, known for cinematic visuals and strong pacing.",
    popularity: 80,
  },
  {
    id: "production-ig",
    name: "Production I.G",
    minBudget: "medium",
    size: "large",
    genres: ["sci‑fi", "action", "drama"],
    themes: ["technology", "politics", "psychology"],
    ageGroups: ["seinen", "adult"],
    lengthPreference: "any",
    complexity: "high",
    pacing: "medium",
    styleDescription:
      "Pioneer in digital animation, delivering sleek, detailed sci‑fi works.",
    popularity: 78,
  },
  {
    id: "studio-ghibli",
    name: "Studio Ghibli",
    minBudget: "high",
    size: "large",
    genres: ["fantasy", "adventure", "drama"],
    themes: ["environment", "coming‑of‑age", "magic"],
    ageGroups: ["family", "josei"],
    lengthPreference: "medium",
    complexity: "high",
    pacing: "slow",
    styleDescription:
      "Iconic hand‑drawn animation with lush world‑building and emotional depth.",
    popularity: 75,
  },

  // 3️⃣ Smaller, niche but real studios
  {
    id: "david-production",
    name: "David Production",
    minBudget: "low",
    size: "medium",
    genres: ["action", "fantasy", "comedy"],
    themes: ["supernatural", "friendship", "adventure"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "short",
    complexity: "medium",
    pacing: "fast",
    styleDescription:
      "Known for vibrant character designs and energetic fight choreography.",
    popularity: 70,
  },
  {
    id: "satelight",
    name: "Satelight",
    minBudget: "low",
    size: "large",
    genres: ["mecha", "action", "sports"],
    themes: ["robotics", "competition", "friendship"],
    ageGroups: ["shonen"],
    lengthPreference: "long",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Veteran studio with decades of experience in action and mecha anime.",
    popularity: 55,
  },
  {
    id: "tatsunoko",
    name: "Tatsunoko Production",
    minBudget: "low",
    size: "large",
    genres: ["action", "sci‑fi", "mecha"],
    themes: ["heroism", "future", "robotics"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "long",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Classic studio famous for pioneering superhero and mecha series.",
    popularity: 35,
  },
  {
    id: "sunrise",
    name: "Sunrise",
    minBudget: "low",
    size: "large",
    genres: ["mecha", "action", "sports"],
    themes: ["robotics", "competition", "friendship"],
    ageGroups: ["shonen"],
    lengthPreference: "long",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Famous for the Gundam franchise and high‑octane mecha productions.",
    popularity: 30,
  },

  // 4️⃣ Very small, real boutique studios
  {
    id: "graphin",
    name: "Graphin",
    minBudget: "low",
    size: "small",
    genres: ["action", "fantasy"],
    themes: ["battle", "magic", "adventure"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription:
      "Produces action‑heavy fantasy series with vibrant visuals.",
    popularity: 40,
  },
  {
    id: "seven-tides",
    name: "Seven Tides",
    minBudget: "low",
    size: "small",
    genres: ["sports", "drama"],
    themes: ["competition", "perseverance", "teamwork"],
    ageGroups: ["shonen"],
    lengthPreference: "medium",
    complexity: "low",
    pacing: "medium",
    styleDescription:
      "Specialises in sports anime with realistic character development.",
    popularity: 60,
  },
  {
    id: "prism-plus",
    name: "Prism Plus",
    minBudget: "low",
    size: "small",
    genres: ["idol", "music", "comedy"],
    themes: ["performance", "entertainment", "dreams"],
    ageGroups: ["shojo", "josei"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription:
      "Specialises in music and idol‑themed anime.",
    popularity: 30,
  },
  {
    id: "magic-company",
    name: "Magic Company",
    minBudget: "low",
    size: "small",
    genres: ["fantasy", "adventure"],
    themes: ["magic", "quest", "discovery"],
    ageGroups: ["shonen", "shojo"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription:
      "Focuses on fantasy adventure stories with magical elements.",
    popularity: 10,
  },
];