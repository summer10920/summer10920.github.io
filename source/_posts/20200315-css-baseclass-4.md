---
title: "[基礎課程] CSS 教學（四）：浮動、佈局、Flex"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-15 14:23:57
---

![](assets/images/lElmG8a.png)

本篇進入跟版面調整有關的技巧章節，Float 是很常見的浮動觀念，接著佈局章節會提供一些例子進行設計，最後是非常重要且主流的 flexbox 觀念。也就是網頁排版的重點都包含在這篇文章了。另外其實還有 Grid 跟 RWD 部分將之後由 Bootstrap 去深入學習。

<!-- more -->

# 浮動 float
float 參數會讓元素產生一種浮動行為，而這個行為會變成 block 性質並緊貼在指定處（像磁鐵一樣）。

1. 在設定 float 前需先考慮標籤的排列順序，因為受到 float 屬性的標籤會影響到彼此之間的預設位置。
2. 在設定某個標籤 float 時，需指定標籤寬度（否則將以內容為寬值），可以是絕對單位 (px)、相對單位 (em、rem)、比例單位 (%)。
3. 瀏覽器會將受浮動屬性效果的行內元素視同等於`區塊 block 元素`。
4. Float 可做文繞圖但有原始順序限制，也就是撰寫 HTML 的順序。
5. 用來排版浮動區塊等級元素時，要設定該元素的 width 屬性（圖片不需要，已具備寬），這點排版很重要。
6. 一般浮動用在文繞圖、二欄、三欄、選單。
7. 停止浮動 clear:both。

```html
  <style>
    .container {
      width: 300px;
      margin: auto;
    }

    img {
      float: right;
    }

    span {
      float: left;
      color: red;
      height: 100px;
      width: 100px;
      background: #777;
      /*span 原本是 inline，設定 float 會變成 block*/
    }
  </style>
  <div class="container">
    <h1>Lorem ipsum dolor sit amet.</h1>
    <img src="https://picsum.photos/100/100/?random=1" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi asperiores praesentium recusandae dolorem
      reiciendis ipsum accusamus, dignissimos necessitatibus, sint corrupti cupiditate quibusdam minus quasi aut vel
      voluptatum harum velit pariatur. AAA<span>Ut molestias</span>AAA non accusantium rerum alias aliquid exercitationem laudantium!
      Expedita quae at laborum provident magni ut, velit hic, perspiciatis facere voluptatibus modi! Consequatur id
      provident, dignissimos ab repudiandae placeat dolorem.
    </p>
  </div>
```

## 影響父容器的高度消失
float 本身會脫離父層內的文字流，若父元素沒有高度也沒有其他東西能撐出高度時，這意謂著現在裡面的子元素都是 float。因為脫離了文字流（抓不到 float 子元素）影響父元素而失去了高度，這點透過父元素設定 border 看出問題。

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習**
1. 父層 container 為 960，均分給 3 組 col 並規劃子設定 w300, p10, m10, b5，利用 box-sizing 使排列剛好滿版。
2. 搞定滿版之後，指定 col 為 float 並觀察 container 的變化合理性，並試著排除。

```html floatTry.html
<style>
  * {
    margin: 0;
    padding: 0;
  }

  .container {
    width: 960px;
    margin: 0 auto;
    border: 1px solid #000;
  }

  .col {
    box-sizing: border-box;
    border: 5px outset #fa0;
    width: 300px;
    padding: 10px;
    margin: 10px;
    float: left;
  }

  .colorbox{
    border: 1px solid #000;
    width:960px;
    height:50px;
    margin:0 auto;
    background: yellowgreen;
  }
</style>

<div class="container">
  <div class="col">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laboriosam
    modi fugiat dolore, distinctio minus ducimus aliquid ratione. Nulla quis
    cupiditate voluptas pariatur eaque atque laudantium necessitatibus ut
    autem. Sit!Lorem
  </div>
  <div class="col">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laboriosam
    modi fugiat dolore, distinctio minus ducimus aliquid ratione. Nulla quis
    cupiditate voluptas pariatur eaque atque laudantium necessitatibus ut
    autem. Sit!Lorem
  </div>
  <div class="col">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laboriosam
    modi fugiat dolore, distinctio minus ducimus aliquid ratione. Nulla quis
    cupiditate voluptas pariatur eaque atque laudantium necessitatibus ut
    autem. Sit!Lorem
  </div>
</div>
<div class="colorbox"></div>
```
{% endnote %}

