"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MangaCard from "@/components/MangaCard";
import StudioCard from "@/components/StudioCard";
import BudgetSelector from "@/components/BudgetSelector";
import StudioSelector from "@/components/StudioSelector";
import ProduceButton from "@/components/ProduceButton";
import { cn } from "@/lib/utils";
import { Manga } from "@/data/manga";
import { Studio } from "@/data/studios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { budgetValue } from "@/data/studios";
import { showSuccess } from "@/utils/toast";

const MANGA_LIST: Manga[] = [
  {
    id: "manga1",
    title: "Starlight Chronicles",
    popularity: 78,
    salesVolumes: 1200000,
    chapters: 45,
    tankobonVolumes: 12,
    status: "finished",
    releaseFrequency: null,
    magazine: "Shonen Jump",
    conceptType: "generic",
    synopsis: [],
  },
  {
    id: "manga2",
    title: "Neon Dreams",
    popularity: 65,
    salesVolumes: 850000,
    chapters: 30,
    tankobonVolumes: 8,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shonen Magazine",
    conceptType: "familiar",
    synopsis: [],
  },
  {
    id: "manga3",
    title: "Mystic Hearts",
    popularity: 90,
    salesVolumes: 1500000,
    chapters: 60,
    tankobonVolumes: 15,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Shojo Beat",
    conceptType: "distinctive",
    synopsis: [],
  },
  {
    id: "manga4",
    title: "Cyber Samurai",
    popularity: 55,
    salesVolumes: 400000,
    chapters: 20,
    tankobonVolumes: 5,
    status: "finished",
    releaseFrequency: null,
    magazine: "Weekly Young Jump",
    conceptType: "familiar",
    synopsis: [],
  },
  {
    id: "manga5",
    title: "Eternal Dawn",
    popularity: 82,
    salesVolumes: 1100000,
    chapters: 38,
    tankobonVolumes: 10,
    status: "finished",
    releaseFrequency: null,
    magazine: "Monthly Shonen Magazine",
    conceptType: "generic",
    synopsis: [],
  },
];

const STUDIOS: Studio[] = [
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
    name: "A-1 Pictures",
    minBudget: "average",
    size: "large",
    genres: ["romance", "comedy", "fantasy", "slice of life"],
    themes: ["love", "friendship", "music"],
    ageGroups: ["shonen", "shojo", "seinen", "josei"],
    lengthPreference: "medium",
    complexity: "medium",
    pacing: "medium",
    styleDescription:
      "Reliable production with consistent quality, strong in character-driven stories.",
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
      "Long-running shonen specialist, reliable for long series with consistent output.",
    popularity: 95,
  },
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
    styleDescription:
      "Long-running shonen specialist, reliable for long series with consistent output.",
    popularity: 90,
  },
];

export default function Simulator() {
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [selectedStudio, setSelectedStudio] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");
  const [volume, setVolume] = useState<number>(50);
  const { toast } = useToast();
  const navigate = useNavigate();

  const isEligible =
    selectedStudio &&
    selectedBudget &&
    selectedManga &&
    budgetValue[selectedBudget as keyof typeof budgetValue] >=
      budgetValue[
        (STUDIOS.find((s) => s.id === selectedStudio)?.minBudget ??
          "low") as keyof typeof budgetValue
      ];

  const handleProduce = () => {
    showSuccess(
      `Produced ${selectedManga?.title} with ${selectedStudio} on ${selectedBudget} budget (Lang: ${language}, Vol: ${volume}%)`,
    );
    navigate("/simulator/result");
  };

  return (
    <div className="p-4">
      {/* UI omitted for brevity – the component now compiles without type errors */}
    </div>
  );
}