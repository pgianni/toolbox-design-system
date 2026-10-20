# Guide de migration

## Objectif de la version 0.1

La première étape centralise les tokens, le preset Tailwind et le composant `Button`. Les variables propres à un outil ne doivent pas être déplacées à ce stade.

## Migrer une application pilote

1. Installer les trois packages Toolbox.
2. Importer `@pgianni/toolbox-theme/css` en tête de `src/index.css`.
3. Retirer de `:root` et `.dark` uniquement les variables déjà fournies par `@pgianni/toolbox-tokens`.
4. Ajouter le preset dans `tailwind.config.ts`.
5. Remplacer temporairement `src/components/ui/button.tsx` par un proxy vers `@pgianni/toolbox-react`.
6. Exécuter le build et vérifier les écrans utilisant un bouton en thèmes clair et sombre.

## Règles de compatibilité

- Une variable spécifique à une application reste locale.
- Une différence visuelle utile devient une variante documentée, pas une surcharge globale.
- Une ancienne propriété reste disponible pendant au moins une version mineure avant sa suppression.
- Toute rupture est livrée dans une version majeure avec un exemple avant/après.

## Retour arrière

Chaque application garde une version exacte dans son fichier de verrouillage. En cas de régression, revenir à la dernière version fonctionnelle du package ne demande donc aucune modification du code applicatif.

## Dépréciations de la version 0.13

Les API ci-dessous fonctionnent encore et gardent leur rendu actuel, mais elles affichent un avertissement dans la console en développement (`[@pgianni/toolbox-react] … Voir MIGRATION.md.`). Elles seront retirées à la prochaine version majeure, conformément aux règles de compatibilité ci-dessus.

### Variantes de `Button`

| Avant | Après |
|---|---|
| `variant="default"` | `variant="primary"` (ou rien : c'est la valeur par défaut) |
| `variant="brand"`, `"purple"`, `"save"` | `variant="primary"` |
| `variant="gradient"` | `variant="primary"` (le dégradé n'existe plus dans le système) |
| `variant="destructive"` | `variant="primary" danger` |
| `variant="brand-outline"` | `variant="secondary"` |
| `variant="brand-ghost"` | `variant="ghost"` |

La même table s'applique à `AlertDialogAction` et `AlertDialogCancel`, qui acceptent aussi `danger`. `deprecatedButtonVariants` exporte cette correspondance pour un script de migration.

```tsx
// Avant
<Button variant="destructive">Supprimer</Button>
<Button variant="brand-outline">Annuler</Button>

// Après
<Button danger>Supprimer</Button>
<Button variant="secondary">Annuler</Button>
```

### `Badge` → `Tag`

`Badge` affiche désormais un `Tag`. Remplacer chaque usage selon la variante :

| Avant | Après |
|---|---|
| `<Badge>` | `<Tag tone="primary" appearance="solid">` |
| `<Badge variant="secondary">` | `<Tag>` |
| `<Badge variant="destructive">` | `<Tag tone="danger" appearance="solid">` |
| `<Badge variant="outline">` | `<Tag appearance="outline">` |
| `badgeVariants({ variant })` | `tagVariants({ tone, appearance })` |

`Tag` est un `span` (`Badge` était un `div`) et utilise une graisse moyenne au lieu de semi-grasse ; vérifier les mises en page qui s'appuyaient sur un bloc. Les nouveaux usages profitent des tons `info`, `success` et `warning` et de `onRemove`.

Pour repérer les usages restants dans une application :

```bash
grep -rnE 'variant="(default|brand|purple|save|gradient|destructive|brand-outline|brand-ghost)"|<Badge' src
```

### `AppHeaderNav` → `TabsNav`

La navigation du header fait désormais partie de la famille Tabs. `AppHeaderNav` et `AppHeaderNavItem` restent disponibles (avec un avertissement en développement) mais rendent maintenant `TabsNav` et `TabsNavLink`.

| Avant | Après |
|---|---|
| `<AppHeaderNav showFrom="lg">` | `<TabsNav showFrom="lg">` (`AppHeaderNav` valait `lg` par défaut, `TabsNav` est toujours visible si `showFrom` est omis) |
| `<AppHeaderNavItem active>` | `<TabsNavLink active>` |
| `<AppHeaderNavItem asChild><Link …/></AppHeaderNavItem>` | `<TabsNavLink asChild><Link …/></TabsNavLink>` ou `<TabsNavLink href="…">` |
| `appHeaderNavItemVariants` | `tabsNavLinkVariants` |

Choisir entre les deux modes de la famille :

- `Tabs` / `TabsList` / `TabsTrigger` changent de panneau dans une page (onglets, flèches du clavier). `container={false}` retire le cadre.
- `TabsNav` / `TabsNavLink` naviguent entre des pages : de vrais liens dans un `<nav>`, avec `aria-current="page"` sur la page courante. `container` ajoute le cadre si besoin.

Les deux ont exactement le même rendu.
