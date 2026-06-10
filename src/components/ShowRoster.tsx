"use client";

import React, { useState } from "react";
import { Manga } from "@/data/manga";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ShowRosterProps {
  mangaList: Manga[];
  selectedManga: Manga | null;
  onSelectManga: (manga: Manga) => void;
}

const getSynopsis = (manga: Manga) => {
  const title = manga.title.toLowerCase();
  if (title.includes("starlight") || title.includes("chronicles"))
    return "An epic saga of heroes battling fate across celestial realms, featuring stunning animation and a haunting orchestral score that defines a new era of storytelling.";
  if (title.includes("neon") || title.includes("samurai"))
    return "Cybernetic warriors clash in a neon-lit future metropolis where tradition meets technology. A tale of honor, identity, and the price of progress in a world transformed by artificial intelligence.";
  if (title.includes("eclipse") || title.includes("café"))
    return "A cozy tale of love and mystery set in a charming café where each cup of coffee reveals a piece of the puzzle. Serendipitous encounters lead to life-changing discoveries.";
  if (title.includes("mecha") || title.includes("princess"))
    return "A high-tech princess pilots a giant mecha to protect her kingdom in a world where machines and magic coexist. An unlikely hero rises to defend what matters most.";
  if (title.includes("whispering") || title.includes("winds"))
    return "Gentle spirits guide a wandering traveler through serene landscapes. A meditative journey about finding peace in a chaotic world and the bonds that connect us to nature.";
  if (title.includes("cyber") || title.includes("ninja"))
    return "Stealthy ninjas navigate a cyber-punk world of intrigue. Ancient traditions clash with futuristic technology as a lone warrior seeks justice in the digital shadows.";
  if (title.includes("gourmet") || title.includes("detective"))
    return "A culinary detective solves mysteries through exquisite cuisine. Each case reveals not just the truth, but the human stories behind the food we love and the meals that define us.";
  if (title.includes("dragon") || title.includes("kingdom"))
    return "A legendary dragon rises to reclaim its ancient kingdom. An epic tale of power, legacy, and the eternal struggle between tradition and change in a world ruled by those who command fire.";
  return "An exciting adventure awaits in this thrilling manga featuring compelling characters and breathtaking action sequences that will keep you engaged from start to finish.";
};

export default function ShowRoster({ mangaList, selectedManga, onSelectManga }: ShowRosterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailManga, setDetailManga] = useState<Manga | null>(null);

  const handleSelect = (manga: Manga) => {
    onSelectManga(manga);
    setIsDialogOpen(false);
  };

  const openDetailDialog = (manga: Manga) => {
    setDetailManga(manga);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Select Manga</h2>
      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-4">
          {mangaList.map((manga) => (
            <Card
              key={manga.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedManga?.id === manga.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => openDetailDialog(manga)}
            >
              <CardContent className="pt-4">
                <h3 className="font-medium text-base">{manga.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Popularity: <span className="font-semibold">{manga.popularity}%</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{detailManga?.title}</DialogTitle>
            <DialogDescription>
              {detailManga && `Popularity: ${detailManga.popularity}% • ${detailManga.status === "finished" ? "Finished" : "Ongoing"}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Synopsis</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {detailManga && getSynopsis(detailManga)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Chapters:</span>{" "}
                {detailManga?.chapters}
              </div>
              <div>
                <span className="font-medium text-gray-600">Volumes:</span>{" "}
                {detailManga?.tankobonVolumes}
              </div>
              <div>
                <span className="font-medium text-gray-600">Sales:</span>{" "}
                {detailManga && (detailManga.salesVolumes / 1_000_000).toFixed(1)}M
              </div>
              <div>
                <span className="font-medium text-gray-600">Magazine:</span>{" "}
                {detailManga?.magazine}
              </div>
            </div>
            {detailManga && selectedManga?.id !== detailManga.id && (
              <Button className="w-full" onClick={() => handleSelect(detailManga)}>
                Select This Manga
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}