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

![](assets/images/lElmG8a.png)

CSS 的最後一篇基本課程，收錄一些偏於動態或視覺效果的 CSS 屬性，也提及到 CSS 動畫與轉場的動態播放，以及跨平台十分重要的 Media Query 媒體查詢。這些都算是能讓 CSS 更生動豐富且靈活，使網頁體驗上更有感受。

<!-- more -->

# 變形 Transform

CSS 變形（Transform）屬性可讓元素進行平移、縮放、旋轉、傾斜等視覺變化，常用於動畫、互動效果與版面調整。變形不會影響其他元素的排版，僅改變自身的呈現方式。現代瀏覽器皆已完整支援 2D 與 3D 變形。CSS 變形讓網頁元素能夠進行動態視覺變化，提升互動性與設計彈性。常見應用如按鈕點擊縮放、圖片旋轉、卡片翻轉等，都是利用 transform 屬性實現。

{% note info %}
**學習重點**
在學習 CSS 變形之前，請先理解以下核心概念：
- 變形只改變元素的視覺呈現，不影響文件流
- 2D 變形包含平移、縮放、旋轉、傾斜四大基本操作
- 3D 變形需要設定透視點（perspective）才能看到立體效果
- 變形原點（transform-origin）決定變形的參考中心點
{% endnote %}

## 觀念解釋

transform 屬性可同時套用多種變形函式，語法如下：

```css
transform: translate(50px, 20px) scale(1.2) rotate(45deg) skew(10deg, 5deg);
```
- 多個函式以空格分隔，依序套用。
- 變形不會影響元素在文件流中的位置（不會推擠其他元素）。

{% note info %}
**小技巧：硬體加速**
部分 transform（如 translate3d）可觸發 GPU 加速，提升動畫效能。
{% endnote %}

## 函式說明

| 函式        | 說明     | 範例                       |
| ----------- | -------- | -------------------------- |
| translate   | 平移     | translate(10px, 20px)      |
| scale       | 縮放     | scale(1.5, 0.5)            |
| rotate      | 旋轉     | rotate(45deg)              |
| skew        | 傾斜     | skew(10deg, 5deg)          |
| matrix      | 矩陣變形 | matrix(1, 0, 0, 1, 30, 20) |
| perspective | 3D 透視  | perspective(500px)         |
| translate3d | 3D 平移  | translate3d(10px,0,20px)   |
| scale3d     | 3D 縮放  | scale3d(1,2,1)             |
| rotate3d    | 3D 旋轉  | rotate3d(1,1,0,45deg)      |

## 完整示範
在本節中，我們將透過實際範例，展示 CSS transform 屬性的各種常見用法，包括平移（translate）、縮放（scale）、旋轉（rotate）、傾斜（skew）等。每個範例都會搭配說明，幫助你理解 transform 如何影響元素的外觀與位置，並能靈活運用於網頁互動設計中。

