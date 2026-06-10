"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Avatar = ({
  src,
  alt,
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) => (
  <img src={src} alt={alt} className={cn("h-10 w-10 rounded-full", className)} />
);