---
title: "[學習之路] VSCode 擴充套件備忘表"    
categories:
  - Misc Notes
  - Tools
tag:
  - VSCode
date: 2025-12-01 16:02:24
hidden: false
---

這篇文章純粹紀錄我自己在 Web 開發過程中實際用過、覺得方便的 VSCode 擴充套件，並不代表這些一定主流或特別好用，只是個人經驗隨手整理。內容不追求完整或熱門榜，純屬私人備忘，歡迎有興趣的人參考。 ※本清單會不定時更新，有新發現或更換習慣也會陸續補充。

<!-- more -->
## AI 程式碼助手

| 套件名稱              | 說明                                                                                                                              | 作者     | Visual Studio Marketplace | Open VSX |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------- | -------- |
| GitHub Copilot        | AI 驅動的程式碼補全工具，提供即時程式碼建議                                                                                       | GitHub   | ✅                         | ❌        |
| GitHub Copilot Chat   | GitHub Copilot 的聊天介面，可與 AI 對話協助開發                                                                                   | GitHub   | ✅                         | ❌        |
| Windsurf (原 Codeium) | AI 自動補全與聊天助手，支援 Python、JavaScript、TypeScript 等多種語言。免費的現代 AI 協作外掛，提升開發效率，打字更少、交付更快。 | Windsurf | ✅                         | ✅        |


## 程式語言支援

