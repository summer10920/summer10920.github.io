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

CSS（Cascading Style Sheets，層疊樣式表）決定頁面長什麼樣子：顏色、字級、背景，以及盒子怎麼排。HTML 負責這一頁有什麼，CSS 負責那些東西怎麼呈現。

<!-- more -->

預覽與除錯以 Chrome 為準。按 <kbd>F12</kbd>，打開 Elements，右側 Styles 看規則有沒有打中，Computed 看最後用上的值。被劃掉的宣告代表沒有留下。

# 規則怎麼套上元素

樣式表是一組規則。瀏覽器先讀 HTML，再把對得上的規則套上去，最後才排版與繪製。很多條搶同一個屬性時，靠權重與層疊決定留下哪一條；沒有人寫的屬性，才談繼承。

外部檔是實務做法。為了閱讀方便，課堂 demo 把樣式寫在同一份 HTML 的 `style` 裡。只有「三種寫法」仍用外部樣式表，用來練習 `link` 的路徑。

## 觀念與引入

一條規則先選到元素，再寫要改的屬性；你改的是這份文字，不是在畫面上直接塗色。存檔後重新整理，瀏覽器才會再跑一次。

{% mermaid graph LR %}
html["HTML 元素"] --> sel["選擇器打中誰"]
sel --> decl["宣告：屬性與值"]
decl --> used["套用後的外觀"]
{% endmermaid %}

### 規則的零件

一條規則分成「選到誰」和「設什麼」，大括號裡可以有很多行，每一行以分號結尾。這一節只用顏色、字級、字重當例子，間距與邊框後面才畫。

**觀念**

- 選擇器寫在大括號前面，決定打到哪些元素。
- 每一行宣告是屬性、冒號、值、分號。同一個屬性寫兩次，留下較下面那次。
- 屬性名稱拼錯時，瀏覽器只丟掉那一行，同一條規則的其他宣告仍然有效。
- 逗號讓多個選擇器共用同一組宣告。註解包在樣式表的註解符號裡，HTML 的註解寫進來不會被當成註解。

```html 03-css/pages/01-syntax.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>一條規則</title>
    <style>
      /* 選擇器 { 屬性: 值; }    HTML 註解寫在這裡不會生效 */

      h1,
      h2 {
        font-weight: 700; /* 逗號：兩條選擇器共用，權重不會相加 */
      }

      h1 {
        color: #99f6e4; /* 同屬性寫兩次，這行會被下一行蓋掉 */
        colour: red; /* 拼錯，只丟掉這一行，標題不會變紅 */
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
    <p class="lead">標題應是深青綠，不是紅色。</p>
    <h2>次標題跟主標題共用字重</h2>
    <p>這段沒有自己的 class，字級是瀏覽器預設。</p>
  </body>
</html>
```

**解析**

- 畫面上一顆較大的深青綠標題，下面一行稍大的導言，再一顆粗體次標題，最後是瀏覽器預設大小的段落。
- 次標題沒有自己的顏色，所以不是深青綠。
- 按 <kbd>F12</kbd> 點標題。
- Styles 裡第一個顏色和拼錯的那行會被劃掉或標成無效，留下深青綠與字級。
- 導言只有字級，沒有自己的顏色規則。

```css
h1 {
  color: #99f6e4; /* 被下面那行蓋掉 */
  colour: red; /* 無效的屬性名 */
  color: #115e59; /* 留下這個 */
}
```

{% note info %}
**Styles 面板**
點一個節點後，Styles 由上到下是較優先的規則，被劃掉的是沒贏的宣告，Computed 則是最後算完的值。
{% endnote %}

{% note success %}
**換你試試：**
加一顆 h3，文字寫「行前準備」，讓它跟 h1、h2 共用同一組字重。再把 h1 最後留下的顏色改成 `#0f766e`。
{% endnote %}

<details>
<summary>參考答案</summary>

h3 寫進逗號那一組，所以跟前兩顆標題一樣是粗體，但不繼承 h1 的深色與字級。h1 同屬性仍是較下面那行留下，所以標題變成另一階青綠。

```diff 03-css/pages/01-syntax.html
  // ...
      <title>一條規則</title>
      <style>
- 
        h1,
-       h2 {
-         font-weight: 700; /* 逗號：兩條選擇器共用，權重不會相加 */
+       h2,
+       h3 {
+         font-weight: 700;
        }
  
        h1 {
-         color: #99f6e4; /* 同屬性寫兩次，這行會被下一行蓋掉 */
-         colour: red; /* 拼錯，只丟掉這一行，標題不會變紅 */
-         color: #115e59;
+         color: #99f6e4;
+         colour: red;
+         color: #0f766e;
          font-size: 1.75rem;
        }
        // ...
      <h2>次標題跟主標題共用字重</h2>
      <p>這段沒有自己的 class，字級是瀏覽器預設。</p>
+     <h3>行前準備</h3>
    </body>
  </html>
```

</details>

### 三種寫法

樣式可以寫在標籤上、寫在這一頁的 style 裡，或寫成獨立檔再用 link 掛上，這一頁三種都看得到。多頁網站把共用的規則放進獨立檔，改一次，每一頁一起變。

**觀念**

- 行內寫在開始標籤的 style 屬性。那裡只能寫宣告，不能寫選擇器。
- 頁內寫在 head 的 style 標籤，只服務這一頁。
- 外部檔用 link 掛上，路徑相對這份 HTML。檔案順序較晚的，在權重相同時算較後面。
- 這一節的獨立檔就是頁面掛上的那份樣式表。

```html 03-css/pages/02-where.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 寫在哪</title>
    <link rel="stylesheet" href="02-where.css" />
    <style>
      .from-page {
        color: #b45309; /* 頁內：只在這份 HTML */
      }
    </style>
  </head>
  <body>
    <h1>三種地方都可以寫</h1>
    <p style="color: #9f1239">這行的顏色寫在開始標籤上。</p>
    <p class="from-page">這行的顏色寫在這頁的 style。</p>
    <p class="from-file">這行的顏色寫在外部樣式表。</p>
  </body>
</html>
```

```css 03-css/pages/02-where.css
.from-file {
  color: #115e59;
  font-weight: 700;
}
```

**解析**

- 三行字顏色不同。
- 第一行玫瑰紅，來自標籤上的 style。
- 第二行琥珀色，來自這一頁的 style 標籤。
- 第三行深青綠而且較粗，來自 link 掛上的檔案。
- 把 href 改成不存在的檔名，重新整理後第三行會失去深色與粗體，前兩行不受影響。
- F12 的 Network 會看到那份樣式表失敗。

```css
.from-file {
  color: #115e59; /* 只有 link 成功才會出現在 Styles */
  font-weight: 700;
}
```

{% note warning %}
**行內樣式很難再改**
標籤上的 style 比樣式表裡的一般宣告優先。版面與品牌色留在樣式表，不要塗在標籤上。
{% endnote %}

{% note success %}
**換你試試：**
拿掉第一行的 style 屬性，改加 class `from-inline`。在外部樣式表給這個 class 顏色 `#9f1239`。畫面第一行仍是玫瑰紅，但顏色改由外部檔負責。
{% endnote %}

<details>
<summary>參考答案</summary>

第一行不再把顏色寫在標籤上，所以之後要改色只要動樣式表。頁內的琥珀色與外部的深青綠維持原樣，三行仍是三種顏色。

```diff 03-css/pages/02-where.html
  // ...
      <style>
        .from-page {
-         color: #b45309; /* 頁內：只在這份 HTML */
+         color: #b45309;
        }
      </style>
    // ...
    <body>
      <h1>三種地方都可以寫</h1>
-     <p style="color: #9f1239">這行的顏色寫在開始標籤上。</p>
+     <p class="from-inline">這行的顏色寫在開始標籤上。</p>
      <p class="from-page">這行的顏色寫在這頁的 style。</p>
      <p class="from-file">這行的顏色寫在外部樣式表。</p>
    // ...
```

```css 03-css/pages/02-where.css
.from-inline {
  color: #9f1239;
}

.from-file {
  color: #115e59;
  font-weight: 700;
}
```

</details>

## 選擇器與權重

選擇器是規則的前半。打不中，後面的宣告就不會出現在那個節點的 Styles 裡。很多條都打中同一個屬性時，再用權重與原始碼順序決定留下哪一條。

### 元素、class 與 id

先分清元素、class 與 id。class 在 HTML 寫在 class 屬性，樣式表多一個點；id 在 HTML 寫在 id 屬性，樣式表多一個 `#`。一個元素可以同時有多個 class，中間用空格分開。

**觀念**

- 元素選擇器打到所有該標籤。class 可以重複用在很多元素。id 在一份文件裡只給一個元素。
- 兩個 class 寫在一起、中間沒有空格，表示同一個元素上兩個都要有。
- 會重複出現的樣式用 class。id 留給全頁只有一個、而且錨點需要的名字，不要拿來把權重拉高。

```html 03-css/pages/03-selectors-basic.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>基本選擇器</title>
    <style>
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
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <h1>選擇器決定規則打到誰</h1>
    <p>元素選擇器：這段是石板色。</p>
    <p class="tour">class：行程用字。同一個 class 可以再出現一次。</p>
    <p class="tour">另一段行程，顏色跟上面那行相同。</p>
    <p class="tour soldout">兩個 class 都在：字是灰的，而且有刪除線。</p>
    <p id="featured">id：全頁這一個，字重較粗。</p>
  </body>
</html>
```

**解析**

- 第一段是石板色，因為只有元素選擇器打中它。
- 兩段帶 tour 的字是深青綠。
- 同時帶 soldout 的那段是灰色加上刪除線：刪除線來自 soldout，灰色來自兩個 class 寫在一起的那條，它比單獨的 tour 更具體，所以顏色不留深青綠。
- 帶 id 的那段沒有 tour，所以仍是元素選擇器的石板色，另外較粗。
- 不要把同一個 id 複製到第二個元素。

```css
.tour {
  color: #0f766e; /* 只有 tour 時留下 */
}
.tour.soldout {
  color: #64748b; /* 兩個 class 都在時，顏色改留這條 */
}
```

{% note info %}
**打不中時先對名字**
Styles 裡完全沒有你寫的那條，多半是 class 拼字，或 `style` 沒存檔。先對 HTML 的 class 與選擇器，再談誰蓋過誰。
{% endnote %}

{% note success %}
**換你試試：**
新增 class `hot`，顏色設成 `#9f1239`。把第二段帶 tour 的段落改成同時有 tour 與 hot。再寫一條中間沒有空格的規則，讓「兩個都在」時顏色留下玫瑰紅，而不是深青綠。
{% endnote %}

<details>
<summary>參考答案</summary>

第二段同時有兩個 class，沒有空格的那條打中它，所以是玫瑰紅。第一段只有 tour，仍是深青綠。售完那段仍走原來的灰色與刪除線。

```diff 03-css/pages/03-selectors-basic.html
  // ...
          color: #0f766e;
        }
  
+       .hot {
+         color: #9f1239;
+       }
+ 
+       .tour.hot {
+         color: #9f1239;
+       }
+ 
        .soldout {
          text-decoration: line-through;
        // ...
      <p>元素選擇器：這段是石板色。</p>
      <p class="tour">class：行程用字。同一個 class 可以再出現一次。</p>
-     <p class="tour">另一段行程，顏色跟上面那行相同。</p>
+     <p class="tour hot">另一段行程，顏色跟上面那行相同。</p>
      <p class="tour soldout">兩個 class 都在：字是灰的，而且有刪除線。</p>
      <p id="featured">id：全頁這一個，字重較粗。</p>
    // ...
```

</details>

### 組合關係

組合是在基本選擇器之間加上關係，包括後代、直接子層、緊鄰的下一個，以及後面的兄弟。這些符號都算在同一條選擇器裡；逗號則是拆成多條。

**觀念**

- 空格是後代：祖先裡面任何深度都算。
- 大於符號只算直接小孩。
- 加號只算緊接在後面的那一個兄弟。波浪符號算同一個父層裡、後面的全部兄弟。
- 後代選擇器很容易打到後來才嵌進去的元素。能用 class 說清楚的，就少靠很深的空格。

```html 03-css/pages/04-selectors-combine.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>組合選擇器</title>
    <style>
      article p {
        color: #0f766e; /* 後代：任何深度的 p */
      }

      article > .direct {
        font-weight: 700; /* 只限 article 的直接小孩 */
      }

      h2 ~ p {
        color: #475569; /* 同一個父層裡，h2 之後的 p */
      }

      .stops li + li {
        text-decoration: line-through; /* 緊接在 li 後面的那個 li */
      }
    </style>
  </head>
  <body>
    <h1>關係寫在選擇器中間</h1>
    <article>
      <p class="direct">這段是 article 的直接小孩，所以較粗，也有深色。</p>
      <div>
        <p>後代仍打得到這段，直接子層打不到，所以不會變粗。</p>
      </div>
    </article>
    <h2>相鄰與後面的兄弟</h2>
    <p>這個標題後面的段落會改成石板色。</p>
    <p>這段也在標題後面，同樣改色。</p>
    <ul class="stops">
      <li>台北</li>
      <li>這一項起才有刪除線</li>
      <li>濟州</li>
    </ul>
  </body>
</html>
```

**解析**

- article 裡兩段都是深青綠，因為後代選擇器不管中間有沒有多包一層 div。
- 較粗的只有直接小孩那一段。
- h2 後面的兩段都變成石板色，波浪符號把它們都算進去。
- 清單第一項沒有刪除線，從第二項開始才有，因為加號要求「緊接在另一個 li 後面」。

```css
article p {
  color: #0f766e; /* 孫層也打得到 */
}
article > .direct {
  font-weight: 700; /* 孫層打不到 */
}
```

{% note success %}
**換你試試：**
標題後面只有緊鄰的第一段要變成石板色，再下一段恢復預設。把波浪符號改成加號。清單維持原樣。
{% endnote %}

<details>
<summary>參考答案</summary>

