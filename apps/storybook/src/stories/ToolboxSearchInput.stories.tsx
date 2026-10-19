import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { SearchInput } from "@pgianni/toolbox-react";

const activities = [
  "Entretiens utilisateurs",
  "Questionnaire",
  "Atelier de cadrage",
  "Wireframes",
  "Prototype",
  "Tests utilisateurs"
];

const meta = {
  title: "Forms/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    "aria-label": "Rechercher une activité",
    placeholder: "Nom ou description…"
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole("searchbox", { name: "Rechercher une activité" });

    await userEvent.type(field, "atelier");
    await userEvent.click(canvas.getByRole("button", { name: "Effacer la recherche" }));
    await expect(field).toHaveValue("");
  }
};

function FilteredList() {
  const [query, setQuery] = useState("");
  const results = activities.filter((activity) =>
    activity.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="grid gap-3">
      <SearchInput
        aria-label="Rechercher une activité"
        placeholder="Nom ou description…"
        value={query}
        onValueChange={setQuery}
      />
      <ul className="grid gap-1 text-sm" aria-live="polite">
        {results.map((activity) => (
          <li key={activity} className="rounded-md px-2 py-1.5 hover:bg-accent">
            {activity}
          </li>
        ))}
        {results.length === 0 ? (
          <li className="px-2 py-1.5 text-muted-foreground">Aucune activité trouvée</li>
        ) : null}
      </ul>
    </div>
  );
}

export const FilterList: Story = {
  name: "Filtrer une liste (UX Method)",
  render: () => <FilteredList />
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Atelier"
  }
};
