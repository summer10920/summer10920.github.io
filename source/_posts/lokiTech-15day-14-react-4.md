---
title: "React（四）：useEffect、前台 fetch、載入與錯誤"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:13:00
---

![](assets/images/banner/react.png)

把老師 template 的 Tailwind／RWD class 一次遷到各頁元件。前台改成 fetch：GET `/tours`、GET `/tours/:id`、POST `/bookings`。開發時 json-server 仍在本機。不要在 render 函式本體無條件狂打 API。

<!-- more -->

# 副作用
元件函式每次重繪都會執行。若在函式一進來就 `fetch`，會打爆伺服器。`useEffect(() => { ... }, [id])` 表示「畫完之後、在依賴變更時再跑」。開發 StrictMode 可能跑兩次，先認識、不要為此改用錯誤的全域旗標黑魔法。

# 一次換成 fetch 的列表
常數資料改成下面這種形狀即可（網址依你的 proxy 調整）。錯誤要**畫出來**，不要只 `console.log`。

```jsx Tours.jsx
useEffect(() => {
  let cancelled = false;
  setStatus("loading");
  fetch("http://localhost:3000/tours")
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((data) => {
      if (!cancelled) {
        setTours(data);
        setStatus("ok");
      }
    })
    .catch((e) => {
      if (!cancelled) setStatus(String(e));
    });
  return () => {
    cancelled = true;
  };
}, []);
```

詳情頁依賴 `[id]` 再 GET `/tours/${id}`。報名 `onSubmit` 裡 `preventDefault`，`POST` JSON：`tourId, name, email, people`，`Content-Type: application/json`。

| 頁 | 請求 | 失敗時 |
| --- | --- | --- |
| 列表 | GET `/tours` | 顯示文字，不要空白 |
| 詳情 | GET `/tours/:id` | 找不到團要說清楚 |
| 報名 | POST `/bookings` | 用 Network 看 201／400 |

遷 class 時對照 template：版心 `max-w-6xl`、卡片 `grid`、漢堡 id 仍在 Header 元件。

{% note primary %}
**練習規格**

請把靜態 tours 常數改成 fetch http://localhost:3000/tours。
保留篩選 UX 與 RWD class。錯誤顯示在畫面上。不要裝 React Query。不要改欄位名。pnpm。
Booking POST 欄位 tourId, name, email, people。
{% endnote %}

{% note warning %}
**練習對照（課堂會講解答）**
- 有沒有在 `map` 裡直接 fetch？
- RWD 斷點還在嗎？
- POST 欄位與 Content-Type 齊不齊？
- 載入中有沒有狀態？
{% endnote %}

# 本篇重點回顧
本機 Vite + json-server，前台走真實 API。接著 `/admin` 做 tours 的增刪改。
