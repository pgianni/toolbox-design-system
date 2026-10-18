import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Label, RadioGroup, RadioGroupItem } from "@pgianni/toolbox-react";

const durations = [
  { value: "short", label: "Moins d’un mois" },
  { value: "medium", label: "Un à trois mois" },
  { value: "long", label: "Plus de trois mois" }
] as const;

const meta = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "medium",
    "aria-label": "Durée du projet"
  },
  render: (args) => (
    <RadioGroup {...args}>
      {durations.map((duration) => (
        <div key={duration.value} className="flex items-center gap-2">
          <RadioGroupItem value={duration.value} id={`duration-${duration.value}`} />
          <Label htmlFor={`duration-${duration.value}`}>{duration.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const long = canvas.getByRole("radio", { name: "Plus de trois mois" });

    await userEvent.click(long);
    await expect(long).toBeChecked();
  }
};

export const Disabled: Story = {
  args: {
    defaultValue: "short",
    disabled: true,
    "aria-label": "Durée du projet"
  },
  render: (args) => (
    <RadioGroup {...args}>
      {durations.map((duration) => (
        <div key={duration.value} className="flex items-center gap-2">
          <RadioGroupItem
            value={duration.value}
            id={`disabled-duration-${duration.value}`}
          />
          <Label htmlFor={`disabled-duration-${duration.value}`}>
            {duration.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
};
