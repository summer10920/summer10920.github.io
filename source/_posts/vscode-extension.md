---
title: "VSCode / Cursor：前端開發設定與擴充套件指南"
categories:
  - 工具與其他
  - 開發工具
tag:
  - VSCode
  - Cursor
date: 2026-11-21 16:29:06
updated: 2026-11-21 16:29:06
hidden: false
---

![](/assets/images/banner/vs-code.png)

VSCode 與 Cursor 的擴充套件生態龐大，初學者常見的問題是不知道該裝哪些，或是依照舊教學安裝了已經內建、甚至已停止維護的套件。本文以前端開發為範圍，涵蓋 HTML、CSS、Tailwind、Bootstrap、JavaScript、Node、React 與 Angular，說明兩款編輯器的差異、內建功能的設定方式、建議安裝與不建議安裝的套件，以及如何以專案為單位統一團隊環境。

<!-- more -->

快捷鍵與 Emmet 語法請參考 <a href="{% post_path vscode-2020-tips %}">VSCode 使用技巧</a>。

## VSCode 與 Cursor 的差異

Cursor 是以 VSCode 為基礎的分支（Fork），介面、快捷鍵與 `settings.json` 設定幾乎相同，多數擴充套件可直接使用。差異主要在擴充套件的來源與授權：

- 擴充套件市集：VSCode 使用 Visual Studio Marketplace；Cursor 使用以 Open VSX 為基礎的自家市集。
- 微軟閉源套件：VSCode 可使用（Remote - SSH、Dev Containers 等）；Cursor 因授權限制無法使用，需改用 Cursor 對應版本。
- AI 功能：VSCode 內建 GitHub Copilot，登入 GitHub 帳號即可使用；Cursor 內建 Tab 補全、Chat、Agent。

使用時請注意：

- Cursor 的市集內容與 Open VSX 不完全相同，部分套件的版本也可能落後於 Visual Studio Marketplace。**請以 Cursor 內的搜尋結果為準**。
- 搜尋不到的套件，通常是發行者未上架到該市集。不建議手動安裝 `.vsix` 檔案繞過限制，這可能違反授權條款，也無法自動更新。

## 內建功能與基本設定

許多舊教學會要求安裝 Auto Close Tag、Auto Rename Tag 等套件，這些功能現在已內建，只要在 `settings.json` 開啟即可。本節分成三組設定，說明與範例分開列出。

### 開啟 settings.json

- **使用者設定**（對所有專案生效）：開啟命令面板（<kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>），執行 `Preferences: Open User Settings (JSON)`。
- **工作區設定**（只對目前專案生效）：命令面板執行 `Preferences: Open Workspace Settings (JSON)`，檔案位於專案的 `.vscode/settings.json`。
- **圖形化介面**：按 <kbd>Ctrl/Cmd</kbd>+<kbd>,</kbd> 開啟設定畫面，搜尋設定名稱後勾選；右上角的「開啟設定 (JSON)」圖示可切換成 JSON 檔。Cursor 另有「Cursor Settings」處理 AI 相關選項，編輯器行為仍使用這個設定畫面。

`settings.json` 允許註解與結尾逗號，下方三組範例都是片段，貼進檔案最外層的 `{ }` 內即可，不需要各自加大括號。

### 內建功能：取代舊套件

```json
// 輸入 <div> 時自動補上 </div>，取代 Auto Close Tag（預設已開啟）
"html.autoClosingTags": true,

// 修改開始標籤的名稱時，結束標籤同步更新，取代 Auto Rename Tag
// HTML 與 React 的 JSX 都適用（預設關閉，需手動開啟）
"editor.linkedEditing": true,

// 括號依巢狀層級上色，取代 Bracket Pair Colorizer（預設已開啟）
"editor.bracketPairColorization.enabled": true,

// 以參考線標出游標所在的括號範圍，可取代 indent-rainbow（預設關閉）
"editor.guides.bracketPairs": "active",
```

另有幾項內建功能不需要設定，直接呼叫即可：

