---
title: '[基礎課程] TailwindCSS v4.1 - 公式表'
categories:
  - Misc Notes
  - Web Frontend
tag:
  - CSS
  - TailwindCSS
  - 前端框架
  - 原子化 CSS
date: 2025-09-01 14:26:44
hidden: false
---

![](/assets/images/banner/tailwind.png)

本篇內容收錄所有完整的公式表供快速參考。以下提供完整的 TailwindCSS 公式表，按照功能分類整理，方便您快速查找和使用。

<!-- more -->

# Layout
佈局相關的類別用於控制元素的顯示方式、定位和排列。

## aspect-ratio
用於控制元素的寬高比例，特別適合用於圖片和影片等媒體內容。當應用於圖片時，建議搭配 `object-cover` 或 `object-contain` 來避免圖片變形。

| 類別名稱           | CSS 屬性                                   | 說明         |
| ------------------ | ------------------------------------------ | ------------ |
| `aspect-auto`      | `aspect-ratio: auto;`                      | 保持原始比例 |
| `aspect-square`    | `aspect-ratio: 1 / 1;`                     | 1:1          |
| `aspect-video`     | `aspect-ratio: var(--aspect-ratio-video);` | 16:9         |
| `aspect-{ratio}`   | `aspect-ratio: {ratio};`                   | 自訂比例     |
| `aspect-[<value>]` | `aspect-ratio: <value>;`                   | 任意值比例   |

```html
<!-- aspect-{ratio} -->
<img class="aspect-3/2 object-cover" src="/img/villas.jpg" />

<!-- aspect-[<value>] -->
<img class="aspect-[calc(4*3+1)/3]" src="/img/villas.jpg" />

<!-- 等價 aspect-[var(<custom-property>)] -->
<img class="aspect-(--my-aspect-ratio)" src="/img/villas.jpg" />  

<!-- aspect-video -->
<iframe class="aspect-video" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>

<!-- rwd -->
<iframe class="aspect-video md:aspect-square" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
```

### 自訂
```css
@theme {
  --aspect-loki: 4 / 3; 
}
```
```html
<img class="aspect-loki" src="/img/villas.jpg" />
```

{% note info %}
**小技巧：**
- 圖片搭配 `object-cover` 可確保填滿容器且不變形
- 影片建議使用 `aspect-video` 維持標準 16:9 比例
- 可使用 `aspect-[ratio]` 設定自訂比例，如 `aspect-[4/3]`、`aspect-[21/9]`
- 支援 CSS 變數：`aspect-[var(--custom-ratio)]`
{% endnote %}

## columns
用於控制多欄佈局的欄數，特別適合用於文字內容、圖片畫廊或卡片列表的排版。當應用於文字時，建議搭配適當的 `gap` 來控制欄位間距。

CSS 屬性值有兩種設定方式：
- 當設定為數字（如 `columns-3`）時，會根據指定的數字來分割成等寬的欄位
- 當設定為寬度值（如 `columns-md`）時，會根據指定的寬度自動計算可容納的欄數

| 類別名稱                      | CSS 屬性                           | 說明                |
| ----------------------------- | ---------------------------------- | ------------------- |
| `columns-<number>`            | `columns: <number>;`               | 數字欄數            |
| `columns-auto`                | `columns: auto;`                   | 自動欄數            |
| `columns-3xs`                 | `columns: var(--container-3xs);`   | 寬度 16rem (256px)  |
| `columns-2xs`                 | `columns: var(--container-2xs);`   | 寬度 18rem (288px)  |
| `columns-xs`                  | `columns: var(--container-xs);`    | 寬度 20rem (320px)  |
| `columns-sm`                  | `columns: var(--container-sm);`    | 寬度 24rem (384px)  |
| `columns-md`                  | `columns: var(--container-md);`    | 寬度 28rem (448px)  |
| `columns-lg`                  | `columns: var(--container-lg);`    | 寬度 32rem (512px)  |
| `columns-xl`                  | `columns: var(--container-xl);`    | 寬度 36rem (576px)  |
| `columns-2xl`                 | `columns: var(--container-2xl);`   | 寬度 42rem (672px)  |
| `columns-3xl`                 | `columns: var(--container-3xl);`   | 寬度 48rem (768px)  |
| `columns-4xl`                 | `columns: var(--container-4xl);`   | 寬度 56rem (896px)  |
| `columns-5xl`                 | `columns: var(--container-5xl);`   | 寬度 64rem (1024px) |
| `columns-6xl`                 | `columns: var(--container-6xl);`   | 寬度 72rem (1152px) |
| `columns-7xl`                 | `columns: var(--container-7xl);`   | 寬度 80rem (1280px) |
| `columns-(<custom-property>)` | `columns: var(<custom-property>);` | 自訂屬性欄數        |
| `columns-[<value>]`           | `columns: <value>;`                | 任意值欄數          |

```html
<!-- columns-<number> -->
<div class="columns-2 gap-4">
  <p>第一欄內容。..</p>
  <p>第二欄內容。..</p>
</div>

<!-- rwd -->
<div class="columns-1 md:columns-2 lg:columns-3 gap-6">
  <div class="break-inside-avoid">卡片 1</div>
  <div class="break-inside-avoid">卡片 2</div>
  <div class="break-inside-avoid">卡片 3</div>
</div>

<!-- 固定寬度欄位 -->
<div class="columns-md gap-8">
  <img class="w-full" src="/img/photo1.jpg" />
  <img class="w-full" src="/img/photo2.jpg" />
</div>

<!-- 自訂欄數 -->
<div class="columns-[5] gap-2">
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <span>4</span>
  <span>5</span>
</div>
```

### 自訂
```css
@theme {
  --columns-custom: 4;
}
```
```html
<div class="columns-custom gap-4">
  <div>自訂欄位 1</div>
  <div>自訂欄位 2</div>
  <div>自訂欄位 3</div>
  <div>自訂欄位 4</div>
</div>
```

{% note info %}
**小技巧：**
- 使用 `break-inside-avoid` 防止內容在欄位間斷開
- 搭配 `gap-{size}` 控制欄位間距，提升可讀性
- 響應式設計建議：`columns-1 md:columns-2 lg:columns-3`
- 固定寬度欄位適合圖片畫廊，數字欄位適合文字內容
- 支援 CSS 變數：`columns-[var(--custom-columns)]`
{% endnote %}

## break-after, break-before
`break-after` 和 `break-before` 用於控制元素在分頁、分欄或分區時的斷行行為，特別適合用於列印樣式、多欄佈局和分頁媒體。這些屬性可以防止內容在不適當的位置斷開，或強制在特定位置斷行。

| 類別名稱                           | CSS 屬性                             | 說明               |
| ---------------------------------- | ------------------------------------ | ------------------ |
| `break-{before\|after}-auto`       | `break-{before\|after}: auto;`       | 自動斷行（預設值） |
| `break-{before\|after}-avoid`      | `break-{before\|after}: avoid;`      | 避免斷行           |
| `break-{before\|after}-all`        | `break-{before\|after}: all;`        | 強制斷行           |
| `break-{before\|after}-avoid-page` | `break-{before\|after}: avoid-page;` | 避免分頁斷行       |
| `break-{before\|after}-page`       | `break-{before\|after}: page;`       | 強制分頁斷行       |
| `break-{before\|after}-left`       | `break-{before\|after}: left;`       | 強制左頁斷行       |
| `break-{before\|after}-right`      | `break-{before\|after}: right;`      | 強制右頁斷行       |
| `break-{before\|after}-column`     | `break-{before\|after}: column;`     | 強制分欄斷行       |

```html
<!-- 避免標題斷行 -->
<h2 class="break-after-avoid">章節標題</h2>
<p>章節內容。..</p>

<!-- 強制分頁 -->
<div class="break-before-page">
  <h1>新章節</h1>
  <p>新章節內容。..</p>
</div>

<!-- 多欄佈局中的斷行控制 -->
<div class="columns-2 gap-4">
  <div class="break-inside-avoid">
    <h3 class="break-after-avoid">子標題</h3>
    <p>內容不會與標題分開。..</p>
  </div>
  <div class="break-inside-avoid">
    <h3 class="break-after-avoid">另一個子標題</h3>
    <p>另一個內容。..</p>
  </div>
</div>

<!-- 列印樣式 -->
<div class="print:break-before-page">
  <h2>列印時強制分頁</h2>
  <p>這個內容會在列印時強制分頁。..</p>
</div>
```

{% note info %}
**小技巧：**
- 使用 `break-after-avoid` 防止標題與內容分離
- 搭配 `break-inside-avoid` 在多欄佈局中保持內容完整性
- 列印樣式建議：`print:break-before-page` 強制重要內容分頁
- 多欄佈局中，標題建議使用 `break-after-avoid` 避免孤行
- 支援響應式設計：`md:break-after-column lg:break-after-page`
{% endnote %}

## break-inside
用於控制元素內部的斷行行為，特別適合用於多欄佈局、列印樣式和分頁媒體。這個屬性可以防止內容在元素內部被不當分割，確保內容的完整性和可讀性。

| 類別名稱                    | CSS 屬性                      | 說明               |
| --------------------------- | ----------------------------- | ------------------ |
| `break-inside-auto`         | `break-inside: auto;`         | 自動斷行（預設值） |
| `break-inside-avoid`        | `break-inside: avoid;`        | 避免內部斷行       |
| `break-inside-avoid-page`   | `break-inside: avoid-page;`   | 避免分頁內部斷行   |
| `break-inside-avoid-column` | `break-inside: avoid-column;` | 避免分欄內部斷行   |

```html
<!-- 避免卡片內容斷行 -->
<div class="columns-2 gap-4">
  <div class="break-inside-avoid bg-white p-4 rounded shadow">
    <h3 class="font-bold mb-2">卡片標題</h3>
    <p>這個卡片的內容不會在欄位間斷開。..</p>
    <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">按鈕</button>
  </div>
  <div class="break-inside-avoid bg-white p-4 rounded shadow">
    <h3 class="font-bold mb-2">另一個卡片</h3>
    <p>另一個卡片的內容也不會斷開。..</p>
    <img class="w-full mt-2" src="/img/photo.jpg" alt="照片" />
  </div>
</div>

<!-- 避免圖片和說明文字分離 -->
<div class="columns-3 gap-6">
  <div class="break-inside-avoid">
    <img class="w-full mb-2" src="/img/photo1.jpg" alt="照片 1" />
    <p class="text-sm text-gray-600">照片 1 的說明文字</p>
  </div>
  <div class="break-inside-avoid">
    <img class="w-full mb-2" src="/img/photo2.jpg" alt="照片 2" />
    <p class="text-sm text-gray-600">照片 2 的說明文字</p>
  </div>
  <div class="break-inside-avoid">
    <img class="w-full mb-2" src="/img/photo3.jpg" alt="照片 3" />
    <p class="text-sm text-gray-600">照片 3 的說明文字</p>
  </div>
</div>

<!-- 響應式斷行控制 -->
<div class="columns-1 md:columns-2 lg:columns-3 gap-4">
  <article class="break-inside-avoid">
    <h2 class="text-xl font-bold mb-3">文章標題</h2>
    <p class="mb-2">文章摘要。..</p>
    <p class="text-sm text-gray-500">作者：John Doe</p>
  </article>
  <article class="break-inside-avoid">
    <h2 class="text-xl font-bold mb-3">另一篇文章</h2>
    <p class="mb-2">另一篇文章摘要。..</p>
    <p class="text-sm text-gray-500">作者：Jane Smith</p>
  </article>
</div>

<!-- 列印樣式中的斷行控制 -->
<div class="print:break-inside-avoid">
  <h3 class="font-bold">列印章節</h3>
  <p>這個章節的內容在列印時不會被分割。..</p>
  <ul class="list-disc ml-4">
    <li>重要項目 1</li>
    <li>重要項目 2</li>
    <li>重要項目 3</li>
  </ul>
</div>
```

{% note info %}
**小技巧：**
- 在多欄佈局中，使用 `break-inside-avoid` 防止卡片內容被分割
- 圖片和說明文字建議包在同一個 `break-inside-avoid` 容器中
- 響應式設計中，可以搭配 `columns-{n}` 和 `break-inside-avoid` 優化不同螢幕尺寸的排版
- 列印樣式建議：`print:break-inside-avoid` 確保重要內容不被分頁切割
- 與 `break-after-avoid` 和 `break-before-avoid` 搭配使用，可以完全控制斷行行為
{% endnote %}

## box-decoration-break
用於控制元素在分欄、分頁或行內換行時，其裝飾性樣式（如背景、邊框、陰影等）的顯示行為。這個屬性適合用於需要保持視覺一致性的設計場景。

| 類別名稱                     | CSS 屬性                       | 說明                       |
| ---------------------------- | ------------------------------ | -------------------------- |
| `box-decoration-break-slice` | `box-decoration-break: slice;` | 在斷行處切割樣式（預設值） |
| `box-decoration-break-clone` | `box-decoration-break: clone;` | 在每個片段複製完整樣式     |

```html
<span class="box-decoration-slice bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white">
  Hello<br />World
</span>
<span class="box-decoration-clone bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white">
  Hello<br />World
</span>

<!-- 響應式設計中的樣式控制 -->
<div class="box-decoration-clone md:box-decoration-slice"></div>
```

{% note info %}
**小技巧：**
- 在多欄佈局中，使用 `box-decoration-break-clone` 保持樣式的視覺完整性
- 搭配 `break-inside-avoid` 可以更好地控制內容和樣式的斷行行為
- 響應式設計中，`box-decoration-break-clone` 確保在不同螢幕尺寸下樣式保持一致
- 列印樣式建議：`print:box-decoration-break-clone` 確保列印時樣式不被切割
- 適用於需要保持視覺一致性的設計元素，如高亮段落、引用區塊等
{% endnote %}

## box-sizing
用於控制元素的盒模型計算方式，決定元素的寬度和高度是否包含內邊距和邊框。這個屬性對於精確控制元素尺寸和佈局非常重要。

| 類別名稱      | CSS 屬性                   | 說明                       |
| ------------- | -------------------------- | -------------------------- |
| `box-border`  | `box-sizing: border-box;`  | 包含邊框和內邊距（預設值） |
| `box-content` | `box-sizing: content-box;` | 不包含邊框和內邊距         |

```html
<!-- 預設的 border-box 行為 -->
<div class="w-64 h-32 bg-blue-200 border-4 border-blue-600 p-4">
  <p class="text-blue-800">這個 div 的實際尺寸是 256x128px，包含邊框和內邊距</p>
</div>

<!-- content-box 行為 -->
<div class="w-64 h-32 bg-green-200 border-4 border-green-600 p-4 box-content">
  <p class="text-green-800">這個 div 的實際尺寸是 288x160px，不包含邊框和內邊距</p>
</div>

<!-- 響應式盒模型控制 -->
<div class="w-full md:w-80 lg:w-96 bg-gray-100 border-2 border-gray-300 p-6 box-border">
  <h3 class="text-lg font-semibold mb-2">響應式卡片</h3>
  <p class="text-gray-700">在不同螢幕尺寸下保持一致的內邊距和邊框</p>
</div>

<!-- 表單元素的盒模型控制 -->
<div class="space-y-4">
  <input type="text" class="w-64 px-4 py-2 border-2 border-gray-300 rounded box-border" placeholder="border-box 輸入框" />
  <input type="text" class="w-64 px-4 py-2 border-2 border-gray-300 rounded box-content" placeholder="content-box 輸入框" />
</div>

<!-- 自訂尺寸的盒模型控制 -->
<div class="w-[300px] h-[200px] bg-purple-200 border-4 border-purple-600 p-8 box-border">
  <p class="text-purple-800 text-center">自訂尺寸：300x200px，包含邊框和內邊距</p>
</div>
```

{% note info %}
**小技巧：**
- `box-border` 是 Tailwind 的預設值，讓佈局計算更直觀
- 使用 `box-content` 時要注意實際元素尺寸會比設定的寬高更大
- 響應式設計中，`box-border` 確保在不同螢幕尺寸下保持一致的視覺效果
- 表單元素建議使用 `box-border` 避免尺寸計算問題
- 自訂尺寸搭配 `box-border` 可以精確控制元素的最終尺寸
{% endnote %}

## display
用於控制元素的顯示類型，決定元素在頁面中的佈局行為。這個屬性是最基礎的 CSS 屬性之一，影響元素的盒模型、定位和流動方式。

