import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { SegmentedControl } from "@pgianni/toolbox-react";

function ListIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
    </svg>
  );
}

const viewOptions = [
  { value: "list", label: "Liste", icon: <ListIcon /> },
  { value: "cards", label: "Cartes", icon: <GridIcon /> }
];

const meta = {
  title: "Forms/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    options: viewOptions,
    defaultValue: "list",
    "aria-label": "Affichage"
  }
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

function ViewSwitcher() {
  const [view, setView] = useState("list");

  return (
    <div className="grid gap-3 text-sm">
      <SegmentedControl
        aria-label="Affichage des activités"
        options={viewOptions}
        value={view}
        onValueChange={setView}
      />
      <p className="text-muted-foreground">
        Vue actuelle : {view === "list" ? "liste" : "cartes"}
      </p>
    </div>
  );
}

export const Default: Story = {
  name: "Vue liste / cartes (UX Method)",
  render: () => <ViewSwitcher />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cards = canvas.getByRole("radio", { name: "Cartes" });

    await userEvent.click(cards);
    await expect(cards).toBeChecked();
    await expect(canvas.getByText("Vue actuelle : cartes")).toBeVisible();
  }
};

export const IconOnly: Story = {
  args: {
    iconOnly: true
  }
};

export const ThreeOptions: Story = {
  args: {
    defaultValue: "week",
    "aria-label": "Période",
    options: [
      { value: "day", label: "Jour" },
      { value: "week", label: "Semaine" },
      { value: "month", label: "Mois" },
      { value: "year", label: "Année", disabled: true }
    ]
  }
};
