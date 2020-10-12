---
title: "[基礎課程] CSS 教學（五）：變形、轉場、動畫、媒體查詢"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-17 18:31:49
---

CSS 的最後一篇基本課程，收錄一些偏於動態或視覺效果的 CSS 屬性，也提及到 CSS 動畫與轉場的動態播放，以及跨平台十分重要的 Media Query 媒體查詢。這些都算是能讓 CSS 更生動豐富且靈活，使網頁體驗上更有感受。

<!-- more -->

---

# 變形 Transform
必須作用在 block、inline-block（包含 flex 彈性盒）上。CSS 變形特點不會影響周遭其他的元素，舉例旋轉一個元素 45deg，有可能會壓在上下左右的元素之上。變形的值為函數並歸類出四種類型。

同時間使用多組函式時，你應該用空格進行多組函式值，例如`transform: translate(50%, 50%) rotate(45deg);`。

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
設計畫面中心的示範方塊圖且文字垂中，將 transition 的範例結果透過：:after 呈現出來。

```html
<!--本篇利用 ::after 模擬出變形差異比較-->
<style>
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    color: white;
  }

  .box {
    width: 100px;
    height: 100px;
    background: #FF0000;
    line-height: 100px;
    position: relative;
  }

  .box::after {
    content: "transform";
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.5;
    background: #0000FF;
  }
</style>
<div class="box">Befault</div>
```
{% endnote %}

## translate 平移
- translateX()、translateY() 稱為「平移函式」能左右或上下移動，但不能沿 z 軸前後移動。
- 接受用長度或百分比表示距離，px、em、%，正值往右或上，負值為往左或下。
- 使用 translate(x,y) 能同時對 x 軸與 y 軸平移，但如果不寫 y 值則預設為 0，也就 translate(2em) 等同 translateX(2em)。
- 如果變形函數中`使用百分比 (%) 做為移動的數據，以元素本身的 box 尺寸為百分比計算基準`。注意，這和 CSS box 以容納區 (containing block) 尺寸為計算基準不同。

```css
.box::after{
  /* transform: translate(50px, 50px); */
  transform: translate(50%, 50%);
  /* 若是某 x,y 值不需設定，一定要設定成 0 */
  /* transform: translate(0, 100px); */
  /* transform: translate(100px, 0); */
}
```

## scale 縮放
- 能依據指定值縮放大小，用`負值會呈現倒影型態`。數值是倍數，舉例 scaleX(2) 變成轉換前的兩倍，scaleY(0.5) 讓元素高度減半，`無法使用百分比`。
- 可同時讓兩軸縮放，舉例 scale(2,0.5) 會讓元素縮放兩倍寬 (X)，一半高 (Y)。如果只填一個值 就會等同樣比例縮放兩軸。

```css
.box::after{
  transform: scale(3.5);
  /* transform: scale(3.5, 1.5); */

  /* transform 函式可累加，用空格分開 */
  /* transform: translate(50%, 50%) scale(1.2); */
}
```

## rotate 旋轉
可三維空間分別控制 rotateX()、rotateY()、rotateZ()。若單一使用 rotate() 則是二維空間順時旋轉，可負值且單位為 deg（degree）。

```css
.box::after {
  transform: translate(100%) rotate(45deg);
}
```

## skew 歪斜
- skewX()、skewY()、skew()，有正、負值，skew(30deg)，記得要加單位 deg，
- skew() 第一個數值是 x 的歪斜角， 接著才是 y 的歪斜角，如果省略 y 歪斜角，就視為 0。

```css
.box::after {
  transform: translate(100%) skew(45deg);
}
```

## transform-origin 變形點
- 另外獨立的屬性指定，transform-origin 可以設定元素上的原點，元素旋轉時會對著這個原點旋轉
- 為複合屬性，先指定 x 水平， y 垂直，最後是選填的 z 軸方向，彼此之間以空格間隔。
- 數值可以是單位 em、px、%、left、right、top、bottom；center。
- z 軸只能用長度值（一般會是 px)，不能夠使用關鍵字與百分比值。
- 預設值為 50% 50%(box 中心點），若省略 Y 值不寫將視為 center (50%) 。

> transform-origin 對於使用 translate 平移沒有效果。

```css
.box::after {
  transform: rotate(30deg);
  /* 以下四個設定都一樣 ，只設定一個值，另一值會被認定 center */
  transform-origin: center center;
  transform-origin: 50% 50%;
  transform-origin: center;
  transform-origin: 50%;
}
```

{% note warning %}
**科普知識：3D 版的 Transform**
CSS 另外還有的 3D 變形控制，這需要額外的進階深入介紹沒有加入本篇教材，有機會另開文章解說。簡單來說：
- translateZ() 數值為長度值（不允許百分比），需搭配 perspective() 才能做出維度空間。
- translate3d() 設定少於 3 個數值時並不會帶入預設值，一定要 3 個數值。
- scale3d() 設定數值跟 translate3d 一樣要 3 個數值。
{% endnote %}

# 轉場 Transition
轉場是指從何開始到哪裡結束之動畫過程。你需要指定出開始與結束兩種不同的樣式屬性。舉例來說：

1. 初始樣式為 background:red，結束樣式為 background:blue。
2. 瀏覽器會將兩個樣式間的變化形成動畫過渡效果。
3. 指定觸發時機行為，藉由 CSS 的擬類別觸發動畫（最常見的是：hover)。
4. transition 寫在觸發前才可來回轉場，寫在觸發後只會轉場過去，無法變回。

