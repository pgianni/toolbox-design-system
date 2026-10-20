// Responsive visibility helpers shared by the header navigation, TabsNav and
// the mobile tab bar. Written out in full so Tailwind finds every class.
export const desktopBreakpointClassNames = {
  sm: "sm:flex",
  md: "md:flex",
  lg: "lg:flex",
  xl: "xl:flex"
} as const;

export const mobileBreakpointClassNames = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden"
} as const;

export type Breakpoint = keyof typeof desktopBreakpointClassNames;
