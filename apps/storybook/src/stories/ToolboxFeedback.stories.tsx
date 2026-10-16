import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Label,
  Switch,
  Toaster,
  toast
} from "@pgianni/toolbox-react";

function FeedbackPreview() {
  return (
    <div className="grid w-80 gap-8">
      <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
        <div className="grid gap-1">
          <Label htmlFor="notifications">Notifications</Label>
          <p className="text-sm text-muted-foreground">
            Recevoir le résumé hebdomadaire.
          </p>
        </div>
        <Switch id="notifications" aria-label="Notifications" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Projet enregistré")}>Succès</Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Impossible d’enregistrer le projet")}
        >
          Erreur
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

const meta = {
  title: "Feedback/Switch & Toast",
  component: FeedbackPreview,
  parameters: { layout: "centered" }
} satisfies Meta<typeof FeedbackPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

export const SwitchSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch size="sm" defaultChecked aria-label="Petit" />
      <Switch size="md" defaultChecked aria-label="Moyen" />
      <Switch size="lg" defaultChecked aria-label="Grand" />
      <Switch disabled aria-label="Désactivé" />
    </div>
  )
};

export const ToastVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast.success("Action terminée")}>Succès</Button>
      <Button variant="outline" onClick={() => toast.info("Information disponible")}>
        Information
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Vérification requise")}>
        Avertissement
      </Button>
      <Button variant="destructive" onClick={() => toast.error("Une erreur est survenue")}>
        Erreur
      </Button>
      <Toaster />
    </div>
  )
};
