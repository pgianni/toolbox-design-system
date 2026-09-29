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