轉場可以分為四個屬性來指定，或者可以用縮寫（通常）來表示：

| 屬性                         | 預設值 | 說明                                                              |
| ---------------------------- | ------ | ----------------------------------------------------------------- |
| `transition-property`        | all    | 指定哪些 CSS 屬性受過渡轉場效果。沒指定到的屬性會瞬間變化沒有效果 |
| `transition-duration`        | 0      | 指定該轉場需幾秒內完成，單位為 s                                  |
| `transition-timing-function` | ease   | 指定過渡為哪種漸變函式，一共有 6 種過渡效果                       |
| `transition-delay`           | 0      | 指定幾秒過後才執行轉場，單位為 s                                  |

>縮寫方式 `transition`: `property` `duration` `timing-function` `delay`; 

```css
/* 縮寫：屬性    持續時間      速度曲線    延遲時間*/
transition: all 1s ease-in 0s;
/* 簡單寫法 */
transition: all 2s; /*default is append ease 0s */
```

## 單屬性或多屬性
可指定單某 CSS 屬性對象做轉場參數，若需要多屬性則連續設定轉場參數並使用<kbd>,</kbd>分開。

```css
/*
transition-property（預設 all）
transition-duration（預設 0s）
transition-timing-function（ease 預設、ease-in、linear、ease-out、ease-in-out）
transition-delay（預設 0s）
 */

/* 縮寫且單筆 */
div {
  width: 100px;
  transition: width 1s ease 1s;
}
div:hover {
  width: 500px;
}

/* 縮寫且多筆 */
div {
  width: 50px;
  height: 50px;
  background: #000;
  transform: scale(1);
  border-radius: 1px;
  transition: transform 1s ease, border-radius 1s ease-out;
}
div:hover {
  transform: scale(2);
  border-radius: 50%;
}

/* 完整列出且多筆，順序需相對應 */
div {
  transition-property: color, background-color, border-color;
  transition-duration: 0.25s, 0.75s, 2s;
  transition-timing-function: ease, ease-in, linear;
  transition-delay: 0, 0, 0, 0;
  
  /* 或是以下寫法 */
  transition: color 0.25s ease 0, background-color 0.75s ease-in 0, border-color 2s linear 0;
}
```

{% note warning %}
**科普知識：transition-property**
轉場對應的屬性對象除了 all 全部，也能指定單一或多筆的 CSS 某一屬性，根據官方說法以下屬性都能適用：

rotate, scale, translate, skew, width, height, color, background-color, border-color, border-width, font-size, line-height, letter-spacing, word-spacing, margin, padding, opacity, top, right, bottom, left
{% endnote %}

## 範例：轉場動畫

```css
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  color: white;
}

.box {
  width: 100px;
  height: 100px;
  background: #FF0000;
  line-height: 100px;
  position: relative;
}

.box::after {
  content: "transform";
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  background: #0000FF;
  transform-origin: right bottom;
  transition: 2s;
  opacity: 0;
}

.box:hover::after {
  transform: rotate(75deg);
  opacity: 1;
}
```

## 範例：多屬性效果

```css
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  color: white;
}

.box {
  width: 100px;
  height: 100px;
  background: #FF0000;
  line-height: 100px;
  position: relative;
}

.box::after {
  content: "transform";
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  background: #0000FF;
  transform-origin: right top;
  opacity: 0;
  /* transition-property: opacity, top, width, transform;
  transition-duration: 0.5s, 0.5s, 0.5s, 0.5s;
  transition-timing-function: ease, ease, ease, ease;
  transition-delay: 0s, 0.5s, 1s, 1.5s; */

  /*或多筆一行寫完*/
  transition: opacity 0.5s ease 0s, top 0.5s ease 0.5s, width 0.5s ease 1s, transform 0.5s ease 1.5s;
}

.box:hover::after {
  transform: rotate(90deg);
  opacity: 1;
  top: 100px;
  width: 200px;
}
```
{% note danger %}
**新手陷阱：秒差下的多屬性**
使用不同屬性進行 transition 時，當你設計了（順向）連續動作在不同時間上。有可能導致你（順向）返回動畫上的延遲產生誤會效果。
{% endnote %}