### 方法一：父容器設定 overflow
此時只要對父元素設定 overflow:hidden(or auto) 使錯亂溢位的情況重新修正空間，強迫將父元素再次將 float 子元素算入高度。

多添加以下屬性：
```css
  .container {
    overflow: hidden;
  }
```

### 方法二： 關閉 float
由於 float 會持續運作剩餘浮動空間給之後的浮動元素，因此可以塞入一個區塊同時要求屬性為 clear:{left|right|both}進行關閉浮動的空間分配。

本範例中可以在最後的`.col`之下一個標籤添加：
```html
  <div class="col">...</div>
  <div style="clear:both"></div>
</div>
```

此時因為該屬性 clear 關閉了浮動同時也配給出空間，父容器也能算出整體的自身內容高度。

{% note info %}
**小技巧**：設計 class 規則並善用`::after`
有時候你不會想對 HTML 添加多餘的元素，我們會習慣設計一個 class 公式能夠對父容器有效（拉回父容器高度），也能對排在後面非浮動之元素有效（不用寫 style 的 clear)。
```css
.clearfix::before,.clearfix::after{
  content:"";
  display: block;
  clear:both;
}
```
如案例中：若要修正父容器 `div.container.clearfix`；若要設定非浮動元素 `div.clearfix`。

{% endnote %}

# 排版布局 layout
這裡將著重如何將區塊進行畫面排版的方式與技巧。

## 兩欄式
將畫面為兩個區塊並排成兩欄位，共以下多種狀況與不同處理作法。

### 左側 A {float:left} 與 右側 B {margin-left}
1. 分配 AB 區塊的固定寬度。
2. 將 A 區塊進行 float 靠左側浮起來，此時 B 區塊仍在原處。但因為文繞凸效果所以文字被擠壓出來。
3. 將 B 區塊故意修正推回適合的新位置，達成兩個區塊不重疊，一個浮於上面一個右推定位。

```html
<style>
  .side {
    width: 20%;
    background: bisque;

    float: left;
  }
  .main {
    width: 80%;
    background: #aaa;

    margin-left: 20%;
  }
</style>
<div class="side">1</div>
<div class="main">2</div>
```

### 右側 A {float:right} 與 左側 B
1. 分配 AB 區塊的固定寬度。
2. 將 A 區塊進行 float 靠右側浮起來，此時 B 區塊仍在原處且剛好的寬度使畫面合理。

```html
<style>
  .side {
    width: 20%;
    background: bisque;

    float: right;
  }
  .main {
    width: 80%;
    background: #aaa;
  }
</style>
<div class="side">1</div>
<div class="main">2</div>
```

### 左側 A {float:left} 與 右側 B {float:left}
因為兩者都已形成浮動元素，第一個浮動元素依條件靠齊，而剩餘的浮動空間提供給下一個浮動元素貼齊，因此不會去考慮父容器 (body) 的空間分配。

```html
<style>
  .side {
    width: 20%;
    background: bisque;

    float: left;
  }
  .main {
    width: 80%;
    background: #aaa;

    float: left;
  }
</style>
<div class="side">1</div>
<div class="main">2</div>
```

### 左側 A {float:left} 與 右側 B {float:right}
同上，A 浮動靠齊左側後剩餘空間留給其他浮動元素使用。B 浮動依條件靠右使用，若空間不足則擠壓至下一行重新占用。

```html
<style>
  .side {
    width: 20%;
    background: bisque;

    float: left;
  }
  .main {
    width: 80%;
    background: #aaa;

    float: right;
  }
</style>
<div class="side">1</div>
<div class="main">2</div>
```

