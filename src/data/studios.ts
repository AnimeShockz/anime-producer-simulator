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
  // Popularity score for sorting (higher = more popular)
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
  // Large, globally recognised studios
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
      "Stunning visual effects, fluid action, and detailed battle choreography.",
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
      "Versatile studio with strong storytelling and experimental animation.",
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
      "Exquisite character animation and heartfelt, delicate storytelling.",
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
    popularity: 92,
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
    popularity: 88,
  },

  // Mid‑size studios with strong reputations
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
      "Energetic, stylized animation with bold colors and dynamic motion.",
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
    popularity: 82,
  },
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
      "Vibrant character designs and energetic fight choreography.",
    popularity: 78,
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
    popularity: 75,
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
    popularity: 70,
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
    popularity: 68,
  },

  // Boutique / specialty studios (all real)
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
    popularity: 65,
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
    popularity: 62,
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
    popularity: 58,
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
    popularity: 55,
  },

  // Additional well‑known studios
  {
    id: "j.c.staff",
    name: "J.C. Staff",
    minBudget: "average",
    size: "large",
    genres: ["action", "fantasy", "slice of life"],
    themes: ["friendship", "growth", "adventure"],
    ageGroups: ["shonen", "shojo", "seinen"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Versatile studio known for adapting a wide range of source material.",
    popularity: 80,
  },
  {
    id: "whitefox",
    name: "White Fox",
    minBudget: "average",
    size: "medium",
    genres: ["fantasy", "adventure", "action"],
    themes: ["heroism", "friendship", "magic"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "fast",
    styleDescription:
      "Strong visual style, especially in fantasy world‑building.",
    popularity: 73,
  },
  {
    id: "studio-8bit",
    name: "Studio 8bit",
    minBudget: "low",
    size: "small",
    genres: ["action", "comedy", "fantasy"],
    themes: ["friendship", "adventure", "humor"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription:
      "Known for bright, energetic animation and comedic timing.",
    popularity: 60,
  },
  {
    id: "c2c",
    name: "C2C",
    minBudget: "low",
    size: "small",
    genres: ["fantasy", "adventure"],
    themes: ["magic", "quest", "friendship"],
    ageGroups: ["shonen", "shojo"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription:
      "Produces concise, well‑paced fantasy series.",
    popularity: 57,
  },
  {
    id: "studio-gallop",
    name: "Studio Gallop",
    minBudget: "average",
    size: "large",
    genres: ["sports", "action", "comedy"],
    themes: ["competition", "teamwork", "growth"],
    ageGroups: ["shonen"],
    lengthPreference: "long",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Long‑standing studio famous for sports and shonen titles.",
    popularity: 68,
  },
  {
    id: "tezuka-productions",
    name: "Tezuka Productions",
    minBudget: "average",
    size: "medium",
    genres: ["fantasy", "drama", "adventure"],
    themes: ["humanity", "ethics", "friendship"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "slow",
    styleDescription:
      "Legacy studio preserving Osamu Tezuka’s storytelling spirit.",
    popularity: 65,
  },
  {
    id: "synergysp",
    name: "SynergySP",
    minBudget: "low",
    size: "small",
    genres: ["comedy", "slice of life"],
    themes: ["school", "friendship", "humor"],
    ageGroups: ["shojo", "shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription:
      "Focuses on light‑hearted, character‑driven series.",
    popularity: 52,
  },
  {
    id: "pyramid",
    name: "Pyramid",
    minBudget: "low",
    size: "small",
    genres: ["fantasy", "adventure"],
    themes: ["magic", "quest", "heroism"],
    ageGroups: ["shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription:
      "Produces compact fantasy adventures with vibrant animation.",
    popularity: 48,
  },
  {
    id: "grouper",
    name: "Grouper Production",
    minBudget: "low",
    size: "small",
    genres: ["comedy", "slice of life"],
    themes: ["everyday", "friendship", "humor"],
    ageGroups: ["shojo", "shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription:
      "Specialises in short, feel‑good series.",
    popularity: 45,
  },
  {
    id: "brainbox",
    name: "Brain’s Base",
    minBudget: "average",
    size: "medium",
    genres: ["action", "fantasy", "drama"],
    themes: ["heroism", "friendship", "conflict"],
    ageGroups: ["shonen", "seinen"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "fast",
    styleDescription:
      "Known for dynamic fight scenes and solid storytelling.",
    popularity: 70,
  },
  {
    id: "shirogumi",
    name: "Shirogumi",
    minBudget: "low",
    size: "medium",
    genres: ["fantasy", "adventure"],
    themes: ["magic", "exploration", "friendship"],
    ageGroups: ["shonen", "shojo"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "fast",
    styleDescription:
      "3‑D and 2‑D hybrid works, often with vibrant color palettes.",
    popularity: 55,
  },
  {
    id: "passione",
    name: "Passione",
    minBudget: "low",
    size: "small",
    genres: ["drama", "slice of life", "historical"],
    themes: ["romance", "culture", "tradition"],
    ageGroups: ["josei", "seinen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "slow",
    styleDescription:
      "Elegant, period‑piece animation with a focus on atmosphere.",
    popularity: 50,
  },
  {
    id: "lidenfilms",
    name: "Liden Films",
    minBudget: "average",
    size: "medium",
    genres: ["action", "fantasy", "comedy"],
    themes: ["adventure", "friendship", "magic"],
    ageGroups: ["shonen", "shojo"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "fast",
    styleDescription:
      "Energetic animation, often adapting light‑hearted source material.",
    popularity: 48,
  },
  {
    id: "doga-kobo",
    name: "Doga Kobo",
    minBudget: "average",
    size: "medium",
    genres: ["slice of life", "comedy", "romance"],
    themes: ["school", "friendship", "everyday life"],
    ageGroups: ["shojo", "shonen"],
    lengthPreference: "short",
    complexity: "low",
    pacing: "medium",
    styleDescription:
      "Bright, colorful animation with a focus on character interactions.",
    popularity: 45,
  },
];