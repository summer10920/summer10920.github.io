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
| 前綴 | `hover:`、`focus-visible:`、`dark:`（跟系統） |
| RWD 與容器 | 手機優先、`sm:`～`2xl:`、`max-*`、版心、自訂斷點、容器查詢 |
| `@theme` | 品牌色、`--spacing-*` |
| 寫進樣式表 | `@apply`、任意值 `[]` |
| 選讀 | `@layer` / `@utility`、手動深色、`!`、`group` / `peer`、Preflight |

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

冒號左邊是條件，右邊才是 utility。`hover:bg-teal-800` 讀成：指標移上來，背景才改成 `teal-800`。`md:hover:bg-teal-800` 再加一個條件：視窗到達 `md`，而且指標移上來。建議斷點在前、狀態在後、屬性在最後。同一專案固定這個順序。

這一章先看滑過、鍵盤聚焦和跟著系統的深色。寬度前綴、版心、自訂斷點和容器查詢在下一章。`dark:` 預設看作業系統的外觀，不是一顆按鈕。

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

# RWD 與容器

窄螢幕先排得下，視窗變寬再加欄、改橫排。整頁的側欄看的是視窗寬度。同一張卡片有時在窄欄、有時在寬欄時，改看包住它的父層。

沒有前綴的 class 在所有寬度都生效，那就是手機那一版。`sm:` 以後是「夠寬才加上」，更寬時仍然成立。版心用最大寬度加水平置中，內文才不會貼著視窗兩邊。

## 手機優先

先寫窄畫面讀得完的樣子，不要先寫桌面再往回修。沒有 `sm:`、`md:` 的欄數、字級、排向，拉寬瀏覽器也不會變。`<meta name="viewport" content="width=device-width, initial-scale=1.0">` 要留在 `head`，手機才不會把頁面縮成桌面寬度的一小條。

下面這頁故意不加斷點。頁首和卡片都是一欄，把視窗拉寬，卡片仍跟內容區一樣寬。

```html 02-tailwind/pages/19-mobile.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>手機優先</title>
  </head>
  <body class="bg-stone-50 text-stone-900">
    <header class="bg-teal-800 px-4 py-6 text-white">
      <h1 class="text-2xl font-bold">洛奇旅行</h1>
      <p class="mt-2 max-w-prose text-sm text-teal-100">先讓窄畫面讀得完。沒有前綴的 class 在所有寬度都生效。</p>
    </header>
    <section class="grid grid-cols-1 gap-4 p-4">
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="text-lg font-semibold">台北城市漫遊</h2>
        <p class="mt-1 text-sm text-stone-600">預設一欄，卡片跟內容區一樣寬。</p>
      </article>
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="text-lg font-semibold">花蓮山海</h2>
        <p class="mt-1 text-sm text-stone-600">拉寬瀏覽器時，這一頁還沒有 sm:、md:。</p>
      </article>
    </section>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`grid-cols-1` 沒有前綴，所以從手機到寬螢幕都是一欄。`gap-4` 是欄與欄之間的 `1rem`。`max-w-prose` 只限制那一行說明的最大寬度，不會把整頁收成版心。

{% note success %}
**換你試試：**
清單在 `sm` 改成兩欄，比 `sm` 窄時仍是一欄。欄數在 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。
{% endnote %}

<details>
<summary>參考答案</summary>

`section` 的 class 改成 `grid grid-cols-1 gap-4 p-4 sm:grid-cols-2`。

</details>

## 預設斷點

`sm:`、`md:`、`lg:`、`xl:`、`2xl:` 是 `min-width`。視窗到達那個寬度之後條件成立，再拉更寬仍然成立。同一個屬性寫了好幾個前綴時，較寬的那個蓋過較窄的。門檻見 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。rem 在媒體查詢裡相對瀏覽器預設字級，通常 16px。

| 前綴 | 最小寬度 | 大約像素 | 編成的查詢 |
| --- | --- | --- | --- |
| （沒有） | 0 | 手機直向 | 沒有媒體查詢 |
| `sm:` | 40rem | 640px | `@media (width >= 40rem)` |
| `md:` | 48rem | 768px | `@media (width >= 48rem)` |
| `lg:` | 64rem | 1024px | `@media (width >= 64rem)` |
| `xl:` | 80rem | 1280px | `@media (width >= 80rem)` |
| `2xl:` | 96rem | 1536px | `@media (width >= 96rem)` |

頂端色帶用「先隱藏、到了這段才顯示、下一段再隱藏」一次只留一句。清單從一欄開始，每個斷點多一欄。把視窗從窄拉到寬，色帶和欄數會一起變。

```html 02-tailwind/pages/20-breakpoints.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>斷點</title>
  </head>
  <body class="bg-stone-50 text-stone-900">
    <p class="bg-rose-200 px-4 py-3 text-sm font-medium sm:bg-orange-200 md:bg-amber-200 lg:bg-lime-200 xl:bg-teal-200 2xl:bg-violet-200">
      <span class="sm:hidden">現在小於 sm（40rem）</span>
      <span class="hidden sm:inline md:hidden">sm 以上，還沒到 md</span>
      <span class="hidden md:inline lg:hidden">md 以上，還沒到 lg</span>
      <span class="hidden lg:inline xl:hidden">lg 以上，還沒到 xl</span>
      <span class="hidden xl:inline 2xl:hidden">xl 以上，還沒到 2xl</span>
      <span class="hidden 2xl:inline">2xl 以上</span>
    </p>
    <main class="p-6">
      <h1 class="text-2xl font-bold">同一份清單，欄數隨寬度增加</h1>
      <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">台北</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">新北</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">基隆</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">桃園</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">新竹</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">台中</li>
      </ul>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

