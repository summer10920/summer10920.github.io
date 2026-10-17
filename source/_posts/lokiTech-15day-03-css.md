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

CSS（Cascading Style Sheets，層疊樣式表）決定頁面長什麼樣子：顏色、字級、背景、之後還有盒子與欄位。HTML 負責「這一頁有什麼」，CSS 負責「那些東西怎麼呈現」。每一小節先講這個屬性拿來做什麼，再給**一份完整 HTML**（樣式寫在 `<style>`）。把程式碼存成 `.html`，用 Chrome 或 Live Server 打開就能看到效果。

練習站在 `studiesAdvanced/01-html-css-js/03-css/`：寬螢幕左邊是選單，窄螢幕改成上方選單，右邊用 iframe 顯示選到的那一頁。用 VS Code 開 `01-html-css-js/`，Live Server 開 `03-css/index.html`。外層選單的樣式在 `css/site.css`；每一節要改的 HTML 在 `pages/`，樣式在同名的 `.css`（例如 `pages/01-syntax.html` 配 `pages/01-syntax.css`）。第一頁預設載入「規則的零件」。點選單換右欄的寫法，HTML 練習站已經用過：連結的 `target` 與 iframe 的 `name` 都是 `content`。

<!-- more -->

預覽與除錯以 Chrome 為準，按 <kbd>F12</kbd> 看 **Elements → Styles**。

| 大主題 | 章 | 你會用到的觀念 |
| --- | --- | --- |
| 規則怎麼套上元素 | 觀念與引入、選擇器與權重、繼承與層疊 | 規則零件、三種寫法、選擇器、四欄權重、繼承關鍵字 |
| 字、色與背景 | 單位與顏色、文字與背景、選讀：進階選擇器、分層與字型 | `rem`、顏色、字型堆疊、背景圖層 |
| 盒子與欄位排版 | 盒子與定位、Flexbox、Grid | 盒模型、`display`、定位、`overflow`、Flex、Grid |
| 響應式、變數與動態 | RWD 與媒體查詢、CSS 變數、轉場與動畫、開發者工具 | 流動版面、斷點、代幣、`transition`、`@keyframes` |
| 選讀：邊界與進階動效 | 外距穿出與邏輯方向、float 繞排、立體翻面、容器查詢、可補間的自訂屬性 | 可整節跳過 |
| 本篇重點回顧 | 這篇用過的觀念 | 選擇器到除錯面板 |

{% note primary %}
**素材準備**
每一份示範都是完整文件。在 `student/practice/css/` 新建一個檔（檔名可自訂），貼上該節的程式碼，存檔後用 Live Server 開。改完要重新整理。Styles 裡被劃掉的宣告代表沒有用上。
{% endnote %}

## 規則怎麼套上元素

樣式表是一組規則：先選到元素，再寫要改的屬性。很多條搶同一個屬性時，靠權重與層疊決定留下哪一條；沒有人寫的屬性，才談繼承。這一節把規則的寫法、選擇器與繼承收在一起。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/01-syntax.html`、`pages/02-where.html`、`pages/03-selectors-basic.html`、`pages/04-selectors-combine.html`、`pages/05-selectors-pseudo.html`、`pages/06-specificity.html`、`pages/07-inherit.html`、`pages/08-keywords.html`。用 Live Server 開 `03-css/index.html`，再點選單換頁。

### 觀念與引入

瀏覽器先解析 HTML、建立 DOM，再把 CSS 規則套到對得上的元素，最後才排版與繪製。你改的是規則文字，不是在畫面上直接塗色。重新整理之後，瀏覽器會再跑一次這段流程。

{% mermaid graph LR %}
html["HTML 元素"] --> sel["選擇器打中誰"]
sel --> decl["宣告：屬性與值"]
decl --> used["套用後的外觀"]
{% endmermaid %}

#### 規則的零件

一條規則分成「選到誰」和「設什麼」。大括號裡可以有多個宣告，每個宣告以分號結尾。同一條規則裡同一個屬性寫兩次，**原始碼較後面的那次**留下。屬性名稱拼錯時，瀏覽器丟掉**那一個宣告**，同一條規則的其他宣告仍然有效。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/01-syntax.html`，用 Live Server 開 `03-css/index.html` 再點選單「規則的零件」。

| 零件 | 例子 | 做什麼 |
| --- | --- | --- |
| 選擇器 | `h1`、`.lead` | 決定這條規則打到哪些元素 |
| 屬性 | `color`、`font-size` | 決定要改外觀的哪一面 |
| 值 | `#115e59`、`1.75rem` | 決定改成什麼 |
| 宣告 | `color: #115e59;` | 一組屬性加值 |

逗號是分組：`h1, h2` 代表兩條選擇器共用同一組宣告，權重不會因為逗號加總。註解寫 `/* 說明 */`，可以跨行。`<!-- -->` 是 HTML 註解，放進 CSS 不會被當成註解。


```html syntax.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>一條規則</title>
    <style>
      /* 選擇器 { 屬性: 值; }  HTML 的 <!-- --> 在這裡無效 */

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      /* 逗號是兩條規則共用宣告，不是把權重加在一起 */
      h1,
      h2 {
        font-weight: 700;
      }

      h1 {
        color: #99f6e4; /* 同屬性寫兩次，這條會被下一條蓋掉 */
        colour: red; /* 拼錯，整條宣告丟掉，標題不會變紅 */
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

{% note info %}
**小技巧：Styles 面板**
<kbd>F12</kbd> → **Elements**，點一個節點。右側 **Styles** 由上到下是較優先的規則；被劃掉的是沒贏的宣告。**Computed** 是最後用上的值。
{% endnote %}

#### 三種寫法

CSS 可以寫在標籤的 `style` 屬性（行內）、寫在該頁 `<head>` 的 `<style>`（頁內）、或寫成獨立的 `.css` 再用 `<link>` 掛上（外部）。課堂這些示範用頁內，是為了貼上一份檔就能開。專題與多頁網站用外部檔：顏色集中在一處，改一次，每一頁一起變，瀏覽器也可以快取那份 CSS。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/02-where.html`，用 Live Server 開 `03-css/index.html` 再點選單「三種寫法」。

| 寫法 | 範本裡的位置 | 什麼時候用 |
| --- | --- | --- |
| 行內 | 開始標籤的 `style=""` | 暫時試一個元素。難共用，也難搜尋 |
| 頁內 | `<head>` 裡的 `<style>` | 單頁小示範、本篇每一份練習 |
| 外部 | `<link rel="stylesheet" href="tour.css">` | 多頁共用。`href` 相對**這份 HTML** |

`link` 放在 `head`。同一頁有多個 `link` 時，檔案順序會影響「權重相同時誰贏」——較晚連結的檔案算較後面。`style` 屬性裡只能寫宣告，不能寫選擇器，也不能寫 `@media`。

`@import url("tour.css");` 必須寫在 CSS 的**最前面**，用來再拉另一份樣式表。它會多一次請求，也比 `link` 更晚才開始下載。課堂用 `link`。建構工具合併檔案時，原始碼裡才會大量出現 `@import`，那是工具的事。


```html where.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 寫在哪</title>
    <!-- 專題改成外部檔：同資料夾放 tour.css，再把下一行的註解拿掉
    <link rel="stylesheet" href="tour.css" />
    -->
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

      .from-file {
        color: #115e59;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <h1>三種地方都可以寫</h1>
    <p style="color: #9f1239">這行的顏色寫在開始標籤的 style 屬性（行內）。</p>
    <p class="from-page">這行的顏色寫在這份 HTML 的 style 標籤（頁內）。</p>
    <p class="from-file">
      這行目前也寫在頁內。專題裡把 .from-file 搬進 tour.css，用 link 掛上，畫面相同。
    </p>
  </body>
</html>
```

{% note warning %}
**注意事項**
行內樣式的權重高過樣式表裡的一般宣告，所以專題不要把版面塗在標籤上。`href` 寫錯時，Network 會看到那份 CSS 是 404，Styles 裡則完全沒有你的規則。
{% endnote %}

### 選擇器與權重

選擇器是規則的前半。打不中，後面的宣告就不會出現在那個節點的 Styles 裡。很多條都打中同一個屬性時，再用權重與原始碼順序決定留下哪一條。

#### 元素、class 與 id

先分清四種基本選擇器，再談組合。class 寫在 HTML 是 `class="tour"`，CSS 多一個點。id 寫在 HTML 是 `id="featured"`，CSS 多一個 `#`。一個元素可以同時有多個 class：`class="tour soldout"`。`.tour.soldout` 中間**沒有空格**，表示兩個 class 都在同一個元素上。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/03-selectors-basic.html`，用 Live Server 開 `03-css/index.html` 再點選單「元素、class 與 id」。

| 選擇器 | 寫法 | 打到誰 | 權重欄 |
| --- | --- | --- | --- |
| 通用 | `*` | 所有元素 | 不加分 |
| 元素（型別） | `p`、`a` | 所有該標籤 | 元素欄 +1 |
| class | `.tour` | 帶這個 class 的元素，可重複 | class 欄 +1 |
| id | `#featured` | 該頁這一個 id | id 欄 +1 |

id 在一份文件裡只給一個元素。要用在很多張卡片上的樣式，寫 class。`#site-header` 這種全頁只有一個的區塊才用 id，而且是因為腳本或錨點需要那個名字，不是為了把權重拉高。


```html selectors-basic.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>基本選擇器</title>
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

      .soldout {
        text-decoration: line-through;
      }

      /* 沒有空格：同一個元素同時有這兩個 class */
      .tour.soldout {
        color: #64748b;
      }

      #featured {
        background: #f0fdfa;
        padding: 0.75rem 1rem;
      }
    </style>
  </head>
  <body>
    <h1>選擇器決定規則打到誰</h1>
    <p>元素選擇器：這段是石板色。</p>
    <p class="tour">class：行程用字，深青綠。同一個 class 可以重複。</p>
    <p class="tour">另一段行程，樣式跟上面那行相同。</p>
    <p class="tour soldout">兩個 class 都在：字是灰的，而且有刪除線。</p>
    <p id="featured">id：全頁這一個，帶淺綠底。不要把同一個 id 複製到第二個元素。</p>
  </body>
</html>
```

{% note info %}
**小技巧：打不中時先看名字**
Styles 裡完全沒有你寫的那條，多半是 class 拼字、檔案沒存、或 `link` 路徑錯。先對 HTML 的 `class`／`id` 與 CSS 的拼字，再談權重。
{% endnote %}

#### 組合關係

組合是在基本選擇器之間加上關係。空格、`>`、`+`、`~` 都算進**同一條**選擇器，權重把各段加總。逗號則是拆成多條，不加總。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/04-selectors-combine.html`，用 Live Server 開 `03-css/index.html` 再點選單「組合關係」。

| 組合 | 寫法 | 打到誰 |
| --- | --- | --- |
| 後代 | `article p` | `article` 裡面任何深度的 `p` |
| 子 | `article > .direct` | 只限直接小孩 |
| 相鄰兄弟 | `.stops li + li` | 緊接在 `li` 後面的那個 `li` |
| 一般兄弟 | `h2 ~ p` | 同一個父層裡、`h2` 之後的 `p` |
| 分組 | `h1, h2` | 兩種元素各算各的 |

後代選擇器很容易打到後來才嵌進去的元素。能用 class 說清楚的，就少靠深層的空格。


```html selectors-combine.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>組合選擇器</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
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
        margin-top: 0.35rem;
      }

      h2 ~ p {
        font-size: 0.95rem;
      }
    </style>
  </head>
  <body>
    <h1>關係寫在選擇器中間</h1>
    <article>
      <p class="direct">子結合 &gt; ：這段是 article 的直接小孩，所以較粗，也有左邊色條。</p>
      <div>
        <p>後代選擇器仍打得到這段（有左邊色條），但 &gt; 打不到，所以不會變粗。</p>
      </div>
    </article>
    <h2>相鄰與後面的兄弟</h2>
    <p>這個 h2 後面、同一個父層裡的段落會稍微縮小。</p>
    <p>這段也在 h2 後面，同樣縮小。</p>
    <ul class="stops">
      <li>台北</li>
      <li>這項起，li + li 才有上距</li>
      <li>濟州</li>
    </ul>
  </body>
</html>
```

#### 偽類與偽元素

偽類描述狀態或在父層的位置，偽元素描述元素的一部分或生出來的裝飾。兩者都接在選擇器後面，冒號個數與權重欄不同。見 [MDN：偽類與偽元素](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements)。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/05-selectors-pseudo.html`，用 Live Server 開 `03-css/index.html` 再點選單「偽類與偽元素」。

##### 狀態與結構偽類

**偽類（pseudo-class）**寫單冒號，描述狀態或位置，權重算在 **class 欄**。**偽元素（pseudo-element）**寫雙冒號，描述元素的一部分或生出來的裝飾，權重算在 **元素欄**。

連結四態要照這個順序寫，口訣是 LoVe／HAte：`:link`、`:visited`、`:hover`、`:active`。順序錯了，前面的同權重規則會蓋掉後面的狀態。`:visited` 因隱私限制，現代瀏覽器幾乎只讓你改顏色。`:hover` 是指標放在上面。`:focus-visible` 是鍵盤把焦點帶進來時才畫出的框；滑鼠點一下不必長出粗框。

結構偽類看的是「在父層的第幾個小孩」：

- `:first-child`、`:last-child`：是父層的第一個或最後一個小孩。
- `:first-of-type`：是父層裡該標籤的第一個。
- `:nth-child(odd)`、`:nth-child(2)`：第奇數個、第 2 個。括號裡也可以寫 `3n+1`。

##### 偽元素與屬性選擇器

`::before` 與 `::after` 必須寫 `content`（可以是空字串 `""`）才看得到。價格數字仍要留在 HTML 裡，讀屏與複製才有內容。`::placeholder` 只影響提示字，不影響使用者打進去的字。屬性選擇器（例如 `input[type="email"]`）權重也算 class 欄。


```html selectors-pseudo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>偽類與偽元素</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
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

      /* 第一個小孩是 h2，所以 p:first-child 打不到 */
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

      input:disabled {
        background: #f1f5f9;
      }
    </style>
  </head>
  <body>
    <h1>狀態、位置、裝飾</h1>
    <p><a href="#days">把滑鼠放上來，再用 Tab 走進來</a></p>
    <ul class="days" id="days">
      <li>奇數項有底色</li>
      <li>第二項較粗</li>
      <li>奇數項有底色</li>
      <li>第四項</li>
    </ul>
    <section class="pitfall">
      <h2>不是第一個小孩</h2>
      <p>這段是深青綠。p:first-child 打不到，因為第一個小孩是 h2。p:first-of-type 打得到。</p>
    </section>
    <p class="price">12800</p>
    <p>
      <input type="email" placeholder="you@example.com" />
      <input type="text" placeholder="姓名" />
      <input type="text" value="已額滿" disabled />
    </p>
  </body>
</html>
```

{% note warning %}
**注意事項**
不要用 `::before` 填上句子裡唯一的資訊。裝飾拿掉之後，HTML 裡的文字仍要讀得懂。清單用 `:nth-child(odd)` 之前，先確認項目中間沒有插入別的標籤，否則奇偶會位移。
{% endnote %}

#### 四欄權重

