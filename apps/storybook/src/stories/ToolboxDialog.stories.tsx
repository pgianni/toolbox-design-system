import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Textarea
} from "@pgianni/toolbox-react";

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  parameters: { layout: "centered" }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Modifier le projet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le projet</DialogTitle>
          <DialogDescription>
            Les changements seront visibles par toute l’équipe.
          </DialogDescription>
        </DialogHeader>
        <Label className="grid gap-2">
          Nom du projet
          <Input defaultValue="Refonte de l’espace client" />
        </Label>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Modifier le projet" })
    );
    await expect(
      within(document.body).getByRole("dialog", { name: "Modifier le projet" })
    ).toBeVisible();
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">{size}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Dialog {size}</DialogTitle>
              <DialogDescription>
                448, 512, 672, 768, 896 px ou plein écran.
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-md bg-muted p-6 text-sm">
              Contenu de démonstration
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
};

export const CompactForm: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Inviter un membre</DialogTitle>
          <DialogDescription>
            La personne recevra une invitation par e-mail.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Label className="grid gap-2">
            Adresse e-mail
            <Input type="email" placeholder="prenom@entreprise.fr" />
          </Label>
          <Label className="grid gap-2">
            Rôle
            <select className="h-10 rounded-md border bg-background px-3 text-sm">
              <option>Éditeur</option>
              <option>Lecteur</option>
              <option>Administrateur</option>
            </select>
          </Label>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button>Envoyer l’invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export const LongScrollableForm: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent
        size="lg"
        variant="sectioned"
        className="h-[min(42rem,calc(100vh-2rem))]"
      >
        <DialogHeader>
          <DialogTitle>Paramètres du projet</DialogTitle>
          <DialogDescription>
            Le header et les actions restent visibles pendant le défilement.
          </DialogDescription>
        </DialogHeader>
        <DialogBody data-testid="dialog-body">
          <div className="grid gap-6">
            {[
              "Informations générales",
              "Responsables",
              "Objectifs",
              "Participants",
              "Notifications",
              "Confidentialité"
            ].map((section) => (
              <section key={section} className="grid gap-3">
                <h3 className="font-semibold">{section}</h3>
                <Label className="grid gap-2">
                  Intitulé
                  <Input placeholder={`${section}…`} />
                </Label>
                <Label className="grid gap-2">
                  Notes
                  <Textarea placeholder="Ajoutez les informations utiles…" />
                </Label>
              </section>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async () => {
    const body = within(document.body).getByTestId("dialog-body");
    await expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
  }
};

export const WideChart: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent size="xl" variant="sectioned">
        <DialogHeader>
          <DialogTitle>Adoption hebdomadaire</DialogTitle>
          <DialogDescription>
            Utilisateurs actifs par équipe sur les huit dernières semaines.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="grid gap-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold">8 462</p>
                <p className="text-sm text-muted-foreground">
                  +18,4 % depuis la période précédente
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                En progression
              </span>
            </div>
            <div
              role="img"
              aria-label="Histogramme montrant une progression régulière"
              className="flex h-64 items-end gap-3 rounded-xl bg-muted/60 p-5"
            >
              {[32, 46, 40, 58, 54, 68, 76, 88].map((height, index) => (
                <div key={height} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-primary/85"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">S{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline">Exporter</Button>
          <DialogClose asChild>
            <Button>Terminé</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export const Mobile: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" }
  },
  render: () => (
    <Dialog defaultOpen>
      <DialogContent
        size="sm"
        variant="sectioned"
        className="max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-[23rem]"
      >
        <DialogHeader>
          <DialogTitle>Créer une note</DialogTitle>
          <DialogDescription>
            Une composition adaptée aux écrans étroits.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="grid gap-4">
          <Label className="grid gap-2">
            Titre
            <Input placeholder="Titre de la note" />
          </Label>
          <Label className="grid gap-2">
            Contenu
            <Textarea className="min-h-40" placeholder="Commencez à écrire…" />
          </Label>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button>Créer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export const SmartAssistant: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <Dialog defaultOpen>
      <DialogContent
        size="2xl"
        variant="chromeless"
        fixedSections
        overlayClassName="bg-slate-950/35 backdrop-blur-sm"
        className="h-[min(46rem,calc(100vh-2rem))] rounded-2xl bg-background shadow-2xl"
      >
        <DialogHeader className="border-b px-6 py-5 pr-16">
          <DialogTitle>Smart Assistant</DialogTitle>
          <DialogDescription>
            Synthétise les observations et suggère les prochaines étapes.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="grid gap-5 bg-muted/35 px-6 py-5">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm border bg-background p-4 text-sm shadow-sm">
            J’ai regroupé les retours des cinq derniers entretiens. Le principal
            point de friction concerne la compréhension du tableau de bord.
          </div>
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary p-4 text-sm text-primary-foreground">
            Propose trois pistes d’amélioration priorisées.
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm border bg-background p-4 text-sm shadow-sm">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Clarifier la hiérarchie des indicateurs clés.</li>
              <li>Ajouter un résumé contextualisé au premier usage.</li>
              <li>Permettre la personnalisation des widgets.</li>
            </ol>
          </div>
        </DialogBody>
        <div className="border-t bg-background p-4">
          <Label className="sr-only" htmlFor="assistant-message">
            Message
          </Label>
          <div className="flex gap-2">
            <Input id="assistant-message" placeholder="Demander à l’assistant…" />
            <Button>Envoyer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export const DarkLightbox: Story = {
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
  render: () => (
    <Dialog defaultOpen>
      <DialogContent
        size="full"
        variant="chromeless"
        showClose={false}
        overlayClassName="bg-black/95 backdrop-blur-none"
        className="flex max-h-none flex-col text-white"
      >
        <DialogTitle className="sr-only">Aperçu du parcours utilisateur</DialogTitle>
        <DialogDescription className="sr-only">
          Aperçu plein écran d’une image, avec navigation.
        </DialogDescription>
        <div className="flex shrink-0 items-center justify-between p-4">
          <div>
            <p className="font-medium">Parcours utilisateur</p>
            <p className="text-sm text-white/60">Écran 4 sur 12</p>
          </div>
          <DialogClose asChild>
            <Button
              aria-label="Fermer l’aperçu"
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/15 hover:text-white"
            >
              <CloseIcon />
            </Button>
          </DialogClose>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center gap-4 px-4 pb-4">
          <Button
            aria-label="Image précédente"
            variant="ghost"
            size="icon"
            className="shrink-0 text-white hover:bg-white/15 hover:text-white"
          >
            <ChevronIcon direction="left" />
          </Button>
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
            <div className="grid max-w-lg gap-5 p-8 text-center">
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-white/10 text-4xl">
                ✦
              </div>
              <p className="text-2xl font-semibold">Aperçu de l’expérience</p>
              <p className="text-white/65">
                La variante chromeless laisse le média occuper tout l’espace.
              </p>
            </div>
          </div>
          <Button
            aria-label="Image suivante"
            variant="ghost"
            size="icon"
            className="shrink-0 text-white hover:bg-white/15 hover:text-white"
          >
            <ChevronIcon direction="right" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export const NestedDialog: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Supprimer le projet</DialogTitle>
          <DialogDescription>
            Vérifiez les conséquences avant de continuer.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Les 24 études et leurs pièces jointes seront déplacées dans la corbeille.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Continuer</Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogDescription>
                  Cette action pourra être annulée depuis la corbeille pendant 30 jours.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Retour</Button>
                </DialogClose>
                <Button variant="destructive">Supprimer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async () => {
    await userEvent.click(
      within(document.body).getByRole("button", { name: "Continuer" })
    );
    await expect(
      within(document.body).getByRole("dialog", {
        name: "Confirmer la suppression"
      })
    ).toBeVisible();
  }
};

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 6 6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
