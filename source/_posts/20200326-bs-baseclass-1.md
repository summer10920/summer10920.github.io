---
title: "[基礎課程] Bootstrap4 教學（一）：初始與排版"
categories:
  - 職訓教材
  - Bootstrap
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-26 13:22:40
---

本系列根據教材課程需要進行 Bootstrap 套件的教學文章，在接觸 Bootstrap 之前需要擁有一定的 HTML5/CSS3 觀念，才能理解 Bootstrap 的原理應用以及調整技巧，如果你另具備了 JS/JQ 的開發能力，那更方便進一步的使用並控制這些 Bootstrap 套件工具。筆者這裡 Boostrap 的系列文章都來自官方本身提供的 Document 教學資料重新進行重新解析與翻譯重組解釋（也包含閹割一些覺得非必要的資訊），如果你擁有有足夠的能力可直接閱讀官方手冊並動手實作就不需要特地參閱已整理過的中文 BS 教學，動手跟著官方文件做操作練習才是最佳的經驗累積。

本篇一開始會介紹基本安裝環境，接著先介紹核心的版面規劃（將牽扯到 Grid 與 flexbox)。

<!-- more -->

---

# 介紹與安裝
BootStrap 原來自於 Twitter 公司內部的前端視覺框架工具，將常用的 CSS 與樣式打包起來共享到 github 因此大受歡迎成為主流 UI 而獨立出來的免費 CSS 套件。他有良好的 RWD（無障礙跨平台）以及多項主流的 UI 設計規劃，使用 BS 的好處就是你不用再自行設計。開發前端視覺可以更加便捷有效率。（從這裡開始都稱呼 BS 為 Bootstrap 的簡寫）

BS 目前時間線上 (2020Q1) 筆者手上的最新版本為 4.4，主要包含以下重點：

1. 在第四版以 flex 彈性盒觀念進行開發，內容都有水平與垂直的對齊與排序概念。
2. 學會 BS 之前必須要先熟悉各種 CSS 屬性，BS 大多數的 class 命名都由 css 屬性組合出效果。
3. 使用網格概念 12 格進行版面分配，以及搭配 Media Query 分為四種寬度區域，完成可視性上的格局變化 (RWD 也就是響應式網站）。
4. 除了 class 命名公式，BS 也使用 HTML5 的自訂屬性標籤，通常都使用 data-*進行相關的 JS 觸發操作。

>Bootstrap 5 將預計在 2020 第一季末發布，重點將移除 JQ 所有依賴性與自身提供 SVG 的 icon，同時也不再支援 IE10！

## 安裝初始作業
在正式學習 BS 之前，我會建議你有以下學習方式：

1. 直接參考官網文件會有完整的說明，本文只是補助你快速學習步調或記憶加強，僅適時的補充說明。
2. BS 是大量的 CSS 屬性所編製而成的公式 (Class 名稱），嘗試去看原生 css 的方法，能幫助你加強複習 CSS 屬性。
3. 多嘗試練習並理解各屬性，未來在設計網頁切版過程中，你能直覺想到 BS 有提供那些元件模組可使用。
4. 由於 BS 一些效果是透過 SASS 所產生出來的，除非你是屬從製開發者需要修改核心，否則有提到 SASS 部分是可以忽略不需特別理解。

目前官方的文件最新來到 v4.4，至於免費中文化文件由六角學院提供（但目前僅更新至 v4.2)。兩者都能參考對照使用，並不影響太大的學習問題。另還有 Layoutit 網站能幫助你快速切出 BS 版型（僅支援到 v4.0)。

