import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, EmptyState } from "@pgianni/toolbox-react";

function FolderIcon() {
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
      <path d="M3 6h6l2 2h10v11H3z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  args: {
    title: "Aucun projet pour l’instant",
    description: "Créez un projet pour planifier votre démarche UX et l’estimer."
  }
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[480px] rounded-xl border border-border bg-card">
      <EmptyState
        {...args}
        icon={<FolderIcon />}
        action={<Button>Créer un projet</Button>}
      />
    </div>
  )
};

export const Bordered: Story = {
  render: () => (
    <div className="w-[480px]">
      <EmptyState
        bordered
        icon={<FolderIcon />}
        title="Aucune activité ajoutée"
        description="Glissez des activités depuis la bibliothèque pour construire le planning."
        action={
          <>
            <Button variant="outline">Voir la bibliothèque</Button>
            <Button>Ajouter une activité</Button>
          </>
        }
      />
    </div>
  )
};

export const NoResults: Story = {
  name: "Sans résultat (petit)",
  render: () => (
    <div className="w-[320px] rounded-xl border border-border bg-card">
      <EmptyState
        size="sm"
        icon={<SearchIcon />}
        title="Aucun résultat"
        description="Essayez un autre mot-clé ou retirez un filtre."
      />
    </div>
  )
};
