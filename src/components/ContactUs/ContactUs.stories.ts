import type { Meta, StoryObj } from "@storybook/html";

type ContactType = "say-hi" | "get-quote";

interface ContactUsArgs {
  contactType: ContactType;
  showIllustration: boolean;
}

/**
 * 星形のSVGを作成する
 */
const createStarSvg = (
  color: string,
  size: number,
): SVGElement => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size.toString());
  svg.setAttribute("height", size.toString());
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("fill", "none");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z",
  );
  path.setAttribute("fill", color);

  svg.appendChild(path);
  return svg;
};

/**
 * 放射線のSVGを作成する
 */
const createLinesSvg = (): SVGElement => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "300");
  svg.setAttribute("height", "300");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.setAttribute("fill", "none");

  const centerX = 150;
  const centerY = 150;
  const numLines = 36;
  const innerRadius = 50;
  const outerRadius = 150;

  for (let i = 0; i < numLines; i++) {
    const angle = (i / numLines) * 2 * Math.PI;
    const x1 = centerX + innerRadius * Math.cos(angle);
    const y1 = centerY + innerRadius * Math.sin(angle);
    const x2 = centerX + outerRadius * Math.cos(angle);
    const y2 = centerY + outerRadius * Math.sin(angle);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", "#191A23");
    line.setAttribute("stroke-width", "1");

    svg.appendChild(line);
  }

  return svg;
};

/**
 * Contact Usコンポーネントを作成する
 */
const createContactUs = ({
  contactType,
  showIllustration,
}: ContactUsArgs): HTMLElement => {
  const container = document.createElement("div");
  container.className = "contact-us";

  // Form
  const form = document.createElement("form");
  form.className = "contact-us__form";

  // Radio Buttons
  const radioGroup = document.createElement("div");
  radioGroup.className = "contact-us__radio-group";

  const radioOptions: Array<{ value: ContactType; label: string }> = [
    { value: "say-hi", label: "Say Hi" },
    { value: "get-quote", label: "Get a Quote" },
  ];

  for (const option of radioOptions) {
    const radioLabel = document.createElement("label");
    radioLabel.className = "contact-us__radio";

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "contact-type";
    radioInput.value = option.value;
    radioInput.className = "contact-us__radio-input";
    radioInput.checked = option.value === contactType;

    const radioText = document.createElement("span");
    radioText.className = "contact-us__radio-text";
    radioText.textContent = option.label;

    radioLabel.appendChild(radioInput);
    radioLabel.appendChild(radioText);
    radioGroup.appendChild(radioLabel);
  }

  form.appendChild(radioGroup);

  // Form Fields
  const fields = document.createElement("div");
  fields.className = "contact-us__fields";

  const fieldConfigs = [
    { label: "Name", placeholder: "Name", type: "text", required: false },
    { label: "Email*", placeholder: "Email", type: "email", required: true },
    {
      label: "Message*",
      placeholder: "Message",
      type: "textarea",
      required: true,
    },
  ];

  for (const config of fieldConfigs) {
    const fieldContainer = document.createElement("div");
    fieldContainer.className = "input";
    fieldContainer.style.width = "556px";

    const label = document.createElement("label");
    label.className = "input__label";
    label.textContent = config.label;

    fieldContainer.appendChild(label);

    if (config.type === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.className = "input__field input__field--textarea";
      textarea.placeholder = config.placeholder;
      textarea.required = config.required;
      fieldContainer.appendChild(textarea);
    } else {
      const input = document.createElement("input");
      input.type = config.type;
      input.className = "input__field";
      input.placeholder = config.placeholder;
      input.required = config.required;
      fieldContainer.appendChild(input);
    }

    fields.appendChild(fieldContainer);
  }

  form.appendChild(fields);

  // Submit Button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "contact-us__submit";
  submitBtn.textContent = "Send Message";

  form.appendChild(submitBtn);
  container.appendChild(form);

  // Illustration
  if (showIllustration) {
    const illustration = document.createElement("div");
    illustration.className = "contact-us__illustration";

    const illustrationInner = document.createElement("div");
    illustrationInner.className = "contact-us__illustration-inner";
    illustrationInner.style.position = "relative";
    illustrationInner.style.width = "300px";
    illustrationInner.style.height = "400px";

    // Lines
    const linesWrapper = document.createElement("div");
    linesWrapper.className = "contact-us__lines";
    linesWrapper.style.position = "absolute";
    linesWrapper.style.top = "50%";
    linesWrapper.style.left = "50%";
    linesWrapper.style.transform = "translate(-50%, -50%)";
    linesWrapper.appendChild(createLinesSvg());
    illustrationInner.appendChild(linesWrapper);

    // Dark Star
    const darkStarWrapper = document.createElement("div");
    darkStarWrapper.className = "contact-us__star contact-us__star--dark";
    darkStarWrapper.style.position = "absolute";
    darkStarWrapper.style.top = "40%";
    darkStarWrapper.style.left = "50%";
    darkStarWrapper.style.transform = "translate(-50%, -50%)";
    darkStarWrapper.style.zIndex = "2";
    darkStarWrapper.appendChild(createStarSvg("#191A23", 120));
    illustrationInner.appendChild(darkStarWrapper);

    // Green Star
    const greenStarWrapper = document.createElement("div");
    greenStarWrapper.className = "contact-us__star contact-us__star--green";
    greenStarWrapper.style.position = "absolute";
    greenStarWrapper.style.bottom = "15%";
    greenStarWrapper.style.left = "40%";
    greenStarWrapper.style.transform = "translateX(-50%)";
    greenStarWrapper.style.zIndex = "2";
    greenStarWrapper.appendChild(createStarSvg("#B9FF66", 80));
    illustrationInner.appendChild(greenStarWrapper);

    illustration.appendChild(illustrationInner);
    container.appendChild(illustration);
  }

  return container;
};

