---
title: "[基礎課程] CSS 教學（一）：觀念與選擇器"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-06 15:55:32
---

![](https://i.imgur.com/lElmG8a.png)

CSS 的課程教材一共分為五篇章節文章介紹，都是基礎的從零開始的課程並跟隨 CSS3 的觀念技巧，完全沒學過的人可以跟著學習，曾碰過 CSS 的人也可以跳著章節選擇性參考。CSS 是很基本的技術一定要會，任何的排版與外觀技巧都是透過 CSS 完成。學會 CSS 能幫助你在任何 Web 平台（部落格、套版、框架主題、架站包…等等）上做輕度的視覺修改，更厲害的人可以進入設計師領域。

<!-- more -->

# CSS 的基礎觀念
CSS 是一種針對 HTML 標籤在實體具現化之後的外觀調整工作，現在以 CSS3 為主技術。之前 HTML 有提到，每個 HTML 標籤視為盒子 (Box) 模式且區分區塊、行內兩種模式。CSS 需要額外編寫並宣告與 HTML 的選擇關係，這樣瀏覽器才會知道哪個標籤該用怎樣的 CSS 外觀。

{% note success %}
**跟著做**
使用 chrome 瀏覽器，隨意找個網站按下 <kbd>F12</kbd> ，滑鼠隨意點選 <kbd>Elements</kbd> 分籤內的任何 body 內之標籤，接著旁側的 <kbd>Style</kbd> 分籤就是該標籤的外觀樣式 (CSS Style)。
{% endnote %}

## CSS 的寫法方式
與 HTML 不同，屬性與值在兩者是不一樣的描述參數，且 CSS 屬性與值採用複數進行疊加效果，彼此用分號`;`錯開。而選擇器的填寫名稱，可以是標籤 tagname、類別 class、ID，進階複合或擴展到層級、偽元素、相對位置、屬性…等多選擇。

- HTML：
  `<標籤名稱 屬性 A="值" 屬性 B="值">TEXT</標籤名稱>`
- CSS：
  `選擇器 {屬性 A: 值；屬性 B: 值}`

{% note primary %}
  **素材準備：準備好以下代碼** 
  ```html cssTry.html
  <!DOCTYPE html>
  <html>

  <head>
    <meta charset="UTF-8">
    <title>CSS Try!!</title>
    <style>
      <!-- 等等在這裡編寫 -->
    </style>
  </head>

  <body>
    <h1>Lorem ipsum dolor sit amet.</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa illum sit dicta, similique dolorum, maiores harum
      molestiae animi, non quas iusto. Cum voluptates magni harum, maiores veniam obcaecati consequuntur nam aspernatur
      incidunt aliquid atque quis dolorum enim non dolore a error quae voluptatem nulla numquam dolores natus illo sed
      nesciunt.
    </p>
  </body>

  </html>
  ```
{% endnote %}

試著在素材上面的 style 區域內進行 CSS 設定，跟著敲打下面三種不同的代碼所得到的效果為何。

- **簡單的寫法**
```css cssTry.html
h1 {
  color: red;
}
```
- **多屬性指定**
```css cssTry.html
h1 {
  color: white;
  background-color: black;
  font-size: 30px;
}
```
- **多項選擇**
```css cssTry.html
h1,
p {
  color: #ffffff;
  background-color: #000000;
  font-size: 30px;
}
```

## CSS 的宣告位置
一共分為 4 種 CSS 宣告位置，**可重複宣告**相同選擇標籤在不同的宣告位置或屬性，但 CSS 單屬性只會依優先權擇一執行。優先權為固定的，將根據離標籤近且明確性描述強烈的為高優先。

### 行內樣式 (Inline Style)
最簡單的方式就是直接在該標籤內寫上 style 屬性，這是最浪費資源的寫法且無法重新被其他網頁之標籤元素使用。同時具備最高優先權（由於指定在單一標籤內且夠近，會比頁首內嵌、外部連結的樣式表來的強烈。)
```html cssTry.html
<p style="color:red">Lorem ipsum dolor sit amet.</p>
```

### 頁首宣告 (Embedded Style)
宣告本網頁使用的樣式表寫在 `<head></head>`裡（建議可於`<script></script>` JS 執行之前），但同理無法被其他網頁的標籤元素使用，只能在本頁有效。
```html cssTry.html
<head>
  <style>
  p {
    color: red;
  }
  </style>
</head>
```

### 外部連結 (External Style)
與前者位置相同，但將 CSS 樣式表以副檔名為`.css`文件存放在別處，透過 link 連結方式載入執行。好處可以同一份 css 文件進行多網頁共用且易於集中管理修改。
```html cssTry.html
<head>
  <link rel="stylesheet" href="style.css" />
</head>
```

