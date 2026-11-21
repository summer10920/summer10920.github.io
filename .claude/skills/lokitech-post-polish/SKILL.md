---
name: lokitech-post-polish
description: >-
  Use when polishing (潤稿), adding version numbers to titles, or tidying
  front matter of existing summer10920.github.io posts other than the
  lokiTech-15day lecture series. Holds the per-post procedure, the
  version-in-title convention, and tag mapping. Works for both Claude Code and Cursor.
---
# 舊文章潤稿與標題版本號

適用範圍：`source/_posts` 內除了 `lokiTech-15day-*` 之外的文章。15 天講義請用 `lokitech-15day-lecture-rules`。

這份技能放在 `.claude/skills/lokitech-post-polish/`：Claude Code 原生讀這個路徑，Cursor 也原生相容讀取，所以只有一份，沒有符號連結。

## 開工前先讀
1. 專案根目錄的 `AGENTS.md`：協作與終端政策、front matter 與分類慣例、標籤語法、程式碼與風格（含「文章不使用表格」）。Cursor 會自動讀；Claude Code 透過 `CLAUDE.md` 匯入。

## 使用者的指示（2026-11-21）
- 不再討論，一篇一篇完成。（2026-11-21 起 99 篇已全部潤完，進度清單已刪除；之後新增或翻修的舊文章，直接依本流程處理。）
- **不要自己 commit**。改動留在工作區，累積到一個段落後給摘要，經使用者同意再 commit。commit 訊息用 Conventional Commits（`type(scope): subject`），不加任何 AI 署名。
- 不自動執行 `hexo`、`npm`、`pnpm`、`git push` 等；驗證靠使用者自己開著的 `http://localhost:4000`，不要另開伺服器、不要 `hexo clean`。
- 潤字階段不動 `categories`、`date`。檔名已於 2026-11-21 語意化（`技術-版本-主題`，不做 redirect），舊文章不再改檔名。
- **舊教材不要花心思改格式與版面，只潤字**（2026-11-21 補充）：不重排章節、不把表格改成清單、不調整程式碼區塊格式。只做文字層面的修正（見下方流程）。B01～B02 前幾篇已經轉過表格的就維持現狀，不回頭改。

## 專案現況（背景）
- 分類是兩層「領域 > 技術」，文章只掛第二層，front matter 寫兩行：
  - 前端：HTML/CSS、JavaScript、TypeScript、Tailwind、Bootstrap、jQuery、React、Angular
  - 後端與資料庫：Node.js、PHP/MySQL
  - 課程與考試：職訓課程（只放當年度 15day 教材）、技能檢定
  - 工具與其他：開發工具、私人
- 檔名不帶日期前綴；網址格式 `年/月-日/檔名`，日期來自 front matter 的 `date`。
- 「舊技術」的意思是「文章使用的版本太舊，不適合用現在主流版本學習」，**不是**分類，靠標題版本號識別。

## 每一篇的流程
1. **讀**：完整讀過文章（長文分段）。找出內文實際使用的版本（CDN 網址、`package.json`、指令輸出），必要時 WebSearch 查證，不要憑印象寫版本號。
2. **標題**加上**精準版本**，目標是「讀者看標題就知道該不該看」。標題不加 `[類型]` 前綴（已全部移除，新文章也不要加），命名比照 15 天講義：`技術 版本：主題、主題`（冒號前是技術與版本，冒號後用頓號列出要點），不加「教學（序號）」，例如 `Bootstrap 4.4：初始與排版`、`CSS 基礎：選擇器、盒模型、Flex、Grid、RWD`。版本取文章內實際使用的版本，寫到文章有釘住的精度（Bootstrap 4.4、Angular 13.2、jQuery 3.4）；只有大版本有意義時才寫大版本（React 17、PHP 7）。技術名與版本之間加空格。沒有序號的系列依發表順序補（一）（二）。標籤不寫版本號，版本只放標題。
3. **潤字**（只改文字，不改版面）：修錯字、病句、誤用名詞（例如把 RWD 解釋成無障礙這類錯誤）與技術上的錯誤（核對公式、class 名稱、單位、數值）；中文用全形標點；行內程式碼只用在真正的程式碼片段。保留作者口吻與章節結構，不重寫程式範例（除非有明顯錯誤）。只改有問題的句子，語意通順的句子不必為了「更好看」而重寫；不需要逐句重寫整篇。
4. **版本提醒**（簡短，一兩句即可）：版本不是現行主流時，在 `<!-- more -->` 之後加一張卡片（不要放在 `<!-- more -->` 之前）：

   ```
   {% note warning %}
   **版本提醒**
   本文使用 X 版（年份）。…（寫明與現行版本的主要差異）。新專案建議學習 …，請參考 {% post_link 檔名 顯示文字 %}；本文仍可作為維護舊專案的參考。
   {% endnote %}
   ```
   站內連結一律用 `{% post_link 檔名 顯示文字 %}`（檔名是 slug，不含 `.md`、不含日期）。版本差異只寫有把握的事實；不確定就查證，或省略。
5. **標籤**（欄位是 `tag:`）：標籤只放技術名（例如 `Bootstrap`），**不寫版本號**（不要 `Bootstrap 4`、`React 19`）。統一寫法：`JS`→`JavaScript`、`ReactJS`／`React`→`React`、`CSS3`→`CSS`、`HTML5`→`HTML`、`NodeJS`→`Node.js`；移除 `Untagged` 與誤植的 `- RWD…` 前綴 dash。課程班別標籤（`…（假日班）`、`…（職前班）`）保留不動。
6. **表格與版面**：舊文**維持原樣**，不轉成清單、不重排。（`AGENTS.md` 的「不使用表格」只適用於新寫的文章。）只修正表格內的錯字與明顯的技術錯誤，例如 class 名稱寫錯、欄位對錯。
7. **檢查**：front matter 仍可解析（`categories` 兩項、`title` 含版本）、所有 `{% note %}` 都有 `{% endnote %}`、標題不跳層。
8. **記錄**：遇到需要使用者決定的疑點，在最後回報時列出，不要停下來問。

## 批次回報
每個 B 批次完成後，簡短回報：做了哪幾篇、發現的問題與備註。
