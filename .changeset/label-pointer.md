---
"@pgianni/toolbox-react": patch
---

`Label` shows a pointer cursor when it is tied to a control with `htmlFor`
(checkbox, radio, switch, field), since clicking it toggles or focuses the
control. It keeps the not-allowed cursor when the control is disabled;
`RadioGroupItem` is now a `peer` so its label dims when disabled, like
`Checkbox`.
