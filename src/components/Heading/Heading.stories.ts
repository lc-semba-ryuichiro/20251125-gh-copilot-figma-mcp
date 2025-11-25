import type { Meta, StoryObj } from "@storybook/html";

interface HeadingArgs {
  title: string;
  description?: string;
  showDescription?: boolean;
}

/**
 * 見出しコンポーネントを作成する
 */
const createHeading = ({
  title,
  description,
  showDescription = true,
}: HeadingArgs): HTMLDivElement => {
  const container = document.createElement("div");
  container.className = "heading";

  const labelContainer = document.createElement("div");
  labelContainer.className = "heading__label";

  const labelText = document.createElement("span");
  labelText.className = "heading__label-text";
  labelText.textContent = title;

  labelContainer.appendChild(labelText);
  container.appendChild(labelContainer);

  if (showDescription && description) {
    const desc = document.createElement("p");
    desc.className = "heading__description";
    desc.textContent = description;
    container.appendChild(desc);
  }

  return container;
};

const meta: Meta<HeadingArgs> = {
  title: "Components/Heading",
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "見出しのタイトルテキスト",
    },
    description: {
      control: "text",
      description: "見出しの説明文",
    },
    showDescription: {
      control: "boolean",
      description: "説明文を表示するかどうか",
    },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "緑色のラベル背景を持つセクション見出し。主要なセクションの見出しとして使用。",
      },
    },
  },
  render: (args) => createHeading(args),
};

export default meta;

type Story = StoryObj<HeadingArgs>;

/**
 * サービスセクションの見出し
 */
export const Services: Story = {
  args: {
    title: "Services",
    description:
      "At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:",
    showDescription: true,
  },
  parameters: {
    docs: {
      description: {
        story: "サービスセクション用の見出し。提供サービスの概要説明付き。",
      },
    },
  },
};

/**
 * ケーススタディセクションの見出し
 */
export const CaseStudies: Story = {
  args: {
    title: "Case Studies",
    description:
      "Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies",
    showDescription: true,
  },
  parameters: {
    docs: {
      description: {
        story: "ケーススタディセクション用の見出し。実績事例の紹介。",
      },
    },
  },
};

/**
 * チームセクションの見出し
 */
export const Team: Story = {
  args: {
    title: "Team",
    description:
      "Meet the skilled and experienced team behind our successful digital marketing strategies",
    showDescription: true,
  },
  parameters: {
    docs: {
      description: {
        story: "チームセクション用の見出し。チームメンバーの紹介。",
      },
    },
  },
};

/**
 * 説明文なしの見出し
 */
export const WithoutDescription: Story = {
  args: {
    title: "Our Working Process",
    showDescription: false,
  },
  parameters: {
    docs: {
      description: {
        story: "説明文を省略した見出しパターン。",
      },
    },
  },
};
