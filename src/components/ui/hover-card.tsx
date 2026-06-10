"use client";

import * as React from "react";

export const HoverCard = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const HoverCardTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const HoverCardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="border bg-white p-2">{children}</div>
);