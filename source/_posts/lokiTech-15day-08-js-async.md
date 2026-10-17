---
title: "JavaScript：fetch、async 與報名表"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:07:00
---

![](assets/images/banner/js.png)

這篇把行程常數換成本機 API 回來的陣列，並讓 `#booking-form` 用 POST 送出報名。你會開兩個終端機：一個跑 Vite，一個跑 json-server。線上沒有這台假 API，佈署時改讀專案裡的 JSON。

<!-- more -->

# 取得素材

沿用 `student/tailwind/`。新增 `db.json`、`src/api.js`，並在頁面底部放報名表。列表仍畫進 `#tour-list`，資料來源改成 `fetch`。

## 假 API

json-server 讀一份 JSON，自動做出 REST 風格網址。安裝時鎖定 0.17，指令才跟下面一樣。

```bash
pnpm add -D json-server@0.17.4
```

`package.json` 的 `scripts` 加上 `"api": "json-server --watch db.json --port 3000"`。一個終端機 `pnpm dev`，另一個 `pnpm api`。

```json db.json
{
  "tours": [
    { "id": 1, "title": "台北城市漫遊", "place": "台北", "days": 3, "price": 12800, "image": "/img/tours/taipei.svg", "intro": "城市散步" },
    { "id": 2, "title": "花蓮山海三日", "place": "花蓮", "days": 3, "price": 15900, "image": "/img/tours/hualien.svg", "intro": "山海" },
    { "id": 3, "title": "京都紅葉散步", "place": "京都", "days": 5, "price": 42800, "image": "/img/tours/kyoto.svg", "intro": "社寺" }
  ],
  "bookings": []
}
```

Vite 在一個 port、API 在 3000，瀏覽器會當成兩個來源。用開發伺服器的 proxy 把 `/api` 轉過去，頁面上的網址就還是同一個來源。

```js vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: { "/api": { target: "http://localhost:3000", rewrite: (path) => path.replace(/^\/api/, "") } },
  },
});
```

## 報名表單

欄位對齊期末契約：`tourId`、`name`、`email`、`people`。`tourId` 先寫死 `1`，詳情頁帶參數留到 React。

```html index.html
<form id="booking-form" class="mx-auto grid max-w-xl gap-3 px-4 py-10">
  <label>行程編號 <input name="tourId" type="number" value="1" required class="mt-1 block w-full p-2" /></label>
  <label>姓名 <input name="name" type="text" required class="mt-1 block w-full p-2" /></label>
  <label>Email <input name="email" type="email" required class="mt-1 block w-full p-2" /></label>
  <label>人數 <input name="people" type="number" min="1" value="1" required class="mt-1 block w-full p-2" /></label>
  <button type="submit" class="rounded bg-teal-800 px-4 py-2 text-white">送出報名</button>
  <p id="booking-message" class="text-sm"></p>
</form>
```

# 認識請求

瀏覽器跟 API 說話，靠方法、網址，以及有時附上的 body。這篇只用 GET 拿行程、POST 新增報名。後台的改與刪留到結業專案的 `/admin`。

## HTTP 與 JSON

GET 拿資料，POST 新增一筆。JSON 是文字，長得像 JavaScript 物件。`Content-Type: application/json` 告訴對方 body 是 JSON；漏掉這行是 POST 失敗的常見原因。`/tours` 給列表，`/bookings` 給報名。

## async 與 fetch

`fetch` 回傳一個 Promise，表示「等一下才有結果」。`async` 函式裡可以用 `await` 把這段等待寫成直線。`response.ok` 為 false 時（例如 404、500）要自己丟錯誤，`fetch` 不會因為 404 就 reject。

```js src/api.js
export const getTours = async () => {
  const response = await fetch("/api/tours");
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const createBooking = async (booking) => {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};
```

除錯看 Network 裡的完整狀態碼、response 本文，以及跑 API 的那個終端機。不要只說「不能動」。

# 接到畫面

列表的 `render` 留著，只是陣列改由 `getTours` 填入。報名在 `submit` 時擋下整頁重載，再 POST。

## 列表 GET

篩選仍用上一篇的 `place`、`days`。可以先把全部行程拿回來再 `filter`，不必先背 query 語法。

```js src/main.js
import "./style.css";
import { getTours, createBooking } from "./api.js";

const listEl = document.querySelector("#tour-list");
const formEl = document.querySelector("#tour-filters");
const bookingEl = document.querySelector("#booking-form");
const messageEl = document.querySelector("#booking-message");
let tours = [];
let place = "";
let days = "";

const render = () => {
  const rows = tours.filter((tour) => (!place || tour.place === place) && (!days || String(tour.days) === days));
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

getTours()
  .then((data) => {
    tours = data;
    render();
  })
  .catch((error) => {
    listEl.textContent = `讀不到行程：${error.message}`;
  });
```

`src/tours.js` 的常數可以留著當對照，畫面不要再 import 它。資料是你自己的 API 才用 `innerHTML`。

## 報名 POST

`people` 與 `tourId` 從欄位讀出來是字串，送出前用 `Number` 轉成數字，才跟契約欄位一致。詳情頁不要放這張表。

```js src/main.js
bookingEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(bookingEl);
  try {
    await createBooking({
      tourId: Number(data.get("tourId")),
      name: data.get("name"),
      email: data.get("email"),
      people: Number(data.get("people")),
    });
    messageEl.textContent = "已送出";
    bookingEl.reset();
  } catch (error) {
    messageEl.textContent = `送出失敗：${error.message}`;
  }
});
```

成功時 Network 常見 `201`。到 `http://localhost:3000/bookings` 應看得到剛寫入的一筆。

{% note danger %}
json-server 只在本機。GitHub Pages 沒有這台行程伺服器。結業專題改讀打包進專案的 JSON，線上的報名改成說明「僅本機示範」。
{% endnote %}

# 作業：報名表

這份作業是 `BookingForm`。交會 POST 的 `#booking-form`，並能指出它最後放在 `/booking`。列表仍要能從 API 重畫。

{% note success %}
**跟著做：**
1. `pnpm dev` 與 `pnpm api` 同時開著。GET `/api/tours` 填進 `#tour-list`。
2. `#booking-form` 送出時 POST `/api/bookings`，body 只有 `tourId`、`name`、`email`、`people`，並帶 `Content-Type: application/json`。
3. 用繁中註解寫 GET 與 POST 差在哪。不要裝別的 HTTP 套件，不要寫入任何金鑰，不要在詳情區塊送出表單。
{% endnote %}

# 本篇重點回顧

`async`／`await` 用來等 `fetch` 的結果。列表用 GET，報名用 POST，失敗要看狀態碼而不只看 Console 一句話。proxy 讓頁面與 API 在開發時走同一個來源。下一篇另開 React 專案，把同一份列表改成元件；這份 Vite 頁面留著當對照。
