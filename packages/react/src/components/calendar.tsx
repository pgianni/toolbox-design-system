import * as React from "react";
import { DayPicker, type DayButtonProps, type ChevronProps } from "react-day-picker";
import { fr } from "react-day-picker/locale";
import { cn } from "../lib";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CalendarChevron({ orientation = "left", className }: ChevronProps) {
  const path = {
    left: "m15 18-6-6 6-6",
    right: "m9 18 6-6-6-6",
    up: "m18 15-6-6-6 6",
    down: "m6 9 6 6 6-6"
  }[orientation];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
    >
      <path d={path} />
    </svg>
  );
}

// Day states are resolved here from the modifiers, so every class stays literal.
function CalendarDayButton({ day: _day, modifiers, className, ...props }: DayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const inRange = modifiers.range_middle;
  const selected = modifiers.selected && !inRange;

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm font-normal tabular-nums ring-offset-background transition-[color,background-color,transform] duration-fast ease-out-soft hover:bg-accent active:scale-95 active:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none",
        modifiers.outside && "text-muted-foreground/60",
        modifiers.today && !selected && "font-semibold text-action-foreground",
        inRange && "bg-primary/10 text-foreground hover:bg-primary/15",
        selected &&
          "bg-primary font-medium text-primary-foreground hover:bg-primary/90 active:bg-primary",
        modifiers.disabled &&
          "cursor-not-allowed opacity-40 hover:bg-transparent active:scale-100 active:bg-transparent",
        className
      )}
      {...props}
    />
  );
}

const navButtonClassName = cn(
  buttonVariants({ variant: "outline", size: "icon-sm" }),
  "absolute top-0 z-10 rounded-lg text-muted-foreground hover:text-foreground aria-disabled:pointer-events-none aria-disabled:opacity-40"
);

/**
 * Month grid built on react-day-picker. French by default; pass `locale` from
 * `react-day-picker/locale` for another language.
 */
function Calendar({
  className,
  classNames,
  components,
  showOutsideDays = true,
  locale = fr,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      navLayout="around"
      className={cn("w-fit p-1", className)}
      classNames={{
        months: "relative flex flex-col gap-6 sm:flex-row",
        month: "relative flex flex-col gap-3",
        month_caption: "flex h-8 items-center justify-center px-10",
        caption_label: "text-sm font-semibold capitalize",
        button_previous: cn(navButtonClassName, "left-0"),
        button_next: cn(navButtonClassName, "right-0"),
        month_grid: "border-collapse",
        weekdays: "flex gap-1",
        weekday: "w-9 pb-1 text-center text-[0.8rem] font-normal capitalize text-muted-foreground",
        weeks: "flex flex-col gap-1",
        week: "flex gap-1",
        day: "p-0 text-center",
        hidden: "invisible",
        ...classNames
      }}
      components={{
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        ...components
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
