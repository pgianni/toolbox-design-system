---
"@pgianni/toolbox-react": minor
---

Toasts stay above the mobile tab bar. `MobileBottomNav` publishes its visible
height on `<html>` as `--toolbox-bottom-nav-height` (0 px while hidden by its
breakpoint, removed when unmounted; the name is exported as
`mobileBottomNavHeightVariable`), and `Toaster` adds it to its bottom
`offset` and `mobileOffset` unless you set your own bottom offset.