| 套件名稱                                                                           | 說明                                                                                                                                                                                                                          | 作者                  | Visual Studio Marketplace | Open VSX |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------- | -------- |
| Angular 1 JavaScript and TypeScript Snippets                                       | 提供 AngularJS 1.x 的 JavaScript 與 TypeScript 程式碼片段                                                                                                                                                                     | John Papa             | ✅                         | ✅        |
| Angular Snippets (Version 18)                                                      | 提供 Angular 18 版本的程式碼片段，作者 John Papa，超過 18 萬次安裝，為最新版 Angular 開發者推薦                                                                                                                               | John Papa             | ✅                         | ✅        |
| Angular 17 Snippets - TypeScript, Html, Angular Material, ngRx, RxJS & Flex Layout | 提供 242 個 Angular 相關的程式碼片段，涵蓋 TypeScript、HTML、Angular Material、Flex Layout、ngRx、RxJS、PWA 和測試等領域                                                                                                      | Mikael Morlund        | ✅                         | ✅        |
| Nx Console                                                                         | Monorepo 的圖形化 UI，提供可視化工作流程，並可結合 AI Chat 深度理解 Nx/Nx Dev                                                                                                                                                 | Nrwl (nx.dev)         | ✅                         | ✅        |
| angular2-switcher                                                                  | 輕鬆在 Angular 2 專案的 `typescript`、`template`、`style` 檔案間快速切換                                                                                                                                                      | infinity1207          | ✅                         | ✅        |
| Angular Language Service                                                           | 提供 Angular 模板的編輯服務（Editor services），支援語法高亮、即時程式碼檢查、自動補全等，讓 Angular 開發更流暢                                                                                                               | Angular               | ✅                         | ✅        |
| AngularJS Code Snippets                                                            | 提供 AngularJS 相關的程式碼片段                                                                                                                                                                                               | NicholasHsiang        | ✅                         | ✅        |
| Sass/Less/Stylus/Pug/Jade/Typescript/Javascript Compile Hero Pro                   | 支援 ts、tsx、scss、less、stylus、jade、pug、es6+ 等多語言即時自動編譯，儲存檔案時快速產出目標程式碼，無需額外設定 build 任務。                                                                                               | Eno Yao               | ✅                         | ❓        |
| ES7+ React/Redux/React-Native Snippets                                             | 提供 React、Redux、React Native 最常用的 ES7+ 程式碼片段（支援 JS/TS），可自訂內容並內建 Prettier 整合，                                                                                                                      | dsznajder             | ✅                         | ✅        |
| ESLint                                                                             | 整合 ESLint，提供 JavaScript 和 TypeScript 的程式碼檢查                                                                                                                                                                       | Dirk Baeumer          | ✅                         | ✅        |
| GraphQL                                                                            | GraphQL 語法高亮和程式碼補全                                                                                                                                                                                                  | Maxime Quandalle      | ✅                         | ✅        |
| JavaScript (ES6) Code Snippets                                                     | 提供 ES6 標準（即 ECMAScript 2015）語法的 JavaScript 程式碼片段，適合現代 JS 開發                                                                                                                                             | Charalampos Karypidis | ✅                         | ✅        |
| Babel JavaScript                                                                   | VSCode 提供現代 JavaScript（Babel）語法高亮，支援各種最新語法與特性                                                                                                                                                           | Michael McDermott     | ✅                         | ✅        |
| Live Sass Compiler                                                                 | 即時將 Sass/SCSS 編譯成 CSS，編輯時自動監控與產生 CSS 檔案，適合快速開發前端樣式                                                                                                                                              | Glenn Marks           | ✅                         | ✅        |
| PHP Intelephense                                                                   | 高效的 PHP 語言伺服器，提供程式碼補全、定義跳轉等功能                                                                                                                                                                         | Ben Mewburn           | ✅                         | ✅        |
| PHP IntelliSense                                                                   | PHP 的智慧提示和程式碼補全工具                                                                                                                                                                                                | Zobo                  | ✅                         | ❓        |
| PowerShell                                                                         | PowerShell 語法支援和開發工具，提供模組、指令與腳本編輯、自動補全與偵錯功能，                                                                                                                                                 | Microsoft             | ✅                         | ❌        |
| SCSS Everywhere                                                                    | 在 HTML、Svelte、Latte、Slim、Liquid、TSX/JSX、Haml、Elixir、Smarty、PHP、ERB、JavaScript、CSS 和 SCSS 等各種檔案中，即時提供 CSS `.class` 和 `#id` 的補全。無論在模板或 CSS/SCSS 中宣告 class/id，編輯器都能雙向對應自動提示 | Gencer W. Genç        | ✅                         | ✅        |
| SCSS Formatter                                                                     | SCSS 程式碼格式化工具，支援各種 SCSS 排版風格，可快速統一專案的樣式格式，安裝量 189 萬+，完全免費並可贊助作者                                                                                                                 | sibiraj-s             | ✅                         | ✅        |
| Sass (.sass only)                                                                  | 支援 Indented Sass 語法（.sass），提供語法高亮、自動補齊與格式化。                                                                                                                                                            | Syler                 | ✅                         | ✅        |
| Tailwind CSS IntelliSense                                                          | 智慧型 Tailwind CSS 工具組，支援類別名稱自動補全、檢查與即時提示，適合前端開發者使用                                                                                                                                          | Tailwind Labs         | ✅                         | ✅        |
| XML                                                                                | XML 語法高亮、結構驗證、補全與格式化，提升 XML 編輯體驗，                                                                                                                                                                     | Red Hat (redhat.com)  | ✅                         | ✅        |
| jQuery Code Snippets                                                               | 超過 130 組 jQuery 程式碼片段（適用於各類常用操作），支援快速插入語法                                                                                                                                                         | Don Jayamanne         | ✅                         | ✅        |
| stylus                                                                             | Stylus CSS 預處理器語法支援                                                                                                                                                                                                   | sysoev                | ✅                         | ✅        |
| Manta's Stylus Supremacy                                                           | 進階 Stylus 程式碼格式化工具，支援自定義規則與高效自動整理 Stylus 檔案，提升團隊協作的風格一致性                                                                                                                              | Anantachai Saothong   | ✅                         | ✅        |
| vscode-styled-components                                                           | 為 styled-components (CSS-in-JS) 提供語法高亮，React/React Native 項目常用                                                                                                                                                    | jpoissonnier          | ✅                         | ✅        |


## 程式碼品質與格式化

| 套件名稱                  | 說明                               | 作者                 | Visual Studio Marketplace | Open VSX |
| ------------------------- | ---------------------------------- | -------------------- | ------------------------- | -------- |
| Code Spell Checker        | 程式碼拼字檢查工具，支援多種語言   | Street Side Software | ✅                         | ✅        |
| HTMLHint                  | HTML 程式碼檢查工具                | HTMLHint             | ✅                         | ✅        |
| Prettier - Code formatter | 自動格式化程式碼，支援多種程式語言 | Prettier             | ✅                         | ✅        |
| YAML Sort                 | YAML 檔案排序工具                  | Pascal Reitermann    | ✅                         | ✅        |

## Git 與版本控制

