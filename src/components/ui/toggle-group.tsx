"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export type ToggleGroupProps = {
  asChild?: boolean;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {});
          }
          return child;
        })}
      </Comp>
    );
  }
);

ToggleGroup.Item = React.forwardRef<HTMLButtonElement, { value?: string }>(
  ({ value, ...props }, ref) => {
    return (
      <Slot as="button" ref={ref} {...props} />
    );
  }
);

export default ToggleGroup;
export { ToggleGroup, ToggleGroup.Item };