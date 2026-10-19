import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../lib";
import {
  navItemBaseClassName,
  navItemCheckedStateClassName,
  navItemPillClassName
} from "./nav-item-styles";

// Switches between a few views or modes (e.g. list / cards in UX Method's
// activity library). Looks like Tabs, but is a radio group: it changes how
// content is shown instead of revealing tab panels.

export type SegmentedControlOption = {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export interface SegmentedControlProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "children" | "orientation"
  > {
  options: readonly SegmentedControlOption[];
  /** Hides the labels visually (they stay available to screen readers). */
  iconOnly?: boolean;
}

const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  SegmentedControlProps
>(({ className, options, iconOnly = false, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    orientation="horizontal"
    className={cn(
      "inline-flex h-auto items-center rounded-2xl border border-border bg-background p-1",
      className
    )}
    {...props}
  >
    {options.map((option) => (
      <RadioGroupPrimitive.Item
        key={option.value}
        value={option.value}
        disabled={option.disabled}
        className={cn(
          navItemBaseClassName,
          navItemPillClassName,
          navItemCheckedStateClassName,
          "ring-offset-background",
          iconOnly && "w-9 px-0"
        )}
      >
        {option.icon}
        <span className={cn(iconOnly && "sr-only")}>{option.label}</span>
      </RadioGroupPrimitive.Item>
    ))}
  </RadioGroupPrimitive.Root>
));
SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
