---
title: "VSCode / Cursor：建議安裝的擴充套件"
categories:
  - 工具與其他
  - 開發工具
tag:
  - VSCode
  - Cursor
date: 2026-11-21 16:29:06
updated: 2026-11-28 13:30:00
hidden: false
---

![](/assets/images/banner/vscode-cursor.png)

這篇依技能分類列出 VSCode 與 Cursor 值得安裝的擴充套件，涵蓋 HTML、CSS、Tailwind、JavaScript、React、Angular、PHP、Git、AI 與 Markdown 寫作，每個套件附上套件 ID 與用途。閱讀順序是安裝前的確認事項、前端相關、後端與協作、文件與資料檔，最後是專有名詞。

<!-- more -->

# 安裝前先確認

套件裝得越多，啟動越慢、設定越亂。安裝前先確認三件事：功能是不是已經內建、這個套件還有沒有人維護、你的編輯器市集裡找不找得到。這一章說明怎麼安裝，以及 VSCode 與 Cursor 在市集上的差異。

- 先查內建功能：自動補全標籤、成對標籤修改、括號上色、路徑補全等，編輯器已經內建，請看 {% post_link vscode-cursor-settings %}，不需要再裝套件。
- 每個套件都附上套件 ID，可以在擴充套件面板貼上搜尋，或用命令列安裝：`cursor --install-extension <ID>`（VSCode 為 `code --install-extension <ID>`）。
- VSCode 使用 Visual Studio Marketplace，Cursor 使用以 Open VSX 為基礎的市集，內容不完全相同，部分套件在 Cursor 找不到，或版本落後。請以編輯器內的搜尋結果為準。
- 不建議手動安裝 `.vsix` 檔案繞過限制，這可能違反授權條款，也無法自動更新。

# 前端開發

前端專案最常用到的套件，依層次分成通用基礎、HTML 與 CSS、JavaScript、Angular 四組。

## 通用基礎

- Prettier（`esbenp.prettier-vscode`）：程式碼格式化，支援 HTML、CSS、JS、TS、JSON、Markdown。建議把前端程式碼的格式化統一交給它，並在 `editor.defaultFormatter` 指定，避免多個格式化工具互相搶預設。Hexo 這類含自訂標籤的 Markdown 文章，Prettier 可能改壞內容，Markdown 請改用 Markdown All in One 格式化
- ESLint（`dbaeumer.vscode-eslint`）：JavaScript / TypeScript 程式碼檢查，React 與 Angular 專案都會使用
- EditorConfig（`EditorConfig.EditorConfig`）：讀取 `.editorconfig`，統一團隊的縮排與換行設定
- Error Lens（`usernamehw.errorlens`）：將錯誤與警告訊息直接顯示在該行後方
- Code Spell Checker（`streetsidesoftware.code-spell-checker`）：檢查變數、註解與文件中的英文拼字
- Material Icon Theme（`PKief.material-icon-theme`）：依檔案類型顯示圖示，方便辨識專案結構
- Chinese (Traditional) Language Pack（`MS-CEINTL.vscode-language-pack-zh-hant`）：介面繁體中文化
- Project Manager（`alefragnani.project-manager`）：選用。在多個專案之間快速切換
- Better Comments（`aaron-bond.better-comments`）：選用。依 `TODO`、`!`、`?` 等標記為註解上色
- WakaTime（`WakaTime.vscode-wakatime`）：選用。自動統計程式開發時間
- YAML Sort（`PascalReitermann93.vscode-yaml-sort`）：選用。依鍵名排序 YAML 內容，適合整理設定檔；Hexo 的 `_config.yml` 這類檔案較常用到

## HTML、CSS、Tailwind、Bootstrap