| 類別名稱             | CSS 屬性                       | 說明                           |
| -------------------- | ------------------------------ | ------------------------------ |
| `inline`             | `display: inline;`             | 行內元素                       |
| `block`              | `display: block;`              | 區塊級元素                     |
| `inline-block`       | `display: inline-block;`       | 行內區塊元素                   |
| `flow-root`          | `display: flow-root;`          | 建立新的區塊格式化上下文       |
| `flex`               | `display: flex;`               | 彈性佈局容器                   |
| `inline-flex`        | `display: inline-flex;`        | 行內彈性佈局容器               |
| `grid`               | `display: grid;`               | 網格佈局容器                   |
| `inline-grid`        | `display: inline-grid;`        | 行內網格佈局容器               |
| `contents`           | `display: contents;`           | 內容容器（隱藏包裝元素）       |
| `table`              | `display: table;`              | 表格元素                       |
| `inline-table`       | `display: inline-table;`       | 行內表格元素                   |
| `table-caption`      | `display: table-caption;`      | 表格標題                       |
| `table-cell`         | `display: table-cell;`         | 表格儲存格                     |
| `table-column`       | `display: table-column;`       | 表格欄位                       |
| `table-column-group` | `display: table-column-group;` | 表格欄位群組                   |
| `table-footer-group` | `display: table-footer-group;` | 表格頁腳群組                   |
| `table-header-group` | `display: table-header-group;` | 表格標題群組                   |
| `table-row-group`    | `display: table-row-group;`    | 表格行群組                     |
| `table-row`          | `display: table-row;`          | 表格行                         |
| `list-item`          | `display: list-item;`          | 列表項目                       |
| `hidden`             | `display: none;`               | 隱藏元素                       |
| `sr-only`            | **註 1**                       | 螢幕閱讀器專用（隱藏視覺元素） |
| `not-sr-only`        | **註 2**                       | 取消螢幕閱讀器隱藏             |

```css
/* 註 1 */
.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* 註 2 */
.not-sr-only{
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

{% note info %}
**小技巧：**
- `block` 元素會佔滿整行，`inline` 元素會並排顯示
- `flex` 和 `grid` 是現代佈局的主要方式，功能強大且靈活
- 響應式設計中，可以根據螢幕尺寸改變元素的顯示類型
- `hidden` 完全隱藏元素，`contents` 隱藏包裝元素但保留子元素
- 表格佈局適合需要對齊的內容，但現代佈局建議使用 `flex` 或 `grid`
- `flow-root` 用於建立新的區塊格式化上下文，解決浮動問題
- `sr-only` 和 `not-sr-only` 用於無障礙設計，控制螢幕閱讀器的可見性
- 表格相關的 display 值適合複雜的表格結構，如 `table-header-group`、`table-footer-group`
{% endnote %}

## float
用於控制元素的浮動行為，讓元素脫離正常文檔流並向左或向右浮動。這個屬性常用於文字環繞圖片或創建多欄佈局，但在現代 CSS 中建議使用 `flex` 或 `grid` 佈局。

| 類別名稱      | CSS 屬性               | 說明                 |
| ------------- | ---------------------- | -------------------- |
| `float-right` | `float: right;`        | 向右浮動             |
| `float-left`  | `float: left;`         | 向左浮動             |
| `float-start` | `float: inline-start;` | 依據書寫方向起始浮動 |
| `float-end`   | `float: inline-end;`   | 依據書寫方向結尾浮動 |
| `float-none`  | `float: none;`         | 不浮動（預設值）     |

{% note info %}
**小技巧：**
- 浮動元素會脫離正常文檔流，可能影響後續元素的佈局
- 使用 `clear-both` 清除浮動，避免佈局問題
- 響應式設計中，可以根據螢幕尺寸控制浮動行為
- 現代佈局建議使用 `flex` 或 `grid` 替代浮動佈局
- 浮動主要用於文字環繞圖片，而不是創建複雜的佈局結構
{% endnote %}

## clear
`clear` 用於控制元素是否允許浮動元素出現在其左側、右側或兩側。這個屬性通常與 `float` 配合使用，用於清除浮動造成的佈局問題。

| 類別名稱      | CSS 屬性               | 說明                 |
| ------------- | ---------------------- | -------------------- |
| `clear-left`  | `clear: left;`         | 清除左側浮動         |
| `clear-right` | `clear: right;`        | 清除右側浮動         |
| `clear-both`  | `clear: both;`         | 清除兩側浮動         |
| `clear-start` | `clear: inline-start;` | 依據書寫方向起始清除 |
| `clear-end`   | `clear: inline-end;`   | 依據書寫方向結尾清除 |
| `clear-none`  | `clear: none;`         | 不清除浮動（預設值） |

{% note info %}
**小技巧：**
- `clear-both` 是最常用的清除浮動方式，確保元素不受任何浮動影響
- 清除浮動後，元素會從新的一行開始顯示
- 響應式設計中，可以根據螢幕尺寸選擇不同的清除策略
- 現代佈局建議使用 `flex` 或 `grid` 替代浮動佈局，避免清除浮動的複雜性
- 清除浮動主要用於修復傳統浮動佈局的問題，而不是創建新的佈局
{% endnote %}

## isolation
用於創建新的堆疊上下文，控制元素的層級關係和 z-index 行為。這個屬性特別適用於模態框、下拉選單、工具提示等需要控制層級的元素。

| 類別名稱         | CSS 屬性              | 說明                       |
| ---------------- | --------------------- | -------------------------- |
| `isolate`        | `isolation: isolate;` | 創建新的堆疊上下文         |
| `isolation-auto` | `isolation: auto;`    | 不創建堆疊上下文（預設值） |

```html
<!-- 基本堆疊上下文控制 -->
<div class="relative bg-gray-100 p-8">
  <div class="absolute top-0 left-0 w-32 h-32 bg-blue-200 z-10">藍色方塊 (z-10)</div>
  <div class="absolute top-4 left-4 w-32 h-32 bg-green-200 z-20">綠色方塊 (z-20)</div>
  
  <!-- 創建新的堆疊上下文 -->
  <div class="absolute top-8 left-8 w-32 h-32 bg-red-200 z-30 isolate">
    <div class="absolute top-0 left-0 w-16 h-16 bg-yellow-200 z-40">黃色方塊 (z-40)</div>
  </div>
</div>

<!-- 模態框層級控制 -->
<div class="relative bg-gray-100 p-8">
  <div class="bg-white border rounded-lg p-4 shadow-lg">
    <h3 class="font-bold mb-2">主要內容</h3>
    <p>這是頁面的主要內容區域</p>
  </div>
  
  <!-- 模態框使用 isolate 創建新的堆疊上下文 -->
  <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center isolate">
    <div class="bg-white rounded-lg p-6 shadow-xl max-w-md mx-4">
      <h3 class="text-lg font-bold mb-4">模態框</h3>
      <p class="mb-4">這個模態框使用 isolate 確保正確的層級顯示</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">關閉</button>
    </div>
  </div>
</div>

<!-- 下拉選單層級控制 -->
<div class="relative bg-gray-100 p-8">
  <div class="inline-block">
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      下拉選單 ▼
    </button>
    
    <!-- 下拉選單使用 isolate 確保在按鈕上方顯示 -->
    <div class="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg isolate">
      <div class="py-2">
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">選項 1</a>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">選項 2</a>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">選項 3</a>
      </div>
    </div>
  </div>
</div>

<!-- 工具提示層級控制 -->
<div class="relative bg-gray-100 p-8">
  <div class="inline-block">
    <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 relative group">
      懸停顯示工具提示
      
      <!-- 工具提示使用 isolate 確保正確顯示 -->
      <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity isolate">
        這是工具提示內容
        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  </div>
</div>

<!-- 響應式層級控制 -->
<div class="relative bg-gray-100 p-8">
  <div class="bg-white border rounded-lg p-4 shadow-lg">
    <h3 class="font-bold mb-2">響應式內容</h3>
    <p>在不同螢幕尺寸下，層級控制可能有所不同</p>
  </div>
  
  <!-- 響應式模態框 -->
  <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center isolate md:bg-opacity-75">
    <div class="bg-white rounded-lg p-4 md:p-6 shadow-xl max-w-sm md:max-w-md mx-4">
      <h3 class="text-lg font-bold mb-4">響應式模態框</h3>
      <p class="mb-4">在小螢幕上背景透明度較低，大螢幕上較高</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">關閉</button>
    </div>
  </div>
</div>
```

{% note info %}
**小技巧：**
- `isolate` 創建新的堆疊上下文，讓子元素的 z-index 相對於父元素計算
- 模態框、下拉選單、工具提示等常用 `isolate` 確保正確的層級顯示
- 響應式設計中，可以根據螢幕尺寸調整層級控制策略
- `isolate` 與 `position: relative/absolute/fixed` 配合使用效果最佳
- 避免過度使用 `isolate`，過多的堆疊上下文可能增加複雜性
{% endnote %}

## object-fit
用於控制替換元素（如 `<img>`、`<video>`）的內容如何適應其容器。這個屬性特別適合用於圖片畫廊、卡片設計和響應式圖片佈局。

| 類別名稱            | CSS 屬性                  | 說明                           |
| ------------------- | ------------------------- | ------------------------------ |
| `object-contain`    | `object-fit: contain;`    | 保持比例，完整顯示內容         |
| `object-cover`      | `object-fit: cover;`      | 保持比例，填滿容器（可能裁剪） |
| `object-fill`       | `object-fit: fill;`       | 拉伸填滿容器（可能變形）       |
| `object-none`       | `object-fit: none;`       | 保持原始尺寸，不縮放           |
| `object-scale-down` | `object-fit: scale-down;` | 類似 contain，但不會放大       |

{% note info %}
**小技巧：**
- `object-cover` 最常用於卡片設計，確保圖片填滿容器且不變形
- `object-contain` 適合需要完整顯示內容的場景，如產品圖片
- 響應式設計中，可以根據螢幕尺寸切換不同的 object-fit 值
- 搭配 `aspect-ratio` 可以創建更精確的圖片容器
- 影片內容也適用於 object-fit，特別適合創建影片預覽縮圖
{% endnote %}

## object-position
用於控制替換元素（如 `<img>`、`<video>`）在容器中的位置。這個屬性特別適合用於圖片畫廊、卡片設計和響應式圖片佈局。

| 類別名稱                     | CSS 屬性                                   | 說明         |
| ---------------------------- | ------------------------------------------ | ------------ |
| `object-top-left`            | `object-position: top left;`               | 左上對齊     |
| `object-top`                 | `object-position: top;`                    | 頂部對齊     |
| `object-top-right`           | `object-position: top right;`              | 右上對齊     |
| `object-left`                | `object-position: left;`                   | 左側對齊     |
| `object-center`              | `object-position: center;`                 | 置中對齊     |
| `object-right`               | `object-position: right;`                  | 右側對齊     |
| `object-bottom-left`         | `object-position: bottom left;`            | 左下對齊     |
| `object-bottom`              | `object-position: bottom;`                 | 底部對齊     |
| `object-bottom-right`        | `object-position: bottom right;`           | 右下對齊     |
| `object-(<custom-property>)` | `object-position: var(<custom-property>);` | 自訂位置值   |
| `object-[<value>]`           | `object-position: <value>;`                | 任意值位置值 |

```html
<!-- object-(<custom-property>) -->
<img class="object-(--my-object)" src="/img/mountains.jpg" />
<!-- 等價 object-[var(<custom-property>)] -->

