---
"@pgianni/toolbox-react": minor
---

`Tabs` (and `TabsList`) gain a `container` option. `true` (default) keeps the
bordered container around the pill tabs; `false` drops it so the tabs look
like `AppHeaderNav`, for in-page sections. `AppHeaderNav` stays the component
for site navigation (links with `aria-current`), while `Tabs` switch panels
inside a page.

`AppHeaderNavItem` drops its transparent 1 px border so its items have exactly
the same size as tabs.
