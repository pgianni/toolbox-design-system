import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import {
  navItemActiveStateClassName,
  navItemBaseClassName,
  navItemPillClassName
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
        page:
          "h-12 rounded-none border-t-2 border-transparent px-3 hover:bg-accent data-[state=active]:border-action-foreground data-[state=active]:bg-background data-[state=active]:text-action-foreground",
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

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
}

export function Tabs({ variant = "default", ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root {...props} />
    </TabsVariantContext.Provider>
  );
}

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => {
  const inheritedVariant = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        tabsListVariants({ variant: variant ?? inheritedVariant }),
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

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        tabsTriggerVariants({ variant: variant ?? inheritedVariant }),
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

export { tabsListVariants, tabsTriggerVariants };
