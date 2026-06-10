"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const AlertDialog = ({ children }: { children: React.ReactNode }) => (
  <div className={cn("rounded-md border bg-background p-4 shadow")}>{children}</div>
);
export const AlertDialogTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const AlertDialogContent = ({ children }: { children: React.ReactNode }) => (
  <div className={cn("p-4")}>{children}</div>
);
export const AlertDialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className={cn("font-bold")}>{children}</h2>
);
export const AlertDialogDescription = ({ children }: { children: React.ReactNode }) => (
  <p className={cn("text-sm")}>{children}</p>
);