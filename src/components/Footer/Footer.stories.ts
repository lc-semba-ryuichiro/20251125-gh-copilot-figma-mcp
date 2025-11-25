import type { Meta, StoryObj } from "@storybook/html";

interface FooterArgs {
  email: string;
  phone: string;
  address: string;
  copyrightYear: string;
}

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  platform: "linkedin" | "facebook" | "twitter";
  href: string;
}

const navLinks: NavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const socialLinks: SocialLink[] = [
  { platform: "linkedin", href: "https://linkedin.com" },
  { platform: "facebook", href: "https://facebook.com" },
  { platform: "twitter", href: "https://twitter.com" },
];

/**
 * フッターコンポーネントを作成する
 * Figma デザインに基づいた実装
 * - 背景色: #191A23 (Dark)
 * - 角丸: 45px (上部のみ)
 * - パディング: 55px 60px 50px
 */
const createFooter = ({
  email,
  phone,
  address,
  copyrightYear,
}: FooterArgs): HTMLElement => {
  const footer = document.createElement("footer");
  footer.className = "footer";

  // Content wrapper
  const content = document.createElement("div");
  content.className = "footer__content";

  // Top section: Logo, Navigation, Social icons
  const top = document.createElement("div");
  top.className = "footer__top";

  // Logo
  const logo = document.createElement("a");
  logo.href = "/";
  logo.className = "footer__logo";
  logo.setAttribute("aria-label", "Positivus ホーム");

  const logoImg = document.createElement("img");
  logoImg.src = "/assets/images/logo-white.svg";
  logoImg.alt = "Positivus";
  logoImg.className = "footer__logo-image";
  logo.appendChild(logoImg);

  // Navigation
  const nav = document.createElement("nav");
  nav.className = "footer__nav";
  nav.setAttribute("aria-label", "フッターナビゲーション");

  for (const link of navLinks) {
    const navLink = document.createElement("a");
    navLink.href = link.href;
    navLink.className = "footer__nav-link";
    navLink.textContent = link.label;
    nav.appendChild(navLink);
  }

  // Social icons
  const social = document.createElement("div");
  social.className = "footer__social";
  social.setAttribute("aria-label", "ソーシャルメディア");

  for (const link of socialLinks) {
    const socialLink = document.createElement("a");
    socialLink.href = link.href;
    socialLink.className = "footer__social-link";
    socialLink.setAttribute("aria-label", link.platform);

    const socialIcon = document.createElement("img");
    socialIcon.src = `/assets/images/icon-${link.platform}.svg`;
    socialIcon.alt = "";
    socialIcon.className = "footer__social-icon";
    socialLink.appendChild(socialIcon);
    social.appendChild(socialLink);
  }

  top.appendChild(logo);
  top.appendChild(nav);
  top.appendChild(social);

  // Middle section: Contact info and Subscription
  const middle = document.createElement("div");
  middle.className = "footer__middle";

  // Contact info
  const contactInfo = document.createElement("div");
  contactInfo.className = "footer__contact-info";

  const contactLabel = document.createElement("span");
  contactLabel.className = "footer__contact-label";
  contactLabel.textContent = "Contact us:";

  const contactList = document.createElement("div");
  contactList.className = "footer__contact-list";

  const emailP = document.createElement("p");
  emailP.textContent = `Email: ${email}`;

  const phoneP = document.createElement("p");
  phoneP.textContent = `Phone: ${phone}`;

  const addressP = document.createElement("p");
  addressP.innerHTML = `Address: ${address.replace("\n", "<br>")}`;

  contactList.appendChild(emailP);
  contactList.appendChild(phoneP);
  contactList.appendChild(addressP);
  contactInfo.appendChild(contactLabel);
  contactInfo.appendChild(contactList);

  // Subscription
  const subscription = document.createElement("div");
  subscription.className = "footer__subscription";

  const input = document.createElement("input");
  input.type = "email";
  input.className = "footer__subscription-input";
  input.placeholder = "Email";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "footer__subscription-button";
  button.textContent = "Subscribe to news";

  subscription.appendChild(input);
  subscription.appendChild(button);

  middle.appendChild(contactInfo);
  middle.appendChild(subscription);

  content.appendChild(top);
  content.appendChild(middle);

  // Divider
  const divider = document.createElement("div");
  divider.className = "footer__divider";

  // Bottom section: Copyright and Privacy
  const bottom = document.createElement("div");
  bottom.className = "footer__bottom";

  const copyright = document.createElement("p");
  copyright.className = "footer__copyright";
  copyright.textContent = `© ${copyrightYear} Positivus. All Rights Reserved.`;

  const privacy = document.createElement("a");
  privacy.href = "/privacy";
  privacy.className = "footer__privacy";
  privacy.textContent = "Privacy Policy";

  bottom.appendChild(copyright);
  bottom.appendChild(privacy);

  footer.appendChild(content);
  footer.appendChild(divider);
  footer.appendChild(bottom);

  return footer;
};

const meta: Meta<FooterArgs> = {
  title: "Layouts/Footer",
  tags: ["autodocs"],
  argTypes: {
    email: {
      control: "text",
      description: "連絡先メールアドレス",
    },
    phone: {
      control: "text",
      description: "連絡先電話番号",
    },
    address: {
      control: "text",
      description: String.raw`住所（改行は \n で指定）`,
    },
    copyrightYear: {
      control: "text",
      description: "著作権表示の年",
    },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Positivus デザインシステムに基づいたフッターコンポーネント。

## デザインスペック
| プロパティ | 値 |
|-----------|-----|
| 背景色 | #191A23 (Dark) |
| 角丸 | 45px (上部のみ) |
| パディング | 55px 60px 50px |
| テキスト色 | #FFFFFF (White) |

## セクション構成
1. **トップセクション**: ロゴ、ナビゲーション、ソーシャルアイコン
2. **ミドルセクション**: 連絡先情報、ニュースレター購読フォーム
3. **ボトムセクション**: 著作権表示、プライバシーポリシーリンク

## 含まれる要素
- ロゴ（白バージョン）
- ナビゲーションリンク（下線付き）
- ソーシャルアイコン（LinkedIn、Facebook、Twitter）
- 連絡先情報（ラベル付き）
- メール購読フォーム
- 区切り線
- 著作権とプライバシーポリシー
        `,
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/wvcbgLiaEjliuWGNJ8UWsj/Positivus-Landing-Page-Design--Community-?node-id=341-689",
    },
  },
  render: (args) => createFooter(args),
};

export default meta;

type Story = StoryObj<FooterArgs>;

/**
 * デフォルトのフッター
 */
export const Default: Story = {
  args: {
    email: "info@positivus.com",
    phone: "555-567-8901",
    address: "1234 Main St\nMoonstone City, Stardust State 12345",
    copyrightYear: "2023",
  },
  parameters: {
    docs: {
      description: {
        story: "Figmaデザインに基づいた標準的なフッターレイアウト。",
      },
    },
  },
};
