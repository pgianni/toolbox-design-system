import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import {
  Label,
  OptionCard,
  OptionCardGroup,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@pgianni/toolbox-react";

function Icon({ path }: { path: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const projectTypes = [
  {
    value: "creation",
    label: "Création",
    description: "Un nouveau produit ou service",
    icon: <Icon path="M12 5v14M5 12h14" />
  },
  {
    value: "refonte",
    label: "Refonte",
    description: "Repenser un produit existant",
    icon: <Icon path="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />
  },
  {
    value: "amelioration",
    label: "Amélioration",
    description: "Faire évoluer une partie du produit",
    icon: <Icon path="m3 17 6-6 4 4 8-8M14 7h7v7" />
  }
] as const;

const meta = {
  title: "Forms/OptionCard",
  component: OptionCardGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof OptionCardGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function QuestionExample() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="grid w-[640px] max-w-full gap-4 rounded-2xl border border-border bg-card p-6">
      <Label id="project-type" className="text-xl font-semibold">
        Quel type de projet ?
      </Label>
      <OptionCardGroup aria-labelledby="project-type" value={value} onValueChange={setValue}>
        {projectTypes.map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
          />
        ))}
      </OptionCardGroup>
    </div>
  );
}

export const Default: Story = {
  name: "Question (questionnaire UX Method)",
  render: () => <QuestionExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const refonte = canvas.getByRole("radio", { name: /Refonte/ });

    await userEvent.click(refonte);
    await expect(refonte).toBeChecked();
  }
};

export const WithDisabledOption: Story = {
  name: "Option indisponible avec explication",
  render: () => (
    <TooltipProvider>
      <OptionCardGroup
        aria-label="Dette UX"
        defaultValue="moderee"
        className="w-[640px] max-w-full"
      >
        <OptionCard value="moderee" label="Modérée" icon={<Icon path="M5 12h14" />} />
        <OptionCard value="forte" label="Forte" icon={<Icon path="M12 5v14M5 12h14" />} />
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex">
              <OptionCard
                value="aucune"
                label="Aucune"
                disabled
                className="w-full"
                icon={<Icon path="M18 6 6 18M6 6l12 12" />}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            Indisponible pour une amélioration : il existe forcément un minimum d’existant.
          </TooltipContent>
        </Tooltip>
      </OptionCardGroup>
    </TooltipProvider>
  )
};

export const Horizontal: Story = {
  name: "Disposition horizontale",
  render: () => (
    <OptionCardGroup aria-label="Type de projet" defaultValue="creation" className="w-[360px] sm:grid-cols-1">
      {projectTypes.map((option) => (
        <OptionCard
          key={option.value}
          layout="horizontal"
          value={option.value}
          label={option.label}
          description={option.description}
          icon={option.icon}
        />
      ))}
    </OptionCardGroup>
  )
};