- JS / TS 自動匯入與路徑補全（取代 Auto Import、Path Intellisense）：輸入時自動出現建議，按 Tab 或 Enter 接受
- 排序選取的行（取代 Sort Lines）：選取多行，命令面板執行 `Sort Lines Ascending`（遞增排序）
- 產生假文字（取代 Lorem Ipsum）：在 HTML 內輸入 `lorem`（或 `lorem20` 產生 20 個字）後按 Tab
- 臨時啟用成對標籤修改（取代 Auto Rename Tag（不想全域開啟時））：命令面板執行 `Start Linked Editing`，只對目前游標所在的標籤生效

### 儲存與縮排：建議的編輯習慣

```json
// 切換到其他視窗或分頁時自動儲存，避免忘記存檔就去瀏覽器重新整理
"files.autoSave": "onFocusChange",

// 縮排使用 2 個空格（前端業界慣例）
"editor.tabSize": 2,
"editor.insertSpaces": true,

// 不依檔案現有內容猜測縮排，一律套用上面的設定，避免同一專案縮排不一致
"editor.detectIndentation": false,

// 換行字元統一使用 LF，避免 Windows 與 macOS 之間產生整檔的換行差異
"files.eol": "\n",

// 過長的行自動折行顯示，不必左右捲動（只影響顯示，不會改動檔案）
"editor.wordWrap": "on",
```

- `files.autoSave` 的選項：`off`（不自動儲存）、`afterDelay`（停止輸入一段時間後）、`onFocusChange`（編輯器失去焦點時）、`onWindowChange`（視窗失去焦點時）。搭配「儲存時格式化」時不建議用 `afterDelay`，打字途中會不斷重新排版。
- 專案若有 `.prettierrc` 或 `.editorconfig`，儲存時的格式化以專案的設定為準，`editor.tabSize` 只決定手動按 Tab 鍵時輸入幾格。團隊專案請把縮排規則寫在專案設定檔，確保每個人結果一致。
- 設定可以只對特定語言生效，例如 `"[markdown]": { "editor.wordWrap": "on" }` 只讓 Markdown 檔折行。

### 搭配套件的設定

以下設定需安裝對應的套件才有作用，套件請見後面的「建議安裝清單」。

```json
// 儲存時以 Prettier 自動格式化（需安裝 Prettier）
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",

// 儲存時自動修正 ESLint 能處理的問題（需安裝 ESLint）
"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },

// Tailwind：在字串與 className 內也啟用類別補全（需安裝 Tailwind CSS IntelliSense）
"editor.quickSuggestions": { "strings": "on" },

// Tailwind 的 @theme、@apply 等指令不會被內建 CSS 檢查誤判為錯誤
"css.lint.unknownAtRules": "ignore",

// 檔案圖示主題（需安裝 Material Icon Theme）
"workbench.iconTheme": "material-icon-theme",
```

## 建議安裝清單

每個套件都附上套件 ID，可在擴充套件面板貼上搜尋，或以命令列安裝：`cursor --install-extension <ID>`（VSCode 為 `code --install-extension <ID>`）。

### 通用基礎

- Prettier（`esbenp.prettier-vscode`）：程式碼格式化，支援 HTML、CSS、JS、TS、JSON、Markdown
- ESLint（`dbaeumer.vscode-eslint`）：JavaScript / TypeScript 程式碼檢查，React 與 Angular 專案都會使用
- EditorConfig（`EditorConfig.EditorConfig`）：讀取 `.editorconfig`，統一團隊的縮排與換行設定
- Error Lens（`usernamehw.errorlens`）：將錯誤與警告訊息直接顯示在該行後方
- Code Spell Checker（`streetsidesoftware.code-spell-checker`）：檢查變數、註解與文件中的英文拼字
- Material Icon Theme（`PKief.material-icon-theme`）：依檔案類型顯示圖示，方便辨識專案結構
- Chinese (Traditional) Language Pack（`MS-CEINTL.vscode-language-pack-zh-hant`）：介面繁體中文化
- Project Manager（`alefragnani.project-manager`）：選用。在多個專案之間快速切換
- Better Comments（`aaron-bond.better-comments`）：選用。依 `TODO`、`!`、`?` 等標記為註解上色
- WakaTime（`WakaTime.vscode-wakatime`）：選用。自動統計程式開發時間

### HTML、CSS、Tailwind、Bootstrap

