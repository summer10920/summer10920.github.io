---
title: "Bootstrap 4.4：元件"
categories:
  - 前端
  - Bootstrap
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - Bootstrap
date: 2020-03-30 17:15:31
---
![](assets/images/banner/bootstrap.png)

Components 元件的資訊量很大，但不需要特別背誦，只要知道有哪些元件可以選用，需要時複製範例再修改，用來點綴網頁即可。

<!-- more -->

{% note warning %}
**版本提醒**
本文使用 Bootstrap 4.4（2020 年）。Bootstrap 5 已於 2021 年發布，元件部分的主要差異包含：移除 jQuery 依賴，`data-toggle`、`data-dismiss` 等屬性改為 `data-bs-toggle`、`data-bs-dismiss`；移除 Jumbotron、Media object 與 `.card-deck`；表單的 `.custom-*` 與 `.form-group` 重新設計；`.badge-*` 改為 `.bg-*`、`.close` 改為 `.btn-close`。新專案請參考 {% post_link bootstrap-5-components Bootstrap 5 教學（三） %}；本文仍可作為維護舊專案時的參考。
{% endnote %}

---

# 元件 Components
元件是 Bootstrap 最多元也最複雜的部分，設計了許多好用、經典又耐看的模組，會用到大量的 class 公式與多層的元素包裝。部分元件有動態互動，需要用到 jQuery，因此需要具備一定的 JS 程度，並務必引入 `bootstrap.js` 與 jQuery（因為 `bootstrap.js` 是以 jQuery 開發並透過它觸發）。另外，`popper.js` 是 Bootstrap 會用到的另一個 JS 外掛。

```html
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
```

## 警報 Alert
你可能在不少網站看過：alert 是一個滿寬的色塊，用來提供文字訊息。範例如下：

```html https://getbootstrap.com/docs/4.4/components/alerts/#link-color
<div class="alert alert-primary" role="alert">
  A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
```

```html https://getbootstrap.com/docs/4.4/components/alerts/#additional-content
<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Well done!</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
```

> `role="alert"` 是語意屬性（讓輔助工具辨識，有助於無障礙），代表這是向使用者傳遞警報的文字區塊，非必要可以省略。

### 公式說明
```css
.alert /* 產生一個滿寬的警報型文字框 */
.alert-{color}   /* 填上粉系的背景色，你可以反向當作背景色公式通用在其他領域上 */
color: primary, secondary, success, danger, warning, info, light, dark

.alert-link /* 自動在對應的背景色上產生適合的字色，同時加粗體讓連結能明顯於文字上 */
.alert-heading /* 設定 color: inherit 沒有意義，官方說明有需要可以自訂參數效果 */
```

Alert 也能動態關閉（所謂的觸發效果，其實就是你已經學過的 JS 動態建立與移除 DOM），範例中提供了關閉按鈕，可關閉對應的 DOM。Bootstrap 利用自訂屬性`data-dismiss="alert"`觸發 alert 事件

```html https://getbootstrap.com/docs/4.4/components/alerts/#dismissing
<div class="alert alert-warning alert-dismissible fade show">
  You should check in on some of those fields below.You should check in on some of those fields below.You should check in on some of those fields below.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">×</button>
</div>
```

```css
.alert-dismissible /* padding-right:4rem 避免文字壓到關閉按鈕 */
.fade .show /*提供 DOM 轉場變化，產生滑出且緩慢效果*/

data-dismiss="alert" /* 固定寫法，觸發 Bootstrap.js 的 alert 點擊事件，會向上層尋找 class=alert 對象後關閉它 */
aria-label="Close" /*可省略，語意用*/
```

### JS 事件操作
Alert 也提供 JS 操作的方法，可以整合到自己的 JS 腳本中，範例如下：

1. 偵測到某個 JQ 對象觸發 alert close 按鈕之事件

```html
<div class="alert alert-warning alert-dismissible fade show">
  alert first <button type="button" class="close" data-dismiss="alert">×</button>
</div>
<div class="alert alert-warning alert-dismissible fade show">
  alert second <button type="button" class="close" data-dismiss="alert">×</button>
</div>
<script>
  //close 觸發事件的函式用法
  $(".show").on("closed.bs.alert", function () {
    console.log("觸發 JS 動作時機為：close 結束後");
  });
  $(".show").on("close.bs.alert", function () {
    console.log("觸發 JS 動作時機為：close 發生當下");
  });
</script>
```

2. 使用 JS 指令直接對某 JQ 對象的`[data-dismiss]`進行 alert close 之動作

```js
//透過 JQ 選擇器找到該處執行 alert 事件之 close 行為，向上層（包含自己）尋找 class=alert 對象然後關閉它 */
$('.show').alert('close'); //選擇器填什麼都可以只要能向上找到。alert 對象
```

## 標籤 Badge
Badge 是 `inline-block` 的文字標籤，帶有背景色與圓角，可以輕易放在任何標籤的文字後面，作為標記用途。如果套用在有 hover 或 focus 狀態的元素上，背景色會自動跟著變化。

```html https://getbootstrap.com/docs/4.4/components/badge/#example
<h1>Example heading <span class="badge badge-secondary">New</span></h1>

<button type="button" class="btn btn-primary">
  Notifications <span class="badge badge-light badge-pill">4</span>
</button>

<a href="#" class="badge badge-primary">Primary</a>
```

### 公式說明
```css
.badge /* 變成 inline-block */
.badge-{color}   /* 替換底色字色 */
color: primary, secondary, success, danger, warning, info, light, dark

.badge-pill /* 框線為膠囊形狀 */
```

## 麵包屑 breadcrumb
用來顯示網站的瀏覽路徑，會自動在 `li` 之間加入 <kbd>/</kbd> 分隔符號。

```html https://getbootstrap.com/docs/4.4/components/breadcrumb/#example
 <nav aria-label="breadcrumb">  <!--這層主要是網頁語意用，告知為麵包屑，可省略 -->
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>
```

### 公式說明

```css
.breadcrumb /* 規劃滿寬灰底的區域 in parent */
.breadcrumb-item /* 麵包屑的子物件 in son */
.active /*標示為灰字*/
```
> `aria-current="page"` 是語意用途，用來告知目前所在的頁面，可以省略。

## 按鈕 Buttons
按鈕是 Bootstrap 最具代表性的元件，除了美化 `button` 標籤，也能把任何元素包裝成按鈕，並具有 hover 效果。

### 公式說明
```css
.btn /* 外觀變化為按鈕型態 */
.btn-{color} /* 填上底色 */
color: primary, secondary, success, danger, warning, info, light, dark, link

.btn-outline-{color} /* 另一種外框填色模式，背景為摟空 */
color: primary, secondary, success, danger, warning, info, light, dark

.btn-lg /* 大按鈕 */
.btn-sm /* 小按鈕 */
.btn-block /* 為 block 型態滿寬 */

.active /* 點選中的效果，顏色較深 */
.disabled /* 取消的效果，顏色較暗且沒有 hover 反應 */
```

### JS 事件操作
加上指定的屬性後，按鈕會透過 JS 互動產生 `.active` 反應（顏色變化），可用來做開關（ON/OFF）切換效果，適用於表單類型的元素。

**切換狀態：**
加上屬性 `data-toggle="button"` 就能切換狀態；若初始就要是作用中，需要先寫好 `.active` 與語意屬性 `aria-pressed="true"`。

```html https://getbootstrap.com/docs/4.4/components/buttons/#toggle-states
<button type="button" class="btn btn-primary active" data-toggle="button" aria-pressed="true">Single toggle</button>
```

**選取方塊：**
如果是表單的 `<label>` 項目（或多個設計為單選），需要一個上層的 `div.btn-group-toggle` 包住，效果與前面的切換一致，差別在於 `.active` 是設定在其中一個子元素上。

```html https://bootstrap.hexschool.com/docs/4.2/components/buttons/#checkbox-and-radio-buttons
<!-- 各自 label 獨立的切換 -->
<div class="btn-group-toggle" data-toggle="buttons">
  <label class="btn btn-primary active">
    <input type="checkbox" checked autocomplete="off"> Checked
  </label>
  <label class="btn btn-primary">
    <input type="checkbox" autocomplete="off"> Checked
  </label>
</div>
<!--  autocomplete="off"屬性的設定，為不需要讓瀏覽器自動填寫此欄位 -->

<!-- 同一 label 共組的切換 -->
<div class="btn-group btn-group-toggle" data-toggle="buttons">
  <label class="btn btn-secondary active">
    <input type="radio" name="options" id="option1" checked> Active
  </label>
  <label class="btn btn-secondary">
    <input type="radio" name="options" id="option2"> Radio
  </label>
  <label class="btn btn-secondary">
    <input type="radio" name="options" id="option3"> Radio
  </label>
</div>
```

> 另外提供 JS 指令控制方法為`$().button('toggle')`。

