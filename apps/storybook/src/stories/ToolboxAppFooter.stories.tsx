import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { AppFooter, type AppFooterApplication } from "@pgianni/toolbox-react";

function ProductMark({ label, tone = "bg-primary" }: { label: string; tone?: string }) {
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white ${tone}`}
    >
      {label}
    </span>
  );
}

const applications: AppFooterApplication[] = [
  {
    id: "design-thinking",
    title: "Design Thinking",
    href: "https://designthinking.giannipolito.fr",
    icon: <ProductMark label="D" tone="bg-sky-600" />
  },
  {
    id: "ux-method",
    title: "UX Method",
    href: "https://ux-method.giannipolito.fr",
    icon: <ProductMark label="M" />
  },
  {
    id: "audit",
    title: "Audit",
    href: "#audit",
    icon: <ProductMark label="A" tone="bg-emerald-600" />
  },
  {
    id: "impact",
    title: "Impact Signals",
    href: "#impact",
    icon: <ProductMark label="I" tone="bg-orange-500" />
  },
  {
    id: "team",
    title: "Design Team",
    href: "#team",
    icon: <ProductMark label="T" tone="bg-pink-600" />
  },
  {
    id: "userflow",
    title: "Userflow",
    href: "#userflow",
    icon: <ProductMark label="U" tone="bg-slate-700" />,
    current: true
  }
];

const meta = {
  title: "Navigation/AppFooter",
  component: AppFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  args: {
    applications,
    version: "0.8.0"
  }
} satisfies Meta<typeof AppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.getByRole("navigation", {
      name: "Autres outils Design Toolbox"
    });
    const links = within(navigation).getAllByRole("link");

    await expect(links).toHaveLength(5);
    await expect(canvas.queryByRole("link", { name: "Ouvrir Userflow" })).toBeNull();
  }
};

export const WithoutApplications: Story = {
  args: {
    applications: []
  }
};

export const WithoutVersion: Story = {
  args: {
    version: undefined
  }
};
