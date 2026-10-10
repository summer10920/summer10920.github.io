---
title: "Tailwind：utilities、RWD、深色模式"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
  - TailwindCSS
date: 2026-08-30 10:03:00
---

![](assets/images/banner/html5.png)

從這篇起，瀏覽器不能直接吃你寫的 class，要先編譯。你會用 pnpm 建一個 Vite 專案、接上 Tailwind CSS v4，再把洛奇旅行的頁首、主視覺、行程卡、詳情與頁尾改成 utility class。深度停在看得懂、改得動。

<!-- more -->

# 取得素材

HTML 與 CSS 檔可以直接開。Tailwind 的 utility 要編成一般 CSS，Vite 則提供本機伺服器與存檔更新。這些工具是 JavaScript 程式，所以要裝 Node.js LTS。這堂課不是後端課，不要建 Express 或 Nest。

## 為什麼要 Node

{% mermaid graph LR %}
src["你寫的 html／class"] --> vite["Vite 開發伺服器"]
vite --> browser["瀏覽器"]
{% endmermaid %}

終端機確認 `node -v` 與 `pnpm -v`。還沒有 pnpm 時，用 Corepack：`corepack enable`，再開一個新終端機。套件管理只用 pnpm。

## 建 Vite 專案

在 `student/` 底下一次建好，專案資料夾名叫 `tailwind`。終端機印出的 Local URL 用瀏覽器開，改檔存檔應自動更新。

```bash
pnpm create vite@latest tailwind --template vanilla
cd tailwind
pnpm install
```

| 檔案 | 是什麼 | 要不要 commit |
| --- | --- | --- |
| `package.json` | 名稱、`scripts`、依賴清單 | 要 |
| `pnpm-lock.yaml` | 鎖版本，全班才裝到同一組 | 要 |
| `node_modules/` | 下載下來的套件 | 不要 |
| `index.html` | 入口頁 | 要 |
| `src/` | JS 與 CSS | 要 |

`pnpm dev` 跑的是 `scripts.dev` 那一句，這裡是 `vite`。刪掉 `node_modules` 再 `pnpm install` 就能裝回來。`.gitignore` 要有 `node_modules`。

第一次建這個專案時，在專案根目錄放排版設定。全班同一套：2 空格、要分號、雙引號。排版交給 Prettier，不要把 `prettier.semi` 這類鍵寫進個人的使用者設定。

```json .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
}
```

`practice/` 不放這份設定，也不放 ESLint。HTML 練習繼續用 HTMLHint。

## 接上 Tailwind v4

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

```js vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({ plugins: [tailwindcss()] });
```

```css src/style.css
@import "tailwindcss";
```

Vite 的 `src/main.js` 要有 `import "./style.css"`。class 沒生效時，依序查：有沒有 import、改的是不是這份 CSS、開發伺服器有沒有重開。v4 不必先寫 `tailwind.config.js` 才會動。不要裝 Bootstrap 或其他 UI 套件。

# 認識 utility

手寫 CSS 是先選元素再寫屬性。Tailwind 是在 HTML 上貼已經取好名的屬性碎片，所以 class 旁邊就看得到視覺意圖。檢查時要把 class 翻譯回 CSS，不是背一整張表。

## 常用 class

每類先記幾個，用在標題、間距與卡片上。

| class | 翻回 CSS |
| --- | --- |
| `p-4` `mt-2` `gap-4` | padding、margin、gap |
| `text-3xl` `font-bold` | 字級與字重 |
| `bg-teal-800` `text-white` | 背景色與文字色 |
| `flex` `grid` `grid-cols-1` `md:grid-cols-3` | Flex 或 Grid；夠寬才三欄 |
| `rounded-xl` `shadow` `max-w-6xl` `mx-auto` | 圓角、陰影、版心、水平置中 |
| `hidden` `md:flex` | `display: none`；夠寬才 flex |

`md:` 大約是 768px，對應 `@media (min-width: 768px)`。沒有前綴的 class 先套在窄螢幕。任意值如 `mt-[13px]` 能用，先走量表。

## 深色模式

`dark:` 在系統偏好深色時才套上，對應 `@media (prefers-color-scheme: dark)`。亮色寫一般 class，深色寫 `dark:`。課堂先跟系統走，用裝置模式或作業系統切換來檢查，不必自做開關。

```html
<section class="bg-white text-teal-950 dark:bg-teal-950 dark:text-teal-50">
```

# 改寫旅行社區塊

同一份 `index.html` 由上到下排頁首、主視覺、行程卡、一則詳情、頁尾。正式站的四條路由留到 React。id 要留下，後面的 JavaScript 會找這些名字。

