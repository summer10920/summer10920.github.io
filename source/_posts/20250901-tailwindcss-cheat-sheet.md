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

| 類別名稱                      | CSS 屬性                            | 說明                                           |
| ----------------------------- | ----------------------------------- | ---------------------------------------------- |
| `columns-<number>`            | `columns: <number>;`                | 數字欄數                                       |
| `columns-auto`                | `columns: auto;`                    | 自動欄數                                       |
| `columns-<size>`              | `columns: var(--container-<size>);` | 指定寬度欄位，從 16rem(256px) 到 80rem(1280px) |
| `columns-(<custom-property>)` | `columns: var(<custom-property>);`  | 自訂屬性欄數                                   |
| `columns-[<value>]`           | `columns: <value>;`                 | 任意值欄數                                     |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --container-3xs: 16rem;     /* 256px */
  --container-2xs: 18rem;     /* 288px */
  --container-xs: 20rem;`     /* 320px */
  --container-sm: 24rem;`     /* 384px */
  --container-md: 28rem;`     /* 448px */
  --container-lg: 32rem;`     /* 512px */
  --container-xl: 36rem;`     /* 576px */
  --container-2xl: 42rem;     /* 672px */
  --container-3xl: 48rem;     /* 768px */
  --container-4xl: 56rem;     /* 896px */
  --container-5xl: 64rem;     /* 1024px */
  --container-6xl: 72rem;     /* 1152px */
  --container-7xl: 80rem;     /* 1280px */
}
```

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
- 搭配 `gap-<number>` 控制欄位間距，提升可讀性
- 響應式設計建議：`columns-1 md:columns-2 lg:columns-3`
- 固定寬度欄位適合圖片畫廊，數字欄位適合文字內容
- 支援 CSS 變數：`columns-[var(--custom-columns)]`
{% endnote %}

## break-after, break-before
`break-after` 和 `break-before` 用於控制元素在分頁、分欄或分區時的斷行行為，特別適合用於列印樣式、多欄佈局和分頁媒體。這些屬性可以防止內容在不適當的位置斷開，或強制在特定位置斷行。

| 類別名稱                           | CSS 屬性                             | 說明               |
| ---------------------------------- | ------------------------------------ | ------------------ |
| `break-<before\|after>-auto`       | `break-<before\|after>: auto;`       | 自動斷行（預設值） |
| `break-<before\|after>-avoid`      | `break-<before\|after>: avoid;`      | 避免斷行           |
| `break-<before\|after>-all`        | `break-<before\|after>: all;`        | 強制斷行           |
| `break-<before\|after>-avoid-page` | `break-<before\|after>: avoid-page;` | 避免分頁斷行       |
| `break-<before\|after>-page`       | `break-<before\|after>: page;`       | 強制分頁斷行       |
| `break-<before\|after>-left`       | `break-<before\|after>: left;`       | 強制左頁斷行       |
| `break-<before\|after>-right`      | `break-<before\|after>: right;`      | 強制右頁斷行       |
| `break-<before\|after>-column`     | `break-<before\|after>: column;`     | 強制分欄斷行       |

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
| `basis-<size>`              | `flex-basis: var(--container-<size>);`         | 基準尺寸為 16rem(256px) ~ 80rem(1280px)           |
| `basis-(<custom-property>)` | `flex-basis: var(<custom-property>);`          | 使用 CSS 自訂屬性（變數）設定基準尺寸             |
| `basis-[<value>]`           | `flex-basis: <value>;`                         | 自訂基準尺寸，可使用任何有效的 CSS 長度值或計算式 |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --container-3xs: 16rem;     /* 256px */
  --container-2xs: 18rem;     /* 288px */
  --container-xs: 20rem;`     /* 320px */
  --container-sm: 24rem;`     /* 384px */
  --container-md: 28rem;`     /* 448px */
  --container-lg: 32rem;`     /* 512px */
  --container-xl: 36rem;`     /* 576px */
  --container-2xl: 42rem;     /* 672px */
  --container-3xl: 48rem;     /* 768px */
  --container-4xl: 56rem;     /* 896px */
  --container-5xl: 64rem;     /* 1024px */
  --container-6xl: 72rem;     /* 1152px */
  --container-7xl: 80rem;     /* 1280px */
}
```

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

| 類別名稱                | CSS 屬性                                  | 說明                                           |
| ----------------------- | ----------------------------------------- | ---------------------------------------------- |
| `w-<number>`            | `width: calc(var(--spacing) * <number>);` | 以 spacing 級距寬度                            |
| `w-<fraction>`          | `width: calc(<fraction> * 100%);`         | 以分數百分比寬度（如 1/2、1/3）                |
| `w-<size>`              | `width: var(--container-<size>);`         | 指定寬度容器，從 16rem(256px) 到 80rem(1280px) |
| `w-auto`                | `width: auto;`                            | 內容決定寬度                                   |
| `w-px`                  | `width: 1px;`                             | 1px 寬度                                       |
| `w-full`                | `width: 100%;`                            | 充滿容器                                       |
| `w-screen`              | `width: 100vw;`                           | 100% 視口寬                                    |
| `w-dvw`                 | `width: 100dvw;`                          | 動態視口寬（行動裝置）                         |
| `w-dvh`                 | `width: 100dvh;`                          | 動態視口高（行動裝置）                         |
| `w-lvw`                 | `width: 100lvw;`                          | 大視口寬（Large Viewport Width）               |
| `w-lvh`                 | `width: 100lvh;`                          | 大視口高（Large Viewport Height）              |
| `w-svw`                 | `width: 100svw;`                          | 小視口寬（Small Viewport Width）               |
| `w-svh`                 | `width: 100svh;`                          | 小視口高（Small Viewport Height）              |
| `w-min`                 | `width: min-content;`                     | 以最小內容寬度                                 |
| `w-max`                 | `width: max-content;`                     | 以最大內容寬度                                 |
| `w-fit`                 | `width: fit-content;`                     | 自適應內容寬度                                 |
| `w-(<custom-property>)` | `width: var(<custom-property>);`          | 使用 CSS 變數                                  |
| `w-[<value>]`           | `width: <value>;`                         | 任意自訂值                                     |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --container-3xs: 16rem;     /* 256px */
  --container-2xs: 18rem;     /* 288px */
  --container-xs: 20rem;`     /* 320px */
  --container-sm: 24rem;`     /* 384px */
  --container-md: 28rem;`     /* 448px */
  --container-lg: 32rem;`     /* 512px */
  --container-xl: 36rem;`     /* 576px */
  --container-2xl: 42rem;     /* 672px */
  --container-3xl: 48rem;     /* 768px */
  --container-4xl: 56rem;     /* 896px */
  --container-5xl: 64rem;     /* 1024px */
  --container-6xl: 72rem;     /* 1152px */
  --container-7xl: 80rem;     /* 1280px */
}
```

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

| 類別名稱                    | CSS 屬性                                      | 說明                                      |
| --------------------------- | --------------------------------------------- | ----------------------------------------- |
| `min-w-<number>`            | `min-width: calc(var(--spacing) * <number>);` | 以 spacing 級距設定最小寬度               |
| `min-w-<fraction>`          | `min-width: calc(<fraction> * 100%);`         | 以分數百分比設定最小寬度                  |
| `min-w-<size>`              | `min-width: var(--container-<size>);`         | 以預設容器寬度設定最小寬度（16rem~80rem） |
| `min-w-auto`                | `min-width: auto;`                            | 由瀏覽器自動決定最小寬度                  |
| `min-w-px`                  | `min-width: 1px;`                             | 最小寬度為 1px                            |
| `min-w-0`                   | `min-width: 0;`                               | 允許內容壓縮至 0 寬度                     |
| `min-w-full`                | `min-width: 100%;`                            | 最小寬度為父容器寬度                      |
| `min-w-screen`              | `min-width: 100vw;`                           | 最小寬度為視口寬度                        |
| `min-w-dvw`                 | `min-width: 100dvw;`                          | 最小寬度為動態視口寬（行動裝置適用）      |
| `min-w-dvh`                 | `min-width: 100dvh;`                          | 最小寬度為動態視口高（較少用於寬度）      |
| `min-w-lvw`                 | `min-width: 100lvw;`                          | 最小寬度為大視口寬                        |
| `min-w-lvh`                 | `min-width: 100lvh;`                          | 最小寬度為大視口高（較少用於寬度）        |
| `min-w-svw`                 | `min-width: 100svw;`                          | 最小寬度為小視口寬                        |
| `min-w-svh`                 | `min-width: 100svh;`                          | 最小寬度為小視口高（較少用於寬度）        |
| `min-w-min`                 | `min-width: min-content;`                     | 最小寬度為內容最小尺寸                    |
| `min-w-max`                 | `min-width: max-content;`                     | 最小寬度為內容最大尺寸                    |
| `min-w-fit`                 | `min-width: fit-content;`                     | 最小寬度自適應內容                        |
| `min-w-(<custom-property>)` | `min-width: var(<custom-property>);`          | 以自訂 CSS 變數設定最小寬度               |
| `min-w-[<value>]`           | `min-width: <value>;`                         | 以任意自訂值設定最小寬度                  |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --container-3xs: 16rem;     /* 256px */
  --container-2xs: 18rem;     /* 288px */
  --container-xs: 20rem;`     /* 320px */
  --container-sm: 24rem;`     /* 384px */
  --container-md: 28rem;`     /* 448px */
  --container-lg: 32rem;`     /* 512px */
  --container-xl: 36rem;`     /* 576px */
  --container-2xl: 42rem;     /* 672px */
  --container-3xl: 48rem;     /* 768px */
  --container-4xl: 56rem;     /* 896px */
  --container-5xl: 64rem;     /* 1024px */
  --container-6xl: 72rem;     /* 1152px */
  --container-7xl: 80rem;     /* 1280px */
}
```

## max-width
限制元素最大寬度，常用於排版容器、段落內容寬。

| 類別名稱                    | CSS 屬性                                                                                                                                                                                                                                                                      | 說明                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `max-w-<number>`            | `max-width: calc(var(--spacing) * <number>);`                                                                                                                                                                                                                                 | 以 spacing 級距設定最大寬度                                 |
| `max-w-<fraction>`          | `max-width: calc(<fraction> * 100%);`                                                                                                                                                                                                                                         | 以分數百分比設定最大寬度（如 1/2、1/3 等）                  |
| `max-w-<size>`              | `max-width: var(--container-<size>);`                                                                                                                                                                                                                                         | 以預設容器寬度設定最大寬度（16rem~80rem）                   |
| `max-w-none`                | `max-width: none;`                                                                                                                                                                                                                                                            | 不限制最大寬度                                              |
| `max-w-px`                  | `max-width: 1px;`                                                                                                                                                                                                                                                             | 最大寬度為 1px                                              |
| `max-w-full`                | `max-width: 100%;`                                                                                                                                                                                                                                                            | 最大寬度為父容器寬度                                        |
| `max-w-dvw`                 | `max-width: 100dvw;`                                                                                                                                                                                                                                                          | 最大寬度為動態視口寬（支援行動裝置瀏覽器 UI 變化）          |
| `max-w-dvh`                 | `max-width: 100dvh;`                                                                                                                                                                                                                                                          | 最大寬度為動態視口高（較少用於寬度，通常用於高度）          |
| `max-w-lvw`                 | `max-width: 100lvw;`                                                                                                                                                                                                                                                          | 最大寬度為大視口寬（large viewport width）                  |
| `max-w-lvh`                 | `max-width: 100lvh;`                                                                                                                                                                                                                                                          | 最大寬度為大視口高（large viewport height，較少用於寬度）   |
| `max-w-svw`                 | `max-width: 100svw;`                                                                                                                                                                                                                                                          | 最大寬度為小視口寬（small viewport width）                  |
| `max-w-svh`                 | `max-width: 100svh;`                                                                                                                                                                                                                                                          | 最大寬度為小視口高（small viewport height，較少用於寬度）   |
| `max-w-screen`              | `max-width: 100vw;`                                                                                                                                                                                                                                                           | 最大寬度為視口寬度                                          |
| `max-w-min`                 | `max-width: min-content;`                                                                                                                                                                                                                                                     | 最大寬度為內容最小尺寸（依內容自動縮小）                    |
| `max-w-max`                 | `max-width: max-content;`                                                                                                                                                                                                                                                     | 最大寬度為內容最大尺寸（依內容自動放大）                    |
| `max-w-fit`                 | `max-width: fit-content;`                                                                                                                                                                                                                                                     | 最大寬度自適應內容                                          |
| `container`                 | `width: 100%;`<br>`@media (width >= 40rem) { max-width: 40rem; }`<br>`@media (width >= 48rem) { max-width: 48rem; }`<br>`@media (width >= 64rem) { max-width: 64rem; }`<br>`@media (width >= 80rem) { max-width: 80rem; }`<br>`@media (width >= 96rem) { max-width: 96rem; }` | 響應式容器，根據螢幕斷點自動調整最大寬度，並預設為寬度 100% |
| `max-w-(<custom-property>)` | `max-width: var(<custom-property>);`                                                                                                                                                                                                                                          | 以自訂 CSS 變數設定最大寬度                                 |
| `max-w-[<value>]`           | `max-width: <value>;`                                                                                                                                                                                                                                                         | 以任意自訂值設定最大寬度                                    |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --container-3xs: 16rem;     /* 256px */
  --container-2xs: 18rem;     /* 288px */
  --container-xs: 20rem;`     /* 320px */
  --container-sm: 24rem;`     /* 384px */
  --container-md: 28rem;`     /* 448px */
  --container-lg: 32rem;`     /* 512px */
  --container-xl: 36rem;`     /* 576px */
  --container-2xl: 42rem;     /* 672px */
  --container-3xl: 48rem;     /* 768px */
  --container-4xl: 56rem;     /* 896px */
  --container-5xl: 64rem;     /* 1024px */
  --container-6xl: 72rem;     /* 1152px */
  --container-7xl: 80rem;     /* 1280px */
}
```

```html
<div class="max-w-[220px]"></div>
<div class="max-w-(--my-max-width)"></div>
```

{% note info %}
**小技巧：** 以 `mx-auto + max-w-*` 形成常見的置中版心；可搭配 `px-*` 提供內邊距。
{% endnote %}

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
字體排版（Typography）相關的類別用於控制文字的外觀、結構與可讀性。這些工具涵蓋字體家族、字級、行高、字重、字距、對齊等，讓你能夠快速打造具有一致性與美感的排版效果。以下將依功能分類，詳細說明常用的 TailwindCSS 字體排版類別與用法。

## font-family
用於設定字體家族，支援主題變數、任意值與邏輯回退。

| 類別名稱                   | CSS 屬性                               | 說明     |
| -------------------------- | -------------------------------------- | -------- |
| `font-sans`                | `font-family: var(--font-sans);`       | 無襯線   |
| `font-serif`               | `font-family: var(--font-serif);`      | 襯線     |
| `font-mono`                | `font-family: var(--font-mono);`       | 等寬     |
| `font-(<custom-property>)` | `font-family: var(<custom-property>);` | CSS 變數 |
| `font-[<value>]`           | `font-family: <value>;`                | 任意值   |

{% note info %}
**TailwindCSS 字體預設變數說明**
- `--font-sans` 預設對應：
`ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`
- `--font-serif` 預設對應：
`ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`
- `--font-mono` 預設對應：
`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`

這些變數可於 `@theme` 進行全域覆蓋，確保全站字體一致性，並支援各平台字體 fallback。
{% endnote %}

```html
<h1 class="font-sans">Sans</h1>
<p class="font-[Open_Sans]"></p>
<p class="font-(family-name:--my-font)"></p>
```

### 自訂
自訂方法說明：
- Google Fonts 整合：`@import` 必須放在 `@import "tailwindcss"` 之前
- 主題變數：`--font-display` 定義後可直接使用 `font-display` 類別
- 字體特性：`--font-display--font-feature-settings` 啟用 OpenType 特性
- 字體變化：`--font-display--font-variation-settings` 控制光學尺寸
- 本地字體：`@font-face` 載入專案內的字體檔案

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import "tailwindcss";

@theme {
  --font-display: "Oswald", sans-serif;
  --font-display--font-feature-settings: "cv02", "cv03", "cv04", "cv11"; 
  --font-display--font-variation-settings: "opsz" 32; 
  --font-roboto: "Roboto", sans-serif; 
}

@font-face {
  font-family: Oswald;
  font-style: normal;
  font-weight: 200 700;
  font-display: swap;
  src: url("/fonts/Oswald.woff2") format("woff2");
}
```
```html
<div class="font-display">使用 Oswald 字體</div>
<div class="font-roboto">使用 Google Roboto 字體</div>
```

{% note info %}
**字體特性與變化設定說明：**
font-feature-settings（OpenType 字體特性）可啟用字體內建的進階排版功能，例如連字（"cv02"）、數字樣式（"cv03"）、分數顯示（"cv04"）與序數顯示（"cv11"）等。設定方式如：

`--font-display--font-feature-settings: "cv02", "cv03", "cv04", "cv11"`，即可同時啟用多種特性。

font-variation-settings 則用於控制可變字體的參數，包括字重（"wght"）、字寬（"wdth"）、光學尺寸（"opsz"）等。例如設定 `"opsz" 32` 可根據螢幕尺寸自動調整光學尺寸，`"wght" 400` 控制字重，`"wdth" 100` 則調整字寬。使用方式如：

`--font-display--font-variation-settings: "opsz" 32`。

以下為實際應用範例：
```css
@theme {
  --font-display: "Inter", sans-serif;
  --font-display--font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  --font-display--font-variation-settings: "opsz" 32, "wght" 400;
}
```

這樣設定後，`font-display` 類別會自動啟用連字、數字樣式等進階功能，並根據螢幕尺寸自動調整字體的光學特性。
{% endnote %}

## font-size
設定字體大小，支援 line-height 修飾符與任意值。

| 類別名稱                          | CSS 屬性與對應值                                                                    | 說明                  |
| --------------------------------- | ----------------------------------------------------------------------------------- | --------------------- |
| `text-<size>`                     | `font-size: var(--text-<size>);`<br>`line-height: var(--text-<size>--line-height);` | 設定字體大小          |
| `text-(length:<custom-property>)` | `font-size: var(<custom-property>);`                                                | 使用自訂 CSS 變數長度 |
| `text-[<value>]`                  | `font-size: <value>;`                                                               | 任意值                |

```css
:root {
  /* 定義 Tailwind CSS 字級與行高的 CSS 變數 */
  --text-xs: .75rem;
  --text-xs--line-height: calc(1 / .75);
  --text-sm: .875rem;
  --text-sm--line-height: calc(1.25 / .875);
  --text-base: 1rem;
  --text-base--line-height: calc(1.5 / 1);
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: calc(2.25 / 1.875);
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-6xl: 3.75rem;
  --text-6xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --text-8xl: 6rem;
  --text-8xl--line-height: 1;
  --text-9xl: 8rem;
  --text-9xl--line-height: 1;
}
```

```html
<p class="text-[14px]"></p>
<p class="text-(length:--my-text-size)"></p>
```

### 更改行高
使用 text-*時 line-height 修飾符來更改行高，例如 `text-lg/relaxed` 或 `text-2xl/loose`。

```html
<p class="text-sm/6">So I started to walk into the water...</p>
<p class="text-sm/7">So I started to walk into the water...</p>
<p class="text-sm/8">So I started to walk into the water...</p>
```

### 自訂
```css
@theme {
  --text-tiny: 0.625rem;
  --text-tiny--line-height: 1.5rem; 
  --text-tiny--letter-spacing: 0.125rem; 
  --text-tiny--font-weight: 500; 
}
```
```html
<!-- 
  font-size: 0.625rem;        (10px)
  line-height: 1.5rem;        (24px)
  letter-spacing: 0.125rem;   (2px)
  font-weight: 500;           (medium)
