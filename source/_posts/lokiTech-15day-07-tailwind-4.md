---
title: "Tailwind（四）：四頁切版、官方截圖、契約 id"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:06:00
---

![](assets/images/banner/html5.png)

依官方截圖切四頁練習版。這是結訓前小專題的題目（旅行社官網，內部資料夾名叫 `loki-travel-template`），用來練「看圖對規格」，不是課程主軸。配色與短文案可以跟同學不一樣，但頁數、檔名、id 必須對契約。**下一章會改用老師統一的 RWD template**，這份自切版先封存即可。

<!-- more -->

# 這四頁在做什麼
練習題是旅行社官網：介紹、列出套裝行程、看詳情、到**第四頁**填報名。沒有住房日曆、沒有郵輪艙位、沒有露營劃位。列表可依 `place`、`days` 篩選，**沒有**剩餘名額欄位。

四頁分工：

| 檔名 | 這一頁給使用者做什麼 |
| --- | --- |
| `index.html` | 認識品牌、導去行程 |
| `tours.html` | `#tour-filters` 篩選、`#tour-list` 卡片 |
| `tour.html` | 一團詳情；CTA 連到報名並帶 `tourId` |
| `booking.html` | `#booking-form`；預設已選該團 |

詳情頁**不要**直接 POST。報名頁網址例如 `booking.html?tourId=1`。Query 字串（`?` 後面）之後 JS 會讀；這一章靜態連過去即可。

# 怎麼看官方截圖
隨課 repo 的 `screenshots/desktop` 與 `screenshots/mobile` 是同一套四頁。切版時兩種寬度都要交代，不要只做桌機。看圖即可，不必接設計稿工具。

看圖時先列「區塊清單」再動手：頁首、主視覺、卡片列、表單欄位。不要先追求「酷一點」。

# 本章契約
- 四個檔名不可改
- id：`#site-header`、`#nav-toggle`、`#tour-list`、`#tour-filters`、`#booking-form`
- 技術：HTML + Tailwind（練習可用 CDN，之後會換成 Vite 專案）
- 繁中；不要額外 UI 套件；不要第五頁；不要後台
- 圖片盡量用 repo 內路徑概念，不要依賴會掛的外網圖當唯一來源

{% note primary %}
**練習規格**

你要依 screenshots 資料夾的桌機與手機圖，切四頁靜態站（旅行社小專題）。
必須四個檔名：index.html、tours.html、tour.html、booking.html。
必須保留 id：site-header、nav-toggle、tour-list、tour-filters、booking-form。
繁中文案。不要安裝額外 UI 套件。不要做日曆訂房。不要做後台。
篩選區放在 #tour-filters，卡片列表放在 #tour-list。
詳情頁連到 booking.html 並帶 tourId，不要在詳情頁送出表單。
{% endnote %}

結構對得上之後，才准在契約內改配色與短文案。

{% note warning %}
**練習對照（課堂會講解答）**
- 四個檔都在嗎？
- 檢查元素找得到全部契約 id 嗎？
- 手機寬度選單與排版有沒有顧到（不是只有桌機）？
- 有沒有多做第五頁或後台？
- 詳情有沒有錯誤地直接送出報名？
{% endnote %}

反面：「參考截圖做一個更酷的產品網站」——頁數與路由會炸。

# 本篇重點回顧
練習版放自己的資料夾即可。官方截圖在 `screenshots/`。

接著改用 `loki-travel-template/`（Vite + Tailwind + RWD）。請把這一章的成品當練習封存，不要帶分叉檔名進 JS。
