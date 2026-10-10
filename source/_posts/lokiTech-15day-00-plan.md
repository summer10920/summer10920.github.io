---
title: "在職前端 15 天計畫：旅行社網站（120 小時）"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 08:00:00
---

![網站開發爆炸圖：HTML、CSS、JavaScript、Tailwind、React 等前端技能樹](assets/images/banner/frontend-skill-tree.png)

這是 120 小時、15 天×8 小時的在職前端入門計畫。你會用 VS Code、Git、HTML、CSS、Tailwind、JavaScript、React 做出一個旅行社網站，深度停在看得懂、改得動、講得出來。VS Code、Git、HTML 的講義已經寫好，可直接上課。

<!-- more -->

# 課程目標與對象

這門課給沒有網頁底子的在職學員。技術要夠你審畫面、改元件、把專題佈上 GitHub Pages；不追求默寫框架，也不上 TypeScript。

## 你要帶走的能力

上完你能用語意 HTML 搭頁面骨架，用 CSS 與 Tailwind 做手機到桌機的版面，用 JavaScript 讀寫清單與表單，再用 React 把同一套旅行社頁面收成可部署的站。每天的練習都是期末站上的一塊元件，不是另開無關習題。

## 適合誰、先備是什麼

對象是初學前端的在職學員，15 天內要做出可展示的專題。你需要自備筆電、Google Chrome、GitHub 帳號，以及能安裝 VS Code、Git、Node.js LTS。不需要先會 HTML、jQuery 或 Bootstrap。站上舊的 jQuery、Bootstrap 教材仍保留，只當選讀參考，本課路徑不走那一套。

# 十五天課表

一天 8 小時，共 120 小時。第 1 天涵蓋兩篇已寫講義；第 2 天起一天一篇。檔名就是下面的連結。

## 每日時數與講義

| 日 | 時數 | 主題 | 講義 | 講義狀態 |
| --- | --- | --- | --- | --- |
| 1 | 8 | 網頁觀念、VS Code、Git、HTML 常用標籤 | {% post_link lokiTech-15day-01-intro %}、{% post_link lokiTech-15day-02-html-1 %} | 已寫 |
| 2 | 8 | 選擇器、盒模型、Flex／Grid、媒體查詢 | {% post_link lokiTech-15day-03-css-1 %} | |
| 3 | 8 | Node、pnpm、Vite、`package.json` | {% post_link lokiTech-15day-04-tailwind-1 %} | |
| 4 | 8 | Tailwind v4、utility class、卡片區 | {% post_link lokiTech-15day-05-tailwind-2 %} | |
| 5 | 8 | 斷點、漢堡選單、版心與圖片 | {% post_link lokiTech-15day-06-tailwind-3 %} | |
| 6 | 8 | 四頁切版與契約 id | {% post_link lokiTech-15day-07-tailwind-4 %} | |
| 7 | 8 | 官方 template、`const`、函式、陣列 | {% post_link lokiTech-15day-08-js-1 %} | |
| 8 | 8 | DOM、事件、列表重繪 | {% post_link lokiTech-15day-09-js-2 %} | |
| 9 | 8 | json-server、`fetch`、Network | {% post_link lokiTech-15day-10-js-3 %} | |
| 10 | 8 | Vite React、JSX、元件、`useState` | {% post_link lokiTech-15day-11-react-1 %} | |
| 11 | 8 | props、列表 `key`、狀態提升 | {% post_link lokiTech-15day-12-react-2 %} | |
| 12 | 8 | Router、`useParams`、query | {% post_link lokiTech-15day-13-react-3 %} | |
| 13 | 8 | `useEffect`、前台 fetch | {% post_link lokiTech-15day-14-react-4 %} | |
| 14 | 8 | Admin、tours 的 GET／POST／PUT／DELETE | {% post_link lokiTech-15day-15-react-5 %} | |
| 15 | 8 | GitHub Pages、`base`、靜態 JSON | {% post_link lokiTech-15day-16-react-6 %} | |

# 作業對到專題元件

