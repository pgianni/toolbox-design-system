---
"@pgianni/toolbox-react": minor
---

- `Checkbox` and `RadioGroupItem` get interaction states: grey background on
  hover, a purple tint and a slight shrink (`scale(0.9)`) while pressed, and
  a darker fill on hover/press once checked. Both gain a `size` option
  (`md`, default 16 px; `lg`, 20 px) and export their variants
  (`checkboxVariants`, `radioGroupItemVariants`).
- `Input`, `Textarea` and the `NumberInput` field turn grey on hover and go
  back to the normal background while focused.
