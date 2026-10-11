---
title: "CSS 基礎：選擇器、盒模型、Flex、Grid、RWD"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:02:00
---

![CSS 層疊樣式表](assets/images/banner/css.png)

CSS（Cascading Style Sheets，層疊樣式表）決定頁面長什麼樣子。這一篇依上課分成四個部分：選擇器與文字、盒子與定位、Flex 與 Grid、自訂屬性與動態和媒體查詢。示範頁複製到 `student/practice/css/`，用 <kbd>F12</kbd> 的 Styles 對規則。

<!-- more -->

# 取得素材

把下面分頁依檔名存進 `student/practice/css/`。外層 `index.html` 放在 `css/`，其餘放在 `css/pages/`（含 `site.css`）。在 VS Code 開啟 `student/practice/`，再用 Live Server 開 `css/index.html`。觀念對齊 {% post_link lokiTech-css-baseclass-1 %}、{% post_link lokiTech-css-baseclass-2 %}；你用 F12 對照的，就是這幾份檔。

這一部分還沒有排版。區塊直向堆疊、卡片沒有並排，都是正常的。盒子、Flex、Grid、轉場與媒體查詢是後面三個部分。

## 四個部分

全文寫在這一篇。第一部分到「本篇重點回顧」為止。第二部分接在回顧之後，沿用同一份 `index.html`，只在選單往下加連結。第三部分同樣只加連結。第四部分從「取得素材（第四部分）」起，補上自訂屬性、變形與動態、媒體查詢，以及用開發者工具對樣式。

| 部分 | 你會用到的觀念 | 這篇現在 |
| --- | --- | --- |
| 1 | 觀念、引入、選擇器與權重、繼承與層疊、單位與顏色、文字與字型、背景 | 下面到「本篇重點回顧」 |
| 2 | 盒模型、`box-sizing`、`display`、定位、`z-index`、`overflow` | 「取得素材（第二部分）」起 |
| 3 | Flex、Grid | 「取得素材（第三部分）」起 |
| 4 | 自訂屬性、變形、轉場、動畫、媒體查詢、開發者工具 | 「取得素材（第四部分）」起 |

## 檔案一覽

後面每一節會寫要點左邊哪一項。`index.html` 只負責左邊選單；觀念在 `pages/` 各檔。`site.css` 沒有選單，它只被「寫在哪」那一頁引用。

| 存檔位置 | 左邊選單 | 這一頁在講什麼 |
| --- | --- | --- |
| `index.html` | （外層，網址不變） | 左 `nav`、右 `main`＋iframe（`name="demo"`） |
| `pages/1_syntax.html` | 語法 | 規則、註解、拼錯的屬性、同屬性後面贏 |
| `pages/2_where.html` | 寫在哪 | 行內、頁內 `<style>`、外部檔 |
| `pages/site.css` | （沒有選單） | `2_where.html` 的外部樣式表 |
| `pages/3_selectors.html` | 選擇器 | 元素、class、id、組合、偽類、偽元素 |
| `pages/4_cascade.html` | 權重與繼承 | 權重、原始碼順序、繼承、四個關鍵字 |
| `pages/5_units.html` | 單位與顏色 | `rem`／`em`、百分比、色碼與透明度 |
| `pages/6_type.html` | 文字與字型 | 字型堆疊、大小、行高、對齊、裝飾 |
| `pages/7_bg.html` | 背景 | 底色、漸層、平鋪、`cover`／`contain`、多層 |

先存 `index.html`，再建立 `pages/` 存其餘檔。選單寫的是 `pages/1_syntax.html` 這種路徑；資料夾或檔名改了，左邊點了右邊會空白。

{% tabs css素材,1 %}
<!-- tab index.html -->
```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 第一部分</title>
  </head>
  <body style="margin: 0">
    <table style="width: 100%; height: 100vh; border-collapse: collapse">
      <tr>
        <td
          style="
            width: 12rem;
            vertical-align: top;
            border-right: 1px solid #ccc;
            padding: 1rem;
          "
        >
          <header id="site-header">
            <p>洛奇旅行 · CSS</p>
            <nav>
              <ul>
                <li><a href="pages/1_syntax.html" target="demo">語法</a></li>
                <li><a href="pages/2_where.html" target="demo">寫在哪</a></li>
                <li><a href="pages/3_selectors.html" target="demo">選擇器</a></li>
                <li><a href="pages/4_cascade.html" target="demo">權重與繼承</a></li>
                <li><a href="pages/5_units.html" target="demo">單位與顏色</a></li>
                <li><a href="pages/6_type.html" target="demo">文字與字型</a></li>
                <li><a href="pages/7_bg.html" target="demo">背景</a></li>
              </ul>
            </nav>
          </header>
        </td>
        <td style="padding: 0">
          <main>
            <iframe
              name="demo"
              src="pages/1_syntax.html"
              title="示範內容"
              style="width: 100%; height: 100vh; border: 0"
            ></iframe>
          </main>
        </td>
      </tr>
    </table>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/1_syntax.html -->
```html pages/1_syntax.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>語法：一條規則</title>
    <style>
      /* 選擇器 { 屬性: 值; }  註解用這一種，HTML 註解在 CSS 裡無效 */

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      /* 逗號是兩條規則，不是把權重加在一起 */
      h1,
      h2 {
        font-weight: 700;
      }

      h1 {
        color: #99f6e4; /* 這條會被下一條同屬性蓋掉 */
        colour: red; /* 拼錯，整條宣告丟掉，不會讓標題變紅 */
        color: #115e59;
        font-size: 1.75rem;
      }

      .lead {
        font-size: 1.125rem;
      }
    </style>
  </head>
  <body>
    <h1>一條規則三個零件</h1>
    <p class="lead">
      標題應是深青綠，不是紅色。F12 點 h1，Styles 裡 colour 與第一個 color 會被劃掉或標成無效。
    </p>
    <h2>次標題跟 h1 共用字重</h2>
    <p>這段沒有自己的 class，顏色來自 body，字級是瀏覽器預設。</p>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/2_where.html -->
```html pages/2_where.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 寫在哪</title>
    <link rel="stylesheet" href="site.css" />
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .from-page {
        color: #b45309;
      }
    </style>
  </head>
  <body>
    <h1>三種地方都可以寫</h1>
    <p style="color: #9f1239">這行的顏色寫在開始標籤的 style 屬性（行內）。</p>
    <p class="from-page">這行的顏色寫在這份 HTML 的 style 標籤（頁內）。</p>
    <p class="from-file">這行的顏色與字重寫在同資料夾的 site.css（外部）。</p>
    <p>課堂預設用外部檔。這份示範站的其他頁把 CSS 寫在頁內，只為了複製一份就能開。</p>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/site.css -->
```css pages/site.css
/* 只給 2_where.html 用。路徑跟那份 HTML 同一層，所以 href 寫 site.css */

.from-file {
  color: #115e59;
  font-weight: 700;
}
```
<!-- endtab -->
<!-- tab pages/3_selectors.html -->
```html pages/3_selectors.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選擇器</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      p {
        color: #475569;
      }

      .tour {
        color: #0f766e;
      }

      #featured {
        background: #f0fdfa;
        padding: 0.75rem 1rem;
      }

      /* 後代：article 裡面任何一層的 p */
      article p {
        border-left: 3px solid #99f6e4;
        padding-left: 0.75rem;
      }

      /* 子結合：只限 article 的直接小孩 */
      article > .direct {
        font-weight: 700;
      }

      .stops li + li {
        margin-top: 0.25rem;
      }

      h2 ~ p {
        font-size: 0.95rem;
      }

      a:link {
        color: #0f766e;
      }

      a:visited {
        color: #6d28d9;
      }

      a:hover {
        color: #9f1239;
      }

      a:active {
        color: #b45309;
      }

      a:focus-visible {
        outline: 2px solid #115e59;
        outline-offset: 2px;
      }

      .days li:nth-child(odd) {
        background: #f0fdfa;
      }

      .days li:nth-child(2) {
        font-weight: 700;
      }

      /* h2 才是第一個小孩，所以這條打不到下面的 p */
      .pitfall p:first-child {
        color: #9f1239;
      }

      .pitfall p:first-of-type {
        color: #0f766e;
      }

      .price::before {
        content: "NT$ ";
      }

      input[type="email"] {
        border: 2px solid #0f766e;
        padding: 0.35rem 0.5rem;
      }

      input[type="text"] {
        border: 2px solid #cbd5e1;
        padding: 0.35rem 0.5rem;
      }

      input::placeholder {
        color: #94a3b8;
      }
    </style>
  </head>
  <body>
    <h1>選擇器決定規則打到誰</h1>

    <p>元素選擇器：這段是石板色。</p>
    <p class="tour">class：行程用字，深青綠。同一個 class 可以重複。</p>
    <p id="featured">id：全頁這一個，帶淺綠底。id 不要複製到第二個元素。</p>

    <article>
      <p class="direct">子結合 &gt; ：這段是 article 的直接小孩，所以較粗。</p>
      <div>
        <p>後代選擇器仍打得到這段（有左邊色條），但 &gt; 打不到。</p>
      </div>
    </article>

    <h2>相鄰與後面的兄弟</h2>
    <p>這個 h2 後面、同一個父層裡的段落會稍微縮小。</p>
    <ul class="stops">
      <li>台北</li>
      <li>這項起，li + li 才有上距</li>
      <li>濟州</li>
    </ul>

    <p><a href="#featured">把滑鼠放上來、用 Tab 走進來</a></p>

    <ul class="days">
      <li>奇數項有底色</li>
      <li>第二項較粗</li>
      <li>奇數項有底色</li>
      <li>第四項</li>
    </ul>

    <section class="pitfall">
      <h2>不是第一個小孩</h2>
      <p>p:first-child 打不到這段，因為第一個小孩是 h2。p:first-of-type 打得到。</p>
    </section>

    <p class="price">12800</p>

    <p>
      <input type="email" placeholder="you@example.com" />
      <input type="text" placeholder="姓名" />
    </p>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/4_cascade.html -->
