---
title: "Bootstrap 5.0：安裝、排版、內容"
categories:
  - 前端
  - Bootstrap
tag:
  - PHP 資料庫網頁設計（職前班）
  - RWD 響應式網頁設計（假日班）
  - Bootstrap
date: 2021-02-16 22:59:44
---
![](assets/images/banner/bootstrap.png)
本系列為 Bootstrap 5.0 教學文章。接觸 Bootstrap 之前，需要具備一定的 HTML5／CSS3 觀念，才能理解 Bootstrap 的原理與調整技巧；如果你另外具備 JS 的開發能力，會更方便使用並控制 Bootstrap 的各種功能。

<!-- more -->

{% note warning %}
**版本提醒**
本文使用 Bootstrap 5.0（2021 年）。後續的 5.1～5.3 大致維持相同的用法，另新增了 CSS 變數（5.2）與深色模式（5.3）等功能，細節請以官方文件為準。若你要維護 Bootstrap 4 的舊專案，請參考 {% post_link bootstrap-4-layout Bootstrap 4.4 教學（一） %}。
{% endnote %}

本系列的 Bootstrap 文章，內容來自官方文件，經過重新解析、翻譯與整理（並省略部分較不必要的資訊）。如果你有足夠的能力，直接閱讀官方手冊並動手實作就好，不必特地參閱本篇；跟著官方文件動手練習，才是累積經驗的最佳方式。

本篇一開始會介紹基本的安裝環境，接著介紹核心的 Layout 版面排版技巧（會牽扯到 Bootstrap 的 Grid 觀念與 CSS Flex 技術），最後是 Content 內容，也就是 HTML 基礎元素的效果。

# 介紹
Bootstrap 最早是 Twitter 公司內部的前端視覺框架，後來將常用的 CSS 與樣式打包並共享到 GitHub，因大受歡迎而獨立成為免費的 CSS 套件，並成為主流的 UI 框架。它具備良好的 RWD（響應式網頁設計）以及多項主流的 UI 設計規劃，使用 Bootstrap 的好處是不必再自行設計基礎樣式，開發前端畫面可以更便捷有效率。（以下將 Bootstrap 簡稱為 BS）

本文撰寫於 2021 年第一季，當時 BS 的最新版本為 5.0，主要包含以下重點：

1. 從第四版開始以 flexbox 彈性盒為基礎開發，內容都具備水平與垂直的對齊與排序概念。
2. 學習 BS 之前建議先熟悉各種 CSS 屬性，因為 BS 大多數的 class 都是由 CSS 屬性組合出效果。
3. 使用網格概念將版面分成 12 格，並搭配 Media Query 分為六種寬度區間，完成不同螢幕寬度下的版面變化（即 RWD 響應式網站）。
4. 除了 class 命名公式，BS 也使用 HTML5 的 `data-*` 自訂屬性來觸發 JS 操作（第五版起改為 `data-bs-*`）。
5. 第五版移除了對 jQuery 的所有依賴、自行提供 SVG 圖示，並不再支援 IE 瀏覽器。
6. 具備 Sass 與 Webpack 觀念的人，可以進一步自訂 BS 並應用在專案開發（不在本系列的基本教學範圍）。

在正式學習 BS 之前，建議採用以下學習方式：

- 官方文件有最完整的說明，本文只用來協助你加快學習步調與加強記憶，僅適時補充說明。
- BS 的 class 名稱是由大量 CSS 屬性編製而成的公式，試著閱讀編譯後的 CSS，能同時複習 CSS 屬性；熟悉 Sass 的人也可以直接閱讀原始的 Sass 程式碼。
- 多練習各種元件與功能並理解各屬性的效果，未來設計網頁時，就能直覺想到 BS 提供了哪些元件可以使用。
- BS 的部分效果是以 Sass 產生的，除非你需要修改 BS 的預設值，否則文中提到 Sass 的部分可以略過。

