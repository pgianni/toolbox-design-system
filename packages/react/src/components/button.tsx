import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:translate-y-0.5",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 active:translate-y-0.5",
        brand: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5",
        purple: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5",
        save: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5",
        "brand-outline": "rounded-full border border-primary/70 bg-transparent text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
        "brand-ghost": "rounded-full text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-full px-4",
        icon: "h-10 w-10",
        "icon-xs": "h-6 w-6 p-0 [&_svg]:size-3",
        "icon-sm": "h-8 w-8 p-0 [&_svg]:size-4",
        "icon-md": "h-9 w-9 p-0 [&_svg]:size-4",
        "icon-lg": "h-11 w-11 p-0 [&_svg]:size-5"
      },
      shape: {
        default: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
