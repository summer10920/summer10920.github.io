---
title: 'CSS：cqw、dvh、lh 等進階單位——跟誰算 100%、何時該換'
categories:
  - 前端
  - HTML/CSS
tag:
  - CSS
date: 2026-11-27 23:32:00
---

![](assets/images/banner/css.png)

基礎單位（`px`、`%`、`em`、`rem`、`vw`、`vh`、`ch`）日常夠用，但元件嵌在窄欄、手機網址列伸縮、邏輯方向、對齊大寫高度時會不夠準。這篇把容器查詢單位、動態／邏輯視窗單位、字型／行高單位收成對照筆記：各自跟誰算長度、典型情境、最短範例，最後談怎麼跟 `clamp` 搭配。

<!-- more -->

# 為什麼還要記一堆單位

本章先對齊問題：不是「單位愈多愈潮」，而是**百分比的參照對象不一樣**。選錯參照，版面會在「整頁變寬」或「網址列收合」時行為怪異，元件卻沒跟著你以為的那個盒子走。

幾個會踩到的情境：

- 卡片嵌在側欄：標題想跟**卡片寬**縮放，用 `vw` 卻跟**視窗**走
- 全螢幕 hero：`100vh` 在手機上常被網址列弄成裁切或底部留白
- 直書或邏輯屬性：`width`／`height` 語意與「行進方向」不一致時，`vw`／`vh` 對不太上
- 圖示要跟大寫字母視覺齊高：`em` 跟的是字級，不是 cap height

後面各族單位，都是在換「1% 到底是誰的 1%」。

{% mermaid graph TB %}
Q["我要的長度跟誰成比例？"]
Q --> C["某個容器盒子<br/>cq*"]
Q --> V["視窗／版面區<br/>vw vh / sv* lv* dv* / vi vb"]
Q --> F["字級或行高<br/>em rem ch / cap ex ic lh rlh"]
{% endmermaid %}

# 容器查詢單位（cqw、cqi）

本章回答：元件要依**自己所在的查詢容器**縮放時，該用哪組單位，以及為什麼裸寫 `cqw` 常常沒效。

## 痛點：`vw` 不管你嵌在哪

`1vw` = 視窗寬的 1%。側欄 320px、主欄很寬時，側欄裡的卡片標題若寫 `5vw`，仍跟著整頁視窗變，側欄本身變窄也不會成比例變小。

```html sidebar-card.html
<aside class="sidebar" style="width: 20rem">
  <article class="card">
    <h2 class="card__title">側欄裡的標題</h2>
  </article>
</aside>
```

```css vw-miss.css
/* 跟視窗走：側欄寬度改變時，標題不一定跟卡片合拍 */
.card__title {
  font-size: 5vw;
}
```

## 前提：先成為查詢容器

容器查詢單位（container query units）相對的是**查詢容器（query container）**的尺寸。元素要當容器，至少設定 `container-type`（常見 `inline-size` 或 `size`）；可用 `container-name` 命名，方便子孫指定跟哪一個祖先算。

```css container-setup.css
.card {
  container-type: inline-size;
  container-name: card;
}
```

沒有 containment 時，`cqw` 等會找不到容器，行為不如預期（常等同無效或落到初始包含塊，依實作／情境而異）——DevTools 的 Computed 裡若長度怪，先查祖先有沒有 `container-type`。

## 六個單位各自跟誰

- `cqw`：容器寬的 1%
- `cqh`：容器高的 1%
- `cqi`：容器**行內軸（inline axis）**尺寸的 1%（橫排時多半像寬）
- `cqb`：容器**區塊軸（block axis）**尺寸的 1%（橫排時多半像高）
- `cqmin`：`cqi` 與 `cqb` 中較小者
- `cqmax`：`cqi` 與 `cqb` 中較大者

寫作模式或邏輯屬性為主時，優先 `cqi`／`cqb`；確定只要物理寬高再用 `cqw`／`cqh`。

## 情境範例：標題跟卡片寬走

```html card-cq.html
<section class="layout">
  <aside class="sidebar">
    <article class="card">
      <h2 class="card__title">機械鍵盤配列</h2>
      <p class="card__lead">嵌在窄欄時，字級應跟卡片走。</p>
    </article>
  </aside>
  <main class="main">
    <article class="card">
      <h2 class="card__title">同一元件、較寬的主欄</h2>
      <p class="card__lead">容器變寬，標題上限仍被 clamp 住。</p>
    </article>
  </main>
</section>
```

```css card-cq.css
.card {
  container-type: inline-size;
  container-name: card;
  padding: 1rem;
  border: 1px solid #ccc;
}

.card__title {
  /* 跟容器行內尺寸成比例，並設上下限 */
  font-size: clamp(1rem, 4.5cqi + 0.5rem, 1.75rem);
}

.card__lead {
  font-size: clamp(0.875rem, 2.5cqi + 0.5rem, 1.125rem);
}
```

