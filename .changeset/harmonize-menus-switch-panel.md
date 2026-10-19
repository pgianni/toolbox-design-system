---
"@pgianni/toolbox-react": minor
---

Harmonize interactions with the rest of the system:

- `DropdownMenu` items (and checkbox, radio and sub-trigger items) show a
  pointer, keep the grey highlight and turn purple while pressed; destructive
  items darken while pressed. `AppSwitcher` rows use the same grey highlight.
- `Switch` darkens on hover, takes a purple tint while pressed and shrinks
  slightly (`scale(0.95)`), like `Checkbox`.
- `SidePanel` uses the same translucent grey overlay as `Dialog` instead of
  black.