-->
<div class="text-tiny">自訂字體大小</div>
```

## font-smoothing
控制次像素平滑渲染（WebKit 與 macOS 專用語義）。

| 類別名稱               | CSS 屬性                                                                        | 說明                                   |
| ---------------------- | ------------------------------------------------------------------------------- | -------------------------------------- |
| `antialiased`          | `-webkit-font-smoothing: antialiased;`<br>`-moz-osx-font-smoothing: grayscale;` | 文字抗鋸齒，提升字體平滑度（預設建議） |
| `subpixel-antialiased` | `-webkit-font-smoothing: auto;`<br>`-moz-osx-font-smoothing: auto;`             | 使用次像素抗鋸齒，適合部分螢幕顯示     |

## font-style
font-style 主要用於設定文字是否傾斜。這個屬性常見於強調重點、引用或設計排版時，能讓文字呈現不同的視覺效果。

| 類別名稱     | CSS 屬性              | 說明             |
| ------------ | --------------------- | ---------------- |
| `italic`     | `font-style: italic;` | 斜體             |
| `not-italic` | `font-style: normal;` | 取消斜體（正常） |

## font-weight
font-weight（字重）用於設定文字的粗細程度，常見於標題、重點字詞或設計排版時，能有效提升層次感與可讀性。

| 類別名稱                   | CSS 屬性                               | 說明          |
| -------------------------- | -------------------------------------- | ------------- |
| `font-thin`                | `font-weight: 100;`                    | 字重 100      |
| `font-extralight`          | `font-weight: 200;`                    | 字重 200      |
| `font-light`               | `font-weight: 300;`                    | 字重 300      |
| `font-normal`              | `font-weight: 400;`                    | 字重 400      |
| `font-medium`              | `font-weight: 500;`                    | 字重 500      |
| `font-semibold`            | `font-weight: 600;`                    | 字重 600      |
| `font-bold`                | `font-weight: 700;`                    | 字重 700      |
| `font-extrabold`           | `font-weight: 800;`                    | 字重 800      |
| `font-black`               | `font-weight: 900;`                    | 字重 900      |
| `font-(<custom-property>)` | `font-weight: var(<custom-property>);` | 自訂 CSS 變數 |
| `font-[<value>]`           | `font-weight: <value>;`                | 任意數值      |

```html
<p class="font-[1000]"></p>
<p class="font-(--my-font-weight)"></p>
```

### 自訂
```css
@theme {
  --font-weight-extrablack: 1000; 
}
```
```html
<div class="font-extrablack"></div>
```

## font-stretch
font-stretch（字體寬度）用於調整字體的橫向拉伸程度，讓文字呈現更窄或更寬的視覺效果。這在設計標題、LOGO 或需要特殊排版時非常實用，能有效增強版面變化與層次感。

| 類別名稱                           | CSS 屬性                                | 說明               |
| ---------------------------------- | --------------------------------------- | ------------------ |
| `font-stretch-ultra-condensed`     | `font-stretch: ultra-condensed;`        | 超極度縮窄（50%）  |
| `font-stretch-extra-condensed`     | `font-stretch: extra-condensed;`        | 極度縮窄（62.5%）  |
| `font-stretch-condensed`           | `font-stretch: condensed;`              | 縮窄（75%）        |
| `font-stretch-semi-condensed`      | `font-stretch: semi-condensed;`         | 略縮窄（87.5%）    |
| `font-stretch-normal`              | `font-stretch: normal;`                 | 正常寬度（100%）   |
| `font-stretch-semi-expanded`       | `font-stretch: semi-expanded;`          | 略擴張（112.5%）   |
| `font-stretch-expanded`            | `font-stretch: expanded;`               | 擴張（125%）       |
| `font-stretch-extra-expanded`      | `font-stretch: extra-expanded;`         | 極度擴張（150%）   |
| `font-stretch-ultra-expanded`      | `font-stretch: ultra-expanded;`         | 超極度擴張（200%） |
| `font-stretch-<percentage>`        | `font-stretch: <percentage>;`           | 指定百分比         |
| `font-stretch-(<custom-property>)` | `font-stretch: var(<custom-property>);` | 自訂 CSS 變數      |
| `font-stretch-[<value>]`           | `font-stretch: <value>;`                | 任意值             |

```html
<p class="font-stretch-extra-condensed"></p>
<p class="font-stretch-50%"></p>
<p class="font-stretch-[66.66%]"></p>
<p class="font-stretch-(--my-font-width)"></p>
```

## font-variant-numeric
font-variant-numeric（數字字型變體）用於控制數字在字體中的顯示方式，例如序數、斜線零、等寬或比例數字等。這對於設計發票、表格、時間顯示等需要精確數字排版的場景特別有幫助，能提升數字的可讀性與美觀度。

| 類別名稱             | CSS 屬性                                    | 說明                     |
| -------------------- | ------------------------------------------- | ------------------------ |
| `normal-nums`        | `font-variant-numeric: normal;`             | 預設數字樣式             |
| `ordinal`            | `font-variant-numeric: ordinal;`            | 序數（如 1st, 2nd）      |
| `slashed-zero`       | `font-variant-numeric: slashed-zero;`       | 斜線 0（區分 O 與 0）    |
| `lining-nums`        | `font-variant-numeric: lining-nums;`        | 對齊數字（數字高度一致） |
| `oldstyle-nums`      | `font-variant-numeric: oldstyle-nums;`      | 懷舊數字（上下起伏）     |
| `proportional-nums`  | `font-variant-numeric: proportional-nums;`  | 比例數字（寬度不一）     |
| `tabular-nums`       | `font-variant-numeric: tabular-nums;`       | 等寬數字（方便對齊）     |
| `diagonal-fractions` | `font-variant-numeric: diagonal-fractions;` | 斜線分數（如 1⁄2）       |
| `stacked-fractions`  | `font-variant-numeric: stacked-fractions;`  | 堆疊分數（如 ½）         |

### 組合特性
`font-variant-numeric` 相關的 Tailwind CSS 類別可以**組合使用**，例如同時套用 `ordinal`、`slashed-zero`、`tabular-nums` 等，Tailwind 會自動合併這些 CSS 特性，對應到 CSS 變數 `var(--tw-ordinal, )`、`var(--tw-slashed-zero, )`、`var(--tw-numeric-figure, )`、`var(--tw-numeric-spacing, )`、`var(--tw-numeric-fraction, )`。這讓你能夠靈活控制數字的顯示方式，滿足各種排版需求。

```css
/* tailwind CSS 效果 */
.tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric:
      var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
```

```html
<!-- 發票表格：使用等寬數字和斜線零，確保對齊 -->
<dl class="space-y-2">
  <dt class="font-medium">小計</dt>
  <dd class="text-right slashed-zero tabular-nums">$100.00</dd>
  <dt class="font-medium">稅金</dt>
  <dd class="text-right slashed-zero tabular-nums">$14.50</dd>
  <dt class="font-bold">總計</dt>
  <dd class="text-right slashed-zero tabular-nums">$114.50</dd>
</dl>
```

{% note info %}
**組合使用技巧：**
- **財務表格**：`slashed-zero tabular-nums` 確保數字對齊和零的識別
- **序數分數**：`ordinal stacked-fractions` 提升專業排版效果
- **時間顯示**：`tabular-nums` 讓數字垂直對齊，提升可讀性
- **響應式設計**：可搭配 `sm:`、`md:` 等斷點調整數字樣式
{% endnote %}

## letter-spacing
用來快速調整文字字母之間的間距。這對於標題、LOGO 或需要特殊排版的情境特別實用。你可以選擇預設的間距等級，也能自訂任意值，靈活滿足設計需求。

| 類別名稱                | CSS 屬性                                   | 說明                  |
| ----------------------- | ------------------------------------------ | --------------------- |
| `tracking-tighter`      | `letter-spacing: var(--tracking-tighter);` | 字距 -0.05em          |
| `tracking-tight`        | `letter-spacing: var(--tracking-tight);`   | 字距 -0.025em         |
| `tracking-normal`       | `letter-spacing: var(--tracking-normal);`  | 字距 0em              |
| `tracking-wide`         | `letter-spacing: var(--tracking-wide);`    | 字距 0.025em          |
| `tracking-wider`        | `letter-spacing: var(--tracking-wider);`   | 字距 0.05em           |
| `tracking-widest`       | `letter-spacing: var(--tracking-widest);`  | 字距 0.1em            |
| `tracking-(<property>)` | `letter-spacing: var(<property>);`         | 自訂 CSS 變數控制字距 |
| `tracking-[<value>]`    | `letter-spacing: <value>;`                 | 任意自訂字距          |

```html
<p class="tracking-[.25em]"></p>
<p class="tracking-(--my-tracking)"></p>
```

### 自訂
```css
@theme {
  --tracking-tightest: -0.075em; 
}
```
```html
<p class="tracking-tightest"></p>
```

## line-clamp
以多行截斷顯示省略號。

| 類別名稱                         | CSS 屬性                                                                                                                           | 說明                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `line-clamp-<number>`            | `overflow: hidden;`<br>`display: -webkit-box;`<br>`-webkit-box-orient: vertical;`<br>`-webkit-line-clamp: <number>;`               | 多行截斷，顯示省略號      |
| `line-clamp-none`                | `overflow: visible;`<br>`display: block;`<br>`-webkit-box-orient: horizontal;`<br>`-webkit-line-clamp: unset;`                     | 取消截斷，顯示完整內容    |
| `line-clamp-(<custom-property>)` | `overflow: hidden;`<br>`display: -webkit-box;`<br>`-webkit-box-orient: vertical;`<br>`-webkit-line-clamp: var(<custom-property>);` | 使用 CSS 變數自訂截斷行數 |
| `line-clamp-[<value>]`           | `overflow: hidden;`<br>`display: -webkit-box;`<br>`-webkit-box-orient: vertical;`<br>`-webkit-line-clamp: <value>;`                | 任意自訂行數截斷          |

```html
<p class="line-clamp-[calc(var(--characters)/100)]"></p>
<p class="line-clamp-(--my-line-count)"></p>
```

## line-height
用來設定行高（line-height），影響多行文字的垂直間距。Tailwind CSS 提供多種預設行高等級，也支援自訂任意數值，讓排版更靈活，常用於段落、標題或特殊排版需求。

| 類別名稱                          | CSS 屬性                                                                | 說明                            |
| --------------------------------- | ----------------------------------------------------------------------- | ------------------------------- |
| `text-<size>/<number>`            | `font-size: <size>;`<br>`line-height: calc(var(--spacing) * <number>);` | 設定字體大小與行高（倍數）      |
| `text-<size>/(<custom-property>)` | `font-size: <size>;`<br>`line-height: var(<custom-property>);`          | 設定字體大小與自訂 CSS 變數行高 |
| `text-<size>/[<value>]`           | `font-size: <size>;`<br>`line-height: <value>;`                         | 設定字體大小與任意行高          |
| `leading-none`                    | `line-height: 1;`                                                       | 無行距                          |
| `leading-<number>`                | `line-height: calc(var(--spacing) * <number>);`                         | 以 spacing 變數倍數設定行高     |
| `leading-(<custom-property>)`     | `line-height: var(<custom-property>);`                                  | 使用 CSS 變數自訂行高           |
| `leading-[<value>]`               | `line-height: <value>;`                                                 | 任意自訂行高                    |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --spacing: .25rem;

  --text-xs: .75rem;
  --text-sm: .875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --text-7xl: 4.5rem;
  --text-8xl: 6rem;
  --text-9xl: 8rem;
}
```

```html
<p class="text-base/6"></p>
<p class="text-sm leading-6"></p>
<p class="text-2xl leading-none"></p>
<p class="leading-[1.5]"></p>
<p class="leading-(--my-line-height)"></p>
```

## list-style-image
list-style-image 用來設定清單項目的圖示圖片，可自訂圖片 URL 或移除預設圖示。常用於美化清單外觀，讓列表更具視覺特色。

| 類別名稱                         | CSS 屬性                                    | 說明                     |
| -------------------------------- | ------------------------------------------- | ------------------------ |
| `list-image-[<value>]`           | `list-style-image: <value>;`                | 使用任意圖片作為清單圖示 |
| `list-image-(<custom-property>)` | `list-style-image: var(<custom-property>);` | 使用 CSS 變數自訂圖示    |
| `list-image-none`                | `list-style-image: none;`                   | 移除清單圖示             |

```html
<ul class="list-image-[url(/img/checkmark.png)]">
  <!-- -->
</ul>

<ul class="list-image-(--my-list-image)">
  <!-- -->
</ul>

```

## list-style-position
list-style-position 用來設定清單項目符號（如圓點、數字）的位置，可以選擇在內容區塊內部（inside）或外部（outside）。這對於調整清單縮排與排版細節非常實用，尤其在設計自訂清單樣式時常用。

| 類別名稱       | CSS 屬性                        | 說明                       |
| -------------- | ------------------------------- | -------------------------- |
| `list-inside`  | `list-style-position: inside;`  | 清單符號顯示在內容區塊內部 |
| `list-outside` | `list-style-position: outside;` | 清單符號顯示在內容區塊外部 |

## list-style-type
list-style-type 用來設定清單項目的符號樣式，例如圓點（disc）、數字（decimal）或自訂符號。這個屬性常用於調整有序（ol）或無序（ul）清單的外觀，讓列表更符合設計需求。

| 類別名稱                   | CSS 屬性                                   | 說明                                  |
| -------------------------- | ------------------------------------------ | ------------------------------------- |
| `list-none`                | `list-style-type: none;`                   | 移除清單符號                          |
| `list-disc`                | `list-style-type: disc;`                   | 使用實心圓點作為清單符號              |
| `list-decimal`             | `list-style-type: decimal;`                | 使用數字作為清單符號                  |
| `list-(<custom-property>)` | `list-style-type: var(<custom-property>);` | 使用 CSS 變數自訂清單符號樣式         |
| `list-[<value>]`           | `list-style-type: <value>;`                | 任意自訂清單符號（如 square、circle） |

```html
<ul class="list-disc">
  <!-- -->
</ul>
<ol class="list-decimal">
  <!-- -->
</ol>
<ul class="list-none">
  <!-- -->
</ul>
<ol class="list-[upper-roman]">
  <!-- -->
</ol>
<ol class="list-(--my-marker)">
  <!-- -->
</ol>
```

## text-align
text-align 用來設定文字的水平對齊方式，常見於段落、標題或表格欄位。Tailwind CSS 提供多種對齊類別，方便快速調整文字排版，支援左對齊、置中、右對齊、兩端對齊，以及根據書寫方向的 start/end 對齊。

| 類別名稱       | CSS 屬性               | 說明                               |
| -------------- | ---------------------- | ---------------------------------- |
| `text-left`    | `text-align: left;`    | 文字靠左對齊                       |
| `text-center`  | `text-align: center;`  | 文字置中對齊                       |
| `text-right`   | `text-align: right;`   | 文字靠右對齊                       |
| `text-justify` | `text-align: justify;` | 文字兩端對齊，行寬自動分配         |
| `text-start`   | `text-align: start;`   | 依據書寫方向起始端對齊（LTR 為左） |
| `text-end`     | `text-align: end;`     | 依據書寫方向結束端對齊（LTR 為右） |

## color
對應文字顏色（支援透明度後綴`/50`百分比值）。

| 類別名稱                   | CSS 屬性                              | 說明                        |
| -------------------------- | ------------------------------------- | --------------------------- |
| `text-inherit`             | `color: inherit;`                     | 繼承父元素文字顏色          |
| `text-current`             | `color: currentColor;`                | 使用當前元素的 currentColor |
| `text-transparent`         | `color: transparent;`                 | 文字顏色透明                |
| `text-black`               | `color: var(--color-black);`          | 黑色文字（#000）            |
| `text-white`               | `color: var(--color-white);`          | 白色文字（#fff）            |
| `text-<color>-<step>`      | `color: var(--color-<color>-<step>);` | 指定色 step                 |
| `text-(<custom-property>)` | `color: var(<custom-property>);`      | 使用 CSS 變數自訂文字顏色   |
| `text-[<value>]`           | `color: <value>;`                     | 任意自訂文字顏色            |

