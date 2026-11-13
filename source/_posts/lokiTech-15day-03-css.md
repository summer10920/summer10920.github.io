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

CSS（Cascading Style Sheets，層疊樣式表）決定頁面長什麼樣子。這篇從規則、選擇器與層疊（權重、繼承）講起，接著是單位、顏色、文字與背景，再進到盒模型、display、定位、Flexbox 與 Grid 的版面，最後是響應式設計、CSS 變數、轉場與動畫，並學會用開發者工具檢查樣式。選讀補上進階選擇器、@layer、字型檔、外距合併、邏輯方向、層疊情境、容器查詢與 @property。

<!-- more -->

預覽與除錯以 Chrome 為準。按 <kbd>F12</kbd>，打開 Elements，右側 Styles 看規則有沒有打中，Computed 看最後用上的值。被劃掉的宣告代表沒有留下。

# 規則怎麼套上元素

樣式表是一組規則。瀏覽器先讀 HTML，再把對得上的規則套上元素，最後才排版與繪製。很多條規則搶同一個屬性時，靠權重與層疊決定留下哪一條；沒有任何規則寫到的屬性，才輪到繼承：可繼承的屬性取父層的值，其餘用預設值。

課堂 demo 為了閱讀方便，把樣式寫在同一份 HTML 的 style 標籤裡；實務上則放進獨立的樣式表。只有「三種寫法」這一節用外部樣式表，用來練習 link 的路徑。

## 規則的寫法與引入

一條規則先選到元素，再寫要改的屬性。你改的是這份文字，存檔後重新整理，瀏覽器才會重新套一次。這一節先拆開一條規則的零件，再看樣式可以寫在哪裡。

{% mermaid graph LR %}
html["HTML 元素"] --> sel["選擇器比對"]
sel --> decl["宣告：屬性與值"]
decl --> used["套用後的外觀"]
{% endmermaid %}

### 規則的零件

一條規則分成「選到誰」和「設什麼」。大括號裡可以有很多行，每一行稱為宣告，由屬性、冒號、值與分號組成。這一節只用顏色、字級、字重當例子，間距與邊框後面才登場。

**觀念**

- 選擇器寫在大括號前面，決定打到哪些元素；這裡先用元素選擇器，也就是直接寫標籤名稱。
- 同一個屬性在同一條規則寫兩次，留下較下面那次。
- 屬性名稱拼錯時，瀏覽器只丟掉那一行，同一條規則的其他宣告仍然有效。
- 逗號讓多個選擇器共用同一組宣告。
- CSS 的註解只有一種寫法：斜線加星號包住文字，兩條斜線與 HTML 的註解都不是 CSS 註解。

```html 03-css/pages/01-syntax.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>一條規則</title>
    <style>
      /* 選擇器 { 屬性: 值; } */

      h1,
      h2 {
        font-weight: 400; /* 逗號：h1 與 h2 共用這一組宣告 */
      }

      h1 {
        color: #99f6e4; /* 同一個屬性寫兩次，這行會被下面留下的那行蓋掉 */
        colour: red; /* 屬性名拼錯，只丟掉這一行，標題不會變紅 */
        color: #115e59;
        font-size: 2.25rem;
      }

      p {
        font-size: 1.125rem;
      }
    </style>
  </head>
  <body>
    <h1>一條規則三個零件</h1>
    <p>標題是深青綠，不是紅色。</p>
    <h2>次標題跟主標題共用字重</h2>
    <p>這段和上一段共用 p 的字級。</p>
  </body>
</html>
```

**解析**

- 畫面由上到下是深青綠的大標題、一段稍大的文字、次標題，再一段同樣大小的文字。
- 兩個標題都不再是粗體，因為逗號讓 h1 與 h2 共用字重設定。瀏覽器預設的標題是粗體，這裡才看得出共用的效果。
- 次標題沒寫顏色，所以維持預設的黑色。
- 字級寫的 rem 是跟著網頁根字級換算的長度單位，後面的單位一節再教，這裡只要看得出標題比內文大。
- 按 <kbd>F12</kbd> 選取 h1，Styles 裡第一個顏色會被劃線，拼錯的那行會被標成無效，留下的是 `#115e59`。

{% note info %}
**Styles 面板**
點選一個節點後，Styles 由上到下是較優先的規則，被劃線的是沒贏的宣告；Computed 則列出最後算完的值。
{% endnote %}

### 三種寫法

樣式可以寫在標籤上、寫在這一頁的 style 標籤裡，或寫成獨立檔再用 link 掛上。多頁網站把共用規則放進獨立檔，改一次，每一頁一起變。

**觀念**

- 行內樣式寫在開始標籤的 style 屬性，那裡只能寫宣告，不能寫選擇器。
- 頁內樣式寫在 head 的 style 標籤，只服務這一頁。
- 外部樣式表用 link 掛上，href 的路徑相對於這份 HTML。
- 權重相同時，原始碼較後面的贏；link 與 style 之間也是比它們在 head 裡的先後。

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
        color: #b45309;
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

- 三行字顏色不同：第一行玫瑰紅來自標籤上的 style，第二行琥珀色來自這一頁的 style 標籤，第三行深青綠加粗體來自 link 掛上的檔案。
- 把 href 改成不存在的檔名再重新整理，第三行會變回預設的黑色一般字重，前兩行不受影響。
- 這時 F12 的 Network 面板會看到那份樣式表載入失敗。

{% note warning %}
**行內樣式很難再改**
標籤上的 style 比樣式表裡的一般宣告優先，之後想改只能再動 HTML。版面與品牌色留在樣式表，不要塗在標籤上。
{% endnote %}

## 選擇器與權重

選擇器是規則的前半。打不中，後面的宣告就不會出現在那個節點的 Styles 裡；很多條都打中同一個屬性時，再由權重與原始碼順序決定留下哪一條。這一節先學各種選擇器，最後才算權重與先後順序。

### 元素、class 與 id

class 與 id 是 HTML 給元素的名字，樣式表再用名字去選。class 在 HTML 寫成 class 屬性，樣式表前面多一個點；id 在 HTML 寫成 id 屬性，樣式表前面多一個 `#`。

**觀念**

- 元素選擇器打到所有該標籤。
- class 可以重複用在很多元素，一個元素也可以同時有多個 class，中間用空格分開。
- id 在一份文件裡只能給一個元素，它同時是網址錨點的名字。
- 兩個 class 寫在一起、中間沒有空格，表示同一個元素兩個都要有。
- 屬性選擇器用中括號，依元素有哪個屬性、值是什麼來選。
- 星號選到所有元素。
- 會重複出現的樣式用 class；id 留給全頁唯一、而且需要當錨點的元素，不要拿來把權重拉高。

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

      /* 屬性選擇器：有 target="_blank" 的連結 */
      a[target="_blank"] {
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
    <p>
      <a href="#featured">本頁錨點</a>
      <a href="https://developer.mozilla.org/zh-TW/" target="_blank" rel="noopener">另開分頁的連結</a>
    </p>
  </body>
</html>
```

**解析**

- 第一段是石板色，因為只有元素選擇器打中它；兩段只帶 tour 的字是深青綠。
- 同時帶 tour 與 soldout 的那段，刪除線來自 soldout，顏色則來自兩個 class 寫在一起的那條。它比單獨的 tour 更具體，所以顏色不留深青綠，而是灰色。
- 帶 id 的那段沒有 tour，所以顏色仍是元素選擇器的石板色，另外字重較粗。
- 兩個連結裡，只有帶 target 的那個變粗，另一個維持預設樣式。
- id 重複在 HTML 裡不合法，錨點也只會跳到第一個，所以同一個名字不要給第二個元素。

{% note info %}
**打不中時先對名字**
Styles 裡完全沒有你寫的那條，多半是 class 拼字不同，或檔案沒存檔。先對 HTML 的名字與選擇器，再談誰蓋過誰。
{% endnote %}

### 組合關係

組合是在基本選擇器之間加上關係，包括後代、直接子層、緊鄰的下一個兄弟，以及後面所有兄弟。這些符號都算在同一條選擇器裡，逗號則是把它拆成多條。

**一覽**

- 空格是後代：祖先裡面任何深度的元素都算。
- 大於符號是直接子層：只算直接的小孩，孫層不算。
- 加號是緊鄰兄弟：只算緊接在後面的那一個。
- 波浪符號是後方兄弟：同一個父層裡、排在後面的全部兄弟。

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
        color: #475569; /* 同一個父層裡，h2 之後的全部 p */
      }

      .stops li + li {
        text-decoration: line-through; /* 緊接在另一個 li 後面的 li */
      }
    </style>
  </head>
  <body>
    <h1>關係寫在選擇器中間</h1>
    <article>
      <p class="direct">這段是 article 的直接小孩，所以較粗，也有深色。</p>
      <div>
        <p>後代選擇器打得到這段，直接子層打不到，所以不會變粗。</p>
      </div>
    </article>
    <h2>兄弟關係</h2>
    <p>這個標題後面的段落會改成石板色。</p>
    <p>這段也在標題後面，同樣改色。</p>
    <ul class="stops">
      <li>第一項沒有刪除線</li>
      <li>第二項有</li>
      <li>第三項也有，因為它緊接在第二項後面</li>
    </ul>
  </body>
</html>
```

**解析**

- article 裡兩段都是深青綠，因為後代選擇器不管中間有沒有多包一層 div；較粗的只有直接小孩那一段。
- h2 後面的兩段都變成石板色，波浪符號把後面的兄弟都算進去。
- 清單第一項沒有刪除線，第二、三項都有，因為每一項都是「緊接在另一個 li 後面」。
- 把波浪符號改成加號，只有緊接在 h2 後面的第一段會變色。
- 後代選擇器也會打到之後才嵌進去的元素，能用 class 說清楚的，就少靠很深的空格。

{% note info %}
**選擇器可以巢狀書寫**
現代 CSS 支援在規則裡面再寫規則，用 `&` 代表外層選擇器，下面這段等同 `.stops li + li`。權重的算法也一樣。

```css
.stops {
  & li + li {
    text-decoration: line-through;
  }
}
```
{% endnote %}

### 偽類與偽元素

偽類描述元素的狀態，或它在父層排第幾個；偽元素描述元素生出來的一個片段。兩者都接在選擇器後面，這一節再多用一個新屬性 content。

**一覽**

- 狀態偽類：連結的四種狀態、滑鼠放上去、按住，以及鍵盤焦點。
- 結構偽類：依在父層的位置選取，例如奇偶項、第一個小孩。
- 偽元素：選到元素內部的片段，例如輸入框的提示字，或在元素前面插入文字。

**觀念**

- 偽類寫一個冒號，偽元素寫兩個冒號。
- 連結四態要照 link、visited、hover、active 的順序寫，因為它們權重相同，後寫的蓋先寫的；順序顛倒時，前面的狀態會被後面的蓋掉。
- 鍵盤焦點用 focus-visible：只有用 <kbd>Tab</kbd> 走到時才出現，滑鼠點擊不會觸發。
- visited 為了保護瀏覽紀錄，只允許改與顏色有關的屬性。
- 結構偽類看的是在父層的第幾個小孩。第一個小孩若是標題，段落的 first-child 就打不中；first-of-type 才是「該標籤的第一個」。
- before 必須寫 content 才看得到，它插入的文字無法被選取複製，重要資訊仍要留在 HTML。

```html 03-css/pages/05-selectors-pseudo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>偽類與偽元素</title>
    <style>
      /* 順序：link、visited、hover、active，focus-visible 放最後 */
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
        color: #0369a1;
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
    <p><label>姓名 <input type="text" placeholder="王小明" /></label></p>
    <p><label>狀態 <input type="text" value="已額滿" disabled /></label></p>
  </body>
</html>
```

**解析**

- 連結平時是深青綠，滑鼠放上去變玫瑰紅，按住時變琥珀色；用 <kbd>Tab</kbd> 走進來時，字變成藍色。曾點過的連結則是紫色。
- 清單的第 1、3 項是深青綠，第 2 項較粗，第 4 項維持預設。
- 標題下面那段不是玫瑰紅，因為它不是父層的第一個小孩；它是第一個 p，所以由 first-of-type 那條留下深青綠。
- 價格前面多出 NT$，HTML 裡仍只有數字。
- 姓名欄的提示字與停用欄裡的字都是淺灰。
- 把 nth-child 的 odd 改成 even，深青綠就換到第 2、4 項。清單若中間插進別的標籤，奇偶也會跟著位移。

### 四欄權重

很多條規則打中同一個元素的同一個屬性時，要有一套規則決定誰贏。權重（specificity）用來比較哪一條選擇器比較具體：把選擇器拆成四欄，由左到右比較，欄與欄不進位。

**觀念**

比較同一個元素、同一個屬性時，順序是：

- 先看有沒有 important（宣告值後面加驚嘆號與 important），有的贏過沒有的；兩邊都有時再往下比。
- 再比四欄，由左到右：行內樣式、id、class（含屬性選擇器與偽類）、元素（含偽元素）。某一欄較大就贏，不會進位。
- 十個 class 加起來仍是 class 那一欄的 10，比不過 id 那一欄的 1。
- 四欄都相同時，寫在較下面的贏。

前面出現過的選擇器，各欄的算法如下，括號依序是行內、id、class、元素：

- `p`：元素一個，是 (0, 0, 0, 1)。
- `.note`：class 一個，是 (0, 0, 1, 0)。
- `#one`：id 一個，是 (0, 1, 0, 0)。
- `.tour.soldout`：兩個 class，是 (0, 0, 2, 0)。
- `a:hover`：偽類算 class、a 算元素，是 (0, 0, 1, 1)。
- `article > .direct`：符號本身不計分，是 (0, 0, 1, 1)。
- `input::placeholder`：偽元素算元素，是 (0, 0, 0, 2)。
- 標籤上的 style 屬性是 (1, 0, 0, 0)，星號是 (0, 0, 0, 0)。

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
        color: #9f1239 !important; /* important 贏過同權重的後寫規則 */
      }

      .force {
        color: #94a3b8;
      }
    </style>
  </head>
  <body>
    <h1>誰贏</h1>
    <p>只有元素選擇器：石板色。</p>
    <p class="note">加上 class：琥珀色。</p>
    <p id="one" class="note">同時有 id 與 class：深青綠。</p>
    <p class="note" style="color: #9f1239">行內樣式：玫瑰紅。</p>
    <p class="chip">同權重寫了兩次，留下較下面的深青綠。</p>
    <p class="force">灰色寫在後面，但 important 留下玫瑰紅。</p>
  </body>