# 動畫 Animation
轉場跟動畫不太相同的是，前者轉場是選擇器 A 跟選擇器 B 之間的過渡效果（通常是：hover)，當偵測到選擇器 B 成立時（觸發）由指定的選擇器 A 開始轉場；後者動畫是只需要對選擇器 B 宣告一個動畫播放即可，不用指定選擇器 A 是誰。

建立動畫的步驟為：
1. 建立一組關鍵影格（keyframe）包含了動畫名稱、起始 (from) 之屬性為何、結束 (to) 之屬性為何。
2. 定義相關動畫參數到指定的選擇器上，可以為該動畫設定時間、延遲、速度與次數等設定。
3. 設定 Keyframe 的所有 CSS 屬性時，同樣需要注意該元素是否適合這些屬性變化結合，譬如 linline 與 hieght。
4.  animation-delay 延遲時間設定為「負值」時，則不是延遲而是變成跳秒播放。舉例`animation-duration:5s`，`animation-delay:-2s`，代表直接從第 2 秒的影格位置播放並 3 秒後停止 ( 類似 5-2=3 的概念 )。

## 動畫屬性

| 屬性                      | 預設值  | 說明               | 單位與值                                        |
| ------------------------- | ------- | ------------------ | ----------------------------------------------- |
| animation-name            |         | 動畫名稱           |                                                 |
| animation-duration        | 0       | 動畫持續時間       | *s（秒）, *ms（毫秒）                           |
| animation-timing-function | ease    | 動畫加速度函式     | ease, linear, ease-in, ease-out, ease-in-out    |
| animation-delay           | 0       | 動畫延遲播放時間   | *s（秒）, *ms（毫秒）                           |
| animation-iteration-count | 1       | 動畫播放次數       | 數字或 infinite。                               |
| animation-direction       | normal  | 動畫播放方向       | normal, reverse, alternate, alternate-reverse。 |
| animation-fill-mode       | none    | 動畫播放前後模式   | none, forwards, backwards, both。               |
| animation-play-state      | running | 動畫播放或暫停狀態 | running, paused。                               |

```css
/* 循環交替或反向播放
  animation-direction:
    normal（默認，正常播放）
    revers（反向播放）
    alternate（輪流交替播放，動畫在奇數次 1,3,5 正向播放，在偶數次 2,4,6 反向播放）
    alternate-reverse（動畫在奇數次 1,3,5 反向播放，在偶數次 2,4,6 正向播放）
*/

/*  
  animation-fill-mode: 
    forwards（保留動畫結束後的樣式，例如顏色、位置）
    backwards（返回動畫一開始的樣式，例如顏色、位置） 
*/
```

### 縮寫方式
動畫縮寫，名稱和持續時間是必要，其他數值可以省略，在寫樣是時請使用動畫縮寫。
```css
animation:name duration | timing-function | delay | iteration-count | direction | fill-mode | play-state;
```

## 範例練習

### 基本範例 1

```html
<style>
  body {
    background: #333;
    margin: 0;
    color: white;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    text-align: center;
  }

  /* 宣告關鍵影格為動畫、動畫名稱、開始、結束 */
  div.base {
    width: 100px;
    height: 100px;
    background: red;

    /* 動畫名稱 */
    /* animation-name: demo1; */
    /* 動畫間隔 */
    /* animation-duration: 1s; */
    /* 速度函式 */
    /* animation-timing-function: ease; */
    /* 動畫延遲 */
    /* animation-delay: 0.1s; */
    /* 播放次數 */
    /* animation-iteration-count: 3; */
    /* 循環交替或反向播放*/
    /* animation-direction: alternate; */
    /*播放基數次時可考慮是否要停留於尾格，否則會還原到初始格狀態*/
    /* animation-fill-mode: forwards; */
    
    /* 以上可縮寫成 */
    animation: demo1 1s infinite alternate forwards;
  }
  @keyframes demo1 {
    from {
      background: red;
    }
    to {
      background: yellow;
    }
  }
</style>
<div class="base">HELLO WORLD</div>
```

