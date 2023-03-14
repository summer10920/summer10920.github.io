---
title: "[基礎課程] CSS 教學（三）：盒子模型與定位點"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-11 16:05:00
---

![](https://i.imgur.com/lElmG8a.png)

若順著教材讀到這裡，你會發現很多 CSS 的控制成敗都跟 block 或 inline 有關。這裡我們會完整介紹什麼是盒子模型 (Block & Inline)，有了完整的盒子概念後，就能接著會介紹如何去定位這些元素到指定的位置，學完這篇能幫助你整個 CSS 切版功力大幅提升。

<!-- more -->

# 盒子模型 Box Model
- CSS 是盒子的世界，分為兩種基本盒子分為區塊盒（block box）與行內盒（inline box）。
- 在編寫 CSS 時先確認 HTML 標籤的原型是區塊標籤還是行內標籤，這寫 CSS 時非常重要的事。
- HTML 的每個標籤都可以視為盒子，當使用了標籤等於建立盒子產生容器區塊，也稱為內容區域。
- 外距、內距的單位百分比 %，是根據父元素的<mark>單位</mark>做為計算，也就是單位 % 不論是上下左右的內外距都是依外層寬高值而影響。
- img 圖片雖為行內元素，但表現像 inline-block，非常適合解釋 background-color 包含 padding。
- 有些標籤會有瀏覽器預設的上下外距，例如 h、p、body、ul。

以 div 區塊標籤、span 行內標籤為經典代表。

```html
<div class="block_box">Lorem ipsum dolor sit amet.</div>
<span class="inline_box">Lorem ipsum dolor sit amet.</span>
```

## 區塊盒（block box）
常見的區塊型標籤：div、h1、p、ul、li...

1. block 可用 margin 與 padding 屬性，標籤前後都有<mark>結束斷行</mark>處理，且會填滿撐大父元素，預設自動占滿整體寬度。
2. 會將高度延展到可容納它本身所存放的所有東西，也就是利用內容去撐開它的高度。
3. block 並不會受到 vertical-align 影響。

>區塊盒的內容區域（width）、內距（padding）、邊框（border）、外距（margin）屬性都是有效可指定的。

## 行內盒（inline box）
常見的行內型標籤：span、a、em...

1. 循規蹈矩且前後不會結束斷行，內容多少寬就多少，即是設定 width、height 都不會有作用。
2. 上下的 margin 無效，但左右的 margin 依舊有效。
3. padding、border 上下左右皆有效。
4. height 與 width 屬性無效，原因在於行內無法設定寬、高。
5. 可以被 vertical-align 影響。

## 行內區塊盒（inline-block box）
算是兩者的合併體系，主要可以當作不會斷行 (inline) 且可以彈性指定內外距 (block)。

1. 繼承 inline，預設內容多少寬度就多少，不會強迫換行。
2. 繼承 block，可使用 margin, padding, width, hegiht, border 都可指定。

## 舉例示範
使用標籤產生盒子，即產生容器區塊，目前內容區域沒有東西，瀏覽畫面還看不到東西

```html
<div></div>
<span></span>
```

block 一旦有了內容後，產生了有內容的內容區域，內容區域會以區塊（block）或行內（inline）來顯示。

1. 區塊是橫行霸道的佔位王，即便它的內容很少，也要佔據整列。 
2. 區塊可以自由使用寬（width）、高（height）、內距（padding）、外距（margin）

```html
<div>Lorem ipsum dolor sit amet.</div>
```

inline 行內是循規蹈矩的乖乖排，它的內容就已經是它的寬度，許多行內盒子會依序乖乖排好自己的位置。 行內不能設定寬、高，上、下外距無效。

```html
<span>Lorem ipsum dolor sit amet.</span>
```

{% note warning %}
**科普知識：initial、inherit、unset**
如果有機會，你會發現很多屬性基本上都額外支援這三個通用值，決定目前的元素取值來源如何判斷但實用性不高。分為 initial（預設：繼承父層）、inherit（該標籤原始樣貌）、unset（清除不指定）。
{% endnote %}

## 盒子模型參數
![Image](https://i.imgur.com/j6U9BhG.png)

>計算一個區塊實際寬度為：實際總寬度 = width + padding + border + margin。

| 內容區域       | 內距    | 邊框   | 外距   |
| -------------- | ------- | ------ | ------ |
| content(width) | padding | border | margin |

- 可看到的尺寸：內容區域、內距、邊框。
- 看不到的尺寸：外距。

### width、height
盒子設定的寬、高是內容的容器，如果高沒有設定則是 auto，隨著內容長高。

```css
div {
  width: 500px;
  height: 500px;
  background-color: #777;
}
```

### Margin、Padding
padding 內距沒有負值，margin 外距可以有負值。

```css
/*margin*/
margin:{**length**|auto};
margin-{direction}:{**length**|auto};
/*
  可全部或局部
  direction= top, right, bottom, left

  或四邊設定法 => 水平 垂直 | top right bottom left
*/
margin: 0 0;
margin: 0 0 0 0;

/* 區塊置中，block 元素一定要設定寬度 */
margin: 0 auto;

/* padding*/
padding:{**length**};
padding-{direction}:{**length**};
/*
  可全部或局部
  direction= top, right, bottom, left

  或四邊設定法 => 水平 垂直 | top right bottom left
*/
padding: 0 0;
padding: 0 0 0 0;
```

{% note warning %}
**科普知識：外距重疊現象（margin collapsing）**
若有兩個 block 容器的 margin 重疊，`大的 margin 會吃掉小的 margin`，較大的外距才會有效果，較小的會被瓦解。
{% endnote %}

### Border
邊框最主要的三個屬性分別是 style 樣式、width 寬度、color 顏色。

| border-style | 說明                                         |
| ------------ | -------------------------------------------- |
| dotted       | 方格點                                       |
| dashed       | 短線                                         |
| double       | 雙實線 （border-width 屬性值是兩條線的總和） |
| groove       | 看起來像刻入頁面                             |
| ridge        | 看起來像凸出頁面                             |
| inset        | 看起來像嵌入頁面                             |
| outset       | 看起來像浮雕                                 |

>dotted 會依照 border-width 改變方格的大小及間距，如果邊框是 10px，那麼方格則是 10px 且每個點之間有 10px 的間距。

**Border 樣式：**
```css
/********************************** border-style */
border-style:{value};
border-{direction}-style:{value};
/*
  可全部或局部
  value=dotted, dashed, double, groove, ridge, inset
  direction= top, right, bottom, left

  或四邊設定法 => 水平 垂直 | top right bottom left
*/
border-style: dotted dashed;
border-style: dotted dashed double ridge;
```
**Border 顏色：**
```css
/********************************** border-color*/
border-color:{color};
border-{direction}-color:{color};
/*
  可全部或局部
  color=dotted, dashed, double, groove, ridge, inset
  direction= top, right, bottom, left

  或四邊設定法 => 水平 垂直 | top right bottom left
*/
border-color: red blue green yellow;
```
**Border 寬度：**
```css
/********************************** border-width */
border-width:{medium|thin|thick|*length*};
border-{direction}-width:{medium|thin|thick|*length*};
/*
  可全部或局部
  direction= top, right, bottom, left

  或四邊設定法 => 水平 垂直 | top right bottom left
*/
  border-color: red blue green yellow;
```

#### border 簡寫屬性
1. Border 簡寫屬性只針對 width | style | color 之組合三項應用，複選最需少一項（其他項則自動為預設），最多三個。
2. 一但使用 Border 縮寫方式後，原本的所有 border-style,border-width,border-color 都會失效。則縮寫為主要優先且不互通。
3. border 簡寫也有全部或局部，可分開指定。

```css
/********************************** border */
border:{width} | {style} | {color};
border-{direction}:{width} | {style} | {color};;
/*
  可全部或局部
  direction= top, right, bottom, left
*/
  border: 5px solid #f00;
  border-bottom: 10px solid #0f0;
```

#### border-radius 圓角
1. border-radius 其實也是個簡寫屬性，其實是`border-top-left-radius`、`border-top-right-radius`、`border-bottom-right-radius`、`border-bottom-left-radius`所簡化並對應四邊角。
2. 除了原本功能的局部（上述所寫），縮寫屬性時可支援全部、四邊設定 (↖↘ ↙↗ 或 ↖ ↗ ↘ ↙)。
3. 簡寫時所塞入單位為該角上的遮罩圓之半徑，一個單位上的半徑有分水平向跟垂直向。
![Image](https://i.imgur.com/WKXpVNl.png)
4. 硬要說的話其實有 8 個圓角錨點（雙半徑），完整寫法為`border-radius: 10px 20px 30px 40px / 50px 60px 70px 80px`各別代表水平組↖ ↗ ↘ ↙ <kbd>/</kbd> 垂直組↖ ↗ ↘ ↙;
5. 當部分錨點未指定時，會自動尋找簡寫屬性的該單位之合併規則描述。
  {% blockquote Fancy Border Radius Generator https://9elements.github.io/fancy-border-radius/full-control.html %}
  如果很難懂，可以透過這個網站工具清楚說明錨點的設定變化。
  {% endblockquote %}
示範如下：
```css
/********************************** border-width */
div{
  border-radius: 10px;　/*all*/
  border-radius: 25% 10%; /* ↖↘ ↙↗ */
  border-radius: 10px 20px 30px 40px; /* ↖ ↗ ↘ ↙ */

  border-radius: 1em/5em;
  /* 等同於： */
  border-top-left-radius:     1em 5em;
  border-top-right-radius:    1em 5em;
  border-bottom-right-radius: 1em 5em;
  border-bottom-left-radius:  1em 5em;

  border-radius: 4px 3px 6px / 2px 4px;
  /* 等同於： */
  border-top-left-radius:     4px 2px;
  border-top-right-radius:    3px 4px;
  border-bottom-right-radius: 6px 2px;
  border-bottom-left-radius:  3px 4px;
}
```

6. 當 border-collapse: collapse 成立時（共享 border)，圓角化將無效。
7. 就算 border 不存在，圓角效果也能影響 background。

範例步驟：
```css
div {
  width: 500px;
  height: 500px;

  /* 邊框 */
  border-width: 10px;
  border-style: dotted;
  /* 
  Multiset ↑ → ↓ ←
  border-style: dashed dotted double solid;
  */

  /* color */
  border-color: #000;
  /* 
  Multiset ↑ → ↓ ←
  border-color: red blue yellow green;
  */

  /* 縮寫 */
  border: 10px solid #000;

  /* 圓角 */
  border-radius: 10px;
  /*
  Multiset  ↖ ↗ ↘ ↙ 
  border-radius: 10px 10px 10px 10px;
  */

  /* 盒子陰影 */
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.2);
  /* 
  水平 (+右-左）、
  垂直 (+下-上）、
  模糊半徑 (0 或+不能-)、
  延展性 (+為擴展-為內縮）、
  顏色、inset（內陰影） 
  */
}
```

{% note success %}
**跟著做：用 border-radius 劃一個圓型**
```css
p {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 50%;
}
```
{% endnote %}

#### outline 外側
是外側的 border 效果，雖然視覺上算占用 margin 上，但實際上他屬於 border 項目。

```css
div {
  width:500px;
  height:500px;
  /* 外框 */
  /* 
  outline-width: 10px;
  outline-style: solid;
  outline-color: #000; 
  */
  border: 10px solid red;
  outline: 10px solid #000;
}
```

### 小節練習：算出以下 margin、width 之 auto 值
{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
```html
<style>
  div {
    width: 500px;
    background: black;
  }
  p {
    height: 30px;
    background: #aaa;
  }
</style>
<div>
  <p></p>
</div>
```
{% endnote %}
試著根據不同的追加屬性之描述，對 p 的盒子現象進行了解

1. 求 p 的 margin-left 的 auto 值。
```css
p {
  width: 100px;
  margin-left: auto;
  margin-right: 100px;
}
```
> ANS: p 的 margin-left:auto 經計算後為 300px

2. 分析 margin 狀況與實際值
```css
p {
  width: 100px;
  margin-left: 100px;
  margin-right: 100px;
}
```
> ANS: 此情況會產生過度受限 (Overconstrained)，結果 margin-right 會被迫成為 auto（算出 300px)

3. 求 width 的 auto 值
```css
p {
  /* width 不寫時也會預設為 auto */
  /* width: auto; */
  margin-left: 100px;
  margin-right: 100px;
}
```
> ANS: width 計算後為 300px

4. 求 margin 左右的實際值
```css
p {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
```
> ANS: margin 左右會平均的分配到 100px，也就是常見的至中效果。

5. 求 width 跟 marget 的狀況與實際值
```css
p {
  width: auto;
  margin-left: auto;
  margin-right: 100px;
}
```
> ANS: 會以 width 為準算出 400px，margin-left 為 0

6. 求 width 跟 marget 的狀況與實際值
```css
p {
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
```
> ANS: 會以 width 為準算出 500px，margin 左右皆為 0

## 常見的屬性組合
box 模型常常會搭配以下的屬性做組合上的變化。

### display
調整元素的顯示方式，通常拿來切換 block 與 inline，隱藏用途，或是直接改用 flexbox 或 table 的調整。

| display      | 說明        |
| ------------ | ----------- |
| block        | 區塊        |
| inline       | 行內        |
| inline-block | 行內區塊    |
| flex         | 彈性盒      |
| inline-flex  | 行內彈性盒  |
| table        | 父容器      |
| table-cell   | 子容器變 td |
| table-row    | 子容器變 tr |
| none         | 消失        |

### min-width & max-width
最小寬度與最大寬度的限定屬性，好處於能安全的混合搭配其他長度單位，使得瀏覽器在不同的 viewpoint 上有不同的長度單位可規範。

- min-width：當瀏覽器過窄時 box 開始擠壓。當 width 達到指定 min-width 時將固定此寬度為優先，並停止擠壓內容。
- max-width：當瀏覽器過大時 box 開始延展。當 width 達到指定 max-width 時將固定此寬度為優先，並停止延展內容。

> 也有 min-height & max-height，但如果 max-height 設定內容超過該高度時，內容會溢出 overflow。

舉例 1: 最大寬度為 500px，若小於 500px 寬度會以 40% 設定

```html
<style>
  p {
    width: 40%;
    max-width: 500px;
    height: 300px;
  }
</style>
<div>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque temporibus numquam omnis eaque, aliquam officiis magni aperiam molestias ipsa! Sunt sed magnam iste perspiciatis autem fuga nostrum pariatur labore totam odio ipsa quis quasi itaque, recusandae velit amet voluptatum corrupti voluptates optio sint odit. Omnis sint, fuga ut ipsum quasi fugiat autem asperiores animi voluptatum earum pariatur iusto rerum assumenda dignissimos possimus repudiandae quis quisquam? Rerum quaerat praesentium dolore corporis nihil voluptatibus ad odio atque ut laborum expedita, modi et a, nobis beatae nostrum molestias? Porro, doloribus rem sit blanditiis eos exercitationem eveniet autem laudantium consectetur sapiente saepe ipsum voluptatum.</p>
</div>
```

舉例 2: 先控制最大寬度！不管介面有多大都不會超出這個範圍。當瀏覽器小於指定的 max-width 1200px 寬度時，會用原先設定的寬度百分比 80% 來計算。

```css
.container {
    width: 80%;
    max-width: 1200px;
    margin: 0 auto;
    height: 300px;
}
```

### Box-sizing
重新定義 Box 寬度計算方式。

| Box-sizing  | 說明                               |
| ----------- | ---------------------------------- |
| content-box | width = content area，預設         |
| border-box  | width = content + padding + border |

在 border-box 模式下，border、padding 都會算在寬度裡面，只需考量處理 margin。bootstrap 便是採用 border-box 模式。

```css
*, *::after, *::before {
  box-sizing: border-box;
}
```
> 有些設計師建議將所有元素都設定為 border-box，更容易計算盒子的寬度。

### overflow
如果對區塊設定高度 Height，內容如果超過高度則會產生內容溢出。所以設定頁面元素高度的鐵則是不要設定，若超出時可以設定 overflow 如何處理溢出。

```css
p.one {
  border: 1px solid #000;
  max-width: 600px;
  height: 100px;
  overflow: hidden;
}

p.two {
  border: 1px solid #000;
  max-width: 600px;
  height: 100px;
  overflow: scroll;
}
```

更細一點的參數如 overflow-x 與 overflow-y，能對 x 與 y 軸進行溢出處理。

**舉例：使用 max-height 來建立純 CSS 的捲動軸**
```html
<style>
    .slider {
        max-height: 200px;
        overflow-y: hidden;
        width: 300px;
    }

    .slider:hover {
        max-height: 600px;
        overflow-y: scroll;
    }
</style>
```

### visibility
visibility 屬性可以讓盒子隱藏不見，但將原有的位置保留下來，反而 display:none 並不會保留空間下來。

```css
.a {
    /* visible、hidden */
    visibility: hidden;
}
```

# 定位 Position
- 最重要的定位方式為`絕對定位`與`相對定位`。定位時都需要咬著一個容器（空間座標）才能讓元素之後能進行偏移座標。按道理來說容器（座標）應該是指父容器，但這不是絕對的。
- 容器區塊 (containing block) 就是包含元素的區塊，譬如`<html><body></body></html>`這現象 html 就是屬於 body 的父容器，同理 body 也將會是所有網頁元素的大容器。
- 元素生成時會從父容器那取得初始顯示位置，如果：
   1. 該元素設定為`相對定位`=> 初始顯示位置不變、保留容器給的`Containing 位置`、以`Containing 位置`給的容器範圍為空間座標，以自己的空間座標做相對偏移。
   2. 該元素設定為`絕對定位`=> 初始顯示位置不變、捨棄容器給的`Containing 位置`，向祖先尋找最近已存在 Position 的空間座標做基準（最後找不到則認 viewpoint)，以別人的空間座標做絕對偏移。
   3. 該元素設定為`固定定位`=> 初始顯示位置不變、捨棄容器給的`Containing 位置`，直接向瀏覽器的 viewpoint 做基準，以網頁的空間座標做絕對偏移。

- 每產生一個具備偏移座標的 Position 時，就等於一個圖層產生，就能使用 z-index 屬性做圖層堆疊控制。

## 相對定位 relative
設定 `position:relative`，區塊會以原本顯示的位置為基準可以指定上下左右偏移。 與 absolute 不同的是，區塊原本的空間仍會保留。若只設定了 position:relative，卻沒有指定偏移則顯示上不會有什麼明顯有什麼改變。

## 絕對定位 absolute
當子元素設定 `position:absolute`，區塊會暫時以目前位置顯示，並脫離原本的區塊空間並向上尋找持有定位（可以是 relative 或是 absolute) 的容器做偏移基準，也就是版面基準點來定位，畫面上因為脫離了所以原本容器內的空間將會釋放掉。

- 若定位的容器是 block，`Containing 範圍`會設為該容器的 padding 之邊緣。
- 若定位的容器是 inline，`Containing 範圍`會設為該容器的 content 之邊緣。
- 若定位的容器不存在，`Containing 範圍`定義為網頁的整體容器區塊。
- 設定 position 才可以使用 z-index 屬性。（重要）

## 固定定位 position:fixed
absolute 與 fixed 的行為很像，不一樣的地方在於 absolute 元素的定位是會去找有安排定位之容器，真的找不到才會採網頁的定位之容器。fixed 是直接任網頁的定位之容器當偏移基準。

## 範例說明 relative & absolute & fixed
這裡直接實作比較三者差異會更容易理解。準備一個 5*4 的方塊圖，試著讓資料在畫面中央。

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
```html cssPosition_Rel_Abs_Flex.html
<body>
  <!-- div.bigbox>div.box{$}*20 -->
  <div class="main">
    <div class="bigbox">
      <div class="box">01</div>
      <div class="box">02</div>
      <div class="box">03</div>
      <div class="box">04</div>
      <div class="box">05</div>
      <div class="box">06</div>
      <div class="box relative">07</div>
      <div class="box">08</div>
      <div class="box">09</div>
      <div class="box absolute">10</div>
      <div class="box">11</div>
      <div class="box">12</div>
      <div class="box">13</div>
      <div class="box">14</div>
      <div class="box">15</div>
      <div class="box">16</div>
      <div class="box fixed">17</div>
      <div class="box">18</div>
      <div class="box">19</div>
      <div class="box">20</div>
    </div>
  </div>
</body>
```

```css style.css
body {
  margin: 50px;
  padding: 50px;
  background: #ccc;
  border: 1px solid #ff0;
  
  /* flexbox 效果，使內容居中心 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 204px);
}
.main {
  padding:100px;
  background: #aaa;
  border: 1px solid #f00;
}
.bigbox {
  width: 300px;
  border: 1px solid #000;
  background: rgb(209, 248, 248);
}
.box {
  width: 50px;
  height: 50px;
  margin: 5px;
  color: white;
  background-color: darkcyan;
  text-align: center;
  line-height: 50px;
  display: inline-block;
}
```
{% endnote %}

{% note info %}
**小技巧**：inline 的 4px 間格
此時你應該發現畫面的排版不如預期正確，因為需要修正 inline 所影響的 4px 間格。這裡提供兩種方法解決：（方法很多可以上網科普）

**方法一：消除看不見的文字**
```css
/*
  消除 4px 方法一：容器沒有文字尺寸，子元素再弄回尺寸
*/
.bigbox {
  font-size: 0;
}
.box {
  font-size: 1rem;
}
```

**方法二：捨棄 inline 改用 block+float**
```css
/*
  消除 4px 方法二：改浮動方式，注意容器溢位問題
*/
.bigbox {
  overflow: hidden;
}
.box {
  /* display: inline-block; */
  display: block;
  float: left;
}
```
{% endnote %}

1. 後續教學上我們採用**方法一**來解決 （較多狀況可以解析，如果可以兩法都去理解）。此時你的畫面應該如下：
![Image](https://i.imgur.com/vCQc7zp.png)

2. 添加三種 position 效果到各位置。理解這些定位點解析：
```css style.css
.relative {
  position: relative;
  background: brown;
  top: -30px;
  left: -30px;
  /* 空間仍在僅偏移 */
}

.absolute {
  position: absolute;
  background: blueviolet;
  /* 預設位置不變，父容器失去該元素 */
}

.fixed{
  position: fixed;
  background: darkgreen;
  /* 解讀奇怪的預設位置 =>
    1. 因為 inline-block 關係，會緊鄰前者旁邊
    2. 失去父容器的強迫換行，所以 overflow
  */
}
```

3. 試著解讀以下各種狀況：
  - .absolute 設定偏移量 (top,bottom,left,right) 尋找落點
  - .bigbox, .main, body 選一組設定 relative，尋找。absolute 落點
  - .fixed 設定偏移量 (top,bottom,left,right) 尋找落點
  - 3 組都設定 z-index 屬性，帶入正值與負值解析圖層位置
  - 挑幾組號碼給他指定 absolute 或 relative 看看圖層位置

### 預覽範例效果
{% jsfiddle summer10920/21uwnvbt html,css,result dark 100% 768 %}

### 利用 absolute 特性 拿來做水平垂直至中。
素材中是使用 body 指定 flex 方式設計。另一個方式為：

```css
.main{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

{% note danger %}
**新手陷阱：當子元素 fixed 遇到 父容器 Transform**
雖然表面上說 fixed 直接參考 viewpoint，但根據上面至中效果你會發現一個問題，那就是 案例中的小方塊 fixed 在向上尋找 viewpoint 時，途中遇到到 `.main` 父容器這裡的 transform，會導致放棄尋找 viewpoint 而定位至此。

如果要排除此現象，你得想辦法不要出現 transform 的 position 至中寫法：
```css
.main{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin:auto;
}
```

{% endnote %}

## 黏性定位 position:sticky
這是一個結合了 position:relative （進入）和 position:fixed （離開）的特性，適用像是 header-nav 選單效果，會先以 relative 效果方式正常出現，當元素離開 viewport 時因為溢出成立導致會轉成 fixed 效果。

以下部分情況下使用 sticky 會失敗（就是 fixed 條件失敗）：

- 未指定特定偏移量 (top,bottom,left,right)＝＞　導致離開時沒有絕對位置。
- 父元素的 overflow 屬性值為 hidden, auto, scroll＝＞　無法溢出導致不成立。
- body height:100%＝＞元素永遠離不開 viewpoint。

## 小節練習 - Postition
請使用 CSS 的 postion 屬性試著做出以下畫面，點符號利用 absolute 做出。每個骰子的尺寸為 200px，點符號尺寸為骰子的 0.2 倍大。

{% tabs posdemo,1 %}
<!-- tab 題目預覽-->
{% jsfiddle summer10920/rpxjzevc result dark 100% 500 %}
<!-- endtab -->
<!-- tab 解答-->
```html CSS_CLS3_totalTest.html
<div class="container">
  <div class="dice">
    <div class="point red at5"></div>
  </div>
  <div class="dice">
    <div class="point at1"></div>
    <div class="point at9"></div>
  </div>
  <div class="dice">
    <div class="point at1"></div>
    <div class="point at5"></div>
    <div class="point at9"></div>
  </div>
  <div class="dice">
    <div class="point at1"></div>
    <div class="point at3"></div>
    <div class="point at7"></div>
    <div class="point at9"></div>
  </div>
  <div class="dice">
    <div class="point at1"></div>
    <div class="point at3"></div>
    <div class="point at5"></div>
    <div class="point at7"></div>
    <div class="point at9"></div>
  </div>
  <div class="dice">
    <div class="point at1"></div>
    <div class="point at3"></div>
    <div class="point at4"></div>
    <div class="point at6"></div>
    <div class="point at7"></div>
    <div class="point at9"></div>
  </div>
</div>
```
```css style.css
.dice {
  width: 200px;
  height: 200px;
  border: 2px solid #000;
  border-radius: 1rem;
  display: inline-block;
  background: linear-gradient(45deg, #fff, #ccc);
  box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.5);
  position: relative;
}

.point {
  width: 20%;
  height: 20%;
  background: black;
  border-radius: 50%;
  position: absolute;
}

.red {
  background: red;
}

.at1 {
  left: 10%;
  top: 10%;
}
.at3 {
  right: 10%;
  top: 10%;
}
.at4 {
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
}
.at5 {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.at6 {
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
}
.at7 {
  left: 10%;
  bottom: 10%;
}
.at9 {
  right: 10%;
  bottom: 10%;
}

.container {
  text-align: center;
}
```
<!-- endtab -->
{% endtabs %}

# 總思考練習

## 卡片排版
思考以下問題：

1. 單看預覽，hot 定位的方式透過什麼方式完成
2. 為何檢查`<div class="container">`的參數只有寬度沒有高度
3. 在 CSS 代碼中為何沒有`box-sizing: border-box;`時，整個卡片會跑版。

{% jsfiddle summer10920/63oaphu8 result,html,css, dark 100% 500 %}

### 解答

1. 父容器 relation 與子元素 absolute 與 top&right
2. 父容器有綁定 width 但子元素 float
3. 父容器總寬 960，瀏覽器預設是 content-box(width = content) 模式所以全部算入一共是 m20+b2+p20+w300=>342\*3>960 超過，反之 border-box 模式 (width = content + padding + border) 下為 m20+w300=320*3=960。

## 廣告鎖頻
本練習包含 JQ 語法負責按鈕控制（未學習過不影響本題思考），思考以下問題：

1. 為何預覽上 div.content 無法被選取文字，其原理為何。
2. 試著理解本題 AD 的水平垂直至中的方法。

{% jsfiddle summer10920/9scL73q6 result,html,css,js dark 100% 500 %}

### 解答
1. `.ad`最上面設定 z-index，下一層的`.all`，最後一層是 body 其他的元素。
2. 利用 fixed 變成圖層後，box 範圍利用 left,right,top,bottom 故意 0 撐大邊界使得 margin:auto 幫忙置中，前提是 content 必須要有固定的 w 跟 h 才能讓 auto 計算得出來。