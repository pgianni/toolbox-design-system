import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Tag } from "@pgianni/toolbox-react";

const meta = {
  title: "Data display/Badge (déprécié)",
  component: Badge,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const mapping = [
  { variant: "default", tag: <Tag tone="primary" appearance="solid">Actif</Tag>, code: '<Tag tone="primary" appearance="solid">' },
  { variant: "secondary", tag: <Tag>Brouillon</Tag>, code: "<Tag>" },
  { variant: "destructive", tag: <Tag tone="danger" appearance="solid">Bloqué</Tag>, code: '<Tag tone="danger" appearance="solid">' },
  { variant: "outline", tag: <Tag appearance="outline">Archivé</Tag>, code: '<Tag appearance="outline">' }
] as const;

export const Migration: Story = {
  name: "Badge → Tag",
  render: () => (
    <table className="border-separate border-spacing-x-6 border-spacing-y-3 text-sm">
      <thead>
        <tr className="text-left text-xs text-muted-foreground">
          <th>Badge (déprécié)</th>
          <th>Rendu identique</th>
          <th>À écrire</th>
        </tr>
      </thead>
      <tbody>
        {mapping.map((row) => (
          <tr key={row.variant}>
            <td>
              <Badge variant={row.variant}>{row.variant}</Badge>
            </td>
            <td>{row.tag}</td>
            <td>
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{row.code}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};
