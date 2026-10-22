import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, screen, userEvent, within } from "storybook/test";
import { DatePicker, Label, TimePicker } from "@pgianni/toolbox-react";

const meta = {
  title: "Forms/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    size: "md",
    minuteStep: 5
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    minuteStep: { control: "inline-radio", options: [1, 5, 10, 15, 30] }
  }
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledExample(args: React.ComponentProps<typeof TimePicker>) {
  const [time, setTime] = useState(args.defaultValue ?? "09:00");

  return (
    <div className="grid w-40 gap-2">
      <Label htmlFor="start-time">Début</Label>
      <TimePicker id="start-time" {...args} value={time} onValueChange={setTime} />
      <p className="text-xs text-muted-foreground">Valeur : {time}</p>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <ControlledExample {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /09:00/ });

    await userEvent.click(trigger);
    const hours = await screen.findByRole("listbox", { name: "Heures" });
    await userEvent.click(within(hours).getByRole("option", { name: "14" }));
    const minutes = screen.getByRole("listbox", { name: "Minutes" });
    await userEvent.click(within(minutes).getByRole("option", { name: "30" }));
    await expect(trigger).toHaveTextContent("14:30");
  }
};

export const Empty: Story = {
  name: "Sans valeur",
  render: (args) => (
    <div className="w-48">
      <TimePicker {...args} aria-label="Heure de rendez-vous" />
    </div>
  )
};

export const OfficeHours: Story = {
  name: "Heures de bureau, pas de 15 min",
  args: { minHour: 8, maxHour: 19, minuteStep: 15, defaultValue: "10:15" },
  render: (args) => <ControlledExample {...args} />
};

export const WithDate: Story = {
  name: "Avec un DatePicker",
  render: (args) => (
    <div className="grid gap-2">
      <Label>Rendez-vous</Label>
      <div className="flex gap-2">
        <DatePicker aria-label="Date" defaultValue={new Date(2026, 9, 22)} className="w-56" />
        <TimePicker {...args} aria-label="Heure" defaultValue="09:00" className="w-28" />
      </div>
    </div>
  )
};

export const Sizes: Story = {
  name: "Tailles",
  render: () => (
    <div className="grid w-40 gap-3">
      <TimePicker size="sm" aria-label="Heure sm" defaultValue="09:00" />
      <TimePicker size="md" aria-label="Heure md" defaultValue="09:00" />
      <TimePicker size="lg" aria-label="Heure lg" defaultValue="09:00" />
    </div>
  )
};

export const Disabled: Story = {
  name: "Désactivé",
  args: { disabled: true, defaultValue: "09:00" }
};

export const Dark: Story = {
  name: "Sombre",
  globals: { theme: "dark" },
  render: (args) => <ControlledExample {...args} />
};
