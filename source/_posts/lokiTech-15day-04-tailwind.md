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

Tailwind CSS 把常用的 CSS 宣告做成一粒一粒的 class，稱為 utility（工具類）。你在 HTML 上組合這些 class，Vite 在開發時把它們編成瀏覽器真正看得懂的 CSS。這一篇用洛奇旅行的色票、按鈕、卡片、導覽與版心，把「為什麼這樣寫」和「檔案裡哪一段在生效」對上。

<!-- more -->

預覽以 Chrome 為準。按 <kbd>F12</kbd> 看 **Elements → Styles**，核對的是編成之後的 CSS，不是 class 名字本身。

| 大主題 | 章 | 你會用到的觀念 |
| --- | --- | --- |
| 環境 | 為什麼方便、Vite、掃描、建立專案、IntelliSense | utility、打包、JIT、pnpm、Node.js 24 |
| 配色 | 色階、透明度、品牌色、深色模式 | `bg-teal-700/50`、`@theme`、`dark:`、`@custom-variant` |
| 公式 | 按鈕、卡片、導覽、表單、排版、狀態 | 間距刻度、Flex、Grid、`hover:`、`group` |
| RWD | 手機優先、斷點、版心、自訂斷點、容器查詢 | `sm:`～`2xl:`、`container`、`@container` |
| 本篇重點回顧 | 這篇用過的觀念 | 從 class 讀回 CSS |

{% note warning %}
**注意事項**
不要裝 Bootstrap，也不要另寫 `tailwind.config.js`。v4 的主題寫在 CSS 的 `@theme`，深色若要改成手動切換，用 `@custom-variant`，不要改回舊的設定檔寫法。
{% endnote %}

# 環境

