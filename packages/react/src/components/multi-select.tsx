import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../lib";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { fieldSizeClassName, type ControlSize } from "./control-sizes";

export interface MultiSelectOption {
  value: string;
  label: string;
  /** Picture shown left of the label (a person's photo, a logo…). */
  avatarSrc?: string;
  /** Fallback inside the avatar when there is no picture. Defaults to the initials. */
  avatarFallback?: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  /** Selected values (controlled). An empty list means "all". */
  value?: string[];
  /** Initial selection (uncontrolled). */
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /**
   * First entry that clears the selection, e.g. "Tous". Shown in the field when
   * nothing is selected. Set to `null` to hide it and show `placeholder` instead.
   */
  allLabel?: string | null;
  /** Field text when nothing is selected and there is no `allLabel`. */
  placeholder?: string;
  /** Height on the shared control scale: sm 36, md 40 (default), lg 44 px. */
  size?: ControlSize;
  /** Avatars stacked in the field before a "+N" counter. */
  maxAvatars?: number;
  disabled?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

function initials(label: string) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function OptionAvatar({ option, className }: { option: MultiSelectOption; className?: string }) {
  return (
    <Avatar className={cn("h-6 w-6 shrink-0", className)}>
      {option.avatarSrc ? <AvatarImage src={option.avatarSrc} alt="" /> : null}
      <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-action-foreground">
        {option.avatarFallback ?? initials(option.label)}
      </AvatarFallback>
    </Avatar>
  );
}

const itemClassName =
  "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-8 text-sm outline-none transition-colors duration-fast ease-out-soft focus:bg-accent focus:text-accent-foreground active:bg-primary/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:font-medium data-[state=checked]:text-action-foreground";

/**
 * Select that keeps several values, with an optional picture per option.
 * The field shows the chosen pictures stacked and the names separated by commas.
 */
export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value,
      defaultValue = [],
      onValueChange,
      allLabel = "Tous",
      placeholder = "Sélectionner",
      size = "md",
      maxAvatars = 3,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const selected = value ?? uncontrolled;

    const setSelected = (next: string[]) => {
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(next);
    };

    const toggle = (optionValue: string, checked: boolean) =>
      setSelected(
        checked
          ? options.filter((o) => o.value === optionValue || selected.includes(o.value)).map((o) => o.value)
          : selected.filter((v) => v !== optionValue)
      );

    const selectedOptions = options.filter((option) => selected.includes(option.value));
    const shownAvatars = selectedOptions.slice(0, maxAvatars);
    const hiddenCount = selectedOptions.length - shownAvatars.length;
    const hasAvatars = options.some((option) => option.avatarSrc || option.avatarFallback);
    const emptyLabel = allLabel ?? placeholder;

    // Keeps the menu open while picking several options.
    const keepOpen = (event: Event) => event.preventDefault();

    return (
      <DropdownMenuPrimitive.Root modal={false}>
        <DropdownMenuPrimitive.Trigger asChild disabled={disabled}>
          <button
            ref={ref}
            type="button"
            data-placeholder={selectedOptions.length === 0 && allLabel == null ? "" : undefined}
            className={cn(
              "group flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background py-2 text-left ring-offset-background transition-colors duration-fast ease-out-soft hover:bg-accent active:bg-input focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background disabled:active:bg-background data-[placeholder]:text-muted-foreground",
              fieldSizeClassName[size],
              className
            )}
            {...props}
          >
            <span className="flex min-w-0 items-center gap-2">
              {hasAvatars && shownAvatars.length > 0 ? (
                <span className="flex shrink-0 -space-x-1.5">
                  {shownAvatars.map((option) => (
                    <OptionAvatar
                      key={option.value}
                      option={option}
                      className="h-6 w-6 ring-2 ring-background"
                    />
                  ))}
                  {hiddenCount > 0 ? (
                    <span className="relative flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-semibold text-muted-foreground ring-2 ring-background">
                      +{hiddenCount}
                    </span>
                  ) : null}
                </span>
              ) : null}
              <span className="truncate">
                {selectedOptions.length > 0
                  ? selectedOptions.map((option) => option.label).join(", ")
                  : emptyLabel}
              </span>
            </span>
            <ChevronIcon />
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="start"
            sideOffset={6}
            className="z-50 max-h-[min(var(--radix-dropdown-menu-content-available-height),20rem)] w-[var(--radix-dropdown-menu-trigger-width)] min-w-48 overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-md outline-none origin-[--radix-dropdown-menu-content-transform-origin] data-[state=open]:animate-menu-in data-[state=closed]:animate-menu-out motion-reduce:animate-none"
          >
            {allLabel != null ? (
              <>
                <DropdownMenuPrimitive.CheckboxItem
                  checked={selected.length === 0}
                  onCheckedChange={() => setSelected([])}
                  onSelect={keepOpen}
                  className={itemClassName}
                >
                  {allLabel}
                  <ItemCheck />
                </DropdownMenuPrimitive.CheckboxItem>
                <DropdownMenuPrimitive.Separator className="-mx-1 my-1 h-px bg-border" />
              </>
            ) : null}
            {options.map((option) => (
              <DropdownMenuPrimitive.CheckboxItem
                key={option.value}
                checked={selected.includes(option.value)}
                disabled={option.disabled}
                onCheckedChange={(checked) => toggle(option.value, checked === true)}
                onSelect={keepOpen}
                className={itemClassName}
              >
                {hasAvatars ? <OptionAvatar option={option} /> : null}
                <span className="truncate">{option.label}</span>
                <ItemCheck />
              </DropdownMenuPrimitive.CheckboxItem>
            ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    );
  }
);
MultiSelect.displayName = "MultiSelect";

function ItemCheck() {
  return (
    <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-action-foreground transition-transform duration-base ease-out-soft group-data-[state=open]:rotate-180 motion-reduce:transition-none"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
