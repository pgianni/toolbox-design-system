import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { desktopBreakpointClassNames, type Breakpoint } from "./breakpoints";
import type { ControlSize } from "./control-sizes";
import {
  navItemActiveClassName,
  navItemActiveStateClassName,
  navItemBaseClassName,
  navItemPillClassName,
  navItemPressClassName
} from "./nav-item-styles";

// `default` and `view` share the same pill look; `view` is kept as an alias.
const pillListClassName =
  "h-auto justify-center rounded-2xl border border-border bg-background p-1";
const pillTriggerClassName = cn(navItemPillClassName, navItemActiveStateClassName);

const tabsListVariants = cva(
  "inline-flex items-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: pillListClassName,
        page: "h-12 max-w-full justify-start overflow-x-auto bg-transparent p-0",
        view: pillListClassName
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const tabsTriggerVariants = cva(
  cn(navItemBaseClassName, "ring-offset-background"),
  {
    variants: {
      variant: {
        default: pillTriggerClassName,
        page: cn(
          "h-12 rounded-none border-t-2 border-transparent px-3 hover:bg-primary/5 active:bg-primary/10 data-[state=active]:border-action-foreground data-[state=active]:bg-background data-[state=active]:text-action-foreground",
          navItemPressClassName
        ),
        view: pillTriggerClassName
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>;

const TabsVariantContext = React.createContext<TabsVariant>("default");
const TabsContainerContext = React.createContext(true);
const TabsSizeContext = React.createContext<ControlSize | undefined>(undefined);

// Optional sizes for pill tabs, on the shared control scale. In the container,
// items match the SegmentedControl (26/30/34 px) so the whole bar is 36/40/44 px;
// without it, items are the full control height.
const containedTriggerSizeClassName: Record<ControlSize, string> = {
  sm: "h-[26px] px-2.5 text-base md:text-sm",
  md: "h-[30px] px-3 text-base md:text-sm",
  lg: "h-[34px] px-3 text-base"
};
const bareTriggerSizeClassName: Record<ControlSize, string> = {
  sm: "h-9 px-3 text-base md:text-sm",
  md: "h-10 px-3 text-base md:text-sm",
  lg: "h-11 px-4 text-base"
};

// Without the container, pill tabs sit directly on the page like AppHeaderNav.
const noContainerClassName = "rounded-none border-0 bg-transparent p-0";

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  /** Bordered container around pill tabs (default). `false` matches AppHeaderNav. */
  container?: boolean;
  /**
   * Height on the shared control scale (sm 36, md 40, lg 44 px), for pill tabs
   * aligned with form controls. Leave unset for the default 36 px items.
   */
  size?: ControlSize;
}

export function Tabs({ variant = "default", container = true, size, ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsContainerContext.Provider value={container}>
        <TabsSizeContext.Provider value={size}>
          <TabsPrimitive.Root {...props} />
        </TabsSizeContext.Provider>
      </TabsContainerContext.Provider>
    </TabsVariantContext.Provider>
  );
}

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  /** Overrides the `container` set on `Tabs`. */
  container?: boolean;
}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, container, ...props }, ref) => {
  const inheritedVariant = React.useContext(TabsVariantContext);
  const inheritedContainer = React.useContext(TabsContainerContext);
  const resolvedVariant = variant ?? inheritedVariant;
  const withContainer = container ?? inheritedContainer;

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        tabsListVariants({ variant: resolvedVariant }),
        !withContainer && resolvedVariant !== "page" && noContainerClassName,
        className
      )}
      {...props}
    />
  );
});

TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => {
  const inheritedVariant = React.useContext(TabsVariantContext);
  const withContainer = React.useContext(TabsContainerContext);
  const size = React.useContext(TabsSizeContext);
  const resolvedVariant = variant ?? inheritedVariant;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        tabsTriggerVariants({ variant: resolvedVariant }),
        size &&
          resolvedVariant !== "page" &&
          (withContainer ? containedTriggerSizeClassName : bareTriggerSizeClassName)[size],
        className
      )}
      {...props}
    />
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

// ---------------------------------------------------------------------------
// Navigation mode: same look as the tabs, but real navigation links in a
// <nav> (aria-current="page" on the current one) instead of a tablist. Use it
// for site or app navigation, e.g. in AppHeader; use Tabs to switch panels.

export interface TabsNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Bordered container like Tabs. Defaults to `false` (header navigation). */
  container?: boolean;
  /** Hidden below this breakpoint (e.g. "lg" in AppHeader, with a mobile tab bar below). */
  showFrom?: Breakpoint;
}

export const TabsNav = React.forwardRef<HTMLElement, TabsNavProps>(
  ({ className, container = false, showFrom, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "min-w-0 items-center",
        showFrom ? cn("hidden", desktopBreakpointClassNames[showFrom]) : "flex",
        container && "w-fit rounded-2xl border border-border bg-background p-1",
        className
      )}
      {...props}
    />
  )
);
TabsNav.displayName = "TabsNav";

export const tabsNavLinkVariants = cva(
  cn("relative", navItemBaseClassName, navItemPillClassName),
  {
    variants: {
      active: {
        true: navItemActiveClassName,
        false: ""
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

export interface TabsNavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "type">,
    VariantProps<typeof tabsNavLinkVariants> {
  /** Renders the child (e.g. a router Link) instead of an <a> or <button>. */
  asChild?: boolean;
  /** Without href or asChild, renders a <button>. */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const TabsNavLink = React.forwardRef<HTMLElement, TabsNavLinkProps>(
  ({ className, active = false, asChild = false, href, type = "button", ...props }, ref) => {
    const shared = {
      "aria-current": active ? ("page" as const) : undefined,
      className: cn(tabsNavLinkVariants({ active }), className)
    };

    if (asChild) {
      return <Slot ref={ref as React.Ref<HTMLElement>} {...shared} {...(props as React.HTMLAttributes<HTMLElement>)} />;
    }
    if (href) {
      return <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...shared} {...props} />;
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        {...shared}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);
TabsNavLink.displayName = "TabsNavLink";

export { tabsListVariants, tabsTriggerVariants };
