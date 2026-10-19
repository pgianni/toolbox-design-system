import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

// Loading indicator. Takes the current text colour, so it matches the button
// or text it sits in; use `tone="primary"` on its own.

export const spinnerVariants = cva("shrink-0 animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-8"
    },
    tone: {
      current: "text-current",
      primary: "text-action-foreground",
      muted: "text-muted-foreground"
    }
  },
  defaultVariants: {
    size: "md",
    tone: "current"
  }
});

export interface SpinnerProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "children">,
    VariantProps<typeof spinnerVariants> {
  /**
   * Announced to screen readers. Pass an empty string when the spinner sits
   * next to text that already says what is loading (e.g. in a button).
   */
  label?: string;
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, tone, label = "Chargement", ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      role={label ? "status" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn(spinnerVariants({ size, tone }), className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.2" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
);
Spinner.displayName = "Spinner";

export { Spinner };
