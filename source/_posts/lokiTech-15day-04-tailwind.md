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

![Tailwind CSS](assets/images/banner/tailwind.png)

Tailwind CSS 把常用的 CSS 宣告做成一粒一粒的 class，稱為 utility（工具類）。名字多半是「屬性－值」：`bg-teal-700` 是背景色，`p-4` 是內距。你把這些 class 寫在標籤上，Vite 在開發時編成瀏覽器看得懂的 CSS。

<!-- more -->

刻度、色票與前綴總表在 {% post_link lokiTech-15day-05-tailwind-cheatsheet TailwindCSS v4.1 公式表 %}。這一篇只走觀念，每個題目看一到兩個範例，再自己改一處。預覽以 Chrome 為準。按 <kbd>F12</kbd> 看 **Elements → Styles**，核對的是編成之後的 CSS。

| 大主題 | 你會用到的觀念 |
| --- | --- |
| 認識 Tailwind | utility 命名、掃描、按鈕與卡片 |
| 前綴 | `sm:`～`2xl:`、`hover:`、`dark:` |
| `@theme` | 品牌色、`--spacing-*` |
| 寫進樣式表 | `@apply`、`@layer`、`@utility`、`@custom-variant`、任意值、`group` / `peer` |
| 選讀 | 容器查詢、Preflight |

{% note warning %}
**注意事項**
不要裝 Bootstrap，也不要另寫 `tailwind.config.js`。v4 的主題寫在 CSS 的 `@theme`。
{% endnote %}

# 認識 Tailwind

