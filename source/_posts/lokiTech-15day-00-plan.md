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

這是約 120 小時（15 天 × 8 小時）的在職前端入門計畫：從 HTML、CSS、Tailwind、JavaScript 學到 React 與 React Router，最後做出一個多頁的旅行社網站。課程不鎖死每天的內容，依階段與時數推進；深度停在看得懂、改得動、講得出來。

<!-- more -->

# 課程目標與對象

這門課給沒有網頁底子的在職學員。目標是學完能讀懂一個 React 專案、依需求修改，並說得出每一塊程式為什麼這樣寫；不追求默寫框架，也不教 TypeScript。

## 你要帶走的能力

上完課你能用語意化的 HTML 搭出頁面骨架，用 CSS 與 Tailwind 做出手機到桌機都能看的版面，用 JavaScript 處理資料、清單與表單，再用 React 與 React Router 把這些收成一個多頁網站。

## 適合誰、先備是什麼

對象是初學前端的在職學員。需要自備筆電、Google Chrome 與 GitHub 帳號，並能安裝 VS Code、Git 與 Node.js。不需要先會 HTML。站上舊的 jQuery、Bootstrap 教材只當選讀，本課路徑不走那一套。

# 課程如何進行

這一節說明課堂怎麼上、哪些內容一定會講、哪些留給自學。

## 上課方式

講師不在課堂上現場打程式。每個範例都是練習 repo 裡一份完整、可以直接執行的檔案，講師把它複製進 VS Code，執行後講解背後的觀念。學員可以自己 fork 練習 repo、讀程式、改一改再執行，也可以請 Claude Code 這類 AI 助手當家教。

## 主線與選讀

每篇講義分成主線與選讀兩種內容。

- 主線：基本觀念，加上最後的結業專案會用到的內容。主線全部加起來要在 120 小時內講完。
- 選讀：標題以「選讀：」開頭。上課不講，留給你回家自己讀。

後面章節如果用到選讀的內容，會在那裡放一句提示與連結，需要時再跳回去看。Tailwind 公式表與 Firebase 篇整篇都是選讀。

## 階段、時數與講義

下面的時數是預估，可依進度前後挪動；合計 120 小時，含約 6 小時的緩衝。

- 工具與 HTML，約 12 小時：{% post_link lokiTech-15day-01-tools %}、{% post_link lokiTech-15day-02-html %}。VS Code、Git 與 GitHub、語意標籤、表單、無障礙。
- CSS，約 12 小時：{% post_link lokiTech-15day-03-css %}。選擇器、盒模型、Flex、Grid、響應式版面。
- Tailwind，約 8 小時：{% post_link lokiTech-15day-04-tailwind %}。工具類別、響應式、深色模式、自訂主題；速查表 {% post_link lokiTech-15day-05-tailwind-cheatsheet %} 是選讀附錄，不佔上課時間。
- JavaScript，約 24 小時：{% post_link lokiTech-15day-06-js-basics %}、{% post_link lokiTech-15day-07-js-dom %}、{% post_link lokiTech-15day-08-js-async %}。語法與資料處理、DOM 與事件、fetch 與 async。
- React 基礎與進階，約 18 小時：{% post_link lokiTech-15day-09-react-basics %}、{% post_link lokiTech-15day-10-react-advanced %}。元件、狀態、列表、表單、effect、共用狀態。
- React Router，約 8 小時：{% post_link lokiTech-15day-11-react-router %}。路由、版型、動態路由、loader、action。
- 結業專案，約 32 小時：{% post_link lokiTech-15day-12-project-travel %}。旅行社網站切版與頁面功能，用記憶體裡的假資料運作。
- 選讀：{% post_link lokiTech-15day-13-project-travel-api %}。把專案接上 Firebase（Firestore、登入、部署），課堂有餘裕時請 AI 助手對照講義做，否則回家完成。

# 回家作業

從 {% post_link lokiTech-15day-02-html %} 開始，每篇講義最後都有一章「回家作業」。作業不計分，也不在課堂上講解或公布解答。

## 作業怎麼出

每份作業取自結業專案裡的一塊頁面或元件，起始檔與資料放在練習 repo 對應的資料夾（各篇的回家作業章會說明位置）。題目寫成目標、要求與檢查方式（做完該看到什麼），不寫一步一步的做法。作業只涵蓋主線內容。

## 各階段的作業

- HTML：頁面骨架、行程簡介、行程表、報名表單。
- CSS：全站基礎與變數、版頭、卡片、卡片牆、互動狀態、手機優先的版心。
- Tailwind：版頭、卡片、響應式卡片牆、互動狀態、深色模式、自己的顏色。
- JavaScript：陣列與物件整理行程資料；把資料畫成列表、篩選、搜尋、收藏、表單驗證；讀取資料、處理錯誤、送出報名、保存收藏。
- React：行程卡片、篩選、收藏、搜尋、報名表單；讀取資料、共用狀態、頁面標題、避免多餘的 effect。
- React Router：版型與導覽、用 loader 讀資料、用網址保存篩選、詳情頁與找不到、報名表單與轉址。

# 結業專案

品牌用課堂契約裡的洛奇旅行：介紹、套裝行程、詳情、報名。這個專案是整門課的主軸，前面每個階段學的東西，最後都會在這裡用上。

## 頁面

前台有首頁、行程列表、行程詳情、關於、報名、報名完成、我的報名與登入提示；後台有後台登入、行程管理與報名清單。後台可新增、編輯、刪除行程，也可以更新報名狀態。資料放在記憶體裡的假資料，由 React Router 的 loader 與 action 讀寫。

## 展示

結業時在本機把網站打包並預覽，走完一次從選行程到報名的流程，再口頭說明一個元件的資料從哪裡來。畫面好不好看不單獨評量。

# 工具與環境

開發用 VS Code、Chrome 與 Git。課程環境是 Node.js 26 與 pnpm 12，建置工具是 Vite 8；Tailwind 用 v4，React 用 JavaScript 開發，不裝 TypeScript。安裝步驟在 {% post_link lokiTech-15day-04-tailwind %}，作業與範例都在隨課的練習 repo，不在這個講義站。

工具階段只裝建議的 VS Code 套件，並開啟工作區的存檔排版。第一次建立 Vite 專案時，才在專案放 Prettier 設定（2 空格、分號與引號全班同一套）；React 專案再加 ESLint。規則寫在專案裡，不寫進個人的使用者設定。

# 本篇重點回顧

- 全課約 120 小時：工具與 HTML 12、CSS 12、Tailwind 8、JavaScript 24、React 基礎與進階 18、React Router 8、結業專案 32，另有約 6 小時緩衝。
- 主線是基本觀念加上專案用到的內容；標題以「選讀：」開頭的部分留給自學。
- 講師複製完整範例講解觀念，學員自己讀程式、改程式，也可以請 AI 助手當家教。
- 每篇講義從 HTML 起都有不計分的回家作業，題目取自結業專案。
- 結業專案是旅行社網站；接上 Firebase 的那一篇是選讀。
