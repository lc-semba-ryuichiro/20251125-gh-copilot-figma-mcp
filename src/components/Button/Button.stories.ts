import type { Meta, StoryObj } from "@storybook/html";

interface ButtonArgs {
  label: string;
  variant: "primary" | "secondary" | "green";
}

/**
 * Creates a button element
 */
const createButton = ({ label, variant }: ButtonArgs): HTMLButtonElement => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `button button--${variant}`;
  button.textContent = label;
  return button;
};

const meta: Meta<ButtonArgs> = {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "green"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Button component with multiple variants based on Positivus design system.",
      },
    },
  },
  render: (args) => createButton(args),
};

export default meta;

type Story = StoryObj<ButtonArgs>;

/**
 * Primary button - Dark background, white text
 */
export const Primary: Story = {
  args: {
    label: "Book a consultation",
    variant: "primary",
  },
};

/**
 * Secondary button - Outline style
 */
export const Secondary: Story = {
  args: {
    label: "Request a quote",
    variant: "secondary",
  },
};

/**
 * Green button - Green background
 */
export const Green: Story = {
  args: {
    label: "Subscribe to news",
    variant: "green",
  },
};

/**
 * All variants displayed together
 */
export const AllVariants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "20px";
    container.style.flexWrap = "wrap";

    const variants: ButtonArgs[] = [
      { label: "Primary Button", variant: "primary" },
      { label: "Secondary Button", variant: "secondary" },
      { label: "Green Button", variant: "green" },
    ];

    for (const args of variants) {
      container.appendChild(createButton(args));
    }

    return container;
  },
};
