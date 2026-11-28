---
title: "VSCode / Cursor：設定、內建功能與多台電腦同步"
categories:
  - 工具與其他
  - 開發工具
tag:
  - VSCode
  - Cursor
date: 2026-11-28 13:00:00
updated: 2026-11-28 13:00:00
hidden: false
---

![](/assets/images/banner/vscode-cursor.png)

VSCode 與 Cursor 的設定檔格式相同，但套件來源、AI 功能與同步能力不一樣。這篇先講兩款編輯器的差異，再整理 `settings.json` 的寫法與已經內建、不需要裝套件的功能，接著說明多台電腦之間怎麼同步，最後是以專案為單位統一環境。套件清單請看 {% post_link vscode-extension %}，快捷鍵與 Emmet 請看 {% post_link vscode-editing-tips %}。

<!-- more -->

# VSCode 與 Cursor 的差異

Cursor 是以 VSCode 為基礎的分支（Fork），介面、快捷鍵與 `settings.json` 設定幾乎相同，多數擴充套件可直接使用。差異主要在擴充套件的來源與授權：

- 擴充套件市集：VSCode 使用 Visual Studio Marketplace；Cursor 使用以 Open VSX 為基礎的自家市集。
- 微軟閉源套件：VSCode 可使用（Remote - SSH、Dev Containers 等）；Cursor 因授權限制無法使用，需改用 Cursor 對應版本。
- AI 功能：VSCode 內建 GitHub Copilot，登入 GitHub 帳號即可使用；Cursor 內建 Tab 補全、Chat、Agent。

使用時請注意：

- Cursor 的市集內容與 Open VSX 不完全相同，部分套件的版本也可能落後於 Visual Studio Marketplace。**請以 Cursor 內的搜尋結果為準**。
- 搜尋不到的套件，通常是發行者未上架到該市集。不建議手動安裝 `.vsix` 檔案繞過限制，這可能違反授權條款，也無法自動更新。


# 內建功能與基本設定

許多舊教學會要求安裝 Auto Close Tag、Auto Rename Tag 等套件，這些功能現在已內建，只要在 `settings.json` 開啟即可。本章先說明設定檔怎麼開啟，再依序是內建功能取代舊套件的設定、不用設定就能直接使用的功能、儲存與縮排習慣，以及需要搭配套件才有作用的設定。

## 開啟 settings.json

- **使用者設定**（對所有專案生效）：開啟命令面板（<kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>），執行 `Preferences: Open User Settings (JSON)`。
- **工作區設定**（只對目前專案生效）：命令面板執行 `Preferences: Open Workspace Settings (JSON)`，檔案位於專案的 `.vscode/settings.json`。
- **圖形化介面**：按 <kbd>Ctrl/Cmd</kbd>+<kbd>,</kbd> 開啟設定畫面，搜尋設定名稱後勾選；右上角的「開啟設定 (JSON)」圖示可切換成 JSON 檔。Cursor 另有「Cursor Settings」處理 AI 相關選項，編輯器行為仍使用這個設定畫面。

`settings.json` 允許註解與結尾逗號，下方的範例都是片段，貼進檔案最外層的 `{ }` 內即可，不需要各自加大括號。

## 內建功能：取代舊套件

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

// 移動或重新命名 JS / TS 檔案時，自動更新其他檔案的 import 路徑
// （取代已棄用的 javascript.* 與 typescript.* 兩項設定）
"js/ts.updateImportsOnFileMove.enabled": "always",
```

另有幾項內建功能不需要設定，直接呼叫即可：

- JS / TS 自動匯入與路徑補全（取代 Auto Import、Path Intellisense）：輸入時自動出現建議，按 Tab 或 Enter 接受
- HTML 與 CSS 的檔案路徑補全（取代 Autofilename）：在 `src`、`href`、`url()` 輸入 `./`，會列出該資料夾的檔案供選擇
- 排序選取的行（取代 Sort Lines）：選取多行，命令面板執行 `Sort Lines Ascending`（遞增排序）。沒有選取時會排序整個檔案，排序時大寫字母會排在小寫之前。如果需要不分大小寫、自然排序（`file2` 排在 `file10` 之前）或依長度排序，內建命令做不到，再安裝 Sort Lines 套件
- 產生英文假文（取代 Lorem Ipsum）：在 HTML 內輸入 `lorem`（或 `lorem20` 產生 20 個字）後按 Tab。內建的 Emmet `lorem` 只會產生英文（拉丁文）假文，需要繁體中文假文時，請安裝 Chinese Lorem（見 {% post_link vscode-extension %}）
- 臨時啟用成對標籤修改（取代 Auto Rename Tag（不想全域開啟時））：命令面板執行 `Start Linked Editing`，只對目前游標所在的標籤生效

## 不裝套件也能做到的事

下列功能常被當成要裝套件才有，其實編輯器本身就能做到。安裝新套件前，先確認這裡有沒有：

- 刪除重複的行：選取多行，命令面板執行 `Delete Duplicate Lines`
- 重新命名變數或函式，並同步修改所有引用：游標放在名稱上按 <kbd>F2</kbd>
- 格式化整份文件：命令面板執行 `Format Document`；HTML、CSS、JSON 都有內建格式化器，只有需要 Prettier 規則時才裝套件
- Markdown 預覽：按 <kbd>Cmd/Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd>，不需要預覽類套件
- 比較兩個檔案：檔案總管選取兩個檔案後按右鍵，選「比較已選取的項目」
- Git 基本操作：側邊欄的原始檔控制可暫存、提交、比較差異，檔案的「時間軸」可看歷史版本；進階功能才需要 GitLens
- JavaScript 除錯：內建 JavaScript Debugger，不需要 Debugger for Chrome
- 錄製教學時顯示按鍵與滑鼠位置：命令面板執行 `Toggle Screencast Mode`
- 同步設定與套件到其他電腦（僅 VSCode）：開啟 Settings Sync（命令面板執行 `Settings Sync: Turn On`）。Cursor 因授權限制沒有這項功能，要手動搬移設定與套件，做法見下一章「在多台電腦之間同步設定與套件」，專案層級的設定則見再下一章
- AI 補全與對話：VSCode 內建 GitHub Copilot，Cursor 內建 Tab 與 Chat，所以不需要程式碼片段類套件

## 儲存與縮排：建議的編輯習慣

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

## 搭配套件的設定

以下設定需安裝對應的套件才有作用，套件請見 {% post_link vscode-extension %}。

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

// Markdown 例外：Hexo 這類含 {% %} 標籤的文章，Prettier 可能改壞內容，改用 Markdown All in One
"[markdown]": { "editor.defaultFormatter": "yzhang.markdown-all-in-one" },
```

