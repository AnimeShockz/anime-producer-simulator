"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

export const Form = ({ children }: { children: React.ReactNode }) => {
  const methods = useFormContext();
  return <form>{children}</form>;
};

export const FormField = ({
  name,
  render,
}: {
  name: string;
  render: (field: any) => React.ReactNode;
}) => {
  const { register } = useFormContext();
  return <>{render(register(name))}</>;
};

export const FormItem = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const FormLabel = ({ children }: { children: React.ReactNode }) => <label>{children}</label>;
export const FormControl = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const FormMessage = ({ children }: { children: React.ReactNode }) => <p>{children}</p>;