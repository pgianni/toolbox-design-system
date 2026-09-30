import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button } from "@pgianni/toolbox-react";

const meta = {
  component: Button,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Créer un projet",
    type: "button"
  }
};

export const Brand: Story = {
  args: {
    children: "Continuer",
    type: "button",
    variant: "brand"
  }
};

export const BrandOutline: Story = {
  args: {
    children: "En savoir plus",
    type: "button",
    variant: "brand-outline"
  }
};

export const CssCheck: Story = {
  args: {
    children: "Vérifier le thème",
    type: "button"
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /vérifier le thème/i });
    await expect(getComputedStyle(button).backgroundColor).toBe("rgb(68, 0, 255)");
  }
};
