"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Separator = ({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) => (
  <div
    className={cn(
      orientation === "horizontal" ? "h-px w-full bg-border" : "w-px h-full bg-border",
      className,
    )}
  />
);