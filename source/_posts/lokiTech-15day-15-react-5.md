---
title: "React（五）：Admin、tours REST（GET／POST／PUT／DELETE）"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:14:00
---

![](assets/images/banner/react.png)

新增 `/admin`，只做 **tours** 增刪改。表單 id 必須是 `admin-tour-form`。一次做出列表＋表單，再對 REST 表與 F12 Network 對照練習怎麼做。不做登入、不做 bookings 後台、不做訂房日曆。

<!-- more -->

# REST 對照
json-server 已提供這些網址。複習：GET 拿、POST 新增、PUT／PATCH 改、DELETE 刪。

| 動作 | 方法 | 網址 | body |
| --- | --- | --- | --- |
| 列表 | GET | `/tours` | 無 |
| 新增 | POST | `/tours` | JSON 七欄（id 可讓伺服器生） |
| 修改 | PUT | `/tours/:id` | 整筆物件 |
| 刪除 | DELETE | `/tours/:id` | 無 |

# 一次成形的後台骨架
路由加上 `<Route path="/admin" element={<Admin />} />`。頁內：

```jsx Admin.jsx
<form id="admin-tour-form" onSubmit={onSubmit}>
  <label>
    標題
    <input name="title" value={form.title} onChange={onChange} required />
  </label>
  {/* place, days, price, image, intro 同理 */}
  <button type="submit">儲存</button>
</form>
```

編輯時把該列資料填進同一表單（受控元件：`value`＋`onChange`）。刪除成功後重新 GET 列表，畫面才會更新。

{% note primary %}
**練習規格**

新增 /admin。頁內表單 id 必須是 admin-tour-form。
對 http://localhost:3000/tours 做 GET/POST/PUT/DELETE。
不要做登入。不要改前台四條路由。不要 Firebase。不要日曆訂房。pnpm。
{% endnote %}

{% note warning %}
**練習對照（課堂會講解答）**
- 刪除後列表有沒有更新？
- 有沒有改到 bookings schema？
- `#admin-tour-form` 還在嗎？
- 有沒有做成訂房日曆？
{% endnote %}

# 本篇重點回顧
本機後台能改六團資料。接著靜態上線：json-server 不能跟著上 GitHub Pages。
