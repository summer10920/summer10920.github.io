---
title: "React 基礎：Vite、JSX、元件與列表"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:08:00
---

![](assets/images/banner/react.png)

React 把「資料變了就重畫」收成元件。這篇在 `student/react/` 用 Vite 畫出洛奇旅行的行程列表：JSX、props、`useState`、事件，以及列表的 `key`。路由、`useEffect` 與報名表下一篇再接。

<!-- more -->

# 取得素材

`student/tailwind/` 留著當對照。這篇在 `student/` 底下新建 `react`，範本用 JavaScript，元件檔副檔名是 `.jsx`。終端機印出的 Local URL 用瀏覽器開，存檔後畫面會更新。

## 建專案

套件管理繼續用 pnpm。圖片從 Tailwind 專案的 `public/img/tours/` 複製到這個專案的同一路徑，卡片的 `src` 才找得到。

```bash
pnpm create vite@latest react --template react
cd react
pnpm install
pnpm add -D tailwindcss @tailwindcss/vite eslint-config-prettier
pnpm dev
```

| 檔案 | 是什麼 |
| --- | --- |
| `index.html` | 掛載點 `#root` |
| `src/main.jsx` | 把 `App` 畫進 `#root` |
| `src/App.jsx` | 篩選狀態與頁面組裝 |
| `src/tours.js` | 行程常數 |
| `src/TourFilters.jsx` | 地點、天數下拉 |
| `src/TourList.jsx` | `#tour-list` |
| `src/TourCard.jsx` | 一張行程卡 |
| `vite.config.js` | React 與 Tailwind 插件 |
| `.prettierrc` | 全班同一套排版 |

## 排版與檢查

第一次建 React 專案時，把排版與檢查寫進這個專案。`.prettierrc` 沿用 Tailwind 那天的約定：2 空格、要分號、雙引號。範本已經帶 ESLint；再接上 `eslint-config-prettier`，排版只交給 Prettier。這些規則放在專案裡，不要寫進個人的使用者設定。

```json .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
}
```

`eslint.config.js` 保留範本原本的內容，檔案最上方加上 import，並把 `eslintConfigPrettier` 放在匯出陣列的最後一項。

```js eslint.config.js
import eslintConfigPrettier from "eslint-config-prettier";
```

```json .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

這份 `settings.json` 只放在 `student/react/.vscode/`。`pnpm lint` 用來看 ESLint 的結果。`practice/` 仍然不放 ESLint。

## 入口與畫面檔

整份站先載入 `index.html`，React 再把元件畫進 `#root`。`main.jsx` 的 `StrictMode` 是開發時的額外檢查，畫面仍以你寫的元件為準。`vite.config.js` 要同時留下 React 插件與 Tailwind 插件。

```html index.html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

```jsx src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```js vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({ plugins: [react(), tailwindcss()] });
```

```css src/index.css
@import "tailwindcss";
```

```js src/tours.js
export const tours = [
  { id: 1, title: "台北城市漫遊", place: "台北", days: 3, price: 12800, image: "/img/tours/taipei.svg", intro: "城市散步" },
  { id: 2, title: "花蓮山海三日", place: "花蓮", days: 3, price: 15900, image: "/img/tours/hualien.svg", intro: "山海" },
  { id: 3, title: "京都紅葉散步", place: "京都", days: 5, price: 42800, image: "/img/tours/kyoto.svg", intro: "社寺" },
];
```

```jsx src/TourCard.jsx
export default function TourCard({ tour }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow">
      <img className="h-40 w-full object-cover" src={tour.image} alt={tour.title} />
      <h2 className="p-4 font-semibold">{tour.title}</h2>
      <p className="px-4 text-sm">{tour.place} · {tour.days} 天 · NT${tour.price}</p>
      <p className="px-4 pb-4 text-sm">{tour.intro}</p>
    </article>
  );
}
```

```jsx src/TourFilters.jsx
export default function TourFilters({ place, days, onPlace, onDays }) {
  return (
    <form id="tour-filters" className="flex flex-col gap-3 py-6 sm:flex-row">
      <label className="text-sm">地點
        <select className="mt-1 block w-full p-2" value={place} onChange={(event) => onPlace(event.target.value)}>
          <option value="">全部</option>
          <option>台北</option>
          <option>花蓮</option>
          <option>京都</option>
        </select>
      </label>
      <label className="text-sm">天數
        <select className="mt-1 block w-full p-2" value={days} onChange={(event) => onDays(event.target.value)}>
          <option value="">全部</option>
          <option value="3">3 天</option>
          <option value="5">5 天</option>
        </select>
      </label>
    </form>
  );
}
```

```jsx src/TourList.jsx
import TourCard from "./TourCard.jsx";

export default function TourList({ tours }) {
  return (
    <div id="tour-list" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
```

