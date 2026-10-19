---
"@pgianni/toolbox-react": minor
---

Restyle two `Button` variants:

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
