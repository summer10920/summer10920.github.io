---
title: "[基礎課程] Bootstrap 教學（二）：內容與通用"
categories:
  - 職訓教材
  - Bootstrap
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-28 12:45:49
---

本章節分為兩節介紹分別是 Content 內容與 Utilities 通用。這些都比較偏向基礎或常用的 class 公式使用度偏高。完整學習這些後，靜態設計 Bootstrap 就算學的七八成了（可以出門騙吃騙吃）。

<!-- more -->

---

# 內容 Content
套入 Bootstrap 後，你可能發現有不少的 HTML 標籤原有的外觀效果與你印象中不太一樣（譬如 input, button, a, ul...)，是因為 Bootstrap 重新定義 HTML 標籤 CSS 外觀，使得能更貼近設計所需風格。因此從這裡你會開始接觸一些很基本的像是文字、圖片、表格這類的內容相關 HTML 標籤或 class 屬性。

>一部分的單元我們不做介紹，像是 Reboot 重置說明、Code 代碼效果。.. 等等，有興趣可詳閱官方文件。

## 文字效果 Typography
使用 HTML 部分文字標籤時 Bootstrap 重新定義了這些外觀效果，另外可以透過 class 樣式表來表達一樣的模擬外觀。

如果有些情況下不方便使用標籤時，必要時 Bootstrap 有設計成可改用 class 相同命名來取得標籤之外觀效果（十分好用能省下複合標籤，或在一些元件內進行組合使用）。以下為 Bootstrap 有重新定義化的基礎文字標籤。

> 如果你很熟悉 HTML 標籤名稱或十分信任 Bootstrap 的重新定義理念，這段內容可以快速帶過稍微認識即可，不用刻意去熟悉這些 class 化的標籤參數原理為何。

| HTML 標籤             | class 模擬屬性                  | 外觀說明     | Bootstrap 重新定義或參數說明                                                                                                                |
| --------------------- | ------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| h1 ~ h6               | .h1 ~ .h6                       | 標題文字     | h1 的 font-size 為 2.5rem，h2 為 2rem，之後每降一級減去 0.25rem                                                                             |
| small                 | .small                          | 次文字       | 為原尺寸後為再縮放 80%，使字體再縮小些                                                                                                      |
|                       | .text-muted                     | 減弱文字     | 能使文字產生灰化文字，類似提示字應用                                                                                                        |
|                       | .display-*                      | 超大文字     | 做一些需要特大的文字外觀，像是廣告或是主題文字，`*`數字越小代表越大（同 heading 數字邏輯但特別大）                                          |
|                       | .lead                           | 前導文字     | 作為 p 段落的前導，效果只是綁定`font-size: 1.25rem`與`font-weight: 300`而已                                                                 |
| mark                  | .mark                           | 標記文字     | 產生黃底標記的效果                                                                                                                          |
| del, s                |                                 | 刪除文字     | 產生一條線位於文字中央水平，有刪除線的效果                                                                                                  |
| ins, u                |                                 | 底線文字     | 同上但是放於底部，有底線效果                                                                                                                |
| strong, b             |                                 | 粗體文字     | 文字加粗，綁訂了`font-weight: bolder`效果                                                                                                   |
| em, cite              |                                 | 斜體文字     | 文字斜體化                                                                                                                                  |
| abbr                  |                                 | 縮寫文字     | 作為英文縮寫之提示（搭配 HTML 之 title 屬性），除了底線是點線外，還提供 hover 行為時產生問號符號，如果需要可以增加`.initialism`縮字尺寸 90% |
| blockquote.blockquote |                                 | 引用文字     | 對 blockquote 追加`.blockquote`使引用效果更好些                                                                                             |
|                       | .blockquote-footer              | 引用來源文字 | 產生前面有`—`符號之淺灰小字，同時此處你應該使用 footer 標籤並上層為 blockquote 標籤                                                         |
|                       | .text-center & .text-right      | 文字對齊     | 使文字居中或靠右，這些會能在通用類別更詳細解說到                                                                                            |
|                       | .list-unstyled                  | 清除列表樣式 | 通常寫在 ul 或 ol 這類標籤內，使原外觀效果完全清除                                                                                          |
|                       | .list-inline > list-inline-item | 列表水平化   | 將列表** inline 水平化**並適時 margin 分開，常用於水平選單                                                                                  |
|                       | .text-truncate                  | 省略文字     | 當超出空間 overflow 時會轉成。.. 做省略之效果                                                                                               |

## 圖片效果 images
圖片沒有太多重要的外觀公式，主要還是依賴基本 class 公式並保持 box 觀念，像是你應該知道`.float-{left\|right}` & `.text-{left\|right}` & `.m{l\|r}-auto`這三者的原理與應用場合。