```html
<style>
  .transform-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 1024px;
    height: 600px;
    margin: 2rem auto;
    justify-items: center;
    align-items: center;
  }

  .grid-item {
    border: 1px solid #000;
    padding: 1rem;
    border-radius: 10px;
  }

  .transform-base {
    border: 1px solid #000;
    width: 100px;
    height: 100px;
    background: #4e91f9;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    border-radius: 12px;
    margin: 0 auto;
    box-shadow: 0 2px 8px #0002;
    /* 不加 transition，純粹展示 transform */
  }

  .transform-translate {
    transform: translate(20px, 10px);
  }

  .transform-scale {
    transform: scale(1.3, 0.7);
  }

  .transform-rotate {
    transform: rotate(25deg);
  }

  .transform-skew {
    transform: skew(20deg, 0deg);
  }

  .transform-origin {
    transform-origin: left bottom;
    transform: rotate(-30deg);
  }

  .transform-label {
    text-align: center;
    margin-top: 0.5rem;
    color: #333;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
  }

  .advanced-matrix {
    transform: matrix(1, 0.2, 0.2, 1, 20, 10);
  }

  .advanced-perspective-box {
    transform: perspective(120px) rotateY(30deg);
  }

  .advanced-translate3d {
    transform: translate3d(20px, 10px, 30px);
  }

  .advanced-scale3d {
    transform: scale3d(1.2, 0.8, 1.5);
  }

  .advanced-rotate3d {
    transform: rotate3d(1, 1, 0, 45deg);
  }
</style>
<div class="transform-grid">
  <div class="grid-item">
    <div class="transform-base">預設</div>
    <div class="transform-label">無 transform</div>
  </div>
  <div class="grid-item">
    <div class="transform-base transform-translate">translate</div>
    <div class="transform-label">平移</div>
  </div>
  <div class="grid-item">
    <div class="transform-base transform-scale">scale</div>
    <div class="transform-label">縮放</div>
  </div>
  <div class="grid-item">
    <div class="transform-base transform-rotate">rotate</div>
    <div class="transform-label">旋轉</div>
  </div>
  <div class="grid-item">
    <div class="transform-base transform-skew">skew</div>
    <div class="transform-label">傾斜</div>
  </div>
  <div class="grid-item">
    <div class="transform-base transform-origin">origin</div>
    <div class="transform-label">變形原點</div>
  </div>
  <div class="grid-item">
    <div class="transform-base advanced-matrix">matrix</div>
    <div class="advanced-label">矩陣變形</div>
  </div>
  <div class="grid-item">
    <div class="transform-base advanced-perspective-box">perspective</div>
    <div class="advanced-label">3D 透視</div>
  </div>
  <div class="grid-item">
    <div class="transform-base advanced-translate3d">translate3d</div>
    <div class="advanced-label">3D 平移</div>
  </div>
  <div class="grid-item">
    <div class="transform-base advanced-scale3d">scale3d</div>
    <div class="advanced-label">3D 縮放</div>
  </div>
  <div class="grid-item">
    <div class="transform-base advanced-rotate3d">rotate3d</div>
    <div class="advanced-label">3D 旋轉</div>
  </div>
</div>
```

{% note warning %}
**注意事項**
transform 只改變元素的視覺呈現，不會影響實際佔位與文件流。若需改變排版，請搭配 position 或 margin 使用。

