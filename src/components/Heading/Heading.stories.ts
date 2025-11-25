import type { Meta, StoryObj } from "@storybook/html";

interface HeadingArgs {
  title: string;
  description?: string;
  showDescription?: boolean;
}

/**
 * Creates a heading component
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
    title: { control: "text" },
    description: { control: "text" },
    showDescription: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Section heading with green label background. Used for all major sections.",
      },
    },
  },
  render: (args) => createHeading(args),
};

export default meta;

type Story = StoryObj<HeadingArgs>;

/**
 * Services section heading
 */
export const Services: Story = {
  args: {
    title: "Services",
    description:
      "At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:",
    showDescription: true,
  },
};

/**
 * Case Studies section heading
 */
export const CaseStudies: Story = {
  args: {
    title: "Case Studies",
    description:
      "Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies",
    showDescription: true,
  },
};

/**
 * Team section heading
 */
export const Team: Story = {
  args: {
    title: "Team",
    description:
      "Meet the skilled and experienced team behind our successful digital marketing strategies",
    showDescription: true,
  },
};

/**
 * Heading without description
 */
export const WithoutDescription: Story = {
  args: {
    title: "Our Working Process",
    showDescription: false,
  },
};