<!-- object-[<value>] -->
<img class="object-[25%_75%]" src="/img/mountains.jpg" />
```

{% note info %}
**小技巧：**
- `object-cover` 最常用於卡片設計，確保圖片填滿容器且不變形
- `object-contain` 適合需要完整顯示內容的場景，如產品圖片
- 響應式設計中，可以根據螢幕尺寸切換不同的 object-fit 值
- 搭配 `aspect-ratio` 可以創建更精確的圖片容器
- 影片內容也適用於 object-fit，特別適合創建影片預覽縮圖
{% endnote %}

## overflow
用於控制元素的溢出行為，決定當內容超出元素尺寸時的顯示方式。這個屬性對於精確控制元素尺寸和佈局非常重要。

控制元素的溢出行為：

| 類別名稱             | CSS 屬性               | 說明                   |
| -------------------- | ---------------------- | ---------------------- |
| `overflow-auto`      | `overflow: auto;`      | 根據內容自動調整滾動條 |
| `overflow-hidden`    | `overflow: hidden;`    | 隱藏溢出部分           |
| `overflow-clip`      | `overflow: clip;`      | 裁剪溢出部分           |
| `overflow-visible`   | `overflow: visible;`   | 顯示所有溢出部分       |
| `overflow-scroll`    | `overflow: scroll;`    | 添加滾動條             |
| `overflow-x-auto`    | `overflow-x: auto;`    | 水平方向自動調整       |
| `overflow-y-auto`    | `overflow-y: auto;`    | 垂直方向自動調整       |
| `overflow-x-hidden`  | `overflow-x: hidden;`  | 隱藏水平溢出           |
| `overflow-y-hidden`  | `overflow-y: hidden;`  | 隱藏垂直溢出           |
| `overflow-x-clip`    | `overflow-x: clip;`    | 裁剪水平溢出           |
| `overflow-y-clip`    | `overflow-y: clip;`    | 裁剪垂直溢出           |
| `overflow-x-visible` | `overflow-x: visible;` | 顯示水平溢出           |
| `overflow-y-visible` | `overflow-y: visible;` | 顯示垂直溢出           |
| `overflow-x-scroll`  | `overflow-x: scroll;`  | 添加水平滾動條         |
| `overflow-y-scroll`  | `overflow-y: scroll;`  | 添加垂直滾動條         |

{% note info %}
**小技巧：**
- `overflow-hidden` 是最常用的隱藏溢出方式，確保元素不受任何溢出影響
- `overflow-visible` 顯示所有溢出部分，但可能破壞佈局
- `overflow-clip` 裁剪溢出部分，但可能會導致內容被截斷
- `overflow-scroll` 添加滾動條，但可能會增加不必要的滾動條
- `overflow-auto` 根據內容自動調整高度，是最常用的解決方案
- 響應式設計中，可以根據螢幕尺寸選擇不同的 overflow 值
{% endnote %}

## overscroll-behavior 
用於控制當使用者滾動超出元素範圍時的行為。這個屬性特別適用於創建平滑的滾動效果，尤其是在移動設備上。

控制滾動超出元素範圍時的行為：

| 類別名稱               | CSS 屬性                          | 說明                 |
| ---------------------- | --------------------------------- | -------------------- |
| `overscroll-auto`      | `overscroll-behavior: auto;`      | 允許預設的滾動行為   |
| `overscroll-contain`   | `overscroll-behavior: contain;`   | 限制滾動行為在元素內 |
| `overscroll-none`      | `overscroll-behavior: none;`      | 禁止所有滾動行為     |
| `overscroll-x-auto`    | `overscroll-behavior-x: auto;`    | 允許水平方向預設滾動 |
| `overscroll-x-contain` | `overscroll-behavior-x: contain;` | 限制水平方向滾動     |
| `overscroll-x-none`    | `overscroll-behavior-x: none;`    | 禁止水平方向滾動     |
| `overscroll-y-auto`    | `overscroll-behavior-y: auto;`    | 允許垂直方向預設滾動 |
| `overscroll-y-contain` | `overscroll-behavior-y: contain;` | 限制垂直方向滾動     |
| `overscroll-y-none`    | `overscroll-behavior-y: none;`    | 禁止垂直方向滾動     |

## position
用於控制元素的定位方式，決定元素在文檔流中的位置和行為。這個屬性對於創建複雜佈局、模態框、工具提示等非常重要。

| 類別名稱   | CSS 屬性              | 說明               |
| ---------- | --------------------- | ------------------ |
| `static`   | `position: static;`   | 靜態定位（預設值） |
| `relative` | `position: relative;` | 相對定位           |
| `absolute` | `position: absolute;` | 絕對定位           |
| `fixed`    | `position: fixed;`    | 固定定位           |
| `sticky`   | `position: sticky;`   | 黏性定位           |

{% note info %}
**小技巧：**
- `relative` 常用於創建定位上下文，讓子元素的 `absolute` 定位相對於它
- `absolute` 會脫離文檔流，需要父元素有 `relative` 定位
- `fixed` 相對於視窗定位，適合導航欄、側邊欄等固定元素
- `sticky` 結合了 `relative` 和 `fixed` 的特性，適合側邊欄和導航
- 響應式設計中，可以根據螢幕尺寸改變定位方式
{% endnote %}

## top / right / bottom / left
用於控制定位元素的具體位置，通常與 position 配合使用。這些屬性對於精確控制元素位置非常重要。

| 類別名稱                      | CSS 屬性                                                | 說明                          |
| ----------------------------- | ------------------------------------------------------- | ----------------------------- |
| `inset-<number>`              | `inset: calc(var(--spacing) * <number>);`               | 設定所有邊距                  |
| `-inset-<number>`             | `inset: calc(var(--spacing) * -<number>);`              | 設定負數所有邊距              |
| `inset-<fraction>`            | `inset: calc(<fraction> * 100%);`                       | 設定百分比所有邊距            |
| `-inset-<fraction>`           | `inset: calc(<fraction> * -100%);`                      | 設定負數百分比邊距            |
| `inset-px`                    | `inset: 1px;`                                           | 設定 1px 所有邊距             |
| `-inset-px`                   | `inset: -1px;`                                          | 設定 -1px 所有邊距            |
| `inset-full`                  | `inset: 100%;`                                          | 設定 100% 所有邊距            |
| `-inset-full`                 | `inset: -100%;`                                         | 設定 -100% 所有邊距           |
| `inset-auto`                  | `inset: auto;`                                          | 自動所有邊距                  |
| `inset-(<custom-property>)`   | `inset: var(<custom-property>);`                        | 使用自訂 CSS 變數設定邊距     |
| `inset-[<value>]`             | `inset: <value>;`                                       | 使用任意值設定邊距            |
|                               |                                                         |                               |
| `inset-x-<number>`            | `inset-inline: calc(var(--spacing) * <number>);`        | 設定水平邊距                  |
| `-inset-x-<number>`           | `inset-inline: calc(var(--spacing) * -<number>);`       | 設定負數水平邊距              |
| `inset-x-<fraction>`          | `inset-inline: calc(<fraction> * 100%);`                | 設定百分比水平邊距            |
| `-inset-x-<fraction>`         | `inset-inline: calc(<fraction> * -100%);`               | 設定負數百分比水平邊距        |
| `inset-x-px`                  | `inset-inline: 1px;`                                    | 設定 1px 水平邊距             |
| `-inset-x-px`                 | `inset-inline: -1px;`                                   | 設定 -1px 水平邊距            |
| `inset-x-full`                | `inset-inline: 100%;`                                   | 設定 100% 水平邊距            |
| `-inset-x-full`               | `inset-inline: -100%;`                                  | 設定 -100% 水平邊距           |
| `inset-x-auto`                | `inset-inline: auto;`                                   | 自動水平邊距                  |
| `inset-x-(<custom-property>)` | `inset-inline: var(<custom-property>);`                 | 使用自訂 CSS 變數設定水平邊距 |
| `inset-x-[<value>]`           | `inset-inline: <value>;`                                | 使用任意值設定水平邊距        |
|                               |                                                         |                               |
| `inset-y-<number>`            | `inset-block: calc(var(--spacing) * <number>);`         | 設定垂直邊距                  |
| `-inset-y-<number>`           | `inset-block: calc(var(--spacing) * -<number>);`        | 設定負數垂直邊距              |
| `inset-y-<fraction>`          | `inset-block: calc(<fraction> * 100%);`                 | 設定百分比垂直邊距            |
| `-inset-y-<fraction>`         | `inset-block: calc(<fraction> * -100%);`                | 設定負數百分比垂直邊距        |
| `inset-y-px`                  | `inset-block: 1px;`                                     | 設定 1px 垂直邊距             |
| `-inset-y-px`                 | `inset-block: -1px;`                                    | 設定 -1px 垂直邊距            |
| `inset-y-full`                | `inset-block: 100%;`                                    | 設定 100% 垂直邊距            |
| `-inset-y-full`               | `inset-block: -100%;`                                   | 設定 -100% 垂直邊距           |
| `inset-y-auto`                | `inset-block: auto;`                                    | 自動垂直邊距                  |
| `inset-y-(<custom-property>)` | `inset-block: var(<custom-property>);`                  | 使用自訂 CSS 變數設定垂直邊距 |
| `inset-y-[<value>]`           | `inset-block: <value>;`                                 | 使用任意值設定垂直邊距        |
|                               |                                                         |                               |
| `start-<number>`              | `inset-inline-start: calc(var(--spacing) * <number>);`  | 設定起始邊距                  |
| `-start-<number>`             | `inset-inline-start: calc(var(--spacing) * -<number>);` | 設定負數起始邊距              |
| `start-<fraction>`            | `inset-inline-start: calc(<fraction> * 100%);`          | 設定百分比起始邊距            |
| `-start-<fraction>`           | `inset-inline-start: calc(<fraction> * -100%);`         | 設定負數百分比起始邊距        |
| `start-px`                    | `inset-inline-start: 1px;`                              | 設定 1px 起始邊距             |
| `-start-px`                   | `inset-inline-start: -1px;`                             | 設定 -1px 起始邊距            |
| `start-full`                  | `inset-inline-start: 100%;`                             | 設定 100% 起始邊距            |
| `-start-full`                 | `inset-inline-start: -100%;`                            | 設定 -100% 起始邊距           |
| `start-auto`                  | `inset-inline-start: auto;`                             | 自動起始邊距                  |
| `start-(<custom-property>)`   | `inset-inline-start: var(<custom-property>);`           | 使用自訂 CSS 變數設定起始邊距 |
| `start-[<value>]`             | `inset-inline-start: <value>;`                          | 使用任意值設定起始邊距        |
|                               |                                                         |                               |
| `end-<number>`                | `inset-inline-end: calc(var(--spacing) * <number>);`    | 設定結束邊距                  |
| `-end-<number>`               | `inset-inline-end: calc(var(--spacing) * -<number>);`   | 設定負數結束邊距              |
| `end-<fraction>`              | `inset-inline-end: calc(<fraction> * 100%);`            | 設定百分比結束邊距            |
| `-end-<fraction>`             | `inset-inline-end: calc(<fraction> * -100%);`           | 設定負數百分比結束邊距        |
| `end-px`                      | `inset-inline-end: 1px;`                                | 設定 1px 結束邊距             |
| `-end-px`                     | `inset-inline-end: -1px;`                               | 設定 -1px 結束邊距            |
| `end-full`                    | `inset-inline-end: 100%;`                               | 設定 100% 結束邊距            |
| `-end-full`                   | `inset-inline-end: -100%;`                              | 設定 -100% 結束邊距           |
| `end-auto`                    | `inset-inline-end: auto;`                               | 自動結束邊距                  |
| `end-(<custom-property>)`     | `inset-inline-end: var(<custom-property>);`             | 使用自訂 CSS 變數設定結束邊距 |
| `end-[<value>]`               | `inset-inline-end: <value>;`                            | 使用任意值設定結束邊距        |
|                               |                                                         |                               |
| `top-<number>`                | `top: calc(var(--spacing) * <number>);`                 | 設定頂部邊距                  |
| `-top-<number>`               | `top: calc(var(--spacing) * -<number>);`                | 設定負數頂部邊距              |
| `top-<fraction>`              | `top: calc(<fraction> * 100%);`                         | 設定百分比頂部邊距            |
| `-top-<fraction>`             | `top: calc(<fraction> * -100%);`                        | 設定負數百分比頂部邊距        |
| `top-px`                      | `top: 1px;`                                             | 設定 1px 頂部邊距             |
| `-top-px`                     | `top: -1px;`                                            | 設定 -1px 頂部邊距            |
| `top-full`                    | `top: 100%;`                                            | 設定 100% 頂部邊距            |
| `-top-full`                   | `top: -100%;`                                           | 設定 -100% 頂部邊距           |
| `top-auto`                    | `top: auto;`                                            | 自動頂部邊距                  |
| `top-(<custom-property>)`     | `top: var(<custom-property>);`                          | 使用自訂 CSS 變數設定頂部邊距 |
| `top-[<value>]`               | `top: <value>;`                                         | 使用任意值設定頂部邊距        |
|                               |                                                         |                               |
| `right-<number>`              | `right: calc(var(--spacing) * <number>);`               | 設定右側邊距                  |
| `-right-<number>`             | `right: calc(var(--spacing) * -<number>);`              | 設定負數右側邊距              |
| `right-<fraction>`            | `right: calc(<fraction> * 100%);`                       | 設定百分比右側邊距            |
| `-right-<fraction>`           | `right: calc(<fraction> * -100%);`                      | 設定負數百分比右側邊距        |
| `right-px`                    | `right: 1px;`                                           | 設定 1px 右側邊距             |
| `-right-px`                   | `right: -1px;`                                          | 設定 -1px 右側邊距            |
| `right-full`                  | `right: 100%;`                                          | 設定 100% 右側邊距            |
| `-right-full`                 | `right: -100%;`                                         | 設定 -100% 右側邊距           |
| `right-auto`                  | `right: auto;`                                          | 自動右側邊距                  |
| `right-(<custom-property>)`   | `right: var(<custom-property>);`                        | 使用自訂 CSS 變數設定右側邊距 |
| `right-[<value>]`             | `right: <value>;`                                       | 使用任意值設定右側邊距        |
|                               |                                                         |                               |
| `bottom-<number>`             | `bottom: calc(var(--spacing) * <number>);`              | 設定底部邊距                  |
| `-bottom-<number>`            | `bottom: calc(var(--spacing) * -<number>);`             | 設定負數底部邊距              |
| `bottom-<fraction>`           | `bottom: calc(<fraction> * 100%);`                      | 設定百分比底部邊距            |
| `-bottom-<fraction>`          | `bottom: calc(<fraction> * -100%);`                     | 設定負數百分比底部邊距        |
| `bottom-px`                   | `bottom: 1px;`                                          | 設定 1px 底部邊距             |
| `-bottom-px`                  | `bottom: -1px;`                                         | 設定 -1px 底部邊距            |
| `bottom-full`                 | `bottom: 100%;`                                         | 設定 100% 底部邊距            |
| `-bottom-full`                | `bottom: -100%;`                                        | 設定 -100% 底部邊距           |
| `bottom-auto`                 | `bottom: auto;`                                         | 自動底部邊距                  |
| `bottom-(<custom-property>)`  | `bottom: var(<custom-property>);`                       | 使用自訂 CSS 變數設定底部邊距 |
| `bottom-[<value>]`            | `bottom: <value>;`                                      | 使用任意值設定底部邊距        |
|                               |                                                         |                               |
| `left-<number>`               | `left: calc(var(--spacing) * <number>);`                | 設定左側邊距                  |
| `-left-<number>`              | `left: calc(var(--spacing) * -<number>);`               | 設定負數左側邊距              |
| `left-<fraction>`             | `left: calc(<fraction> * 100%);`                        | 設定百分比左側邊距            |
| `-left-<fraction>`            | `left: calc(<fraction> * -100%);`                       | 設定負數百分比左側邊距        |
| `left-px`                     | `left: 1px;`                                            | 設定 1px 左側邊距             |
| `-left-px`                    | `left: -1px;`                                           | 設定 -1px 左側邊距            |
| `left-full`                   | `left: 100%;`                                           | 設定 100% 左側邊距            |
| `-left-full`                  | `left: -100%;`                                          | 設定 -100% 左側邊距           |
| `left-auto`                   | `left: auto;`                                           | 自動左側邊距                  |
| `left-(<custom-property>)`    | `left: var(<custom-property>);`                         | 使用自訂 CSS 變數設定左側邊距 |
| `left-[<value>]`              | `left: <value>;`                                        | 使用任意值設定左側邊距        |
|                               |                                                         |                               |

```html
<!-- inset-[<value>] -->
<div class="inset-[3px]">...</div>

<!-- inset-(<custom-property>) -->
<div class="inset-(--my-position)">...</div>

<!-- inset-<fraction> -->
<div class="inset-1/2">...</div>
```

{% note info %}
**小技巧：**
- `inset-0` 是 `top: 0; right: 0; bottom: 0; left: 0;` 的簡寫，常用於覆蓋整個容器
- `inset-x-0` 和 `inset-y-0` 分別控制水平和垂直方向的填滿
- 使用 `top-1/2` 和 `transform -translate-y-1/2` 可以實現垂直置中
- 響應式設計中，可以根據螢幕尺寸調整元素位置
- 這些屬性需要配合 `position` 屬性使用才能生效
{% endnote %}

## 自訂
`*-<number>` 這些工具類別都是由 `--spacing` 主題變數驅動的，您可以在自己的主題中自訂這個變數：

```css
@theme {
  --spacing: 8px;
}
```

如此一來，級距單位會是以 8px 為標準，這樣 `top-1` 就會等於 `top: 8px`，`top-2` 就會等於 `top: 16px`，適合需要更大間距的佈局。

{% note info %}
**小技巧：**
- 預設的 `--spacing` 值通常是 `0.25rem`（4px）
- 您可以根據設計需求調整 `--spacing` 的值
- 較小的值（如 `1px`）適合精確定位，較大的值適合一般佈局
- 這個變數會影響所有使用數字的位置工具類別
- 在設計系統中，建議選擇一個基礎間距值，然後所有間距都是這個值的倍數
{% endnote %}

## visibility
用於控制元素的可見性，決定元素是否在頁面中顯示。與 `display: none` 不同，`visibility: hidden` 的元素仍會佔用空間，只是不可見。

| 類別名稱    | CSS 屬性                | 說明                         |
| ----------- | ----------------------- | ---------------------------- |
| `visible`   | `visibility: visible;`  | 可見（預設值）               |
| `invisible` | `visibility: hidden;`   | 不可見但佔用空間             |
| `collapse`  | `visibility: collapse;` | 摺疊（僅適用表格 tr 不可見） |

{% note info %}
**小技巧：**
- `invisible` 元素仍會佔用空間，適合需要保持佈局的場景
- `hidden` 元素完全不佔用空間，適合完全移除元素
- `collapse` 僅適用於表格行、列和行群組，會摺疊但保持表格結構
- 響應式設計中，可以根據螢幕尺寸控制元素的可見性
- 配合 `group` 和 `group-hover:` 可以創建互動式可見性效果
{% endnote %}

## z-index
用於控制元素的堆疊順序，決定元素在 z 軸（垂直於螢幕）上的層級關係。這個屬性對於創建模態框、下拉選單、工具提示等需要控制層級的元素非常重要。

控制元素的堆疊順序：

| 類別名稱                | CSS 屬性                           | 說明                  |
| ----------------------- | ---------------------------------- | --------------------- |
| `z-<number>`            | `z-index: <number>;`               | 設定指定的層級數值    |
| `z-auto`                | `z-index: auto;`                   | 自動層級              |
| `z-[<value>]`           | `z-index: <value>;`                | 自訂層級值            |
| `z-(<custom-property>)` | `z-index: var(<custom-property>);` | 使用 CSS 變數設定層級 |

```html
<!-- z-[<value>] -->
<div class="z-[calc(var(--index)+1)]">...</div>

<!-- z-(<custom-property>) -->
<div class="z-(--my-z)">...</div>
```

{% note info %}
**小技巧：**
- `z-index` 只在定位元素（`position: relative/absolute/fixed/sticky`）上生效
- 使用 `isolate` 可以創建新的堆疊上下文，讓子元素的 z-index 相對於父元素計算
- 建議使用 10 的倍數來設定 z-index，便於管理和調整
- 模態框通常使用 z-50，下拉選單使用 z-20，工具提示使用 z-30
- 響應式設計中，可以根據螢幕尺寸調整元素的層級
{% endnote %}

# Flex & Grid
Flex 和 Grid 是現代網頁佈局的兩大主力，提供了強大且靈活的佈局能力。Flex 適合一維佈局（單行或單列），而 Grid 則適合二維佈局（行列組合）。以下將詳細介紹這兩種佈局系統的相關類別。

## flex-basis
用於設定 flex 項目的初始主軸尺寸，決定 flex 項目在分配剩餘空間之前的基準尺寸。此屬性常與 `flex-grow`、`flex-shrink` 一起協作，實作彈性且可預測的版面。

| 類別名稱                    | CSS 屬性                                       | 說明                                              |
| --------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| `basis-<number>`            | `flex-basis: calc(var(--spacing) * <number>);` | 使用間距變數計算基準尺寸                          |
| `basis-<fraction>`          | `flex-basis: calc(<fraction> * 100%);`         | 使用分數計算基準尺寸的百分比                      |
| `basis-full`                | `flex-basis: 100%;`                            | 基準尺寸為容器的全寬                              |
| `basis-auto`                | `flex-basis: auto;`                            | 自動根據內容或寬高設定基準尺寸（預設值）          |
| `basis-3xs`                 | `flex-basis: var(--container-3xs);`            | 基準尺寸為 16rem (256px)                          |
| `basis-2xs`                 | `flex-basis: var(--container-2xs);`            | 基準尺寸為 18rem (288px)                          |
| `basis-xs`                  | `flex-basis: var(--container-xs);`             | 基準尺寸為 20rem (320px)                          |
| `basis-sm`                  | `flex-basis: var(--container-sm);`             | 基準尺寸為 24rem (384px)                          |
| `basis-md`                  | `flex-basis: var(--container-md);`             | 基準尺寸為 28rem (448px)                          |
| `basis-lg`                  | `flex-basis: var(--container-lg);`             | 基準尺寸為 32rem (512px)                          |
| `basis-xl`                  | `flex-basis: var(--container-xl);`             | 基準尺寸為 36rem (576px)                          |
| `basis-2xl`                 | `flex-basis: var(--container-2xl);`            | 基準尺寸為 42rem (672px)                          |
| `basis-3xl`                 | `flex-basis: var(--container-3xl);`            | 基準尺寸為 48rem (768px)                          |
| `basis-4xl`                 | `flex-basis: var(--container-4xl);`            | 基準尺寸為 56rem (896px)                          |
| `basis-5xl`                 | `flex-basis: var(--container-5xl);`            | 基準尺寸為 64rem (1024px)                         |
| `basis-6xl`                 | `flex-basis: var(--container-6xl);`            | 基準尺寸為 72rem (1152px)                         |
| `basis-7xl`                 | `flex-basis: var(--container-7xl);`            | 基準尺寸為 80rem (1280px)                         |
| `basis-(<custom-property>)` | `flex-basis: var(<custom-property>);`          | 使用 CSS 自訂屬性（變數）設定基準尺寸             |
| `basis-[<value>]`           | `flex-basis: <value>;`                         | 自訂基準尺寸，可使用任何有效的 CSS 長度值或計算式 |

```html
<div class="flex flex-row">
  <!-- basis-<fraction> -->
  <div class="basis-1/3">01</div>

  <!-- basis-[<value>] -->
  <div class="basis-[30vw]">02</div>

  <!-- basis-(<custom-property>) -->
  <div class="basis-(--my-basis)">03</div>
