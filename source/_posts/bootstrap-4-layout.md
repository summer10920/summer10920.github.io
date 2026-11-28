---
title: "Bootstrap 4.4：初始與排版"
categories:
  - 前端
  - Bootstrap
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - Bootstrap
date: 2020-03-26 13:22:40
---
![](assets/images/banner/bootstrap.png)

本系列根據教材課程需要進行 Bootstrap 套件的教學文章，在接觸 Bootstrap 之前需要擁有一定的 HTML5/CSS3 觀念，才能理解 Bootstrap 的原理應用以及調整技巧，如果你另具備了 JS/JQ 的開發能力，那更方便進一步的使用並控制這些 Bootstrap 套件工具。筆者這裡 Boostrap 的系列文章都來自官方本身提供的 Document 教學資料重新進行重新解析與翻譯重組解釋（也包含閹割一些覺得非必要的資訊），如果你擁有有足夠的能力可直接閱讀官方手冊並動手實作就不需要特地參閱已整理過的中文 BS 教學，動手跟著官方文件做操作練習才是最佳的經驗累積。

本篇一開始會介紹基本安裝環境，接著介紹核心的版面規劃（會牽扯到 Grid 與 flexbox）。

<!-- more -->

{% note warning %}
**版本提醒**
本文使用 Bootstrap 4.4（2020 年）。Bootstrap 5 已於 2021 年發布，主要差異包含：移除 jQuery 依賴、移除 Jumbotron 元件、`.no-gutters` 改為 `.g-0`、`ml-*`／`mr-*` 改為 `ms-*`／`me-*`，並新增 `xxl` 斷點。新專案建議直接學習 Bootstrap 5，請參考 {% post_link bootstrap-5-layout-content Bootstrap 5 教學（一） %}；本系列仍可作為維護舊專案時的參考。
{% endnote %}

---

# 介紹與安裝
Bootstrap 最早是 Twitter 公司內部的前端視覺框架，後來將常用的 CSS 與樣式打包並共享到 GitHub，因大受歡迎而獨立成為免費的 CSS 套件，並成為主流的 UI 框架。它具備良好的 RWD（響應式網頁設計）以及多項主流的 UI 設計規劃，使用 Bootstrap 的好處是不必再自行設計基礎樣式，開發前端畫面可以更便捷有效率。（以下將 Bootstrap 簡稱為 BS）

本文撰寫於 2020 年第一季，當時 BS 的最新版本為 4.4，主要包含以下重點：

1. 第四版以 flexbox 彈性盒為基礎開發，內容都具備水平與垂直的對齊與排序概念。
2. 學習 BS 之前建議先熟悉各種 CSS 屬性，因為 BS 大多數的 class 都是由 CSS 屬性組合出效果。
3. 使用網格概念將版面分成 12 格，並搭配 Media Query 分為五種寬度區間，完成不同螢幕寬度下的版面變化（即 RWD 響應式網站）。
4. 除了 class 命名公式，BS 也使用 HTML5 的 `data-*` 自訂屬性來觸發 JS 操作。

>（撰寫當時的消息）Bootstrap 5 預計在 2020 年第一季末發布，重點是移除對 jQuery 的依賴、自行提供 SVG 圖示，並不再支援 IE 10。實際發布時間為 2021 年，詳見本文開頭的版本提醒。

## 安裝初始作業
在正式學習 BS 之前，建議採用以下學習方式：

1. 官方文件有最完整的說明，本文只用來協助你加快學習步調與加強記憶，僅適時補充說明。
2. BS 的 class 名稱是由大量 CSS 屬性編製而成的公式，試著對照原生 CSS 的寫法，能同時複習 CSS 屬性。
3. 多練習並理解各屬性，未來在切版時，你就能直覺想到 BS 提供了哪些元件模組可以使用。
4. BS 的部分效果是以 Sass 產生的，除非你需要修改 BS 核心原始碼，否則文中提到 Sass 的部分可以略過，不需特別理解。

