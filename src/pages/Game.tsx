"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ShowRoster from "@/components/ShowRoster";
import StudioRoster from "@/components/StudioRoster";
import BudgetSelector from "@/components/BudgetSelector";
import StudioSelector from "@/components/StudioSelector";
import ProduceButton from "@/components/ProduceButton";
import { Button } from "@/components/ui/button";
import { mangaList, Manga } from "@/data/manga";
import { studios, budgetValue, Studio } from "@/data/studios";
import { showSuccess } from "@/utils/toast";

const rosterTabs = [
  { value: "yet-to-adapt", label: "Yet to be Adapted" },
  { value: "adapted-by-you", label: "Adapted by You" },
  { value: "all-adapted", label: "All Adapted Manga" },
] as const;

type RosterTab = (typeof rosterTabs)[number]["value"];

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<RosterTab>("yet-to-adapt");
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [userAdaptedManga, setUserAdaptedManga] = useState<string[]>([]);

  const adaptedMangaIds = userAdaptedManga;

  const yetToBeAdapted = useMemo(
    () => mangaList.filter((manga) => !adaptedMangaIds.includes(manga.id)),
    [adaptedMangaIds],
  );

  const adaptedByUser = useMemo(
    () => mangaList.filter((manga) => adaptedMangaIds.includes(manga.id)),
    [adaptedMangaIds],
  );

  const allAdapted = adaptedByUser;

  const isEligible = Boolean(
    selectedManga &&
      selectedStudio &&
      selectedBudget &&
      budgetValue[selectedBudget as keyof typeof budgetValue] >=
        budgetValue[selectedStudio.minBudget as keyof typeof budgetValue],
  );

  const getRosterForTab = (tab: RosterTab) => {
    if (tab === "adapted-by-you") return adaptedByUser;
    if (tab === "all-adapted") return allAdapted;
    return yetToBeAdapted;
  };

  const handleProduce = () => {
    if (!selectedManga || !selectedStudio || !selectedBudget) return;

    setUserAdaptedManga((previous) => [...previous, selectedManga!.id]);

    showSuccess(
      `Produced ${selectedManga.title} with ${selectedStudio.name} on a ${selectedBudget} budget`,
    );
    toast({
      title: "Production started",
      description: `${selectedManga.title} is now in production!`,
    });
    navigate("/simulator/result");
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div className="border-b px-4">
          <div
            className="flex items-center gap-2 overflow-x-auto py-3"
            role="tablist"
            aria-label="Manga adaptation roster"
          >
            {rosterTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.value}
                aria-controls={`roster-panel-${tab.value}`}
                id={`roster-tab-${tab.value}`}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 gap-4 p-4">
          <div className="min-w-0 flex-1">
            <div
              role="tabpanel"
              id={`roster-panel-${activeTab}`}
              aria-labelledby={`roster-tab-${activeTab}`}
              className="h-full"
            >
              <ShowRoster
                mangaList={getRosterForTab(activeTab)}
                selectedManga={selectedManga}
                season={1}
                onSelectManga={setSelectedManga}
              />
            </div>
          </div>

          <div className="flex w-80 flex-col gap-4">
            <StudioRoster
              studios={studios}
              selectedStudio={selectedStudio}
              onSelectStudio={setSelectedStudio}
            />
            <div className="space-y-4">
              <BudgetSelector
                value={selectedBudget}
                onChange={setSelectedBudget}
              />
              <StudioSelector
                value={selectedStudio?.id ?? ""}
                onChange={(id) =>
                  setSelectedStudio(studios.find((studio) => studio.id === id) ?? null)
                }
                studios={studios.map((studio) => ({
                  id: studio.id,
                  name: studio.name,
                }))}
              />
              <ProduceButton
                isEligible={isEligible}
                onProduce={handleProduce}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;