---
title: "結業專案：洛奇旅行（React 與 Tailwind）"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:10:00
---

![](assets/images/banner/react.png)

這篇把前幾天的元件收成洛奇旅行：四個前台頁面、本機後台、專案裡的 JSON，再佈上 GitHub Pages。深度停在照表組裝、講得出資料從哪來。不上 TypeScript。

<!-- more -->

# 取得素材

沿用 `student/react/` 整份複製成 `student/project/`。排版與 ESLint 跟著專案走，不要改個人的使用者設定。一個終端機 `pnpm dev`，另一個 `pnpm api`（json-server 仍鎖定 0.17）。

## 規格

品牌是洛奇旅行。前台用 React 與 Tailwind。json-server 只在本機；正式站改讀專案裡的 JSON，不連後端。

| 項目 | 契約 |
| --- | --- |
| 行程欄位 | `id`、`title`、`place`、`days`、`price`、`image`、`intro` |
| 報名欄位 | `tourId`、`name`、`email`、`people` |
| 篩選 | 列表依 `place`、`days` |
| 詳情按鈕 | 把 `tourId` 帶到 `/booking` |

## 頁面

| 路徑 | 頁面檔 | 畫面上的元件 |
| --- | --- | --- |
| `/` | `HomePage.jsx` | `Hero` |
| `/tours` | `ToursPage.jsx` | `TourList`、`TourCard`（`#tour-list`） |
| `/tours/:id` | `TourDetailPage.jsx` | `TourDetail` |
| `/booking` | 路由直接掛表單 | `BookingForm`（`#booking-form`） |
| `/admin` | `AdminPage.jsx` | 行程增刪改，僅本機 |

每一頁外層都是 `SiteHeader`（`#site-header`、`#nav-toggle`）與 `SiteFooter`。

## 元件對到作業

六份作業就是這六個元件。檔名與 id 不要改。

| 作業元件 | 檔案 | 最後放在 |
| --- | --- | --- |
| `SiteHeader` | `src/SiteHeader.jsx` | 每一頁上方 |
| `Hero` | `src/Hero.jsx` | `/` |
| `TourList`／`TourCard` | `src/TourList.jsx`、`src/TourCard.jsx` | `/tours` |
| `TourDetail` | `src/TourDetail.jsx` | `/tours/:id` |
| `BookingForm` | `src/BookingForm.jsx` | `/booking` |
| `SiteFooter` | `src/SiteFooter.jsx` | 每一頁下方 |

# 照順序組站

先讓本機四條路由與報名走得通，再換成靜態 JSON，最後才處理網址前綴與佈署。篩選、列表、表單沿用上一篇，這篇只補頁首開關、主視覺、詳情區塊與組裝。

## 組裝順序

| 順序 | 做什麼 | 開哪一檔 |
| --- | --- | --- |
| 1 | 頁首可開合、主視覺、詳情區塊 | `SiteHeader.jsx`、`Hero.jsx`、`TourDetail.jsx` |
| 2 | 路由掛上六個元件與 `/admin` | `App.jsx` |
| 3 | 正式建置改讀 JSON，報名改寫進瀏覽器 | `src/data/tours.json`、`api.js` |
| 4 | 卡片圖片接上站點前綴 | `TourCard.jsx`、`TourDetail.jsx` |
| 5 | 設定 `base` 與 `basename`，建置後複製 `404.html` | `vite.config.js`、`main.jsx` |

```jsx src/SiteHeader.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header id="site-header" className="border-b">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="font-semibold">洛奇旅行</Link>
        <button id="nav-toggle" type="button" className="ml-auto sm:hidden" onClick={() => setOpen((value) => !value)}>選單</button>
        <nav className={(open ? "flex" : "hidden") + " w-full flex-col gap-3 sm:flex sm:w-auto sm:flex-row sm:gap-4 text-sm"}>
          <Link to="/">首頁</Link>
          <Link to="/tours">行程</Link>
          <Link to="/booking">報名</Link>
        </nav>
      </div>
    </header>
  );
}
```

```jsx src/Hero.jsx
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="rounded-xl bg-teal-800 px-6 py-16 text-white">
      <h1 className="text-4xl font-bold">洛奇旅行</h1>
      <p className="mt-3">城市散步、山海與社寺。</p>
      <Link className="mt-6 inline-block rounded bg-white px-4 py-2 text-teal-900" to="/tours">看行程</Link>
    </section>
  );
}
```

```jsx src/HomePage.jsx
import Hero from "./Hero.jsx";

export default function HomePage() {
  return <Hero />;
}
```

