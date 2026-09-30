import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@pgianni/toolbox-react";

const meta = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["ai-generated"],
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
          <Badge>Actif</Badge>
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

export const BadgeVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Actif</Badge>
      <Badge variant="secondary">Brouillon</Badge>
      <Badge variant="destructive">Bloqué</Badge>
      <Badge variant="outline">Archivé</Badge>
    </div>
  )
};
