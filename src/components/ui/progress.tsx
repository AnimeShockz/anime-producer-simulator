"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Progress = ({
  value = 0,
  max = 100,
}: {
  value?: number;
  max?: number;
}) => {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <div className={cn("w-full bg-muted rounded-full h-2")}>
      <div
        className={cn("bg-primary h-2 rounded-full transition-all")}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};