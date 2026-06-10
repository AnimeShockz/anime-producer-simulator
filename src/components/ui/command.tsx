"use client";

import * as React from "react";

export const Command = ({ children }: { children: React.ReactNode }) => (
  <div className="border rounded p-2">{children}</div>
);
export const CommandInput = (props: any) => <input {...props} className="w-full p-1 border rounded" />;
export const CommandList = ({ children }: { children: React.ReactNode }) => <ul>{children}</ul>;
export const CommandItem = ({ children }: { children: React.ReactNode }) => <li>{children}</li>;