### 基本範例 2
1. 可以用百分比來控制每個影格的位置處，其中 from 可以作為 0%寫法，to 可作為 100%寫法。

```html
<style>
  div.btn {
    width: 100px;
    height: 50px;
    background: orange;
    position: relative;
    border-radius: 5px;
    line-height: 50px;
    overflow: hidden;
  }
  div.btn:after {
    content: "";
    background: linear-gradient(to right bottom, #ffffff00 30%, #ffffff88 50%, #ffffff00 70%);
    transform: translateX(-75%);
    position: absolute;
    left: -100%;
    top: -100%;
    right: -100%;
    bottom: -100%;
    animation: demo2 2s linear infinite;
  }
  /* 宣告關鍵影格為動畫、動畫名稱、開始、結束 */
  @keyframes demo2 {
    50% {
      transform: translateX(-5%);
    }

    100% {
      transform: translateX(75%);
    }
  }
</style>
<div class="btn">Button</div>
```

### 基本範例 3
1. 屬性彼此獨立於影格，可以單一屬性指定在僅需要的影格時間上即可。
2. 可指定不同的時間區段上有同樣影格屬性參數。

```html
<style>
  div.load {
    position: relative;
    width: 100px;
    text-align: center;
  }
  div.load::before,
  div.load::after {
    content: "";
    position: absolute;
    top: -2rem;
    left: -100%;
    right: -100%;
    bottom: 2rem;
    border: 1px solid #eee;
  }
  div.load::after {
    animation: demo3 10s linear infinite;
  }
  @keyframes demo3 {
    0% {
      right: 200%;
    }
    25%,75% {
      background: #500;
    }
    50% {
      background: #e00;
    }
    100% {
      right: -100%;
    }
  }
</style>
<div class="load">Loading</div>
```

### 基本範例 4
1. 可以套用多個動畫到同個選擇器，屬性值需對應好
2. 如果需要可以用 JS 控制動畫`animation-play-state: paused;`暫停

```html
<style>
div.rgb {
  font-size: 5rem;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1rem;
  animation: rgb 5s linear infinite, Breat 10s linear infinite;
  padding: 5px 0 5px 1rem;
  border: 1px solid white;
}
@keyframes rgb {
  0%, 100% {
    text-shadow: 0px 0px 1rem #ff0000ff, 0px 0px 5rem #ff000099;
  }
  33% {
    text-shadow: 0px 0px 1rem #00ff00ff, 0px 0px 5rem #00ff0099;
  }
  66% {
    text-shadow: 0px 0px 1rem #0000ffff, 0px 0px 5rem #0000ff99;
  }
}
@keyframes Breat {
  0%, 100% {
    box-shadow: 0px 0px 1rem #ff0000ff, 0px 0px 5rem #ff000099, inset 0px 0px 1rem #ff0000ff, inset 0px 0px 5rem #ff000099;
  }
  12.5% {
    box-shadow: 0px 0px 1rem #ffFF00ff, 0px 0px 1rem #ffFF0099, inset 0px 0px 1rem #ffFF00ff, inset 0px 0px 1rem #ffFF0099;
  }
  33% {
    box-shadow: 0px 0px 1rem #00ff00ff, 0px 0px 5rem #00ff0099, inset 0px 0px 1rem #00ff00ff, inset 0px 0px 5rem #00ff0099;
  }
  45.5% {
    box-shadow: 0px 0px 1rem #00FFFFFF, 0px 0px 1rem #00FFFF99, inset 0px 0px 1rem #00FFFFFF, inset 0px 0px 1rem #00FFFF99;
  }
  66% {
    box-shadow: 0px 0px 1rem #0000ffff, 0px 0px 5rem #0000ff99, inset 0px 0px 1rem #0000ffff, inset 0px 0px 5rem #0000ff99;
  }
  78.5% {
    box-shadow: 0px 0px 1rem #FF00FFFF, 0px 0px 1rem #FF00FF99, inset 0px 0px 1rem #FF00FFFF, inset 0px 0px 1rem #FF00FF99;
  }
}
</style>
<div class="rgb">Loki</div>
```

### 範例預覽

{% jsfiddle summer10920/d241xjvg result dark 100% 500 %}

# 媒體查詢 Media Query
網頁會先查詢 media 指定之 Query 邏輯性 (true/false)，如果 media 條件符合再針對這些屬性套入 css 樣式表。網頁是否載入 CSS 樣式表的方式如下：