一個 utility 只做一件事。`p-4` 只管內距，`rounded-xl` 只管圓角，`bg-teal-700` 只管背景色。傳統寫法把這些收進 `.trip-card`，改外觀要先找到選擇器。Utility 把設計系統裡量好的間距、顏色、字級做成固定詞彙，組合發生在標籤上。見 [用 utility 寫樣式](https://tailwindcss.com/docs/styling-with-utility-classes)。

讀 class 時先切最後一段。`bg-teal-700` 的屬性是 `bg`（`background-color`），值是色族 `teal` 加色階 `700`。數字越小越淺，`50` 常用來當底，`700` 以上常用來當字或實心按鈕。`text-stone-600` 的 `text` 接色名，所以是 `color`；`text-2xl` 的 `text` 接字級，所以是 `font-size`。`p-4` 的 `4` 乘上預設一級 `--spacing`（`0.25rem`），四邊內距是 `1rem`。`px-4` 只有左右，`py-2` 只有上下。斜線是透明度：`bg-teal-700/50` 是同一顆色的 50%。色階與 `text-` 的兩種意思見 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)、[font-size](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#font-size)、[padding](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#padding)。

兩個 utility 若改到同一個 CSS 屬性，誰勝出看編成後樣式表裡的順序。`p-4 p-8` 這種重複不要留。

## 在專案裡編譯

HTML 檔可以直接用瀏覽器開。Tailwind 的 class 要先編成一般 CSS，瀏覽器才知道 `p-4` 是 `padding: 1rem`。這個專案用 Vite 當開發伺服器與打包工具，插件是 `@tailwindcss/vite`，入口 CSS 以 `@import "tailwindcss"` 開頭。見 [安裝 Tailwind（Vite）](https://tailwindcss.com/docs/installation/using-vite)。

套件管理用 pnpm，Node.js 用 24。在專案目錄執行 `pnpm install`，再 `pnpm dev`，用終端機印出的 Local 網址打開。`pnpm build` 產出 `dist/`。直接用檔案協定開 HTML，utility 不會生效。

```js 02-tailwind/src/main.js
import "./style.css";
```

多數頁面在 `body` 結尾載入它。`type="module"` 讓 Vite 處理裡面的 `import`。路徑以 `/` 開頭，表示專案根目錄。

```html
<script type="module" src="/src/main.js"></script>
```

排版用專案裡的 Prettier：要分號、雙引號、2 空格。這一階段不放 ESLint。VS Code 的 Tailwind CSS IntelliSense 會在你打 `bg-` 時列出色族；候補仍要能翻回 CSS。

```json 02-tailwind/.prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
}
```

## 選讀：瀏覽器裡的 Play CDN

有些舊教學讓你在 `head` 貼 `cdn.tailwindcss.com` 的 script。那段 script 在瀏覽器裡臨時編譯，正式站的體積不好控，也沒有這個專案的 `@theme`。課堂走 Vite。看到教學要你寫 `tailwind.config = { theme: { extend: ... } }`，把它當成舊路徑。

## 只輸出用到的

編譯器掃描的是原始碼裡的完整字串，不是瀏覽器執行之後的 DOM。檔案裡出現 `bg-teal-700`，這條規則才會產生。`bg-${color}-700` 接起來的字串，掃描器看不到最後的 class 名字。v4 會自己找模板檔，不用再寫以前的 `content` 陣列。

第一段的背景 class 寫死在標籤上，所以是青綠。第二段用 script 把 `rose` 接上去，原始碼裡沒有 `bg-rose-700` 這六個字，背景就不會變。

```html 02-tailwind/pages/04-scan.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>掃描與動態 class</title>
  </head>
  <body class="space-y-4 bg-stone-50 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">完整字串才會被掃到</h1>
    <p class="max-w-prose rounded-lg border border-teal-700 bg-teal-700 p-4 text-white">
      這句的 class 在檔案裡是完整的 bg-teal-700，背景是青綠。
    </p>
    <p id="joined" class="max-w-prose rounded-lg border border-stone-300 p-4">
      這句的背景 class 是程式把字接起來的。框還在，背景不會變成另一個顏色。
    </p>
    <script>
      const family = "rose";
      document.querySelector("#joined").classList.add(`bg-${family}-700`);
    </script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`bg-teal-700` 這一個 class：`bg` 是背景色，`teal` 是色族，`700` 是偏深的那一階。`border-teal-700` 把同一顆色塗在框上。`text-white` 是白字。

{% note success %}
**換你試試：**
第二段不要用 script 接字。把背景改成檔案裡就寫好的玫瑰色，色名在 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)。
{% endnote %}

<details>
<summary>參考答案</summary>

拿掉 `<script>` 裡的 `classList.add`。第二段的 class 改成含有完整字串 `bg-rose-700`，字色用 `text-white`。

</details>

## 按鈕

實心用深底白字，是這一頁的主要動作。線框是次要動作。文字按鈕滑過才加底線。連結去別的網址用 `<a>`，在這一頁做事用 `<button type="button">`。停用時加 HTML 的 `disabled`，顏色改成 stone，游標用 `cursor-not-allowed`。

```html 02-tailwind/pages/11-button.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>按鈕</title>
  </head>
  <body class="space-y-6 bg-stone-50 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">三種按鈕</h1>
    <div class="flex flex-wrap items-center gap-3">
      <a
        class="inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
        href="#tours"
      >
        實心連結
      </a>
      <button
        type="button"
        class="rounded-lg border border-teal-700 bg-white px-4 py-2 font-medium text-teal-800 hover:bg-teal-50"
      >
        線框按鈕
      </button>
      <button type="button" class="rounded-lg px-4 py-2 font-medium text-teal-800 underline-offset-4 hover:underline">
        文字按鈕
      </button>
      <button type="button" class="cursor-not-allowed rounded-lg bg-stone-300 px-4 py-2 font-medium text-stone-500" disabled>
        已額滿
      </button>
    </div>
    <p class="max-w-prose text-sm text-stone-600">連結用 a，本頁動作用 button。停用的按鈕加 disabled，顏色改灰。</p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

外層 `flex flex-wrap items-center gap-3`：橫排、放不下就換行、垂直置中、彼此相距 `0.75rem`。實心連結從左讀到右：

- `inline-flex` `items-center`：本身是橫向 flex，寬度依內容縮，文字垂直置中。
- `rounded-lg`：圓角 `0.5rem`。
- `bg-teal-700`：不透明的青綠底。
- `px-4` `py-2`：左右 `1rem`、上下 `0.5rem`。
- `font-medium` `text-white`：字重 500、白字。
- `hover:bg-teal-800`：指標移上去時，背景改成深一階。
- `focus-visible:outline-2` `focus-visible:outline-offset-2` `focus-visible:outline-teal-900`：鍵盤聚焦時畫 2px 青綠外框，並離邊 2px。

{% note success %}
**換你試試：**
實心按鈕的圓角加大一到兩階。刻度在 [border-radius](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#border-radius)。
{% endnote %}

<details>
<summary>參考答案</summary>

`rounded-lg`（0.5rem）改成 `rounded-2xl`（1rem）。再大一階是 `rounded-3xl`（1.5rem）。

</details>

## 卡片

卡片把圖、地點、摘要和價錢收在同一個 `article`。外層 `overflow-hidden` 配圓角，圖片的角才會跟著切齊。`object-cover` 把不同比例的照片裁成同一高度。

```html 02-tailwind/pages/12-card.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>卡片</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="mb-6 text-2xl font-bold">行程卡</h1>
    <article class="max-w-sm overflow-hidden rounded-2xl bg-white shadow-md">
      <img class="h-44 w-full object-cover" src="https://picsum.photos/id/1018/800/500" alt="夜市燈籠" />
      <div class="space-y-2 p-5">
        <p class="text-xs font-medium tracking-wide text-teal-700">台北 · 3 天</p>
        <h2 class="text-xl font-semibold">城市漫遊</h2>
        <p class="text-sm leading-6 text-stone-600">迪化街、河岸與一間老咖啡館。圖片用 object-cover 裁成同樣高度。</p>
        <p class="text-lg font-semibold text-teal-900">NT$12,800</p>
        <a class="inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white" href="#detail">看詳情</a>
      </div>
    </article>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`article` 上這一串：

- `max-w-sm`：最大寬度 24rem。
- `overflow-hidden`：超出圓角的圖片被裁掉。
- `rounded-2xl`：圓角 1rem。
- `bg-white` `shadow-md`：白底、中等陰影。

圖片的 `h-44 w-full object-cover`：高 11rem、寬 100%、裁切後填滿。內層 `space-y-2 p-5`：子元素上下相距 0.5rem，四邊內距 1.25rem。眉題 `text-xs` 是較小的字級，`tracking-wide` 把字距拉開，適合短標籤。

{% note success %}
**換你試試：**
陰影再深一階。對照在 [box-shadow](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#box-shadow)。
{% endnote %}

<details>
<summary>參考答案</summary>

`shadow-md` 改成 `shadow-lg`。再浮一點用 `shadow-xl`。

</details>

# 前綴

冒號左邊是條件，右邊才是 utility。`md:hover:bg-teal-800` 讀成：視窗到達 `md`，而且指標移上來，背景才改成 `teal-800`。建議斷點在前、狀態在後、屬性在最後。同一專案固定這個順序。

沒有前綴的 class 在所有寬度都生效。`sm:`、`md:`、`lg:`、`xl:`、`2xl:` 是手機優先的 `min-width`：夠寬才加上去，更寬時仍然成立。門檻見 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。`<meta name="viewport" content="width=device-width, initial-scale=1.0">` 要留在 `head`，手機才不會把頁面縮成桌面寬度的一小條。

## 斷點前綴

窄畫面先讓字讀得完。欄數從一欄往上加：`grid-cols-1` 寫在前面，`sm:grid-cols-2`、`lg:grid-cols-3` 在較寬時覆蓋欄數。Flex 管一列的對齊，Grid 管會換欄的卡片牆。單格怎麼寫見 [常見組合](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#常見組合) 與 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。

## Flex 與 Grid

上半是頁首那種一列：品牌靠左、連結靠右。下半預設一欄，`sm` 兩欄，`lg` 三欄。

```html 02-tailwind/pages/16-layout.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flex 與 Grid</title>
  </head>
  <body class="space-y-10 bg-stone-50 p-6 text-stone-900">
    <section>
      <h1 class="text-2xl font-bold">Flex：一列排開</h1>
      <div class="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4">
        <p class="font-semibold">洛奇旅行</p>
        <div class="flex gap-4 text-sm text-teal-800">
          <a href="#a">行程</a>
          <a href="#b">關於</a>
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-2xl font-bold">Grid：卡片牆</h2>
      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article class="rounded-xl bg-white p-4 shadow-sm">
          <h3 class="font-semibold">台北</h3>
          <p class="text-sm text-stone-600">3 天</p>
        </article>
        <article class="rounded-xl bg-white p-4 shadow-sm">
          <h3 class="font-semibold">花蓮</h3>
          <p class="text-sm text-stone-600">2 天</p>
        </article>
        <article class="rounded-xl bg-white p-4 shadow-sm">
          <h3 class="font-semibold">台南</h3>
          <p class="text-sm text-stone-600">4 天</p>
        </article>
      </div>
    </section>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

頁首那一列：`flex` 打開橫排，`flex-wrap` 放不下就換行，`items-center` 垂直置中，`justify-between` 左右貼邊，`gap-3` 是項目之間的縫。卡片牆：`grid` 打開格線，`grid-cols-1` 在所有寬度先是一欄，`sm:grid-cols-2` 從 40rem 起改兩欄，`lg:grid-cols-3` 從 64rem 起改三欄。`gap-4` 同時管行與列的縫。

{% note success %}
**換你試試：**
手機維持一欄，`md` 才兩欄，`xl` 才三欄。斷點在 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)，欄數在 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。
{% endnote %}

<details>
<summary>參考答案</summary>

卡片牆的 class 改成 `mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3`。

</details>

## 導覽列

窄螢幕用一顆核取方塊當開關，只做一套 `nav`。`peer` 寫在方塊上，`peer-checked:` 寫在它後面的兄弟上。方塊用 `sr-only` 移出視覺，標籤的 `for` 仍對得到。寬度到達 `md` 時，導覽回到橫排，選單標籤隱藏。

```html 02-tailwind/pages/13-nav.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>導覽列</title>
  </head>
  <body class="bg-stone-50 text-stone-900">
    <header class="relative bg-teal-800 text-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a class="text-lg font-bold" href="/">洛奇旅行</a>
        <input id="nav-toggle" class="peer sr-only" type="checkbox" />
        <label class="cursor-pointer rounded border border-white/40 px-3 py-1 md:hidden" for="nav-toggle">選單</label>
        <nav
          class="absolute left-0 right-0 top-full hidden flex-col gap-3 bg-teal-800 px-4 py-4 peer-checked:flex md:static md:flex md:flex-row md:gap-6 md:bg-transparent md:p-0"
        >
          <a class="hover:underline" href="#home">首頁</a>
          <a class="hover:underline" href="#tours">行程</a>
          <a class="hover:underline" href="#about">關於</a>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-8">
      <h1 class="text-2xl font-bold">把視窗拉窄再拉寬</h1>
      <p class="mt-3 max-w-prose text-stone-600">窄的時候按「選單」。寬到 md 之後，連結回到橫排，按鈕隱藏。</p>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`nav` 這一串分成窄螢幕與 `md` 以後：

- `absolute left-0 right-0 top-full`：貼在頁首下緣，左右拉滿。
- `hidden flex-col gap-3`：預設不顯示；一旦變成 flex，就是直向，連結相距 0.75rem。
- `peer-checked:flex`：前面的方塊被勾選時才顯示。
- `md:static md:flex md:flex-row`：48rem 以上回到文件流、一直顯示、改成橫排。
- `md:bg-transparent md:p-0 md:gap-6`：清掉手機選單的底色與內距，連結改隔 1.5rem。

「選單」標籤的 `md:hidden` 是到了 `md` 就隱藏。`border-white/40` 是白框 40% 不透明。

{% note success %}
**換你試試：**
橫排改到 `lg` 才出現，比 `md` 再寬一階。對照 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。
{% endnote %}

<details>
<summary>參考答案</summary>

標籤的 `md:hidden` 改成 `lg:hidden`。`nav` 上每一個 `md:` 改成 `lg:`：`lg:static lg:flex lg:flex-row lg:gap-6 lg:bg-transparent lg:p-0`。`peer-checked:flex` 維持不變。

</details>

## 狀態前綴

`hover:` 在指標移上來時套用。`focus-visible:` 在鍵盤聚焦時套用。`disabled:` 在停用時套用。這些前綴可以接在斷點後面。觸控螢幕沒有可靠的 hover，重要資訊不要只靠滑過才出現。狀態名稱見 [常用變體](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#常用變體)。

按鈕那一顆實心連結已經寫了 `hover:bg-teal-800`。滑過時只改背景，字仍是 `text-white`。`focus-visible:` 那三個 class 一起才有外框的寬度、偏移與顏色。

{% note success %}
**換你試試：**
滑過時的背景改成更深的一階，或換成另一個色族。背景色在 [background-color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#background-color)。
{% endnote %}

<details>
<summary>參考答案</summary>

實心連結的 `hover:bg-teal-800` 改成 `hover:bg-teal-900`。若要換成玫瑰色，寫 `hover:bg-rose-800`，字色維持 `text-white`。

</details>

## 深色模式

`dark:` 是變體：條件成立時，後面的 utility 才套上。v4 的預設條件是作業系統的深色外觀，對應 `prefers-color-scheme: dark`。同一顆元素先寫淺色 class，再寫 `dark:` 那一組。見 [Dark mode](https://tailwindcss.com/docs/dark-mode)。

### 預設跟著系統

沒有改寫 `dark` 的定義時，頁面上沒有開關。按 <kbd>F12</kbd>，<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>），執行 **Show Rendering**，把 **prefers-color-scheme** 設成 `dark`。

```html 02-tailwind/pages/09-dark-system.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>跟隨系統深色</title>
  </head>
  <body class="bg-white text-teal-950 scheme-light dark:bg-teal-950 dark:text-teal-50 dark:scheme-dark">
    <main class="mx-auto max-w-xl px-6 py-10">
      <p class="text-sm text-teal-700 dark:text-teal-200">跟著作業系統的外觀</p>
      <h1 class="mt-2 text-3xl font-bold">深色時這塊會換底</h1>
      <p class="mt-4 text-stone-600 dark:text-teal-100">
        沒有按鈕。系統是淺色就用沒有前綴的 class；系統是深色才套 dark:。
      </p>
      <article class="mt-6 rounded-xl bg-teal-50 p-5 dark:bg-teal-900">
        <h2 class="font-semibold">台北城市漫遊</h2>
        <p class="mt-2 text-sm">三天 · 含早餐</p>
      </article>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`body` 上：`bg-white text-teal-950` 是淺色底與深字；`dark:bg-teal-950 dark:text-teal-50` 是深色底與淺字。`scheme-light` 與 `dark:scheme-dark` 讓表單控制項的原生顏色跟著走。卡片是 `bg-teal-50`，深色時 `dark:bg-teal-900` 蓋過它。

{% note success %}
**換你試試：**
深色時把標題改成琥珀色的淺字。色階在 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)。
{% endnote %}

<details>
<summary>參考答案</summary>

`h1` 加上 `dark:text-amber-200`。淺色時仍用繼承來的深字，只有 `dark:` 成立才換成琥珀色。

</details>

# 用 @theme 自訂顏色與間距

預設色票沒有你的品牌名時，在 CSS 裡用 `@theme` 宣告變數。`--color-brand-700` 會同時做出 `bg-brand-700`、`text-brand-700`、`border-brand-700`。`--spacing-18: 4.5rem` 會做出 `p-18`、`m-18`、`w-18`、`gap-18`，不會改掉既有的 `p-4`。你新增的名字和內建的合併；課堂只加 `brand` 與需要的間距格，不去覆蓋 `teal`。變數一覽見 [主題指令](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#主題指令) 與 [@theme inline 與 static](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#theme-inline-與-static)。

## 用 @theme 自訂品牌色

色階仍用 50 到 950，之後換深淺才和預設色票同一套數字。下面這段加進入口 CSS 的 `@theme`。頁面底、標題與按鈕都用 `brand`。

```css 02-tailwind/src/style.css
@import "tailwindcss";

@theme {
  --color-brand-50: #f0fdfa;
  --color-brand-100: #ccfbf1;
  --color-brand-200: #99f6e4;
  --color-brand-300: #5eead4;
  --color-brand-400: #2dd4bf;
  --color-brand-500: #14b8a6;
  --color-brand-600: #0d9488;
  --color-brand-700: #0f766e;
  --color-brand-800: #115e59;
  --color-brand-900: #134e4a;
  --color-brand-950: #042f2e;
  --spacing-18: 4.5rem;
}
```

```html 02-tailwind/pages/08-theme.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>品牌色</title>
  </head>
  <body class="bg-brand-50 p-6 text-brand-950">
    <p class="text-sm font-medium tracking-wide text-brand-700">洛奇旅行</p>
    <h1 class="mt-2 text-3xl font-bold text-brand-900">品牌色來自 @theme</h1>
    <p class="mt-3 max-w-prose text-brand-800">
      這一頁的 bg-brand-50、text-brand-900 對應 src/style.css 裡的 --color-brand-*。
    </p>
    <a class="mt-6 inline-block rounded-lg bg-brand-700 px-4 py-2 font-medium text-white" href="#tours">看行程</a>
    <ul class="mt-8 grid max-w-lg gap-2 text-sm">
      <li class="rounded bg-brand-100 px-3 py-2">brand-100</li>
      <li class="rounded bg-brand-300 px-3 py-2">brand-300</li>
      <li class="rounded bg-brand-500 px-3 py-2 text-white">brand-500</li>
      <li class="rounded bg-brand-700 px-3 py-2 text-white">brand-700</li>
      <li class="rounded bg-brand-900 px-3 py-2 text-white">brand-900</li>
    </ul>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`bg-brand-50` 讀 `--color-brand-50`，`text-brand-900` 讀 `--color-brand-900`，`bg-brand-700` 讀 `--color-brand-700`。名字中間的 `brand` 就是你在 `@theme` 裡取的色族。

{% note success %}
**換你試試：**
看行程那顆按鈕的內距改用 `--spacing-18` 做出的那一格，四邊一起加。寫法在 [padding](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#padding)。
{% endnote %}

<details>
<summary>參考答案</summary>

`@theme` 裡保留 `--spacing-18: 4.5rem;`。按鈕的 `px-4 py-2` 換成 `p-18`。

</details>

# 寫進樣式表

多數外觀留在標籤的 class 上。下面幾種寫法是在 CSS 裡擴充 Tailwind：重複的一串、要跟前綴搭配的自訂工具、手動深色、刻度沒有的值、父層或兄弟的狀態。每一種先看什麼時候用，再改一個小例子。

## @apply

同一串 utility 會在很多你改不到的標籤上重複時，才在 CSS 裡用 `@apply` 收成一個 class。按鈕、卡片是你自己寫的 HTML 時，class 留在標籤上。整頁都 `@apply`，名字又會看不出 padding。`@apply` 要看得到主題，所以這份檔用 `@reference` 指向入口 CSS。說明見 [@layer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#layer)。

```css 02-tailwind/src/apply.css
@reference "./style.css";

.btn-solid {
  @apply inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white;
}
```

```html 02-tailwind/pages/24-apply.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@apply</title>
  </head>
  <body class="bg-stone-50 p-6">
    <h1 class="mb-4 text-2xl font-bold text-stone-900">元件 class 只留一顆按鈕</h1>
    <a class="btn-solid" href="#tours">報名這梯</a>
    <a class="btn-solid ml-3" href="#more">下一梯</a>
    <p class="mt-4 max-w-prose text-sm text-stone-600">兩顆按鈕共用 .btn-solid。標題與說明仍把 utility 寫在標籤上。</p>
    <script type="module" src="/src/apply.js"></script>
  </body>
</html>
```

`.btn-solid` 展開成內距、圓角、青綠底與白字。兩顆連結都只寫這一個 class。標題的 `text-2xl font-bold` 仍在標籤上，因為它沒有重複到需要收進 CSS。`ml-3` 是第二顆自己的左外距，不必放進 `.btn-solid`。

```js 02-tailwind/src/apply.js
import "./style.css";
import "./apply.css";
```

{% note success %}
**換你試試：**
滑過時背景再深一階，加在 `@apply` 那一行裡。狀態前綴見 [常用變體](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#常用變體)，顏色見 [background-color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#background-color)。
{% endnote %}

<details>
<summary>參考答案</summary>

```css
.btn-solid {
  @apply inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800;
}
```

</details>

## @layer 與 @utility

`@layer components` 裡的 class 是普通 CSS，不能寫成 `md:kicker`。`@utility` 註冊的名字才能接 `hover:`、`md:`。版心這種「一個 class 做置中與最大寬度」用 `@utility`。對照見 [@layer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#layer) 與 [@utility](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#utility)。

```css 02-tailwind/src/layer.css
@import "./style.css";

@layer components {
  .kicker {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    color: var(--color-teal-700);
  }
}

@utility chip {
  border-radius: calc(infinity * 1px);
  padding-inline: 0.75rem;
  padding-block: 0.25rem;
  font-size: 0.75rem;
  background-color: var(--color-teal-50);
  color: var(--color-teal-900);
}
```

```html 02-tailwind/pages/25-layer.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@layer 與 @utility</title>
  </head>
  <body class="space-y-4 bg-stone-50 p-6 text-stone-900">
    <p class="kicker">@layer components，前綴接不上這個名字</p>
    <p class="md:chip">md 以上才套用 chip</p>
    <script type="module" src="/src/layer.js"></script>
  </body>
</html>
```

`.kicker` 在 `@layer components`。標籤寫 `kicker` 就有小字與青綠色；寫成 `md:kicker` 不會產生規則。`chip` 用 `@utility` 註冊，所以 `md:chip` 在 48rem 以上才套用膠囊底、圓角與字級，比較窄的時候這一行沒有那些樣式。

```js 02-tailwind/src/layer.js
import "./layer.css";
```

{% note success %}
**換你試試：**
眉題也要能寫成 `md:kicker`，只在 `md` 以上套用那組字級與顏色。對照 [@layer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#layer)。
{% endnote %}

<details>
<summary>參考答案</summary>

`.kicker` 改放到 `@utility`：

```css
@utility kicker {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: var(--color-teal-700);
}
```

標籤改成 `class="md:kicker"`。

</details>

### container 與 mx-auto、px

v4 沒有舊版那種自帶置中與左右留白的 `container`。不取新名字時，版心是 `mx-auto max-w-6xl px-4`：水平置中、最大 72rem、左右 1rem。若要一個 class 同時做這三件事，並讓最大寬度跟著斷點變，用 `@utility container` 自己定義。`max-w-sm`（24rem）和斷點 `sm:`（40rem）不是同一個門檻，見 [max-width](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#max-width)。

```css 02-tailwind/src/style.css
@utility container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
  @media (width >= 40rem) {
    max-width: 40rem;
    padding-inline: 1.5rem;
  }
  @media (width >= 48rem) {
    max-width: 48rem;
  }
  @media (width >= 64rem) {
    max-width: 64rem;
  }
  @media (width >= 80rem) {
    max-width: 80rem;
  }
  @media (width >= 96rem) {
    max-width: 96rem;
  }
}
```

```html 02-tailwind/pages/21-container.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>版心</title>
  </head>
  <body class="bg-stone-200 text-stone-900">
    <div class="container bg-white py-8">
      <p class="text-xs font-medium text-teal-700">class="container"</p>
      <h1 class="mt-2 text-2xl font-bold">白底停在版心裡，外面仍是灰</h1>
      <p class="mt-3">這條 container 在 src/style.css，用 @utility 寫成置中、左右留白、最大寬度跟著斷點。</p>
    </div>
    <div class="mx-auto mt-6 max-w-6xl bg-teal-50 px-4 py-8 sm:px-6">
      <p class="text-xs font-medium text-teal-800">mx-auto max-w-6xl px-4</p>
      <h2 class="mt-2 text-xl font-semibold">不取名字時，三個 class 做同一件事</h2>
      <p class="mt-3">max-w-6xl 是 72rem。水平置中靠 mx-auto，左右留白靠 px-4。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`container`：寬度 100%、`margin-inline: auto` 置中、左右內距 1rem；40rem 以後最大寬度跟著視窗斷點變，左右內距改 1.5rem。下面那條沒有自訂工具：`mx-auto` 置中，`max-w-6xl` 限寬，`px-4` 留白，`sm:px-6` 在 40rem 以後把左右內距改成 1.5rem。

{% note success %}
**換你試試：**
`@utility container` 在 40rem 以後的左右留白改成 2rem。內距寫法在 [padding](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#padding)。
{% endnote %}

<details>
<summary>參考答案</summary>

40rem 那段的 `padding-inline: 1.5rem;` 改成 `padding-inline: 2rem;`。

</details>

## @theme

預設五個斷點不夠用時，在同一個 `@theme` 加 `--breakpoint-` 開頭的變數。`--breakpoint-tablet: 52rem` 產生前綴 `tablet:`，落在 `md`（48rem）和 `lg`（64rem）之間。名字用 `tablet`，才不會蓋掉內建的 `sm`。什麼時候改用 `inline` 或 `static` 見 [@theme inline 與 static](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#theme-inline-與-static)。

### 自訂斷點

`--breakpoint-3xl: 120rem` 約 1920px，很多筆電視窗拉不滿，所以主要變化放在 `tablet:`。這兩行加進同一個 `@theme`，品牌色與 `--spacing-18` 留在原處。

```css 02-tailwind/src/style.css
@theme {
  --breakpoint-tablet: 52rem;
  --breakpoint-3xl: 120rem;
}
```

```html 02-tailwind/pages/22-custom-breakpoint.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>自訂斷點</title>
  </head>
  <body class="bg-stone-50 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">tablet: 設在 52rem</h1>
    <p class="mt-3 max-w-prose">
      比 md（48rem）再寬一點才變成兩欄。3xl（120rem）那句只有非常寬的視窗看得到。
    </p>
    <div class="mt-6 grid grid-cols-1 gap-4 tablet:grid-cols-2">
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="font-semibold">左欄</h2>
        <p class="text-sm text-stone-600">52rem 以前跟右欄上下排。</p>
      </article>
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="font-semibold">右欄</h2>
        <p class="text-sm text-stone-600">過了 tablet 才並排。</p>
      </article>
    </div>
    <p class="mt-6 hidden rounded-lg bg-violet-100 px-4 py-3 text-violet-950 3xl:block">
      視窗到 3xl 了。一般筆電的視窗拉不滿這條，把瀏覽器縮放調小才容易看到。
    </p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`grid-cols-1` 先是一欄。`tablet:grid-cols-2` 在 52rem 以上改兩欄。最後一段 `hidden 3xl:block`：預設不顯示，視窗到 120rem 才變成區塊。

{% note success %}
**換你試試：**
過了 `tablet` 改成三欄。欄數在 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。
{% endnote %}

<details>
<summary>參考答案</summary>

`tablet:grid-cols-2` 改成 `tablet:grid-cols-3`。

</details>

## @custom-variant

產品要一顆按鈕，讓這一頁的深色和作業系統分開時，重新定義 `dark`。元素自己或某個祖先帶有 class `dark` 時，`dark:` 才生效。這一行若寫進全站入口，每一頁都會改看 class。所以它放在另一份 CSS，只有切換頁會載入。

### 用 @custom-variant 改成手動切換

下面這一行只放在切換頁會載入的 CSS。按鈕把 class `dark` 加到 `<html>`，並用 `localStorage` 記住上次的選擇。

```css 02-tailwind/src/dark-manual.css
@custom-variant dark (&:where(.dark, .dark *));
```

`&` 是正在套用這個變體的元素。`.dark` 是 `<html>` 上的 class，`.dark *` 是它的後代。按鈕只負責在 `document.documentElement` 上切換這個 class。

```js 02-tailwind/src/dark-toggle.js
import "./style.css";
import "./dark-manual.css";

const root = document.documentElement;
const button = document.querySelector("#theme-toggle");
const stored = localStorage.getItem("theme");
const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.classList.toggle("dark", stored ? stored === "dark" : preferDark);

const paint = () => {
  button.textContent = root.classList.contains("dark") ? "切換亮色" : "切換深色";
};

paint();
button.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  paint();
});
```

還沒按過按鈕時先跟系統偏好，並把結果寫成 `<html>` 的 class。按按鈕會切換 class，把 `dark` 或 `light` 存進 `localStorage`。

```html 02-tailwind/pages/10-dark-toggle.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>手動切換深色</title>
  </head>
  <body class="min-h-screen bg-stone-50 text-stone-900 scheme-light dark:bg-stone-950 dark:text-stone-100 dark:scheme-dark">
    <header class="flex items-center justify-between border-b border-stone-200 px-6 py-4 dark:border-stone-700">
      <p class="font-semibold">洛奇旅行</p>
      <button
        id="theme-toggle"
        type="button"
        class="rounded-lg border border-stone-300 px-3 py-1.5 text-sm dark:border-stone-600"
      >
        切換深色
      </button>
    </header>
    <main class="mx-auto max-w-xl px-6 py-8">
      <h1 class="text-3xl font-bold">按鈕決定這一頁的外觀</h1>
      <p class="mt-4 text-stone-600 dark:text-stone-300">
        html 上有 dark 這個 class 時，dark: 才生效。重新整理會記住上次的選擇。
      </p>
      <article class="mt-6 rounded-xl bg-white p-5 shadow dark:bg-stone-900">
        <h2 class="text-lg font-semibold">花蓮山海</h2>
        <p class="mt-2 text-sm text-stone-600 dark:text-stone-300">兩天一夜。卡片的底也跟著換。</p>
      </article>
    </main>
    <script type="module" src="/src/dark-toggle.js"></script>
  </body>
</html>
```

`dark:bg-stone-950` 在 `<html>` 有 class `dark` 時把頁面底改成近黑。卡片的 `bg-white` 在淺色生效，`dark:bg-stone-900` 在深色生效。頁尾 script 是 `dark-toggle.js`，它會再載入 `dark-manual.css`。

{% note success %}
**換你試試：**
深色時卡片加一圈深灰框。邊框色在 [border-color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#border-color)。
{% endnote %}

<details>
<summary>參考答案</summary>

`article` 的 class 補上 `dark:border dark:border-stone-700`。

</details>

## 任意值與 important

刻度沒有的長度寫在方括號裡，例如 `w-[22rem]`。底線會被當成空白，`grid-cols-[1fr_2fr]` 是 `1fr 2fr`。能用 `p-4`、`gap-3` 就用刻度，每一頁才不會各長各的。`!` 寫在 class 最後，把這條宣告標成 important，用來壓過同一屬性上的另一個 utility。寫法見 [任意值與任意屬性](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意值與任意屬性) 與 [任意變體、important、前綴](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意變體、important、前綴)。

```html 02-tailwind/pages/26-arbitrary.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>任意值與 important</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">刻度沒有的寬度</h1>
    <div class="mt-4 w-[22rem] rounded-xl bg-white p-4 shadow">
      <p class="text-stone-500 text-teal-800!">這行是青綠，而且要壓過 stone。</p>
      <p class="mt-2 text-sm text-stone-600">w-[22rem] 是 22rem，介在 max-w-xs 與 max-w-sm 之間，刻度沒有這一格。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`w-[22rem]` 把寬度設成方括號裡的 `22rem`。`text-stone-500` 與 `text-teal-800!` 都在改 `color`；後面的 `!` 讓青綠色這條變成 important。

{% note success %}
**換你試試：**
卡片圓角改成刻度沒有的 `1.25rem`。任意值在 [任意值與任意屬性](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意值與任意屬性)，圓角名稱在 [border-radius](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#border-radius)。
{% endnote %}

<details>
<summary>參考答案</summary>

`rounded-xl` 改成 `rounded-[1.25rem]`。

</details>

## group 與 peer

滑過整張卡要帶動裡面的圖和標題時，父層加 `group`，子層用 `group-hover:`。兄弟之間用 `peer`：class 寫在前面的兄弟，`peer-checked:` 寫在後面的兄弟。導覽列已經用過 `peer`。具名寫法見 [具名 group 與 peer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#具名-group-與-peer)。

`transition` 讓顏色、陰影、縮放在兩個狀態之間補間。`duration-200` 約 200 毫秒，圖片縮放用 `duration-300`。見 [transition-property](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#transition-property)。

```html 02-tailwind/pages/17-states.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>狀態與轉場</title>
  </head>
  <body class="space-y-8 bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">滑過、聚焦、整組一起變</h1>
    <a
      class="inline-block rounded-lg bg-teal-700 px-4 py-2 font-medium text-white transition duration-200 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
      href="#go"
    >
      用鍵盤 Tab 到我
    </a>
    <article class="group max-w-sm overflow-hidden rounded-2xl bg-white shadow transition duration-200 hover:shadow-lg">
      <img
        class="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
        src="https://picsum.photos/id/1015/800/500"
        alt="山景"
      />
      <div class="p-4">
        <h2 class="font-semibold group-hover:text-teal-800">滑過整張卡，標題與圖片一起變</h2>
        <p class="mt-1 text-sm text-stone-600">group 放在父層，group-hover: 放在子層。</p>
      </div>
    </article>
    <div>
      <input id="agree" class="peer sr-only" type="checkbox" />
      <label
        class="inline-block cursor-pointer rounded border border-stone-300 px-3 py-1 peer-checked:border-teal-700 peer-checked:bg-teal-50"
        for="agree"
      >
        我已閱讀行前說明
      </label>
      <p class="mt-2 hidden text-sm text-teal-800 peer-checked:block">勾選後這行才出現。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`article` 的 `group` 建立一組。圖片的 `group-hover:scale-105` 在滑過這張卡時放大到 1.05 倍；父層的 `overflow-hidden` 讓放大的圖停在圓角裡。標題的 `group-hover:text-teal-800` 在同一時機改字色。卡片自己的 `hover:shadow-lg` 只在指標直接停在卡片上時加深陰影。

核取方塊的 `peer` 給後面的標籤與段落用。標籤的 `peer-checked:bg-teal-50` 在勾選後換底。段落預設 `hidden`，`peer-checked:block` 在勾選後顯示。方塊在標籤前面，`for` 對到 `id`。

{% note success %}
**換你試試：**
滑過整張卡時，標題再深一階。字色在 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)，父層寫法在 [具名 group 與 peer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#具名-group-與-peer)。
{% endnote %}

<details>
<summary>參考答案</summary>

標題的 `group-hover:text-teal-800` 改成 `group-hover:text-teal-900`。`group` 仍留在 `article` 上。

</details>

# 選讀：容器查詢

斷點看的是整個視窗。同一張卡片有時在窄側欄、有時在寬的主文時，改看父層寬度。父層加 `@container`，子層用 `@md:`。這裡的 `@md` 是容器寬度 28rem，不是視窗的 `md`（48rem）。見 [容器查詢](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#容器查詢)。

外框有 `resize-x`，拖右邊即可。框還窄時圖在上，拖過大約 28rem 之後圖到左邊。

```html 02-tailwind/pages/23-container-query.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>容器查詢</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">拖右邊，改的是這張卡的寬度</h1>
    <p class="mt-2 max-w-prose text-sm text-stone-600">視窗可以很寬。排版看的是下面這個可拉伸的框。</p>
    <div class="@container mt-6 w-72 resize-x overflow-auto rounded-xl border border-stone-300 bg-white p-4">
      <article class="flex flex-col gap-4 @md:flex-row">
        <img class="h-32 w-full rounded-lg object-cover @md:w-40" src="https://picsum.photos/id/1016/800/500" alt="湖" />
        <div>
          <h2 class="text-lg font-semibold">花蓮山海</h2>
          <p class="mt-1 text-sm text-stone-600">框還窄時圖在上。框寬到 @md（28rem）圖改到左邊。</p>
        </div>
      </article>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

外框 `@container` 建立查詢對象，`w-72` 是起始寬度 18rem，`resize-x` 讓你可以橫向拖。`flex-col` 先直排，`@md:flex-row` 在容器到達 28rem 時改橫排。圖片 `w-full` 先佔滿，`@md:w-40` 在同一門檻改成 10rem 寬。

{% note success %}
**換你試試：**
圖文改到容器的 `@lg`（32rem）才橫排。寬度對照在 [@container](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#container)。
{% endnote %}

<details>
<summary>參考答案</summary>

`@md:flex-row` 與 `@md:w-40` 改成 `@lg:flex-row`、`@lg:w-40`。

</details>

# 選讀：Preflight 重置了什麼

`@import "tailwindcss"` 會帶入 Preflight。標題和段落的預設外距會被拿掉，所以沒寫 `mt-*` 時，`h1` 會貼著上一塊。盒模型是 `border-box`。圖片預設 `display: block`，最大寬度 100%。按鈕會繼承字型。某一塊突然貼在一起時，先補 `mt-4` 或父層的 `space-y-4`。

# 本篇重點回顧

- utility 是「屬性－值」：`bg-teal-700` 塗背景，`p-4` 是 1rem 內距，編譯器只認原始碼裡的完整 class。
- 冒號左邊是條件。`md:` 從 48rem 起生效，`hover:` 在滑過時生效，`dark:` 預設跟系統深色。
- `@theme` 的 `--color-brand-*` 做出 `bg-brand-*`，`--spacing-18` 做出 `p-18`，`--breakpoint-tablet` 做出 `tablet:`。
- 標籤上的 class 是預設寫法。`@apply` 只收重複且改不到標籤的那一串。
- `@layer components` 是普通 class；`@utility` 才能接 `md:`、`hover:`。版心用 `@utility container` 或 `mx-auto max-w-6xl px-4`。
- 手動深色用 `@custom-variant` 讓 `dark:` 改看 `<html>` 的 class `dark`。
- 刻度沒有的值寫 `w-[22rem]`。同一屬性要壓過另一個 utility 時，`!` 放在 class 最後。
- `group-hover:` 看父層，`peer-checked:` 看前面的兄弟。手機先一欄，較寬的前綴再加欄。
