"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>;
export type ToastActionElement = React.ReactElement;

export const ToastProvider = ToastPrimitives.Provider;
export const ToastViewport = ToastPrimitives.Viewport;

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, children, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn("bg-background text-foreground p-4 rounded-md shadow-md relative", className)}
    {...props}
  >
    {children}
    <ToastPrimitives.Close asChild>
      <button className="absolute right-2 top-2">
        <X className="h-4 w-4" />
      </button>
    </ToastPrimitives.Close>
  </ToastPrimitives.Root>
));
Toast.displayName = "Toast";

export const ToastTitle = ToastPrimitives.Title;
export const ToastDescription = ToastPrimitives.Description;
export const ToastClose = ToastPrimitives.Close;