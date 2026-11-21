---
title: "Bootstrap 4.4：內容與通用"
categories:
  - 前端
  - Bootstrap
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - Bootstrap
date: 2020-03-28 12:45:49
---
![](assets/images/banner/bootstrap.png)

本篇分為兩個部分：Content 內容與 Utilities 通用。這兩部分都是基礎且常用的 class 公式，使用頻率很高。學會這些之後，用 Bootstrap 製作靜態頁面就掌握七八成了。

<!-- more -->

{% note warning %}
**版本提醒**
本文使用 Bootstrap 4.4（2020 年）。Bootstrap 5 已於 2021 年發布，本文提到的不少 class 在 5 版改了名稱或已移除，例如：`.float-left`／`.text-left` 改為 `.float-start`／`.text-start`、`.font-weight-*` 改為 `.fw-*`、`.text-monospace` 改為 `.font-monospace`、`.rounded-sm`／`.rounded-lg` 改為 `.rounded-1`／`.rounded-3`、`.embed-responsive` 改為 `.ratio`、`.sr-only` 改為 `.visually-hidden`、`.close` 改為 `.btn-close`，`.text-hide` 與 `.text-justify` 則已移除。新專案請參考 {% post_link bootstrap-5-utilities-forms Bootstrap 5 教學（二） %}；本文仍可作為維護舊專案時的參考。
{% endnote %}

---

# 內容 Content
引入 Bootstrap 後，你可能會發現不少 HTML 標籤的外觀和印象中不太一樣（例如 `input`、`button`、`a`、`ul`），這是因為 Bootstrap 重新定義了 HTML 標籤的預設 CSS，讓外觀更貼近常見的設計風格。從這裡開始，會接觸到文字、圖片、表格等與內容相關的 HTML 標籤與 class。

>部分單元本文不介紹（例如 Reboot 重置說明、Code 程式碼效果），有興趣請參閱官方文件。

## 文字效果 Typography
Bootstrap 重新定義了部分文字標籤的外觀，同時也提供對應的 class，可以在不使用該標籤時模擬出相同的外觀。

在不方便使用標籤的情況下，可以改用同名的 class 取得相同的外觀效果，既能省下巢狀標籤，也方便在元件內組合使用。以下是 Bootstrap 重新定義的基礎文字標籤：

> 如果你已經熟悉這些 HTML 標籤，這段內容快速瀏覽即可，不需要特別背誦這些 class 的原理。

- **標題文字**：標籤 `h1` ~ `h6`，class `.h1` ~ `.h6`。`h1` 的 `font-size` 為 2.5rem，`h2` 為 2rem，之後每降一級減少 0.25rem。
- **次文字**：標籤 `small`，class `.small`。字體縮小為原尺寸的 80%。
- **減弱文字**：class `.text-muted`。文字變成灰色，類似提示文字的用途。
- **超大文字**：class `.display-*`。用於廣告或主題文字等需要特大字體的情況，`*` 的數字越小字越大（邏輯同標題，但字體更大）。
- **前導文字**：class `.lead`。用來強調 `p` 段落的開頭，效果只是設定 `font-size: 1.25rem` 與 `font-weight: 300`。
- **標記文字**：標籤 `mark`，class `.mark`。產生黃底標記的效果。
- **刪除文字**：標籤 `del`、`s`。文字中央有一條橫線，呈現刪除線效果。
- **底線文字**：標籤 `ins`、`u`。文字底部有底線。
- **粗體文字**：標籤 `strong`、`b`。文字加粗（`font-weight: bolder`）。
- **斜體文字**：標籤 `em`、`cite`。文字呈現斜體。
- **縮寫文字**：標籤 `abbr`。作為英文縮寫的提示，搭配 HTML 的 `title` 屬性；底線為點線，滑過時游標會變成問號。需要時可加上 `.initialism`，將字體縮小到 90%。
- **引用文字**：標籤 `blockquote.blockquote`。對 `blockquote` 加上 `.blockquote`，讓引用效果更好看。
- **引用來源文字**：class `.blockquote-footer`。前面會加上 `—` 符號，並以淺灰色小字顯示；應該使用 `footer` 標籤並放在 `blockquote` 內。
- **文字對齊**：class `.text-center`、`.text-right`。文字置中或靠右，通用類別會再詳細說明。
- **清除列表樣式**：class `.list-unstyled`。通常用在 `ul` 或 `ol`，清除原本的列表外觀。
- **列表水平化**：class `.list-inline` 搭配 `.list-inline-item`。把列表項目改成水平排列並加上間距，常用於水平選單。
- **省略文字**：class `.text-truncate`。文字超出空間（overflow）時，以「…」省略。

