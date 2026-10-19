import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./dropdown-menu";
import {
  navItemActiveClassName,
  navItemBaseClassName,
  navItemPillClassName
} from "./nav-item-styles";

export const appHeaderVariants = cva(
  "sticky top-0 z-40 w-full border-b border-border bg-card/95 transition-[border-color] duration-base ease-out-soft motion-reduce:transition-none text-foreground backdrop-blur supports-[backdrop-filter]:bg-card/90",
  {
    variants: {
      density: {
        compact: "",
        comfortable: ""
      }
    },
    defaultVariants: {
      density: "compact"
    }
  }
);

const appHeaderInnerVariants = cva(
  "mx-auto flex w-full items-center justify-between gap-2",
  {
    variants: {
      density: {
        compact: "h-12 pl-1 pr-2 md:pr-4",
        comfortable: "h-16 px-4 sm:px-6"
      },
      contained: {
        true: "max-w-screen-2xl",
        false: "max-w-none"
      }
    },
    defaultVariants: {
      density: "compact",
      contained: false
    }
  }
);

export interface AppHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof appHeaderVariants> {
  contained?: boolean;
  innerClassName?: string;
  collapseOnScroll?: boolean;
  collapseOffset?: number;
  /**
   * Hide the bottom border until the page scrolls. Defaults to true for the
   * comfortable (portal) header; the compact (satellite) header keeps it.
   */
  borderOnScroll?: boolean;
}

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  (
    {
      className,
      innerClassName,
      density = "compact",
      contained = false,
      collapseOnScroll = false,
      collapseOffset = 24,
      borderOnScroll,
      children,
      ...props
    },
    ref
  ) => {
    const [scrollY, setScrollY] = React.useState(0);
    const scrolled = scrollY > 0;
    const collapsed = collapseOnScroll && scrollY > collapseOffset;

    React.useEffect(() => {
      const updateScrollState = () => {
        setScrollY(window.scrollY);
      };

      updateScrollState();
      window.addEventListener("scroll", updateScrollState, { passive: true });

      return () => window.removeEventListener("scroll", updateScrollState);
    }, []);

    return (
      <header
        ref={ref}
        data-scrolled={scrolled}
        data-collapsed={collapseOnScroll ? collapsed : undefined}
        className={cn(
          appHeaderVariants({ density }),
          (borderOnScroll ?? density === "comfortable") &&
            !scrolled &&
            "border-transparent",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            appHeaderInnerVariants({ density, contained }),
            collapseOnScroll &&
              "transition-[height,padding] duration-base ease-out-soft motion-reduce:transition-none",
            collapsed && density === "comfortable" && "h-12",
            innerClassName
          )}
        >
          {children}
        </div>
      </header>
    );
  }
);
AppHeader.displayName = "AppHeader";

export type AppHeaderSectionProps = React.HTMLAttributes<HTMLDivElement>;

const AppHeaderSection = React.forwardRef<HTMLDivElement, AppHeaderSectionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex min-w-0 items-center gap-2 md:gap-4", className)}
      {...props}
    />
  )
);
AppHeaderSection.displayName = "AppHeaderSection";

export interface AppHeaderBrandProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const AppHeaderBrand = React.forwardRef<HTMLButtonElement, AppHeaderBrandProps>(
  ({ className, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(
          "inline-flex h-10 min-w-0 shrink-0 items-center gap-2 rounded-lg px-2 text-left transition-colors duration-fast ease-out-soft hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:bg-accent/70",
          className
        )}
        {...props}
      />
    );
  }
);
AppHeaderBrand.displayName = "AppHeaderBrand";

export type AppHeaderBrandLogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

const AppHeaderBrandLogo = React.forwardRef<
  HTMLImageElement,
  AppHeaderBrandLogoProps
>(({ className, alt = "", ...props }, ref) => (
  <img
    ref={ref}
    alt={alt}
    className={cn("h-[30px] w-[30px] shrink-0 object-contain", className)}
    {...props}
  />
));
AppHeaderBrandLogo.displayName = "AppHeaderBrandLogo";

export type AppHeaderBrandNameProps = React.HTMLAttributes<HTMLSpanElement>;

const AppHeaderBrandName = React.forwardRef<
  HTMLSpanElement,
  AppHeaderBrandNameProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "max-w-[10rem] truncate text-[18px] font-semibold leading-none text-foreground sm:max-w-none",
      className
    )}
    {...props}
  />
));
AppHeaderBrandName.displayName = "AppHeaderBrandName";

const desktopBreakpointClassNames = {
  sm: "sm:flex",
  md: "md:flex",
  lg: "lg:flex",
  xl: "xl:flex"
} as const;

const mobileBreakpointClassNames = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden"
} as const;

export type AppHeaderBreakpoint = keyof typeof desktopBreakpointClassNames;

export interface AppHeaderNavProps
  extends React.HTMLAttributes<HTMLElement> {
  showFrom?: AppHeaderBreakpoint;
}

const AppHeaderNav = React.forwardRef<HTMLElement, AppHeaderNavProps>(
  ({ className, showFrom = "lg", ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "hidden min-w-0 items-center",
        desktopBreakpointClassNames[showFrom],
        className
      )}
      {...props}
    />
  )
);
AppHeaderNav.displayName = "AppHeaderNav";

