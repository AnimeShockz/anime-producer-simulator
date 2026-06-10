"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Calendar = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (val: string) => void;
}) => (
  <input
    type="date"
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    className={cn("border rounded p-2")}
  />
);