| class 屬性                                                       | 效果說明   | Bootstrap 重新定義或參數說明                                                            |
| ---------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| .img-fluid                                                       | 響應式圖片 | 使圖片賦予`max-width:100%`&`hegiht:auto`，讓圖片跟隨父容器 box 填滿寬度並自動等比例高度 |
| .img-thumbnail                                                   | 縮圖框     | 對圖片產生 1px 的白框                                                                   |
| .rounded                                                         | 圓角化     | 對圖片圓角化 (`border-radius:0.25rem`)                                                  |
| .float-{left\|right} <br> .text-{left\|right} <br> .m{l\|r}-auto | 靠邊對齊   | 基本方法很多都能適用，使能對向靠齊左右                                                  |
| .text-{center} <br> .mx-auto                                     | 水平置中   | 同上理由                                                                                |

## 表格效果 table
Bootstrap 已先對 table 重置十分乾淨，大多數都會再套加一些給 table 專用的 class 公式。注意以下要點：

1. 需要美麗的表格外觀，一定需要對`<table></table>`處設定`.table`的 class 公式，否則你只會得到乾淨潔白的 table。
2. table 必須要完整結構，像是有`<thead></thead>`, `<tbody></tbody>`,`<th></th>`這些，不重視語意的可以不用宣告`scope={row\|col}`標籤屬性
3. class 公式下的位置要對，思考對那裡變化就該用哪裡的 class 且效果可以累加。

| class 屬性           | 位置處            | 效果說明 | Bootstrap 重新定義或參數說明                                                                                                                  |
| -------------------- | ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| .table               | table             | 美化表格 | 產生具有基本美化的表格，否則你只會得到潔白如玉的表格外觀                                                                                      |
| .table-{color}       | table, tr, th, td | 表格主色 | 提供色底黑字之表格效果，除了 dark 有明顯白字。<br>color:active, primary, secondary, success, danger, warning, info, light, dark。             |
| .thead-{dark\|light} | thead             | 暗化標題 | 提供兩種暗亮化標題之顏色效果                                                                                                                  |
| .table-striped       | table             | 灰白間格 | 自動產生相間灰白的效果。                                                                                                                      |
| .table-bordered      | table             | 線條化   | 上下左右都有邊框線`border:1px solid #dee2e6`                                                                                                  |
| .table-borderless    | table             | 清除線條 | 上下左右都將清除邊框線                                                                                                                        |
| .table-hover         | table             | 滑過灰底 | 產生滑鼠移過時該 tr 排有灰底效果                                                                                                              |
| .table-sm            | table             | 小表格化 | 欄位間隙縮短形成小表格                                                                                                                        |
| .bg-{color}          | table, tr, th, td | 背景色化 | 直接使用 background 公式提供色底（黑字）之表格效果，建議 table.table-dark 使文字顏色為白。<br>color:primary, success, danger, warning, info。 |

### 響應式表格 (in table 標籤）
初始預設的表格會自動收縮到最低內容寬，可以使用響應式公式指定這些表格何時跳脫收縮而鎖定寬度產生水平滾軸使人滾動。

```css
/* table responsive */
.table-responsive /* 不允許收縮，擠壓時直接啟用水平滾軸 */
.table-responsive-{breakpoint} /* 響應式表格，何種狀態下就開始不允許收縮 */

breakpoint: sm, md, lg, xl
```

## 圖片說明 figure (HTML5 新標籤）
figure 屬於 HTML5 的新型態標籤，拿來作為圖片並結合描述文字的獨立區塊。Bootstrap 對於這種圖片說明標籤用途有特別進行定義。figure 的定義為：

```html
<!-- 使用 figure 主標籤包覆，內部包一個 img 標籤做圖片來源與 figcaption 標籤做說明文字 -->
<figure>
  <img src="..." alt="text"/>
  <figcaption>text</figcaption>
</figure>
```

而 Bootstrap 的定義用法為：

1. 對 figure 主標籤添加`.figure`，使下推 margin 有 1rem 效果。
2. 圖片標籤添加`.figure-img`，使下推 margin 有 0.5rem 效果。可適時添加`.img-fluid`自適應或`.rounded`圓角化之類的累加效果。
3. 說明標籤添加`.figure-caption`，字色刷灰#6c757d 且字縮小約 90%，可適時添加`.text-{center|right}`將文字靠齊呈現。

```html
<figure class="figure">
  <img src="..." class="figure-img img-fluid rounded" alt="text">
  <figcaption class="figure-caption text-right">test</figcaption>
</figure>
```

# 通用 Utilities
屬於通用性質且十分常見的一些外觀零件公式，算是整個 Bootstrap 你最常用到且需要去記住的公式表，這些通用類別會幫助你進行設計 Bootstrap 時輕鬆快速的套弄出視覺效果。

