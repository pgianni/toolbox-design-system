import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// Same interactions as Checkbox: grey on hover, purple tint and a slight
// shrink while pressed.
export const radioGroupItemVariants = cva(
  "aspect-square shrink-0 cursor-pointer rounded-full border border-muted-foreground text-action-foreground ring-offset-background transition-[color,background-color,border-color,transform] duration-fast ease-out-soft hover:border-foreground/70 hover:bg-accent active:scale-90 active:bg-primary/10 motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-action-foreground data-[state=checked]:hover:bg-primary/10 data-[state=checked]:active:bg-primary/20",
  {
    variants: {
      size: {
        md: "h-4 w-4 [&_[data-dot]]:size-2",
        lg: "h-5 w-5 [&_[data-dot]]:size-2.5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioGroupItemVariants({ size }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span data-dot="" className="animate-pop-in rounded-full bg-current motion-reduce:animate-none" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
