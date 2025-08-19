---
title: "[基礎課程] HTML 基礎新手大全"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - HTML5
  - 前端入門
date: 2025-07-01 18:45:42
---

![](assets/images/banner/html5.png)

這是一份專為 HTML 初學者設計的基礎教材，涵蓋從零開始的 HTML 學習路徑。如果你已經具備基本的 HTML 概念與標籤使用經驗，建議可以直接跳過本篇內容。

<!-- more -->

# HTML 的結構觀念
HTML 是一種標記語言（Markup Language），使用元素（element）來描述網頁的結構和內容。每個 HTML 元素由開始標籤（opening tag）和結束標籤（closing tag）組成，例如 `<body>HTML 內容</body>` 就定義了網頁的主體內容區域。HTML 文件就是由這些標籤元素所組成的結構化文件，可以是單一元素或巢狀結構，這些標籤組合起來就形成了網頁的 HTML 原始碼。

目前主流的 HTML 規格是 HTML5，它提供了更豐富的語義化標籤、更好的效能表現以及更完整的功能支援。不過需要注意的是，較舊的瀏覽器（如 Internet Explorer 11 以下版本）可能無法完全支援 HTML5 的新功能，這是因為瀏覽器需要理解 HTML 語法才能正確解析和渲染網頁。隨著 HTML 規格的不斷演進，新的元素和屬性被定義出來，如果瀏覽器沒有更新到支援這些新規格的版本，就無法正確處理這些新的 HTML 語法。

當你在瀏覽器中輸入網址並按下 Enter 時，會發生以下步驟：

1. 瀏覽器解析網址，向目標伺服器發送 HTTP 請求，要求取得網頁資料。
2. 伺服器回應並回傳 HTML 文件（通常是 `.html` 格式）。
3. 瀏覽器接收 HTML 文件後，開始解析所有的 HTML 元素標籤，並將解析結果渲染成視覺化的網頁畫面。
4. 最終你看到的是經過瀏覽器渲染後的網頁，而不是原始的 HTML 程式碼。

接下來，本教學將以 HTML5 為主要介紹內容，並使用 VSCode 編輯器和 Chrome 瀏覽器作為開發環境。如果你還不熟悉 VSCode，可以參考本站的其他相關文章。

## 寫出第一個 HTML
請試著輸入以下文字，並透過瀏覽器去讀取