</div>
```

{% note info %}
**小技巧：**
- **間距尺度對齊**：`basis-{spacing}` 與 Tailwind 的 spacing 尺度一致，便於與 `p-*`、`m-*`、`w-*` 等公用類別協同。
- **配合成長/收縮**：`basis-0` 常與 `grow`/`shrink` 一起使用，讓剩餘空間由 `grow` 分配。
- **分數網格**：`basis-1/2`、`1/3`、`2/3`、`1/4`… 能快速建立等分區塊。
- **動態佈局**：善用任意值與 CSS 變數（`basis-[...]`、`basis-(--*)`）表達計算式與情境化尺寸。
{% endnote %}

### 自訂
使用 `--container-*` 主題變數來自訂固定寬度的 `basis-*` 通用工具

```css
@theme {
  --container-4xs: 14rem; 
}
```

新增一個更小的容器尺寸後，即可直接以 `basis-4xs` 在標記中使用。

```html
<div class="basis-4xs"></div>
```

此外，`basis-<number>` 系列是由 `--spacing` 主題變數驅動；可依專案需求調整間距尺度（例如將單位改為 1px 級距）：

```css
@theme {
  --spacing: 8px; 
}
```

這樣一來，`basis-2` 會等於 `flex-basis: 16px;`，便於與專案既有的尺寸系統對齊。

## flex-direction
用於設定 flex 容器的主軸方向，決定 flex 項目的排列方式。這個屬性對於創建水平、垂直或反向佈局非常重要。

| 類別名稱           | CSS 屬性                          | 說明               |
| ------------------ | --------------------------------- | ------------------ |
| `flex-row`         | `flex-direction: row;`            | 水平排列（預設值） |
| `flex-row-reverse` | `flex-direction: row-reverse;`    | 水平反向排列       |
| `flex-col`         | `flex-direction: column;`         | 垂直排列           |
| `flex-col-reverse` | `flex-direction: column-reverse;` | 垂直反向排列       |

{% note info %}
**小技巧：**
- `flex-row` 適合水平佈局，如導航選單、工具列
- `flex-col` 適合垂直佈局，如側邊欄、卡片列表
- 響應式設計中，可以根據螢幕尺寸切換排列方向
- `flex-row-reverse` 和 `flex-col-reverse` 適合創建反向佈局
- 搭配 `justify-content` 和 `align-items` 可以精確控制對齊方式
{% endnote %}

## flex-wrap
用於控制 flex 項目是否換行，當容器空間不足時決定項目的排列行為。這個屬性對於創建響應式佈局和避免項目溢出非常重要。

| 類別名稱            | CSS 屬性                   | 說明             |
| ------------------- | -------------------------- | ---------------- |
| `flex-wrap`         | `flex-wrap: wrap;`         | 允許換行         |
| `flex-nowrap`       | `flex-wrap: nowrap;`       | 不換行（預設值） |
| `flex-wrap-reverse` | `flex-wrap: wrap-reverse;` | 反向換行         |

{% note info %}
**小技巧：**
- `flex-wrap` 適合響應式佈局，讓項目在小螢幕上自動換行
- `flex-nowrap` 適合需要保持項目在一行的場景
- 響應式設計中，可以根據螢幕尺寸切換換行行為
- 搭配 `gap` 可以控制換行後的項目間距
- `flex-wrap-reverse` 適合創建反向的換行佈局
{% endnote %}

## flex
用於設定 flex 項目的伸縮行為，這是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的簡寫屬性。這個屬性對於快速設定 flex 項目的伸縮特性非常有用。

| 類別名稱                   | CSS 屬性                         | 說明               |
| -------------------------- | -------------------------------- | ------------------ |
| `flex-<number>`            | `flex: <number>;`                | 設定固定數值       |
| `flex-<fraction>`          | `flex: calc(<fraction> * 100%);` | 設定百分比         |
| `flex-auto`                | `flex: auto;`                    | 自動伸縮           |
| `flex-initial`             | `flex: 0 auto;`                  | 初始伸縮（預設值） |
| `flex-none`                | `flex: none;`                    | 不伸縮             |
| `flex-(<custom-property>)` | `flex: var(<custom-property>);`  | 使用 CSS 變數      |
| `flex-[<value>]`           | `flex: <value>;`                 | 任意值             |

{% note info %}
**CSS `flex` 簡寫如何解讀？**
- 一個「無單位數字」：視為 `flex-grow`。`flex: 2` 等價 `flex: 2 1 0%`。
- 一個「長度/百分比/關鍵字」：視為 `flex-basis`。例如 `flex: 200px`、`flex: 30%`、`flex: auto` 皆等價「簡寫展開」為 `flex: 1 1 <basis>`。
- 兩個值：
  - `<number> <number>` → `flex-grow`、`flex-shrink`，`flex-basis` 預設 `0%`。例：`flex: 2 0` → `2 0 0%`。
  - `<number> <length|percentage>` → `flex-grow`、`flex-basis`，`flex-shrink` 預設 `1`。例：`flex: 1 200px` → `1 1 200px`。
- 三個值：`<number> <number> <length|percentage|auto>` → 依序對應 grow/shrink/basis。
{% endnote %}

```html
<div class="flex flex-row">
  <!-- basis-<number> -->
  <!-- flex: 2 1 0% -->
  <div class="flex-2">01</div>

  <!-- flex-[<value>] -->
  <!-- flex: 3 1 auto -->
  <div class="flex-[3_1_auto]">02</div>

  <!-- flex-(<custom-property>) -->
  <div class="flex-(--my-flex)">03</div>
</div>
```

{% note info %}
**小技巧：**
- `flex-1` 最常用於創建等分佈局
- `flex-auto` 適合需要根據內容自動調整的項目
- `flex-none` 適合固定尺寸的項目，如圖示、按鈕
- 響應式設計中，可以根據螢幕尺寸調整 flex 值
- 使用任意值可以創建更精確的空間分配比例
{% endnote %}

## flex-grow
用於控制 flex 項目在主軸上的伸長比例，決定項目如何分配容器中的剩餘空間。這個屬性對於創建靈活的佈局非常重要。

| 類別名稱                   | CSS 屬性                             | 說明          |
| -------------------------- | ------------------------------------ | ------------- |
| `grow`                     | `flex-grow: 1;`                      | 伸長          |
| `grow-<number>`            | `flex-grow: <number>;`               | 設定伸長倍數  |
| `grow-[<value>]`           | `flex-grow: <value>;`                | 任意伸長值    |
| `grow-(<custom-property>)` | `flex-grow: var(<custom-property>);` | 使用 CSS 變數 |

```html
<div class="flex flex-row">
  <!-- grow-<number> -->
  <!-- flex-grow: 2 -->
  <div class="grow-2">01</div>

  <!-- grow-[<value>] -->
  <!-- flex-grow: 25vw -->
  <div class="grow-[25vw]">02</div>

  <!-- grow-(<custom-property>) -->
  <div class="grow-(--my-grow)">03</div>
</div>
```

{% note info %}
**小技巧：**
- `grow-0` 適合固定尺寸的項目，如導航選單、側邊欄
- `grow` 適合需要填滿剩餘空間的項目，如主要內容區域
- 響應式設計中，可以根據螢幕尺寸調整伸長行為
- 搭配 `flex-shrink` 可以創建更精確的伸縮控制
- 使用任意值可以創建更靈活的空間分配比例
{% endnote %}

## flex-shrink
用於控制 flex 項目在主軸上的收縮比例，決定項目在空間不足時如何收縮。這個屬性對於防止項目溢出和創建響應式佈局非常重要。

| 類別名稱                     | CSS 屬性                               | 說明               |
| ---------------------------- | -------------------------------------- | ------------------ |
| `shrink`                     | `flex-shrink: 1;`                      | 允許收縮（預設值） |
| `shrink-<number>`            | `flex-shrink: <number>;`               | 設定收縮倍數       |
| `shrink-[<value>]`           | `flex-shrink: <value>;`                | 自訂收縮值         |
| `shrink-(<custom-property>)` | `flex-shrink: var(<custom-property>);` | 使用 CSS 變數      |

```html
<div class="flex flex-row">
  <!-- shrink-<number> -->
  <!-- flex-shrink: 2 -->
  <div class="shrink-2">01</div>

  <!-- shrink-[<value>] -->
  <!-- flex-shrink: calc(100vw-var(--sidebar)) -->
  <div class="shrink-[calc(100vw-var(--sidebar))]">02</div>

  <!-- shrink-(<custom-property>) -->
  <div class="shrink-(--my-shrink)">03</div>
</div>
```

{% note info %}
**小技巧：**
- `shrink-0` 適合需要保持最小尺寸的項目，如導航選單、側邊欄
- `shrink` 適合可以收縮的項目，如文字內容、按鈕
- 響應式設計中，可以根據螢幕尺寸調整收縮行為
- 搭配 `flex-grow` 可以創建更精確的伸縮控制
- 使用任意值可以創建更靈活的收縮比例
{% endnote %}

## order
用於控制 flex 項目在容器中的顯示順序，可以改變項目的視覺排列而不影響 HTML 結構。這個屬性對於創建響應式佈局和調整項目順序非常有用。

| 類別名稱                    | CSS 屬性                         | 說明              |
| --------------------------- | -------------------------------- | ----------------- |
| `order-<number>`            | `order: <number>;`               | 設定正數順序值    |
| `-order-<number>`           | `order: -<number>;`              | 設定負數順序值    |
| `order-first`               | `order: -9999;`                  | 設定為最前面      |
| `order-last`                | `order: 9999;`                   | 設定為最後面      |
| `order-none`                | `order: 0;`                      | 設定為預設順序    |
| `order-(<custom-property>)` | `order: var(<custom-property>);` | 使用 CSS 變數設定 |
| `order-[<value>]`           | `order: <value>;`                | 使用自訂值設定    |

```html
<div class="flex flex-row">
  <!-- order-<number> -->
  <!-- flex-order: 2 -->
  <div class="order-2">01</div>

  <!-- order-[<value>] -->
  <!-- flex-order: min(var(--total-items),10) -->
  <div class="order-[min(var(--total-items),10)]">02</div>

  <!-- order-(<custom-property>) -->
  <div class="order-(--my-shrink)">03</div>
</div>
```

{% note info %}
**小技巧：**
- `order-first` 和 `order-last` 適合需要調整項目順序的場景
- 響應式設計中，可以根據螢幕尺寸調整項目順序
- 使用任意值可以創建更精確的順序控制
- 注意：order 只影響視覺順序，不影響 HTML 結構和可訪問性
- 搭配 `flex-direction` 可以創建更複雜的排列效果
{% endnote %}

## grid-template-columns
用於定義 CSS Grid 容器的列結構，設定每列的寬度和數量。這個屬性對於創建複雜的網格佈局非常重要。

| 類別名稱                        | CSS 屬性                                                   | 說明          |
| ------------------------------- | ---------------------------------------------------------- | ------------- |
| `grid-cols-<number>`            | `grid-template-columns: repeat(<number>, minmax(0, 1fr));` | 設定網格列數  |
| `grid-cols-none`                | `grid-template-columns: none;`                             | 無列定義      |
| `grid-cols-subgrid`             | `grid-template-columns: subgrid;`                          | 子網格列定義  |
| `grid-cols-[<value>]`           | `grid-template-columns: <value>;`                          | 任意值        |
| `grid-cols-(<custom-property>)` | `grid-template-columns: var(<custom-property>);`           | 使用 CSS 變數 |

```html
<!-- grid-cols-[<value>] -->
<div class="grid-cols-[200px_minmax(900px,_1fr)_100px]"></div>

<!-- grid-cols-(<custom-property>) -->
<div class="grid-cols-(--my-grid-cols)"></div>
```

{% note info %}
**小技巧：**
- `grid-cols-12` 是最常用的網格系統，適合創建複雜的佈局
- 響應式設計中，可以根據螢幕尺寸調整列數
- 使用任意值可以創建更精確的列寬度控制
- 搭配 `grid-column` 可以讓項目跨越多列
- 使用 CSS 變數可以創建動態的網格結構
{% endnote %}

## grid-column
用於控制 Grid 子項目跨越的列範圍或起迄位置。常見於版面等分、卡片跨欄等情境。

| 類別名稱                        | CSS 屬性                                                                  | 說明                           |
| ------------------------------- | ------------------------------------------------------------------------- | ------------------------------ |
| `col-span-<number>`             | `grid-column: span <number> / span <number>;`                             | 跨越指定欄數（正值）           |
| `col-span-full`                 | `grid-column: 1 / -1;`                                                    | 橫跨所有欄                     |
| `col-span-(<custom-property>)`  | `grid-column: span var(<custom-property>) / span var(<custom-property>);` | 以 CSS 變數動態跨欄            |
| `col-span-[<value>]`            | `grid-column: span <value> / span <value>;`                               | 跨越任意自訂欄數               |
| `col-start-<number>`            | `grid-column-start: <number>;`                                            | 指定起始欄線（正值）           |
| `-col-start-<number>`           | `grid-column-start: calc(<number> * -1);`                                 | 指定起始欄線（負值，反向）     |
| `col-start-auto`                | `grid-column-start: auto;`                                                | 自動起點                       |
| `col-start-(<custom-property>)` | `grid-column-start: var(<custom-property>);`                              | 以 CSS 變數指定起點            |
| `col-start-[<value>]`           | `grid-column-start: <value>;`                                             | 任意自訂起始欄線               |
| `col-end-<number>`              | `grid-column-end: <number>;`                                              | 指定結束欄線（正值）           |
| `-col-end-<number>`             | `grid-column-end: calc(<number> * -1);`                                   | 指定結束欄線（負值，反向）     |
| `col-end-auto`                  | `grid-column-end: auto;`                                                  | 自動終點                       |
| `col-end-(<custom-property>)`   | `grid-column-end: var(<custom-property>);`                                | 以 CSS 變數指定終點            |
| `col-end-[<value>]`             | `grid-column-end: <value>;`                                               | 任意自訂結束欄線               |
| `col-auto`                      | `grid-column: auto;`                                                      | 依自動放置演算法               |
| `col-<number>`                  | `grid-column: <number>;`                                                  | 指定完整欄線範圍（正值）       |
| `-col-<number>`                 | `grid-column: calc(<number> * -1);`                                       | 指定完整欄線範圍（負值，反向） |
| `col-(<custom-property>)`       | `grid-column: var(<custom-property>);`                                    | 以 CSS 變數指定完整欄線範圍    |
| `col-[<value>]`                 | `grid-column: <value>;`                                                   | 任意自訂完整欄線範圍           |

```html
<!-- col-[<value>] -->
<div class="col-[16_/_span_16]"></div>

<!-- col-(<custom-property>) -->
<div class="col-(--my-columns)"></div>
```

{% note info %}
**小技巧：**
- `col-span-full` 用於標題、頁尾等需滿版的區塊。
- `col-start-*`/`col-end-*` 搭配 `grid-cols-*` 能精準落位。
- 任意值 `col-[<start>_/ <end>]` 支援如 `col-[2_/5]`、`col-[span_2_/_span_3]`。
{% endnote %}

## grid-template-rows
用於定義 Grid 容器的列結構，設定每列的高度與數量。

| 類別名稱                        | CSS 屬性                                           | 說明          |
| ------------------------------- | -------------------------------------------------- | ------------- |
| `grid-rows-<number>`            | `grid-template-rows: repeat(<n>, minmax(0, 1fr));` | 設定列數      |
| `grid-rows-none`                | `grid-template-rows: none;`                        | 無列定義      |
| `grid-rows-subgrid`             | `grid-template-rows: subgrid;`                     | 子網格列定義  |
| `grid-rows-[<value>]`           | `grid-template-rows: <value>;`                     | 任意值        |
| `grid-rows-(<custom-property>)` | `grid-template-rows: var(<custom-property>);`      | 使用 CSS 變數 |

```html
<!-- grid-rows-[<value>] -->
<div class="grid-rows-[200px_minmax(900px,1fr)_100px]"></div>

