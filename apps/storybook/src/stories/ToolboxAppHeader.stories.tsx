import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import {
  AppHeader,
  AppHeaderActions,
  AppHeaderBrand,
  AppHeaderBrandLogo,
  AppHeaderBrandName,
  AppHeaderNav,
  AppHeaderNavItem,
  AppHeaderSection,
  AppSwitcher,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  MobileBottomNav,
  MobileBottomNavItem,
  type AppSwitcherApplication
} from "@pgianni/toolbox-react";

function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const HomeIcon = () => (
  <Glyph><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></Glyph>
);
const FolderIcon = () => (
  <Glyph><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /></Glyph>
);
const TemplateIcon = () => (
  <Glyph><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18M9 9h12" /></Glyph>
);
const SparklesIcon = () => (
  <Glyph><path d="m12 3-1.4 3.6L7 8l3.6 1.4L12 13l1.4-3.6L17 8l-3.6-1.4Z" /><path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8ZM19 14l-.8 2.2L16 17l2.2.8L19 20l.8-2.2L22 17l-2.2-.8Z" /></Glyph>
);
const SunIcon = () => (
  <Glyph><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" /></Glyph>
);
const MoonIcon = () => (
  <Glyph><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></Glyph>
);
const LogOutIcon = () => (
  <Glyph><path d="M10 17l5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></Glyph>
);
const GridIcon = () => (
  <Glyph><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /></Glyph>
);
const AnalyticsIcon = () => (
  <Glyph><path d="M3 3v18h18" /><path d="m7 16 4-5 4 3 5-7" /></Glyph>
);
const UsersIcon = () => (
  <Glyph><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></Glyph>
);
const SettingsIcon = () => (
  <Glyph><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1v.1h-4v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4h-.1v-4H3A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1v-.1h4V3A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.14.37.35.7.6 1 .28.25.62.39 1 .4h.1v4H21a1.7 1.7 0 0 0-1.6.6Z" /></Glyph>
);

const TOOLBOX_LOGO = "https://img.giannipolito.fr/logo/logo-designtoolbox.svg";
const TOOLBOX_LOGO_DARK = "https://img.giannipolito.fr/logo/logo-designtoolbox-white.svg";