```html pages/4_cascade.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>權重與繼承</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      /* (行內, id, class, 元素) = (0, 0, 0, 1) */
      p {
        color: #475569;
      }

      /* (0, 0, 1, 0) */
      .note {
        color: #b45309;
      }

      /* (0, 1, 0, 0)  id 欄比 class 欄優先 */
      #one {
        color: #0f766e;
      }

      .story {
        color: #7c2d12;
        margin-left: 2rem;
        border: 4px solid #7c2d12;
        padding: 0.75rem 1rem;
      }

      .price {
        color: #115e59;
      }

      /* 權重相同：(0, 0, 1, 0)。較早的 color 會被劃掉 */
      .chip {
        color: #0369a1;
        border: 2px solid #99f6e4;
        padding: 0.5rem 0.75rem;
      }

      .chip {
        color: #115e59;
        border-radius: 0.75rem;
      }

      .force {
        color: #94a3b8;
      }

      .force {
        color: #9f1239 !important;
      }

      .keywords {
        color: #1d4ed8;
        border: 4px solid #1d4ed8;
        padding: 0.75rem 1rem;
      }

      .in {
        color: inherit;
        border: inherit;
      }

      .init {
        color: initial;
        border: initial;
      }

      .un {
        color: unset;
        border: unset;
      }
    </style>
  </head>
  <body>
    <h1>誰贏、誰繼承</h1>
    <p>只有元素選擇器：石板色。</p>
    <p class="note">加上 class：琥珀色。class 欄贏過元素欄。</p>
    <p id="one" class="note">同時有 id 與 class：深青綠。id 欄贏過 class 欄。</p>
    <p id="two" class="note" style="color: #9f1239">行內 style：玫瑰紅，贏過樣式表裡的一般宣告。</p>

    <article class="story">
      <h2>繼承</h2>
      <p>這段沒寫 color，所以跟 article 的磚紅。左邊外距是 article 的，沒有繼承成 p 自己的 margin。</p>
      <p class="price">這段自己寫了 color，不再跟父層。</p>
    </article>

    <p class="chip">同權重的 .chip 寫了兩次。F12 應看到第一個 color 被劃掉，留下深青綠與圓角。</p>
    <p class="force">這段用了 !important。一般的灰色 color 會被劃掉。練習不要把它當預設。</p>

    <div class="keywords">
      <p class="in">inherit：字跟父層的藍，框也強制跟父層（框平常不繼承）。</p>
      <p class="init">initial：字回到屬性初始值，框也回到初始（通常沒有框）。</p>
      <p class="un">unset：color 會繼承（藍字），border 不可繼承所以回到初始（沒有框）。</p>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/5_units.html -->
```html pages/5_units.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>單位與顏色</title>
    <style>
      html {
        font-size: 16px;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .em-box {
        font-size: 1.25em;
        background: #f0fdfa;
        padding: 0.75rem;
      }

      .em-child {
        font-size: 2em;
      }

      .rem-box {
        font-size: 1.25rem;
        background: #ecfeff;
        padding: 0.75rem;
      }

      .rem-child {
        font-size: 2rem;
      }

      .meter {
        width: 16rem;
        background: #ccfbf1;
      }

      .half {
        display: block;
        width: 50%;
        background: #115e59;
        color: #fff;
      }

      .measure {
        max-width: 36ch;
      }

      .vw-title {
        font-size: 4vw;
      }

      .named {
        color: teal;
      }

      .hex {
        color: #0f766e;
      }

      .hex8 {
        color: #0f766e99;
      }

      .rgb {
        color: rgb(15 118 110);
      }

      .mix {
        color: rgb(15 118 110 / 50%);
      }

      .hsl {
        color: hsl(175 80% 26%);
      }

      .tag {
        color: #9f1239;
        border: 2px solid currentColor;
        padding: 0.25rem 0.5rem;
      }

      .stripe {
        background: repeating-linear-gradient(
          45deg,
          #134e4a,
          #134e4a 8px,
          #042f2e 8px,
          #042f2e 16px
        );
        padding: 1rem;
      }

      .frost {
        background: rgb(240 253 250 / 70%);
        padding: 0.75rem;
      }
    </style>
  </head>
  <body>
    <h1>單位與顏色</h1>
    <p>這頁把根字級設成 16px，只為了讓 Computed 的數字好對。正式頁常不鎖死像素。</p>

    <div class="em-box">
      父層 1.25em（約 20px）
      <p class="em-child">子層 2em，相對父層，約 40px。</p>
    </div>

    <div class="rem-box">
      父層 1.25rem（約 20px）
      <p class="rem-child">子層 2rem，相對根元素，約 32px。</p>
    </div>

    <div class="meter">
      <span class="half">父層 16rem 的 50%</span>
    </div>

    <p class="measure">
      這段最寬約 36 個「0」的寬度（ch）。中文不會剛好 36 個字，但行寬會收在閱讀舒適的範圍。
    </p>

    <p class="vw-title">4vw 會跟著視窗寬度變</p>

    <ul>
      <li class="named">名稱 teal</li>
      <li class="hex">HEX #0f766e</li>
      <li class="hex8">HEX 八碼 #0f766e99（末兩碼是透明度）</li>
      <li class="rgb">rgb(15 118 110)</li>
      <li class="mix">rgb(15 118 110 / 50%)</li>
      <li class="hsl">hsl(175 80% 26%)</li>
    </ul>

    <p><span class="tag">框色用 currentColor，跟字同一色</span></p>

    <div class="stripe">
      <p class="frost">底色有透明度時，底下的斜紋會透出來。</p>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/6_type.html -->
```html pages/6_type.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文字與字型</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.6;
      }

      .serif {
        font-family: "Iowan Old Style", "Palatino Linotype", Palatino, serif;
      }

      .mono {
        font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
      }

      .w700 {
        font-weight: 700;
      }

      .sm {
        font-size: 0.875rem;
      }

      .lg {
        font-size: 1.25rem;
      }

      .display {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.2;
        background: #115e59;
        color: #f0fdfa;
        text-shadow: 0 2px 0 rgb(0 0 0 / 35%);
        padding: 0.75rem 1rem;
      }

      .tight {
        line-height: 1;
        max-width: 24rem;
        background: #f0fdfa;
      }

      .loose {
        line-height: 1.8;
        max-width: 24rem;
        background: #ecfeff;
      }

      .center {
        text-align: center;
      }

      .end {
        text-align: end;
      }

      .jump {
        text-decoration-line: underline;
        text-decoration-color: #99f6e4;
        text-decoration-thickness: 2px;
        text-underline-offset: 0.2em;
      }

      .code {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.875rem;
      }

      .schedule {
        white-space: pre-wrap;
        font-family: ui-monospace, Consolas, monospace;
        background: #f8fafc;
        padding: 0.75rem 1rem;
      }

      .banner-title {
        font: 700 1.5rem/1.3 system-ui, "PingFang TC", "Microsoft JhengHei",
          sans-serif;
      }
    </style>
  </head>
  <body>
    <h1 class="display">洛奇旅行</h1>
    <p class="banner-title">這行用 font 簡寫：粗體、1.5rem、行高 1.3。</p>

    <p>內文用無襯線堆疊。字重 400 是一般，<span class="w700">700 是粗體</span>。</p>
    <p class="serif">這段改走襯線通用家族 serif，中文會落到系統有的明體或宋體。</p>
    <p class="mono">行程代碼 TPE-001 用等寬字較好對。</p>
    <p class="sm">0.875rem 當註記。</p>
    <p class="lg">1.25rem 當導言。</p>

    <p class="tight">行高 1：行與行貼得很近。兩行以上就不好讀。洛奇旅行的行程說明至少要留出行距。</p>
    <p class="loose">行高 1.8：同一段文字鬆很多。內文常用無單位的 1.5 到 1.7。</p>

    <p class="center">這段置中（text-align: center）。</p>
    <p class="end">這段靠行末（text-align: end）。</p>
    <p>連結可以只加底線：<a class="jump" href="#top">看行程</a></p>
    <p class="code">tpe-kt-03</p>
    <p class="schedule">Day 1 台北
Day 2 京都
Day 3 濟州</p>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/7_bg.html -->
```html pages/7_bg.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>背景</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .swatch,
      .shade,
      .photo,
      .hero {
        min-height: 6rem;
        margin: 0.75rem 0;
        padding: 0.75rem 1rem;
      }

      .swatch {
        background-color: #f0fdfa;
      }

      .shade {
        background-image: linear-gradient(160deg, #115e59, #0f766e 42%, #f0fdfa);
        color: #042f2e;
      }

      .photo {
        background-color: #042f2e;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='120' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23042f2e'/%3E%3Ccircle cx='180' cy='36' r='22' fill='%23fde68a'/%3E%3Crect x='0' y='78' width='240' height='42' fill='%23115e59'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        color: #f0fdfa;
      }

      .cover {
        background-size: cover;
        background-position: center;
      }

      .contain {
        background-size: contain;
        background-position: center;
      }

      .tile {
        min-height: 5rem;
        background-color: #115e59;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='2' fill='%2399f6e4'/%3E%3C/svg%3E");
        background-repeat: repeat;
        color: #f0fdfa;
        padding: 0.75rem 1rem;
      }

      /* 先寫的那一層畫在上面 */
      .hero {
        color: #f0fdfa;
        background-color: #115e59;
        background-image:
          linear-gradient(rgb(15 23 42 / 45%), rgb(15 23 42 / 10%)),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%2399f6e4'/%3E%3C/svg%3E");
        background-repeat: no-repeat, repeat;
        background-size: auto, 20px 20px;
        background-position: center, top left;
      }
    </style>
  </head>
  <body>
    <h1>背景</h1>
    <div class="swatch">只有 background-color。</div>
    <div class="shade">linear-gradient 也是一種 background-image。</div>
    <div class="photo cover">cover：圖縮放到蓋滿盒子，多的會被裁掉。</div>
    <div class="photo contain">contain：整張圖都看得到，盒子可能露出底色。</div>
    <div class="tile">小圓點重複平鋪。底色在圖的透明處露出來。</div>
    <div class="hero">
      兩層背景：漸層寫在前面，所以蓋在圓點上面。圓點之間仍看得到底色。
    </div>
  </body>
</html>
```
<!-- endtab -->
{% endtabs %}

{% note success %}
**跟著做**
1. 建立 `student/practice/css/pages/`。依分頁檔名各存一份（`index.html` 在 `css/`，其餘在 `pages/`）。
2. Live Server 開 `css/index.html`。點左邊每一項，確認右邊會換頁。
3. 在「語法」頁按 <kbd>F12</kbd>，點 `h1`，看無效宣告與被蓋掉的 `color`。
{% endnote %}

## 為什麼拆成多份

同一頁塞進選擇器、色票、背景，上課很難停在一題。主題拆開後，左邊點一項，右邊只留該題。`index.html` 的連結寫 `target="demo"`，iframe 的 `name="demo"`，兩邊字串相同，點選單就只換右欄。

```html
<!-- index.html（節錄）：target 與 name 必須一樣 -->
<li><a href="pages/1_syntax.html" target="demo">語法</a></li>
<iframe
  name="demo"
  src="pages/1_syntax.html"
  title="示範內容"
  style="width: 100%; height: 100vh; border: 0"
></iframe>
```

`index.html` 在 `css/`，所以 `href` 寫 `pages/1_syntax.html`。子頁都在 `pages/`，`2_where.html` 引用樣式只寫 `site.css`。要看右欄的樹時，在 **Elements** 展開 iframe、點裡面的文件再看 Styles。

{% note info %}
**小技巧：Emmet**
空檔輸入 <kbd>!</kbd> 再按 <kbd>Tab</kbd> 可展開骨架。本篇以複製完整檔為主。
{% endnote %}

## 為什麼正式網站不這樣做

這份外層頁用 `table` 切左右、再用 iframe 換內容，是課堂導覽。搜尋引擎要的是一個網址對應一份可索引的內容；輔助工具也要再進 iframe 裡的另一份文件。正式頁把結構寫在同一份 HTML，外觀交給外部 CSS。多頁時每一頁各自完整。iframe 留給地圖、影片、付款這類真正的外嵌。較完整的理由在 {% post_link lokiTech-15day-02-html %} 的「為什麼正式網站不這樣做」。

{% note warning %}
**課堂用、上線不用**
點左邊換右欄，只為了這堂課對照規則。專題頁不要複製這套用 iframe 串多頁的做法。
{% endnote %}

# 認識樣式表

瀏覽器先解析 HTML，建立 DOM，再把 CSS 規則套到對應的元素上，最後才排版與繪製。你改的是規則文字，不是在畫面上直接塗色。按重新整理後，瀏覽器會再跑一次這段流程。

## 規則怎麼寫

點左邊「語法」（`pages/1_syntax.html`）。一條規則是「選到誰」加上「設什麼」。大括號裡可以有多個宣告，每個宣告以分號結尾。

```css
選擇器 {
  屬性: 值;
}
```

| 零件 | 範本裡的例子 | 做什麼 |
| --- | --- | --- |
| 選擇器 | `h1`、`.lead`、`h1, h2` | 決定這條規則打到哪些元素 |
| 屬性 | `color`、`font-size` | 決定要改外觀的哪一面 |
| 值 | `#115e59`、`1.75rem` | 決定改成什麼 |
| 宣告 | `color: #115e59;` | 一組屬性加值 |

同一條規則裡同一個屬性寫兩次，**原始碼較後面的那次**留下。`1_syntax.html` 的 `h1` 先寫了一個淺色 `color`，後面又寫 `#115e59`，所以標題是深青綠。屬性名稱拼錯（範本裡的 `colour`）時，瀏覽器丟掉**那一個宣告**，同條規則的其他宣告仍有效。

逗號是分組：`h1, h2` 代表兩條選擇器共用同一組宣告。權重**不會**因為逗號加總；比權重時，看的是打中該元素的那一個選擇器。

註解寫 `/* 說明 */`，可以跨行。`<!-- -->` 是 HTML 註解，放進 CSS 不會被當成註解。

{% mermaid graph LR %}
html["HTML 元素"] --> sel["選擇器打中誰"]
sel --> decl["宣告：屬性與值"]
decl --> used["套用後的外觀"]
{% endmermaid %}

{% note info %}
**小技巧：Styles 面板**
<kbd>F12</kbd> → **Elements**，點一個節點。右側 **Styles** 由上到下是較優先的規則；被劃掉的是沒贏的宣告。**Computed** 是最後用上的值，繼承來的會標 *Inherited from*。
{% endnote %}

## 三種引入方式

點左邊「寫在哪」（`pages/2_where.html`）。CSS 可以寫在標籤上、寫在該頁的 `<style>`、或寫在獨立的 `.css` 再以 `link` 掛上。課堂與專題用第三種。其他示範頁把 CSS 放在頁內，是為了一份檔就能開。

| 寫法 | 範本 | 什麼時候用 |
| --- | --- | --- |
| 行內 | `style="color: #9f1239"` | 暫時試一個元素。難共用，也難搜尋 |
| 頁內 | `<head>` 裡的 `<style>` | 單頁小示範 |
| 外部 | `<link rel="stylesheet" href="site.css">` | 多頁共用、可快取、HTML 與外觀分開 |

`link` 放在 `head`。`href` 是相對路徑：`2_where.html` 與 `site.css` 同在 `pages/`，所以寫 `site.css`，不是 `pages/site.css`。同一頁有多個 `link` 時，檔案順序會影響「權重相同時誰贏」——較晚連結的檔案較後面。

行內樣式的權重高過樣式表裡的**一般**宣告，所以第三種寫法才是維護的起點：顏色集中在一個檔，改一次，每一頁一起變。

{% note warning %}
**注意事項**
`style` 屬性裡只能寫宣告，不能寫選擇器，也不能寫 `@media`。專題頁不要把版面塗在標籤上。
{% endnote %}

## @import 知道即可

`@import url("site.css");` 寫在 CSS 檔的**最前面**，可以再拉另一份樣式表。它會多一次請求，也比 `link` 更晚才開始下載。課堂用 `link`。建構工具負責合併檔案時，原始碼裡才會看到大量 `@import`，那是工具的事，不是你在 HTML 裡要手寫的載入方式。

# 選擇器與權重

選擇器是規則的前半。打不中，後面的宣告就不會出現在那個節點的 Styles 裡。權重與原始碼順序則決定：很多條都打中時，哪一條留下。

## 基本選擇器

點左邊「選擇器」。先背這四種，再看組合。

| 選擇器 | 寫法 | 打到誰 | 權重欄 |
| --- | --- | --- | --- |
| 通用 | `*` | 所有元素 | 不加分 |
| 元素（型別） | `p`、`a` | 所有該標籤 | 元素欄 +1 |
| class | `.tour` | 帶這個 class 的元素，可重複 | class 欄 +1 |
| id | `#featured` | 該頁這一個 id | id 欄 +1 |

class 寫在 HTML 是 `class="tour"`，CSS 多一個點。id 寫在 HTML 是 `id="featured"`，CSS 多一個 `#`。一個元素可以同時有多個 class：`class="tour soldout"`，CSS 用 `.tour` 與 `.soldout` 分別選，或寫成 `.tour.soldout`（中間**沒有空格**）表示兩個 class 都在同一個元素上。

id 在一份文件裡只給一個元素。要用在很多張卡片上的樣式，寫 class。`#site-header`、`#tour-list` 這種全頁只有一個的區塊，才用 id，而且是因為腳本或錨點需要那個名字，不是為了把權重拉高。

{% note info %}
**小技巧：打不中時先看名字**
Styles 裡完全沒有你寫的那條，多半是 class 拼字、檔案沒存、或 `link` 路徑錯。先對 HTML 的 `class`／`id` 與 CSS 的拼字，再談權重。
{% endnote %}

## 組合選擇器

組合是在基本選擇器之間加上關係。空格、`>`、`+`、`~` 都算進**同一條**選擇器，權重把各段加總。逗號則是拆成多條，不加總。

| 組合 | 寫法 | 打到誰 |
| --- | --- | --- |
| 後代 | `article p` | `article` 裡面任何深度的 `p` |
| 子 | `article > .direct` | 只限直接小孩 |
| 相鄰兄弟 | `.stops li + li` | 緊接在 `li` 後面的那個 `li` |
| 一般兄弟 | `h2 ~ p` | 同一個父層裡、`h2` 之後的 `p` |
| 分組 | `h1, h2` | 兩種元素各算各的 |

`pages/3_selectors.html` 裡，包在 `div` 中的那段仍有左邊色條（後代 `article p` 打中），但不會變粗（`article > .direct` 打不中）。改版面時，後代選擇器很容易打到後來才嵌進去的元素；能用 class 說清楚的，就少靠深層的空格。

## 偽類與偽元素

**偽類（pseudo-class）**寫單冒號，描述狀態或位置，權重算在 **class 欄**。**偽元素（pseudo-element）**寫雙冒號，描述元素的一部分或生出來的裝飾，權重算在 **元素欄**。

連結四態要照這個順序寫，口訣是 LoVe／HAte：`:link`、`:visited`、`:hover`、`:active`。順序錯了，前面的同權重規則會蓋掉後面的狀態。`:visited` 因隱私限制，現代瀏覽器幾乎只讓你改顏色，不要指望在「去過的連結」上改背景圖。

`:hover` 是指標放在上面。`:focus-visible` 是鍵盤把焦點帶進來時才出現的框；滑鼠點一下不必長出粗框。表單控制項的 `:disabled` 表示不能操作。範本的 email 欄用 `input[type="email"]` 這種**屬性選擇器**，權重同樣算 class 欄。

結構偽類看的是「在父層的第幾個小孩」：

- `:first-child`、`:last-child`：是父層的第一個或最後一個小孩。
- `:first-of-type`：是父層裡該標籤的第一個。
- `:nth-child(odd)`、`:nth-child(2)`：第奇數個、第 2 個。括號裡也可以寫 `3n+1` 這種算法。

`3_selectors.html` 的 `.pitfall` 先放 `h2` 再放 `p`。`p:first-child` 要求「這個 p 同時是第一個小孩」，所以打不中；`p:first-of-type` 打得中。清單條紋用 `:nth-child(odd)` 之前，先確認中間沒有插入別的標籤，否則奇偶會位移。

`::before` 與 `::after` 會在元素內容的前面或後面生出一個行內盒子，必須寫 `content`（可以是空字串 `""`）才看得到。`.price::before` 的 `content: "NT$ "` 是裝飾。真正的價格文字仍要在 HTML 裡，讀屏與複製才有內容。`::placeholder` 只影響輸入框的提示字，不影響使用者打進去的字。

{% note warning %}
**注意事項**
不要用 `::before` 填上「必填」以外還承擔唯一資訊的文字。裝飾可以拿掉，句子仍要讀得懂。
{% endnote %}

## 權重怎麼比

點左邊「權重與繼承」。同一個元素、同一個屬性，可能有很多宣告打中。作者樣式（你寫的 CSS）裡，比較順序是：

1. 這條宣告有沒有 `!important`。有的贏過沒有的。
2. 都沒有（或都有）時，比權重。四個欄位由左到右比，**某一欄較大就贏，不會進位**。
3. 權重也相同時，原始碼較後面的贏。後連結的樣式表算較後面。

| 欄位 | 誰加分 | 範本 |
| --- | --- | --- |
| 行內 | 標籤上的 `style=""` | 玫瑰紅那一段 |
| id | `#one` 這種 | `#one` 深青綠，贏過 `.note` |
| class | class、屬性選擇器、偽類 | `.note` 贏過 `p` |
| 元素 | 元素、偽元素 | `p` |

`p.note#one` 這種寫法是把欄位**加在同一條**上：1 個 id、1 個 class、1 個元素。十個 class 加起來仍是 class 欄的數字，比不過 id 欄的 1。所以不要把權重記成「class 是 10 分、湊滿 10 個就等於一個 id」——欄與欄之間不進位。舊說法「id＝100、class＝10、元素＝1」只在數目很小的時候碰巧像十進位，課堂以欄位比較為準。

`4_cascade.html` 可以對這三行：

| 元素 | 打中的選擇器 | 留下的顏色 |
| --- | --- | --- |
| 第一個 `p` | `p` | 石板色 |
| `p.note` | `p` 與 `.note` | 琥珀色 |
| `p#one.note` | 上面兩個再加 `#one` | 深青綠 |

行內 `style="color: #9f1239"` 贏過樣式表的一般宣告。樣式表裡的 `!important` 又贏過**沒有** `!important` 的行內樣式。行內再加上 `!important` 會更難蓋。`.force` 那一段就是為了讓你在 Styles 看到刪除線；專題裡要改顏色時，去調整選擇器或原始碼順序。

{% note danger %}
**不要用 !important 解權重**
它會讓下一個人只能再寫一個 `!important`。id 寫很多、選擇器拉很長，也是同一類問題。先把 class 取清楚。
{% endnote %}

## 繼承與層疊

**層疊（cascade）**是上一節的比較：很多宣告搶同一個屬性時誰留下。**繼承（inheritance）**是另一件事：這個元素**根本沒有**人寫這個屬性時，要不要沿用父層已經算出來的值。

會繼承的多半跟字有關：`color`、`font-family`、`font-size`、`font-weight`、`line-height`、`text-align`、`letter-spacing`。不會繼承的多半跟盒子有關：`margin`、`padding`、`border`、`background`、`width`、`display`。`4_cascade.html` 的 `article.story` 設了磚紅字與左邊外距。裡面的 `p` 沒寫 `color`，字是磚紅；`p` 自己並沒有 `margin-left: 2rem`，那段外距是父層盒子在縮排。`.price` 自己寫了 `color`，繼承就停在這一層。

{% mermaid graph TD %}
hit["這個元素有人寫了該屬性"] --> imp["先看 !important"]
imp --> spec["再比四欄權重"]
spec --> order["再看誰寫在後面"]
miss["沒有人寫這個屬性"] --> inh["可繼承的跟父層"]
miss --> init["不可繼承的用初始值"]
{% endmermaid %}

使用者代理樣式表（user agent stylesheet）也參與層疊，優先順序低於你寫的作者樣式。連結預設是藍色底線、`h1` 預設比較大，都是它先套的。你的 `a:link` 寫出來之後，才改掉那個藍色。

### 四個關鍵字

值也可以寫成關鍵字，強迫這一次要不要跟父層。範本 `.keywords` 設了藍字與藍框。

| 關鍵字 | 在範本的結果 | 意思 |
| --- | --- | --- |
| `inherit` | `.in` 藍字也有藍框 | 跟父層的計算結果，連平常不繼承的屬性也跟 |
| `initial` | `.init` 回到屬性自身的初始值 | `color` 回到瀏覽器的初始字色；`border` 回到沒有框 |
| `unset` | `.un` 藍字、沒有框 | 可繼承的屬性當成 `inherit`，其餘當成 `initial` |
| `revert` | （這頁沒畫） | 回到上一層來源，通常是使用者代理樣式 |

`initial` 不是「回到我上一條規則」。`color` 的初始值是瀏覽器定義的字色，不是 `body` 的 `#134e4a`。想一次清掉很多屬性，可以對那個元素寫 `all: unset;`，再把真正需要的屬性補回去。這是重置手段，不是每個元件的起手式。

# 單位、顏色、文字與背景

規則打中之後，值要寫成瀏覽器讀得懂的單位與顏色。字與背景是這一部分會直接看到的屬性；寬度、外距的算法留到盒模型再細算。

## 單位

點左邊「單位與顏色」。長度用來寫字級、行寬、間距。課堂內文以 `rem` 為主，`px` 用來寫髮絲邊框與需要對齊像素的線。

| 單位 | 相對誰 | 範本 |
| --- | --- | --- |
| `px` | 絕對長度（CSS 像素） | 根字級這頁設成 `16px`，只為了好對數字 |
| `em` | **該元素**的字級；用在 `font-size` 上時相對**父層**字級 | 父 `1.25em`、子 `2em` → 子約 40px |
| `rem` | **根元素**（`html`）的字級 | 子 `2rem` → 約 32px，不受父層字級影響 |
| `%` | 視屬性而定，寬度通常相對包含區塊 | `.half` 是 16rem 軌道的一半 |
| `ch` | 該字型裡「0」的寬度 | `.measure` 最寬 `36ch` |
| `vw`、`vh` | 視窗寬或高的 1% | `4vw` 的標題會跟著視窗縮放 |

`em` 會疊乘。父層已經是 1.25 倍、子層又寫 `2em`，子層相對的是放大後的父層，不是根字級。元件裡的字級用 `rem`，比較不會因為多包一層 `div` 就突然變大。`line-height` 建議寫**無單位**數字（例如 `1.6`）：它會乘上該元素自己的 `font-size`。寫成 `16px` 也可以，但父層的行高若以像素繼承下去，子層字變大時行距不會跟著長。

`%` 在還沒學盒子之前先記一件事：行內的 `span` 預設不理會 `width`。範本把色條設成 `display: block`，百分之五十才有寬度可畫。`display` 的其餘值在盒模型那一部分再展開。

{% note warning %}
**注意事項**
不要用 `4vw` 當全站內文。視窗很窄時字會小到不能讀，很寬時又會過大。`vw` 適合偶爾的標題實驗；正文留在 `rem`。
{% endnote %}

## 顏色

`color` 是前景（通常是字）。`background-color` 是底。`border-color` 是框。同一套寫法三種屬性都能用。

| 寫法 | 例子 | 什麼時候用 |
| --- | --- | --- |
| 名稱 | `teal` | 草稿。正式頁少靠名稱，各名稱不好對品牌色 |
| HEX 六碼 | `#0f766e` | 最常見。兩兩一組是紅、綠、藍，`00`～`ff` |
| HEX 三碼 | `#fff` | 只有在兩兩重複時等於 `#ffffff` |
| HEX 八碼 | `#0f766e99` | 末兩碼是透明度 |
| `rgb()` | `rgb(15 118 110)` | 與 HEX 同一套光。現代寫法用空格，不必寫逗號 |
| 帶透明度 | `rgb(15 118 110 / 50%)` | `/` 後面是 alpha。`0` 全透明，`100%` 不透明 |
| `hsl()` | `hsl(175 80% 26%)` | 色相、飽和度、亮度。調深淺時改第三個數 |
| `transparent` | `transparent` | 全透明 |
| `currentColor` | `border: 2px solid currentColor` | 跟該元素當下的 `color` 走 |

舊寫法 `rgb(15, 118, 110)` 與 `rgba(15, 118, 110, 0.5)` 仍然有效。新頁用空格與斜線即可，一種函式就能表達有沒有透明度。`hsl(175 80% 26% / 70%)` 同樣可以加 alpha。

對比要夠：深字配淺底，或淺字配深底。`#0f766e` 寫在白底上可以讀；同一個色若再加 `50%` 透明，就可能不夠。範本 `.stripe` 用斜紋當底，`.frost` 的底色是 `rgb(240 253 250 / 70%)`，斜紋會透出來——透明度是「讓底下的像素參與混合」，不是另做一種灰色。

{% note info %}
**小技巧：吸色**
Chrome Styles 裡的色塊可以打開調色盤，也會顯示對比是否過低。過低時優先改亮度，不要先把字級放大來彌補。
{% endnote %}

## 字型

點左邊「文字與字型」。字型相關屬性大多會繼承，所以設在 `body` 上，內文就跟著走；標題再個別加大、加粗。

`font-family` 是一串**字型堆疊**，逗號分隔，瀏覽器由左到右挑第一個用得了的。有空格的名稱要加引號。最後一個寫**通用家族**，系統才有退路。

```css
body {
  font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
    sans-serif;
}
```

| 通用家族 | 看起來 | 範本 |
| --- | --- | --- |
| `sans-serif` | 無襯線，螢幕內文常用 | `body` 的最後退路 |
| `serif` | 襯線，類似明體、宋體 | `.serif` |
| `monospace` | 等寬，程式與代碼 | `.mono` |
| `system-ui` | 各作業系統的介面字 | 堆疊的第一個 |

`system-ui` 在 Windows 上多半是 Segoe UI，中文仍要後面的「蘋方」或「微軟正黑體」才穩。不要只寫 `"Microsoft JhengHei"`：macOS 與手機沒有這個家族時，會直接掉到通用家族。

| 屬性 | 常用值 | 說明 |
| --- | --- | --- |
| `font-size` | `1rem`、`0.875rem`、`2rem` | 字級。標題用 `rem`，不要用關鍵字 `xx-large` 當設計系統 |
| `font-weight` | `400`、`700` | `400` 等於 `normal`，`700` 等於 `bold`。100～900 要該字型真的有這個字重 |
| `font-style` | `normal`、`italic` | 斜體。中文很多字型沒有斜體，瀏覽器只是把字歪掉 |
| `line-height` | `1.6`、`1.2` | 無單位。標題可稍緊，內文留 1.5～1.7 |
| `font-variant` | `small-caps` | 小型大寫，主要對拉丁字母。中文內文很少用 |

`font` 簡寫至少要有字級與字型家族，順序是：`font-style`、`font-weight`、`font-size`、斜線、`line-height`、`font-family`。

```css
.banner-title {
  font: 700 1.5rem/1.3 system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
}
```

{% note warning %}
**注意事項**
`font` 簡寫會把沒寫到的字型屬性設回初始值。原本在 `body` 繼承來的 `font-variant` 或較細的字重，可能在這一層消失。只改一個項目時，寫單獨的 `font-size` 或 `font-weight`。
{% endnote %}

## 文字

`color` 已經在上一節。這一節是字在行內怎麼排、怎麼裝飾。`text-align` 作用在**區塊**上，對齊的是它裡面的行內內容。把 `text-align: center` 寫在 `span` 自己身上通常看不到置中，要寫在包住它的區塊上。

| 屬性 | 常用值 | 做什麼 |
| --- | --- | --- |
| `text-align` | `start`、`center`、`end` | 行內內容靠行首、置中、靠行末。橫書由左到右時 `start` 就是靠左 |
| `text-decoration-line` | `underline`、`line-through`、`none` | 底線、刪除線、拿掉連結預設底線 |
| `text-decoration-color` | 顏色 | 線的顏色，可以和字不同 |
| `text-decoration-thickness` | `2px` | 線的粗細 |
| `text-underline-offset` | `0.2em` | 底線離字元遠一點，中文較不壓到筆畫 |
| `text-transform` | `uppercase`、`lowercase`、`capitalize` | 拉丁字母大小寫。不改變 HTML 裡的文字 |
| `letter-spacing` | `0.08em` | 字距。中文大標題可微調，內文不要拉很開 |
| `text-indent` | `2em` | 段落首行縮排 |
| `white-space` | `pre-wrap` | 保留換行並在太長時折行。範本的三日行程用這個 |
| `text-shadow` | `0 2px 0 rgb(0 0 0 / 35%)` | 水平偏移、垂直偏移、模糊、顏色 |

`text-align: justify` 會把一行兩端撐齊，中文段落常常被拉出大空隙，這門課的內文用 `start`。`white-space: nowrap` 禁止換行，地址或按鈕上的短詞才用；長文會溢出盒子。`pre` 會連空白與換行都保留，但**不**自動折行；需要折行就用 `pre-wrap`。

連結若拿掉底線，滑鼠移上去或鍵盤聚焦時仍要有另一種變化（顏色或 `outline`），否則看不出它可以點。範本 `.jump` 保留底線，只改顏色、粗細與距離。

## 背景

點左邊「背景」。背景畫在邊框以內的區域（含內距），預設不繼承。子元素是透明底時，你看到的是父層背景透出來，不是子層繼承了 `background-color`。

| 屬性 | 常用值 | 做什麼 |
| --- | --- | --- |
| `background-color` | `#f0fdfa` | 底色。圖與漸層沒蓋到的地方會露出它 |
| `background-image` | `url(...)`、`linear-gradient(...)` | 一張圖或一層漸層。漸層也算 image |
| `background-repeat` | `repeat`、`no-repeat`、`repeat-x` | 預設是重複平鋪 |
| `background-position` | `center`、`top left`、`50% 0` | 圖的對齊點 |
| `background-size` | `cover`、`contain`、`20px 20px` | `cover` 蓋滿並裁切；`contain` 整張放進盒子 |
| `background-attachment` | `scroll`、`fixed` | 預設跟內容滾。`fixed` 相對視窗，手機上常常不理想 |

`pages/7_bg.html` 的圖是 SVG 資料網址，不另存圖片也能開。`cover` 那一塊會裁掉部分圓與地平線；`contain` 那一塊看得到整張，左右露出 `#042f2e`。平鋪用一顆小圓點重複。正式站的照片用 `url("images/kyoto.jpg")` 這種相對路徑，屬性相同。

多層背景用逗號分隔，**先寫的畫在上面**。`.hero` 先寫半透明漸層、再寫圓點，所以漸層蓋住圓點，圓點的縫仍透出 `background-color`。每一層的 `background-repeat`、`background-size`、`background-position` 也用逗號對應；層數對不齊時，瀏覽器會循環使用你寫的那一串。

簡寫 `background` 可以一次寫完，`background-size` 要跟在位置後面並用斜線分開：

```css
.hero-short {
  background: url("images/kyoto.jpg") center / cover no-repeat #115e59;
}
```

{% note warning %}
**注意事項**
`background` 簡寫沒寫到的項目會回到初始值。你若先設好 `background-size: cover`，下一行又寫 `background: #f0fdfa;`，圖層會被清掉，只剩底色。只改顏色時寫 `background-color`。
{% endnote %}

漸層的方向可以是角度或關鍵字。`160deg` 從左下往右上偏；`to bottom` 由上到下。色標可以只寫顏色，也可以加上停在哪裡：`#0f766e 42%` 表示這個色在 42% 的位置。`repeating-linear-gradient` 用來做條紋，單位與顏色那一頁的斜紋就是這個函式。放射狀用 `radial-gradient(circle, #f0fdfa, #115e59)`。這門課的區塊底用線性漸層即可。

# 選讀

上面的示範頁已經夠第一部分上課。這一章可以整節跳過：屬性選擇器的進階比對、`:is()`／`:where()`／`:has()`、自訂屬性、`@layer`、BEM 命名、自行載入字型檔。之後維護較大的樣式表時再回來。

{% note info %}
**選讀就好**
不新增 `pages/` 檔。下面的片段可另存空檔，或只看程式碼。跳過不影響左邊七個示範頁。
{% endnote %}

## 屬性選擇器再比對

課堂正文只用了 `[type="email"]` 這種「屬性值完全相等」。還可以比對片段。權重仍是 class 欄 +1。

| 寫法 | 打到誰 |
| --- | --- |
| `[href]` | 有 `href` 的元素，不限值 |
| `[href^="https"]` | `href` 以 `https` 開頭 |
| `[href$=".pdf"]` | `href` 以 `.pdf` 結尾 |
| `[title*="京都"]` | `title` 裡含有「京都」 |
| `[type="email" i]` | 值的大小寫不計 |

```css
a[href$=".pdf"]::after {
  content: "（PDF）";
}
```

這適合「外連檔案要有額外提示」。提示若是必要資訊，仍要寫進 HTML，不要只放在 `content`。

## :is()、:where() 與 :has()

`:is(h1, h2, h3)` 把分組寫短，權重等於括號裡**最高**的那一個。`:where(h1, .tour, #featured)` 外觀相同，但權重是 **0**，所以很好被後面的普通 class 蓋過。重置樣式時用 `:where()`，就不必跟自己的重置規則搏鬥。

`:not(.soldout)` 排除帶該 class 的元素，權重等於括號裡那個選擇器。`:not(#featured)` 會帶上 id 欄，比 `:not(.soldout)` 重。

`:has()` 選的是「裡面有某子孫的元素」。輸入框聚焦時，讓外層出現框線：

```css
.field:has(input:focus-visible) {
  outline: 2px solid #0f766e;
}
```

```html
<div class="field">
  <label>Email <input type="email" /></label>
</div>
```

Chrome 已支援 `:has()`。它會讓父層的樣式依賴子層狀態，選擇器一多就難讀，有明確 class 時仍優先寫 class。

## 自訂屬性

自訂屬性（custom properties）以 `--` 開頭，用 `var()` 取用。它們會繼承。品牌色放在 `:root`（等於 `html`），整頁都能讀到。

```css
:root {
  --ink: #134e4a;
  --paper: #f0fdfa;
  --brand: #115e59;
}

body {
  color: var(--ink);
  background: var(--paper);
}

a:hover {
  color: var(--brand);
}
```

區域變數寫在元件上，只影響該元素和子孫：`.card { --ink: #7c2d12; }`。`var(--ink, #134e4a)` 的第二個引數是找不到變數時的備援。JavaScript 之後可以用 `element.style.setProperty("--brand", "#9f1239")` 改同一個名字。現在先知道：重複出現的色碼可以收成變數，改品牌時只改一處。

## 分層 @layer

`@layer` 把作者樣式分成若干層。一般宣告裡，**較晚宣告的層**蓋過較早的層；完全沒放進層的一般宣告，又蓋過所有層。

```css
@layer base, components;

@layer base {
  a {
    color: #0f766e;
  }
}

@layer components {
  a {
    color: #9f1239;
  }
}
```

上面這段，連結是玫瑰紅（`components` 在後）。若再寫一條沒有 `@layer` 的 `a { color: #134e4a; }`，深青綠會贏，即使它的選擇器只是元素。分層適合「重置在底層、元件在上層」。`!important` 在層裡的優先順序會反過來，選讀階段不要在 `@layer` 裡加 `!important`。

## 命名：BEM

BEM（Block Element Modifier）是 class 的命名習慣，不是新的選擇器語法。區塊是元件，元素是區塊的一部分，修飾是狀態或變體。

| 角色 | class | 意思 |
| --- | --- | --- |
| 區塊 | `.tour-card` | 一張行程卡 |
| 元素 | `.tour-card__title` | 這張卡的標題 |
| 修飾 | `.tour-card--soldout` | 這張卡已額滿 |

```css
.tour-card {
  color: #134e4a;
  background: #f0fdfa;
}

.tour-card__title {
  font-size: 1.25rem;
}

.tour-card--soldout {
  color: #64748b;
}
```

```html
<article class="tour-card tour-card--soldout">
  <h2 class="tour-card__title">京都紅葉散步</h2>
</article>
```

雙底線、雙連字號只是名字的一部分。權重仍各是一個 class。不要再寫 `.tour-card .tour-card__title` 把選擇器拉長，除非同一種元素名會出現在別的區塊。這門課的專題可以沿用較短的 class；團隊若已經用 BEM，讀得懂即可。

## 字型檔

系統堆疊不夠用時，才把字型檔放進網站。優先使用你有授權的字型。`woff2` 是網頁用的壓縮格式。

```css
@font-face {
  font-family: "Tour Sans";
  src: url("fonts/tour-sans.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Tour Sans", system-ui, "PingFang TC", "Microsoft JhengHei",
    sans-serif;
}
```

`font-display: swap` 的意思是：字型檔還沒到時先用堆疊裡的下一個字，到了再換，避免空白畫面卡住。每個字重各寫一個 `@font-face`（400 與 700 是兩個檔），不要為了粗體去下載整個家族。

有網路時也可以用公開字型服務，在 `head` 用 `link` 載入，並在 CSS 裡把該家族放在堆疊最前。不要用 `@import` 去拉字型。課堂電腦若沒有外網，仍要靠系統堆疊能讀。商用字型檔不要直接放進公開 repo。

# 本篇重點回顧

CSS 規則是選擇器加上宣告。課堂用外部樣式表，`link` 的路徑相對那份 HTML。選擇器決定打到誰：元素、class、id、組合、偽類與偽元素。同一屬性衝突時，先看 `!important`，再以行內、id、class、元素四欄比較且不進位，最後才是原始碼順序。

沒有人寫的屬性，跟字有關的多半繼承，跟盒子有關的不繼承。`inherit`、`initial`、`unset` 用來明示這一次要跟父層還是回到初始。長度以 `rem` 為主，行高用無單位數字。顏色用 HEX 或 `rgb()`／`hsl()`，透明度寫在斜線後面。

字型在 `body` 設一串堆疊，最後留通用家族。背景可以是底色、漸層或圖；多層時先寫的在上面，簡寫沒提到的項目會被重置。盒模型與定位從下一節開始。Flex、Grid、變形與媒體查詢仍是後面兩個部分。

# 取得素材（第二部分）

盒子的寬高、內外距、邊框、怎麼排、疊在哪一層，都在這一部分。沿用 `student/practice/css/`：用下面的 `index.html` 蓋掉原本那份（選單多了五項），新的五頁放進已有的 `pages/`。`pages/1`～`7` 不用改。觀念對齊 {% post_link lokiTech-css-baseclass-3 %}。

Flex 與 Grid 是下一部分。這裡若看到兩個盒子並排，只是為了對照寬度算法與 `inline-block`，正式的欄位排版仍用後面的方法。

{% note primary %}
**素材準備**
在 VS Code 開啟 `student/practice/`。蓋掉 `css/index.html`，把五個新檔存進 `css/pages/`。Live Server 開 `css/index.html`，左邊點「盒子」。
{% endnote %}

## 檔案一覽

左邊多五項。每一頁的 CSS 寫在該頁 `<style>`，複製一份就能開。外層仍只用 `table` 切左右，正式站不要沿用這套外框。

| 存檔位置 | 左邊選單 | 這一頁在講什麼 |
| --- | --- | --- |
| `index.html` | （外層，網址不變） | 選單加上盒子、間距、display、定位、層級 |
| `pages/8_box.html` | 盒子 | 四層、`content-box` 與 `border-box` |
| `pages/9_space.html` | 間距 | 簡寫、水平置中、外距合併、邊框與圓角 |
| `pages/10_display.html` | display | `block`、`inline`、`inline-block`、隱藏 |
| `pages/11_position.html` | 定位 | `relative`、`absolute`、`fixed`、`sticky` |
| `pages/12_flow.html` | 層級與溢出 | `z-index`、層疊情境、`overflow` |

{% tabs css盒,1 %}
<!-- tab index.html -->
```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 第一、二部分</title>
  </head>
  <body style="margin: 0">
    <table style="width: 100%; height: 100vh; border-collapse: collapse">
      <tr>
        <td
          style="
            width: 12rem;
            vertical-align: top;
            border-right: 1px solid #ccc;
            padding: 1rem;
          "
        >
          <header id="site-header">
            <p>洛奇旅行 · CSS</p>
            <nav>
              <ul>
                <li><a href="pages/1_syntax.html" target="demo">語法</a></li>
                <li><a href="pages/2_where.html" target="demo">寫在哪</a></li>
                <li><a href="pages/3_selectors.html" target="demo">選擇器</a></li>
                <li><a href="pages/4_cascade.html" target="demo">權重與繼承</a></li>
                <li><a href="pages/5_units.html" target="demo">單位與顏色</a></li>
                <li><a href="pages/6_type.html" target="demo">文字與字型</a></li>
                <li><a href="pages/7_bg.html" target="demo">背景</a></li>
                <li><a href="pages/8_box.html" target="demo">盒子</a></li>
                <li><a href="pages/9_space.html" target="demo">間距</a></li>
                <li><a href="pages/10_display.html" target="demo">display</a></li>
                <li><a href="pages/11_position.html" target="demo">定位</a></li>
                <li><a href="pages/12_flow.html" target="demo">層級與溢出</a></li>
              </ul>
            </nav>
          </header>
        </td>
        <td style="padding: 0">
          <main>
            <iframe
              name="demo"
              src="pages/8_box.html"
              title="示範內容"
              style="width: 100%; height: 100vh; border: 0"
            ></iframe>
          </main>
        </td>
      </tr>
    </table>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/8_box.html -->
```html pages/8_box.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>盒子模型</title>
    <style>
      /* 現代預設：width 含 padding 與 border。下面的 content-box 範例會自己改回去 */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      /* 淺青底是父層。卡片的 margin 是透明的，所以你會看到這層底色露出來 */
      .stage {
        background: #ccfbf1;
        margin-bottom: 1rem;
      }

      .card {
        width: 16rem;
        margin: 1rem;
        border: 6px solid #0f766e;
        padding: 1rem;
        background: #f0fdfa;
      }

      .card p {
        margin: 0;
        background: #99f6e4;
      }

      .track {
        width: 16rem;
        margin: 0 0 1rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .fill {
        width: 100%;
        margin: 0;
        padding: 1rem;
        border: 4px solid #115e59;
        background: #f0fdfa;
      }

      .content-box {
        box-sizing: content-box;
      }

      .note {
        max-width: 36rem;
        color: #115e59;
      }
    </style>
  </head>
  <body>
    <h1>四層與 box-sizing</h1>
    <p class="note">
      淺青是父層。白青卡片的綠框是 border，框內留白是 padding，淺藍字底是內容。卡片與淺青邊緣的空隙是 margin。
    </p>
    <div class="stage">
      <article class="card">
        <p>內容區。F12 點這張卡片，Computed 最下方就是盒模型圖。</p>
      </article>
    </div>

    <h2>同一條 width: 100%</h2>
    <p class="note">
      虛線軌道寬 16rem。兩張卡片都寫 width: 100%、padding: 1rem、border: 4px。第一張是 content-box，會撐出軌道；第二張是 border-box，邊框對齊虛線。
    </p>
    <h2>content-box（屬性預設）</h2>
    <div class="track">
      <article class="fill content-box">
        width 只量內容。左右 padding 與 border 加在外面，總寬超過軌道。
      </article>
    </div>
    <h2>border-box（這頁的全域設定）</h2>
    <div class="track">
      <article class="fill">
        width 量到邊框外緣。padding 與 border 從內容區扣掉，總寬仍是 100%。
      </article>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/9_space.html -->
```html pages/9_space.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>間距與邊框</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .sheet {
        max-width: 36rem;
        background: #fff;
        border: 1px solid #99f6e4;
      }

      /* 上 0.25rem、左右 1rem、下 1.25rem：三個值的簡寫 */
      .ticket {
        margin: 1rem auto;
        padding: 0.25rem 1rem 1.25rem;
        width: min(100%, 22rem);
        background: #f0fdfa;
        border: 1px solid #0f766e;
        border-left: 6px solid #115e59;
        border-radius: 0.75rem;
      }

      .ticket h3 {
        margin: 0.75rem 0 0.25rem;
        font-size: 1.05rem;
      }

      .ticket p {
        margin: 0;
      }

      .collapse {
        background: #ccfbf1;
        max-width: 36rem;
      }

      .collapse p {
        background: #fff;
        margin-left: 0;
        margin-right: 0;
      }

      .a {
        margin-top: 0;
        margin-bottom: 2rem;
      }

      .b {
        margin-top: 0.5rem;
        margin-bottom: 0;
      }

      .chip {
        display: inline-block;
        margin: 0 0.5rem 0.5rem 0;
        padding: 0.25rem 0.6rem;
        border-radius: 999px;
        background: #ecfdf5;
        border: 1px dashed #0f766e;
      }

      .go {
        font: inherit;
        color: #134e4a;
        background: #f0fdfa;
        border: 1px solid #0f766e;
        border-radius: 0.5rem;
        padding: 0.4rem 0.9rem;
      }

      .go:focus-visible {
        outline: 2px solid #9f1239;
        outline-offset: 3px;
      }
    </style>
  </head>
  <body>
    <h1>簡寫、置中、合併</h1>
    <div class="sheet">
      <article class="ticket">
        <h3>京都紅葉散步</h3>
        <p>這張卡 margin: 1rem auto，所以在白底裡水平置中。左邊粗框是單獨的 border-left。</p>
      </article>
    </div>

    <h2>垂直外距會合併</h2>
    <p>淺青是父層。上段 margin-bottom 是 2rem，下段 margin-top 是 0.5rem。中間空隙是 2rem，較大的那一個留下。</p>
    <div class="collapse">
      <p class="a">上段。F12 點這段，再點下段，看 margin 的數字。</p>
      <p class="b">下段。兩段的垂直外距沒有相加。</p>
    </div>

    <h2>圓角與焦點框</h2>
    <p>
      <span class="chip">兩日</span>
      <span class="chip">含早餐</span>
    </p>
    <p><button class="go" type="button">看行程</button> 用鍵盤 <kbd>Tab</kbd> 進來時，玫瑰色是 outline，盒子的寬高不變。</p>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/10_display.html -->
```html pages/10_display.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>display</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .block {
        margin: 0 0 0.5rem;
        padding: 0.5rem 0.75rem;
        background: #f0fdfa;
        border: 1px solid #0f766e;
      }

      .try-size {
        width: 8rem;
        height: 3rem;
        background: #99f6e4;
      }

      .as-block {
        display: inline-block;
        width: 6rem;
        height: 2.5rem;
        margin: 0 0.25rem 0.5rem 0;
        padding: 0.35rem;
        background: #f0fdfa;
        border: 1px solid #115e59;
        vertical-align: top;
      }

      .row {
        background: #fff;
        border: 1px dashed #94a3b8;
        padding: 0.5rem;
        margin-bottom: 0.75rem;
      }

      .gone {
        display: none;
      }

      .ghost {
        visibility: hidden;
      }

      .swatch {
        display: inline-block;
        width: 5rem;
        padding: 0.4rem;
        margin-right: 0.35rem;
        background: #0f766e;
        color: #f0fdfa;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>盒子怎麼參加排版</h1>

    <h2>block：div</h2>
    <div class="block">第一張，獨佔一行，寬度撐滿父層。</div>
    <div class="block">第二張從下一行開始。</div>

    <h2>inline：span 設了寬高仍跟著字走</h2>
    <p>
      前文
      <span class="try-size">甲</span>
      <span class="try-size">乙</span>
      後文。CSS 寫了 width 與 height，行內的 span 不採用。
    </p>

    <h2>inline-block：同一行，而且吃寬高</h2>
    <div class="row">
      <span class="as-block">三日</span>
      <span class="as-block">四日</span>
      <span class="as-block">五日</span>
    </div>
    <p>三個 span 之間的空隙來自 HTML 換行被當成一個空白字元。</p>

    <h2>none 拿掉盒子，hidden 留下空位</h2>
    <div class="row">
      <span class="swatch">1</span>
      <span class="swatch gone">2</span>
      <span class="swatch">3</span>
    </div>
    <div class="row">
      <span class="swatch">1</span>
      <span class="swatch ghost">2</span>
      <span class="swatch">3</span>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/11_position.html -->
```html pages/11_position.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>定位</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem 1.5rem 5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .shift {
        position: relative;
        top: 0.75rem;
        left: 1rem;
        width: 14rem;
        padding: 0.5rem 0.75rem;
        background: #f0fdfa;
        border: 1px solid #0f766e;
      }

      .after-shift {
        width: 14rem;
        margin-top: 0.5rem;
        padding: 0.5rem 0.75rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .tour {
        position: relative;
        width: min(100%, 22rem);
        padding: 1rem;
        background: #f0fdfa;
        border: 1px solid #0f766e;
        border-radius: 0.75rem;
      }

      .badge {
        position: absolute;
        top: 0.6rem;
        right: 0.6rem;
        margin: 0;
        padding: 0.15rem 0.45rem;
        background: #9f1239;
        color: #fff;
        border-radius: 999px;
        font-size: 0.85rem;
      }

      .scroller {
        height: 12rem;
        overflow: auto;
        max-width: 28rem;
        background: #fff;
        border: 1px solid #99f6e4;
      }

      .day h3 {
        position: sticky;
        top: 0;
        margin: 0;
        padding: 0.4rem 0.75rem;
        background: #115e59;
        color: #f0fdfa;
        font-size: 1rem;
      }

      .day p {
        margin: 0;
        padding: 0.75rem;
      }

      .ask {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        margin: 0;
        padding: 0.45rem 0.75rem;
        background: #0f766e;
        color: #f0fdfa;
        border-radius: 999px;
      }
    </style>
  </head>
  <body>
    <h1>相對、絕對、黏住、固定</h1>

    <h2>relative 挪開，原位仍留著</h2>
    <div class="shift">這張 top: 0.75rem、left: 1rem。原位的空位還在，下一張沒有補上去。</div>
    <div class="after-shift">下一張從原位的下方開始排。</div>

    <h2>absolute 相對最近的已定位祖先</h2>
    <article class="tour">
      <p class="badge">額滿</p>
      <h3>大阪美食四日</h3>
      <p>卡片是 position: relative。徽章是 absolute，貼著這張卡的右上，不佔正文的行。</p>
    </article>

    <h2>sticky 在這個滾動盒裡黏住</h2>
    <div class="scroller">
      <section class="day">
        <h3>第一天 · 清水寺</h3>
        <p>往下滾時，標題黏在這個白盒的上緣，直到這一天的段落結束。</p>
        <p>父層要夠高，黏性才有距離可以走。</p>
        <p>再留一段高度，讓你看得到第二個標題接上來。</p>
      </section>
      <section class="day">
        <h3>第二天 · 伏見稻荷</h3>
        <p>第二個標題碰到上緣時，會換它黏住。</p>
        <p>這個滾動來自 .scroller 的 overflow: auto，不是整份瀏覽器。</p>
        <p>底部再補一行，避免最後一個標題沒有空間。</p>
      </section>
    </div>

    <p class="ask">諮詢</p>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/12_flow.html -->
```html pages/12_flow.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>層級與溢出</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .pile {
        position: relative;
        height: 8rem;
        max-width: 28rem;
      }

      .card {
        position: absolute;
        width: 11rem;
        padding: 0.6rem 0.75rem;
        border-radius: 0.5rem;
      }

      .low {
        top: 0;
        left: 0;
        z-index: 1;
        background: #99f6e4;
      }

      .mid {
        top: 1.2rem;
        left: 2rem;
        z-index: 2;
        background: #fde68a;
      }

      .high {
        top: 2.4rem;
        left: 4rem;
        z-index: 3;
        background: #fecdd3;
      }

      .contexts {
        position: relative;
        height: 9rem;
        max-width: 28rem;
      }

      .ctx {
        position: absolute;
        width: 12rem;
        height: 6rem;
        padding: 0.45rem 0.6rem;
      }

      .ctx-a {
        z-index: 1;
        background: #99f6e4;
      }

      .ctx-b {
        top: 2.2rem;
        left: 5rem;
        z-index: 2;
        background: #fde68a;
      }

      .kid {
        position: absolute;
        width: 7.5rem;
        margin: 0;
        padding: 0.25rem 0.4rem;
        color: #fff;
        font-size: 0.9rem;
      }

      .ctx-a .kid {
        left: 6rem;
        top: 3.2rem;
        z-index: 50;
        background: #0f766e;
      }

      .ctx-b .kid {
        left: 1rem;
        top: 1rem;
        z-index: 1;
        background: #9f1239;
      }

      .clip,
      .scroll-box {
        width: min(100%, 18rem);
        padding: 0.75rem;
        background: #f0fdfa;
        border: 1px solid #0f766e;
        border-radius: 0.75rem;
      }

      .clip {
        overflow: hidden;
        margin-bottom: 0.75rem;
      }

      .scroll-box {
        height: 6.5rem;
        overflow: auto;
      }

      .title {
        width: 16rem;
        margin: 0.3rem 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        background: #fff;
      }

      .spill {
        margin: 0;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <h1>誰蓋住誰、超出的內容去哪</h1>

    <h2>同一層裡，z-index 大的在上</h2>
    <div class="pile">
      <article class="card low">z-index: 1</article>
      <article class="card mid">z-index: 2</article>
      <article class="card high">z-index: 3 在最上面</article>
    </div>

    <h2>小孩的 50 出不了父親的情境</h2>
    <div class="contexts">
      <div class="ctx ctx-a">
        父親 A · z-index 1
        <p class="kid">小孩 50</p>
      </div>
      <div class="ctx ctx-b">
        父親 B · z-index 2
        <p class="kid">小孩 1，仍蓋住左邊</p>
      </div>
    </div>

    <h2>overflow</h2>
    <p class="title">京都．清水寺與二年坂三年坂散步行程名稱很長</p>
    <div class="clip">
      <p class="spill">hidden：這一行不換行，超過圓角盒子的後半會被裁掉，也不出現捲軸。</p>
    </div>
    <div class="scroll-box">
      <p>auto：高度不夠才出現捲軸。</p>
      <p>第二天往伏見稻荷。</p>
      <p>第三天大阪。</p>
      <p>第四天回程。</p>
    </div>
  </body>
</html>
```
<!-- endtab -->
{% endtabs %}

## 選單只加連結

`index.html` 仍放在 `css/`，`href` 仍是 `pages/檔名.html`。`target="demo"` 與 iframe 的 `name="demo"` 維持相同字串，點選單只換右欄。這次預設 `src` 改成 `pages/8_box.html`，一開就停在盒子。

{% note info %}
**小技巧：盒模型圖**
<kbd>F12</kbd> → **Elements**，點右欄裡的節點（先展開 iframe 的文件）。**Computed** 最下方的圖有 content、padding、border、margin 四個數字，游標停在圖上時，頁面會標出對應的那一圈。
{% endnote %}

# 認識盒子

每個元素畫面上都是一顆矩形盒子。從內到外四層：內容（content）、內距（padding）、邊框（border）、外距（margin）。你設的 `width` 與 `height` 量哪一層，由 `box-sizing` 決定。點左邊「盒子」（`pages/8_box.html`）。

{% mermaid graph TD %}
margin["margin 外距<br/>透明，在邊框外面"] --> border["border 邊框"]
border --> padding["padding 內距<br/>有背景"]
padding --> content["content 內容"]
{% endmermaid %}

## 四層

點 `.card`。淺青是父層 `.stage` 的背景。卡片自己的背景是 `#f0fdfa`，會塗滿邊框內緣（含 padding），不會塗進 margin。所以卡片與淺青邊緣之間那段空隙沒有卡片的底色。

| 層 | 範本 | 佔不佔空間 | 背景 |
| --- | --- | --- | --- |
| 內容 | 淺藍字底那一段 | 由文字與 `width`／`height` 決定 | 在 padding 底下連成一片 |
| padding | `1rem` | 算進邊框以內 | 看得到 |
| border | `6px solid #0f766e` | 算進邊框以內 | 自己的顏色 |
| margin | `1rem` | 在父層裡把兄弟推開 | 透明，露出父層 |

`margin`、`padding`、`border` 都不繼承。子層要留白就自己寫。背景預設的 `background-clip` 是 `border-box`，顏色停在邊框外緣的內側；想只塗內容區再改 `padding-box` 或 `content-box`。

{% note success %}
**跟著做**
點卡片，打開 Computed 的盒模型圖。對一下：padding 四邊都是 `1rem`，border 是 `6px`，margin 是 `1rem`。再點淺藍那一段，那是內容，不是整張卡。
{% endnote %}

## box-sizing

`width` 與 `height` 的預設算法叫 `content-box`：你寫的寬只量內容，padding 與 border 再往外加。`8_box.html` 的第一條軌道就是這樣。軌道自己寬 `16rem`，小孩寫 `width: 100%`，又加了左右各 `1rem` 的 padding 與左右各 `4px` 的 border，總寬變成 `16rem + 2rem + 8px`，虛線包不住。

`border-box` 把 padding 與 border 算進你寫的寬高。同一組數字，第二條軌道的邊框對齊虛線，內容區變窄。兩種模式都不把 margin 算進 `width`。

| 模式 | `width: 16rem` 量到哪 | 再加上 padding、border 時 |
| --- | --- | --- |
| `content-box` | 只有內容 | 總寬變大 |
| `border-box` | 內容 + padding + border | 總寬仍是 16rem，內容被扣掉 |

課堂與專題用這組重置，寫在樣式表最前面：

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

`*` 打到所有元素，`::before` 與 `::after` 也要寫，偽元素才不會回到 `content-box`。這頁的 `.content-box` 把單張卡片改回去，是為了讓你看見預設算法；專題裡讓它留在 `border-box`。

{% note warning %}
**注意事項**
百分比的 `width` 是父層內容區的百分之幾。`border-box` 讓「50% 加左右 padding」仍是父層的一半。欄位並排留到 Flex、Grid；現在先把單顆盒子的總寬算對。
{% endnote %}

## 寬度與高度

`width: auto` 在區塊盒上是撐滿父層那一行可用的寬（再扣掉自己的 margin）。`height: auto` 跟著內容長高。空的區塊若只有 padding，高度仍會被 padding 撐開。

`max-width: 100%` 常用在圖片與影片上，避免比父層更寬。`min-width` 保證窄螢幕時不要被壓到無法閱讀；真的要換行，是下一部分與媒體查詢的事。

高度的百分比要父層自己有明確高度才算得出來。父層是 `height: auto` 時，小孩的 `height: 50%` 往往變成 `auto`。需要跟視窗走時，父層可以寫 `min-height: 100vh`，或讓小孩直接用 `vh`。`min()`、`max()`、`clamp()` 能把上限寫在同一個值裡，間距那一頁的卡片用了 `width: min(100%, 22rem)`：窄於 22rem 時跟父層一樣寬，更寬時停在 22rem。

# 認識間距與邊框

內距在邊框裡面，外距在邊框外面。簡寫依順時針：上、右、下、左。點左邊「間距」（`pages/9_space.html`）。

## 簡寫

一個值是四邊相同。兩個值是上下、左右。三個值是上、左右、下。四個值是上、右、下、左。

```css
padding: 0.25rem 1rem 1.25rem; /* 上、左右、下 */
margin: 1rem auto; /* 上下 1rem，左右平分剩餘空間 */
border: 1px solid #0f766e;
```

單一方向用 `margin-top`、`padding-left`、`border-bottom` 這類名字。後寫的單一方向會蓋過簡寫裡的那一邊，所以簡寫放前面、例外放後面。

`padding` 不接受負值。`margin` 可以寫負值，元素會往該側移過去，也可能壓到隔壁。重疊若是徽章、標籤，下一部分的定位比較好讀；負的外距留來做小幅修正。

上下的百分比也是依**包含塊的寬度**，不是高度。`margin-top: 10%` 在寬 400px 的父層裡是 40px。這個百分比跟 `box-sizing` 無關。

## 水平置中

區塊盒要比父層窄，左右 `margin` 設成 `auto`，剩餘寬度才有得平分。`9_space.html` 的 `.ticket` 寫了 `width: min(100%, 22rem)` 與 `margin: 1rem auto`，白底 `.sheet` 裡它會居中。寬度已經是 `auto`（撐滿）時，左右沒有剩餘，`auto` 看起來像 0。

`margin-top: auto` 在普通區塊流裡不會把盒子推到父層底部。垂直置中用下一部分的 Flex 或 Grid。

{% note info %}
**小技巧：間距刻度**
同一站的留白用同一組數字，例如 `0.25rem`、`0.5rem`、1rem、`1.5rem`、`2rem`。重複出現時可收成第一部分選讀的自訂屬性：`padding: var(--space-md)`。
{% endnote %}

## 外距合併

同一個包含塊裡，上下相鄰的區塊盒，垂直 margin 會併成**較大的那一個**，不會相加。範本上段 `margin-bottom: 2rem`、下段 `margin-top: 0.5rem`，淺青空隙是 2rem。左右 margin 不會合併。

父子也會合併：父層沒有 padding、沒有 border、沒有上緣的內容，子層的 `margin-top` 會穿出父層，父層背景不包住那段空隙。要讓背景包住，父層加 `padding-top`、加上 `border-top`，或設 `display: flow-root`（選讀）。

Flex 與 Grid 的項目之間不合併 margin，下一部分改用 `gap` 控管縫。現在先在區塊流裡把「為什麼兩段距離比預期短」對上 Computed。

{% note success %}
**跟著做**
點上段與下段，看 Computed 的 margin。再用滑鼠在盒模型圖上對中間的淺青，確認空隙是較大的 2rem。
{% endnote %}

## 邊框、圓角、outline

`border` 要有樣式才看得到。`border-style` 常用 `solid`、`dashed`、`dotted`；`none` 是沒有邊框。寬度與顏色寫了、樣式仍是預設的 `none` 時，畫面還是沒有線。

```css
border: 1px solid #0f766e;
border-left: 6px solid #115e59; /* 蓋過簡寫的左邊 */
border-radius: 0.75rem;
```

`border-radius` 只改角的形狀。四個角可以分開寫：`border-radius: 0.75rem 0 0 0.75rem`。圓 pill 用較大的半徑，範本的 `.chip` 是 `999px`。小孩若會畫出圓角外面，父層加上 `overflow: hidden` 才切得齊，見「溢出」。

`outline` 畫在邊框外側，不佔盒模型的寬高，所以加上去時隔壁不會被推開。鍵盤焦點用它：`.go:focus-visible` 的玫瑰色框線不改變按鈕尺寸。`outline-offset` 讓這條線再離開邊框一點。滑鼠點擊不必長出這條線，所以用 `:focus-visible`，與第一部分的連結焦點同一套。

{% note warning %}
**注意事項**
拿掉預設焦點框時要改畫別的可見焦點（`outline` 或同樣清楚的邊）。只寫 `outline: none` 會讓鍵盤使用者看不到現在停在哪個控制項。
{% endnote %}

# 認識 display

`display` 決定這顆盒子怎麼參加排版：獨佔一行、跟文字排在同一行，或先從畫面拿掉。改 `display` 不會改標籤的語意；`span` 設成 `block` 仍是沒有角色的容器。點左邊「display」（`pages/10_display.html`）。

HTML 有預設值。常見的是：`div`、`p`、`h1`～`h6`、`header`、`section` 為 `block`；`span`、`a`、`strong` 為 `inline`；`li` 為 `list-item`。`img` 是行內的置換元素，可以設寬高。不確定時看 Computed 的 `display`。

## block、inline、inline-block

| 值 | 範本上你看到的 | 寬高 | 垂直 margin |
| --- | --- | --- | --- |
| `block` | 兩張 `.block` 上下分開，寬度撐滿 | 採用 | 採用，而且可能合併 |
| `inline` | 「甲」「乙」跟前後文字同一行 | 不採用（置換元素除外） | 不採用 |
| `inline-block` | 「三日」「四日」「五日」同一行，每顆有自己的寬高 | 採用 | 採用 |
| `none` | 第一列沒有「2」 | 盒子不建立 | — |

行內盒的左右 padding、左右 margin、左右 border 會把旁邊的字推開。上下的 padding 與 border 會畫出來，但通常不把行盒撐高，所以可能壓到上一行、下一行。要穩定的按鈕或標籤，用 `inline-block`（或下一部分的 Flex 小孩）。

`inline-block` 跟文字同一行，中間的換行會變成一個空白。範本三個日子之間的縫就是這個空白，不是 margin。下一部分用 Flex 排同一列時，這個空白不再參與。

`vertical-align` 只對行內與 `inline-block` 有意義。圖片底下一條小縫，常是它在跟文字的基線對齊。把圖片設成 `display: block`，或 `vertical-align: middle`，縫會消失。整頁欄位不要靠 `vertical-align` 做垂直置中。

{% note info %}
**小技巧：先看預設**
連結 `a` 預設是 `inline`。做成按鈕時再改 `inline-block`，padding 與寬高才按你寫的走。不要為了寬度先把所有東西改成 `block`。
{% endnote %}

## 隱藏

`display: none` 不建立盒子，後面的元素補上它的位置，範本第一列是「1」緊接著「3」。它也不接收點擊。

`visibility: hidden` 的盒子仍佔位，只是看不見，第二列中間空一格。`opacity: 0` 也佔位，而且預設仍能被點到；它還會建立新的層疊情境（選讀）。

三種都還在 HTML 裡。讀屏多半會略過 `display: none`，仍可能讀到 `visibility: hidden`。只是換季暫時不顯示的區塊，用 `none`；要留著空位避免版面跳動，用 `hidden`。

# 認識定位

`position` 決定這顆盒子的座標跟誰比。預設 `static` 參加正常排版，`top`、`right`、`bottom`、`left` 與 `z-index` 都無效。另外四種才看這些偏移。點左邊「定位」（`pages/11_position.html`）。

| 值 | 參考點 | 原來的位子 |
| --- | --- | --- |
| `static` | 正常排版 | 留著 |
| `relative` | 自己原本的位子 | 留著，只是視覺上挪開 |
| `absolute` | 最近的已定位祖先；沒有的話是頁面的初始包含塊 | 釋出，兄弟會補上 |
| `fixed` | 視窗（這份示範是 iframe 的視窗） | 釋出 |
| `sticky` | 平常像相對，滾過門檻後黏在滾動盒的邊緣 | 在父層範圍內留著 |

偏移量的百分比，水平看包含塊的寬，垂直看包含塊的高。`top: 0.75rem` 是往下挪，`left: 1rem` 是往右挪。

## relative 與 absolute

`.shift` 是 `relative`。它往下、往右之後，虛線的下一張仍從「沒挪開時」的下方開始排，中間留下空位。`relative` 的另一個用途是幾乎不挪動，只當子孫的座標原點。

`.tour` 是 `position: relative`，`.badge` 是 `absolute`，並寫了 `top` 與 `right`。徽章對的是這張卡的 padding 邊緣，不佔標題那一行。祖先都還是 `static` 時，`absolute` 會一路找到頁面的初始包含塊，徽章會貼到整頁而不是卡片。卡片上那句 `position: relative` 就是在指定「對我算」。

`absolute` 或 `fixed` 之後，這顆盒子可以設寬高，就算標籤原本是 `inline`。它已離開文字流。

```css
.tour {
  position: relative;
}

.badge {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
}
```

{% mermaid graph TD %}
abs["absolute 的盒子"] --> seek["往父層、祖父層找"]
seek --> hit["遇到 position 不是 static 的祖先"]
hit --> pad["對準那個祖先的 padding 邊緣"]
seek --> miss["都沒有"]
miss --> init["對準頁面的初始包含塊"]
{% endmermaid %}

## sticky 與 fixed

`sticky` 要寫至少一個門檻：`top`、`right`、`bottom`、`left`。範本的標題是 `top: 0`，在 `.scroller` 裡往下滾時黏在白盒上緣。黏性的範圍是**它的父層**（這裡的 `section.day`）。父層結束，標題就跟著走，下一天的標題再黏上來。父層沒有比視窗更高的空間時，你看不到黏住的過程。

`.scroller` 同時是滾動盒（`overflow: auto` 且高度只有 `12rem`）。標題黏的是這個盒子，不是整個瀏覽器。祖先若有 `overflow: hidden`，黏性常常失效；那一層會變成滾動盒，標題沒有多餘的路可以走。

`.ask` 是 `fixed`，`right` 與 `bottom` 對準視窗。這份頁在 iframe 裡，所以「視窗」是右欄那一格，捲動 iframe 時綠膠囊仍停在右下。正式頁沒有這層 iframe 時，它才相對整個瀏覽器視窗。`body` 留了下緣 `margin`，最後一行才不會被膠囊蓋住。

{% note warning %}
**注意事項**
整頁的欄、卡片列、置中，用正常排版與下一部分的 Flex、Grid。`absolute` 留給徽章、關閉鈕、自訂下拉這一類疊在表面的小東西。`fixed` 留給真的要跟著視窗的列。
{% endnote %}

{% note success %}
**跟著做**
滾動白盒，看兩個標題輪流黏住。再滾動整個右欄，右下「諮詢」仍停在 iframe 角落。F12 點徽章，Styles 裡應看得到它的包含塊來自 `.tour`。
{% endnote %}

# 層級與溢出

定位讓盒子疊在一起之後，還要決定誰在上面，以及畫出邊界的內容要裁掉、捲動，還是讓它伸出去。點左邊「層級與溢出」（`pages/12_flow.html`）。

## z-index

`z-index` 只對已定位的盒子生效（`position` 不是 `static`）。Flex 或 Grid 的小孩例外，下一部分即使是 `static` 也能用 `z-index`。值是整數，愈大愈靠近你；也可以是負數，會跑到同一情境裡背景的後面。`auto` 表示不建立新的層疊情境，順序跟文件順序走：後面的兄弟蓋住前面的兄弟。

`.pile` 裡三張都是 `absolute`，`z-index` 為 1、2、3。粉紅色那張在最上面。把 3 改成 0，它會落到最下面，你可以在 Styles 裡直接改數字看結果。

## 層疊情境

數字只在**同一個層疊情境**裡比。`position` 加上不是 `auto` 的 `z-index`，就會開一個新情境。情境與情境之間，比的是父親的 `z-index`，不是小孩。

範本父親 A 的 `z-index` 是 1，他的小孩是 50。父親 B 是 2，他的小孩是 1。玫瑰紅小孩仍蓋住深綠小孩：B 這一層整包在 A 之上，A 的小孩不能伸出來。所以專題不要靠 `9999` 去壓過別的元件；先確認兩邊是不是同一個情境。

```css
.ctx-a {
  position: absolute;
  z-index: 1;
}

.ctx-a .kid {
  position: absolute;
  z-index: 50; /* 只在 A 裡面比 */
}

.ctx-b {
  position: absolute;
  z-index: 2; /* 整包高於 A */
}
```

{% note info %}
**小技巧：刻度**
全站的層級用自訂屬性命名，例如 `--z-sticky: 20`、`--z-dropdown: 30`、`--z-modal: 40`。改一處，徽章與對話框的順序一起變。
{% endnote %}

## overflow

內容比盒子的 padding 邊緣還大時，`overflow` 決定多出來的部分。預設 `visible`：畫到外面，不出現捲軸，也不撐大 `width`（高度的 `auto` 仍會跟著內容長）。

| 值 | 範本 | 行為 |
| --- | --- | --- |
| `hidden` | `.clip` | 裁掉，沒有捲軸 |
| `auto` | `.scroll-box` | 超過才出現捲軸 |
| `scroll` | （這頁沒畫） | 一律預留捲軸 |
| `clip` | （選讀） | 裁掉，而且自己不變成滾動盒 |

`.title` 要出現省略號，三個條件一起寫：有寬度、`overflow: hidden`、`white-space: nowrap`，再加 `text-overflow: ellipsis`。少一個就會改成換行或直接裁掉。這是單行標題的寫法；多行省略是選讀。

`overflow-x` 與 `overflow-y` 可以分開。其中一軸不是 `visible` 時，另一軸的 `visible` 會被算成 `auto`。你只想水平捲、垂直仍露出時，要在 Computed 裡確認最後的值。

圓角盒子裡的小孩預設可以畫出圓角。`.clip` 用 `overflow: hidden` 讓底色與文字都停在圓角內。`hidden` 也會讓這一層變成滾動盒，子孫的 `sticky` 可能因此失效；只為了裁切、又要保住黏性標題時，改看選讀的 `clip`。

{% note success %}
**跟著做**
把視窗縮到標題那一行放不下。確認結尾是省略號。再把 `.title` 的 `white-space` 在 Styles 裡取消，看它改回換行。
{% endnote %}

# 選讀：盒子與定位

這一節是盒子與定位的邊界情況。課堂對過範本就可以先往 Flex 走，之後卡片被父層背景「頂出去」、對話框不跟視窗走，再回來查。

## 父子外距與 flow-root

子層的 `margin-top` 穿出父層時，父層可以改成：

```css
.panel {
  display: flow-root;
}
```

`flow-root` 讓這一層成為新的區塊格式化情境，父子的垂直 margin 不再合併，父層背景會包住子層的外距。加 `padding-top: 0.01px` 或一條透明 `border-top` 也能擋，但 `flow-root` 不需要多一條看不見的邊。

浮動（float）是舊的多欄手法。這門課的欄位用 Flex 與 Grid。若你讀到舊文用 float 把圖片擠到文字旁邊，現在的寫法是 Grid 或 Flex，並用 `gap` 留縫。

## 邏輯方向

`margin-left` 這類名字綁著螢幕的左邊。介面要同時應付由左至右與由右至左時，改寫邏輯屬性：`margin-inline` 是行內方向的兩側（橫排時就是左右），`margin-block` 是區塊方向（橫排時就是上下）。`padding`、`border`、`inset` 也有同一套。

```css
.ticket {
  margin-inline: auto;
  padding-block: 0.25rem 1.25rem;
  padding-inline: 1rem;
  border-inline-start: 6px solid #115e59;
}
```

`inset: 0.6rem 0.6rem auto auto` 等於 `top`、`right` 是 `0.6rem`，`bottom`、`left` 是 `auto`。課堂範本仍寫四個物理方向，讀得到邏輯屬性即可。

## 層疊情境還會被誰打開

下面任一項也會讓該元素成為新的層疊情境，子孫的 `z-index` 出不去：

- `opacity` 小於 1
- `transform`、`filter`、`perspective` 不是 `none`
- `isolation: isolate`
- `will-change` 指定了上述屬性
- `position: fixed` 或 `sticky`，在部分情況也會自成一層

對話框的遮罩與面板放在同一層情境裡排 `z-index`。不要在卡片上留著試用的 `transform: scale(1)`，它會把裡面的 `fixed` 一起改參考點。

## transform 與 fixed

祖先有 `transform`、`filter` 或 `perspective` 時，子孫的 `fixed` 不再相對視窗，而相對那個祖先。`absolute` 也會把這個祖先當成包含塊，即使中間還有別的 `relative`。

```css
.stage {
  transform: none; /* 保持 none，裡面的 fixed 才相對視窗 */
}

.modal {
  position: fixed;
  inset: 0;
}
```

動畫若一定要用 `transform`，把 `fixed` 的節點移到那個祖先外面（正式頁通常放在 `body` 底層）。這也是第一部分那個 iframe 外框不能拿來當專題殼的原因之一：外層的包含塊一多，`fixed` 的參考點就難追。

## overflow: clip 與多行省略

`overflow: clip` 一樣裁切，但這一層不變成滾動盒，子孫的 `sticky` 比較不容易被它打斷。它不能靠程式滾動。需要捲軸時仍用 `auto`。

多行省略可以寫：

```css
.blurb {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

標準屬性 `line-clamp` 正在普及。這組帶前綴的寫法是目前還要留著的例外，只用於「兩行以後省略」。其他屬性不要再加廠商前綴。

# 第二部分重點回顧

盒子從內到外是內容、padding、border、margin。背景塗到邊框內緣，margin 透明。`content-box` 的 `width` 只量內容；課堂重置成 `border-box`，讓 padding 與 border 含在寬高裡。兩種算法都不包含 margin。

簡寫順時針。區塊要比父層窄，才能用左右 `margin: auto` 水平置中。上下相鄰區塊的垂直 margin 合併成較大值。`outline` 不佔寬高，留給鍵盤焦點。

`display` 決定參加排版的方式。`block` 獨佔一行，`inline` 跟字走且不吃寬高，`inline-block` 兩者兼有。`display: none` 不留位子，`visibility: hidden` 留位子。

`relative` 留原位，`absolute` 對最近的已定位祖先，`fixed` 對視窗，`sticky` 在父層高度內黏住滾動盒。徽章用「父層 relative、自己 absolute」。`z-index` 只在同一個層疊情境裡比大小。`overflow` 的 `hidden` 裁切，`auto` 不夠才捲動；單行省略還要 `white-space: nowrap` 與 `text-overflow: ellipsis`。

Flex、Grid、變形與媒體查詢從下一部分開始。

# 取得素材（第三部分）

欄與列的排版從這裡開始。Flex（彈性盒子）負責一個方向：一排按鈕、導覽列、卡片橫列。Grid（網格）負責兩個方向同時切：頁首、側欄、主文，或規整的卡片格。沿用 `student/practice/css/`：用下面的 `index.html` 蓋掉原本那份（選單多了五項），新的五頁放進已有的 `pages/`。`pages/1`～`12` 不用改。觀念對齊 {% post_link lokiTech-css-baseclass-4 %}。

變形、轉場、動畫與媒體查詢是最後一部分。這裡的範例在窄視窗會換行或擠在一起，那是正常的；用查詢改欄數留到那時候。float 不當這一部分的主線，繞排與舊式多欄在選讀。

{% note primary %}
**素材準備**
在 VS Code 開啟 `student/practice/`。蓋掉 `css/index.html`，把五個新檔存進 `css/pages/`。Live Server 開 `css/index.html`，左邊點「主軸」。
{% endnote %}

## 檔案一覽

左邊多五項。每一頁的 CSS 寫在該頁 `<style>`，複製一份就能開。外層仍只用 `table` 切左右，正式站不要沿用這套外框。每一頁開頭的 `box-sizing: border-box` 沿用第二部分，後面的百分比與 `fr` 才不會把 padding 算到軌道外面。

| 存檔位置 | 左邊選單 | 這一頁在講什麼 |
| --- | --- | --- |
| `index.html` | （外層，網址不變） | 選單加上主軸、對齊、子項、軌道、區域 |
| `pages/13_flex.html` | 主軸 | `flex-direction`、`flex-wrap`、`flex-flow` |
| `pages/14_flex-align.html` | 對齊 | `justify-content`、`align-items`、`align-content`、`gap` |
| `pages/15_flex-item.html` | 子項 | `flex` 簡寫、`order`、`align-self`、導覽列與卡片列 |
| `pages/16_grid.html` | 軌道 | 格線、`fr`、`minmax`、`repeat`、`auto-fit` |
| `pages/17_grid-area.html` | 區域 | 區域名字、跨越、格子對齊、頁面骨架與卡片牆 |

{% tabs css排版,1 %}
<!-- tab index.html -->
```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 第一至三部分</title>
  </head>
  <body style="margin: 0">
    <table style="width: 100%; height: 100vh; border-collapse: collapse">
      <tr>
        <td
          style="
            width: 12rem;
            vertical-align: top;
            border-right: 1px solid #ccc;
            padding: 1rem;
          "
        >
          <header id="site-header">
            <p>洛奇旅行 · CSS</p>
            <nav>
              <ul>
                <li><a href="pages/1_syntax.html" target="demo">語法</a></li>
                <li><a href="pages/2_where.html" target="demo">寫在哪</a></li>
                <li><a href="pages/3_selectors.html" target="demo">選擇器</a></li>
                <li><a href="pages/4_cascade.html" target="demo">權重與繼承</a></li>
                <li><a href="pages/5_units.html" target="demo">單位與顏色</a></li>
                <li><a href="pages/6_type.html" target="demo">文字與字型</a></li>
                <li><a href="pages/7_bg.html" target="demo">背景</a></li>
                <li><a href="pages/8_box.html" target="demo">盒子</a></li>
                <li><a href="pages/9_space.html" target="demo">間距</a></li>
                <li><a href="pages/10_display.html" target="demo">display</a></li>
                <li><a href="pages/11_position.html" target="demo">定位</a></li>
                <li><a href="pages/12_flow.html" target="demo">層級與溢出</a></li>
                <li><a href="pages/13_flex.html" target="demo">主軸</a></li>
                <li><a href="pages/14_flex-align.html" target="demo">對齊</a></li>
                <li><a href="pages/15_flex-item.html" target="demo">子項</a></li>
                <li><a href="pages/16_grid.html" target="demo">軌道</a></li>
                <li><a href="pages/17_grid-area.html" target="demo">區域</a></li>
              </ul>
            </nav>
          </header>
        </td>
        <td style="padding: 0">
          <main>
            <iframe
              name="demo"
              src="pages/13_flex.html"
              title="示範內容"
              style="width: 100%; height: 100vh; border: 0"
            ></iframe>
          </main>
        </td>
      </tr>
    </table>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/13_flex.html -->
```html pages/13_flex.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flex 主軸</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 40rem;
        color: #115e59;
      }

      .row {
        display: flex;
        gap: 0.5rem;
        padding: 0.75rem;
        margin: 0 0 0.5rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .col {
        flex-direction: column;
        height: 12rem;
      }

      .rev {
        flex-direction: row-reverse;
      }

      .colrev {
        flex-direction: column-reverse;
        height: 12rem;
      }

      .n {
        min-width: 3rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        background: #0f766e;
        color: #f0fdfa;
        text-align: center;
      }

      .lane {
        max-width: 22rem;
      }

      .tile {
        flex: 0 0 8rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        background: #115e59;
        color: #f0fdfa;
        text-align: center;
      }

      .scroll {
        flex-wrap: nowrap;
        overflow: auto;
      }

      .wrap {
        flex-wrap: wrap;
      }

      /* 直向換行：高度先被填滿，再往旁邊開新的一欄 */
      .flow {
        display: flex;
        flex-flow: column wrap;
        align-content: flex-start;
        gap: 0.5rem;
        height: 10rem;
        padding: 0.75rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .pills {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        padding: 0.75rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .pill {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8rem;
        height: 3rem;
        border: 2px solid #0f766e;
        background: #ccfbf1;
        color: #134e4a;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <h1>主軸跟著方向走</h1>
    <p class="note">
      數字是原始碼順序。row 從左排到右，row-reverse 從右排到左，文件裡仍是 1、2、3。改成 column 之後，主軸變成上下。
    </p>

    <h2>flex-direction: row（預設）</h2>
    <div class="row">
      <div class="n">1</div>
      <div class="n">2</div>
      <div class="n">3</div>
    </div>

    <h2>row-reverse</h2>
    <div class="row rev">
      <div class="n">1</div>
      <div class="n">2</div>
      <div class="n">3</div>
    </div>

    <h2>column</h2>
    <div class="row col">
      <div class="n">1</div>
      <div class="n">2</div>
      <div class="n">3</div>
    </div>

    <h2>column-reverse</h2>
    <div class="row colrev">
      <div class="n">1</div>
      <div class="n">2</div>
      <div class="n">3</div>
    </div>

    <h2>nowrap，而且不准縮小</h2>
    <p class="note">
      每顆寬 8rem、flex-shrink 是 0。容器只有 22rem，四顆塞不進同一行，所以出現捲軸。預設的 nowrap 若允許縮小，會先把項目壓窄而不是換行。
    </p>
    <div class="row lane scroll">
      <div class="tile">京都</div>
      <div class="tile">金澤</div>
      <div class="tile">沖繩</div>
      <div class="tile">北海道</div>
    </div>

    <h2>flex-wrap: wrap</h2>
    <div class="row lane wrap">
      <div class="tile">京都</div>
      <div class="tile">金澤</div>
      <div class="tile">沖繩</div>
      <div class="tile">北海道</div>
    </div>

    <h2>flex-flow: column wrap</h2>
    <p class="note">
      flex-flow 是方向加換行的簡寫。這裡先由上往下排，高度不夠就在右邊再開一欄。
    </p>
    <div class="flow">
      <div class="n">1</div>
      <div class="n">2</div>
      <div class="n">3</div>
      <div class="n">4</div>
      <div class="n">5</div>
      <div class="n">6</div>
    </div>

    <h2>行內標籤也變項目</h2>
    <p class="note">
      span 與 a 是這層的直接子元素，所以吃得到寬高。裸文字「春季」沒有標籤，仍然佔一格。藥丸自己再設一次 flex，只是為了把字置中。
    </p>
    <div class="pills">
      春季
      <span class="pill">京都</span>
      <a class="pill" href="#kyoto">看行程</a>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/14_flex-align.html -->
```html pages/14_flex-align.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flex 對齊</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 40rem;
        color: #115e59;
      }

      .bar {
        display: flex;
        gap: 0.5rem;
        min-height: 3.5rem;
        margin: 0 0 0.5rem;
        padding: 0.5rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .chip {
        padding: 0.45rem 0.7rem;
        border-radius: 0.5rem;
        background: #0f766e;
        color: #f0fdfa;
      }

      .end {
        justify-content: flex-end;
      }

      .center {
        justify-content: center;
      }

      .between {
        justify-content: space-between;
      }

      .around {
        justify-content: space-around;
      }

      .evenly {
        justify-content: space-evenly;
      }

      .stack {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 14rem;
        max-width: 16rem;
        padding: 0.75rem;
        background: #ccfbf1;
      }

      .cross {
        display: flex;
        gap: 0.5rem;
        height: 7rem;
        margin: 0 0 0.5rem;
        padding: 0.5rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .cross .chip {
        width: 4.5rem;
      }

      .start {
        align-items: flex-start;
      }

      .cross-end {
        align-items: flex-end;
      }

      .cross-center {
        align-items: center;
      }

      .base {
        align-items: baseline;
      }

      .base .sm {
        font-size: 0.8rem;
      }

      .base .lg {
        font-size: 1.6rem;
      }

      .pack {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0.5rem;
        width: min(100%, 16rem);
        height: 12rem;
        margin: 0 0 0.5rem;
        padding: 0.5rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .pack .chip {
        flex: 0 0 6rem;
        text-align: center;
      }

      .pack-start {
        align-content: flex-start;
      }

      .pack-between {
        align-content: space-between;
      }

      .gaps,
      .margins {
        max-width: 28rem;
        padding: 0.75rem;
        background: #ccfbf1;
      }

      .gaps {
        display: flex;
        gap: 1rem;
      }

      .margins {
        display: flex;
      }

      .margins .chip {
        margin: 1rem;
      }

      .stage {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 8rem;
        max-width: 24rem;
        margin: 0 0 0.5rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .auto {
        display: flex;
        height: 8rem;
        max-width: 24rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .auto .chip {
        margin: auto;
      }
    </style>
  </head>
  <body>
    <h1>剩餘空間放哪</h1>
    <p class="note">
      這些項目都沒有 flex-grow，所以主軸上有空位，justify-content 才看得出來。項目若已經把整行撐滿，六種值會看起來幾乎一樣。
    </p>

    <h2>flex-start（預設）</h2>
    <div class="bar">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
    </div>

    <h2>flex-end</h2>
    <div class="bar end">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
    </div>

    <h2>center</h2>
    <div class="bar center">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
    </div>

    <h2>space-between</h2>
    <div class="bar between">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
    </div>

    <h2>space-around</h2>
    <div class="bar around">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
    </div>

    <h2>space-evenly</h2>
    <div class="bar evenly">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
    </div>

    <h2>主軸改成直的</h2>
    <p class="note">
      column 之後，space-between 變成上下撐開，align-items: center 改管左右。同一組屬性，軸一換，畫面跟著轉。
    </p>
    <div class="stack">
      <div class="chip">頁首</div>
      <div class="chip">主文</div>
      <div class="chip">頁尾</div>
    </div>

    <h2>align-items: stretch（預設）</h2>
    <p class="note">
      交叉軸是上下。三顆都沒寫高度，所以盒子被拉成一樣高。字多的那顆只是裡面換行。
    </p>
    <div class="cross">
      <div class="chip">短</div>
      <div class="chip">這行比較長，會換行</div>
      <div class="chip">中</div>
    </div>

    <h2>flex-start</h2>
    <div class="cross start">
      <div class="chip">短</div>
      <div class="chip">這行比較長，會換行</div>
      <div class="chip">中</div>
    </div>

    <h2>center</h2>
    <div class="cross cross-center">
      <div class="chip">短</div>
      <div class="chip">這行比較長，會換行</div>
      <div class="chip">中</div>
    </div>

    <h2>flex-end</h2>
    <div class="cross cross-end">
      <div class="chip">短</div>
      <div class="chip">這行比較長，會換行</div>
      <div class="chip">中</div>
    </div>

    <h2>baseline</h2>
    <div class="cross base">
      <div class="chip sm">小字</div>
      <div class="chip lg">大字</div>
      <div class="chip">一般</div>
    </div>

    <h2>多行時的 align-content</h2>
    <p class="note">
      只有一行時，align-content 沒有視覺效果。這裡把容器加高、允許換行，並把 align-items 設成 flex-start，空位才會留在行與行之間，而不是被項目的高度吃掉。預設 normal 在多行時表現如同 stretch。
    </p>
    <h2>align-content: stretch（預設的表現）</h2>
    <div class="pack">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
      <div class="chip">北海道</div>
    </div>
    <h2>flex-start</h2>
    <div class="pack pack-start">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
      <div class="chip">北海道</div>
    </div>
    <h2>space-between</h2>
    <div class="pack pack-between">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
      <div class="chip">北海道</div>
    </div>

    <h2>gap 只在項目之間</h2>
    <div class="gaps">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
    </div>
    <h2>margin 會加在外緣</h2>
    <div class="margins">
      <div class="chip">京都</div>
      <div class="chip">金澤</div>
      <div class="chip">沖繩</div>
    </div>

    <h2>兩個軸一起置中</h2>
    <div class="stage">
      <div class="chip">justify + align</div>
    </div>
    <h2>子項 margin: auto</h2>
    <div class="auto">
      <div class="chip">margin: auto</div>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/15_flex-item.html -->
```html pages/15_flex-item.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flex 子項</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 42rem;
        color: #115e59;
      }

      .grow {
        display: flex;
        gap: 0.5rem;
        max-width: 40rem;
      }

      .cell {
        padding: 0.6rem 0.8rem;
        border: 2px solid #0f766e;
        border-radius: 0.5rem;
        background: #f0fdfa;
      }

      .one {
        flex: 1;
        min-width: 0;
      }

      .two {
        flex: 2;
        min-width: 0;
        background: #fff7ed;
        border-color: #b45309;
      }

      .eq {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .au {
        flex: auto;
        white-space: nowrap;
      }

      .fixed {
        flex: none;
        background: #fff7ed;
        border-color: #b45309;
      }

      .shrink {
        display: flex;
        gap: 0.5rem;
        width: min(100%, 22rem);
        padding: 0.5rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .sk {
        flex: 0 1 8rem;
        padding: 0.5rem;
        background: #ccfbf1;
      }

      .noshrink {
        flex-shrink: 0;
        background: #fff7ed;
      }

      .word {
        flex: 1 1 4rem;
        padding: 0.5rem;
        border: 2px solid #115e59;
        background: #f0fdfa;
      }

      .zero {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tools {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        max-width: 28rem;
        height: 4.5rem;
        padding: 0.5rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .tools a {
        padding: 0.35rem 0.7rem;
        border-radius: 0.4rem;
        background: #0f766e;
        color: #f0fdfa;
        text-decoration: none;
      }

      .first {
        order: -1;
        background: #b45309;
      }

      .low {
        align-self: flex-end;
      }

      .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        max-width: 40rem;
        padding: 0.75rem 1rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .bar p {
        margin: 0;
        font-weight: 700;
      }

      .bar nav {
        display: flex;
        gap: 0.75rem;
      }

      .bar a {
        color: #f0fdfa;
      }

      .trips {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        max-width: 46rem;
      }

      .trip {
        display: flex;
        flex: 1 1 12rem;
        flex-direction: column;
        gap: 0.45rem;
        min-width: 0;
        padding: 0.75rem;
        border: 1px solid #99f6e4;
        border-radius: 0.75rem;
        background: #fff;
      }

      .trip h3,
      .trip p {
        margin: 0;
      }

      .cover {
        height: 5.5rem;
        border-radius: 0.5rem;
        background: linear-gradient(160deg, #99f6e4, #0f766e);
      }

      .trip:nth-child(2) .cover {
        background: linear-gradient(160deg, #fde68a, #b45309);
      }

      .trip:nth-child(3) .cover {
        background: linear-gradient(160deg, #bae6fd, #0369a1);
      }

      .go {
        margin-top: auto;
        align-self: start;
        color: #115e59;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <h1>子項怎麼分剩餘空間</h1>
    <p class="note">
      flex 是 grow、shrink、basis 三個數字的簡寫。琥珀邊那幾顆是對照組。F12 點項目，看 Computed 裡的 flex-grow、flex-shrink、flex-basis。
    </p>

    <h2>1 份、2 份、1 份</h2>
    <div class="grow">
      <article class="cell one">1</article>
      <article class="cell two">2</article>
      <article class="cell one">1</article>
    </div>

    <h2>flex: 1，三欄從 0 起算</h2>
    <div class="grow">
      <article class="cell eq">京都二日</article>
      <article class="cell eq">金澤兼六園與近江町市場</article>
      <article class="cell eq">沖繩</article>
    </div>

    <h2>flex: auto，從內容寬度再放大</h2>
    <div class="grow">
      <article class="cell au">京都二日</article>
      <article class="cell au">金澤兼六園與近江町市場</article>
      <article class="cell au">沖繩</article>
    </div>

    <h2>中間 flex: none</h2>
    <div class="grow">
      <article class="cell one">彈性</article>
      <article class="cell fixed">這顆不伸也不縮</article>
      <article class="cell one">彈性</article>
    </div>

    <h2>空間不夠時誰縮小</h2>
    <p class="note">
      三顆基礎都是 8rem，容器只有 22rem。左右 flex-shrink 是 1，會讓出寬度。中間是 0，寬度守住。
    </p>
    <div class="shrink">
      <article class="sk">京都</article>
      <article class="sk noshrink">不縮小</article>
      <article class="sk">沖繩</article>
    </div>

    <h2>預設不縮得比內容更窄</h2>
    <div class="shrink">
      <article class="word">KYOTO-KIYOMIZU-STATION-WALKING-ROUTE-2026</article>
    </div>
    <h2>min-width: 0 才肯縮小</h2>
    <div class="shrink">
      <article class="word zero">KYOTO-KIYOMIZU-STATION-WALKING-ROUTE-2026</article>
    </div>

    <h2>order 只改畫面</h2>
    <p class="note">
      原始碼是報名、收藏、分享。分享的 order 是 -1，其他是 0，所以它跑到最左。鍵盤 Tab 仍照原始碼。
    </p>
    <div class="tools">
      <a href="#join">報名</a>
      <a href="#save">收藏</a>
      <a class="first" href="#share">分享</a>
      <a class="low" href="#more">沉底</a>
    </div>

    <h2>導覽列</h2>
    <header class="bar">
      <p>洛奇旅行</p>
      <nav>
        <a href="#tours">行程</a>
        <a href="#about">關於</a>
        <a href="#contact">聯絡</a>
      </nav>
    </header>

    <h2>卡片列：等高，連結沉底</h2>
    <div class="trips">
      <article class="trip">
        <div class="cover"></div>
        <h3>京都</h3>
        <p>清水寺與二年坂。</p>
        <a class="go" href="#kyoto">看行程</a>
      </article>
      <article class="trip">
        <div class="cover"></div>
        <h3>金澤</h3>
        <p>兼六園、近江町，再加上東茶屋街的散步，介紹比旁邊兩張長，按鈕仍貼著卡片底部。</p>
        <a class="go" href="#kanazawa">看行程</a>
      </article>
      <article class="trip">
        <div class="cover"></div>
        <h3>沖繩</h3>
        <p>那霸市區。</p>
        <a class="go" href="#okinawa">看行程</a>
      </article>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/16_grid.html -->
```html pages/16_grid.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grid 軌道</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 42rem;
        color: #115e59;
      }

      .grid {
        display: grid;
        gap: 0.5rem;
        max-width: 36rem;
        padding: 0.75rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .grid article {
        padding: 0.6rem 0.75rem;
        border-radius: 0.45rem;
        background: #0f766e;
        color: #f0fdfa;
      }

      .fr {
        grid-template-columns: 6rem 1fr 2fr;
      }

      .mix {
        grid-template-columns: max-content 1fr minmax(6rem, 8rem);
        align-items: center;
      }

      .mix article {
        background: #f0fdfa;
        color: #134e4a;
        border: 1px solid #99f6e4;
      }

      .repeat {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .compare {
        width: min(100%, 36rem);
      }

      .fit {
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
      }

      .fill {
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
      }

      .flow {
        grid-template-columns: repeat(2, 4.5rem);
        grid-template-rows: repeat(2, 2.6rem);
        justify-content: start;
        max-width: none;
      }

      .flow article {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .down {
        grid-auto-flow: column;
      }

      .long {
        grid-template-columns: minmax(0, 1fr) 8rem;
      }

      .long article {
        background: #f0fdfa;
        color: #134e4a;
        border: 1px solid #0f766e;
      }

      .long article:first-child {
        overflow-wrap: anywhere;
      }
    </style>
  </head>
  <body>
    <h1>先切軌道，再放項目</h1>
    <p class="note">
      三欄有四條直的格線，編號從 1 開始。兩條相鄰格線中間是一條軌道。F12 點這層，節點旁的 grid 徽章會把線畫出來。
    </p>

    <h2>6rem、1fr、2fr</h2>
    <p class="note">
      固定的 6rem 先扣掉，再扣掉兩條 gap。剩下的寬度分成 3 份，中間拿 1 份，右邊拿 2 份。
    </p>
    <div class="grid fr">
      <article>6rem</article>
      <article>1fr</article>
      <article>2fr</article>
    </div>

    <h2>max-content、1fr、minmax</h2>
    <div class="grid mix">
      <article>4/12</article>
      <article>京都．清水寺與二年坂，這欄吃掉剩餘寬度。</article>
      <article>NT$ 18,800</article>
    </div>

    <h2>repeat(3, minmax(0, 1fr))</h2>
    <div class="grid repeat">
      <article>京都</article>
      <article>金澤兼六園與近江町市場，文字再長也留在這一欄裡。</article>
      <article>沖繩</article>
    </div>

    <h2>auto-fit 會收起空欄</h2>
    <p class="note">
      容器約 36rem，每欄至少 8rem。只有兩張卡時，auto-fit 把用不到的欄寬收成 0，兩張卡把整行撐滿。請把視窗拉寬再看；窄到只放得下一欄時，兩種寫法會一樣。
    </p>
    <div class="grid compare fit">
      <article>京都</article>
      <article>金澤</article>
    </div>

    <h2>auto-fill 留下空欄</h2>
    <div class="grid compare fill">
      <article>京都</article>
      <article>金澤</article>
    </div>

    <h2>grid-auto-flow: row</h2>
    <div class="grid flow">
      <article>1</article>
      <article>2</article>
      <article>3</article>
      <article>4</article>
    </div>

    <h2>grid-auto-flow: column</h2>
    <div class="grid flow down">
      <article>1</article>
      <article>2</article>
      <article>3</article>
      <article>4</article>
    </div>

    <h2>很長的字也要縮得進 1fr</h2>
    <p class="note">
      1fr 的下限預設是 auto，會被最長的單字撐開。minmax(0, 1fr) 讓這一欄可以小於內容最小寬度，再配合換行或省略。
    </p>
    <div class="grid long">
      <article>KYOTO-KIYOMIZU-STATION-ROUTE-2026</article>
      <article>側欄</article>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/17_grid-area.html -->
```html pages/17_grid-area.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grid 區域</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
        background: #f8fafc;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 42rem;
        color: #115e59;
      }

      .mosaic {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-auto-rows: 4.5rem;
        gap: 0.5rem;
        max-width: 36rem;
      }

      .mosaic article {
        display: flex;
        align-items: center;
        padding: 0.6rem 0.75rem;
        border-radius: 0.45rem;
        background: #0f766e;
        color: #f0fdfa;
      }

      .banner {
        grid-column: 1 / -1;
        background: #115e59;
      }

      .tall {
        grid-row: span 2;
        background: #b45309;
      }

      .cells {
        display: grid;
        grid-template-columns: repeat(3, 6rem);
        grid-auto-rows: 5rem;
        gap: 0.5rem;
        justify-content: start;
        max-width: 24rem;
        padding: 0.5rem;
        background: #e2e8f0;
      }

      .cells article {
        background: #0f766e;
        color: #f0fdfa;
        padding: 0.35rem 0.5rem;
      }

      .mid {
        place-items: center;
      }

      .self {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-auto-rows: 5rem;
        gap: 0.5rem;
        max-width: 28rem;
      }

      .self article {
        background: #ccfbf1;
        color: #134e4a;
        padding: 0.4rem 0.6rem;
      }

      .corner {
        justify-self: end;
        align-self: end;
        background: #fff7ed;
      }

      .pack {
        display: grid;
        grid-template-columns: repeat(3, 5rem);
        gap: 0.5rem;
        justify-content: center;
        max-width: 28rem;
        padding: 0.75rem;
        background: #fff;
        border: 1px dashed #94a3b8;
      }

      .pack article {
        padding: 0.45rem;
        background: #0f766e;
        color: #f0fdfa;
        text-align: center;
      }

      .shell {
        display: grid;
        grid-template-columns: 8rem minmax(0, 1fr) 9rem;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          "header header header"
          "nav main aside"
          "footer footer footer";
        gap: 0.6rem;
        min-height: 22rem;
        max-width: 46rem;
      }

      .shell > * {
        padding: 0.75rem;
        border-radius: 0.5rem;
      }

      .shell header {
        grid-area: header;
        background: #115e59;
        color: #f0fdfa;
      }

      .shell nav {
        grid-area: nav;
        background: #ccfbf1;
      }

      .shell nav a {
        display: block;
        color: #134e4a;
      }

      .shell main {
        grid-area: main;
        background: #fff;
        border: 1px solid #99f6e4;
      }

      .shell aside {
        grid-area: aside;
        background: #fff7ed;
      }

      .shell footer {
        grid-area: footer;
        background: #0f766e;
        color: #f0fdfa;
      }

      .shell h2,
      .shell p {
        margin: 0.25rem 0;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: 0.75rem;
        max-width: 46rem;
      }

      .card {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        min-width: 0;
        padding: 0.75rem;
        border: 1px solid #99f6e4;
        border-radius: 0.75rem;
        background: #fff;
      }

      .card h3,
      .card p {
        margin: 0;
      }

      .photo {
        height: 5rem;
        border-radius: 0.5rem;
        background: linear-gradient(160deg, #99f6e4, #0f766e);
      }

      .card:nth-child(2) .photo {
        background: linear-gradient(160deg, #fde68a, #b45309);
      }

      .card:nth-child(3) .photo {
        background: linear-gradient(160deg, #bae6fd, #0369a1);
      }

      .card:nth-child(4) .photo {
        background: linear-gradient(160deg, #ddd6fe, #6d28d9);
      }

      .go {
        margin-top: auto;
        align-self: start;
        color: #115e59;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <h1>用名字與格線佔位子</h1>
    <p class="note">
      橫幅從第 1 條直格線跨到最後一條（-1）。琥珀塊用 grid-row: span 2 佔兩列。其餘項目照原始碼自動填進空格。
    </p>
    <div class="mosaic">
      <article class="banner">本季主打：京都櫻花五日</article>
      <article class="tall">金澤加購</article>
      <article>大阪</article>
      <article>奈良</article>
      <article>神戶</article>
    </div>

    <h2>預設把項目拉滿格子</h2>
    <div class="cells">
      <article>京都</article>
      <article>金澤</article>
      <article>沖繩</article>
    </div>

    <h2>place-items: center</h2>
    <p class="note">
      灰底是容器。項目縮回內容大小，再在自己那一格裡水平垂直置中。軌道的寬高沒有變。
    </p>
    <div class="cells mid">
      <article>京都</article>
      <article>金澤</article>
      <article>沖繩</article>
    </div>

    <h2>只有一格改 align-self / justify-self</h2>
    <div class="self">
      <article>拉滿</article>
      <article class="corner">右下</article>
      <article>拉滿</article>
    </div>

    <h2>justify-content 移動整組欄</h2>
    <p class="note">
      三欄各 5rem，比容器窄。空位在軌道外面，不是在格子裡面。這和 place-items 是兩件事。
    </p>
    <div class="pack">
      <article>京</article>
      <article>金</article>
      <article>沖</article>
    </div>

    <h2>頁面骨架</h2>
    <p class="note">
      每一區的 grid-area 對上模板裡的名字。中欄是 minmax(0, 1fr)，長字才不會把側欄擠出畫面。窄螢幕改成一欄，留到媒體查詢。
    </p>
    <div class="shell">
      <header>
        <strong>洛奇旅行</strong>
      </header>
      <nav>
        <a href="#tours">行程</a>
        <a href="#about">關於</a>
        <a href="#contact">聯絡</a>
      </nav>
      <main>
        <h2>即將出發</h2>
        <p>四月京都、五月金澤、六月沖繩。</p>
      </main>
      <aside>
        <h2>本季</h2>
        <p>清水寺步道。</p>
      </aside>
      <footer>客服 02-0000-0000</footer>
    </div>

    <h2>卡片牆：格子用 Grid，卡內用 Flex</h2>
    <div class="cards">
      <article class="card">
        <div class="photo"></div>
        <h3>京都</h3>
        <p>清水寺與二年坂。</p>
        <a class="go" href="#kyoto">看行程</a>
      </article>
      <article class="card">
        <div class="photo"></div>
        <h3>金澤</h3>
        <p>兼六園、近江町，再加上東茶屋街。介紹比較長，按鈕仍在底部。</p>
        <a class="go" href="#kanazawa">看行程</a>
      </article>
      <article class="card">
        <div class="photo"></div>
        <h3>沖繩</h3>
        <p>那霸市區。</p>
        <a class="go" href="#okinawa">看行程</a>
      </article>
      <article class="card">
        <div class="photo"></div>
        <h3>北海道</h3>
        <p>小樽運河。</p>
        <a class="go" href="#hokkaido">看行程</a>
      </article>
    </div>
  </body>
</html>
```
<!-- endtab -->
{% endtabs %}

## 選單只加連結

`index.html` 仍放在 `css/`，`href` 仍是 `pages/檔名.html`。`target="demo"` 與 iframe 的 `name="demo"` 維持相同字串，點選單只換右欄。這次預設 `src` 改成 `pages/13_flex.html`，一開就停在主軸。

{% note info %}
**小技巧：Flex 與 Grid 疊圖**
<kbd>F12</kbd> → **Elements**，展開 iframe 的文件。`display: flex` 或 `display: grid` 的節點旁邊有 **flex** 或 **grid** 徽章，點一下，頁面上會畫出主軸或格線。徽章再點一次就關掉。
{% endnote %}

# 認識 Flex

`display: flex` 寫在父層。只有直接子元素會變成彈性項目（flex item）；孫子仍由它們自己的父層排。主軸（main axis）是項目排隊的方向，交叉軸（cross axis）跟它垂直。你設的 `flex-direction` 決定哪一邊是主軸。點左邊「主軸」（`pages/13_flex.html`）。

{% mermaid graph LR %}
R["row<br/>主軸水平"] --> R2["交叉軸垂直<br/>align-items 管上下"]
C["column<br/>主軸垂直"] --> C2["交叉軸水平<br/>align-items 管左右"]
{% endmermaid %}

父層與子項各管一組屬性。後面三頁把這張表走完。`fr` 不能寫在 Flex 裡，那是 Grid 的單位。

| 寫在父層 | 做什麼 |
| --- | --- |
| `display: flex` | 這一層的直接子元素變成彈性項目 |
| `flex-direction` | 主軸方向。預設 `row` |
| `flex-wrap` | 主軸不夠時換不換行。預設 `nowrap` |
| `flex-flow` | 方向與換行的簡寫，例如 `column wrap` |
| `justify-content` | 項目在主軸上怎麼分剩餘空間 |
| `align-items` | 單行裡，項目在交叉軸上怎麼對 |
| `align-content` | 已經換行之後，行與行在交叉軸上怎麼分 |
| `gap` | 項目之間的縫，不加在容器外緣 |

| 寫在子項 | 做什麼 |
| --- | --- |
| `flex-grow` | 剩餘空間拿幾份。預設 `0`，不放大 |
| `flex-shrink` | 空間不足時縮小的比例。預設 `1` |
| `flex-basis` | 分配前的基礎尺寸。預設 `auto` |
| `flex` | 上面三個的簡寫 |
| `order` | 視覺順序。預設 `0`，不改文件順序 |
| `align-self` | 這一項自己的交叉軸對齊，蓋過父層的 `align-items` |

設成 flex 之後，直接子元素裡的 `span`、`a` 可以有寬高，`vertical-align` 不再管它們，改看 `align-items`。`float` 與 `clear` 在彈性項目上沒有效果。子項若是 `position: absolute`，它離開這條彈性行，位子規則回到第二部分。包一層 `div` 之後，裡面的東西對這一層來說只算一項。

## 主軸跟著方向走

`flex-direction` 有四個值。`row` 依書寫方向從行首排到行尾，繁中橫排就是由左到右。`row-reverse` 把主軸起點放到另一頭，畫面從右看到左，原始碼仍是 1、2、3。`column` 由上到下，`column-reverse` 由下到上。反向只適合純視覺；不要用它把「第一個連結」藏到鍵盤順序的最後。

`flex-flow: column wrap` 等於先寫 `flex-direction: column` 再寫 `flex-wrap: wrap`。簡寫少寫的那個會回到預設：只寫 `flex-flow: wrap` 時，方向仍是 `row`。

{% note success %}
**跟著做**
點 `column` 那一層，打開 flex 徽章。主軸箭頭應是垂直的。再點 `row-reverse`，確認數字 1 在右邊，Elements 裡的順序仍是 1、2、3。
{% endnote %}

## 換行

預設 `nowrap`：項目盡量留在同一行，空間不夠就縮小（因為 `flex-shrink` 預設是 1）。`13_flex.html` 的四張目的地把 `flex` 設成 `0 0 8rem`，等於不放大、不縮小、基礎寬 8rem。容器只有 22rem，所以 `nowrap` 那條出現捲軸，`wrap` 那條折成兩行。

`wrap-reverse` 會把新的一行放到交叉軸的另一側（橫排時是往上長）。課堂用 `wrap` 即可。換行之後每一行仍是一條彈性行，行與行的距離用 `gap` 或 `align-content`，不是把第二行當成另一個 flex 容器。

{% note warning %}
**注意事項**
項目之間若還留著左右 `margin`，換行時行尾、行首都會多一截外距，縫寬不好算。欄距改用父層的 `gap`。`margin` 留給「把這一項推到剩下的空間」，例如卡片裡的 `margin-top: auto`。
{% endnote %}

## 主軸與交叉軸的對齊

點左邊「對齊」（`pages/14_flex-align.html`）。`justify-content` 分的是主軸上、項目本身尺寸之外的空間。六個常用值如下。項目已經 `flex: 1` 把行撐滿時，這些值幾乎看不出差別。

| 值 | 主軸上 |
| --- | --- |
| `flex-start` | 靠起點擠在一起。預設 |
| `flex-end` | 靠終點 |
| `center` | 整組擺在中間 |
| `space-between` | 第一個貼起點、最後一個貼終點，中間的空隙相等 |
| `space-around` | 每一項兩側各一份空隙，所以兩項之間是兩份，外緣各一份 |
| `space-evenly` | 外緣與項目之間的空隙都一樣 |

`align-items` 管交叉軸。橫排時就是上下。預設 `stretch`：項目的交叉軸尺寸是 `auto` 時，被拉到跟那一行一樣高。你若寫了 `height`，就以寫下的高度為準，不再被拉。`flex-start`、`flex-end`、`center` 改靠上、靠下、置中。`baseline` 讓文字基線對齊，字級不同時盒子上緣會錯開，`14_flex-align.html` 的大字與小字就是這個。

主軸改成 `column` 之後，`justify-content: space-between` 變成上下撐開，`align-items: center` 改管左右。頁面上那塊淺青「頁首／主文／頁尾」就是這樣。先問「現在哪一邊是主軸」，再選屬性。

{% note info %}
**小技巧：置中**
父層同時寫 `justify-content: center` 與 `align-items: center`，唯一的子項會在兩個軸上置中。另一種是子項 `margin: auto`：自動外距吃掉該方向的剩餘空間。兩種都在對齊那一頁的最後。
{% endnote %}

## 多行與 gap

`align-content` 只有在換行、而且交叉軸上還有空位時才看得出來。預設值是 `normal`，多行 flex 裡的表現如同 `stretch`，行被拉高去填滿容器。對齊那一頁為了讓你看見行與行之間的縫，先把 `align-items` 設成 `flex-start`，項目才不會用高度把縫吃掉。只有一行時，改 `align-content` 不會有視覺差異。

`space-between`、`space-around`、`space-evenly`、`center` 在 `align-content` 上的意思，和它們在 `justify-content` 上一樣，只是改走交叉軸。

`gap` 是 `row-gap` 與 `column-gap` 的簡寫。一個值表示兩個方向相同。它加在項目與項目之間，不含容器外緣；外緣用父層的 `padding`。Flex 項目的垂直 margin 不會像一般區塊那樣合併，兩顆各寫 `margin: 1rem` 時，中間是 2rem，外緣也各有 1rem。對齊那一頁把 `gap: 1rem` 與 `margin: 1rem` 上下放在一起，淺青底就是父層，差別在外緣有沒有被 margin 撐出一圈。

## 子項的伸縮

點左邊「子項」（`pages/15_flex-item.html`）。分配分兩段：先用 `flex-basis` 當基礎尺寸，再把剩下的空間按 `flex-grow` 分掉；空間不夠時，再按 `flex-shrink` 縮小。預設是 `flex: 0 1 auto`，也寫成 `flex: initial`：不放大、空間不夠才縮小、基礎尺寸看內容（若你另外寫了 `width`，橫向主軸會用那個寬度）。

| 寫法 | 展開 | 畫面上 |
| --- | --- | --- |
| `flex: initial`（預設） | `0 1 auto` | 依內容，不搶剩餘空間 |
| `flex: 1` | `1 1 0%` | 基礎尺寸先當 0，再按份數均分，欄寬容易一樣 |
| `flex: auto` | `1 1 auto` | 從內容尺寸開始，再一起放大 |
| `flex: none` | `0 0 auto` | 不放大也不縮小 |
| `flex: 2` | `2 1 0%` | 分剩餘空間時拿 2 份 |

`flex: 1` 的 `0%` 在 DevTools 裡可能顯示成 `0px`，都是基礎尺寸 0。子項那一頁第一排是 1、2、1 份，中間琥珀邊應約為旁邊的兩倍。第二排三個 `flex: 1` 且不換行，欄寬相同，長句子被省略。第三排 `flex: auto`，長句子那欄比較寬，因為基礎尺寸先看內容。

`flex-basis` 用百分比時，比的是父層主軸的內側尺寸。它和 `width` 同時寫、又是橫向主軸時，以 `flex-basis` 為準；`flex-basis: auto` 才回過頭去用 `width`。

縮小也有下限。彈性項目的 `min-width` 預設是 `auto`，不會縮到比內容的最小寬度更窄。一長串沒有空白的字會把整行撐破，子項那一頁的 `KYOTO-KIYOMIZU-STATION-WALKING-ROUTE-2026` 就是。要讓 `flex-shrink` 真的生效，把該項改成 `min-width: 0`。主軸是直的、高度被內容撐破時，對應的是 `min-height: 0`。`overflow` 不是 `visible` 時，這個自動下限也會變成 0，所以有人用 `overflow: hidden` 順便把項目放開；你若只是要它肯縮小，寫 `min-width: 0` 就好。

{% note success %}
**跟著做**
點「不縮小」那一顆，把 `flex-shrink` 暫時改成 `1`。它應開始讓出寬度，左右兩顆不再被壓得那麼窄。改完可以還原。
{% endnote %}

## order 與 align-self

`order` 只改同一層項目的視覺順序，數字小的在主軸起點那側。預設都是 `0`。子項那一頁的「分享」是 `-1`，所以排到最左；原始碼仍是報名、收藏、分享。螢幕閱讀器與 <kbd>Tab</kbd> 走的是原始碼，不是 `order`。要用它做視覺調整時，確認鍵盤順序仍然講得通。

`align-self` 只改這一項的交叉軸，值與 `align-items` 相同，另外可以用 `auto` 回到跟父層一樣。同一排的「沉底」是 `align-self: flex-end`。沒有 `justify-self` 這種寫法可用在彈性項目上；主軸上要單獨推開某一項，用該側的 `margin: auto`。

## 導覽列與卡片列

一條橫列、兩端各一塊，是 Flex 最常見的樣子。品牌與 `<nav>` 是兩個項目，父層 `justify-content: space-between`、`align-items: center`。`<nav>` 自己再 `display: flex` 配 `gap`，連結才水平排開。這是兩層 Flex，外層管兩端，內層管連結彼此。

卡片列用 `flex-wrap: wrap` 與 `flex: 1 1 12rem`：基礎寬度約 12rem，容器夠寬就放大，不夠就換行。每張卡自己是 `flex-direction: column`，連結設 `margin-top: auto`，介紹文字長短不同時，連結仍貼著卡片底部。預設的 `align-items: stretch` 讓同一行的卡片一樣高，這個 `auto` 外距才有地方可推。

```css
.trips {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.trip {
  display: flex;
  flex: 1 1 12rem;
  flex-direction: column;
  min-width: 0;
}

.trip .go {
  margin-top: auto;
}
```

{% note warning %}
**注意事項**
卡片上的 `min-width: 0` 和子項那一頁的長字是同一件事。沒寫的話，某一張卡裡的長網址可能把整列撐出螢幕。Grid 的 `1fr` 也有類似下限，軌道那一頁用 `minmax(0, 1fr)` 處理。
{% endnote %}

# 認識 Grid

`display: grid` 也寫在父層，直接子元素變成網格項目（grid item）。和 Flex 不同的是，你可以同時指定欄（column，直向軌道）與列（row，橫向軌道）。項目預設依原始碼，先填滿一列再換下一列。點左邊「軌道」（`pages/16_grid.html`）。

格線（grid line）是切出來的線，編號從 1 開始，不是從 0。三欄有四條直格線。軌道（grid track）是相鄰兩條線中間的一整條欄或列。格子（grid cell）是一欄與一列交會的那一格。區域（grid area）是一塊矩形，可以跨多格，也可以取名字。

| 寫在父層 | 做什麼 |
| --- | --- |
| `display: grid` | 直接子元素變成網格項目 |
| `grid-template-columns` | 每一欄多寬 |
| `grid-template-rows` | 每一列多高 |
| `grid-template-areas` | 用名字把區域拼出來 |
| `grid-template` | 列、區域與欄的簡寫 |
| `gap` | 軌道之間的縫。舊名 `grid-gap` 不必再寫 |
| `justify-items` | 格子裡，項目的水平對齊。預設 `stretch` |
| `align-items` | 格子裡，項目的垂直對齊。預設 `stretch` |
| `place-items` | `align-items` 與 `justify-items` 的簡寫 |
| `justify-content` | 整組欄比容器窄時，欄群怎麼水平擺 |
| `align-content` | 整組列比容器矮時，列群怎麼垂直擺 |
| `place-content` | 上面兩個的簡寫 |
| `grid-auto-rows` / `grid-auto-columns` | 自動多出來的軌道要多高、多寬 |
| `grid-auto-flow` | 自動擺放沿列還是沿欄，`dense` 會回填空洞 |

| 寫在子項 | 做什麼 |
| --- | --- |
| `grid-column` / `grid-row` | 從哪條格線到哪條格線，或寫 `span 2` |
| `grid-area` | 區域名字，或四條線的簡寫 |
| `justify-self` / `align-self` | 這一格自己的對齊 |
| `place-self` | 上面兩個的簡寫 |

`justify-*` 在橫排文字裡是水平，`align-*` 是垂直。書寫方向改成直排或由右至左時，`justify` 跟著行內方向走。課堂範本是橫排繁中，先記水平與垂直即可。

## 格線與軌道尺寸

`grid-template-columns: 6rem 1fr 2fr` 代表三欄。`fr`（fraction，份數）分的是扣掉固定軌道與 `gap` 之後的剩餘空間。軌道那一頁的第一條：6rem 先佔掉，剩下的分成 3 份，中間 1 份、右邊 2 份。`fr` 不會分到 `gap` 那幾條縫。

沒寫 `grid-template-rows` 時，列數跟著內容長出來，每一列的高度是 `auto`。項目比欄數多，就自動增加列。這些自動軌道的尺寸用 `grid-auto-rows`；軌道那一頁的數字格把自動列高設成 `2.6rem`，所以四個數字格一樣高。

| 軌道尺寸 | 意思 |
| --- | --- |
| `6rem`、`20%` | 固定長度。百分比相對這層網格容器 |
| `fr` | 剩餘空間的份數 |
| `auto` | 先看內容，再吃掉還沒被 `fr` 分完的空間 |
| `max-content` | 內容不換行時需要的尺寸 |
| `min-content` | 能換行的地方都換行之後，還需要的最小尺寸 |
| `minmax(最小, 最大)` | 夾在兩個值之間 |
| `fit-content(12rem)` | 不超過這個上限，同時仍尊重內容 |

`max-content 1fr minmax(6rem, 8rem)` 用在「日期／說明／售價」這種一列：日期照字寬，售價落在 6rem 到 8rem，說明吃剩餘。`1fr` 的下限其實是 `auto`，一長串不能斷行的字會把欄撐開。要它肯縮小，寫 `minmax(0, 1fr)`，軌道那一頁最後一條就是這個：欄寬守住，長代碼在欄內斷行。

{% note info %}
**小技巧：數格線**
`grid-column: 1 / 3` 是從第 1 條線到第 3 條線，佔的是第 1 欄和第 2 欄，不是「第 1 欄到第 3 欄」。終點那條線不包含在內。`-1` 代表最後一條線，`1 / -1` 就是從最左跨到最右。
{% endnote %}

## 重複與自動填滿

同一種軌道寫很多次時用 `repeat`。`repeat(3, minmax(0, 1fr))` 是三欄等分，而且每欄都可以小於內容最小寬度。`repeat(auto-fit, minmax(8rem, 1fr))` 與 `repeat(auto-fill, minmax(8rem, 1fr))` 會依容器寬度決定欄數：每一欄至少 8rem，剩下的空間再平分。

差別在空欄。容器放得下四欄、卻只有兩張卡時，`auto-fill` 仍留下空的欄，兩張卡維持較窄；`auto-fit` 把空欄收成 0，兩張卡把整行撐滿。軌道那一頁用約 36rem 的寬度並排這兩種。視窗窄到只放得下一欄時，兩者看起來相同，把視窗拉寬再比。

`grid-auto-flow` 預設是 `row`：先往右填，滿了換下一列。改成 `column` 就先往下填，再換右邊那一欄。軌道那一頁兩個四格的數字，`row` 是 1 2 / 3 4，`column` 是 1 3 / 2 4。自動方向只影響沒有自己指定格線的項目。

{% note warning %}
**注意事項**
`auto-fit` 配 `minmax` 時，最小寬度不要寫 `1fr` 當下限，瀏覽器無法同時「未知欄數」又「每欄先拿一份」。下限用 `rem` 或 `px` 這類能算出來的長度，上限再用 `1fr`。
{% endnote %}

## 區域與跨越

點左邊「區域」（`pages/17_grid-area.html`）。跨格寫在子項。`grid-column: 1 / -1` 佔滿所有欄，`grid-row: span 2` 從自動放到的那一列再往下佔一列。頁面上的橫幅與琥珀塊就是這兩個。其餘的大阪、奈良、神戶沒寫位置，依 `grid-auto-flow: row` 填進剩下的格子。琥珀塊已經佔住左欄兩列，所以神戶會出現在它右邊，而不是左欄。

命名區域用 `grid-template-areas`。每一列是一條用引號包住的字串，列與列的格數必須相同。`.` 代表這一格先空著。子項用 `grid-area: header` 這種名字對上去。頁面骨架那一塊是：

```css
.shell {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr) 9rem;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  gap: 0.6rem;
  min-height: 22rem;
}

.shell header {
  grid-area: header;
}
```

中欄寫 `minmax(0, 1fr)`，主文裡的長字才不會把右邊的「本季」擠出容器。`min-height: 22rem` 讓中列的 `1fr` 有高度可分；父層高度是 `auto` 時，`1fr` 的列常常只跟內容一樣高。

同一組模板可以寫成 `grid-template` 簡寫：每一列先寫區域名字、再寫該列高度，最後用斜線接上各欄寬度。課堂範本用長寫法，F12 比較好對。簡寫少寫的列高會變成 `auto`。

```css
grid-template:
  "header header header" auto
  "nav main aside" 1fr
  "footer footer footer" auto
  / 8rem minmax(0, 1fr) 9rem;
```

{% note warning %}
**注意事項**
`grid-area: 1 / 1 / 3 / 3` 的順序是列起、欄起、列終、欄終，和 `grid-column: 1 / 3` 的「先欄」不一樣。名字對得起來時優先用名字；要跨格時用 `grid-column` 與 `grid-row`。四個數字留到你在讀舊碼時再認。
{% endnote %}

{% note success %}
**跟著做**
點頁面骨架的 `<main>`，確認 Styles 裡 `grid-area` 是 `main`。再點 grid 徽章，三欄兩側的線應夾住導覽與「本季」，中間是主文。
{% endnote %}

## 格子裡怎麼對齊

Grid 有兩層對齊，不要混在一起。`justify-items` 與 `align-items` 管項目在自己那一格裡面；預設 `stretch`，所以項目背景會舖滿格子。`place-items: center` 是簡寫，一個值同時設定垂直與水平。寫兩個值時，順序是對齊軸在前、行內軸在後：`place-items: center end` 表示垂直置中、水平靠終點。區域那一頁的灰底三格，置中之後軌道仍是 6rem 乘 5rem，變小的是項目自己。

`justify-self` 與 `align-self` 只改一格，蓋過父層。`place-self` 是它們的簡寫。右下那一格同時設了 `justify-self: end` 與 `align-self: end`。

`justify-content` 與 `align-content` 管的是整組軌道。三欄各 5rem、容器更寬時，空位在欄與欄的外側，`justify-content: center` 把整組欄移到容器中間。項目在格子裡仍是拉滿的。Flex 的 `justify-content` 是在分項目之間的空位；Grid 這裡是在分軌道群與容器之間的空位。格子裡的空位請改 `place-items`。

## 頁面與卡片牆

整頁分區用 Grid：頁首與頁尾跨三欄，中間是導覽、主文、側欄。這是區域名字在做的事，不是把三個區塊 `float` 到左右。窄螢幕要改成一欄時，是改這組 `grid-template`，留到第四部分的媒體查詢；現在先在夠寬的視窗把名字對上。

卡片牆若重點是「自動幾欄、欄線對齊」，用 `repeat(auto-fit, minmax(12rem, 1fr))`。每一張卡是一個格子項目，預設被拉成同行一樣高。卡的內部（圖、標題、介紹、連結）仍是一個方向，所以卡自己 `display: flex`、`flex-direction: column`，連結 `margin-top: auto`。區域那一頁最後一組就是「格子用 Grid，卡內用 Flex」。

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 0.75rem;
}

.card {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.card .go {
  margin-top: auto;
}
```

## 怎麼選

先看這一層要不要同時規定欄與列。只要一個方向上的對齊與伸縮，用 Flex。要命名區塊、跨格、或讓欄數跟著容器自動增減並且欄線對齊，用 Grid。兩種可以疊：外層 Grid 切頁面，導覽列與卡片內部再用 Flex。不要為了兩欄並排回頭改 `float`，也不要在 Flex 裡找 `fr`。

{% mermaid graph TD %}
A["這一層要排什麼"] --> B["沿一個方向<br/>導覽、按鈕、一列卡片"]
A --> C["行與列一起定<br/>頁面骨架、自動欄數"]
B --> D["display: flex"]
C --> E["display: grid"]
E --> F["格子裡的一排或一欄<br/>再 display: flex"]
{% endmermaid %}

| 畫面 | 用哪個 |
| --- | --- |
| 品牌在左、連結在右 | Flex，`space-between` 加 `align-items: center` |
| 一排按鈕、中間等距 | Flex 加 `gap` |
| 頁首、側欄、主文、頁尾 | Grid 加 `grid-template-areas` |
| 行程卡自動 2～4 欄 | Grid，`auto-fit` 與 `minmax` |
| 卡片裡的圖與「看行程」 | 卡內 Flex 直向，連結 `margin-top: auto` |
| 圖在左、文字在右繞著圖走 | 選讀的 `float`，不是多欄版面 |

{% note info %}
**小技巧：只看直接子元素**
Grid 與 Flex 都只排自己的小孩。骨架裡的 `<main>` 是一格，主文裡的標題與段落不會自動變成格子，除非你在 `<main>` 上再設一次 `display: grid` 或 `flex`。
{% endnote %}

# 選讀：float 與進階排版

這一節可以整節跳過。float 是早期把盒子撥到左邊或右邊、讓文字繞過去的辦法；多欄版面現在用 Flex 與 Grid。`inline-flex`、`subgrid`、`dense` 知道有這件事即可，不新增 `pages/` 檔。

{% note info %}
**選讀就好**
下面的片段可另存空檔自己開，或只看程式碼。跳過不影響左邊五個新示範頁。
{% endnote %}

## 文字繞排

`float: left` 把元素移到這一行的左側，後面的文字沿著它的右邊走。這仍是圖旁配一段說明的合理寫法。它會讓元素脫離一般區塊的高度計算：後面的文字若很短，父層背景可能只包住文字，圖卻凸出去。父層加上 `display: flow-root`，高度會把浮動的盒子包進來。

```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <title>文字繞排</title>
    <style>
      .story {
        display: flow-root;
        max-width: 28rem;
        background: #f0fdfa;
      }

      .shot {
        float: left;
        width: 7rem;
        height: 5rem;
        margin: 0 1rem 0.5rem 0;
        background: #0f766e;
        color: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <div class="story">
      <div class="shot">清水寺</div>
      <p>圖在左側，這段說明沿著右邊往下排。父層的 flow-root 讓淺青底包得住這張圖。</p>
    </div>
  </body>
</html>
```

拿掉 `flow-root` 再看一次，短文時淺青底會變矮，圖的下半截露在背景外面。舊文常在父層加一段看不見的 `::after { content: ""; display: block; clear: both; }`，作用同樣是把父層撐開。課堂遇到這種舊碼，改成 `flow-root` 即可。`clear: both` 寫在後面的頁尾時，頁尾會排到所有浮動的下方，不再擠在圖的旁邊。

## 舊的多欄

以前三欄並排是每欄 `float: left`、`width: 33.333%`，父層再清除浮動。欄距要用 margin 或百分比硬扣，其中一欄內容變高時，父層高度也容易算錯。現在同一件事寫成：

```css
.cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
```

讀到舊專案的 `float` 多欄，把欄寬與清除浮動換掉，不要在新頁面繼續加。廠商前綴（`-webkit-` 之類）也不要為了 Flex 或 Grid 再寫；這兩個模組在現在的瀏覽器就是標準屬性。多行文字省略那個前綴是第二部分選讀裡的例外，跟排版無關。

## 還有這些屬性

`display: inline-flex` 與 `inline-grid` 讓容器自己像 `inline-block` 一樣坐在文字行裡，裡面仍是 Flex 或 Grid。工具列若要跟旁邊一個圖示共處同一行，可以用；一般區塊版面維持 `flex` 與 `grid`。

`justify-content: safe center`：一般的 `center` 在項目比容器更寬時，會把開頭裁到捲動範圍之外。`safe` 表示空間不夠時改回靠起點。對話框裡只有一顆很寬的表單時才需要。

`grid-auto-flow: dense` 會把後面較小的項目回填到前面跨格留下的洞。視覺順序會和原始碼不同，和 Flex 的 `order` 一樣，鍵盤順序不會跟著洞走。沒有把握時維持預設的 `row`。

`subgrid` 讓子層沿用父層的欄線或列線，多張卡片的標題、售價才會跨卡對齊。寫法是子項自己 `display: grid`，再把 `grid-template-columns` 設成 `subgrid`。支援已經普遍，但課堂的卡片用「外層 Grid、卡內 Flex」就夠。卡片標題要像素級對齊時再查這一個。

`display: contents` 會讓元素自己的盒子消失，孫子變成祖父的項目。它會影響無障礙樹，課堂不要用來「少包一層」。

# 第三部分重點回顧

Flex 排一個方向。`flex-direction` 決定主軸，交叉軸跟它垂直。`justify-content` 分主軸剩餘空間，`align-items` 管交叉軸，`align-content` 只管已經換行的那些行。`gap` 加在項目之間，不加在外緣。

子項的 `flex` 是 grow、shrink、basis。`flex: 1` 從 0 起算再均分，`flex: auto` 從內容尺寸再放大，`flex: none` 不伸也不縮。預設 `min-width: auto` 不會縮得比內容更窄，要縮小就寫 `min-width: 0`。`order` 只改畫面，不改 <kbd>Tab</kbd> 順序。導覽列用兩端對齊；卡片列用 `flex-wrap`，卡內再用直向 Flex 把連結推到底。

Grid 同時切欄與列。格線從 1 起算，`grid-column: 1 / 3` 佔兩欄。`fr` 分剩餘空間，`repeat(auto-fit, minmax(12rem, 1fr))` 依寬度決定欄數並收起空欄，`auto-fill` 則把空欄留下。長字撐破 `1fr` 時改 `minmax(0, 1fr)`。區域用名字對上 `grid-template-areas`。`place-items` 管格子裡面，`justify-content` 管整組軌道。

頁面骨架用 Grid，格子裡的一排或一欄再用 Flex。float 只留在圖文繞排；多欄不要再用它。變形、轉場、動畫與媒體查詢從下一部分開始。

# 取得素材（第四部分）

同一份版面要在窄螢幕與寬螢幕都能讀，顏色與間距也要能整站一起改。這一部分把自訂屬性做成可覆寫的代幣，再用變形、轉場、動畫做互動，最後用媒體查詢改「結構」。開發者工具用來核對規則有沒有打中、斷點有沒有走到。觀念對齊 {% post_link lokiTech-css-baseclass-2 %} 的變數與 {% post_link lokiTech-css-baseclass-5 %}；第一部分選讀只看過 `--` 這個名字，這裡做成可開的頁。

沿用 `student/practice/css/`。用下面的 `index.html` 蓋掉原本那份（選單多了六項），六個新檔放進已有的 `pages/`。`pages/1`～`17` 不用改。第三部分那些在窄視窗會擠在一起的欄，這裡用查詢改結構。

{% note primary %}
**素材準備**
在 VS Code 開啟 `student/practice/`。蓋掉 `css/index.html`，把六個新檔存進 `css/pages/`。Live Server 開 `css/index.html`，左邊點「變數」。
{% endnote %}

## 檔案一覽

左邊多六項。每一頁的 CSS 仍寫在該頁 `<style>`，複製一份就能開。外層仍只用 `table` 切左右，正式站不要沿用這套外框。每一頁開頭的 `box-sizing: border-box` 沿用第二部分。

| 存檔位置 | 左邊選單 | 這一頁在講什麼 |
| --- | --- | --- |
| `index.html` | （外層，網址不變） | 選單加上變數、變形、轉場、動畫、查詢、除錯 |
| `pages/18_vars.html` | 變數 | `:root` 代幣、覆寫、備援、型別對不上 |
| `pages/19_transform.html` | 變形 | 平移、縮放、旋轉、傾斜、原點 |
| `pages/20_transition.html` | 轉場 | 時間、曲線、獨立的 `translate` |
| `pages/21_animation.html` | 動畫 | `@keyframes`、次數、填滿、減少動態 |
| `pages/22_rwd.html` | 查詢 | 窄到寬的斷點、欄數、列印 |
| `pages/23_inspect.html` | 除錯 | 給 Styles／Computed／盒子圖對的一張票卡 |

{% tabs css動態,1 %}
<!-- tab index.html -->
```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 第一至四部分</title>
  </head>
  <body style="margin: 0">
    <table style="width: 100%; height: 100vh; border-collapse: collapse">
      <tr>
        <td
          style="
            width: 12rem;
            vertical-align: top;
            border-right: 1px solid #ccc;
            padding: 1rem;
          "
        >
          <header id="site-header">
            <p>洛奇旅行 · CSS</p>
            <nav>
              <ul>
                <li><a href="pages/1_syntax.html" target="demo">語法</a></li>
                <li><a href="pages/2_where.html" target="demo">寫在哪</a></li>
                <li><a href="pages/3_selectors.html" target="demo">選擇器</a></li>
                <li><a href="pages/4_cascade.html" target="demo">權重與繼承</a></li>
                <li><a href="pages/5_units.html" target="demo">單位與顏色</a></li>
                <li><a href="pages/6_type.html" target="demo">文字與字型</a></li>
                <li><a href="pages/7_bg.html" target="demo">背景</a></li>
                <li><a href="pages/8_box.html" target="demo">盒子</a></li>
                <li><a href="pages/9_space.html" target="demo">間距</a></li>
                <li><a href="pages/10_display.html" target="demo">display</a></li>
                <li><a href="pages/11_position.html" target="demo">定位</a></li>
                <li><a href="pages/12_flow.html" target="demo">層級與溢出</a></li>
                <li><a href="pages/13_flex.html" target="demo">主軸</a></li>
                <li><a href="pages/14_flex-align.html" target="demo">對齊</a></li>
                <li><a href="pages/15_flex-item.html" target="demo">子項</a></li>
                <li><a href="pages/16_grid.html" target="demo">軌道</a></li>
                <li><a href="pages/17_grid-area.html" target="demo">區域</a></li>
                <li><a href="pages/18_vars.html" target="demo">變數</a></li>
                <li><a href="pages/19_transform.html" target="demo">變形</a></li>
                <li><a href="pages/20_transition.html" target="demo">轉場</a></li>
                <li><a href="pages/21_animation.html" target="demo">動畫</a></li>
                <li><a href="pages/22_rwd.html" target="demo">查詢</a></li>
                <li><a href="pages/23_inspect.html" target="demo">除錯</a></li>
              </ul>
            </nav>
          </header>
        </td>
        <td style="padding: 0">
          <main>
            <iframe
              name="demo"
              src="pages/18_vars.html"
              title="示範內容"
              style="width: 100%; height: 100vh; border: 0"
            ></iframe>
          </main>
        </td>
      </tr>
    </table>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/18_vars.html -->
```html pages/18_vars.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>自訂屬性</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      /* 代幣放在 :root，整份文件都能繼承到 */
      :root {
        --ink: #134e4a;
        --paper: #f8fafc;
        --card: #fff;
        --brand: #0f766e;
        --brand-ink: #f0fdfa;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --radius: 0.75rem;
      }

      /* 系統是深色時只改代幣，元件仍寫 var() */
      @media (prefers-color-scheme: dark) {
        :root {
          --ink: #ccfbf1;
          --paper: #042f2e;
          --card: #0b3f3c;
          --brand: #2dd4bf;
          --brand-ink: #042f2e;
        }
      }

      body {
        margin: var(--space-lg);
        color: var(--ink);
        background: var(--paper);
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 var(--space-sm);
      }

      h2 {
        font-size: 1.15rem;
        margin: var(--space-lg) 0 var(--space-sm);
      }

      .note {
        max-width: 40rem;
      }

      .swatches {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .swatches li {
        width: 7rem;
        padding: var(--space-sm);
        border-radius: var(--radius);
        background: var(--brand);
        color: var(--brand-ink);
        text-align: center;
      }

      .swatches .ink {
        background: var(--ink);
        color: var(--paper);
      }

      .swatches .paper {
        background: var(--paper);
        color: var(--ink);
        border: 1px solid var(--brand);
      }

      .card {
        max-width: 22rem;
        margin-top: var(--space-md);
        padding: var(--space-md);
        border-radius: var(--radius);
        background: var(--card);
        color: var(--ink);
      }

      .card h3 {
        margin: 0 0 var(--space-sm);
      }

      .go {
        display: inline-block;
        margin-top: var(--space-sm);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius);
        background: var(--brand);
        color: var(--brand-ink);
        text-decoration: none;
      }

      /* 這一張改自己的代幣，子孫的 var() 跟著走 */
      .night {
        --ink: #f0fdfa;
        --paper: #134e4a;
        --brand: #5eead4;
        --brand-ink: #134e4a;
        background: var(--paper);
        color: var(--ink);
      }

      .tag {
        display: inline-block;
        margin-top: var(--space-md);
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        background: var(--tag-bg, #ffedd5);
        color: var(--tag-ink, #9a3412);
      }

      /* --space-md 是長度，拿去當 color 會在計算時失效 */
      .bad {
        color: #9f1239;
        color: var(--space-md);
      }
    </style>
  </head>
  <body>
    <h1>代幣集中在 :root</h1>
    <p class="note">
      色塊、卡片、按鈕都讀同一組名字。系統若是深色，這一頁的底與字會整組換掉；淺色系統請先看下面那張夜卡。
    </p>
    <ul class="swatches">
      <li>brand</li>
      <li class="ink">ink</li>
      <li class="paper">paper</li>
    </ul>
    <h2>元件沿用，區塊可覆寫</h2>
    <article class="card">
      <h3>清水寺清晨</h3>
      <p>這張卡用全站的 --ink 與 --brand。</p>
      <a class="go" href="#kiyomizu">看行程</a>
    </article>
    <article class="card night">
      <h3>夜巴士</h3>
      <p>這張卡把自己的 --ink、--paper、--brand 換掉，按鈕跟著變。</p>
      <a class="go" href="#night">看行程</a>
    </article>
    <h2>備援與對不上的型別</h2>
    <p class="tag">沒有定義 --tag-bg，所以用備援的杏色。</p>
    <p class="bad">
      這段把長度變數塞進 color。Computed 的字色會回到 body，不會變成玫瑰紅，也不會變成 1rem。
    </p>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/19_transform.html -->
```html pages/19_transform.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>變形</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        background: #f8fafc;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 40rem;
      }

      .board {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
        gap: 1.25rem;
        max-width: 46rem;
        margin-top: 1rem;
      }

      figure {
        margin: 0;
      }

      /* 虛線是排版位子，變形不會把它撐大 */
      .slot {
        height: 6.5rem;
        border: 1px dashed #94a3b8;
        background: #fff;
      }

      .box {
        width: 5rem;
        height: 5rem;
        margin: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        background: #0f766e;
        color: #f0fdfa;
      }

      figcaption {
        margin-top: 0.35rem;
        font-size: 0.9rem;
      }

      .move {
        transform: translate(1rem, 0.4rem);
      }

      .grow {
        transform: scale(1.15);
      }

      .turn {
        transform: rotate(18deg);
      }

      .lean {
        transform: skewX(12deg);
      }

      .hinge {
        transform-origin: left bottom;
        transform: rotate(-18deg);
      }

      .combo {
        transform: translateX(0.4rem) rotate(12deg);
      }
    </style>
  </head>
  <body>
    <h1>變形只改畫出來的樣子</h1>
    <p class="note">
      每張虛線框是這顆方塊在排版裡佔的位子。方塊轉開、放大之後，虛線框的大小與隔壁的距離都不變。
    </p>
    <div class="board">
      <figure>
        <div class="slot"><div class="box">原樣</div></div>
        <figcaption>沒有 transform</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box move">平移</div></div>
        <figcaption>translate(1rem, 0.4rem)</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box grow">放大</div></div>
        <figcaption>scale(1.15)</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box turn">旋轉</div></div>
        <figcaption>rotate(18deg)</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box lean">傾斜</div></div>
        <figcaption>skewX(12deg)</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box hinge">左下</div></div>
        <figcaption>原點在左下再旋轉</figcaption>
      </figure>
    </div>
    <h2>兩個函式寫在同一條</h2>
    <div class="board">
      <figure>
        <div class="slot"><div class="box combo">先轉</div></div>
        <figcaption>右邊的 rotate 先做，再 translateX</figcaption>
      </figure>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/20_transition.html -->
```html pages/20_transition.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>轉場</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        background: #f8fafc;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 40rem;
      }

      .go {
        display: inline-block;
        margin-top: 0.75rem;
        padding: 0.55rem 1rem;
        border: 0;
        border-radius: 0.6rem;
        background: #0f766e;
        color: #f0fdfa;
        font: inherit;
        cursor: pointer;
        transition: background-color 200ms ease, translate 200ms ease;
      }

      .go:focus-visible {
        outline: 2px solid #115e59;
        outline-offset: 3px;
      }

      .tracks {
        display: grid;
        gap: 0.75rem;
        max-width: 24rem;
        margin-top: 0.75rem;
      }

      .track {
        display: grid;
        grid-template-columns: 5.5rem 1fr;
        align-items: center;
        gap: 0.5rem;
      }

      .lane {
        width: 16rem;
        height: 2rem;
        overflow: hidden;
        background: #e2e8f0;
        border-radius: 999px;
      }

      .knob {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: #0f766e;
      }

      .ease .knob {
        transition: translate 800ms ease;
      }

      .linear .knob {
        transition: translate 800ms linear;
      }

      .in .knob {
        transition: translate 800ms ease-in;
      }

      .out .knob {
        transition: translate 800ms ease-out;
      }

      .lift {
        max-width: 16rem;
        margin-top: 0.75rem;
        padding: 1rem;
        border-radius: 0.75rem;
        background: #fff;
        box-shadow: 0 1px 2px rgb(15 23 42 / 0.08);
        rotate: -1deg;
        transition: translate 200ms ease, box-shadow 200ms ease;
      }

      /* 有懸停能力的裝置才抬起，觸控螢幕不會卡在移入狀態 */
      @media (hover: hover) and (pointer: fine) {
        .go:hover {
          background: #115e59;
          translate: 0 -2px;
        }

        .track:hover .knob {
          translate: 14rem 0;
        }

        .lift:hover {
          translate: 0 -0.4rem;
          box-shadow: 0 0.75rem 1.5rem rgb(15 118 110 / 0.2);
        }
      }
    </style>
  </head>
  <body>
    <h1>轉場只接兩個狀態</h1>
    <p class="note">
      把指標移到按鈕、軌道或卡片上。鍵盤使用者按 <kbd>Tab</kbd> 時，按鈕會出現外框。觸控螢幕沒有真正的懸停，這頁的移入效果包在 hover 查詢裡。
    </p>
    <button class="go" type="button">看行程</button>
    <h2>同一段位移，四種曲線</h2>
    <div class="tracks">
      <div class="track ease">
        <span>ease</span>
        <div class="lane"><div class="knob"></div></div>
      </div>
      <div class="track linear">
        <span>linear</span>
        <div class="lane"><div class="knob"></div></div>
      </div>
      <div class="track in">
        <span>ease-in</span>
        <div class="lane"><div class="knob"></div></div>
      </div>
      <div class="track out">
        <span>ease-out</span>
        <div class="lane"><div class="knob"></div></div>
      </div>
    </div>
    <h2>抬起時保留原本的旋轉</h2>
    <article class="lift">
      <h3>嵐山</h3>
      <p>卡片本來就 rotate 了一點。移入只改 translate，角度還在。</p>
    </article>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/21_animation.html -->
```html pages/21_animation.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>動畫</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        background: #f8fafc;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 40rem;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-top: 0.75rem;
      }

      .badge {
        display: inline-block;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        background: #9f1239;
        color: #fff1f2;
        animation: pulse 1.6s ease-in-out infinite;
      }

      .spin {
        width: 1.6rem;
        height: 1.6rem;
        border: 3px solid #99f6e4;
        border-top-color: #0f766e;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }

      .spin:hover {
        animation-play-state: paused;
      }

      .enter {
        max-width: 18rem;
        padding: 1rem;
        border-radius: 0.75rem;
        background: #fff;
        animation-name: enter;
        animation-duration: 0.7s;
        animation-timing-function: ease;
        animation-fill-mode: both;
      }

      .enter h3 {
        margin: 0 0 0.35rem;
      }

      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.08);
        }
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes enter {
        from {
          opacity: 0;
          transform: translateY(0.6rem);
        }

        to {
          opacity: 1;
          transform: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .badge,
        .spin,
        .enter {
          animation: none;
        }
      }
    </style>
  </head>
  <body>
    <h1>動畫自己沿關鍵影格走</h1>
    <p class="note">
      熱賣標籤會反覆縮放，圓環會轉。指標停在圓環上時暫停。行程卡進場只播一次，結束後留在最後一格。系統若要求減少動態，這三個動畫會關掉。
    </p>
    <div class="row">
      <span class="badge">熱賣</span>
      <div class="spin" role="img" aria-label="載入中"></div>
    </div>
    <h2>進場只播一次</h2>
    <article class="enter">
      <h3>金閣寺</h3>
      <p>重新整理這頁，卡片會從稍下方淡入。fill-mode 讓它停留在看得到的狀態。</p>
    </article>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/22_rwd.html -->
```html pages/22_rwd.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>媒體查詢</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :root {
        --ink: #134e4a;
        --paper: #f8fafc;
        --card: #fff;
        --cols: 1fr;
      }

      body {
        margin: 0;
        color: var(--ink);
        background: var(--paper);
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .layout {
        display: grid;
        gap: 1rem;
        padding: 1rem;
      }

      header,
      nav,
      .main,
      aside {
        padding: 0.9rem 1rem;
        border-radius: 0.75rem;
        background: var(--card);
      }

      h1 {
        font-size: 1.5rem;
        margin: 0;
      }

      h2 {
        font-size: 1.1rem;
        margin: 0 0 0.5rem;
      }

      .now {
        margin: 0.35rem 0 0;
        color: #115e59;
      }

      .now::after {
        content: "單欄，導覽橫排";
      }

      nav ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      nav a {
        color: #0f766e;
      }

      .cards {
        display: grid;
        grid-template-columns: var(--cols);
        gap: 0.75rem;
      }

      .cards article {
        padding: 0.75rem;
        border-radius: 0.6rem;
        background: #f0fdfa;
      }

      .cards h3 {
        margin: 0 0 0.25rem;
      }

      .cards p {
        margin: 0;
      }

      /* 查詢裡的 rem 跟瀏覽器預設字級走，通常 16px */
      @media (min-width: 32rem) {
        :root {
          --cols: 1fr 1fr;
        }

        .now::after {
          content: "卡片兩欄";
        }
      }

      @media (min-width: 48rem) {
        .layout {
          grid-template-columns: 12rem 1fr;
          grid-template-areas:
            "head head"
            "nav main"
            "nav side";
          align-items: start;
        }

        header {
          grid-area: head;
        }

        nav {
          grid-area: nav;
        }

        .main {
          grid-area: main;
        }

        aside {
          grid-area: side;
        }

        nav ul {
          flex-direction: column;
        }

        .now::after {
          content: "側欄版面";
        }
      }

      @media print {
        nav,
        .now,
        aside {
          display: none;
        }

        body {
          background: #fff;
          color: #000;
        }

        header,
        .main {
          background: #fff;
        }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <header>
        <h1>洛奇旅行</h1>
        <p class="now">這一頁的視窗現在是：</p>
      </header>
      <nav>
        <ul>
          <li><a href="#kyoto">京都</a></li>
          <li><a href="#hokkaido">北海道</a></li>
          <li><a href="#okinawa">沖繩</a></li>
        </ul>
      </nav>
      <div class="main">
        <h2>本週行程</h2>
        <div class="cards">
          <article>
            <h3>清水寺</h3>
            <p>清晨階梯人少。</p>
          </article>
          <article>
            <h3>嵐山</h3>
            <p>渡月橋步行。</p>
          </article>
          <article>
            <h3>伏見</h3>
            <p>千本鳥居。</p>
          </article>
          <article>
            <h3>金閣寺</h3>
            <p>庭園一圈。</p>
          </article>
        </div>
      </div>
      <aside>
        <h2>行前</h2>
        <p>窄螢幕時這欄排在行程下面。寬螢幕時它跟導覽同一欄的下方。</p>
      </aside>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/23_inspect.html -->
```html pages/23_inspect.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>用開發者工具對樣式</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :root {
        --ink: #134e4a;
        --paper: #fff;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        background: #f8fafc;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      .note {
        max-width: 40rem;
      }

      .ticket {
        width: 18rem;
        margin: 1.5rem 0;
        padding: 1rem;
        border: 4px solid #0f766e;
        border-radius: 0.75rem;
        background: var(--paper);
        color: #94a3b8; /* 同屬性，下一條會蓋過 */
        colour: red; /* 拼錯，整條丟掉 */
        color: var(--ink);
      }

      .ticket h2 {
        margin: 0 0 0.35rem;
        font-size: 1.25rem;
      }

      #featured {
        color: #9f1239;
      }

      .price {
        margin: 0.75rem 0 0;
        font-size: 1.35rem;
      }

      .go {
        display: inline-block;
        margin-top: 0.75rem;
        padding: 0.45rem 0.9rem;
        border-radius: 0.5rem;
        background: #0f766e;
        color: #f0fdfa;
        text-decoration: none;
        transition: background-color 200ms ease, translate 200ms ease;
      }

      @media (hover: hover) and (pointer: fine) {
        .go:hover {
          background: #115e59;
          translate: 0 -2px;
        }
      }
    </style>
  </head>
  <body>
    <h1>這一張票用來對面板</h1>
    <p class="note">
      選中下面的 article。Styles 裡應看到被劃掉的灰色 color、無效的 colour，以及贏過 class 的 id 顏色。盒子圖的寬度含 padding 與邊框。
    </p>
    <article id="featured" class="ticket">
      <h2>京都一日</h2>
      <p>含清水寺與嵐山。id 的字色蓋過 class。</p>
      <p class="price">NT$ 2,400</p>
      <a class="go" href="#book">報名</a>
    </article>
  </body>
</html>
```
<!-- endtab -->
{% endtabs %}

## 選單只加連結

`index.html` 仍放在 `css/`，`href` 仍是 `pages/檔名.html`。`target="demo"` 與 iframe 的 `name="demo"` 維持相同字串，點選單只換右欄。這次預設 `src` 改成 `pages/18_vars.html`，一開就停在變數。

媒體查詢看的是**那一份文件自己的視窗**。示範頁開在右欄 iframe 裡時，視窗就是 iframe 的寬，不是整台螢幕的解析度。你把瀏覽器拉窄，右欄變窄，`22_rwd.html` 的斷點會跟著走。正式站沒有這層 iframe，查詢直接看瀏覽器視窗。

{% note info %}
**小技巧：先確認檔有載入**
左邊點了右邊空白時，多半是路徑或檔名和選單不一致。<kbd>F12</kbd> → **Network**，篩 **Doc**，看那一列是不是紅色的 `404`。
{% endnote %}

# 認識自訂屬性

自訂屬性（custom properties）是你自己命名、可被繼承的 CSS 值，寫法是 `--名字: 值`。取用時寫 `var(--名字)`。第一部分選讀看過品牌色收成變數；這裡用 `pages/18_vars.html` 把色、間距、圓角收成一組代幣，改一處就整頁一起變。

它們跟預處理器的變數不同：瀏覽器在套用樣式時才算出來，所以會參加繼承與覆寫。JavaScript 之後可以用 `element.style.setProperty("--brand", "#9f1239")` 改同一個名字。今天先只在樣式表裡改。

{% mermaid graph TD %}
R[":root 的 --brand"] --> B["body、一般卡片繼承"]
R --> N[".night 再宣告一次 --brand"]
N --> C["這張卡與裡面的按鈕讀到新值"]
{% endmermaid %}

| 寫法 | 做什麼 |
| --- | --- |
| `--brand: #0f766e` | 宣告。名字區分大小寫，`--Brand` 是另一個 |
| `var(--brand)` | 取用。可以用在任何屬性值，也能放進 `calc()` |
| `var(--tag-bg, #ffedd5)` | 第二個引數是備援，只有變數**沒有定義**時才用 |
| `:root { }` | 選到文件根（HTML 文件就是 `html`），適合全站代幣 |

## 宣告與 var()

代幣放在 `:root`，`body` 的字色、底色、間距都寫 `var(--ink)` 這種名字，不要在每個元件再抄一次色碼。卡片底用 `--card`：系統改成深色時，這顆底與 `--ink` 一起換，淺色字才不會留在白卡片上。`18_vars.html` 的三個色塊與「清水寺」那張卡讀的是同一組。間距用 `--space-sm`、`--space-md`、`--space-lg`，圓角用 `--radius`。之後要改品牌，只改 `:root` 那一段。

`calc(var(--space-md) * 1.5)` 可以拿代幣做算術。乘除時乘號兩側留空格。代幣裡若已經寫了單位（`1rem`），`calc()` 不要再加一次單位。

{% note success %}
**跟著做**
點「變數」。<kbd>F12</kbd> 選中 `<html>`，在 **Styles** 把 `--brand` 改成 `#9f1239`。色塊與第一張卡的按鈕應一起變，夜卡的按鈕仍是淺青，因為它自己又宣告了 `--brand`。
{% endnote %}

## 繼承、覆寫、備援

自訂屬性會繼承。子元素沒有自己的 `--ink` 時，用的是祖先那一個。`.night` 在卡片上重新宣告 `--ink`、`--paper`、`--brand`、`--brand-ink`，這張卡和裡面的連結讀到新值，外面的頁面不受影響。要做「這一個區塊換膚」，覆寫代幣比把每條 `color` 重寫一遍短。

`var(--tag-bg, #ffedd5)` 的備援只在「這個名字完全沒被宣告」時出現。`18_vars.html` 的杏色標籤就是這樣。變數有宣告、但值是空的或型別不合，備援**不會**上場。備援也可以是另一個 `var()`。

名字用用途，例如 `--ink`、`--space-md`。`--blue`、`--big` 這種名字在換膚時會說謊：深色模式下那顆「藍」可能已經不是藍。

{% note warning %}
**注意事項**
`var()` 不能當屬性名稱，只能當值。`var(--which): 1rem` 這種寫法整條無效。也不要把整條規則放進變數裡。
{% endnote %}

## 值的型別

自訂屬性存的是一串符號，瀏覽器先不檢查它是不是顏色或長度。等到放進某個屬性、進入計算值時才檢查。`18_vars.html` 的 `.bad` 寫了兩次 `color`：先是玫瑰紅，再是 `var(--space-md)`。`--space-md` 有定義，所以備援用不上；它的值是 `1rem`，不能當顏色。層疊已經選了第二條，計算時這條作廢，字色改走繼承，也就是 `body` 的 `--ink`。同一條規則裡寫在前面的玫瑰紅不會回來。

在 **Computed** 看這段的 `color`，應是深青綠一類的繼承值。**Styles** 裡那條 `var(--space-md)` 會標成無效或無法計算。這也是代幣要分開命名的原因：長度與顏色不要共用一個名字。

系統偏好深色時，同一頁用 `@media (prefers-color-scheme: dark)` 只覆寫 `:root` 的代幣，元件不用各寫一套深色規則。淺色系統的課堂電腦看不出這段，下一節的開發者工具可以用面板模擬。查詢本身的寫法，在媒體查詢那一章。

# 認識變形與動態

變形（transform）改的是元素畫出來的位置、大小、角度，排版位子不動。轉場（transition）在兩個狀態之間補間，例如移入與移出。動畫（animation）用關鍵影格自己播，可以循環。三頁分開：`19_transform.html`、`20_transition.html`、`21_animation.html`。要動的優先是 `transform` 與 `opacity`；用 `top`、`left`、`width` 做每幀位移，容易拖慢版面計算。

{% mermaid graph LR %}
T["transform<br/>改畫面，不改佔位"] --> Tr["transition<br/>有人觸發才從 A 到 B"]
T --> A["animation<br/>依 keyframes 自己播"]
{% endmermaid %}

| | 轉場 | 動畫 |
| --- | --- | --- |
| 何時動 | 屬性值變了才動，例如 `:hover`、`:focus-visible` | 套上就播，不必等指標 |
| 狀態 | 起點與終點兩個 | `@keyframes` 可多段 |
| 循環 | 不會自己循環 | `infinite` 或指定次數 |
| 課堂例子 | 按鈕變色、卡片抬起 | 熱賣縮放、載入圓環、進場 |

## 變形不推動鄰居

`transform` 接受一串函式，函式之間用空格分開。`19_transform.html` 每一格的虛線框是排版位子：方塊 `translate` 出去、`scale` 變大、`rotate` 轉開，虛線框的寬高與格子之間的 `gap` 都不變。旁邊的文字不會被推開。真的要佔更大的位子，改寬高或 `margin`，不要靠放大硬撐。

| 函式 | 效果 | 這一頁的值 |
| --- | --- | --- |
| `translate(x, y)` | 平移。百分比相對**自己**的寬高 | `translate(1rem, 0.4rem)` |
| `translateX`／`translateY` | 只動一軸 | 組合那一格用了 `translateX` |
| `scale(n)` | 縮放。`1` 是原寸，`1.15` 是放大 | `scale(1.15)` |
| `rotate(角度)` | 旋轉。單位用 `deg` | `rotate(18deg)` |
| `skewX`／`skewY` | 傾斜。按鈕與卡片很少需要 | `skewX(12deg)` |

`transform-origin` 是旋轉與縮放的基準點，預設是中心。`.hinge` 把原點放在 `left bottom`，方塊像以左下角為軸轉開。原點可以寫關鍵字，也可以寫長度或百分比。

同一條 `transform` 裡，**右邊的函式先套用**。`.combo` 寫的是 `translateX(0.4rem) rotate(12deg)`，所以先轉 12 度，再沿水平方向平移。把兩個函式對調，平移的方向會跟著已旋轉的軸走，畫面不一樣。課堂先一個動作一個函式；要疊加時對調一次，確認順序。

`matrix()` 是把平移、縮放、旋轉壓成六個數字，給工具產生即可，不要手算。立體翻面放在選讀。廠商前綴不用加，Chrome 直接吃標準的 `transform`。

{% note warning %}
**注意事項**
變形後的元素仍佔原來的位子，點擊範圍以變形後的畫面為準。第二部分提過：祖先若有 `transform`，子孫的 `position: fixed` 會改以那個祖先為視窗。卡片要加 `transform` 時，不要把全站的固定頁首包在同一層裡面。
{% endnote %}

{% note success %}
**跟著做**
點「變形」，打開 **Elements** 選一顆 `.box`。在 **Styles** 把 `rotate(18deg)` 改成 `rotate(90deg)`。虛線 `.slot` 的盒子圖寬高應幾乎不變，方塊則轉出虛線外。
{% endnote %}

## 轉場連接兩個狀態

有人讓某個屬性從舊值變成新值時，`transition` 把中間的畫面補上。`20_transition.html` 的按鈕在平常與 `:hover` 之間補 `background-color` 與 `translate`。沒有寫進 `transition` 的屬性會瞬間切換。

簡寫的順序是：屬性、持續時間、速度曲線、延遲。前兩個最常寫。

```css
transition: background-color 200ms ease, translate 200ms ease;
```

逗號分隔多個屬性。時間寫兩個時，第一個是持續時間，第二個是延遲：`200ms ease 80ms` 表示等 80 毫秒再花 200 毫秒走完。只寫一個時間，那個就是持續時間，延遲是 0。

| 曲線 | 走路的方式 |
| --- | --- |
| `ease` | 慢、快、再慢。預設，多數介面夠用 |
| `linear` | 等速 |
| `ease-in` | 先慢後快 |
| `ease-out` | 先快後慢，東西停下來時比較順 |
| `cubic-bezier(n, n, n, n)` | 自訂曲線。選讀再碰 |

這一頁四條軌道的位移距離與 800ms 相同，只有曲線不同。指標移入軌道，圓點一起出發，到達右側的節奏不一樣。介面回饋用 150～300ms 就夠；長過半秒會像在等它。

`:hover` 只描述指標移入。觸控螢幕常常沒有「移出」，效果會卡住。這頁把移入規則包在 `@media (hover: hover) and (pointer: fine)` 裡：有滑鼠一類的細指標時才抬起。鍵盤改看 `:focus-visible`，按鈕用 `outline`，不要把外框設成 `none` 卻不給替代。

抬起的卡片另外用了獨立屬性 `rotate` 與 `translate`，沒有寫進 `transform` 那一條。獨立屬性互不覆蓋：移入只改 `translate`，原本的 `rotate: -1deg` 還在。若把角度與位移都塞進同一個 `transform`，移入那一條必須把 `rotate` 再寫一次，否則角度會被清掉。`translate`、`rotate`、`scale` 的套用順序固定，與你在規則裡書寫的先後無關。同一種動作不要兩邊各寫一套。

{% note info %}
**小技巧：不要寫 all**
`transition: all 300ms` 會把之後加上的任何屬性都補間，包含你沒打算動的顏色或尺寸。逐條寫出 `background-color`、`translate`、`opacity`、`box-shadow`。
{% endnote %}

## 動畫自己播放

轉場需要一個新值才會動。動畫用 `@keyframes` 寫腳本，元素一套上 `animation` 就播。`21_animation.html` 有三個：熱賣標籤循環縮放、載入圓環一直轉、行程卡進場一次。

關鍵影格的名字自己取，跟 class 無關。`from` 等於 `0%`，`to` 等於 `100%`。可以只寫百分比。

```css
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}
```

套到元素上時，持續時間必須寫，否則預設是 `0s`，你看不見過程。簡寫裡第一個時間仍是持續時間，第二個時間才是延遲。

| 屬性 | 這一頁怎麼用 |
| --- | --- |
| `animation-name` | `pulse`、`spin`、`enter`，要和 `@keyframes` 同名 |
| `animation-duration` | 圓環 `0.7s`，進場 `0.7s`，標籤 `1.6s` |
| `animation-timing-function` | 標籤 `ease-in-out`，圓環 `linear` |
| `animation-iteration-count` | 標籤與圓環是 `infinite`，進場省略就是 `1` 次 |
| `animation-direction` | 預設 `normal`。`alternate` 會去程播完再倒著播 |
| `animation-fill-mode` | 進場用 `both`：延遲期間先套第一格，結束停在最後一格 |
| `animation-play-state` | 指標停在圓環上時設 `paused` |

熱賣那條的簡寫是 `animation: pulse 1.6s ease-in-out infinite`。進場故意拆開長屬性，方便在 **Styles** 裡逐條對。`fill-mode: both` 讓卡片在動畫開始前就是透明並稍微下移，結束後留在不透明的位置。預設 `none` 會在播完的瞬間跳回元素自己的樣式；這張卡的靜止樣式本來就是不透明，差別不大，但若靜止時沒寫 `opacity: 1`，沒有 `forwards` 或 `both` 就會閃回。

`@keyframes spin` 只寫了 `to { transform: rotate(360deg); }`。起點用元素當下的變形（沒有寫就是 0 度）。圓環用邊框顏色做出缺口，本身沒有文字；`role="img"` 與 `aria-label` 讓它有名字。純裝飾的動畫不要拿去傳達「必讀」的訊息。

系統開啟「減少動態」時，`@media (prefers-reduced-motion: reduce)` 把這三個 `animation` 設成 `none`。前庭、平衡感較敏感的人會開這個選項。循環的縮放與旋轉最應該讓步；進場淡入也一併關掉，頁面仍可讀。開發者工具可以模擬這個偏好，不用改作業系統。

{% note warning %}
**注意事項**
無限循環的大面積動畫很耗電，也會讓人忽略真正要點的按鈕。一個狀態用一兩個小元素即可。不要為了舊文章裡的「硬體加速」去加 `translateZ(0)` 或廠商前綴。
{% endnote %}

# 認識媒體查詢

響應式網頁（responsive web design，RWD）是同一份 HTML，依畫面寬度改排版，而不是做一個手機站、一個桌機站。流動的部分在前三部分已經有了：`max-width`、`min()`、Flex 的 `wrap`、Grid 的 `auto-fit` 與 `minmax`。那些能自己換行、自己決定欄數。媒體查詢（media query）留給**結構要變**的時候：導覽從橫排改成直排、側欄挪到主文旁邊。點左邊「查詢」（`pages/22_rwd.html`）。

視窗寬度來自 `width` 這個媒體特性。文件的 `<meta name="viewport" content="width=device-width, initial-scale=1.0">` 讓手機用裝置寬度當視窗，而不是用一顆桌機寬度再縮小。這一行第二天就寫在每一頁的 `head`，拿掉之後手機常把整頁縮成一小條。

{% mermaid graph TD %}
B["預設：單欄、導覽橫排"] --> M["min-width: 32rem<br/>卡片改兩欄"]
M --> W["min-width: 48rem<br/>導覽變側欄"]
{% endmermaid %}

## 流動版面先做完

先讓窄畫面就讀得完，再往寬的加規則。`22_rwd.html` 預設是一欄：頁首、導覽、行程、行前提示依原始碼由上到下。導覽用 Flex 橫向換行。卡片的欄數放在 `--cols`，預設 `1fr`。圖片若之後加進來，仍給 `max-width: 100%`，避免比父層更寬。

能用 `repeat(auto-fit, minmax(12rem, 1fr))` 解決的卡片牆，不必再為 700px、800px 各寫一條查詢。第三部分的卡片牆就是這種。查詢是欄數算法不夠用、或導覽與主文的**位置關係**要改時才加。

字級繼續用 `rem`。第一部分看過 `4vw` 會在窄視窗小到不能讀。內文不要改跟視窗寬度跑。標題若要略為伸縮，再用 `clamp()`，斷點不要拿來只改 1px 的字級。

{% note info %}
**小技巧：斷點跟著內容**
把視窗慢慢拉寬，在「導覽擠成兩行」或「一行只剩一個字」的地方設斷點。手機 390、平板 768、桌機 1200 只是常見寬度的參考，不是每站都要抄這三個數字。
{% endnote %}

## 斷點由窄到寬

`@media (min-width: 32rem)` 的意思是：視窗寬度**大於等於** 32rem 時，括號裡的規則才加入層疊。查詢裡的 `rem` 相對瀏覽器預設字級（通常 16px），不受你寫在 `html` 上的 `font-size` 影響。32rem 大約是 512px，48rem 大約是 768px。

這一頁由小到大寫了兩段：

| 視窗 | 畫面上的句子 | 發生的事 |
| --- | --- | --- |
| 小於 32rem | 單欄，導覽橫排 | 只有預設樣式 |
| 32rem 以上 | 卡片兩欄 | `--cols` 改成 `1fr 1fr` |
| 48rem 以上 | 側欄版面 | 兩欄骨架，導覽改直向，行前區到右側 |

兩段 `min-width` 在寬視窗會**同時成立**。它們的選擇器權重一樣，寫在後面的那段蓋過前面。所以 48rem 那段的 `.now::after` 會蓋過 32rem 那段。斷點由小到大往下寫，寬畫面的規則放後面。

側欄用的是第三部分的區域名字：

```css
grid-template-areas:
  "head head"
  "nav main"
  "nav side";
```

窄畫面不要套這組名字，區塊就照原始碼堆疊。原始碼把 `<aside>` 放在主文後面，窄螢幕先讀行程、再讀行前，這個順序是合理的。不要為了讓側欄在手機上排到中間，就去改原始碼順序或使用 `order`。

`max-width` 是「小於等於」。桌面樣式先寫、再用 `max-width` 往回改，中間的寬度容易漏。課堂以 `min-width` 為主。兩個條件都要成立時用 `and`：`@media (min-width: 48rem) and (orientation: landscape)`。只要其中一個成立，用逗號：`@media (max-width: 32rem), print`。

`screen`、`print`、`all` 是媒體類型。特性條件前面省略類型時，等於 `all`。課堂把查詢寫在同一份 `<style>` 裡。`<link media="print">` 可以另掛一張只給列印的表；`@import` 仍避免，第一部分說過它會拖慢載入。

{% note success %}
**跟著做**
點「查詢」。慢慢把瀏覽器拉窄，或按 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>）打開裝置工具列，選一顆手機寬度。頁首那句話應從「側欄版面」變成「單欄，導覽橫排」。再拉寬，確認句子與欄數一起變。
{% endnote %}

{% note warning %}
**注意事項**
查詢看的是視窗，不是裝置型號。把桌機視窗拉窄，就該看到窄版。不要用使用者代理字串去猜手機。`max-device-width` 是舊特性，新頁面用 `width`。
{% endnote %}

## 列印與偏好

`@media print` 裡把導覽、斷點說明、行前欄設成 `display: none`，底色改白、字改黑。列印預覽按 <kbd>Ctrl</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>P</kbd>），看完關掉即可。依賴底色才能看懂的資訊，列印時要改成字或邊框。連結若需要在紙上留下網址，才另外用 `a[href]::after { content: " (" attr(href) ")"; }`，課堂這頁的錨點不必印。

偏好類特性描述的是人，不是寬度：

| 特性 | 何時成立 |
| --- | --- |
| `prefers-color-scheme: dark` | 系統用深色外觀。`18_vars.html` 用它覆寫代幣 |
| `prefers-reduced-motion: reduce` | 系統要求減少動態。`21_animation.html` 用它關掉動畫 |
| `hover: hover` | 主要輸入可以懸停。轉場那頁才抬起卡片 |
| `pointer: fine` | 有細指標，例如滑鼠 |

這些查詢和寬度查詢一樣參加層疊。深色規則只改 `--ink`、`--paper`，不要複製一整份元件樣式。下一章用面板模擬它們。

# 用開發者工具對樣式

樣式沒有出現時，先分清楚是選錯節點、規則沒打中、被另一條蓋過，還是值本身無效。Chrome 按 <kbd>F12</kbd>，主畫面用 **Elements**。示範頁在 iframe 裡時，要展開 iframe，選到**裡面那份文件**的節點；選到外層的 `<iframe>` 只會看到外框的行內寬高。點左邊「除錯」（`pages/23_inspect.html`），下面三節都對這一張票，也回頭看前幾頁。

{% note primary %}
**素材準備**
Live Server 仍開著 `css/index.html`。以下面板名稱以 Chrome 英文介面為準：**Elements**、**Styles**、**Computed**、**Layout**。
{% endnote %}

## Styles 與 Computed

選中 `<article id="featured" class="ticket">`。**Styles** 列出打到它的規則，上面的蓋過下面的。你應看到：

| 你看到的 | 原因 |
| --- | --- |
| `.ticket` 裡第一個 `color: #94a3b8` 有刪除線 | 同規則後面又寫了 `color` |
| `colour: red` 旁邊有警告、被劃掉 | 屬性名稱拼錯，整條宣告丟掉 |
| `#featured { color: #9f1239 }` 沒有刪除線 | id 欄比 class 欄重，字色是玫瑰紅 |
| `background: var(--paper)` 可展開變數 | 代幣定義在 `:root` |

**Computed** 是算完層疊、繼承、變數之後的最終值。點 `color`，右側會寫這個值從哪一條規則來。`.bad` 那種「變數型別不合」要在這裡看：最終字色是繼承來的，不是 `1rem`。

改動只活在這一次重新整理之前。在 **Styles** 直接改 `--ink` 或取消勾選某條宣告，用來試驗；確定之後再寫回檔案。頁面上新增節點用 **Elements** 左上的 `+` 不一定需要，課堂以對照樣式為主。

使用者代理樣式（user agent stylesheet）是瀏覽器預設表。票卡上的標題若比內文粗，而你沒寫 `font-weight`，Computed 會指向這一層。它比你的作者樣式弱。

{% note success %}
**跟著做**
在 **Styles** 取消勾選 `#featured` 的 `color`。票卡字色應落到 `var(--ink)` 的深青綠。勾回去，玫瑰紅回來。接著點 `var(--ink)`，確認它跳到 `:root`。
{% endnote %}

## 盒子、狀態與斷點

選中 `.ticket` 時，**Styles** 下方（或 **Computed** 裡）有盒子圖：content、padding、border、margin。這頁是 `border-box`，圖上的寬度 18rem 已經含左右 padding 與左右邊框。margin 是圖最外圈的 `1.5rem 0`，它在元素外面，不占那 18rem。和第二部分用盒子圖對 `content-box` 的方式相同。

**Styles** 面板的 **:hov** 可以強制狀態，不必真的把指標放上去。勾 `:hover` 看 `20_transition.html` 的按鈕，勾 `:focus-visible` 看外框。`:hover` 規則若寫在 `@media (hover: hover)` 裡面，而這台裝置的查詢不成立，光勾 :hov 也不會套用；桌機滑鼠通常成立。

`:hov` 旁邊的 **Force element state** 只影響你選的那個節點。要改整份文件的媒體特性，打開命令選單：<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>），輸入 `Rendering`，選 **Show Rendering**。在裡面可以：

- **Emulate CSS media feature prefers-color-scheme** 設成 `dark`，再看 `18_vars.html` 的代幣
- **Emulate CSS media feature prefers-reduced-motion** 設成 `reduce`，`21_animation.html` 的縮放與圓環應停住
- **Emulate CSS prefers-color-scheme** 測完記得改回 No emulation，避免下一頁被你忘了的模擬騙過

裝置工具列（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>）改的是視窗寬高，用來走 `22_rwd.html` 的斷點。工具列上的寬度是整顆瀏覽器視窗時，iframe 還要再扣掉左邊 12rem 的選單，所以「設 800」時右欄可能仍低於 48rem。不確定時看頁首那句話，它跟查詢是同一組條件。

Flex 與 Grid 的徽章在第三部分用過：節點旁的 **flex** 或 **grid** 會畫出主軸或格線。查詢頁的 `.layout` 在寬畫面是 grid，窄畫面也是 grid（只是一欄）。徽章兩邊都點得開。

## 動畫面板

命令選單輸入 `Animations`，選 **Show Animations**。打開之後再重新整理 `21_animation.html`，進場與循環會出現在面板的時間軸上。把時間軸上的圓點拖慢，可以看出 `pulse` 在 50% 放到最大。圓環是無限次，軸上會重複。

這個面板用來確認「有沒有在播」，不能取代樣式表。預覽完把模擬與慢動作清掉再重新整理。**Network** 仍負責檔案沒載入；**Console** 在純 CSS 這一天通常是安靜的，拼錯的屬性不會在那裡報錯，只會出現在 **Styles**。

{% note warning %}
**注意事項**
在面板裡改規則不會寫回磁碟。Live Server 重新整理後，實驗就沒了。要留的修改寫進 `pages/` 的 `<style>`。
{% endnote %}

# 選讀：立體、容器與可補間的變數

這一節可以整節跳過。立體翻面、容器查詢、把自訂屬性註冊成顏色，都是上面六頁的延伸。不新增 `pages/` 檔。跳過不影響左邊的選單。

{% note info %}
**選讀就好**
下面的片段可另存空檔自己開，或只看程式碼。
{% endnote %}

## 立體翻面

平面的 `rotate` 看不出厚度。要翻面，父層給一個視距 `perspective`，卡片轉 Y 軸，背面用 `backface-visibility: hidden` 藏起來。正面與背面疊在同一個格子，`position: relative` 的父層配 `absolute` 的兩面。

```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <title>翻面</title>
    <style>
      body {
        margin: 2rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .scene {
        width: 14rem;
        height: 8rem;
        perspective: 40rem;
      }

      .card {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 500ms ease;
        transform-style: preserve-3d;
      }

      .scene:hover .card,
      .scene:focus-within .card {
        transform: rotateY(180deg);
      }

      .face {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.75rem;
        backface-visibility: hidden;
      }

      .front {
        background: #0f766e;
        color: #f0fdfa;
      }

      .back {
        background: #134e4a;
        color: #f0fdfa;
        transform: rotateY(180deg);
      }
    </style>
  </head>
  <body>
    <div class="scene" tabindex="0">
      <div class="card">
        <div class="face front">京都</div>
        <div class="face back">清水寺清晨</div>
      </div>
    </div>
  </body>
</html>
```

`transform-style: preserve-3d` 讓子元素留在同一個 3D 空間，翻過去才看得到背面。背面先轉 180 度，父層再轉 180 度時它才正對你。`tabindex="0"` 讓鍵盤也能聚焦，`focus-within` 跟 `:hover` 做同一件事。這是效果，不是導覽本體；背面的文字若是必要資訊，不要只放在翻面之後。

## 容器查詢

媒體查詢看視窗。同一張卡片放在窄側欄與寬主文時，視窗寬度相同，卡片該不該橫排卻不該相同。容器查詢（container query）看的是祖先的寬度。

```css
.slot {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 0.5rem;
}

@container (min-width: 22rem) {
  .card {
    grid-template-columns: 6rem 1fr;
  }
}
```

```html
<div class="slot">
  <article class="card">
    <div class="photo"></div>
    <p>側欄很窄時仍是直向；這格變寬才改成圖在左。</p>
  </article>
</div>
```

`container-type: inline-size` 把這一層標成查詢容器。`@container` 裡的規則看這個容器的內容寬度，不看視窗。全站的頁首、側欄仍用視窗查詢。卡片要依「所在的欄有多寬」換排版時才用容器。名字可以寫 `container-name`，一頁有多個容器時再加，避免查到外面那層。

## 把變數註冊成可補間

一般的自訂屬性是一串符號。你寫 `transition: --brand 300ms` 時，瀏覽器不知道它是顏色，切換會瞬間跳過去。要讓顏色代幣可以補間，用 `@property` 註冊語法、繼承與初始值。

```css
@property --brand {
  syntax: "<color>";
  inherits: true;
  initial-value: #0f766e;
}

.go {
  background: var(--brand);
  transition: --brand 300ms ease;
}

.theme:hover {
  --brand: #9f1239;
}
```

沒有註冊之前，仍請直接轉場 `background-color`，像 `20_transition.html` 那樣。`@property` 的 `syntax` 寫錯時，整組註冊無效。`initial-value` 在語法要求下一定要有。這是進階工具，全站代幣用覆寫 `--brand` 就夠。

`100vh` 在手機上常把網址列也算進去，區塊會比可見區域高一截。需要跟「此刻看得到的高度」走時，用 `100dvh`（dynamic viewport）。頁首固定、主文至少一屏這種需求才用得到，一般區塊繼續讓內容把高度撐開。

# 第四部分重點回顧

自訂屬性以 `--` 宣告、用 `var()` 取用，會繼承。全站代幣放在 `:root`，區塊要換膚就在該元素覆寫同名變數。`var(--name, 備援)` 只在名字沒定義時使用。變數的值型別不合時，那條宣告在計算階段作廢，字色等可繼承的屬性改走繼承，不會退回同一條規則裡前一個色碼。

`transform` 不改變排版佔位。常用函式是 `translate`、`scale`、`rotate`，原點用 `transform-origin`。同一條裡右邊的函式先套用。只補間位移時可用獨立屬性 `translate`，避免把 `rotate` 清掉。

`transition` 連接兩個狀態，簡寫是屬性、時間、曲線、延遲。逐條列出要動的屬性。懸停效果包在 `(hover: hover) and (pointer: fine)`，鍵盤用 `:focus-visible`。`@keyframes` 加上 `animation` 才會自己播；沒寫持續時間就等於 0 秒。循環用 `infinite`，結束要停在最後一格用 `forwards` 或 `both`。`prefers-reduced-motion: reduce` 時把裝飾動畫關掉。

RWD 先做流動版面（換行、`fr`、`minmax`、`max-width: 100%`），媒體查詢只改結構。以窄畫面為預設，`min-width` 由小到大往下寫，同時成立時後面蓋過前面。查詢看視窗；在這套示範站裡，視窗是右欄 iframe。`print` 拿掉導覽並改成白底黑字。`prefers-color-scheme` 只換代幣。

除錯用 Chrome 的 **Elements**。**Styles** 看刪除線與無效宣告，**Computed** 看最終值，盒子圖對 padding 與 border。`:hov` 強制懸停與焦點，**Rendering** 模擬深色與減少動態，裝置工具列走斷點。**Animations** 看關鍵影格有沒有在播。面板裡的修改重新整理就沒了。

## 四個部分合起來

這一篇的 CSS 是同一套示範站累加上去的。第一部分決定規則打到誰：選擇器、權重、繼承、單位、顏色、文字與背景。第二部分決定盒子多大、距離多遠、`display` 怎麼參加排版，以及 `relative`／`absolute`／`sticky` 與 `z-index`。第三部分才做欄與列：一個方向用 Flex，兩個方向用 Grid，`gap` 管縫，`auto-fit` 與 `minmax` 讓卡片自己換欄。

第四部分把重複的色與間距收成代幣，讓互動有轉場與少量動畫，並在結構要變時寫媒體查詢。float 多欄與廠商前綴留在舊碼裡認識即可。對得上的時候，畫面與 **Styles** 的最終值是同一件事：選錯 iframe 裡的節點、路徑 404、或變數型別不合，都會讓「我明明有寫」對不上眼睛看到的結果。
