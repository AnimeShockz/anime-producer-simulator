"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const ToggleGroup = React.forwardRef(
  ({ asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, child.props);
          }
          return child;
        })}
      </Comp>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup";

ToggleGroup.Item = React.forwardRef(({ ...props }, ref) => {
  return (
    <Slot ref={ref}>
      {({ ...toggleGroupItem }) => (
        <button type="button" {...toggleGroupItem} {...props} ref={ref} />
      )}
    </Slot>
  );
});
ToggleGroup.Item.displayName = "ToggleGroup.Item";

export { ToggleGroup, ToggleGroup.Item };