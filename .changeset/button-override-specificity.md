---
"@pgianni/toolbox-react": patch
---

Fix `className` overrides of `Button` hover styles (e.g.
`hover:text-foreground` on a ghost icon button) being ignored since 0.13: the
hover and press styles were scoped to `:not(:disabled)`, which made them more
specific than the app's classes, so a ghost button turned violet on hover. They
are plain `hover:`/`active:` classes again, and disabled buttons cancel them
with `disabled:` resets, so the not-allowed cursor and the static look of
disabled buttons are kept.
