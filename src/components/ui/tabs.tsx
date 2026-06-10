"use client";

import * as React from "react";

export const Tabs = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const TabsList = ({ children }: { children: React.ReactNode }) => <div className="flex">{children}</div>;
export const TabsTrigger = ({
  value,
  onClick,
  children,
}: {
  value: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <button onClick={onClick} className="px-4 py-2">
    {children}
  </button>
);
export const TabsContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;