加號只打緊接在 h2 後面的那一個 p，所以只有第一段是石板色。再下一段不再被這條打中，顏色回到瀏覽器預設。清單的加號沒有改。

```diff 03-css/pages/04-selectors-combine.html
  // ...
      <style>
        article p {
-         color: #0f766e; /* 後代：任何深度的 p */
+         color: #0f766e;
        }
  
        article > .direct {
-         font-weight: 700; /* 只限 article 的直接小孩 */
+         font-weight: 700;
        }
  
-       h2 ~ p {
-         color: #475569; /* 同一個父層裡，h2 之後的 p */
+       h2 + p {
+         color: #475569;
        }
  
        .stops li + li {
-         text-decoration: line-through; /* 緊接在 li 後面的那個 li */
+         text-decoration: line-through;
        }
      </style>
    // ...
```

</details>

### 偽類與偽元素

偽類描述狀態或在父層的第幾個，偽元素描述元素生出來的一個裝飾片段。兩者都接在選擇器後面。這一節仍只用已經見過的顏色、字重、刪除線，加上這裡才出現的 content。

**觀念**

- 偽類寫一個冒號，權重算在 class 那一欄。偽元素寫兩個冒號，權重算在元素那一欄。
- 連結四態要照固定順序寫，否則同權重時前面的規則會蓋掉後面的狀態。指標放上去、鍵盤把焦點帶進來，是其中兩種狀態。
- 結構偽類看的是在父層的第幾個小孩。第一個小孩若是標題，段落的 first-child 就打不中；first-of-type 才是「該標籤的第一個」。
- before 必須寫 content 才看得到。價格數字仍留在 HTML，裝飾只是前面多出來的字。

```html 03-css/pages/05-selectors-pseudo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>偽類與偽元素</title>
    <style>
      /* 順序：link、visited、hover、active。顛倒時，後面的狀態會被蓋掉 */
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
        color: #115e59;
      }

      .days li:nth-child(odd) {
        color: #0f766e;
      }
      .days li:nth-child(2) {
        font-weight: 700;
      }

      .pitfall p:first-child {
        color: #9f1239; /* 打不中：第一個小孩是 h2 */
      }
      .pitfall p:first-of-type {
        color: #0f766e;
      }

      .price::before {
        content: "NT$ ";
      }

      input[type="email"] {
        color: #0f766e;
      }
      input::placeholder {
        color: #94a3b8;
      }
      input:disabled {
        color: #94a3b8;
      }
    </style>
  </head>
  <body>
    <h1>狀態、位置、裝飾</h1>
    <p><a href="#days">把滑鼠放上來，再用 Tab 走進來</a></p>
    <ul class="days" id="days">
      <li>奇數項</li>
      <li>第二項較粗</li>
      <li>奇數項</li>
      <li>第四項</li>
    </ul>
    <section class="pitfall">
      <h2>不是第一個小孩</h2>
      <p>這段是深青綠。第一個小孩是標題，所以段落不是第一個小孩。</p>
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

**解析**

- 連結預設是深青綠。
- 滑鼠放上去變成玫瑰紅，按住時變成琥珀色。
- 用 <kbd>Tab</kbd> 走進來時，字變成另一階深青綠。
- 曾點過的連結可能變成紫色，現代瀏覽器幾乎只讓這個狀態改顏色。
- 清單的第 1、3 項是深青綠，第 2 項較粗。
- 標題下面那段不是玫瑰紅，因為它不是父層的第一個小孩。
- 它是第一個段落，所以留下深青綠。
- 價格前面多出 NT$，HTML 裡仍只有數字。
- 信箱欄的字是深青綠，提示字與停用欄是淺灰。

```css
.pitfall p:first-child {
  color: #9f1239; /* 第一個小孩是 h2，這條沒打中 */
}
.price::before {
  content: "NT$ "; /* 沒寫 content 就不會出現 */
}
```

{% note warning %}
**裝飾不能是唯一的資訊**
before 拿掉之後，HTML 裡的文字仍要讀得懂。清單若用奇數項上色，要先確認項目中間沒有插進別的標籤，否則奇偶會位移。
{% endnote %}

{% note success %}
**換你試試：**
奇數項改成偶數項才是深青綠。價格前面的裝飾改成「約 NT$」。連結四態的順序不要調換。
{% endnote %}

<details>
<summary>參考答案</summary>

nth-child 的括號改成 even 之後，第 2、4 項是深青綠，第 1、3 項回到預設。第 2 項仍較粗。價格前面的字變成「約 NT$」，數字還在 HTML 裡。

```diff 03-css/pages/05-selectors-pseudo.html
  // ...
          color: #115e59;
        }
  
-       .days li:nth-child(odd) {
+       .days li:nth-child(even) {
          color: #0f766e;
        }
        // ...
        }
  
        .pitfall p:first-child {
-         color: #9f1239; /* 打不中：第一個小孩是 h2 */
+         color: #9f1239;
        }
        .pitfall p:first-of-type {
          // ...
        }
  
        .price::before {
-         content: "NT$ ";
+         content: "約 NT$ ";
        }
  
        input[type="email"] {
          // ...
```

</details>

### 四欄權重

權重（specificity）用來比較哪一條選擇器比較具體。先看有沒有 important，再由左到右比四欄，欄與欄不進位。四欄也相同時，原始碼較後面的贏。

**觀念**

比較同一個元素、同一個屬性時，順序是：

- 有 important 的贏過沒有的。
- 再比四欄，由左到右：行內樣式、id、class（含屬性選擇器與偽類）、元素（含偽元素）。某一欄較大就贏，不會進位。
- 十個 class 加起來仍是 class 那一欄的數字，比不過 id 那一欄的 1。
- 權重相同時，寫在較下面的贏。同一份 `style` 裡是這樣；外部樣式表則是較晚掛上的檔案算較後面。

```html 03-css/pages/06-specificity.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>權重</title>
    <style>
      /* 四欄由左到右，不進位：行內、id、class、元素 */

      p {
        color: #475569; /* 元素欄 */
      }

      .note {
        color: #b45309; /* class 欄，贏過元素 */
      }

      #one {
        color: #0f766e; /* id 欄，贏過 class */
      }

      .chip {
        color: #0369a1;
      }

      .chip {
        color: #115e59; /* 權重相同，較下面的贏 */
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
    <p class="note">加上 class：琥珀色。</p>
    <p id="one" class="note">同時有 id 與 class：深青綠。</p>
    <p id="two" class="note" style="color: #9f1239">行內樣式：玫瑰紅。</p>
    <p class="chip">同權重寫了兩次，留下較下面的深青綠。</p>
    <p class="force">這段用了 important，留下玫瑰紅。</p>
  </body>
</html>
```

**解析**

- 第一段只有元素選擇器，是石板色。
- 帶 note 的變成琥珀色。
- 同時有 id 的那段是深青綠，因為 id 那一欄比 class 那一欄優先，就算它也帶著 note。
- 再下一段的玫瑰紅寫在標籤上，贏過樣式表裡的一般宣告。
- chip 兩條權重相同，F12 會看到第一個顏色被劃掉，留下深青綠。
- force 的灰色也被劃掉，因為下一條帶了 important。

```css
#one {
  color: #0f766e; /* id 欄有 1，class 欄有 1 仍輸 */
}
.chip {
  color: #115e59; /* 跟上一條 .chip 同權重，位置較下 */
}
```

{% note danger %}
**不要用 important 解權重**
下一個人只能再寫一個 important 才能蓋掉；id 寫很多、選擇器拉很長，也是同一類問題。先把 class 取清楚，再調整順序。
{% endnote %}

{% note success %}
**換你試試：**
拿掉 force 的 important。改成給那段一個 id `sale`，用 id 選擇器把顏色設成 `#9f1239`。玫瑰紅仍要留下，而且不靠 important。
{% endnote %}

<details>
<summary>參考答案</summary>

id 那一欄比 class 那一欄優先，所以 sale 的玫瑰紅蓋過 force 的灰色。畫面上這段仍是玫瑰紅，Styles 裡不會再看到 important。

```diff 03-css/pages/06-specificity.html
  // ...
      <title>權重</title>
      <style>
- 
        p {
-         color: #475569; /* 元素欄 */
+         color: #475569;
        }
  
        .note {
-         color: #b45309; /* class 欄，贏過元素 */
+         color: #b45309;
        }
  
        #one {
-         color: #0f766e; /* id 欄，贏過 class */
+         color: #0f766e;
        }
  
        .chip {
          // ...
        }
  
        .chip {
-         color: #115e59; /* 權重相同，較下面的贏 */
+         color: #115e59;
        }
  
        .force {
          color: #94a3b8;
        }
  
-       .force {
-         color: #9f1239 !important;
+       #sale {
+         color: #9f1239;
        }
      </style>
    // ...
      <p id="two" class="note" style="color: #9f1239">行內樣式：玫瑰紅。</p>
      <p class="chip">同權重寫了兩次，留下較下面的深青綠。</p>
-     <p class="force">這段用了 important，留下玫瑰紅。</p>
+     <p id="sale" class="force">這段用了 important，留下玫瑰紅。</p>
    </body>
  </html>
```

</details>

## 繼承與層疊

層疊（cascade）決定很多宣告搶同一個屬性時誰留下：來源、important、權重、原始碼順序。繼承（inheritance）是另一件事：這個元素根本沒有人寫這個屬性時，要不要沿用父層已經算出來的值。

{% mermaid graph TD %}
hit["這個元素有人寫了該屬性"] --> imp["先看 important"]
imp --> spec["再比四欄權重"]
spec --> order["再看誰寫在後面"]
miss["沒有人寫這個屬性"] --> inh["可繼承的跟父層"]
miss --> init["不可繼承的用初始值"]
{% endmermaid %}

瀏覽器自己也有一份樣式表，優先順序低於你寫的規則。連結預設有底線、標題預設比較大，都是它先套的。你的規則寫出來之後才改掉那些預設。

### 什麼會繼承

沒有人寫的屬性，才會談到跟不跟父層：跟字有關的多半會跟，跟盒子有關的多半不會。自己寫了同一個屬性，繼承就停在這一層。

**觀念**

- 會繼承的例如顏色、字型、字級、字重、行高、對齊。
- 不會繼承的例如外距、內距、邊框、背景、寬度。子層是透明底時，你看到的是父層背景透出來，不是子層繼承了背景。
- 行高若寫成沒有單位的數字，子層會用自己的字級去乘。寫成固定像素時，子層字變大，行高仍是那個像素。

```html 03-css/pages/07-inherit.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>繼承</title>
    <style>
      .story {
        color: #7c2d12;
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
      <p>這段沒寫顏色，所以跟 article 的磚紅。底色是父層透出來的，不是這段自己的背景。</p>
      <p class="price">這段自己寫了顏色，不再跟父層。</p>
    </article>
    <p>article 外面這段不跟那塊磚紅。</p>
  </body>
</html>
```

**解析**

- article 裡的標題和第一段都是磚紅色，它們沒有自己的顏色規則，所以跟父層。
- 淺底只塗在 article 上，段落沒有自己的背景，你看到的是父層的底透出來。
- 帶 price 的那段自己寫了顏色，繼承停住，字是深青綠，底仍是父層透出來的淺色。
- article 外面那段不在這個父層裡，顏色回到瀏覽器預設。

```css
.story {
  color: #7c2d12; /* 子層沒寫 color 就跟這個 */
  background: #fff7ed; /* 背景不繼承，只是從下面透出來 */
}
```

{% note success %}
**換你試試：**
拿掉 price 自己的顏色，讓那段也跟父層的磚紅。article 的底色不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

price 不再寫顏色之後，兩段正文都跟 article 的磚紅。淺底仍只在父層，段落自己還是沒有背景。

```diff 03-css/pages/07-inherit.html
  // ...
          background: #fff7ed;
        }
- 
-       .price {
-         color: #115e59;
-       }
      </style>
    </head>
    // ...
```

</details>

### 四個關鍵字

值也可以寫成關鍵字，強迫這一次要跟父層，或回到這個屬性自己的起點。initial 不是「回到我上一條規則」。

**觀念**

- inherit：跟父層算出來的值。連平常不繼承的屬性也跟。
- initial：回到這個屬性自己的初始值。顏色會回到瀏覽器定義的字色，不是你寫在 body 上的顏色。
- unset：會繼承的當成 inherit，不會繼承的當成 initial。
- revert：丟掉你寫的作者樣式，回到瀏覽器那一層。標題會變回預設的大小與粗細。

```html 03-css/pages/08-keywords.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>繼承關鍵字</title>
    <style>
      .keywords {
        color: #1d4ed8;
      }

      .in {
        color: inherit;
      }

      .init {
        color: initial;
      }

      .un {
        color: unset;
      }

      .back h2 {
        font-size: 1rem;
        font-weight: 400;
        font-size: revert;
        font-weight: revert;
      }
    </style>
  </head>
  <body>
    <h1>明示跟父層，或回到初始</h1>
    <div class="keywords">
      <p class="in">inherit：字跟父層的藍。</p>
      <p class="init">initial：字回到屬性初始值。</p>
      <p class="un">unset：顏色會繼承，所以仍是藍字。</p>
    </div>
    <section class="back">
      <h2>這顆標題用了 revert，字級與字重回到瀏覽器預設。</h2>
    </section>
  </body>
</html>
```

**解析**

- 父層是藍字。
- inherit 那段仍是藍的。
- initial 那段回到瀏覽器的初始字色，不是藍。
- unset 對顏色來說等於繼承，所以還是藍的。
- 下面那顆標題先被設成較小、較細，接著 revert 把這兩項交回瀏覽器，標題又變大、變粗。
- F12 點它，會看到你寫的字級被 revert 蓋過。

```css
.init {
  color: initial; /* 不是回到父層的藍 */
}
.back h2 {
  font-size: revert; /* 回到瀏覽器預設的標題大小 */
}
```

