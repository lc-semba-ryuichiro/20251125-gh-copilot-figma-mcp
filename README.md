# Positivus Design System

Figmaデザインに基づいた、Storybookでドキュメント化された純粋なHTML/CSSコンポーネントライブラリ。このプロジェクトは、JavaScriptランタイム依存関係なしでデザイントークンとコンポーネントを実装し、静的HTMLテンプレートに焦点を当てています。

## 特徴

- 純粋なHTML/CSSコンポーネント（JavaScriptランタイム依存関係なし）
- Figma仕様に基づいたデザイントークン
- 包括的なStorybookドキュメント
- a11yアドオンによるアクセシビリティテスト
- Figmaデザイン統合
- 型安全なStorybookストーリーのためのTypeScript

## コンポーネント

デザインシステムには以下のコンポーネントが含まれています：

- **Button** - プライマリおよびセカンダリボタンバリアント
- **Heading** - タイポグラフィ見出しコンポーネント
- **Card** - コンテンツカードコンポーネント
- **Input** - フォーム入力コンポーネント
- **Logo** - ブランドロゴコンポーネント

## 前提条件

- Node.js（LTSバージョン推奨）
- pnpm 10.21.0以降

## インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd 20251125-gh-copilot-figma-mcp

# 依存関係をインストール
pnpm install
```

## 使用方法

### 開発

Storybook開発サーバーを起動：

```bash
pnpm storybook
```

Storybookは<http://localhost:6006>で起動します

### ビルド

本番用の静的Storybookをビルド：

```bash
pnpm build-storybook
```

ビルドされたファイルは`storybook-static`ディレクトリに出力されます。

## プロジェクト構造

```text
.
├── src/
│   ├── components/          # コンポーネントファイル
│   │   ├── [ComponentName]/
│   │   │   ├── [ComponentName].html        # 静的HTMLテンプレート
│   │   │   └── [ComponentName].stories.ts  # Storybookストーリー
│   └── styles/              # CSSファイル
│       ├── base/            # デザイントークンと基礎スタイル
│       │   ├── _variables.css   # Figmaからのデザイントークン
│       │   ├── _reset.css       # CSSリセット
│       │   └── _typography.css  # タイポグラフィのデフォルト
│       ├── components/      # コンポーネント固有のスタイル
│       ├── layouts/         # レイアウトユーティリティ
│       └── main.css         # メインエントリーポイント
├── .storybook/              # Storybook設定
└── CLAUDE.md                # Claude Code用のプロジェクト指示
```

## デザイントークン

すべてのデザイントークンは`src/styles/base/_variables.css`にCSSカスタムプロパティとして定義されています：

- **カラー**：`--color-green`、`--color-dark`、`--color-grey`、`--color-black`、`--color-white`
- **タイポグラフィ**：Space Groteskフォントファミリーとさまざまなウェイト・サイズ
- **スペーシング**：`--spacing-xs`から`--spacing-2xl`
- **ボーダー半径**：`--radius-sm`、`--radius-md`、`--radius-lg`
- **コンテナ**：`--container-max-width`（1240px）、`--container-padding`（100px）

## コード品質

このプロジェクトは、コード品質を維持するために複数のツールを使用しています：

```bash
# JavaScript/TypeScriptのLintとフォーマット
pnpm biome check
pnpm biome check --write

# Markdownファイルのチェック
pnpm remark .

# 露出したシークレットのチェック
pnpm secretlint
```

## パッケージ管理

このプロジェクトは、pnpmワークスペースカタログ（strictモード）を使用しています。すべての依存関係は`pnpm-workspace.yaml`の`catalog`セクションで定義されています。依存関係を追加する場合は、まずカタログに追加してから、package.jsonで`catalog:`を参照してください。

## 技術スタック

- **Storybook** - コンポーネントドキュメントと開発環境
- **TypeScript** - Storybookストーリーの型チェック
- **Biome** - 高速なLinterとフォーマッター
- **Remark** - Markdownのlinting
- **Commitlint** - Conventional Commitsの適用
- **Vite** - Storybookのビルドツール

## コントリビューション

プルリクエストの送信プロセスと行動規範の詳細については、[CONTRIBUTING.md](CONTRIBUTING.md)をお読みください。

## ライセンス

MIT

## 著者

Ryuichiro Semba
