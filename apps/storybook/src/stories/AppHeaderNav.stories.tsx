import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import {
  AppHeaderNav,
  AppHeaderNavItem
} from "@pgianni/toolbox-react";

const navigationItems = ["Accueil", "Projets", "Templates", "Assistant"] as const;

const meta = {
  title: "Navigation/App Header/AppHeaderNav",
  component: AppHeaderNav,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    showFrom: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"]
    }
  }
} satisfies Meta<typeof AppHeaderNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Navigation principale",
    showFrom: "sm"
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<(typeof navigationItems)[number]>(
      "Accueil"
    );

    return (
      <AppHeaderNav {...args}>
        {navigationItems.map((item) => (
          <AppHeaderNavItem
            key={item}
            active={activeItem === item}
            onClick={() => setActiveItem(item)}
          >
            {item}
          </AppHeaderNavItem>
        ))}
      </AppHeaderNav>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const projects = canvas.getByRole("button", { name: "Projets" });

    await userEvent.click(projects);
    await expect(projects).toHaveAttribute("aria-current", "page");
  }
};
