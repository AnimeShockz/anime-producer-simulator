"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const OTPInput = ({
  length = 6,
  onChange,
}: {
  length?: number;
  onChange?: (value: string) => void;
}) => {
  const [value, setValue] = React.useState<string>("".padEnd(length, " "));
  const handleChange = (idx: number, char: string) => {
    const arr = value.split("");
    arr[idx] = char;
    const newVal = arr.join("");
    setValue(newVal);
    onChange?.(newVal);
  };
  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          className={cn("w-10 text-center border rounded")}
        />
      ))}
    </div>
  );
};

export const OTPInputContext = React.createContext<any>(null);