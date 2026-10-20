import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { enUS } from "react-day-picker/locale";
import { expect, screen, userEvent, within } from "storybook/test";
import { Calendar, DatePicker, Label } from "@pgianni/toolbox-react";

const meta = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    size: "md",
    placeholder: "Choisir une date"
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] }
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="start-date">Date de début</Label>
      <DatePicker id="start-date" {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Choisir une date/ });

    await userEvent.click(trigger);
    const grid = await screen.findByRole("grid");
    await userEvent.click(within(grid).getAllByRole("button", { name: /15/ })[0]);
    await expect(trigger).not.toHaveTextContent("Choisir une date");
  }
};

function ControlledExample() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 20));

  return (
    <div className="grid w-72 gap-2">
      <Label htmlFor="due-date">Échéance</Label>
      <DatePicker id="due-date" value={date} onValueChange={setDate} />
      <p className="text-xs text-muted-foreground">
        Valeur : {date ? date.toLocaleDateString("fr-FR") : "aucune"}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  name: "Contrôlé",
  render: () => <ControlledExample />
};

export const Sizes: Story = {
  name: "Tailles",
  render: () => (
    <div className="grid w-72 gap-3">
      <DatePicker size="sm" aria-label="Date sm" />
      <DatePicker size="md" aria-label="Date md" />
      <DatePicker size="lg" aria-label="Date lg" />
    </div>
  )
};

export const DisabledDays: Story = {
  name: "Jours désactivés (week-ends et passé)",
  render: () => (
    <div className="w-72">
      <DatePicker
        aria-label="Date de livraison"
        calendarProps={{ disabled: [{ dayOfWeek: [0, 6] }, { before: new Date() }] }}
      />
    </div>
  )
};

export const English: Story = {
  name: "Anglais",
  render: () => (
    <div className="w-72">
      <DatePicker locale={enUS} placeholder="Pick a date" defaultValue={new Date(2026, 9, 20)} />
    </div>
  )
};

export const Disabled: Story = {
  name: "Désactivé",
  args: { disabled: true }
};

export const InlineCalendar: Story = {
  name: "Calendrier seul",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 20));
    return (
      <div className="rounded-xl border border-border bg-card p-3">
        <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />
      </div>
    );
  }
};

export const RangeCalendar: Story = {
  name: "Calendrier période",
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date } | undefined>({
      from: new Date(2026, 9, 12),
      to: new Date(2026, 9, 16)
    });
    return (
      <div className="rounded-xl border border-border bg-card p-3">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={range as { from: Date; to?: Date }}
          onSelect={setRange}
          defaultMonth={new Date(2026, 9, 1)}
        />
      </div>
    );
  }
};

export const Dark: Story = {
  name: "Sombre",
  globals: { theme: "dark" },
  render: () => (
    <div className="rounded-xl border border-border bg-card p-3">
      <Calendar mode="single" selected={new Date(2026, 9, 20)} defaultMonth={new Date(2026, 9, 1)} />
    </div>
  )
};
