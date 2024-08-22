---
title: "[基礎課程] Bootstrap4 教學（三）：元件"
categories:
  - 職訓教材
  - Bootstrap
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-30 17:15:31
---

本章節的 Components 元件算是資訊量很大的單元，但也不用特別去背，只要知道有哪些功能可以選（複製貼上大法）加以利用去點綴你的網頁即可。

<!-- more -->

---

# 元件 Components
算是 Bootstrap 最多元且複雜的東西，設計了許多好用經典且耐看的應用模組，同時會使用到大量的 class 公式與多層元素包裝使用。此外有部分元件屬於動態互動會應用到 JQ，所以你需要一定的 JS 程度。所以務必需要宣告 Bootstrap.JS 以及 JQuery.js（因為 Bootstrap.js 是透過 JQ 開發以及觸發）。另外 popper.js 是另一個 Bootstrap 會用到的 JS 外掛。

```html
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
```

## 警報 Alert
你可能在一些網站看過，這裡的 alert 是設計一個具有滿寬的顏色區塊提供文字訊息。範例為：

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

>  `role="alert"` 屬於 html5 的語意屬性（讓網頁受辨識與無障礙），代表這是一個向使用者傳遞警報的文字區塊，非必要可以不用填寫。

### 公式說明
```css
.alert /* 產生一個滿寬的警報型文字框 */
.alert-{color}   /* 填上粉系的背景色，你可以反向當作背景色公式通用在其他領域上 */
color: primary, secondary, success, danger, warning, info, light, dark

.alert-link /* 自動在對應的背景色上產生適合的字色，同時加粗體讓連結能明顯於文字上 */
.alert-heading /* 設定 color: inherit 沒有意義，官方說明有需要可以自訂參數效果 */
```

Alert 還有動態關閉的使用效果（反之觸發效果就是你所會的 JS 建立 DOM 而已），範例當中提供了關閉按鈕使觸發對應的 DOM 進行關閉。Bootstrap 利用自訂屬性`data-dismiss="alert"`觸發 alert 事件

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
Alert 也提供 JS 操作相關說明，可以整合到你的 JS 腳本內去，範例如下：

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

```javascript
//透過 JQ 選擇器找到該處執行 alert 事件之 close 行為，向上層（包含自己）尋找 class=alert 對象然後關閉它 */
$('.show').alert('close'); //選擇器填什麼都可以只要能向上找到。alert 對象
```

## 標籤 Badge
標籤指 inline-block 模式的文字含背景色含圓角，可以輕易套用在任何標籤之文字後面做為標籤用途。如果套用在有 hover 或 fouce 的元素則背色會自動變化對應。

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
做為網站的站點紀錄用途，會自動在 li 之間判斷塞入 <kbd>/</kbd> 分隔符號。

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
> `aria-current="page"`為語意用途，亦為告知當前所在頁面可省略。

## 按鈕 Buttons
算是 Bootstrap 最有識別性的元件了，拿來美化 button 標籤也能用任何元素包裝成按鈕型態，且具有 hover 效果。

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
透過指定的屬性添加，能讓按鈕產生 JS 互動對應`.active`反應（顏色變化），你可以拿來進行控制切換 (ON/OFF) 效果，適用表單類型的元素。

**切換狀態：**
添加屬性`data-toggle="button"`就能進行切換效果，若初始化為作用中效果，你需要先寫好`.active`與語意屬性`aria-pressed="true"`。

```html https://getbootstrap.com/docs/4.4/components/buttons/#toggle-states
<button type="button" class="btn btn-primary active" data-toggle="button" aria-pressed="true">Single toggle</button>
```

**選取方塊：**
如果是表單的`<label>`項目（或多個設計為單選）需要一個上層`div.btn-group-toggle`包住，與前面切換效果一致，唯獨 active 屬性是設定在某一個子元素上。

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

## 按鈕群組 Button Grounp
透過一個父元素 div.btn-grounp 能將多個按鈕組合起來，使得畫面為一個緊密按鈕群組單位。之後出現的 input-group 元件其邏輯也相同。

