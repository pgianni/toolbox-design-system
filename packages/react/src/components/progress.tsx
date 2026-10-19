import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

// Progress bar (questionnaire progress, designer load, audit completion…).
// Leave `value` undefined for an indeterminate bar.

export const progressVariants = cva("relative w-full overflow-hidden rounded-full bg-muted", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2.5"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

const indicatorToneClassNames = {
  primary: "bg-primary",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger"
} as const;

export type ProgressTone = keyof typeof indicatorToneClassNames;

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof progressVariants> {
  /** Current value between 0 and `max`. Undefined shows an indeterminate bar. */
  value?: number;
  max?: number;
  tone?: ProgressTone;
  /** Text read by screen readers instead of the percentage, e.g. "3 sur 8". */
  valueText?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, size, value, max = 100, tone = "primary", valueText, ...props }, ref) => {
    const indeterminate = value === undefined;
    const percent = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuetext={valueText}
        data-state={indeterminate ? "indeterminate" : percent >= 100 ? "complete" : "loading"}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full",
            indicatorToneClassNames[tone],
            indeterminate
              ? "w-2/5 animate-progress-indeterminate motion-reduce:w-full motion-reduce:animate-none motion-reduce:opacity-40"
              : "transition-[width] duration-slow ease-out-soft motion-reduce:transition-none"
          )}
          style={indeterminate ? undefined : { width: `${percent}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
