import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "@pgianni/toolbox-react";

const meta = {
  title: "Utilities/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    ratio: {
      control: "inline-radio",
      options: [1, 4 / 3, 16 / 9]
    }
  }
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 16 / 9
  },
  render: (args) => (
    <div className="w-[420px] overflow-hidden rounded-lg border border-border">
      <AspectRatio {...args}>
        <img
          src="https://img.giannipolito.fr/splash/splash-method.png"
          alt="Écran d’accueil de UX Method"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  )
};
