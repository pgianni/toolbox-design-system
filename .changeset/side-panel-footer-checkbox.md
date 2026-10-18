---
"@pgianni/toolbox-react": minor
---

Add three components:

- `SidePanel` (from UX Team's staffing panel): a floating panel docked to the
  right, built on Radix Dialog, with `SidePanelContent` (`size`: `default` |
  `wide`, `inset`: `header` | `none`, `actions`), `SidePanelHeader`,
  `SidePanelBody`, `SidePanelFooter`, `SidePanelTitle` and
  `SidePanelDescription`. `nonBlocking` keeps the page usable behind it.
- `AppFooter` (from Userflows): links to the other toolbox applications (the
  `current` one is left out), the Design Toolbox logo, copyright and an
  optional design system version.
- `Checkbox`, built on Radix Checkbox, with checked and indeterminate states
  matching `RadioGroupItem`.
