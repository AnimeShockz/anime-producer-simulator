"use client";

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ShowRoster from "@/components/ShowRoster";
import StudioRoster from "@/components/StudioRoster";
import BudgetSelector from "@/components/BudgetSelector";
import StudioSelector from "@/components/StudioSelector";
import ProduceButton from "@/components/ProduceButton";
import { mangaList, Manga } from "@/data/manga";
import { studios, budgetValue, Studio } from "@/data/studios";
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
  const [selectedStudio, setSelectedStudio] = useState<anga | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");
  const [volume, setVolume] = useState<number>(50);
  const [userAdaptedManga, setUserAdaptedManga] = useState<string[]>([]);

  // Track which manga have been adapted (in a real app, this would come from game state)
  const adaptedMangaIds = userAdaptedManga;

  // Categorize manga
  const yetToBeAdapted = useMemo(() => 
    mangaList.filter(m => !adaptedMangaIds.includes(m.id)),
    [adaptedMangaIds]
  );
  
  const adaptedByUser = useMemo(() => 
    mangaList.filter(m => adaptedMangaIds.includes(m.id)),
    [adaptedMangaIds]
  );
  
  // For demo, "all adapted" includes user-adapted ones
  const allAdapted = adaptedByUser;

  const isEligible =
    selectedManga &&
    selectedStudio &&
    selectedBudget &&
    budgetValue[selectedBudget as keyof typeof budgetValue] >=
      budgetValue[selectedStudio.minBudget as keyof typeof budgetValue];

  const handleProduce = () => {
    if (!selectedManga || !selectedStudio || !selectedBudget) return;

    // Track this manga as adapted by user
    setUserAdaptedManga(prev => [...prev, selectedManga.id]);

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
    <div className="flex flex-col h-screen">
      {/* Top-level tabs for Manga categories */}
      <Tabs defaultValue="yet-to-adapt" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="yet-to-adapt">Yet to be Adapted</TabsTrigger>
          <TabsTrigger value="adapted-by-you">Adapted by You</TabsTrigger>
          <TabsTrigger value="all-adapted">All Adapted Manga</TabsTrigger>
        </TabsList>

        {/* Manga content - will be in left column */}
        <div className="flex flex-1 gap-4 p-4">
          {/* Left: Manga tabs content */}
          <div className="flex-1">
            <TabsContent value="yet-to-adapt" className="h-full">
              <ShowRoster
                mangaList={yetToBeAdapted}
                selectedManga={selectedManga}
                season={1}
                onSelectManga={setSelectedManga}
              />
            </TabsContent>

            <TabsContent value="adapted-by-you" className="h-full">
              <ShowRoster
                mangaList={adaptedByUser}
                selectedManga={selectedManga}
                season={1}
                onSelectManga={setSelectedManga}
              />
            </TabsContent>

            <TabsContent value="all-adapted" className="h-full">
              <ShowRoster
                mangaList={allAdapted}
                selectedManga={selectedManga}
                season={1}
                onSelectManga={setSelectedManga}
              />
            </TabsContent>
          </div>

          {/* Right: Studio and Settings */}
          <div className="w-80 flex flex-col gap-4">
            <StudioRoster
              studios={studios}
              selectedStudio={selectedStudio}
              onSelectStudio={setSelectedStudio}
            />
            
            <div className="space-y-4">
              <BudgetSelector value={selectedBudget} onChange={setSelectedBudget} />
              <StudioSelector
                value={selectedStudio?.id ?? ""}
                onChange={(id) =>
                  setSelectedStudio(studios.find((s) => s.id === id) ?? null)
                }
                studios={studios.map((s) => ({ id: s.id, name: s.name }))}
              />
              <ProduceButton isEligible={!!isEligible} onProduce={handleProduce} />
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Game;