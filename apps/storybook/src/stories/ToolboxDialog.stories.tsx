import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@pgianni/toolbox-react";

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  parameters: { layout: "centered" }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Modifier le projet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le projet</DialogTitle>
          <DialogDescription>
            Les changements seront visibles par toute l’équipe.
          </DialogDescription>
        </DialogHeader>
        <label className="grid gap-2 text-sm font-medium">
          Nom du projet
          <input
            className="h-10 rounded-md border bg-background px-3 font-normal"
            defaultValue="Refonte de l’espace client"
          />
        </label>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Enregistrer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Modifier le projet" })
    );
    await expect(
      within(document.body).getByRole("dialog", { name: "Modifier le projet" })
    ).toBeVisible();
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">{size}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Dialog {size}</DialogTitle>
              <DialogDescription>
                Une largeur adaptée à la quantité de contenu.
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-md bg-muted p-6 text-sm">
              Contenu de démonstration
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
};