{% note info %}
  **小技巧：關於 Emmet**
  在 VSCode 內建立 `index.html` 完成後，試著輸入 <kbd>!</kbd> 得到畫面提示時，按下 <kbd>TAB</kbd> 可以快速生成基本的 HTML 結構，這是 VSCode 內建了 [Emmet](https://docs.emmet.io/) 快速編寫指令。
{% endnote%}

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>網頁的標題名稱</title>
</head>
<body>
  <p>我的第一個 HTML 畫面</p>
</body>
</html>
```

從上面我們逐步說明各標籤元素代表什麼意思：

- `<!DOCTYPE html>`
  宣告此文件為 HTML5 文件類型，告訴瀏覽器使用 HTML5 標準來解析此文件
- `<html lang="zh-TW">`
  根元素，包含整個 HTML 文件。`lang="zh-TW"` 屬性指定文件的主要語言為繁體中文（台灣），有助於瀏覽器正確處理文字、語音合成和翻譯功能
- `<head></head>`
  文件頭部區域，包含文件的後設資料（metadata），如標題、字元編碼、視窗設定等，不會在頁面上顯示
- `<meta charset="UTF-8">`
  指定文件字元編碼為 UTF-8，確保中文字符能正確顯示
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  設定視窗大小，讓網頁在行動裝置上能正確顯示
- `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
  強制 Internet Explorer 使用最新的渲染引擎，避免使用相容性模式
- `<title></title>`
  設定網頁標題，會顯示在瀏覽器分頁和書籤中
- `<body></body>`
  文件主體區域，包含所有會在頁面上顯示的內容
- `<p></p>`
  段落元素，用於包裝文字內容，預設會有上下邊距

  `<html>`+`<head>`+`<body>`都不可缺少，良好的 HTML 結構對於網頁的可讀性、可維護性和搜尋引擎優化（SEO）都很重要。雖然現代瀏覽器具有錯誤修正能力，但仍建議遵循標準的 HTML 語法，確保網頁能在各種環境下正確顯示。

> meta 標籤的總類非常多，詳細內容可從 [這裡](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) 得知

{% note info %}
  **小技巧：註解方式**
  HTML 的註解方式為`<!-- text -->`，text 這個文字就會被跳過不被瀏覽器所處理，所以透過註解的方式做任何筆記或說明。
{% endnote%}

## 標籤規則與特性
標籤本身有語意上的重要性，間接影響到結構及搜尋引擎優化（SEO）。這裡初步了解標籤怎麼去標記內容（文字、圖片、影片），以及如何組成網頁結構上一部分。

- 標籤不分大小寫，請用小寫。
- `<>`開始，`</>`結束。
- 標籤具有屬性與值的特性。
- 少數獨立標籤是沒有結尾標籤（空標籤），例如 `<meta>`、`<link>`、`<br>`、`<hr>`、`<img>`

```html index.html
<!-- 
  有個 a 標籤，它標記了 Google 這文字，
  它的屬性 href(Hypertext Reference) 告訴我們要前往的位置，
  它的值是 "http://www.google.com"。 
-->
<a href="http://www.google.com">Google</a>

<!-- 空標籤 -->
<!-- input:'fakeimg' -->
<img src="https://fakeimg.pl/500x300">
<!-- input:'picsum' -->
<img src="https://picsum.photos/500/300/?random=2">
```

{% note info %}
  **小技巧：VSCode 外掛程式 假圖產生器**
  使用外掛程式 `Fake Image Snippet Collection` 能幫助你快速產生圖片檔。輸入 fakeimg 或 picsum 並指定寬高即可使用。
{% endnote%}

## 絕對與相對路徑
既然談到圖片跟超連結那就需要知道路徑。當你的資源來源是外部位置時，很簡單給他一個 http 位置的絕對路徑。但如果是內部路徑，我們就需要知道相對的路徑在哪裡。

**絕對路徑**
一般在連結外部連結、網路上的資源時使用，當然你也可以當內部連結使用，但效能就是差且不可變動性。
- `http://網域名稱/資料夾名稱/資料夾名稱/檔案名稱`

**相對路徑**
從目前使用的檔案位置為判斷處來找到目標檔案的位置，通常製作網站取得內部檔案或多媒體時使用。

**相對路徑的寫法：**

- `images/01.jpg` 
  目前檔案位置為起點，往下探尋 images 資料夾中的 01.jpg 檔案
- `./images/01.jpg` 
  與上面相同，`./` 表示當前目錄，明確指出從當前檔案位置開始尋找
- `../` 
  回上一層目錄，例如：`../images/01.jpg` 表示回到上一層目錄後再進入 images 資料夾
- `/` 
  從網站根目錄開始找，例如：`/images/01.jpg` 表示從網站根目錄開始尋找 images 資料夾

**實際範例：**
假設你的檔案結構如下：

```
website/
├── index.html
├── about.html
├── pages/
│   ├── contact.html
│   └── products.html
├── images/
│   ├── logo.png
│   ├── banner.jpg
│   └── gallery/
│       ├── photo1.jpg
│       └── photo2.jpg
└── css/
    └── style.css
```

**在 index.html 中的路徑寫法：**
```html
<!-- 同層檔案 -->
<a href="about.html">關於我們</a>

<!-- 下層資料夾中的檔案 -->
<a href="pages/contact.html">聯絡我們</a>
<img src="images/logo.png" alt="網站標誌">

<!-- 更深層的檔案 -->
<img src="images/gallery/photo1.jpg" alt="照片 1">
```

**在 pages/contact.html 中的路徑寫法：**
```html
<!-- 回到上層的檔案 -->
<a href="../index.html">回首頁</a>
<a href="../about.html">關於我們</a>

<!-- 同層檔案 -->
<a href="products.html">產品介紹</a>

<!-- 上層資料夾中的其他檔案 -->
<img src="../images/logo.png" alt="網站標誌">
<img src="../images/gallery/photo2.jpg" alt="照片 2">
```

**使用根目錄路徑：**
```html
<!-- 無論在哪個檔案中，都可以使用根目錄路徑 -->
<a href="/index.html">首頁</a>
<a href="/pages/contact.html">聯絡我們</a>
<img src="/images/logo.png" alt="網站標誌">
```

## 置換元素
置換元素（Replaced elements）是指元素的內容（content）會被置換成某些外部內容，而非由 HTML 本身產生的內容。

### 什麼是置換元素？
置換元素是指瀏覽器會根據元素的屬性來決定顯示內容的元素。這些元素的實際內容不是由 HTML 標籤內的文字決定，而是由外部資源或瀏覽器的內建行為決定。

### 常見的置換元素：
- **img**：必須依靠 `src` 屬性指向圖片檔案才有意義，瀏覽器會載入並顯示該圖片
- **input**：根據 `type` 屬性決定顯示為文字框、按鈕、複選框、單選框等不同形式
- **video**：需要 `src` 屬性指向影片檔案
- **audio**：需要 `src` 屬性指向音訊檔案
- **iframe**：需要 `src` 屬性指向外部網頁
- **textarea**：預設有固定尺寸的文字區域

### 置換元素的特性：
1. **具有內建尺寸**：置換元素通常有預設的寬度和高度
2. **可設定尺寸**：可以透過 CSS 的 `width` 和 `height` 屬性調整大小
3. **margin 置中效果**：當設定 `display: block` 時，可以使用 `margin: 0 auto` 進行水平置中

### 與非置換元素的差異：
- **非置換元素**（如 `<div>`、`<p>`、`<span>`）：內容由 HTML 標籤內的文字產生
- **置換元素**：內容由外部資源或瀏覽器內建行為產生

# Tag 標籤
標籤命名是讓瀏覽器曉得該提供何種處理預覽方式，舉例標題還是文字，表格還是圖片，換行還是水平線，這些都是標籤所宣告出來的。標籤的類型非常難以全部舉例，這裡只舉例一些常用且基礎的標籤做練習介紹。

{% blockquote MDN https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element %}
如果你有一些想確認或查詢的標籤，養成好習慣上網路搜尋並到官方網站尋找文件說明。
{% endblockquote %}

## 標題與段落
HTML 中最基礎的文字結構標籤，用於建立網頁的層次結構和內容組織。

### 標題標籤 (h1 ~ h6)
標題標籤用於定義網頁的標題層級，從 `<h1>` 到 `<h6>` 共有 6 個層級：

- **h1**：最高層級標題，通常用於頁面主標題，每個頁面建議只使用一個
- **h2**：次級標題，用於主要區段的標題
- **h3**：三級標題，用於子區段的標題
- **h4**：四級標題，用於更細分的內容標題
- **h5**：五級標題，較少使用
- **h6**：最低層級標題，最不常用

```html
<!-- 標題 Heading or Header -->
<h1>網站主標題</h1>
<h2>章節標題</h2>
<h3>子章節標題</h3>
<h4>小節標題</h4>
<h5>子小節標題</h5>
<h6>最小層級標題</h6>

<!-- 實際應用範例 -->
<h1>HTML 基礎教學</h1>
<h2>什麼是 HTML？</h2>
<h3>HTML 的歷史</h3>
<h4>HTML5 的特色</h4>
<h2>HTML 標籤介紹</h2>
<h3>基本標籤</h3>
<h4>標題標籤</h4>
<h4>段落標籤</h4>
```

標題標籤具有語意化意義，不僅影響視覺呈現，也對搜尋引擎優化（SEO）和無障礙存取有重要影響。瀏覽器會根據標題層級自動調整字體大小、粗細和行距，但這些樣式可以透過 CSS 自訂。

### 段落標籤 (p)
段落標籤用於定義文字段落，是網頁內容的基本組成單位：

- 瀏覽器會自動在段落前後添加適當的間距
- 段落內的文字會自動換行
- 每個段落都是獨立的區塊元素
- 適合用於長篇文字內容的組織

```html
<!-- 段落 paragraph -->
<p>這是第一個段落。段落標籤會自動在前後添加適當的間距，讓文字內容更易閱讀。</p>
<p>這是第二個段落。每個段落都是獨立的區塊元素，可以包含大量的文字內容。</p>

<!-- 實際應用範例 -->
<h2>關於我們</h2>
<p>我們是一家專業的網頁設計公司，致力於為客戶提供最優質的網頁設計服務。</p>
<p>我們的團隊擁有豐富的經驗，能夠根據客戶的需求，設計出符合品牌形象的網站。</p>
<p>如果您有任何問題或需求，歡迎隨時與我們聯繫。</p>
```

### 連結標籤 (a)
連結標籤是網頁導航的核心元素，用於建立超連結：

- **href 屬性**：指定連結目標，可以是 URL、檔案路徑或頁面錨點
- **target 屬性**：控制連結開啟方式（如 `_blank` 在新視窗開啟）
- **語意化**：連結應該具有描述性的文字內容
- **無障礙性**：應提供清晰的連結描述

```html
<!-- 基本連結用法 -->
<a href="https://www.google.com">Google 搜尋引擎</a>
<a href="https://www.google.com" target="_blank">在新視窗開啟 Google</a>

<!-- 內部連結 -->
<a href="about.html">關於我們</a>
<a href="contact.html">聯絡我們</a>

<!-- 錨點連結 -->
<a href="#section1">跳到第一章節</a>
<a href="#section2">跳到第二章節</a>
<a href="#top">回到頁首</a>

<!-- 郵件連結 -->
<a href="mailto:info@example.com">發送郵件給我們</a>

<!-- 電話連結 -->
<a href="tel:+886-2-1234-5678">撥打電話</a>

<!-- 錨點目標設定 -->
<h2 id="section1">第一章節</h2>
<p>這是第一章節的內容。..</p>

<h2 id="section2">第二章節</h2>
<p>這是第二章節的內容。..</p>
```

### 其他常用文字結構標籤

- **br**：強制換行，用於在段落內插入換行
- **hr**：水平分隔線，用於視覺上分隔內容區塊
- **marquee**：跑馬燈效果（已過時，不建議使用）

```html
<!-- 換行和分隔線 -->
<p>第一行文字<br>第二行文字<br>第三行文字</p>

<h2>第一個主題</h2>
<p>第一個主題的內容。..</p>

<hr>

<h2>第二個主題</h2>
<p>第二個主題的內容。..</p>

<!-- 跑馬燈，已被淘汰但仍被瀏覽器支援 -->
<marquee>這是跑馬燈效果，不建議在現代網頁中使用</marquee>
```

### 完整範例
以下是一個結合所有標籤的完整範例：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>我的部落格</title>
</head>
<body>
  <!-- 網站主標題 -->
  <h1 id="top">我的技術部落格</h1>
  
  <!-- 導航連結 -->
  <nav>
    <a href="#html">HTML 教學</a> |
    <a href="#css">CSS 教學</a> |
    <a href="#js">JavaScript 教學</a>
  </nav>
  
  <hr>
  
  <!-- HTML 章節 -->
  <h2 id="html">HTML 教學</h2>
  <p>HTML 是網頁的基礎語言，用於建立網頁的結構和內容。</p>
  
  <h3>HTML 的重要性</h3>
  <p>學習 HTML 是成為前端開發者的第一步。<br>
  它提供了網頁的基本架構，就像房子的骨架一樣重要。</p>
  
  <h4>HTML5 的新特性</h4>
  <p>HTML5 引入了許多新的語義化標籤，讓網頁結構更加清晰。</p>
  
  <hr>
  
  <!-- CSS 章節 -->
  <h2 id="css">CSS 教學</h2>
  <p>CSS 負責網頁的外觀和樣式設計。</p>
  
  <hr>
  
  <!-- JavaScript 章節 -->
  <h2 id="js">JavaScript 教學</h2>
  <p>JavaScript 為網頁增加互動性和動態效果。</p>
  
  <!-- 頁尾 -->
  <hr>
  <p>更多資訊請參考 <a href="https://developer.mozilla.org/zh-TW/" target="_blank">MDN Web Docs</a></p>
  <p><a href="#top">回到頂部</a></p>
</body>
</html>
```

{% note info %}
  **小技巧：文字佔位符產生器**
  VSCode 內建就可以輸入 lorem(+number) 產生隨意的文字方便快速使用，如果你有安裝 Chinese Lorem 則可產生隨意中文字。
{% endnote%}

## 清單項目
HTML 清單用於組織和呈現相關的項目，是建立結構化內容的重要工具。清單不僅能提高內容的可讀性，還對搜尋引擎優化和無障礙存取有重要幫助。

### 無序清單 (ul)
無序清單用於展示沒有特定順序的項目列表，瀏覽器會自動為每個項目添加符號（通常是圓點）：

- 適用於沒有順序要求的項目
- 預設使用圓點作為項目符號
- 可以透過 CSS 自訂符號樣式
- 常用於導航選單、功能列表等

```html
<!-- 基本無序清單 -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- 實際應用範例：導航選單 -->
<nav>
  <ul>
    <li><a href="#home">首頁</a></li>
    <li><a href="#about">關於我們</a></li>
    <li><a href="#services">服務項目</a></li>
    <li><a href="#contact">聯絡我們</a></li>
  </ul>
</nav>

<!-- 實際應用範例：功能特色 -->
<h3>我們的服務特色</h3>
<ul>
  <li>專業的技術團隊</li>
  <li>24 小時客戶服務</li>
  <li>完整的售後保固</li>
  <li>客製化解決方案</li>
</ul>
```

### 有序清單 (ol)
有序清單用於展示有特定順序的項目列表，瀏覽器會自動為每個項目添加序號：

- 適用於有順序要求的項目
- 預設使用阿拉伯數字編號
- 可以設定起始編號和編號類型
- 常用於步驟說明、排行榜等

```html
<!-- 基本有序清單 -->
<ol>
  <li>學習 HTML</li>
  <li>學習 CSS</li>
  <li>學習 JavaScript</li>
</ol>

<!-- 自訂起始編號 -->
<ol start="5">
  <li>第五個步驟</li>
  <li>第六個步驟</li>
  <li>第七個步驟</li>
</ol>

<!-- 不同編號類型 -->
<ol type="A">
  <li>選項 A</li>
  <li>選項 B</li>
  <li>選項 C</li>
</ol>

<ol type="I">
  <li>第一章</li>
  <li>第二章</li>
  <li>第三章</li>
</ol>

<!-- 實際應用範例：操作步驟 -->
<h3>網站發佈步驟</h3>
<ol>
  <li>完成網站設計和開發</li>
  <li>測試網站功能</li>
  <li>購買網域名稱</li>
  <li>選擇虛擬主機服務</li>
  <li>上傳網站檔案</li>
  <li>設定網域指向</li>
  <li>測試線上網站</li>
</ol>
```

### 巢狀清單
清單可以包含其他清單，形成多層級的結構，適用於複雜的分類內容：

- 可以是無序清單包含有序清單
- 也可以是有序清單包含無序清單
- 支援多層級的巢狀結構
- 瀏覽器會自動調整縮排和符號

```html
<!-- 巢狀清單範例 -->
<ul>
  <li>前端技術
    <ul>
      <li>HTML
        <ol>
          <li>基本標籤</li>
          <li>表單元素</li>
          <li>語義化標籤</li>
        </ol>
      </li>
      <li>CSS
        <ol>
          <li>選擇器</li>
          <li>佈局方式</li>
          <li>響應式設計</li>
        </ol>
      </li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>後端技術
    <ul>
      <li>PHP</li>
      <li>Python</li>
      <li>Node.js</li>
    </ul>
  </li>
</ul>

<!-- 實際應用範例：課程大綱 -->
<h3>HTML 基礎課程大綱</h3>
<ol>
  <li>HTML 簡介
    <ul>
      <li>什麼是 HTML</li>
      <li>HTML 的歷史</li>
      <li>HTML5 的新特性</li>
    </ul>
  </li>
  <li>基本標籤
    <ul>
      <li>文字標籤</li>
      <li>連結標籤</li>
      <li>圖片標籤</li>
    </ul>
  </li>
  <li>表單元素
    <ul>
      <li>輸入欄位</li>
      <li>選擇元件</li>
      <li>按鈕元素</li>
    </ul>
  </li>
</ol>
```

### 描述清單 (dl)
描述清單用於展示術語及其定義，適用於詞彙解釋、問答等場景：

- `<dl>` 定義描述清單
- `<dt>` 定義術語名稱
- `<dd>` 定義術語描述
- 適用於詞彙表、FAQ 等

```html
<!-- 基本描述清單 -->
<dl>
  <dt>HTML</dt>
  <dd>超文本標記語言，用於建立網頁結構</dd>
  
  <dt>CSS</dt>
  <dd>層疊樣式表，用於控制網頁外觀</dd>
  
  <dt>JavaScript</dt>
  <dd>程式語言，用於增加網頁互動性</dd>
</dl>

<!-- 實際應用範例：FAQ -->
<h3>常見問題</h3>
<dl>
  <dt>如何開始學習網頁設計？</dt>
  <dd>建議從 HTML 基礎開始，逐步學習 CSS 和 JavaScript。</dd>
  
  <dt>需要什麼開發工具？</dt>
  <dd>推薦使用 VSCode 編輯器，搭配 Chrome 瀏覽器進行開發。</dd>
  
  <dt>學習期間大約多久？</dt>
  <dd>
    依個人學習狀況而定：
    <ul>
      <li>基礎入門：1-2 個月</li>
      <li>進階應用：3-6 個月</li>
      <li>專業程度：1-2 年</li>
    </ul>
  </dd>
</dl>
```

### 完整範例
以下是結合不同清單類型的完整範例：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>清單範例</title>
</head>
<body>
  <h1>Web 開發學習指南</h1>
  
  <!-- 無序清單：主要技術 -->
  <h2>核心技術</h2>
  <ul>
    <li>HTML - 網頁結構</li>
    <li>CSS - 樣式設計</li>
    <li>JavaScript - 互動功能</li>
  </ul>
  
  <!-- 有序清單：學習步驟 -->
  <h2>學習步驟</h2>
  <ol>
    <li>掌握 HTML 基礎語法</li>
    <li>學習 CSS 樣式設計</li>
    <li>練習 JavaScript 程式設計</li>
    <li>建立個人專案作品</li>
  </ol>
  
  <!-- 巢狀清單：詳細分類 -->
  <h2>進階學習路線</h2>
  <ul>
    <li>前端開發
      <ol>
        <li>HTML/CSS 基礎</li>
        <li>JavaScript 進階</li>
        <li>前端框架
          <ul>
            <li>React</li>
            <li>Vue.js</li>
            <li>Angular</li>
          </ul>
        </li>
      </ol>
    </li>
    <li>後端開發
      <ol>
        <li>伺服器語言</li>
        <li>資料庫管理</li>
        <li>API 設計</li>
      </ol>
    </li>
  </ul>
  
  <!-- 描述清單：術語解釋 -->
  <h2>重要術語</h2>
  <dl>
    <dt>響應式設計</dt>
    <dd>網頁能夠適應不同螢幕尺寸的設計方法</dd>
    
    <dt>API</dt>
    <dd>應用程式介面，用於不同系統間的資料交換</dd>
  </dl>
</body>
</html>
```

{% note info %}
**小技巧：清單的語意化使用**
- 使用無序清單表示並列的項目
- 使用有序清單表示有步驟性的項目
- 使用描述清單表示術語和定義的對應關係
- 適當使用巢狀清單可以建立清晰的資訊層次
{% endnote%}

## 文字效果
HTML 提供多種文字效果標籤，用於強調、標記和格式化文字內容。這些標籤不僅影響視覺呈現，更重要的是提供語意化的意義，有助於搜尋引擎優化和無障礙存取。

### 語意化強調標籤
語意化標籤不僅提供視覺效果，更重要的是傳達內容的意義和重要性：

#### 重要性強調
- **strong**：表示內容的重要性，通常顯示為粗體
- **em**：表示內容的強調，通常顯示為斜體
- **mark**：表示內容的標記或高亮，通常顯示為黃色背景

```html
<!-- 語意化強調標籤 -->
<p>這段文字包含<strong>重要的資訊</strong>，請特別注意。</p>
<p>我們<em>強烈建議</em>您仔細閱讀使用說明。</p>
<p>重要提醒：<mark>截止日期為 12 月 31 日</mark>。</p>

<!-- 實際應用範例：文章內容 -->
<article>
  <h2>網頁開發最佳實踐</h2>
  <p>在開發網頁時，<strong>語意化</strong>是非常重要的概念。
  它不僅能讓程式碼更易維護，還能提升<em>搜尋引擎優化</em>的效果。</p>
  
  <p>記住：<mark>先考慮語意，再考慮外觀</mark>。</p>
</article>
```

#### 編輯標記
- **ins**：表示插入的內容，通常顯示為底線
- **del**：表示刪除的內容，通常顯示為刪除線

```html
<!-- 編輯標記範例 -->
<p>原價 <del>$1000</del>，特價 <ins>$800</ins></p>
<p>他說：<q>學習永遠不嫌晚</q>。</p>

<!-- 實際應用範例：版本更新說明 -->
<h3>版本 2.0 更新內容</h3>
<ul>
  <li><ins>新增：暗色主題支援</ins></li>
  <li><del>移除：舊版編輯器</del></li>
  <li>修正：<del>登入問題</del> <ins>已解決登入問題</ins></li>
</ul>
```

### 外觀效果標籤
純粹用於視覺效果的標籤，建議搭配 CSS 使用以達到更好的控制：

#### 基本格式
- **b**：粗體顯示（純外觀效果）
- **i**：斜體顯示（純外觀效果）
- **u**：底線顯示（純外觀效果）
- **s**：刪除線顯示（純外觀效果）

```html
<!-- 基本格式標籤 -->
<p><b>粗體文字</b>（純外觀效果）</p>
<p><i>斜體文字</i>（純外觀效果）</p>
<p><u>底線文字</u>（純外觀效果）</p>
<p><s>刪除線文字</s>（純外觀效果）</p>

<!-- 比較：語意化 vs 外觀效果 -->
<p><strong>重要內容</strong>（語意：重要性）vs <b>粗體文字</b>（外觀：粗體）</p>
<p><em>強調內容</em>（語意：強調）vs <i>斜體文字</i>（外觀：斜體）</p>
```

#### 特殊格式
- **small**：小字顯示，適用於版權聲明、法律聲明等
- **big**：大字顯示（HTML5 中已棄用）
- **sub**：下標顯示，適用於化學公式等
- **sup**：上標顯示，適用於數學公式等

```html
<!-- 特殊格式標籤 -->
<p>這是正常文字，<small>這是小字（版權聲明）</small></p>
<p>水的化學分子式：H<sub>2</sub>O</p>
<p>愛因斯坦質能方程式：E=mc<sup>2</sup></p>

<!-- 實際應用範例：科學文章 -->
<article>
  <h3>化學反應式</h3>
  <p>光合作用的化學反應式：</p>
  <p>6CO<sub>2</sub> + 6H<sub>2</sub>O + 光能 → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub></p>
  
  <p>數學公式範例：</p>
  <p>畢氏定理：a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></p>
  
  <footer>
    <small>© 2024 科學教育網站。版權所有。</small>
  </footer>
</article>
```

### 程式碼顯示
專門用於顯示程式碼和預格式化文字的標籤：

- **code**：行內程式碼，適用於短片段程式碼
- **pre**：預格式化文字，保持空格和換行
- **kbd**：鍵盤輸入，表示使用者輸入的內容
- **samp**：範例輸出，表示程式的輸出結果
- **var**：變數，表示程式中的變數

#### 範例一：JavaScript 程式碼
JavaScript 程式碼不包含 HTML 標籤，可以直接顯示：

```html
<!-- JavaScript 程式碼範例 -->
<p>使用 <code>console.log()</code> 函數來輸出訊息。</p>

<pre><code>function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("World");</code></pre>

<p>按下 <kbd>F12</kbd> 開啟開發者工具。</p>
<p>程式輸出：<samp>Hello, World!</samp></p>
<p>變數 <var>name</var> 存儲使用者輸入的值。</p>
```

#### 範例二：HTML 程式碼（需要符號實體化）
當要顯示 HTML 程式碼時，必須使用符號實體化，否則瀏覽器會將標籤解析為真正的 HTML 元素：

**❌ 錯誤寫法（會被瀏覽器解析）：**
```html
<pre><code><h1>這會被解析為真正的標題</h1></code></pre>
```

**✅ 正確寫法（使用符號實體化）：**
```html
<!-- HTML 程式碼範例 - 正確的符號實體化寫法 -->
<p>HTML 中的段落標籤是 <code>&lt;p&gt;</code>。</p>

<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="zh-TW"&gt;
&lt;head&gt;
    &lt;title&gt; 我的網頁&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt; 歡迎來到我的網站&lt;/h1&gt;
    &lt;p&gt; 這是一個&lt;strong&gt; 重要&lt;/strong&gt; 的段落。&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
```

#### 符號實體化對照表
在顯示 HTML 程式碼時需要的符號實體化：

| 符號 | 實體化寫法 | 說明                     |
| ---- | ---------- | ------------------------ |
| `<`  | `&lt;`     | 小於符號（Less Than）    |
| `>`  | `&gt;`     | 大於符號（Greater Than） |
| `&`  | `&amp;`    | 連字符號（Ampersand）    |
| `"`  | `&quot;`   | 雙引號（Quotation Mark） |

>code 標籤當輸入的程式碼為 HTML 代碼時會無法詮釋於畫面上。這是因為瀏覽器會將 HTML 都渲染出來，因此需要透過符號實體化將敏感的代碼文字用別的意思傳達給瀏覽器。後續請詳閱 [符號（字元）實體化](#符號（字元）實體化)。

### 引用與引言
用於標記引用內容和引言的標籤：

- **q**：短引言，瀏覽器通常會自動加上引號
- **blockquote**：長引言，通常顯示為縮排區塊
- **cite**：引用作品名稱，通常顯示為斜體

```html
<!-- 引用標籤 -->
<p>莎士比亞說過：<q>生存還是毀滅，這是個問題。</q></p>

<blockquote>
  <p>設計不僅僅是外觀和感覺，設計就是它如何運作。</p>
  <cite>— 史蒂夫·賈伯斯</cite>
</blockquote>

<blockquote cite="https://example.com/article">
  <p>網頁設計不僅僅是讓東西看起來漂亮，更重要的是創造良好的使用者體驗。</p>
  <footer>
    — <cite>網頁設計原則</cite>
  </footer>
</blockquote>

<!-- 實際應用範例：文章引用 -->
<article>
  <h3>設計哲學</h3>
  <p>正如著名設計師說的：<q>簡潔是複雜的極致</q>。</p>
  
  <blockquote>
    <p>好的設計是顯而易見的，優秀的設計是透明的。</p>
    <footer>
      — 摘自 <cite>設計師的修養</cite>
    </footer>
  </blockquote>
</article>
```

### 完整範例
以下是結合各種文字效果的完整範例：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文字效果範例</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
    pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
    blockquote { border-left: 4px solid #ccc; margin: 0; padding-left: 20px; font-style: italic; }
  </style>
</head>
<body>
  <h1>HTML 文字效果完整示範</h1>
  
  <!-- 語意化強調 -->
  <section>
    <h2>語意化強調</h2>
    <p>這段文字包含<strong>重要資訊</strong>，請<em>特別注意</em>。</p>
    <p>特別提醒：<mark>考試日期為 12 月 15 日</mark>。</p>
  </section>
  
  <!-- 編輯標記 -->
  <section>
    <h2>編輯標記</h2>
    <p>商品原價 <del>$1200</del>，特價 <ins>$899</ins>。</p>
    <p>老師說：<q>學習需要持之以恆</q>。</p>
  </section>
  
  <!-- 程式碼展示 -->
  <section>
    <h2>程式碼展示</h2>
    <p>使用 <code>document.querySelector()</code> 選擇元素：</p>
    
    <pre><code>const element = document.querySelector('.my-class');
element.addEventListener('click', function() {
    console.log('元素被點擊了！');
});</code></pre>
    
    <p>按下 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> 開啟開發者工具。</p>
    <p>執行結果：<samp>元素被點擊了！</samp></p>
  </section>
  
  <!-- 數學和科學 -->
  <section>
    <h2>數學和科學</h2>
    <p>水的分子式：H<sub>2</sub>O</p>
    <p>愛因斯坦方程式：E=mc<sup>2</sup></p>
    <p>在程式中，變數 <var>x</var> 存儲使用者輸入的值。</p>
  </section>
  
  <!-- 引用 -->
  <section>
    <h2>引用內容</h2>
    <blockquote>
      <p>網頁開發是一門藝術，也是一門科學。它需要創意思維，
      也需要邏輯思維。</p>
      <footer>
        — 摘自 <cite>現代網頁開發指南</cite>
      </footer>
    </blockquote>
  </section>
  
  <!-- 版權聲明 -->
  <footer>
    <hr>
    <p><small>© 2024 HTML 教學網站。本內容僅供學習使用。</small></p>
  </footer>
</body>
</html>
```

{% note warning %}
**重要提醒：語意化 vs 外觀效果**
- **語意化標籤**（如 `<strong>`、`<em>`）：優先使用，因為它們提供意義
- **外觀標籤**（如 `<b>`、`<i>`）：僅在純視覺效果時使用
- **最佳實踐**：使用 CSS 來控制外觀，HTML 負責語意
- **SEO 友善**：搜尋引擎更重視語意化標籤
- **在程式碼中顯示 HTML**：必須使用字元實體化（如 `&lt;` 代表 `<`），否則瀏覽器會將其解析為 HTML 標籤。
{% endnote%}

## 多媒體
HTML 多媒體標籤用於在網頁中嵌入各種媒體內容，包括圖片、影片、音訊和外部內容。這些標籤不僅提供視覺和聽覺體驗，更是現代網頁設計不可或缺的重要元素。

### 圖片元素 (img)
圖片標籤是最常用的多媒體元素，用於在網頁中顯示圖像：

- **src 屬性**：指定圖片來源路徑，必要屬性
- **alt 屬性**：替代文字，用於無障礙存取和 SEO
- **title 屬性**：滑鼠懸停時顯示的提示文字
- **width/height 屬性**：設定圖片尺寸

```html
<!-- 基本圖片使用 -->
<img src="images/logo.png" alt="公司標誌" title="我們的標誌">

<!-- 指定尺寸 -->
<img src="images/banner.jpg" width="800" height="400" alt="網站橫幅">

<!-- 使用外部圖片 -->
<img src="https://picsum.photos/300/200" alt="隨機圖片">

<!-- 實際應用範例：產品展示 -->
<article>
  <h3>產品介紹</h3>
  <img src="images/product-1.jpg" alt="智慧型手機" width="300" height="300">
  <p>最新智慧型手機，具備先進的攝影功能。</p>
</article>

<!-- 實際應用範例：團隊成員 -->
<section>
  <h3>我們的團隊</h3>
  <div>
    <img src="images/member-1.jpg" alt="張小明 - 專案經理" width="150" height="150">
    <h4>張小明</h4>
    <p>專案經理</p>
  </div>
  <div>
    <img src="images/member-2.jpg" alt="李小華 - 設計師" width="150" height="150">
    <h4>李小華</h4>
    <p>UI/UX 設計師</p>
  </div>
</section>
```

### 影音元素
HTML5 提供原生的影音播放支援，無需依賴外部外掛程式：

#### 影片播放 (video)
video 標籤用於嵌入影片內容：

- **src 屬性**：指定影片來源
- **controls 屬性**：顯示播放控制項
- **autoplay 屬性**：自動播放（需注意使用者體驗）
- **loop 屬性**：循環播放
- **muted 屬性**：靜音播放
- **poster 屬性**：影片載入前顯示的封面圖片

```html
<!-- 基本影片播放 -->
<video src="videos/demo.mp4" controls width="640" height="360">
  您的瀏覽器不支援影片播放。
</video>

<!-- 完整功能影片播放器 -->
<video width="800" height="450" controls poster="images/video-cover.jpg">
  <source src="videos/presentation.mp4" type="video/mp4">
  <source src="videos/presentation.webm" type="video/webm">
  <p>您的瀏覽器不支援 HTML5 影片播放。
     請 <a href="videos/presentation.mp4">下載影片</a> 觀看。</p>
</video>

<!-- 實際應用範例：產品展示影片 -->
<section>
  <h3>產品展示</h3>
  <video width="100%" height="400" controls preload="metadata">
    <source src="videos/product-demo.mp4" type="video/mp4">
    <source src="videos/product-demo.webm" type="video/webm">
    <track kind="subtitles" src="videos/subtitles-zh.vtt" srclang="zh" label="中文字幕">
    <p>抱歉，您的瀏覽器不支援影片播放功能。</p>
  </video>
</section>

<!-- 背景影片範例 -->
<section>
  <video autoplay muted loop poster="images/hero-bg.jpg" style="width: 100%; height: 500px; object-fit: cover;">
    <source src="videos/hero-background.mp4" type="video/mp4">
    <source src="videos/hero-background.webm" type="video/webm">
  </video>
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white;">
    <h2>歡迎來到我們的網站</h2>
  </div>
</section>
```

{% note warning %}
**重要：瀏覽器自動播放限制**

現代瀏覽器（Chrome、Firefox、Safari 等）為了改善使用者體驗，對影片和音訊的自動播放設有嚴格限制：

**自動播放限制原因：**
- **防止干擾使用者**：避免突然播放的聲音驚嚇或打擾使用者
- **節省頻寬**：減少不必要的資料傳輸
- **延長電池壽命**：避免不必要的媒體播放消耗電力
- **改善網頁體驗**：讓使用者有更好的瀏覽控制權

**自動播放規則：**
1. **有聲音的影片**：必須有使用者互動（點擊、觸控等）才能自動播放
2. **靜音影片**：可以使用 `autoplay muted` 實現自動播放
3. **使用者互動後**：一旦使用者與頁面互動，後續的影片可以自動播放
4. **Media Engagement Index (MEI)**：瀏覽器會根據使用者對該網站的互動程度決定是否允許自動播放

**正確的自動播放寫法：**
```html
<!-- ❌ 錯誤：現代瀏覽器會阻止這種自動播放 -->
<video autoplay>
  <source src="video.mp4" type="video/mp4">
</video>

<!-- ✅ 正確：靜音自動播放 -->
<video autoplay muted>
  <source src="video.mp4" type="video/mp4">
</video>

<!-- ✅ 正確：背景影片的標準寫法 -->
<video autoplay muted loop playsinline>
  <source src="background.mp4" type="video/mp4">
</video>
```

**JavaScript 檢測自動播放支援：**
```javascript
// 檢測自動播放是否被允許
video.play().then(() => {
  // 自動播放成功
  console.log('自動播放成功');
}).catch(() => {
  // 自動播放被阻止，顯示播放按鈕
  console.log('自動播放被阻止');
  showPlayButton();
});
```

**各瀏覽器政策差異：**
- **Chrome 66+**：嚴格限制，只允許靜音自動播放
- **Firefox 69+**：類似 Chrome 的限制
- **Safari**：行動版更嚴格，需要使用者手勢觸發
- **Edge**：跟隨 Chrome 的政策

**建議做法：**
- 背景影片使用 `autoplay muted`
- 提供明顯的播放按鈕讓使用者控制
- 使用 `poster` 屬性提供預覽圖
- 考慮使用 `preload="metadata"` 減少載入時間
{% endnote%}

#### 音訊播放 (audio)
audio 標籤用於嵌入音訊內容：

- **src 屬性**：指定音訊來源
- **controls 屬性**：顯示播放控制項
- **autoplay 屬性**：自動播放
- **loop 屬性**：循環播放
- **preload 屬性**：預載設定

```html
<!-- 基本音訊播放 -->
<audio src="audio/background-music.mp3" controls>
  您的瀏覽器不支援音訊播放。
</audio>

<!-- 多格式音訊支援 -->
<audio controls preload="auto">
  <source src="audio/podcast.mp3" type="audio/mpeg">
  <source src="audio/podcast.ogg" type="audio/ogg">
  <p>您的瀏覽器不支援音訊播放。請 <a href="audio/podcast.mp3">下載音訊</a> 收聽。</p>
</audio>

<!-- 實際應用範例：播客節目 -->
<article>
  <h3>本週播客：網頁設計趨勢</h3>
  <audio controls style="width: 100%;">
    <source src="audio/podcast-ep01.mp3" type="audio/mpeg">
    <source src="audio/podcast-ep01.ogg" type="audio/ogg">
    <p>播放失敗，請直接 <a href="audio/podcast-ep01.mp3">下載收聽</a>。</p>
  </audio>
  <p>發布時間：2024 年 3 月 15 日</p>
  <p>時長：45 分鐘</p>
</article>
```

{% note info %}
**音訊自動播放限制**

音訊元素同樣受到現代瀏覽器的自動播放限制：

**音訊自動播放規則：**
- **預設限制**：所有音訊都無法自動播放，必須有使用者互動
- **使用者互動後**：一旦使用者與頁面互動，音訊可以透過 JavaScript 播放
- **背景音樂**：不建議使用自動播放，應提供播放控制項

**建議做法：**
```html
<!-- ✅ 建議：提供播放控制項 -->
<audio controls>
  <source src="audio/music.mp3" type="audio/mpeg">
</audio>

<!-- ✅ 建議：透過 JavaScript 在使用者互動後播放 -->
<button onclick="playAudio()">播放音樂</button>
<audio id="backgroundMusic">
  <source src="audio/background.mp3" type="audio/mpeg">
</audio>

<script>
function playAudio() {
  const audio = document.getElementById('backgroundMusic');
  audio.play();
}
</script>
```

**使用者體驗考量：**
- 音訊自動播放可能會干擾使用者，特別是在公共場所
- 建議提供音量控制和暫停功能
- 考慮提供視覺提示告知使用者音訊正在播放
{% endnote%}

### 嵌入元素 (iframe)
iframe 標籤用於在網頁中嵌入其他網頁或外部內容：

- **src 屬性**：指定要嵌入的網頁或內容來源
- **width/height 屬性**：設定嵌入區域的尺寸
- **name 屬性**：為 iframe 命名，可作為超連結的目標
- **sandbox 屬性**：安全限制設定
- **loading 屬性**：載入行為設定

```html
<!-- 基本 iframe 使用 -->
<iframe src="https://www.example.com" width="800" height="600" frameborder="0">
  您的瀏覽器不支援 iframe。
</iframe>

<!-- 嵌入 Google 地圖 -->
<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.6!2d121.5!3d25.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAwJzAwLjAiTiAxMjHCsDMwJzAwLjAiRQ!5e0!3m2!1szh-TW!2stw!4v1234567890" 
  width="100%" 
  height="400" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>

<!-- 嵌入 YouTube 影片 -->
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>

<!-- 目標框架使用 -->
<p>
  <a href="page1.html" target="contentFrame">頁面一</a> |
  <a href="page2.html" target="contentFrame">頁面二</a> |
  <a href="page3.html" target="contentFrame">頁面三</a>
</p>
<iframe 
  name="contentFrame" 
  src="page1.html" 
  width="100%" 
  height="500" 
  frameborder="0">
</iframe>

<!-- 實際應用範例：社群媒體嵌入 -->
<section>
  <h3>追蹤我們的社群媒體</h3>
  
  <!-- Facebook 粉絲專頁 -->
  <iframe 
    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fyour-page" 
    width="340" 
    height="500" 
    style="border:none;overflow:hidden" 
    scrolling="no" 
    frameborder="0" 
    allow="encrypted-media">
  </iframe>
  
  <!-- Twitter 時間軸 -->
  <iframe 
    src="https://platform.twitter.com/widgets/timeline.html?screen_name=your_username" 
    width="340" 
    height="500" 
    frameborder="0" 
    scrolling="no">
  </iframe>
</section>

<!-- 實際應用範例：線上表單 -->
<section>
  <h3>聯絡我們</h3>
  <iframe 
    src="https://forms.google.com/embed/your-form-id" 
    width="100%" 
    height="800" 
    frameborder="0" 
    marginheight="0" 
    marginwidth="0">
    載入中。..
  </iframe>
</section>
```

{% note danger %}
**重要：iframe 嵌入限制與拒絕連線原因**

很多網站無法透過 iframe 嵌入，這是因為網站基於**安全性考量**設置了防護機制。

**為什麼網站會拒絕嵌入？**
- **防止點擊劫持攻擊**：惡意網站可能透過 iframe 欺騙使用者
- **保護使用者隱私**：避免第三方網站竊取使用者資料
- **維護品牌形象**：確保網站在正確的環境中被瀏覽
- **技術安全限制**：現代瀏覽器和網站都有嚴格的安全政策

**技術限制原因：**
- **X-Frame-Options 標頭**：設定防止嵌入的 HTTP 標頭。`DENY`完全禁止；`SAMEORIGIN`只允許同網域
- **Content Security Policy**：現代網站的安全政策，控制哪些內容可以被載入和嵌入
- **同源政策**：瀏覽器的基本安全機制限制不同網域、協定、埠號之間的資源存取
- **混合內容限制**：HTTPS 網站不允許嵌入 HTTP 內容

**常見無法嵌入的網站：**
- Google、Facebook、Twitter 等主要網站的首頁
- 銀行、金融機構網站
- 大多數商業網站的主頁面

**可以嵌入的內容：**
- YouTube 影片（使用 `/embed/` 網址）
- Google Maps（使用嵌入 API）
- 自己建立的網頁
- 專門提供嵌入功能的服務

**合理使用建議：**
```html
<!-- ✅ 合理使用：嵌入自己的網頁 -->
<iframe src="contact.html" width="100%" height="400"></iframe>

<!-- ✅ 合理使用：官方提供的嵌入服務 -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="560" height="315"></iframe>
<iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="400"></iframe>

<!-- ❌ 不合理：嵌入其他網站主頁（通常會失敗） -->
<iframe src="https://www.google.com"></iframe>
<iframe src="https://www.facebook.com"></iframe>
```

**重要提醒：**
- iframe 不是萬能的，無法嵌入所有網站
- 被拒絕連線是正常的安全機制，這是沒辦法的事情
- 使用前要確認目標網站是否允許嵌入
- 優先使用官方提供的嵌入方案
- 無法嵌入時，考慮使用連結讓使用者在新視窗開啟
{% endnote%}

> **提醒**：iframe 屬於一種嵌入網頁的媒體元素，而 frame 為早期網頁分割框架元素（已淘汰）。現代網頁建議使用 iframe 搭配適當的安全設定來嵌入外部內容。使用 iframe 時，務必確認目標網站是否允許嵌入，並準備適當的備用方案。

### 其他多媒體元素

#### 圖像區域 (map 和 area)
用於建立圖像地圖，讓圖片的不同區域可以點擊：

```html
<!-- 圖像地圖範例 -->
<img src="images/world-map.jpg" alt="世界地圖" usemap="#worldmap">

<map name="worldmap">
  <area shape="rect" coords="0,0,82,126" href="asia.html" alt="亞洲">
  <area shape="rect" coords="90,58,3,0" href="europe.html" alt="歐洲">
  <area shape="rect" coords="124,58,438,85" href="america.html" alt="美洲">
</map>
```

#### 嵌入物件 (object 和 embed)
用於嵌入各種外部內容（較少使用）：

```html
<!-- 嵌入 PDF 文件 -->
<object data="document.pdf" type="application/pdf" width="100%" height="600">
  <p>您的瀏覽器不支援 PDF 顯示。請 <a href="document.pdf">下載文件</a> 檢視。</p>
</object>

<!-- 嵌入 Flash 內容（已過時） -->
<embed src="animation.swf" width="400" height="300" type="application/x-shockwave-flash">
```

### 完整範例
以下是結合各種多媒體元素的完整範例：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>多媒體展示</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .media-section { margin: 40px 0; }
    .video-container { position: relative; width: 100%; height: 0; padding-bottom: 56.25%; }
    .video-container iframe, .video-container video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
    .gallery img { width: 100%; height: 200px; object-fit: cover; }
  </style>
</head>
<body>
  <h1>多媒體內容展示</h1>
  
  <!-- 圖片展示 -->
  <section class="media-section">
    <h2>圖片展示</h2>
    <div class="gallery">
      <img src="https://picsum.photos/300/200?random=1" alt="隨機圖片 1">
      <img src="https://picsum.photos/300/200?random=2" alt="隨機圖片 2">
      <img src="https://picsum.photos/300/200?random=3" alt="隨機圖片 3">
      <img src="https://picsum.photos/300/200?random=4" alt="隨機圖片 4">
    </div>
  </section>
  
  <!-- 影片播放 -->
  <section class="media-section">
    <h2>影片內容</h2>
    <div class="video-container">
      <video controls poster="https://picsum.photos/800/450">
        <source src="sample-video.mp4" type="video/mp4">
        <source src="sample-video.webm" type="video/webm">
        <p>您的瀏覽器不支援影片播放。</p>
      </video>
    </div>
  </section>
  
  <!-- 音訊播放 -->
  <section class="media-section">
    <h2>音訊內容</h2>
    <h3>背景音樂</h3>
    <audio controls style="width: 100%;">
      <source src="background-music.mp3" type="audio/mpeg">
      <source src="background-music.ogg" type="audio/ogg">
      <p>您的瀏覽器不支援音訊播放。</p>
    </audio>
  </section>
  
  <!-- 嵌入內容 -->
  <section class="media-section">
    <h2>嵌入內容</h2>
    
    <h3>地圖位置</h3>
    <iframe 
      src="https://www.openstreetmap.org/export/embed.html?bbox=121.5,25.0,121.6,25.1&layer=mapnik" 
      width="100%" 
      height="400" 
      frameborder="0">
    </iframe>
    
    <h3>外部網站</h3>
    <iframe 
      src="https://www.w3schools.com/html/" 
      width="100%" 
      height="500" 
      frameborder="0">
    </iframe>
  </section>
  
  <!-- 互動內容 -->
  <section class="media-section">
    <h2>互動式內容</h2>
    <p>點擊下方連結，內容將在下方框架中開啟：</p>
    <p>
      <a href="https://www.w3schools.com/html/" target="interactiveFrame">HTML 教學</a> |
      <a href="https://www.w3schools.com/css/" target="interactiveFrame">CSS 教學</a> |
      <a href="https://www.w3schools.com/js/" target="interactiveFrame">JavaScript 教學</a>
    </p>
    <iframe 
      name="interactiveFrame" 
      src="https://www.w3schools.com/html/" 
      width="100%" 
      height="400" 
      frameborder="0">
    </iframe>
  </section>
</body>
</html>
```

{% note info %}
**多媒體使用最佳實踐：**
- **無障礙存取**：為圖片提供有意義的 alt 屬性
- **效能優化**：適當調整圖片尺寸，使用現代格式（如 WebP）
- **響應式設計**：使用相對單位讓多媒體內容適應不同螢幕
- **使用者體驗**：避免自動播放音訊，提供播放控制項
- **安全考量**：使用 sandbox 屬性限制 iframe 的權限
- **載入優化**：使用 loading="lazy" 屬性實現延遲載入
{% endnote%}

## 表格
HTML 表格是用來顯示結構化資料的重要元素，能夠以行（row）和列（column）的形式來組織和呈現資訊。正確使用表格不僅能提升資料的可讀性，更有助於搜尋引擎優化和無障礙存取。

### 表格的基本結構
HTML 表格由多個標籤組成，形成完整的資料結構：

- **table**：表格容器，包含整個表格
- **tr** (table row)：表格行，從上到下排列
- **td** (table data)：表格資料儲存格，從左到右排列
- **th** (table header)：表格標題儲存格，用於欄位標題

```html
<!-- 基本表格結構 -->
<table>
  <tr>
    <th>姓名</th>
    <th>年齡</th>
    <th>職業</th>
  </tr>
  <tr>
    <td>張小明</td>
    <td>25</td>
    <td>工程師</td>
  </tr>
  <tr>
    <td>李小華</td>
    <td>30</td>
    <td>設計師</td>
  </tr>
</table>
```

### 表格屬性與樣式
雖然現代網頁建議使用 CSS 來控制表格樣式，但了解基本屬性仍有助於理解表格結構：

#### 常用屬性
- **border**：邊框寬度
- **cellpadding**：儲存格內邊距
- **cellspacing**：儲存格間距
- **width/height**：表格尺寸
- **align**：對齊方式

```html
<table border="1" cellpadding="5" cellspacing="0" width="100%">
  <tr>
    <th>項目</th>
    <th>基本方案</th>
    <th>進階方案</th>
    <th>專業方案</th>
  </tr>
  <tr>
    <td>價格</td>
    <td>$299</td>
    <td>$599</td>
    <td>$999</td>
  </tr>
  <tr>
    <td>儲存空間</td>
    <td>10GB</td>
    <td>50GB</td>
    <td>無限制</td>
  </tr>
  <tr>
    <td>技術支援</td>
    <td>郵件</td>
    <td>郵件、電話</td>
    <td>24 小時全天候</td>
  </tr>
</table>
```

{% note warning %}
**為什麼 IDE 會顯示紅字？**

在 VSCode 或其他現代編輯器中，你可能會看到某些 HTML 屬性（如 `align`、`bgcolor`、`cellpadding` 等）顯示為紅字或有刪除線。這是因為：

1. **HTML5 規範變更**：這些屬性在 HTML5 中已被標記為「過時」(deprecated) 或「淘汰」(obsolete)
2. **W3C 的設計理念**：W3C 希望 HTML 專注於語意化結構，外觀樣式交由 CSS 處理
3. **現代最佳實踐**：分離內容與樣式，讓 HTML 負責結構，CSS 負責外觀

**但是這些屬性仍然可以使用！**瀏覽器為了向後相容，仍然支援這些屬性。在學習 HTML 基礎階段，了解這些屬性有助於理解表格結構。
{% endnote%}

#### 儲存格合併
表格支援儲存格合併，可以建立更複雜的資料結構：

**合併類型：**
- **colspan**：欄位合併（水平合併），左邊吃掉右邊
- **rowspan**：列合併（垂直合併），上面吃掉下面

```html
<!-- 儲存格合併基本範例 -->
<table border="1" cellspacing="0">
  <tr>
    <td colspan="2">跨越兩欄的標題</td>
    <td>一般儲存格</td>
  </tr>
  <tr>
    <td rowspan="2">跨越兩列</td>
    <td>資料 1</td>
    <td>資料 2</td>
  </tr>
  <tr>
    <td>資料 3</td>
    <td>資料 4</td>
  </tr>
</table>

<!-- 實際應用範例：部門組織表 -->
<table border="1" cellspacing="0" align="center">
  <tr>
    <th colspan="4">ABC 公司組織架構</th>
  </tr>
  <tr>
    <td rowspan="2">技術部</td>
    <td>前端組</td>
    <td>張工程師</td>
    <td>李工程師</td>
  </tr>
  <tr>
    <td>後端組</td>
    <td>王工程師</td>
    <td>陳工程師</td>
  </tr>
  <tr>
    <td rowspan="2">設計部</td>
    <td>UI 設計</td>
    <td>林設計師</td>
    <td>黃設計師</td>
  </tr>
  <tr>
    <td>UX 設計</td>
    <td>吳設計師</td>
    <td>周設計師</td>
  </tr>
</table>
```

### 語意化表格結構
為了提升表格的語意化程度，HTML 提供了更細緻的結構標籤：

#### 表格區域標籤
- **thead**：表格標題區域，包含表頭資訊
- **tbody**：表格主體區域，包含主要資料
- **tfoot**：表格頁尾區域，包含統計或總結資訊

```html
<!-- 語意化表格結構 -->
<table border="1" cellpadding="5" cellspacing="0">
  <thead>
    <tr>
      <th>商品名稱</th>
      <th>單價</th>
      <th>數量</th>
      <th>小計</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>筆記型電腦</td>
      <td>$25,000</td>
      <td>2</td>
      <td>$50,000</td>
    </tr>
    <tr>
      <td>無線滑鼠</td>
      <td>$800</td>
      <td>3</td>
      <td>$2,400</td>
    </tr>
    <tr>
      <td>鍵盤</td>
      <td>$1,500</td>
      <td>2</td>
      <td>$3,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3"><strong>總計</strong></td>
      <td><strong>$55,400</strong></td>
    </tr>
  </tfoot>
</table>
```

### 無障礙存取
表格的無障礙存取對於視障使用者尤其重要：

#### 重要屬性
- **caption**：表格標題，描述表格內容
- **scope**：定義標題儲存格的範圍
- **headers**：關聯資料儲存格與標題

```html
<!-- 無障礙存取範例 -->
<table border="1" style="border-collapse: collapse;">
  <caption>員工聯絡資訊表</caption>
  <thead>
    <tr>
      <th scope="col">員工編號</th>
      <th scope="col">姓名</th>
      <th scope="col">部門</th>
      <th scope="col">分機</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">001</th>
      <td>張志明</td>
      <td>資訊部</td>
      <td>1234</td>
    </tr>
    <tr>
      <th scope="row">002</th>
      <td>李小美</td>
      <td>行銷部</td>
      <td>5678</td>
    </tr>
  </tbody>
</table>

<!-- 複雜表格的 headers 屬性 -->
<table border="1" style="border-collapse: collapse;">
  <caption>季度銷售統計</caption>
  <tr>
    <th id="quarter">季度</th>
    <th id="north">北區</th>
    <th id="south">南區</th>
    <th id="total">總計</th>
  </tr>
  <tr>
    <th id="q1" headers="quarter">第一季</th>
    <td headers="q1 north">$500,000</td>
    <td headers="q1 south">$300,000</td>
    <td headers="q1 total">$800,000</td>
  </tr>
  <tr>
    <th id="q2" headers="quarter">第二季</th>
    <td headers="q2 north">$600,000</td>
    <td headers="q2 south">$400,000</td>
    <td headers="q2 total">$1,000,000</td>
  </tr>
</table>
```

### 完整範例
以下是一個綜合應用的完整範例：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>表格應用範例</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #f2f2f2; font-weight: bold; }
    .center { text-align: center; }
    .number { text-align: right; }
    .highlight { background-color: #fff2cc; }
  </style>
</head>
<body>
  <h1>公司資訊管理系統</h1>
  
  <!-- 員工基本資料表 -->
  <h2>員工基本資料</h2>
  <table>
    <caption>員工基本資料表</caption>
    <thead>
      <tr>
        <th scope="col">員工編號</th>
        <th scope="col">姓名</th>
        <th scope="col">部門</th>
        <th scope="col">職位</th>
        <th scope="col">到職日期</th>
        <th scope="col">薪資</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>E001</td>
        <td>張志明</td>
        <td>資訊部</td>
        <td>軟體工程師</td>
        <td>2022-03-15</td>
        <td class="number">$45,000</td>
      </tr>
      <tr>
        <td>E002</td>
        <td>李美華</td>
        <td>行銷部</td>
        <td>行銷專員</td>
        <td>2021-08-20</td>
        <td class="number">$38,000</td>
      </tr>
      <tr>
        <td>E003</td>
        <td>王大明</td>
        <td>財務部</td>
        <td>會計師</td>
        <td>2020-01-10</td>
        <td class="number">$52,000</td>
      </tr>
    </tbody>
  </table>
  
  <!-- 部門統計表 -->
  <h2>部門統計</h2>
  <table>
    <caption>各部門人數及平均薪資統計</caption>
    <thead>
      <tr>
        <th scope="col">部門</th>
        <th scope="col">人數</th>
        <th scope="col">平均薪資</th>
        <th scope="col">最高薪資</th>
        <th scope="col">最低薪資</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>資訊部</td>
        <td class="center">8</td>
        <td class="number">$48,000</td>
        <td class="number">$65,000</td>
        <td class="number">$35,000</td>
      </tr>
      <tr>
        <td>行銷部</td>
        <td class="center">5</td>
        <td class="number">$42,000</td>
        <td class="number">$55,000</td>
        <td class="number">$30,000</td>
      </tr>
      <tr>
        <td>財務部</td>
        <td class="center">3</td>
        <td class="number">$50,000</td>
        <td class="number">$60,000</td>
        <td class="number">$40,000</td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="highlight">
        <td><strong>總計</strong></td>
        <td class="center"><strong>16</strong></td>
        <td class="number"><strong>$46,667</strong></td>
        <td class="number"><strong>$65,000</strong></td>
        <td class="number"><strong>$30,000</strong></td>
      </tr>
    </tfoot>
  </table>
  
  <!-- 複雜合併表格 -->
  <h2>專案分配表</h2>
  <table>
    <caption>第三季專案分配與進度</caption>
    <thead>
      <tr>
        <th scope="col">專案名稱</th>
        <th scope="col">負責部門</th>
        <th scope="col">七月</th>
        <th scope="col">八月</th>
        <th scope="col">九月</th>
        <th scope="col">狀態</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2">網站改版</td>
        <td>資訊部</td>
        <td class="center">設計</td>
        <td class="center">開發</td>
        <td class="center">測試</td>
        <td class="center">進行中</td>
      </tr>
      <tr>
        <td>行銷部</td>
        <td class="center">企劃</td>
        <td class="center">內容</td>
        <td class="center">推廣</td>
        <td class="center">準備中</td>
      </tr>
      <tr>
        <td>財務系統</td>
        <td>資訊部</td>
        <td colspan="3" class="center">系統開發與測試</td>
        <td class="center">已完成</td>
      </tr>
      <tr>
        <td>市場調研</td>
        <td>行銷部</td>
        <td class="center">調研</td>
        <td class="center">分析</td>
        <td class="center">報告</td>
        <td class="center">進行中</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
```

{% note info %}
**表格使用最佳實踐：**
- **語意化優先**：使用 `<th>` 作為標題，`<td>` 作為資料
- **結構清晰**：適當使用 `<thead>`、`<tbody>`、`<tfoot>` 分區
- **無障礙考量**：加入 `caption`、`scope`、`headers` 屬性
- **樣式分離**：使用 CSS 控制外觀，HTML 負責結構
- **合理合併**：謹慎使用 `colspan` 和 `rowspan`，避免過度複雜
- **響應式設計**：考慮行動裝置上的表格顯示
- **資料完整性**：確保每行資料的完整性和一致性
{% endnote%}

### 小節練習
請試著製作以下課程表：

{% tabs demoTable，1 %}
<!-- tab 預覽-->
{% jsfiddle summer10920/kydsquhz result dark 100% 600 %}
<!-- endtab -->
<!-- tab 解答-->
```html TryTable.html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <table border="1" style="text-align:center" align="center">
      <tr>
        <td>節數</td>
        <td>一</td>
        <td>二</td>
        <td>三</td>
        <td>四</td>
        <td>五</td>
      </tr>
      <tr>
        <td>早自習<br />0750~0830</td>
        <td colspan="5"></td>
      </tr>
      <tr>
        <td>第一節<br />0840~0920</td>
        <td rowspan="2">國語<br />劉展華</td>
        <td colspan="3">數學<br />劉展華</td>
        <td>國語<br />劉展華</td>
      </tr>
      <tr>
        <td>第二節<br />0930~1010</td>
        <td>自然<br />黃新民</td>
        <td>音樂<br />萬巧如</td>
        <td>國語<br />劉展華</td>
        <td>彈性<br />劉展華</td>
      </tr>
      <tr>
        <td>第三節<br />1030~1110</td>
        <td>數學<br />劉展華</td>
        <td>健康<br />潘文欽</td>
        <td>國語<br />劉展華</td>
        <td>鄉土<br />魏士欽</td>
        <td rowspan="2">自然<br />黃新民</td>
      </tr>
      <tr>
        <td>第四節<br />1120~1200</td>
        <td>英語<br />黃定宜</td>
        <td>彈性<br />劉展華</td>
        <td>社會<br />劉展華</td>
        <td>英語<br />黃定宜</td>
      </tr>
      <tr>
        <td>午休時間<br />1200~1320</td>
        <td colspan="5"></td>
      </tr>
      <tr>
        <td>第五節<br />1330~1410</td>
        <td>社會<br />劉展華</td>
        <td rowspan="2">美勞<br />許文杰</td>
        <td rowspan="3"></td>
        <td rowspan="3">綜合<br />劉展華</td>
        <td>體育<br />潘文欽</td>
      </tr>
      <tr>
        <td>第六節<br />1420~1500</td>
        <td>體育<br />潘文欽</td>
        <td>國語<br />劉展華</td>
      </tr>
      <tr>
        <td>第七節<br />1520~1600</td>
        <td colspan="2">彈性<br />劉展華</td>
        <td>社會<br />劉展華</td>
      </tr>
    </table>
  </body>
</html>
```
<!-- endtab -->
{% endtabs %}

## 表單
HTML 表單是網頁中用來收集使用者輸入資料的重要元素。透過表單，使用者可以輸入文字、選擇選項、上傳檔案等，這些資料會被傳送到伺服器進行處理。表單是網頁互動的核心機制，廣泛應用於會員註冊、聯絡我們、問卷調查、電子商務等場景。

### 初始範例
以下是一個基本的 HTML 表單範例，展示了常見的表單元素和結構：

```html TryForm.html
<fieldset> <!-- fieldset 是一種可組合表單的元素，進行區塊打包並框線化 -->
  <legend>表單介紹</legend>
  <form method="post" enctype="multipart/form-data">
    <table width="100%">
      <tr>
        <td width="100">帳號：</td>
        <td><input type="text" name="id" placeholder="請輸入帳號" /></td>
      </tr>
      <tr>
        <td>密碼：</td>
        <td><input type="password" name="pw" placeholder="請輸入密碼" /></td>
      </tr>
      <tr>
        <td>性別：</td>
        <td>
          <!-- name 需相同，表示同一組單選，checked 為預設勾選選項 -->
          <input type="radio" name="gender" value="男" />男
          <input type="radio" name="gender" value="女" checked />女
        </td>
      </tr>
      <tr>
        <td>興趣：</td>
        <td>
          <!-- name 需相同，表示同一組複選，checked 為預設勾選選項 -->
          <input type="checkbox" name="like[]" value="拍照" />拍照
          <input type="checkbox" name="like[]" value="看書" />看書
          <input type="checkbox" name="like[]" value="唱歌" />唱歌
          <input type="checkbox" name="like[]" value="寫網頁" checked />寫網頁
          <input type="checkbox" name="like[]" value="逛街" checked />逛街
        </td>
      </tr>
      <tr>
        <td>出生年份：</td>
        <td>
          <select name="select">
            <option value="1980">1980</option>
            <option value="1990">1990</option>
            <option value="2000" selected>2000</option>
            <option value="2010">2010</option>
          </select>
          年
        </td>
      </tr>
      <tr>
        <td width="100">上傳檔案：</td>
        <td><input type="file" name="upload" /></td>
      </tr>
      <tr>
        <td>留言訊息：</td>
        <td><textarea name="msg" cols="50" rows="5"></textarea></td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input type="submit" value="送出" />
          <input type="reset" value="重置" />
        </td>
      </tr>
    </table>
  </form>
</fieldset>
```

**預覽結果**：
{% jsfiddle summer10920/26p8xt1j result dark 100% 400 %}

### 表單容器 (form)
form 標籤是表單的容器，定義了表單的提交方式和目標位置：

- **action 屬性**：指定表單提交的目標位置
- **method 屬性**：指定提交方式，主要有 GET 和 POST
- **enctype 屬性**：指定表單資料的編碼類型
- **target 屬性**：指定表單提交結果的顯示位置

```html
<!-- 基本表單容器 -->
<form action="process.php" method="post">
  <!-- 表單內容 -->
</form>

<!-- 包含檔案上傳的表單 -->
<form action="upload.php" method="post" enctype="multipart/form-data">
  <!-- 表單內容 -->
</form>

<!-- 在新視窗開啟結果 -->
<form action="search.php" method="get" target="_blank">
  <!-- 表單內容 -->
</form>
```

**GET vs POST 的差異：**
- **GET**：資料附加在 URL 後面，適用於搜尋、查詢等操作，資料量限制較小
- **POST**：資料在 HTTP 訊息主體中傳送，適用於敏感資料、大量資料傳輸

### 表單標籤與關聯 (label)
在介紹表單元素之前，先了解如何正確使用標籤，這對無障礙存取和使用者體驗都很重要：

#### 標籤關聯方式
label 標籤用於描述表單控制項，有兩種關聯方式：

```html
<!-- 方式一：使用 for 屬性關聯 -->
<label for="username">使用者名稱：</label>
<input type="text" id="username" name="username">

<!-- 方式二：標籤包裹輸入元素 -->
<label>
  密碼：
  <input type="password" name="password">
</label>

<!-- 複選框和單選按鈕的標籤使用 -->
<input type="checkbox" id="agree" name="agree" value="yes">
<label for="agree">我同意服務條款</label>

<!-- 或是包裹方式 -->
<label>
  <input type="radio" name="gender" value="male"> 男性
</label>
<label>
  <input type="radio" name="gender" value="female"> 女性
</label>
```

#### 標籤的重要性
- **無障礙存取**：螢幕閱讀器可以正確讀出標籤內容
- **使用者體驗**：點擊標籤可以聚焦到對應的輸入欄位
- **表單驗證**：瀏覽器可以在驗證失敗時正確顯示欄位名稱

### 表單控制項通用屬性與驗證
了解所有表單控制項共通的重要屬性和驗證機制：

#### 基本屬性
- **name**：欄位名稱，伺服器端用來接收資料的識別碼
- **id**：元素的唯一識別碼，用於 JavaScript 操作和 label 關聯
- **value**：欄位的預設值或當前值
- **placeholder**：輸入提示文字，顯示在空白欄位中
- **disabled**：停用欄位，使用者無法編輯，資料不會提交
- **readonly**：唯讀欄位，使用者無法編輯但可以選取，資料會提交

```html
<!-- 基本屬性範例 -->
<label for="username">使用者名稱：</label>
<input type="text" id="username" name="username" value="預設值" placeholder="請輸入使用者名稱">

<!-- 停用和唯讀的差異 -->
<label for="disabled_field">停用欄位：</label>
<input type="text" id="disabled_field" name="disabled_field" disabled value="這個欄位已停用">

<label for="readonly_field">唯讀欄位：</label>
<input type="text" id="readonly_field" name="readonly_field" readonly value="這個欄位唯讀">
```

#### 表單驗證屬性
HTML5 提供內建的表單驗證功能，能在提交前檢查資料的有效性：

- **required**：必填欄位，表單提交時會檢查是否為空
- **pattern**：使用正規表達式驗證格式
- **title**：驗證失敗時顯示的提示訊息
- **maxlength/minlength**：字元數限制
- **max/min**：數值範圍限制
- **step**：數值間隔

```html
<!-- 驗證屬性範例 -->
<form>
  <!-- 必填驗證 -->
  <label for="name">姓名（必填）：</label>
  <input type="text" id="name" name="name" required>
  
  <!-- 長度限制 -->
  <label for="username">使用者名稱（3-20 字元）：</label>
  <input type="text" id="username" name="username" minlength="3" maxlength="20" required>
  
  <!-- 格式驗證 -->
  <label for="phone">電話號碼：</label>
  <input type="tel" id="phone" name="phone" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" 
         title="請輸入格式：0912-345-678" placeholder="0912-345-678">
  
  <!-- 數值範圍 -->
  <label for="age">年齡（18-100）：</label>
  <input type="number" id="age" name="age" min="18" max="100" required>
  
  <!-- 自訂驗證訊息 -->
  <input type="email" name="email" required title="請輸入有效的電子郵件地址">

  <button type="submit">送出</button>
</form>
```

### 基本輸入元素 (input)
了解了標籤使用和通用屬性後，現在來介紹各種輸入類型。input 標籤透過 type 屬性可以建立不同類型的輸入欄位：

#### 文字輸入類型
```html
<!-- 一般文字輸入 -->
<label for="username">使用者名稱：</label>
<input type="text" id="username" name="username" placeholder="請輸入使用者名稱" required>

<!-- 密碼輸入 -->
<label for="password">密碼：</label>
<input type="password" id="password" name="password" placeholder="請輸入密碼" required>

<!-- 電子郵件輸入（自動驗證格式） -->
<label for="email">電子郵件：</label>
<input type="email" id="email" name="email" placeholder="example@email.com" required>

<!-- 網址輸入（自動驗證格式） -->
<label for="website">個人網站：</label>
<input type="url" id="website" name="website" placeholder="https://www.example.com">

<!-- 電話輸入 -->
<label for="phone">電話號碼：</label>
<input type="tel" id="phone" name="phone" placeholder="0912-345-678">

<!-- 搜尋欄位 -->
<label for="search">搜尋：</label>
<input type="search" id="search" name="search" placeholder="搜尋關鍵字">
```

#### 數值和日期輸入類型
這些類型有特定的屬性用於控制範圍和行為：

```html
<!-- 數字輸入 -->
<label for="age">年齡：</label>
<input type="number" id="age" name="age" min="1" max="120" step="1" value="25">

<!-- 範圍滑桿 -->
<label for="satisfaction">滿意度（1-10）：</label>
<input type="range" id="satisfaction" name="satisfaction" min="1" max="10" step="1" value="5">

<!-- 日期輸入 -->
<label for="birthday">生日：</label>
<input type="date" id="birthday" name="birthday" min="1900-01-01" max="2024-12-31">

<!-- 時間輸入 -->
<label for="appointment">預約時間：</label>
<input type="time" id="appointment" name="appointment" min="09:00" max="18:00" step="1800">

<!-- 日期時間輸入 -->
<label for="datetime">日期時間：</label>
<input type="datetime-local" id="datetime" name="datetime">

<!-- 月份輸入 -->
<label for="month">選擇月份：</label>
<input type="month" id="month" name="month">

<!-- 週數輸入 -->
<label for="week">選擇週數：</label>
<input type="week" id="week" name="week">
```

**數值輸入特有屬性：**
- **min/max**：設定最小/最大值
- **step**：設定數值間隔（如 step="0.1" 允許小數點一位）

#### 其他特殊輸入類型
```html
<!-- 顏色選擇器 -->
<label for="color">選擇顏色：</label>
<input type="color" id="color" name="color" value="#ff0000">

<!-- 檔案上傳 -->
<label for="file">選擇檔案：</label>
<input type="file" id="file" name="file" accept=".jpg,.png,.pdf" multiple>

<!-- 隱藏欄位 -->
<input type="hidden" name="user_id" value="12345">
```

**檔案上傳特有屬性：**
- **accept**：限制可選擇的檔案類型
- **multiple**：允許選擇多個檔案

### 選擇元素
用於讓使用者從預設的選項中進行選擇：

#### 單選按鈕 (Radio Button)
單選按鈕用於從多個選項中選擇一個，相同 name 的按鈕為一組：

```html
<fieldset>
  <legend>請選擇性別：</legend>
  
  <input type="radio" id="male" name="gender" value="male">
  <label for="male">男性</label>
  
  <input type="radio" id="female" name="gender" value="female" checked>
  <label for="female">女性</label>
  
  <input type="radio" id="other" name="gender" value="other">
  <label for="other">其他</label>
</fieldset>
```

**單選按鈕特有屬性：**
- **checked**：預設選取
- **value**：選取時的值

#### 複選框 (Checkbox)
複選框用於從多個選項中選擇多個：

```html
<fieldset>
  <legend>請選擇您的興趣：</legend>
  
  <input type="checkbox" id="reading" name="interests[]" value="reading">
  <label for="reading">閱讀</label>
  
  <input type="checkbox" id="music" name="interests[]" value="music" checked>
  <label for="music">音樂</label>
  
  <input type="checkbox" id="sports" name="interests[]" value="sports">
  <label for="sports">運動</label>
  
  <input type="checkbox" id="programming" name="interests[]" value="programming" checked>
  <label for="programming">程式設計</label>
</fieldset>
```

#### 下拉選單 (Select)
下拉選單用於節省空間，特別適合選項較多的情況：

```html
<!-- 基本下拉選單 -->
<label for="country">國家：</label>
<select id="country" name="country" required>
  <option value="">請選擇國家</option>
  <option value="tw" selected>台灣</option>
  <option value="cn">中國</option>
  <option value="jp">日本</option>
  <option value="us">美國</option>
</select>

<!-- 多選下拉選單 -->
<label for="skills">技能（可多選）：</label>
<select id="skills" name="skills[]" multiple size="4">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="javascript">JavaScript</option>
  <option value="php">PHP</option>
  <option value="python">Python</option>
</select>

<!-- 選項群組 -->
<label for="course">選擇課程：</label>
<select id="course" name="course">
  <optgroup label="前端課程">
    <option value="html-css">HTML/CSS 基礎</option>
    <option value="javascript">JavaScript 進階</option>
    <option value="react">React 框架</option>
  </optgroup>
  <optgroup label="後端課程">
    <option value="php">PHP 開發</option>
    <option value="nodejs">Node.js 開發</option>
    <option value="python">Python 開發</option>
  </optgroup>
</select>
```

**下拉選單特有屬性：**
- **multiple**：允許多選
- **size**：顯示的選項數量
- **selected**：預設選取的選項

### 文字區域 (textarea)
用於多行文字輸入，具有特定的尺寸控制屬性：

```html
<!-- 基本文字區域 -->
<label for="message">留言：</label>
<textarea id="message" name="message" rows="5" cols="50" placeholder="請輸入您的留言"></textarea>

<!-- 限制字數的文字區域 -->
<label for="description">產品描述：</label>
<textarea id="description" name="description" rows="4" cols="60" maxlength="500" 
          placeholder="請輸入產品描述（最多 500 字）"></textarea>

<!-- 不可調整大小的文字區域 -->
<label for="comment">評論：</label>
<textarea id="comment" name="comment" rows="6" cols="80" style="resize: none;"></textarea>
```

**文字區域特有屬性：**
- **rows**：顯示的行數
- **cols**：顯示的字元寬度
- **wrap**：文字換行方式（hard/soft）

### 按鈕元素
表單中的各種按鈕用於觸發不同的動作。了解按鈕與表單的關係對正確使用表單至關重要：

#### 按鈕與表單的關係
- **按鈕作用範圍**：按鈕會對其所在的表單產生作用
- **預設行為**：`<form>` 內的 `<button>` 預設 `type="submit"`，會提交表單
- **表單關聯**：按鈕必須在 `<form>` 標籤內才能正常作用於該表單
- **多個表單**：頁面中有多個表單時，按鈕只會影響包含它的表單

#### 各種按鈕類型
```html
<form action="process.php" method="post">
  <label for="username">使用者名稱：</label>
  <input type="text" id="username" name="username" required>
  
  <label for="password">密碼：</label>
  <input type="password" id="password" name="password" required>
  
  <!-- 提交按鈕：將表單資料送出 -->
  <button type="submit">送出表單</button>
  <input type="submit" value="送出表單">
  
  <!-- 重設按鈕：清空表單內容，回到預設狀態 -->
  <button type="reset">重設表單</button>
  <input type="reset" value="重設表單">
  
  <!-- 一般按鈕：不會提交表單，通常用於 JavaScript 功能 -->
  <button type="button" onclick="alert('按鈕被點擊')">一般按鈕</button>
  <input type="button" value="一般按鈕" onclick="alert('按鈕被點擊')">
</form>

<!-- 表單外的按鈕不會影響表單 -->
<button onclick="alert('這個按鈕不會提交表單')">表單外按鈕</button>
```

#### 重要觀念說明
```html
<!-- 錯誤示範：按鈕在表單外 -->
<form action="process.php" method="post">
  <input type="text" name="username" required>
</form>
<button>送出</button> <!-- 這個按鈕不會提交表單！ -->

<!-- 正確示範：按鈕在表單內 -->
<form action="process.php" method="post">
  <input type="text" name="username" required>
  <button>送出</button> <!-- 預設 type="submit"，會提交表單 -->
</form>

<!-- 明確指定按鈕類型 -->
<form action="process.php" method="post">
  <input type="text" name="username" required>
  
  <!-- 明確指定為提交按鈕 -->
  <button type="submit">確認送出</button>
  
  <!-- 明確指定為一般按鈕，不會提交表單 -->
  <button type="button" onclick="validateForm()">驗證資料</button>
</form>
```

#### 特殊按鈕類型
```html
<!-- 圖片按鈕：點擊圖片即可提交表單 -->
<form action="search.php" method="get">
  <input type="text" name="keyword" placeholder="搜尋關鍵字">
  <input type="image" src="images/search-button.png" alt="搜尋" width="50" height="30">
</form>

<!-- 多個提交按鈕：可以根據按鈕判斷使用者的動作 -->
<form action="post-action.php" method="post">
  <textarea name="content" placeholder="輸入文章內容"></textarea>
  
  <button type="submit" name="action" value="save">儲存草稿</button>
  <button type="submit" name="action" value="publish">發布文章</button>
</form>
```

#### 表單提交的觸發方式
```html
<form action="process.php" method="post">
  <input type="text" name="username" required>
  <input type="password" name="password" required>
  
  <!-- 方式一：點擊提交按鈕 -->
  <button type="submit">登入</button>
  
  <!-- 方式二：在輸入欄位按 Enter 鍵也會提交表單 -->
  <!-- 但前提是表單中有提交按鈕 -->
</form>

<!-- 沒有提交按鈕的表單，按 Enter 不會提交 -->
<form action="process.php" method="post">
  <input type="text" name="username">
  <button type="button" onclick="customSubmit()">自訂提交</button>
</form>
```

#### 按鈕的最佳實踐
- **明確指定類型**：建議明確寫出 `type` 屬性，避免混淆
- **語意化文字**：按鈕文字應清楚說明其功能
- **無障礙存取**：使用適當的 `aria-label` 或 `title` 屬性
- **防止重複提交**：可以用 JavaScript 在提交後停用按鈕

```html
<form action="order.php" method="post">
  <input type="text" name="product" required>
  <input type="number" name="quantity" min="1" required>
  
  <!-- 清楚的按鈕文字和防重複提交 -->
  <button type="submit" onclick="this.disabled=true; this.form.submit();">
    確認下單
  </button>
  
  <button type="reset">清除重填</button>
  
  <button type="button" onclick="calculateTotal()">
    計算總價
  </button>
</form>
```

### 表單組織元素
良好的表單組織能提升使用者體驗和無障礙存取：

#### 表單分組 (fieldset & legend)
```html
<form>
  <fieldset>
    <legend>個人資料</legend>
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">電子郵件：</label>
    <input type="email" id="email" name="email" required>
  </fieldset>
  
  <fieldset>
    <legend>聯絡方式</legend>
    <label for="phone">電話：</label>
    <input type="tel" id="phone" name="phone">
    
    <label for="address">地址：</label>
    <input type="text" id="address" name="address">
  </fieldset>
  
  <button type="submit">送出</button>
</form>
```

### 完整範例
以下是一個綜合運用各種表單元素的完整範例：

```html
<h1>會員註冊表單</h1>

<form action="register.php" method="post" enctype="multipart/form-data">
  <!-- 基本資料 -->
  <fieldset>
    <legend>基本資料</legend>
    
    <div class="form-group">
      <label for="username">使用者名稱：</label>
      <input type="text" id="username" name="username" minlength="3" maxlength="20" required placeholder="請輸入使用者名稱">
    </div>
    
    <div class="form-group">
      <label for="email">電子郵件：</label>
      <input type="email" id="email" name="email" required placeholder="example@email.com">
    </div>
    
    <div class="form-group">
      <label for="password">密碼：</label>
      <input type="password" id="password" name="password" minlength="8" required placeholder="至少 8 位字元">
    </div>
    
    <div class="form-group">
      <label for="confirm-password">確認密碼：</label>
      <input type="password" id="confirm-password" name="confirm-password" required placeholder="請再次輸入密碼">
    </div>
  </fieldset>
  
  <!-- 個人資訊 -->
  <fieldset>
    <legend>個人資訊</legend>
    
    <div class="form-group">
      <label for="fullname">真實姓名：</label>
      <input type="text" id="fullname" name="fullname" required placeholder="請輸入真實姓名">
    </div>
    
    <div class="form-group">
      <label>性別：</label>
      <input type="radio" id="male" name="gender" value="male">
      <label for="male">男性</label>
      
      <input type="radio" id="female" name="gender" value="female">
      <label for="female">女性</label>
      
      <input type="radio" id="other" name="gender" value="other">
      <label for="other">其他</label>
    </div>
    
    <div class="form-group">
      <label for="birthday">生日：</label>
      <input type="date" id="birthday" name="birthday">
    </div>
    
    <div class="form-group">
      <label for="phone">電話號碼：</label>
      <input type="tel" id="phone" name="phone" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" placeholder="0912-345-678">
    </div>
    
    <div class="form-group">
      <label for="address">地址：</label>
      <input type="text" id="address" name="address" placeholder="請輸入完整地址">
    </div>
  </fieldset>
  
  <!-- 偏好設定 -->
  <fieldset>
    <legend>偏好設定</legend>
    
    <div class="form-group">
      <label for="country">國家：</label>
      <select id="country" name="country" required>
        <option value="">請選擇國家</option>
        <option value="tw">台灣</option>
        <option value="cn">中國</option>
        <option value="jp">日本</option>
        <option value="us">美國</option>
        <option value="other">其他</option>
      </select>
    </div>
    
    <div class="form-group">
      <label>興趣愛好：</label>
      <input type="checkbox" id="reading" name="interests[]" value="reading">
      <label for="reading">閱讀</label>
      
      <input type="checkbox" id="music" name="interests[]" value="music">
      <label for="music">音樂</label>
      
      <input type="checkbox" id="sports" name="interests[]" value="sports">
      <label for="sports">運動</label>
      
      <input type="checkbox" id="programming" name="interests[]" value="programming">
      <label for="programming">程式設計</label>
    </div>
    
    <div class="form-group">
      <label for="avatar">頭像上傳：</label>
      <input type="file" id="avatar" name="avatar" accept="image/*">
    </div>
    
    <div class="form-group">
      <label for="bio">自我介紹：</label>
      <textarea id="bio" name="bio" rows="4" maxlength="500" placeholder="請簡單介紹自己（最多 500 字）"></textarea>
    </div>
  </fieldset>
  
  <!-- 服務條款 -->
  <fieldset>
    <legend>服務條款</legend>
    
    <div class="form-group">
      <input type="checkbox" id="terms" name="terms" required>
      <label for="terms">
        我已閱讀並同意 <a href="terms.html" target="_blank">服務條款</a>
      </label>
    </div>
    
    <div class="form-group">
      <input type="checkbox" id="newsletter" name="newsletter">
      <label for="newsletter">
        我希望收到最新消息和促銷資訊
      </label>
    </div>
  </fieldset>
  
  <!-- 提交按鈕 -->
  <div class="button-group">
    <button type="submit" class="submit-btn">註冊會員</button>
    <button type="reset" class="reset-btn">重設表單</button>
  </div>
  
  <!-- 隱藏欄位 -->
  <input type="hidden" name="source" value="website">
  <input type="hidden" name="timestamp" value="2024-03-15">
</form>
```

### 表單處理說明
表單提交後，資料會被傳送到伺服器進行處理。以下是完整的前後端處理流程：

#### 前端 HTML 表單
```html
<!-- 聯絡表單範例 contact.html -->
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>聯絡我們</title>
</head>
<body>
  <h1>聯絡我們</h1>
  
  <form action="contact_process.php" method="post" enctype="multipart/form-data">
    <fieldset>
      <legend>聯絡資訊</legend>
      
      <label for="name">姓名：</label>
      <input type="text" id="name" name="name" required>
      
      <label for="email">電子郵件：</label>
      <input type="email" id="email" name="email" required>
      
      <label for="phone">電話：</label>
      <input type="tel" id="phone" name="phone" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}">
      
      <label for="subject">主旨：</label>
      <select id="subject" name="subject" required>
        <option value="">請選擇</option>
        <option value="inquiry">一般詢問</option>
        <option value="support">技術支援</option>
        <option value="complaint">客訴建議</option>
      </select>
      
      <label for="message">訊息內容：</label>
      <textarea id="message" name="message" rows="5" required></textarea>
      
      <label for="attachment">附件：</label>
      <input type="file" id="attachment" name="attachment" accept=".pdf,.doc,.docx,.jpg,.png">
    </fieldset>
    
    <button type="submit">送出表單</button>
  </form>
</body>
</html>
```

#### 後端 PHP 處理 (contact_process.php)
```php
<?php
// 設定字元編碼
header('Content-Type: text/html; charset=utf-8');

// 檢查是否為 POST 請求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('錯誤：只接受 POST 請求');
}

// 接收表單資料
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// 資料驗證
$errors = [];

// 檢查必填欄位
if (empty($name)) {
    $errors[] = '姓名不能為空';
}

if (empty($email)) {
    $errors[] = '電子郵件不能為空';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = '電子郵件格式不正確';
}

if (empty($subject)) {
    $errors[] = '請選擇主旨';
}

if (empty($message)) {
    $errors[] = '訊息內容不能為空';
}

// 電話號碼格式驗證
if (!empty($phone) && !preg_match('/^[0-9]{4}-[0-9]{3}-[0-9]{3}$/', $phone)) {
    $errors[] = '電話號碼格式不正確';
}

// 檔案上傳處理
$upload_info = null;
if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['attachment'];
    $allowed_types = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    $max_size = 5 * 1024 * 1024; // 5MB
    
    // 檢查檔案類型
    if (!in_array($file['type'], $allowed_types)) {
        $errors[] = '不支援的檔案類型';
    }
    
    // 檢查檔案大小
    if ($file['size'] > $max_size) {
        $errors[] = '檔案大小超過 5MB 限制';
    }
    
    // 如果沒有錯誤，移動檔案
    if (empty($errors)) {
        $upload_dir = 'uploads/';
        $filename = date('YmdHis') . '_' . $file['name'];
        $upload_path = $upload_dir . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $upload_path)) {
            $upload_info = [
                'filename' => $filename,
                'original_name' => $file['name'],
                'path' => $upload_path
            ];
        } else {
            $errors[] = '檔案上傳失敗';
        }
    }
}

