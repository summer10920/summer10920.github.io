---
title: "Bootstrap 5.0：工具、通用、表單"
categories:
  - 前端
  - Bootstrap
tag:
  - PHP 資料庫網頁設計（職前班）
  - RWD 響應式網頁設計（假日班）
  - Bootstrap
date: 2021-03-01 12:59:44
---
![](assets/images/banner/bootstrap.png)
本篇先介紹較基礎的 Utilities 通用類別（各種局部調整與快速建立的公式），再介紹 Helpers 工具（常用的輔助調整），最後是 Forms 表單（完整的表單互動系統）。

<!-- more -->

{% note warning %}
**版本提醒**
本文使用 Bootstrap 5.0（2021 年）。後續的 5.1～5.3 大致維持相同用法，另新增了 CSS 變數（5.2）與深色模式（5.3）等功能，細節請以官方文件為準。若你要維護 Bootstrap 4 的舊專案，請參考 {% post_link bootstrap-4-content-utilities Bootstrap 4.4 教學（二） %}。
{% endnote %}

---

# 通用 Utilities
通用類別（Utilities）是通用且非常常見的外觀公式，也是整個 Bootstrap 中最常用、最需要記住的部分，能讓你輕鬆快速地套用出各種視覺效果。

## API
本節說明如何使用官方原始的 Sass 檔自訂類別與數值，不在本系列的介紹範圍。

## 背景色 Background
背景色使用 `.bg-{color}` 指定；若需要漸層效果，額外加上 `.bg-gradient`。

```css
.bg-{color} /*背景色*/
color: primary, secondary, success, danger, warning, info, light, dark, white, transparent;

.bg-gradient /*套上漸層色，原理採用疊上透明垂直漸層之 image*/
```

> 如果你有自己的背景 CSS，也可以加上 `.bg-gradient` 套用漸層效果。

## 邊框 borders
使用 `.border` 能為元素加上邊框線，效果為 `border: 1px solid #dee2e6`，也可以只在特定方向加邊框。

```css
.border  /* 四邊產生 1px 的灰色邊框線 */
.border-{direction}  /* 只有該處有邊框線 */
direction: top, end, bottom, start
```

相反地，`.border-0` 是 `border: 0 !important` 的無邊框效果。

```css
.border-0  /* 邊框線為無 */
.border-{direction}-0  /* 只有該處邊框線為無 */
direction: top, end, bottom, start
```

要調整邊框顏色可以使用 `.border-{color}`，它只負責顏色，邊框線本身仍需先加上 `.border`。

```css
.border-{color}  /* 指定邊框顏色 */
color: primary, secondary, success, danger, warning, info, light, dark, white
```

邊框粗細使用 `border-*`，等級為 1～5，每級差 1px。

```css
.border-{number}  /* 指定邊框粗度 */
number: 1, 2, 3, 4, 5
```

圓角使用 `.rounded`，效果為 `border-radius: .25rem`，也可以指定只有部分方向圓角，或變成特定形狀。

```css
.rounded  /* 圓角化效果為 0.25rem */

.rounded-{direction}  /* 部分圓角化 */
direction: top, end, bottom, start

.rounded-circle  /* 圓形 */
.rounded-pill /* 橢圓形 */

.rounded-{number} /*原角尺寸*/
number: 0（無圓角）, 1, 2, 3
```

## 顏色 colors
顏色是非常重要且實用的公式，官方替每種顏色取了名字，請務必習慣它們：大多數跟顏色有關的參數都會用到這些名稱。另外提醒，亮色文字要搭配對比高的暗色背景，反之亦然。這些顏色也會對應 `:hover` 與 `:focus` 產生色彩變化。

```css
.text-{color} /*文字色 */
color: primary, secondary, success, danger, warning, info, light, dark, body, muted, white;

.text-{black|white}-50  /*對黑與白多設計一種透明度為 0.5 的黑白字效果*/
```


## 顯示 display
前一篇已提早完整介紹過，本處不再說明。

## 彈性盒 flex
前一篇已提早完整介紹過，本處不再說明。

## 浮動 float
與 CSS 的 `float` 觀念相同，同樣支援響應式。

```css
/* float */
.float-{value} /* 設定 float */
.float-{breakpoint}-{value} /* 響應式 float */

value: start, end, none
breakpoint: sm, md, lg, xl, xxl
```

## 互動 Interactions
部分 HTML 元素提供可互動的事件反應（包含文字選取與點擊）。
- 原理是 CSS3 的 `user-select`，可指定該段文字能否被反白選取（網頁初始值為 `user-select: auto`）
- 原理是 CSS3 的 `pointer-events`，可指定是否回應滑鼠事件（網頁初始值為 `pointer-events: auto`）

```css
/* user-select */
.user-select-{value}
value: all, auto, none)

/* Pointer Events */
.pe-{value}
value: none, auto
```

```html https://getbootstrap.com/docs/5.0/utilities/interactions/
<div class="container">
  <h1>User Select on Text</h1>
  <p class="user-select-all">Can select and be all range</p>
  <p class="user-select-auto">Default behavior</p>
  <p class="user-select-none">Can't selected</p>

  <h1>Pointer Event on Mouse</h1>
  <p><a href="#" class="pe-none">Can't clicked</a></p>
  <p><a href="#" class="pe-auto">Default behavior</a></p>

  <h1>Pointer Event 繼承與優先</h1>
  <div class="pe-none">
    <a href="#"> a 繼承 pe-none</a> <br>
    <a href="#" class="pe-auto"> a.pe-auto </a>
  </div>
</div>
```

> 如果不想讓元素被點選，應該同時加上 `tabindex="-1"` 與 `aria-disabled="true"`（例如 `a[tabindex="-1" aria-disabled="true"]`），確保鍵盤與螢幕閱讀器也一併被禁用。

## 溢出處理 overflow
與 CSS 觀念相同，只提供四種常用模式。

```css
/* overflow */
.overflow-{value} /* 設定 overflow */
value: auto, hidden, visible（網頁初始值）, scroll
```

## 位置 position
與 CSS 觀念相同，提供五種常用模式。

```css
/* position */
.position-{value} /* 設定 position */
value: static, relative, absolute, fixed, sticky
```

除此之外還提供定位參數使用，並可搭配 translate 完成偏移 -50%。

```css
.{direction}-{number}
direction: top, bottom, start, end
number: 0, 50, 100 （單位%)

.translate-middle /* 效果為 transform:translate(-50%,-50%) */
.translate-middle-x /* 效果為 transform:translateX(-50%) */
.translate-middle-y /* 效果為 transform:translateY(-50%) */
```

