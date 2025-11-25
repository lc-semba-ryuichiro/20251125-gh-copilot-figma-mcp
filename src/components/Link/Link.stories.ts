import type { Meta, StoryObj } from "@storybook/html";

/**
 * リンクのバリエーション
 * - white: 白背景アイコン + 緑矢印（ダーク背景用、テキスト白）
 * - white2: ダーク背景アイコン + 白矢印（ダーク背景用、テキスト白）
 * - black: 白背景アイコン + 黒矢印（明るい背景用、テキスト黒）
 * - black2: ダーク背景アイコン + 緑矢印（明るい背景用、テキスト黒）
 * - green: 緑背景アイコン + 黒矢印（明るい背景用、テキスト黒）
 * - green2: 緑背景アイコン + 白矢印（ダーク背景用、テキスト白）
 * - simple-green: 矢印のみ（緑、ダーク背景用）
 * - simple-white: 矢印のみ（白、ダーク背景用）
 * - simple-black: 矢印のみ（黒、明るい背景用）
 */
type LinkVariant =
  | "white"
  | "white2"
  | "black"
  | "black2"
  | "green"
  | "green2"
  | "simple-green"
  | "simple-white"
  | "simple-black";

interface LinkArgs {
  label: string;
  variant: LinkVariant;
  href?: string;
}

/**
 * バリエーションに応じたアイコンパスを取得
 */
const getIconPath = (variant: LinkVariant): string => {
  const iconMap: Record<LinkVariant, string> = {
    white: "/assets/images/link-1.svg", // 白背景 + 緑矢印
    black: "/assets/images/link-2.svg", // 白背景 + 黒矢印
    black2: "/assets/images/link-3.svg", // ダーク背景 + 緑矢印
    white2: "/assets/images/link-4.svg", // ダーク背景 + 白矢印
    green: "/assets/images/link-5.svg", // 緑背景 + 黒矢印
    green2: "/assets/images/link-6.svg", // 緑背景 + 白矢印
    "simple-green": "/assets/images/link-simple-green-arrow.svg",
    "simple-white": "/assets/images/link-simple-white-arrow.svg",
    "simple-black": "/assets/images/link-simple-black-arrow.svg",
  };
  return iconMap[variant];
};

/**
 * バリエーションに応じたテキストカラークラスを取得
 */
const getTextColorClass = (variant: LinkVariant): string => {
  if (variant === "simple-green") {
    return "link--green";
  }
  const whiteTextVariants: LinkVariant[] = [
    "white",
    "white2",
    "green2",
    "simple-white",
  ];
  return whiteTextVariants.includes(variant) ? "link--white" : "";
};

/**
 * シンプルバリエーションかどうか
 */
const isSimpleVariant = (variant: LinkVariant): boolean => {
  return variant.startsWith("simple-");
};

/**
 * Figma デザインに基づいてリンク要素を作成する
 */
const createLink = ({
  label,
  variant,
  href = "#",
}: LinkArgs): HTMLAnchorElement => {
  const link = document.createElement("a");
  link.href = href;

  const isSimple = isSimpleVariant(variant);
  const textColorClass = getTextColorClass(variant);
  const variantClass = isSimple ? "link--arrow" : "";

  link.className = ["link", variantClass, textColorClass]
    .filter(Boolean)
    .join(" ");

  const iconPath = getIconPath(variant);
  const img = document.createElement("img");
  img.src = iconPath;
  img.alt = "";
  img.className = "link__icon";

  const text = document.createElement("span");
  text.textContent = label;

  // シンプルバリエーションはテキストが先、アイコンが後
  if (isSimple) {
    link.appendChild(text);
    link.appendChild(img);
  } else {
    link.appendChild(img);
    link.appendChild(text);
  }

  return link;
};

const meta: Meta<LinkArgs> = {
  title: "Components/Link",
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "リンクのラベルテキスト",
    },
    variant: {
      control: "select",
      options: [
        "white",
        "white2",
        "black",
        "black2",
        "green",
        "green2",
        "simple-green",
        "simple-white",
        "simple-black",
      ],
      description: "リンクのバリエーション",
    },
    href: {
      control: "text",
      description: "リンク先のURL",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "矢印アイコン付きのリンクコンポーネント。9種類のバリエーションがあり、背景色やコンテキストに応じて使い分ける。",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/wvcbgLiaEjliuWGNJ8UWsj/Positivus-Landing-Page-Design--Community-?node-id=403-284",
    },
  },
  render: (args) => createLink(args),
};

export default meta;

type Story = StoryObj<LinkArgs>;

/**
 * White - ダーク背景用（白背景アイコン + 緑矢印）
 */
export const White: Story = {
  args: {
    label: "Learn more",
    variant: "white",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "ダーク背景で使用。白い円形背景に緑の矢印アイコン、白いテキスト。",
      },
    },
  },
};

/**
 * White2 - ダーク背景用（ダーク背景アイコン + 白矢印）
 */
export const White2: Story = {
  args: {
    label: "Learn more",
    variant: "white2",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "ダーク背景で使用。ダークの円形背景に白い矢印アイコン、白いテキスト。",
      },
    },
  },
};

/**
 * Black - 明るい背景用（白背景アイコン + 黒矢印）
 */