### 匯入樣式 (Import)
跟前者相同的用法，其次特點差別在於在 CSS 文件當中，也可以`@import`其他的 CSS 檔案匯入成為本體一部分。也就是可以將 CSS 分成多段做更多規劃技巧。
```html cssTry.html
<style>
  /*兩種寫法皆可*/
  @import url("fineprint.css");
  @import 'custom.css';
</style>
```

{% note warning %}
  **科普知識：link 與 import 差別**
  link 屬於 HTML 語法因此為標籤元素，link 元素除了 CSS 文件也可以連結其他類型檔案例如 RSS …等；import 是 CSS 語法因此不是 tag 標籤，等同將分散的 CSS 文件透過匯入 import 成一份 CSS 文件。

  此外 link 因為是 tag，故可透過 JS 的 DOM 規範去控制，反之@import 是無法受 JS 控制（根本不是 HTML 結構）。
{% endnote %}

{% note danger %}
  **新手陷阱：@import 放置於開頭處**
  使用@import 時必需放正式撰寫 css 之前的第一行，否則會載入失敗。
{% endnote %}

## 初學的屬性：Color
為了教學方便，這裡我們挑選簡單的 color 作為第一個學習 CSS 屬性，下達指令針對該標籤進行顏色變化，顏色的值有多種表示方法。方便我們做選擇器的練習

```css inherit.html
.demo {
  /*顏色名稱*/
  color: red; 

  /*HEX 色碼*/
  color: #ff0000; 

  /*RGB 與 alpha*/
  color: rgb(255, 0, 0); 
  color: rgba(255, 0, 0, 0.5);

  /*hsla（色相角度，飽和度，亮度，透明度）*/
  color: hsl(0, 100%, 50%);
  color: hsla(0, 100%, 50%, 1);
}
```

### 練習
- 隨意自行設定標籤與文字內容，接著使用三種可寫入 CSS 的方式，修改標籤文字顏色。
- 文字顏色需用到 顏色名稱、HEX 色碼、rgb。
```html cssTry.html
<head>
  <meta charset="UTF-8">
  <title>CSS Try!!</title>
  <style>
    p {
      color: #f524f2;
    }
  </style>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h1 style="color:red">行內樣式的紅色</h1>
  <p>頁首<span>宣告</span>的紫色</p>
</body>
```
```css style.css
span{
  color:rgb(0, 17, 255);
}
```

# 選擇器
CSS 有許多種選擇器可以鎖定目標修改該目標的樣式，常用的選擇器有`tag`、`id`、`class`、`複合子`。

{% note danger %}
  **新手陷阱：CSS 的優先權**
  是根據離標籤越近且明確性描述較高者為優先，大致規則如下，細部隨後續過程來探討：
  （高優先）style(!important)＞ID＞Class＞Elements 元素（低優先）
{% endnote %}

## Tag、Class、ID
最基礎用途的方式就是直接指定 tag name（大範圍）、class name（複數範圍）、id name（單一範圍）。通常這層級的寫法都影響優先的程度很大。

### 元素（標籤）選擇 （Type Selector）
簡單直接大範圍的指定這類型標籤都吃這個選擇，但優先權非常低很容易被其他選擇器搶走。
```css cssSelector.html
h1 {
    color: red;
}
```
> 常使用在全站的初始化設定，因為優先權很低不影響後期的二工調整，例如使用`body{}`來規劃全站主色或是文字尺寸。

###  類別選擇 （Class Selector）
- 使用 class 方式可以重複使用，任何指定同個 class 名稱的不同標籤都共用。
- 利用優先權效果，可以指定不同 class 錯開位置，得到不同外觀。
- 寫法會用`.`逗點做為開頭。
- 類別名稱只允許使用英文、數字、連字`-`符號和底線`_`符號。
- 句點後的名稱必須以英文開始。
- Class、ID 的名稱有大小寫區分。
- 一個 Tag 可以允許擁有多個 class 產生更豐富的樣式。

```html cssSelector.html
<style>
  .a {
    color: red;
  }
  .b {
    color: blue;
  }
  .menu{
    color:orange;
  }
</style>

<!-- 相同元素但需要不同外觀時 -->
<ul class="menu">
  <li>Lorem, ipsum dolor.</li>
  <li class="a">Lorem, ipsum dolor.</li>
  <li>Lorem, ipsum dolor.</li>
</ul>

<!-- 重複使用 -->
<h1 class="b">Lorem</h1>
<p><span class="b">Lorem</span> ipsum dolor sit amet.</p>
```

