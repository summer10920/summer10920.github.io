---
title: "[練習課程] Bootstrap5 實作：一頁式網站"
categories:
  - 職訓教材
  - 範例實作網站
tag:
  - RWD 響應式網頁設計（假日班）
date: 2022-08-21 13:37:12
---

![](https://i.imgur.com/36CA3aE.png)
本篇將整合過去基本課程 HTML, CSS 相關知識進行經驗整合，透過 Bootstrap 5.2 動手設計簡單一頁式且具備 RWD 之網站設計。

<!-- more -->

# 前提準備

## 環境安裝
- 準備前往下載並加以使用，確保以下第三方資源已列入你的專案內：
   - [Bootstrap5](https://getbootstrap.com/docs/5.2/getting-started/download/)，採用已編譯完成 min.css 與 min.js 為資源使用。
   - [思源黑體 Noto Sans TC](https://fonts.google.com/specimen/Noto+Sans+TC) 使用 Google Fonts 做為我們的中文線上字型。
   - [FontIcon](https://gauger.io/fonticon/) 做為我們簡單的網站 ico 使用。
   - [Fontawesome](https://fontawesome.com/) 作為我們圖示庫，註冊會員之後透過 kit 獲取專屬免費授權 js 套件。
- 設定網站名稱與上列所有設定與測試：
   - 將 favicon.ico 放置指定位置，透過 link:favicon 指向過去。
   - 透過 style.css 的 body 設定 font-family，先英文字型再中文字型，最後多個預設襯線體。本次為黑底風格。
   - 使用 [Bootstrap > Carousel > With captions](https://getbootstrap.com/docs/5.2/components/carousel/#with-captions) 單元代碼測試，並利用 picsum 做測試圖是否有效呈現。

![檔案目錄相對位置](https://i.imgur.com/7G7i5MI.png)

```css media/style.css
body {
  font-family: 'Roboto', 'Noto Sans TC', 'Open Sans', Helvetica, Arial;
  background: #282c34;
  color:#eee;
}
```
```html index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>洛奇渡假營地 - 溫泉露營</title>
  <!-- favicon.ico -->
  <link rel="shortcut icon" href="media/favicon.ico" type="image/x-icon">
  <!-- google font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Roboto&display=swap" rel="stylesheet">
  <!-- bootstrap -->
  <link rel="stylesheet" href="plugins/bootstrap.min.css">
  <script src="plugins/bootstrap.bundle.min.js"></script>
  <!-- fontawsome -->
  <script src="https://kit.fontawesome.com/fa483230ea.js" crossorigin="anonymous"></script>
  <!-- custom -->
  <link rel="stylesheet" href="plugins/style.css">
</head>

<body>
  <!-- 測試廣告輪播判斷 Bootstrap 是否正常運行 -->
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://picsum.photos/1920/1080/?random=10" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/1080/?random=11" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/1080/?random=12" class="d-block w-100" alt="...">
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
</body>

</html>
```

## 認知說明
- 使用 html5 的語意標籤，參考 [W3Schools](https://www.w3schools.com/html/html5_semantic_elements.asp) 之說明。
- 在設計響應式網站過程中，你應該先從小螢幕開始著手外觀調整設計，其次在大螢幕上做局部調整。
- 為了練習簡化，會對使用的所有 Bootstrap 元件全都會移除 aria-* 系列屬性或是 sr-only 之類的障讀設計。alt 或 title 之類的 SEO 強化也會移除。
- 同上，為了方便判讀可更名皆採用 loki* 命名方式做自行判斷。
- 你可以使用 picsum 或 fakeimg 作為素材，或是自行下載合法圖庫包。

```html index.html
<body>
  <!-- 測試廣告輪播判斷 Bootstrap 是否正常運行 -->
  <div id="lokiSlider" class="carousel slide" data-bs-ride="false">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="2"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://picsum.photos/1920/1080/?random=10" class="d-block w-100">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/1080/?random=11" class="d-block w-100">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1920/1080/?random=12" class="d-block w-100">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
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
  </div>
</body>
```

# 區塊設計
接下來以一頁式網站為概念進行設計，分為幾個主題來設計。先整理代碼再做優化，最後一小節回頭處理 JS 動態。

## 輪播廣告 #lokiSlider
先做網站入口的第一強烈視覺同等首頁，滿版且佔滿畫面的廣告圖片輪播，先前已先測試時放入示範。

{% note default %}
套用 BS 的 carousel 文件示範，選擇持有導覽鍵，導覽列，字幕的範例開始修改。
https://getbootstrap.com/docs/5.2/components/carousel/#with-captions
{% endnote %}

### 整理代碼
- 前面已完成語意優化初步階段，包含替換 ID 名稱，捨略 aria-* 屬性。
- 添加 HTML5 語意，更改 div.carousel 為 section.carousel
- 避免眼球疲累改為 fade 效果，增加 #lokiSlider.carousel-fade 公式。

```html index.html#lokiSlider
<section id="lokiSlider" class="carousel slide carousel-fade" data-bs-ride="false">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="2"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://picsum.photos/1920/1080/?random=10" class="d-block w-100">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/1920/1080/?random=11" class="d-block w-100">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/1920/1080/?random=12" class="d-block w-100">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
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

### 優化調整
優先考慮手機模式，先將畫面縮放至小畫面 viewWidth 約為 640px。再進行調整：

- 圖片的父容器指定完整空間添加　div.carousel-item.vh-100，使得內部空間為滿版空間。
- 圖片本身強迫為 img.w-100.h-100 強迫填滿，而不變形的方式多增加自訂 css 為 object-fit:cover 使得畫面自動等比例超出進行裁切。
- 同上，對圖片自訂 css 使用濾鏡效果 `filter: grayscale(50%) sepia(80%)` 調整原始圖片的吃色問題。
- 若仍吃色嚴重（非必要），可考慮透過偽元素 #lokiSlider.carousel-item::after 添加 svg 背景圖，svg 設計方式可利用 [Method Draw Vector Editor](https://editor.method.ac/) 完成，再透過 [SVG to Data URI converter](https://codepen.io/elliz/details/ygvgay) 就能以代碼方式寫在 css 內而非路徑檔案。
```html svg
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
<g opacity="0.5" stroke-width="1" stroke="#000" fill="none">
  <line y2="10" x2="10" y1="0" x1="0"/>
  <line y2="15" x2="5" y1="5" x1="-5"/>
  <line y2="5" x2="15" y1="-5" x1="5"/>
</g>
</svg>
```
- 透過 fontAnswse 更換更粗的 icon 圖案。不滿意 size 可根據 Docs 說明方式調整尺寸公式，舉例使用 `<i class="fa-solid fa-angle-left"></i>` （或自訂 css 當作文字處理 font-size)。
- 同上，針對更明顯的顯示自訂 css 增加矩陣黑底。另外透過 button.w-auto 取消原本的寬度空間使貼齊邊界。
- 調整文字畫面居中，針對 `.carousel-caption` 規劃 d-flex，`.justify-content-end.align-items-start`靠其左下，並自訂`pb240`。
- 原設計文字區塊於 md 以下模式所隱藏，可改至 p 段落隱藏。
- 可將標題改用 h2 元素，不夠大可利用`.carousel-caption.display-2.fw-bolder`更強烈放大。
- 最後可將自動輪播啟用並更改秒數 `#lokiSlider[data-bs-interval="3000" data-bs-ride="carousel"]`。

```html index.html#lokiSlider
<!-- 測試廣告輪播判斷 Bootstrap 是否正常運行 -->
<section id="lokiSlider" class="carousel slide carousel-fade" data-bs-ride="false">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#lokiSlider" data-bs-slide-to="2"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item vh-100 active">
      <img
        src="https://picsum.photos/1920/1080/?random=10"
        class="d-block h-100 w-100"
      >
      <div class="carousel-caption d-flex justify-content-end align-items-start flex-column">
        <h2 class="display-2 fw-bolder">First slide label</h2>
        <p class="d-none d-md-block">Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item vh-100">
      <img
        src="https://picsum.photos/1920/1080/?random=11"
        class="d-block h-100 w-100"
      >
      <div class="carousel-caption d-flex justify-content-end align-items-start flex-column">
        <h2 class="display-2 fw-bolder">Second slide label</h2>
        <p class="d-none d-md-block">Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item vh-100">
      <img
        src="https://picsum.photos/1920/1080/?random=12"
        class="d-block h-100 w-100"
      >
      <div class="carousel-caption d-flex justify-content-end align-items-start flex-column">
        <h2 class="display-2 fw-bolder">Third slide label</h2>
        <p class="d-none d-md-block">Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev w-auto" type="button" data-bs-target="#lokiSlider" data-bs-slide="prev">
    <i class="fa-solid fa-angle-left"></i>
  </button>
  <button class="carousel-control-next w-auto" type="button" data-bs-target="#lokiSlider" data-bs-slide="next">
    <i class="fa-solid fa-angle-right"></i>
  </button>
</section>
```
```css style.css
#lokiSlider .carousel-item {
  padding-bottom: 240px;
  background: #282c34; /*轉場問題加底圖*/
}

#lokiSlider .carousel-caption {
  padding-bottom: 120px;
}

#lokiSlider img {
  object-fit: cover;
  filter: grayscale(50%) sepia(80%);
}

#lokiSlider .carousel-item::after {
  content: "";
  position: absolute;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' stroke-opacity='0.2' stroke='%23555f'%3e%3cg%3e%3cline y2='10' x2='10' y1='0' x1='0'/%3e%3cline y2='5' x2='15' y1='-5' x1='5'/%3e%3cline y2='15' x2='5' y1='5' x1='-5'/%3e%3c/g%3e%3c/svg%3e");
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#lokiSlider button>i{
  font-size: 2rem;
  width: 50px;
  height: 50px;
  background: #000;
  line-height: 50px;
}

#lokiSlider .carousel-caption{
  z-index: 1;
}
```

## 營位介紹 #lokiPallet
第二個主題內容為主要產品，採用卡片設計並搭配 GRID 系統進行 2x2 排列。

{% note default %}
使用 card 的 image-overlays 作為初始化成為單筆資料容器。
https://getbootstrap.com/docs/5.2/components/card/#image-overlays
{% endnote %}

### 整理代碼
- 使用 section 作為區塊內容，並設計窄版 Container。
- 規劃標題 header 元素與尺寸為 h2，輕設計左側 Border 灰粗線。
- 規劃 cols 3 的 GRID 系統，並加大 Gutter 擴大間格。約規劃 4 組 col 容器。
- 每一個 col 的內容採用 img-overlay 來置入 Card 元件。

```html index.html#lokiPallet
<section id="lokiPallet" class="container">
  <header class="h2 my-5 border-start border-5 border-secondary ps-3">營位介紹</header>
  <article class="row row-cols-1 row-cols-md-2 g-5">
    <div class="col">
      <div class="card text-bg-dark">
        <img src="https://fakeimg.pl/400x300" class="card-img">
        <div class="card-img-overlay">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card text-bg-dark">
        <img src="https://fakeimg.pl/400x300" class="card-img">
        <div class="card-img-overlay">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card text-bg-dark">
        <img src="https://fakeimg.pl/400x300" class="card-img">
        <div class="card-img-overlay">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card text-bg-dark">
        <img src="https://fakeimg.pl/400x300" class="card-img">
        <div class="card-img-overlay">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
  </article>
</section>
```

### 優化調整
- 為了明確的內文條列，將`p.card-text`改成`ul.list-unstyled>li*3`。
- 將卡片標題追加為`h3.card-title.text-warning.fw-bolder`。
- 整個卡片 overlay 調製半透明黑底對齊至中且文字至中`div.card-img-overlay.text-center.bg-opacity-50.bg-dark.d-flex.flex-column.justify-content-center`。
- 對於空洞的產品數量缺點調整為階梯式呈現（只限定 md 模式以上），自訂 media 條件 Card 單數做 往上偏移 Y -50% 並 pb150 指定作為間格（也會讓 flex 空間之偶數 card 獲得相同間距高度）。
- 同時將 Gutter 添加改為`g-5.gx-md-5.gy-md-0`避免干擾計算。且限定於 md 模式。
- 同上為了左上的空白美感，需將整個 article 調整為`.flex-row-reverse`，由於步驟 4 有上推空間，此時需要透過 pt 去擴展足夠的空間讓內部 card 可呈現，多少值則根據 card 本身移動多少值如何算。
- padding 本身是認定 width 為比例，利用已知的 card 空間一排 2 個、Gutter 為 24px、卡片比例 4:3，有推開 150px，能算出上面空間需要讓出 `(100%-24px*2)/2*0.75/2-150px/2`。
- 另外將 card 添加改為`.card.overflow-hidden`使圖片特效正常。亦可添加`.border-0.shadow`使美觀。
- 最後的 card 如果覺得 pb150 使得留白太多，在父容器 article 可多設計 mb-150 來抵銷。
- 只用於 md 模式規劃 CSS 動態滑動效果。初始卡片比例 0，滑過時圖片偏大以及卡片文字比例恢復正常。
```css style.css
@media screen and (min-width: 768px) {
  #lokiPallet .col:nth-child(odd) {
    transform: translateY(-50%);
    padding-bottom: 150px;
  }
  #lokiPallet article {
    padding-top: calc((50% - 24px) * 0.375 + 75px);
    margin-bottom: -150px;
  }
  #lokiPallet .col:nth-last-child(1) {
    margin-bottom: -150px;
  }

  #lokiPallet .card-img-overlay {
    transform: scale(0);
    transition: 0.3s;
  }
  #lokiPallet .card:hover .card-img-overlay {
    transform: scale(1);
  }
}

#lokiPallet .card-img {
  transition: 0.3s;
}
#lokiPallet .card:hover .card-img {
  transform: scale(1.3);
}
```
```html index.html#lokiPallet
<section
  id="lokiPallet"
  class="container"
>
  <header class="h2 my-5 border-start border-5 border-secondary ps-3">營位介紹</header>
  <article class="row row-cols-1 row-cols-md-2 flex-row-reverse g-5 gx-md-5 gy-md-0 overflow-hidden">
    <div class="col">
      <div class="card text-bg-dark overflow-hidden border-0 shadow">
        <img
          src="https://fakeimg.pl/400x300"
          class="card-img"
        >
        <div class="card-img-overlay text-center bg-opacity-50 bg-dark d-flex flex-column justify-content-center">
          <h3 class="card-title text-warning fw-bolder">Card title</h3>
          <hr>
          <ul class="list-unstyled">
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
          <p class="card-text">$price</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card text-bg-dark overflow-hidden border-0 shadow">
        <img
          src="https://fakeimg.pl/400x300"
          class="card-img"
        >
        <div class="card-img-overlay text-center bg-opacity-50 bg-dark d-flex flex-column justify-content-center">
          <h3 class="card-title text-warning fw-bolder">Card title</h3>
          <hr>
          <ul class="list-unstyled">
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
          <p class="card-text">$price</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card text-bg-dark overflow-hidden border-0 shadow">
        <img
          src="https://fakeimg.pl/400x300"
          class="card-img"
        >
        <div class="card-img-overlay text-center bg-opacity-50 bg-dark d-flex flex-column justify-content-center">
          <h3 class="card-title text-warning fw-bolder">Card title</h3>
          <hr>
          <ul class="list-unstyled">
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
          <p class="card-text">$price</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card text-bg-dark overflow-hidden border-0 shadow">
        <img
          src="https://fakeimg.pl/400x300"
          class="card-img"
        >
        <div class="card-img-overlay text-center bg-opacity-50 bg-dark d-flex flex-column justify-content-center">
          <h3 class="card-title text-warning fw-bolder">Card title</h3>
          <hr>
          <ul class="list-unstyled">
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
          <p class="card-text">$price</p>
        </div>
      </div>
    </div>
  </article>
</section>
```

## 選單 #lokiMenu
將選單放置於輪播廣告前面，利用 Navbar 元件即可容易完成。

{% note default %}
使用 navbar 第一個範例做調整修改前置作業。
https://getbootstrap.com/docs/5.2/components/navbar/#supported-content
{% endnote %}

### 整理代碼
- 移除用不到的 search 表單、`aria-*`標籤、下拉選單 dropMenu。
- 簡化結構為`.navbar-nav>a.nav-link`並複製多個 nav-link 大約共計 5 組。
- 調整靠右方式為`.navbar-nav.ms-auto`
- 更改為 container 窄版。更改 id 名稱為#lokiMenu
- 規劃LOGO文字可用font Awesome前綴，或是使用指定LOGO圖片。
- 5 個 nav-link 使用錨點連結至各主題且加大`.mx-3`，其中 action 因設計上用不到而拔除。

```html index.html>nav
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container">
    <a
      class="navbar-brand"
      href="#"
    ><i class="fa-solid fa-campground"></i> 洛奇渡假營地</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#lokiMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse"
      id="lokiMenu"
    >
      <div class="navbar-nav ms-auto mb-2 mb-lg-0">
          <a class="nav-link mx-3" href="#lokiPallet">營位介紹</a>
          <a class="nav-link mx-3" href="#lokiPark">探索體驗</a>
          <a class="nav-link mx-3" href="#lokiService">遊客服務</a>
          <a class="nav-link mx-3" href="#lokiRule">營區守則</a>
          <a class="nav-link mx-3" href="#lokiContact">聯絡我們</a>
      </div>
    </div>
  </div>
</nav>
```

### 優化調整
- 主 nav 調整色系`nav.text-bg-dark.navbar-dark`，以及黏貼畫面上`.position-fixed.top-0.w-100`，如果疊層不夠自訂 z-index 最上方。
- 嘗試點選錨點跳躍，會因為 menu 與 section 定位上邊緣問題壓到，可以對 section 多添加`pt-5`來閃躲。
- 要產生 scrollSpy 功能，對偵測的範圍添加`[data-bs-spy="scroll"][data-bs-target="#lokiMenu"]`，這裡選body就能整頁偵測到。另多增加css特效。

```html index.html body
<body data-bs-spy="scroll" data-bs-target="#lokiMenu">
  <nav class="navbar navbar-expand-lg text-bg-dark navbar-dark position-fixed top-0 w-100">
    <div class="container">
      <a
        class="navbar-brand"
        href="#"
      ><i class="fa-solid fa-campground"></i> 洛奇渡假營地</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#lokiMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="lokiMenu"
      >
        <div class="navbar-nav ms-auto mb-2 mb-lg-0">
            <a class="nav-link mx-3" href="#lokiPallet">營位介紹</a>
            <a class="nav-link mx-3" href="#lokiPark">探索體驗</a>
            <a class="nav-link mx-3" href="#lokiService">遊客服務</a>
            <a class="nav-link mx-3" href="#lokiRule">營區守則</a>
            <a class="nav-link mx-3" href="#lokiContact">聯絡我們</a>
        </div>
      </div>
    </div>
  </nav>
  <!-- ... -->
</body>
```
```css style.css
body > nav {
  z-index: 9999;
}
#lokiMenu a.nav-link,
#lokiMenu a.navbar-brand {
  letter-spacing: 0.1rem;
  transition: 0.5s;
}

#lokiMenu a.nav-link::before {
  content: "";
  width: 1rem;
  height: 1rem;
  background: white;
  border-radius: 50%;
}

#lokiMenu a.nav-link.active {
  transform: scale(1.2);
}
```
```html index.html #lokiPallet
<section
  id="lokiPallet"
  class="container pt-5"
>
  <!-- ... -->
</section>
```

## 探索體驗 #lokiPark
第三個主題來介紹設備環境並使用大量圖片拚疊，以滿版呈現方式搭載瀑布流 Masonry 套件實施。

{% note default %}
從 card 的佈局上可看到 Masonry 插件說明，藉此引用到 Grid System 來協助處理，但這裡不使用 card 當作容器。
https://getbootstrap.com/docs/5.2/components/card/#masonry
{% endnote %}

### 整理代碼
- 延期前面的 section 複製修改為`.container-field`，調整拔除 container 轉移到內部成為`header.my-5.container`。
- 原本的 header 拔除標題效果相關 class 轉移到內部成為`h2.border-start.border-5.border-secondary.ps-3`。
- header 內多一組`div.text-center.w-75.mx-auto.py-5`作為標題內文。
- article 成為 row 容器，並考慮 RWD 呈現不同 cols 數與 gutter 值。
- col 容器內部捨棄 card 設計視覺，但保留 card-img 與 card-overlay>card-title 的蓋圖效果。
- card-img 雖然是瀑布流設計，考量整齊感其圖片高度為倍數考量。
- 若圖片為本地可使用 Bootstrap 所示範的`.row[data-masonry='{"percentPosition": true }']`。然而如果因延遲性導致（例如 fakeImg ）初始化會抓不到高度，則需改用 onload 完畢才去初始插件。建議路徑方式分離 js 代碼。
```js plugin/custom.js
// 記得 html>body 底部宣告 <script src="plugin/custom.js"></script>
onload = () => {
  var grid = document.querySelector('#lokiPark article.row');
  var msnry = new Masonry(grid, {
    percentPosition: 'true'
  });
}
```
```html index.html#lokiPark
<section id="lokiPark" class="container-field pt-5">
  <header class="my-5 container">
    <h2 class="border-start border-5 border-secondary ps-3">探索體驗</h2>
    <div class="text-center w-75 mx-auto py-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
      neque magnam totam ab doloremque dolore voluptatum quaerat quos? Commodi labore similique veniam nemo nisi saepe
      dolorem aperiam, dignissimos ipsam. Suscipit! </div>
  </header>
  <article class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2 g-md-0">
    <div class="col">
      <img
        src="https://fakeimg.pl/600x400"
        class="card-img"
      >
      <div class="card-img-overlay">
        <h5 class="card-title">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/600x800"
        class="card-img"
      >
      <div class="card-img-overlay">
        <h5 class="card-title">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/1200x800"
        class="card-img"
      >
      <div class="card-img-overlay">
        <h5 class="card-title">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/300x400"
        class="card-img"
      >
      <div class="card-img-overlay">
        <h5 class="card-title">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/600x800"
        class="card-img"
      >
      <div class="card-img-overlay">
        <h5 class="card-title">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/600x400"
        class="card-img"
      >
      <div class="card-img-overlay">
        <h5 class="card-title">Lorem, ipsum dolor.</h5>
      </div>
    </div>
  </article>
</section>
<script src="plugin/custom.js"></script>
```

### 優化調整
- 使文字透過 flex 置中，父容器增添為`div.card-img-overlay.d-flex.justify-content-center.align-items-center`。
- 文字本身做膠囊化設計，調整為`.card-title.text-bg-warning.opacity-75.rounded-pill.px-3.py-2`。
- 只對 md 模式提供互動，而手機螢幕小不適合互動。同樣利用 query 達成。
- 因互動而產生空間擠壓，對增添為`section#lokiPark.overflow-hidden`。
- 增加背景且固定，透過混和染上白色。
- 注意到整個 section 下方都不足空間，透過偽類非 slider 的都要增添 pb120。

```css plugin/style.css
@media screen and (min-width: 768px) {
  #lokiPallet .card-img {
    transition: 0.3s;
  }
  #lokiPallet .card:hover .card-img {
    transform: scale(1.3);
  }
  #lokiPark .col {
    transition: 0.3s;
  }
  #lokiPark .col:hover {
    transform: scale(1.15);
    z-index: 99;
  }
  #lokiPark .col .card-img {
    opacity: 0.5;
    transition: 0.3s;
  }
  #lokiPark .col:hover .card-img {
    opacity: 1;
  }
}
#lokiPark {
  background: url("https://picsum.photos/1920/1800/?random=10"),
    #fff8 no-repeat center/cover;
  background-attachment: fixed;
  background-blend-mode: lighten;
}
#lokiPark .card-title {
  opacity: 1 !important;
}

section:not(#lokiSlider){
  padding-bottom: 120px;
}
```
```html index.html#lokiParkt
<section id="lokiPark" class="overflow-hidden container-fluid pt-5">
  <header class="my-5 container">
    <h2 class="border-start border-5 border-secondary ps-3">探索體驗</h2>
    <div class="text-center w-75 mx-auto py-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
      neque magnam totam ab doloremque dolore voluptatum quaerat quos? Commodi labore similique veniam nemo nisi saepe
      dolorem aperiam, dignissimos ipsam. Suscipit! </div>
  </header>
  <article class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2 g-md-0">
    <div class="col">
      <img
        src="https://fakeimg.pl/600x400"
        class="card-img"
      >
      <div class="card-img-overlay d-flex justify-content-center align-items-center">
        <h5 class="card-title text-bg-warning opacity-75 rounded-pill px-3 py-2">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/600x800"
        class="card-img"
      >
      <div class="card-img-overlay d-flex justify-content-center align-items-center">
        <h5 class="card-title text-bg-warning opacity-75 rounded-pill px-3 py-2">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/1200x800"
        class="card-img"
      >
      <div class="card-img-overlay d-flex justify-content-center align-items-center">
        <h5 class="card-title text-bg-warning opacity-75 rounded-pill px-3 py-2">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/300x400"
        class="card-img"
      >
      <div class="card-img-overlay d-flex justify-content-center align-items-center">
        <h5 class="card-title text-bg-warning opacity-75 rounded-pill px-3 py-2">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/600x800"
        class="card-img"
      >
      <div class="card-img-overlay d-flex justify-content-center align-items-center">
        <h5 class="card-title text-bg-warning opacity-75 rounded-pill px-3 py-2">Lorem, ipsum dolor.</h5>
      </div>
    </div>
    <div class="col">
      <img
        src="https://fakeimg.pl/600x400"
        class="card-img"
      >
      <div class="card-img-overlay d-flex justify-content-center align-items-center">
        <h5 class="card-title text-bg-warning opacity-75 rounded-pill px-3 py-2">Lorem, ipsum dolor.</h5>
      </div>
    </div>
  </article>
</section>
```

## 遊客服務 #lokiService
本主題採用 price card 的版型來規劃。並以黑色主題來襯托配色。除了仍使用 grid systm，還需要借用 card 做模改。

{% note default %}
使用標準 card 來設計
https://getbootstrap.com/docs/5.2/components/card/#grid-cards

為了使其齊高，從 Grid Card 介紹得知，重點為指定高度 h-100 為條件。
https://getbootstrap.com/docs/5.2/components/card/#grid-cards
{% endnote %}

### 整理代碼
- 從前列 section 複製出一組，row 規劃 cols-md-3 與 cols-1 來做 RWD，注意 gutter 的調整。
- 內部為 card 且 h-100 的項目。card 設定 text-bg-dark、rounded-0 消除圓角、增加 shadow、展開 p-3。
- 規劃 card-header.text-center 置中，放入 h3.card-title 標題 與 img.round-circle 圓形圖
- 同上，img 規劃 border 與 border-secondary 框線，可累加 m-3 增加空間感。

```html index.html#lokiService
<section
  id="lokiService"
  class="container pt-5"
>
  <header class="h2 my-5 border-start border-5 border-secondary ps-3">遊客服務</header>
  <article class="row row-cols-1 row-cols-md-3 gy-3">
    <div class="col">
      <div class="card h-100 text-bg-dark rounded-0 shadow-lg py-3">
        <div class="card-header text-center">
          <h3 class="card-title">Card title</h3>
          <img
            src="https://picsum.photos/150/150/?random=10"
            class="rounded-circle border border-secondary border-3 m-3"
          >
        </div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a
            href="#"
            class="card-link"
          >Another link</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100 text-bg-dark rounded-0 shadow-lg py-3">
        <div class="card-header text-center">
          <h3 class="card-title">Card title</h3>
          <img
            src="https://picsum.photos/150/150/?random=10"
            class="rounded-circle border border-secondary border-3 m-3"
          >
        </div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis praesentium cum excepturi quis ut sequi ipsam, delectus nulla suscipit nostrum, magnam saepe cupiditate eum accusantium, rerum fugit quas aliquid repudiandae.</p>
          <a
            href="#"
            class="card-link"
          >Another link</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100 text-bg-dark rounded-0 shadow-lg py-3">
        <div class="card-header text-center">
          <h3 class="card-title">Card title</h3>
          <img
            src="https://picsum.photos/150/150/?random=10"
            class="rounded-circle border border-secondary border-3 m-3"
          >
        </div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a
            href="#"
            class="card-link"
          >Another link</a>
        </div>
      </div>
    </div>
  </article>
</section>
```

### 優化調整
- 調整背景圖片，異動原本 section 的 container 到 header 與 article 內。多增加 overflow 來內部修正 header 的 mr 錯位。
- 因為`.container>.row>.col`條件，多一組`div.row`來扮演層級角色。
- 調整文字色系，修改 header 所有配合包含 text 與 border。
- 規劃提供豐富的內容版型收費描述，使用 badge 作為價格標籤，可以列表清單、文字描述、組合型清單。
- card-text 的用途已不存在，可以拔除改成 ul>li、p 用途，注意 px 空間上的一致性。以及注意 badge 在不同位置的規劃並搭配 padding 微調。
- 參考前 bg 的混色 css 作法，用暗色混和的效果去填塞。

```css plugin/style.css
#lokiService {
  background: url("https://picsum.photos/1920/1800/?random=11"),
    #0008 no-repeat center/cover;
  background-attachment: fixed;
  background-blend-mode: darken;
}
```
```html index.html#lokiService
<section
  id="lokiService"
  class="overflow-hidden text-white pt-5"
>
  <header class="container h2 my-5 border-start border-5 border-white ps-3">遊客服務</header>
  <article class="container">
    <div class="row row-cols-1 row-cols-md-3 gy-3">
      <div class="col">
        <div class="card h-100 text-bg-dark rounded-0 shadow-lg py-3">
          <div class="card-header text-center">
            <h3 class="card-title">Card title</h3>
            <img
              src="https://picsum.photos/150/150/?random=10"
              class="rounded-circle border border-secondary border-3 m-3"
            >
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-info">Card subtitle</h6>
            <ul class="ps-4">
              <li class="py-1 d-flex justify-content-between align-items-start">
                <div>
                  <div class="fw-bold">Subheading</div> Content for list item
                </div>
                <span class="badge bg-info rounded-pill">NT 200</span>
              </li>
              <li class="py-1 d-flex justify-content-between align-items-start">
                <div>
                  <div class="fw-bold">Subheading</div> Content for list item
                </div>
                <span class="badge bg-info rounded-pill">NT 200</span>
              </li>
              <li class="py-1 d-flex justify-content-between align-items-start">
                <div>
                  <div class="fw-bold">Subheading</div> Content for list item
                </div>
                <span class="badge bg-info rounded-pill">NT 200</span>
              </li>
              <li class="py-1 d-flex justify-content-between align-items-start">
                <div>
                  <div class="fw-bold">Subheading</div> Content for list item
                </div>
                <span class="badge bg-info rounded-pill">NT 200</span>
              </li>
              <li class="py-1 d-flex justify-content-between align-items-start">
                <div>
                  <div class="fw-bold">Subheading</div> Content for list item
                </div>
                <span class="badge bg-info rounded-pill">NT 200</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 text-bg-dark rounded-0 shadow-lg py-3">
          <div class="card-header text-center">
            <h3 class="card-title">Card title</h3>
            <img
              src="https://picsum.photos/150/150/?random=10"
              class="rounded-circle border border-secondary border-3 m-3"
            >
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-warning d-flex justify-content-between align-items-start"> Card
              subtitle <span class="badge bg-warning rounded-pill">NT 200</span>
            </h6>
            <p class="ps-4">Some quick example text to build on the card title and make up the bulk of the card's
              content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis praesentium cum excepturi
              quis ut sequi ipsam, delectus nulla suscipit nostrum, magnam saepe cupiditate eum accusantium, rerum
              fugit quas aliquid repudiandae.</p>
            <h6 class="card-subtitle mb-2 text-warning d-flex justify-content-between align-items-start"> Card
              subtitle <span class="badge bg-warning rounded-pill">NT 200</span>
            </h6>
            <p class="ps-4">Some quick example text to build on the card title and make up the bulk of the card's
              content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis praesentium cum excepturi
              quis ut sequi ipsam, delectus nulla suscipit nostrum, magnam saepe cupiditate eum accusantium, rerum
              fugit quas aliquid repudiandae.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 text-bg-dark rounded-0 shadow-lg py-3">
          <div class="card-header text-center">
            <h3 class="card-title">Card title</h3>
            <img
              src="https://picsum.photos/150/150/?random=10"
              class="rounded-circle border border-secondary border-3 m-3"
            >
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-success d-flex justify-content-between align-items-start"> Card
              subtitle <span class="badge bg-success rounded-pill">NT 200</span>
            </h6>
            <ul class="list-group px-4 mb-3">
              <li class="py-1"> Content for list item </li>
            </ul>
            <h6 class="card-subtitle mb-2 text-success d-flex justify-content-between align-items-start"> Card
              subtitle <span class="badge bg-success rounded-pill">NT 200</span>
            </h6>
            <ul class="list-group px-4 mb-3">
              <li class="py-1"> Content for list item </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </article>
</section>
```

## 營區守則 #lokiRule
簡約的使用 cols-2 布局，左側為手風琴右側為圖片。考慮手機排版，可以沿用前面出現的 flex-row-reverse

{% note default %}
使用手風琴效果能協助我們呈現動態特效。
https://getbootstrap.com/docs/5.2/components/accordion/#example
{% endnote %}

### 整理代碼
1. 沿用前面的 section#lokiPallet，可以檢查並移除一些用不到的 class。
2. 利用 flex-row-reverse 幫助我們圖片在 md 時於右側，否則為上側（手機模式）`.
3. 拔除 aria-*以及更名 according 所有 id。
4. button 有 foucs 特性效果，可以使用`h2.btn`來替換，以及能跟上層合併成`h2.accordion-header.accordion-button.btn`不受影響。

```html index.html#lokiRule
<section
  id="lokiRule"
  class="container pt-5"
>
  <header class="h2 my-5 border-start border-5 border-secondary ps-3">營區守則</header>
  <article class="row row-cols-1 row-cols-md-2 flex-row-reverse gy-3">
    <div class="col">
      <img
        src="https://picsum.photos/800/600/?random=10"
        class="img-thumbnail img-fluid p-2"
      >
    </div>
    <div
      class="accordion col"
      id="lokiAccordion"
    >
      <div class="accordion-item">
        <h2
          class="accordion-header accordion-button btn"
          data-bs-toggle="collapse"
          data-bs-target="#lokiItem1"
        > Accordion Item #1 </h2>
        <div
          id="lokiItem1"
          class="accordion-collapse collapse show"
          data-bs-parent="#lokiAccordion"
        >
          <div class="accordion-body"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam inventore in
            unde aspernatur exercitationem. Sed magni odit ut porro! Impedit sapiente dignissimos nihil corporis,
            corrupti perspiciatis iure odio esse. </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2
          class="accordion-header accordion-button collapsed btn"
          data-bs-toggle="collapse"
          data-bs-target="#lokiItem2"
        > Accordion Item #2 </h2>
        <div
          id="lokiItem2"
          class="accordion-collapse collapse"
          data-bs-parent="#lokiAccordion"
        >
          <div class="accordion-body"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam inventore in
            unde aspernatur exercitationem. Sed magni odit ut porro! Impedit sapiente dignissimos nihil corporis,
            corrupti perspiciatis iure odio esse. </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2
          class="accordion-header accordion-button collapsed btn"
          data-bs-toggle="collapse"
          data-bs-target="#lokiItem3"
        > Accordion Item #3 </h2>
        <div
          id="lokiItem3"
          class="accordion-collapse collapse"
          data-bs-parent="#lokiAccordion"
        >
          <div class="accordion-body"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam inventore in
            unde aspernatur exercitationem. Sed magni odit ut porro! Impedit sapiente dignissimos nihil corporis,
            corrupti perspiciatis iure odio esse. </div>
        </div>
      </div>
    </div>
  </article>
</section>
```

### 優化調整
- 拔除 according 的框線使用`.accordion.accordion-flush`。
- item 的間格加大、改成圓角特大、以及內部的 bg 會超出所以溢出處理、再弄點陰影。整題呈現`accordion-item.my-3.overflow-auto.rounded-5.shadow-sm`。
- 標題前面增加 fontawsone icon，以及 me-2 推開文字距離。

```html index.html#lokiRule
<section
  id="lokiRule"
  class="container pt-5"
>
  <header class="h2 my-5 border-start border-5 border-secondary ps-3">營區守則</header>
  <article class="row row-cols-1 row-cols-md-2 flex-row-reverse gy-3">
    <div class="col">
      <img
        src="https://picsum.photos/800/600/?random=10"
        class="img-thumbnail img-fluid p-2"
      >
    </div>
    <div
      class="accordion col accordion-flush"
      id="lokiAccordion"
    >
      <div class="accordion-item my-3 overflow-auto rounded-5 shadow-sm">
        <h2
          class="accordion-header accordion-button btn"
          data-bs-toggle="collapse"
          data-bs-target="#lokiItem1"
        ><i class="fa-regular fa-circle-question me-2"></i>Accordion Item #1 </h2>
        <div
          id="lokiItem1"
          class="accordion-collapse collapse show"
          data-bs-parent="#lokiAccordion"
        >
          <div class="accordion-body"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam inventore in
            unde aspernatur exercitationem. Sed magni odit ut porro! Impedit sapiente dignissimos nihil corporis,
            corrupti perspiciatis iure odio esse. </div>
        </div>
      </div>
      <div class="accordion-item my-3 overflow-auto rounded-5 shadow-sm">
        <h2
          class="accordion-header accordion-button collapsed btn"
          data-bs-toggle="collapse"
          data-bs-target="#lokiItem2"
        ><i class="fa-regular fa-circle-question me-2"></i>Accordion Item #2 </h2>
        <div
          id="lokiItem2"
          class="accordion-collapse collapse"
          data-bs-parent="#lokiAccordion"
        >
          <div class="accordion-body"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam inventore in
            unde aspernatur exercitationem. Sed magni odit ut porro! Impedit sapiente dignissimos nihil corporis,
            corrupti perspiciatis iure odio esse. </div>
        </div>
      </div>
      <div class="accordion-item my-3 overflow-auto rounded-5 shadow-sm">
        <h2
          class="accordion-header accordion-button collapsed btn"
          data-bs-toggle="collapse"
          data-bs-target="#lokiItem3"
        ><i class="fa-regular fa-circle-question me-2"></i>Accordion Item #3 </h2>
        <div
          id="lokiItem3"
          class="accordion-collapse collapse"
          data-bs-parent="#lokiAccordion"
        >
          <div class="accordion-body"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam inventore in
            unde aspernatur exercitationem. Sed magni odit ut porro! Impedit sapiente dignissimos nihil corporis,
            corrupti perspiciatis iure odio esse. </div>
        </div>
      </div>
    </div>
  </article>
</section>
```

## 聯絡我們 lokiContact
這裡簡單設計整合至 Google 表單（你可以選擇 iframe 方式整合個人網站，但視覺美感不推薦），若未來若接觸 JS 與 PHP 進階課程再指導如何串接後台資料庫。這裡提供兩種方式完成。

### 初始準備
請至 Google Form 設計需要的表單題目，未來用戶透過網站填寫表單將回歸到 Google 表單來協助紀錄，如此就不需要後台即可完成具備聯絡表單的需求。本教學不多介紹，請準備至以下畫面所需欄位。
![Google Form](https://i.imgur.com/GmRkJXK.png)

### 方式一：透過 Formfacade 免費插件完成
- 規劃完成 Google 表單時，點選外掛程式搜尋 Formfacade 進行安裝並同意連結授權。免費版下跟隨指令步驟取得 script（採用 Bootstrap 的格式）。
- 由於免費版沒有提供直覺樣式參數，僅能透過自訂 css 完成設計。
- 完成設計如下：
![demo](https://i.imgur.com/yQYVAMb.png)

```html index#lokiContact
<section id="lokiContact">
    <div
      id="ff-compose"
      class="container text-white"
    ></div>
    <script
      async
      defer
      src="https://formfacade.com/include/104718054880738559461/form/1FAIpQLScpJE5jF4yPo2bu2zxqkmr-04lSQanuOfqTEoezBYHzU7ojjA/clean.js?div=ff-compose"
    ></script>
  </section>
```
```css style.css
#lokiContact {
  background: url("https://picsum.photos/1920/1080/?random=10"),
    #000 no-repeat center/cover;
  background-attachment: fixed;
  background-blend-mode: luminosity;
}

#lokiContact #ff-compose {
  padding-top: 120px;
}

#lokiContact .ff-form {
  backdrop-filter: blur(10px);
  background: rgb(255, 193, 7, 0.3);
  border-radius: 5px;
}

#lokiContact #ff-title-root {
  margin: 3rem 0;
  border-left: 5px solid white;
  font-size: 2rem;
  padding: 0 0 0 1rem;
}
```
### 方式二：手動對接 form action 與 field name
此方法參考自 [Youtube](https://www.youtube.com/watch?v=_gsZbIIMS7w&ab_channel=TrabantTechnologyPartners) 教學，提供此方法不做詳細教學，可自行搭配 Bootstrap Form 自行設計。
- 透過 Google Form 選擇`取得預先填入的連結`，任意填寫資料後按下複製 URL 代碼。
- 整理 URL，其中包含了`entry. 數字`=你剛任意填寫的資料，這裡的`entry. 數字`就是明碼下的 field name。
- 回到自訂的頁面表格欄位更改 name 參數，action 的位置為表單填寫之處，但尾綴需要為`/formResponse`
- 由於 Google 預先會轉頁，最好使用開啟新頁方式。舉例代碼如下：
```html
<form
  action="https://docs.google.com/forms/d/e/1FAIpQLScpJE5jF4yPo2bu2zxqkmr-04lSQanuOfqTEoezBYHzU7ojjA/formResponse"
  target="_blank"
>
  <input
    type="text"
    name="entry.411362954"
  >
  <input
    type="text"
    name="entry.1734230940"
  >
  <input
    type="date"
    name="entry.314005902"
  >
  <input
    type="date"
    name="entry.1931529426"
  >
  <input type="submit" value="send">
</form>
```

## 頁尾資訊 footer
頁尾資訊不屬於選單項目之一，提供一些商家基本資訊使用。使用基本元件觀念來完成設計即可。

### 整理代碼 
- 使用 footer 標籤並提供黑底白字設計`text-bg-dark`
- 分為兩區塊，上半部再多一個`.bg-light.bg-opacity-25`區塊，下半部就作為頁尾字串。
- 下半部使用`.text-muted.text-center`，再增加`py-3`推開間格。
- 上半部有 img 跟 container，img 使用`.position-absolute`對齊上層左下（因此上層需要綁 relative)，如果會跟 container 鄰居打架，鄰居可以綁 relative。
- container 均分成`.col*3`三組
   - 第一組為網站名稱與項目。li 與 fontawsone 對齊方式 [參考官方說明](https://fontawesome.com/v5/docs/web/style/lists)。
   - 第一組可添加 fake btn of a-link，賦予 rounded-circle 與 inline 排列，圖案置中可用 flex，並綁定正寬高來使尺寸一致。
   - 第二組擺放任何文字
   - 第三組使用 googleMap 來設計，利用 BS 的強制比例幫助我們鎖定 1:1
   - 第三組多設計 border 視覺美觀

```html index.html footer
<footer class="text-bg-dark">
  <div class="bg-light bg-opacity-25 overflow-hidden position-relative">
    <img
      src="media/camp.svg"
      class="position-absolute start-0 top-0" style="max-width:400px"
    >
    <div class="container py-5 lh-lg position-relative">
      <div class="row g-5">
        <div class="col-md-6 col-lg-4">
          <h5>泰山溫泉度假營地</h5>
          <ul class="fa-ul">
            <li><span class="fa-li"><i class="fa-solid fa-location-dot"></i></span>243 新北市泰山區貴子里致遠新村 55 之 1 號 </li>
            <li><span class="fa-li"><i class="fa-solid fa-phone"></i></span>02-2901-8274</li>
            <li><span class="fa-li"><i class="fa-solid fa-print"></i></span>02-2908-4773 </li>
            <li><span class="fa-li"><i class="fa-solid fa-envelope"></i></span>service@toyugi.com.tw</li>
          </ul>
          <a
            class="btn btn-primary rounded-circle d-inline-flex justify-content-center align-items-center mx-1 fs-5"
            style="width:2.5rem;height:2.5rem"
            link="#"
          ><i class="fa-brands fa-facebook-f"></i></a>
          <a
            class="btn btn-danger rounded-circle d-inline-flex justify-content-center align-items-center mx-1 fs-5"
            style="width:2.5rem;height:2.5rem"
            link="#"
          ><i class="fa-brands fa-youtube"></i></a>
          <a
            class="btn btn-success rounded-circle d-inline-flex justify-content-center align-items-center mx-1 fs-4"
            style="width:2.5rem;height:2.5rem"
            link="#"
          ><i class="fa-brands fa-line"></i></a>  
        </div>
        <div class="col-md-6 col-lg-4">
          <h5>自行開車</h5>
          <p> 高速公路五股交流道下（往新莊、泰山），經新五路至新北大道右轉，直行至貴子路口右轉，貴子路直行至明志路左轉。於明志路繼續前行約 100 公尺右轉工專路，即可抵達明科技大學。 </p>
          <p> 由台北車站走忠孝橋，直行高架道路，下到平面道路之後直行至貴子路口右轉，貴子路直行至明志路左轉，於明志路繼續前行約 100 公尺右轉工專路，即可抵達明科技大學。 明志科大「汽車」停車費 30
            元/小時，請儘量搭乘大眾交通工具或機車（免停車費）。 </p>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="ratio ratio-1x1">
            <iframe
              class="border border-5 border-secondary rounded-circle"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7020090599085!2d121.41729491546742!3d25.04418494403601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7bed3dc9b59%3A0x57e6439a2db0fa2a!2zMjQz5paw5YyX5biC5rOw5bGx5Y2A5rOw5bGx6IG36KiT5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1665497547856!5m2!1szh-TW!2stw"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-muted py-3 text-center">
    <small class="container"> 泰山職業訓練中心課程教材編譯 <br>Copyright © 2022 <span class="text-white">洛奇數位設計</span>. all rights
      reserved </small>
  </div>
</footer>
```

## END