HTML 檔可以直接用瀏覽器開。Tailwind 的 class 要先編成一般 CSS，瀏覽器才知道 `p-4` 是 `padding: 1rem`。Vite 負責這段編譯，也負責本機的開發伺服器。這一章先看 utility 解決了哪三件煩惱，再看專案裡每個檔在做什麼。文件見 [安裝 Tailwind（Vite）](https://tailwindcss.com/docs/installation/using-vite) 與 [用 utility 寫樣式](https://tailwindcss.com/docs/styling-with-utility-classes)。

## 為什麼 Tailwind 方便

手寫 CSS 是先替一塊畫面取名字，再在樣式表裡把屬性寫完。畫面一多，名字要記得住、檔案要一直長大，而且兩個人很容易對同一個按鈕各寫一組不同的 padding。Utility 把設計系統裡已經量好的間距、顏色、字級做成固定詞彙，組合發生在標籤上。見 [Tailwind 的設計哲學說明](https://tailwindcss.com/docs/styling-with-utility-classes)。

{% mermaid graph LR %}
html["HTML 上的 class"] --> scan["Tailwind 掃描完整字串"]
scan --> css["只產生用到的 CSS"]
css --> vite["Vite 交給瀏覽器"]
{% endmermaid %}

### 原子化 utility 對比傳統 CSS

原子化的意思是：一個 class 只做一件小事。`p-4` 只管內距，`rounded-xl` 只管圓角，`bg-teal-700` 只管背景色。傳統寫法把這些屬性收進 `.trip-card` 這一個名字裡，HTML 很短，視覺規則在另一個檔。兩種寫法可以排出同一張行程卡。差別是你改外觀時，眼睛要停在哪裡。

傳統寫法適合「這塊元件的樣式不想在十個頁面各貼一次」的時候。Utility 適合「這一顆按鈕的留白、顏色、圓角就在標籤上看完」的時候。課堂的頁面用 utility。同一頁若要對照，可以暫時留一小段 `<style>`，那是給比較用的，不是第二套設計系統。

| | 傳統 class | utility |
| --- | --- | --- |
| 名字 | `.trip-card`、`.body` | `p-4`、`rounded-xl`、`bg-white` |
| 規則放哪 | `<style>` 或 `.css` | 標籤的 `class` |
| 改一個間距 | 找到選擇器再改宣告 | 換掉那個 class |
| 重複出現的卡片 | 共用一個名字 | 每張卡貼同一串 class |

左邊的卡片走 `<style>` 裡的 `.trip-card`，右邊同一種版面全部寫在 class 上。

```html 02-tailwind/pages/01-compare.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>傳統 CSS 與 utility</title>
    <style>
      .trip-card {
        max-width: 20rem;
        overflow: hidden;
        border-radius: 0.75rem;
        background: #fff;
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }
      .trip-card img {
        display: block;
        width: 100%;
        height: 10rem;
        object-fit: cover;
      }
      .trip-card .body {
        padding: 1rem;
      }
      .trip-card h2 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
      }
      .trip-card p {
        margin: 0.5rem 0 0;
        color: #57534e;
        font-size: 0.875rem;
      }
      .trip-card a {
        display: inline-block;
        margin-top: 1rem;
        border-radius: 0.5rem;
        background: #0f766e;
        padding: 0.5rem 1rem;
        color: #fff;
        font-weight: 500;
        text-decoration: none;
      }
    </style>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900 antialiased">
    <h1 class="mb-6 text-2xl font-bold">同一張行程卡，兩種寫法</h1>
    <div class="flex flex-col gap-8 md:flex-row">
      <article class="trip-card">
        <img src="https://picsum.photos/id/1015/800/500" alt="山間步道" />
        <div class="body">
          <h2>手寫 CSS</h2>
          <p>樣式在 head 的 style，class 是元件名字。</p>
          <a href="#book">看行程</a>
        </div>
      </article>
      <article class="max-w-xs overflow-hidden rounded-xl bg-white shadow">
        <img class="block h-40 w-full object-cover" src="https://picsum.photos/id/1016/800/500" alt="湖邊" />
        <div class="p-4">
          <h2 class="text-lg font-semibold">Tailwind utility</h2>
          <p class="mt-2 text-sm text-stone-600">同一組視覺，屬性寫在標籤的 class 上。</p>
          <a class="mt-4 inline-block rounded-lg bg-teal-700 px-4 py-2 font-medium text-white" href="#book">看行程</a>
        </div>
      </article>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

{% note info %}
**小技巧：先翻譯再往下加**
看到 `max-w-xs overflow-hidden rounded-xl bg-white shadow`，先在心裡翻成最大寬度、溢出隱藏、圓角、白底、陰影。翻得回來，才算讀懂這串 class。F12 的 Styles 會列出編成後的屬性，用它核對你的翻譯。
{% endnote %}

### 命名煩惱

元件名字要同時回答「這是什麼」和「它長怎樣」。行程卡一開始叫 `.card` 就夠。接著有人加尺寸、加顏色、加「手機要直排」，名字變成 `.card-trip-featured-mobile-stack`。下一個按鈕又要不要沿用這套形容詞，每個人的答案不一樣。讀 HTML 時你看到名字，仍然不知道 padding 是多少，得再打開 CSS。

Utility 的詞彙是全站共用的。`px-5` 在按鈕上是左右 1.25rem，在別的標籤上也是左右 1.25rem。你不用為「大顆青綠圓角按鈕」再發明一個 class。語意留給標籤：按鈕就是 `button` 或 `a`，行程就是 `article`。class 只負責外觀。

上半段是越加越長的自訂 class，下半段是拆開的 utility。

```html 02-tailwind/pages/02-naming.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>命名</title>
    <style>
      .btn-primary-lg-teal-rounded-shadow {
        display: inline-block;
        border-radius: 0.5rem;
        background: #0f766e;
        padding: 0.75rem 1.25rem;
        color: #fff;
        font-weight: 600;
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.12);
        text-decoration: none;
      }
      .card-trip-featured-mobile-stack {
        max-width: 24rem;
        border: 1px solid #e7e5e4;
        border-radius: 1rem;
        background: #fff;
        padding: 1rem;
      }
    </style>
  </head>
  <body class="space-y-8 bg-stone-50 p-6 text-stone-900">
    <section>
      <h1 class="text-2xl font-bold">名字要描述外觀時，會越加越長</h1>
      <a class="btn-primary-lg-teal-rounded-shadow mt-4" href="#tours">手寫的長名字</a>
      <article class="card-trip-featured-mobile-stack mt-4">
        <h2>精選行程卡</h2>
        <p>class 把尺寸、顏色、圓角、使用情境全部塞進一個名字。</p>
      </article>
    </section>
    <section>
      <h2 class="text-2xl font-bold">同一件事拆成看字面就懂的碎片</h2>
      <a class="mt-4 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white shadow" href="#tours">
        報名這梯
      </a>
      <article class="mt-4 max-w-sm rounded-2xl border border-stone-200 bg-white p-4">
        <h2 class="text-lg font-semibold">台北城市漫遊</h2>
        <p class="mt-2 text-stone-600">三天。圓角、邊框、留白各自一個 class。</p>
      </article>
    </section>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

{% note warning %}
**注意事項**
兩個 utility 若改到同一個 CSS 屬性，誰勝出看的是編成後樣式表裡的順序，不是 `class=""` 裡面誰寫在右邊。`p-4 p-8` 這種重複不要留。要改內距，就只留一個 `p-*`。
{% endnote %}

### 檔案膨脹

如果一開始就把 Tailwind 所有可能的 class 都放進 CSS，檔案會大到不適合正式站。正式的做法是掃描你的原始碼，只把出現過的 class 編成規則。你沒寫過的 `bg-teal-200` 就不會出現在產出裡。開發時看起來「什麼 class 都能用」，是因為編譯器隨時在補你剛打上去的那幾條，不是因為瀏覽器內建了這本字典。

這一頁只用標題、一段內文、一個色塊。點標題時，Styles 裡會有字級、字重和青綠色。那些屬性來自編譯結果。瀏覽器並不認識 `text-2xl` 這個單字；拿掉編譯、改用檔案協定直接開這份 HTML，utility 會全部失效。

```html 02-tailwind/pages/03-size.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>只輸出用到的 class</title>
  </head>
  <body class="bg-white p-6 text-stone-900">
    <h1 class="text-2xl font-bold text-teal-800">這一頁只用少數幾個 class</h1>
    <p class="mt-4 max-w-prose text-stone-700">
      按 F12，在 Elements 裡點標題，Styles 會看到字級、字重與青綠色。那些規則是編譯出來的，不是瀏覽器認得
      text-2xl 這個單字。
    </p>
    <p class="mt-4 rounded-lg bg-teal-50 p-4 text-teal-900">色塊來自 bg-teal-50 與 text-teal-900。</p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

#### 選讀：瀏覽器裡的 Play CDN

有些舊教學讓你在 `head` 貼一段 `cdn.tailwindcss.com` 的 script，class 就能在沒有 Node 的頁面上變色。那段 script 會在瀏覽器裡臨時編譯，並帶上一大包樣式，正式站的體積與快取都不好控，也沒有這個專案的 `@theme`。課堂一律走 Vite。看到教學要你貼那條 script，或要你寫 `tailwind.config = { theme: { extend: ... } }`，把它當成舊路徑，不要放進頁面。

## 什麼是 Vite

Vite 是這個專案的開發伺服器，也是最後打包用的工具。你寫的 `index.html` 仍是瀏覽器的入口；`src/main.js` 用 `import` 把 CSS 拉進來。開發時 Vite 依原生 ES module 按需要送檔，存檔後替換有改過的模組。正式產出才把檔案收成 `dist/`。說明見 [為什麼用 Vite](https://vite.dev/guide/why.html)。

{% mermaid graph TD %}
src["index.html 與 pages/*.html"] --> dev["pnpm dev：開發伺服器"]
src --> build["pnpm build：產出 dist/"]
dev --> browser["瀏覽器看 Local 網址"]
build --> preview["pnpm preview：看打包結果"]
{% endmermaid %}

### 為什麼要開發伺服器

直接用檔案協定打開 HTML 時，瀏覽器會擋住一部分模組請求，CSS 的 `import` 也不會被 Vite 處理。開發伺服器給你一個 `http://localhost` 開頭的網址，路徑 `/src/main.js`、`/pages/01-compare.html` 都從專案根目錄算。你改 class、存檔，Vite 通知瀏覽器更新，通常不用自己按重新整理。

`pnpm dev` 對應 `package.json` 裡的 `"dev": "vite"`。關掉那個終端機或按 <kbd>Ctrl</kbd>+<kbd>C</kbd>，網址就會連不上。埠被占用時，Vite 會改印另一個埠，以終端機那一行 Local 為準。

### 為什麼要打包

開發伺服器為了改得快，檔案是分開送的。正式站要的是較少的請求、壓過的 CSS、以及可以快取的檔名。`pnpm build` 會掃描專案、產出只用到的 CSS，放到 `dist/`。`pnpm preview` 用一個靜態伺服器把 `dist/` 跑起來，用來確認打包後還看不看得懂，而不是繼續改程式的地方。`dist/` 與 `node_modules/` 都在 `.gitignore`，刪掉之後可以再裝、再打包。

{% note warning %}
**注意事項**
這個專案是前端頁面。不要在這裡加 Express 或別的後端框架。圖片用 [picsum.photos](https://picsum.photos/) 的網址即可，不要把圖檔放進倉庫。
{% endnote %}

## Tailwind 背後的原理

Tailwind CSS v4 的引擎在你存檔時工作：讀原始碼裡的 class、對上主題變數、寫出對應的 CSS 規則。它不是一張事先印好的萬用樣式表。Just-in-Time（JIT，用到才產生）指的就是這件事。v4 的編譯一直是這種模式，不需要在設定檔裡打開某個開關。插件是 `@tailwindcss/vite`，入口 CSS 只有一行 `@import "tailwindcss"`。

### 掃描 class、產生 CSS

掃描看的是原始碼文字，不是瀏覽器執行之後的 DOM。檔案裡出現完整的 `bg-teal-700`，這條規則就會被產生。`bg-${color}-700` 這種接起來的字串，掃描器看不到最後會變成哪一個 class，所以不會產生。v4 會自己找專案裡的模板檔，不用再寫以前的 `content: ["./index.html"]`。被 `.gitignore` 忽略的目錄（包含 `node_modules/`）不會拿去掃。

開發時，樣式表收的是**整個專案**掃到的 class，不是「只有你正在看的那一頁」。所以別頁用過的 `p-4`，這一頁也拿得到。`pnpm build` 的 CSS 同樣是全專案的集合。沒有任何檔案寫過的那個完整 class，才會真的缺席。

### 只輸出用到的

第一段的 `bg-teal-700` 是原始碼裡的完整字串，背景是青綠。第二段的背景 class 由一段小 script 把 `rose` 接成 class 名字。原始碼裡沒有那個完整字串，背景就不會變。框線仍在，因為 `border` 是寫死在標籤上的。

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

{% note danger %}
**不要把顏色接成 class**
顏色若會變，就把每一個可能用到的完整 class 寫在原始碼裡，用條件決定套哪一個，例如 `isFull ? "bg-stone-300" : "bg-teal-700"`。兩個分支都是完整字串，掃描才看得到。不要寫 `bg-${name}-700`。
{% endnote %}

## 用 pnpm 建立專案

套件管理只用 pnpm。Node.js 用 24，`package.json` 的 `engines.node` 寫著 `>=24`。Vite 負責開發伺服器，也負責把目錄頁和每一節 HTML 收成打包入口。

### Node.js 24 與 pnpm

Node.js 是跑 Vite 與 Tailwind 編譯器的執行環境。終端機輸入 `node -v`，主版本應是 24。pnpm 用來安裝 `package.json` 裡列出的套件，並用 `pnpm-lock.yaml` 讓每個人裝到同一組版本。還沒有 pnpm 時，先執行 `corepack enable`，然後開一個新的終端機，再 `pnpm -v`。

```bash
pnpm install
pnpm dev
```

`pnpm install` 會依 lock 檔下載套件到 `node_modules/`。這個資料夾不要 commit。刪掉之後再下一次 `pnpm install` 就會裝回來。

若要從空白目錄重做一次同一種專案，指令是下面這組。課堂用已經裝好套件的專案即可，不必再 `create` 一次。模板是 `vanilla`，也就是沒有框架的 HTML、CSS 與 JavaScript。

```bash
pnpm create vite@latest 02-tailwind --template vanilla
cd 02-tailwind
pnpm add -D tailwindcss @tailwindcss/vite vite-plugin-html-inject
```

### 入口與設定

`@tailwindcss/vite` 讓 Vite 在處理 CSS 時跑 Tailwind。`vite-plugin-html-inject` 把選單嵌進 HTML。`build.rollupOptions.input` 的入口是目錄頁，加上 `pages/` 裡每一份副檔名是 `.html` 的檔。新加一頁、檔名仍放在這個資料夾，打包就會把它算進去。

```js 02-tailwind/vite.config.js
import { readdirSync } from "node:fs";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import injectHTML from "vite-plugin-html-inject";

const pages = readdirSync("pages")
  .filter((name) => name.endsWith(".html"))
  .sort()
  .map((name) => `pages/${name}`);

export default defineConfig({
  plugins: [injectHTML({ replace: { undefined: "false" } }), tailwindcss()],
  build: {
    rollupOptions: {
      input: ["index.html", ...pages],
    },
  },
});
```

`replace.undefined` 那一行留在設定檔。選單裡沒被這一頁指定的 `{=$…}` 會變成文字 `false`。頁面本身不用為了選單寫 JavaScript。

### 共用選單

class 要先編成 CSS，所以每一節是 Vite 的一個 HTML 入口。目錄的網址是 `/`，各節是 `/pages/…`。選單的 markup 只寫一份。開發與打包時，插件讀每一頁 body 開頭的 `<load>`，把同一份嵌進去。選單上的 class 會跟各頁一起被掃描。

選單是貼在視窗上方的頂欄：`sticky top-0`。同一批連結寫兩次。寬螢幕那份是 `nav`，class 是 `hidden md:flex`，夠寬就橫排換行。窄螢幕那份放進 `<details>` 與 `<summary>`，外層是 `md:hidden`，按「選單」才打開。這樣關掉的 `details` 不會把桌面連結藏起來。目前這一頁的連結帶 `aria-current="page"`，外觀用 `aria-[current=page]:`。深色用 `dark:`。內層有 `container`，左右留白是 `px-4` 與 `sm:px-6`。`container` 的最大寬度留到版心那一節，用 `@utility` 自己定義。

目錄頁的路徑從專案根目錄算：

```html
<load src="./partials/nav.html" home="page" />
```

各節多一層，屬性號碼對到這一頁：

```html
<load src="../partials/nav.html" p01="page" />
```

`p01` 對上選單裡的 `{=$p01}`，值固定寫 `page`。這一行保持自閉合，插件才認得。下面各節的 HTML 從該節的內容寫起，不重複貼 `<load>`；頁面上仍要留著那一行，頂欄才會出現。導覽那一節自己的 `header`（checkbox 與 `peer`）跟這份全站選單是兩份。

沒有這行 import，HTML 上的 utility 不會進到頁面。

```js 02-tailwind/src/main.js
import "./style.css";
```

多數頁面在 `body` 結尾載入它：

```html
<script type="module" src="/src/main.js"></script>
```

`type="module"` 讓瀏覽器以模組方式載入，Vite 才處理得了裡面的 `import`。路徑以 `/` 開頭，表示專案根目錄，不要寫成 `../src/main.js`。手動深色那一頁改載入 `/src/dark-toggle.js`，那個檔自己會再 import CSS。v4 不靠 `tailwind.config.js` 才會動。

### Prettier

排版交給 Prettier，不把 `prettier.semi` 這類鍵寫進個人的使用者設定。全專案同一套：要分號、雙引號、2 空格。這一階段不放 ESLint；規則跟專案的設定檔走，React 那個專案才會再加。

```json 02-tailwind/.prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
}
```

## VS Code IntelliSense

Tailwind CSS IntelliSense 會在你打 class 時列出候補、色票與編成後的 CSS。它讀得到 v4，是因為入口 CSS 裡有 `@import "tailwindcss"`。

游標停在 `bg-teal-700` 上時，懸停應出現背景色的說明；往下打 `bg-` 時應跳出色族。沒有候補時，先確認套件已啟用、入口 CSS 的 import 還在。候補是輔助，仍然要能把 class 翻回 CSS。

{% note info %}
**小技巧：候補裡先看數字**
色階候補會一次列出 50 到 950。內文與按鈕先在 700、800 裡挑，淺底先在 50、100 裡挑。不要只因為候補排在前面就選 500。
{% endnote %}

# 配色

Tailwind 的顏色是一組命名好的色族，每一族再分成由淺到深的色階。你用 `text-`、`bg-`、`border-` 決定這顆顏色塗在字、底還是框上。品牌色不在預設色票裡時，用 `@theme` 加進同一套名字。深色則是在同一顆元素上再寫一組 `dark:`。色票總表見 [Colors](https://tailwindcss.com/docs/colors)，自訂變數見 [Theme variables](https://tailwindcss.com/docs/theme)。

## 預設色票與色階

每個色族有 11 階：`50`、`100`、`200`、`300`、`400`、`500`、`600`、`700`、`800`、`900`、`950`。數字越小越淺。`50` 與 `100` 適合大面積的底，`700` 以上適合字或實心按鈕。`500` 常常太亮，直接當正文會和白底黏在一起。

預設色族可以分成三群來記。彩色：`red`、`orange`、`amber`、`yellow`、`lime`、`green`、`emerald`、`teal`、`cyan`、`sky`、`blue`、`indigo`、`violet`、`purple`、`fuchsia`、`pink`、`rose`。中性：`slate`、`gray`、`zinc`、`neutral`、`stone`，另外還有較新的 `mauve`、`olive`、`mist`、`taupe`。再加上 `white` 與 `black`，這兩個沒有色階。

這些顏色在主題檔裡用 `oklch()` 記錄，讓同一階的深淺在不同色族上比較接近。你寫頁面時仍寫 `bg-teal-700`，不必手寫 `oklch`。F12 裡看到的計算結果是那個顏色函數，和 class 名字指的是同一顆色。

課堂的旅行頁以 `teal` 當主色、`stone` 當中性色。`stone` 帶一點暖灰，大段內文比純黑耐看。警告與刪除才用 `rose` 或 `red`，而且要深字配淺底。

上一列是 teal 的 11 階，下一列是幾個色族的 500，用來比較色相。

```html 02-tailwind/pages/05-palette.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>色票與色階</title>
  </head>
  <body class="bg-white p-6 text-stone-900">
    <h1 class="text-2xl font-bold">teal 的色階</h1>
    <p class="mt-2 max-w-prose text-stone-600">數字越小越淺。50 當底，700 以上當字或實心按鈕。</p>
    <ul class="mt-6 grid max-w-lg gap-2">
      <li class="rounded px-3 py-2 bg-teal-50 text-teal-950">50 最淺底</li>
      <li class="rounded px-3 py-2 bg-teal-100 text-teal-950">100</li>
      <li class="rounded px-3 py-2 bg-teal-200 text-teal-950">200</li>
      <li class="rounded px-3 py-2 bg-teal-300 text-teal-950">300</li>
      <li class="rounded px-3 py-2 bg-teal-400 text-teal-950">400</li>
      <li class="rounded px-3 py-2 bg-teal-500 text-white">500 中間</li>
      <li class="rounded px-3 py-2 bg-teal-600 text-white">600</li>
      <li class="rounded px-3 py-2 bg-teal-700 text-white">700 按鈕常用</li>
      <li class="rounded px-3 py-2 bg-teal-800 text-white">800</li>
      <li class="rounded px-3 py-2 bg-teal-900 text-white">900</li>
      <li class="rounded px-3 py-2 bg-teal-950 text-white">950 最深</li>
    </ul>
    <h2 class="mt-10 text-xl font-semibold">幾個色族的 500</h2>
    <ul class="mt-4 flex flex-wrap gap-2 text-sm text-white">
      <li class="rounded px-3 py-2 bg-red-500">red</li>
      <li class="rounded px-3 py-2 bg-amber-500 text-amber-950">amber</li>
      <li class="rounded px-3 py-2 bg-emerald-500">emerald</li>
      <li class="rounded px-3 py-2 bg-sky-500">sky</li>
      <li class="rounded px-3 py-2 bg-indigo-500">indigo</li>
      <li class="rounded px-3 py-2 bg-rose-500">rose</li>
      <li class="rounded px-3 py-2 bg-stone-500">stone</li>
    </ul>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

{% note warning %}
**注意事項**
`amber-500` 很亮，白字會糊掉，所以那一格改用 `text-amber-950`。淺底配淺字、深底配深字，都先換色階，不要先把字級放大來補對比。
{% endnote %}

## 透明度

`bg-teal-700/50` 的斜線後面是不透明度：50 表示 50%。字色、背景、邊框、置入的白都可以加。`/50` 讓底下的像素參加混合，它不是另一階灰色。頁面底若是暖黃，半透明的青綠會混出髒一點的綠；底若是白，看起來只是變淡。

常用的刻度是 `/5`、`/10`、`/20`、`/25`、`/30`、`/40`、`/50`、`/60`、`/70`、`/75`、`/80`、`/90`、`/95`。不寫斜線就是完全不透明。整顆元素變淡用 `opacity-50`，那會連子元素的字一起淡。只想讓背景透、字保持清楚時，把斜線加在 `bg-` 上，不要加在外層的 `opacity-`。

頁面底是 `bg-amber-100`，用來讓透明看得到。

```html 02-tailwind/pages/06-opacity.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>透明度</title>
  </head>
  <body class="bg-amber-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">斜線後面是不透明度</h1>
    <p class="mt-2 max-w-prose">頁面底是琥珀色。方塊越透明，底下的黃越透出來。</p>
    <div class="mt-6 grid max-w-lg gap-3">
      <div class="rounded-lg bg-teal-700 px-4 py-6 text-white">bg-teal-700 不透明</div>
      <div class="rounded-lg bg-teal-700/75 px-4 py-6 text-white">bg-teal-700/75</div>
      <div class="rounded-lg bg-teal-700/50 px-4 py-6 text-teal-950">bg-teal-700/50</div>
      <div class="rounded-lg border border-teal-800/40 bg-white/70 px-4 py-6">白底 70%，框 40%</div>
      <p class="text-teal-950/60">這行字是 text-teal-950/60，整行一起變淡。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## 文字、背景與邊框

三個前綴對三個屬性。`text-teal-900` 是 `color`，`bg-teal-50` 是 `background-color`，`border-teal-800` 是 `border-color`。只寫 `border` 會得到預設寬度與實線，顏色要另外加，否則會是當前文字色。`border-2`、`border-b-2` 改的是寬度與哪一邊。

同一塊訊息用同一個色族：淺底、深字、稍深的框。正文用 `text-stone-600` 或 `text-stone-700`，標題用 `text-stone-900` 或 `text-teal-900`。純黑 `text-black` 在長文裡偏硬，旅行頁的內文留在 stone。

```html 02-tailwind/pages/07-paint.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文字、背景、邊框</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-800">
    <h1 class="text-2xl font-bold text-teal-900">文字色用 text-</h1>
    <p class="mt-3 max-w-prose text-stone-600">內文用 stone-600，比純黑柔，也還讀得清楚。</p>
    <div class="mt-6 max-w-md rounded-xl border border-teal-800 bg-teal-50 p-5">
      <p class="text-sm font-medium text-teal-800">邊框 border-teal-800</p>
      <p class="mt-2 text-teal-950">底是 bg-teal-50，字是 text-teal-950。</p>
    </div>
    <div class="mt-4 max-w-md rounded-xl border-2 border-rose-600 bg-rose-50 p-5 text-rose-900">
      取消行程時用較深的字配淺底，框用同一個色族。
    </div>
    <p class="mt-6 inline-block border-b-2 border-teal-600 text-teal-800">只有底線的連結樣式</p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## 用 @theme 自訂品牌色

預設的 `teal` 已經很好用。品牌色要有一個專案內的名字時，在 CSS 裡用 `@theme` 宣告 `--color-` 開頭的變數。`--color-brand-700: #0f766e` 會同時做出 `bg-brand-700`、`text-brand-700`、`border-brand-700`，也會變成畫面上可用的 CSS 變數 `var(--color-brand-700)`。色階仍建議做成 50 到 950，和預設色票同一套數字，之後換深淺才不會另起爐灶。

`@theme` 會和 Tailwind 內建的主題合併。你新增 `brand` 不會刪掉 `teal`。若變數名字和內建的相同，例如你再宣告一次 `--color-teal-700`，那個內建值會被蓋掉。課堂只新增 `brand`，不去覆蓋整份預設色票。

品牌色寫進 `@theme`。頁面底、標題與按鈕都用 `brand`。斷點兩行可以先放在同一段，版心的 `@utility` 留到後面再補。

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
  --breakpoint-tablet: 52rem;
  --breakpoint-3xl: 120rem;
}
```

斷點兩行留到 RWD 那一章再用。品牌色這一段現在就可以對著頁面看。

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

{% note info %}
**小技巧：變數與 utility 是同一顆色**
`class="bg-brand-700"` 和 `style="background-color: var(--color-brand-700)"` 指到同一個值。頁面仍優先用 class。`var()` 留到你在少數手寫 CSS 裡要對齊品牌色的時候。
{% endnote %}

### 選讀：覆寫、inline 與 static

`@theme` 裡寫 `--color-*: initial;` 會清掉全部預設顏色，只留下你接著宣告的那些。旅行頁還要用 `stone` 與 `teal`，所以不要加這行。只想改掉單一階時，重新宣告那個變數即可，例如 `--color-teal-700: #115e59;`。

`@theme inline` 讓 utility 把值直接寫進規則，而不是執行時再去讀那顆 CSS 變數。常見用途是字體已經由別的管道定義成變數，你希望 `font-sans` 跟它走。一般品牌色用普通的 `@theme` 就夠。

`@theme static` 會連「專案裡沒出現過的 class」也產生出來。它讓檔案變大。課堂的頁面都不需要。動態顏色請回到完整字串那條規則，不要靠 static 把整份色票都留下。

| 寫法 | 什麼時候用 |
| --- | --- |
| `@theme` | 新增品牌色、自訂斷點。沒用到的 class 不會輸出 |
| `@theme inline` | utility 要直接寫入另一個變數的值 |
| `@theme static` | 確定某個值必須留在 CSS 裡，即使原始碼沒寫到那個 class |

## 深色模式

`dark:` 是一個 variant（變體）：條件成立時，後面的 utility 才套上。v4 的預設條件是作業系統的深色外觀，對應 CSS 的 `prefers-color-scheme: dark`。見 [MDN：prefers-color-scheme](https://developer.mozilla.org/zh-TW/docs/Web/CSS/@media/prefers-color-scheme) 與 [Dark mode](https://tailwindcss.com/docs/dark-mode)。

同一顆元素先寫淺色用的 class，再寫 `dark:` 開頭的那一組。不要做兩份 HTML。表單控制項的原生顏色用 `scheme-light` 與 `dark:scheme-dark` 跟著走，勾選框與輸入框才不會在深底上仍是白花花的系統樣式。

### 預設跟著系統

沒有在 CSS 裡改 `dark` 的定義時，`dark:bg-teal-950` 只在系統偏好深色時生效。你的頁面沒有開關。檢查方式是改作業系統的外觀，或在 Chrome 開發者工具的 Rendering 面板把 `prefers-color-scheme` 設成 `dark`。設完不用改 HTML。

#### 在工具裡切換偏好

系統外觀不一定能在教室裡馬上改。Chrome 可以只對這個分頁假裝成深色，頁面的 class 不用動。下面兩步是同一件事：先讓媒體特性成立，再看淺色與深色兩組 class 怎麼分工。

##### 找到 Rendering

按 <kbd>F12</kbd>，打開 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>），執行 **Show Rendering**。面板裡的 **Emulate CSS media feature prefers-color-scheme** 選 `prefers-color-scheme: dark`。這一頁的 `dark:` 應立刻套上。選回 `no preference` 或 `light` 就回到淺色那組 class。

##### 淺色與深色各寫一組

淺色是沒有前綴的 class，深色是 `dark:`。寬度變體可以再疊在前面，例如 `md:dark:bg-teal-900`，讀的時候先看斷點、再看深色、最後看屬性。這一頁先不疊斷點，只看顏色。

這一頁載入的是會 import 全站 CSS 的模組，沒有 `@custom-variant`，所以 `dark:` 仍跟系統。

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

### 用 @custom-variant 改成手動切換

有些產品要一顆按鈕，讓這一頁的深色和作業系統分開。做法是重新定義 `dark` 這個 variant：當元素自己帶有 `dark` class，或它的某個祖先帶有 `dark` class 時，`dark:` 才生效。Tailwind 的寫法是：

```css
@custom-variant dark (&:where(.dark, .dark *));
```

`&` 代表正在套用這個 variant 的那個元素。`.dark` 是 html 上的 class。`.dark *` 是它的後代。按鈕只負責在 `document.documentElement`（也就是 `<html>`）上切換這個 class。

這一行若寫進全站的入口 CSS，每一頁的 `dark:` 都會改看 class，跟著系統的那一頁就不再跟系統。所以它放在另一份 CSS，只有切換頁的腳本會 import 它。

```css 02-tailwind/src/dark-manual.css
@custom-variant dark (&:where(.dark, .dark *));
```

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

第一次打開時，若你還沒按過按鈕，就先跟系統偏好走，並把結果寫成 html 的 class。按按鈕會切換 class，並把 `dark` 或 `light` 存進 `localStorage`，重新整理才不會跳回去。按鈕文字跟當下狀態走：已經是深色時，按鈕寫「切換亮色」。

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

{% note warning %}
**注意事項**
F12 點 `<html>`，手動加上或拿掉 class `dark`，卡片應跟著變。這可以分開檢查「class 有沒有寫對」和「按鈕的 JavaScript 有沒有跑」。這一頁的 script 是 `dark-toggle.js`。若仍載入 `main.js`，就不會定義手動的 `dark` variant。
{% endnote %}

# 公式

Utility 可以疊。一顆按鈕通常是形狀、底色、內距、字重、文字色這幾粒加在一起。你不需要背完整份清單。先記住這一章的幾種版面，其餘用文件與公式表把 class 翻回 CSS。狀態（滑過、聚焦）與斷點都寫在 class 的前綴，稱為 variant。見 [Hover, focus, and other states](https://tailwindcss.com/docs/hover-focus-and-other-states)。

整份對照表在 {% post_link lokiTech-15day-05-tailwind-cheatsheet TailwindCSS v4.1 公式表 %}。那一頁依版面、Flex、間距、文字、背景、邊框、陰影、轉場分開列。查的時候先對中文小節，再看「類別名稱」與「CSS 屬性」兩欄。官方文件則是一個主題一頁，頁首有 class 的組成方式，頁尾有客製。

## 按鈕

按鈕有三種常用外形。實心用深底白字，是這一頁的主要動作。線框用白底加深色邊，是次要動作。文字按鈕只有字色，滑過才加底線，用來當「返回」這類較輕的動作。停用時加 HTML 的 `disabled`，並把顏色換成 stone，游標用 `cursor-not-allowed`。

連結去別的網址或錨點，用 `<a>`。在這一頁做事情，用 `<button type="button">`。不要用 `<div>` 假裝按鈕。`inline-flex items-center` 讓文字在按鈕裡垂直居中；只有文字、沒有圖示時，`inline-block` 也夠。

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
      <a class="inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800" href="#tours">
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

## 卡片

卡片把一張圖、一個地點、一段摘要和價錢收在同一個 `article`。外層 `overflow-hidden` 配 `rounded-2xl`，圖片的角才會跟著卡片切齊。`h-44 w-full object-cover` 把不同比例的照片裁成同一高度，頁面才不會被某一張直幅圖拉得很長。`shadow-md` 讓卡片離開底色一點點。

內文用 `space-y-2` 或各自的 `mt-*` 都可以。`space-y-2` 是「直向的子元素之間隔 0.5rem」，第一個子元素上面不會多一塊。價錢用較深的 teal，和說明的 `text-stone-600` 分開。

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

## 導覽列

窄螢幕放不下橫向連結時，用一顆核取方塊當開關，不要複製兩套 `nav`。`input` 用 `peer`，`nav` 用 `peer-checked:flex`。方塊本身用 `sr-only` 移出視覺，仍留在無障礙樹裡，標籤的 `for` 對到它的 `id`。預設 `nav` 是 `hidden`；勾選後變成 flex 直向，並且用絕對定位蓋住內容。

寬度到達 `md`（48rem，約 768px）時，`md:static md:flex md:flex-row` 把導覽放回文件流、改成橫排，`md:hidden` 把「選單」標籤收起來。`md:bg-transparent md:p-0` 清掉手機選單那層底色與內距。

把視窗拉到約 390px 寬按「選單」，再拉過 768px 看橫排。

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

{% note info %}
**小技巧：peer 必須是前一個兄弟**
`peer` 寫在核取方塊上，`peer-checked:` 寫在**後面的**兄弟元素上。把 `nav` 移到 `input` 前面，勾選就不會打開選單。F12 看 `#nav-toggle` 的 `checked`。
{% endnote %}

## 表單欄位

每個欄位是一個標籤加一個控制項。`label` 的 `for` 對到 `input` 的 `id`，點文字也能聚焦。輸入框用 `w-full` 撐滿表單，`border` 畫出範圍。聚焦時用 `focus-visible:` 加環，讓鍵盤使用者看得到位置；滑鼠點一下不必留下粗環。`outline-none` 要和 `focus-visible:ring-2` 一起出現，否則聚焦時會什麼標記都沒有。

核取方塊用 `accent-teal-700` 把系統的強調色改成品牌附近的青。送出鈕是 `type="submit"`。這一頁的 `action` 是 `#`，按下去只停在本頁，不會把資料送到別的伺服器。

用 <kbd>Tab</kbd> 走過欄位，環應出現在目前這格。

```html 02-tailwind/pages/14-form.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>表單欄位</title>
  </head>
  <body class="bg-stone-50 p-6 text-stone-900">
    <form class="mx-auto max-w-md space-y-4 rounded-2xl bg-white p-6 shadow" action="#" method="get">
      <h1 class="text-xl font-bold">索取行程表</h1>
      <div>
        <label class="mb-1 block text-sm font-medium" for="guest">姓名</label>
        <input
          id="guest"
          name="guest"
          class="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus-visible:border-teal-700 focus-visible:ring-2 focus-visible:ring-teal-600"
          type="text"
          autocomplete="name"
          required
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium" for="mail">Email</label>
        <input
          id="mail"
          name="mail"
          class="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus-visible:border-teal-700 focus-visible:ring-2 focus-visible:ring-teal-600"
          type="email"
          autocomplete="email"
          required
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium" for="note">想去的地區</label>
        <textarea
          id="note"
          name="note"
          class="min-h-28 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus-visible:border-teal-700 focus-visible:ring-2 focus-visible:ring-teal-600"
          rows="4"
        ></textarea>
      </div>
      <label class="flex items-center gap-2 text-sm">
        <input class="size-4 accent-teal-700" type="checkbox" name="copy" />
        寄一份副本給我
      </label>
      <button class="w-full rounded-lg bg-teal-700 py-2 font-medium text-white hover:bg-teal-800" type="submit">
        送出（停在本頁）
      </button>
    </form>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## 間距、尺寸與字體

Tailwind 的間距刻度來自 `--spacing: 0.25rem`。數字乘上 0.25rem 就是長度。`p-4` 是四邊 `1rem`（預設字級 16px 時約 16px）。`px-4` 只有左右，`py-2` 只有上下，`pt-6` 只有上，`mx-auto` 是左右外距自動（用來水平置中），`mt-4` 是上外距。負的外距寫成 `-mt-4`。

`gap-4` 用在 Flex 或 Grid 的子項目之間。`space-y-4` 用在一般直向子元素之間。不要在同一個軸上又寫 `gap` 又寫 `space-y`，間距會叠兩次。

尺寸方面，`w-full` 是寬度 100%，`w-1/2` 是一半，`max-w-md` 大約 28rem，`max-w-prose` 讓一行字不要拉得太長。`size-4` 同時設定寬與高。`min-h-screen` 至少一個視窗高。

字級用 `text-xs` 到 `text-9xl`。`text-base` 是 1rem。字重用 `font-normal`、`font-medium`、`font-semibold`、`font-bold`。`leading-6` 是行高 1.5rem。`tracking-wide` 把字距拉開一點，適合全大寫或短標籤；中文長文不要加字距。`font-sans` 走系統無襯線，`font-mono` 用來排價錢這類希望對齊的數字。

| class | 約略結果 | 常用在 |
| --- | --- | --- |
| `p-2` / `p-4` / `p-6` | 0.5rem / 1rem / 1.5rem | 按鈕、卡片、頁面留白 |
| `gap-3` / `gap-4` | 0.75rem / 1rem | 導覽連結、卡片牆 |
| `text-sm` / `text-base` / `text-2xl` | 0.875rem / 1rem / 1.5rem | 說明、內文、小標題 |
| `max-w-sm` / `max-w-6xl` | 24rem / 72rem | 單張卡、整頁版心 |
| `rounded-lg` / `rounded-2xl` | 0.5rem / 1rem | 按鈕、卡片 |

方塊的寬高與下面幾行字級是刻度的樣品，不是一張完成的旅行頁。

```html 02-tailwind/pages/15-scale.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>間距、尺寸、字體</title>
  </head>
  <body class="space-y-8 bg-white p-6 text-stone-900">
    <section>
      <h1 class="text-2xl font-bold">間距以 0.25rem 為一格</h1>
      <div class="mt-4 flex items-end gap-4">
        <div>
          <div class="size-4 bg-teal-700"></div>
          <p class="mt-1 text-xs">size-4</p>
        </div>
        <div>
          <div class="h-8 w-16 bg-teal-600"></div>
          <p class="mt-1 text-xs">w-16 h-8</p>
        </div>
        <div>
          <div class="w-40 bg-teal-100 p-4 text-sm">p-4 內距</div>
        </div>
      </div>
      <p class="mt-4 max-w-md text-stone-600">外距 mt-4 把這段推離上一塊。max-w-md 限制行長。</p>
    </section>
    <section class="space-y-2">
      <p class="text-xs">text-xs 註記</p>
      <p class="text-sm">text-sm 輔助</p>
      <p class="text-base">text-base 內文</p>
      <p class="text-lg">text-lg</p>
      <p class="text-2xl font-semibold">text-2xl font-semibold</p>
      <p class="text-4xl font-bold tracking-tight">text-4xl 標題</p>
      <p class="font-sans">font-sans 無襯線</p>
      <p class="font-mono text-sm">font-mono 12,800</p>
    </section>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

更全的對照（`m-auto`、`w-screen`、`line-clamp-2`、`tracking-*`）查公式表的 Spacing、Sizing、Typography 三節。

## Flex 與 Grid

一列裡要兩端對齊、中間留白，用 Flex。`flex` 打開彈性盒，`items-center` 交叉軸置中，`justify-between` 主軸兩端分開，`gap-4` 是項目之間的距離，`flex-wrap` 放不下就換行。`flex-col` 改成直向。

多張卡片要等寬、自動換欄，用 Grid。`grid` 打開格線，`grid-cols-1` 是一欄，`sm:grid-cols-2` 與 `lg:grid-cols-3` 在較寬時加欄。`gap-4` 同時管行與列的縫。單張卡裡的標題與內文不必再套 Grid，用一般的區塊往下排即可。

上半是頁首那種 Flex，下半是會隨寬度加欄的卡片牆。

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

| 你想做的事 | class |
| --- | --- |
| 橫排、垂直置中 | `flex items-center` |
| 左右貼邊 | `justify-between` |
| 放不下就換行 | `flex-wrap` |
| 預設一欄、夠寬三欄 | `grid grid-cols-1 lg:grid-cols-3` |
| 子項目之間的縫 | `gap-4` |

## 狀態、group 與 transition

`hover:` 在指標移到元素上時套用。`focus-visible:` 在鍵盤聚焦時套用。`disabled:` 在停用時套用。這些前綴可以疊在斷點後面：`md:hover:bg-teal-800` 表示夠寬、而且滑過，才換背景。觸控螢幕沒有可靠的 hover，所以重要的資訊不要只靠滑過才出現。

`group` 放在父層，`group-hover:` 放在子層。滑過整張卡片時，圖片可以放大、標題可以變色，即使游標沒有正好停在那一行字上。父層要有 `overflow-hidden`，放大的圖片才不會溢出圓角。

`transition` 讓顏色、陰影、變形在兩個狀態之間補間。`duration-200` 約 200 毫秒，`duration-300` 稍慢，適合圖片縮放。不要對會改變版面寬高的屬性做很長的動畫。

`peer` / `peer-checked:` 在導覽那一節已經用過。這裡再做一顆「我已閱讀」：勾選後才顯示下一句。`sr-only` 把方塊移出畫面，標籤仍點得到。

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
      class="inline-block rounded-lg bg-teal-700 px-4 py-2 font-medium text-white transition duration-200 hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
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
      <label class="inline-block cursor-pointer rounded border border-stone-300 px-3 py-1 peer-checked:border-teal-700 peer-checked:bg-teal-50" for="agree">
        我已閱讀行前說明
      </label>
      <p class="mt-2 hidden text-sm text-teal-800 peer-checked:block">勾選後這行才出現。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### 選讀：任意值與 @apply

刻度沒有的長度可以寫在方括號裡，例如 `mt-[13px]`、`grid-cols-[1fr_2fr]`。方括號裡的空格要寫成底線，`_` 會被當成空白。能用 `p-4`、`gap-3` 這類刻度就不要寫任意值，否則每一頁的間距又會各長各的。

`@apply` 可以在手寫 CSS 裡把 utility 收成一個 class。它適合你改不到標籤的場合。標籤在你手上時，class 直接寫在 HTML。大量 `@apply` 會把「名字對不上視覺」的問題換一套檔案再出現一次。

```css
.trip-kicker {
  @apply text-xs font-medium tracking-wide text-teal-700;
}
```

## 怎麼讀官方文件與公式表

一條 class 從左讀到右，通常是：斷點、狀態、屬性、值。`md:hover:bg-teal-800` 是「md 以上且滑過時，背景為 teal-800」。斜線是修飾，`bg-teal-700/80` 是同一顆色的 80% 不透明。官方文件每一頁的標題就是 CSS 屬性的名字（例如 Padding、Max-width）。你先知道要改 padding，再去那一頁找 `p-4` 這類名字。

公式表把同一件事壓成表格：類別名稱、對應的 CSS、一句話。查 `rounded-xl` 就去 Border 的 radius；查 `justify-between` 就去 Flex。表裡的 `sm:`、`hover:` 可以再加回任何一列的前面。

### class 的四段

一條 class 中間用空格切開，每一粒再依冒號切開。冒號左邊是條件，冒號右邊才是真正的屬性。下面先看條件怎麼連，再看屬性怎麼命名。

#### 斷點與狀態

前綴以冒號結尾，可以連寫。建議的閱讀順序是斷點在前、狀態在後、屬性在最後，和你以後在文件範例裡看到的順序一致。`hover:md:flex` 也能編譯，但同一專案裡固定一種順序，眼睛比較不會斷。

#### 屬性、色階與透明度

`bg`、`text`、`border`、`p`、`m`、`w`、`h`、`gap`、`rounded`、`shadow` 是你會反覆遇到的屬性詞。顏色接色族再接色階。沒有色階的 `white`、`black`、`transparent`、`current` 直接接在屬性後面：`text-white`、`bg-transparent`、`text-current`。

把按鈕的 class 對照下表。

| 片段 | 意思 |
| --- | --- |
| `inline-block` | 可以設寬高與上下外距，又依內容縮 |
| `rounded-lg` | 圓角 0.5rem |
| `bg-teal-700` | 不透明的青綠底 |
| `px-4` `py-2` | 左右 1rem、上下 0.5rem |
| `font-medium` `text-white` `shadow` | 字重 500、白字、小陰影 |
| `md:px-6` | 48rem 以上左右改 1.5rem |
| `md:hover:bg-teal-800` | 48rem 以上且滑過，底色再深一階 |

```html 02-tailwind/pages/18-formula.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>讀一條 class</title>
  </head>
  <body class="bg-stone-50 p-6">
    <h1 class="mb-4 text-2xl font-bold text-stone-900">把這顆按鈕的 class 從左讀到右</h1>
    <a
      class="inline-block rounded-lg bg-teal-700 px-4 py-2 font-medium text-white shadow md:hover:bg-teal-800 md:px-6"
      href="#tours"
    >
      看行程
    </a>
    <p class="mt-6 max-w-prose text-stone-700">
      窄螢幕是青綠底、左右 px-4。寬到 md 之後，左右留白變 px-6，滑鼠移上去底色變深。
    </p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

# RWD

響應式網頁是同一份 HTML，依寬度改變排版。Tailwind 的預設是 mobile-first（手機優先）：沒有前綴的 class 先服務窄畫面，`sm:`、`md:`、`lg:`、`xl:`、`2xl:` 在視窗夠寬時才加上去。這和手寫 `@media (width >= …)` 的方向相同。見 [Responsive design](https://tailwindcss.com/docs/responsive-design)。

流動的部分優先用 `max-w-*`、`flex-wrap`、`grid-cols-1` 配較寬時的欄數。斷點留給「欄數要變、導覽要從直向改橫向」這種結構變化。字級繼續用 `text-*` 的 rem，不要用 `text-[4vw]` 當全頁內文。

`<meta name="viewport" content="width=device-width, initial-scale=1.0">` 已經寫在每一份示範頁的 `head`。沒有它，手機會把頁面縮成桌面寬度的一小條，斷點會全部失真。

## 手機優先

先在窄視窗把字讀完、按鈕點得到，再往寬的方向加欄。沒有前綴的 `grid-cols-1`、`px-4`、`text-3xl` 在 320px 和 1440px 都會在。你後來加上的 `lg:grid-cols-3` 只在夠寬時覆蓋欄數，窄畫面仍是一欄。

若先寫桌面的三欄、再用 `max-lg:` 往回改成一欄，中間的寬度很容易漏。課堂的新頁面用 `min-width` 方向的前綴，也就是 `sm:` 這一族。`max-md:hidden` 這種「小於 md 才隱藏」可以偶發使用，例如某個只在窄螢幕出現的句子，但版面骨架仍從一欄往上加。

這一頁故意不加欄數。把視窗拉寬，卡片仍是一欄，用來確認「沒有前綴就不會自己變多欄」。

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
      <h1 class="text-3xl font-bold">洛奇旅行</h1>
      <p class="mt-2 max-w-xl text-teal-50">先讓窄畫面讀得完。沒有前綴的 class 在所有寬度都生效。</p>
    </header>
    <section class="grid grid-cols-1 gap-4 px-4 py-8">
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="font-semibold">台北城市漫遊</h2>
        <p class="text-sm text-stone-600">預設一欄，卡片跟視窗一樣寬。</p>
      </article>
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="font-semibold">花蓮山海</h2>
        <p class="text-sm text-stone-600">拉寬瀏覽器時，這一頁故意不加欄數。</p>
      </article>
    </section>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## 斷點 sm、md、lg、xl、2xl

五個預設斷點都是 `min-width`。視窗到達那個寬度之後，前綴成立，而且更寬時仍然成立。所以在 1280px，`sm:`、`md:`、`lg:`、`xl:` 會同時生效。同一個屬性寫了多個前綴時，較寬的那個覆蓋較窄的。`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` 在桌機上是四欄。

| 前綴 | 最小寬度 | 大約像素 | 編成的查詢 |
| --- | --- | --- | --- |
| （沒有） | 0 | 手機直向 | 沒有媒體查詢 |
| `sm:` | 40rem | 640px | `@media (width >= 40rem)` |
| `md:` | 48rem | 768px | `@media (width >= 48rem)` |
| `lg:` | 64rem | 1024px | `@media (width >= 64rem)` |
| `xl:` | 80rem | 1280px | `@media (width >= 80rem)` |
| `2xl:` | 96rem | 1536px | `@media (width >= 96rem)` |

rem 在媒體查詢裡相對瀏覽器預設字級（通常 16px），不受你設在 `html` 上的字級影響。查詢看的是視窗寬度，不是手機型號。把桌機瀏覽器拉窄，就該看到窄版。

頂端那條色帶會寫出目前跨過哪一個斷點，下面的清單從一欄加到六欄。慢慢拉寬視窗即可。

```html 02-tailwind/pages/20-breakpoints.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>斷點</title>
  </head>
  <body class="bg-stone-100 text-stone-900">
    <p class="bg-teal-800 px-4 py-2 text-sm text-white sm:bg-teal-700 md:bg-teal-600 lg:bg-sky-700 xl:bg-indigo-700 2xl:bg-violet-800">
      <span class="sm:hidden">現在小於 sm</span>
      <span class="hidden sm:inline md:hidden">sm 以上</span>
      <span class="hidden md:inline lg:hidden">md 以上</span>
      <span class="hidden lg:inline xl:hidden">lg 以上</span>
      <span class="hidden xl:inline 2xl:hidden">xl 以上</span>
      <span class="hidden 2xl:inline">2xl 以上</span>
    </p>
    <main class="px-4 py-8">
      <h1 class="text-2xl font-bold">同一份清單，欄數隨寬度增加</h1>
      <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <li class="rounded-lg bg-white p-4">台北</li>
        <li class="rounded-lg bg-white p-4">新北</li>
        <li class="rounded-lg bg-white p-4">基隆</li>
        <li class="rounded-lg bg-white p-4">桃園</li>
        <li class="rounded-lg bg-white p-4">新竹</li>
        <li class="rounded-lg bg-white p-4">台中</li>
      </ul>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

{% note info %}
**小技巧：hidden 與下一個斷點配對**
`hidden md:inline` 是「預設不顯示，md 以上才顯示」。若要「只在 sm 到 md 之間顯示」，寫成 `hidden sm:inline md:hidden`。三句同時出現，代表區間疊到了。
{% endnote %}

## container 與 mx-auto、px

版心是中間那條閱讀寬度，兩邊留下背景。v4 **沒有**舊版那種自帶置中與內距的 `container` 元件。主題裡的 `--container-sm` 到 `--container-7xl` 對應的是 `max-w-sm` 到 `max-w-7xl`，和斷點的 `sm:`（40rem）不是同一組數字。`max-w-sm` 是 24rem，`sm:` 是視窗 40rem。不要把兩個 `sm` 看成同一個門檻。

| class | 最大寬度 |
| --- | --- |
| `max-w-xs` | 20rem |
| `max-w-sm` | 24rem |
| `max-w-md` | 28rem |
| `max-w-lg` | 32rem |
| `max-w-xl` | 36rem |
| `max-w-2xl` | 42rem |
| `max-w-3xl` | 48rem |
| `max-w-6xl` | 72rem |
| `max-w-7xl` | 80rem |

不取新名字時，版心就是三個 class：`mx-auto` 水平置中，`max-w-6xl` 限寬，`px-4` 左右留白。較寬時可以再加 `sm:px-6`。

若你希望有一個叫 `container` 的 class 同時做這三件事，並讓最大寬度跟著斷點變，就在 CSS 裡用 `@utility` 自己定義。這個專案的定義在 `src/style.css`。它從窄到寬加上 `max-width`，並在 40rem 之後把左右內距從 1rem 加到 1.5rem。

上半用 `@utility` 定義的 `container`，下半是 `mx-auto max-w-6xl px-4`。灰底是視窗，白底與淡青底是版心。

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

{% note warning %}
**注意事項**
`container` 這個字在下一節的容器查詢裡還會再出現一次，寫法是 `@container`。版心的 class 叫 `container`，查詢的父層叫 `@container`。兩個都在，意思不同。
{% endnote %}

## 自訂斷點

預設五段不夠用時，在 `@theme` 加 `--breakpoint-` 開頭的變數。`--breakpoint-tablet: 52rem` 會產生前綴 `tablet:`，門檻落在 `md`（48rem）和 `lg`（64rem）之間，一般筆電拉視窗就跨得到。`--breakpoint-3xl: 120rem` 是文件裡常見的超寬例子，約 1920px，很多筆電在 100% 縮放時拉不滿，所以示範頁把主要變化放在 `tablet:`，`3xl:` 只顯示額外一句。

名字會變成 variant 的名字。用 `tablet` 而不是再定義一個含糊的 `sm`，才不會蓋掉內建的 40rem。要拿掉某個內建斷點時才把它設成 `initial`，課堂保留五個預設值。

`--breakpoint-tablet` 與 `--breakpoint-3xl` 寫在同一份 `@theme`。這一頁用 `tablet:` 把兩欄打開，`3xl:` 只多顯示一句。

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

## 選讀：容器查詢 @container

斷點看的是整個視窗。同一張卡片若有時放在窄側欄、有時放在寬的主文，視窗可能已經是 `lg`，側欄裡的卡片卻仍然很窄。容器查詢（container query）改看父層的寬度。見 [MDN：CSS 容器查詢](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_containment/Container_queries) 與 Tailwind 文件裡的 container queries 一節。

父層加上 `@container`，子層用 `@md:`、`@lg:` 這類前綴。這裡的 `@md` 來自 `--container-md: 28rem`，不是視窗的 `md`（48rem）。父層寬度到達 28rem，`@md:flex-row` 才把圖放到文字旁邊。

| 前綴 | 容器最小寬度 |
| --- | --- |
| `@xs:` | 20rem |
| `@sm:` | 24rem |
| `@md:` | 28rem |
| `@lg:` | 32rem |
| `@xl:` | 36rem |

外框有 `resize-x`，用滑鼠拖右邊。視窗可以維持很寬；排版只跟這個框的寬度走。框還窄時圖在上，拖過大約 28rem 之後圖到左邊。

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

{% note info %}
**小技巧：先有視窗斷點，再考慮容器**
整頁的導覽、版心、卡片牆用 `sm:` 到 `2xl:` 就夠。只有「這個元件會被塞進不同寬度的格子」時才加 `@container`。兩種前綴可以同時存在：視窗決定一列有幾張卡，容器決定那一張卡內部是直的還是橫的。
{% endnote %}

### 選讀：Preflight 重置了什麼

`@import "tailwindcss"` 會順便帶入 Preflight，一組很小的基礎樣式。標題和段落的預設外距會被拿掉，所以你沒寫 `mt-*` 時，`h1` 會貼著上一塊。盒模型改成 `border-box`。圖片預設 `display: block` 且最大寬度 100%。按鈕會繼承字型。

這些重置是為了讓 utility 的數字就是你看到的間距，不會再被瀏覽器的 margin 加料。若某一塊突然貼在一起，先補 `mt-4` 或父層的 `space-y-4`，再懷疑 class 沒編譯。

# 本篇重點回顧

下面只收這篇用過的觀念。

- 一個 utility 只做一件事；編譯器只認原始碼裡的完整 class 字串，`bg-${color}` 這種接起來的名字不會產生規則。
- `text-`、`bg-`、`border-` 決定顏色塗在哪，斜線後面是不透明度，色階數字越小越淺。
- `@theme` 的 `--color-brand-*` 做出 `bg-brand-*` 這類 class，`--breakpoint-*` 做出自訂前綴，不會蓋掉內建的 `teal` 與 `sm:`。
- 預設的 `dark:` 跟系統的 `prefers-color-scheme`；要改成按鈕切換時，用 `@custom-variant` 讓它改看 html 上的 `dark` class。
- 按鈕、卡片、導覽與表單是間距、圓角、Flex、Grid 疊出來的，狀態用 `hover:`、`focus-visible:`、`group-hover:`、`peer-checked:`。
- 沒有前綴的規則在所有寬度都生效；`sm:` 到 `2xl:` 是視窗夠寬才加上去，所以版面從窄的一欄寫起。
- 版心可以寫 `mx-auto max-w-6xl px-4`，或用 `@utility container` 自己定義；`@container` 看父層寬度，和視窗的 `md:` 不是同一個門檻。