// 如果有錯誤，顯示錯誤訊息
if (!empty($errors)) {
    echo '<h2>表單驗證錯誤</h2>';
    echo '<ul>';
    foreach ($errors as $error) {
        echo '<li>' . htmlspecialchars($error) . '</li>';
    }
    echo '</ul>';
    echo '<a href="javascript:history.back()">返回重新填寫</a>';
    exit;
}

// 資料清理（防止 XSS 攻擊）
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$phone = htmlspecialchars($phone);
$subject = htmlspecialchars($subject);
$message = htmlspecialchars($message);

// 儲存到資料庫（需要先建立資料庫連線）
try {
    // 資料庫連線設定
    $host = 'localhost';
    $dbname = 'contact_db';
    $username = 'your_username';
    $password = 'your_password';
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 插入資料
    $sql = "INSERT INTO contacts (name, email, phone, subject, message, attachment, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())";
    $stmt = $pdo->prepare($sql);
    
    $attachment_path = $upload_info ? $upload_info['path'] : null;
    $stmt->execute([$name, $email, $phone, $subject, $message, $attachment_path]);
    
    $contact_id = $pdo->lastInsertId();
    
} catch (PDOException $e) {
    error_log("資料庫錯誤：" . $e->getMessage());
    die('系統錯誤，請稍後再試');
}

