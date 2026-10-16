import * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { cn } from "../lib";

export type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

function Toaster({
  className,
  theme = "system",
  position = "bottom-right",
  closeButton = true,
  richColors = true,
  toastOptions,
  ...props
}: ToasterProps) {
  const classNames = toastOptions?.classNames;

  return (
    <SonnerToaster
      theme={theme}
      position={position}
      closeButton={closeButton}
      richColors={richColors}
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