function ProductMark({ label, tone = "bg-primary" }: { label: string; tone?: string }) {
  return (
    <span className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg ${tone} text-xs font-bold text-primary-foreground`}>
      {label}
    </span>
  );
}

const applications: AppSwitcherApplication[] = [
  {
    id: "method",
    title: "UX Method",
    description: "Structure ta démarche UX étape par étape",
    href: "#method",
    icon: <ProductMark label="M" />,
    current: true
  },
  {
    id: "audit",
    title: "Audit",
    description: "Analyse l’existant et détecte les axes d’amélioration",
    href: "#audit",
    icon: <ProductMark label="A" tone="bg-emerald-600" />
  },
  {
    id: "userflow",
    title: "Userflow",
    description: "Construis la logique de ton parcours utilisateur",
    href: "#userflow",
    icon: <ProductMark label="U" tone="bg-orange-500" />
  }
];

const navItems = [
  { id: "home", label: "Accueil", icon: HomeIcon },
  { id: "projects", label: "Mes projets", icon: FolderIcon },
  { id: "templates", label: "Templates", icon: TemplateIcon },
  { id: "assistant", label: "Assistant", icon: SparklesIcon }
] as const;

const portalNavItems = [
  { id: "applications", label: "Applications", icon: GridIcon },
  { id: "projects", label: "Projets", icon: FolderIcon },
  { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
  { id: "users", label: "Utilisateurs", icon: UsersIcon },
  { id: "administration", label: "Administration", icon: SettingsIcon }
] as const;

function BrandSwitcher() {
  return (
    <AppSwitcher
      allAppsHref="#applications"
      applications={applications}
      trigger={
        <AppHeaderBrand aria-label="Changer d’application">
          <ProductMark label="M" />
          <AppHeaderBrandName>UX Method</AppHeaderBrandName>
        </AppHeaderBrand>
      }
    />
  );
}

function HeaderActions({ signedIn = true }: { signedIn?: boolean }) {
  return (
    <AppHeaderActions>
      <Button
        variant="ghost"
        size="icon-md"
        aria-label="Changer de thème"
        className="relative text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <span className="block dark:hidden"><SunIcon /></span>
        <span className="hidden dark:block"><MoonIcon /></span>
      </Button>
      {signedIn ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon-md" aria-label="Ouvrir le compte" className="font-semibold">
              GP
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="normal-case tracking-normal text-foreground">
              Gianni Polito
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOutIcon />
              <span>Se déconnecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="tertiary" size="sm">Se connecter</Button>
      )}
    </AppHeaderActions>
  );
}

function SatelliteHeader({ signedIn = true }: { signedIn?: boolean }) {
  return (
    <AppHeader>
      <AppHeaderSection>
        <BrandSwitcher />
        <AppHeaderNav aria-label="Navigation principale" showFrom="lg">
          {navItems.map((item, index) => (
            <AppHeaderNavItem key={item.id} active={index === 0}>
              <item.icon />
              <span>{item.label}</span>
            </AppHeaderNavItem>
          ))}
        </AppHeaderNav>
      </AppHeaderSection>
      <HeaderActions signedIn={signedIn} />
    </AppHeader>
  );
}

function MobileNavigation() {
  return (
    <MobileBottomNav aria-label="Navigation mobile" hideFrom="lg">
      {navItems.map((item, index) => (
        <MobileBottomNavItem key={item.id} active={index === 0}>
          <item.icon />
          <span className="truncate">{item.label}</span>
        </MobileBottomNavItem>
      ))}
    </MobileBottomNav>
  );
}

const meta = {
  title: "Navigation/App Header",
  component: AppHeader,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SatelliteDesktop: Story = {
  render: () => (
    <div className="min-h-screen bg-app-background">
      <SatelliteHeader />
      <main className="mx-auto max-w-5xl p-8">
        <h1 className="text-2xl font-semibold">Contenu de l’application</h1>
        <p className="mt-2 text-foreground/70">
          Le header compact reprend le modèle partagé par les applications satellites.
        </p>
      </main>
    </div>
  )
};

export const SignedOut: Story = {
  render: () => (
    <div className="min-h-screen bg-app-background">
      <SatelliteHeader signedIn={false} />
    </div>
  )
};

export const PortalDesktop: Story = {
  render: () => (
    <div className="min-h-[180vh] bg-app-background">
      <AppHeader
        density="comfortable"
        contained
        collapseOnScroll
        collapseOffset={32}
        data-testid="portal-header"
      >
        <AppHeaderSection className="gap-6">
          <AppHeaderBrand asChild className="px-0 hover:bg-transparent">
            <a href="#applications" aria-label="Design Toolbox — Applications">
              <AppHeaderBrandLogo
                src={TOOLBOX_LOGO}
                alt="Design Toolbox"
                className="h-10 w-auto dark:hidden"
              />
              <AppHeaderBrandLogo
                src={TOOLBOX_LOGO_DARK}
                alt=""
                className="hidden h-10 w-auto dark:block"
              />
            </a>
          </AppHeaderBrand>
          <AppHeaderNav aria-label="Navigation du portail" showFrom="xl">
            {portalNavItems.map((item, index) => (
              <AppHeaderNavItem key={item.id} active={index === 0}>
                <item.icon />
                <span>{item.label}</span>
              </AppHeaderNavItem>
            ))}
          </AppHeaderNav>
        </AppHeaderSection>
        <HeaderActions />
      </AppHeader>
      <main className="mx-auto max-w-screen-2xl space-y-8 px-6 py-10">
        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold text-action-foreground">Header adaptatif</p>
          <h1 className="mt-2 text-3xl font-semibold">Toutes les applications Toolbox</h1>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Fais défiler la page : le header passe progressivement de 64 px à 48 px après 32 px de scroll.
          </p>
        </section>
        {Array.from({ length: 6 }, (_, index) => (
          <section key={index} className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">Section {index + 1}</h2>
            <p className="mt-2 max-w-3xl text-foreground/70">
              Ce contenu simule une page portail longue pour vérifier le comportement sticky et la réduction de hauteur sans masquer la navigation.
            </p>
            <div className="mt-6 h-24 rounded-xl bg-muted" />
          </section>
        ))}
      </main>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByTestId("portal-header");
    const storyWindow = canvasElement.ownerDocument.defaultView;

    expect(header).toHaveAttribute("data-collapsed", "false");
    storyWindow?.scrollTo({ top: 160, behavior: "instant" });
    await waitFor(() => expect(header).toHaveAttribute("data-collapsed", "true"));
    storyWindow?.scrollTo({ top: 0, behavior: "instant" });
    await waitFor(() => expect(header).toHaveAttribute("data-collapsed", "false"));
  }
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" }
  },
  render: () => (
    <div className="min-h-screen bg-app-background pb-24">
      <SatelliteHeader />
      <main className="p-5">
        <h1 className="text-xl font-semibold">Vue mobile</h1>
        <p className="mt-2 text-sm text-foreground/70">
          La navigation principale passe en barre basse et respecte la safe area.
        </p>
      </main>
      <MobileNavigation />
    </div>
  )
};

export const ApplicationSwitcher: Story = {
  render: () => (
    <div className="min-h-[420px] bg-app-background">
      <SatelliteHeader />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Changer d’application" }));
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByText("Toutes les applications")).toBeVisible();
    await expect(body.getByText("Audit")).toBeVisible();
  }
};

