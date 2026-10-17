---
title: "HTML 基本教學：文件結構與常用標籤"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:01:00
---

![](assets/images/banner/html5.png)

HTML 用元素描述結構與內容：它不算數、不處理點擊邏輯，也不決定顏色與間距。這篇一次把文件骨架、區塊盒和常用標籤對完。各節附上對照用的片段，再用開發者工具對樹上的標籤名。

<!-- more -->

這門課每一篇都從第 01 天 fork 的練習專案裡的檔案開始。HTML 與 CSS 這個階段，練習站是左側選單加上 iframe 的頁面，點選單就換右邊的主題頁。這樣排只是方便你快速對照標籤，屬於暫時的課堂設計。正式網站不會這樣組頁。

# 為什麼正式網站不這樣做
搜尋引擎優化（SEO，Search Engine Optimization）看的是「一個網址對應一份可索引的內容」。這份示範站點了選單之後網址不變，各主題沒有各自的網址，外站也無法連到某一頁。iframe 裡的主文與標題，搜尋引擎常當成次要內容，或讀不完整。輔助工具也要再進另一份文件，比同一頁的 `header`／`main` 難讀。

響應式網頁設計（RWD，Responsive Web Design）要同一份版面配合手機、平板、桌機。左欄選單加整頁 iframe 時，手機上容易變成外層一個捲軸、框裡再一個捲軸，選單與內容也很難一起重排。之後 CSS 的媒體查詢、Flex／Grid，都作用在**同一份文件**的盒子上，不適合再套一層全頁 iframe。

瀏覽器的上一頁與書籤，也對不到你以為的「子頁」；焦點、縮放、列印也常出問題。正式網站用語意標籤把一頁結構寫在同一份 HTML；若要多頁，每頁各自完整，版型之後再用 CSS 或元件共用。iframe 留給嵌入地圖、影片、付款這類真正的外嵌，不要拿來當整站選單。

{% note warning %}
**課堂用、上線不用**
點左邊換右欄，只為了這堂課對照標籤、快速複習。專題與之後的正式頁，不要複製這套用 iframe 串多頁的做法。
{% endnote %}

# 認識區塊盒
瀏覽器把每個元素畫成一顆**盒子（box）**。先看區塊盒與行內盒怎麼排，再看有名字的語意標籤。沒有這些盒子，後面 CSS 也沒有「區域」可以選。

## 區塊與行內
盒子可以再裝盒子：外層決定這區佔畫面哪一塊，內層才放內容。這一頁的框線只為了讓你看出邊界，不是正式樣式。下面先看行內的 `span`，再看區塊的 `div`。

HTML 元素依預設怎麼排，大致分成兩類：

- **區塊元素（block）**：獨佔一行，前後會換行，預設盡量撐滿父層寬度。
- **行內元素（inline）**：跟前後文字排在同一行，寬度跟著內容走。

| 特性 | 區塊元素 | 行內元素 |
| --- | --- | --- |
| 顯示方式 | 獨佔一行，前後換行 | 跟前後文字排在同一行 |
| 寬度設定 | 可以設定 width | 寬度通常跟著內容，不能像區塊那樣撐滿再設寬 |
| 高度設定 | 可以設定 height | 高度通常跟文字走 |
| 邊界設定 | 可以設定上下左右 | 上下 margin 常不如預期，左右較明顯 |
| 預設寬度 | 撐滿父元素 | 依內容決定 |

常見區塊：`div`、`p`、`h1`～`h6`、`ul`、`ol`、`table`、`form`、`header`、`section`、`article`、`footer`。  
常見行內：`span`、`a`、`strong`、`em`、`label`。

`img`、`input` 是**置換元素**：畫面上看到的不是標籤裡的字，而是 `src`、`type` 決定的內容。它們**不是 block**（不會自己獨佔一行），但也不要當成普通 `span`。`img` 預設是 inline 置換元素，可以設寬高；`input` 在多數瀏覽器是 `inline-block`，排在行內，但有自己的盒子。F12 選元素，看 **Computed → display** 即可。

`div` 與 `span` 本身不說明這區是什麼，只負責包一層：要獨佔一行用 `div`，要跟文字排在同一行用 `span`。頁首、主文、章節請用 `header`、`main`、`section`，不要整頁堆 `div` 假裝結構。

```html 02-html/pages/02-box.html
<!-- pages/02-box.html：inline -->
<h2>inline：span</h2>
<p>
  這句前後還有字，中間的
  <span style="border: 1px solid">span 是 inline box</span>
  ，所以跟文字排在同一行。
</p>
<p>
  連續兩個 span：
  <span style="border: 1px solid">甲</span>
  <span style="border: 1px solid">乙</span>
  會緊挨著，不會各自獨佔一行。
</p>
```

```html 02-html/pages/02-box.html
<!-- pages/02-box.html：block -->
<h2>block：div</h2>
<div style="border: 1px solid">
  <p>
    這整塊是 <code>div</code>（block box），預設獨佔一行、盡量撐滿父層寬。
  </p>
  <div style="border: 1px solid">內層再套一顆 block box。</div>
</div>
<div style="border: 1px solid">另一個 div 一定從新的一行開始。</div>
```

兩個 `span` 會緊挨著；兩個 `div` 一定從新的一行開始；內層 `div` 再套在外層裡面。框線只為了看出邊界。

{% note success %}
**跟著做**
用 <kbd>F12</kbd> 點「甲」那個 `span`，畫面只亮幾個字；點外層 `div`，亮整塊。確認兩個 `span` 同一行、兩個 `div` 上下分開。
{% endnote %}

## 語意標籤
HTML5 的語意標籤（semantic tag）仍是盒子，標籤名直接說明這區是什麼。好處是搜尋引擎較好懂、螢幕閱讀器較好讀、之後也比較好維護。這一頁的 `nav` 裡是普通文字清單，**不是在教連結**；可點的 `a` 在連結那一節。

![左側整頁都是灰色 div 盒子；右側同樣版面改用 header、nav、main、section、aside、footer 上色區分](assets/images/html-boxes-semantic.png)

左右可以排成同一種版面，差在左邊全是沒有角色的 `div`，右邊標籤有名字。

- **header**：頁首。招牌、網站名稱、整頁選單通常放這裡。
- **nav**：導覽這一區。告訴瀏覽器「這裡是選單」，不是拿來學 `href`。
- **main**：本頁主內容。一份文件通常只有一個。
- **section**：有標題的主題區塊。用來分開「整頁骨架」「文章區塊」這類章節。
- **article**：可獨立成篇的內容。抽出去仍看得出是一篇行程介紹。同一頁可以有多篇。
- **aside**：側欄補充，不是主文。例如注意事項、相關連結。
- **footer**：頁尾。版權、聯絡通常放這裡。
- **figure／figcaption**：圖與說明綁在一起（在「多媒體」那一頁）。

