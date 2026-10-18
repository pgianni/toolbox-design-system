import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppHeaderNavItem } from "@pgianni/toolbox-react";

const meta = {
  title: "Navigation/App Header/AppHeaderNavItem",
  component: AppHeaderNavItem,
  tags: ["autodocs"],
  args: {
    children: "Projets",
    active: false
  },
  parameters: {
    layout: "centered"
  },
  argTypes: {
    active: {
      control: "boolean"
    },
    asChild: {
      control: false
    }
  }
} satisfies Meta<typeof AppHeaderNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true
  }
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: <a href="#projets">Projets</a>
  }
};