```html https://getbootstrap.com/docs/5.0/utilities/position/#examples
<div class="container d-flex vh-100 justify-content-evenly align-items-center">
  <button type="button" class="btn btn-primary position-relative">
    Mails <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+99 <span
        class="visually-hidden">unread messages</span></span>
  </button>

  <button type="button" class="btn btn-dark position-relative">
    Marker 
    <svg width="1em" height="1em" viewBox="0 0 16 16"
      class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#212529"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  </button>

  <button type="button" class="btn btn-primary position-relative">
    Alerts <span
      class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span
        class="visually-hidden">unread messages</span></span>
  </button>
</div>
```

## 陰影 Shadow
為元素加上陰影。此效果對部分元件可能無效（Bootstrap 預設停用了部分元件的陰影），需到 `scss/_variables.scss` 將 `$enable-shadows` 設為 `true`。

```css
.shadow-none /*無陰影*/
.shadow-sm /*小陰影*/
.shadow /*陰影*/
.shadow-lg /*大陰影*/
```

## 尺寸 sizing
切版時經常需要事後調整元素的尺寸，這裡提供了固定的寬高公式。

```css
/* by percent */
.w-{value} /* 指定該寬度為多少百分比 */
.h-{value} /* 指定該高度為多少百分比（前提為負容器有固定高） */
value: 25, 50, 75, 100, auto
.mw-100 /* max-width:100% */
.mh-100 /* max-height:100% */

/* by viewport */
.vw-100 /* width:100vw */
.vh-100 /* height:100vw */
.min-vw-100 /* min-width:100vw */
.min-vh-100 /* min-height:100vw */
```

## 間距 spacing
前一篇已提早完整介紹過，本處不再說明。

## 文字 text
文字對齊的方式前面有提到，這裡再完整複習一下：
```css
.text-{value} /* text-align */
.text-{breakpoint}-{value} /* 響應式 text-align */

value: start, end, center
breakpoint: sm, md, lg, xl, xxl
```
> 第五版已移除 `.text-justify`（`text-align: justify`，主要用來讓英文字適當填滿空間）。

文字換行或斷行的處理（前提是先發生 overflow 溢出）：
```css
.text-wrap /* 臨界至寬度時，文字自動換行 */
.text-nowrap /* 臨界至寬度時，文字不換行讓他溢出 */

.text-break /* 當英文單字之字母過長時，必要時允許斷行 */
```

文字大小寫：
```css
.text-lowercase /* 英文全轉小寫 */
.text-uppercase /* 英文全轉大寫 */
.text-capitalize /* 僅判讀英文各單字第一字母轉大寫 */
```

文字尺寸，同等 h1~h6 尺寸只是沒有粗體與行高：
```css
.fs-{number}  /* font-size: 2.5rem ~ 1rem */

number: 1, 2, 3, 4, 5, 6
```

文字粗體與斜體效果：
```css
.fw-{value} /* 粗體 */
value: bold, bolder, normal, light, lighter

.fst-{value} /*斜體*/
value: italic, normal
```

行高效果，控制段落元素之行間高度。
```css
.lh-1     /* line-height:1 */
.lh-sm    /* line-height:1.25 */
.lh-base  /* line-height:1.5 */
.lh-lg    /* line-height:2 */
```

其他效果
```css
.text-monospace /* 套用 monospace 字型，通常適合程式代碼使用 */
.text-reset /* 清除自己文字屬性，方便由父元素繼承 */

.text-decoration-{value} /* 裝飾線之底線、刪除線、無裝飾線 */
value: underline, line-through, none
```

## 垂直對齊 Vertical align
這裡的垂直對齊只對 inline 類型的元素有效（不是 block），例如 `inline`、`inline-block`、`inline-table` 與表格的 `td`，通常用在表格儲存格的文字，效果最明顯。

```css
.align-{value} /*垂直對齊位置*/
value: baseline, top, middle, bottom, text-top, text-bottom
```

## 可視性 visibility
前一篇已提早完整介紹過，本處不再說明。

# 工具 Helpers
Helpers 工具收錄了設計網頁時常用的調整技巧，用來快速做局部調整。

## 清除浮動 clearfix
對包住浮動元素的父元素加上 `.clearfix`，就能讓子元素的浮動不會影響父元素之後的 HTML 元素。原理是：

透過偽元素 `::after` 執行 `clear: both`，在父元素結尾清除所有浮動；同時 `::after` 是 `display: block`，會把父元素的高度撐回來。

```css bootstrap.css（官方樣式）
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
```

使用範例：
```html
<div class="bg-info clearfix">
  <div class="float-left bg-danger">Example Button floated left</div>
  <div class="float-right bg-danger">Example Button floated right</div>
</div>
```

> 只要記得：使用浮動時，用一個父元素包住並加上 `.clearfix`，父元素以外的部分就不會受浮動影響，父元素本身的高度也不會塌陷。

## 連結色 Colored links
任何超連結 `a` 元素都可以指定顏色，並自帶 hover 時的差異色。

```css
.link-{color}
color: primary, secondary, success, danger, warning, info, light, dark
```

## 比例 Ratio
Ratio 取代了舊版的 embed 通用類別，現在可以對任何媒體類型（`iframe`、`embed`、`video`、`object`、`div`、`img`）進行比例控制，依寬度推算出高度。重點如下：

- 需要一個父容器加上 `div.ratio` 才會生效。
- 同一個父容器上要指定比例值 `ratio-*`（共 4 種），注意 `.ratio` 仍不可省略。
- 若需要自訂比例，可透過 style 屬性設定 `--aspect-ratio`（例如 `style="--aspect-ratio: 50%"`），單位為百分比

```css
/* embed responsive*/
.ratio /* 綁定父容器進行比例觸發 */
.ratio-{value} /*設定比例*/
value: 21x9, 16x9, 4x3, 1x1

[style=--aspect-ratio:{custom_value}%] /* 指定自訂比例，單位為數字百分比
```

> 外觀優化已包含去除邊線（`frameborder="0"`）與依容器調整寬度；高度則由比例決定，不需要另外設定。

```html
<style>
  div>div {
    background: #ccc;
  }
</style>

<div class="container">
  <h1>ratio 預設為寬 100 若不固定尺寸會填滿空間</h1>
  <div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
  </div>
  <div class="d-inline-block w-25 ratio ratio-1x1">
    <div>1x1</div>
  </div>
  <div class="d-inline-block w-25 ratio ratio-4x3">
    <div>4x3</div>
  </div>
  <div class="d-inline-block w-25 ratio ratio-16x9">
    <div>16x9</div>
  </div>
  <div class="d-inline-block w-25 ratio ratio-21x9">
    <div>21x9</div>
  </div>
  <div class="d-inline-block w-25 ratio" style="--aspect-ratio:33.3%">
    <div>custom 33.3% = 3x1</div>
  </div>
</div>
```

響應式比例沒有內建，需要時可自行編寫，例如：在 md 以上（768px 起）變成 2x1。
```css
@media (min-width: 768px){
  .ratio-4x3 {
    --aspect-ratio: 50%;
  }
}
```