// 發送電子郵件通知
$to = 'admin@example.com';
$email_subject = '新的聯絡表單：' . $subject;
$email_body = "
姓名：$name
電子郵件：$email
電話：$phone
主旨：$subject
訊息內容：
$message

提交時間：" . date('Y-m-d H:i:s') . "
聯絡編號：$contact_id
";

if ($upload_info) {
    $email_body .= "\n 附件：" . $upload_info['original_name'];
}

// 設定郵件標頭
$headers = "From: noreply@example.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 發送郵件
$mail_sent = mail($to, $email_subject, $email_body, $headers);

// 顯示成功訊息
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>表單提交成功</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .success { color: green; border: 2px solid green; padding: 20px; border-radius: 5px; background-color: #f0fff0; }
        .info { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="success">
        <h2>✅ 表單提交成功！</h2>
        <p>感謝您的聯絡，我們已收到您的訊息。</p>
    </div>
    
    <div class="info">
        <h3>您提交的資訊：</h3>
        <p><strong>姓名：</strong><?= $name ?></p>
        <p><strong>電子郵件：</strong><?= $email ?></p>
        <p><strong>電話：</strong><?= $phone ?></p>
        <p><strong>主旨：</strong><?= $subject ?></p>
        <p><strong>訊息：</strong><?= nl2br($message) ?></p>
        <?php if ($upload_info): ?>
        <p><strong>附件：</strong><?= $upload_info['original_name'] ?></p>
        <?php endif; ?>
        <p><strong>聯絡編號：</strong><?= $contact_id ?></p>
        <p><strong>提交時間：</strong><?= date('Y-m-d H:i:s') ?></p>
    </div>
    
    <?php if ($mail_sent): ?>
    <p>✅ 我們已發送確認郵件到您的信箱。</p>
    <?php else: ?>
    <p>⚠️ 確認郵件發送失敗，但您的訊息已成功記錄。</p>
    <?php endif; ?>
    
    <p><a href="contact.html">返回聯絡表單</a></p>
</body>
</html>
```

#### 資料庫建立 SQL
```sql
-- 建立聯絡表單資料庫
CREATE DATABASE contact_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用資料庫
USE contact_db;

-- 建立聯絡表單資料表
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    attachment VARCHAR(255),
    created_at DATETIME NOT NULL,
    status ENUM('new', 'processing', 'completed') DEFAULT 'new'
);

-- 插入測試資料
INSERT INTO contacts (name, email, phone, subject, message, created_at) 
VALUES ('測試用戶', 'test@example.com', '0912-345-678', 'inquiry', '這是測試訊息', NOW());
```

#### 表單處理的最佳實踐
1. **前端驗證**：提供即時的使用者體驗
2. **後端驗證**：確保資料安全性，永遠不要只依賴前端驗證
3. **資料清理**：防止 XSS 攻擊，使用 `htmlspecialchars()` 等函數
4. **SQL 防護**：使用 prepared statements 防止 SQL 注入
5. **錯誤處理**：提供友善的錯誤訊息，記錄詳細的錯誤日誌
6. **檔案上傳安全**：限制檔案類型和大小，使用安全的儲存路徑

#### GET vs POST 資料接收
```php
// GET 方法接收資料（適用於搜尋、查詢）
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $search = $_GET['search'] ?? '';
    $page = $_GET['page'] ?? 1;
    
    // 處理搜尋邏輯
    echo "搜尋關鍵字：" . htmlspecialchars($search);
    echo "頁碼：" . intval($page);
}

