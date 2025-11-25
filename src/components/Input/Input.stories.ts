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
 * 入力フィールドを作成する
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
    label: {
      control: "text",
      description: "入力フィールドのラベル",
    },
    placeholder: {
      control: "text",
      description: "プレースホルダーテキスト",
    },
    type: {
      control: "select",
      options: ["text", "email", "textarea"],
      description: "入力タイプ",
    },
    variant: {
      control: "select",
      options: ["default", "dark"],
      description: "カラーバリエーション",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "フォーム用の入力フィールドコンポーネント。",
      },
    },
  },
  render: (args) => createInput(args),
};

export default meta;

type Story = StoryObj<InputArgs>;

/**
 * テキスト入力
 */
export const TextInput: Story = {
  args: {
    label: "Name",
    placeholder: "Name",
    type: "text",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "標準的なテキスト入力フィールド。",
      },
    },
  },
};

/**
 * メール入力
 */
export const EmailInput: Story = {
  args: {
    label: "Email*",
    placeholder: "Email",
    type: "email",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "メールアドレス入力用フィールド。",
      },
    },
  },
};

/**
 * テキストエリア
 */
export const Textarea: Story = {
  args: {
    label: "Message*",
    placeholder: "Message",
    type: "textarea",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "複数行テキスト入力用のテキストエリア。",
      },
    },
  },
};

/**
 * ダークバリエーション（フッター用）
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
    docs: {
      description: {
        story: "ダーク背景用の入力フィールド。フッターなどで使用。",
      },
    },
  },
};

/**
 * フォーム例
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

    // 送信ボタン
    const button = document.createElement("button");
    button.type = "submit";
    button.className = "button button--primary button--full";
    button.textContent = "Send Message";
    form.appendChild(button);

    return form;
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "複数の入力フィールドを組み合わせたフォームの例。",
      },
    },
  },
};