### ID 選擇 (ID Selector)
- 向身分證一樣，同 HTML 文件只能有一個 ID 名稱不重複，通常用來命名為一個有動機的網頁區塊。
- 雖說 id 唯一，還是硬要重複也可以（非標準作法）但不妥當，因為在腳本 (JS) 控制上常使用 id 作 DOM 對象，對 JS 來說，id 必須唯一可識別的，若相同 id 會讓 JS 只認同第一組 id 為目標。
- 寫法會用`#`逗點做為開頭。
- 一般來說 CSS 設計師會盡量避免使用 ID，盡可能使用 class，使 ID 節點單純給 html 的`link`的錨點連結，或是 JS 腳本的對象綁定使用。

## 複合子選擇
複合選擇器，指的是選擇的條件變多了，需要符合多個以上的條件指定。

### 子孫選擇
- 後代選擇 `X Y`（Descendant Selector）
- 子代選擇 `X > Y`（Child Selector）

```html cssSelector.html
<style>
  nav p {
    color: blue;
  }
  nav > p {
    color: red;
  }
</style>
<nav>
  <p>Lorem ipsum dolor sit amet.</p>
  <div>
    <p>Lorem ipsum dolor sit amet.</p>
    <div>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  </div>
</nav>
```

### 相鄰選擇 `X + Y`（Adjacent Selector）
稱為相鄰兄弟（單選）。 它僅僅會選擇剛好在 X 元素之後的 Y 元素。

```html cssSelector.html
<style>
  h1 + p {
    color: blue;
  }
</style>
<h1>Lorem, ipsum dolor.</h1>
<p>Lorem ipsum dolor sit amet.</p> <!--blue-->
<p>Lorem ipsum dolor sit amet.</p>
```

### 相鄰群選擇 `X ~ Y`
稱為相鄰兄弟群（多選）。 它僅僅會選擇剛好在 X 元素之後的同層 Y 元素。

```html
<style>
  /* h2 之後的同層 p 都會被選擇 */
  h2 ~ p {
    color: blue;
  }
</style>
<h1>Lorem, ipsum dolor.</h1>
<p>Lorem ipsum dolor sit amet.</p>

<h2>Lorem, ipsum dolor.</h2>
<p>Lorem ipsum dolor sit amet.</p><!--blue-->

<h3>Lorem ipsum dolor sit amet.</h3>
<p>Lorem ipsum dolor sit amet.</p><!--blue-->

<div>
  <p>Lorem ipsum dolor sit amet.</p>
</div>
```

### 屬性選擇 `X[title]`
從 tag 的屬性進行選擇，也能根據屬性值做條件上的滿足。

- `X[Y]` : X 持有屬性 Y 之對象
- `X[Y="Z"]` :X 持有屬性 Y 之對象，且 Y 的值為 Z
- `X[Y^="Z"]` :X 持有屬性 Y 之對象，且 Y 的值為 Z 開頭
- `X[Y$="Z"]` :X 持有屬性 Y 之對象，且 Y 的值為 Z 結尾
- `X[Y*="Z"]` :X 持有屬性 Y 之對象，且 Y 的值為包含 Z
- `X[Y~="Z"]` :X 持有屬性 Y 之對象，且 Y 的值包含單詞 Z

```html
<style>
  /* 選取 img 標籤屬性為 title 的目標 */
  img[title] {
    width: 300px;
  }

  /* 選取屬性 type='text' 的目標 */
  input[type="text"] {
    color: blue;
  }

  a[href="http://google.com.tw"] {
    color: red;
  }

  /* 選取 href 的屬性值開頭為 http:// 的對象  */
  a[href^="http://"] {
    font-size: 2em;
  }

  /* 選取 href 的屬性值結尾為 .pdf 的對象  */
  a[href$=".pdf"] {
    display: none;
  }

  /* 選取 img 所有 src 屬性值裡面包含單字 2019 的對象；*/
  img[src*="2019"] {
    display: none;
  }
</style>

<img title="left" src="https://fakeimg.pl/150x150/" />
<img src="https://fakeimg.pl/150x150/" />
<br />
<a href="http://google.com.tw">Google</a>
<a href="http://yahoo.com.tw">Yahoo</a>
<br />
<input type="text" value="text" />
<input type="number" value="1234" />
```

## 偽類別
偽類別選擇 (Pseudo Classes Selector)，部分的標籤會提供其他特殊情況下的條件，稱呼為偽類別並使用冒號 `:` 表示，下列舉例來說：

