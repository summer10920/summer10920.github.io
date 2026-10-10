---
title: "JavaScript（二）：querySelector、事件、常數資料重繪"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:08:00
---

![](assets/images/banner/js.png)

把行程畫進 `#tour-list`、把篩選綁在 `#tour-filters`。資料先寫死在 JS 常數，fetch 之後再接。核心觀念：事件綁在誰身上、目前選的地點與天數存在哪個變數、畫面如何依變數重畫。

<!-- more -->

# DOM
DOM（Document Object Model）是瀏覽器把 HTML 變成的物件樹。`document.querySelector("#tour-list")` 是「請樹裡那個 id 的節點出來」。找不到會得到 `null`，接著呼叫方法就會在 Console 報錯——先看是不是 id 寫錯或被改掉。

`querySelector` 只拿第一個；清單列用容器 `#tour-list`，再把裡面整批換成新卡片。

# 事件
使用者做了什麼（改下拉、點按鈕），瀏覽器發出事件。`addEventListener("change", 函式)` 把「發生時要跑的程式」綁在節點上。

表單 `submit` 預設會讓網址列跳轉或重新整理，課堂用 `event.preventDefault()` 擋住，改由 JS 處理。詳情頁仍然**不要**在今天做 POST（還沒有 API）。

# 狀態再重繪
不要在每個事件裡各寫一套改 DOM 的邏輯卻對不齊。固定模式：

1. 變數記住目前的 `place`、`days`
2. 從常數陣列 `filter`
3. 把結果畫進 `#tour-list`

事件處理函式只負責「改變數、呼叫重繪」。這就是後面 React `useState` 的雛形。

# 一次貼上的列表邏輯
`src/main.js` 可一次換成「常數＋篩選＋畫進 #tour-list」。HTML 的卡片先當預設，JS 載入後覆寫。不要逐行打 innerHTML。

```js main.js
import "./style.css";

const tours = [/* 與契約相同的六團，略 */];
const listEl = document.querySelector("#tour-list");
const formEl = document.querySelector("#tour-filters");
let place = "";
let days = "";

const render = () => {
  const rows = tours.filter(
    (t) => (!place || t.place === place) && (!days || String(t.days) === days)
  );
  listEl.innerHTML = rows
    .map(
      (t) => `<article class="overflow-hidden rounded-xl bg-white shadow">
        <h2>${t.title}</h2>
        <p>${t.place} · ${t.days} 天</p>
      </article>`
    )
    .join("");
};

formEl?.addEventListener("change", (e) => {
  const f = e.currentTarget;
  place = f.place.value;
  days = f.days.value;
  render();
});

render();
```

F12 Console 若 `listEl` 是 `null`，一定是 id 被改掉。資料是自己的常數才用 `innerHTML`；以後接 API 仍不要插入不明字串。

卡片 HTML 若用樣板字串，注意欄位名稱必須是契約那七個。圖片用 repo 內路徑。

{% note primary %}
**練習規格**

只改 src/main.js 與必要的 tours.html 結構。
保留 #tour-list 與 #tour-filters。
資料用模組內常數，六團欄位必須符合契約（id, title, place, days, price, image, intro）。
篩選 place 與 days；沒有名額欄。不要 fetch。不要新增套件。不要使用 jQuery。
{% endnote %}

{% note warning %}
**練習對照（課堂會講解答）**
- 篩選後卡片是否仍在 `#tour-list` 裡？
- 事件有沒有綁到不存在的節點（Console 紅字）？
- 有沒有用 jQuery？
- 能不能講：狀態在哪個變數、誰在重畫畫面？
{% endnote %}

# 本篇重點回顧
列表頁可以篩選並重繪。詳情、報名可先維持靜態連線。

接著接 json-server：GET `/tours`、POST `/bookings`。請先把重繪函式留著，資料來源會從「常數」換成「fetch 回來的陣列」。
