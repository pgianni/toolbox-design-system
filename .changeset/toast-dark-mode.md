---
"@pgianni/toolbox-react": patch
---

Toasts follow the app's dark mode: without a `theme` prop, the Toaster now reads the `dark` class on `<html>` (next-themes, Storybook) instead of the OS setting.
