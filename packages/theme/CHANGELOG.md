# @pgianni/toolbox-theme

## 0.6.0

### Minor Changes

- b8f264e: Expose the new tone tokens in the Tailwind preset: `success`, `warning`,
  `danger`, `info` and `neutral` colours with `DEFAULT`, `foreground`, `soft`,
  `soft-foreground` and `border` shades (for example `bg-success-soft`,
  `text-success-soft-foreground`, `border-success-border`).
- 617f1b2: Add the `progress-indeterminate` keyframe and animation, used by the
  indeterminate `Progress` bar.

### Patch Changes

- Updated dependencies [b8f264e]
  - @pgianni/toolbox-tokens@0.3.0

## 0.5.0

### Minor Changes

- 26b6bb3: Add motion tokens to the Tailwind preset: `duration-fast` (120ms),
  `duration-base` (200ms) and `duration-slow` (300ms), and the `ease-out-soft`,
  `ease-spring` and `ease-drawer` timing functions. Existing animations use them
  (exits are faster than entrances), and new keyframes are added: `dialog-in`/
  `dialog-out`, `menu-in`/`menu-out`, `content-in`, `check-draw` and `pop-in`.

## 0.4.0

### Minor Changes

- 61eeb18: Add `side-panel-in`/`side-panel-out` and `fade-in`/`fade-out` keyframes and
  animations to the Tailwind preset, used by `SidePanel`.

## 0.3.0

### Minor Changes

- 94e98bf: Add `accordion-down`/`accordion-up` and `collapsible-down`/`collapsible-up`
  keyframes and animations to the Tailwind preset.

## 0.2.0

### Minor Changes

- Add an adaptive action foreground token with a brighter violet value in dark
  mode, and expose it through the Tailwind theme as `action-foreground`.

### Patch Changes

- Updated dependencies
  - @pgianni/toolbox-tokens@0.2.0

## 0.1.1

### Patch Changes

- 2a32fb4: Ajoute les variantes de bouton Toolbox partagées et le support de `asChild`.
  Expose aussi les alias Tailwind `app-background` et `card-muted` pour simplifier les migrations d'applications existantes.
