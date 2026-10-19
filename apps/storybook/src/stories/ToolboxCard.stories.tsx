import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tag
} from "@pgianni/toolbox-react";

const meta = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Audit UX</CardTitle>
          <Tag tone="primary">Actif</Tag>
        </div>
        <CardDescription>
          Analysez un parcours et centralisez les observations de l’équipe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">12 observations · Mise à jour aujourd’hui</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Archiver</Button>
        <Button>Ouvrir</Button>
      </CardFooter>
    </Card>
  )
};
