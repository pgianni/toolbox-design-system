import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox, Label } from "@pgianni/toolbox-react";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="hide-weekends" />
      <Label htmlFor="hide-weekends">Masquer les week-ends</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name: "Masquer les week-ends" });

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  }
};

const skills = ["Recherche", "UI", "Design system"] as const;

function SelectAllExample() {
  const [selected, setSelected] = useState<string[]>(["Recherche"]);
  const allChecked = selected.length === skills.length;
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="skills-all"
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={() => setSelected(allChecked ? [] : [...skills])}
        />
        <Label htmlFor="skills-all">Toutes les compétences</Label>
      </div>
      <div className="grid gap-2 pl-6">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2">
            <Checkbox
              id={`skill-${skill}`}
              checked={selected.includes(skill)}
              onCheckedChange={(checked) =>
                setSelected((current) =>
                  checked ? [...current, skill] : current.filter((item) => item !== skill)
                )
              }
            />
            <Label htmlFor={`skill-${skill}`}>{skill}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Indeterminate: Story = {
  render: () => <SelectAllExample />
};

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-off" disabled />
        <Label htmlFor="disabled-off">Indisponible</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on">Toujours actif</Label>
      </div>
    </div>
  )
};
