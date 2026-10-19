import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Stepper, type StepperStep } from "@pgianni/toolbox-react";

const steps: StepperStep[] = [
  { id: "setup", label: "Cadrage" },
  { id: "builder", label: "Construction" },
  { id: "preview", label: "Export" }
];

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    steps,
    current: "builder"
  }
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function InteractiveExample() {
  const [current, setCurrent] = useState("builder");

  return (
    <Stepper
      steps={[
        { id: "setup", label: "Cadrage" },
        { id: "builder", label: "Construction" },
        // Export only opens once the planning is built (UX Method).
        { id: "preview", label: "Export", disabled: current === "setup" }
      ]}
      current={current}
      onStepChange={setCurrent}
    />
  );
}

export const Interactive: Story = {
  name: "Cliquable",
  render: () => <InteractiveExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Export/ }));
    await expect(canvas.getByText("Export").closest("li")).toHaveAttribute(
      "aria-current",
      "step"
    );
  }
};

export const Vertical: Story = {
  name: "Vertical avec descriptions",
  args: {
    orientation: "vertical",
    current: "questions",
    steps: [
      { id: "profile", label: "Profil du projet", description: "Type, durée, équipe" },
      { id: "questions", label: "Questionnaire", description: "8 questions" },
      { id: "plan", label: "Proposition de plan", description: "Activités recommandées" }
    ]
  }
};