第一句只有 `sm:hidden`：預設看得到，40rem 起隱藏。第二句是 `hidden sm:inline md:hidden`：預設不顯示，`sm` 到 `md` 之間變成行內，48rem 起又隱藏。背景色沒有「關掉」前一段，因為較寬的 `sm:bg-orange-200`、`md:bg-amber-200` 會蓋過沒有前綴的 `bg-rose-200`。清單的 `grid-cols-1` 一直都在，`2xl:grid-cols-6` 只在 96rem 以上再蓋成六欄。

{% note success %}
**換你試試：**
六個地名改成 `md` 才兩欄、`xl` 才四欄，不要每一段都加欄。斷點在 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。
{% endnote %}

<details>
<summary>參考答案</summary>

`ul` 的 class 改成 `mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4`。

</details>

## max-* 範圍變體

`md:` 是「48rem 以上」。`max-md:` 是「小於 48rem」，編成 `@media (width < 48rem)`。正好 48rem 時 `md:` 成立、`max-md:` 不成立，兩段不會重疊。`max-sm:`、`max-lg:`、`max-xl:`、`max-2xl:` 是同一套，門檻仍是 40、64、80、96rem。

手機上才要的樣式，用手機優先可以寫成預設生效、`md:hidden` 到了就收掉。若你只想改窄螢幕、不想再寫一條把樣式收回來，用 `max-md:`。兩段之間才生效，把 `md:` 和 `max-xl:` 疊在同一個 class 上：`md:max-xl:` 是 48rem 以上、且小於 80rem。

{% note warning %}
**三個很像的名字**
`md:` 是視窗至少 48rem。`max-md:` 是視窗小於 48rem。`max-w-md` 是元素最大寬度 28rem，跟斷點無關。
{% endnote %}

三句都先 `hidden`。第一句只在小於 `md` 出現，第二句只在 `md` 到 `xl` 之間，第三句從 `xl` 起一直在。

