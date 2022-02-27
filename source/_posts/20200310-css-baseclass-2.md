---
title: "[基礎課程] CSS 教學（二）：屬性值 - 基本篇"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-10 01:27:51
---

![](https://i.imgur.com/lElmG8a.png)

歡迎來到 CSS 教材的第二篇共五篇。除了第一篇屬於入門需要介紹 CSS 公式與使用方法，之後開始都是全部都討論屬性值的控制。可以根據方向性規劃出不同的領域介紹，第二篇都是一些很基礎的 CSS 屬性值，隨著後續章節越來越高階應用。

<!-- more -->

# CSS 屬性值：基本篇
CSS 簡單來說就是透過屬性值去要求瀏覽器要如何去宣染這個對象的外觀，通常一個對象會持有很多種屬性值。複數的不斷去累加外觀效果拼湊出一個理想效果。這裡章節會列舉出一些常用且基礎的 CSS 屬性值或組合方式。

部分屬性值額外支援`組合寫法`，也就是可以把多個屬性設定合併成一行。絕大部分的 CSS 設計師都會這樣做。如果可以盡可能學會簡寫減少代碼量。

{% blockquote CSS's keyword index https://developer.mozilla.org/zh-TW/docs/Web/CSS/Reference#Keyword_index %}
完整的屬性所有項目請參考 MDN 官方手冊：
{% endblockquote %}

## 字型 - Font
指定對象的網頁文字要吃什麼字型、字體大小、多粗、或特別效果（各項設定都是獨立的屬性，依需求多筆設定）。通常會習慣統一標準在 body 上設定，之後如果有特別的文字處理再另外指定字型效果（優先權覆蓋）。

以下是簡單的介紹五種常用屬性：
```css
body {
  /* 設定字型家族 */
  font-family: "Microsoft JhengHei", Arial, sans-serif;
  /* 設定字體大小 px、em、rem */
  font-size: 20px;
  /* 設定斜體 */
  font-style: italic;
  /* 設定粗體 */
  font-weight: bold;
  /* 設定字體都變成大寫，但第一個字較大 */
  font-variant: small-caps;
}
```

### font-family 字型設定與來源
這個屬性上需要特別介紹字型設定，你可以設定多筆字型套用（採優先順序），指定多個字型需逗號分開，雙引號只有碰到空白單字才使用，否則可以省略不寫。

優先權由前到後面逐一適應，如果某字第一項不適用時才會吃第二項字型。通常這行為發生在中英混用時，中文環境上先讓第一項英文字型先吃掉英數符號，吃不到中文的會由第二項的中文符號，其他則設計師習慣多安排一項通用字型（像是 sans-serif) 放在最後面預備，不寫也可以會採作業系統預設字。

網頁字是依賴作業系統或瀏覽器內建字型來呈現，所以必須告知瀏覽器要使用何種字型。字型大致上可分為四種來源設定方法。

#### 系統字型：（通用字型）
不做任何設定就能直接使用。各系統平台都有這些通用字型（可能些許差異），分別是 sans-serif ( 無襯線體 )、serif ( 襯線體 )、monospace ( 等寬體 )、cursive ( 手寫體 ) 和 fantasy ( 幻想體 )。

>**缺點：**中文支援程度不好且效果有限。

{% blockquote 維基百科-襯線體 https://zh.wikipedia.org/wiki/%E8%A1%AC%E7%BA%BF%E4%BD%93 %}
襯線可以解讀成明體，也就是轉角或尖角會突出點綴的陪襯裝飾。
{% endblockquote %}

#### 系統字型：（指定字型）
不做任何設定就能直接使用。使用系統上持有的指定字型，譬如 Windows 的微軟正黑體（亦可寫 Microsoft JhengHei，但部分瀏覽器不支援），MacOS 的蘋方 (PingFang)，用戶電腦如果能呼叫出該字型名稱就能套用。主要還是依賴用戶端內有無此字型。

>**缺點：**跨平台差，不是每台電腦都是一樣的系統字型。

#### 外部字型
由網站提供字型檔案 TTF 檔讓用戶讀取網頁時自動下載該字型，缺點很多除非需要很特別的字型時才會用此方式。

```css
/*@font-face 是比較偏向伺服端提供 TTF 字型檔給用戶下載預覽用*/
@font-face {
  /* 
  font-family: "自定義名稱";
  src: url（字體檔超連結）; 
  */

  /* 登記一個內建字體 */
  font-family: "ChantellAntiquaRegular"; /* 使用的字體名稱，之後在樣式表裡用這行套用 */
  src: url("fonts/Chantelli_Antiqua-webfont.eot"); /* 使用的字體檔路徑 */
}
```

>**缺點：**提供 TTF 下載可能面臨商用授權問題，且不一定字型檔能適用在各種 OS 上，同時還有下載流量頻寬問題與網頁效率。除非特殊用途（內網）否則一般不會選擇此方式。

#### 線上字型（推薦）
屬於大多現在主流的快速使用方式，直接 CDN 連線引用到免費字型庫，設定方式也很簡單（大部分官方都有說明連線），且可以一次引用多筆字型，唯一就是中文字型需要特別費心找一下。

{% blockquote Noto Sans TC https://fonts.google.com/specimen/Noto+Sans+TC?selection.family=Noto+Sans+TC %}
推薦免費的中文字型使用 Google Font 的思源中文黑體
{% endblockquote %}

線上字型庫通常都會教如何使用，大致上可以分 CSS Link(HTML) 跟@import(CSS) 方式載入線上字型，選一種匯入方式就可以了。

使用 HTML 的 link 方式：
```html
<!--和一般載入 CSS 的作法一樣，只是把 CSS 的超連結換成字體的超連結，就能夠使用該字體。-->
<link href="外部字體超連結" rel="stylesheet">
```

或者，在 CSS 內使用@import：

```css
/*運用 CSS 的@import，將要載入的外部字體超連結，寫在 CSS 內，載入後就能使用該字體。*/
  @import url('外部字體超連結');
```

設定好之後，根據線上字型庫的說明方式，依據字型名稱用在 font-family 內即可。

>**缺點：**就必須要連網，除非你的網站屬於封閉無外網否則算是沒有缺點，且分散了頻寬使網速夠快。

### font-size 單位
文字大小需要給個單位，單位的方式很多種，可以分成絕對單位 (px)、相對單位 (em、rem)、比例單位 (%) 等等，但適合給字型使用的如下：

- `pt` pt 稱為`點`(point)，1pt 等於 1/72 英吋，大部分電腦的顯示解析度為 72ppi，所以大約等同於 px（像素）。
- `px` 絕對數值，像素，幾就是幾。
- `em` 相對數值，目前元素所繼承之長度再進行倍率，相對於父層進行縮放。
- `rem` (root em) 相對數值，相對於 root 元素 (html) 文字大小進行倍率，一般是 16px。

關於 em 與 rem 的差異可以參考以下練習，分析實際字體大小為何。
```html
<div style="font-size:1em">font
  <div style="font-size:2em;">font
    <div style="font-size:3em;">font</div>
  </div>
</div>
<hr/>
<div style="font-size:1rem">font
  <div style="font-size:2rem;">font
    <div style="font-size:3rem;">font</div>
  </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script>
  $("div").each(function() {
    $(this).prepend($(this).css("font-size"));
  });
</script>
```

## 文字 - Text
網頁文字也能像 Office Word 那樣對文字段落做許多效果，尤其是中英文上段落詮釋有不同的參數可以指定。

### 段落樣式
包含了槓線（分上中下）、定位點 (Tab)、英文大小寫處理、文字陰影、溢出處理、文字與符號的間格寬度。

```css
p {
  /*inline （包含 inline-block) 模式下的內部元素的對齊位置：
    jsutify, left, right, center
  */
  text-align: center;

  /*裝飾線：
    none, overline（上）, line-througn（中）, underline（下）
  */
  text-decoration: underline;

  /** 定位 Tab **/
  text-indent: 1.5rem;

  /*英文大小寫處理：
    capitalize（每個單字第一個英文字大寫）, lowercase（全小寫）, uppercase（全大寫）
  */
  text-transform: uppercase;

  /*文字陰影：
    公式=>水平、垂直、陰影模糊半徑、顏色，可以設定多重陰影用逗號分開
  */
  text-shadow: 3px 3px 3px #999;
  /* text-shadow: 3px 3px 3px #999, -3px -3px 3px #a00; */

  /****/

  /*超過上限寬度的處理：適合在一些版面預覽上有字數限定應用，但需要搭配條件才能凸顯
    1. block 模式下，持有寬度 （必要條件）
    2. 沒指定高度時不准換行讓他超出寬度 white-space: nowrap; 
    3. 超出 block 就不要看到了 overflow:hidden （必要條件）

    clip（切掉）, ellipsis（切掉並加上…結尾）
  */
  text-overflow: ellipsis;

  /*字元間距：英文字母或中文字的間隔*/
  letter-spacing: 5rem;
  /*單字間距空格，中文沒有單字空格設計，僅適用英文。*/
  word-spacing: 1rem;
}
```

{% note danger %}
**新手陷阱：text-align 的有限功能**
text-align 的功能僅限於作用 inline 元素的 content 內容部分來對齊，而不是本身整體 block 元素的對齊控制。因此如果你希望該元素能控制行內之定位，除了本身不是 block（可以是 inline-block)，應對該元素之父層下達 text-align 屬性，控制父層的 content 內容對齊。
{% endnote %}

### 文字換行
數字或英文字無空格時會產生不換行超出盒框區域，有三種屬性可用。 

- word-break: 指定英文單字能否斷行。
- overflow-wrap: 過長的單字當無法填充行內，為防止其溢出是否允許斷行。
- white-space: 決定如何處理元素內的空白字元。

```css
/*
word-break: 
  normal （瀏覽器預設值）
  break-all （允許破壞單字進行換行）
  keep-all （保留單字完整，只能在半形空格或連字符號換行） 
  break-word （非標準寫法，同等 overflow-wrap:break-word 行為）
*/
p.test1 {
  word-break: keep-all;
}
p.test2 {
  word-break: break-all;
}

/*
overflow-wrap:
  break-word （單字會有 keep 效果，但如果特長的單字或 URL 超出寬度則會 break 單字。
*/
p.test3 {
  overflow-wrap: break-word;
}

/*
wite-space:
  normal（忽略空白）
  pre（像 pre 標籤用途，保留空白）
  nowrap（死都不換行，除非有 br，否則不會斷行，會一直顯示超出區塊。)
  pre-wrap（保留空白，但是會自動換行）
*/
p.test4 {
  white-space: nowrap;
}

p {
  width: 9em;
  border: 1px solid #000000;
  margin: 20px;
}
```

```html
<h1>word-break:keep-all（只能在半角空格或連字符處換行）</h1>
<p class="test1">
  This paragraph contains some text. This line will-break-at-hyphenates.
</p>

<h1>
  word-break:break-all（若一個單字過長，超過畫面的寬度，則將單字切斷，並換行。）
</h1>
<p class="test2">
  This paragraph contains some text: The lines will break at any character.
</p>

<h1>
  word-wrap:break-word（若一個單字過長，超過畫面的寬度，則將單字換行（不切斷單字）。）
</h1>
<p class="test3">
  This paragraph contains a very long word:
  thisisaveryveryveryveryveryverylongword. The long word will break and wrap to
  the next line..
</p>

<h1>
  white-space:nowrap（移除連續空白，移除換行符號 (n r)， 強迫文字不換行。）
</h1>
<p class="test4">
  This is some text. This is some text. This is some text. This is some text.
</p>
```
{% jsfiddle summer10920/boexum6L result,html,css dark 100% 1000 %}

{% note warning %}
**科普知識：overflow-wrap 的因果**
  以前叫做 word-wrap 是微軟獨家的 CSS 效果，後來 CSS3 另外取名（怕被告？!) 叫做 overflow-wrap。
  另外很多人會跟 word-break 混淆，所以 word-break 乾脆就破例多一個值可以代替此效果，也就是：

  `word-break:break-word`同等價於`overflow-wrap:break-word`
{% endnote %}

### line-height（行高）
- 預設 line-height 高度為字體高度的 1.2 倍，單位可以是數字（倍率）, px, em, rem，但通常用數字（用 font-size 當比例）
- line-height 與 font-size 密不可分，line-height 只影響行內元素（文字）與其他行內內容，而不會直接影響區塊元素。
- 計算行距方式=`(line-height 減去 font-size)/2`，如果 `{font-size 14px;line-height 18px}`則上方與下方的行距個別是 (18-14)/2=2。

```html
<style>
  div {
    line-height: 1.5;
  }
  p {
    font-size: 18px;
  }
</style>
<div>
  <p>
    line-height 最好用數字倍數表示，這樣計算起來比較彈性，現在段落行高是 18x1.5=27px。
  </p>
</div>
```

{% note info %}
**小技巧：line-height 可以當區塊元素的垂直置中效果**

line-height 如果跟著區塊元素（block、inline-block）的 height 設定相同值，這表示只要`line-height` 比 `font-size` 還大，會因為行距填滿了上下而導致文字置中，且背景顏色可以填滿高度。反之區塊則不會填滿因為行內不能設定 height。

```html
  <style>
    a {
      display: inline-block;
      line-height: 100px;
      height: 100px;
      width:150px;
      text-align: center;
      background: #aaa;
    }
  </style>
  <div style="background: aqua">
    <a href="#">LINK1</a>
    <a href="#">LINK2</a>
    <a href="#">LINK3</a>
    <a href="#">LINK4</a>
    <a href="#">LINK5</a>
  </div>
```

{% endnote %}

### vertical-align
vertical-align 只能夠作用在 `行內元素` 與 `置換元素 (img)`。

```html
<div>
  <span>default</span>
  <span style="vertical-align:middle">middle</span>
  <img
    src="https://fakeimg.pl/150x150/#ccc"
    style="vertical-align:middle;"
  />
  <span style="vertical-align:bottom">Bottom</span>
</div>
```

{% note success %}
**跟著做：思考原因為何？**
上面案例試著對 div 進行`style="line-height: 0"`能解釋出 Botton 的位置原因嗎？

解答：主要是繼承到 line-height 的 Botton 沒有字體高度所以中心點對其邊緣產生溢出現象。
{% endnote %}

## 連結 - Link
之前提過的 a 標籤之偽類別

```css
a:link {
  color: red;
  text-decoration: none;
}
a:visited {
  color: gray;
}
a:hover {
  color: green;
}
a:active {
  color: blue;
}
```

## 小節練習 - Font

以之前 HTML 文章的 [總結練習](/2020/03-05/html-baseclass-1/#總結練習)來設計樣式：

1. 不故意修改 HTML 條件下，僅利用 CSS 來完成以下動作。
2. 將所有字體改成 "微軟正黑體"。
3. 設定標題 h1 的字型大小為 40px，且不是斜體（不刪除 em 情況下）。
4. 設定標題 h2 的顏色（隨意）。
5. 設定 a 連結樣式，一般、滑入、點擊時、點擊後四種狀態文字的顏色，以及一般狀態時無底線，滑入時底線。
6. 設定 p 段落的行高 1.5 倍，並且設定段落的縮排，以瀏覽器預設字體大小的 2 倍來做為數值。
7. 設定每個 p 段落的第一個字變大，需看得出比其他段落文字還大，且要粗體。
8. 將頂端"技術觀念"四字設定成紅色。
9. 將座位表的 center 外層標籤拿掉，並設定座位表標題為水平置中。
10. 將表格裡面所有的 align="center" 拿掉，使用 CSS 代替進行文字的水平置中。
11. 嘗試將整個表格也置中於畫面。

{% tabs demoCSS，1 %}
<!-- tab 題目-->
{% jsfiddle summer10920/ex1c3bsd result dark 100% 500 %}
<!-- endtab -->
<!-- tab 解答 HTML-->
```html TryCSS_cls2_font.html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>我的第一個網頁</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h1 id="top"><em>網頁前端技術</em></h1>
  <p>
    這是我在職訓期間所要學習的前端技術，每項技術都有它負責的工作，學習網頁最重要的是<strong>技術觀念</strong>，不需要去背記全部的標籤、屬性、值，常使用自然會記起，
    遇到不懂或是忘記的標籤，使用網路資源 Google 或前往
    <a href="http://www.runoob.com/" target="_blank">菜鳥教程</a>
    查詢，一定要自己去嘗試，才能產生自己的想法。
  </p>
  <ul>
    <li><a href="#html">HTML</a></li>
    <li><a href="#css">CSS</a></li>
    <li><a href="#js">Javascript</a></li>
    <li><a href="#jq">JQuery</a></li>
    <li><a href="#bs">Bootstrap</a></li>
  </ul>

  <hr />

  <img src="https://imgur.com/VCHx7bt.png" width="150" alt="html" title="html" id="html" />
  <h2>HTML-負責架構、內容</h2>
  <p>
    超文本標記語言（英語：HyperText Markup
    Language，簡稱：HTML）是一種用於建立網頁的標準標記語言。HTML
    是一種基礎技術，常與 CSS、JavaScript
    一起被眾多網站用於設計賞心悅目的網頁、網頁應用程式以及行動應用程式的使用者介面。網頁瀏覽器可以讀取
    HTML 檔案，並將其彩現成視覺化網頁。HTML
    描述了一個網站的結構語意隨著線索的呈現，使之成為一種標記語言而非程式語言。
  </p>

  <h3>基礎結構：</h3>
  <pre><code>
    &lt;html&gt;
      &lt;head&gt;
  
      &lt;/head&gt;
      &lt;body&gt;
  
      &lt;/body&gt;
    &lt;/html&gt;
    </code></pre>

  <h3>標籤特性：</h3>
  <ol>
    <li>標籤不分大小寫，但請用小寫。</li>
    <li>"&lt;&gt;" 開頭，"&lt; /&gt;" 結尾。</li>
    <!--雖然 Chrome 聰明讀出你的文字，但這裡應該使用實體化符號-->
    <li>標籤具有屬性與值的特性。</li>
    <li>標籤標記內容，產生語義，組成了結構。</li>
  </ol>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <img src="https://i.imgur.com/XDcJWRp.png" width="150" alt="css" title="css" id="css" />
  <h2>CSS-負責外觀、樣式</h2>
  <p>
    層疊樣式表（英語：Cascading Style
    Sheets，簡寫 CSS），又稱串樣式列表、級聯樣式表、串接樣式表、階層式樣式表，一種用來為結構化文件（如
    HTML 文件或 XML 應用）添加樣式（字型、間距和顏色等）的電腦語言，由 W3C
    定義和維護。目前最新版本是 CSS2.1，為 W3C 的推薦標準。CSS3
    現在已被大部分現代瀏覽器支援，而下一版的 CSS4 仍在開發中。
  </p>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <img src="https://i.imgur.com/6y1TXDv.png" width="150" alt="JavaScript" title="JavaScript" id="js" />
  <h2>JavaScript-負責行為、互動</h2>
  <p>
    JavaScript，通常縮寫為 JS，是一種進階直譯語言的程式語言。JavaScript
    是一門基於原型、函式先行的語言，是一門多範式的語言，它支援物件導向編程，指令式程式設計，以及函式語言程式設計。
  </p>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <img src="https://i.imgur.com/62fxrEf.jpg" width="150" alt="jQuery" title="jQuery" id="jq" />
  <h2>JQuery-JavaScript 函式庫</h2>
  <p>
    jQuery 是一套跨瀏覽器的 JavaScript 函式庫，簡化 HTML 與 JavaScript
    之間的操作。全球前 10,000 個存取最高的網站中，有 65%
    使用了 jQuery，是目前最受歡迎的 JavaScript 函式庫
  </p>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <img src="https://i.imgur.com/eScPvUF.png" width="150" alt="bootstrap" title="Bootstrap" id="bs" />
  <h2>Bootstrap-前端框架</h2>
  <p>
    Bootstrap
    是一組用於網站和網路應用程式開發的開源前端（所謂「前端」，指的是展現給終端使用者的介面。與之對應的「後端」是在伺服器上面執行的程式碼）框架，包括
    HTML、CSS 及 JavaScript
    的框架，提供字體排印、表單、按鈕、導航及其他各種元件及 Javascript
    擴充套件，旨在使動態網頁和 Web 應用的開發更加容易。
  </p>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <div class="center">
    <h2>座位表</h2>
    <table width="800px" border="1px">
      <tr>
        <td colspan="4">
          <table border="1">
            <tr>
              <td>老師的位置</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>4 號</td>
        <td>3 號</td>
        <td>2 號</td>
        <td>1 號</td>
      </tr>
      <tr>
        <td>8 號</td>
        <td>7 號</td>
        <td>6 號</td>
        <td>5 號</td>
      </tr>
      <tr>
        <td>12 號</td>
        <td>11 號</td>
        <td>10 號</td>
        <td>9 號</td>
      </tr>
      <tr>
        <td>16 號</td>
        <td>15 號</td>
        <td>14 號</td>
        <td>13 號</td>
      </tr>
      <tr>
        <td>20 號</td>
        <td>19 號</td>
        <td>18 號</td>
        <td>17 號</td>
      </tr>
      <tr>
        <td>24 號</td>
        <td>23 號</td>
        <td>22 號</td>
        <td>21 號</td>
      </tr>
    </table>
  </div>
</body>
</html>
```
<!-- endtab -->
<!-- tab 解答 CSS-->
```css style.css
body {
  font-family: "Microsoft JhengHei";
}
h1 {
  font-size: 40px;
}
h1 em {
  font-style: normal;
}
h2 {
  color: dodgerblue;
}
a:link {
  color: darkorange;
  text-decoration: none;
}
a:visited {
  color: darkgray;
}
a:hover {
  color: darkslateblue;
  text-decoration: underline;
}
a:active {
  color: dodgerblue;
}
p {
  line-height: 1.5;
  text-indent: 2rem;
}
strong {
  color: red;
}p:first-letter {
  font-size: 20px;
  font-weight: bolder;
}
.center {
  text-align: center;
}
table {
  border-collapse: collapse;
  /* 讓邊框合併為單一邊框 */
  margin: auto;
}
```
<!-- endtab -->
{% endtabs %}

## 背景 - Background 
請先指定一個區塊元素 DIV 且具備寬高，我們將進行背景 CSS 介紹。

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
```html cssTry_background.html
<div style="width:800px; height:600px"></div>
```
{% endnote %}

### 基礎屬性
```css
div {
  /* background-color */
  background-color: #ffa;

  /* background-image */
  background-image: url("https://fakeimg.pl/150x200/");
  /* url 裡的引號可有可無都可 */

  /*
    background-repeat
    =>repeat（預設）,repeat-x,repeat-y,no-repeat,space,round

    space 說明：根據容器與圖片大小，計算填滿且不會切圖，因此圖片會有間隔
    round 說明：根據容器與圖片大小，計算填滿且不會切圖但自動延展壓縮圖片，因此圖片沒有間隔但變形
  */
  background-repeat: no-repeat;
  /*雙值語法 水平 horizontal | 垂直 vertical */
  background-repeat: space repeat;

  /*
  background-position
    第一個為水平，第二個為垂直
    
    寫法 1 單字
      水平：left,right,center
      垂直：top,center,bottom
    
    寫法 2 比例
      0% 0%        左上角
      50% 50%      中央
      100% 100%    右下角
    
    寫法 3 指定（可負值）
      -200px -200px
      -10% -10%
  */
  background-position: right bottom;

  /* 
  background-size:
    寫法 1 單字
      auto（預設）, cover（等比例填滿超出裁切）, contain（等比例填滿不超出）
    寫法 2 單位 (px, %)
      水平寬 垂直高
  */
  background-size: cover;
  background-size: 120px 200px;
}
```

### background-clip 與 background-origin
兩者效果差不多但做法不同，前者為先對 border 開始貼圖，之後根據起始位置遮罩抹除；後者主要是指定圖片 position 的起始位置貼圖。

#### background-clip
從 border 開始依指定的位置直接遮罩裁切。
>使用 background-clip 需確保背景圖夠大能塞滿超出整個 border 區域才會有作用，可使用 repeat 重複（預設值）或 cover 使填滿。

```CSS
div {
  /*
  background-clip
  =>padding-box（預設）, border-box, content-box
  */
  background: url('https://fakeimg.pl/1024x768/');
  background-clip: content-box;
  background-size: cover;
  border: 10px dashed #ff0;
  padding: 10px;
}
```
{% note info %}
  **小技巧：新屬性**
  `background-clip: text`可玩出字為背景圖效果，需文字搭配`color: transparent`。
{% endnote%}

#### background-origin
CSS3 新屬性，能指定背景圖的起始放入位置是依據 padding, border, content 對齊擺放。對背景顏色無效
>使用 background-origin 要搭配 background-repeat:no-repeat 才會有效果。

```CSS
div{
  /* 
  background-origin
  =>padding-box（預設）, border-box, content-box
  */
  background: url('https://fakeimg.pl/150x200/') no-repeat;
  background-origin: padding-box;
  border: 10px dashed #ff0;
  padding: 10px;
}
```

### background-attachment
背景圖的固定跟隨點為何。
- scroll：隨容器定位移動，如果內容有滾輪條件也不受內容滾輪所移動。
- fixed：根據瀏覽器視埠 (viewport) 定位完全不會受誰而移動。
- local：隨內容定位移動，任何的滾輪都一同轉動。

如果 backgorund 有多筆可跟著多筆設定，使用`,`分隔。

```css
/*
background-attachment
=>scroll（預設）, fixed, local
*/
background-attachment: fixed;

```

#### 經典範例：fixed 的視覺效果
```html
    <style>
        div {
          background-image: url("https://picsum.photos/800/200/?random=1");
          background-attachment: fixed;
          background-repeat: no-repeat;
          background-position: center center;
          height: 20vh;
          border:1px solid #f00;
        }
      </style>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum maiores recusandae quos in voluptas obcaecati, minus explicabo saepe aliquam, laborum temporibus itaque iusto facilis a delectus, aspernatur ut ea eligendi?</p>
      <div>背景圖的容器在這裡</div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum maiores recusandae quos in voluptas obcaecati, minus explicabo saepe aliquam, laborum temporibus itaque iusto facilis a delectus, aspernatur ut ea eligendi?</p>
```

### Background 簡寫屬性
1. background-size 一定要緊接在 background-position 值之後，必須要用斜線分隔 (/)。
2. 這些數值仍然有一般限制，先設定水平軸在設定垂直軸向。
3. 同時設定 background-origin 與 background-clip 時，第一個數值會設為 background-origin，第二個則是 background-clip。

```css
div {
/*
  background-image: url('https://picsum.photos/id/1024/250/150'); 
  background-color: #aaa;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top right;
  background-size: cover;
  background-origin: content-box;
  background-clip。: content-box;
  可以簡寫為一句宣告：
*/
  background: url('https://picsum.photos/id/1024/250/150') #aaa no-repeat fixed top left/cover content-box content-box;
}
```

### 多層背景圖
- 若要使用多層背景重疊時，背景圖片列出的順序，將由上而下排列堆疊。
- 設定屬性時，依背景圖片出現順序設置。
- 多層背景可使用在卷軸，上中下的背景層級。

**寫法一**
```html
<style>
  div {
    background-image: 
      url("https://picsum.photos/500/100/?random=1"),
      url("https://picsum.photos/500/300/?random=2"),
      url("https://picsum.photos/500/100/?random=3")
    ;
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position: left top, left 100px, left bottom;
  }
</style>
<div style="width:500px;height:500px"></div>
```

**寫法二**
```html
<style>
  div {
    background: 
      url("https://picsum.photos/500/100/?random=1") no-repeat left top,
      url("https://picsum.photos/500/300/?random=2") no-repeat left 100px,
      url("https://picsum.photos/500/100/?random=3") no-repeat left bottom;
  }
</style>
<div style="width:500px;height:500px"></div>
```

### 模擬 img 效果
使用 DIV 的背景圖來完成塞滿動作，高度利用 padding 進行推高，使用本體之寬度*比例=高度。

{% note warning %}
**科普知識：**
早期是為了控制圖片填滿方式才模擬成背景圖，現在 CSS3 提供了屬性`object-fit`可以對圖片控制就不太需要這招了。
{% endnote %}

```html
<!-- img -->
<img src="https://picsum.photos/1000/600/?random=1" style="max-width:100%;" />

<!-- padding-top 透過背景滿版為 100%，得出高度為圖片倍率做 padding 空間 -->
<div style="
  background-image:url(https://picsum.photos/1000/600/?random=1);
  background-size:cover;
  padding-top:60%;
"></div>

<!-- 一般-->
<div style="
  height:300px;
  background-image:url(https://picsum.photos/1000/600/?random=1);
  background-size:cover;
  background-position: center center;
"></div>
```

## 背景 - 漸層色
background、backgroud-image 都可以設定漸層色，漸層方式有分線性或放射性，都是由 CSS 產生一個帶有漸層色的圖片資料。

{% blockquote CSS Gradient https://cssgradient.io/ %}
可透過網路上的免費產生器去快速調整想要的漸層（但功能很基本）
{% endblockquote %}

### 線性漸層 linear-gradient
- 漸變軸向的預設角度為 180deg = to bottom。
- 採以順時針軸向方位為角度（為顏色渲染的方向）。
- 軸向設定可用角度單位`deg`也可以使用`方位單字`指定。
- 可指定顏色的漸變比例位置（全長之百分比）。

```css
html,
body {
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;

  background: linear-gradient(red, yellow, blue); /* 預設 180deg */
  /* background: linear-gradient(15deg, red, yellow, blue); */

  /* 
    角度與方向 換算
    0deg => to top
    90deg => to right
    180deg => to bottom
    270deg => to left
  */

  /* background: linear-gradient(to top, green, yellow); */
  /* background: linear-gradient(to right, green, yellow); */
  /* background: linear-gradient(to bottom, green, yellow); */
  /* background: linear-gradient(to left, green, yellow); */

  /* 更多 45 角方向 */
  /* background: linear-gradient(to left bottom, red, yellow); */
  /* background: linear-gradient(to left top, red, yellow); */
  /* background: linear-gradient(to right top, red, yellow); */
  /* background: linear-gradient(to right bottom, red, yellow); */

  /* 指定位置之百分比 */
  /* background: linear-gradient(red 0%, green 50%, blue 100%); */

  /*多色位置指定*/
  /* background-image: linear-gradient(to right, #fff 0%, #000 30%, #fff 60%, #000 100%); */
}
```

### 放射漸層 radial-gradient
- 中心進行放射狀形狀，預設為 ellipse 橢圓，可指定為 circle 圓形。
- 可指定中心處位置，先水平後垂直，單位使用%或單字，例如`radial-gradient(circle at 20% 40%, red, blue)`
- 可指定顏色的漸變比例位置（全長之百分比）。

```css
html,
body {
  margin: 0;
  padding: 0;
}
body {
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(red, blue);
  /* background-image: radial-gradient(circle, red, blue); */
  /* background-image: radial-gradient(circle at 20% 40%, red, blue); */
}
```

### 多組漸層
因為漸層是圖片型態，可以利用多張透明色去累加得到互組效果。

```css
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
body {
  width: 100vw;
  height: 100vh;
  background-image: 
    linear-gradient(cyan, transparent),
    linear-gradient(225deg, magenta, transparent),
    linear-gradient(45deg, yellow, transparent);
}
```

### 文字漸層（背景）
主要是依賴`background-clip: text;`完成此效果，之前未介紹值`text`是因為還沒正式支援（只列入試用）。因此宣告需要特別加入`-webkit-`。

```html
<style>
  p {
    font-size: 10rem;
    background: linear-gradient(to left top, blue, red);
    /* background: url('https://picsum.photos/1920/300/?random=1'); */
    
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni odio
  sapiente,
</p>
```

### 其他漸層效果

```css
body {
  background-image: radial-gradient(closest-side circle at 20% 40%,red,blue);
  /* background-image: radial-gradient(closest-corner circle at 20% 40%, red, blue); */
  /* background-image: radial-gradient(farthest-side circle at 20% 40%, red, blue); */
  /* background-image: radial-gradient(farthest-corner circle at 20% 40%, red, blue); */
  /* background: repeating-linear-gradient(black 0px, orange 5px, red 10px); */
  /* background: repeating-radial-gradient(black 0px, orange 5px, red 10px); */
}
```

## 小節練習 - Background
提供以下 HTML 與 CSS，請試著對 CSS 編寫做出結果畫面。

{% tabs demoBG，1 %}
<!-- tab 題目素材-->
```html TryCSS_cls2_background.html
<head>
<link rel="stylesheet" href="style.css">
</head>
<body>
  <table>
    <tr>
      <td class="a"></td>
      <td class="b"></td>
      <td class="c"></td>
    </tr>
    <tr>
      <td class="d"></td>
      <td class="e"></td>
      <td class="f"></td>
    </tr>
    <tr>
      <td class="g"></td>
      <td class="h"></td>
      <td class="i"></td>
    </tr>
  </table>
</body>
```
```css style.css
body {
  text-align: center;
}
table {
  margin: 1rem;
  display: inline-block;
}
table,
tr,
td {
  border: 1px solid #000;
}
table td {
  width: 200px;
  height: 200px;
}
```
<!-- endtab -->
<!-- tab 結果畫面-->
{% jsfiddle summer10920/2x965cyq result dark 100% 750 %}
<!-- endtab -->
<!-- tab 解答 -->
```css style.css
body {
  text-align: center;
}
table {
  margin: 1rem;
  display: inline-block;
}
table,
tr,
td {
  border: 1px solid #000;
}
table td {
  width: 200px;
  height: 200px;
}

.a {
  background-color: crimson;
}

.b {
  background: url("https://picsum.photos/50/50/?random=1") center/cover;
  /* background-size: cover; */
}
.c {
  background: url("https://picsum.photos/50/50/?random=1") repeat-x;
  /* background-repeat: repeat-x; */
}
.d {
  background: url("https://picsum.photos/50/50/?random=1") repeat-y;
  /* background-repeat: repeat-y; */
}
.e {
  background: url("https://picsum.photos/50/50/?random=1") no-repeat center center;
  /* background-repeat: no-repeat; */
  /* background-position: center center; */
}
.f {
  background: url("https://picsum.photos/50/50/?random=1") no-repeat center center #ffa;
  /* background-repeat: no-repeat; */
  /* background-position: center center; */
  /* background-color: #ffa; */
}
.g {
  background: 
    url("https://picsum.photos/200/50/?random=1") no-repeat left top,
    url("https://picsum.photos/200/102/?random=1") no-repeat 0 50px,
    url("https://picsum.photos/200/50/?random=1") no-repeat left bottom;
  /*  
  background:
    url("https://picsum.photos/200/50/?random=1"),
    url("https://picsum.photos/200/102/?random=1"),
    url("https://picsum.photos/200/50/?random=1");
  background-position: left top, 0 50px, left bottom;
  background-repeat: no-repeat, no-repeat, no-repeat;
  */
}
.h {
  background: linear-gradient(to right, black, blue);
}
.i {
  background: radial-gradient(black, white);
}
```
<!-- endtab -->
{% endtabs %}

## 清單 - List
主項有 ul 跟 ol 兩種常見寫法（另外還有少見的 dl)，雖可透過 list-style-type 擬態其他類型但無法編入 start。
- ul: 符號清單，預設「●」。
- ol: 編號清單，預設「阿拉伯數字」，可使用 HTML 屬性 start 控制從何開始編號。
- dl: 無符號清單，不常見。

### 符號修改
不論 UL 或 OL 都能透過 list-style-type 參數做修改符號或保有排序的效果，下列整理了許多常用到的項目符號參數。

| **list-style-type**  | **定義**                           |
| -------------------- | ---------------------------------- |
| none                 | 不顯示符號                         |
| disc                 | 實心圓形                           |
| circle               | 空心圓形                           |
| square               | 實心正方形                         |
| lower-alpha          | 小寫英文字母                       |
| upper-alpha          | 大寫英文字母                       |
| decimal              | 阿拉伯數字                         |
| decimal-leading-zero | 十進位制的阿拉伯數字，前方自動補零 |
| armenian             | 亞美尼亞語                         |
| lower-greek          | 希臘語                             |
| lower-roman          | 小寫羅馬數字                       |
| upper-roman          | 大寫羅馬數字                       |

```css
ul {
    list-style-type: square;
    /* 符號是在 li 之內部 (inside) 還是外部 (outside)，可試著對 li 增加 border 理解位置性*/
    list-style-position: outside;

    /*自訂圖示*/
    list-style-image: url('images/bullet.gif');
}
li{
   border:1px #cccccc solid;
}

```

縮寫方式

```css
ul {
    list-style: square inside url('images/bullet.gif');
}
```

### 用 list 做成 MENU 之訣竅
很常使用 ol/ul 清單做網站選單（水平），遵守以下要點設計：

- 清除 ul/ol 的預設的排列對齊 (margin/padding) 為 0
- li 指定為 inline/inline-block 使行內效果的水平排列
- li 內的 a 連結要設定 display 為 block/inline-block，確保內外間距能正常為區塊效果。
- 如果 li 的 display 為 inline/inline-block，可對 ul/ol 設定 text-align:center，使讓整個主選單水平置中。

```html
<style>
  body,ul{
    margin: 0;
    padding: 0;
  }
  ul {
    text-align: center;
    background: #3b2500;
  }
  li {
    display: inline-block;
    background: rebeccapurple;
  }
  a {
    display: inline-block;
    padding: 15px;
    color: white;
    text-decoration: none;
  }
</style>
<ul>
  <li><a href="#">關於我們</a></li>
  <li><a href="#">產品介紹</a></li>
  <li><a href="#">客戶案例</a></li>
  <li><a href="#">售後服務</a></li>
</ul>
```

### inline 排列而產生 4px 空隙問題
在 inline 環境下要並排多個 inline 行內元素會有不明的空白間距約 4px。前面的水平 menu 舉例來說，若對 li 添加背景色能發現間距上的問題。這是因為在 li 元素當中因為有看不見的文字（斷行符號）卡在那裏佔用了位置，這現象只在 inline 時發生。

消除的方式有多種：

#### 調整 HTML 結構
使瀏覽器解讀時無法偵測到斷行符號，直接讀取出結束標籤
```html
<ul>
  <li><a href="#">關於我們</a></li
  ><li><a href="#">產品介紹</a></li
  ><li><a href="#">客戶案例</a></li
  ><li><a href="#">售後服務</a></li>
</ul>
```
或
```html
<ul>
  <li><a href="#">關於我們</a></li><li><a href="#">產品介紹</a></li><li><a href="#">客戶案例</a></li><li><a href="#">售後服務</a></li>
</ul>
```

#### margin 消除
設定 margin 為-4px 使肉眼畫面消除空白，但實際上不是真正消除空白且無法歸零
```css
li {
  margin-right: -4px;
  display: inline-block;
  background: rebeccapurple;
}
```

#### 消除透明呈現尺寸
設置父元素 ul 字體為 0，再初始化 li 的 font-size。讓斷行符號沒有尺寸就不會占用，而 li 設定的 font-size 只會給內容元素使用。
```css
ul {
  font-size: 0;
  text-align: center;
  background: #3b2500;
}
li {
  font-size: 1rem;
  display: inline-block;
  background: rebeccapurple;
}
```

#### 捨棄 inline-block
父元素擺脫 block 元素改用排版用的元素，使得內容不去偵測斷行符號。譬如使用 display:table（或另選 flex 模式），使子元素會採用一種擬態表格的排版方式呈現橫向與縱向排列。
```css
ul {
  display: table;
  width: 100vw;
  text-align: center;
  background: #3b2500;
}
```

{% note warning %}
**科普知識：css 的擬態 table 屬性**
支援瀏覽器：IE8.0、Firefox、Safari、Chrome、Oprea
- display:table 等價 table 外觀
- display:table-row 等價 tr 外觀
- display:table-cell 等價 td ,th 外觀
{% endnote %}

## 表格 - Table
原本 HTML4 的 table 屬性有原本一些外觀效果，而在 HTML5 大多都取消了（像是 align, bgcolor, border, cellpadding, cellspacing, frame, rules, summary, and width)，就是希望你一律透過 CSS 來控制 table 外觀。

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
```html
<table>
  <tr class="odd">
    <td>lorem</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>lorem</td>
    <td>lorem</td>
    <td>lorem</td>
  </tr>
  <tr class="odd">
    <td>lorem</td>
    <td>lorem</td>
    <td>lorem</td>
  </tr>
  <tr>
    <td>lorem</td>
    <td>lorem</td>
    <td>lorem</td>
  </tr>
  <tr class="odd">
    <td>lorem</td>
    <td>lorem</td>
    <td>lorem</td>
  </tr>
</table>
```

{% endnote %}
大多數觀念都是 box 模型去套用在 table,th,td 身上。

```css
table {
  /*item-align*/
  text-align: center;

  /*border 間距*/
  border-spacing: 10px;

  /*是否隱藏空欄位*/
  empty-cells: hide;
  
  /* 控制是否將表格的邊框合併 (0 間距），此效果與 border-spacing 跟 empty-cells 所排斥。 */
  border-collapse: collapse;

  /*外陰影效果*/
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
}

td {
  border: 1px solid #000;
  padding: 1rem;
  width: 100px;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3);
}

/* table 這範例同時做到了 class 選擇器的特性，相同元素但需要不同外觀時及重複使用 */
tr.odd {
  background: rgb(150, 202, 226);
}

tr:hover {
  background: rgb(207, 207, 207);
}
```

{% note info %}
**小技巧：雙色表格可善用關係偽類**
這個範例中是使用 class.odd 去設計雙色，更快的方法其實可以透過關係偽類去控制偶數項目為異色。
```css
tr:nth-of-type(odd) {
  background: #777;
}
```
{% endnote %}

{% note warning %}
**科普知識：加快 table 載入速度**
HTML 載入過程中遇到 table 時，預設情況下都需要先掃過所有 td 內容算出空間分配適應才能規劃 table 應該生成多少總寬，這會花掉一些時間效能。如果你已經指定了 table 總寬，其實不需要瀏覽器幫你計算 table 生成寬度。可以透過以下屬性靜用生成總寬。（前提你一定自己手動設定 table 總寬度）

```css
table{
  width: 500px;
  table-layout: fixed;
}
```
現在大部分的人不會特別設定這個了，因為現在瀏覽器的速度已夠聰明且夠快。
{% endnote %}