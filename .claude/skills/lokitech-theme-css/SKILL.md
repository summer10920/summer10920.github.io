---
name: lokitech-theme-css
description: >-
  Use when changing summer10920.github.io site styling (colors, header, sidebar, post cards,
  h1–h6, code window, RWD) or upgrading the NexT theme. Holds the color tokens, WCAG AA rules,
  file layout of source/assets/css, and the verification routine.
---
# 站台樣式（NexT 站台端客製）

細節與升級步驟以根目錄 `loki-theme.md` 為準；本檔只放動手前要知道的規則。

## 檔案結構
- 入口 `source/assets/css/loki.css`：只有註解與 `@import`，**匯入順序就是層疊順序**，不要調換。每個檔案在這裡都有一行用途註解，新增檔案要補上。
- `base/variables.css`：所有顏色、陰影、轉場變數。`base/reboot.css`：全域元素、焦點外框、減少動態效果。
- `loki-theme/*.css`：依畫面區塊分檔，依賴 NexT 的 class，升級 NexT 後逐檔檢查。
- 使用原生 CSS（含原生巢狀），不引入預處理器；`source/_data/loki-theme.styl` 只放 NexT 的 stylus 變數，改它要**重啟 dev server**。

## 設計決定（使用者定案，不要翻案）
- 冷灰藍（slate）＋血紅點綴。品牌紅是 `#e91061`。
- 紅色只當點綴（連結、行內碼文字、標題線條、選單底線、細條），**不要整塊紅**。
- 黑色只用在大面積深色區塊（側欄、頁尾、頁首遮罩），用帶藍炭灰，不用純黑。
- 頁首 `lokiKeyword` 文字雲保留，只蓋一層遮罩。
- h1～h6 靠各級不同的 CSS 版型區分（底線、色帶、左線、虛線、點線），不用符號前綴。
- 無障礙只做視覺：對比度、焦點外框、斷行、減少動態；不做 aria／alt 的語音面向。

## 寫樣式的規則
1. 顏色一律引用變數，不寫死色碼；沒有合適變數就先在 `variables.css` 加並註明對比數值。
2. 文字對比至少 4.5:1（大字 3:1）。紅色文字用 `--main-text-color`，深底紅字用 `--main-on-dark`；`--main-color` 只用在非文字。
3. 用 `:focus-visible` 做鍵盤焦點，不移除 outline；動畫要尊重 `prefers-reduced-motion`。
4. 不要覆寫 NexT 的 `!important` 之外還加 `!important`；先確認載入順序與選擇器權重。
5. 要適應 320、375、768～840、1024 以上寬度；NexT 在約 800px 有固定寬度，注意橫向溢出。
6. 刪掉用不到的規則與死選擇器，註解寫「為什麼」，不寫「是什麼」。

## 驗證
- 預覽用使用者開著的 `http://localhost:4000`，不要另開伺服器、不要 `hexo clean`。
- 用 chrome-devtools MCP 檢查：對比度、各斷點是否橫向溢出、鍵盤焦點、首頁／文章／歸檔／分類頁。CSS 被快取時用 `fetch(url, {cache: 'reload'})` 後重新載入。
- 改動後在回報裡列出檢查了哪些頁面與斷點；不要自動 commit。
