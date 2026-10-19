import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Spinner } from "@pgianni/toolbox-react";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    size: "md",
    tone: "primary"
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    tone: { control: "inline-radio", options: ["current", "primary", "muted"] }
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" tone="primary" />
      <Spinner size="md" tone="primary" />
      <Spinner size="lg" tone="primary" />
    </div>
  )
};

export const InButton: Story = {
  name: "Dans un bouton",
  render: () => (
    <div className="flex items-center gap-3">
      <Button disabled>
        <Spinner size="sm" label="" />
        Enregistrement…
      </Button>
      <Button variant="outline" disabled>
        <Spinner size="sm" label="" />
        Export en cours
      </Button>
    </div>
  )
};

export const PageLoading: Story = {
  name: "Chargement de page",
  render: () => (
    <div className="flex w-[320px] flex-col items-center gap-3 py-10 text-sm text-muted-foreground">
      <Spinner size="lg" tone="primary" label="" />
      <p role="status">Chargement des projets…</p>
    </div>
  )
};