## 可開合導覽

手機顯示「選單」，桌機改成橫向連結。用一顆 checkbox 當開關，不要複製兩套 `nav`。`id="nav-toggle"` 放在 `header#site-header` 裡。

```html index.html
<header id="site-header" class="relative bg-teal-800 text-white dark:bg-teal-950">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
    <a href="#" class="text-lg font-bold">洛奇旅行</a>
    <input id="nav-toggle" type="checkbox" class="peer hidden" />
    <label for="nav-toggle" class="cursor-pointer rounded border border-white/40 px-3 py-1 md:hidden">選單</label>
    <nav class="absolute left-0 right-0 top-14 hidden flex-col gap-3 bg-teal-800 px-4 py-4 peer-checked:flex md:static md:flex md:flex-row md:gap-6 md:bg-transparent md:p-0">
      <a href="#" class="hover:underline">首頁</a>
      <a href="#" class="hover:underline">行程</a>
      <a href="#" class="hover:underline">報名</a>
    </nav>
  </div>
</header>
```

390px 看得到「選單」，勾選後 `nav` 直向打開。1280px 是橫向連結，按鈕被 `md:hidden` 藏起來。F12 看 `#nav-toggle` 的 `checked`。

## 主視覺、卡片、詳情、頁尾

版心用 `max-w-6xl mx-auto px-4`。圖片用 `w-full h-40 object-cover`，避免把頁面撐出橫向捲軸。詳情先靜態寫死一團，連結帶 `tourId`，這一階段不要送出表單。

```html index.html
<section class="bg-teal-800 text-white dark:bg-teal-950">
  <div class="mx-auto max-w-6xl px-4 py-16">
    <h1 class="text-4xl font-bold">洛奇旅行</h1>
    <p class="mt-4 max-w-xl">城市散步、山海與紅葉，挑一條適合的行程。</p>
    <a class="mt-6 inline-block rounded-lg bg-white px-4 py-2 font-medium text-teal-900" href="#tour-list">看行程</a>
  </div>
</section>
<div id="tour-list" class="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-3">
  <article class="overflow-hidden rounded-xl bg-white shadow dark:bg-teal-900">
    <img class="h-40 w-full object-cover" src="/img/tours/taipei.svg" alt="台北城市漫遊" />
    <div class="p-4">
      <h2 class="font-semibold">台北城市漫遊</h2>
      <p class="text-sm">台北 · 3 天</p>
    </div>
  </article>
</div>
<article class="mx-auto max-w-6xl px-4 py-8">
  <h1 class="text-3xl font-bold">台北城市漫遊</h1>
  <p class="mt-2">台北 · 3 天 · NT$12800</p>
  <a class="mt-4 inline-block underline" href="?tourId=1">去報名</a>
</article>
<footer class="bg-teal-950 text-teal-100">
  <div class="mx-auto max-w-6xl px-4 py-8 text-sm">洛奇旅行</div>
</footer>
```

卡片先貼一張當模板，作業再補成三張。圖片路徑用專案裡的檔，放在 `public/img/tours/`，不要只靠會失效的外網網址。

# 作業：頁首、主視覺、卡片、詳情、頁尾

這五塊都是期末站的元件模板：`SiteHeader`、`Hero`、`TourCard`（放在 `#tour-list`）、`TourDetail`、`SiteFooter`。交 `student/tailwind/` 的頁面，並能指出每一塊最後會放在哪一頁。

{% note success %}
**跟著做：**
1. 保留 `id="site-header"` 與 `id="nav-toggle"`。手機有選單按鈕，`md` 以上橫向連結。
2. `#tour-list` 裡至少三張卡：預設一欄，`md:` 三欄。主視覺、一則靜態詳情、頁尾都要在。
3. 亮色與 `dark:` 各寫一組背景。詳情只連到 `?tourId=1`，不要在這一頁送出表單。
{% endnote %}

{% note warning %}
**注意事項**
不要新增 UI 套件，不要做後台，不要把整頁寬度寫死成 1920px。報名表的欄位在 HTML 那篇已經做過，這篇先把版面區塊排好。
{% endnote %}

# 本篇重點回顧

Node 與 pnpm 用來跑 Vite、編譯 Tailwind。utility class 就是 CSS 的屬性換一種寫法：沒有前綴給窄螢幕，`md:` 給夠寬的畫面，`dark:` 跟系統深色。頁首用同一組連結做開合，行程卡、主視覺、詳情與頁尾都留在這份頁面上，id 不要改名。