{% note success %}
**換你試試：**
讓 initial 那段改跟父層，把關鍵字從 initial 換成 inherit。revert 那顆標題不要動。
{% endnote %}

<details>
<summary>參考答案</summary>

initial 換成 inherit 之後，三段都是藍字。標題仍走 revert，大小與粗細維持瀏覽器預設。

```diff 03-css/pages/08-keywords.html
  // ...
        }
  
        .init {
-         color: initial;
+         color: inherit;
        }
  
        .un {
          // ...
```

</details>

# 字、色與背景

規則打中之後，值要寫成瀏覽器讀得懂的長度與顏色，再決定字怎麼排、底怎麼畫。跟字有關的屬性多半會繼承，背景預設不繼承。

## 單位與顏色

長度與顏色是宣告裡最常出現的兩種值。這一節先把字級、行寬和色票定下來，寬高怎麼跟邊框一起算，留到盒子那一節再細算。

### 長度

長度用來寫字級與寬度，內文以 rem 為主。em 會跟著父層疊乘，所以元件裡的字級用 rem，比較不會因為多包一層就突然變大。

**觀念**

- px 是 CSS 像素。髮絲線才常用它。這一頁把根字級設成 16px，只為了讓 Computed 的數字好對。
- em 用在字級上時，相對父層的字級。父層已經放大，子層再寫 em，乘的是放大後的父層。
- rem 相對根元素的字級，不受中間那層影響。
- 百分比的寬度相對包含區塊。ch 大約是該字型裡「0」的寬度，用來收行寬。vw 是視窗寬度的百分之一。

```html 03-css/pages/09-units.html
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

      .em-box {
        font-size: 1.25em;
        background: #f0fdfa;
      }

      .em-child {
        font-size: 2em; /* 1.25 × 2 × 16px */
      }

      .rem-box {
        font-size: 1.25rem;
        background: #ecfeff;
      }

      .rem-child {
        font-size: 2rem; /* 2 × 16px，不乘父層 */
      }

      .meter {
        width: 16rem;
        background: #ccfbf1;
      }

      .half {
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
    <p>這頁把根字級設成 16px，只為了讓 Computed 好對。</p>
    <div class="em-box">
      父層 1.25em
      <p class="em-child">子層 2em，相對父層，約 40px。</p>
    </div>
    <div class="rem-box">
      父層 1.25rem
      <p class="rem-child">子層 2rem，相對根元素，約 32px。</p>
    </div>
    <div class="meter">
      <div class="half">父層一半寬</div>
    </div>
    <p class="measure">這段最寬約 36 個 0 的寬度。中文不會剛好 36 個字，行寬仍收得住。</p>
    <p class="vw-title">這行會跟著視窗寬度變</p>
  </body>
</html>
```

**解析**

- 兩塊淺底的父層字級看起來接近，都是根字級的 1.25 倍。
- em 那塊的子層明顯更大，因為 2em 乘的是已經放大的父層。
- rem 那塊的子層是根字級的 2 倍，約 32px，不受父層 1.25rem 影響。
- 深青綠條是淺底軌道的一半。
- 36ch 那段不會跟著視窗無限變寬。
- 最下面一行在你拉動視窗寬度時，字會跟著變大變小。

```css
.em-child {
  font-size: 2em; /* 相對父層 */
}
.rem-child {
  font-size: 2rem; /* 相對 html */
}
```

{% note warning %}
**不要用 vw 當全站內文**
視窗很窄時字會小到不能讀，很寬時又過大。vw 只適合偶爾的標題實驗，正文留在 rem。
{% endnote %}

{% note success %}
**換你試試：**
把 em 那塊的子層從 2em 改成 2rem。它應該變得跟下面那塊的子層一樣大，不再疊乘。
{% endnote %}

<details>
<summary>參考答案</summary>

子層改跟根字級走之後，兩塊的子層都約 32px。父層仍是 1.25em 與 1.25rem，看起來仍接近，但 em 子層不再變成約 40px。

```diff 03-css/pages/09-units.html
  // ...
        }
  
        .em-child {
-         font-size: 2em; /* 1.25 × 2 × 16px */
+         font-size: 2rem;
        }
  
        .rem-box {
          // ...
        }
  
        .rem-child {
-         font-size: 2rem; /* 2 × 16px，不乘父層 */
+         font-size: 2rem;
        }
  
        .meter {
          // ...
```

</details>

### 顏色寫法

同一套顏色可以寫成名稱、十六進位、rgb 或 hsl。color 是字的顏色，background-color 是底；透明度是讓底下的像素參與混合，不是另做一種灰色。

**觀念**

- 名稱適合草稿。正式頁用色碼，才對得上品牌色。
- 六碼十六進位兩兩一組，是紅、綠、藍。三碼只有在兩兩重複時才等於六碼。
- rgb 用空格分隔。斜線後面是透明度，0 全透明，100% 不透明。
- hsl 是色相、飽和度、亮度。要調深淺時，改第三個數。
- currentColor 跟這個元素當下的文字顏色走。

```html 03-css/pages/10-colors.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>顏色</title>
    <style>
      .named {
        color: teal;
      }
      .hex {
        color: #0f766e;
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
        background: currentColor;
      }

      .stripe {
        background: repeating-linear-gradient(45deg, #134e4a 0 8px, #042f2e 8px 16px);
      }

      .frost {
        background: rgb(240 253 250 / 70%);
      }
    </style>
  </head>
  <body>
    <h1>同一套顏色，很多種寫法</h1>
    <ul>
      <li class="named">名稱 teal</li>
      <li class="hex">六碼色票</li>
      <li class="rgb">rgb 空格寫法</li>
      <li class="mix">同一色，一半透明</li>
      <li class="hsl">hsl，亮度在第三個數</li>
    </ul>
    <p class="tag">這行的底跟字同一色</p>
    <div class="stripe">
      <p class="frost">半透明的底會透出底下的斜紋。</p>
    </div>
  </body>
</html>
```

**解析**

- 清單前三項都接近同一種青綠：名稱、六碼、rgb 是三種寫法。
- 一半透明的那項會淡，因為底下的頁面底色混進來了。
- hsl 那項仍是深青綠。
- 玫瑰紅那行的背景用 currentColor，所以底和字是同一色，字會融進底裡，這是故意讓你看見「底跟著字走」。
- 斜紋上面的段落有一層 70% 的淺色，斜紋還透得出來。

```css
.mix {
  color: rgb(15 118 110 / 50%); /* 斜線後面才是透明度 */
}
.frost {
  background: rgb(240 253 250 / 70%); /* 底下的斜紋會參與混合 */
}
```

{% note info %}
**對比不夠時先改亮度**
Styles 裡的色塊可以打開調色盤，也會提示對比是否過低。過低時先把字變深或底變淺。
{% endnote %}

{% note success %}
**換你試試：**
把一半透明的那項改成不透明，斜線後面寫 100%。再把 frost 的 70% 改成 100%，斜紋不該再透出來。
{% endnote %}

<details>
<summary>參考答案</summary>

兩處透明度都變成不透明之後，清單那項回到實心青綠，斜紋上的段落變成實心淺底，蓋住下面的紋。currentColor 那行沒有改。

```diff 03-css/pages/10-colors.html
  // ...
        }
        .mix {
-         color: rgb(15 118 110 / 50%);
+         color: rgb(15 118 110 / 100%);
        }
        .hsl {
          // ...
        }
  
        .frost {
-         background: rgb(240 253 250 / 70%);
+         background: rgb(240 253 250 / 100%);
        }
      </style>
    // ...
```

</details>

## 文字與背景

字與背景是畫面上直接看得到的屬性。字型相關的大多會繼承，所以設在 body 上，內文就跟著走；背景預設不繼承，畫在文字後面。

### 字型堆疊

font-family 是一串字型，逗號分隔，瀏覽器由左到右挑第一個用得了的。有空格的名稱要加引號，最後一個寫通用家族，系統才有退路。

**觀念**

- system-ui 是各作業系統的介面字。中文仍要後面的蘋方或微軟正黑體，否則有的系統沒有前面的家族時，中文會掉到通用家族。
- sans-serif 是無襯線，serif 是襯線，monospace 是等寬。
- 字重 400 是一般，700 是粗體。該字型要真的有這個字重。
- 行高建議寫沒有單位的數字，它會乘上該元素自己的字級。
- font 簡寫至少要有字級與字型。沒寫到的字型屬性會回到初始值，所以只改一項時寫單獨的屬性。

```html 03-css/pages/11-type.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>字型</title>
    <style>
      body {
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.6;
      }

      .banner {
        font: 700 1.5rem/1.3 system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .strong {
        font-weight: 700;
      }

      .serif {
        font-family: Palatino, "Palatino Linotype", serif;
      }

      .mono {
        font-family: ui-monospace, Consolas, monospace;
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
    </style>
  </head>
  <body>
    <h1>字型堆疊</h1>
    <p class="banner">這行用簡寫：粗體、較大字、行高 1.3。</p>
    <p>內文用無襯線。<span class="strong">這幾個字是粗體。</span></p>
    <p class="serif">這段改走襯線，中文會落到系統有的明體或宋體。</p>
    <p class="mono">行程代碼 TPE-001 用等寬字較好對。</p>
    <p class="tight">行高 1：行與行貼得很近。兩行以上就不好讀。洛奇旅行的說明至少要留出行距。</p>
    <p class="loose">行高 1.8：同一段文字鬆很多。內文常用 1.5 到 1.7。</p>
  </body>
</html>
```

**解析**

- 內文是系統無襯線，行高 1.6。
- 簡寫那行較大、較粗、行距較緊。
- 粗體只包住 span 那幾個字。
- 襯線那段筆畫末端會不一樣，等寬那段的英文與數字每個字同寬。
- 兩段淺底裡是同一段意思的長短對照：行高 1 的行與行幾乎貼住，1.8 的則鬆開。
- 簡寫那行若少寫字型家族，整條會無效。

```css
.banner {
  /* 字重、字級、斜線、行高、字型。少寫的字型屬性會被設回初始值 */
  font: 700 1.5rem/1.3 system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
}
```

{% note warning %}
**簡寫會清掉沒寫的項目**
原本從 body 繼承來的字重，可能在寫了 font 簡寫的這一層消失。只想加大時，寫 font-size 就好。
{% endnote %}

{% note success %}
**換你試試：**
把 banner 的簡寫拆開，改成單獨的字重 700、字級 1.5rem、行高 1.3。不要在這顆 class 上再寫 font-family，讓它繼續跟 body 的堆疊。
{% endnote %}

<details>
<summary>參考答案</summary>

拆開之後，這行仍是粗體、較大、行高 1.3，字型跟 body 走。因為沒有用簡寫，其他字型屬性不會被掃回初始值。

```diff 03-css/pages/11-type.html
  // ...
        }
  
        .banner {
-         font: 700 1.5rem/1.3 system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
+         font-weight: 700;
+         font-size: 1.5rem;
+         line-height: 1.3;
        }
  
        .strong {
          // ...
```

</details>

### 行內文字

對齊、底線和字距作用在文字上。text-align 要寫在區塊上，對齊的是它裡面的行；寫在行內元素自己身上，通常看不到置中。

**觀念**

- start 靠行首，center 置中，end 靠行末。橫書由左到右時，行首就是左邊。
- 底線可以只改顏色、粗細，以及離筆畫多遠。連結若拿掉底線，滑鼠或鍵盤聚焦時仍要有另一種變化。
- uppercase 只改畫面上的拉丁字母，不改 HTML 裡的文字。
- letter-spacing 是字距。white-space 設成 pre-wrap 時，原始碼裡的換行會留下來，太長仍會折行。
- text-shadow 依序是水平偏移、垂直偏移、模糊、顏色。

```html 03-css/pages/12-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文字</title>
    <style>
      body {
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      .display {
        font-size: 2rem;
        color: #f0fdfa;
        background: #115e59;
        text-shadow: 0 2px 0 rgb(0 0 0 / 35%);
      }

      .center {
        text-align: center;
      }

      .end {
        text-align: end;
      }

      .jump {
        text-decoration-line: underline;
        text-decoration-color: #0f766e;
        text-decoration-thickness: 2px;
        text-underline-offset: 0.2em;
      }

      .code {
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .schedule {
        white-space: pre-wrap;
        font-family: ui-monospace, Consolas, monospace;
        background: #f8fafc;
      }
    </style>
  </head>
  <body>
    <h1 class="display">洛奇旅行</h1>
    <p class="center">這段置中。</p>
    <p class="end">這段靠行末。</p>
    <p>連結可以只調底線：<a class="jump" href="#top">看行程</a></p>
    <p class="code">tpe-kt-03</p>
    <p class="schedule">
      Day 1 台北
      Day 2 京都
      Day 3 濟州
    </p>
  </body>
</html>
```

**解析**

- 標題是深底淺字，字下面有一道淡影。
- 下一段在版面中間，再下一段貼著行末。
- 連結的底線是深青綠、比預設粗，而且離筆畫遠一點，中文比較不會壓到字。
- 代碼那段在畫面上變成大寫，字與字之間鬆開，HTML 裡仍是小寫。
- 另一段保留原始碼的換行，所以分成三行。
- 若拿掉 pre-wrap，換行會被收成空白。

```css
.center {
  text-align: center; /* 寫在這顆區塊，裡面的字才置中 */
}
.schedule {
  white-space: pre-wrap; /* 留下換行，太長仍折行 */
}
```

{% note success %}
**換你試試：**
置中那段改成靠行末。連結底線的粗細改成 4px。代碼的字距不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

原本置中的那段改靠行末，畫面上連續兩段都貼著右邊。連結底線變粗，顏色與距離維持原樣。代碼仍是大寫、字距不變。

```diff 03-css/pages/12-text.html
  // ...
        }
  
        .center {
-         text-align: center;
+         text-align: end;
        }
  
        .end {
          // ...
          text-decoration-line: underline;
          text-decoration-color: #0f766e;
-         text-decoration-thickness: 2px;
+         text-decoration-thickness: 4px;
          text-underline-offset: 0.2em;
        }
        // ...
```

