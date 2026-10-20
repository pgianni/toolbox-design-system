import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@pgianni/toolbox-react";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function ActivitiesIcon() {
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
      <path d="M8 6h13M8 12h13M8 18h13" />
      <path d="M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function PlanningIcon() {
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
      <path d="M8 2v4M16 2v4M3 10h18" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
    </svg>
  );
}

function EstimationIcon() {
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
      <path d="M4 10h12M4 14h9" />
      <path d="M14 3.5c-1.7-.9-4.1-.7-5.5.6-2.4 2.2-2.4 6.1 0 8.3 1.4 1.3 3.8 1.5 5.5.6" />
    </svg>
  );
}

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[480px] max-w-full">
      <TabsList aria-label="Sections du projet">
        <TabsTrigger value="overview">Vue d’ensemble</TabsTrigger>
        <TabsTrigger value="activity">Activité</TabsTrigger>
        <TabsTrigger value="settings">Paramètres</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-md border bg-card p-4">
        Les informations principales du projet.
      </TabsContent>
      <TabsContent value="activity" className="rounded-md border bg-card p-4">
        L’activité récente du projet.
      </TabsContent>
      <TabsContent value="settings" className="rounded-md border bg-card p-4">
        Les paramètres du projet.
      </TabsContent>
    </Tabs>
  )
};

export const Authentication: Story = {
  render: () => (
    <Tabs defaultValue="login" className="w-[360px] max-w-full">
      <TabsList className="grid w-full grid-cols-2" aria-label="Authentification">
        <TabsTrigger value="login">Connexion</TabsTrigger>
        <TabsTrigger value="register">Inscription</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="rounded-md border bg-card p-5">
        Formulaire de connexion
      </TabsContent>
      <TabsContent value="register" className="rounded-md border bg-card p-5">
        Formulaire d’inscription
      </TabsContent>
    </Tabs>
  )
};

export const WithoutContainer: Story = {
  name: "Sans conteneur",
  render: () => (
    <Tabs container={false} defaultValue="overview" className="w-[480px] max-w-full">
      <TabsList aria-label="Sections du projet">
        <TabsTrigger value="overview">Vue d’ensemble</TabsTrigger>
        <TabsTrigger value="activity">Activité</TabsTrigger>
        <TabsTrigger value="settings">Paramètres</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-md border bg-card p-4">
        Même rendu que la navigation du header, pour des sections dans la page.
      </TabsContent>
      <TabsContent value="activity" className="rounded-md border bg-card p-4">
        L’activité récente du projet.
      </TabsContent>
      <TabsContent value="settings" className="rounded-md border bg-card p-4">
        Les paramètres du projet.
      </TabsContent>
    </Tabs>
  )
};

export const PageNavigation: Story = {
  render: () => (
    <Tabs variant="page" defaultValue="all" className="w-[560px] max-w-full">
      <TabsList aria-label="Pages auditées">
        <TabsTrigger value="all">Toutes les pages</TabsTrigger>
        <TabsTrigger value="home">Accueil</TabsTrigger>
        <TabsTrigger value="search">Résultats de recherche</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="all">Synthèse de toutes les pages.</TabsContent>
      <TabsContent value="home">Résultats de la page Accueil.</TabsContent>
      <TabsContent value="search">Résultats de la recherche.</TabsContent>
      <TabsContent value="contact">Résultats de la page Contact.</TabsContent>
    </Tabs>
  )
};

export const UxMethodViewSwitcher: Story = {
  name: "UX Method — Activités / Planification / Estimation",
  render: () => (
    <Tabs variant="view" defaultValue="activities" className="w-fit max-w-full">
      <TabsList aria-label="Vue du projet UX">
        <TabsTrigger value="activities">
          <ActivitiesIcon />
          Activités
        </TabsTrigger>
        <TabsTrigger value="planning">
          <PlanningIcon />
          Planification
        </TabsTrigger>
        <TabsTrigger value="estimation">
          <EstimationIcon />
          Estimation
        </TabsTrigger>
      </TabsList>
      <TabsContent value="activities" className="sr-only">
        Vue des activités
      </TabsContent>
      <TabsContent value="planning" className="sr-only">
        Vue de la planification
      </TabsContent>
      <TabsContent value="estimation" className="sr-only">
        Vue de l’estimation
      </TabsContent>
    </Tabs>
  )
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="available">
      <TabsList aria-label="Disponibilité">
        <TabsTrigger value="available">Disponible</TabsTrigger>
        <TabsTrigger value="future" disabled>
          Bientôt disponible
        </TabsTrigger>
      </TabsList>
      <TabsContent value="available">Ce contenu est disponible.</TabsContent>
    </Tabs>
  )
};

export const Interaction: Story = {
  render: () => (
    <Tabs defaultValue="first">
      <TabsList aria-label="Exemple interactif">
        <TabsTrigger value="first">Premier</TabsTrigger>
        <TabsTrigger value="second">Second</TabsTrigger>
      </TabsList>
      <TabsContent value="first">Premier panneau</TabsContent>
      <TabsContent value="second">Second panneau</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: "Second" }));
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("Second panneau");
  }
};