## 邊框 borders
使用`.border`能對一個 box 進行添加邊框線，效果為`border:1px solid #dee2e6`。也能控制那些方向呈現部分邊框。

```css
.border  /* 四邊產生 1px 的灰色邊框線 */
.border-{top | right | bottom | left}  /* 只有該處有邊框線 */
```

反之`.border-0`為`border: 0!important;`之無邊框效果。

```css
.border-0  /* 邊框線為無 */
.border-{top | right | bottom | left}-0  /* 只有該處邊框線為無 */
```

若是調整顏色可以使用`.border-{color}`，這只是調整顏色，原本屬性還是需要`.border`先負責產生邊框線。

```css
.border-{color}  /* 指定邊框顏色 */
color:primary, secondary, success, danger, warning, info, light, dark, white
```

圓角化的處理使用`.rounded`，能對邊框線產生`border-radius: .25rem`效果，也能指定部分區域原角，或是成特定形狀。

```css
.rounded  /* 圓角化效果為 0.25rem */
.rounded-sm /* 原角效果達到 0.2rem */
.rounded-lg /* 原角效果達到 0.3rem */
.rounded-0 /* 取消原角 */

.rounded-{right | bottom | left | top}  /* 部分圓角化 */

.rounded-circle  /* 圓形 */
.rounded-pill /* 橢圓形 */
```

## 清除浮動（容器內） clearfix
Bootstrap 設計出一種邏輯，對父容器使用`.clearfix`來包住任何 float 對象，能便利的不讓 float 去影響後面的 HTML 元素。原理為：

透過偽元素進行`clear:both`行為使得這個區域結尾時會消除所有浮動現象。同時 after 本身有 block 會撐回原元素的空間。

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

> 只要記得使用任何浮動用一個父容器包住同時宣告 clearfix 就對了，父容器以外的部分不會有浮動現象，同時父容器內部不會有錯覺現象。

## 關閉圖示 close icon
如果你要做一個關閉按鈕，可以利用`.close`產生**靠右且 hover 變化** 的外觀效果。

範例為：
```html
<button type="button" class="close">×</button>
```

> 官方範例中出現的`<span aria-hidden="true"></span>`是一種給視障軟體判別的設計，能讓軟體忽略這個內容文字閱讀。而`aria-label="Close"`屬性是讓軟體認出他是一個名稱叫 Close 的按鈕元素。這些可以省略不寫且不會影響視覺與功能。

## 顏色 colors
算是十分重要且實用的公式，官方還把顏色取了名字（請習慣他）。大多數跟顏色有關的參數都逃脫不了這些顏色名稱。公式也很好記住，什麼型態就是顏色名字。另外也需提醒你應該對於亮色字搭配高對比的暗背色，反之亦然。同時這些顏色會自動對連結型 (hover) 或表單按鈕型 (focus) 有對應的顏色變異。

```css
.text-{color} /*文字色 */
color: primary, secondary, success, danger, warning, info, light, dark, muted, white;

.bg-{color} /*背景色*/

color: primary, secondary, success, danger, warning, info, light, dark, white, transparent;

.bg-gradient-{color} /*漸層背景色但預設為禁用，除非到 scss/_variables.scss 檔案位置調整$enable-gradients 為 true*/
color: primary, secondary, success, danger, warning, info, light, dark;

.text-{black|white}-50  /*對黑與白多設計一種透明度為 0.5 的黑白字效果
```

> 如果你在一些情況下 colors 會套用失敗，可以試著改套用在父容器上面。

## 顯示 display
前章節已介紹而這裡快速帶過，並增加討論一些內容。需要調整一些 display 參數時，你可以用`.d-*`來調整。

```css
/* display */
.d-{value} /* display node */
.d-{breakpoint}-{value} /* 響應式 display */

breakpoint: sm, md, lg, xl
value: none, inline, inline-block, block, table, table-cell, table-row, flex, inline-flex
```

> 使用 class 公式組合在響應式環境下可控制變化的時機。
> 舉例來說`.d-none.d-sm-block`的狀況為，平常都會出現（因為 sm 以上都看的到）但到手機時就看不到（未達到 sm 時都是 d-none 狀態）。

如果想控制只有當列印狀態下 (<kbd>ctrl</kbd>+<kbd>>p</kbd>) 時，可以使用`.d-print-*`。那麼這個元素就能控制是否會被印表機所印出來。

```css
/* display in print*/
.d-print-{value} /* display node in print */

value: none, inline, inline-block, block, table, table-cell, table-row, flex, inline-flex
```

> 舉例來說`.d-none .d-print-block`，這狀況網頁瀏覽時不會出現，只有當使用網頁列印時才會出現。

