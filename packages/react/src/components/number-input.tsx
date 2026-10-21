import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { Button } from "./button";
import { controlHeightClassName } from "./control-sizes";

// Number field with − / + buttons, from UX Method's CounterInput (number of
// screens per complexity). The buttons stop at `min` and `max`.

export const numberInputVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-2.5"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export interface NumberInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "value" | "defaultValue" | "onChange" | "size" | "type" | "min" | "max" | "step"
    >,
    VariantProps<typeof numberInputVariants> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  decrementLabel?: string;
  incrementLabel?: string;
  /** Class names for the wrapper; `className` goes on the input. */
  wrapperClassName?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      wrapperClassName,
      size,
      value: valueProp,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 999,
      step = 1,
      decrementLabel = "Diminuer",
      incrementLabel = "Augmenter",
      disabled,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(clamp(defaultValue, min, max));
    const value = valueProp ?? uncontrolled;
    // Keeps what the user is typing, even when it is briefly empty.
    const [draft, setDraft] = React.useState<string | null>(null);

    const commit = (next: number) => {
      const clamped = clamp(next, min, max);
      if (valueProp === undefined) setUncontrolled(clamped);
      onValueChange?.(clamped);
    };

    const controlSize = size ?? "md";
    const fieldWidth = { sm: "w-14 text-base md:text-sm", md: "w-16 text-base md:text-sm", lg: "w-20 text-base" }[controlSize];

    return (
      <div className={cn(numberInputVariants({ size }), wrapperClassName)}>
        <Button
          type="button"
          variant="outline"
          size={controlSize}
          iconOnly
          shape="rounded"
          aria-label={decrementLabel}
          disabled={disabled || value <= min}
          onClick={() => commit(value - step)}
        >
          <MinusIcon />
        </Button>
        <input
          ref={ref}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={draft ?? String(value)}
          onChange={(event) => {
            setDraft(event.target.value);
            const parsed = Number.parseInt(event.target.value, 10);
            if (!Number.isNaN(parsed)) commit(parsed);
          }}
          onBlur={(event) => {
            setDraft(null);
            onBlur?.(event);
          }}
          className={cn(
            "flex rounded-md border border-input bg-background px-2 text-right font-medium tabular-nums ring-offset-background transition-colors duration-fast ease-out-soft hover:bg-accent focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            controlHeightClassName[controlSize],
            fieldWidth,
            className
          )}
          {...props}
        />
        <Button
          type="button"
          variant="primary"
          size={controlSize}
          iconOnly
          shape="rounded"
          aria-label={incrementLabel}
          disabled={disabled || value >= max}
          onClick={() => commit(value + step)}
        >
          <PlusIcon />
        </Button>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

function MinusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export { NumberInput };