// POST 方法接收資料（適用於表單提交、敏感資料）
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // 處理登入邏輯
    // 注意：實際應用中密碼應該要加密處理
}

// 接收陣列資料（如複選框、多選下拉選單）
$interests = $_POST['interests'] ?? [];
foreach ($interests as $interest) {
    echo "興趣：" . htmlspecialchars($interest) . "<br>";
}
```

#### 簡化的表單處理範例
如果您是初學者，可以先從這個簡化的範例開始：

```php
<?php
// 簡化的表單處理 simple_form.php
if ($_POST) {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // 簡單驗證
    if (empty($name) || empty($email) || empty($message)) {
        echo "請填寫所有欄位";
    } else {
        // 顯示接收到的資料
        echo "<h2>收到您的訊息：</h2>";
        echo "<p>姓名：" . htmlspecialchars($name) . "</p>";
        echo "<p>信箱：" . htmlspecialchars($email) . "</p>";
        echo "<p>訊息：" . htmlspecialchars($message) . "</p>";
    }
}
?>

<!-- 簡單的表單 -->
<form method="post">
    姓名：<input type="text" name="name" required><br>
    信箱：<input type="email" name="email" required><br>
    訊息：<textarea name="message" required></textarea><br>
    <button type="submit">送出</button>
</form>
```

{% note info %}
**表單設計最佳實踐：**
- **先驗證後處理**：總是在處理資料前進行完整的驗證
- **雙重驗證**：前端提供使用者體驗，後端確保安全性
- **清晰的錯誤訊息**：幫助使用者了解問題並正確修正
- **適當的輸入類型**：使用正確的 input type 提升使用者體驗
- **無障礙存取**：使用 label、fieldset、legend 等標籤
- **資料安全**：對使用者輸入進行適當的過濾和驗證
- **使用者回饋**：提供明確的成功或失敗訊息
- **響應式設計**：確保表單在不同裝置上都能正常使用
{% endnote%}

## 總結練習
這裡做一個基本的 HTML 編輯，只使用 HTML 元素完成並不依賴任何 CSS。請根據以下 Result 結果試著反向做出 HTML 代碼

{% tabs demoHTML，1 %}
<!-- tab 題目-->
{% jsfiddle summer10920/sbq1kpyt result dark 100% 1200 %}
<!-- endtab -->
<!-- tab 解答-->
```html totalTest.html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>我的第一個網頁</title>
  <style>
    table {
      border-collapse: collapse;
      /* 讓邊框合併為單一邊框 */
    }
  </style>