### 左側 A {float:left} 與 右側 B {overflow:auto|hidden}
A 浮動定位後，B 產生了溢位上的空間錯亂，設定 B autoflow:auto 修正因浮動所產生的溢位。

```html
<style>
  .side {
    width: 20%;
    background: bisque;
    float: left;
  }
  .main {
    width: 80%;
    background: #aaa;
    overflow: auto;
  }
</style>
<div class="side">1</div>
<div class="main">2</div>
```

## 三欄式
將畫面為三個區塊並排成三欄位，共以下多種狀況與不同處理作法。

### 左 A {float:left} & 中 C {margin:0 20%} & 右 B {float:right}
注意標籤排列順序，先是 float 的兩欄 sidebar1、sidebar2，接著才是 main，浮動欄位順序優先。

```html
<style>
  .side1 {
    width: 20%;
    background: bisque;
    float: left;
  }

  .side2 {
    width: 20%;
    background: bisque;
    float: right;
  }

  .main {
    width: 60%;
    background: #aaa;
    margin: 0 20%;
  }
</style>
<div class="side1">sidebar1</div>
<div class="side2">sidebar2</div>
<div class="main">main</div>
```

### 左 A {float:left} & 中 C {float}:left} & 右 B {float:right}
全部都使用浮動元素，靠齊方式略不同，須注意順序。

```html
<style>
  .side1 {
    width: 20%;
    background: bisque;
    float: left;
  }

  .main {
    width: 60%;
    background: #aaa;
    float: left;
  }

  .side2 {
    width: 20%;
    background: bisque;
    float: right;
  }
</style>
<div class="side1">sidebar1</div>
<div class="main">main</div>
<div class="side2">sidebar2</div>
```

### 左 A {float:left} & 中 C {float}:left} & 右 B {float:left}
全部都使用浮動元素，靠齊方式全為左側。

```html
<style>
  .side1 {
    width: 20%;
    background: bisque;
    float: left;
  }

  .main {
    width: 60%;
    background: #aaa;
    float: left;
  }

  .side2 {
    width: 20%;
    background: bisque;
    float: left;
  }
</style>
<div class="side1">sidebar1</div>
<div class="main">main</div>
<div class="side2">sidebar2</div>
```

## 小節練習 - Layout by Float
1. 設計一個 1024x768 的版面 container 且對齊 body 水平垂直置中，並包含以下四個區塊 header、left、right、footer。
2. 區塊顏色自由設計。
3. 字型需用微軟正黑體。
4. 文字需水平、垂直置中。

{% tabs float,1 %}
<!-- tab 初始素材-->
```html
<div class="container">
  <div class="header">Header</div>
  <div class="left">Left</div>
  <div class="right">Right</div>
  <div class="footer">Footer</div>
</div>
```
<!-- endtab -->
<!-- tab 預覽-->
{% jsfiddle summer10920/dj67rhsm result dark 100% 1024 %}
<!-- endtab -->
<!-- tab 解答-->
1. 先設計 .container 的外觀屬性，先跳過垂直水平置中的要求
2. 其中四個區塊設定 line-height 與 height 同高可以形成文字垂直居中的效果。
```css
.container{
  font-family: "Microsoft JhengHei";
  width: 1024px;
  height: 768px;
  border: 1px solid #000;
  color: white;
  font-size: 3rem;
  text-align: center;
}

.header {
  width: 1024px;
  height: 100px;
  background: #000;
  /* line-height: 100px; */
}
.left {
  width: 200px;
  height: 568px;
  background: #aaa;
  float: left;
  /* line-height: 568px; */
}
.right {
  width: 824px;
  height: 568px;
  background: #777;
  float: right;
  /* line-height: 568px; */
}
.footer {
  width: 1024px;
  height: 100px;
  background: #000;
  clear: both;
  /* line-height: 100px; */
}
```
3. 最後，垂直致中的`.container`有三種方法
```css
/* ver1:
    因為已經有寬高不如讓 margin 去自動算，但先用 fixed（或 absolute) 才能有絕對定位去抓邊界。
*/
.container{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

/* ver2:
    直接算出畫面中心點，但先用 fixed（或 absolute) 才能有絕對定位去抓邊界。
*/
.container{
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -512px;
  margin-top: -384px;
  /*
    也可以不要用 margin 去反退位置，改用
    transform: translate(-50%, -50%);
    會更快
  */
}

/* ver3:
    使用 flexbox，對父容器 body 設計
*/
body{
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
```
<!-- endtab -->
{% endtabs %}

