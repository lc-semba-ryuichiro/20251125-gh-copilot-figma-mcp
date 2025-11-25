import type { Meta, StoryObj } from "@storybook/html";

type InputType = "text" | "email" | "textarea";
type InputVariant = "default" | "dark";

interface InputArgs {
  label: string;
  placeholder: string;
  type?: InputType;
  variant?: InputVariant;
}

/**
 * Creates an input field
 */
const createInput = ({
  label,
  placeholder,
  type = "text",
  variant = "default",
}: InputArgs): HTMLDivElement => {
  const container = document.createElement("div");
  container.className = "input";
  container.style.width = "556px";

  const labelEl = document.createElement("label");
  labelEl.className = "input__label";
  labelEl.textContent = label;
  if (variant === "dark") {
    labelEl.style.color = "var(--color-white)";
  }

  container.appendChild(labelEl);

  if (type === "textarea") {
    const textarea = document.createElement("textarea");
    textarea.className = `input__field input__field--textarea ${variant === "dark" ? "input__field--dark" : ""}`;
    textarea.placeholder = placeholder;
    container.appendChild(textarea);
  } else {
    const input = document.createElement("input");
    input.type = type;
    input.className = `input__field ${variant === "dark" ? "input__field--dark" : ""}`;
    input.placeholder = placeholder;
    container.appendChild(input);
  }

  return container;
};

const meta: Meta<InputArgs> = {
  title: "Components/Input",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "textarea"],
    },
    variant: {
      control: "select",
      options: ["default", "dark"],
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Input field component for forms.",
      },
    },
  },
  render: (args) => createInput(args),
};

export default meta;

type Story = StoryObj<InputArgs>;

/**
 * Text input
 */
export const TextInput: Story = {
  args: {
    label: "Name",
    placeholder: "Name",
    type: "text",
    variant: "default",
  },
};

/**
 * Email input
 */
export const EmailInput: Story = {
  args: {
    label: "Email*",
    placeholder: "Email",
    type: "email",
    variant: "default",
  },
};

/**
 * Textarea
 */
export const Textarea: Story = {
  args: {
    label: "Message*",
    placeholder: "Message",
    type: "textarea",
    variant: "default",
  },
};

/**
 * Dark variant for footer
 */
export const DarkInput: Story = {
  args: {
    label: "Email",
    placeholder: "Email",
    type: "email",
    variant: "dark",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Complete form example
 */
export const FormExample: Story = {
  render: () => {
    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "25px";
    form.style.width = "556px";

    const inputs: InputArgs[] = [
      { label: "Name", placeholder: "Name", type: "text" },
      { label: "Email*", placeholder: "Email", type: "email" },
      { label: "Message*", placeholder: "Message", type: "textarea" },
    ];

    for (const args of inputs) {
      form.appendChild(createInput(args));
    }

    // Submit button
    const button = document.createElement("button");
    button.type = "submit";
    button.className = "button button--primary button--full";
    button.textContent = "Send Message";
    form.appendChild(button);

    return form;
  },
  parameters: {
    layout: "padded",
  },
};
