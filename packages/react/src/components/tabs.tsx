import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

const tabsListVariants = cva(
  "inline-flex items-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "h-10 justify-center rounded-md bg-muted p-1",
        page: "h-12 max-w-full justify-start overflow-x-auto bg-transparent p-0",
        view: "h-auto justify-center rounded-lg border border-border bg-background p-1"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const tabsTriggerVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-sm px-3 py-1.5 hover:bg-background/50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        page:
          "h-12 rounded-none border-t-2 border-transparent px-3 shadow-none hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:text-foreground",
        view:
          "gap-2 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground [&_svg]:size-4 [&_svg]:shrink-0 data-[state=active]:bg-[#DBEAFE] data-[state=active]:text-blue-700 data-[state=active]:shadow-none data-[state=active]:hover:text-blue-700"
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