# 彈性盒 FlexBox
1. 讓排版端喲端喲的彈性自動算。垂直對齊超簡單，Bootstrap CSS 框架也在用。
2. float 會讓外盒高度消失掉，flex 會讓外盒的高度保持設定。

| 屬性            | 單位           | 宣告在哪 | 說明效果                                                                            |
| --------------- | -------------- | -------- | ----------------------------------------------------------------------------------- |
| flex-direction  | row｜column    | 父容器   | 決定主軸的排列方式：<mark>橫向｜直向</mark>                                         |
| flex-wrap       | 選項           | 父容器   | 強制一行或依容器排成多行。                                                          |
| justify-content | 選項           | 父容器   | 主軸內容的水平對齊方式：<mark>靠左、靠右、置中、分散、平均、空間</mark>             |
| align-items     | 選項           | 父容器   | 交叉軸 (cross axis) 整體的縱向對齊方式：<mark>頂端、底部、填滿、基準線、中線</mark> |
| align-self      | 同 align-items | 子項目   | 設定單一元素的縱向對齊方式，會覆寫父層`align-items`的設定。                         |
| align-content   | 同 align-items | 父容器   | 在容器允許多行狀態（指定 flex-wrap:warp) 時，特別指定主軸的縱向對齊方式分配         |
| flex-grow       | 數字           | 子項目   | RWD 分配公式依膨脹倍數計算                                                          |
| flex-shrink     | 數字           | 子項目   | RWD 分配公式依收縮倍數計算                                                          |
| flex-basis      | 長度單位       | 子項目   | RWD 分配公式依彈性係數指定各多少                                                    |
| order           | 數字           | 子項目   | 控制排列順序，預設為 0。start 開始由小到大排序至 end                                |

>當父容器為`display: flex`（或`inline-flex`) 情況下，可進行以上設定（僅介紹到常用的屬性）。

## 前導觀念
Flexbox 是 CSS3 推出的盒子模型 ( box model ) 且具備靈活彈性 ( Flexible Box )，彈性盒是 CSS 裡很重要的觀念，當宣告一個標籤容器為彈性盒 flex （或 inline-flex) 時，該元素就成為彈性容器（flex container）。

而該容器內的子元素都會變成彈性項目 (flex item)，無論是區塊（block）或行內（inline）元素（不論是 p 或 span 都一樣，頂多像是 p 預設的 margin 值導致邊界範圍不同而異）。

彈性容器中的子項目可以自動適應寬度，就像`使用了百分比單位的元素`。值得注意的是如果子項目是清單（ul、ol），他的子元素 li 並不會變成彈性項目。

>宣告父容器 display:flex 時若同時有指定高度時，子項目也會以此高度為數據，這是因為 align-items 預設為 stretch 關係（充滿整個容器）。

### 主軸和交叉軸
與一般的盒子模型不同的地方，在於 Flexbox 的盒子模型具有：

- 水平（主）軸與垂直（交叉）軸 ( main axis、cross axis )
- 水平主軸部分有區分為：起點與終點 ( main start、main end )
- 垂直交叉軸部分有區分為：起點與終點 ( cross start、cross end )
- 子項目則有水平尺寸與垂直尺寸 ( main size、cross size )

這些都是相當重要的佈局規劃考量。 flexbox 全是靠主（水平）軸（main axis）和交叉（垂直）軸（cross axis）進行空間分配。