## 常用定位 Position
與通用類別的 position 不同，這裡的工具提供了幾種常用的固定方式：固定在頂端、固定在底部、捲動到頂端時黏在上方（sticky），這些都是網站常見的手法。

```css
.fixed-top /*保持上面*/
.fixed-bottom /*保持下面*/
.sticky-top /*撞到頂端則保持上面*/

/*僅針對 sticky-top 提供響應斷點*/
.sticky-{breakpoint}
breakpoint: sm, md, lg, xl
```

## 視覺隱藏 visually-hidden
與 CSS 的 `visibility` 不同，這裡是把元素縮到極小，讓畫面上看不見，但螢幕閱讀器仍然讀得到。

```css
.visually-hidden /*隱藏於畫面上*/
.visually-hidden-focusable /*隱藏於畫面上，唯獨 focus 狀態（鍵盤選取）時才呈現*/
```

## 延伸連結 Stretched link
如果希望連結的可點擊範圍擴大到外層容器，可以對連結加上 `.stretched-link`。它會產生一個 `::after` 偽元素，並以 `position: absolute` 填滿最近的已定位祖先元素，因此 **需要在父元素** 加上 `position: relative`，把範圍限定在這個父元素內。

範例為：
```html
<div class="w-50 position-relative bg-dark text-white">
  <div>
    <h5 class="mt-0">延伸連結區域之範例</h5>
    <p>整個黑色是由一個上層元素綁定 position-relative，使得作用僅限於上層元素（黑色區域），上層範圍可以很祖先。</p>
    <a href="#" class="stretched-link">我是連結反應</a>
  </div>
</div>
```

{% note danger %}
**containing block：**
`absolute` 向上尋找定位參考時，如果遇到持有以下屬性的元素，就會以該元素為參考，造成預期之外的定位：
- `position` 不是 `static`
- 持有 `transform` 或 `perspective` 屬性
- 持有 `filter` 屬性（Firefox）
{% endnote %}

## 文字截斷 Text truncation
寬度有限而文字溢出時，可加上 `.text-truncate`，它會以「…」取代溢出的部分；注意只對 `block` 或 `inline-block` 元素有效。

```css
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```html https://getbootstrap.com/docs/5.0/helpers/text-truncation/
<!-- Block level -->
<div class="row">
  <div class="col-2 text-truncate">
    Praeterea iter est quasdam res quas ex communi.
  </div>
</div>

<!-- Inline level -->
<span class="d-inline-block text-truncate" style="max-width: 150px;">
  Praeterea iter est quasdam res quas ex communi.
</span>
```

# 表單 Forms
表單是 Bootstrap 最具特色的 UI，雖然元素與 class 比較複雜，初學者可以先複製範例再修改使用。

為了簡化程式碼，本篇參考官方手冊後，做了以下調整：

1. 把 id 名稱或目標名稱改為 `lokiXXX`，讓人更容易理解這裡可以自訂名稱。
2. 移除 `aria-*` 屬性（給螢幕閱讀器或機器判讀用）以減少程式碼，但實務上仍建議保留。
3. 移除不重要的 id，避免誤會 id 是必要的。

接下來會介紹各種表單元素的基本公式；在某些情況下，應該用 `div` 父元素把 `input` 與 `label` 包成一個群組來排版。除了基本的 `div`，最後還會介紹 `div.input-group` 與 `div.form-floating` 兩種表單群組的排版技巧。

## 概觀 Overview
表單的 class 公式雖然複雜且多樣，不一定要全部套用，是否套用取決於外觀是否好看。

```html https://getbootstrap.com/docs/5.0/forms/overview/#overview
<form class="container">
  <div class="mb-3">
    <label class="form-label" for="lokiMail">Email address</label>
    <input class="form-control" id="lokiMail" type="email">
    <div class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label class="form-label" for="lokiPassword">Password</label>
    <input class="form-control" type="password" id="lokiPassword">
  </div>
  <div class="mb-3 form-check">
    <input class="form-check-input" id="lokiCheck" type="checkbox">
    <label class="form-check-label" for="lokiCheck">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

input 欄位的建議組合是 `label.form-label + input.form-control + div.form-text`，分別代表標題、欄位與描述文字。
- `label.form-label`：提供下方 margin 間隔
- `input.form-control`：block 滿寬與外觀優化
- `div.form-text`：提供上方 margin 間隔與文字調整，非必要可省略；可套用在 block 或 inline 元素。

check／radio 欄位的建議組合是 `div.form-check > input:checkbox.form-check-input + label.form-check-label`，分別代表欄位與內文。
- `div.form-check`：父元素，負責適當的排版
- `input:checkbox.form-check-input`：提供美觀的勾選框
- `label.form-check-label`：用於內文，但沒有任何樣式效果（可省略 class）

### 禁用 Disabled
如果要一次停用多個欄位，可以用 `fieldset[disabled]` 包住（`fieldset` 是表單中的語意標籤，代表一組相關的欄位）。

```html
<form>
  <fieldset disabled>
    <legend>Disabled fieldset example</legend>
    <div class="mb-3">
      <label for="lokiInput" class="form-label">Disabled input</label>
      <input type="text" id="lokiInput" class="form-control" placeholder="Disabled input">
    </div>
    <div class="mb-3">
      <label for="lokiSelect" class="form-label">Disabled select menu</label>
      <select id="lokiSelect" class="form-select">
        <option>Disabled select</option>
      </select>
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="lokiCheck" disabled>
        <label class="form-check-label" for="lokiCheck">Can't check this</label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
```

### 親和性 Accessibility
這裡指的是網頁友善化，讓網頁結構能被輔助技術解析並回報給使用者。盡可能使用 HTML5 語意標籤，包含以 `label`、`button` 這類有明確定義的標籤作為描述文字。

- 如果想保留 `label` 的語意但不想顯示，可以加上 `.visually-hidden` 隱藏。
- 無法提供 `label` 作為描述文字時，元素本身可透過 `aria-label` 屬性補充語意。
- 同樣地，也可以用 `title` 屬性補充語意。
- `aria-labelledby` 屬性可以指定由哪個元素作為 label。
- 沒有 `label` 也沒有以上補述方法時，輔助技術可能會透過元素的 `placeholder` 屬性來理解描述文字。

## Input & Textarea (Form controls)
用來控制 `input` 或 `textarea` 的外觀，必須先加上 `.form-control` 才能開始操作。

尺寸控制有以下三種，用來調整欄位高度：
```html https://getbootstrap.com/docs/5.0/forms/form-control/#sizing
<input type="text" class="form-control form-control-lg" placeholder=".form-control-lg">
<input type="text" class="form-control" placeholder="Default input">
<input type="text" class="form-control form-control-sm" placeholder=".form-control-sm">
```

禁用欄位只要加上 `disabled` 屬性：
```html https://getbootstrap.com/docs/5.0/forms/form-control/#disabled
<input class="form-control" type="text" placeholder="Disabled input" disabled>
<input class="form-control" type="text" placeholder="Disabled readonly input" disabled readonly>
```

