import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import {
  Tag,
  TagGroup,
  TagToggle,
  type TagAppearance,
  type TagTone
} from "@pgianni/toolbox-react";

const tones: TagTone[] = ["neutral", "primary", "info", "success", "warning", "danger"];
const appearances: TagAppearance[] = ["soft", "outline", "solid"];

const meta = {
  title: "Data display/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    children: "Planifié",
    tone: "info",
    appearance: "soft",
    size: "md"
  },
  argTypes: {
    tone: { control: "inline-radio", options: tones },
    appearance: { control: "inline-radio", options: appearances },
    size: { control: "inline-radio", options: ["sm", "md"] }
  }
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

function DotIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}

// One icon per tone, shown before the label in the preview matrix.
const toneIconPaths: Record<TagTone, string> = {
  neutral: "M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  primary: "m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6Z",
  info: "M12 11v5M12 8h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  success: "m8 12 3 3 5-6M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  warning: "M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.01",
  danger: "m15 9-6 6M9 9l6 6M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
};

function ToneIcon({ tone }: { tone: TagTone }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={toneIconPaths[tone]} />
    </svg>
  );
}

export const Default: Story = {};

function Matrix() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <table className="border-separate border-spacing-x-4 border-spacing-y-3">
        <thead>
          <tr>
            <th className="text-left text-xs font-medium text-muted-foreground">Ton</th>
            {appearances.map((appearance) => (
              <th
                key={appearance}
                className="text-left text-xs font-medium text-muted-foreground"
              >
                {appearance}
              </th>
            ))}
            <th className="text-left text-xs font-medium text-muted-foreground">sm + icône</th>
          </tr>
        </thead>
        <tbody>
          {tones.map((tone) => (
            <tr key={tone}>
              <th scope="row" className="pr-2 text-left text-sm font-medium">
                {tone}
              </th>
              {appearances.map((appearance) => (
                <td key={appearance}>
                  <Tag tone={tone} appearance={appearance}>
                    <ToneIcon tone={tone} />
                    {tone}
                  </Tag>
                </td>
              ))}
              <td>
                <Tag tone={tone} size="sm">
                  <ToneIcon tone={tone} />
                  {tone}
                </Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const AllTones: Story = {
  name: "Tons et apparences",
  render: () => <Matrix />
};

export const AllTonesDark: Story = {
  name: "Tons et apparences (sombre)",
  globals: { theme: "dark" },
  render: () => <Matrix />
};

export const Statuses: Story = {
  name: "Usages (statuts, sévérités, domaines)",
  render: () => (
    <div className="grid gap-4">
      <TagGroup aria-label="Statuts de projet (UX Team)">
        <Tag tone="primary" appearance="solid">Actif</Tag>
        <Tag tone="info" appearance="solid">Planifié</Tag>
        <Tag tone="warning" appearance="solid">Opportunité</Tag>
        <Tag tone="neutral" appearance="solid">En pause</Tag>
        <Tag tone="success" appearance="solid">Terminé</Tag>
        <Tag tone="danger" appearance="solid">Annulé</Tag>
      </TagGroup>
      <TagGroup aria-label="Sévérités (Userflow)">
        <Tag tone="danger">À corriger</Tag>
        <Tag tone="warning">À améliorer</Tag>
        <Tag tone="neutral">Bon à savoir</Tag>
      </TagGroup>
      <TagGroup aria-label="Conformité (Audit)">
        <Tag tone="success" size="sm">Conforme</Tag>
        <Tag tone="danger" size="sm">Non conforme</Tag>
        <Tag tone="neutral" size="sm">Non applicable</Tag>
      </TagGroup>
      <TagGroup aria-label="Catégories d’outil (Design Hub)">
        <Tag appearance="outline">Cadrer</Tag>
        <Tag appearance="outline">Concevoir</Tag>
        <Tag appearance="outline">Mesurer</Tag>
      </TagGroup>
    </div>
  )
};

function RemovableExample() {
  const [filters, setFilters] = useState(["Planifié", "Actif", "Designer : Camille"]);

  return (
    <div className="grid w-[420px] gap-3">
      <TagGroup aria-label="Filtres actifs">
        {filters.map((filter) => (
          <Tag
            key={filter}
            tone="primary"
            onRemove={() => setFilters((current) => current.filter((item) => item !== filter))}
          >
            {filter}
          </Tag>
        ))}
      </TagGroup>
      {filters.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun filtre actif.</p>
      ) : null}
    </div>
  );
}

export const Removable: Story = {
  name: "Supprimable (filtres actifs)",
  render: () => <RemovableExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Retirer Actif" }));
    await expect(canvas.queryByText("Actif")).toBeNull();
  }
};

const tools = [
  { id: "method", name: "UX Method", count: 12 },
  { id: "audit", name: "Audit", count: 4 },
  { id: "userflow", name: "Userflow", count: 7 },
  { id: "impact", name: "Impact Signals", count: 0 }
] as const;

function ToggleExample() {
  const [selected, setSelected] = useState<string | null>(null);
  const total = tools.reduce((sum, tool) => sum + tool.count, 0);

  return (
    <TagGroup aria-label="Filtrer par outil">
      <TagToggle pressed={selected === null} count={total} onPressedChange={() => setSelected(null)}>
        Tous
      </TagToggle>
      {tools.map((tool) => (
        <TagToggle
          key={tool.id}
          pressed={selected === tool.id}
          count={tool.count}
          onPressedChange={(pressed) => setSelected(pressed ? tool.id : null)}
        >
          <DotIcon />
          {tool.name}
        </TagToggle>
      ))}
    </TagGroup>
  );
}

export const Toggle: Story = {
  name: "Filtres à bascule (Design Hub, Impact)",
  render: () => <ToggleExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const audit = canvas.getByRole("button", { name: /Audit/ });

    await userEvent.click(audit);
    await expect(audit).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByRole("button", { name: /Tous/ })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  }
};
