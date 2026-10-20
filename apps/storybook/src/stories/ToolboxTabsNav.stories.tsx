import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { TabsNav, TabsNavLink } from "@pgianni/toolbox-react";

const sections = ["Accueil", "Projets", "Templates", "Assistant"] as const;

const meta = {
  title: "Navigation/Tabs/TabsNav",
  component: TabsNav,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    showFrom: {
      control: "inline-radio",
      options: [undefined, "sm", "md", "lg", "xl"]
    }
  }
} satisfies Meta<typeof TabsNav>;

export default meta;
type Story = StoryObj<typeof meta>;

function HeaderNavigation({ container = false }: { container?: boolean }) {
  const [current, setCurrent] = useState<(typeof sections)[number]>("Accueil");

  return (
    <TabsNav aria-label="Navigation principale" container={container}>
      {sections.map((section) => (
        <TabsNavLink
          key={section}
          active={current === section}
          onClick={() => setCurrent(section)}
        >
          {section}
        </TabsNavLink>
      ))}
    </TabsNav>
  );
}

export const Default: Story = {
  name: "Navigation du header",
  render: () => <HeaderNavigation />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const projects = canvas.getByRole("button", { name: "Projets" });

    await userEvent.click(projects);
    await expect(projects).toHaveAttribute("aria-current", "page");
  }
};

export const WithContainer: Story = {
  name: "Avec conteneur",
  render: () => <HeaderNavigation container />
};

export const AsLinks: Story = {
  name: "Liens (href)",
  render: () => (
    <TabsNav aria-label="Navigation du portail">
      <TabsNavLink href="#applications" active>
        Applications
      </TabsNavLink>
      <TabsNavLink href="#projets">Projets</TabsNavLink>
      <TabsNavLink href="#equipe">Équipe</TabsNavLink>
    </TabsNav>
  )
};

export const WithRouterLink: Story = {
  name: "Avec un lien de routeur (asChild)",
  render: () => (
    <TabsNav aria-label="Navigation">
      <TabsNavLink asChild active>
        <a href="#accueil">Accueil</a>
      </TabsNavLink>
      <TabsNavLink asChild>
        <a href="#projets">Projets</a>
      </TabsNavLink>
    </TabsNav>
  )
};
