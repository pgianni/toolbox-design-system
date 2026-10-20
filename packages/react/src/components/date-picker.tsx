import * as React from "react";
import type { Locale } from "react-day-picker";
import { fr } from "react-day-picker/locale";
import { cn } from "../lib";
import { Calendar, type CalendarProps } from "./calendar";
import { fieldSizeClassName, type ControlSize } from "./control-sizes";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type SingleCalendarProps = Omit<
  Extract<CalendarProps, { mode: "single" }>,
  "mode" | "selected" | "onSelect" | "required" | "locale"
>;

export type DatePickerProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "defaultValue" | "onChange"
> & {
  /** Selected date (controlled). */
  value?: Date;
  /** Initial date (uncontrolled). */
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Text shown while no date is chosen. */
  placeholder?: string;
  /** Height on the shared control scale: sm 36, md 40 (default), lg 44 px. */
  size?: ControlSize;
  /** Calendar language, from `react-day-picker/locale`. French by default. */
  locale?: Locale;
  /** Custom label for the chosen date. Defaults to a long date in the locale. */
  formatDate?: (date: Date) => string;
  /** Extra options for the calendar (disabled days, start/end month…). */
  calendarProps?: SingleCalendarProps;
  /** Popover alignment against the field. */
  align?: "start" | "center" | "end";
};

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      placeholder = "Choisir une date",
      size = "md",
      locale = fr,
      formatDate,
      calendarProps,
      align = "start",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const selected = value !== undefined ? value : uncontrolled;

    const label = selected
      ? formatDate
        ? formatDate(selected)
        : new Intl.DateTimeFormat(locale.code, { dateStyle: "long" }).format(selected)
      : placeholder;

    const handleSelect = (date: Date | undefined) => {
      if (value === undefined) setUncontrolled(date);
      onValueChange?.(date);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            data-placeholder={selected ? undefined : ""}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background py-2 text-left ring-offset-background transition-colors duration-fast ease-out-soft hover:bg-accent active:bg-input focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background disabled:active:bg-background data-[placeholder]:text-muted-foreground",
              fieldSizeClassName[size],
              className
            )}
            {...props}
          >
            <span className="truncate">{label}</span>
            <CalendarIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-auto p-3">
          <Calendar
            {...calendarProps}
            mode="single"
            locale={locale}
            selected={selected}
            defaultMonth={calendarProps?.defaultMonth ?? selected}
            onSelect={handleSelect}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);
DatePicker.displayName = "DatePicker";

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-action-foreground"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
