import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";
import { Input, Label, Textarea } from "@pgianni/toolbox-react";

function FormExample() {
  return (
    <form className="grid w-[360px] gap-5" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-2">
        <Label htmlFor="project-name">Nom du projet</Label>
        <Input id="project-name" name="projectName" placeholder="Nouveau projet" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="project-description">Description</Label>
        <Textarea
          id="project-description"
          name="description"
          placeholder="Décrivez brièvement le projet"
        />
      </div>
    </form>
  );
}

const meta = {
  title: "Forms/Form fields",
  component: FormExample,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof FormExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvas }) => {
    const name = canvas.getByLabelText(/nom du projet/i);
    const description = canvas.getByLabelText(/description/i);

    await userEvent.type(name, "Audit UX");
    await userEvent.type(description, "Évaluer le parcours principal");

    await expect(name).toHaveValue("Audit UX");
    await expect(description).toHaveValue("Évaluer le parcours principal");
  }
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-[360px] gap-2">
      <Label htmlFor="disabled-field">Projet archivé</Label>
      <Input id="disabled-field" value="Lecture seule" disabled readOnly />
    </div>
  )
};