</html>
```

**解析**

- 第一段只有元素選擇器，是石板色；帶 note 的變成琥珀色。
- 同時有 id 的那段是深青綠，因為 id 那一欄比 class 那一欄優先，即使它也帶著 note。
- 再下一段的玫瑰紅寫在標籤上，贏過樣式表裡的一般宣告。
- chip 兩條權重相同，F12 會看到第一個顏色被劃線，留下較下面的深青綠。
- force 的灰色寫在後面，仍被劃線，因為前一條帶了 important。

{% note danger %}
**不要用 important 解權重**
下一個人想覆蓋它，只能再寫一個 important；id 寫很多、選擇器拉很長，也是同一類問題。先把 class 取清楚，再調整順序。
{% endnote %}

{% note info %}
**括號裡的選擇器怎麼算**
`:where()` 的權重一律是零，`:is()`、`:not()` 與 `:has()` 取括號內最具體的那一個。這幾個選擇器在後面的選讀「屬性比對與 :is、:where、:has」會再看。
{% endnote %}

## 繼承與層疊

很多條規則搶同一個屬性時，由層疊（cascade）決定誰留下：先看來源與 important，再比權重，最後比誰寫在後面。繼承（inheritance）處理另一種情況：這個元素沒有任何規則寫到該屬性，要不要沿用父層已經算出來的值。

{% mermaid graph TD %}
hit["這個元素有人寫了該屬性"] --> imp["先看 important"]
imp --> spec["再比四欄權重"]
spec --> order["再看誰寫在後面"]
miss["沒有人寫這個屬性"] --> inh["可繼承的跟父層"]
miss --> init["不可繼承的用初始值"]
{% endmermaid %}

瀏覽器自己也帶一份樣式表，優先順序低於你寫的規則。連結預設有底線、標題預設比較大，都是它先套的，你的規則寫了才蓋掉。

### 什麼會繼承

繼承只發生在沒有人寫該屬性的時候：跟文字有關的屬性多半會跟父層，跟盒子有關的多半不會。元素自己寫了同一個屬性，繼承就停在這一層。

**觀念**

- 會繼承的有顏色、字型、字級、字重、行高、對齊。
- 不會繼承的有外距、內距、邊框、背景、寬度。子層看起來有底色，是因為它透明，父層的背景從下面透出來，不是子層繼承了背景。

```html 03-css/pages/07-inherit.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>繼承</title>
    <style>
      .story {
        color: #7c2d12; /* 子層沒寫 color，就跟這個 */
        background: #fff7ed; /* 背景不繼承，只是從下面透出來 */
      }

      .price {
        color: #115e59; /* 自己寫了，繼承就停在這一層 */
      }
    </style>
  </head>
  <body>
    <h1>沒寫的屬性會不會跟父層</h1>
    <article class="story">
      <h2>繼承</h2>
      <p>這段沒寫顏色，所以跟 article 的磚紅。</p>
      <p class="price">這段自己寫了顏色，不再跟父層。</p>
    </article>
    <p>article 外面這段不跟那塊磚紅。</p>
  </body>
</html>
```

**解析**

- article 裡的標題和第一段都是磚紅色。它們沒有自己的顏色規則，所以跟著父層。
- 淺底只畫在 article 上。段落沒有自己的背景，你看到的是父層的底透出來。
- 帶 price 的那段自己寫了顏色，字是深青綠；它的底仍是父層透出來的淺色。
- article 外面那段不在這個父層裡，字色是瀏覽器預設的黑。

### 四個關鍵字

任何屬性的值都可以寫成下面四個關鍵字，直接指定這一次要跟父層，或要回到哪一層的起點。

**一覽**

- `inherit`：跟父層算出來的值，連平常不繼承的屬性也跟。
- `initial`：回到這個屬性自己的初始值，不是回到你上一條規則。顏色的初始值是瀏覽器定義的字色，通常是黑。
- `unset`：會繼承的屬性當成 inherit，不會繼承的當成 initial。
- `revert`：丟掉你寫的作者樣式，回到瀏覽器預設樣式表的值。

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

      p {
        color: #be123c; /* 所有段落先被改成玫瑰紅 */
      }

      .in {
        color: inherit; /* 跟父層的藍 */
      }

      .init {
        color: initial; /* 屬性自己的初始值 */
      }

      .un {
        color: unset; /* color 會繼承，所以等於 inherit */
      }

      h2 {
        font-size: 1rem;
        font-weight: 400;
      }

      .restore {
        font-size: revert; /* 丟掉上面 h2 的規則，回到瀏覽器預設 */
        font-weight: revert;
      }
    </style>
  </head>
  <body>
    <h1>明示跟父層，或回到初始</h1>
    <div class="keywords">
      <p>沒寫關鍵字：玫瑰紅。</p>
      <p class="in">inherit：跟父層的藍。</p>
      <p class="init">initial：回到初始字色。</p>
      <p class="un">unset：color 會繼承，所以是藍。</p>
    </div>
    <h2>這顆標題被改成小而細</h2>
    <h2 class="restore">這顆用了 revert，回到瀏覽器預設的大小與粗細</h2>
  </body>
</html>
```

**解析**

- 父層 div 是藍字，但所有段落都被 p 規則改成玫瑰紅，所以沒寫關鍵字的第一段是玫瑰紅。
- inherit 那段把顏色拉回父層，變成藍字。
- initial 那段不是藍也不是玫瑰紅，而是瀏覽器的初始字色。
- unset 對 color 等於 inherit，所以是藍字。
- 兩顆 h2 都被 h2 規則改成 1rem、字重 400，看起來小而細。帶 restore 的那顆用 revert 丟掉這兩項，標題大小與粗細回到瀏覽器預設。

# 字、色與背景

規則打中元素之後，宣告裡的值要寫成瀏覽器讀得懂的長度與顏色，再進一步決定字怎麼排、底怎麼畫。

## 單位與顏色

長度與顏色是宣告裡最常出現的兩種值。這一節先定下字級、行寬和色票的寫法；寬高怎麼跟邊框一起算，留到盒子那一章。

### 長度

長度單位分成兩類：固定的 px，和相對於某個參考值的單位。內文字級以 rem 為主，因為它只看根元素，不會因為多包一層就變大。

**一覽**

- `px`：CSS 像素，不等於螢幕的實體點。適合細線這類不需要跟字放大的尺寸。
- `em`：用在 font-size 時，相對父層的字級；用在其他屬性時，相對該元素自己的字級。父層放大了，子層寫 em 乘的是放大後的值。
- `rem`：相對根元素（html）的字級，不受中間那層影響。瀏覽器預設的根字級通常是 16px，使用者可以在設定裡改。
- `%`：寬度相對包含它的父層。
- `ch`：大約是該字型裡「0」的寬度，用來限制英文行寬。中文字通常約 1em 寬，所以中文的行寬用 em 比較直覺。
- `vw`：視窗寬度的百分之一。高度對應的 vh 與 dvh 在後面的選讀再講。

```html 03-css/pages/09-units.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>單位</title>
    <style>
      .em-box {
        font-size: 1.25em;
        background: #f0fdfa;
      }

      .em-child {
        font-size: 2em; /* 1.25 × 2 × 16px，乘的是放大後的父層 */
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
        width: 50%; /* 父層寬度的一半 */
        background: #115e59;
        color: #fff;
      }

      .measure-en {
        max-width: 36ch; /* 約 36 個「0」的寬度 */
      }

      .measure-zh {
        max-width: 20em; /* 中文一字約 1em 寬，約 20 字一行 */
      }

      .vw-title {
        font-size: 4vw; /* 視窗寬度的 4% */
      }
    </style>
  </head>
  <body>
    <h1>單位</h1>
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
    <p class="measure-en">This English paragraph stops growing at about thirty-six zeros wide, so the lines stay easy to read.</p>
    <p class="measure-zh">這段中文最寬約二十個字，視窗再寬，行也不會拉得太長，讀起來才不吃力。</p>
    <p class="vw-title">這行會跟著視窗寬度變</p>
  </body>
</html>
```

**解析**

- 兩塊淺底的父層字級相同，都是根字級的 1.25 倍，約 20px。
- em 那塊的子層明顯更大：2em 乘的是 20px，約 40px。
- rem 那塊的子層是根字級的 2 倍，約 32px，不受父層影響。到 Computed 面板可以直接對這兩個數字。
- 深青綠條的寬度是淺底軌道的一半，即 8rem。
- 英文段與中文段各自停在 36ch、20em，視窗再寬也不會繼續拉長；視窗窄於這個寬度時，才跟著變窄。
- 最下面一行在你拉動視窗寬度時，字會跟著變大變小。

{% note warning %}
**不要用 vw 當內文字級**
視窗很窄時字會小到不能讀，很寬時又過大。vw 只適合少數標題，內文留在 rem。另外 100vw 包含捲軸寬度，滿版元素有可能多出橫向捲軸。
{% endnote %}

{% note info %}
**不要把根字級寫死成 px**
把 html 的字級固定成 16px，會蓋掉使用者在瀏覽器設定的預設字級。要整體放大時，把 html 的字級寫成百分比（如 112.5%），使用者的設定仍會生效。
{% endnote %}

### 顏色寫法

同一種顏色有好幾種寫法。color 是字的顏色，background-color 是底色；透明度讓下面的內容透出來，一起混合成最後看到的顏色。

**一覽**

- 名稱：`teal` 這類英文名稱，適合草稿，數量有限。
- 十六進位：`#0f766e`，兩兩一組，依序是紅、綠、藍。三碼是簡寫，每一碼各重複一次，例如 `#abc` 等於 `#aabbcc`。
- `rgb()`：用空格分隔三個數字，如 `rgb(15 118 110)`。斜線後面是透明度，可寫 `50%` 或 `0.5`。
- `hsl()`：色相、飽和度、亮度。要調深淺，改第三個數就好。
- `currentColor`：跟這個元素目前的文字顏色走。邊框的顏色沒指定時，預設也是它；邊框在盒子那一章細講。

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

      .hsl {
        color: hsl(175 77% 26%); /* 要調深淺，改第三個數 */
      }

      .mix {
        color: rgb(15 118 110 / 50%); /* 斜線後面是透明度 */
      }

      .tag {
        color: #9f1239;
        border-bottom: 3px solid currentColor; /* currentColor 就是上面這個字色 */
      }

      .backdrop {
        background: #115e59;
      }

      .frost {
        background: rgb(240 253 250 / 70%); /* 底下的深色會混進來 */
      }

      .solid {
        background: rgb(240 253 250);
      }
    </style>
  </head>
  <body>
    <h1>同一套顏色，很多種寫法</h1>
    <ul>
      <li class="named">名稱 teal</li>
      <li class="hex">六碼十六進位</li>
      <li class="rgb">rgb 空格寫法</li>
      <li class="hsl">hsl 色相、飽和度、亮度</li>
      <li class="mix">同一色，一半透明</li>
    </ul>
    <p class="tag">字是玫瑰紅，下方的線也跟著字色走</p>
    <div class="backdrop">
      <p class="frost">70% 不透明的淺底，透出一點底下的深色。</p>
      <p class="solid">完全不透明的淺底。</p>
    </div>
  </body>
