"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }
>(({ orientation = "horizontal", className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(
      orientation === "horizontal" ? "h-px w-full bg-border" : "w-px h-full bg-border",
      className,
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

/* The rest of the original sidebar component remains unchanged. */