## 圖片效果 images
圖片沒有太多特別的外觀公式，主要依賴基本的 class 公式與盒模型觀念。你應該理解 `.float-{left|right}`、`.text-{left|right}` 與 `.m{l|r}-auto` 這三者的原理與使用時機。

- `.img-fluid`（響應式圖片）：設定 `max-width: 100%` 與 `height: auto`，讓圖片跟隨父容器的寬度，並自動維持等比例的高度。
- `.img-thumbnail`（縮圖框）：替圖片加上內距與邊框，呈現縮圖框的效果。
- `.rounded`（圓角化）：圖片圓角化（`border-radius: 0.25rem`）。
- `.float-{left|right}`、`.text-{left|right}`、`.m{l|r}-auto`（靠邊對齊）：這幾種基本方法都適用於圖片，讓圖片靠左或靠右。
- `.text-center`、`.mx-auto`（水平置中）：原理同上；使用 `.mx-auto` 時圖片需為 `display: block`（可搭配 `.d-block`）。

## 表格效果 table
Bootstrap 已將 `table` 的預設樣式重置得很乾淨，通常會再搭配表格專用的 class。注意以下要點：

1. 要有美觀的表格外觀，必須在 `<table>` 上加入 `.table`，否則只會得到沒有樣式的表格。
2. 表格要有完整的結構，例如 `<thead>`、`<tbody>`、`<th>`；不重視語意的話，可以不寫 `scope="row|col"` 屬性。
3. class 要加在正確的位置：想改變哪個部分，就加在對應的標籤上，而且效果可以累加。

- `.table`（作用在 `table`，美化表格）：產生具有基本美化的表格，否則只會得到沒有任何樣式的表格。
- `.table-{color}`（作用在 `table`、`tr`、`th`、`td`，表格主色）：提供色底黑字的表格效果，`dark` 為白字。color 可用 `active`、`primary`、`secondary`、`success`、`danger`、`warning`、`info`、`light`、`dark`。
- `.thead-{dark|light}`（作用在 `thead`，標題顏色）：提供深色與淺色兩種標題顏色。
- `.table-striped`（作用在 `table`，灰白相間）：自動產生灰白相間的列。
- `.table-bordered`（作用在 `table`，加上線條）：加上上下左右的邊框線（`border: 1px solid #dee2e6`）。
- `.table-borderless`（作用在 `table`，清除線條）：清除所有邊框線。
- `.table-hover`（作用在 `table`，滑過灰底）：滑鼠移過時，該列會出現灰底。
- `.table-sm`（作用在 `table`，小表格）：縮短欄位間距，形成較小的表格。
- `.bg-{color}`（作用在 `table`、`tr`、`th`、`td`，背景色）：直接使用背景色公式（黑字），建議對 `table` 加上 `.table-dark` 讓文字變白。color 可用 `primary`、`success`、`danger`、`warning`、`info`。

### 響應式表格 (in table 標籤）
預設的表格會自動收縮到最小的內容寬度；可以使用響應式公式指定表格在何時停止收縮、改為固定寬度並出現水平捲軸。

```css
/* table responsive */
.table-responsive /* 不允許收縮，空間不足時直接出現水平捲軸 */
.table-responsive-{breakpoint} /* 響應式表格：螢幕寬度小於該斷點時才出現水平捲軸，達到該斷點以上則恢復一般表格 */

breakpoint: sm, md, lg, xl
```

## 圖片說明 figure (HTML5 新標籤）
`figure` 是 HTML5 的語意標籤，用來包住圖片與說明文字，形成一個獨立區塊。Bootstrap 對這個標籤有專門的樣式。`figure` 的基本結構如下：