</html>
```

**解析**

- 清單前四項是深青綠：六碼、rgb、hsl 是同一個顏色的三種寫法；名稱 teal 對應另一組數值，色調相近但不完全相同。
- 第五項寫了 50% 透明度，字混進白色頁面底，所以顏色變淡。
- 玫瑰紅那行下方的線沒有另外指定顏色，是 currentColor 讓它和字同色；改了字色，線會一起變。
- 深色底上的兩段，70% 的那段淺色裡混了一點深青綠，比完全不透明的那段暗一些。

{% note info %}
**對比不夠時先調亮度**
開發者工具的 Styles 面板裡，點色塊可以開調色盤，並顯示文字與底色的對比值。過低時，先把字調深或底調淺。
{% endnote %}

{% note info %}
**oklch**
新寫法 `oklch()` 以人眼感受的亮度來調色，主流瀏覽器的現行版本都支援，Tailwind 4 的預設色票就是用它定義。本課用十六進位與 hsl 就夠用。
{% endnote %}

## 文字與背景

文字屬性多半會繼承，所以設在 body 上，整頁內文就跟著走；背景預設不繼承，畫在文字後面。這一節先從字型與文字樣式講起。

### 字型堆疊

font-family 是一串字型，逗號分隔。瀏覽器逐字檢查：第一個字型有這個字就用它，沒有就換下一個。這就是為什麼英文會用前面的系統字，中文會落到後面的中文字型。

**觀念**

- 含空格的字型名稱要加引號，最後一個寫通用家族，如 `sans-serif`，讓系統至少有字可用。
- `system-ui` 是各作業系統自己的介面字，通常沒有中文字，所以後面要接中文字型：macOS 常用蘋方（PingFang TC），Windows 常用微軟正黑體；其他系統由最後的通用家族接手。
- 字重 400 是一般，700 是粗體；字型若沒有這個字重，瀏覽器會改用最接近的，或自己模擬粗體。
- 行高建議寫沒有單位的數字，乘的是各元素自己的字級，子層字變大時行距也跟著變。
- font 簡寫至少要有字級與字型，少了其中一個整條無效；沒寫到的字型屬性會被設回初始值，包括行高。

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
        line-height: 1.6; /* 沒有單位，乘上各元素自己的字級 */
      }

      .banner {
        /* 簡寫：字重 字級/行高 字型。字級與字型不能省 */
        font: 700 1.5rem/1.3 system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .strong {
        font-weight: 700;
      }

      .serif {
        font-family: Georgia, serif;
      }

      .mono {
        font-family: Menlo, Consolas, monospace;
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
    <p class="serif">Serif 這段改走襯線，中文通常會落到系統的襯線字。</p>
    <p class="mono">代碼 TPE-001 用等寬字比較好對。</p>
    <p class="tight">行高 1：行與行貼得很近，兩行以上就不好讀。這段刻意寫得長一點，才看得出行距。</p>
    <p class="loose">行高 1.8：同一段文字鬆很多。內文常用 1.5 到 1.7，這段刻意寫得長一點。</p>
  </body>
</html>
```

**解析**

- 內文是系統無襯線字，行高 1.6，粗細一般。
- 簡寫那行比內文大、粗、行距緊，這些全是簡寫那一行寫出來的值。
- 粗體只包住 span 裡那幾個字。
- 襯線那段的英文筆畫末端有小腳，中文通常會用系統的襯線字（明體）；等寬那段的英數字每個字同寬。
- 兩段淺底的段落內容相近，行高 1 時上下行幾乎貼住，1.8 則明顯鬆開。

{% note warning %}
**簡寫會清掉沒寫的項目**
原本從 body 繼承來的字重或行高，在寫了 font 簡寫的那一層會被重設。只想改字級時，單獨寫 font-size。
{% endnote %}

### 行內文字

這一組屬性作用在文字本身：對齊、底線、字距、換行與陰影。它們多半會繼承，所以設在外層區塊，裡面的文字就一起生效。

**一覽**

- 對齊：`text-align` 的 start、center、end 依序是靠行首、置中、靠行末；橫書由左到右時，行首就是左邊。它要寫在包著文字的區塊上，寫在行內元素上沒有效果。
- 底線：`text-decoration-line`、`text-decoration-color`、`text-decoration-thickness`、`text-underline-offset` 分別控制種類、顏色、粗細與離文字的距離。
- 轉換與間距：`text-transform` 只改畫面上的英文大小寫，HTML 裡的字不變；`letter-spacing` 調字距。
- 空白：`white-space: pre-wrap` 讓原始碼裡的換行與空白留下來，太長仍會折行。
- 陰影：`text-shadow` 依序是水平偏移、垂直偏移、模糊、顏色。

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
        text-shadow: 0 2px 0 rgb(0 0 0 / 35%); /* 水平 垂直 模糊 顏色 */
      }

      .center {
        text-align: center; /* 寫在包著文字的區塊上 */
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
        text-transform: uppercase; /* 只改畫面，不改 HTML 裡的字 */
        letter-spacing: 0.08em;
      }

      .schedule {
        white-space: pre-wrap; /* 留下原始碼的換行與空白 */
        font-family: Menlo, Consolas, monospace;
        background: #f8fafc;
      }
    </style>
  </head>
  <body>
    <h1 class="display">文字樣式</h1>
    <p class="center">這段置中。</p>
    <p class="end">這段靠行末。</p>
    <p>連結可以只調底線：<a class="jump" href="#top">回到頁首</a></p>
    <p class="code">tpe-kt-03</p>
    <p class="schedule">Day 1 台北
Day 2 京都
Day 3 濟州</p>
  </body>
</html>
```

**解析**

- 標題是深底淺字，字的正下方多一層往下偏 2px 的半透明黑影，因為模糊是 0，邊緣是清楚的。
- 置中那段在版面中間，下一段貼著行末。
- 連結文字仍是預設的藍，底線是深青綠，比預設粗，離文字也遠一點，不會貼著字。
- 代碼那段在畫面上是大寫、字距較鬆，但 HTML 裡仍是小寫。
- 最後一段分成三行。pre-wrap 連原始碼的縮排也會留下，所以這段的文字在原始碼裡刻意貼齊左邊。

{% note info %}
**拿掉底線時要補另一種提示**
連結若不要底線，滑鼠移上去或鍵盤聚焦時仍要有明顯變化，讓人分得出哪裡能點。
{% endnote %}

### 背景圖層

背景由底色與背景圖疊成：底色鋪在最下面，圖片或漸層畫在上面，圖沒蓋到的地方會露出底色。漸層在 CSS 裡算一種圖，所以和圖片放在同一個屬性。

**觀念**

- `background-color` 是底色。
- `background-image` 放圖片或漸層，預設會重複平鋪。
- `background-repeat: no-repeat` 只放一張。
- `background-size: cover` 把圖放大到蓋滿盒子，超出的部分被裁掉；`contain` 把整張圖縮到放得進盒子，旁邊可能露出底色。
- `linear-gradient` 的第一個值可以寫角度，例如 90deg 是由左往右。
- 逗號分開的多層背景，先寫的畫在最上面。
- 簡寫 `background` 沒寫到的項目會回到初始值；只想換底色時寫 `background-color`，才不會把圖層一起清掉。

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

      .swatch,
      .shade,
      .hero {
        padding: 1rem;
      }

      .swatch {
        background-color: #f0fdfa;
      }

      .shade {
        background-image: linear-gradient(90deg, #99f6e4, #f0fdfa);
      }

      .photo {
        height: 8rem;
        background-color: #042f2e;
        background-image: url("https://picsum.photos/id/1015/800/500");
        background-repeat: no-repeat;
        background-position: center;
      }

      .cover {
        background-size: cover;
      }

      .contain {
        background-size: contain;
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
    <p>cover：蓋滿盒子，多的被裁掉。</p>
    <div class="photo cover"></div>
    <p>contain：整張都放進盒子，旁邊露出底色。</p>
    <div class="photo contain"></div>
    <div class="hero">漸層寫在前面，所以蓋在圓點上面。</div>
  </body>
</html>
```

**解析**

- 第一塊只有淺青底色，第二塊的顏色全來自漸層，由淺青往右過渡到更淺的青。
- 兩塊照片共用同一張圖與同一個深色底。cover 那塊圖片被放大到蓋滿，上下被裁；contain 那塊看得到整張圖，視窗不是特別窄時，左右會露出深色底。
- 最後一塊有兩層背景：半透明的深色漸層寫在前面，所以蓋在圓點上面，讓白字更好讀。
- 圓點是第二層，每 16px 一格，格子之間仍看得到底色。

```css
.hero {
  /* 先寫的圖層在上面 */
  background-image:
    linear-gradient(rgb(15 23 42 / 55%), rgb(15 23 42 / 15%)),
    radial-gradient(circle, #99f6e4 1.5px, transparent 1.6px);
}
```

## 選讀：進階選擇器、分層、字型與命名

前面的選擇器與字型已經夠用，這一節補上比較少用的寫法：用屬性值的開頭或結尾挑元素、合併選擇器、依裡面的內容換樣式、把規則分層、載入自己的字型檔，以及替 class 命名的慣例。可以整節跳過。

### 屬性比對與 :is、:where、:has

前面的屬性選擇器只比對值完全相等，其實還能比對開頭、結尾或包含某段字。另外三個偽類各管一件事：`:is()` 把幾個選擇器合成一組，`:where()` 寫法相同但不增加權重，`:has()` 依元素裡面有什麼來挑選它。

**觀念**

- `[href^="https"]` 比對開頭，`[href$=".pdf"]` 比對結尾，`[href*="x"]` 比對包含。權重和 class 一樣算一欄。
- `:is()` 的權重取括號裡最具體的那一個，不會因為包進括號而變低。
- `:where()` 的權重永遠是 0，適合寫「預設值」，任何其他規則都能輕易蓋過它。
- `:has()` 依裡面的內容挑選外層元素，不需要 JavaScript。

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

      :is(.tip, .warn) p {
        color: #115e59;
      }

      h2 {
        color: #0f766e;
      }

      :where(h1, h2) {
        color: #9f1239;
      }

      .option:has(:checked) {
        background: #ccfbf1;
      }
    </style>
  </head>
  <body>
    <h1>屬性、is、where、has</h1>
    <h2>屬性比對</h2>
    <ul>
      <li><a href="https://example.com">https 開頭</a></li>
      <li><a href="guide.pdf">.pdf 結尾</a></li>
      <li><a href="#top">兩者都不是</a></li>
    </ul>
    <h2>一組選擇器</h2>
    <div class="tip"><p>在 tip 裡的段落</p></div>
    <div class="warn"><p>在 warn 裡的段落</p></div>
    <div class="plain"><p>不在名單裡的段落</p></div>
    <h2>has</h2>
    <label class="option"><input type="checkbox" /> 勾選後，整列換底色</label>
  </body>
</html>
```

**解析**

- 第一個連結以 https 開頭，是深青綠；第二個以 .pdf 結尾，是玫瑰紅；第三個兩者都不是，維持預設連結色。
- tip 和 warn 裡的段落都是深青綠，因為 `:is()` 把兩個容器合成一條規則；不在名單裡的 plain 段落維持預設顏色。
- 一級標題是玫瑰紅，因為只有 `:where()` 打到它。二級標題是深青綠：`:where()` 寫在後面，但權重是 0，輸給權重較高的元素選擇器。
- `:checked` 是核取方塊被勾起時成立的偽類。勾起之後，裡面有它的整列出現淺青底；取消勾選，`:has()` 打不中，底色消失。

### @layer 分層

`@layer`（層，cascade layer）讓你事先排好幾層樣式的順序。不同層之間不比權重，直接看層的順序，後面的層贏過前面的層，不必把選擇器愈寫愈長。

**觀念**

- 名字第一次出現的位置決定層的順序，之後再寫同名的層，仍算同一層。
- 沒有放進任何層的規則，贏過所有的層。

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

      .free {
        color: #b45309;
      }
    </style>
  </head>
  <body>
    <h1>分層</h1>
    <p class="lead">深青綠：theme 層排在 reset 層後面，所以留下 theme 的顏色。</p>
    <p class="lead free">琥珀色：沒放進任何層的規則，贏過所有層。</p>
  </body>
</html>
```

**解析**

- 兩層裡的 `.lead` 權重相同，但 theme 排在 reset 後面，所以第一段是深青綠，reset 的玫瑰紅被蓋掉。
- 第二段同時有 lead 和 free。`.free` 沒放進任何層，因此琥珀色贏過兩層裡的規則。
- 若把第一行兩個名字對調，第一段會變成玫瑰紅。