- Tailwind CSS IntelliSense（`bradlc.vscode-tailwindcss`）：Tailwind 類別名稱補全與衝突檢查。類別的自動排序則是在專案安裝 npm 套件 `prettier-plugin-tailwindcss`，由 Prettier 處理
- HTML CSS Support（`ecmel.vscode-html-css`）：依專案的 CSS 檔或 CDN 連結提供 class、id 補全。使用 Bootstrap 時，在設定 `html-css-support.styleSheets` 加入 Bootstrap 的 CDN 網址即可
- Stylelint（`stylelint.vscode-stylelint`）：CSS / SCSS 程式碼檢查。與 Tailwind 並用時，需在 Stylelint 設定中忽略 `@apply`、`@theme` 等指令
- HTMLHint（`HTMLHint.vscode-htmlhint`）：HTML 結構與常見問題檢查
- Live Server（`ritwickdey.LiveServer`）：啟動本機預覽伺服器，儲存後自動重新整理瀏覽器。微軟官方的 Live Preview（`ms-vscode.live-server`）可內嵌預覽，兩者擇一
- Image Preview（`kisstkondoros.vscode-gutter-preview`）：在行號旁顯示圖片縮圖

### JavaScript、Node、React

- Pretty TypeScript Errors（`yoavbls.pretty-ts-errors`）：將冗長的 TypeScript 錯誤訊息重新排版，較容易閱讀
- Vitest（`vitest.explorer`）：在側邊欄執行與除錯 Vitest 測試（適用 Vite 專案）
- Playwright Test（`ms-playwright.playwright`）：在編輯器內錄製與執行 Playwright 端對端測試
- Code Runner（`formulahendry.code-runner`）：一鍵執行單一檔案，適合練習與示範小段 JavaScript
- REST Client（`humao.rest-client`）：在 `.http` 檔案撰寫並發送 HTTP 請求，測試 Node API。近年未更新，但功能穩定
- ES7+ React/Redux/React-Native Snippets（`dsznajder.es7-react-js-snippets`）：選用。提供 `rafce` 等 React 元件模板，近年未更新且可由 AI 補全取代
- styled-components（`styled-components.vscode-styled-components`）：僅在使用 styled-components（CSS-in-JS）時需要

> **關於新一代工具**：Biome（`biomejs.biome`）與 Oxc（`oxc.oxc-vscode`）是以 Rust 開發的格式化與檢查工具，速度快且設定簡單，新專案可評估使用。但目前多數專案與教學仍以 ESLint + Prettier 為主，兩者擇一使用即可，不建議混用。

### Angular

- Angular Language Service（`Angular.ng-template`）：提供模板的補全、錯誤檢查與跳轉。Angular 專案必裝
- Nx Console（`nrwl.angular-console`）：Nx 與 Angular CLI 的圖形化介面，不需記憶 generate、build 指令
- Angular Schematics（`cyrilletuzi.angular-schematics`）：在檔案總管以右鍵選單產生 component、service 等檔案
- Angular Snippets（`johnpapa.Angular2`）：選用。Angular 程式碼片段

### Git 與協作

- GitLens（`eamodio.gitlens`）：逐行顯示修改者、檔案歷史，並可比較分支
- Git Graph（`mhutchie.git-graph`）：以圖形顯示分支與合併流向。Open VSX 版本近年未更新，但功能穩定
- GitHub Pull Requests（`GitHub.vscode-pull-request-github`）：在編輯器內檢視與審查 Pull Request、Issue
- GitHub Actions（`GitHub.vscode-github-actions`）：編輯 workflow 檔案並查看執行結果

### AI 與遠端開發

VSCode 已內建 GitHub Copilot（程式碼補全、Chat、Agent），不需要另外安裝；若找不到相關功能，請先將 VSCode 更新到最新版。Cursor 則使用自身內建的 AI 功能。其他工具如下：

- Claude Code（`anthropic.claude-code`，VSCode、Cursor 皆可）：在編輯器內以對話方式讀取、修改專案檔案
- Cline（`saoudrizwan.claude-dev`，VSCode、Cursor 皆可）：開源的 AI 代理，可自行選擇模型
- Continue（`Continue.continue`，VSCode、Cursor 皆可）：開源的 AI 助手，可接本機或雲端模型
- Remote - SSH（`ms-vscode-remote.remote-ssh`，僅 VSCode）：透過 SSH 連線到遠端伺服器開發
- Remote SSH（`anysphere.remote-ssh`，僅 Cursor）：Cursor 提供的 SSH 遠端開發套件
- Docker（`ms-azuretools.vscode-docker`，VSCode、Cursor 皆可）：管理容器與 Compose 檔案，有使用 Docker 時再安裝