把側欄拉窄、主欄拉寬，同一套 `.card` 規則會依**各自容器寬**變，而不是跟視窗單一數值。也可搭配 `@container` 改版面；單位本身不必寫查詢也能用，但容器宣告不能省。

{% note info %}
**跟 `%` 的差別**
子元素的 `%` 多半相對**直接包含塊**的特定屬性；`cq*` 相對的是符合條件的**查詢容器**尺寸，且六個單位語意固定，不因屬性是 `width` 還是 `font-size` 而換一套百分比規則。
{% endnote %}

# 動態視窗單位（dvh、svh、lvh）

本章回答：`100vh` 在行動瀏覽器為什麼常不準，以及 `svh`／`lvh`／`dvh` 怎麼選。

## 痛點：經典 `vh` 假設「視窗高度固定」

行動 Safari／Chrome 的 UI（網址列等）顯示或收合時，**可見區高度會變**。`100vh` 在不少實作裡接近「大視窗」或某個固定參考，結果是全螢幕區塊被裁切，或底部露出空隙。

## `sv*`／`lv*`／`dv*` 在量什麼

規格把視窗想成三種狀態（寬高都有對應單位，實務最常談高度）：

- **Small viewport**（`svh`／`svw`／…）：瀏覽器 UI **全展開**時，可視區較小的那個
- **Large viewport**（`lvh`／`lvw`／…）：UI **收合**後，可視區較大的那個
- **Dynamic viewport**（`dvh`／`dvw`／…）：跟著**當下** UI 狀態變的可視區

對稱還有 `svmin`／`svmax` 等，語意與 `vmin`／`vmax` 相同，只是基底改成 small／large／dynamic。

經驗口訣：

- 要「怎麼捲都盡量填滿當下螢幕」→ 先試 `100dvh`
- 要「寧可矮一點、避免被裁」→ `100svh`
- 要「寧可高一點、接受可能被 UI 蓋住」→ `100lvh`

## 情境範例：全螢幕 hero

```html hero.html
<section class="hero">
  <h1 class="hero__title">產品發表</h1>
  <p class="hero__cta"><a href="#detail">往下看規格</a></p>
</section>
```

```css hero.css
.hero {
  /* 隨網址列顯示／收合調整；比死寫 100vh 穩妥 */
  min-height: 100dvh;
  display: grid;
  place-content: center;
  gap: 1rem;
  padding: 1.5rem;
}

/* 若更在意「小視窗時內容也完整露在首屏」 */
.hero--safe {
  min-height: 100svh;
}
```

真機用 DevTools 裝置模式只能近似；最終仍以實機捲動、看網址列收合時 hero 底邊是否跟著走為準。

# 邏輯視窗單位（vi、vb）

本章回答：何時不該再死用物理的 `vw`／`vh`，改用跟**行內／區塊軸**走的視窗單位。

## 痛點：物理寬高 ≠ 書寫方向上的「橫／直」

`vw`／`vh` 永遠是視窗的寬／高。頁面若用 `writing-mode: vertical-rl`，或元件大量使用 `inline-size`／`block-size`，你要的「沿著文字前進方向的那一軸」不一定是物理寬。

## 單位

- `vi`：視窗在**行內軸**上的 1%
- `vb`：視窗在**區塊軸**上的 1%

橫排（常見）時，`vi` 大致像 `vw`、`vb` 像 `vh`；直書時兩者會對調角色。動態視窗家族也有邏輯版：`svi`／`svb`、`lvi`／`lvb`、`dvi`／`dvb`。

和容器單位對照：

- 跟**視窗**的邏輯軸 → `vi`／`vb`（或 `dvi`／`dvb`）
- 跟**某個容器**的邏輯軸 → `cqi`／`cqb`

## 情境範例：直書標題區

```html vertical-hero.html
<section class="vhero" lang="zh-Hant">
  <h1 class="vhero__title">春日特輯</h1>
</section>
```

```css vertical-hero.css
.vhero {
  writing-mode: vertical-rl;
  min-block-size: 100vb; /* 區塊軸方向鋪滿視窗 */
  padding-inline: 5vi;
  padding-block: 2vb;
}

.vhero__title {
  font-size: clamp(1.25rem, 4vi, 2.5rem);
}
```

若這裡誤用 `100vh`／`5vw`，在直書下「鋪滿行進方向」的語意就容易歪；邏輯單位讓屬性與單位同一套座標。

# 字型與行高單位（lh、cap）

本章回答：`em`／`rem`／`ch` 之外，何時改用 `cap`、`ex`、`ic`、`lh`、`rlh`。

## 先對齊你已會的

- `em`：相對**元素自己**的 `font-size`（在 `font-size` 屬性上則相對父元素）
- `rem`：相對**根元素**的 `font-size`
- `ch`：相對「0」字形的寬（等寬字體上常接近字元格寬）

下面幾個是較細的字形／排版度量。

## 各單位參照什麼

- `cap`：大寫字母高度（cap height）
- `ex`：x-height（小寫 x 的高度）
- `ic`：表意文字（ideographic）字元格的進階度量，中日韓排版較有感
- `lh`：元素自己的 **line height**（一行的計算行高）
- `rlh`：根元素的 line height

