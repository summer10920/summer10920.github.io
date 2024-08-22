---
title: "[基礎課程] HTML 基礎新手大全"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-05 18:45:42
---

![](https://i.imgur.com/arN20ZR.png)

這是給新手 0 程度的 HTML 的基礎教材，如果你有一定的 HTML 概念與標籤觀念，則可跳過本篇。

<!-- more -->

# HTML 的結構觀念
HTML 是一個文件檔案，使用大量的元素 (element) 代碼所組成內容，每個元素都能代表該內容的資料格式描述表達方式，元素使用了標籤 (tag) 方式編寫並規劃從何開始從哪結束的區段，舉例來說`<body>HTML Code</body>`就代表此為 HTML 的內容區域。HTML 本身就是一堆標籤所組成（可以是獨立一段或者巢狀複合），這些 HTML 內容的代碼標籤則稱呼整個網頁下的 HTML 原始碼。

目前主流規格為 HTML 第五代版本技術 (HTML5)，支援更多定義更完善也貼近主流（效能與多元性）。唯一缺點在於舊瀏覽器上（像是 IE 以下，有些銀行機關都還在用）都不支援，原因在於 HTML 的文件規格需要被瀏覽器所認識，隨著時間推進越來越多的 HTML 語言元素被定義出來，若是這些瀏覽器沒有版本更新或是塞入最新的規格知識，必然不認識新的 HTML 語法。

也就是說，當你開始使用瀏覽器進行輸入某個網站網址，開始以下行為步驟：

1. 取得網址，透過轉換找到目標伺服器位置發送傳送請求，要求取得資料。
2. 伺服器回傳網頁檔案給你，這個網頁為一個 `*.html` 的格式檔案。
3. 瀏覽器獲得開始解析 html 檔案上所有的元素標籤，並試著渲染並轉化為圖層預覽，提供在視窗畫面上。
4. 你看到了漂亮又有結構的網頁畫面，而不是一堆原始碼。

接下來，本教學會以 HTML5 為介紹方向，並使用 VSCode 編輯器與 chrome 瀏覽器為代碼編輯與操作環境，若你不知道 VSCode 是啥，可以參考本站別篇文章。

## 寫出第一個 HTML
請試著輸入以下文字，並透過瀏覽器去讀取

{% note info %}
  **小技巧：關於 emmet**
  在 vscode 內建立 `index.html` 完成後，試著輸入 <kbd>!</kbd> 得到畫面提示時，按下 <kbd>TAB</kbd> 可以快速生成基本的 HTML 結構，這是 VSCODE 內建了 [emmet](https://docs.emmet.io/) 快速編寫指令。
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
說明本 HTML 文件採用 HTML5 編寫
- `<html lang="zh-TW">`
HTML 標籤範圍，其中 lang 是這個元素的屬性宣告，也就是說明這個標籤內容都是台灣中文
- `<head></head>`
網頁開頭宣告區，擺放一些重要的標籤宣告，舉例 title（網站名稱）、meta（網頁描述）
- `<meta ....>`
meta 標籤的總類非常多，詳閱從 [這裡](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) 得知
- `<body></body>`
網站的預覽內容，所有的預覽項目都集中在這裡編寫
- `<p></p>`
宣告一個 P 標籤，使用段落樣式呈現預覽

基本上`<html>`+`<head>`+`<body>`都不可缺少，但現在瀏覽器十分聰明會自己判斷標籤語法試著修正並預覽，不要認為某些精簡寫法是對的，還是需要有良好的 HTML 結構觀念，HTML 的結構越完整無瑕能幫助 SEO 評級更高（完善 meta 也是幫助 SEO 的主要項目）。

{% note info %}
  **小技巧：註解方式**
  HTML 的註解方式為`<!-- text -->`，text 這個文字就會被跳過不被瀏覽器所處理，所以透過註解的方式做任何筆記或說明。
{% endnote%}

## 標籤規則與特性
標籤本身有語意上的重要性，間接影響到結構及搜尋引擎優化（SEO）。這裡初步了解標籤怎麼去標記內容（文字、圖片、影片），以及如何組成網頁結構上一部分。

- 標籤不分大小寫，請用小寫。
- `<>`開始，`</ >`結束。
- 標籤具有屬性與值的特性。
- 少數獨立標籤指沒有結尾標籤（空標籤），像是`<meta>`、`<link>`、`<br>`、`<hr>`、`<img>`

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
  **小技巧：VSCode 插件 假圖產生器**
  使用 plugin 插件 `Fake Image Snippet Collection` 能幫助你快速產生圖片檔。輸入 fakeimg 或 picsum 並指定寬高即可使用。
{% endnote%}

## 絕對與相對路徑
既然談到圖片跟超連結那就需要知道路徑。當你的資源來源是外部位置時，很簡單給他一個 http 位置的絕對路徑。但如果是內部路徑，我們就需要知道相對的路徑在哪裡。

**絕對路徑**
一般在連結外部連結、網路上的資源時使用，當然你也可以當內部連結使用，但效能就是差且不可變動性。
- `http://網域名稱/資料夾名稱/資料夾名稱/檔案名稱`

**相對路徑**
從目前使用的檔案位置為判斷處來找到目標檔案的位置，通常製作網站取得內部檔案或多媒體時使用。
- `images/01.jpg` 目前檔案位置為起點，往下探尋
- `./images/01.jpg` index 位置為起點，往下探尋
- `../` 回上一層
- `/` 從設定的根目錄開始找

## 置換元素
置換元素（Replaced elements）是指元素的內容（content）會被置換成某些文章內容。
- img 為置換元素，意思指它必須要靠屬性指向某些內容才有意義。
- input 也是為置換元素，置換後的內容依據類別可以是文字框、按鈕、複選、單選框。

img、input 這些可置換元素 (Replaced elements) 若宣告`display:block`轉為區塊元素時，`margin:0 auto;`可產生置中效果，這是由於 img、input 都有它們自身的寬度 width 能夠進行 margin 操作。如果其他像是 code 或 sapn 這些行內元素同樣測試效果，因為沒有自身寬度導致預設給予 100%寬度。

HTML 中大部分的元素都是「非置換元素」，這表示瀏覽器會直接以元素本身產生元素的內容，呈現在某個區塊 (box) 中。

# Tag 標籤
標籤命名是讓瀏覽器曉得該提供何種處理預覽方式，舉例標題還是文字，表格還是圖片，換行還是水平線，這些都是標籤所宣告出來的。標籤的類型非常難以全部舉例，這裡只舉例一些常用且基礎的標籤做練習介紹。

{% blockquote MDN https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element %}
如果你有一些想確認或查詢的的標籤，養好習慣上網路搜尋並到官方網站尋找文件說明。
{% endblockquote %}

## 標題與段落
- **h1 ~ h6**：
標題標籤作為標題效果（共 6 段），大小、粗度、行距…等等接依據瀏覽器（各家效果差距不同）預設所提供外觀，如果需要使用者也可另外透過自訂 (CSS) 自訂調整外觀。
- **p**：
段落是一組文字段落，瀏覽器會以段落表達，本身也有行距與大小粗度。
- **a**：
連結可以語義為一個外部網址或是內部網址，也可以是一個網頁上的錨點。屬性 href 是個組合縮寫字，它原文是 Hypertext（超文字） + Reference （參考、查詢、提交、關聯）之意。 

```html tags.html
<!-- 標題 Heading or Header -->
<h1>Hello World!</h1>
<h2>Hello World!</h2>
<h3>Hello World!</h3>
<h4>Hello World!</h4>
<h5>Hello World!</h5>
<h6>Hello World!</h6>

<!-- 段落 paragraph -->
<p>積極常用不停風雲那是股份受傷冠軍陽明山兩人臺灣玄幻彩色天氣，專業誠信。</p>
<p>點擊數對話報導攝影抓住你說等級一條性質斑竹，投票溝通下去怪物周圍接着每天拍攝。</p>

<!-- 跑馬燈，被淘汰但仍受瀏覽器使用 -->
<marquee>警察某個特色知道正在，學術第二天，通信。</marquee>

<!-- 連結 錨 anchor 傳送門-->
<a href="http://www.google.com" target="_blank">Google</a>
<a href="#">跳回頁首</a>

<!-- 錨點，最後講，內容高度須很長-->
<a href="#abc">abc</a>
<p id="abc">xxx</p>

<!--  換行 -->
<br />
<!-- 水平線 horizontal -->
<hr />
```

{% note info %}
  **小技巧：懶字產生器**
  vscode 內建就可以輸入 lorem(+數字）產生隨意的文字方便快速使用，如果你有安裝 Chinese Lorem 則可隨意中文字。
{% endnote%}

## 清單項目
分為 Unordered 符號清單跟 Ordered 序號清單，差別在於是符號還是流水號。而 Ordered List 可額外提供屬性 start 來決定起始值。

```html tags.html
<!-- 無序號的清單 Unordered List -->
<ul>
  <li></li>
</ul>
<!-- 有序號的清單 Ordered List -->
<ol>
  <li></li>
</ol>
```

## 文字效果
能對幾個文字進行效果調整，部分效果你可以找到 2 種表示方式但其意義卻不同，原因在於一個是指定外觀效果另一個為具備意思的外觀效果。

```html tags.html
<!-- bold -->
<b>Bold</b>
<strong>強調內容</strong>
<mark>黃色標記</mark>

<!-- italic -->
<i>我是斜體</i>
<em>我也是斜體</em>

<!-- strike -->
<s>我是刪除線</s>
<del>我也是刪除線</del>

<!-- underline -->
<u>我是底線</u>
<ins>我也是底線</ins>

<small>小字</small>
<big>大字</big>

<sup>上標</sup>
<sub>下標</sub>

<pre><code>程式碼</code></pre>

<q>我是引言，短句用我</q>
<blockquote>我也是引言，長篇文章用我</blockquote>
```

>code 標籤當輸入的程式碼為 HTML 代碼時會無法詮釋於畫面上。這是因為瀏覽器會將 HTML 都渲染出來，因此需要透過符號實體化將敏感的代碼文字用別的意思傳達給瀏覽器。後續請詳閱 [符號（字元）實體化](#符號（字元）實體化)。

## 多媒體
列舉一些多媒體的標籤元素，大多數這些元素會持有不少屬性值來定義參數。

```html tags.html
<!-- 圖片-->
<img src="images/tailogo.JPG" width="300" alt="泰山職訓局" title="泰山職訓局" />
<!--
alt 屬性為替代文字，圖片無法顯示時，出現的文字。
title 屬性為標題，滑鼠移到圖片時顯示。
-->

<!-- Video -->
<video src="zard.mp4" width="850" height="480" controls loop poster="zard.jpg"></video>

<!-- iframe -->
<!-- 連自己的網頁或連結到菜鳥，連結到其他網站會有拒絕連線的問題 -->
<iframe src="http://www.runoob.com" frameborder="0" scrolling="yes"></iframe>

<a href="20181001.html" target="showFrame">點此連結會在 iframe 視窗開啟</a>
<br />
<iframe src="http://www.runoob.com" width="1000px" height="800px" name="showFrame"></iframe>
```
>iframe 屬於一種嵌入網頁之媒體元素，而 frame 為早期網頁分割框架元素（已淘汰），可參考史萊姆第一個家網站為示意。

## 表格
繪製表格用，主要為 table 標記其主要元素，內含 head 或 body 區域，繪製欄位時由上至下為 tr 排，再由左至右為 td 列。同時能夠進行合併：

- rowspan （列合併）（上下）：上面吃掉下面，下面消失。
- colspan （欄合併）（左右）：左邊吃掉右邊，右邊消失。

```html tags.html
<table border="1" align="center" width="600" cellspacing="5" cellpadding="5">
  <tr align="center">
    <td>表格</td>
  </tr>
  <tr align="center">
    <td>表格</td>
  </tr>
  <tr align="center">
    <td>表格</td>
  </tr>
</table>
```

### 小節練習
憑著網路資源或學習結果，請示著刻印以下畫面：

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
每個輸入欄位會有自己的名稱 name，輸入完表單資料後會產生屬於它的值，form 標籤有 POST 或 GET 的方法去傳遞欄位的值，將值傳送到伺服器（依賴另種伺服器程式做承接處理，像是 PHP 當作橋樑與資料庫溝通，去做新增、修改、刪除資料）。

- PHP 接收資料的方式有分`$_POST['id']`跟`$_GET['id']`

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
這裡講一些比較深且重要的學習觀念，幫助你對 HTML 得到一個程度後的完美結束。

## 區塊與行內元素
排版佈局最重要的兩個標籤 div 跟 span。div 是網頁設計的主要元素，是個直覺萬用的容器，只是無法提供頁面任何資訊。

- div  區塊元素 (division 區隔），常搭配屬性 id、class，使用 CSS 佈局排版。
- span 行內元素 ，存在於區塊內單字或片段的標籤，使用 CSS 來修改此標籤內的外觀樣式。

- 區塊元素（block） = 橫行霸道的佔位王，前後斷行，可以設定長、寬、邊界。
- 行內元素（inline）= 循規蹈矩的乖乖排，不能設定長、寬，上、下邊界無效。

## 符號（字元）實體化
有些場合下如果你不希望特殊符號被判讀成 HTML 的標籤符號，你應該使用 character entities：

| 結果   | 說明                 | 實體化符號 | 實體化代號：Unicode 轉 10 進位<br>（另還有 16 進為寫法開頭為&#x..) |
| ------ | -------------------- | ---------- | ------------------------------------------------------------------ |
| "      | quotation mark       | &quot\;    | &#34\;                                                             |
| '      | apostrophe           | &apos\;    | &#39\;                                                             |
| &      | ampersand            | &amp\;     | &#38\;                                                             |
| <      | less-than            | &lt\;      | &#60\;                                                             |
| >      | greater-than         | &gt\;      | &#62\;                                                             |
| &nbsp; | non-breaking space   | &nbsp\;    | &#160\;                                                            |
| &copy; | copyright            | &copy\;    | &#169\;                                                            |
| &reg;  | registered trademark | &reg\;     | &#174\;                                                            |
| '      | spacing acute        | &acute\;   | &#180\;                                                            |
| -      | middle dot           | &middot\;  | &#183\;                                                            |
| ¸      | spacing cedilla      | &cedil\;   | &#184\;                                                            |

一般建議是使用實體化符號比較能肉眼看出這是什麼字，使用代號就比較難以快速得知。

{% note warning %}
  **科普知識：關於 Unicode 與實體化符號**
  舉例玩一下&copy; 這個符號，中文輸入<kbd>\`u00a9</kbd>可以得到，這就是 unicode 的 16 進位代號：A9，接著轉 10 進位代號：169。試著打出`&#xa9;`跟`&#60;`都可以得到該符號。
{% endnote%}

## HTML5 的補充
最新的 HTML 修訂第五代版本，取代 1999 年所制定的 HTML 4.01 和 XHTML 1.0 標準，使網路標準達到符合當代的網路需求。論及 HTML5 時，指的是包括** HTML、CSS、JavaScript **在內的一套技術組合。希望減少網頁對於需要外掛程式的應用服務，例如：Adobe Flash、Microsoft Silverlight 與 Oracle JavaFX 的需求，並且提供更多能有效加強網路應用的標準集。

- HTML: 負責建構整體文件，包含文字、顯示方式、型態、框架等主體，並帶有基本的外觀樣式。
- CSS: 可自訂化外觀樣式，協助將 HTML 的外觀更美觀，CSS3 也提供動畫效果。
- JS: 外掛應用腳本，提供互動性操作以及外掛程式等應用資料處理。

**簡單舉例三者關係：**
畫面上 HTML 提供了標題文字，由 CSS 來調整外觀與顏色，而 JS 則扮演腳本觸發並持續定義 (CSS 定義）的背景色。這也是 HTML5 所強調的除了 HTML5 之外，你還要組合其他的技術。

{% jsfiddle summer10920/20rqaLzg html,css,js,result dark 100% 500 %}

### 語法更簡單
使用 HTML5 能讓宣告語法更輕鬆簡單，也是趨勢與主流。

```html HTML4_version
<!doctype html public "-/w3c/dtd html 4.01 transitional/en" "http://www.w3.org/tr/html4/loose.dtd">
<html lang="zh-TW">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
  <title>HTML4</title>
  <script type="text/javascript" src="my.js"></script>
  <link rel="stylesheet" type="text/css" href="my.css">
</head>
<body>
  <div id="header">
    <h1>Monday Times</h1>
  </div>
  ...
</body>
</html>
```
```html html5_version
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="utf-8" />
  <title>HTML5</title>
  <script src="my.js"></script>
  <link rel="stylesheet" href="my.css">
</head>
<body>
  <header>
    <h1>Monday Times</h1>
  </header>
  ...
</body>
</html>
```

### 語意更有意義
雖然在排版上，設計師大多還是用`<div>`來排版，但 html5 主打的是語意標籤，什麼是語意標籤？簡單說就是直接在標籤賦予它結構及意義，例如：

- &lt;header&gt;    定義網頁頁首的區域。
- &lt;nav&gt;       定義網頁導覽區域。
- &lt;footer&gt;    定義網頁頁尾的區域。
- &lt;main&gt;      定義網頁主要內容區域。
- &lt;section&gt;   定義一個區段範圍。
- &lt;aside&gt;     定義一個側邊區域範圍，次要區域。
- &lt;article&gt;   定義文章內容。
- &lt;figure&gt;    定義圖形影像的區塊。

透過完整賦予語意，能幫助網站的說明程度更完善，也能幫助視障朗讀功能正常發揮。若當現有的 html 標簽不能充分表達語義性的時候，就能夠借助 role 屬性來說明。

**舉例來說：**
`<a role="button">`是因為其`<a>`標籤已不再以本來的隱性`role="link"`來使用，故增加屬性`role="button"`來補正其實際用途（將 a 標籤當按鈕用）。

### 更多元的表單格式
能幫助你更多資料型態的規劃並賦予更完整的控制。

```html form.html
<!-- HTML5 新增表單 search -->
<input type="search" id="search" name="search" value="搜尋文字" />

<!-- email -->
<input type="email" id="email" name="email" value="info@example.com" />

<!-- URL -->
<input type="url" id="url" name="url" value="http://www.example.com" />

<!-- tel -->
<input type="tel" id="tel" name="tel" value="0918-123-456" />

<!-- number -->
<input type="number" id="number" name="number" value="1" />

<!-- date -->
<input type="date" id="date" name="date" value="2019-06-06" />

<!-- time -->
<input type="time" id="time" name="time" value="12:00" />

<!-- range -->
<input type="range" id="range" name="range" value="20" />

<!-- color -->
<input type="color" id="color" name="color" value="#FF0000" />
```

此外，HTML5 新增表單之屬性如下：

| 屬性         | 說明                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| autofocus    | 網頁開啟時，自動將游標停在指定的表單原件上。每個網頁只能設定一個 autofoucs。 |
| autocomplete | 依以前輸入過的內容自動輸入。沒有設定 autocomplete 屬性時，預設值為"on"。     |
| placeholder  | 在欄位灰色顯示簡短提示。                                                     |
| required     | 該欄位設定為必填                                                             |
