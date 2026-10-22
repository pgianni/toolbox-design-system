import * as React from "react";
import { cn } from "../lib";
import { fieldSizeClassName, type ControlSize } from "./control-sizes";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type TimePickerProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "defaultValue" | "onChange"
> & {
  /** Selected time as "HH:mm" (controlled). */
  value?: string;
  /** Initial time as "HH:mm" (uncontrolled). */
  defaultValue?: string;
  onValueChange?: (time: string) => void;
  /** Text shown while no time is chosen. */
  placeholder?: string;
  /** Height on the shared control scale: sm 36, md 40 (default), lg 44 px. */
  size?: ControlSize;
  /** Gap between proposed minutes. Defaults to 5. */
  minuteStep?: number;
  /** First and last hours offered, e.g. 8 and 19 for office hours. */
  minHour?: number;
  maxHour?: number;
  /** Accessible names of the two columns. */
  hoursLabel?: string;
  minutesLabel?: string;
  /** Popover alignment against the field. */
  align?: "start" | "center" | "end";
};

const pad = (n: number) => String(n).padStart(2, "0");

function parseTime(time: string | undefined) {
  const match = time?.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return undefined;
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

export const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      placeholder = "Choisir une heure",
      size = "md",
      minuteStep = 5,
      minHour = 0,
      maxHour = 23,
      hoursLabel = "Heures",
      minutesLabel = "Minutes",
      align = "start",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const current = parseTime(value !== undefined ? value : uncontrolled);

    const hours = React.useMemo(
      () => Array.from({ length: maxHour - minHour + 1 }, (_, i) => minHour + i),
      [minHour, maxHour]
    );
    const minutes = React.useMemo(() => {
      const list = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);
      // Keep an off-step minute (e.g. 09:07) visible so the current value stays selected.
      if (current && !list.includes(current.minute)) {
        list.push(current.minute);
        list.sort((a, b) => a - b);
      }
      return list;
    }, [minuteStep, current?.minute]);

    const commit = (hour: number, minute: number) => {
      const next = `${pad(hour)}:${pad(minute)}`;
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(next);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            data-placeholder={current ? undefined : ""}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background py-2 text-left tabular-nums ring-offset-background transition-colors duration-fast ease-out-soft hover:bg-accent active:bg-input focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background disabled:active:bg-background data-[placeholder]:text-muted-foreground",
              fieldSizeClassName[size],
              className
            )}
            {...props}
          >
            <span className="truncate">
              {current ? `${pad(current.hour)}:${pad(current.minute)}` : placeholder}
            </span>
            <ClockIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          className="w-auto p-1.5"
          onOpenAutoFocus={(event) => {
            // Focus the selected hour (or the first one) instead of the panel.
            event.preventDefault();
            const target = event.currentTarget as HTMLElement;
            const option =
              target.querySelector<HTMLElement>('[data-column="hours"] [aria-selected="true"]') ??
              target.querySelector<HTMLElement>('[data-column="hours"] [role="option"]');
            option?.focus({ preventScroll: true });
          }}
        >
          <div className="flex gap-1">
            <TimeColumn
              column="hours"
              label={hoursLabel}
              items={hours}
              selected={current?.hour}
              onSelect={(hour) => commit(hour, current?.minute ?? 0)}
            />
            <div aria-hidden="true" className="w-px self-stretch bg-border" />
            <TimeColumn
              column="minutes"
              label={minutesLabel}
              items={minutes}
              selected={current?.minute}
              onSelect={(minute) => {
                commit(current?.hour ?? hours[0], minute);
                setOpen(false);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
TimePicker.displayName = "TimePicker";

interface TimeColumnProps {
  column: "hours" | "minutes";
  label: string;
  items: number[];
  selected?: number;
  onSelect: (item: number) => void;
}

function TimeColumn({ column, label, items, selected, onSelect }: TimeColumnProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  // Brings the selected value to the middle of the column when it opens.
  React.useLayoutEffect(() => {
    const list = listRef.current;
    const option = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (list && option) {
      list.scrollTop = option.offsetTop - list.clientHeight / 2 + option.offsetHeight / 2;
    }
  }, []);

  const focusableIndex = Math.max(0, items.indexOf(selected ?? items[0]));

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const options = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="option"]')
    );
    const index = options.indexOf(document.activeElement as HTMLElement);
    const next = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: options.length - 1
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    options[Math.min(options.length - 1, Math.max(0, next))]?.focus();
  };

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label={label}
      data-column={column}
      onKeyDown={handleKeyDown}
      className="relative flex max-h-64 w-16 flex-col gap-0.5 overflow-y-auto overscroll-contain p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item, index) => {
        const isSelected = item === selected;
        return (
          <button
            key={item}
            type="button"
            role="option"
            aria-selected={isSelected}
            tabIndex={index === focusableIndex ? 0 : -1}
            onClick={() => onSelect(item)}
            className={cn(
              "flex h-9 w-full shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm tabular-nums ring-offset-background transition-[color,background-color,transform] duration-fast ease-out-soft hover:bg-accent active:scale-95 active:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none",
              isSelected &&
                "bg-primary font-medium text-primary-foreground hover:bg-primary/90 active:bg-primary"
            )}
          >
            {pad(item)}
          </button>
        );
      })}
    </div>
  );
}

function ClockIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
