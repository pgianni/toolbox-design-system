---
"@pgianni/toolbox-react": minor
---

`AlertDialog` now shares its styles with `Dialog`: same overlay, surface,
header, footer, title and description classes. `AlertDialogContent` accepts
Dialog's `size` (default `sm`) and an `overlayClassName`, and
`AlertDialogCancel` defaults to the `outline` button variant like Dialog's
cancel buttons.
