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

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

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
    <Tabs defaultValue="manga" className="w-full">
      {/* Tab headers */}
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="manga">Manga</TabsTrigger>
        <TabsTrigger value="studio">Studio</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      {/* Manga roster tab */}
      <TabsContent value="manga">
        <ShowRoster
          mangaList={mangaList}
          selectedManga={selectedManga}
          season={1}
          onSelectManga={setSelectedManga}
        />
      </TabsContent>

      {/* Studio roster tab */}
      <TabsContent value="studio">
        <StudioRoster
          studios={studios}
          selectedStudio={selectedStudio}
          onSelectStudio={setSelectedStudio}
        />
      </TabsContent>

      {/* Settings tab – budget, studio selector, produce button */}
      <TabsContent value="settings" className="space-y-4">
        <BudgetSelector value={selectedBudget} onChange={setSelectedBudget} />
        <StudioSelector
          value={selectedStudio?.id ?? ""}
          onChange={(id) =>
            setSelectedStudio(studios.find((s) => s.id === id) ?? null)
          }
          studios={studios.map((s) => ({ id: s.id, name: s.name }))}
        />
        <ProduceButton isEligible={!!isEligible} onProduce={handleProduce} />
      </TabsContent>
    </Tabs>
  );
};

export default Game;