{% blockquote w3schools https://www.w3schools.com/css/css_pseudo_classes.asp %}
不少元素都持有各自的偽類別，總類繁多請參考官方
{% endblockquote %}

### 連結偽類
```css
a{text-decoration: none;}
a:link { color: red;} /*連結提示*/
a:visited { color: green;} /*已拜訪過過*/
a:hover { color: orange;} /*滑過*/
a:active { color: purple;} /*按下瞬間*/
```

{% note danger %}
**常見陷阱：偽類可能是一個組合情況**
如果要全指定 link4 個偽類，必須要按照 LvHa 原則來排否則效果可能會被覆蓋錯亂。舉例來說`:link`放在最後那麼所有的效果都會是`:link`（所覆蓋）。
{% endnote %}

### 否定選擇 `:not(selector)`
偽類別的一種，如果你需要某選擇 X 範圍排除某選擇 Y。可以這樣使用

```css
/*所有的 div 都選中，但排除持有 class=odd 的對象*/
div:not(.odd) {
   color: blue;
}
```

### 關係偽類
原則上就是找這群人之中的兄弟關係之對象。可分兩派：`nth-child`主要是該父級下的所有子元素之位置；`nth-of-type`是等於找兄弟之間同標籤之位置。前後差別是用 child 還是以 type 來計算。舉例：

```html
<style>
  p:nth-child(3) { /* 範圍為所有 child，該 p 是否該範圍內排序第 3 */
    background: red;
  }

  p:nth-of-type(3) { /* 範圍為所有 child 且 同 type，該 p 是否該範圍內排序第 3 */
    background: green;
  }
</style>

<h3>hhh</h3>
<p>ppp</p>
<p>ppp</p><!--red-->
<p>ppp</p><!--green-->

<div>
  <p>ppp</p>
  <h3>hhh</h3>
  <p>ppp</p><!--red-->
  <h3>hhh</h3>
  <p>ppp</p><!--green-->
</div>
```

| 選擇器                | 說明                                                            |
| --------------------- | --------------------------------------------------------------- |
| p:nth-child(3)        | 找到 p 是某父級之所有 child 範圍內，第 3 個（索引最小為 1)      |
| p:nth-child(3n+1)     | 找到 p 是某父級之所有 child 範圍內，第 1,4,7…個                 |
| p:nth-child(3n)       | 找到 p 是某父級之所有 child 範圍內，第 3,6,9…個                 |
| p:nth-child(-n+3)     | 找到 p 是某父級之所有 child 範圍內，第 1,2,3 個                 |
| p:nth-child(odd)      | 找到 p 是某父級之所有 child 範圍內，第單數個 (1,3.5…) 等價 2n+1 |
| --------------------- | ------------------------------------------------------          |
| p:nth-of-type(3)      | 找到這些 p 的父級之第 3 個兒子`p`。（索引最小為 1)              |
| p:nth-of-type(3n+1)   | 找到這些 p 的父級之第 1,4,7…兒子`p`。                           |
| p:nth-of-type(3n)     | 找到這些 p 的父級之第 3,6,9…兒子`p`。                           |
| p:nth-of-type(odd)    | 找到這些 p 的父級之偶數兒子`p`。                                |
| p:nth-last-of-type(3) | 找到這些 p 的父級之倒數第 3 個兒子`p`。（索引最小為 1)          |

| 選擇器              | 說明                                                          |
| ------------------- | ------------------------------------------------------------- |
| p:first-child       | 找到 p，且需符合為某父級下之第 1 個兒子（大哥）。             |
| p:last-child        | 找到 p，且需符合為某父級之最後個兒子（老么）。                |
| p:nth-last-child(3) | 找到 p，且需符合為某父級之倒數第 3 個兒子`p`。（索引最小為 1) |

>last-child 與 nth-last-child 練習部分，如果是直接寫在 body 內且使用 vscode 的 live server，因為 body 最後被偷多添加了`<script>`標籤，所以需特別注意。

{% note danger %}
  **新手陷阱：*-child 容易順序被異動影響**
  套用在設計上，大多數老手會避免使用`*-child`來避免因變動添加其他總類元素影響預期之順序。
{% endnote %}

```css
div p:first-child {
  background: #aaa;
}
/*在製作 ul 橫向選單，左邊框的線可以用此處理*/

div p:last-child {
  background: #aaa;
}
/*在製作 ul 橫向選單，右邊框的線可以用此處理*/

/* 奇數圖片往左，偶數圖片往右 */
img:nth-of-type(odd) {
  float: left;
}
img:nth-of-type(even) {
  float: right;
}

/* 從第二個開始選取每個 div 類型的目標 */
div:nth-of-type(1n + 2) {
  margin-left: 20px;
}

/* 所有 li 項目，但排除前 3 個*/
li:not(:nth-child(-n + 3)) {
  display: none;
}
```

