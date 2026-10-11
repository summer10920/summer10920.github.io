
# 取得素材（第四部分）

同一份版面要在窄螢幕與寬螢幕都能讀，顏色與間距也要能整站一起改。這一部分把自訂屬性做成可覆寫的代幣，再用變形、轉場、動畫做互動，最後用媒體查詢改「結構」。開發者工具用來核對規則有沒有打中、斷點有沒有走到。觀念對齊 {% post_link lokiTech-css-baseclass-2 %} 的變數與 {% post_link lokiTech-css-baseclass-5 %}；第一部分選讀只看過 `--` 這個名字，這裡做成可開的頁。

沿用 `student/practice/css/`。用下面的 `index.html` 蓋掉原本那份（選單多了六項），六個新檔放進已有的 `pages/`。`pages/1`～`17` 不用改。第三部分那些在窄視窗會擠在一起的欄，這裡用查詢改結構。

{% note primary %}
**素材準備**
在 VS Code 開啟 `student/practice/`。蓋掉 `css/index.html`，把六個新檔存進 `css/pages/`。Live Server 開 `css/index.html`，左邊點「變數」。
{% endnote %}

## 檔案一覽

左邊多六項。每一頁的 CSS 仍寫在該頁 `<style>`，複製一份就能開。外層仍只用 `table` 切左右，正式站不要沿用這套外框。每一頁開頭的 `box-sizing: border-box` 沿用第二部分。

| 存檔位置 | 左邊選單 | 這一頁在講什麼 |
| --- | --- | --- |
| `index.html` | （外層，網址不變） | 選單加上變數、變形、轉場、動畫、查詢、除錯 |
| `pages/18_vars.html` | 變數 | `:root` 代幣、覆寫、備援、型別對不上 |
| `pages/19_transform.html` | 變形 | 平移、縮放、旋轉、傾斜、原點 |
| `pages/20_transition.html` | 轉場 | 時間、曲線、獨立的 `translate` |
| `pages/21_animation.html` | 動畫 | `@keyframes`、次數、填滿、減少動態 |
| `pages/22_rwd.html` | 查詢 | 窄到寬的斷點、欄數、列印 |
| `pages/23_inspect.html` | 除錯 | 給 Styles／Computed／盒子圖對的一張票卡 |

