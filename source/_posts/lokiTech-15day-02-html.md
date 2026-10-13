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

這篇一次給十份可跑的 HTML。主題拆成多份，方便對題、之後也好找。外層用 iframe 把多頁串在一起，點左邊就換右欄。先複製到 `student/practice/html/`（含子資料夾），用 Live Server 開 `index.html`。

<!-- more -->

# 搭配免費 AI 學習
細節不要背表。用 [Google NotebookLM](https://notebooklm.google.com/)（免費，Google 帳號）把這篇和 MDN 收成可以引用來源的筆記；標籤怎麼寫、畫面為什麼不對，交給免費聊天室或編輯器裡的 Copilot。講義與 <kbd>F12</kbd> 仍是最後依據。

每一大章各建一個筆記本（取得素材、認識區塊盒、認識常用元素、選讀）。來源放這篇網址 `http://summer10920.github.io/2026/08-30/lokiTech-15day-02-html/`，再加入該章對到的 MDN 頁（從 [HTML 元素](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element) 點進去即可）。問的時候要它**引用來源**；答得出來的句子，用「儲存成筆記」收進你的 **AI 筆記**。下面「用 AI 練習」是給這個筆記本的短問題。

NotebookLM **不負責寫程式、也不負責除錯**。要它改檔、補標籤、看路徑為什麼空白，改開 ChatGPT、Gemini、Claude 或 Grok 的免費額度：貼一小段、寫明繁體中文、不要整份重寫。VS Code 若已登入 GitHub，可用 **GitHub Copilot Free** 的行內補完；灰字先讀再按 <kbd>Tab</kbd>。補完只負責接著打。

模型會**幻覺（hallucination）**：標籤、屬性、過時寫法都可能說得很像真的。和講義或 MDN 衝突時，以 MDN 與你在 Chrome 看到的為準。

{% note warning %}
**先對再信**
聊天室貼回的整段 HTML、Copilot 的灰字，都先存檔用 Live Server 打開，再用 F12 對標籤名。對不上就不要整段覆蓋練習檔。
{% endnote %}

{% note primary %}
**整理成你的 AI 筆記**
四個筆記本都建好、來源都加完之後，各存一則筆記：「這章我只問講義與 MDN 裡有的句子；改檔改去聊天室或 Copilot。」
{% endnote %}

# 取得素材
把下面分頁依檔名存進 `student/practice/html/`。外層 `index.html` 放在 `html/`，其餘九份放在 `html/pages/`。在 VS Code 開啟 `student/practice/`，再用 Live Server 開 `html/index.html`。標籤名稱以 [MDN：HTML 元素](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element) 為準，你用 F12 對照的就是這十份檔。

每一份子頁都是完整文件（有 `DOCTYPE`、`html`、`head`、`body`）。不要改檔名和資料夾名稱，左邊選單的路徑才對得起來。

{% note info %}
**為什麼叫 `index.html`**
網頁伺服器收到「只要這個資料夾、網址沒寫檔名」的請求時，會自動找並回傳 `index.html`。所以資料夾入口才習慣叫這個名字。`pages/` 裡的檔不是入口，才用 `1_box.html` 這種明確檔名。
{% endnote %}

## 檔案一覽
後面每一節會寫要點左邊哪一項。`index.html` 只負責左邊選單；觀念在 `pages/` 各檔。檔名對不上時，右邊會空白。

| 存檔位置 | 左邊選單 | 這一頁在講什麼 |
| --- | --- | --- |
| `index.html` | （外層，網址不變） | 左 `nav`、右 `main`＋iframe（`name="demo"`） |
| `pages/1_box.html` | 盒子 | block／inline、`div`、`span` |
| `pages/2_layout.html` | 版面 | `header` `nav` `main` `section` `article` `aside` `footer` |
| `pages/3_headings.html` | 標題與段落 | `h1`～`h6`、`p` `br` `hr` |
| `pages/4_links.html` | 連結 | `a`、`href`、路徑、錨點、`mailto`／`tel` |
| `pages/5_text.html` | 文字 | 語意／外觀、引用、實體、`details` |
| `pages/6_lists.html` | 清單 | `ul` `ol` `dl` |
| `pages/7_media.html` | 多媒體 | `img` `figure` `video` `audio` `iframe` |
| `pages/8_table.html` | 表格 | 資料表、`scope`、`caption`、合併儲存格 |
| `pages/9_form.html` | 表單 | `#booking-form` 與常用控制項 |

先存 `index.html`，再建立 `pages/` 存其餘九份。選單寫的是 `pages/1_box.html` 這種路徑。

{% tabs html素材,1 %}
<!-- tab index.html -->
```html index.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML 基本元素</title>
  </head>
  <body style="margin: 0">
    <table style="width: 100%; height: 100vh; border-collapse: collapse">
      <tr>
        <td style="width: 12rem; vertical-align: top; border-right: 1px solid #ccc; padding: 1rem">
          <header id="site-header">
            <p>洛奇旅行 · 練習頁</p>
            <nav>
              <ul>
                <li><a href="pages/1_box.html" target="demo">盒子</a></li>
                <li><a href="pages/2_layout.html" target="demo">版面</a></li>
                <li><a href="pages/3_headings.html" target="demo">標題與段落</a></li>
                <li><a href="pages/4_links.html" target="demo">連結</a></li>
                <li><a href="pages/5_text.html" target="demo">文字</a></li>
                <li><a href="pages/6_lists.html" target="demo">清單</a></li>
                <li><a href="pages/7_media.html" target="demo">多媒體</a></li>
                <li><a href="pages/8_table.html" target="demo">表格</a></li>
                <li><a href="pages/9_form.html" target="demo">表單</a></li>
              </ul>
            </nav>
          </header>
        </td>
        <td style="padding: 0">
          <main>
            <iframe name="demo" src="pages/1_box.html" title="示範內容" style="width: 100%; height: 100vh; border: 0"></iframe>
          </main>
        </td>
      </tr>
    </table>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/1_box.html -->
```html pages/1_box.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>盒子：block 與 inline、div 與 span</title>
  </head>
  <body>
    <h1>block box 與 inline box</h1>
    <p>每個元素都會變成一顆盒子。框線只是為了讓你看出邊界。</p>
    <section>
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
    </section>
    <section>
      <h2>block：div</h2>
      <div style="border: 1px solid">
        <p>這整塊是 <code>div</code>（block box），預設獨佔一行、盡量撐滿父層寬。</p>
        <div style="border: 1px solid">內層再套一顆 block box。</div>
      </div>
      <div style="border: 1px solid">另一個 div 一定從新的一行開始。</div>
    </section>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/2_layout.html -->
```html pages/2_layout.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>版面：語意標籤</title>
  </head>
  <body>
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
    <main>
      <h1>語意版面</h1>
      <p>主內容放在 <code>main</code>。下面用 <code>section</code> 切主題。</p>
      <section>
        <h2>整頁骨架</h2>
        <p><code>header</code> 在上、<code>nav</code> 在頁首裡、<code>main</code> 是主文、<code>footer</code> 在下。</p>
        <aside>
          <p>aside：側欄補充，不是主文。</p>
        </aside>
      </section>
      <section>
        <h2>文章區塊</h2>
        <article>
          <h3>京都三日遊</h3>
          <p><code>article</code> 抽出去仍看得出是一篇行程介紹。</p>
        </article>
        <article>
          <h3>大阪美食行程</h3>
          <p>同一頁可以有多篇 <code>article</code>，每篇自己有標題與正文。</p>
        </article>
      </section>
    </main>
    <footer>
      <p>頁尾 footer · 版權、聯絡資訊通常放這裡</p>
    </footer>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/3_headings.html -->
```html pages/3_headings.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>標題與段落</title>
  </head>
  <body>
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
    <section>
      <h2>h2：段落</h2>
      <p>正文用 p。瀏覽器會在段與段之間自動留空隙。</p>
      <p>
        這是第二段。同一段裡要硬換行才用 br：<br />
        換行後仍屬同一段。
      </p>
      <hr />
      <p>上面那條是 hr，用來隔開主題，不是段落標籤。</p>
    </section>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/4_links.html -->
```html pages/4_links.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>連結</title>
  </head>
  <body>
    <h1 id="top">連結 a</h1>
    <p>可點的文字用 <code>a</code>。去哪裡寫在 <code>href</code>。沒有 href 就不是真正的連結。</p>
    <section>
      <h2>同一站：相對路徑</h2>
      <p><a href="3_headings.html">上一頁：標題與段落</a></p>
      <p><a href="1_box.html">盒子練習頁</a></p>
    </section>
    <section>
      <h2>同一頁：錨點</h2>
      <p><a href="#contact">跳到本頁的聯絡</a></p>
      <p><a href="#top">回到頁首</a></p>
    </section>
    <section>
      <h2>外站：完整網址</h2>
      <p>
        <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a" target="_blank" rel="noreferrer">MDN：a 元素</a>
      </p>
    </section>
    <section>
      <h2>不是網頁：mailto 與 tel</h2>
      <p><a href="mailto:hello@example.com">寫信 hello@example.com</a></p>
      <p><a href="tel:+886212345678">打電話 02-1234-5678</a></p>
    </section>
    <section id="contact">
      <h2>錨點落點</h2>
      <p><code>id="contact"</code> 寫在要停住的元素上。後面還有內容，這一塊才會貼到畫面上方。</p>
      <p><a href="#top">回到頁首</a></p>
    </section>
    <section>
      <h2>撐高內容</h2>
      <p>早上從京都車站出發，先到清水寺。坡道人多，記得提早出門。</p>
      <p>中午在二年坂附近用餐，午後轉往祇園。這段只為了讓頁面夠長，錨點才捲得動。</p>
      <p>護照、交通卡、充電器。自由活動時約好集合地點。</p>
      <p><a href="#top">回到頁首</a></p>
    </section>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/5_text.html -->
```html pages/5_text.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文字效果與實體</title>
  </head>
  <body>
    <h1>文字效果與實體</h1>
    <p>能表達意思的標籤優先，不要只為了粗體、斜體而亂套。</p>
    <section>
      <h2>語意：strong、em、mark、del、ins</h2>
      <p><strong>護照請放隨身包，不要托運。</strong></p>
      <p>這趟是<em>自由行</em>，集合時間請自己抓準。</p>
      <p>今日行程請認準集合點 <mark>京都車站中央口</mark>。</p>
      <p>原價 <del>2000</del> 元，早鳥現價 <ins>1600</ins> 元。</p>
    </section>
    <section>
      <h2>外觀：b、i、u、s</h2>
      <p>飯店叫 <b>洛奇旅舍</b>，店名 <i>一蘭</i>，<u>請勿與連結搞混</u>，名額 <s>已額滿</s>。</p>
    </section>
    <section>
      <h2>引用：q、blockquote、cite</h2>
      <p>短句：<q cite="https://example.com">行李不超過 7 公斤。</q></p>
      <blockquote>
        <p>自由活動時請在約定時間回到集合點。</p>
        <footer>出處 <cite>洛奇旅行行前須知</cite></footer>
      </blockquote>
    </section>
    <section>
      <h2>程式碼：code、pre、kbd</h2>
      <p>開發者工具按 <kbd>F12</kbd>。標籤要顯示成文字：<code>&lt;div&gt;</code></p>
      <pre><code>&lt;p&gt;小於號要寫成實體 &amp;lt;&lt;/p&gt;</code></pre>
    </section>
    <section>
      <h2>縮寫、時間、聯絡、摺疊</h2>
      <p><abbr title="HyperText Markup Language">HTML</abbr>、<time datetime="2026-08-30">2026 年 8 月 30 日</time></p>
      <address>
        洛奇旅行<br />
        hello@example.com
      </address>
      <details>
        <summary>小費要給嗎？</summary>
        <p>本行程不含強制小費。</p>
      </details>
    </section>
    <section>
      <h2>字元實體</h2>
      <p>&lt; &gt; &amp; 7&nbsp;kg &copy;</p>
    </section>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/6_lists.html -->
```html pages/6_lists.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>清單</title>
  </head>
  <body>
    <h1>清單</h1>
    <section>
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
    </section>
    <section>
      <h2>有序 ol</h2>
      <ol>
        <li>貼上這份檔</li>
        <li>F12 對樹</li>
        <li>對照講義標籤名</li>
      </ol>
    </section>
    <section>
      <h2>描述清單 dl</h2>
      <dl>
        <dt>alt</dt>
        <dd>圖沒出來或給輔助工具的文字</dd>
        <dt>name</dt>
        <dd>表單送出時的欄位名</dd>
      </dl>
    </section>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/7_media.html -->
```html pages/7_media.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>多媒體</title>
  </head>
  <body>
    <h1>多媒體</h1>
    <section>
      <h2>圖片</h2>
      <figure>
        <img src="https://placehold.co/600x320" width="600" height="320" alt="色塊占位：行程封面示意" />
        <figcaption>figure + figcaption：圖與說明綁在一起</figcaption>
      </figure>
    </section>
    <section>
      <h2>影音與嵌入</h2>
      <video controls width="320">
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
        瀏覽器若不支援 video，你會看到這句。
      </video>
      <audio controls>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
      </audio>
      <iframe title="範例嵌入" src="https://example.com" width="320" height="160"></iframe>
    </section>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/8_table.html -->
```html pages/8_table.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>表格</title>
  </head>
  <body>
    <h1>表格</h1>
    <p><code>border="1"</code> 只是讓格線看得見。<code>th</code> 的 <code>scope</code> 說明這顆表頭管整欄或整列。</p>
    <table border="1">
      <caption>京都三日遊價目</caption>
      <thead>
        <tr>
          <th scope="col" rowspan="2">行程</th>
          <th scope="col" colspan="2">人數</th>
          <th scope="col" rowspan="2">小計</th>
        </tr>
        <tr>
          <th scope="col">成人</th>
          <th scope="col">兒童</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">京都</th>
          <td>2</td>
          <td>1</td>
          <td>4000</td>
        </tr>
        <tr>
          <th scope="row">花蓮</th>
          <td colspan="2">三日套裝（人數兩欄併成一格）</td>
          <td>3600</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">合計</th>
          <td colspan="3">7600</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/9_form.html -->
```html pages/9_form.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>表單</title>
  </head>
  <body>
    <h1>表單</h1>
    <form id="booking-form" action="#" method="get">
      <fieldset>
        <legend>報名資料</legend>
        <p>
          <label for="guest-name">姓名</label>
          <input id="guest-name" name="name" type="text" required placeholder="王小明" maxlength="20" />
        </p>
        <p>
          <label for="guest-email">Email</label>
          <input id="guest-email" name="email" type="email" autocomplete="email" />
        </p>
        <p>
          <label for="guest-people">人數</label>
          <input id="guest-people" name="people" type="number" min="1" max="10" value="1" />
        </p>
        <p>
          <label for="tour-select">行程</label>
          <select id="tour-select" name="tourId">
            <optgroup label="本島">
              <option value="1">台北城市漫遊</option>
              <option value="2">花蓮山海三日</option>
            </optgroup>
            <optgroup label="離島">
              <option value="3">澎湖跳島</option>
            </optgroup>
          </select>
        </p>
        <p>
          <label for="city-input">城市</label>
          <input id="city-input" name="city" type="text" list="city-list" />
          <datalist id="city-list">
            <option value="台北"></option>
            <option value="花蓮"></option>
            <option value="澎湖"></option>
          </datalist>
        </p>
        <p>
          交通
          <label><input type="radio" name="traffic" value="bus" checked /> 巴士</label>
          <label><input type="radio" name="traffic" value="train" /> 火車</label>
        </p>
        <p>
          加購
          <label><input type="checkbox" name="extra" value="insurance" /> 保險</label>
          <label><input type="checkbox" name="extra" value="meal" /> 餐食</label>
        </p>
        <p>
          <label for="guest-note">備註</label>
          <textarea id="guest-note" name="note" rows="3" cols="30" placeholder="飲食禁忌"></textarea>
        </p>
        <p>
          <progress max="100" value="40">40%</progress>
          <meter min="0" max="100" low="30" high="70" optimum="80" value="60">60</meter>
        </p>
        <input type="hidden" name="source" value="class" />
        <p>
          <button type="submit">送出</button>
          <button type="reset">重設</button>
          <button type="button">不送出</button>
        </p>
      </fieldset>
    </form>
  </body>
</html>
```
<!-- endtab -->
{% endtabs %}

{% note success %}
**跟著做**
建立 `student/practice/html/pages/`，依分頁檔名各存一份。Live Server 開 `html/index.html`，點左邊每一項，確認右邊會換頁，網址列仍停在 `index.html`。
{% endnote %}

## 為什麼拆成多份 HTML
若把所有標籤塞進同一頁，上課難停在某一題，複習也不好對照。所以主題拆開，再用 iframe 串成可切換的假性網站。這是課堂導覽。早期整頁切割用過 `frameset`／`frame`，已經淘汰；現在課堂只用 iframe。說明見 [MDN：iframe](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/iframe)。

`index.html` 的子頁連結寫 `target="demo"`，右邊 iframe 的 `name="demo"`，兩邊字串相同，點選單就只換右欄。`index.html` 在 `html/`，所以 `href` 寫 `pages/1_box.html`；子頁都在 `pages/`，彼此互連只寫檔名。

`index.html` 的 `title` 是瀏覽器分頁名稱。點選單後網址仍是 `index.html`，分頁標題通常不變。要看右欄的樹，按 <kbd>F12</kbd>，在 **Elements** 展開 iframe 再點裡面的文件。

{% note info %}
**小技巧：Emmet**
空檔 <kbd>!</kbd> 再 <kbd>Tab</kbd> 可展開骨架。本篇以複製完整檔為主。
{% endnote %}

## 為什麼正式網站不這樣做
搜尋引擎優化（SEO，Search Engine Optimization）看的是一個網址對應一份可索引的內容。這份示範站永遠是同一個 `index.html`，盒子、表單沒有各自的網址。iframe 裡的主文常被當成次要內容。輔助工具也要再進另一份文件。

響應式網頁設計（RWD，Responsive Web Design）要同一份版面配合手機與桌機。這裡用 `table` 切左右，iframe 又固定高度，手機上容易變成外層一個捲軸、框裡再一個捲軸。瀏覽器的上一頁與書籤也對不到子頁。正式網站把一頁結構寫在同一份 HTML；iframe 留給嵌入地圖、影片、付款，不要拿來當整站選單。

{% note warning %}
**課堂用、上線不用**
點左邊換右欄，只為了對照標籤。專題與正式頁不要複製這套用 iframe 串多頁的做法。
{% endnote %}

##### 用 AI 練習
在「取得素材」筆記本問下面兩題。答案應引用這篇或 [MDN：a](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a) 的 `target`、[MDN：iframe](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/iframe) 的 `name`。改檔名、看右欄為什麼空白，改去聊天室，不要請 NotebookLM 重寫十份檔。

- `target="demo"` 和 iframe 的 `name` 為什麼要相同？點選單後網址為什麼仍是 `index.html`？
- 用 iframe 串多頁為什麼不適合正式網站？請分開說 SEO 與 RWD。

{% note primary %}
**整理成你的 AI 筆記**
請這個筆記本出三題（選單路徑、`target`／`name`、正式站為何不用 iframe）、列出五個關鍵字、畫一張「外層／子頁」心智圖。把回答存成筆記。
{% endnote %}

# 認識區塊盒
瀏覽器把每個元素畫成一顆**盒子（box）**。先看區塊盒與行內盒怎麼排，再看有名字的語意標籤。盒子怎麼佔位置，見 [MDN：CSS 盒模型簡介](https://developer.mozilla.org/zh-TW/docs/Web/CSS/Guides/Box_model/Introduction)；元素預設屬於哪一類，見 [MDN：內容分類](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Guides/Content_categories)。點左邊「盒子」與「版面」。

## 區塊與行內
點左邊「盒子」（`pages/1_box.html`）。外層決定這區佔畫面哪一塊，內層才放內容。框線只為了看出邊界。預設排版大致兩類，完整對照請在筆記本問，再打開 [MDN：div](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/div) 與 [MDN：span](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/span)。

- **區塊元素（block）**：獨佔一行，預設盡量撐滿父層寬度。常見的有 `div`、`p`、標題、清單、`header`、`section`。
- **行內元素（inline）**：跟前後文字排在同一行，寬度跟著內容走。常見的有 `span`、`a`、`strong`、`em`。

寬高、上下 margin 能不能設，其他值請問 AI 並以 MDN 查證。F12 選元素，看 **Computed → display** 即可。

`img`、`input` 是**置換元素**：畫面上看到的不是標籤裡的字，而是 `src`、`type` 決定的內容。它們不是 block，也不要當成普通 `span`。`div` 與 `span` 本身不說明這區是什麼：要獨佔一行用 `div`，要跟文字排在同一行用 `span`。頁首、主文請用下一節的語意標籤。

{% note success %}
**跟著做**
在右欄 F12 點「甲」那個 `span`，畫面只亮幾個字；點外層 `div`，亮整塊。確認兩個 `span` 同一行、兩個 `div` 上下分開。
{% endnote %}

##### 用 AI 練習
在「認識區塊盒」筆記本問。不要請它改成 Flex 或 Grid。

- `span` 和 `div` 的預設 `display` 各是什麼？為什麼兩個 `span` 會在同一行？
- `img` 為什麼叫置換元素？我該在 DevTools 哪個欄位確認 `display`？

## 語意標籤
點左邊「版面」（`pages/2_layout.html`）。語意標籤（semantic tag）讓標籤名直接說明這區是什麼，搜尋引擎較好懂、螢幕閱讀器較好讀。這一頁的 `nav` 是普通文字清單，**不是在教連結**。各標籤的正式說明從 [MDN：HTML 元素](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element) 點 `header`、`main`、`article`。

![左側整頁都是灰色 div 盒子；右側同樣版面改用 header、nav、main、section、aside、footer 上色區分](assets/images/html-boxes-semantic.png)

左右可以排成同一種版面。差在左邊全是沒有角色的 `div`，右邊標籤有名字。

- **header**：頁首。招牌、整頁選單通常放這裡。
- **nav**：導覽這一區。它說明「這裡是選單」，不是拿來學 `href`。
- **main**：本頁主內容。一份文件通常只有一個。
- **section**：有標題的主題區塊。
- **article**：可獨立成篇的內容。同一頁可以有多篇。
- **aside**：側欄補充，不是主文。
- **footer**：頁尾。版權、聯絡通常放這裡。

`header`／`footer` 也可以出現在 `article` 裡面，表示這篇文章自己的頁首／頁尾。本頁先認得 `body` 底下那一層。`figure`／`figcaption` 在多媒體那一頁。

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
F12 點 iframe 裡的 `body`：應看到 `header`、`main`、`footer` 並列。展開 `main` 應是 `section`；「文章區塊」裡是兩篇 `article`。
{% endnote %}

{% note warning %}
**AI 給錯的例子**
模型常回 `<div class="header">`，或叫你用 `<br>` 把兩個 `div` 排在同一行。`class` 只是名字，瀏覽器不會因此把它當成頁首；兩個 `div` 換行是 block 的預設。對照 `2_layout.html`：頁首是 `header`，選單是 `nav`。F12 看的是標籤名。
{% endnote %}

##### 用 AI 練習
把問題限制在 `2_layout.html` 的骨架。可點的 `a` 在連結那一頁，不要請筆記本補一堆連結。

- `section` 和 `article` 差在哪？用「京都三日遊」那段說明。
- 一份 HTML 可以有幾個 `main`？`aside` 能不能取代 `main`？

{% note primary %}
**整理成你的 AI 筆記**
請這個筆記本出三題（block／inline、`div` 與語意標籤、`section`／`article`）、列出五個關鍵字、畫一張 `body` 底下骨架的心智圖。把回答存成筆記。
{% endnote %}

# 認識常用元素
認完區塊盒之後，依類型點左邊選單。**元素（element）**由**標籤（tag）**組成：開始標籤與結束標籤把內文包起來。開始標籤上的**屬性（attribute）**（名="值"）讓元素有具體功能，例如 `a` 的 `href`、`img` 的 `src`。頭尾包覆的 **context** 就是這段**文字流**。想確認某個標籤，到 [MDN：HTML 元素](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element) 搜尋。

```html
<p class="lead" id="intro">這段是文字流。</p>
```

`class`、`id` 是屬性；`p` 與 `</p>` 之間才是 context。`br`、`img`、`input` 這類空元素沒有這段文字流，功能幾乎全靠屬性。完整檔在上面分頁，下面只講觀念，不再貼整份原始碼。

## 標題與段落
點左邊「標題與段落」（`pages/3_headings.html`）。標題排出層級，段落承載正文。`h1` 出現在畫面裡；`title` 出現在分頁或書籤（要進 iframe 文件，才看得到這一頁自己的 `title`）。層級說明見 [MDN：標題元素](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/Heading_Elements)。

### 標題標籤（h1～h6）
從 `h1` 到 `h6` 共六層，排出這一頁的大綱。`h1` 是這一頁的主標題，通常只用一個；往下是章節、小節。標題帶有語意，不只改字級，也影響 SEO 與無障礙。不要為了讓字變小就從 `h1` 跳到 `h4`。瀏覽器會依層級調整字級，外觀之後用 CSS 改。

`3_headings.html` 的第一個 `section` 把六層都排出來，方便對畫面。

### 段落標籤（p）
正文用 `p`。瀏覽器會在段與段之間留空隙，文字會依容器寬度自動換行。每個 `p` 都是獨立的區塊元素。見 [MDN：p](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/p)。

把網頁當一份文件：一段一個 `p`，視窗變窄時讓文字自己換行。不要用一堆 `br` 假裝分段，也不要把整頁塞進一個 `p`。

### 換行與分隔
同一段裡必須斷行才用 `br`；換行後仍屬同一段。`hr` 是水平線，用來隔開主題，不是段落標籤。`3_headings.html` 裡 `br` 在 `p` 裡面，`hr` 與 `p` 同層。`marquee`（跑馬燈）已過時，不要用；其他分隔寫法請問 AI 並以 MDN 查證。

{% note success %}
**跟著做**
F12 檢查這一頁的 `h1`、兩個 `h2`，以及 `br`／`hr`。確認 `br` 在 `p` 裡面，`hr` 與 `p` 同層。
{% endnote %}

##### 用 AI 練習
請筆記本判斷層級與換行。若回答出現 `marquee`，視為過時，不要採用。

- 已有一個 `h1` 時，下一層為什麼用 `h2`，而不是為了字變小改成 `h4`？
- `p` 裡面的 `br` 和段落外的 `hr`，哪個仍算同一段？

## 連結
點左邊「連結」（`pages/4_links.html`）。可點的文字用 `a`，去哪裡寫在 `href`。沒有 `href` 就不是真正的連結。屬性以 [MDN：a](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a) 為準。連結文字要能看出去哪，不要只寫「點這裡」。

`target="_blank"` 開新分頁，並加上 `rel="noreferrer"`。`index.html` 左邊選單的 `target="demo"` 則是開在右欄 iframe。內容頁裡沒寫 `target` 的連結，預設就在目前這個 iframe。後半段文字只是把頁面撐高，讓錨點真的會捲動。`mailto:`、`tel:` 仍是連結，只是協定不同。其他 `target` 值請問 AI 並以 MDN 查證。

### 絕對路徑與相對路徑
圖片和連結都要會寫路徑。資源在網路上時，給完整的 `https://…`（絕對路徑）。資源在自己專案裡時，從**目前這個 HTML 所在資料夾**去算（相對路徑）。

- `3_headings.html`：同一層，子頁互連這樣寫。
- `pages/1_box.html`：從 `index.html` 往下一層。
- `../index.html`：從 `pages/` 回上一層。教材沒放這條連結，若要自己寫就是這個。
- `/images/01.jpg`：從網站根目錄找。本機雙擊與 Live Server 可能不同，課堂少用。

{% note success %}
**跟著做**
點「上一頁：標題與段落」，右欄應換成標題頁。再點「跳到本頁的聯絡」，確認捲到 `#contact`。點 MDN 連結應開新分頁。
{% endnote %}

##### 用 AI 練習
在「認識常用元素」筆記本問。路徑寫錯要改檔時，改去聊天室，並寫明檔案在 `pages/`。

- `href="3_headings.html"` 和 `href="#contact"` 點下去各會怎樣？`id` 要寫在哪個元素上？
- 外連為什麼同時寫 `target="_blank"` 和 `rel="noreferrer"`？
- 檔案在 `pages/4_links.html`，連回上一層的 `index.html`，相對路徑該怎麼寫？

## 文字效果與實體
點左邊「文字」（`pages/5_text.html`）。這一頁看「字本身」怎麼標。原則是先考慮語意，再考慮外觀。畫面可能很像，F12 看的是標籤名。入口見 [MDN：HTML 元素](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element)。

### 語意化強調標籤
`strong` 是重要，`em` 是語氣強調，`mark` 是畫重點。`del` 與 `ins` 表示文件被刪掉或補上，不是只劃一條線。示範都在 `5_text.html` 第一個 section。搜尋引擎比較在意這組，而不是單純的粗體。見 [MDN：strong](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/strong)。

### 外觀效果標籤
`b`、`i`、`u`、`s` 主要改樣子。需要「重要／強調」或「這筆被改過」時，不要用它們代替上一節。底線很容易被看成連結。`big` 在 HTML5 已棄用。`sub`、`sup`、`small` 等其他值請問 AI 並以 MDN 查證。

### 程式碼顯示
行內一小段用 `code`。要保留換行與空白，外面再套 `pre`。鍵盤按鍵用 `kbd`。若要在畫面上看到 `<div>` 這幾個字元，原始碼必須寫成 `&lt;div&gt;`，否則瀏覽器會真的開一顆盒子。`var`、`samp` 請問 AI 並以 MDN 查證。

### 引用與引言
一句話放在段落裡用 `q`，瀏覽器通常會自動加引號。整段摘錄用 `blockquote`。作品或來源的**名稱**用 `cite`。`q` 的 `cite` 屬性是出處網址，和 `cite` 元素不是同一件事。

### 縮寫、時間、聯絡、摺疊
`abbr` 標縮寫，`title` 寫全名，滑鼠停上看得到。`time` 給人看的文字可以是「2026 年 8 月 30 日」，機器讀的是 `datetime`。`address` 是聯絡資訊，不是拿來把任何地址變成斜體。`details`／`summary` 點標題才展開，常見於 FAQ，不必先寫 JavaScript。

### 符號（字元）實體化
HTML 用 `<`、`>` 識別標籤，用 `&` 識別實體，所以這些字要顯示在畫面上就寫成實體。先記住 `&lt;`、`&gt;`、`&amp;`、`&nbsp;`。名稱寫法與數字代號都可以。完整表見 [MDN：Character reference](https://developer.mozilla.org/en-US/docs/Glossary/Character_reference)。其他符號請問 AI 並以 MDN 查證。

{% note warning %}
**語意化 vs 外觀效果**
需要「重要／強調」時用 `strong`、`em`。`b`、`i` 只在純視覺時使用。要在畫面顯示 HTML 標籤本身，必須寫實體。
{% endnote %}

{% note success %}
**跟著做**
F12 分別點 `strong`、`b`、`del`、`s`。畫面可能相似，樹上的名字不同。展開 `pre > code`，確認小於號是實體。
{% endnote %}

{% note warning %}
**AI 給錯的例子**
要在畫面上看到 `<div>` 時，若原始碼真的寫 `<div>`，瀏覽器會開一顆盒子，應寫 `&lt;div&gt;`。另一個常錯是「重要就用 `b`」：重要用 `strong`，`b` 只是外觀。F12 看標籤名，不要只看粗體。
{% endnote %}

##### 用 AI 練習
請筆記本分辨語意與外觀，並說明實體。要它產出一整段新 HTML 時，改去聊天室，再對 MDN。

- `strong` 和 `b`、`del` 和 `s` 各該在什麼時候用？
- 畫面上要出現 `<div>` 這幾個字元時，原始碼的小於號為什麼要寫成實體？
- `abbr` 的 `title` 和 `time` 的 `datetime` 各給誰讀？

## 清單
點左邊「清單」（`pages/6_lists.html`）。相關項目請用語意清單，不要用一堆 `p` 加符號假裝。三種清單見 [MDN：ul](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/ul)、[MDN：ol](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/ol)、[MDN：dl](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/dl)。

### 無序清單（ul）
沒有先後順序的項目用 `ul`，項目必須包在 `li` 裡。適用於導覽、功能點。`index.html` 左邊與版面頁的選單也是 `ul`；那是「這一區是一串項目」，跟「要不要做成連結」是兩件事。符號之後用 CSS 改。

### 有序清單（ol）
有先後順序的步驟用 `ol`，瀏覽器會自動加序號。預設是阿拉伯數字。`start`、`type` 等其他值請問 AI 並以 MDN 查證。

### 巢狀清單
清單裡面可以再放清單。內層必須包在某個 `li` 裡面，不能跟 `li` 當兄弟。可以是無序裡再放有序。瀏覽器會自動縮排。

### 描述清單（dl）
術語對定義用 `dl`。`dt` 是名稱，`dd` 是說明。一個 `dt` 可以對多個 `dd`。裡面沒有 `li`。

{% note info %}
**清單怎麼選**
並列用 `ul`，有步驟用 `ol`，術語對定義用 `dl`。可以巢狀，但不要無謂套很多層。
{% endnote %}

{% note success %}
**跟著做**
F12 點「可巢狀」那個 `li`：裡面還有一個 `ul`。再看 `dl`：`dt` 與 `dd` 成對，沒有 `li`。
{% endnote %}

##### 用 AI 練習
讓筆記本選對清單種類。請它改壞掉的標籤時，改去聊天室，再回這頁對樹。

- 導覽選單、報名步驟、詞彙對照，分別該用 `ul`、`ol` 還是 `dl`？
- 內層清單為什麼必須放在某個 `li` 裡面，不能跟 `li` 當兄弟？

## 多媒體
點左邊「多媒體」（`pages/7_media.html`）。圖片、影片、音訊和嵌入網頁幾乎都是置換元素。教室沒有外網時，圖或影片可能載不進來，F12 仍看得到 `src`。見 [MDN：img](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/img)。

### 圖片元素（img）
`src` 是來源，`alt` 是替代文字：圖沒出來或給輔助工具時用得上。內容圖不要省略 `alt`，也不要寫「圖片」；裝飾圖才考慮空的 `alt=""`。`width`／`height` 先佔位置，減少版面跳動。本頁佔位圖是外連；專題改放專案內檔時，改回相對路徑。`title` 等其他值請問 AI 並以 MDN 查證。

`figure` 把圖和 `figcaption` 綁成一組。說明文字給人讀，不能取代 `alt`。

### 影音元素
`video`、`audio` 用 `controls` 讓你自己按。多種格式時用子元素 `source`。標籤之間的文字是後備，瀏覽器不支援時才看得到。見 [MDN：video](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/video)。

{% note warning %}
**瀏覽器自動播放限制**
現代瀏覽器通常禁止有聲音的自動播放。靜音才可能配 `autoplay`。本頁只用 `controls`。`loop`、`poster` 等其他值請問 AI 並以 MDN 查證。
{% endnote %}

### 嵌入元素（iframe）
`src` 是要嵌入的文件，`title` 說明這框是什麼，`name` 才能被連結的 `target` 指定（`index.html` 右欄就是這樣）。這一頁另嵌 `example.com`，只示範「框裡還有一份文件」。`sandbox`、`loading` 請問 AI 並以 MDN 查證。

{% note danger %}
**為什麼很多網站嵌不進去**
對方可能用 `X-Frame-Options` 或 CSP 禁止被嵌，用來防點擊劫持。Google、銀行首頁嵌不進去是正常的。失敗時改成一般連結。
{% endnote %}

{% note success %}
**跟著做**
F12 檢查 `img` 的 `src`／`alt`、`video` 裡的 `source`，以及這一頁的 iframe。沒有外網時對屬性即可。
{% endnote %}

##### 用 AI 練習
替代文字與自動播放都問原因。空的 `alt` 與「圖片」兩個字都先當錯，再對 MDN。

- 內容圖的 `alt` 該寫什麼？裝飾圖什麼時候才用空字串？
- `video` 加了 `autoplay` 為什麼常常沒聲音？練習頁為什麼仍要留 `controls`？

## 表格
點左邊「表格」（`pages/8_table.html`）。資料表用列和欄排結構化資訊。`index.html` 那張 `table` 是左右欄排版，**不要跟這一頁的資料表混在一起**。`border="1"` 只為了讓格線看得見。見 [MDN：table](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/table)。

### 表格的基本結構
`table` 是容器，`tr` 是列，`td` 是資料格，`th` 是標題格（欄名或列名）。格子從左到右、列從上到下。這份示範把欄名、資料、合計放在同一張表。

### 表格屬性與樣式
外觀之後用 CSS。舊屬性 `align`、`bgcolor`、`cellpadding`、`cellspacing` 在 HTML5 已過時，編輯器可能畫紅線。瀏覽器為了相容可能還接受。其他值請問 AI 並以 MDN 查證。

### 儲存格合併
`colspan` 橫向佔多欄，`rowspan` 直向佔多列。被合併掉的位置不要再寫多餘的 `th`／`td`。`8_table.html` 裡「人數」橫跨成人／兒童兩欄，「花蓮」那列把人數併成一格，「合計」再橫跨剩下的欄。能不加就不要加。

### 語意化表格結構
`caption` 是表名，必須是 `table` 的第一個子元素，畫面預設在表格上方。要出現在下方用 CSS `caption-side: bottom`，不是把標籤搬到表尾。`thead` 放欄名，`tbody` 放資料，`tfoot` 放合計。`tfoot` 寫在 `tbody` 後面，畫面在表底，不要把它當成表名。

### 輔助工具
`scope="col"` 表示這是欄名（例如「成人」），`scope="row"` 表示這是列名（例如「京都」）。畫面幾乎沒差，螢幕閱讀器讀表格時才用得上。更複雜的 `headers`、`colgroup` 請問 AI 並以 MDN 查證。見 [MDN：th](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/th)。

{% note success %}
**跟著做**
F12 點 `caption`、`thead`、`tbody`、`tfoot`。再點「人數」看 `colspan`，點「行程」看 `rowspan`。沿每一列數格子時，把合併的欄數算進去。
{% endnote %}

{% note warning %}
**AI 給錯的例子**
合併常被寫成 `<td colspan="2">` 後面又多一顆空的 `<td>`。`colspan="2"` 已經佔兩欄，多出來的格子會再長出一欄。用 `<table>` 包整頁左右欄也是舊式排版；資料表看這一頁，不要跟 `index.html` 那張切欄的表混在一起。
{% endnote %}

##### 用 AI 練習
在「認識常用元素」筆記本問表名放哪、`scope` 管哪一方向、合併後格子怎麼數。請它引用 [MDN：table](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/table)，不要改成用 `div` 排版。

- 表名想出現在表格下方時，是搬動 `caption`，還是用哪一個 CSS 屬性？
- `scope="col"` 和 `scope="row"` 差在哪？用這張價目表的「成人」和「京都」說明。
- `colspan="2"` 的那一列，為什麼不能再多寫一顆 `td`？

## 表單
點左邊「表單」（`pages/9_form.html`），檢查 `#booking-form`。表單用來收集文字、選項再送出。先把「label 對得起來、radio 同名、三種 button」弄清楚。見 [MDN：form](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/form)。

本頁 `action="#"`、`method="get"`：送出後仍停在這一頁，位址列出現 `name=` 這類 query 是瀏覽器預設，不是錯誤。

### 表單容器（form）
`action` 是送到哪，本頁 `#` 表示不換頁。`method="get"` 把資料接在網址後面，適合查詢；`post` 放在請求本體，適合敏感或大量資料。有檔案要上傳時才用 `post` 加上 `enctype="multipart/form-data"`。本頁的 `hidden` 畫面沒有，送出仍會帶 `source=class`。

### 表單標籤與關聯（label）
點「姓名」會聚焦到欄位，是因為 `label` 的 `for` 對到 `input` 的 `id`。選項也可以把控制項包在 `label` 裡。`placeholder` 只是空欄提示，**不能代替** `label`。見 [MDN：label](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/label)。

### 表單控制項通用屬性與驗證
`name` 是送出時的欄位名，沒有 `name` 的欄通常不會被送出。`id` 給 `for` 對，一份文件裡要唯一。`value` 是預設值，或被選時要送出的值。`required` 是必填；`maxlength`、`min`、`max` 限制範圍。`disabled` 不能改也不會送出，`readonly` 不能改但仍會送出。`pattern` 等其他值請問 AI 並以 MDN 查證。

### 基本輸入元素（input）
`input` 依 `type` 換成不同控制項。這份示範用 `text`、`email`、`number`。`email` 會檢查格式。`password`、`date`、`file`、`color` 等其他值請問 AI 並以 MDN 查證。見 [MDN：input](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/input)。

### 選擇元素
單選 `radio` 同一組必須同一個 `name`，靠 `value` 區分；`checked` 設預設。複選 `checkbox` 可多選，本頁加購共用 `name="extra"`。下拉 `select` 裡，`option` 的 `value` 才是送出值，`optgroup` 只是分組。`datalist` 仍是可打字的欄，`list` 對到 `datalist` 的 `id`。`multiple` 等其他值請問 AI 並以 MDN 查證。

### 文字區域（textarea）
多行輸入用 `textarea`。預設文字寫在開始與結束標籤之間，不像 `input` 用 `value`。`rows`、`cols` 只控制一開始看起來多大。

### 按鈕元素
`button` 作用於它所在的那一份 `form`。沒寫 `type` 時，預設就是 `submit`，所以一定要寫：`submit` 送出、`reset` 重設、`button` 不送出。見 [MDN：button](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/button)。

### 表單組織（fieldset、legend）
`fieldset` 把相關欄位圈成一組，`legend` 是這一組的標題。輔助工具會把 legend 跟欄位一起讀。本頁「報名資料」包住整份欄位。

### progress 與 meter
`progress` 表示進度，`meter` 表示計量（可設 `low`、`high`、`optimum`）。它們不是輸入欄，送出表單時通常不會當欄位送走。其他值請問 AI 並以 MDN 查證。

{% note success %}
**跟著做**
F12 確認姓名的 `for` 對到 `id`，且有 `name="name"`。兩個交通 radio 的 `name` 都是 `traffic`。填姓名後按送出，位址應出現 `name=`；按「不送出」不應送出。
{% endnote %}

{% note warning %}
**AI 給錯的例子**
常見寫法是 `<p>姓名</p>` 配上只有 `placeholder` 的 `input`，按鈕寫 `<button>送出</button>`。`placeholder` 不是欄位名稱；`button` 在 `form` 裡沒寫 `type` 時預設就是送出。應寫 `label` 的 `for` 對到 `input` 的 `id`，並寫明 `type`。對照 `#booking-form`。
{% endnote %}

##### 用 AI 練習
問 `for`／`id`、`name`、同一組 radio、三種 `button`。請它重寫整份表單時，改去聊天室或 Copilot，再回這頁點文字、按送出。

- `for` 和 `id` 為什麼要一樣？`name` 又是給誰的？送出後網址列會出現什麼？
- 同一組 radio 若 `name` 各寫各的，點選時會怎樣？
- 送出、重設、不送出，各自的 `type` 是什麼？為什麼不能省略？

{% note primary %}
**整理成你的 AI 筆記**
請「認識常用元素」筆記本出五題（標題層級、相對路徑與錨點、語意對外觀、清單種類、表單 `label`／`button`）、列出八個關鍵字、畫一張「常用元素」心智圖。把回答存成筆記。
{% endnote %}

# 選讀：無障礙（a11y）
**無障礙（accessibility）**縮寫成 **a11y**（a 與 y 中間 11 個字母）。目標是不同身體條件、不同裝置下，這頁仍然用得起來。只靠鍵盤、螢幕閱讀器、弱視，都算。這章不新增練習檔。正式規範見 [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)，元素怎麼被讀見 [MDN：無障礙](https://developer.mozilla.org/zh-TW/docs/Web/Accessibility)。

輔助工具讀的是文件樹與語意，不是你眼睛看到的排版。全是 `div` 的頁面，閱讀器只能唸成一串無名盒子。課堂上先把標籤用對，比先背 ARIA 有用。

{% note info %}
**自己聽一次（可選）**
Chrome <kbd>F12</kbd> → **Elements** 找 **Accessibility**。點一個元素，看 Name、Role。這段不必當成必須完成的練習。
{% endnote %}

## 語言與標題大綱
`html` 的 `lang="zh-Hant"` 決定閱讀器怎麼發音。漏寫或寫成 `en`，中文會被唸成怪腔。標題層級是這份文件的目錄：一頁一個 `h1`，下面依章節用 `h2`，不要為了字變小就跳到 `h4`。用 `div class="big"` 當標題，閱讀器沒有可靠大綱。

## 圖片的替代文字
內容圖必須有 `alt`，寫得出畫面在做什麼。寫「圖片」或檔名等於沒寫。純裝飾才用 `alt=""`，告訴閱讀器略過。`7_media.html` 的色塊圖可以拿來對。

## 表單：欄位要有名字
沒有 `label` 的輸入框，閱讀器可能只唸「編輯文字」。點「姓名」應聚焦到欄位。`placeholder` 填了就消失，不能代替標籤。`#booking-form` 已用 `for`／`id`。

## 連結去別處，按鈕在本頁做事
`a` 要有 `href`，文字要能看出目的地，不要只寫「點這裡」。在本頁送出、開關，用 `button`。用 `div` 加上點擊外觀，鍵盤的 <kbd>Tab</kbd> 預設走不進去。`button` 在 `form` 裡沒寫 `type` 會變成送出。

## 資料表要有表頭
輔助工具會把 `th` 跟資料格綁在一起。只有 `td`、沒有 `caption`／`scope`，就只是一堆格子。`8_table.html` 已具備表名與 `scope`。`index.html` 那張左右欄是排版，不是資料表。

## 鍵盤走得過整頁
連結與按鈕可用 <kbd>Tab</kbd> 移動、<kbd>Enter</kbd> 啟動。若把焦點外框拿掉，鍵盤使用者會在頁上消失。淺灰字配白底也讀不到，對比之後用 CSS 再調。其他按鍵行為請問 AI 並以 MDN 查證。

## ARIA 是補充元素說明，不是必要動作
**ARIA**（Accessible Rich Internet Applications）用來幫 HTML 本身說不清楚的複雜元件補語意，例如對話框。亂加 `aria-label`，或跟看得見的文字打架，閱讀器會更亂。能用原生 `button`、`nav`、`label` 就不要先上 ARIA。iframe 把主文藏在另一份文件，輔助工具較難讀，這也是它不適合當正式架構的原因之一。

{% note success %}
**選讀時可對**
F12 → Accessibility，點練習頁的 `h1`、姓名 `label`、一張 `img`，看 Name／Role。只按 <kbd>Tab</kbd> 走一遍表單，焦點應進得了欄位與三顆按鈕。
{% endnote %}

##### 用 AI 練習
在「選讀」筆記本問。請它不要加 ARIA。要改短範例時，改去聊天室，再用 Accessibility 面板對 Name。

- 沒有 `lang`、用 `div` 當標題，閱讀器為什麼沒有可靠大綱？
- `alt` 寫「圖片」有什麼問題？裝飾圖什麼時候用空字串？
- 「點這裡」和用 `div` 當送出鈕，各有什麼問題？

{% note primary %}
**整理成你的 AI 筆記**
請這個筆記本出三題（`lang` 與標題、`alt`、`label`／`button`）、列出五個關鍵字、畫一張「原生語意優先於 ARIA」的心智圖。把回答存成筆記。
{% endnote %}

# 本篇重點回顧
外層 `index.html` 用 iframe 串起 `pages/`。點選單只換右欄，`target` 與 iframe 的 `name` 要相同；正式網站不要這樣切，SEO 與 RWD 都會吃虧。

瀏覽器把元素畫成盒子：區塊獨佔一行，行內跟文字排。`div`／`span` 只負責包一層；頁首、主文、頁尾用語意標籤。屬性給功能，頭尾包覆的 context 是文字流。

常用元素對過標題與段落、連結與路徑、文字與實體、清單、多媒體、表格、表單。屬性與 `type` 的其餘取值，問免費聊天室或 NotebookLM，再以 MDN 與 F12 查證。選讀的無障礙從 `lang`、`alt`、`label`、真正的 `a`／`button` 開始。NotebookLM 負責引用來源、把回答存成 AI 筆記；寫程式與除錯用免費聊天室或 Copilot Free。

{% note primary %}
**整理成你的 AI 筆記**
把四個筆記本裡已存的筆記各留標題，在「認識常用元素」那個筆記本再問一次：「依來源列出這篇必須自己在 F12 點過的標籤。」把回答存成總複習。
{% endnote %}