`header`／`footer` 也可以出現在 `article` 裡面，表示「這篇文章自己的頁首／頁尾」，跟整份文件的頁首不是同一層。本頁先認得 `body` 底下那一層。

```html 02-html/pages/03-layout.html
<!-- pages/03-layout.html：頁首與導覽（示意清單，沒有 a） -->
<header>
  <p>頁首 header：這一頁的招牌與選單放這裡。</p>
  <nav>
    <p>選單 nav：告訴瀏覽器「這一區是導覽」，不是拿來學連結。</p>
    <ul>
      <li>首頁</li>
      <li>行程</li>
      <li>關於我們</li>
      <li>聯絡</li>
    </ul>
  </nav>
</header>
```

```html 02-html/pages/03-layout.html
<!-- pages/03-layout.html：主文、文章、頁尾（節錄） -->
<main>
  <h1>語意版面</h1>
  <section>
    <h2>整頁骨架</h2>
    <aside>
      <p>aside：側欄補充，不是主文。例如注意事項、相關連結之後再學。</p>
    </aside>
  </section>
  <section>
    <h2>文章區塊</h2>
    <article>
      <h3>京都三日遊</h3>
      <p><code>article</code> 是可獨立成篇的內容：抽出去仍看得出是一篇行程介紹。</p>
    </article>
    <article>
      <h3>大阪美食行程</h3>
      <p>同一頁可以有多篇 <code>article</code>，每篇自己有標題與正文。</p>
    </article>
  </section>
</main>
<footer>
  <p>頁尾 footer · 版權、聯絡資訊通常放這裡 · 教材用</p>
</footer>
```

{% mermaid graph TD %}
bodyNode["body"] --> headerNode["header"]
bodyNode --> mainNode["main"]
bodyNode --> footerNode["footer"]
headerNode --> navNode["nav"]
mainNode --> s1["section"]
mainNode --> s2["section"]
s2 --> a1["article"]
s2 --> a2["article"]
{% endmermaid %}

{% note success %}
**跟著做**
用 <kbd>F12</kbd> 點 `body`：應看到 `header`、`main`、`footer` 並列。展開 `main` 應是 `section`；「文章區塊」裡是兩篇 `article`，不是一串無名 `div`。
{% endnote %}

# 認識常用元素
認完區塊盒之後，依類型看常用元素。**元素（element）**由**標籤（tag）**組成：開始標籤與結束標籤把內文包起來。開始標籤上的**屬性（attribute）**（名="值"）讓元素獲得功能，例如 `a` 的 `href` 才能跳轉、`img` 的 `src` 才有圖。頭尾標籤包覆的 **context** 就是這段**文字流**。

```html
<p class="lead" id="intro">這段是文字流。</p>
```

`class`、`id` 是屬性；`p` 與 `</p>` 之間才是 context。沒有結束標籤的空元素（如 `br`、`img`、`input`）沒有這段文字流，功能幾乎全靠屬性。這一章依元素類型說明瀏覽器會怎麼處理：標題、連結、清單、表格、表單。下面用「說明 → 重點 → 短範例」。

{% blockquote MDN https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element %}
想確認某個標籤時，搜尋後到 MDN 看官方說明。
{% endblockquote %}

## 標題與段落
標題排出層級，段落承載正文。可點的連結在下一節。`h1` 出現在畫面裡；`title` 出現在分頁或書籤，不畫在頁面正文上。

### 標題標籤（h1～h6）
從 `<h1>` 到 `<h6>` 共六層，排出這一頁的標題層級：

- **h1**：這一頁的主標題，每個頁面建議只用一個
- **h2**：章節標題
- **h3**：小節標題
- **h4**：再下一層
- **h5**：更細的標題，較少使用
- **h6**：最細的一層，很少當主結構

```html 02-html/pages/04-headings.html
<!-- pages/04-headings.html -->
<h1>h1：這一頁的主標題</h1>
<p>標題排出層級，段落承載正文。一頁通常一個 h1。</p>
<section>
  <h2>h2：章節標題</h2>
  <p>往下依章節用 h2、h3…，不要跳級只為了字變小。</p>
  <h3>h3：小節標題</h3>
  <h4>h4：再下一層</h4>
  <h5>h5：更細的標題</h5>
  <h6>h6：最細的標題（很少當主結構）</h6>
</section>
```

標題帶有語意，不只改字級，也影響 SEO 與無障礙。瀏覽器會依層級自動調整字級、粗細和行距，之後可用 CSS 改外觀。不要為了讓字變小就從 `h1` 跳到 `h4`。

第一個 `section` 把六層都排出來，方便對畫面；第二個 `section` 才進入段落。

### 段落標籤（p）
正文用 `p`。瀏覽器會在段與段之間留空隙，文字會依容器寬度自動換行。每個 `p` 都是獨立的區塊元素。

```html 02-html/pages/04-headings.html
<!-- pages/04-headings.html -->
<h2>h2：段落</h2>
<p>正文用 p。瀏覽器會在段與段之間自動留空隙。</p>
<p>
  這是第二段。同一段裡要硬換行才用 br：<br />
  換行後仍屬同一段。
</p>
```

把網頁當一份**文件**：一段一個 `p`，視窗變窄時讓文字自己換行。不要用一堆 `br` 去排出看起來整齊的行，那是 Word 那種文字排版。網頁該學的是區塊與語意結構，之後再用 CSS 做版面設計。不要把整頁塞進一個 `p`，也不要用 `br` 假裝分段。

### 換行與分隔
- **br**：同一段裡必須斷行時才用
- **hr**：水平線，用來在視覺上隔開主題，不是段落標籤
- **marquee**：跑馬燈，已過時，不要用

```html 02-html/pages/04-headings.html
<!-- pages/04-headings.html -->
<p>
  這是第二段。同一段裡要硬換行才用 br：<br />
  換行後仍屬同一段。
</p>
<hr />
<p>上面那條是 hr，用來隔開主題，不是段落標籤。</p>
```

第二段中間有 `br`（換行後仍屬同一段），下面那條線是 `hr`。

{% note warning %}
**不要用 marquee**
跑馬燈曾被瀏覽器支援，現代網頁視為過時。要捲動效果之後用 CSS。
{% endnote %}

{% note success %}
**跟著做**
F12 檢查這一頁的 `h1`、兩個 `h2`、以及 `br`／`hr`。確認 `br` 在 `p` 裡面，`hr` 與 `p` 同層。
{% endnote %}

## 連結
可點的文字用 `a`，去哪裡寫在 `href`。沒有 `href` 就不是真正的連結。下面這一段把站內頁、錨點、外站、`mailto` 與 `tel` 放在同一頁。