![Image](https://i.imgur.com/ZifNSdl.png)

### 父容器的預設值
新宣告一個 flex 容器時，其初始的預設值如下：
```css
.flex {
  /*  宣告為彈性容器 */
  display: flex;

  /* 彈性項目依據以此為高度，因為宣告容器後 align-items 預設 stretch 的關係，會拉長至該高度 */
  height: 600px;

  /*  以下是宣告彈性容器的預設值 */
  justify-content: flex-start;　/*主軸之對齊方式：靠左 (start 位置）*/
  align-items: stretch; /* 叉軸之對齊方式：填滿整個父容器*/
  flex-flow: row nowrap; /* 等同 flex-direction:row; flex-wrap:nowrap; */
  /*
    flex-direction:row  橫向發展
    flex-wrap:nowrap  當子項目的寬度總和超過父容器時，不拆行並自行彈縮
  */
}
```

### flex 與 inline-flex 差異
flex 本身算是一種 block 現象，未指定寬度時會塞滿寬度的現象；inline-flex 則是 inline-block 現象，可以接著後面排 inline 性質之元素。

```html
<style>
  .flex, .inline-flex {
    height: 400px;
    background: #ccc;
    border: 1px solid #333;
    /* width:800px; */
  }

  .flex {
    display: flex;
  }

  .item {
    width: 200px;
    height: 200px;
  }

  p.item {
    margin: 0;
  }

  .inline-flex {
    display: inline-flex;
  }

  .red {background: red;}
  .blue {background: blue;}
  .green {background: green;}
</style>
<strong class="flex">
  <p class="item red"></p>
  <span class="item blue"></span>
  <p class="item green"></p>
</strong>
<div class="inline-flex">
  <div class="item red"></div>
  <div class="item blue"></div>
  <div class="item green"></div>
</div>
<h1 style="display:inline">[inline box]</h1>
<h1 style="display:inline-block">[inline-block box]</h1>
```

### 範例：flexbox's menu
將標籤 nav 設定為 display:flex 後就成為了彈性盒之父容器，所有子元素也都成為彈性項目，本身 a 元素的特性仍然不變，但從呈現的角度上已變成彈性項目且不再是行內（inline），因此也不會發生經典的 4px 空白空隙問題。

```html
<style>
  nav {
    display: flex;
    border-bottom: 1px solid #ccc;
  }

  a {
    margin: 0 5px;
    padding: 5px 15px;
    background-color: #da0;
    border-radius: 3px 3px 0 0;
    text-decoration: none;
    color: white;
  }

  a:hover {
    background-color: #fc2;
    color: black;
    
  }
</style>
<nav>
  <a href="#">我是連結</a><a href="#">我是連結</a><a href="#">我是連結</a>
</nav>
```

## 父屬性複合 flex-flow (flex-direction, flex-wrap)
flex 的流向設定，為同時設定 flex-direction 與 flex-wrap 的複合屬性，主要是定義容器內項目的排列方向與換行規則。

> `flex-flow: flex-direction flex-wrap;`，為複合屬性，一次縮寫兩筆屬性。

### flex-direction
設定主軸的排列方式採用水平或垂直排列。row 彈性項目逐一`水平排列`，column 彈性項目逐一`垂直排列`，多了-reverse 則是反向觀念。

試著切換不同的 flex-direction 看看效果差異：
```html
<style>
  div{
    background: #ccc;
    height:500px;
  }
  .flex {
    display: flex;

    /*控制主軸方向*/
    flex-direction: row; /*row:（預設）橫向左右*/
    flex-direction: row-reverse; /*橫向右左*/
    flex-direction: column; /*縱向上下*/
    flex-direction: column-reverse; /*縱向下上*/
  }
  .item {
    width: 200px;
    height: 200px;
  }
  p.item {
    margin: 0;
  }
  .red {
    background: red;
  }
  .blue {
    background: blue;
  }
  .green {
    background: green;
  }
</style>
<div class="flex">
  <p class="item red"></p>
  <p class="item blue"></p>
  <p class="item green"></p>
</div>
```

### flex-wrap
設定彈性項目位置超過容器時是否允許換行。

| flex-wrap      | 說明                                                     |
| -------------- | -------------------------------------------------------- |
| nowrap（預設） | 項目有寬度且總寬超過容器，不拆行，項目彈性自縮。         |
| wrap           | 項目有寬度且總寬超過容器，拆行，項目保持原尺寸。         |
| wrap-reverse   | 項目有寬度且總寬超過容器，反向往上拆行，項目保持原尺寸。 |

```css
.flex {
  display: flex;
  flex-wrap: nowrap; /* 預設 */
  flex-wrap: wrap;  /*拆行*/
  flex-wrap: wrap-reverse; /* 同 wrap 但 cross-start 和 cross-end 顛倒 */
}
```

## 父屬性 justify-content
定義了容器主軸上的子項目的對齊方式，宣告在父容器上。

| justify-content | 說明                                           |
| --------------- | ---------------------------------------------- |
| flex-start      | 預設，靠左對齊                                 |
| flex-end        | 靠右對齊                                       |
| center          | 置中對齊                                       |
| space-between   | （彈性項目佔據最左最右，平均分配項目之間的空間 |
| space-around    | 將空間分配在彈性項目周圍                       |

```css
.flex {
  display: flex;
  flex-direction: row; /*方向*/
  flex-wrap: wrap; /*換行*/
  justify-content: center; /*內容對齊方式*/
}
```

### 範例：space-between 的間隙應用
`justify-content: space-between`這個效果，如果早期用一般 CSS 排版時你需要對所有元素的`nth-*, first-child, last-child`個別指定間隙 (gutters) 較為麻煩。

```html
<style>
  .list {
    display: flex;
    justify-content: space-between;
  }
  .list .fitem {
    flex-basis: 20%;
    background: #ccc;
  }

  /*************/

  .clist {
    font-size: 0;
  }
  .citem {
    background: #ccc;
    width: 20%;
    display: inline-block;
    margin: 0 3.333%;
    font-size: 1rem;
  }
  .clist div:first-child {
    margin-left: 0;
  }
  .clist div:last-child {
    margin-right: 0;
  }
</style>
<div class="list">
  <div class="fitem">AAA</div>
  <div class="fitem">BBB</div>
  <div class="fitem">CCC</div>
  <div class="fitem">DDD</div>
</div>
<hr>
<div class="clist">
  <div class="citem">AAA</div>
  <div class="citem">BBB</div>
  <div class="citem">CCC</div>
  <div class="citem">DDD</div>
</div>
```

## 父屬性 align-items
可解讀為主軸的另一條交線，交叉軸 (cross axis) 的垂直對齊方式（填滿、頂端、底部、中線、基準線）。宣告在父容器使子項目會縱向排列。

| align-items     | 說明                               |
| --------------- | ---------------------------------- |
| stretch（預設） | 不設定寬、高、間距則充滿整個容器。 |
| flex-start      | 頂端對齊                           |
| flex-end        | 底部對齊                           |
| center          | 中線對齊                           |
| baseline        | 基準線（內容之文字）對齊           |

stretch 可以拉長到 100% 的 cross-size（縱向尺寸），但如果已設定固定尺寸像是 min-height, min-width, max-height, width, height 則這些有高優先權。也就是當某個子項目在交軸方向上有設定了尺寸，stretch 就不會去控制該項目尺寸。

```html
<style>
  div.flex {
    background: #ccc;
    height: 500px;

    display: flex;
    /* flex-direction: row;
    flex-wrap: wrap; */
    flex-flow:row wrap;
    justify-content: center;
    align-items: stretch;
    /* align-items: center; */
  }

  p.item {
    margin: 0;
    width: 200px;
  }

  .red {
    background: red;
    height: 200px;
  }

  .blue {
    background: blue;
  }

  .green {
    background: green;
  }
</style>
<div class="flex">
  <p class="item red">A</p>
  <p class="item blue">B</p>
  <p class="item green">C</p>
</div>
```

## 子屬性 align-self
對子項目作用的單一效果且優先高於父容器的 align-items 設定，可改變自身的對齊方式（覆蓋 align-items 效果）。即使父層沒有設定 align-items 不影響子項目仍可使用 align-self。

同前一組範例，對某一子項目添加練習：
```css
.blue {
  background: blue;
  align-self: center;
}
```

## 父屬性 align-content
當容器的採用 nowrap 排列 item 時，只有一排會用滿容器的交叉軸空間；當容器是 wrap 排列 item 時（指定 flex-wrap:wrap)，則會是多排且平均分配（預設 stretch) 容器的交叉軸空間。換句話說，align-content 是拿來控制多行下的分配方式。這跟 align-item 或 align-self 沒有關聯只是另外去定義多行的分配規則。

