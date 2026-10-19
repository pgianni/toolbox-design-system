import * as React from "react";
import { cn } from "../lib";
import { fieldSizeClassName, type ControlSize } from "./control-sizes";

export type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  /** Height on the shared control scale: sm 36, md 40 (default), lg 44 px. */
  size?: ControlSize;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "md", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex w-full rounded-md border border-input bg-background py-2 ring-offset-background transition-colors duration-fast ease-out-soft hover:bg-accent focus-visible:bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        fieldSizeClassName[size],
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