</head>

<body>
  <h1 id="top"><em>網頁前端技術</em></h1>
  <p>
    這是我在職訓期間所要學習的前端技術，每項技術都有它負責的工作，學習網頁最重要的是<strong>技術觀念</strong>，不需要去背記全部的標籤、屬性、值，常使用自然會記起，
    遇到不懂或是忘記的標籤，使用網路資源 Google 或前往
    <a href="http://www.runoob.com/" target="_blank">菜鳥教程</a>
    查詢，一定要自己去嘗試，才能產生自己的想法。
  </p>
  <ul>
    <li><a href="#html">HTML</a></li>
    <li><a href="#css">CSS</a></li>
    <li><a href="#js">Javascript</a></li>
    <li><a href="#jq">JQuery</a></li>
    <li><a href="#bs">Bootstrap</a></li>
  </ul>

  <hr />

  <img src="https://imgur.com/VCHx7bt.png" width="150" alt="html" title="html" id="html" />
  <h2>HTML-負責架構、內容</h2>
  <p>
    超文本標記語言（英語：HyperText Markup
    Language，簡稱：HTML）是一種用於建立網頁的標準標記語言。HTML
    是一種基礎技術，常與 CSS、JavaScript
    一起被眾多網站用於設計賞心悅目的網頁、網頁應用程式以及行動應用程式的使用者介面。網頁瀏覽器可以讀取
    HTML 檔案，並將其彩現成視覺化網頁。HTML
    描述了一個網站的結構語意隨著線索的呈現，使之成為一種標記語言而非程式語言。
  </p>

  <h3>基礎結構：</h3>
  <pre><code>
  &lt;html&gt;
    &lt;head&gt;

    &lt;/head&gt;
    &lt;body&gt;

    &lt;/body&gt;
  &lt;/html&gt;
  </code></pre>

  <h3>標籤特性：</h3>
  <ol>
    <li>標籤不分大小寫，但請用小寫。</li>
    <li>"< >" 開頭，"< />" 結尾。</li> <!--雖然 Chrome 聰明讀出你的文字，但這裡應該使用實體化符號-->
    <li>標籤具有屬性與值的特性。</li>
    <li>標籤標記內容，產生語義，組成了結構。</li>
  </ol>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <img src="https://i.imgur.com/XDcJWRp.png" width="150" alt="css" title="css" id="css" />
  <h2>CSS-負責外觀、樣式</h2>
  <p>
    層疊樣式表（英語：Cascading Style
    Sheets，簡寫 CSS），又稱串樣式列表、級聯樣式表、串接樣式表、階層式樣式表，一種用來為結構化文件（如
    HTML 文件或 XML 應用）添加樣式（字型、間距和顏色等）的電腦語言，由 W3C
    定義和維護。目前最新版本是 CSS2.1，為 W3C 的推薦標準。CSS3
    現在已被大部分現代瀏覽器支援，而下一版的 CSS4 仍在開發中。
  </p>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <img src="https://i.imgur.com/6y1TXDv.png" width="150" alt="JavaScript" title="JavaScript" id="js" />
  <h2>JavaScript-負責行為、互動</h2>
  <p>
    JavaScript，通常縮寫為 JS，是一種進階直譯語言的程式語言。JavaScript
    是一門基於原型、函式先行的語言，是一門多範式的語言，它支援物件導向編程，指令式程式設計，以及函式語言程式設計。
  </p>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <img src="https://i.imgur.com/62fxrEf.jpg" width="150" alt="jQuery" title="jQuery" id="jq" />
  <h2>JQuery-JavaScript 函式庫</h2>
  <p>
    jQuery 是一套跨瀏覽器的 JavaScript 函式庫，簡化 HTML 與 JavaScript
    之間的操作。全球前 10,000 個存取最高的網站中，有 65%
    使用了 jQuery，是目前最受歡迎的 JavaScript 函式庫
  </p>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <img src="https://i.imgur.com/eScPvUF.png" width="150" alt="bootstrap" title="Bootstrap" id="bs" />
  <h2>Bootstrap-前端框架</h2>
  <p>
    Bootstrap
    是一組用於網站和網路應用程式開發的開源前端（所謂「前端」，指的是展現給終端使用者的介面。與之對應的「後端」是在伺服器上面執行的程式碼）框架，包括
    HTML、CSS 及 JavaScript
    的框架，提供字體排印、表單、按鈕、導航及其他各種元件及 Javascript
    擴充套件，旨在使動態網頁和 Web 應用的開發更加容易。
  </p>
  <a href="#top"><strong>回頂端</strong></a>

  <hr />

  <center> 
    <h2>座位表</h2>
    <table width="800px" align="center" border="1px">
      <tr>
        <td colspan="4">
          <table align="center" border="1">
            <tr>
              <td>老師的位置</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr align="center">
        <td>4 號</td>
        <td>3 號</td>
        <td>2 號</td>
        <td>1 號</td>
      </tr>
      <tr align="center">
        <td>8 號</td>
        <td>7 號</td>
        <td>6 號</td>
        <td>5 號</td>
      </tr>
      <tr align="center">
        <td>12 號</td>
        <td>11 號</td>
        <td>10 號</td>
        <td>9 號</td>
      </tr>
      <tr align="center">
        <td>16 號</td>
        <td>15 號</td>
        <td>14 號</td>
        <td>13 號</td>
      </tr>
      <tr align="center">
        <td>20 號</td>
        <td>19 號</td>
        <td>18 號</td>
        <td>17 號</td>
      </tr>
      <tr align="center">
        <td>24 號</td>
        <td>23 號</td>
        <td>22 號</td>
        <td>21 號</td>
      </tr>
    </table>
  </center>
</body>
</html>
<!--
  vscode 看到紅色的標籤或屬性都代表 HTML5 已淘汰的東西，但還能執行是 chrome 還能支援
  現在的規範都是希望透過 CSS 來完成版面或外觀處理，讓 HTML 只有單純的結構與語意化。
