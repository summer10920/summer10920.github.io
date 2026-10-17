---
title: "React：讀取資料、表單、路由與組合"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:09:00
---

![](assets/images/banner/react.png)

行程列表目前還寫死在 `tours.js`。這篇在同一個 `student/react/` 加上路由，用 `useEffect` 跟本機 API 拿行程，再用受控表單送出報名。四個頁面由頁首、主內容、頁尾拼起來，就是洛奇旅行的前台骨架。

<!-- more -->

# 取得素材

沿用 `student/react/` 的 `TourFilters`、`TourList`、`TourCard`。這篇新增路由、API 與兩個頁面元件。一個終端機跑 Vite，另一個跑 json-server。瀏覽器開 Vite 印出的 Local URL。

## 套件與假 API

`react-router-dom` 負責頁面網址。json-server 鎖定 0.17，讀 `db.json` 做出 `/tours` 與 `/bookings`。`package.json` 的 `scripts` 加上 `"api": "json-server --watch db.json --port 3000"`。

```bash
pnpm add react-router-dom
pnpm add -D json-server@0.17.4
```

Vite 與 API 不同來源。proxy 把頁面上的 `/api` 轉到 3000，並拿掉前綴。React 與 Tailwind 插件留著。

```js vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { "/api": { target: "http://localhost:3000", rewrite: (path) => path.replace(/^\/api/, "") } },
  },
});
```

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

```js src/api.js
export const getTours = async () => {
  const response = await fetch("/api/tours");
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const getTour = async (id) => {
  const response = await fetch("/api/tours/" + id);
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

## 要開的檔

下面這些檔從這篇複製進 `student/react/src/`。篩選、列表、卡片維持原檔，只在卡片標題補上通往詳情的 `Link`。`pnpm dev` 與 `pnpm api` 兩個指令分開會話執行。

| 檔案 | 是什麼 |
| --- | --- |
| `src/main.jsx` | 用 `BrowserRouter` 包住 `App` |
| `src/App.jsx` | 頁首、四條路由、頁尾 |
| `src/SiteHeader.jsx` | `#site-header` |
| `src/SiteFooter.jsx` | 頁尾 |
| `src/HomePage.jsx` | `/` 主視覺 |
| `src/ToursPage.jsx` | `/tours` |
| `src/TourDetailPage.jsx` | `/tours/:id` |
| `src/BookingForm.jsx` | `#booking-form` |
| `src/api.js` | GET 行程、POST 報名 |

# 認識讀取資料

元件函式每次重畫都會再跑一次。若在函式一進來就 `fetch`，每次重畫都會打 API。`useEffect` 把這件事留到畫完之後，並用依賴陣列決定何時再跑。開發時的 `StrictMode` 可能讓 effect 跑兩次，先認得這個現象即可。

## 列表

依賴陣列寫 `[]`，表示只在這個頁面掛上時抓一次。`cancelled` 在元件卸載時改成 true，晚到的回應就不要再 `setState`。讀取中與失敗都要畫在畫面上。F12 的 Network 看得到 `GET /api/tours`。

```jsx src/ToursPage.jsx
import { useEffect, useState } from "react";
import { getTours } from "./api.js";
import TourFilters from "./TourFilters.jsx";
import TourList from "./TourList.jsx";

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [status, setStatus] = useState("loading");
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");

  useEffect(() => {
    let cancelled = false;
    getTours()
      .then((data) => {
        if (!cancelled) {
          setTours(data);
          setStatus("ok");
        }
      })
      .catch((error) => {
        if (!cancelled) setStatus(String(error));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") return <p>載入中</p>;
  if (status !== "ok") return <p>讀取失敗：{status}</p>;

  const visible = tours.filter((tour) => (!place || tour.place === place) && (!days || String(tour.days) === days));
  return (
    <>
      <h1 className="text-3xl font-bold">套裝行程</h1>
      <TourFilters place={place} days={days} onPlace={setPlace} onDays={setDays} />
      <TourList tours={visible} />
    </>
  );
}
```

