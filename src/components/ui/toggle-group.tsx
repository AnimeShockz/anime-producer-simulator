"use client";

import * as React from "react";

export const ToggleGroup = ({
  type = "single",
  value,
  onValueChange,
  children,
}: {
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (val: string | string[]) => void;
  children: React.ReactNode;
}) => {
  const handleClick = (val: string) => {
    if (type === "single") {
      onValueChange?.(val);
    } else {
      const arr = Array.isArray(value) ? [...value] : [];
      if (arr.includes(val)) {
        onValueChange?.(arr.filter((v) => v !== val));
      } else {
        onValueChange?.([...arr, val]);
      }
    }
  };
  return (
    <div className="flex gap-2">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { onClick: () => handleClick(child.props.value) })
          : child,
      )}
    </div>
  );
};

export const ToggleGroupItem = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => <button className="px-3 py-1 border rounded">{children}</button>;