- **在 HTML 內使用**
在視窗 screen 時會邏輯成立 style.css，列印時則會邏輯成立 print.css。
```html
<link rel="stylesheet" type="text/css" media="screen" href="style.css">
<link rel="stylesheet" type="text/css" media="print" href="print.css">
```

- **在 CSS 內使用**
如果直接寫在 CSS 裡，下列的寫法也是一樣的概念。
```css
@media screen{
  /*css code*/
}
@media print{
  /*css code*/
}
```

- **使用@import**
如果你喜歡在 CSS 文件內使用@import，也可以根據不同的 media 特性，import 不同的 css。
```css
@import "style.css";
@import "print.css" print;
```

## 類型與特性
- 類型 (Types)：主要是根據用戶端裝置為何，目前主要的 Media 類型有以下四種。
- 特性 (Fratures)：主要是網頁環境上的細部描述為何，可分為四大類型（大多市面上只應用 viewport)。

### 類型 - Media Type
| 類型   | 說明                                                          |
| ------ | ------------------------------------------------------------- |
| all    | 所有裝置。                                                    |
| print  | 列印裝置，包含使用列印預覽產生的所有畫面 ( 例如列印為 pdf )。 |
| screen | 螢幕裝置，不屬於 print 和 speech 的設備。                     |
| speech | 朗讀裝置，針對可以「讀出」頁面的無障礙工具設備。              |

> tty、tv、projection、handheld、braille、embossed 和 aural 因為在 Level 4 已經描述未來不支援不多做介紹。

### 特性 - 視窗或頁面尺寸 ( Viewport/Page Dimensions )
| 特徵         | 說明                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------- |
| width        | 螢幕寬度，支援 max-width 和 min-width。                                                             |
| height       | 螢幕高度，支援 max-height 和 min-height。                                                           |
| aspect-ratio | 螢幕長寬比例，支援 max-aspect-ratio 和 min-aspect-ratio。( 長寬比的寫法格式為 1/1、1680/720... 等 ) |
| orientation  | 螢幕旋轉方向，有兩個選項：portrait 和 landscape。 ( portrait 為直向，landscape 為橫向 )             |

### 特性 - 顯示品質 ( Display Quality )
| 特徵            | 說明                                                                                                                                                                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resolution      | 解析度 ( dpi、ppx... 等 )，支援 max-resolution 和 min-resolution                                                                                                                                                                                                                  |
| scan            | 電視掃描方式，有兩個選項：interlace 和 progressive。 ( interlace 為交錯式掃描，奇數偶數掃描線交錯，progressive 為漸進式掃描，是現在大多數電視採用的方式 )                                                                                                                         |
| update          | 更新媒體，有三個選項：none、slow 和 fast。( none 表示不會更新的顯示裝置，例如印出來的文件，slow 表示更新速度慢的顯示裝置，fast 表示更新速度快的裝置，例如電腦螢幕 )                                                                                                               |
| overflow-block  | 當內容包含 block 特性並超過邊界範圍，有四個選項：none、scroll、optional-paged 和 paged。( none 表示任何超過範圍都不顯示，例如看板，scroll 表示可滾動查看超出範圍，例如電腦螢幕，optional-paged 表示可手動查看超出的內容，例如簡報，paged 表示超出的內容會以分頁顯示，例如印表機 ) |
| overflow-inline | 當內容包含 inline 特性並超過邊界範圍，有兩個選項：none 和 scroll。                                                                                                                                                                                                                |
| grid            | 網格媒體，兩個選項：0 和 1。                                                                                                                                                                                                                                                      |

### 特性 - 顏色 ( Color )
| 特徵        | 說明                                                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| color       | 輸出裝置的色彩位元數，若數值為 0 則代表黑白裝置，支援 max-color 和 min-color。                                             |
| color-index | 輸出裝置的色彩索引位元數，支援 max-color-index 和 min-color-index。                                                        |
| monochrome  | 單色媒體功能，若數值為 0 表示「不是」單色設備。                                                                            |
| color-gamut | 輸出裝置色域，有三個選項：srgb、p3 和 rec2020。( 絕大多數的顯示器都支援 srgb，而 p3 的色域比 srgb 更廣且包含 srgb，rec2020 | 比 p3 更大且包含 p3 ) |

### 特性 - 互動 ( Interaction )
| 特徵                 | 說明                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| pointer、any-pointer | 指標裝置 ( 例如滑鼠 ) 的準確性，有三個選項：none、coarse 和 fine。( none 表示沒有指標裝置，coarse 表示精度較差的指 | 標裝置，像是觸控螢幕，fine 表示精度比較高的裝置，像是滑鼠或手寫筆 ) |
| hover、any-hover     | 裝置具備 hover 的能力，有兩個選項：none 和 hover。                                                                 |

