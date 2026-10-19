---
"@pgianni/toolbox-react": patch
---

Disabled buttons show the not-allowed cursor instead of ignoring the pointer.
Hover and press styles of `Button` (and `AlertDialog` actions) are scoped to
enabled buttons, so a disabled button keeps its look.
