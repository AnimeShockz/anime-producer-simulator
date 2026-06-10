"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number; max?: number; onValueChange?: (val: number) => void }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
      <div className="absolute h-full bg-primary" style={{ width: "50%" }} />
    </div>
    <div className="block h-5 w-5 rounded-full bg-primary shadow-md" />
  </div>
));
Slider.displayName = "Slider";