# @pgianni/toolbox-tokens

## 0.3.0

### Minor Changes

- b8f264e: Add feedback tone tokens for tags and statuses, in light and dark mode:
  `success`, `warning`, `danger`, `info` and `neutral`, each with a solid base,
  `-foreground`, `-soft` surface, `-soft-foreground` text and `-border`. Values
  come from the Audit app, which already used them.

## 0.2.0

### Minor Changes

- Add an adaptive action foreground token with a brighter violet value in dark
  mode, and expose it through the Tailwind theme as `action-foreground`.
