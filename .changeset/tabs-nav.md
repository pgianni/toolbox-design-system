---
"@pgianni/toolbox-react": minor
---

Merge the header navigation into the Tabs family:

- New `TabsNav` and `TabsNavLink`: the navigation mode of Tabs, with the same
  look but real navigation links in a `<nav>` (`aria-current="page"`).
  `TabsNav` takes `container` (off by default) and `showFrom` (hidden below a
  breakpoint); `TabsNavLink` renders an `<a>` with `href`, the child with
  `asChild` (router links), or a `<button>`.
- `AppHeaderNav`, `AppHeaderNavItem` and `appHeaderNavItemVariants` are
  deprecated aliases of `TabsNav` (`showFrom="lg"`), `TabsNavLink` and
  `tabsNavLinkVariants`; they log a development warning. See MIGRATION.md.