{% note warning %}
**注意事項**
不要在 `map` 裡呼叫 `fetch`。不要為了這份列表安裝 React Query。欄位仍是 `id`、`title`、`place`、`days`、`price`、`image`、`intro`。
{% endnote %}

## 詳情

網址 `/tours/1` 的 `1` 用 `useParams()` 取出，放進依賴陣列 `[id]`。換一筆行程時 effect 會再跑。`response.ok` 為 false（例如 404）時，畫面上寫找不到這團。

```jsx src/TourDetailPage.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTour } from "./api.js";

export default function TourDetailPage() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getTour(id)
      .then((data) => {
        if (!cancelled) {
          setTour(data);
          setStatus("ok");
        }
      })
      .catch((error) => {
        if (!cancelled) setStatus(String(error));
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") return <p>載入中</p>;
  if (status !== "ok") return <p>找不到這團：{status}</p>;

  return (
    <article>
      <img className="h-56 w-full rounded-xl object-cover" src={tour.image} alt={tour.title} />
      <h1 className="mt-4 text-3xl font-bold">{tour.title}</h1>
      <p className="mt-2">{tour.place} · {tour.days} 天 · NT${tour.price}</p>
      <p className="mt-2">{tour.intro}</p>
      <Link className="mt-6 inline-block rounded bg-teal-800 px-4 py-2 text-white" to={"/booking?tourId=" + tour.id}>我要報名</Link>
    </article>
  );
}
```

# 認識表單、路由與組合

表單的值放在 state，畫面跟著 state 走，這叫受控輸入。路由決定網址對到哪個頁面元件。`App` 再把頁首、該頁、頁尾組成一整站。

## 受控輸入

`value` 讀 state，`onChange` 把 `event.target.value` 寫回去。送出時先 `preventDefault`，否則瀏覽器會整頁刷新。POST 的 JSON 只有四個欄位：`tourId`、`name`、`email`、`people`。`Content-Type` 要是 `application/json`。人數與編號在輸入框裡是字串，送出前用 `Number` 轉成數字。

```jsx src/BookingForm.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createBooking } from "./api.js";

export default function BookingForm() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ tourId: params.get("tourId") ?? "1", name: "", email: "", people: "1" });
  const [message, setMessage] = useState("");
  const onChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("送出中");
    try {
      await createBooking({ tourId: Number(form.tourId), name: form.name, email: form.email, people: Number(form.people) });
      setMessage("已送出");
    } catch (error) {
      setMessage(String(error));
    }
  };

  return (
    <form id="booking-form" className="grid max-w-xl gap-3" onSubmit={onSubmit}>
      <label>行程編號 <input name="tourId" type="number" value={form.tourId} onChange={onChange} required className="mt-1 block w-full p-2" /></label>
      <label>姓名 <input name="name" type="text" value={form.name} onChange={onChange} required className="mt-1 block w-full p-2" /></label>
      <label>Email <input name="email" type="email" value={form.email} onChange={onChange} required className="mt-1 block w-full p-2" /></label>
      <label>人數 <input name="people" type="number" min="1" value={form.people} onChange={onChange} required className="mt-1 block w-full p-2" /></label>
      <button type="submit" className="rounded bg-teal-800 px-4 py-2 text-white">送出報名</button>
      <p className="text-sm">{message}</p>
    </form>
  );
}
```

詳情按鈕用查詢字串把 `tourId` 帶到 `/booking`。表單一開始就讀 `params.get("tourId")`，欄位仍可改。

## 簡單路由

`BrowserRouter` 放在 `main.jsx`，包住整個 `App`。`Routes` 裡每一條 `Route` 的 `path` 對一個元件。站內連結用 `Link`，`to` 寫路徑。前台這四條就夠：`/`、`/tours`、`/tours/:id`、`/booking`。

