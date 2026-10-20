# @pgianni/toolbox-react

## 0.16.0

### Minor Changes

- 20b4a0d: `Tabs` (and `TabsList`) gain a `container` option. `true` (default) keeps the
  bordered container around the pill tabs; `false` drops it so the tabs look
  like `AppHeaderNav`, for in-page sections. `AppHeaderNav` stays the component
  for site navigation (links with `aria-current`), while `Tabs` switch panels
  inside a page.
  
  `AppHeaderNavItem` drops its transparent 1 px border so its items have exactly
  the same size as tabs.
- 20b4a0d: Merge the header navigation into the Tabs family:
  
  - New `TabsNav` and `TabsNavLink`: the navigation mode of Tabs, with the same
    look but real navigation links in a `<nav>` (`aria-current="page"`).
    `TabsNav` takes `container` (off by default) and `showFrom` (hidden below a
    breakpoint); `TabsNavLink` renders an `<a>` with `href`, the child with
    `asChild` (router links), or a `<button>`.
  - `AppHeaderNav`, `AppHeaderNavItem` and `appHeaderNavItemVariants` are
    deprecated aliases of `TabsNav` (`showFrom="lg"`), `TabsNavLink` and
    `tabsNavLinkVariants`; they log a development warning. See MIGRATION.md.

## 0.15.0

### Minor Changes

- afccf81: Add `AppHeaderThemeToggle` and `AppHeaderSignIn`, so every toolbox app shows
  the same header buttons instead of styling its own:
  
  - `AppHeaderThemeToggle`: grey round icon button (tertiary, `sm`) with a sun
    in light mode and a moon in dark mode.
  - `AppHeaderSignIn`: outline `sm` button with a log-in icon; `href` renders a
    link to the sign-in page.
  
  Neither accepts `className` or `style`. Only `label` can change (accessible
  name for the toggle, text for sign-in), e.g. "Toggle theme" / "Sign in" in
  English. They keep the usual button props (`onClick`, `disabled`…).
- 037df0d: Toasts stay above the mobile tab bar. `MobileBottomNav` publishes its visible
  height on `<html>` as `--toolbox-bottom-nav-height` (0 px while hidden by its
  breakpoint, removed when unmounted; the name is exported as
  `mobileBottomNavHeightVariable`), and `Toaster` adds it to its bottom
  `offset` and `mobileOffset` unless you set your own bottom offset.

### Patch Changes

- 2397ec5: Fix `className` overrides of `Button` hover styles (e.g.
  `hover:text-foreground` on a ghost icon button) being ignored since 0.13: the
  hover and press styles were scoped to `:not(:disabled)`, which made them more
  specific than the app's classes, so a ghost button turned violet on hover. They
  are plain `hover:`/`active:` classes again, and disabled buttons cancel them
  with `disabled:` resets, so the not-allowed cursor and the static look of
  disabled buttons are kept.

## 0.14.1

### Patch Changes

- 65bf2ee: `Tag` reduces its left padding (to 6 px) when its content starts with an
  icon, so the icon sits closer to the edge.

## 0.14.0

### Minor Changes

- 7d5862d: Add a shared height scale for buttons and form controls: `sm` 36 px, `md`
  40 px (default) and `lg` 44 px, so controls of the same size line up.
  
  - `Button` gains `size="md"` (same as `default`, now the default) and
    `iconOnly`, which makes a square button of the size's height.
  - `Input`, `SelectTrigger` and `SearchInput` gain `size` (`sm`, `md`, `lg`).
    `Input`'s native `size` attribute is replaced by this prop.
  - `NumberInput` gains `size="sm"`; its buttons use `iconOnly` at the same size.
  - `SegmentedControl` gains `size`; its total height now follows the scale
    (40 px by default instead of 46 px).
  - `ControlSize` is exported. A "Forms/Tailles et alignements" story shows
    every control per size and checks that their heights match.

### Patch Changes

- 69ca745: Disabled `Checkbox`, `RadioGroupItem`, `Switch` and `OptionCard` no longer
  react to hover or click: their hover colours, press colours and press
  scale/translate only apply when they are enabled, like `Button`.

## 0.13.0

### Minor Changes

- d9fa65d: Deprecate legacy APIs, with a migration guide in MIGRATION.md:
  
  - `Button` variants `default`, `brand`, `purple`, `save`, `gradient`,
    `destructive`, `brand-outline` and `brand-ghost` keep working but log a
    development warning pointing to their replacement (`primary`,
    `primary` + `danger`, `secondary` or `ghost`). The default variant is now
    `primary`. `deprecatedButtonVariants` exports the mapping.
  - `Badge` is merged into `Tag`: it now renders a `Tag` with the matching tone
    and appearance, logs a development warning, and `badgeVariants` returns the
    `tagVariants` classes.
- d9fa65d: Harmonize interactions with the rest of the system:
  
  - `DropdownMenu` items (and checkbox, radio and sub-trigger items) show a
    pointer, keep the grey highlight and turn purple while pressed; destructive
    items darken while pressed. `AppSwitcher` rows use the same grey highlight.
  - `Switch` darkens on hover, takes a purple tint while pressed and shrinks
    slightly (`scale(0.95)`), like `Checkbox`.
  - `SidePanel` uses the same translucent grey overlay as `Dialog` instead of
    black.
