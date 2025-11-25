import type { Meta, StoryObj } from "@storybook/html";

type CardVariant = "grey" | "green" | "dark" | "white";
type LabelVariant = "green" | "white";

interface ServiceCardArgs {
  variant: CardVariant;
  title: string;
  subtitle: string;
  labelVariant?: LabelVariant;
}

interface TeamCardArgs {
  name: string;
  role: string;
  bio: string;
}

/**
 * サービスカードを作成する
 */
const createServiceCard = ({
  variant,
  title,
  subtitle,
  labelVariant = "green",
}: ServiceCardArgs): HTMLElement => {
  const card = document.createElement("article");
  card.className = `card card--${variant}`;
  card.style.width = "600px";

  const content = document.createElement("div");
  content.className = "card__content service-card";

  const heading = document.createElement("div");
  heading.className = "service-card__heading";

  // ラベルコンテナ
  const labelContainer = document.createElement("div");
  labelContainer.className = "heading__label";

  const label1 = document.createElement("span");
  label1.className = `heading__label-text heading__label-text--small ${labelVariant === "white" ? "heading__label-text--white" : ""}`;
  label1.textContent = title;

  const label2 = document.createElement("span");
  label2.className = `heading__label-text heading__label-text--small ${labelVariant === "white" ? "heading__label-text--white" : ""}`;
  label2.textContent = subtitle;

  labelContainer.appendChild(label1);
  labelContainer.appendChild(label2);

  // リンク
  const link = document.createElement("a");
  link.href = "#";
  link.className = `link ${variant === "dark" ? "link--white" : ""}`;
  link.innerHTML = `
    <span class="link__icon" style="font-size: 24px;">→</span>
    <span>Learn more</span>
  `;

  heading.appendChild(labelContainer);
  heading.appendChild(link);

  // イラストのプレースホルダー
  const illustration = document.createElement("div");
  illustration.className = "service-card__illustration";
  illustration.style.cssText =
    "width: 210px; height: 170px; background: rgba(0,0,0,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center;";
  illustration.textContent = "イラスト";

  content.appendChild(heading);
  content.appendChild(illustration);
  card.appendChild(content);

  return card;
};

/**
 * チームカードを作成する
 */
const createTeamCard = ({ name, role, bio }: TeamCardArgs): HTMLElement => {
  const card = document.createElement("article");
  card.className = "card card--white";
  card.style.width = "387px";

  card.innerHTML = `
    <div class="team-card">
      <div class="team-card__header">
        <div class="team-card__avatar" style="width: 98px; height: 98px; background: var(--color-green); border-radius: 50%;"></div>
        <div class="team-card__info">
          <span class="team-card__name">${name}</span>
          <span class="team-card__role">${role}</span>
        </div>
      </div>
      <div class="team-card__divider"></div>
      <p class="team-card__bio">${bio}</p>
    </div>
  `;

  return card;
};

const meta: Meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "複数のバリエーションと用途を持つカードコンポーネント。サービス紹介やチームメンバー表示に使用。",
      },
    },
  },
};

export default meta;

type ServiceCardStory = StoryObj<ServiceCardArgs>;
type TeamCardStory = StoryObj<TeamCardArgs>;

/**
 * グレーのサービスカード
 */
export const ServiceCardGrey: ServiceCardStory = {
  args: {
    variant: "grey",
    title: "Search engine",
    subtitle: "optimization",
    labelVariant: "green",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["grey", "green", "dark", "white"],
      description: "カードの背景色バリエーション",
    },
  },
  render: (args) => createServiceCard(args),
  parameters: {
    docs: {
      description: {
        story: "グレー背景のサービスカード。SEOサービスなどの紹介に使用。",
      },
    },
  },
};

/**
 * グリーンのサービスカード
 */
export const ServiceCardGreen: ServiceCardStory = {
  args: {
    variant: "green",
    title: "Pay-per-click",
    subtitle: "advertising",
    labelVariant: "white",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["grey", "green", "dark", "white"],
      description: "カードの背景色バリエーション",
    },
  },
  render: (args) => createServiceCard(args),
  parameters: {
    docs: {
      description: {
        story: "グリーン背景のサービスカード。PPC広告などの紹介に使用。",
      },
    },
  },
};

/**
 * ダークのサービスカード
 */
export const ServiceCardDark: ServiceCardStory = {
  args: {
    variant: "dark",
    title: "Social Media",
    subtitle: "Marketing",
    labelVariant: "white",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["grey", "green", "dark", "white"],
      description: "カードの背景色バリエーション",
    },
  },
  render: (args) => createServiceCard(args),
  parameters: {
    docs: {
      description: {
        story:
          "ダーク背景のサービスカード。SNSマーケティングなどの紹介に使用。",
      },
    },
  },
};

/**
 * チームメンバーカード
 */
export const TeamCard: TeamCardStory = {
  args: {
    name: "John Smith",
    role: "CEO and Founder",
    bio: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
  },
  argTypes: {
    name: {
      control: "text",
      description: "メンバーの名前",
    },
    role: {
      control: "text",
      description: "メンバーの役職",
    },
    bio: {
      control: "text",
      description: "メンバーの紹介文",
    },
  },
  render: (args) => createTeamCard(args),
  parameters: {
    docs: {
      description: {
        story: "チームメンバーの紹介カード。名前、役職、紹介文を表示。",
      },
    },
  },
};

/**
 * 全サービスカードバリエーション
 */
export const AllServiceCards: StoryObj = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "40px";

    const cards: ServiceCardArgs[] = [
      {
        variant: "grey",
        title: "Search engine",
        subtitle: "optimization",
        labelVariant: "green",
      },
      {
        variant: "green",
        title: "Pay-per-click",
        subtitle: "advertising",
        labelVariant: "white",
      },
      {
        variant: "dark",
        title: "Social Media",
        subtitle: "Marketing",
        labelVariant: "white",
      },
    ];

    for (const args of cards) {
      container.appendChild(createServiceCard(args));
    }

    return container;
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "すべてのサービスカードバリエーションを並べて表示。",
      },
    },
  },
};
