---
"@pgianni/toolbox-react": minor
---

Add five components identified across the toolbox apps:

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