- d9fa65d: Add `SearchInput`, replacing the "search icon + Input" pattern found in five
  toolbox apps: leading magnifier, clear button (and Escape) when it has a
  value, controlled or uncontrolled (`value`, `defaultValue`, `onValueChange`,
  `onClear`).

### Patch Changes

- d9fa65d: Disabled buttons show the not-allowed cursor instead of ignoring the pointer.
  Hover and press styles of `Button` (and `AlertDialog` actions) are scoped to
  enabled buttons, so a disabled button keeps its look.
- 79b2440: `Label` shows a pointer cursor when it is tied to a control with `htmlFor`
  (checkbox, radio, switch, field), since clicking it toggles or focuses the
  control. It keeps the not-allowed cursor when the control is disabled;
  `RadioGroupItem` is now a `peer` so its label dims when disabled, like
  `Checkbox`.

## 0.12.0

### Minor Changes

- 72e7cf9: - `Checkbox` and `RadioGroupItem` get interaction states: grey background on
    hover, a purple tint and a slight shrink (`scale(0.9)`) while pressed, and
    a darker fill on hover/press once checked. Both gain a `size` option
    (`md`, default 16 px; `lg`, 20 px) and export their variants
    (`checkboxVariants`, `radioGroupItemVariants`).
  - `Input`, `Textarea` and the `NumberInput` field turn grey on hover and go
    back to the normal background while focused.
- ab74b54: Add three controls from UX Method:
  
  - `OptionCardGroup` / `OptionCard` (UX Method's `OptionButton`): large
    selectable choices with an icon or illustration, label and description.
    Built on a radio group, so the selected option is announced and arrow keys
    move between options; the selected card uses the shared purple selection
    with a check badge instead of hard-coded blue. `layout` (`responsive`,
    `horizontal`, `vertical`) and `imageSize` (`md`, `lg`).
  - `NumberInput` (UX Method's `CounterInput`): number field with − / +
    buttons that stop at `min`/`max`, labelled buttons ("Diminuer",
    "Augmenter"), `step`, and `md`/`lg` sizes; typing is clamped to the range.
  - `SegmentedControl`: switches between a few views (list / cards). It looks
    like `Tabs` but is a radio group, since it changes how content is shown
    rather than revealing tab panels; options can have icons or be icon-only.

## 0.11.0

### Minor Changes

- 617f1b2: Add five components identified across the toolbox apps:
  
  - `Alert` (with `AlertTitle`, `AlertDescription`): inline message in the
    `info`, `success`, `warning`, `danger` or `neutral` tone, with a default
    icon per tone and an optional `onDismiss`. Warnings and errors use
    `role="alert"`, the others `role="status"`.
  - `EmptyState`: icon, title, description and action for empty lists and
    views; `size` (`sm`, `md`) and `bordered`.
  - `Spinner`: loading indicator in three sizes that follows the text colour
    (or `tone="primary"`/`"muted"`); pass `label=""` inside a labelled button.
  - `Progress`: progress bar with `value`/`max`, `tone`, `size` and
    `valueText`; leave `value` undefined for an indeterminate bar.
  - `Stepper`: step indicator (horizontal or vertical) with complete, current
    and upcoming states; `onStepChange` makes reachable steps clickable.
  
  `Alert` and `Progress` tones and the indeterminate `Progress` need
  `@pgianni/toolbox-theme` 0.6.0.
- b8f264e: Add a tag system, built from the patterns found across the toolbox apps
  (Audit, Userflow, Impact, UX Team, UX Method and the Design Hub):
  
  - `Tag`: a label for a status, category or severity. `tone` (`neutral`,
    `primary`, `info`, `success`, `warning`, `danger`), `appearance` (`soft`,
    `outline`, `solid`) and `size` (`sm`, `md`). `onRemove` adds a remove
    button, for active filters.
  - `TagToggle`: a filter tag that can be switched on and off (`pressed`,
    `defaultPressed`, `onPressedChange`), with an optional `count`. It uses the
    same purple selection as the tabs.
  - `TagGroup`: wraps tags on several lines.
  
  The tones need `@pgianni/toolbox-tokens` 0.3.0 and `@pgianni/toolbox-theme`
  0.6.0.

### Patch Changes

- 7bd3514: The close buttons of `Dialog` and `SidePanel` are now design system `Button`s
  instead of custom markup: `outline` / `icon-sm` in both dialogs and side
  panels, at the same position. They get the shared hover, press and focus states.

## 0.10.1

### Patch Changes

- c7af21b: The `link` button variant uses `action-foreground` instead of `primary`, so it
  switches to the lighter violet in dark mode and stays readable, like `ghost`.
- 28dce45: The active `MobileBottomNavItem` uses the same purple active state as
  `AppHeaderNavItem` and `Tabs`, including on hover, where it used to turn grey.
- a74aa4a: `SelectTrigger` gets a pointer cursor, a grey background on hover and a
  darker grey while pressed, like the tabs. Its chevron uses `action-foreground` and turns over
  when the list is open.
- 7458f91: Pressing a tab now shows a purple background instead of the grey hover, in
  every tab system: `Tabs`, `AppHeaderNavItem` and `MobileBottomNavItem`
  (`bg-primary/10`, and `bg-primary/20` on the already active item).

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
