---
"@pgianni/toolbox-react": minor
---

More organic motion, using the motion tokens from `@pgianni/toolbox-theme`
0.5.0:

- Transitions use `duration-fast`/`duration-base` with `ease-out-soft`
  instead of the default linear 150/200ms.
- `Dialog` and `AlertDialog` now really animate: they used CSS transitions,
  which Radix does not wait for, so they appeared and disappeared instantly.
  They now scale and fade in with a slight spring and leave faster; the
  overlay fades. `DropdownMenu` and `Select` lists grow from their trigger the
  same way.
- The `Checkbox` tick draws itself, the `RadioGroup` dot pops in, accordion
  content slides down 4px as it opens and the chevron turns with a small
  overshoot, and `AppSwitcher` rows appear one after another.

All of it is disabled with `prefers-reduced-motion`.
