import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  MobileBottomNav,
  MobileBottomNavItem,
  Toaster,
  toast
} from "@pgianni/toolbox-react";

const meta = {
  title: "Feedback/Toast",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast.success("Projet enregistré")}>Succès</Button>
      <Button variant="outline" onClick={() => toast.info("Information disponible")}>
        Information
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Vérification requise")}>
        Avertissement
      </Button>
      <Button danger onClick={() => toast.error("Impossible d’enregistrer le projet")}>
        Erreur
      </Button>
      <Toaster />
    </div>
  )
};

function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z" />
    </svg>
  );
}

export const AboveMobileTabBar: Story = {
  name: "Au-dessus de la tabbar mobile",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" }
  },
  render: () => (
    <div className="min-h-[600px] p-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Sous 1024 px, la tabbar mobile est visible : les toasts s’affichent au-dessus.
      </p>
      <Button onClick={() => toast.success("Projet enregistré")}>Afficher un toast</Button>
      <MobileBottomNav aria-label="Navigation mobile">
        {["Accueil", "Projets", "Équipe"].map((label, index) => (
          <MobileBottomNavItem key={label} active={index === 0}>
            <HomeIcon />
            <span>{label}</span>
          </MobileBottomNavItem>
        ))}
      </MobileBottomNav>
      <Toaster />
    </div>
  )
};
