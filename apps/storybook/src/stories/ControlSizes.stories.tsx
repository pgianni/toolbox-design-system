import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { expect } from "storybook/test";
import {
  Button,
  Input,
  NumberInput,
  SearchInput,
  SegmentedControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
  type ControlSize
} from "@pgianni/toolbox-react";

const sizes: { size: ControlSize; px: number; band: string }[] = [
  { size: "sm", px: 36, band: "h-9" },
  { size: "md", px: 40, band: "h-10" },
  { size: "lg", px: 44, band: "h-11" }
];

const meta = {
  title: "Forms/Tailles et alignements",
  parameters: {
    layout: "padded"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** Shows a control with its measured height underneath. */
function Measured({ name, children }: { name: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const control = ref.current?.querySelector<HTMLElement>("[data-control]") ?? ref.current?.firstElementChild;
    if (!control) return;
    const update = () => setHeight(Math.round((control as HTMLElement).getBoundingClientRect().height));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(control);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-start gap-1.5">
      <div ref={ref} data-measured={name} data-height={height ?? ""}>
        {children}
      </div>
      <span className="text-[11px] text-muted-foreground">
        {name} · {height ?? "…"} px
      </span>
    </div>
  );
}

function SizeRow({ size, px, band }: (typeof sizes)[number]) {
  return (
    <section className="grid gap-3" data-size={size}>
      <h3 className="text-sm font-semibold">
        {size} <span className="font-normal text-muted-foreground">· {px} px</span>
      </h3>
      <div className="relative isolate flex flex-nowrap items-start gap-4 overflow-x-auto pb-1">
        {/* Guide band: every control of this size should fill it exactly. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 -z-10 w-[1600px] ${band} border-y border-dashed border-primary/50 bg-primary/5`}
        />
        <Measured name="Input">
          <Input size={size} placeholder="Nom du projet" className="w-44" aria-label={`Champ ${size}`} />
        </Measured>
        <Measured name="Select">
          <Select defaultValue="ux">
            <SelectTrigger size={size} className="w-44" aria-label={`Liste ${size}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ux">Recherche UX</SelectItem>
              <SelectItem value="ui">Design UI</SelectItem>
            </SelectContent>
          </Select>
        </Measured>
        <Measured name="SearchInput">
          <SearchInput size={size} wrapperClassName="w-48" aria-label={`Recherche ${size}`} />
        </Measured>
        <Measured name="NumberInput">
          <NumberInput size={size} defaultValue={3} aria-label={`Nombre ${size}`} />
        </Measured>
        <Measured name="SegmentedControl">
          <SegmentedControl
            size={size}
            aria-label={`Vue ${size}`}
            defaultValue="list"
            options={[
              { value: "list", label: "Liste" },
              { value: "cards", label: "Cartes" }
            ]}
          />
        </Measured>
        <Measured name="Tabs sans bordure">
          <Tabs size={size} container={false} defaultValue="list">
            <TabsList aria-label={`Onglets ${size}`}>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="cards">Cartes</TabsTrigger>
            </TabsList>
          </Tabs>
        </Measured>
        <Measured name="Tabs">
          <Tabs size={size} defaultValue="list">
            <TabsList aria-label={`Onglets avec conteneur ${size}`}>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="cards">Cartes</TabsTrigger>
            </TabsList>
          </Tabs>
        </Measured>
        <Measured name="Button primary">
          <Button size={size}>Enregistrer</Button>
        </Measured>
        <Measured name="Button outline">
          <Button size={size} variant="outline">
            Annuler
          </Button>
        </Measured>
        <Measured name="Button iconOnly">
          <Button size={size} variant="outline" iconOnly aria-label="Ajouter">
            <PlusIcon />
          </Button>
        </Measured>
      </div>
    </section>
  );
}

export const Alignment: Story = {
  name: "Alignement par taille",
  render: () => (
    <div className="grid gap-10 rounded-xl border border-border bg-card p-6 text-foreground">
      <p className="max-w-2xl text-sm text-muted-foreground">
        Tous les éléments d’une même taille ont la même hauteur : sm 36 px, md 40 px
        (par défaut), lg 44 px. La bande pointillée matérialise cette hauteur ; chaque
        contrôle doit la remplir exactement.
      </p>
      {sizes.map((row) => (
        <SizeRow key={row.size} {...row} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    for (const { size, px } of sizes) {
      const row = canvasElement.querySelector(`[data-size="${size}"]`);
      const controls = [...(row?.querySelectorAll<HTMLElement>("[data-measured]") ?? [])];
      const heights = controls.map((wrapper) => {
        const control = wrapper.firstElementChild as HTMLElement;
        return Math.round(control.getBoundingClientRect().height);
      });
      await expect(heights.every((height) => height === px)).toBe(true);
    }
  }
};

export const Dark: Story = {
  ...Alignment,
  name: "Alignement par taille (sombre)",
  globals: { theme: "dark" }
};
