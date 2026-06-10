export type Manga = {
  id: string;
  title: string;
  popularity: number;
  salesVolumes: number;
  chapters: number;
  tankobonVolumes: number;
  status: "finished" | "running";
  releaseFrequency: "weekly" | "monthly" | null;
  magazine: string;
};

export const mangaList: Manga[] = [
  {
    id: "manga-1",
    title: "Starlight Crusade",
    popularity: 78,
    salesVolumes: 12500000,
    chapters: 150,
    tankobonVolumes: 18,
    status: "finished",
    releaseFrequency: null,
    magazine: "Weekly Shōnen Jump",
  },
  {
    id: "manga-2",
    title: "Neon Samurai",
    popularity: 65,
    salesVolumes: 8200000,
    chapters: 95,
    tankobonVolumes: 12,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Jump",
  },
  {
    id: "manga-3",
    title: "Eclipse Café",
    popularity: 54,
    salesVolumes: 5000000,
    chapters: 60,
    tankobonVolumes: 8,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Afternoon",
  },
  {
    id: "manga-4",
    title: "Mecha Princess",
    popularity: 82,
    salesVolumes: 15300000,
    chapters: 200,
    tankobonVolumes: 22,
    status: "finished",
    releaseFrequency: null,
    magazine: "Weekly Shōnen Jump",
  },
  {
    id: "manga-5",
    title: "Whispering Winds",
    popularity: 48,
    salesVolumes: 3700000,
    chapters: 45,
    tankobonVolumes: 6,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Shōjo Comic",
  },
  {
    id: "manga-6",
    title: "Cyber Ninja Chronicles",
    popularity: 70,
    salesVolumes: 9800000,
    chapters: 110,
    tankobonVolumes: 14,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Jump",
  },
  {
    id: "manga-7",
    title: "Gourmet Detective",
    popularity: 55,
    salesVolumes: 4200000,
    chapters: 70,
    tankobonVolumes: 9,
    status: "finished",
    releaseFrequency: null,
    magazine: "Monthly Shōnen Magazine",
  },
  {
    id: "manga-8",
    title: "Dragon Kingdom",
    popularity: 90,
    salesVolumes: 20000000,
    chapters: 250,
    tankobonVolumes: 30,
    status: "finished",
    releaseFrequency: null,
    magazine: "Weekly Shōnen Jump",
  },
];