</details>

### 背景圖層

背景可以是底色、一張圖，或一層漸層；漸層也算背景圖，圖沒蓋到的地方會露出底色。疊了好幾層時，先寫的畫在上面。

**觀念**

- background-color 是底色。background-image 是圖或漸層。
- 預設會重複平鋪。no-repeat 只放一張。
- cover 把圖放大到蓋滿盒子，多的會被裁。contain 整張放進盒子，旁邊可能露出底色。
- 簡寫 background 沒寫到的項目會回到初始值。只改底色時寫 background-color，才不會把圖層清掉。
- 漸層的方向可以寫角度。repeating-linear-gradient 用來做條紋。

```html 03-css/pages/13-background.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>背景</title>
    <style>
      body {
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      .swatch {
        background-color: #f0fdfa;
      }

      .shade {
        background-image: linear-gradient(160deg, #115e59, #0f766e 42%, #f0fdfa);
      }

      .photo {
        color: #f0fdfa;
        background-color: #042f2e;
        background-image: url("https://picsum.photos/id/1015/800/500");
        background-repeat: no-repeat;
      }

      .cover {
        background-size: cover;
        background-position: center;
      }

      .contain {
        background-size: contain;
        background-position: center;
      }

      .hero {
        color: #f0fdfa;
        background-color: #115e59;
        background-image:
          linear-gradient(rgb(15 23 42 / 55%), rgb(15 23 42 / 15%)),
          radial-gradient(circle, #99f6e4 1.5px, transparent 1.6px);
        background-size: auto, 16px 16px;
      }
    </style>
  </head>
  <body>
    <h1>背景</h1>
    <div class="swatch">只有底色。</div>
    <div class="shade">線性漸層也是一層背景圖。</div>
    <div class="photo cover">cover：蓋滿，多的被裁掉。<br /><br /><br /></div>
    <div class="photo contain">contain：整張都在，旁邊露出底色。<br /><br /><br /></div>
    <div class="hero">漸層寫在前面，所以蓋在圓點上面。<br /><br /></div>
  </body>
</html>
```

**解析**

- 第一塊是淺青底。
- 第二塊沒有底色屬性，顏色來自漸層，由深青綠過渡到淺色。
- 兩塊照片共用同一張圖與深色底：cover 那塊圖被裁到蓋滿，contain 那塊看得到整張，左右或上下露出深色底。
- 最後一塊有兩層圖。
- 漸層寫在逗號前面，所以壓在圓點上，字比較讀得清楚。
- 圓點是第二層，格子之間仍看得到底色。
- 把視窗拉寬再拉窄，cover 與 contain 裁切的差別會更明顯。

```css
.hero {
  /* 先寫的圖層在上面 */
  background-image:
    linear-gradient(rgb(15 23 42 / 55%), rgb(15 23 42 / 15%)),
    radial-gradient(circle, #99f6e4 1.5px, transparent 1.6px);
}
```

{% note success %}
**換你試試：**
把 cover 那塊改成 contain，contain 那塊改成 cover。兩塊的說明文字也對調，讓文字跟實際裁切一致。
{% endnote %}

<details>
<summary>參考答案</summary>

class 對調之後，第一張照片改成整張放進盒子，第二張改成蓋滿並裁切。說明文字跟著換，才不會看文跟看圖相反。

```diff 03-css/pages/13-background.html
  // ...
      <div class="swatch">只有底色。</div>
      <div class="shade">線性漸層也是一層背景圖。</div>
-     <div class="photo cover">cover：蓋滿，多的被裁掉。<br /><br /><br /></div>
      <div class="photo contain">contain：整張都在，旁邊露出底色。<br /><br /><br /></div>
+     <div class="photo cover">cover：蓋滿，多的被裁掉。<br /><br /><br /></div>
      <div class="hero">漸層寫在前面，所以蓋在圓點上面。<br /><br /></div>
    </body>
  // ...
```

</details>

## 選讀：進階選擇器、分層與字型

上面的選擇器與字型已經夠用。屬性片段、一組選擇器的合併、父層是否含有某個後代、樣式分層、命名習慣，以及自行載入字型檔，可以整節跳過。

### 選讀：屬性比對與 :is()、:where()、:has()

前面只用過屬性值完全相等，這裡還可以比對開頭、結尾，或中間有沒有那段字。另外三個偽類各自負責一種合併：

- is 把好幾條合成一條，權重取括號裡最具體的那條。
- where 語法相同，權重是 0。
- has 看的是這個元素裡面有沒有某個後代。

**觀念**

- 開頭、結尾、包含，權重仍算 class 那一欄。
- is 適合「這三個標題共用同一組宣告」。權重不會因為包進 is 就變低。
- where 適合重置，幾乎不會蓋過程式裡後來寫的 class。
- has 不需要腳本。例如卡片裡的核取方塊被勾起時，整張卡片換底色。

```html 03-css/pages/14-selectors-extra.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>進階選擇器</title>
    <style>
      a[href^="https"] {
        color: #0f766e;
      }

      a[href$=".pdf"] {
        color: #9f1239;
      }

      :where(h1, h2) {
        font-weight: 600;
      }

      .card:has(:checked) {
        background: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <h1>屬性、is、where、has</h1>
    <p><a href="https://example.com">站外</a></p>
    <p><a href="guide.pdf">行程 PDF</a></p>
    <article class="card">
      <h2>含早餐</h2>
      <label><input type="checkbox" /> 這張卡片被勾起時換底色</label>
    </article>
  </body>
</html>
```

**解析**

- 以 https 開頭的連結是深青綠，以 .pdf 結尾的是玫瑰紅。
- 兩個標題被 where 設成較粗，這條權重是 0，之後若有同元素的字重規則會輕易蓋過它。
- 核取方塊勾起來之後，整張卡片出現淺青底。
- 沒勾時，has 打不中，背景就是透明。

```css
a[href^="https"] {
  color: #0f766e; /* 開頭 */
}
.card:has(:checked) {
  background: #f0fdfa; /* 裡面有被勾起的控制項 */
}
```

### 選讀：自訂屬性與 @layer

自訂屬性後面的變數那一節會正式用。這裡先看層（layer）：你可以把樣式分成幾層，層與層的順序事先定好。同一屬性、權重也相同時，較晚的層贏，不必把選擇器拉長。

**觀念**

- layer 的名字在第一次出現時排順序。後面再寫的同一層，仍算那一層。
- 沒有放進任何層的規則，贏過所有層。
- 這一節只讓兩層搶同一個顏色，方便在 Styles 裡看到誰被劃掉。

```html 03-css/pages/15-layer.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>分層</title>
    <style>
      @layer reset, theme;

      @layer reset {
        .lead {
          color: #9f1239;
        }
      }

      @layer theme {
        .lead {
          color: #0f766e;
        }
      }
    </style>
  </head>
  <body>
    <h1>兩層搶同一個顏色</h1>
    <p class="lead">這段應是深青綠。重置層寫在較前面。</p>
  </body>
</html>
```

**解析**

- 兩條都是同一個 class，權重相同。
- theme 在 layer 那一行排得比較晚，所以留下深青綠，reset 的玫瑰紅被劃掉。
- 若把 layer 那一行的名字對調，留下的顏色會反過來。
- 沒有放進層的第三條若再寫同一個顏色，會贏過這兩層。

```css
@layer reset, theme; /* 愈右邊的層愈優先 */
```

### 選讀：命名與字型檔

class 名字要讓人看得出區塊與零件。BEM 是一種習慣：區塊、元素用兩個底線接在區塊後面，狀態用兩個連字號。它不是語法，瀏覽器不會因為你這樣命名就改變權重。

字型檔用 font-face 註冊一個家族名稱，再放進 font-family。檔案找不到時，逗號後面的下一個家族會接上。

**觀念**

- 區塊是元件，例如卡片。元素是它裡面的零件，例如標題。狀態是改裝，例如售完。
- font-face 的 font-family 是你取的名字，src 指向檔案。課堂不附字型檔，所以畫面會落到後面的系統字。
- 只寫微軟正黑體時，沒有這個家族的系統會直接掉到通用家族。堆疊仍要留退路。

```html 03-css/pages/29-font.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>命名與字型檔</title>
    <style>
      @font-face {
        font-family: "Tour";
        src: url("tour.woff2") format("woff2");
      }

      .card__title {
        font-family: "Tour", system-ui, "PingFang TC", sans-serif;
      }

      .card__price {
        color: #0f766e;
      }

      .card__price--soldout {
        color: #64748b;
        text-decoration: line-through;
      }
    </style>
  </head>
  <body>
    <article class="card">
      <h1 class="card__title">京都三日</h1>
      <p class="card__price">NT$12,800</p>
      <p class="card__price card__price--soldout">NT$12,800</p>
    </article>
  </body>
</html>
```

**解析**

- 標題使用 Tour 這個家族。
- 檔案不在旁邊時，字會落到 system-ui。
- 兩行價格裡，售完那行是灰色加刪除線，一般價格是深青綠。
- 名字裡的底線與連字號只是給人讀的，權重仍是各算一個 class。

```css
.card__price--soldout {
  color: #64748b; /* 狀態，不是另一種子選擇器 */
}
```

# 盒子與欄位排版

每個元素都是一顆矩形盒子。先決定它多大、怎麼參加排版、座標跟誰比，再決定同一層的小孩沿一個方向排，或同時切成欄與列。

## 盒子與定位

字與底色已經會變之後，接著看盒子本身：內容、內距、邊框、外距，再決定它獨佔一行還是跟文字坐在一起。按 <kbd>F12</kbd>，在 Computed 裡可以看到盒模型的四層。

{% mermaid graph TD %}
margin["margin 外距，透明"] --> border["border 邊框"]
border --> padding["padding 內距，背景塗到這裡"]
padding --> content["content 內容"]
{% endmermaid %}

### 盒子模型

盒子模型（box model）把元素分成內容、內距、邊框、外距。你寫的寬高算到哪一層，由 box-sizing 決定。

**觀念**

- 預設 content-box 的寬度只量內容。內距和邊框再往外加，所以寫了 100% 又加了內距，會比父層更寬。
- border-box 的寬度含內容、內距、邊框，不含外距。課堂從這裡起，`style` 開頭就改成 border-box，偽元素也要一起改。
- 簡寫依順時針。一個值四邊相同；兩個值是上下、左右；四個值是上、右、下、左。
- 內距不能是負值。外距可以是 auto。左右 auto 會平分剩餘寬度，所以要比父層窄才水平置中。
- 上下相鄰的區塊，垂直外距會併成較大的那一個，不會相加。左右不會合併。
- outline 畫在邊框外側，不佔寬高。鍵盤焦點用它，並配上 focus-visible。

```html 03-css/pages/16-box.html
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
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
        line-height: 1.6;
      }

      .stage {
        background: #ccfbf1;
      }

      .card {
        width: min(100%, 22rem);
        margin: 1rem auto;
        padding: 1rem;
        border: 6px solid #0f766e;
        border-radius: 0.75rem;
        background: #f0fdfa;
      }

      .content {
        background: #cffafe;
      }

      .track {
        width: 16rem;
        max-width: 100%;
        margin-bottom: 0.75rem;
        border: 1px dashed #0f766e;
      }

      .kid {
        width: 100%;
        padding: 0.5rem 1rem;
        border: 4px solid #115e59;
        background: #f0fdfa;
      }

      .content-box .kid {
        box-sizing: content-box;
      }

      .collapse p {
        margin-top: 0.5rem;
        margin-bottom: 2rem;
        background: #f0fdfa;
      }

      .collapse p + p {
        margin-bottom: 0;
      }

      .go {
        padding: 0.4rem 0.9rem;
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
        <p class="content">淺藍是內容。卡片的淺綠含內距。粗框是邊框。框外淺青是外距。</p>
      </article>
    </div>
    <h2>兩種算法</h2>
    <div class="track"><div class="kid">border-box：對齊虛線。</div></div>
    <div class="track content-box"><div class="kid">content-box：虛線包不住。</div></div>
    <h2>垂直外距合併</h2>
    <div class="collapse">
      <p>這段下外距是 2rem。</p>
      <p>上外距只有 0.5rem。中間是較大的 2rem。</p>
    </div>
    <p><a class="go" href="#top">看行程</a>（用 Tab 移來，焦點框不改變按鈕尺寸）</p>
  </body>
</html>
```

**解析**

- 卡片比版面窄，左右外距是 auto，所以居中。
- 淺綠底含內距，淺藍只在文字那一塊。
- 框外的淺青是父層的底，因為外距是透明的。
- 第一條軌道裡，小孩的寬度含內距與邊框，所以對齊虛線。
- 第二條改回 content-box，100% 只量內容，內距與邊框再往外長，虛線包不住。
- 兩段之間的空隙是 2rem，不是 2.5rem。
- 用 <kbd>Tab</kbd> 移到那顆連結，玫瑰色焦點框出現，按鈕本身的寬高不變。

```css
.card {
  width: min(100%, 22rem); /* 窄於 22rem 時跟父層一樣寬 */
  margin: 1rem auto; /* 左右 auto 才水平置中 */
  box-sizing: border-box; /* 寬度含內距與邊框 */
}
```

{% note success %}
**換你試試：**
第二條軌道的小孩也改回 border-box，讓虛線包得住。卡片的圓角從 0.75rem 加大到 1.5rem。
{% endnote %}

<details>
<summary>參考答案</summary>

拿掉 content-box 那條之後，兩條軌道都用開頭的 border-box，小孩不再撐破虛線。卡片四角更圓，寬度與外距沒有改。

```diff 03-css/pages/16-box.html
  // ...
          padding: 1rem;
          border: 6px solid #0f766e;
-         border-radius: 0.75rem;
+         border-radius: 1.5rem;
          background: #f0fdfa;
        }
        // ...
          background: #f0fdfa;
        }
  
-       .content-box .kid {
-         box-sizing: content-box;
-       }
- 
        .collapse p {
          margin-top: 0.5rem;
          // ...
```

