import * as React from "react";
import { cn } from "../lib";
import type { AppSwitcherApplication } from "./app-header";

// Toolbox footer, ported from Userflows: links to the other applications,
// the Design Toolbox logo, copyright and design system version.

export type AppFooterApplication = Pick<
  AppSwitcherApplication,
  "id" | "title" | "href" | "icon" | "current"
>;

export interface AppFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** The current application (`current: true`) is left out of the list. */
  applications?: readonly AppFooterApplication[];
  applicationsLabel?: string;
  navigationLabel?: string;
  brandHref?: string;
  brandLabel?: string;
  logoSrc?: string;
  logoDarkSrc?: string;
  logoAlt?: string;
  copyrightHref?: string;
  copyrightHolder?: string;
  /** Shown as "Design system v{version}" when set. */
  version?: string;
  innerClassName?: string;
}

const AppFooter = React.forwardRef<HTMLElement, AppFooterProps>(
  (
    {
      className,
      innerClassName,
      applications = [],
      applicationsLabel = "Découvrir les autres outils",
      navigationLabel = "Autres outils Design Toolbox",
      brandHref = "https://toolbox.giannipolito.fr",
      brandLabel = "Accéder à Design Toolbox",
      logoSrc = "https://img.giannipolito.fr/logo/logo-designtoolbox.svg",
      logoDarkSrc = "https://img.giannipolito.fr/logo/logo-designtoolbox-white.svg",
      logoAlt = "Design Tools by Gianni Polito",
      copyrightHref = "https://giannipolito.fr",
      copyrightHolder = "Gianni Polito",
      version,
      children,
      ...props
    },
    ref
  ) => {
    const otherApplications = applications.filter(
      (application) => !application.current && application.href
    );

    return (
      <footer
        ref={ref}
        className={cn("border-t border-border bg-muted/30 px-4 py-8", className)}
        {...props}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl flex-col items-center gap-4 text-center",
            innerClassName
          )}
        >
          {otherApplications.length > 0 ? (
            <nav aria-label={navigationLabel} className="w-full">
              <p className="mb-3 text-sm font-semibold text-foreground">
                {applicationsLabel}
              </p>
              <ul className="flex flex-wrap justify-center gap-2">
                {otherApplications.map((application) => (
                  <li key={application.id}>
                    <a
                      href={application.href}
                      aria-label={`Ouvrir ${application.title}`}
                      className="flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors duration-fast ease-out-soft hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_img]:h-7 [&_img]:w-7 [&_img]:shrink-0 [&_img]:object-contain [&_svg]:h-7 [&_svg]:w-7 [&_svg]:shrink-0"
                    >
                      <span aria-hidden="true" className="flex shrink-0">
                        {application.icon}
                      </span>
                      <span>{application.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {children}

          <a
            href={brandHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={brandLabel}
            className="rounded-md transition-opacity duration-fast ease-out-soft hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <img
              src={logoSrc}
              alt={logoAlt}
              className={cn("h-10 md:h-12", logoDarkSrc && "dark:hidden")}
            />
            {logoDarkSrc ? (
              <img
                src={logoDarkSrc}
                alt=""
                className="hidden h-10 md:h-12 dark:block"
              />
            ) : null}
          </a>

          <div className="flex flex-col items-center gap-1">
            <a
              href={copyrightHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-sm text-muted-foreground transition-colors duration-fast ease-out-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              © {new Date().getFullYear()} {copyrightHolder}
            </a>
            {version ? (
              <p className="text-xs text-muted-foreground/80">
                Design system v{version}
              </p>
            ) : null}
          </div>
        </div>
      </footer>
    );
  }
);
AppFooter.displayName = "AppFooter";

export { AppFooter };