-->
```
<!-- endtab -->
{% endtabs %}

# 深入探討
學習了基本的 HTML 標籤和表單後，我們來探討一些更深層的概念。這些知識點將幫助你更好地理解 HTML 的本質，並為日後的網頁開發打下堅實的基礎。掌握這些進階概念，將讓你從 HTML 初學者真正成長為具有專業水準的開發者。

## 區塊與行內元素
HTML 元素根據其顯示特性分為兩大類：區塊元素（block）和行內元素（inline）。理解這兩者的差異對於網頁佈局至關重要。

### 基本概念
- **區塊元素（Block）**：橫行霸道的佔位王，獨佔一行，前後會有換行
- **行內元素（Inline）**：循規蹈矩的乖乖排，在同一行內排列，不會換行

### 主要差異比較
| 特性     | 區塊元素             | 行內元素         |
| -------- | -------------------- | ---------------- |
| 顯示方式 | 獨佔一行，前後換行   | 在同一行內排列   |
| 寬度設定 | 可以設定 width       | 無法設定 width   |
| 高度設定 | 可以設定 height      | 無法設定 height  |
| 邊界設定 | 可以設定上下左右邊界 | 只能設定左右邊界 |
| 預設寬度 | 撐滿父元素           | 依內容決定       |

### 代表性元素
```html
<!-- 區塊元素範例 -->
<div>萬用容器，最常用的佈局元素</div>
<p>段落元素</p>
<h1>標題元素</h1>
<ul>清單元素</ul>
<table>表格元素</table>
<form>表單元素</form>
<header>HTML5 語意標籤</header>
<section>HTML5 語意標籤</section>

<!-- 行內元素範例 -->
<span>萬用行內容器</span>
<a href="#">連結元素</a>
<strong>強調元素</strong>
<em>斜體元素</em>
<img src="image.jpg" alt="圖片">
<input type="text">
<label>標籤元素</label>
```

### 實際應用範例
```html
<!-- 區塊元素的特性展示 -->
<div style="background: lightblue; padding: 10px;">
  <h2>這是一個區塊元素</h2>
  <p>段落元素也是區塊元素，會獨佔一行</p>
</div>

<!-- 行內元素的特性展示 -->
<p>
  這是一個段落，包含多個行內元素：
  <span style="background: yellow;">這是 span</span>
  <a href="#">這是連結</a>
  <strong>這是粗體</strong>
  <em>這是斜體</em>
  它們都在同一行內排列。
</p>

<!-- 混合使用的實際案例 -->
<div class="article">
  <h2>文章標題</h2>
  <p>
    這是文章內容，包含
    <a href="#">相關連結</a>
    以及
    <strong>重要資訊</strong>
    的說明。
  </p>
  <div class="author">
    作者：<span class="name">張三</span>
    發布時間：<span class="date">2024-03-15</span>
  </div>
</div>
```

### div 與 span 的重要性
```html
<!-- div：區塊佈局的基石 -->
<div class="container">
  <div class="header">
    <h1>網站標題</h1>
  </div>
  <div class="content">
    <p>主要內容區域</p>
  </div>
  <div class="footer">
    <p>頁尾資訊</p>
  </div>
</div>

<!-- span：行內樣式的精確控制 -->
<p>
  價格：<span class="price">NT$1,200</span>
  原價：<span class="original-price">NT$1,500</span>
  折扣：<span class="discount">20% OFF</span>
</p>
```

## 符號（字元）實體化
在 HTML 中，某些字元具有特殊意義，如果要在網頁上顯示這些字元，需要使用實體化符號。

### 為什麼需要實體化？
HTML 使用 `<` 和 `>` 來識別標籤，使用 `&` 來識別實體，因此這些字元不能直接在內容中使用，需要進行實體化處理。

### 常用實體化符號對照表
| 符號    | 說明       | 實體化名稱 | 實體化代號 | 使用場景       |
| ------- | ---------- | ---------- | ---------- | -------------- |
| <       | 小於號     | `&lt;`     | `&#60;`    | 顯示 HTML 標籤 |
| >       | 大於號     | `&gt;`     | `&#62;`    | 顯示 HTML 標籤 |
| &       | 和號       | `&amp;`    | `&#38;`    | 顯示 & 符號    |
| "       | 雙引號     | `&quot;`   | `&#34;`    | 屬性值中的引號 |
| '       | 單引號     | `&apos;`   | `&#39;`    | 屬性值中的引號 |
| &nbsp;  | 不間斷空格 | `&nbsp;`   | `&#160;`   | 強制空格       |
| &copy;  | 版權符號   | `&copy;`   | `&#169;`   | 版權聲明       |
| &reg;   | 註冊商標   | `&reg;`    | `&#174;`   | 商標標示       |
| &trade; | 商標符號   | `&trade;`  | `&#8482;`  | 商標標示       |

### 實際應用範例
```html
<!-- 錯誤：直接使用特殊字元 -->
<p>如果你想顯示 <div> 標籤，這樣寫是錯誤的</p>
<!-- 結果：瀏覽器會嘗試解析 <div> 為 HTML 標籤 -->

<!-- 正確：使用實體化符號 -->
<p>如果你想顯示 &lt;div&gt; 標籤，這樣寫是正確的</p>
<!-- 結果：瀏覽器會顯示 <div> 文字 -->

<!-- 程式碼顯示範例 -->
<pre>
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt; 網頁標題&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>

<!-- 版權和商標資訊 -->
<footer>
  <p>&copy; 2024 我的網站 版權所有</p>
  <p>品牌名稱&reg; 是註冊商標</p>
  <p>產品名稱&trade; 是商標</p>
</footer>

<!-- 特殊格式需求 -->
<p>數學公式：3 &lt; 5 &amp; 5 &gt; 1</p>
<p>強制空格：字&nbsp;&nbsp;&nbsp;&nbsp; 距&nbsp;&nbsp;&nbsp;&nbsp; 加&nbsp;&nbsp;&nbsp;&nbsp; 寬</p>
```

### JavaScript 中的使用
```html
<!-- 在 JavaScript 中處理實體化 -->
<script>
// 錯誤的做法
document.getElementById('demo').innerHTML = '<div>這會被解析為 HTML</div>';

// 正確的做法
document.getElementById('demo').innerHTML = '&lt;div&gt; 這會顯示為文字&lt;/div&gt;';

// 或是使用 textContent（推薦）
document.getElementById('demo').textContent = '<div>這會自動轉義</div>';
</script>
```

## HTML5 的演進與特色
HTML5 是 HTML 的第五個主要版本，於 2014 年正式發布。它不僅僅是 HTML 的升級，而是包含 HTML、CSS3、JavaScript 在內的一套完整技術標準。

### 技術組合說明
HTML5 實際上是一個技術組合概念：

- **HTML5**：負責文檔結構和語意標記
- **CSS3**：負責外觀樣式和動畫效果
- **JavaScript**：負責互動行為和動態功能

{% jsfiddle summer10920/20rqaLzg html,css,js,result dark 100% 500 %}

### 語法簡化對比
HTML5 大幅簡化了語法，讓開發更加便利：

```html
<!-- HTML 4.01 的複雜語法 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>HTML4 頁面</title>
    <script type="text/javascript" src="script.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div id="header">
        <h1>網站標題</h1>
    </div>
    <div id="nav">
        <ul>
            <li><a href="#">首頁</a></li>
            <li><a href="#">關於我們</a></li>
        </ul>
    </div>
    <div id="content">
        <h2>內容標題</h2>
        <p>這是內容段落。</p>
    </div>
    <div id="footer">
        <p>版權所有 © 2024</p>
    </div>
</body>
</html>
```

```html
<!-- HTML5 的簡潔語法 -->
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>HTML5 頁面</title>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>網站標題</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">首頁</a></li>
            <li><a href="#">關於我們</a></li>
        </ul>
    </nav>
    <main>
        <h2>內容標題</h2>
        <p>這是內容段落。</p>
    </main>
    <footer>
        <p>版權所有 © 2024</p>
    </footer>
</body>
</html>
```

### 語意標籤的重要性
HTML5 引入了語意標籤，讓網頁結構更有意義：

#### 主要語意標籤
- `<header>`：頁首區域
- `<nav>`：導航區域
- `<main>`：主要內容區域
- `<section>`：章節區域
- `<article>`：文章內容
- `<aside>`：側邊欄區域
- `<footer>`：頁尾區域
- `<figure>`：圖表區域
- `<figcaption>`：圖表說明

#### 語意化的好處
1. **SEO 優化**：搜尋引擎更容易理解網頁結構
2. **無障礙存取**：螢幕閱讀器能更好地解讀網頁
3. **程式碼可讀性**：開發者更容易理解和維護
4. **結構清晰**：網頁結構更加清晰明確

#### 語意化對比範例
```html
<!-- 傳統 HTML4 寫法：缺乏語意 -->
<div id="header">
  <div id="logo">網站標題</div>
  <div id="menu">
    <ul>
      <li><a href="#home">首頁</a></li>
      <li><a href="#about">關於我們</a></li>
    </ul>
  </div>
</div>

<div id="content">
  <div class="post">
    <h2>文章標題</h2>
    <p>文章內容。..</p>
  </div>
</div>

<div id="sidebar">
  <div class="widget">相關連結</div>
</div>

<div id="footer">
  <p>版權資訊</p>
</div>
```

```html
<!-- HTML5 語意化寫法：結構清晰 -->
<header>
  <h1>網站標題</h1>
  <nav>
    <ul>
      <li><a href="#home">首頁</a></li>
      <li><a href="#about">關於我們</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>文章標題</h2>
    <p>文章內容。..</p>
  </article>
</main>

<aside>
  <section>
    <h3>相關連結</h3>
    <ul>
      <li><a href="#">連結一</a></li>
      <li><a href="#">連結二</a></li>
    </ul>
  </section>
</aside>

<footer>
  <p>&copy; 2024 版權所有</p>
</footer>
```

## 網頁無障礙設計
網頁無障礙設計（Web Accessibility）是確保所有人，包括身心障礙者，都能有效使用網頁的設計原則。良好的無障礙設計不僅協助身心障礙者，也能提升所有使用者的整體體驗。HTML5 提供了豐富的語意標籤和無障礙功能，配合適當的 ARIA 屬性和設計技巧，可以建立對所有使用者都友善的網頁。

### 無障礙存取基本概念
無障礙存取（Accessibility，簡稱 a11y）是讓所有人都能平等使用網站的設計理念。良好的無障礙設計不僅協助身心障礙者，也能提升所有使用者的整體體驗。

**主要受益族群：**
- **視覺障礙者**：使用螢幕閱讀器瀏覽網頁
- **聽覺障礙者**：需要字幕或視覺提示來理解內容
- **行動障礙者**：可能無法使用滑鼠，需要鍵盤導航
- **認知障礙者**：需要清晰的結構和簡潔的導航

```html
<!-- 基本無障礙 HTML 結構 -->
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>無障礙網站範例</title>
</head>
<body>
  <!-- 跳過連結，讓鍵盤使用者快速到達主要內容 -->
  <a href="#main-content" class="skip-link">跳到主要內容</a>
  
  <header>
    <h1>網站標題</h1>
    <nav aria-label="主要導航">
      <ul>
        <li><a href="#home">首頁</a></li>
        <li><a href="#about">關於我們</a></li>
        <li><a href="#contact">聯絡我們</a></li>
      </ul>
    </nav>
  </header>
  
  <main id="main-content">
    <h2>主要內容開始</h2>
    <!-- 主要內容 -->
  </main>
  
  <footer>
    <p>&copy; 2024 無障礙網站範例</p>
  </footer>
</body>
</html>
```

### 語意標籤與 role 屬性
HTML5 的語意標籤本身就具有無障礙特性，但有時需要 role 屬性來補強語意或定義自訂元素的作用。

**常用的 role 值：**
- **button**：將其他元素標記為按鈕
- **alert**：重要的警告訊息
- **navigation**：導航區域
- **main**：主要內容區域
- **banner**：頁首橫幅
- **contentinfo**：頁尾資訊

```html
<!-- 基本 role 使用 -->
<div role="button" tabindex="0">這是一個按鈕</div>
<div role="alert">這是警告訊息</div>
<div role="navigation">這是導航區域</div>

<!-- 當標籤語意不夠明確時使用 -->
<a href="#" role="button">當連結用作按鈕時</a>
<div role="img" aria-label="公司標誌">📊</div>

<!-- 實際應用範例：自訂導航選單 -->
<nav role="navigation" aria-label="主要導航">
  <ul>
    <li><a href="#" aria-current="page">首頁</a></li>
    <li>
      <a href="#" role="button" aria-expanded="false" aria-haspopup="true">
        產品
      </a>
      <ul hidden>
        <li><a href="#">產品一</a></li>
        <li><a href="#">產品二</a></li>
      </ul>
    </li>
  </ul>
</nav>

<!-- 實際應用範例：頁面結構 -->
<div role="banner">
  <h1>網站標題</h1>
</div>
<main role="main">
  <h2>主要內容</h2>
</main>
<div role="contentinfo">
  <p>版權聲明</p>
</div>
```

### ARIA 屬性
ARIA（Accessible Rich Internet Applications）屬性提供更詳細的無障礙資訊，幫助輔助技術理解動態內容和複雜互動元素。

**常用的 aria-* 屬性：**
- **aria-label**：為元素提供無障礙標籤
- **aria-labelledby**：引用其他元素作為標籤
- **aria-describedby**：引用其他元素作為描述
- **aria-hidden**：對螢幕閱讀器隱藏裝飾性元素
- **aria-expanded**：表示可展開元素的狀態

```html
<!-- aria-label：為元素提供無障礙標籤 -->
<button aria-label="關閉對話框">×</button>
<input type="search" aria-label="搜尋商品">

<!-- aria-labelledby：引用其他元素作為標籤 -->
<h2 id="billing">帳單地址</h2>
<fieldset aria-labelledby="billing">
  <input type="text" placeholder="街道地址">
  <input type="text" placeholder="城市">
</fieldset>

<!-- aria-describedby：引用其他元素作為描述 -->
<input type="password" aria-describedby="pwd-help">
<div id="pwd-help">密碼至少需要 8 個字元</div>

<!-- aria-hidden：對螢幕閱讀器隱藏裝飾性元素 -->
<button>
  <span aria-hidden="true">🔍</span>
  搜尋
</button>

<!-- aria-expanded：表示可展開元素的狀態 -->
<button aria-expanded="false" aria-controls="menu">選單</button>
<ul id="menu" hidden>
  <li><a href="#">項目一</a></li>
  <li><a href="#">項目二</a></li>
</ul>

<!-- 實際應用範例：搜尋表單 -->
<form role="search">
  <label for="search-input">搜尋關鍵字</label>
  <input type="search" id="search-input" 
         aria-describedby="search-help" 
         required>
  <div id="search-help">輸入產品名稱或關鍵字</div>
  <button type="submit" aria-label="執行搜尋">搜尋</button>
</form>
```

### 鍵盤導航支援
鍵盤導航是無障礙設計的重要組成部分，讓無法使用滑鼠的使用者能夠透過鍵盤操作網頁。主要透過 tabindex 屬性和適當的事件處理來實現。

**tabindex 屬性值：**
- **`tabindex="0"`**：讓元素能夠被鍵盤聚焦，按照自然順序
- **`tabindex="-1"`**：讓元素能夠被程式聚焦，但不在鍵盤導航順序中
- **`tabindex="1"`以上**：自訂聚焦順序（不建議使用）

```html
<!-- 可用鍵盤操作的自訂元素 -->
<div role="button" 
     tabindex="0" 
     aria-label="播放影片"
     onkeydown="if(event.key==='Enter'||event.key===' '){playVideo()}">
  ▶️ 播放
</div>

<!-- 跳過連結（給鍵盤使用者） -->
<a href="#main-content" class="skip-link">跳到主要內容</a>

<!-- 實際應用範例：自訂下拉選單 -->
<div class="dropdown">
  <button aria-haspopup="true" aria-expanded="false" aria-controls="dropdown-menu">
    選項
  </button>
  <ul id="dropdown-menu" hidden>
    <li><a href="#" tabindex="-1">選項一</a></li>
    <li><a href="#" tabindex="-1">選項二</a></li>
    <li><a href="#" tabindex="-1">選項三</a></li>
  </ul>
</div>

<!-- 實際應用範例：互動式卡片 -->
<div class="card" tabindex="0" role="button" aria-label="開啟產品詳細資料">
  <h3>產品名稱</h3>
  <p>產品描述</p>
  <span aria-hidden="true">→</span>
</div>

<script>
// 鍵盤事件處理
document.querySelectorAll('[role="button"]').forEach(button => {
  button.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  });
});
</script>
```

### 標題結構與語言標記
正確的標題層級結構讓螢幕閱讀器使用者能夠快速理解頁面結構，語言標記則確保螢幕閱讀器使用正確的語音合成。

**正確的標題結構原則：**
- 使用 h1 作為頁面主標題
- 標題層級不可跳級（h1 → h2 → h3）
- 每個區塊都應有適當的標題
- 避免僅為了視覺效果而使用標題標籤