## 按鈕群組 Button Group
用一個父元素 `div.btn-group` 把多個按鈕組合起來，讓畫面呈現為緊密相連的按鈕群組。之後的 input-group 元件邏輯也相同。

```html https://getbootstrap.com/docs/4.4/components/button-group/#basic-example
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
```
> `role`、`aria-label`、`aria-labelledby` 屬性是給輔助工具判讀的語意設計。

### 公式說明
```css
.btn-group /* 將子元素的 btn 項目都群組化 */
.btn-group-lg /*將群組按鈕放大*/
.btn-group-sm /*將群組按鈕縮小*/
.btn-group-vertical /*將群組按鈕以縱向呈現*/
```

`.btn-group`裡面可以再包一個`.btn-group`，通常是為了整合出 dropdown 元件的應用。

```html https://getbootstrap.com/docs/4.4/components/button-group/#nesting
<div class="btn-group">
  <button class="btn btn-info">1</button>
  <button class="btn btn-info">2</button>

  <div class="btn-group">
    <button class="btn btn-info dropdown-toggle" data-toggle="dropdown">Dropdown</button>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Dropdown link</a>
    </div>
  </div>
</div>
```

## 卡片 Card
卡片是通用性很高的容器，裡面會放 `.card-body`，以及其他（非必要的）如 `.card-header`、`.card-footer` 或任何元素。部分元素可以搭配 class 公式美化，也很容易組合通用類別來強化視覺。

```html
<div class="card w-25">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
```

### 公式說明
```css
.card /*宣告在一個父元素上，能產生一個含框線之卡片容器*/

.card-body /*為主區域*/
.card-header /*頁首區域，灰底*/
.card-footer /*頁尾區域，灰底*/

/* 圖片元素要自己手動擺好，通常在 .card 容器內排序第一組之元素 */
.card-img-top /*修正圖片上方圓角*/
.card-img-bottom /*修正圖片下方圓角*/
.card-img /*修正圖片四邊皆為圓角*/

.card-img-overlay /* 是對內容（不是設定在圖片上）設定 position: absolute 產生浮力涵蓋整個 card 版面，讓圖片位於後面 */

.card-title /*標題美化*/
.card-subtitle /*次標題美化*/
.card-text /*文字美化*/

.card-link /*連結美化*/
.card-title /*標題字美化*/
```

### 其他應用方式
1. `div.card` 內不使用上列任何 class 也能呈現，會變成一個有邊框的卡片，仍可放入任何 BS 元件或 HTML 元素。
2. 可以把 Navs 元件放進 `.card-header`：在 `ul.nav.nav-tabs` 上加上 `.card-header-tabs` 即可融合在一起；另一種效果是 `.card-header-pills`。
  {% note default %}
    https://getbootstrap.com/docs/4.4/components/card/#navigation
  {% endnote %}
3. 結合 `row` 與 `col`，可以做出圖片在左、文字在右的水平排列效果。
  {% note default %}
    https://getbootstrap.com/docs/4.4/components/card/#horizontal
  {% endnote %}
4. 在 `.card` 搭配 `.bg-{color}`、`.text-{color}`、`.border-{color}`，能輕鬆變換配色。
  {% note default %}
    https://getbootstrap.com/docs/4.4/components/card/#card-styles
  {% endnote %}
5. 卡片可以群組化（緊密排成一列且高度一致，原理是 flexbox）：只要在這些 `div.card` 外層多包一個父元素 `div.card-group`。另外還有 `div.card-deck`（卡片之間有間隔）與 `div.card-columns`（瀑布式排列）。
  {% note default %}
    https://getbootstrap.com/docs/4.4/components/card/#card-layout
  {% endnote %}

## 輪播 Carousel
輪播常用於網站主視覺區的廣告幻燈片切換。Bootstrap 以 CSS 轉場搭配 JS 控制切換，預設每 5 秒轉場一次，滑鼠懸停（hover）時會暫停。使用時請注意以下事項：

### 基本呈現

1. 一定要有一個 `.carousel-item` 設定 `.active`，否則找不到初始要顯示的對象，整個輪播會失敗。
2. 輪播的是整個 `div.carousel-item` 元素而不是圖檔，理所當然輪播也能對文字有效。
3. `img` 最好加上 `.w-100`，與父元素同寬，否則圖片可能顯示不完整（溢出），導致轉場出問題。
4. 屬性 `data-ride="carousel"` 讓 `bootstrap.js` 在載入時啟動第一次轉場；若省略就不會自動輪播（仍可手動觸發轉場）。

```html 
<div class="w-50">
  <!-- 這裡圖片因為沒有 w-100 導致最後一張圖片左移退場時還看的到產生了錯誤視覺感 -->
  <div class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://picsum.photos/1920/300/?random=1">
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/300/?random=2">
      </div>
    </div>
  </div>
  <hr>
  <div class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://picsum.photos/1920/300/?random=1" class="w-100">
        <h1>111</h1>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/300/?random=2" class="w-100">
        <h1>222</h1>
      </div>
    </div>
  </div>
</div>
```

### 添加導覽鍵
在 `div.carousel.slide` 的裡面添加固定兩組 `a:link` 的規格語法。

1. 父容器需要綁定 id 才能被導覽鍵的 `a[href]` 對應控制。
2. 屬性 `[role="button"]` 是語意屬性，表示這是按鈕，可省略。
3. 屬性 `[aria-hidden=true]` 用來讓螢幕閱讀器略過此元素，可省略。
4. `.sr-only` 提供給螢幕閱讀器閱讀，整行可省略。
5. 屬性 `[data-slide="{prev|next}"]` 提供 Bootstrap.js 進行觸發行為，不可省。

```html
<div class="w-50">
  <div id="mycontrol" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://picsum.photos/1920/300/?random=1" class="w-100" />
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/300/?random=2" class="w-100" />
      </div>
    </div>

    <a class="carousel-control-prev" href="#mycontrol" data-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#mycontrol" data-slide="next">
      <span class="carousel-control-next-icon"></span>
    </a>
  </div>
</div>
```

### 添加導覽列
在 `div.carousel.slide` 的裡面添加固定的 `ol.carousel-indicators`>li 的規格語法。

1. 父容器需要綁定 id 才能被 li 對象的 `[data-target=*]` 所對應控制（因為沒有 `[href]` 可改用這個屬性當錨點）。
2. 屬性 `li[data-slide-to=*]` 告知導覽到第幾項目，最小值為 0。
3. 初始狀態下，建議設定 active 顯示中的元素，其對應的 li 項目也該是 active，目的是做效果對應。

```html
<div id="mycontrol" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://picsum.photos/1920/300/?random=1" class="w-100" />
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/1920/300/?random=2" class="w-100" />
    </div>
  </div>

  <a class="carousel-control-prev" href="#mycontrol" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#mycontrol" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>

  <ol class="carousel-indicators">
    <li data-target="#mycontrol" data-slide-to="0" class="active"></li>
    <li data-target="#mycontrol" data-slide-to="1"></li>
  </ol>
</div>
```

### 添加字幕（圖片上層區）
在 `.carousel-item` 輪播元素內添加 `div.carousel-caption`，該元素會浮貼在兄弟 img 之上層。

```html
<div id="mycontrol" class="w-100 carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://picsum.photos/1920/600/?random=1" class="w-100" />
      
      <div class="carousel-caption">
        <h1>First Header</h1>
        <p>nice to meet you</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/1920/600/?random=2" class="w-100" />
      
      <div class="carousel-caption">
        <h1>Second Header</h1>
        <p>nice to meet you</p>
      </div>
    </div>
  </div>

  <a class="carousel-control-prev" href="#mycontrol" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#mycontrol" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>

  <ol class="carousel-indicators">
    <li data-target="#mycontrol" data-slide-to="0" class="active"></li>
    <li data-target="#mycontrol" data-slide-to="1"></li>
  </ol>
</div>
```
> 如果不希望出現在手機模式上，可以添加 `.d-none.d-md-block`，這是因為手機可能沒空間可以塞這些字。

如果試著改放一組在上層元素之 `div.carousel.slide`，那麼他會永遠停留在主輪播區上不受輪播控制。

```html
<div id="mycontrol" class="w-100 carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://picsum.photos/1920/600/?random=1" class="w-100" />
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/1920/600/?random=2" class="w-100" />
    </div>
  </div>

  <a class="carousel-control-prev" href="#mycontrol" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#mycontrol" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>

  <ol class="carousel-indicators">
    <li data-target="#mycontrol" data-slide-to="0" class="active"></li>
    <li data-target="#mycontrol" data-slide-to="1"></li>
  </ol>

  <div class="carousel-caption">
    <h1>Always Header</h1>
    <p>nice to meet you</p>
  </div>
</div>
```

### 進階思考
善用你的 CSS 知識，將輪播改為全版面（圖片皆為 1920×1080）：高度不變而調整寬度（響應式）時，圖片尺寸不變、保持水平置中，並裁切多餘的部分。