{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

```html
<p class="text-blue-600 dark:text-sky-400"></p>
<p class="text-blue-600/50 dark:text-sky-400/50"></p>
<p class="text-[#50d71e]"></p>
<p class="text-(--my-color)"></p>
```

### 自訂
```css
@theme {
  --color-regal-blue: #243c5a; 
}
```
```html
<p class="text-regal-blue"></p>
```

## text-decoration-line
用於設定文字的裝飾線類型，例如底線、上劃線或刪除線。這些類別可讓你快速為文字加上不同的裝飾效果，常用於強調、標示或修飾文字內容。

| 類別名稱       | CSS 屬性                              | 說明               |
| -------------- | ------------------------------------- | ------------------ |
| `underline`    | `text-decoration-line: underline;`    | 加上底線           |
| `overline`     | `text-decoration-line: overline;`     | 加上上劃線         |
| `line-through` | `text-decoration-line: line-through;` | 加上刪除線         |
| `no-underline` | `text-decoration-line: none;`         | 移除所有文字裝飾線 |

## text-decoration-color
用於設定文字裝飾線的顏色。你可以搭配 Tailwind 的顏色類別（如 `decoration-blue-500`、`decoration-rose-400` 等）來快速變更底線、上劃線或刪除線的顏色，讓裝飾線與主文字顏色區分。

| 類別名稱                    | CSS 屬性                                              | 說明                         |
| --------------------------- | ----------------------------------------------------- | ---------------------------- |
| `decoration-inherit`        | `text-decoration-color: inherit;`                     | 繼承父元素的文字裝飾線顏色   |
| `decoration-current`        | `text-decoration-color: currentColor;`                | 使用當前元素的文字顏色       |
| `decoration-transparent`    | `text-decoration-color: transparent;`                 | 裝飾線顏色透明               |
| `decoration-black`          | `text-decoration-color: var(--color-black);`          | 黑色裝飾線（#000）           |
| `decoration-white`          | `text-decoration-color: var(--color-white);`          | 白色裝飾線（#fff）           |
| `decoration-<color>-<step>` | `text-decoration-color: var(--color-<color>-<step>);` | 指定顏色 <step> 階段的裝飾線 |
| `decoration-(--自訂變數）`  | `text-decoration-color: var(--自訂變數）;`            | 使用 CSS 變數自訂裝飾線顏色  |
| `decoration-[<value>]`      | `text-decoration-color: <value>;`                     | 任意自訂裝飾線顏色           |
{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

可以使用透明度（如 `decoration-blue-500/50`）或自訂顏色（如 `decoration-[#ff00ff]`）來調整裝飾線顏色。

```html
<a class="underline decoration-indigo-500/30"></a>
<p class="underline hover:decoration-pink-500"></p>
<p class="decoration-[#50d71e]"></p>
<p class="decoration-(--my-color)"></p>
```

### 自訂
```css
@theme {
  --color-regal-blue: #243c5a; 
}
```
```html
<p class="decoration-regal-blue"></p>
```

## text-decoration-style
用於設定底線、上劃線等裝飾線的線條樣式，讓你可以快速切換不同的線條效果，常見於連結、強調文字等場景。

| 類別名稱            | CSS 屬性                         | 說明         |
| ------------------- | -------------------------------- | ------------ |
| `decoration-solid`  | `text-decoration-style: solid;`  | 實線（預設） |
| `decoration-double` | `text-decoration-style: double;` | 雙線         |
| `decoration-dotted` | `text-decoration-style: dotted;` | 點狀虛線     |
| `decoration-dashed` | `text-decoration-style: dashed;` | 虛線         |
| `decoration-wavy`   | `text-decoration-style: wavy;`   | 波浪線       |

## text-decoration-thickness
用於調整底線、上劃線等裝飾線的線條粗細，讓裝飾線更符合設計需求，常見於連結、標題強調等情境。

| 類別名稱                                | CSS 屬性                                             | 說明                          |
| --------------------------------------- | ---------------------------------------------------- | ----------------------------- |
| `decoration-<number>`                   | `text-decoration-thickness: <number>px;`             | 指定像素粗細（如 1、2、4、8） |
| `decoration-from-font`                  | `text-decoration-thickness: from-font;`              | 依據字型自動決定              |
| `decoration-auto`                       | `text-decoration-thickness: auto;`                   | 自動（預設）                  |
| `decoration-(length:<custom-property>)` | `text-decoration-thickness: var(<custom-property>);` | 使用 CSS 變數自訂粗細         |
| `decoration-[<value>]`                  | `text-decoration-thickness: <value>;`                | 任意自訂粗細（如 3px、0.5em） |

```html
<p class="decoration-[0.25rem]"></p>
<p class="decoration-(length:--my-decoration-thickness)"></p>
```

## text-underline-offset
用於調整底線（underline）與文字之間的垂直間距，讓底線不會太貼近或太遠於文字本身，常見於設計細節微調。

| 類別名稱                               | CSS 屬性                                         | 說明                                  |
| -------------------------------------- | ------------------------------------------------ | ------------------------------------- |
| `underline-offset-<number>`            | `text-underline-offset: <number>px;`             | 指定正向像素間距（如 1、2、4、8）     |
| `-underline-offset-<number>`           | `text-underline-offset: calc(<number>px * -1);`  | 指定負向像素間距（如 -1、-2、-4、-8） |
| `underline-offset-auto`                | `text-underline-offset: auto;`                   | 自動（預設）                          |
| `underline-offset-(<custom-property>)` | `text-underline-offset: var(<custom-property>);` | 使用 CSS 變數自訂間距                 |
| `underline-offset-[<value>]`           | `text-underline-offset: <value>;`                | 任意自訂間距（如 0.2em、3px、4%）     |

```html
<p class="underline-offset-[3px]"></p>
<p class="underline-offset-(--my-underline-offset)"></p>
```

## text-transform
用於設定文字的大小寫轉換，常見於標題、按鈕、標籤等需要統一字母格式的場景。

| 類別名稱      | CSS 屬性                      | 說明                   |
| ------------- | ----------------------------- | ---------------------- |
| `uppercase`   | `text-transform: uppercase;`  | 全部轉為大寫           |
| `lowercase`   | `text-transform: lowercase;`  | 全部轉為小寫           |
| `capitalize`  | `text-transform: capitalize;` | 每個單字首字母大寫     |
| `normal-case` | `text-transform: none;`       | 保持原始大小寫（預設） |

## text-overflow
用於控制當文字內容超出容器寬度時的顯示方式，常見於單行文字截斷、顯示省略號 (...) 等情境，提升版面整齊度與可讀性。

| 類別名稱        | CSS 屬性                                                                    | 說明                         |
| --------------- | --------------------------------------------------------------------------- | ---------------------------- |
| `truncate`      | `overflow: hidden;`<br>`text-overflow: ellipsis;`<br>`white-space: nowrap;` | 單行截斷並顯示省略號（...）  |
| `text-ellipsis` | `text-overflow: ellipsis;`                                                  | 超出時顯示省略號（...）      |
| `text-clip`     | `text-overflow: clip;`                                                      | 超出時直接裁切，不顯示省略號 |

## text-wrap
用於控制文字自動換行、斷詞或保持單行顯示，常見於響應式排版、標籤、按鈕等需要靈活處理長文字的場景。

| 類別名稱       | CSS 屬性              | 說明                               |
| -------------- | --------------------- | ---------------------------------- |
| `text-wrap`    | `text-wrap: wrap;`    | 允許自動換行（預設）               |
| `text-nowrap`  | `text-wrap: nowrap;`  | 不允許換行，單行顯示               |
| `text-balance` | `text-wrap: balance;` | 平衡多行文字寬度（需瀏覽器支援）   |
| `text-pretty`  | `text-wrap: pretty;`  | 更自然的斷詞與換行（需瀏覽器支援） |

## text-indent
用於設定段落或文字的首行縮排，常見於文章、報告、閱讀型內容，提升排版美觀與可讀性。

| 類別名稱                     | CSS 屬性                                         | 說明                                                  |
| ---------------------------- | ------------------------------------------------ | ----------------------------------------------------- |
| `indent-<number>`            | `text-indent: calc(var(--spacing) * <number>);`  | 依 Tailwind 間距單位指定正向縮排（如 1、2、4、8）     |
| `-indent-<number>`           | `text-indent: calc(var(--spacing) * -<number>);` | 依 Tailwind 間距單位指定負向縮排（如 -1、-2、-4、-8） |
| `indent-px`                  | `text-indent: 1px;`                              | 縮排 1px（極小單位，常用於微調）                      |
| `-indent-px`                 | `text-indent: -1px;`                             | 負縮排 1px                                            |
| `indent-(<custom-property>)` | `text-indent: var(<custom-property>);`           | 使用 CSS 變數自訂縮排                                 |
| `indent-[<value>]`           | `text-indent: <value>;`                          | 任意自訂縮排（如 2em、1.5rem、10%、8px 等）           |

```html
<p class="-indent-8"></p>
<p class="indent-[50%]"></p>
<p class="indent-(--my-indentation)"></p>
```

## vertical-align
用於設定行內元素（如圖片、icon、文字等）在行內的垂直對齊方式，常見於調整圖文混排、表格內容對齊等場景。

| 類別名稱                    | CSS 屬性                                  | 說明                                     |
| --------------------------- | ----------------------------------------- | ---------------------------------------- |
| `align-baseline`            | `vertical-align: baseline;`               | 與父元素基線對齊（預設）                 |
| `align-top`                 | `vertical-align: top;`                    | 與行框頂部對齊                           |
| `align-middle`              | `vertical-align: middle;`                 | 與父元素中線對齊                         |
| `align-bottom`              | `vertical-align: bottom;`                 | 與行框底部對齊                           |
| `align-text-top`            | `vertical-align: text-top;`               | 與父元素文字頂部對齊                     |
| `align-text-bottom`         | `vertical-align: text-bottom;`            | 與父元素文字底部對齊                     |
| `align-sub`                 | `vertical-align: sub;`                    | 下標對齊（如化學式、數學式下標）         |
| `align-super`               | `vertical-align: super;`                  | 上標對齊（如次方、數學式上標）           |
| `align-(<custom-property>)` | `vertical-align: var(<custom-property>);` | 使用 CSS 變數自訂對齊值（如 --my-align） |
| `align-[<value>]`           | `vertical-align: <value>;`                | 任意自訂對齊值（如 10px、2em、50% 等）   |

```html
<span class="align-[4px]"></span>
<span class="align-(--my-alignment)"></span>
```

## white-space
用於控制空白字元（如空格、換行、Tab）在元素中的顯示方式。常見於程式碼區塊、標籤、文章內容等需要特殊排版的場景，可決定文字是否自動換行、保留空白、強制單行等。

| 類別名稱                  | CSS 屬性                     | 說明                                     |
| ------------------------- | ---------------------------- | ---------------------------------------- |
| `whitespace-normal`       | `white-space: normal;`       | 預設，空白會合併，遇到邊界自動換行       |
| `whitespace-nowrap`       | `white-space: nowrap;`       | 不換行，所有內容強制顯示在同一行         |
| `whitespace-pre`          | `white-space: pre;`          | 保留所有空白與換行，不自動換行           |
| `whitespace-pre-line`     | `white-space: pre-line;`     | 合併空白，但保留換行符號                 |
| `whitespace-pre-wrap`     | `white-space: pre-wrap;`     | 保留空白與換行，必要時自動換行           |
| `whitespace-break-spaces` | `white-space: break-spaces;` | 保留所有空白，遇到邊界自動換行，支援斷詞 |

## word-break
用於控制單字在遇到邊界時的斷行方式，常見於處理長網址、英文單字、程式碼片段等，避免內容超出容器導致版面跑版。

| 類別名稱       | CSS 屬性                 | 說明                           |
| -------------- | ------------------------ | ------------------------------ |
| `break-normal` | `word-break: normal;`    | 預設行為，僅在必要時斷行       |
| `break-all`    | `word-break: break-all;` | 允許於任意字元斷行，適合長字串 |
| `break-keep`   | `word-break: keep-all;`  | 保持整體單字，不於單字內斷行   |

## overflow-wrap
用於控制單字在超出容器邊界時是否自動換行，避免內容溢出導致排版錯亂。常見於處理長網址、英文單字、程式碼片段等情境，與 `word-break` 類別搭配使用可提升排版彈性。

| 類別名稱          | CSS 屬性                     | 說明                       |
| ----------------- | ---------------------------- | -------------------------- |
| `wrap-break-word` | `overflow-wrap: break-word;` | 單字過長時強制換行         |
| `wrap-anywhere`   | `overflow-wrap: anywhere;`   | 任何地方都可換行（較少用） |
| `wrap-normal`     | `overflow-wrap: normal;`     | 預設行為，僅在必要時換行   |

## hyphens
用於控制自動斷字（hyphenation），讓瀏覽器在適當位置自動插入連字號，提升多語言長單字或文章排版的可讀性。常見於新聞、部落格、技術文件等需要美觀排版的場景。

| 類別名稱         | CSS 屬性           | 說明                       |
| ---------------- | ------------------ | -------------------------- |
| `hyphens-none`   | `hyphens: none;`   | 不自動斷字（預設）         |
| `hyphens-manual` | `hyphens: manual;` | 只在有手動斷字提示時才斷字 |
| `hyphens-auto`   | `hyphens: auto;`   | 自動根據語言規則進行斷字   |

## content
用於插入自訂內容（content），常見於 `::before`、`::after` 偽元素，讓你能在元素前後動態產生文字、符號或圖示。這些類別主要用於搭配 `before:`、`after:` 前綴，實現裝飾性或輔助性標記。

| 類別名稱                      | CSS 屬性                           | 說明                                  |
| ----------------------------- | ---------------------------------- | ------------------------------------- |
| `content-[<value>]`           | `content: <value>;`                | 插入自訂內容（需加引號）              |
| `content-(<custom-property>)` | `content: var(<custom-property>);` | 使用 CSS 變數自訂內容（需搭配偽元素） |
| `content-none`                | `content: none;`                   | 不產生任何內容（預設）                |

> value 底線會轉為文字，若需要底線則跳脫字元

```html
<p before="Hello World" class="before:content-[attr(before)]"></p>
<p class="before:content-['Hello_World']">Hello World</p>
<p class="before:content-['Hello\_World']">Hello_World</p>
<p class="content-(--my-content)"></p>
```

# Background
背景相關類別用於設定元素的背景屬性，包括顏色、圖片、位置、重複方式、尺寸等。這些類別讓你能快速調整背景效果，常見於版面設計、區塊強調、按鈕樣式等情境。

## background-attachment
用於設定背景圖片的滾動行為，決定背景是否隨網頁內容一同滾動，常見於製作視差滾動（parallax）、固定背景等設計。

| 類別名稱    | CSS 屬性                         | 說明                   |
| ----------- | -------------------------------- | ---------------------- |
| `bg-fixed`  | `background-attachment: fixed;`  | 背景固定不隨內容滾動   |
| `bg-local`  | `background-attachment: local;`  | 背景隨元素內容滾動     |
| `bg-scroll` | `background-attachment: scroll;` | 背景隨網頁滾動（預設） |

## background-clip
用於設定背景繪製的裁切範圍，決定背景顏色或背景圖片的顯示區域。常見於需要只顯示在文字、內邊距或整個區塊時使用，能搭配圓角、邊框等設計達到不同視覺效果。

| 類別名稱          | CSS 屬性                        | 說明                               |
| ----------------- | ------------------------------- | ---------------------------------- |
| `bg-clip-border`  | `background-clip: border-box;`  | 背景延伸至邊框（預設）             |
| `bg-clip-padding` | `background-clip: padding-box;` | 背景延伸至內邊距                   |
| `bg-clip-content` | `background-clip: content-box;` | 背景僅延伸至內容區域               |
| `bg-clip-text`    | `background-clip: text;`        | 背景僅顯示於文字（需搭配文字透明） |

{% note info %}
**小技巧：`bg-clip-text` 需搭配 `text-transparent` 使用，才能讓背景顯示於文字形狀內。**

```html
<p class="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent">
  Hello world
</p>
```
{% endnote %}

## background-color
背景顏色相關類別用於快速設定元素的背景顏色，支援 Tailwind 預設色階、透明度、CSS 變數與自訂顏色。常用於區塊、按鈕、卡片等元件的視覺強調。

| 類別名稱                 | CSS 屬性                                         | 說明                       |
| ------------------------ | ------------------------------------------------ | -------------------------- |
| `bg-inherit`             | `background-color: inherit;`                     | 繼承父元素背景色           |
| `bg-current`             | `background-color: currentColor;`                | 使用當前文字顏色作為背景色 |
| `bg-transparent`         | `background-color: transparent;`                 | 背景透明                   |
| `bg-black`               | `background-color: var(--color-black);`          | 黑色背景（#000）           |
| `bg-white`               | `background-color: var(--color-white);`          | 白色背景（#fff）           |
| `bg-<color>-<step>`      | `background-color: var(--color-<color>-<step>);` | 指定色 step                |
| `bg-(<custom-property>)` | `background-color: var(<custom-property>);`      | 使用 CSS 變數自訂背景色    |
| `bg-[<value>]`           | `background-color: <value>;`                     | 任意自訂背景色（           |

{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

可在顏色類別後加上 `/50`（0~100）調整透明度，例如 `bg-blue-500/50` 代表 50% 透明度。

```html
<button class="bg-sky-500/100"></button>
<div class="bg-[#50d71e]"></div>
<div class="bg-(--my-color)"></div>
```

### 自訂
```css
@theme {
  --color-regal-blue: #243c5a; 
}
```
```html
<div class="bg-regal-blue"></div>
```

## background-image
用於設定元素的背景圖片。Tailwind CSS 提供多種背景圖片類別，包含預設的 `none`、`gradient` 漸層、以及自訂圖片路徑。這些類別可快速為區塊、按鈕等元素加上背景圖案或漸層效果。

| 類別名稱                        | CSS 屬性                                                                               | 說明                                             |
| ------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `bg-[<value>]`                  | `background-image: <value>;`                                                           | 任意自訂背景圖片或漸層（如 url、gradient）       |
| `bg-(image:<custom-property>)`  | `background-image: var(<custom-property>);`                                            | 使用 CSS 變數自訂背景圖片                        |
| `bg-none`                       | `background-image: none;`                                                              | 無背景圖片                                       |
| `bg-linear-to-t`                | `background-image: linear-gradient(to top, var(--tw-gradient-stops));`                 | 線性漸層由下往上                                 |
| `bg-linear-to-tr`               | `background-image: linear-gradient(to top right, var(--tw-gradient-stops));`           | 線性漸層由左下到右上                             |
| `bg-linear-to-r`                | `background-image: linear-gradient(to right, var(--tw-gradient-stops));`               | 線性漸層由左往右                                 |
| `bg-linear-to-br`               | `background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));`        | 線性漸層由左上到右下                             |
| `bg-linear-to-b`                | `background-image: linear-gradient(to bottom, var(--tw-gradient-stops));`              | 線性漸層由上往下                                 |
| `bg-linear-to-bl`               | `background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));`         | 線性漸層由右上到左下                             |
| `bg-linear-to-l`                | `background-image: linear-gradient(to left, var(--tw-gradient-stops));`                | 線性漸層由右往左                                 |
| `bg-linear-to-tl`               | `background-image: linear-gradient(to top left, var(--tw-gradient-stops));`            | 線性漸層由右下到左上                             |
| `bg-linear-<angle>`             | `background-image: linear-gradient(<angle> in oklab, var(--tw-gradient-stops));`       | 以指定角度（oklab）線性漸層                      |
| `-bg-linear-<angle>`            | `background-image: linear-gradient(-<angle> in oklab, var(--tw-gradient-stops));`      | 以負角度（oklab）線性漸層                        |
| `bg-linear-(<custom-property>)` | `background-image: linear-gradient(var(--tw-gradient-stops, var(<custom-property>)));` | 使用 CSS 變數自訂線性漸層                        |
| `bg-linear-[<value>]`           | `background-image: linear-gradient(var(--tw-gradient-stops, <value>));`                | 任意自訂線性漸層                                 |
| `bg-radial`                     | `background-image: radial-gradient(in oklab, var(--tw-gradient-stops));`               | 輻射漸層（oklab）                                |
| `bg-radial-(<custom-property>)` | `background-image: radial-gradient(var(--tw-gradient-stops, var(<custom-property>)));` | 使用 CSS 變數自訂輻射漸層                        |
| `bg-radial-[<value>]`           | `background-image: radial-gradient(var(--tw-gradient-stops, <value>));`                | 任意自訂輻射漸層                                 |
| `bg-conic-<angle>`              | `background-image: conic-gradient(from <angle> in oklab, var(--tw-gradient-stops));`   | 指定角度的圓錐漸層（oklab）                      |
| `-bg-conic-<angle>`             | `background-image: conic-gradient(from -<angle> in oklab, var(--tw-gradient-stops));`  | 負角度圓錐漸層（oklab）                          |
| `bg-conic-(<custom-property>)`  | `background-image: var(<custom-property>);`                                            | 使用 CSS 變數自訂圓錐漸層                        |
| `bg-conic-[<value>]`            | `background-image: <value>;`                                                           | 任意自訂圓錐漸層                                 |
| `from-<color>`                  | `--tw-gradient-from: <color>;`                                                         | 設定漸層起始顏色                                 |
| `from-<percentage>`             | `--tw-gradient-from-position: <percentage>;`                                           | 設定漸層起始顏色的位置（百分比）                 |
| `from-(<custom-property>)`      | `--tw-gradient-from: var(<custom-property>);`                                          | 使用 CSS 變數自訂漸層起始顏色                    |
| `from-[<value>]`                | `--tw-gradient-from: <value>;`                                                         | 任意自訂漸層起始顏色（如 #123456、rgba(...) 等） |
| `via-<color>`                   | `--tw-gradient-via: <color>;`                                                          | 設定漸層中間顏色                                 |
| `via-<percentage>`              | `--tw-gradient-via-position: <percentage>;`                                            | 設定漸層中間顏色的位置（百分比）                 |
| `via-(<custom-property>)`       | `--tw-gradient-via: var(<custom-property>);`                                           | 使用 CSS 變數自訂漸層中間顏色                    |
| `via-[<value>]`                 | `--tw-gradient-via: <value>;`                                                          | 任意自訂漸層中間顏色（如 #123456、rgba(...) 等） |
| `to-<color>`                    | `--tw-gradient-to: <color>;`                                                           | 設定漸層結束顏色                                 |
| `to-<percentage>`               | `--tw-gradient-to-position: <percentage>;`                                             | 設定漸層結束顏色的位置（百分比）                 |
| `to-(<custom-property>)`        | `--tw-gradient-to: var(<custom-property>);`                                            | 使用 CSS 變數自訂漸層結束顏色                    |
| `to-[<value>]`                  | `--tw-gradient-to: <value>;`                                                           | 任意自訂漸層結束顏色（如 #123456、rgba(...) 等） |

使用技巧
- 可直接使用 `bg-[url('路徑')]` 來設定任意圖片為背景，例如 `bg-[url('/assets/bg.png')]`。
- from, to 屬於 CSS 關鍵變數，用來控制漸層色位置以及指定色，tailwindcss 會自動判斷哪種屬性用途。
- var 也是 CSS 關鍵變數，用來控制漸層的顏色中間參數，搭配 from -> via -> to 為三色漸層。

```html
<div class="bg-[url(/img/mountains.jpg)]"></div>
<div class="h-14 bg-linear-to-r from-cyan-500 to-blue-500"></div>
<div class="size-18 rounded-full bg-radial from-pink-400 from-40% to-fuchsia-700"></div>
<div class="size-18 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div>
<div class="size-18 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>
<div class="size-24 rounded-full bg-conic from-blue-600 to-sky-400 to-50%"></div>
<div class="size-24 rounded-full bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600"></div>
<div class="size-24 rounded-full bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700"></div>
<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

<div class="bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]"></div>
<div class="bg-linear-(--my-gradient)"></div>
```

### 變更插值模式（Interpolation Mode）
插值模式（interpolation mode）主要用於控制漸層（gradient）顏色在不同顏色之間的過渡方式。預設情況下，Tailwind 使用 oklab 色彩空間進行插值，可指定哪種色彩空間進行插值，讓漸層顏色過渡更自然、視覺效果更佳。

```html
<div class="bg-linear-to-r/srgb from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/hsl from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/oklab from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/longer from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/shorter from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/increasing from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/decreasing from-indigo-500 to-teal-400"></div>
```

### 自訂
```css
@theme {
  --color-regal-blue: #243c5a; 
}
```
```html
<div class="from-regal-blue"></div>
```

## background-origin
背景原點（background-origin）用於設定背景圖片的定位起點，決定背景圖是從邊框（border）、內距（padding）還是內容區塊（content）開始繪製。Tailwind CSS 提供以下對應類別：

| 類別名稱            | CSS 屬性值                        | 說明                           |
| ------------------- | --------------------------------- | ------------------------------ |
| `bg-origin-border`  | `background-origin: border-box;`  | 以邊框為背景圖定位起點         |
| `bg-origin-padding` | `background-origin: padding-box;` | 以內距為背景圖定位起點（預設） |
| `bg-origin-content` | `background-origin: content-box;` | 以內容區塊為背景圖定位起點     |

## background-position
背景位置（background-position）用於設定背景圖片在元素中的顯示位置。Tailwind CSS 提供多種常用位置的類別，讓你能快速對齊背景圖，常見於橫幅、卡片、裝飾性區塊等設計。

| 類別名稱                          | CSS 屬性值                                     | 說明                  |
| --------------------------------- | ---------------------------------------------- | --------------------- |
| `bg-top-left`                     | `background-position: top left;`               | 對齊左上角            |
| `bg-top`                          | `background-position: top;`                    | 對齊頂部              |
| `bg-top-right`                    | `background-position: top right;`              | 對齊右上角            |
| `bg-left`                         | `background-position: left;`                   | 對齊左側              |
| `bg-center`                       | `background-position: center;`                 | 置中（預設）          |
| `bg-right`                        | `background-position: right;`                  | 對齊右側              |
| `bg-bottom-left`                  | `background-position: bottom left;`            | 對齊左下角            |
| `bg-bottom`                       | `background-position: bottom;`                 | 對齊底部              |
| `bg-bottom-right`                 | `background-position: bottom right;`           | 對齊右下角            |
| `bg-position-(<custom-property>)` | `background-position: var(<custom-property>);` | 使用自訂 CSS 變數位置 |
| `bg-position-[<value>]`           | `background-position: <value>;`                | 任意自訂位置          |

```html
<div class="bg-[url(/img/mountains.jpg)] bg-bottom-left"></div>
<div class="bg-position-[center_top_1rem]"></div>
<div class="bg-position-(--my-bg-position)"></div>
```

## background-repeat
背景重複（background-repeat）用於設定背景圖片是否及如何重複顯示。Tailwind CSS 提供多種重複方式，常見於圖案背景、裝飾性設計等。

| 類別名稱          | CSS 屬性值                      | 說明                     |
| ----------------- | ------------------------------- | ------------------------ |
| `bg-repeat`       | `background-repeat: repeat;`    | 水平與垂直皆重複（預設） |
| `bg-repeat-x`     | `background-repeat: repeat-x;`  | 僅水平重複               |
| `bg-repeat-y`     | `background-repeat: repeat-y;`  | 僅垂直重複               |
| `bg-repeat-space` | `background-repeat: space;`     | 圖片間隔平均分配         |
| `bg-repeat-round` | `background-repeat: round;`     | 圖片自動縮放填滿並重複   |
| `bg-no-repeat`    | `background-repeat: no-repeat;` | 不重複                   |

## background-size
背景尺寸（background-size）用於設定背景圖片的縮放方式，決定圖片如何填滿元素。Tailwind CSS 提供常用尺寸類別，方便快速調整背景圖的顯示效果，常見於橫幅、卡片、裝飾區塊等設計。

| 類別名稱                      | CSS 屬性值                                 | 說明                   |
| ----------------------------- | ------------------------------------------ | ---------------------- |
| `bg-auto`                     | `background-size: auto;`                   | 保持原始尺寸（預設）   |
| `bg-cover`                    | `background-size: cover;`                  | 覆蓋整個區塊，可能裁切 |
| `bg-contain`                  | `background-size: contain;`                | 完整顯示，可能留白     |
| `bg-size-(<custom-property>)` | `background-size: var(<custom-property>);` | 使用自訂 CSS 變數尺寸  |
| `bg-size-[<value>]`           | `background-size: <value>;`                | 任意自訂尺寸           |

```html
<div class="bg-[url(/img/mountains.jpg)] bg-cover bg-center"></div>
<div class="bg-size-[auto_100px]"></div>
<div class="bg-size-(--my-image-size)"></div>
```

# Border
邊框（Border）相關類別用於設定元素的邊框寬度、顏色、圓角、樣式等。這些類別讓你能快速打造卡片、按鈕、區塊等元件的外觀，常見於版面分隔、強調重點、提升視覺層次等情境。

## border-radius
圓角（border-radius）相關類別用於設定元素的圓角大小，讓方形區塊、按鈕、卡片等元件呈現圓潤或全圓的視覺效果。常見於現代 UI 設計，能有效提升介面親和力與美觀度。

{% note info %}
一般情況（大部分專案）用 border-top-left-radius；多語系 / RTL 支援用 border-start-start-radius。

- <kbd>border-top-left-radius</kbd>：標準 CSS，設定左上角圓角。
- <kbd>border-start-start-radius</kbd>：邏輯屬性，會根據語言方向自動對應左上或右上角（LTR=左上，RTL=右上）。
{% endnote %}

| 類別名稱                      | CSS 屬性值                               | 說明                  |
| ----------------------------- | ---------------------------------------- | --------------------- |
| `rounded-none`                | `border-radius: 0;`                      | 無圓角                |
| `rounded-<size>`              | `border-radius: var(--radius-<size>);`   | 圓角 <size>           |
| `rounded-full`                | `border-radius: calc(infinity * 1px);`   | 全圓角（圓形/膠囊）   |
| `rounded-(<custom-property>)` | `border-radius: var(<custom-property>);` | 使用自訂 CSS 變數圓角 |
| `rounded-[<value>]`           | `border-radius: <value>;`                | 任意自訂圓角          |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --radius-xs: .125rem;    /* 2px */
  --radius-sm: .25rem;     /* 4px */
  --radius-md: .375rem;    /* 6px */
  --radius-lg: .5rem;      /* 8px */
  --radius-xl: .75rem;     /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-4xl: 2rem;      /* 32px */
}
```

| 類別名稱                         | CSS 屬性值                                                                                                     | 說明                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `rounded-t-<size>`               | `border-top-left-radius: var(--radius-<size>);`<br/>`border-top-right-radius: var(--radius-<size>);`           | 上側圓角 <size>               |
| `rounded-t-none`                 | `border-top-left-radius: 0;`<br/>`border-top-right-radius: 0;`                                                 | 上側無圓角                    |
| `rounded-t-full`                 | `border-top-left-radius: calc(infinity * 1px);`<br/>`border-top-right-radius: calc(infinity * 1px);`           | 上側全圓角（圓形/膠囊）       |
| `rounded-t-(<custom-property>)`  | `border-top-left-radius: var(<custom-property>);`<br/>`border-top-right-radius: var(<custom-property>);`       | 使用自訂 CSS 變數設定上側圓角 |
| `rounded-t-[<value>]`            | `border-top-left-radius: <value>;`<br/>`border-top-right-radius: <value>;`                                     | 上側任意自訂圓角              |
| `rounded-r-<size>`               | `border-top-right-radius: var(--radius-<size>);`<br/>`border-bottom-right-radius: var(--radius-<size>);`       | 右側圓角 <size>               |
| `rounded-r-none`                 | `border-top-right-radius: 0;`<br/>`border-bottom-right-radius: 0;`                                             | 右側無圓角                    |
| `rounded-r-full`                 | `border-top-right-radius: calc(infinity * 1px);`<br/>`border-bottom-right-radius: calc(infinity * 1px);`       | 右側全圓角（圓形/膠囊）       |
| `rounded-r-(<custom-property>)`  | `border-top-right-radius: var(<custom-property>);`<br/>`border-bottom-right-radius: var(<custom-property>);`   | 使用自訂 CSS 變數設定右側圓角 |
| `rounded-r-[<value>]`            | `border-top-right-radius: <value>;`<br/>`border-bottom-right-radius: <value>;`                                 | 右側任意自訂圓角              |
| `rounded-b-<size>`               | `border-bottom-right-radius: var(--radius-<size>);`<br/>`border-bottom-left-radius: var(--radius-<size>);`     | 下側圓角 <size>               |
| `rounded-b-none`                 | `border-bottom-right-radius: 0;`<br/>`border-bottom-left-radius: 0;`                                           | 下側無圓角                    |
| `rounded-b-full`                 | `border-bottom-right-radius: calc(infinity * 1px);`<br/>`border-bottom-left-radius: calc(infinity * 1px);`     | 下側全圓角（圓形/膠囊）       |
| `rounded-b-(<custom-property>)`  | `border-bottom-right-radius: var(<custom-property>);`<br/>`border-bottom-left-radius: var(<custom-property>);` | 使用自訂 CSS 變數設定下側圓角 |
| `rounded-b-[<value>]`            | `border-bottom-right-radius: <value>;`<br/>`border-bottom-left-radius: <value>;`                               | 下側任意自訂圓角              |
| `rounded-l-<size>`               | `border-top-left-radius: var(--radius-<size>);`<br/>`border-bottom-left-radius: var(--radius-<size>);`         | 左側圓角 <size>               |
| `rounded-l-none`                 | `border-top-left-radius: 0;`<br/>`border-bottom-left-radius: 0;`                                               | 左側無圓角                    |
| `rounded-l-full`                 | `border-top-left-radius: calc(infinity * 1px);`<br/>`border-bottom-left-radius: calc(infinity * 1px);`         | 左側全圓角（圓形/膠囊）       |
| `rounded-l-(<custom-property>)`  | `border-top-left-radius: var(<custom-property>);`<br/>`border-bottom-left-radius: var(<custom-property>);`     | 使用自訂 CSS 變數設定左側圓角 |
| `rounded-l-[<value>]`            | `border-top-left-radius: <value>;`<br/>`border-bottom-left-radius: <value>;`                                   | 左側任意自訂圓角              |
| `rounded-tl-<size>`              | `border-top-left-radius: var(--radius-<size>);`                                                                | 左上圓角 <size>               |
| `rounded-tl-none`                | `border-top-left-radius: 0;`                                                                                   | 左上無圓角                    |
| `rounded-tl-full`                | `border-top-left-radius: calc(infinity * 1px);`                                                                | 左上全圓角（圓形/膠囊）       |
| `rounded-tl-(<custom-property>)` | `border-top-left-radius: var(<custom-property>);`                                                              | 使用自訂 CSS 變數設定左上圓角 |
| `rounded-tl-[<value>]`           | `border-top-left-radius: <value>;`                                                                             | 左上任意自訂圓角              |
| `rounded-tr-<size>`              | `border-top-right-radius: var(--radius-<size>);`                                                               | 右上圓角 <size>               |
| `rounded-tr-none`                | `border-top-right-radius: 0;`                                                                                  | 右上無圓角                    |
| `rounded-tr-full`                | `border-top-right-radius: calc(infinity * 1px);`                                                               | 右上全圓角（圓形/膠囊）       |
| `rounded-tr-(<custom-property>)` | `border-top-right-radius: var(<custom-property>);`                                                             | 使用自訂 CSS 變數設定右上圓角 |
| `rounded-tr-[<value>]`           | `border-top-right-radius: <value>;`                                                                            | 右上任意自訂圓角              |
| `rounded-br-<size>`              | `border-bottom-right-radius: var(--radius-<size>);`                                                            | 右下圓角 <size>               |
| `rounded-br-none`                | `border-bottom-right-radius: 0;`                                                                               | 右下無圓角                    |
| `rounded-br-full`                | `border-bottom-right-radius: calc(infinity * 1px);`                                                            | 右下全圓角（圓形/膠囊）       |
| `rounded-br-(<custom-property>)` | `border-bottom-right-radius: var(<custom-property>);`                                                          | 使用自訂 CSS 變數設定右下圓角 |
| `rounded-br-[<value>]`           | `border-bottom-right-radius: <value>;`                                                                         | 右下任意自訂圓角              |
| `rounded-bl-<size>`              | `border-bottom-left-radius: var(--radius-<size>);`                                                             | 左下圓角 <size>               |
| `rounded-bl-none`                | `border-bottom-left-radius: 0;`                                                                                | 左下無圓角                    |
| `rounded-bl-full`                | `border-bottom-left-radius: calc(infinity * 1px);`                                                             | 左下全圓角（圓形/膠囊）       |
| `rounded-bl-(<custom-property>)` | `border-bottom-left-radius: var(<custom-property>);`                                                           | 使用自訂 CSS 變數設定左下圓角 |
| `rounded-bl-[<value>]`           | `border-bottom-left-radius: <value>;`                                                                          | 左下任意自訂圓角              |

| 類別名稱                         | CSS 屬性值                                                                                                  | 說明                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `rounded-s-<size>`               | `border-start-start-radius: var(--radius-<size>);`<br/>`border-end-start-radius: var(--radius-<size>);`     | 起始側圓角 <size>                 |
| `rounded-s-none`                 | `border-start-start-radius: 0;`<br/>`border-end-start-radius: 0;`                                           | 起始側無圓角                      |
| `rounded-s-full`                 | `border-start-start-radius: calc(infinity * 1px);`<br/>`border-end-start-radius: calc(infinity * 1px);`     | 起始側全圓角（圓形/膠囊）         |
| `rounded-s-(<custom-property>)`  | `border-start-start-radius: var(<custom-property>);`<br/>`border-end-start-radius: var(<custom-property>);` | 使用自訂 CSS 變數設定起始側圓角   |
| `rounded-s-[<value>]`            | `border-start-start-radius: <value>;`<br/>`border-end-start-radius: <value>;`                               | 起始側任意自訂圓角                |
| `rounded-e-<size>`               | `border-start-end-radius: var(--radius-<size>);`<br/>`border-end-end-radius: var(--radius-<size>);`         | 結束側圓角 <size>                 |
| `rounded-e-none`                 | `border-start-end-radius: 0;`<br/>`border-end-end-radius: 0;`                                               | 結束側無圓角                      |
| `rounded-e-full`                 | `border-start-end-radius: calc(infinity * 1px);`<br/>`border-end-end-radius: calc(infinity * 1px);`         | 結束側全圓角（圓形/膠囊）         |
| `rounded-e-(<custom-property>)`  | `border-start-end-radius: var(<custom-property>);`<br/>`border-end-end-radius: var(<custom-property>);`     | 使用自訂 CSS 變數設定結束側圓角   |
| `rounded-e-[<value>]`            | `border-start-end-radius: <value>;`<br/>`border-end-end-radius: <value>;`                                   | 結束側任意自訂圓角                |
| `rounded-ss-<size>`              | `border-start-start-radius: var(--radius-<size>);`                                                          | 起始起始圓角 <size>               |
| `rounded-ss-none`                | `border-start-start-radius: 0;`                                                                             | 起始起始無圓角                    |
| `rounded-ss-full`                | `border-start-start-radius: calc(infinity * 1px);`                                                          | 起始起始全圓角（圓形/膠囊）       |
| `rounded-ss-(<custom-property>)` | `border-start-start-radius: var(<custom-property>);`                                                        | 使用自訂 CSS 變數設定起始起始圓角 |
| `rounded-ss-[<value>]`           | `border-start-start-radius: <value>;`                                                                       | 起始起始任意自訂圓角              |
| `rounded-se-<size>`              | `border-start-end-radius: var(--radius-<size>);`                                                            | 起始結束圓角 <size>               |
| `rounded-se-none`                | `border-start-end-radius: 0;`                                                                               | 起始結束無圓角                    |
| `rounded-se-full`                | `border-start-end-radius: calc(infinity * 1px);`                                                            | 起始結束全圓角（圓形/膠囊）       |
| `rounded-se-(<custom-property>)` | `border-start-end-radius: var(<custom-property>);`                                                          | 使用自訂 CSS 變數設定起始結束圓角 |
| `rounded-se-[<value>]`           | `border-start-end-radius: <value>;`                                                                         | 起始結束任意自訂圓角              |
| `rounded-ee-<size>`              | `border-end-end-radius: var(--radius-<size>);`                                                              | 結束結束圓角 <size>               |
| `rounded-ee-none`                | `border-end-end-radius: 0;`                                                                                 | 結束結束無圓角                    |
| `rounded-ee-full`                | `border-end-end-radius: calc(infinity * 1px);`                                                              | 結束結束全圓角（圓形/膠囊）       |
| `rounded-ee-(<custom-property>)` | `border-end-end-radius: var(<custom-property>);`                                                            | 使用自訂 CSS 變數設定結束結束圓角 |
| `rounded-ee-[<value>]`           | `border-end-end-radius: <value>;`                                                                           | 結束結束任意自訂圓角              |
| `rounded-es-<size>`              | `border-end-start-radius: var(--radius-<size>);`                                                            | 結束起始圓角 <size>               |
| `rounded-es-none`                | `border-end-start-radius: 0;`                                                                               | 結束起始無圓角                    |
| `rounded-es-full`                | `border-end-start-radius: calc(infinity * 1px);`                                                            | 結束起始全圓角（圓形/膠囊）       |
| `rounded-es-(<custom-property>)` | `border-end-start-radius: var(<custom-property>);`                                                          | 使用自訂 CSS 變數設定結束起始圓角 |
| `rounded-es-[<value>]`           | `border-end-start-radius: <value>;`                                                                         | 結束起始任意自訂圓角              |

```html
<div class="rounded-[2vw]"></div>
<div class="rounded-(--my-radius)"></div>
```

### 自訂
```css
@theme {
  --radius-5xl: 3rem; 
}
```
```html
<div class="rounded-5xl"></div>
```

## border-width
Tailwind CSS 提供多種邊框寬度的工具類別，讓你可以快速設定元素的邊框粗細。常見用法如下：

| 類別名稱                              | 對應 CSS 屬性                                        | 說明                                   |
| ------------------------------------- | ---------------------------------------------------- | -------------------------------------- |
| `border`                              | `border-width: 1px;`                                 | 設定所有邊框寬度為 1px（預設值）       |
| `border-<number>`                     | `border-width: <number>px;`                          | 設定所有邊框寬度為指定像素值           |
| `border-(length:<custom-property>)`   | `border-width: var(<custom-property>);`              | 使用自訂 CSS 變數設定所有邊框寬度      |
| `border-[<value>]`                    | `border-width: <value>;`                             | 所有邊框寬度自訂任意值                 |
| `border-x`                            | `border-inline-width: 1px;`                          | 設定左右（inline）邊框寬度為 1px       |
| `border-x-<number>`                   | `border-inline-width: <number>px;`                   | 設定左右（inline）邊框寬度為指定像素值 |
| `border-x-(length:<custom-property>)` | `border-inline-width: var(<custom-property>);`       | 使用自訂 CSS 變數設定左右邊框寬度      |
| `border-x-[<value>]`                  | `border-inline-width: <value>;`                      | 左右邊框寬度自訂任意值                 |
| `border-y`                            | `border-block-width: 1px;`                           | 設定上下（block）邊框寬度為 1px        |
| `border-y-<number>`                   | `border-block-width: <number>px;`                    | 設定上下（block）邊框寬度為指定像素值  |
| `border-y-(length:<custom-property>)` | `border-block-width: var(<custom-property>);`        | 使用自訂 CSS 變數設定上下邊框寬度      |
| `border-y-[<value>]`                  | `border-block-width: <value>;`                       | 上下邊框寬度自訂任意值                 |
| `border-s`                            | `border-inline-start-width: 1px;`                    | 設定起始（左/右依語系）邊框寬度為 1px  |
| `border-s-<number>`                   | `border-inline-start-width: <number>px;`             | 設定起始邊框寬度為指定像素值           |
| `border-s-(length:<custom-property>)` | `border-inline-start-width: var(<custom-property>);` | 使用自訂 CSS 變數設定起始邊框寬度      |
| `border-s-[<value>]`                  | `border-inline-start-width: <value>;`                | 起始邊框寬度自訂任意值                 |
| `border-e`                            | `border-inline-end-width: 1px;`                      | 設定結束（右/左依語系）邊框寬度為 1px  |
| `border-e-<number>`                   | `border-inline-end-width: <number>px;`               | 設定結束邊框寬度為指定像素值           |
| `border-e-(length:<custom-property>)` | `border-inline-end-width: var(<custom-property>);`   | 使用自訂 CSS 變數設定結束邊框寬度      |
| `border-e-[<value>]`                  | `border-inline-end-width: <value>;`                  | 結束邊框寬度自訂任意值                 |
| `border-t`                            | `border-top-width: 1px;`                             | 設定上邊框寬度為 1px                   |
| `border-t-<number>`                   | `border-top-width: <number>px;`                      | 設定上邊框寬度為指定像素值             |
| `border-t-(length:<custom-property>)` | `border-top-width: var(<custom-property>);`          | 使用自訂 CSS 變數設定上邊框寬度        |
| `border-t-[<value>]`                  | `border-top-width: <value>;`                         | 上邊框寬度自訂任意值                   |
| `border-r`                            | `border-right-width: 1px;`                           | 設定右邊框寬度為 1px                   |
| `border-r-<number>`                   | `border-right-width: <number>px;`                    | 設定右邊框寬度為指定像素值             |
| `border-r-(length:<custom-property>)` | `border-right-width: var(<custom-property>);`        | 使用自訂 CSS 變數設定右邊框寬度        |
| `border-r-[<value>]`                  | `border-right-width: <value>;`                       | 右邊框寬度自訂任意值                   |
| `border-b`                            | `border-bottom-width: 1px;`                          | 設定下邊框寬度為 1px                   |
| `border-b-<number>`                   | `border-bottom-width: <number>px;`                   | 設定下邊框寬度為指定像素值             |
| `border-b-(length:<custom-property>)` | `border-bottom-width: var(<custom-property>);`       | 使用自訂 CSS 變數設定下邊框寬度        |
| `border-b-[<value>]`                  | `border-bottom-width: <value>;`                      | 下邊框寬度自訂任意值                   |
| `border-l`                            | `border-left-width: 1px;`                            | 設定左邊框寬度為 1px                   |
| `border-l-<number>`                   | `border-left-width: <number>px;`                     | 設定左邊框寬度為指定像素值             |
| `border-l-(length:<custom-property>)` | `border-left-width: var(<custom-property>);`         | 使用自訂 CSS 變數設定左邊框寬度        |
| `border-l-[<value>]`                  | `border-left-width: <value>;`                        | 左邊框寬度自訂任意值                   |

```html
<div class="border-[2vw]">
  <!-- -->
</div>
<div class="border-(length:--my-border-width)">
  <!-- -->
</div>
```

### divide-width
`divide-x` 與 `divide-y` 工具類別可快速為父元素的子元素之間添加分隔線，常用於水平或垂直排列的列表。這些類別會自動將分隔線應用於所有非最後一個子元素，並可自訂分隔線寬度。可作用於 `flex` 和 `grid` 元素。

| 類別名稱                              | 對應 CSS 屬性說明                                                                                            | 說明                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `divide-x`                            | `& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: 1px; }`                    | 水平分隔線，寬度 1px          |
| `divide-x-<number>`                   | `& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: <number>px; }`             | 水平分隔線，自訂寬度（像素）  |
| `divide-x-(length:<custom-property>)` | `& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: var(<custom-property>); }` | 水平分隔線，自訂 CSS 變數寬度 |
| `divide-x-[<value>]`                  | `& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: <value>; }`                | 水平分隔線，自訂任意寬度      |
| `divide-y`                            | `& > :not(:last-child) { border-top-width: 0px; border-bottom-width: 1px; }`                                 | 垂直分隔線，寬度 1px          |
| `divide-y-<number>`                   | `& > :not(:last-child) { border-top-width: 0px; border-bottom-width: <number>px; }`                          | 垂直分隔線，自訂寬度（像素）  |
| `divide-y-(length:<custom-property>)` | `& > :not(:last-child) { border-top-width: 0px; border-bottom-width: var(<custom-property>); }`              | 垂直分隔線，自訂 CSS 變數寬度 |
| `divide-y-[<value>]`                  | `& > :not(:last-child) { border-top-width: 0px; border-bottom-width: <value>; }`                             | 垂直分隔線，自訂任意寬度      |
| `divide-x-reverse`                    | `--tw-divide-x-reverse: 1;`                                                                                  | 水平分隔線方向反轉            |
| `divide-y-reverse`                    | `--tw-divide-y-reverse: 1;`                                                                                  | 垂直分隔線方向反轉            |

```html
<div class="grid grid-cols-3 divide-x-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
<div class="flex flex-col-reverse divide-y-4 divide-y-reverse divide-gray-200">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## border-color
設定邊框顏色，支援預設色板、透明、當前色與自訂任意值。常用於區塊、按鈕、表單等元件的邊框設計，能快速統一風格或強調重點。