- [Bootstrap · The most popular HTML, CSS, and JS library in the world.](https://getbootstrap.com/)
- [Bootstrap 4 繁體中文手冊 \[六角學院譯](https://bootstrap.hexschool.com/)
- [LayoutIt! - Interface Builder for CSS Grid and Bootstrap](https://www.layoutit.com/)
- [All Bootstrap 4 CSS classes 查詢器](https://bootstrapshuffle.com/classes)

參考官方網站或中文化網站，只要是 4.x 版本都可以，這裡我們抓最新版 4.4 作為練習，安裝方式很多我們採用最基本的下載包使用，裡面包含很多重複檔案，可以在 [這裡理解](https://bootstrap.hexschool.com/docs/4.2/getting-started/contents/#css-files) 這些檔案分別代表甚麼差異用途。

我們需要的學習素材只需要一些基本檔案之外，使用 BS 的 JS 功能還需要取得 Jquery 才能驅動使用，所以還需要額外下載 JQ 來使用 (BS 不會使用到 JQ 特效與動畫所以你可以使用 slim 閹割版）。以及如果你不想去異動 BS 的 css，你應該額外寫在 css 樣式並利用優先權方式去調配，所以整個檔案結構以及網頁初始化為

```
plugins/
├── bootstrap.css
    // 包含 BS 各種 Class 樣式表，由於我們需要反向理解樣式表加深印象，建議使用非壓縮版本。（實際工作上若不會修改你應該使用 min 版）
├── custom.css
    //你應該把自訂的 CSS 寫在這裡而不是去調整 BS 的 CSS
├── bootstrap.bundle.min.js
    //主要包含 bootstrap.js + Popper.js，我們不會去研究理解 JS 所以使用壓縮板即可。
├── jquery-3.4.1.min.js
    // 如果你需要 BS 的 JS 效果就得增加 JQ 套件，slim 版本（不支援 ajax 與 effect) 亦可使用。
```

接著參考 BS 的 [元件-廣告單元](https://bootstrap.hexschool.com/docs/4.2/components/jumbotron/)，試著貼上代碼能否出現一樣的畫面：

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
如果得到如下圖則代表 BS 運作正常發揮 （僅 CSS 部分）。請注意每次要使用 BS 你都必須要宣告好以上這些 CSS/JS 套件。
![Image](https://i.imgur.com/6LjAHdX.png)

# 布局 Layout
BS 有個很基本的布局觀念，任何的內容都需要先用大容器來框住讓螢幕寬度得到最佳預覽解析度，同時這個容器你該給他滿寬還是適應寬（這扯到螢幕寬度是 16:9 還是 4:3 的選擇問題，大多數的設計師不太喜歡滿寬因為眼球移動範圍太大，除非是廣告性），以及當你多組容器要排列時該個別占多少百分比做一行排列。還有如果裝置不同時，該如何重新宣告這些容器的排列。

## 容器 Containers
最外層的主容器，如前面的安裝練習範例，當你沒有指定外部容器時會找不到父容器形成採用以 body 去算出 100%。容器可以使用 container 形成響應式寬度（隨螢幕寬度調整到適合的容器大小）。

| class 公式      | 說明           |
| --------------- | -------------- |
| container       | 窄版（響應式） |
| container-fluid | 滿版           |

延續前面練習 code，外層增加 `div.container` 跟 `div.container-fluid` 看看，同時可以試著去縮短瀏覽器寬度看看效果。

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
主站設計網頁時，不同區塊主題可以考慮對容器分別指定插寬版或窄版（未填滿）並搭配背景圖的的視覺體驗。
{% endnote %}

從下列的 BS 官方的固定樣式表得知，`container`會自動根據不同的螢幕寬度去指定最大寬度值，使得容器不會特別滿版。然而`container-fluid`只根據 100%去進行塞滿。

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
所謂的響應式設計，是為了配合現在對於不同的裝置有對應的瀏覽器寬度，為了使同個網站能在這些不同裝置上有最好的體驗。設計師考量進去相同的內容但有不同的排版方式，使得不論何種瀏覽體驗裝置都只網站只有一個（集中網站流量）。

響應式網站會根據瀏覽器寬度提供適合的對象樣式指定，我們會利用 Media Queries 去取得螢幕寬度之後，再根據公式化的五個等級去控制這些 viewpoint 寬度做不同的樣式。

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

不少的 BS 元件已設計好了響應式定義，如果需要可以查看或試用這些 class 公式。舉例來說：最新 v4.4 版本添加了 container 就有這樣的 [詳細定義](https://getbootstrap.com/docs/4.4/examples/grid/#containers)。

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

並不是每個元件都有此響應功能，之後將慢慢介紹每個元件內的響應式控制，現在只需知道並不是只有單獨這個 container 才有響應式。

---

## 網格 Grid
網格是指一個響應式排版系統概念，會在容器 (container) 內進行網格結構，其中結構採以 flexbox 觀念定義出行與欄，使其容易的規劃佈局和對齊內容。

舉例來說，這能形成出一行三列的內容版面：

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

同時請試著改變瀏覽器寬度觸發響應式效果。可整理出以下效果：
1. 因為 container 關係，整個容器預設是水平置中。
2. container 本身會 padding 水平 15px 產生留白區（美觀上使 content 不會有壓迫感）。
3. 因為 row+col 關係，內部結構呈現 1 列與 3 欄。
4. row 本身會使用 margin 負數 15px 使 row 與 container 留白空間消除。
5. 而 col 會另外形成 padding 水平 15px 留白區（作為 content 的留白區）。
6. row 其實等於`display: flex`，換言之你可以控制水平或垂直的軸心，之後再細部介紹 BS 的 flex 公式。

### 網格參數 row>col
BS 採用 12 格的方式分配布局，你可以把一個容器以 12 為空間單位去分配，每個 col 可指定給予多少水平空間。也可以指定在哪種響應模式下使用多少水平空間。以下為 BS 官方參數說明：

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
      <td>Gutter widtd</td>
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

1. 總寬空間會被分割 12 份，因此`col`都應該總和為 12，舉例你可以 12,6+6, 3+3+3+3, 3+3+6, 4+4+4, 2+2+2+2+2+2+2......
2. 如果該 col 沒有指定數字（空間），全 12 的空間會優先有指定數的 `.col-*` 分配扣除，剩餘再平均給未指定數字的 `.col`。
3. 如果總和硬要超過 12，會發生擠壓而自動到下一行繼續輸出。
4. 如果想強迫換行，可以使用`<div class="w-100"></div>`，達到類似`<br>`的擠出效果（會塞入滿版但看不到），但實際上建議你直接用第二組 row 設計下一排。
5. 如想以內容為寬，可以使用`<div class="col-auto">`，將直接以 自己的 content 為 box 的寬，不再是使用網格單位。

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
  <!-- 總寬空間會被分割 12 份，因此`col`都應該總和為 12，舉例你可以 12,6+6, 3+3+3+3, 3+3+6, 4+4+4, 2+2+2+2+2+2+2...... -->
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
  <!-- 如果總和硬要超過 12，會擠壓到下一行繼續輸出。 -->
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
1. 除了基本語法為`col`與`col-*`，col 也有響應語法為`col-{breakpoint}`與`col-{breakpoint}-*`且可混和使用在不同響應
2. 如果該 box 某響應狀況下內沒有宣告`col`就會脫離 grid 單元，而是滿 100%的 box 單元。（除非有需求，否則應避免此狀況）
3. 因為自動分配關係，不帶數字的`col-{breakpoint}`可以寫成`col`來看待（因為不論何種響應規則下都是最後重新分配寬）
4. 響應斷點本身有向上相容（優先權）的效果，所以`col-*`<`col-sm-*`<`col-md-*`<`col-lg-*`<`col-xl-*`

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
  <!-- 除了基本語法為`col`與`col-*`，col 也有響應語法為`col-{breakpoint}`與`col-{breakpoint}-*`且可混和使用在不同響應 -->
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">col-12<br>col-sm-6<br>col-md-4<br>col-lg-3<br>col-xl-2</div>
  </div>
  <!-- 如果某響應狀況下內沒有宣告`col`就會脫離 grid，而是滿 100%的 box 單元。（除非有需求，否則應避免此狀況） -->
  <div class="row">
    <div class="col-xl-6">col-xl-6</div>
    <div class="col-xl-3">col-xl-3</div>
  </div>
  <div class="row">
    <div class="col col-xl-4">col<br>col-xl-4</div>
    <div class="col col-xl-4">col-xl-4</div>
    <div class="col col-xl-4">col<br>col-xl-4</div>
  </div>
  <!-- 因為自動分配關係，不帶數字的`col-{breakpoint}`可以寫成`col`來看待（因為不論何種響應規則下都是最後重新分配寬）。 -->
  <div class="row">
    <div class="col">col</div>
    <div class="col-sm">col-sm</div>
    <div class="col-md">col-md</div>
  </div>
  <!-- 響應斷點本身有向上相容（優先權）的效果，所以 col-*<col-sm-*<col-md-*<col-lg-*<col-xl-* -->
  <div class="row">
      <div class="col-sm-4">col-sm-4</div>
  </div>
</div>
```

### 間格 Gutters
如前面說明你已經知道，在`.container`, `.row`, `col-*`項目中都有預設 margin（或 padding) 左右各 15px 的效果，這是為了畫面美觀有一定的 gutters 留白空間。當然你可以選擇該結構不要間格 (no-Gutter) 或自訂。

- 自訂方式除了自訂 CSS 方法，也可用 BS 功能選單的`utilities 通用` > `Spacing 間距` 之參數來微調，如官方範例的 [效果說明](https://getbootstrap.com/docs/4.4/layout/grid/#gutters) (PS: px-lg-代表 x 軸水平進行 padding 5 個單位）。
- 若想快速取消 row 的本身 gutter 效果，可以對 row 添加 class `.no-gutters`在指定的對象上，將清除 row 的負 margin，以及子欄上的 padding 的初始值。

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
col（未指定數字）預設會自動分配剩餘空間，但當 col 過多就不容易控制如何斷行。在 v4.4 新增了`.row-cols-*`參數，能直接表達一個 row 內應該多少個 col 來塞滿。

```html
<div class="container">
  <!-- 預設 col 是吃剩下的空間再均分 -->
  <div class="row">
    <div class="col-6">ColumnA</div>
    <div class="col">ColumnB</div>
    <div class="col">ColumnC</div>
    <div class="col">ColumnD</div>
  </div>
  <!-- col 有直接指定寬度，也就是 12/5 -->
  <div class="row row-cols-5">
    <div class="col-6">ColumnA</div>
    <div class="col">ColumnB</div>
    <div class="col">ColumnC</div>
    <div class="col">ColumnD</div>
  </div>
</div>
```

### 對齊與排序 Alignment and Order in flexbox
BS 的 row 與 col 其實是採用 flexbox 設計，row 本身就是一個`display: flex`的父容器，col 就是子項目。因此有些 class 參數與 flexbox 相同無差別。如果你已很熟 flexbox 彈性盒就可採同概念能對應到本單元，只是差別於使用 className 來指定 BS。

{% note default %}
請參考 [官方示範](https://getbootstrap.com/docs/4.4/layout/grid/#alignment)，這裡不再舉例。
{% endnote %}

**for row use**

| BS's ClassName           | CSS's flexbox                 | 說明                         |
| ------------------------ | ----------------------------- | ---------------------------- |
| .align-items-start       | align-items:flex-start        | 整體垂直之靠上為對齊         |
| .align-items-center      | align-items:center            | 整體垂直之靠中為對齊         |
| .align-items-end         | align-items:flex-end          | 整體垂直之靠下為對齊         |
| .justify-content-start   | justify-content:flex-start    | 整體水平之靠左為對齊         |
| .justify-content-center  | justify-content:center        | 整體水平之靠中為對齊         |
| .justify-content-end     | justify-content:flex-end      | 整體水平之靠右為對齊         |
| .justify-content-around  | justify-content:space-around  | 整體水平均分對齊，兩側留間格 |
| .justify-content-between | justify-content:space-between | 整體水平均分對齊，兩側為子項目 |

**for col use**

| BS's ClassName     | CSS's flexbox         | 說明                                 |
| ------------------ | --------------------- | ------------------------------------ |
| .align-self-start  | align-self:flex-start | 自我垂直之起始為對齊                 |
| .align-self-center | align-self:center     | 自我垂直之起始為對齊                 |
| .align-self-end    | align-self:flex-end   | 自我垂直之起始為對齊                 |
| .order-\*          | order:\*              | 依據數字由小排序位置，可以是-1 或 13 |
| .order-first       | order:first           | 更改位置為起頭                       |
| .order-end         | order:end             | 更改位置為最後                       |

所以你可以輕易控制出以下行為：
1. 設定水平對齊：利用`.justify-content-*`控制水平線
2. 設定垂直對齊：利用`.align-items-*`控制垂直線
3. 控制每個`.col`的順序，利用`.order-*`來調整

> 這裡只用到一部分的 flex 拿來對齊用途，flexbox 另有完整規格可供使用，後續第三節的通用操作會再重新提到。

### 推移 offset
由於`.col`的分配寬度與位置是利用 flexbox 來生成，如果需要調整定位位置，可以採用下列方式：
- 利用 margin 去推移 col 位置，用 BS 官方介紹的`utilities 通用` > `Spacing 間距` 之 margin 參數來設定，在 4.4 版本之後更可以使用`.ml-auto`或`.mr-auto`來自動推移到底填滿。
- （推薦）也可以使用`offset-*`或`offset-{breakpoint}-*`來推移 col 的定位處。類似有個假想的不存在 col 幫忙吃掉該分配位置。

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
是指能在原本的 row 與 col 結構下，再規劃出 row 與 col（實用性不高）且從父層空間分配下來繼承次分配。舉例如下：

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
為了接應前面的第二節的 Layout，這裡先提早解釋一部分的通用操作，BS 的 Layout 除了 Grid 網格跟 Flexbox 彈性盒來進行操作調整，你還可能會碰到以下跟 Layout 有關的設定 (BS 官網把這些單元說明歸類在通用類別內）：

## display 操作
同等控制 CSS 的 display 屬性，參考 [官網範例](https://bootstrap.hexschool.com/docs/4.2/utilities/display/)，並支援響應式中斷的 display，通常是以下寫法：

```css
/* display */
.d-inline
.d-block
.d-flex
... 剩下省略

/* 規則公式： */
.d-{value} //for 響應式中斷 xs
.d-{breakpoint}-{value} //for 響應式中斷 sm, md, lg, xl

breakpoint: sm, md, lg, xl
value: none, inline, inline-block, block, table, table-cell, table-row, flex, inline-flex
```

## flexbox 操作
如果不是發生在`.row` 的標籤，你想要自己指定出 flex 也是可以的，同前面 display 單元你要宣告 display 為`flex`或`inline-flex`，接下來才能開始對 flexbox 相關操作（若本來就在`.row`就不需要設定此 display 了）

```css
/* flexbox */
.d-flex
.d-inline-flex

/* 規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: flex, inline-flex
```

### flex-direction 主軸方向性 (in 父容器）
flex-direction 控制容器的排列方向性，可控制水平左起、水平右起、垂直上起、垂直下起等主要方向。支援響應式中斷 breakpoint 應用。

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
.justify-content-end  /*向右（或起始處）靠齊*/
.justify-content-center  /*置中對齊*/
.justify-content-between  /*均分對齊，兩側留子項目*/
.justify-content-around  /*均分對齊，兩側留間格*/

/* 規則公式： */
.flex-content-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: start, end, center, between, around
```

### align-items 屬性 (in 父容器）
align-items 控制子項目的 cross 縱向交叉軸，與 flex-direction 有同樣觀念但形成交錯之直角方向性。

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
align-slef 能擺脫 align-items 的控制之優先權，獨立對本身子項目進行（與 align-items 一致的）控制效果。

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
原 CSS 的 flexbox 觀念沒有這個屬性，是 Bootstrap 特別的 flexbox 控制，能控制每個子項目自動填滿由主軸所分配到的內容空間（寬度）。換個說法是，先分配好空間產生的空白間格在由子項目填滿。

```css
/* flex-fill */
.flex-fill  /*子項目進行填滿間格*/

/* 規則公式： */
.flex-{breakpoint}-fill
breakpoint: sm, md, lg, xl
```

### flex-grow 與 flex-shrink 屬性 (in 子項目）
與 CSS 的 flexbox 觀念中的 flex-grow 與 flex-shrink 雷同主要是控制子項目的膨脹收縮。但**已被閹割只剩基本的數字 0 與 1**。
- 1 代表**啟用**膨脹/收縮，反之 0 代表**強制不要**膨脹收縮。
- flex-grow-1 會自動膨脹吃光所有空間並填滿。
- flex-shrink-1 則自收縮到允許文字強迫換行的最小內容寬度，搭配前一項目是 w-100 持有時，該項目的擠壓效果會明顯化。（此屬性不常被使用，因本身子項目不指定長度情況下就會自因內容調整寬度，少部分有需特地前者擠壓滿版並要求後者文字換行之可能性）

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
之前曾在 row col 的部分曾介紹到 margin auto 效果，在 flexbox 內你可以使用`.mr-auto`, `.ml-auto`, `.mt-auto`, `.mb-auto`，依據來推擠子項目呈現出最大間格。

### wrap 屬性 (in 父容器）
控制該子項目受擠壓時，內容文字是否允許換行之方式，分為不換行與換行朝上或換行朝下。

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
之前介紹 row col 時曾討論過，這裡是用於控制該子項目在所有子項目當中的優先順序。從 0 開始優先，其次不指定者則次依 HTML 順序出現，最後從數字 1 開始小排序到大，最多數字為 12。

```css
/* order 規則公式： */
.order-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
```

### align-content 屬性 (in 父容器）
以水平主軸為例，在有高度的情況下控制子項目的垂直對齊方式，且必須不能是單行模式下有效（也就是不支援於`.wrap-nowrap`模式下，但此時可改用 align-items 來控制達到相容效果）。

```css
/* align-content */
.align-content-start  /*頂端對齊*/
.align-content-end  /*底部對齊*/
.align-content-center  /*中線對齊*/
.align-content-baseline  /*基準線（內容之文字）對齊*/
.align-content-stretch  /*填滿 100%*/

.align-content-start  /*頂端對齊*/
.align-content-end  /*底部對齊*/
.align-content-center  /*中線對齊*/
.align-content-around  /*均分對齊，兩側留間格*/
.align-content-stretch /*平均的填滿空間*/

/* 規則公式： */
.align-content-{breakpoint}-{value}
breakpoint: sm, md, lg, xl
value: start, end, center, around, stretch
```

> BS 最核心的布局規畫已經說明完畢，同時將通用類別的 flex 觀念也提過一遍。這些都屬於 BS 的最核心之設計，BS 主要是排版應用其餘都只是區域性的 CSS 效果而已，會用到那些 CSS 效果再適時查詢使用即可。