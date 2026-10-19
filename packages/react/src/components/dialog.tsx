import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { Button } from "./button";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const dialogContentVariants = cva(
  "fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background text-foreground shadow-lg outline-none data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "max-w-[28rem]",
        md: "max-w-[32rem]",
        lg: "max-w-[42rem]",
        xl: "max-w-[48rem]",
        "2xl": "max-w-[56rem]",
        full: "h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)]"
      },
      variant: {
        default: "grid gap-4 overflow-y-auto p-6",
        sectioned: "flex flex-col gap-0 overflow-hidden p-0",
        chromeless:
          "grid gap-0 overflow-hidden border-0 bg-transparent p-0 shadow-none"
      },
      fixedSections: {
        true: "flex flex-col overflow-hidden",
        false: null
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      fixedSections: false
    }
  }
);

// Shared with AlertDialog so both overlays look the same. Open/close use CSS
// animations rather than transitions: Radix waits for animations before unmounting.
export const dialogOverlayClassName =
  "fixed inset-0 z-50 bg-slate-200/70 dark:bg-slate-800/70 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out motion-reduce:animate-none";
export const dialogHeaderClassName = "flex flex-col gap-1.5 text-center sm:text-left";
export const dialogFooterClassName =
  "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end";
export const dialogTitleClassName =
  "text-lg font-semibold leading-none tracking-tight";
export const dialogDescriptionClassName = "text-sm text-muted-foreground";

type DialogLayoutContextValue = {
  variant: NonNullable<VariantProps<typeof dialogContentVariants>["variant"]>;
  fixedSections: boolean;
};

const DialogLayoutContext = React.createContext<DialogLayoutContextValue>({
  variant: "default",
  fixedSections: false
});

export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(dialogOverlayClassName, className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  overlayClassName?: string;
  showClose?: boolean;
  closeLabel?: string;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size,
      variant,
      fixedSections = false,
      overlayClassName,
      showClose = true,
      closeLabel = "Fermer",
      ...props
    },
    ref
  ) => {
    const normalizedVariant = variant ?? "default";
    const hasFixedSections = fixedSections || normalizedVariant === "sectioned";

    return (
      <DialogPortal>
        <DialogOverlay className={overlayClassName} />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            dialogContentVariants({
              size,
              variant: normalizedVariant,
              fixedSections: hasFixedSections
            }),
            className
          )}
          {...props}
        >
          <DialogLayoutContext.Provider
            value={{ variant: normalizedVariant, fixedSections: hasFixedSections }}
          >
            {children}
          </DialogLayoutContext.Provider>
          {showClose ? (
            <DialogPrimitive.Close asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="absolute right-4 top-4"
                aria-label={closeLabel}
              >
                <CloseIcon />
              </Button>
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { variant, fixedSections } = React.useContext(DialogLayoutContext);

  return (
    <div
      className={cn(
        dialogHeaderClassName,
        fixedSections && "shrink-0",
        variant === "sectioned" && "border-b px-6 py-5 pr-16",
        className
      )}
      {...props}
    />
  );
}
DialogHeader.displayName = "DialogHeader";

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, ...props }, ref) => {
    const { variant, fixedSections } = React.useContext(DialogLayoutContext);

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-0",
          fixedSections && "flex-1 overflow-y-auto",
          variant === "sectioned" && "px-6 py-5",
          className
        )}
        {...props}
      />
    );
  }
);
DialogBody.displayName = "DialogBody";

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { variant, fixedSections } = React.useContext(DialogLayoutContext);

  return (
    <div
      className={cn(
        dialogFooterClassName,
        fixedSections && "shrink-0",
        variant === "sectioned" && "border-t px-6 py-4",
        className
      )}
      {...props}
    />
  );
}
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(dialogTitleClassName, className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(dialogDescriptionClassName, className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants
};