<!-- grid-rows-(<custom-property>) -->
<div class="grid-rows-(--my-grid-rows)"></div>
```

{% note info %}
**小技巧：** 使用 `minmax()` 可避免內容溢出；搭配容器高度確保列高生效。
{% endnote %}

## grid-row
用於控制 Grid 子項目跨越的列範圍或起迄位置。

| 類別名稱                        | CSS 屬性                                                               | 說明                           |
| ------------------------------- | ---------------------------------------------------------------------- | ------------------------------ |
| 類別名稱                        | CSS 屬性                                                               | 說明                           |
| ------------------------------- | ------------------------------------------------------                 | ----------------------------   |
| `row-span-<number>`             | `grid-row: span <number> / span <number>;`                             | 跨越指定列數                   |
| `row-span-full`                 | `grid-row: 1 / -1;`                                                    | 跨越所有列                     |
| `row-span-(<custom-property>)`  | `grid-row: span var(<custom-property>) / span var(<custom-property>);` | 以 CSS 變數跨越列數            |
| `row-span-[<value>]`            | `grid-row: span <value> / span <value>;`                               | 任意值跨越列數                 |
| `row-start-<number>`            | `grid-row-start: <number>;`                                            | 指定起始列線                   |
| `-row-start-<number>`           | `grid-row-start: calc(<number> * -1);`                                 | 指定負值起始列線（反向）       |
| `row-start-auto`                | `grid-row-start: auto;`                                                | 自動起始列線                   |
| `row-start-(<custom-property>)` | `grid-row-start: var(<custom-property>);`                              | 以 CSS 變數指定起始列線        |
| `row-start-[<value>]`           | `grid-row-start: <value>;`                                             | 任意值起始列線                 |
| `row-end-<number>`              | `grid-row-end: <number>;`                                              | 指定結束列線                   |
| `-row-end-<number>`             | `grid-row-end: calc(<number> * -1);`                                   | 指定負值結束列線（反向）       |
| `row-end-auto`                  | `grid-row-end: auto;`                                                  | 自動結束列線                   |
| `row-end-(<custom-property>)`   | `grid-row-end: var(<custom-property>);`                                | 以 CSS 變數指定結束列線        |
| `row-end-[<value>]`             | `grid-row-end: <value>;`                                               | 任意值結束列線                 |
| `row-auto`                      | `grid-row: auto;`                                                      | 依自動放置演算法               |
| `row-<number>`                  | `grid-row: <number>;`                                                  | 指定完整列線範圍（正值）       |
| `-row-<number>`                 | `grid-row: calc(<number> * -1);`                                       | 指定完整列線範圍（負值，反向） |
| `row-(<custom-property>)`       | `grid-row: var(<custom-property>);`                                    | 以 CSS 變數指定完整列線範圍    |
| `row-[<value>]`                 | `grid-row: <value>;`                                                   | 任意自訂完整列線範圍           |

```html
<div class="grid grid-flow-col grid-rows-3 gap-4">
  <!-- row-start-<number > -->
  <div class="row-span-2 row-start-2">01</div>
  <!-- row-end-<number> -->
  <div class="row-span-2 row-end-3">02</div>
  <!-- row-[<value>] -->
  <div class="row-[span_16_/_span_16]">03</div>
  <!-- row-(<custom-property>) -->
  <div class="row-(--my-rows)">04</div>
</div>
```

{% note info %}
**小技巧：** 列/欄的跨距經常搭配使用；以 `row-span-*` 垂直延伸卡片高度相當實用。
{% endnote %}

## grid-auto-flow
控制自動放置演算法的方向與是否壓縮空洞（dense）。

| 類別名稱              | CSS 屬性                        | 說明                     |
| --------------------- | ------------------------------- | ------------------------ |
| `grid-flow-row`       | `grid-auto-flow: row;`          | 依列方向自動放置（預設） |
| `grid-flow-col`       | `grid-auto-flow: column;`       | 依欄方向自動放置         |
| `grid-flow-dense`     | `grid-auto-flow: dense;`        | 嘗試回填空洞             |
| `grid-flow-row-dense` | `grid-auto-flow: row dense;`    | 列方向且回填空洞         |
| `grid-flow-col-dense` | `grid-auto-flow: column dense;` | 欄方向且回填空洞         |

{% note info %}
**小技巧：** `dense` 可能改變來源順序的視覺位置，注意無障礙與 tabindex。
{% endnote %}

## grid-auto-columns
定義自動產生欄的尺寸，當項目落在未明確定義的欄時使用。

| 類別名稱                        | CSS 屬性                                     | 說明               |
| ------------------------------- | -------------------------------------------- | ------------------ |
| `auto-cols-auto`                | `grid-auto-columns: auto;`                   | 依內容尺寸（預設） |
| `auto-cols-min`                 | `grid-auto-columns: min-content;`            | 以最小內容寬       |
| `auto-cols-max`                 | `grid-auto-columns: max-content;`            | 以最大內容寬       |
| `auto-cols-fr`                  | `grid-auto-columns: minmax(0, 1fr);`         | 以 fr 份額         |
| `auto-cols-(<custom-property>)` | `grid-auto-columns: var(<custom-property>);` | CSS 變數           |
| `auto-cols-[<value>]`           | `grid-auto-columns: <value>;`                | 任意值             |

```html
<!-- auto-cols-[<value>] -->
<div class="auto-cols-[minmax(0,2fr)]">
  <!-- child -->
</div>

<!-- auto-cols-(<custom-property>) -->
<div class="auto-cols-(--my-auto-cols)"></div>
```

## grid-auto-rows
定義自動產生列的高度，當項目落在未明確定義的列時使用。

| 類別名稱                        | CSS 屬性                                  | 說明               |
| ------------------------------- | ----------------------------------------- | ------------------ |
| `auto-rows-auto`                | `grid-auto-rows: auto;`                   | 依內容高度（預設） |
| `auto-rows-min`                 | `grid-auto-rows: min-content;`            | 最小內容高         |
| `auto-rows-max`                 | `grid-auto-rows: max-content;`            | 最大內容高         |
| `auto-rows-fr`                  | `grid-auto-rows: minmax(0, 1fr);`         | fr 份額高          |
| `auto-rows-(<custom-property>)` | `grid-auto-rows: var(<custom-property>);` | CSS 變數           |
| `auto-rows-[<value>]`           | `grid-auto-rows: <value>;`                | 任意值             |

```html
<!-- auto-rows-[<value>] -->
<div class="auto-rows-[minmax(0,2fr)]">
  <!-- child -->
</div>

<!-- auto-rows-(<custom-property>) -->
<div class="auto-rows-(--my-auto-rows)"></div>
```

## gap
控制 Grid/Flex 之間距（row-gap / column-gap）。

| 類別名稱                    | CSS 屬性                                      | 說明           |
| --------------------------- | --------------------------------------------- | -------------- |
| `gap-<number>`              | `gap: calc(var(--spacing) * <value>);`        | 同步列與欄間距 |
| `gap-(<custom-property>)`   | `gap: var(<custom-property>);`                | CSS 變數       |
| `gap-[<value>]`             | `gap: <value>;`                               | 任意值         |
| `gap-x-<number>`            | `column-gap: calc(var(--spacing) * <value>);` | 僅水平方向     |
| `gap-x-(<custom-property>)` | `column-gap: var(<custom-property>);`         | CSS 變數       |
| `gap-x-[<value>]`           | `column-gap: <value>;`                        | 任意值         |
| `gap-y-<number>`            | `row-gap: calc(var(--spacing) * <value>);`    | 僅垂直方向     |
| `gap-y-(<custom-property>)` | `row-gap: var(<custom-property>);`            | CSS 變數       |
| `gap-y-[<value>]`           | `row-gap: <value>;`                           | 任意值         |

```html
<!-- gap-[<value>] -->
<div class="gap-[10vw]">
  <!-- child -->
</div>

<!-- gap-(<custom-property>) -->
<div class="gap-(--my-gap)">
  <!-- child -->
</div>
```

{% note info %}
**小技巧：** 統一使用 spacing 尺度可維持設計一致；需要像素精度時用任意值。
{% endnote %}

## justify-content
控制主軸（inline 方向）上項目群組的對齊（適用 Flex/Grid 容器）。

| 類別名稱              | CSS 屬性                          | 說明                   |
| --------------------- | --------------------------------- | ---------------------- |
| `justify-start`       | `justify-content: flex-start;`    | 靠主軸起始（左對齊）   |
| `justify-end`         | `justify-content: flex-end;`      | 靠主軸結束（右對齊）   |
| `justify-end-safe`    | `justify-content: safe flex-end;` | 安全靠結束（避免溢出） |
| `justify-center`      | `justify-content: center;`        | 置中                   |
| `justify-center-safe` | `justify-content: safe center;`   | 安全置中（避免溢出）   |
| `justify-between`     | `justify-content: space-between;` | 首尾貼齊、均分間距     |
| `justify-around`      | `justify-content: space-around;`  | 項目前後等距           |
| `justify-evenly`      | `justify-content: space-evenly;`  | 所有間距等分           |
| `justify-stretch`     | `justify-content: stretch;`       | 拉伸填滿               |
| `justify-baseline`    | `justify-content: baseline;`      | 以基線對齊             |
| `justify-normal`      | `justify-content: normal;`        | 預設瀏覽器行為         |

## justify-items
控制 Grid 子項目在 inline 方向上的對齊（套用於 Grid 容器）。

| 類別名稱                    | CSS 屬性                      | 說明           |
| --------------------------- | ----------------------------- | -------------- |
| `justify-items-start`       | `justify-items: start;`       | 靠起始         |
| `justify-items-end`         | `justify-items: end;`         | 靠結束         |
| `justify-items-end-safe`    | `justify-items: safe end;`    | 安全靠結束     |
| `justify-items-center`      | `justify-items: center;`      | 置中           |
| `justify-items-center-safe` | `justify-items: safe center;` | 安全置中       |
| `justify-items-stretch`     | `justify-items: stretch;`     | 拉伸           |
| `justify-items-normal`      | `justify-items: normal;`      | 預設瀏覽器行為 |

## justify-self
控制單一 Grid 子項目在 inline 方向上的對齊。

| 類別名稱                   | CSS 屬性                     | 說明     |
| -------------------------- | ---------------------------- | -------- |
| `justify-self-auto`        | `justify-self: auto;`        | 依容器   |
| `justify-self-start`       | `justify-self: start;`       | 起始     |
| `justify-self-center`      | `justify-self: center;`      | 置中     |
| `justify-self-center-safe` | `justify-self: safe center;` | 安全置中 |
| `justify-self-end`         | `justify-self: end;`         | 結束     |
| `justify-self-end-safe`    | `justify-self: safe end;`    | 安全結束 |
| `justify-self-stretch`     | `justify-self: stretch;`     | 拉伸     |

## align-content
控制交叉軸（block 方向）上項目群組的對齊（多列/多行時有效）。

| 類別名稱           | CSS 屬性                        | 說明           |
| ------------------ | ------------------------------- | -------------- |
| `content-normal`   | `align-content: normal;`        | 預設瀏覽器行為 |
| `content-center`   | `align-content: center;`        | 置中           |
| `content-start`    | `align-content: flex-start;`    | 靠起始         |
| `content-end`      | `align-content: flex-end;`      | 靠結束         |
| `content-between`  | `align-content: space-between;` | 首尾貼齊、均分 |
| `content-around`   | `align-content: space-around;`  | 項目前後等距   |
| `content-evenly`   | `align-content: space-evenly;`  | 所有間距等分   |
| `content-baseline` | `align-content: baseline;`      | 以基線對齊     |
| `content-stretch`  | `align-content: stretch;`       | 拉伸           |

## align-items
控制容器內各項目在交叉軸（block 方向）上的對齊（適用 Flex/Grid）。

| 類別名稱              | CSS 屬性                      | 說明         |
| --------------------- | ----------------------------- | ------------ |
| `items-start`         | `align-items: flex-start;`    | 起始         |
| `items-end`           | `align-items: flex-end;`      | 結束         |
| `items-end-safe`      | `align-items: safe flex-end;` | 安全結束     |
| `items-center`        | `align-items: center;`        | 置中         |
| `items-center-safe`   | `align-items: safe center;`   | 安全置中     |
| `items-baseline`      | `align-items: baseline;`      | 基線         |
| `items-baseline-last` | `align-items: last baseline;` | 最後基線對齊 |
| `items-stretch`       | `align-items: stretch;`       | 拉伸         |

## align-self
控制單一項目在交叉軸（block 方向）上的對齊（覆蓋容器設定）。

| 類別名稱             | CSS 屬性                     | 說明         |
| -------------------- | ---------------------------- | ------------ |
| `self-auto`          | `align-self: auto;`          | 依容器       |
| `self-start`         | `align-self: flex-start;`    | 起始         |
| `self-end`           | `align-self: flex-end;`      | 結束         |
| `self-end-safe`      | `align-self: safe flex-end;` | 安全結束     |
| `self-center`        | `align-self: center;`        | 置中         |
| `self-center-safe`   | `align-self: safe center;`   | 安全置中     |
| `self-stretch`       | `align-self: stretch;`       | 拉伸         |
| `self-baseline`      | `align-self: baseline;`      | 基線         |
| `self-baseline-last` | `align-self: last baseline;` | 最後基線對齊 |

## place-content
同時設定 `align-content` 與 `justify-content` 的對齊（群組對齊）。

| 類別名稱                    | CSS 屬性                        | 說明         |
| --------------------------- | ------------------------------- | ------------ |
| `place-content-center`      | `place-content: center;`        | 置中         |
| `place-content-center-safe` | `place-content: safe center;`   | 安全置中     |
| `place-content-start`       | `place-content: start;`         | 起始         |
| `place-content-end`         | `place-content: end;`           | 結束         |
| `place-content-end-safe`    | `place-content: safe end;`      | 安全結束     |
| `place-content-between`     | `place-content: space-between;` | 均分間距     |
| `place-content-around`      | `place-content: space-around;`  | 項目前後等距 |
| `place-content-evenly`      | `place-content: space-evenly;`  | 所有間距等分 |
| `place-content-baseline`    | `place-content: baseline;`      | 以基線對齊   |
| `place-content-stretch`     | `place-content: stretch;`       | 拉伸         |

{% note info %}
**小技巧：place-content 對齊用法**
`place-content` 同時控制主軸與交叉軸的群組對齊，常用於 Grid 容器。`safe` 關鍵字可避免內容溢出時被截斷。
{% endnote %}

## place-items
同時設定 `align-items` 與 `justify-items` 的對齊（項目對齊）。

| 類別名稱                  | CSS 屬性                    | 說明     |
| ------------------------- | --------------------------- | -------- |
| `place-items-start`       | `place-items: start;`       | 起始     |
| `place-items-end`         | `place-items: end;`         | 結束     |
| `place-items-end-safe`    | `place-items: safe end;`    | 安全結束 |
| `place-items-center`      | `place-items: center;`      | 置中     |
| `place-items-center-safe` | `place-items: safe center;` | 安全置中 |
| `place-items-baseline`    | `place-items: baseline;`    | 基線     |
| `place-items-stretch`     | `place-items: stretch;`     | 拉伸     |

## place-self
同時設定單一項目的 `align-self` 與 `justify-self` 對齊。

| 類別名稱                 | CSS 屬性                   | 說明     |
| ------------------------ | -------------------------- | -------- |
| `place-self-auto`        | `place-self: auto;`        | 依容器   |
| `place-self-start`       | `place-self: start;`       | 起始     |
| `place-self-end`         | `place-self: end;`         | 結束     |
| `place-self-end-safe`    | `place-self: safe end;`    | 安全結束 |
| `place-self-center`      | `place-self: center;`      | 置中     |
| `place-self-center-safe` | `place-self: safe center;` | 安全置中 |
| `place-self-stretch`     | `place-self: stretch;`     | 拉伸     |

```html
<div class="grid grid-cols-3 h-40">
  <div class="place-self-center bg-gray-100">置中</div>
