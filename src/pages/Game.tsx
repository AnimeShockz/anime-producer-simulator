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
import { toast as sonnerToast } from "sonner";
import { mangaList } from "@/data/manga";
import { showSuccess } from "@/utils/toast";

const STORAGE_KEY = "anime-producer-save";

type TabOption = "toAdapt" | "adapted" | "allAdapted";

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
  franchises: mangaList.map((m) => ({
    manga: m,
    adapted: false,
    review: null,
    episodeCount: 0,
  })),
  currentFranchiseId: null,
  budget: "average",
  episodeCount: 12,
  rightsPurchased: false,
};

/* placeholder review generator */
function generateReview(_manga: Manga, _opts: { episodeCount: number }) {
  return "AI Critic Review: (placeholder)";
}

export const Game = () => {
  const [state, setState] = useLocalStorage<GameState>(STORAGE_KEY, initialState);
  const [selectedTab, setSelectedTab] = useState<TabOption>("toAdapt");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [episodeCount, setEpisodeCount] = useState(initialState.episodeCount);

  const [soundVolume, setSoundVolume] = useState(50);
  const { language, setLanguage } = useLanguage();
  const { t } = useT();

  const navigate = useNavigate();
  const { toast } = useToast();

  const currentFranchise = useMemo(
    () => state.franchises.find((f) => f.manga.id === state.currentFranchiseId) ?? null,
    [state],
  );

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
    showSuccess(`Adapted ${currentFranchise.manga.title}`);
    setIsDialogOpen(false);
  };

  const handleSaveGame = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    showSuccess(t("save"));
  };

  const handleLoadGame = () => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      sonnerToast.error("No saved game found.");
      return;
    }
    setState(JSON.parse(saved));
    showSuccess(t("load"));
  };

  /* ... rest of component unchanged ... */
};

export default Game;