</details>

### display

display 決定盒子怎麼參加排版，不改變標籤的語意。區塊、行內、可設寬高的行內，以及三種先不要給人看的寫法，畫面差很多。

**觀念**

- block 獨佔一行，寬高與垂直外距都算數。div、段落、標題預設就是這樣。
- inline 跟文字坐在同一行。左右的內距會把旁邊的字推開；上下的內距會畫出來，但通常不把行撐高。行內盒不採用你寫的寬高。
- inline-block 仍跟文字同一行，但可以有自己的寬高。標籤之間的換行會變成一個空白。
- none 不建立盒子，後面的元素補上它的位置。visibility 設成 hidden 仍佔位，只是看不見。opacity 設成 0 也佔位，而且仍點得到。
- 圖片若跟文字基線對齊，底下會有一條縫。改成 block，或垂直對齊設成 middle，縫會消失。

```html 03-css/pages/17-display.html
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
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .block {
        margin-bottom: 0.5rem;
        padding: 0.4rem 0.75rem;
        background: #f0fdfa;
      }

      .item {
        padding: 0.35rem 0.5rem;
        border: 2px solid #0f766e;
        background: #ccfbf1;
      }

      .day {
        display: inline-block;
        width: 4.5rem;
        padding: 0.35rem 0;
        background: #115e59;
        color: #f0fdfa;
        text-align: center;
      }

      .cell {
        display: inline-block;
        width: 2.5rem;
        margin-right: 0.35rem;
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
      }

      .photo.block {
        display: block;
      }
    </style>
  </head>
  <body>
    <h1>盒子怎麼參加排版</h1>
    <h2>block</h2>
    <div class="block">第一張獨佔一行。</div>
    <div class="block">第二張從下一行開始。</div>
    <h2>inline</h2>
    <p class="line">行程有<span class="item">甲</span>與<span class="item">乙</span>兩站。</p>
    <h2>inline-block</h2>
    <p>
      <span class="day">三日</span>
      <span class="day">四日</span>
      <span class="day">五日</span>
    </p>
    <h2>三種隱藏</h2>
    <p><span class="cell">1</span><span class="cell gone">2</span><span class="cell">3</span></p>
    <p><span class="cell">1</span><span class="cell hold">2</span><span class="cell">3</span></p>
    <p><span class="cell">1</span><span class="cell ghost">2</span><span class="cell">3</span></p>
    <h2>圖片底縫</h2>
    <p><img class="photo" alt="" src="https://picsum.photos/id/1015/120/80" /> 行內圖片底下有一條縫。</p>
    <p><img class="photo block" alt="" src="https://picsum.photos/id/1015/120/80" /> 改成 block 就沒有縫。</p>
  </body>
</html>
```

**解析**

- 兩張 block 各佔一行，中間有下外距。
- 甲和乙跟句子坐在同一行，上下邊框會畫出來，但不把這一行撐得更高。
- 三日、四日、五日有固定寬度，所以不是純行內。
- 它們中間的縫有一部分來自原始碼換行。
- 三列隱藏裡，第一列的 2 消失，1 緊接著 3。
- 第二列中間仍空一格。
- 第三列看起來也空一格，但那一格仍在，滑鼠點得到。
- 最後，第一張圖跟文字基線對齊，底下有縫。
- 改成 block 的那張自己佔一行，縫消失。

```css
.gone {
  display: none; /* 不佔位 */
}
.hold {
  visibility: hidden; /* 佔位，看不見 */
}
.ghost {
  opacity: 0; /* 佔位，仍點得到 */
}
```

{% note success %}
**換你試試：**
第一列的 2 改成仍佔位、只是看不見。把 gone 的 display 拿掉，改成 visibility: hidden。第二列不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

第一列的 2 現在跟第二列一樣留著空位。它不再用 none，所以 1 和 3 不會靠在一起。第三列仍是透明但點得到。

```diff 03-css/pages/17-display.html
  // ...
        }
  
        .gone {
-         display: none;
+         visibility: hidden;
        }
  
        .hold {
          // ...
```

</details>

### 定位與 z-index

position 決定偏移量跟誰比。預設 static 參加正常排版，寫了 top 或 z-index 也不生效。z-index 決定重疊時誰在上面，數字只在同一個層疊情境裡比。

**觀念**

- relative 以自己原本的位子為原點，原位仍留著，兄弟不會補上來。
- absolute 對準最近一個不是 static 的祖先，原位釋出。都沒有這樣的祖先時，對準整頁。徽章的寫法是：卡片 relative，徽章 absolute。
- fixed 對準視窗，捲動時它還在同一個螢幕位置。
- sticky 平常像相對，滾過你寫的 top 之後黏在捲動盒邊緣，範圍只到父層結束。祖先若把溢出藏起來，黏性常常失效。
- z-index 愈大愈靠近你。父層若自己開了新的層疊情境，小孩的數字出不去，比的是父親。

```html 03-css/pages/18-position.html
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
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .card {
        position: relative;
        width: min(100%, 22rem);
        padding: 1rem;
        background: #f0fdfa;
      }

      .badge {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        z-index: 1;
        padding: 0.15rem 0.5rem;
        background: #9f1239;
        color: #fff;
      }

      .pile {
        position: relative;
        height: 4.5rem;
        margin-top: 1rem;
      }

      .layer {
        position: absolute;
        width: 5rem;
        padding: 0.75rem 0;
        text-align: center;
        color: #fff;
      }

      .low {
        top: 0.6rem;
        left: 1.5rem;
        z-index: 1;
        background: #0f766e;
      }

      .high {
        top: 0;
        left: 0;
        z-index: 2;
        background: #9f1239;
      }

      .scroller {
        overflow: auto;
        height: 7rem;
        margin-top: 1rem;
        background: #fff;
        border: 1px solid #99f6e4;
      }

      .sticky {
        position: sticky;
        top: 0;
        margin: 0;
        background: #115e59;
        color: #f0fdfa;
      }

      .pin {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        margin: 0;
        padding: 0.4rem 0.7rem;
        background: #0f766e;
        color: #fff;
      }
    </style>
  </head>
  <body>
    <h1>座標跟誰比</h1>
    <article class="card">
      <span class="badge">熱門</span>
      <h2>京都三日</h2>
      <p>徽章對準這張卡片，不是整頁。</p>
    </article>
    <div class="pile">
      <span class="layer low">下層</span>
      <span class="layer high">上層</span>
    </div>
    <div class="scroller">
      <p class="sticky">這行會黏在這個盒子的上緣</p>
      <p>往下捲這塊白盒，標題黏住，直到盒子捲完。</p>
      <p>父層結束後，黏性也結束。</p>
    </div>
    <p class="pin">固定在視窗右下</p>
  </body>
</html>
```

**解析**

- 「熱門」脫離文字流，貼在卡片右上。
- 卡片若拿掉 relative，徽章會去找更外層的頁面。
- 卡片裡的標題與段落會補上徽章原來的位子，所以文字不會被空出一個 span 的寬度。
- 下面兩塊重疊的色塊都是絕對定位。
- 上層的 z-index 是 2，所以玫瑰紅蓋住深青綠的一角。
- 若把兩個數字對調，深青綠會蓋到上面來。
- 白盒自己可以捲。
- 捲動時，深青綠那行黏在盒子上緣，而不是瀏覽器最上面。
- 盒子捲完它就一起走。
- 右下角那塊對準視窗，捲動整頁時它還在。
- 這裡的 overflow 只為了做出可捲的盒子，下一節再談裁切與捲軸。

```css
.card {
  position: relative; /* 成為徽章的對準對象 */
}
.badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
```

{% note success %}
**換你試試：**
徽章改貼到卡片左下。top 與 right 拿掉，改寫 bottom 與 left，各 0.5rem。
{% endnote %}

<details>
<summary>參考答案</summary>

對準對象仍是卡片。徽章從右上移到左下，文字流不受影響。黏性標題與右下角固定塊維持原樣。

```diff 03-css/pages/18-position.html
  // ...
        .badge {
          position: absolute;
-         top: 0.5rem;
-         right: 0.5rem;
+         bottom: 0.5rem;
+         left: 0.5rem;
          z-index: 1;
          padding: 0.15rem 0.5rem;
          // ...
```

</details>

### overflow

內容比盒子高或寬時，overflow 決定是露出、裁掉，還是出現捲軸。單行省略是「不准換行、超出就藏、尾端改成省略號」三件事一起。

**觀念**

- visible 是預設，多出來的畫在盒子外面。
- hidden 裁掉，不出現捲軸。auto 在需要時才出現捲軸。
- 單行省略要同時寫不准換行、溢出隱藏、文字溢出用省略號。只寫其中一個，尾端不會變成省略號。
- 父層有 hidden 時，裡面的 sticky 常常黏不住。

```html 03-css/pages/19-overflow.html
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
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .box {
        width: min(100%, 18rem);
        height: 4.5rem;
        margin-bottom: 1rem;
        background: #f0fdfa;
      }

      .clip {
        overflow: hidden;
      }

      .scroll {
        overflow: auto;
      }

      .one-line {
        width: min(100%, 18rem);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    </style>
  </head>
  <body>
    <h1>超出盒子時</h1>
    <div class="box clip">
      <p>這段比盒子高。hidden 會裁掉下面的句子，不出現捲軸。洛奇旅行的說明在這裡被切掉。</p>
    </div>
    <div class="box scroll">
      <p>這段同樣比較高。auto 在裝不下時出現捲軸，句子可以捲出來讀完。洛奇旅行的說明在這裡還在。</p>
    </div>
    <p class="one-line">這一行很長時不要換行，尾端改成省略號。京都、大阪、濟州、花蓮都排在同一行。</p>
  </body>
</html>
```

**解析**

- 兩塊淺底一樣高。
- 第一塊下面的字被切掉，沒有捲軸。
- 第二塊右邊或下面出現捲軸，可以把被擋住的句子捲出來。
- 最後一段維持一行。
- 盒子不夠寬時，尾端是省略號，而不是換到下一行。
- 把 nowrap 拿掉，省略號通常也不會出現，因為文字已經折行，沒有水平方向的溢出。

```css
.one-line {
  white-space: nowrap; /* 不准換行 */
  overflow: hidden; /* 超出的裁掉 */
  text-overflow: ellipsis; /* 尾端改成省略號 */
}
```

{% note success %}
**換你試試：**
第一塊從裁切改成需要時才捲。把 hidden 換成 auto。單行省略那段不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

兩塊現在都會在裝不下時出現捲軸，第一塊不再直接把句子切掉。單行那段仍是一行加省略號。

```diff 03-css/pages/19-overflow.html
  // ...
        }
  
        .clip {
-         overflow: hidden;
+         overflow: auto;
        }
  
        .scroll {
          // ...
```

</details>

## 欄位排版

同一層的小孩要排成一列或一欄時用 Flex；要同時控制欄與列時用 Grid。兩者都是寫在父層的 display，間距用 gap，不要再靠外距硬湊縫。

### Flexbox

Flex 沿一個方向排：主軸是這個方向，交叉軸是垂直於它的那個方向。換行之後，每一行仍沿主軸排。

**觀念**

- 預設是橫排、不換行。column 改成直排。wrap 才允許換行。
- justify-content 管主軸上怎麼分配剩餘空間。align-items 管交叉軸怎麼對齊。
- gap 是項目之間的縫，不會加在最外側。
- flex 三個數字依序是放大、縮小、基本尺寸。1 1 12rem 表示可以長、可以縮，理想寬度約 12rem。
- 項目預設 min-width 是 auto，內容很長時可能不肯縮小。需要硬縮時把最小寬度設成 0。

```html 03-css/pages/20-flex.html
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
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .bar a {
        color: inherit;
      }

      .trips {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1rem;
      }

      .trip {
        display: flex;
        flex-direction: column;
        flex: 1 1 14rem;
        padding: 1rem;
        background: #f0fdfa;
      }

      .trip a {
        margin-top: auto;
      }
    </style>
  </head>
  <body>
    <h1>沿一個方向排</h1>
    <header class="bar">
      <strong>洛奇旅行</strong>
      <nav>
        <a href="#tours">行程</a>
        <a href="#about">關於</a>
      </nav>
    </header>
    <div class="trips">
      <article class="trip">
        <h2>京都三日</h2>
        <p>清水寺與嵐山。</p>
        <a href="#kyoto">看行程</a>
      </article>
      <article class="trip">
        <h2>大阪美食</h2>
        <p>這張字比較多，用來把連結推到卡片底部。</p>
        <a href="#osaka">看行程</a>
      </article>
    </div>
  </body>
</html>
```

**解析**

- 頂部那條把品牌名與連結分到兩端，垂直方向置中。
- 連結的顏色跟父層，所以是淺色。
- 兩張卡片橫排，中間有 1rem 的縫。
- 視窗不夠放兩張 14rem 時會換行，因為允許 wrap。
- 每張卡片自己是直向的 Flex，連結的上外距是 auto，所以被推到卡片底部，兩張的連結對齊。

```css
.trips {
  display: flex;
  flex-wrap: wrap; /* 放不下才換行 */
  gap: 1rem;
}
.trip {
  flex: 1 1 14rem; /* 可長、可縮、理想 14rem */
}
```

{% note success %}
**換你試試：**
卡片容器改成不准換行。把 wrap 改成 nowrap，再把視窗拉窄，看兩張卡片擠在同一行而不是掉到下一行。
{% endnote %}

<details>
<summary>參考答案</summary>

不准換行之後，兩張卡片始終在同一行，變窄時會跟著縮小。頂部列與卡片內部的直向排列沒有改。

```diff 03-css/pages/20-flex.html
  // ...
        .trips {
          display: flex;
-         flex-wrap: wrap;
+         flex-wrap: nowrap;
          gap: 1rem;
          margin-top: 1rem;
        // ...
```

