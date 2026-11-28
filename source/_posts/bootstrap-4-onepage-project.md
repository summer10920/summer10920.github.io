---
title: "Bootstrap 4.4 實作：一頁式網站"
categories:
  - 前端
  - Bootstrap
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - Bootstrap
date: 2020-04-04 15:11:36
---
![](assets/images/banner/bootstrap.png)

本篇整合前面學過的 HTML、CSS、Bootstrap 與 JS 知識，動手設計一個簡單、具備 RWD 的一頁式網站。考量部分學員尚未學到 JS，JS 的部分會集中在最後一節，於網站完成後再補充。

<!-- more -->

{% note warning %}
**版本提醒**
本文使用 Bootstrap 4.4（2020 年）與 jQuery 3.4.1。Bootstrap 5 已於 2021 年發布，文中用到的 Media Object（`.media`）、`.card-deck`、`.custom-*` 表單與 `data-toggle` 等寫法在 5 版都有改動或移除。新專案請參考 {% post_link bootstrap-5-onepage-project Bootstrap 5 實作 %}；本文仍可作為維護舊專案時的參考。
{% endnote %}

{% note default %}
本練習完成品之預覽位置：
https://summer10920.github.io/studies_TeachDemo_CSSBS/Bootstrap45_Hotel/
{% endnote %}
---

# 環境準備