```jsx src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

```jsx src/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="rounded-xl bg-teal-800 px-6 py-16 text-white">
      <h1 className="text-4xl font-bold">洛奇旅行</h1>
      <p className="mt-3">城市散步、山海與社寺。</p>
      <Link className="mt-6 inline-block rounded bg-white px-4 py-2 text-teal-900" to="/tours">看行程</Link>
    </section>
  );
}
```

```jsx src/SiteHeader.jsx
import { Link } from "react-router-dom";

export default function SiteHeader() {
  return (
    <header id="site-header" className="border-b">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="font-semibold">洛奇旅行</Link>
        <button id="nav-toggle" type="button" className="ml-auto sm:hidden">選單</button>
        <nav className="flex gap-4 text-sm">
          <Link to="/">首頁</Link>
          <Link to="/tours">行程</Link>
          <Link to="/booking">報名</Link>
        </nav>
      </div>
    </header>
  );
}
```

```jsx src/SiteFooter.jsx
export default function SiteFooter() {
  return <footer className="border-t py-6 text-center text-sm">洛奇旅行</footer>;
}
```

| 路徑 | 元件 | 資料 |
| --- | --- | --- |
| `/` | `HomePage` | 靜態主視覺 |
| `/tours` | `ToursPage` | GET `/tours` |
| `/tours/:id` | `TourDetailPage` | GET `/tours/:id` |
| `/booking` | `BookingForm` | POST `/bookings` |

## 元件組合

`App` 決定每一頁外層都有頁首與頁尾，中間換路由元件。列表頁再組合篩選與卡片；詳情頁組合圖片、文字與報名連結。子元件透過 props 或路由參數拿資料，不自己再抓一份清單。

```jsx src/App.jsx
import { Route, Routes } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import HomePage from "./HomePage.jsx";
import ToursPage from "./ToursPage.jsx";
import TourDetailPage from "./TourDetailPage.jsx";
import BookingForm from "./BookingForm.jsx";

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
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
```

{% mermaid graph TD %}
App["App"] --> header["SiteHeader"]
App --> routes["Routes"]
App --> footer["SiteFooter"]
routes --> home["HomePage"]
routes --> tours["ToursPage"]
routes --> detail["TourDetailPage"]
routes --> booking["BookingForm"]
tours --> list["TourList"]
{% endmermaid %}

{% note info %}
**小技巧：卡片連到詳情**
在 `TourCard` 的標題外包一層 `Link`，`to={"/tours/" + tour.id}`。列表仍用 `key={tour.id}`。`/admin` 與上線佈署留到結業專案。
{% endnote %}

# 作業：旅行社前台骨架

這份作業是期末站的元件模板。`TourDetailPage` 放在 `/tours/:id`，`BookingForm` 放在 `/booking`，頁首的連結要能走進四條路由。

{% note success %}
**跟著做：**
1. `pnpm dev` 與 `pnpm api` 同時開著。`/tours` 的資料來自 `useEffect`，失敗時畫面上有文字。
2. 打開 `/tours/1`，按「我要報名」後，`#booking-form` 的行程編號是 `1`。送出後 Network 看得到 POST，body 含 `tourId`、`name`、`email`、`people`。
3. 用繁中註解寫 fetch 為什麼放在 `useEffect`。不要裝 TypeScript、React Query，不要改欄位名稱，不要做登入或 `/admin`。
{% endnote %}

# 本篇重點回顧

`useEffect` 在畫完後依依賴陣列讀資料，列表依賴 `[]`，詳情依賴 `[id]`。受控輸入用 `value` 與 `onChange` 對到同一份 state，送出前記得 `preventDefault`。`BrowserRouter`、`Routes`、`Route`、`Link` 把首頁、列表、詳情、報名拼進 `App`。結業專案再補後台與 GitHub Pages。