## 情境範例：圖示對齊大寫、間距用行高

```html metric-row.html
<p class="row">
  <img class="row__icon" src="/icons/check.svg" alt="" />
  <span class="row__text">已完成校對</span>
</p>
```

```css metric-row.css
.row {
  display: flex;
  align-items: center;
  gap: 0.5lh; /* 間距跟行高走，改 line-height 會一起動 */
  font-size: 1.125rem;
  line-height: 1.6;
}

.row__icon {
  /* 圖示高度對齊大寫，而不是整顆 em 方塊 */
  block-size: 1cap;
  inline-size: auto;
}
```

`lh` 很適合當「垂直節奏」的單位：同一段落的 `margin-block`、彈性間距跟著行高，而不是魔法數字 `px`。標題階層若在根上定好 `line-height`，元件外距用 `rlh` 可接近設計系統的間距尺度。

{% note warning %}
**字體一換，cap／ex 會變**
這些單位吃實際字體度量；換 web font 或後備字體後，圖示對齊可能差幾個像素。關鍵對齊仍建議在目標字體載入後目視檢查。
{% endnote %}

# 怎麼選：clamp 與單位搭配

本章收成決策，並示範與 `min`／`max`／`clamp` 搭配。

## 口訣

- 要跟**某個元件盒子**成比例 → `cq*`（先設 `container-type`）
- 要跟**螢幕可見區**成比例 → `vw`／`vh` 或 `sv*`／`lv*`／`dv*`；邏輯方向用 `vi`／`vb`／`dvb` 等
- 要跟**字級或行高**成比例 → `em`／`rem`／`ch`／`cap`／`lh`／`rlh`
- 需要上下限 → 外層包 `clamp(min, preferred, max)`，或 `min()`／`max()`

不要用 `vw` 硬撐元件內比例（那是容器單位的活）；也不要用 `cqw` 做全頁 hero 高度（那是視窗單位的活）。

## 綜合片段

```css compose.css
/* 全頁第一屏：動態視窗 */
.hero {
  min-height: 100dvh;
}

/* 卡片：查詢容器＋行內軸字級 */
.card {
  container-type: inline-size;
}
.card__title {
  font-size: clamp(1rem, 3cqi + 0.75rem, 2rem);
}

/* 列距與圖示：行高＋ cap */
.meta {
  display: flex;
  gap: 0.75lh;
  align-items: center;
}
.meta__icon {
  block-size: 1cap;
}
```

讀法：hero 問的是螢幕；標題問的是卡片寬；圖示問的是大寫高度——三個問題三組單位，再用 `clamp` 防止極端變太小或太大。

# 瀏覽器支援

本章收支援度入口，方便評估能不能上正式頁。

{% caniuse css-container-query-units %}

{% caniuse viewport-unit-variants %}

概約時間線（實作時仍以 caniuse／目標瀏覽器為準）：

- 容器查詢單位：Chromium 105+、Safari 16+、Firefox 110+
- 動態視窗單位與 `vi`／`vb`：Chromium 108+、Safari 15.4+、Firefox 101+
- `lh`：約 Chromium 109+、Safari 16.4+、Firefox 120+
- `rlh`：約 Chromium 111+、Safari 16.4+、Firefox 120+
- `cap`：約 Chromium 118+、Safari 17.2+、Firefox 97+

{% blockquote MDN 相對長度單位 https://developer.mozilla.org/en-US/docs/Web/CSS/length %}
長度單位總覽（含 viewport、container、font-relative）以 MDN 為準。
{% endblockquote %}

{% blockquote MDN CSS container queries https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries %}
查詢容器與 `@container` 的設定見此頁；`cq*` 單位依賴容器宣告。
{% endblockquote %}

# 專有名詞中英對照

依本文出現順序，按大章分組。

## 為什麼還要記一堆單位

- 參照基準（reference）
- 視窗（viewport）
- 包含塊（containing block）

## 容器查詢單位（cqw、cqi）

- 容器查詢單位（container query units）
- 查詢容器（query container）
- 容器類型（container-type）
- 容器名稱（container-name）
- 行內軸（inline axis）
- 區塊軸（block axis）
- 容器查詢（container query）

## 動態視窗單位（dvh、svh、lvh）

- 小視窗（small viewport）
- 大視窗（large viewport）
- 動態視窗（dynamic viewport）
- 視覺化視窗（visual viewport，相關概念）

## 邏輯視窗單位（vi、vb）

- 邏輯屬性（logical properties）
- 寫作模式（writing mode）
- 行內尺寸（inline size）
- 區塊尺寸（block size）

## 字型與行高單位（lh、cap）

- 大寫高度（cap height）
- x 高度（x-height）
- 表意文字（ideographic）
- 行高（line height）
- 根行高單位（root line height，rlh）

## 怎麼選：clamp 與單位搭配

- 下限／上限夾擊（clamp）
- 最小值／最大值函式（min / max functions）
