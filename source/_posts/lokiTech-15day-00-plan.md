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

這是約 120 小時的在職前端入門計畫，依階段排，不鎖死每天 8 小時。你會用 VS Code、Git、HTML、CSS、Tailwind、JavaScript、React 做出旅行社網站，深度停在看得懂、改得動、講得出來。各階段講義在下面的表，檔名就是連結。

<!-- more -->

# 課程目標與對象

這門課給沒有網頁底子的在職學員。技術要夠你審畫面、改元件、把專題佈上 GitHub Pages；不追求默寫框架，也不上 TypeScript。

## 你要帶走的能力

上完你能用語意 HTML 搭頁面骨架，用 CSS 與 Tailwind 做手機到桌機的版面，用 JavaScript 讀寫清單與表單，再用 React 把同一套旅行社頁面收成可部署的站。各階段練習都是期末站上的一塊元件，不是另開無關習題。

## 適合誰、先備是什麼

對象是初學前端的在職學員，課期內要做出可展示的專題。你需要自備筆電、Google Chrome、GitHub 帳號，以及能安裝 VS Code、Git、Node.js LTS。不需要先會 HTML。站上舊的 jQuery、Bootstrap 教材只當選讀，本課路徑不走那一套。

# 階段課表

合計約 120 小時。時數是階段估時，可依進度前後挪。檔名就是下面的連結。

## 階段、時數與講義

| 階段 | 約略時數 | 主題 | 講義 |
| --- | --- | --- | --- |
| 1 工具與 HTML | ~24h | VS Code、Git／GitHub、語意標籤、表單、a11y | {% post_link lokiTech-15day-01-tools %}、{% post_link lokiTech-15day-02-html %} |
| 2 CSS 基礎 | ~16h | 選擇器、盒模型、Flex、Grid、RWD | {% post_link lokiTech-15day-03-css %} |
| 3 Tailwind | ~8h | utilities、RWD、dark mode、改寫先前頁面、公式表 | {% post_link lokiTech-15day-04-tailwind %}、{% post_link lokiTech-15day-05-tailwind-cheatsheet %} |
| 4 JavaScript | ~32h | 變數、函式、陣列／物件、DOM／事件、fetch／async、modules、小練習 | {% post_link lokiTech-15day-06-js-basics %}、{% post_link lokiTech-15day-07-js-dom %}、{% post_link lokiTech-15day-08-js-async %} |
| 5 React | ~24h | Vite、元件／props、state、effect、列表／表單、簡單路由 | {% post_link lokiTech-15day-09-react-basics %}、{% post_link lokiTech-15day-10-react-advanced %} |
| 6 結業專案 | ~16h | 規劃、元件組裝、API、佈署 GitHub Pages、demo | {% post_link lokiTech-15day-11-project-travel %} |

# 作業對到專題元件

每份作業是旅行社網站的一塊元件模板。交得出該階段指定的標記或元件，並能指出它最後會放在哪一頁。不上 TypeScript。

## 元件作業

| 作業 | 專題元件 | 做在哪一階段 | 講義 |
| --- | --- | --- | --- |
| 頁首與導覽 | `SiteHeader`（`#site-header`、`#nav-toggle`） | 階段 1 語意骨架；階段 3 可開合導覽 | {% post_link lokiTech-15day-02-html %}、{% post_link lokiTech-15day-04-tailwind %} |
| 首頁主視覺 | `Hero` | 階段 3 改寫先前頁面 | {% post_link lokiTech-15day-04-tailwind %} |
| 行程卡片列表 | `TourList`／`TourCard`（`#tour-list`） | 階段 2 手寫卡片；階段 3 utility 卡片；階段 4 資料與重繪；階段 5 拆成 React 元件 | {% post_link lokiTech-15day-03-css %}、{% post_link lokiTech-15day-04-tailwind %}、{% post_link lokiTech-15day-06-js-basics %}、{% post_link lokiTech-15day-07-js-dom %}、{% post_link lokiTech-15day-09-react-basics %} |
| 行程詳情 | `TourDetail` | 階段 3 靜態詳情；階段 5 改成 `/tours/:id` | {% post_link lokiTech-15day-04-tailwind %}、{% post_link lokiTech-15day-10-react-advanced %} |
| 報名表 | `BookingForm`（`#booking-form`） | 階段 1 表單欄位；階段 4 POST；階段 5 接到 `/booking` | {% post_link lokiTech-15day-02-html %}、{% post_link lokiTech-15day-08-js-async %}、{% post_link lokiTech-15day-10-react-advanced %} |
| 頁尾 | `SiteFooter` | 階段 1 語意 `footer`；階段 3 各頁共用 | {% post_link lokiTech-15day-02-html %}、{% post_link lokiTech-15day-04-tailwind %} |

# 期末專題

品牌用課堂契約裡的**洛奇旅行**：介紹、套裝行程、詳情、報名。用 React 與 Tailwind 完成，佈到 GitHub Pages。json-server 只在本機；線上改讀專案裡的 JSON。

## 頁面與資料

前台四條路由：`/` 首頁（主視覺）、`/tours` 行程列表、`/tours/:id` 詳情、`/booking` 報名。後台 `/admin` 只做行程的增刪改。列表可依 `place`、`days` 篩選。行程欄位：`id`、`title`、`place`、`days`、`price`、`image`、`intro`。報名欄位：`tourId`、`name`、`email`、`people`。詳情頁的按鈕把 `tourId` 帶到報名頁。

## 評分與展示

結構與功能 50%（路由、契約 id、列表、詳情、報名、本機能開的 admin）、元件作業 30%、展示口述 20%。結業階段示範：本機走完報名，再開 GitHub Pages 上的靜態站，並不看稿說明一個元件的資料從哪來。線上 admin 標成僅本機示範即可。畫面好不好看不單獨計分。

# 工具與環境

開發用 VS Code、Chrome、Git。Tailwind 階段起用 Node.js LTS、pnpm、Vite；Tailwind 用 v4。React 用 JavaScript，不裝 TypeScript。作業區是隨課 repo 的學期分支，不是這個講義站。

## 排版與檢查

工具階段只裝建議套件，並開啟工作區的存檔排版。`practice/` 用 HTMLHint，不放 ESLint。第一次 `create-vite`（Tailwind 階段）才在專案放 `.prettierrc`（2 空格，分號與引號全班同一套）。React 專案再加 ESLint 與 `eslint-config-prettier`。規則寫在專案裡，不寫進個人的 `settings.json`。

# 本篇重點回顧

約 120 小時分成六個階段：工具與 HTML、CSS、Tailwind、JavaScript、React、結業專案，最後佈上 GitHub Pages。六份作業分別是頁首導覽、主視覺、行程卡片、行程詳情、報名表、頁尾。舊的 jQuery／Bootstrap 教材留著當選讀；這條路徑不上 TypeScript。