Markdown All in One 的格式化只整理表格欄位對齊，不會動清單縮排、程式碼區塊或自訂標籤，所以適合技術文章。


# 在多台電腦之間同步設定與套件

換電腦或同時使用多台電腦時，需要把設定、快捷鍵、程式碼片段與套件帶過去。VSCode 內建自動同步；Cursor 因授權限制沒有這項功能，只能手動同步。

## VSCode：Settings Sync 自動同步

1. 開啟命令面板，執行 `Settings Sync: Turn On`。
2. 選擇要同步的項目（設定、快捷鍵、程式碼片段、套件、介面狀態），再用 GitHub 或 Microsoft 帳號登入。
3. 之後每台電腦都以同一個帳號登入並開啟同步，修改會自動雙向更新。

只對單一電腦有意義的設定不該同步，例如特定路徑或 Windows 專用的終端機環境變數。把這些設定名稱加進 `settings.json` 的 `settingsSync.ignoredSettings` 即可排除：

```json
// 這些設定只留在本機，不參與同步
"settingsSync.ignoredSettings": [
  "terminal.integrated.env.windows"
],
```

命令面板執行 `Settings Sync: Show Synced Data` 可以查看雲端上同步了哪些內容與歷史版本，同步出錯時能從這裡還原。

## Cursor：手動同步

Cursor 沒有 Settings Sync，換電腦時要自己把設定與套件搬到另一台 Cursor。第一次從 VSCode 轉換到 Cursor 的匯入功能，請參考 Cursor 官方文件。以下只說明 Cursor 之間的搬移，需要搬的有三樣：設定檔、套件清單、專案內的設定。

### 設定檔

把使用者設定資料夾裡的檔案複製到另一台電腦的相同位置：

- macOS：`~/Library/Application Support/Cursor/User/`
- Windows：`%APPDATA%\Cursor\User\`
- Linux：`~/.config/Cursor/User/`

要搬的檔案是 `settings.json`、`keybindings.json`，以及 `snippets` 資料夾。

### 套件清單

先在原本的 Cursor 匯出已安裝的套件，再到新電腦依清單安裝。需先在命令面板執行 `Shell Command: Install 'cursor' command in PATH`，終端機才找得到 `cursor` 指令。

```bash
# 在原本的電腦：匯出套件清單
cursor --list-extensions > extensions.txt

# 在新的電腦：依清單逐一安裝
xargs -n 1 cursor --install-extension < extensions.txt
```

在 Windows PowerShell 的寫法是：

```powershell
Get-Content extensions.txt | ForEach-Object { cursor --install-extension $_ }
```

清單來自同一個市集，所以通常都能裝成功。想連版本也固定，匯出時加上 `--show-versions`，清單會變成 `套件ID@版本` 的格式，安裝時沿用即可。

### 讓搬移更省事

- 把 `extensions.txt` 與設定檔一起放進自己的 Git 儲存庫，換電腦時 clone 下來就能還原。
- 想接近自動同步：用符號連結（symbolic link）把設定檔連回 Cursor 的設定資料夾，之後只要 `git pull` 就會更新。

```bash
# macOS 範例：把 Git 儲存庫裡的 settings.json 連到 Cursor 的設定位置
ln -sf ~/dotfiles/cursor/settings.json "$HOME/Library/Application Support/Cursor/User/settings.json"
```

- 專案層級的設定不需要手動搬：放在專案內的 `.vscode` 會隨 Git 一起走，做法見下一節。


# 以專案為單位統一套件與設定

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

# 專有名詞中英對照

## VSCode 與 Cursor 的差異

- 分支（Fork）
- 擴充套件市集（Extension Marketplace）
- 閉源（Closed Source）

## 內建功能與基本設定

- 使用者設定（User Settings）
- 工作區設定（Workspace Settings）
- 連結編輯（Linked Editing）
- 括號配對上色（Bracket Pair Colorization）
- 參考線（Guides）
- 儲存時格式化（Format on Save）
- 自動儲存（Auto Save）

## 在多台電腦之間同步設定與套件

- 設定同步（Settings Sync）
- 符號連結（Symbolic Link）
- 使用者資料夾（User Folder）

## 以專案為單位統一套件與設定

- 工作區（Workspace）
- 推薦套件（Recommendations）
