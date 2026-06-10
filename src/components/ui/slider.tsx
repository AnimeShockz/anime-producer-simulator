"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SliderProps = React.HTMLAttributes<HTMLDivElement> & {
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

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
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
    // Simple visual representation – not a fully functional slider,
    // but enough for type‑checking and basic UI.
    const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onValueChange) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPos = e.clientX - rect.left;
      const newPercent = clickPos / rect.width;
      const newValue = Math.round(min + newPercent * (max - min));
      // Snap to nearest step
      const stepped = Math.round(newValue / step) * step;
      onValueChange(stepped);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
          <div className="absolute h-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
        <div className="block h-5 w-5 rounded-full bg-primary shadow-md" />
      </div>
    );
  },
);
Slider.displayName = "Slider";