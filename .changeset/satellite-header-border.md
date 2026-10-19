---
"@pgianni/toolbox-react": patch
---

The compact (satellite) `AppHeader` always shows its bottom border again. Hiding
the border until the page scrolls is now controlled by `borderOnScroll`, which
defaults to `true` only for `density="comfortable"` (portal header).
