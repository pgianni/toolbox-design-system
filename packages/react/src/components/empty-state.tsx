import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

// Shown when a list or view has nothing to display yet ("Aucun projet",
// "Aucune activité ajoutée"…), with an optional next action.

export const emptyStateVariants = cva(
  "flex w-full flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "gap-2 px-4 py-6",
        md: "gap-3 px-6 py-10"
      },
      bordered: {
        true: "rounded-xl border border-dashed border-border",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      bordered: false
    }
  }
);

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links shown under the text. */
  action?: React.ReactNode;
  /** Heading level of the title, to fit the page outline. */
  titleAs?: "h2" | "h3" | "h4" | "p";
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      size,
      bordered,
      icon,
      title,
      description,
      action,
      titleAs: Title = "h3",
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(emptyStateVariants({ size, bordered }), className)}
      {...props}
    >
      {icon ? (
        <div
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground",
            size === "sm" ? "h-10 w-10 [&_svg]:size-5" : "h-12 w-12 [&_svg]:size-6"
          )}
        >
          {icon}
        </div>
      ) : null}
      <div className="grid max-w-sm gap-1">
        <Title
          className={cn(
            "font-semibold text-foreground",
            size === "sm" ? "text-sm" : "text-base"
          )}
        >
          {title}
        </Title>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      {action ? (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2">{action}</div>
      ) : null}
    </div>
  )
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
