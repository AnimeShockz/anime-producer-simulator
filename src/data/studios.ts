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
    styleDescription: "Known for stunning visual effects and fluid action sequences, with a focus on detailed battle choreography.",
    popularity: 120
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
    styleDescription: "Versatile studio with strong storytelling and experimental animation techniques.",
    popularity: 110
  },
  {
    id: "a1-pictures",
    name: "A-1 Pictures",
    minBudget: "average",
    size: "large",
    genres: ["romance", "comedy", "fantasy", "slice of life"],
    themes: ["love", "friendship", "music"],
    ageGroups: ["shonen", "shojo", "seinen", "josei"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "medium",
    styleDescription: "Reliable production with consistent quality, strong in character-driven stories.",
    popularity: 105
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
    styleDescription: "Renowned for exquisite character animation and heartfelt, delicate storytelling.",
    popularity: 100
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
    styleDescription: "Long-running shonen specialist, reliable for long series with consistent output.",
    popularity: 95  },
  {
    id: "pierrot",
    name: "Pierrot",
    minBudget: "low",
    size: "large",
    genres: ["action", "fantasy", "shonen"],
    themes: ["adventure", "supernatural", "comedy"],
    ageGroups: ["shonen"],
    lengthPreference: "long",
    complexity: "medium",
    pacing: "medium",
    styleDescription: "Long-running shonen specialist, reliable for long series with consistent output.",
    popularity: 90
  },
  {
    id: "trigger",
    name: "Studio Trigger",
    minBudget: "low",
    size: "small",
    genres: ["action", "comedy", "mecha"],
    themes: ["rebellion", "friendship", "over-the-top"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription: "Energetic and stylized animation with bold colors and dynamic motion.",
    popularity: 85
  },
  {
    id: "madhouse",
    name: "Madhouse",
    minBudget: "low",
    size: "large",
    genres: ["any"],
    themes: ["any"],
    ageGroups: ["any"],
    lengthPreference: "any",
    complexity: "any",
    pacing: "any",
    styleDescription: "Veteran studio with a wide range of works, known for adapting diverse genres with solid craftsmanship.",
    popularity: 80
  },
  {
    id: "witing",
    name: "Witing",
    minBudget: "low",
    size: "small",
    genres: ["romance", "comedy", "slice of life"],
    themes: ["daily life", "relationships", "humor"],
    ageGroups: ["josei", "shojo"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "slow",
    styleDescription: "Specializes in romantic comedies and heartwarming slice-of-life stories.",
    popularity: 75
  },
  {
    id: "cygames",
    name: "Cygames",
    minBudget: "medium",
    size: "medium",
    genres: ["action", "fantasy", "game adaptation"],
    themes: ["gaming", "adventure", "strategy"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "fast",
    styleDescription: "Game company that produces high-quality anime adaptations of their mobile games.",
    popularity: 70
  },
  {
    id: "eggs",
    name: "eggs",
    minBudget: "low",
    size: "small",
    genres: ["action", "sci-fi"],
    themes: ["space", "technology", "future"],
    ageGroups: ["seinen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription: "Small studio known for sci-fi action series and innovative visual styles.",
    popularity: 65
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
    styleDescription: "Specializes in sports anime with realistic character development.",
    popularity: 60
  },
  {
    id: "satelight",
    name: "Satelight",
    minBudget: "low",
    size: "small",
    genres: ["mecha", "action", "sports"],
    themes: ["robotics", "competition", "friendship"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription: "Known for mecha anime and sports adaptations with dynamic action sequences.",
    popularity: 55
  },
  {
    id: "diola",
    name: "Diola",
    minBudget: "low",
    size: "small",
    genres: ["slice of life", "comedy"],
    themes: ["daily life", "humor", "relationships"],
    ageGroups: ["josei", "shojo"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "slow",
    styleDescription: "Focuses on gentle slice-of-life stories with comedic elements.",
    popularity: 50
  },
  {
    id: "nodus",
    name: "Nodus",
    minBudget: "low",
    size: "small",
    genres: ["horror", "supernatural", "mystery"],
    themes: ["fear", "psychological", "dark"],
    ageGroups: ["seinen", "adult"],
    lengthPreference: "short",
    complexity: "medium",
    pacing: "slow",
    styleDescription: "Specializes in horror and psychological thriller anime.",
    popularity: 45
  },
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
    styleDescription: "Produces action-heavy fantasy series with vibrant visuals.",
    popularity: 40
  },
  {
    id: "tatsunoko",
    name: "Tatsunoko Production",
    minBudget: "low",
    size: "large",
    genres: ["action", "sci-fi", "mecha"],
    themes: ["heroism", "future", "robotics"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "long",
    complexity: "medium",
    pacing: "medium",
    styleDescription: "Veteran studio with decades of experience in action and mecha anime.",
    popularity: 35
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
    styleDescription: "Famous for the Gundam franchise and sports anime productions.",
    popularity: 30
  },
  {
    id: "solaris",
    name: "Solaris",
    minBudget: "low",
    size: "small",
    genres: ["drama", "romance", "slice of life"],
    themes: ["emotion", "relationships", "daily life"],
    ageGroups: ["josei", "shojo"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "slow",
    styleDescription: "Specializes in emotional character-driven stories.",
    popularity: 25  },
  {
    id: "ascend",
    name: "Ascend",
    minBudget: "low",
    size: "small",
    genres: ["action", "fantasy"],
    themes: ["adventure", "magic", "quest"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription: "New studio focusing on fast-paced fantasy action.",
    popularity: 20
  },
  {
    id: "tonko",
    name: "Tonko",
    minBudget: "low",
    size: "small",
    genres: ["comedy", "slice of life"],
    themes: ["humor", "daily life", "friendship"],
    ageGroups: ["shonen", "josei"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "slow",
    styleDescription: "Known for comedic slice-of-life anime with relatable characters.",
    popularity: 15
  },
  {
    id: "magic",
    name: "Magic Company",
    minBudget: "low",
    size: "small",
    genres: ["fantasy", "adventure"],
    themes: ["magic", "quest", "discovery"],
    ageGroups: ["shonen", "shojo"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription: "Specializes in fantasy adventure stories with magical elements.",
    popularity: 10
  },
  {
    id: "gaina",
    name: "Gaina Engineering",
    minBudget: "low",
    size: "small",
    genres: ["mecha", "action"],
    themes: ["technology", "war", "machines"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription: "Focuses on mecha anime with mechanical design expertise.",
    popularity: 5
  },
  {
    id: "prism",
    name: "Prism Plus",
    minBudget: "low",
    size: "small",
    genres: ["idol", "music", "comedy"],
    themes: ["performance", "entertainment", "dreams"],
    ageGroups: ["shojo", "josei"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription: "Specializes in music and idol-themed anime.",
    popularity: 3
  },
  {
    id: "hobom",
    name: "Hobom",
    minBudget: "low",
    size: "small",
    genres: ["sports", "drama"],
    themes: ["competition", "growth", "perseverance"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription: "Focuses on sports anime with character development.",
    popularity: 2
  },
  {
    id: "carol",
    name: "Carol",
    minBudget: "low",
    size: "small",
    genres: ["romance", "drama"],
    themes: ["love", "heartbreak", "healing"],
    ageGroups: ["josei"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "slow",
    styleDescription: "Specializes in mature romantic dramas.",
    popularity: 1
  },
  // ... (remaining studios omitted for brevity, each gets a popularity score)
  {
    id: "hobom-2",
    name: "Hobom Animation",
    minBudget: "low",
    size: "small",
    genres: ["sports", "drama"],
    themes: ["competition", "growth", "perseverance"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription: "Sports comedy specialist.",
    popularity: 1
  }
];