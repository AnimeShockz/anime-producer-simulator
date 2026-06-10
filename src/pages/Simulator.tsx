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
import { budgetValue } from "@/data/studios"; // numeric budget map

const MANGA_LIST: Manga[] = [
  {
    id: "manga1",
    title: "Starlight Chronicles",
    popularity: 78,
    salesVolume: 1200000,
    chapters: 45,
    tankobonVolumes: 12,
    status: "finished",
    runningType: null,
    magazine: "Shonen Jump",
  },
  {
    id: "manga2",
    title: "Neon Dreams",
    popularity: 65,
    salesVolume: 850000,
    chapters: 30,
    tankobonVolumes: 8,
    status: "running",
    runningType: "weekly",
    magazine: "Weekly Shonen Magazine",
  },
  {
    id: "manga3",
    title: "Mystic Hearts",
    popularity: 90,
    salesVolume: 1500000,
    chapters: 60,
    tankobonVolumes: 15,
    status: "running",
    runningType: "monthly",
    magazine: "Shojo Beat",
  },
  {
    id: "manga4",
    title: "Cyber Samurai",
    popularity: 55,
    salesVolume: 400000,
    chapters: 20,
    tankobonVolumes: 5,
    status: "cancelled",
    runningType: null,
    magazine: "Weekly Young Jump",
  },
  {
    id: "manga5",
    title: "Eternal Dawn",
    popularity: 82,
    salesVolume: 1100000,
    chapters: 38,
    tankobonVolumes: 10,
    status: "finished",
    runningType: null,
    magazine: "Monthly Shonen Magazine",
  },
];

const STUDIOS: Studio[] = [
  {
    id: "ufotable",
    name: "Ufotable",
    minBudget: "high",
    style: "High-budget, cinematic, action-focused",
    genres: ["Action", "Fantasy", "Adventure"],
    ageGroups: ["Shonen", "Seinen"],
    complexity: "high",
    pacing: "fast",
  },
  {
    id: "mappa",
    name: "Mappa",
    minBudget: "medium",
    style: "Dynamic, gritty, experimental",
    genres: ["Action", "Drama", "Horror"],
    ageGroups: ["Shonen", "Seinen", "Josei"],
    complexity: "medium",
    pacing: "medium",
  },
  {
    id: "a1-pictures",
    name: "A-1 Pictures",
    minBudget: "average",
    style: "Polished, character-driven, versatile",
    genres: ["Romance", "Comedy", "Slice of Life", "Action"],
    ageGroups: ["Shonen", "Seinen", "Josei", "Kids"],
    complexity: "medium",
    pacing: "medium",
  },
  {
    id: "kyoto Animation",
    name: "Kyoto Animation",
    minBudget: "average",
    style: "Emotive, slice-of-life, vibrant",
    genres: ["Romance", "Drama", "Slice of Life"],
    ageGroups: ["Shonen", "Seinen", "Josei"],
    complexity: "medium",
    pacing: "slow",
  },
  {
    id: "bones",
    name: "Bones",
    minBudget: "low",
    style: "Classic shonen, high-energy",
    genres: ["Action", "Adventure", "Fantasy"],
    ageGroups: ["Shonen", "Seinen"],
    complexity: "high",
    pacing: "fast",
  },
  {
    id: "pierrot",
    name: "Pierrot",
    minBudget: "low",
    style: "Long-running, comedic",
    genres: ["Comedy", "Action"],
    ageGroups: ["Shonen", "Seinen"],
    complexity: "low",
    pacing: "medium",
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

  // Convert budget strings to numeric values for a proper comparison
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
    toast.success(
      `Produced ${selectedManga?.title} with ${selectedStudio} on ${selectedBudget} budget (Lang: ${language}, Vol: ${volume}%)`,
    );
    navigate("/simulator/result");
  };

  if (!selectedManga || !selectedStudio || !selectedBudget) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Anime Producer Simulator
        </h1>
        <div className="w-full max-w-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Manga
              </h2>
              {MANGA_LIST.map((manga) => (
                <MangaCard
                  key={manga.id}
                  manga={manga}
                  onClick={() => setSelectedManga(manga)}
                />
              ))}
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Studio
              </h2>
              {STUDIOS.map((studio) => (
                <StudioCard
                  key={studio.id}
                  studio={studio}
                  onClick={() => setSelectedStudio(studio.id)}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Select Budget
            </h2>
            <BudgetSelector
              value={selectedBudget}
              onChange={setSelectedBudget}
            />
          </div>

          {/* Language dropdown */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Language
            </h2>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "English",
                  "Japanese",
                  "Korean",
                  "Chinese",
                  "Spanish",
                  "French",
                  "German",
                  "Italian",
                  "Portuguese",
                  "Russian",
                ].map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Volume slider */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Volume
            </h2>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
              className="w-full"
            />
            <p className="mt-2 text-sm text-gray-600">{volume}%</p>
          </div>
        </div>

        <ProduceButton isEligible={!!isEligible} onProduce={handleProduce} />

        {isEligible === false && (
          <p className="text-red-600 text-sm mt-2">
            Selected studio requires at least{" "}
            {selectedStudio
              ? STUDIOS.find((s) => s.id === selectedStudio)?.minBudget
              : "a valid studio"}{" "}
            budget.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Producing {selectedManga?.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800">
              Manga Details
            </h2>
            <MangaCard manga={selectedManga} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800">
              Studio Details
            </h2>
            <StudioCard studio={STUDIOS.find((s) => s.id === selectedStudio)!} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800">
              Production Settings
            </h2>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-600">
                Budget: <span className="font-medium">{selectedBudget}</span>
              </p>
              <p className="text-sm text-gray-600">
                Studio:{" "}
                <span className="font-medium">
                  {STUDIOS.find((s) => s.id === selectedStudio)?.name}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Language: <span className="font-medium">{language}</span>
              </p>
              <p className="text-sm text-gray-600">
                Volume: <span className="font-medium">{volume}%</span>
              </p>
            </div>
          </div>

          <ProduceButton isEligible={!!isEligible} onProduce={handleProduce} />
        </div>
      </div>
    </div>
  );
}