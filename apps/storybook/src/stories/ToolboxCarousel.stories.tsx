import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AspectRatio,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@pgianni/toolbox-react";

const steps = [
  "Découverte",
  "Définition",
  "Idéation",
  "Prototypage",
  "Tests utilisateurs"
] as const;

const meta = {
  title: "Surfaces/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-[320px]" aria-label="Étapes de la démarche">
      <CarouselContent>
        {steps.map((step, index) => (
          <CarouselItem key={step}>
            <Card>
              <CardContent className="flex aspect-square flex-col items-center justify-center gap-2 p-6">
                <span className="text-4xl font-semibold text-action-foreground">
                  {index + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
};

export const SeveralPerView: Story = {
  render: () => (
    <Carousel
      opts={{ align: "start" }}
      className="w-[520px]"
      aria-label="Étapes de la démarche"
    >
      <CarouselContent>
        {steps.map((step) => (
          <CarouselItem key={step} className="basis-1/3">
            <Card>
              <CardContent className="p-0">
                <AspectRatio
                  ratio={4 / 3}
                  className="flex items-center justify-center rounded-lg bg-muted text-sm font-medium"
                >
                  {step}
                </AspectRatio>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
};
