import type { Decorator, Preview } from "@storybook/react-vite";
import { mswLoader } from "msw-storybook-addon/csf3";
import { mswHandlers } from "./msw-handlers";
import "../src/index.css";

const withTheme: Decorator = (Story, context) => {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle(
      "dark",
      context.globals.theme === "dark"
    );
  }

  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Thème global des composants",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: "light"
  },
  decorators: [withTheme],
  parameters: {
    options: {
      storySort: {
        order: [
          "Actions",
          "Forms",
          "Navigation",
          "Overlays",
          "Feedback",
          "Data display",
          "Surfaces",
          "Layout"
        ]
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
  loaders: [mswLoader()],
  async beforeEach({ msw }) {
    msw.use(...mswHandlers);
  }
};

export default preview;