```jsx src/TourDetail.jsx
import { Link } from "react-router-dom";

const srcOf = (image) => import.meta.env.BASE_URL + image.replace(/^\//, "");

export default function TourDetail({ tour }) {
  return (
    <article>
      <img className="h-56 w-full rounded-xl object-cover" src={srcOf(tour.image)} alt={tour.title} />
      <h1 className="mt-4 text-3xl font-bold">{tour.title}</h1>
      <p className="mt-2">{tour.place} · {tour.days} 天 · NT${tour.price}</p>
      <p className="mt-2">{tour.intro}</p>
      <Link className="mt-6 inline-block rounded bg-teal-800 px-4 py-2 text-white" to={"/booking?tourId=" + tour.id}>我要報名</Link>
    </article>
  );
}
```

`TourDetailPage` 仍用上一篇的 `useEffect` 與 `getTour`。讀到資料後改成 `<TourDetail tour={tour} />`。`TourCard` 的 `img` 同樣用 `import.meta.env.BASE_URL` 接路徑，標題的 `Link` 仍是 `to={"/tours/" + tour.id}`。

```jsx src/App.jsx
import { Route, Routes } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import HomePage from "./HomePage.jsx";
import ToursPage from "./ToursPage.jsx";
import TourDetailPage from "./TourDetailPage.jsx";
import BookingForm from "./BookingForm.jsx";
import AdminPage from "./AdminPage.jsx";

export default function App() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
```

# 換成專案裡的 JSON

本機開發仍走 `/api`（Vite proxy 到 json-server）。`pnpm build` 之後沒有那個伺服器，所以 `import.meta.env.PROD` 為真時改讀 JSON。正式站的報名只寫進這台瀏覽器的 `localStorage`，重新整理還在，換電腦就沒有。

## 資料檔

`db.json` 留給本機 API。線上用的是 `src/data/tours.json`，內容就是行程陣列，欄位與本機相同。

```json src/data/tours.json
[
  { "id": 1, "title": "台北城市漫遊", "place": "台北", "days": 3, "price": 12800, "image": "/img/tours/taipei.svg", "intro": "城市散步" },
  { "id": 2, "title": "花蓮山海三日", "place": "花蓮", "days": 3, "price": 15900, "image": "/img/tours/hualien.svg", "intro": "山海" },
  { "id": 3, "title": "京都紅葉散步", "place": "京都", "days": 5, "price": 42800, "image": "/img/tours/kyoto.svg", "intro": "社寺" }
]
```

```js src/api.js
import toursJson from "./data/tours.json";

const localTours = () => toursJson;
const readBookings = () => JSON.parse(localStorage.getItem("bookings") || "[]");

export const getTours = async () => {
  if (import.meta.env.PROD) return localTours();
  const response = await fetch("/api/tours");
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const getTour = async (id) => {
  if (import.meta.env.PROD) {
    const tour = localTours().find((item) => String(item.id) === String(id));
    if (!tour) throw new Error("404");
    return tour;
  }
  const response = await fetch("/api/tours/" + id);
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const createBooking = async (booking) => {
  if (import.meta.env.PROD) {
    localStorage.setItem("bookings", JSON.stringify([...readBookings(), booking]));
    return booking;
  }
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const saveTour = async (tour) => {
  const response = await fetch(tour.id ? "/api/tours/" + tour.id : "/api/tours", {
    method: tour.id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tour),
  });
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const deleteTour = async (id) => {
  const response = await fetch("/api/tours/" + id, { method: "DELETE" });
  if (!response.ok) throw new Error(String(response.status));
};
```

## 本機後台

`/admin` 只改行程，不做登入、不做報名清單。正式站打開這頁只顯示說明。F12 的 Network 在本機看得到 `POST`、`PUT`、`DELETE /api/tours`。

