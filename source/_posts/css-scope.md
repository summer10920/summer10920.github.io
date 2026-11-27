---
title: 'CSS：用 @scope 把元件樣式關進子樹，告別過寬選擇器'
categories:
  - 前端
  - HTML/CSS
tag:
  - CSS
date: 2026-11-27 21:12:00
---

![](assets/images/banner/css.png)

最能看出 `@scope` 價值的情境，是元件有外殼、又有插槽：外殼的圖要有樣式，插槽裡別人的圖不能被誤傷。閱讀順序：痛點 → `@scope` 畫範圍 → `:scope`（先純用、再接 `@scope`）→ 層疊 → 跟其他方案怎麼選 → 瀏覽器支援 → 專有名詞。

<!-- more -->

# 為什麼會需要「範圍」

本章回答：什麼情境下，子孫選擇器會不夠用、而 `@scope` 的優勢看得見。產品卡片外殼有頭像、封面、工具列圖示；`.card__body` 是 CMS 灌進來的插槽（figure、第三方 embed）。需求：外殼的圖統一加邊框，插槽裡的圖一張都不要動。

```html page.html
<body>
  <header class="site-header">
    <a class="site-logo" href="/">
      <img src="/assets/logo.svg" width="120" height="32" alt="站台" />
    </a>
  </header>

  <main>
    <article class="card" data-product-id="1082">
      <header class="card__header">
        <a class="card__author" href="/u/loki">
          <img
            class="card__avatar"
            src="/avatars/loki.webp"
            width="40"
            height="40"
            alt=""
          />
          <span class="card__author-name">Loki</span>
        </a>
        <time datetime="2026-11-27">2026-11-27</time>
      </header>

      <div class="card__media">
        <picture>
          <source
            type="image/avif"
            srcset="/products/1082.avif 1x, /products/1082@2x.avif 2x"
          />
          <img
            class="card__cover"
            src="/products/1082.jpg"
            width="640"
            height="360"
            alt="產品封面：機械鍵盤"
          />
        </picture>
      </div>

      <div class="card__toolbar">
        <h2 class="card__title">HHKB 配列心得</h2>
        <button type="button" class="card__action" aria-label="收藏">
          <img src="/icons/bookmark.svg" width="20" height="20" alt="" />
        </button>
        <button type="button" class="card__action" aria-label="分享">
          <img src="/icons/share.svg" width="20" height="20" alt="" />
        </button>
      </div>

      <!-- 插槽：內容所有權不在卡片外殼 -->
      <div class="card__body prose">
        <p>這週把配列調成……</p>
        <figure>
          <img
            src="/uploads/layout-chart.png"
            width="480"
            height="280"
            alt="鍵位熱力圖"
          />
          <figcaption>實際敲擊分布</figcaption>
        </figure>
        <div class="embed-widget" data-vendor="chart-kit">
          <img src="/embeds/chart-kit/preview.png" alt="第三方圖表預覽" />
        </div>
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <img src="/assets/badge.svg" width="64" height="64" alt="" />
  </footer>
</body>
```

子孫選擇器會卡住：

```css card-shell.css
/* 錯：外殼有框，插槽圖表／embed 也被框 */
.card img {
  border: 2px solid seagreen;
}

/* 勉強對，但路徑枚舉——結構一重構就要改 */
.card__header img,
.card__media img,
.card__toolbar img {
  border: 2px solid seagreen;
}
```

`@scope` 加上下界，語意是「從 `.card` 起算，碰到 `.card__body` 就停」：

```css card-shell.css
@scope (.card) to (.card__body) {
  img {
    border: 2px solid seagreen;
  }
}
```

- header／footer 的圖：不在 `.card` → 不中
- 頭像、封面、工具列圖示：root 與 limit 之間 → 中
- `.card__body` 裡的圖：limit 子樹 → 不中

{% mermaid graph TB %}
P["body"]
P --> H[".site-header img<br/>✗ 未選中"]
P --> C[".card<br/>scope root"]
P --> F[".site-footer img<br/>✗ 未選中"]
C --> AH[".card__header<br/>avatar ✓ 選中"]
C --> M[".card__media<br/>cover ✓ 選中"]
C --> T[".card__toolbar<br/>icons ✓ 選中"]
C --> CB[".card__body<br/>scope limit"]
CB --> FIG["figure / embed img<br/>✗ 插槽未選中"]

