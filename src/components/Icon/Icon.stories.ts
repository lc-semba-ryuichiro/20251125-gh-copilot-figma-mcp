import type { Meta, StoryObj } from "@storybook/html";

type IconVariant = "plus" | "minus";

interface IconArgs {
  variant: IconVariant;
  size?: number;
}

/**
 * Figma からエクスポートした SVG 画像を使用してアイコン要素を作成する
 */
const createIcon = ({ variant, size = 58 }: IconArgs): HTMLSpanElement => {
  const icon = document.createElement("span");
  icon.className = `icon icon--${variant}`;
  icon.setAttribute("role", "img");
  icon.setAttribute(
    "aria-label",
    variant === "plus" ? "展開する" : "折りたたむ",
  );

  const img = document.createElement("img");
  img.src =
    variant === "plus"
      ? "/assets/images/icon-plus.svg"
      : "/assets/images/icon-minus.svg";
  img.alt = "";
  img.className = "icon__image";
  img.width = size;
  img.height = size;

  icon.appendChild(img);
  return icon;
};

const meta: Meta<IconArgs> = {
  title: "Components/Icon",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["plus", "minus"],
      description: "アイコンのバリエーション（プラス / マイナス）",
    },
    size: {
      control: { type: "number", min: 24, max: 120, step: 4 },
      description: "アイコンのサイズ（ピクセル）",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "プラス・マイナスアイコンコンポーネント。アコーディオンの展開・折りたたみなどのインタラクションに使用。円形の背景にプラス/マイナス記号を配置したデザイン。",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/wvcbgLiaEjliuWGNJ8UWsj/Positivus-Landing-Page-Design--Community-?node-id=403-327",
    },
  },
  render: (args) => createIcon(args),
};

export default meta;

type Story = StoryObj<IconArgs>;

/**
 * プラスアイコン - 展開アクション用
 */
export const Plus: Story = {
  args: {
    variant: "plus",
    size: 58,
  },
  parameters: {
    docs: {
      description: {
        story:
          "展開アクション用のプラスアイコン。アコーディオンを開くなどの操作に使用。",
      },
    },
  },
};

/**
 * マイナスアイコン - 折りたたみアクション用
 */
export const Minus: Story = {
  args: {
    variant: "minus",
    size: 58,
  },
  parameters: {
    docs: {
      description: {
        story:
          "折りたたみアクション用のマイナスアイコン。アコーディオンを閉じるなどの操作に使用。",
      },
    },
  },
};

/**
 * 小サイズアイコン
 */
export const Small: Story = {
  args: {
    variant: "plus",
    size: 36,
  },
  parameters: {
    docs: {
      description: {
        story:
          "小さめのアイコンサイズ（36px）。狭いスペースでの使用に適している。",
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
    container.style.alignItems = "center";

    const variants: IconArgs[] = [
      { variant: "plus", size: 58 },
      { variant: "minus", size: 58 },
    ];

    for (const args of variants) {
      container.appendChild(createIcon(args));
    }

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: "プラス・マイナスアイコンを並べて表示。",
      },
    },
  },
};

/**
 * サイズ比較
 */
export const SizeComparison: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "20px";
    container.style.alignItems = "center";

    const sizes = [36, 48, 58, 72];

    for (const size of sizes) {
      const wrapper = document.createElement("div");
      wrapper.style.textAlign = "center";

      wrapper.appendChild(createIcon({ variant: "plus", size }));

      const label = document.createElement("div");
      label.style.marginTop = "8px";
      label.style.fontSize = "12px";
      label.style.color = "var(--color-dark)";
      label.textContent = `${size}px`;

      wrapper.appendChild(label);
      container.appendChild(wrapper);
    }

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: "異なるサイズのアイコンを比較表示。",
      },
    },
  },
};
