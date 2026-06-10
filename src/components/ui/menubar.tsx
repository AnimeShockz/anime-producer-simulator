"use client";

import * as React from "react";

export const Menubar = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const MenubarMenu = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const MenubarTrigger = ({ children }: { children: React.ReactNode }) => <button>{children}</button>;
export const MenubarContent = ({ children }: { children: React.ReactNode }) => (
  <div className="border bg-white p-2">{children}</div>
);