- img 如果比容器小，當然只要利用 text-center 或 mx-auto 就能置中，結案？!
- 但輪播圖片幾乎都超出或塞滿容器，前述對齊當然無法利用來解決。(mx-auto 本身填補時只有 0)
- img 除非是 background 可以控制中心點，否則需要去計算 margin 反推多少，使定位點往容器外去推。

**方案如下：**
1. 高度鎖定 vh-100 在 `.carousel-item` 容器上，img 也能繼承到，兩者都有固定高度為 100vh，圖片所綁定的w-100可取消。
2. 將圖片的空間放大，利用 left 跟 right 負值的方式 (position-absolute)，使這張圖片的內容左右位置比容器 left 跟 right 還遠大，圖片所綁定的d-block可取消(absolute已持有)。
3. 再搭配 margin auto 填滿，使得圖片剛好致中到看的到的容器範圍內。這樣容器的寬度不會影響圖片的定位，兩者是分開的定位觀念。
4. 轉場看起來會卡卡的，是因為圖片太大造成的視覺問題，可以試著把 `.carousel-item` 的 `transition` 秒數放慢來觀察。
5. 我們對容器指定 overflow-hidden 使得圖片超過容器的部分看不到，這樣跑輪播的時候只有容器範圍被看見。
```html
<div id="mycontrol" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active vh-100 overflow-hidden">
      <img src="https://picsum.photos/1920/1080/?random=1" style="left:-9999px;right:-9999px" class="mx-auto position-absolute" />
    </div>
    <div class="carousel-item vh-100 overflow-hidden">
      <img src="https://picsum.photos/1920/1080/?random=2" style="left:-9999px;right:-9999px" class="mx-auto position-absolute" />
    </div>
  </div>

  <a class="carousel-control-prev" href="#mycontrol" data-slide="prev"><span class="carousel-control-prev-icon"></span></a>
  <a class="carousel-control-next" href="#mycontrol" data-slide="next"><span class="carousel-control-next-icon"></span></a>

  <ol class="carousel-indicators">
    <li data-target="#mycontrol" data-slide-to="0" class=""></li>
    <li data-target="#mycontrol" data-slide-to="1"></li>
  </ol>

  <div class="carousel-caption d-none d-sm-block">
    <h1>hello world</h1>
    <p>nice to meet you</p>
  </div>
</div>
```

### 轉場特效
淡入淡出轉場效果可以做些改變，對大容器添加 `.carousel-fade` 能將原本的 slider 效果更改為 fade 效果。

```html https://getbootstrap.com/docs/4.4/components/carousel/#crossfade
<div id="mycontrol" class="carousel slide carousel-fade" data-ride="carousel">
  <div class="carousel-inner">
    ...
  </div>
</div>
```

### 控制屬性與 JS 事件操作
更多完整控制選項，透過屬性公式宣告獲得相關的調整：

```html
<!--自動播放-->
div.carousel.side[data-ride={value}]
value=false(default), carousel

<!--keyboard 鍵盤控制：BS 小 BUG 就是要先曾觸發過按鈕-->
div.carousel.side[data-keyboard={value}]
value=true(default), false

<!--停留時間：對 carousel 指定則 All 對象有效，對 item 指定為只有該 One 對象-->
div.carousel(or carousel-item).side[data-interval={value}]  
value=5000(default), any number, false（持續停留）

<!--觸發暫停播放：電腦滑鼠移入移出或手持觸碰時-->
div.carousel.side[data-pause={value}]
value=hover(default), false（不暫停）

<!--循環播放-->
div.carousel.side[data-wrap={value}]
value=true(default), false

<!--觸控拖曳控制-->
div.carousel.side[data-touch={value}]
value=true(default), false
```

或者改由 JS 的 JSON 參數指定法，將對象的 `.carousel` 初始化（同對應前面 `[data-name]` 之名稱）：

```js
$('.carousel').carousel({
  interval:500,
  keyboard:false,
  pause:hover
});
```

還有一些 JS 的指令控制，舉幾個例子為

```js
$('.carousel').carousel('prev');
$('.carousel').carousel(1);
```

> 後續 JS 部分因實用性考量，之後的元件開始將不再特別介紹 Bootstrap 有提供開發者 JS 觸發事件反應與相關筆記說明，大多都是如何透過 JS 指令形成互動事件，有需求者自行前往官方元件文件學習理解。

## 摺疊 Collapse
目的是隱藏一個區塊：透過任何可互動的 `a` 或 `button`，綁定屬性 `data-toggle="collapse"`，以 JS 事件切換摺疊與展開（展開時是向下伸展的視覺效果）。

### 基本設計
1. 任何觸發按鈕上需指定 `data-toggle="collapse"` 啟用 Bootstrap.js，其中如果是 a:link 只要 `[href=目標]` 即可，如果是其他標籤則需要 `[data-target=目標]` 屬性。
2. 目標可以寫 id 或 class。
3. 摺疊對象則設定 `.collapse` 與**對應的 id 或 class** 即可。
4. 屬性 `aria-controls` 為 ARIA 語意之控制，可省略。
5. 屬性 `aria-expanded="false"` 為 ARIA 語意，表示目前是關閉 (false) 狀態，可省略。
6. 屬性 `role="button"` 為視障判讀用，宣告此為按鈕，可省略。

```html
<p>
  <a class="btn btn-primary" data-toggle="collapse" href="#mycollapse">Touch Me</a>
  <button class="btn btn-primary" data-toggle="collapse" data-target="#mycollapse" type="button" >Touch Me</button>
</p>
<div class="collapse" id="mycollapse">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div>
```

7. 如果要控制不同的折疊對象，就綁定彼此不同的目標關聯性。

```html
<p>
  <a class="btn btn-primary" data-toggle="collapse" href="#myctrla" role="button">CTRL A</a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#myctrlb">CTRL B</button>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".ctrlboth">CTRL A+B</button>
</p>
<div class="row">
  <div class="col">
    <div class="collapse ctrlboth" id="myctrla">
      <div class="card card-body">A</div>
    </div>
  </div>
  <div class="col">
    <div class="collapse ctrlboth" id="myctrlb">
      <div class="card card-body">B</div>
    </div>
  </div>
</div>
```

### 手風琴效果
官方另外用 card 元件搭配設計了手風琴效果。範例是三組 card（header＋body），父容器綁定 `.accordion`，讓這些摺疊項目成為一個群組，一次只展開一個。

1. 父容器指定 `.accordion` 代表為群組且單一顯示，父容器設定對象 (id 或 class)，子控制需綁定 `data-parent="父容器對象"` 。
2. 子項目的 `.collapse` 代表要被摺疊（隱藏）的對象。
3. 子項目的 `.collapsing` 代表正在展開或收合的過渡狀態，結束後會自動移除。
4. 子項目的 `.collapsed` 代表已收合（沒有實際效果，可省略），JS 會自動補上。
5. 若要預設初始就顯示，對該折疊項目設定為 `.show`。
6. 屬性 `aria-labelledby` 為語意標記用，可省略。

```html
<div class="accordion papa">
  <div class="card">
    <div class="card-header" id="son1">
      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#ctrl1">show son1</button>
    </div>
    <div id="ctrl1" class="collapse " data-parent=".papa">
      <div class="card-body">son1</div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="son2">
      <button class="btn btn-link " type="button" data-toggle="collapse" data-target="#ctrl2">show son2</button>
    </div>
    <div id="ctrl2" class="collapse show" data-parent=".papa">
      <div class="card-body">son2</div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="son3">
      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#ctrl3">show son3</button>
    </div>
    <div id="ctrl3" class="collapse" data-parent=".papa">
      <div class="card-body">son3</div>
    </div>
  </div>
</div>
```

> 動態互動事件也有提供，不再表述。

## 下拉選單 Dropdowns
下拉選單是「隱藏的 `div` 容器」與「互動按鈕」的組合，透過按鈕觸發顯示。Bootstrap 以第三方插件 `popper.js` 處理定位，因此必須引入此插件才能使用下拉選單的動態效果。

### 基本結構
1. `.dropdown` 為主容器（非必要），但目的只是確保為 position-relative 狀態。
2. 語意 `aria-haspopup="true"` , `aria-expanded="false"` , `aria-labelledby` 可省略。
3. 透過按鈕（可以是 button 或 a:link 但建議使用`.btn` 有外觀）上的屬性 `data-toggle="dropdown"` 進行觸發事件，會對同層位置的 `.dropdown-menu` 控制顯現。
4. 對按鈕宣告 `.dropdown-toggle` 會對本身內容 ::after 後面呈現一個倒三角提示效果。
```html https://getbootstrap.com/docs/4.4/components/dropdowns/#single-button
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
    Dropdown button
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
```

