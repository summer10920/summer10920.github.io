---
title: "React（二）：props、列表 key、狀態提升"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:11:00
---

![](assets/images/banner/react.png)

從老師 template 的 HTML 對照，一次拆出 Header、TourCard、TourFilters。資料先用常數。props 往下傳資料，篩選的 state 放父層。不要 Redux、不要多頁 html、不要 Router（下一章才裝）。

<!-- more -->

# props 與列表
父元件把一筆 tour **當參數**傳進子元件，子元件用 `props`（或解構）顯示。列表要用 `key={tour.id}`，不要用陣列 index 當唯一解（資料有穩定 id）。

事件往上：小孩說「使用者改了下拉」，父母改 state、再把過濾後的陣列往下傳。這叫狀態提升。

# 一次給齊的拆法
一次產出三個檔，對照下表，不要從一個 App 慢慢剪貼 20 次。今天可用常數六團（與 `db.json` 相同欄位）。

```jsx TourCard.jsx
export default function TourCard({ tour }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow">
      <img src={tour.image} alt={tour.title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h2 className="font-semibold">{tour.title}</h2>
        <p className="text-sm">
          {tour.place} · {tour.days} 天 · NT${tour.price}
        </p>
      </div>
    </article>
  );
}
```

```jsx TourFilters.jsx
export default function TourFilters({ place, days, onPlace, onDays }) {
  return (
    <form id="tour-filters" className="flex flex-col gap-3 sm:flex-row">
      <label className="text-sm">
        地點
        <select className="mt-1 block w-full p-2" value={place} onChange={(e) => onPlace(e.target.value)}>
          <option value="">全部</option>
          <option>台北</option>
          <option>花蓮</option>
          <option>京都</option>
        </select>
      </label>
      <label className="text-sm">
        天數
        <select className="mt-1 block w-full p-2" value={days} onChange={(e) => onDays(e.target.value)}>
          <option value="">全部</option>
          <option value="3">3 天</option>
          <option value="4">4 天</option>
          <option value="5">5 天</option>
        </select>
      </label>
    </form>
  );
}
```

父層概念（不必手打到完美，但 F12／程式要對得上）：

```jsx App.jsx
const visible = tours.filter(
  (t) => (!place || t.place === place) && (!days || String(t.days) === days)
);
```

然後 `{visible.map((tour) => <TourCard key={tour.id} tour={tour} />)}` 放進帶 `id="tour-list"` 的容器。

| 元件 | 負責 | state 放哪 |
| --- | --- | --- |
| 父頁（例如 ToursPage） | 資料陣列、篩選條件、map | `place`／`days` 在這裡 |
| `TourFilters` | 兩個下拉 | 沒有自己的「正式來源」，用 props |
| `TourCard` | 一張卡的長相 | 不該自己再 fetch |

{% note primary %}
**練習規格**

請把行程卡片拆成 TourCard.jsx，篩選拆成 TourFilters.jsx。
tours 資料形狀必須含 id, title, place, days, price, image, intro。
列表 key 用 tour.id。篩選 state 放父層。不要裝 router、不要 Redux。pnpm。
{% endnote %}

{% note warning %}
**練習對照（課堂會講解答）**
- key 是 id 還是 index？
- 改下拉時，所有卡片是否一起變（state 是否在父層）？
- 有沒有又變回很多個 html 檔？
- 欄位名有沒有被改掉？
{% endnote %}

# 本篇重點回顧
列表＋篩選在 React 裡能動。接著加 Router 四條前台路徑。
