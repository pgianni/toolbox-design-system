---
"@pgianni/toolbox-react": minor
---

Add `AppHeaderThemeToggle` and `AppHeaderSignIn`, so every toolbox app shows
the same header buttons instead of styling its own:

- `AppHeaderThemeToggle`: grey round icon button (tertiary, `sm`) with a sun
  in light mode and a moon in dark mode.
- `AppHeaderSignIn`: outline `sm` button with a log-in icon; `href` renders a
  link to the sign-in page.

Neither accepts `className` or `style`. Only `label` can change (accessible
name for the toggle, text for sign-in), e.g. "Toggle theme" / "Sign in" in
English. They keep the usual button props (`onClick`, `disabled`…).
