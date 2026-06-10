"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const Home = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const router = useRouter();

  const handleCreateNewGame = () => {
    router.push("/game");
  };

  const handleLoadSave = () => {
    // Loading logic would be implemented in the game page
    alert("Load Save functionality will be implemented in the game.");
  };

  const handleExitToWindows = () => {
    // In a real app this would terminate the game
    alert("Exit to Windows clicked");
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Currently just logs the change; actual settings handled in dialog
    console.log("Settings toggle:", e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="rounded-2xl bg-white p-8 shadow-lg w-full max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Anime Producer Simulator
        </h1>

        <div className="flex flex-col space-y-3">
          <Button
            onClick={handleCreateNewGame}
            className="w-full justify-center"
          >
            Create New Game
          </Button>

          <Button
            onClick={handleLoadSave}
            className="w-full justify-center bg-blue-50"
          >
            Load Save
          </Button>

          <Button            onClick={() => setIsSettingsOpen(true)}
            className="w-full justify-center bg-purple-50"
          >
            Settings
          </Button>

          <Button
            onClick={handleExitToWindows}
            className="w-full justify-center bg-red-50"
          >
            Exit to Windows
          </Button>
        </div>

        {/* Settings Dialog */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogHeader>
            <DialogTitle>Game Settings</DialogTitle>
          </DialogHeader>
          <DialogContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Label className="flex items-center space-x-2">
                <Switch
                  checked={false}
                  onCheckedChange={handleSettingsChange}
                />
                <span className="text-sm text-slate-600">Fullscreen</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <Switch
                  checked={false}
                  onCheckedChange={handleSettingsChange}
                />
                <span className="text-sm text-slate-600">Mute Audio</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <Switch
                  checked={false}
                  onCheckedChange={handleSettingsChange}
                />
                <span className="text-sm text-slate-600">Language</span>
              </Label>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;