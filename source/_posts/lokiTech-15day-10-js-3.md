---
title: "JavaScript（三）：json-server、fetch GET／POST、Network"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:09:00
---

![](assets/images/banner/js.png)

本機假 API 只用 **json-server**。種子資料用 `starter-data/db.json`（template 裡也有一份）。前台 GET 列表／詳情、POST 報名。後台增刪改等到 React 的 `/admin`。上線不能帶 json-server 走，那是 GitHub Pages 篇章的題。

<!-- more -->

# HTTP 與 JSON
瀏覽器跟 API 說話：方法（GET 拿、POST 新增）＋網址＋（有時）body。JSON 是文字格式的資料，長得像 JS 物件。`Content-Type: application/json` 告訴對方 body 是 JSON；漏掉這行是 POST 失敗的常見原因。

`/tours` 給列表與之後後台；`/bookings` 給報名。圖片欄位是 repo 內路徑，教室可離線。

# json-server
它讀一份 `db.json`，自動做出 REST 風格網址。複製種子檔到專案，`package.json` 加 script，例如：

```json
"api": "json-server --watch db.json --port 3000"
```

Vite 一個終端機、`pnpm api` 另一個。兩個 port 不同時，瀏覽器可能擋跨來源（CORS）。課堂解法用 Vite `server.proxy` 把 `/api` 轉到 3000，或依老師示範的寫法——重點是你講得出「前端網址」和「API 網址」不是同一個。

# fetch
```js script.js
const data = await fetch("http://localhost:3000/tours").then((r) => {
  if (!r.ok) throw new Error(r.status);
  return r.json();
});
```

除錯請看 **完整** 狀態碼、response 本文、終端機錯誤，不要只說「不能動」。

篩選可以打 query，也可以 GET 全部再沿用昨天的 `filter`。詳情用 `find` 或 GET `/tours/1`。表單 POST 後不要在詳情頁送出。

{% note primary %}
**練習規格**

請只改 fetch 相關程式。API 根網址用 `http://localhost:3000`（若已設 proxy 則依專案實際路徑）。
GET /tours 填 #tour-list。GET /tours/:id 填詳情頁。
#booking-form submit 時 POST /bookings，Content-Type application/json，欄位 tourId, name, email, people。
禁止 Firebase、Apps Script、JSONPlaceholder。禁止寫入任何金鑰。
{% endnote %}

{% note danger %}
json-server **只在本機**。GitHub Pages 沒有這個行程伺服器。GitHub Pages 篇章會改讀打包進專案的 JSON，或註明 API Demo 僅本機。
{% endnote %}

{% note warning %}
**練習對照（課堂會講解答）**
- 有沒有狂裝多套 HTTP 庫？（課堂用 fetch 即可）
- POST 有沒有 `Content-Type`？
- 詳情頁有沒有錯誤地直接 POST？
- GET 與 POST 差別講得出嗎？
- Network 裡請求是成功還是 404／500？
{% endnote %}

# 本篇重點回顧
本機兩開（Vite + API），列表與報名走真實請求。

接著**不要改小專題本體**，另開 Vite React 專案練 `useState`。這一章的 fetch 觀念，切版銜接 React 時會再搬進去。
