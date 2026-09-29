# Toolbox Design System

Fondations visuelles et composants partagés par les applications Toolbox.

## Packages

- `@pgianni/toolbox-tokens` : variables CSS et représentation JSON des tokens.
- `@pgianni/toolbox-theme` : thème global et preset Tailwind 3.
- `@pgianni/toolbox-react` : composants React compatibles React 18 et 19.

## Développement

```bash
npm install
npm run check
npm run build
```

## Intégration dans une application

```bash
npm install @pgianni/toolbox-tokens @pgianni/toolbox-theme @pgianni/toolbox-react
```

Importer le thème avant les directives Tailwind de l'application :

```css
@import "@pgianni/toolbox-theme/css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ajouter le preset et le package React au scan Tailwind :

```ts
import type { Config } from "tailwindcss";
import toolboxPreset from "@pgianni/toolbox-theme/tailwind-preset";

export default {
  presets: [toolboxPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@pgianni/toolbox-react/dist/**/*.{js,mjs}"
  ]
} satisfies Config;
```

Puis utiliser les composants :

```tsx
import { Button } from "@pgianni/toolbox-react";

<Button variant="default">Enregistrer</Button>;
```

## Migration progressive

Une application peut conserver son ancien chemin d'import avec un proxy temporaire :

```tsx
// src/components/ui/button.tsx
export { Button, buttonVariants, type ButtonProps } from "@pgianni/toolbox-react";
```

Migrer d'abord les tokens, puis les composants simples. Les tokens propres au métier restent dans l'application.

## Versions

Tout changement destiné à être publié doit inclure un Changeset :

```bash
npm run changeset
```

- patch : correction compatible ;
- minor : nouvelle API compatible ;
- major : rupture nécessitant une migration.

Avant une publication :

```bash
npm run version-packages
npm run release
```
