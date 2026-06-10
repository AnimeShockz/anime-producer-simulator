"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Carousel = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className={cn("flex overflow-x-auto gap-4")}>{children}</div>;