</details>

### Grid

Grid 同時切欄與列。父層決定有幾欄，小孩預設各佔一格；一個小孩要跨欄時，再寫它自己佔幾欄。

**觀念**

- grid-template-columns 決定每一欄多寬。1fr 是分剩餘空間的一份。
- repeat 與 auto-fit、minmax 可以依寬度自動決定欄數：每欄至少某個寬度，剩下的空間再平均分。
- gap 同時是欄距與列距。也可以分開寫欄距與列距。
- 跨欄用 grid-column。對齊用 justify-items 與 align-items，作用在格子裡的內容。
- Flex 負責一條軸上的一列或一欄。雙向、要對齊欄線時用 Grid。

```html 03-css/pages/21-grid.html
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
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .trips {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: 1rem;
      }

      .trips article {
        padding: 1rem;
        background: #f0fdfa;
      }

      .feature {
        grid-column: span 2;
        background: #ccfbf1;
      }
    </style>
  </head>
  <body>
    <h1>欄與列一起排</h1>
    <div class="trips">
      <article class="feature">
        <h2>京都三日</h2>
        <p>這一張跨兩欄。</p>
      </article>
      <article>
        <h2>大阪</h2>
        <p>一格。</p>
      </article>
      <article>
        <h2>濟州</h2>
        <p>一格。</p>
      </article>
    </div>
  </body>
</html>
```

**解析**

- 窄視窗時可能只有一欄，每張卡片上下排。
- 拉寬之後，欄數變多，每一欄至少約 12rem，剩餘空間平均分。
- 第一張跨兩欄，所以在兩欄以上的時候比旁邊的卡片寬。
- 若目前只有一欄，跨兩欄沒有第二欄可跨，它仍佔滿那一欄。
- 縫是 gap，不是卡片自己的外距，所以最外側不會多一圈。
- 這種「幾欄、誰跨欄」用 Grid。
- 上一節的導覽列只有一個方向，用 Flex 就夠。

```css
.trips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}
.feature {
  grid-column: span 2;
}
```

{% note success %}
**換你試試：**
把每欄的最小寬度從 12rem 改成 20rem。拉窄視窗時應更快變成一欄。跨兩欄的那張不要拿掉。
{% endnote %}

<details>
<summary>參考答案</summary>

最小寬度變大之後，同一個視窗寬度能放下的欄數變少，卡片更早改成上下排。第一張仍寫著跨兩欄，在兩欄都存在時才會比較寬。

```diff 03-css/pages/21-grid.html
  // ...
        .trips {
          display: grid;
-         grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
+         grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
          gap: 1rem;
        }
        // ...
```

</details>

# 響應式、變數與動態

這一章先讓窄畫面排得下，再在變寬時改欄數，並把重複的顏色收成變數。動態的部分接著看：變形不推動鄰居，轉場把兩個狀態接起來，動畫則自己播放。

## RWD 與媒體查詢

響應式網頁設計（Responsive Web Design）是同一份文件適應不同寬度。先用會縮、會換行的欄，結構真的要變時才寫媒體查詢。查詢寫最小寬度、由窄到寬，窄畫面的規則就是預設，不必再寫一個最大寬度把手機單獨立出來。

### 流動版面先做完

圖片不要比父層寬，版心不要無限變寬，卡片用自動欄數。這些在任何寬度都成立，所以還不需要媒體查詢。

**觀念**

- 圖片設最大寬度 100%，並改成 block，才不會溢出，也不會留下行內圖片的底縫。
- 版心用最大寬度加上左右 auto，寬螢幕時文字不會拉成一整行。
- 卡片欄用上一節的 auto-fit。窄的時候自然是一欄。

```html 03-css/pages/22-rwd.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>流動版面</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }

      .wrap {
        max-width: 60rem;
        margin-right: auto;
        margin-left: auto;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
        gap: 1rem;
      }

      .card {
        padding: 1rem;
        background: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>洛奇旅行</h1>
      <img src="https://picsum.photos/id/1016/1200/500" alt="海岸" />
      <div class="cards">
        <article class="card">
          <h2>台北城市漫遊</h2>
          <p>窄的時候一欄，拉寬後自動變多欄。</p>
        </article>
        <article class="card">
          <h2>花蓮山海</h2>
          <p>這裡還沒有媒體查詢。</p>
        </article>
      </div>
    </div>
  </body>
</html>
```

**解析**

- 照片再寬也不會撐出版心，高度隨比例縮小。
- 版心在寬螢幕停在 60rem，左右留白靠 auto。
- 兩張卡片在窄視窗上下排，拉寬到放得下兩個 14rem 時並排，中間是 gap。
- 這份樣式沒有 @media，拉視窗就會變，因為欄數是算出來的。

```css
img {
  max-width: 100%; /* 不比父層寬 */
  height: auto; /* 高度跟比例走 */
}
.cards {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}
```

{% note success %}
**換你試試：**
把每欄最小寬度從 14rem 改成 18rem。拉窄視窗時，兩張卡片應更早改成上下排。照片與版心不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

最小寬度變大之後，同一個視窗更早放不進兩欄，卡片改成上下排。照片仍不會比版心寬，版心仍停在 60rem。

```diff 03-css/pages/22-rwd.html
  // ...
        .cards {
          display: grid;
-         grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
+         grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
          gap: 1rem;
        }
        // ...
```

</details>

### 斷點由窄到寬

流動版面解決「會縮」的部分。導覽要從直排改成橫排、側欄要在夠寬時才出現在旁邊，這種結構變化才寫媒體查詢。條件寫最小寬度，窄畫面的規則放在查詢外面。

**觀念**

- 先寫窄畫面看得懂的排法，再寫 `@media (min-width: …)` 覆蓋。
- 由小到大加第二個斷點。較寬的查詢寫在後面，才蓋得過較窄的那條。
- 斷點是布局要變的地方，不是先記一組手機、平板、桌機的數字。

```html 03-css/pages/30-css-breakpoint.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>斷點</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1rem;
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      nav a {
        display: block;
      }

      @media (min-width: 40rem) {
        .layout {
          display: grid;
          grid-template-columns: 1fr 14rem;
          gap: 1rem;
        }

        header {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        nav a {
          display: inline-block;
          margin-left: 0.75rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <header>
        <h1>洛奇旅行</h1>
        <nav>
          <a href="#tours">行程</a>
          <a href="#tips">須知</a>
        </nav>
      </header>
      <main id="tours">
        <h2>行程</h2>
        <p>窄的時候導覽在標題下面，一項一行。</p>
      </main>
      <aside id="tips">
        <h2>須知</h2>
        <p>夠寬時這欄才排到旁邊。</p>
      </aside>
    </div>
  </body>
</html>
```

**解析**

- 視窗窄於 40rem 時，標題、連結、主文、側欄由上往下排，連結各佔一行。
- 拉過 40rem 之後，標題與導覽變成兩端對齊的一列，主文與側欄並排，側欄固定約 14rem。
- header 跨滿兩欄，所以不會被擠進側欄那一格。

```css
@media (min-width: 40rem) {
  .layout {
    grid-template-columns: 1fr 14rem; /* 主文彈性，側欄約 14rem */
  }
  nav a {
    display: inline-block; /* 蓋過外面的 block */
  }
}
```

{% note success %}
**換你試試：**
再加一個 64rem 的斷點，讓側欄變成 18rem。40rem 那條留著，新的查詢寫在它下面。
{% endnote %}

<details>
<summary>參考答案</summary>

64rem 寫在後面，所以更寬的視窗會再用這條蓋過欄寬。介於 40rem 與 64rem 時，側欄仍是 14rem。窄於 40rem 時，兩條查詢都不成立，版面維持直排。

```diff 03-css/pages/30-css-breakpoint.html
  // ...
          }
        }
+ 
+       @media (min-width: 64rem) {
+         .layout {
+           grid-template-columns: 1fr 18rem;
+         }
+       }
      </style>
    </head>
    // ...
```

</details>

### 選讀：列印與偏好

同一份媒體查詢也可以服務列印，以及系統的深色偏好。畫面斷點仍是上一節的主線，這兩種可以之後再加。

**觀念**

- print 在列印或列印預覽時成立。導覽、純裝飾可以在這時候拿掉。
- prefers-color-scheme 跟作業系統的深色或淺色設定。不要只靠它當唯一的對比方案，系統設成淺色的人仍要讀得清楚。

```html 03-css/pages/31-css-print.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>列印與偏好</title>
    <style>
      body {
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      @media (prefers-color-scheme: dark) {
        body {
          background: #042f2e;
          color: #f0fdfa;
        }
      }

      @media print {
        .noprint {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <nav class="noprint"><a href="#tours">行程</a></nav>
    <h1>洛奇旅行</h1>
    <p>列印預覽時，上面的導覽會消失。系統若是深色，這一頁會換成深底淺字。</p>
  </body>
</html>
```

**解析**

- 螢幕上仍看得到導覽。
- 開啟列印預覽時，導覽不佔位置。
- 系統是深色時，底變成深青、字變成淺色。
- 系統是淺色時，這條查詢不成立，維持深字。

```css
@media print {
  .noprint {
    display: none; /* 只在列印時成立 */
  }
}
```

## CSS 變數

重複出現的顏色與間距可以收成自訂屬性：名字自己取，前面加兩條減號，用的時候寫 var。變數會繼承，子層可以覆寫同一個名字。

變數多半寫在 `:root`，整頁都能讀到。某個元件要換色時，在那個元件上再宣告同名變數，子層會跟這層的新值。

**觀念**

- `var(--brand)` 讀這個名字。括號裡的第二個參數是找不到時的備援，有找到就不用。
- 變數存的是你寫的那串文字，繼承的是這串文字，不是每個屬性自己的繼承規則。
- 名稱要看得出用途。不要用 `--a` 這種看不出是顏色還是間距的名字。

```html 03-css/pages/23-vars.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>變數</title>
    <style>
      :root {
        --brand: #0f766e;
        --gap: 1rem;
      }

      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .card {
        margin-bottom: var(--gap);
        padding: 1rem;
        background: #f0fdfa;
      }

      .price {
        color: var(--brand);
      }

      .sale {
        --brand: #9f1239;
      }

      .missing {
        color: var(--missing, #475569);
      }
    </style>
  </head>
  <body>
    <article class="card">
      <h1>京都三日</h1>
      <p class="price">NT$12,800</p>
    </article>
    <article class="card sale">
      <h2>大阪美食</h2>
      <p class="price">NT$9,600</p>
    </article>
    <p class="missing">這段的顏色名稱不存在，所以用備援。</p>
  </body>
</html>
```

**解析**

- 兩張卡片的價格都用同一個變數。
- 第一張是深青綠，因為讀到根上的值。
- 第二張包在 sale 裡，這層把同一個名字改成玫瑰紅，所以只有這張的價格變色，第一張不受影響。
- 最後一段點了一個沒宣告的名字，第二個參數生效，字是石板色。
- 若拿掉備援，這行顏色會被當成無效。

```css
.sale {
  --brand: #9f1239; /* 子層覆寫，只影響這張卡片裡面 */
}
.missing {
  color: var(--missing, #475569); /* 逗號後面是找不到時才用 */
}
```

{% note success %}
**換你試試：**
在根上把品牌色改成 `#115e59`。sale 那張仍要維持玫瑰紅，不要改它的覆寫。
{% endnote %}

<details>
<summary>參考答案</summary>

根上的值一改，第一張價格跟著變。sale 自己有同名變數，不跟根上的新值，所以仍是玫瑰紅。備援那段沒有這個名字，不受影響。

```diff 03-css/pages/23-vars.html
  // ...
      <style>
        :root {
-         --brand: #0f766e;
+         --brand: #115e59;
          --gap: 1rem;
        }
        // ...
```

</details>

## 轉場與動畫

變形改變的是畫出來的樣子，盒子原來佔的位子還在。轉場負責兩個狀態之間怎麼過渡；動畫則用關鍵影格自己播，不必等人去點或移上去。

### 變形不推動鄰居

transform 可以平移、縮放、旋轉。它不重新計算左右鄰居的位置，所以適合做成滑過時的抬起，而不會把整列擠歪。

**觀念**

- translate 是平移，scale 是縮放，rotate 是旋轉。寫在同一個 transform 裡時，由右往左套。
- 變形的原點預設是盒子中心。transform-origin 可以改到某一角。
- 位子仍留給原來的矩形。旁邊的元素不會因為你把它畫到別處就補上來。

```html 03-css/pages/24-motion.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>變形</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .row {
        display: flex;
        gap: 0.5rem;
      }

      .box {
        width: 4rem;
        padding: 0.75rem 0;
        background: #f0fdfa;
        text-align: center;
      }

      .move {
        transform: translateX(1rem);
      }

      .big {
        transform: scale(1.25);
      }

      .turn {
        transform: rotate(8deg);
      }
    </style>
  </head>
  <body>
    <h1>變形不推動鄰居</h1>
    <div class="row">
      <span class="box">原位</span>
      <span class="box move">往右</span>
      <span class="box big">放大</span>
      <span class="box turn">旋轉</span>
    </div>
  </body>
</html>
```

**解析**

- 四格仍排在原來的 Flex 位子上，縫沒有因為變形被撐開。
- 往右那格畫到自己位子的右邊，可能蓋住下一格，但下一格的盒子沒有被推走。
- 放大那格從中心變大，旋轉那格也繞著中心轉。
- 若改用 margin 去推，後面的格子會真的移位。

```css
.move {
  transform: translateX(1rem); /* 只改畫出來的位置 */
}
```

{% note success %}
**換你試試：**
往右那格改成往上 0.75rem。用 translateY，負值才是往上。其他兩格不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

translateY 的負值往上畫，格子佔的位子仍在原列，左右鄰居不會補進它空出來的視覺位置。放大與旋轉維持原樣。

```diff 03-css/pages/24-motion.html
  // ...
        }
  
        .move {
-         transform: translateX(1rem);
+         transform: translateY(-0.75rem);
        }
  
        .big {
          // ...
```