| 類別名稱                     | CSS 屬性                                                                                                | 說明                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `border-inherit`             | `border-color: inherit;`                                                                                | 繼承父元素邊框顏色                                  |
| `border-current`             | `border-color: currentColor;`                                                                           | 使用當前元素文字顏色作為邊框色                      |
| `border-transparent`         | `border-color: transparent;`                                                                            | 邊框顏色透明                                        |
| `border-black`               | `border-color: var(--color-black);`                                                                     | 黑色邊框（#000）                                    |
| `border-white`               | `border-color: var(--color-white);`                                                                     | 白色邊框（#fff）                                    |
| `border-<color>-<step>`      | `border-color: var(--color-<color>-<step>);`                                                            | 指定色彩 <step> 階段的邊框色                        |
| `border-(<custom-property>)` | `border-color: var(<custom-property>);`                                                                 | 使用 CSS 變數自訂邊框顏色                           |
| `border-[<value>]`           | `border-color: <value>;`                                                                                | 任意自訂邊框顏色（如 #123456、rgba(..               |
| `border-x-<color>-<step>`    | `border-left-color: var(--color-<color>-<step>);`<br>`border-right-color: var(--color-<color>-<step>);` | 設定左右邊框顏色                                    |
| `border-y-<color>-<step>`    | `border-top-color: var(--color-<color>-<step>);`<br>`border-bottom-color: var(--color-<color>-<step>);` | 設定上下邊框顏色                                    |
| `border-s-<color>-<step>`    | `border-inline-start-color: var(--color-<color>-<step>);`                                               | 設定起始（Start）邊框顏色（支援 RTL）               |
| `border-e-<color>-<step>`    | `border-inline-end-color: var(--color-<color>-<step>);`                                                 | 設定結束（End）邊框顏色（支援 RTL）                 |
| `border-t-<color>-<step>`    | `border-top-color: var(--color-<color>-<step>);`                                                        | 設定上邊框顏色                                      |
| `border-r-<color>-<step>`    | `border-right-color: var(--color-<color>-<step>);`                                                      | 設定右邊框顏色                                      |
| `border-b-<color>-<step>`    | `border-bottom-color: var(--color-<color>-<step>);`                                                     | 設定下邊框顏色                                      |
| `border-l-<color>-<step>`    | `border-left-color: var(--color-<color>-<step>);`                                                       | 設定左邊框顏色                                      |
| `border-(<custom-property>)` | `border-color: var(<custom-property>);`                                                                 | 使用 CSS 變數自訂邊框顏色                           |
| `border-[<value>]`           | `border-color: <value>;`                                                                                | 任意自訂邊框顏色（如 #123456、rgba(...)、oklch 等） |
| `border-x-[<value>]`         | `border-left-color: <value>;`<br>`border-right-color: <value>;`                                         | 左右邊框自訂顏色                                    |
| `border-y-[<value>]`         | `border-top-color: <value>;`<br>`border-bottom-color: <value>;`                                         | 上下邊框自訂顏色                                    |
| `border-s-[<value>]`         | `border-inline-start-color: <value>;`                                                                   | 起始邊框自訂顏色                                    |
| `border-e-[<value>]`         | `border-inline-end-color: <value>;`                                                                     | 結束邊框自訂顏色                                    |
| `border-t-[<value>]`         | `border-top-color: <value>;`                                                                            | 上邊框自訂顏色                                      |
| `border-r-[<value>]`         | `border-right-color: <value>;`                                                                          | 右邊框自訂顏色                                      |
| `border-b-[<value>]`         | `border-bottom-color: <value>;`                                                                         | 下邊框自訂顏色                                      |
| `border-l-[<value>]`         | `border-left-color: <value>;`                                                                           | 左邊框自訂顏色                                      |