```html
  <style>
    div.flex {
      background: #ccc;
      height: 500px;

      display: flex;
      flex-flow:row wrap;
      justify-content: center;
      align-items: flex-start;
      align-content: flex-end;
    }
    p.item {
      margin: 0;
      width: 200px;
    }

    .red {
      background: red;
    }
    
    .blue {
      background: blue;
    }

    .green {
      background: green;
    }
  </style>
  <div class="flex">
    <p class="item red">A</p>
    <p class="item blue">B</p>
    <p class="item green">C</p>
    <p class="item red">A</p>
    <p class="item blue">B</p>
    <p class="item green">C</p>
    <p class="item red">A</p>
    <p class="item blue">B</p>
    <p class="item green">C</p>
    <p class="item red">A</p>
    <p class="item blue">B</p>
    <p class="item green">C</p>
  </div>
```

> align-content 只能是 flex-wrap:wrap 模式下才有效。

## 子複合屬性 flex (flex-grow, flex-shrink, flex-basis)
宣告在彈性項目上的伸展比例、壓縮比例、基本大小的規則公式，使得能在容器內如何分配寬度比例或是自動調整自身項目寬度。flex 為複合屬性包含了三種不同方式。

> `flex: flex-grow flex-shrink flex-basis;`，為複合屬性 一次縮寫三項屬性。

