import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@pgianni/toolbox-react";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="outline">Survoler</Button>
        </TooltipTrigger>
        <TooltipContent>Créer un nouveau projet</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};