{% tabs css動態,1 %}
<!-- tab index.html -->
```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 第一至四部分</title>
  </head>
  <body style="margin: 0">
    <table style="width: 100%; height: 100vh; border-collapse: collapse">
      <tr>
        <td
          style="
            width: 12rem;
            vertical-align: top;
            border-right: 1px solid #ccc;
            padding: 1rem;
          "
        >
          <header id="site-header">
            <p>洛奇旅行 · CSS</p>
            <nav>
              <ul>
                <li><a href="pages/1_syntax.html" target="demo">語法</a></li>
                <li><a href="pages/2_where.html" target="demo">寫在哪</a></li>
                <li><a href="pages/3_selectors.html" target="demo">選擇器</a></li>
                <li><a href="pages/4_cascade.html" target="demo">權重與繼承</a></li>
                <li><a href="pages/5_units.html" target="demo">單位與顏色</a></li>
                <li><a href="pages/6_type.html" target="demo">文字與字型</a></li>
                <li><a href="pages/7_bg.html" target="demo">背景</a></li>
                <li><a href="pages/8_box.html" target="demo">盒子</a></li>
                <li><a href="pages/9_space.html" target="demo">間距</a></li>
                <li><a href="pages/10_display.html" target="demo">display</a></li>
                <li><a href="pages/11_position.html" target="demo">定位</a></li>
                <li><a href="pages/12_flow.html" target="demo">層級與溢出</a></li>
                <li><a href="pages/13_flex.html" target="demo">主軸</a></li>
                <li><a href="pages/14_flex-align.html" target="demo">對齊</a></li>
                <li><a href="pages/15_flex-item.html" target="demo">子項</a></li>
                <li><a href="pages/16_grid.html" target="demo">軌道</a></li>
                <li><a href="pages/17_grid-area.html" target="demo">區域</a></li>
                <li><a href="pages/18_vars.html" target="demo">變數</a></li>
                <li><a href="pages/19_transform.html" target="demo">變形</a></li>
                <li><a href="pages/20_transition.html" target="demo">轉場</a></li>
                <li><a href="pages/21_animation.html" target="demo">動畫</a></li>
                <li><a href="pages/22_rwd.html" target="demo">查詢</a></li>
                <li><a href="pages/23_inspect.html" target="demo">除錯</a></li>
              </ul>
            </nav>
          </header>
        </td>
        <td style="padding: 0">
          <main>
            <iframe
              name="demo"
              src="pages/18_vars.html"
              title="示範內容"
              style="width: 100%; height: 100vh; border: 0"
            ></iframe>
          </main>
        </td>
      </tr>
    </table>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/18_vars.html -->
```html pages/18_vars.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>自訂屬性</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      /* 代幣放在 :root，整份文件都能繼承到 */
      :root {
        --ink: #134e4a;
        --paper: #f8fafc;
        --card: #fff;
        --brand: #0f766e;
        --brand-ink: #f0fdfa;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --radius: 0.75rem;
      }

      /* 系統是深色時只改代幣，元件仍寫 var() */
      @media (prefers-color-scheme: dark) {
        :root {
          --ink: #ccfbf1;
          --paper: #042f2e;
          --card: #0b3f3c;
          --brand: #2dd4bf;
          --brand-ink: #042f2e;
        }
      }

      body {
        margin: var(--space-lg);
        color: var(--ink);
        background: var(--paper);
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 var(--space-sm);
      }

      h2 {
        font-size: 1.15rem;
        margin: var(--space-lg) 0 var(--space-sm);
      }

      .note {
        max-width: 40rem;
      }

      .swatches {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .swatches li {
        width: 7rem;
        padding: var(--space-sm);
        border-radius: var(--radius);
        background: var(--brand);
        color: var(--brand-ink);
        text-align: center;
      }

      .swatches .ink {
        background: var(--ink);
        color: var(--paper);
      }

      .swatches .paper {
        background: var(--paper);
        color: var(--ink);
        border: 1px solid var(--brand);
      }

      .card {
        max-width: 22rem;
        margin-top: var(--space-md);
        padding: var(--space-md);
        border-radius: var(--radius);
        background: var(--card);
        color: var(--ink);
      }

      .card h3 {
        margin: 0 0 var(--space-sm);
      }

      .go {
        display: inline-block;
        margin-top: var(--space-sm);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius);
        background: var(--brand);
        color: var(--brand-ink);
        text-decoration: none;
      }

      /* 這一張改自己的代幣，子孫的 var() 跟著走 */
      .night {
        --ink: #f0fdfa;
        --paper: #134e4a;
        --brand: #5eead4;
        --brand-ink: #134e4a;
        background: var(--paper);
        color: var(--ink);
      }

      .tag {
        display: inline-block;
        margin-top: var(--space-md);
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        background: var(--tag-bg, #ffedd5);
        color: var(--tag-ink, #9a3412);
      }

      /* --space-md 是長度，拿去當 color 會在計算時失效 */
      .bad {
        color: #9f1239;
        color: var(--space-md);
      }
    </style>
  </head>
  <body>
    <h1>代幣集中在 :root</h1>
    <p class="note">
      色塊、卡片、按鈕都讀同一組名字。系統若是深色，這一頁的底與字會整組換掉；淺色系統請先看下面那張夜卡。
    </p>
    <ul class="swatches">
      <li>brand</li>
      <li class="ink">ink</li>
      <li class="paper">paper</li>
    </ul>
    <h2>元件沿用，區塊可覆寫</h2>
    <article class="card">
      <h3>清水寺清晨</h3>
      <p>這張卡用全站的 --ink 與 --brand。</p>
      <a class="go" href="#kiyomizu">看行程</a>
    </article>
    <article class="card night">
      <h3>夜巴士</h3>
      <p>這張卡把自己的 --ink、--paper、--brand 換掉，按鈕跟著變。</p>
      <a class="go" href="#night">看行程</a>
    </article>
    <h2>備援與對不上的型別</h2>
    <p class="tag">沒有定義 --tag-bg，所以用備援的杏色。</p>
    <p class="bad">
      這段把長度變數塞進 color。Computed 的字色會回到 body，不會變成玫瑰紅，也不會變成 1rem。
    </p>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/19_transform.html -->
```html pages/19_transform.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>變形</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        background: #f8fafc;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 40rem;
      }

      .board {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
        gap: 1.25rem;
        max-width: 46rem;
        margin-top: 1rem;
      }

      figure {
        margin: 0;
      }

      /* 虛線是排版位子，變形不會把它撐大 */
      .slot {
        height: 6.5rem;
        border: 1px dashed #94a3b8;
        background: #fff;
      }

      .box {
        width: 5rem;
        height: 5rem;
        margin: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        background: #0f766e;
        color: #f0fdfa;
      }

      figcaption {
        margin-top: 0.35rem;
        font-size: 0.9rem;
      }

      .move {
        transform: translate(1rem, 0.4rem);
      }

      .grow {
        transform: scale(1.15);
      }

      .turn {
        transform: rotate(18deg);
      }

      .lean {
        transform: skewX(12deg);
      }

      .hinge {
        transform-origin: left bottom;
        transform: rotate(-18deg);
      }

      .combo {
        transform: translateX(0.4rem) rotate(12deg);
      }
    </style>
  </head>
  <body>
    <h1>變形只改畫出來的樣子</h1>
    <p class="note">
      每張虛線框是這顆方塊在排版裡佔的位子。方塊轉開、放大之後，虛線框的大小與隔壁的距離都不變。
    </p>
    <div class="board">
      <figure>
        <div class="slot"><div class="box">原樣</div></div>
        <figcaption>沒有 transform</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box move">平移</div></div>
        <figcaption>translate(1rem, 0.4rem)</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box grow">放大</div></div>
        <figcaption>scale(1.15)</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box turn">旋轉</div></div>
        <figcaption>rotate(18deg)</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box lean">傾斜</div></div>
        <figcaption>skewX(12deg)</figcaption>
      </figure>
      <figure>
        <div class="slot"><div class="box hinge">左下</div></div>
        <figcaption>原點在左下再旋轉</figcaption>
      </figure>
    </div>
    <h2>兩個函式寫在同一條</h2>
    <div class="board">
      <figure>
        <div class="slot"><div class="box combo">先轉</div></div>
        <figcaption>右邊的 rotate 先做，再 translateX</figcaption>
      </figure>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/20_transition.html -->
```html pages/20_transition.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>轉場</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        background: #f8fafc;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 40rem;
      }

      .go {
        display: inline-block;
        margin-top: 0.75rem;
        padding: 0.55rem 1rem;
        border: 0;
        border-radius: 0.6rem;
        background: #0f766e;
        color: #f0fdfa;
        font: inherit;
        cursor: pointer;
        transition: background-color 200ms ease, translate 200ms ease;
      }

      .go:focus-visible {
        outline: 2px solid #115e59;
        outline-offset: 3px;
      }

      .tracks {
        display: grid;
        gap: 0.75rem;
        max-width: 24rem;
        margin-top: 0.75rem;
      }

      .track {
        display: grid;
        grid-template-columns: 5.5rem 1fr;
        align-items: center;
        gap: 0.5rem;
      }

      .lane {
        width: 16rem;
        height: 2rem;
        overflow: hidden;
        background: #e2e8f0;
        border-radius: 999px;
      }

      .knob {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: #0f766e;
      }

      .ease .knob {
        transition: translate 800ms ease;
      }

      .linear .knob {
        transition: translate 800ms linear;
      }

      .in .knob {
        transition: translate 800ms ease-in;
      }

      .out .knob {
        transition: translate 800ms ease-out;
      }

      .lift {
        max-width: 16rem;
        margin-top: 0.75rem;
        padding: 1rem;
        border-radius: 0.75rem;
        background: #fff;
        box-shadow: 0 1px 2px rgb(15 23 42 / 0.08);
        rotate: -1deg;
        transition: translate 200ms ease, box-shadow 200ms ease;
      }

      /* 有懸停能力的裝置才抬起，觸控螢幕不會卡在移入狀態 */
      @media (hover: hover) and (pointer: fine) {
        .go:hover {
          background: #115e59;
          translate: 0 -2px;
        }

        .track:hover .knob {
          translate: 14rem 0;
        }

        .lift:hover {
          translate: 0 -0.4rem;
          box-shadow: 0 0.75rem 1.5rem rgb(15 118 110 / 0.2);
        }
      }
    </style>
  </head>
  <body>
    <h1>轉場只接兩個狀態</h1>
    <p class="note">
      把指標移到按鈕、軌道或卡片上。鍵盤使用者按 <kbd>Tab</kbd> 時，按鈕會出現外框。觸控螢幕沒有真正的懸停，這頁的移入效果包在 hover 查詢裡。
    </p>
    <button class="go" type="button">看行程</button>
    <h2>同一段位移，四種曲線</h2>
    <div class="tracks">
      <div class="track ease">
        <span>ease</span>
        <div class="lane"><div class="knob"></div></div>
      </div>
      <div class="track linear">
        <span>linear</span>
        <div class="lane"><div class="knob"></div></div>
      </div>
      <div class="track in">
        <span>ease-in</span>
        <div class="lane"><div class="knob"></div></div>
      </div>
      <div class="track out">
        <span>ease-out</span>
        <div class="lane"><div class="knob"></div></div>
      </div>
    </div>
    <h2>抬起時保留原本的旋轉</h2>
    <article class="lift">
      <h3>嵐山</h3>
      <p>卡片本來就 rotate 了一點。移入只改 translate，角度還在。</p>
    </article>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/21_animation.html -->
```html pages/21_animation.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>動畫</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        background: #f8fafc;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      h2 {
        font-size: 1.15rem;
        margin: 1.75rem 0 0.5rem;
      }

      .note {
        max-width: 40rem;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-top: 0.75rem;
      }

      .badge {
        display: inline-block;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        background: #9f1239;
        color: #fff1f2;
        animation: pulse 1.6s ease-in-out infinite;
      }

      .spin {
        width: 1.6rem;
        height: 1.6rem;
        border: 3px solid #99f6e4;
        border-top-color: #0f766e;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }

      .spin:hover {
        animation-play-state: paused;
      }

      .enter {
        max-width: 18rem;
        padding: 1rem;
        border-radius: 0.75rem;
        background: #fff;
        animation-name: enter;
        animation-duration: 0.7s;
        animation-timing-function: ease;
        animation-fill-mode: both;
      }

      .enter h3 {
        margin: 0 0 0.35rem;
      }

      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.08);
        }
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes enter {
        from {
          opacity: 0;
          transform: translateY(0.6rem);
        }

        to {
          opacity: 1;
          transform: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .badge,
        .spin,
        .enter {
          animation: none;
        }
      }
    </style>
  </head>
  <body>
    <h1>動畫自己沿關鍵影格走</h1>
    <p class="note">
      熱賣標籤會反覆縮放，圓環會轉。指標停在圓環上時暫停。行程卡進場只播一次，結束後留在最後一格。系統若要求減少動態，這三個動畫會關掉。
    </p>
    <div class="row">
      <span class="badge">熱賣</span>
      <div class="spin" role="img" aria-label="載入中"></div>
    </div>
    <h2>進場只播一次</h2>
    <article class="enter">
      <h3>金閣寺</h3>
      <p>重新整理這頁，卡片會從稍下方淡入。fill-mode 讓它停留在看得到的狀態。</p>
    </article>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/22_rwd.html -->
```html pages/22_rwd.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>媒體查詢</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :root {
        --ink: #134e4a;
        --paper: #f8fafc;
        --card: #fff;
        --cols: 1fr;
      }

      body {
        margin: 0;
        color: var(--ink);
        background: var(--paper);
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      .layout {
        display: grid;
        gap: 1rem;
        padding: 1rem;
      }

      header,
      nav,
      .main,
      aside {
        padding: 0.9rem 1rem;
        border-radius: 0.75rem;
        background: var(--card);
      }

      h1 {
        font-size: 1.5rem;
        margin: 0;
      }

      h2 {
        font-size: 1.1rem;
        margin: 0 0 0.5rem;
      }

      .now {
        margin: 0.35rem 0 0;
        color: #115e59;
      }

      .now::after {
        content: "單欄，導覽橫排";
      }

      nav ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      nav a {
        color: #0f766e;
      }

      .cards {
        display: grid;
        grid-template-columns: var(--cols);
        gap: 0.75rem;
      }

      .cards article {
        padding: 0.75rem;
        border-radius: 0.6rem;
        background: #f0fdfa;
      }

      .cards h3 {
        margin: 0 0 0.25rem;
      }

      .cards p {
        margin: 0;
      }

      /* 查詢裡的 rem 跟瀏覽器預設字級走，通常 16px */
      @media (min-width: 32rem) {
        :root {
          --cols: 1fr 1fr;
        }

        .now::after {
          content: "卡片兩欄";
        }
      }

      @media (min-width: 48rem) {
        .layout {
          grid-template-columns: 12rem 1fr;
          grid-template-areas:
            "head head"
            "nav main"
            "nav side";
          align-items: start;
        }

        header {
          grid-area: head;
        }

        nav {
          grid-area: nav;
        }

        .main {
          grid-area: main;
        }

        aside {
          grid-area: side;
        }

        nav ul {
          flex-direction: column;
        }

        .now::after {
          content: "側欄版面";
        }
      }

      @media print {
        nav,
        .now,
        aside {
          display: none;
        }

        body {
          background: #fff;
          color: #000;
        }

        header,
        .main {
          background: #fff;
        }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <header>
        <h1>洛奇旅行</h1>
        <p class="now">這一頁的視窗現在是：</p>
      </header>
      <nav>
        <ul>
          <li><a href="#kyoto">京都</a></li>
          <li><a href="#hokkaido">北海道</a></li>
          <li><a href="#okinawa">沖繩</a></li>
        </ul>
      </nav>
      <div class="main">
        <h2>本週行程</h2>
        <div class="cards">
          <article>
            <h3>清水寺</h3>
            <p>清晨階梯人少。</p>
          </article>
          <article>
            <h3>嵐山</h3>
            <p>渡月橋步行。</p>
          </article>
          <article>
            <h3>伏見</h3>
            <p>千本鳥居。</p>
          </article>
          <article>
            <h3>金閣寺</h3>
            <p>庭園一圈。</p>
          </article>
        </div>
      </div>
      <aside>
        <h2>行前</h2>
        <p>窄螢幕時這欄排在行程下面。寬螢幕時它跟導覽同一欄的下方。</p>
      </aside>
    </div>
  </body>
</html>
```
<!-- endtab -->
<!-- tab pages/23_inspect.html -->
```html pages/23_inspect.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>用開發者工具對樣式</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :root {
        --ink: #134e4a;
        --paper: #fff;
      }

      body {
        margin: 1.5rem;
        color: #134e4a;
        background: #f8fafc;
        font-family: system-ui, "Segoe UI", "PingFang TC", "Microsoft JhengHei",
          sans-serif;
        line-height: 1.6;
      }

      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }

      .note {
        max-width: 40rem;
      }

      .ticket {
        width: 18rem;
        margin: 1.5rem 0;
        padding: 1rem;
        border: 4px solid #0f766e;
        border-radius: 0.75rem;
        background: var(--paper);
        color: #94a3b8; /* 同屬性，下一條會蓋過 */
        colour: red; /* 拼錯，整條丟掉 */
        color: var(--ink);
      }

      .ticket h2 {
        margin: 0 0 0.35rem;
        font-size: 1.25rem;
      }

      #featured {
        color: #9f1239;
      }

      .price {
        margin: 0.75rem 0 0;
        font-size: 1.35rem;
      }

      .go {
        display: inline-block;
        margin-top: 0.75rem;
        padding: 0.45rem 0.9rem;
        border-radius: 0.5rem;
        background: #0f766e;
        color: #f0fdfa;
        text-decoration: none;
        transition: background-color 200ms ease, translate 200ms ease;
      }

      @media (hover: hover) and (pointer: fine) {
        .go:hover {
          background: #115e59;
          translate: 0 -2px;
        }
      }
    </style>
  </head>
  <body>
    <h1>這一張票用來對面板</h1>
    <p class="note">
      選中下面的 article。Styles 裡應看到被劃掉的灰色 color、無效的 colour，以及贏過 class 的 id 顏色。盒子圖的寬度含 padding 與邊框。
    </p>
    <article id="featured" class="ticket">
      <h2>京都一日</h2>
      <p>含清水寺與嵐山。id 的字色蓋過 class。</p>
      <p class="price">NT$ 2,400</p>
      <a class="go" href="#book">報名</a>
    </article>
  </body>
</html>
```
<!-- endtab -->
{% endtabs %}

## 選單只加連結

`index.html` 仍放在 `css/`，`href` 仍是 `pages/檔名.html`。`target="demo"` 與 iframe 的 `name="demo"` 維持相同字串，點選單只換右欄。這次預設 `src` 改成 `pages/18_vars.html`，一開就停在變數。

媒體查詢看的是**那一份文件自己的視窗**。示範頁開在右欄 iframe 裡時，視窗就是 iframe 的寬，不是整台螢幕的解析度。你把瀏覽器拉窄，右欄變窄，`22_rwd.html` 的斷點會跟著走。正式站沒有這層 iframe，查詢直接看瀏覽器視窗。

{% note info %}
**小技巧：先確認檔有載入**
左邊點了右邊空白時，多半是路徑或檔名和選單不一致。<kbd>F12</kbd> → **Network**，篩 **Doc**，看那一列是不是紅色的 `404`。
{% endnote %}

# 認識自訂屬性

自訂屬性（custom properties）是你自己命名、可被繼承的 CSS 值，寫法是 `--名字: 值`。取用時寫 `var(--名字)`。第一部分選讀看過品牌色收成變數；這裡用 `pages/18_vars.html` 把色、間距、圓角收成一組代幣，改一處就整頁一起變。

它們跟預處理器的變數不同：瀏覽器在套用樣式時才算出來，所以會參加繼承與覆寫。JavaScript 之後可以用 `element.style.setProperty("--brand", "#9f1239")` 改同一個名字。今天先只在樣式表裡改。

{% mermaid graph TD %}
R[":root 的 --brand"] --> B["body、一般卡片繼承"]
R --> N[".night 再宣告一次 --brand"]
N --> C["這張卡與裡面的按鈕讀到新值"]
{% endmermaid %}

| 寫法 | 做什麼 |
| --- | --- |
| `--brand: #0f766e` | 宣告。名字區分大小寫，`--Brand` 是另一個 |
| `var(--brand)` | 取用。可以用在任何屬性值，也能放進 `calc()` |
| `var(--tag-bg, #ffedd5)` | 第二個引數是備援，只有變數**沒有定義**時才用 |
| `:root { }` | 選到文件根（HTML 文件就是 `html`），適合全站代幣 |

## 宣告與 var()

代幣放在 `:root`，`body` 的字色、底色、間距都寫 `var(--ink)` 這種名字，不要在每個元件再抄一次色碼。卡片底用 `--card`：系統改成深色時，這顆底與 `--ink` 一起換，淺色字才不會留在白卡片上。`18_vars.html` 的三個色塊與「清水寺」那張卡讀的是同一組。間距用 `--space-sm`、`--space-md`、`--space-lg`，圓角用 `--radius`。之後要改品牌，只改 `:root` 那一段。

`calc(var(--space-md) * 1.5)` 可以拿代幣做算術。乘除時乘號兩側留空格。代幣裡若已經寫了單位（`1rem`），`calc()` 不要再加一次單位。

{% note success %}
**跟著做**
點「變數」。<kbd>F12</kbd> 選中 `<html>`，在 **Styles** 把 `--brand` 改成 `#9f1239`。色塊與第一張卡的按鈕應一起變，夜卡的按鈕仍是淺青，因為它自己又宣告了 `--brand`。
{% endnote %}

## 繼承、覆寫、備援

自訂屬性會繼承。子元素沒有自己的 `--ink` 時，用的是祖先那一個。`.night` 在卡片上重新宣告 `--ink`、`--paper`、`--brand`、`--brand-ink`，這張卡和裡面的連結讀到新值，外面的頁面不受影響。要做「這一個區塊換膚」，覆寫代幣比把每條 `color` 重寫一遍短。

`var(--tag-bg, #ffedd5)` 的備援只在「這個名字完全沒被宣告」時出現。`18_vars.html` 的杏色標籤就是這樣。變數有宣告、但值是空的或型別不合，備援**不會**上場。備援也可以是另一個 `var()`。

名字用用途，例如 `--ink`、`--space-md`。`--blue`、`--big` 這種名字在換膚時會說謊：深色模式下那顆「藍」可能已經不是藍。

{% note warning %}
**注意事項**
`var()` 不能當屬性名稱，只能當值。`var(--which): 1rem` 這種寫法整條無效。也不要把整條規則放進變數裡。
{% endnote %}

## 值的型別

自訂屬性存的是一串符號，瀏覽器先不檢查它是不是顏色或長度。等到放進某個屬性、進入計算值時才檢查。`18_vars.html` 的 `.bad` 寫了兩次 `color`：先是玫瑰紅，再是 `var(--space-md)`。`--space-md` 有定義，所以備援用不上；它的值是 `1rem`，不能當顏色。層疊已經選了第二條，計算時這條作廢，字色改走繼承，也就是 `body` 的 `--ink`。同一條規則裡寫在前面的玫瑰紅不會回來。

在 **Computed** 看這段的 `color`，應是深青綠一類的繼承值。**Styles** 裡那條 `var(--space-md)` 會標成無效或無法計算。這也是代幣要分開命名的原因：長度與顏色不要共用一個名字。

系統偏好深色時，同一頁用 `@media (prefers-color-scheme: dark)` 只覆寫 `:root` 的代幣，元件不用各寫一套深色規則。淺色系統的課堂電腦看不出這段，下一節的開發者工具可以用面板模擬。查詢本身的寫法，在媒體查詢那一章。

# 認識變形與動態

變形（transform）改的是元素畫出來的位置、大小、角度，排版位子不動。轉場（transition）在兩個狀態之間補間，例如移入與移出。動畫（animation）用關鍵影格自己播，可以循環。三頁分開：`19_transform.html`、`20_transition.html`、`21_animation.html`。要動的優先是 `transform` 與 `opacity`；用 `top`、`left`、`width` 做每幀位移，容易拖慢版面計算。

{% mermaid graph LR %}
T["transform<br/>改畫面，不改佔位"] --> Tr["transition<br/>有人觸發才從 A 到 B"]
T --> A["animation<br/>依 keyframes 自己播"]
{% endmermaid %}

| | 轉場 | 動畫 |
| --- | --- | --- |
| 何時動 | 屬性值變了才動，例如 `:hover`、`:focus-visible` | 套上就播，不必等指標 |
| 狀態 | 起點與終點兩個 | `@keyframes` 可多段 |
| 循環 | 不會自己循環 | `infinite` 或指定次數 |
| 課堂例子 | 按鈕變色、卡片抬起 | 熱賣縮放、載入圓環、進場 |

## 變形不推動鄰居

`transform` 接受一串函式，函式之間用空格分開。`19_transform.html` 每一格的虛線框是排版位子：方塊 `translate` 出去、`scale` 變大、`rotate` 轉開，虛線框的寬高與格子之間的 `gap` 都不變。旁邊的文字不會被推開。真的要佔更大的位子，改寬高或 `margin`，不要靠放大硬撐。

| 函式 | 效果 | 這一頁的值 |
| --- | --- | --- |
| `translate(x, y)` | 平移。百分比相對**自己**的寬高 | `translate(1rem, 0.4rem)` |
| `translateX`／`translateY` | 只動一軸 | 組合那一格用了 `translateX` |
| `scale(n)` | 縮放。`1` 是原寸，`1.15` 是放大 | `scale(1.15)` |
| `rotate(角度)` | 旋轉。單位用 `deg` | `rotate(18deg)` |
| `skewX`／`skewY` | 傾斜。按鈕與卡片很少需要 | `skewX(12deg)` |

`transform-origin` 是旋轉與縮放的基準點，預設是中心。`.hinge` 把原點放在 `left bottom`，方塊像以左下角為軸轉開。原點可以寫關鍵字，也可以寫長度或百分比。

同一條 `transform` 裡，**右邊的函式先套用**。`.combo` 寫的是 `translateX(0.4rem) rotate(12deg)`，所以先轉 12 度，再沿水平方向平移。把兩個函式對調，平移的方向會跟著已旋轉的軸走，畫面不一樣。課堂先一個動作一個函式；要疊加時對調一次，確認順序。

`matrix()` 是把平移、縮放、旋轉壓成六個數字，給工具產生即可，不要手算。立體翻面放在選讀。廠商前綴不用加，Chrome 直接吃標準的 `transform`。

{% note warning %}
**注意事項**
變形後的元素仍佔原來的位子，點擊範圍以變形後的畫面為準。第二部分提過：祖先若有 `transform`，子孫的 `position: fixed` 會改以那個祖先為視窗。卡片要加 `transform` 時，不要把全站的固定頁首包在同一層裡面。
{% endnote %}

{% note success %}
**跟著做**
點「變形」，打開 **Elements** 選一顆 `.box`。在 **Styles** 把 `rotate(18deg)` 改成 `rotate(90deg)`。虛線 `.slot` 的盒子圖寬高應幾乎不變，方塊則轉出虛線外。
{% endnote %}

## 轉場連接兩個狀態

有人讓某個屬性從舊值變成新值時，`transition` 把中間的畫面補上。`20_transition.html` 的按鈕在平常與 `:hover` 之間補 `background-color` 與 `translate`。沒有寫進 `transition` 的屬性會瞬間切換。

簡寫的順序是：屬性、持續時間、速度曲線、延遲。前兩個最常寫。

```css
transition: background-color 200ms ease, translate 200ms ease;
```

逗號分隔多個屬性。時間寫兩個時，第一個是持續時間，第二個是延遲：`200ms ease 80ms` 表示等 80 毫秒再花 200 毫秒走完。只寫一個時間，那個就是持續時間，延遲是 0。

| 曲線 | 走路的方式 |
| --- | --- |
| `ease` | 慢、快、再慢。預設，多數介面夠用 |
| `linear` | 等速 |
| `ease-in` | 先慢後快 |
| `ease-out` | 先快後慢，東西停下來時比較順 |
| `cubic-bezier(n, n, n, n)` | 自訂曲線。選讀再碰 |

這一頁四條軌道的位移距離與 800ms 相同，只有曲線不同。指標移入軌道，圓點一起出發，到達右側的節奏不一樣。介面回饋用 150～300ms 就夠；長過半秒會像在等它。

`:hover` 只描述指標移入。觸控螢幕常常沒有「移出」，效果會卡住。這頁把移入規則包在 `@media (hover: hover) and (pointer: fine)` 裡：有滑鼠一類的細指標時才抬起。鍵盤改看 `:focus-visible`，按鈕用 `outline`，不要把外框設成 `none` 卻不給替代。

抬起的卡片另外用了獨立屬性 `rotate` 與 `translate`，沒有寫進 `transform` 那一條。獨立屬性互不覆蓋：移入只改 `translate`，原本的 `rotate: -1deg` 還在。若把角度與位移都塞進同一個 `transform`，移入那一條必須把 `rotate` 再寫一次，否則角度會被清掉。`translate`、`rotate`、`scale` 的套用順序固定，與你在規則裡書寫的先後無關。同一種動作不要兩邊各寫一套。

{% note info %}
**小技巧：不要寫 all**
`transition: all 300ms` 會把之後加上的任何屬性都補間，包含你沒打算動的顏色或尺寸。逐條寫出 `background-color`、`translate`、`opacity`、`box-shadow`。
{% endnote %}

## 動畫自己播放

轉場需要一個新值才會動。動畫用 `@keyframes` 寫腳本，元素一套上 `animation` 就播。`21_animation.html` 有三個：熱賣標籤循環縮放、載入圓環一直轉、行程卡進場一次。

關鍵影格的名字自己取，跟 class 無關。`from` 等於 `0%`，`to` 等於 `100%`。可以只寫百分比。

```css
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}
```

套到元素上時，持續時間必須寫，否則預設是 `0s`，你看不見過程。簡寫裡第一個時間仍是持續時間，第二個時間才是延遲。

| 屬性 | 這一頁怎麼用 |
| --- | --- |
| `animation-name` | `pulse`、`spin`、`enter`，要和 `@keyframes` 同名 |
| `animation-duration` | 圓環 `0.7s`，進場 `0.7s`，標籤 `1.6s` |
| `animation-timing-function` | 標籤 `ease-in-out`，圓環 `linear` |
| `animation-iteration-count` | 標籤與圓環是 `infinite`，進場省略就是 `1` 次 |
| `animation-direction` | 預設 `normal`。`alternate` 會去程播完再倒著播 |
| `animation-fill-mode` | 進場用 `both`：延遲期間先套第一格，結束停在最後一格 |
| `animation-play-state` | 指標停在圓環上時設 `paused` |

熱賣那條的簡寫是 `animation: pulse 1.6s ease-in-out infinite`。進場故意拆開長屬性，方便在 **Styles** 裡逐條對。`fill-mode: both` 讓卡片在動畫開始前就是透明並稍微下移，結束後留在不透明的位置。預設 `none` 會在播完的瞬間跳回元素自己的樣式；這張卡的靜止樣式本來就是不透明，差別不大，但若靜止時沒寫 `opacity: 1`，沒有 `forwards` 或 `both` 就會閃回。

`@keyframes spin` 只寫了 `to { transform: rotate(360deg); }`。起點用元素當下的變形（沒有寫就是 0 度）。圓環用邊框顏色做出缺口，本身沒有文字；`role="img"` 與 `aria-label` 讓它有名字。純裝飾的動畫不要拿去傳達「必讀」的訊息。

系統開啟「減少動態」時，`@media (prefers-reduced-motion: reduce)` 把這三個 `animation` 設成 `none`。前庭、平衡感較敏感的人會開這個選項。循環的縮放與旋轉最應該讓步；進場淡入也一併關掉，頁面仍可讀。開發者工具可以模擬這個偏好，不用改作業系統。

{% note warning %}
**注意事項**
無限循環的大面積動畫很耗電，也會讓人忽略真正要點的按鈕。一個狀態用一兩個小元素即可。不要為了舊文章裡的「硬體加速」去加 `translateZ(0)` 或廠商前綴。
{% endnote %}

# 認識媒體查詢

響應式網頁（responsive web design，RWD）是同一份 HTML，依畫面寬度改排版，而不是做一個手機站、一個桌機站。流動的部分在前三部分已經有了：`max-width`、`min()`、Flex 的 `wrap`、Grid 的 `auto-fit` 與 `minmax`。那些能自己換行、自己決定欄數。媒體查詢（media query）留給**結構要變**的時候：導覽從橫排改成直排、側欄挪到主文旁邊。點左邊「查詢」（`pages/22_rwd.html`）。

視窗寬度來自 `width` 這個媒體特性。文件的 `<meta name="viewport" content="width=device-width, initial-scale=1.0">` 讓手機用裝置寬度當視窗，而不是用一顆桌機寬度再縮小。這一行第二天就寫在每一頁的 `head`，拿掉之後手機常把整頁縮成一小條。

{% mermaid graph TD %}
B["預設：單欄、導覽橫排"] --> M["min-width: 32rem<br/>卡片改兩欄"]
M --> W["min-width: 48rem<br/>導覽變側欄"]
{% endmermaid %}

## 流動版面先做完

先讓窄畫面就讀得完，再往寬的加規則。`22_rwd.html` 預設是一欄：頁首、導覽、行程、行前提示依原始碼由上到下。導覽用 Flex 橫向換行。卡片的欄數放在 `--cols`，預設 `1fr`。圖片若之後加進來，仍給 `max-width: 100%`，避免比父層更寬。

能用 `repeat(auto-fit, minmax(12rem, 1fr))` 解決的卡片牆，不必再為 700px、800px 各寫一條查詢。第三部分的卡片牆就是這種。查詢是欄數算法不夠用、或導覽與主文的**位置關係**要改時才加。

字級繼續用 `rem`。第一部分看過 `4vw` 會在窄視窗小到不能讀。內文不要改跟視窗寬度跑。標題若要略為伸縮，再用 `clamp()`，斷點不要拿來只改 1px 的字級。

{% note info %}
**小技巧：斷點跟著內容**
把視窗慢慢拉寬，在「導覽擠成兩行」或「一行只剩一個字」的地方設斷點。手機 390、平板 768、桌機 1200 只是常見寬度的參考，不是每站都要抄這三個數字。
{% endnote %}

## 斷點由窄到寬

`@media (min-width: 32rem)` 的意思是：視窗寬度**大於等於** 32rem 時，括號裡的規則才加入層疊。查詢裡的 `rem` 相對瀏覽器預設字級（通常 16px），不受你寫在 `html` 上的 `font-size` 影響。32rem 大約是 512px，48rem 大約是 768px。

這一頁由小到大寫了兩段：

| 視窗 | 畫面上的句子 | 發生的事 |
| --- | --- | --- |
| 小於 32rem | 單欄，導覽橫排 | 只有預設樣式 |
| 32rem 以上 | 卡片兩欄 | `--cols` 改成 `1fr 1fr` |
| 48rem 以上 | 側欄版面 | 兩欄骨架，導覽改直向，行前區到右側 |

兩段 `min-width` 在寬視窗會**同時成立**。它們的選擇器權重一樣，寫在後面的那段蓋過前面。所以 48rem 那段的 `.now::after` 會蓋過 32rem 那段。斷點由小到大往下寫，寬畫面的規則放後面。

側欄用的是第三部分的區域名字：

```css
grid-template-areas:
  "head head"
  "nav main"
  "nav side";
```

窄畫面不要套這組名字，區塊就照原始碼堆疊。原始碼把 `<aside>` 放在主文後面，窄螢幕先讀行程、再讀行前，這個順序是合理的。不要為了讓側欄在手機上排到中間，就去改原始碼順序或使用 `order`。

`max-width` 是「小於等於」。桌面樣式先寫、再用 `max-width` 往回改，中間的寬度容易漏。課堂以 `min-width` 為主。兩個條件都要成立時用 `and`：`@media (min-width: 48rem) and (orientation: landscape)`。只要其中一個成立，用逗號：`@media (max-width: 32rem), print`。

`screen`、`print`、`all` 是媒體類型。特性條件前面省略類型時，等於 `all`。課堂把查詢寫在同一份 `<style>` 裡。`<link media="print">` 可以另掛一張只給列印的表；`@import` 仍避免，第一部分說過它會拖慢載入。

{% note success %}
**跟著做**
點「查詢」。慢慢把瀏覽器拉窄，或按 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>）打開裝置工具列，選一顆手機寬度。頁首那句話應從「側欄版面」變成「單欄，導覽橫排」。再拉寬，確認句子與欄數一起變。
{% endnote %}

{% note warning %}
**注意事項**
查詢看的是視窗，不是裝置型號。把桌機視窗拉窄，就該看到窄版。不要用使用者代理字串去猜手機。`max-device-width` 是舊特性，新頁面用 `width`。
{% endnote %}

## 列印與偏好

`@media print` 裡把導覽、斷點說明、行前欄設成 `display: none`，底色改白、字改黑。列印預覽按 <kbd>Ctrl</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>P</kbd>），看完關掉即可。依賴底色才能看懂的資訊，列印時要改成字或邊框。連結若需要在紙上留下網址，才另外用 `a[href]::after { content: " (" attr(href) ")"; }`，課堂這頁的錨點不必印。

偏好類特性描述的是人，不是寬度：

| 特性 | 何時成立 |
| --- | --- |
| `prefers-color-scheme: dark` | 系統用深色外觀。`18_vars.html` 用它覆寫代幣 |
| `prefers-reduced-motion: reduce` | 系統要求減少動態。`21_animation.html` 用它關掉動畫 |
| `hover: hover` | 主要輸入可以懸停。轉場那頁才抬起卡片 |
| `pointer: fine` | 有細指標，例如滑鼠 |

這些查詢和寬度查詢一樣參加層疊。深色規則只改 `--ink`、`--paper`，不要複製一整份元件樣式。下一章用面板模擬它們。

# 用開發者工具對樣式

樣式沒有出現時，先分清楚是選錯節點、規則沒打中、被另一條蓋過，還是值本身無效。Chrome 按 <kbd>F12</kbd>，主畫面用 **Elements**。示範頁在 iframe 裡時，要展開 iframe，選到**裡面那份文件**的節點；選到外層的 `<iframe>` 只會看到外框的行內寬高。點左邊「除錯」（`pages/23_inspect.html`），下面三節都對這一張票，也回頭看前幾頁。

{% note primary %}
**素材準備**
Live Server 仍開著 `css/index.html`。以下面板名稱以 Chrome 英文介面為準：**Elements**、**Styles**、**Computed**、**Layout**。
{% endnote %}

## Styles 與 Computed

選中 `<article id="featured" class="ticket">`。**Styles** 列出打到它的規則，上面的蓋過下面的。你應看到：

| 你看到的 | 原因 |
| --- | --- |
| `.ticket` 裡第一個 `color: #94a3b8` 有刪除線 | 同規則後面又寫了 `color` |
| `colour: red` 旁邊有警告、被劃掉 | 屬性名稱拼錯，整條宣告丟掉 |
| `#featured { color: #9f1239 }` 沒有刪除線 | id 欄比 class 欄重，字色是玫瑰紅 |
| `background: var(--paper)` 可展開變數 | 代幣定義在 `:root` |

**Computed** 是算完層疊、繼承、變數之後的最終值。點 `color`，右側會寫這個值從哪一條規則來。`.bad` 那種「變數型別不合」要在這裡看：最終字色是繼承來的，不是 `1rem`。

改動只活在這一次重新整理之前。在 **Styles** 直接改 `--ink` 或取消勾選某條宣告，用來試驗；確定之後再寫回檔案。頁面上新增節點用 **Elements** 左上的 `+` 不一定需要，課堂以對照樣式為主。

使用者代理樣式（user agent stylesheet）是瀏覽器預設表。票卡上的標題若比內文粗，而你沒寫 `font-weight`，Computed 會指向這一層。它比你的作者樣式弱。

{% note success %}
**跟著做**
在 **Styles** 取消勾選 `#featured` 的 `color`。票卡字色應落到 `var(--ink)` 的深青綠。勾回去，玫瑰紅回來。接著點 `var(--ink)`，確認它跳到 `:root`。
{% endnote %}

## 盒子、狀態與斷點

選中 `.ticket` 時，**Styles** 下方（或 **Computed** 裡）有盒子圖：content、padding、border、margin。這頁是 `border-box`，圖上的寬度 18rem 已經含左右 padding 與左右邊框。margin 是圖最外圈的 `1.5rem 0`，它在元素外面，不占那 18rem。和第二部分用盒子圖對 `content-box` 的方式相同。

**Styles** 面板的 **:hov** 可以強制狀態，不必真的把指標放上去。勾 `:hover` 看 `20_transition.html` 的按鈕，勾 `:focus-visible` 看外框。`:hover` 規則若寫在 `@media (hover: hover)` 裡面，而這台裝置的查詢不成立，光勾 :hov 也不會套用；桌機滑鼠通常成立。

`:hov` 旁邊的 **Force element state** 只影響你選的那個節點。要改整份文件的媒體特性，打開命令選單：<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>），輸入 `Rendering`，選 **Show Rendering**。在裡面可以：

- **Emulate CSS media feature prefers-color-scheme** 設成 `dark`，再看 `18_vars.html` 的代幣
- **Emulate CSS media feature prefers-reduced-motion** 設成 `reduce`，`21_animation.html` 的縮放與圓環應停住
- **Emulate CSS prefers-color-scheme** 測完記得改回 No emulation，避免下一頁被你忘了的模擬騙過

裝置工具列（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>）改的是視窗寬高，用來走 `22_rwd.html` 的斷點。工具列上的寬度是整顆瀏覽器視窗時，iframe 還要再扣掉左邊 12rem 的選單，所以「設 800」時右欄可能仍低於 48rem。不確定時看頁首那句話，它跟查詢是同一組條件。

Flex 與 Grid 的徽章在第三部分用過：節點旁的 **flex** 或 **grid** 會畫出主軸或格線。查詢頁的 `.layout` 在寬畫面是 grid，窄畫面也是 grid（只是一欄）。徽章兩邊都點得開。

## 動畫面板

命令選單輸入 `Animations`，選 **Show Animations**。打開之後再重新整理 `21_animation.html`，進場與循環會出現在面板的時間軸上。把時間軸上的圓點拖慢，可以看出 `pulse` 在 50% 放到最大。圓環是無限次，軸上會重複。

這個面板用來確認「有沒有在播」，不能取代樣式表。預覽完把模擬與慢動作清掉再重新整理。**Network** 仍負責檔案沒載入；**Console** 在純 CSS 這一天通常是安靜的，拼錯的屬性不會在那裡報錯，只會出現在 **Styles**。

{% note warning %}
**注意事項**
在面板裡改規則不會寫回磁碟。Live Server 重新整理後，實驗就沒了。要留的修改寫進 `pages/` 的 `<style>`。
{% endnote %}

# 選讀：立體、容器與可補間的變數

這一節可以整節跳過。立體翻面、容器查詢、把自訂屬性註冊成顏色，都是上面六頁的延伸。不新增 `pages/` 檔。跳過不影響左邊的選單。

{% note info %}
**選讀就好**
下面的片段可另存空檔自己開，或只看程式碼。
{% endnote %}

## 立體翻面

平面的 `rotate` 看不出厚度。要翻面，父層給一個視距 `perspective`，卡片轉 Y 軸，背面用 `backface-visibility: hidden` 藏起來。正面與背面疊在同一個格子，`position: relative` 的父層配 `absolute` 的兩面。

```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <title>翻面</title>
    <style>
      body {
        margin: 2rem;
        font-family: system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif;
      }

      .scene {
        width: 14rem;
        height: 8rem;
        perspective: 40rem;
      }

      .card {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 500ms ease;
        transform-style: preserve-3d;
      }

      .scene:hover .card,
      .scene:focus-within .card {
        transform: rotateY(180deg);
      }

      .face {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.75rem;
        backface-visibility: hidden;
      }

      .front {
        background: #0f766e;
        color: #f0fdfa;
      }

      .back {
        background: #134e4a;
        color: #f0fdfa;
        transform: rotateY(180deg);
      }
    </style>
  </head>
  <body>
    <div class="scene" tabindex="0">
      <div class="card">
        <div class="face front">京都</div>
        <div class="face back">清水寺清晨</div>
      </div>
    </div>
  </body>
</html>
```

`transform-style: preserve-3d` 讓子元素留在同一個 3D 空間，翻過去才看得到背面。背面先轉 180 度，父層再轉 180 度時它才正對你。`tabindex="0"` 讓鍵盤也能聚焦，`focus-within` 跟 `:hover` 做同一件事。這是效果，不是導覽本體；背面的文字若是必要資訊，不要只放在翻面之後。

## 容器查詢

媒體查詢看視窗。同一張卡片放在窄側欄與寬主文時，視窗寬度相同，卡片該不該橫排卻不該相同。容器查詢（container query）看的是祖先的寬度。

```css
.slot {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 0.5rem;
}

@container (min-width: 22rem) {
  .card {
    grid-template-columns: 6rem 1fr;
  }
}
```

```html
<div class="slot">
  <article class="card">
    <div class="photo"></div>
    <p>側欄很窄時仍是直向；這格變寬才改成圖在左。</p>
  </article>
</div>
```

`container-type: inline-size` 把這一層標成查詢容器。`@container` 裡的規則看這個容器的內容寬度，不看視窗。全站的頁首、側欄仍用視窗查詢。卡片要依「所在的欄有多寬」換排版時才用容器。名字可以寫 `container-name`，一頁有多個容器時再加，避免查到外面那層。

## 把變數註冊成可補間

一般的自訂屬性是一串符號。你寫 `transition: --brand 300ms` 時，瀏覽器不知道它是顏色，切換會瞬間跳過去。要讓顏色代幣可以補間，用 `@property` 註冊語法、繼承與初始值。

```css
@property --brand {
  syntax: "<color>";
  inherits: true;
  initial-value: #0f766e;
}

.go {
  background: var(--brand);
  transition: --brand 300ms ease;
}

.theme:hover {
  --brand: #9f1239;
}
```

沒有註冊之前，仍請直接轉場 `background-color`，像 `20_transition.html` 那樣。`@property` 的 `syntax` 寫錯時，整組註冊無效。`initial-value` 在語法要求下一定要有。這是進階工具，全站代幣用覆寫 `--brand` 就夠。

`100vh` 在手機上常把網址列也算進去，區塊會比可見區域高一截。需要跟「此刻看得到的高度」走時，用 `100dvh`（dynamic viewport）。頁首固定、主文至少一屏這種需求才用得到，一般區塊繼續讓內容把高度撐開。

# 第四部分重點回顧

自訂屬性以 `--` 宣告、用 `var()` 取用，會繼承。全站代幣放在 `:root`，區塊要換膚就在該元素覆寫同名變數。`var(--name, 備援)` 只在名字沒定義時使用。變數的值型別不合時，那條宣告在計算階段作廢，字色等可繼承的屬性改走繼承，不會退回同一條規則裡前一個色碼。

`transform` 不改變排版佔位。常用函式是 `translate`、`scale`、`rotate`，原點用 `transform-origin`。同一條裡右邊的函式先套用。只補間位移時可用獨立屬性 `translate`，避免把 `rotate` 清掉。

`transition` 連接兩個狀態，簡寫是屬性、時間、曲線、延遲。逐條列出要動的屬性。懸停效果包在 `(hover: hover) and (pointer: fine)`，鍵盤用 `:focus-visible`。`@keyframes` 加上 `animation` 才會自己播；沒寫持續時間就等於 0 秒。循環用 `infinite`，結束要停在最後一格用 `forwards` 或 `both`。`prefers-reduced-motion: reduce` 時把裝飾動畫關掉。

RWD 先做流動版面（換行、`fr`、`minmax`、`max-width: 100%`），媒體查詢只改結構。以窄畫面為預設，`min-width` 由小到大往下寫，同時成立時後面蓋過前面。查詢看視窗；在這套示範站裡，視窗是右欄 iframe。`print` 拿掉導覽並改成白底黑字。`prefers-color-scheme` 只換代幣。

除錯用 Chrome 的 **Elements**。**Styles** 看刪除線與無效宣告，**Computed** 看最終值，盒子圖對 padding 與 border。`:hov` 強制懸停與焦點，**Rendering** 模擬深色與減少動態，裝置工具列走斷點。**Animations** 看關鍵影格有沒有在播。面板裡的修改重新整理就沒了。

## 四個部分合起來

這一篇的 CSS 是同一套示範站累加上去的。第一部分決定規則打到誰：選擇器、權重、繼承、單位、顏色、文字與背景。第二部分決定盒子多大、距離多遠、`display` 怎麼參加排版，以及 `relative`／`absolute`／`sticky` 與 `z-index`。第三部分才做欄與列：一個方向用 Flex，兩個方向用 Grid，`gap` 管縫，`auto-fit` 與 `minmax` 讓卡片自己換欄。

第四部分把重複的色與間距收成代幣，讓互動有轉場與少量動畫，並在結構要變時寫媒體查詢。float 多欄與廠商前綴留在舊碼裡認識即可。對得上的時候，畫面與 **Styles** 的最終值是同一件事：選錯 iframe 裡的節點、路徑 404、或變數型別不合，都會讓「我明明有寫」對不上眼睛看到的結果。