> 可以使用 Types（多個）跟 Fratures（多個）兩大類別進行邏輯條件，也可複數組合 AND、OR、NOT（少用）使用。

## Media 的寫法
- Media 類型宣告先寫，如果是 all 類型（預設）可以省略。
- 條件如果同時需要 (AND)，使用 and 分隔
- 條件如果某項成立即可 (OR)，使用逗號分隔
- Fratures 特性類型記得用小括弧 () 包覆

```css
@media screen and (min-width: 480px) {
  /*
  成立條件 AND
    螢幕裝置
    且
    寬度符合：min-width:480px （需 480px 以上）
  */
}
@media (max-width: 700px), print {
  /*
  成立條件 OR
    寬度符合 max-width:700px （不超過 700px ）
    或
    列印裝置也成立
  */
}
@media (min-width: 400px) and (max-width: 700px) {
  /*
  寬度符合 400px~700px 時
  */
}
```

## 範例說明

### 四種寬度區間的顏色變化
```css
@media (min-width: 320px) {
  body {
    background-color: lightpink;
  }
}
@media (min-width: 550px) {
  body {
    background-color: lightyellow;
  }
}
@media (min-width: 768px) {
  body {
    background-color: lightgreen;
  }
}
@media (min-width: 960px) {
  body {
    background-color: lightblue;
  }
}
```

### 768px 以上時，呈現兩欄
```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .box {
    width: 100%;
    height: 50vh;
  }
  .bg1 {
    background: #fbc531;
  }
  .bg2 {
    background: #44bd32;
  }

  @media (min-width: 768px) {
    .box {
      width: 50%;
      height: 100vh;
      float: left;
    }
  }
</style>
<div class="box bg1"></div>
<div class="box bg2"></div>
```

### BOOTSTRAP 的 RWD 寫法
```css
.col-sm-8 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
@media (min-width: 576px) {
  /* ... */
  .col-sm-8 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 66.666667%;
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  /* ... */
}
```

### 維基百科的列印效果（部分畫面不顯示印出）
```css
@media print {
  .noprint,
  .catlinks,
  .magnify,
  .mw-cite-backlink,
  .mw-jump,
  .mw-editsection,
  .mw-editsection-like,
  .mw-hidden-catlinks,
  .mw-indicators,
  .mw-redirectedfrom,
  .patrollink,
  .usermessage,
  #column-one,
  #footer-places,
  #jump-to-nav,
  #mw-navigation,
  #siteNotice,
  #f-poweredbyico,
  #f-copyrightico,
  li#about,
  li#disclaimer,
  li#mobileview,
  li#privacy {
      display: none
  }
  /* ... */
}
```

