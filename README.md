# yamabuki.work

第9回 新宿山吹高校情報科発表会の特設サイト。
<https://yamabuki.work/>

## 技術構成

- React 19 + TanStack Start(SSR / プリレンダー)
- Tailwind CSS 4
- Cloudflare Workers(wrangler でデプロイ)
- 状態管理: zustand

## 開発

```bash
pnpm install
pnpm run dev      # http://localhost:3000
pnpm run build    # ビルド + 全ページプリレンダー
pnpm run deploy   # ビルドして Cloudflare Workers にデプロイ
```

## ブランチ運用

- **main がプロダクションブランチ**。デプロイは main から `pnpm run deploy` で行う。
- 旧 `migrate` ブランチは main に統合済み(2026-07)。

## メモ

- 背景画像は `src/assets/bg-image-blur.webp`(事前ブラー済み)。差し替える場合は
  元画像を sharp で `resize(1440).blur(10)` して再生成する。
- ポスター画像は `public/images/*.webp`(最大幅1200px)。追加時も webp 推奨。
- 画像を追加・差し替えたら `pnpm run gen:images` を実行してサイズマニフェスト
  (`src/constants/imageDimensions.ts`)を更新する(初回表示時のレイアウトずれ防止用)。
