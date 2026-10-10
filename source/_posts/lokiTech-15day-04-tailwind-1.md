---
title: "Tailwind（一）：Node、pnpm、Vite、package.json"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:03:00
---

![](assets/images/banner/js.png)

這是第一次規劃前端專案。重點是搞懂**為什麼需要 Node**、每個檔案是做什麼，而不是只會點安裝下一步。套件管理課堂指定 **pnpm**，不要改用 npm。

<!-- more -->

# 為什麼前端也要裝 Node
前面 HTML、CSS 的檔案，瀏覽器可以直接開。從 Tailwind 起，瀏覽器看不懂那些 utility 的「源頭」，需要程式**編譯**成 CSS。Vite 則提供本機伺服器與之後打包。這些工具本身是 JavaScript 程式，所以電腦要裝 **Node**。這堂課不是後端課。

{% mermaid graph LR %}
src["你寫的 html／css／js"] --> vite["Vite 開發伺服器"]
vite --> browser["瀏覽器"]
{% endmermaid %}

# 一次建好，再對檔案表
不要在講義裡手打整個脚手架。終端機一次跑完 create → install → dev，然後**打開真實檔案**對下表。不要把專案改成 Express。

```bash
pnpm create vite@latest day3-vite --template vanilla
cd day3-vite
pnpm install
pnpm dev
```

終端機印出的 Local URL 用瀏覽器開。改 `index.html` 存檔應自動更新（HMR）。F12 仍看得到你的 HTML 樹，只是網址是 `localhost`，不是 `file://`。

建好後會看到類似結構（版本數字會變，觀念不變）：

```json package.json
{
  "name": "day3-vite",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^6.0.0"
  }
}
```

| 檔／資料夾 | 是什麼 | 要不要進 Git |
| --- | --- | --- |
| `package.json` | 專案名稱、scripts、依賴清單 | 要 |
| `scripts.dev` | `pnpm dev` 實際去跑的指令（這裡是 `vite`） | （寫在 json 裡一起 commit） |
| `devDependencies` | 開發才需要的工具；上線使用者不必「再裝一次 Vite 來開網頁」 | 要（清單要，套件本體不要） |
| `pnpm-lock.yaml` | 鎖死安裝版本，全班才裝得到同一組 | **要** |
| `node_modules/` | 真正下載下來的套件 | **不要**（`.gitignore`） |
| `index.html` | Vite 專案入口頁 | 要 |
| `src/` | 之後的 JS／CSS | 要 |

刪掉 `node_modules` 專案沒壞，再 `pnpm install` 即可。

# 安裝確認
對齊 Node **LTS**。打這兩句確認：`node -v`、`pnpm -v`。pnpm 可用 Corepack（`corepack enable`）或當時官方文件。裝完請開**新的**終端機再打指令。Port 被占用、在錯的資料夾執行，是今天最常見的卡住原因。

# pnpm
課堂指定 pnpm。不必懂 pnpm 的磁碟 store 原理。會用這些即可：

- `pnpm create` 建專案
- `pnpm install` 依 lockfile 裝依賴
- `pnpm add`／`pnpm add -D` 加套件
- `pnpm dev` 跑開發伺服器

# package.json 裡有什麼
打開真實檔案看，不要只背名詞：

- `scripts`：`pnpm dev` 實際上執行哪一句
- `dependencies`／`devDependencies`：上線的使用者要不要下載這包；Vite、Tailwind 多半在 dev
- `pnpm-lock.yaml`：鎖版本，**要 commit**
- `node_modules`：下載下來的套件，**不要 commit**；刪掉之後再 `pnpm install` 就能還原

`.gitignore` 一定要有 `node_modules`。

# Vite
Vite 是開發時的本機伺服器，之後也能 `pnpm build` 打包。你已經在上面把專案建起來了。F12 看的仍是 HTML 樹；差別是請求打到開發伺服器，存檔會熱更新。

{% note warning %}
**注意事項**
不要順便產生 Express／Nest 後端。本課不寫後端伺服器。指令必須是 pnpm。
{% endnote %}

{% note primary %}
**練習規格**

請列出在我的作業系統安裝 Node LTS 與 pnpm 的步驟。
套件管理只用 pnpm。請解釋 package.json、pnpm-lock.yaml、node_modules 各是什麼、哪個要 commit。
不要產生 Express 或 Nest 專案。不要改用 npm 當預設。
{% endnote %}

# 本章契約
練習專案固定為 `student/tailwind/`（Node／Vite）。禁止把結訓小專題的 `student/project/` 當今天練習本體。禁止為了方便改回 npm。

{% note warning %}
**練習對照（課堂會講解答）**
- 跑的是 `pnpm` 還是 `npm`？
- `.gitignore` 有沒有 `node_modules`？
- 不看稿講得出 `pnpm dev` 在做什麼嗎？
- 有沒有多裝與本堂無關的套件？
{% endnote %}

# 本篇重點回顧
瀏覽器打開 Vite 的網址。今天不必接 Tailwind。

接著在**這個**專案接 Tailwind v4。不要刪專案；若玩壞，再 `create` 一個 vanilla 即可。
