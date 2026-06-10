"use client";

import React, { useState, useMemo } from "react";
import { Manga } from "@/data/manga";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShowRosterProps {
  mangaList: Manga[];
  selectedManga: Manga | null;
  season: number;
  onSelectManga: (manga: Manga) => void;
}

const conceptLabel: Record<Manga["conceptType"], string> = {
  generic: "Straightforward",
  familiar: "Familiar with a twist",
  distinctive: "Distinctive"
};

const formatStatus = (manga: Manga) => {
  if (manga.status === "finished") return "Finished";
  return `Running (${manga.releaseFrequency ?? "ongoing"})`;
};

const formatNumber = (value: number) => value.toLocaleString();

export default function ShowRoster({
  mangaList,
  selectedManga,
  season,
  onSelectManga
}: ShowRosterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailManga, setDetailManga] = useState<Manga | null>(null);

  const filteredManga = useMemo(() => {
    if (!searchTerm) return mangaList;
    return mangaList.filter(manga => 
      manga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mangaList, searchTerm]);

  const handleSelect = (manga: Manga) => {
    onSelectManga(manga);
    setIsDialogOpen(false);
  };

  const openDetailDialog = (manga: Manga) => {
    setDetailManga(manga);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Select Manga</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          Season {season}
        </span>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search manga..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <ScrollArea className="max-h-[430px] pr-4">
        <div className="space-y-3">
          {filteredManga.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">No manga found</p>
          ) : (
            filteredManga.map((manga) => (
              <Card
                key={manga.id}
                className={`cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  selectedManga?.id === manga.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => openDetailDialog(manga)}
              >
                <CardContent className="py-4">
                  <h3 className="font-semibold text-base leading-tight">{manga.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Popularity: <span className="font-semibold text-slate-900">{manga.popularity}%</span>
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{detailManga?.title}</DialogTitle>
            <DialogDescription className="space-y-1">
              <p>
                Popularity:{" "}
                <span className="font-medium text-slate-950">
                  {detailManga?.popularity}%
                </span>
              </p>
              <p>
                Concept:{" "}
                <span className="font-medium text-slate-950">
                  {detailManga ? conceptLabel[detailManga.conceptType] : ""}
                </span>
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div>
              <h4 className="mb-2 text-sm font-semibold">Synopsis</h4>
              <div className="space-y-1">
                {detailManga?.synopsis.map((line, index) => (
                  <p key={`${detailManga.id}-synopsis-${index}`} className="text-sm leading-6 text-slate-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div>
                <span className="font-medium text-slate-950">Status:</span>{" "}
                {detailManga && formatStatus(detailManga)}
              </div>
              <div>
                <span className="font-medium text-slate-950">Chapters:</span>{" "}
                {detailManga?.chapters}
              </div>
              <div>
                <span className="font-medium text-slate-950">Volumes:</span>{" "}
                {detailManga?.tankobonVolumes}
              </div>
              <div>
                <span className="font-medium text-slate-950">Sales:</span>{" "}
                {detailManga && formatNumber(detailManga.salesVolumes)}
              </div>
              <div className="col-span-2">
                <span className="font-medium text-slate-950">Magazine:</span>{" "}
                {detailManga?.magazine}
              </div>
            </div>

            {detailManga && selectedManga?.id !== detailManga.id ? (
              <Button className="w-full" onClick={() => handleSelect(detailManga)}>
                Select This Manga
              </Button>
            ) : (
              <Button className="w-full" disabled>
                Selected Manga
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}