## 偽元素
W3C 定義裡就只有五個，跟偽類不同這裡使用兩個冒號`::`開頭，而偽類使用一個冒號`:`開頭。請 [參考 W3SCHOOL](https://www.w3schools.com/css/css_pseudo_elements.asp)！

{% note danger %}
**新手陷阱：偽元素請習慣用兩個`::`**
雖然，瀏覽器寫一個冒號也可以正常判斷運作唯獨`::selection`必須是兩個冒號才能正常運作，不過為了區分用兩個冒號為宜。
{% endnote %}

### ::before 與 ::after
before 與 after 兩者都是以 `display:inline-block` 的屬性存在，`::before` 是在原本的元素`區塊的內容`「之前」加入內容，`::after` 是在原本的元素區塊的內容「之後」加入內容，兩者會繼承原本元素區塊的屬性。

content 屬性係`::before` 與 `::after` 必須具備的屬性，就算只有 `content:"";` 都可以，因為沒有 content 的偽元素是不會出現在畫面上，

```html
<style>
  div::before, div::after {
    content: "WOW!";
    background-color: yellow;
    padding: 0 1rem;
    margin: 0 1rem;
  }
  div {
    display: inline-block;
    background: green;
    padding: 0 1rem;
  }
</style>
<div>Lorem, ipsum dolor.</div>
```

content 是很特別的屬性，它可以使用 attr 直接獲取內容元素的屬性值（attribute）並顯示。使用下列程式碼用法，將會把超連結的 href 內容與 title 內容，透過偽元素一前一後的顯示出來。

```html
<style>
  a::before {
    content: attr(href);
    color: red;
  }
  a::after {
    content: attr(title);
    color: blue;
  }
  a {
    color: pink;
    text-decoration: none;
  }
</style>
<a href="http:www.google.com" title="My Title">google</a>
```

content 內容是可以「相加」的，直接用一個<kbd>Space</kbd>就可以不斷的累加下去，以下面的程式碼來說，可以在 content 值用雙引號添加文字。

```css
a::before {
  content: "<" attr(href) ">";
  color: red;
}
a::after {
  content: "<" attr(title) ">";
  color: blue;
}
```

也可以塞入圖片

```css
a::before{
  content:url（圖片網址） url（圖片網址） url（圖片網址）;
}
```

{% note danger %}
**新手陷阱：置換元素沒有偽元素**
比如 `<img>`, `<input>`, `<iframe>`，這幾個標籤是不支持類似 img::before 這樣使用。前面說的偽元素相當於在元素內部額外提供假的標籤元素，但 input, img, iframe…等這類置換元素都沒有內容物而是透過屬性得到定義物，所以不能通過偽元素插入到內容的前後。
{% endnote %}

### ::first-letter 與 ::first-line

```css
/* 第一個字母 */
.wrapper:first-letter {
    font-size: 3em;
}

/*第一行*/
.wrapper:first-line {
    font-size: 3rem;
}
```

### ::selection
就只是提供文字選取的效果

```css
::selection{
  color:yellow;
  background:#543;
}
```

# CSS 的繼承與優先權
每個屬性都有個值叫做`inherit`（繼承）或`unset`（未指定），代表請從父級那裏去繼承取得，通常不會特別寫出來（預設值就是繼承父級），但優先問題所以有以下範例：

```html inherit.html
<style>
  .this {
    color: red;
    border: 1px solid #000;
  }
  div .this {
    color: inherit;
  }
</style>
<div style="color:blue">
    Lorem ipsum <span class="this">dolor</span> sit amet.
</div>
```
透過 Chrome <kbd>F12</kbd> 對`span`檢查，可以得到以下三組 color 指定。

A. `div .this{}`的`color: inherit`
B. `.this{}`的`color: red`
C. 父級 DIV`Style Attribute`的`color: blue`

但`span`優先權討論為：

- A 的優先最高！因為 A 選擇器吃到兩個選擇描述；比起 B 只有一個 class 還強烈；至於 C 是父級繼承來的沒有描述指向到 span ，因此 C 相對弱又遠。
- A 的 color 為`inherit`所以去吃父級的設定，因此前看父層級`div`查詢顏色為何。
- `div`的顏色為 blue，所以 A 的顏色同等於父層級的顏色。