"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Manga } from "@/data/manga";

interface Props {
  manga: Manga;
  onClick?: () => void;
}

const MangaCard: React.FC<Props> = ({ manga, onClick }) => {
  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        onClick ? "hover:-translate-y-0.5" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{manga.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-600">
        <p>
          <span className="font-medium">Popularity:</span> {manga.popularity}%
        </p>
        <p>
          <span className="font-medium">Chapters:</span> {manga.chapters}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          {manga.status === "finished" ? "Finished" : "Running"}
        </p>
      </CardContent>
    </Card>
  );
};

export default MangaCard;