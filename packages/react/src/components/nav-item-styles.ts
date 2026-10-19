// Shared look for navigation-like items (AppHeaderNavItem, Tabs triggers).
export const navItemBaseClassName =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground transition-[color,background-color,border-color,transform] duration-fast ease-out-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

export const navItemPressClassName =
  "active:translate-y-0.5 motion-reduce:transform-none";

export const navItemPillClassName =
  `h-9 rounded-lg px-3 hover:bg-accent ${navItemPressClassName}`;

export const navItemActiveClassName =
  "bg-primary/10 text-action-foreground hover:bg-primary/15 hover:text-action-foreground";

// Same active look, driven by Radix `data-state="active"`.
export const navItemActiveStateClassName =
  "data-[state=active]:bg-primary/10 data-[state=active]:text-action-foreground data-[state=active]:hover:bg-primary/15 data-[state=active]:hover:text-action-foreground";