### RWD Table 方法 1
透過隱藏部分 th,td 達到。練習資料來源：https://job.taiwanjobs.gov.tw/Internet/index/docDetail.aspx?uk=844&docid=6718
```html
<table>
  <thead>
    <tr><th>服務站名</th><th>電話</th><th>傳真</th><th>地址</th></tr>
  </thead>
  <tbody>
    <tr><td>北基宜花金馬分署</td><td>(02)8995-6399</td><td>(02)8995-6398</td><td>新北市新莊區中平路 439 號南棟 3 樓</td></tr>
    <tr><td>基隆就業中心</td><td>(02)2422-5263</td><td>(02)2428-1514</td><td>基隆市中正區中正路 102 號</td></tr>
    <tr><td>羅東就業中心</td><td>(03)954-2094</td><td>(03)957-6435</td><td>宜蘭縣羅東鎮中正北路 50 號 1、2 樓</td></tr>
    <tr><td>基隆就業中心六堵分站</td><td>(02)2451-5020</td><td>(02)2452-8501</td><td>基隆市七堵區工建北路 1 之 2 號</td></tr>
    <tr><td>花蓮就業中心</td><td>(03)832-3262</td><td>(03)835-6927</td><td>花蓮縣花蓮市國民三街 25 號</td></tr>
    <tr><td>連江就業中心</td><td>(0836)23576</td><td>(0836)26304</td><td>連江縣南竿鄉介壽村 47-4 號</td></tr>
    <tr><td>玉里就業中心</td><td>(03)888-2033</td><td>(03)888-6140</td><td>花蓮縣玉里鎮莊敬路 8 號 2 樓</td></tr>
    <tr><td>金門就業中心</td><td>(082)31-1119</td><td>(082)31-1120</td><td>金門縣金城鎮民權路 173 號</td></tr>
    <tr><td>頭城就業服務台</td><td>(03)977-1650</td><td>(03)977-1650</td><td>宜蘭縣頭城鎮開蘭路 1 號</td></tr>
    <tr><td>員山就業服務台</td><td>(03)923-2880</td><td>(03)923-2880</td><td>宜蘭縣員山鄉員山路一段 322 號</td></tr>
    <tr><td>蘇澳就業服務台</td><td>(03)996-5300</td><td>(03)996-5300</td><td>宜蘭縣蘇澳鎮蘇港路 215 號</td></tr>
    <tr><td>礁溪就業服務台</td><td>(03)988-3234</td><td>(03)988-3234</td><td>宜蘭縣礁溪鄉中山路二段 3 號</td></tr>
    <tr><td>瑞穗就業服務台</td><td>(03)887-0507</td><td>(03)887-0507</td><td>花蓮縣瑞穗鄉成功南路 19 號</td></tr>
    <tr><td>壽豐就業服務台</td><td>(03)865-0885</td><td>(03)865-0885</td><td>花蓮縣壽豐鄉壽山路 26 號</td></tr>
    <tr><td>冬山就業服務台</td><td>(03)959-6490</td><td>(03)959-6490</td><td>宜蘭縣冬山鄉冬山路 100 號</td></tr>
    <tr><td>秀林就業服務台</td><td>(03)861-0803</td><td>(03)861-0803</td><td>花蓮縣秀林鄉秀林村 12 鄰 62 號</td></tr>
    <tr><td>五結就業服務台</td><td>(03)950-9912</td><td>(03)950-9912</td><td>宜蘭縣五結鄉五結路二段 343 號</td></tr>
    <tr><td>吉安就業服務台</td><td>(03)852-9886</td><td>(03)852-9886</td><td>花蓮縣吉安鄉吉安村吉安路二段 116 號</td></tr>
    <tr><td>光復就業服務台</td><td>(03)870-0226</td><td>(03)870-0226</td><td>花蓮縣光復鄉中山路一段 216 巷 8 號</td></tr>
    <tr><td>銀髮人才資源中心</td><td>(02)7730-8878</td><td>(02)2231-0109</td><td>新北市永和區自由街 64 號 1 樓</td></tr>
    <tr><td>臺北青年職涯發展中心</td><td>(02)2977-0755</td><td>(02)2977-0765</td><td>新北市三重區重新路 4 段 12 號 3 樓</td></tr>
  </tbody>
</table>
```
```css
table {
  width: calc(100% - 20px);
  line-height: 2rem;
  margin: 10px;
  font-family: 'microsoft jhenghei';
  border-bottom: 2px solid #000;
}
thead {
  background: black;
  color: white;
}
tbody>tr:nth-child(even) {
  background: lightgray;
}
td {
  padding: 0 5px;
}
```

RWD 關鍵為

```css
@media (max-width: 576px) {
  table>thead th:nth-last-child(2),
  table>tbody td:nth-last-child(2) {
    display: none;
  }
}
@media (max-width: 960px) {
  table>thead th:last-child,
  table>tbody td:last-child {
    display: none;
  }
}
```

### RWD Table 方法 2
打破 table 排版變成另一個形式。這裡 HTML 需要調整一下前例結構添加自訂`data-*`，CSS 則免調整。