6. 你可以將按鈕做成 `.btn-group` ，對有反應的下拉選單做**分割按鈕設計**。其中 `.dropdown-toggle-split` 是為了修正間格優化。
7. `.btn-group`可以拿來取代`.dropdown`，反正都有 relative 效果，有沒有組合其實沒差。
```html https://getbootstrap.com/docs/4.4/components/dropdowns/#split-button
<div class="btn-group">
  <button type="button" class="btn btn-danger">Action</button>
  <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
```

8. 可利用 `.btn-lg` , `.btn-sm` 這類的按鈕尺寸組合下去，設計不同尺寸。
9. 欲更改箭頭方向，對主容器 `.btn-group` 或 `.dropdown` 處添加 `.dropup` , `.dropright`, `.dropleft`。
  {% note default %}
  https://getbootstrap.com/docs/4.4/components/dropdowns/#menu-alignment
  {% endnote %}

### 選單區設計
對於下拉後所產生的 Menu 內部區域也很彈性，規則如下：

1. 在 menu 容器 `.dropdown-menu` 內，可以是 a 或 button，會自動處理為 MENU 內的子選項效果。
2. 若要高亮（藍底）提示，可以 `.dropdown-item` 添加 `.active` 。
3. 暫時性取消 hover 互動作業，可以 `.dropdown-item` 處添加 `.disabled` 。
4. 選單與按鈕的對齊方式：在 `.dropdown-menu` 加入 `.dropdown-menu-right` 可靠右對齊，
5. 同上，也支援響應式 `.dropdown-menu-{breakpoint}-{left|right}` 應用。

6. 可以添加 `.dropdown-item-text` 純文字（無 hover 作用），例如使用 `<span class="dropdown-item-text">Dropdown item text</span>` 。
7. 同上，可以添加標題，例如 `<h6 class="dropdown-header">Dropdown header</h6>` 。
8. 同上，可添加分隔線，例如 `<div class="dropdown-divider"></div>` 。
9. 同上，也可以放入任何喜歡的 HTML 元素，例如表單元件或一段 HTML 程式碼；注意需要自行指定寬度上限（預設 `.dropdown-menu` 只有 `min-width: 10rem`）。
```html https://getbootstrap.com/docs/4.4/components/dropdowns/#menu-content
<div class="dropdown-menu p-4 text-muted" style="max-width: 200px;">
  <p>Some example text that's free-flowing within the dropdown menu.</p>
  <p class="mb-0">And this is more example text.</p>
</div>
```

10. 欲調整下拉的 menu 區域定位點，在按鈕處添加屬性像是 `data-offset="10,20"` 代表 x=10,y=20 偏移。
11. 同上，在按鈕處添加屬性`data-reference="{parent|toggle}"`，parent 代表直接對齊父容器 (btn-group)，toggle 代表對齊`data-toggle`後面那格。
  {% note default %}
  https://getbootstrap.com/docs/4.4/components/dropdowns/#dropdown-options
  {% endnote %}

## 表單 Forms
表單也是辨識度與實用性都很高的元件，class 公式比較複雜且固定。剛開始不必深究每個 class 的用途，多數人都是複製範例再修改使用。

### 基本結構
表單的 class 公式稍微複雜且多樣，不一定要全部套用，但會影響外觀是否好看。

```html https://getbootstrap.com/docs/4.4/components/forms/#overview
<form>
  <div class="form-group">
    <label for="toemail">Email address</label>
    <input type="email" class="form-control" id="toemail" placeholder="Enter email">
    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="topassword">Password</label>
    <input type="password" class="form-control" id="topassword" placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="tocheck">
    <label class="form-check-label" for="tocheck">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

1. `label` 是 HTML 標準標籤，用來說明某個 `input`，透過 `label[for=id]` 與 `input#id` 建立關聯（非必要），好處是點選 label 時等同於聚焦（focus）該 input。
2. 屬性 `input[placeholder=]` 為提示用途，作用出現在輸入框內做提示。
3. 如果要一次停用多個欄位，可以用 `fieldset[disabled]` 包住（`fieldset` 是表單中的語意標籤，代表一組相關的欄位）。
4. 如果某個 checkbox 或 radio 沒有 `label`，會影響外觀（`absolute` 定位找不到貼齊處），可以加上 `.position-static`，也就是 `input:{checkbox|radio}.form-check-input.position-static` 來修正。
5. 善用網格（grid）可以變化出更多排版：用 `.col-*` 控制寬度分配，或用 `.col-auto` 依內容決定寬度。

**單標籤外觀**

- `input`、`select`、`textarea` 加 `.form-control`：輸入型欄位的外觀優化。
- `input`、`select`、`textarea` 加 `.form-control-{sm|lg}`：調整欄位大小。
- `small`（或 `span`）加 `.form-text`：作為提示句，帶有 `d-block` 與 `margin-top`。
- `input:file` 加 `.form-control-file`：調整檔案選取欄位的外觀。
- `input:range` 加 `.form-control-range`：調整滑桿欄位的外觀。
- `input[readonly]` 加 `.form-control-plaintext`：讓唯讀的輸入框看起來像普通文字。
- `input:checkbox|radio` 加 `.form-check-input`：調整核取方塊與選項鈕的外觀。
- `label` 加 `.form-check-label`：搭配 checkbox、radio 做行內描述時使用，建議調整為 `inline-block`。
- `label.col-*` 加 `.col-form-label`：`input` 與 `label` 直接套用 `col` 時，用來調整文字的垂直對齊。
- `label.col-*` 加 `.col-form-label-{sm|lg}`：`input` 與 `label` 直接套用 `col` 時，用來調整大小。
- `form` 加 `.form-inline`：一行式（非手機）的表單，整個 `form` 會變成 flex。

**多標籤組合建議**

- `label` 與 `input`：父容器建議使用 `div.form-group`，效果是 `margin-bottom: 1rem` 並為 block。
- `label` 與 `checkbox|radio`：父容器建議使用 `div.form-check`，有適當的左側行內間距，為 block。
- `label` 與 `checkbox|radio`：父容器建議使用 `div.form-check.form-check-inline`，有適當的左側行內間距，為 `inline-flex`。
- `label` 與 `input`：父容器建議使用 `div.row>div.col`，以網格（row>col）排列。
- `label` 與 `input`：父容器建議使用 `div.form-row>div.col`，同上但間距較緊密。

### 表單驗證效果
表單驗證特別重要，用來判斷欄位的值是否有效，並依 HTML 本身的表單狀態呈現對應的外觀。

1. HTML5 本來就有內建的表單驗證（優先權較高），如果想關閉，可以在 `form` 加上 `novalidate` 屬性，改用 Bootstrap 的驗證效果。
2. Bootstrap 的驗證效果都寫在 `form.was-validated` 底下，需要自己用 JS 新增或移除這個 class，來顯示或隱藏驗證結果；像 AJAX 這種送出後要取消檢查的情況，也要自行用 JS 移除 `.was-validated`。
3. 想針對單一欄位操作時，可以改用 JS 控制 `input.{is-valid|is-invalid}`，就不必在表單加上 `.was-validated` 做整體控制。
```js
$("#validationCustom01").addClass("is-valid");
```
4. 驗證時 `input`、`textarea`、`select` 出現的綠色或紅色提示框，是 Bootstrap 針對偽類 `:invalid` 與 `:valid` 寫好的 CSS。
5. 承上，`:invalid` 與 `:valid` 是依 HTML5 的檢查機制（`required` 與 `type` 屬性等）判斷有效與否，Bootstrap 再依結果套用對應的外觀。

6. 總結來說，需要自行**編寫 JS 腳本**：在送出表單時判斷欄位是否符合條件，不符合就取消送出，並加上 `form.was-validated`：
```js
var demoform = document.getElementsByClassName('needs-validation')[0];
demoform.addEventListener('submit', function(event) {
  //檢查 demoform 是否有檢核與驗證滿足條件。
  if (demoform.checkValidity() === false) { // false 代表沒有通過檢核，瀏覽器會對 demoform 觸發一個可取消的 invalid 事件。
    event.preventDefault();  // 方法一：取消事件的預設行為
    // event.stopPropagation(); //　方法二：阻止當前事件繼續進行捕捉（capturing）及冒泡（bubbling）階段的傳遞。
    demoform.classList.add('was-validated');
  }
});
```

7. 如果需要自訂提示文字，可另外加入 `div.{valid-feedback|invalid-feedback}` 作為驗證通過與不通過的提示，這些文字只會在 `form.was-validated` 底下顯示。
8. 另一種提示泡泡效果是 `div.{valid-tooltip|invalid-tooltip}`，需確保父容器有 `position: relative` 可供定位參考（使用 `.col` 排版時已有此設定）。

### 自訂外觀
Bootstrap 為了統一外觀（擺脫瀏覽器原生 checkbox 與 radio 的樣式），另外用偽元素 CSS 做出自訂版的 checkbox 與 radio，只要調整 class 名稱即可取得。