```html 02-tailwind/pages/27-max.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>範圍變體</title>
  </head>
  <body class="space-y-4 bg-stone-50 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">max-md: 是小於 md，不是 max-w-md</h1>
    <p class="hidden rounded-lg bg-amber-100 px-4 py-3 text-amber-950 max-md:block">小於 md（48rem）才看得到這句。</p>
    <p class="hidden rounded-lg bg-teal-100 px-4 py-3 text-teal-950 md:max-xl:block">md 以上、且小於 xl（80rem）。</p>
    <p class="hidden rounded-lg bg-violet-100 px-4 py-3 text-violet-950 xl:block">xl 以上一直顯示。</p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`hidden` 是 `display: none`，沒有前綴，所有寬度都先不顯示。`max-md:block` 只在小於 48rem 時改成區塊。`md:max-xl:block` 要兩個條件同時成立。`xl:block` 從 80rem 起蓋過 `hidden`，而且沒有更寬的前綴再把它藏起來。

{% note success %}
**換你試試：**
中間那句改成只在 `lg` 以上、小於 `2xl` 時出現。範圍寫法見 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。
{% endnote %}

<details>
<summary>參考答案</summary>

第二句的 `md:max-xl:block` 改成 `lg:max-2xl:block`。

</details>

## 卡片牆

Flex 管一列怎麼對齊，Grid 管會隨寬度加欄的卡片。上半是頁首：品牌靠左、連結靠右，放不下就換行。下半預設一欄，`sm` 兩欄，`lg` 三欄。單格怎麼寫見 [常見組合](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#常見組合) 與 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。

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

## 版心與 max-w-*

版心是「這一欄最寬到這裡，多出來的空間分到左右」。`mx-auto` 是左右外距 `auto`，父層比元素寬才看得到置中。所以要先有 `max-w-*` 或寫死的寬度。`px-4` 是左右內距 1rem，視窗比版心窄時，文字仍離邊一點。

不取新名字時，整頁版心是 `mx-auto max-w-6xl px-4`：水平置中、最大 72rem、左右 1rem。閱讀用的一段可以再窄，例如 `mx-auto max-w-3xl`（48rem）或 `max-w-prose`。卡片上的 `max-w-sm` 是 24rem，只限制那張卡，不是斷點 `sm:`（40rem）。

v4 沒有舊版那種自帶置中與左右留白的 `container`。若要一個 class 同時做這三件事，並讓最大寬度跟著斷點變，用 `@utility container` 自己定義。這個 class 要能接斷點，所以用 `@utility`，不是普通的選擇器。`@layer` 和 `@utility` 的差別放在文末選讀。

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
      <p class="mt-3 max-w-3xl">max-w-6xl 是 72rem，管的是整條版心。這段說明再用 max-w-3xl 收到 48rem。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`container`：寬度 100%、`margin-inline: auto` 置中、左右內距 1rem；40rem 以後最大寬度跟著視窗斷點變，左右內距改 1.5rem。下面那條沒有自訂工具：`mx-auto` 置中，`max-w-6xl` 限寬 72rem，`px-4` 留白，`sm:px-6` 在 40rem 以後把左右內距改成 1.5rem。說明的 `max-w-3xl` 只縮那一段，不會把青綠底一起縮窄。`max-w-*` 的刻度見 [max-width](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#max-width)。

{% note success %}
**換你試試：**
`@utility container` 在 40rem 以後的左右留白改成 2rem。內距寫法在 [padding](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#padding)。
{% endnote %}

<details>
<summary>參考答案</summary>

40rem 那段的 `padding-inline: 1.5rem;` 改成 `padding-inline: 2rem;`。

</details>

## 用 @theme 自訂斷點

預設五個斷點不夠用時，在同一個 `@theme` 加 `--breakpoint-` 開頭的變數。`--breakpoint-tablet: 52rem` 產生前綴 `tablet:`，落在 `md`（48rem）和 `lg`（64rem）之間。名字用 `tablet`，才不會蓋掉內建的 `sm`。品牌色與 `--spacing-18` 留在同一個 `@theme`。什麼時候改用 `inline` 或 `static` 見 [@theme inline 與 static](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#theme-inline-與-static)。

`--breakpoint-3xl: 120rem` 約 1920px，很多筆電視窗拉不滿，所以主要變化放在 `tablet:`。不要用 `initial` 拿掉內建斷點。

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

`grid-cols-1` 先是一欄。`tablet:grid-cols-2` 在 52rem 以上改兩欄。最後一段 `hidden 3xl:block`：預設不顯示，視窗到 120rem 才變成區塊。自訂前綴一樣是 `min-width`，也有對應的 `max-tablet:`。

{% note success %}
**換你試試：**
過了 `tablet` 改成三欄。欄數在 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。
{% endnote %}

<details>
<summary>參考答案</summary>

`tablet:grid-cols-2` 改成 `tablet:grid-cols-3`。

</details>

## 容器查詢

斷點看的是整個視窗。側欄佔掉 16rem 之後，主文可能還很窄，卡片若仍用 `md:flex-row`，會在視窗夠寬、自己卻擠成直條時提早橫排。父層加 `@container`，子層改看這個框的寬度。見 [容器查詢](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#容器查詢)。

`@sm:`、`@md:`、`@lg:` 和視窗的 `sm:`、`md:`、`lg:` 不是同一組數字。容器的 `@sm` 是 24rem、`@md` 是 28rem、`@lg` 是 32rem。視窗的 `md` 是 48rem。

{% note warning %}
**@md 不是 md，也不是 container**
`md:` 看視窗，門檻 48rem。`@md:` 看容器，門檻 28rem。版心用的 class `container` 是置中與最大寬度，三個不要混。
{% endnote %}

### 未具名容器

外框有 `@container` 與 `resize-x`，拖右邊即可。框還窄時圖在上，拖過大約 28rem 之後圖到左邊。沒有寫名字時，`@md:` 對到最近的那層 `@container`。

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

### 具名容器

兩層都是容器時，沒有名字的 `@lg:` 會對到最近的祖先。內層要明明只看自己，就給容器取名：父層 `@container/page`、內層 `@container/card`，子層寫 `@lg/card:`。斜線後面是名字，不是視窗斷點。

外層固定很寬。內層從 `w-64`（16rem）起，拖右邊才會變寬。標題的 `@lg/card:text-2xl` 要等 card 自己到 32rem，外層 page 已經很寬也不算數。

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
    <div class="@container/page mt-10 max-w-3xl rounded-xl bg-stone-200 p-4">
      <p class="text-sm text-stone-600">外層叫 page。裡面再放一個較窄、可橫向拖的 card。</p>
      <div class="@container/card mt-4 w-64 resize-x overflow-auto rounded-lg bg-white p-4">
        <h2 class="text-base font-semibold @lg/card:text-2xl">標題只看 card</h2>
        <p class="mt-2 text-sm text-stone-600">@lg/card: 要 card 自己到 32rem 才放大。寫成 @lg: 會對到最近的容器。</p>
      </div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`@container/page` 同時設定 `container-type: inline-size` 和 `container-name: page`。`@container/card` 是另一個名字。`@lg/card:` 只問名為 card 的那一層寬度。

{% note success %}
**換你試試：**
標題改成 card 到 `@md`（28rem）就放大。具名寫法在 [@container](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#container)。
{% endnote %}

<details>
<summary>參考答案</summary>

`@lg/card:text-2xl` 改成 `@md/card:text-2xl`。`@container/card` 留在內層。

</details>

## 側欄

整頁的側欄跟著視窗走：窄的時候側欄在上、主文在下，`lg`（64rem）以後變成四欄格子，側欄佔一欄、主文佔三欄。版心仍是 `mx-auto max-w-6xl px-4`。

主文裡的卡片不要再用 `lg:flex-row`。視窗到了 `lg`，側欄已經吃掉一欄，主文可能還沒到容器的 `@md`（28rem）。`main` 加上 `@container/main`，卡片用 `@md/main:`。Grid 子項預設最小寬度是內容寬，長圖會把欄撐破；主欄加上 `min-w-0`，容器量到的才是欄寬。

```html 02-tailwind/pages/28-sidebar.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>側欄</title>
  </head>
  <body class="bg-stone-100 text-stone-900">
    <div class="mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-4 lg:gap-6">
      <aside class="mb-6 rounded-xl bg-teal-800 p-4 text-white lg:col-span-1 lg:mb-0">
        <p class="text-sm font-medium">目的地</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li>台北</li>
          <li>花蓮</li>
          <li>台南</li>
        </ul>
      </aside>
      <main class="@container/main min-w-0 lg:col-span-3">
        <h1 class="text-2xl font-bold">側欄在窄螢幕時在上面</h1>
        <p class="mt-2 text-sm text-stone-600">並排看視窗的 lg。卡片橫排看 main 自己的寬度。</p>
        <article class="mt-4 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm @md/main:flex-row">
          <img class="h-32 w-full rounded-lg object-cover @md/main:w-40" src="https://picsum.photos/id/1015/800/500" alt="山景" />
          <div>
            <h2 class="text-lg font-semibold">花蓮山海</h2>
            <p class="mt-1 text-sm text-stone-600">視窗已經到 lg 時，主欄仍可能窄於容器的 @md（28rem），圖就還在上面。</p>
          </div>
        </article>
      </main>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

