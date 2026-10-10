---
title: "CSS（一）：選擇器、層疊、盒模型、Flex／Grid、媒體查詢"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:02:00
---

![](assets/images/banner/html5.png)

CSS 只上一天。一次貼上完整 HTML＋CSS，用 F12 的 **Styles（樣式）** 把選擇器、層疊、盒子、Flex／Grid、媒體查詢一次對完。後面 Tailwind 只是換寫法，今天的觀念會一直用到。

<!-- more -->

# CSS 在做什麼
CSS（Cascading Style Sheets，層疊樣式表）負責外觀。HTML 是骨架，CSS 是裝潢。瀏覽器先解析 HTML 樹，再依規則幫每個元素「穿衣服」。

三步：**選到誰**（選擇器）→ **套什麼**（屬性與值）→ **畫出來**。F12 點元素後，右側 Styles 會列出打到它的每一條規則，被劃掉的表示輸給更強或更後面的規則。

```css
選擇器 {
  屬性: 值;
}
```

# 一次貼上：完整示範頁
不要一行行打。把下面兩格存成 `student/practice/day2/index.html` 與同一資料夾的 `style.css`。VS Code 開 `student/practice/`，用 Live Server 開頁面，<kbd>F12</kbd> 切 Elements，右側看 Styles。用裝置模式切 390px／1280px。

{% note success %}
**跟著做**
1. 兩檔一次貼上並存檔。
2. 點某一張 `.card`，看 Styles 裡哪些選擇器亮著、哪些被劃掉。
3. 對照後表：選擇器打幾顆節點、盒子算不算進 padding、Flex 主軸在哪。
{% endnote %}

```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 對照頁</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header id="site-header">
      <p>練習頁</p>
      <nav>
        <a href="#">首頁</a>
        <a href="#">行程</a>
      </nav>
    </header>
    <main>
      <h1>三張行程卡</h1>
      <p class="lead">這段有 class，下面卡片在 .cards 裡。</p>
      <div class="cards">
        <article class="card">
          <h2>台北城市漫遊</h2>
          <p>3 天 · 台北</p>
        </article>
        <article class="card">
          <h2>京都紅葉散步</h2>
          <p>5 天 · 京都</p>
        </article>
        <article class="card">
          <h2>濟州島週休</h2>
          <p>4 天 · 濟州</p>
        </article>
      </div>
    </main>
  </body>
</html>
```

```css style.css
/* 全站先改盒模型，寬度才比較好算 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
  color: #134e4a;
}

#site-header {
  background: #115e59;
  color: #fff;
  padding: 1rem 1.5rem;
}

#site-header a {
  color: #fff;
  margin-right: 1rem;
}

.lead {
  padding: 0 1.5rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem;
}

.card {
  flex: 1 1 16rem;
  padding: 1rem;
  border: 1px solid #99f6e4;
  background: #f0fdfa;
}

/* 權重示範：同一張卡，後面的會蓋前面的同權重屬性 */
.card {
  border-radius: 0.75rem;
}

@media (min-width: 768px) {
  .cards {
    flex-wrap: nowrap;
  }
}
```

# 怎麼掛上 CSS
| 寫法 | 放哪 | 課堂態度 |
| --- | --- | --- |
| 外部檔 `<link rel="stylesheet" href="style.css">` | `head` | **預設**，好維護、課堂也好對照 |
| 頁內 `<style>` | `head` | 小示範可以，專案不要當主體 |
| 行內 `style=""` | 開始標籤上 | 知道存在；難維護，練習盡量少用 |

`@import` 知道即可，不要當主做法。

# 選擇器（對這份檔）
用 F12 點節點，看 Styles 左邊選擇器名稱。

| 選擇器 | 範本裡的例子 | 打到誰 | 審稿怎麼問 |
| --- | --- | --- | --- |
| 元素 | `body` | 所有該標籤 | 會不會誤傷太多節點？ |
| class | `.card` `.lead` `.cards` | 帶這個 class 的 | class 可重複 |
| id | `#site-header` | 唯一那顆 | id 全頁一個；權重較高 |
| 後代 | `#site-header a` | header **裡面**所有 `a` | **不會**打到 header 自己 |
| （了解）子結合 `>` | `.cards > .card` | 只限直接小孩 | 比後代更窄 |

