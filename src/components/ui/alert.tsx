"use client";

import * as React from "react";

export const Alert = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-red-500 bg-red-100 p-4 rounded">{children}</div>
);