外層沒有 `lg:` 時是普通區塊，`aside` 與 `main` 上下排，`mb-6` 把兩塊分開。`lg:grid lg:grid-cols-4` 從 64rem 起改成四欄，`lg:col-span-1` 與 `lg:col-span-3` 分配欄數，`lg:mb-0` 拿掉側欄底下那條縫。卡片的 `flex-col` 在所有容器寬度都先直排，`@md/main:flex-row` 與 `@md/main:w-40` 只問名為 main 的容器。

{% note success %}
**換你試試：**
並排改到 `xl` 才出現。卡片改到容器的 `@lg`（32rem）才橫排。斷點在 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)，容器寬度在 [@container](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#container)。
{% endnote %}

<details>
<summary>參考答案</summary>

外層的 `lg:grid lg:grid-cols-4 lg:gap-6` 改成 `xl:grid xl:grid-cols-4 xl:gap-6`。側欄的 `lg:col-span-1 lg:mb-0` 改成 `xl:col-span-1 xl:mb-0`。主欄的 `lg:col-span-3` 改成 `xl:col-span-3`。卡片的 `@md/main:flex-row` 與 `@md/main:w-40` 改成 `@lg/main:flex-row`、`@lg/main:w-40`。

</details>

## 斷點與容器查詢怎麼選

頁面骨架跟著視窗：導覽要不要橫排、側欄要不要並排、整頁卡片牆要幾欄，用 `sm:` 到 `2xl:`。元件會被放進不同寬度的欄位時，用容器查詢，讓它跟著父層，不跟著視窗。

| | 視窗斷點 | 容器查詢 |
| --- | --- | --- |
| 前綴 | `md:`、`max-md:` | `@md:`、`@md/main:` |
| 看哪裡 | 整個視窗 | 某個祖先的寬度 |
| 常見門檻 | `md` 是 48rem | `@md` 是 28rem |
| 適合 | 頁首、側欄、整頁欄數 | 同一張卡出現在側欄或主文 |
| 具名 | 不需要 | 兩層容器時寫 `@container/main` |

整頁只有一個寬度來源時，不必再包 `@container`。容器查詢解決的是「視窗很寬，但這個框很窄」。

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

多數外觀留在標籤的 class 上。重複的一串才收進 `@apply`。刻度沒有的長度寫在方括號裡。自訂工具、手動深色、`!`、`group` / `peer` 放在文末，可以整節跳過。

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

## 任意值

刻度沒有的長度寫在方括號裡，例如 `w-[22rem]`。底線會被當成空白，`grid-cols-[1fr_2fr]` 是 `1fr 2fr`。能用 `p-4`、`gap-3` 就用刻度，每一頁才不會各長各的。寫法見 [任意值與任意屬性](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意值與任意屬性)。

```html 02-tailwind/pages/26-arbitrary.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>任意值</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">刻度沒有的寬度</h1>
    <div class="mt-4 w-[22rem] rounded-xl bg-white p-4 shadow">
      <p>這張卡的寬度是刻度沒有的 22rem。</p>
      <p class="mt-2 text-sm text-stone-600">w-[22rem] 是 22rem，介在 max-w-xs 與 max-w-sm 之間，刻度沒有這一格。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

`w-[22rem]` 把寬度設成方括號裡的 `22rem`。`max-w-xs` 是 20rem，`max-w-sm` 是 24rem，中間這一格沒有名字。

{% note success %}
**換你試試：**
卡片圓角改成刻度沒有的 `1.25rem`。任意值在 [任意值與任意屬性](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意值與任意屬性)，圓角名稱在 [border-radius](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#border-radius)。
{% endnote %}

<details>
<summary>參考答案</summary>

`rounded-xl` 改成 `rounded-[1.25rem]`。

</details>

# 選讀：@layer 與 @utility

`@layer components` 裡的 class 是普通 CSS，不能寫成 `md:kicker`。`@utility` 註冊的名字才能接 `hover:`、`md:`。版心的 `container` 已在 RWD 那章定義過，這一節只比較接不上前綴的 class，和註冊成工具之後可以寫 `md:chip` 的名字。對照見 [@layer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#layer) 與 [@utility](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#utility)。

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

# 選讀：手動切換深色

跟著系統的 `dark:` 在前面已經用過。產品要一顆按鈕，讓這一頁的深色和作業系統分開時，才重新定義 `dark`。這一行若寫進全站入口，每一頁都會改看 class，所以它放在另一份 CSS，只有切換頁會載入。

## 用 @custom-variant 改成手動切換

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

# 選讀：important

同一屬性上兩個 utility 平常看編成後的順序。`!` 寫在 class 最後，把這條宣告標成 important，用來壓過另一個 utility。能拿掉多餘的那條 class 時，不要用 `!`。寫法見 [任意變體、important、前綴](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意變體、important、前綴)。

```html 02-tailwind/pages/26-arbitrary.html
<p class="text-stone-500 text-teal-800!">這行是青綠，而且要壓過 stone。</p>
```

`text-stone-500` 與 `text-teal-800!` 都在改 `color`。後面的 `!` 讓青綠色這條變成 important，所以畫面上是青綠字。

{% note success %}
**換你試試：**
青綠色再深一階，`!` 仍留在 class 最後。色階在 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)。
{% endnote %}

<details>
<summary>參考答案</summary>

`text-teal-800!` 改成 `text-teal-900!`。`text-stone-500` 留著，才看得出 important 壓過它。

</details>

# 選讀：group 與 peer

滑過整張卡要帶動裡面的圖和標題時，父層加 `group`，子層用 `group-hover:`。兄弟之間用 `peer`：class 寫在前面的兄弟，`peer-checked:` 寫在後面的兄弟。導覽列用的是同一種 `peer`，放在這一節後面。具名寫法見 [具名 group 與 peer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#具名-group-與-peer)。

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
## 選讀：導覽列

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

# 選讀：Preflight 重置了什麼

`@import "tailwindcss"` 會帶入 Preflight。標題和段落的預設外距會被拿掉，所以沒寫 `mt-*` 時，`h1` 會貼著上一塊。盒模型是 `border-box`。圖片預設 `display: block`，最大寬度 100%。按鈕會繼承字型。某一塊突然貼在一起時，先補 `mt-4` 或父層的 `space-y-4`。

# 本篇重點回顧

- utility 是「屬性－值」：`bg-teal-700` 塗背景，`p-4` 是 1rem 內距，編譯器只認原始碼裡的完整 class。
- 沒有前綴的 class 是手機那一版，所有寬度都在。`sm:` 到 `2xl:` 是 `min-width`，夠寬才加上，更寬仍然成立。`max-md:` 只在小於 48rem 時成立。
- 整頁欄數與側欄用視窗斷點。同一張卡會放進不同欄寬時，父層加 `@container`，子層用 `@md:`；巢狀時用具名 `@container/main` 與 `@md/main:`。
- 版心是 `mx-auto max-w-6xl px-4`，或 `@utility container`。`max-w-sm` 是 24rem，和斷點 `sm:`（40rem）、變體 `max-sm:` 不是同一件事。
- `@theme` 的 `--color-brand-*` 做出 `bg-brand-*`，`--spacing-18` 做出 `p-18`，`--breakpoint-tablet` 做出 `tablet:`。
- `dark:` 預設跟系統深色。重複且改不到標籤的一串才用 `@apply`。刻度沒有的長度寫 `w-[22rem]`。
