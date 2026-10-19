import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Alert, AlertDescription, AlertTitle, Button } from "@pgianni/toolbox-react";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    tone: "info"
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger", "neutral"]
    }
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="w-[440px]">
      <AlertTitle>Planning enregistré</AlertTitle>
      <AlertDescription>
        Il sera partagé avec l’équipe au prochain export.
      </AlertDescription>
    </Alert>
  )
};

const examples = [
  {
    tone: "info",
    title: "Estimation indicative",
    description: "Les durées sont calculées à partir de projets similaires."
  },
  {
    tone: "success",
    title: "Critère conforme",
    description: "Toutes les images ont une alternative textuelle."
  },
  {
    tone: "warning",
    title: "Designer surchargé",
    description: "Camille est staffée à 120 % sur la semaine du 4 novembre."
  },
  {
    tone: "danger",
    title: "Export impossible",
    description: "Le fichier dépasse 10 Mo. Réduisez le nombre d’écrans exportés."
  },
  {
    tone: "neutral",
    title: "Mode hors ligne",
    description: "Vos modifications seront synchronisées à la reconnexion."
  }
] as const;

export const Tones: Story = {
  render: () => (
    <div className="grid w-[440px] gap-3">
      {examples.map((example) => (
        <Alert key={example.tone} tone={example.tone}>
          <AlertTitle>{example.title}</AlertTitle>
          <AlertDescription>{example.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
};

export const TonesDark: Story = {
  ...Tones,
  globals: { theme: "dark" }
};

export const DescriptionOnly: Story = {
  render: () => (
    <Alert tone="warning" className="w-[440px]">
      <AlertDescription>
        Ce projet n’a pas de date de fin. <a href="#dates">Ajouter une date</a>
      </AlertDescription>
    </Alert>
  )
};

function DismissibleExample() {
  const [open, setOpen] = useState(true);

  return open ? (
    <Alert tone="success" className="w-[440px]" onDismiss={() => setOpen(false)}>
      <AlertTitle>Invitation envoyée</AlertTitle>
      <AlertDescription>Léo recevra un e-mail pour rejoindre le projet.</AlertDescription>
    </Alert>
  ) : (
    <Button variant="outline" onClick={() => setOpen(true)}>
      Réafficher le message
    </Button>
  );
}

export const Dismissible: Story = {
  render: () => <DismissibleExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Fermer" }));
    await expect(canvas.queryByText("Invitation envoyée")).toBeNull();
  }
};