{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

```html
<div class="border-[#243c5a]"></div>
<div class="border-(--my-border)"></div>
<input class="border-2 border-gray-700 focus:border-pink-600" />
```

### divide-color
`divide-color` 工具類別用於設定分隔線（`divide-x`、`divide-y`）的顏色，讓多個子元素之間的分隔線能快速套用 Tailwind CSS 預設色彩、透明度、CSS 變數或自訂顏色。這對於設計有色彩區隔的列表、卡片等元件非常實用。

| 類別名稱                     | 對應 CSS 屬性說明                            | 說明                                        |
| ---------------------------- | -------------------------------------------- | ------------------------------------------- |
| `divide-inherit`             | `border-color: inherit;`                     | 繼承父元素分隔線顏色                        |
| `divide-current`             | `border-color: currentColor;`                | 使用當前元素文字顏色作為分隔線顏色          |
| `divide-transparent`         | `border-color: transparent;`                 | 分隔線顏色透明                              |
| `divide-black`               | `border-color: var(--color-black);`          | 黑色分隔線                                  |
| `divide-white`               | `border-color: var(--color-white);`          | 白色分隔線                                  |
| `divide-<color>-<step>`      | `border-color: var(--color-<color>-<step>);` | 指定色彩與色階（如 `divide-blue-500`）      |
| `divide-(<custom-property>)` | `border-color: var(<custom-property>);`      | 使用 CSS 變數自訂分隔線顏色                 |
| `divide-[<value>]`           | `border-color: <value>;`                     | 任意自訂分隔線顏色（如 #123456、rgba(...)） |

{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

可以在 `divide-<color>-<step>` 類別後加上透明度修飾（例如 `divide-blue-500/50`），或直接使用自訂顏色（如 `divide-[#ff00ff]`）來調整分隔線顏色。這些語法會對應到 `border-color` 屬性，讓分隔線顏色與透明度能靈活控制。

### 自訂
```css
@theme {
  --color-regal-blue: #243c5a; 
}
```
```html
<div class="border-regal-blue"></div>
```

## border-style
`border-style` 用來設定邊框的線條樣式，例如實線、虛線、點線等。你可以直接使用內建的類別來快速切換不同的邊框樣式，無需手動撰寫 CSS。

| 類別名稱        | 對應 CSS 屬性/選擇器                              | 說明         |
| --------------- | ------------------------------------------------- | ------------ |
| `border-solid`  | `border-style: solid;`                            | 實線邊框     |
| `border-dashed` | `border-style: dashed;`                           | 虛線邊框     |
| `border-dotted` | `border-style: dotted;`                           | 點線邊框     |
| `border-double` | `border-style: double;`                           | 雙線邊框     |
| `border-hidden` | `border-style: hidden;`                           | 隱藏邊框     |
| `border-none`   | `border-style: none;`                             | 無邊框       |
| `divide-solid`  | `& > :not(:last-child) { border-style: solid; }`  | 分隔線為實線 |
| `divide-dashed` | `& > :not(:last-child) { border-style: dashed; }` | 分隔線為虛線 |
| `divide-dotted` | `& > :not(:last-child) { border-style: dotted; }` | 分隔線為點線 |
| `divide-double` | `& > :not(:last-child) { border-style: double; }` | 分隔線為雙線 |
| `divide-hidden` | `& > :not(:last-child) { border-style: hidden; }` | 分隔線隱藏   |
| `divide-none`   | `& > :not(:last-child) { border-style: none; }`   | 分隔線無邊框 |

```html
<div class="grid grid-cols-3 divide-x-3 divide-dashed divide-indigo-500">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## outline-width
`outline-width` 用來設定外框（outline）的線條粗細。Tailwind CSS 提供多種 outline 粗細的工具類別，讓你可以快速調整元素的外框寬度，常用於聚焦（focus）狀態的視覺強調。

| 類別名稱                             | 對應 CSS 屬性                            | 說明                           |
| ------------------------------------ | ---------------------------------------- | ------------------------------ |
| `outline`                            | `outline-width: 1px;`                    | 預設 1px 外框寬度              |
| `outline-<number>`                   | `outline-width: <number>px;`             | 指定 px 單位的外框寬度         |
| `outline-(length:<custom-property>)` | `outline-width: var(<custom-property>);` | 使用自訂 CSS 變數長度          |
| `outline-[<value>]`                  | `outline-width: <value>;`                | 任意自訂長度（如 3px、0.5rem） |

```html
<div class="outline-[2vw]"></div>
<div class="outline-(length:--my-outline-width)"></div>
```

## outline-color
`outline-color` 用來設定元素外框（outline）的顏色。Tailwind CSS 提供多種 outline 顏色類別，讓你能快速為聚焦狀態或互動元件加上明顯的外框色彩。

| 類別名稱                      | 對應 CSS 屬性                                   | 說明                          |
| ----------------------------- | ----------------------------------------------- | ----------------------------- |
| `outline-inherit`             | `outline-color: inherit;`                       | 繼承父元素的外框顏色          |
| `outline-current`             | `outline-color: currentColor;`                  | 使用目前文字顏色作為外框顏色  |
| `outline-transparent`         | `outline-color: transparent;`                   | 外框顏色為透明                |
| `outline-black`               | `outline-color: var(--color-black); /* #000 */` | 黑色外框                      |
| `outline-white`               | `outline-color: var(--color-white); /* #fff */` | 白色外框                      |
| `outline-<color>-<step>`      | `outline-color: var(--color-<color>-<step>);`   | 指定色 step                   |
| `outline-(<custom-property>)` | `outline-color: var(<custom-property>);`        | 使用自訂 CSS 變數作為外框顏色 |
| `outline-[<value>]`           | `outline-color: <value>;`                       | 任意自訂外框顏色              |

{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

```html
<div class="outline-[#243c5a]"></div>
<div class="outline-(--my-color)"></div>
```

### 自訂
```css
@theme {
  --color-regal-blue: #243c5a; 
}
```
```html
<div class="outline-regal-blue"></div>
```

## outline-style
用來設定外框（outline）的線條樣式，例如實線、虛線、點線等。Tailwind CSS 提供了多種 outline 樣式的實用類別，讓你可以快速切換不同的外框效果。

| 類別名稱         | 對應 CSS 屬性                                               | 說明                                 |
| ---------------- | ----------------------------------------------------------- | ------------------------------------ |
| `outline-solid`  | `outline-style: solid;`                                     | 設定外框為實線                       |
| `outline-dashed` | `outline-style: dashed;`                                    | 設定外框為虛線                       |
| `outline-dotted` | `outline-style: dotted;`                                    | 設定外框為點線                       |
| `outline-double` | `outline-style: double;`                                    | 設定外框為雙線                       |
| `outline-none`   | `outline-style: none;`                                      | 移除外框樣式                         |
| `outline-hidden` | `outline: 2px solid transparent;`<br>`outline-offset: 2px;` | 隱藏外框但保留空間（常用於可存取性） |

## outline-offset
用來設定外框（outline）與元素之間的間距。Tailwind CSS 提供 `outline-offset-{value}` 類別，讓你可以快速調整外框偏移距離，提升視覺層次感。

| 類別名稱                             | 對應 CSS 屬性                             | 說明                                     |
| ------------------------------------ | ----------------------------------------- | ---------------------------------------- |
| `outline-offset-<number>`            | `outline-offset: <number>px;`             | 正向偏移 `<number>` 像素                 |
| `-outline-offset-<number>`           | `outline-offset: calc(<number>px * -1);`  | 負向偏移 `<number>` 像素                 |
| `outline-offset-(<custom-property>)` | `outline-offset: var(<custom-property>);` | 使用自訂 CSS 變數作為偏移值              |
| `outline-offset-[<value>]`           | `outline-offset: <value>;`                | 任意自訂偏移值（如 `12px`、`1.5rem` 等） |

```html
<div class="outline-offset-[2vw]"></div>
<div class="outline-offset-(--my-outline-offset)"></div>
```

# Effects
本章節介紹 Tailwind CSS 中各種「特效」相關的實用類別，包含陰影、透明度、混合模式與遮罩等，讓你能快速為網頁元素增添視覺層次與創意效果。

## box-shadow
用來為元素添加陰影效果，提升立體感與層次感。

| 類別名稱                           | 對應 CSS 屬性                                                 | 說明                                       |
| ---------------------------------- | ------------------------------------------------------------- | ------------------------------------------ |
| `shadow-<size>`                    | `box-shadow: var(--shadow-<size>);`                           | 各種陰影尺寸                               |
| `shadow-none`                      | `box-shadow: 0 0 #0000;`                                      | 移除陰影                                   |
| `shadow-(<custom-property>)`       | `box-shadow: var(<custom-property>);`                         | 使用自訂 CSS 變數陰影                      |
| `shadow-(color:<custom-property>)` | `--tw-shadow-color: var(<custom-property>);`                  | 使用自訂 CSS 變數陰影顏色                  |
| `shadow-[<value>]`                 | `box-shadow: <value>;`                                        | 任意自訂陰影值                             |
| `shadow-inherit`                   | `--tw-shadow-color: inherit;`                                 | 陰影顏色繼承                               |
| `shadow-current`                   | `--tw-shadow-color: currentColor;`                            | 陰影顏色繼承自當前文字顏色                 |
| `shadow-transparent`               | `--tw-shadow-color: transparent;`                             | 陰影顏色透明                               |
| `shadow-black`                     | `--tw-shadow-color: var(--color-black);`                      | 陰影顏色黑色 #000                          |
| `shadow-white`                     | `--tw-shadow-color: var(--color-white);`                      | 陰影顏色白色 #fff                          |
| `shadow-<color>-<step>`            | `--tw-shadow-color: var(--color-<color>-<step>);`             | 設定陰影顏色                               |
| `inset-shadow-<size>`              | `box-shadow: var(--inset-shadow-<size>);`                     | 內陰影尺寸                                 |
| `inset-shadow-none`                | `box-shadow: inset 0 0 #0000;`                                | 移除內陰影                                 |
| `inset-shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);`                         | 使用自訂 CSS 變數內陰影                    |
| `inset-shadow-[<value>]`           | `box-shadow: <value>;`                                        | 任意自訂內陰影值                           |
| `inset-shadow-inherit`             | `--tw-inset-shadow-color: inherit;`                           | 內陰影顏色繼承                             |
| `inset-shadow-current`             | `--tw-inset-shadow-color: currentColor;`                      | 內陰影顏色繼承自當前文字顏色               |
| `inset-shadow-transparent`         | `--tw-inset-shadow-color: transparent;`                       | 內陰影顏色透明                             |
| `inset-shadow-black`               | `--tw-inset-shadow-color: var(--color-black);`                | 內陰影顏色黑色 #000                        |
| `inset-shadow-white`               | `--tw-inset-shadow-color: var(--color-white);`                | 內陰影顏色白色 #fff                        |
| `inset-shadow-<color>-<step>`      | `--tw-inset-shadow-color: var(--color-<color>-<step>);`       | 設定內陰影顏色                             |
| `ring`                             | `--tw-ring-shadow: 0 0 0 1px;`                                | 設定 1px 外圈陰影（預設）                  |
| `ring-<number>`                    | `--tw-ring-shadow: 0 0 0 <number>px;`                         | 設定 `<number>` px 外圈陰影                |
| `ring-(<custom-property>)`         | `--tw-ring-shadow: 0 0 0 var(<custom-property>);`             | 使用自訂 CSS 變數作為外圈陰影寬度          |
| `ring-[<value>]`                   | `--tw-ring-shadow: 0 0 0 <value>;`                            | 任意自訂外圈陰影寬度（如 `2vw`、`0.5rem`） |
| `ring-inherit`                     | `--tw-ring-color: inherit;`                                   | 外圈顏色繼承父層                           |
| `ring-current`                     | `--tw-ring-color: currentColor;`                              | 外圈顏色繼承當前文字顏色                   |
| `ring-transparent`                 | `--tw-ring-color: transparent;`                               | 外圈顏色透明                               |
| `ring-black`                       | `--tw-ring-color: var(--color-black);`                        | 外圈顏色黑色 #000                          |
| `ring-white`                       | `--tw-ring-color: var(--color-white);`                        | 外圈顏色白色 #fff                          |
| `ring-<color>-<step>`              | `--tw-ring-color: var(--color-<color>-<step>);`               | 設定外圈顏色                               |
| `inset-ring`                       | `--tw-inset-ring-shadow: inset 0 0 0 1px;`                    | 設定 1px 內圈陰影（預設）                  |
| `inset-ring-<number>`              | `--tw-inset-ring-shadow: inset 0 0 0 <number>px;`             | 設定 `<number>` px 內圈陰影                |
| `inset-ring-(<custom-property>)`   | `--tw-inset-ring-shadow: inset 0 0 0 var(<custom-property>);` | 使用自訂 CSS 變數作為內圈陰影寬度          |
| `inset-ring-[<value>]`             | `--tw-inset-ring-shadow: inset 0 0 0 <value>;`                | 任意自訂內圈陰影寬度（如 `2vw`、`0.5rem`） |
| `inset-ring-inherit`               | `--tw-inset-ring-color: inherit;`                             | 內圈顏色繼承父層                           |
| `inset-ring-current`               | `--tw-inset-ring-color: currentColor;`                        | 內圈顏色繼承當前文字顏色                   |
| `inset-ring-transparent`           | `--tw-inset-ring-color: transparent;`                         | 內圈顏色透明                               |
| `inset-ring-black`                 | `--tw-inset-ring-color: var(--color-black);`                  | 內圈顏色黑色 #000                          |
| `inset-ring-white`                 | `--tw-inset-ring-color: var(--color-white);`                  | 內圈顏色白色 #fff                          |
| `inset-ring-<color>-<step>`        | `--tw-inset-ring-color: var(--color-<color>-<step>);`         | 設定內圈顏色為指定色                       |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --shadow-2xs: 0 1px #0000000d;
  --shadow-xs: 0 1px 2px 0 #0000000d;
  --shadow-sm: 0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a;
  --shadow-md: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;
  --shadow-lg: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;
  --shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
  --shadow-2xl: 0 25px 50px -12px #00000040;

  --inset-shadow-2xs: inset 0 1px #0000000d;
  --inset-shadow-xs: inset 0 1px 1px #0000000d;
  --inset-shadow-sm: inset 0 2px 4px #0000000d;
}
```

{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

```html
<!-- 變更不透明度 -->
<div class="shadow-xl ..."></div>
<div class="shadow-xl/30 ..."></div>

<!-- 陰影顏色 -->
<button class="bg-cyan-500 shadow-lg shadow-cyan-500/50 ...">Subscribe</button>
<button class="bg-indigo-500 shadow-lg shadow-indigo-500/50 ...">Subscribe</button>

<!-- 內陰影與內陰影色 -->
<div class="inset-shadow-2xs ..."></div>
<div class="inset-shadow-xs ..."></div>
<div class="inset-shadow-sm inset-shadow-indigo-500 ..."></div>
<div class="inset-shadow-sm inset-shadow-indigo-500/50 ..."></div>

<!-- 實心框圈與顏色 -->
<button class="ring ...">Subscribe</button>
<button class="ring-4 ...">Subscribe</button>
<button class="ring-2 ring-blue-500 ...">Subscribe</button>
<button class="ring-2 ring-blue-500/50 ...">Subscribe</button>

<!-- 內實心框圈與顏色 -->
<button class="inset-ring ...">Subscribe</button>
<button class="inset-ring-4 ...">Subscribe</button>
<button class="inset-ring-2 inset-ring-blue-500 ...">Subscribe</button>
<button class="inset-ring-2 inset-ring-blue-500/50 ...">Subscribe</button>

<!-- 任意值 -->
<div class="shadow-[0_35px_35px_rgba(0,0,0,0.25)] ..."></div>
<div class="shadow-(--my-shadow) ..."></div>
```

### 自訂
```css
@theme {
  --shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25);
  --inset-shadow-md: inset 0 2px 3px rgba(0, 0, 0, 0.25); 

  --color-regal-blue: #243c5a;
}
```
```html
<div class="shadow-3xl"></div>
<div class="inset-shadow-md"></div>
<div class="shadow-regal-blue"></div>
```

## text-shadow
用來為文字添加陰影效果，增強可讀性或裝飾性。

| 類別名稱                                | 對應 CSS 屬性                                          | 說明                     |
| --------------------------------------- | ------------------------------------------------------ | ------------------------ |
| `text-shadow-<size>`                    | `text-shadow: var(--text-shadow-<size>);`              | 指定文字陰影尺寸         |
| `text-shadow-none`                      | `text-shadow: none;`                                   | 移除文字陰影             |
| `text-shadow-(<custom-property>)`       | `text-shadow: var(<custom-property>);`                 | 使用自訂變數陰影         |
| `text-shadow-(color:<custom-property>)` | `--tw-shadow-color: var(<custom-property>);`           | 使用自訂變數作為陰影顏色 |
| `text-shadow-[<value>]`                 | `text-shadow: <value>;`                                | 任意值文字陰影           |
| `text-shadow-inherit`                   | `--tw-shadow-color: inherit;`                          | 繼承父層陰影顏色         |
| `text-shadow-current`                   | `--tw-shadow-color: currentColor;`                     | 使用當前文字顏色作為陰影 |
| `text-shadow-transparent`               | `--tw-shadow-color: transparent;`                      | 透明陰影                 |
| `text-shadow-black`                     | `--tw-text-shadow-color: var(--color-black);`          | 黑色文字陰影 #000        |
| `text-shadow-white`                     | `--tw-text-shadow-color: var(--color-white);`          | 白色文字陰影 #fff        |
| `text-shadow-<color>-<step>`            | `--tw-text-shadow-color: var(--color-<color>-<step>);` | 指定色的文字陰影         |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --text-shadow-2xs: 0px 1px 0px #00000026;
  --text-shadow-xs: 0px 1px 1px #0003;
  --text-shadow-sm: 0px 1px 0px #00000013, 0px 1px 1px #00000013, 0px 2px 2px #00000013;
  --text-shadow-md: 0px 1px 1px #0000001a, 0px 1px 2px #0000001a, 0px 2px 4px #0000001a;
  --text-shadow-lg: 0px 1px 2px #0000001a, 0px 3px 2px #0000001a, 0px 4px 8px #0000001a;
}
```

