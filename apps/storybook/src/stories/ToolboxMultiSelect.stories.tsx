import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, screen, userEvent, within } from "storybook/test";
import { Label, MultiSelect, type MultiSelectOption } from "@pgianni/toolbox-react";

const people: MultiSelectOption[] = [
  { value: "camille", label: "Camille Martin", avatarSrc: "https://i.pravatar.cc/96?img=47" },
  { value: "hugo", label: "Hugo Bernard", avatarSrc: "https://i.pravatar.cc/96?img=12" },
  { value: "lea", label: "Léa Dubois", avatarSrc: "https://i.pravatar.cc/96?img=32" },
  { value: "nathan", label: "Nathan Petit", avatarSrc: "https://i.pravatar.cc/96?img=59" },
  { value: "sarah", label: "Sarah Leroy" },
  { value: "yanis", label: "Yanis Moreau", disabled: true }
];

const meta = {
  title: "Forms/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    options: people,
    size: "md",
    allLabel: "Tous"
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] }
  }
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

function PeopleFilter(args: React.ComponentProps<typeof MultiSelect>) {
  const [value, setValue] = useState<string[]>(args.defaultValue ?? []);

  return (
    <div className="grid w-80 gap-2">
      <Label id="people-label">Personnes</Label>
      <MultiSelect {...args} aria-labelledby="people-label" value={value} onValueChange={setValue} />
      <p className="text-xs text-muted-foreground">
        Filtre : {value.length === 0 ? "toutes les personnes" : value.join(", ")}
      </p>
    </div>
  );
}

export const PeopleFilterStory: Story = {
  name: "Filtre de personnes",
  render: (args) => <PeopleFilter {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Personnes/ });

    await expect(trigger).toHaveTextContent("Tous");
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole("menuitemcheckbox", { name: /Camille Martin/ }));
    await userEvent.click(screen.getByRole("menuitemcheckbox", { name: /Léa Dubois/ }));
    await expect(trigger).toHaveTextContent("Camille Martin, Léa Dubois");
    await userEvent.click(screen.getByRole("menuitemcheckbox", { name: "Tous" }));
    await expect(trigger).toHaveTextContent("Tous");
    await userEvent.keyboard("{Escape}");
  }
};

export const WithSelection: Story = {
  name: "Plusieurs personnes (+N)",
  args: { maxAvatars: 3 },
  render: (args) => (
    <PeopleFilter {...args} defaultValue={["camille", "hugo", "lea", "nathan", "sarah"]} />
  )
};

export const Sizes: Story = {
  name: "Tailles",
  render: (args) => (
    <div className="grid w-80 gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <MultiSelect
          key={size}
          {...args}
          size={size}
          aria-label={`Personnes ${size}`}
          defaultValue={["camille", "sarah"]}
        />
      ))}
    </div>
  )
};

export const WithoutAvatars: Story = {
  name: "Sans photos, sans « Tous »",
  render: () => (
    <div className="w-80">
      <MultiSelect
        aria-label="Statuts"
        allLabel={null}
        placeholder="Choisir des statuts"
        options={[
          { value: "active", label: "Actif" },
          { value: "planned", label: "Planifié" },
          { value: "paused", label: "En pause" },
          { value: "done", label: "Terminé" }
        ]}
      />
    </div>
  )
};

export const Dark: Story = {
  name: "Sombre",
  globals: { theme: "dark" },
  render: (args) => <PeopleFilter {...args} defaultValue={["camille", "lea"]} />
};