```html
<table>
  <thead>
    <tr><th>服務站名</th><th>電話</th><th>傳真</th><th>地址</th></tr>
  </thead>
  <tbody>
    <tr><td data-head="服務站名">北基宜花金馬分署</td><td data-head="電話">(02)8995-6399</td><td data-head="傳真">(02)8995-6398</td><td data-head="地址">新北市新莊區中平路 439 號南棟 3 樓</td></tr>
    <tr><td data-head="服務站名">基隆就業中心</td><td data-head="電話">(02)2422-5263</td><td data-head="傳真">(02)2428-1514</td><td data-head="地址">基隆市中正區中正路 102 號</td></tr>
    <tr><td data-head="服務站名">羅東就業中心</td><td data-head="電話">(03)954-2094</td><td data-head="傳真">(03)957-6435</td><td data-head="地址">宜蘭縣羅東鎮中正北路 50 號 1、2 樓</td></tr>
    <tr><td data-head="服務站名">基隆就業中心六堵分站</td><td data-head="電話">(02)2451-5020</td><td data-head="傳真">(02)2452-8501</td><td data-head="地址">基隆市七堵區工建北路 1 之 2 號</td></tr>
    <tr><td data-head="服務站名">花蓮就業中心</td><td data-head="電話">(03)832-3262</td><td data-head="傳真">(03)835-6927</td><td data-head="地址">花蓮縣花蓮市國民三街 25 號</td></tr>
    <tr><td data-head="服務站名">連江就業中心</td><td data-head="電話">(0836)23576</td><td data-head="傳真">(0836)26304</td><td data-head="地址">連江縣南竿鄉介壽村 47-4 號</td></tr>
    <tr><td data-head="服務站名">玉里就業中心</td><td data-head="電話">(03)888-2033</td><td data-head="傳真">(03)888-6140</td><td data-head="地址">花蓮縣玉里鎮莊敬路 8 號 2 樓</td></tr>
    <tr><td data-head="服務站名">金門就業中心</td><td data-head="電話">(082)31-1119</td><td data-head="傳真">(082)31-1120</td><td data-head="地址">金門縣金城鎮民權路 173 號</td></tr>
    <tr><td data-head="服務站名">頭城就業服務台</td><td data-head="電話">(03)977-1650</td><td data-head="傳真">(03)977-1650</td><td data-head="地址">宜蘭縣頭城鎮開蘭路 1 號</td></tr>
    <tr><td data-head="服務站名">員山就業服務台</td><td data-head="電話">(03)923-2880</td><td data-head="傳真">(03)923-2880</td><td data-head="地址">宜蘭縣員山鄉員山路一段 322 號</td></tr>
    <tr><td data-head="服務站名">蘇澳就業服務台</td><td data-head="電話">(03)996-5300</td><td data-head="傳真">(03)996-5300</td><td data-head="地址">宜蘭縣蘇澳鎮蘇港路 215 號</td></tr>
    <tr><td data-head="服務站名">礁溪就業服務台</td><td data-head="電話">(03)988-3234</td><td data-head="傳真">(03)988-3234</td><td data-head="地址">宜蘭縣礁溪鄉中山路二段 3 號</td></tr>
    <tr><td data-head="服務站名">瑞穗就業服務台</td><td data-head="電話">(03)887-0507</td><td data-head="傳真">(03)887-0507</td><td data-head="地址">花蓮縣瑞穗鄉成功南路 19 號</td></tr>
    <tr><td data-head="服務站名">壽豐就業服務台</td><td data-head="電話">(03)865-0885</td><td data-head="傳真">(03)865-0885</td><td data-head="地址">花蓮縣壽豐鄉壽山路 26 號</td></tr>
    <tr><td data-head="服務站名">冬山就業服務台</td><td data-head="電話">(03)959-6490</td><td data-head="傳真">(03)959-6490</td><td data-head="地址">宜蘭縣冬山鄉冬山路 100 號</td></tr>
    <tr><td data-head="服務站名">秀林就業服務台</td><td data-head="電話">(03)861-0803</td><td data-head="傳真">(03)861-0803</td><td data-head="地址">花蓮縣秀林鄉秀林村 12 鄰 62 號</td></tr>
    <tr><td data-head="服務站名">五結就業服務台</td><td data-head="電話">(03)950-9912</td><td data-head="傳真">(03)950-9912</td><td data-head="地址">宜蘭縣五結鄉五結路二段 343 號</td></tr>
    <tr><td data-head="服務站名">吉安就業服務台</td><td data-head="電話">(03)852-9886</td><td data-head="傳真">(03)852-9886</td><td data-head="地址">花蓮縣吉安鄉吉安村吉安路二段 116 號</td></tr>
    <tr><td data-head="服務站名">光復就業服務台</td><td data-head="電話">(03)870-0226</td><td data-head="傳真">(03)870-0226</td><td data-head="地址">花蓮縣光復鄉中山路一段 216 巷 8 號</td></tr>
    <tr><td data-head="服務站名">銀髮人才資源中心</td><td data-head="電話">(02)7730-8878</td><td data-head="傳真">(02)2231-0109</td><td data-head="地址">新北市永和區自由街 64 號 1 樓</td></tr>
    <tr><td data-head="服務站名">臺北青年職涯發展中心</td><td data-head="電話">(02)2977-0755</td><td data-head="傳真">(02)2977-0765</td><td data-head="地址">新北市三重區重新路 4 段 12 號 3 樓</td></tr>
  </tbody>
</table>
```

RWD 關鍵為
```css
@media (max-width: 960px) {
  thead {
    display: none;
  }
  tr {
    display: block;
    border: 1px solid #000;
  }
  td {
    padding-left: 30%;
    position: relative;
    display: block;
  }
  td::before {
    content: attr(data-head);
    font-weight: bold;
    position: absolute;
    left: 2%;
    width: 28%;
  }
}
```