---
"@pgianni/toolbox-react": minor
---

Add three controls from UX Method:

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
