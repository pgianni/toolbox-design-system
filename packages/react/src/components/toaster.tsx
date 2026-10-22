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

// Apps switch theme with a `dark` class on <html> (next-themes, Storybook),
// not only through the OS setting, so the toasts follow that class.
function useDocumentTheme(): "light" | "dark" {
  const read = () =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  const [theme, setTheme] = React.useState<"light" | "dark">(read);

  React.useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setTheme(read()));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    setTheme(read());
    return () => observer.disconnect();
  }, []);

  return theme;
}

function Toaster({
  className,
  theme,
  position = "bottom-right",
  closeButton = true,
  richColors = true,
  toastOptions,
  offset,
  mobileOffset,
  ...props
}: ToasterProps) {
  const classNames = toastOptions?.classNames;
  const documentTheme = useDocumentTheme();

  return (
    <SonnerToaster
      theme={theme ?? documentTheme}
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