- Tailwind CSS IntelliSense（`bradlc.vscode-tailwindcss`）：Tailwind 類別名稱補全與衝突檢查。類別的自動排序則是在專案安裝 npm 套件 `prettier-plugin-tailwindcss`，由 Prettier 處理
- HTML CSS Support（`ecmel.vscode-html-css`）：依專案的 CSS 檔或 CDN 連結提供 class、id 補全。使用 Bootstrap 時，在設定 `html-css-support.styleSheets` 加入 Bootstrap 的 CDN 網址即可
- Stylelint（`stylelint.vscode-stylelint`）：CSS / SCSS 程式碼檢查。與 Tailwind 並用時，需在 Stylelint 設定中忽略 `@apply`、`@theme` 等指令
- HTMLHint（`HTMLHint.vscode-htmlhint`）：HTML 結構與常見問題檢查
- Live Server（`ritwickdey.LiveServer`）：啟動本機預覽伺服器，儲存後自動重新整理瀏覽器。微軟官方的 Live Preview（`ms-vscode.live-server`）可內嵌預覽，兩者擇一，不建議同時啟用
- Live Sass Compiler（`glenn2223.live-sass`）：選用。儲存 `.scss` 時自動編譯成 `.css`，適合沒有建置工具的純 HTML 專案。專案已使用 Vite，或以 `sass --watch` 指令編譯時就不需要。請安裝 Glenn Marks 維護的版本，ritwickdey 的舊版自 2018 年後未再更新
- Image Preview（`kisstkondoros.vscode-gutter-preview`）：在行號旁顯示圖片縮圖
- Chinese Lorem（`kevinyang.ctlorem`）：在 HTML 或 PHP 檔輸入 `ctlorem` 按 Tab 產生 128 個繁體中文字，`ctlorem120` 則產生 120 個字。內建 Emmet 的 `lorem` 沒有中文，版面測試需要中文字時用它。這個套件近年未更新，但功能單純；Cursor 的市集不一定有，找不到就以 AI 產生中文假文替代

## JavaScript、Node、React

- Pretty TypeScript Errors（`yoavbls.pretty-ts-errors`）：將冗長的 TypeScript 錯誤訊息重新排版，較容易閱讀
- Vitest（`vitest.explorer`）：在側邊欄執行與除錯 Vitest 測試（適用 Vite 專案）
- Playwright Test（`ms-playwright.playwright`）：在編輯器內錄製與執行 Playwright 端對端測試
- DotENV（`mikestead.dotenv`）：為 `.env` 環境變數檔提供語法上色。Node、Vite 與 Angular 專案常用 `.env` 存放設定，沒有它時檔案會顯示為純文字
- ES7+ React/Redux/React-Native Snippets（`dsznajder.es7-react-js-snippets`）：選用。提供 `rafce` 等 React 元件模板，近年未更新且可由 AI 補全取代
- styled-components（`styled-components.vscode-styled-components`）：僅在使用 styled-components（CSS-in-JS）時需要

> **關於新一代工具**：Biome（`biomejs.biome`）與 Oxc（`oxc.oxc-vscode`）是以 Rust 開發的格式化與檢查工具，速度快且設定簡單，新專案可評估使用。但目前多數專案與教學仍以 ESLint + Prettier 為主，兩者擇一使用即可，不建議混用。

## Angular

- Angular Language Service（`Angular.ng-template`）：提供模板的補全、錯誤檢查與跳轉。Angular 專案必裝
- Nx Console（`nrwl.angular-console`）：Nx 與 Angular CLI 的圖形化介面，不需記憶 generate、build 指令
- Angular Schematics（`cyrilletuzi.angular-schematics`）：在檔案總管以右鍵選單產生 component、service 等檔案
- Angular Snippets（`johnpapa.Angular2`）：選用。Angular 程式碼片段


# 後端、協作與 AI

PHP 與資料庫、Git 協作，以及 AI 與遠端開發。

## PHP 與資料庫

- PHP Intelephense（`bmewburn.vscode-intelephense-client`）：PHP 的補全、跳轉與錯誤檢查。PHP 語言支援只需要裝這一個，同時安裝多個 PHP 語言套件會互相干擾
- SQLTools（`mtxr.sqltools`）：在編輯器內連線資料庫、執行 SQL 並檢視結果，搭配對應的驅動使用，例如 MySQL 用 SQLTools MySQL/MariaDB/TiDB（`mtxr.sqltools-driver-mysql`）。連線密碼請設定為每次連線時詢問，不要明文存在 `settings.json`