</div>
```

# Spacing & Sizing
Spacing & Sizing（間距與尺寸）是 TailwindCSS 中最常用的功能之一，能夠快速調整元素的內外距（padding、margin）與寬高尺寸。這些工具類別設計簡潔，支援響應式、邏輯方向（如 LTR/RTL）、任意值與 CSS 變數，讓你能靈活打造現代化、可維護的版面結構。

## padding
控制元素內距（padding），支援邏輯方向（inline/block、start/end）、軸向與單邊設定；數值系列由 `--spacing` 主題變數驅動。

| 類別名稱                 | CSS 屬性                                                 | 說明                  |
| ------------------------ | -------------------------------------------------------- | --------------------- |
| `p-<number>`             | `padding: calc(var(--spacing) * <number>);`              | 四邊內距              |
| `p-px`                   | `padding: 1px;`                                          | 四邊 1px              |
| `p-(<custom-property>)`  | `padding: var(<custom-property>);`                       | 四邊使用 CSS 變數     |
| `p-[<value>]`            | `padding: <value>;`                                      | 四邊任意值            |
| `px-<number>`            | `padding-inline: calc(var(--spacing) * <number>);`       | 水平（inline）        |
| `px-px`                  | `padding-inline: 1px;`                                   | 水平 1px              |
| `px-(<custom-property>)` | `padding-inline: var(<custom-property>);`                | 水平使用 CSS 變數     |
| `px-[<value>]`           | `padding-inline: <value>;`                               | 水平任意值            |
| `py-<number>`            | `padding-block: calc(var(--spacing) * <number>);`        | 垂直（block）         |
| `py-px`                  | `padding-block: 1px;`                                    | 垂直 1px              |
| `py-(<custom-property>)` | `padding-block: var(<custom-property>);`                 | 垂直使用 CSS 變數     |
| `py-[<value>]`           | `padding-block: <value>;`                                | 垂直任意值            |
| `ps-<number>`            | `padding-inline-start: calc(var(--spacing) * <number>);` | 行內起始（LTR=left）  |
| `ps-px`                  | `padding-inline-start: 1px;`                             | 行內起始 1px          |
| `ps-(<custom-property>)` | `padding-inline-start: var(<custom-property>);`          | 行內起始使用 CSS 變數 |
| `ps-[<value>]`           | `padding-inline-start: <value>;`                         | 行內起始任意值        |
| `pe-<number>`            | `padding-inline-end: calc(var(--spacing) * <number>);`   | 行內結束（LTR=right） |
| `pe-px`                  | `padding-inline-end: 1px;`                               | 行內結束 1px          |
| `pe-(<custom-property>)` | `padding-inline-end: var(<custom-property>);`            | 行內結束使用 CSS 變數 |
| `pe-[<value>]`           | `padding-inline-end: <value>;`                           | 行內結束任意值        |
| `pt-<number>`            | `padding-top: calc(var(--spacing) * <number>);`          | 上內距                |
| `pt-px`                  | `padding-top: 1px;`                                      | 上 1px                |
| `pt-(<custom-property>)` | `padding-top: var(<custom-property>);`                   | 上使用 CSS 變數       |
| `pt-[<value>]`           | `padding-top: <value>;`                                  | 上任意值              |
| `pr-<number>`            | `padding-right: calc(var(--spacing) * <number>);`        | 右內距                |
| `pr-px`                  | `padding-right: 1px;`                                    | 右 1px                |
| `pr-(<custom-property>)` | `padding-right: var(<custom-property>);`                 | 右使用 CSS 變數       |
| `pr-[<value>]`           | `padding-right: <value>;`                                | 右任意值              |
| `pb-<number>`            | `padding-bottom: calc(var(--spacing) * <number>);`       | 下內距                |
| `pb-px`                  | `padding-bottom: 1px;`                                   | 下 1px                |
| `pb-(<custom-property>)` | `padding-bottom: var(<custom-property>);`                | 下使用 CSS 變數       |
| `pb-[<value>]`           | `padding-bottom: <value>;`                               | 下任意值              |
| `pl-<number>`            | `padding-left: calc(var(--spacing) * <number>);`         | 左內距                |
| `pl-px`                  | `padding-left: 1px;`                                     | 左 1px                |
| `pl-(<custom-property>)` | `padding-left: var(<custom-property>);`                  | 左使用 CSS 變數       |
| `pl-[<value>]`           | `padding-left: <value>;`                                 | 左任意值              |

```html
<!-- p-[<value>] -->
<div class="p-[5px]"></div>
<!-- p-[var(<custom-property>)] -->
<div class="p-(--my-padding)"></div>
```

{% note info %}
**小技巧：** 優先使用邏輯方向（ps/pe、pt/pb、px/py）便於國際化書寫方向切換（LTR/RTL）。
{% endnote %}

## margin
控制元素外距（margin），除邏輯/軸向/單邊外，支援負值類別以進行拉伸或對齊微調。

| 類別名稱                 | CSS 屬性                                                 | 說明                  |
| ------------------------ | -------------------------------------------------------- | --------------------- |
| `m-<number>`             | `margin: calc(var(--spacing) * <number>);`               | 四邊外距              |
| `-m-<number>`            | `margin: calc(var(--spacing) * -<number>);`              | 四邊負外距            |
| `m-auto`                 | `margin: auto;`                                          | 四邊自動外距（置中）  |
| `m-px`                   | `margin: 1px;`                                           | 四邊 1px              |
| `-m-px`                  | `margin: -1px;`                                          | 四邊 -1px             |
| `m-(<custom-property>)`  | `margin: var(<custom-property>);`                        | 四邊使用 CSS 變數     |
| `m-[<value>]`            | `margin: <value>;`                                       | 四邊任意值            |
| `mx-<number>`            | `margin-inline: calc(var(--spacing) * <number>);`        | 水平（inline）外距    |
| `-mx-<number>`           | `margin-inline: calc(var(--spacing) * -<number>);`       | 水平負外距            |
| `mx-auto`                | `margin-inline: auto;`                                   | 水平自動外距          |
| `mx-px`                  | `margin-inline: 1px;`                                    | 水平 1px              |
| `-mx-px`                 | `margin-inline: -1px;`                                   | 水平 -1px             |
| `mx-(<custom-property>)` | `margin-inline: var(<custom-property>);`                 | 水平使用 CSS 變數     |
| `mx-[<value>]`           | `margin-inline: <value>;`                                | 水平任意值            |
| `my-<number>`            | `margin-block: calc(var(--spacing) * <number>);`         | 垂直（block）外距     |
| `-my-<number>`           | `margin-block: calc(var(--spacing) * -<number>);`        | 垂直負外距            |
| `my-auto`                | `margin-block: auto;`                                    | 垂直自動外距          |
| `my-px`                  | `margin-block: 1px;`                                     | 垂直 1px              |
| `-my-px`                 | `margin-block: -1px;`                                    | 垂直 -1px             |
| `my-(<custom-property>)` | `margin-block: var(<custom-property>);`                  | 垂直使用 CSS 變數     |
| `my-[<value>]`           | `margin-block: <value>;`                                 | 垂直任意值            |
| `ms-<number>`            | `margin-inline-start: calc(var(--spacing) * <number>);`  | 行內起始（LTR=left）  |
| `-ms-<number>`           | `margin-inline-start: calc(var(--spacing) * -<number>);` | 行內起始負外距        |
| `ms-auto`                | `margin-inline-start: auto;`                             | 行內起始自動外距      |
| `ms-px`                  | `margin-inline-start: 1px;`                              | 行內起始 1px          |
| `-ms-px`                 | `margin-inline-start: -1px;`                             | 行內起始 -1px         |
| `ms-(<custom-property>)` | `margin-inline-start: var(<custom-property>);`           | 行內起始使用 CSS 變數 |
| `ms-[<value>]`           | `margin-inline-start: <value>;`                          | 行內起始任意值        |
| `me-<number>`            | `margin-inline-end: calc(var(--spacing) * <number>);`    | 行內結束（LTR=right） |
| `-me-<number>`           | `margin-inline-end: calc(var(--spacing) * -<number>);`   | 行內結束負外距        |
| `me-auto`                | `margin-inline-end: auto;`                               | 行內結束自動外距      |
| `me-px`                  | `margin-inline-end: 1px;`                                | 行內結束 1px          |
| `-me-px`                 | `margin-inline-end: -1px;`                               | 行內結束 -1px         |
| `me-(<custom-property>)` | `margin-inline-end: var(<custom-property>);`             | 行內結束使用 CSS 變數 |
| `me-[<value>]`           | `margin-inline-end: <value>;`                            | 行內結束任意值        |
| `mt-<number>`            | `margin-top: calc(var(--spacing) * <number>);`           | 上外距                |
| `-mt-<number>`           | `margin-top: calc(var(--spacing) * -<number>);`          | 上負外距              |
| `mt-auto`                | `margin-top: auto;`                                      | 上自動外距            |
| `mt-px`                  | `margin-top: 1px;`                                       | 上 1px                |
| `-mt-px`                 | `margin-top: -1px;`                                      | 上 -1px               |
| `mt-(<custom-property>)` | `margin-top: var(<custom-property>);`                    | 上使用 CSS 變數       |
| `mt-[<value>]`           | `margin-top: <value>;`                                   | 上任意值              |
| `mr-<number>`            | `margin-right: calc(var(--spacing) * <number>);`         | 右外距                |
| `-mr-<number>`           | `margin-right: calc(var(--spacing) * -<number>);`        | 右負外距              |
| `mr-auto`                | `margin-right: auto;`                                    | 右自動外距            |
| `mr-px`                  | `margin-right: 1px;`                                     | 右 1px                |
| `-mr-px`                 | `margin-right: -1px;`                                    | 右 -1px               |
| `mr-(<custom-property>)` | `margin-right: var(<custom-property>);`                  | 右使用 CSS 變數       |
| `mr-[<value>]`           | `margin-right: <value>;`                                 | 右任意值              |
| `mb-<number>`            | `margin-bottom: calc(var(--spacing) * <number>);`        | 下外距                |
| `-mb-<number>`           | `margin-bottom: calc(var(--spacing) * -<number>);`       | 下負外距              |
| `mb-auto`                | `margin-bottom: auto;`                                   | 下自動外距            |
| `mb-px`                  | `margin-bottom: 1px;`                                    | 下 1px                |
| `-mb-px`                 | `margin-bottom: -1px;`                                   | 下 -1px               |
| `mb-(<custom-property>)` | `margin-bottom: var(<custom-property>);`                 | 下使用 CSS 變數       |
| `mb-[<value>]`           | `margin-bottom: <value>;`                                | 下任意值              |
| `ml-<number>`            | `margin-left: calc(var(--spacing) * <number>);`          | 左外距                |
| `-ml-<number>`           | `margin-left: calc(var(--spacing) * -<number>);`         | 左負外距              |
| `ml-auto`                | `margin-left: auto;`                                     | 左自動外距            |
| `ml-px`                  | `margin-left: 1px;`                                      | 左 1px                |
| `-ml-px`                 | `margin-left: -1px;`                                     | 左 -1px               |
| `ml-(<custom-property>)` | `margin-left: var(<custom-property>);`                   | 左使用 CSS 變數       |
| `ml-[<value>]`           | `margin-left: <value>;`                                  | 左任意值              |

```html
<!-- 置中常見：固定寬度 + mx-auto -->
<div class="w-[680px] mx-auto my-8">...</div>

<!-- 負外距微調堆疊 -->
<div class="-mt-2 -ms-3">...</div>

<!-- 任意值/CSS 變數 -->
<div class="mx-[max(2vw,16px)]">...</div>
<div class="my-(--section-spacing)">...</div>
```

{% note warning %}
**注意：** 負外距雖實用但易造成覆蓋與無意義溢出，請搭配輪廓/背景協助檢查版面。
{% endnote %}

### space-*（間距）類別
用於設定同層子元素之間的水平（x 軸）或垂直（y 軸）間距，常用於 flex、grid、stack 等排版。支援 spacing 級距、px、任意值與 CSS 變數，並可透過 `*-reverse` 切換方向（由 `margin-inline-start/end`、`margin-block-start/end` 與 `--tw-space-*-reverse` 協作）。

- `space-x-*` 會自動套用於同層子元素（非最後一個），產生水平間距。
- `space-y-*` 會自動套用於同層子元素（非最後一個），產生垂直間距。
- `reverse` 版本（如 `space-x-reverse`）會反轉間距方向，常用於 RTL 或特殊排版。
- 任意值與 CSS 變數可用於自訂間距，提升彈性。

| 類別名稱                      | CSS 行為概要                                          | 說明           |
| ----------------------------- | ----------------------------------------------------- | -------------- |
| `space-x-<number>`            | 以 `var(--spacing)` 乘級距，分配到 inline-start/end   | 水平間距       |
| `-space-x-<number>`           | 與上同，但使用負值                                    | 水平負間距     |
| `space-x-px`                  | 使用 1px 分配到 inline-start/end                      | 水平 1px 間距  |
| `-space-x-px`                 | 與上同，但使用 -1px                                   | 水平 -1px 間距 |
| `space-x-(<custom-property>)` | 使用 `var(<custom-property>)` 分配到 inline-start/end | 變數間距       |
| `space-x-[<value>]`           | 使用任意值 `<value>` 分配到 inline-start/end          | 任意值間距     |
| `space-y-<number>`            | 以 `var(--spacing)` 乘級距，分配到 block-start/end    | 垂直間距       |
| `-space-y-<number>`           | 與上同，但使用負值                                    | 垂直負間距     |
| `space-y-px`                  | 使用 1px 分配到 block-start/end                       | 垂直 1px 間距  |
| `-space-y-px`                 | 與上同，但使用 -1px                                   | 垂直 -1px 間距 |
| `space-y-(<custom-property>)` | 使用 `var(<custom-property>)` 分配到 block-start/end  | 變數間距       |
| `space-y-[<value>]`           | 使用任意值 `<value>` 分配到 block-start/end           | 任意值間距     |
| `space-x-reverse`             | 設定 `--tw-space-x-reverse: 1`                        | 反轉方向       |
| `space-y-reverse`             | 設定 `--tw-space-y-reverse: 1`                        | 反轉方向       |

```css
/* space-x-<number> */
& > :not(:last-child) {
  --tw-space-x-reverse: 0;
  margin-inline-start: calc(calc(var(--spacing) * <number>) * var(--tw-space-x-reverse));
  margin-inline-end: calc(calc(var(--spacing) * <number>) * calc(1 - var(--tw-space-x-reverse)));
};

/* -space-x-<number> */
& > :not(:last-child) {
  --tw-space-x-reverse: 0;
  margin-inline-start: calc(calc(var(--spacing) * -<number>) * var(--tw-space-x-reverse));
  margin-inline-end: calc(calc(var(--spacing) * -<number>) * calc(1 - var(--tw-space-x-reverse)));
}

/* space-x-px / -space-x-px */
& > :not(:last-child) {
  --tw-space-x-reverse: 0;
  margin-inline-start: calc(1px * var(--tw-space-x-reverse));
  margin-inline-end: calc(1px * calc(1 - var(--tw-space-x-reverse)));
}
& > :not(:last-child) {
  --tw-space-x-reverse: 0;
  margin-inline-start: calc(-1px * var(--tw-space-x-reverse));
  margin-inline-end: calc(-1px * calc(1 - var(--tw-space-x-reverse)));
}

/* space-x-(<custom-property>) / space-x-[<value>] */
& > :not(:last-child) {
  --tw-space-x-reverse: 0;
  margin-inline-start: calc(var(<custom-property>) * var(--tw-space-x-reverse));
  margin-inline-end: calc(var(<custom-property>) * calc(1 - var(--tw-space-x-reverse)));
}
& > :not(:last-child) {
  --tw-space-x-reverse: 0;
  margin-inline-start: calc(<value> * var(--tw-space-x-reverse));
  margin-inline-end: calc(<value> * calc(1 - var(--tw-space-x-reverse)));
}

/* space-y-<number> */
& > :not(:last-child) {
  --tw-space-y-reverse: 0;
  margin-block-start: calc(calc(var(--spacing) * <number>) * var(--tw-space-y-reverse));
  margin-block-end: calc(calc(var(--spacing) * <number>) * calc(1 - var(--tw-space-y-reverse)));
}

/* -space-y-<number> */
& > :not(:last-child) {
  --tw-space-y-reverse: 0;
  margin-block-start: calc(calc(var(--spacing) * -<number>) * var(--tw-space-y-reverse));
  margin-block-end: calc(calc(var(--spacing) * -<number>) * calc(1 - var(--tw-space-y-reverse)));
}

/* space-y-px / -space-y-px */
& > :not(:last-child) {
  --tw-space-y-reverse: 0;
  margin-block-start: calc(1px * var(--tw-space-y-reverse));
  margin-block-end: calc(1px * calc(1 - var(--tw-space-y-reverse)));
}
& > :not(:last-child) {
  --tw-space-y-reverse: 0;
  margin-block-start: calc(-1px * var(--tw-space-y-reverse));
  margin-block-end: calc(-1px * calc(1 - var(--tw-space-y-reverse)));
}