- **href**：要去的網址、檔案路徑或頁面錨點
- **target**：開在哪裡。`_blank` 開新分頁；若要開進某個 iframe，值要跟那個 iframe 的 `name` 相同
- **連結文字**：要能看出去哪，不要只寫「點這裡」
- **外連新分頁**：加上 `rel="noreferrer"` 較安全

這一頁後半段的京都／大阪文字只是把頁面撐高，讓錨點真的會捲動，不是新觀念。

```html 02-html/pages/05-links.html
<!-- pages/05-links.html（節錄） -->
<h1 id="top">連結 a</h1>
<p><a href="04-headings.html">上一頁：標題與段落</a></p>
<p><a href="02-box.html">盒子練習頁</a></p>
<p><a href="#contact">跳到本頁的聯絡（會停在畫面上方）</a></p>
<p><a href="#top">回到頁首</a></p>
<p>
  <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a" target="_blank" rel="noreferrer">MDN：a 元素</a>
</p>
<p><a href="mailto:hello@example.com">寫信 hello@example.com</a></p>
<p><a href="tel:+886212345678">打電話 02-1234-5678</a></p>
<section id="contact">
  <h2>錨點落點</h2>
  <p>點上面的錨點會來到這裡，這一塊會貼在畫面上方。<code>id="contact"</code> 寫在要停住的元素上。</p>
</section>
```

同層連結如果沒寫 `target`，就在**目前這份文件**裡換頁。`target` 的值若等於某個 iframe 的 `name`，點了只換框裡的文件，網址仍停在包住 iframe 的那一頁。

### 絕對路徑與相對路徑
圖片和連結都要會寫路徑。資源在網路上時，給完整的 `https://…`（絕對路徑）。資源在自己專案裡時，從**目前這個 HTML 所在資料夾**去算（相對路徑）。

**絕對路徑**
- `https://網域/資料夾/檔案名稱`
- 適合外連。拿來指自己站內檔也可以，但網址一改全部要改，課堂以相對路徑為主。

**相對路徑**
- `images/01.jpg`：從目前檔案位置往下找 `images` 裡的檔
- `./images/01.jpg`：同上，`./` 表示目前這一層
- `../`：回上一層，例如 `../index.html`
- `/images/01.jpg`：從網站根目錄開始找。本機直接開檔與透過伺服器開檔，起點可能不同，課堂少用

{% note info %}
**為什麼叫 `index.html`**
網頁伺服器收到「只要這個資料夾、網址沒寫檔名」的請求時，會自動找並回傳 `index.html`。這是常見預設（有的伺服器也可改成別的檔名），所以資料夾入口才習慣叫這個名字：開某個資料夾往往等同開裡面的 `index.html`。
{% endnote %}

同一層的檔案互連只寫檔名。要進子資料夾，就在路徑前面加上資料夾名稱。回到上一層的入口，寫 `../index.html`。

```html
<!-- 往下一層資料夾 -->
<a href="tours/kyoto.html">京都行程</a>

<!-- 同一層只寫檔名 -->
<a href="osaka.html">大阪行程</a>

<!-- 回到上一層的入口 -->
<a href="../index.html">回首頁</a>
```

{% note success %}
**跟著做**
1. 點「上一頁：標題與段落」，應換到標題那一頁。
2. 點「跳到本頁的聯絡」，確認捲到 `#contact`，再點「回到頁首」。
3. 點 MDN 連結，應開新分頁。
{% endnote %}

## 文字效果與實體
這一頁看「字本身」怎麼標。很多標籤不只改樣子，還帶有意義，有助於 SEO 與無障礙。原則：**先考慮語意，再考慮外觀。**

### 語意化強調標籤
這組除了視覺效果，更重要的是傳達意義。

**重要性與強調**
- **strong**：內容重要，通常顯示為粗體
- **em**：語氣強調，通常顯示為斜體
- **mark**：畫重點，通常顯示為黃色背景

```html 02-html/pages/06-text.html
<!-- pages/06-text.html -->
<p><code>strong</code> 是重要，不是單純變粗。例如：<strong>護照請放隨身包，不要托運。</strong></p>
<p><code>em</code> 是語氣強調。例如：這趟是<em>自由行</em>，集合時間請自己抓準。</p>
<p><code>mark</code> 是畫重點。例如：今日行程請認準集合點 <mark>京都車站中央口</mark>。</p>
```

畫面可能跟下面的 `b`／`i` 很像，F12 看的是標籤名。搜尋引擎比較在意語意標籤。

**編輯標記**
- **ins**：插入的內容，通常顯示為底線
- **del**：刪除的內容，通常顯示為刪除線

```html 02-html/pages/06-text.html
<!-- pages/06-text.html -->
<p>京都三日遊原價 <del>2000</del> 元，早鳥現價 <ins>1600</ins> 元。</p>
```

這組在說「文件被改過」，不是只劃一條線。

### 外觀效果標籤
這組主要改樣子。需要「重要／強調」時，不要用它們代替上一節。

- **b**：粗體（純外觀）
- **i**：斜體（純外觀，常拿來標外文或術語樣子）
- **u**：底線（純外觀；很像連結，容易誤導）
- **s**：刪除線外觀（只是劃掉，沒有「這筆被改過」）

```html 02-html/pages/06-text.html
<!-- pages/06-text.html -->
<p><code>b</code> 粗體：飯店叫 <b>洛奇旅舍</b>，只是讓名字醒目。</p>
<p><code>i</code> 斜體：日文店名 <i>一蘭</i>，常拿來標外文或術語外觀。</p>
<p><code>u</code> 底線：<u>請勿與連結搞混</u>，底線看起來很像可點的字。</p>
<p><code>s</code> 刪除線外觀：早鳥名額 <s>已額滿</s>（只是劃掉，沒說「這筆被改過」）。</p>
```

**特殊格式**
- **small**：附註小字，適用於版權、法律聲明
- **big**：大字（HTML5 已棄用）
- **sub**：下標，適用於化學式
- **sup**：上標，適用於數學式或樓層

```html 02-html/pages/06-text.html
<!-- pages/06-text.html -->
<p><code>sub</code> 下標：化學式 H<sub>2</sub>O。</p>
<p><code>sup</code> 上標：公式 E=mc<sup>2</sup>；樓層也可以寫 2<sup>F</sup> 集合。</p>
<p><code>small</code> 附註小字：<small>以上價格未含機場接送。</small></p>
```

### 程式碼顯示
用來顯示程式碼或保留空白換行：

- **code**：行內一小段
- **pre**：預格式化，會保留空格和換行
- **kbd**：鍵盤按鍵
- **samp**：程式或終端機的輸出
- **var**：變數名稱

JavaScript 或純文字可以直接寫在 `code` 裡。若要顯示 **HTML 標籤本身**，必須用字元實體，否則瀏覽器會把 `<h1>` 解析成真的標題。