權重（specificity）用來比較哪一條選擇器比較具體。先看有沒有 `!important`，再由左到右比四個欄位，欄與欄不進位；欄位相同才看原始碼順序。見 [MDN：權重](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascade/Specificity)。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/06-specificity.html`，用 Live Server 開 `03-css/index.html` 再點選單「四欄權重」。

同一個元素、同一個屬性，可能有很多宣告打中。作者樣式（你寫的 CSS）裡，比較順序是：

1. 這條宣告有沒有 `!important`。有的贏過沒有的。
2. 都沒有（或都有）時，比權重。四個欄位由左到右比，**某一欄較大就贏，不會進位**。
3. 權重也相同時，原始碼較後面的贏。後連結的樣式表算較後面。

| 欄位 | 誰加分 | 下面示範留下的顏色 |
| --- | --- | --- |
| 行內 | 標籤上的 `style=""` | 玫瑰紅，贏過樣式表裡的一般宣告 |
| id | `#one` | 深青綠，贏過 `.note` |
| class | class、屬性選擇器、偽類 | 琥珀色，贏過 `p` |
| 元素 | 元素、偽元素 | 石板色 |

`p.note#one` 是把欄位**加在同一條**上：1 個 id、1 個 class、1 個元素。十個 class 加起來仍是 class 欄的數字，比不過 id 欄的 1。不要把權重記成「class 是 10 分、湊滿 10 個就等於一個 id」——欄與欄之間不進位。舊說法「id＝100、class＝10、元素＝1」只在數目很小的時候碰巧像十進位。

樣式表裡的 `!important` 贏過**沒有** `!important` 的行內樣式。行內再加上 `!important` 會更難蓋。專題要改顏色時，調整選擇器或原始碼順序。


```html specificity.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>權重</title>
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

      /* 權重相同。較早的 color 會被劃掉 */
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
    </style>
  </head>
  <body>
    <h1>誰贏</h1>
    <p>只有元素選擇器：石板色。</p>
    <p class="note">加上 class：琥珀色。class 欄贏過元素欄。</p>
    <p id="one" class="note">同時有 id 與 class：深青綠。id 欄贏過 class 欄。</p>
    <p id="two" class="note" style="color: #9f1239">
      行內 style：玫瑰紅，贏過樣式表裡的一般宣告。
    </p>
    <p class="chip">
      同權重的 .chip 寫了兩次。F12 應看到第一個 color 被劃掉，留下深青綠、圓角，以及第一條的框。
    </p>
    <p class="force">這段用了 !important。一般的灰色 color 會被劃掉。練習不要把它當預設。</p>
  </body>
</html>
```

{% note danger %}
**不要用 !important 解權重**
它會讓下一個人只能再寫一個 `!important`。id 寫很多、選擇器拉很長，也是同一類問題。先把 class 取清楚。
{% endnote %}

### 繼承與層疊

**層疊（cascade）**決定很多宣告搶同一個屬性時誰留下：來源、`!important`、權重、原始碼順序。**繼承（inheritance）**是另一件事：這個元素**根本沒有**人寫這個屬性時，要不要沿用父層已經算出來的值。上一節比的是「都有寫」；這一節處理「沒寫」以及你明示要跟父層還是回到初始。見 [MDN：繼承](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascade/Inheritance)。

{% mermaid graph TD %}
hit["這個元素有人寫了該屬性"] --> imp["先看 !important"]
imp --> spec["再比四欄權重"]
spec --> order["再看誰寫在後面"]
miss["沒有人寫這個屬性"] --> inh["可繼承的跟父層"]
miss --> init["不可繼承的用初始值"]
{% endmermaid %}

使用者代理樣式表（user agent stylesheet）也參與層疊，優先順序低於你寫的作者樣式。連結預設是藍色底線、`h1` 預設比較大，都是它先套的。你的規則寫出來之後才改掉那些預設。

#### 什麼會繼承

會繼承的多半跟字有關：`color`、`font-family`、`font-size`、`font-weight`、`line-height`、`text-align`、`letter-spacing`。不會繼承的多半跟盒子有關：`margin`、`padding`、`border`、`background`、`width`、`display`。子元素是透明底時，你看到的是父層背景透出來，不是子層繼承了 `background-color`。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/07-inherit.html`，用 Live Server 開 `03-css/index.html` 再點選單「什麼會繼承」。

自己寫了同一個屬性，繼承就停在這一層。`line-height` 若寫成無單位數字，子層會用「自己的字級 × 那個數字」；若寫成 `24px`，子層字變大時行距仍是固定的 24 像素。


```html inherit.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>繼承</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .story {
        color: #7c2d12;
        margin-left: 2rem;
        border: 4px solid #7c2d12;
        padding: 0.75rem 1rem;
        background: #fff7ed;
      }

      .price {
        color: #115e59;
      }
    </style>
  </head>
  <body>
    <h1>沒寫的屬性會不會跟父層</h1>
    <article class="story">
      <h2>繼承</h2>
      <p>
        這段沒寫 color，所以跟 article 的磚紅。左邊外距是 article 的盒子在縮排，p 自己並沒有 margin-left。框與底色也不會繼承到這段。
      </p>
      <p class="price">這段自己寫了 color，不再跟父層，字是深青綠。</p>
    </article>
    <p>article 外面的這段回到 body 的深青綠，也沒有左邊那 2rem。</p>
  </body>
</html>
```

#### 四個關鍵字

值也可以寫成關鍵字，強迫這一次要不要跟父層。`initial` 不是「回到我上一條規則」。`color` 的初始值是瀏覽器定義的字色，不是 `body` 上你寫的顏色。`revert` 回到上一層來源，通常是使用者代理樣式（標題會變回瀏覽器預設的大小與粗細）。想一次清掉很多屬性，可以寫 `all: unset;`，再把真正需要的屬性補回去。這是重置手段，不是每個元件的起手式。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/08-keywords.html`，用 Live Server 開 `03-css/index.html` 再點選單「四個關鍵字」。

| 關鍵字 | 示範裡的結果 | 意思 |
| --- | --- | --- |
| `inherit` | 藍字，而且有藍框 | 跟父層的計算結果，連平常不繼承的屬性也跟 |
| `initial` | 回到屬性自身的初始值 | `color` 回到初始字色；`border` 回到沒有框 |
| `unset` | 藍字、沒有框 | 可繼承的當成 `inherit`，其餘當成 `initial` |
| `revert` | 標題回到瀏覽器預設 | 丟掉作者樣式，回到使用者代理那一層 |


```html keywords.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>繼承關鍵字</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
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

      .back h2 {
        font-size: revert;
        font-weight: revert;
      }
    </style>
  </head>
  <body>
    <h1>明示跟父層，或回到初始</h1>
    <div class="keywords">
      <p class="in">inherit：字跟父層的藍，框也強制跟父層（框平常不繼承）。</p>
      <p class="init">initial：字回到屬性初始值，框也回到初始（通常沒有框）。</p>
      <p class="un">unset：color 會繼承（藍字），border 不可繼承所以回到初始（沒有框）。</p>
    </div>
    <section class="back">
      <h2>這顆 h2 用了 revert，字級與字重回到瀏覽器預設。</h2>
    </section>
  </body>
</html>
```

## 字、色與背景

規則打中之後，值要寫成瀏覽器讀得懂的長度與顏色，再決定字怎麼排、底怎麼畫。字型相關屬性多半會繼承，背景預設不繼承。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/09-units.html`、`pages/10-colors.html`、`pages/11-type.html`、`pages/12-text.html`、`pages/13-background.html`、`pages/14-selectors-extra.html`、`pages/15-layer.html`。用 Live Server 開 `03-css/index.html`，再點選單換頁。

### 單位與顏色

長度與顏色是宣告裡最常出現的兩種值。這一節先把字級、行寬、色票定下來。寬度怎麼跟盒模型一起算，下一節再細算。

#### 長度

長度用來寫字級、行寬、間距。內文以 `rem` 為主，`px` 用來寫髮絲邊框與需要對齊像素的線。`em` 會疊乘：父層已經是 1.25 倍、子層又寫 `2em`，子層相對的是放大後的父層，不是根字級。元件裡的字級用 `rem`，比較不會因為多包一層就突然變大。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/09-units.html`，用 Live Server 開 `03-css/index.html` 再點選單「長度」。

| 單位 | 相對誰 | 示範 |
| --- | --- | --- |
| `px` | CSS 像素 | 這頁把根字級設成 `16px`，只為了讓 Computed 好對 |
| `em` | 用在 `font-size` 上時相對**父層**字級 | 父 `1.25em`、子 `2em` → 子約 40px |
| `rem` | **根元素**（`html`）的字級 | 子 `2rem` → 約 32px |
| `%` | 視屬性而定，寬度通常相對包含區塊 | 16rem 軌道的一半 |
| `ch` | 該字型裡「0」的寬度 | 行寬最寬 `36ch` |
| `vw`、`vh` | 視窗寬或高的 1% | `4vw` 的標題跟著視窗縮放 |

`line-height` 建議寫**無單位**數字（例如 `1.6`），它會乘上該元素自己的 `font-size`。行內的 `span` 預設不理會 `width`，所以示範把色條設成 `display: block`，百分之五十才有寬度可畫。`display` 的其餘值在盒子那一節再展開。


```html units.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>單位</title>
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
    </style>
  </head>
  <body>
    <h1>單位</h1>
    <p>這頁把根字級設成 16px，只為了讓 Computed 的數字好對。正式頁常不鎖死像素。</p>
    <div class="em-box">
      父層 1.25em（約 20px）
      <p class="em-child">子層 2em，相對父層，約 40px。</p>
    </div>
    <div class="rem-box">
      父層 1.25rem（約 20px）
      <p class="rem-child">子層 2rem，相對根元素，約 32px。不受父層 1.25rem 疊乘。</p>
    </div>
    <div class="meter">
      <span class="half">父層 16rem 的 50%</span>
    </div>
    <p class="measure">
      這段最寬約 36 個「0」的寬度（ch）。中文不會剛好 36 個字，但行寬會收在閱讀舒適的範圍。
    </p>
    <p class="vw-title">4vw 會跟著視窗寬度變</p>
  </body>
</html>
```

{% note warning %}
**注意事項**
不要用 `4vw` 當全站內文。視窗很窄時字會小到不能讀，很寬時又會過大。`vw` 適合偶爾的標題實驗；正文留在 `rem`。
{% endnote %}

#### 顏色寫法

`color` 是前景（通常是字）。`background-color` 是底。`border-color` 是框。同一套寫法三種屬性都能用。對比要夠：深字配淺底，或淺字配深底。同一個色若再加一半透明，就可能不夠讀。透明度是「讓底下的像素參與混合」，不是另做一種灰色。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/10-colors.html`，用 Live Server 開 `03-css/index.html` 再點選單「顏色寫法」。

| 寫法 | 例子 | 什麼時候用 |
| --- | --- | --- |
| 名稱 | `teal` | 草稿。正式頁少靠名稱，不好對品牌色 |
| HEX 六碼 | `#0f766e` | 最常見。兩兩一組是紅、綠、藍，`00`～`ff` |
| HEX 三碼 | `#fff` | 只有在兩兩重複時等於 `#ffffff` |
| HEX 八碼 | `#0f766e99` | 末兩碼是透明度 |
| `rgb()` | `rgb(15 118 110)` | 與 HEX 同一套光。現代寫法用空格 |
| 帶透明度 | `rgb(15 118 110 / 50%)` | `/` 後面是 alpha。`0` 全透明，`100%` 不透明 |
| `hsl()` | `hsl(175 80% 26%)` | 色相、飽和度、亮度。調深淺時改第三個數 |
| `transparent` | `transparent` | 全透明 |
| `currentColor` | `border-color: currentColor` | 跟該元素當下的 `color` 走 |

舊寫法 `rgb(15, 118, 110)` 與 `rgba(15, 118, 110, 0.5)` 仍然有效。新頁用空格與斜線即可。`hsl(175 80% 26% / 70%)` 同樣可以加 alpha。


```html colors.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>顏色</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
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
          #134e4a 0 8px,
          #042f2e 8px 16px
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
    <h1>同一套顏色，很多種寫法</h1>
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

{% note info %}
**小技巧：吸色**
Chrome Styles 裡的色塊可以打開調色盤，也會顯示對比是否過低。過低時優先改亮度，不要先把字級放大來彌補。
{% endnote %}

### 文字與背景

字與背景是畫面上直接看得到的屬性。字型相關屬性大多會繼承，所以設在 `body` 上，內文就跟著走；標題再個別加大、加粗。背景預設不繼承，畫在邊框以內（含內距）。

#### 字型堆疊

`font-family` 是一串**字型堆疊**，逗號分隔，瀏覽器由左到右挑第一個用得了的。有空格的名稱要加引號。最後一個寫**通用家族（generic family）**，系統才有退路。`system-ui` 在 Windows 上多半是 Segoe UI，中文仍要後面的「蘋方」或「微軟正黑體」才穩。不要只寫 `"Microsoft JhengHei"`：macOS 與手機沒有這個家族時，會直接掉到通用家族。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/11-type.html`，用 Live Server 開 `03-css/index.html` 再點選單「字型堆疊」。

| 通用家族 | 看起來 | 示範的 class |
| --- | --- | --- |
| `sans-serif` | 無襯線，螢幕內文常用 | `body` 的最後退路 |
| `serif` | 襯線，類似明體、宋體 | `.serif` |
| `monospace` | 等寬，程式與代碼 | `.mono` |
| `system-ui` | 各作業系統的介面字 | 堆疊的第一個 |

| 屬性 | 常用值 | 說明 |
| --- | --- | --- |
| `font-size` | `1rem`、`0.875rem`、`2rem` | 字級。標題用 `rem` |
| `font-weight` | `400`、`700` | `400` 等於 `normal`，`700` 等於 `bold`。該字型要真的有這個字重 |
| `font-style` | `normal`、`italic` | 斜體。中文很多字型沒有斜體，瀏覽器只是把字歪掉 |
| `line-height` | `1.6`、`1.2` | 無單位。標題可稍緊，內文留 1.5～1.7 |

`font` 簡寫至少要有字級與字型家族，順序是：`font-style`、`font-weight`、`font-size`、斜線、`line-height`、`font-family`。簡寫會把沒寫到的字型屬性設回初始值。只改一個項目時，寫單獨的 `font-size` 或 `font-weight`。


```html type.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>字型</title>
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

      .banner-title {
        font: 700 1.5rem/1.3 system-ui, "PingFang TC", "Microsoft JhengHei",
          sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>字型堆疊</h1>
    <p class="banner-title">這行用 font 簡寫：粗體、1.5rem、行高 1.3。</p>
    <p>內文用無襯線堆疊。字重 400 是一般，<span class="w700">700 是粗體</span>。</p>
    <p class="serif">這段改走襯線通用家族 serif，中文會落到系統有的明體或宋體。</p>
    <p class="mono">行程代碼 TPE-001 用等寬字較好對。</p>
    <p class="sm">0.875rem 當註記。</p>
    <p class="lg">1.25rem 當導言。</p>
    <p class="tight">行高 1：行與行貼得很近。兩行以上就不好讀。洛奇旅行的行程說明至少要留出行距。</p>
    <p class="loose">行高 1.8：同一段文字鬆很多。內文常用無單位的 1.5 到 1.7。</p>
  </body>
</html>
```

{% note warning %}
**注意事項**
`font` 簡寫沒寫到的項目會回到初始值。原本從 `body` 繼承來的字重或變體，可能在這一層消失。
{% endnote %}

#### 行內文字