| 套件名稱                        | 說明                                                  | 作者        | Visual Studio Marketplace | Open VSX |
| ------------------------------- | ----------------------------------------------------- | ----------- | ------------------------- | -------- |
| Git Graph                       | 視覺化的 Git 分支圖表工具                             | mhutchie    | ✅                         | ✅        |
| GitHub Actions                  | GitHub Actions 工作流程編輯器                         | GitHub      | ✅                         | ❌        |
| GitHub Pull Requests and Issues | 在 VSCode 中查看和管理 GitHub Pull Requests 和 Issues | GitHub      | ✅                         | ❌        |
| GitLens                         | 增強的 Git 功能，提供程式碼變更歷史、作者資訊等       | Eric Amodio | ✅                         | ✅        |

## 開發工具與生產力

| 套件名稱               | 說明                                                                                    | 作者                | Visual Studio Marketplace | Open VSX |
| ---------------------- | --------------------------------------------------------------------------------------- | ------------------- | ------------------------- | -------- |
| Auto Close Tag         | 自動關閉 HTML/XML 標籤                                                                  | Jun Han             | ✅                         | ✅        |
| Auto Import            | 自動匯入模組和套件                                                                      | Steoates            | ✅                         | ✅        |
| Auto Rename Tag        | 自動重命名成對的 HTML/XML 標籤                                                          | Jun Han             | ✅                         | ✅        |
| AutoFileName           | 自動補全檔案名稱                                                                        | Jerry Hong          | ✅                         | ✅        |
| Live Preview           | 在工作區內啟動本地伺服器，快速預覽與瀏覽專案網頁                                        | Microsoft           | ✅                         | ✅        |
| Call Graph             | 程式碼呼叫關係圖                                                                        | Luo Zhihao          | ✅                         | ❓        |
| cdnjs                  | 在 Visual Studio Code 內搜尋與嵌入 cdnjs.com 上的前端函式庫，讓引用第三方資源更方便快速 | Jake Wilson         | ✅                         | ❓        |
| Comment Translate      | 自動翻譯程式碼註解                                                                      | intellsmi           | ✅                         | ✅        |
| Draw Folder Structure  | 產生資料夾與檔案結構的 Markdown 圖示工具                                                | Krivoox             | ✅                         | ✅        |
| Encode Decode          | 編碼解碼工具，支援多種格式                                                              | Mitch Denny         | ✅                         | ✅        |
| vscode-fileheader      | 自動插入檔案表頭註解，支援自動更新時間欄位，提升程式檔案資訊自動化管理                  | Mikey               | ✅                         | ✅        |
| Live Server            | 啟動本地開發伺服器，實現即時預覽                                                        | Ritwick Dey         | ✅                         | ✅        |
| Lorem Ipsum            | 假文字生成工具                                                                          | Daniel Imms         | ✅                         | ✅        |
| vscode mindmap         | 在 Visual Studio Code 中創建和管理思維導圖                                              | oorzc               | ✅                         | ✅        |
| MySQL                  | MySQL 管理工具，支援資料庫連線、查詢及基本管理功能                                      | Jun Han             | ✅                         | ✅        |
| open in browser        | 在瀏覽器中開啟檔案                                                                      | TechER              | ✅                         | ✅        |
| Path Intellisense      | 自動補全檔案路徑                                                                        | Christian Kohler    | ✅                         | ✅        |
| Power Mode             | 輸入程式碼時產生搖晃、火花等酷炫特效，~~有趣地提升打字體驗~~                            | Cody Hoover         | ✅                         | ✅        |
| Separators             | 透過在每個方法上方添加線條，提升原始碼的可讀性                                          | Alessandro Fragnani | ✅                         | ✅        |
| REST Client            | 在 VSCode 中直接發送 HTTP 請求，測試 API                                                | Huachao Mao         | ✅                         | ✅        |
| SQLTools               | 資料庫管理工具，支援多種資料庫                                                          | Matheus Teixeira    | ✅                         | ✅        |
| SQLTools MySQL/MariaDB | SQLTools 的 MySQL/MariaDB 驅動程式                                                      | Matheus Teixeira    | ✅                         | ✅        |
| Sort Lines             | 排序選取的程式碼行                                                                      | Daniel Imms         | ✅                         | ✅        |
| Thunder Client         | 輕量級的 REST API 客戶端                                                                | Ranga Vadhineni     | ✅                         | ✅        |
| Todo Tree              | 在程式碼中標記和追蹤 TODO 註解                                                          | Gruntfuggly         | ✅                         | ✅        |
| WakaTime               | 追蹤程式碼撰寫時間統計                                                                  | WakaTime            | ✅                         | ✅        |

