import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@pgianni/toolbox-react";

const faq = [
  {
    id: "what",
    question: "À quoi sert UX Method ?",
    answer:
      "À construire une démarche UX/UI, la planifier et l’estimer en jours."
  },
  {
    id: "export",
    question: "Puis-je exporter mon planning ?",
    answer: "Oui, en PDF depuis l’étape Export."
  },
  {
    id: "rate",
    question: "Comment changer le taux journalier ?",
    answer: "Depuis le récapitulatif du devis, avec le bouton Modifier."
  }
] as const;

const meta = {
  title: "Surfaces/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: "single",
    collapsible: true
  },
  render: (args) => (
    <Accordion {...args} className="w-[480px] max-w-full">
      {faq.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: faq[1].question });

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  }
};

export const Multiple: Story = {
  args: {
    type: "multiple",
    defaultValue: ["what", "export"]
  },
  render: (args) => (
    <Accordion {...args} className="w-[480px] max-w-full">
      {faq.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
};
