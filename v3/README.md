# AirAdmin8 Robotics V3

既存公開サイトを上書きせずに開発するための隔離環境です。

## ブランチ

- `v3-clean-architecture`

## ディレクトリ

- `v3/index.html`：新トップページ
- `v3/assets/css/site.css`：V3専用スタイル
- `v3/assets/js/app.js`：V3専用JavaScript
- `v3/data/products.json`：製品データ

## 原則

1. 既存の `main` 公開サイトは変更しない
2. 旧CSS・旧JavaScriptを読み込まない
3. V3は独立したHTML、CSS、JavaScript、データで構築する
4. モバイル表示を先に確認する
5. 製品・用途・導入支援・事例・資料・相談の順で設計する
6. 正式公開前は `noindex,nofollow` を維持する

## 公開手順

V3の確認と承認が完了した後、別URLまたは正式ドメインへ配置します。既存サイトへの切替は最終承認後に行います。
