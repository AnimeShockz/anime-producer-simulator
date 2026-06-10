"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Collapsible = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const CollapsibleTrigger = ({ children }: { children: React.ReactNode }) => <button>{children}</button>;
export const CollapsibleContent = ({ children }: { children: React.ReactNode }) => (
  <div className={cn("border p-2 mt-2")}>{children}</div>
);