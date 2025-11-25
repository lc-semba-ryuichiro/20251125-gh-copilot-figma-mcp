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
 * Creates a service card
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

  // Label container
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

  // Link
  const link = document.createElement("a");
  link.href = "#";
  link.className = `link ${variant === "dark" ? "link--white" : ""}`;
  link.innerHTML = `
    <span class="link__icon" style="font-size: 24px;">→</span>
    <span>Learn more</span>
  `;

  heading.appendChild(labelContainer);
  heading.appendChild(link);

  // Illustration placeholder
  const illustration = document.createElement("div");
  illustration.className = "service-card__illustration";
  illustration.style.cssText =
    "width: 210px; height: 170px; background: rgba(0,0,0,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center;";
  illustration.textContent = "Illustration";

  content.appendChild(heading);
  content.appendChild(illustration);
  card.appendChild(content);

  return card;
};

/**
 * Creates a team card
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
        component: "Card components with multiple variants and purposes.",
      },
    },
  },
};

export default meta;

type ServiceCardStory = StoryObj<ServiceCardArgs>;
type TeamCardStory = StoryObj<TeamCardArgs>;

/**
 * Grey service card
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
    },
  },
  render: (args) => createServiceCard(args),
};

/**
 * Green service card
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
    },
  },
  render: (args) => createServiceCard(args),
};

/**
 * Dark service card
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
    },
  },
  render: (args) => createServiceCard(args),
};

/**
 * Team member card
 */
export const TeamCard: TeamCardStory = {
  args: {
    name: "John Smith",
    role: "CEO and Founder",
    bio: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
  },
  argTypes: {
    name: { control: "text" },
    role: { control: "text" },
    bio: { control: "text" },
  },
  render: (args) => createTeamCard(args),
};

/**
 * All service card variants
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
  },
};