### Markdown 與文件

適合撰寫技術文件與部落格：

- Markdown All in One（`yzhang.markdown-all-in-one`）：Markdown 快捷鍵、目錄產生、表格格式化
- Markdown Preview Mermaid Support（`bierner.markdown-mermaid`）：讓 Markdown 預覽支援 Mermaid 流程圖
- markdownlint（`DavidAnson.vscode-markdownlint`）：檢查 Markdown 語法與風格
- Markdown PDF（`yzane.markdown-pdf`）：將 Markdown 匯出為 PDF 或 HTML
- Markdown Paste Image（`telesoho.vscode-markdown-paste-image`）：貼上剪貼簿的圖片，自動存入專案資料夾並插入圖片語法
- Pangu2（`doggy8088.pangu2`）：在中文與英文、數字之間自動加入空格
- Draw.io Integration（`hediet.vscode-drawio`）：在編輯器內繪製流程圖與架構圖
- Edit CSV（`janisdd.vscode-edit-csv`）：以表格介面編輯 CSV
- Rainbow CSV（`mechatroner.rainbow-csv`）：CSV 欄位依顏色標示，方便閱讀

## 不建議安裝的套件

網路上較舊的教學常推薦下列套件，目前已停止維護或有更好的替代方案。已由編輯器內建功能取代的套件（如 Auto Close Tag、Auto Rename Tag），請見前面「內建功能與基本設定」。

- GitHub Copilot 與 GitHub Copilot Chat 兩個獨立擴充套件：已合併並內建於新版 VSCode，舊的 Copilot 擴充套件在 2025-10 後未再更新。建議：更新 VSCode 到新版，登入 GitHub 帳號即可使用
- Codeium（Windsurf）擴充套件：Open VSX 已標示為 Deprecated。建議：Cursor 內建 AI、Claude Code；VSCode 內建 GitHub Copilot
- Compile Hero、Live Sass Compiler（ritwickdey 版）：分別於 2020、2018 後未更新。建議：專案使用 Vite 或 Sass CLI（`--watch`）；需要編輯器內編譯時使用 Glenn Marks 維護的 Live Sass Compiler
- Paste Image（mushan）：2019 後未更新。建議：Markdown Paste Image（`telesoho.vscode-markdown-paste-image`）
- AngularJS 1.x 相關套件：AngularJS 已終止支援。建議：Angular Language Service
- Angular 17 / 18 Snippets：綁定特定版本，容易過期。建議：Angular Language Service 搭配 Angular CLI
- jQuery Code Snippets、JavaScript (ES6) Code Snippets：2015、2020 後未更新。建議：程式碼片段類套件可由 AI 補全取代
- Open in Browser：2022 後未更新。建議：Live Server 或 Live Preview

## 以專案為單位統一套件與設定

團隊或課堂專案建議把設定與推薦套件放進專案本身，其他人用 VSCode 或 Cursor 開啟專案資料夾時，編輯器會自動套用設定，並提示安裝缺少的套件。

在專案根目錄建立 `.vscode` 資料夾，放入兩份檔案：

- `.vscode/settings.json`：只對這個專案生效的設定，格式與上方的 `settings.json` 相同。
- `.vscode/extensions.json`：這個專案推薦的套件清單，例如 Tailwind 專案：

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss"
  ]
}
```

注意事項：

- 編輯器只會讀取「目前開啟的資料夾」底下的 `.vscode`，請以「開啟資料夾」打開專案根目錄，而不是只開單一檔案。
- `extensions.json` 只是建議，不會強制安裝；套件安裝後屬於各自電腦的編輯器。
- Cursor 的市集可能沒有清單中的某個套件，遇到時請在套件面板手動搜尋替代品。

※ 本文資訊檢視日期為 2026-11-21。擴充套件的維護狀態會持續變動，安裝前請以編輯器內的套件頁面為準。
