import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { NumberInput, Separator } from "@pgianni/toolbox-react";

const meta = {
  title: "Forms/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    defaultValue: 3,
    min: 0,
    max: 10,
    "aria-label": "Nombre d’écrans"
  },
  argTypes: {
    size: { control: "inline-radio", options: ["md", "lg"] }
  }
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: "Nombre d’écrans" });

    await userEvent.click(canvas.getByRole("button", { name: "Augmenter" }));
    await expect(input).toHaveValue("4");
  }
};

export const DecimalStep: Story = {
  name: "Pas de 0,5 (jours-homme)",
  args: {
    "aria-label": "Charge en jours",
    defaultValue: 1.5,
    step: 0.5,
    max: 20
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: "Charge en jours" });

    await userEvent.click(canvas.getByRole("button", { name: "Augmenter" }));
    await expect(input).toHaveValue("2");
    await userEvent.click(canvas.getByRole("button", { name: "Diminuer" }));
    await userEvent.click(canvas.getByRole("button", { name: "Diminuer" }));
    await expect(input).toHaveValue("1");
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowUp}");
    await expect(input).toHaveValue("1,5");
  }
};

export const TypedDecimals: Story = {
  name: "Saisie décimale (virgule ou point)",
  args: {
    "aria-label": "Taux journalier (k€)",
    defaultValue: 0.65,
    step: 0.05,
    max: 5
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: "Taux journalier (k€)" });

    await expect(input).toHaveValue("0,65");
    await userEvent.clear(input);
    await userEvent.type(input, "1.258");
    // The third decimal is refused (precision follows the 0.05 step).
    await expect(input).toHaveValue("1.25");
    await userEvent.tab();
    await expect(input).toHaveValue("1,25");
  }
};

export const AtMinimum: Story = {
  name: "Au minimum (− désactivé)",
  args: {
    defaultValue: 0
  }
};

const complexities = [
  { id: "simple", label: "Écrans simples" },
  { id: "medium", label: "Écrans intermédiaires" },
  { id: "complex", label: "Écrans complexes" }
] as const;

function ScreenComplexity() {
  const [counts, setCounts] = useState({ simple: 4, medium: 2, complex: 1 });

  return (
    <div className="w-[480px] rounded-2xl border border-border bg-card p-6">
      {complexities.map((item, index) => (
        <div key={item.id}>
          {index > 0 ? <Separator /> : null}
          <div className="flex items-center justify-between py-3">
            <span id={`count-${item.id}`} className="text-lg font-medium">
              {item.label}
            </span>
            <NumberInput
              size="lg"
              aria-labelledby={`count-${item.id}`}
              value={counts[item.id]}
              onValueChange={(value) => setCounts((current) => ({ ...current, [item.id]: value }))}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export const Complexity: Story = {
  name: "Complexité des écrans (UX Method)",
  render: () => <ScreenComplexity />
};
