# @pgianni/toolbox-react

## 0.10.0

### Minor Changes

- f92683a: Restyle two `Button` variants:
  
  - `secondary` (and its `brand-outline` alias) now uses the neutral border and
    background that `tertiary` had (`border-input`, `bg-background`,
    `hover:bg-accent`) and keeps its `action-foreground` label.
  - `tertiary` has no border or background at rest, and its icon uses
    `muted-foreground`. Its hover and pressed states are unchanged.
  
  `outline` keeps the bordered neutral look.
  
  Add a `danger` option to `Button` (and `AlertDialogAction`/`AlertDialogCancel`)
  for destructive actions. It works with any variant: filled variants turn
  `bg-destructive`; `secondary`, `outline`, `tertiary`, `ghost` and `link` get a
  red label (`red-600`, `red-400` in dark mode) and a red-tinted hover.

### Patch Changes

- 9562f61: The compact (satellite) `AppHeader` always shows its bottom border again. Hiding
  the border until the page scrolls is now controlled by `borderOnScroll`, which
  defaults to `true` only for `density="comfortable"` (portal header).

## 0.9.0

### Minor Changes

- 26b6bb3: More organic motion, using the motion tokens from `@pgianni/toolbox-theme`
  0.5.0:
  
  - Transitions use `duration-fast`/`duration-base` with `ease-out-soft`
    instead of the default linear 150/200ms.
  - `Dialog` and `AlertDialog` now really animate: they used CSS transitions,
    which Radix does not wait for, so they appeared and disappeared instantly.
    They now scale and fade in with a slight spring and leave faster; the
    overlay fades. `DropdownMenu` and `Select` lists grow from their trigger the
    same way.
  - The `Checkbox` tick draws itself, the `RadioGroup` dot pops in, accordion
    content slides down 4px as it opens and the chevron turns with a small
    overshoot, and `AppSwitcher` rows appear one after another.
  
  All of it is disabled with `prefers-reduced-motion`.

### Patch Changes

- 8cc729b: `AccordionTrigger` no longer has a vertical margin (`my-1`), so items sit
  directly against their separators.
- 7559ceb: The `Dialog` and `AlertDialog` overlay no longer blurs the page. It is a
  translucent light grey in light mode (`slate-200/70`) and a translucent dark
  grey in dark mode (`slate-800/70`) instead of black.

## 0.8.1

### Patch Changes

- 796d1ef: `AccordionTrigger` gets hover, pressed and open states: a light `primary` tint on hover (stronger while pressed),
  the shared press translate on click, and `action-foreground` text and chevron
  when open. Trigger and content are padded (`px-3`) so the hover background
  has room.
- 08fd83b: AppSwitcher links ("Toutes les applications" and each application) show a
  pointer cursor, a light `primary` tint on hover and keyboard highlight, and a
  stronger tint while pressed. The current application keeps its tint and
  darkens on hover.
  The "Toutes les applications" link no longer shows a focus ring when hovered:
  like the application rows, focus is shown by the highlight tint.
  The space under the last application is reduced to the menu's own padding.
- 6ac6d9c: Tabs `page` triggers get a light `primary` tint on hover, a stronger one while
  pressed and the shared press translate, like `Accordion`. The previous
  `bg-accent` hover was invisible on the app background.

## 0.8.0

### Minor Changes

