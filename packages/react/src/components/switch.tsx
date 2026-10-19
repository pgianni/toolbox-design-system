import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

const switchVariants = cva(
  // Same interactions as Checkbox: darker on hover, purple tint and a slight
  // shrink while pressed.
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-[color,background-color,transform] duration-fast ease-out-soft active:scale-95 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90 data-[state=checked]:active:bg-primary/80 data-[state=unchecked]:bg-input data-[state=unchecked]:hover:bg-muted-foreground/30 data-[state=unchecked]:active:bg-primary/25",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-[3.25rem]"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const switchThumbSizes = {
  sm: "h-4 w-4 data-[state=checked]:translate-x-4",
  md: "h-5 w-5 data-[state=checked]:translate-x-5",
  lg: "h-6 w-6 data-[state=checked]:translate-x-6"
} as const;

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = "md", ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(switchVariants({ size }), className)}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block translate-x-0 rounded-full bg-background shadow-sm ring-0 transition-transform duration-fast ease-out-soft",
        switchThumbSizes[size ?? "md"]
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch, switchVariants };
