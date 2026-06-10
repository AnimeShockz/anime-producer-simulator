"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Toggle = ({
  pressed,
  onPressedChange,
  ...props
}: {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    aria-pressed={pressed}
    onClick={() => onPressedChange?.(!pressed)}
    className={cn(
      "inline-flex items-center justify-center rounded-md border p-2",
      pressed ? "bg-primary text-primary-foreground" : "bg-muted",
    )}
    {...props}
  />
);