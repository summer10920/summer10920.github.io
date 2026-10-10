---
title: "React（一）：Vite、JSX、元件、useState"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:10:00
---

![](assets/images/banner/react.png)

今天**不要改結訓小專題的專案**。另開 Vite React 專案，一次看懂入口、JSX、元件、`useState`。用官方 template 建好後，對照下面完整 `App.jsx` 與 F12 的元件樹。

<!-- more -->

# 一次建專案
見隨課 `exercises/day10-readme.md`。

```bash
pnpm create vite@latest day10-react-practice --template react
cd day10-react-practice
pnpm install
pnpm dev
```

# 入口在做什麼
整個站先載入一份 `index.html`，裡面幾乎只有掛載點。React 把元件畫進 `#root`。這叫 SPA（Single Page Application，單頁應用）：換畫面時通常不整頁重載。

```html index.html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

`main.jsx` 用 `createRoot(...).render(<App />)`。開發模式的 `StrictMode` 可能讓某些 effect 跑兩次，先知道、不必深挖。副檔名 `.jsx` 代表檔裡有 JSX。

# JSX 與元件
元件是**回傳畫面的函式**。JSX 看起來像 HTML，其實是 JavaScript：`class` 要寫 `className`，`for` 要寫 `htmlFor`。必須包在單一父層（或 Fragment `<>...</>`）。

事件用 `onClick={函式}` 傳函式本身，不要 `onClick={fn()}` 害它一渲染就執行。

# 一次貼上的計數器
把 `src/App.jsx` **整份換成**下面（可刪預設 logo）。開 F12：點按鈕看數字變；React 開發工具若有裝，可看 state。不要自己從零打 hook 語法。

```jsx App.jsx
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="p-8">
      <h1>計數練習</h1>
      <p>目前數字：{count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </main>
  );
}
```

| 觀念 | 在這份碼裡 | Review 問句 |
| --- | --- | --- |
| 元件 | `function App` | 誰在回傳 UI？ |
| JSX | `return ( ... )` | 為什麼是 `className` 不是 `class`？ |
| 狀態 | `useState(0)` | 數字存在哪？重整會怎樣？ |
| 更新 | `setCount` | 為什麼不能 `count++` 就期望畫面改？ |
| 重繪 | 點了按鈕之後 | 誰觸發 React 再跑一次 App？ |

`useState`：給初始值，回傳「目前值」與「更新函式」。更新後元件再執行一次，JSX 裡的 `{count}` 才換成新數字。這就是 DOM 篇章「變數 + 重繪」的框架版。

禁止：`innerHTML` 當主流程、jQuery、為了計數去裝 Redux。

{% note primary %}
**練習規格**

請用 React 19 + Vite + pnpm。只改 App.jsx 做計數器。
使用 useState。按鈕用 JSX onClick，不要操作 DOM。不要安裝 Redux。繁中註解說明 state 在哪。
{% endnote %}

{% note warning %}
**練習對照（課堂會講解答）**
- 點擊後數字有沒有變？
- 有沒有 `querySelector`／`innerHTML`？
- 套件是 pnpm 嗎？
- 講得出 useState 兩個回傳值嗎？
{% endnote %}

# 本篇重點回顧
計數器能跑。小專題本體先別動。

接著拆 TourCard／TourFilters，把「元件＋state」用在列表篩選。
