import * as React from "react";
import { cn } from "../lib";
import { warnDeprecated } from "../deprecation";
import { Tag, tagVariants, type TagAppearance, type TagTone } from "./tag";

// Badge is merged into Tag: it now renders a Tag and maps its old variants.
// Kept for compatibility; it will be removed in the next major version.

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const badgeToTag: Record<BadgeVariant, { tone: TagTone; appearance: TagAppearance; replacement: string }> = {
  default: { tone: "primary", appearance: "solid", replacement: '<Tag tone="primary" appearance="solid">' },
  secondary: { tone: "neutral", appearance: "soft", replacement: "<Tag>" },
  destructive: { tone: "danger", appearance: "solid", replacement: '<Tag tone="danger" appearance="solid">' },
  outline: { tone: "neutral", appearance: "outline", replacement: '<Tag appearance="outline">' }
};

/** @deprecated Use `tagVariants`. */
export function badgeVariants({ variant }: { variant?: BadgeVariant | null } = {}) {
  const { tone, appearance } = badgeToTag[variant ?? "default"];
  return tagVariants({ tone, appearance });
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant | null;
}

/** @deprecated Use `Tag` (see MIGRATION.md for the variant mapping). */
export function Badge({ className, variant, ...props }: BadgeProps) {
  const mapping = badgeToTag[variant ?? "default"];
  warnDeprecated(`Badge est remplacé par Tag : utilisez ${mapping.replacement}.`);

  return (
    <Tag
      tone={mapping.tone}
      appearance={mapping.appearance}
      className={cn(className)}
      {...props}
    />
  );
}
