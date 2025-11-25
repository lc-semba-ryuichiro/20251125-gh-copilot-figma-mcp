# copilot-instructions.md

このファイルは、このリポジトリで作業する際に GitHub Copilot にガイダンスを提供します。

## プロジェクト概要

これは Positivus Design System - Storybookでドキュメント化された純粋なHTML/CSSコンポーネントライブラリです。
このプロジェクトは、Figmaデザインに基づいたデザイントークンとコンポーネントを実装しており、JavaScriptランタイム依存関係のない静的HTMLテンプレートに焦点を当てています。

## 必須コマンド

### 開発

```bash
pnpm storybook              # Storybookの開発サーバーをポート6006で起動
pnpm build-storybook        # 本番用の静的Storybookをビルド
```

### コード品質

```bash
pnpm biome check            # TypeScript/JavaScriptファイルのLintとフォーマット
pnpm biome check --write    # Lintとフォーマットの問題を修正
pnpm remark .               # Markdownファイルのチェック
pnpm secretlint             # 露出したシークレットをチェック
```

### パッケージ管理

このプロジェクトは、ワークスペースカタログを使用したpnpmを使用しています（カタログモード：strict）。すべての依存関係は`pnpm-workspace.yaml`のcatalogセクションで定義されています。依存関係を追加する場合は、まずカタログに追加してから、package.jsonで`catalog:`を参照してください。

## アーキテクチャ

### コンポーネント構造

各コンポーネントは一貫したパターンに従います：

```text
src/components/[ComponentName]/
  ├── [ComponentName].html       # 静的HTMLテンプレート
  └── [ComponentName].stories.ts # Storybookストーリー（TypeScript）
```

コンポーネントはJavaScriptを使用しない純粋なHTMLテンプレートです。インタラクティブな機能はすべてCSS（ホバー状態、トランジションなど）で処理されます。

### スタイリングアーキテクチャ

CSSは構造化された組織に従います：

```text
src/styles/
  ├── base/
  │   ├── _variables.css   # Figmaからのデザイントークン
  │   ├── _reset.css       # CSSリセット
  │   └── _typography.css  # タイポグラフィのデフォルト
  ├── components/          # コンポーネント固有のスタイル
  ├── layouts/             # レイアウトユーティリティ
  └── main.css             # メインエントリーポイント
```

### デザイントークン

すべてのデザイントークンは、CSSカスタムプロパティとして`src/styles/base/_variables.css`に集約されています：

- 色：`--color-green`、`--color-dark`、`--color-grey`、`--color-black`、`--color-white`
- タイポグラフィ：フォントファミリー（Space Grotesk）、ウェイト、サイズ
- スペーシング：`--spacing-xs`から`--spacing-2xl`
- ボーダー半径：`--radius-sm`、`--radius-md`、`--radius-lg`
- コンテナ：`--container-max-width`（1240px）、`--container-padding`（100px）

### Storybookストーリーパターン

ストーリーはCSF 3.0フォーマットを使用してTypeScriptで記述されます。各ストーリーファイル：

1. コンポーネント引数のインターフェースを定義
2. HTML要素を返すファクトリー関数を作成
3. autodocs有効化されたメタ設定をエクスポート
4. 名前付きエクスポートとして個別のストーリーをエクスポート
5. 通常、すべてのバリアントをまとめて表示する「AllVariants」ストーリーを含む

パターン例：

```typescript
interface ComponentArgs {
  // コンポーネントのプロパティ
}

const createComponent = (args: ComponentArgs): HTMLElement => {
  // DOM要素を作成して返す
}

const meta: Meta<ComponentArgs> = {
  title: 'Components/ComponentName',
  tags: ['autodocs'],
  render: (args) => createComponent(args),
}
```

### Storybook設定

`.storybook/main.ts`で以下のアドオンと共に設定されています：

- `@storybook/addon-a11y` - アクセシビリティテスト
- `@storybook/addon-docs` - 自動生成ドキュメント
- `@storybook/addon-designs` - Figmaデザイン統合
- `@chromatic-com/storybook` - ビジュアルリグレッションテスト

## 開発ワークフロー

### 新しいコンポーネントの追加

1. `src/components/[ComponentName]/`の下にコンポーネントディレクトリを作成
2. HTMLテンプレートファイルを作成
3. `src/styles/components/[component-name].css`に対応するCSSを追加
4. `src/styles/main.css`にCSSをインポート
5. 確立されたパターンに従ってStorybookストーリーファイルを作成
6. すべてのスタイリング値には`_variables.css`からデザイントークンを使用

### CSS命名規則

- BEM風の命名を使用：`.component`、`.component--variant`、`.component__element`
- コンポーネントクラス名はディレクトリ名と小文字で一致させる
- 例：`Button`コンポーネントは`.button`、`.button--primary`、`.button--secondary`を使用

### TypeScript設定

- ターゲット：ES2020
- モジュール解決：bundlerモード
- 完全なLintルールでStrictモード有効
- No emit（ストーリーの型チェックにのみ使用）

## コード品質ツール

### Biome

JavaScript/TypeScriptのLintとフォーマットに使用：

- クォートスタイル：ダブルクォート
- インデントスタイル：スペース
- 自動インポート整理有効
- 推奨ルール有効

### Remark

Markdownのチェックに使用：

- GitHub Flavored Markdown（GFM）をサポート
- 目次を自動生成
- YAMLフロントマターをサポート
- `.remarkrc`で設定

### Commitlint

Conventional Commitsフォーマットを使用（`@commitlint/config-conventional`）。

## 重要な注意事項

- これは静的HTML/CSSライブラリです - JavaScriptランタイム依存関係の追加を避けてください
- すべてのビジュアルスタイリングはCSSのみで実現可能である必要があります
- ストーリーはStorybook用にプログラム的にDOM要素を作成しますが、実際のコンポーネントファイルは静的HTMLです
- デザイントークンは信頼できる唯一の情報源です - 色、スペーシング、タイポグラフィの値をハードコードしないでください
- プロジェクトはpnpmカタログモードを厳密に使用しています - すべての依存関係はワークスペースカタログを経由する必要があります