```html https://getbootstrap.com/docs/4.4/components/button-group/#basic-example
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
```
> 屬性`role`, `aria-label`, `aria-labelledby`都是視障判別與語意的設計。

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
卡片是一個廣泛通用的常態容器，裡面會包 `.card-body` 跟其他（非必要）像是 `.card-head`, `.card-footer` 或任何元素。其中一些類型元素可搭配公式做美化處理，也很容易去組合些額外通用公式強化視覺。

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
1. `div.card` 內沒有任何上列 class 公式也是可以呈現的，將變成框線卡片仍可包任何 BS 元件或 HTML 元素。
2. 可將 Navs 元件整合到 `.card-header` 內，只要`ul.nav+navtabs`的地方宣告`.card-header-tabs`即可融合一起。另一個效果則是`.card-header-pills`。
  {% note default %}
    https://getbootstrap.com/docs/4.4/components/card/#navigation
  {% endnote %}
3. 整合 row 跟 col 觀念，你可以玩出圖片區域在左，文字在右的垂直效果。
  {% note default %}
    https://getbootstrap.com/docs/4.4/components/card/#horizontal
  {% endnote %}
4. `.card`處搭配 `.bg-{color}`, `.text-{color}`, `.border-{color}` 能輕鬆玩色。
  {% note default %}
    https://getbootstrap.com/docs/4.4/components/card/#card-styles
  {% endnote %}
5. 卡片可以群組化（緊密一排且高度會切平，原理為 flexbox)，只要這些`div.card`外層多用一個父元素`div.card-group`包住。另種效果是`div.card-deck`有間格，以及`div.card-colums`瀑布排列。
  {% note default %}
    https://getbootstrap.com/docs/4.4/components/card/#card-layout
  {% endnote %}

## 輪播 Carousel
輪播常用於網站作為主區廣告幻燈片輪播切換，Boostrap 會使用到 CSS 轉場與 JS 控制替換，預設情況下是 5 秒轉場以及 focus（滑鼠懸停）時停止轉場並注意以下狀況：

### 基本呈現

1. 一定要對 `.carousel-item` 的子項目某設定一筆 `.active` 否則找不到對象進行初始化呈現，導致整個呈現失敗。
2. 輪播的是整個 `div.carousel-item` 元素而不是圖檔，理所當然輪播也能對文字有效。
3. img 本身最好是適應寬度為 w-100 使得與父 div 同寬，否則圖片會顯示不完整 (overflow) 導致轉場會出現問題。
4. 屬性 `data-ride="carousel"` 做為提供 Bootstrap.js 進行初始第一次進行轉場之行為，若省略將無法初始自動轉場（若透過手動觸發仍可繼續轉場）。

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
2. 屬性 `[role="button"]` 為語意此為按鈕功能，可省略。
3. 屬性 `[aria-hidden=true]` 為向視障軟體隱藏此閱讀，可省略。
4. `.sr-only` 提供視障軟體閱讀，整行可省略。
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
善用你的 CSS 知識將輪播改為全版面（圖片皆為 1920*1080)。高度不變而調整寬度（響應式）時，圖片不變化尺寸自動保持水平置中進行多於裁切。

- img 如果比容器小，當然只要利用 text-center 或 mx-auto 就能置中，結案？!
- 但輪播圖片幾乎都超出或塞滿容器，前述對齊當然無法利用來解決。(mx-auto 本身填補時只有 0)
- img 除非是 background 可以控制中心點，否則需要去計算 margin 反推多少，使定位點往容器外去推。

**方案如下：**
1. 高度鎖定 vh-100 在 `.carousel-item` 容器上，img 也能繼承到，兩者都有固定高度為 100vh，圖片所綁定的w-100可取消。
2. 將圖片的空間放大，利用 left 跟 right 負值的方式 (position-absolute)，使這張圖片的內容左右位置比容器 left 跟 right 還遠大，圖片所綁定的d-block可取消(absolute已持有)。
3. 再搭配 margin auto 填滿，使得圖片剛好致中到看的到的容器範圍內。這樣容器的寬度不會影響圖片的定位，兩者是分開的定位觀念。
4. 轉場會卡卡的，是因為圖片太大的所以視覺上有問題，試著對.carousel-item的transition秒數放面觀察。
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

或者改由 JS 的 JSON 參數指定法，將對象的 `.carusel` 初始化（同對應前面 `[data-name]` 之名稱）：

