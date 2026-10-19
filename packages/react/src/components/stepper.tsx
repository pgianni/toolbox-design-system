import * as React from "react";
import { cn } from "../lib";
import { navItemPressClassName } from "./nav-item-styles";

// Step indicator, replacing the StepIndicator copied in UX Method, UX Team
// and Design Thinking. Steps before the current one are complete.

export type StepperStep = {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** The step cannot be opened yet. */
  disabled?: boolean;
};

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  steps: readonly StepperStep[];
  /** Id of the current step. */
  current: string;
  /** Makes reachable steps clickable. */
  onStepChange?: (id: string) => void;
  orientation?: "horizontal" | "vertical";
}

type StepState = "complete" | "current" | "upcoming";

const Stepper = React.forwardRef<HTMLElement, StepperProps>(
  (
    {
      className,
      steps,
      current,
      onStepChange,
      orientation = "horizontal",
      "aria-label": ariaLabel = "Étapes",
      ...props
    },
    ref
  ) => {
    const currentIndex = Math.max(
      0,
      steps.findIndex((step) => step.id === current)
    );
    const vertical = orientation === "vertical";

    return (
      <nav ref={ref} aria-label={ariaLabel} className={className} {...props}>
        <ol className={cn("flex", vertical ? "flex-col gap-1" : "items-center gap-2")}>
          {steps.map((step, index) => {
            const state: StepState =
              index < currentIndex ? "complete" : index === currentIndex ? "current" : "upcoming";
            const clickable = Boolean(onStepChange) && !step.disabled && state !== "current";
            const content = (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-base ease-out-soft",
                    state === "current" && "border-primary bg-primary text-primary-foreground",
                    state === "complete" &&
                      "border-primary/25 bg-primary/10 text-action-foreground",
                    state === "upcoming" && "border-input bg-background text-muted-foreground"
                  )}
                >
                  {state === "complete" ? <CheckIcon /> : index + 1}
                </span>
                <span className="grid min-w-0 text-left">
                  <span
                    className={cn(
                      "truncate text-sm font-medium",
                      state === "current" ? "text-action-foreground" : state === "complete" ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description ? (
                    <span className="truncate text-xs text-muted-foreground">{step.description}</span>
                  ) : null}
                </span>
                <span className="sr-only">
                  {state === "complete" ? " (terminée)" : state === "upcoming" ? " (à venir)" : ""}
                </span>
              </>
            );
            const itemClassName = cn(
              "flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5",
              step.disabled && "opacity-50"
            );

            return (
              <React.Fragment key={step.id}>
                {index > 0 && !vertical ? (
                  <li
                    aria-hidden="true"
                    className={cn(
                      "h-px w-8 shrink-0 transition-colors duration-base ease-out-soft",
                      index <= currentIndex ? "bg-primary/40" : "bg-border"
                    )}
                  />
                ) : null}
                <li className="min-w-0" aria-current={state === "current" ? "step" : undefined}>
                  {clickable ? (
                    <button
                      type="button"
                      onClick={() => onStepChange?.(step.id)}
                      className={cn(
                        itemClassName,
                        "transition-[background-color,transform] duration-fast ease-out-soft hover:bg-accent active:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        navItemPressClassName
                      )}
                    >
                      {content}
                    </button>
                  ) : (
                    <div className={itemClassName}>{content}</div>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Stepper.displayName = "Stepper";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export { Stepper };
