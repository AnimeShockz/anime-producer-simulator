"use client";

import * as React from "react";

export const NavigationMenu = ({ children }: { children: React.ReactNode }) => <nav>{children}</nav>;
export const NavigationMenuList = ({ children }: { children: React.ReactNode }) => <ul>{children}</ul>;
export const NavigationMenuItem = ({ children }: { children: React.ReactNode }) => <li>{children}</li>;
export const NavigationMenuTrigger = ({ children }: { children: React.ReactNode }) => <button>{children}</button>;
export const NavigationMenuContent = ({ children }: { children: React.ReactNode }) => (
  <div className="border bg-white p-2">{children}</div>
);