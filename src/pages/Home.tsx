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

const Home = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  // Settings state
  const [soundVolume, setSoundVolume] = useState(50);
  const { language, setLanguage } = useLanguage();
  const { t } = useT();

  const handleCreateNewGame = () => {
    navigate("/game");
  };

  const handleLoadSave = () => {
    alert("Load Save functionality is handled in the game page.");
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
          <p className="text-sm text-slate-600">
            {t("currentLanguage")} <span className="font-medium">{language}</span>
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <Button onClick={handleCreateNewGame} className="w-full justify-center">
            {t("createNewGame")}
          </Button>

          <Button
            onClick={handleLoadSave}
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

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>{t("settings")}</DialogTitle>
              <DialogDescription>{t("settings")}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Fullscreen toggle */}
              <Label className="flex items-center justify-between gap-4">
                <span className="text-sm">{t("fullscreen")}</span>
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

              {/* Language dropdown */}
              <div>
                <Label className="block mb-2 text-sm font-medium">{t("language")}</Label>
                <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("language")} />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "English",
                      "Japanese",
                      "Korean",
                      "Chinese",
                      "Spanish",
                      "French",
                      "German",
                      "Italian",
                      "Portuguese",
                      "Russian",
                    ].map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;