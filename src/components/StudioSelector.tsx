"use client";

import React from "react";
import { Label, Select } from "@/components/ui/select";

const StudioSelectorProps = {
  studios: any[]; // will be typed later
};

interface Props {
  value: string;
  onChange: (value: string) => void;
  studios: any[];
}

const StudioSelector = ({ value, onChange, studios }: Props) => {
  return (
    <div className="flex flex-col">
      <Label className="mb-1 font-medium">Studio</Label>
      <Select
        onChange={onChange}
        value={value}
        className="text-base"
        className="bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
      >
        {studios.map((studio) => (
          <Select.Item key={studio.id} value={studio.id}>
            {studio.name}
          </Select.Item>
        ))}
      </Select>
    </div>
  );
};

export default StudioSelector;
＜/dyad-write>

<dyad-write path="src/components/ProduceButton.tsx" description="Creating a ProduceButton component">
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface Props {
  isEligible: boolean;
  onProduce: () => void;
}

const ProduceButton = ({ isEligible, onProduce }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleProduce = () => {
    onProduce();
  };

  return (
    <Button
      onClick={handleProduce}
      disabled={!isEligible}
      className="w-full justify-between"
      variant={isEligible ? "default" : "secondary"}
    >
      {isEligible ? "Produce Show" : "Ineligible (Budget Too Low)"}
    </Button>
  );
};

export default ProduceButton;
＜/dyad-write>

Now page Simulator.tsx.

<dyad-write path="src/pages/Simulator.tsx" description="Creating the Simulator page">
"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import MangaCard from "@/components/MangaCard";
import StudioCard from "@/components/StudioCard";
import BudgetSelector from "@/components/BudgetSelector";
import StudioSelector from "@/components/StudioSelector";
import ProduceButton from "@/components/ProduceButton";
import { cn } from "@/lib/utils";

interface Manga {
  id: string;
  title: string;
  popularity: number;
  salesVolume: number;
  chapters: number;
  tankobonVolumes: number;
  status: string;
  runningType: string | null;
  magazine: string;
}

interface Studio {
  id: string;
  name: string;
  minBudget: string;
  style: string;
  genres: string[];
  ageGroups: string[];
  complexity: string;
  pacing: string;
}

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

  const [budgetOptions] = useState([
    "shoestring",
    "low",
    "average",
    "medium",
    "high",
    "prestige",
  ]);

  const { toast } = useToast();
  const router = useRouter();

  const isEligible = selectedStudio && selectedBudget && selectedManga && selectedBudget >= (STUDIOS.find(s => s.id === selectedStudio)?.minBudget as string);

  const handleProduce = () => {
    // Simulate production
    toast.success(`Produced ${selectedManga?.title} with ${selectedStudio} on ${selectedBudget} budget`);
    router.push("/simulator/result");
  };

  if (!selectedManga || !selectedStudio || !selectedBudget) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Anime Producer Simulator</h1>
        <div className="w-full max-w-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Select Manga</h2>
              {MANGA_LIST.map((manga) => (
                <MangaCard
                  key={manga.id}
                  manga={manga}
                  onClick={() => setSelectedManga(manga)}
                />
              ))}
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Select Studio</h2>
              {STUDIOS.map((studio) => (
                <StudioCard studio={studio} onClick={() => setSelectedStudio(studio.id)} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">Select Budget</h2>
            <BudgetSelector
              value={selectedBudget}
              onChange={setSelectedBudget}
            />
          </div>
        </div>

        <ProduceButton
          isEligible={isEligible}
          onProduce={handleProduce}
        />

        {isEligible === false && (
          <p className="text-red-600 text-sm mt-2">
            Selected studio requires at least {selectedStudio ? STUDIOS.find(s => s.id === selectedStudio)?.minBudget : "a valid studio"} budget.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Producing {selectedManga.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800">Manga Details</h2>
            <MangaCard manga={selectedManga} />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800">Studio Details</h2>
            <StudioCard studio={STUDIOS.find(s => s.id === selectedStudio)!} />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-gray-800">Production Settings</h2>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 mb-2">Budget: <span className="font-medium">{selectedBudget}</span></p>
            <p className="text-sm text-gray-600 mb-2">Studio: <span className="font-medium">{STUDIOS.find(s => s.id === selectedStudio)?.name}</span></p>
          </div>
        </div>

        <ProduceButton isEligible={isEligible} onProduce={handleProduce} />
      </div>
    </div>
  );
}