```html
<!-- 以 figure 包覆，內部放 img 作為圖片，以及 figcaption 作為說明文字 -->
<figure>
  <img src="..." alt="text"/>
  <figcaption>text</figcaption>
</figure>
```

Bootstrap 的用法如下：

1. 對 `figure` 加上 `.figure`，設定 1rem 的下方 margin。
2. 對 `img` 加上 `.figure-img`，設定 0.5rem 的下方 margin；可視需要再加上 `.img-fluid`（自適應寬度）或 `.rounded`（圓角）等效果。
3. 對 `figcaption` 加上 `.figure-caption`，字色為灰色 `#6c757d` 且字體縮小到約 90%；可視需要加上 `.text-{center|right}` 調整對齊。

```html
<figure class="figure">
  <img src="..." class="figure-img img-fluid rounded" alt="text">
  <figcaption class="figure-caption text-right">test</figcaption>
</figure>
```

# 通用 Utilities
通用類別（Utilities）是通用且非常常見的外觀公式，也是整個 Bootstrap 中最常用、最需要記住的部分，能讓你輕鬆快速地套用出各種視覺效果。

## 邊框 borders
使用 `.border` 能為元素加上邊框線，效果為 `border: 1px solid #dee2e6`，也可以只在特定方向加邊框。

```css
.border  /* 四邊產生 1px 的灰色邊框線 */
.border-{top | right | bottom | left}  /* 只有該處有邊框線 */
```

相反地，`.border-0` 是 `border: 0 !important` 的無邊框效果。

```css
.border-0  /* 邊框線為無 */
.border-{top | right | bottom | left}-0  /* 只有該處邊框線為無 */
```

要調整邊框顏色可以使用 `.border-{color}`，它只負責顏色，邊框線本身仍需先加上 `.border`。

```css
.border-{color}  /* 指定邊框顏色 */
color:primary, secondary, success, danger, warning, info, light, dark, white
```

圓角使用 `.rounded`，效果為 `border-radius: .25rem`，也可以指定只有部分方向圓角，或變成特定形狀。

```css
.rounded  /* 圓角化效果為 0.25rem */
.rounded-sm /* 圓角 0.2rem */
.rounded-lg /* 圓角 0.3rem */
.rounded-0 /* 取消圓角 */

.rounded-{right | bottom | left | top}  /* 部分圓角化 */

.rounded-circle  /* 圓形 */
.rounded-pill /* 橢圓形 */
```

## 清除浮動（容器內） clearfix
對包住浮動元素的父容器加上 `.clearfix`，就能避免浮動影響後面的 HTML 元素。原理是：

透過偽元素 `::after` 執行 `clear: both`，在父容器結尾清除所有浮動；同時 `::after` 是 `display: block`，會把父容器的高度撐回來。

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

> 只要記得：使用浮動時，用一個父容器包住並加上 `.clearfix`，父容器以外的部分就不會受浮動影響，父容器本身的高度也不會塌陷。

## 關閉圖示 close icon
如果要做關閉按鈕，可以使用 `.close`，產生**靠右且滑過會變化**的外觀。

範例為：
```html
<button type="button" class="close">×</button>
```

> 官方範例中的 `<span aria-hidden="true">` 是給螢幕閱讀器的設計，讓軟體略過這個「×」文字；`aria-label="Close"` 則讓軟體知道這是一個名稱為 Close 的按鈕。這些可以省略，不會影響視覺與功能。

## 顏色 colors
顏色是非常重要且實用的公式，官方替每種顏色取了名字，請務必習慣它們：大多數跟顏色有關的參數都會用到這些名稱，公式也很好記，就是「什麼型態＋顏色名稱」。另外提醒，亮色文字要搭配對比高的暗色背景，反之亦然。這些顏色也會自動對連結（hover）與表單按鈕（focus）產生對應的狀態變化。

```css
.text-{color} /*文字色 */
color: primary, secondary, success, danger, warning, info, light, dark, muted, white;

.bg-{color} /*背景色*/

color: primary, secondary, success, danger, warning, info, light, dark, white, transparent;

.bg-gradient-{color} /*漸層背景色，預設為禁用，需到 scss/_variables.scss 將 $enable-gradients 設為 true 才會啟用*/
color: primary, secondary, success, danger, warning, info, light, dark;

.text-{black|white}-50  /*對黑與白多設計一種透明度為 0.5 的黑白字效果*/
```