#### radio & checkbox
- 使用 `div.custom-control` 為容器包覆（提供適當左側間距，替代 `form-check` 用途）。
- 在這個容器內將會有 checkbox 時，增加 `.custom-checkbox` （圓角化效果）。
- 同上，在這個容器內將會有 radio 時，增加 `.custom-radio` （圓角化效果）。
- 其餘 input 與 label 部分與傳統 class 公式差不多，只要把 `.form-*` 改成 `.custom-*` 即可。
```html https://getbootstrap.com/docs/4.4/components/forms/#checkboxes-and-radios-1
<!-- radio -->
<div class="form-check">
  <input class="form-check-input" type="radio" id="demoRadio">
  <label class="form-check-label" for="demoRadio">default radio</label>
</div>
<div class="custom-control custom-radio">
  <input class="custom-control-input" type="radio" id="customRadio">
  <label class="custom-control-label" for="customRadio">custom radio</label>
</div>

<!-- checkbox -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="demoCheck" required>
  <label class="form-check-label" for="demoCheck">normal checkbox</label>
</div>
<div class="custom-control custom-checkbox">
  <input class="custom-control-input" type="checkbox" id="customCheck" required>
  <label class="custom-control-label" for="customCheck">Check this custom checkbox</label>
</div>
```
> checkbox 有特別的偽類 `:indeterminate`（用法與 `:invalid`、`:valid` 類似），表示一種尚未確定的狀態，可以透過 JS 或 jQuery 設定初始值。如下例：
```js
document.getElementById("customCheck").indeterminate=true; // js version
$('#demoCheck').prop('indeterminate', true); // jq version
```

- 使用 inline 模式效果時，更改為 `.custom-control-inline` （替代 `.form-check-inline` 用途）。
```html https://getbootstrap.com/docs/4.4/components/forms/#inline-1
<!--for inline mode -->
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" id="inline1">
  <label class="form-check-label" for="inline1">1</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" id="inline2">
  <label class="form-check-label" for="inline2">2</label>
</div>
<hr>
<div class="custom-control custom-radio custom-control-inline">
  <input class="custom-control-input" type="radio" id="inline3">
  <label class="custom-control-label" for="inline3">AAA</label>
</div>
<div class="custom-control custom-radio custom-control-inline">
  <input class="custom-control-input" type="radio" id="inline4">
  <label class="custom-control-label" for="inline4">BBB</label>
</div>
```

- checkbox 還有特別的 switch 模式視覺效果，容器使用 `custom-switch` （替代 `custom-checkbox` )。
```html https://getbootstrap.com/docs/4.4/components/forms/#switches
<div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="switch1">
  <label class="custom-control-label" for="switch1">Toggle this switch element</label>
</div>
```

