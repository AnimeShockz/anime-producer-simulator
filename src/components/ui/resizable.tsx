"use client";

import * as React from "react";

export const ResizablePanel = ({
  children,
  defaultSize = 200,
}: {
  children: React.ReactNode;
  defaultSize?: number;
}) => <div style={{ flex: `0 0 ${defaultSize}px` }}>{children}</div>;

export const ResizableHandle = () => (
  <div style={{ width: "4px", cursor: "col-resize", background: "#ccc" }} />
);