/* space-y-(<custom-property>) / space-y-[<value>] */
& > :not(:last-child) {
  --tw-space-y-reverse: 0;
  margin-block-start: calc(var(<custom-property>) * var(--tw-space-y-reverse));
  margin-block-end: calc(var(<custom-property>) * calc(1 - var(--tw-space-y-reverse)));
}
& > :not(:last-child) {
  --tw-space-y-reverse: 0;
  margin-block-start: calc(<value> * var(--tw-space-y-reverse));
  margin-block-end: calc(<value> * calc(1 - var(--tw-space-y-reverse)));
}

/* reverse 開關 */
& > :not(:last-child) { --tw-space-x-reverse: 1; } /* space-x-reverse */
& > :not(:last-child) { --tw-space-y-reverse: 1; } /* space-y-reverse */
```

```html
<!-- 除了 03，每個離後面間隔 0.25rem * 4 -->
<div class="flex space-x-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>

<!-- 除了 03，每個離前面間隔 0.25rem * 4 -->
<div class="flex flex-row-reverse space-x-4 space-x-reverse">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## width
設定元素寬度。包含 spacing 級距、百分比、視口、內容基礎與任意值；並支援 CSS 變數。

| 類別名稱                | CSS 屬性                                  | 說明                              |
| ----------------------- | ----------------------------------------- | --------------------------------- |
| `w-<number>`            | `width: calc(var(--spacing) * <number>);` | 以 spacing 級距寬度               |
| `w-<fraction>`          | `width: calc(<fraction> * 100%);`         | 以分數百分比寬度（如 1/2、1/3）   |
| `w-3xs`                 | `width: var(--container-3xs);`            | 超極小容器寬度（16rem，256px）    |
| `w-2xs`                 | `width: var(--container-2xs);`            | 更小容器寬度（18rem，288px）      |
| `w-xs`                  | `width: var(--container-xs);`             | 小容器寬度（20rem，320px）        |
| `w-sm`                  | `width: var(--container-sm);`             | 小型容器寬度（24rem，384px）      |
| `w-md`                  | `width: var(--container-md);`             | 中型容器寬度（28rem，448px）      |
| `w-lg`                  | `width: var(--container-lg);`             | 大型容器寬度（32rem，512px）      |
| `w-xl`                  | `width: var(--container-xl);`             | 特大容器寬度（36rem，576px）      |
| `w-2xl`                 | `width: var(--container-2xl);`            | 2 倍特大容器寬度（42rem，672px）  |
| `w-3xl`                 | `width: var(--container-3xl);`            | 3 倍特大容器寬度（48rem，768px）  |
| `w-4xl`                 | `width: var(--container-4xl);`            | 4 倍特大容器寬度（56rem，896px）  |
| `w-5xl`                 | `width: var(--container-5xl);`            | 5 倍特大容器寬度（64rem，1024px） |
| `w-6xl`                 | `width: var(--container-6xl);`            | 6 倍特大容器寬度（72rem，1152px） |
| `w-7xl`                 | `width: var(--container-7xl);`            | 7 倍特大容器寬度（80rem，1280px） |
| `w-auto`                | `width: auto;`                            | 內容決定寬度                      |
| `w-px`                  | `width: 1px;`                             | 1px 寬度                          |
| `w-full`                | `width: 100%;`                            | 充滿容器                          |
| `w-screen`              | `width: 100vw;`                           | 100% 視口寬                       |
| `w-dvw`                 | `width: 100dvw;`                          | 動態視口寬（行動裝置）            |
| `w-dvh`                 | `width: 100dvh;`                          | 動態視口高（行動裝置）            |
| `w-lvw`                 | `width: 100lvw;`                          | 大視口寬（Large Viewport Width）  |
| `w-lvh`                 | `width: 100lvh;`                          | 大視口高（Large Viewport Height） |
| `w-svw`                 | `width: 100svw;`                          | 小視口寬（Small Viewport Width）  |
| `w-svh`                 | `width: 100svh;`                          | 小視口高（Small Viewport Height） |
| `w-min`                 | `width: min-content;`                     | 以最小內容寬度                    |
| `w-max`                 | `width: max-content;`                     | 以最大內容寬度                    |
| `w-fit`                 | `width: fit-content;`                     | 自適應內容寬度                    |
| `w-(<custom-property>)` | `width: var(<custom-property>);`          | 使用 CSS 變數                     |
| `w-[<value>]`           | `width: <value>;`                         | 任意自訂值                        |


```html
<div class="w-full md:w-[720px] lg:w-(--content-width)">...</div>
<div class="w-1/2 md:w-full">...</div>
```

{% note info %}
**小技巧：** 行動瀏覽器建議使用 `w-dvw` 以避開 URL bar 影響造成的 `vw` 誤差。
{% endnote %}

## size
同時設定元素的寬度與高度，常用於快速建立正方形、圓形或等寬高區塊。支援 spacing 級距、百分比、視口單位、內容基礎、CSS 變數與任意值。

| 類別名稱                   | CSS 屬性                                                                           | 說明                    |
| -------------------------- | ---------------------------------------------------------------------------------- | ----------------------- |
| `size-<number>`            | `width: calc(var(--spacing) * <number>); height: calc(var(--spacing) * <number>);` | 寬高同時以 spacing 級距 |
| `size-<fraction>`          | `width: calc(<fraction> * 100%); height: calc(<fraction> * 100%);`                 | 寬高同時以分數百分比    |
| `size-auto`                | `width: auto; height: auto;`                                                       | 寬高皆自動              |
| `size-px`                  | `width: 1px; height: 1px;`                                                         | 寬高皆 1px              |
| `size-full`                | `width: 100%; height: 100%;`                                                       | 寬高皆充滿容器          |
| `size-dvw`                 | `width: 100dvw; height: 100dvw;`                                                   | 寬高皆動態視口寬        |
| `size-dvh`                 | `width: 100dvh; height: 100dvh;`                                                   | 寬高皆動態視口高        |
| `size-lvw`                 | `width: 100lvw; height: 100lvw;`                                                   | 寬高皆大視口寬          |
| `size-lvh`                 | `width: 100lvh; height: 100lvh;`                                                   | 寬高皆大視口高          |
| `size-svw`                 | `width: 100svw; height: 100svw;`                                                   | 寬高皆小視口寬          |
| `size-svh`                 | `width: 100svh; height: 100svh;`                                                   | 寬高皆小視口高          |
| `size-min`                 | `width: min-content; height: min-content;`                                         | 寬高皆最小內容          |
| `size-max`                 | `width: max-content; height: max-content;`                                         | 寬高皆最大內容          |
| `size-fit`                 | `width: fit-content; height: fit-content;`                                         | 寬高皆自適應內容        |
| `size-(<custom-property>)` | `width: var(<custom-property>); height: var(<custom-property>);`                   | 寬高皆使用 CSS 變數     |
| `size-[<value>]`           | `width: <value>; height: <value>;`                                                 | 寬高皆任意自訂值        |


## min-width
限制元素最小寬度，避免內容擠壓變形。

| 類別名稱                    | CSS 屬性                                      | 說明                            |
| --------------------------- | --------------------------------------------- | ------------------------------- |
| `min-w-<number>`            | `min-width: calc(var(--spacing) * <number>);` | spacing 級距                    |
| `min-w-<fraction>`          | `min-width: calc(<fraction> * 100%);`         | 分數百分比                      |
| `min-w-3xs`                 | `min-width: var(--container-3xs);`            | 超小容器寬（16rem，256px）      |
| `min-w-2xs`                 | `min-width: var(--container-2xs);`            | 更小容器寬（18rem，288px）      |
| `min-w-xs`                  | `min-width: var(--container-xs);`             | 極小容器寬（20rem，320px）      |
| `min-w-sm`                  | `min-width: var(--container-sm);`             | 小容器寬（24rem，384px）        |
| `min-w-md`                  | `min-width: var(--container-md);`             | 中容器寬（28rem，448px）        |
| `min-w-lg`                  | `min-width: var(--container-lg);`             | 大容器寬（32rem，512px）        |
| `min-w-xl`                  | `min-width: var(--container-xl);`             | 特大容器寬（36rem，576px）      |
| `min-w-2xl`                 | `min-width: var(--container-2xl);`            | 2 倍特大容器寬（42rem，672px）  |
| `min-w-3xl`                 | `min-width: var(--container-3xl);`            | 3 倍特大容器寬（48rem，768px）  |
| `min-w-4xl`                 | `min-width: var(--container-4xl);`            | 4 倍特大容器寬（56rem，896px）  |
| `min-w-5xl`                 | `min-width: var(--container-5xl);`            | 5 倍特大容器寬（64rem，1024px） |
| `min-w-6xl`                 | `min-width: var(--container-6xl);`            | 6 倍特大容器寬（72rem，1152px） |
| `min-w-7xl`                 | `min-width: var(--container-7xl);`            | 7 倍特大容器寬（80rem，1280px） |
| `min-w-auto`                | `min-width: auto;`                            | 自動寬度                        |
| `min-w-px`                  | `min-width: 1px;`                             | 1px                             |
| `min-w-0`                   | `min-width: 0;`                               | 允許壓縮                        |
| `min-w-full`                | `min-width: 100%;`                            | 至少容器寬                      |
| `min-w-screen`              | `min-width: 100vw;`                           | 至少視口寬                      |
| `min-w-dvw`                 | `min-width: 100dvw;`                          | 動態視口寬（行動裝置）          |
| `min-w-dvh`                 | `min-width: 100dvh;`                          | 動態視口高（行動裝置）          |
| `min-w-lvw`                 | `min-width: 100lvw;`                          | 大視口寬                        |
| `min-w-lvh`                 | `min-width: 100lvh;`                          | 大視口高                        |
| `min-w-svw`                 | `min-width: 100svw;`                          | 小視口寬                        |
| `min-w-svh`                 | `min-width: 100svh;`                          | 小視口高                        |
| `min-w-min`                 | `min-width: min-content;`                     | 最小內容                        |
| `min-w-max`                 | `min-width: max-content;`                     | 最大內容                        |
| `min-w-fit`                 | `min-width: fit-content;`                     | 自適應內容                      |
| `min-w-(<custom-property>)` | `min-width: var(<custom-property>);`          | CSS 變數                        |
| `min-w-[<value>]`           | `min-width: <value>;`                         | 任意值                          |


## max-width
限制元素最大寬度，常用於排版容器、段落內容寬。

| 類別名稱                      | CSS 屬性                                         | 說明                                 |
| ----------------------------- | ------------------------------------------------ | ------------------------------------ |
| 類別名稱                      | CSS 屬性                                         | 說明                                 |
| ----------------------------- | ------------------------------------------------ | ------------------------------------ |
| `max-w-<number>`              | `max-width: calc(var(--spacing) * <number>);`    | spacing 級距                         |
| `max-w-<fraction>`            | `max-width: calc(<fraction> * 100%);`            | 分數百分比                           |
| `max-w-3xs`                   | `max-width: var(--container-3xs);`               | 超小容器寬（16rem，256px）           |
| `max-w-2xs`                   | `max-width: var(--container-2xs);`               | 更小容器寬（18rem，288px）           |
| `max-w-xs`                    | `max-width: var(--container-xs);`                | 極小容器寬（20rem，320px）           |
| `max-w-sm`                    | `max-width: var(--container-sm);`                | 小容器寬（24rem，384px）             |
| `max-w-md`                    | `max-width: var(--container-md);`                | 中容器寬（28rem，448px）             |
| `max-w-lg`                    | `max-width: var(--container-lg);`                | 大容器寬（32rem，512px）             |
| `max-w-xl`                    | `max-width: var(--container-xl);`                | 特大容器寬（36rem，576px）           |
| `max-w-2xl`                   | `max-width: var(--container-2xl);`               | 2 倍特大容器寬（42rem，672px）       |
| `max-w-3xl`                   | `max-width: var(--container-3xl);`               | 3 倍特大容器寬（48rem，768px）       |
| `max-w-4xl`                   | `max-width: var(--container-4xl);`               | 4 倍特大容器寬（56rem，896px）       |
| `max-w-5xl`                   | `max-width: var(--container-5xl);`               | 5 倍特大容器寬（64rem，1024px）      |
| `max-w-6xl`                   | `max-width: var(--container-6xl);`               | 6 倍特大容器寬（72rem，1152px）      |
| `max-w-7xl`                   | `max-width: var(--container-7xl);`               | 7 倍特大容器寬（80rem，1280px）      |
| `max-w-none`                  | `max-width: none;`                               | 不限制                               |
| `max-w-px`                    | `max-width: 1px;`                                | 1px                                  |
| `max-w-full`                  | `max-width: 100%;`                               | 不超出容器                           |
| `max-w-dvw`                   | `max-width: 100dvw;`                             | 動態視口寬（行動裝置）               |
| `max-w-dvh`                   | `max-width: 100dvh;`                             | 動態視口高（行動裝置）               |
| `max-w-lvw`                   | `max-width: 100lvw;`                             | 大視口寬                             |
| `max-w-lvh`                   | `max-width: 100lvh;`                             | 大視口高                             |
| `max-w-svw`                   | `max-width: 100svw;`                             | 小視口寬                             |
| `max-w-svh`                   | `max-width: 100svh;`                             | 小視口高                             |
| `max-w-screen`                | `max-width: 100vw;`                              | 不超出視口寬                         |
| `max-w-min`                   | `max-width: min-content;`                        | 最小內容寬度                         |
| `max-w-max`                   | `max-width: max-content;`                        | 最大內容寬度                         |
| `max-w-fit`                   | `max-width: fit-content;`                        | 自適應內容寬度                       |
| `max-w-prose`                 | `max-width: var(--container-prose);`             | 文章最佳閱讀寬                       |
| `max-w-<container>`           | `max-width: var(--container-<name>);`            | 依主題容器尺寸（如 `md`、`lg`）      |
| `container`                   | 根據螢幕寬度設定最大寬度，並預設為寬度 100%      | 響應式容器寬度                       |
| `max-w-(<custom-property>)`   | `max-width: var(<custom-property>);`             | CSS 變數                             |
| `max-w-[<value>]`             | `max-width: <value>;`                            | 任意值                               |


```html
<div class="max-w-[220px]"></div>
<div class="max-w-(--my-max-width)"></div>
```


{% note info %}
**小技巧：** 以 `mx-auto + max-w-*` 形成常見的置中版心；可搭配 `px-*` 提供內邊距。
{% endnote %}


### 使用 container
`container` 是 Tailwind CSS 中用來建立響應式版心（container）的工具類別。當你在元素上加上 `container` 類別時，該元素會自動根據螢幕寬度設定最大寬度，並預設為寬度 100%。這讓內容能在不同裝置上自動置中且保持適當的閱讀寬度。

**主要特點：**
- 會根據預設斷點（如 `sm`、`md`、`lg`、`xl`、`2xl`）自動調整最大寬度。
- 通常搭配 `mx-auto` 讓容器水平置中。
- 可與 `px-*` 內邊距類別搭配，讓內容不緊貼邊緣。
- 支援自訂斷點與寬度，能依專案需求調整。

```css
.container{
  width: 100%;
  @media (width >= 40rem) { max-width: 40rem; }
  @media (width >= 48rem) { max-width: 48rem; }
  @media (width >= 64rem) { max-width: 64rem; }
  @media (width >= 80rem) { max-width: 80rem; }
  @media (width >= 96rem) { max-width: 96rem; }
}
```
```html
<div class="container"></div>
```

## height
設定元素高度。含 spacing 級距、百分比、視口與內容基礎類別。

| 類別名稱                | CSS 屬性                                   | 說明                              |
| ----------------------- | ------------------------------------------ | --------------------------------- |
| `h-<number>`            | `height: calc(var(--spacing) * <number>);` | 以 spacing 級距高度               |
| `h-<fraction>`          | `height: calc(<fraction> * 100%);`         | 百分比分數高度（如 1/2、1/3）     |
| `h-auto`                | `height: auto;`                            | 內容決定                          |
| `h-px`                  | `height: 1px;`                             | 1px                               |
| `h-full`                | `height: 100%;`                            | 充滿容器                          |
| `h-screen`              | `height: 100vh;`                           | 100% 視口高                       |
| `h-dvh`                 | `height: 100dvh;`                          | 動態視口高（行動裝置）            |
| `h-dvw`                 | `height: 100dvw;`                          | 動態視口寬（行動裝置）            |
| `h-lvh`                 | `height: 100lvh;`                          | 大視口高（Large Viewport Height） |
| `h-lvw`                 | `height: 100lvw;`                          | 大視口寬（Large Viewport Width）  |
| `h-svh`                 | `height: 100svh;`                          | 小視口高（Small Viewport Height） |
| `h-svw`                 | `height: 100svw;`                          | 小視口寬（Small Viewport Width）  |
| `h-min`                 | `height: min-content;`                     | 最小內容                          |
| `h-max`                 | `height: max-content;`                     | 最大內容                          |
| `h-fit`                 | `height: fit-content;`                     | 自適應內容                        |
| `h-lh`                  | `height: 1lh;`                             | 1 行高（line-height 單位）        |
| `h-(<custom-property>)` | `height: var(<custom-property>);`          | 使用 CSS 變數                     |
| `h-[<value>]`           | `height: <value>;`                         | 任意值                            |

