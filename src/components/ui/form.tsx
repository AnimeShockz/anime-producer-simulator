"use client";

import * as React from "react";

export const Form = ({ children }: { children: React.ReactNode }) => (
  <form>{children}</form>
);

export const FormField = ({
  name,
  render,
}: {
  name: string;
  render: (field: any) => React.ReactNode;
}) => {
  // Simple mock field registration
  const mockField = { name };
  return <>{render(mockField)}</>;
};

export const FormItem = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const FormLabel = ({ children }: { children: React.ReactNode }) => <label>{children}</label>;
export const FormControl = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const FormMessage = ({ children }: { children: React.ReactNode }) => <p>{children}</p>;