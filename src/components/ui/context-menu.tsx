"use client";

import * as React from "react";

export const ContextMenu = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ContextMenuTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ContextMenuContent = ({ children }: { children: React.ReactNode }) => (
  <div className="border bg-white p-2">{children}</div>
);