```html
<div class="h-[32rem]"></div>
<div class="h-(--my-height)"></div>
<div class="h-1/2 md:h-full"></div>
```

## min-height
限制元素最小高度，避免內容塌縮。

| 類別名稱                    | CSS 屬性                                       | 說明                       |
| --------------------------- | ---------------------------------------------- | -------------------------- |
| `min-h-<number>`            | `min-height: calc(var(--spacing) * <number>);` | spacing 級距               |
| `min-h-<fraction>`          | `min-height: calc(<fraction> * 100%);`         | 百分比分數高度             |
| `min-h-px`                  | `min-height: 1px;`                             | 1px 高度                   |
| `min-h-full`                | `min-height: 100%;`                            | 充滿容器                   |
| `min-h-screen`              | `min-height: 100vh;`                           | 充滿視口高                 |
| `min-h-dvh`                 | `min-height: 100dvh;`                          | 動態視口高（行動裝置）     |
| `min-h-dvw`                 | `min-height: 100dvw;`                          | 動態視口寬（行動裝置）     |
| `min-h-lvh`                 | `min-height: 100lvh;`                          | 大視口高                   |
| `min-h-lvw`                 | `min-height: 100lvw;`                          | 大視口寬                   |
| `min-h-svh`                 | `min-height: 100svh;`                          | 小視口高                   |
| `min-h-svw`                 | `min-height: 100svw;`                          | 小視口寬                   |
| `min-h-auto`                | `min-height: auto;`                            | 自動高度                   |
| `min-h-min`                 | `min-height: min-content;`                     | 最小內容                   |
| `min-h-max`                 | `min-height: max-content;`                     | 最大內容                   |
| `min-h-fit`                 | `min-height: fit-content;`                     | 自適應內容                 |
| `min-h-lh`                  | `min-height: 1lh;`                             | 1 行高（line-height 單位） |
| `min-h-(<custom-property>)` | `min-height: var(<custom-property>);`          | CSS 變數                   |
| `min-h-[<value>]`           | `min-height: <value>;`                         | 任意值                     |

```html
<div class="min-h-[220px]"></div>
<div class="min-h-(--my-min-height)"></div>
<div class="h-24 min-h-0 md:min-h-full"></div>
```


## max-height
限制元素最大高度，常用於側邊欄、清單區塊與對話框內文滾動。

| 類別名稱                    | CSS 屬性                                       | 說明                       |
| --------------------------- | ---------------------------------------------- | -------------------------- |
| `max-h-<number>`            | `max-height: calc(var(--spacing) * <number>);` | spacing 級距               |
| `max-h-<fraction>`          | `max-height: calc(<fraction> * 100%);`         | 百分比分數高度             |
| `max-h-none`                | `max-height: none;`                            | 不限制                     |
| `max-h-px`                  | `max-height: 1px;`                             | 1px 高度                   |
| `max-h-full`                | `max-height: 100%;`                            | 不超出容器                 |
| `max-h-screen`              | `max-height: 100vh;`                           | 不超出視口高               |
| `max-h-dvh`                 | `max-height: 100dvh;`                          | 動態視口高（行動裝置）     |
| `max-h-dvw`                 | `max-height: 100dvw;`                          | 動態視口寬（行動裝置）     |
| `max-h-lvh`                 | `max-height: 100lvh;`                          | 大視口高                   |
| `max-h-lvw`                 | `max-height: 100lvw;`                          | 大視口寬                   |
| `max-h-svh`                 | `max-height: 100svh;`                          | 小視口高                   |
| `max-h-svw`                 | `max-height: 100svw;`                          | 小視口寬                   |
| `max-h-min`                 | `max-height: min-content;`                     | 最小內容                   |
| `max-h-max`                 | `max-height: max-content;`                     | 最大內容                   |
| `max-h-fit`                 | `max-height: fit-content;`                     | 自適應內容                 |
| `max-h-lh`                  | `max-height: 1lh;`                             | 1 行高（line-height 單位） |
| `max-h-(<custom-property>)` | `max-height: var(<custom-property>);`          | 使用 CSS 變數              |
| `max-h-[<value>]`           | `max-height: <value>;`                         | 任意值                     |

```html
<div class="max-h-[220px]"></div>
<div class="max-h-(--my-max-height)"></div>
<div class="h-48 max-h-full md:max-h-screen"></div>
```

{% note info %}
**小技巧：** 建議與 `overflow-auto` 搭配，於內容溢出時提供滾動；行動瀏覽器優先使用 `dvh`。
{% endnote %}

# Typography

## font-family
用於設定字體家族，支援主題變數、任意值與邏輯回退。

| 類別名稱                   | CSS 屬性                               | 說明     |
| -------------------------- | -------------------------------------- | -------- |
| `font-sans`                | `font-family: var(--font-sans);`       | 無襯線   |
| `font-serif`               | `font-family: var(--font-serif);`      | 襯線     |
| `font-mono`                | `font-family: var(--font-mono);`       | 等寬     |
| `font-(<custom-property>)` | `font-family: var(<custom-property>);` | CSS 變數 |
| `font-[<value>]`           | `font-family: <value>;`                | 任意值   |

```html
<h1 class="font-sans">Sans</h1>
<h1 class="font-(--font-brand)">Brand</h1>
```

{% note info %}
以 `@theme` 覆蓋 `--font-sans` 可全站更換字體。
{% endnote %}

## font-size
設定字體大小，支援 line-height 修飾符與任意值。

| 類別名稱             | CSS 屬性                               | 說明            |
| -------------------- | -------------------------------------- | --------------- |
| `text-xs`…`text-9xl` | `font-size: var(--text-<token>);`      | 主題刻度        |
| `text-[<value>]`     | `font-size: <value>;`                  | 任意值          |
| `text-(length:--*)`  | `font-size: var(--*);`                 | 指定型別為長度  |
| `text-*/<leading>`   | `line-height: var(--leading-<token>);` | 以 `/` 設定行高 |

```html
<h1 class="text-2xl/relaxed">Title</h1>
<p class="text-[15px]/[1.7]">Body</p>
```

## font-smoothing
控制次像素平滑渲染（WebKit 與 macOS 專用語義）。

| 類別名稱               | CSS 屬性                                                                      |
| ---------------------- | ----------------------------------------------------------------------------- |
| `antialiased`          | `-webkit-font-smoothing: antialiased;`、`-moz-osx-font-smoothing: grayscale;` |
| `subpixel-antialiased` | `-webkit-font-smoothing: auto;`、`-moz-osx-font-smoothing: auto;`             |

```html
<p class="antialiased">Text</p>
```

## font-style
| 類別名稱     | CSS 屬性              |
| ------------ | --------------------- |
| `italic`     | `font-style: italic;` |
| `not-italic` | `font-style: normal;` |

```html
<em class="italic">Emphasis</em>
```

## font-weight
| 類別名稱                   | CSS 屬性                               |
| -------------------------- | -------------------------------------- |
| `font-thin`…`font-black`   | `font-weight: <100..900>;`             |
| `font-[<value>]`           | `font-weight: <value>;`                |
| `font-(<custom-property>)` | `font-weight: var(<custom-property>);` |

```html
<strong class="font-semibold">Bold</strong>
```

## font-stretch
| 類別名稱                 | CSS 屬性                 | 說明     |
| ------------------------ | ------------------------ | -------- |
| `font-stretch-normal`    | `font-stretch: 100%;`    | 正常寬度 |
| `font-stretch-condensed` | `font-stretch: 75%;`     | 縮窄     |
| `font-stretch-expanded`  | `font-stretch: 125%;`    | 擴張     |
| `font-stretch-[<value>]` | `font-stretch: <value>;` | 任意值   |

```html
<h2 class="font-stretch-expanded">Title</h2>
```

## font-variant-numeric
| 類別名稱            | CSS 屬性                                   | 說明     |
| ------------------- | ------------------------------------------ | -------- |
| `normal-nums`       | `font-variant-numeric: normal;`            | 預設     |
| `ordinal`           | `font-variant-numeric: ordinal;`           | 序數     |
| `slashed-zero`      | `font-variant-numeric: slashed-zero;`      | 斜線 0   |
| `lining-nums`       | `font-variant-numeric: lining-nums;`       | 對齊數字 |
| `oldstyle-nums`     | `font-variant-numeric: oldstyle-nums;`     | 懷舊數字 |
| `proportional-nums` | `font-variant-numeric: proportional-nums;` | 比例數字 |
| `tabular-nums`      | `font-variant-numeric: tabular-nums;`      | 等寬數字 |

```html
<span class="tabular-nums">12:34</span>
```

## letter-spacing
| 類別名稱                             | CSS 屬性                                   |
| ------------------------------------ | ------------------------------------------ |
| `tracking-tighter`…`tracking-widest` | `letter-spacing: var(--tracking-<token>);` |
| `tracking-[<value>]`                 | `letter-spacing: <value>;`                 |

```html
<h3 class="tracking-wide">Heading</h3>
```

## line-clamp
以多行截斷顯示省略號。

| 類別名稱          | CSS 屬性（概念）                                    |
| ----------------- | --------------------------------------------------- |
| `line-clamp-<n>`  | `display: -webkit-box; -webkit-line-clamp: <n>;` 等 |
| `line-clamp-none` | 取消截斷                                            |

```html
<p class="line-clamp-3">長內容…</p>
```

## line-height
| 類別名稱                       | CSS 屬性                           |
| ------------------------------ | ---------------------------------- |
| `leading-none`…`leading-loose` | `line-height: var(--leading-<t>);` |
| `leading-[<value>]`            | `line-height: <value>;`            |

```html
<p class="leading-relaxed">Paragraph</p>
```

## list-style-image
| 類別名稱                | CSS 屬性                      |
| ----------------------- | ----------------------------- |
| `list-image-none`       | `list-style-image: none;`     |
| `list-image-[url(...)]` | `list-style-image: url(...);` |

```html
<ul class="list-image-[url('/dot.svg')]"><li>Item</li></ul>
```

## list-style-position
| 類別名稱       | CSS 屬性                        |
| -------------- | ------------------------------- |
| `list-inside`  | `list-style-position: inside;`  |
| `list-outside` | `list-style-position: outside;` |

## list-style-type
| 類別名稱         | CSS 屬性                    |
| ---------------- | --------------------------- |
| `list-none`      | `list-style-type: none;`    |
| `list-disc`      | `list-style-type: disc;`    |
| `list-decimal`   | `list-style-type: decimal;` |
| `list-[<value>]` | `list-style-type: <value>;` |

## text-align
| 類別名稱       | CSS 屬性               |
| -------------- | ---------------------- |
| `text-left`    | `text-align: left;`    |
| `text-center`  | `text-align: center;`  |
| `text-right`   | `text-align: right;`   |
| `text-justify` | `text-align: justify;` |
| `text-start`   | `text-align: start;`   |
| `text-end`     | `text-align: end;`     |

## color
對應文字顏色（支援透明度後綴）。

| 類別名稱           | CSS 屬性                   |
| ------------------ | -------------------------- |
| `text-{color}-{n}` | `color: var(--color-*-*);` |
| `text-[<value>]`   | `color: <value>;`          |
| `text-(color:--*)` | `color: var(--*);`         |

```html
<p class="text-slate-600 dark:text-slate-300">Text</p>
```

## text-decoration-line
| 類別名稱       | CSS 屬性                              |
| -------------- | ------------------------------------- |
| `underline`    | `text-decoration-line: underline;`    |
| `overline`     | `text-decoration-line: overline;`     |
| `line-through` | `text-decoration-line: line-through;` |
| `no-underline` | `text-decoration-line: none;`         |

## text-decoration-color
| 類別名稱                 | CSS 屬性                                   |
| ------------------------ | ------------------------------------------ |
| `decoration-{color}-{n}` | `text-decoration-color: var(--color-*-*);` |
| `decoration-[<value>]`   | `text-decoration-color: <value>;`          |

## text-decoration-style
| 類別名稱            | CSS 屬性                         |
| ------------------- | -------------------------------- |
| `decoration-solid`  | `text-decoration-style: solid;`  |
| `decoration-double` | `text-decoration-style: double;` |
| `decoration-dotted` | `text-decoration-style: dotted;` |
| `decoration-dashed` | `text-decoration-style: dashed;` |
| `decoration-wavy`   | `text-decoration-style: wavy;`   |

## text-decoration-thickness
| 類別名稱               | CSS 屬性                                |
| ---------------------- | --------------------------------------- |
| `decoration-from-font` | `text-decoration-thickness: from-font;` |
| `decoration-auto`      | `text-decoration-thickness: auto;`      |
| `decoration-[<value>]` | `text-decoration-thickness: <value>;`   |

## text-underline-offset
| 類別名稱                     | CSS 屬性                          |
| ---------------------------- | --------------------------------- |
| `underline-offset-auto`      | `text-underline-offset: auto;`    |
| `underline-offset-[<value>]` | `text-underline-offset: <value>;` |

```html
<a class="underline decoration-2 decoration-sky-500 underline-offset-4">Link</a>
```

## text-transform
| 類別名稱      | CSS 屬性                      |
| ------------- | ----------------------------- |
| `uppercase`   | `text-transform: uppercase;`  |
| `lowercase`   | `text-transform: lowercase;`  |
| `capitalize`  | `text-transform: capitalize;` |
| `normal-case` | `text-transform: none;`       |

## text-overflow
| 類別名稱        | CSS 屬性                                                          |
| --------------- | ----------------------------------------------------------------- |
| `truncate`      | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` |
| `text-ellipsis` | `text-overflow: ellipsis;`                                        |
| `text-clip`     | `text-overflow: clip;`                                            |

## text-wrap
| 類別名稱       | CSS 屬性              |
| -------------- | --------------------- |
| `text-wrap`    | `text-wrap: wrap;`    |
| `text-nowrap`  | `text-wrap: nowrap;`  |
| `text-balance` | `text-wrap: balance;` |
| `text-pretty`  | `text-wrap: pretty;`  |

## text-indent
| 類別名稱           | CSS 屬性                                 |
| ------------------ | ---------------------------------------- |
| `indent-<number>`  | `text-indent: calc(var(--spacing)*<n>);` |
| `indent-[<value>]` | `text-indent: <value>;`                  |

## vertical-align
| 類別名稱            | CSS 屬性                       |
| ------------------- | ------------------------------ |
| `align-baseline`    | `vertical-align: baseline;`    |
| `align-top`         | `vertical-align: top;`         |
| `align-middle`      | `vertical-align: middle;`      |
| `align-bottom`      | `vertical-align: bottom;`      |
| `align-text-top`    | `vertical-align: text-top;`    |
| `align-text-bottom` | `vertical-align: text-bottom;` |

## white-space
| 類別名稱              | CSS 屬性                 |
| --------------------- | ------------------------ |
| `whitespace-normal`   | `white-space: normal;`   |
| `whitespace-nowrap`   | `white-space: nowrap;`   |
| `whitespace-pre`      | `white-space: pre;`      |
| `whitespace-pre-line` | `white-space: pre-line;` |
| `whitespace-pre-wrap` | `white-space: pre-wrap;` |

## word-break
| 類別名稱       | CSS 屬性                                     |
| -------------- | -------------------------------------------- |
| `break-normal` | `word-break: normal; overflow-wrap: normal;` |
| `break-words`  | `overflow-wrap: anywhere;`                   |
| `break-all`    | `word-break: break-all;`                     |

## overflow-wrap
| 類別名稱        | CSS 屬性                     |
| --------------- | ---------------------------- |
| `ow-normal`     | `overflow-wrap: normal;`     |
| `ow-anywhere`   | `overflow-wrap: anywhere;`   |
| `ow-break-word` | `overflow-wrap: break-word;` |

## hyphens
| 類別名稱         | CSS 屬性           |
| ---------------- | ------------------ |
| `hyphens-none`   | `hyphens: none;`   |
| `hyphens-manual` | `hyphens: manual;` |
| `hyphens-auto`   | `hyphens: auto;`   |

## content
設定偽元素內容（需搭配 `before:`、`after:`）。

| 類別名稱            | CSS 屬性            |
| ------------------- | ------------------- |
| `content-['...']`   | `content: '...';`   |
| `content-[<value>]` | `content: <value>;` |

```html
<button class="relative before:content-['NEW'] before:absolute before:-top-2 before:-right-2 before:text-xs before:bg-pink-500 before:text-white before:px-1.5 before:rounded">Buy</button>
```

</rewritten_file>