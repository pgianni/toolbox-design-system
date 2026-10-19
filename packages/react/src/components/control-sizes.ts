// One height scale for every form control and button, so controls of the same
// size line up in a row: sm 36 px, md 40 px (default), lg 44 px.
export type ControlSize = "sm" | "md" | "lg";

export const controlHeightClassName: Record<ControlSize, string> = {
  sm: "h-9",
  md: "h-10",
  lg: "h-11"
};

// Square size for icon-only controls of the same height.
export const controlSquareClassName: Record<ControlSize, string> = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-11 w-11"
};

// Text fields: 16 px on mobile (avoids iOS zoom), 14 px from md up; lg stays 16 px.
export const fieldSizeClassName: Record<ControlSize, string> = {
  sm: "h-9 px-3 text-base md:text-sm",
  md: "h-10 px-3 text-base md:text-sm",
  lg: "h-11 px-4 text-base"
};
