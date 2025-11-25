import type { Preview } from "@storybook/html";
import "../src/styles/main.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#FFFFFF" },
        { name: "grey", value: "#F3F3F3" },
        { name: "dark", value: "#191A23" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