### flex-grow
flex 項目的膨脹係數（預設為 0=不膨脹分配），其值輸入數字（沒有負數）而非單位。當容器夠大的情況下扣除每個項目指定的寬度後，剩下的空間依比例分配回項目身上產生了項目擴展膨脹。即使主軸方向為垂直 (flex-direction: column)，也是同樣道理分配高度。

```html
  <style>
    div.flex {
      background: #ccc;
      height: 500px;

      display: flex;
      flex-flow: row nowrap;
    }

    p.item {
      margin: 0;
      width: 200px;
    }

    .red {
      background: red;
      flex-grow: 0;
    }

    .blue {
      background: blue;
      flex-grow: 1;
    }

    .green {
      background: green;
      flex-grow: 2;
    }
  </style>
  <div class="flex">
    <p class="item red">A</p>
    <p class="item blue">B</p>
    <p class="item green">C</p>
  </div>
```

### flex-shrink
flex 項目的收縮係數（預設為 1= 壓縮基本比例），其值輸入數字（沒有負數）而非單位，設定為 0 則不允許壓縮。當容器過小的情況下且扣除項目總寬後已無空間時，將開始壓縮項目寬度直到最低限度（像是內容文字），壓縮過程依據比例分配。即使主軸方向為垂直 (flex-direction: column)，也是同樣道理分配高度。

舉例說明：

1. 項目寬度 100，外距 10。因此 3 筆項目總長為 120*3=360
2. 當父容器低於 360 因沒有空間，會開始壓縮項目排出空間，根據 0,1,2 比例去吃空間壓縮
3. 假設容器空間剩下 270 時，需要從項目身上取出 90 空間量
  - 0 : 固定，所以還是 100,margin=10
  - 1 : 被吃走 1/5(=18)，所以剩下 82,margin=10
  - 2 : 被吃走 4/5(=72)，所以剩下 28,margin=10