classDef root fill:#cfe2ff,stroke:#084298,color:#084298
classDef hit fill:#d1e7dd,stroke:#0f5132,color:#0f5132
classDef limit fill:#fff3cd,stroke:#997404,color:#664d03
classDef miss fill:#f8d7da,stroke:#842029,color:#842029
classDef base fill:#f8f9fa,stroke:#6c757d,color:#343a40

class P base
class C root
class AH,M,T hit
class CB limit
class H,F,FIG miss
{% endmermaid %}

這就是相對 `.card img` 的優勢：能表達「外殼有、插槽無」。BEM、CSS Modules、Shadow DOM 也能處理「樣式別亂滲」，但痛點不同——文末再對位。規格：`@scope` 在 [Cascade Level 6](https://www.w3.org/TR/css-cascade-6/)，`:scope` 在 [Selectors Level 4](https://www.w3.org/TR/selectors-4/#the-scope-pseudo)。

# `@scope` 語法：從哪裡開始、到哪裡停止

本章只拆語法：把上一節的 `@scope (.card) to (.card__body)` 講成上界、下界與常見寫法。名字很像的 `:scope` 偽類下一章才講。

## 上界：規則只能待在這棵子樹

括號裡第一個選擇器是 scope root（上界，含）。沒有 `to` 時，可打到 root 底下所有子孫：

```css card.css
@scope (.card) {
  img {
    border: 2px solid seagreen;
  }
}
```

對開場 HTML，頭像／封面／工具列**與**插槽圖都會中——匹配範圍跟 `.card img` 相同。開場「插槽不要中」單靠上界做不到；跟 `.card img` 的權重差異見「層疊」章。

## 下界：挖空插槽（donut scope）

`to (...)` 是 scope limit。上界 inclusive、下界 exclusive：從 root 往下，碰到 limit（含子孫）就停，中間挖空，故稱 donut。開場那行 CSS 用的就是它；對照同一份 `page.html`：

- ✓ `card__avatar`／`card__cover`／toolbar 圖示（在 root～limit 之間，即使隔了 `picture`）
- ✗ `card__body` 裡的 figure／embed（limit 子樹）

微調邊界可寫：

- `@scope (.card) to (.card__body > *)`：下界改 inclusive
- `@scope (.card > *) to (.card__body)`：上界改 exclusive

{% note warning %}
**限制的是「選不選得到」，不是繼承**
`color`、`font-family` 仍會穿過 limit。要硬邊界才需要 Shadow DOM（或自己切斷繼承）。
{% endnote %}

## 選擇器清單與內嵌 `<style>`

root／limit 可寫清單。hero 與正文都處理插圖、但 `figure` 自行負責時：

```css article.css
@scope (.article-hero, .article-body) to (figure) {
  img {
    outline: 3px solid goldenrod;
  }
}
```

也可把無 prelude 的 `@scope` 寫在元件根的 `<style>` 裡，自動以父元素當 root：

```html product-card.html
<article class="card">
  <style>
    @scope to (.card__body) {
      img {
        border: 2px solid seagreen;
      }
    }
  </style>
  <!-- 結構同開場 .card -->
</article>
```

# `:scope`：點名「當下的參照根」

`:scope` 是 Selectors 的偽類，比 `@scope` at-rule **更早**出現，也不依賴它。意思是：「把這次匹配的參照起點選出來。」起點由脈絡決定。這一章先看不靠 `@scope` 的**純用法**，再接到元件樣式裡怎麼用。

## 純用一：DOM API 查「相對於我」的節點

這是日常最有感的純 `:scope`。從某個已拿到的元素往下查時，選擇器字串需要一個「我」當起點——尤其是直接子代：

```html toolbar.html
<div class="card__toolbar" id="toolbar">
  <h2 class="card__title">HHKB 配列心得</h2>
  <button type="button" class="card__action" aria-label="收藏">
    <img src="/icons/bookmark.svg" alt="" />
  </button>
  <button type="button" class="card__action" aria-label="分享">
    <img src="/icons/share.svg" alt="" />
  </button>
</div>
```

```js toolbar.js
const toolbar = document.getElementById('toolbar');

// 子孫中所有 .card__action（這裡剛好都在一層）
toolbar.querySelectorAll('.card__action');

// 明確：只要 toolbar「自己的直接子代」
toolbar.querySelectorAll(':scope > .card__action');

// 只有 > 沒有左側參照時，語意不穩／易失效
// toolbar.querySelectorAll('> .card__action');
```

這裡的 `:scope` 就是 `toolbar` 這個元素。`matches`、`closest` 同樣吃這套。和 CSS 檔、`@scope` at-rule 都無關——純瀏覽器選取 API。

## 純用二：樣式表最外層 ≈ `:root`

沒包在任何 `@scope` 裡、寫在樣式表頂層時，參照起點是整份文件的根：

```css top-level.css
:scope {
  /* 在 HTML 文件等同 :root，選中 <html> */
  color-scheme: light dark;
}
```

實務上直接寫 `:root` 居多；重點是建立心智模型——`:scope` 永遠指「當下參照根」，不是某個叫 scope 的 class。

## 接到 `@scope`：選中範圍根本身

有了「參照根」的概念，看 `@scope` 就很順。at-rule 畫好地盤後，區塊裡的 `img` 選的是子孫；要樣式化 **root 那個元素自己**，就把參照根寫成 `:scope`：

```css card-root.css
@scope (.card) to (.card__body) {
  :scope {
    /* → <article class="card"> 自己 */
    display: grid;
    gap: 0.75rem;
    border: 1px solid #d0d0d0;
    border-radius: 12px;
    padding: 1rem;
  }

  img {
    /* → limit 前的子孫 img */
    border: 2px solid seagreen;
  }

  .card__action {
    inline-size: 2.5rem;
    block-size: 2.5rem;
  }
}
```

- `@scope (.card)` 的 `.card`：只負責「地盤從哪起算」
- 區塊內的 `:scope`：點名那個 root
- 區塊內再寫 `.card`：語意是「範圍內任何 `.card`」，不是「請選這個 root」

limit 也可寫相對關係，例如 `@scope (.card) to (:scope > .card__body)`。`:scope + p` 選兄弟無效——兄弟不在子樹裡。

彙整：JS／頂層樣式表裡，`:scope` 本來就能用；進了 `@scope` 區塊，它剛好指向你畫的那塊地盤的根。

# 層疊：權重怎麼算、同權重誰贏

`@scope` 也改 cascade 怎麼決勝：先算 specificity，數字相同再看 proximity。

## 與 `.card img` 比

```css weight-compare.css
/* (0, 1, 1)——class + 元素 */
.card img {
  border: 2px solid seagreen;
}

@scope (.card) {
  img {
    border: 2px solid seagreen;
  }
  /* 這條是 (0, 0, 1)：prelude 的 .card 不計入 */
}
```

匹配節點可以相同，但 `@scope` 這條較好被蓋過。prelude 再複雜也不像 Nesting 那樣把外層權重累加進內部。

## 區塊裡三種寫法

裸選擇器與 `&` 像加了 `:where(:scope)`（有範圍、權重 +0）；寫出的 `:scope` 是偽類，帶 `(0, 1, 0)`。

```css scope-specificity.css
@scope (.card) {
  img {
    /* (0, 0, 1) */
  }
  & img {
    /* (0, 0, 1) */
  }
  :scope img {
    /* (0, 1, 1) */
  }
  :scope {
    /* 只選 root → (0, 1, 0) */
  }
}
```

預設用裸 `img`；要抬權重或鎖 root 再寫 `:scope`。

{% note info %}
**相容性：nesting 的 &**
規格上應等同 `:where(:scope)`，引擎曾不一致。權重必須穩時，寧可寫裸選擇器或 `:scope`。
{% endnote %}

## 同權重時：離 scope root 近的贏

兩個 `@scope` 都命中、specificity 又相同時，多一階 **scope proximity**：離自己的 root 近的勝出（壓過 source order，仍低於 importance／layers／specificity）。

```html themes.html
<aside class="theme-panel light-theme">
  <p>淺色面板</p>
  <section class="theme-panel dark-theme">
    <p>嵌在淺色裡的深色區塊</p>
    <blockquote class="theme-panel light-theme">
      <p>最內層應跟最近的 light-theme</p>
    </blockquote>
  </section>
</aside>
```

```css themes-bad.css
.light-theme p { color: black; }
.dark-theme p { color: white; } /* 後寫，最內層會錯成白字 */
```

```css themes-good.css
@scope (.light-theme) {
  :scope { background: #ddd; }
  p { color: black; }
}
@scope (.dark-theme) {
  :scope { background: #333; }
  p { color: white; }
}
```

最內層 `p` 到 light 一階、到 dark 兩階，proximity 讓淺色勝出。

{% mermaid graph TB %}
A["Importance / Layer"] --> B["Specificity"]
B --> C["Scope proximity"]
C --> D["Source order"]
{% endmermaid %}

# 定位：跟 BEM、CSS Modules、Shadow DOM 怎麼選

本章把 `@scope` 放回工具箱：先分開三種痛點，再各自講清 BEM／Modules／Shadow 是什麼，最後才談怎麼選。`@scope` 不是取代品。

- **名字會不會撞** → BEM／CSS Modules
- **規則會不會打太遠** → `@scope`（尤其 donut）
- **外面會不會打進來／裡面會不會漏出去** → Shadow DOM

## BEM：命名約定（不是瀏覽器功能）

BEM 全名 Block Element Modifier：用 class 名寫出「哪個元件／哪個零件／哪種變體」。雙底線是 Element（`.card__title`），雙連字號是 Modifier（`.card--featured`）。瀏覽器不強制，靠團隊紀律。

沒用 BEM、短 class 共用時：

```html without-bem.html
<article class="card">
  <img class="cover" src="/products/1082.jpg" alt="封面" />
  <h2 class="title">HHKB 配列心得</h2>
  <div class="body">
    <img class="cover" src="/uploads/layout-chart.png" alt="熱力圖" />
  </div>
</article>
<section class="promo">
  <h2 class="title">本週特價</h2>
  <img class="cover" src="/promo/banner.jpg" alt="橫幅" />
</section>
```

```css without-bem.css
.cover { border: 2px solid seagreen; } /* card 與 promo 全中 */
```

改成 BEM：每個鉤子帶所屬 block；插槽用另一個 block，不要再掛 `card__*`。

```html card-bem.html
<article class="card card--featured">
  <header class="card__header">
    <img class="card__avatar" src="/avatars/loki.webp" alt="" />
  </header>
  <div class="card__media">
    <img
      class="card__cover card__cover--large"
      src="/products/1082.jpg"
      alt="產品封面"
    />
  </div>
  <div class="card__toolbar">
    <h2 class="card__title">HHKB 配列心得</h2>
    <button type="button" class="card__action" aria-label="收藏">
      <img class="card__action-icon" src="/icons/bookmark.svg" alt="" />
    </button>
  </div>
  <div class="card__body">
    <figure class="figure">
      <img class="figure__img" src="/uploads/layout-chart.png" alt="熱力圖" />
      <figcaption class="figure__caption">實際敲擊分布</figcaption>
    </figure>
  </div>
</article>
<section class="promo">
  <h2 class="promo__title">本週特價</h2>
  <img class="promo__cover" src="/promo/banner.jpg" alt="橫幅" />
</section>
```

```css card-bem.css
.card__avatar,
.card__cover,
.card__action-icon {
  border: 2px solid seagreen;
}
.card__cover--large {
  inline-size: 100%;
  object-fit: cover;
}
.figure__img {
  border: none;
}
.promo__cover {
  border: 2px solid tomato;
}
```

隔離來自「名字夠獨特」，不是 DOM 範圍——偷懶寫 `.card img` 仍會打到插槽。`@scope` 常拿來減輕「枚舉一堆 `card__*`」的成本；對外 API 仍可用 `.card`／`.card__body`。

## CSS Modules：建置工具自動改名

不是 CSS 語言新語法，而是打包工具（Vite／Webpack 等）在**建置時**改名。你在模組檔寫短 class，編譯後變成帶雜湊的唯一名，JS 再對回同一個字串——解的是檔案間撞名，不是 DOM 子樹範圍。

```css card.module.css
.title { font-size: 1.25rem; }
.cover { border: 2px solid seagreen; }
```

```js Card.jsx
import styles from './card.module.css';

export function Card() {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>HHKB 配列心得</h2>
      <img className={styles.cover} src="/products/1082.jpg" alt="封面" />
    </article>
  );
}
```

輸出可能是 `card_title_a3f2`、`card_cover_9k2b`；另一個 `Header.module.css` 也可以有自己的 `.title` 而不撞車。它沒有 donut 語意，也不擋模組裡寫 `.card img` 打太寬。可與 `@scope` 並用：Modules 管命名，`@scope` 管殼／槽。

## Shadow DOM：瀏覽器原生的雙向邊界

先講層級，避免跟框架搞混：

- **瀏覽器原生 API**（Web Platform），不是 React／Vue／Angular 功能
- 不必 npm／編譯；普通 `.html` + `attachShadow` 即可
- 常搭配原生 Web Components（`customElements`）
- 框架可以在底層用它，但「Shadow DOM」指的仍是瀏覽器機制

BEM／Modules 靠改名；`@scope` 限制「自己的規則」能打多遠。Shadow 則跟瀏覽器說：宿主裡這棵小樹，**對外來選擇器預設隱形**。

```html light-dom.html
<style>
  img { border: 2px solid red; }
</style>
<article class="card">
  <img class="cover" src="/products/1082.jpg" alt="封面" />
  <!-- 一定被全站 img 規則打到 -->
</article>
```

```html with-shadow.html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <title>Shadow DOM 示意</title>
  <style>
    img { border: 2px solid red; }
  </style>
</head>
<body>
  <product-card></product-card>
  <script>
    class ProductCard extends HTMLElement {
      connectedCallback() {
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = `
          <style>
            .cover {
              border: 2px solid seagreen;
              inline-size: 100%;
            }
          </style>
          <img class="cover" src="/products/1082.jpg" alt="封面" />
        `;
      }
    }
    customElements.define('product-card', ProductCard);
  </script>
</body>
</html>
```

頁面紅框打不進影子裡的封面；影子裡的綠框也漏不出去。在 Chrome DevTools 的 Elements 面板展開 `<product-card>`，會看到 `#shadow-root`——那就是這道邊界。

{% mermaid graph TB %}
Page["頁面 Light DOM"]
Page --> Host["product-card 宿主"]
Page --> Global["全域 img 規則<br/>打不進影子"]
Host --> SR["#shadow-root"]
SR --> Cover["img.cover<br/>只吃影子內 CSS"]

classDef out fill:#f8d7da,stroke:#842029,color:#842029
classDef in fill:#d1e7dd,stroke:#0f5132,color:#0f5132
classDef host fill:#cfe2ff,stroke:#084298,color:#084298
class Global out
class Host host
class Cover in
{% endmermaid %}

和 `@scope` 差在「防誰」：

- `@scope`：我的規則別打太遠；外面的 `img { border: red }` 仍可打進普通 `.card`
- Shadow DOM：外面別打進來、裡面別漏出去

繼承（`color` 等）與 CSS 變數仍可能傳入；`::part`／`<slot>` 是刻意開洞。代價是元件模型與主題策略都要另做，常見於設計系統／播放器殼，不是每個 `div.card` 都該上。

## 怎麼選

- 短 class、有打包 → **CSS Modules**（或嚴格 BEM）
- 殼／槽要切開、不想枚舉路徑 → `@scope … to (…)`
- 巢狀主題要「近的贏」→ `@scope` 的 proximity
- 必須擋全站 CSS 穿透 → Shadow DOM
- 無建置、只想少寫長選擇器 → 先評估 `@scope`，支援度不夠再退 BEM

不要期待：`@scope` ≠ Shadow 封裝；Modules ≠ 自動 donut；也不必為了新語法拆掉已穩定的命名層。

# 瀏覽器支援

本章收支援度與官方入口，方便日後回查要不要上正式專案。

{% caniuse css-cascade-scope %}

`@scope` at-rule：Chromium 118+、Safari 17.4+；Firefox 146+；2026 已 Baseline Newly available。舊版企業瀏覽器仍可能要備援（BEM 清單或建置策略）。

`:scope` 偽類本身則早已 Widely available；就算暫時不用 `@scope`，在 `querySelectorAll(':scope > …')` 裡表達「相對於這個節點」仍然值得當成固定工具。

{% blockquote MDN @scope https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@scope %}
完整語法、donut 與 proximity 以 MDN／Cascade 6 為準。
{% endblockquote %}

{% blockquote MDN :scope https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:scope %}
偽類在樣式表、`@scope` 區塊、DOM API 三種脈絡的差異見此頁。
{% endblockquote %}

# 專有名詞中英對照

依本文出現順序，按大章分組，方便回查。

## 為什麼會需要「範圍」

- 範圍（scope）
- 插槽（slot）
- 子孫選擇器（descendant selector）
- 權重／特定性（specificity）

## `@scope` 語法

- at 規則（at-rule）
- 範圍根（scope root）
- 範圍界限（scope limit）
- 甜甜圈範圍（donut scope）
- 前奏／序言選擇器（prelude）

## `:scope`

- 偽類（pseudo-class）
- 參照根／參照起點（reference element / scoping root）
- 文件根偽類（`:root`）

## 層疊

- 層疊（cascade）
- 範圍鄰近性（scope proximity）
- 來源順序（source order）
- 巢狀選擇器（CSS Nesting，`&`）

## 定位與其他方案

- Block Element Modifier（BEM）
- 區塊／元素／修飾（block / element / modifier）
- CSS Modules
- Shadow DOM（影子 DOM）
- 光 DOM（light DOM）
- 宿主（host）
- 影子根（shadow root）
- Web Components
- 自訂元素（custom element）