## Git 與協作

- GitLens（`eamodio.gitlens`）：逐行顯示修改者、檔案歷史，並可比較分支
- Git Graph（`mhutchie.git-graph`）：以圖形顯示分支與合併流向。Open VSX 版本近年未更新，但功能穩定
- GitHub Pull Requests（`GitHub.vscode-pull-request-github`）：在編輯器內檢視與審查 Pull Request、Issue
- GitHub Actions（`GitHub.vscode-github-actions`）：編輯 workflow 檔案並查看執行結果

## AI 與遠端開發

VSCode 已內建 GitHub Copilot（程式碼補全、Chat、Agent），不需要另外安裝；若找不到相關功能，請先將 VSCode 更新到最新版。Cursor 則使用自身內建的 AI 功能。其他工具如下：

- Claude Code（`anthropic.claude-code`，VSCode、Cursor 皆可）：在編輯器內以對話方式讀取、修改專案檔案
- Cline（`saoudrizwan.claude-dev`，VSCode、Cursor 皆可）：開源的 AI 代理，可自行選擇模型
- Continue（`Continue.continue`，VSCode、Cursor 皆可）：開源的 AI 助手，可接本機或雲端模型
- Remote - SSH（`ms-vscode-remote.remote-ssh`，僅 VSCode）：透過 SSH 連線到遠端伺服器開發
- Remote SSH（`anysphere.remote-ssh`，僅 Cursor）：Cursor 提供的 SSH 遠端開發套件
- Docker（`ms-azuretools.vscode-docker`，VSCode、Cursor 皆可）：管理容器與 Compose 檔案，有使用 Docker 時再安裝


# 文件與資料檔

寫技術文件、部落格，以及處理 CSV 資料時用得到的套件。

## Markdown 寫作

- Markdown All in One（`yzhang.markdown-all-in-one`）：Markdown 快捷鍵、目錄產生、表格格式化
- Markdown Preview Mermaid Support（`bierner.markdown-mermaid`）：讓 Markdown 預覽支援 Mermaid 流程圖
- markdownlint（`DavidAnson.vscode-markdownlint`）：檢查 Markdown 語法與風格
- Markdown PDF（`yzane.markdown-pdf`）：將 Markdown 匯出為 PDF 或 HTML
- Markdown Paste Image（`telesoho.vscode-markdown-paste-image`）：貼上剪貼簿的圖片，自動存入專案資料夾並插入圖片語法。圖片跟著專案走，不需要另外架設或登入圖床
- Pangu2（`doggy8088.pangu2`）：在中文與英文、數字之間自動加入空格

## 圖表與資料檔

- Draw.io Integration（`hediet.vscode-drawio`）：在編輯器內繪製流程圖與架構圖
- Edit CSV（`janisdd.vscode-edit-csv`）：以表格介面編輯 CSV
- Rainbow CSV（`mechatroner.rainbow-csv`）：CSV 欄位依顏色標示，方便閱讀

※ 本文資訊檢視日期為 2026-11-28。擴充套件的維護狀態會持續變動，安裝前請以編輯器內的套件頁面為準。

# 專有名詞中英對照

## 安裝前先確認

- 擴充套件（Extension）
- 擴充套件市集（Extension Marketplace）
- 套件 ID（Extension ID）

## 前端開發

- 格式化器（Formatter）
- 程式碼檢查（Linter）
- 語言服務（Language Service）
- 程式碼片段（Snippet）
- 預處理器（Preprocessor）

## 後端、協作與 AI

- 語言伺服器（Language Server）
- 拉取請求（Pull Request）
- 遠端開發（Remote Development）

## 文件與資料檔

- 流程圖（Flowchart）
- 逗號分隔值（CSV, Comma-Separated Values）
