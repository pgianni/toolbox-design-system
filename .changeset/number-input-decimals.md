---
"@pgianni/toolbox-react": minor
---

NumberInput accepts decimals: the `step` sets what the buttons and the arrow keys add (e.g. 0.5), and `precision` (by default the decimals of `step`) caps the typed decimals. Both comma and dot are accepted, and values are shown with the `locale` separator ("fr-FR" by default). The field is now a text input with `role="spinbutton"`, so `toHaveValue` returns a string; it also supports ArrowUp/ArrowDown, Home and End.
