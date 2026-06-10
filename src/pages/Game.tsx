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
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/i18n";
import { toast as sonnerToast } from "sonner"; // <-- added import

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
  toAdapt: "toAdapt",
  adapted: "adapted",
  allAdapted: "allAdapted",
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
        {tabId}
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
  const [state, setState] = useLocalStorage<GameState>(STORAGE_KEY, initialState);
  const [selectedTab, setSelectedTab] = useState<TabOption>("toAdapt");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [episodeCount, setEpisodeCount] = useState(initialState.episodeCount);

  // Settings state
  const [soundVolume, setSoundVolume] = useState(50);
  const { language, setLanguage } = useLanguage();
  const { t } = useT();

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
        label: t("toAdapt"),
        franchises: state.franchises.filter((franchise) => !franchise.adapted),
      },
      {
        id: "adapted",
        label: t("adapted"),
        franchises: state.franchises.filter((franchise) => franchise.adapted),
      },
      {
        id: "allAdapted",
        label: t("allAdapted"),
        franchises: state.franchises,
      },
    ];
  }, [state.franchises, t]);

  const currentTab = tabs.find((tab) => tab.id === selectedTab);

  const displayFranchises = currentTab?.franchises.filter((franchise) =>
    searchTerm
      ? franchise.manga.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true,
  );

  const handleSelectManga = (manga: Manga) => {
    const franchise = state.franchises.find((item) => item.manga.id === manga.id);
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
    toast.success(t("save"));
  };

  const handleLoadGame = () => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Use Sonner's error toast (fixed)
      sonnerToast.error("No saved game found.");
      return;
    }
    setState(JSON.parse(saved));
    toast.success(t("load"));
  };

  const handleSettingsToggle = (checked: boolean) => {
    console.log("Fullscreen toggle:", checked);
  };

  const handleExitToMainMenu = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">{t("title")}</h1>
            <p className="text-sm text-slate-600">{t("manageRoster")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSaveGame}>{t("save")}</Button>
            <Button variant="outline" onClick={handleLoadGame}>
              {t("load")}
            </Button>
            <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
              {t("settings")}
            </Button>
            <Button variant="destructive" onClick={handleExitToMainMenu}>
              {t("mainMenu")}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <HomepageTabs tab={selectedTab} setTab={setSelectedTab} />

        {/* Search */}
        <div className="space-y-3">
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {/* Franchise list */}
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
                    isAdapted ? "border-green-200 bg-green-50" : "border-slate-200 bg-white",
                  )}
                  onClick={() => handleSelectManga(manga)}
                >
                  <CardContent className="space-y-2 p-0">
                    <h3 className="text-lg font-semibold text-slate-950">{manga.title}</h3>
                    <p className="text-sm text-slate-600">Popularity: {manga.popularity}%</p>
                    <p className="text-sm text-slate-600">Chapters: {manga.chapters}</p>
                    <p className="text-sm text-slate-600">
                      Status: {isAdapted ? t("adapted") : t("toAdapt")}
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

        {/* Adapt dialog */}
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
                    <span className="font-medium">{t("budget")}:</span> {state.budget}
                  </div>
                  <div>
                    <span className="font-medium">{t("rightsPurchased")}:</span>{" "}
                    {state.rightsPurchased ? "Yes" : "No"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="episode-count">{t("episodeCount")}</Label>
                  <Input
                    id="episode-count"
                    type="number"
                    min={1}
                    value={episodeCount}
                    onChange={(e) => setEpisodeCount(Number(e.target.value) || 1)}
                  />
                </div>

                {currentFranchise.review ? (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">{t("gameSettings")}</h3>
                    <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
                      {currentFranchise.review}
                    </pre>
                  </div>
                ) : (
                  <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{t("noReview")}</p>
                )}

                <Button
                  className="w-full"
                  disabled={currentFranchise.adapted}
                  onClick={handleAdaptManga}
                >
                  {currentFranchise.adapted ? t("alreadyAdapted") : t("adaptNow")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Settings dialog with native language names */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="max-w-md space-y-4">
            <DialogHeader>
              <DialogTitle>{t("gameSettings")}</DialogTitle>
              <DialogDescription>{t("settings")}</DialogDescription>
            </DialogHeader>

            {/* Fullscreen toggle */}
            <Label className="flex items-center justify-between gap-4">
              <span className="text-sm">{t("toggleFullscreen")}</span>
              <Switch checked={false} onCheckedChange={handleSettingsToggle} />
            </Label>

            {/* Sound volume slider */}
            <div>
              <Label className="block mb-2 text-sm font-medium">{t("soundVolume")}</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[soundVolume]}
                onValueChange={(val) => setSoundVolume(val[0])}
              />
              <p className="mt-1 text-sm text-gray-600">{soundVolume}%</p>
            </div>

            {/* Language dropdown with native names */}
            <div>
              <Label className="block mb-2 text-sm font-medium">{t("language")}</Label>
              <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("language")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Japanese">日本語</SelectItem>
                  <SelectItem value="Korean">한국어</SelectItem>
                  <SelectItem value="Chinese">中文</SelectItem>
                  <SelectItem value="Spanish">Español</SelectItem>
                  <SelectItem value="French">Français</SelectItem>
                  <SelectItem value="German">Deutsch</SelectItem>
                  <SelectItem value="Italian">Italiano</SelectItem>
                  <SelectItem value="Portuguese">Português</SelectItem>
                  <SelectItem value="Russian">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Game;