{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

```html
<!-- 基本範例 -->
<p class="text-shadow-2xs ...">The quick brown fox...</p>
<p class="text-shadow-sm ...">The quick brown fox...</p>
<p class="text-shadow-lg ...">The quick brown fox...</p>

<!-- 不透明度 -->
<p class="text-shadow-lg/20 ...">The quick brown fox...</p>

<!-- 陰影顏色 -->
<button class="text-sky-950 text-shadow-2xs text-shadow-sky-300 ...">Book a demo</button>

<!-- 任意值 -->
<p class="text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)] ..."></p>
<p class="text-shadow-(--my-text-shadow) ..."></p>
```

### 自訂
```css
@theme {
  --text-shadow-xl: 0 35px 35px rgb(0, 0, 0 / 0.25); 
  --color-regal-blue: #243c5a; 
}
```
```html
<p class="text-shadow-xl"></p>
<p class="text-shadow-regal-blue"></p>
```

## opacity
用來調整元素的透明度，常用於 hover 效果或淡出動畫。

| 類別名稱                        | 對應 CSS 屬性                       | 說明                           |
| ------------------------------- | ----------------------------------- | ------------------------------ |
| 類別名稱                        | 對應 CSS 屬性                       | 說明                           |
| ------------------------------- | ----------------------------------- | --------------------------     |
| `opacity-<number>`              | `opacity: <number>%`                | 以百分比 `<number>` 指定透明度 |
| `opacity-(<custom-property>)`   | `opacity: var(<custom-property>);`  | 使用自訂 CSS 變數              |
| `opacity-[<value>]`             | `opacity: <value>;`                 | 任意自訂透明度                 |

```html
<button class="opacity-[.67] ..."></button>
<button class="opacity-(--my-opacity) ..."></button>
```

## mix-blend-mode
設定元素與背景的混合模式，創造特殊的合成效果。

| 類別名稱                    | 對應 CSS 屬性                      | 說明           |
| --------------------------- | ---------------------------------- | -------------- |
| 類別名稱                    | 對應 CSS 屬性                      | 說明           |
| --------------------------- | ---------------------------------- | -------------- |
| `mix-blend-normal`          | `mix-blend-mode: normal;`          | 一般混合       |
| `mix-blend-multiply`        | `mix-blend-mode: multiply;`        | 乘法混合       |
| `mix-blend-screen`          | `mix-blend-mode: screen;`          | 螢幕混合       |
| `mix-blend-overlay`         | `mix-blend-mode: overlay;`         | 疊加混合       |
| `mix-blend-darken`          | `mix-blend-mode: darken;`          | 變暗混合       |
| `mix-blend-lighten`         | `mix-blend-mode: lighten;`         | 變亮混合       |
| `mix-blend-color-dodge`     | `mix-blend-mode: color-dodge;`     | 顏色增亮混合   |
| `mix-blend-color-burn`      | `mix-blend-mode: color-burn;`      | 顏色加深混合   |
| `mix-blend-hard-light`      | `mix-blend-mode: hard-light;`      | 強光混合       |
| `mix-blend-soft-light`      | `mix-blend-mode: soft-light;`      | 柔光混合       |
| `mix-blend-difference`      | `mix-blend-mode: difference;`      | 差異混合       |
| `mix-blend-exclusion`       | `mix-blend-mode: exclusion;`       | 排除混合       |
| `mix-blend-hue`             | `mix-blend-mode: hue;`             | 色相混合       |
| `mix-blend-saturation`      | `mix-blend-mode: saturation;`      | 飽和度混合     |
| `mix-blend-color`           | `mix-blend-mode: color;`           | 顏色混合       |
| `mix-blend-luminosity`      | `mix-blend-mode: luminosity;`      | 亮度混合       |
| `mix-blend-plus-darker`     | `mix-blend-mode: plus-darker;`     | 更暗混合       |
| `mix-blend-plus-lighter`    | `mix-blend-mode: plus-lighter;`    | 更亮混合       |

```html
<div class="flex justify-center -space-x-14">
  <div class="bg-blue-500 mix-blend-multiply ..."></div>
  <div class="bg-pink-500 mix-blend-multiply ..."></div>
</div>
```

## background-blend-mode
設定多重背景圖層的混合模式，常用於圖片與漸層疊加。

| 類別名稱               | 對應 CSS 屬性                         | 說明         |
| ---------------------- | ------------------------------------- | ------------ |
| `bg-blend-normal`      | `background-blend-mode: normal;`      | 一般混合     |
| `bg-blend-multiply`    | `background-blend-mode: multiply;`    | 乘法混合     |
| `bg-blend-screen`      | `background-blend-mode: screen;`      | 螢幕混合     |
| `bg-blend-overlay`     | `background-blend-mode: overlay;`     | 疊加混合     |
| `bg-blend-darken`      | `background-blend-mode: darken;`      | 變暗混合     |
| `bg-blend-lighten`     | `background-blend-mode: lighten;`     | 變亮混合     |
| `bg-blend-color-dodge` | `background-blend-mode: color-dodge;` | 顏色增亮混合 |
| `bg-blend-color-burn`  | `background-blend-mode: color-burn;`  | 顏色加深混合 |
| `bg-blend-hard-light`  | `background-blend-mode: hard-light;`  | 強光混合     |
| `bg-blend-soft-light`  | `background-blend-mode: soft-light;`  | 柔光混合     |
| `bg-blend-difference`  | `background-blend-mode: difference;`  | 差異混合     |
| `bg-blend-exclusion`   | `background-blend-mode: exclusion;`   | 排除混合     |
| `bg-blend-hue`         | `background-blend-mode: hue;`         | 色相混合     |
| `bg-blend-saturation`  | `background-blend-mode: saturation;`  | 飽和度混合   |
| `bg-blend-color`       | `background-blend-mode: color;`       | 顏色混合     |
| `bg-blend-luminosity`  | `background-blend-mode: luminosity;`  | 亮度混合     |

```html
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-multiply ..."></div>
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-overlay ..."></div>
```

## mask-clip
設定遮罩的裁切範圍，控制遮罩的顯示區域。

| 類別名稱            | 對應 CSS 屬性             | 說明           |
| ------------------- | ------------------------- | -------------- |
| `mask-clip-border`  | `mask-clip: border-box;`  | 以邊框裁切     |
| `mask-clip-padding` | `mask-clip: padding-box;` | 以內邊距裁切   |
| `mask-clip-content` | `mask-clip: content-box;` | 以內容裁切     |
| `mask-clip-fill`    | `mask-clip: fill-box;`    | 以填滿區域裁切 |
| `mask-clip-stroke`  | `mask-clip: stroke-box;`  | 以描邊區域裁切 |
| `mask-clip-view`    | `mask-clip: view-box;`    | 以視圖區域裁切 |
| `mask-no-clip`      | `mask-clip: no-clip;`     | 不進行裁切     |

```html
<div class="mask-clip-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-clip-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-clip-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

## mask-composite
設定多重遮罩的合成方式，決定遮罩如何疊加。

| 類別名稱         | 對應 CSS 屬性                | 說明     |
| ---------------- | ---------------------------- | -------- |
| `mask-add`       | `mask-composite: add;`       | 疊加遮罩 |
| `mask-subtract`  | `mask-composite: subtract;`  | 減去遮罩 |
| `mask-intersect` | `mask-composite: intersect;` | 交集遮罩 |
| `mask-exclude`   | `mask-composite: exclude;`   | 排除遮罩 |

```html
<div class="mask-add mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
<div class="mask-subtract mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
<div class="mask-intersect mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
<div class="mask-exclude mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
```

## mask-image
設定遮罩所使用的圖片來源。

> <kbd>t</kbd>:top, <kbd>r</kbd>:right, <kbd>b</kbd>:bottom, <kbd>l</kbd>:left, <kbd>y</kbd>:top-bottom, <kbd>x</kbd>:right-left

### img, linear
| 類別名稱                                     | 對應 CSS 屬性                                                                                                                                                                                                                                                                                                               | 說明                                             |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `mask-[<value>]`                             | `mask-image: <value>;`                                                                                                                                                                                                                                                                                                      | 自訂遮罩（可用 url、gradient 等）                |
| `mask-(<custom-property>)`                   | `mask-image: var(<custom-property>);`                                                                                                                                                                                                                                                                                       | 使用 CSS 變數作為遮罩                            |
| `mask-none`                                  | `mask-image: none;`                                                                                                                                                                                                                                                                                                         | 不使用遮罩                                       |
| `mask-linear-<number>`                       | `mask-image: linear-gradient(<number>deg, black var(--tw-mask-linear-from), transparent var(--tw-mask-linear-to));`                                                                                                                                                                                                         | 線性漸層遮罩（正角度）                           |
| `-mask-linear-<number>`                      | `mask-image: linear-gradient(calc(<number>deg * -1), black var(--tw-mask-linear-from), transparent var(--tw-mask-linear-to));`                                                                                                                                                                                              | 線性漸層遮罩（反向角度）                         |
| `mask-linear-from-<number>`                  | `mask-image: linear-gradient(var(--tw-mask-linear-position), black calc(var(--spacing * <number>)), transparent var(--tw-mask-linear-to));`                                                                                                                                                                                 | 起始點為指定數值（以 spacing 單位）              |
| `mask-linear-from-<percentage>`              | `mask-image: linear-gradient(var(--tw-mask-linear-position), black <percentage>, transparent var(--tw-mask-linear-to));`                                                                                                                                                                                                    | 起始點為百分比                                   |
| `mask-linear-from-<color>`                   | `mask-image: linear-gradient(var(--tw-mask-linear-position), <color> var(--tw-mask-linear-from), transparent var(--tw-mask-linear-to));`                                                                                                                                                                                    | 起始點為指定顏色                                 |
| `mask-linear-from-(<custom-property>)`       | `mask-image: linear-gradient(var(--tw-mask-linear-position), black <custom-property>, transparent var(--tw-mask-linear-to));`                                                                                                                                                                                               | 起始點為自訂 CSS 變數                            |
| `mask-linear-from-[<value>]`                 | `mask-image: linear-gradient(var(--tw-mask-linear-position), black <value>, transparent var(--tw-mask-linear-to));`                                                                                                                                                                                                         | 起始點為自訂值                                   |
| `mask-linear-to-<number>`                    | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent calc(var(--spacing * <number>)));`                                                                                                                                                                               | 結束點為指定數值（以 spacing 單位）              |
| `mask-linear-to-<percentage>`                | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent <percentage>);`                                                                                                                                                                                                  | 結束點為百分比                                   |
| `mask-linear-to-<color>`                     | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), <color> var(--tw-mask-linear-to));`                                                                                                                                                                                          | 結束點為指定顏色                                 |
| `mask-linear-to-(<custom-property>)`         | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent var(<custom-property>));`                                                                                                                                                                                        | 結束點為自訂 CSS 變數                            |
| `mask-linear-to-[<value>]`                   | `mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent <value>);`                                                                                                                                                                                                       | 結束點為自訂值                                   |
| `mask-<t\|r\|b\|l>-from-<number>`            | `mask-image: linear-gradient(to <arrow>, black calc(var(--spacing * <number>)), transparent var(--tw-mask-<arrow>-to));`                                                                                                                                                                                                    | 從上方起始點為指定數值（以 spacing 單位）        |
| `mask-<t\|r\|b\|l>-from-<percentage>`        | `mask-image: linear-gradient(to <arrow>, black <percentage>, transparent var(--tw-mask-<arrow>-to));`                                                                                                                                                                                                                       | 從<arrow>方向起始點為百分比                      |
| `mask-<t\|r\|b\|l>-from-<color>`             | `mask-image: linear-gradient(to <arrow>, <color> var(--tw-mask-<arrow>-from), transparent var(--tw-mask-<arrow>-to));`                                                                                                                                                                                                      | 從<arrow>方向起始點為指定顏色                    |
| `mask-<t\|r\|b\|l>-from-(<custom-property>)` | `mask-image: linear-gradient(to <arrow>, black var(<custom-property>), transparent var(--tw-mask-<arrow>-to));`                                                                                                                                                                                                             | 從<arrow>方向起始點為自訂 CSS 變數               |
| `mask-<t\|r\|b\|l>-from-[<value>]`           | `mask-image: linear-gradient(to <arrow>, black <value>, transparent var(--tw-mask-<arrow>-to));`                                                                                                                                                                                                                            | 從<arrow>方向起始點為自訂值                      |
| `mask-<t\|r\|b\|l>-to-<number>`              | `mask-image: linear-gradient(to <arrow>, black var(--tw-mask-<arrow>-from), transparent calc(var(--spacing * <number>)));`                                                                                                                                                                                                  | 從<arrow>方向結束點為指定數值（以 spacing 單位） |
| `mask-<t\|r\|b\|l>-to-<percentage>`          | `mask-image: linear-gradient(to <arrow>, black var(--tw-mask-<arrow>-from), transparent <percentage>);`                                                                                                                                                                                                                     | 從<arrow>方向結束點為百分比                      |
| `mask-<t\|r\|b\|l>-to-<color>`               | `mask-image: linear-gradient(to <arrow>, black var(--tw-mask-<arrow>-from), <color> var(--tw-mask-<arrow>-to));`                                                                                                                                                                                                            | 從<arrow>方向結束點為指定顏色                    |
| `mask-<t\|r\|b\|l>-to-(<custom-property>)`   | `mask-image: linear-gradient(to <arrow>, black var(--tw-mask-<arrow>-from), transparent var(<custom-property>));`                                                                                                                                                                                                           | 從<arrow>方向結束點為自訂 CSS 變數               |
| `mask-<t\|r\|b\|l>-to-[<value>]`             | `mask-image: linear-gradient(to <arrow>, black var(--tw-mask-<arrow>-from), transparent <value>);`                                                                                                                                                                                                                          | 從<arrow>方向結束點為自訂值                      |
| `mask-<y\|x>-from-<number>`                  | `mask-image: linear-gradient(to <y=top\|x=right>, black calc(var(--spacing * <number>)), transparent var(--tw-mask-<y=top\|x=right>-to)), linear-gradient(to <y=bottom\|x=left>, black calc(var(--spacing * <number>)), transparent var(--tw-mask-<y=bottom\|x=left>-to));`<br>`mask-composite: intersect;`                 | 垂直方向起始點為指定數值（以 spacing 單位）      |
| `mask-<y\|x>-from-<percentage>`              | `mask-image: linear-gradient(to <y=top\|x=right>, black <percentage>, transparent var(--tw-mask-<y=top\|x=right>-to)), linear-gradient(to <y=bottom\|x=left>, black <percentage>, transparent var(--tw-mask-<y=bottom\|x=left>-to));`<br>`mask-composite: intersect;`                                                       | 垂直方向起始點為百分比                           |
| `mask-<y\|x>-from-<color>`                   | `mask-image: linear-gradient(to <y=top\|x=right>, <color> var(--tw-mask-<y=top\|x=right>-from), transparent var(--tw-mask-<y=top\|x=right>-to)), linear-gradient(to <y=bottom\|x=left>, <color> var(--tw-mask-<y=bottom\|x=left>-from), transparent var(--tw-mask-<y=bottom\|x=left>-to));`<br>`mask-composite: intersect;` | 垂直方向起始點為指定顏色                         |
| `mask-<y\|x>-from-(<custom-property>)`       | `mask-image: linear-gradient(to <y=top\|x=right>, black var(<custom-property>), transparent var(--tw-mask-<y=top\|x=right>-to)), linear-gradient(to <y=bottom\|x=left>, black var(<custom-property>), transparent var(--tw-mask-<y=bottom\|x=left>-to));`<br>`mask-composite: intersect;`                                   | 垂直方向起始點為自訂 CSS 變數                    |
| `mask-<y\|x>-from-[<value>]`                 | `mask-image: linear-gradient(to <y=top\|x=right>, black <value>, transparent var(--tw-mask-<y=top\|x=right>-to)), linear-gradient(to <y=bottom\|x=left>, black <value>, transparent var(--tw-mask-<y=bottom\|x=left>-to));`<br>`mask-composite: intersect;`                                                                 | 垂直方向起始點為自訂值                           |
| `mask-<y\|x>-to-<number>`                    | `mask-image: linear-gradient(to <y=top\|x=right>, black var(--tw-mask-<y=top\|x=right>-from), transparent calc(var(--spacing * <number>)), linear-gradient(to <y=bottom\|x=left>, black var(--tw-mask-<y=bottom\|x=left>-from), transparent calc(var(--spacing * <number>));`<br>`mask-composite: intersect;`               | 垂直方向結束點為指定數值（以 spacing 單位）      |
| `mask-<y\|x>-to-<percentage>`                | `mask-image: linear-gradient(to <y=bottom\|x=left>, black var(--tw-mask-<y=top\|x=right>-from), transparent <percentage>), linear-gradient(to <y=bottom\|x=left>, black var(--tw-mask-<y=bottom\|x=left>-from), transparent <percentage>);`<br>`mask-composite: intersect;`                                                 | 垂直方向結束點為百分比                           |
| `mask-<y\|x>-to-<color>`                     | `mask-image: linear-gradient(to <y=bottom\|x=left>, black var(--tw-mask-<y=top\|x=right>-from), <color> var(--tw-mask-<y=top\|x=right>-to)), linear-gradient(to <y=bottom\|x=left>, black var(--tw-mask-<y=bottom\|x=left>-from), <color> var(--tw-mask-<y=bottom\|x=left>-to));`<br>`mask-composite: intersect;`           | 垂直方向結束點為指定顏色                         |
| `mask-<y\|x>-to-(<custom-property>)`         | `mask-image: linear-gradient(to <y=top\|x=right>, black var(--tw-mask-<y=top\|x=right>-from), transparent var(<custom-property>)),linear-gradient(to <y=bottom\|x=left>, black var(--tw-mask-<y=bottom\|x=left>-from), transparent var(<custom-property>));`<br>`mask-composite: intersect;`                                | 垂直方向結束點為自訂 CSS 變數                    |
| `mask-<y\|x>-to-[<value>]`                   | `mask-image: linear-gradient(to <y=top\|x=right>, black var(--tw-mask-<y=top\|x=right>-from), transparent <value>),linear-gradient(to <y=bottom\|x=left>, black var(--tw-mask-<y=bottom\|x=left>-from), transparent <value>);`<br>`mask-composite: intersect;`                                                              | 垂直方向結束點為自訂值                           |

```html
<!-- image 遮罩 -->
<div class="mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<!-- linear-gradient 遮罩 -->
<div class="mask-t-from-50% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-r-from-30% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-l-from-50% mask-l-to-90% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-b-from-20% mask-b-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-x-from-70% mask-x-to-90% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-y-from-70% mask-y-to-90% bg-[url(/img/mountains.jpg)] ..."></div>
<!-- linear-gradient & deg 遮罩 -->
<div class="mask-linear-50 mask-linear-from-60% mask-linear-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="-mask-linear-50 mask-linear-from-60% mask-linear-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
```

### radial

| 類別名稱                               | 對應 CSS 屬性                                                                                                                                                                                           | 說明                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `mask-radial-[<value>]`                | `mask-image: radial-gradient(<value>);`                                                                                                                                                                 | 自訂徑向漸層遮罩                            |
| `mask-radial-[<size>]`                 | `--tw-mask-radial-size: <size>;`                                                                                                                                                                        | 設定徑向漸層遮罩尺寸（單一值）              |
| `mask-radial-[<size>_<size>]`          | `--tw-mask-radial-size: <size> <size>;`                                                                                                                                                                 | 設定徑向漸層遮罩尺寸（寬高）                |
| `mask-radial-from-<number>`            | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black calc(var(--spacing * <number>)), transparent var(--tw-mask-radial-to));`   | 徑向漸層起始點為指定數值（以 spacing 單位） |
| `mask-radial-from-<percentage>`        | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black <percentage>, transparent var(--tw-mask-radial-to));`                      | 徑向漸層起始點為百分比                      |
| `mask-radial-from-<color>`             | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), <color> var(--tw-mask-radial-from), transparent var(--tw-mask-radial-to));`      | 徑向漸層起始點為指定顏色                    |
| `mask-radial-from-(<custom-property>)` | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(<custom-property>), transparent var(--tw-mask-radial-to));`            | 徑向漸層起始點為自訂 CSS 變數               |
| `mask-radial-from-[<value>]`           | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black <value>, transparent var(--tw-mask-radial-to));`                           | 徑向漸層起始點為自訂值                      |
| `mask-radial-to-<number>`              | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), transparent calc(var(--spacing * <number>)));` | 徑向漸層結束點為指定數值（以 spacing 單位） |
| `mask-radial-to-<percentage>`          | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), transparent <percentage>);`                    | 徑向漸層結束點為百分比                      |
| `mask-radial-to-<color>`               | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), <color> var(--tw-mask-radial-to));`            | 徑向漸層結束點為指定顏色                    |
| `mask-radial-to-(<custom-property>)`   | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), transparent var(<custom-property>));`          | 徑向漸層結束點為自訂 CSS 變數               |
| `mask-radial-to-[<value>]`             | `mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), transparent <value>);`                         | 徑向漸層結束點為自訂值                      |
| `mask-circle`                          | `--tw-mask-radial-shape: circle;`                                                                                                                                                                       | 徑向遮罩形狀為圓形                          |
| `mask-ellipse`                         | `--tw-mask-radial-shape: ellipse;`                                                                                                                                                                      | 徑向遮罩形狀為橢圓                          |
| `mask-radial-closest-corner`           | `--tw-mask-radial-size: closest-corner;`                                                                                                                                                                | 徑向遮罩尺寸為最近角落                      |
| `mask-radial-closest-side`             | `--tw-mask-radial-size: closest-side;`                                                                                                                                                                  | 徑向遮罩尺寸為最近邊緣                      |
| `mask-radial-farthest-corner`          | `--tw-mask-radial-size: farthest-corner;`                                                                                                                                                               | 徑向遮罩尺寸為最遠角落                      |
| `mask-radial-farthest-side`            | `--tw-mask-radial-size: farthest-side;`                                                                                                                                                                 | 徑向遮罩尺寸為最遠邊緣                      |
| `mask-radial-at-top-left`              | `--tw-mask-radial-position: top left;`                                                                                                                                                                  | 徑向遮罩定位於左上角                        |
| `mask-radial-at-top`                   | `--tw-mask-radial-position: top;`                                                                                                                                                                       | 徑向遮罩定位於上方                          |
| `mask-radial-at-top-right`             | `--tw-mask-radial-position: top right;`                                                                                                                                                                 | 徑向遮罩定位於右上角                        |
| `mask-radial-at-left`                  | `--tw-mask-radial-position: left;`                                                                                                                                                                      | 徑向遮罩定位於左側                          |
| `mask-radial-at-center`                | `--tw-mask-radial-position: center;`                                                                                                                                                                    | 徑向遮罩定位於中央                          |
| `mask-radial-at-right`                 | `--tw-mask-radial-position: right;`                                                                                                                                                                     | 徑向遮罩定位於右側                          |
| `mask-radial-at-bottom-left`           | `--tw-mask-radial-position: bottom left;`                                                                                                                                                               | 徑向遮罩定位於左下角                        |
| `mask-radial-at-bottom`                | `--tw-mask-radial-position: bottom;`                                                                                                                                                                    | 徑向遮罩定位於下方                          |
| `mask-radial-at-bottom-right`          | `--tw-mask-radial-position: bottom right;`                                                                                                                                                              | 徑向遮罩定位於右下角                        |
| `mask-conic-<number>`                  | `mask-image: conic-gradient(from <number>deg, black var(--tw-mask-conic-from), transparent var(--tw-mask-conic-to));`                                                                                   | 錐形遮罩，起始角度為指定度數                |
| `-mask-conic-<number>`                 | `mask-image: conic-gradient(from calc(<number>deg * -1), black var(--tw-mask-conic-from), transparent var(--tw-mask-conic-to));`                                                                        | 錐形遮罩，起始角度為負值                    |
| `mask-conic-from-<number>`             | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black calc(var(--spacing * <number>)), transparent var(--tw-mask-conic-to));`                                                           | 錐形遮罩起始點為指定數值（以 spacing 單位） |
| `mask-conic-from-<percentage>`         | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black <percentage>, transparent var(--tw-mask-conic-to));`                                                                              | 錐形遮罩起始點為百分比                      |
| `mask-conic-from-<color>`              | `mask-image: conic-gradient(from var(--tw-mask-conic-position), <color> var(--tw-mask-conic-from), transparent var(--tw-mask-conic-to));`                                                               | 錐形遮罩起始點為指定顏色                    |
| `mask-conic-from-(<custom-property>)`  | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(<custom-property>), transparent var(--tw-mask-conic-to));`                                                                    | 錐形遮罩起始點為自訂 CSS 變數               |
| `mask-conic-from-[<value>]`            | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black <value>, transparent var(--tw-mask-conic-to));`                                                                                   | 錐形遮罩起始點為自訂值                      |
| `mask-conic-to-<number>`               | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), transparent calc(var(--spacing * <number>)));`                                                         | 錐形遮罩結束點為指定數值（以 spacing 單位） |
| `mask-conic-to-<percentage>`           | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), transparent <percentage>);`                                                                            | 錐形遮罩結束點為百分比                      |
| `mask-conic-to-<color>`                | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), <color> var(--tw-mask-conic-to));`                                                                     | 錐形遮罩結束點為指定顏色                    |
| `mask-conic-to-(<custom-property>)`    | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), transparent var(<custom-property>));`                                                                  | 錐形遮罩結束點為自訂 CSS 變數               |
| `mask-conic-to-[<value>]`              | `mask-image: conic-gradient(from var(--tw-mask-conic-position), black var(--tw-mask-conic-from), transparent <value>);`                                                                                 | 錐形遮罩結束點為自訂值                      |

