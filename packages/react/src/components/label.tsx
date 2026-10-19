import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

// A label tied to a control (htmlFor) shows a pointer, since clicking it
// toggles or focuses that control.
export const labelVariants = cva(
  "text-sm font-medium leading-none [&[for]]:cursor-pointer peer-disabled:opacity-70 peer-disabled:[&[for]]:cursor-not-allowed"
);

export type LabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> &
  VariantProps<typeof labelVariants>;

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;