1. 先下載並確保以下外掛檔案已放進你的專案：
   - [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/download/)、[jQuery](https://jquery.com/download/)
2. 關於文字，icon，網站 ico 的資源使用：
   - [Font Awesome](https://fontawesome.com/) 作為圖示庫（本文使用 5.12.1，免費版即可，Pro 版才需付費）
   - [思源黑體 Noto Sans TC](https://fonts.google.com/specimen/Noto+Sans+TC) 使用 Google Fonts 做為我們的中文字型。
   - [FontIcon](https://gauger.io/fonticon/) 做為我們簡單的網站 ico 使用。
3. 設定好網站名稱與上列所有設定，最後打一些字測試是否成功。
4. 使用 HTML5 的語意標籤，可參考 [W3Schools 的說明](https://www.w3schools.com/html/html5_semantic_elements.asp)。
5. 設計響應式網站時，建議先從小螢幕開始調整外觀，再針對大螢幕做局部調整（行動優先）。
6. 為了簡化練習，使用的所有 Bootstrap 元件都會移除 `aria-*` 屬性與 `sr-only` 等無障礙設計（實務上仍建議保留）。

**files**
```text
plugins/
├─ bootstrap.min.css  // 包含 BS 各種 Class 樣式表，這裡已不需要反向學習，為了檔案大小我們採用 min 壓縮版本。
├─ custom.css  //你應該把自訂的 CSS 寫在這裡而不是去調整 BS 的 CSS
│
├─ bootstrap.bundle.min.js  //主要包含 bootstrap.js + Popper.js，我們不會去研究理解 JS 結構所以使用壓縮板即可。
├─ jquery-3.4.1.min.js  //  BS 4.x 版本仍依賴 JQ 所以需要加載此套件，slim 版本（不支援 ajax 與 effect) 亦可使用。
imgs/
├─ favicon.ico
```

```css custom.css
body {
  font-family: 'Noto Sans TC', 'Open Sans', Helvetica, Arial;
  background: #eee; /* 白底不要太刺眼 */
}
```

```html index.html
<!DOCTYPE html>
<html lang="zh-tw">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 載入外部插件 注意順序 start -->
  <link rel="stylesheet" href="plugins/bootstrap.min.css">
  <link rel="stylesheet" href="plugins/custom.css">
  <link rel="shortcut icon" href="imgs/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC|Open+Sans&display=swap" rel="stylesheet"> <!--Google Font-->
  <script src="https://kit.fontawesome.com/fa483230ea.js" crossorigin="anonymous"></script> <!--Font Awesome 5.12.1-->
  <script src="plugins/jquery-3.4.1.min.js"></script>
  <script src="plugins/bootstrap.bundle.min.js"></script>
  <!-- 載入外部插件 end -->
  <title>泰山渡假飯店 - 為了夢想而努力</title>
</head>
<body>
  <!-- 簡單測試一下 -->
  <i class="fas fa-people-arrows"></i>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</body>
</html>
```

> 
---
# 區域設計
接下來以一頁式飯店網站為概念進行設計，主題分別為首頁（輪播廣告）、頁尾版權、房型介紹、服務設施、餐飲美食、交通資訊、聯絡我們。先整理代碼再做優化，最後一小節回頭處理 JS 動態。
## Section 輪播廣告
先做網站入口最強烈的視覺，也就是首頁：滿版、佔滿畫面的廣告圖片輪播；接著再設計第二個主題：房型介紹。
{% note default %}
以 BS carousel 文件的範例為基礎，選擇同時有導覽鍵、導覽列與字幕的範例開始修改。
https://getbootstrap.com/docs/4.4/components/carousel/#with-captions
{% endnote %}

```html 未修改
<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
```
### 整理代碼
1. 語意優化，將 `div.carousel` 容器更改為 `section#lokislider.carousel`
2. 移除所有的 `[aria-*]`、`span.sr-only`、`role="button"`。
3. 調整輪播的 `img[src]`，共四組圖片與相關元素，並移除 `[alt=*]`（簡化練習用）。

```html index.html
<body>
  <section id="lokislider" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#lokislider" data-slide-to="0" class="active"></li>
      <li data-target="#lokislider" data-slide-to="1"></li>
      <li data-target="#lokislider" data-slide-to="2"></li>
      <li data-target="#lokislider" data-slide-to="3"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://picsum.photos/1920/1080/?random=1" class="d-block w-100">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/1080/?random=2" class="d-block w-100">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/1080/?random=3" class="d-block w-100">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/1080/?random=4" class="d-block w-100">
        <div class="carousel-caption d-none d-md-block">
          <h5>Fourth slide label</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#lokislider" data-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#lokislider" data-slide="next">
      <span class="carousel-control-next-icon"></span>
    </a>
  </section>
</body>
```
> 此時輪播應該已能正常運作，圖片會自適應寬度 `w-100`（所以圖片比例要先抓好）。
### 優化調整
考慮手機模式的適應與一些外觀效果，進行以下調整（如果自動播放干擾調整，可先暫時拿掉 `data-ride="carousel"`）：

1. 手機模式：讓畫面滿版，且圖片以置中方式裁切，而不是等比例縮放。
   - 移除 `img` 的 `.d-block`，改加 `.h-100`，讓它永遠與輪播項目（螢幕高度）同高
   - 在 `div.carousel-item` 加上 `.vh-100`，圖片就能填滿整個畫面，超出的部分被裁切（與前一篇的教法不同）
   - 新增自訂 CSS，把 `#lokislider` 內的圖片設為 `object-fit: cover`，讓圖片填滿容器且不變形
2. 處理文字效果
   - 希望手機上保留 `carousel-caption` 的標題、只隱藏 `p` 元素：把 `d-none.d-md-block` 移到 `p` 元素上，並把 `h5` 改成 `h1` 讓標題加大
   - 讓 `carousel-caption` 填滿整個空間：在 `absolute` 定位上加上 `top: 0`、`bottom: 0`
   - 把 `carousel-caption` 設成 flex（`d-flex flex-column justify-content-center`），讓內容垂直置中
   - 替 `carousel-caption` 加上文字陰影 `text-shadow: #333 0.3rem 0.3rem 0.5rem`
3. 處理預設外觀
   - 把 carousel 的箭頭換成較明顯、尺寸較大的 Font Awesome 圖示，替換 `<span class="carousel-control-{prev|next}-icon"></span>` 為 `<i class="fas fa-angle-double-{left|right} fa-2x"></i>`
   - 以 CSS 把導覽鍵的圖案改成圓形
   - 使用濾鏡 `filter: grayscale(50%)` 降低圖片飽和度，讓文字對比更明顯

```css custom.css
#lokislider img {
  object-fit: cover;
  filter: grayscale(50%);
}
#lokislider .carousel-caption {
  top: 0;
  bottom: 0;
  text-shadow: #333 0.3rem 0.3rem 0.5rem;
}
#lokislider .carousel-indicators > li {
  border-radius: 50%;
  height: 15px;
  width: 15px;
  border: 10px solid transparent;
}
```
```html index.html
<section id="lokislider" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#lokislider" data-slide-to="0" class="active"></li>
    <li data-target="#lokislider" data-slide-to="1"></li>
    <li data-target="#lokislider" data-slide-to="2"></li>
    <li data-target="#lokislider" data-slide-to="3"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item vh-100 active">
      <img src="https://picsum.photos/1920/1080/?random=1" class="h-100 w-100">
      <div class="carousel-caption d-flex flex-column justify-content-center">
        <h1>First slide label</h1>
        <p class="d-none d-md-block">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>
    <div class="carousel-item vh-100">
      <img src="https://picsum.photos/1920/1080/?random=2" class="h-100 w-100">
      <div class="carousel-caption d-flex flex-column justify-content-center">
        <h1>Second slide label</h1>
        <p class="d-none d-md-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
    <div class="carousel-item vh-100">
      <img src="https://picsum.photos/1920/1080/?random=3" class="h-100 w-100">
      <div class="carousel-caption d-flex flex-column justify-content-center">
        <h1>Third slide label</h1>
        <p class="d-none d-md-block">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </div>
    <div class="carousel-item vh-100">
      <img src="https://picsum.photos/1920/1080/?random=4" class="h-100 w-100">
      <div class="carousel-caption d-flex flex-column justify-content-center">
        <h1>Fourth slide label</h1>
        <p class="d-none d-md-block">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#lokislider" data-slide="prev">
    <i class="fas fa-angle-double-left fa-2x"></i>
  </a>
  <a class="carousel-control-next" href="#lokislider" data-slide="next">
    <i class="fas fa-angle-double-right fa-2x"></i>
  </a>
</section>
```
---
## Footer 頁尾版權
先做頁尾版權，相對簡單，不需要使用 Bootstrap 元件。

1. 黑底白字、置中的文字即可，加上適當的版權說明。
2. 規劃一個回到頁首的錨點連結並挑選合適的圖示，連結目標可以是 `#` 或 `#lokislider`，這裡用 `position-fixed` 定位。
3. 調整動畫讓錨點連結感覺活潑些。

```html index.html
<footer class="bg-dark text-muted py-3 text-center">
  <small>
    泰山職業訓練中心課程教材編譯 <br>copyright &copy; <span class="text-warning">洛奇數位設計</span>. all rights reserved
  </small>
  <div>
    <a class="btn btn-info text-light" href="#lokislider"><i class="fas fa-angle-double-up fa-2x"></i></a>
  </div>
</footer>
```
```css custom.css
footer > .position-fixed {
  right: 5vh;
  bottom: 5vh;
}
footer > .position-fixed > a {
  animation: bounce 2s ease infinite;
}
@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate(0, 0);
  }
  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate(0, -30px);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate(0, -15px);
  }
  90% {
    transform: translate(0, -4px);
  }
}
```
---
## Section 房型介紹
需要讓多個房型以 tab 切換顯示，這裡會用到 `bootstrap.js` 提供的動態效果，能輕鬆完成。
{% note default %}
以 Navs 的 JS 行為範例二（程式碼較少）作為起點。
https://getbootstrap.com/docs/4.4/components/navs/#javascript-behavior
{% endnote %}
```html 未修改
<nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
</div>
```
### 整理代碼
1. 語意優化，用 `section#lokiroom` 包起來放在 `section#lokislider` 之後。原有 nav 調整為 `header>h2+nav` 之層級。
2. 移除所有的 `[aria-*]`、`role=*`，以及用不到的 `#id`；只需要 `a[href=#id]` 能對應到 `div#id.tab-pane`。
3. 將選單文字修改並增加為共五組，分別是行政本館、雙幕川館、繪圖湯屋、價目表、訂房須知。
4. 調整 `div#nav-tabContent.tab-content` 為 `article.tab-content`。
5. `nav>div.nav` 可以合併為 `nav.nav`，不影響功能。
6. `.tab-pane` 先簡單打幾個字，測試是否正常運作。

```html index.html
<section id="lokiroom">
  <header>
    <h2>房型介紹</h2>
    <nav class="nav nav-tabs">
      <a class="nav-item nav-link active" data-toggle="tab" href="#roomA">行政本館</a>
      <a class="nav-item nav-link" data-toggle="tab" href="#roomB">雙幕川館</a>
      <a class="nav-item nav-link" data-toggle="tab" href="#roomC">繪圖湯屋</a>
      <a class="nav-item nav-link" data-toggle="tab" href="#roomPrice">價目表</a>
      <a class="nav-item nav-link" data-toggle="tab" href="#roomRule">訂房須知</a>
    </nav>
  </header>
  <article class="tab-content">
    <div class="tab-pane fade show active" id="roomA">Lorem ipsum dolor sit amet. A</div>
    <div class="tab-pane fade" id="roomB">Lorem ipsum dolor sit amet. B</div>
    <div class="tab-pane fade" id="roomC">Lorem ipsum dolor sit amet. C</div>
    <div class="tab-pane fade" id="roomPrice">Lorem ipsum dolor sit amet. D</div>
    <div class="tab-pane fade" id="roomRule">Lorem ipsum dolor sit amet. E</div>
  </article>
</section>
```
### 優化調整 by 選單
1. 主框設計窄版、距離 py 為 5，調整為 `section#lokiroom.container.text-center.py-5`。
2. 頁首區域內的文字置中：`header.text-center`。
3. 標題顏色為 info、距離 pb 為 3，調整為 `h2.text-info.pb-3`。
4. 為了讓選單間距分散使用 `nav.justify-content-around`，考量 RWD 自訂 CSS 為`flex: 0 1 12%;`。
5. 配色：加上 `a.alert-info.text-white`，並自訂 CSS 處理 `.active` 與 `.nav-link` 的顏色。
6. 先對內容區增加空間為 `article.py-5`，一起評估空間，之後再微調。
7. 檢查試試 RWD 的效果如何，可以考慮添加 box 陰影。

```html index.html
  <section id="lokiroom" class="container py-5">
    <header class="text-center">
      <h2 class="text-info pb-3">房型介紹</h2>
      <nav class="nav nav-tabs justify-content-around">
        <a class="nav-item nav-link alert-info text-white active" data-toggle="tab" href="#roomA">行政本館</a>
        <a class="nav-item nav-link alert-info text-white" data-toggle="tab" href="#roomB">雙幕川館</a>
        <a class="nav-item nav-link alert-info text-white" data-toggle="tab" href="#roomC">繪圖湯屋</a>
        <a class="nav-item nav-link alert-info text-white" data-toggle="tab" href="#roomPrice">價目表</a>
        <a class="nav-item nav-link alert-info text-white" data-toggle="tab" href="#roomRule">訂房須知</a>
      </nav>
    </header>
    <article class="tab-content py-5">
    ...
    </article>
  </section>
```

### 規劃內容 by #roomA
用 card 元件呈現多組房間資料，並搭配網格（grid）。
{% note default %}
以 card 的 Images 範例作為單筆資料容器的起點。
https://getbootstrap.com/docs/4.4/components/card/#images
{% endnote %}

```html 未修改
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
```

1. 房型 `#roomA`、`#roomB`、`#roomC` 三個分頁都用 card 顯示資料，放進 `.tab-pane` 內並搭配 `p` 段落說明，整體結構為 `.tab-pane>p+(.card)*3`。
2. 承上，整合網格的 `row>col`，並針對三種寬度設定不同的 col。另外，這裡 `row` 的 `d-flex` 會失效，是因為 `.tab-content>.active` 的 `d-block` 優先權太高，所以需要用自訂 CSS 把它改回 `d-flex`。
3. 將 col 的間距 `mb` 設為 5。
4. 調整文字效果與局部向右浮動。

```html index.html
<article class="tab-content py-5">
  <div class="row tab-pane fade show active" id="roomA">
    <!-- row>col content A-->
    <p class="col-12 mb-5 text-muted text-center">
      溫馨典雅的行政本館，給您簡約的度假享受。<br>
      使用大片落地窗，採光極佳，每房皆設有觀景陽台，讓您遠眺高山、與大自然一親芳澤。
    </p>
    <div class="col-12 col-md-6 col-lg-4 mb-5">
      <div class="card">
        <img src="https://fakeimg.pl/300x200/d1ecf1" class="card-img-top">
        <div class="card-body">
          <h5>行政本館</h5>
          <p class="card-text">
            溫馨雙人房<small class="text-muted float-right">1 大床 | 6.5 坪</small>
          </p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mb-5">
      <div class="card">
        <img src="https://fakeimg.pl/300x200/d1ecf1" class="card-img-top">
        <div class="card-body">
          <h5>行政本館</h5>
          <p class="card-text">
            精緻雙人房<small class="text-muted float-right">2 小床 | 6.5 坪</small>
          </p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mb-5">
      <div class="card">
        <img src="https://fakeimg.pl/300x200/d1ecf1" class="card-img-top">
        <div class="card-body">
          <h5>行政本館</h5>
          <p class="card-text">
            親子四人房<small class="text-muted float-right">2 大床 | 8 坪</small>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="row tab-pane fade" id="roomB">Lorem ipsum dolor sit amet. B</div>
  <div class="row tab-pane fade" id="roomC">Lorem ipsum dolor sit amet. C</div>
  <div class="row tab-pane fade" id="roomPrice">Lorem ipsum dolor sit amet. D</div>
  <div class="row tab-pane fade" id="roomRule">Lorem ipsum dolor sit amet. E</div>
</article>
```
```css custom.css
#lokiroom > .tab-content > .active {
  display: flex;
}
```
### 規劃內容 by #roomB
與前一節相同，只需稍微修改文字，作為 `#roomB` 的內容。
```html index.html
<div class="row tab-pane fade" id="roomB">
  <!-- row>col content B-->
  <p class="col-12 mb-5 text-muted text-center">
    雙幕川館又稱小木屋，房外種植有柏樹，每房皆為獨棟式小屋設計。<br>
    打開房門就見到綠油油的寬廣草地，三五好友坐在房前的石桌上，聊天談心，呼吸一口大自然最新鮮的空氣，是最愜意的享受。
  </p>
  <div class="col-12 col-md-6 col-lg-4 mb-5">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/d1ecf1" class="card-img-top">
      <div class="card-body">
        <h5>雙幕川館</h5>
        <p class="card-text">
          溫馨雙人房<small class="text-muted float-right">1 大床 | 6.5 坪</small>
        </p>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-6 col-lg-4 mb-5">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/d1ecf1" class="card-img-top">
      <div class="card-body">
        <h5>雙幕川館</h5>
        <p class="card-text">
          精緻雙人房<small class="text-muted float-right">2 小床 | 6.5 坪</small>
        </p>
      </div>
    </div>
  </div>
</div>
```
### 規劃內容 by #roomC
與前一節相同，只需稍微修改文字，作為 `#roomC` 的內容。

```html index.html
<div class="row tab-pane fade" id="roomC">
  <!-- row>col content C-->
  <p class="col-12 mb-5 text-muted text-center">
    每房皆為獨棟式小屋設計，鋪設木質地板，浪漫典雅。<br>
    房內設有溫泉浴槽，私享您的奢華溫泉浴時光。
  </p>
  <div class="col-12 col-md-6 col-lg-4 mb-5">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/d1ecf1" class="card-img-top">
      <div class="card-body">
        <h5>繪影湯屋</h5>
        <p class="card-text">
          溫馨雙人房<small class="text-muted float-right">1 大床 | 6.5 坪</small>
        </p>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-6 col-lg-4 mb-5">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/d1ecf1" class="card-img-top">
      <div class="card-body">
        <h5>繪影湯屋</h5>
        <p class="card-text">
          精緻雙人房<small class="text-muted float-right">2 小床 | 6.5 坪</small>
        </p>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-6 col-lg-4 mb-5">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/d1ecf1" class="card-img-top">
      <div class="card-body">
        <h5>繪影湯屋</h5>
        <p class="card-text">
          親子四人房<small class="text-muted float-right">2 大床 | 8 坪</small>
        </p>
      </div>
    </div>
  </div>
</div>
```
### 規劃內容 by #roomPrice
{% note default %}
以 table 的 `table-sm` 範例作為起點。
https://getbootstrap.com/docs/4.4/content/tables/#small-table
{% endnote %}

1. 價目表直接使用 100% 寬度，不需要網格。
2. 使用 `h5` 標題與 `table`，並適當搭配主色。
3. 如果希望文字垂直置中，可以對 `th`、`td` 設定 `.align-middle`，或直接用自訂 CSS 會更快。
4. 如果希望平均分配空間，用自訂 CSS 較快。

```html index.html
<div class="tab-pane fade" id="roomPrice">
  <!--col content D-->
  <div class="mb-5">
    <h5 class="text-info">[ 行政本館 ]</h5>
    <table class="table table-sm text-center">
      <thead>
        <tr class="alert-info">
          <th class="border-info">房型</th>
          <th class="border-info">平日</th>
          <th class="border-info">假日</th>
          <th class="border-info">連續國定假日</th>
        </tr>
      </thead>
      <tbody>
        <tr><th>溫馨雙人房</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
        <tr><th>精緻雙人房</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
        <tr><th>親子四人房</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
      </tbody>
    </table>
  </div>
  <div class="mb-5">
    <h5 class="text-info">[ 雙幕川館 ]</h5>
    <table class="table table-sm text-center">
      <thead>
        <tr class="alert-info">
          <th class="border-info">房型</th>
          <th class="border-info">平日</th>
          <th class="border-info">假日</th>
          <th class="border-info">連續國定假日</th>
        </tr>
      </thead>
      <tbody>
        <tr><th>湖畔仙屋</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
        <tr><th>芬多森屋</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
      </tbody>
    </table>
  </div>
  <div class="mb-5">
    <h5 class="text-info">[ 繪影湯屋 ]</h5>
    <table class="table table-sm text-center">
      <thead>
        <tr class="alert-info">
          <th class="border-info">房型</th>
          <th class="border-info">平日</th>
          <th class="border-info">假日</th>
          <th class="border-info">連續國定假日</th>
        </tr>
      </thead>
      <tbody>
        <tr><th>溫馨蜜月房</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
        <tr><th>親子家庭房</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
        <tr><th>豪華尊爵房</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
      </tbody>
    </table>
  </div>
</div>
```
```css custom.css
#roomPrice th,#roomPrice td{
  vertical-align: middle;
}
#roomPrice th{
  width:25%;
}
```
### 規劃內容 by #roomRule
使用大量的標題與內文，並適當加上顏色、邊線與間距。

```html
<div class="tab-pane fade" id="roomRule">
  <!--col content E-->
  <h3 class="text-right border-bottom border-info">入住須知</h3>
  <h5 class="text-info">[ 飯店設備 ]</h5>
  <p class="mb-5">
    客房無線網路、有線第四台、自助洗衣機、免費烘乾機、免費停車場
  </p>
  <h5 class="text-info">[ 入住須知 ]</h5>
  <p class="mb-5">
    進房時間（Check In ) 時間為 15:00 以後；退房時間（Check
    Out）時間為 11:00 以前。<br>
    住宿時請攜帶本人身分證正本、駕照以利核對。<br>
    一般住宿附贈早餐、SPA 券（依住宿房型開立），特殊專案依專案條件辦理。<br>
    超過退房時間一個小時將以一個小時 200 元計費，超過半個小時將以一個小時計算。<br>
    請注意住宿人數勿超過客房設定之人數，若有超過客房設定人數，飯店有權拒絕入住。
  </p>
  <h5 class="text-info">[ 平假日定義 ]</h5>
  <p class="mb-5">
    平日時間：星期日~星期五；假日時間：星期六、連續假日結束前一日，依飯店公告為準。
  </p>
  <h5 class="text-info">[ 加人服務 ]</h5>
  <p class="mb-5">
    本飯店繪圖湯屋房型提供加人服務（含軟墊、備品、早餐、溫泉 SPA 券），<br>
    每加一人 NT$600（春節期間不適用）。
  </p>
  <h5 class="text-info">[ 其他注意事項 ]</h5>
  <p class="mb-5">
    為維護住宿品質，室內空間全面禁菸，禁止攜帶貓狗等寵物入住，如經查獲加收清潔費 5000 元。<br>
    為維護公共及個人安全，禁止在房間內烹煮食物，或攜帶瓦斯、電磁爐等同性質用具，敬請房客務必配合。<br>
    客房地面為木質地板，請勿擅自移動房內傢俱，如發現自行搬動客房家具造成木質地面損傷，需付損毁費用。<br>
    房型擺設僅供參考，以實體房間為主。<br>
    免費停車場（僅供免費停車，不負保管之責）。<br>
    行政本館及雙幕川館內衛浴設備皆為一般熱水，如需使用溫泉需至戶外大眾池或改訂繪圖湯屋房型。
  </p>

  <h3 class="text-right border-bottom border-info">官網訂房規範</h3>
  <p class="mb-5">- 僅適用官網訂房，專案如有特殊需求，依專案為主</p>

  <h5 class="text-info">[ 線上訂房須知 ]</h5>
  <p class="mb-5">
    線上訂房交易價格均已含營業稅及服務費，若您選擇線上刷卡，交易成功後將由您的信用卡帳戶直接扣款。<br>
    線上訂房不接受國民旅遊卡刷卡訂房，若需使用國民旅遊卡訂房請直接電洽櫃台辦理。
  </p>

  <h5 class="text-info">[ 延遲入住手續 ]</h5>
  <p class="mb-5">
    若您在住宿當日，因塞車或其他的因素有所耽擱，無法在當日下午六點以前辦理住房手續，請您先以電話聯繫，否則飯店將視為您當日取消訂房，恕不退費。
  </p>

  <h5 class="text-info">[ 更改入住日期 ]</h5>
  <p class="mb-5">
    訂房後如欲更改訂房日期，請電話聯絡協助處理。<br>
    同一筆訂單限更改一次，且更改後的訂單恕不接受退房，否則視同取消訂房，依取消訂房規範處理。<br>
    如更改後訂單金額大於原訂單金額，旅客需現場另行支付差額；如更改後金額小於原訂單金額，恕不退還差額。
  </p>

  <h5 class="text-info">[ 取消訂房 ]</h5>
  <p class="mb-5">
    取消訂房將依以下規範酌收定金，請特別注意：<br>
    住宿日 當日 取消訂房，扣定金總金額 100%<br>
    住宿日 1 天前（不含當日）取消訂房，扣定金總金額 80%<br>
    住宿日 2~3 天前（不含當日）取消訂房，扣定金總金額 70%<br>
    住宿日 4~6 天前（不含當日）取消訂房，扣定金總金額 60%<br>
    住宿日 7~9 天前（不含當日）取消訂房，扣定金總金額 50%<br>
    住宿日 10~13 天前（不含當日）取消訂房，扣定金總金額 30%<br>
    住宿日 14
    天前（不含當日）取消訂房，扣除匯款手續費後，剩餘定金退還。<br>
    線上訂房若有需求取消，請直接與我們「電話」聯繫進行取消訂房。<br>
    若您使用信用卡付款，我們將由系統進行刷退動作；若您使用臨櫃匯款或 ATM 轉帳，請您傳真訂房者之任一銀行存摺封面至 089-515026。
  </p>

  <h5 class="text-info">[ 特殊因素之退房處理 ]</h5>
  <p class="mb-5">
    若因天然災害等不可抗拒之因素（如地震、颱風等，以飯店所在地縣市政府公告為準）無法如期前往住宿<br>
    請於原訂住宿日３日（含當日）內與飯店之訂房中心連絡改期（得保留 6 個月）或是辦理退費。
  </p>
</div>
```
---
## Section 服務設施
這個區塊沒有按鈕功能，只需要以靜態清單呈現服務資訊，包含圖片、標題與文字的多組區塊，最後再加上考量 RWD 的不同顯示方式。

### 整理代碼
1. 利用前面的標題風格繼續套過以下結構，並賦予 section#id。
2. 會在 `section` 加上背景，所以 `header` 與 `article` 先設為窄版的 `container`。
```html
<section id="lokifacility" class="py-5">
  <header class="container text-center">
    <h2 class="text-info pb-3">服務設施</h2>
  </header>
  <article class="container py-5">
    ...
  </article>
</section>
```

3. `article` 內有圖片、標題與文字，這裡採用 Media Object 元件，並把圖片改為 200×200，共 4 筆。
{% note default %}
以 Media list 範例作為修改參考：
https://getbootstrap.com/docs/4.4/components/media-object/#media-list
{% endnote %}
修改後為：
```html
<article class="container py-5">
  <ul class="list-unstyled">
    <li class="media mb-4">
      <img src="https://fakeimg.pl/200x200" class="mr-3">
      <div class="media-body">
        <h5 class="mt-0 mb-1">List-based media object</h5>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
        vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
        lacinia congue felis in faucibus.
      </div>
    </li>
    <li class="media mb-4">
      <img src="https://fakeimg.pl/200x200" class="mr-3">
      <div class="media-body">
        <h5 class="mt-0 mb-1">List-based media object</h5>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
        vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
        lacinia congue felis in faucibus.
      </div>
    </li>
    <li class="media mb-4">
      <img src="https://fakeimg.pl/200x200" class="mr-3">
      <div class="media-body">
        <h5 class="mt-0 mb-1">List-based media object</h5>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
        vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
        lacinia congue felis in faucibus.
      </div>
    </li>
    <li class="media mb-4">
      <img src="https://fakeimg.pl/200x200" class="mr-3">
      <div class="media-body">
        <h5 class="mt-0 mb-1">List-based media object</h5>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
        vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
        lacinia congue felis in faucibus.
      </div>
    </li>
  </ul>
</article>
```

### 優化調整
單筆資料的 `li.media` 本身就是 flex 容器，可以利用它規劃不同的響應式效果：
1. xs 模式（手機）下的主軸方向為 flex-column
   - 將 flex 的交叉軸置中：`align-items-center`
   - 移除 img.mr-3 ，全靠 flex 來控制
   - 增添 div.media-body 內的文字為 p 元素且調整下方間距與底線 `.pb-3.border-bottom.border-info`
   - 為了間距好看，對 `img` 加上 `.pb-3`；由於不是標準的 `row>col` 寫法，會多出 `px-3` 的效果需要扣除，最快的方式是從 `.container` 下手
   - 同樣地，這裡會讓 `row` 的 margin 超出，使手機模式出現橫向溢位，因此請加上 `overflow-hidden`
2. sm 模式下主軸方向為 flex-sm-row
   - 設定 img 與 div.media-body 都為 col-sm-6
3. md 模式下的主軸方向與顯示 grid 不變，與 sm 模式相同。
4. lg 模式下的主軸方向不變
   - 這裡希望變雙欄位 li，所以對 ul>li 加入 Grid 觀念，變成 ul.row>li.col-lg-6
   - 這個斷點下偶數的 `li` 希望圖文方向相反；為了讓 HTML 不要太複雜，改用自訂 CSS（`@media` 搭配偽類）控制。但 Bootstrap 的 `flex-direction: row !important` 太強，因此建議改用 `order` 來調整順序
5. 添加背景與相關填色
   - 針對 `section` 自訂 CSS 背景，考量彈性使用 `center/cover` 與 `fixed`
   - 使用 background-blend-mode 做融合效果
   - 文字全改為白色：移除 `h2.text-info`，並加上 `section.text-white`，再加上文字陰影（參考前面的參數）

```html index.html
<section id="lokifacility" class="py-5 text-white">
  <header class="container text-center">
    <h2 class="pb-3">服務設施</h2>
  </header>
  <article class="container py-5 px-0 overflow-auto">
    <ul class="row list-unstyled">
      <li class="col-lg-6 flex-sm-row align-items-center flex-column media mb-4">
        <img class="pb-3 col-sm-6" src="https://fakeimg.pl/200x200">
        <div class="col-sm-6 media-body">
          <h5 class="mt-0 mb-1">List-based media object</h5>
          <p class="pb-3 border-bottom border-info">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
          vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
          lacinia congue felis in faucibus.</p>
        </div>
      </li>
      <li class="col-lg-6 flex-sm-row align-items-center flex-column media mb-4">
        <img class="pb-3 col-sm-6" src="https://fakeimg.pl/200x200">
        <div class="col-sm-6 media-body">
          <h5 class="mt-0 mb-1">List-based media object</h5>
          <p class="pb-3 border-bottom border-info">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
          vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
          lacinia congue felis in faucibus.</p>
        </div>
      </li>
      <li class="col-lg-6 flex-sm-row align-items-center flex-column media mb-4">
        <img class="pb-3 col-sm-6" src="https://fakeimg.pl/200x200">
        <div class="col-sm-6 media-body">
          <h5 class="mt-0 mb-1">List-based media object</h5>
          <p class="pb-3 border-bottom border-info">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
          vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
          lacinia congue felis in faucibus.</p>
        </div>
      </li>
      <li class="col-lg-6 flex-sm-row align-items-center flex-column media mb-4">
        <img class="pb-3 col-sm-6" src="https://fakeimg.pl/200x200">
        <div class="col-sm-6 media-body">
          <h5 class="mt-0 mb-1">List-based media object</h5>
          <p class="pb-3 border-bottom border-info">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
          vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
          lacinia congue felis in faucibus.</p>
        </div>
      </li>
    </ul>
  </article>
</section>
```
```css custom.css
@media (min-width: 992px) {
  #lokifacility li.col-lg-6:nth-of-type(even) img {
    order: 1;
  }
}
#lokifacility {
  background:
    url("https://picsum.photos/1080/1080/?random=1"),
    radial-gradient(circle, #777 30%, #ccc 70%),
    linear-gradient(to right, #999, #444);
  background-blend-mode: multiply, screen;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  text-shadow: #333 0.3rem 0.3rem 0.5rem;
  /* https://codepen.io/danwilson/pen/dqZvmx */
}
```
---
## Section 餐飲美食
會用到 Collapse 元件的手風琴效果，並整合 tab 切換圖片的效果（這裡的 tab 取自 list-group 的 JS 行為），最後同樣加上考量 RWD 的不同顯示方式。

### 整理代碼
1. 利用前面的標題風格繼續套過以下結構，並賦予 section#id。
```html
<section id="lokifood" class="py-5 container">
  <header class="text-center">
    <h2 class="text-info pb-3">餐飲美食</h2>
  </header>
  <article class="py-5">
    ...
  </article>
</section>
```

2. article 內會持有圖片區、手風琴之標題與內容，這裡採用 Collapse 元件之手風琴效果，並試著調整為
{% note default %}
以 Accordion 範例作為修改參考：
https://getbootstrap.com/docs/4.4/components/collapse/#accordion-example
{% endnote %}
修改前：
```html
<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">...</div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">...</div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">...</div>
    </div>
  </div>
</div>
```
   - 移除冗長內容與 `[aria-*]` 屬性，以及 `.card-header` 上的 `#id`
   - 調整 `div.header>h2>button` 結構為 `a.header`，並保留 `[data-*]` 屬性的作用
   - 將 `#accordionExample` 更名為 `#foodmenu`
  
  修改後：
```html
<article class="py-5">

  <!--Accordin-->
  <div class="accordion" id="foodmenu">
    <div class="card">
      <a class="card-header" data-toggle="collapse" href="#foodmsg1">Collapsible Group Item #1</a>
      <div id="foodmsg1" class="collapse show" data-parent="#foodmenu">
        <div class="card-body">Food A</div>
      </div>
    </div>
    <div class="card">
      <a class="card-header collapsed" data-toggle="collapse" href="#foodmsg2">Collapsible Group Item #2</a>
      <div id="foodmsg2" class="collapse" data-parent="#foodmenu">
        <div class="card-body">Food B</div>
      </div>
    </div>
    <div class="card">
      <a class="card-header collapsed" data-toggle="collapse" href="#foodmsg3">Collapsible Group Item #3</a>
      <div id="foodmsg3" class="collapse" data-parent="#foodmenu">
        <div class="card-body">Food C</div>
      </div>
    </div>
  </div>

</article>
```

3. 將 `tab-content>tab-pane` 部分抽取出來，可以看出 `tab-pane` 的觸發條件為 `.list-group>*[data-toggle="list"][href="#id"]`
{% note default %}
從 list-group 元件中的 JS 行為範例中做為修改參考：
https://getbootstrap.com/docs/4.4/components/list-group/#javascript-behavior
{% endnote %}
修改前：
```html
<div class="row">
  <div class="col-4">
    <div class="list-group" id="list-tab" role="tablist">
      <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
      <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
      <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
      <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
    </div>
  </div>
  <div class="col-8">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
      <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
      <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
      <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
    </div>
  </div>
</div>
```
  - 將 `div.tab-pane` 替換為 `img`，共 3 組，`role`、`aria-*` 可捨去，ID 適當替換。
  - `div.tab-content` 的 `#id` 可省略。
  - 將 `.list-group>*[data-toggle="list"][href="#id"]` 與 手風琴的 `.accordion>.card` 進行整合

  修改後：
```html
    <article class="py-5">
      <!-- tab content-->
      <div class="tab-content">
        <img id="foodimg1" class="tab-pane fade show active" src="https://picsum.photos/600/400/?random=1">
        <img id="foodimg2" class="tab-pane fade" src="https://picsum.photos/600/400/?random=2">
        <img id="foodimg3" class="tab-pane fade" src="https://picsum.photos/600/400/?random=3">
      </div>

      <!--Accordin-->
      <div class="accordion list-group" id="foodmenu">
        <div class="card" data-toggle="list" data-target="#foodimg1">
          <a class="card-header" data-toggle="collapse" href="#foodmsg1">Collapsible Group Item #1</a>
          <div id="foodmsg1" class="collapse show" data-parent="#foodmenu">
            <div class="card-body">Food A</div>
          </div>
        </div>
        <div class="card" data-toggle="list" data-target="#foodimg2">
          <a class="card-header collapsed" data-toggle="collapse" href="#foodmsg2">Collapsible Group Item #2</a>
          <div id="foodmsg2" class="collapse" data-parent="#foodmenu">
            <div class="card-body">Food B</div>
          </div>
        </div>
        <div class="card" data-toggle="list" data-target="#foodimg3">
          <a class="card-header collapsed" data-toggle="collapse" href="#foodmsg3">Collapsible Group Item #3</a>
          <div id="foodmsg3" class="collapse" data-parent="#foodmenu">
            <div class="card-body">Food C</div>
          </div>
        </div>
      </div>

    </article>
```

### 優化調整
- 將 article 變成 row>col 做響應式整合為 `.col-12.col-lg-6`
- 對 img 做自適應與相框化為 `.img-fluid.img-thumbnail`，考慮填滿度可追加 `w-100`
- 對 a.card-header 做配色 `.alert-info` 與消除底線 `.text-decoration-none`
- 優化文字內容，如輔助字可用 `<small class="text-muted float-right"></small>`
- 修正 `.list-group` 影響的 pl-0，增添 `px-3`
- 增加間格，對 img 之容器 增添 `mb-3`

```html index.html
<section id="lokifood" class="py-5 container">
  <header class="text-center">
    <h2 class="text-info pb-3">餐飲美食</h2>
  </header>
  <article class="py-5 row">
    <!-- tab content-->
    <div class="col-12 col-lg-6 tab-content mb-3">
      <img id="foodimg1" class="w-100 img-fluid img-thumbnail tab-pane fade show active"
        src="https://picsum.photos/600/400/?random=1">
      <img id="foodimg2" class="w-100 img-fluid img-thumbnail tab-pane fade"
        src="https://picsum.photos/600/400/?random=2">
      <img id="foodimg3" class="w-100 img-fluid img-thumbnail tab-pane fade"
        src="https://picsum.photos/600/400/?random=3">
    </div>

    <!--Accordin-->
    <div class="col-12 col-lg-6 accordion list-group px-3" id="foodmenu">
      <div class="card" data-toggle="list" data-target="#foodimg1">
        <a class="text-decoration-none alert-info card-header" data-toggle="collapse" href="#foodmsg1">
          中歐頂級豪華早餐 （自助式）
          <small class="text-muted float-right">in 2F 食堂</small>
        </a>
        <div id="foodmsg1" class="collapse show" data-parent="#foodmenu">
          <div class="card-body">
            <p>
              致春園餐廳眺望溫泉公園景觀，嚴選谷關當地食材精心烹調充滿谷關風味的特色小吃，菜色美味有口皆碑，在這裡除了品嘗美食外更可飽覽溫泉公園山光水色，味覺與視覺的雙重享受。<br>
              適合工商宴席、婚禮宴客、家庭聚餐、大宴小酌、台菜、客家菜、風味套餐色、香、味美。寬敞的宴會大廳飯店備有多種餐飲選擇，是用餐之好所在！，多種餐飲選擇滿足您挑剔的味蕾並歡迎親臨品嚐！!
            </p>
            <p class="float-right text-danger">
              定價： 大人 NT500 / 小孩 NT300<br>
              營業時間：AM 06:00 ~ AM 11:00
            </p>
          </div>
        </div>
      </div>
      <div class="card" data-toggle="list" data-target="#foodimg2">
        <a class="text-decoration-none alert-info card-header collapsed" data-toggle="collapse" href="#foodmsg2">
          咖啡複合式鋼琴酒吧
          <small class="text-muted float-right">in 1F 中庭</small>
        </a>
        <div id="foodmsg2" class="collapse" data-parent="#foodmenu">
          <div class="card-body">
            <p>
              大飯店一樓的挑高中庭，瀰漫優雅的南洋休閒風，庭內雨林造景，融合水聲與天籟柔美樂音，供應各式花茶、咖啡、健康蔬果汁、英式下午茶及宵夜，揉合自然音樂，是您輕鬆暢敘的最佳地點。<br>
              （假日二人樂團鋼琴、長笛、薩克斯風演奏）
            </p>
            <p class="float-right text-danger">
              基本消費：NT150 + 10% / 位<br>
              營業時間：PM 07:00 ~ AM 01:00
            </p>
          </div>
        </div>
      </div>
      <div class="card" data-toggle="list" data-target="#foodimg3">
        <a class="text-decoration-none alert-info card-header collapsed" data-toggle="collapse" href="#foodmsg3">
          桶仔爐烤春雞 露營客最愛
          <small class="text-muted float-right">代訂預約</small>
        </a>
        <div id="foodmsg3" class="collapse" data-parent="#foodmenu">
          <div class="card-body">
            <p>
              精選體型小、骨骼細的 40 天春雞，將其均勻裹上一層厚厚的楓糖芥末後，再送進烤爐燒烤。<br>
              爐烤春雞因恰到好處的溫度而能保有鮮嫩口感與湯汁；取出整隻雞後，你可用手輕易撥開骨架幼嫩的春雞，一口咬下細膩的肉質，感受混合著楓糖芥末醬汁的酥脆表皮，享受這多層次卻不膩口的美味，亦是本季每日午時限量的私房美饌。
            </p>
            <p class="float-right text-danger">
              露營客代訂服務 $800/隻<br>
              （以利備食材，請於一週前預約）
            </p>
          </div>
        </div>
      </div>
    </div>

  </article>
</section>
```
---
## Section 交通資訊
這裡沒有按鈕功能，只需要整合 Google Map 跟固定的 Card 元件即可。

### 整理代碼
1. 利用前面的標題風格繼續套過以下結構，並賦予 section#id。
2. 這裡會將 iframe 當作背景，所以 `header` 放入 `article`，做成窄版 `container` 並設為 `absolute`，再加入 `row>col`。
```html
<section id="lokitrans" class="py-5">
  <iframe src="..."></iframe>
  <article class="container py-5">
    <header class="container text-center">
      <h2 class="text-info pb-3">服務設施</h2>
    </header>
    <div>...</div>
  </article>
</section>
```
3. 從 GoogleMap 取得固定的地點
{% note default %}
從 GoogleMap 搜尋<mark>勞動部勞動力發展署北基宜花金馬分署泰山職業訓練場</mark>並透過分享取得 iframe：
https://www.google.com/maps/place/%E5%8B%9E%E5%8B%95%E9%83%A8%E5%8B%9E%E5%8B%95%E5%8A%9B%E7%99%BC%E5%B1%95%E7%BD%B2%E5%8C%97%E5%9F%BA%E5%AE%9C%E8%8A%B1%E9%87%91%E9%A6%AC%E5%88%86%E7%BD%B2%E6%B3%B0%E5%B1%B1%E8%81%B7%E6%A5%AD%E8%A8%93%E7%B7%B4%E5%A0%B4/@25.0439858,121.4171543,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a7bec9ad74b1:0xa639904a89f26435!8m2!3d25.043981!4d121.419343?hl=zh-TW

從 embed 通用操作取得能自適應版面空間的 iframe 結構，並加以整合移除 Google 預設之 iframe 屬性
https://getbootstrap.com/docs/4.4/utilities/embed/#example
{% endnote %}
未修改：
```html
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="..." allowfullscreen></iframe>
</div>
```
修改後：
```html
<section id="lokitrans" class="embed-responsive py-5">
  <iframe class="embed-responsive-item" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7078780838638!2d121.41715431544698!3d25.04398584404413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7bec9ad74b1%3A0xa639904a89f26435!2z5Yue5YuV6YOo5Yue5YuV5Yqb55m85bGV572y5YyX5Z-65a6c6Iqx6YeR6aas5YiG572y5rOw5bGx6IG35qWt6KiT57e05aC0!5e0!3m2!1szh-TW!2stw!4v1586453399205!5m2!1szh-TW!2stw" allowfullscreen></iframe>
  <article class="container py-5">...</article>
</section>
```
4. 對背景地圖加上自訂 CSS，把地圖調暗。
```css custom.css
#lokitrans iframe{
  filter: grayscale(0.75) brightness(0.5);
}
```
>此時看不到 article 沒關係，之後添加 row(flex) 就不需要處理 z-index 了。
5. 對 header 標題與 div 內文整合 row>col 為 .col-12.col-lg-6
6. 適時調色與調整移除 padding
7. 加入 card 效果添加指定內文
```html
<article class="container">
  <div class="row">
    <header class="col-12 col-lg-6 text-center mb-3">
      <h2 class="card text-info">服務設施</h2>
    </header>
    <div class="col-12"></div>
    <div class="col-12 col-lg-6">
      <div class="card">
        <div class="card-body">
          <strong>公車、捷運</strong>
          <ul class="pl-4">
            <li>公車：三重客運 (637、638)、指南客運 (797、798、801、858、880、883、1501、1503)，至明志科技大學站下車。</li>
            <li>新北市泰山區免費公車（泰山區 F216 明志國小-台北車站（北三門搭車）)：至貴子路下車後，步行至貴子路口左轉明志路 3 段，明志路直行約 100 公尺至工專路右轉，再直行即可至明志科技大學。</li>
            <li>捷運：臺北捷運中和新蘆線至丹鳳站 1 號出口或桃園捷運機場線至泰山貴和站（明志科大）1 號出口，再轉乘公車或騎乘 YouBike 微笑單車（約 10~15 分鐘）至明志科技大學。</li>
          </ul>
          <strong>自行開車</strong>
          <ul class="pl-4">
            <li>高速公路五股交流道下（往新莊、泰山），經新五路至新北大道右轉，直行至貴子路口右轉，貴子路直行至明志路左轉。於明志路繼續前行約 100 公尺右轉工專路，即可抵達明科技大學。</li>
            <li>由台北車站走忠孝橋，直行高架道路，下到平面道路之後直行至貴子路口右轉，貴子路直行至明志路左轉，於明志路繼續前行約 100 公尺右轉工專路，即可抵達明科技大學。</li>
            <li>明志科大「汽車」停車費 30 元/小時，請儘量搭乘大眾交通工具或機車（免停車費）。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</article>
```
---
## Section 聯絡我們
使用到 Forms, Input Group, Grid 來設計 RWD 型態的聯絡表單。

### 整理代碼
1. 利用前面的標題風格繼續套過以下結構，並賦予 section#id。
```html
<section id="lokifood" class="py-5 container">
  <header class="text-center">
    <h2 class="text-info pb-3">餐飲美食</h2>
  </header>
  <article class="py-5">
    ...
  </article>
</section>
```

1. section 將持有背景色，所以改對 header 跟 article 為 container 窄版
2. form 作為 row>col，而排版方式為 .col-12.col-md-6 並預先放入 .form-group
```html
<section id="lokicontact" class="py-5 bg-dark text-light">
  <header class="container text-center">
    <h2 class="text-info pb-3">聯絡我們</h2>
  </header>
  <article class="container py-5">
    <form class="row" method="post">
      <div class="form-group col-12 col-md-6">...</div>
    </form>
  </article>
</section>
```
3. 放入持有 label 的訪客姓名輸入欄位，並整合一組 radio 欄位 sex 為 input-group 結構
```html
<div class="form-group col-12 col-md-6">
  <label for="cid_name">訪客姓名</label>
  <div class="input-group">
    <input class="form-control" type="text" name="form_name" id="cid_name" placeholder="Full Name" required>
    <div class="input-group-append">
      <div class="input-group-text">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="form_sex" id="cid_man" value="man">
          <label class="form-check-label" for="cid_man">男性</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="form_sex" id="cid_woman" value="woman">
          <label class="form-check-label" for="cid_woman">女性</label>
        </div>
      </div>
    </div>
  </div>
</div>
```
4. 同上方向，規劃電話欄位
```html
<div class="form-group col-12 col-md-6">
  <label for="cid_tel">連絡電話</label>
  <div class="input-group">
    <input class="form-control" type="tel" name="form_tel" id="cid_tel" placeholder="Phone Number" required>
  </div>
</div>
```

5. 同上方向，規劃電子信箱
```html
<div class="form-group col-12 col-md-6">
  <label for="cid_mail">電子信箱</label>
  <div class="input-group">
    <input class="form-control" type="tel" name="form_mail" id="cid_mail" placeholder="Email Address" required>
  </div>
</div>
```

6. 同上方向，規劃問題類型但這裡使用 select 下拉選單
```html
<div class="form-group col-12 col-md-6">
  <label for="cid_mail">問題類型</label>
  <select class="custom-select" name="form_question">
    <option value="住宿相關">住宿相關</option>
    <option value="婚宴訂桌">婚宴訂桌</option>
    <option value="其他">其他</option>
  </select>
</div>
```

7. 同上 textarea 但為 col-12
```html
<div class="form-group col-12">
  <label for="cid_msg">需求說明</label>
  <textarea class="form-control" id="cid_msg" rows="3" placeholder="Writer Your Message..."></textarea>
</div>
```

8. 提交按鈕與警示語
```html
<div class="form-group col-12 text-center">
  <small class="text-muted">請如實填寫便於信件回覆，我們保證不隨意公開您的留言資訊</small>
  <hr class="border-secondary">
  <button class="btn btn-primary" type="submit">確認送出</button>
</div>
```

### 補充 Footer 內容
由於版面空間不足，為了之後選單的錨點跳轉，另外增加一些廣告連結。直接在 `#lokicontact` 內的最後面加入 `article`；若使用 flex，須注意小螢幕上的換行問題。

```html
<article class="bg-secondary py-5 text-center">
  <!-- footerInfo -->
  <div class="d-flex justify-content-center align-items-center flex-wrap">
    <a class="text-light border p-3 m-3" href="https://www.facebook.com/tsvts/" target="_blank">
      <i class="fab fa-facebook fa-3x"></i><br>泰山職業訓練場
    </a>
    <a href="https://tkyhkm.wda.gov.tw/Default.aspx" target="_blank">
      <img src="https://ws.wda.gov.tw/001/Upload/308/sites/pagebackimage/366d4144-bdac-4a20-a1f2-b0846004efc0.png" alt="勞動部勞動力發展署北基宜花金馬分署全球資訊網">
    </a>
    <a href="https://www.taiwanjobs.gov.tw/home/new_index.aspx" target="_blank">
      <img src="https://icmp-ws.chiayi.gov.tw/001/Upload/408/relpic/9352/408618/8e7e31cb-201c-4b6f-802f-920fb8f06e28@710x470.png" alt="台灣就業通">
    </a>
  </div>
  <div>
    <a class="text-light" href="tel:02-2901-8274">電話：02-2901-8274</a>　｜　
    <span class="text-light">傳真：02-2908-4773</span>　｜　
    <a class="text-light" href="mainto:service@toyugi.com.tw">信箱：service@toyugi.com.tw</a>
    <address>
      <a class="text-light" href="https://goo.gl/maps/NDzTUToVSbMQYLwv6" target="_blank">243 新北市泰山區貴子里致遠新村 55 之 1 號</a>
    </address>
  </div>
</article>
```

---
## Header 選單
{% note default %}
以 Navbar 響應式行為的範例二作為起點。
https://getbootstrap.com/docs/4.4/components/navbar/#responsive-behaviors
{% endnote %}

```html 未修改
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
```

### 整理代碼
1. 語意優化，用 header 包起來放在 `section#lokislider` 之前，替換 ID 為 lokinav
2. 移除所有的 `[aria-*]`，以及 Disabled 與 form 的選單項目
3. 將網站名稱與選單文字做修改增添共五組，並設定所有的錨點連結
4. 調整為 `navbar-expand-md` 試試 RWD 是否正常運作

```html index.html
<header>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand" href="#">泰山渡假飯店</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="#lokiroom">房型介紹</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lokifacility">服務設施</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lokifood">餐飲美食</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lokitrans">交通資訊</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lokicontact">聯絡我們</a>
        </li>
      </ul>
    </div>
  </nav>
</header>
```

### 優化調整
1. 設計窄版為 `nav.container` ，並取消 `nav.bg-light` 改為 `header.bg-dark` 與 `nav.navbar-dark`
2. 調整選單靠右將 `ul.mr-auto` 改為 `ul.ml-auto`
3. 將 header 固定於上方：`header.fixed-top`
4. 在選單項目前加上圖示（font icon）美化
5. 柔化滑鼠移過的變色感

```html
<header class="fixed-top bg-dark">
  <nav class="navbar navbar-expand-md navbar-dark container">
    <a class="navbar-brand" href="#lokislider">泰山渡假飯店</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#lokinav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="lokinav">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="#lokiroom"><i class="fas fa-fw fa-bed mr-2"></i>房型介紹</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lokifacility"><i class="fas fa-fw fa-gamepad mr-2"></i>服務設施</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lokifood"><i class="fas fa-fw fa-utensils mr-2"></i>餐飲美食</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lokitrans"><i class="fas fa-fw fa-map-marker-alt mr-2"></i>交通資訊</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lokicontact"><i class="fas fa-fw fa-envelope mr-2"></i>聯絡我們</a>
        </li>
      </ul>
    </div>
  </nav>
</header>
```
```css
/* navbar */
header, .nav-link{
  transition: 1000ms ease;
}
```

# 動態 JS 優化
這裡開始接觸 JS，另外獨立寫在 `custom.js`，並記得在 `index.html` 下方引入：
```html
<script src="plugins/custom.js"></script>
```

## Scroll To Id
1. 賦予返回頁首的按鈕 `#scrolltop` 方便操作
2. 賦予 `header#lokimenu` 方便操作
```html index.html
<header id="lokimenu" class="fixed-top bg-dark">...</header>
  ...
<div id="scrolltop" class="position-fixed">
  <a class="btn btn-info text-light" href="#lokislider"><i class="fas fa-angle-double-up fa-2x"></i></a>
</div>
```

3. 開發 JS 做法為：每次點擊選單時，根據 href 對象當作 JQ 選擇對象之 offset 位置，並試圖移動到該 offset 處
```js custom.js
// scroll to id
$("#lokimenu a, #scrolltop a").click(function () {
  let who = $(this).attr("href");
  let val = $(who).offset().top - $("#lokimenu").innerHeight() + 1;
  $("html").animate(
    { scrollTop: val }, 1000, "swing"
  );
});
```

## Scroll Spy
由於 BS 的 scrollspy 設計太單純，本專案的選單與 tabs 會一起被偵測（無法排除，因為都是由 `data-target` 觸發 JS），造成視覺上的偏差，所以改為自己寫。

1. 先設計 `header a.active` 的效果，使用偽元素搭配 transition
```css custom.css
header a:after{
  content: "";
  display: block;
  height: 2px;
  width: 0%;
  background: #fff;
  margin: 5px 0;
  transition: 1000ms ease;
}
header a.active:after{
  width: 100%;
}
```
2. 開發 JS 做法為：每次滾動時觸發 spy 函式，檢查所有 section 的 scroll 值是否與目前 scroll 相同，成立就替換選單的 a.active
3. 最後記得網頁載入時需先跑一遍 spy 函式，避免載入時沒有 a.active
```js custom.js
$(window).scroll(() => {
  spy(); // scroll spy
});
spy(); // scroll spy

function spy() {
  let nowat = $(window).scrollTop();
  $('section').each(function () {
    let
      id = $(this).attr('id'),
      offset = $(this).offset().top - $("#lokimenu").innerHeight(),
      height = $(this).innerHeight();

    if (offset <= nowat && nowat < offset + height) {
      $("#lokimenu a").removeClass('active');
      $(`#lokimenu a[href='#${id}']`).addClass('active');
    };
  });
}
```

## menu bg and scrolltop display
1. 為了美觀 MENU 預設沒有底色（非手機模式），當離開 slider 才顯示 bg-dark。
2. 首頁載入時沒有 scrolltop，當離開 slider 才顯示 scrolltop。
3. 先設計過渡處理
```css custom.css
#scrolltop{
  opacity: 0;
  transition: 500ms ease;
}
#scrolltop.shown{
  opacity: 1;
}
header{
  transition: 1000ms ease;
}
```
4. 開發 JS 做法為：
  - 設計 bhmenu 函式，檢查目前的 scroll 值(判斷slider與menu高度比較)做不同的變色，變色還需考量螢幕寬度。
  - 每次滾動時觸發此函式。
  - 每次寬度時觸發此函式。
5. 最後記得網頁初次載入時需先跑一遍此函式，避免載入時沒有初始效果。
```js custom.js
$(window).scroll(() => {
  spy(); // scroll spy
  bgmenu(); //check menu bg
});
$(window).resize(() => {
  bgmenu(); //check menu bg
});

spy();
bgmenu();

function spy() {
  ...
}
function bgmenu() {
  /* 控制 Header's Navbar 的 bg-dark 因 scroll 而變動。*/
  let
    totalw = $(window).innerWidth(),
    nowat = $(window).scrollTop(),
    offset = $("#lokimenu").innerHeight() + 1,
    height = $("#lokislider").innerHeight();
  if (nowat <= height - offset) { //slider 內
    if (totalw >= 769) $("#lokimenu").removeClass("bg-dark");
    else $("#lokimenu").addClass("bg-dark");
    $("#scrolltop").removeClass("shown");
  }
  else { //已脫離
    if (totalw >= 769) $("#lokimenu").addClass("bg-dark");
    $("#scrolltop").addClass("shown");
  }
}
```

6. 最後，HTML 中可以先拿掉 `bg-dark`，避免載入時閃一下。