```html
<!-- 放射狀遮罩 -->
<img class="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-left ..." src="/img/keyboard.png" />
<!-- 放射狀遮罩位置 -->
<div class="mask-radial-at-top-left mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-at-top mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-at-top-right mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-at-left mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-at-center mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-at-right mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-at-bottom-left mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-at-bottom mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-at-bottom-right mask-radial-from-100% bg-[url(/img/mountains.jpg)] ..."></div>
<!-- 放射狀遮罩大小 -->
<div class="mask-radial-closest-side mask-radial-from-100% mask-radial-at-[30%_30%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-closest-corner mask-radial-from-100% mask-radial-at-[30%_30%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-farthest-side mask-radial-from-100% mask-radial-at-[30%_30%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-radial-farthest-corner mask-radial-from-100% mask-radial-at-[30%_30%] bg-[url(/img/mountains.jpg)] ..."></div>
<!-- 圓錐遮罩 -->
<div class="grid grid-cols-1 grid-rows-1">
  <div class="border-4 border-gray-100 dark:border-gray-700 ..."></div>
  <div class="border-4 border-amber-500 mask-conic-from-75% mask-conic-to-75% dark:border-amber-400 ..."></div>
</div>
```

### mix, custom
```html
<!-- 組合遮罩 -->
<div class="mask-b-from-50% mask-radial-[50%_90%] mask-radial-from-80% bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-r-from-80% mask-b-from-80% mask-radial-from-70% mask-radial-to-85% bg-[url(/img/mountains.jpg)] ..."></div>
<!-- 任意值 -->
<div class="mask-linear-[70deg,transparent_10%,black,transparent_80%] ..."></div>
<div class="mask-linear-(--my-mask) ..."></div>
```

### 自訂
```css
@theme {
  --color-regal-blue: #243c5a; 
}
```
```html
<div class="mask-radial-from-regal-blue"></div>
```

## mask-mode
設定遮罩的繪製模式（alpha 或 luminance）。

| 類別名稱         | 對應 CSS 屬性              | 說明         |
| ---------------- | -------------------------- | ------------ |
| `mask-alpha`     | `mask-mode: alpha;`        | 透明度遮罩   |
| `mask-luminance` | `mask-mode: luminance;`    | 亮度遮罩     |
| `mask-match`     | `mask-mode: match-source;` | 跟隨來源遮罩 |

```html
<div class="mask-alpha mask-r-from-black mask-r-from-50% mask-r-to-transparent bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-luminance mask-r-from-white mask-r-from-50% mask-r-to-black bg-[url(/img/mountains.jpg)] ..."></div>
```

## mask-origin
設定遮罩定位的參考點。

| 類別名稱              | 對應 CSS 屬性               | 說明                |
| --------------------- | --------------------------- | ------------------- |
| `mask-origin-border`  | `mask-origin: border-box;`  | 以邊框為基準        |
| `mask-origin-padding` | `mask-origin: padding-box;` | 以內距為基準        |
| `mask-origin-content` | `mask-origin: content-box;` | 以內容為基準        |
| `mask-origin-fill`    | `mask-origin: fill-box;`    | 以 SVG 填滿區為基準 |
| `mask-origin-stroke`  | `mask-origin: stroke-box;`  | 以 SVG 描邊區為基準 |
| `mask-origin-view`    | `mask-origin: view-box;`    | 以 SVG 檢視區為基準 |

```html
<div class="mask-origin-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-origin-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-origin-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

## mask-position
設定遮罩圖片的顯示位置。

| 類別名稱                            | 對應 CSS 屬性                            | 說明              |
| ----------------------------------- | ---------------------------------------- | ----------------- |
| `mask-top-left`                     | `mask-position: top left;`               | 左上角顯示        |
| `mask-top`                          | `mask-position: top;`                    | 置頂顯示          |
| `mask-top-right`                    | `mask-position: top right;`              | 右上角顯示        |
| `mask-left`                         | `mask-position: left;`                   | 靠左顯示          |
| `mask-center`                       | `mask-position: center;`                 | 置中顯示          |
| `mask-right`                        | `mask-position: right;`                  | 靠右顯示          |
| `mask-bottom-left`                  | `mask-position: bottom left;`            | 左下角顯示        |
| `mask-bottom`                       | `mask-position: bottom;`                 | 置底顯示          |
| `mask-bottom-right`                 | `mask-position: bottom right;`           | 右下角顯示        |
| `mask-position-(<custom-property>)` | `mask-position: var(<custom-property>);` | 使用自訂 CSS 變數 |
| `mask-position-[<value>]`           | `mask-position: <value>;`                | 任意自訂值        |

```html
<div class="mask-top-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-top mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-top-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-center mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-bottom-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-bottom mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-bottom-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>

<div class="mask-position-[center_top_1rem] ..."></div>
<div class="mask-position-(--my-mask-position) ..."></div>
```

## mask-repeat
設定遮罩圖片是否重複平鋪。

| 類別名稱            | 對應 CSS 屬性             | 說明           |
| ------------------- | ------------------------- | -------------- |
| `mask-repeat`       | `mask-repeat: repeat;`    | 重複平鋪       |
| `mask-no-repeat`    | `mask-repeat: no-repeat;` | 不重複         |
| `mask-repeat-x`     | `mask-repeat: repeat-x;`  | 僅水平重複     |
| `mask-repeat-y`     | `mask-repeat: repeat-y;`  | 僅垂直重複     |
| `mask-repeat-space` | `mask-repeat: space;`     | 以間隔方式平鋪 |
| `mask-repeat-round` | `mask-repeat: round;`     | 以圓整方式平鋪 |

## mask-size
設定遮罩圖片的縮放大小。

| 類別名稱                        | 對應 CSS 屬性                        | 說明              |
| ------------------------------- | ------------------------------------ | ----------------- |
| `mask-auto`                     | `mask-size: auto;`                   | 自動大小          |
| `mask-cover`                    | `mask-size: cover;`                  | 填滿容器          |
| `mask-contain`                  | `mask-size: contain;`                | 等比例縮放至容器  |
| `mask-size-(<custom-property>)` | `mask-size: var(<custom-property>);` | 使用自訂 CSS 變數 |
| `mask-size-[<value>]`           | `mask-size: <value>;`                | 任意自訂值        |

```html
<div class="mask-cover mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>

<div class="mask-size-[auto_100px] ..."></div>
<div class="mask-size-(--my-mask-size) ..."></div>
```

## mask-type
設定遮罩類型（`alpha` 透明度遮罩或 `luminance` 亮度遮罩），主要用於指定 SVG 遮罩的解譯方式，影響遮罩如何作用於元素的顯示。

| 類別名稱              | 對應 CSS 屬性           | 說明       |
| --------------------- | ----------------------- | ---------- |
| `mask-type-alpha`     | `mask-type: alpha;`     | 透明度遮罩 |
| `mask-type-luminance` | `mask-type: luminance;` | 亮度遮罩   |

```html
<svg>
  <mask id="blob1" class="mask-type-alpha fill-gray-700/70">
    <path d="..."></path>
  </mask>
  <image href="/img/mountains.jpg" height="100%" width="100%" mask="url(#blob1)" />
</svg>
<svg>
  <mask id="blob2" class="mask-type-luminance fill-gray-700/70">
    <path d="..."></path>
  </mask>
  <image href="/img/mountains.jpg" height="100%" width="100%" mask="url(#blob2)" />
</svg>
```

# Filters
使用 CSS 濾鏡（filter）可以為元素添加模糊、亮度、對比等視覺效果，讓圖片或區塊呈現不同的風格。Tailwind CSS 提供多種 filter 與 backdrop-filter 工具類別，方便快速套用。

## filter
`filter` 主要用於直接對元素本身進行濾鏡處理。

| 類別名稱                     | 對應 CSS 屬性                     | 說明              |
| ---------------------------- | --------------------------------- | ----------------- |
| `filter-none`                | `filter: none;`                   | 移除所有濾鏡效果  |
| `filter-(<custom-property>)` | `filter: var(<custom-property>);` | 使用自訂 CSS 變數 |
| `filter-[<value>]`           | `filter: <value>;`                | 任意自訂值        |

```html
<img class="filter-[url('filters.svg#filter-id')] ..." src="/img/mountains.jpg" />
<img class="filter-(--my-filter) ..." src="/img/mountains.jpg" />
```

### blur
模糊效果，讓元素變得模糊。

| 類別名稱                   | 對應 CSS 屬性                           | 說明                |
| -------------------------- | --------------------------------------- | ------------------- |
| `blur-<size>`              | `filter: blur(var(--blur-<size>));`     | 模糊單位            |
| `blur-none`                | `filter: ;`                             | 無模糊效果          |
| `blur-(<custom-property>)` | `filter: blur(var(<custom-property>));` | 自訂 CSS 變數模糊值 |
| `blur-[<value>]`           | `filter: blur(<value>);`                | 任意自訂模糊值      |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  --blur-2xl: 40px;
  --blur-3xl: 64px;
}
```

```html
<img class="blur-sm" src="/img/mountains.jpg" />
<img class="blur-2xl" src="/img/mountains.jpg" />

<img class="blur-[2px] ..." src="/img/mountains.jpg" />
<img class="blur-(--my-blur) ..." src="/img/mountains.jpg" />
```

### brightness
調整亮度，讓元素變亮或變暗。

| 類別名稱                         | 對應 CSS 屬性                                 | 說明                          |
| -------------------------------- | --------------------------------------------- | ----------------------------- |
| `brightness-<number>`            | `filter: brightness(<number>%);`              | 亮度百分比（如 50、100、150） |
| `brightness-(<custom-property>)` | `filter: brightness(var(<custom-property>));` | 使用自訂 CSS 變數亮度         |
| `brightness-[<value>]`           | `filter: brightness(<value>);`                | 任意自訂亮度值                |

