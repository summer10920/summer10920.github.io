---
title: "React（六）：GitHub Pages、base、靜態 JSON"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:15:00
---

![](assets/images/banner/react.png)

最後一天把**靜態站**佈到 GitHub Pages。一次改 `base`、build、生產資料來源。json-server 不能上線。課堂會對照契約講怎麼佈，先看結構與步驟對不對，不看好不好看。

<!-- more -->

# 靜態託管
GitHub Pages 只會丟 HTML／JS／CSS 檔案給瀏覽器，沒有人在雲端幫你跑 `json-server`。所以線上要嘛 `import tours from "./data/tours.json"`，要嘛 fetch 同專案 `public/` 裡的 json。

SPA 重整子路徑可能 404：課堂擇一寫進 README——複製 `404.html` 當 index，或老師指定的 HashRouter。Vite 的 `base` 必須對應 repo 名稱，例如 `/你的repo/`。

```js vite.config.js
export default defineConfig({
  base: "/your-repo-name/",
  plugins: [tailwindcss()],
});
```

```bash
pnpm build
```

`dist/` 才是要佈上去的資料夾（依老師指定的 Actions 或 `gh-pages` 流程）。

| 環境 | 資料怎麼來 | json-server |
| --- | --- | --- |
| 本機開發 | `localhost:3000` | 開著 |
| GitHub Pages | 專案內 JSON | **沒有** |

Admin 線上可標示「僅本機示範」或同樣改讀靜態檔（不能真的寫回 GitHub）。

{% note primary %}
**練習規格**

請把 Vite React 專案設定 GitHub Pages。
使用 pnpm。請說明為什麼 json-server 不能一起上線。
請加 production 資料來源：import 或 fetch 專案內的 tours.json。
不要把任何 API 金鑰寫進 repo。請寫 README 本機如何開 json-server。
{% endnote %}

{% note warning %}
**練習對照（課堂會講解答）**
- 四頁路由 + `/admin` 是否都在？
- 契約 id／欄位有沒有被改名？
- README 有沒有本機 API 說明？
- 不看稿講得出一頁元件在做什麼？
- 線上應是契約專題，不是自切的發散版。
{% endnote %}

{% note success %}
**做完後可對一下**
規格可記在 `prompts/`。對照契約表，課堂會講上線步驟。
{% endnote %}
