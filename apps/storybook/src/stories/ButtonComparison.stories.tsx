import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, buttonVariants } from "@pgianni/toolbox-react";

const variants = ["primary", "secondary", "tertiary", "outline", "ghost", "link"] as const;

const meta = {
  title: "Actions/Button/Comparaison",
  parameters: {
    layout: "centered"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function TrashIcon() {
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
      <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
    </svg>
  );
}

const columns = ["Défaut", "Icône", "Icône seule", "Désactivé", "Danger", "Danger + icône"];

function Comparison() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card p-6 text-foreground">
      <table className="border-separate border-spacing-x-4 border-spacing-y-3">
        <thead>
          <tr>
            <th className="text-left text-xs font-medium text-muted-foreground">Variante</th>
            {columns.map((column) => (
              <th
                key={column}
                className="text-left text-xs font-medium text-muted-foreground"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant}>
              <th scope="row" className="pr-2 text-left text-sm font-medium">
                {variant}
              </th>
              <td>
                <Button variant={variant}>Enregistrer</Button>
              </td>
              <td>
                <Button variant={variant}>
                  <PlusIcon />
                  Ajouter
                </Button>
              </td>
              <td>
                {variant === "link" ? null : (
                  <Button variant={variant} size="icon" aria-label="Ajouter">
                    <PlusIcon />
                  </Button>
                )}
              </td>
              <td>
                <Button variant={variant} disabled>
                  Enregistrer
                </Button>
              </td>
              <td>
                <Button variant={variant} danger>
                  Supprimer
                </Button>
              </td>
              <td>
                <Button variant={variant} danger>
                  <TrashIcon />
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Light: Story = {
  globals: { theme: "light" },
  render: () => <Comparison />,
  play: async () => {
    // danger is layered on top of the chosen variant.
    if (!buttonVariants({ variant: "tertiary", danger: true }).includes("text-red-600")) {
      throw new Error("tertiary + danger should use the red label");
    }
  }
};

export const Dark: Story = {
  globals: { theme: "dark" },
  render: () => <Comparison />
};
