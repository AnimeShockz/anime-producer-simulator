"use client";

import * as React from "react";

export const Drawer = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end">
      <div className="bg-white w-80 h-full p-4">{children}</div>
    </div>
  );
};