不必今天背屬性選擇器、偽類全書。`:hover` 之後會碰到，知道「滑鼠放上去的狀態」即可。

# 層疊與權重
同一屬性衝突時：權重高的贏；權重相同則**檔案裡後面寫的贏**。範本裡 `.card` 寫了兩次，`border-radius` 在第二次——F12 會看到第一條相關宣告被劃掉或合併。

概略：id 100、class 10、元素 1。行內 style 更重。`!important` 能硬贏，解答時會問「為什麼非用不可」，禁止當預設解法。

顏色值：名稱、`#115e59`（HEX）、`rgb()` 都合法；課堂讀懂即可。

# 盒模型
每個元素都是盒子：content → padding → border → margin。F12 點卡片，切 **Computed** 或 Styles 下方的盒模型圖。

預設 `content-box`：你設 `width: 200px` 時，padding 會讓整顆盒子比 200 更寬。所以範本第一行是 `* { box-sizing: border-box; }`——寬度含邊框與內距，排版才穩。

卡片左右 `padding: 1rem` 很大時一列塞不下三張：先看盒子，不要先改一堆屬性碰運氣。

`display`：區塊（`p`、`header`）獨佔一行；行內（`a`）跟文字同一行；今天排卡片用 `flex`。

# Flex 與 Grid
Flex 是**一維**（一列或一欄）。對照範本：

| 屬性 | 在誰身上 | 白話 |
| --- | --- | --- |
| `display: flex` | `.cards` | 小孩改走彈性排列 |
| 主軸 | 預設水平（row） | `justify-content` 沿這軸分配剩餘空間 |
| 交叉軸 | 垂直 | `align-items` 對齊 |
| `flex-wrap` | 父 | 不夠寬是否換行 |
| `gap` | 父 | 子之間的間距，不必靠 margin 硬撐 |
| `flex: 1 1 16rem` | `.card` | 可長大、可縮小、基底約 16rem |

Grid 是**二維**。今天只要認得 `display: grid; grid-template-columns: repeat(3, 1fr);`（三欄均分）。不必 named area。Tailwind 的 `md:grid-cols-3` 就是這件事。

# RWD
`@media (min-width: 768px)`：夠寬才套裡面的規則。範本預設卡片可換行；768 以上 `nowrap` 讓三張硬排一列（窄螢幕請用裝置模式看 wrap）。這就是之後 Tailwind：**沒有前綴的 class 給窄的，`md:` 給夠寬的**。

{% note primary %}
**練習規格**

我已有 index.html（.cards 包三個 .card）與 style.css。請只改 style.css。
維持 box-sizing:border-box、flex + wrap + gap、.card 的 flex:1 1 16rem。
不要 !important、不要框架、不要改 HTML。
請用繁中註解標明每個選擇器打到誰。
{% endnote %}

選擇器與盒子對得上之後，才准改配色。反面：「把頁面變漂亮」——沒有選擇器、沒有斷點，課堂沒辦法對照講解。

# 本章契約
只有 `student/practice/day2/` 這兩檔。禁止改 `teacher/`、禁止 Bootstrap。

{% note warning %}
**練習對照（課堂會講解答）**
- `.cards .card` 或 `.card` 打幾顆？
- `#site-header` 與 `header` 誰權重高？
- 盒模型圖裡 padding 有沒有算進寬度（border-box）？
- 390px 卡片是否換行？
- HTML 有沒有被改到今天不該動的部分？
- 把一行 CSS 講成人話。
{% endnote %}

# 本篇重點回顧
示範頁能開、課堂講盒模型與 Flex 時能跟著講。不必做成視覺作品集。

接著裝 Node 是為了跑 Vite、編譯 Tailwind，不是寫後端。這一章的 Flex 口條會變成 `flex`、`gap-4`、`md:grid-cols-3`。
