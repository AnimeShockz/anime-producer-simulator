"use client";

import * as React from "react";

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DropdownMenuContent = ({ children }: { children: React.ReactNode }) => (
  <div className="border bg-white p-2">{children}</div>
);