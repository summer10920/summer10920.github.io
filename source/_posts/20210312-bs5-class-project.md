---
title: "[練習課程] Bootstrap5 實作：一頁式網站"
categories:
  - 職訓教材
  - Bootstrap
tag:
  - PHP 資料庫網頁設計（職前班）
date: 2021-03-12 20:10:05
---

本篇將整合過去基本課程 HTML, CSS, Bootstrap, JS 相關知識進行經驗整合，動手設計簡單一頁式且具備 RWD 之網站設計。由於考量部分學員尚未接觸 JS 課程進度與基礎認知，將集中最後小節於完成後補充。

<!-- more -->

{% note default %}
本練習完成品之預覽位置：
https://summer10920.github.io/skillStudies_CSSBS_WebDemo/Bootstrap50_Hotel
{% endnote %}
---

# 環境準備

1. 準備前往下載並加以使用，確保以下外掛檔案列入你的專案內：
   - [Bootstrap5](https://getbootstrap.com/docs/5.0/getting-started/download/)
2. 關於文字，icon，網站 ico 的資源使用：
   - [Fontawesome](https://fontawesome.com/) 作為我們圖示庫
   - [思源黑體 Noto Sans TC](https://fonts.google.com/specimen/Noto+Sans+TC) 使用 Google Fonts 做為我們的中文字型。
   - [FontIcon](https://gauger.io/fonticon/) 做為我們簡單的網站 ico 使用。
3. 設定好網站名稱與上列所有設定，最後打一些字測試是否成功。
4. 使用 html5 的語意標籤，參考 (https://www.w3schools.com/html/html5_semantic_elements.asp) 之說明。
5. 在設計響應式網站過程中，你應該先從小螢幕開始著手外觀調整設計，其次在大螢幕上做局部調整。
6. 為了練習簡化，會對使用的所有 Bootstrap 元件，全都會移除 aria-* 系列屬性或是 sr-only 之類的障讀設計。

**files**
```
plugins/
├─ bootstrap.min.css  // 包含 BS 各種 Class 樣式表，這裡已不需要反向學習，為了檔案大小我們採用 min 壓縮版本。
├─ bootstrap.min.css.map  // 為前者的印象檔，非必要。
├─ custom.css  //你應該把自訂的 CSS 寫在這裡而不是去調整 BS 的 CSS
│
├─ bootstrap.bundle.min.js  //主要包含 bootstrap.js + Popper.js，我們不會去研究理解 JS 結構所以使用壓縮板即可。
├─ bootstrap.bundle.min.js.map  //為前者的印象檔，非必要。
media/
├─ favicon.ico
```

```css custom.css
body {
  font-family: 'Noto Sans TC', 'Open Sans', Helvetica, Arial;
  background: #eee; /* 白底不要傷眼 */
}
```

```html index.html
<!DOCTYPE html>
<html lang="zh-tw">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>泰山渡假飯店‧舞 - 為了夢想而努力</title>
  <link rel="shortcut icon" href="media/favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
    integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
  <link rel="stylesheet" href="plugins/bootstrap.min.css">
  <link rel="stylesheet" href="plugins/custom.css">
  <script src="plugins/bootstrap.bundle.min.js"></script>
</head>

<body>
  <h1>測試 icon <i class="fas fa-tree"></i></h1>
  <h1>測試 Modal</h1>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</body>

</html>
```

# 區域設計
接下來以一頁式飯店網站為概念進行設計，主題分別為首頁（輪播廣告）、頁尾版權、房型介紹、服務設施、餐飲美食、交通資訊、聯絡我們。先整理代碼再做優化，最後一小節回頭處理 JS 動態。

## Section 輪播廣告
先做網站入口的第一強烈視覺同等首頁，滿版且佔滿畫面的廣告圖片輪播，其次再設計第二主題關於房型介紹。
{% note default %}
套用 BS 的 carousel 文件示範，選擇持有導覽鍵，導覽列，字幕的範例開始修改。
https://getbootstrap.com/docs/5.0/components/carousel/#with-captions
{% endnote %}

```html 未修改
<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
```
### 整理代碼
1. 語意優化，將 `div.carousel` 容器更改為 `section#lokiSlider.carousel`，同時舊 ID 名稱一併修改。
2. 同上位置，添加 `.carousel-fade` 改為淡化轉場方式。
3. 調整有效圖片 `img:src` 共四組輪播與相關元素，移除 `[alt=*]` （簡化）。
4. 為了教學代碼減量，移除 `[alt]`, `[arai-*]`, `span.visually-hidden`。

```html index.html
<section id="lokiSlider" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="2"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://picsum.photos/1920/1080/?random=1" class="d-block w-100">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/1920/1080/?random=2" class="d-block w-100">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/1920/1080/?random=3" class="d-block w-100">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/1920/1080/?random=4" class="d-block w-100">
      <div class="carousel-caption d-none d-md-block">
        <h5>Fourth slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#lokiSlider" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#lokiSlider" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</section>
```
> 此時應該可以正常發揮，img 會自適應 w-100（所以圖片比例你要抓好）。
### 優化調整
考慮手機模式的適應與一些外觀效果，進行以下行為：（如果自動播放礙眼，可先把 `data-bs-ride="carousel"` 暫時弄壞）

1. 手機模式：為了讓畫面滿框，以及圖片對其中間做裁切而不是等比例縮放。
   - 添加 `img.h-100` 其圖片能保證全顯示（變形稍後處理）
   - 於 `div.carousel-item` 增添 `.vh-100` ，這樣圖片都能全顯示且超過裁切。（與之前練習時教法不同）
   - 增加自訂 css 對 `#lokiSlider` 容器內的圖片都設定為 `object-fit:cover` ，使圖片能自適應比例填滿最大且不變形。
2. 處理文字效果
   - 希望 `carousel-caption` 的字都留著除了 p 元素，將 `d-none.d-md-block` 轉移到 p 元素，且 h5 元素 改 h1 讓標題加大
   - 將 `carousel-caption` 空間填滿，使用 absolute 特性增添 `.top-0.bottom-0`
   - 將 `carousel-caption` 規劃成 flex 模式添加 `d-flex flex-column justify-content-center` 使得內容能居中。
   - 將 `carousel-caption` 添加文字陰影 `text-shadow: #333 0.3rem 0.3rem 0.5rem;`
3. 處理預設外觀
   - carousel 的箭頭換成明顯的 Fontawesome 加大尺寸，替換 `<span class="carousel-control-{prev|next}-icon"></span>` 為  `<i class="fas fa-angle-double-{left|right} fa-2x"></i>`
   - 導覽鍵的圖案我們用 CSS 調整改一下圓型效果。
   - 使用濾鏡 `filter: grayscale(50%);` 將圖片白平衡拉低使文字對比強烈一點。

```css custom.css
/**********lokiSlider***********/
#lokiSlider img {
  object-fit: cover;
  filter: grayscale(50%);
}

#lokiSlider .carousel-caption {
  text-shadow: #333 0.3rem 0.3rem 0.5rem;
}

#lokiSlider .carousel-indicators > button {
  border-radius: 50%;
  height: 15px;
  width: 15px;
  border: 10px solid transparent;
}
```
```html index.html
<section id="lokiSlider" class="carousel slide carousel-fade" data-bss-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="2"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item vh-100 active">
      <img src="https://picsum.photos/1920/1080/?random=1" class="b-block w-100 h-100">
      <div class="carousel-caption top-0 bottom-0 d-flex flex-column justify-content-center">
        <h1>First slide label</h1>
        <p class="d-none d-md-block">Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item vh-100">
      <img src="https://picsum.photos/1920/1080/?random=2" class="b-block w-100 h-100">
      <div class="carousel-caption top-0 bottom-0 d-flex flex-column justify-content-center">
        <h1>Second slide label</h1>
        <p class="d-none d-md-block">Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item vh-100">
      <img src="https://picsum.photos/1920/1080/?random=3" class="b-block w-100 h-100">
      <div class="carousel-caption top-0 bottom-0 d-flex flex-column justify-content-center">
        <h1>Third slide label</h1>
        <p class="d-none d-md-block">Some representative placeholder content for the third slide.</p>
      </div>
    </div>
    <div class="carousel-item vh-100">
      <img src="https://picsum.photos/1920/1080/?random=4" class="b-block w-100 h-100">
      <div class="carousel-caption top-0 bottom-0 d-flex flex-column justify-content-center">
        <h1>Fourth slide label</h1>
        <p class="d-none d-md-block">Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#lokiSlider" data-bs-slide="prev">
    <i class="fas fa-angle-double-left fa-2x"></i>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#lokiSlider" data-bs-slide="next">
    <i class="fas fa-angle-double-right fa-2x"></i>
  </button>
</section>
```

## Footer 頁尾版權
這裡先做頁尾版權，相對是比較簡單的不需使用 Bootstrap 元件。

1. 提供黑底白字的置中文字即可，添加適當的版權描述。
2. 規劃錨點連結回到頁首並挑選適合的 fonticon，可以是 `#` 或 `#lokiSlider`。這裡用 position-fixed 來定位。
3. 因為層級需保留最上層，添加 z-index 較高屬性。
4. 調整動畫讓錨點連結感覺活潑些。

```html index.html
<footer class="bg-dark text-muted py-3 text-center">
  <small>
    泰山職業訓練中心課程教材編譯 <br>copyright &copy; <span class="text-warning">洛奇數位設計</span>. all rights reserved
  </small>
  <div id="lokiArrow" class="position-fixed">
    <a class="btn btn-warning text-light" href="#lokiSlider"><i class="fas fa-angle-double-up fa-2x"></i></a>
  </div>
</footer>
```
```css custom.css
/************lokiFooter**********/
footer>.position-fixed {
  right: 5vh;
  bottom: 5vh;
  z-index: 999;
}

footer>.position-fixed>a {
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

## Section 房型介紹
我們需要多個房型有不同的 tab 切換，這裡會用到 Bootstrap.js 提供的動態代碼能輕鬆完成。
{% note default %}
使用 Navs 導覽列的 JS 行為 範例二（代碼較少）作為初始化。
https://getbootstrap.com/docs/5.0/components/navs-tabs/#javascript-behavior
{% endnote %}
```html 未修改
<nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
</div>
```
### 整理代碼
1. 語意優化，用 `section#lokiRoom` 包起來放在 `section#lokiSlider` 之後。原有 nav 調整為 `header>h2+nav` 之層級。
2. 移除所有的 `[arai-*]`, `role=*`，很多地方的 `#id` 是可以移除用不到的，只需要 `button[data-bs-target]` 能對應到 `div#id.tab-pane`。
3. 將選單文字做修改增添共五組，分別為行政本館、雙幕川館、繪圖湯屋、價目表、訂房須知。
4. 調整語意 `div#nav-tabContent.tab-content` 為 `article.tab-content`。
5. `nav>div.nav` 可合併為 `nav.nav` 不影響。
5. `.tab-pane` 內容部分先簡單打幾個字試試是否正常運作。

```html index.html
<section id="lokiRoom">
  <header>
    <h2>房型介紹</h2>
    <nav class="nav nav-tabs">
      <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#roomA" type="button">行政本館</button>
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#roomB" type="button">雙幕川館</button>
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#roomC" type="button">繪圖湯屋</button>
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#roomPrice" type="button">價目表</button>
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#roomRule" type="button">訂房須知</button>
    </nav>
  </header>
  <article class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="roomA">A Lorem ipsum dolor sit amet.</div>
    <div class="tab-pane fade" id="roomB">B Lorem ipsum dolor sit amet.</div>
    <div class="tab-pane fade" id="roomC">C Lorem ipsum dolor sit amet.</div>
    <div class="tab-pane fade" id="roomPrice">P Lorem ipsum dolor sit amet.</div>
    <div class="tab-pane fade" id="roomRule">R Lorem ipsum dolor sit amet.</div>
  </article>
</section>
```

### 優化調整 by 選單
1. 主框設計窄版、距離 py 為 5，調整為 `section#lokiroom.container.py-5`。
2. 頁首區域對其內部為文中調整 `header.text-center`。
3. 標題顏色為 info、距離 pb 為 3，調整為 `h2.text-warning.pb-3`。
4. 為了讓選單間距分散使用 `nav.justify-content-around`，考量 RWD 不換行 `.flex-nowrap`。
5. 自訂 button 的 CSS 屬性為 `flex: 0 1 12%`，檢查 RWD 的效果如何，可以考慮添加 box 陰影。
6. 配色處理透過自訂 CSS 特別處理 `.active` 跟 `.nav-link` 的視覺顏色（因 `.alert-info` 搶不贏）
7. 先對內容區增加空間為 `article.py-5`，一起評估空間，之後再微調。

```css custom.css
**********lokiRoom************/
#lokiRoom nav>.nav-link {
  flex: 0 1 15%;
  box-shadow: 1px -1px 5px 0px #ccc;
  color: #664d03;
  background-color: #fff3cd;
  border: 0;
}

#lokiRoom nav>.nav-link.active {
  background-color: #ffc107;
  color: #fff3cd;
}

#lokiRoom nav.nav-tabs,
#lokiRoom nav>.nav-link {
  border-bottom: 1px solid #ffc107;
}
```
```html index.html
<section id="lokiRoom" class="container py-5">
  <header class="text-center">
    <h2 class="text-warning pb-3">房型介紹</h2>
    <nav class="nav nav-tabs flex-nowrap justify-content-around">
      <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#roomA" type="button">行政本館</button>
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#roomB" type="button">雙幕川館</button>
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#roomC" type="button">繪圖湯屋</button>
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#roomPrice" type="button">價目表</button>
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#roomRule" type="button">訂房須知</button>
    </nav>
  </header>
  <article class="tab-content py-5">
    <div class="tab-pane fade show active" id="roomA">A Lorem ipsum dolor sit amet.</div>
    <div class="tab-pane fade" id="roomB">B Lorem ipsum dolor sit amet.</div>
    <div class="tab-pane fade" id="roomC">C Lorem ipsum dolor sit amet.</div>
    <div class="tab-pane fade" id="roomPrice">P Lorem ipsum dolor sit amet.</div>
    <div class="tab-pane fade" id="roomRule">R Lorem ipsum dolor sit amet.</div>
  </article>
</section>
```

### 規劃內容 by #roomA
使用 card 元件來規劃多組房間資料，並善用 grid 系統做排版規劃。
{% note default %}
使用 card 的 image 作為初始化成為單筆資料容器。
https://getbootstrap.com/docs/5.0/components/card/#images
{% endnote %}

```html 未修改
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
```

1. 房間類型的部分包含 #roomA, #roomB, #roomC 這三種使用 card 來進行資料顯示，整合到 `.tab-pane` 內且夾帶 p 段落做說明，整體為 `.tab-pane>p+(.card)*3`。
2. 呈上，整合 grid 的 row>col 來設計，分別考慮三種不同的 col 適應。而這裡 row 的 d-flex 會失敗由於 `.tab-content>.active` 的 d-block 太強烈，所以增添 CSS 搶回為 d-flex。
3. 調整 col 間距 mb 為 4。
4. 調整文字效果與局部向右浮動。

```html index.html
<article class="tab-content py-5">
  <div class="row tab-pane fade show active" id="roomA">
    <!-- row>col content A-->
    <p class="col-12 mb-4 text-muted text-center">
      溫馨典雅的行政本館，給您簡約的度假享受。<br>
      使用大片落地窗，採光極佳，每房皆設有觀景陽台，讓您遠眺高山、與大自然一親芳澤。
    </p>
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card">
        <img src="https://fakeimg.pl/300x200/fff3cd" class="card-img-top">
        <div class="card-body">
          <h5>行政本館</h5>
          <p class="card-text">
            溫馨雙人房<small class="text-muted float-end">1 大床 | 6.5 坪</small>
          </p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card">
        <img src="https://fakeimg.pl/300x200/fff3cd" class="card-img-top">
        <div class="card-body">
          <h5>行政本館</h5>
          <p class="card-text">
            精緻雙人房<small class="text-muted float-end">2 小床 | 6.5 坪</small>
          </p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card">
        <img src="https://fakeimg.pl/300x200/fff3cd" class="card-img-top">
        <div class="card-body">
          <h5>行政本館</h5>
          <p class="card-text">
            親子四人房<small class="text-muted float-end">2 大床 | 8 坪</small>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="tab-pane fade" id="roomB">B Lorem ipsum dolor sit amet.</div>
  <div class="tab-pane fade" id="roomC">C Lorem ipsum dolor sit amet.</div>
  <div class="tab-pane fade" id="roomPrice">P Lorem ipsum dolor sit amet.</div>
  <div class="tab-pane fade" id="roomRule">R Lorem ipsum dolor sit amet.</div>
</article>
```
```css style.css
#lokiRoom > .tab-content > .row.active {
  display: flex;
}
```

### 規劃內容 by #roomB
與前一節相同，稍微修改文字作為 roomB 效果
```html index.html
<div class="row tab-pane fade" id="roomB">
  <!-- row>col content B-->
  <p class="col-12 mb-4 text-muted text-center">
    雙幕川館又稱小木屋，房外種植有柏樹，每房皆為獨棟式小屋設計。<br>
    打開房門就見到綠油油的寬廣草地，三五好友坐在房前的石桌上，聊天談心，呼吸一口大自然最新鮮的空氣，是最愜意的享受。
  </p>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/fff3cd" class="card-img-top">
      <div class="card-body">
        <h5>雙幕川館</h5>
        <p class="card-text">
          溫馨雙人房<small class="text-muted float-end">1 大床 | 6.5 坪</small>
        </p>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/fff3cd" class="card-img-top">
      <div class="card-body">
        <h5>雙幕川館</h5>
        <p class="card-text">
          精緻雙人房<small class="text-muted float-end">2 小床 | 6.5 坪</small>
        </p>
      </div>
    </div>
  </div>
</div>
```
### 規劃內容 by #roomC
與前一節相同，稍微修改文字作為 roomC 效果

```html index.html
<div class="row tab-pane fade" id="roomC">
  <!-- row>col content C-->
  <p class="col-12 mb-4 text-muted text-center">
    每房皆為獨棟式小屋設計，鋪設木質地板，浪漫典雅。<br>
    房內設有溫泉浴槽，私享您的奢華溫泉浴時光。
  </p>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/fff3cd" class="card-img-top">
      <div class="card-body">
        <h5>繪影湯屋</h5>
        <p class="card-text">
          溫馨雙人房<small class="text-muted float-end">1 大床 | 6.5 坪</small>
        </p>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/fff3cd" class="card-img-top">
      <div class="card-body">
        <h5>繪影湯屋</h5>
        <p class="card-text">
          精緻雙人房<small class="text-muted float-end">2 小床 | 6.5 坪</small>
        </p>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card">
      <img src="https://fakeimg.pl/300x200/fff3cd" class="card-img-top">
      <div class="card-body">
        <h5>繪影湯屋</h5>
        <p class="card-text">
          親子四人房<small class="text-muted float-end">2 大床 | 8 坪</small>
        </p>
      </div>
    </div>
  </div>
</div>
```
### 規劃內容 by #roomPrice
{% note default %}
使用 table 的 table-sm 作為初始化成為單筆資料容器。
https://getbootstrap.com/docs/5.0/content/tables/#small-tables
{% endnote %}

1. 價目表我們直接完整 100%寬度不需要 grid 應用
2. 使用到 h5 標題與 table 表格，並適當的配上主色。
3. 如果希望文字垂直對齊可以對該 th,td 元素設定 `.align-middle`，或者用自訂 CSS 較快。
4. 如果希望平均分配空間，用自訂 CSS 較快。

```html index.html
<div class="row tab-pane fade" id="roomPrice">
  <!-- table content Price -->
  <div class="mb-5">
    <h5 class="text-warning">[ 行政本館 ]</h5>
    <table class="table table-sm text-center">
      <thead>
        <tr class="alert-warning">
          <th class="border-warning">房型</th>
          <th class="border-warning">平日</th>
          <th class="border-warning">假日</th>
          <th class="border-warning">連續國定假日</th>
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
    <h5 class="text-warning">[ 雙幕川館 ]</h5>
    <table class="table table-sm text-center">
      <thead>
        <tr class="alert-warning">
          <th class="border-warning">房型</th>
          <th class="border-warning">平日</th>
          <th class="border-warning">假日</th>
          <th class="border-warning">連續國定假日</th>
        </tr>
      </thead>
      <tbody>
        <tr><th>湖畔仙屋</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
        <tr><th>芬多森屋</th><td>NT3000</td><td>NT3000</td><td>NT3000</td></tr>
      </tbody>
    </table>
  </div>
  <div class="mb-5">
    <h5 class="text-warning">[ 繪影湯屋 ]</h5>
    <table class="table table-sm text-center">
      <thead>
        <tr class="alert-warning">
          <th class="border-warning">房型</th>
          <th class="border-warning">平日</th>
          <th class="border-warning">假日</th>
          <th class="border-warning">連續國定假日</th>
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
#roomPrice th,
#roomPrice td {
  vertical-align: middle;
}
#roomPrice th {
  width: 25%;
}
```
### 規劃內容 by #roomRule
使用大量的標題內文，並適時添色、邊線、間距。

```html
<div class="tab-pane fade" id="roomRule">
  <!-- Text content Rule -->
  <h3 class="text-end border-bottom border-warning">入住須知</h3>
  <h5 class="text-warning">[ 飯店設備 ]</h5>
  <p class="mb-5">
    客房無線網路、有線第四台、自助洗衣機、免費烘乾機、免費停車場
  </p>
  <h5 class="text-warning">[ 入住須知 ]</h5>
  <p class="mb-5">
    進房時間（Check In ) 時間為 15:00 以後；退房時間（Check
    Out）時間為 11:00 以前。<br>
    住宿時請攜帶本人身分證正本、駕照以利核對。<br>
    一般住宿附贈早餐、SPA 券（依住宿房型開立），特殊專案依專案條件辦理。<br>
    超過退房時間一個小時將以一個小時 200 元計費，超過半個小時將以一個小時計算。<br>
    請注意住宿人數勿超過客房設定之人數，若有超過客房設定人數，飯店有權拒絕入住。
  </p>
  <h5 class="text-warning">[ 平假日定義 ]</h5>
  <p class="mb-5">
    平日時間：星期日~星期五；假日時間：星期六、連續假日結束前一日，依飯店公告為準。
  </p>
  <h5 class="text-warning">[ 加人服務 ]</h5>
  <p class="mb-5">
    本飯店繪圖湯屋房型提供加人服務（含軟墊、備品、早餐、溫泉 SPA 券），<br>
    每加一人 NT$600（春節期間不適用）。
  </p>
  <h5 class="text-warning">[ 其他注意事項 ]</h5>
  <p class="mb-5">
    為維護住宿品質，室內空間全面禁菸，禁止攜帶貓狗等寵物入住，如經查獲加收清潔費 5000 元。<br>
    為維護公共及個人安全，禁止在房間內烹煮食物，或攜帶瓦斯、電磁爐等同性質用具，敬請房客務必配合。<br>
    客房地面為木質地板，請勿擅自移動房內傢俱，如發現自行搬動客房家具造成木質地面損傷，需付損毁費用。<br>
    房型擺設僅供參考，以實體房間為主。<br>
    免費停車場（僅供免費停車，不負保管之責）。<br>
    行政本館及雙幕川館內衛浴設備皆為一般熱水，如需使用溫泉需至戶外大眾池或改訂繪圖湯屋房型。
  </p>

  <h3 class="text-right border-bottom border-warning">官網訂房規範</h3>
  <p class="mb-5">- 僅適用官網訂房，專案如有特殊需求，依專案為主</p>

  <h5 class="text-warning">[ 線上訂房須知 ]</h5>
  <p class="mb-5">
    線上訂房交易價格均已含營業稅及服務費，若您選擇線上刷卡，交易成功後將由您的信用卡帳戶直接扣款。<br>
    線上訂房不接受國民旅遊卡刷卡訂房，若需使用國民旅遊卡訂房請直接電洽櫃台辦理。
  </p>

  <h5 class="text-warning">[ 延遲入住手續 ]</h5>
  <p class="mb-5">
    若您在住宿當日，因塞車或其他的因素有所耽擱，無法在當日下午六點以前辦理住房手續，請您先以電話聯繫，否則飯店將視為您當日取消訂房，恕不退費。
  </p>

  <h5 class="text-warning">[ 更改入住日期 ]</h5>
  <p class="mb-5">
    訂房後如欲更改訂房日期，請電話聯絡協助處理。<br>
    同一筆訂單限更改一次，且更改後的訂單恕不接受退房，否則視同取消訂房，依取消訂房規範處理。<br>
    如更改後訂單金額大於原訂單金額，旅客需現場另行支付差額；如更改後金額小於原訂單金額，恕不退還差額。
  </p>

  <h5 class="text-warning">[ 取消訂房 ]</h5>
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

  <h5 class="text-warning">[ 特殊因素之退房處理 ]</h5>
  <p class="mb-5">
    若因天然災害等不可抗拒之因素（如地震、颱風等，以飯店所在地縣市政府公告為準）無法如期前往住宿<br>
    請於原訂住宿日３日（含當日）內與飯店之訂房中心連絡改期（得保留 6 個月）或是辦理退費。
  </p>
</div>
```

## Section 服務設施
這裡沒有按鈕功能，只需要靜態的 list 化商品資訊，將會包含圖片、標題、文字之局部多組區域，最後添加考量 RWD 的不同顯示方式技巧。

### 整理代碼
1. 利用前面的標題風格繼續套過以下結構，並賦予 section#id。
2. 這裡會添加背景於 section，所以 header 與 article 先預定為 container 窄版。
```html
<section id="lokiFacility" class="py-5">
  <header class="container text-center">
    <h2 class="text-warning pb-3">服務設施</h2>
  </header>
  <article class="container py-5">
    ...
  </article>
</section>
```
1. article 內採用無清單樣式來組合列表，放入多個設施說明個別持有圖片、標題與文字。
2. 設施說明這裡採用 media Object 來做單一項目。
3. 使用巢狀 grid 控制兩層 flex 分別為 `ul.row>li.col-12` 以及調整 Media Object 捨棄原 flex 設計改為 `div.row>img.col+div.col>h5+p`。
4. 將圖片改為 400x400 共 4 筆並增加 h5 與 p 用途。且調整下方間距與底線 `p.pb-3.border-bottom.border-warning`。
5. li 複製 4 組暫定於此。
{% note default %}
從 Media list 範例中做為修改參考：
https://getbootstrap.com/docs/5.0/utilities/flex/#media-object
https://getbootstrap.com/docs/5.0/content/typography/#unstyled
{% endnote %}
修改後為：
```html index.html
<article class="container py-5">
  <ul class="row list-unstyled">
    <li class="col-12">
      <div class="row align-items-center">
        <img class="col" src="https://fakeimg.pl/400x400">
        <div class="col">
          <h5>This is some content from a media component.</h5>
          <p class="pb-3 border-bottom border-warning">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quas!
          </p>
        </div>
      </div>
    </li>
    <li class="col-12">
      <div class="row align-items-center">
        <img class="col" src="https://fakeimg.pl/400x400">
        <div class="col">
          <h5>This is some content from a media component.</h5>
          <p class="pb-3 border-bottom border-warning">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quas!
          </p>
        </div>
      </div>
    </li>
    <li class="col-12">
      <div class="row align-items-center">
        <img class="col" src="https://fakeimg.pl/400x400">
        <div class="col">
          <h5>This is some content from a media component.</h5>
          <p class="pb-3 border-bottom border-warning">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quas!
          </p>
        </div>
      </div>
    </li>
    <li class="col-12">
      <div class="row align-items-center">
        <img class="col" src="https://fakeimg.pl/400x400">
        <div class="col">
          <h5>This is some content from a media component.</h5>
          <p class="pb-3 border-bottom border-warning">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quas!
          </p>
        </div>
      </div>
    </li>
  </ul>
</article>
```

### 優化調整
根據不同的瀏覽裝置進行規劃不同的響應效果：
1. xs 模式 `<576px` 下：
   - 調整 li 垂直間格，對父層 row 添加 `gy-4`
   - 調整設施說明之間的間隔，對父層 row 添加 `gy-4`
2. sm 模式 `≥576px` 下：
   - 設施說明規劃 `col-sm-6` （可捨去 `col`)。
3. md 模式不變，與 sm 模式相同不需另調整。
4. lg 模式 `≥992px` 下：
   - li 規劃增加 `col-sm-6`。
   - 偶數 li 希望方向相反，為了 HTML 彈性不建議透過 `.order-lg-1` 綁定，改由自訂 CSS 來控制 @media 偽類 even。
5. 添加背景與相關填色
   - 針對 section 進行 CSS 自訂 background，且考量彈性需要 center/cover fixed
   - 使用 background-blend-mode 做融合效果
   - 調整顏色都為白字調整 `article.text-white` 並加陰影（參考前面參數）

```html index.html
<section id="lokiFacility" class="py-5">
  <header class="container text-center">
    <h2 class="text-warning pb-3">服務設施</h2>
  </header>
  <article class="container py-5 text-white">
    <ul class="row list-unstyled gy-4">
      <li class="col-12 col-lg-6">
        <div class="row align-items-center gy-4">
          <img class="col-sm-6" src="https://fakeimg.pl/400x400">
          <div class="col-sm-6">
            <h5>This is some content from a media component.</h5>
            <p class="pb-3 border-bottom border-warning">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quas!
            </p>
          </div>
        </div>
      </li>
      <li class="col-12 col-lg-6">
        <div class="row align-items-center gy-4">
          <img class="col-sm-6" src="https://fakeimg.pl/400x400">
          <div class="col-sm-6">
            <h5>This is some content from a media component.</h5>
            <p class="pb-3 border-bottom border-warning">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quas!
            </p>
          </div>
        </div>
      </li>
      <li class="col-12 col-lg-6">
        <div class="row align-items-center gy-4">
          <img class="col-sm-6" src="https://fakeimg.pl/400x400">
          <div class="col-sm-6">
            <h5>This is some content from a media component.</h5>
            <p class="pb-3 border-bottom border-warning">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quas!
            </p>
          </div>
        </div>
      </li>
      <li class="col-12 col-lg-6">
        <div class="row align-items-center gy-4">
          <img class="col-sm-6" src="https://fakeimg.pl/400x400">
          <div class="col-sm-6">
            <h5>This is some content from a media component.</h5>
            <p class="pb-3 border-bottom border-warning">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quas!
            </p>
          </div>
        </div>
      </li>
    </ul>
  </article>
</section>
```
```css custom.css
@media (min-width: 992px) {
  #lokiFacility li.col-lg-6:nth-of-type(even) img {
    order: 1;
  }
}

#lokiFacility {
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
## Section 餐飲美食
會使用到 accordion 元件的手風琴動態互動，並客製整合 list-group 元件的 tabs 互動效果作為圖片切換，最後也得添加考量 RWD 的不同顯示方式技巧。

### 整理代碼
1. 利用前面的標題風格繼續套過以下結構，並賦予 section#id。
```html
<section id="lokiFood" class="py-5 container">
  <header class="text-center">
    <h2 class="text-warning pb-3">餐飲美食</h2>
  </header>
  <article class="py-5">
    <!--tab Content-->
    <!--Accordion-->
  </article>
</section>
```
2. article 內會持有圖片區、手風琴之標題與內容，這裡採用 Collapse 元件之手風琴效果，並試著調整為
{% note default %}
從 Media list 範例中做為修改參考：
https://getbootstrap.com/docs/5.0/components/accordion/#example
{% endnote %}
修改前：
```html
<article class="py-5">
  <!--tab Content-->
  <!--Accordion-->
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
          aria-expanded="true" aria-controls="collapseOne">
          Accordion Item #1
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
        data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom
          CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Accordion Item #2
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom
          CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Accordion Item #3
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
        data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom
          CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the
          <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
  </div>
</article>
```
   - 移除冗長內容、屬性 [aria-*]、持有 `.accordion-header` 之#id
   - 調整 `h2.accordion-header>button.accordion-button` 合併為 `>a.accordion-header.accordion-button` 並保留相關屬性 [data-bs-*] 之原理，並替換為 href 為 target 方式。
   - 更名 #accordionExample 為 #foodmenu 與所有 target#id。
  
  修改後：
```html
<article class="py-5">
  <!--tab Content-->
  <!--Accordion-->
  <div class="accordion" id="foodMenu">
    <div class="accordion-item">
      <a class="accordion-header accordion-button" data-bs-toggle="collapse" href="#foodTxt1">Item #1</a>
      <div id="foodTxt1" class="accordion-collapse collapse show" data-bs-parent="#foodMenu">
        <div class="accordion-body">though the transition does limit overflow.</div>
      </div>
    </div>
    <div class="accordion-item">
      <a class="accordion-header accordion-button collapsed" data-bs-toggle="collapse" href="#foodTxt2">Item #2</a>
      <div id="foodTxt2" class="accordion-collapse collapse" data-bs-parent="#foodMenu">
        <div class="accordion-body">though the transition does limit overflow.</div>
      </div>
    </div>
    <div class="accordion-item">
      <a class="accordion-header accordion-button collapsed" data-bs-toggle="collapse" href="#foodTxt3">Item #3</a>
      <div id="foodTxt3" class="accordion-collapse collapse" data-bs-parent="#foodMenu">
        <div class="accordion-body">though the transition does limit overflow.</div>
      </div>
    </div>
  </div>
</article>
```
3. 將 list-group 的互動效果做抽取，能知道 tab 的觸發條件為 `.list-group>*[data-toggle="list"][href="#id"]`，受觸發端為 `.tabl-content` 整體內容
{% note default %}
從 list-group 元件中的 JS 行為範例中做為修改參考：
https://getbootstrap.com/docs/5.0/components/list-group/#javascript-behavior
{% endnote %}
修改前：
```html
<div class="row">
  <div class="col-4">
    <div class="list-group" id="list-tab" role="tablist">
      <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
      <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
      <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
      <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
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
  - 將 div.tab-pane 元素替換為 img 共 3 組，而 role, aria-* 可捨去，ID 適當替換。
  - div.tab-content 的#id 可省略。
  - 將 `.list-group>*[data-toggle="list"][href="#id"]` 觸發方式與手風琴的 `.accordion>div.accordion-item` 進行整合

  修改後：
```html
<article class="py-5">
  <!--tab Content-->
  <div class="tab-content">
    <img id="foodImg1" class="tab-pane fade show active" src="https://picsum.photos/600/400/?random=1">
    <img id="foodImg2" class="tab-pane fade" src="https://picsum.photos/600/400/?random=2">
    <img id="foodImg3" class="tab-pane fade" src="https://picsum.photos/600/400/?random=3">
  </div>
  <!--Accordion-->
  <div class="accordion list-group" id="foodMenu">
    <div class="accordion-item" data-bs-toggle="list" data-bs-target="#foodImg1">
      <a class="accordion-header accordion-button" data-bs-toggle="collapse" href="#foodTxt1">Item #1</a>
      <div id="foodTxt1" class="accordion-collapse collapse show" data-bs-parent="#foodMenu">
        <div class="accordion-body">though the transition does limit overflow.</div>
      </div>
    </div>
    <div class="accordion-item" data-bs-toggle="list" data-bs-target="#foodImg2">
      <a class="accordion-header accordion-button collapsed" data-bs-toggle="collapse" href="#foodTxt2">Item #2</a>
      <div id="foodTxt2" class="accordion-collapse collapse" data-bs-parent="#foodMenu">
        <div class="accordion-body">though the transition does limit overflow.</div>
      </div>
    </div>
    <div class="accordion-item" data-bs-toggle="list" data-bs-target="#foodImg3">
      <a class="accordion-header accordion-button collapsed" data-bs-toggle="collapse" href="#foodTxt3">Item #3</a>
      <div id="foodTxt3" class="accordion-collapse collapse" data-bs-parent="#foodMenu">
        <div class="accordion-body">though the transition does limit overflow.</div>
      </div>
    </div>
  </div>
</article>
```

### 優化調整
- 將 article 變成 row>col 做響應式整合為 `.col-12.col-lg-6`
- 對 img 做自適應與相框化為 `.img-fluid.img-thumbnail`，圖太小考慮填滿追加 `w-100`
- 對 a.accordion-header 做配色 `.alert-warning` 與消除底線 `.text-decoration-none`
- active 與 :focus 的配色透過自訂 css 做覆蓋。
- 優化文字內容，如輔助字可用 `<small class="position-absolute start-0 top-0 badge bg-danger"></small>`，並搭配自訂變形特效。
- 修正 `.list-group` 原影響的 ps-0 改增添 `px-3`
- 增加間格，對 row 增添 `gx-4`

```html index.html
<article class="row py-5 gy-4">
      <!--tab Content-->
      <div class="tab-content col-lg-6">
        <img id="foodImg1" class="img-thumbnail img-fluid tab-pane fade show active"
          src="https://picsum.photos/600/400/?random=1">
        <img id="foodImg2" class="img-thumbnail img-fluid tab-pane fade" src="https://picsum.photos/600/400/?random=2">
        <img id="foodImg3" class="img-thumbnail img-fluid tab-pane fade" src="https://picsum.photos/600/400/?random=3">
      </div>
      <!--Accordion-->
      <div class="accordion list-group col-lg-6 px-3" id="foodMenu">
        <div class="accordion-item" data-bs-toggle="list" data-bs-target="#foodImg1">
          <a class="text-decoration-none text-warning alert-warning accordion-header accordion-button"
            data-bs-toggle="collapse" href="#foodTxt1">
            中歐頂級豪華早餐 （自助式）
            <small class="position-absolute start-0 top-0 badge bg-danger">2F 食堂</small>
          </a>
          <div id="foodTxt1" class="accordion-collapse collapse show" data-bs-parent="#foodMenu">
            <div class="accordion-body">
              <p>
                致春園餐廳眺望溫泉公園景觀，嚴選谷關當地食材精心烹調充滿谷關風味的特色小吃，菜色美味有口皆碑，在這裡除了品嘗美食外更可飽覽溫泉公園山光水色，味覺與視覺的雙重享受。<br>
                適合工商宴席、婚禮宴客、家庭聚餐、大宴小酌、台菜、客家菜、風味套餐色、香、味美。寬敞的宴會大廳飯店備有多種餐飲選擇，是用餐之好所在！，多種餐飲選擇滿足您挑剔的味蕾並歡迎親臨品嚐！!
              </p>
              <p class="float-end text-danger">
                定價： 大人 NT500 / 小孩 NT300<br>
                營業時間：AM 06:00 ~ AM 11:00
              </p>
            </div>
          </div>
        </div>
        <div class="accordion-item" data-bs-toggle="list" data-bs-target="#foodImg2">
          <a class="text-decoration-none text-warning alert-warning accordion-header accordion-button collapsed"
            data-bs-toggle="collapse" href="#foodTxt2">
            咖啡複合式鋼琴酒吧
            <small class="position-absolute start-0 top-0 badge bg-danger">1F 中庭</small>
          </a>
          <div id="foodTxt2" class="accordion-collapse collapse" data-bs-parent="#foodMenu">
            <div class="accordion-body">
              <p>
                大飯店一樓的挑高中庭，瀰漫優雅的南洋休閒風，庭內雨林造景，融合水聲與天籟柔美樂音，供應各式花茶、咖啡、健康蔬果汁、英式下午茶及宵夜，揉合自然音樂，是您輕鬆暢敘的最佳地點。<br>
                （假日二人樂團鋼琴、長笛、薩克斯風演奏）
              </p>
              <p class="float-end text-danger">
                基本消費：NT150 + 10% / 位<br>
                營業時間：PM 07:00 ~ AM 01:00
              </p>
            </div>
          </div>
        </div>
        <div class="accordion-item" data-bs-toggle="list" data-bs-target="#foodImg3">
          <a class="text-decoration-none text-warning alert-warning accordion-header accordion-button collapsed"
            data-bs-toggle="collapse" href="#foodTxt3">
            桶仔爐烤春雞 露營客最愛
            <small class="position-absolute start-0 top-0 badge bg-danger">代訂預約</small>
          </a>
          <div id="foodTxt3" class="accordion-collapse collapse" data-bs-parent="#foodMenu">
            <div class="accordion-body">
              <p>
                精選體型小、骨骼細的 40 天春雞，將其均勻裹上一層厚厚的楓糖芥末後，再送進烤爐燒烤。<br>
                爐烤春雞因恰到好處的溫度而能保有鮮嫩口感與湯汁；取出整隻雞後，你可用手輕易撥開骨架幼嫩的春雞，一口咬下細膩的肉質，感受混合著楓糖芥末醬汁的酥脆表皮，享受這多層次卻不膩口的美味，亦是本季每日午時限量的私房美饌。
              </p>
              <p class="float-end text-danger">
                露營客代訂服務 $800/隻<br>
                （以利備食材，請於一週前預約）
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
```

## Section 交通資訊
這裡沒有按鈕功能，只需要整合 Google Map 跟固定的 Card 元件即可。

### 整理代碼
1. 利用前面的標題風格繼續套過以下結構，並賦予 section#id。
2. 這裡會將 iframe 當作背景，所以 header 放入 article 且做成 container 窄版與 absoulte，並加入 row>col。
```html
<section id="lokiTrans" class="py-5">
  <iframe src="..."></iframe>
  <article class="container py-5">
    <header class="container text-center">
      <h2 class="text-warning pb-3">服務設施</h2>
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
https://getbootstrap.com/docs/5.0/helpers/ratio/#example
{% endnote %}
未修改：
```html
<div class="ratio ratio-16x9">
  <iframe src="..." allowfullscreen></iframe>
</div>
```
修改後：
```html
<section id="lokiTrans" class="ratio py-5">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7078780838638!2d121.41715431544698!3d25.04398584404413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7bec9ad74b1%3A0xa639904a89f26435!2z5Yue5YuV6YOo5Yue5YuV5Yqb55m85bGV572y5YyX5Z-65a6c6Iqx6YeR6aas5YiG572y5rOw5bGx6IG35qWt6KiT57e05aC0!5e0!3m2!1szh-TW!2stw!4v1586453399205!5m2!1szh-TW!2stw"
    allowfullscreen></iframe>
  <article class="container py-5">...</article>
</section>
```
4. 將背景地圖添加自訂 CSS 拉黑。
```css custom.css
#lokiTrans iframe{
  filter: grayscale(0.75) brightness(0.5);
}
```
>此時看不到 article 沒關係，之後添加 row(flex) 就不需要處理 z-index 了。
5. 對 header 標題與 div 內文整合 row>col 為 .col-12.col-lg-6
6. 適時調色與調整移除 padding
7. 加入 card 效果添加指定內文
8. 空間感錯亂因為 .radio 對任何子元素強迫為 position-absoulte，改回 article.rstatic 即可。
```html
<article class="container position-static">
  <div class="row gy-2">
    <header class="col-12 col-lg-6 text-center">
      <h2 class="card text-warning">服務設施</h2>
    </header>
    <div class="col-12"></div>
    <div class="col-12 col-lg-6">
      <div class="card">
        <div class="card-body">
          <strong>公車、捷運</strong>
          <ul class="ps-4">
            <li>公車：三重客運 (637、638)、指南客運 (797、798、801、858、880、883、1501、1503)，至明志科技大學站下車。</li>
            <li>新北市泰山區免費公車（泰山區 F216 明志國小-台北車站（北三門搭車）)：至貴子路下車後，步行至貴子路口左轉明志路 3 段，明志路直行約 100 公尺至工專路右轉，再直行即可至明志科技大學。
            </li>
            <li>捷運：臺北捷運中和新蘆線至丹鳳站 1 號出口或桃園捷運機場線至泰山貴和站（明志科大）1 號出口，再轉乘公車或騎乘 YouBike 微笑單車（約 10~15 分鐘）至明志科技大學。</li>
          </ul>
          <strong>自行開車</strong>
          <ul class="ps-4">
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

## Section 聯絡我們
使用到 Forms, Input Group, Grid 來設計 RWD 型態的聯絡表單。

{% note default %}
https://getbootstrap.com/docs/5.0/forms/form-control/#example
https://getbootstrap.com/docs/5.0/forms/input-group/#basic-example
https://getbootstrap.com/docs/5.0/forms/checks-radios/#inline
https://getbootstrap.com/docs/5.0/forms/select/
{% endnote %}

### 整理代碼
利用前面的標題風格繼續套過以下結構，並賦予 section#id。
```html
<section id="lokiContact" class="py-5 container">
  <header class="text-center">
    <h2 class="text-warning pb-3">聯絡我們</h2>
  </header>
  <article class="py-5">
    ...
  </article>
</section>
```

1. section 需持有背景色，所以調整為 header 跟 article 為 container 窄版
2. form 作為 row>col，而排版方式為 div.col-12.col-md-6 並包覆一個 label 與 `.input-group`
```html
<section id="lokiContact" class="py-5 bg-dark text-light">
  <header class="container text-center">
    <h2 class="text-warning pb-3">聯絡我們</h2>
  </header>
  <article class="container py-5">
    <form class="row g-4" method="post">
      <div class="col-12 col-md-6">...</div>
    </form>
  </article>
</section>
```
3. 放入持有 label 的訪客姓名輸入欄位，並整合一組 radio 且 inline 塞入 input-group-text，欄位名稱 sex。
```html
<div class="col-12 col-md-6">
  <label class="form-label" for="dataUser">訪客姓名</label>
  <div class="input-group">
    <input class="form-control" type="text" id="dataUser" name="dataUser" placeholder="Full Name" required>
    <div class="input-group-text">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="dataSexM" name="dataSex" value="man">
        <label class="form-check-label" for="dataSexM">男性</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="dataSexW" name="dataSex" value="woman">
        <label class="form-check-label" for="dataSexW">女性</label>
      </div>
    </div>
  </div>
</div>
```
4. 同上方向，規劃電話欄位，因單欄位可移除用不到的 input-group 組合
```html
<div class="col-12 col-md-6">
  <label class="form-label" for="dataTel">連絡電話</label>
  <input class="form-control" type="tel" id="dataTel" name="dataTel" placeholder="Phone Number" required>
</div>
```

5. 同上方向，規劃電子信箱
```html
<div class="col-12 col-md-6">
  <label class="form-label" for="dataMail">電子信箱</label>
  <input class="form-control" type="email" id="dataMail" name="dataMail" placeholder="Email Address" required>
</div>
```

6. 同上方向，規劃問題類型但這裡使用 select 下拉選單
```html
<div class="col-12 col-md-6">
  <label class="form-label" for="dataQus">問題類型</label>
  <select class="form-select" id="dataQus" name="DataQus">
    <option value="住宿相關">住宿相關</option>
    <option value="婚宴訂桌">婚宴訂桌</option>
    <option value="其他">其他</option>
  </select>
</div>
```

7. 同上 textarea 但為 col-12
```html
<div class="col-12">
  <label class="form-label" for="dataMessage">需求說明</label>
  <textarea class="form-control" id="dataMessage" name="dataMessage" placeholder="Writer Your Message..." rows="3"></textarea>
</div>
```

8. 提交按鈕與警示語
```html
<div class="col-12 text-center">
  <div class="form-text">請如實填寫便於信件回覆，我們保證不隨意公開您的留言資訊</div>
  <hr class="border-secondary">
  <button type="submit" class="btn btn-primary">確認送出</button>
</div>
```

### 添加 Footer 內容
由於版面空間缺乏而為了之後的選單錨點跳躍，增添一些廣告連結。直接在目前的 selection#lokiContact 內最後處多添加 article，若使用 flex 須注意小螢幕上的換行問題。

```html
<article class="container-fluid bg-light py-5 text-center">
  <!-- footer Info Before -->
  <div class="d-flex justify-content-center align-items-center flex-wrap">
    <a class="link-secondary border p-3 m-3" href="https://www.facebook.com/tsvts/" target="_blank">
      <i class="fab fa-facebook fa-3x"></i><br>泰山職業訓練場
    </a>
    <a href="https://tkyhkm.wda.gov.tw/Default.aspx" target="_blank">
      <img src="https://ws.wda.gov.tw/001/Upload/308/sites/pagebackimage/366d4144-bdac-4a20-a1f2-b0846004efc0.png"
        alt="勞動部勞動力發展署北基宜花金馬分署全球資訊網">
    </a>
    <a href="https://www.taiwanjobs.gov.tw/home/new_index.aspx" target="_blank">
      <img
        src="https://icmp-ws.chiayi.gov.tw/001/Upload/408/relpic/9352/408618/8e7e31cb-201c-4b6f-802f-920fb8f06e28@710x470.png"
        alt="台灣就業通">
    </a>
  </div>
  <div class="text-secondary">
    <a class="link-secondary" href="tel:02-2901-8274">電話：02-2901-8274</a> ｜ 
    <span class="link-secondary">傳真：02-2908-4773</span> ｜ 
    <a class="link-secondary" href="mainto:service@toyugi.com.tw">信箱：service@toyugi.com.tw</a>
    <a class="link-secondary" href="https://goo.gl/maps/NDzTUToVSbMQYLwv6" target="_blank">
      <address class="m-0">243 新北市泰山區貴子里致遠新村 55 之 1 號</address>
    </a>
  </div>
</article>
```

## Header 選單
{% note default %}
使用 Navbar 導覽列的響應式之範例二作為初始化。
https://getbootstrap.com/docs/4.4/components/navbar/#responsive-behaviors
https://getbootstrap.com/docs/5.0/components/navbar/#responsive-behaviors
{% endnote %}

```html 未修改
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
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
```

### 整理代碼

1. 語意優化，用 `header#lokiMenu` 包起來放在 `section#lokislider` 之前，替換 ID 對象為 lokiNav
2. 移除所有的 `[arai-*]` 跟 Disabled 與 form 之選單項目
3. 將網站名稱與選單文字做修改增添共五組，並設定所有的錨點連結
4. 調整為 `navbar-expand-md` 試試 RWD 是否正常運作

>自 5.0 版本因添加 `html{scroll-behavior: smooth;}` 可持有 scroll to id 效果。

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
2. 調整選單靠右將 `ul.me-auto` 改為 `ul.ms-auto`
3. 將 header 固定於上方為 `header.fixed-top`
4. 美化 font-icon 於 選單之前綴，搭配 `.me-2`
5. CSS 自訂 `nav-link` 的變化感，順便也影響房型介紹。
6. 如果標題感到擠壓，可對所有 `header>h2.pb-3` 修改為 `py-3`，以及交通資訊 `<article class="container position-static py-3">`。

```html
<header id="lokiMenu" class="bg-dark fixed-top">
  <nav class="navbar navbar-expand-md navbar-light navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="#">泰山渡假飯店</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#lokiNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="lokiNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#lokiRoom"><i class="fas fa-bed me-2"></i>房型介紹</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#lokiFacility"><i class="fas fa-gamepad me-2"></i>服務設施</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#lokiFood"><i class="fas fa-utensils me-2"></i>餐飲美食</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#lokiTrans"><i class="fas fa-map-marker-alt me-2"></i>交通資訊</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#lokiContact"><i class="fas fa-envelope me-2"></i>聯絡我們</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
```
```css
/***************navBar*********/
.nav-link {
  transition: 1s ease;
}
```

### JS 優化調整
這裡會接觸 JS 操作，另外獨立 custom.js 進行撰寫，並記得於 index.html 下方放入宣告：
```html
<script src="plugins/custom.js"></script>
```

#### scrollspy
由於 BS 的 scrollspy 在 v5 beta3 的 BUG 問題（重刷網頁時位置錯誤）影響到視覺上的變化偏差，只好自己寫。原本 Bootstrap 方式如下（不建議）：
```html
<body data-bs-spy="scroll" data-bs-target="#lokiMenu" data-bs-offset="1">
...
</body>
```

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
2. 調整 LOGO 的錨點對象為 `#lokiSlider`。
2. 開發 JS 做法為：每次滾動時觸發 spy 函式，檢查所有 section 的 scroll 值是否與目前 scroll 相同，成立就替換選單的 a.active
3. 最後記得網頁載入時需先跑一遍 spy 函式，避免載入時沒有 a.active
```javascript custom.js
window.onload = function () {
  const offset = document.querySelector('#lokiMenu').offsetHeight;
  let sections = {};
  document.querySelectorAll('section').forEach(e => {
    sections[e.id] = {
      top: e.offsetTop,
      bottom: e.offsetTop + e.offsetHeight
    };
  });
  let scrollSpy = () => {
    // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // 因平台不同有不同解讀方法
    const
      startY = document.scrollingElement.scrollTop, // 新語法可跨平台
      viewTop = startY + offset; //原滾動處下修至選單高度之偏移
    for (const key in sections) {
      if (sections[key].top <= viewTop && viewTop <= sections[key].bottom) {
        let turnOff = document.querySelector(`#lokiMenu a.active:not([href="#${key}"])`);
        if (turnOff) turnOff.classList.remove('active'); //如果存在持有.active但不是持有href=key的人，取消他的active
        let turnOn = document.querySelector(`#lokiMenu a[href="#${key}"]:not(.active)`);
        if (turnOn) turnOn.classList.add('active'); //如果存在未持有.active但持有href=key的人，增加他的active
      }
    };
  };
  window.onscroll = () => {
    scrollSpy();
  };
};
```

#### Scroll To Id
改善原本不具備 offset 的預設效果 (scroll-behavior: smooth)

1. 改回 :root 的 CSS 設定 `scroll-behavior:auto`。
```css
:root{
  scroll-behavior: auto;
}
```
2. 賦予返回頁首的按鈕 `#scrollSlider` 方便操作
```html index.html
<a class="btn btn-warning text-light" href="#lokiSlider"><i class="fas fa-angle-double-up fa-2x"></i></a>
```
3. 開發 JS 做法為：每次點擊時，根據 href 對象找到offset偏移量，並根據時間曲線規劃每影格進行移動到該處。
```javascript custom.js
// scroll to id  => idea by https://gist.github.com/andjosh/6764939
document.querySelectorAll("#lokiMenu a,footer a").forEach(e => {
  e.onclick = function (event) {
    event.preventDefault();
    const targetID = e.getAttribute("href");

    scrollToId(document.querySelector(targetID).offsetTop - offset + 1, 1500);
  };
});

function scrollToId(toY, duration) {
  const
    startNode = document.scrollingElement, // 新語法可跨平台
    startY = startNode.scrollTop,
    changeY = toY - startNode.scrollTop,
    startTime = +new Date();

  Math.easeInOutQuad = function (t, b, c, d) {
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  let animateScroll = function () {
    console.log(1);
    const currentTime = +new Date() - startTime;
    let val = Math.easeInOutQuad(currentTime, startY, changeY, duration);
    startNode.scrollTop = val;
    if (currentTime < duration) requestAnimationFrame(animateScroll); //frame pre 60/s
  };
  animateScroll();
}
```
#### Index Shown
1. 為了美觀 MENU 預設沒有底色（非手機模式），當離開 slider 才顯示 bg-dark。
2. 首頁載入時沒有 `lokiArrow`，當離開 slider 才顯示 `lokiArrow`。
3. 先設計過渡處理
```css custom.css
#lokiArrow {
  opacity: 0;
  transition: 500ms ease;
}
#lokiArrow.shown {
  opacity: 1;
}
#lokiMenu {
  transition: 1s ease;
}
```
4. 開發 JS 做法為：
  - 設計 bhmenu 函式，檢查目前的 scroll 值（判斷 slider 與 menu 高度比較）做不同的變色，變色還需考量螢幕寬度。
  - 每次滾動時觸發此函式。
  - 每次寬度時觸發此函式。
