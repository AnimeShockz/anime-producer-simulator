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

const Home = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateNewGame = () => {
    navigate("/game");
  };

  const handleLoadSave = () => {
    alert("Load Save functionality is handled in the game page.");
  };

  const handleExitToWindows = () => {
    alert("Exit to Windows clicked.");
  };

  const handleSettingsChange = (checked: boolean) => {
    console.log("Settings toggle:", checked);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="rounded-2xl bg-white p-8 shadow-lg w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-950">
            Anime Producer Simulator
          </h1>
          <p className="text-sm text-slate-600">
            Build your anime season, choose studios, and review the results.
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <Button
            onClick={handleCreateNewGame}
            className="w-full justify-center"
          >
            Create New Game
          </Button>

          <Button
            onClick={handleLoadSave}
            className="w-full justify-center"
            variant="secondary"
          >
            Load Save
          </Button>

          <Button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full justify-center"
            variant="outline"
          >
            Settings
          </Button>

          <Button
            onClick={handleExitToWindows}
            className="w-full justify-center"
            variant="destructive"
          >
            Exit to Windows
          </Button>
        </div>

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="space-y-4">
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
                  onCheckedChange={handleSettingsChange}
                />
              </Label>

              <Label className="flex items-center justify-between gap-4">
                <span className="text-sm">Mute Audio</span>
                <Switch
                  checked={false}
                  onCheckedChange={handleSettingsChange}
                />
              </Label>

              <Label className="flex items-center justify-between gap-4">
                <span className="text-sm">Language</span>
                <Switch
                  checked={false}
                  onCheckedChange={handleSettingsChange}
                />
              </Label>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;