export const appHeaderNavItemVariants = cva(
  cn(
    "relative border border-transparent",
    navItemBaseClassName,
    navItemPillClassName
  ),
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

export interface AppHeaderNavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appHeaderNavItemVariants> {
  asChild?: boolean;
}

const AppHeaderNavItem = React.forwardRef<
  HTMLButtonElement,
  AppHeaderNavItemProps
>(({ className, active = false, asChild = false, type = "button", ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      aria-current={active ? "page" : undefined}
      className={cn(appHeaderNavItemVariants({ active }), className)}
      {...props}
    />
  );
});
AppHeaderNavItem.displayName = "AppHeaderNavItem";

export type AppHeaderActionsProps = React.HTMLAttributes<HTMLDivElement>;

const AppHeaderActions = React.forwardRef<
  HTMLDivElement,
  AppHeaderActionsProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ml-auto flex shrink-0 items-center gap-1", className)}
    {...props}
  />
));
AppHeaderActions.displayName = "AppHeaderActions";

// Pointer, hover/keyboard highlight and pressed tint for AppSwitcher links.
const appSwitcherLinkStateClassName =
  "cursor-pointer hover:bg-primary/5 focus:bg-primary/5 data-[highlighted]:bg-primary/5 active:bg-primary/10 data-[highlighted]:active:bg-primary/10";

export type AppSwitcherApplication = {
  id: string;
  title: string;
  description?: string;
  href?: string;
  icon: React.ReactNode;
  current?: boolean;
};

export interface AppSwitcherProps {
  trigger: React.ReactElement;
  applications: readonly AppSwitcherApplication[];
  allAppsHref: string;
  allAppsLabel?: string;
  menuLabel?: string;
  className?: string;
}

function AppSwitcher({
  trigger,
  applications,
  allAppsHref,
  allAppsLabel = "Toutes les applications",
  menuLabel = "Applications Toolbox",
  className
}: AppSwitcherProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        aria-label={menuLabel}
        className={cn(
          "z-50 w-[min(22.5rem,calc(100vw-1rem))] rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg",
          className
        )}
      >
        {/* State classes go on the item so they replace its cursor-default and focus:bg-accent.
            Like the application rows, keyboard focus shows as the highlight tint, not a ring. */}
        <DropdownMenuItem asChild className={cn("p-0", appSwitcherLinkStateClassName)}>
          <a
            href={allAppsHref}
            className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-semibold outline-none transition-colors duration-fast ease-out-soft animate-content-in motion-reduce:animate-none"
          >
            <GridIcon />
            <span>{allAppsLabel}</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-0 my-0" />
        <div className="pt-1">
          {applications.map((application, index) => {
            // Rows settle in one after another as the menu opens.
            const rowStyle = { animationDelay: `${(index + 1) * 20}ms` };
            const content = (
              <>
                <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center [&_img]:h-[38px] [&_img]:w-[38px] [&_img]:object-contain [&_svg]:h-7 [&_svg]:w-7">
                  {application.icon}
                </span>
                <span className="flex min-w-0 flex-col justify-center gap-1 leading-tight">
                  <span className="truncate text-sm font-semibold">
                    {application.title}
                  </span>
                  {application.description ? (
                    <span className="line-clamp-2 text-xs text-foreground/70">
                      {application.description}
                    </span>
                  ) : null}
                </span>
              </>
            );
            const rowClassName = cn(
              "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left outline-none transition-colors duration-fast ease-out-soft animate-content-in motion-reduce:animate-none",
              application.current && "bg-primary/10"
            );

            if (application.href) {
              return (
                <DropdownMenuItem
                  key={application.id}
                  asChild
                  className={cn(
                    "p-0",
                    appSwitcherLinkStateClassName,
                    application.current &&
                      "hover:bg-primary/15 focus:bg-primary/15 data-[highlighted]:bg-primary/15"
                  )}
                >
                  <a
                    href={application.href}
                    aria-current={application.current ? "page" : undefined}
                    className={rowClassName}
                    style={rowStyle}
                  >
                    {content}
                  </a>
                </DropdownMenuItem>
              );
            }

            return (
              <DropdownMenuItem
                key={application.id}
                disabled
                aria-current={application.current ? "page" : undefined}
                className={cn(rowClassName, "opacity-100")}
                style={rowStyle}
              >
                {content}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface MobileBottomNavProps
  extends React.HTMLAttributes<HTMLElement> {
  hideFrom?: AppHeaderBreakpoint;
  innerClassName?: string;
}

const MobileBottomNav = React.forwardRef<HTMLElement, MobileBottomNavProps>(
  (
    {
      className,
      innerClassName,
      hideFrom = "lg",
      children,
      ...props
    },
    ref
  ) => (
    <nav
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 h-[calc(4.375rem+env(safe-area-inset-bottom))] border-t border-border bg-card/95 p-1 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] backdrop-blur",
        mobileBreakpointClassNames[hideFrom],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto flex h-full w-full max-w-md items-stretch justify-around gap-1",
          innerClassName
        )}
      >
        {children}
      </div>
    </nav>
  )
);
MobileBottomNav.displayName = "MobileBottomNav";

export const mobileBottomNavItemVariants = cva(
  "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-1 text-center text-xs font-medium text-muted-foreground transition-[color,background-color,transform] duration-fast ease-out-soft hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring active:scale-[0.98] motion-reduce:transform-none [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0",
  {
    variants: {
      active: {
        true: "bg-primary/10 text-action-foreground",
        false: ""
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

export interface MobileBottomNavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mobileBottomNavItemVariants> {
  asChild?: boolean;
}

const MobileBottomNavItem = React.forwardRef<
  HTMLButtonElement,
  MobileBottomNavItemProps
>(({ className, active = false, asChild = false, type = "button", ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      aria-current={active ? "page" : undefined}
      className={cn(mobileBottomNavItemVariants({ active }), className)}
      {...props}
    />
  );
});
MobileBottomNavItem.displayName = "MobileBottomNavItem";

function GridIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

export {
  AppHeader,
  AppHeaderSection,
  AppHeaderBrand,
  AppHeaderBrandLogo,
  AppHeaderBrandName,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderActions,
  AppSwitcher,
  MobileBottomNav,
  MobileBottomNavItem
};