```html
  <style>
    body{
      margin:0;
    }
    div.flex {
      background: #ccc;
      height: 500px;

      display: flex;
      flex-flow: row nowrap;
    }

    p.item {
      margin: 0;
      width: 100px;
      margin: 10px;
      flex-grow: 0;
    }

    .red {
      background: red;
      flex-shrink: 0;
    }

    .blue {
      background: blue;
      flex-shrink: 1;
    }

    .green {
      background: green;
      flex-shrink: 4;
    }
  </style>
  <div class="flex">
    <p class="item red">A</p>
    <p class="item blue">B</p>
    <p class="item green">C</p>
  </div>
```

### flex-basis
flex 項目的主軸空間尺寸（預設為 auto = 無指定），也就是該項目的顯示區域分配值，單位採用 px,em,%... 等。決定項目本身的顯示尺寸依據來源為 content（內容寬）、width 值、flex-basis 值，將從這些屬性取某一項（有優先性）取為基本寬度。

> content < width < flex-basis (limted by max|min-width)

- 當 flex-basis 存在，項目尺寸將不參考 width 值（也就是不需要去設計 width 值）。
- flex-basis 會遵守 min-width 與 max-width 規則限制
- 如果 flex-basis 未指定，會以項目 width 屬性為大小
- 如果 width 未指定，會以項目本身的 content 為大小

使用 flex 彈性盒你應該<mark>習慣使用 flex-basis 去分配項目的空間基本尺寸</mark>，而不是傳統的去誤會使用 width 或 height 來設計尺寸。width(height) 跟 flex-basis 兩者都有存在的意義，當成為 flex 的項目時需考量容器大小跟配置方式而不固定之組合，像是因主軸方向而導致對立方向的尺寸就需要 width（或 height) 來協助。

**舉例：Bootstrap 裡的 flex 屬性**
```css
.col-sm-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    /*不膨脹，不壓縮，固定尺寸*/
}
```

## 子屬性 order
能重新調整單一項目在容器主軸上的出場順序進行排列由小至大（預設為 0)，其值輸入數字（可負數）而非單位。同值時下將參考 HTML 順序。

```css
.red {
  background: red;
}

.blue {
  background: blue;
  order:-1;
}

.green {
  background: green;
  order:2;
}
```

## 總結案例
這裡提供兩個 flex 學習網站抓準 flex 技巧，做一下最後練習。

{% blockquote FLEXBOX FROGGY https://flexboxfroggy.com/#zh-tw %}
透過遊戲方式共 24 關卡，學習 CSS 的 flex box 技巧，全球著名的練習遊戲。
{% endblockquote %}

{% blockquote Flexbox Defense http://www.flexboxdefense.com/ %}
透過遊戲方式共 12 關卡，學習 CSS 的 flex box 技巧，幫助思考並加強 CSS 排版上的各種雜症。
{% endblockquote %}

{% blockquote Flex Priate https://hexschool.github.io/flexbox-pirate/ %}
透過遊戲方式共兩總模式分別為 20 與 30 關卡，來自六角學院出處。
{% endblockquote %}

### 彈性盒置中方式

```css
/* justify-content 為 flex box 水平軸對齊方式 */
/* align-items 為 flex box 垂直軸對齊方式 */
.flex {
    display: flex;
    justify-content: center; /*水平（內容）對齊*/
    align-items: center;/*垂直對齊*/
}
```

### Flexbox 內的 Margin:auto
在 flexbox 內任何的項目已持有寬尺寸，因此可輕易的使用 margin-right 去推擠至邊界定位。

```html
<style>
  body {
    margin: 0;
  }

  .nav {
    display: flex;
    align-items: flex-end;
    background: wheat;
  }

  .logo {
    margin-right: auto;
  }

  a {
    margin: 10px;
  }
</style>
<div class="section">
  <div class="nav">
    <p class="logo">Company LOGO</p>
    <a href="#">Our Clients</a>
    <a href="#">About Us</a>
    <a href="#">Careers</a>
  </div>
</div>
```