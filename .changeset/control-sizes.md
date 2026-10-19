---
"@pgianni/toolbox-react": minor
---

Add a shared height scale for buttons and form controls: `sm` 36 px, `md`
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
