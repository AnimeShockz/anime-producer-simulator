"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SliderProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Current value */
  value?: number;
  /** Minimum value (default 0) */
  min?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Step size (default 1) */
  step?: number;
  /** Called with the new value when it changes */
  onValueChange?: (val: number) => void;
};

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value = 0,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = Number(e.target.value);
      onValueChange?.(newVal);
    };

    return (
      <input
        type="range"
        ref={ref}
        className={cn(
          "w-full h-2 bg-muted rounded-full appearance-none cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "thumb:w-5 thumb:h-5 thumb:rounded-full thumb:bg-primary thumb:shadow-md",
          className,
        )}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  },
);
Slider.displayName = "Slider";