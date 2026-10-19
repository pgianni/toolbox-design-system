import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Label, Switch } from "@pgianni/toolbox-react";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] }
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex w-80 items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
      <div className="grid gap-1">
        <Label htmlFor="notifications">Notifications</Label>
        <p className="text-sm text-muted-foreground">Recevoir le résumé hebdomadaire.</p>
      </div>
      <Switch id="notifications" {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole("switch", { name: "Notifications" });

    await userEvent.click(control);
    await expect(control).toBeChecked();
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch size="sm" defaultChecked aria-label="Petit" />
      <Switch size="md" defaultChecked aria-label="Moyen" />
      <Switch size="lg" defaultChecked aria-label="Grand" />
      <Switch disabled aria-label="Désactivé" />
    </div>
  )
};
