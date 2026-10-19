import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { navItemPressClassName } from "./nav-item-styles";

// Large selectable choice with an illustration, label and helper text, from
// UX Method's questionnaire (OptionButton). Built on a radio group so the
// chosen option is announced and arrow keys move between options.

const OptionCardGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2 sm:grid-cols-3", className)}
    {...props}
  />
));
OptionCardGroup.displayName = "OptionCardGroup";

export const optionCardVariants = cva(
  cn(
    "group relative flex min-w-0 cursor-pointer items-center gap-4 rounded-xl border border-border bg-background p-3 text-left text-foreground ring-offset-background transition-[color,background-color,border-color,transform] duration-fast ease-out-soft hover:bg-accent active:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary/40 data-[state=checked]:bg-primary/10 data-[state=checked]:text-action-foreground data-[state=checked]:hover:bg-primary/15",
    navItemPressClassName
  ),
  {
    variants: {
      // Stacked from `sm` up, like the questionnaire grid; side by side on mobile.
      layout: {
        responsive: "flex-row sm:flex-col sm:gap-3 sm:text-center",
        horizontal: "flex-row",
        vertical: "flex-col gap-3 text-center"
      }
    },
    defaultVariants: {
      layout: "responsive"
    }
  }
);

export interface OptionCardProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof optionCardVariants> {
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Icon shown in a round badge. */
  icon?: React.ReactNode;
  /** Illustration URL, shown instead of the icon. */
  image?: string;
  /** `lg` shows the illustration at 112 px, without the round badge. */
  imageSize?: "md" | "lg";
}

const OptionCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  OptionCardProps
>(
  (
    { className, layout, label, description, icon, image, imageSize = "md", ...props },
    ref
  ) => {
    const stacked = layout !== "horizontal";

    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(optionCardVariants({ layout }), className)}
        {...props}
      >
        {image && imageSize === "lg" ? (
          <img src={image} alt="" className="h-28 w-28 shrink-0 object-contain" />
        ) : image || icon ? (
          <span
            aria-hidden="true"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-fast ease-out-soft group-data-[state=checked]:bg-background group-data-[state=checked]:text-action-foreground [&_img]:h-9 [&_img]:w-9 [&_img]:object-contain [&_svg]:size-7"
          >
            {image ? <img src={image} alt="" /> : icon}
          </span>
        ) : null}
        <span
          className={cn(
            "flex min-w-0 flex-col gap-0.5",
            stacked && layout !== "responsive" && "items-center",
            layout === "responsive" && "sm:items-center"
          )}
        >
          <span className="break-words text-sm font-medium">{label}</span>
          {description ? (
            <span className="text-xs text-muted-foreground group-data-[state=checked]:text-action-foreground/80">
              {description}
            </span>
          ) : null}
        </span>
        <RadioGroupPrimitive.Indicator
          aria-hidden="true"
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground animate-pop-in motion-reduce:animate-none [&_svg]:size-3"
        >
          <CheckIcon />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  }
);
OptionCard.displayName = "OptionCard";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export { OptionCardGroup, OptionCard };
