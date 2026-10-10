---
title: "React（三）：Router、useParams、query 字串"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:12:00
---

![](assets/images/banner/react.png)

一次裝好 React Router，路徑鎖死 `/`、`/tours`、`/tours/:id`、`/booking`。詳情連報名時帶 `tourId`。今天**不要**做 `/admin`。用 `Link` 不要用會整頁重載的 `<a href>` 當站內主選單。

<!-- more -->

# SPA 與路由
還是那一份 `index.html`。Router 依網址決定渲染哪個頁面元件。開發伺服器要把未知路徑 fallback 回 index，否則重整 `/tours/2` 會 404。

```bash
pnpm add react-router
```

版本依課堂當時文件；套件管理用 pnpm。

# 一次貼上的路由表
一次改 `main.jsx`（或 `App.jsx`），對照契約，不要自己發明第五條前台。

```jsx main.jsx
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Tours from "./pages/Tours.jsx";
import Tour from "./pages/Tour.jsx";
import Booking from "./pages/Booking.jsx";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<Tour />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}
```

詳情連報名：

```jsx
<Link to={`/booking?tourId=${tour.id}`}>去報名</Link>
```

報名頁用 `useSearchParams` 讀 `tourId`，`<select>` 的 `value` 設成該 id。

| 網址 | 元件 | 重點 API |
| --- | --- | --- |
| `/` | 首頁 | `Link to="/tours"` |
| `/tours` | 列表 | 昨天的篩選 |
| `/tours/:id` | 詳情 | `useParams().id` |
| `/booking` | 表單 | `useSearchParams` 的 `tourId` |

Header 的站內連結一律 `Link`。元件根節點仍掛 `id="site-header"`，課堂對照規格時才找得到。

{% note primary %}
**練習規格**

請用 react-router 設定路徑 /、/tours、/tours/:id、/booking。
不要新增 /admin。不要改 tours 欄位名稱。
Booking 從 query 讀 tourId，下拉可有但預設已選。禁止在詳情頁 POST。
站內導覽用 Link。套件用 pnpm add。
{% endnote %}

{% note warning %}
**練習對照（課堂會講解答）**
- 重整 `/tours/2` 是否仍看得到頁面？
- 有沒有做成五個獨立 html？
- 報名預設團對不對？
- 詳情有沒有偷偷 fetch POST？
{% endnote %}

# 本篇重點回顧
四條路由能點。接著把 Tailwind 視覺遷過來，並用 `useEffect` fetch 本機 json-server。
