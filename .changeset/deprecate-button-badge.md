---
"@pgianni/toolbox-react": minor
---

Deprecate legacy APIs, with a migration guide in MIGRATION.md:

- `Button` variants `default`, `brand`, `purple`, `save`, `gradient`,
  `destructive`, `brand-outline` and `brand-ghost` keep working but log a
  development warning pointing to their replacement (`primary`,
  `primary` + `danger`, `secondary` or `ghost`). The default variant is now
  `primary`. `deprecatedButtonVariants` exports the mapping.
- `Badge` is merged into `Tag`: it now renders a `Tag` with the matching tone
  and appearance, logs a development warning, and `badgeVariants` returns the
  `tagVariants` classes.
