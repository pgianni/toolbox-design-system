import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@pgianni/toolbox-react";

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  parameters: { layout: "centered" }
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Ouvrir les filtres</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
          <SheetDescription>
            Affinez les résultats affichés dans votre tableau.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 text-sm">
          {["Équipe", "Statut", "Période"].map((label) => (
            <label key={label} className="grid gap-2 font-medium">
              {label}
              <input className="h-10 rounded-md border bg-background px-3" />
            </label>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Réinitialiser</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Appliquer</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side} size="sm">
            <SheetHeader>
              <SheetTitle>Sheet {side}</SheetTitle>
              <SheetDescription>
                Le panneau peut apparaître depuis chaque côté.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
};
