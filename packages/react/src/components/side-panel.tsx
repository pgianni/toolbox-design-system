import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { Button } from "./button";
import {
  dialogDescriptionClassName,
  dialogTitleClassName
} from "./dialog";

// Floating panel docked to the right, ported from the UX Team staffing panel.
// The slide and fade animations rely on the toolbox Tailwind preset keyframes.

type SidePanelContextValue = {
  nonBlocking: boolean;
};

const SidePanelContext = React.createContext<SidePanelContextValue>({
  nonBlocking: false
});

export interface SidePanelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, "modal"> {
  /** Keeps the page usable behind the panel: no overlay, no focus trap. */
  nonBlocking?: boolean;
}

function SidePanel({ nonBlocking = false, ...props }: SidePanelProps) {
  return (
    <SidePanelContext.Provider value={{ nonBlocking }}>
      <DialogPrimitive.Root modal={!nonBlocking} {...props} />
    </SidePanelContext.Provider>
  );
}
SidePanel.displayName = "SidePanel";

const SidePanelTrigger = DialogPrimitive.Trigger;
const SidePanelClose = DialogPrimitive.Close;
const SidePanelPortal = DialogPrimitive.Portal;

const sidePanelOverlayVariants = cva(
  "fixed inset-x-0 bottom-0 z-50 bg-slate-200/70 dark:bg-slate-800/70 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in motion-reduce:animate-none",
  {
    variants: {
      inset: {
        header: "top-12",
        none: "top-0"
      }
    },
    defaultVariants: {
      inset: "header"
    }
  }
);

export const sidePanelContentVariants = cva(
  "fixed bottom-3 right-3 z-50 flex max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[24px] border border-border bg-background text-foreground shadow-xl outline-none data-[state=closed]:animate-side-panel-out data-[state=open]:animate-side-panel-in motion-reduce:animate-none",
  {
    variants: {
      size: {
        default: "w-[508px]",
        wide: "w-[748px]"
      },
      // "header" leaves room for the compact AppHeader (h-12).
      inset: {
        header: "top-[calc(3rem+12px)]",
        none: "top-3"
      }
    },
    defaultVariants: {
      size: "default",
      inset: "header"
    }
  }
);

export interface SidePanelContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sidePanelContentVariants> {
  /** Extra buttons shown next to the close button. */
  actions?: React.ReactNode;
  overlayClassName?: string;
  showClose?: boolean;
  closeLabel?: string;
}

const SidePanelContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SidePanelContentProps
>(
  (
    {
      className,
      children,
      size,
      inset,
      actions,
      overlayClassName,
      showClose = true,
      closeLabel = "Fermer",
      onInteractOutside,
      ...props
    },
    ref
  ) => {
    const { nonBlocking } = React.useContext(SidePanelContext);

    return (
      <SidePanelPortal>
        {nonBlocking ? null : (
          <DialogPrimitive.Overlay
            className={cn(sidePanelOverlayVariants({ inset }), overlayClassName)}
          />
        )}
        <DialogPrimitive.Content
          ref={ref}
          className={cn(sidePanelContentVariants({ size, inset }), className)}
          onInteractOutside={(event) => {
            onInteractOutside?.(event);
            if (nonBlocking) {
              event.preventDefault();
            }
          }}
          {...props}
        >
          {children}
          {actions || showClose ? (
            <div className="absolute right-4 top-4 z-10 flex h-8 items-center gap-1">
              {actions}
              {showClose ? (
                <DialogPrimitive.Close asChild>
                  <Button variant="outline" size="icon-sm" aria-label={closeLabel}>
                    <CloseIcon />
                  </Button>
                </DialogPrimitive.Close>
              ) : null}
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </SidePanelPortal>
    );
  }
);
SidePanelContent.displayName = "SidePanelContent";

function SidePanelHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-1.5 border-b border-border px-6 py-5 pr-14",
        className
      )}
      {...props}
    />
  );
}
SidePanelHeader.displayName = "SidePanelHeader";

const SidePanelBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-h-0 flex-1 overflow-y-auto px-6 py-5", className)}
    {...props}
  />
));
SidePanelBody.displayName = "SidePanelBody";

function SidePanelFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col-reverse gap-2 border-t border-border bg-background px-6 py-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}
SidePanelFooter.displayName = "SidePanelFooter";

const SidePanelTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(dialogTitleClassName, className)}
    {...props}
  />
));
SidePanelTitle.displayName = "SidePanelTitle";

const SidePanelDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(dialogDescriptionClassName, className)}
    {...props}
  />
));
SidePanelDescription.displayName = "SidePanelDescription";

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
  SidePanel,
  SidePanelTrigger,
  SidePanelClose,
  SidePanelPortal,
  SidePanelContent,
  SidePanelHeader,
  SidePanelBody,
  SidePanelFooter,
  SidePanelTitle,
  SidePanelDescription
};
