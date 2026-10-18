import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@pgianni/toolbox-react";

const meta = {
  title: "Surfaces/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

function CollapsibleExample() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="w-[360px] rounded-lg border border-border bg-card p-4"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold">Détail de l’estimation</span>
        <CollapsibleTrigger asChild>
          <Button variant="tertiary" size="sm">
            {open ? "Masquer" : "Afficher"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul className="mt-3 grid gap-1 text-sm text-muted-foreground">
          <li>Découverte — 3 jours</li>
          <li>Conception — 6 jours</li>
          <li>Tests utilisateurs — 2 jours</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const Default: Story = {
  render: () => <CollapsibleExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Afficher" }));
    await expect(await canvas.findByText("Conception — 6 jours")).toBeVisible();
  }
};
