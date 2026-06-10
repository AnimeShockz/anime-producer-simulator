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
import { mangaList } from "@/data/manga";

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

export const Game = () => {
  // Use a safe local‑storage hook – it never throws.
  const [state, setState] = useLocalStorage<GameState>(STORAGE_KEY, initialState);
  const [selectedTab, setSelectedTab] = useState<TabOption>("toAdapt");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useT();
  const navigate = useNavigate();

  // Minimal UI – just enough to prove the page works.
  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <h2 className="text-2xl font-bold mb-4">{t("gameSettings")}</h2>

      <Button onClick={() => navigate("/")}>← {t("mainMenu")}</Button>

      {/* Settings dialog (kept simple) */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>{t("settings")}</DialogTitle>
          </DialogHeader>

          <Label className="flex items-center justify-between">
            <span>{t("fullscreen")}</span>
            <Switch checked={false} onCheckedChange={() => {}} />
          </Label>

          <div>
            <Label className="block mb-2">{t("soundVolume")}</Label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={50}
              onValueChange={() => {}}
            />
          </div>

          <div>
            <Label className="block mb-2">{t("language")}</Label>
            <Select value={language} onValueChange={(v) => setLanguage(v as any)}>
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
  );
};

export default Game;