5. 最後記得網頁初次載入時需先跑一遍此函式，避免載入時沒有初始效果。
```javascript custom.js
const offset = document.querySelector('#lokiMenu').offsetHeight;
...
let scrollSpy = () => {
  ...
};

let indexShown = () => {
  const
    viewWidth = document.scrollingElement.offsetWidth,
    indexBottom = document.querySelector('#lokiSlider').offsetHeight,
    targetMenu = document.querySelector('#lokiMenu'),
    targetArrow = document.querySelector('#lokiArrow'),
    startY = document.scrollingElement.scrollTop; // 新語法可跨平台

  if (viewWidth >= 992) { //屬於大螢幕時才會做判斷
    if (startY < indexBottom - offset) { //於slider內
      targetMenu.classList.remove('bg-dark');
      targetArrow.classList.remove('shown');
    } else {
      targetMenu.classList.add('bg-dark');
      targetArrow.classList.add('shown');
    }
  } else targetMenu.classList.add('bg-dark');
}


window.onscroll = () => {
  scrollSpy();
  indexShown();
};

window.onresize = () => { //當有人對window重新調整尺寸時
  indexShown();
}

scrollSpy();
indexShown();
```

6. 最後，HTML 部分可以先拿掉 bg-dark 避免載入閃了一下。