每份作業是旅行社網站的一塊元件模板。交得出該日指定的標記或元件，並能指出它最後會放在哪一頁。

## 元件作業

| 作業 | 專題元件 | 做在哪一天 | 講義 |
| --- | --- | --- | --- |
| 頁首與導覽 | `SiteHeader`（`#site-header`、`#nav-toggle`） | 第 1 天語意骨架；第 5 天做成可開合的導覽 | {% post_link lokiTech-15day-02-html-1 %}、{% post_link lokiTech-15day-06-tailwind-3 %} |
| 首頁主視覺 | `Hero` | 第 6 天四頁切版的首頁 | {% post_link lokiTech-15day-07-tailwind-4 %} |
| 行程卡片列表 | `TourList`／`TourCard`（`#tour-list`） | 第 4 天卡片版；第 8 天用資料重繪；第 11 天拆成 React 元件 | {% post_link lokiTech-15day-05-tailwind-2 %}、{% post_link lokiTech-15day-09-js-2 %}、{% post_link lokiTech-15day-12-react-2 %} |
| 行程詳情 | `TourDetail` | 第 6 天靜態詳情頁；第 12 天改成 `/tours/:id` | {% post_link lokiTech-15day-07-tailwind-4 %}、{% post_link lokiTech-15day-13-react-3 %} |
| 報名表 | `BookingForm`（`#booking-form`） | 第 1 天表單欄位；第 9 天 POST；第 12 天接到 `/booking` | {% post_link lokiTech-15day-02-html-1 %}、{% post_link lokiTech-15day-10-js-3 %}、{% post_link lokiTech-15day-13-react-3 %} |
| 頁尾 | `SiteFooter` | 第 1 天語意 `footer`；第 6 天四頁共用 | {% post_link lokiTech-15day-02-html-1 %}、{% post_link lokiTech-15day-07-tailwind-4 %} |

# 期末專題

品牌用課堂契約裡的**洛奇旅行**：介紹、套裝行程、詳情、報名。用 React 與 Tailwind 完成，佈到 GitHub Pages。json-server 只在本機；線上改讀專案裡的 JSON。

## 頁面與資料

前台四條路由：`/` 首頁（主視覺）、`/tours` 行程列表、`/tours/:id` 詳情、`/booking` 報名。後台 `/admin` 只做行程的增刪改。列表可依 `place`、`days` 篩選。行程欄位：`id`、`title`、`place`、`days`、`price`、`image`、`intro`。報名欄位：`tourId`、`name`、`email`、`people`。詳情頁的按鈕把 `tourId` 帶到報名頁。

## 評分與展示

結構與功能 50%（路由、契約 id、列表、詳情、報名、本機能開的 admin）、元件作業 30%、展示口述 20%。第 15 天示範：本機走完報名，再開 GitHub Pages 上的靜態站，並不看稿說明一個元件的資料從哪來。線上 admin 標成僅本機示範即可。畫面好不好看不單獨計分。

# 工具與環境

開發用 VS Code、Chrome、Git。第 3 天起用 Node.js LTS、pnpm、Vite；Tailwind 用 v4。React 用 JavaScript，不裝 TypeScript。作業區是隨課 repo 的學期分支，不是這個講義站。

## 排版與檢查

第 1 天只裝建議套件，並開啟工作區的存檔排版。`practice/` 用 HTMLHint，不放 ESLint。第一次 `create-vite`（Tailwind 那天）才在專案放 `.prettierrc`（2 空格，分號與引號全班同一套）。React 專案再加 ESLint 與 `eslint-config-prettier`。規則寫在專案裡，不寫進個人的 `settings.json`。

# 本篇重點回顧

15 天、每天 8 小時，從已寫好的 VS Code／Git／HTML 走到 React + Tailwind 的旅行社網站，並佈上 GitHub Pages。六份作業分別是頁首導覽、主視覺、行程卡片、行程詳情、報名表、頁尾。舊的 jQuery／Bootstrap 教材留著當選讀；這條路徑不上 TypeScript。
