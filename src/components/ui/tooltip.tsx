"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const TooltipTrigger = ({
  children,
  asChild = false,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => <>{children}</>;

export const TooltipContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("rounded-md bg-popover text-popover-foreground px-3 py-1.5 text-sm shadow-md", className)}>
    {children}
  </div>
);