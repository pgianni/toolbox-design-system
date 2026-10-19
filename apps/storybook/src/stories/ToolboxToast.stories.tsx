import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Toaster, toast } from "@pgianni/toolbox-react";

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
