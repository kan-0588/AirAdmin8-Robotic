# AirAdmin8 Robotics V2 移行計画

## 目的

既存サイトの機能を維持しながら、CSS競合、JS肥大化、画像管理の分散、SEO情報の動的依存を解消します。

## 完了条件

- 共通CSSをFoundation / Layout / Components / Responsiveへ分離
- ページ固有CSSをページ単位へ分離
- 共通JavaScriptを役割単位へ分離
- 主要SEO情報をHTMLへ静的出力
- 画像をpic配下へ集約し、外部直リンクを廃止
- PC / Tablet / Mobileで表示確認
- 内部リンク、外部リンク、フォーム、計測、構造化データを回帰確認

## 画像ディレクトリ

```text
pic/
├─ hero/
├─ products/
├─ manufacturers/
├─ cases/
├─ logos/
├─ icons/
└─ ogp/
```

## CSS構成

```text
assets/css/v2/
├─ foundation.css
├─ layout.css
├─ components.css
├─ responsive.css
└─ pages/
```

## JavaScript構成

```text
scripts/
├─ navigation.js
├─ page-enhancements.js
├─ contact-form.js
├─ analytics.js
├─ filters.js
└─ search.js
```

## 移行順序

1. 共通基盤
2. Home
3. Products / Manufacturers / Resources
4. Solutions / Guides
5. Cases / Support / Contact
6. SEO静的化
7. 画像移行
8. 回帰テスト

## 変更禁止事項

- 既存URLを予告なく削除しない
- 事実確認前の価格、性能、代理店表現を追加しない
- 大学・顧客ロゴを許諾なく掲載しない
- 検索エンジンだけに見える隠しテキストを追加しない
