"use client";

import * as React from "react";

export const AspectRatio = ({
  ratio = 1,
  children,
}: {
  ratio?: number;
  children: React.ReactNode;
}) => (
  <div style={{ position: "relative", paddingBottom: `${100 / ratio}%` }}>{children}</div>
);