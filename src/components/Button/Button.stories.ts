import type { Meta, StoryObj } from "@storybook/html";

interface ButtonArgs {
  label: string;
  variant: "primary" | "secondary" | "green";
}

/**
 * ボタン要素を作成する
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
    label: {
      control: "text",
      description: "ボタンのラベルテキスト",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "green"],
      description: "ボタンのスタイルバリエーション",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Positivus デザインシステムに基づいた複数のバリエーションを持つボタンコンポーネント。",
      },
    },
  },
  render: (args) => createButton(args),
};

export default meta;

type Story = StoryObj<ButtonArgs>;

/**
 * プライマリボタン - 暗い背景色、白いテキスト
 */
export const Primary: Story = {
  args: {
    label: "Book a consultation",
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "メインのアクションに使用するプライマリボタン。暗い背景色に白いテキスト。",
      },
    },
  },
};

/**
 * セカンダリボタン - アウトラインスタイル
 */
export const Secondary: Story = {
  args: {
    label: "Request a quote",
    variant: "secondary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "補助的なアクションに使用するセカンダリボタン。アウトラインスタイル。",
      },
    },
  },
};

/**
 * グリーンボタン - 緑の背景色
 */
export const Green: Story = {
  args: {
    label: "Subscribe to news",
    variant: "green",
  },
  parameters: {
    docs: {
      description: {
        story: "アクセントとして使用するグリーンボタン。緑の背景色。",
      },
    },
  },
};

/**
 * 全バリエーション一覧
 */
export const AllVariants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "20px";
    container.style.flexWrap = "wrap";

    const variants: ButtonArgs[] = [
      { label: "プライマリ", variant: "primary" },
      { label: "セカンダリ", variant: "secondary" },
      { label: "グリーン", variant: "green" },
    ];

    for (const args of variants) {
      container.appendChild(createButton(args));
    }

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: "すべてのボタンバリエーションを並べて表示。",
      },
    },
  },
};