## 內嵌 embeds
舉凡`<embed>`, `<iframe>`, `<video>`, `<object>`這些類型都能列入應用，你需要一個父容器設定`div.embed-responsive`才能觸發優化。外觀優化包含了除邊線 (frameborder="0") 與響應調整寬度（換言之你不用手動固定 embed 的寬了，但高度仍需設定）。

```css
/* embed responsive*/
.embed-responsive /* 綁定父容器進行響應式 */
```

此外如果你需要鎖定比例則另添加參數`embed-responsive-*`來強迫比例（預設共四種），注意這只有比例效果，因此你還是需要前者的 embed-responsive 效果，也就是整體寫為`.embed-responsive.embed-responsive-*`

```css
/* embed responsive by*/
.embed-responsive-{value} /* 設定 embeds 的比例 */
value: 21by9, 16by9, 4by3, 1by1
```

## 彈性盒 flex
前一章節已提早完整介紹過，本處不再說明。詳閱 [[基礎課程] Bootstrap 教學（一）：初始與排版 | 3.2. flexbox 操作](2020/03-26/bs-baseclass-1/#flexbox-%E6%93%8D%E4%BD%9C)

## 浮動 float
與 CSS 觀念相同，同樣具有響應式使用。

```css
/* float */
.float-{value} /* 設定 float */
.float-{breakpoint}-{value} /* 響應式 float */

breakpoint: sm, md, lg, xl
value: left, rignt, none
```

> 到此時你應該知道，響應式的組合在 Boostrap 可以輕鬆控制哪些行為在那些裝置的參數變化，不是死板的只有一種表現。

## 隱藏文字 text-hide
能將文字藏起來肉眼看不到（但 SEO 爬蟲仍可讀），通常應用在使用 background 來模擬圖片的元素，可惜的是官方預計 Bootstrap v5 會移除此功能。

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

有另外獨立提供一些常用的固定用途，像是永遠保持上面、下面、撞到頂端則保持上面，這些都是網站常見到的一些手法。

```css
.fixed-top /*保持上面*/
.fixed-bottom /*保持下面*/
.sticky-top /*撞到頂端則保持上面*/
```

## 視障閱讀 Screenreaders
提供特殊視障軟體判讀用，`.sr-only`一般會被隱藏。而`sr-only-focusable`如果透過鍵盤選取時（視障朋友操作）能被選取到。

範例為：
```html
<a class="sr-only sr-only-focusable" href="#content">你看不到我，除非用鍵盤（ｔａｂ）選到我</a>
```

## 陰影 Shadow
提供元素產生陰影效果應用，此效果可能對一些元件無效 (Bootstrap 禁止了部分），除非到 scss/_variables.scss 檔案位置調整$enable-shadows 為 true。

```css
.shadow-none /*無陰影*/
.shadow-sm /*小陰影*/
.shadow /*陰影*/
.shadow-lg /*大陰影*/
```

## 尺寸 sizing
版面上事後調整元素尺寸是常見的事，這裡提供了綁定這些寬高的固定公式。

```css
/* by percent */
.w-{value} /* 指定該寬度為多少百分比或 auto */
.h-{value} /* 指定該高度為多少百分比或 auto */
value: 25, 50, 75, 100
.mw-100 /* max-width:100% */
.mh-100 /* max-height:100% */

/* by viewport */
.vw-100 /* width:100vw */
.vh-100 /* height:100vw */
.min-vw-100 /* min-width:100vw */
.min-vh-100 /* min-height:100vw */
```

## 間距 spacing
算很重要的微調處理，這裡討論的是 margin 與 padding 內外距的調整，這裡的公式參數會比較組合多一些。主要都是控制類型是內距 p 還是外距 m、方向上下左右、距離要多長（單位差為 0.25rem)

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

> 當對象有寬度時，設定`.mx-auto`時就能輕易水平置中（左右都塞滿了）。

## 延伸連結 Stretched link
屬於 v4.4 的新功能，如果有某個連結反應希望擴大到外部容器去，可以對此連結添加`.stretched-link`，此連結會產生一個偽元素：after 並以`position:absolute`方式塞滿整個空間（上層沒有定位的話），因此**需要在父元素**上綁定一個`position:relative`使得影響範圍限定在這個父元素內。

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

.text-truncate /* 溢出行為發生時，使用。.. 替代，但唯獨對 inline 模式無效 */

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

## 垂齊對齊 Vertical align
這裡的文行垂直對齊效果是指 inline 類型（非 block)，像是 inline, inline-block, inline-table, table>td 等標籤有效。

```css
.align-{value} /*垂直對齊位置*/
value: baseline, top, middle, bottom, text-top, text-bottom
```

## 可視性 visibility
與 CSS 觀念相同，會占用網頁的空間卻看不到。

```css
.visible /* 同visibility:visible 看的見*/
.invisible /* 同visibility:hidden 看不見但存在*/
```