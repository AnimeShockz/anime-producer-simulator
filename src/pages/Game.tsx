"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ShowRoster from "@/components/ShowRoster";
import StudioRoster from "@/components/StudioRoster";
import BudgetSelector from "@/components/BudgetSelector";
import StudioSelector from "@/components/StudioSelector";
import ProduceButton from "@/components/ProduceButton";
import { mangaList } from "@/data/manga";
import { studios, budgetValue } from "@/data/studios";
import { Manga } from "@/data/manga";
import { Studio } from "@/data/studios";
import { showSuccess } from "@/utils/toast";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");
  const [volume, setVolume] = useState<number>(50);

  const isEligible =
    selectedManga &&
    selectedStudio &&
    selectedBudget &&
    budgetValue[selectedBudget as keyof typeof budgetValue] >=
      budgetValue[selectedStudio.minBudget as keyof typeof budgetValue];

  const handleProduce = () => {
    if (!selectedManga || !selectedStudio || !selectedBudget) return;

    showSuccess(
      `Produced ${selectedManga.title} with ${selectedStudio.name} on a ${selectedBudget} budget (Lang: ${language}, Vol: ${volume}%)`,
    );
    toast({
      title: "Production started",
      description: `${selectedManga.title} is now in production!`,
    });
    navigate("/simulator/result");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* Manga roster */}
      <div className="lg:col-span-1">
        <ShowRoster
          mangaList={mangaList}
          selectedManga={selectedManga}
          season={1}
          onSelectManga={setSelectedManga}
        />
      </div>

      {/* Studio roster */}
      <div className="lg:col-span-1">
        <StudioRoster
          studios={studios}
          selectedStudio={selectedStudio}
          onSelectStudio={setSelectedStudio}
        />
      </div>

      {/* Controls & produce */}
      <div className="flex flex-col gap-4 lg:col-span-1">
        <BudgetSelector value={selectedBudget} onChange={setSelectedBudget} />
        <StudioSelector
          value={selectedStudio?.id ?? ""}
          onChange={(id) => setSelectedStudio(studios.find((s) => s.id === id) ?? null)}
          studios={studios.map((s) => ({ id: s.id, name: s.name }))}
        />
        <ProduceButton isEligible={!!isEligible} onProduce={handleProduce} />
      </div>
    </div>
  );
};

export default Game;