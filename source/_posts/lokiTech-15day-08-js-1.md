---
title: "JavaScript（一）：官方 template、const、函式、陣列方法"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:07:00
---

![](assets/images/banner/js.png)

改用老師的 Vite + Tailwind **RWD** template（`loki-travel-template`）。四頁切版練習先封存。這一章開始 JavaScript：值、函式、陣列方法。先不接 API、先不要把專題的 HTML 改亂；小練習放 `exercises/`。

<!-- more -->

# 為什麼要換官方版
教材後面的 JS／React 範例，假設的是**同一套檔名與 id**。每人自切版不同，講義對不上。換 template 不是否定你的切版練習，而是讓後面的 JS 對得上契約。玩壞就再複製一份 template，不要修到面目全非還堅持用。

把整包放到 `project/`（若老師已放好就直接用）。確認 `#site-header`、`#nav-toggle`、`#tour-list`、`#tour-filters`、`#booking-form` 都在。

# JavaScript 在這門課的角色
HTML 是結構，CSS 是長相，JS 是「資料變了、畫面要跟著變」。今天資料先寫在程式裡的常數，畫面上的六團還是靜態 HTML；你先在練習檔把陣列算對。

Vite 已經用模組：`src/main.js` 可以 `import`／`export`。瀏覽器裡的 JS 一樣有型別，只是比較寬鬆——做練習時仍要知道字串 `"3"` 與數字 `3` 不相等（`===`）。

# 值、變數、物件
- 優先用 `const`；要重新指定才用 `let`。課堂不用 `var`。
- 物件用大括號：`{ id: 1, title: "台北城市漫遊", place: "台北", days: 3 }`
- 陣列用中括號：多個 tour 排一列

tours 欄位契約：`id`, `title`, `place`, `days`, `price`, `image`, `intro`。練習資料請對齊，不要自己加名額欄。

# 函式與陣列方法
函式：輸入參數 → 計算 → `return` 結果。

```js script.js
const filterThreeDayTours = (tours) => tours.filter((t) => t.days === 3);
```

- `filter`：留下符合條件的（篩選）
- `map`：每一筆變成另一個形狀（例如變成卡片用的字串）
- `find`：找第一筆符合的（詳情頁找 id）

不必從零實作這些方法。課堂講解會問：條件是什麼、回傳的是新陣列還是同一筆物件。

# 一次貼上的練習
不要慢慢打迴圈。把 `exercises/day7.js` 整份換成下面，在瀏覽器 Console 或暫時 `import` 印出結果即可。

```js day7.js
const tours = [
  { id: 1, title: "台北城市漫遊", place: "台北", days: 3, price: 12800, image: "/img/tours/taipei.svg", intro: "城市散步" },
  { id: 2, title: "花蓮山海三日", place: "花蓮", days: 3, price: 15900, image: "/img/tours/hualien.svg", intro: "山海" },
  { id: 3, title: "京都紅葉散步", place: "京都", days: 5, price: 42800, image: "/img/tours/kyoto.svg", intro: "社寺" },
];

export const filterThreeDayTours = (list) => list.filter((t) => t.days === 3);

console.log(filterThreeDayTours(tours).map((t) => t.title));
```

| 寫法 | 結果 |
| --- | --- |
| `t.days === 3` | 留下數字 3 的團 |
| `t.days === "3"` | 可能全滅（型別不同） |
| `map((t) => t.title)` | 變成標題字串陣列 |
| `find((t) => t.id === 1)` | 第一筆 id 為 1 的物件 |

{% note success %}
**跟著做：**
打開 `exercises/day7.js`（或老師指定路徑）。用六團常數，篩出 `days === 3`。不要改 HTML 檔名。
{% endnote %}

{% note primary %}
**練習規格**

這是既有 Vite 專案。請只在 exercises/day7.js 寫練習：給定 tours 陣列，用 filter 篩出 days === 3 的團。
欄位必須符合契約。不要改 HTML 檔名與 id。不要新增 npm 套件。請用繁中註解說明 filter 條件。
{% endnote %}

# 本章契約
專題本體用老師 template。練習與專題分開。禁止加 Bootstrap、禁止改回自切版檔名。

{% note warning %}
**練習對照（課堂會講解答）**
- 還在用自切的四頁檔名嗎？必須換成老師 template
- Vite 設定有沒有被改掉、有沒有多裝套件？
- `"3"` 與 `3` 有沒有混用導致 filter 全滅？
- 能不能口述 filter 條件？
{% endnote %}

# 本篇重點回顧
template 能跑、小練習做完後對解答。`src/main.js` 可以幾乎仍是 `import "./style.css"`。

接著把篩選接到真正的 `#tour-filters`，把卡片畫進 `#tour-list`。資料仍用 JS 常數，還不 fetch。
