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

CSS（Cascading Style Sheets，層疊樣式表）決定頁面長什麼樣子：顏色、字級、背景、盒子與欄位。HTML 負責「這一頁有什麼」，CSS 負責「那些東西怎麼呈現」。每一小節先講這個屬性拿來做什麼，再給**一份完整 HTML**（樣式寫在 `<style>`）。把程式碼存成 `.html`，用 Chrome 或 Live Server 打開就能看到效果。

<!-- more -->

預覽與除錯以 Chrome 為準，按 <kbd>F12</kbd> 看 **Elements → Styles**。其餘取值、簡寫與語法變化，其他值請問 AI 並以 MDN 查證。

{% note primary %}
**素材準備**
每一份示範都是完整文件。在 `student/practice/css/` 新建一個檔（檔名可自訂），貼上該節的程式碼，存檔後用 Live Server 開。改完要重新整理。Styles 裡被劃掉的宣告代表沒有用上。
{% endnote %}

## 搭配免費 AI 學習

細節不要背表。用 [Google NotebookLM](https://notebooklm.google.com/)（免費，Google 帳號）把這篇和 MDN 收成可以引用來源的筆記；選擇器怎麼打中、畫面為什麼不對，交給免費聊天室或編輯器裡的 Copilot。講義與 <kbd>F12</kbd> 仍是最後依據。

每一大章各建一個筆記本（規則怎麼套上元素、字色與背景、盒子與欄位排版、響應式變數與動態、選讀）。來源放這篇網址 `http://summer10920.github.io/2026/08-30/lokiTech-15day-03-css/`，再加入該章對到的 MDN 頁（從 [CSS](https://developer.mozilla.org/zh-TW/docs/Web/CSS) 點進去即可）。問的時候要它**引用來源**；答得出來的句子，用「儲存成筆記」收進你的 **AI 筆記**。下面「用 AI 練習」是給這個筆記本的短問題。

NotebookLM **不負責寫程式、也不負責除錯**。要它改檔、補宣告、看版面為什麼散掉，改開 ChatGPT、Gemini、Claude 或 Grok 的免費額度：貼一小段、寫明繁體中文、不要整份重寫。VS Code 若已登入 GitHub，可用 **GitHub Copilot Free** 的行內補完；灰字先讀再按 <kbd>Tab</kbd>。補完只負責接著打屬性，不負責判斷權重與單位對不對。

模型會**幻覺（hallucination）**：屬性名、已經少用的寫法、權重算法都可能說得很像真的。和講義或 MDN 衝突時，以 MDN 與你在 Chrome 看到的為準，再改檔。

{% note warning %}
**先對再信**
聊天室貼回的整段 CSS、Copilot 的灰字，都先存檔用 Live Server 打開，再用 F12 看 Styles 與 Computed。對不上就不要整段覆蓋練習檔。
{% endnote %}

{% note primary %}
**整理成你的 AI 筆記**
五個筆記本都建好、來源都加完之後，各存一則筆記：「這章我只問講義與 MDN 裡有的句子；改檔改去聊天室或 Copilot。」
{% endnote %}

## 規則怎麼套上元素

樣式表是一組規則：先選到元素，再寫要改的屬性。很多條搶同一個屬性時，靠權重與層疊決定留下哪一條；沒有人寫的屬性，才談繼承。宣告怎麼寫見 [MDN：CSS 語法](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_syntax/Syntax)，誰贏見 [MDN：權重](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascade/Specificity)，沒寫時見 [MDN：繼承](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascade/Inheritance)。

### 觀念與引入

瀏覽器先解析 HTML、建立 DOM，再把 CSS 規則套到對得上的元素，最後才排版與繪製。你改的是規則文字，不是在畫面上直接塗色。重新整理之後，瀏覽器會再跑一次這段流程。

#### 規則的零件

一條規則分成「選到誰」和「設什麼」。大括號裡可以有多個宣告，每個宣告以分號結尾。同一條規則裡同一個屬性寫兩次，**原始碼較後面的那次**留下。屬性名稱拼錯時，瀏覽器丟掉**那一個宣告**，同一條規則的其他宣告仍然有效。

選擇器決定打到誰，屬性決定改哪一面，值決定改成什麼。逗號是分組：`h1, h2` 共用同一組宣告，權重不會因為逗號加總。註解寫 `/* 說明 */`。`<!-- -->` 是 HTML 註解，放進 CSS 不會被當成註解。

#### 三種寫法

CSS 可以寫在標籤的 `style` 屬性（行內）、寫在該頁 `<head>` 的 `<style>`（頁內）、或寫成獨立的 `.css` 再用 `<link rel="stylesheet">` 掛上（外部）。課堂示範用頁內，是為了貼上一份檔就能開。專題與多頁網站用外部檔：顏色集中在一處，瀏覽器也可以快取。`href` 相對**這份 HTML**；寫錯時 Network 會看到 404，Styles 裡則完全沒有你的規則。

行內樣式的權重高過樣式表裡的一般宣告，`style` 屬性裡只能寫宣告。`@import` 必須寫在 CSS 最前面，也比 `link` 更晚才開始下載。課堂用 `link`。其他寫法請問 AI 並以 MDN 查證，見 [MDN：link](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/link)。

```html syntax.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>一條規則</title>
    <!-- 專題改外部檔：同資料夾放 tour.css，再啟用下一行
    <link rel="stylesheet" href="tour.css" />
    -->
    <style>
      /* 選擇器 { 屬性: 值; }  HTML 的 <!-- --> 在這裡無效 */
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      h1,
      h2 {
        font-weight: 700;
      }

      h1 {
        color: #99f6e4; /* 同屬性寫兩次，這條會被下一條蓋掉 */
        colour: red; /* 拼錯，整條宣告丟掉 */
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
    <p class="lead">標題應是深青綠。F12 點 h1，colour 與第一個 color 會被劃掉或標成無效。</p>
    <p style="color: #9f1239">這行的顏色寫在開始標籤的 style 屬性（行內）。</p>
    <h2>次標題跟 h1 共用字重</h2>
    <p>這段沒有自己的 class，顏色來自 body。</p>
  </body>
</html>
```

{% note warning %}
**注意事項**
專題不要把版面塗在標籤上。行內樣式很難搜尋，也會蓋過樣式表裡的一般宣告。
{% endnote %}

##### 用 AI 練習

在「規則怎麼套上元素」筆記本問下面兩題。答案應引用這篇或 [MDN：CSS 語法](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_syntax/Syntax)。改檔、看 404，改去聊天室，不要請 NotebookLM 重寫整份 HTML。

- `h1` 寫了 `colour: red` 以及兩個 `color`，拼錯的宣告會怎樣、同屬性誰留下？
- 行內、頁內、外部 `link` 差在哪？專題為什麼用 `link`？CSS 檔 404 要看 Chrome 哪個面板？

### 選擇器與權重

選擇器是規則的前半。打不中，後面的宣告就不會出現在那個節點的 Styles 裡。很多條都打中同一個屬性時，再用權重與原始碼順序決定留下哪一條。見 [MDN：權重](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascade/Specificity)。

#### 元素、class 與 id

class 寫在 HTML 是 `class="tour"`，CSS 多一個點。id 寫在 HTML 是 `id="featured"`，CSS 多一個 `#`。一個元素可以同時有多個 class：`class="tour soldout"`。`.tour.soldout` 中間**沒有空格**，表示兩個 class 都在同一個元素上。

`*` 打到所有元素，權重不加分。元素選擇器（`p`、`a`）加在元素欄。class 可重複，加在 class 欄。id 在一份文件裡只給一個元素，加在 id 欄。要用在很多張卡片上的樣式寫 class。`#site-header` 這種全頁只有一個的區塊才用 id，而且是因為腳本或錨點需要那個名字。其餘選擇器請問 AI 並以 MDN 查證。

{% note info %}
**小技巧：打不中時先看名字**
Styles 裡完全沒有你寫的那條，多半是 class 拼字、檔案沒存、或 `link` 路徑錯。先對 HTML 的 `class`／`id` 與 CSS 的拼字，再談權重。
{% endnote %}

#### 組合關係

組合是在基本選擇器之間加上關係。空格、`>`、`+`、`~` 都算進**同一條**選擇器，權重把各段加總。逗號則是拆成多條，不加總。

`article p` 是後代（任何深度）。`article > .direct` 只限直接小孩。`.stops li + li` 是緊接在後面的那個兄弟。`h2 ~ p` 是同一個父層裡、`h2` 之後的 `p`。後代選擇器很容易打到後來才嵌進去的元素。能用 class 說清楚的，就少靠深層的空格。其餘組合請問 AI 並以 MDN 查證。

#### 偽類與偽元素

偽類描述狀態或在父層的位置，偽元素描述元素的一部分或生出來的裝飾。兩者都接在選擇器後面，冒號個數與權重欄不同。見 [MDN：偽類與偽元素](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements)。

##### 狀態與結構偽類

**偽類（pseudo-class）**寫單冒號，權重算在 **class 欄**。連結四態照 LoVe／HAte：`:link`、`:visited`、`:hover`、`:active`。順序錯了，前面的同權重規則會蓋掉後面的狀態。`:visited` 因隱私限制，現代瀏覽器幾乎只讓你改顏色。`:focus-visible` 是鍵盤把焦點帶進來時才畫出的框。

結構偽類看的是「在父層的第幾個小孩」。`:first-child` 要求它就是第一個小孩；第一個小孩若是 `h2`，`p:first-child` 打不到，`p:first-of-type` 才打得到該標籤的第一個。`:nth-child()` 的其餘寫法請問 AI 並以 MDN 查證。清單用 `:nth-child(odd)` 之前，先確認項目中間沒有插入別的標籤。

##### 偽元素與屬性選擇器

**偽元素（pseudo-element）**寫雙冒號，權重算在 **元素欄**。`::before` 與 `::after` 必須寫 `content`（可以是空字串 `""`）才看得到。價格數字仍要留在 HTML 裡，讀屏與複製才有內容。`::placeholder` 只影響提示字。屬性選擇器（例如 `input[type="email"]`）權重也算 class 欄。其餘比對請問 AI 並以 MDN 查證。

#### 四欄權重

權重（specificity）用來比較哪一條選擇器比較具體。先看有沒有 `!important`，再由左到右比四個欄位（行內、id、class、元素），欄與欄不進位；欄位相同才看原始碼順序。後連結的樣式表算較後面。

`p.note#one` 是把欄位加在同一條上。十個 class 加起來仍是 class 欄的數字，比不過 id 欄的 1。舊說法「id＝100、class＝10、元素＝1」只在數目很小的時候碰巧像十進位。樣式表裡的 `!important` 贏過沒有 `!important` 的行內樣式。專題要改顏色時，調整選擇器或原始碼順序。

```html specificity.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選擇器與權重</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }
      p { color: #475569; }
      .tour { color: #0f766e; }
      .tour.soldout { color: #64748b; text-decoration: line-through; }
      article p { border-left: 3px solid #99f6e4; padding-left: 0.75rem; }
      article > .direct { font-weight: 700; }
      a:hover { color: #9f1239; }
      a:focus-visible { outline: 2px solid #115e59; }
      .price::before { content: "NT$ "; }
      .note { color: #b45309; }
      #one { color: #0f766e; }
    </style>
  </head>
  <body>
    <h1>誰被選到、誰贏</h1>
    <p class="tour">class：深青綠，可重複。</p>
    <p class="tour soldout">沒有空格：同一個元素兩個 class。</p>
    <article>
      <p class="direct">直接小孩較粗，也有左邊色條。</p>
      <div><p>後代仍有色條，子結合打不到。</p></div>
    </article>
    <p><a href="#one">移入再按 Tab</a> <span class="price">12800</span></p>
    <p class="note">class 蓋過元素。</p>
    <p id="one" class="note">id 蓋過 class。</p>
    <p class="note" style="color: #9f1239">行內蓋過樣式表裡的一般宣告。</p>
  </body>
</html>
```

{% note danger %}
**不要用 !important 解權重**
它會讓下一個人只能再寫一個 `!important`。id 寫很多、選擇器拉很長，也是同一類問題。先把 class 取清楚。
{% endnote %}

{% note warning %}
**AI 給錯的例子**
模型常把權重說成「class 是 10 分、id 是 100 分，加總比較」。四欄不進位：兩個 class 仍是 class 欄的 2，不會變成 20 去跟 id 進位。它也常叫你加 `!important` 蓋過一個 class。F12 看的是哪一條被劃掉。
{% endnote %}

##### 用 AI 練習

在「規則怎麼套上元素」筆記本問。回答若出現 10／100 計分或叫你加 `!important`，先不要改檔。對答案：開 `specificity.html`，F12 點 `#one` 與帶行內的那段。

- `p.note` 與 `#one` 都寫了 `color`，另一段還有行內 style。四欄誰贏？行內在哪一欄？
- `.tour .price` 與 `.tour.price` 差在哪？中間有沒有空格，打到的是子孫還是同一個元素？
- `:hover` 與 `:focus-visible` 各在什麼時候出現？為什麼按鈕不要只寫 `:hover`？

### 繼承與層疊

**層疊（cascade）**決定很多宣告搶同一個屬性時誰留下：來源、`!important`、權重、原始碼順序。**繼承（inheritance）**是另一件事：這個元素根本沒有人寫這個屬性時，要不要沿用父層已經算出來的值。見 [MDN：繼承](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascade/Inheritance)。

使用者代理樣式表（user agent stylesheet）也參與層疊，優先順序低於你寫的作者樣式。連結預設是藍色底線、`h1` 預設比較大，都是它先套的。你的規則寫出來之後才改掉那些預設。

#### 什麼會繼承

會繼承的多半跟字有關：`color`、`font-family`、`font-size`、`line-height`、`text-align`。不會繼承的多半跟盒子有關：`margin`、`padding`、`border`、`background`、`width`、`display`。子元素是透明底時，你看到的是父層背景透出來，不是子層繼承了 `background-color`。自己寫了同一個屬性，繼承就停在這一層。

`line-height` 若寫成無單位數字，子層會用「自己的字級 × 那個數字」；若寫成 `24px`，子層字變大時行距仍是固定的 24 像素。其餘會不會繼承，請問 AI 並以 MDN 查證。

#### 四個關鍵字

值也可以寫成關鍵字，強迫這一次要不要跟父層。`inherit` 跟父層的計算結果，連平常不繼承的屬性也跟。`initial` 回到屬性自身的初始值，不是回到 `body` 上你寫的顏色。`unset` 對可繼承的當成 `inherit`，其餘當成 `initial`。`revert` 丟掉作者樣式，回到使用者代理那一層。`all: unset` 是重置手段，不是每個元件的起手式。

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
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      .story {
        color: #7c2d12;
        margin-left: 2rem;
        border: 4px solid #7c2d12;
        padding: 0.75rem 1rem;
        background: #fff7ed;
      }

      .price { color: #115e59; }

      .keywords {
        color: #1d4ed8;
        border: 4px solid #1d4ed8;
        padding: 0.75rem 1rem;
      }

      .in { color: inherit; border: inherit; }
      .init { color: initial; border: initial; }
      .un { color: unset; border: unset; }
      .back h2 { font-size: revert; font-weight: revert; }
    </style>
  </head>
  <body>
    <h1>沒寫的屬性會不會跟父層</h1>
    <article class="story">
      <h2>繼承</h2>
      <p>這段沒寫 color，所以跟 article 的磚紅。框與底色不會繼承；左邊外距是 article 自己的盒子在縮排。</p>
      <p class="price">這段自己寫了 color，字是深青綠。</p>
    </article>
    <div class="keywords">
      <p class="in">inherit：字與框都跟父層的藍。</p>
      <p class="init">initial：字與框回到屬性初始值，通常沒有框。</p>
      <p class="un">unset：color 繼承成藍字，border 回到沒有框。</p>
    </div>
    <section class="back">
      <h2>這顆 h2 用了 revert，字級與字重回到瀏覽器預設。</h2>
    </section>
  </body>
</html>
```

##### 用 AI 練習

繼承問的是「沒寫的屬性會不會跟父層」，不要和權重混成同一題。對答案：F12 點 `.story` 裡第一段 `p`，Computed 的 `color` 是磚紅，`border` 不是那條 4px。

- `.story` 設了 `color`、`margin-left`、`border`、`background`。裡面的 `p` 沒寫這些，哪些會出現在 `p` 上？背景透出來算繼承嗎？
- `color` 寫成 `initial`、`unset`、`inherit`、`revert` 各會看到什麼？`initial` 會回到 `body` 上你寫的顏色嗎？

{% note primary %}
**整理成你的 AI 筆記**
請「規則怎麼套上元素」筆記本出三題（宣告零件、四欄權重、繼承與四個關鍵字）、列出五個關鍵字、畫一張「有寫／沒寫」心智圖。把回答存成筆記。
{% endnote %}

## 字、色與背景

規則打中之後，值要寫成瀏覽器讀得懂的長度與顏色，再決定字怎麼排、底怎麼畫。字型相關屬性多半會繼承，背景預設不繼承。長度見 [MDN：length](https://developer.mozilla.org/zh-TW/docs/Web/CSS/length)，顏色見 [MDN：color 值](https://developer.mozilla.org/zh-TW/docs/Web/CSS/color_value)，字型見 [MDN：font-family](https://developer.mozilla.org/zh-TW/docs/Web/CSS/font-family)，背景見 [MDN：background-size](https://developer.mozilla.org/zh-TW/docs/Web/CSS/background-size)。

### 單位與顏色

長度與顏色是宣告裡最常出現的兩種值。這一節先把字級、行寬、色票定下來。寬度怎麼跟盒模型一起算，下一節再細算。

#### 長度

內文以 `rem` 為主，相對**根元素**（`html`）的字級。`px` 用來寫髮絲邊框。`em` 用在 `font-size` 上時相對**父層**字級，會疊乘：父層已經是 1.25 倍、子層又寫 `2em`，子層相對的是放大後的父層。`%` 視屬性而定，寬度通常相對包含區塊。`ch` 約是該字型裡「0」的寬度，用來收行寬。`vw`／`vh` 是視窗的 1%。

`line-height` 建議寫無單位數字，它會乘上該元素自己的字級。不要用 `vw` 當全站內文。其餘單位請問 AI 並以 MDN 查證。

#### 顏色寫法

`color` 是前景，`background-color` 是底，`border-color` 是框。同一套寫法三種屬性都能用。課堂用六碼 HEX（`#0f766e`）或現代 `rgb(15 118 110)`。透明度寫在斜線後：`rgb(15 118 110 / 50%)`。八碼 HEX 的末兩碼也是透明度。`hsl()` 用色相、飽和度、亮度調深淺。`currentColor` 跟該元素當下的 `color` 走。

對比要夠。透明度是讓底下的像素參與混合。新頁用空格與斜線。其餘寫法請問 AI 並以 MDN 查證。

```html units.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>單位與顏色</title>
    <style>
      html { font-size: 16px; }
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      .em-box { font-size: 1.25em; background: #f0fdfa; padding: 0.75rem; }
      .em-child { font-size: 2em; }
      .rem-box { font-size: 1.25rem; background: #ecfeff; padding: 0.75rem; }
      .rem-child { font-size: 2rem; }
      .mix { color: rgb(15 118 110 / 50%); }
      .tag { color: #9f1239; border: 2px solid currentColor; }
    </style>
  </head>
  <body>
    <h1>單位與顏色</h1>
    <p>根字級設成 16px，只為了讓 Computed 好對。正式頁常不鎖死像素。</p>
    <div class="em-box">
      父層 1.25em（約 20px）
      <p class="em-child">子層 2em，相對父層，約 40px。</p>
    </div>
    <div class="rem-box">
      父層 1.25rem（約 20px）
      <p class="rem-child">子層 2rem，相對根元素，約 32px。</p>
    </div>
    <p class="mix">rgb(15 118 110 / 50%) 會讓底下的像素參與混合。</p>
    <p><span class="tag">框色用 currentColor，跟字同一色</span></p>
  </body>
</html>
```

{% note warning %}
**AI 給錯的例子**
模型常說「1em 就是 16px」。`em` 用在 `font-size` 上是相對父層字級：父層已經是 1.25 倍，子層再寫 `2em`，不是根字級的 32px。它也常把內文全改成 `px` 或 `vw`。這篇內文用 `rem`，`px` 留給髮絲邊框。F12 的 Computed 會換算成像素，拿那個數字跟父層比。
{% endnote %}

##### 用 AI 練習

在「字色與背景」筆記本問。不要接受「全部改成 px」的重寫。對答案：F12 看子層 Computed 的 `font-size`，`2em` 約 40px、`2rem` 約 32px。

- 根字級 16px。父層 `1.25em`，子層一個 `2em`、一個 `2rem`，大約各是多少 px？各相對誰？
- `#0f766e` 與 `rgb(15 118 110 / 50%)` 差在哪？八碼 HEX 最後兩碼是什麼？

### 文字與背景

字與背景是畫面上直接看得到的屬性。字型相關屬性大多會繼承，所以設在 `body` 上，內文就跟著走。背景預設不繼承，畫在邊框以內（含內距）。

#### 字型堆疊

`font-family` 是一串字型堆疊，逗號分隔，瀏覽器由左到右挑第一個用得了的。有空格的名稱要加引號。最後一個寫**通用家族（generic family）**，系統才有退路：`sans-serif`、`serif`、`monospace`。`system-ui` 在 Windows 上多半是 Segoe UI，中文仍要後面的「蘋方」或「微軟正黑體」。不要只寫 `"Microsoft JhengHei"`：沒有這個家族的系統會直接掉到通用家族。

`font-weight: 700` 要該字型真的有這個字重。`font` 簡寫沒寫到的項目會回到初始值。只改一項時寫單獨屬性。其餘字型屬性請問 AI 並以 MDN 查證。

#### 行內文字

`text-align` 作用在**區塊**上，對齊的是它裡面的行內內容。把 `text-align: center` 寫在 `span` 自己身上通常看不到置中。橫書由左到右時，`start` 靠行首、`end` 靠行末。

底線的顏色與偏移可以和字分開。連結若拿掉底線，聚焦時仍要有另一種變化。`text-align: justify` 在中文常拉出大空隙，內文用 `start`。其餘文字屬性請問 AI 並以 MDN 查證。

#### 背景圖層

背景可以是底色、一張圖，或一層漸層。漸層也算 `background-image`。多層背景用逗號分隔，**先寫的畫在上面**。`cover` 蓋滿並裁切；`contain` 整張放進盒子，可能露出底色。預設 `background-repeat` 是重複平鋪。

簡寫 `background` 沒寫到的項目會回到初始值。只改顏色時寫 `background-color`。`background-size` 要跟在位置後面並用斜線分開，例如 `center / cover`。正式站的照片把示範網址換成 `url("images/kyoto.jpg")`。其餘背景屬性請問 AI 並以 MDN 查證。

```html type.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文字與背景</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }
      .banner-title {
        font: 700 1.5rem/1.3 system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }
      .center { text-align: center; }
      .jump {
        text-decoration-color: #99f6e4;
        text-underline-offset: 0.2em;
      }
      .hero {
        min-height: 6rem;
        padding: 1rem;
        color: #f0fdfa;
        background-color: #115e59;
        background-image:
          linear-gradient(rgb(15 23 42 / 45%), transparent),
          linear-gradient(90deg, #0f766e 50%, #042f2e 50%);
        background-size: auto, 1.25rem 1.25rem;
      }
    </style>
  </head>
  <body>
    <p class="banner-title">font 簡寫：粗體、1.5rem、行高 1.3。</p>
    <p class="center">置中寫在區塊上。</p>
    <p><a class="jump" href="#top">看行程</a></p>
    <div class="hero">漸層寫在前面，所以蓋在條紋上面。</div>
  </body>
</html>
```

{% note warning %}
**注意事項**
`font` 簡寫沒寫到的項目會回到初始值。原本從 `body` 繼承來的字重，可能在這一層消失。`background` 簡寫同樣會清掉沒寫到的圖層。
{% endnote %}

##### 用 AI 練習

在「字色與背景」筆記本問。不要請它改成 `<img>` 或外連字型服務。

- `font-family` 最後為什麼要有 `sans-serif`？只寫微軟正黑體，在沒有這個家族的系統上會怎樣？
- `.hero` 有兩層 `background-image`，漸層寫在前面。哪一層畫在上面？`cover` 和 `contain` 差在哪？

### 選讀：進階選擇器、分層與字型

屬性片段比對、`:is()`／`:where()`／`:has()`、`@layer`、BEM 與 `@font-face` 可以整節跳過。維護較大的樣式表時再回來。其餘寫法請問 AI 並以 MDN 查證。

#### 屬性比對與 :is()、:where()、:has()

`:is()` 的權重等於括號裡最高的那一個。`:where()` 外觀可以相同，權重是 0，適合重置。`:has()` 選「裡面有某子孫的父層」；有明確 class 時仍寫 class。

#### 自訂屬性與 @layer

`--` 用 `var()` 取用，會繼承；換膚代幣在 CSS 變數那一節。`@layer` 較晚宣告的層蓋過較早的層，沒放進層的一般宣告又蓋過所有層。不要在層裡加 `!important`。

#### 命名與字型檔

Class 怎麼取名、字型檔怎麼掛上，都不增加新的選擇器語法。專題可以沿用較短的 class 與系統字型堆疊。

##### BEM 命名

BEM 是命名習慣：`.tour-card` 是區塊，`.tour-card__title` 是元素，`.tour-card--soldout` 是修飾。雙底線只是名字，權重仍是一個 class。不要把選擇器再拉長。

##### 載入字型檔

有授權的 `woff2` 才用 `@font-face`，並寫 `font-display: swap`。每個字重各一個檔。不要用 `@import` 拉字型。

##### 用 AI 練習

在「字色與背景」筆記本問。這節可以整節跳過。不要請它把專題改成 BEM。

- `:is()` 和 `:where()` 權重差在哪？
- `@layer` 裡較晚的層，與完全沒放進層的宣告，誰蓋誰？

{% note primary %}
**整理成你的 AI 筆記**
請「字色與背景」筆記本出三題（`rem` 與 `em`、字型堆疊、背景圖層誰在上）、列出五個關鍵字、畫一張「字／底」心智圖。把回答存成筆記。
{% endnote %}

## 盒子與欄位排版

字與底色已經會變之後，看盒子本身：內容、內距、邊框、外距，再決定它獨佔一行還是跟文字坐在一起。一個方向用 Flex，欄與列一起切用 Grid。盒模型見 [MDN：盒模型](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)，排版見 [MDN：Flexbox 基本概念](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) 與 [MDN：Grid 基本概念](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout)。

### 盒子與定位

寬高算到哪一層、盒子怎麼參加排版、座標跟誰比、多出來的內容裁掉還是捲動，都在這一節。存檔後按 <kbd>F12</kbd> 對 **Computed** 裡的盒模型圖。

#### 盒子模型

盒子模型（box model）把每個元素分成內容、內距、邊框、外距。`margin`、`padding`、`border` 都不繼承。見 [MDN：盒模型](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)。

##### 寬高與四邊簡寫

預設 `content-box` 的 `width` 只量內容，padding 與 border 再往外加，所以「寫了 100% 又加了內距」會比父層更寬。課堂與專題在樣式表最前面改成 `border-box`：你寫的寬高含內容、padding、border，不含 margin。`*` 要連 `::before`、`::after` 一起寫。

簡寫依順時針：一個值四邊相同；兩個值是上下、左右；三個值是上、左右、下；四個值是上、右、下、左。`padding` 不能是負值；`margin` 可以。左右 `margin: auto` 會平分剩餘寬度，所以要比父層窄才能水平置中。上下的 `margin: auto` 在普通區塊流裡不會垂直置中。其餘簡寫請問 AI 並以 MDN 查證。

##### 外距合併、輪廓與尺寸

同一個包含塊裡，上下相鄰的區塊盒，垂直 margin 會併成**較大的那一個**，不會相加。左右不會合併。父層若沒有 padding、沒有 border、也沒有上緣內容，子層的 `margin-top` 會穿出去。

`border` 要有樣式才看得到。`outline` 畫在邊框外側，不佔寬高，鍵盤焦點用它，並加上 `:focus-visible`。只寫 `outline: none` 會讓鍵盤使用者看不到現在停在哪裡。`width: auto` 的區塊會撐滿可用寬。百分比高度要父層自己有明確高度。圖片加上 `max-width: 100%`。`width: min(100%, 22rem)` 是窄於 22rem 時跟父層一樣寬。

#### display

`display` 決定盒子怎麼參加排版，不改變標籤的語意。見 [MDN：display](https://developer.mozilla.org/zh-TW/docs/Web/CSS/display)。

##### 區塊與行內

`div`、`p`、標題預設是 `block`，獨佔一行。`span`、`a` 預設是 `inline`，跟文字坐在同一行，通常不採用你寫的寬高。`inline-block` 仍跟文字同一行，但可以有自己的寬高。標籤之間的換行會變成一個空白。圖片底下那條小縫，是它在跟文字基線對齊；改成 `display: block` 就會消失。`vertical-align` 只對行內與 `inline-block` 有意義，整頁的垂直置中不要靠它。

##### 不顯示的三種寫法

`display: none` 不建立盒子，後面的元素補上它的位置。`visibility: hidden` 仍佔位，只是看不見。`opacity: 0` 也佔位，而且預設仍能被點到。三種都還在 HTML 裡。暫時不顯示用 `none`；要留空位避免版面跳動，用 `hidden`。其餘 `display` 值請問 AI 並以 MDN 查證。

#### 定位與 z-index

`position` 決定偏移量跟誰比，`z-index` 決定重疊時誰在上面。見 [MDN：position](https://developer.mozilla.org/zh-TW/docs/Web/CSS/position)。

##### 五種定位

預設 `static` 參加正常排版，`top` 與 `z-index` 都無效。`relative` 以自己原本的位子為原點，原位仍留著。`absolute` 對準最近一個 `position` 不是 `static` 的祖先，原位釋出。`fixed` 對準視窗。`sticky` 滾過門檻後黏在滾動盒邊緣，範圍只到父層結束；至少要一個 `top` 之類的門檻。祖先若有 `overflow: hidden`，黏性常常失效。

徽章的寫法是：卡片 `position: relative`，徽章 `position: absolute` 再寫 `top` 與 `right`。少了卡片上的 `relative`，徽章會貼到整頁。整頁的欄與置中用 Flex 或 Grid。`absolute` 留給徽章、關閉鈕。

##### 層疊情境

`z-index` 只對已定位的盒子生效（Flex、Grid 的小孩例外）。數字愈大愈靠近你。數字只在**同一個層疊情境**裡比。`position` 加上不是 `auto` 的 `z-index` 會開一個新情境；情境與情境之間比的是父親，小孩的數字出不去。專題不要靠 `9999` 去壓過別的元件。

#### overflow

內容比盒子的 padding 邊緣還大時，`overflow` 決定多出來的部分。見 [MDN：overflow](https://developer.mozilla.org/zh-TW/docs/Web/CSS/overflow)。

##### 裁切與捲動

預設 `visible` 畫到外面，不出現捲軸。`hidden` 裁掉。`auto` 超過才出現捲軸。`scroll` 一律預留捲軸。其中一軸不是 `visible` 時，另一軸的 `visible` 會被算成 `auto`。圓角盒子裡的小孩要切齊，父層加上 `overflow: hidden`。`hidden` 也會讓這一層變成滾動盒，子孫的 `sticky` 可能因此失效。

##### 單行省略

單行要出現省略號，四個條件一起寫：有寬度、`overflow: hidden`、`white-space: nowrap`、`text-overflow: ellipsis`。少一個就會改成換行或直接裁掉。

```html box.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>盒子</title>
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
        color: #134e4a;
      }
      .stage { background: #ccfbf1; }
      .card {
        position: relative;
        width: min(100%, 22rem);
        margin: 1rem auto;
        padding: 1rem;
        border: 6px solid #0f766e;
        background: #f0fdfa;
      }
      .badge {
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        background: #9f1239;
        color: #fff;
      }
      .track { width: 16rem; border: 1px dashed #0f766e; }
      .kid { width: 100%; padding: 0.5rem 1rem; border: 4px solid #115e59; }
      .content-box .kid { box-sizing: content-box; }
      .collapse p { margin: 0.5rem 0 2rem; background: #f0fdfa; }
      .go:focus-visible { outline: 3px solid #9f1239; outline-offset: 3px; }
      .title {
        max-width: 16rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <article class="card">
        <span class="badge">熱賣</span>
        <p>淺綠是 padding，粗框是 border，框外淺青是 margin。</p>
        <p><a class="go" href="#top">看行程</a></p>
      </article>
    </div>
    <div class="track"><div class="kid">border-box：100% 含 padding，對齊虛線。</div></div>
    <div class="track content-box"><div class="kid">content-box：虛線包不住。</div></div>
    <div class="collapse">
      <p>下緣 2rem。</p>
      <p>上緣 0.5rem。中間留下較大的 2rem。</p>
    </div>
    <p class="title">京都・清水寺・二年坂・這一行以省略號結尾</p>
  </body>
</html>
```

{% note success %}
**跟著做**
點 `.card`，打開 Computed 的盒模型圖。用 <kbd>Tab</kbd> 移到「看行程」，確認焦點框出現、按鈕寬度不變。拿掉卡片的 `relative`，徽章會離開這張卡。
{% endnote %}

{% note warning %}
**AI 給錯的例子**
兩段一般區塊上下相鄰時，模型常把 `margin-bottom: 2rem` 與 `margin-top: 0.5rem` 相加成 2.5rem。垂直外距會合併，中間留下較大的那個。另一個錯法是沒離開 `static` 就寫 `z-index: 9999`。一般盒子的 `z-index` 要先定位才生效（Flex、Grid 的小孩例外）。F12 看盒子圖的 margin，以及 Styles 裡的 `position`。
{% endnote %}

##### 用 AI 練習

在「盒子與欄位排版」筆記本問。不要請它直接改成 Flex 或 Grid。對答案：兩段之間是 2rem；兩條軌道比有沒有凸出虛線。

- 上段 `margin-bottom: 2rem`、下段 `margin-top: 0.5rem`，中間距是多少？
- `width: 100%` 在 `border-box` 與 `content-box` 差在哪？
- 徽章是 `absolute`，卡片仍是 `static`。徽章會相對誰？`z-index` 在 `static` 上有沒有效？
- 單行省略號要同時寫哪四個條件？

### 欄位排版

一個方向上的排列用 Flex：導覽列、一排按鈕、卡片橫列。兩個方向同時切用 Grid：頁首與側欄、或欄線要對齊的卡片牆。兩者都寫在父層，只排**直接子元素**。項目之間的縫用 `gap`，不加在容器外緣。Flex 與 Grid 的項目之間不合併 margin。`float` 不是這一章的欄位手法。

{% mermaid graph TD %}
A["這一層要排什麼"] --> B["沿一個方向"]
A --> C["行與列一起定"]
B --> D["display: flex"]
C --> E["display: grid"]
{% endmermaid %}

#### Flexbox

Flexbox 把直接子元素排成一列或一行。主軸負責排隊與剩餘空間，交叉軸負責對齊。見 [MDN：Flexbox 基本概念](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)。

##### 方向、換行與對齊

`flex-direction: row` 在繁中橫排是由左到右，`column` 由上到下。`row-reverse` 只改視覺起點，<kbd>Tab</kbd> 順序不變。預設 `nowrap`：空間不夠就縮小。`wrap` 不夠時換行。`gap` 是項目之間的縫。`justify-content` 分主軸上的剩餘空間。`align-items` 管交叉軸，預設 `stretch`。主軸改成 `column` 之後，兩個屬性對調所管的方向。其餘對齊值請問 AI 並以 MDN 查證。

##### 彈性係數與最小尺寸

`flex` 是 `flex-grow`、`flex-shrink`、`flex-basis` 的簡寫。`flex: 1` 從 0 起算再均分。`flex: none` 不伸也不縮。`fr` 不能寫在 Flex 裡。彈性項目的 `min-width` 預設是 `auto`，不會縮到比內容的最小寬度更窄。一長串沒有空白的字會把整行撐破，要讓縮小生效就寫 `min-width: 0`。`order` 只改視覺順序，不改 <kbd>Tab</kbd>。主軸上要單獨推開某一項，用該側的 `margin: auto`。

#### Grid

Grid 同時指定欄與列，項目落在格子上。見 [MDN：Grid 基本概念](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout) 與 [MDN：grid-template-columns](https://developer.mozilla.org/zh-TW/docs/Web/CSS/grid-template-columns)。

##### 格線與剩餘空間

格線從 1 起算。`grid-column: 1 / 3` 佔兩欄，終點那條線不算在內。`fr` 分剩餘空間；要肯縮小就寫 `minmax(0, 1fr)`。父層高度是 `auto` 時，列上的 `1fr` 常常只跟內容一樣高。

##### 自動欄數與命名區域

`repeat(auto-fit, minmax(12rem, 1fr))` 依容器寬度決定欄數，空欄收成 0。`auto-fill` 仍留下空欄。下限不要寫 `1fr`。命名區域用 `grid-template-areas`，每一列是一條引號字串，格數必須相同。`.` 代表這一格先空著。子項用 `grid-area` 對上去。

##### 對齊與和 Flex 分工

`justify-items` 與 `align-items` 管項目在自己那一格裡面，預設 `stretch`。`justify-content` 管的是整組軌道比容器窄時怎麼擺。卡片牆若重點是自動幾欄、欄線對齊，外層用 Grid。卡的內部仍是一個方向，所以卡自己 `display: flex`、`flex-direction: column`，連結 `margin-top: auto`。品牌在左、連結在右用 Flex。頁首、側欄、主文、頁尾用 Grid 區域。其餘對齊請問 AI 並以 MDN 查證。

```html layout.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flex 與 Grid</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
        color: #134e4a;
      }
      .nav { display: flex; flex-wrap: wrap; gap: 0.75rem; }
      .nav a:last-child { margin-left: auto; }
      .row { display: flex; gap: 0.75rem; }
      .row > * { min-width: 0; flex: 1; }
      .code { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
      .wall {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: 0.75rem;
      }
      .card {
        display: flex;
        flex-direction: column;
        min-width: 0;
        padding: 0.75rem 1rem;
        background: #f0fdfa;
      }
      .card a { margin-top: auto; }
    </style>
  </head>
  <body>
    <nav class="nav">
      <a href="#kyoto">京都</a><a href="#nara">奈良</a><a href="#ask">諮詢</a>
    </nav>
    <div class="row">
      <p class="code">https://example.com/very-long-tour-code-without-spaces</p>
      <p>min-width: 0 才縮得下去。</p>
    </div>
    <div class="wall">
      <article class="card"><h2>京都</h2><p>清水寺。</p><a href="#kyoto">看行程</a></article>
      <article class="card"><h2>奈良</h2><p>鹿。</p><a href="#nara">看行程</a></article>
    </div>
  </body>
</html>
```

{% note warning %}
**AI 給錯的例子**
要三欄時，模型仍常回 `float: left` 配 `width: 33%`。這一章用 Flex 或 Grid，縫用 `gap`。另一個錯法是長單字把項目撐破，卻只加 `overflow: hidden`，沒寫 `min-width: 0`（Grid 則是 `minmax(0, 1fr)`）。F12 點容器，徽章應是 flex 或 grid。
{% endnote %}

##### 用 AI 練習

在「盒子與欄位排版」筆記本問。先講你要排一個方向還是欄與列。不要用 `float`，也不要寫 `-webkit-` 前綴。

- 導覽要橫排、中間留縫、窄畫面可換行。`display`、`flex-wrap`、`gap` 該寫在父層還是子層？
- 卡片牆什麼時候用 `repeat(auto-fit, minmax(...))`，一行按鈕什麼時候用 Flex？
- Flex 項目裡一長串沒有空白的字把整行撐破。`min-width: 0` 在做什麼？

{% note primary %}
**整理成你的 AI 筆記**
請「盒子與欄位排版」筆記本出三題（盒模型與外距合併、定位、Flex 與 Grid 分工）、列出五個關鍵字、畫一張「盒子四層／主軸」心智圖。把回答存成筆記。
{% endnote %}

## 響應式、變數與動態

同一份 HTML 先在窄畫面讀得完，再依視窗改結構、把重複的色與間距收成代幣，並讓狀態變化有轉場與少量動畫。畫面和規則對不上時，用開發者工具看最終值。媒體查詢見 [MDN：使用媒體查詢](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_media_queries/Using_media_queries)，代幣見 [MDN：使用 CSS 自訂屬性](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)，轉場見 [MDN：使用 CSS 轉場](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)。

### RWD 與媒體查詢

響應式網頁（responsive web design，RWD）是同一份 HTML，依畫面寬度改排版。流動的部分前面已經有了：`max-width`、Flex 的 `wrap`、Grid 的 `auto-fit`。媒體查詢（media query）留給**結構要變**的時候。見 [MDN：使用媒體查詢](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_media_queries/Using_media_queries)。

#### 流動版面先做完

先讓窄畫面就讀得完，再往寬的加規則。能用 `repeat(auto-fit, minmax(12rem, 1fr))` 解決的卡片牆，不必再為每個寬度各寫一條查詢。字級繼續用 `rem`。標題若要略為伸縮，用 `clamp(最小, 偏好, 最大)`。文件的 `<meta name="viewport" content="width=device-width, initial-scale=1.0">` 讓手機用裝置寬度當視窗。

#### 斷點由窄到寬

`@media (min-width: 40rem)` 的意思是：視窗寬度**大於等於** 40rem 時，括號裡的規則才加入層疊。查詢裡的 `rem` 相對瀏覽器預設字級（通常 16px），不受你寫在 `html` 上的 `font-size` 影響。兩段 `min-width` 在寬視窗會同時成立；選擇器權重一樣時，寫在後面的那段蓋過前面。所以斷點由小到大往下寫。

不要為了讓側欄在手機上排到中間，就去改原始碼順序或使用 `order`。`max-width` 是「小於等於」。課堂以 `min-width` 為主。兩個條件都要成立時用 `and`。其餘特性請問 AI 並以 MDN 查證。

#### 列印與偏好

`@media print` 裡把導覽設成 `display: none`，底色改白、字改黑。列印預覽按 <kbd>Ctrl</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>P</kbd>）。`prefers-color-scheme: dark` 在系統用深色外觀時成立。`prefers-reduced-motion: reduce` 在系統要求減少動態時成立。這些查詢和寬度查詢一樣參加層疊。

```html rwd.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RWD</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      .nav { display: flex; flex-wrap: wrap; gap: 0.75rem; }
      .title { font-size: clamp(1.4rem, 2vw + 1rem, 2rem); }
      .now::after { content: "（窄：單欄）"; }

      @media (min-width: 40rem) {
        .page {
          display: grid;
          grid-template-columns: 10rem 1fr;
          gap: 1rem;
        }

        .nav { flex-direction: column; }
        .now::after { content: "（寬：側欄）"; }
      }

      @media print {
        .nav { display: none; }
        body { color: #000; background: #fff; }
      }
    </style>
  </head>
  <body>
    <p class="now">把視窗拉寬，這句話會跟著斷點變</p>
    <div class="page">
      <nav class="nav">
        <a href="#kyoto">京都</a>
        <a href="#nara">奈良</a>
      </nav>
      <main>
        <h1 class="title">洛奇旅行</h1>
        <p>窄畫面先讀得完。寬於 40rem 時導覽改成側欄。</p>
      </main>
    </div>
  </body>
</html>
```

##### 用 AI 練習

在「響應式變數與動態」筆記本問。對答案：拉寬 `rwd.html`，頁首那句話應跟著欄數變。

- 卡片牆已經會用 `auto-fit` 換欄，什麼時候才需要 `@media`？
- `@media` 裡的 `40rem` 相對誰？寫在 `html` 的 `font-size` 會不會改變這個斷點？查詢看的是視窗還是手機型號？

### CSS 變數

自訂屬性（custom properties）是你自己命名、可被繼承的 CSS 值，寫法是 `--名字: 值`，取用時寫 `var(--名字)`。它們跟預處理器的變數不同：瀏覽器在套用樣式時才算出來，所以會參加繼承與覆寫。見 [MDN：使用 CSS 自訂屬性](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)。

#### 宣告、繼承與備援

代幣放在 `:root`（HTML 文件裡就是 `html`）。名字區分大小寫，用用途命名，例如 `--ink`、`--space-md`，不要用 `--blue`。`var(--tag-bg, #ffedd5)` 的備援只在這個名字完全沒被宣告時出現。變數有宣告、但型別不合，備援不會上場，那條宣告在計算階段作廢，可繼承的屬性改走繼承，不會退回同一條規則裡前一個色碼。

自訂屬性會繼承。`.night` 在卡片上重新宣告 `--brand`，只有這張卡和裡面的元素讀到新值。`var()` 只能當值，不能當屬性名稱。`calc(var(--space-md) * 1.5)` 可以拿代幣做算術；代幣裡若已經有單位，不要再加一次。系統偏好深色時，`@media (prefers-color-scheme: dark)` 只覆寫 `:root` 的代幣。

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
        --paper: #f0fdfa;
        --brand: #0f766e;
        --space-md: 1rem;
      }

      body {
        margin: 1.5rem;
        color: var(--ink);
        background: var(--paper);
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      .card {
        padding: var(--space-md);
        background: #fff;
        border-left: 4px solid var(--brand);
      }

      .night {
        --ink: #f0fdfa;
        --brand: #5eead4;
        color: var(--ink);
        background: #042f2e;
      }

      .bad { color: #9f1239; color: var(--space-md); }
    </style>
  </head>
  <body>
    <h1>改一處，繼承得到的一起變</h1>
    <article class="card"><p>這張用 :root 的 --brand。</p></article>
    <article class="card night"><p>這張覆寫 --ink 與 --brand，外面的頁面不受影響。</p></article>
    <p class="bad">第二個 color 的值是 1rem，不能當顏色，字色改走繼承。</p>
  </body>
</html>
```

{% note warning %}
**注意事項**
`var()` 不能取代屬性名稱。長度與顏色不要共用一個名字。型別不合時，同一條規則裡寫在前面的色碼不會回來。
{% endnote %}

##### 用 AI 練習

在「響應式變數與動態」筆記本問。對答案：F12 選中 `html`，把 `--brand` 改成另一個色，第一張卡一起變，夜卡仍用自己的 `--brand`。點 `.bad`，Computed 的 `color` 是繼承來的。

- `.night` 覆寫 `--brand` 之後，外面的卡片會跟著變嗎？備援什麼時候才用得上？
- 同一條 `color` 後面又寫了 `color: var(--space-md)`，而 `--space-md` 是 `1rem`。這條為什麼作廢、畫面會回到哪種字色？

### 轉場與動畫

變形（transform）改的是元素畫出來的位置、大小、角度，排版位子不動。轉場（transition）在兩個狀態之間補間。動畫（animation）用關鍵影格自己播。要動的優先是 `transform` 與 `opacity`。見 [MDN：使用 CSS 轉場](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)。

#### 變形不推動鄰居

`translate`、`scale`、`rotate` 改的是畫出來的樣子，虛線框的寬高與 `gap` 都不變。真的要佔更大的位子，改寬高或 `margin`。`transform-origin` 是旋轉與縮放的基準點，預設是中心。同一條 `transform` 裡，**右邊的函式先套用**。獨立屬性 `translate`、`rotate`、`scale` 互不覆蓋：移入只改 `translate`，原本的 `rotate` 還在。若把角度與位移都塞進同一個 `transform`，移入那一條必須把 `rotate` 再寫一次。其餘函式請問 AI 並以 MDN 查證。

{% note warning %}
**注意事項**
祖先若有 `transform`，子孫的 `position: fixed` 會改以那個祖先為視窗。卡片要加 `transform` 時，不要把全站的固定頁首包在同一層裡面。
{% endnote %}

#### 轉場連接兩個狀態

有人讓某個屬性從舊值變成新值時，`transition` 把中間的畫面補上。簡寫的順序是：屬性、持續時間、速度曲線、延遲。只寫一個時間，那個就是持續時間。介面回饋用 150～300ms。`ease` 是預設；`linear` 等速；`ease-out` 先快後慢。其餘曲線請問 AI 並以 MDN 查證。

`:hover` 只描述指標移入。觸控螢幕常常沒有「移出」。移入規則包在 `@media (hover: hover) and (pointer: fine)` 裡。鍵盤改看 `:focus-visible`。

{% note info %}
**小技巧：不要寫 all**
`transition: all 300ms` 會把之後加上的任何屬性都補間。逐條寫出 `background-color`、`translate`、`opacity`。`display` 不能補間。
{% endnote %}

#### 動畫自己播放

轉場需要一個新值才會動。動畫用 `@keyframes` 寫腳本，一套上 `animation` 就播。持續時間必須寫，否則預設是 `0s`。`infinite` 會循環。系統要求減少動態時，把裝飾動畫設成 `none`。其餘動畫屬性請問 AI 並以 MDN 查證。

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
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      .card {
        width: min(100%, 16rem);
        padding: 1rem;
        background: #f0fdfa;
        rotate: -1deg;
        transition: translate 200ms ease, background-color 200ms ease;
      }

      @media (hover: hover) and (pointer: fine) {
        .card:hover { translate: 0 -0.35rem; background-color: #ccfbf1; }
      }

      .hot { animation: pulse 1.6s ease-in-out infinite; }
      @keyframes pulse {
        50% { scale: 1.08; }
      }

      @media (prefers-reduced-motion: reduce) {
        .hot { animation: none; }
        .card { transition: none; }
      }
    </style>
  </head>
  <body>
    <h1>變形不改佔位</h1>
    <article class="card">
      <h2>清水寺</h2>
      <p>平時就有一點角度。滑鼠移入只加一段位移，角度還在。</p>
    </article>
    <p><span class="hot">熱賣</span> 系統若要求減少動態，縮放與轉場都會停住。</p>
  </body>
</html>
```

{% note warning %}
**AI 給錯的例子**
模型常寫 `transition: all 300ms`，或叫 `display`、`height: auto` 做開合。`display` 不能補間；`all` 會把沒打算動的屬性也算進去。這篇要動的是 `transform` 與 `opacity`。懸停若沒包在 `(hover: hover) and (pointer: fine)` 裡，觸控裝置可能黏住。
{% endnote %}

##### 用 AI 練習

在「響應式變數與動態」筆記本問。不要接受 `transition: all`。對答案：移入卡片應仍帶著原來的角度。

- 卡片平時就有 `rotate`，移入只想再加一段 `translate`。若 `:hover` 把 `transform` 整段改成只剩 `translate`，角度會怎樣？
- `@keyframes` 已經寫了，但 `animation` 沒有持續時間。動畫會不會播？`prefers-reduced-motion: reduce` 時應關掉哪一類效果？

### 用開發者工具除錯

樣式沒有出現時，先分清楚是選錯節點、規則沒打中、被另一條蓋過，還是值本身無效。Chrome 按 <kbd>F12</kbd>，主畫面用 **Elements**。下面這份故意留了劃掉的宣告與拼錯的屬性。

{% note primary %}
**素材準備**
面板名稱以 Chrome 英文介面為準：**Elements**、**Styles**、**Computed**、**Layout**。改動只活在這一次重新整理之前。確定之後再寫回檔案。
{% endnote %}

#### Styles 與 Computed

**Styles** 列出打到這個節點的規則，上面的蓋過下面的。同規則後面又寫的屬性會把前面劃掉。屬性名稱拼錯，整條宣告丟掉。**Computed** 是算完層疊、繼承、變數之後的最終值。使用者代理樣式比你的作者樣式弱。拼錯的屬性不會出現在 Console，只會出現在 Styles。

#### 盒子、狀態與斷點

選中元素時，盒子圖會標出 content、padding、border、margin。`:hov` 可以強制 `:hover` 或 `:focus-visible`，不必真的把指標放上去。`:hover` 若寫在 `@media (hover: hover)` 裡面而查詢不成立，光勾 :hov 也不會套用。命令選單（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>）輸入 `Rendering`，可模擬 `prefers-color-scheme` 與 `prefers-reduced-motion`。裝置工具列（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>）用來走斷點。測完改回 No emulation。

#### 動畫面板

命令選單輸入 `Animations`，選 **Show Animations**。打開之後再重新整理，進場與循環會出現在時間軸上。這個面板用來確認「有沒有在播」。**Network** 負責檔案沒載入。

```html inspect.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>除錯</title>
    <style>
      :root { --ink: #134e4a; --paper: #fff; }
      body {
        margin: 1.5rem;
        color: var(--ink);
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .ticket {
        box-sizing: border-box;
        width: 18rem;
        padding: 1rem;
        border: 4px solid #0f766e;
        background: var(--paper);
        color: #94a3b8;
        colour: red;
        color: var(--ink);
      }

      #featured { color: #9f1239; }
    </style>
  </head>
  <body>
    <article id="featured" class="ticket">
      <h1>票卡</h1>
      <p>字色來自 id。灰色 color 有刪除線，colour 無效。重新整理後面板修改會消失。</p>
    </article>
  </body>
</html>
```

{% note success %}
**跟著做**
選中 `#featured`。在 Styles 取消勾選 id 的 `color`，字色應落到 `var(--ink)`。勾回去，玫瑰紅回來。重新整理後，面板上的修改不見了，要寫回 `<style>` 再存檔。
{% endnote %}

##### 用 AI 練習

在「響應式變數與動態」筆記本問。改數值、看為什麼沒存進檔案，改去聊天室。

- Styles 裡灰色 `color` 有刪除線、`colour` 無效，最終字色來自哪一條？
- 我在 Styles 改了 padding，重新整理後不見了。檔案有沒有被改到？確認之後該把值寫回哪裡？

{% note primary %}
**整理成你的 AI 筆記**
請「響應式變數與動態」筆記本出三題（`min-width` 斷點、自訂屬性備援、轉場與減少動態）、列出五個關鍵字、畫一張「流動版面 → 查詢 → 代幣」心智圖。把回答存成筆記。
{% endnote %}

## 選讀：邊界與進階動效

這一節可以整節跳過。外距穿出、邏輯方向、float 繞排、立體翻面、容器查詢與可補間的代幣，都是前面示範的延伸。要看可跑寫法，交給聊天室，再以 MDN 查證。

### 外距穿出與邏輯方向

子層外距有時會穿出父層。由右至左的介面改用邏輯屬性。見 [MDN：邏輯屬性與邏輯值](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_logical_properties_and_values)。

#### 外距穿出

子層 `margin-top` 穿出時，父層設 `display: flow-root`，背景才包得住。加一點 `padding-top` 也能擋。其餘擋法請問 AI 並以 MDN 查證。

#### 邏輯方向

`margin-inline` 是行內方向兩側，`margin-block` 是區塊方向。課堂範本仍寫物理方向，讀得到邏輯屬性即可。

#### 層疊情境與多行省略

`opacity` 小於 1 或 `transform` 不是 `none`，會開新的層疊情境，子孫的 `z-index` 出不去。多行省略常見 `-webkit-line-clamp`，這組前綴只用於省略，其他屬性不要加。

### float 只留繞排

`float` 讓文字沿著圖走，不是拿來切多欄。見 [MDN：float](https://developer.mozilla.org/zh-TW/docs/Web/CSS/float)。

#### 繞排與父層高度

`float: left` 把圖撥到左側，後面的文字沿著右邊走。短文時父層可能包不住圖，加上 `display: flow-root`。舊的 `clear: both` 讀到時改成 `flow-root`。

#### 不要拿來做多欄

多欄用 Grid 的 `repeat()` 加 `gap`。`display: contents` 會讓盒子消失，也影響無障礙樹，課堂不要用來少包一層。其餘排版值請問 AI 並以 MDN 查證。

### 立體翻面

平面旋轉看不出厚度。翻面要視距，以及把背面藏起來。見 [MDN：perspective](https://developer.mozilla.org/zh-TW/docs/Web/CSS/perspective)。

#### 視距與背面

父層給 `perspective`，卡片轉 Y 軸，背面用 `backface-visibility: hidden`。必要資訊不要只放在翻面之後。其餘立體函式請問 AI 並以 MDN 查證。

### 容器查詢

媒體查詢看視窗。卡片要不要改排，有時該看容器寬度。見 [MDN：CSS 容器查詢](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_containment/Container_queries)。

#### 依容器寬度改排版

`container-type: inline-size` 標成查詢容器，`@container` 看這個容器的寬。頁首與側欄仍用視窗查詢。同一視窗裡，窄欄與寬欄可以排得不一樣。

#### 動態視窗高度

`100vh` 在手機上常把網址列算進去。要跟此刻看得到的高度走，用 `100dvh`。一般區塊讓內容把高度撐開。其餘視窗單位請問 AI 並以 MDN 查證。

### 把變數註冊成可補間

沒有註冊的自訂屬性只是一串符號，顏色不會補間。`@property` 用來聲明語法。見 [MDN：@property](https://developer.mozilla.org/zh-TW/docs/Web/CSS/@property)。

#### 語法與初始值

`transition: --brand 300ms` 會跳色，因為瀏覽器不知道它是顏色。`@property` 的 `syntax` 寫錯時整組無效。沒註冊就直接轉場 `background-color`。

##### 用 AI 練習

選讀可以整節跳過。若要問，在「選讀」筆記本一次只問一種寫法，並對照前面已經用過的 Flex、Grid 或 `transition`。寫檔改去聊天室。

- 圖旁要繞一段說明。`float: left` 在做什麼？父層為什麼用 `display: flow-root`？
- 同一張卡片在窄側欄與寬主文，視窗寬度相同。`@container` 與 `@media` 各看誰？`100vh` 與 `100dvh` 差在哪？
- `transition: --brand 300ms` 時顏色瞬間跳過去。沒有 `@property` 時自訂屬性為什麼不能補間？

{% note primary %}
**整理成你的 AI 筆記**
請「選讀」筆記本出三題（外距穿出、float 與多欄、容器查詢和 `@property`）、列出五個關鍵字、畫一張「視窗查詢／容器查詢」心智圖。把回答存成筆記。
{% endnote %}

## 本篇重點回顧

下面只收這篇用過的觀念。屬性與取值的其餘細節，問免費聊天室或 NotebookLM，再以 MDN 與 F12 查證。

### 選擇器到欄位

誰被選到、字與底怎麼畫、盒子佔多大，決定之後才談一個方向或欄與列。見 [MDN：權重](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_cascade/Specificity)。

#### 從選擇器到 Grid

選擇器、四欄權重與繼承決定規則打到誰。單位用 `rem`，背景先寫的圖層在上面。盒子用 `border-box`，垂直外距合併取較大的那個。Flex 排一個方向，Grid 排欄與列，縫用 `gap`。

### 媒體查詢與代幣

窄畫面先能讀，結構要變才寫查詢；重複的色與間距收成會繼承的代幣。見 [MDN：使用媒體查詢](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_media_queries/Using_media_queries)。

#### 流動與斷點

先做換行、`minmax`、`max-width: 100%`。`min-width` 由小到大往下寫，查詢看視窗。查詢裡的 `rem` 不受 `html` 字級影響。`print` 拿掉導覽並改成白底黑字。

#### 自訂屬性

`--` 宣告、`var()` 取用，會繼承。全站放 `:root`，區塊換膚就覆寫同名變數。備援只在名字沒定義時使用。型別不合時那條作廢，改走繼承。

### 轉場、動畫與除錯

變形不改佔位，轉場連接兩個狀態，動畫自己播。對不上時看開發者工具的最終值。見 [MDN：使用 CSS 轉場](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)。

#### 變形、轉場與關鍵影格

位移用獨立的 `translate`，避免把 `rotate` 清掉。`transition` 逐條列出屬性。懸停包在 `(hover: hover) and (pointer: fine)`。沒寫動畫持續時間就等於 0 秒。減少動態時關掉裝飾動畫。

#### 面板上的最終值

**Styles** 看刪除線與無效宣告，**Computed** 看最終值。面板修改重新整理就沒了。float、翻面、容器查詢與 `@property` 在選讀。NotebookLM 引用來源並存成 AI 筆記；寫程式與除錯用免費聊天室或 Copilot Free。

{% note primary %}
**整理成你的 AI 筆記**
請五個筆記本各存一則總結：這章三個最容易跟 MDN 對不上的句子，以及你會拿哪一個示範檔去 F12 查證。
{% endnote %}
