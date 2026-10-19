---
"@pgianni/toolbox-react": minor
---

Add a tag system, built from the patterns found across the toolbox apps
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
