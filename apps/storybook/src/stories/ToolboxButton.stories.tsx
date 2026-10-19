import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { expect } from "storybook/test";
import { Button, buttonVariants } from "@pgianni/toolbox-react";

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

function ArrowRightIcon() {
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

function ChevronDownIcon() {
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
      <path d="m6 9 6 6 6-6" />
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
  "primary",
  "secondary",
  "tertiary",
  "ghost"
] as const;

const sizes = ["sm", "default", "lg"] as const;
const iconOptions = ["None", "Icon left", "Icon right", "Icon only"] as const;
const iconSizeByButtonSize = {
  sm: "icon-sm",
  default: "icon",
  lg: "icon-lg"
} as const;

type ButtonStoryArgs = ComponentProps<typeof Button> & {
  icon: (typeof iconOptions)[number];
};

const meta = {
  component: Button,
  tags: ["ai-generated"],
  args: {
    icon: "None",
    size: "default"
  },
  render: ({ icon, children, ...args }) => {
    const accessibleLabel =
      typeof children === "string" ? children : "Action du bouton";
    const controlledSize =
      args.size === "sm" || args.size === "lg" ? args.size : "default";

    return (
      <Button
        {...args}
        size={
          icon === "Icon only" ? iconSizeByButtonSize[controlledSize] : args.size
        }
        aria-label={
          icon === "Icon only" ? args["aria-label"] ?? accessibleLabel : args["aria-label"]
        }
      >
        {(icon === "Icon left" || icon === "Icon only") && <PlusIcon />}
        {icon !== "Icon only" && children}
        {icon === "Icon right" && <ArrowRightIcon />}
      </Button>
    );
  },
  parameters: {
    layout: "centered"
  },
  argTypes: {
    icon: {
      control: "inline-radio",
      options: iconOptions,
      description: "Position de l’icône dans le bouton"
    },
    variant: {
      control: "inline-radio",
      options: variants
    },
    size: {
      control: {
        type: "inline-radio",
        labels: {
          sm: "Small",
          default: "Medium",
          lg: "Large"
        }
      },
      options: sizes
    },
    shape: {
      control: "select",
      options: ["pill", "rounded", "square"]
    }
  }
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  args: {
    children: "Action du bouton",
    variant: "primary",
    type: "button"
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /action du bouton/i });
    await expect(button.className).toContain("active:translate-y-0.5");
    await expect(button.className).toContain("duration-fast");
    await expect(buttonVariants({ variant: "secondary" })).toContain(
      "border-input"
    );
    await expect(buttonVariants({ variant: "secondary" })).toContain(
      "text-action-foreground"
    );
    await expect(buttonVariants({ variant: "ghost" })).toContain(
      "text-action-foreground"
    );
    await expect(buttonVariants({ variant: "brand-outline" })).toBe(
      buttonVariants({ variant: "secondary" })
    );
  }
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
  name: "Split button avec chevron",
  render: () => (
    <div role="group" aria-label="Actions de publication" className="inline-flex">
      <Button type="button" className="rounded-r-none pr-3">
        Publier
      </Button>
      <Button
        type="button"
        size="icon"
        className="rounded-l-none border-l border-primary-foreground/30"
        aria-label="Afficher les options de publication"
        aria-haspopup="menu"
      >
        <ChevronDownIcon />
      </Button>
    </div>
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