> 如果某些情況下顏色套用失敗，可以試著改套用在父容器上。

## 顯示 display
前一篇已介紹過 display，這裡快速帶過並補充一些內容。需要調整 display 時，可以使用 `.d-*`。

```css
/* display */
.d-{value} /* display node */
.d-{breakpoint}-{value} /* 響應式 display */

breakpoint: sm, md, lg, xl
value: none, inline, inline-block, block, table, table-cell, table-row, flex, inline-flex
```

> class 可以組合使用，控制在不同寬度下的變化。例如 `.d-none.d-sm-block`：未達 sm 時是 `d-none`（手機上看不到），sm 以上則顯示為 block（平板與電腦上看得到）。

如果想控制列印時（<kbd>Ctrl</kbd>+<kbd>P</kbd>）的顯示方式，可以使用 `.d-print-*`，決定元素是否會被印出來。

```css
/* display in print*/
.d-print-{value} /* display node in print */

value: none, inline, inline-block, block, table, table-cell, table-row, flex, inline-flex
```

> 例如 `.d-none.d-print-block`：瀏覽網頁時不會出現，只有列印時才會出現。

## 內嵌 embeds
`<embed>`、`<iframe>`、`<video>`、`<object>` 這類內嵌元素都能使用，需要在父容器加上 `div.embed-responsive` 才會生效。優化內容包含去除邊線（`frameborder="0"`）與依容器調整寬度，不必再手動固定 embed 的寬度。

```css
/* embed responsive*/
.embed-responsive /* 綁定父容器進行響應式 */
```

另外需要指定長寬比例時，加上 `embed-responsive-*`（預設共四種）。容器的高度是由比例決定的，所以實際使用時一定要搭配比例 class；且比例 class 只負責比例，仍需同時加上 `.embed-responsive`，也就是寫成 `.embed-responsive.embed-responsive-*`。

```css
/* embed responsive by*/
.embed-responsive-{value} /* 設定 embeds 的比例 */
value: 21by9, 16by9, 4by3, 1by1
```

## 彈性盒 flex
前一篇已提早完整介紹過，本處不再說明，請參閱 <a href="{% post_path bootstrap-4-layout %}#flexbox-操作">Bootstrap 4 教學（一）的 flexbox 操作</a>。

## 浮動 float
與 CSS 的 `float` 觀念相同，同樣支援響應式。

```css
/* float */
.float-{value} /* 設定 float */
.float-{breakpoint}-{value} /* 響應式 float */

breakpoint: sm, md, lg, xl
value: left, right, none
```

> 到這裡你應該已經發現：在 Bootstrap 中，透過響應式 class 的組合，可以輕鬆控制不同裝置上的表現，不會只有單一種樣子。

## 隱藏文字 text-hide
能將文字隱藏起來，肉眼看不到（但 SEO 爬蟲仍讀得到），通常用在以背景圖取代文字的元素。此功能在 Bootstrap 5 已被移除。

```css
/* text-hide */
.text-hide /* 文字隱藏但非不顯示 (display-none)，只是肉眼看不到 */
```

舉例：
```html https://getbootstrap.com/docs/4.4/utilities/image-replacement/
<h1 class="text-hide" style="background-image: url('...');">Bootstrap</h1>
```

## 溢出處理 overflow
與 CSS 觀念相同，只提供兩種常用模式。

```css
/* overflow */
.overflow-{value} /* 設定 overflow */

value: auto, hidden
```

## 位置與固定 position
與 CSS 觀念相同，提供五種常用模式。

```css
/* position */
.position-{value} /* 設定 position */

value: static, relative, absolute, fixed, sticky
```

另外有幾個獨立的 class 提供常見的固定用途：固定在頂端、固定在底部、捲動到頂端時黏在上方（sticky），這些都是網站常見的手法。

```css
.fixed-top /*保持上面*/
.fixed-bottom /*保持下面*/
.sticky-top /*捲動到頂端時黏在上方*/
```

## 視障閱讀 Screenreaders
給螢幕閱讀器判讀用：`.sr-only` 在畫面上會被隱藏，而 `.sr-only-focusable` 則在以鍵盤聚焦（例如視障使用者操作）時會顯示出來。

