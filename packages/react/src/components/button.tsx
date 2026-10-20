import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { warnDeprecated } from "../deprecation";

// Disabled buttons keep pointer events (for the not-allowed cursor) and cancel
// their hover and press styles with `disabled:` resets. These stay plain
// `hover:` classes so an app's className override (e.g. hover:text-foreground)
// still wins through tailwind-merge.
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-[color,background-color,border-color,transform] duration-fast ease-out-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5 disabled:hover:bg-primary",
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5 disabled:hover:bg-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:translate-y-0.5 disabled:hover:bg-destructive",
        secondary:
          "border border-input bg-background text-action-foreground hover:bg-accent hover:text-action-foreground active:translate-y-0.5 disabled:hover:bg-background",
        // No border or background at rest; the icon is a lighter grey than the label.
        tertiary:
          "border border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground active:translate-y-0.5 disabled:hover:bg-transparent disabled:hover:text-inherit [&_svg]:text-muted-foreground",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:translate-y-0.5 disabled:hover:bg-background disabled:hover:text-inherit",
        ghost:
          "text-action-foreground hover:bg-accent hover:text-action-foreground active:translate-y-0.5 disabled:hover:bg-transparent",
        link: "text-action-foreground underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 active:translate-y-0.5",
        brand: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5",
        purple: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5",
        save: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5",
        "brand-outline":
          "border border-input bg-background text-action-foreground hover:bg-accent hover:text-action-foreground active:translate-y-0.5",
        "brand-ghost": "rounded-full text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
        "icon-xs": "h-6 w-6 p-0 [&_svg]:size-3",
        "icon-sm": "h-8 w-8 p-0 [&_svg]:size-4",
        "icon-md": "h-9 w-9 p-0 [&_svg]:size-4",
        "icon-lg": "h-11 w-11 p-0 [&_svg]:size-5"
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none"
      },
      // Square icon-only button of the same height as the size (sm, md, lg).
      iconOnly: {
        true: "px-0 py-0",
        false: null
      },
      // Red treatment for destructive actions, combined with any variant.
      danger: {
        true: null,
        false: null
      }
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", className: "w-9" },
      { iconOnly: true, size: ["md", "default"], className: "w-10" },
      { iconOnly: true, size: "lg", className: "w-11 [&_svg]:size-5" },
      {
        variant: ["primary", "default", "brand", "purple", "save"],
        danger: true,
        className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:hover:bg-destructive"
      },
      {
        // red-600 / red-400 keep the label readable in both themes.
        variant: ["secondary", "brand-outline", "outline"],
        danger: true,
        className:
          "border-red-600/40 text-red-600 hover:bg-red-600/10 hover:text-red-600 dark:border-red-400/40 dark:text-red-400 dark:hover:bg-red-400/10 dark:hover:text-red-400 disabled:hover:text-red-600 dark:disabled:hover:text-red-400"
      },
      {
        variant: ["tertiary", "ghost", "brand-ghost"],
        danger: true,
        className:
          "text-red-600 hover:bg-red-600/10 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-400/10 dark:hover:text-red-400 disabled:hover:text-red-600 dark:disabled:hover:text-red-400 [&_svg]:text-current"
      },
      {
        variant: "link",
        danger: true,
        className: "text-red-600 dark:text-red-400"
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill",
      iconOnly: false,
      danger: false
    }
  }
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

/**
 * Legacy variants kept for compatibility, with what to use instead. They still
 * render as before and log a warning in development; they will be removed in
 * the next major version.
 */
export const deprecatedButtonVariants: Partial<Record<ButtonVariant, string>> = {
  default: 'variant="primary"',
  brand: 'variant="primary"',
  purple: 'variant="primary"',
  save: 'variant="primary"',
  gradient: 'variant="primary"',
  destructive: 'variant="primary" danger',
  "brand-outline": 'variant="secondary"',
  "brand-ghost": 'variant="ghost"'
};

export function warnDeprecatedButtonVariant(variant: ButtonVariant | null | undefined) {
  const replacement = variant ? deprecatedButtonVariants[variant] : undefined;
  if (replacement) {
    warnDeprecated(`La variante de bouton "${variant}" est dépréciée : utilisez ${replacement}.`);
  }
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, danger, iconOnly, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    warnDeprecatedButtonVariant(variant);

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape, danger, iconOnly }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