</details>

### 轉場連接兩個狀態

transition 寫在元素平常的狀態上，告訴瀏覽器：這個屬性從舊值走到新值時，用多久、用哪一種速度。滑鼠移開時，它會走回原來的值。

**觀念**

- 至少寫要過渡的屬性與時間。時間用秒或毫秒。
- ease 兩頭較慢，linear 等速。只寫時間時，速度用預設的 ease。
- 適合過渡的是顏色、透明度、變形。不要拿版面的寬高去做大段動畫，容易讓周圍重新排。
- 想讓人看得完，時間多半落在 0.2 到 0.4 秒。

```html 03-css/pages/32-css-transition.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>轉場</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .card {
        width: min(100%, 20rem);
        padding: 1rem;
        background: #f0fdfa;
        transition: transform 0.3s ease;
      }

      .card:hover {
        transform: translateY(-0.35rem);
      }
    </style>
  </head>
  <body>
    <h1>兩個狀態之間</h1>
    <article class="card">
      <h2>抬起的卡片</h2>
      <p>滑鼠放上來時往上移，移開時回到原位。</p>
    </article>
  </body>
</html>
```

**解析**

- 卡片平常在原位。
- 滑鼠放上去時，它在 0.3 秒內移到上面一點，而不是瞬間跳過去。
- 移開後，同一條 transition 把變形走回沒有位移的狀態。
- transition 要寫在會一直在的那條規則上。
- 只寫在 hover 裡時，移開的那一段常常沒有過渡。

```css
.card {
  transition: transform 0.3s ease; /* 屬性、時間、速度 */
}
.card:hover {
  transform: translateY(-0.35rem); /* 終點 */
}
```

{% note success %}
**換你試試：**
時間改成 1s，速度改成 linear。滑鼠放上去時應等速、而且明顯比較慢。
{% endnote %}

<details>
<summary>參考答案</summary>

終點仍是往上 0.35rem。改變的是過程：整整一秒、沒有兩頭的加減速。移開時也用同一秒走回來。

```diff 03-css/pages/32-css-transition.html
  // ...
          padding: 1rem;
          background: #f0fdfa;
-         transition: transform 0.3s ease;
+         transition: transform 1s linear;
        }
  
        .card:hover {
          // ...
```

</details>

### 動畫自己播放

@keyframes 列出幾個時間點的樣子，animation 再把這段影格接到元素上，並決定播一次還是重複、播多久。它不需要 hover 才開始。

**觀念**

- from 與 to 是起點和終點。也可以寫百分比。
- animation 依序常寫：影格名稱、一次多久、速度、延遲、次數、方向。
- infinite 會一直播。alternate 會正向播完再反向播回來。
- 只想播一次時，不要寫 infinite。播完會停在最後一個影格，除非你另外寫 animation-fill-mode。

```html 03-css/pages/33-css-keyframes.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>動畫</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      @keyframes pulse {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.08);
        }
      }

      .badge {
        display: inline-block;
        padding: 0.35rem 0.75rem;
        background: #115e59;
        color: #f0fdfa;
        animation: pulse 1s ease-in-out infinite alternate;
      }
    </style>
  </head>
  <body>
    <h1>自己播放</h1>
    <p class="badge">報名中</p>
  </body>
</html>
```

**解析**

- 徽章載入後就開始在 1 倍與 1.08 倍之間放大縮小，不用把滑鼠放上去。
- alternate 讓它放大後縮回來，不會在終點突然跳回起點。
- infinite 表示不會停。
- 旁邊沒有別的元素被這個縮放推開。

```css
.badge {
  /* 名稱、時間、速度、次數、正反方向 */
  animation: pulse 1s ease-in-out infinite alternate;
}
```

{% note success %}
**換你試試：**
拿掉 infinite，讓徽章只走一個來回就停。alternate 留著，時間不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

次數改成 1 之後，徽章放大再縮回一次就停在起點。alternate 仍負責這一回是正向再反向。頁面重新整理才會再播。

```diff 03-css/pages/33-css-keyframes.html
  // ...
          background: #115e59;
          color: #f0fdfa;
-         animation: pulse 1s ease-in-out infinite alternate;
+         animation: pulse 1s ease-in-out 1 alternate;
        }
      </style>
    // ...
```

</details>

## 用開發者工具除錯

規則沒有出現在畫面上時，先看有沒有打中，再看誰把它劃掉，最後看 Computed 的結果。面板裡直接改的值只活到重新整理之前。

### Styles 與 Computed

Styles 列出打中這個元素的規則，被劃掉的是沒留下的宣告。Computed 是層疊與繼承都算完之後的值，包含你沒寫、但瀏覽器補上的項目。

**觀念**

- 完全找不到你的選擇器：名字不對，或 `style` 沒存檔，還不是權重問題。
- 找得到但被劃掉：有另一條更優先，或同一條裡較下面的宣告蓋過它。
- Computed 裡可以反查這個值是哪一條規則來的。
- 在面板打字只是暫時預覽。要留下，必須改這頁的 `style` 再重新整理。

```html 03-css/pages/25-inspect.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Styles</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .note {
        color: #b45309;
      }

      .note {
        color: #0f766e;
      }
    </style>
  </head>
  <body>
    <h1>誰留下</h1>
    <p class="note">這段應是深青綠。較上面的琥珀色會被劃掉。</p>
  </body>
</html>
```

**解析**

- 點這段文字。
- Styles 裡第一個顏色有刪除線，第二個深青綠沒有。
- Computed 的 color 是深青綠。
- 在面板把深青綠改成別的顏色，畫面會立刻變，重新整理後又回到 `style` 裡的深青綠。

```css
.note {
  color: #b45309; /* Styles 裡被劃掉 */
}
.note {
  color: #0f766e; /* Computed 留下這個 */
}
```

{% note success %}
**換你試試：**
在 `style` 裡把留下的顏色改成 `#9f1239`，存檔後重新整理。面板上若還有你手改的顏色，重新整理後不該留下。
{% endnote %}

<details>
<summary>參考答案</summary>

`style` 較下面那條改成玫瑰紅之後，重新整理會留下玫瑰紅，琥珀色仍被劃掉。只在面板改、沒有寫進 `style` 的值，重新整理就消失。

```diff 03-css/pages/25-inspect.html
  // ...
        }
  
        .note {
-         color: #0f766e;
+         color: #9f1239;
        }
      </style>
    // ...
```

</details>

### 盒子、狀態與斷點

這一節在開發者工具裡對三處：

- Computed 的盒模型圖會標出內容、內距、邊框、外距。
- Styles 可以強迫打開某個狀態。
- 裝置工具列可以改視窗寬度，看媒體查詢有沒有成立。

**觀念**

- 點盒模型圖的某一層，可以直接看出是哪一條規則寫的。
- Styles 面板的 `:hov` 可以暫時打開 hover 或 focus，不必真的把滑鼠放上去。
- 裝置工具列改變的是視窗寬度。查詢寫的是 min-width 時，拉過那個寬度，查詢裡的規則才出現在 Styles。

```html 03-css/pages/34-css-devtools-box.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>盒子與斷點</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .go {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .go:hover {
        background: #0f766e;
      }

      @media (min-width: 40rem) {
        .wide {
          color: #0f766e;
        }
      }
    </style>
  </head>
  <body>
    <a class="go" href="#top">看行程</a>
    <p class="wide">視窗寬於 40rem 時，這段才變成深青綠。</p>
  </body>
</html>
```

**解析**

- 點那顆連結，盒模型圖會看到上下 0.5rem、左右 1rem 的內距。
- 打開 `:hov` 的 hover，背景會換成另一階青綠，就算滑鼠沒有放在上面。
- 把視窗拉到比 40rem 窄，那段說明不是深青綠，Styles 裡的媒體查詢會標成不成立。
- 拉寬之後，顏色規則才生效。

```css
.go {
  padding: 0.5rem 1rem; /* 盒模型圖的內距 */
}
@media (min-width: 40rem) {
  .wide {
    color: #0f766e; /* 視窗不夠寬時，這條不成立 */
  }
}
```

{% note success %}
**換你試試：**
把連結的左右內距從 1rem 改成 2rem，存檔重新整理。盒模型圖左右應變寬，hover 的顏色不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

左右內距變大之後，按鈕變寬，盒模型圖的左右數字跟著變。上下仍是 0.5rem。hover 仍是另一階青綠，斷點仍是 40rem。

```diff 03-css/pages/34-css-devtools-box.html
  // ...
        .go {
          display: inline-block;
-         padding: 0.5rem 1rem;
+         padding: 0.5rem 2rem;
          background: #115e59;
          color: #f0fdfa;
        // ...
```

</details>

### 動畫面板

Animations 面板看得到正在播的動畫與轉場，可以暫停、拖時間。這是在看過程，不是在改 `style`。

**觀念**

- 有 animation 或進行中的 transition 時，面板才有項目。
- 暫停後拖曳時間軸，可以停在某一格看變形。
- 面板把時間拉長只影響這一次預覽。重新整理後，仍是 `style` 裡寫的秒數。

```html 03-css/pages/35-css-devtools-anim.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>動畫面板</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      @keyframes pulse {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.08);
        }
      }

      .badge {
        display: inline-block;
        padding: 0.35rem 0.75rem;
        background: #115e59;
        color: #f0fdfa;
        animation: pulse 1s ease-in-out infinite alternate;
      }
    </style>
  </head>
  <body>
    <h1>打開動畫面板</h1>
    <p class="badge">報名中</p>
  </body>
</html>
```

**解析**

- 按 <kbd>F12</kbd>，打開 Animations。
- 徽章的 pulse 會出現在清單裡。
- 暫停後，徽章停在當下的大小。
- 拖時間軸，可以看到它放大與縮回。
- 重新整理後又從 `style` 的 1 秒循環開始。

```css
.badge {
  animation: pulse 1s ease-in-out infinite alternate;
}
```

{% note success %}
**換你試試：**
把 `style` 裡的 `1s` 改成 3s，存檔重新整理。面板上這一條的長度應變成三秒，而不是你剛剛在面板拖出來的位置。
{% endnote %}

<details>
<summary>參考答案</summary>

時間改在 `style` 裡，重新整理後每一輪是三秒。alternate 與 infinite 沒有改，所以仍會來回、不會自己停。

```diff 03-css/pages/35-css-devtools-anim.html
  // ...
          background: #115e59;
          color: #f0fdfa;
-         animation: pulse 1s ease-in-out infinite alternate;
+         animation: pulse 3s ease-in-out infinite alternate;
        }
      </style>
    // ...
```

</details>

# 選讀：邊界與進階動效

這一章可以整章跳過。外距穿出、邏輯方向、多行省略、繞排、立體翻面、容器查詢，以及可補間的變數，都是前面示範的延伸。

## 選讀：外距穿出與邏輯方向

垂直外距有時會跑出父層，書寫方向也有另一套屬性名稱。版面仍以盒子那一節的物理方向為主，這裡只認得發生了什麼。

### 選讀：外距穿出

父層若沒有上內距、上邊框，也沒有上緣內容，子層的上外距會和父層合併，背景像是包不住那段空隙。父層改成 flow-root 就會成為新的區塊格式化情境，外距不再穿出去。

**觀念**

- 穿出去時，空隙出現在父層外面，父層的背景從子層的內容才開始。
- flow-root、一點上內距，或一條上邊框，都可以把外距擋在裡面。
- 這是垂直外距合併的一種，左右外距不會這樣穿出。

```html 03-css/pages/40-css-margin-out.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>外距穿出</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .open,
      .held {
        background: #ccfbf1;
        margin-bottom: 1.5rem;
      }

      .open p,
      .held p {
        margin-top: 2rem;
        background: #fff;
      }

      .held {
        display: flow-root;
      }
    </style>
  </head>
  <body>
    <div class="open">
      <p>這段的上外距會穿出淺青底。</p>
    </div>
    <div class="held">
      <p>這段的上外距留在淺青底裡面。</p>
    </div>
  </body>
</html>
```

**解析**

- 第一塊的淺青底緊貼著白底段落，2rem 的空隙跑到淺青底的上面。
- 第二塊加了 flow-root，同樣的 2rem 出現在淺青底內部，白底段落被往下推，父層背景包得住。

```css
.held {
  display: flow-root; /* 子層的上外距不再和父層合併 */
}
```

### 選讀：邏輯方向

介面要同時應付由左至右與由右至左時，用邏輯方向：inline 是字前進的方向，block 是一段接著一段的方向。橫書時，inline 的起點在左，block 的起點在上。

**觀念**

- margin-inline 是字向的兩側。橫書時就是左右。
- padding-inline-start 與 border-inline-start 跟「行首」那一側，由右至左時會換到另一邊。
- 課堂範本仍寫上、右、下、左。讀得到邏輯屬性即可。

```html 03-css/pages/41-css-logical.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>邏輯方向</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .card {
        margin-inline: auto;
        padding-inline-start: 1rem;
        border-inline-start: 6px solid #0f766e;
        max-width: 24rem;
      }
    </style>
  </head>
  <body>
    <article class="card">
      <h1>行首有一條邊</h1>
      <p>橫書時，這條邊在左邊。方向改成由右至左時，它會跟著行首走到右邊。</p>
    </article>
  </body>
</html>
```

**解析**

- 卡片比版面窄，字向兩側的外距是 auto，所以居中。
- 行首內距與行首邊框在橫書時位於左邊。
- 把 html 的 dir 設成 rtl 之後，同一條邊會出現在右邊，不必改樣式。

```css
.card {
  border-inline-start: 6px solid #0f766e; /* 跟著行首，不寫死左邊 */
}
```

### 選讀：層疊情境與多行省略

opacity 小於 1，或 transform 不是 none，也會讓該元素變成新的層疊情境，子孫的 z-index 出不去，比的是這層父親。多行省略仍常見一組帶前綴的寫法，只用在「兩行以後省略」。

