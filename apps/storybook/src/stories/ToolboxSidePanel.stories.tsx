import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import {
  Button,
  Input,
  Label,
  SidePanel,
  SidePanelBody,
  SidePanelContent,
  SidePanelDescription,
  SidePanelFooter,
  SidePanelHeader,
  SidePanelTitle,
  SidePanelTrigger
} from "@pgianni/toolbox-react";

const meta = {
  title: "Overlays/SidePanel",
  component: SidePanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof SidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProjectForm() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="project-name">Nom du projet</Label>
        <Input id="project-name" defaultValue="Refonte espace client" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="project-load">Charge (jours)</Label>
        <Input id="project-load" type="number" defaultValue={24} />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <SidePanel>
      <SidePanelTrigger asChild>
        <Button>Modifier le projet</Button>
      </SidePanelTrigger>
      <SidePanelContent inset="none">
        <SidePanelHeader>
          <SidePanelTitle>Refonte espace client</SidePanelTitle>
          <SidePanelDescription>Projet actif · 3 designers</SidePanelDescription>
        </SidePanelHeader>
        <SidePanelBody>
          <ProjectForm />
        </SidePanelBody>
        <SidePanelFooter>
          <Button variant="outline">Annuler</Button>
          <Button>Enregistrer</Button>
        </SidePanelFooter>
      </SidePanelContent>
    </SidePanel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Modifier le projet" }));

    const body = within(canvasElement.ownerDocument.body);
    const panel = await body.findByRole("dialog", { name: "Refonte espace client" });
    await expect(panel).toBeVisible();
  }
};

export const Wide: Story = {
  render: () => (
    <SidePanel>
      <SidePanelTrigger asChild>
        <Button variant="outline">Voir le planning</Button>
      </SidePanelTrigger>
      <SidePanelContent size="wide" inset="none">
        <SidePanelHeader>
          <SidePanelTitle>Planning de l’équipe</SidePanelTitle>
          <SidePanelDescription>8 prochaines semaines</SidePanelDescription>
        </SidePanelHeader>
        <SidePanelBody>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 16 }, (_, index) => (
              <div key={index} className="h-16 rounded-lg bg-muted" />
            ))}
          </div>
        </SidePanelBody>
      </SidePanelContent>
    </SidePanel>
  )
};

function NonBlockingExample() {
  const [open, setOpen] = useState(false);
  const [designer, setDesigner] = useState("Camille");

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {["Camille", "Léo", "Inès"].map((name) => (
          <Button
            key={name}
            variant={designer === name && open ? "default" : "outline"}
            onClick={() => {
              setDesigner(name);
              setOpen(true);
            }}
          >
            {name}
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        La page reste utilisable pendant que le panneau est ouvert.
      </p>
      <SidePanel open={open} onOpenChange={setOpen} nonBlocking>
        <SidePanelContent
          inset="none"
          actions={
            <Button variant="outline" size="sm" className="h-8">
              Profil
            </Button>
          }
        >
          <SidePanelHeader>
            <SidePanelTitle>{designer}</SidePanelTitle>
            <SidePanelDescription>Product designer · 80 % staffé</SidePanelDescription>
          </SidePanelHeader>
          <SidePanelBody>
            <p className="text-sm text-muted-foreground">
              Sélectionnez un autre designer sans fermer le panneau.
            </p>
          </SidePanelBody>
        </SidePanelContent>
      </SidePanel>
    </div>
  );
}

export const NonBlocking: Story = {
  render: () => <NonBlockingExample />
};
