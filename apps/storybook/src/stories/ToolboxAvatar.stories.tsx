import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarImage } from "@pgianni/toolbox-react";

const meta = {
  title: "Data display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://img.giannipolito.fr/app-icons/app-logo-method.svg"
        alt="UX Method"
      />
      <AvatarFallback>UM</AvatarFallback>
    </Avatar>
  )
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://invalid.example/avatar.png" alt="Gianni Polito" />
      <AvatarFallback>GP</AvatarFallback>
    </Avatar>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">GP</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GP</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback className="text-base">GP</AvatarFallback>
      </Avatar>
    </div>
  )
};