撰寫當時官方文件最新為 v4.4；中文化文件由六角學院提供（當時僅更新至 v4.2），兩者可以對照參考，對學習影響不大。另有 Layoutit 網站能幫助你快速切出 BS 版型（僅支援到 v4.0）。

- [Bootstrap 4.6 官方文件](https://getbootstrap.com/docs/4.6/)
- [Bootstrap 4 繁體中文手冊 \[六角學院譯](https://bootstrap.hexschool.com/)
- [LayoutIt! - Interface Builder for CSS Grid and Bootstrap](https://www.layoutit.com/)
- [All Bootstrap 4 CSS classes 查詢器](https://bootstrapshuffle.com/classes)

參考官方網站或中文化網站皆可，只要是 4.x 版本都適用，本文以當時最新的 4.4 作為練習。安裝方式有很多種，這裡採用最基本的下載包：裡面包含許多內容重複的檔案，各檔案的差異與用途可參考 [這份說明](https://bootstrap.hexschool.com/docs/4.2/getting-started/contents/#css-files)。

除了基本檔案之外，使用 BS 的 JS 功能還需要 jQuery 才能運作，所以要另外下載 jQuery（BS 用不到 jQuery 的特效與動畫，因此可以使用精簡的 slim 版）。另外，如果不想直接修改 BS 的 CSS，應該把自訂樣式寫在自己的 CSS 檔，並利用優先權（權重）去覆蓋，所以整個檔案結構與網頁初始化如下：

```text
plugins/
├── bootstrap.css
    // 包含 BS 各種 Class 樣式表，由於我們需要反向理解樣式表加深印象，建議使用非壓縮版本。（實際工作上若不會修改你應該使用 min 版）
├── custom.css
    //你應該把自訂的 CSS 寫在這裡而不是去調整 BS 的 CSS
├── bootstrap.bundle.min.js
    //主要包含 bootstrap.js + Popper.js，我們不會去研究 JS 的內容，所以使用壓縮版即可。
├── jquery-3.4.1.min.js
    // 如果你需要 BS 的 JS 效果就得增加 JQ 套件，slim 版本（不支援 ajax 與 effect) 亦可使用。
```

接著參考 BS 的 [元件：Jumbotron 廣告單元](https://bootstrap.hexschool.com/docs/4.2/components/jumbotron/)，試著貼上程式碼，確認能否出現一樣的畫面：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="plugins/bootstrap.css">
  <link rel="stylesheet" href="plugins/custom.css">
  <script src="plugins/jquery-3.4.1.min.js"></script>
  <script src="plugins/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="jumbotron">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
</body>
</html>
```

**預覽結果：**
如果得到如下圖，代表 BS 已正常運作（僅驗證 CSS 部分）。請注意：每次要使用 BS，都必須先引入上述的 CSS 與 JS 檔案。
![Image](https://i.imgur.com/6LjAHdX.png)

# 布局 Layout
BS 的布局有個基本觀念：任何內容都要先放進容器，讓內容在不同的螢幕寬度下都有合適的閱讀寬度。使用時需要決定三件事：容器要滿版還是限制最大寬度（多數設計師不喜歡內容滿版，因為視線移動範圍太大，除非是廣告性質的版面）；多個容器排成一列時，各自要占多少比例；以及裝置不同時，這些排列要如何重新安排。

## 容器 Containers
容器是最外層的主要包裝。如前面的安裝練習範例，沒有指定容器時，寬度會以 `body` 的 100% 計算。使用 `container` 能形成響應式寬度（隨螢幕寬度調整為合適的最大寬度）。

- `container`：窄版（響應式）
- `container-fluid`：滿版

延續前面的練習，在外層分別加上 `div.container` 與 `div.container-fluid`，並試著縮放瀏覽器寬度觀察效果。

```html
<div class="container">
  <div class="jumbotron">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
</div>
<div class="container-fluid">
  <div class="jumbotron">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
</div>
```
{% note info %}
**小技巧**
設計網頁時，不同區塊可以分別指定滿版或固定寬度的容器，並搭配背景圖，營造不同的視覺體驗。
{% endnote %}

從下列 BS 官方的樣式表可以看出，`container` 會依螢幕寬度指定不同的 `max-width`，容器因此不會變成滿版；`container-fluid` 則一律以 100% 寬度填滿。

```css bootstrap.css（官方樣式）
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
.container-fluid, .container-sm, .container-md, .container-lg, .container-xl {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
```

## 響應式切斷點 Breakpoints
響應式設計是為了因應不同裝置有不同的瀏覽器寬度，讓同一個網站在各種裝置上都有最好的瀏覽體驗：內容相同，但依裝置調整排版方式，因此不論用什麼裝置瀏覽，網站都只有一個（流量也能集中在同一個網站）。

響應式網站會依瀏覽器寬度套用合適的樣式：利用 Media Queries 取得螢幕寬度之後，依公式化的五個等級，針對不同的 viewport 寬度指定不同的樣式。

```css https://getbootstrap.com/docs/4.4/layout/overview/#responsive-breakpoints
// Extra small devices （直立手機用途，小於 576px) 沒有 Media Query 規則是因為 BS 本身以 100% 為基準

// Small devices （橫式手機用途，包含 576px 以上）
@media (min-width: 576px) { ... }

// Medium devices （平板用途，768px and up)
@media (min-width: 768px) { ... }

// Large devices （電腦用途，992px and up)
@media (min-width: 992px) { ... }

// Extra large devices （寬螢幕電腦，1200px and up)
@media (min-width: 1200px) { ... }
```

不少 BS 元件已內建響應式的定義，需要時可以查閱或試用這些 class 公式。舉例來說，v4.4 新增的 `container` 系列就有 [詳細定義](https://getbootstrap.com/docs/4.4/examples/grid/#containers)：

| class name         | Extra small<576px | Small≥576px | Medium≥768px | Large≥992px | Extra large≥1200px |
| ------------------ | ----------------- | ----------- | ------------ | ----------- | ------------------ |
| `.container`       | 100%              | 540px       | 720px        | 960px       | 1140px             |
| `.container-sm`    | 100%              | 540px       | 720px        | 960px       | 1140px             |
| `.container-md`    | 100%              | 100%        | 720px        | 960px       | 1140px             |
| `.container-lg`    | 100%              | 100%        | 100%         | 960px       | 1140px             |
| `.container-xl`    | 100%              | 100%        | 100%         | 100%        | 1140px             |
| `.container-fluid` | 100%              | 100%        | 100%         | 100%        | 100%               |

```html https://getbootstrap.com/docs/4.4/layout/overview/#containers
<style>
  div {
    background: #ccc;
    border: 2px solid #aaa;
    margin-bottom: 5px;
  }
</style>
<div class="container-xl">100% wide until extra large breakpoint</div>
<div class="container-lg">100% wide until large breakpoint</div>
<div class="container-md">100% wide until medium breakpoint</div>
<div class="container-sm">100% wide until small breakpoint</div>
<div class="container">100% wide until small breakpoint</div>
```

並不是每個元件都有響應式功能，之後會陸續介紹各元件的響應式控制；現在只需要知道，並非只有 `container` 才有響應式。

---

## 網格 Grid
網格（Grid）是 BS 的響應式排版系統，會在容器（container）內建立網格結構，並以 flexbox 的概念定義出列（row）與欄（column），讓版面規劃與內容對齊更容易。

舉例來說，下列結構能形成一列三欄的內容版面：

```html https://getbootstrap.com/docs/4.4/layout/grid/#how-it-works
<div class="container">
  <div class="row">
    <div class="col">
      One of three columns
    </div>
    <div class="col">
      One of three columns
    </div>
    <div class="col">
      One of three columns
    </div>
  </div>
</div>
```

同時試著改變瀏覽器寬度，觸發響應式效果。可整理出以下幾點：
1. `container` 預設會水平置中。
2. `container` 本身左右各有 15px 的 padding，產生留白區，讓內容不會有壓迫感。
3. `row` 加上 `col` 的結構，形成 1 列 3 欄。
4. `row` 左右各有 -15px 的 margin，抵銷 `container` 的留白。
5. `col` 左右各有 15px 的 padding，作為內容的留白區。
6. `row` 本身就是 `display: flex`，因此可以控制水平或垂直的對齊方式，BS 的 flex 公式稍後會詳細介紹。

### 網格參數 row>col
BS 以 12 格分配版面：把容器的寬度分成 12 份，每個 `col` 可以指定占用幾份水平空間，也可以指定在哪個響應區間占用多少份。以下是 BS 官方的參數說明：

<escape>
<table>
  <thead>
    <tr>
      <th></th>
      <th>Extra small<br><small>&lt;576px</small></th>
      <th>Small<br><small>≥576px</small></th>
      <th>Medium<br><small>≥768px</small></th>
      <th>Large<br><small>≥992px</small></th>
      <th>Extra large<br><small>≥1200px</small></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Max container width</td>
      <td>None (auto)</td>
      <td>540px</td>
      <td>720px</td>
      <td>960px</td>
      <td>1140px</td>
    </tr>
    <tr>
      <td>Class prefix</td>
      <td><code>.col-</code></td>
      <td><code>.col-sm-</code></td>
      <td><code>.col-md-</code></td>
      <td><code>.col-lg-</code></td>
      <td><code>.col-xl-</code></td>
    </tr>
    <tr>
      <td># of columns</td>
      <td colspan="5">12</td>
    </tr>
    <tr>
      <td>Gutter width</td>
      <td colspan="5">30px (15px on each side of a column)</td>
    </tr>
    <tr>
      <td>Nestable</td>
      <td colspan="5">Yes</td>
    </tr>
    <tr>
      <td>Column ordering</td>
      <td colspan="5">Yes</td>
    </tr>
  </tbody>
</table>
</escape>

**簡單來說**

1. 總寬會被分成 12 份，因此同一列的 `col` 寬度總和建議為 12，例如 12、6+6、3+3+3+3、3+3+6、4+4+4、2+2+2+2+2+2⋯⋯
2. 沒有指定數字的 `.col`，會在 12 格扣除其他 `.col-*` 已指定的格數之後，平均分配剩餘的空間。
3. 如果總和超過 12，超出的 `col` 會自動換到下一行。
4. 若想強制換行，可以插入 `<div class="w-100"></div>`，效果類似 `<br>`（插入一個滿版但看不見的區塊），不過更建議直接用第二組 `row` 來排下一列。
5. 如果想依內容決定寬度，可以使用 `col-auto`，寬度由自身內容決定，不再使用網格單位。

```html
<style>
  div {
    background: #ccc;
    border: 1px solid #aaa;
  }
  .row{
    margin:10px;
  }
</style>
<div class="container">
  <!-- 總寬會被分成 12 份，因此同一列的 col 寬度總和建議為 12，例如 12、6+6、3+3+3+3、3+3+6、4+4+4、2+2+2+2+2+2…… -->
  <div class="row">
    <div class="col-6">col-6</div>
  </div>
  <div class="row">
    <div class="col-3">col-3</div>
    <div class="col-6">col-6</div>
    <div class="col-3">col-3</div>
  </div>
  <!-- 如果該 col 沒有指定數字（空間），全 12 空間會優先有指定空間的 col 分配，剩餘的空間再平均給未指定數字的 col。 -->
  <div class="row">
    <div class="col-3">col-3</div>
    <div class="col">col</div>
    <div class="col-4">col-4</div>
  </div>
  <!-- 如果總和超過 12，超出的 col 會換到下一行。 -->
  <div class="row">
    <div class="col-3">col-3</div>
    <div class="col-6">col-6</div>
  </div>
  <!-- 如果想強迫換行，可以使用`<div class="w-100"></div>`類似`<br>`效果，也只是塞一個滿版但看不到的 box -->
  <div class="row">
    <div class="col-3">col-3</div>
    <div class="w-100" style="border:1px solid red"></div>
    <div class="col-6">col-6</div>
  </div>
  <!-- 如想以內容為寬，可以使用`<div class="col-auto">`，將只根據 content 為寬做保留，不是以網格單位。 -->
  <div class="row">
    <div class="col-3">col-3</div>
    <div class="col-auto">i am groot!!</div>
    <div class="col-6">col-6</div>
    <div class="col">col</div>
  </div>
</div>
```

#### 響應式
1. 除了基本的 `col` 與 `col-*`，col 也有響應式語法 `col-{breakpoint}` 與 `col-{breakpoint}-*`，並且可以在不同的響應區間混合使用。
2. 如果某個響應區間沒有宣告 `col`，該區塊在那個區間就會脫離網格，變成寬度 100% 的一般區塊（除非有需求，否則應避免）。
3. 不帶數字的 `col-{breakpoint}` 同樣是自動平均分配寬度，但只在該響應區間以上才生效；小於該區間時，每個區塊各占一整列。
4. 響應式規則由小到大向上套用，較大斷點的規則會在該寬度以上覆蓋較小斷點，所以優先順序為 `col-*` < `col-sm-*` < `col-md-*` < `col-lg-*` < `col-xl-*`。

```html
<style>
  .row>div {
    background: #ccc;
    border: 1px solid #aaa;
    text-align: center;
  }
  .row {
    margin: 10px;
  }
</style>
<div class="container">
  <!-- 除了基本的 col 與 col-*，col 也有響應式語法 col-{breakpoint} 與 col-{breakpoint}-*，並且可以在不同的響應區間混合使用 -->
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">col-12<br>col-sm-6<br>col-md-4<br>col-lg-3<br>col-xl-2</div>
  </div>
  <!-- 如果某個響應區間沒有宣告 col，該區塊在那個區間就會脫離網格，變成寬度 100% 的一般區塊（除非有需求，否則應避免） -->
  <div class="row">
    <div class="col-xl-6">col-xl-6</div>
    <div class="col-xl-3">col-xl-3</div>
  </div>
  <div class="row">
    <div class="col col-xl-4">col<br>col-xl-4</div>
    <div class="col col-xl-4">col-xl-4</div>
    <div class="col col-xl-4">col<br>col-xl-4</div>
  </div>
  <!-- 不帶數字的 col-{breakpoint} 同樣是自動平均分配寬度，但只在該響應區間以上才生效，小於該區間時各占一整列 -->
  <div class="row">
    <div class="col">col</div>
    <div class="col-sm">col-sm</div>
    <div class="col-md">col-md</div>
  </div>
  <!-- 響應式規則由小到大向上套用，所以優先順序為 col-* < col-sm-* < col-md-* < col-lg-* < col-xl-* -->
  <div class="row">
      <div class="col-sm-4">col-sm-4</div>
  </div>
</div>
```

### 間格 Gutters
如前面所述，`.container`、`.row`、`col-*` 預設都有左右各 15px 的 padding（`.row` 為負的 margin），這段留白空間稱為間格（gutter），讓畫面更美觀。你也可以選擇取消間格（no-gutters）或自訂。

- 自訂方式除了自己寫 CSS，也可以使用 BS 的 `utilities 通用` > `Spacing 間距` 參數微調，例如官方範例的 [效果說明](https://getbootstrap.com/docs/4.4/layout/grid/#gutters)（`px-lg-5` 代表在 lg 以上的水平方向 padding 5 個單位）。
- 若想快速取消間格，可以在 `.row` 上加入 `.no-gutters`，會清除 `.row` 的負 margin，以及子欄位 `col` 的預設 padding。

```css bootstrap.css（官方樣式）
.no-gutters {
  margin-right: 0;
  margin-left: 0;
  >.col, >[class*="col-"] {
    padding-right: 0;
    padding-left: 0;
  }
}
```

範例如下：
```html
<div class="row no-gutters">
  <div class="col-12 col-sm-6 col-md-8">.col-12 .col-sm-6 .col-md-8</div>
  <div class="col-6 col-md-4">.col-6 .col-md-4</div>
</div>
```

### 行列數指定 row-column
未指定數字的 `col` 預設會自動平分剩餘空間，但 col 一多就不容易控制如何斷行。v4.4 新增了 `.row-cols-*`，能直接指定一個 `row` 內每列要放幾個 `col`。

```html
<div class="container">
  <!-- 預設 col 是吃剩下的空間再均分 -->
  <div class="row">
    <div class="col-6">ColumnA</div>
    <div class="col">ColumnB</div>
    <div class="col">ColumnC</div>
    <div class="col">ColumnD</div>
  </div>
  <!-- row-cols-5：每個 col 的預設寬度是 1/5（20%）；已指定 col-6 的欄位維持自己的寬度，放不下的欄位會換行 -->
  <div class="row row-cols-5">
    <div class="col-6">ColumnA</div>
    <div class="col">ColumnB</div>
    <div class="col">ColumnC</div>
    <div class="col">ColumnD</div>
  </div>
</div>
```

### 對齊與排序 Alignment and Order in flexbox
BS 的 `row` 與 `col` 本質上就是 flexbox：`row` 是 `display: flex` 的父容器，`col` 是子項目，因此許多 class 與 flexbox 屬性一一對應。如果你已經熟悉 flexbox，就能直接對應到本單元，差別只在於改用 class 名稱來指定。

{% note default %}
請參考 [官方示範](https://getbootstrap.com/docs/4.4/layout/grid/#alignment)，這裡不再舉例。
{% endnote %}

**for row use**

- `.align-items-start`（`align-items:flex-start`）：整體垂直靠上對齊
- `.align-items-center`（`align-items:center`）：整體垂直置中對齊
- `.align-items-end`（`align-items:flex-end`）：整體垂直靠下對齊
- `.justify-content-start`（`justify-content:flex-start`）：整體水平靠左對齊
- `.justify-content-center`（`justify-content:center`）：整體水平置中對齊
- `.justify-content-end`（`justify-content:flex-end`）：整體水平靠右對齊
- `.justify-content-around`（`justify-content:space-around`）：整體水平均分對齊，兩側留間格
- `.justify-content-between`（`justify-content:space-between`）：整體水平均分對齊，首尾子項目貼齊兩側

**for col use**

- `.align-self-start`（`align-self:flex-start`）：自身垂直靠上對齊
- `.align-self-center`（`align-self:center`）：自身垂直置中對齊
- `.align-self-end`（`align-self:flex-end`）：自身垂直靠下對齊
- `.order-*`（`order:*`）：依數字由小到大排序（BS 提供 0～12）
- `.order-first`（`order:-1`）：排到最前面
- `.order-last`（`order:13`）：排到最後面

所以你可以輕易控制出以下行為：
1. 設定水平對齊：利用 `.justify-content-*` 控制水平方向
2. 設定垂直對齊：利用 `.align-items-*` 控制垂直方向
3. 控制每個 `.col` 的順序：利用 `.order-*` 來調整

> 這裡只用到一部分的 flex 拿來對齊用途，flexbox 另有完整規格可供使用，後續第三節的通用操作會再重新提到。

### 推移 offset
由於`.col`的分配寬度與位置是利用 flexbox 來生成，如果需要調整定位位置，可以採用下列方式：
- 利用 margin 推移 `col` 的位置：使用 BS 的 `utilities 通用` > `Spacing 間距` 的 margin 參數；也可以用 `.ml-auto`、`.mr-auto` 把剩餘空間推向另一側。
- （推薦）使用 `offset-*` 或 `offset-{breakpoint}-*` 推移位置，效果像是有一個看不見的 `col` 占掉了該位置。

```html
<style>
  .row>* {
    background: #ccc;
    border: 1px solid #aaa;
    text-align: center;
  }
  .row {
    margin: 10px;
  }
</style>
<div class="container">
  <div class="row">
    <div class="col-4">div.col-4</div>
  </div>
  <div class="row">
    <div class="col-4 mr-auto">div.col-4</div>
    <div class="col-4">div.col-4</div>
  </div>
  <div class="row">
    <div class="col-4">div.col-4</div>
    <div class="col-4 offset-4">div.col-4</div>
  </div>
</div>
```

## 巢狀結構
巢狀結構是指在原本的 `col` 裡面再放一組 `row` 與 `col`，內層會以外層 `col` 的寬度為基準，重新分配 12 格（實用性不高）。舉例如下：

```html https://getbootstrap.com/docs/4.4/layout/grid/#nesting
<div class="container">
  <div class="row">
    <div class="col-sm-9">Level 1: .col-sm-9
      <div class="row">
        <div class="col-8 col-sm-6">Level 2: .col-8 .col-sm-6</div>
        <div class="col-4 col-sm-6">Level 2: .col-4 .col-sm-6</div>
      </div>
    </div>
  </div>
</div>
```

# 通用操作 (display & flexbox)
為了銜接前面的 Layout，這裡先提早說明一部分通用操作（BS 官網把這些歸類在 Utilities 通用類別）。BS 的 Layout 除了用 Grid 網格與 Flexbox 彈性盒調整，也會碰到下列跟版面有關的設定：

## display 操作
對應 CSS 的 `display` 屬性，並支援響應式斷點，可參考 [官網範例](https://bootstrap.hexschool.com/docs/4.2/utilities/display/)，寫法如下：

```css
/* display */
.d-inline
.d-block
.d-flex
... 剩下省略

/* 規則公式： */
.d-{value} //for 響應式斷點 xs
.d-{breakpoint}-{value} //for 響應式斷點 sm, md, lg, xl

breakpoint: sm, md, lg, xl
value: none, inline, inline-block, block, table, table-cell, table-row, flex, inline-flex
```

## flexbox 操作
如果不是 `.row`，也可以自己指定成 flex 容器：先用前面 display 單元的 `.d-flex` 或 `.d-inline-flex` 宣告，才能使用其他 flexbox 相關 class（`.row` 本身已是 flex，不需要再設定）。

```css
/* flexbox */
.d-flex
.d-inline-flex

/* 規則公式： */
.d-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: flex, inline-flex
```

### flex-direction 主軸方向性 (in 父容器）
flex-direction 控制容器的排列方向，可設定水平左起、水平右起、垂直上起、垂直下起等主要方向，並支援響應式斷點。

```css
/* flex-direction */
.flex-row  /*水平&左起*/
.flex-row-reverse  /*水平&右起*/
.flex-column  /*垂直&上起*/
.flex-column-reverse  /*垂直&下起*/

/* 規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: row, row-reverse, column, column-reverse
```

### justify-content 屬性 (in 父容器）
justify-content 控制這些子項目的靠齊方式，可控制向左靠齊（根據 flex-direction 起始處）、向右靠齊（反之結尾處）、置中對齊、分散兩側、平均分散（每個子項目兩側都等寬）

```css
/* justify-content */
.justify-content-start  /*向左（或起始處）靠齊*/
.justify-content-end  /*向右（或結尾處）靠齊*/
.justify-content-center  /*置中對齊*/
.justify-content-between  /*均分對齊，首尾子項目貼齊兩側*/
.justify-content-around  /*均分對齊，兩側留間格*/

/* 規則公式： */
.justify-content-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: start, end, center, between, around
```

### align-items 屬性 (in 父容器）
align-items 控制子項目在交叉軸（cross axis）上的對齊方式，交叉軸與 flex-direction 決定的主軸互相垂直。

```css
/* align-items */
.align-items-start  /*頂端對齊*/
.align-items-end  /*底部對齊*/
.align-items-center  /*中線對齊*/
.align-items-baseline  /*基準線（內容之文字）對齊*/
.align-items-stretch  /*填滿 100%*/

/* 規則公式： */
.align-items-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: start, end, center, baseline, stretch
```

### align-self 屬性 (in 子項目）
align-self 可以覆蓋父容器 align-items 的設定，讓單一子項目有自己的對齊方式（可用值與 align-items 相同）。

```css
/* align-self */
.align-self-start  /*頂端對齊*/
.align-self-end  /*底部對齊*/
.align-self-center  /*中線對齊*/
.align-self-baseline  /*基準線（內容之文字）對齊*/
.align-self-stretch  /*填滿 100%*/

/* 規則公式： */
.align-self-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: start, end, center, baseline, stretch
```

### flex-fill 屬性 (in 子項目）
CSS 的 flexbox 沒有這個屬性，`flex-fill` 是 Bootstrap 額外提供的：讓子項目依各自內容撐開，並平均填滿主軸上的剩餘空間（相當於 `flex: 1 1 auto`）。

```css
/* flex-fill */
.flex-fill  /*子項目進行填滿間格*/

/* 規則公式： */
.flex-{breakpoint}-fill
breakpoint: sm, md, lg, xl
```

### flex-grow 與 flex-shrink 屬性 (in 子項目）
與 CSS 的 `flex-grow`、`flex-shrink` 相同，控制子項目的膨脹與收縮，但 BS 只提供 **0 與 1** 兩個值。
- 1 代表**啟用**膨脹/收縮，反之 0 代表**強制不要**膨脹收縮。
- `flex-grow-1`：子項目會膨脹並填滿剩餘空間。
- `flex-shrink-1`：空間不足時子項目會收縮，最小可縮到文字能換行的內容寬度；當前一個項目是 `w-100` 時，擠壓效果最明顯。此屬性不常使用，因為子項目未指定寬度時本來就會依內容調整。

```css
/* flex-grow */
.flex-grow-0  /*子項目不允許膨脹*/
.flex-grow-1  /*子項目允許膨脹填滿最大空間*/

/* 規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: grow-0, grow-1

/* flex-shrink */
.flex-shrink-0  /*子項目不允許收縮換行*/
.flex-shrink-1  /*子項目允許被擠壓時文字行收縮換行*/

/* 規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: shrink-0, shrink-1
```

### margin auto 效果 (in 子項目）
前面在 `row` 與 `col` 的部分曾介紹過 margin auto。在 flexbox 內可以使用 `.mr-auto`、`.ml-auto`、`.mt-auto`、`.mb-auto`，把剩餘空間推向指定的一側，將子項目推開。

### wrap 屬性 (in 父容器）
控制子項目空間不足時是否換行：不換行、往下換行或往上換行。

```css
/* wrap */
.flex-nowrap  /*不換行*/
.flex-wrap  /*換行朝下*/
.flex-wrap-reverse  /*換行朝上*/

/* 規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: nowrap, wrap, wrap-reverse
```

### order 屬性 (in 子項目）
前面介紹 `row` 與 `col` 時提過，這裡用於控制子項目的顯示順序：數字越小越前面，未指定時預設為 0，數字相同則依 HTML 順序排列。BS 提供 `order-0` 到 `order-12`，另有 `order-first`（-1）與 `order-last`（13）。

```css
/* order 規則公式： */
.order-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: first, last, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
```

### align-content 屬性 (in 父容器）
以水平主軸為例，在容器有高度且子項目有多行時，控制整排子項目在垂直方向的對齊方式；單行（`.flex-nowrap`）時無效，此時請改用 `align-items`。

```css
/* align-content */
.align-content-start  /*頂端對齊*/
.align-content-end  /*底部對齊*/
.align-content-center  /*中線對齊*/
.align-content-between  /*均分對齊，首尾貼齊兩側*/
.align-content-around  /*均分對齊，兩側留間格*/
.align-content-stretch  /*平均的填滿空間*/

/* 規則公式： */
.align-content-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: start, end, center, between, around, stretch
```

> BS 最核心的版面配置到這裡已說明完畢，通用類別中的 flex 觀念也一併帶過。這些是 BS 最核心的設計，BS 的主要用途就是排版，其餘都只是區域性的 CSS 效果，用到時再查詢使用即可。