export const Black: Story = {
  args: {
    label: "Learn more",
    variant: "black",
  },
  parameters: {
    docs: {
      description: {
        story:
          "明るい背景で使用。白い円形背景に黒い矢印アイコン、黒いテキスト。",
      },
    },
  },
};

/**
 * Black2 - 明るい背景用（ダーク背景アイコン + 緑矢印）
 */
export const Black2: Story = {
  args: {
    label: "Learn more",
    variant: "black2",
  },
  parameters: {
    docs: {
      description: {
        story:
          "明るい背景で使用。ダークの円形背景に緑の矢印アイコン、黒いテキスト。",
      },
    },
  },
};

/**
 * Green - 明るい背景用（緑背景アイコン + 黒矢印）
 */
export const Green: Story = {
  args: {
    label: "Learn more",
    variant: "green",
  },
  parameters: {
    docs: {
      description: {
        story:
          "明るい背景で使用。緑の円形背景に黒い矢印アイコン、黒いテキスト。",
      },
    },
  },
};

/**
 * Green2 - ダーク背景用（緑背景アイコン + 白矢印）
 */
export const Green2: Story = {
  args: {
    label: "Learn more",
    variant: "green2",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "ダーク背景で使用。緑の円形背景に白い矢印アイコン、白いテキスト。",
      },
    },
  },
};

/**
 * Simple Green - シンプルな緑矢印（ダーク背景用）
 */
export const SimpleGreen: Story = {
  args: {
    label: "Read more",
    variant: "simple-green",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "ダーク背景で使用。円形背景なしの緑矢印アイコン、緑のテキスト。",
      },
    },
  },
};

/**
 * Simple White - シンプルな白矢印（ダーク背景用）
 */
export const SimpleWhite: Story = {
  args: {
    label: "Read more",
    variant: "simple-white",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "ダーク背景で使用。円形背景なしの白矢印アイコン、白いテキスト。",
      },
    },
  },
};

/**
 * Simple Black - シンプルな黒矢印（明るい背景用）
 */
export const SimpleBlack: Story = {
  args: {
    label: "Read more",
    variant: "simple-black",
  },
  parameters: {
    docs: {
      description: {
        story: "明るい背景で使用。円形背景なしの黒矢印アイコン、黒いテキスト。",
      },
    },
  },
};

/**
 * 明るい背景用バリエーション一覧
 */
export const LightBackgroundVariants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "20px";

    const lightVariants: LinkArgs[] = [
      { label: "Black variant", variant: "black" },
      { label: "Black2 variant", variant: "black2" },
      { label: "Green variant", variant: "green" },
      { label: "Simple black", variant: "simple-black" },
    ];

    for (const args of lightVariants) {
      container.appendChild(createLink(args));
    }

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: "明るい背景で使用するリンクバリエーションの一覧。",
      },
    },
  },
};

/**
 * ダーク背景用バリエーション一覧
 */
export const DarkBackgroundVariants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "20px";

    const darkVariants: LinkArgs[] = [
      { label: "White variant", variant: "white" },
      { label: "White2 variant", variant: "white2" },
      { label: "Green2 variant", variant: "green2" },
      { label: "Simple green", variant: "simple-green" },
      { label: "Simple white", variant: "simple-white" },
    ];

    for (const args of darkVariants) {
      container.appendChild(createLink(args));
    }

    return container;
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "ダーク背景で使用するリンクバリエーションの一覧。",
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
    container.style.gap = "40px";

    // 明るい背景セクション
    const lightSection = document.createElement("div");
    lightSection.style.display = "flex";
    lightSection.style.flexDirection = "column";
    lightSection.style.gap = "16px";
    lightSection.style.padding = "20px";
    lightSection.style.backgroundColor = "var(--color-white)";
    lightSection.style.borderRadius = "8px";

    const lightTitle = document.createElement("h4");
    lightTitle.textContent = "明るい背景用";
    lightTitle.style.marginBottom = "8px";
    lightSection.appendChild(lightTitle);

    const lightVariants: LinkArgs[] = [
      { label: "Black", variant: "black" },
      { label: "Black2", variant: "black2" },
      { label: "Green", variant: "green" },
      { label: "Simple black", variant: "simple-black" },
    ];

    for (const args of lightVariants) {
      lightSection.appendChild(createLink(args));
    }

    // ダーク背景セクション
    const darkSection = document.createElement("div");
    darkSection.style.display = "flex";
    darkSection.style.flexDirection = "column";
    darkSection.style.gap = "16px";
    darkSection.style.padding = "20px";
    darkSection.style.backgroundColor = "var(--color-dark)";
    darkSection.style.borderRadius = "8px";

    const darkTitle = document.createElement("h4");
    darkTitle.textContent = "ダーク背景用";
    darkTitle.style.color = "var(--color-white)";
    darkTitle.style.marginBottom = "8px";
    darkSection.appendChild(darkTitle);

    const darkVariants: LinkArgs[] = [
      { label: "White", variant: "white" },
      { label: "White2", variant: "white2" },
      { label: "Green2", variant: "green2" },
      { label: "Simple green", variant: "simple-green" },
      { label: "Simple white", variant: "simple-white" },
    ];

    for (const args of darkVariants) {
      darkSection.appendChild(createLink(args));
    }

    container.appendChild(lightSection);
    container.appendChild(darkSection);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story:
          "すべてのリンクバリエーションを、適した背景色でグループ分けして表示。",
      },
    },
  },
};
