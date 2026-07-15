# pic ディレクトリ運用ルール

このディレクトリは、Webサイトで使用する画像を一元管理するための場所です。

## 命名規則

- 小文字の英数字とハイフンを使用する
- メーカー名、製品名、用途が分かる名前にする
- 例：`unitree-g1d-hero.webp`
- 例：`agibot-g2-product.svg`
- 例：`keio-case-process.webp`

## 推奨形式

- 写真：WebP
- 図版：SVG
- 透過画像：WebP または PNG
- OGP画像：1200 × 630px

## 管理方針

- 外部サイトの画像URLへ直接依存しない
- 使用許諾を確認した画像だけを配置する
- 画像には用途に合った `alt` を設定する
- 同じ画像を複数の場所へコピーしない
- 更新時はファイル名を変えず、参照先を安定させる

## 今後の分類

```text
pic/
├─ brand/
├─ products/
├─ manufacturers/
├─ cases/
├─ guides/
└─ ogp/
```