- **matrix**：可同時進行多種 2D 變形（平移、縮放、傾斜、旋轉），但語法較不直觀，通常由 [工具產生](https://angrytools.com/css-generator/transform/)。
- **perspective**：給予 3D 變形時的「景深」效果，需搭配 3D 變形函式（如 rotateY）。
- **translate3d/scale3d/rotate3d**：分別為 3D 空間的平移、縮放、旋轉，第三個參數為 z 軸。
{% endnote %}

## 精選範例

### 漂浮卡片陰影
```html index.html
<style>
body{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.card-float {
  width: 200px;
  height: 120px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px #0002;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin: 2rem auto;
  transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s;
}
.card-float:hover {
  transform: translateY(-16px) scale(1.05) rotate(-2deg);
  box-shadow: 0 8px 32px #0003;
}
</style>
<div class="card-float">滑鼠移上來！</div>
```

### 3D 翻轉卡片

```html index.html
<style>
body{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.flip-card {
  width: 180px;
  height: 120px;
  perspective: 800px;
  margin: 2rem auto;
}
.flip-card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(.4,2,.6,1);
  transform-style: preserve-3d;
  position: relative;
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%; height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
}
.flip-card-front {
  background: #4e91f9; color: #fff;
}
.flip-card-back {
  background: #fff; color: #4e91f9;
  transform: rotateY(180deg);
  border: 1px solid #4e91f9;
}
</style>
<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">前面</div>
    <div class="flip-card-back">背面</div>
  </div>
</div>
```

### 漸進式縮放按鈕

```html index.html
<style>
.btn-zoom {
  padding: 0.8em 2em;
  background: linear-gradient(90deg, #4e91f9, #6dd5ed);
  color: #fff;
  border: none;
  border-radius: 32px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(.4,2,.6,1);
}
.btn-zoom:hover {
  transform: scale(1.15) rotate(-3deg);
}
</style>
<button class="btn-zoom">Zoom Me</button>
```

{% note success %}
**跟著做：Transform 練習**
1. 嘗試修改上述範例中的數值，觀察不同效果
2. 練習組合多個 transform 函式
3. 實驗不同的 transform-origin 設定
4. 嘗試製作自己的 3D 翻轉效果
{% endnote %}

---

# 轉場 Transition

CSS 轉場（Transition）屬性可讓元素在屬性值變化時，產生平滑的動畫過渡效果。常見應用如滑鼠移入按鈕時顏色、大小、透明度等變化，讓網頁互動更自然、流暢。轉場的核心概念是「從一個狀態平滑過渡到另一個狀態」，不需額外寫 JavaScript，只要設定好屬性即可。

{% note primary %}
**素材準備：**
在學習 CSS 轉場之前，請準備以下基礎知識：
- 了解 CSS 選擇器與偽類（:hover、:focus、:active）
- 熟悉基本的 CSS 屬性（color、background、width、height 等）
- 理解時間單位（秒 s、毫秒 ms）與速度曲線概念
{% endnote %}

## 觀念解釋

- 轉場通常搭配偽類（如 :hover、:focus、:active）或 class 切換使用。
- 只要有屬性值變化，且該屬性有 transition 設定，就會產生動畫效果。
- 轉場不會自動重複播放，僅在屬性值變化時觸發。

{% note warning %}
**重要觀念：transition 必須寫在「變化前」的狀態**

transition 屬性必須寫在預設狀態（如原本的 class 或 :hover 前），這樣不論「進入」或「返回」都會有動畫效果。

如果只寫在變化後的 class（如 .active），當 class 被移除時，transition 也會消失，返回時就沒有動畫。

**正確寫法：**
```css
.box {
  transition: background 0.4s;
}
.box:hover {
  background: #6dd5ed;
}
```

**錯誤寫法：**
```css
.box:hover {
  transition: background 0.4s;
  background: #6dd5ed;
}
```
這樣只有滑鼠移入有動畫，移出時就沒有。
{% endnote %}

{% note info %}
**小技巧：哪些屬性能轉場？**  
大多數數值型屬性（如 color、background-color、width、height、opacity、transform 等）都能平滑過渡，但 display、position 等無法 transition。

**可 transition 的屬性類型舉例：**
- **長度單位**：px、em、rem、%、vw、vh 等（如 width、height、margin、padding）
- **角度單位**：deg、rad（如 rotate、skew）
- **顏色型**：色碼（#fff、#123456）、rgb、rgba、hsl、hsla（如 color、background-color、border-color）
- **透明度**：opacity
- **transform**：translate、scale、rotate、skew 等
- **其他**：box-shadow、border-radius、letter-spacing、line-height ...

**無法 transition 的屬性：**
- display、position、float、z-index、visibility ...
{% endnote %}

## 語法說明

| 屬性                         | 預設值 | 說明                                                         |
| ---------------------------- | ------ | ------------------------------------------------------------ |
| `transition-property`        | all    | 指定哪些 CSS 屬性受過渡轉場效果                              |
| `transition-duration`        | 0      | 轉場持續時間（秒 s 或毫秒 ms）                               |
| `transition-timing-function` | ease   | 速度曲線（如 ease、linear、ease-in、ease-out、cubic-bezier） |
| `transition-delay`           | 0      | 延遲多久後才開始轉場                                         |

**縮寫語法：**
```css
transition: property duration timing-function delay;
```
例如：
```css
transition: background-color 0.4s ease-in 0s;
```

## 範例展示
CSS transition 主要用於讓屬性值的變化過程變得平滑自然，常見於滑鼠移入、點擊、聚焦等互動時，讓網頁元素的顏色、大小、透明度等產生動畫效果。接下來將透過多個實用範例，幫助你掌握 transition 的語法與實際應用方式。

### 基本轉場：滑鼠移入改變背景色

```html index.html
<style>
.btn-transition {
  padding: 1em 2em;
  background: #4e91f9;
  color: #fff;
  border: none;
  border-radius: 32px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.4s, color 0.4s;
}
.btn-transition:hover {
  background: #6dd5ed;
  color: #222;
}
</style>
<button class="btn-transition">滑鼠移上來</button>
```

### 多屬性轉場：同時改變大小與圓角

```html index.html
<style>
.box-transition {
  width: 100px;
  height: 100px;
  background: #fbc531;
  border-radius: 8px;
  margin: 2rem auto;
  transition: width 0.5s, height 0.5s, border-radius 0.5s;
}
.box-transition:hover {
  width: 180px;
  height: 60px;
  border-radius: 32px;
}
</style>
<div class="box-transition"></div>
```

### transform 結合 transition

```html index.html
<style>
.demo-transform-transition {
  width: 100px;
  height: 100px;
  background: #44bd32;
  margin: 2rem auto;
  border-radius: 12px;
  transition: transform 0.5s cubic-bezier(.4,2,.6,1);
}
.demo-transform-transition:hover {
  transform: scale(1.2) rotate(10deg);
}
</style>
<div class="demo-transform-transition"></div>
```

### 延遲與自訂速度曲線

```html index.html
<style>
.delay-demo {
  width: 100px;
  height: 100px;
  background: #e17055;
  margin: 2rem auto;
  border-radius: 12px;
  transition: background 0.3s 0.5s, border-radius 0.6s cubic-bezier(.68,-0.55,.27,1.55);
}
.delay-demo:hover {
  background: #00b894;
  border-radius: 50%;
}
</style>
<div class="delay-demo"></div>
```

{% note warning %}
**注意事項**  
- transition 只會在屬性值「變化」時觸發，初始狀態不會自動播放。
- 無法 transition 的屬性（如 display、position）不會有動畫效果。
- 多屬性 transition 時，建議明確列出每個屬性，避免瀏覽器預設 all 造成效能浪費。
{% endnote %}

{% note success %}
**跟著做：Transition 練習**
1. 嘗試修改 transition 的時間與速度曲線
2. 練習為不同屬性設定不同的 transition 時間
3. 實驗 transition-delay 的延遲效果
4. 結合 transform 製作更豐富的互動效果
{% endnote %}

---

# 動畫 Animation

CSS 動畫（Animation）屬性可讓元素自動播放一連串的動畫效果，無需使用 JavaScript。動畫可用於強調重點、吸引注意、製作 loading、icon 動畫等，現代網頁設計中非常常見。

{% note info %}
**動畫與轉場的差異**
在學習 CSS 動畫之前，請先理解動畫與轉場的主要差異：

**轉場（Transition）：**
- 需要觸發條件（如 :hover、class 切換）
- 只有兩個狀態（開始→結束）
- 無法循環播放
- 適合簡單的狀態變化

**動畫（Animation）：**
- 可自動播放，無需觸發
- 可設定多個關鍵影格
- 可循環播放（infinite）
- 適合複雜的動態效果
{% endnote %}

## 觀念解釋

- **動畫（animation）** 與 **轉場（transition）** 最大差異：
  - transition 只在「屬性值變化」時觸發，且需有互動（如 :hover、class 切換）。
  - animation 可自動循環播放，無需互動即可持續運作。
- 動畫可設定多個關鍵影格（keyframes），描述動畫過程中每個階段的狀態。
- 可同時設定多個動畫於同一元素。

{% note info %}
**小技巧：動畫與轉場何時用？**
- 需要「自動播放、循環、複雜動作」→ animation
- 只需「互動時平滑過渡」→ transition
{% endnote %}

## 語法說明
在 CSS 動畫中，必須先使用 `@keyframes` 定義動畫的關鍵影格（keyframes），描述動畫從開始到結束的每個階段狀態。接著，於目標元素上宣告 `animation` 屬性，指定要套用哪一個 keyframes 動畫，才能讓動畫效果生效。

### 宣告關鍵影格
在 CSS 動畫中，`@keyframes` 就像是一份「動畫腳本」，用來描述動畫從開始到結束的每個階段狀態。你可以將動畫過程切分為不同的「進度百分比」（例如 0%、50%、100%），在每個百分比設定元素的樣式，讓動畫能夠平滑地從一個狀態過渡到另一個狀態。

除了使用百分比外，`from` 和 `to` 也是常用的語法糖，分別代表 0%（起始）和 100%（結束）。這讓你可以更直覺地撰寫動畫腳本：

```css
@keyframes 動畫名稱 {
  0%   { /* 起始狀態 */ }
  50%  { /* 中間狀態 */ }
  100% { /* 結束狀態 */ }
}
```

{% note info %}
**from/to 的意義與省略說明**
- `from` 等同於 `0%`，`to` 等同於 `100%`，可混用百分比或 from/to。
- 只寫 `to`，則動畫從元素當前（或初始）屬性值過渡到 `to` 設定的狀態。
- 只寫 `from`，則動畫從 `from` 狀態到元素當前（或初始）屬性值。
- 若元素本身已設定初始屬性，@keyframes 可只寫 `to`，from 會自動以元素初始值為第一偵。

**範例：**
```css
@keyframes fadeIn {
  to { opacity: 1; }
}
// 元素初始 opacity: 0;，動畫會從 0 過渡到 1
```
{% endnote %}

### 套用動畫屬性
在 CSS 動畫中，除了必須指定動畫名稱（`animation-name`）與關鍵影格外，還有許多屬性可以細緻控制動畫的行為，例如動畫持續時間、延遲、播放次數、播放方向、加速度曲線、動畫結束時的狀態等。這些屬性可以單獨設定，也可以使用縮寫語法一次設定多個參數，讓動畫效果更加豐富且靈活。

{% note info %}
**小技巧：animation 屬性組合**
- animation 相關屬性可依需求單獨設定，也可用縮寫語法一次設定全部，提升程式碼簡潔度。
- 建議初學者先熟悉各屬性的意義，再嘗試縮寫語法。
{% endnote %}

```css
.selector {
  animation-name: 動畫名稱；
  animation-duration: 2s; /* 持續時間 */
  animation-timing-function: ease; /* 速度曲線 */
  animation-delay: 0s; /* 延遲 */
  animation-iteration-count: infinite; /* 播放次數 */
  animation-direction: alternate; /* 播放方向 */
  animation-fill-mode: both; /* 動畫前後狀態 */
}
```

`animation` 屬性可以將多個動畫相關設定合併為一行，語法如下：

```css
animation: 名稱 持續時間 速度曲線 延遲 次數 方向 填充；
```

### 常用屬性說明

| 屬性                      | 預設值  | 說明               | 範例值                                        |
| ------------------------- | ------- | ------------------ | --------------------------------------------- |
| animation-name            |         | 動畫名稱           | fadeIn、slide、myAnim                         |
| animation-duration        | 0       | 動畫持續時間       | 2s、500ms                                     |
| animation-timing-function | ease    | 動畫加速度函式     | ease、linear、ease-in、cubic-bezier(...)      |
| animation-delay           | 0       | 動畫延遲播放時間   | 0.5s、1s、-2s                                 |
| animation-iteration-count | 1       | 動畫播放次數       | 數字、infinite                                |
| animation-direction       | normal  | 動畫播放方向       | normal、reverse、alternate、alternate-reverse |
| animation-fill-mode       | none    | 動畫前後狀態       | none、forwards、backwards、both               |
| animation-play-state      | running | 動畫播放或暫停狀態 | running、paused                               |

{% note info %}
**animation-delay 負值說明**
- 當 animation-delay 設為負值時，動畫會「從中間某一進度」直接開始，而不是延遲。例如 animation-duration: 5s; animation-delay: -2s; 代表動畫一開始就從第 2 秒的影格播放，並在 3 秒後結束（5-2=3）。這常用於多個動畫交錯時，讓它們不同步。
{% endnote %}

{% note info %}
**animation-direction 各選項說明**
- normal：每次都從頭到尾（0%→100%）
- reverse：每次都從尾到頭（100%→0%）
- alternate：奇數次正向（0%→100%），偶數次反向（100%→0%）
- alternate-reverse：奇數次反向（100%→0%），偶數次正向（0%→100%）
這些選項可讓動畫來回播放或只單向播放。
{% endnote %}

{% note info %}
**animation-fill-mode 用途與選項**
- none（預設）：動畫結束後恢復到原始狀態。
- forwards：動畫結束後停留在最後一格（100% 狀態）。
- backwards：動畫延遲期間就先套用起始格（0% 狀態）。
- both：同時套用 forwards 與 backwards 效果。
這對於希望動畫結束後保留最後狀態非常實用。
{% endnote %}

## 範例展示
CSS animation 可製作多種效果，以下為常見應用：

### 基本範例 1

```html index.html
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
  div.btn::after {
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

{% note warning %}
**注意事項**
- animation 會自動循環（若設 infinite），不需互動即可播放。
- animation-fill-mode: forwards 可讓動畫結束後停留在最後一格。
- 多動畫時，屬性值順序需與 animation 屬性順序對應。
- 動畫過多或過於複雜，可能影響效能，建議適量使用。
{% endnote %}

{% jsfiddle summer10920/d241xjvg result dark 100% 500 %}

{% note success %}
**跟著做：Animation 練習**
1. 嘗試修改 @keyframes 中的百分比與屬性值
2. 練習使用不同的 animation-direction 選項
3. 實驗 animation-fill-mode 的效果差異
4. 嘗試製作自己的 loading 動畫
{% endnote %}

# 媒體查詢 Media Query
媒體查詢（Media Query）是 CSS3 的一項強大功能，讓你可以根據不同裝置的螢幕寬度、高度、解析度、顏色模式等條件，動態切換不同的 CSS 樣式。這是響應式網頁設計（RWD）的基礎。

{% note primary %}
**學習目標**
在學習媒體查詢之前，請先了解以下核心概念：
- 響應式網頁設計（RWD）的基本原理
- 不同裝置的螢幕尺寸與特性
- CSS 選擇器與層疊規則
- 斷點（Breakpoint）的設計原則
{% endnote %}

## 觀念解釋
- 讓同一份 HTML 能在手機、平板、桌機等不同裝置上自動調整版型。
- 提升使用者體驗，讓內容在各種螢幕下都好閱讀。
- 可針對列印、深色模式、無障礙等需求做專屬樣式。

{% note info %}
**小技巧：常見斷點設計**
- 手機：max-width: 768px
- 平板：min-width: 769px and max-width: 1024px  
- 桌機：min-width: 1025px
- 大螢幕：min-width: 1200px
{% endnote %}

## 語法說明
媒體查詢（Media Query）的語法主要是利用 `@media` 關鍵字，搭配條件（如螢幕寬度、裝置類型等）來指定特定情境下要套用的 CSS 樣式。這讓我們可以針對不同裝置或環境，靈活調整網頁的外觀與排版。媒體查詢的基本語法如下：

### 宣告方式與位置
在 CSS 中，媒體查詢（Media Query）可以用多種方式撰寫，包含直接在 CSS 檔案內部、HTML 的 `<link>` 標籤、或是使用 `@import`。選擇合適的寫法與位置，能讓你的樣式更有彈性，也方便維護大型專案。

#### CSS 內部寫法

```css
@media 條件 {
  /* 這裡的 CSS 只會在條件成立時生效 */
}
```
**範例：**
```css
@media (max-width: 600px) {
  body { background: #fbc531; }
}
/* 當螢幕寬度小於等於 600px 時，body 背景變黃色。 */
```

#### HTML link 標籤用法

```html
<link rel="stylesheet" media="(max-width: 600px)" href="mobile.css" >
<!-- 這樣只有在螢幕寬度小於等於 600px 時才會載入 mobile.css。 -->
<link rel="stylesheet" media="screen" href="style.css">
<!-- 這樣只有在螢幕模式下才會載入 mobile.css。 -->
<link rel="stylesheet" media="print" href="print.css">
<!-- 這樣只有在列印模式下才會載入 mobile.css。 -->
```

#### @import 寫法

```css
@import url('print.css') print;
/* 這樣只有在列印時才會載入 print.css。 */
```

### 媒體查詢的條件類型
媒體查詢（Media Query）可以根據不同的條件來套用對應的 CSS 樣式。這些條件主要分為「媒體類型」與「媒體特性」，讓我們能夠針對裝置的類型、螢幕尺寸、解析度等多種情境，靈活調整網頁的外觀。以下將介紹常見的媒體查詢條件類型與其應用方式。

#### 媒體類型（Media Type）

| 類型   | 說明                     |
| ------ | ------------------------ |
| all    | 所有裝置（預設）         |
| screen | 螢幕裝置（手機、電腦等） |
| print  | 列印裝置                 |
| speech | 朗讀裝置                 |

> **小技巧**：大多數情況下可省略 `all`，直接寫特性條件即可。

#### 媒體特性（Media Features）

| 特性          | 說明                     | 範例                         |
| ------------- | ------------------------ | ---------------------------- |
| width/height  | 螢幕寬高                 | (max-width: 600px)           |
| orientation   | 直向/橫向                | (orientation: portrait)      |
| resolution    | 解析度（dpi, dppx）      | (min-resolution: 2dppx)      |
| aspect-ratio  | 長寬比                   | (aspect-ratio: 16/9)         |
| color-scheme  | 色彩模式（亮/暗）        | (prefers-color-scheme: dark) |
| pointer/hover | 指標裝置、是否支援 hover | (hover: hover)               |

> **常見誤區**：`max-width` 是「小於等於」而不是「小於」！

### 媒體查詢條件組合

媒體查詢可以用下列方式組合多個條件：

- **AND（且）**：所有條件都需成立，語法為 `@media 條件 1 and 條件 2`
- **OR（或）**：任一條件成立即可，語法為 `@media 條件 1, 條件 2`
- **NOT（非）**：排除某條件，語法為 `@media not 條件`

```css
/* AND：螢幕且寬度小於等於 768px 時生效 */
@media screen and (max-width: 768px) {
  /* 這裡的 CSS 只會在螢幕且寬度小於等於 768px 時生效 */
}

/* OR：螢幕寬度小於等於 600px 或列印時生效 */
@media (max-width: 600px), print {
  /* 這裡的 CSS 只要符合任一條件就會生效 */
}

/* NOT：僅在非列印裝置且螢幕寬度小於等於 600px 時生效 */
@media not print and (max-width: 600px){
  /* 只有在非列印裝置且螢幕寬度小於等於 600px 時，這裡的 CSS 才會生效 */
}
```

## 範例展示
在本節中，我們將透過實際的 CSS 媒體查詢（Media Query）範例，說明如何根據不同裝置或螢幕寬度調整網頁樣式。這些範例有助於你理解 RWD（響應式網頁設計）的基本應用方式，並能靈活運用於各種專案中。

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

### 斷點切換版型（兩欄→單欄）

```html
<style>
.container { display: flex; }
.left, .right { flex: 1; min-width: 0; padding: 1rem; }
.left { background: #fbc531; }
.right { background: #4e91f9; color: #fff; }
@media (max-width: 768px) {
  .container { flex-direction: column; }
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
<style>
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
</style>
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