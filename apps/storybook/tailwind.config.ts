import type { Config } from "tailwindcss";
import toolboxPreset from "@pgianni/toolbox-theme/tailwind-preset";

export default {
  presets: [toolboxPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@pgianni/toolbox-react/dist/**/*.{js,mjs}"
  ]
} satisfies Config;