原始文件請參考官方網站或中文化網站，對照學習；本系列根據 v5.0 介紹：
- [Bootstrap 5.0 官方文件](https://getbootstrap.com/docs/5.0/)
- [Bootstrap 5 繁體中文文件 - 六角學院譯](https://bootstrap5.hexschool.com/)

## 安裝（初始化）

安裝方式有很多種（例如 CDN、npm、webpack 等），這裡採用最基本的下載方式：下載包內有許多不同用途的版本，可參考 [CSS 檔案差異說明](https://bootstrap5.hexschool.com/docs/5.0/getting-started/contents/#css-files) 了解各檔案的用途。

初始環境只需要 BS 下載包內的兩個檔案：完整的 CSS（初學者建議使用非 min 版本，藉此理解 CSS 內容）與綑綁版 JS（要完整使用所有元件，必須包含 `popper.js`）。另外，如果不想直接修改 BS 的 CSS，應該把自訂樣式寫在自己的 CSS 檔，並利用優先權（權重）去覆蓋，所以整個檔案的初始結構如下：
```
plugins/
├── bootstrap.css
    // 包含 BS 各種 Class 樣式表，由於我們需要反向理解樣式表加深印象，建議使用非壓縮版本。（實際工作上若不會修改你應該使用 min 版）
├── custom.css
    //你應該把自訂的 CSS 寫在這裡而不是去調整 BS 的 CSS
├── bootstrap.bundle.min.js
    //主要包含 bootstrap.js + Popper.js，我們不會去研究理解 JS 所以使用壓縮板即可。
```

## 測試
接著參考 BS 的 [元件：導覽列（Navbar）](https://getbootstrap.com/docs/5.0/components/navbar/#supported-content) 第一組範例，試著貼上程式碼，確認能否出現一樣的畫面，並檢查畫面、互動與響應式是否都正常：
```html index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="plugins/bootstrap.css"> <!--宣告 CSS-->
  <script src="plugins/bootstrap.bundle.min.js"></script> <!--宣告 JS-->
</head>
<body>
  <!--貼上測試範例 start-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  <!--貼上測試範例 end-->
</body>
</html>
```

預覽如果得到如下圖，代表 BS 已正常運作。請注意：每次要使用 BS，都必須先引入上述的 CSS 與 JS 檔案。
![預覽畫面](https://i.imgur.com/4pjtodM.png)

# 排版 Layout
排版是 BS 最核心的觀念，包含響應式的斷點處理、寬版與窄版的容器、12 格的網格分配與間格、水平與垂直的 Flex 對齊方式，以及內外間距的通用排版。

## 響應式斷點 Breakpoints
響應式設計是為了配合不同裝置的瀏覽器寬度，提供最佳的瀏覽體驗：內容相同，但依裝置調整排版，因此不論用什麼裝置瀏覽，網站都只有一個（流量與維護都能集中）。

響應式的原理是利用 Media Queries 判斷瀏覽器是否符合最小寬度條件，輸出不同的屬性；BS 把它整理成公式化的六個等級，針對不同的 viewport 寬度套用不同的樣式。

```css https://getbootstrap.com/docs/5.0/layout/breakpoints/#min-width
// 1. Extra small devices （直立手機用途，小於 576px)
/*none @media queries :: 沒有 Media Query 規則是因為 BS 以 100%為低標 */

// 2. Small devices （橫式手機用途，包含 576px and up)
@media (min-width: 576px) { ... }

// 3. Medium devices （平板用途，768px and up)
@media (min-width: 768px) { ... }

// 4. Large devices （電腦用途，992px and up)
@media (min-width: 992px) { ... }

// 5. Extra large devices （寬螢幕電腦，1200px and up)
@media (min-width: 1200px) { ... }

// 6. XX-Large devices （超寬比螢幕，1400px and up)
@media (min-width: 1400px) { ... }
```

{% note default %}
只有 table 與 modal 的響應斷點是採用 `max-width` 設計，數值比 `min-width` 少 0.2px。不論哪一種，只需要知道可使用 xs、sm、md、lg、xl、xxl 六種模式即可。
{% endnote %}

響應斷點是各種元件或功能內提供的彈性效果（但並不是每個元件都有）。下一個 container 單元會舉例說明如何搭配斷點做出響應式變化。

## 容器 Containers
容器是最基本的布局外框元素，使用網格系統時一定要搭配使用。容器也讓我們選擇內容要以寬版（填滿）或窄版（限制範圍）呈現；多數設計師不喜歡寬版（視線移動範圍太大，除非是廣告圖性質），同時也要考慮多組容器縱向組合時的視覺感，以及不同裝置上的顯示方式。

如前面練習的範例，沒有指定容器時，區塊會繼承 `body` 的空間而達到 100% 寬；此時加上 `container`，區塊就不會塞滿整個寬度。

- `container`：窄版（本身為響應式，不同的螢幕寬度有各自的最大寬度）
- `container-fluid`：滿版（雖然填滿，但兩側仍保留預設的 padding 0.75rem）

延續前面的練習，試著把第 2 行的 `div.container-fluid` 改成 `div.container` 或直接移除，並縮放瀏覽器寬度觀察效果。

```html index.html
<!--貼上測試範例 start-->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<!--貼上測試範例 end-->
```
{% note info %}
**小技巧**
容器的主要作用是限制內容的總寬度；如果背景色需要填滿整個寬度，應該由容器外層來設定背景色。
{% endnote %}

從下列 BS 的樣式表可以看出，`container` 會依螢幕寬度指定不同的最大寬度，容器因此不會變成滿版；`container-fluid` 除了寬度 100% 與 padding 之外，沒有任何 media queries。

```css bootstrap.css（官方樣式）
.container,
.container-fluid {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
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
@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
```

### 響應斷點 breakpoints
除了 `container` 與 `container-fluid`，另提供 `container-{breakpoint}` 的響應斷點公式，讓 container 的窄版效果延後到指定的斷點以上才生效。

| class name         | Extra small<br><576px | Small<br>≥576px | Medium<br>≥768px | Large<br>≥992px | Extra large<br>≥1200px | XX-Large<br>≥1400px |
| ------------------ | --------------------- | --------------- | ---------------- | --------------- | ---------------------- | ------------------- |
| `.container`       | 100%                  | 540px           | 720px            | 960px           | 1140px                 | 1320px              |
| `.container-sm`    | 100%                  | 540px           | 720px            | 960px           | 1140px                 | 1320px              |
| `.container-md`    | 100%                  | 100%            | 720px            | 960px           | 1140px                 | 1320px              |
| `.container-lg`    | 100%                  | 100%            | 100%             | 960px           | 1140px                 | 1320px              |
| `.container-xl`    | 100%                  | 100%            | 100%             | 100%            | 1140px                 | 1320px              |
| `.container-fluid` | 100%                  | 100%            | 100%             | 100%            | 100%                   | 100%                |

```html https://getbootstrap.com/docs/5.0/layout/containers/#responsive-containers
<style>
  div {
    background: #ccc;
    border: 2px solid #aaa;
    margin-bottom: 5px;
  }
</style>
<div class="container-sm">100% wide until small breakpoint</div>
<div class="container-md">100% wide until medium breakpoint</div>
<div class="container-lg">100% wide until large breakpoint</div>
<div class="container-xl">100% wide until extra large breakpoint</div>
<div class="container-xxl">100% wide until extra extra large breakpoint</div>
```

## 網格 Grid
網格是重要的欄位排版系統，能有效規劃多個欄位如何並排。Grid 的原理是 flex，若熟悉 flex 就能理解其對齊方式；12 欄的空間則是依 `flex-basis: auto` 與 width 的百分比來分配。

參考範例（等寬）做局部調整，並試著縮放瀏覽器寬度檢查，可以整理出以下幾點：
1. `container` 會依 media queries 呈現窄版，並以 `margin: auto` 水平置中，左右兩側各有 gutter 網格間距（`padding: 0.75rem`）。
2. `row` 與 `col` 代表列與欄的概念，範例中分別呈現 1 列 2 欄與 1 列 3 欄。
3. `row` 以負的外距（`margin: -0.75rem`）抵銷 `container` 的留白，而 `col` 有自己的 gutter 網格間距（`padding: 0.75rem`）。
4. 在 `.container>.row>.col` 的層級結構下，多欄位的網格間距能與沒有使用 grid 的一般 container 切齊。換言之，使用 grid 時這三層元素都不能省略。
5. `.row` 是 flex 容器，因此可以輕易加上 flex 屬性來調整 `col` 的排列方式。
6. 沒有指定數字的 `.col` 具有 `flex: 1 0 0%`，會膨脹並平分剩餘空間，因此等寬。
7. 在一個 `row` 內，可用 `.col-{1~12}` 指定欄位的固定寬度（總和為 12 的分配比例），也可以混搭 `.col` 來填滿剩餘空間。
8. 同樣地，`.col-auto` 的屬性是 `flex: 0 0 auto`，不會膨脹，因此以內容寬度作為欄位寬度。

```html https://bootstrap5.hexschool.com/docs/5.0/layout/grid/#equal-width
  <style>
    .row>div,
    .check {
      background: #ccc;
      border: 2px solid #aaa;
      margin-bottom: 5px;
    }
  </style>
  <div class="container check">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi qui consectetur nobis
    architecto dolorum reiciendis consequatur impedit, odio necessitatibus fuga delectus est eum tenetur voluptatem
    minima, quas quia quibusdam earum.</div>
  <div class="container">
    <div class="row">
      <div class="col">
        col
      </div>
      <div class="col">
        col
      </div>
    </div>
    <div class="row">
      <div class="col">
        col
      </div>
      <div class="col">
        col
      </div>
      <div class="col">
        col
      </div>
    </div>
  </div>
  <hr>
  <div class="container">
    <div class="row">
      <div class="col">
        col
      </div>
      <div class="col-9">
        col-9
      </div>
      <div class="col">
        col
      </div>
    </div>
    <div class="row">
      <div class="col">
        col
      </div>
      <div class="col-5">
        col-5
      </div>
      <div class="col-5">
        col-5
      </div>
    </div>
    <div class="row">
      <div class="col">
        col
      </div>
      <div class="col-5">
        col-5
      </div>
      <div class="col-auto">
        col-auto
      </div>
    </div>
  </div>
```

### 網格參數 Grid options
網格把容器切成 12 個空間單位，每個 `col` 可以指定占用幾個單位，也可以指定在哪個響應區間占用多少單位。以下是 BS 官方的參數說明：

<escape>
<table>
  <thead>
    <tr>
      <th></th>
      <th>xs<br>&lt;576px</th>
      <th>sm<br>≥576px</th>
      <th>md<br>≥768px</th>
      <th>lg<br>≥992px</th>
      <th>xl<br>≥1200px</th>
      <th>xxl<br>≥1400px</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Container <code>max-width</code></th>
      <td>None (auto)</td>
      <td>540px</td>
      <td>720px</td>
      <td>960px</td>
      <td>1140px</td>
      <td>1320px</td>
    </tr>
    <tr>
      <th>Class prefix</th>
      <td><code>.col-</code></td>
      <td><code>.col-sm-</code></td>
      <td><code>.col-md-</code></td>
      <td><code>.col-lg-</code></td>
      <td><code>.col-xl-</code></td>
      <td><code>.col-xxl-</code></td>
    </tr>
    <tr>
      <th># of columns</th>
      <td colspan="6">12</td>
    </tr>
    <tr>
      <th>Gutter width</th>
      <td colspan="6">1.5rem (.75rem on left and right)</td>
    </tr>
    <tr>
      <th>Custom gutters</th>
      <td colspan="6">Yes</td>
    </tr>
    <tr>
      <th>Nestable</th>
      <td colspan="6">Yes</td>
    </tr>
    <tr>
      <th>Column ordering</th>
      <td colspan="6">Yes</td>
    </tr>
  </tbody>
</table>
</escape>

值得注意的部分：
1. 總寬會被分成 12 份，因此同一列的 `col-{number}` 數字總和建議為 12，例如 12、6+6、3+3+3+3、3+3+6、4+4+4、2+2+2+2+2+2⋯⋯
2. 沒有指定數字的 `.col`，會在 12 格扣除其他 `.col-*` 已指定的格數之後，平均分配剩餘的空間。
3. 如果總和超過 12，超出的 `col` 會自動換到下一行。
4. 若想強制換行，可以插入 `div.w-100`，效果類似 `<br>`（占滿整列但沒有內容所以看不見），不過更建議直接用第二組 `row` 來排下一列。
5. 如果想依內容決定寬度，可使用 `div.col-auto`，寬度由內容決定，不再使用網格的比例分配。

```html
<style>
  .row>div{
    background: #ccc;
  }
  .row {
    margin-bottom: 5px;
    outline: 1px solid blueviolet;
  }
</style>
<div class="container">
  <!-- 總寬空間總和為 12，舉例可以 12,6+6, 3+3+3+3, 3+3+6, 4+4+4, 2+2+2+2+2+2+2...... -->
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
  <!-- 如想以內容為寬，可以使用`<div class="col-auto">`，將只根據 content 為寬做保留，不是以網格單位。 -->
  <div class="row">
    <div class="col-3">col-3</div>
    <div class="col-auto">i am content!</div>
    <div class="col-6">col-6</div>
    <div class="col">col</div>
  </div>
</div>
```

#### 響應斷點 breakpoints
除了基本的 `col` 與 `col-*`，也有響應式語法 `col-{breakpoint}` 與 `col-{breakpoint}-*`，兩種可以混合使用。

1. 如果某個響應區間沒有宣告 `col`，該區塊在那個區間就會脫離網格，變成寬度 100% 的一般區塊（除非有需求，否則應避免）。
2. 不帶數字的 `col-{breakpoint}` 同樣是自動平均分配寬度，但只在該響應區間以上才生效；小於該區間時，每個區塊各占一整列。
3. 響應式規則由小到大向上套用，較大斷點的規則會在該寬度以上覆蓋較小斷點，所以優先順序為 `col-*` < `col-sm-*` < `col-md-*` < `col-lg-*` < `col-xl-*` < `col-xxl-*`。

```html
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }

  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }
</style>
<div class="container">
  <div class="row">
    <!-- col 能決定何時才會變成 full width -->
    <div>this is a normal div, always=100%</div>
    <div>this is a col-12, always=100%</div>
    <div class="col-xxl">col-xxl, when &lt;1400 = 100%</div>
    <div class="col-xl">col-xl, when &lt;1200 = 100%</div>
    <div class="col-lg">col-lg, when &lt;992 = 100%</div>
    <div class="col-md">col-md, when &lt;768 = 100%</div>
    <div class="col-sm">col-sm, when &lt;576 = 100%</div>
    <div class="col">col, width = auto</div>
  </div>
  <div class="row">
    <!-- 不帶數字的 `col-{breakpoint}` 可視同當下 media queries 狀態為 col 而自動分配寬度 -->
    <div class="col">col</div>
    <div class="col-sm">col-sm</div>
    <div class="col-md">col-md</div>
  </div>
  <div class="row">
    <!-- 如果某 media queries 當下找不到 col 公式會導致 100% 滿版（除非有需求否則應避免） -->
    <div class="col-xl-6">col-xl-6</div>
    <div class="col-xl-3">col-xl-3</div>
  </div>
  <div class="row">
    <div class="col col-xl-4">col<br>col-xl-4</div>
    <div class="col-xl-4">col-xl-4</div>
    <div class="col col-xl-4">col<br>col-xl-4</div>
  </div>
  <div class="row">
    <!-- 透過公式的混和與各自 media queries 的 width 值不同，形成響應式的多欄位控制 -->
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">col-12<br>col-sm-6<br>col-md-4<br>col-lg-3<br>col-xl-2</div>
  </div>
  <div class="row">
    <!-- 響應斷點本身有向上相容（優先權）的效果，所以相同數字可省略  -->
    <div class="col-sm-4">col-sm-4</div>
    <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">col-sm-4<br>col-md-4<br>col-lg-4<br>col-xl-4</div>
    <div class="col-sm-4 col-md-4 col-lg-4 col-xl-6">col-sm-4<br>col-md-4<br>col-lg-4<br>col-xl-6</div>
  </div>
</div>
```

### 行列指定 Row columns
在 `row` 加上 `.row-cols-*`，可以指定每一列要放幾個欄位，原理是直接計算並指定 `width`，適合搭配自動均分（沒有數字）的 `.col` 使用。另有 `.row-cols-auto`，讓 `row` 內的所有 `col` 都以內容寬度計算。

```html
  <style>
    .row>div {
      background: #ccc;
      border: 1px solid black;
    }

    .row {
      margin-bottom: 20px;
      outline: 1px solid blueviolet;
    }
  </style>
  <div class="container">
    <!-- 預設 col 是吃剩下的空間再均分 -->
    <div class="row">
      <div class="col-6">col-6</div>
      <div class="col">col</div>
    </div>
    <!-- row-cols-5 導致 col 有 width:20% ( 等於 12/5 格數） -->
    <div class="row row-cols-5">
      <div class="col-6">col-6</div>
      <div class="col">col with<br>row-cols-5</div>
    </div>
    <div class="row row-cols-auto">
      <!-- row-cols-auto 導致 col 全都是內容寬設定 -->
      <div class="col-6">col-6</div>
      <div class="col">col with<br>row-cols-auto</div>
    </div>
  </div>
```

#### 響應斷點 breakpoints
`row-cols-{breakpoint}-*` 能在指定的響應區間做設定，可以取代過去逐一對每個 `col` 設定斷點的瑣碎作法。

```html
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }
  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }
</style>
<div class="container">
  <!-- 以前的做法，在各顯示尺寸下做不同的排列 -->
  <div class="row">
    <div class="col-sm-6 col-md-4 col-xl-3">col</div>
  </div>
  <div class="row row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
    <div class="col-sm">col</div>
  </div>
</div>
```

### 巢狀結構
巢狀結構是指在原本的 `col` 裡面再放一組 `row` 與 `col`，內層會以外層 `col` 的寬度為基準，重新分配 12 格（實用性不高）。舉例如下：

```html https://getbootstrap.com/docs/5.0/layout/grid/#nesting
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }

  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }
</style>
<div class="container">
  <div class="row">
    <div class="col-sm-3">
      Level 1: .col-sm-3
    </div>
    <div class="col-sm-9">
      <div class="row">
        <div class="col-8 col-sm-6">
          Level 2: .col-8 .col-sm-6
        </div>
        <div class="col-4 col-sm-6">
          Level 2: .col-4 .col-sm-6
        </div>
      </div>
    </div>
  </div>
</div>
```

## 欄位 Columns
熟悉 Grid 之後，接著學習欄位（columns）的調整技巧，包含對齊方式、換行與斷行、欄位排序與偏移。

### 對齊 Alignment
`row` 本身就是 `display: flex` 的父容器，`col` 是子項目，因此許多 class 與 flexbox 屬性一一對應。如果你已經熟悉 flexbox，就能直接對應到本單元，差別只在於改用 class 名稱來指定。

{% note default %}
請參考 [官方示範](https://getbootstrap.com/docs/5.0/layout/columns/#alignment)，這裡不再舉例。
{% endnote %}

**for row use**

- `.align-items-start`（`align-items: flex-start`）：整體垂直靠上對齊
- `.align-items-center`（`align-items: center`）：整體垂直置中對齊
- `.align-items-end`（`align-items: flex-end`）：整體垂直靠下對齊
- `.justify-content-start`（`justify-content: flex-start`）：整體水平靠左對齊
- `.justify-content-center`（`justify-content: center`）：整體水平置中對齊
- `.justify-content-end`（`justify-content: flex-end`）：整體水平靠右對齊
- `.justify-content-around`（`justify-content: space-around`）：整體水平均分對齊，兩側留間格
- `.justify-content-between`（`justify-content: space-between`）：整體水平均分對齊，首尾子項目貼齊兩側
- `.justify-content-evenly`（`justify-content: space-evenly`）：整體水平均分對齊，所有間隔等寬

**for col use**

- `.align-self-start`（`align-self: flex-start`）：自身垂直靠上對齊
- `.align-self-center`（`align-self: center`）：自身垂直置中對齊
- `.align-self-end`（`align-self: flex-end`）：自身垂直靠下對齊
- `.order-*`（`order: *`）：依數字由小到大排序（BS 提供 0～5）
- `.order-first`（`order: -1`）：排到最前面
- `.order-last`（`order: 6`）：排到最後面

所以你可以輕易控制出以下行為：
1. 設定水平對齊：利用 `.justify-content-*` 控制水平方向
2. 設定垂直對齊：利用 `.align-items-*` 控制垂直方向

> 這裡只用到一部分的 flex 拿來對齊用途，flexbox 另有完整規格可供使用，後續的通用操作會再重新介紹。

#### 換行與斷行
這裡說明如何讓多個欄位分成多列排列的兩種做法與現象：
- 換行：欄位總和超過 12 時，會自動 wrap 到下一列。
- 斷行：刻意插入 `width: 100%` 的空白區塊，使同一列放不下後面的欄位，被迫換行。

```html
<style>
  .row>div:not(.w-100) {
    background: #ccc;
  }
  .row {
    margin-bottom: 5px;
    outline: 1px solid blueviolet;
  }
  .w-100{
    border-bottom:1px solid red;
  }
</style>
<div class="container">
  <!-- 如果總和硬要超過 12，會擠壓到下一行繼續輸出。呈現出欄位的換行效果（下個單元介紹提到） -->
  <div class="row">
    <div class="col-6">col-6</div>
    <div class="col-3">col-3</div>
    <div class="col-6">col-6</div>
  </div>
  <!-- 如果想強迫換行可用`div.w-100` 產生類似 `<br>` 效果，原理只是塞滿版但看不到的 box （下個單元介紹提到）-->
  <div class="row">
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
    <!-- Force next columns to break to new line -->
    <div class="w-100"></div>
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
  </div>
  <!-- 可透過 display 通用操作控制該空白區塊的運作條件 -->
  <div class="row">
    <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
    <!-- Force next columns to break to new line at md breakpoint and up -->
    <div class="w-100 d-none d-md-block"></div>
    <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
  </div>
</div>
```

### 排序 Order classes
使用 `.col.order-*` 控制欄位的出場順序，同樣是透過 flex 運作，且只能寫在子項目上。

**for col use**
- `.order-*`（`order: *`）：依數字由小到大排序（BS 提供 0～5）
- `.order-first`（`order: -1`）：排到最前面
- `.order-last`（`order: 6`）：排到最後面

#### 偏移 Offsetting columns
欄位的偏移有兩種方式：`.offset-*`，以及透過 Margin 通用操作。前者推移的是網格的欄位，後者則是快速定位。

##### offset 推移
使用 `offset-*` 或 `offset-{breakpoint}-*` 推移 `col` 的位置（建議優先使用），效果像是有一個看不見的 `col` 占掉了該位置。

```html https://getbootstrap.com/docs/5.0/layout/columns/#offset-classes
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }

  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }
</style>
<div class="container">
  <h1>OFFSET</h1>
  <div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-4 offset-md-4">.col-md-4 .offset-md-4</div>
  </div>
  <div class="row">
    <div class="col-md-3 offset-md-3">.col-md-3 .offset-md-3</div>
  </div>
  <div class="row">
    <div class="col-md-6 offset-md-3">.col-md-6 .offset-md-3</div>
  </div>
</div>
```

##### Margin 通用操作
利用 margin 微調 `col` 的位置，可參閱官方 `utilities > Spacing` 單元的 margin 參數。此外另提供快速推到一側的效果：
- `.ms-auto` 提供 `margin-left: auto`，在左側（start）留出最大空白，把項目推向右側。
- `.me-auto` 提供 `margin-right: auto`，在右側（end）留出最大空白，把項目推向左側。

```html https://getbootstrap.com/docs/5.0/layout/columns/#margin-utilities
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }

  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }
</style>
<div class="container">
  <div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-4 ms-auto">.col-md-4<br>.ms-auto</div>
  </div>
  <div class="row">
    <div class="col-md-3 ms-md-auto">.col-md-3<br>.ms-md-auto</div>
  </div>
  <div class="row">
    <div class="col-auto me-auto">.col-auto<br>.me-auto</div>
    <div class="col-auto">.col-auto</div>
  </div>
</div>
```

### 獨立欄位 standalone column
從第五版開始，column 的原理改為 `flex: 0 0 auto`，並以 `width` 指定比例作為空間計算的核心。因此在沒有 `row` 的容器下，仍可保有 `width` 的基本效果（block 型態），也就是在一般結構下也能快速指定區塊寬度的比例。舉例來說，文繞圖的用法如下：

```html https://getbootstrap.com/docs/5.0/layout/columns/#standalone-column-classes
<style>
  .container div {
    background: #ccc;
    border: 1px solid black;
  }
</style>
<div class="container">
  <h1>standalone column</h1>
  <div class="col-3">
    .col-3: width of 25%
  </div>
  <div class="col-sm-9">
    .col-sm-9: width of 75% above sm breakpoint
  </div>
  <hr>
  <h1>float img and width 50%</h1>
  <div class="clearfix p-3">
    <img src="https://fakeimg.pl/1000x500/eee" class="col-md-6 float-md-end mb-3 ms-md-3 img-fluid">
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nemo, velit molestiae aperiam laborum possimus
      illum animi consequuntur optio earum, assumenda vero consectetur alias corrupti dolore quasi fugiat, quas nihil.
    </p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nemo, velit molestiae aperiam laborum possimus
      illum animi consequuntur optio earum, assumenda vero consectetur alias corrupti dolore quasi fugiat, quas nihil.
    </p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nemo, velit molestiae aperiam laborum possimus
      illum animi consequuntur optio earum, assumenda vero consectetur alias corrupti dolore quasi fugiat, quas nihil.
    </p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nemo, velit molestiae aperiam laborum possimus
      illum animi consequuntur optio earum, assumenda vero consectetur alias corrupti dolore quasi fugiat, quas nihil.
    </p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nemo, velit molestiae aperiam laborum possimus
      illum animi consequuntur optio earum, assumenda vero consectetur alias corrupti dolore quasi fugiat, quas nihil.
    </p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla nemo, velit molestiae aperiam laborum possimus
      illum animi consequuntur optio earum, assumenda vero consectetur alias corrupti dolore quasi fugiat, quas nihil.
    </p>
  </div>
</div>
```

{% note info %}
**注意**：
使用浮動元素時，建議在外層多包一層並加上 `.clearfix`，避免浮動造成版面錯位。
{% endnote %}

## 間格 Gutters
前面學 Grid 時已經知道：`.container` 會產生 `padding: 0 0.75rem`，`.row` 會產生 `margin: 0 -0.75rem`，`col-*` 會產生 `padding: 0 0.75rem`。前兩者互相抵消，使 `col` 能對齊整個 `container` 的兩側，而欄位之間的這段間距稱為間格（gutters）。

### 水平間格 
預設左右各為 0.75rem（12px），如果需要加大或調整水平間格，需要：
1. 加大 `.container` 的 padding，利用 `px-*` 通用操作即可。
2. 將 `.row` 的負 margin 加大到與前一項相同的值，使用專用公式 `gx-*`（數字 0～5，與前者的數值不同，需要多試幾次對齊）。
3. 讓 `.col` 的預設 padding 維持不變（與其他不受影響的 container 仍然切齊）。
4. 如果欄位內距還想再加大，需要額外加一層子元素來調整 padding。

另一種做法是把步驟 1 改成 `.overflow-hidden`，效果差異在於間格兩側與欄位之間的表現不同。

```html https://getbootstrap.com/docs/5.0/layout/gutters/#horizontal-gutters
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }
  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }
  .col>div{
    background: salmon;
  }
</style>
<h1>Container + px-4</h1>
<div class="container px-4">
  <div class="row gx-5">
    <div class="col">
      <div class="p-3">Custom column padding</div>
    </div>
    <div class="col">
      <div class="p-3">Custom column padding</div>
    </div>
  </div>
</div>
<hr>
<h1>Container + overflow hidden</h1>
<div class="container overflow-hidden">
  <div class="row gx-5">
    <div class="col">
      <div class="p-3">Custom column padding</div>
    </div>
    <div class="col">
      <div class="p-3">Custom column padding</div>
    </div>
  </div>
</div>
```

### 垂直間格
原理與前面相同，方向改為垂直；重點是在 `.row` 使用 `.gy-*`（數字 0～5）。

```html https://getbootstrap.com/docs/5.0/layout/gutters/#vertical-gutters
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }

  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }

  .row>div>div {
    background: salmon;
  }
</style>
<h1>Container + overflow hidden</h1>
<div class="container overflow-hidden">
  <div class="row gy-5">
    <div class="col-6">
      <div class="p-3">Custom column padding</div>
    </div>
    <div class="col-6">
      <div class="p-3">Custom column padding</div>
    </div>
    <div class="col-6">
      <div class="p-3">Custom column padding</div>
    </div>
    <div class="col-6">
      <div class="p-3">Custom column padding</div>
    </div>
  </div>
</div>
```

### 水平垂直間格
也可以同時調整水平與垂直的間格，同樣在 `.row` 使用 `.g-*` 公式。

```html https://bootstrap5.hexschool.com/docs/5.0/layout/gutters/#horizontal--vertical-gutters
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }

  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }

  .row>div>div {
    background: salmon;
  }
</style>
<div class="container">
  <h1>Container + overflow hidden</h1>
</div>
<div class="container overflow-hidden">
  <div class="row g-5">
    <div class="col-6">
      <div class="p-3">Custom column padding</div>
    </div>
    <div class="col-6">
      <div class="p-3">Custom column padding</div>
    </div>
    <div class="col-6">
      <div class="p-3">Custom column padding</div>
    </div>
    <div class="col-6">
      <div class="p-3">Custom column padding</div>
    </div>
  </div>
</div>
```

### 行列指定的響應組合
Gutter 間格的調整參數也提供響應式公式，下列範例說明如何搭配行列指定的響應式設定，一併調整間格。

```html https://getbootstrap.com/docs/5.0/layout/gutters/#row-columns-gutters
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }

  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }

  .row>div>div {
    background: salmon;
  }
</style>
<div class="container">
  <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
    <div class="col">
      <div class="p-3">Row column</div>
    </div>
  </div>
</div>
```

### 無間格 No gutter
預設情況下，`container` 有 12px 的 padding，`row` 有 -12px 的 margin。如果不需要間格，在 `.row` 加上 `.g-0` 就能清除。

```html https://getbootstrap.com/docs/5.0/layout/gutters/#no-gutters
<style>
  .row>div {
    background: #ccc;
    border: 1px solid black;
  }

  .row {
    margin-bottom: 20px;
    outline: 1px solid blueviolet;
  }
</style>

<div class="container">
  <h1>DEFAULT GUTTER</h1>
  <div class="row">
    <div class="col-sm-6 col-md-8">.col-sm-6 .col-md-8</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>
</div>
<div class="container">
  <h1>NO GUTTER</h1>
  <div class="row g-0">
    <div class="col-sm-6 col-md-8">.col-sm-6 .col-md-8</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>
</div>
```

## 排版類的通用操作 (display & flexbox)
排版單元先學會幾個重要的通用操作：display、flexbox、margin、padding 與 visibility。這些都是版面調整的基礎（官網把它們歸類在通用類別，但這幾個需要提前認識，作為版面調整的基本概念）。

### Display 操作
對應 CSS 的 `display` 屬性，並支援響應式斷點，可參考 [官網範例](https://getbootstrap.com/docs/5.0/utilities/display/)，寫法如下：

```css
/* display */
.d-inline
.d-block
.d-flex
... 剩下省略

/* 規則公式： */
.d-{value} //for 響應式中斷 xs
.d-{breakpoint}-{value} //for 響應式中斷 sm, md, lg, xl, xxl

breakpoint: sm, md, lg, xl, xxl
value: none, inline, inline-block, block, grid, table, table-cell, table-row, flex, inline-flex
```

透過響應式斷點，可以控制元素在指定的裝置上顯示或隱藏。

```html
<div class="d-lg-none">hide on lg and wider screens</div>
<div class="d-none d-lg-block">hide on screens smaller than lg</div>
```

#### 列印模式的 Display
BS 針對列印模式（`@media print`）提供了對應的 display 公式，方便設計列印時的顯示方式。

```css
/* 規則公式： */
.d-print-{value}

value: none, inline, inline-block, block, grid, table, table-cell, table-row, flex, inline-flex
```

```html
<div class="d-print-none">Screen Only (Hide on print only)</div>
<div class="d-none d-print-block">Print Only (Hide on screen only)</div>
<div class="d-none d-lg-block d-print-block">Hide up to large on screen, but always show on print</div>
```

### Flex 操作
Grid 網格系統的原理就是 flex，因此也可以自行運用 flex 規則。注意：如果不是用在 `.row` 上，要先用 display 單元把元素設為 `flex` 或 `inline-flex`，才能使用其他 flexbox 操作（`.row` 本身已是 flex，不需要再設定）。

```css
/* use display than flex or inline-flex */
.d-flex
.d-inline-flex

/* 響應規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: flex, inline-flex
```

#### flex-direction 主軸方向性 (in 父容器）
flex-direction 控制容器的排列方向，可設定水平左起、水平右起、垂直上起、垂直下起等主要方向，並支援響應式斷點。

```css
/* flex-direction */
.flex-row  /*水平&左起*/
.flex-row-reverse  /*水平&右起*/
.flex-column  /*垂直&上起*/
.flex-column-reverse  /*垂直&下起*/

/* 響應規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: row, row-reverse, column, column-reverse
```

#### justify-content 屬性 (in 父容器）
justify-content 控制這些子項目的靠齊方式，可控制向左靠齊（根據 flex-direction 起始處）、向右靠齊（反之結尾處）、置中對齊、分散兩側、平均分散（每個子項目兩側都等寬）

```css
/* justify-content */
.justify-content-start  /*向左（或起始處）靠齊*/
.justify-content-end  /*向右（或起始處）靠齊*/
.justify-content-center  /*置中對齊*/
.justify-content-between  /*均分對齊，兩端無間格*/
.justify-content-around  /*均分對齊，兩端為間格（等寬不重疊）*/
.justify-content-evenly  /*均分對齊，兩側為間格（等寬重疊）*/

/* 響應規則公式： */
.flex-content-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: start, end, center, between, around, evenly
```

#### align-items 屬性 (in 父容器）
align-items 控制子項目在交叉軸（cross axis）上的對齊方式，交叉軸與 flex-direction 決定的主軸互相垂直。

```css
/* align-items */
.align-items-start  /*頂端對齊*/
.align-items-end  /*底部對齊*/
.align-items-center  /*中線對齊*/
.align-items-baseline  /*基準線（內容之文字）對齊*/
.align-items-stretch  /*填滿 100%*/

/* 響應規則公式： */
.align-items-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: start, end, center, baseline, stretch
```

#### align-self 屬性 (in 子項目）
align-self 可以覆蓋父容器 align-items 的設定，讓單一子項目有自己的對齊方式（可用值與 align-items 相同）。

```css
/* align-self */
.align-self-start  /*頂端對齊*/
.align-self-end  /*底部對齊*/
.align-self-center  /*中線對齊*/
.align-self-baseline  /*基準線（內容之文字）對齊*/
.align-self-stretch  /*填滿 100%*/

/* 響應規則公式： */
.align-self-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: start, end, center, baseline, stretch
```

#### flex-fill 屬性 (in 子項目）
CSS 本身沒有這個屬性，`flex-fill` 是 Bootstrap 額外提供的，效果等同 `flex: 1 1 auto`：讓子項目依各自內容撐開，並平均填滿主軸上的剩餘空間。

```css
/* flex-fill */
.flex-fill  /*子項目進行填滿間格*/

/* 響應規則公式： */
.flex-{breakpoint}-fill
breakpoint: sm, md, lg, xl, xxl
```

#### flex-grow 與 flex-shrink 屬性 (in 子項目）
與 CSS 的 `flex-grow`、`flex-shrink` 相同，控制子項目的膨脹與收縮，但 BS 只提供 **0 與 1** 兩個值。
- 1 代表**啟用**膨脹/收縮，反之 0 代表**強制不要**膨脹收縮。
- `flex-grow-1`：子項目會膨脹並填滿剩餘空間。
- `flex-shrink-1`：空間不足時子項目會收縮，最小可縮到文字能換行的內容寬度；例如前一個項目是 `w-100` 時，擠壓效果最明顯。此屬性不常使用，因為子項目未指定寬度時本來就會依內容調整。

```css
/* flex-grow */
.flex-grow-0  /*子項目不允許膨脹*/
.flex-grow-1  /*子項目允許膨脹填滿最大空間*/

/* 響應規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: grow-0, grow-1

/* flex-shrink */
.flex-shrink-0  /*子項目不允許收縮換行*/
.flex-shrink-1  /*子項目允許被擠壓時文字行收縮換行*/

/* 響應規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: shrink-0, shrink-1
```

#### margin auto 效果 (in 子項目）
前面在 `row` 與 `col` 的部分曾介紹過 margin auto。在 flexbox 內可以使用 `.me-auto`、`.ms-auto`、`.mt-auto`、`.mb-auto`，把剩餘空間推向指定的一側，將子項目推開。

#### wrap 屬性 (in 父容器）
控制子項目空間不足時是否換行：不換行、往下換行或往上換行。

```css
/* wrap */
.flex-nowrap  /*不換行*/
.flex-wrap  /*換行朝下*/
.flex-wrap-reverse  /*換行朝上*/

/* 響應規則公式： */
.flex-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: nowrap, wrap, wrap-reverse
```

#### order 屬性 (in 子項目）
前面介紹 `row` 與 `col` 時提過，這裡用於控制子項目的顯示順序。

- 數字越小越前面；未指定時預設為 0，數字相同則依 HTML 順序排列。BS 提供 `order-0` 到 `order-5`。
- 另有 `.order-first` 與 `.order-last`，絕對排到最前與最後，原理是數值 -1 與 6。

```css
/* order */
.order-{value}

/* 響應規則公式： */
.order-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: 0, 1, 2, 3, 4, 5, first, last
```

#### align-content 屬性 (in 父容器）
以水平主軸為例，在容器有高度且子項目有多行時，控制整排子項目在垂直方向的對齊方式；單行（`.flex-nowrap`）時無效，此時請改用 `align-items`。

```css
/* align-content */
.align-content-start  /*頂端對齊*/
.align-content-end  /*底部對齊*/
.align-content-center  /*中線對齊*/
.align-content-around  /*均分對齊，兩側留間格*/
.align-content-stretch /*平均的填滿空間*/

/* 響應規則公式： */
.align-content-{breakpoint}-{value}
breakpoint: sm, md, lg, xl, xxl
value: start, end, center, around, stretch
```

### Spacing 操作
間距是很重要的微調工具，處理的是 margin（外距）與 padding（內距），公式的組合比較多。主要由三個部分組成：屬性（內距 `p` 或外距 `m`）、方向（上下左右）、距離（以 0.25rem 為單位）。

```css
.{value}{sides}-{size} /* 間距控制 */
.{value}{sides}-{breakpoint}-{size} /* 響應式間距控制 */

value: p(padding), m(margin)
side: t(top), b(bottom), s(start|left), e(end|right), x(left & right), y(top & bottom), 未指定時 (top & bottom & left & right)
size: 0, 1, 2, 3, 4, 5, auto
breakpoint: sm, md, lg, xl, xxl
```

> 當元素有指定寬度時，加上 `.mx-auto` 就能輕易水平置中（左右 margin 自動撐滿剩餘空間）。

#### 負值的 margin
預設未開啟此功能，需到 Sass 設定 `$enable-negative-margins: true` 才能啟用。關鍵的 class 公式是在 size 前面加上 `n` 代表負值，其餘語法與正值 margin 相同。

```css
/* for Margin fulloption */
size: n5, n4, n3, n2, n1, 0, 1, 2, 3, 4, 5, auto /* for margin use only */
```

#### gap 參數 (display:grid 模式）
如果元素使用 `display: grid`，可用 gap 控制 grid 容器內子項目之間的距離。

```css
.gap-{size} /* 間距控制 */
.{gap}-{breakpoint}-{size} /* 響應式間距控制 */

size: 0, 1, 2, 3, 4, 5
breakpoint: sm, md, lg, xl, xxl
```

### Visibility 操作
控制元素的可見性，對應 CSS 的 `visibility`，值為 `visible` 或 `hidden`。

```css
.visible {
  /* 看的見 */
  visibility: visible !important;
}
.invisible {
  /* 看不見但存在 */
  visibility: hidden !important;
}
```

## Z-index
Bootstrap 的部分元件會利用 z-index 呈現最佳的層級效果，各元件的數值已經設計好，不宜更動，否則會影響 Bootstrap 元件組合時的視覺邏輯。除非不得已，才透過 Sass 修改這些數值。

---

> BS 最核心的 Layout 到這裡已說明完畢，通用類別中的 flex 觀念也一併帶過。這些是 BS 最核心的設計，BS 的主要用途就是排版，其餘都只是區域性的 CSS 效果，用到時再查詢使用即可。

# 內容 Content
引入 Bootstrap 後，你可能會發現不少 HTML 標籤的外觀和印象中不太一樣（例如 `input`、`button`、`a`、`ul`），這是因為 Bootstrap 重新定義了 HTML 的預設 CSS，讓外觀更貼近常見的設計風格。從這裡開始，會接觸到文字、圖片、表格等與內容相關的 HTML 標籤與 class。

## 重置 reboot
多數網頁設計都會重置（reboot）簡陋的 HTML 預設樣式，Bootstrap 也不例外，它以 Normalize 為基礎訂定了一些規範。官網有詳細說明，這裡只列出幾個重點：

- 空間單位以 `rem` 為主，讓跨瀏覽器的呈現更一致
- 每個元素（包含偽元素）都改用 `box-sizing: border-box`，使空間計算不易受影響
- `body` 設定了全域的 `font-family`、`font-weight`、`line-height` 與 `color`，透過繼承讓整體網頁保持一致
- 預設 `body` 的 `background` 為 `#fff`
- 使用大量系統原生字型（雖有提供 Noto Sans，但不是 TC 版，中文粗體顯示略顯單薄）
- 標題標籤都移除了上方 margin，改為 `margin-bottom: .5rem`（段落為 `margin-bottom: 1rem`）
- `ul`、`ol`、`li` 調整了 margin 與 padding，`dl>dt>dd` 也同樣處理，並額外調整粗體效果
- 行內的 `code` 標籤增加顏色，多行的 `pre>code` 則調整字型
- `var` 標籤調整字型
- `kbd` 標籤有明顯的黑底圓角框效果
- `samp` 標籤針對程式輸出調整外觀
- `table` 調整了 border 與 padding，搭配 `caption` 標籤可以有效對齊，另有 table 單元的公式可選用
- `form` 與相關標籤的基本呈現更加簡潔，另有 form 單元的公式可選用
- 依 HTML5 語意，任何元素加上 `[role=button]` 屬性，會自動帶有 `cursor: pointer`
- `address` 標籤調整 `font-style`
- `blockquote` 標籤重新定義 margin，與其他元素保持一致的對齊
- `abbr` 標籤的外觀更明顯
- `details>summary` 標籤使用 `cursor: pointer` 作為互動提示
- 依 HTML5 語意，任何元素加上 `[hidden]` 屬性，會自動帶有 `display: none !important`

## 文字排版 Typography
Bootstrap 重新定義了部分文字標籤的外觀，同時也提供對應的 class，可以在不使用該標籤時模擬出相同的外觀。在不方便使用標籤的情況下，可以改用同名的 class 取得相同的外觀效果，既能省下巢狀標籤，也方便在元件內組合使用。以下是 Bootstrap 重新定義的基礎文字標籤：

> 如果你已經熟悉這些 HTML 標籤，這段內容快速瀏覽即可，不需要特別背誦這些 class 的原理。

- **標題文字**：標籤 `h1` ~ `h6`，class `.h1` ~ `.h6`。`h1` 的 `font-size` 為 2.5rem，`h2` 為 2rem，之後每降一級減少 0.25rem。
- **次文字**：標籤 `small`，class `.small`。字體縮小為原尺寸的 0.875 倍（`font-size: .875em`）。
- **減弱文字**：class `.text-muted`。文字變成灰色，類似提示文字的用途。
- **超大文字**：class `.display-*`。用於廣告或主題文字等需要特大字體的情況，`*` 為 1～6，數字越小字越大（與標題相反的直覺要注意）。
- **前導文字**：class `.lead`。用來強調 `p` 段落的開頭，效果為 `font-size: 1.25rem` 與 `font-weight: 300`。
- **標記文字**：標籤 `mark`，class `.mark`。行內產生黃底標記的效果。
- **刪除文字**：標籤 `del`、`s`，class `.text-decoration-line-through`。文字中央有一條橫線。
- **底線文字**：標籤 `ins`、`u`，class `.text-decoration-underline`。文字底部有底線。
- **粗體文字**：標籤 `strong`、`b`，class `.fw-bold`。文字加粗（標籤為 `font-weight: bolder`）。
- **斜體文字**：標籤 `em`、`cite`，class `.fst-italic`。文字呈現斜體。
- **縮寫文字**：標籤 `abbr`。英文縮寫提示（搭配 `title` 屬性），底線為點線，滑過時游標變成問號；可加上 `.initialism`，縮小為 0.875rem。
- **引用文字**：標籤 `blockquote.blockquote`。對 `blockquote` 加上 `.blockquote`，讓引用效果更好看。
- **引用來源文字**：class `.blockquote-footer`。前面會加上 `—` 符號，並以淺灰色小字顯示；應該使用 `footer` 標籤並放在 `blockquote` 內。
- **文字對齊**：class `.text-center`、`.text-end`。文字置中或靠右，通用類別會再詳細說明。
- **清除列表樣式**：class `.list-unstyled`。通常用在 `ul` 或 `ol`，清除原本的列表外觀。
- **列表水平化**：class `.list-inline` 搭配 `.list-inline-item`。把列表項目改成水平排列並加上間距，常用於水平選單。
- **省略文字**：class `.text-truncate`。文字超出空間（overflow）時，以「…」省略。

依 HTML5 的語意定義，行內文字標籤各有規範的用途（如果只想要視覺效果、不需要語意，應使用 class 來模擬）：
- `mark`：提供強調語氣
- `small`：註釋，例如版權說明
- `s`：代表這段內容已失去關聯或可信度
- `u`：具有非文字註釋之意
- `b`：突顯單詞或短語
- `i`：語音或專有技術名詞

## 圖片 images
圖片沒有太多特別的外觀公式，主要依賴基本的 class 公式與盒模型觀念。你應該理解 `.float-{start|end}`、`.text-{start|end}` 與 `.m{s|e}-auto` 這三者的原理與使用時機。

- `.img-fluid`（響應式圖片）：設定 `max-width: 100%` 與 `height: auto`，讓圖片跟隨父容器的寬度，並自動維持等比例的高度。
- `.img-thumbnail`（縮圖框）：替圖片加上內距與邊框，呈現縮圖框的效果。
- `.rounded`（圓角化）：圖片圓角化（`border-radius: 0.25rem`）。
- `.float-{start|end}`、`.text-{start|end}`、`.m{s|e}-auto`（靠邊對齊）：這幾種基本方法都適用於圖片，讓圖片靠左或靠右。
- `.text-center`、`.mx-auto`（水平置中）：原理同上；使用 `.mx-auto` 時圖片需為 `display: block`（可搭配 `.d-block`）。

> 如果圖片使用的是 `picture>source+img` 結構，Bootstrap 的 class 要寫在 `img` 上，而不是 `picture`。

## 表格 table
Bootstrap 已將 `table` 的預設樣式重置得很乾淨，通常會再搭配表格專用的 class。注意以下要點：

1. 要有美觀的表格外觀，必須在 `<table>` 上加入 `.table`，否則只會得到沒有樣式的表格。
2. 表格要有完整的結構，例如 `<thead>`、`<tbody>`、`<th>`；不重視語意的話，可以不寫 `scope="row|col"` 屬性。
3. class 要加在正確的位置：想改變哪個部分，就加在對應的標籤上，而且效果可以累加。

- `.table`（作用在 `table`，美化表格）：產生具有基本樣式的表格，否則只會得到沒有任何樣式的表格。
- `.table-{color}`（作用在 `table`、`tr`、`th`、`td`，表格主色）：提供色底黑字的表格效果（`dark` 為白字）。color 可用 `primary`、`secondary`、`success`、`danger`、`warning`、`info`、`light`、`dark`。
- `.table-striped`（作用在 `table`，條紋）：自動產生相間的條紋效果。
- `.table-hover`（作用在 `table`，滑過效果）：滑鼠移過時，該列 `tr` 會出現灰底。
- `.table-active`（作用在 `tr`、`th`、`td`，局部強調）：針對指定的列或欄位著色。
- `.table-bordered`（作用在 `table`，加上線條）：四邊框線為 `border: 1px solid #dee2e6`，可搭配 `border-{color}` 調色。
- `.table-borderless`（作用在 `table`，清除線條）：四邊框線為無。
- `.table-sm`（作用在 `table`，小表格）：縮短欄位間距，形成較小的表格。
- `.table-{light|dark}`（作用在 `thead`，標題顏色）：提供淺灰與深灰兩種標題顏色。
- `.caption-top`（作用在 `table`，標題位置）：把 `caption` 從表格下方改到表格上方。
- `.bg-{color}`（作用在 `table`、`tr`、`th`、`td`，背景色）：直接使用背景色公式（黑字），建議對 `table` 加上 `.table-dark` 讓文字變白。color 可用 `primary`、`success`、`danger`、`warning`、`info`。

table 的垂直對齊是透過 `vertical-align` 操作，提供以下三種 class，適用於 `table`、`tr`、`th`、`td`：
- `.align-middle`：置中
- `.align-bottom`：靠下
- `.align-top`：靠上

> table 的所有效果，對 `tfoot`、`caption` 也同樣有效。

### 響應式表格 (in table 標籤）
預設的表格會自動收縮到最小的內容寬度；可以使用響應式公式指定表格在何時停止收縮、改為固定寬度並出現水平捲軸。

```css
/* table responsive */
.table-responsive /* 不允許收縮，擠壓時直接啟用水平滾軸 */
.table-responsive-{breakpoint} /* 響應式表格，何種狀態下就開始不允許收縮 */

breakpoint: sm, md, lg, xl, xxl
```

## 圖片區塊 figure
`figure` 是 HTML5 的語意標籤，用來包住圖片與說明文字，形成一個獨立區塊。Bootstrap 對這個標籤有專門的樣式。`figure` 的基本結構如下：

```html
<!-- 使用 figure 主標籤包覆，內部包一個 img 標籤做圖片來源與 figcaption 標籤做說明文字 -->
<figure>
  <img src="..." alt="text"/>
  <figcaption>text</figcaption>
</figure>
```

Bootstrap 的用法如下：

1. 對 `figure` 加上 `.figure`，變為 `inline-block` 並有 1rem 的下方 margin。
2. 對 `img` 加上 `.figure-img`，設定 0.5rem 的下方 margin；可視需要再加上 `.img-fluid`（自適應寬度）或 `.rounded`（圓角）等效果。
3. 對 `figcaption` 加上 `.figure-caption`，字色為灰色 `#6c757d` 且縮小為 0.875em；可視需要加上 `.text-{start|end}` 調整對齊。

```html
<figure class="figure">
  <img src="..." class="figure-img img-fluid rounded" alt="text">
  <figcaption class="figure-caption text-right">test</figcaption>
</figure>
```