```html 02-html/pages/06-text.html
<!-- pages/06-text.html -->
<p>按鍵用 <code>kbd</code>：開發者工具按 <kbd>F12</kbd>，儲存常是 <kbd>Ctrl</kbd>+<kbd>S</kbd>。</p>
<p>變數名用 <code>var</code>：人數 <var>n</var>、單價 <var>price</var>。</p>
<p>程式或終端機輸出用 <code>samp</code>：畫面出現 <samp>Hello</samp> 代表成功。</p>
```

```html 02-html/pages/06-text.html
<!-- pages/06-text.html：要顯示標籤本身，小於號必須實體化 -->
<p>行內一小段用 <code>code</code>，例如標籤寫成 <code>&lt;div&gt;</code>。</p>
<pre><code>&lt;p&gt;小於號要寫成實體 &amp;lt; 才會當文字顯示。&lt;/p&gt;</code></pre>
```

`pre > code` 裡的小於號就是正確寫法。在講義裡若要顯示「`&lt;` 這六個字」，連 `&` 都要再寫成 `&amp;lt;`。

### 引用與引言
- **q**：短引言，放在段落裡；瀏覽器通常會自動加引號。可用屬性 `cite` 指出處網址。
- **blockquote**：長引言，通常是縮排區塊。
- **cite**：作品或來源的**名稱**，通常顯示為斜體。

```html 02-html/pages/06-text.html
<!-- pages/06-text.html -->
<p>一句話放在段落裡用 <code>q</code>，瀏覽器通常會自動加引號：<q cite="https://example.com">行李不超過 7 公斤。</q></p>
<blockquote>
  <p>自由活動時請在約定時間回到集合點，不要單獨脫隊。</p>
  <footer>出處 <cite>洛奇旅行行前須知</cite></footer>
</blockquote>
```

### 縮寫、時間、聯絡、摺疊
縮寫、時間、聯絡與摺疊各有一個對應寫法：

- **abbr**：縮寫，`title` 寫全名，滑鼠停上看得到。例如 HTML、JR。
- **time**：日期時間，畫面可以寫「2026 年 8 月 30 日」，機器讀的是 `datetime`。
- **address**：聯絡資訊（旅行社、住址、信箱），不是拿來把任何地址變成斜體。
- **details／summary**：點標題才展開，常見於 FAQ，不必先寫 JavaScript。

```html 02-html/pages/06-text.html
<!-- pages/06-text.html -->
<abbr title="HyperText Markup Language">HTML</abbr>、
<abbr title="日本鐵路">JR</abbr>
出發日 <time datetime="2026-08-30">2026 年 8 月 30 日</time>，
集合 <time datetime="08:30">上午 8:30</time>
<address>
  洛奇旅行<br />
  台北市範例路 1 號<br />
  信箱 hello@example.com
</address>
<details>
  <summary>小費要給嗎？</summary>
  <p>本行程不含強制小費。若想給導遊或司機，採自願。</p>
</details>
```

### 符號（字元）實體化
HTML 用 `<`、`>` 識別標籤，用 `&` 識別實體，因此這些字不能直接當內容，需要寫成實體。名稱寫法（`&lt;`）與數字代號（`&#60;`）都可以。

| 符號 | 說明 | 實體名稱 | 數字代號 | 使用場景 |
| --- | --- | --- | --- | --- |
| `<` | 小於號 | `&lt;` | `&#60;` | 顯示 HTML 標籤 |
| `>` | 大於號 | `&gt;` | `&#62;` | 顯示 HTML 標籤 |
| `&` | 和號 | `&amp;` | `&#38;` | 顯示 & |
| `"` | 雙引號 | `&quot;` | `&#34;` | 屬性值中的引號 |
| `'` | 單引號 | `&apos;` | `&#39;` | 屬性值中的引號 |
| 不間斷空格 | nbsp | `&nbsp;` | `&#160;` | 強迫空格、`7&nbsp;kg` |
| © | 版權 | `&copy;` | `&#169;` | 版權聲明 |
| ® | 註冊商標 | `&reg;` | `&#174;` | 商標 |
| ™ | 商標 | `&trade;` | `&#8482;` | 商標 |

```html 02-html/pages/06-text.html
<!-- pages/06-text.html：畫面上要出現這些字，原始碼寫實體 -->
<p>小於：<code>&amp;lt;</code> → &lt;</p>
<p>大於：<code>&amp;gt;</code> → &gt;</p>
<p>和號：<code>&amp;amp;</code> → &amp;</p>
<p>空白：<code>&amp;nbsp;</code> 可避免斷行，例如 7&nbsp;kg。</p>
<p>版權：<code>&amp;copy;</code> → &copy; 2026 洛奇旅行</p>
```