唯讀（可互動但不可輸入）只要加上 `readonly`；若不想要暗化的外觀，可將 `form-control` 改為 `.form-control-plaintext`：
```html https://getbootstrap.com/docs/5.0/forms/form-control/#readonly
<input class="form-control" type="text" placeholder="Readonly input here..." readonly>
<input class="form-control-plaintext" type="text" placeholder="Readonly input here..." readonly>
```

檔案上傳（單一或多筆）的呈現效果與前面相同，同樣包含三種尺寸與禁用效果：
```html
<div class="mb-3">
  <label for="lokiSingleFile" class="form-label">Default file input example</label>
  <input class="form-control" type="file" id="lokiSingleFile">
</div>
<div class="mb-3">
  <label for="lokiMultiFile" class="form-label">Multiple files input example</label>
  <input class="form-control" type="file" id="lokiMultiFile" multiple>
</div>
<div class="mb-3">
  <label for="lokiDisabled" class="form-label">Disabled file input example</label>
  <input class="form-control" type="file" id="lokiDisabled" disabled>
</div>
<div class="mb-3">
  <label for="lokiSizeSM" class="form-label">Small file input example</label>
  <input class="form-control form-control-sm" id="lokiSizeSM" type="file">
</div>
<div>
  <label for="lokiSizeLG" class="form-label">Large file input example</label>
  <input class="form-control form-control-lg" id="lokiSizeLG" type="file">
</div>
```

若 `input` 為 color 類型，請加上 `.form-control-color` 重新設定寬度：
```html
<label for="lokiColor" class="form-label">Color picker</label>
<input type="color" class="form-control form-control-color" id="lokiColor" value="#563d7c">
```

HTML5 的 `datalist` 資料清單，可為 `input` 提供建議選項，結構為 `input[list=ID]+datalist#ID>option*n`。
```html
<label for="lokiDataList" class="form-label">Datalist example</label>
<input class="form-control" list="lokiOptions" id="lokiDataList" placeholder="Type to search...">
<datalist id="lokiOptions">
  <option value="San Francisco">
  <option value="New York">
  <option value="Seattle">
  <option value="Los Angeles">
  <option value="Chicago">
</datalist>
```

## Select
用來控制 `select` 的外觀，必須先加上 `.form-select` 才能開始操作。

尺寸控制有以下三種，用來調整欄位高度：
```html
<select class="form-select mb-3">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

<select class="form-select form-select-lg mb-3">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

<select class="form-select form-select-sm">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

`multiple`、`size`、`disabled` 三種 `select` 外觀：
```html
<select class="form-select mb3" multiple>
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

<select class="form-select mb3" size="3">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

<select class="form-select" disabled>
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