```html
<!-- 正確的標題結構 ✓ -->
<h1>網站標題</h1>
  <h2>章節標題</h2>
    <h3>子章節標題</h3>
    <h3>另一個子章節</h3>
  <h2>另一個章節</h2>
    <h3>子章節</h3>
      <h4>詳細內容</h4>

<!-- 實際應用範例：完整頁面結構 -->
<article>
  <h1>HTML 無障礙存取指南</h1>
  
  <section>
    <h2>基本概念</h2>
    <p>無障礙存取的重要性。..</p>
    
    <h3>何謂無障礙</h3>
    <p>無障礙存取是指。..</p>
    
    <h3>受益族群</h3>
    <p>不只是身心障礙者。..</p>
  </section>
  
  <section>
    <h2>實作技巧</h2>
    <p>如何實作無障礙網頁。..</p>
    
    <h3>ARIA 屬性</h3>
    <p>ARIA 屬性的使用。..</p>
    
    <h3>鍵盤導航</h3>
    <p>鍵盤導航的重要性。..</p>
  </section>
</article>

<!-- 語言標記範例 -->
<html lang="zh-TW">
<head>
  <title>繁體中文網站</title>
</head>
<body>
  <h1>歡迎來到我們的網站</h1>
  
  <!-- 混合語言內容 -->
  <p>歡迎來到我們的網站，我們的英文名稱是 
     <span lang="en">Amazing Company</span>。</p>
  
  <!-- 引用其他語言 -->
  <blockquote lang="en">
    <p>The best way to predict the future is to create it.</p>
    <cite>Peter Drucker</cite>
  </blockquote>
  
  <!-- 多語言導航 -->
  <nav aria-label="語言選擇">
    <ul>
      <li><a href="/zh-tw" lang="zh-TW">繁體中文</a></li>
      <li><a href="/en" lang="en">English</a></li>
      <li><a href="/ja" lang="ja">日本語</a></li>
    </ul>
  </nav>
</body>
</html>
```

### 表單無障礙設計
表單是網站互動的重要元素，良好的表單無障礙設計能確保所有使用者都能順利完成表單操作。

**表單無障礙要點：**
- 所有輸入欄位都要有明確的 label
- 使用 fieldset 和 legend 組織相關欄位
- 提供清楚的錯誤訊息和驗證回饋
- 使用 aria-invalid 標示錯誤狀態

```html
<!-- 基本表單無障礙 -->
<form>
  <fieldset>
    <legend>個人資訊</legend>
    
    <label for="name">姓名（必填）</label>
    <input type="text" id="name" name="name" required 
           aria-describedby="name-help">
    <div id="name-help">請輸入您的真實姓名</div>
    
    <label for="email">電子郵件</label>
    <input type="email" id="email" name="email" 
           aria-describedby="email-help">
    <div id="email-help">我們不會分享您的電子郵件</div>
  </fieldset>
  
  <fieldset>
    <legend>聯絡偏好</legend>
    <input type="radio" id="contact-email" name="contact" value="email">
    <label for="contact-email">電子郵件</label>
    
    <input type="radio" id="contact-phone" name="contact" value="phone">
    <label for="contact-phone">電話</label>
  </fieldset>
  
  <button type="submit">提交表單</button>
</form>

<!-- 實際應用範例：註冊表單 -->
<form aria-label="使用者註冊表單">
  <div class="form-group">
    <label for="username">使用者名稱</label>
    <input type="text" id="username" name="username" 
           aria-describedby="username-help username-error" 
           aria-invalid="false"
           required>
    <div id="username-help" class="form-help">
      3-20 個字元，可包含字母、數字和底線
    </div>
    <div id="username-error" class="form-error" role="alert" hidden>
      使用者名稱已存在，請選擇其他名稱
    </div>
  </div>
  
  <div class="form-group">
    <label for="password">密碼</label>
    <input type="password" id="password" name="password" 
           aria-describedby="password-help password-strength" 
           required>
    <div id="password-help" class="form-help">
      至少 8 個字元，包含大小寫字母和數字
    </div>
    <div id="password-strength" class="password-strength" 
         aria-live="polite">
      密碼強度：<span>請輸入密碼</span>
    </div>
  </div>
  
  <button type="submit">註冊</button>
</form>

<!-- 即時反饋區域 -->
<div id="live-region" aria-live="polite" aria-atomic="true" 
     style="position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;">
  <!-- 動態更新的狀態訊息 -->
</div>
```

### 表格無障礙設計
複雜的表格數據需要適當的標記才能讓螢幕閱讀器正確理解表格結構和資料關係。

**表格無障礙要點：**
- 使用 caption 提供表格說明
- 使用 th 標籤定義表頭
- 使用 scope 屬性指定標頭範圍
- 複雜表格使用 headers 屬性建立關聯

```html
<!-- 簡單表格 -->
<table>
  <caption>2024 年第一季銷售報告</caption>
  <thead>
    <tr>
      <th scope="col">月份</th>
      <th scope="col">銷售額</th>
      <th scope="col">成長率</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">一月</th>
      <td>100,000</td>
      <td>+5%</td>
    </tr>
    <tr>
      <th scope="row">二月</th>
      <td>120,000</td>
      <td>+20%</td>
    </tr>
    <tr>
      <th scope="row">三月</th>
      <td>110,000</td>
      <td>-8%</td>
    </tr>
  </tbody>
</table>

<!-- 複雜表格 -->
<table>
  <caption>員工資訊表</caption>
  <thead>
    <tr>
      <th rowspan="2" scope="col">姓名</th>
      <th colspan="2" scope="colgroup">聯絡方式</th>
      <th rowspan="2" scope="col">部門</th>
    </tr>
    <tr>
      <th scope="col">電話</th>
      <th scope="col">電子郵件</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">張三</th>
      <td>02-1234-5678</td>
      <td>zhang@example.com</td>
      <td>IT 部</td>
    </tr>
    <tr>
      <th scope="row">李四</th>
      <td>02-2345-6789</td>
      <td>li@example.com</td>
      <td>行銷部</td>
    </tr>
  </tbody>
</table>

<!-- 使用 headers 屬性處理複雜關係 -->
<table>
  <caption>季度銷售統計</caption>
  <thead>
    <tr>
      <th id="quarter" scope="col">季度</th>
      <th id="north" scope="col">北區</th>
      <th id="south" scope="col">南區</th>
      <th id="total" scope="col">總計</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="q1" scope="row">第一季</th>
      <td headers="q1 north">500,000</td>
      <td headers="q1 south">600,000</td>
      <td headers="q1 total">1,100,000</td>
    </tr>
    <tr>
      <th id="q2" scope="row">第二季</th>
      <td headers="q2 north">550,000</td>
      <td headers="q2 south">650,000</td>
      <td headers="q2 total">1,200,000</td>
    </tr>
  </tbody>
</table>
```

### 完整無障礙網頁範例
以下是一個綜合運用各種無障礙技術的完整範例：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>無障礙網站完整範例</title>
  <style>
    /* 跳過連結樣式 */
    .skip-link {
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
    }
    .skip-link:focus {
      top: 6px;
    }
    
    /* 隱藏輔助文字 */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
    
    /* 焦點指示器 */
    button:focus, input:focus, a:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }
    
    /* 表單錯誤樣式 */
    .form-error {
      color: #d32f2f;
      font-size: 0.875em;
    }
    
    /* 成功訊息樣式 */
    .success {
      color: #388e3c;
      background: #e8f5e8;
      padding: 10px;
      border: 1px solid #388e3c;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <!-- 跳過連結 -->
  <a href="#main-content" class="skip-link">跳到主要內容</a>
  
  <!-- 頁首 -->
  <header role="banner">
    <h1>無障礙網站範例</h1>
    <nav role="navigation" aria-label="主要導航">
      <ul>
        <li><a href="#home" aria-current="page">首頁</a></li>
        <li><a href="#about">關於我們</a></li>
        <li><a href="#services">服務項目</a></li>
        <li><a href="#contact">聯絡我們</a></li>
      </ul>
    </nav>
  </header>
  
  <!-- 主要內容 -->
  <main id="main-content" role="main">
    <h2>歡迎來到我們的網站</h2>
    
    <!-- 搜尋功能 -->
    <section aria-labelledby="search-heading">
      <h3 id="search-heading">搜尋功能</h3>
      <form role="search">
        <label for="search-input">搜尋關鍵字</label>
        <input type="search" id="search-input" 
               aria-describedby="search-help" 
               placeholder="輸入搜尋關鍵字">
        <div id="search-help">
          搜尋我們的產品和服務
        </div>
        <button type="submit" aria-label="執行搜尋">
          <span aria-hidden="true">🔍</span>
          搜尋
        </button>
      </form>
    </section>
    
    <!-- 聯絡表單 -->
    <section aria-labelledby="contact-heading">
      <h3 id="contact-heading">聯絡我們</h3>
      <form aria-label="聯絡表單">
        <fieldset>
          <legend>個人資訊</legend>
          
          <div class="form-group">
            <label for="name">姓名（必填）</label>
            <input type="text" id="name" name="name" 
                   aria-describedby="name-help" 
                   required>
            <div id="name-help">請輸入您的真實姓名</div>
          </div>
          
          <div class="form-group">
            <label for="email">電子郵件（必填）</label>
            <input type="email" id="email" name="email" 
                   aria-describedby="email-help" 
                   required>
            <div id="email-help">我們會透過此信箱回覆您</div>
          </div>
          
          <div class="form-group">
            <label for="message">訊息內容</label>
            <textarea id="message" name="message" 
                      aria-describedby="message-help" 
                      rows="4"></textarea>
            <div id="message-help">請詳細描述您的需求</div>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>聯絡偏好</legend>
          <input type="radio" id="contact-email" name="contact" value="email">
          <label for="contact-email">電子郵件</label>
          
          <input type="radio" id="contact-phone" name="contact" value="phone">
          <label for="contact-phone">電話</label>
        </fieldset>
        
        <button type="submit">送出表單</button>
      </form>
    </section>
    
    <!-- 成功訊息（動態顯示） -->
    <div id="success-message" class="success" 
         role="alert" aria-live="polite" hidden>
      表單已成功提交！我們將盡快回覆您。
    </div>
    
    <!-- 即時反饋區域 -->
    <div id="live-region" aria-live="polite" aria-atomic="true" 
         class="sr-only">
      <!-- 動態更新的狀態訊息 -->
    </div>
  </main>
  
  <!-- 頁尾 -->
  <footer role="contentinfo">
    <p>&copy; 2024 無障礙網站範例。保留所有權利。</p>
  </footer>
  
  <script>
    // 表單提交處理
    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 顯示成功訊息
      const successMessage = document.getElementById('success-message');
      successMessage.hidden = false;
      successMessage.focus();
      
      // 更新即時反饋區域
      document.getElementById('live-region').textContent = 
        '表單已成功提交！';
      
      // 重置表單
      this.reset();
    });
    
    // 鍵盤導航支援
    document.querySelectorAll('[role="button"]').forEach(button => {
      button.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.click();
        }
      });
    });
  </script>
</body>
</html>
```

**範例重點解析：**

這個完整範例整合了所有重要的無障礙技術，以下詳細說明每個技術的用途和實作方式：

**1. 跳過連結（Skip Links）**
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}
.skip-link:focus {
  top: 6px;
}
```
- **用途**：讓鍵盤使用者可以快速跳過導航，直接到達主要內容
- **實作**：平常隱藏，按 Tab 鍵聚焦時才顯示
- **重要性**：避免使用者每次都要按很多次 Tab 鍵才能到達主要內容

**2. 語意化 HTML 結構**
```html
<header role="banner">
<main id="main-content" role="main">
<footer role="contentinfo">
```
- **用途**：提供清楚的頁面結構，讓螢幕閱讀器理解內容組織
- **實作**：使用 HTML5 語意標籤搭配 ARIA role 屬性
- **重要性**：幫助視覺障礙者快速理解和導航網頁結構

**3. 表單標籤與說明**
```html
<label for="name">姓名（必填）</label>
<input type="text" id="name" name="name" 
       aria-describedby="name-help" required>
<div id="name-help">請輸入您的真實姓名</div>
```
- **用途**：確保每個輸入欄位都有明確的標籤和說明
- **實作**：使用 `<label>`、`aria-describedby` 和說明文字
- **重要性**：讓使用者清楚知道每個欄位的用途和要求

**4. 即時狀態回饋**
```html
<div id="live-region" aria-live="polite" aria-atomic="true" class="sr-only">
```
- **用途**：當頁面內容動態變更時，通知螢幕閱讀器使用者
- **實作**：使用 `aria-live` 屬性設定通知方式
- **重要性**：讓視覺障礙者即時了解頁面狀態變化

**5. 鍵盤導航支援**
```javascript
document.querySelectorAll('[role="button"]').forEach(button => {
  button.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  });
});
```
- **用途**：確保所有互動元素都可以用鍵盤操作
- **實作**：監聽 Enter 和空白鍵事件，觸發相應動作
- **重要性**：讓無法使用滑鼠的使用者也能完整操作網頁

**6. 焦點指示器**
```css
button:focus, input:focus, a:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```
- **用途**：清楚顯示目前聚焦的元素
- **實作**：使用 CSS `outline` 屬性
- **重要性**：讓鍵盤使用者知道目前在哪個元素上

**7. 隱藏輔助文字**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```
- **用途**：隱藏僅供螢幕閱讀器使用的說明文字
- **實作**：使用絕對定位將元素移出可視範圍
- **重要性**：不影響視覺設計，但提供額外的輔助資訊

{% note warning %}
**為什麼需要 WCAG 標準？**
WCAG（Web Content Accessibility Guidelines）是國際網頁無障礙標準，提供明確的技術指引：

**法律要求**：
- 許多國家（美國、歐盟、台灣等）都有無障礙相關法律
- 政府網站、公共服務網站必須符合無障礙標準
- 違反可能面臨法律責任和罰款

**商業價值**：
- 擴大使用者群體：全球約 15% 人口有某種形式的身心障礙
- 提升 SEO 表現：良好的無障礙結構也有助於搜尋引擎索引
- 改善整體使用者體驗：無障礙設計讓所有人都受益

**WCAG 級別實際意義**：
- **A 級**：基本要求，如鍵盤操作、替代文字
- **AA 級**：業界標準，包含顏色對比、響應式設計
- **AAA 級**：最高標準，通常只有特殊需求才使用

**WCAG 2.1 符合級別**

**A 級（最低級別）：**
- 基本的無障礙要求
- 鍵盤存取、替代文字、顏色對比度 3:1

**AA 級（推薦級別）：**
- 大多數網站應該達到的標準
- 顏色對比度 4.5:1、頁面標題、語言屬性

**AAA 級（最高級別）：**
- 最嚴格的標準
- 顏色對比度 7:1、手語翻譯、詳細的錯誤建議

建議一般網站至少達到 AA 級標準，以確保大多數使用者都能順暢使用。
{% endnote%}

{% note info %}
**為什麼需要測試工具？**

**開發階段檢測**：
- **axe DevTools**：安裝後在開發者工具中直接檢測頁面問題
- **Lighthouse**：Chrome 內建，提供完整的無障礙評分報告
- **WAVE**：線上工具，視覺化顯示無障礙問題位置

**實際測試方法**：
```html
<!-- 鍵盤測試清單 -->
<div class="test-checklist">
  <h4>實際測試步驟</h4>
  <ol>
    <li><strong>鍵盤測試</strong>：只用 Tab、Enter、空白鍵操作整個網頁</li>
    <li><strong>螢幕閱讀器測試</strong>：
      <ul>
        <li>Windows：安裝免費的 NVDA</li>
        <li>Mac：開啟內建的 VoiceOver</li>
        <li>手機：開啟 TalkBack（Android）或 VoiceOver（iOS）</li>
      </ul>
    </li>
    <li><strong>縮放測試</strong>：將瀏覽器放大到 200% 檢查是否仍可使用</li>
    <li><strong>顏色測試</strong>：使用高對比模式或色盲模擬器</li>
  </ol>
</div>
```

**檢測常見問題**：
- 圖片缺少 `alt` 屬性
- 表單欄位沒有對應的 `<label>`
- 顏色對比度不足
- 無法用鍵盤操作的互動元素
- 標題結構不正確（跳級使用）

**開發團隊實作建議**：

1. **將無障礙納入開發流程**：
   - 設計階段就考慮無障礙需求
   - Code Review 時檢查無障礙實作
   - 每個 Sprint 都進行無障礙測試

2. **建立檢核清單**：
   - 每個新功能都要通過無障礙檢測
   - 定期使用自動化工具掃描
   - 安排真實使用者測試

3. **團隊教育訓練**：
   - 讓設計師了解無障礙設計原則
   - 讓工程師掌握無障礙實作技巧
   - 讓 QA 學會無障礙測試方法

這個完整範例不只是技術展示，更是一個可以直接應用到實際專案的參考模板。透過理解每個技術的用途和重要性，你可以建立真正對所有使用者友善的網頁應用程式。

**無障礙測試工具推薦**

**自動化測試工具：**
- **axe DevTools**：Chrome/Firefox 擴充功能，可快速檢測無障礙問題
- **Lighthouse**：Chrome 內建，提供無障礙評分和建議
- **WAVE**：線上無障礙檢測工具

**手動測試方法：**
- **鍵盤導航**：使用 Tab 鍵瀏覽整個網頁
- **螢幕閱讀器**：使用 NVDA（Windows）、VoiceOver（Mac）測試
- **高對比模式**：檢查在高對比模式下的可讀性
- **縮放測試**：將頁面放大至 200% 檢查是否仍可正常使用
{% endnote %}
