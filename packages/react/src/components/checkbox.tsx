import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

// Same border, checked colour, focus ring and interactions as RadioGroupItem:
// grey on hover, purple tint and a slight shrink while pressed.
export const checkboxVariants = cva(
  "peer shrink-0 cursor-pointer rounded-sm border border-muted-foreground ring-offset-background transition-[color,background-color,border-color,transform] duration-fast ease-out-soft hover:border-foreground/70 hover:bg-accent active:scale-90 active:bg-primary/10 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-action-foreground data-[state=checked]:bg-action-foreground data-[state=checked]:text-background data-[state=checked]:hover:bg-action-foreground/90 data-[state=checked]:active:bg-action-foreground/80 data-[state=indeterminate]:border-action-foreground data-[state=indeterminate]:bg-action-foreground data-[state=indeterminate]:text-background data-[state=indeterminate]:hover:bg-action-foreground/90 data-[state=indeterminate]:active:bg-action-foreground/80",
  {
    variants: {
      size: {
        md: "h-4 w-4 [&_svg]:size-3.5",
        lg: "h-5 w-5 rounded-md [&_svg]:size-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ size }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === "indeterminate" ? <MinusIcon /> : <CheckIcon />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="m5 12 4 4L19 6"
        pathLength={1}
        className="animate-check-draw [stroke-dasharray:1] motion-reduce:animate-none"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path
        d="M6 12h12"
        pathLength={1}
        className="animate-check-draw [stroke-dasharray:1] motion-reduce:animate-none"
      />
    </svg>
  );
}

export { Checkbox };
