import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button } from "@pgianni/toolbox-react";

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

function ChevronRightIcon() {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.22-8.56" />
    </svg>
  );
}

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
  "brand",
  "brand-outline",
  "brand-ghost",
  "purple",
  "gradient",
  "save"
] as const;

const sizes = ["sm", "default", "lg"] as const;
const iconSizes = ["icon-xs", "icon-sm", "icon-md", "icon", "icon-lg"] as const;

const meta = {
  component: Button,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants
    },
    size: {
      control: "select",
      options: [...sizes, ...iconSizes]
    },
    shape: {
      control: "select",
      options: ["pill", "rounded", "square"]
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Créer un projet",
    type: "button"
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-wrap items-center justify-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} type="button">
          {variant}
        </Button>
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} type="button">
          Taille {size}
        </Button>
      ))}
    </div>
  )
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {iconSizes.map((size) => (
        <Button
          key={size}
          size={size}
          variant="ghost"
          shape="pill"
          type="button"
          aria-label={`Ajouter — taille ${size}`}
          title={`Taille ${size}`}
        >
          <PlusIcon />
        </Button>
      ))}
    </div>
  )
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button shape="pill">Pill — défaut</Button>
      <Button shape="rounded">Rounded</Button>
      <Button shape="square">Square</Button>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button>Normal</Button>
      <Button disabled>Désactivé</Button>
      <Button aria-busy="true">Chargement…</Button>
    </div>
  )
};

export const WithLeadingIcon: Story = {
  render: () => (
    <Button type="button">
      <PlusIcon />
      Ajouter un projet
    </Button>
  )
};

export const WithTrailingChevron: Story = {
  render: () => (
    <Button type="button" variant="outline">
      Continuer
      <ChevronRightIcon />
    </Button>
  )
};

export const Loading: Story = {
  render: () => (
    <Button type="button" disabled aria-busy="true">
      <SpinnerIcon />
      Enregistrement…
    </Button>
  )
};

export const CssCheck: Story = {
  args: {
    children: "Vérifier le thème",
    type: "button"
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /vérifier le thème/i });
    await expect(getComputedStyle(button).backgroundColor).toBe("rgb(68, 0, 255)");
  }
};
