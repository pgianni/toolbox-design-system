import * as React from "react";
import { cn } from "../lib";
import { Input, type InputProps } from "./input";

// Search field with a leading magnifier and a clear button, replacing the
// "Search icon + Input pl-10" pattern found in five toolbox apps.
// Escape clears the field.

export interface SearchInputProps extends Omit<InputProps, "type" | "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called after the field is cleared with the button or Escape. */
  onClear?: () => void;
  clearLabel?: string;
  /** Class names for the wrapper; `className` goes on the input. */
  wrapperClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      wrapperClassName,
      value: valueProp,
      defaultValue = "",
      onValueChange,
      onClear,
      onChange,
      onKeyDown,
      clearLabel = "Effacer la recherche",
      placeholder = "Rechercher…",
      disabled,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const value = valueProp ?? uncontrolled;

    const update = (next: string) => {
      if (valueProp === undefined) setUncontrolled(next);
      onValueChange?.(next);
    };

    const clear = () => {
      update("");
      onClear?.();
      innerRef.current?.focus();
    };

    return (
      <div className={cn("relative w-full", wrapperClassName)}>
        <SearchIcon />
        <Input
          ref={innerRef}
          type="search"
          role="searchbox"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event);
            update(event.target.value);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.key === "Escape" && value && !event.defaultPrevented) {
              event.preventDefault();
              clear();
            }
          }}
          className={cn(
            "pl-9 [&::-webkit-search-cancel-button]:appearance-none",
            value && "pr-9",
            className
          )}
          {...props}
        />
        {value && !disabled ? (
          <button
            type="button"
            onClick={clear}
            aria-label={clearLabel}
            className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-fast ease-out-soft hover:bg-accent hover:text-foreground active:scale-90 active:bg-primary/10 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export { SearchInput };