```html
<img class="brightness-125 ..." src="/img/mountains.jpg" />
<img class="brightness-[1.75] ..." src="/img/mountains.jpg" />
<img class="brightness-(--my-brightness) ..." src="/img/mountains.jpg" />
```

### contrast
調整對比度，讓元素顏色更鮮明或更灰。

| 類別名稱                       | 對應 CSS 屬性                               | 說明                            |
| ------------------------------ | ------------------------------------------- | ------------------------------- |
| `contrast-<number>`            | `filter: contrast(<number>%);`              | 對比度百分比（如 50、100、150） |
| `contrast-(<custom-property>)` | `filter: contrast(var(<custom-property>));` | 使用自訂 CSS 變數對比度         |
| `contrast-[<value>]`           | `filter: contrast(<value>);`                | 任意自訂對比度值                |

```html
<img class="contrast-125 ..." src="/img/mountains.jpg" />
<img class="contrast-[.25] ..." src="/img/mountains.jpg" />
<img class="contrast-(--my-contrast) ..." src="/img/mountains.jpg" />
```

### drop-shadow
添加陰影效果，讓元素有立體感。

| 類別名稱                                | 對應 CSS 屬性                                          | 說明                       |
| --------------------------------------- | ------------------------------------------------------ | -------------------------- |
| `drop-shadow-<size>`                    | `filter: drop-shadow(var(--drop-shadow-<size>));`      | 陰影尺寸單位               |
| `drop-shadow-none`                      | `filter: drop-shadow(0 0 #0000);`                      | 無陰影                     |
| `drop-shadow-(<custom-property>)`       | `filter: drop-shadow(var(<custom-property>));`         | 使用自訂 CSS 變數陰影      |
| `drop-shadow-(color:<custom-property>)` | `--tw-drop-shadow-color: var(<custom-property>);`      | 自訂陰影顏色（CSS 變數）   |
| `drop-shadow-[<value>]`                 | `filter: drop-shadow(<value>);`                        | 任意自訂陰影值             |
| `drop-shadow-inherit`                   | `--tw-drop-shadow-color: inherit;`                     | 繼承父層陰影顏色           |
| `drop-shadow-current`                   | `--tw-drop-shadow-color: currentColor;`                | 使用當前文字顏色作為陰影色 |
| `drop-shadow-transparent`               | `--tw-drop-shadow-color: transparent;`                 | 透明陰影                   |
| `drop-shadow-black`                     | `--tw-drop-shadow-color: var(--color-black);`          | 黑色陰影（#000）           |
| `drop-shadow-white`                     | `--tw-drop-shadow-color: var(--color-white);`          | 白色陰影（#fff）           |
| `drop-shadow-<color>-<step>`            | `--tw-drop-shadow-color: var(--color-<color>-<step>);` | 陰影指定色 step            |

```css
:r {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  --blur-2xl: 40px;
  --blur-3xl: 64px;
}
```

{% note info %}
**color & step**
- `<color>` 代表 Tailwind CSS 預設色彩名稱，你可以參考 [官方色彩文件](https://tailwindcss.com/docs/customizing-colors#default-color-palette) 取得完整色彩名稱與對應色階。
- `<step>` 代表顏色的階段數值，用來細分同一色系的深淺。Tailwind CSS 預設的色階數值有：50、100、200、300、400、500、600、700、800、900、950。數字越小顏色越淺，數字越大顏色越深。例如 `border-blue-500` 表示藍色第 500 階段。

```css
:root {
  /* Tailwind CSS 主要色彩 400 階段，使用 OKLCH 色彩空間表示法 */
  --color-red-400: oklch(70.4% 0.191 22.216);         /* 紅 red */
  --color-orange-400: oklch(75% 0.183 55.934);        /* 橘 orange */
  --color-amber-400: oklch(82.8% 0.189 84.429);       /* 琥珀 amber */
  --color-yellow-400: oklch(85.2% 0.199 91.936);      /* 黃 yellow */
  --color-lime-400: oklch(84.1% 0.238 128.85);        /* 萊姆綠 lime */
  --color-green-400: oklch(79.2% 0.209 151.711);      /* 綠 green */
  --color-emerald-400: oklch(76.5% 0.177 163.223);    /* 祖母綠 emerald */
  --color-teal-400: oklch(77.7% 0.152 181.912);       /* 藍綠 teal */
  --color-cyan-400: oklch(78.9% 0.154 211.53);        /* 青 cyan */
  --color-sky-400: oklch(74.6% 0.16 232.661);         /* 天空藍 sky */
  --color-blue-400: oklch(70.7% 0.165 254.624);       /* 藍 blue */
  --color-indigo-400: oklch(67.3% 0.182 276.935);     /* 靛藍 indigo */
  --color-violet-400: oklch(70.2% 0.183 293.541);     /* 紫羅蘭 violet */
  --color-purple-400: oklch(71.4% 0.203 305.504);     /* 紫 purple */
  --color-fuchsia-400: oklch(74% 0.238 322.16);       /* 紫紅 fuchsia */
  --color-pink-400: oklch(71.8% 0.202 349.761);       /* 粉紅 pink */
  --color-rose-400: oklch(71.2% 0.194 13.428);        /* 玫瑰 rose */
  --color-slate-400: oklch(70.4% 0.04 256.788);       /* 石板灰 slate */
  --color-gray-400: oklch(70.7% 0.022 261.325);       /* 灰 gray */
  --color-zinc-400: oklch(70.5% 0.015 286.067);       /* 鋅灰 zinc */
  --color-neutral-400: oklch(70.8% 0 0);              /* 中性 neutral */
  --color-stone-400: oklch(70.9% 0.01 56.259);        /* 石 stone */
}
```
{% endnote %}

```html
<!-- 基本範例 -->
<svg class="drop-shadow-lg ..."></svg>
<!-- 不透明度 -->
<svg class="fill-white drop-shadow-xl/25 ...">...</svg>
<!-- 陰影顏色 -->
<svg class="fill-indigo-500 drop-shadow-lg drop-shadow-indigo-500/50 ...">...</svg>
<!-- 任意值 -->
<svg class="drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] ..."></svg>
<svg class="drop-shadow-(--my-drop-shadow) ..."></svg>
```

#### 自訂
```css
@theme {
  --drop-shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25); 
  --color-regal-blue: #243c5a; 
}
```
```html
<svg class="drop-shadow-3xl"></svg>
<svg class="drop-shadow-regal-blue"></svg>
```

### grayscale
將元素轉為灰階。

| 類別名稱                        | 對應 CSS 屬性                                | 說明                    |
| ------------------------------- | -------------------------------------------- | ----------------------- |
| `grayscale`                     | `filter: grayscale(100%);`                   | 完全灰階                |
| `grayscale-<number>`            | `filter: grayscale(<number>%);`              | 指定百分比灰階（如 50） |
| `grayscale-(<custom-property>)` | `filter: grayscale(var(<custom-property>));` | 使用 CSS 變數自訂灰階值 |
| `grayscale-[<value>]`           | `filter: grayscale(<value>);`                | 任意自訂灰階值          |

```html
<img class="grayscale-25 ..." src="/img/mountains.jpg" />

<img class="grayscale-[0.5] ..." src="/img/mountains.jpg" />
<img class="grayscale-(--my-grayscale) ..." src="/img/mountains.jpg" />
```

### hue-rotate
調整色相，改變顏色輪的位置。

| 類別名稱                         | 對應 CSS 屬性                                 | 說明                           |
| -------------------------------- | --------------------------------------------- | ------------------------------ |
| `hue-rotate-<number>`            | `filter: hue-rotate(<number>deg);`            | 順時針旋轉指定角度（度數）色相 |
| `-hue-rotate-<number>`           | `filter: hue-rotate(calc(<number>deg * -1));` | 逆時針旋轉指定角度（度數）色相 |
| `hue-rotate-(<custom-property>)` | `filter: hue-rotate(var(<custom-property>));` | 使用 CSS 變數自訂色相旋轉值    |
| `hue-rotate-[<value>]`           | `filter: hue-rotate(<value>);`                | 任意自訂色相旋轉值             |

```html
<img class="hue-rotate-180" src="/img/mountains.jpg" />
<img class="-hue-rotate-45" src="/img/mountains.jpg" />
<img class="hue-rotate-[3.142rad] ..." src="/img/mountains.jpg" />
<img class="hue-rotate-(--my-hue-rotate) ..." src="/img/mountains.jpg" />
```

### invert
反轉顏色，產生底片效果。

| 類別名稱                     | 對應 CSS 屬性                             | 說明                     |
| ---------------------------- | ----------------------------------------- | ------------------------ |
| `invert`                     | `filter: invert(100%);`                   | 完全反轉顏色（底片效果） |
| `invert-<number>`            | `filter: invert(<number>%);`              | 指定百分比反轉（如 50）  |
| `invert-(<custom-property>)` | `filter: invert(var(<custom-property>));` | 使用 CSS 變數自訂反轉值  |
| `invert-[<value>]`           | `filter: invert(<value>);`                | 任意自訂反轉值           |

```html
<img class="invert-0" src="/img/mountains.jpg" />
<img class="invert-20" src="/img/mountains.jpg" />
<img class="invert-[.25] ..." src="/img/mountains.jpg" />
<img class="invert-(--my-inversion) ..." src="/img/mountains.jpg" />
```

### saturate
調整飽和度，讓顏色更鮮豔或更灰。

| 類別名稱                       | 對應 CSS 屬性                               | 說明                       |
| ------------------------------ | ------------------------------------------- | -------------------------- |
| `saturate-<number>`            | `filter: saturate(<number>%);`              | 指定百分比飽和度（如 150） |
| `saturate-(<custom-property>)` | `filter: saturate(var(<custom-property>));` | 使用 CSS 變數自訂飽和度值  |
| `saturate-[<value>]`           | `filter: saturate(<value>);`                | 任意自訂飽和度值           |

```html
<img class="saturate-100 ..." src="/img/mountains.jpg" />
<img class="saturate-[.25] ..." src="/img/mountains.jpg" />
<img class="saturate-(--my-saturation) ..." src="/img/mountains.jpg" />
```

### sepia
懷舊棕色濾鏡，讓元素呈現復古色調。

| 類別名稱                    | 對應 CSS 屬性                            | 說明                        |
| --------------------------- | ---------------------------------------- | --------------------------- |
| `sepia`                     | `filter: sepia(100%);`                   | 完全懷舊棕色效果            |
| `sepia-<number>`            | `filter: sepia(<number>%);`              | 指定百分比懷舊棕色（如 50） |
| `sepia-(<custom-property>)` | `filter: sepia(var(<custom-property>));` | 使用 CSS 變數自訂懷舊棕色值 |
| `sepia-[<value>]`           | `filter: sepia(<value>);`                | 任意自訂懷舊棕色值          |

```html
<img class="sepia-50" src="/img/mountains.jpg" />
<img class="sepia" src="/img/mountains.jpg" />
<img class="sepia-[.25] ..." src="/img/mountains.jpg" />
<img class="sepia-(--my-sepia) ..." src="/img/mountains.jpg" />
```

## backdrop-filter
`backdrop-filter` 用於對元素背後的內容進行濾鏡處理，常見於玻璃擬態（Glassmorphism）設計。

| 類別名稱                              | 對應 CSS 屬性                              | 說明                            |
| ------------------------------------- | ------------------------------------------ | ------------------------------- |
| `backdrop-filter-none`                | `backdrop-filter: none;`                   | 移除所有 backdrop 濾鏡效果      |
| `backdrop-filter-(<custom-property>)` | `backdrop-filter: var(<custom-property>);` | 使用 CSS 變數自訂 backdrop 濾鏡 |
| `backdrop-filter-[<value>]`           | `backdrop-filter: <value>;`                | 任意自訂 backdrop 濾鏡值        |

```html
<div class="backdrop-filter-[url('filters.svg#filter-id')] ..."></div>
<div class="backdrop-filter-(--my-backdrop-filter) ..."></div>
```

### blur
背景模糊，常用於玻璃效果。

| 類別名稱                            | 對應 CSS 屬性                                    | 說明                    |
| ----------------------------------- | ------------------------------------------------ | ----------------------- |
| `backdrop-blur-<size>`              | `backdrop-filter: blur(var(--blur-<size>));`     | 模糊尺寸單位            |
| `backdrop-blur-none`                | `backdrop-filter: ;`                             | 無模糊效果              |
| `backdrop-blur-(<custom-property>)` | `backdrop-filter: blur(var(<custom-property>));` | 使用 CSS 變數自訂模糊值 |
| `backdrop-blur-[<value>]`           | `backdrop-filter: blur(<value>);`                | 任意自訂模糊值          |

```css
:root {
  /* 下方為 Tailwind 的 CSS 變數定義，對應 <size> 用途 */
  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  --blur-2xl: 40px;
  --blur-3xl: 64px;
}
```

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-blur-sm ..."></div>
  <div class="backdrop-blur-[2px] ..."></div>
  <div class="backdrop-blur-(--my-backdrop-blur) ..."></div>
</div>
```

#### 自訂
```css
@theme {
  --blur-2xs: 2px; 
}
```
```html
<div class="backdrop-blur-2xs"></div>
```

### brightness
背景亮度調整。

| 類別名稱                                  | 對應 CSS 屬性                                          | 說明                          |
| ----------------------------------------- | ------------------------------------------------------ | ----------------------------- |
| `backdrop-brightness-<number>`            | `backdrop-filter: brightness(<number>%);`              | 亮度百分比（如 50、100、150） |
| `backdrop-brightness-(<custom-property>)` | `backdrop-filter: brightness(var(<custom-property>));` | 使用自訂 CSS 變數亮度         |
| `backdrop-brightness-[<value>]`           | `backdrop-filter: brightness(<value>);`                | 任意自訂亮度值                |

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-brightness-150 ..."></div>
  <div class="backdrop-brightness-[1.75] ..."></div>
  <div class="backdrop-brightness-(--my-backdrop-brightness) ..."></div>
</div>
```

### contrast
背景對比度調整。

| 類別名稱                                | 對應 CSS 屬性                                        | 說明                            |
| --------------------------------------- | ---------------------------------------------------- | ------------------------------- |
| `backdrop-contrast-<number>`            | `backdrop-filter: contrast(<number>%);`              | 對比度百分比（如 50、100、200） |
| `backdrop-contrast-(<custom-property>)` | `backdrop-filter: contrast(var(<custom-property>));` | 使用自訂 CSS 變數對比度         |
| `backdrop-contrast-[<value>]`           | `backdrop-filter: contrast(<value>);`                | 任意自訂對比度值                |

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-contrast-200 ..."></div>
  <div class="backdrop-contrast-[.25] ..."></div>
  <div class="backdrop-contrast-(--my-backdrop-contrast) ..."></div>
</div>
```

### grayscale
背景灰階處理。

| 類別名稱                                 | 對應 CSS 屬性                                         | 說明                        |
| ---------------------------------------- | ----------------------------------------------------- | --------------------------- |
| `backdrop-grayscale`                     | `backdrop-filter: grayscale(100%);`                   | 全部灰階處理                |
| `backdrop-grayscale-<number>`            | `backdrop-filter: grayscale(<number>%);`              | 灰階百分比（如 0、50、100） |
| `backdrop-grayscale-(<custom-property>)` | `backdrop-filter: grayscale(var(<custom-property>));` | 使用自訂 CSS 變數灰階       |
| `backdrop-grayscale-[<value>]`           | `backdrop-filter: grayscale(<value>);`                | 任意自訂灰階值              |

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-grayscale-50 ..."></div>
  <div class="backdrop-grayscale-[0.5] ..."></div>
  <div class="backdrop-grayscale-(--my-backdrop-grayscale) ..."></div>
</div>
```

### hue-rotate
背景色相旋轉。

| 類別名稱                                  | 對應 CSS 屬性                                          | 說明                                   |
| ----------------------------------------- | ------------------------------------------------------ | -------------------------------------- |
| `backdrop-hue-rotate-<number>`            | `backdrop-filter: hue-rotate(<number>deg);`            | 色相旋轉角度（正值，單位 deg）         |
| `-backdrop-hue-rotate-<number>`           | `backdrop-filter: hue-rotate(calc(<number>deg * -1));` | 色相反向旋轉角度（負值，單位 deg）     |
| `backdrop-hue-rotate-(<custom-property>)` | `backdrop-filter: hue-rotate(var(<custom-property>));` | 使用自訂 CSS 變數色相旋轉              |
| `backdrop-hue-rotate-[<value>]`           | `backdrop-filter: hue-rotate(<value>);`                | 任意自訂色相旋轉值（可含單位 deg/rad） |

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-hue-rotate-180 ..."></div>
  <div class="bg-white/30 -backdrop-hue-rotate-45 ..."></div>
  <div class="backdrop-hue-rotate-[3.142rad] ..."></div>
  <div class="backdrop-hue-rotate-(--my-backdrop-hue-rotation) ..."></div>
</div>
```

### invert
背景顏色反轉。

| 類別名稱                              | 對應 CSS 屬性                                      | 說明                        |
| ------------------------------------- | -------------------------------------------------- | --------------------------- |
| `backdrop-invert`                     | `backdrop-filter: invert(100%);`                   | 全部顏色反轉                |
| `backdrop-invert-<number>`            | `backdrop-filter: invert(<number>%);`              | 反轉百分比（如 0、50、100） |
| `backdrop-invert-(<custom-property>)` | `backdrop-filter: invert(var(<custom-property>));` | 使用自訂 CSS 變數反轉       |
| `backdrop-invert-[<value>]`           | `backdrop-filter: invert(<value>);`                | 任意自訂反轉值              |

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert-65 ..."></div>
  <div class="backdrop-invert-[.25] ..."></div>
  <div class="backdrop-invert-(--my-backdrop-inversion) ..."></div>
</div>
```

### opacity
背景透明度調整。

| 類別名稱               | 對應 CSS 屬性                     | 說明       |
| ---------------------- | --------------------------------- | ---------- |
| `backdrop-opacity-<number>`            | `backdrop-filter: opacity(<number>%);`              | 透明度百分比（如 0、50、100）         |
| `backdrop-opacity-(<custom-property>)` | `backdrop-filter: opacity(var(<custom-property>));` | 使用自訂 CSS 變數透明度              |
| `backdrop-opacity-[<value>]`           | `backdrop-filter: opacity(<value>);`                | 任意自訂透明度值（可含單位如 0.5）   |

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert backdrop-opacity-60 ..."></div>
  <div class="backdrop-opacity-[.15] ..."></div>
  <div class="backdrop-opacity-(--my-backdrop-filter-opacity) ..."></div>
</div>
```

### saturate
背景飽和度調整。

| 類別名稱                | 對應 CSS 屬性                     | 說明        |
| ----------------------- | --------------------------------- | ----------- |
| `backdrop-saturate-<number>`            | `backdrop-filter: saturate(<number>%);`              | 飽和度百分比（如 0、50、100）         |
| `backdrop-saturate-(<custom-property>)` | `backdrop-filter: saturate(var(<custom-property>));` | 使用自訂 CSS 變數飽和度              |
| `backdrop-saturate-[<value>]`           | `backdrop-filter: saturate(<value>);`                | 任意自訂飽和度值（可含單位如 1.5）   |

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-saturate-125 ..."></div>
  <div class="backdrop-saturate-[.25] ..."></div>
  <div class="backdrop-saturate-(--my-backdrop-saturation) ..."></div>
</div>
```

### sepia
背景棕色化處理。

| 類別名稱             | 對應 CSS 屬性                | 說明       |
| -------------------- | ---------------------------- | ---------- |
| `backdrop-sepia`                        | `backdrop-filter: sepia(100%);`                     | 100% 棕色化處理                |
| `backdrop-sepia-<number>`               | `backdrop-filter: sepia(<number>%);`                | 棕色化百分比（如 0、50、100）   |
| `backdrop-sepia-(<custom-property>)`    | `backdrop-filter: sepia(var(<custom-property>));`   | 使用自訂 CSS 變數棕色化         |
| `backdrop-sepia-[<value>]`              | `backdrop-filter: sepia(<value>);`                  | 任意自訂棕色化值（可含單位如 0.5）|


```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-sepia-50 ..."></div>
  <div class="backdrop-sepia-[.25] ..."></div>
  <div class="backdrop-sepia-(--my-backdrop-sepia) ..."></div>
</div>
```

# Tables
## border-collapse
## border-spacing
## table-layout
## caption-side