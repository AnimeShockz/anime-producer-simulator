"use client";

import * as React from "react";

export const Popover = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const PopoverTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const PopoverContent = ({ children }: { children: React.ReactNode }) => (
  <div className="border bg-white p-2">{children}</div>
);