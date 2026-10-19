import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@pgianni/toolbox-react";

const meta = {
  title: "Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[320px] space-y-3 text-sm">
      <p>Informations du projet</p>
      <Separator />
      <p className="text-muted-foreground">Planning et estimation</p>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4 text-sm">
      <span>Projet</span>
      <Separator orientation="vertical" />
      <span>Équipe</span>
      <Separator orientation="vertical" />
      <span>Planning</span>
    </div>
  )
};
