import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import type { TagTone } from "./tag";

// Inline message (information, success, warning, error). Replaces the
// hand-made tinted callouts found across the toolbox apps; uses the same
// tone tokens as Tag.

export type AlertTone = Exclude<TagTone, "primary">;

export const alertVariants = cva(
  "relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-lg border px-4 py-3 text-sm [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral: "border-neutral-border bg-neutral-soft text-neutral-soft-foreground",
        info: "border-info-border bg-info-soft text-info-soft-foreground",
        success: "border-success-border bg-success-soft text-success-soft-foreground",
        warning: "border-warning-border bg-warning-soft text-warning-soft-foreground",
        danger: "border-danger-border bg-danger-soft text-danger-soft-foreground"
      }
    },
    defaultVariants: {
      tone: "info"
    }
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Replaces the default tone icon. Pass `null` to show no icon. */
  icon?: React.ReactNode;
  /** Shows a close button. */
  onDismiss?: () => void;
  dismissLabel?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, tone, icon, onDismiss, dismissLabel = "Fermer", role, children, ...props },
    ref
  ) => {
    const resolvedTone = tone ?? "info";
    const shownIcon = icon === undefined ? <ToneIcon tone={resolvedTone} /> : icon;

    return (
      <div
        ref={ref}
        // Warnings and errors are announced right away; the others politely.
        role={role ?? (resolvedTone === "danger" || resolvedTone === "warning" ? "alert" : "status")}
        className={cn(
          alertVariants({ tone }),
          !shownIcon && "grid-cols-1",
          onDismiss && "pr-10",
          className
        )}
        {...props}
      >
        {shownIcon}
        <div className={cn("grid gap-1", shownIcon ? "col-start-2" : "col-start-1")}>
          {children}
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full opacity-70 transition-[opacity,background-color] duration-fast ease-out-soft hover:bg-black/10 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-white/15 [&_svg]:size-3.5"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("font-semibold leading-5", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("leading-5 opacity-90 [&_a]:font-medium [&_a]:underline", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

const tonePaths: Record<AlertTone, React.ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  neutral: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  warning: (
    <>
      <path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  danger: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </>
  )
};

function ToneIcon({ tone }: { tone: AlertTone }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {tonePaths[tone]}
    </svg>
  );
}

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

export { Alert, AlertTitle, AlertDescription };
