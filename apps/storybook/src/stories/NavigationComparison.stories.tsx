import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  AppHeaderNav,
  AppHeaderNavItem,
  MobileBottomNav,
  MobileBottomNavItem,
  Tabs,
  TabsList,
  TabsTrigger
} from "@pgianni/toolbox-react";

const items = ["Accueil", "Projets", "Templates", "Assistant"] as const;

const meta = {
  title: "Navigation/Comparaison",
  parameters: {
    layout: "centered"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Icon({ path }: { path: string }) {
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
      <path d={path} />
    </svg>
  );
}

const icons: Record<(typeof items)[number], string> = {
  Accueil: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
  Projets: "M3 6h6l2 2h10v11H3z",
  Templates: "M4 4h16v6H4zM4 14h7v6H4zM15 14h5v6h-5z",
  Assistant: "M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[10rem_1fr] items-center gap-6">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function TabsRow({ variant }: { variant: "default" | "page" }) {
  return (
    <Tabs variant={variant} defaultValue={items[0]}>
      <TabsList aria-label={`Tabs ${variant}`}>
        {items.map((item) => (
          <TabsTrigger key={item} value={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function Comparison() {
  const [activeItem, setActiveItem] = useState<(typeof items)[number]>(items[0]);

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 text-foreground">
      <Row label="AppHeaderNav">
        <AppHeaderNav showFrom="sm" aria-label="Navigation principale">
          {items.map((item) => (
            <AppHeaderNavItem
              key={item}
              active={activeItem === item}
              onClick={() => setActiveItem(item)}
            >
              {item}
            </AppHeaderNavItem>
          ))}
        </AppHeaderNav>
      </Row>
      <Row label="Tabs">
        <TabsRow variant="default" />
      </Row>
      <Row label='Tabs "page"'>
        <TabsRow variant="page" />
      </Row>
      <Row label="MobileBottomNav">
        {/* Shown inline here instead of fixed to the viewport bottom. */}
        <MobileBottomNav
          aria-label="Navigation mobile"
          className="static block h-[4.375rem] w-[22rem] rounded-xl border pb-1 sm:block md:block lg:block xl:block"
        >
          {items.map((item) => (
            <MobileBottomNavItem
              key={item}
              active={activeItem === item}
              onClick={() => setActiveItem(item)}
            >
              <Icon path={icons[item]} />
              <span className="truncate">{item}</span>
            </MobileBottomNavItem>
          ))}
        </MobileBottomNav>
      </Row>
    </div>
  );
}

export const Light: Story = {
  globals: { theme: "light" },
  render: () => <Comparison />
};

export const Dark: Story = {
  globals: { theme: "dark" },
  render: () => <Comparison />
};
