"use client";

import React from "react";
import { Studio } from "@/data/studios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface StudioRosterProps {
  studios: Studio[];
  selectedStudio: Studio | null;
  onSelectStudio: (studio: Studio) => void;
}

export default function StudioRoster({ studios, selectedStudio, onSelectStudio }: StudioRosterProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [detailStudio, setDetailStudio] = React.useState<Studio | null>(null);

  const handleSelect = (studio: Studio) => {
    onSelectStudio(studio);
    setIsDialogOpen(false);
  };

  const openDetailDialog = (studio: Studio) => {
    setDetailStudio(studio);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Select Studio</h2>
      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-4">
          {studios.map((studio) => (
            <Card
              key={studio.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedStudio?.id === studio.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => openDetailDialog(studio)}
            >
              <CardContent className="pt-4">
                <h3 className="font-medium text-base">{studio.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Min Budget: <span className="font-semibold">{studio.minBudget}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{detailStudio?.name}</DialogTitle>
            <DialogDescription>
              {detailStudio && `Minimum ${detailStudio.minBudget} budget • ${detailStudio.size} studio`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Style</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {detailStudio?.styleDescription}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Complexity:</span>{" "}
                {detailStudio?.complexity}
              </div>
              <div>
                <span className="font-medium text-gray-600">Pacing:</span>{" "}
                {detailStudio?.pacing}
              </div>
              <div>
                <span className="font-medium text-gray-600">Length:</span>{" "}
                {detailStudio?.lengthPreference}
              </div>
              <div>
                <span className="font-medium text-gray-600">Genres:</span>{" "}
                {detailStudio && detailStudio.genres.slice(0, 3).join(", ")}
              </div>
            </div>
            {detailStudio && selectedStudio?.id !== detailStudio.id && (
              <Button className="w-full" onClick={() => handleSelect(detailStudio)}>
                Select This Studio
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}