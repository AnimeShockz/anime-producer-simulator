"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Manga } from "@/data/manga";
import { BudgetLevel } from "@/data/studios";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

const STORAGE_KEY = "anime-producer-save";

type Franchise = {
  manga: Manga;
  adapted: boolean;
  review: string | null;
  episodeCount: number;
};

type GameState = {
  franchises: Franchise[];
  currentFranchiseId: string | null;
  budget: BudgetLevel;
  episodeCount: number;
  rightsPurchased: boolean;
};

const initialState: GameState = {
  franchises: [],
  currentFranchiseId: null,
  budget: "average",
  episodeCount: 12,
  rightsPurchased: false,
};

const tabOptions = ["toAdapt", "adapted", "allAdapted"] as const;
type TabOption = (typeof tabOptions)[number];

const tabLabels: Record<TabOption, string> = {
  toAdapt: "To Adapt",
  adapted: "Adapted",
  allAdapted: "All Adapted",
};

const HomepageTabs = ({
  tab,
  setTab,
}: {
  tab: TabOption;
  setTab: (tab: TabOption) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-2">
    {tabOptions.map((tabId) => (
      <Button
        key={tabId}
        variant={tabId === tab ? "default" : "outline"}
        onClick={() => setTab(tabId)}
      >
        {tabLabels[tabId]}
      </Button>
    ))}
  </div>
);

const generateReview = (
  manga: Manga,
  franchise: Pick<Franchise, "episodeCount">,
) => {
  const score = Math.min(
    10,
    Math.max(0, Math.round(manga.popularity / 10 + franchise.episodeCount / 24)),
  );

  const scoreMap: Record<number, string> = {
    0: "Abysmal",
    1: "Terrible",
    2: "Poor",
    3: "Below Average",
    4: "Average",
    5: "Decent",
    6: "Good",
    7: "Very Good",
    8: "Great",
    9: "Excellent",
    10: "Masterpiece",
  };

  const rating = scoreMap[score];
  const salesUnits = manga.salesVolumes.toLocaleString();
  const streamingRevenue = (manga.popularity * 10000).toLocaleString();

  return [
    `AI Critic Review: ${rating} (${score}/10)`,
    "",
    `Source Material: ${manga.title} (${manga.status}, ${manga.chapters} chapters, ${manga.tankobonVolumes} tankobon volumes)`,
    `Episode Count: ${franchise.episodeCount}`,
    `Popularity: ${manga.popularity}%`,
    `Physical Media Sales: ${salesUnits} units`,
    `Streaming Revenue: $${streamingRevenue}`,
    `Verdict: ${
      score >= 9
        ? "A breakout hit that redefined the franchise."
        : score >= 7
          ? "A strong adaptation with clear audience appeal."
          : "A solid adaptation that captured part of the source material."
    }`,
  ].join("\n");
};

const Game = () => {
  const [state, setState] = useLocalStorage<GameState>(
    STORAGE_KEY,
    initialState,
  );
  const [selectedTab, setSelectedTab] = useState<TabOption>("toAdapt");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [episodeCount, setEpisodeCount] = useState(initialState.episodeCount);

  const navigate = useNavigate();
  const { toast } = useToast();

  const currentFranchise = useMemo(() => {
    if (!state.currentFranchiseId) return null;
    return state.franchises.find(
      (franchise) => franchise.manga.id === state.currentFranchiseId,
    );
  }, [state.currentFranchiseId, state.franchises]);

  const tabs = useMemo(() => {
    return [
      {
        id: "toAdapt",
        label: "To Adapt",
        franchises: state.franchises.filter((franchise) => !franchise.adapted),
      },
      {
        id: "adapted",
        label: "Adapted",
        franchises: state.franchises.filter((franchise) => franchise.adapted),
      },
      {
        id: "allAdapted",
        label: "All Adapted",
        franchises: state.franchises,
      },
    ];
  }, [state.franchises]);

  const currentTab = tabs.find((tab) => tab.id === selectedTab);

  const displayFranchises = currentTab?.franchises.filter((franchise) =>
    searchTerm
      ? franchise.manga.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true,
  );

  const handleSelectManga = (manga: Manga) => {
    const franchise = state.franchises.find(
      (item) => item.manga.id === manga.id,
    );

    setState((current) => ({
      ...current,
      currentFranchiseId: manga.id,
    }));

    setEpisodeCount(franchise?.episodeCount ?? initialState.episodeCount);
    setIsDialogOpen(true);
  };

  const handleAdaptManga = () => {
    if (!currentFranchise) return;

    const nextEpisodeCount = episodeCount;

    setState((current) => ({
      ...current,
      episodeCount: nextEpisodeCount,
      franchises: current.franchises.map((franchise) =>
        franchise.manga.id === currentFranchise.manga.id
          ? {
              ...franchise,
              adapted: true,
              episodeCount: nextEpisodeCount,
              review: generateReview(franchise.manga, {
                episodeCount: nextEpisodeCount,
              }),
            }
          : franchise,
      ),
    }));

    toast.success(`Adapted ${currentFranchise.manga.title}`);
    setIsDialogOpen(false);
  };

  const handleSaveGame = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    toast.success("Game saved!");
  };

  const handleLoadGame = () => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      toast.error("No saved game found.");
      return;
    }

    setState(JSON.parse(saved));
    toast.success("Game loaded!");
  };

  const handleSettingsToggle = (checked: boolean) => {
    console.log("Settings toggle:", checked);
  };

  const handleExitToMainMenu = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">
              Anime Producer Simulator
            </h1>
            <p className="text-sm text-slate-600">
              Manage your adaptation roster and track critic reviews.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSaveGame}>Save</Button>
            <Button variant="outline" onClick={handleLoadGame}>
              Load
            </Button>
            <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
              Settings
            </Button>
            <Button variant="destructive" onClick={handleExitToMainMenu}>
              Main Menu
            </Button>
          </div>
        </div>

        <HomepageTabs tab={selectedTab} setTab={setSelectedTab} />

        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Search manga..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {displayFranchises && displayFranchises.length > 0 ? (
            displayFranchises.map((franchise) => {
              const { manga } = franchise;
              const isAdapted = franchise.adapted;

              return (
                <Card
                  key={manga.id}
                  className={cn(
                    "cursor-pointer rounded-lg border p-4 shadow-sm transition hover:shadow-md",
                    isAdapted
                      ? "border-green-200 bg-green-50"
                      : "border-slate-200 bg-white",
                  )}
                  onClick={() => handleSelectManga(manga)}
                >
                  <CardContent className="space-y-2 p-0">
                    <h3 className="text-lg font-semibold text-slate-950">
                      {manga.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Popularity: {manga.popularity}%
                    </p>
                    <p className="text-sm text-slate-600">
                      Chapters: {manga.chapters}
                    </p>
                    <p className="text-sm text-slate-600">
                      Status: {isAdapted ? "Adapted" : "To Adapt"}
                    </p>

                    {franchise.review && (
                      <p className="rounded bg-white px-2 py-1 text-xs text-green-800">
                        {franchise.review.split("\n")[0]}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="md:col-span-2">
              <CardContent className="py-8 text-center text-sm text-slate-600">
                No manga found for this tab.
              </CardContent>
            </Card>
          )}
        </div>

        {currentFranchise && isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{currentFranchise.manga.title}</DialogTitle>
                <DialogDescription>
                  Review production details before adapting.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2 text-sm">
                  <div>
                    <span className="font-medium">Budget:</span>{" "}
                    {state.budget}
                  </div>
                  <div>
                    <span className="font-medium">Rights Purchased:</span>{" "}
                    {state.rightsPurchased ? "Yes" : "No"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="episode-count">Episode Count</Label>
                  <Input
                    id="episode-count"
                    type="number"
                    min={1}
                    value={episodeCount}
                    onChange={(event) =>
                      setEpisodeCount(Number(event.target.value) || 1)
                    }
                  />
                </div>

                {currentFranchise.review ? (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">AI Critic Review</h3>
                    <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
                      {currentFranchise.review}
                    </pre>
                  </div>
                ) : (
                  <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                    No review yet. Adapt this manga to generate one.
                  </p>
                )}

                <Button
                  className="w-full"
                  disabled={currentFranchise.adapted}
                  onClick={handleAdaptManga}
                >
                  {currentFranchise.adapted ? "Already Adapted" : "Adapt Now"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Game Settings</DialogTitle>
              <DialogDescription>
                Toggle basic game preferences.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Label className="flex items-center justify-between gap-4">
                <span className="text-sm">Fullscreen</span>
                <Switch
                  checked={false}
                  onCheckedChange={handleSettingsToggle}
                />
              </Label>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Game;