"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Manga } from "@/data/manga";
import { Studio } from "@/data/studios";
import { BudgetLevel } from "@/data/studios";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";

const router = useRouter();
const { toast } = useToast();

const STORAGE_KEY = "anime-producer-save";

type Franchise = {
  manga: Manga;
  adapted: boolean;
  review: string | null;
  episodeCount: number;
};

const initialState: {
  franchises: Franchise[];
  currentFranchiseId: string | null;
  budget: BudgetLevel;
  episodeCount: number;
  rightsPurchased: boolean;
} = {
  franchises: [],
  currentFranchiseId: null,
  budget: "average",
  episodeCount: 12,
  rightsPurchased: false,
};

const HomepageTabs = ({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (tab: string) => void;
}) => (
  <div className="flex gap-2">
    {[("toAdapt", "adapted", "allAdapted") as const].map((t) => (
      <Button
        key={t}
        variant={t === tab ? "default" : "outline"}
        onClick={() => setTab(t)}
      >
        {t.charAt(0).toUpperCase() + t.slice(1)}
      </Button>
    ))}
  </div>
);

const Game = () => {
  const [state, setState, removeState] = useLocalStorage(
    STORAGE_KEY,
    initialState
  );
  const [selectedTab, setSelectedTab] = useState("toAdapt");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newManga, setNewManga] = useState<Manga | null>(null);

  const { episodeCount, setEpisodeCount } = useState(12);

  const filteredManga = useMemo(() => {
    if (!searchTerm) return state.franchises.map((f) => f.manga);
    return state.franchises
      .filter((f) => f.manga.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((f) => f.manga);
  }, [searchTerm, state.franchises]);

  const currentFranchise = useMemo(() => {
    if (!state.currentFranchiseId) return null;
    return state.franchises.find((f) => f.manga.id === state.currentFranchiseId);
  }, [state.currentFranchiseId, state.franchises]);

  const handleSelectManga = (manga: Manga) => {
    setState((s) => ({
      ...s,
      currentFranchiseId: manga.id,
    }));
    setNewManga(manga);
  };

  const handleBudgetChange = (value: BudgetLevel) => {
    setState((s) => ({ ...s, budget: value }));
  };

  const handleEpisodeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (!isNaN(count) && count > 0) {
      setEpisodeCount(count);
    }
  };

  const handleAdaptManga = () => {
    if (!currentFranchise) return;
    const updated = state.franchises.map((f) =>
      f.manga.id === currentFranchise.manga.id
        ? { ...f, adapted: true, episodeCount, review: generateReview(f.manga, currentFranchise) }
        : f
    );
    setState((s) => ({ ...s, franchises: updated }));
    toast.success(`Adapted ${currentFranchise.manga.title}`);
  };

  const generateReview = (manga: Manga, franchise: Franchise) => {
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
    const popularityScore = manga.popularity;
    const rating = scoreMap[Math.min(10, Math.max(0, Math.round(popularityScore / 10)))];
    const salesUnits = manga.salesVolumes.toLocaleString();
    const streamingRevenue = (manga.popularity * 10000).toLocaleString();
    return [
      `AI Critic Review: ${rating} (${Math.round(popularityScore)}/10)`,
      "",
      `Source Material: ${manga.title} (${manga.status}, ${manga.chapters} chapters, ${manga.tankobonVolumes} tankobon volumes)`,
      `Popularity: ${manga.popularity}%`,
      `Approval Rating: ${Math.round(popularityScore / 10)}%`,
      `Physical Media Sales: ${salesUnits} units`,
      `Streaming Revenue: $${streamingRevenue}`,
      `Verdict: ${rating === "Masterpiece" ? "A breakout hit that redefined the franchise." : "A solid adaptation that captured the essence of the source."}`,
    ].join("\n");
  };

  const handleSaveGame = () => {
    const saveData = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, saveData);
    toast.success("Game saved!");
  };

  const handleLoadGame = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setState(parsed);
      toast.success("Game loaded!");
    } else {
      toast.error("No saved game found.");
    }
  };

  const handleSettingsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Settings toggle:", e.target.value);
  };

  const handleExitToMainMenu = () => {
    router.push("/");
  };

  const tabs = useMemo(() => {
    return [
      { id: "toAdapt", label: "To Adapt", mangas: state.franchises.filter((f) => !f.adapted) },
      { id: "adapted", label: "Adapted", mangas: state.franchises.filter((f) => f.adapted) },
      { id: "allAdapted", label: "All Adapted", mangas: state.franchises },
    ];
  }, [state.franchises]);

  const currentTab = tabs.find((t) => t.id === selectedTab);
  const displayMangas = currentTab?.mangas.filter((m) =>
    searchTerm ? m.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Menu */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Anime Producer Simulator</h1>
          <div className="flex gap-3">
            <Button onClick={handleSaveGame} className="px-4">
              Save            </Button>
            <Button onClick={handleLoadGame} className="px-4">
              Load
            </Button>
            <Button onClick={handleExitToMainMenu} className="px-4 bg-red-50">
              Main Menu
            </Button>
          </div>
        </div>

        {/* Settings Popup */}
        <Button
          variant="outline"
          onClick={() => setIsSettingsOpen(true)}
          className="rounded-full p-2"
        >
          <Label className="text-sm text-slate-600">⚙️</Label>
        </Button>

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogHeader>
            <DialogTitle>Game Settings</DialogHeader>
          </DialogHeader>
          <DialogContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Label className="flex items-center space-x-2">
                <Switch checked={false} onCheckedChange={handleSettingsToggle} />
                <span className="text-sm text-slate-600">Fullscreen</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <Switch checked={false} onCheckedChange={handleSettingsToggle} />
                <span className="text-sm text-slate-600">Mute Audio</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <Switch checked={false} onCheckedChange={handleSettingsToggle} />
                <span className="text-sm text-slate-600">Language</span>
              </Label>
            </div>
          </DialogContent>
        </Dialog>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-6">
          <HomepageTabs tab={selectedTab} setTab={setSelectedTab} />
        </div>

        {/* Manga Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayMangas.map((manga) => {
            const franchise = state.franchises.find((f) => f.manga.id === manga.id);
            const isAdapted = franchise?.adapted ?? false;
            const bg = isAdapted ? "bg-green-50" : "bg-white";
            const border = isAdapted ? "border-green-200" : "border-slate-200";

            return (
              <Card
                key={manga.id}
                className={cn(
                  "rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md",
                  bg,
                  border
                )}
                onClick={() => handleSelectManga(manga)}
              >
                <CardContent className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">{manga.title}</h3>
                  <p className="text-sm text-slate-600">
                    Popularity: {manga.popularity}%
                  </p>
                  <p className="text-sm text-slate-600">
                    Chapters: {manga.chapters}
                  </p>
                  <p className="text-sm text-slate-600">
                    Status: {franchise?.adapted ? "Adapted" : "To Adapt"}
                  </p>
                  {franchise?.review && (
                    <p className="text-xs text-green-800 bg-green-50 p-2 rounded">
                      Review: {franchise.review.split("\n")[0]}
                    </p>
                  )}
                  <Input
                    type="number"
                    placeholder="Ep #"
                    className="w-full text-center text-sm"
                    value={episodeCount}
                    onChange={handleEpisodeCountChange}
                  />
                  {!isAdapted && (
                    <Button                      onClick={() => handleAdaptManga()}
                      className="w-full bg-blue-600 text-white"
                    >
                      Adapt Now
                    </Button>
                  )}
                  {isAdapted && (
                    <Button
                      onClick={() => handleAdaptManga()}
                      className="w-full bg-gray-300 text-gray-800"
                      disabled
                    >
                      Already Adapted
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Review Modal */}
        {currentFranchise && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogHeader>
              <DialogTitle>{currentFranchise.manga.title}</DialogTitle>
            </DialogHeader>
            <DialogContent className="space-y-4">
              <p className="text-sm text-slate-700">
                <strong>Budget:</strong> {state.budget}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Episode Count:</strong> {episodeCount}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Licensing Rights Purchased:</strong> {state.rightsPurchased ? "Yes" : "No"}
              </p>
              <h3 className="font-medium">AI Critic Review</h3>
              <p className="bg-white p-3 rounded shadow">
                {generateReview(currentFranchise.manga, currentFranchise)}
              </p>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Game;