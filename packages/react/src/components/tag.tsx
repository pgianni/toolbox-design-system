import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { navItemPressClassName } from "./nav-item-styles";

// Tags label things (status, category, severity, filter). They gather the
// patterns found across the toolbox apps: Audit's soft feedback badges,
// Userflow's severities, Impact's domains, UX Team's removable filter chips
// and the Design Hub's filter buttons with counts.

export type TagTone = "neutral" | "primary" | "info" | "success" | "warning" | "danger";
export type TagAppearance = "soft" | "solid" | "outline";

// Written out in full so Tailwind finds every class. Soft tags keep a
// transparent border so every appearance has the same size.
const toneClassNames: Record<TagAppearance, Record<TagTone, string>> = {
  soft: {
    neutral: "border-transparent bg-neutral-soft text-neutral-soft-foreground",
    primary: "border-transparent bg-primary/10 text-action-foreground dark:bg-action-foreground/10",
    info: "border-transparent bg-info-soft text-info-soft-foreground",
    success: "border-transparent bg-success-soft text-success-soft-foreground",
    warning: "border-transparent bg-warning-soft text-warning-soft-foreground",
    danger: "border-transparent bg-danger-soft text-danger-soft-foreground"
  },
  solid: {
    neutral: "border-transparent bg-neutral text-neutral-foreground",
    primary: "border-transparent bg-primary text-primary-foreground",
    info: "border-transparent bg-info text-info-foreground",
    success: "border-transparent bg-success text-success-foreground",
    warning: "border-transparent bg-warning text-warning-foreground",
    danger: "border-transparent bg-danger text-danger-foreground"
  },
  outline: {
    neutral: "border-neutral-border bg-transparent text-neutral-soft-foreground",
    primary: "border-primary/40 bg-transparent text-action-foreground dark:border-action-foreground/40",
    info: "border-info-border bg-transparent text-info-soft-foreground",
    success: "border-success-border bg-transparent text-success-soft-foreground",
    warning: "border-warning-border bg-transparent text-warning-soft-foreground",
    danger: "border-danger-border bg-transparent text-danger-soft-foreground"
  }
};

export const tagVariants = cva(
  "inline-flex max-w-full shrink-0 items-center gap-1 whitespace-nowrap rounded-full border font-medium transition-colors duration-fast ease-out-soft [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral: "",
        primary: "",
        info: "",
        success: "",
        warning: "",
        danger: ""
      },
      appearance: {
        soft: "",
        solid: "",
        outline: ""
      },
      size: {
        // A leading icon sits closer to the edge, so the left padding shrinks.
        sm: "h-5 px-2 text-[11px] [&_svg]:size-3 has-[>span>svg:first-child]:pl-1.5",
        md: "h-6 px-2.5 text-xs [&_svg]:size-3.5 has-[>span>svg:first-child]:pl-1.5"
      }
    },
    compoundVariants: (Object.keys(toneClassNames) as TagAppearance[]).flatMap(
      (appearance) =>
        (Object.keys(toneClassNames[appearance]) as TagTone[]).map((tone) => ({
          appearance,
          tone,
          className: toneClassNames[appearance][tone]
        }))
    ),
    defaultVariants: {
      tone: "neutral",
      appearance: "soft",
      size: "md"
    }
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Shows a remove button at the end of the tag. */
  onRemove?: () => void;
  /** Accessible name of the remove button. Defaults to "Retirer {label}". */
  removeLabel?: string;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    { className, tone, appearance, size, onRemove, removeLabel, children, ...props },
    ref
  ) => {
    const label =
      removeLabel ??
      (typeof children === "string" ? `Retirer ${children}` : "Retirer");

    return (
      <span
        ref={ref}
        className={cn(tagVariants({ tone, appearance, size }), onRemove && "pr-1", className)}
        {...props}
      >
        <span className="inline-flex min-w-0 items-center gap-1 truncate">{children}</span>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={label}
            className="-my-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full opacity-70 transition-[opacity,background-color] duration-fast ease-out-soft hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/15 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3"
          >
            <CloseIcon />
          </button>
        ) : null}
      </span>
    );
  }
);
Tag.displayName = "Tag";

export const tagToggleVariants = cva(
  cn(
    "inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-xs font-medium ring-offset-background transition-[color,background-color,border-color,transform] duration-fast ease-out-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_img]:size-4 [&_img]:shrink-0 [&_img]:object-contain [&_svg]:size-4 [&_svg]:shrink-0",
    navItemPressClassName
  ),
  {
    variants: {
      // Same purple selection as the tabs and the header navigation.
      pressed: {
        true: "border-primary/40 bg-primary/10 text-action-foreground hover:bg-primary/15 active:bg-primary/20",
        false: "border-input bg-background text-foreground hover:bg-accent active:bg-primary/10"
      }
    },
    defaultVariants: {
      pressed: false
    }
  }
);

export interface TagToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  /** Number shown in a small counter after the label (e.g. matching items). */
  count?: number;
}

/** A filter tag that can be switched on and off. */
const TagToggle = React.forwardRef<HTMLButtonElement, TagToggleProps>(
  (
    {
      className,
      pressed: pressedProp,
      defaultPressed = false,
      onPressedChange,
      count,
      onClick,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const [uncontrolledPressed, setUncontrolledPressed] = React.useState(defaultPressed);
    const pressed = pressedProp ?? uncontrolledPressed;

    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        className={cn(tagToggleVariants({ pressed }), className)}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) {
            return;
          }
          if (pressedProp === undefined) {
            setUncontrolledPressed(!pressed);
          }
          onPressedChange?.(!pressed);
        }}
        {...props}
      >
        {children}
        {count !== undefined ? (
          <span
            className={cn(
              "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold leading-4 transition-colors duration-fast ease-out-soft",
              pressed ? "bg-primary/15 text-action-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {count}
          </span>
        ) : null}
      </button>
    );
  }
);
TagToggle.displayName = "TagToggle";

export type TagGroupProps = React.HTMLAttributes<HTMLDivElement>;

/** Wraps tags or tag toggles on several lines. Give it an aria-label for filters. */
const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  ({ className, role = "group", ...props }, ref) => (
    <div
      ref={ref}
      role={role}
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
);
TagGroup.displayName = "TagGroup";

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export { Tag, TagToggle, TagGroup };