```javascript
$('.carousel').carousel({
  interval:500,
  keyboard:false,
  pause:hover
});
```

還有一些 JS 的指令控制，舉幾個例子為

```javascript
$('.carousel').carousel('prev');
$('.carousel').carousel(1);
```

> 後續 JS 部分因實用性考量，之後的元件開始將不再特別介紹 Bootstrap 有提供開發者 JS 觸發事件反應與相關筆記說明，大多都是如何透過 JS 指令形成互動事件，有需求者自行前往官方元件文件學習理解。

## 摺疊 Collapse
目的是隱藏一區塊，透過任何互動 a:link 或 button 並綁定屬性 `data-toggle="collapse"` 來進行 JS 事件之摺疊，顯現方式會呈現向上展開之視覺。

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
官方另使用 card 元件並搭配設計一個手風琴效果。範例為三組 card(head+body)，父容器可綁定 `.accordion` 使這些摺疊反應群組為單一事件（切換）

1. 父容器指定 `.accordion` 代表為群組且單一顯示，父容器設定對象 (id 或 class)，子控制需綁定 `data-parent="父容器對象"` 。
2. 子項目 `.collapse` 代表隱藏對象，這些傢伙都要收起來。
3. 子項目 `.collapseing` 代表隱藏變化中，結束後會清除。
4. 子項目 `.collapsed` 代表已隱藏（但無功效可省略），JS 會自動填補此值。
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
下拉選單是指隱藏一個 DIV 容器跟互動按鈕的組合，並透過按鈕觸發顯示。Bootstrap 使用第三方插件 popper.js 進行處理，因此你必須宣告此插件才能使用下拉選單的動態事件。

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
4. menu 對齊選單按鈕部分，在 `.dropdown-menu` 處加入 `.dropdown-menu-right` 可對齊右方邊緣，
5. 同上，也支援響應式 `.dropdown-menu-{breakpoint}-{left|right}` 應用。

6. 可以添加 `.dropdown-item-text` 純文字（無 hover 作用），例如使用 `<span class="dropdown-item-text">Dropdown item text</span>` 。
7. 同上，可以添加標題，例如 `<h6 class="dropdown-header">Dropdown header</h6>` 。
8. 同上，可添加分隔線，例如 `<div class="dropdown-divider"></div>` 。
9. 同上，可添加喜歡的 HTML 元素，像是表單元件或添加一段 HTML 代碼，注意需要自訂上限寬度便是（預設 `.dropdown-menu` 只有 `min-width:10rem` 。
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
也是識別與實用性很高的元件，也是屬於比較開始複雜且固定的 class 公式，開始可以不用去理解 class 應用有無選項，絕大多數的人就是複製貼上直接改用即可。

### 基本結構
form 的公式稍微複雜且多樣化，公式不一定要跟著套用，跟外觀好看效果有影響。

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

