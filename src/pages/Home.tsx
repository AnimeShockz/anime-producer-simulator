"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { Trash2 } from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const SAVE_SLOT_COUNT = 3;
const slotKey = (i: number) => `anime-producer-save-slot-${i}`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useT();
  const { language, setLanguage } = useLanguage();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoadOpen, setIsLoadOpen] = useState(false);
  const [soundVolume, setSoundVolume] = useState(50);

  const handleCreateNewGame = () => {
    // clear any existing save slots
    for (let i = 1; i <= SAVE_SLOT_COUNT; i++) {
      localStorage.removeItem(slotKey(i));
    }
    navigate("/game");
  };

  const openLoadDialog = () => setIsLoadOpen(true);

  const loadFromSlot = (i: number) => {
    const data = localStorage.getItem(slotKey(i));
    if (data) {
      localStorage.setItem("anime-producer-save", data);
      navigate("/game");
    } else {
      alert("Slot is empty.");
    }
    setIsLoadOpen(false);
  };

  const deleteSlot = (i: number) => {
    if (confirm(`Delete save in slot ${i}? This cannot be undone.`)) {
      localStorage.removeItem(slotKey(i));
      setIsLoadOpen(false);
      setTimeout(() => setIsLoadOpen(true), 0);
    }
  };

  const handleExitToWindows = () => {
    alert("Exit to Windows clicked.");
  };

  const handleSettingsToggle = (checked: boolean) => {
    console.log("Fullscreen toggle:", checked);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="rounded-2xl bg-white p-8 shadow-lg w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-950">{t("title")}</h1>
          <p className="text-sm text-slate-600">{t("tagline")}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <Button onClick={handleCreateNewGame} className="w-full justify-center">
            {t("createNewGame")}
          </Button>

          <Button
            onClick={openLoadDialog}
            className="w-full justify-center"
            variant="secondary"
          >
            {t("loadSave")}
          </Button>

          <Button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full justify-center"
            variant="outline"
          >
            {t("settings")}
          </Button>

          <Button
            onClick={handleExitToWindows}
            className="w-full justify-center"
            variant="destructive"
          >
            {t("exitToWindows")}
          </Button>
        </div>

        {/* Settings Dialog */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>{t("settings")}</DialogTitle>
              <DialogDescription>{t("settings")}</DialogDescription>
            </DialogHeader>

            <Label className="flex items-center justify-between gap-4">
              <span className="text-sm">{t("fullscreen")}</span>
              <Switch checked={false} onCheckedChange={handleSettingsToggle} />
            </Label>

            {/* Dark mode toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <DarkModeToggle />
            </div>

            <div>
              <Label className="block mb-2 text-sm font-medium">{t("soundVolume")}</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={soundVolume}
                onValueChange={(val) => setSoundVolume(val as number)}
              />
              <p className="mt-1 text-sm text-gray-600">{soundVolume}%</p>
            </div>

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

        {/* Load Save Dialog */}
        <Dialog open={isLoadOpen} onOpenChange={setIsLoadOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t("loadSave")}</DialogTitle>
              <DialogDescription>Select a slot to load.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {[...Array(SAVE_SLOT_COUNT)].map((_, idx) => {
                const slot = idx + 1;
                const data = localStorage.getItem(slotKey(slot));
                const isEmpty = !data;
                return (
                  <div key={slot} className="flex items-center justify-between">
                    <Button
                      className="flex-1 justify-between"
                      onClick={() => loadFromSlot(slot)}
                    >
                      Slot {slot} {isEmpty ? "— Empty" : "— Saved"}
                    </Button>
                    {!isEmpty && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSlot(slot)}
                        className="ml-2"
                        aria-label={`Delete slot ${slot}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;