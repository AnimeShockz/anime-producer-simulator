"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
};

const badgeVariants = ({
  variant = "default",
}: { variant: BadgeProps["variant"] }) => {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const variants: Record<BadgeProps["variant"], string> = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border border-input bg-background text-foreground",
  };
  return cn(base, variants[variant]);
};

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", ...props }) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
};