#### select
- select 部分也提供了 custom 版本，兩者差異比較如下：
- 此外，custom select 部分多了尺寸為 `select.custom-select.custom-select-lg` （替代 `select.form-control.form-control-lg` )。
```html https://getbootstrap.com/docs/4.4/components/forms/#select-menu
<div class="form-group">
  <label for="default1">Example default select</label>
  <select class="form-control form-control-lg" id="default1">
    <option selected>Open this select menu</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
</div>
<div class="form-group">
  <label for="custom1">Example custom select</label>
  <select class="custom-select custom-select-lg" id="custom1">
    <option selected>Open this select menu</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
</div>
```
> select 能指定屬性 `multiple` (4 筆）或 `size=N` 做 N 筆呈現，custom 版本亦支援此屬性參數。

#### range
- input:range 外觀差異如下：
```html https://getbootstrap.com/docs/4.4/components/forms/#range
<div class="form-group">
  <label for="default_range">default range</label>
  <input type="range" class="form-control-range" id="default_range">
</div>
<div class="from-gruop">
  <label for="custom_range">custom range</label>
  <input type="range" class="custom-range" id="custom_range">
</div>
```
> range 能指定屬性 `min=N, max=M, step=R` ，custom 版本亦支援此屬性參數。

#### file
- 由於 custom 版是用偽元素做出來的，無法顯示選到的檔名，因此另外採用第三方插件 `bs-custom-file-input`，以 JS 動態顯示檔案載入提示。
- `input:file` 的 HTML5 屬性 `multiple` 表示可上傳多個檔案，注意要以陣列形式設定 name（`name[]`）才能傳值。
- custom 版的按鈕文字預設為 Browse，可透過屬性`data-browse="檔案上傳"`做調整。
```html https://getbootstrap.com/docs/4.4/components/forms/#file-browser
<form class="needs-validation" enctype="multipart/form-data" method="post">
  <div class="form-group">
    <label for="defaultFile">Choose file</label>
    <input type="file" class="form-control-file" id="defaultFile">
  </div>
  <div class="form-group">
    <div class="custom-file">
      <input type="file" class="custom-file-input" id="customFile" name="custom_file">
      <label class="custom-file-label" for="customFile" data-browse="檔案上傳">Choose file</label>
    </div>
  </div>
  <button class="btn btn-primary" type="submit">Submit form</button>
</form>
```
> Bootstrap 推薦使用第三方插件 `bs-custom-file-input` 優化檔案選取的效果，記得引入 `bs-custom-file-input.js` 並初始化。
```html
<script src="https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js"></script>
<script>
  bsCustomFileInput.init(); //使得 custom 版也有 file input 之動態拖曳檔案之效果
</script>
```

---
## 輸入框群組化 Input Group
輸入框群組是針對表單加強的視覺包裝（可把多個欄位連成一排並統一圓角），能在 `input` 前後加上說明文字。結構與公式如下：

1. `input-group` 的 CSS 為 `flex-wrap: wrap`（可縮小網頁寬度測試觀察）。
2. input-group 調整尺寸，可另外添加 `.input-group-{sm|lg}` 。
3. 前後敘述區域內除了 span 純文字，也可以使用像是 checkbox, radio, button, dropdown-menu, custom... 等任何欄位，或是 label 這類的互動標籤。
4. 前後或主區域都可多筆標籤欄位呈現，形成多段的群組標籤，並保持圓角化視覺。

```html https://getbootstrap.com/docs/4.4/components/input-group/#basic-example
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Hello</span>
  </div>

  <input type="text" class="form-control">

  <div class="input-group-append">
    <span class="input-group-text">World</span>
  </div>
</div>
```
---
## 廣告屏幕 Jumbotron
Jumbotron 是醒目的主題區塊，適合用來傳達重點訊息或廣告文字。

1. 主容器 `div.jumbotron` 會產生灰底的背景區塊，可以在裡面放置標題、內文、按鈕等任何標籤。
2. 若不需要圓角，可以在主容器另外加上 `.jumbotron-fluid`。
3. 如果需要窄版，請在容器內再包一層 `div.container`。

```html https://getbootstrap.com/docs/4.4/components/jumbotron/
<div class="jumbotron">
  <div class="container">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
</div>
```
---
## 列表群組 List Group
呈現垂直或水平連續排列的清單群組，可以是基礎型的 `ul>li`，或互動型的 `div>{a|button}`，並提供邊框與組合圓角的效果。

```html
<ul class="list-group">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item active">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
</ul>
```

- 子項目 `.active`：高對比色差，代表作用中。
- 父容器 `.list-group-flush`：消除外框線。
- 父容器 `.list-group-horizontal`：改為水平排列。
- 父容器 `.list-group-horizontal-{sm|md|lg|xl}`：同上，依響應式斷點切換。
- 子項目 `.list-group-item-{color}`：添加顏色，color 可用 `primary`、`secondary`、`success`、`danger`、`warning`、`info`、`light`、`dark`。
- 子項目 `.list-group-item-action`：同上，可修正 hover 時的顏色變化。

1. 要做可互動的清單時，建議改用 `div.list-group>{a|button}.list-group-item`，利用 `a` 或 `button` 本身的 hover 效果提供互動感。
2. 對 item 加上 `disabled` 屬性（`a` 標籤不支援此屬性，需改用 `.disabled`），可以取消互動並呈現淡色文字。
3. 商業網站常見清單帶有 badge 標籤的效果（如下例），用 flex（主軸 `between`）搭配 badge 公式即可完成。官方還有其他範例，可以自行研究。
```html https://getbootstrap.com/docs/4.4/components/list-group/#with-badges
<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Cras justo odio<span class="badge badge-primary badge-pill">14</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Dapibus ac facilisis in<span class="badge badge-primary badge-pill">2</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus<span class="badge badge-primary badge-pill">1</span>
  </li>
</ul>
```

### tabs 清單模式 （配合 JS)
清單群組可以進階做成帶有內容切換的 tabs 功能，需要搭配 `bootstrap.js` 才有腳本行為，共有兩個獨立的容器，分別是選單與分頁。

#### 選單容器
1. `a.list-group-item` 屬性 [data-toggle=list] ： 完成 list 行為。
2. `a.list-group-item` 連結 [href=#id]：指定目標對象錨點。
3. 初始下應對某 `a.list-group-item` 綁定 `.active`，與分頁對象形成作用對應。

#### 分頁容器
1. 結構為必須是`div.tab-content>div[id=*].tab-pane` ，子項目需綁定 ID 提供對應。
2. 初始下應對某 `.tab-pane` 綁定 `.active`，與選單對象形成作用對應。
3. 淡出效果，對子項目添加 .fade，若屬於 .active 務必增添 .show。

```html https://getbootstrap.com/docs/4.4/components/list-group/#javascript-behavior
<!-- List group -->
<div class="list-group" id="controldemo">
  <a class="list-group-item list-group-item-action active" data-toggle="list" href="#home">Home</a>
  <a class="list-group-item list-group-item-action" data-toggle="list" href="#profile">Profile</a>
</div>
<!-- Tab panes -->
<div class="tab-content">
  <div class="tab-pane active" id="home">A Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, vel.</div>
  <div class="tab-pane" id="profile">B Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, est.</div>
</div>
```

`bootstrap.js` 已把這些連結的錨點控制行為做成 `$().tab` 操作，因此也可以用 JS 手動觸發：
```js
$('#controldemo a[href="#profile"]').tab('show') // Select tab by name
$('#controldemo a:first-child').tab('show') // Select first tab
$('#controldemo a:last-child').tab('show') // Select last tab
$('#controldemo a:nth-child(3)').tab('show') // Select third tab
```

> 另還有觸發反應事件，請參考官方說明

## 媒體物件 Media Object
媒體物件是帶有縮圖、標題與內文的區塊，通常用來展示文章摘要，例如部落格首頁的文章列表或商業網站的文宣片段。

1. 架構使用 `div.media>img+div.media-body` 即可，這是一個帶有 flex 容器的呈現手法。
2. 標題與文字都應該放在 `.media-body` 內，才能與圖片並排對齊。
3. 如果希望 img 與 div.media-body 進行垂直對齊，試著對 img 添加 `.align-self-{start|center|end}` 這種 flex 控制語法。
4. 控制圖片排序位置，除了 HTML 標籤先後順序，也能利用 flex 語法中的 order 參數。
5. 保持原架構可整合到 ul>li 列表內 (BS 提供 `ul.list-unstyled` 能消除預設的符號樣式），例如 `ul.list-unstyled>(li.media>img+div.media-body)*n`

```html https://getbootstrap.com/docs/4.4/components/media-object/#example
<div class="media">
  <img src="https://fakeimg.pl/300x300" class="mr-3">
  <div class="media-body">
    <h5 class="mt-0">Media heading</h5>
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
  </div>
</div>
```

## 互動視窗 Modal
Modal 是資訊量龐大且實用性高的元件：觸發時會顯示一個原本隱藏的浮動視窗，讓網頁有彈跳視窗的效果。基本上包含一個觸發按鈕 `btn[data-toggle=modal]` 與一個內容視窗 `div.modal.fade`。

### 觸發按鈕條件
- 屬性 `[data-toggle=modal]` ： 完成 modal 呼叫
- 目標 `a[href=#id]` or `btn[data-target=#id]` ：指定 modal 目標對象

### 內容視窗結構
- 完整三層結構為：`div#id.modal>div.modal-dialog>div.modal-content`
- 第一層 `.modal`：滿版的大容器，並占用整個 viewport 頁面。
- 第二層 `.modal-dialog`：視窗本體容器，提供視窗之區塊外觀。
- 第三層 `.modal-content`：內容用容器有不同區域，分別是 `div.modal-header` , `div.modal-body` , `div.modal-footer` 。

### 關閉 modal 方式
- 於 `.modal-content` 內任處可擺放關閉 modal 的按鈕，必需持有屬性 [data-dismiss=modal]。
- 關閉按鈕可增添 `.close` 使版面效果靠緊右上。
- 點擊由 Bootstrap 自動生成的半透黑之區域 `div.modal-backdrop`，預設情況下已啟用。

### .modal 的效果條件
- 增添屬性 `[tabindex]` 作為 tab 鍵的導航順序控制 （非必要）。
- 增添屬性 `[data-backdrop="static"]` 能取消半透黑之區域的關閉功能。

- 添加 `.fade` 能持有淡入淡出效果。
- 開啟時若內容過長，預設會出現垂直捲軸（`overflow-y: auto`，由 Bootstrap 自動加上 `.modal-open`）。

### .modal-dialog 的效果條件
- 加上 `.modal-dialog-scrollable`，內容過長時的捲動會改發生在 `.modal-body`，而不是整個 `.modal`。
- 視窗位置預設靠上，可添加 `.modal-dialog-centered` 改為垂直置中。
- 視窗寬度預設 500px，可添加 `.modal-{sm|lg|xl}` 使互動視窗的尺寸調整為 300px, 800px, 1140px。

### .modal-content 的效果條件
- 標題結構使用 `div.modal-header>div.modal-title` 能提供良好的外觀。
- 內容結構 `div.modal-body` 可以自由整合任何 Bootstrap 元件，例如 Tooltips、Popovers 或網格（`.container-fluid>.row>.col`）。

也可以用 JS 控制 modal 或調整參數（詳見官方說明）。舉例來說，若想關閉半透明背景的點擊互動，有兩種方法：

1. 透過 JS 腳本設定
```js
$('#modaldemo').modal({
  backdrop:'static',
  show:false
});
```

2. 透過 HTML 的 data 屬性設定
```html
<div class="modal" id="modaldemo" data-backdrop="static">
...
</div>
```
---
## 導覽 Navs
Navs 是簡單清爽、以 flex 排列的導覽選單。與 list group（較適合 block 型的內容選單或側邊選單）不同，Navs 通常用在頁首或頁尾這類 inline 型的區域。

```html https://getbootstrap.com/docs/4.4/components/navs/#pills
<ul class="nav nav-pills">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul>
```

1. 基礎結構為 `.nav>.nav-item` ，本身父容器採用 flex 觀念可加以利用。
2. 套用結構到 ul>li>a:link 時建議添加 `a.nav-link` 達到良好外觀，整體結構為 `ul.nav>li.nav-item>a:link.nav-link` 。
3. 另外，只對 `a.nav-link` 加上 `.active` 不會有明顯效果，需要在父容器加上 `.nav-pills`（`ul.nav.nav-pills`），讓項目呈現按鈕外觀，`.active` 才看得出來。
4. 規則也可套用任何容器結構上，舉例為 `nav.nav>a.nav-item.nav-link`。
5. 對父容器 `ul.nav` 加上 `.nav-tabs`，會變成頁籤（tab）外觀。
6. `.nav-item` 可整合 dropdown 元件，將互動鈕跟 Dropdown 容器的組合放入。

### flex 的運用
1. `.nav` 父容器本身因為是 flex 狀態，因此添加 `.justify-content-{center|right}` 能讓整個 ul 容器水平置中或向右靠齊。
2. 父容器添加 `.flex-column` 改變方向，變成垂直選單。
3. 垂直時可以省略 `.nav-item`，譬如 ul>li>a 可改用 `nav.nav.flex-column>a.nav-link` 結構即可。
4. 對父容器增添 `.nav-fill` 則對子項目 item 皆產生自動填滿效果 ( `flex: 1 1 auto;` )。
5. 對父容器增添 `.nav-justified` 則對子項目 item 皆產生一樣寬並自動填滿效果 ( `flex: 1 1 0;` )。
6. 基於是 flex 狀態，當然你可以設計成響應式做不同效果。

### tabs 清單模式 （配合 JS)
這裡能做出與前面 list group 類似、但外觀不同的 tabs 應用，同樣需要搭配 `bootstrap.js`，共有兩個獨立的容器：選單與分頁。

#### 選單容器
1. `a.nav-link` 屬性 `[data-toggle=tab]` ： 完成 tab 行為，與下列二選一。
2. `a.nav-link` 屬性 `[data-toggle=pill]` ： 完成 pill 行為，與上列二選一。
3. `a.nav-link` 連結 `[href=#id]`：指定目標對象錨點。
4. 選單容器也可套用於 `nav.nav>a.nav-item.nav-link` 的結構內。
5. 初始下應對某 `.nav-link` 綁定 `.active`，與分頁對象形成作用對應。

#### 分頁容器
1. 結構為必須是`div.tab-content>div[id=*].tab-pane`，子項目需綁定 ID 提供對應。
2. 初始下應對某 `.tab-pane` 綁定 `.active`，與選單對象形成作用對應。
3. 淡出效果，對子項目添加 `.fade`，若屬於 `.active` 務必增添 `.show`。

```html
<!--nav tab-->
<ul class="nav nav-tabs" id="myTab">
  <li class="nav-item">
    <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#profile">Profile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#contact">Contact</a>
  </li>
</ul>
<!--content zone-->
<div class="tab-content">
  <div class="tab-pane fade show active" id="home">Home Text</div>
  <div class="tab-pane fade" id="profile">Profile Text</div>
  <div class="tab-pane fade" id="contact">Contact Text</div>
</div>
```

`bootstrap.js` 已把這些連結的錨點控制行為做成 `$().tab` 操作，因此也可以用 JS 手動觸發：

```js
$('#myTab a[href="#profile"]').tab('show') // Select tab by name
$('#myTab li:first-child a').tab('show') // Select first tab
$('#myTab li:last-child a').tab('show') // Select last tab
$('#myTab li:nth-child(3) a').tab('show') // Select third tab
```
---
## 導覽列 Navbar
Navbar 是由 Nav 進化而來的網站主選單元件（公式不同：一個是 `nav`，一個是 `navbar`），資訊量大，是網站的核心主選單，也牽涉到 RWD 的選單變化設計。除了選單連結，Navbar 還能加入品牌 LOGO 或表單元件等。大致結構為：

`nav.navbar`（主容器） > `a.navbar-brand`(LOGO 區） + `button.navbar-toggler>span.navbar-toggler-icon`（漢堡按鈕） + `div.navbar-collapse`（選單區）+ 其他項目。

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">網站 LOGO</a> <!--LOGO-->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu">
    <span class="navbar-toggler-icon"></span> <!--漢堡 ICON-->
  </button>
  <div class="collapse navbar-collapse" id="navbarMenu"> <!--主角 MENU-->
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active"><a class="nav-link" href="#">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Dropdown</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item"><a class="nav-link disabled" href="#">Disabled</a></li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
```

### 主容器 nav.navbar
1. 為主容器裝載所有模組元件，採用 flex 狀態並可加以善用，預設 `.navbar` 已採用 `justify-content: space-between;` 屬性。
2. `nav.navbar` 內可放入 `a.navbar-brand` 網站名稱（或圖片）、`button.navbar-toggler` 漢堡（響應式）選單按鈕、導覽選單、或其他項目（例如表單 inline 元件，純文字等）。
3. 加上 `.navbar-expand-{sm|md|lg|xl}`，可決定在哪個斷點以上隱藏漢堡按鈕並展開選單（未展開時選單為 `div.collapse`）；若要一律展開，請寫 `.navbar-expand`。
4. 字色控制 `.navbar-{light|dark}`，可搭配 `.bg-{color}` 通用效果。
5. 子項目之間的靠齊方式，可使用 `mr-auto` 或 `ml-auto`，或善用 flex 技巧。
6. 如需窄版效果，可添加父容器 `.container` 使用。
7. 提供三種常見的定位方式：`.fixed-top`、`.fixed-bottom`、`.sticky-top`。

### LOGO 區 .navbar-brand
1. `.navbar-brand`作為網站名稱文字或圖片，可以是任何標籤之組合。

### 漢堡按鈕 button.navbar-toggler
1. 漢堡圖案可使用 `<span class="navbar-toggler-icon"></span>`作為 font icon。
2. `button.navbar-toggler` 屬性 [data-toggle=collapse]：完成 collapse 行為。
3. `button.navbar-toggler` 屬性 [data-target=#id]：指定目標對象。

### 選單區 .navbar-collapse
1. 必要性添加 `.collapse` 才可執行響應式選單隱藏顯示之對應。
2. 與 Navs 元件觀念操作雷同 (class 名稱有異），例如：
   - Navbar 為 `ul.navbar-nav>li.nav-item>a.nav-link` ；Nav 為 `ul.nav>li.nav-item>a.nav-link`
   - Navbar 為 `div.navbar-nav>a.nav-item.nav-link` ；Nav 為 `div.nav>a.nav-item.nav-link`
3. 對某 `.nav-item` 添加 `.active` 能代表當前頁面。

### 其他元件
1. 使用表單元件之水平列例如 `form.form-inline`，詳閱表單元件說明。
2. 使用純文字添加 `span.navbar-text`。

### .navbar 的定位方式
常有以下幾種方式對導覽列有不同的定位方式。
- `nav.navbar.fixed-top`：浮起並重疊 `<body>` 區，固定在頁首。
- `nav.navbar.fixed-bottom`：浮起並重疊 `<body>` 區，固定在頁尾。
- `nav.navbar.sticky-top`：捲動到頁首時才固定並浮起，重疊 `<body>` 區（好用）。

### 整體應用技巧
1. 如果在小螢幕時隱藏網站 LOGO ，把 `.navbar-brand` 搬移到 `.navbar-collapse` 內就能一起隱蔽。
2. 如果想小螢幕時讓漢堡鍵靠左而網站 LOGO 靠右，讓 HTML 位置顛倒這兩筆標籤，順序寫法為 `button.navbar-toggler+a.navbar-brand`。
3. 漢堡鍵也能控制一般元素對象，該元素同樣綁定 id 以及指定 `.collapse` 即可。
---
## 分頁導覽 Pagination
用於多篇文章或項目的分頁導覽，基本上就是把一連串的連結標籤包成群組外框。

1. 主結構為 `ul.pagination>li.page-item>a.page-link`。
2. 主容器 `ul.pagination` 可添加 `.pagination-{lg|sm}` 作為尺寸調整。
3. 主容器 `ul.pagination` 為 flex 概念，可以自行調整對齊方法。

```html
<nav>
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
  </ul>
</nav>
```
---
## 彈跳提示框 Popovers
Popovers 依賴第三方外掛 `popper.js`，可直接使用 `bootstrap.bundle.js`（內含 `bootstrap.js` 與 `popper.js`）。效果是觸發一個緊湊、可指定位置的小提示框，但僅限簡單的標題與文字。

基於效能考量，Popovers 不會自動生效，必須在網頁上以 JS 手動初始化：用 jQuery 找到對象後執行 `popover()` 函式。`[data-toggle="popover"]` 是 Bootstrap 建議的統一寫法，並非絕對。

```html
<button type="button" class="btn btn-secondary" data-content="poper message">touch me</button>
<script>
  $('button').popover();
</script>
```

- 顯示文字：HTML 屬性 `data-content=*`；JS 參數 `content: *`。
- 顯示標題：HTML 屬性 `title=*`；JS 參數 `title: *`。
- 顯示於指定元素內（需已存在）：預設 `body`；HTML 屬性 `data-container=*`；JS 參數 `container: *`。
- 彈跳方向（`left`、`right`、`top`、`bottom`）：預設 `right`；HTML 屬性 `data-placement=*`；JS 參數 `placement: *`。
- 更改觸發方式（`focus`、`hover`）：預設 `click`；HTML 屬性 `data-trigger={focus|hover}`；JS 參數 `trigger: 'focus'` 或 `'hover'`。需注意 `a` 或 `button` 各自支援的偽類。

{% note default %}
官方提供相當多的參數能設定，你可以決定是透過 HTML 屬性還是 JS 函式參數去調整。
https://bootstrap.hexschool.com/docs/4.2/components/popovers/#options
{% endnote %}

```html
<button type="button" class="btn btn-danger" data-toggle="popover" title="Popover title"
  data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
<button type="button" class="btn btn-secondary" data-toggle="popover">Popover on top</button>
<script>
  $('[data-toggle="popover"]').eq(0).popover();
  $('[data-toggle="popover"]').eq(1).popover({
    container: 'body',
    placement: 'top',
    title: 'demo title',
    content: '<em>Vivamus </em>sagittis lacus vel augue laoreet rutrum faucibus.'
});
</script>
```
---
## 進度條 Progress
用來顯示進度的視覺元件，結構為 `div.progress>div.progress-bar`。

```html
<div class="progress" style="height:40px">
  <div class="progress-bar bg-danger" style="width:66%">66%</div>
</div>
```

### .progress 父容器
- 可指定 CSS 高度成為大小尺寸。
- 可以放多個子項目 `.progress-bar`，它們會累加並排在一起。

### .progress-bar 子項目
- 必須指定 CSS 寬度（單位為 %），作為進度比例。
- 元素內容填寫文字，將成為該 bar 之標籤字且置中。
- 可搭配 `.bg-{color}` 通用類別變換顏色。
- 條紋外觀加上 `.progress-bar-striped`，要讓條紋動起來再加上 `.progress-bar-animated`。

---
## 滾動監控 Scrollspy
Scrollspy 能偵測目前捲動到哪一個錨點，並同步更新對應選單項目的 active 狀態，需要 `bootstrap.js` 協助處理，適用於 navs 或 list-group 這類選單型元件。

```html
<div class="row">
  <div class="col-4">
    <div id="list-example" class="list-group">
      <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
      <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
    </div>
  </div>
  <div class="col-8">
    <div data-spy="scroll" data-target="#list-example" data-offset="0" style="position: relative; height: 200px;overflow: auto;">
      <h4 id="list-item-1">Item 1</h4>
      <p>A Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis facere ad sint nemo eaque veniam voluptatem modi adipisci nulla? In, vero, asperiores labore adipisci eaque fugit explicabo repellendus incidunt blanditiis laboriosam est corrupti ad dolor possimus consequuntur a animi odit, dignissimos placeat? Nisi odit accusamus cupiditate ratione delectus voluptatum alias ipsam, minus incidunt sapiente commodi a qui illum quia, consectetur mollitia tempore esse beatae saepe laborum corporis! Porro doloribus adipisci beatae dolor velit accusantium quos odio sequi corporis facilis recusandae iusto vel modi libero perspiciatis excepturi, itaque omnis magni vero incidunt ipsum consequatur, culpa tempore. Numquam iste culpa esse eaque doloribus </p>
      <h4 id="list-item-2">Item 2</h4>
      <p>B Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quaerat eveniet, quam expedita asperiores magni eius quo dolorum fuga quisquam sed odio est ea repellat ullam excepturi. At dolore minus illum, aliquid ex ea doloribus alias totam error cumque itaque quia atque, illo porro quas velit aspernatur debitis deserunt inventore molestiae eligendi autem repudiandae sequi excepturi! Sint laboriosam asperiores beatae officia commodi unde reiciendis illum aperiam quam sunt nam soluta excepturi illo obcaecati tempora vitae corporis, accusantium adipisci voluptates, quasi enim! Laborum, consectetur deleniti aliquid velit aliquam maxime amet aut mollitia adipisci voluptates provident quod alias nam ipsam nobis iusto quae numquam, veniam iure </p>
    </div>
  </div>
</div>
```

### 反應端 (navs or list-group)
1. 父容器需持有屬性 `[id=*]` 提供監控端進行關聯反向操作。
2. 子項目必須是 `a[href=#id]` 進行錨點連結，與監控端的子項目 ID 對象形成關聯。

### 監控端 (content)
1. 父容器需持有屬性 `[data-target=id]` 追蹤反應端 ID 進行關聯操作。
2. 父容器需持有屬性 `[data-spy="scroll"]` 才能啟動監控效果，重要。
3. 父容器的 CSS 必須是 `position: relative`；若父容器不是 `body`，還需指定 `height` 與 `overflow: scroll`（或 `auto`）。
4. 父容器之屬性`[data-offset=0]`，能調整監控回報的位置偏差多少值。
5. 父容器可以直接是 `body`，這時不需要指定 `relative`、`height`、`overflow`；反而建議反應端（選單）改用 `.sticky-top` 或其他固定定位方式。

```html
<body class="bd-example" data-spy="scroll" data-target="#list-example" data-offset="0">
<div class="row">
  <div class="col-4">
    <div id="list-example" class="list-group sticky-top" style="top:1.5rem">
      <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
      <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
    </div>
  </div>
  <div class="col-8">
    <h4 id="list-item-1">Item 1</h4>
    <p>A Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis facere ad sint nemo eaque veniam voluptatem modi adipisci nulla? In, vero, asperiores labore adipisci eaque fugit explicabo repellendus incidunt blanditiis laboriosam est corrupti ad dolor possimus consequuntur a animi odit, dignissimos placeat? Nisi odit accusamus cupiditate ratione delectus voluptatum alias ipsam, minus incidunt sapiente commodi a qui illum quia, consectetur mollitia tempore esse beatae saepe laborum corporis! Porro doloribus adipisci beatae dolor velit accusantium quos odio sequi corporis facilis recusandae iusto vel modi libero perspiciatis excepturi, itaque omnis magni vero incidunt ipsum consequatur, culpa tempore. Numquam iste culpa esse eaque doloribus iure, </p>
    <h4 id="list-item-2">Item 2</h4>
    <p>B Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quaerat eveniet, quam expedita asperiores magni eius quo dolorum fuga quisquam sed odio est ea repellat ullam excepturi. At dolore minus illum, aliquid ex ea doloribus alias totam error cumque itaque quia atque, illo porro quas velit aspernatur debitis deserunt inventore molestiae eligendi autem repudiandae sequi excepturi! Sint laboriosam asperiores beatae officia commodi unde reiciendis illum aperiam quam sunt nam soluta excepturi illo obcaecati tempora vitae corporis, accusantium adipisci voluptates, quasi enim! Laborum, consectetur deleniti aliquid velit aliquam maxime amet aut mollitia adipisci voluptates provident quod alias nam ipsam nobis iusto quae numquam, veniam iure possimus, </p>
  </div>
</div>
</body>
```
---
## 載入動畫 Spinners
Bootstrap 提供了一些以 HTML 加 CSS 動畫做成的載入圖示。如果要用在資料處理的等待時間，需要自己用 JS 控制這些圖示何時顯示與隱藏。
```html
<div class="spinner-border text-danger"></div>
<div class="spinner-grow text-danger"></div>
```
1. 提供旋轉或漸變模式，分別是 `.spinner-{border|grow}` ，另添加 `.text-{color}` 玩色。
2. 提供尺寸調整，另添加`.spinner-{border|grow}-{lg|sm}`。
3. 本質為 inline-block，所以可以用 flex, text-align, float, margin 這類技巧去處理排版，也可整合到任何的元素或元件內。
---
## 吐司方塊 Toasts
Toasts 常見於社群網站或服務網頁的即時訊息通知，模仿電腦桌面角落的推播方塊，本身採用 flex 排版。架構為：

>`div.toast>div.toast-header+div.toast-body`

```html
<div class="toast fade show">
  <div class="toast-header">
    <img src="https://fakeimg.pl/45x45" class="rounded mr-2">
    <strong class="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>
  </div>
  <div class="toast-body">Hello, world! This is a toast message.</div>
</div>
```

### .toast 主容器
1. 初始是看不見的（透明度為 0），可以加上 `.show` 讓它顯示，或用 JS 執行 `toast()` 來操作。
2. 預設會呈現半透明，如果瀏覽器支援還會有模糊效果 （採用濾鏡 backdrop-filter:blur)。
3. 關閉按鈕可設計 `btn.close[data-dismiss="toast"]` 做為控制。
4. 每個 `.toast` 是獨立的一個方塊，多個方塊就用多個容器堆疊。
5. 定位可自行利用雙 div 搭配 position 去控制，也可以用 flex 去控制。
```html
<div style="position: relative; min-height: 200px;">
  <div style="position: absolute; top: 0; right: 0;">
    <div class="toast fade show">
      <div class="toast-header">
        <img src="https://fakeimg.pl/45x45" class="rounded mr-2" />
        <strong class="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>
      </div>
      <div class="toast-body">Hello, world! This is a toast message.</div>
    </div>
    <div class="toast fade show">
      <div class="toast-header">
        <img src="https://fakeimg.pl/45x45" class="rounded mr-2" />
        <strong class="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>
      </div>
      <div class="toast-body">Hello, world! This is a toast message.</div>
    </div>
  </div>
</div>
```

### toast() 物件操作
toast 提供顯示時間（`data-delay`）、自動消失（`data-autohide`）等參數，可以用 HTML 的 data 屬性或 JS 物件指定。

1. 透過 JS 手動顯示，預設只顯示 500 毫秒，並會自動隱藏。
```js
$('.toast').toast('show');
```
2. 修改顯示毫秒數，可透過 HTML 屬性 `[data-delay=*]` 或 JS 物件參數操作。
3. 取消自動隱藏方式，可透過 HTML 屬性 [data-autohide=false] 或 JS 物件參數操作。
4. 取消預設淡出效果，可透過 HTML 屬性 [data-animation=false] 或 JS 物件參數操作。

---
## 工具提示 Tooltips
Tooltips 是比 Popovers 更簡單的元件，只能把元素自身的 `title` 屬性變成 hover 時顯示的提示泡泡。同樣依賴第三方外掛 `popper.js`，可直接使用 `bootstrap.bundle.js`（內含 `bootstrap.js` 與 `popper.js`）。

基於效能考量，Tooltips 不會自動生效，必須在網頁上以 JS 手動初始化：用 jQuery 找到對象後執行 `tooltip()` 函式。

```html
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>
<script>$('button').tooltip();</script>
```

官方提供相當多可設定的參數，可以透過 JS 物件調整，也能透過 HTML5 的 `data-*` 屬性調整。
1. 添加屬性 [data-toggle="tooltip"] 為 Bootstrap 建議統一寫法，非絕對。
2. 必要屬性 `[title]` 提供提示文字（也能使用 HTML 作為提示文，詳見官方文件）。
3. 添加屬性 [data-html] 為使提示字支援 HTML Code。
4. 添加屬性 [data-container=body] 能指定 DOM 寫入元素為誰。
5. 添加屬性 [data-placement={left,right,top,bottom}] 能控制提示框的呈現方向。

```html
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>
```

# 結語
Bootstrap 最大的學習重點，是善用網格發展 RWD 網站，以及快速使用元件完成網站版面；切版時用通用類別完成簡單的屬性設定，但切記不要過度依賴 class 堆疊，否則 HTML 會變得複雜，需要大量 class 時還是回到自訂 CSS。下一篇是實作，以主題網站的方式體驗 Bootstrap 的開發流程。