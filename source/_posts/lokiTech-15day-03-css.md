---
title: "CSS 基礎：選擇器、盒模型、Flex、Grid、RWD"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:02:00
---

![](assets/images/banner/html5.png)

CSS（Cascading Style Sheets，層疊樣式表）負責外觀。這篇一次給一份可跑的行程卡頁，你用 <kbd>F12</kbd> 的 Styles 對選擇器、盒子、Flex、Grid 與媒體查詢。後面的 Tailwind 只是換寫法，這些觀念會一直用到。

<!-- more -->

# 取得素材

把下面兩份存成 `student/practice/css/index.html` 與同資料夾的 `style.css`。用 VS Code 開 `student/practice/`，Live Server 開頁面，再切裝置模式看 390px 與 1280px。

## 檔案一覽

| 檔案 | 做什麼 |
| --- | --- |
| `index.html` | 頁首與三張行程卡 |
| `style.css` | 選擇器、盒子、Flex、一個斷點 |

不要一行行打。貼上後存檔，點一張 `.card`，看 Styles 裡哪些規則亮著、哪些被劃掉。

## 完整示範頁

```html index.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行程卡</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header id="site-header">
      <p>洛奇旅行</p>
      <nav>
        <a href="#">首頁</a>
        <a href="#">行程</a>
      </nav>
    </header>
    <main>
      <h1>三張行程卡</h1>
      <p class="lead">卡片放在 .cards 裡，每一張是 .card。</p>
      <div id="tour-list" class="cards">
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
/* 寬度含 padding 與 border，排版才好算 */
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

.card {
  border-radius: 0.75rem;
}

@media (min-width: 768px) {
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

# 認識樣式

瀏覽器先讀 HTML 樹，再依規則幫每個元素穿衣服。三步是選到誰、套什麼、畫出來。同一屬性衝突時，權重高的贏；權重相同則檔案裡較後面的贏。

## 怎麼掛上 CSS

外部檔是課堂預設：`<link rel="stylesheet" href="style.css">` 放在 `head`，好對照、也好維護。頁內 `<style>` 只適合很小的示範。行內 `style=""` 寫在開始標籤上，難維護，練習少用。`@import` 知道有這個寫法即可。

## 選擇器

用 F12 點節點，看 Styles 左邊的選擇器名稱。打錯選擇器時，規則不會出現在那個節點上。

| 選擇器 | 範本裡的例子 | 打到誰 |
| --- | --- | --- |
| 元素 | `body` | 所有該標籤 |
| class | `.card` `.lead` `.cards` | 帶這個 class 的元素，可以重複 |
| id | `#site-header` | 全頁那一個；權重較高 |
| 後代 | `#site-header a` | header 裡面的 `a`，打不到 header 自己 |
| 子結合 `>` | `.cards > .card` | 只限直接小孩 |

`:hover` 是滑鼠放上去的狀態，之後會碰到，今天不必背偽類全書。

## 層疊與權重

概略記法：id 是 100、class 是 10、元素是 1，行內 style 更重。範本裡 `.card` 寫了兩次，`border-radius` 在第二次，F12 會看到同權重、較早的宣告被劃掉。`!important` 能硬贏，練習不要把它當預設。顏色可以用名稱、`#115e59` 或 `rgb()`，讀得懂即可。

## 盒模型

每個元素都是盒子：content、padding、border、margin，由內到外。F12 點卡片，看 Styles 下方的盒模型圖。預設 `content-box` 時，`width: 200px` 不含 padding，整顆會比 200 更寬。範本第一行 `* { box-sizing: border-box; }` 讓寬度含內距與邊框。卡片塞不下時，先看盒子，再改屬性。

# 認識版面

`display` 決定盒子怎麼排。`p`、`header` 預設是區塊，獨佔一行；`a` 預設是行內，跟文字同一行。這份範本窄螢幕用 Flex，夠寬改用 Grid。

## Flex

Flex 是一維，一列或一欄。`.cards` 設 `display: flex` 之後，小孩改走彈性排列。主軸預設水平，`justify-content` 沿主軸分配剩餘空間；交叉軸用 `align-items`。`flex-wrap: wrap` 不夠寬就換行，`gap` 是子元素之間的間距。`.card` 的 `flex: 1 1 16rem` 表示可長大、可縮小、基底約 16rem。

## Grid

Grid 是二維。範本在 768px 以上把 `.cards` 改成 `display: grid; grid-template-columns: repeat(3, 1fr);`，三欄均分。不必記命名區域。之後 Tailwind 的 `md:grid-cols-3` 就是這件事。

## RWD

RWD（Responsive Web Design，響應式網頁）是同一份 HTML，在不同寬度改排法，不是另做一個手機站。`@media (min-width: 768px)` 表示夠寬才套裡面的規則。窄螢幕卡片可換行，夠寬變成三欄。用裝置模式切 390px 與 1280px 對一次。

# 作業：行程卡片

這份作業是期末站的 `TourCard` 模板，容器 id 必須是 `tour-list`。交 `index.html` 與 `style.css`，並能指出這些卡片最後會放在行程列表。

{% note success %}
**跟著做：**
1. 維持 `box-sizing: border-box`、窄螢幕 Flex（`wrap` + `gap`）、768px 以上三欄 Grid。
2. 只改 `style.css` 的顏色或圓角。不要 `!important`，不要改 HTML 的 id 與 class。
3. 用繁中註解標明 `.card` 與 `#site-header a` 各打到誰。用 F12 確認 390px 會換行、1280px 是三欄。
{% endnote %}

# 本篇重點回顧

選擇器決定規則打到誰，層疊決定衝突時誰贏。盒模型加上 `border-box` 之後，寬度才好算。窄螢幕用 Flex 換行，夠寬用 Grid 分成三欄，斷點寫在 `@media (min-width)`。行程卡的 id 是 `tour-list`，之後會改成 utility class，再改成用資料重畫。
