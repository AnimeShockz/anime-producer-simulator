"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Studio } from "@/data/studios";

interface Props {
  studio: Studio;
  onClick?: () => void;
}

const StudioCard: React.FC<Props> = ({ studio, onClick }) => {
  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        onClick ? "hover:-translate-y-0.5" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{studio.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-600">
        <p>
          <span className="font-medium">Min Budget:</span>{" "}
          {studio.minBudget}
        </p>
        <p>
          <span className="font-medium">Size:</span> {studio.size}
        </p>
        <p>
          <span className="font-medium">Genres:</span>{" "}
          {studio.genres.slice(0, 3).join(", ")}
        </p>
      </CardContent>
    </Card>
  );
};

export default StudioCard;