> select 能指定屬性 `multiple` (4 筆）或 `size=N`。

## Checkbox & Radio
Bootstrap 重新設計了勾選類表單 `input` 的外觀與互動。checkbox 的用法如下：

- 使用 `div.form-check` 父元素包住 `input` 與 `label`
- `label` 使用 `label.form-check-label`
- 勾選類的 `input`（checkbox 或 radio）使用 `input.form-check-input`

`checked`、`indeterminate`（需由 JS 觸發）、`disabled` 狀態的外觀如下：

```html
<div class="container">
  <h1 class="border-bottom my-5">CheckBox Demo</h1>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="lokiCheckbox">
    <label class="form-check-label" for="lokiCheckbox">Default checkbox</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="lokiChecked" checked>
    <label class="form-check-label" for="lokiChecked">Checked checkbox</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="lokiIndeterminate">
    <label class="form-check-label" for="lokiIndeterminate">Indeterminate checkbox</label>
    <script>
      document.getElementById("lokiIndeterminate").indeterminate = true;
    </script>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="lokiDisabled" disabled>
    <label class="form-check-label" for="lokiDisabled">Disabled checkbox</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="lokiCheckedDisabled" checked disabled>
    <label class="form-check-label" for="lokiCheckedDisabled">Disabled checked checkbox</label>
  </div>

  <h1 class="border-bottom my-5">Radio Demo</h1>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="lokiDemo" id="lokiValue1">
    <label class="form-check-label" for="lokiValue1">Default radio</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="lokiDemo" id="lokiValue2" checked>
    <label class="form-check-label" for="lokiValue2">Default checked radio</label>
  </div>

  <div class="form-check">
    <input class="form-check-input" type="radio" name="lokiDemoDis" id="lokiValue3" disabled>
    <label class="form-check-label" for="lokiValue3">Disabled radio</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="lokiDemoDis" id="lokiValue4" checked disabled>
    <label class="form-check-label" for="lokiValue4">Disabled checked radio</label>
  </div>
</div>
```

### 開關效果 Switches
這是 checkbox 的另一種外觀，公式結構相同，只要對父元素另外加上 `.form-switch` 即可。

```html
<div class="container">
  <h1 class="border-bottom my-5">Switches feat.CheckBox Demo</h1>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="lokiSwitch1">
    <label class="form-check-label" for="lokiSwitch1">Default switch checkbox input</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="lokiSwitch2" checked>
    <label class="form-check-label" for="lokiSwitch2">Checked switch checkbox input</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="lokiSwitch3" disabled>
    <label class="form-check-label" for="lokiSwitch3">Disabled switch checkbox input</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="lokiSwitch4" checked disabled>
    <label class="form-check-label" for="lokiSwitch4">Disabled checked switch checkbox input</label>
  </div>
</div>
```

### 行內排列 Inline
前面的例子都是以 block 方式垂直堆疊；如果需要行內（inline）排列，請對父元素加上 `.form-check-inline`，會變成 `inline-block` 並帶有右側 margin。

```html
<div class="container">
  <h1 class="border-bottom my-5">CheckBox Inline Demo</h1>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="lokiInlineCheck1" value="option1">
    <label class="form-check-label" for="lokiInlineCheck1">1</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="lokiInlineCheck2" value="option2" checked>
    <label class="form-check-label" for="lokiInlineCheck2">2</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="lokiInlineCheck3" value="option3" disabled>
    <label class="form-check-label" for="lokiInlineCheck3">3 (disabled)</label>
  </div>

  <h1 class="border-bottom my-5">Radio Inline Demo</h1>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="lokiRadio" id="lokiInlineRadio1" value="option1">
    <label class="form-check-label" for="lokiInlineRadio1">1</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="lokiRadio" id="lokiInlineRadio2" value="option2" checked>
    <label class="form-check-label" for="lokiInlineRadio2">2</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="lokiRadio" id="lokiInlineRadio3" value="option3" disabled>
    <label class="form-check-label" for="lokiInlineRadio3">3 (disabled)</label>
  </div>
</div>
```

### 無描述字時 Without labels 
沒有 `label` 時也可以直接使用 `input.form-check-input`，父元素也能移除（但會變回 inline 元素）。不過從語意來看，少了 `label` 時應該透過 `[aria-label=]` 屬性補足語意。

### 整合按鈕 Toggle Buttons
這種外觀是借用 Button 元件（下一篇才會介紹）的功能，讓 checkbox 與 radio 呈現另一種視覺效果，做法與原本的公式結構完全不同：
- 不需要父容器包住 `label` 與 `input`，直接兩者並列寫出即可
- 對勾選型的 `input` 加上 `.btn-check`，會把它隱藏在畫面上，無法直接操作。
- 對 `label` 加上 `.btn`，讓它呈現按鈕外觀。
- `label.btn` 可再加上色系，可選擇 `btn-{color}` 或 `btn-outline-{color}` 兩種色彩模式。
- 透過 `label` 的 `for` 屬性連動 `input` 的 `checked` 狀態。
- `label` 被啟用時的顏色變化，來自 `input` 的 `checked` 狀態。
- 建議對 `input` 加上 `autocomplete="off"`，避免瀏覽器自動填入造成誤會。

```html
<div class="container">
  <h1 class="border-bottom my-5">CheckBox feat.Buttons</h1>
  <input type="checkbox" class="btn-check" id="lokiBtn1">
  <label class="btn btn-danger" for="lokiBtn1">Single toggle</label>

  <input type="checkbox" class="btn-check" id="lokiBtn2" checked>
  <label class="btn btn-danger" for="lokiBtn2">Checked</label>

  <input type="checkbox" class="btn-check" id="lokiBtn3" disabled>
  <label class="btn btn-danger" for="lokiBtn3">Disabled</label>

  <h1 class="border-bottom my-5">Radio feat.Buttons</h1>
  <input type="radio" class="btn-check" name="myRadio" id="lokiValue1" checked>
  <label class="btn btn-success" for="lokiValue1">Checked</label>

  <input type="radio" class="btn-check" name="myRadio" id="lokiValue2">
  <label class="btn btn-success" for="lokiValue2">Radio</label>

  <input type="radio" class="btn-check" name="myRadio" id="lokiValue3">
  <label class="btn btn-success" for="lokiValue3">Disabled</label>

  <input type="radio" class="btn-check" name="myRadio" id="lokiValue4" disabled>
  <label class="btn btn-success" for="lokiValue4">Radio</label>
</div>
```

## Range
範圍型的表單 `input` 套用 `input.form-range` 後，會變成 block 滿寬，並有大幅調整的視覺設計。

```html
<div class="container">
  <h1 class="border-bottom my-5">Range DEMO</h1>
  <label class="form-label" for="lokiRange1">Example range | <b>Value:50</b></label>
  <input class="form-range" id="lokiRange1" type="range">

  <label class="form-label" for="lokiRange2">Disabled range | <b>Value:50</b></label>
  <input class="form-range" id="lokiRange2" disabled type="range">

  <label class="form-label" for="lokiRange3">Example range | <b>Value:3</b></label>
  <input class="form-range" min="0" max="5" id="lokiRange3" type="range">

  <label class="form-label" for="lokiRange4">Example range | <b>Value:2.5</b></label>
  <input class="form-range" id="lokiRange4" min="0" max="5" step="0.5" type="range">
</div>

<script>
  document.querySelectorAll("input").forEach(e => {
    e.oninput = () => e.previousElementSibling.children[0].textContent = "Value:" + e.value;
  });
</script>
```

> range 能指定屬性 `min=N, max=M, step=R`。

## 欄位群組 Input group
`input-group` 是一種群組排版效果，需要把欄位整合成同一個群組，群組內可以任意組合 `input` 與一般的補述文字（不是 `label`），觀念如下：

- 以父元素 `div.input-group` 包住（flex 設計），主要是改良 `input` 的外觀，因此可放入多個 `input` 或一般文字（通常是 `span`）作為補述。
- `label` 不會放進 `div.input-group` 內；input-group 主要是改變 `input` 的結構，而不是整組 `label` + `input` 的排版。
- 子元素中的一般文字，透過 `span.input-group-text` 成為該 `input` 的補述。
- 位置順序依子元素的排列順序決定。
- 基於親和性設計，沒有 `label` 時，`input` 可以加上 `aria-label="描述"` 屬性表達欄位的描述。
- 基於親和性設計，`input` 可以加上 `aria-describedby="ID"` 屬性，指出補述文字所在元素的 ID。

```html
<div class="container">
  <div class="input-group mb-3">
    <span class="input-group-text" id="lokiMessage1">@</span>
    <input class="form-control" aria-describedby="lokiMessage1" aria-label="lokiTitle1" type="text">
  </div>

  <div class="input-group mb-3">
    <input class="form-control" aria-describedby="lokiMessage2" aria-label="lokiTitle2" type="text">
    <span class="input-group-text" id="lokiMessage2">@example.com</span>
  </div>

  <label class="form-label" for="lokiInput">Your vanity URL</label>
  <div class="input-group mb-3">
    <span class="input-group-text" id="lokiMessage3">https://example.com/users/</span>
    <input class="form-control" aria-describedby="lokiMessage3" id="lokiInput" type="text">
  </div>

  <div class="input-group mb-3">
    <span class="input-group-text">$</span>
    <input class="form-control" aria-label="lokiTitle3" type="text">
    <span class="input-group-text">.00</span>
  </div>

  <div class="input-group mb-3">
    <input class="form-control" aria-label="lokiTitle4" type="text">
    <span class="input-group-text">@</span>
    <input class="form-control" aria-label="lokiTitle5" type="text">
  </div>

  <div class="input-group">
    <span class="input-group-text">With textarea</span>
    <textarea class="form-control" aria-label="lokiTitle6"></textarea>
  </div>
</div>
```

### 自動換行 Wrapping
預設情況下，Bootstrap 把 input-group 的 flex 設為允許換行；如果不想換行，可以用 flex 通用類別改回 `.flex-nowrap`。

```html
<div class="container">
  <h1>Please RWD this Page</h1>
  <label class="form-label" for="lokiInput1">Try Wrap (Default)</label>
  <div class="input-group mb-3">
    <span class="input-group-text">https://example.com/users/</span>
    <input class="form-control" type="text">
    <span class="input-group-text">https://example.com/users/</span>
  </div>

  <label class="form-label" for="lokiInput2">Try No-Wrap</label>
  <div class="input-group flex-nowrap">
    <span class="input-group-text">https://example.com/users/</span>
    <input class="form-control" type="text">
    <span class="input-group-text">https://example.com/users/</span>
  </div>
</div>
```

### 尺寸 Sizes
可以調整整個 input-group 的欄位高度，此參數需額外加上：

```css
.input-group.input-group-sm   /*small*/
.input-group                  /*default*/
.input-group.input-group-lg   /*large*/
```

### 選填表單 Checkboxes and radios
也可以不使用 `span` 補述文字，改用 checkbox 或 radio 來追加輸入欄位：把原本的 `span.input-group-text` 改為 `div.input-group-text>input:{checkbox|radio}.form-check-input`。

```html
  <div class="container">
    <h1>Checkbox feat.prepend</h1>
    <div class="input-group mb-3">
      <div class="input-group-text">
        <input class="form-check-input" aria-label="lokiLabelA1" type="checkbox">
      </div>
      <input class="form-control" aria-label="lokiLabelA2" type="text">
    </div>

    <h1>Radio feat.prepend</h1>
    <div class="input-group">
      <div class="input-group-text">
        <input class="form-check-input" aria-label="lokiLabelB1" type="radio">
      </div>
      <input class="form-control" aria-label="lokiLabelB2" type="text">
    </div>
  </div>
```

### 多項 inputs 與 addons
如前面所述，input-group 內可以放多個 `input.form-control` 或 `.input-group-text`，順序由你自行安排。

```html
  <div class="container">
    <h1>Multi input and addons</h1>
    <div class="input-group mb-3">
      <span class="input-group-text">$</span>
      <span class="input-group-text">0.00</span>
      <input type="text" class="form-control">
      <span class="input-group-text">$</span>
      <span class="input-group-text">0.00</span>
    </div>
  </div>
```

> 注意：使用驗證功能（後面會介紹）時，input-group 只支援單一 `input` 的動態驗證，因此不建議在同一個群組放多個 `input`。

### 整合元件 button & dropdowns
部分元件也能放進 input-group 一起排列，例如按鈕、下拉選單、分段按鈕等（這些元件在下一篇介紹）。

```html
<div class="container">
  <h1>Button addons</h1>
  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
    <input type="text" class="form-control">
  </div>

  <h1>dropdown addons</h1>
  <div class="input-group mb-3">
    <input type="text" class="form-control">
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropdown</button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
  </div>

  <h1>Segmented buttons</h1>
  <div class="input-group mb-3">
    <button type="button" class="btn btn-outline-secondary">Action</button>
    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">Toggle Dropdown</button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
    <input type="text" class="form-control">
  </div>
</div>
```

### 整合自訂版本的 select 與 input:file
可以整合 `select.form-select` 或 `input:file.form-control` 使用。

```html
<div class="container">
  <h1>Select addons</h1>

  <div class="input-group mb-3">
    <select class="form-select" id="lokiSelect1">
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <label class="input-group-text" for="lokiSelect1">Options</label>
  </div>

  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button">Button</button>
    <select class="form-select" aria-label="lokiLabel1">
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>

  <h1>Input:file addons</h1>

  <div class="input-group mb-3">
    <input type="file" class="form-control" id="lokiFile1">
    <label class="input-group-text" for="lokiFile1">Upload</label>
  </div>

  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button" id="lokiBtn1">Button</button>
    <input type="file" class="form-control" aria-describedby="lokiBtn1" aria-label="lokiLabel2">
  </div>
</div>
```

> `input:file` 的 HTML5 屬性 `multiple` 表示可上傳多個檔案，注意要以陣列形式設定 name，例如 `name[]`。
> 官方原文中仍有 custom 字眼，是因為 Bootstrap 4 的 `select` 與 `input:file` 同時提供瀏覽器原生與自訂兩種外觀；第五版只剩下重新設計過的自訂外觀，所以不必在意 custom 這個字眼。

## 浮動標籤 Floating labels
`form-floating` 是另一種群組排版效果，同樣要把一組 `label` 與 `input` 整合成同一個欄位，透過互動讓提示標題浮動。使用條件如下：

- 以父元素 `div.form-floating` 包住（以 `position` 設計），父元素內只能放一組 `label` 與 `input`，沒有例外。
- 子元素使用 `input.form-control` 與一般的 `label` 即可。
- 注意：`input` 一定要有 `placeholder` 屬性，效果才會生效。
- 注意：順序一定要是 `input` + `label`，否則 CSS 的兄弟選擇器會失效。

原理如下：
- 透過偽元素 `input.form-control::placeholder` 設定 `color: transparent`，讓 placeholder 的字變成透明。
- `label` 以 `absolute` 重新定位到原本 `input` 的 placeholder 位置，形成假的重疊，看不到真正的 placeholder 文字。
- 由 `:focus`、否定選擇器 `:not` 與偽類 `:placeholder-shown` 三者完成轉場：當 `input.form-control` 取得 focus 且不處於顯示 placeholder 的狀態時，透過兄弟選擇器 `~` 找到 `label` 做轉場動畫。
- 透過轉場移動 `label` 的位置並改變外觀。
- 失去 focus 時沒有反向的動畫。

```html
<div class="container">
  <div class="form-floating mb-3">
    <input class="form-control" id="lokiFloatlabel1" placeholder="隨便不重要" type="email">
    <label for="lokiFloatlabel1">Email address</label>
  </div>
  <div class="form-floating mb-3">
    <input class="form-control" id="lokiFloatlabel2" placeholder="隨便不重要" type="password">
    <label for="lokiFloatlabel2">Password</label>
  </div>
  <form class="form-floating mb-3">
    <input class="form-control" id="lokiFloatlabel3" placeholder="隨便不重要" value="test@example.com" type="email">
    <label for="lokiFloatlabel3">Input with value</label>
  </form>
  <form class="form-floating">
    <input class="form-control is-invalid" id="lokiFloatlabel4" placeholder="隨便不重要" value="test@example.com" type="email">
    <label for="lokiFloatlabel4">Invalid input</label>
  </form>
</div>
```

### Textarea 應用
也可以套用在 `textarea` 上，將 `input.form-control` 改為 `textarea.form-control`。注意預設高度較矮（原本是依 `input` 設計的），可自行調整高度。

```html
<div class="container">
  <div class="form-floating mb-3">
    <textarea class="form-control" placeholder="隨便不影響" id="lokiFloatLabel1"></textarea>
    <label for="lokiFloatLabel1">Message Writing Here...</label>
  </div>
  <div class="form-floating">
    <textarea class="form-control" placeholder="隨便不影響" id="lokiFloatLabel2" style="height: 100px"></textarea>
    <label for="lokiFloatLabel2">Message Writing Here...</label>
  </div>
</div>
```

### Select 應用
套用在 `select.form-select` 也可以，差別在於 `select` 沒有 `placeholder`，所以標題會直接定位在浮動後的位置。

```html
<div class="container">
  <div class="form-floating">
    <select class="form-select" id="lokifloat1">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <label for="lokifloat1">Works with selects</label>
  </div>
</div>
```

### Grid 排版
`div.form-floating` 可以輕鬆整合到 Grid 排版系統內，只要留意每個 `div` 各自的角色。

```html
<div class="container">
  <div class="row g-2">
    <div class="col-md">
      <div class="form-floating">
        <input type="email" class="form-control" id="lokiLabel1" placeholder="隨便" value="mdo@example.com">
        <label for="lokiLabel1">Email address</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <select class="form-select" id="lokiLabel2" aria-label="Floating label select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <label for="lokiLabel2">Works with selects</label>
      </div>
    </div>
  </div>
  <hr>
  <h1 class="text-center">試著找出兩者差異</h1>
  <hr>
  <div class="row g-2">
    <div class="col-md form-floating">
      <input type="email" class="form-control" id="lokiLabel3" placeholder="隨便" value="mdo@example.com">
      <label for="lokiLabel3">Email address</label>
    </div>
    <div class="col-md form-floating">
      <select class="form-select" id="lokiLabel4" aria-label="Floating label select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <label for="lokiLabel4">Works with selects</label>
    </div>
  </div>
</div>
```

## 排版技巧 Layout
前一個單元介紹的都是表單零件的外觀，本節提供多種排版技巧，協助你設計整個表單。

### 簡單的表單與通用類別應用
直接用你對 HTML 的認識來設計表單，有以下幾個重點：

- 所有套用 `.form-control` 的元素都是 block 且 `width: 100%`。
- Bootstrap 對 `<form>` 沒有特別設計，因此 HTML 原有的特性都保留；例如 `button` 預設就會觸發 submit（除非指定了 `type` 屬性）。
- 對 `form` 加上 `disabled` 屬性並不會讓整個表單禁用（要禁用整個表單請使用 `fieldset[disabled]`）。
- 可以使用 Margin 通用類別來調整排版，這是最直覺的技巧，例如建議用 `mb-3` 增加間距。

### 網格與間格 Grid & Gutter
使用 Grid 系統的 `row>col` 可以輕鬆分配版面空間，並搭配 gutter 參數調整欄位之間的距離，在響應式網頁上特別好用。

```html
<div class="container">
  <form class="row g-3">
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">Email</label>
      <input type="email" class="form-control" id="inputEmail4">
    </div>
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">Password</label>
      <input type="password" class="form-control" id="inputPassword4">
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label">Address</label>
      <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
    </div>
    <div class="col-12">
      <label for="inputAddress2" class="form-label">Address 2</label>
      <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
    </div>
    <div class="col-md-6">
      <label for="inputCity" class="form-label">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="col-md-4">
      <label for="inputState" class="form-label">State</label>
      <select id="inputState" class="form-select">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="col-md-2">
      <label for="inputZip" class="form-label">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck">
        <label class="form-check-label" for="gridCheck">
          Check me out
        </label>
      </div>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Sign in</button>
    </div>
  </form>
</div>
```

#### 水平表單
用 grid 讓同一個 `row` 內的兩組 `col` 水平排列時，可以對 `label` 加上 `.col-form-label`，讓 label 的高度與 `input` 一致並垂直置中；`input` 有指定尺寸時，也有對應尺寸的 label 高度可用。

```css
.col-form-label-sm  /*對應 input.form-control.form-control-sm 之高度*/
.col-form-label     /*對應 input.form-control 高度*/
.col-form-label-lg  /*對應 input.form-control.form-control-lg 之高度*/
```

```html https://getbootstrap.com/docs/5.0/forms/layout/#horizontal-form
<form class="container">
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3">
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3">
    </div>
  </div>
  <fieldset class="row mb-3">
    <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
    <div class="col-sm-10">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
        <label class="form-check-label" for="gridRadios1">
          First radio
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
        <label class="form-check-label" for="gridRadios2">
          Second radio
        </label>
      </div>
      <div class="form-check disabled">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
        <label class="form-check-label" for="gridRadios3">
          Third disabled radio
        </label>
      </div>
    </div>
  </fieldset>
  <div class="row mb-3">
    <div class="col-sm-10 offset-sm-2">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck1">
        <label class="form-check-label" for="gridCheck1">
          Example checkbox
        </label>
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
```

#### 欄位尺寸與自動分配
結合 grid 的欄位空間觀念，舉例如下：

- `.col-7>input + .col>input + .col>input`：12 格扣除 7 剩餘 5，三個 `input` 的比例為 7 + 2.5 + 2.5
- `.row.align-items-center > .col-auto*n`：每個 `input` 以內容寬度為主，若高度不一致，則依交叉軸對齊置中。
- `.row.align-items-center > .col-{number}*n + .col-auto*n`：同上，即使包含指定寬度的欄位，也能自動分配。
- `.row.row-cols-lg-auto > .col-12*n`：在 lg 以上以內容寬度排列，其餘寬度則各自滿版。
- `.row.row-cols-lg-auto.g-3.align-items-center > .col-12*n`：同上，並讓欄位的水平與垂直間隔都撐開，且所有欄位垂直置中對齊。

## 驗證 Validation
驗證是指表單送出時，若欄位輸入錯誤或未填，就禁止送出，並在畫面上回饋欄位的輸入問題。顯示方式有兩種：一種是瀏覽器提供的基本驗證功能，另一種是 Bootstrap 搭配 JS 完成。

### 瀏覽器預設的驗證
要觸發瀏覽器預設的驗證，需符合以下條件：

- 需要驗證的表單元素先加上 `required` 屬性，並搭配 `input[type=*]` 提供格式判斷，一旦不符合就會直接顯示預設的提示文字。
- 需要自訂提示文字時，可透過 HTML 的 [約束驗證 API](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-constraint-validation-api)，藉由 JavaScript 操作 [setCustomValidity](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) 來設計想要的正規表達規則與放送自訂回應文字，範例如下：
```html
<div class="container">
  <form class="row g-3">
    <div class="col-md-6">
      <label for="lokiName" class="form-label">Name</label>
      <input type="text" class="form-control" id="lokiName" required>
    </div>
    <div class="col-md-6">
      <label for="lokiPWD" class="form-label">Password</label>
      <input type="password" class="form-control" id="lokiPWD" required>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </form>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () { // 另一種 document.ready 的方法
    document.querySelector("#lokiName").oninvalid = function () {
      //當進行驗證事件時，如果不通過在指定物件變數獲得 false，顯示自訂提示字
      if (!this.validity.valid) this.setCustomValidity("你沒名字嗎？");
    }
    document.querySelector("#lokiName").oninput = function () {
      //當使用者進行編寫時，清除提示字。將不再顯示輸出
      this.setCustomValidity("");
    }

    //本身還是會有基本的 text 不留白的檢查
    document.querySelector("#lokiPWD").oninput = function () {
      //當使用者進行編寫時，進行另一種正規檢查而更改提示字
      this.setCustomValidity("");
      let mystr = new RegExp('\\d{4}$');
      if (!mystr.test(this.value)) this.setCustomValidity("只能 4 個數字");
    }
  });
</script>
```

### Bootstrap 驗證功能
也可以改用 Bootstrap 的驗證功能來自訂提示文字（同樣依賴 HTML 的驗證）。原理是透過 `input`（`select`、`textarea` 也適用）的偽類 `:valid`（正確：綠）與 `:invalid`（錯誤：紅），觸發指定的兄弟元素顯示文字。因此需要自己先編寫腳本處理驗證，再自行把 class 加到指定元素上來顯示驗證。注意如下：

- HTML5 本來就有內建的表單驗證，使用 Bootstrap 的驗證前需先關閉：對 `form` 加上 `novalidate` 屬性即可取消 HTML 驗證。
- Bootstrap 以 `form.was-validated` 來切換驗證的呈現，也就是需要用 JS 新增或移除這個 class（可先手動加上看看效果），通常在 submit 當下處理。
- 使用 Ajax（不離開網頁的後端串接）時，callback 完成後若不再需要驗證，就要移除 `form.was-validated` 這個 class。
- 在 `form.was-validated` 狀態下，預設提供兩種驗證文字風格（feedback 與 tooltip）；需要自訂提示文字時，可加入 `.valid-feedback` 與 `.invalid-feedback` 元素。
- 另一種風格是提示泡泡 `div.{valid-tooltip|invalid-tooltip}`，需確保父容器有 `position: relative` 可供定位參考（使用 `.col` 排版時已有此設定）。
- 以下以 JS 腳本示範如何在送出時驗證並回饋到畫面：
```html
<div class="container">
  <form class="row g-3 lokiValidation" novalidate>
    <div class="col-md-6">
      <label for="lokiInput1" class="form-label">Text1</label>
      <input type="text" class="form-control" id="lokiInput1" value="Mark" required>
      <!-- <div class="valid-feedback">good Message!!</div>
      <div class="invalid-feedback">fail Message!!</div> -->
    </div>
    <div class="col-md-6">
      <label for="lokiInput2" class="form-label">Text2</label>
      <input type="text" class="form-control" id="lokiInput2" value="" required>
      <div class="valid-feedback">good Message!!</div>
      <div class="invalid-feedback">fail Message!!</div>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Submit form</button>
    </div>
  </form>
</div>

<script>
  document.querySelectorAll('.lokiValidation').forEach(function (nod) {  //找到所有持有指定 class 之各項元素
    nod.addEventListener('submit', function (event) { //監測 submit 時，做以下事情
      if (!this.checkValidity()) { //如果這個元素的 checkValidity 為 false，代表驗證不通過
        event.preventDefault(); //取消當下的 event 預設行為
        event.stopPropagation(); //取消當下的傳遞與冒泡事件
      }
      this.classList.add('was-validated'); //顯示驗證文字結果，出現之場合看個人需求
    });
  });
</script>
```

#### 伺服器驗證
前面的操作是在前端驗證（建議做法），控制 submit 事件的後續步驟。如果驗證是由伺服器完成（重新產生畫面），替代方法是直接對單一欄位加上 `input.{is-valid|is-invalid}`（綠｜紅）來顯示驗證結果。這樣不需要 `form.was-validated` 狀態，就能由後端決定哪些驗證提示做響應文字 (`div.valid-feedback` 與 `.invalid-feedback`)。

#### 響應驗證的元素
以下元素在驗證時都會變色：

```css
input
textarea.form-control
select.form-select
div.form-check
```

## 公式表整理

### 基本欄位
- 一般欄位（`label`）：`.form-label`
- 一般欄位（`input`、`select`、`textarea`）：`.form-control`
- 一般欄位（描述文字的 `div`）：`.form-text`
- 選填型欄位（checkbox、radio 的容器 `div`）：`.form-check`
- 選填型欄位（`input:checkbox`、`input:radio`）：`.form-check-input`
- 選填型欄位（checkbox、radio 的 `label`）：`.form-check-label`
- 選單型欄位（`select`）：`.form-select`
- 範圍型欄位（`input:range`）：`.form-range`

### 追加調整
- 追加 `.form-control` 的尺寸調整（`input`、`select`、`textarea`）：`.form-control.form-control-{sm|lg}`
- 追加 `input:color` 的排列方式（`input:color`）：`.form-control.form-control-color`
- 追加 `.form-select` 的尺寸調整（`select`）：`.form-select.form-select-{sm|lg}`
- 把 checkbox 容器的外觀改為切換開關（checkbox、radio 的主容器 `div`）：`.form-check.form-switch`
- 把 checkbox 容器的排列改為行內（checkbox、radio 的主容器 `div`）：`.form-check.form-check-inline`

### 特殊應用
- 全部禁用（整個表單禁止操作）：`form > fieldset[disabled]`
- 單一禁用（對該元素禁止操作）：`*[disabled]`
- 唯讀（對該元素無法輸入）：`*[readonly]`
- 純顯示（對該元素呈現為提示文字）：`*.form-control-plaintext`
- 按鈕型 checkbox（把 checkbox 改為按鈕效果）：`input:checkbox.btn-check + label.btn.btn-{color}`

### 排版技巧

#### Input Group
- 容器：`.input-group`（用在 `div`）
- 容器高度：`.input-group-{sm|lg}`（用在 `div.input-group`）
- 文字：`.input-group-text`（用在 `div.input-group>span`）
- 欄位：`.form-control`（用在 `div.input-group>*`）
- 文字上的選填欄位：`.form-check-input`（用在 `.input-group-text>input:{checkbox|radio}`）
- Button 元件：參考 Button 元件介紹（用在 `div.input-group>*`）
- Dropdowns 元件：參考 Dropdowns 元件介紹（用在 `div.input-group>*`）

#### Floating labels
- 容器：`.form-floating`（用在 `div`）
- 欄位：`.form-control`（用在 `div.form-floating>*`）
- 欄位標題：不需要 class（用在 `div.form-floating>* ~ label`）

#### Grid System
- 容器：`.row`（用在 `div`）
- 欄位：`.form-control`（用在 `div.row>.col-*>*`）
- 欄位標題：`.form-label`（用在 `div.row>.col-*>label`）
- 讓欄位標題與欄位等高：`.col-form-label-{sm|lg}`（用在 `div.row>.col-*`）

### 驗證
- 輸出整個表單的驗證資訊（依 HTML 判斷）：`.was-validated`（用在 `form[novalidate]`）
- 輸出單一欄位的驗證資訊（判斷為正確）：`.is-valid`（用在 `input`、`textarea`、`select`）
- 輸出單一欄位的驗證資訊（判斷為錯誤）：`.is-invalid`（用在 `input`、`textarea`、`select`）
- 驗證正確的資訊文字：`.valid-feedback`（用在 `input`、`textarea`、`select ~ *`）
- 驗證錯誤的資訊文字：`.invalid-feedback`（用在 `input`、`textarea`、`select ~ *`）
- 驗證正確的資訊泡泡：`.valid-tooltip`（用在 `input`、`textarea`、`select ~ *`）
- 驗證錯誤的資訊泡泡：`.invalid-tooltip`（用在 `input`、`textarea`、`select ~ *`）