---
title: "Tailwind（二）：v4 編譯鏈、utility class"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
  - TailwindCSS
date: 2026-08-30 10:04:00
---

![](assets/images/banner/html5.png)

在上一章的 Vite 專案接上 Tailwind v4。Utility class 就是 CSS 篇章換一種寫法，不是另一套魔法。不必先把站內公式長文讀完；課堂用得到的 class 這一章會帶。v4 不必先寫 `tailwind.config.js` 才會動。

<!-- more -->

# Utility-first 是什麼
手寫 CSS 是「先選元素再寫屬性」。Tailwind 是「在 HTML 上貼預先取名的屬性碎片」。好處是結構旁邊就看得到視覺意圖；風險是 class 一長串你看不懂——檢查時要你**翻譯**，不是背公式表。

# 安裝（Vite + v4）

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

```js vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [tailwindcss()] });
```

```css style.css
@import "tailwindcss";
```

Vite 範本通常在 `main.js` 已經 `import "./style.css"`。class 沒生效時，依序查：有沒有 import、改錯檔、dev server 有沒有重開。

{% note warning %}
**注意事項**
教學資料有時會寫成舊版的 PostCSS 三件套、或說沒有 `tailwind.config.js` 就不能用。v4 可以有設定檔，但不是活下去的必要條件。也不要順便裝 Bootstrap、DaisyUI。
{% endnote %}

# 課堂會用的 class
每類先記 2–3 個，改畫面上的標題與按鈕：

- 間距：`p-4` `mt-2` `gap-4`（padding／margin／flex gap）
- 文字：`text-xl` `font-bold` `text-center`
- 顏色：`bg-teal-800` `text-white`
- 排版：`flex` `flex-wrap` `grid` `grid-cols-1` `md:grid-cols-3`
- 盒子：`rounded-xl` `shadow` `border`
- 寬度：`w-full` `max-w-6xl` `mx-auto`

任意值 `mt-[13px]` 能用，但先走量表，避免魔術數字到處飛。

`md:flex` 在手機（不夠 `md` 寬）不會套 flex，對應 CSS 篇章的 `min-width` media。

# 一次改好的卡片區
安裝跑起來後，把入口頁的 `body` 一次換成下面。用 F12 點卡片，看 class 清單；切 390／1280 看 `md:grid-cols-3` 是否出現。

```html index.html
<body class="bg-teal-50 text-teal-950">
  <main class="mx-auto max-w-6xl px-4 py-10">
    <h1 class="text-3xl font-bold">三張卡片</h1>
    <p class="mt-2 text-teal-800">flex／gap／grid 就是 CSS 篇章的那些字。</p>
    <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <article class="rounded-xl bg-white p-4 shadow">台北 · 3 天</article>
      <article class="rounded-xl bg-white p-4 shadow">京都 · 5 天</article>
      <article class="rounded-xl bg-white p-4 shadow">濟州 · 4 天</article>
    </div>
    <a class="mt-8 inline-block rounded-lg bg-teal-800 px-4 py-2 font-medium text-white" href="#">看行程</a>
  </main>
</body>
```

| class | 翻回 CSS 觀念 |
| --- | --- |
| `p-4` `mt-2` `gap-4` | padding／margin／flex 或 grid 的 gap |
| `text-3xl` `font-bold` | 字級與字重 |
| `bg-teal-800` `text-white` | 背景色與文字色 |
| `grid` `grid-cols-1` `md:grid-cols-3` | Grid；夠寬才三欄 |
| `rounded-xl` `shadow` | 圓角與陰影 |
| `max-w-6xl` `mx-auto` | 版心寬度與水平置中 |

{% note primary %}
**練習規格**

這是 Vite + Tailwind **v4**。請只改 HTML class 與既有 style.css。
使用已經接好的 @tailwindcss/vite，不要把 tailwind.config.js 當必要條件。
三張卡片：手機一欄、md 以上三欄。不要加入其他 UI 套件。請把關鍵 class 翻譯成普通 CSS 觀念。
{% endnote %}

# 本章契約
沿用 Node／Vite 那一章的專案。練習要用編譯鏈，不要把 CDN 版 Tailwind 當正式做法。禁止新增 UI kit。

{% note warning %}
**練習對照（課堂會講解答）**
- 有沒有出現 Bootstrap 或其他 UI 套件？
- `md:` 在 390px 有沒有正確消失？
- 能不能翻譯三個 class 回 CSS 觀念？
- 有沒有亂加依賴？
{% endnote %}

# 本篇重點回顧
utility 卡片列能跑。這一章不必做漢堡選單。

接著專講 RWD，並對齊契約 `#site-header`、`#nav-toggle`，為看手機截圖切版做準備。
