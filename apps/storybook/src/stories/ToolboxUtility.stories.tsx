import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Separator,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@pgianni/toolbox-react";

function UtilityPreview() {
  return (
    <div className="w-[360px] space-y-6">
      <TooltipProvider delayDuration={0}>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline">Survoler</Button>
          </TooltipTrigger>
          <TooltipContent>Créer un nouveau projet</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator />

      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Utilities/Feedback",
  component: UtilityPreview,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof UtilityPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

export const VerticalSeparator: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4 text-sm">
      <span>Projet</span>
      <Separator orientation="vertical" />
      <span>Équipe</span>
      <Separator orientation="vertical" />
      <span>Planning</span>
    </div>
  )
};
