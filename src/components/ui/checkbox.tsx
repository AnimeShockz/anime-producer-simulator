"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Checkbox = ({
  checked,
  onCheckedChange,
  ...props
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange?.(e.target.checked)}
    className={cn("h-4 w-4 rounded border", props.className)}
    {...props}
  />
);