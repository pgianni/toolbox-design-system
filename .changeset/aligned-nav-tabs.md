---
"@pgianni/toolbox-react": minor
---

Align Tabs with AppHeaderNav: triggers share the same base styles (typography,
16px icons, focus ring). The `view` variant now uses the AppHeaderNavItem pill
and `primary`/`action-foreground` tokens for its active state instead of
hard-coded blue, so it follows dark mode. The `page` variant's active indicator
and text use `action-foreground`.