- 61eeb18: Add three components:
  
  - `SidePanel` (from UX Team's staffing panel): a floating panel docked to the
    right, built on Radix Dialog, with `SidePanelContent` (`size`: `default` |
    `wide`, `inset`: `header` | `none`, `actions`), `SidePanelHeader`,
    `SidePanelBody`, `SidePanelFooter`, `SidePanelTitle` and
    `SidePanelDescription`. `nonBlocking` keeps the page usable behind it.
  - `AppFooter` (from Userflows): links to the other toolbox applications (the
    `current` one is left out), the Design Toolbox logo, copyright and an
    optional design system version.
  - `Checkbox`, built on Radix Checkbox, with checked and indeterminate states
    matching `RadioGroupItem`.

## 0.7.0

### Minor Changes

- 1d2c469: Add `Select`, built on Radix Select: `Select`, `SelectTrigger`, `SelectValue`,
  `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`,
  `SelectScrollUpButton` and `SelectScrollDownButton`. The trigger matches
  `Input` (height, border, focus ring) and the list uses the same surface as
  `DropdownMenuContent`; the selected item uses `action-foreground`.
- 94e98bf: Add components ported from UX Method: `Accordion`, `AlertDialog`, `Avatar`,
  `RadioGroup`, `Collapsible`, `Carousel` (Embla) and `AspectRatio`. They use
  inline icons instead of lucide-react, the toolbox tokens (`action-foreground`
  for checked and hover states) and the same overlay and surface as `Dialog`.
  `AlertDialogAction` and `AlertDialogCancel` accept the `Button` variants.
  `Accordion` and `CollapsibleContent` animate with the keyframes from
  `@pgianni/toolbox-theme`.
- 3043b24: `AlertDialog` now shares its styles with `Dialog`: same overlay, surface,
  header, footer, title and description classes. `AlertDialogContent` accepts
  Dialog's `size` (default `sm`) and an `overlayClassName`, and
  `AlertDialogCancel` defaults to the `outline` button variant like Dialog's
  cancel buttons.
- b7ac2d3: Tabs `default` now uses the same pill style as AppHeaderNav (bordered
  container, `primary`/`action-foreground` active state) instead of the grey
  segmented control. `variant="view"` renders identically and is kept as an
  alias.
- 393f08b: **Breaking:** remove the Sheet component and its exports (`Sheet`,
  `SheetTrigger`, `SheetClose`, `SheetPortal`, `SheetOverlay`, `SheetContent`,
  `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`,
  `sheetVariants` and the `SheetOverlayProps`, `SheetContentProps`, `SheetSize`
  types). Use `Dialog` instead.

## 0.6.0

### Minor Changes

- a93d1f2: Align Tabs with AppHeaderNav: triggers share the same base styles (typography,
  16px icons, focus ring). The `view` variant now uses the AppHeaderNavItem pill
  and `primary`/`action-foreground` tokens for its active state instead of
  hard-coded blue, so it follows dark mode. The `page` variant's active indicator
  and text use `action-foreground`.
  
  Items in AppHeaderNav and all Tabs lists no longer have gaps between them,
  the `view` container uses a larger radius, and `default` triggers get the
  same press effect as the nav.
- 10b4586: AppHeader hides its bottom border while the page is at the top and shows it
  once the page scrolls. The header exposes the state as `data-scrolled`.

## 0.5.1

### Patch Changes

- 48cbef0: Document and validate the responsive satellite and portal navigation patterns, including automatic handoff between desktop header tabs and the mobile bottom navigation.

## 0.5.0

### Minor Changes

- affe958: Add composable desktop and mobile application header primitives, including the shared Toolbox application switcher and bottom navigation.

## 0.4.1

### Patch Changes

- Use the primary violet color for secondary button borders, labels, and icons.
  Merge the legacy `brand-outline` appearance into `secondary` while keeping it
  as a backward-compatible alias. Secondary and ghost buttons share the same
  accessible violet action color in light and dark modes.

## 0.4.0

### Minor Changes

- 81bc568: Add semantic primary and tertiary variants, pressed motion for secondary, tertiary, and ghost buttons, gradient and shape variants, plus a complete icon button size scale.
- f45fea7: Add shared Tooltip, Skeleton, and Separator components.
- 83d9bc5: Add shared Dialog, Sheet, DropdownMenu, Switch, and Toast components with accessible primitives and Toolbox styling. Dialog includes a scrollable body, fixed sections, exact application size presets, sectioned and chromeless layouts, and a 40 px close target.

## 0.3.0

### Minor Changes

- 30e5687: Add shared Input, Textarea, Label, Card, and Badge components.

## 0.2.1

### Patch Changes

- 839bb89: Préserve le comportement HTML natif du `Button` en ne définissant plus implicitement son attribut `type`.

## 0.2.0

### Minor Changes

- 2a32fb4: Ajoute les variantes de bouton Toolbox partagées et le support de `asChild`.
  Expose aussi les alias Tailwind `app-background` et `card-muted` pour simplifier les migrations d'applications existantes.
