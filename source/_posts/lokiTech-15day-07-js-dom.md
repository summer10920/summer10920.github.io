---
title: "JavaScript：DOM、事件與列表重繪"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:06:00
---

![](assets/images/banner/js.png)

這篇把行程畫進 `#tour-list`，把篩選綁在 `#tour-filters`。資料仍用上一篇的常數，還不 `fetch`。你要講得出：事件綁在誰身上、地點和天數存在哪個變數、誰負責重畫。

<!-- more -->

# 取得素材

沿用 `student/tailwind/`。`index.html` 的卡片區換成篩選表單加上空的列表，程式載入後再把卡片畫進去。id 保持 `tour-filters` 與 `tour-list`。

## 列表區塊

```html index.html
<form id="tour-filters" class="mx-auto flex max-w-6xl flex-col gap-3 px-4 pt-8 sm:flex-row">
  <label>地點
    <select name="place" class="mt-1 block w-full p-2">
      <option value="">全部</option>
      <option>台北</option>
      <option>花蓮</option>
      <option>京都</option>
    </select>
  </label>
  <label>天數
    <select name="days" class="mt-1 block w-full p-2">
      <option value="">全部</option>
      <option value="3">3 天</option>
      <option value="5">5 天</option>
    </select>
  </label>
</form>
<div id="tour-list" class="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-8 md:grid-cols-3"></div>
```

# 認識 DOM 與事件

DOM（Document Object Model，文件物件模型）是瀏覽器把 HTML 變成的物件樹。你用選擇器把節點取出來，再用事件在使用者動作時改資料、重畫那一塊。

## DOM

`document.querySelector("#tour-list")` 拿出那個 id 的節點。找不到會得到 `null`，接著呼叫方法就會在 Console 報錯。先檢查 id 有沒有被改掉。列表只拿容器，再把容器裡的 HTML 整批換成新卡片。

## 事件

使用者改下拉時，瀏覽器發出 `change`。`addEventListener("change", 函式)` 把要跑的程式綁上去。表單 `submit` 預設會重新整理，若要留在原頁，用 `event.preventDefault()` 擋住。這篇的篩選用 `change` 即可，報名的 POST 下一篇再做。

## 狀態再重繪

固定三步：變數記住目前的 `place` 與 `days`，用 `filter` 算出要顯示的陣列，再把結果寫進 `#tour-list`。事件函式只改變數、呼叫重繪，不要在每個事件裡各寫一套互不相干的改 DOM 邏輯。這就是之後 React `useState` 的雛形。

```js src/main.js
import "./style.css";
import { tours } from "./tours.js";

const listEl = document.querySelector("#tour-list");
const formEl = document.querySelector("#tour-filters");
let place = "";
let days = "";

const render = () => {
  const rows = tours.filter(
    (tour) => (!place || tour.place === place) && (!days || String(tour.days) === days),
  );
  listEl.innerHTML = rows
    .map(
      (tour) => `<article class="overflow-hidden rounded-xl bg-white shadow">
        <img class="h-40 w-full object-cover" src="${tour.image}" alt="${tour.title}" />
        <h2 class="p-4 font-semibold">${tour.title}</h2>
        <p class="px-4 pb-4 text-sm">${tour.place} · ${tour.days} 天 · NT$${tour.price}</p>
      </article>`,
    )
    .join("");
};

formEl.addEventListener("change", (event) => {
  place = event.currentTarget.place.value;
  days = event.currentTarget.days.value;
  render();
});

render();
```

下拉的天數是字串，所以比較時用 `String(tour.days)`。資料是你自己的常數才用 `innerHTML`；之後接 API 仍不要插入來路不明的字串。`listEl` 若是 `null`，就是 id 不對。

# 作業：行程列表

這份作業是 `TourList` 與 `TourCard`。交會篩選、會重畫的 `#tour-list`，並能指出它最後放在 `/tours`。

{% note success %}
**跟著做：**
1. 資料從 `tours.js` import。欄位維持七個，至少三筆。
2. 改變地點或天數後，卡片仍在 `#tour-list` 裡，而且只剩符合的行程。
3. 不要 `fetch`，不要加套件，不要用 jQuery。用繁中註解寫：狀態在哪兩個變數、誰在重畫。
{% endnote %}

# 本篇重點回顧

`querySelector` 取出節點，`addEventListener` 等候使用者動作。篩選條件放在變數，`render` 依變數重畫 `#tour-list`。下一篇把常數換成 `fetch` 回來的陣列，重繪函式留著。