範例為：
```html
<a class="sr-only sr-only-focusable" href="#content">你看不到我，除非用鍵盤（Tab）選到我</a>
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
.w-{value} /* 指定該寬度為多少百分比或 auto */
.h-{value} /* 指定該高度為多少百分比或 auto */
value: 25, 50, 75, 100
.mw-100 /* max-width:100% */
.mh-100 /* max-height:100% */

/* by viewport */
.vw-100 /* width:100vw */
.vh-100 /* height:100vh */
.min-vw-100 /* min-width:100vw */
.min-vh-100 /* min-height:100vh */
```

## 間距 spacing
間距是很重要的微調工具，處理的是 margin（外距）與 padding（內距），公式的組合比較多。主要由三個部分組成：屬性（內距 `p` 或外距 `m`）、方向（上下左右）、距離（以 0.25rem 為單位）。

```css
.{value}{sides}-{number} /* 間距控制 */
.{value}{sides}-{breakpoint}-{number} /* 響應式間距控制 */

value: p(padding), m(margin)
side: t(top), b(bottom), l(left), r(right), x(left & right), y(top & bottom), 未指定時 (top & bottom & left & right)
number: 0, 1, 2, 3, 4, 5, auto
breakpoint: sm, md, lg, xl

/* margin 可允許負值（反向），所以對數字前面加個 n 表示負數 */
number: n5, n4, n3, n2, n1, 0, 1, 2, 3, 4, 5, auto /* for margin use only */
```

> 當元素有指定寬度時，加上 `.mx-auto` 就能輕易水平置中（左右 margin 自動撐滿剩餘空間）。

## 延伸連結 Stretched link
這是 v4.4 的新功能：如果希望連結的可點擊範圍擴大到外層容器，可以對連結加上 `.stretched-link`。它會產生一個 `::after` 偽元素，並以 `position: absolute` 填滿最近的已定位祖先元素，因此**需要在父元素**加上 `position: relative`，把範圍限定在這個父元素內。

範例為：
```html
<div class="w-50 position-relative bg-dark text-white">
  <div>
    <h5 class="mt-0">延伸連結區域之範例</h5>
    <p>整個黑色是由一個上層元素綁定 position-relative，使得作用僅限於上層元素（黑色區域），上層範圍也可以是更外層的祖先元素。</p>
    <a href="#" class="stretched-link">我是連結反應</a>
  </div>
</div>
```

## 文字 text
文字對齊的方式稍早有提到，這裡再完整複習一下：

```css
.text-justify /* text-align:justify 效果，主要是英文字適當填滿空間。不支援 breakpoint */

.text-{value} /* text-align */
.text-{breakpoint}-{value} /* 響應式 text-align */
value: left, right, center
```

文字換行或溢出處理

```css
.text-wrap /* 臨界至寬度時，文字自動換行 */
.text-nowrap /* 臨界至寬度時，文字不換行讓他溢出 */

.text-truncate /* 文字溢出時以「…」省略，對 inline 元素無效 */

.text-break /* 當英文單字之字母過長時，必要時允許斷行 */
```

文字效果處理

```css
.text-lowercase /* 英文全轉小寫 */
.text-uppercase /* 英文全轉大寫 */
.text-capitalize /* 僅判讀英文各單字第一字母轉大寫 */

.font-weight-{value} /* 粗體 */
value: bold, bolder, normal, light, lighter

.font-italic /*斜體*/
.text-monospace /* 採用 monospace 字型 */

.text-reset /*清除自己字色，改為繼承父元素 */
.text-decoration-none /* 清除裝飾線 */
```

## 垂直對齊 Vertical align
這裡的垂直對齊只對 inline 類型的元素有效（不是 block），例如 `inline`、`inline-block`、`inline-table` 與表格的 `td`。

```css
.align-{value} /*垂直對齊位置*/
value: baseline, top, middle, bottom, text-top, text-bottom
```

## 可視性 visibility
與 CSS 觀念相同，會占用網頁的空間卻看不到。

```css
.visible /* 同 visibility: visible，看得見 */
.invisible /* 同 visibility: hidden，看不見但仍占空間 */
```