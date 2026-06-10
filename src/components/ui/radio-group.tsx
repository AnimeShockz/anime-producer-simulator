"use client";

import * as React from "react";

export const RadioGroup = ({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
  };
  return (
    <div onChange={handleChange}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child) : child,
      )}
    </div>
  );
};

export const RadioGroupItem = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => (
  <label className="flex items-center space-x-2">
    <input type="radio" value={value} name="radio-group" className="form-radio" />
    {children}
  </label>
);