```jsx src/AdminPage.jsx
import { useEffect, useState } from "react";
import { deleteTour, getTours, saveTour } from "./api.js";

const empty = { title: "", place: "", days: "3", price: "10000", image: "/img/tours/taipei.svg", intro: "" };

export default function AdminPage() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState("");
  const onChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const load = () => getTours().then(setTours).catch((error) => setMessage(String(error)));

  useEffect(() => {
    if (!import.meta.env.PROD) load();
  }, []);

  if (import.meta.env.PROD) return <p>後台僅本機示範。請在本機執行 pnpm api。</p>;

  const onSubmit = async (event) => {
    event.preventDefault();
    await saveTour({ ...form, id: form.id ? Number(form.id) : undefined, days: Number(form.days), price: Number(form.price) });
    setForm(empty);
    setMessage("已儲存");
    load();
  };

  return (
    <>
      <h1 className="text-3xl font-bold">行程後台</h1>
      <form className="mt-4 grid max-w-xl gap-3" onSubmit={onSubmit}>
        <input name="title" placeholder="標題" value={form.title} onChange={onChange} required className="p-2" />
        <input name="place" placeholder="地點" value={form.place} onChange={onChange} required className="p-2" />
        <input name="days" type="number" value={form.days} onChange={onChange} required className="p-2" />
        <input name="price" type="number" value={form.price} onChange={onChange} required className="p-2" />
        <input name="intro" placeholder="簡介" value={form.intro} onChange={onChange} required className="p-2" />
        <button type="submit" className="rounded bg-teal-800 px-4 py-2 text-white">儲存</button>
      </form>
      <ul className="mt-6 grid gap-2">
        {tours.map((tour) => (
          <li key={tour.id} className="flex items-center gap-3">
            <span>{tour.title}</span>
            <button type="button" onClick={() => setForm({ ...tour, days: String(tour.days), price: String(tour.price) })}>編輯</button>
            <button type="button" onClick={() => deleteTour(tour.id).then(load)}>刪除</button>
          </li>
        ))}
      </ul>
      <p className="text-sm">{message}</p>
    </>
  );
}
```

{% note warning %}
**注意事項**
不要為了上線去架一台 json-server。線上列表來自 `tours.json`。後台頁在正式站保持「僅本機示範」。
{% endnote %}

# 佈上 GitHub Pages

GitHub Pages 的網址是 `https://帳號.github.io/倉庫名/`。Vite 預設把資源當成放在網域根目錄，所以要設定 `base`。重新整理 `/tours` 時，主機找不到那份檔案，要把 `index.html` 複製成 `404.html` 當入口。

## 前綴與指令

把 `lokitravel` 換成你的倉庫名。`basename` 要有開頭斜線、不要結尾斜線。本機 `pnpm dev` 的 `BASE_URL` 仍是 `/`。

```js vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/lokitravel/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { "/api": { target: "http://localhost:3000", rewrite: (path) => path.replace(/^\/api/, "") } },
  },
});
```

```jsx src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

```bash
pnpm add -D gh-pages
pnpm build
cp dist/index.html dist/404.html
pnpm exec gh-pages -d dist
```

倉庫要是公開的。GitHub 的 Settings → Pages 選 `gh-pages` 分支、資料夾 `/ (root)`。等一分鐘再開 `https://帳號.github.io/lokitravel/`。圖片路徑若 404，先查 `base` 與 `public/img/tours/` 是否一起被建進去。

## 驗收

結構與功能 50%、元件作業 30%、展示口述 20%。畫面好不好看不單獨計分。

| 檢查 | 過關 |
| --- | --- |
| 路由 | `/`、`/tours`、`/tours/:id`、`/booking` 都進得去 |
| 契約 id | `#site-header`、`#nav-toggle`、`#tour-list`、`#booking-form` 還在 |
| 列表 | 改地點或天數後張數有變 |
| 詳情 | 「我要報名」讓表單的 `tourId` 等於該團 |
| 報名 | 本機 Network 看得到 POST，body 四個欄位都在 |
| 後台 | 本機能新增、修改、刪除一筆；線上該頁寫僅本機 |
| 靜態站 | GitHub Pages 看得到主視覺與三張卡，不依賴 json-server |
| 口述 | 不看稿說明一個元件的資料從哪來 |

{% note info %}
**小技巧：展示順序**
先在本機從列表進詳情再送出報名，再開 GitHub Pages 走同一條瀏覽。口述挑 `TourList` 或 `TourDetail` 其中一個即可。
{% endnote %}

# 作業：結業站元件模板

這份作業就是洛奇旅行本身。交 `student/project/`，六個元件都掛在 `App` 上，並能指出每一個最後在哪一條路徑。

{% note success %}
**跟著做：**
1. 本機完成：篩選列表、開啟詳情、送出 `#booking-form`、在 `/admin` 改一筆行程。
2. `tours.json` 至少三筆、七個欄位都在。正式建置不向 json-server 要列表。
3. 佈上 GitHub Pages 後，首頁與 `/tours` 仍看得到。用繁中註解寫 `PROD` 時 `getTours` 為什麼改讀 JSON。不要裝 TypeScript，不要改欄位名稱。
{% endnote %}

# 本篇重點回顧

結業站是六個作業元件加上四條前台路由與本機 `/admin`。開發時用 json-server，建置後改讀 `tours.json`，報名在靜態站只留在瀏覽器。`base`、`basename` 與 `404.html` 讓 GitHub Pages 的子路徑打得開。展示時先走完本機報名，再打開線上靜態站，並講出一個元件的資料來源。