完整表見 [MDN：Character reference](https://developer.mozilla.org/en-US/docs/Glossary/Character_reference)、[WHATWG 具名對照](https://html.spec.whatwg.org/multipage/named-characters.html)。

{% note warning %}
**語意化 vs 外觀效果**
- 需要「重要／強調」時，優先用 `strong`、`em`
- `b`、`i` 只在純視覺時使用
- 外觀之後用 CSS 控制，HTML 負責語意
- 要在畫面顯示 HTML 標籤本身，必須寫實體，否則會被解析成真標籤
{% endnote %}

{% note success %}
**跟著做**
F12 分別點 `strong`、`b`、`del`、`s`、`abbr`、`blockquote`、`details`。畫面可能相似，樹上的名字不同。展開 `pre > code`，確認小於號是實體。
{% endnote %}

## 清單
相關項目請用語意清單，不要用一堆 `p` 加符號假裝。沒有先後用 `ul`，有步驟用 `ol`，術語對定義用 `dl`。

### 無序清單（ul）
沒有先後順序的項目用 `ul`。瀏覽器會自動為每個項目加上符號（通常是圓點），之後可用 CSS 改。

適用於導覽選單、功能列表。項目必須包在 `li` 裡。選單用 `ul` 是在說「這一區是一串項目」，跟「要不要做成連結」是兩件事。

```html 02-html/pages/07-lists.html
<!-- pages/07-lists.html -->
<h2>無序 ul</h2>
<ul>
  <li>導覽、功能點</li>
  <li>
    可巢狀
    <ul>
      <li>內層仍包在 li 裡</li>
    </ul>
  </li>
</ul>
```

選單也常是 `ul`，項目裡才包 `a`。版面那一頁的 `nav` 則是沒有連結的 `li`。

### 有序清單（ol）
有先後順序的項目用 `ol`，瀏覽器會自動加上序號。適用於步驟、排行榜。預設是阿拉伯數字。

```html 02-html/pages/07-lists.html
<!-- pages/07-lists.html -->
<ol>
  <li>貼上這份檔</li>
  <li>F12 對樹</li>
  <li>對照講義標籤名</li>
</ol>
```

教材沒寫 `start`、`type`。仍要認得：`start` 可從指定數字開始編，`type` 可以是 `1`（預設）、`A`、`a`、`I`、`i`。想看效果時，在這份 `ol` 上自己加屬性即可。

### 巢狀清單
清單裡面可以再放清單，形成多層分類。可以是無序裡再放有序，也可以相反。內層必須包在某個 `li` 裡面，不能跟 `li` 當兄弟。瀏覽器會自動縮排、換符號。

```html 02-html/pages/07-lists.html
<!-- pages/07-lists.html：內層 ul 仍包在外層 li 裡 -->
<li>
  可巢狀
  <ul>
    <li>內層仍包在 li 裡</li>
  </ul>
</li>
```

### 描述清單（dl）
術語對定義用 `dl`，適用於詞彙解釋、FAQ。`dt` 是名稱，`dd` 是說明。一個 `dt` 可以對多個 `dd`；`dd` 裡面也可以再放清單。

```html 02-html/pages/07-lists.html
<!-- pages/07-lists.html -->
<dl>
  <dt>alt</dt>
  <dd>圖沒出來或給輔助工具的文字</dd>
  <dt>name</dt>
  <dd>表單送出時的欄位名</dd>
</dl>
```

{% note info %}
**清單怎麼選**
- 無序清單：並列的項目
- 有序清單：有步驟、有先後
- 描述清單：術語和定義的對應
- 可以巢狀，但不要無謂套很多層
{% endnote %}

{% note success %}
**跟著做**
F12 點「可巢狀」那個 `li`：裡面還有一個 `ul`。再看 `dl`：`dt` 與 `dd` 成對，沒有 `li`。
{% endnote %}

## 多媒體
圖片、影片、音訊和嵌入網頁幾乎都是置換元素：畫面上看到的不是標籤包住的文字。沒有網路時，圖或影片可能載不進來，<kbd>F12</kbd> 仍看得到 `src`。

### 圖片元素（img）
最常用的多媒體標籤：

- **src**：圖片來源，必要屬性
- **alt**：替代文字，用於無障礙與 SEO；圖沒出來時也會看到它
- **title**：滑鼠停著時的提示（可選）
- **width／height**：尺寸，可先佔位置、減少版面跳動

```html 02-html/pages/08-media.html
<!-- pages/08-media.html -->
<figure>
  <img src="https://placehold.co/600x320" width="600" height="320" alt="色塊占位：行程封面示意" />
  <figcaption>figure + figcaption：圖與說明綁在一起</figcaption>
</figure>
<p>
  <img src="https://picsum.photos/320/180" width="320" height="180" alt="照片占位" />
</p>
```

裝飾性圖片才考慮空的 `alt=""`，內容圖不要省略。本頁佔位圖是外連絕對路徑；專題封面改放 repo 內檔時，改回相對路徑。

### 影音元素
HTML5 提供原生播放，不必再靠 Flash。

**影片 video**
- `src` 或子元素 `source`（可提供多種格式）
- `controls`：顯示播放控制列
- `autoplay`、`loop`、`muted`、`poster`（封面圖）、`preload`

**音訊 audio**
屬性與影片類似。標籤之間的文字是後備：瀏覽器不支援時才看得到。

```html 02-html/pages/08-media.html
<!-- pages/08-media.html -->
<video controls width="320">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
  瀏覽器若不支援 video，你會看到這句。
</video>

<audio controls>
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
</audio>
```

{% note warning %}
**瀏覽器自動播放限制**
現代瀏覽器為了不要突然出聲、節省流量，通常**禁止有聲音的自動播放**。必須使用者點過，或使用 `autoplay muted`（靜音才能自動播）。音訊更不該自動播。本頁只用 `controls`，讓你自己按。
{% endnote %}

### 嵌入元素（iframe）
在這一頁裡嵌入另一份文件：

- **src**：要嵌入的文件
- **width／height**：嵌入區域尺寸
- **name**：為 iframe 命名，可當作超連結的 `target`
- **title**：說明這框是什麼
- **sandbox／loading**：安全限制與延遲載入（進階）

```html 02-html/index.html
<iframe
  name="content"
  src="pages/02-box.html"
  title="示範內容"
  style="width: 100%; height: 100vh; border: 0"
></iframe>
<a href="pages/09-table.html" target="content">表格</a>
```

```html 02-html/pages/08-media.html
<iframe title="範例嵌入" src="https://example.com" width="320" height="160"></iframe>
```

早期整頁切割用 `frameset`／`frame`，已經淘汰。現在只用 iframe。

{% note danger %}
**為什麼很多網站嵌不進去**
對方可能設定 `X-Frame-Options`（`DENY` 完全禁止、`SAMEORIGIN` 只許同網域）或 CSP，用來防止點擊劫持、保護隱私。Google、銀行首頁嵌不進去是正常的。YouTube 要用官方提供的 `/embed/` 網址。失敗時改成一般連結讓人開新分頁。
{% endnote %}

`map`／`area`（圖片熱點）、`object`／`embed`（舊式物件、Flash）這一課不練。

{% note success %}
**跟著做**
F12 檢查兩張 `img` 的 `src`／`alt`，再檢查 `video` 裡的 `source`、以及這一頁的 iframe。沒有外網時對屬性即可，不必等到播出來。
{% endnote %}

## 表格
資料表用列（row）和欄（column）排出結構化資訊。這一頁的 `table` 是資料，不要拿它去切左右欄當版面。`border="1"` 只為了讓格線看得見。

### 表格的基本結構
- **table**：表格容器
- **tr**（table row）：列，從上到下
- **td**（table data）：資料儲存格，從左到右
- **th**（table header）：標題儲存格，用來當欄名或列名

```html 02-html/pages/09-table.html
<!-- pages/09-table.html：最簡的一列資料（大阪表 tbody） -->
<table border="1" style="caption-side: top">
  <caption>表名在上：大阪一日遊</caption>
  <thead>
    <tr>
      <th scope="col">時段</th>
      <th scope="col">景點</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>上午</td>
      <td>大阪城</td>
    </tr>
    <tr>
      <td>下午</td>
      <td>道頓堀</td>
    </tr>
  </tbody>
</table>
```

沒有 `thead` 也能先畫出格子；語意完整時再補分區。

### 表格屬性與樣式
外觀之後用 CSS 控制。舊屬性仍常見於別人的碼：`border`、`cellpadding`、`cellspacing`、`width`、`align`。其中 `align`、`bgcolor`、`cellpadding`、`cellspacing` 在 HTML5 已過時，編輯器可能畫紅線——那是因為 HTML 管語意、外觀交給 CSS。瀏覽器為了相容可能還接受，看到紅字知道「這是舊屬性」即可。

### 儲存格合併
- **colspan**：橫向合併。`colspan="2"` 表示這一格佔兩欄
- **rowspan**：直向合併。`rowspan="2"` 表示這一格佔兩列

被合併掉的位置**不要再寫**多餘的 `th`／`td`，列數才對得起來。能不加就不要加。

```html 02-html/pages/09-table.html
<!-- pages/09-table.html：橫向合併 -->
<tr>
  <th scope="row">花蓮山海</th>
  <td colspan="2">三日套裝（天數與售價合併成一格）</td>
</tr>

<!-- pages/09-table.html：直向合併 -->
<tr>
  <th scope="row" rowspan="2">第一天</th>
  <td>上午</td>
  <td>京都車站中央口</td>
</tr>
<tr>
  <td>下午</td>
  <td>清水寺山門</td>
</tr>
```

同一頁「團體報名表」把兩種合併一起用：`團名`、`導遊` 用 `rowspan="2"` 佔滿兩列表頭；`人數` 用 `colspan="2"` 橫跨兩欄，第二列再補「成人」「兒童」。

```html 02-html/pages/09-table.html
<!-- pages/09-table.html 表頭兩列 -->
<tr>
  <th scope="col" rowspan="2">團名</th>
  <th scope="col" colspan="2">人數</th>
  <th scope="col" rowspan="2">導遊</th>
</tr>
<tr>
  <th scope="col">成人</th>
  <th scope="col">兒童</th>
</tr>
```

### 語意化表格結構
- **caption**：表名，必須是 `table` 的第一個子元素。畫面預設在表格上方；要在下方用 CSS `caption-side: bottom`，不是把標籤搬到表尾。
- **thead**：欄名
- **tbody**：資料
- **tfoot**：合計或備註。原始碼寫在 `tbody` 後面，畫面在表底，不要把它當成表名

```html 02-html/pages/09-table.html
<!-- pages/09-table.html 價目表（含兒童列） -->
<table border="1">
  <caption>京都三日遊價目</caption>
  <thead>
    <tr>
      <th scope="col">行程</th>
      <th scope="col">人數</th>
      <th scope="col">單價</th>
      <th scope="col">小計</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">成人</th>
      <td>2</td>
      <td>1600</td>
      <td>3200</td>
    </tr>
    <tr>
      <th scope="row">兒童</th>
      <td>1</td>
      <td>800</td>
      <td>800</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">合計</th>
      <td>3</td>
      <td></td>
      <td>4000</td>
    </tr>
  </tfoot>
</table>
```

### 輔助工具
- **caption**：用一句話說明這張表在講什麼
- **scope**：寫在 `th` 上，告訴輔助工具這格標題涵蓋哪些資料格。畫面幾乎沒差
  - `scope="col"`：這是**欄**名（例如「人數」「單價」）
  - `scope="row"`：這是**列**名（例如「成人」「兒童」）
- **headers**：更複雜的表可以把資料格連回表頭的 `id`；這一課先把 `col`／`row` 分清楚即可

{% note info %}
**表格使用原則**
- `th` 當標題，`td` 當資料
- 語意完整時補上 `thead`、`tbody`、`tfoot`
- 加上 `caption`、`scope`
- 外觀交給 CSS
- 合併後列數要對得起來，不要為了好看把表拼歪
- 不要用表格排整頁版面；資料用這一頁的表
{% endnote %}

{% note success %}
**跟著做**
F12 點第一張表的 `caption`、`thead`、`tbody`、`tfoot`。再點「花蓮山海」看 `colspan`、點「第一天」看 `rowspan`。最後一張數 `thead` 兩列有幾個 `th`，核對合併說明。
{% endnote %}

## 表單
表單用來收集文字、選項、檔案，再送到某個位置處理。常見於報名、搜尋、問卷。這一頁的 `#booking-form` 先把「label 對得起來、radio 同名、三種 button」弄清楚，其餘 `type` 用短範例當速查。

本頁 `action="#"`、`method="get"`：送出後仍停在這一頁，位址列出現 `name=王小明` 這類 query 是瀏覽器預設，不是錯誤。

### 表單容器（form）
`form` 是容器，定義提交方式和目標：

- **action**：送到哪。本頁 `#` 表示不換頁；真實專案會寫後端網址
- **method**：`get`（GET）把資料接在網址後面，適合搜尋、查詢，資料量較小、也不該放密碼；`post`（POST）放在請求本體，適合敏感或大量資料
- **enctype**：有檔案要上傳時用 `post` 加上 `multipart/form-data`
- **target**：結果要顯示在哪（也可以指向某個 iframe 的 `name`）

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<form id="booking-form" action="#" method="get">
```

有 `type="file"` 的欄在同一份 form 裡（`name="file"`）。真的要上傳到伺服器時才改 `method="post"` 並加上 `enctype="multipart/form-data"`；本頁送出不會真的存檔。

### 表單標籤與關聯（label）
輸入框之前，先把 `label` 對好：點文字會聚焦到欄位，螢幕閱讀器也才知道這欄叫什麼。有兩種關聯方式：

```html 02-html/pages/10-form.html
<!-- pages/10-form.html：for + id -->
<label for="guest-name">姓名</label>
<input id="guest-name" name="name" type="text" required placeholder="王小明" maxlength="20" />

<!-- 包在 label 裡 -->
<label><input type="radio" name="traffic" value="bus" checked /> 巴士</label>
```

點文字會聚焦到欄位；驗證失敗時瀏覽器也才知道這欄叫什麼。`placeholder` 只是空欄提示，**不能代替** `label`。

### 表單控制項通用屬性與驗證
- **name**：欄位名稱，送出時伺服器（或網址列）用它識別資料。沒有 `name` 的欄通常不會被送出
- **id**：這份文件裡唯一，給 `for` 對、給之後的 CSS／JS
- **value**：預設值，或 radio／checkbox／option 被選時要送出的值
- **placeholder**：空白時的提示
- **disabled**：不能改，**也不會送出**
- **readonly**：不能改，**仍會送出**

HTML5 內建驗證（送出前瀏覽器會擋）：

- **required**：必填（本頁姓名）
- **maxlength／minlength**：字數（本頁姓名最多 20）
- **min／max／step**：數值或日期範圍
- **pattern**：正規表示式（本頁未用；電話格式常用）
- **title**：驗證失敗時可當補充說明

`type="email"`、`type="url"` 本身也會檢查格式。

### 基本輸入元素（input）
`input` 依 `type` 顯示成不同控制項，這就是置換元素。

**文字類**

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<input id="guest-name" name="name" type="text" required placeholder="王小明" maxlength="20" />
<input id="guest-email" name="email" type="email" autocomplete="email" />
<input id="guest-pw" name="demoPassword" type="password" />
<input id="guest-url" name="website" type="url" placeholder="https://" />
<input id="guest-tel" name="tel" type="tel" />
<input id="guest-search" name="q" type="search" />
```

**數值與日期**

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<input id="guest-people" name="people" type="number" min="1" max="10" value="1" />
<input id="guest-range" name="score" type="range" min="1" max="5" value="3" />
<input id="guest-date" name="date" type="date" />
<input id="guest-time" name="time" type="time" />
<input id="guest-dt" name="datetime" type="datetime-local" />
<input id="guest-month" name="month" type="month" />
<input id="guest-week" name="week" type="week" />
```

`month`、`week` 各瀏覽器支援程度不一，對得到標籤即可。

**其他**

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<input id="guest-color" name="color" value="#2563eb" type="color" />
<input id="guest-file" name="file" type="file" accept=".png,.jpg,.pdf" />
<input type="hidden" name="source" value="class" />
```

`accept` 只是檔案挑選器的提示，不是安全檢查。要一次多檔再加 `multiple`。`hidden` 畫面沒有，送出會帶。

### 選擇元素
**單選 radio**：從多個裡選一個。同一組必須同一個 `name`，靠 `value` 區分；`checked` 設預設。

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<label><input type="radio" name="traffic" value="bus" checked /> 巴士</label>
<label><input type="radio" name="traffic" value="train" /> 火車</label>
```

**複選 checkbox**：可多選。本頁加購共用 `name="extra"`，送出時可能出現多筆同名參數。有些後端慣例寫 `name="like[]"`，那不是 HTML 規定。

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<label><input type="checkbox" name="extra" value="insurance" /> 保險</label>
<label><input type="checkbox" name="extra" value="meal" /> 餐食</label>
```

**下拉 select**：省空間，適合選項多。`option` 的 `value` 才是送出值，畫面文字可以不同。`optgroup` 的 `label` 是分組名。`selected` 預設項；`multiple`、`size` 可一次顯示多列（本頁未用）。

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<select id="tour-select" name="tourId">
  <optgroup label="本島">
    <option value="1">台北城市漫遊</option>
    <option value="2">花蓮山海三日</option>
  </optgroup>
  <optgroup label="離島">
    <option value="3">澎湖跳島</option>
  </optgroup>
</select>
```

**建議清單 datalist**：仍是可打字的文字欄，只是有建議。`input` 的 `list` 對到 `datalist` 的 `id`。

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<label for="city-input">城市（datalist）</label>
<input id="city-input" name="city" type="text" list="city-list" />
<datalist id="city-list">
  <option value="台北"></option>
  <option value="花蓮"></option>
  <option value="澎湖"></option>
</datalist>
```

### 文字區域（textarea）
多行輸入。`rows`、`cols` 控制顯示列數與寬度；也可設 `maxlength`。預設文字寫在開始與結束標籤**之間**，不像 `input` 用 `value`。

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<label for="guest-note">備註</label>
<textarea id="guest-note" name="note" rows="3" cols="30" placeholder="飲食禁忌、接送地"></textarea>
```

### 按鈕元素
按鈕作用於**它所在的那一份** `form`。寫在 form 外面不會送出。`form` 裡的 `button` 如果沒寫 `type`，預設就是 `submit`，所以一定要寫 `type`。

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<button type="submit">送出</button>
<button type="reset">重設</button>
<button type="button">不送出（之後才接 JS）</button>
```

也可用 `input type="submit"`、`reset`、`button`。同一份表單可以有多個 submit，用不同 `name`／`value` 區分「儲存」或「發布」。文字欄按 Enter 通常也會觸發 submit（表單裡要有提交鈕）。`input type="image"` 是圖片提交鈕，本頁未用。

### 表單組織（fieldset、legend）
把相關欄位圈成一組，`legend` 是這一組的標題。輔助工具會把 legend 跟欄位一起讀。本頁「報名資料」包住大部分欄位。

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<fieldset>
  <legend>報名資料</legend>
```

### progress 與 meter
`progress` 表示進度。`meter` 表示計量，可設 `low`、`high`、`optimum`。它們不是輸入欄，送出表單時通常不會當欄位送走。

```html 02-html/pages/10-form.html
<!-- pages/10-form.html -->
<progress max="100" value="40">40%</progress>
<meter min="0" max="100" low="30" high="70" optimum="80" value="60">60</meter>
```

{% note success %}
**跟著做**
1. F12 確認 `label[for="guest-name"]` 對到 `#guest-name`，且有 `name="name"`。
2. 兩個交通 radio 的 `name` 都是 `traffic`。
3. 填姓名後按送出：網址應出現 `name=`。按「不送出」不應送出。
{% endnote %}

# 選讀：無障礙（a11y）
**無障礙（accessibility）**縮寫成 **a11y**（a 與 y 中間 11 個字母）。目標是：不同身體條件、不同裝置、不同情境下，這頁仍然用得起來。不只是「身障專用」——只靠鍵盤、螢幕閱讀器、弱視、暫時受傷、或滑鼠壞掉，都算。

這章**選讀**。下面用不佳與較好的短例對照差在哪。正式規範之後再查 [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)（Web Content Accessibility Guidelines）。課堂上先把標籤用對，比先背 ARIA 有用。

輔助工具讀的是**文件樹與語意**，不是你眼睛看到的排版。全是 `div` 的頁面，閱讀器只能唸成一串無名盒子；`header`／`main`／`h1`／`label` 才給得出「這是頁首、這是主文、這欄叫姓名」。

{% note info %}
**自己聽一次（可選）**
Chrome <kbd>F12</kbd> → **Elements** 右側（或 <kbd>Esc</kbd> 打開 Drawer）找 **Accessibility**。點一個元素，看 Name、Role、有沒有被當成按鈕。macOS 也可開旁白（VoiceOver）聽頁面，今天不必當成作業。
{% endnote %}

## 語言與標題大綱
`html` 的 `lang` 決定閱讀器的發音與翻譯。寫 `zh-Hant` 才會用繁中語音；漏寫或寫成 `en`，中文會被唸成怪腔。標題層級是這份文件的目錄：一頁一個 `h1`，下面依章節用 `h2`、`h3`，不要為了字變小就從 `h1` 跳到 `h4`。

{% tabs a11y標題,1 %}
<!-- tab 不佳 -->

```html
<html>
  <body>
    <div class="big">洛奇旅行</div>
    <div class="bigger">報名京都三日遊</div>
    <p>跳級標題與沒有 lang，閱讀器沒有可靠大綱。</p>
    <h4>注意事項</h4>
  </body>
</html>
```
<!-- endtab -->
<!-- tab 較好 -->
```html 02-html/pages/11-a11y.html
<html lang="zh-Hant">
  <body>
    <header>
      <p>洛奇旅行</p>
    </header>
    <main>
      <h1>報名京都三日遊</h1>
      <h2>注意事項</h2>
      <p>閱讀器可用標題清單跳轉，也知道這份文件是繁中。</p>
    </main>
  </body>
</html>
```
<!-- endtab -->
{% endtabs %}

## 圖片的替代文字
內容圖必須有 `alt`：圖沒載入、或使用者看不到圖時，這句話就是圖的意義。寫「圖片」「photo1.jpg」等於沒寫。商標、純裝飾線條才用 `alt=""`，告訴閱讀器「略過這張」。

{% tabs a11y圖片,1 %}
<!-- tab 不佳 -->

```html
<img src="kyoto.jpg" />
<img src="icon-star.png" alt="圖片" />
```
<!-- endtab -->
<!-- tab 較好 -->
```html 02-html/pages/11-a11y.html
<img src="kyoto.jpg" width="600" height="320" alt="清水寺本堂與參道人潮" />
<img src="icon-star.png" alt="" />
```
<!-- endtab -->
{% endtabs %}

## 表單：欄位要有名字
沒有 `label` 的輸入框，閱讀器可能只唸「編輯文字」。點「姓名」三個字也應聚焦到欄位——這是 `for` 對 `id`，或把控制項包在 `label` 裡。`placeholder` 是空欄提示，填了就消失，**不能代替**標籤。

{% tabs a11y表單,1 %}
<!-- tab 不佳 -->

```html
<p>姓名</p>
<input type="text" name="name" placeholder="請輸入姓名" />
```
<!-- endtab -->
<!-- tab 較好 -->
```html 02-html/pages/11-a11y.html
<label for="guest-name">姓名</label>
<input id="guest-name" name="name" type="text" placeholder="王小明" />

<label>
  <input type="radio" name="traffic" value="bus" />
  巴士
</label>
```
<!-- endtab -->
{% endtabs %}

報名表的姓名欄用 `for` 對上 `id`。點「姓名」，焦點應進同一顆 `input`。

## 連結去別處，按鈕在本頁做事
`a` 要有 `href`，文字要能看出目的地，不要只寫「點這裡」。在本頁送出、開關、計算，用 `button`。用 `div` 加點擊外觀，鍵盤的 <kbd>Tab</kbd> 預設走不進去，閱讀器也不會當成控制項。

{% tabs a11y按鈕,1 %}
<!-- tab 不佳 -->

```html
<div onclick="submit()">送出</div>
<a>行程詳情</a>
<a href="/tours">點這裡</a>
```
<!-- endtab -->
<!-- tab 較好 -->
```html 02-html/pages/11-a11y.html
<button type="submit">送出報名</button>
<a href="05-links.html">行程詳情</a>
```
<!-- endtab -->
{% endtabs %}

`onclick` 今天不必寫；重點是：**可操作的東西要用本來就可聚焦的元素**。`button` 沒寫 `type`、又放在 `form` 裡，預設會送出，所以表單裡的按鈕要把 `type` 寫明。

## 資料表要有表頭
輔助工具讀表格時，會把 `th` 跟資料格綁在一起。只有 `td`、沒有 `caption`／`scope`，就只是一堆格子。拿 `table` 切左右欄做版面，不是資料表——正式站不要這樣用，對閱讀器也不友善。

```html 02-html/pages/11-a11y.html
<table>
  <caption>京都三日遊價目</caption>
  <thead>
    <tr>
      <th scope="col">行程</th>
      <th scope="col">單價</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">成人</th>
      <td>1600</td>
    </tr>
  </tbody>
</table>
```

## 鍵盤走得過整頁
許多人不用滑鼠。連結與按鈕可用 <kbd>Tab</kbd> 移動、<kbd>Enter</kbd>（按鈕也常用 <kbd>Space</kbd>）啟動。若你把焦點外框用 CSS 拿掉，鍵盤使用者會在頁上「消失」。對比不夠（淺灰字配白底）弱視也讀不到——這是 CSS，明天之後再調，但不要一開始就做成看不見的字。

```html
<!-- 對比差：看起來「很淡很時尚」，其實讀不到 -->
<p style="color: #ccc; background: #fff">早鳥截止提醒</p>

<!-- 對比夠：字與底要分得開 -->
<p style="color: #111; background: #fff">早鳥截止提醒</p>
```

## ARIA 是補充元素說明，不是必要動作
**ARIA**（Accessible Rich Internet Applications）是一組屬性，用來幫「HTML 本身說不清楚」的複雜元件補語意，例如 `role="dialog"`。亂加 `aria-label`、或跟看得見的文字打架，閱讀器會更亂。能用原生 `button`、`nav`、`label` 就不要先上 ARIA。

把主文放進另一份 iframe 文件，輔助工具較難讀——這也是它不能當正式架構的原因之一。Chrome Lighthouse 有 Accessibility 分數，知道有這項檢查即可。

{% note success %}
**選讀時可對**
1. <kbd>F12</kbd> → Accessibility：點 `h1`、姓名 `label`、一張 `img`，看 Name／Role。
2. 只按 <kbd>Tab</kbd> 走一遍表單：焦點應進得了欄位與三顆按鈕。
3. 把某張圖的 `alt` 暫時刪掉，看 Accessibility 面板的名字變成什麼。改完再改回來。
{% endnote %}

{% note info %}
**選讀就好**
專題能把語意、`lang`、`alt`、`label`、真正的 `a`／`button` 寫對，就已經走在無障礙的路上。對比、焦點樣式、ARIA 之後對 WCAG 再補。
{% endnote %}

# 本篇重點回顧
這一頁用過的觀念收在下面，複習時對標籤即可。

- HTML 用元素描述結構：標籤包住文字流，屬性（例如 `href`、`src`）才給出功能。
- 區塊元素獨佔一行，行內元素跟文字排在同一行；`div` 與 `span` 只負責包一層。
- 頁首、導覽、主文、章節、文章、側欄、頁尾用 `header`、`nav`、`main`、`section`、`article`、`aside`、`footer`。
- 標題用 `h1`～`h6` 排出層級，正文用 `p`；同一段硬換行才用 `br`，隔開主題才用 `hr`。
- 連結靠 `a` 的 `href`：相對路徑、錨點、`mailto`／`tel` 都算；外連新分頁加上 `rel="noreferrer"`。
- 先選有語意的文字標籤（`strong`、`em`）；要在畫面顯示 `<`、`>`、`&` 必須寫成字元實體。
- 清單用 `ul`／`ol`／`dl`，資料用 `table`（含 `caption` 與 `th` 的 `scope`），收集輸入用 `form` 與對得上的 `label`。
- 課堂用 iframe 串多頁只為了對照；正式網站一頁一份文件，搜尋與手機版面才站得住。
