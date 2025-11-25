import type { Meta, StoryObj } from "@storybook/html";

type LogoVariant = "default" | "light";

interface LogoArgs {
  variant: LogoVariant;
}

/**
 * Figma からエクスポートした SVG 画像を使用してロゴ要素を作成する
 */
const createLogo = ({ variant }: LogoArgs): HTMLAnchorElement => {
  const logo = document.createElement("a");
  logo.href = "/";
  logo.className = `logo logo--${variant}`;
  logo.setAttribute("aria-label", "Positivus ホーム");

  const img = document.createElement("img");
  img.src =
    variant === "light"
      ? "/assets/images/logo-white.svg"
      : "/assets/images/logo-black.svg";
  img.alt = "Positivus";
  img.className = "logo__image";

  logo.appendChild(img);
  return logo;
};

const meta: Meta<LogoArgs> = {
  title: "Components/Logo",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "light"],
      description: "ロゴのカラーバリエーション",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Positivus ロゴコンポーネント。デフォルト（黒）とライト（白）の2つのバリエーションがあり、背景色に応じて使い分ける。",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/wvcbgLiaEjliuWGNJ8UWsj/Positivus-Landing-Page-Design--Community-?node-id=403-252",
    },
  },
  render: (args) => createLogo(args),
};

export default meta;

type Story = StoryObj<LogoArgs>;

/**
 * デフォルトロゴ - 明るい背景用の黒色
 */
export const Default: Story = {
  args: {
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "明るい背景用のデフォルト（黒色）ロゴ。",
      },
    },
  },
};

/**
 * ライトロゴ - 暗い背景用の白色
 */
export const Light: Story = {
  args: {
    variant: "light",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "暗い背景用のライト（白色）ロゴ。",
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
    container.style.flexDirection = "column";
    container.style.gap = "40px";

    // 白背景のデフォルトバリエーション
    const defaultWrapper = document.createElement("div");
    defaultWrapper.style.padding = "20px";
    defaultWrapper.style.backgroundColor = "var(--color-white)";
    defaultWrapper.style.borderRadius = "8px";
    defaultWrapper.appendChild(createLogo({ variant: "default" }));

    // 暗い背景のライトバリエーション
    const lightWrapper = document.createElement("div");
    lightWrapper.style.padding = "20px";
    lightWrapper.style.backgroundColor = "var(--color-dark)";
    lightWrapper.style.borderRadius = "8px";
    lightWrapper.appendChild(createLogo({ variant: "light" }));

    container.appendChild(defaultWrapper);
    container.appendChild(lightWrapper);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: "両方のロゴバリエーションを、それぞれ適した背景色で並べて表示。",
      },
    },
  },
};
