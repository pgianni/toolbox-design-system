import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { Button } from "./button";
import { controlHeightClassName } from "./control-sizes";

// Number field with − / + buttons, from UX Method's CounterInput (number of
// screens per complexity). The buttons stop at `min` and `max`. Decimals are
// typed with a comma or a dot and shown with the locale's separator.

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
  /** Amount added or removed by the buttons and the arrow keys. Defaults to 1. */
  step?: number;
  /**
   * Decimals kept when typing or stepping. Defaults to the decimals of `step`
   * (0 for 1, 1 for 0.5, 2 for 0.25).
   */
  precision?: number;
  /** Locale used to show the decimal separator. Defaults to "fr-FR" (comma). */
  locale?: string;
  decrementLabel?: string;
  incrementLabel?: string;
  /** Class names for the wrapper; `className` goes on the input. */
  wrapperClassName?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const decimalsOf = (n: number) => {
  const [, fraction = ""] = String(n).split(".");
  return fraction.length;
};

// Rounds away float noise such as 0.1 + 0.2 = 0.30000000000000004.
const roundTo = (n: number, precision: number) => Number(n.toFixed(precision));

// Accepts "1,5", "1.5", "-2" and ignores spaces; NaN for anything else.
const parseDecimal = (text: string) => {
  const normalized = text.replace(/\s/g, "").replace(",", ".");
  return /^-?\d*\.?\d*$/.test(normalized) && /\d/.test(normalized)
    ? Number(normalized)
    : Number.NaN;
};

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
      precision: precisionProp,
      locale = "fr-FR",
      decrementLabel = "Diminuer",
      incrementLabel = "Augmenter",
      disabled,
      onBlur,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const precision = precisionProp ?? decimalsOf(step);
    const [uncontrolled, setUncontrolled] = React.useState(() =>
      roundTo(clamp(defaultValue, min, max), precision)
    );
    const value = valueProp ?? uncontrolled;
    // Keeps what the user is typing ("1," or an empty field) until blur.
    const [draft, setDraft] = React.useState<string | null>(null);

    const commit = (next: number) => {
      const clamped = roundTo(clamp(next, min, max), precision);
      if (valueProp === undefined) setUncontrolled(clamped);
      onValueChange?.(clamped);
    };

    const format = (n: number) =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: precision,
        useGrouping: false
      }).format(n);

    const stepBy = (direction: 1 | -1) => {
      setDraft(null);
      commit(value + direction * step);
    };

    const controlSize = size ?? "md";
    const fieldWidth = (
      precision > 0
        ? { sm: "w-16 text-base md:text-sm", md: "w-20 text-base md:text-sm", lg: "w-24 text-base" }
        : { sm: "w-14 text-base md:text-sm", md: "w-16 text-base md:text-sm", lg: "w-20 text-base" }
    )[controlSize];

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
          onClick={() => stepBy(-1)}
        >
          <MinusIcon />
        </Button>
        {/* A text field rather than type="number", which rejects the French
            comma; role="spinbutton" keeps the number semantics. */}
        <input
          ref={ref}
          type="text"
          role="spinbutton"
          inputMode={precision > 0 ? "decimal" : "numeric"}
          autoComplete="off"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={format(value)}
          disabled={disabled}
          value={draft ?? format(value)}
          onChange={(event) => {
            const text = event.target.value;
            // Only digits, a leading minus and, with decimals, one separator
            // followed by at most `precision` digits can be typed.
            const allowed =
              precision > 0 ? new RegExp(`^-?\\d*([.,]\\d{0,${precision}})?$`) : /^-?\d*$/;
            if (!allowed.test(text.replace(/\s/g, ""))) return;
            setDraft(text);
            const parsed = parseDecimal(text);
            if (!Number.isNaN(parsed)) commit(parsed);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) return;
            const keys: Record<string, () => void> = {
              ArrowUp: () => stepBy(1),
              ArrowDown: () => stepBy(-1),
              Home: () => commit(min),
              End: () => commit(max)
            };
            const action = keys[event.key];
            if (action) {
              event.preventDefault();
              setDraft(null);
              action();
            }
          }}
          onBlur={(event) => {
            setDraft(null);
            onBlur?.(event);
          }}
          className={cn(
            "flex rounded-md border border-input bg-background px-2 text-right font-medium tabular-nums ring-offset-background transition-colors duration-fast ease-out-soft hover:bg-accent focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background ",
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
          onClick={() => stepBy(1)}
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