```css
@layer reset, theme; /* 愈右邊的層愈優先 */
```

### 字型檔

字型檔要先用 `@font-face` 註冊，替它取一個你自己的家族名稱，之後才能像一般字型一樣寫進 `font-family`。

**觀念**

- `src` 可以用 `local()` 指向使用者電腦裡已安裝的字型，也可以用 `url()` 指向字型檔，多個來源由左到右嘗試。
- 這個 demo 用 `local()`，不必另外附檔案：標題的英文換成有襯線的字型，和內文的無襯線字形成對比。Georgia 沒有中文字，中文仍落到後面的系統字。
- 實際放上網站的字型檔通常是 woff2 格式，寫法見下方。

```html 03-css/pages/29-font.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>字型檔</title>
    <style>
      body {
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      @font-face {
        font-family: "Heading";
        src: local("Georgia"), local("Times New Roman");
      }

      h1 {
        font-family: "Heading", system-ui, "PingFang TC", sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Hello, @font-face 字型</h1>
    <p>標題的英文字用 Heading 這個自取的名字；它沒有中文字，所以中文仍落到後面的系統字。</p>
  </body>
</html>
```

**解析**

- 標題裡的英文字是襯線體，和下方無襯線的內文不同；名稱 Heading 是自己取的，和電腦裡的字型名稱無關。
- 標題裡的中文字與下方段落，都使用 `system-ui` 或中文系統字。
- 若電腦裡沒有 Georgia 與 Times New Roman，整行都會落到堆疊裡下一個字型。

```css
@font-face {
  font-family: "Heading";
  src: url("fonts/heading.woff2") format("woff2"); /* 自備檔案 */
  font-display: swap; /* 字型載入前先用備用字顯示 */
}
```

### 命名習慣

class 名字要讓人一眼看出它屬於哪個區塊、是區塊裡的哪個零件。BEM（Block、Element、Modifier）是常見的命名慣例，只是人讀的約定，瀏覽器不會因此改變權重。

**觀念**

- 區塊是獨立的元件，例如卡片，直接用 `card`。
- 元素是區塊裡的零件，兩個底線接在區塊後面，例如 `card__title`。
- 狀態是元素的變體，兩個連字號接在後面，例如 `card__price--soldout`，使用時與原本的 class 並用。

```html 03-css/pages/29b-bem.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BEM 命名</title>
    <style>
      .card {
        width: 16rem;
        padding: 1rem;
        border: 1px solid #0f766e;
      }

      .card__title {
        margin: 0 0 0.5rem;
      }

      .card__price {
        margin: 0;
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
      <h1 class="card__title">商品 A</h1>
      <p class="card__price">NT$12,800</p>
      <p class="card__price card__price--soldout">NT$12,800</p>
    </article>
  </body>
</html>
```

**解析**

- 第一行價格是深青綠；第二行同時有 price 與 soldout 兩個 class，變成灰色加刪除線。
- 兩個 class 權重相同，soldout 寫在後面，所以它的顏色留下來。
- 名字裡的底線與連字號只是普通字元，權重仍是每個 class 算一欄。

# 盒子與欄位排版

每個元素都是一顆矩形盒子。這一章先決定盒子多大、怎麼參加排版、座標跟誰比，再決定同一層的小孩沿一個方向排，或同時切成欄與列。

## 盒子與定位

字與底色已經會變之後，接著看盒子本身：內容、內距、邊框、外距，再決定它獨佔一行還是跟文字坐在一起，最後是脫離正常排版的定位。按 <kbd>F12</kbd>，在 Computed 面板裡可以看到盒子模型的四層。

{% mermaid graph TD %}
margin["margin 外距，透明"] --> border["border 邊框"]
border --> padding["padding 內距，背景塗到這裡"]
padding --> content["content 內容"]
{% endmermaid %}

### 盒子模型

盒子模型（box model）把元素分成由外到內的四層：外距、邊框、內距、內容。你寫的寬高算到哪一層，由 `box-sizing` 決定。

**觀念**

