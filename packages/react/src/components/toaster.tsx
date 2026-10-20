import * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { cn } from "../lib";

export type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

type Offset = ToasterProps["offset"];

// Lifts bottom toasts above MobileBottomNav, which publishes its visible
// height in --toolbox-bottom-nav-height (0px or unset when it is hidden).
function aboveBottomNav(offset: Offset, base: string): Offset {
  const bottom = `calc(var(--toolbox-bottom-nav-height, 0px) + ${base})`;
  if (offset === undefined) return { bottom };
  if (typeof offset === "object" && offset.bottom === undefined) return { ...offset, bottom };
  return offset;
}

function Toaster({
  className,
  theme = "system",
  position = "bottom-right",
  closeButton = true,
  richColors = true,
  toastOptions,
  offset,
  mobileOffset,
  ...props
}: ToasterProps) {
  const classNames = toastOptions?.classNames;

  return (
    <SonnerToaster
      theme={theme}
      position={position}
      closeButton={closeButton}
      richColors={richColors}
      offset={aboveBottomNav(offset, "24px")}
      mobileOffset={aboveBottomNav(mobileOffset, "16px")}
      className={cn("toaster group", className)}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...classNames,
          toast: cn(
            "group toast border bg-background text-foreground shadow-lg",
            classNames?.toast
          ),
          title: cn("font-semibold", classNames?.title),
          description: cn("text-muted-foreground", classNames?.description),
          actionButton: cn(
            "rounded-full bg-primary px-3 text-primary-foreground",
            classNames?.actionButton
          ),
          cancelButton: cn(
            "rounded-full bg-muted px-3 text-muted-foreground",
            classNames?.cancelButton
          ),
          closeButton: cn(
            "border bg-background text-foreground",
            classNames?.closeButton
          )
        }
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