1. label 是 HTML5 標準定義，提供做為某 input 標籤的定義標籤，透過 `label[for=id]` 與 `input#id` 形成關聯連動，非必要的用法，好處是當滑鼠點選 label 時等同 focus 該 input。
2. 屬性 `input[placeholder=]` 為提示用途，作用出現在輸入框內做提示。
3. 如果要大片禁用，可以添加容器並指定屬性為 `fieldset[disabled]` (fieldset 算是表單中的語意標籤，代表相關資訊的組合）。
4.  要是某 checkbox|raido 沒有 label 會影響外觀（ absolute 找不到貼齊處），應調整 `input:{checkbox|radio}.form-check-input.position-static` 修正。
5.  善用網格 grid 觀念玩出更多排版效果，可利用`.col-*`去控制寬度分配，或使用`.col-auto`自動依內容偵測決定寬度。

**單標籤外觀**

| 標籤                    | BS 公式                  | 效果                                                           |
| ----------------------- | ------------------------ | -------------------------------------------------------------- |
| input, select, textarea | .form-control            | 輸入型的外觀優化                                               |
| input, select, textarea | .form-control-{sm\|lg}   | 調整大小                                                       |
| small(or span)          | .form-text               | 作為提示句，帶有 d-block 與 margin-top                         |
| input:file              | .form-control-file       | 高亮提示                                                       |
| input:range             | .form-control-range      | 高亮提示                                                       |
| input[readonly]         | .form-control-plaintext  | 讓原本禁輸入的輸入框變成像普通文字                             |
| input:checkbox\|radio   | .form-check-input        | 高亮提示                                                       |
| label                   | .form-check-label        | 若搭配 checkbox\|radio 做這種行內描述，建議調整此 inline-block |
| label.col-*             | .col-form-label          | 若 input&label 直接套 col，建議調整此垂直文字對齊              |
| label.col-*             | .col-form-label-{sm\|lg} | 若 input&label 直接套 col，調整大小改由此公式                  |
| form                    | .form-inline             | 一行式（非手機）的表單，整個 form 標籤變成 flex。              |

**多標籤組合建議**

| 子項目組合             | 父容器建議                       | 效果                               |
| ---------------------- | -------------------------------- | ---------------------------------- |
| label, input           | div.form-group                   | margin-bottom:1rem，為 block       |
| label, checkbox\|radio | div.form-check                   | 適當的左側行內間距，為 block       |
| label, checkbox\|radio | div.form-check.form-check-inline | 適當的左側行內間距，為 inline-flex |
| label, input           | div.row>div.col                  | Grid of row>col                    |
| label, input           | div.form-row>div.col             | 同上但比較緊密                     |

### 表單驗證效果
算是特別重要的，主要是判斷這個表單的有效值，藉由 HTML 自身表單狀態進行相關反應動作。

1. HTML5 本來就有自己的表單驗證效果（高優先），如果你希望關閉可添加屬性 `form[novalidate]`，將改為使用 Boostrap 的驗證效果。
2. Bootstrap 的所有驗證效果是寫在`form.was-validated`，需要透過手動 JS 方式去控制添加移除，達到驗證結果的顯示隱藏。包含 AJAX 這種提交完需取消檢查，也需自行透過 JS 移除 `.was-validated` 之 Class 名稱。
3. 想要單獨操作可改 JS 控制單筆 `input.{is-valid|is-invalid}` 來觸發指定對象外觀，就不用在表單上填入 `.was-validated` 做全部控制。
```javascript
$("#validationCustom01").addClass("is-valid");
```
4. 驗證的 (input, textarea, select) 所發出綠色或紅色提示框，是 Bootstrap 採用偽元素：invalid & :valid 所固定編寫的 CSS。
5. 接續上話題，偽元素：invalid & :valid 根據 HTML5 檢查合理性作業下 (required 與 type 屬性）所提供的外觀 CSS 處理。

6. 總結來說，你需要自行**編寫 JS 腳本來控制**遞交表單時進行判斷欄位滿足條件，若不成立時清除遞交動作指令並添加 `form.was-validated` ：
```javascript
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

7. 觸發時如果額外需要提示字（自訂），可以另添加 `div.{valid-feedback|invalid-feedback}` 作為當下合理與不合理的提示文字，這個提示字只會在 `form.was-validated` 下被看見。
8. 同上，另一種的提示泡泡效果為`div.{valid-tooltip|invalid-tooltip}`，需確保父容器有 `position:relative` 可參考定位（如果是使用 .col 來排版就已有此參數）。

### 自訂外觀
Bootstrap 為了統一外觀（擺脫原本 checkobx 跟 radio 的 HTML5 框架），另外設計了透過偽元素 CSS 做出來的自訂版之 checkbox 與 radio，只要調整 class 名稱即可取得。

#### radio & checkbox
- 使用 `div.custom-control` 為容器包覆（提供適當左側間距，替代 `form-check` 用途）。
- 在這個容器內將會有 checkbox 時，增加 `.custom-checkbox` （圓角化效果）。
- 同上，在這個容器內將會有 radio 時，增加 `.custom-radio` （圓角化效果）。
- 其餘 input 與 label 部分與傳統 class 公式差不多，只要把 `.from-*` 改成 `.custom-*` 即可。
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
> checkbox 有特別的偽類 `:indeterminate`，跟 `:invalid, :valid` 同應用，處於一種預設情況下之不明確的項目。可以透過 JSJQ 來控制初始調整。如下例：
```javascript
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
- 由於 custom 版透過偽元素設計出，因此另採用第三方插件 (bs-custom-file-input) 能對檔案動態載入提示 (JS)。
- input:file 的 HTML5 屬性 multiple 為多檔案上傳，注意以陣列型態設定傳值 name[]。
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
> Bootstrap 推薦使用第三方插件 `bs-custom-file-input` 優化動態拖曳的效果，記得裝載 `bs-custom-file-input.js` 並宣告使用。
```html
<script src="https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js"></script>
<script>
  bsCustomFileInput.init(); //使得 custom 版也有 file input 之動態拖曳檔案之效果
</script>
```

---
## 輸入框群組化 Input Group
屬於表單特別加強的一種視覺包裝（可多筆連成 inline 並圓角化），能對 input 欄位添加前後敘述。層級公式架構如下：

1. input-group 的 CSS 參數為 flex-warp（不換行，試著縮小網頁寬度測試）。
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
作為容易提醒的主題區域，適合做一些文字傳達的資訊廣告。

1. 主容器 `div.jumbotron` 會產生一個灰底的背景區塊，你可以在容器內上盡情使用任何標題內文按鈕之類的應用標籤。
2. 若不需要圓角化，可以主容器另添加 `.jumbotron-fluid` 。
3. 如果需要窄版，應該在容器內使用 `div.container` 的布局應用。

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
呈現一種垂直或水平之連續排列的清單群組，可以是基礎型 ul>li 或是互動型 div>{a|btn}，提供邊框與組合原角化之效果。

```html
<ul class="list-group">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item active">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
</ul>
```

| 適於父容器 `.list-group`               | 適於子項目 `.list-group-item` | 效果                                                                           |
| -------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------ |
|                                        | .active                       | 高色差代表作用中                                                               |
| list-group-flush                       |                               | 消除外框線                                                                     |
| list-group-horizontal                  |                               | 調整為水平排列                                                                 |
| list-group-horizontal-{sm\|md\|lg\|xl} |                               | 同上，適應模式                                                                 |
|                                        | list-group-item-{color}       | 添色<br>color: primary, secondary, success, danger, warning, info, light, dark |
|                                        | list-group-item-active        | 同上，可修正 hover 效果上的添色變化                                            |

1. 使用互動的清單標籤，建議改用 `div.list-group>{a:link|btn}.list-group-item` ，利用 {a:link|btn} 本身的 hover 屬性提供互動感。
2. 對 item 類型（但 a 類型無效）添加 HTML 屬性 `[disabled]` 部分，可以消除互動或增添淡字效果。
3. 常看到商業網站的清單夾帶 badge 標籤之效果（如下例），透過 flex 觀念（主軸 between） + badge 公式即可完成。BS 官方還有另一個範例可以自前研究。
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
清單群組可以進階設計成帶有內容切換的 tabs 功能，這需要搭配 Bootstrap.js 發生腳本行為，共會有兩個獨立容器分別當作選單與分頁。

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

Bootstrap.js 已設計好這些 a:link 的錨點控制行為為`$().tab`操作，因此你可以手動 JS 觸發這些動作：
```javascript
$('#controldemo a[href="#profile"]').tab('show') // Select tab by name
$('#controldemo a:first-child').tab('show') // Select first tab
$('#controldemo a:last-child').tab('show') // Select last tab
$('#controldemo a:nth-child(3)').tab('show') // Select third tab
```

> 另還有觸發反應事件，請參考官方說明

## 媒體物件 Media Object
簡單來說是一個帶有縮圖、標題、內文的媒體區塊，通常拿來作為一小段的文章展示，或是像部落格之類的首頁文章或一些商用網站的文宣片段。

1. 架構使用 `div.media>img+div.media-body` 即可，這是一個帶有 flex 容器的呈現手法。
2. 任何文字標題都應該放入 `.media-body` 內，使得與圖片切版排列齊項。
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
資訊量龐大且實用性高的元件，透過觸發時動態呼叫另一組隱藏的浮動內容視窗顯示，使得網頁有一種彈跳視窗的效果。大致上你會有一個觸發按鈕 `btn[data-toggle=modal]` 以及內容視窗 `div.mode.fade` 。

### 觸發按鈕條件
- 屬性 `[data-toggle=modal]` ： 完成 modal 呼叫
- 目標 `a[href=#id]` or `btn[data-target=#id]` ：指定 modal 目標對象

### 內容視窗結構
- 完整三層結構為：`div#id.modal>div.modal-dialog>div.modal-content`
- 第一層 `.modal`：滿版的大容器，並占用整個 viewpoint 頁面。
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
- 開啟時若內容過長這裡預設會持有 `overflow-y: auto;` 效果（自賦予 `.modal-open` )。

### .modal-dialog 的效果條件
- 增添 `.modal-dialog-scrollable` 能將內容過長滾輪化的效果改為發生於 `.modal-body` 上而不是 `.modal`。
- 視窗位置預設靠上，可添加 `.modal-dialog-centered` 改為垂直置中。
- 視窗寬度預設 500px，可添加 `.modal-{sm|lg|xl}` 使互動視窗的尺寸調整為 300px, 800px, 1140px。

### .modal-content 的效果條件
- 標題結構使用 `div.modal-header>div.modal-title` 能提供良好的外觀。
- 內容結構 `div.midal-body` 可自行整合任何 Boostrap 元件，例如 Tooltips, popovers 或 grid (.container-fluid>.row>.col) 觀念。

可對 model 進行 JS 控制或參數調整（詳閱官方說明），舉例來說，若想想關閉灰透的互動，有兩種方法：

1. 透過 JS 腳本設定
```javascript
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
簡單清爽的 flex 類型之列表式導覽選單，不同於 list group（該元件較適合 Block 型的內容選單或側邊選單），Navs 通常適合 inline 型的頁首或頁尾區使用。

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
2. 套用結構到 ul>li>a:link 時建議添加 `a.nav-link` 達到良好外觀，整題結構為 `ul.nav>li.nav-item>a:link.nav-link` 。
3. 同上，對 `a:link.nav-link` 添加 `active` 無用，只能對父容器再增添調整為 `ul.nav.nav-pills` 使修正外觀（為 btn 外觀）才有作用。
4. 規則也可套用任何容器結構上，舉例為 `nav.nav>a.nav-item.nav-link`。
5. 對父容器 `ul.nav` 增添 `.nav-tabs` 將產生另一種外觀 ( tab 型態）作用。
6. `.nav-item` 可整合 dropdown 元件，將互動鈕跟 Dropdown 容器的組合放入。

### flex 的運用
1. `.nav` 父容器本身因為是 flex 狀態，因此添加 `.justify-content-{center|right}` 能讓整個 ul 容器水平置中或向右靠齊。
2. 父容器添加 `.flex-column` 改變方向，變成垂直選單。
3. 垂直時可以省略 `.nav-item`，譬如 ul>li>a 可改用 `nav.nav.flex-column>a.nav-link` 結構即可。
4. 對父容器增添 `.nav-fill` 則對子項目 item 皆產生自動填滿效果 ( `flex: 1 1 auto;` )。
5. 對父容器增添 `.nav-justified` 則對子項目 item 皆產生一樣寬並自動填滿效果 ( `flex: 1 1 0;` )。
6. 基於是 flex 狀態，當然你可以設計成響應式做不同效果。

### tabs 清單模式 （配合 JS)
這裡能發展出類似前面介紹的 list group 的應用但不同效果，同樣需要搭配 Bootstrap.js 發生腳本行為，共會有兩個獨立容器為選單與分頁。

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

Bootstrap.js 已設計好這些 a:link 的錨點控制行為為$().tab 操作，因此你可以手動 JS 觸發這些動作：

```javascript
$('#myTab a[href="#profile"]').tab('show') // Select tab by name
$('#myTab li:first-child a').tab('show') // Select first tab
$('#myTab li:last-child a').tab('show') // Select last tab
$('#myTab li:nth-child(3) a').tab('show') // Select third tab
```
---
## 導覽列 Navbar
由 Nav 再進化提供網站選單之元件（不同的公式，一個是 nav 一個是 navbar) 且資訊量大，也是一個網站的重要核心之主選單部分，更牽扯到 RWD 網站的選單變化設計。Navbar 除了選單連結，還能加入 品牌 LOGO 或表單元件等等。大致結構為：

`nav.navbar`（主容器） > `a.navbar-brand`(LOGO 區） + `button.navbar-toggler>span.navbar-toggler-icon`（漢堡按鈕） + `div.nav-collapse`（選單區）+ 其他項目。

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
1. `nav.navbar` 內可放入 `a.navbar-brand` 網站名稱（或圖片）、`button>navbar-toggler` 漢堡（響應式）選單按鈕、導覽選單、或其他項目（例如表單 inline 元件，純文字等）。
2. 添加 `.navbar-expand-{sm|md|lg|xl}` 可控制漢堡按鈕之隱藏模式（顯示時為 `div.collapse` )，若完全隱藏請寫 `.navbar-expand`。
3. 字色控制 `.navbar-{light|dark}` ，可搭配 `.bg-{color}` 通用效果。
4. 子項目之間的靠齊方式，可使用 `mr-auto` 或 `ml-auto`，或善用 flex 技巧。
5. 如需窄版效果，可添加父容器 `.container` 使用。
6. 提供三種常見定位方式為 `.flex-top`, `flex-bottom`, `sticky-top`。

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
- `nav.navbar.flexd-top`，浮起並重疊`<body>`區，固定在頁首。
- `nav.navbar.flexd-bottom`，浮起並重疊`<body>`區，固定在頁尾。
- `nav.navbar.sticky-top`，只有當離開頁面時才浮起並重疊`<body>`區，固定在頁首（好用）。

### 整體應用技巧
1. 如果在小螢幕時隱藏網站 LOGO ，把 `.navbar-brand` 搬移到 `.navbar-collapse` 內就能一起隱蔽。
2. 如果想小螢幕時讓漢堡鍵靠左而網站 LOGO 靠右，讓 HTML 位置顛倒這兩筆標籤，順序寫法為 `button.navbar-toggler+a.navbar-brand`。
3. 漢堡鍵也能控制一般元素對象，該元素同樣綁定 id 以及指定 `.collapse` 即可。
---
## 分頁導覽 Pagination
用於多篇文章項目的分頁導覽，大致上就是包裝成群組外框與連續指定的連結標籤。

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
這裡會依賴第三方外掛 popper.js ，可使用 bootstrap.bundle.js（內含 bootstrap.js + popper.js)，效果是能觸發一個緊湊且可指定位置的小提示框，但僅限於簡單的標題與文字提示。

因為效能問題不會自動生效，你必須手動網頁上透過 JS 初始化才能使觸發有效。透過 JQ 找到對象後執行 popover 函式初始化。 `[data-toggle="popover"]` 為 Bootstrap 建議統一寫法，非絕對。

```html
<button type="button" class="btn btn-secondary" data-content="poper message">touch me</button>
<script>
  $('button').popover();
</script>
```

| 參數說明                                                       | 預設（未指定） | HTML 屬性 data-*            | JS.prpover（參數）     |
| -------------------------------------------------------------- | -------------- | --------------------------- | ---------------------- |
| 顯示文字                                                       |                | data-content=*              | content:*              |
| 顯示標題                                                       |                | title=*                     | title:*                |
| 顯示於指定元素內（需已存在）                                   | body           | data-container=*            | container:*            |
| 彈跳方向 (left,right,top,bottom)                               | left           | data-placement=*            | placement:*            |
| 更改觸發開關方式 (:focus,:hover)<br>需注意 a 或 btn 有那些偽類 | :click         | data-trigger={focus\|hover} | trigger={focus\|hover} |

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
一種作為固定表示進度用途的視覺元件，結構為 `div.progress>div.progerss-bar`。

```html
<div class="progress" style="height:40px">
  <div class="progress-bar bg-danger" style="width:66%">66%</div>
</div>
```

### .progress 父容器
- 可指定 CSS 高度成為大小尺寸。
- 可多筆子項目 `.progress-bar`，他們會累加併聯一起。

### .progress-bar 子項目
- 必需指定 CSS 寬度（單位%)，作為進度比例單位。
- 元素內容填寫文字，將成為該 bar 之標籤字且置中。
- 玩色組合 bg-color 通用操作。
- 糖果紙外觀添加 `.progress-bar-striped`，動畫化可多添加 `.progress-bar-animated`

---
## 滾動監控 Scrollspy
能偵測目前處於哪一個錨點位置同時適當反應修正 active 狀態，這需要 Bootstrap.js 的協助處理。通常用於 navs 或是 list-group 這類的選單型皆可適用。

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
3. 父容器之 CSS 屬性必需是 `relative`，若不是 body 則需指定 height 值與 overflow:scroll(auto)。
4. 父容器之屬性`[data-offset=0]`，能調整監控回報的位置偏差多少值。
5. 父容器可以是 body 則不需指定 relative, height, overflow。反而是推薦反應端改用 `.stick-top` 或相關固定方式。

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
這裡已經提供一些 HTML + CSS animation 的動態圖示，如果你希望拿來當資料處理的過渡時間，你需要自己動手做出 JS 腳本控制這些 DOM 與隱蔽圖示之時機。
```html
<div class="spinner-border text-danger"></div>
<div class="spinner-grow text-danger"></div>
```
1. 提供旋轉或漸變模式，分別是 `.spinner-{border|grow}` ，另添加 `.text-{color}` 玩色。
2. 提供尺寸調整，另添加`.spinner-{border|grow}-{lg|sm}`。
3. 本質為 inline-block，所以可以用 flex, text-align, float, margin 這類技巧去處理排版，也可整合到任何的元素或元件內。
---
## 吐司方塊 Toasts
常見於社群網站的資訊傳送或服務網頁的即時傳遞使用，主要是模仿電腦桌面角落的推播方塊，本身採用 flex 概念。架構為

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
1. 初始下看不見（透明度 0)，你可以添加 `.show` 來看見，或者使用 JS 腳本執行 toast() 物件來操作。
2. 預設會呈現半透明，如果瀏覽器支援還會有模糊效果 （採用濾鏡 backdrop-filter:blur)。
3. 關閉按鈕可設計 `btn.close[data-dismiss="toast"]` 做為控制。
4. `.toast` 獨立使用一格方塊，多個方塊當然是多個容器且堆疊。
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
toast 提供像是曝光秒數 (data-delay)，自動消失 (data-autohide) 等應用參數，可以用 HTML 的 data 屬性或是 JS 物件宣告指定。

1. 透過手動 JS 進行顯示，但預設只有 500 豪秒曝光且會自動隱藏。
```javascript
$('.toast').toast('show');
```
2. 修改曝光豪秒方式，可透過 HTML 屬性 [data-delay=*] 或 JS 物件參數操作。
3. 取消自動隱藏方式，可透過 HTML 屬性 [data-autohide=false] 或 JS 物件參數操作。
4. 取消預設淡出效果，可透過 HTML 屬性 [data-animation=false] 或 JS 物件參數操作。

---
## 工具提示 Tooltips
是一個比 Popovers 還更單調的元件，只能取得自身的 title 屬性變成泡泡方塊作為 hover 提示。這裡會依賴第三方外掛 popper.js ，可使用 bootstrap.bundle.js（內含 bootstrap.js + popper.js)。

因為效能問題不會自動生效，你必須手動網頁上透過 JS 初始化才能使觸發有效。透過 JQ 找到對象後執行 tooltip 函式初始化。

```html
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>
<script>$('button').tooltip();</script>
```

官方提供相當多的參數能設定，你可以透過 JS 物件去調整，也能透過 HTML5 的 data-*屬性來調整。
1. 添加屬性 [data-toggle="tooltip"] 為 Bootstrap 建議統一寫法，非絕對。
2. 必要屬性 [title] 為提供為提示字（也能使用 HTML CODE 作為提示文，詳閱官方文件）。
3. 添加屬性 [data-html] 為使提示字支援 HTML Code。
4. 添加屬性 [data-container=body] 能指定 DOM 寫入元素為誰。
5. 添加屬性 [data-placement={left,right,top,bottom}] 能控制提示框的呈現方向。

```html
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>
```

# 結語
Boostrap 最大的學習重點是如何善用他的 grid 來發展你的 RWD 網站，以及如何快速的使用元件來完成網站部屬，在刻版過程當中使用通用操作完成簡單的屬性設定，但切記不要過度依賴 class 命名瘋狂指定，這會讓你的 HTML 的複雜度提升，如果你的 class 公式需求過高時還是回到自訂 class 來完成 CSS 屬性編寫。下一章節為實作部分，提供主題完成 Bootstrap 的開發網站體驗。