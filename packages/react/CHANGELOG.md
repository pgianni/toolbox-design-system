# @pgianni/toolbox-react

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
