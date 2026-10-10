---
title: "JavaScript 基礎：值、函式、陣列與模組"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:04:00
---

![](assets/images/banner/js.png)

JavaScript 負責「資料變了，畫面才跟著變」。這篇先不改畫面，只在模組裡把行程陣列算對：變數、物件、函式、`filter`／`map`／`find`，以及 `export`。畫面重繪與 `fetch` 分在後面兩篇。

<!-- more -->

# 取得素材

沿用 `student/tailwind/`。新增 `src/tours.js`，在 `src/main.js` 裡 import 它，用瀏覽器 Console 看印出的結果。Vite 專案本來就是模組，`package.json` 的 `"type": "module"` 表示檔案之間用 `import`／`export`。

## 小練習檔

不要改 `index.html` 的 id。這篇的程式只計算資料。

```js src/tours.js
export const tours = [
  { id: 1, title: "台北城市漫遊", place: "台北", days: 3, price: 12800, image: "/img/tours/taipei.svg", intro: "城市散步" },
  { id: 2, title: "花蓮山海三日", place: "花蓮", days: 3, price: 15900, image: "/img/tours/hualien.svg", intro: "山海" },
  { id: 3, title: "京都紅葉散步", place: "京都", days: 5, price: 42800, image: "/img/tours/kyoto.svg", intro: "社寺" },
];

export const filterByDays = (list, days) => list.filter((tour) => tour.days === days);
```

```js src/main.js
import "./style.css";
import { tours, filterByDays } from "./tours.js";

console.log(filterByDays(tours, 3).map((tour) => tour.title));
```

# 認識值與函式

HTML 是結構，CSS 是長相，JavaScript 是行為與資料。瀏覽器裡的值有型別，只是宣告時不必寫出來。字串 `"3"` 和數字 `3` 用 `===` 比較不會相等。

## 變數與物件

優先用 `const`。需要整個換掉那個變數時才用 `let`。課堂不用 `var`。物件用大括號，陣列用中括號。行程欄位固定七個：`id`、`title`、`place`、`days`、`price`、`image`、`intro`。不要自己加名額欄。

## 函式與陣列方法

函式收下參數、算出結果、用 `return` 交回去。箭頭函式 `(tours) => ...` 夠用。三個方法先記用途，不必自己實作：

| 方法 | 做什麼 | 回傳 |
| --- | --- | --- |
| `filter` | 留下符合條件的 | 新陣列 |
| `map` | 每一筆變成另一個形狀 | 新陣列 |
| `find` | 找第一筆符合的 | 那一筆物件，沒有就是 `undefined` |

`t.days === 3` 留得下三天行程。`t.days === "3"` 可能一筆都不留，因為型別不同。`find((tour) => tour.id === 1)` 給詳情頁留著，這篇先在 Console 呼叫即可。

## 模組

`export` 把函式或陣列交給別的檔，`import` 再拿進來。畫面邏輯之後放 `main.js`，資料與演算法留在 `tours.js`，fetch 再另外做一支 `api.js`。不要把全部程式貼在 `index.html` 的 `<script>` 裡。

# 作業：行程資料模組

這份作業是 `TourList` 的資料模板。交 `src/tours.js`：至少三筆、七個欄位都在，並能指出它最後會餵給行程列表。

{% note success %}
**跟著做：**
1. 用 `filter` 篩出 `days === 3` 的行程，再用 `map` 取出標題，結果出現在 Console。
2. 用 `find` 找出 `id === 1` 的那一筆。註解用繁中寫條件是什麼。
3. 不要改 HTML 的 id，不要安裝新套件，不要用 jQuery。
{% endnote %}

# 本篇重點回顧

`const` 與物件陣列用來擺行程。`filter`、`map`、`find` 負責篩、轉換、找一筆。數字和字串要用 `===` 分清楚。資料放在模組裡 export，下一篇才把篩選結果畫進 `#tour-list`。
