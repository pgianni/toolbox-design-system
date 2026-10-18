import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@pgianni/toolbox-react";

const phases = [
  { value: "discovery", label: "Découverte" },
  { value: "definition", label: "Définition" },
  { value: "ideation", label: "Idéation" },
  { value: "prototyping", label: "Prototypage" },
  { value: "testing", label: "Tests utilisateurs" }
] as const;

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-[320px] gap-2">
      <Label htmlFor="activity-phase">Phase</Label>
      <Select>
        <SelectTrigger id="activity-phase">
          <SelectValue placeholder="Choisir une phase" />
        </SelectTrigger>
        <SelectContent>
          {phases.map((phase) => (
            <SelectItem key={phase.value} value={phase.value}>
              {phase.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "Phase" });

    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole("option", { name: "Idéation" }));
    await expect(trigger).toHaveTextContent("Idéation");
  }
};

export const WithGroups: Story = {
  render: () => (
    <div className="grid w-[320px] gap-2">
      <Label htmlFor="activity-type">Type d’activité</Label>
      <Select defaultValue="interviews">
        <SelectTrigger id="activity-type">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Recherche</SelectLabel>
            <SelectItem value="interviews">Entretiens</SelectItem>
            <SelectItem value="survey">Questionnaire</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Conception</SelectLabel>
            <SelectItem value="wireframes">Wireframes</SelectItem>
            <SelectItem value="prototype">Prototype</SelectItem>
            <SelectItem value="design-system" disabled>
              Design system (bientôt)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
};

export const NextToInput: Story = {
  name: "Aligned with Input",
  render: () => (
    <div className="grid w-[420px] grid-cols-2 gap-3">
      <div className="grid gap-2">
        <Label htmlFor="daily-rate">Taux journalier</Label>
        <Input id="daily-rate" defaultValue="650" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="currency">Devise</Label>
        <Select defaultValue="eur">
          <SelectTrigger id="currency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eur">Euro (€)</SelectItem>
            <SelectItem value="usd">Dollar ($)</SelectItem>
            <SelectItem value="chf">Franc suisse (CHF)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-[320px] gap-2">
      <Label htmlFor="locked-phase">Phase</Label>
      <Select defaultValue="testing" disabled>
        <SelectTrigger id="locked-phase">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {phases.map((phase) => (
            <SelectItem key={phase.value} value={phase.value}>
              {phase.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
};