- `content-box` 是預設，寬度只量內容，內距和邊框再往外加，所以寫了 width 100% 又加內距，會比父層更寬。
- `border-box` 的寬度包含內容、內距與邊框，不含外距。實務上常在樣式開頭把全部元素（含偽元素）改成它，這一節與定位的 demo 都這樣做。
- `padding` 與 `margin` 簡寫依順時針：一個值四邊相同，兩個值是上下、左右，四個值是上、右、下、左。內距不能是負值。
- 左右外距設成 `auto` 會平分剩餘的寬度，所以區塊要有寬度、而且比父層窄，才會水平置中。
- 上下相鄰的區塊，垂直外距會合併成較大的那一個，不會相加；左右外距不會合併。
- `outline` 畫在邊框外側，不佔寬高，所以適合當鍵盤焦點框；搭配 `:focus-visible`，只有用鍵盤移動時才出現。

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
        margin: 0 auto;
        padding: 1rem;
        border: 6px solid #0f766e;
        border-radius: 0.75rem;
        background: #f0fdfa;
      }

      .content {
        margin: 0;
        background: #fecdd3;
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
        <p class="content">粉紅是內容，外面一圈是內距，粗框是邊框。</p>
      </article>
    </div>
    <h2>兩種算法</h2>
    <div class="track"><div class="kid">border-box：對齊虛線。</div></div>
    <div class="track content-box"><div class="kid">content-box：虛線包不住。</div></div>
    <h2>垂直外距合併</h2>
    <div class="collapse">
      <p>這段下外距是 2rem。</p>
      <p>這段上外距只有 0.5rem，兩段之間取較大的 2rem。</p>
    </div>
    <h2>outline</h2>
    <p><a class="go" href="#top">用 Tab 移到這裡</a></p>
  </body>
</html>
```

**解析**

- 卡片寬度寫成 min(100%, 22rem)，意思是取兩者較小的值。卡片比版面窄，左右外距是 auto，所以置中；視窗寬於約 400px 時，卡片兩側才看得到父層的淺青底，因為外距是透明的。
- 粉紅是內容，外面一圈極淺的青色是內距，再外面是粗框。
- 第一條軌道裡，小孩的寬度含內距與邊框，剛好對齊虛線。第二條改成 content-box，100% 只量內容，內距與邊框再往外長，超出虛線。
- 兩段之間的空隙是 2rem，不是 2.5rem。
- 用 <kbd>Tab</kbd> 移到連結，出現玫瑰色焦點框，連結本身的大小不變。

```css
.card {
  width: min(100%, 22rem); /* 窄於 22rem 時跟父層一樣寬 */
  margin: 0 auto; /* 左右 auto 才水平置中 */
}
```

### display

`display` 決定盒子怎麼參加排版，不改變標籤的語意。這一節先看最基本的幾種，再看讓元素消失的幾種寫法，最後是圖片底下的縫。

**一覽**

- `block` 獨佔一行，寬高與垂直外距都有效。div、段落、標題預設就是 block。
- `inline` 跟文字坐在同一行，不採用寬高；左右內距會推開旁邊的字，上下內距會畫出來，但不把行撐高。span、連結預設就是 inline。
- `inline-block` 跟文字同一行，但可以有自己的寬高。
- `none` 不產生盒子，後面的元素補上它的位置。

#### 區塊與行內

這三種排法差在是否獨佔一行，以及寬高算不算數。

**觀念**

- 區塊的寬度預設撐滿父層；行內元素的大小由內容決定。
- inline-block 的標籤之間若有換行，會變成一個空白字元，所以幾個並排的方塊之間會有一小段縫。

```html 03-css/pages/17-display.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>display</title>
    <style>
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
    </style>
  </head>
  <body>
    <h1>盒子怎麼參加排版</h1>
    <h2>block</h2>
    <div class="block">第一張獨佔一行。</div>
    <div class="block">第二張從下一行開始。</div>
    <h2>inline</h2>
    <p>這句話裡有<span class="item">甲</span>與<span class="item">乙</span>兩個行內元素。</p>
    <h2>inline-block</h2>
    <p>
      <span class="day">一</span>
      <span class="day">二</span>
      <span class="day">三</span>
    </p>
  </body>
</html>
```

**解析**

- 兩個 block 各佔一行，中間隔著下外距。
- 甲和乙跟句子坐在同一行，上下邊框會畫出來，但不把這一行撐得更高。
- 一、二、三有固定寬度，所以是 inline-block，並排在同一行；它們中間的縫來自原始碼裡的換行。

#### 三種隱藏

要讓元素看不見有三種做法，差別在是否還佔位、是否點得到。

**觀念**

- `display: none` 不佔位，也不能被點到。
- `visibility: hidden` 佔位但看不見，也點不到。
- `opacity: 0` 佔位、看不見，但滑鼠仍點得到。

```html 03-css/pages/17b-display-hide.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>三種隱藏</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .cell {
        display: inline-block;
        width: 2.5rem;
        margin-right: 0.35rem;
        padding: 0.35rem 0;
        background: #115e59;
        color: #f0fdfa;
        text-align: center;
        text-decoration: none;
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
    </style>
  </head>
  <body>
    <h1>三種隱藏</h1>
    <p>display: none，中間的 2 不佔位</p>
    <p><span class="cell">1</span><a class="cell gone" href="#clicked">2</a><span class="cell">3</span></p>
    <p>visibility: hidden，2 看不見但佔位</p>
    <p><span class="cell">1</span><a class="cell hold" href="#clicked">2</a><span class="cell">3</span></p>
    <p>opacity: 0，2 看不見、佔位，仍點得到（網址會多出 #clicked）</p>
    <p><span class="cell">1</span><a class="cell ghost" href="#clicked">2</a><span class="cell">3</span></p>
  </body>
</html>
```

**解析**

- 第一列的 2 不見了，1 緊接著 3。
- 第二列中間仍空一格。
- 第三列也空一格，但那個方塊仍存在：滑鼠移上去會變成手指，點下去網址會多出 #clicked。第二列的方塊點不到，網址不變。
- 三列的 2 都是連結，只為了用「點不點得到」區分這三種寫法。

#### 圖片底縫

圖片預設是 inline，會跟文字基線對齊，基線下方要留給字母下緣的空間，所以圖片底下會多出一條縫。

**觀念**

- 把圖片改成 `display: block`，縫就消失。另一個做法是把 `vertical-align` 設成 bottom，讓圖片貼住行的底部。

```html 03-css/pages/17c-display-image-gap.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>圖片底縫</title>
    <style>
      body {
        margin: 1.5rem;
        color: #134e4a;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .frame {
        width: 4.5rem;
        background: #0f766e;
      }

      .photo {
        width: 4.5rem;
        height: 3rem;
      }

      .block {
        display: block;
      }
    </style>
  </head>
  <body>
    <h1>圖片底縫</h1>
    <p>預設的行內圖片，底下露出一條深青綠的縫</p>
    <div class="frame"><img class="photo" alt="河谷風景" src="https://picsum.photos/id/1015/120/80" /></div>
    <p>改成 block，縫消失</p>
    <div class="frame"><img class="photo block" alt="河谷風景" src="https://picsum.photos/id/1015/120/80" /></div>
  </body>
</html>
```

**解析**

- 第一張圖外面的深青綠框，比圖多出一條底部的縫。
- 第二張圖改成 block 之後，框剛好貼住圖片，沒有縫。

### 定位與 z-index

`position` 決定 `top`、`right`、`bottom`、`left` 的偏移量要跟誰比。預設的 static 參加正常排版，寫了偏移也不生效。重疊時誰在上面由 `z-index` 決定，它主要用在定位過的元素（之後學的 flex、grid 子項目也有效），而且數字只在同一個層疊情境（stacking context，一組互相比較層級的元素）裡比較。

**一覽**

- `relative`：以自己原本的位置為原點偏移，原位仍留著，兄弟元素不會補上來。常用來當絕對定位的對準對象。
- `absolute`：對準最近一個不是 static 的祖先，都沒有時對準頁面最外層（初始的視窗範圍）；原位釋出，兄弟元素會補上來。
- `fixed`：對準視窗，捲動頁面時留在同一個螢幕位置。
- `sticky`：平常和一般元素一樣；捲到你寫的 top 位置時黏在捲動盒的邊緣，範圍只到父層結束。

**觀念**

- 徽章的標準寫法是：卡片設成 relative，徽章設成 absolute。
- 祖先若設了會把溢出裁掉或變成捲軸的 overflow，sticky 會改對準那個祖先，所以常常不如預期。
- `z-index` 愈大愈靠近使用者。父層若自己形成新的層疊情境，小孩的數字出不去，比的是父層與其他元素。

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
        min-height: 150vh;
        margin: 1.5rem;
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
      <h2>卡片標題</h2>
      <p>徽章對準這張卡片，不是整頁。</p>
    </article>
    <div class="pile">
      <span class="layer high">上層</span>
      <span class="layer low">下層</span>
    </div>
    <div class="scroller">
      <p class="sticky">這行會黏在這個盒子的上緣</p>
      <p>第 1 段：往下捲這塊白盒。</p>
      <p>第 2 段：標題一直黏在上緣。</p>
      <p>第 3 段：因為白盒就是它的父層。</p>
      <p>第 4 段：捲到底，標題仍在上緣。</p>
      <p>第 5 段：最後一段。</p>
    </div>
    <p class="pin">固定在視窗右下</p>
  </body>
</html>
```

**解析**

- 「熱門」徽章脫離文字流，貼在卡片右上角。卡片若拿掉 relative，徽章會改對準最外層的頁面。
- 徽章是 absolute，原位釋出，所以卡片裡的標題與段落不會留下徽章的空位。
- 下面兩個重疊的色塊都是 absolute。原始碼裡玫瑰紅寫在前面，照理會被後面的深青綠蓋住；它的 z-index 較大（2），所以玫瑰紅蓋住深青綠的一角。兩個數字對調，深青綠就蓋到上面。
- 白盒自己可以捲動。往下捲時，深青綠標題黏在白盒的上緣；它的父層就是白盒，所以一直黏到捲完。
- 右下角的色塊對準視窗。body 的 min-height 是 150vh（視窗高度的 1.5 倍），整頁才有東西可以捲，捲動時它仍留在右下角。
- 這裡的 overflow 只是為了做出可捲的盒子，下一節再談它。

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

### overflow

內容比盒子高或寬時，overflow 決定多出來的部分是露出、裁掉，還是改用捲軸。單行省略號則是三個屬性一起生效的組合。

**觀念**

- `visible` 是預設值，多出來的內容會畫在盒子外面。
- `hidden` 把多出來的部分裁掉，不出現捲軸。
- `auto` 只在裝不下時才出現捲軸。
- 單行省略號需要不准換行、裁掉溢出、尾端改成省略號三件事同時成立，缺一個就不會出現省略號。
- 只要祖先設了 `hidden`，裡面的 sticky 常常黏不住，因為它把那一層變成捲動範圍。

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
        height: 4rem;
        margin-bottom: 1rem;
        background: #f0fdfa;
      }

      .box p {
        margin: 0;
      }

      .clip {
        overflow: hidden; /* 超出的裁掉，沒有捲軸 */
      }

      .scroll {
        overflow: auto; /* 裝不下才出現捲軸 */
      }

      .one-line {
        width: min(100%, 18rem);
        white-space: nowrap; /* 不准換行 */
        overflow: hidden; /* 超出的裁掉 */
        text-overflow: ellipsis; /* 尾端改成省略號 */
      }
    </style>
  </head>
  <body>
    <h1>超出盒子時</h1>
    <div class="box clip">
      <p>這段文字比盒子高。overflow 設成 hidden 時，超出盒子的部分會被裁掉，也不會出現捲軸，所以讀不到後面的句子。</p>
    </div>
    <div class="box scroll">
      <p>這段文字同樣比盒子高。overflow 設成 auto 時，只在裝不下才出現捲軸，可以捲動把後面的句子讀完。</p>
    </div>
    <p class="one-line">這一行很長，不准換行時超出的部分會被裁掉，尾端改成省略號。</p>
  </body>
</html>
```

**解析**

- 前兩塊淺底一樣高，內容都比盒子高。
- 第一塊下面的句子被切掉，沒有捲軸，讀不到後半段。
- 第二塊右側出現捲軸，可以捲動把整段讀完；macOS 預設的捲軸平時隱藏，捲動時才會浮現。
- 最後一段維持一行，盒子不夠寬時尾端是省略號，而不是換到下一行。
- 把不准換行拿掉，省略號就不會出現，因為文字已經折行，沒有橫向溢出。

## 欄位排版

同一層的子元素要排成一列或一欄時用 Flex，要同時控制欄與列時用 Grid。兩者都是寫在父層的 display，項目之間的縫用 gap 設定，不必再靠外距硬湊。

### Flexbox

Flex 是一維排版：項目沿著一條軸排開，這條軸叫主軸，與它垂直的軸叫交叉軸。預設主軸是橫向，項目由左到右排成一列；改成直排時，兩條軸會對調。

**一覽**

- `display: flex`：把父層變成 Flex 容器，子元素成為項目。
- `flex-direction`：決定主軸方向，預設橫排，也可改成直排。
- `flex-wrap`：決定放不下時是否換行，預設不換行。
- `justify-content`：在主軸上分配剩餘空間，例如靠左、置中、分到兩端。
- `align-items`：在交叉軸上對齊項目，例如置中或靠上。
- `gap`：項目之間的縫，只出現在項目之間，最外側不留空。
- `flex`：寫在項目上的縮寫，三個值依序是放大比例、縮小比例、基本尺寸。

**觀念**

- `flex: 1 1 14rem` 的意思是：理想寬度 14rem，有剩餘空間就平均長大，不夠就一起縮小。
- 交叉軸預設會把同一行的項目拉成一樣高，所以並排的卡片自然等高。
- 項目的最小寬度預設由內容決定，內容很長時不肯縮小；需要硬縮時，把最小寬度設成 0。

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
        justify-content: space-between; /* 主軸：品牌與連結分到兩端 */
        align-items: center; /* 交叉軸：垂直置中 */
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
        flex-wrap: wrap; /* 放不下才換行 */
        gap: 1rem;
        margin-top: 1rem;
      }

      .trip {
        display: flex;
        flex-direction: column; /* 卡片內改成直排 */
        flex: 1 1 14rem; /* 可長、可縮、理想寬度 14rem */
        padding: 1rem;
        background: #f0fdfa;
      }

      .trip a {
        margin-top: auto; /* 吃掉上方剩餘空間，連結被推到底部 */
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

- 頂部那條把品牌名與連結分到兩端，垂直方向置中，連結的顏色跟隨父層，所以是淺色。
- 兩張卡片橫排，中間是 1rem 的縫。
- 視窗窄於約 32rem（兩張 14rem、一個縫，再加左右邊距）時，第二張會換到下一行，並各自拉長到佔滿該行。
- 每張卡片自己也是 Flex，方向是直排，連結的上外距設為 auto，吃掉剩餘空間，把連結推到卡片底部，兩張的連結因此對齊。

### Grid

Grid 同時切欄與列。父層決定有幾欄，子元素預設各佔一格；要佔多格時，再在子元素上指定。

**一覽**

- `display: grid`：把父層變成 Grid 容器。
- `grid-template-columns`：定義每一欄的寬度，單位 fr 代表剩餘空間的一份。
- `repeat` 與 `minmax`：前者重複一個欄寬設定，後者給欄寬一個最小值與最大值。
- `gap`：同時是欄距與列距，也可以分開寫。
- `grid-column`：指定這個項目從哪條欄線到哪條欄線。
- `justify-items` 與 `align-items`：控制內容在格子裡的對齊。

**觀念**

- `repeat(auto-fit, minmax(12rem, 1fr))` 讀作：每欄至少 12rem，放得下幾欄就切幾欄，剩餘空間再平均分給這些欄，沒有項目的欄會被收掉。
- 欄線是欄與欄之間的線，由左往右從 1 開始編號，-1 代表最後一條。從 1 到 -1 就是整列。
- 只有一個方向的排列用 Flex 就夠；要同時對齊欄與列時用 Grid。

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
        /* 每欄至少 12rem，放得下幾欄就切幾欄，剩餘空間平均分 */
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: 1rem;
      }

      .trips article {
        padding: 1rem;
        background: #f0fdfa;
      }

      .feature {
        grid-column: 1 / -1; /* 從第一條欄線到最後一條，整列都佔 */
        background: #ccfbf1;
      }
    </style>
  </head>
  <body>
    <h1>欄與列一起排</h1>
    <div class="trips">
      <article class="feature">
        <h2>京都三日</h2>
        <p>這一張佔滿整列。</p>
      </article>
      <article>
        <h2>大阪</h2>
        <p>一格。</p>
      </article>
      <article>
        <h2>濟州</h2>
        <p>一格。</p>
      </article>
      <article>
        <h2>花蓮</h2>
        <p>一格。</p>
      </article>
      <article>
        <h2>台北</h2>
        <p>一格。</p>
      </article>
    </div>
  </body>
</html>
```

**解析**

- 視窗窄到只放得下一欄時，所有卡片上下排。
- 拉寬之後，每多出約 13rem（一欄加一個縫）就多一欄，剩下的卡片排成多欄，寬度平均分。
- 第一張從第一條欄線佔到最後一條，所以不論目前有幾欄，它都獨佔一整列。
- 縫由 gap 提供，不是卡片自己的外距，所以最外側不會多出一圈。
- 要跨欄時用整列的寫法最保險；若欄數只剩一欄卻要求跨兩欄，瀏覽器會另外生出一欄，版面可能被撐出橫向捲軸。

# 響應式、變數與動態

這一章先讓同一份頁面在窄畫面也排得下，變寬時再調整欄數，並把重複的顏色收成變數。接著用變形、轉場與動畫加上動態，最後學會用開發者工具檢查樣式與動畫。

## RWD 與媒體查詢

響應式網頁設計（Responsive Web Design）是讓同一份文件適應不同螢幕寬度。作法是先讓版面自己會縮、會換行，結構真的要變時才寫媒體查詢（依螢幕條件才生效的規則）。

{% note info %}
每個 demo 的 head 都有一行 `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`。手機瀏覽器沒有這行時，會先假裝螢幕約 980px 寬再整體縮小，頁面看起來像縮小的桌機版，媒體查詢也會照 980px 判斷。
{% endnote %}

### 流動版面

流動版面指圖片不超出父層、版心（頁面中央的內容欄）有寬度上限、卡片欄數由寬度決定。這些寫法在任何寬度都成立，所以還不需要媒體查詢。

**觀念**

- 圖片設最大寬度 100% 並改成 block，才不會溢出，也不會留下行內圖片的底縫。
- 圖片的 HTML 寫上原始寬高，瀏覽器載入前就能預留位置，版面不會在圖片出現時跳動；CSS 的高度設為 auto，縮小時就保持比例。
- 版心用最大寬度加上左右 auto 置中，寬螢幕時文字不會拉成一整行。
- 卡片欄用上一節的 auto-fit，窄的時候自然是一欄。

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
        display: block; /* 去掉行內圖片底下的縫 */
        max-width: 100%; /* 不比父層寬 */
        height: auto; /* 高度跟著比例走 */
        margin-bottom: 1rem;
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
      <h1>流動版面</h1>
      <img src="https://picsum.photos/id/1016/1200/500" alt="風景照片" width="1200" height="500" />
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
- 版心在寬螢幕停在 60rem，左右留白由 auto 平分。
- 兩張卡片在窄視窗上下排；視窗約寬過 32rem 後並排，中間是 gap。
- 這份樣式沒有 @media，拉視窗版面就會變，因為欄數是瀏覽器算出來的。

### 斷點

流動版面解決了「會縮」的部分。導覽從直排改成橫排、側欄夠寬才排到旁邊，這類結構變化才需要媒體查詢。查詢條件的分界點稱為斷點。

**觀念**

- 先寫窄畫面的排法，放在查詢外面；再用 `@media (min-width: …)` 在夠寬時覆蓋。這種由窄到寬的寫法稱為行動優先（mobile-first）。
- 查詢裡的 rem 以瀏覽器預設字級計算，通常是 16px，所以 40rem 約 640px。
- 斷點挑在版面快撐不住的地方，不必先記手機、平板、桌機的固定數字。
- 加第二個更寬的斷點時，寫在前一個的後面；同樣的權重下，後寫的蓋過先寫的。

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

      main,
      aside {
        padding: 0.5rem 1rem;
        background: #f0fdfa;
      }

      /* 窄畫面的規則寫在查詢外面，連結一項一行 */
      nav a {
        display: block;
      }

      /* 夠寬時才覆蓋成並排 */
      @media (min-width: 40rem) {
        .layout {
          display: grid;
          grid-template-columns: 1fr 14rem; /* 主文彈性，側欄約 14rem */
          gap: 1rem;
        }

        header {
          grid-column: 1 / -1; /* 標題列跨滿兩欄 */
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        nav a {
          display: inline-block; /* 蓋過外面的 block */
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
- 拉過 40rem 之後，標題與導覽變成兩端對齊的一列，主文與側欄並排，側欄約 14rem。
- 標題列跨滿兩欄，所以不會被擠進側欄那一格。

{% note info %}
媒體查詢也可以寫成範圍語法，例如 `@media (width >= 40rem)`，意思等同 `min-width: 40rem`，MDN 的媒體查詢頁有說明。本課沿用 min-width，與多數既有程式碼一致。
{% endnote %}

### 選讀：列印與偏好

媒體查詢也能針對列印，以及使用者在系統設定的偏好。畫面斷點仍是主線，這兩種之後再加就好。

**觀念**

- `print` 在列印或列印預覽時成立，導覽、純裝飾的區塊可以在這時拿掉。
- `prefers-color-scheme` 對應作業系統的淺色或深色設定。先寫好預設的淺色樣式，再用查詢覆蓋成深色，沒設定的人也能正常閱讀。
- `prefers-reduced-motion` 對應系統的「減少動態效果」，使用者開啟時，動畫與位移應縮小或關掉；寫法在本章稍後的「轉場與動畫」示範。

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

      /* 系統設成深色時才成立 */
      @media (prefers-color-scheme: dark) {
        body {
          background: #042f2e;
          color: #f0fdfa;
        }

        a {
          color: #5eead4; /* 預設藍色連結在深底上看不清楚 */
        }
      }

      /* 列印或列印預覽時才成立 */
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
- 系統是深色時，底變成深青、字與連結變成淺色。
- 系統是淺色時，這條查詢不成立，維持深字。

## CSS 變數

重複出現的顏色與間距可以收成自訂屬性（又稱 CSS 變數）：名稱自己取，前面加兩條減號，用的時候寫 var。變數會被子層繼承，子層也可以重新宣告同名變數覆寫。

**觀念**

- 變數多半寫在 `:root`（網頁最外層），整頁都讀得到。
- `var(--brand, #475569)` 的第二個值是備援：只有 `--brand` 沒宣告時才使用。
- 沒有備援又讀不到變數時，這條宣告會作廢並當作 `unset`：顏色這類會繼承的屬性沿用父層的值，不繼承的屬性回到初始值，不會退回先前寫過的規則。
- 名稱要看得出用途，例如 `--brand` 或 `--gap`，不要用 `--a` 這種看不出是顏色還是間距的名字。

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
        --brand: #9f1239; /* 子層覆寫，只影響這張卡片裡面 */
      }

      .missing {
        color: var(--missing, #475569); /* 逗號後面是找不到時才用 */
      }
    </style>
  </head>
  <body>
    <h1>變數</h1>
    <article class="card">
      <h2>京都三日</h2>
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

- 兩張卡片的價格都讀同一個變數。
- 第一張是深青綠，因為讀到 `:root` 上的值。
- 第二張在自己這層把同名變數改成玫瑰紅，只有它裡面的價格變色，第一張不受影響。
- 最後一段讀的名稱沒有宣告，第二個值生效，字是灰藍色。

## 轉場與動畫

變形、轉場與動畫都是讓畫面動起來的工具，分工不同：變形只改畫出來的樣子，轉場負責兩個狀態之間怎麼過渡，動畫則用關鍵影格自己播放。這一節依序看這三個。

### 變形不推動鄰居

變形（transform）可以平移、縮放、旋轉元素，但只改變它畫出來的樣子，不重新計算左右鄰居的位置。所以它適合做滑過時的抬起，不會把整列擠歪。

**一覽**

- `translate`：平移，沿著水平或垂直方向移動。
- `scale`：縮放，大於 1 放大，小於 1 縮小。
- `rotate`：旋轉，單位常用 `deg`（度）。

**觀念**

- 變形的原點預設在盒子中心，所以放大與旋轉都繞著中心。
- 盒子原本佔的位子仍留著，旁邊的元素不會補進來。
- 同一個 transform 寫了多個函式時，由右往左套用。

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
        gap: 2rem;
      }

      .box {
        width: 3.5rem;
        padding: 0.75rem 0;
        background: #ccfbf1;
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
      <div class="box">原位</div>
      <div class="box move">往右</div>
      <div class="box big">放大</div>
      <div class="box turn">旋轉</div>
    </div>
  </body>
</html>
```

**解析**

- 四格的位子都沒變，間距沒有被變形撐開或壓縮。
- 往右那格畫到自己位子的右邊，離放大那格比較近，但放大那格沒有被推走。
- 放大那格從中心向四周變大，旋轉那格也繞著中心轉。
- 若改用外距去推，後面的格子會真的跟著移位。

### 轉場連接兩個狀態

轉場（transition）寫在元素平常的樣式上，告訴瀏覽器：某個屬性從舊值變成新值時，要花多久、用什麼速度。滑鼠移開後，它也會用同樣的方式走回原來的值。

**觀念**

- 至少要寫要過渡的屬性與時間，時間用秒或毫秒。
- 速度預設是 `ease`（兩頭慢、中間快），`linear` 則是等速。
- 適合過渡顏色、透明度與變形；改寬高會讓周圍重新排版，不適合做大幅度的過渡。
- 時間多半落在 0.2 到 0.4 秒，太長會讓人覺得拖。

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
        background: #ccfbf1;
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

- 卡片平常停在原位。
- 滑鼠放上去時，它在 0.3 秒內往上移，而不是瞬間跳過去。
- 移開後，因為平常的樣式上也寫了轉場，同一個設定讓它慢慢走回原位。
- 如果只把轉場寫在 hover 的規則裡，滑鼠移開時沒有轉場，卡片會瞬間跳回去。

{% note info %}
手機沒有滑鼠移上去的動作，因此重要的資訊不要只靠 hover 才出現。
{% endnote %}

### 動畫自己播放

動畫（animation）先用 `@keyframes` 列出幾個時間點的樣子，再用 `animation` 把這段影格接到元素上。它不必等人點或移上去，頁面載入就能開始播。

**觀念**

- `from` 是起點，`to` 是終點；也可以改寫成百分比，放中間的影格。
- `animation` 常見的寫法依序是：影格名稱、一輪多久、速度、延遲、次數、方向。
- `infinite` 表示一直重複，`alternate` 表示奇數輪正向、偶數輪反向，所以要播兩輪才是一個來回。
- 播完之後，元素預設回到動畫以外原本的樣式；想停在最後一格，要另外寫 `animation-fill-mode: forwards`。

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

- 徽章載入後就在 1 倍與 1.08 倍之間放大縮小，不用把滑鼠放上去。
- `alternate` 讓它放大後再縮回來，不會在終點突然跳回起點。
- 放大不影響版面，旁邊的元素不會被推開。

{% note info %}
有些人因為暈眩或注意力的關係，會在系統的無障礙設定開啟「減少動態效果」。瀏覽器把這項偏好以 `prefers-reduced-motion` 這個媒體查詢告訴網頁，使用者開啟時它的值是 `reduce`。無限重複或大幅度的動畫，建議寫在 `@media (prefers-reduced-motion: reduce)` 裡把它關掉或縮小，例如把 `animation` 設為 `none`。
{% endnote %}

## 用開發者工具除錯

規則沒有出現在畫面上時，不要只靠猜。先在開發者工具看有沒有打中這個元素、是誰把它蓋掉，再看最後算出的結果。這一節用 Chrome 開發者工具（DevTools）的 Elements 面板與 Animations 面板，示範三個最常用的檢查。

### Styles 與 Computed

Elements 面板右側的 Styles 列出打中這個元素的所有規則，被蓋掉的宣告會加上刪除線。Computed 則是層疊與繼承都算完之後的最終值，包含你沒寫、由瀏覽器補上的項目。

**觀念**

- Styles 由上而下是優先順序，同權重時後寫的在上面；排在下面又被劃線的，就是輸了的宣告。
- 屬性名稱打錯或值不合法時，宣告同樣會被劃線，旁邊還有警告圖示。
- 完全看不到自己寫的選擇器，多半是名字打錯或檔案沒存檔，還不到比權重的階段。
- Computed 裡每個屬性旁的小箭頭，可以跳回定義它的規則。
- 在面板裡雙擊改的值只是暫時預覽，重新整理就消失；要保留，必須回到編輯器改檔案。

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
    <p class="note">這段文字最後是深青綠，先寫的琥珀色被蓋掉。</p>
  </body>
</html>
```

**解析**

- 在頁面的文字上按右鍵選「檢查」，Elements 會停在這個 `p`。
- Styles 裡後寫的深青綠排在上面，先寫的琥珀色排在下面並被劃線，兩條權重相同，所以後面的贏。
- Computed 的 `color` 顯示 `rgb(15, 118, 110)`，也就是 `#0f766e`。
- 在 Styles 裡把深青綠改成別的顏色，畫面立刻變色；重新整理後又回到檔案裡的深青綠。

### 盒模型、狀態與裝置模擬

開發者工具還能直接看盒子的尺寸、強制打開 hover 這類狀態，以及改變視窗寬度檢查媒體查詢。這一節用同一個頁面看這三項。

**一覽**

- 盒模型圖：在 Styles 面板的側邊欄或 Computed 面板頂端，畫出內容、內距、邊框、外距的尺寸，單位是像素。
- `:hov`：Styles 面板上的按鈕，勾選後可以強制套用 hover、focus 等狀態，不必真的把滑鼠放上去。
- 裝置工具列：用 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>（Windows 為 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>）開啟，可以拖動或輸入視窗寬度。

**觀念**

- 把滑鼠移到盒模型圖的某一層，頁面上會標出對應的範圍；雙擊數字可以暫時修改。
- 媒體查詢看的是視窗寬度。`40rem` 約是 640px，視窗寬度達到它，規則才會生效。

```html 03-css/pages/34-css-devtools-box.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>盒模型與狀態</title>
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
    <a class="go" href="#top">回到頁首</a>
    <p class="wide">視窗寬度達 40rem（640px）以上，這段才變成深青綠。</p>
  </body>
</html>
```

**解析**

- 檢查那顆連結，盒模型圖顯示上下內距 8、左右內距 16，正好是 `0.5rem` 與 `1rem`。
- 在 `:hov` 勾選 hover，連結的背景換成另一階青綠，即使滑鼠沒有放在上面。
- 一般桌面視窗比 640px 寬，所以下方那段文字平常就是深青綠；若開發者工具靠右佔掉很多寬度，頁面的視窗可能不到 640px，文字就會是預設色。
- 用裝置工具列把寬度縮到 640px 以下，那段文字變回預設色；拉寬之後，深青綠又回來。

### 動畫面板

Animations 面板能把正在播放的動畫與轉場暫停、放慢，甚至拖到某一個時間點。它是用來觀察過程，不會改動你的檔案。

**觀念**

- 開啟方式：DevTools 右上角的選單選 More tools，再選 Animations；或按 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>（Windows 為 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>）輸入 Show Animations。
- 面板開著的時候，才會抓到新觸發的動畫；動畫在頁面載入時就開始播的話，要在面板開著的情況下重新整理。
- 面板裡調整的速度只影響這次預覽，檔案裡寫的秒數不會變。

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

- 先打開 Animations 面板，再重新整理頁面，清單裡會出現徽章的 pulse。
- 選取那一組後按暫停，徽章會停在當下的大小；拖動時間軸，可以看到它放大再縮回。
- 面板上的播放速度可以降成 25% 或 10%，方便看清楚細節。
- 要真的改變時間，必須回到檔案修改 `1s`，面板無法替你存檔。

# 選讀：邊界與進階動效

這一章可以整章跳過。它收集幾個不常用、但遇到時很難理解的行為：外距合併、邏輯方向、層疊情境與多行省略。

## 外距合併與邏輯方向

這一節說明兩件事：垂直外距有時會和父層合併，造成看起來「穿出去」的現象；以及用來取代左右上下的邏輯方向屬性。主線的版面仍以上、右、下、左的寫法為主，這裡只要認得它們即可。

### 外距合併

外距合併（margin collapsing）是指相鄰的垂直外距會合併成其中較大的一個，而不是相加。父層與第一個子層之間也會這樣：父層若沒有上邊框、上內距，也沒有被撐出獨立的排版區域，子層的上外距就會變成父層的上外距，空隙出現在父層背景的外面。

**觀念**

- 擋住外距合併的做法有三種：給父層一點上內距、一條上邊框，或設成 `display: flow-root`。
- `flow-root` 會讓父層成為獨立的排版區域（block formatting context），內部的外距不再和外面合併，而且沒有其他副作用。
- 只有垂直方向的外距會合併；左右外距不會，Flex 與 Grid 容器裡的項目之間也不合併。

```html 03-css/pages/40-css-margin-out.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>外距合併</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      h1 {
        margin: 0 0 1rem;
      }

      .open,
      .held {
        padding: 0 1rem 1rem;
        background: #99f6e4;
        margin-bottom: 1.5rem;
      }

      .open p,
      .held p {
        margin: 2rem 0 0;
        padding: 0.5rem;
        background: #fff;
      }

      .held {
        display: flow-root;
      }
    </style>
  </head>
  <body>
    <h1>子層的上外距</h1>
    <div class="open">
      <p>外距合併：子層的上外距跑到青底的上面。</p>
    </div>
    <div class="held">
      <p>flow-root：子層的上外距留在青底裡面。</p>
    </div>
  </body>
</html>
```

**解析**

- 兩塊的白底段落都有 2rem 的上外距，青底則都有左右與下方的內距，所以能看出青底的範圍。
- 第一塊的青底上緣貼著白底段落，2rem 的空隙跑到青底上方，因為段落的上外距已經成為父層的外距。
- 第二塊加了 `flow-root`，同樣的 2rem 留在青底裡面，把白底段落往下推，青底包得住它。

### 邏輯方向

邏輯方向（logical properties）以文字的走向定義方位，而不是固定的左右上下：inline 方向是文字前進的方向，block 方向是一行接一行堆疊的方向。橫書時，inline 的起點在左、block 的起點在上；遇到由右至左的語言，起點會自動換邊，不必另外寫一份樣式。

**一覽**

- `margin-inline`、`padding-inline`：文字方向的兩側，橫書時就是左右。
- `margin-block`、`padding-block`：堆疊方向的兩側，橫書時就是上下；加上 `-start` 或 `-end` 只指單側，例如 `margin-block-end` 是橫書時的下外距。
- `border-inline-start`：行首那一側的邊框，橫書時是左邊，由右至左時換到右邊。
- `inline-size`、`block-size`：邏輯上的寬與高，橫書時對應 `width`、`height`。

**觀念**

- `margin-inline: auto` 配合 `max-width`，可以讓區塊在行內方向居中。
- HTML 的 `dir="rtl"` 屬性把文字方向改成由右至左；邏輯屬性會跟著換邊。

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
        margin-block-end: 1.5rem;
        padding-inline-start: 1rem;
        border-inline-start: 6px solid #0f766e;
        max-width: 24rem;
      }
    </style>
  </head>
  <body>
    <article class="card">
      <h1>行首有一條邊</h1>
      <p>預設由左至右，這條邊在左邊。</p>
    </article>
    <article class="card" dir="rtl">
      <h1>行首有一條邊</h1>
      <p>加上 dir="rtl"，同樣的樣式，邊會換到右邊。</p>
    </article>
  </body>
</html>
```

**解析**

- 兩張卡片的 CSS 完全相同。視窗寬於 27rem 左右時，卡片寬度受 `max-width` 限制、比版面窄，行內兩側外距是 `auto`，所以兩張都居中。
- 第一張的行首在左邊，內距與邊線出現在左邊。
- 第二張加了 `dir="rtl"`，行首換到右邊，內距與邊線也跟著出現在右邊，文字靠右對齊。

## 層疊情境與多行省略

這一節說明兩件容易讓人困惑的事：`z-index` 為什麼有時怎麼加大都沒用，以及怎麼把文字限制在固定行數並以省略號收尾。

### 層疊情境

層疊情境（stacking context）是一組自成一體的重疊順序：裡面的元素只在這一組內比大小，整組再和外面的兄弟比。所以子層的 `z-index` 再大，也超不過它所屬那一組之外、層級更高的元素。

**觀念**

- 有 `z-index` 的定位元素會建立層疊情境，`opacity` 小於 1、有 `transform` 也會。
- `isolation: isolate` 是不帶其他副作用的建立方式，常用來把某個元件的層級封裝起來。
- 有 `transform` 的祖先還會讓 `position: fixed` 的子孫改成相對它定位，而不是相對視窗。

```html 03-css/pages/42b-css-stacking.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>層疊情境</title>
    <style>
      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      h1 {
        margin: 0 0 1rem;
      }

      .pair {
        position: relative;
        margin-bottom: 4rem;
      }

      .owner {
        height: 3rem;
        padding: 0.5rem;
        background: #ccfbf1;
      }

      .trapped {
        opacity: 0.99;
      }

      .tip {
        position: absolute;
        z-index: 999;
        top: 3.5rem;
        left: 1rem;
        padding: 0.35rem 0.75rem;
        background: #115e59;
        color: #f0fdfa;
      }

      .cover {
        position: relative;
        z-index: 1;
        height: 3rem;
        padding: 0.5rem;
        background: #fde68a;
      }
    </style>
  </head>
  <body>
    <h1>z-index 與層疊情境</h1>
    <div class="pair">
      <div class="owner">
        沒有層疊情境
        <span class="tip">提示 z-index: 999</span>
      </div>
      <div class="cover">蓋板 z-index: 1</div>
    </div>
    <div class="pair">
      <div class="owner trapped">
        owner 有 opacity
        <span class="tip">提示 z-index: 999</span>
      </div>
      <div class="cover">蓋板 z-index: 1</div>
    </div>
  </body>
</html>
```

**解析**

- 兩組結構相同：深青色的提示 `z-index: 999`，黃色的蓋板 `z-index: 1`，提示的下半部會落在蓋板範圍內。
- 第一組的 owner 沒有層疊情境，提示和蓋板在同一層比大小，999 贏，提示完整顯示。
- 第二組的 owner 加了 `opacity: 0.99`，成為獨立的層疊情境；提示只在這組內有 999，整組的層級卻低於蓋板，所以提示落在蓋板範圍內的部分被蓋住。

### 多行省略

多行省略是把一段文字限制在固定行數，超出的部分隱藏，並在最後一行尾端顯示省略號。目前各瀏覽器都支援的寫法是帶 `-webkit-` 前綴的一組；標準的 `line-clamp` 還沒有被所有主流瀏覽器支援（MDN 標示為非 Baseline），所以示範同時寫兩個。

**觀念**

- 前綴寫法要三個宣告一起：`display: -webkit-box`、`-webkit-box-orient: vertical`、`-webkit-line-clamp: 行數`。
- 還需要 `overflow: hidden` 才會真的把多出來的行藏起來；少了它，省略號仍會出現，但文字沒有被裁掉。
- 前綴只用在這一組，不要自己替其他屬性加前綴。

```html 03-css/pages/42-css-clamp.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>多行省略</title>
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
        line-clamp: 2;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <p class="clip">
      這是一段比較長的說明文字，用來示範多行省略。只要超過兩行，多出來的句子就會被收起來，並在第二行的尾端顯示省略號，第三行不會再出現。
    </p>
  </body>
</html>
```

**解析**

- 段落寬度限制在 16rem，只顯示兩行，第二行的尾端是省略號，第三行之後不畫出來。
- 把視窗縮窄，每行容納的字更少，仍然只剩兩行。
- 沒有被支援的瀏覽器看到不認識的標準 `line-clamp`，會直接略過，前綴那組仍負責省略。

## 選讀：float 只留繞排

float 的本來用途是讓文字沿著圖片走，像報紙的圖文混排。早期網頁拿它切欄，現在欄位交給 Grid；舊頁面若還有浮動切欄，讀得懂原因即可，新的版面不要再這樣排。

### 選讀：繞排與父層高度

`float: left` 把元素撥到這一行的左側，後面的文字沿著它的右邊走。浮動的元素不計入父層的內容高度，父層因此可能包不住圖；解法是在父層加上 `display: flow-root`，讓父層自成一個區塊並把浮動的圖算進高度。

**觀念**

- 繞排適合圖旁配一段說明。
- 父層要包住浮動的圖，用 flow-root 即可，不必再放一個空元素去清除浮動。

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
        display: flow-root; /* 父層高度包住浮動的圖 */
        background: #f0fdfa;
      }

      .story img {
        float: left; /* 圖靠左，文字繞到右邊 */
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

- 照片靠左，段落從它右邊開始；文字比照片矮時，淺青底仍然一樣高，因為 flow-root 把照片算進了父層。
- 把父層的 flow-root 拿掉，文字只有一行時父層會縮到和文字一樣高，照片凸出底色，下一段也可能擠到照片旁邊。這個結果和視窗寬度有關，視窗愈寬，文字愈短，愈容易看到。

### 選讀：不要拿來做多欄

多欄的寬度、欄距與換行，都可以交給 Grid 處理。用浮動加百分比寬度切欄，最後一行常常對不齊，視窗變窄時也容易溢出，而且和繞排混在一起很難維護。

**觀念**

- `repeat(auto-fit, minmax(8rem, 1fr))` 讓瀏覽器依容器寬度自動決定欄數，每欄至少 8rem、有空位就平均拉寬。
- 欄與欄之間的距離用 gap，不必再算百分比和 margin。

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

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr)); /* 依寬度自動決定欄數 */
        gap: 0.75rem; /* 欄距與列距 */
      }

      .cards article {
        padding: 0.75rem;
        background: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <div class="cards">
      <article>卡片 A</article>
      <article>卡片 B</article>
      <article>卡片 C</article>
    </div>
  </body>
</html>
```

**解析**

- 視窗夠寬時三張卡片排成一列並平分寬度；視窗縮窄到放不下三欄，卡片會自己換到下一列。
- 這個過程沒有任何百分比寬度或 float，所以不會留下對不齊的欄。

## 選讀：立體翻面

卡片可以沿垂直軸轉半圈，把背面轉到前面。這需要三件事：給父層視距、讓卡片保留 3D 空間，以及把轉到背後的那一面藏起來。一般版面用不到，知道組法即可。

**一覽**

- `perspective` 寫在父層，決定子層旋轉時的遠近感；數值愈小，透視愈誇張。
- `transform-style: preserve-3d` 寫在卡片，讓正面與背面留在同一個立體空間，而不是被壓成一張平面。
- `backface-visibility: hidden` 寫在兩個面，轉到背後的那一面不畫出來，否則兩面會疊在一起。

**觀念**

- 背面先轉 180 度放好，卡片整張再轉 180 度，背面才會朝向你，而且字是正的。
- 轉場寫在卡片上，翻面才有動畫而不是瞬間跳過去。

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
        perspective: 40rem; /* 視距 */
      }

      .card {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d; /* 保留 3D 空間 */
      }

      .scene:hover .card {
        transform: rotateY(180deg);
      }

      .face {
        position: absolute;
        inset: 0;
        margin: 0;
        text-align: center;
        line-height: 6rem;
        backface-visibility: hidden; /* 轉到背後時不畫 */
      }

      .front {
        background: #115e59;
        color: #f0fdfa;
      }

      .back {
        background: #9f1239;
        color: #fff;
        transform: rotateY(180deg); /* 先轉到背後 */
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
- 滑鼠放在場景上，卡片在 0.6 秒內轉半圈，玫瑰紅的背面轉到前面，字是正的。
- 兩個面都寫了隱藏背向的規則，所以任何時候只會看到朝向你的那一面。拿掉它，兩面都畫得出來，會疊在一起。
- 這個效果靠滑鼠懸停觸發，觸控裝置上不一定能翻面，正式頁面要另外想辦法。

## 選讀：容器查詢

媒體查詢看的是視窗寬度。同一張卡片放進寬的主欄與窄的側欄時，視窗一樣寬，卡片卻該有不同的排法。容器查詢改看某個祖先盒子自己的寬度，讓元件依它所在的位置調整。本節接著介紹同為近年新增的視窗高度單位，處理手機工具列造成的高度差。

兩者都已被 Chrome、Firefox、Safari 的現行版本支援：容器查詢在 2023 年成為 Baseline，動態視窗單位約在 2022 年底起各家都有。公司若要支援很舊的瀏覽器，上線前再查一次支援表。

### 選讀：依容器寬度改排版

先在父層宣告它是容器，子層的查詢才有對象。沒有指定名字時，查詢會對到最近的一層容器。

**觀念**

- `container-type: inline-size` 表示以這個盒子的寬度當作查詢依據。
- `@container (min-width: 24rem)` 的門檻比的是容器的寬度，不是視窗。
- 查詢只能改容器裡面的元素，不能改容器自己；所以容器和要改排版的卡片要分成兩層。

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
        container-type: inline-size; /* 子層的 @container 看這裡的寬 */
        margin-bottom: 1rem;
        border: 1px solid #99f6e4;
      }

      .narrow {
        width: min(100%, 16rem);
      }

      .wide {
        width: min(100%, 36rem);
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
    <div class="slot narrow">
      <article class="card">
        <img src="https://picsum.photos/id/1016/640/360" alt="風景照片" />
        <p>窄框：圖在上面。</p>
      </article>
    </div>

    <div class="slot wide">
      <article class="card">
        <img src="https://picsum.photos/id/1016/640/360" alt="風景照片" />
        <p>寬框：圖在左邊，文字在右邊。</p>
      </article>
    </div>
  </body>
</html>
```

**解析**

- 同一份卡片樣式放在兩個框裡：窄框最寬 16rem，沒達到 24rem，所以圖在文字上面。
- 寬框最寬 36rem，超過 24rem，所以卡片改成橫排，圖片固定 8rem 寬。
- 判斷的對象是各自的外框，不是視窗；視窗很寬時，窄框裡的卡片仍然維持直排。
- 瀏覽器視窗窄到寬框也不足 24rem 時，寬框會跟著縮成直排，這是依視窗寬度而定的結果。

### 選讀：動態視窗高度

手機瀏覽器捲動時工具列會收起或展開，可見高度因此會變。傳統的 vh 沒有考慮這件事，所以 `100vh` 的整屏區塊可能被工具列蓋住底部。CSS 因此新增了三組單位，分別對應工具列的不同狀態。

**一覽**

- `svh` 是小視窗：工具列都展開時的高度，內容不會被蓋住，但工具列收起後底下會多出空白。
- `lvh` 是大視窗：工具列都收起時的高度，內容鋪滿，但工具列展開時底部可能被蓋住。
- `dvh` 是動態視窗：跟著工具列目前的狀態變動，但捲動時高度會跟著變，大型頁面可能因此重新排版。
- 原本的 `vh` 在目前的瀏覽器裡等同 `lvh`。

**觀念**

- 整屏的第一屏通常用 dvh 或 svh 取代 vh，二選一看你要穩定還是貼合。
- 桌面瀏覽器沒有收合的工具列，這幾組單位的結果一樣，差異只在手機上看得到。

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
        min-height: 100dvh; /* 可見視窗的高度，跟著工具列變動 */
        padding: 1.5rem;
        background: #115e59;
        color: #f0fdfa;
      }
    </style>
  </head>
  <body>
    <section class="hero">
      <h1>這一屏用 dvh</h1>
      <p>手機工具列展開或收合時，高度跟著可見範圍變動。</p>
    </section>
  </body>
</html>
```

**解析**

- 深青綠的區塊至少和目前看得到的視窗一樣高，底色鋪滿整屏。
- 在桌面瀏覽器上看不出和 100vh 的差別；要在手機或手機模擬器上捲動頁面，才會看到高度隨工具列變化。

## 選讀：把變數註冊成可補間

一般自訂屬性存的是一串文字，轉場不知道要怎麼從一個值走到另一個值。用 @property 替變數註冊類型之後，瀏覽器知道它是角度、顏色或長度，才能在兩個值之間補間（逐步算出中間值）。@property 在 2024 年 7 月起成為 Baseline 的新近可用功能，較舊的瀏覽器上可能沒有效果。

**一覽**

- `syntax` 告訴瀏覽器這個變數的類型，例如角度或長度。
- `inherits` 決定子層是否繼承這個值，註冊時一定要寫。
- `initial-value` 是沒有指定值時的起點；類型不是萬用的 `*` 時必須寫，缺少時整段註冊會被忽略。

**觀念**

- 沒有註冊時，對變數做 transition，畫面多半會直接跳到終點。
- 註冊成角度之後，漸層的方向才會在兩端之間轉動。
- 一般用途的變數（例如品牌色）不需要註冊，只有要做動畫時才用。

```html 03-css/pages/38-css-property.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>可補間的變數</title>
    <style>
      @property --angle {
        syntax: "<angle>"; /* 沒有類型就不能補間 */
        inherits: false;
        initial-value: 0deg;
      }

      body {
        margin: 1.5rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .swatch {
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

- 平常漸層的角度是註冊的初始值 0 度，顏色由下往上。
- 滑鼠放上去時，角度在 0.6 秒內走到 90 度，漸層的方向逐步轉動，而不是整塊瞬間換掉。
- 拿掉 @property 區塊再做同一個過渡，角度多半會直接跳過去，因為瀏覽器不知道這串文字是角度。

# 回家作業

這份作業只用必教內容，請替一頁沒有樣式的行程列表加上 CSS。內容取自專案的行程清單。課堂上不會批改，也沒有標準答案；每一題都附上完成後該看到的結果，自己對照即可。

## 起始檔

起始檔在練習專案的 `03-css/homework/`：HTML 已經寫好，樣式檔是空的，所有規則寫在樣式檔裡，不要改 HTML。

```html 03-css/homework/03-homework.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行程列表</title>
    <link rel="stylesheet" href="03-homework.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="#">洛奇旅行</a>
      <nav>
        <a href="#">首頁</a>
        <a href="#">行程</a>
        <a href="#">報名</a>
      </nav>
    </header>
    <main>
      <h1>熱門行程</h1>
      <ul class="tour-list">
        <li class="tour-card">
          <p class="tour-theme">城市</p>
          <h2>台北大稻埕與北投溫泉三日</h2>
          <p class="tour-meta">3 天</p>
          <p class="tour-price">NT$18600</p>
          <a class="tour-link" href="#">看行程</a>
        </li>
        <li class="tour-card">
          <p class="tour-theme">山海</p>
          <h2>花蓮太魯閣與七星潭四日</h2>
          <p class="tour-meta">4 天</p>
          <p class="tour-price">NT$26800</p>
          <a class="tour-link" href="#">看行程</a>
        </li>
        <li class="tour-card">
          <p class="tour-theme">古都</p>
          <h2>台南府城與安平兩日</h2>
          <p class="tour-meta">2 天</p>
          <p class="tour-price">NT$8800</p>
          <a class="tour-link" href="#">看行程</a>
        </li>
        <li class="tour-card">
          <p class="tour-theme">日本</p>
          <h2>京都嵐山、伏見與奈良五日</h2>
          <p class="tour-meta">5 天</p>
          <p class="tour-price">NT$52800</p>
          <a class="tour-link" href="#">看行程</a>
        </li>
      </ul>
    </main>
    <footer class="site-footer">
      <p>洛奇旅行 · 練習用頁面</p>
    </footer>
  </body>
</html>
```

```css 03-css/homework/03-homework.css
/* 在這裡開始寫 */
```

## 題目

### 題目一：全站基礎與變數

讓所有元素的寬高計算方式一致，並把頁面的外距歸零。用 CSS 變數定義品牌色（深青綠）、文字色與底色，字型使用系統字型堆疊，行高設為 1.6。

完成後頁面背景與文字顏色改了變數就會一起改變；用開發者工具的 Computed 面板看到 body 的 `box-sizing` 是 border-box。

### 題目二：版頭排版

用彈性盒子讓版頭左邊是品牌名、右邊是三個導覽連結，連結之間留間距，連結去掉底線。窄到放不下時要自動換行，不要擠出橫向捲軸。

完成後在寬螢幕上品牌與導覽分在兩端；把視窗縮到約 320 像素寬，內容仍在畫面內。

### 題目三：卡片外觀

讓每張卡片有內距、邊框或陰影、圓角與白色背景。主題標籤做成行內的小膠囊，價格加粗，「看行程」連結做成有內距的按鈕。

完成後每張卡片是獨立的一塊；主題標籤只和文字一樣寬，不會撐滿整行。

### 題目四：卡片牆

用格線把四張卡片排成多欄：每欄最小 16rem，放得下幾欄就排幾欄，欄與列之間留間距。

完成後寬螢幕是四欄或接近四欄，拉窄視窗會自動變成三欄、兩欄，最後變成一欄；不需要媒體查詢。

### 題目五：互動狀態

連結按鈕在滑鼠移入時換底色並稍微上浮，用轉場讓變化順暢；用鍵盤 Tab 聚焦時要有清楚的外框，且不要用 `outline: none` 直接拿掉。

完成後滑鼠移入有 0.2 秒的過渡；按 Tab 走到按鈕時有明顯外框。

### 題目六：手機優先與版心

先寫手機的樣式，再用寬度大於 48rem 的媒體查詢加大版心：主要內容最大寬度 64rem、水平置中、左右留白。

完成後窄螢幕內容貼滿左右（保留內距）；寬螢幕內容置中，兩側有空白。

# 本篇重點回顧

選讀的有「字、色與背景」裡的「選讀：進階選擇器、分層、字型與命名」、「響應式、變數與動態」裡的「選讀：列印與偏好」，以及整章「選讀：邊界與進階動效」（含「選讀：float 只留繞排」「選讀：繞排與父層高度」「選讀：不要拿來做多欄」「選讀：立體翻面」「選讀：容器查詢」「選讀：依容器寬度改排版」「選讀：動態視窗高度」「選讀：把變數註冊成可補間」），其餘都是必讀主線。

- 一條規則由選擇器與宣告組成，樣式可以寫在標籤上、頁內或外部樣式表，同屬性寫兩次留下較下面的。
- 選擇器決定打到誰，權重四欄由左到右比、不進位，相同時看誰寫在後面，所以不要靠 `!important` 解權重。
- 繼承只發生在沒有人寫該屬性的時候，inherit、initial、unset、revert 可以明示跟父層或回到初始與瀏覽器預設。
- 內文長度以 rem 為主，顏色用十六進位或 hsl，字型寫成字型堆疊，背景可以疊底色、漸層與圖片。
- 盒子由內容、內距、邊框、外距組成，先把全部元素設成 border-box，再用 display、定位與 overflow 決定怎麼排、座標跟誰比、超出時怎麼辦。
- Flex 沿一個方向排、Grid 同時排欄與列，項目之間的縫交給 gap。
- 窄畫面先做會縮的流動版面，結構要變才用最小寬度的媒體查詢，重複的顏色與間距收成變數。
- 動態效果由 transform、transition 與 keyframes 分工，樣式沒出現時看 DevTools 的 Styles 刪除線與 Computed 最終值。

# 專有名詞中英對照

## 規則怎麼套上元素

- 層疊樣式表（Cascading Style Sheets）
- 樣式表（stylesheet）
- 規則（rule）
- 權重（specificity）
- 層疊（cascade）
- 繼承（inheritance）
- 宣告（declaration）
- 屬性（property）
- 值（value）
- 字級（font-size）
- 字重（font-weight）
- 邊框（border）
- 選擇器（selector）
- 元素選擇器（type selector）
- 註解（comment）
- 行內樣式（inline style）
- 頁內樣式（internal style）
- 外部樣式表（external stylesheet）
- 錨點（anchor）
- 屬性選擇器（attribute selector）
- 組合選擇器（combinator）
- 後代選擇器（descendant combinator）
- 直接子層（child combinator）
- 緊鄰兄弟（adjacent sibling combinator）
- 後方兄弟（general sibling combinator）
- 巢狀（nesting）
- 偽類（pseudo-class）
- 偽元素（pseudo-element）
- 連結四態（link pseudo-classes）
- 焦點（focus）
- 結構偽類（structural pseudo-class）
- 瀏覽器預設樣式表（user agent stylesheet）
- 初始值（initial value）
- 作者樣式（author style）

## 字、色與背景

- 長度（length）
- CSS 像素（CSS pixel）
- 根元素（root element）
- 視窗（viewport）
- 透明度（alpha）
- 十六進位（hexadecimal）
- 色票（color palette）
- 字型堆疊（font stack）
- 通用家族（generic font family）
- 行高（line-height）
- 簡寫（shorthand property）
- 字距（letter-spacing）
- 背景圖層（background layer）
- 底色（background-color）
- 漸層（gradient）
- 層（cascade layer）
- 字型檔（font file）
- BEM 命名法（Block Element Modifier）

## 盒子與欄位排版

- 盒子模型（box model）
- 內容（content）
- 內距（padding）
- 外距（margin）
- 區塊（block）
- 行內（inline）
- 基線（baseline）
- 定位（positioning）
- 偏移（offset）
- 層疊情境（stacking context）
- 溢出（overflow）
- 省略號（ellipsis）
- 欄（column）
- 列（row）
- 主軸（main axis）
- 交叉軸（cross axis）
- 容器（container）
- 項目（item）
- 欄距（column gap）
- 列距（row gap）
- 欄線（grid line）

## 響應式、變數與動態

- 響應式網頁設計（Responsive Web Design）
- 媒體查詢（media query）
- 流動版面（fluid layout）
- 版心（content wrapper）
- 斷點（breakpoint）
- 行動優先（mobile-first）
- 列印（print）
- 減少動態效果（reduced motion）
- 自訂屬性（custom property）
- 變數（CSS variable）
- 備援（fallback）
- 變形（transform）
- 平移（translate）
- 縮放（scale）
- 旋轉（rotate）
- 轉場（transition）
- 動畫（animation）
- 關鍵影格（keyframe）
- 無障礙（accessibility）
- 開發者工具（DevTools）
- 裝置工具列（device toolbar）

## 選讀：邊界與進階動效

- 外距合併（margin collapsing）
- 邏輯方向（logical properties）
- 行內方向（inline direction）
- 區塊方向（block direction）
- 區塊格式化情境（block formatting context）
- 多行省略（line clamp）
- 繞排（float text wrapping）
- 浮動（float）
- 視距（perspective）
- 容器查詢（container query）
- 動態視窗高度（dynamic viewport height）
- 小視窗（small viewport）
- 大視窗（large viewport）
- 補間（interpolation）