```jsx src/App.jsx
import { useState } from "react";
import { tours } from "./tours.js";
import TourFilters from "./TourFilters.jsx";
import TourList from "./TourList.jsx";

export default function App() {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const visible = tours.filter((tour) => (!place || tour.place === place) && (!days || String(tour.days) === days));

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">洛奇旅行</h1>
      <TourFilters place={place} days={days} onPlace={setPlace} onDays={setDays} />
      <TourList tours={visible} />
    </main>
  );
}
```

範本自帶的 logo、`App.css` 可以刪。畫面只留上面這幾份檔。

# 認識 JSX 與元件

JSX 寫起來像 HTML，實際是 JavaScript。瀏覽器不會直接執行 JSX，Vite 會先把它編成函式呼叫。你對照的是元件檔，不是在 `index.html` 裡再堆一段標記。

## JSX

屬性名 `class` 在 JSX 裡寫成 `className`，標籤文字 `for` 寫成 `htmlFor`。大括號裡放運算式，例如 `{tour.title}`、`{tour.days}`。一個 `return` 需要單一父層；沒有實質外層時，用 `<>...</>` 包起來。

{% note info %}
**小技巧：className**
瀏覽器畫面上的仍是 `class`。JSX 寫 `className`，是因為 `class` 在 JavaScript 裡另有用途。Tailwind 的 utility 直接放在 `className` 字串裡。
{% endnote %}

## 元件與 props

元件是回傳畫面的函式，名稱用大寫開頭。父元件用屬性把資料傳下去，子元件用參數接住，這組參數叫做 props。`TourCard` 只畫一張卡；`TourList` 只負責把陣列排進 `#tour-list`。篩選條件留在 `App`，子元件用參數顯示，不自己再存一份正式資料。

| 元件 | 收到的 props | 畫出什麼 |
| --- | --- | --- |
| `TourCard` | `tour` | 一張卡 |
| `TourList` | `tours` | `#tour-list` |
| `TourFilters` | `place`、`days`、`onPlace`、`onDays` | `#tour-filters` |

# 認識狀態、事件與列表

下拉選了什麼，要有地方記住，列表才會跟著變。這份資料流是：`App` 保存條件、算出要顯示的陣列，再把結果傳給列表。F12 的 React 開發工具若有裝，可以點選 `App` 看 `place` 與 `days`。

{% mermaid graph LR %}
App["App<br/>place、days"] --> filters["TourFilters"]
App --> list["TourList"]
list --> card["TourCard"]
{% endmermaid %}

## useState

`useState("")` 給初始值，回傳目前的值與更新函式：`place` 與 `setPlace`。呼叫 `setPlace("台北")` 之後，`App` 會再執行一次，畫面上的是新的值。直接寫 `place = "台北"` 只改到這個區域變數，React 不會重畫。`useState` 放在元件函式的最外層，不要放進 `if` 或 `map`。

## 事件

JSX 把函式交給 `onChange`、`onClick`，傳的是函式本身。`onChange={onPlace}` 可以；`onChange={onPlace()}` 會在這次渲染當下就呼叫。下拉是受控元件：`value` 讀 state，`onChange` 把 `event.target.value` 交回父層。天數選項的值是字串，所以篩選時用 `String(tour.days)` 比較。

## 列表與 key

`filter` 留下符合條件的行程，`map` 把每一筆變成一個 `TourCard`。`key={tour.id}` 讓 React 認得同一張卡；行程有穩定的 `id`，就用這個 `id`。列表用元件組出來，主流程不要再用 `innerHTML` 組卡片。

{% note warning %}
**注意事項**
`key` 用 `tour.id`。用陣列位置當 `key`，之後增刪時容易把狀態對到別張卡。不要為了這份列表安裝路由、Redux，也不要改欄位名稱。
{% endnote %}

# 作業：行程列表元件

這份作業是期末站的 `TourList` 與 `TourCard`。交 `student/react/` 裡會篩選的列表，並能指出它最後放在 `/tours`。

{% note success %}
**跟著做：**
1. `pnpm dev` 看得到三張卡。改地點或天數後，`#tour-list` 只留符合的行程。
2. 卡片資料含 `id`、`title`、`place`、`days`、`price`、`image`、`intro`。`key` 用 `tour.id`，`place` 與 `days` 的 state 放在 `App`。
3. 用繁中註解寫 `setPlace` 為什麼會讓列表重畫。不要用 `querySelector`、`innerHTML`、jQuery，不要裝 TypeScript。
{% endnote %}

# 本篇重點回顧

Vite 的 React 專案從 `#root` 畫起，JSX 用 `className` 與大括號帶入資料。props 把一筆行程傳進 `TourCard`，`useState` 把篩選條件留在父層，事件把新的選項送回來。列表用 `filter` 與 `map`，`key` 用 `tour.id`。下一篇再把同一份列表接上路由、讀取資料與報名表。