`text-align` 作用在**區塊**上，對齊的是它裡面的行內內容。把 `text-align: center` 寫在 `span` 自己身上通常看不到置中，要寫在包住它的區塊上。橫書由左到右時，`start` 就是靠行首、`end` 就是靠行末。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/12-text.html`，用 Live Server 開 `03-css/index.html` 再點選單「行內文字」。

| 屬性 | 常用值 | 做什麼 |
| --- | --- | --- |
| `text-align` | `start`、`center`、`end` | 行內內容靠行首、置中、靠行末 |
| `text-decoration-line` | `underline`、`line-through`、`none` | 底線、刪除線、拿掉連結預設底線 |
| `text-decoration-color` | 顏色 | 線的顏色，可以和字不同 |
| `text-decoration-thickness` | `2px` | 線的粗細 |
| `text-underline-offset` | `0.2em` | 底線離字元遠一點，中文較不壓到筆畫 |
| `text-transform` | `uppercase`、`lowercase` | 拉丁字母大小寫。不改變 HTML 裡的文字 |
| `letter-spacing` | `0.08em` | 字距。中文大標題可微調，內文不要拉很開 |
| `white-space` | `pre-wrap`、`nowrap` | `pre-wrap` 保留換行並在太長時折行 |
| `text-shadow` | `0 2px 0 rgb(0 0 0 / 35%)` | 水平偏移、垂直偏移、模糊、顏色 |

`text-align: justify` 會把一行兩端撐齊，中文段落常常被拉出大空隙，這門課的內文用 `start`。`white-space: nowrap` 禁止換行，按鈕上的短詞才用。連結若拿掉底線，滑鼠移上去或鍵盤聚焦時仍要有另一種變化，否則看不出它可以點。


```html text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文字</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
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
    </style>
  </head>
  <body>
    <h1 class="display">洛奇旅行</h1>
    <p class="center">這段置中（text-align: center）。</p>
    <p class="end">這段靠行末（text-align: end）。</p>
    <p>連結可以只調底線：<a class="jump" href="#top">看行程</a></p>
    <p class="code">tpe-kt-03</p>
    <p class="schedule">Day 1 台北
Day 2 京都
Day 3 濟州</p>
  </body>
</html>
```

#### 背景圖層

背景可以是底色、一張圖，或一層漸層。漸層也算 `background-image`。圖沒蓋到的地方會露出 `background-color`。多層背景用逗號分隔，**先寫的畫在上面**。每一層的 `repeat`、`size`、`position` 也用逗號對應；層數對不齊時，瀏覽器會循環使用你寫的那一串。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/13-background.html`，用 Live Server 開 `03-css/index.html` 再點選單「背景圖層」。

| 屬性 | 常用值 | 做什麼 |
| --- | --- | --- |
| `background-color` | `#f0fdfa` | 底色 |
| `background-image` | `url(...)`、`linear-gradient(...)` | 圖或漸層 |
| `background-repeat` | `repeat`、`no-repeat` | 預設是重複平鋪 |
| `background-position` | `center`、`top left` | 圖的對齊點 |
| `background-size` | `cover`、`contain` | `cover` 蓋滿並裁切；`contain` 整張放進盒子 |
| `background-attachment` | `scroll`、`fixed` | 預設跟內容滾。`fixed` 在手機上常常不理想 |

簡寫 `background` 可以一次寫完。`background-size` 要跟在位置後面並用斜線分開，例如 `center / cover`。簡寫沒寫到的項目會回到初始值：你若先設好 `cover`，下一行又寫 `background: #f0fdfa;`，圖層會被清掉，只剩底色。只改顏色時寫 `background-color`。

漸層的方向可以是角度或關鍵字。`160deg` 從左下往右上偏；`to bottom` 由上到下。色標可以加上停在哪裡：`#0f766e 42%`。`repeating-linear-gradient` 用來做條紋。放射狀用 `radial-gradient`。這門課的區塊底用線性漸層即可。正式站的照片把示範裡的資料網址換成 `url("images/kyoto.jpg")` 這種相對路徑，屬性相同。


```html background.html
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
      .hero,
      .tile {
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

{% note success %}
**跟著做**
把 `background.html` 存好後，在 Chrome 把視窗拉窄再拉寬，看 `cover` 與 `contain` 裁切的差別。F12 點 `.hero`，在 Styles 取消其中一層 `background-image`，確認先寫的那層在上面。
{% endnote %}

### 選讀：進階選擇器、分層與字型

上面的示範已經夠字與背景這一節。屬性選擇器的進階比對、`:is()`／`:where()`／`:has()`、自訂屬性、`@layer`、BEM 命名、自行載入字型檔可以整節跳過。之後維護較大的樣式表時再回來。

#### 屬性比對與 :is()、:where()、:has()

課堂正文只用了 `[type="email"]` 這種「屬性值完全相等」。還可以比對片段，權重仍是 class 欄 +1：`[href]` 有這個屬性即可，`[href^="https"]` 是開頭，`[href$=".pdf"]` 是結尾，`[title*="京都"]` 是中間含有。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/14-selectors-extra.html`，用 Live Server 開 `03-css/index.html` 再點選單「屬性比對與 :is()、:where()、:has()（選讀）」。

`:is(h1, h2, h3)` 把分組寫短，權重等於括號裡**最高**的那一個。`:where()` 外觀可以相同，但權重是 **0**，所以很好被後面的普通 class 蓋過。重置樣式時用 `:where()`，就不必跟自己的重置規則搏鬥。`:not(.soldout)` 排除帶該 class 的元素，權重等於括號裡那個選擇器。

`:has()` 選的是「裡面有某子孫的元素」，例如輸入框聚焦時讓外層出現框線。它會讓父層的樣式依賴子層狀態，選擇器一多就難讀，有明確 class 時仍優先寫 class。


```html selectors-extra.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：進階選擇器</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      :where(h1, h2) {
        font-weight: 400;
      }

      h1 {
        font-weight: 700;
      }

      :is(h1, h2) {
        color: #115e59;
      }

      a[href$=".pdf"]::after {
        content: "（PDF）";
      }

      .card:not(.soldout) {
        background: #f0fdfa;
        padding: 0.75rem 1rem;
      }

      .field {
        margin-top: 0.75rem;
        padding: 0.75rem;
      }

      .field:has(input:focus-visible) {
        outline: 2px solid #0f766e;
      }
    </style>
  </head>
  <body>
    <h1>進階選擇器</h1>
    <h2>:where 的字重是 0，所以 h1 自己的 700 仍在；:is 把兩個標題改成深青綠。</h2>
    <p><a href="kyoto.pdf">京都行程</a></p>
    <p class="card">這張沒有 soldout，所以有淺綠底。</p>
    <p class="card soldout">這張被 :not 排除，沒有底色。</p>
    <div class="field">
      <label>Email <input type="email" /></label>
    </div>
  </body>
</html>
```

#### 自訂屬性與 @layer