## 視覺輔助

| 套件名稱               | 說明                                                    | 作者              | Visual Studio Marketplace | Open VSX |
| ---------------------- | ------------------------------------------------------- | ----------------- | ------------------------- | -------- |
| Highlight Matching Tag | 高亮顯示配對的 HTML/XML 標籤                            | vincaslt          | ✅                         | ✅        |
| Image Preview          | 在編輯器側邊顯示圖片預覽                                | Kiss Tamás        | ✅                         | ✅        |
| SVG-Viewer             | JS SVG viewer for VSCode，可在編輯器內直接預覽 SVG 圖片 | Dheovani          | ✅                         | ✅        |
| filesize               | 在狀態列顯示目前檔案大小                                | Matheus Kautzmann | ✅                         | ✅        |
| indent-rainbow         | 讓縮排區塊以彩虹色呈現，使結構更清晰易讀                | oderwat           | ✅                         | ✅        |

## 檔案處理

| 套件名稱            | 說明                                                                             | 作者          | Visual Studio Marketplace | Open VSX |
| ------------------- | -------------------------------------------------------------------------------- | ------------- | ------------------------- | -------- |
| learn-markdown      | 教學導向的 Markdown 學習與練習套件，適合初學者從 VSCode 內互動學習 Markdown 語法 | Microsoft     | ✅                         | ❌        |
| Edit CSV            | CSV 檔案編輯器                                                                   | janisdd       | ✅                         | ✅        |
| Markdown All in One | 提供 Markdown 的完整支援，包括預覽、格式化等功能                                 | Yu Zhang      | ✅                         | ✅        |
| Markdown PDF        | 將 Markdown 檔案匯出為 PDF                                                       | yzane         | ✅                         | ✅        |
| Pangu-Markdown      | 自動在中英文之間加入空格，提升 Markdown 可讀性                                   | xlthu         | ✅                         | ✅        |
| Print               | 列印彩色程式碼並產生渲染結果，支援導出帶色彩的 Markdown 與程式碼預覽             | PD Consulting | ✅                         | ❓        |
| Rainbow CSV         | 為 CSV 檔案添加顏色標記                                                          | mechatroner   | ✅                         | ✅        |

## 圖片處理

| 套件名稱                      | 說明                                                                                      | 作者            | Visual Studio Marketplace | Open VSX |
| ----------------------------- | ----------------------------------------------------------------------------------------- | --------------- | ------------------------- | -------- |
| Fake Image Snippet Collection | 快速插入假圖片 URL                                                                        | yoyoys          | ✅                         | ✅        |
| Paste Image                   | 貼上圖片並自動儲存                                                                        | mushan          | ✅                         | ✅        |
| PicGo                         | 基於 PicGo 的強大圖片上傳，支援多格式整合 smms、qiniu、imgur 圖床，快速插入 Markdown 格式 | PicGo           | ✅                         | ✅        |
| vscode-imgur                  | 快速上傳圖片到 Imgur                                                                      | Maxfield Walker | ✅                         | ✅        |

## 遠端開發

| 套件名稱                                  | 說明                              | 作者      | Visual Studio Marketplace | Open VSX |
| ----------------------------------------- | --------------------------------- | --------- | ------------------------- | -------- |
| Remote - SSH                              | 透過 SSH 連線到遠端伺服器進行開發 | Microsoft | ✅                         | ❌        |
| Remote - SSH: Editing Configuration Files | 編輯 SSH 設定檔的工具             | Microsoft | ✅                         | ❌        |
| Remote Explorer                           | 遠端連線管理工具                  | Microsoft | ✅                         | ❌        |

## 語言包

| 套件名稱                            | 說明           | 作者      | Visual Studio Marketplace | Open VSX |
| ----------------------------------- | -------------- | --------- | ------------------------- | -------- |
| Chinese (Traditional) Language Pack | 繁體中文語言包 | Microsoft | ✅                         | ✅        |