**觀念**

- 父層只要有變形，裡面再大的 z-index 也壓不過父層外面的兄弟。
- 祖先有 transform 時，子孫的 fixed 可能改成相對那個祖先，而不再是視窗。
- 多行省略同時要有行數限制與 overflow: hidden。標準的 line-clamp 正在普及，課堂認得這組即可。

```html 03-css/pages/42-css-clamp.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>省略</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .clip {
        width: min(100%, 16rem);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <p class="clip">
      洛奇旅行的行程說明若超過兩行，多出來的句子會被省略。京都、大阪、濟州與花蓮都寫在同一段裡，第三行不該再出現。
    </p>
  </body>
</html>
```

**解析**

- 段落寬度被收住之後，第三行不再畫出來，尾端是省略號。
- 拿掉 overflow 或行數限制，省略就不會成立。
- 這組前綴不要抄到其他屬性上。

```css
.clip {
  -webkit-line-clamp: 2; /* 只留兩行 */
  overflow: hidden;
}
```

## 選讀：float 只留繞排

float 讓後面的文字沿著圖走；多欄則用 Grid。舊頁面若還用浮動切欄，讀得到原因即可，新的版面不要再這樣排。

### 選讀：繞排與父層高度

float: left 把元素撥到這一行的左側，後面的文字沿著它的右邊走。它不計入父層的一般高度，所以短文時父層背景可能包不住圖，父層加上 flow-root 即可。

**觀念**

- 繞排適合圖旁配一段說明。
- 父層要包住浮動的圖，用 flow-root，不必再為了撐高去加一個空的清除元素。
- 下一段若要接在整則故事後面，不要讓它勾進浮動的旁邊。flow-root 會一併處理這件事。

```html 03-css/pages/26-float.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>繞排</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .story {
        display: flow-root;
        background: #f0fdfa;
      }

      .story img {
        float: left;
        margin: 0 0.75rem 0.5rem 0;
      }
    </style>
  </head>
  <body>
    <div class="story">
      <img src="https://picsum.photos/id/1018/160/120" alt="海岸" width="160" height="120" />
      <p>這段文字沿著照片的右邊走。父層的淺青底要包住照片，不能只剩文字那麼高。</p>
    </div>
    <p>下一段接在整則故事的下面。</p>
  </body>
</html>
```

**解析**

- 照片靠左，段落從它右邊開始，空間不夠時才繞到照片下面。
- 淺青底包住整張照片。
- 拿掉 flow-root 時，父層高度可能只跟文字一樣高，照片會凸出底色，下一段也可能爬到照片旁邊。

```css
.story img {
  float: left; /* 只負責讓文字繞過來 */
}
.story {
  display: flow-root; /* 父層高度包住浮動的圖 */
}
```

### 選讀：不要拿來做多欄

多欄不要再用浮動配百分比寬度，同一件事是 Grid 的自動欄數加上 gap。浮動切出來的欄在最後一行常常對不齊，也容易和繞排混在一起。

**觀念**

- 欄寬、欄距、換行交給 Grid。
- inline-flex 與 inline-grid 讓容器坐在文字行裡，裡面仍是 Flex 或 Grid。
- display: contents 會讓元素自己的盒子消失，也影響無障礙樹，課堂不要用來少包一層。

```html 03-css/pages/36-css-no-float.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>不要用 float 切欄</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .trips {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
        gap: 0.75rem;
      }

      .trips article {
        padding: 0.75rem;
        background: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <div class="trips">
      <article>京都</article>
      <article>大阪</article>
      <article>濟州</article>
    </div>
  </body>
</html>
```

**解析**

- 三張卡片依寬度自動決定欄數，縫是 gap。
- 這裡沒有 float，最後一行不會因為百分比寬度留下一條對不齊的欄。
- 同一組卡片若改成左浮動加三分之一寬，視窗變窄時容易溢出或留下奇怪的空隙。

```css
.trips {
  display: grid; /* 多欄用這個，不用 float */
  gap: 0.75rem;
}
```

## 選讀：立體翻面

卡片可以沿垂直軸轉半圈，讓背面轉到前面，這需要視距、保留 3D，以及把背面藏起來。一般版面用不到，知道組法即可。

父層寫 perspective，子層的旋轉才有遠近；卡片本身要 preserve-3d，正面與背面才在同一個立體空間裡。背面用 backface-visibility 藏起來，否則兩面會疊在一起。

**觀念**

- 視距愈小，透視愈誇張。
- 背面先轉 180 度放好。滑鼠放上來時，整張卡片再轉 180 度，背面才朝向你。
- 轉場寫在卡片上，翻面才不會瞬間跳過去。

```html 03-css/pages/27-flip.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>翻面</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .scene {
        width: 10rem;
        height: 6rem;
        perspective: 40rem;
      }

      .card {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }

      .scene:hover .card {
        transform: rotateY(180deg);
      }

      .face {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0;
        text-align: center;
        line-height: 6rem;
        backface-visibility: hidden;
      }

      .front {
        background: #115e59;
        color: #f0fdfa;
      }

      .back {
        background: #9f1239;
        color: #fff;
        transform: rotateY(180deg);
      }
    </style>
  </head>
  <body>
    <div class="scene">
      <div class="card">
        <p class="face front">正面</p>
        <p class="face back">背面</p>
      </div>
    </div>
  </body>
</html>
```

**解析**

- 平常只看得到深青綠的正面。
- 滑鼠放在場景上，卡片在 0.6 秒內轉半圈，玫瑰紅的背面轉到前面。
- 背面事先轉了 180 度，所以翻過來時字是正的。
- 拿掉 preserve-3d 或 backface-visibility，兩面會疊在一起或看不出翻面。

```css
.scene {
  perspective: 40rem; /* 視距 */
}
.face {
  backface-visibility: hidden; /* 轉到背後時不畫 */
}
```

## 選讀：容器查詢

媒體查詢看的是視窗；側欄佔掉一部分之後，主文自己可能還很窄，所以容器查詢改看某個祖先盒子的寬度。動態視窗高度則是另一件事：手機瀏覽器的工具列會改變可見高度。

### 選讀：依容器寬度改排版

先在父層建立容器，子層的查詢才有對象。沒有寫名字時，對到最近的那層容器。

**觀念**

- container-type 設成 inline-size，表示用這個盒子的寬度當查詢依據。
- `@container (min-width: …)` 寫在子層的規則外。門檻比的是容器，不是視窗。
- 視窗已經很寬、卡片自己仍很窄時，不該因為視窗斷點就改成橫排。

```html 03-css/pages/28-read-extra.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>容器查詢</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .slot {
        container-type: inline-size;
        width: min(100%, 22rem);
        border: 1px solid #99f6e4;
      }

      .card {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .card img {
        width: 100%;
        height: auto;
      }

      @container (min-width: 24rem) {
        .card {
          flex-direction: row;
        }

        .card img {
          width: 8rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="slot">
      <article class="card">
        <img src="https://picsum.photos/id/1016/640/360" alt="湖" />
        <p>這個框還窄時，圖在上面。框自己夠寬才改成並排。</p>
      </article>
    </div>
  </body>
</html>
```

**解析**

- 外框目前最寬 22rem，比 24rem 小，所以圖在文字上面，就算瀏覽器視窗很寬也一樣。
- 把外框的寬度改到超過 24rem，卡片才改成橫排，圖片變成固定寬。
- 查詢看的是 slot，不是視窗。

```css
.slot {
  container-type: inline-size; /* 子層的 @container 看這裡的寬 */
}
```

### 選讀：動態視窗高度

vh 是視窗高度的百分之一，在手機上常常把瀏覽器工具列也算進去，內容會被擋到或高出一截。dvh 跟著目前看得到的視窗高度。

**觀念**

- 100vh 是最大視窗高度的算法，工具列收合前後可能不一致。
- 100dvh 是動態可見高度。做整屏的第一屏時優先考慮它。
- 這一頁在桌機上兩者常常一樣高。差別主要出現在手機會縮放工具列的瀏覽器。

```html 03-css/pages/39-css-dvh.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>動態視窗高度</title>
    <style>
      body {
        margin: 0;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .hero {
        min-height: 100dvh;
        padding: 1.5rem;
        background: #115e59;
        color: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <section class="hero">
      <h1>這一屏用 dvh</h1>
      <p>手機工具列展開或收合時，高度跟著可見範圍，而不是固定的 vh。</p>
    </section>
  </body>
</html>
```

**解析**

- 這一屏至少跟目前看得到的視窗一樣高，底色鋪滿。
- 若改成 100vh，在手機會出現工具列的瀏覽器裡，底部可能被工具列蓋住，或在工具列收合後底下多出一截空白。

```css
.hero {
  min-height: 100dvh; /* 可見視窗的高度，不是把工具列算死 */
}
```

## 選讀：把變數註冊成可補間

一般自訂屬性存的是一串文字，轉場不知道要怎麼從一個顏色走到另一個顏色。用 @property 註冊類型與初始值之後，這個變數才可以補間。

註冊時有三個欄位要一起看：

- syntax 告訴瀏覽器這是角度、顏色或長度。
- inherits 決定子層要不要繼承。
- initial-value 是還沒寫值時的起點，註冊之後這個值是必要的。

**觀念**

- 沒有註冊時，對變數做 transition，畫面多半會瞬間跳到終點。
- 註冊成角度之後，漸層的方向才會在兩端之間轉動。
- 這是進階寫法。前面的品牌色變數不需要先註冊也能用。

```html 03-css/pages/38-css-property.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>可補間的變數</title>
    <style>
      @property --angle {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }

      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .swatch {
        --angle: 0deg;
        width: min(100%, 16rem);
        padding: 2rem 1rem;
        background: linear-gradient(var(--angle), #115e59, #99f6e4);
        transition: --angle 0.6s linear;
      }

      .swatch:hover {
        --angle: 90deg;
      }
    </style>
  </head>
  <body>
    <div class="swatch">滑鼠放上來，漸層的角度會轉過去。</div>
  </body>
</html>
```

**解析**

- 平常漸層從 0 度畫起。
- 滑鼠放上去時，角度在 0.6 秒內走到 90 度，顏色的方向會轉，而不是整塊瞬間換掉。
- 拿掉 @property 再做同一個過渡，角度多半會跳過去，因為瀏覽器不知道這串文字是角度。

```css
@property --angle {
  syntax: "<angle>"; /* 沒有類型就不能補間 */
  inherits: false;
  initial-value: 0deg;
}
```

# 本篇重點回顧

下面只收這篇用過的觀念。選讀可以整節跳過。

- 一條規則是選擇器加上宣告；同屬性寫兩次留下較下面的，拼錯的那一行丟掉。
- 元素、class、id 與組合決定打到誰；權重四欄由左到右比，不進位，相同時看誰寫在後面。
- 沒寫的屬性才談繼承；inherit、initial、unset、revert 決定跟父層、回到初始，或回到瀏覽器預設。
- 內文長度以 rem 為主，顏色寫出色碼；字用字型堆疊，背景可以疊底色與圖層。
- 盒子分內容、內距、邊框、外距；寬度要用 border-box。display、定位與 overflow 決定怎麼排、跟誰比座標、超出時怎麼辦。
- Flex 排一個方向，Grid 排欄與列；窄畫面先做會縮的版面，結構要變才寫最小寬度的媒體查詢。
- 重複的色與間距收成會繼承的變數；transform 不改佔位，transition 連接兩個狀態，keyframes 自己播。
- 對不上時看 Styles 的刪除線與 Computed 的最終值；面板裡的修改重新整理就沒了。

上網查這篇的說法時，用括號裡的英文當關鍵字。

# 專有名詞中英對照

## 規則怎麼套上元素

- 選擇器（selector）
- 層疊樣式表（Cascading Style Sheets）
- 宣告（declaration）
- 樣式表（stylesheet）
- 屬性（property）
- 權重（specificity）
- 層疊（cascade）
- 繼承（inheritance）
- 邊框（border）
- 外部樣式表（external stylesheet）
- 行內樣式（inline style）
- 元素選擇器（type selector）
- 錨點（anchor）
- 直接子層（child combinator）
- 兄弟（sibling）
- 後代選擇器（descendant selector）
- 偽類（pseudo-class）
- 偽元素（pseudo-element）
- 連結四態（link pseudo-classes）
- 焦點（focus）
- 結構偽類（structural pseudo-class）
- 屬性選擇器（attribute selector）
- 初始值（initial value）
- 行高（line-height）
- 外距（margin）
- 內距（padding）
- 作者樣式（author style）

## 字、色與背景

- CSS 像素（CSS pixel）
- 根元素（root element）
- 包含區塊（containing block）
- 視窗（viewport）
- 十六進位（hexadecimal）
- 透明度（alpha）
- 色碼（hex color）
- 字型堆疊（font stack）
- 通用家族（generic font family）
- 簡寫（shorthand property）
- 字距（letter-spacing）
- 背景圖層（background layer）
- 漸層（gradient）
- 自訂屬性（custom property）
- 變數（CSS variable）
- 層（cascade layer）

## 盒子與欄位排版

- 定位（positioning）
- 盒子模型（box model）
- 外距合併（margin collapsing）
- 層疊情境（stacking context）
- 主軸（main axis）
- 交叉軸（cross axis）
- 欄距（column gap）
- 列距（row gap）

## 響應式、變數與動態

- 變形（transform）
- 轉場（transition）
- 動畫（animation）
- 媒體查詢（media query）
- 響應式網頁設計（responsive web design）
- 流動版面（fluid layout）
- 斷點（breakpoint）
- 關鍵影格（keyframe）
- 開發者工具（DevTools）

## 選讀：邊界與進階動效

- 外距穿出（margin collapsing）
- 邏輯方向（logical properties）
- 多行省略（line clamp）
- 繞排（float）
- 容器查詢（container query）
- 補間（interpolation）
- 區塊格式化情境（block formatting context）
- 動態視窗高度（dynamic viewport height）