自訂屬性（custom properties）以 `--` 開頭，用 `var()` 取用，而且會繼承。品牌色放在 `:root`（等於 `html`），整頁都能讀到。`var(--ink, #134e4a)` 的第二個引數是找不到變數時的備援。區域變數寫在元件上，只影響該元素和子孫。重複出現的色碼可以收成變數，改品牌時只改一處。後面的 CSS 變數那一章會把同一組代幣做成可以換膚的一頁。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/15-layer.html`，用 Live Server 開 `03-css/index.html` 再點選單「自訂屬性與 @layer（選讀）」。

`@layer` 把作者樣式分成若干層。一般宣告裡，**較晚宣告的層**蓋過較早的層；完全沒放進層的一般宣告，又蓋過所有層。分層適合「重置在底層、元件在上層」。`!important` 在層裡的優先順序會反過來，選讀階段不要在 `@layer` 裡加 `!important`。


```html layer.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：變數與分層</title>
    <style>
      :root {
        --ink: #134e4a;
        --paper: #f0fdfa;
        --brand: #115e59;
      }

      body {
        margin: 1.5rem;
        color: var(--ink);
        background: var(--paper);
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .card {
        --ink: #7c2d12;
        color: var(--ink, #134e4a);
        padding: 0.75rem 1rem;
      }

      @layer base, components;

      @layer base {
        a {
          color: var(--brand);
        }
      }

      @layer components {
        a {
          color: #9f1239;
        }
      }
    </style>
  </head>
  <body>
    <h1>變數會繼承，分層決定誰蓋誰</h1>
    <p class="card">這張卡把自己的 --ink 改成磚紅，只有這張和裡面的字受影響。</p>
    <p><a href="#top">這條連結在 components 層，所以是玫瑰紅，不是 brand 的深青綠。</a></p>
  </body>
</html>
```

#### 命名與字型檔

Class 怎麼取名、字型檔怎麼掛上，都不增加新的選擇器語法。專題可以繼續用較短的 class，系統字型堆疊也夠用；這裡只留命名習慣與 `@font-face`。

##### BEM 命名

BEM（Block Element Modifier）是 class 的命名習慣，不是新的選擇器語法。區塊是元件，元素是區塊的一部分，修飾是狀態或變體。雙底線、雙連字號只是名字的一部分，權重仍各是一個 class。不要再寫 `.tour-card .tour-card__title` 把選擇器拉長，除非同一種元素名會出現在別的區塊。這門課的專題可以沿用較短的 class；團隊若已經用 BEM，讀得懂即可。

| 角色 | class | 意思 |
| --- | --- | --- |
| 區塊 | `.tour-card` | 一張行程卡 |
| 元素 | `.tour-card__title` | 這張卡的標題 |
| 修飾 | `.tour-card--soldout` | 這張卡已額滿 |

##### 載入字型檔

系統堆疊不夠用時，才把字型檔放進網站。優先使用你有授權的字型。`woff2` 是網頁用的壓縮格式。`font-display: swap` 的意思是：字型檔還沒到時先用堆疊裡的下一個字，到了再換，避免空白畫面卡住。每個字重各寫一個 `@font-face`（400 與 700 是兩個檔）。有網路時也可以在 `head` 用 `link` 載入公開字型服務，並把該家族放在堆疊最前。不要用 `@import` 去拉字型。課堂電腦若沒有外網，仍要靠系統堆疊能讀。

```css tour.css
@font-face {
  font-family: "Tour Sans";
  src: url("fonts/tour-sans.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.tour-card {
  color: #134e4a;
  background: #f0fdfa;
  font-family: "Tour Sans", system-ui, "PingFang TC", "Microsoft JhengHei",
    sans-serif;
}

.tour-card__title {
  font-size: 1.25rem;
}

.tour-card--soldout {
  color: #64748b;
}
```

## 盒子與欄位排版

每個元素都是一顆矩形盒子。先決定盒子多大、怎麼參加排版、座標跟誰比，再決定同一層的小孩沿一個方向排，或同時切成欄與列。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/16-box.html`、`pages/17-display.html`、`pages/18-position.html`、`pages/19-overflow.html`、`pages/20-flex.html`、`pages/21-grid.html`。用 Live Server 開 `03-css/index.html`，再點選單換頁。

### 盒子與定位

字與底色已經會變之後，接下來看盒子本身：內容、內距、邊框、外距疊在一起，再決定它獨佔一行還是跟文字坐在一起、座標跟誰比、畫出邊界時裁掉還是捲動。欄與列的排列留到這一節後面的 Flex 與 Grid。這四份檔仍是完整 HTML，存檔後用 Live Server 打開，按 <kbd>F12</kbd> 對 **Computed** 裡的盒模型圖。

{% mermaid graph TD %}
margin["margin 外距<br/>透明，露出父層"] --> border["border 邊框"]
border --> padding["padding 內距<br/>背景塗到這裡"]
padding --> content["content 內容"]
{% endmermaid %}

#### 盒子模型

盒子模型（box model）把每個元素分成內容、內距、邊框、外距。寬高算到哪一層、四邊怎麼簡寫、垂直外距會不會合併，都在這裡。見 [MDN：盒模型](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/16-box.html`，用 Live Server 開 `03-css/index.html` 再點選單「盒子模型」。

##### 寬高與四邊簡寫

`width` 與 `height` 量的是哪一層，由 `box-sizing` 決定。預設 `content-box` 只量內容，padding 與 border 再往外加，所以「寫了 100% 又加了內距」會比父層更寬。課堂與專題在樣式表最前面改成 `border-box`：你寫的寬高含內容、padding、border，不含 margin。`*` 要連 `::before`、`::after` 一起寫，偽元素才不會回到預設算法。

簡寫依順時針：一個值四邊相同；兩個值是上下、左右；三個值是上、左右、下；四個值是上、右、下、左。後寫的單邊（`border-left`、`padding-bottom`）蓋過簡寫的那一邊。`padding` 不能是負值；`margin` 可以，元素會往該側移，也可能壓到隔壁。左右 `margin: auto` 會平分剩餘寬度，所以要比父層窄的區塊才能水平置中。寬度已經撐滿時，左右沒有剩餘，`auto` 看起來像 0。上下的 `margin: auto` 在普通區塊流裡不會把盒子推到父層底部，垂直置中用 Flex 或 Grid。

##### 外距合併、輪廓與尺寸

同一個包含塊裡，上下相鄰的區塊盒，垂直 margin 會併成**較大的那一個**，不會相加。左右不會合併。父層若沒有 padding、沒有 border、也沒有上緣內容，子層的 `margin-top` 會穿出去，父層背景包不住那段空隙。`margin`、`padding`、`border` 都不繼承。

`border` 要有樣式才看得到；寬度與顏色寫了、樣式仍是 `none`，畫面還是沒有線。`border-radius` 只改角。`outline` 畫在邊框外側，不佔寬高，鍵盤焦點用它，並加上 `:focus-visible`，滑鼠點擊就不必長出這條線。只寫 `outline: none` 會讓鍵盤使用者看不到現在停在哪裡。

`width: auto` 的區塊會撐滿那一行可用的寬（再扣掉自己的 margin）。`height: auto` 跟著內容長高。百分比高度要父層自己有明確高度才算得出來。圖片加上 `max-width: 100%`，才不會比父層更寬。`width: min(100%, 22rem)` 是窄於 22rem 時跟父層一樣寬，更寬時停在 22rem。

| 層 | 佔不佔空間 | 背景 |
| --- | --- | --- |
| 內容 | 由文字與寬高決定 | 與 padding 連成一片 |
| padding | 算進邊框以內 | 看得到 |
| border | 算進邊框以內 | 自己的顏色 |
| margin | 把兄弟推開 | 透明，露出父層 |

| `box-sizing` | `width: 16rem` 量到哪 | 再加上 padding、border |
| --- | --- | --- |
| `content-box` | 只有內容 | 總寬變大，會撐破父層 |
| `border-box` | 內容 + padding + border | 總寬仍是 16rem |


```html box.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>盒子模型</title>
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
      }

      h2 {
        margin: 2rem 0 0.5rem;
        font-size: 1.1rem;
      }

      /* 父層淺青。卡片的 margin 透明，所以空隙露出這層底色 */
      .stage {
        background: #ccfbf1;
        padding: 0.25rem;
      }

      .card {
        width: min(100%, 22rem);
        margin: 1rem auto;
        padding: 1rem;
        border: 6px solid #0f766e;
        border-radius: 0.75rem;
        background: #f0fdfa;
      }

      .card .content {
        background: #cffafe;
      }

      .track {
        width: 16rem;
        max-width: 100%;
        margin-bottom: 0.75rem;
        border: 1px dashed #0f766e;
      }

      .track .kid {
        width: 100%;
        padding: 0.5rem 1rem;
        border: 4px solid #115e59;
        background: #f0fdfa;
      }

      /* 這一張改回預設算法，讓虛線包不住 */
      .content-box .kid {
        box-sizing: content-box;
      }

      .collapse p {
        margin-top: 0.5rem;
        margin-bottom: 2rem;
        background: #f0fdfa;
      }

      .collapse p + p {
        margin-top: 0.5rem;
        margin-bottom: 0;
      }

      .ticket {
        width: min(100%, 22rem);
        margin: 1rem auto;
        padding: 0.25rem 1rem 1.25rem;
        border-left: 6px solid #115e59;
        background: #fff;
      }

      .chip {
        display: inline-block;
        margin-right: 0.5rem;
        padding: 0.15rem 0.75rem;
        border-radius: 999px;
        background: #115e59;
        color: #f0fdfa;
      }

      .go {
        padding: 0.4rem 0.9rem;
        border: 1px solid #0f766e;
        border-radius: 0.4rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .go:focus-visible {
        outline: 3px solid #9f1239;
        outline-offset: 3px;
      }
    </style>
  </head>
  <body>
    <h1>盒子四層</h1>
    <div class="stage">
      <article class="card">
        <p class="content">淺藍是內容。淺綠底含 padding。粗框是 border。框外淺青是 margin，沒有卡片自己的底色。</p>
      </article>
    </div>

    <h2>border-box 與 content-box</h2>
    <div class="track">
      <div class="kid">border-box：100% 含左右 padding 與邊框，對齊虛線。</div>
    </div>
    <div class="track content-box">
      <div class="kid">content-box：100% 只量內容，padding 與邊框再往外加，虛線包不住。</div>
    </div>

    <h2>垂直外距合併</h2>
    <div class="collapse">
      <p>這段 margin-bottom 是 2rem。</p>
      <p>下段 margin-top 只有 0.5rem。兩段之間是較大的 2rem，不是 2.5rem。</p>
    </div>

    <h2>水平置中、圓角、焦點框</h2>
    <article class="ticket">
      <h3>京都三日</h3>
      <p>這張比父層窄，左右 margin 是 auto，所以在頁面上居中。</p>
      <span class="chip">清水寺</span><span class="chip">嵐山</span>
      <p><a class="go" href="#top">看行程</a>（用 Tab 移到這裡，玫瑰色 outline 不改變按鈕尺寸）</p>
    </article>
  </body>
</html>
```

{% note success %}
**跟著做**
點 `.card`，打開 Computed 的盒模型圖：padding 四邊 `1rem`、border `6px`、margin `1rem`。再點兩條軌道，比較總寬有沒有超出虛線。用 <kbd>Tab</kbd> 移到「看行程」，確認焦點框出現、按鈕寬度不變。
{% endnote %}

#### display

`display` 決定盒子怎麼參加排版，不改變標籤的語意。區塊、行內、可設寬高的行內，以及三種先不要給人看的寫法，畫面差很多。見 [MDN：display](https://developer.mozilla.org/zh-TW/docs/Web/CSS/display)。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/17-display.html`，用 Live Server 開 `03-css/index.html` 再點選單「display」。

##### 區塊與行內

`display` 決定這顆盒子怎麼參加排版，不改變標籤的語意。`div`、`p`、標題與 `section` 預設是 `block`，獨佔一行，寬高與垂直 margin 都算數。`span`、`a`、`strong` 預設是 `inline`，跟文字坐在同一行；左右的 padding、margin、border 會把旁邊的字推開，上下的 padding 與 border 會畫出來，但通常不把行盒撐高，所以可能壓到上一行。行內盒（置換元素如 `img` 除外）不採用你寫的寬高。

`inline-block` 仍跟文字同一行，但可以有自己的寬高與垂直 margin。它和旁邊文字之間的換行會變成一個空白，三個標籤中間那條縫常常是這個空白，不是 margin。穩定的按鈕用 `inline-block`，或交給下一章的 Flex。`vertical-align` 只對行內與 `inline-block` 有意義。圖片底下那條小縫，是它在跟文字基線對齊；改成 `display: block` 或 `vertical-align: middle` 就會消失。整頁的垂直置中不要靠它。

##### 不顯示的三種寫法

`display: none` 不建立盒子，後面的元素補上它的位置，也不接收點擊。`visibility: hidden` 仍佔位，只是看不見。`opacity: 0` 也佔位，而且預設仍能被點到。三種都還在 HTML 裡。暫時不顯示的區塊用 `none`；要留空位避免版面跳動，用 `hidden`。

| 值 | 畫面上 | 寬高 | 垂直 margin |
| --- | --- | --- | --- |
| `block` | 獨佔一行，寬度撐滿 | 採用 | 採用，可能合併 |
| `inline` | 跟前後文字同一行 | 不採用 | 不採用 |
| `inline-block` | 同一行，每顆有自己的寬高 | 採用 | 採用 |
| `none` | 不出現，位子被補上 | 不建立盒子 | — |


```html display.html
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
      }

      h2 {
        margin: 1.75rem 0 0.4rem;
        font-size: 1.1rem;
      }

      .block {
        margin-bottom: 0.5rem;
        padding: 0.4rem 0.75rem;
        background: #f0fdfa;
        border-left: 4px solid #0f766e;
      }

      .line .item {
        padding: 0.35rem 0.5rem;
        border: 2px solid #0f766e;
        background: #ccfbf1;
      }

      .days .day {
        display: inline-block;
        width: 4.5rem;
        margin-right: 0.25rem;
        padding: 0.35rem 0;
        background: #115e59;
        color: #f0fdfa;
        text-align: center;
      }

      .cell {
        display: inline-block;
        width: 2.5rem;
        margin: 0 0.35rem 0.5rem 0;
        padding: 0.35rem 0;
        background: #115e59;
        color: #f0fdfa;
        text-align: center;
      }

      .gone {
        display: none;
      }

      .hold {
        visibility: hidden;
      }

      .ghost {
        opacity: 0;
      }

      .photo {
        width: 4.5rem;
        height: 3rem;
        background: #0f766e;
      }

      .photo.block {
        display: block;
        margin-bottom: 0;
        border-left: 0;
      }

      .photo.middle {
        vertical-align: middle;
      }
    </style>
  </head>
  <body>
    <h1>盒子怎麼參加排版</h1>

    <h2>block</h2>
    <div class="block">第一張區塊，獨佔一行。</div>
    <div class="block">第二張從下一行開始，中間是垂直 margin。</div>

    <h2>inline</h2>
    <p class="line">
      行程有<span class="item">甲</span>與<span class="item">乙</span>兩站。上下邊框會畫出來，但不把這一行撐高。
    </p>

    <h2>inline-block</h2>
    <p class="days">
      <span class="day">三日</span>
      <span class="day">四日</span>
      <span class="day">五日</span>
    </p>
    <p>三個標籤之間的縫，有一部分是原始碼換行造成的空白。</p>

    <h2>三種隱藏</h2>
    <p>
      <span class="cell">1</span><span class="cell gone">2</span><span class="cell">3</span>
    </p>
    <p>上一列是 display: none，「2」不佔位，1 緊接著 3。</p>
    <p>
      <span class="cell">1</span><span class="cell hold">2</span><span class="cell">3</span>
    </p>
    <p>這一列是 visibility: hidden，中間仍空一格。</p>
    <p>
      <span class="cell">1</span><span class="cell ghost">2</span><span class="cell">3</span>
    </p>
    <p>這一列是 opacity: 0，位子還在，滑鼠仍點得到那一格。</p>

    <h2>圖片底縫</h2>
    <p>
      <img class="photo" alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" />
      行內圖片跟基線對齊，底下有一條縫。
    </p>
    <p>
      <img class="photo middle" alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" />
      vertical-align: middle 把縫收掉。
    </p>
    <p>
      <img class="photo block" alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" />
      display: block 也沒有那條縫，圖片自己佔一行。
    </p>
  </body>
</html>
```

{% note info %}
**小技巧：先看預設**
連結 `a` 預設是 `inline`。做成按鈕時再改 `inline-block`，padding 與寬高才按你寫的走。不確定時看 Computed 的 `display`。
{% endnote %}

#### 定位與 z-index

`position` 決定偏移量跟誰比，`z-index` 決定重疊時誰在上面。徽章、黏性標題與層疊情境是這一節的三個結果。見 [MDN：position](https://developer.mozilla.org/zh-TW/docs/Web/CSS/position)。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/18-position.html`，用 Live Server 開 `03-css/index.html` 再點選單「定位與 z-index」。

##### 五種定位

`position` 決定座標跟誰比。預設 `static` 參加正常排版，`top`、`right`、`bottom`、`left` 與 `z-index` 都無效。`relative` 以自己原本的位子為原點，原位仍留著，兄弟不會補上來。`absolute` 對準最近一個 `position` 不是 `static` 的祖先（對的是那個祖先的 padding 邊緣）；都沒有時，對準頁面的初始包含塊，原位釋出。`fixed` 對準視窗。`sticky` 平常像相對，滾過你寫的門檻後黏在滾動盒邊緣，範圍只到它的父層結束。

徽章的寫法是：卡片 `position: relative`，徽章 `position: absolute` 再寫 `top` 與 `right`。少了卡片上的 `relative`，徽章會貼到整頁。`absolute` 與 `fixed` 離開文字流之後可以設寬高，就算標籤原本是 `inline`。偏移的百分比，水平看包含塊的寬，垂直看包含塊的高。

`sticky` 至少要一個門檻（`top`、`right`、`bottom`、`left`）。它黏的是最近的滾動盒：示範裡白盒設了 `overflow: auto` 與固定高度，標題黏的是白盒上緣，不是整個瀏覽器。祖先若有 `overflow: hidden`，黏性常常失效。父層沒有比滾動盒更高的空間時，也看不到黏住的過程。

##### 層疊情境

`z-index` 只對已定位的盒子生效（Flex、Grid 的小孩例外，即使 `static` 也能用）。數字愈大愈靠近你，也可以是負數。`auto` 不建立新的層疊情境，後面的兄弟蓋住前面的兄弟。數字只在**同一個層疊情境**裡比。`position` 加上不是 `auto` 的 `z-index` 會開一個新情境；情境與情境之間比的是父親，小孩的數字出不去。專題不要靠 `9999` 去壓過別的元件。

| 值 | 參考點 | 原來的位子 |
| --- | --- | --- |
| `static` | 正常排版 | 留著 |
| `relative` | 自己原本的位子 | 留著，只是視覺上挪開 |
| `absolute` | 最近的已定位祖先 | 釋出，兄弟會補上 |
| `fixed` | 視窗 | 釋出 |
| `sticky` | 滾過門檻後黏住滾動盒 | 在父層範圍內留著 |


```html position.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>定位與層級</title>
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
      }

      h2 {
        margin: 1.75rem 0 0.4rem;
        font-size: 1.1rem;
      }

      .shift {
        position: relative;
        top: 0.75rem;
        left: 1rem;
        width: min(100%, 18rem);
        padding: 0.4rem 0.75rem;
        background: #f0fdfa;
        border: 1px dashed #0f766e;
      }

      .next {
        width: min(100%, 18rem);
        margin-top: 0.4rem;
        padding: 0.4rem 0.75rem;
        background: #ccfbf1;
      }

      .tour {
        position: relative;
        width: min(100%, 22rem);
        margin-top: 1.5rem;
        padding: 1.25rem 1rem 1rem;
        background: #f0fdfa;
        border-radius: 0.75rem;
      }

      .badge {
        position: absolute;
        top: 0.6rem;
        right: 0.6rem;
        padding: 0.1rem 0.55rem;
        border-radius: 999px;
        background: #9f1239;
        color: #fff;
        font-size: 0.85rem;
      }

      .scroller {
        height: 12rem;
        overflow: auto;
        background: #fff;
        border: 1px solid #99f6e4;
      }

      .day h3 {
        position: sticky;
        top: 0;
        margin: 0;
        padding: 0.35rem 0.75rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .day p {
        margin: 0;
        padding: 0.75rem;
      }

      .ask {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        padding: 0.45rem 0.9rem;
        border-radius: 999px;
        background: #115e59;
        color: #f0fdfa;
      }

      .pile {
        position: relative;
        height: 8rem;
        margin-top: 0.5rem;
      }

      .sheet {
        position: absolute;
        width: 9rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
      }

      .sheet.a {
        top: 0;
        left: 0;
        z-index: 1;
        background: #ccfbf1;
      }

      .sheet.b {
        top: 1.2rem;
        left: 2rem;
        z-index: 2;
        background: #fde68a;
      }

      .sheet.c {
        top: 2.4rem;
        left: 4rem;
        z-index: 3;
        background: #fecdd3;
      }

      .contexts {
        position: relative;
        height: 7rem;
        margin-top: 0.5rem;
      }

      .ctx {
        position: absolute;
        width: 11rem;
        height: 5.5rem;
        padding: 0.4rem;
      }

      .ctx-a {
        top: 0;
        left: 0;
        z-index: 1;
        background: #ccfbf1;
      }

      .ctx-b {
        top: 1.2rem;
        left: 6rem;
        z-index: 2;
        background: #fecdd3;
      }

      .kid {
        position: absolute;
        right: 0.4rem;
        bottom: 0.4rem;
        padding: 0.25rem 0.45rem;
      }

      .ctx-a .kid {
        z-index: 50;
        background: #115e59;
        color: #f0fdfa;
      }

      .ctx-b .kid {
        z-index: 1;
        background: #9f1239;
        color: #fff;
      }
    </style>
  </head>
  <body>
    <h1>定位</h1>

    <h2>relative 留著原位</h2>
    <div class="shift">這張往下 0.75rem、往右 1rem。</div>
    <div class="next">下一張仍從「沒挪開時」的下方開始排，中間留下空位。</div>

    <h2>父層 relative、徽章 absolute</h2>
    <article class="tour">
      <span class="badge">熱門</span>
      <h3>奈良一日</h3>
      <p>徽章對的是這張卡的 padding 邊緣，不佔標題那一行。</p>
    </article>

    <h2>sticky 黏在滾動盒</h2>
    <div class="scroller">
      <section class="day">
        <h3>第一天・京都</h3>
        <p>往下滾，標題黏在白盒上緣。這一段結束後，標題會跟著走。</p>
        <p>父層要比滾動盒更高，才看得到黏住的過程。</p>
      </section>
      <section class="day">
        <h3>第二天・大阪</h3>
        <p>下一天的標題再黏上來。黏的是這個白盒，不是整個瀏覽器。</p>
        <p>再留一段高度，讓你能把第二天也滾過門檻。</p>
      </section>
    </div>

    <h2>z-index 在同一層裡比</h2>
    <div class="pile">
      <div class="sheet a">1</div>
      <div class="sheet b">2</div>
      <div class="sheet c">3 在最上面</div>
    </div>

    <h2>情境之間比父親</h2>
    <div class="contexts">
      <div class="ctx ctx-a">
        父親 A，z-index 1
        <span class="kid">小孩 50</span>
      </div>
      <div class="ctx ctx-b">
        父親 B，z-index 2
        <span class="kid">小孩 1</span>
      </div>
    </div>
    <p>玫瑰紅小孩蓋住深綠小孩：B 整包在 A 之上，A 的 50 出不去。</p>

    <a class="ask" href="#top">諮詢</a>
  </body>
</html>
```

{% note warning %}
**注意事項**
整頁的欄、卡片列、置中，用正常排版與下一章的 Flex、Grid。`absolute` 留給徽章、關閉鈕這一類疊在表面的小東西。`fixed` 留給真的要跟著視窗的列。右下「諮詢」是 `fixed`，所以 `body` 留了下緣空隙，最後一行才不會被它蓋住。
{% endnote %}

#### overflow

內容比盒子的 padding 邊緣還大時，`overflow` 決定多出來的部分是露出、裁掉，還是出現捲軸。單行省略號是同一組屬性再加上不換行。見 [MDN：overflow](https://developer.mozilla.org/zh-TW/docs/Web/CSS/overflow)。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/19-overflow.html`，用 Live Server 開 `03-css/index.html` 再點選單「overflow」。

##### 裁切與捲動

內容比盒子的 padding 邊緣還大時，`overflow` 決定多出來的部分。預設 `visible`：畫到外面，不出現捲軸，也不撐大已經寫死的 `width`（高度的 `auto` 仍會跟著內容長）。`hidden` 裁掉，沒有捲軸。`auto` 超過才出現捲軸。`scroll` 一律預留捲軸的位子。

`overflow-x` 與 `overflow-y` 可以分開。其中一軸不是 `visible` 時，另一軸的 `visible` 會被算成 `auto`。只想水平捲、垂直仍露出時，到 Computed 確認最後的值。圓角盒子裡的小孩預設可以畫出圓角，父層加上 `overflow: hidden` 才切得齊。`hidden` 也會讓這一層變成滾動盒，子孫的 `sticky` 可能因此失效。

##### 單行省略

單行要出現省略號，四個條件一起寫：有寬度、`overflow: hidden`、`white-space: nowrap`、`text-overflow: ellipsis`。少一個就會改成換行或直接裁掉。

| 值 | 行為 |
| --- | --- |
| `visible` | 畫到外面，沒有捲軸 |
| `hidden` | 裁掉，沒有捲軸 |
| `auto` | 超過才出現捲軸 |
| `scroll` | 一律預留捲軸 |


```html overflow.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>overflow</title>
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
      }

      h2 {
        margin: 1.75rem 0 0.4rem;
        font-size: 1.1rem;
      }

      .frame {
        width: min(100%, 16rem);
        margin-bottom: 0.75rem;
        background: #ccfbf1;
      }

      .spill {
        width: 22rem;
        padding: 0.5rem 0.75rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .clip {
        width: min(100%, 16rem);
        overflow: hidden;
        border-radius: 1rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .clip .band {
        padding: 0.75rem 1rem;
        background: #0f766e;
      }

      .scroll-box {
        width: min(100%, 18rem);
        height: 6.5rem;
        overflow: auto;
        padding: 0.5rem 0.75rem;
        background: #f0fdfa;
        border: 1px solid #0f766e;
      }

      .title {
        width: min(100%, 16rem);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0.35rem 0.6rem;
        background: #fff7ed;
      }
    </style>
  </head>
  <body>
    <h1>溢出</h1>

    <h2>visible</h2>
    <div class="frame">
      <div class="spill">這條比淺青框更寬，多出來的部分直接畫到外面，沒有捲軸。</div>
    </div>

    <h2>hidden 與圓角</h2>
    <div class="clip">
      <div class="band">深綠帶被圓角切齊。拿掉父層的 overflow: hidden，色帶的角會凸出去。</div>
    </div>

    <h2>auto</h2>
    <div class="scroll-box">
      <p>白盒高度只有 6.5rem。內容超過才出現捲軸。</p>
      <p>伏見稻荷的千本鳥居沿山道往上，走完約兩小時。</p>
      <p>再留一段，讓你確定捲軸是因為裝不下，不是預先佔位。</p>
    </div>

    <h2>單行省略</h2>
    <p class="title">京都・清水寺・二年坂三年坂・八坂之塔・這一行放不下就以省略號結尾</p>
  </body>
</html>
```

{% note success %}
**跟著做**
把視窗縮到標題那一行放不下，確認結尾是省略號。在 Styles 取消 `.title` 的 `white-space`，它會改回換行。再取消 `.clip` 的 `overflow`，看色帶的直角。
{% endnote %}

### 欄位排版

一個方向上的排列用 Flex：導覽列、一排按鈕、卡片橫列。兩個方向同時切用 Grid：頁首與側欄、或欄線要對齊的卡片牆。兩者都寫在父層，只排**直接子元素**；孫子仍由它們自己的父層排。項目之間的縫用 `gap`，不加在容器外緣，外緣用 padding。Flex 與 Grid 的項目之間不合併 margin。`float` 不是這一章的欄位手法。

{% mermaid graph TD %}
A["這一層要排什麼"] --> B["沿一個方向"]
A --> C["行與列一起定"]
B --> D["display: flex"]
C --> E["display: grid"]
E --> F["格子裡的一排或一欄<br/>再 display: flex"]
{% endmermaid %}

#### Flexbox

Flexbox 把直接子元素排成一列或一行。主軸負責排隊與剩餘空間，交叉軸負責對齊，項目要變寬變窄再寫 `flex`。見 [MDN：Flexbox 基本概念](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/20-flex.html`，用 Live Server 開 `03-css/index.html` 再點選單「Flexbox」。

##### 方向、換行與對齊

`display: flex` 讓直接子元素變成彈性項目。主軸是排隊的方向，交叉軸跟它垂直。`flex-direction: row` 在繁中橫排是由左到右，`column` 由上到下。`row-reverse` 與 `column-reverse` 只改視覺起點，原始碼與 <kbd>Tab</kbd> 順序不變，不要用它把第一個連結藏到最後。`flex-flow` 是方向與換行的簡寫；少寫的那個回到預設。

預設 `nowrap`：空間不夠就縮小（`flex-shrink` 預設是 1）。`wrap` 不夠時換行。換行之後每一行仍是一條彈性行。`gap` 一個值表示行與列相同。項目上不要再用左右 margin 當欄距，否則換行時行首行尾會多一截；`margin` 留給「把這一項推開」，例如 `margin-left: auto` 或卡片裡的 `margin-top: auto`。

`justify-content` 分主軸上、項目本身尺寸之外的空間。項目已經 `flex: 1` 把行撐滿時，這些值幾乎看不出差別。`align-items` 管交叉軸，橫排時就是上下；預設 `stretch`，交叉軸尺寸是 `auto` 的項目會被拉到跟那一行一樣高。主軸改成 `column` 之後，兩個屬性對調所管的方向：先問現在哪一邊是主軸。`align-content` 只有在已經換行、而且交叉軸上還有空位時才看得出來。

##### 彈性係數與最小尺寸

子項的 `flex` 是 `flex-grow`、`flex-shrink`、`flex-basis` 的簡寫。分配時先用基礎尺寸，再把剩下的空間按 grow 分掉；不夠時按 shrink 縮小。`flex: 1` 從 0 起算再均分，欄寬容易一樣。`flex: auto` 從內容尺寸再一起放大。`flex: none` 不伸也不縮。`fr` 不能寫在 Flex 裡。

彈性項目的 `min-width` 預設是 `auto`，不會縮到比內容的最小寬度更窄。一長串沒有空白的字會把整行撐破。要讓縮小生效，寫 `min-width: 0`（直向主軸被高度撐破時是 `min-height: 0`）。`order` 只改視覺順序，不改 <kbd>Tab</kbd>。主軸上要單獨推開某一項，用該側的 `margin: auto`；彈性項目沒有 `justify-self`。

| 寫在父層 | 做什麼 |
| --- | --- |
| `flex-direction` | 主軸方向，預設 `row` |
| `flex-wrap` | 不夠時換不換行，預設 `nowrap` |
| `justify-content` | 主軸上怎麼分剩餘空間 |
| `align-items` | 單行裡，交叉軸怎麼對 |
| `align-content` | 換行之後，行與行怎麼分 |
| `gap` | 項目之間的縫，不含外緣 |

| `flex` 簡寫 | 展開 | 畫面上 |
| --- | --- | --- |
| `initial`（預設） | `0 1 auto` | 依內容，不搶剩餘空間 |
| `1` | `1 1 0%` | 基礎先當 0，再按份數均分 |
| `auto` | `1 1 auto` | 從內容尺寸開始再放大 |
| `none` | `0 0 auto` | 不放大也不縮小 |
| `2` | `2 1 0%` | 分剩餘空間時拿 2 份 |

| `justify-content` | 主軸上 |
| --- | --- |
| `flex-start` | 靠起點。預設 |
| `flex-end` | 靠終點 |
| `center` | 整組擺在中間 |
| `space-between` | 兩端貼齊，中間空隙相等 |
| `space-around` | 每項兩側各一份，項目之間是兩份 |
| `space-evenly` | 外緣與項目之間都一樣 |


```html flex.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flex</title>
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
      }

      h2 {
        margin: 1.75rem 0 0.4rem;
        font-size: 1.1rem;
      }

      .box {
        padding: 0.45rem 0.6rem;
        background: #f0fdfa;
        border: 1px solid #0f766e;
      }

      .row,
      .col {
        display: flex;
        gap: 0.4rem;
        margin-bottom: 0.45rem;
      }

      .col {
        flex-direction: column;
        width: 8rem;
      }

      .pair {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }

      .rail {
        width: min(100%, 22rem);
        margin-bottom: 0.45rem;
        background: #ccfbf1;
      }

      .rail.nowrap {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.4rem;
        overflow: auto;
      }

      .rail.wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }

      .stop {
        flex: 0 0 8rem;
        padding: 0.4rem 0.5rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.6rem 0.9rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .bar nav {
        display: flex;
        gap: 0.75rem;
      }

      .bar a {
        color: #f0fdfa;
      }

      .shares {
        display: flex;
        gap: 0.4rem;
        margin: 0.75rem 0;
      }

      .shares span {
        padding: 0.35rem 0.6rem;
        background: #f0fdfa;
      }

      .shares .grow {
        flex: 1;
      }

      .shares .grow2 {
        flex: 2;
        background: #fde68a;
      }

      .code {
        display: flex;
        gap: 0.4rem;
        width: min(100%, 24rem);
      }

      .code span {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0.35rem 0.5rem;
        background: #f0fdfa;
      }

      .code .stuck {
        min-width: auto;
      }

      .trips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .trip {
        display: flex;
        flex: 1 1 12rem;
        flex-direction: column;
        min-width: 0;
        padding: 0.75rem 0.9rem;
        background: #f0fdfa;
        border-radius: 0.75rem;
      }

      .trip .go {
        margin-top: auto;
        color: #115e59;
      }

      .page {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 10rem;
        margin-top: 0.75rem;
        background: #ccfbf1;
      }

      .page div {
        padding: 0.35rem 0.7rem;
        background: #115e59;
        color: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <h1>Flex 排一個方向</h1>

    <h2>主軸</h2>
    <div class="pair">
      <div class="row">
        <span class="box">1</span><span class="box">2</span><span class="box">3</span>
      </div>
      <div class="col">
        <span class="box">1</span><span class="box">2</span><span class="box">3</span>
      </div>
    </div>
    <p>左邊 row 的主軸是水平。右邊 column 的主軸是垂直，align-items 改管左右。</p>

    <h2>換行</h2>
    <div class="rail nowrap">
      <span class="stop">清水寺</span><span class="stop">伏見稻荷</span><span class="stop">嵐山</span><span class="stop">金閣寺</span>
    </div>
    <div class="rail wrap">
      <span class="stop">清水寺</span><span class="stop">伏見稻荷</span><span class="stop">嵐山</span><span class="stop">金閣寺</span>
    </div>
    <p>每顆 flex: 0 0 8rem。上條 nowrap 出現捲軸，下條 wrap 折成兩行，縫是 gap。</p>

    <h2>兩端對齊的導覽</h2>
    <header class="bar">
      <strong>行程本</strong>
      <nav>
        <a href="#tours">行程</a>
        <a href="#about">關於</a>
      </nav>
    </header>
    <p>外層 space-between 管品牌與 nav。nav 自己再是一層 Flex，用 gap 排連結。</p>

    <h2>份數與縮小</h2>
    <div class="shares">
      <span class="grow">1 份</span>
      <span class="grow2">2 份</span>
      <span class="grow">1 份</span>
    </div>
    <div class="code">
      <span>京都</span>
      <span class="stuck">KYOTO-KIYOMIZU-STATION-WALKING-ROUTE-2026</span>
      <span>大阪</span>
    </div>
    <p>中間那顆 min-width 仍是 auto，長字把整行撐開。把 .stuck 的 min-width 改成 0，左右才讓得出位置，省略號也才出現。</p>

    <h2>卡片列，連結沉底</h2>
    <div class="trips">
      <article class="trip">
        <h3>京都三日</h3>
        <p>介紹只有一句。</p>
        <a class="go" href="#kyoto">看行程</a>
      </article>
      <article class="trip">
        <h3>大阪二日</h3>
        <p>這張介紹比較長，所以連結要靠 margin-top: auto 才跟左邊對齊在底部。同一行的卡片被 stretch 拉成一樣高。</p>
        <a class="go" href="#osaka">看行程</a>
      </article>
    </div>

    <h2>直向主軸，上下撐開</h2>
    <div class="page">
      <div>頁首</div>
      <div>主文</div>
      <div>頁尾</div>
    </div>
  </body>
</html>
```

{% note warning %}
**注意事項**
卡片上的 `min-width: 0` 和長代碼是同一件事。沒寫的話，某一張卡裡的長網址可能把整列撐出螢幕。包一層 `div` 之後，裡面的東西對這一層來說只算一項。
{% endnote %}

#### Grid

Grid 同時指定欄與列，項目落在格子上。格線從 1 起算，剩餘空間用 `fr`，欄數也可以跟著容器寬度變。見 [MDN：Grid 基本概念](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout)。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/21-grid.html`，用 Live Server 開 `03-css/index.html` 再點選單「Grid」。

##### 格線與剩餘空間

`display: grid` 同時指定欄與列。項目預設依原始碼，先填滿一列再換下一列。格線從 1 起算，不是 0。三欄有四條直格線。`grid-column: 1 / 3` 是從第 1 條線到第 3 條線，佔兩欄，終點那條線不包含在內。`-1` 是最後一條線，`1 / -1` 從最左跨到最右。

`fr` 分的是扣掉固定軌道與 `gap` 之後的剩餘空間。`1fr` 的下限其實是 `auto`，一長串不能斷行的字會把欄撐開，要肯縮小就寫 `minmax(0, 1fr)`。沒寫列高時，列數跟著內容，高度是 `auto`。自動多出來的軌道用 `grid-auto-rows`。父層高度是 `auto` 時，列上的 `1fr` 常常只跟內容一樣高，所以頁面骨架要給 `min-height`，中列才有高度可分。

##### 自動欄數與命名區域

`repeat(auto-fit, minmax(12rem, 1fr))` 依容器寬度決定欄數，空欄收成 0，卡片把整行撐滿。`auto-fill` 仍留下空欄，卡片維持較窄。下限不要寫 `1fr`，瀏覽器無法同時未知欄數又讓每欄先拿一份。`grid-auto-flow: column` 改成先往下填。

命名區域用 `grid-template-areas`。每一列是一條引號字串，格數必須相同。`.` 代表這一格先空著。子項用 `grid-area: header` 對上去。`grid-area: 1 / 1 / 3 / 3` 的順序是列起、欄起、列終、欄終，和 `grid-column` 的「先欄」不一樣；對得上名字時用名字。

##### 對齊與和 Flex 分工

Grid 有兩層對齊。`justify-items` 與 `align-items`（簡寫 `place-items`）管項目在自己那一格裡面，預設 `stretch`。`justify-content` 管的是整組軌道比容器窄時怎麼擺，不是格子裡的空位。`justify-self` 只改一格。

卡片牆若重點是自動幾欄、欄線對齊，外層用 Grid。卡的內部仍是一個方向，所以卡自己 `display: flex`、`flex-direction: column`，連結 `margin-top: auto`。

| 畫面 | 用哪個 |
| --- | --- |
| 品牌在左、連結在右 | Flex，`space-between` |
| 一排按鈕、中間等距 | Flex 加 `gap` |
| 頁首、側欄、主文、頁尾 | Grid 加 `grid-template-areas` |
| 行程卡自動 2～4 欄 | Grid，`auto-fit` 與 `minmax` |
| 卡片裡的圖與「看行程」 | 卡內 Flex 直向 |
| 圖旁一段文字繞著走 | 選讀的 `float`，不是多欄版面 |


```html grid.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grid</title>
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
      }

      h2 {
        margin: 1.75rem 0 0.4rem;
        font-size: 1.1rem;
      }

      .cell {
        padding: 0.45rem 0.6rem;
        background: #f0fdfa;
        border: 1px solid #99f6e4;
      }

      .tracks {
        display: grid;
        grid-template-columns: 6rem 1fr 2fr;
        gap: 0.4rem;
      }

      .tracks .wide {
        background: #fde68a;
      }

      .safe {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 0.4rem;
        width: min(100%, 24rem);
        margin-top: 0.45rem;
      }

      .safe .cell {
        overflow-wrap: anywhere;
      }

      .shell {
        display: grid;
        grid-template-columns: 8rem minmax(0, 1fr) 9rem;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          "header header header"
          "nav main aside"
          "footer footer footer";
        gap: 0.45rem;
        min-height: 16rem;
      }

      .shell header {
        grid-area: header;
      }

      .shell nav {
        grid-area: nav;
      }

      .shell main {
        grid-area: main;
      }

      .shell aside {
        grid-area: aside;
      }

      .shell footer {
        grid-area: footer;
      }

      .shell > * {
        padding: 0.45rem 0.65rem;
        background: #f0fdfa;
      }

      .shell header,
      .shell footer {
        background: #115e59;
        color: #f0fdfa;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: 0.75rem;
      }

      .card {
        display: flex;
        flex-direction: column;
        min-width: 0;
        padding: 0.75rem 0.9rem;
        background: #f0fdfa;
        border-radius: 0.75rem;
      }

      .card .go {
        margin-top: auto;
        color: #115e59;
      }

      .align {
        display: grid;
        grid-template-columns: 6rem 6rem;
        grid-auto-rows: 4.5rem;
        gap: 0.4rem;
        justify-content: center;
        margin-top: 0.75rem;
      }

      .align .cell {
        background: #ccfbf1;
      }

      .align .pin {
        place-self: end;
        width: 3rem;
        height: 2rem;
        background: #115e59;
        color: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <h1>Grid 同時切欄與列</h1>

    <h2>軌道</h2>
    <div class="tracks">
      <div class="cell">6rem</div>
      <div class="cell">1fr</div>
      <div class="cell wide">2fr</div>
    </div>
    <div class="safe">
      <div class="cell">KYOTO-KIYOMIZU-STATION-WALKING-ROUTE-2026</div>
      <div class="cell">minmax(0, 1fr) 讓長字在欄內斷行，欄寬不被撐破。</div>
    </div>

    <h2>命名區域</h2>
    <div class="shell">
      <header>頁首跨三欄</header>
      <nav>導覽</nav>
      <main>主文。中欄是 minmax(0, 1fr)。</main>
      <aside>本季</aside>
      <footer>頁尾跨三欄</footer>
    </div>

    <h2>自動欄數，卡內再用 Flex</h2>
    <div class="cards">
      <article class="card">
        <h3>京都</h3>
        <p>一句介紹。</p>
        <a class="go" href="#kyoto">看行程</a>
      </article>
      <article class="card">
        <h3>大阪</h3>
        <p>介紹長一點時，連結仍貼著卡片底部。把視窗拉寬、拉窄，看欄數跟著變。</p>
        <a class="go" href="#osaka">看行程</a>
      </article>
      <article class="card">
        <h3>奈良</h3>
        <p>鹿。</p>
        <a class="go" href="#nara">看行程</a>
      </article>
    </div>

    <h2>格子裡對齊，軌道群置中</h2>
    <div class="align">
      <div class="cell">拉滿</div>
      <div class="cell pin">靠終點</div>
    </div>
    <p>兩欄各 6rem，justify-content: center 把整組移到中間。右下那格 place-self: end，只改自己。</p>
  </body>
</html>
```

{% note info %}
**小技巧：只看直接子元素**
骨架裡的 `main` 是一格。主文裡的標題與段落不會自動變成格子，除非你在 `main` 上再設一次 `display: grid` 或 `flex`。視窗窄到放不下 8rem 加 9rem 時，頁面骨架會橫向溢出；改成一欄是後面媒體查詢的事。F12 點 Grid 徽章，線應夾住導覽與側欄。
{% endnote %}

## 響應式、變數與動態

同一份 HTML 先在窄畫面讀得完，再依視窗改結構、把重複的色與間距收成代幣，並讓狀態變化有轉場與少量動畫。畫面和規則對不上時，用開發者工具看最終值。這一節四份檔都是完整 HTML。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/22-rwd.html`、`pages/23-vars.html`、`pages/24-motion.html`、`pages/25-inspect.html`。用 Live Server 開 `03-css/index.html`，再點選單換頁。

### RWD 與媒體查詢

響應式網頁（responsive web design，RWD）是同一份 HTML，依畫面寬度改排版。流動的部分前面已經有了：`max-width`、Flex 的 `wrap`、Grid 的 `auto-fit` 與 `minmax`。那些能自己換行、自己決定欄數。媒體查詢（media query）留給**結構要變**的時候：導覽從橫排改成直排、側欄挪到主文旁邊。下面這份 `rwd.html` 存檔後，把視窗慢慢拉寬就能看到斷點。見 [MDN：使用媒體查詢](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_media_queries/Using_media_queries)。

{% mermaid graph TD %}
B["預設：單欄、導覽橫排"] --> M["min-width: 32rem<br/>卡片改兩欄"]
M --> W["min-width: 48rem<br/>導覽變側欄"]
{% endmermaid %}

#### 流動版面先做完

先讓窄畫面就讀得完，再往寬的加規則。這份示範預設是一欄：頁首、導覽、行程、行前提示依原始碼由上到下。導覽用 Flex 橫向換行。卡片欄數放在 `--cols`，預設 `1fr`。圖片若之後加進來，仍給 `max-width: 100%`，避免比父層更寬。

能用 `repeat(auto-fit, minmax(12rem, 1fr))` 解決的卡片牆，不必再為每個寬度各寫一條查詢。上一章的卡片牆就是這種。查詢是欄數算法不夠用、或導覽與主文的**位置關係**要改時才加。

字級繼續用 `rem`。`4vw` 會在窄視窗小到不能讀。內文不要改跟視窗寬度跑。標題若要略為伸縮，用 `clamp(最小, 偏好, 最大)`，斷點不要拿來只改 1px 的字級。文件的 `<meta name="viewport" content="width=device-width, initial-scale=1.0">` 讓手機用裝置寬度當視窗。拿掉之後，手機常把整頁縮成一小條。

{% note info %}
**小技巧：斷點跟著內容**
把視窗慢慢拉寬，在「導覽擠成兩行」或「一行只剩一個字」的地方設斷點。手機 390、平板 768、桌機 1200 只是常見寬度的參考。查詢看的是視窗寬度，把桌機視窗拉窄就該看到窄版。
{% endnote %}

#### 斷點由窄到寬

`@media (min-width: 32rem)` 的意思是：視窗寬度**大於等於** 32rem 時，括號裡的規則才加入層疊。查詢裡的 `rem` 相對瀏覽器預設字級（通常 16px），不受你寫在 `html` 上的 `font-size` 影響。32rem 大約是 512px，48rem 大約是 768px。

| 視窗 | 頁首那句話 | 發生的事 |
| --- | --- | --- |
| 小於 32rem | 單欄，導覽橫排 | 只有預設樣式 |
| 32rem 以上 | 卡片兩欄 | `--cols` 改成 `1fr 1fr` |
| 48rem 以上 | 側欄版面 | 兩欄骨架，導覽改直向，行前區到右側 |

兩段 `min-width` 在寬視窗會**同時成立**。選擇器權重一樣時，寫在後面的那段蓋過前面。所以 48rem 那段的 `.now::after` 會蓋過 32rem 那段。斷點由小到大往下寫，寬畫面的規則放後面。

側欄用的是上一章的區域名字。窄畫面不要套這組名字，區塊就照原始碼堆疊。原始碼把 `<aside>` 放在主文後面，窄螢幕先讀行程、再讀行前。這個順序留給閱讀。不要為了讓側欄在手機上排到中間，就去改原始碼順序或使用 `order`。

`max-width` 是「小於等於」。桌面樣式先寫、再用 `max-width` 往回改，中間的寬度容易漏。課堂以 `min-width` 為主。兩個條件都要成立時用 `and`：`@media (min-width: 48rem) and (orientation: landscape)`。只要其中一個成立，用逗號：`@media (max-width: 32rem), print`。`screen`、`print`、`all` 是媒體類型。特性條件前面省略類型時，等於 `all`。`max-device-width` 是舊特性，新頁面用 `width`。

#### 列印與偏好

`@media print` 裡把導覽、斷點說明、行前欄設成 `display: none`，底色改白、字改黑。列印預覽按 <kbd>Ctrl</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>P</kbd>），看完關掉即可。依賴底色才能看懂的資訊，列印時要改成字或邊框。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/22-rwd.html`，用 Live Server 開 `03-css/index.html` 再點選單「列印與偏好」。

偏好類特性描述的是人，不是寬度。`prefers-color-scheme: dark` 在系統用深色外觀時成立，下一章只用它覆寫代幣。`prefers-reduced-motion: reduce` 在系統要求減少動態時成立，動畫那一章用它關掉循環。`hover: hover` 表示主要輸入可以懸停，`pointer: fine` 表示有滑鼠一類的細指標。這些查詢和寬度查詢一樣參加層疊。

{% note warning %}
**注意事項**
查詢看視窗，不看裝置型號。不要用使用者代理字串去猜手機。示範頁若嵌在別的頁面裡，視窗就是那個框的寬，不是整台螢幕的解析度。
{% endnote %}


```html rwd.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RWD</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :root {
        --cols: 1fr;
      }

      body {
        margin: 0;
        color: #134e4a;
        background: #f8fffe;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .layout {
        padding: 1rem;
      }

      header h1 {
        margin: 0;
        font-size: clamp(1.4rem, 1rem + 2vw, 2rem);
      }

      .now {
        margin: 0.25rem 0 0;
        color: #0f766e;
      }

      .now::after {
        content: "單欄，導覽橫排";
      }

      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0;
      }

      nav a {
        padding: 0.35rem 0.7rem;
        color: #f0fdfa;
        background: #0f766e;
        text-decoration: none;
      }

      .cards {
        display: grid;
        grid-template-columns: var(--cols);
        gap: 0.75rem;
      }

      .card,
      aside {
        padding: 0.75rem 1rem;
        background: #f0fdfa;
      }

      .card img {
        max-width: 100%;
        height: auto;
      }

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
          display: grid;
          grid-template-columns: 11rem minmax(0, 1fr);
          grid-template-areas:
            "head head"
            "nav main"
            "nav side";
          gap: 1rem;
          align-items: start;
        }

        header {
          grid-area: head;
        }

        nav {
          grid-area: nav;
          flex-direction: column;
          margin: 0;
        }

        main {
          grid-area: main;
        }

        aside {
          grid-area: side;
        }

        .now::after {
          content: "側欄版面";
        }
      }

      @media print {
        nav,
        aside,
        .now {
          display: none;
        }

        body {
          color: #000;
          background: #fff;
        }

        .card {
          border: 1px solid #000;
          background: #fff;
        }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <header>
        <h1>京都三日</h1>
        <p class="now">現在的版面：</p>
      </header>
      <nav>
        <a href="#tours">行程</a>
        <a href="#tips">行前</a>
        <a href="#book">報名</a>
      </nav>
      <main id="tours">
        <div class="cards">
          <article class="card">
            <h2>清水寺</h2>
            <p>清晨上山。窄畫面時這張卡獨佔一行。</p>
          </article>
          <article class="card">
            <h2>嵐山</h2>
            <p>渡月橋與竹林。32rem 以上與左卡並排。</p>
          </article>
        </div>
      </main>
      <aside id="tips">
        <h2>行前</h2>
        <p>48rem 以上這欄貼在右側。列印時整欄拿掉。</p>
      </aside>
    </div>
  </body>
</html>
```

{% note success %}
**跟著做**
存成 `rwd.html` 用 Live Server 打開。慢慢拉寬視窗，或按 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>）打開裝置工具列，選一顆手機寬度。頁首那句話應從「側欄版面」變成「單欄，導覽橫排」。再拉寬，確認句子與欄數一起變。接著 <kbd>Ctrl</kbd>+<kbd>P</kbd> 看列印預覽：導覽與行前欄不在紙上。
{% endnote %}

### CSS 變數

自訂屬性（custom properties）是你自己命名、可被繼承的 CSS 值，寫法是 `--名字: 值`，取用時寫 `var(--名字)`。前面選讀看過品牌色收成變數；這裡把色、間距、圓角收成一組代幣，改一處就整頁一起變。它們跟預處理器的變數不同：瀏覽器在套用樣式時才算出來，所以會參加繼承與覆寫。見 [MDN：使用 CSS 自訂屬性](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)。

{% mermaid graph TD %}
R[":root 的 --brand"] --> B["一般卡片繼承"]
R --> N[".night 再宣告一次 --brand"]
N --> C["這張卡與裡面的按鈕讀到新值"]
{% endmermaid %}

#### 宣告、繼承與備援

代幣放在 `:root`（HTML 文件裡就是 `html`）。`body` 的字色、底色、間距都寫 `var(--ink)` 這種名字。卡片底用 `--card`：系統改成深色時，這顆底與 `--ink` 一起換，淺色字才不會留在白卡片上。間距用 `--space-sm`、`--space-md`，圓角用 `--radius`。`calc(var(--space-md) * 1.5)` 可以拿代幣做算術。乘除時乘號兩側留空格。代幣裡若已經寫了單位（`1rem`），`calc()` 不要再加一次單位。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/23-vars.html`，用 Live Server 開 `03-css/index.html` 再點選單「宣告、繼承與備援」。

| 寫法 | 做什麼 |
| --- | --- |
| `--brand: #0f766e` | 宣告。名字區分大小寫，`--Brand` 是另一個 |
| `var(--brand)` | 取用。可以放進任何屬性值，也能放進 `calc()` |
| `var(--tag-bg, #ffedd5)` | 第二個引數是備援，只有變數**沒有定義**時才用 |
| `:root { }` | 全站代幣放這裡，子層都能繼承 |

自訂屬性會繼承。子元素沒有自己的 `--ink` 時，用的是祖先那一個。`.night` 在卡片上重新宣告 `--ink`、`--paper`、`--brand`，這張卡和裡面的連結讀到新值，外面的頁面不受影響。要做「這一個區塊換膚」，覆寫代幣比把每條 `color` 重寫一遍短。

`var(--tag-bg, #ffedd5)` 的備援只在「這個名字完全沒被宣告」時出現。變數有宣告、但值是空的或型別不合，備援**不會**上場。名字用用途，例如 `--ink`、`--space-md`。`--blue` 這種名字在換膚時會說謊：深色模式下那顆「藍」可能已經不是藍。

自訂屬性存的是一串符號，瀏覽器先不檢查它是不是顏色或長度。等到放進某個屬性才檢查。下面 `.bad` 寫了兩次 `color`：先是玫瑰紅，再是 `var(--space-md)`。`--space-md` 有定義，所以備援用不上；它的值是 `1rem`，不能當顏色。層疊已經選了第二條，計算時這條作廢，字色改走繼承，也就是 `body` 的 `--ink`。同一條規則裡寫在前面的玫瑰紅不會回來。

系統偏好深色時，`@media (prefers-color-scheme: dark)` 只覆寫 `:root` 的代幣，元件不用各寫一套深色規則。淺色系統的課堂電腦看不出這段，開發者工具那一章可以用面板模擬。

{% note warning %}
**注意事項**
`var()` 只能當值，不能當屬性名稱。`var(--which): 1rem` 整條無效。也不要把整條規則放進變數裡。長度與顏色不要共用一個名字。
{% endnote %}

{% note info %}
**小技巧：之後用腳本改同一顆名字**
JavaScript 那天可以寫 `element.style.setProperty("--brand", "#9f1239")`。今天先只在樣式表裡改。重新整理後，面板裡的實驗不會留在檔案裡。
{% endnote %}


```html vars.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 變數</title>
    <style>
      :root {
        --ink: #134e4a;
        --paper: #f8fffe;
        --card: #f0fdfa;
        --brand: #0f766e;
        --brand-ink: #f0fdfa;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --radius: 0.75rem;
      }

      body {
        margin: var(--space-md);
        color: var(--ink);
        background: var(--paper);
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .swatches {
        display: flex;
        gap: var(--space-sm);
      }

      .swatches span {
        width: 4rem;
        height: 2.5rem;
        border-radius: var(--radius);
      }

      .brand {
        background: var(--brand);
      }

      .ink {
        background: var(--ink);
      }

      .paper {
        background: var(--card);
        border: 1px solid var(--brand);
      }

      .card {
        max-width: 24rem;
        margin-top: var(--space-md);
        padding: calc(var(--space-md) * 1.5);
        color: var(--ink);
        background: var(--card);
        border-radius: var(--radius);
      }

      .card a {
        display: inline-block;
        margin-top: var(--space-sm);
        padding: 0.35rem 0.8rem;
        color: var(--brand-ink);
        background: var(--brand);
        border-radius: var(--radius);
        text-decoration: none;
      }

      .tag {
        display: inline-block;
        padding: 0.1rem 0.45rem;
        background: var(--tag-bg, #ffedd5);
        border-radius: var(--radius);
      }

      .night {
        --ink: #ffedd5;
        --card: #431407;
        --brand: #fdba74;
        --brand-ink: #431407;
      }

      .bad {
        color: #9f1239;
        color: var(--space-md);
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --ink: #f0fdfa;
          --paper: #042f2e;
          --card: #134e4a;
          --brand: #5eead4;
          --brand-ink: #042f2e;
        }
      }
    </style>
  </head>
  <body>
    <h1>代幣改一處，整頁跟著換</h1>
    <div class="swatches">
      <span class="brand"></span>
      <span class="ink"></span>
      <span class="paper"></span>
    </div>
    <article class="card">
      <h2>清水寺 <span class="tag">清晨</span></h2>
      <p>按鈕與字色都讀 :root。杏色標籤用的是備援，因為 --tag-bg 沒有宣告。</p>
      <a href="#book">報名</a>
    </article>
    <article class="card night">
      <h2>夜訪</h2>
      <p>這張覆寫了 --ink 與 --brand，外面的色塊不受影響。</p>
      <a href="#book">夜場</a>
    </article>
    <p class="bad">這段後一次 color 是長度，不能當顏色，所以回到繼承的字色。</p>
  </body>
</html>
```

{% note success %}
**跟著做**
打開 `vars.html`，按 <kbd>F12</kbd> 選中 `<html>`，在 **Styles** 把 `--brand` 改成 `#9f1239`。色塊與第一張卡的按鈕應一起變，夜卡的按鈕仍是杏色，因為它自己又宣告了 `--brand`。點 `.bad`，**Computed** 的 `color` 應是繼承來的深青綠，不是玫瑰紅。
{% endnote %}

### 轉場與動畫

變形（transform）改的是元素畫出來的位置、大小、角度，排版位子不動。轉場（transition）在兩個狀態之間補間，例如移入與移出。動畫（animation）用關鍵影格自己播，可以循環。要動的優先是 `transform` 與 `opacity`。用 `top`、`left`、`width` 做每幀位移，容易拖慢版面計算。下面一份 `motion.html` 把三件事放在同一頁。見 [MDN：使用 CSS 轉場](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)。

{% mermaid graph LR %}
T["transform<br/>改畫面，不改佔位"] --> Tr["transition<br/>有人觸發才從 A 到 B"]
T --> A["animation<br/>依 keyframes 自己播"]
{% endmermaid %}

| | 轉場 | 動畫 |
| --- | --- | --- |
| 何時動 | 屬性值變了才動，例如 `:hover`、`:focus-visible` | 套上就播，不必等指標 |
| 狀態 | 起點與終點兩個 | `@keyframes` 可多段 |
| 循環 | 不會自己循環 | `infinite` 或指定次數 |
| 這一頁 | 按鈕變色、卡片抬起、四條曲線 | 熱賣縮放、載入圓環、進場一次 |

#### 變形不推動鄰居

`transform` 接受一串函式，函式之間用空格分開。每一格的虛線框是排版位子：方塊 `translate` 出去、`scale` 變大、`rotate` 轉開，虛線框的寬高與格子之間的 `gap` 都不變。旁邊的文字不會被推開。真的要佔更大的位子，改寬高或 `margin`。

| 函式 | 效果 | 這一頁的值 |
| --- | --- | --- |
| `translate(x, y)` | 平移。百分比相對**自己**的寬高 | `translate(1rem, 0.4rem)` |
| `scale(n)` | 縮放。`1` 是原寸 | `scale(1.15)` |
| `rotate(角度)` | 旋轉。單位用 `deg` | `rotate(18deg)` |
| `skewX`／`skewY` | 傾斜。按鈕與卡片很少需要 | 這頁沒有用 |

`transform-origin` 是旋轉與縮放的基準點，預設是中心。`.hinge` 把原點放在 `left bottom`，方塊像以左下角為軸轉開。同一條 `transform` 裡，**右邊的函式先套用**。`.combo` 寫的是 `translateX(0.4rem) rotate(12deg)`，所以先轉 12 度，再沿水平方向平移。把兩個函式對調，平移的方向會跟著已旋轉的軸走。`matrix()` 是把平移、縮放、旋轉壓成六個數字，給工具產生即可。立體翻面放在選讀。廠商前綴不用加。

抬起的卡片另外用了獨立屬性 `rotate` 與 `translate`，沒有寫進 `transform` 那一條。獨立屬性互不覆蓋：移入只改 `translate`，原本的 `rotate: -1deg` 還在。若把角度與位移都塞進同一個 `transform`，移入那一條必須把 `rotate` 再寫一次，否則角度會被清掉。`translate`、`rotate`、`scale` 的套用順序固定，與你在規則裡書寫的先後無關。

{% note warning %}
**注意事項**
變形後的元素仍佔原來的位子，點擊範圍以變形後的畫面為準。祖先若有 `transform`，子孫的 `position: fixed` 會改以那個祖先為視窗。卡片要加 `transform` 時，不要把全站的固定頁首包在同一層裡面。
{% endnote %}

#### 轉場連接兩個狀態

有人讓某個屬性從舊值變成新值時，`transition` 把中間的畫面補上。沒有寫進 `transition` 的屬性會瞬間切換。簡寫的順序是：屬性、持續時間、速度曲線、延遲。前兩個最常寫。

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
| `cubic-bezier()` | 用四個數字自訂曲線 |

四條軌道的位移距離與 800ms 相同，只有曲線不同。指標移入軌道，圓點一起出發。介面回饋用 150～300ms 就夠；長過半秒會像在等它。

`:hover` 只描述指標移入。觸控螢幕常常沒有「移出」，效果會卡住。這頁把移入規則包在 `@media (hover: hover) and (pointer: fine)` 裡：有滑鼠一類的細指標時才抬起。鍵盤改看 `:focus-visible`，按鈕用 `outline`。

{% note info %}
**小技巧：不要寫 all**
`transition: all 300ms` 會把之後加上的任何屬性都補間，包含你沒打算動的顏色或尺寸。逐條寫出 `background-color`、`translate`、`opacity`、`box-shadow`。
{% endnote %}

#### 動畫自己播放

轉場需要一個新值才會動。動畫用 `@keyframes` 寫腳本，元素一套上 `animation` 就播。這一頁有三個：熱賣標籤循環縮放、載入圓環一直轉、行程卡進場一次。關鍵影格的名字自己取，跟 class 無關。`from` 等於 `0%`，`to` 等於 `100%`。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/24-motion.html`，用 Live Server 開 `03-css/index.html` 再點選單「動畫自己播放」。

套到元素上時，持續時間必須寫，否則預設是 `0s`，你看不見過程。簡寫裡第一個時間仍是持續時間，第二個時間才是延遲。

| 屬性 | 這一頁怎麼用 |
| --- | --- |
| `animation-name` | `pulse`、`spin`、`enter`，要和 `@keyframes` 同名 |
| `animation-duration` | 圓環 `0.7s`，進場 `0.7s`，標籤 `1.6s` |
| `animation-timing-function` | 標籤 `ease-in-out`，圓環 `linear` |
| `animation-iteration-count` | 標籤與圓環是 `infinite`，進場省略就是 `1` 次 |
| `animation-fill-mode` | 進場用 `both`：延遲期間先套第一格，結束停在最後一格 |
| `animation-play-state` | 指標停在圓環上時設 `paused` |

熱賣那條的簡寫是 `animation: pulse 1.6s ease-in-out infinite`。`fill-mode: both` 讓卡片在動畫開始前就是透明並稍微下移，結束後留在不透明的位置。預設 `none` 會在播完的瞬間跳回元素自己的樣式。`@keyframes spin` 只寫了終點的 `rotate(360deg)`，起點用元素當下的角度。圓環用邊框顏色做出缺口；`role="img"` 與 `aria-label` 讓它有名字。純裝飾的動畫不要拿去傳達「必讀」的訊息。

系統開啟「減少動態」時，`@media (prefers-reduced-motion: reduce)` 把這三個 `animation` 設成 `none`。循環的縮放與旋轉最應該讓步。開發者工具可以模擬這個偏好，不用改作業系統。

{% note warning %}
**注意事項**
無限循環的大面積動畫很耗電，也會讓人忽略真正要點的按鈕。一個狀態用一兩個小元素即可。不要為了據說能加速繪製，就加上廠商前綴。
{% endnote %}


```html motion.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>轉場與動畫</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h2 {
        margin: 1.75rem 0 0.4rem;
        font-size: 1.1rem;
      }

      .slots,
      .tracks {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .slot {
        width: 6.5rem;
        height: 5rem;
        border: 1px dashed #0f766e;
      }

      .box {
        width: 4rem;
        height: 3rem;
        background: #0f766e;
        color: #f0fdfa;
        font-size: 0.85rem;
      }

      .move {
        transform: translate(1rem, 0.4rem);
      }

      .big {
        transform: scale(1.15);
      }

      .turn {
        transform: rotate(18deg);
      }

      .hinge {
        transform: rotate(18deg);
        transform-origin: left bottom;
      }

      .combo {
        transform: translateX(0.4rem) rotate(12deg);
      }

      .go {
        padding: 0.5rem 1rem;
        color: #f0fdfa;
        background: #0f766e;
        border: 0;
        border-radius: 0.4rem;
        transition: background-color 200ms ease, translate 200ms ease;
      }

      .go:focus-visible {
        outline: 2px solid #0f766e;
        outline-offset: 3px;
      }

      .lift {
        max-width: 18rem;
        margin-top: 0.75rem;
        padding: 0.75rem 1rem;
        background: #f0fdfa;
        border-radius: 0.75rem;
        rotate: -1deg;
        transition: translate 200ms ease, box-shadow 200ms ease;
      }

      .track {
        width: 16rem;
        padding: 0.35rem 0;
      }

      .dot {
        width: 0.9rem;
        height: 0.9rem;
        background: #0f766e;
        border-radius: 50%;
        transition: translate 800ms ease;
      }

      .linear {
        transition-timing-function: linear;
      }

      .ease-in {
        transition-timing-function: ease-in;
      }

      .ease-out {
        transition-timing-function: ease-out;
      }

      @media (hover: hover) and (pointer: fine) {
        .go:hover {
          background: #115e59;
          translate: 0 -2px;
        }

        .lift:hover {
          translate: 0 -0.35rem;
          box-shadow: 0 0.6rem 1rem rgb(15 118 110 / 0.2);
        }

        .track:hover .dot {
          translate: 12rem 0;
        }

        .spin:hover {
          animation-play-state: paused;
        }
      }

      .hot {
        display: inline-block;
        margin-right: 0.5rem;
        padding: 0.15rem 0.5rem;
        color: #fff7ed;
        background: #c2410c;
        border-radius: 999px;
        animation: pulse 1.6s ease-in-out infinite;
      }

      .spin {
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        vertical-align: middle;
        border: 3px solid #99f6e4;
        border-top-color: #0f766e;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }

      .enter {
        max-width: 18rem;
        margin-top: 0.75rem;
        padding: 0.75rem 1rem;
        background: #f0fdfa;
        animation: enter 0.7s ease both;
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
          translate: 0 0.75rem;
        }

        to {
          opacity: 1;
          translate: 0 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hot,
        .spin,
        .enter {
          animation: none;
        }
      }
    </style>
  </head>
  <body>
    <h1>變形、轉場、動畫</h1>
    <h2>變形：虛線是佔位</h2>
    <div class="slots">
      <div class="slot"><div class="box move">平移</div></div>
      <div class="slot"><div class="box big">放大</div></div>
      <div class="slot"><div class="box turn">旋轉</div></div>
      <div class="slot"><div class="box hinge">左下</div></div>
      <div class="slot"><div class="box combo">先轉再移</div></div>
    </div>
    <h2>轉場：移入才走</h2>
    <button class="go" type="button">報名</button>
    <article class="lift">
      <h3>嵐山午後</h3>
      <p>這張卡一直斜 1 度。移入只改 translate，角度還在。</p>
    </article>
    <div class="tracks">
      <div class="track">ease<div class="dot"></div></div>
      <div class="track">linear<div class="dot linear"></div></div>
      <div class="track">ease-in<div class="dot ease-in"></div></div>
      <div class="track">ease-out<div class="dot ease-out"></div></div>
    </div>
    <h2>動畫：自己播</h2>
    <p><span class="hot">熱賣</span><span class="spin" role="img" aria-label="載入中"></span></p>
    <article class="enter">
      <h3>伏見稻荷</h3>
      <p>進場一次。重新整理再看。系統若要求減少動態，這三個都會停住。</p>
    </article>
  </body>
</html>
```

### 用開發者工具除錯

樣式沒有出現時，先分清楚是選錯節點、規則沒打中、被另一條蓋過，還是值本身無效。Chrome 按 <kbd>F12</kbd>，主畫面用 **Elements**。下面的 `inspect.html` 故意留了劃掉的宣告、拼錯的屬性，以及贏過 class 的 id，三節都對這一張票，也回頭看 `vars.html`、`motion.html`、`rwd.html`。

{% note primary %}
**素材準備**
面板名稱以 Chrome 英文介面為準：**Elements**、**Styles**、**Computed**、**Layout**。改動只活在這一次重新整理之前。確定之後再寫回檔案。
{% endnote %}

#### Styles 與 Computed

選中 `<article id="featured" class="ticket">`。**Styles** 列出打到它的規則，上面的蓋過下面的。

| 你看到的 | 原因 |
| --- | --- |
| `.ticket` 裡第一個 `color: #94a3b8` 有刪除線 | 同規則後面又寫了 `color` |
| `colour: red` 旁邊有警告、被劃掉 | 屬性名稱拼錯，整條宣告丟掉 |
| `#featured { color: #9f1239 }` 沒有刪除線 | id 欄比 class 欄重，字色是玫瑰紅 |
| `background: var(--paper)` 可展開變數 | 代幣定義在 `:root` |

**Computed** 是算完層疊、繼承、變數之後的最終值。點 `color`，右側會寫這個值從哪一條規則來。`vars.html` 的 `.bad` 要在這裡看：最終字色是繼承來的，不是 `1rem`。

使用者代理樣式（user agent stylesheet）是瀏覽器預設表。票卡上的標題若比內文粗，而你沒寫 `font-weight`，Computed 會指向這一層。它比你的作者樣式弱。

{% note success %}
**跟著做**
在 **Styles** 取消勾選 `#featured` 的 `color`。票卡字色應落到 `var(--ink)` 的深青綠。勾回去，玫瑰紅回來。接著點 `var(--ink)`，確認它跳到 `:root`。
{% endnote %}

#### 盒子、狀態與斷點

選中 `.ticket` 時，**Styles** 下方（或 **Computed** 裡）有盒子圖：content、padding、border、margin。這頁是 `border-box`，圖上的寬度 18rem 已經含左右 padding 與左右邊框。margin 是圖最外圈，它在元素外面，不占那 18rem。

**Styles** 面板的 **:hov** 可以強制狀態，不必真的把指標放上去。勾 `:hover` 看 `motion.html` 的按鈕，勾 `:focus-visible` 看外框。`:hover` 規則若寫在 `@media (hover: hover)` 裡面，而這台裝置的查詢不成立，光勾 :hov 也不會套用；桌機滑鼠通常成立。`:hov` 只影響你選的那個節點。

要改整份文件的媒體特性，打開命令選單：<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>），輸入 `Rendering`，選 **Show Rendering**。在裡面可以：

- **Emulate CSS media feature prefers-color-scheme** 設成 `dark`，再看 `vars.html` 的代幣
- **Emulate CSS media feature prefers-reduced-motion** 設成 `reduce`，`motion.html` 的縮放與圓環應停住

測完改回 No emulation，避免下一頁被忘了的模擬騙過。裝置工具列（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>）改的是視窗寬高，用來走 `rwd.html` 的斷點。不確定時看頁首那句話，它跟查詢是同一組條件。Flex 與 Grid 的徽章在上一章用過：節點旁的 **flex** 或 **grid** 會畫出主軸或格線。

#### 動畫面板

命令選單輸入 `Animations`，選 **Show Animations**。打開之後再重新整理 `motion.html`，進場與循環會出現在時間軸上。把時間軸上的圓點拖慢，可以看出 `pulse` 在 50% 放到最大。圓環是無限次，軸上會重複。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/25-inspect.html`，用 Live Server 開 `03-css/index.html` 再點選單「動畫面板」。

這個面板用來確認「有沒有在播」。預覽完把模擬與慢動作清掉再重新整理。**Network** 負責檔案沒載入；**Console** 在純 CSS 這一天通常是安靜的，拼錯的屬性不會在那裡報錯，只會出現在 **Styles**。

{% note warning %}
**注意事項**
在面板裡改規則不會寫回磁碟。Live Server 重新整理後，實驗就沒了。要留的修改寫進 `<style>`。
{% endnote %}


```html inspect.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>對樣式</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :root {
        --ink: #134e4a;
        --paper: #f0fdfa;
      }

      body {
        margin: 1.5rem;
        color: var(--ink);
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .ticket {
        width: 18rem;
        margin: 1.5rem 0;
        padding: 1rem;
        color: #94a3b8;
        colour: red;
        color: var(--ink);
        background: var(--paper);
        border: 2px solid #0f766e;
      }

      #featured {
        color: #9f1239;
      }

      .price {
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <h1>這一張票用來對面板</h1>
    <p>
      選中下面的 article。Styles 裡應看到被劃掉的灰色 color、無效的 colour，以及贏過 class 的 id 顏色。盒子圖的寬度含 padding 與邊框。
    </p>
    <article id="featured" class="ticket">
      <h2>京都一日</h2>
      <p>含清水寺與嵐山。id 的字色蓋過 class。</p>
      <p class="price">NT$ 2,400</p>
    </article>
  </body>
</html>
```

## 選讀：邊界與進階動效

這一節可以整節跳過。外距穿出、邏輯方向、float 繞排、立體翻面、容器查詢，以及把顏色代幣註冊成可補間，都是前面示範的延伸。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/26-float.html`、`pages/27-flip.html`、`pages/28-read-extra.html`。用 Live Server 開 `03-css/index.html`，再點選單換頁。

### 外距穿出與邏輯方向

子層外距有時會穿出父層，書寫方向也有另一套屬性名稱。見 [MDN：邏輯屬性與邏輯值](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_logical_properties_and_values)。

#### 外距穿出

子層的 `margin-top` 穿出父層時，父層設 `display: flow-root`，它會成為新的區塊格式化情境，垂直 margin 不再合併，背景包得住。加一點 `padding-top` 或一條透明 `border-top` 也能擋。

#### 邏輯方向

介面要同時應付由左至右與由右至左時，改寫邏輯屬性：`margin-inline` 是行內方向的兩側，`margin-block` 是區塊方向。`padding`、`border`、`inset` 也有同一套。`inset: 0.6rem 0.6rem auto auto` 等於 `top` 與 `right` 是 `0.6rem`。課堂範本仍寫四個物理方向，讀得到邏輯屬性即可。

#### 層疊情境與多行省略

`opacity` 小於 1、`transform`／`filter`／`perspective` 不是 `none`、`isolation: isolate`，也會讓該元素成為新的層疊情境，子孫的 `z-index` 出不去。祖先有 `transform` 時，子孫的 `fixed` 不再相對視窗，而相對那個祖先。對話框若一定要跟著視窗，不要放進留著 `transform` 的卡片裡。

`overflow: clip` 一樣裁切，但這一層不變成滾動盒，子孫的 `sticky` 比較不容易被打斷。多行省略仍常見這組寫法：`display: -webkit-box`、`-webkit-box-orient: vertical`、`-webkit-line-clamp: 2`、`overflow: hidden`。標準的 `line-clamp` 正在普及。這組前綴只用於「兩行以後省略」，其他屬性不要再加廠商前綴。

### float 只留繞排

`float` 讓後面的文字沿著圖走，不是拿來切多欄的。見 [MDN：float](https://developer.mozilla.org/zh-TW/docs/Web/CSS/float)。

#### 繞排與父層高度

`float: left` 把元素撥到這一行的左側，後面的文字沿著它的右邊走。這仍是圖旁配一段說明的寫法。它會讓元素脫離一般區塊的高度計算，短文時父層背景可能包不住圖。父層加上 `display: flow-root` 即可。舊碼常見 `::after { content: ""; display: block; clear: both; }`，作用同樣是把父層撐開，讀到時改成 `flow-root`。

#### 不要拿來做多欄

多欄不要再用 `float: left` 配百分比寬度。同一件事是 Grid 的 `repeat(3, minmax(0, 1fr))` 加 `gap`。Flex 與 Grid 也不必再寫 `-webkit-` 前綴。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/26-float.html`，用 Live Server 開 `03-css/index.html` 再點選單「不要拿來做多欄（選讀）」。

`inline-flex` 與 `inline-grid` 讓容器坐在文字行裡，裡面仍是 Flex 或 Grid。`grid-auto-flow: dense` 會回填跨格留下的洞，視覺順序會和原始碼不同。`subgrid` 讓子層沿用父層的欄線，卡片標題要跨卡對齊時再查。`display: contents` 會讓元素自己的盒子消失，也影響無障礙樹，課堂不要用來少包一層。

下面這份同時看圖旁繞排，以及兩行以後省略。


```html float.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：繞排與裁切</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .story {
        display: flow-root;
        max-width: 28rem;
        margin-bottom: 1rem;
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

      .blurb {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        max-width: 28rem;
      }
    </style>
  </head>
  <body>
    <div class="story">
      <div class="shot">清水寺</div>
      <p>圖在左側，說明沿著右邊往下排。父層的 flow-root 讓淺青底包得住這張圖。拿掉 flow-root，短文時底色會變矮。</p>
    </div>
    <p class="blurb">
      這段超過兩行就省略。第一行介紹二年坂，第二行接到三年坂與八坂之塔，後面的行程明細不會再露出來。
    </p>
  </body>
</html>
```

### 立體翻面

平面旋轉看不出厚度。翻面要視距、Y 軸，以及把背面藏起來。見 [MDN：perspective](https://developer.mozilla.org/zh-TW/docs/Web/CSS/perspective)。

#### 視距與背面

平面的 `rotate` 看不出厚度。要翻面，父層給一個視距 `perspective`，卡片轉 Y 軸，背面用 `backface-visibility: hidden` 藏起來。正面與背面疊在同一個格子。`transform-style: preserve-3d` 讓子元素留在同一個 3D 空間，翻過去才看得到背面。背面先轉 180 度，父層再轉 180 度時它才正對你。`tabindex="0"` 讓鍵盤也能聚焦，`:focus-within` 跟 `:hover` 做同一件事。背面的文字若是必要資訊，不要只放在翻面之後。平面位移也不要加 `translateZ(0)` 來「加速」。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/27-flip.html`，用 Live Server 開 `03-css/index.html` 再點選單「視距與背面（選讀）」。


```html flip.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：翻面</title>
    <style>
      body {
        margin: 2rem;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
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

### 容器查詢

媒體查詢看的是視窗。卡片要不要改排，有時該看它所在容器的寬度。見 [MDN：CSS 容器查詢](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_containment/Container_queries)。

#### 依容器寬度改排版

媒體查詢看視窗。同一張卡片放在窄側欄與寬主文時，視窗寬度相同，卡片該不該橫排卻不該相同。容器查詢（container query）看的是祖先的寬度。`container-type: inline-size` 把這一層標成查詢容器。`@container` 裡的規則看這個容器的內容寬度。全站的頁首、側欄仍用視窗查詢。一頁有多個容器時再加 `container-name`，避免查到外面那層。窄欄與寬欄的對照在下一節的 `read-extra.html`。

#### 動態視窗高度

`100vh` 在手機上常把網址列也算進去，區塊會比可見區域高一截。需要跟「此刻看得到的高度」走時，用 `100dvh`（dynamic viewport）。頁首固定、主文至少一屏這種需求才用得到，一般區塊繼續讓內容把高度撐開。

### 把變數註冊成可補間

沒有註冊的自訂屬性只是一串符號，顏色切換不會補間。`@property` 用來聲明它的語法。見 [MDN：@property](https://developer.mozilla.org/zh-TW/docs/Web/CSS/@property)。

#### 語法與初始值

一般的自訂屬性是一串符號。你寫 `transition: --brand 300ms` 時，瀏覽器不知道它是顏色，切換會瞬間跳過去。要讓顏色代幣可以補間，用 `@property` 註冊語法、繼承與初始值。`syntax` 寫錯時，整組註冊無效。`initial-value` 在語法要求下一定要有。沒有註冊之前，仍直接轉場 `background-color`，像 `motion.html` 那樣。全站代幣用覆寫 `--brand` 就夠。下面這份把容器查詢與 `@property` 放在同一頁，方便對照。

練習檔：`studiesAdvanced/01-html-css-js/03-css/pages/28-read-extra.html`，用 Live Server 開 `03-css/index.html` 再點選單「語法與初始值（選讀）」。


```html read-extra.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：容器與可補間變數</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .board {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: start;
      }

      .slot {
        container-type: inline-size;
        padding: 0.5rem;
        background: #f0fdfa;
      }

      .narrow {
        width: 14rem;
      }

      .wide {
        width: 28rem;
      }

      .card {
        display: grid;
        gap: 0.5rem;
      }

      .photo {
        min-height: 4rem;
        background: #0f766e;
      }

      @container (min-width: 22rem) {
        .card {
          grid-template-columns: 6rem 1fr;
        }
      }

      @property --brand {
        syntax: "<color>";
        inherits: true;
        initial-value: #0f766e;
      }

      .go {
        margin-top: 1rem;
        padding: 0.45rem 0.9rem;
        color: #f0fdfa;
        background: var(--brand);
        border: 0;
        border-radius: 0.4rem;
        transition: --brand 300ms ease;
      }

      .theme:hover .go,
      .theme:focus-within .go {
        --brand: #9f1239;
      }
    </style>
  </head>
  <body>
    <div class="board">
      <div class="slot narrow">
        <article class="card">
          <div class="photo"></div>
          <p>這格 14rem，低於 22rem，圖在上。</p>
        </article>
      </div>
      <div class="slot wide">
        <article class="card">
          <div class="photo"></div>
          <p>這格 28rem，容器查詢成立，圖改到左側。兩格的視窗寬度相同。</p>
        </article>
      </div>
    </div>
    <div class="theme">
      <button class="go" type="button">指標移入，品牌色補間</button>
    </div>
  </body>
</html>
```

## 本篇重點回顧

下面只收這篇用過的觀念。

### 選擇器到欄位

誰被選到、字與底怎麼畫、盒子佔多大，決定之後才談一個方向或欄與列。

#### 從選擇器到 Grid

選擇器、權重與繼承決定規則打到誰。單位、顏色、文字與背景決定字與底怎麼畫。盒子、`display`、定位與 `z-index` 決定佔多大、跟誰比座標。Flex 排一個方向，Grid 排欄與列。

### 媒體查詢與代幣

窄畫面先能讀，結構要變才寫查詢；重複的色與間距收成會繼承的代幣。

#### 流動與斷點

同一份 HTML 先做流動版面：換行、`fr`、`minmax`、`max-width: 100%`。媒體查詢只改結構。以窄畫面為預設，`min-width` 由小到大往下寫，同時成立時後面蓋過前面。查詢看視窗。`print` 拿掉導覽並改成白底黑字。`clamp()` 用來讓標題在最小與最大之間伸縮。

#### 自訂屬性

自訂屬性以 `--` 宣告、用 `var()` 取用，會繼承。全站代幣放在 `:root`，區塊要換膚就在該元素覆寫同名變數。`var(--name, 備援)` 只在名字沒定義時使用。變數的值型別不合時，那條宣告在計算階段作廢，可繼承的屬性改走繼承，不會退回同一條規則裡前一個色碼。`prefers-color-scheme` 只換代幣。

### 轉場、動畫與除錯

變形不改佔位，轉場連接兩個狀態，動畫自己播。對不上時看開發者工具的最終值。

#### 變形、轉場與關鍵影格

`transform` 不改變排版佔位。常用函式是 `translate`、`scale`、`rotate`，原點用 `transform-origin`。同一條裡右邊的函式先套用。只補間位移時可用獨立屬性 `translate`，避免把 `rotate` 清掉。`transition` 連接兩個狀態，簡寫是屬性、時間、曲線、延遲。逐條列出要動的屬性。懸停效果包在 `(hover: hover) and (pointer: fine)`，鍵盤用 `:focus-visible`。`@keyframes` 加上 `animation` 才會自己播；沒寫持續時間就等於 0 秒。循環用 `infinite`，結束要停在最後一格用 `forwards` 或 `both`。`prefers-reduced-motion: reduce` 時把裝飾動畫關掉。

#### 面板上的最終值

除錯用 Chrome 的 **Elements**。**Styles** 看刪除線與無效宣告，**Computed** 看最終值，盒子圖對 padding 與 border。`:hov` 強制懸停與焦點，**Rendering** 模擬深色與減少動態，裝置工具列走斷點。**Animations** 看關鍵影格有沒有在播。面板裡的修改重新整理就沒了。float 多欄與廠商前綴、立體翻面、容器查詢與 `@property` 在上一節。對得上的時候，畫面與 **Styles** 的最終值是同一件事。