const meta: Meta<ContactUsArgs> = {
  title: "Components/ContactUs",
  tags: ["autodocs"],
  argTypes: {
    contactType: {
      control: "select",
      options: ["say-hi", "get-quote"],
      description: "選択されているお問い合わせタイプ",
    },
    showIllustration: {
      control: "boolean",
      description: "イラストを表示するかどうか",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Contact Usセクションのコンポーネント。お問い合わせフォームと装飾的なイラストを含みます。

## デザインスペック
| プロパティ | 値 |
|-----------|-----|
| 背景色 | Grey (#F3F3F3) |
| border-radius | 45px |
| padding | 60px 100px 80px |
| フォーム幅 | 556px |

## フォーム要素
- **ラジオボタン**: "Say Hi" と "Get a Quote" オプション
- **入力フィールド**: Name, Email*, Message*
- **送信ボタン**: Dark背景のプライマリスタイル

## イラスト
- 放射線パターン
- ダークカラーの星（大）
- グリーンカラーの星（小）
        `,
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/wvcbgLiaEjliuWGNJ8UWsj/Positivus-Landing-Page-Design--Community-?node-id=341-623",
    },
    layout: "fullscreen",
  },
  render: (args) => createContactUs(args),
};

export default meta;

type Story = StoryObj<ContactUsArgs>;

/**
 * デフォルト - イラスト付き
 */
export const Default: Story = {
  args: {
    contactType: "say-hi",
    showIllustration: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'デフォルトのContact Usコンポーネント。"Say Hi"が選択された状態で、イラストが表示されています。',
      },
    },
  },
};

/**
 * Get a Quote 選択時
 */
export const GetQuote: Story = {
  args: {
    contactType: "get-quote",
    showIllustration: true,
  },
  parameters: {
    docs: {
      description: {
        story: '"Get a Quote"が選択された状態のContact Usコンポーネント。',
      },
    },
  },
};

/**
 * イラストなし
 */
export const WithoutIllustration: Story = {
  args: {
    contactType: "say-hi",
    showIllustration: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "イラストを非表示にしたContact Usコンポーネント。モバイル表示やシンプルなレイアウトに使用できます。",
      },
    },
  },
};

/**
 * すべてのバリアント
 */
export const AllVariants: Story = {
  render: () => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "40px";
    wrapper.style.padding = "20px";

    // Say Hi with illustration
    const variant1 = createContactUs({
      contactType: "say-hi",
      showIllustration: true,
    });

    // Get Quote without illustration
    const variant2 = createContactUs({
      contactType: "get-quote",
      showIllustration: false,
    });

    wrapper.appendChild(variant1);
    wrapper.appendChild(variant2);

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: "Contact Usコンポーネントのすべてのバリエーションを表示します。",
      },
    },
  },
};
