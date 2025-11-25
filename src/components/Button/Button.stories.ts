import type { Meta, StoryObj } from "@storybook/html";

interface ButtonArgs {
  label: string;
  variant: "primary" | "secondary" | "tertiary";
}

/**
 * ボタン要素を作成する
 * Figma デザインに基づいた実装
 * - padding: 20px 35px
 * - border-radius: 14px
 * - font-size: 20px
 * - line-height: 28px
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
      options: ["primary", "secondary", "tertiary"],
      description:
        "ボタンのスタイルバリエーション（primary / secondary / tertiary）",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Positivus デザインシステムに基づいたボタンコンポーネント。

## デザインスペック
| プロパティ | 値 |
|-----------|-----|
| padding | 20px 35px |
| border-radius | 14px |
| font-size | 20px |
| line-height | 28px |
| font-weight | 400 (Regular) |
| font-family | Space Grotesk |

## バリエーション
- **Primary**: ダーク背景（#191A23）+ 白テキスト - メインアクション用
- **Secondary**: アウトライン（1px solid #191A23）+ 黒テキスト - 補助アクション用
- **Tertiary**: 緑背景（#B9FF66）+ 黒テキスト - アクセント用
        `,
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/wvcbgLiaEjliuWGNJ8UWsj/Positivus-Landing-Page-Design--Community-?node-id=403-246",
    },
  },
  render: (args) => createButton(args),
};

export default meta;

type Story = StoryObj<ButtonArgs>;

/**
 * プライマリボタン - メインアクション用
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
          "メインのアクションに使用するプライマリボタン。ダーク背景色（#191A23）に白いテキスト。",
      },
    },
  },
};

/**
 * セカンダリボタン - 補助アクション用
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
          "補助的なアクションに使用するセカンダリボタン。アウトラインスタイル（1px solid #191A23）に黒いテキスト。",
      },
    },
  },
};

/**
 * ターシャリボタン - 緑の背景色（アクセント用）
 */
export const Tertiary: Story = {
  args: {
    label: "Subscribe to news",
    variant: "tertiary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "アクセントとして使用するターシャリボタン。緑の背景色（#B9FF66）に黒いテキスト。",
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
      { label: "ターシャリ", variant: "tertiary" },
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
