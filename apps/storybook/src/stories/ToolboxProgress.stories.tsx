import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label, Progress } from "@pgianni/toolbox-react";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    value: 60,
    tone: "primary",
    size: "md",
    "aria-label": "Avancement"
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    tone: {
      control: "inline-radio",
      options: ["primary", "info", "success", "warning", "danger"]
    },
    size: { control: "inline-radio", options: ["sm", "md"] }
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  name: "Avec libellé (questionnaire)",
  render: () => (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm">
        <Label id="questionnaire-progress">Questionnaire</Label>
        <span className="text-muted-foreground">3 sur 8</span>
      </div>
      <Progress value={3} max={8} valueText="3 sur 8" aria-labelledby="questionnaire-progress" />
    </div>
  )
};

const team = [
  { name: "Camille", load: 120, tone: "danger" },
  { name: "Léo", load: 85, tone: "warning" },
  { name: "Inès", load: 60, tone: "success" }
] as const;

export const Load: Story = {
  name: "Charge d’équipe (tons)",
  render: () => (
    <div className="grid gap-3">
      {team.map((member) => (
        <div key={member.name} className="grid gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <span id={`load-${member.name}`} className="font-medium">
              {member.name}
            </span>
            <span className="text-muted-foreground">{member.load} %</span>
          </div>
          <Progress
            size="sm"
            tone={member.tone}
            value={Math.min(member.load, 100)}
            valueText={`${member.load} %`}
            aria-labelledby={`load-${member.name}`}
          />
        </div>
      ))}
    </div>
  )
};

export const Indeterminate: Story = {
  args: {
    value: undefined,
    "aria-label": "Import en cours"
  }
};
